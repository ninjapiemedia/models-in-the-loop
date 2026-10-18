# Models in the Loop — website launch candidate

Mobile-first static site + Cloudflare Pages Function application intake. This package is intended to replace the current Coming Soon static files while retaining your existing `BRAND.md` and any assets you want to keep.

## Deploy

1. Create a new Git branch in `ninjapiemedia/models-in-the-loop` (e.g. `launch-site`).
2. Extract the ZIP. Copy its contents to the **repository root**, not into a nested directory. Keep the existing `BRAND.md` file.
3. Commit and push. Review the Cloudflare Pages preview before merging to `main`.
4. Cloudflare Pages: framework **None**, no build command, output directory `/`.
5. Create a **private Cloudflare R2 bucket** for applications. In Pages > Settings > Bindings, add an R2 bucket binding named exactly `APPLICATIONS_BUCKET`. Redeploy.
6. To receive application email alerts, configure `RESEND_API_KEY`, `NOTIFY_EMAIL`, and `FROM_EMAIL` as Cloudflare Pages environment secrets. `FROM_EMAIL` must be a verified sender with your email provider. `NOTIFY_EMAIL` may be your existing Proton Mail destination; **do not commit the destination address or secrets**.
7. Test with 2–5 non-sensitive sample photos, verify the application JSON and images are stored in R2, and verify email alert delivery. Delete the test submission afterward.
8. Only then merge and promote to production.

## Important launch limitations / checklist

- This is a working **server-side intake implementation once R2 is bound**. Without the R2 binding, submission correctly returns HTTP 503 rather than pretending it succeeded.
- Email alerts are optional and do **not** include photos. If secrets are absent or mail delivery fails, the application remains saved privately in R2. Set up Cloudflare monitoring and periodically check R2 so no application is missed.
- Production hardening is recommended before advertising the application form: add Cloudflare Turnstile with server-side verification, rate limits/WAF, automated retention deletion, malware scanning, access logging, and a secure applicant-review interface. Cloudflare's request size limits also apply.
- The three portfolio visuals are **CSS concept placeholders**, not fabricated photographs or finished shoots. Replace with licensed or expressly consented adult-talent photography. To watermark real portfolio uploads, use a controlled server-side image pipeline (e.g., Sharp during build) that burns the watermark into image pixels; a CSS overlay alone is removable.
- Privacy copy is a starting draft; review it for actual operations, data retention, and applicable legal requirements before production.
- Do not commit applicant data, photos, API keys, or a private Proton forwarding address to GitHub.
- Check Cloudflare's Pages Functions and R2 quotas and test upload behavior on mobile devices.

## Architecture

`index.html`, `styles.css`, `script.js`: static frontend. `functions/api/apply.js`: Cloudflare Pages Function. `privacy.html`: public policy draft. No framework or build tooling required.
