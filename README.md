# prmpsmart.github.io

Portfolio of **Miracle Apata** ([@prmpsmart](https://github.com/prmpsmart)), live at <https://prmpsmart.github.io>.

Built with React, Vite, and Tailwind CSS, and deployed to GitHub Pages by `.github/workflows/deploy.yml` on every push to `main`.

## Editing content

Everything the site says is in [`portfolio.config.ts`](./portfolio.config.ts): profile, intro, skills, projects, experience, education, certifications, and publications.

- **Photo:** the site uses your GitHub avatar. To use your own, add an image to `public/` (e.g. `public/me.jpg`) and set `profile.photo: '/me.jpg'`. `profile.backgroundImage` sets the full-screen background separately.
- **Meeting link:** set `profile.meetingUrl` (e.g. Calendly) to turn the header's "Hire me" button into "Schedule a meeting".
- **Résumé:** `public/resume.pdf`, linked from the About page.
- **Skill icons:** use [Devicon](https://devicon.dev) slugs such as `python/python-original`.

## Pages

| Route           | Content                                           |
| --------------- | ------------------------------------------------- |
| `/`             | Hero, skills marquee, featured projects           |
| `/about`        | Bio, focus areas, education, recognition          |
| `/portfolio`    | Filterable projects plus live GitHub repositories |
| `/skills`       | Filterable skill grid                             |
| `/experience`   | Work timeline                                     |
| `/contact`      | Step-by-step form that opens an email draft       |
| `/publications` | Research papers                                   |

To add a page, create it in `src/pages/`, register it in `PAGES` (`src/main.tsx`) and `NAV` (`src/Layout.tsx`), and add the route to `ROUTES` in `vite.config.ts` so GitHub Pages serves it.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
npm run preview
```
