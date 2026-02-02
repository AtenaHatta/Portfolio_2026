import { getColors } from '../config/colors'

interface EducationSectionProps {
  colors: ReturnType<typeof getColors>
}

interface Education {
  title: string
  institution: string
  location?: string
  period: string
  icon?: string
  url?: string
}

function EducationSection({ colors }: EducationSectionProps) {
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

  return (
    <section className="py-20">
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
            <div className="space-y-8">
              {educations.map((education, index) => (
                <div 
                  key={index}
                  className="flex items-start gap-6"
                >
                  {/* Icon */}
                  {education.icon ? (
                    <a
                      href={education.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-opacity hover:opacity-100 opacity-50"
                    >
                      <img 
                        src={education.icon} 
                        alt={`${education.institution} logo`}
                        className="w-full h-full object-cover"
                      />
                    </a>
                  ) : (
                    <div 
                      className="flex-shrink-0 w-16 h-16 rounded-lg"
                      style={{ backgroundColor: colors.chip.bg }}
                    />
                  )}

                  {/* Education Info */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
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
                      className="text-base font-light sm:whitespace-nowrap"
                      style={{ color: colors.secondary.text }}
                    >
                      {education.period}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default EducationSection
