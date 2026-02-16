import { readdirSync, existsSync } from 'fs'
import { join, extname } from 'path'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const assetsDir = join(__dirname, '..', 'public', 'assets')

async function main() {
  let sharp
  try {
    sharp = (await import('sharp')).default
  } catch {
    console.warn('sharp not installed. Run: pnpm add -D sharp')
    process.exit(0)
  }

  if (!existsSync(assetsDir)) {
    console.warn('public/assets not found')
    process.exit(0)
  }

  const files = readdirSync(assetsDir).filter((f) => extname(f).toLowerCase() === '.png')
  for (const file of files) {
    const input = join(assetsDir, file)
    const out = join(assetsDir, file.replace(/\.png$/i, '.webp'))
    const isIcon = /-icon\.png$/i.test(file)
    const isHeroOrPreviewOrFlowchart = /-hero\.png$/i.test(file) || /-preview\.png$/i.test(file) || /-flowchart\.png$/i.test(file)

    try {
      let pipeline = sharp(input)
      const meta = await pipeline.metadata()
      const w = meta.width ?? 0
      const h = meta.height ?? 0

      if (isIcon && (w > 128 || h > 128)) {
        pipeline = pipeline.resize(128, 128, { fit: 'inside', withoutEnlargement: true })
      } else if ((isHeroOrPreviewOrFlowchart || w > 1200 || h > 1200) && !isIcon) {
        const maxW = isHeroOrPreviewOrFlowchart ? 800 : 1200
        if (w > maxW || h > maxW) {
          pipeline = pipeline.resize(maxW, null, { fit: 'inside', withoutEnlargement: true })
        }
      }

      await pipeline.webp({ quality: 80 }).toFile(out)
      console.log('Generated', file.replace(/\.png$/i, '.webp'))
    } catch (err) {
      console.error(file, err.message)
    }
  }
}

main()
