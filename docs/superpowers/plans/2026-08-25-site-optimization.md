# Between Website Optimization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a fast, secure, accessible, bilingual static website for `betweenpsu.com` with responsive images and practical deterrents against casual photo saving.

**Architecture:** Replace the 2.1 MB monolithic HTML file with semantic HTML, one consolidated stylesheet, one deferred ES module, and locally hosted responsive image derivatives. Keep the deployment framework-free for GitHub Pages and verify static contracts with Node's built-in test runner plus browser checks at representative mobile and desktop viewports.

**Tech Stack:** HTML5, CSS, browser-native JavaScript modules, Node.js 24 built-in tests, Sharp used only as a local asset-processing tool, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-25-site-optimization-design.md`

## Global Constraints

- Preserve the current visual identity, English and Arabic content, and custom-domain behavior.
- Ship no runtime dependencies and make no DNS, GitHub repository-setting, analytics, CMS, authentication, or CDN changes.
- Publish optimized web-size derivatives rather than the highest-resolution photographs.
- Keep normal page and link context menus available; suppress context menus and dragging only on protected photographs.
- Use same-origin scripts, styles, images, fonts, and manifest resources.
- Keep the page useful in English when JavaScript is unavailable.
- Do not claim absolute photo-copy prevention or identical performance across all devices and networks.
- This workspace has no `.git` repository metadata; task checkpoints must be verified through fresh tests and file diffs rather than local commits.

## File Map

- Modify `index.html`: semantic content, metadata, responsive image markup, progressive English fallback.
- Create `assets/css/styles.css`: consolidated design, responsive/RTL/accessibility behavior, photo deterrent presentation.
- Create `assets/js/app.js`: translation, navigation, reveal behavior, and scoped photo protections.
- Create `assets/images/*`: local logo, hero, gallery, social-card, and icon assets.
- Create `tools/prepare-assets.mjs`: one-time deterministic extraction and image-derivative generator.
- Create `tests/site.test.mjs`: static file, security, image, and JavaScript contract tests.
- Create `package.json`: zero-dependency test/check scripts.
- Create `favicon.svg`, `site.webmanifest`, `robots.txt`, `sitemap.xml`, `404.html`, and `CNAME`: deployment and discovery files.
- Create `SECURITY.md`: document GitHub Pages header limits and the stronger CDN option.

---

### Task 1: Asset Extraction and Responsive Derivatives

**Files:**
- Create: `tools/prepare-assets.mjs`
- Create: `assets/images/between-logo.png`
- Create: `assets/images/hero-team-640.webp`
- Create: `assets/images/hero-team-960.webp`
- Create: `assets/images/hero-team-1200.webp`
- Create: `assets/images/gallery-team-640.webp`
- Create: `assets/images/gallery-team-1200.webp`
- Create: `assets/images/gallery-talks-640.webp`
- Create: `assets/images/gallery-talks-1200.webp`
- Create: `assets/images/gallery-winners-640.webp`
- Create: `assets/images/gallery-winners-1200.webp`
- Create: `assets/images/gallery-founder-640.webp`
- Create: `assets/images/gallery-founder-1200.webp`
- Create: `assets/images/gallery-founders-640.webp`
- Create: `assets/images/gallery-founders-1200.webp`
- Create: `assets/images/og-between.jpg`
- Create: `assets/images/psu-logo.png`
- Create: `tests/site.test.mjs`
- Create: `package.json`

**Interfaces:**
- Consumes: the seven `data:image/*;base64` payloads in the legacy `index.html` and the existing PSU logo URL.
- Produces: stable image filenames consumed by `index.html`; `npm test` runs `node --test tests/*.test.mjs`.

- [ ] **Step 1: Add failing asset contract tests**

```js
import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const asset = (name) => new URL(`assets/images/${name}`, root);
const expected = [
  'between-logo.png', 'psu-logo.png', 'og-between.jpg',
  'hero-team-640.webp', 'hero-team-960.webp', 'hero-team-1200.webp',
  'gallery-team-640.webp', 'gallery-team-1200.webp',
  'gallery-talks-640.webp', 'gallery-talks-1200.webp',
  'gallery-winners-640.webp', 'gallery-winners-1200.webp',
  'gallery-founder-640.webp', 'gallery-founder-1200.webp',
  'gallery-founders-640.webp', 'gallery-founders-1200.webp',
];

test('optimized image assets exist and stay within web delivery budgets', () => {
  for (const name of expected) {
    assert.equal(existsSync(asset(name)), true, `${name} is missing`);
    assert.ok(statSync(asset(name)).size < 260_000, `${name} exceeds 260 KB`);
  }
});

test('the deployed HTML contains no embedded image payloads', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /data:image\//i);
});
```

- [ ] **Step 2: Run the tests and verify the asset contract fails**

Run: `npm test`

Expected: FAIL because `package.json` and optimized files do not yet exist; after adding `package.json`, FAIL with `between-logo.png is missing`.

- [ ] **Step 3: Add the zero-dependency project scripts**

```json
{
  "name": "between-psu-website",
  "private": true,
  "type": "module",
  "scripts": {
    "test": "node --test tests/*.test.mjs",
    "check:js": "node --check assets/js/app.js",
    "check": "npm run check:js && npm test"
  }
}
```

- [ ] **Step 4: Implement deterministic image preparation**

Create `tools/prepare-assets.mjs` using `sharp` from the bundled workspace modules. Match base64 images in source order, decode them, resize without enlargement, strip metadata, and generate the exact filenames above. Use WebP quality 78 for gallery images, WebP quality 82 for the hero, PNG compression level 9 for logos, and JPEG quality 82 for the 1200×630 social image.

```js
const roles = ['between-logo', 'hero-team', 'gallery-team', 'gallery-talks', 'gallery-winners', 'gallery-founder', 'gallery-founders'];
const galleryRoles = roles.slice(2);
await sharp(buffers[0]).resize({ width: 220, withoutEnlargement: true }).png({ compressionLevel: 9 }).toFile(out('between-logo.png'));
for (const width of [640, 960, 1200]) {
  await sharp(buffers[1]).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(out(`hero-team-${width}.webp`));
}
for (const [offset, role] of galleryRoles.entries()) {
  for (const width of [640, 1200]) {
    await sharp(buffers[offset + 2]).rotate().resize({ width, withoutEnlargement: true }).webp({ quality: 78 }).toFile(out(`${role}-${width}.webp`));
  }
}
await sharp(buffers[1]).rotate().resize(1200, 630, { fit: 'cover', position: 'attention' }).jpeg({ quality: 82, mozjpeg: true }).toFile(out('og-between.jpg'));
```

Download the current PSU logo once, validate a successful `image/png` response, and write only the resized 96×96 local PNG. Do not retain the downloaded 600×600 source.

- [ ] **Step 5: Run the preparation tool and inspect dimensions and sizes**

Run with the workspace module path exposed to Node, then list every output with byte size and Sharp metadata.

Expected: all named files exist; every image is below 260 KB; hero widths are 640, 960, and 1200 unless the source is smaller; gallery widths are 640 and up to 1200 without enlargement.

- [ ] **Step 6: Re-run the asset test**

Run: `npm test`

Expected: the asset existence test passes; the no-embedded-images test remains failing until Task 2 replaces `index.html`.

### Task 2: Semantic HTML, Security Policy, and Deployment Metadata

**Files:**
- Modify: `index.html`
- Create: `favicon.svg`
- Create: `site.webmanifest`
- Create: `robots.txt`
- Create: `sitemap.xml`
- Create: `CNAME`
- Create: `404.html`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: optimized filenames from Task 1 and CSS/JS endpoints planned for Tasks 3 and 4.
- Produces: stable `data-i18n` hooks, `data-menu-toggle`, `data-mobile-menu`, `data-protected-photo`, and explicit image dimensions consumed by CSS and JavaScript.

- [ ] **Step 1: Add failing document and security tests**

```js
test('document has strict metadata and no inline executable code', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /http-equiv="Content-Security-Policy"/i);
  assert.match(html, /default-src 'self'/i);
  assert.match(html, /object-src 'none'/i);
  assert.match(html, /name="referrer" content="no-referrer"/i);
  assert.match(html, /rel="canonical" href="https:\/\/betweenpsu\.com\/"/i);
  assert.doesNotMatch(html, /<style[\s>]/i);
  assert.doesNotMatch(html, /<script>(?:.|\n)*<\/script>/i);
});

test('page has progressive structure and protected responsive images', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.match(html, /class="skip-link" href="#main-content"/i);
  assert.match(html, /<main id="main-content">/i);
  assert.equal((html.match(/<h1\b/gi) ?? []).length, 1);
  assert.equal((html.match(/data-protected-photo/g) ?? []).length, 6);
  assert.doesNotMatch(html, /images\.seeklogo\.com/i);
  for (const match of html.matchAll(/<img\b[^>]*data-protected-photo[^>]*>/gi)) {
    assert.match(match[0], /width="\d+"/i);
    assert.match(match[0], /height="\d+"/i);
    assert.match(match[0], /draggable="false"/i);
    assert.match(match[0], /decoding="async"/i);
  }
});
```

- [ ] **Step 2: Run tests and verify the new contracts fail**

Run: `npm test`

Expected: FAIL on missing CSP, inline style/script, embedded images, and absent protected-photo attributes.

- [ ] **Step 3: Replace `index.html` with semantic progressive markup**

Use the current English copy as real HTML text, not empty JavaScript placeholders. Include one `h1`, logical `h2`/`h3` levels, `<main id="main-content">`, a first-focusable skip link, native links/buttons, the five event articles, registration status, and the three contact links.

Use this policy before any resource fetches:

```html
<meta http-equiv="Content-Security-Policy" content="default-src 'self'; base-uri 'none'; object-src 'none'; frame-src 'none'; form-action 'none'; connect-src 'none'; media-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; manifest-src 'self'; upgrade-insecure-requests">
<meta name="referrer" content="no-referrer">
```

Use responsive image markup with exact intrinsic dimensions read from the prepared derivatives. The hero is eager/high priority; the five gallery images are lazy:

```html
<img data-protected-photo draggable="false" src="assets/images/hero-team-960.webp" srcset="assets/images/hero-team-640.webp 640w, assets/images/hero-team-960.webp 960w, assets/images/hero-team-1200.webp 1200w" sizes="(min-width: 1024px) 52vw, calc(100vw - 32px)" width="1200" height="1600" loading="eager" fetchpriority="high" decoding="async" alt="Between club members gathered together at Prince Sultan University">
```

Load `assets/css/styles.css` normally and `assets/js/app.js` with `type="module"`. Add canonical, description, Open Graph, Twitter, theme-color, manifest, and icon tags, all pointing at `https://betweenpsu.com/` and same-origin assets.

- [ ] **Step 4: Add GitHub Pages discovery and error files**

`CNAME` contains exactly `betweenpsu.com`. `robots.txt` allows all crawlers and points to `https://betweenpsu.com/sitemap.xml`. `sitemap.xml` contains the canonical root URL. `404.html` loads the shared stylesheet, includes a concise branded not-found message, and links to `/` without inline code.

- [ ] **Step 5: Add the icon and manifest**

Create a compact `favicon.svg` using the existing yellow and ink colors and the text `b.`. `site.webmanifest` uses `name: "Between PSU"`, `short_name: "Between"`, `start_url: "/"`, `display: "standalone"`, `background_color: "#fbf8f1"`, and `theme_color: "#f2c23d"`.

- [ ] **Step 6: Run the static document tests**

Run: `npm test`

Expected: document/security/image tests pass; JavaScript-contract tests added later may still be absent, not failing.

### Task 3: Consolidated Responsive and Accessible Styling

**Files:**
- Create: `assets/css/styles.css`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: class names and landmarks from Task 2.
- Produces: layouts for 320–767 px, 768–1023 px, and 1024 px+, RTL support, visible focus, reduced motion, and `.photo-frame` protection presentation.

- [ ] **Step 1: Add failing stylesheet contract tests**

```js
test('stylesheet contains responsive, focus, RTL, and motion safeguards', () => {
  const css = readFileSync(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
  assert.match(css, /:focus-visible/);
  assert.match(css, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.match(css, /html\[dir="rtl"\]/);
  assert.match(css, /@media\s*\(hover:\s*hover\)/);
  assert.match(css, /-webkit-user-drag:\s*none/);
  assert.match(css, /-webkit-touch-callout:\s*none/);
  assert.doesNotMatch(css, /outline:\s*none/);
});
```

- [ ] **Step 2: Run the test and verify it fails**

Run: `npm test`

Expected: FAIL because `assets/css/styles.css` is missing or lacks required safeguards.

- [ ] **Step 3: Implement the consolidated style system**

Define the existing semantic tokens once: yellow `#f2c23d`, paper `#fbf8f1`, ink `#20201d`, muted `#6e6a61`, line `rgba(32,32,29,.12)`, and max width `1180px`. Preserve the current editorial typography, full-bleed yellow connect section, desktop split hero, mobile stacked hero, event hierarchy, gallery collage, fixed header, and RTL typography.

Use these exact accessibility/protection rules:

```css
.skip-link { position: fixed; inset-block-start: 8px; inset-inline-start: 8px; z-index: 100; transform: translateY(-150%); }
.skip-link:focus { transform: translateY(0); }
:focus-visible { outline: 3px solid var(--focus); outline-offset: 4px; }
[data-protected-photo] { -webkit-user-drag: none; -webkit-touch-callout: none; user-select: none; }
.photo-frame { position: relative; overflow: hidden; }
.photo-frame::after { content: "between."; position: absolute; inset-inline-end: 14px; inset-block-end: 12px; pointer-events: none; color: rgba(255,255,255,.72); font-size: 12px; font-weight: 800; text-shadow: 0 1px 10px rgba(0,0,0,.55); }
@media (hover: hover) and (pointer: fine) { .button:hover { transform: translateY(-2px); } }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } .reveal { opacity: 1; transform: none; } }
```

At a maximum width of 767 px, keep the header at least 68 px high, use 44 px controls, stack the hero, prevent horizontal overflow, use 16 px body text minimum, and keep gallery captions recoverable without truncation. At 1024 px+, show desktop navigation and hide the mobile toggle/menu.

- [ ] **Step 4: Run stylesheet and full static tests**

Run: `npm test`

Expected: PASS for asset, document, and stylesheet contracts.

### Task 4: Safe Bilingual and Navigation JavaScript

**Files:**
- Create: `assets/js/app.js`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: `data-i18n`, `data-i18n-alt`, `data-language-toggle`, `data-menu-toggle`, `data-mobile-menu`, `data-close-menu`, `.reveal`, and `data-protected-photo` from Task 2.
- Produces: exports `normalizeLanguage(value)`, `oppositeLanguage(value)`, and `getCopy(language)` for direct unit testing; bootstraps only when `document` exists.

- [ ] **Step 1: Add failing JavaScript unit and source-safety tests**

```js
test('language helpers normalize and switch safely', async () => {
  const app = await import('../assets/js/app.js');
  assert.equal(app.normalizeLanguage('ar'), 'ar');
  assert.equal(app.normalizeLanguage('invalid'), 'en');
  assert.equal(app.oppositeLanguage('en'), 'ar');
  assert.equal(app.oppositeLanguage('ar'), 'en');
  assert.equal(app.getCopy('invalid').nav.home, 'Home');
});

test('client code avoids executable string and HTML injection APIs', () => {
  const js = readFileSync(new URL('../assets/js/app.js', import.meta.url), 'utf8');
  assert.doesNotMatch(js, /\binnerHTML\b|insertAdjacentHTML|\beval\s*\(|new Function/);
  assert.match(js, /contextmenu/);
  assert.match(js, /dragstart/);
  assert.match(js, /Escape/);
});
```

- [ ] **Step 2: Run tests and verify they fail**

Run: `npm test`

Expected: FAIL because the module and required exports do not exist.

- [ ] **Step 3: Implement text-only bilingual updates**

Export the three helper functions, retain the exact approved English and Arabic copy, read/write `between-language` inside guarded `try/catch`, update `documentElement.lang` and `dir`, and assign every translated value through `textContent` or `alt`. Do not rebuild event or contact markup with strings.

- [ ] **Step 4: Implement complete mobile-menu behavior**

`setMenuOpen(open)` must update `hidden`, `aria-expanded`, the accessible button label, and `body.menu-open`. Add listeners for trigger click, close-link activation, Escape, outside pointer interaction, and a `matchMedia('(min-width: 1024px)')` change. Escape and desktop transition return focus to the trigger when appropriate.

- [ ] **Step 5: Implement reveal and photo deterrents**

Use `IntersectionObserver` only when reduced motion is not requested. Add delegated handlers that call `preventDefault()` only when `event.target.closest('[data-protected-photo]')` matches:

```js
document.addEventListener('contextmenu', protectPhoto);
document.addEventListener('dragstart', protectPhoto);
```

Do not disable selection, context menus, or dragging globally.

- [ ] **Step 6: Run syntax and unit tests**

Run: `npm run check`

Expected: `node --check` exits 0 and all Node tests pass.

### Task 5: Security Documentation and Complete Static Verification

**Files:**
- Create: `SECURITY.md`
- Modify: `tests/site.test.mjs`

**Interfaces:**
- Consumes: final deployment files from Tasks 1–4.
- Produces: documented GitHub Pages security boundary and a static reference-integrity test.

- [ ] **Step 1: Add a failing local-reference integrity test**

```js
test('every local deployment reference resolves to a file', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="(?!https?:|mailto:|#)([^"?]+)(?:\?[^"#]*)?"/g)].map((match) => match[1]);
  for (const ref of refs) {
    const path = ref === '/' ? new URL('../index.html', import.meta.url) : new URL(`../${ref.replace(/^\//, '')}`, import.meta.url);
    assert.equal(existsSync(path), true, `${ref} does not resolve`);
  }
});
```

- [ ] **Step 2: Run the test and resolve every missing reference**

Run: `npm test`

Expected: initial FAIL if any icon, manifest, CSS, JavaScript, or image reference is missing; PASS only after each reference resolves.

- [ ] **Step 3: Document the hosting security boundary**

Create `SECURITY.md` explaining that the meta CSP and referrer policy are enforced in the document, but GitHub Pages does not allow repository-defined HSTS, `X-Content-Type-Options`, Permissions Policy, or `frame-ancestors` response headers. Recommend a configurable CDN in front of GitHub Pages only if those headers become a requirement.

- [ ] **Step 4: Measure the final payload**

Measure raw and gzip sizes of HTML, CSS, and JavaScript and list all eager image bytes separately from lazy gallery bytes. Compare against the recorded baseline: 2,099,581 raw HTML bytes and 1,566,721 gzip bytes.

Expected: initial HTML is below 60 KB raw, no embedded image payload remains, and the eager document + CSS + JavaScript + hero/logo payload is materially smaller than the 1.57 MB compressed baseline.

- [ ] **Step 5: Run the full static gate**

Run: `npm run check`

Expected: exit 0 with zero failing tests.

### Task 6: Browser Acceptance Across Mobile, Desktop, RTL, and Keyboard

**Files:**
- Modify only if a browser check exposes a defect: `index.html`, `assets/css/styles.css`, `assets/js/app.js`, or `tests/site.test.mjs`.

**Interfaces:**
- Consumes: the complete static site.
- Produces: fresh acceptance evidence and regression coverage for any defect found.

- [ ] **Step 1: Serve the site locally without cache**

Run a local static server bound to `127.0.0.1` and keep it available only for the verification session.

Expected: `index.html`, CSS, JavaScript, manifest, and all images return 200 with correct content types.

- [ ] **Step 2: Verify responsive rendering**

Inspect 320×800, 390×844, 768×1024, 1024×768, and a wide desktop viewport. At each size assert no horizontal overflow, visible readable content, correctly cropped images, no collapsed lazy-image containers, and no overlapping controls.

- [ ] **Step 3: Verify keyboard and mobile-menu behavior**

Tab from the skip link through header and primary actions. Confirm every focus stop has a visible indicator. On mobile, open the menu, press Escape, verify `aria-expanded="false"`, the menu is hidden, and focus returns to the trigger. Reopen it and activate a menu link; verify it closes.

- [ ] **Step 4: Verify bilingual and RTL behavior**

Switch to Arabic and verify `lang="ar"`, `dir="rtl"`, translated headings, captions, events, registration text, contact labels, and mirrored layout without overflow. Reload and confirm the language preference persists. Switch back to English before ending the session.

- [ ] **Step 5: Verify photo deterrents honestly**

Attempt to drag a protected photo and open its context menu; confirm both actions are suppressed. Confirm normal links still have their context menu behavior and that photo alternative text remains in the accessibility tree. Record that screenshot and developer-tool retrieval remain possible by design.

- [ ] **Step 6: Verify browser health and loading behavior**

Confirm zero console errors, same-origin subresources only, hero eager/high-priority loading, gallery lazy loading, intrinsic dimensions on every image, and no unexpected layout overflow. Run an automated accessibility/performance audit if the environment supports it and record any check that cannot be run as not verified.

- [ ] **Step 7: Add regression coverage for any discovered defect**

For each defect, first add a static or helper test that fails for the observed root cause, run it to confirm failure, make the smallest correction, and re-run `npm run check` before repeating the browser check.

- [ ] **Step 8: Run the final verification gate**

Run: `npm run check`

Expected: exit 0, zero failing tests, no browser console errors, and all viewport/keyboard/RTL checks recorded as passing or explicitly not verified.
