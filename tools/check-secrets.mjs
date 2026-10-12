import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const listed = execFileSync('git', [
  '-c', `safe.directory=${root.replaceAll('\\', '/')}`,
  'ls-files', '-co', '--exclude-standard', '-z',
], { cwd: root });

const patterns = [
  ['provider key', /(?:sk-[A-Za-z0-9_-]{12,}|AIza[0-9A-Za-z_-]{20,}|gh[pousr]_[A-Za-z0-9_]{20,}|AKIA[0-9A-Z]{16}|xox[baprs]-[A-Za-z0-9-]{15,}|SG\.[A-Za-z0-9_-]{20,}|sk_(?:live|test)_[A-Za-z0-9]{16,})/i],
  ['private key', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
  ['credential assignment', /(?:api[_-]?key|client[_-]?secret|access[_-]?token|auth[_-]?token|password|passwd)\s*[=:]\s*["'`][^"'`\r\n]{8,}["'`]/i],
  ['credential in URL', /https?:\/\/[^\s/@:]+:[^\s/@]+@[^\s/"'`]+/i],
  ['JWT', /eyJ[A-Za-z0-9_-]{10,}\.eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}/],
];
const sensitiveName = /(?:^|\/)(?:\.env(?:\..+)?|\.npmrc|\.pypirc|\.aws\/[^/]+|\.ssh\/[^/]+|credentials(?:\..+)?|service-account[^/]*\.json|id_(?:rsa|ed25519)(?:\..+)?|[^/]+\.(?:pem|key|p8|p12|pfx|jks|keystore))$/i;
const photoMetadata = /(?:GPSLatitude|GPSLongitude|<x:xmpmeta|Exif\x00\x00|EXIF|XMP |eXIf|iTXt|tEXt|zTXt)/;
const findings = [];
let scanned = 0;

for (const path of listed.toString('utf8').split('\0').filter(Boolean)) {
  const normalized = path.replaceAll('\\', '/');
  const absolute = resolve(root, path);
  if (!existsSync(absolute) || !statSync(absolute).isFile()) continue;
  scanned += 1;
  if (sensitiveName.test(normalized) && normalized !== '.env.example') {
    findings.push(`${normalized}: sensitive filename`);
  }
  const bytes = readFileSync(absolute);
  const content = bytes.toString('latin1');
  for (const [label, pattern] of patterns) {
    if (pattern.test(content)) findings.push(`${normalized}: ${label}`);
  }
  if (/\.(?:jpe?g|png|webp|avif)$/i.test(normalized) && photoMetadata.test(content)) {
    findings.push(`${normalized}: embedded photo metadata`);
  }
}

if (findings.length) {
  console.error(`Potential secrets found in ${findings.length} place(s):`);
  for (const finding of findings) console.error(`  ${finding}`);
  process.exitCode = 1;
} else {
  console.log(`No secret patterns found in ${scanned} repository files.`);
}
