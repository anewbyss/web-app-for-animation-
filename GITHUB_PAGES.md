# Put Forma on GitHub Pages

Repository: https://github.com/anewbyss/web-app-for-animation-

GitHub integration currently rejects write operations with HTTP 403: Resource not accessible by integration. This package is prepared for GitHub, but a GitHub Pages deployment has not been verified.

## Upload without coding

1. Download the GitHub-ready ZIP provided with the app and extract it.
2. Open the repository on GitHub. Choose Add file > Upload files.
3. Upload the extracted **contents** (index.html and its sibling files/folders), not the outer folder. Commit the upload.
4. In Settings > Pages, choose Deploy from a branch, main, / (root), and Save. Wait for GitHub's deployment to finish.
5. GitHub shows the verified site URL in Settings > Pages. The expected address is https://anewbyss.github.io/web-app-for-animation-/; it is not confirmed live until deployment succeeds.
6. Visit it online once and wait for Ready for offline use before trying airplane mode. This is a separate origin from the Sites app, so transfer your project/plan backups.

## For maintainers

The source includes an optional Actions deployment workflow. For that method, use Settings > Pages > GitHub Actions instead of branch/root. It builds dist with python3 scripts/build.py and deploys the generated static folder. The service worker and manifest use relative paths and support the repository subpath. Never publish the Sites .openai metadata or credentials in the GitHub distribution.

The Pages website is public under normal GitHub Pages hosting. The prepared static app contains dated Genetic Prowess configuration references. Imported personal QA/media and saved plans remain on the device and are not uploaded by the app.
