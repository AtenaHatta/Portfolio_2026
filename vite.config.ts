import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), cssAsyncLoad()],
})
