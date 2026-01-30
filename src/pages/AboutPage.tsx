import { getColors } from '../config/colors'
import EducationSection from '../components/EducationSection'
import PassionSection from '../components/PassionSection'

interface AboutPageProps {
  colors: ReturnType<typeof getColors>
}

function AboutPage({ colors }: AboutPageProps) {
  const interests = ['Hike', 'Tennis', 'Movie', 'Karaoke']

  return (
    <>
    <section className="py-48 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Left Side - Title Only */}
          <div className="flex-shrink-0 md:w-48">
            <h2 
              className="text-2xl md:text-3xl font-light"
              style={{ color: colors.background.text }}
            >
              Who
            </h2>
          </div>

          {/* Right Side - Content (写真はあとで入れる) */}
          <div className="flex-1">
            {/* Content */}
            <div className="flex-1">
              <p 
                className="text-lg font-light mb-2"
                style={{ color: colors.secondary.text }}
              >
                Full stack Developer
              </p>
              <h1 
                className="text-4xl md:text-5xl font-light mb-6"
                style={{ color: colors.background.text }}
              >
                I am Atena Hatta
              </h1>
              
              {/* Description Paragraphs */}
              <div className="mb-8 space-y-4">
                <p 
                  className="text-lg font-light leading-relaxed"
                  style={{ color: colors.background.text }}
                >
                  I'm a Full stack Developer with a strong focus on React and TypeScript.
                </p>
                <p 
                  className="text-lg font-light leading-relaxed"
                  style={{ color: colors.background.text }}
                >
                  I handle everything from app architecture to design planning with Figma, performance-focused coding, and deployment. I'm particularly meticulous about the overall design and layout, down to the pixel.
                </p>
              </div>

              {/* Interest Tags */}
              <div className="flex flex-wrap gap-3">
                {interests.map((interest, index) => (
                  <span
                    key={index}
                    className="flex items-center px-4 py-2 rounded-lg"
                    style={{
                      backgroundColor: colors.chip.bg,
                      color: colors.chip.text,
                    }}
                  >
                    <span className="text-base font-light">{interest}</span>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <EducationSection colors={colors} />
    <PassionSection colors={colors} />
  </>
  )
}

export default AboutPage
