import { getColors } from '../config/colors'
import HeroSection from '../components/HeroSection'
import WorkSection from '../components/WorkSection'
import ProjectsSection from '../components/ProjectsSection'
// import BlogSection from '../components/BlogSection'

interface HomePageProps {
  colors: ReturnType<typeof getColors>
}

function HomePage({ colors }: HomePageProps) {
  return (
    <>
      <HeroSection colors={colors} />
      <WorkSection colors={colors} />
      <ProjectsSection colors={colors} />
      {/* <BlogSection colors={colors} /> */}
    </>
  )
}

export default HomePage
