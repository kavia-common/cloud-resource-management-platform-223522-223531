-- Cloud Resource Manager - Supabase RLS Policies
-- Run after schema.sql
-- How to run: Paste into Supabase SQL editor and execute.

-- Enable RLS on all user-scoped tables
alter table public.profiles enable row level security;
alter table public.providers enable row level security;
alter table public.resources enable row level security;
alter table public.monitoring_metrics enable row level security;
alter table public.notifications enable row level security;
alter table public.billing_snapshots enable row level security;
alter table public.invoices enable row level security;
alter table public.audit_logs enable row level security;
alter table public.user_roles enable row level security;

-- Helper: check if JWT indicates admin role (from app_metadata.role or user_metadata.role)
create or replace function public.is_admin() returns boolean language sql stable as $$
  select
    coalesce(
      nullif(current_setting('request.jwt.claims', true), '')::jsonb #>> '{app_metadata,role}',
      nullif(current_setting('request.jwt.claims', true), '')::jsonb #>> '{user_metadata,role}'
    ) = 'admin'
$$;

-- Helper: get current user id
create or replace function public.current_user_id() returns uuid language sql stable as $$
  select coalesce(
    nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub',
    null
  )::uuid
$$;

-- PROFILES
drop policy if exists select_own_profile on public.profiles;
create policy select_own_profile
  on public.profiles
  for select
  using (id = public.current_user_id() or public.is_admin());

drop policy if exists update_own_profile on public.profiles;
create policy update_own_profile
  on public.profiles
  for update
  using (id = public.current_user_id() or public.is_admin())
  with check (id = public.current_user_id() or public.is_admin());

drop policy if exists insert_profile_admin_only on public.profiles;
create policy insert_profile_admin_only
  on public.profiles
  for insert
  with check (public.is_admin()); -- profiles usually created via backend; restrict here

-- PROVIDERS
drop policy if exists select_own_providers on public.providers;
create policy select_own_providers
  on public.providers
  for select
  using (user_id = public.current_user_id() or public.is_admin());

drop policy if exists manage_own_providers on public.providers;
create policy manage_own_providers
  on public.providers
  using (user_id = public.current_user_id() or public.is_admin())
  with check (user_id = public.current_user_id() or public.is_admin());

-- RESOURCES
drop policy if exists select_own_resources on public.resources;
create policy select_own_resources
  on public.resources
  for select
  using (user_id = public.current_user_id() or public.is_admin());

drop policy if exists manage_own_resources on public.resources;
create policy manage_own_resources
  on public.resources
  using (user_id = public.current_user_id() or public.is_admin())
  with check (user_id = public.current_user_id() or public.is_admin());

-- MONITORING METRICS (derive via resource ownership)
drop policy if exists select_metrics_by_resource on public.monitoring_metrics;
create policy select_metrics_by_resource
  on public.monitoring_metrics
  for select
  using (exists (
    select 1 from public.resources r
    where r.id = monitoring_metrics.resource_id
      and (r.user_id = public.current_user_id() or public.is_admin())
  ));

drop policy if exists insert_metrics_by_resource on public.monitoring_metrics;
create policy insert_metrics_by_resource
  on public.monitoring_metrics
  for insert
  with check (exists (
    select 1 from public.resources r
    where r.id = monitoring_metrics.resource_id
      and (r.user_id = public.current_user_id() or public.is_admin())
  ));

-- NOTIFICATIONS
drop policy if exists select_own_notifications on public.notifications;
create policy select_own_notifications
  on public.notifications
  for select
  using (user_id = public.current_user_id() or public.is_admin());

drop policy if exists update_own_notifications on public.notifications;
create policy update_own_notifications
  on public.notifications
  for update
  using (user_id = public.current_user_id() or public.is_admin())
  with check (user_id = public.current_user_id() or public.is_admin());

drop policy if exists insert_notifications_admin_or_self on public.notifications;
create policy insert_notifications_admin_or_self
  on public.notifications
  for insert
  with check (user_id = public.current_user_id() or public.is_admin());

-- BILLING
drop policy if exists select_own_billing on public.billing_snapshots;
create policy select_own_billing
  on public.billing_snapshots
  for select
  using (user_id = public.current_user_id() or public.is_admin());

drop policy if exists upsert_billing_admin_only on public.billing_snapshots;
create policy upsert_billing_admin_only
  on public.billing_snapshots
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- INVOICES
drop policy if exists select_own_invoices on public.invoices;
create policy select_own_invoices
  on public.invoices
  for select
  using (user_id = public.current_user_id() or public.is_admin());

drop policy if exists manage_invoices_admin_only on public.invoices;
create policy manage_invoices_admin_only
  on public.invoices
  for all
  using (public.is_admin())
  with check (public.is_admin());

-- AUDIT LOGS (readable by admin only; inserts allowed to anyone to log own actions)
drop policy if exists select_audit_admin_only on public.audit_logs;
create policy select_audit_admin_only
  on public.audit_logs
  for select
  using (public.is_admin());

drop policy if exists insert_audit_any on public.audit_logs;
create policy insert_audit_any
  on public.audit_logs
  for insert
  with check (true);

-- USER ROLES (admin only)
drop policy if exists select_user_roles_admin on public.user_roles;
create policy select_user_roles_admin
  on public.user_roles
  for select
  using (public.is_admin());

drop policy if exists manage_user_roles_admin on public.user_roles;
create policy manage_user_roles_admin
  on public.user_roles
  for all
  using (public.is_admin())
  with check (public.is_admin());
