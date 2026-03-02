import type { getColors } from '../config/colors';
import AssetImage from './AssetImage';

interface WorkSectionProps {
  colors: ReturnType<typeof getColors>;
}

interface WorkExperience {
  title: string;
  company: string;
  period: string;
  location?: string;
  icon?: string;
  url?: string;
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
  ];

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
                  className="group flex flex-col sm:flex-row gap-2 sm:gap-4 py-4 sm:py-3 border-b border-transparent hover:opacity-80 transition-opacity"
                  style={{ borderColor: `${colors.secondary.text}20` }}
                >
                  {work.icon && (
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 sm:opacity-70 sm:group-hover:opacity-100 transition-opacity">
                      <AssetImage
                        src={work.icon}
                        alt={`${work.company} logo`}
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-light" style={{ color: colors.secondary.text }}>
                      {work.period}
                      {work.location ? ` · ${work.location}` : ''}
                    </p>
                    <p className="text-base font-medium" style={{ color: colors.background.text }}>
                      {work.title} at {work.company}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WorkSection;
