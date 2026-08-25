import assert from 'node:assert/strict';
import { existsSync, readFileSync, statSync } from 'node:fs';
import test from 'node:test';

const root = new URL('../', import.meta.url);
const asset = (name) => new URL(`assets/images/${name}`, root);
const expectedImages = [
  'between-logo.png',
  'psu-logo.png',
  'og-between.jpg',
  'hero-team-640.webp',
  'hero-team-960.webp',
  'hero-team-1200.webp',
  'gallery-team-640.webp',
  'gallery-team-1200.webp',
  'gallery-talks-640.webp',
  'gallery-talks-1200.webp',
  'gallery-winners-640.webp',
  'gallery-winners-1200.webp',
  'gallery-founder-640.webp',
  'gallery-founder-1200.webp',
  'gallery-founders-640.webp',
  'gallery-founders-1200.webp',
];

const findClosingBrace = (css, openingBrace) => {
  let depth = 0;
  for (let index = openingBrace; index < css.length; index += 1) {
    if (css[index] === '{') depth += 1;
    if (css[index] === '}') depth -= 1;
    if (depth === 0) return index;
  }
  throw new Error('Unbalanced CSS block');
};

const renderedClassProperty = (css, classSelector, property, viewportWidth, initialValue) => {
  let renderedValue = initialValue;

  const visit = (source) => {
    let cursor = 0;
    while (cursor < source.length) {
      const openingBrace = source.indexOf('{', cursor);
      if (openingBrace === -1) break;

      const header = source.slice(cursor, openingBrace).trim();
      const closingBrace = findClosingBrace(source, openingBrace);
      const block = source.slice(openingBrace + 1, closingBrace);

      if (header.startsWith('@media')) {
        const minimumWidth = Number(header.match(/min-width:\s*(\d+)px/)?.[1] ?? 0);
        if (viewportWidth >= minimumWidth) visit(block);
      } else if (header.split(',').map((selector) => selector.trim()).includes(classSelector)) {
        for (const declaration of block.split(';')) {
          const separator = declaration.indexOf(':');
          if (separator === -1) continue;
          const name = declaration.slice(0, separator).trim();
          const value = declaration.slice(separator + 1).trim();
          if (name === property) renderedValue = value;
        }
      }

      cursor = closingBrace + 1;
    }
  };

  visit(css.replace(/\/\*[\s\S]*?\*\//g, ''));
  return renderedValue;
};

test('optimized image assets exist and stay within web delivery budgets', () => {
  for (const name of expectedImages) {
    assert.equal(existsSync(asset(name)), true, `${name} is missing`);
    assert.ok(statSync(asset(name)).size < 260_000, `${name} exceeds 260 KB`);
  }
});

test('the deployed HTML contains no embedded image payloads', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(html, /data:image\//i);
});

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

test('root styles do not force horizontal overflow at a 320px viewport', () => {
  const css = readFileSync(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
  assert.doesNotMatch(css, /(?:html|body)\s*\{[^}]*min-width:\s*320px/gs);
});

test('desktop footer paints the full viewport instead of a centered strip', () => {
  const css = readFileSync(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
  assert.equal(renderedClassProperty(css, '.footer', 'width', 2048, 'auto'), '100%');
});

test('desktop gallery cards keep their natural height instead of exposing stretched backgrounds', () => {
  const css = readFileSync(new URL('../assets/css/styles.css', import.meta.url), 'utf8');
  assert.equal(renderedClassProperty(css, '.gallery-grid', 'align-items', 2048, 'stretch'), 'start');
});

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

test('every local deployment reference resolves to a file', () => {
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const refs = [...html.matchAll(/(?:src|href)="(?!https?:|mailto:|#)([^"?]+)(?:\?[^"#]*)?"/g)]
    .map((match) => match[1]);

  for (const ref of refs) {
    const path = ref === '/'
      ? new URL('../index.html', import.meta.url)
      : new URL(`../${ref.replace(/^\//, '')}`, import.meta.url);
    assert.equal(existsSync(path), true, `${ref} does not resolve`);
  }
});
