-- Card database: cards edited/added on the site. Run once in the Supabase SQL Editor.
-- Only e-mails listed in public.team_owners (see supabase-migration-coins.sql) can add, edit or delete cards.

create table if not exists public.efootball_cards (
  id text primary key check (char_length(id) between 1 and 80),
  data jsonb not null,
  photo_path text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  created_by uuid references auth.users (id) default auth.uid()
);

create or replace function public.is_card_editor()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.team_owners
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_card_editor() to anon, authenticated;

alter table public.efootball_cards enable row level security;

grant select on public.efootball_cards to anon, authenticated;
grant insert, update, delete on public.efootball_cards to authenticated;

drop policy if exists "Anyone can read cards" on public.efootball_cards;
create policy "Anyone can read cards"
  on public.efootball_cards for select to anon, authenticated using (true);

drop policy if exists "Editors can add cards" on public.efootball_cards;
create policy "Editors can add cards"
  on public.efootball_cards for insert to authenticated with check (public.is_card_editor());

drop policy if exists "Editors can edit cards" on public.efootball_cards;
create policy "Editors can edit cards"
  on public.efootball_cards for update to authenticated
  using (public.is_card_editor()) with check (public.is_card_editor());

drop policy if exists "Editors can delete cards" on public.efootball_cards;
create policy "Editors can delete cards"
  on public.efootball_cards for delete to authenticated using (public.is_card_editor());

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('card-images', 'card-images', true, 5242880, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view card images" on storage.objects;
create policy "Anyone can view card images"
  on storage.objects for select to anon, authenticated using (bucket_id = 'card-images');

drop policy if exists "Editors can upload card images" on storage.objects;
create policy "Editors can upload card images"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'card-images' and public.is_card_editor());

drop policy if exists "Editors can delete card images" on storage.objects;
create policy "Editors can delete card images"
  on storage.objects for delete to authenticated
  using (bucket_id = 'card-images' and public.is_card_editor());

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'efootball_cards'
  ) then
    alter publication supabase_realtime add table public.efootball_cards;
  end if;
end
$$;
