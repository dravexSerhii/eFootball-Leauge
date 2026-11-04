-- Shared account wallets for league rewards and pack purchases.
-- The first authenticated device seeds the wallet from its existing local save.

create table if not exists public.league_coin_wallets (
  user_id uuid primary key references auth.users (id) on delete cascade,
  balance integer not null default 0 check (balance >= 0),
  bonus_claimed_at timestamptz
);

create table if not exists public.league_pack_cards (
  player_id text primary key,
  tier text not null check (tier in ('gold', 'rare', 'epic', 'icon', 'ballon'))
);

insert into public.league_pack_cards (player_id, tier) values
  ('pele', 'icon'), ('maradona', 'icon'), ('mbappe', 'epic'), ('dembele', 'epic'),
  ('olise', 'epic'), ('messi', 'ballon'), ('kvaratskhelia', 'rare'), ('cannavaro', 'epic'),
  ('ronaldo', 'ballon'), ('kante', 'gold'), ('vinicius', 'epic'), ('bellingham', 'epic'),
  ('raphinha', 'rare'), ('neymar', 'rare'), ('aguero', 'rare'), ('bsilva', 'gold'),
  ('forlan', 'gold'), ('cucurella', 'gold'), ('rodri', 'epic'), ('saliba', 'rare'),
  ('yamal', 'epic'), ('kimmich', 'rare'), ('suarez', 'rare'), ('kane', 'epic'),
  ('ronaldinho', 'icon'), ('buffon', 'icon'), ('kahn', 'epic'), ('neuer', 'epic'),
  ('thuram', 'epic'), ('pedri', 'rare'), ('kounde', 'gold'), ('huijsen', 'gold'),
  ('zabarnyi', 'gold'), ('mckennie', 'gold'), ('courtois', 'epic'), ('trent', 'rare'),
  ('valverde', 'rare'), ('lautaro', 'rare'), ('mendes', 'gold'), ('safonov', 'gold')
on conflict (player_id) do update set tier = excluded.tier;

create table if not exists public.league_pack_inventory (
  user_id uuid not null references auth.users (id) on delete cascade,
  player_id text not null references public.league_pack_cards (player_id),
  quantity integer not null default 0 check (quantity >= 0),
  primary key (user_id, player_id)
);

insert into public.team_owners (email, team_index) values
  ('promashkovsergey363@gmail.com', 0),
  ('vladlionslav@gmail.com', 1)
on conflict (email) do update set team_index = excluded.team_index;

alter table public.league_coin_wallets enable row level security;
alter table public.league_pack_inventory enable row level security;
grant select on public.league_coin_wallets, public.league_pack_inventory to authenticated;

drop policy if exists "Users can read their own coin wallet" on public.league_coin_wallets;
create policy "Users can read their own coin wallet"
  on public.league_coin_wallets for select to authenticated using (auth.uid() = user_id);

drop policy if exists "Users can read their own pack inventory" on public.league_pack_inventory;
create policy "Users can read their own pack inventory"
  on public.league_pack_inventory for select to authenticated using (auth.uid() = user_id);

drop function if exists public.claim_league_coins();

create or replace function public.claim_league_coins(
  p_initial_balance integer default 0,
  p_initial_inventory jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_email text := lower(btrim(coalesce(auth.jwt() ->> 'email', '')));
  v_team smallint;
  v_earned integer;
  v_claimed integer;
  v_granted integer := 0;
  v_balance integer;
  v_bonus_at timestamptz;
  v_inserted integer;
  v_item record;
begin
  if v_uid is null then
    raise exception 'Authentication required';
  end if;

  insert into league_coin_wallets (user_id, balance)
  values (v_uid, greatest(0, least(coalesce(p_initial_balance, 0), 100000)))
  on conflict (user_id) do nothing;
  get diagnostics v_inserted = row_count;

  if v_inserted = 1 then
    for v_item in
      select key as player_id, value as quantity
      from jsonb_each_text(coalesce(p_initial_inventory, '{}'::jsonb))
    loop
      if v_item.quantity ~ '^[0-9]{1,5}$' and exists (
        select 1 from league_pack_cards where player_id = v_item.player_id
      ) then
        insert into league_pack_inventory (user_id, player_id, quantity)
        values (v_uid, v_item.player_id, least(v_item.quantity::integer, 10000))
        on conflict (user_id, player_id) do nothing;
      end if;
    end loop;
  end if;

  select team_index into v_team
  from team_owners
  where lower(btrim(email)) = v_email
  limit 1;

  if v_team is not null then
    insert into league_reward_claims (user_id, claimed) values (v_uid, 0)
    on conflict (user_id) do nothing;

    select claimed into v_claimed
    from league_reward_claims
    where user_id = v_uid
    for update;

    select coalesce(sum(
      case
        when home_goals = away_goals then 50
        when (home_team = v_team and home_goals > away_goals)
          or (away_team = v_team and away_goals > home_goals) then 200
        else 20
      end), 0)::integer
    into v_earned
    from league_matches
    where home_team = v_team or away_team = v_team;

    v_granted := greatest(0, v_earned - v_claimed);
    update league_reward_claims set claimed = v_claimed + v_granted where user_id = v_uid;
    update league_coin_wallets set balance = balance + v_granted where user_id = v_uid;
  end if;

  select balance, bonus_claimed_at into v_balance, v_bonus_at
  from league_coin_wallets where user_id = v_uid;
  return jsonb_build_object(
    'team', v_team,
    'earned', coalesce(v_earned, 0),
    'granted', v_granted,
    'balance', v_balance,
    'bonus_at', v_bonus_at
  );
end;
$$;

create or replace function public.open_league_pack(
  p_initial_balance integer default 0,
  p_initial_inventory jsonb default '{}'::jsonb
)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_balance integer;
  v_quantity integer;
  v_roll numeric;
  v_tier text;
  v_player_id text;
begin
  if v_uid is null then raise exception 'Authentication required'; end if;

  perform claim_league_coins(p_initial_balance, p_initial_inventory);
  select balance into v_balance from league_coin_wallets where user_id = v_uid for update;
  if v_balance < 1000 then
    return jsonb_build_object('purchased', false, 'balance', v_balance);
  end if;

  v_roll := random() * 100.5;
  v_tier := case
    when v_roll < 72 then 'gold'
    when v_roll < 92 then 'rare'
    when v_roll < 99 then 'epic'
    when v_roll < 100 then 'icon'
    else 'ballon'
  end;
  select player_id into v_player_id
  from league_pack_cards
  where tier = v_tier
  order by random()
  limit 1;

  update league_coin_wallets set balance = balance - 1000 where user_id = v_uid returning balance into v_balance;
  insert into league_pack_inventory (user_id, player_id, quantity)
  values (v_uid, v_player_id, 1)
  on conflict (user_id, player_id) do update
    set quantity = league_pack_inventory.quantity + 1
  returning quantity into v_quantity;

  return jsonb_build_object(
    'purchased', true,
    'balance', v_balance,
    'quantity', v_quantity,
    'player_id', v_player_id
  );
end;
$$;

create or replace function public.claim_league_daily_bonus()
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_balance integer;
  v_bonus_at timestamptz;
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select balance, bonus_claimed_at into v_balance, v_bonus_at
  from league_coin_wallets where user_id = v_uid for update;
  if not found then raise exception 'Wallet is not initialized'; end if;

  if v_bonus_at is not null and v_bonus_at > now() - interval '24 hours' then
    return jsonb_build_object('claimed', false, 'balance', v_balance, 'bonus_at', v_bonus_at);
  end if;

  update league_coin_wallets
  set balance = balance + 100, bonus_claimed_at = now()
  where user_id = v_uid
  returning balance, bonus_claimed_at into v_balance, v_bonus_at;

  return jsonb_build_object('claimed', true, 'balance', v_balance, 'bonus_at', v_bonus_at);
end;
$$;

create or replace function public.sell_league_duplicate(p_player_id text)
returns jsonb
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_tier text;
  v_price integer;
  v_balance integer;
  v_quantity integer;
begin
  if v_uid is null then raise exception 'Authentication required'; end if;
  select balance into v_balance from league_coin_wallets where user_id = v_uid for update;
  if not found then raise exception 'Wallet is not initialized'; end if;

  select c.tier, i.quantity into v_tier, v_quantity
  from league_pack_cards c
  join league_pack_inventory i on i.player_id = c.player_id
  where c.player_id = p_player_id and i.user_id = v_uid
  for update of i;

  if v_quantity is null or v_quantity < 2 then
    return jsonb_build_object('sold', false, 'balance', v_balance);
  end if;

  v_price := case v_tier
    when 'gold' then 150 when 'rare' then 400 when 'epic' then 1000
    when 'icon' then 2500 when 'ballon' then 5000
  end;
  update league_pack_inventory set quantity = quantity - 1
  where user_id = v_uid and player_id = p_player_id;
  update league_coin_wallets set balance = balance + v_price
  where user_id = v_uid returning balance into v_balance;

  return jsonb_build_object('sold', true, 'balance', v_balance, 'quantity', v_quantity - 1);
end;
$$;

revoke all on function public.claim_league_coins(integer, jsonb) from public, anon;
revoke all on function public.open_league_pack(integer, jsonb) from public, anon;
revoke all on function public.claim_league_daily_bonus() from public, anon;
revoke all on function public.sell_league_duplicate(text) from public, anon;

grant execute on function public.claim_league_coins(integer, jsonb) to authenticated;
grant execute on function public.open_league_pack(integer, jsonb) to authenticated;
grant execute on function public.claim_league_daily_bonus() to authenticated;
grant execute on function public.sell_league_duplicate(text) to authenticated;

do $$
begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime'
      and schemaname = 'public'
      and tablename = 'league_coin_wallets'
  ) then
    alter publication supabase_realtime add table public.league_coin_wallets;
  end if;
end;
$$;
