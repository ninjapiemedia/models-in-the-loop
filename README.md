# Models in the Loop — Coming Soon

Static, mobile-first launch placeholder for `modelsintheloop.com`.

## Accessibility
- Semantic landmarks and a skip link are included.
- Hero photography is treated as decorative; all essential launch and contact information is rendered as HTML text.
- A text-first `<noscript>` fallback preserves the core message and contact email when scripts are unavailable.
- Contact addresses use real `mailto:` links.
- Keyboard-visible focus states are provided.
- `prefers-reduced-motion: reduce` disables nonessential transitions and smooth scrolling.
- Text and controls remain usable when the hero image fails and fall back to the Obsidian page background.

## Performance
- The hero image is the primary LCP candidate and is preloaded for the active viewport.
- Desktop and mobile hero art use responsive `<picture>` selection so visitors receive the appropriate crop.
- The hero image has explicit dimensions, `sizes="100vw"`, eager loading, and high fetch priority.
- No external font, JavaScript framework, analytics bundle, or third-party UI library is required.
- System fonts keep the initial page dependency-free and fast.
- Keep hero image files aggressively compressed; prefer JPEG/WebP/AVIF equivalents at production quality if you later add those formats.

## Deploy on Cloudflare
Use Cloudflare Pages with Git integration. This repo is plain HTML/CSS and requires no build step.

Recommended Pages settings:
- Framework preset: None
- Build command: leave blank
- Build output directory: `/` (repository root)

After deployment, attach `modelsintheloop.com` and optionally `www.modelsintheloop.com` under the project's Custom Domains settings.

## Brand
Read `BRAND.md` before making visual, copy, UX, or AI-generated changes.
