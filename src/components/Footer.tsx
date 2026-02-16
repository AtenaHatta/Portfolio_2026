import { Link } from 'react-router-dom'
import { getColors } from '../config/colors'

interface FooterProps {
  colors: ReturnType<typeof getColors>
}

const GITHUB_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
  </svg>
)
const LINKEDIN_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)
const DEVTO_ICON = (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 512 512" aria-hidden>
    <rect width="512" height="512" rx="15%" fill="none" />
    <path fill="currentColor" d="M140.47 203.94h-17.44v104.47h17.45c10.155-.545 17.358-8.669 17.47-17.41v-69.65c-.696-10.364-7.796-17.272-17.48-17.41zm45.73 87.25c0 18.81-11.61 47.31-48.36 47.25h-46.4V172.98h47.38c35.44 0 47.36 28.46 47.37 47.28zm100.68-88.66H233.6v38.42h32.57v29.57H233.6v38.41h53.29v29.57h-62.18c-11.16.29-20.44-8.53-20.72-19.69V193.7c-.27-11.15 8.56-20.41 19.71-20.69h63.19zm103.64 115.29c-13.2 30.75-36.85 24.63-47.44 0l-38.53-144.8h32.57l29.71 113.72 29.57-113.72h32.58z" />
  </svg>
)

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Project', to: '/project' },
  { label: 'Article', to: '/articles' },
] as const

const socialLinks = [
  { href: 'https://www.linkedin.com/in/atenahatta/', icon: LINKEDIN_ICON, label: 'LinkedIn' },
  { href: 'https://github.com/AtenaHatta', icon: GITHUB_ICON, label: 'GitHub' },
  { href: 'https://dev.to/atena', icon: DEVTO_ICON, label: 'Dev.to' },
] as const

function getVancouverYear(): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Vancouver',
    year: 'numeric',
  }).format(new Date())
}

function Footer({ colors }: FooterProps) {
  const isDark = colors.background.bg === '#000000'
  const footerBg = isDark ? '#151515' : '#E8E8E8'
  return (
    <footer
      className="transition-colors duration-200 min-h-[72px]"
      style={{
        backgroundColor: footerBg,
        color: colors.background.text,
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left: Copyright */}
        <div className="flex items-center justify-center sm:justify-start">
          <span className="text-sm font-light" style={{ color: colors.background.text }}>
            Copyright © {getVancouverYear()}
          </span>
        </div>

        {/* Right: Nav links + Social icons (min-h to avoid wrap-induced CLS) */}
        <div className="flex flex-wrap items-center justify-center sm:justify-end gap-6 min-h-[2rem]">
          <nav className="flex items-center gap-6">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className="text-sm font-light hover:opacity-70 transition-opacity"
                style={{ color: colors.background.text }}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:opacity-70 transition-opacity"
                style={{ color: colors.background.text }}
                aria-label={label}
              >
                {icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
