create schema if not exists catalog;
create schema if not exists packages;

create table if not exists catalog.service_categories (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  name text not null,
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now(),
  unique (tenant_id, name)
);

create table if not exists catalog.services (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  category_id uuid references catalog.service_categories(id) on delete set null,
  code text not null,
  name text not null,
  description text,
  price_cents integer not null check (price_cents >= 0),
  status text not null default 'active' check (status in ('active','inactive')),
  created_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create table if not exists packages.packages (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  code text not null,
  name text not null,
  current_version integer not null default 1,
  status text not null default 'draft' check (status in ('draft','published','archived')),
  created_by uuid references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (tenant_id, code)
);

create table if not exists packages.package_services (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages.packages(id) on delete cascade,
  package_version integer not null,
  service_id uuid not null references catalog.services(id),
  quantity integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  unique (package_id, package_version, service_id)
);

create table if not exists packages.package_entitlements (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages.packages(id) on delete cascade,
  package_version integer not null,
  app_enabled boolean not null default false,
  chat_enabled boolean not null default false,
  documents_enabled boolean not null default false,
  checkin_enabled boolean not null default false,
  created_at timestamptz not null default now(),
  unique (package_id, package_version)
);

create or replace function packages.set_updated_at() returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists packages_set_updated_at on packages.packages;
create trigger packages_set_updated_at before update on packages.packages
for each row execute function packages.set_updated_at();

alter table catalog.service_categories enable row level security;
alter table catalog.services enable row level security;
alter table packages.packages enable row level security;
alter table packages.package_services enable row level security;
alter table packages.package_entitlements enable row level security;

create policy service_categories_access on catalog.service_categories for all
using (tenant_id in (select platform.current_tenant_ids()))
with check (tenant_id in (select platform.current_tenant_ids()));

create policy services_access on catalog.services for all
using (tenant_id in (select platform.current_tenant_ids()))
with check (tenant_id in (select platform.current_tenant_ids()));

create policy packages_access on packages.packages for all
using (tenant_id in (select platform.current_tenant_ids()))
with check (tenant_id in (select platform.current_tenant_ids()));

create policy package_services_access on packages.package_services for all
using (exists (select 1 from packages.packages p where p.id = package_id and p.tenant_id in (select platform.current_tenant_ids())))
with check (exists (select 1 from packages.packages p where p.id = package_id and p.tenant_id in (select platform.current_tenant_ids())));

create policy package_entitlements_access on packages.package_entitlements for all
using (exists (select 1 from packages.packages p where p.id = package_id and p.tenant_id in (select platform.current_tenant_ids())))
with check (exists (select 1 from packages.packages p where p.id = package_id and p.tenant_id in (select platform.current_tenant_ids())));

create or replace function packages.create_package(
  p_tenant_id uuid,
  p_code text,
  p_name text,
  p_services jsonb,
  p_entitlements jsonb
) returns uuid language plpgsql security invoker as $$
declare
  v_package_id uuid;
  item jsonb;
begin
  insert into packages.packages (tenant_id, code, name, created_by)
  values (p_tenant_id, p_code, p_name, auth.uid())
  returning id into v_package_id;

  for item in select * from jsonb_array_elements(p_services) loop
    insert into packages.package_services (package_id, package_version, service_id, quantity)
    values (v_package_id, 1, (item->>'service_id')::uuid, coalesce((item->>'quantity')::integer, 1));
  end loop;

  insert into packages.package_entitlements (package_id, package_version, app_enabled, chat_enabled, documents_enabled, checkin_enabled)
  values (
    v_package_id,
    1,
    coalesce((p_entitlements->>'app_enabled')::boolean, false),
    coalesce((p_entitlements->>'chat_enabled')::boolean, false),
    coalesce((p_entitlements->>'documents_enabled')::boolean, false),
    coalesce((p_entitlements->>'checkin_enabled')::boolean, false)
  );

  return v_package_id;
end;
$$;

create or replace function packages.update_package(
  p_package_id uuid,
  p_name text,
  p_services jsonb,
  p_entitlements jsonb
) returns integer language plpgsql security invoker as $$
declare
  v_current_version integer;
  v_status text;
  v_new_version integer;
  item jsonb;
begin
  select current_version, status into v_current_version, v_status from packages.packages where id = p_package_id;
  if not found then raise exception 'package_not_found'; end if;

  if v_status = 'published' then
    v_new_version := v_current_version + 1;
    update packages.packages set current_version = v_new_version, name = p_name where id = p_package_id;
  else
    v_new_version := v_current_version;
    update packages.packages set name = p_name where id = p_package_id;
    delete from packages.package_services where package_id = p_package_id and package_version = v_new_version;
    delete from packages.package_entitlements where package_id = p_package_id and package_version = v_new_version;
  end if;

  for item in select * from jsonb_array_elements(p_services) loop
    insert into packages.package_services (package_id, package_version, service_id, quantity)
    values (p_package_id, v_new_version, (item->>'service_id')::uuid, coalesce((item->>'quantity')::integer, 1));
  end loop;

  insert into packages.package_entitlements (package_id, package_version, app_enabled, chat_enabled, documents_enabled, checkin_enabled)
  values (
    p_package_id,
    v_new_version,
    coalesce((p_entitlements->>'app_enabled')::boolean, false),
    coalesce((p_entitlements->>'chat_enabled')::boolean, false),
    coalesce((p_entitlements->>'documents_enabled')::boolean, false),
    coalesce((p_entitlements->>'checkin_enabled')::boolean, false)
  );

  return v_new_version;
end;
$$;

create or replace function packages.publish_package(p_package_id uuid) returns void language plpgsql security invoker as $$
begin
  update packages.packages set status = 'published' where id = p_package_id;
  if not found then raise exception 'package_not_found'; end if;
end;
$$;

create or replace view public.service_categories as select * from catalog.service_categories;
create or replace view public.services as select * from catalog.services;
create or replace view public.packages as select * from packages.packages;

