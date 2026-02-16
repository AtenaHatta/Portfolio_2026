import { writeFileSync, mkdirSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const OUT_PATH = join(__dirname, '..', 'src', 'data', 'devto-articles.json')

async function main() {
  try {
    const res = await fetch('https://dev.to/api/articles?username=atena')
    if (!res.ok) throw new Error(`dev.to API: ${res.status}`)
    const data = await res.json()
    const list = Array.isArray(data) ? data : []
    mkdirSync(dirname(OUT_PATH), { recursive: true })
    writeFileSync(OUT_PATH, JSON.stringify(list, null, 2), 'utf8')
    console.log(`Wrote ${list.length} dev.to articles to src/data/devto-articles.json`)
  } catch (err) {
    console.error('Fetch dev.to articles failed:', err.message)
    writeFileSync(OUT_PATH, '[]', 'utf8')
    console.log('Wrote empty array to src/data/devto-articles.json')
  }
}

main()
