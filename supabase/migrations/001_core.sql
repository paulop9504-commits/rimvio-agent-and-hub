-- Rimvio Agent & Hub — core MVP schema
-- Tables: profiles, capabilities, actions, loops, executions, execution_logs, permissions

create extension if not exists "pgcrypto";

create type public.execution_status as enum (
  'queued',
  'running',
  'waiting',
  'completed',
  'failed',
  'cancelled'
);

create type public.permission_scope as enum ('capability', 'loop');
create type public.permission_role as enum ('owner', 'editor', 'viewer');
create type public.log_level as enum ('info', 'warn', 'error');

-- User (1:1 with auth.users)
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.capabilities (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  key text not null,
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (owner_id, key)
);

create table public.actions (
  id uuid primary key default gen_random_uuid(),
  capability_id uuid not null references public.capabilities (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  key text not null,
  title text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (capability_id, key)
);

create table public.loops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  goal text,
  status public.execution_status not null default 'queued',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.executions (
  id uuid primary key default gen_random_uuid(),
  loop_id uuid not null references public.loops (id) on delete cascade,
  action_id uuid references public.actions (id) on delete set null,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  status public.execution_status not null default 'queued',
  started_at timestamptz,
  completed_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.execution_logs (
  id uuid primary key default gen_random_uuid(),
  execution_id uuid not null references public.executions (id) on delete cascade,
  owner_id uuid not null references public.profiles (id) on delete cascade,
  level public.log_level not null default 'info',
  message text not null,
  payload jsonb,
  created_at timestamptz not null default now()
);

create table public.permissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  scope public.permission_scope not null,
  capability_id uuid references public.capabilities (id) on delete cascade,
  loop_id uuid references public.loops (id) on delete cascade,
  role public.permission_role not null default 'viewer',
  created_at timestamptz not null default now(),
  constraint permissions_scope_target check (
    (scope = 'capability' and capability_id is not null and loop_id is null)
    or (scope = 'loop' and loop_id is not null and capability_id is null)
  )
);

create index capabilities_owner_idx on public.capabilities (owner_id);
create index actions_capability_idx on public.actions (capability_id);
create index loops_owner_idx on public.loops (owner_id);
create index executions_loop_idx on public.executions (loop_id);
create index execution_logs_execution_idx on public.execution_logs (execution_id);
create index permissions_user_idx on public.permissions (user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger capabilities_updated_at
  before update on public.capabilities
  for each row execute function public.set_updated_at();

create trigger actions_updated_at
  before update on public.actions
  for each row execute function public.set_updated_at();

create trigger loops_updated_at
  before update on public.loops
  for each row execute function public.set_updated_at();

create trigger executions_updated_at
  before update on public.executions
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', new.email)
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.capabilities enable row level security;
alter table public.actions enable row level security;
alter table public.loops enable row level security;
alter table public.executions enable row level security;
alter table public.execution_logs enable row level security;
alter table public.permissions enable row level security;

create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "capabilities_owner_all"
  on public.capabilities for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "actions_owner_all"
  on public.actions for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "loops_owner_all"
  on public.loops for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "executions_owner_all"
  on public.executions for all
  using (auth.uid() = owner_id)
  with check (auth.uid() = owner_id);

create policy "execution_logs_owner_select"
  on public.execution_logs for select
  using (auth.uid() = owner_id);

create policy "execution_logs_owner_insert"
  on public.execution_logs for insert
  with check (auth.uid() = owner_id);

create policy "permissions_user_select"
  on public.permissions for select
  using (auth.uid() = user_id);

create policy "permissions_user_insert"
  on public.permissions for insert
  with check (auth.uid() = user_id);

create policy "permissions_user_delete"
  on public.permissions for delete
  using (auth.uid() = user_id);
