import { getColors } from '../config/colors'
import ProjectsSection from '../components/ProjectsSection'

interface ProjectsPageProps {
  colors: ReturnType<typeof getColors>
}

function ProjectsPage({ colors }: ProjectsPageProps) {
  return (
    <ProjectsSection colors={colors} standalone />
  )
}

export default ProjectsPage
