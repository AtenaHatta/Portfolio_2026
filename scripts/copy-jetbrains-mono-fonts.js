import { copyFileSync, mkdirSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..')
const pkgDir = join(root, 'node_modules', '@fontsource', 'jetbrains-mono', 'files')
const outDir = join(root, 'public', 'fonts')

const files = [
  'jetbrains-mono-latin-300-normal.woff2',
  'jetbrains-mono-latin-400-normal.woff2',
]

if (!existsSync(pkgDir)) {
  console.warn('@fontsource/jetbrains-mono not found. Run pnpm install.')
  process.exit(0)
}

mkdirSync(outDir, { recursive: true })
for (const f of files) {
  const src = join(pkgDir, f)
  if (existsSync(src)) {
    copyFileSync(src, join(outDir, f))
    console.log('Copied', f)
  }
}
