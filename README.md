# gabrieldalton.com

Source for [gabrieldalton.com](https://gabrieldalton.com). Static HTML/CSS/JS — no build step. Deployed on Vercel.

## Repository layout

```
.
├── index.html, *.html, css/, js/, img/, ...   ← current site (v3)
└── archive/
    ├── v1/    ← frozen snapshot of the original design
    └── v2/    ← frozen snapshot of the previous design
```

The current site lives at the repo root. `archive/v1/` and `archive/v2/` are frozen copies of earlier designs, kept for reference and roll-back if ever needed.

> **Vercel deployment note:** If the Vercel project's **Root Directory** is still set to `v2`, update it to the repo root (blank/`./`) under **Settings → General → Root Directory** so the new site at the root is served.

## What lives where

```
.
├── index.html                   Home
├── about.html                   About
├── speaking.html                Speaking
├── writing.html                 Writing index
├── writing/                     Blog post pages (one HTML file per post)
├── portfolio.html               Portfolio index
├── portfolio/                   Individual project pages
├── cv.html                      CV
├── contact.html                 Contact form
├── message-sent.html            Form thank-you page
├── css/main.css                 Design system
├── js/contact.js                Contact form behaviour
├── js/newsletter-widget.js      Newsletter widget
├── img/                         Photos, logos, icons, project thumbnails
│   ├── favicon.svg
│   ├── headshot.jpg             Primary press headshot
│   ├── logos/
│   └── projects/
├── robots.txt
├── sitemap.xml
└── archive/                     Frozen previous designs (v1, v2)
```

## External dependencies

- **Google Fonts** — Bricolage Grotesque, Hanken Grotesk, IBM Plex Mono.
- **FormSubmit** — handles the contact form relay; the destination email is hashed in the form `action` and never exposed in source.

Everything else (CSS, JS, images) is local.
