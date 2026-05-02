create schema if not exists platform;

create table if not exists platform.tenants (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists platform.units (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  name text not null,
  city text,
  state text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists platform.roles (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  name text not null,
  unique (tenant_id, name)
);

create table if not exists platform.permissions (
  id uuid primary key default gen_random_uuid(),
  key text not null unique,
  description text
);

create table if not exists platform.memberships (
  id uuid primary key default gen_random_uuid(),
  tenant_id uuid not null references platform.tenants(id) on delete cascade,
  unit_id uuid not null references platform.units(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid not null references platform.roles(id),
  status text not null default 'active',
  created_at timestamptz not null default now(),
  unique (unit_id, user_id)
);

create table if not exists platform.user_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  created_at timestamptz not null default now()
);

alter table platform.tenants enable row level security;
alter table platform.units enable row level security;
alter table platform.roles enable row level security;
alter table platform.permissions enable row level security;
alter table platform.memberships enable row level security;
alter table platform.user_profiles enable row level security;

create or replace function platform.current_tenant_ids() returns setof uuid language sql stable as $$
  select m.tenant_id from platform.memberships m where m.user_id = auth.uid() and m.status = 'active'
$$;

create policy tenants_read on platform.tenants for select using (id in (select platform.current_tenant_ids()));
create policy units_read on platform.units for select using (tenant_id in (select platform.current_tenant_ids()));
create policy roles_read on platform.roles for select using (tenant_id in (select platform.current_tenant_ids()));
create policy memberships_read on platform.memberships for select using (user_id = auth.uid());
create policy user_profiles_self on platform.user_profiles for select using (user_id = auth.uid());
create policy permissions_read on platform.permissions for select using (exists (select 1 from platform.memberships m where m.user_id = auth.uid() and m.status='active'));

create view public.memberships as select * from platform.memberships;
create view public.units as select * from platform.units;
create view public.roles as select * from platform.roles;
