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
- Restored the reference motion: 900 ms hero entrance, 850 ms fade/slide reveals, 100 ms card staggers, 4/5/6-second floating labels, 2.2-second scroll cue, button/card hover lifts and scroll-linked product translation/rotation. Timings and styles were inspected in the live Figma preview.
- Reduced-motion CSS disables animations/transitions and smooth scrolling; the motion hooks also stop parallax when the preference changes. This behavior was reviewed in source. OS-level reduced-motion emulation was unavailable through the browser controls, so that mode was not independently exercised.

The active logo is an optimized 480px derivative (168 KB versus the original 836 KB); the favicon is 5 KB. Original assets remain untouched. Below-fold photographs and the product detail image load lazily.

## Final verification — 2026-10-03

Continued from the existing motion-restoration diff without rebuilding the implementation. TypeScript, production build and diff whitespace checks pass; no lint script is configured. No dependencies were added.

Repeated all nine viewport measurements against documentElement.clientWidth (the usable width after the scrollbar), including transformed product bounds and text/form bounds. At 320px, both usable width and scroll width are 305px: the minimum-body-width overflow is fixed. Completed desktop and 320px top-to-footer browser passes. All reveal groups became visible, all nine image instances loaded, and no console/React errors or warnings were observed. Desktop section positions and heights stayed identical before and after the pass, with no visible layout shifts.

Verified hero entrance progression, moving labels, changing product rotation on scroll, card stagger delays, gold icon/hover lift, image-hover scaling, anchor offsets, and mobile menu animation, Escape focus return, inert closed links and anchor closing.

Intentional differences from the prototype remain: accessible contrast/focus/form labels, honest local-only form status, an enquiry CTA in place of the unconnected checkout, compact small-screen reflow and bounded parallax (disabled below 640px). Original images, brand and section order are preserved.
