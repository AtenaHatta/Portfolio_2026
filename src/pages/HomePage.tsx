import ArticleSection from '../components/ArticleSection';
import HeroSection from '../components/HeroSection';
import ProjectsSection from '../components/ProjectsSection';
import WorkSection from '../components/WorkSection';
import type { getColors } from '../config/colors';

interface HomePageProps {
  colors: ReturnType<typeof getColors>;
}

function HomePage({ colors }: HomePageProps) {
  return (
    <>
      <HeroSection colors={colors} />
      <WorkSection colors={colors} />
      <ProjectsSection colors={colors} />
      <ArticleSection colors={colors} />
    </>
  );
}

export default HomePage;
