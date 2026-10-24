# NI Software Labs

A local-first developer workspace starter built with React and Vite. It includes an early-access demo gate, dashboard, browser utilities, learning helpers, official-resource directory, project roadmap, idea draft workflow, and local profile preferences.

> **Honesty and security:** This is an experimental starter, not a production SaaS service. The preview access code is checked in frontend JavaScript and can be discovered by anyone who downloads or inspects the deployed assets. It is not authentication and must not protect sensitive content. No backend, cloud accounts, live AI provider, analytics, payments, or server-side idea storage is configured.

## Requirements

- Windows 11
- Git Bash
- Node.js 20+ and npm
- VS Code (optional)

## Run locally (Git Bash)

If you downloaded and extracted the ZIP, enter the project folder:

```bash
cd ni-software-labs
npm install
npm run dev
```

Open the local URL printed by Vite. The demo access code is `NIgA66Xb29`.

## Test and build

```bash
npm test
npm run build
npm run preview
```

The production build is written to `dist/`. `npm run preview` serves that built output locally. The automated tests cover key utility functions; they do not constitute a full end-to-end or security test.

## GitHub workflow

Create an empty repository on GitHub, then from this folder:

```bash
git init
git add .
git commit -m "Initial NI Software Labs preview"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/ni-software-labs.git
git push -u origin main
```

Replace the remote URL with your own repository URL.

## Deploy frontend to Cloudflare Pages

1. Push the project to GitHub.
2. In Cloudflare Pages, create a project connected to that repository.
3. Use **Build command** `npm run build` and **Build output directory** `dist`.
4. No environment variables are needed for this frontend-only preview.
5. Deploy and check the generated URL on desktop and mobile.

This static deployment does not provide server-side access control. If you need a private preview, protect it with a suitable identity-aware access service or implement server-side authentication. Do not rely on the in-app demo code.

## Implemented in this preview

- Responsive workspace shell, navigation, dark/light theme, reduced-motion preference.
- Demo early-access gate with show/hide code, error feedback, session-based unlock, and lock controls.
- Local display name, level, language and card layout preferences.
- Browser tools: HTML/CSS/JS sandboxed iframe playground, JSON formatter, XML validation/basic indentation, Markdown preview conversion, regex tester, CSS gradient builder, color contrast estimate, HTML entities, URL/Base64, UUID, timestamp conversion, number bases, text diff, JWT payload decoder, SHA-256, password generator, CSV/JSON conversion, text counter, case conversion, cleaner, duplicate-line removal, find/replace, Lorem Ipsum, sample JSON generator.
- Vocabulary samples, local vocabulary list, heuristic summarizer, study prompt generator, flashcards.
- Searchable directory of official developer-resource links with favorites.
- Roadmap/release notes and an idea draft/copy workflow.
- Utility unit tests and GitHub Actions workflow.

## Not yet implemented / limitations

- Real authentication, server-side roles, cloud sync, database, idea submission backend, spam protection, AI provider integration, rate limiting, subscription/payment flows, and admin console.
- The access gate is only a UX preview. Never store API keys or service-role credentials in frontend files.
- Summary and question generation are basic local heuristics, not LLM output. The multiple-choice option currently creates prompts, not answer choices.
- XML indentation is intentionally basic; it validates XML but is not a full standards-compliant formatter.
- CSV parsing handles simple comma-separated rows and does not fully support escaped commas/multiline CSV cells.
- The image utility offers local resizing/compression through browser canvas but does not upload files anywhere.
- End-to-end browser tests, full accessibility audit, security review, and real deployment verification remain necessary before production use.

## AI integration architecture (next step)

Implement an API layer (for example Cloudflare Workers or another server runtime) with a provider adapter. Store provider keys as server-side environment secrets, validate request bodies, cap input/output sizes, set timeouts and rate limits, and return safe error messages. Add an `.env.example` only for non-secret variable names if a local backend is added. Keep arbitrary code execution isolated in a proper sandbox; do not execute submitted code on the production server.

## Privacy

The app stores preferences, favorites and vocabulary in the browser's `localStorage`, and preview unlock state in `sessionStorage`. These are local browser storage mechanisms, not encrypted cloud storage. Clear site data in the browser to remove them. Do not enter sensitive personal information into a public demo.

## Troubleshooting

- `npm` not found: install a current Node.js LTS release, then restart Git Bash.
- Dependency problems: remove `node_modules` and `package-lock.json`, then run `npm install` again.
- Port in use: follow Vite's alternate local URL or stop the other process.
- Blank page: inspect the browser console and terminal output.
- Clipboard unavailable: select the output text and copy it manually; clipboard APIs can require a secure context.

## License

MIT; see `LICENSE`.
