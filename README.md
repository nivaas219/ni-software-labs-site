# NI Software Labs — Lab in Progress

A responsive, static landing page for NI Software Labs. Built with plain HTML, CSS, and JavaScript so it can be hosted free as a static site and does not need a build step or package installation.

## Features

- Responsive dark charcoal and gold design
- Brand artwork and local SVG favicon
- Lab status, project explorations, roadmap, privacy notes, and contact section
- Accessible mobile navigation and reduced-motion support
- Idea form prepares an email in the visitor's email app; it does not send or store submissions on a website server
- No analytics, tracking pixels, external font imports, frameworks, or runtime dependencies intentionally added
- `_headers` file for Cloudflare Pages security headers

## Run locally (Git Bash)

You can preview the static site using Python if installed:

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. Alternatively, use the VS Code Live Server extension.

No `npm install` or build command is required.

## Deploy with GitHub + Cloudflare Pages

1. Create a new **public or private** GitHub repository, for example `ni-software-labs-site`.
2. Extract this ZIP. In Git Bash, `cd` into the extracted `NI-Software-Labs-Website` directory.
3. Run:

```bash
git init
git add .
git commit -m "Initial NI Software Labs website"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/ni-software-labs-site.git
git push -u origin main
```

Replace `YOUR-GITHUB-USERNAME` with your GitHub username. Create the repository on GitHub first; do not add a README there if this folder already has one.

4. Sign in to Cloudflare and open Workers & Pages → Create → Pages → Connect to Git.
5. Select the repository. For this plain static site, set the framework preset to **None**, leave Build command blank, and set Build output directory to `/` (or `.` if the UI asks for a relative directory).
6. Deploy. Cloudflare will show a `*.pages.dev` URL when deployment completes.

Cloudflare's interface can change; follow its current prompts. Keep the repository root as the output directory because `index.html` is at the root.

## Privacy and security notes

- This site intentionally has no analytics or third-party tracking scripts.
- A hosting/DNS provider may process connection data such as IP addresses and request logs; do not promise complete anonymity.
- The idea form uses `mailto:`. Sending depends on the visitor's email app and is not a server-backed form.
- Review `_headers` if you add new external scripts, embeds, or resources. A restrictive Content Security Policy may block newly added integrations until explicitly configured.
- Security headers improve baseline protection but are not a complete security audit or guarantee.
- Keep the contact email in `index.html` and `privacy.html` updated if it changes.

## Current status

This website is a public-facing progress page, not a claim that the upcoming products are complete. Roadmap items are labelled as in progress or planned.
