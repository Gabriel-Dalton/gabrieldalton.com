# gabrieldalton.com

Personal website source for [gabrieldalton.com](https://gabrieldalton.com). Static HTML/CSS/JS — no build step. Deployed on Vercel.

## Structure

```
.
├── index.html                  Home — hero, what I'm working on, about, speaking, writing, contact
├── speaking.html               Speaker page — bio, topics, past talks, inquiry CTA
├── writing.html                Writing index with category filter
├── writing/                    Blog post pages (one HTML file per post)
├── references.html             References & resources (PDFs, quotes, citations, links)
├── headshots.html              Press headshots
├── message-sent.html           Contact-form thank-you page
├── under-maintenance.html      Maintenance placeholder
├── css/
│   ├── main.css                Full design system (green/white, modern)
│   └── references.css          References-page-specific (PDF modal)
├── js/
│   ├── main.js                 Shared script — filters, search, copy-email, form
│   └── references.js           References data & modal handler
├── img/                        Photos, logos, icons, project thumbnails
├── files/                      PDF documents
├── vercel.json                 Vercel config — cleanUrls + 301 redirects
├── robots.txt
└── sitemap.xml
```

## Design system

- **Palette**: deep forest green (`--green-900: #0a3522`) on white, with paper (`#fafaf8`) and pale-green (`--green-50`) tinted sections.
- **Type**: Bricolage Grotesque (display) + Hanken Grotesk (body) + IBM Plex Mono (metadata) — all from Google Fonts.
- **Components**: cards, filter chips, buttons (primary/secondary/ghost), forms, talks list, topics grid, CTA band, post-article.

All design tokens live as CSS custom properties at the top of `css/main.css`.

## Adding a new blog post

1. Copy any file in `writing/` as a template (e.g. `wcag-22-in-practice.html`).
2. Save it as `writing/your-slug.html`.
3. Update the `<title>`, meta tags, header (date, category, lede), and content.
4. Add a card to `writing.html` linking to `/writing/your-slug` with the right `data-filter-categories` (`sustainability`, `ai`, `a11y`, `nonprofit`, `projects`, `speaking`).
5. Add the URL to `sitemap.xml`.

## Adding a new reference / resource

Edit the `resources` array at the top of `js/references.js`. Supported `type` values:

- `recommendation` / `recognition` — letter PDFs that open in the in-page modal
- `press` — external article links
- `quote` — written quotes (no link, rendered as a blockquote)
- `link` — external partner/organization resources
- `note` — short written notes (rendered inline)

## External dependencies

- **Google Fonts** (Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono).

Everything else (CSS, JS, images, PDFs) is local and served from the same domain.
