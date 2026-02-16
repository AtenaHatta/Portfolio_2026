import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

/** Make main CSS non-render-blocking: load with media="print" then switch to "all" on load */
function cssAsyncLoad() {
  return {
    name: 'css-async-load',
    transformIndexHtml(html: string) {
      return html.replace(
        /<link rel="stylesheet"([^>]*?)href="(\/assets\/index-[^"]+\.css)"([^>]*)>/,
        (_, before, href, after) =>
          `<link rel="stylesheet"${before}href="${href}"${after} media="print" onload="this.media='all'">\n    <noscript><link rel="stylesheet" href="${href}"></noscript>`
      )
    },
  }
}

/** Inject <link rel="modulepreload"> for all JS chunks to parallelize critical request chain */
function modulepreloadChunks() {
  return {
    name: 'modulepreload-chunks',
    apply: 'build' as const,
    writeBundle(options: { dir?: string }, bundle: Record<string, { type: string; fileName?: string }>) {
      const outDir = options.dir ?? 'dist'
      const indexPath = join(outDir, 'index.html')
      let html: string
      try {
        html = readFileSync(indexPath, 'utf-8')
      } catch {
        return
      }
      const jsChunks = Object.keys(bundle).filter(
        (name) => name.endsWith('.js') && bundle[name].type === 'chunk'
      )
      const links = jsChunks
        .map((file) => {
          const href = file.startsWith('assets/') ? `/${file}` : `/assets/${file}`
          return `    <link rel="modulepreload" href="${href}">`
        })
        .join('\n')
      const newHtml = html.replace('</head>', `${links}\n  </head>`)
      writeFileSync(indexPath, newHtml)
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssAsyncLoad(), modulepreloadChunks()],
})
