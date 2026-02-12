import { getColors } from '../config/colors'

interface WorkSectionProps {
  colors: ReturnType<typeof getColors>
}

interface WorkExperience {
  title: string
  company: string
  period: string
  location?: string
  icon?: string
  url?: string
}

function WorkSection({ colors }: WorkSectionProps) {
  const workExperiences: WorkExperience[] = [
    {
      title: 'Full stack Developer',
      company: 'Cornerstone Canadian Institute',
      period: 'Jul 2025 - Present',
      location: 'Vancouver BC, Canada',
      icon: '/assets/cornerstone-icon.png',
      url: 'https://cornerstoneedu.ca/',
    },
    {
      title: 'Full stack Developer',
      company: 'HEARTBEATS',
      period: 'Jan 2025 - Mar 2025',
      location: 'Tokyo, Japan',
      icon: '/assets/heartbeats-icon.png',
      url: 'https://www.summations.com/',
    },
    {
      title: 'Front end Developer',
      company: 'Summations',
      period: 'Aug 2023 - Jul 2024',
      location: 'Toronto ON, Canada',
      icon: '/assets/summations-icon.png',
      url: 'https://www.summations.com/',
    },
    {
      title: 'Front end Developer',
      company: 'Epic',
      period: 'Aug 2023 - Dec 2023',
      location: 'Vancouver BC, Canada',
      icon: '/assets/eepic-icon.png',
      url: 'https://www.eepic.ca/event-vendors',
    },
    {
      title: 'Front end Developer',
      company: 'Rims',
      period: 'Aug 2023 - Dec 2023',
      location: 'Tokyo, Japan',
      icon: '/assets/rims-icon.png',
      url: 'https://www.rims.agency/',
    },
  ]

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row md:items-start gap-12">
          {/* Left Side - Title */}
          <div className="flex-shrink-0 md:w-48">
            <h2 
              className="text-2xl md:text-3xl font-light"
              style={{ color: colors.background.text }}
            >
              Work
            </h2>
          </div>

          {/* Right Side - Content */}
          <div className="flex-1">
            {/* Work Experiences */}
            <div className="space-y-2">
              {workExperiences.map((work, index) => (
                <a
                  key={index}
                  href={work.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-6 rounded-lg p-4 -mx-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/80"
                >
                  {/* Icon */}
                  {work.icon ? (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden opacity-50 transition-opacity group-hover:opacity-100 pointer-events-none">
                      <img 
                        src={work.icon} 
                        alt={`${work.company} logo`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-lg pointer-events-none"
                      style={{ backgroundColor: colors.chip.bg }}
                    />
                  )}

                  {/* Work Info */}
                  <div className="flex-1 flex items-start justify-between gap-4 min-w-0">
                    <div>
                      <h3 
                        className="text-xl font-light mb-1"
                        style={{ color: colors.background.text }}
                      >
                        {work.title}
                      </h3>
                      <p 
                        className="text-base font-light"
                        style={{ color: colors.secondary.text }}
                      >
                        {work.company}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p 
                        className="text-base font-light whitespace-nowrap"
                        style={{ color: colors.secondary.text }}
                      >
                        {work.period}
                      </p>
                      {work.location && (
                        <p 
                          className="text-base font-light whitespace-nowrap mt-1"
                          style={{ color: colors.secondary.text }}
                        >
                          {work.location}
                        </p>
                      )}
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default WorkSection
