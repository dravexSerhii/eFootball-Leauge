-- 1. Public read-only access to the league (no sign-in needed to view)
grant select on public.league_settings to anon;
grant select on public.league_matches to anon;

drop policy if exists "League members can read settings" on public.league_settings;
drop policy if exists "Anyone can read settings" on public.league_settings;
create policy "Anyone can read settings"
  on public.league_settings for select to anon, authenticated using (true);

drop policy if exists "League members can read matches" on public.league_matches;
drop policy if exists "Anyone can read matches" on public.league_matches;
create policy "Anyone can read matches"
  on public.league_matches for select to anon, authenticated using (true);

-- 2. Allow more than two teams in matches
do $$
declare
  constraint_name text;
begin
  for constraint_name in
    select c.conname
    from pg_constraint c
    where c.conrelid = 'public.league_matches'::regclass
      and c.contype = 'c'
      and (pg_get_constraintdef(c.oid) ilike '%home_team%'
        or pg_get_constraintdef(c.oid) ilike '%away_team%')
  loop
    execute format('alter table public.league_matches drop constraint %I', constraint_name);
  end loop;
end $$;

alter table public.league_matches
  add constraint league_matches_home_team_check check (home_team >= 0 and home_team < 20),
  add constraint league_matches_away_team_check check (away_team >= 0 and away_team < 20 and away_team <> home_team);

-- 3. Bucket for player card images
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('player-cards', 'player-cards', true, 2097152, array['image/webp', 'image/png', 'image/jpeg'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view player cards" on storage.objects;
create policy "Anyone can view player cards"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'player-cards');

drop policy if exists "League members can upload player cards" on storage.objects;
create policy "League members can upload player cards"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'player-cards');
