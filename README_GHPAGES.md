# GitHub Pages Hosting (Vite + React)

## ⚠️ Important Security Note
This build path injects your Gemini API key into the client bundle using `VITE_GEMINI_API_KEY`. It will be publicly visible in the browser. Use at your own risk.

## Steps
1) In GitHub: Settings → Secrets and variables → Actions → New secret:
   - Name: `GEMINI_API_KEY`
   - Value: your key

2) Push to `main`. The workflow in `.github/workflows/deploy.yml` builds the app with:
   - `VITE_BASE=/<repo>/` for correct asset paths
   - `VITE_GEMINI_API_KEY` available to the bundle
   - Publishes `dist` to GitHub Pages

3) Enable Pages: Repo → Settings → Pages → Source: GitHub Actions.

Deep links work via `public/404.html` and an index script that restores the path.
