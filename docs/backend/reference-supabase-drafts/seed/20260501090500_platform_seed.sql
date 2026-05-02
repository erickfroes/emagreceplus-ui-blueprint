insert into platform.tenants (id, name) values ('00000000-0000-0000-0000-000000000001', 'EmagrecePlus Demo') on conflict do nothing;
insert into platform.units (id, tenant_id, name, city, state) values
('00000000-0000-0000-0000-000000000101','00000000-0000-0000-0000-000000000001','Unidade Centro','São Paulo','SP'),
('00000000-0000-0000-0000-000000000102','00000000-0000-0000-0000-000000000001','Unidade Jardins','São Paulo','SP')
on conflict do nothing;
insert into platform.roles (id, tenant_id, name) values
('00000000-0000-0000-0000-000000000201','00000000-0000-0000-0000-000000000001','Admin'),
('00000000-0000-0000-0000-000000000202','00000000-0000-0000-0000-000000000001','Nutricionista')
on conflict do nothing;
insert into platform.permissions (key, description) values
('dashboard:view','Visualizar dashboard'),
('units:switch','Trocar unidade')
on conflict do nothing;
