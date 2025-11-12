-- Cloud Resource Manager - Supabase Functions
-- Run after policies.sql
-- How to run: Paste into Supabase SQL editor and execute.

-- Notify a user by inserting into notifications
create or replace function public.notify_user(p_user_id uuid, p_title text, p_message text, p_severity notification_severity default 'info')
returns bigint
language plpgsql
security definer
as $$
declare
  v_id bigint;
begin
  insert into public.notifications (user_id, title, message, severity)
  values (p_user_id, coalesce(p_title,'Notification'), p_message, coalesce(p_severity,'info'))
  returning id into v_id;

  -- Optionally, write to audit logs
  insert into public.audit_logs (actor_user_id, action, entity, entity_id, details)
  values (public.current_user_id(), 'create', 'notification', v_id::text, jsonb_build_object('title', p_title));

  return v_id;
end;
$$;

-- Compute or upsert a monthly billing snapshot for a user (stub implementation)
create or replace function public.compute_billing_snapshot(p_user_id uuid, p_year int, p_month int)
returns void
language plpgsql
security definer
as $$
declare
  v_total numeric(12,2) := 0;
  v_projected numeric(12,2) := 0;
  v_savings numeric(12,2) := 0;
begin
  -- Stub: In a real implementation, aggregate costs from usage tables or external data.
  -- Here we compute simple placeholders based on resource count.
  select
    count(*) * 10.00::numeric into v_total
  from public.resources r
  where r.user_id = p_user_id;

  v_projected := v_total * 1.1; -- naive projection +10%
  v_savings := greatest(0, v_projected - v_total);

  insert into public.billing_snapshots (user_id, year, month, total_amount, projected_amount, savings_amount)
  values (p_user_id, p_year, p_month, v_total, v_projected, v_savings)
  on conflict (user_id, year, month) do update
    set total_amount = excluded.total_amount,
        projected_amount = excluded.projected_amount,
        savings_amount = excluded.savings_amount,
        updated_at = now();

  -- Audit
  insert into public.audit_logs (actor_user_id, action, entity, entity_id, details)
  values (public.current_user_id(), 'update', 'billing_snapshots', concat(p_year,'-',p_month), jsonb_build_object('user_id', p_user_id));
end;
$$;

-- RPC used by billingService.monthlySummary()
-- Returns a simple structure: { current, projected, savings }
create or replace function public.get_monthly_billing_summary()
returns jsonb
language plpgsql
security definer
as $$
declare
  v_uid uuid := public.current_user_id();
  v_now date := now()::date;
  v_year int := extract(year from v_now);
  v_month int := extract(month from v_now);
  v_row public.billing_snapshots%rowtype;
begin
  if v_uid is null then
    return jsonb_build_object('current', null, 'projected', null, 'savings', null);
  end if;

  select * into v_row
  from public.billing_snapshots
  where user_id = v_uid and year = v_year and month = v_month;

  if not found then
    perform public.compute_billing_snapshot(v_uid, v_year, v_month);
    select * into v_row
    from public.billing_snapshots
    where user_id = v_uid and year = v_year and month = v_month;
  end if;

  return jsonb_build_object(
    'current', coalesce(v_row.total_amount, 0),
    'projected', coalesce(v_row.projected_amount, 0),
    'savings', coalesce(v_row.savings_amount, 0)
  );
end;
$$;
