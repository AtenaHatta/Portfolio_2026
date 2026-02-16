// Color System Configuration
export const colors = {
  light: {
    background: {
      text: '#000000', // black
      bg: '#FAFAFA', // very light gray/off-white
    },
    primary: {
      text: '#000000', // black/very dark gray
    },
    secondary: {
      text: '#6B7280', // medium gray
    },
    disabled: {
      text: '#9CA3AF', // lighter medium gray
    },
    button: {
      text: '#FAFAFA', // very light gray/off-white
      bg: '#000000', // black
    },
    chip: {
      text: '#374151', // dark gray for contrast on light bg
      bg: '#E5E7EB', // light gray so tags have visible background
    },
    block: {
      bg: '#E5E7EB', // darker gray for Tech stack / Process blocks
    },
    challengeSolutionLabel: {
      bg: '#E5E7EB', // gray for Challenge/Solution in light mode
    },
    highlight: {
      bg: 'rgba(251, 191, 36, 0.35)', // amber highlight in light mode
    },
  },
  dark: {
    background: {
      text: '#FAFAFA', // very light gray/off-white
      bg: '#000000', // black
    },
    primary: {
      text: '#1F2937', // dark gray
    },
    secondary: {
      text: '#D1D5DB', // gray-300: WCAG AA compliant on #000000 (4.5:1+)
    },
    disabled: {
      text: '#9CA3AF', // lighter medium gray
    },
    button: {
      text: '#FAFAFA', // very light gray/off-white
      bg: '#1F2937', // dark gray
    },
    chip: {
      text: '#FAFAFA', // very light gray/off-white
      bg: '#1F2937', // dark gray
    },
    block: {
      bg: '#111827', // darker gray for Tech stack / Process blocks
    },
    challengeSolutionLabel: {
      bg: '#0a0a0a', // black for Challenge/Solution in dark mode
    },
    highlight: {
      bg: 'rgba(251, 191, 36, 0.25)', // amber highlight in dark mode
    },
  },
} as const

// Helper function to get colors based on mode
export const getColors = (isDarkMode: boolean) => {
  return isDarkMode ? colors.dark : colors.light
}
