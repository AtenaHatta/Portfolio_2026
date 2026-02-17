import ArticleList from '../components/ArticleList';
import type { getColors } from '../config/colors';

interface ArticlePageProps {
  colors: ReturnType<typeof getColors>;
}

function ArticlePage({ colors }: ArticlePageProps) {
  return (
    <div className="pt-24 sm:pt-48 pb-8">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 md:w-48">
            <h1
              className="text-2xl md:text-3xl font-light"
              style={{ color: colors.background.text }}
            >
              Articles
            </h1>
          </div>
          {/* Right Side - Content (dev.to) */}
          <div className="flex-1">
            <ArticleList colors={colors} standalone />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticlePage;
