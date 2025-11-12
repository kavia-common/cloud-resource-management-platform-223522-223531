-- Cloud Resource Manager - Development Seed
-- Run after functions.sql
-- How to run: In Supabase SQL editor, execute this after authenticating as service role or within local dev.
-- IMPORTANT: This is safe for development. No secrets included.

-- Ensure a current user id can be derived when running in SQL editor as an authenticated session.
-- If running as anon without a JWT context, you may need to replace auth.uid() with a specific UUID.
-- For local dev, replace the following line with your test user's UUID when needed:
-- select '00000000-0000-0000-0000-000000000000'::uuid as demo_user_id \gset

-- Setup a user role mapping (optional). Replace with your user id
-- insert into public.user_roles (user_id, role) values ('00000000-0000-0000-0000-000000000000', 'admin')
-- on conflict (user_id) do update set role = excluded.role;

-- Seed profiles (if you know your user id). Otherwise skip.
-- insert into public.profiles (id, role, display_name)
-- values ('00000000-0000-0000-0000-000000000000', 'admin', 'Demo Admin')
-- on conflict (id) do update set display_name = excluded.display_name, role = excluded.role;

-- Optionally, insert a provider and some resources for the same user id
-- insert into public.providers (user_id, provider, account_id, display_name)
-- values ('00000000-0000-0000-0000-000000000000', 'aws', '123456789012', 'Demo AWS');

-- insert into public.resources (user_id, provider, name, type, region, status)
-- values
-- ('00000000-0000-0000-0000-000000000000', 'aws', 'demo-vm-1', 'vm', 'us-east-1', 'running'),
-- ('00000000-0000-0000-0000-000000000000', 'aws', 'demo-db-1', 'db', 'us-east-1', 'running'),
-- ('00000000-0000-0000-0000-000000000000', 'aws', 'demo-store-1', 'storage', 'us-east-1', 'stopped');

-- Example notification for the same user id
-- insert into public.notifications (user_id, title, message, severity)
-- values ('00000000-0000-0000-0000-000000000000', 'Welcome', 'Thanks for trying the app', 'info');

-- Example invoices for display
-- insert into public.invoices (user_id, date, amount, status)
-- values
-- ('00000000-0000-0000-0000-000000000000', now()::date - 5, 120.50, 'paid'),
-- ('00000000-0000-0000-0000-000000000000', now()::date - 35, 99.99, 'paid');

-- Compute current month billing snapshot (replace with your user id)
-- select public.compute_billing_snapshot('00000000-0000-0000-0000-000000000000', extract(year from now())::int, extract(month from now())::int);
