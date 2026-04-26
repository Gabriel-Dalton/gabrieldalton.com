# gabrieldalton.com

Personal website source for [gabrieldalton.com](https://gabrieldalton.com). Static HTML/CSS/JS — no build step.

## Structure

```
.
├── index.html              About / Resume / Portfolio / Contact (single page, tab-switched)
├── references.html         Letters of recommendation & recognition
├── headshots.html          Press headshots
├── message-sent.html       Contact form thank-you page
├── under-maintenance.html  Maintenance placeholder
├── css/                    Stylesheets
├── js/                     Scripts
├── img/                    Photos, logos, icons, project thumbnails
├── files/                  PDF documents (letters, certificates)
├── .htaccess               301 redirects for short-link aliases
├── robots.txt
└── sitemap.xml
```

## External dependencies

Two third-party CDN dependencies are still loaded over the network:

- **Google Fonts** — Poppins (homepage, headshots, etc.) and Inter (references). To self-host, download the woff2 files and replace the `<link>` tags with `@font-face` rules in `css/`.
- **ionicons 7.1.0** via jsDelivr — used for `<ion-icon>` elements throughout the site. To self-host, copy the `dist/` directory locally and update the script tags to point at it.

Everything else (CSS, JS, images, PDFs) is local.
