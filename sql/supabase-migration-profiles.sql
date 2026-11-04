-- Binds each account to its own team and lets the site ask "which team is mine?".
-- Run once in Supabase -> SQL Editor.

create table if not exists public.team_owners (
  email text primary key,
  team_index smallint not null
);
alter table public.team_owners enable row level security;

insert into public.team_owners (email, team_index) values
  ('promashkovsergey363@gmail.com', 0),
  ('vladlionslav@gmail.com', 1)
on conflict (email) do update set team_index = excluded.team_index;

create or replace function public.get_my_team()
returns smallint
language sql
stable
security definer
set search_path = public
as $$
  select team_index
  from public.team_owners
  where lower(btrim(email)) = lower(btrim(coalesce(auth.jwt() ->> 'email', '')))
  limit 1;
$$;

revoke all on function public.get_my_team() from public, anon;
grant execute on function public.get_my_team() to authenticated;
