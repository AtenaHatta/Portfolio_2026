import { Link } from 'react-router-dom';
import type { getColors } from '../config/colors';

interface HeroSectionProps {
  colors: ReturnType<typeof getColors>;
}

const GITHUB_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path
      fillRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      clipRule="evenodd"
    />
  </svg>
);
const LINKEDIN_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const ARTICLE_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);
const MAIL_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden
  >
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const LINK_ICONS: Record<string, JSX.Element> = {
  GitHub: GITHUB_ICON,
  LinkedIn: LINKEDIN_ICON,
  Articles: ARTICLE_ICON,
  Mail: MAIL_ICON,
};

function HeroSection({ colors }: HeroSectionProps) {
  const links: { name: string; url: string; internal?: boolean }[] = [
    { name: 'GitHub', url: 'https://github.com/AtenaHatta' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/atenahatta/' },
    { name: 'Articles', url: '/articles', internal: true },
    { name: 'Mail', url: 'mailto:hattaatena@gmail.com' },
  ];

  const isDark = colors.background.bg === '#000000';
  const gradientFrom = isDark ? 'rgba(30, 41, 59, 0.5)' : 'rgba(241, 245, 249, 0.6)';
  const gradientTo = isDark ? 'rgba(15, 23, 42, 0.4)' : 'rgba(226, 232, 240, 0.5)';

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle animated background */}
      <div
        className="absolute inset-0 hero-bg-animate pointer-events-none"
        aria-hidden
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${gradientFrom} 0%, transparent 50%),
            radial-gradient(ellipse 60% 80% at 80% 80%, ${gradientTo} 0%, transparent 45%)`,
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24 w-full">
        {/* Main Heading */}
        <h1
          className="text-5xl md:text-6xl lg:text-7xl font-light mb-6"
          style={{ color: colors.background.text }}
        >
          Hi, I am Atena
        </h1>

        {/* Description Paragraphs */}
        <div className="mb-8 space-y-2">
          <p className="text-lg md:text-xl font-light" style={{ color: colors.background.text }}>
            <span className="font-medium">Full stack Developer</span> Vancouver, BC
          </p>
          <p className="text-lg md:text-xl font-light" style={{ color: colors.background.text }}>
            I design and build web experiences.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          {links.map((link) => {
            const buttonClass =
              'group flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-80';
            const buttonStyle = {
              backgroundColor: colors.button.bg,
              color: colors.button.text,
            };
            const icon = LINK_ICONS[link.name];
            const arrow = (
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
            );
            if (link.internal) {
              return (
                <Link key={link.name} to={link.url} className={buttonClass} style={buttonStyle}>
                  {icon}
                  <span className="font-medium">{link.name}</span>
                  {arrow}
                </Link>
              );
            }
            return (
              <a
                key={link.name}
                href={link.url}
                target={
                  link.url.startsWith('http') || link.url.startsWith('mailto')
                    ? '_blank'
                    : undefined
                }
                rel={link.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={buttonClass}
                style={buttonStyle}
              >
                {icon}
                <span className="font-medium">{link.name}</span>
                {arrow}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
