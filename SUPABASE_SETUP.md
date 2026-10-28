# Set up the shared league

Match results are stored in Supabase, separately from the website files, so redeploying to GitHub Pages will not delete them. To get started:

1. Create a Supabase project and open the **SQL Editor**.
2. Copy the contents of `supabase.sql` and run it once.
3. In **Project Settings → API**, copy the Project URL and the public `anon` or `publishable` key. Add them to `supabase-config.js`. Never put your `service_role` key in this file.
4. In **Authentication → Users**, create two accounts, one for you and one for your friend. Disable public sign-ups; the website has no sign-up form, so only accounts you create can sign in.
5. In **Authentication → URL Configuration**, set your GitHub Pages website address as the Site URL. For example: `https://YOUR-ACCOUNT.github.io/YOUR-REPOSITORY/`.
6. Publish `index.html`, `style.css`, `app.js`, and `supabase-config.js` to GitHub Pages. Keep all files in the same folder.

After signing in, both users will see the same matches and team names. Updates sync through Supabase Realtime. If Realtime is unavailable, the website refreshes the data approximately every 15 seconds.

## Team photos

Add images to your repository, for example in `images/`, then set their relative paths in the `TEAM_PHOTOS` array in `app.js`:

```js
const TEAM_PHOTOS = [
  "images/fc-promashkov.png",
  "images/fc-lionslav.png"
];
```

Use the direct path to each image file in the repository.
