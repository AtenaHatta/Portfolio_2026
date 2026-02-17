import { copyFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const pkgDir = join(root, 'node_modules', '@fontsource', 'iosevka', 'files');
const outDir = join(root, 'public', 'fonts');

const files = ['iosevka-latin-300-normal.woff2', 'iosevka-latin-400-normal.woff2'];

if (!existsSync(pkgDir)) {
  console.warn('@fontsource/iosevka not found. Run pnpm install.');
  process.exit(0);
}

mkdirSync(outDir, { recursive: true });
for (const f of files) {
  const src = join(pkgDir, f);
  if (existsSync(src)) {
    copyFileSync(src, join(outDir, f));
    console.log('Copied', f);
  }
}
