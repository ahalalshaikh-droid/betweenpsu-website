# Between Website Optimization Design

Date: 2026-08-25

## Objective

Refactor the existing Between website into a fast, secure, accessible, responsive static site for GitHub Pages while preserving its current visual identity, English and Arabic content, and custom-domain behavior.

The implementation will optimize every aspect controlled by the site. It cannot guarantee a fixed performance score on every device or network, and it cannot make publicly displayed photographs impossible to copy.

## Current State

- The project contains one `index.html` file of approximately 2.1 MB.
- Seven images are embedded as base64 data, accounting for most of the transfer size.
- The stylesheet contains many accumulated revisions and conflicting overrides.
- CSS, JavaScript, HTML, and imagery cannot be cached independently.
- The PSU logo is loaded from a third-party image host.
- The live GitHub Pages response uses HTTPS but does not provide configurable security headers.
- The mobile navigation opens correctly but does not close with Escape.
- The rendered layout has no horizontal overflow at the tested desktop and 390 px mobile widths.

## Chosen Architecture

Keep the site framework-free and static:

- `index.html`: semantic document structure, metadata, bilingual content hooks, and progressive fallback content.
- `assets/css/styles.css`: consolidated responsive styles and accessibility states.
- `assets/js/app.js`: deferred bilingual, navigation, and reveal behavior.
- `assets/images/`: locally hosted, appropriately sized image derivatives.
- Root deployment files: `robots.txt`, `sitemap.xml`, `404.html`, and site icons/manifest where useful.

This is preferred over adding a framework because the site has one page, no server state, and no build-time application requirements. Fewer dependencies reduce attack surface and maintenance cost.

## Performance

1. Extract all base64 images from HTML.
2. Generate responsive derivatives sized for the largest rendered dimensions rather than shipping full originals everywhere.
3. Prefer modern WebP images with JPEG/PNG fallbacks only when needed by the content.
4. Give the hero image explicit dimensions, eager loading, asynchronous decoding, and high fetch priority.
5. Lazy-load gallery images with explicit dimensions to avoid layout shifts.
6. Host the PSU logo locally and remove the third-party image dependency.
7. Consolidate the accumulated CSS into one intentional stylesheet and remove dead or overridden rules.
8. Defer the external JavaScript and keep the initial page useful if JavaScript is unavailable.
9. Add resource hints only when they have a measured benefit; do not add a service worker because stale-content risk outweighs the limited benefit on this single GitHub Pages page.

## Security and Privacy

1. Move inline script and style code into same-origin files so a restrictive Content Security Policy can be used through a meta policy compatible with GitHub Pages.
2. Set a policy equivalent to: same-origin scripts, styles, images, and fonts; no objects, frames, forms, or network connections unless the implementation demonstrably needs them.
3. Add a strict referrer policy and safe `rel` values to external links.
4. Avoid dynamic HTML insertion for translated content; build DOM nodes and assign text through `textContent`.
5. Keep dependencies at zero unless an image conversion tool is used locally during development; no runtime dependency will be shipped.
6. Document security headers that GitHub Pages cannot set, including HSTS and frame-ancestor controls. Full header enforcement would require placing a configurable CDN such as Cloudflare in front of GitHub Pages.

## Public Photo Protection

The site will deter casual saving while remaining usable:

- Publish only optimized web-size derivatives, never the highest-resolution originals.
- Disable native dragging for displayed photographs.
- Suppress the image context menu for photographs while leaving normal page and link context menus intact.
- Prevent accidental image selection and touch callout where supported.
- Keep descriptive alternative text and keyboard navigation intact.
- Optionally place a subtle Between mark on the published derivatives if a suitable logo treatment is available.

These controls cannot prevent screenshots, screen recording, browser developer tools, cache inspection, or determined retrieval. The browser must receive image pixels to display them, so absolute download prevention is technically impossible on a public page.

## Accessibility and Responsive Behavior

1. Add a skip link and preserve one visible `main` landmark and one `h1`.
2. Use native links and buttons with visible `:focus-visible` treatment.
3. Make the mobile menu close on Escape, outside interaction, link activation, and viewport transition; restore focus to its trigger.
4. Keep all touch targets at least 44 px where practical.
5. Preserve reduced-motion behavior and prevent motion from hiding content when scripting fails.
6. Preserve English/Arabic switching, update `lang` and `dir`, and use logical layout properties for RTL.
7. Ensure reflow without horizontal scrolling at 320 px and normal desktop breakpoints.
8. Keep text readable at 200% zoom and avoid fixed-height text containers.

## SEO and Deployment

1. Add canonical, Open Graph, and social metadata for `https://betweenpsu.com/`.
2. Add appropriate icons, theme color, `robots.txt`, and `sitemap.xml`.
3. Provide a lightweight branded `404.html` suitable for GitHub Pages.
4. Preserve the custom-domain route and do not change DNS or repository settings.

## Verification

The implementation is accepted only after fresh verification of:

- HTML, CSS, and JavaScript syntax.
- No missing local assets or unintended external subresources.
- English and Arabic rendering.
- Desktop and mobile layouts at 320, 390, 768, 1024, and wide desktop widths.
- No horizontal overflow.
- Keyboard navigation, focus visibility, menu Escape behavior, and reduced motion.
- Image loading priorities, intrinsic dimensions, lazy loading, and drag/context-menu deterrents.
- Live-link targets and email link correctness.
- Before-and-after raw and compressed transfer sizes.
- Browser console errors and an automated accessibility/performance audit where the available environment supports it.

## Out of Scope

- DNS changes, GitHub repository settings, and CDN configuration.
- Authentication, a CMS, analytics, or server-side features.
- Claims of absolute photo copy prevention or identical performance across all networks and devices.
