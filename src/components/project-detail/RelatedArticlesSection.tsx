import type { ComponentProps } from 'react';
import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import ArticleList from '../ArticleList';

const INTRO_TEXT =
  'I have summarized the technical challenges and solutions from this project in these articles. Hoping this saves someone else some debugging time.';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function RelatedArticlesSection({ section, ctx }: Props) {
  const { colors } = ctx;
  const relatedPostsFromDevTo = section.relatedPostsFromDevTo;
  const relatedPosts = section.relatedPosts;
  const devToTag = section.devToTag;

  if (relatedPostsFromDevTo) {
    return (
      <>
        <p
          className="mb-8 font-light leading-relaxed opacity-90"
          style={{ color: colors.background?.text }}
        >
          {INTRO_TEXT}
        </p>
        <ArticleList
          colors={colors as ComponentProps<typeof ArticleList>['colors']}
          maxItems={2}
          tagFilter={devToTag}
        />
      </>
    );
  }
  if (relatedPosts != null && relatedPosts.length > 0) {
    return (
      <>
        <p
          className="mb-8 font-light leading-relaxed opacity-90"
          style={{ color: colors.background?.text }}
        >
          {INTRO_TEXT}
        </p>
        <div className="space-y-12">
          {relatedPosts.map((post, i) => (
            <a
              key={i}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col sm:flex-row gap-4 sm:gap-6 hover:opacity-80 transition-opacity"
            >
              <div className="flex-shrink-0 w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 aspect-video sm:aspect-auto sm:w-48 h-40 sm:h-32">
                <div
                  className="w-full h-full flex items-center justify-center opacity-50"
                  style={{ color: colors.secondary?.text }}
                >
                  <span className="text-4xl">📝</span>
                </div>
              </div>
              <div className="flex-1">
                {post.date != null && post.date !== '' && (
                  <p className="text-sm font-light mb-2" style={{ color: colors.secondary?.text }}>
                    {post.date}
                  </p>
                )}
                <h3
                  className="text-xl font-light flex-1"
                  style={{ color: colors.background?.text }}
                >
                  {post.title}
                </h3>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mt-2 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  style={{ color: colors.background?.text }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </>
    );
  }
  return null;
}
