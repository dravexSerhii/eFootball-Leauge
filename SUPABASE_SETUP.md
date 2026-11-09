# Set up the shared league

Match results are stored in Supabase, separately from the website files, so redeploying to GitHub Pages will not delete them. To get started:

1. Create a Supabase project and open the **SQL Editor**.
2. Copy the contents of `sql/supabase.sql` and run it once.
3. In **Project Settings → API**, copy the Project URL and the public `anon` or `publishable` key. Add them to `js/supabase-config.js`. Never put your `service_role` key in this file.
4. In **Authentication → Users**, create two accounts, one for you and one for your friend. Disable public sign-ups; the website has no sign-up form, so only accounts you create can sign in.
5. In **Authentication → URL Configuration**, set the Site URL to `https://dravexserhii.github.io/eFootball-Leauge/` and add the same address under **Redirect URLs**. The production URL must be allow-listed so confirmation and authentication links return to GitHub Pages.
6. Publish `index.html`, `cards.html`, the `global/` folder and the `css/`, `js/` and `assets/` folders to GitHub Pages, preserving the folder structure.

After signing in, both users will see the same matches and team names. Updates sync through Supabase Realtime. If Realtime is unavailable, the website refreshes the data approximately every 15 seconds.

## Team lineups and analytics

For an existing project, run `sql/supabase-migration-lineups.sql` once in the Supabase SQL Editor if the `league_settings.lineups` column is not present. The analytics page reads the saved current lineups and compares the average player OVR for attack, midfield, and defense. Only rated starters are included; substitutes and default placeholder players are excluded. The radar's defense value rises as the opponent's shots and goals conceded decrease.

## League news

For an existing project, run `sql/supabase-migration-league-news.sql` once in the Supabase SQL Editor before publishing the updated app. It creates the news table and public image bucket. Visitors can read news and photos without signing in; only signed-in league members can publish. Photos must be JPEG, PNG or WebP and no larger than 5 MB.

New projects get the news table, bucket and access policies from `sql/supabase.sql`.

## Match statistics

For an existing project, run `sql/supabase-migration-match-stats.sql` once in the Supabase SQL Editor before publishing the updated app. It adds a JSONB column for optional shots, shots on target, possession, and passes; existing match results are preserved. New projects get this column from `sql/supabase.sql`.

Statistics can be left blank. If possession is entered, enter it for both teams and make the total 100%. Saved statistics appear by expanding the match in the Latest matches list.

## League coins

Run `sql/supabase-migration-coins.sql` once in the Supabase SQL Editor. It links each account e-mail to a team (`team_owners`: team 0 = first team in `league_settings.teams`, team 1 = second) and adds the `claim_league_coins()` function. Win = 200 coins, draw = 50, loss = 20. The packs page claims the coins that are not yet collected when a linked account opens it. To link another e-mail or change a team, edit the rows in `team_owners`.

To share one coin balance between the phone and computer, run `sql/supabase-migration-shared-coins.sql` once after the coins migration. On each account, the first device that signs in after this migration seeds the shared wallet from that device's existing local balance and card collection; later devices use the server wallet. The migration also makes match rewards update the shared wallet, and handles pack purchases, duplicate sales, and the daily bonus on the server. Keep the same signed-in account on both devices.

To bind each account to its own team (Barcelona → promashkovsergey363@gmail.com, the second team →
vladlionslav@gmail.com), run `sql/supabase-migration-profiles.sql` once. After sign-in the site shows your team, the
Achievements are scoped to your account, and the main menu opens the league community.

Then run `sql/supabase-migration-teams-friends.sql` once (after the profiles migration). It enforces that each
account can edit only its own team name and lineup, replaces direct match inserts with a two-sided flow (one team
submits a result, the other team confirms it before it is published), and adds nicknames, friend requests, and
player search. A player's team and achievements are shown only to the owner and to accepted friends. Re-publish
the site files together with this migration; the old site cannot add matches after it is applied.

After `sql/supabase-migration-champions-league.sql`, run `sql/supabase-migration-direct-results.sql` and publish
the updated site together with it. Either club can save its league and Champions League results immediately.
Pending proposals are cancelled (their records are retained, but their results are not published). Either participating
club can delete an individual Champions League match; the season's Champions League trophy is recalculated, while
participation medals and other matches remain. If an earlier match is deleted, it must be replayed to restore the
missing leg; subsequent saved matches are not deleted. The old site cannot submit results after this migration.

After the direct-results migration, run `sql/supabase-migration-trophy-shelf.sql` and publish the updated site,
including the `trophy/` folder. Each team receives one lifetime participation medal for its first eLeague match;
the migration replaces the old Champions League participation medals with medals derived from saved eLeague matches.
Completed seasons receive an eLeague trophy after 36 matches, ordered by that season's points, goal difference,
goals scored, then team index. Deleting a league match recalculates its season's trophy, but does not remove a
participation medal. Existing saved results are used to reconstruct award dates and historical trophies; results that
were previously deleted cannot be reconstructed. Champions League trophies remain separate.

Run `sql/supabase-migration-world-cup.sql` after the trophy-shelf migration and publish the updated site and `trophy/`
assets. Starting with the season after migration, each season begins with a six-match FIFA World Cup. League match
insertion is blocked until it has a winner. Table ranking is points, goal difference, then goals scored; a full tie
requires extra matches until one is won. The winner receives a separate World Cup trophy. Matches and analytics are
stored independently from eLeague and Champions League; match statistics are optional. Before the league starts, team
owners can delete the latest tournament match to correct a result. The first active season is fixed when the migration
first runs; re-running the migration does not move it.

Finally run `sql/supabase-migration-profile-extras.sql`. It adds avatars (public `avatars` bucket, every user can write
only into their own folder), up to 3 pinned achievement badges and a favourite player from the card database.

The community is opened from the main menu as a separate social workspace with its own profile, friends,
achievements, and edit-page screens. To enable private messages between accepted friends, run
`sql/supabase-migration-messages.sql` after `sql/supabase-migration-teams-friends.sql` and
`sql/supabase-migration-profile-extras.sql`. The messaging SQL creates the private message table and the
send/read functions; messages can only be sent to accepted friends.

## Team analytics

Open `global/global.html` from the home-page Explore menu to see live ratings, table-points and match-probability charts, team strength, recent form, and rolling match results. The standings chart always replays all saved matches in chronological order, independent of the selected season, starts both teams at zero, and adds 3 points for a win, 1 for a draw, and 0 for a loss. Each team's form grade uses its latest five results across league history: A is at least 70% of possible points, B is 40–69%, and C is below 40%. The radar shows each team's own per-match averages, not a head-to-head possession split; stronger defense extends farther from the center because its score rises as opponent shots and goals conceded decrease. Ratings use a strict mobile scale: attack shots max at 8 per match and goals at 3; defense scores higher for fewer opponent shots (max reference 8) and goals conceded (max reference 3); passes max at a reference of 150, possession uses its team average, and conversion maxes at a reference of 40%. The five axes have equal weight, with unavailable data excluded and remaining weights normalized. The squad strength panel compares average player OVR by attack, midfield, and defense using rated starters in the saved current lineups; substitutes and default placeholder players are excluded. The probability model's base forecast uses each team's latest five matches, weighted from 1 for the oldest to 5 for the newest. The page shows those five results and the model method. The chart keeps a rolling 60-second window; line and percentage values animate smoothly between continuously sampled model probabilities and display two decimal places. Simulated movement between database updates is not new live-match data; saved results and statistics still update the base forecast through Realtime or the 15-second polling fallback. Team crests mark the current points on both the standings and probability charts. The favorite panel explains the model's projected goals, shots, conversion, and opponent shots conceded. Home/away alternates in projections because no fixture schedule is stored. These are estimates, not bookmaker odds. Match-stat analytics read `stats` from the existing public `league_matches` table and need no extra migration. The squad strength panel also needs the `league_settings.lineups` column; existing projects can add it with `sql/supabase-migration-lineups.sql` if necessary.

## Team photos

Team logo files are stored in `assets/img/` and their relative paths are set in the `TEAM_PHOTOS` array in `app.js`:

```js
const TEAM_PHOTOS = [
  "assets/img/logo-promashkov.webp",
  "assets/img/logo-lionslav.webp"
];
```

Keep both image files in the repository when publishing the site.


After running the base schema and `sql/supabase-migration-coins.sql` (which creates `public.team_owners`), run `sql/supabase-migration-cards.sql` once for every project in the Supabase SQL Editor. The cards migration creates the `efootball_cards` table and the public `card-images` bucket. Only authenticated e-mails listed in `team_owners` can add, edit or delete cards; everyone can read them. Built-in cards live in `js/cards-data.js`; changes made in the editor are stored in Supabase and override them by `id`. Updates synchronize to other open Card Database pages through Supabase Realtime, with a 15-second polling fallback if Realtime is unavailable.
