-- Player profile extras: avatar, 3 featured badges and a favourite player card.
-- Run once in Supabase -> SQL Editor, AFTER supabase-migration-teams-friends.sql.

alter table public.league_profiles add column if not exists avatar_path text;
alter table public.league_profiles add column if not exists featured_badges text[] not null default '{}';
alter table public.league_profiles add column if not exists favorite_card text;

-- Avatars: public bucket, each user writes only inside their own folder.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('avatars', 'avatars', true, 2097152, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "Anyone can view avatars" on storage.objects;
create policy "Anyone can view avatars"
  on storage.objects for select to anon, authenticated using (bucket_id = 'avatars');

drop policy if exists "Users can upload their avatar" on storage.objects;
create policy "Users can upload their avatar"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

drop policy if exists "Users can remove their avatar" on storage.objects;
create policy "Users can remove their avatar"
  on storage.objects for delete to authenticated
  using (bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text);

create or replace function public.update_my_profile(
  p_avatar_path text,
  p_badges text[],
  p_card text
) returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if auth.uid() is null then raise exception 'Not signed in'; end if;
  if coalesce(array_length(p_badges, 1), 0) > 3 then raise exception 'You can pin at most 3 badges'; end if;
  if p_avatar_path is not null and p_avatar_path not like auth.uid()::text || '/%' then
    raise exception 'Invalid avatar';
  end if;
  update public.league_profiles
  set avatar_path = p_avatar_path,
      featured_badges = coalesce(p_badges, '{}'),
      favorite_card = nullif(left(btrim(coalesce(p_card, '')), 80), '')
  where user_id = auth.uid();
end;
$$;

create or replace function public.ensure_my_profile()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_team smallint := public.get_my_team();
  v_name text;
  v_row public.league_profiles;
begin
  if v_uid is null then raise exception 'Not signed in'; end if;
  select * into v_row from public.league_profiles where user_id = v_uid;
  if not found then
    select nullif(btrim(teams -> v_team::int ->> 'name'), '') into v_name from public.league_settings limit 1;
    v_name := coalesce(v_name, 'Player ' || substr(v_uid::text, 1, 4));
    if exists (select 1 from public.league_profiles where lower(nickname) = lower(v_name)) then
      v_name := left(v_name, 18) || ' ' || substr(v_uid::text, 1, 4);
    end if;
    insert into public.league_profiles (user_id, nickname, team_index)
    values (v_uid, v_name, v_team) returning * into v_row;
  elsif v_row.team_index is distinct from v_team then
    update public.league_profiles set team_index = v_team where user_id = v_uid returning * into v_row;
  end if;
  return jsonb_build_object(
    'user_id', v_row.user_id, 'nickname', v_row.nickname, 'team_index', v_row.team_index,
    'avatar_path', v_row.avatar_path, 'featured_badges', v_row.featured_badges,
    'favorite_card', v_row.favorite_card
  );
end;
$$;

drop function if exists public.search_league_profiles(text);
create function public.search_league_profiles(p_query text)
returns table (user_id uuid, nickname text, avatar_path text, relation text)
language sql
stable
security definer
set search_path = public
as $$
  select p.user_id, p.nickname, p.avatar_path,
    case
      when f.status = 'accepted' then 'friend'
      when f.requester = auth.uid() then 'outgoing'
      when f.addressee = auth.uid() then 'incoming'
      else 'none'
    end
  from public.league_profiles p
  left join public.league_friendships f
    on (f.requester = auth.uid() and f.addressee = p.user_id)
    or (f.addressee = auth.uid() and f.requester = p.user_id)
  where auth.uid() is not null
    and p.user_id <> auth.uid()
    and char_length(btrim(p_query)) >= 2
    and p.nickname ilike '%' || replace(replace(btrim(p_query), '%', ''), '_', '') || '%'
  order by p.nickname
  limit 20;
$$;

drop function if exists public.list_friends();
create function public.list_friends()
returns table (user_id uuid, nickname text, avatar_path text, relation text)
language sql
stable
security definer
set search_path = public
as $$
  select p.user_id, p.nickname, p.avatar_path,
    case
      when f.status = 'accepted' then 'friend'
      when f.requester = auth.uid() then 'outgoing'
      else 'incoming'
    end
  from public.league_friendships f
  join public.league_profiles p
    on p.user_id = case when f.requester = auth.uid() then f.addressee else f.requester end
  where auth.uid() in (f.requester, f.addressee)
  order by p.nickname;
$$;

-- Nickname and avatar are public; team, badges and favourite player only for the owner and friends.
create or replace function public.get_league_profile(p_user uuid)
returns jsonb
language plpgsql
stable
security definer
set search_path = public
as $$
declare
  v_row public.league_profiles;
  v_self boolean := p_user = auth.uid();
  v_friend boolean;
  v_open boolean;
begin
  select * into v_row from public.league_profiles where user_id = p_user;
  if not found then return null; end if;
  v_friend := exists (
    select 1 from public.league_friendships
    where status = 'accepted'
      and ((requester = auth.uid() and addressee = p_user) or (addressee = auth.uid() and requester = p_user))
  );
  v_open := v_self or v_friend;
  return jsonb_build_object(
    'user_id', v_row.user_id,
    'nickname', v_row.nickname,
    'avatar_path', v_row.avatar_path,
    'is_self', v_self,
    'is_friend', v_friend,
    'team_index', case when v_open then v_row.team_index else null end,
    'featured_badges', case when v_open then to_jsonb(v_row.featured_badges) else '[]'::jsonb end,
    'favorite_card', case when v_open then v_row.favorite_card else null end
  );
end;
$$;

do $$
declare
  fn text;
begin
  foreach fn in array array[
    'update_my_profile(text, text[], text)', 'ensure_my_profile()',
    'search_league_profiles(text)', 'list_friends()', 'get_league_profile(uuid)'
  ] loop
    execute format('revoke all on function public.%s from public, anon', fn);
    execute format('grant execute on function public.%s to authenticated', fn);
  end loop;
end
$$;
