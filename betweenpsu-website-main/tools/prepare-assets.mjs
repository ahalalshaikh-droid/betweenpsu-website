import { createRequire } from 'node:module';
import { mkdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourcePath = path.join(projectRoot, 'index.html');
const outputDirectory = path.join(projectRoot, 'assets', 'images');
const bundledModules = process.env.CODEX_NODE_MODULES;
const requireFrom = bundledModules
  ? createRequire(pathToFileURL(path.join(bundledModules, 'package.json')))
  : createRequire(import.meta.url);
const sharp = requireFrom('sharp');

const source = await readFile(sourcePath, 'utf8');
const encodedImages = [...source.matchAll(/data:(image\/(?:png|jpeg));base64,([^"']+)/g)];

if (encodedImages.length !== 7) {
  throw new Error(`Expected 7 embedded images, found ${encodedImages.length}.`);
}

await mkdir(outputDirectory, { recursive: true });

const buffers = encodedImages.map((match) => Buffer.from(match[2], 'base64'));
const outputPath = (name) => path.join(outputDirectory, name);
const galleryRoles = ['gallery-team', 'gallery-talks', 'gallery-winners', 'gallery-founder', 'gallery-founders'];

await sharp(buffers[0])
  .rotate()
  .resize({ width: 220, withoutEnlargement: true })
  .png({ compressionLevel: 9, palette: true })
  .toFile(outputPath('between-logo.png'));

for (const width of [640, 960, 1200]) {
  await sharp(buffers[1])
    .rotate()
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82, effort: 6 })
    .toFile(outputPath(`hero-team-${width}.webp`));
}

for (const [index, role] of galleryRoles.entries()) {
  for (const width of [640, 1200]) {
    await sharp(buffers[index + 2])
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78, effort: 6 })
      .toFile(outputPath(`${role}-${width}.webp`));
  }
}

await sharp(buffers[1])
  .rotate()
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(outputPath('og-between.jpg'));

const psuResponse = await fetch('https://images.seeklogo.com/logo-png/35/1/prince-sultan-university-logo-png_seeklogo-359171.png', {
  headers: { 'user-agent': 'BetweenPSU asset optimizer' },
});

if (!psuResponse.ok) {
  throw new Error(`PSU logo download failed with HTTP ${psuResponse.status}.`);
}

const psuContentType = psuResponse.headers.get('content-type') ?? '';
if (!psuContentType.startsWith('image/')) {
  throw new Error(`PSU logo returned unexpected content type: ${psuContentType || 'missing'}.`);
}

const psuBuffer = Buffer.from(await psuResponse.arrayBuffer());
await sharp(psuBuffer)
  .rotate()
  .resize(96, 96, { fit: 'contain', background: { r: 251, g: 248, b: 241, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(outputPath('psu-logo.png'));

const generatedNames = [
  'between-logo.png',
  'psu-logo.png',
  'og-between.jpg',
  'hero-team-640.webp',
  'hero-team-960.webp',
  'hero-team-1200.webp',
  ...galleryRoles.flatMap((role) => [`${role}-640.webp`, `${role}-1200.webp`]),
];

for (const name of generatedNames) {
  const file = outputPath(name);
  const [metadata, fileStats] = await Promise.all([sharp(file).metadata(), stat(file)]);
  process.stdout.write(`${name}\t${metadata.width}x${metadata.height}\t${fileStats.size} bytes\n`);
}
