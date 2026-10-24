# NI Software Labs

A responsive, static website and browser-based developer toolbox for NI Software Labs. Built with plain HTML, CSS, and JavaScript so it can be hosted on Cloudflare Pages, GitHub Pages, Netlify, or any static host without a build step.

## Included tools

1. **Live Playground** — edit HTML, CSS, and JavaScript with a sandboxed iframe preview.
2. **JSON Formatter** — validate, format, and minify JSON.
3. **Text Toolkit** — word/character/line counts, case conversion, whitespace cleanup.
4. **Base64 Converter** — UTF-8 text encoding/decoding. Base64 is not encryption.
5. **URL Encoder** — encode/decode URL components.
6. **Password Generator** — configurable random passwords using the browser Web Crypto API.
7. **Color Studio** — gradient builder, palette swatches, copyable CSS/hex values.
8. **Markdown Preview** — lightweight Markdown preview with HTML escaping.

Also included: responsive overview dashboard, tool search and category filters, light/dark appearance toggle, project progress and roadmap pages, idea suggestion form that prepares a mailto draft, privacy notice, favicon, web manifest, robots.txt, security headers, and 404 page.

## Run locally (Git Bash)

No Node.js, npm, or build command is required. The simplest option is to open `index.html` in a browser. For a local web server, if Python is installed:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy to Cloudflare Pages

### Dashboard (recommended)

1. Extract the ZIP.
2. Push the folder to a GitHub repository, or use Cloudflare Pages direct upload if available in your account.
3. In Cloudflare, open **Workers & Pages → Create → Pages** and connect the repository.
4. Set **Framework preset** to `None` (or no framework).
5. Set **Build command** to empty / none.
6. Set **Build output directory** to `/` (the repository root).
7. Deploy. Cloudflare will provide a `*.pages.dev` URL.

### Git Bash — push to GitHub

Create an empty repository on GitHub first, then run these commands from the extracted project folder. Replace `YOUR-REPO-NAME` with your repository name.

```bash
git init
git add .
git commit -m "Build NI Software Labs website and browser tools"
git branch -M main
git remote add origin https://github.com/nivaas219/YOUR-REPO-NAME.git
git push -u origin main
```

Then connect that GitHub repository in Cloudflare Pages. If you already have a repository with this project, do not run `git init` again; copy the files into that repository and commit them there.

## Important limitations (transparent by design)

- The website and included tools are functional static/browser features. There is **no backend, database, authentication, or server-side idea submission** in this package.
- The idea form opens the visitor's email app with a prefilled message to `nivaas9293@gmail.com`; the visitor must press Send. Submissions are not saved by the website.
- AI tools are not falsely presented as live. Actual AI features require selecting an AI provider and safely adding a server-side function/API key; never place private API keys in front-end JavaScript.
- The progress page describes the included foundation and future plans; roadmap items are not guaranteed release dates.
- Google Fonts is an optional external request. The rest of the site is static.

## Customization

- Main content: `index.html`
- Styling: `styles.css`
- Tool behavior/navigation: `script.js`
- Privacy notice: `privacy.html`
- Hosting headers: `_headers`
- Search indexing: `robots.txt`

Update the contact email in `index.html`, `script.js`, and `privacy.html` if it changes.

## License

MIT — see `LICENSE`.
