# Deploying to GitHub Pages

1. Upload ALL files to the repo root on branch `main`. Ensure the hidden folder `.github/workflows/deploy.yml` exists.
   - If drag/drop hides it, use **Create new file** with the exact path `.github/workflows/deploy.yml` and paste the YAML from this repo.
2. Repo Settings → Pages → Source = GitHub Actions.
3. Repo Settings → Secrets and variables → Actions → add `GEMINI_API_KEY`.
4. Commit/push to `main`. GitHub Actions will install, build, and deploy `dist/` automatically.
