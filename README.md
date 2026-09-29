# Vital Glow skincare

Refinement of the existing React/Vite export. Original section order, copy, product art, logo and lifestyle photographs are retained.

## Commands

- `npm run dev`: development preview (default port 8443).
- `npm run typecheck`: TypeScript validation.
- `npm run build`: production output in `dist`.

## Design and behavior

Shared container, gutter, section-spacing and heading tokens are in `src/index.css`. Mobile layouts reflow the image labels, image strip and email form. Navigation closes on selection, Escape and transition to desktop; collapsed links are removed from keyboard navigation. Native form validation covers required fields and email format, with an additional whitespace-only message check. Neither form sends data or claims delivery.

## Launch connections still needed

- Connect contact and newsletter submit handlers to real endpoints. Only show delivery/subscription success after a successful server response; retain server-side validation and accessible error reporting.
- Supply the real checkout destination. The product CTA currently routes to contact enquiries.
- Supply verified social profile URLs and published privacy/terms pages. Existing placeholders are disabled.
- Review `.figma/make/site.json` before public launch: the original `robots.index: false` still produces `noindex, nofollow` and a disallow-all robots.txt.
- Google Fonts and the original Unsplash photos still require external network access. Original asset files and Figma preview/deployment integrations have been preserved.

## Verification performed

- TypeScript and production build pass.
- DOM layout checks at 320, 375, 390, 430, 768, 1024, 1280, 1440 and 1920 CSS pixels found no horizontal overflow or out-of-viewport text/form bounds.
- Mobile and desktop visual review, plus top-to-footer review.
- Mobile menu toggle, Escape focus return, closing on anchor selection, desktop navigation and sticky-header anchor offset checked.
- Keyboard focus outline and keyboard form submission checked.
- Required fields and malformed email validation checked; both valid submissions display local-only status messages.
- All nine image instances loaded; no browser console warnings/errors observed.
- Reduced-motion CSS was reviewed and no continuous animation remained in the rendered page. OS-level reduced-motion emulation was not available through the browser controls, so that mode was not independently exercised.

The active logo is an optimized 480px derivative (168 KB versus the original 836 KB); the favicon is 5 KB. Original assets remain untouched. Below-fold photographs and the product detail image load lazily.
