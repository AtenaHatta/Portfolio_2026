import { getColors } from '../config/colors'

interface HeroSectionProps {
  colors: ReturnType<typeof getColors>
}

function HeroSection({ colors }: HeroSectionProps) {
  const links = [
    { name: 'GitHub', url: 'https://github.com/AtenaHatta' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/atenahatta/' },
    { name: 'Mail', url: 'mailto:hattaatena@gmail.com' },
  ]

  return (
    <section className="min-h-screen flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 w-full">
        {/* Main Heading */}
        <h1 
          className="text-5xl md:text-6xl lg:text-7xl font-light mb-6"
          style={{ color: colors.background.text }}
        >
          Hi, I am Atena
        </h1>

        {/* Description Paragraphs */}
        <div className="mb-8 space-y-2">
          <p 
            className="text-lg md:text-xl font-light"
            style={{ color: colors.background.text }}
          >
            <span className="font-medium">Full stack developer</span> based in Vancouver BC, Canada.
          </p>
          <p 
            className="text-lg md:text-xl font-light"
            style={{ color: colors.background.text }}
          >
            Passionate about creating from scratch, bridging design and engineering.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target={link.url.startsWith('http') || link.url.startsWith('mailto') ? '_blank' : undefined}
              rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="group flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-80"
              style={{
                backgroundColor: colors.button.bg,
                color: colors.button.text,
              }}
            >
              <span className="font-medium">{link.name}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                />
              </svg>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default HeroSection
