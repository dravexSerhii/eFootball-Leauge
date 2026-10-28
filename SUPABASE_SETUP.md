# Set up the shared league

Match results are stored in Supabase, separately from the website files, so redeploying to GitHub Pages will not delete them. To get started:

1. Create a Supabase project and open the **SQL Editor**.
2. Copy the contents of `supabase.sql` and run it once.
3. In **Project Settings → API**, copy the Project URL and the public `anon` or `publishable` key. Add them to `supabase-config.js`. Never put your `service_role` key in this file.
4. In **Authentication → Users**, create two accounts, one for you and one for your friend. Disable public sign-ups; the website has no sign-up form, so only accounts you create can sign in.
5. In **Authentication → URL Configuration**, set the Site URL to `https://dravexserhii.github.io/eFootball-Leauge/` and add the same address under **Redirect URLs**. The production URL must be allow-listed so confirmation and authentication links return to GitHub Pages.
6. Publish `index.html`, `style.css`, `app.js`, and `supabase-config.js` to GitHub Pages. Keep all files in the same folder.

After signing in, both users will see the same matches and team names. Updates sync through Supabase Realtime. If Realtime is unavailable, the website refreshes the data approximately every 15 seconds.

## League news

For an existing project, run `supabase-migration-league-news.sql` once in the Supabase SQL Editor before publishing the updated app. It creates the news table and public image bucket. Visitors can read news and photos without signing in; only signed-in league members can publish. Photos must be JPEG, PNG or WebP and no larger than 5 MB.

New projects get the news table, bucket and access policies from `supabase.sql`.

## Match statistics

For an existing project, run `supabase-migration-match-stats.sql` once in the Supabase SQL Editor before publishing the updated app. It adds a JSONB column for optional shots, shots on target, possession, and passes; existing match results are preserved. New projects get this column from `supabase.sql`.

Statistics can be left blank. If possession is entered, enter it for both teams and make the total 100%. Saved statistics appear by expanding the match in the Latest matches list.

## Team photos

Team logo files are stored in `img/` and their relative paths are set in the `TEAM_PHOTOS` array in `app.js`:

```js
const TEAM_PHOTOS = [
  "img/logo-promashkov.webp",
  "img/logo-lionslav.webp"
];
```

Keep both image files in the repository when publishing the site.
