import ProjectsSection from '../components/ProjectsSection';
import type { getColors } from '../config/colors';

interface ProjectsPageProps {
  colors: ReturnType<typeof getColors>;
}

function ProjectsPage({ colors }: ProjectsPageProps) {
  return <ProjectsSection colors={colors} standalone />;
}

export default ProjectsPage;
