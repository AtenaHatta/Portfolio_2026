import { getColors } from '../config/colors'

interface BlogSectionProps {
  colors: ReturnType<typeof getColors>
}

interface BlogPost {
  date: string
  title: string
  url?: string
}

function BlogSection({ colors }: BlogSectionProps) {
  const blogPosts: BlogPost[] = [
    {
      date: 'Dec 14, 2025',
      title: 'How to decide library to improve server performance?',
      url: '#',
    },
    {
      date: 'Dec 10, 2025',
      title: 'How to avoid using any in TypeScript',
      url: '#',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 md:w-48">
            <h2 
              className="text-4xl md:text-5xl font-light"
              style={{ color: colors.background.text }}
            >
              Blog
            </h2>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1">
            {/* Blog Posts */}
            <div className="space-y-6 mb-8">
              {blogPosts.map((post, index) => (
                <a
                  key={index}
                  href={post.url}
                  className="group flex items-center gap-3 hover:opacity-70 transition-opacity"
                >
                  <span 
                    className="text-base font-light"
                    style={{ color: colors.secondary.text }}
                  >
                    {post.date}
                  </span>
                  <span 
                    className="text-base font-light flex-1"
                    style={{ color: colors.background.text }}
                  >
                    {post.title}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                    style={{ color: colors.background.text }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </a>
              ))}
            </div>

            {/* View more Link */}
            <div className="flex justify-end">
              <a
                href="#blog"
                className="group flex items-center gap-2 hover:opacity-70 transition-opacity"
                style={{ color: colors.background.text }}
              >
                <span className="text-base font-light">View more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogSection
