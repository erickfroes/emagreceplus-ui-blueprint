create table if not exists packages.package_sales (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  package_id uuid not null references packages.packages(id),
  package_version integer not null,
  patient_id uuid references platform.users(id),
  lead_id uuid,
  sale_reference text not null,
  status text not null default 'pending_contract' check (status in ('pending_contract','pending_payment','active','cancelled')),
  subtotal_cents integer not null check (subtotal_cents >= 0),
  discount_cents integer not null default 0 check (discount_cents >= 0),
  total_cents integer not null check (total_cents >= 0),
  entitlement_release_rule text not null default 'after_first_payment' check (entitlement_release_rule in ('after_first_payment','after_all_payments')),
  entitlements_released boolean not null default false,
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, sale_reference),
  check (patient_id is not null or lead_id is not null)
);

create table if not exists packages.package_sale_items (
  id uuid primary key default gen_random_uuid(),
  package_sale_id uuid not null references packages.package_sales(id) on delete cascade,
  package_service_id uuid references packages.package_services(id),
  service_id uuid not null references catalog.services(id),
  description text not null,
  quantity integer not null default 1 check (quantity > 0),
  unit_price_cents integer not null check (unit_price_cents >= 0),
  total_price_cents integer not null check (total_price_cents >= 0),
  created_at timestamptz not null default now()
);

create table if not exists packages.package_contracts (
  id uuid primary key default gen_random_uuid(),
  package_sale_id uuid not null unique references packages.package_sales(id) on delete cascade,
  document_id text not null,
  provider text not null default 'd4sign' check (provider in ('d4sign')),
  provider_status text not null default 'não configurado' check (provider_status in ('não configurado','simulado')),
  status text not null default 'pending' check (status in ('pending','signed','cancelled')),
  document_url text,
  created_at timestamptz not null default now(),
  signed_at timestamptz
);

create table if not exists packages.payment_plan_preview (
  id uuid primary key default gen_random_uuid(),
  package_sale_id uuid not null references packages.package_sales(id) on delete cascade,
  installment_number integer not null check (installment_number > 0),
  due_date date not null,
  amount_cents integer not null check (amount_cents >= 0),
  status text not null default 'pending' check (status in ('pending','paid','void')),
  payment_method text not null default 'internal_pending' check (payment_method in ('internal_pending')),
  external_reference text,
  paid_at timestamptz,
  unique (package_sale_id, installment_number)
);

create or replace function packages.set_sale_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists package_sales_set_updated_at on packages.package_sales;
create trigger package_sales_set_updated_at before update on packages.package_sales
for each row execute function packages.set_sale_updated_at();

alter table packages.package_sales enable row level security;
alter table packages.package_sale_items enable row level security;
alter table packages.package_contracts enable row level security;
alter table packages.payment_plan_preview enable row level security;

create policy package_sales_access on packages.package_sales for all
using (tenant_id in (select platform.current_tenant_ids()))
with check (tenant_id in (select platform.current_tenant_ids()));

create policy package_sale_items_access on packages.package_sale_items for all
using (exists (select 1 from packages.package_sales s where s.id = package_sale_id and s.tenant_id in (select platform.current_tenant_ids())))
with check (exists (select 1 from packages.package_sales s where s.id = package_sale_id and s.tenant_id in (select platform.current_tenant_ids())));

create policy package_contracts_access on packages.package_contracts for all
using (exists (select 1 from packages.package_sales s where s.id = package_sale_id and s.tenant_id in (select platform.current_tenant_ids())))
with check (exists (select 1 from packages.package_sales s where s.id = package_sale_id and s.tenant_id in (select platform.current_tenant_ids())));

create policy payment_plan_preview_access on packages.payment_plan_preview for all
using (exists (select 1 from packages.package_sales s where s.id = package_sale_id and s.tenant_id in (select platform.current_tenant_ids())))
with check (exists (select 1 from packages.package_sales s where s.id = package_sale_id and s.tenant_id in (select platform.current_tenant_ids())));

create or replace function packages.create_package_sale(
  p_tenant_id uuid,
  p_package_id uuid,
  p_patient_id uuid,
  p_lead_id uuid,
  p_sale_reference text,
  p_installments integer,
  p_first_due_date date,
  p_entitlement_release_rule text
) returns uuid language plpgsql security invoker as $$
declare
  v_sale_id uuid;
  v_package_version integer;
  v_total integer := 0;
  v_item record;
  v_i integer;
  v_amount integer;
  v_remainder integer;
begin
  if coalesce(p_installments,0) <= 0 then raise exception 'invalid_installments'; end if;

  select current_version into v_package_version from packages.packages where id = p_package_id and tenant_id = p_tenant_id;
  if not found then raise exception 'package_not_found'; end if;

  for v_item in
    select ps.id as package_service_id, ps.service_id, ps.quantity, s.name, s.price_cents
    from packages.package_services ps
    join catalog.services s on s.id = ps.service_id
    where ps.package_id = p_package_id and ps.package_version = v_package_version
  loop
    v_total := v_total + (v_item.quantity * v_item.price_cents);
  end loop;

  insert into packages.package_sales (
    tenant_id, package_id, package_version, patient_id, lead_id, sale_reference, subtotal_cents, total_cents, entitlement_release_rule, created_by
  ) values (
    p_tenant_id, p_package_id, v_package_version, p_patient_id, p_lead_id, p_sale_reference, v_total, v_total,
    case when p_entitlement_release_rule in ('after_first_payment','after_all_payments') then p_entitlement_release_rule else 'after_first_payment' end,
    auth.uid()
  ) returning id into v_sale_id;

  for v_item in
    select ps.id as package_service_id, ps.service_id, ps.quantity, s.name, s.price_cents
    from packages.package_services ps
    join catalog.services s on s.id = ps.service_id
    where ps.package_id = p_package_id and ps.package_version = v_package_version
  loop
    insert into packages.package_sale_items (package_sale_id, package_service_id, service_id, description, quantity, unit_price_cents, total_price_cents)
    values (v_sale_id, v_item.package_service_id, v_item.service_id, v_item.name, v_item.quantity, v_item.price_cents, v_item.quantity * v_item.price_cents);
  end loop;

  insert into packages.package_contracts (package_sale_id, document_id, provider, provider_status, status, document_url)
  values (v_sale_id, concat('contract-', replace(v_sale_id::text,'-','')), 'd4sign', 'não configurado', 'pending', null);

  v_amount := v_total / p_installments;
  v_remainder := v_total - (v_amount * p_installments);

  for v_i in 1..p_installments loop
    insert into packages.payment_plan_preview (package_sale_id, installment_number, due_date, amount_cents, status, payment_method)
    values (
      v_sale_id,
      v_i,
      (p_first_due_date + ((v_i - 1) * interval '1 month'))::date,
      v_amount + case when v_i = p_installments then v_remainder else 0 end,
      'pending',
      'internal_pending'
    );
  end loop;

  update packages.package_sales set status = 'pending_payment' where id = v_sale_id;
  return v_sale_id;
end;
$$;

create or replace function packages.confirm_package_sale_payment(
  p_package_sale_id uuid,
  p_installment_number integer,
  p_paid_at timestamptz default now()
) returns void language plpgsql security invoker as $$
declare
  v_rule text;
  v_pending_count integer;
begin
  update packages.payment_plan_preview
  set status = 'paid', paid_at = coalesce(p_paid_at, now())
  where package_sale_id = p_package_sale_id and installment_number = p_installment_number and status = 'pending';

  if not found then raise exception 'installment_not_pending'; end if;

  select entitlement_release_rule into v_rule from packages.package_sales where id = p_package_sale_id;
  if not found then raise exception 'sale_not_found'; end if;

  select count(*) into v_pending_count from packages.payment_plan_preview where package_sale_id = p_package_sale_id and status = 'pending';

  if (v_rule = 'after_first_payment') or (v_rule = 'after_all_payments' and v_pending_count = 0) then
    update packages.package_sales set entitlements_released = true, status = 'active' where id = p_package_sale_id;
  end if;
end;
$$;

create or replace view public.package_sales as select * from packages.package_sales;
create or replace view public.package_sale_items as select * from packages.package_sale_items;
create or replace view public.package_contracts as select * from packages.package_contracts;
create or replace view public.payment_plan_preview as select * from packages.payment_plan_preview;
