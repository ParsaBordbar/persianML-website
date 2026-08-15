# PersianML website

Landing page for the PersianML community — Bina OCR models, collections, datasets, benchmarks.

**🔗 Live site: <https://parsabordbar.github.io/persianML-website/>**

Built with React 19 + TypeScript + Vite + Tailwind CSS v4. Bilingual via i18next — Persian (RTL) by default, English available from the nav.

## Sections

| Anchor | Content |
| --- | --- |
| `#top` | Hero + link to [persianvlm.com](https://persianvlm.com) |
| `#bina` | Bina OCR model family |
| `#collections` | Model collections |
| `#datasets` | Datasets and benchmarks |
| `#community` | How to contribute / contributors |

## Develop

```bash
npm install
npm run dev       # vite dev server
```

## Build

```bash
npm run build     # tsc -b && vite build → dist/
npm run preview   # serve dist/ locally
npm run lint      # oxlint
```

## Layout

```
src/
  App.tsx        # whole page — all sections
  LiveTest.tsx   # in-page OCR demo
  i18n.ts        # fa/en translation strings
  index.css      # Tailwind entry + theme tokens
public/          # fonts, icons, logo, demo assets
deploy/          # nginx config for self-hosting
.github/workflows/deploy.yml
```

## Deploy

Push to `main` runs `.github/workflows/deploy.yml`: lint → build → publish `dist/` to GitHub Pages. Enable once in **Settings → Pages → Source: GitHub Actions**.

`vite.config.ts` sets `base: '/persianML-website/'` for the project-page subpath. Runtime references to files in `public/` use `import.meta.env.BASE_URL`. If the repo is renamed or moved to a custom domain, change both (custom domain → `base: '/'` plus a `public/CNAME`).

`deploy/bina.bbrand.ir.conf` is an nginx config for self-hosting the same `dist/` output; unused by GitHub Pages.
