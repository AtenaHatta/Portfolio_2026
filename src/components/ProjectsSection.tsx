import { Link } from 'react-router-dom'
import { getColors } from '../config/colors'
import projectsData from '../data/projects.json'

interface ProjectsSectionProps {
  colors: ReturnType<typeof getColors>
  standalone?: boolean
}

const FEATURED_PROJECT_IDS = ['e-certificate', 'college-cms']

function ProjectsSection({ colors, standalone = false }: ProjectsSectionProps) {
  const projectIdsToShow = standalone ? FEATURED_PROJECT_IDS : FEATURED_PROJECT_IDS.slice(0, 4)
  const projects = projectIdsToShow
    .flatMap((id) => {
      const p = projectsData.projects.find((pr) => pr.id === id)
      return p != null ? [p] : []
    })
    .map((p) => {
      const projectWithTop = p as { topImage?: string; sections?: Record<string, { image?: string }> }
      const image = projectWithTop.topImage ?? projectWithTop.sections?.['product-overview']?.image
      return {
        id: p.id,
        type: p.type,
        title: p.title,
        technologies: p.technologies,
        url: `/project/${p.id}`,
        image,
      }
    })

  return (
    <section className={standalone ? 'py-48 min-h-screen' : 'py-20'}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 md:w-48">
            <h2 
              className="text-2xl md:text-3xl font-light"
              style={{ color: colors.background.text }}
            >
              Projects
            </h2>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1">
            {/* Projects List */}
            <div className="space-y-12 mb-8" id="projects">
              {projects.map((project) => (
                <Link
                  key={project.id}
                  to={`/project/${project.id}`}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-6 hover:opacity-80 transition-opacity"
                >
                  {/* Project Image or Placeholder (larger on /project page) */}
                  <div
                    className={`flex-shrink-0 w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 aspect-video sm:aspect-auto ${
                      standalone ? 'sm:w-64 h-52 sm:h-44' : 'sm:w-48 h-40 sm:h-32'
                    }`}
                  >
                    {project.image ? (
                      <img
                        src={project.image}
                        alt={project.title ? `${project.title} thumbnail` : 'Project thumbnail'}
                        width={640}
                        height={360}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div
                        className="w-full h-full"
                        style={{ backgroundColor: colors.chip.bg }}
                      />
                    )}
                  </div>

                  {/* Project Details */}
                  <div className="flex-1">
                    <p 
                      className="text-sm font-light mb-2"
                      style={{ color: colors.secondary.text }}
                    >
                      {project.type}
                    </p>
                    <h3 
                      className="text-xl font-light mb-3"
                      style={{ color: colors.background.text }}
                    >
                      {project.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 rounded-[2px] text-sm font-light"
                          style={{
                            backgroundColor: colors.chip.bg,
                            color: colors.chip.text,
                          }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* View more Link (home のみ表示、/project では非表示) */}
            {!standalone && (
            <div className="flex justify-end">
              <Link
                to="/project"
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
