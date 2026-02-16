import { useMemo } from 'react'
import type { getColors } from '../config/colors'
import { devToArticles } from '../data/devto-articles'

interface ArticleListProps {
  colors?: ReturnType<typeof getColors>
  /** When set, only show this many items (e.g. 5 for home section) */
  maxItems?: number
  /** When true, use larger image size (same as Projects page); when false, same as Home projects */
  standalone?: boolean
  /** When set, only show articles that have this tag in tag_list (e.g. "collegecms" for project Related Articles) */
  tagFilter?: string
}

export default function ArticleList({ colors, maxItems, standalone, tagFilter }: ArticleListProps) {
  const articles = useMemo(() => {
    let list = [...devToArticles].sort(
      (a, b) => new Date(b.published_at).getTime() - new Date(a.published_at).getTime()
    )
    if (tagFilter) {
      const tagLower = tagFilter.toLowerCase()
      list = list.filter((a) => a.tag_list.some((t: string) => t.toLowerCase() === tagLower))
    }
    return list
  }, [tagFilter])

  const secondaryColor = colors?.secondary.text ?? '#D1D5DB'
  const chipBg = colors?.chip.bg ?? '#E5E7EB'
  const chipText = colors?.chip.text ?? '#374151'

  if (articles.length === 0) {
    return (
      <p className="font-light" style={{ color: secondaryColor }}>
        No articles found.
      </p>
    )
  }

  const displayArticles = maxItems != null ? articles.slice(0, maxItems) : articles

  return (
    <div className="space-y-12 mb-8">
      {displayArticles.map((article) => (
        <a
          key={article.id}
          href={article.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col sm:flex-row gap-4 sm:gap-6 hover:opacity-80 transition-opacity"
        >
          {/* Image (same size as project card: standalone = articles page, non-standalone = home) */}
          <div
            className={`flex-shrink-0 w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 aspect-video sm:aspect-auto ${
              standalone ? 'sm:w-64 h-52 sm:h-44' : 'sm:w-48 h-40 sm:h-32'
            }`}
          >
            {article.cover_image ? (
              <img
                src={(article.cover_image ?? '').replace('width=1000', 'width=384')}
                alt={article.title}
                width={384}
                height={216}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center opacity-50"
                style={{ color: secondaryColor }}
              >
                <span className="text-4xl">📝</span>
              </div>
            )}
          </div>

          {/* Details (same structure as project card) */}
          <div className="flex-1">
            <p
              className="text-sm font-light mb-2"
              style={{ color: secondaryColor }}
            >
              {new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </p>
            <h3
              className="text-xl font-light mb-2"
              style={{ color: colors?.background.text }}
            >
              {article.title}
            </h3>
            <div className="flex items-center gap-4 text-sm font-light mb-3" style={{ color: secondaryColor }}>
              {(article.page_views_count != null && article.page_views_count > 0) && (
                <span>👁 {article.page_views_count.toLocaleString()} views</span>
              )}
              <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
                {(article.positive_reactions_count ?? article.public_reactions_count).toLocaleString()} reactions
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tag_list
                .filter((t) => !t.toLowerCase().startsWith('project'))
                .slice(0, 5)
                .map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-[2px] text-sm font-light"
                    style={{ backgroundColor: chipBg, color: chipText }}
                  >
                    #{tag}
                  </span>
                ))}
            </div>
          </div>
        </a>
      ))}
    </div>
  )
}
