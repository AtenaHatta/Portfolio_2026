import { getColors } from '../config/colors'
import HeroSection from '../components/HeroSection'
import WorkSection from '../components/WorkSection'
import ProjectsSection from '../components/ProjectsSection'
import ArticleSection from '../components/ArticleSection'

interface HomePageProps {
  colors: ReturnType<typeof getColors>
}

function HomePage({ colors }: HomePageProps) {
  return (
    <>
      <HeroSection colors={colors} />
      <WorkSection colors={colors} />
      <ProjectsSection colors={colors} />
      <ArticleSection colors={colors} />
    </>
  )
}

export default HomePage
