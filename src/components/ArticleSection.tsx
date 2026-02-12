import { Link } from 'react-router-dom'
import { getColors } from '../config/colors'
import ArticleList from './ArticleList'

interface ArticleSectionProps {
  colors: ReturnType<typeof getColors>
}

const MAX_ITEMS = 4

function ArticleSection({ colors }: ArticleSectionProps) {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 md:w-48">
            <h2 
              className="text-2xl md:text-3xl font-light"
              style={{ color: colors.background.text }}
            >
              Articles
            </h2>
          </div>

          {/* Right Side - Content (same cards as articles page, max 5) */}
          <div className="flex-1">
            <ArticleList colors={colors} maxItems={MAX_ITEMS} />
            {/* View more Link */}
            <div className="flex justify-end">
              <Link
                to="/articles"
                className="group flex items-center gap-2 hover:opacity-70 transition-opacity"
                style={{ color: colors.background.text }}
              >
                <span className="text-base font-light">View more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArticleSection
