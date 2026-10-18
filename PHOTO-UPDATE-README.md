# Models in the Loop — photography update

This ZIP contains a full site snapshot based on the prior launch ZIP, with updated `index.html`, `styles.css`, and seven image files in `assets/`. **For an existing repository, upload only `index.html`, `styles.css`, and the contents of `assets/`.** Keep existing `functions/`, `Assets/`, `BRAND.md`, `README.md`, `script.js`, and other files unchanged.

## Upload
1. Stay on `launch-site`, not `main`.
2. Copy the seven JPG files into `/assets/` (lowercase). GitHub may not show the directory until a file is added.
3. Replace `/index.html` and `/styles.css` with the updated versions using the GitHub file editor or Git. GitHub's web uploader may reject files that already exist.
4. Confirm `/script.js` is in the repository root. It is included in the original launch ZIP, but was not visible in the prior GitHub screenshots. Without it the application form's JavaScript submit handler will not run.
5. Wait for Cloudflare's `launch-site` preview; check desktop and mobile. Do not merge into `main` until backend and photo submissions have been tested.

## Image provenance
The photos are crops from one original AI-generated editorial contact sheet. They depict fictional adults and are *concept mockups*, not genuine photography of Fayetteville or real applicants. The original generated collage contains a small embedded ML-style concept mark in several tiles. This does not prevent copying. Keep the concept disclosure visible. Do not imply actual university or sorority affiliation.

## Production readiness
Cloudflare R2 bindings, private storage, spam controls, retention and Proton Mail notifications still require validation. Never test with actual applicant data until those controls work.
