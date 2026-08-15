# PersianML website

Landing page for the PersianML community — Bina OCR models, datasets, benchmarks. React + TypeScript + Vite + Tailwind, bilingual (FA default / EN) via i18next.

Live: https://parsabordbar.github.io/persianML-website/

## Develop

```bash
npm install
npm run dev
```

## Build

```bash
npm run build     # tsc -b && vite build → dist/
npm run preview
npm run lint
```

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`: build, then publish `dist/` to GitHub Pages. Enable it once in **Settings → Pages → Source: GitHub Actions**.

`vite.config.ts` sets `base: '/persianML-website/'` for the project-page subpath. Runtime references to files in `public/` use `import.meta.env.BASE_URL`. Change both the base and that URL if the repo is renamed or moved to a custom domain (custom domain → `base: '/'` plus a `public/CNAME`).

`deploy/bina.bbrand.ir.conf` is an nginx config for self-hosting the same `dist/` output; unused by GitHub Pages.
