# Qpushly — User Guide

The merchant-facing documentation site for the **Qpushly** Shopify app. Content is
plain MDX in numbered folders — **edit a file, deploy, done**.

Same engine as [`qsortby-user-guide`](../qsortby-user-guide): that repo is written
as a reusable guide template, so this one is a copy of the engine with
`src/config.ts` pointed at Qpushly and new content. Fixes to the engine should
ideally land in both.

- 21 articles across 6 topics
- Astro 4 + MDX, static output, one small client script
- Self-hosted Inter / JetBrains Mono / Instrument Serif — no third-party origin
- Deploys to Netlify (`netlify.toml` included), intended for `guide.qpushly.com`

## Run

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/ (static)
```

Or double-click **Start Guides.command** on macOS — installs on first run, starts
the server on port 4323, opens the browser.

## Structure = folders + numbers

Categories are **folders**; order comes from a **numeric prefix** on folders and
files. The prefix is **stripped from the URL**, so links stay clean.

```
src/content/docs/
  1-getting-started/     → "Getting started"
    10-welcome.mdx       → /docs/getting-started/welcome
    20-install.mdx       → /docs/getting-started/install
    30-theme-embed.mdx   → /docs/getting-started/theme-embed
    40-quickstart.mdx
    50-dashboard.mdx
  2-automations/         → the five automations + how they all work
  3-campaigns/           → writing, scheduling, and reading results
  4-subscribers/         → the list, import/export
  5-settings/            → settings, plan & billing
  6-help/                → troubleshooting, privacy, FAQ
```

- **Folder number** orders the sidebar groups; **file number** orders pages within one.
- Use **steps of 10** so you can insert `15-` later without renumbering.
- Numbers compare **as numbers**, so `100-` sorts after `90-`.
- Group labels come from the folder name; page titles from frontmatter.

### Frontmatter

```mdx
---
title: Turn on the theme app embed   # required
description: One-line summary         # shown under the title + on home cards
updated: 2026-08-05                   # "Last updated"
draft: false                          # true = excluded from build
---
```

### Rich content

`.mdx` only (not `.md`). Import at the top of the file:

```mdx
import Callout from '../../../components/Callout.astro';
import Video from '../../../components/Video.astro';

<Callout type="danger" title="Do this first">Markdown inside.</Callout>
```

`Callout` types: `note` · `tip` · `warning` · `danger`. Import path is
`../../../components/…` from inside a two-level docs folder.

### Per-article icons

`src/lib/icons.ts` maps each article slug to a line icon used in the sidebar and on
the home cards. **Adding an article without adding it to the `DOC` map** gives it
its section's generic icon — not an error, but it looks unfinished next to the rest.

## Theming — `src/config.ts`

One file. `preset: 'qpushly'` selects the blue accent (`#2f6fed`) and the "signal"
logo glyph from the shared QDN-family preset table.

> **Engine change made here:** the original template claimed a one-file reskin but
> hardcoded QSortby's green in several places — `#cbe8da` borders, `#dbece4` card
> edges, and `rgba(0,163,107,…)` glows in `src/pages/index.astro` and
> `src/styles/global.css`. A guide reskinned to another colour kept green borders.
>
> Fixed by adding two values to every preset — **`accentLine`** (border tint) and
> **`accentRgb`** (`r,g,b`, for the rgba glows) — emitted as `--accent-line` and
> `--accent-rgb` from `Base.astro`, with the hardcoded values replaced. The reskin
> is now genuinely complete. **Worth porting back to `qsortby-user-guide`** so the
> two engines do not drift.

The accent must stay in sync with the marketing site
(`qpushly-web/tailwind.config.mjs` → `blue.*` and its `global.css` `:root`).

## ⚠️ Before publishing

### Screenshots — the main gap

`public/assets/` is **empty**. The QSortby guide illustrates each article with step
screenshots (`public/assets/<topic>/qsortby-<topic>-step-01.png`); this guide is
text-only, because the screenshots have to come from a real Qpushly install with
real data.

The articles are written to read correctly without images, so nothing is broken —
but screenshots would materially help, in this order of value:

1. **`1-getting-started/30-theme-embed.mdx`** — the theme editor → App embeds
   panel. This is the step merchants get stuck on, and the single highest-value
   screenshot in the whole guide.
2. **`1-getting-started/40-quickstart.mdx`** — Settings defaults, and the
   Automations → Welcome reminder editor.
3. **`2-automations/10-automations-overview.mdx`** — the automations list with its
   four per-automation numbers.
4. **`3-campaigns/10-create-campaign.mdx`** — the campaign editor.
5. **`4-subscribers/10-subscriber-list.mdx`** — the list with device segments.

Drop them in `public/assets/<topic>/` and reference `/assets/<topic>/name.png`.
Keep video out of git — host it and use `<Video src="…" />`.

### Content accuracy

Every behavioural claim here was written from the app's source rather than from the
UI, so these are the specific things to re-verify against a live install:

- **The ten-minute cart-abandonment threshold** and the **ten-minute scheduler
  sweep**, both quoted in several articles. If either changes, grep the guide for
  "ten minutes".
- **The three-reminder cap** per automation.
- **The ~30-minute attribution window** on a notification click, described in
  `3-campaigns/30-campaign-results.mdx`.
- **The Free/Pro feature split is deliberately NOT described here.** The app
  currently gates nothing on plan (see P0-4 in the app repo's
  `docs/APP_STORE_SUBMISSION.md`), so `5-settings/20-plan-and-billing.mdx` says
  "Shopify's plan page is the authority" instead of listing features. Once the app
  really enforces a split, document it — and keep it identical to
  `qpushly-web/src/plans.ts` and the App Store listing.

### Links out

`src/config.ts` → `homeUrl` points at `https://qpushly.com`, and
`astro.config.mjs` → `site` at `https://guide.qpushly.com`. Both are placeholders
until those domains exist.

### A note on the default view

A first-time reader lands in **focus mode**, with the sidebar and table of contents
collapsed to edge affordances plus a one-time "Got it" hint. That is the template's
inherited behaviour, unchanged here so both guides look the same. If you decide it
is the wrong default for a docs site, the logic is the `ugs_doc_focus` block in
`src/layouts/DocLayout.astro` — change it in **both** repos.

## Optional: search

[Pagefind](https://pagefind.app) gives zero-infra static search:

```bash
npm i -D pagefind
# package.json → "postbuild": "pagefind --site dist"
```

Worth adding once the guide passes ~25 articles.

## Deploy

Push to Git → connect Netlify (`netlify.toml` sets the command and publish dir).
Point `guide.qpushly.com` at it. Or upload `dist/` to any static host.
