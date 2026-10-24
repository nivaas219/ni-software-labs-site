# NI Software Labs — Premium Static Website

A responsive dark/neon developer-tools website built with plain HTML, CSS, and JavaScript. No npm install or build command is required.

## Included
- Responsive premium landing page with animated CSS artwork
- First-visit maintenance / early-access notice with an **OK, let's explore** button
- Searchable and filterable tool catalogue
- 20 browser-side utilities: HTML/CSS/JS playground, JSON formatter, text statistics, Base64, URL encoding, password generator, color picker, Markdown preview, UUID generator, timestamp converter, regex tester, gradient builder, Lorem Ipsum, case converter, HTML entity encoding, SHA-256, JWT decoder, line diff, number base converter, image compression/export
- Dark/light theme toggle, responsive navigation, roadmap, labs, contact idea form, privacy notes
- 404 page, security headers, favicon, robots.txt, web manifest, MIT license

## Run locally
Open `index.html` in a browser. Some browser APIs (clipboard and Web Crypto) work best on HTTPS or localhost.

## Deploy to Cloudflare Pages
1. Push these files to the root of a GitHub repository.
2. Create a **Pages** project connected to that repository (not a Workers-only project).
3. Framework preset: **None**.
4. Build command: leave empty.
5. Build output directory: `/` or `.` depending on the Cloudflare UI.
6. Deploy. Future pushes to the configured production branch should trigger deployments automatically.

## Before public launch — important
- The idea form uses a placeholder `hello@nisoftwarelabs.example`. Replace it in `script.js` with an address you control. The form opens an email draft; it does not store submissions.
- The AI Workspace, cloud sync, accounts, subscription billing, team features, and real AI model/API connections are **roadmap concepts only**, not implemented backend features.
- Review and update `privacy.html`, domain, contact details, and security settings before launch.
- This is a static front-end project. It does not promise absolute security; avoid entering secrets into tools without reviewing the code.
- Test on mobile and desktop before promoting the site.

## Repository structure
- `index.html` — main page and tool modal
- `styles.css` — theme, layout, responsive styling
- `script.js` — catalogue, utilities, and interactions
- `privacy.html` — early-release privacy notes
- `_headers` — suggested security headers for static hosting
- `404.html` — not-found page
