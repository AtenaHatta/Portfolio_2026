import { getColors } from '../config/colors'
import EducationSection from '../components/EducationSection'
import PassionSection from '../components/PassionSection'

interface AboutPageProps {
  colors: ReturnType<typeof getColors>
}

function AboutPage({ colors }: AboutPageProps) {
  const interests = ['Visualizing', 'Designing', 'Building', 'Hiking']

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

          {/* Right Side - Photo and Content (写真は横のテキスト高さいっぱい) */}
          <div className="flex-1 flex flex-col md:flex-row gap-6 md:gap-8 md:items-stretch">
            {/* Photo (白黒表示) - 大きめ・高さはテキストに合わせる */}
            <div className="flex-shrink-0 w-full max-w-sm md:max-w-none md:w-80 md:h-full overflow-hidden rounded-lg">
              <img
                src="/assets/about-photo.png"
                alt="Atena Hatta"
                width={400}
                height={500}
                loading="lazy"
                decoding="async"
                className="w-full h-full min-h-[280px] md:min-h-0 object-cover object-top grayscale"
              />
            </div>
            {/* Content */}
            <div className="flex-1 flex flex-col">
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
      <EducationSection colors={colors} embed />
    </section>
    <PassionSection colors={colors} />
  </>
  )
}

export default AboutPage
