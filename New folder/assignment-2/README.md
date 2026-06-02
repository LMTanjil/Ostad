# Assignment 2 — Setup & Run

Files created in this folder:

- `index.html` — base HTML using Tailwind-built CSS at `./dist/styles.css`.
- `src/input.css` — Tailwind entry with @tailwind directives.
- `tailwind.config.cjs` — Tailwind config scanning HTML files.
- `package.json` — scripts to build/watch Tailwind output.

Quick setup using VS Code Git Bash terminal:

```bash
cd "f:/Ostad/New folder/assignment-2"
npm install -D tailwindcss
# initialize recommended files (optional)
npx tailwindcss init -p
# Build once
npm run build:css
# Or during development (auto rebuild)
npm run watch:css
```

Notes:

- The HTML expects the compiled CSS at `./dist/styles.css`. The build scripts write to `dist/styles.css`.
- Per your structure rule: each semantic block (header, sections, footer) uses a wrapper div (`container`/`max-w-*`) and an inner div.
