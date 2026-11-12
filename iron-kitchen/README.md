# Iron Kitchen

A private, phone-first recipe app for iron-rich toddler meals. Tap recipes onto a
list, and it builds one combined shopping list you can share straight into Google Keep.

- No server, no database, no build step. Just static files.
- Works offline once it has loaded (handy in the grocery store).
- Can be installed to the Android home screen (Chrome menu ⋮ → **Add to Home screen** / **Install app**).

## Files

| Path | What it is |
|---|---|
| `recipes/<name>.js` | **One file per recipe.** |
| `recipes/index.js` | The list of recipe files, in display order. |
| `data/catalog.js` | Shared ingredient catalogue (names, aisles, package sizes) and the iron tips. |
| `tools/check.js` | Data checker: run `node tools/check.js`. GitHub runs it before every deploy. |
| `.github/workflows/deploy.yml` | Checks the data, then publishes to GitHub Pages. A failed check means nothing is published. |
| `app.js`, `index.html` | App logic, layout and styles. |
| `sw.js`, `manifest.webmanifest`, `icons/` | Offline support and home-screen install. |

## Publish on GitHub Pages (one-time setup)

1. Push this folder to a GitHub repository (e.g. `iron-kitchen`), branch `main`.
2. In the repo: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
3. Each push to `main` now checks and deploys automatically (Actions tab shows progress, ~1 min).
4. The site is at `https://<your-username>.github.io/iron-kitchen/`. Open it on both phones in Chrome → ⋮ → **Add to Home screen**.

> **Privacy note:** on a free GitHub plan, Pages needs a **public** repository, so the code and recipe data
> are visible on GitHub. The site itself is reachable by anyone with the URL (not indexed by search engines).
> Nothing personal is stored in the repo; favourites and lists stay on each phone.

## Sharing to Google Keep

- **Share to Keep** opens Android's share sheet. Pick Keep and a new note is created with
  one item per line. In Keep, tap ⋮ → **Show checkboxes** to turn it into a tick list.
- **Copy** puts the same text on the clipboard if you'd rather paste.
- Items you've ticked as "have it" are left out. Pantry staples (oil, salt, pepper,
  maple syrup) start ticked.

## Adding a recipe

1. Copy an existing file in `recipes/` (pick a similar one) to `recipes/<new-name>.js`.
   Use lowercase and dashes, and set `id` inside the file to the same name.
2. Add `"<new-name>",` to `recipes/index.js` where you want it to appear.
3. Every ingredient's `k` must exist in `ITEMS` in `data/catalog.js`; add new ingredients there with a name and aisle.
   Reusing an existing key (e.g. `strawberries`) lets the shopping list combine amounts across recipes.
4. Run `node tools/check.js` (or just push; GitHub runs it and won't publish if something is wrong).

Field reference (also in the comment at the top of `data/catalog.js`):

- `shop: { q, u }`: what to buy when it differs from the recipe amount ("1 cup chopped onion" → `shop: { q: 1, u: "each" }`).
- `tags`: any of `"no-cook"`, `"freezer"`, `"quick"`.
- `nutrition` is per serving, with `basis: "source"` if published by the recipe, otherwise `"estimate"`.
- `kidPortion`: the fraction of one serving a toddler eats (used for the iron-per-portion line).

Or ask Claude: "add this recipe to Iron Kitchen: <link>".

## Known limits

- **Favourites and the list are stored per phone** (browser storage). Your wife's phone
  won't see your favourites. Shared syncing would need a small backend; skipped on purpose to keep this zero-maintenance.
- Clearing Chrome's site data clears favourites and the list.
- Nutrition values are estimates (USDA FoodData Central) unless marked as from the source. Not medical advice.
