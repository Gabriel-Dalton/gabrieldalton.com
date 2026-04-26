# gabrieldalton.com

Source for [gabrieldalton.com](https://gabrieldalton.com). Static HTML/CSS/JS — no build step. Deployed on Vercel.

## Repository layout

```
.
├── v2/    ← active site (deployed)
└── v1/    ← archived snapshot of the previous design
```

`v2/` is the current production site. `v1/` is a frozen copy of the previous design (the post-DashNex cleanup) kept for reference and roll-back if ever needed.

## Deploying from `v2/`

Vercel deploys from the project's **Root Directory**. Set it once:

1. Go to the Vercel dashboard → this project → **Settings → General → Root Directory**.
2. Click **Edit**, set the root directory to `v2`, and save.
3. The next deploy will serve `v2/` as `/`. Everything inside (HTML, `css/`, `js/`, `img/`, `files/`) becomes available at the site root.

`v2/vercel.json` provides clean URLs (`/writing` → `writing.html`) and the 301 short-link redirects (`/freewebsite`, `/translink`, `/book`, etc.).

## What lives where in `v2/`

```
v2/
├── index.html                   Home — hero, working-on, about, speaking preview, writing preview, contact CTA
├── speaking.html                Speaking page — bio, TEDx feature, topics, talks, inquiry CTA
├── writing.html                 Writing index with category filter
├── writing/                     Blog post pages (one HTML file per post)
├── references.html              References & resources hub (PDFs, quotes, citations, links)
├── contact.html                 Custom secure contact form (honeypot, time-trap, rate-limit, email autofill)
├── headshots.html               Press headshots
├── message-sent.html            Form thank-you page
├── under-maintenance.html       Maintenance placeholder
├── css/main.css                 Design system
├── css/references.css           References-page modal styles
├── js/main.js                   Shared script (filters, search, year stamps, form validation, nav active state)
├── js/contact.js                Contact form: autofill, validation, time-trap, rate-limit, security
├── js/references.js             References data + PDF modal
├── img/                         Photos, logos, icons, project thumbnails
│   └── headshot.jpg             ★ Primary press headshot — 2.5 MB, 300 DPI
├── files/                       PDF documents (8 letters / certificates)
├── vercel.json                  Vercel cleanUrls + redirects
├── robots.txt
└── sitemap.xml
```

## Updating the headshot

The official press headshot is `v2/img/headshot.jpg` (2.5 MB JPEG, 300 DPI). To replace it, save the new file at exactly that path. Every page that displays the headshot reads from there.

## Updating the TEDx video URL

Two `<a ... data-tedx-url>` elements are wired up to point at the TEDx talk:
- the featured-video card on `v2/speaking.html`
- the small "Watch ↗" link in the speaking talks list (both speaking and home pages)

Both currently point at `#`. When the video is live, find-and-replace `href="#" data-tedx-url` with the real URL across `v2/speaking.html` and `v2/index.html`.

## External dependencies

- **Google Fonts** — Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono.
- **FormSubmit** — handles the contact form relay; the destination email is hashed in the form `action` and never exposed in source.

Everything else (CSS, JS, images, PDFs) is local.
