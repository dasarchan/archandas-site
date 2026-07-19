# Archandas Site

A static personal website and blog for [archandas.com](https://archandas.com), built with [Astro](https://astro.build/).

## Local Setup

```sh
npm install
npm run dev
```

The local site will usually run at `http://localhost:4321`.

This project targets Node 22, which is also what the included GitHub Actions workflow uses.

## Editing Content

- Home page: `src/pages/index.astro`
- About page: `src/pages/about.astro`
- Projects page: `src/pages/projects.astro`
- Blog posts: `src/content/posts/*.md`
- Global design: `src/styles/global.css`
- Site URL: `astro.config.mjs`

To add a post, create a new Markdown file in `src/content/posts`:

```md
---
title: "Post Title"
description: "Short description for previews and SEO."
pubDate: 2026-07-19
tags: ["notes"]
---

Write here.
```

## Build

```sh
npm run build
```

The static site is generated in `dist`.

If you are running inside a restricted sandbox and Astro tries to write telemetry preferences outside the project, use:

```sh
ASTRO_TELEMETRY_DISABLED=1 npm run build
```

## First GitHub Push

Create a new empty repository on GitHub, then run these commands from this folder:

```sh
git init
git add .
git commit -m "Initial personal site"
git branch -M main
git remote add origin git@github.com:YOUR_GITHUB_USERNAME/archandas-site.git
git push -u origin main
```

Use the HTTPS remote instead if you prefer GitHub's browser/device login flow.

## Deploy Option A: Cloudflare Pages

Recommended for this site.

1. Push this folder to a GitHub repository.
2. In Cloudflare, add `archandas.com` as a website and move DNS to Cloudflare if it is not already there.
3. Go to **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
4. Select the GitHub repository.
5. Use these build settings:
   - Framework preset: `Astro`
   - Build command: `npm run build`
   - Build output directory: `dist`
6. Deploy the project.
7. In the Pages project, open **Custom domains** and add:
   - `archandas.com`
   - `www.archandas.com`
8. Follow Cloudflare's DNS prompts. If Cloudflare manages the zone, it usually creates the needed records for you.

Suggested DNS shape:

- `archandas.com` should point to the Cloudflare Pages project.
- `www.archandas.com` should point to the Cloudflare Pages project.
- Set one as canonical later if you prefer, but it is fine for both to serve the site.

Useful docs:

- [Cloudflare Pages Git integration](https://developers.cloudflare.com/pages/configuration/git-integration/)
- [Cloudflare Pages custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/)
- [Cloudflare Pages Astro guide](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

## Deploy Option B: GitHub Pages

Use this if you want the fewest moving parts and are happy using GitHub as the host.

1. Push this folder to a GitHub repository.
2. In the repo, go to **Settings** → **Pages**.
3. Set **Build and deployment** to **GitHub Actions**.
4. Keep the included workflow at `.github/workflows/deploy.yml`.
5. After the first successful workflow run, set the custom domain to `archandas.com`.
6. In your DNS provider, configure the records GitHub requests for the apex domain and `www`.
7. Enable **Enforce HTTPS** once GitHub offers the checkbox.

Useful docs:

- [GitHub Pages publishing with GitHub Actions](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [GitHub Pages custom domains](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site)

## Deployment Notes

- Cloudflare Pages and GitHub Pages both support custom domains and HTTPS.
- Cloudflare Pages is usually the better default if you already plan to use Cloudflare DNS.
- A VPS is unnecessary unless you later add dynamic app features, background jobs, private databases, or self-hosted services.
