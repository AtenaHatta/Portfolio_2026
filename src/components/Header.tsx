import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { getColors } from '../config/colors';

interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  colors: ReturnType<typeof getColors>;
}

function Header({ isDarkMode, toggleDarkMode, colors }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-colors duration-200"
      style={{
        backgroundColor: colors.background.bg,
        color: colors.background.text,
      }}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between min-h-[57px]">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-3xl sm:text-4xl font-serif transition-opacity hover:opacity-70"
            style={{ color: colors.background.text }}
            onClick={() => setMobileMenuOpen(false)}
          >
            A
          </Link>
        </div>

        {/* Navigation Links - Desktop */}
        <div className="hidden md:flex items-center space-x-8 flex-1 justify-center">
          <Link
            to="/"
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
          >
            About
          </Link>
          <Link
            to="/project"
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
          >
            Project
          </Link>
          <Link
            to="/articles"
            className="hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
          >
            Article
          </Link>
        </div>

        {/* Right Side: on mobile = Dark mode → Hamburger (rightmost) */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
            aria-label="Toggle dark mode"
          >
            {isDarkMode ? (
              // Sun icon (dark mode active)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <circle cx="12" cy="12" r="4" fill="currentColor" />
                <path
                  strokeLinecap="round"
                  d="M12 2v2m0 16v2M22 12h-2M4 12H2m15.364-5.636l-1.414 1.414M6.343 17.657l-1.414 1.414m12.728 0l-1.414-1.414M6.343 6.343l-1.414-1.414"
                />
              </svg>
            ) : (
              // Moon icon (light mode active)
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            )}
          </button>
          {/* Mobile Menu Button (rightmost on mobile) */}
          <button
            type="button"
            className="md:hidden p-2 rounded-lg hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
            aria-label="Open menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 top-[57px] z-40"
          style={{ backgroundColor: colors.background.bg }}
          aria-hidden="true"
        >
          <div className="flex flex-col px-6 py-8 space-y-6">
            <Link
              to="/"
              className="text-lg font-light hover:opacity-70 transition-opacity py-2"
              style={{ color: colors.background.text }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-lg font-light hover:opacity-70 transition-opacity py-2"
              style={{ color: colors.background.text }}
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
            <Link
              to="/project"
              className="text-lg font-light hover:opacity-70 transition-opacity py-2"
              style={{ color: colors.background.text }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Project
            </Link>
            <Link
              to="/articles"
              className="text-lg font-light hover:opacity-70 transition-opacity py-2"
              style={{ color: colors.background.text }}
              onClick={() => setMobileMenuOpen(false)}
            >
              Article
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
