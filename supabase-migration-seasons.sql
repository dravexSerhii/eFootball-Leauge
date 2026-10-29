alter table public.league_matches add column if not exists season integer not null default 1;

alter table public.league_settings add column if not exists season integer not null default 1;

alter table public.league_settings add column if not exists championships jsonb not null default '{"0":0,"1":0}'::jsonb;

grant select, update on public.league_settings to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'public'
      and tablename = 'league_matches'
      and policyname = 'Users can delete their own matches'
  ) then
    create policy "Users can delete their own matches"
      on public.league_matches for delete to authenticated
      using (auth.uid() = created_by);
  end if;
end
$$;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'league_settings'
  ) then
    alter publication supabase_realtime add table public.league_settings;
  end if;
end
$$;
