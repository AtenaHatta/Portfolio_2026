import { getColors } from '../config/colors'

interface EducationSectionProps {
  colors: ReturnType<typeof getColors>
  /** When true, render without section wrapper (for embedding in another section) */
  embed?: boolean
}

interface Education {
  title: string
  institution: string
  location?: string
  period: string
  icon?: string
  url?: string
}

function EducationSection({ colors, embed }: EducationSectionProps) {
  const educations: Education[] = [
    {
      title: 'Web and Mobile App Development Diploma',
      institution: 'Cornerstone Community College of Canada',
      location: 'Vancouver BC, Canada',
      period: 'Sept 2022 – Aug 2024',
      icon: '/assets/ciccc-icon.png',
      url: 'https://ciccc.ca/en',
    },
    {
      title: 'Bachelor of International Tourism',
      institution: 'Hannan University',
      location: 'Osaka, Japan',
      period: 'Apr 2011 – Mar 2015',
      icon: '/assets/hannan-icon.png',
      url: 'https://www.hannan-u.ac.jp/english/',
    },
  ]

  const content = (
    <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side - Title */}
        <div className="flex-shrink-0 md:w-48">
          <h2 
            className="text-2xl md:text-3xl font-light"
            style={{ color: colors.background.text }}
          >
            Education
          </h2>
        </div>

        {/* Right Side - Content */}
        <div className="flex-1">
          <div className="space-y-2">
            {educations.map((education, index) => {
              const inner = (
                <>
                  {/* Icon */}
                  {education.icon ? (
                    <div className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden opacity-50 transition-opacity group-hover:opacity-100 pointer-events-none">
                      <img 
                        src={education.icon} 
                        alt={`${education.institution} logo`}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-lg pointer-events-none"
                      style={{ backgroundColor: colors.chip.bg }}
                    />
                  )}

                  {/* Education Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4 min-w-0">
                    <div>
                      <h3 
                        className="text-xl font-light mb-1"
                        style={{ color: colors.background.text }}
                      >
                        {education.title}
                      </h3>
                      <p 
                        className="text-base font-light"
                        style={{ color: colors.secondary.text }}
                      >
                        {education.institution}
                      </p>
                      {education.location && (
                        <p 
                          className="text-base font-light mt-0.5"
                          style={{ color: colors.secondary.text }}
                        >
                          {education.location}
                        </p>
                      )}
                    </div>
                    <p 
                      className="text-base font-light sm:whitespace-nowrap flex-shrink-0"
                      style={{ color: colors.secondary.text }}
                    >
                      {education.period}
                    </p>
                  </div>
                </>
              )
              const className = "group flex items-start gap-6 rounded-lg p-4 -mx-4 transition-colors hover:bg-gray-100 dark:hover:bg-gray-800/80"
              return education.url ? (
                <a
                  key={index}
                  href={education.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={className}
                >
                  {inner}
                </a>
              ) : (
                <div key={index} className={className}>
                  {inner}
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )

  if (embed) {
    return <div className="pt-24 md:pt-32">{content}</div>
  }

  return (
    <section className="pt-12 pb-20">
      {content}
    </section>
  )
}

export default EducationSection
