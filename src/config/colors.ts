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
      text: '#6B7280', // medium gray
      bg: '#FAFAFA', // very light gray/off-white
    },
    block: {
      bg: '#F3F4F6', // light gray for Tech stack / Process blocks
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
      text: '#6B7280', // medium gray
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
      bg: '#1F2937', // dark gray (same as chip for blocks)
    },
  },
} as const

// Helper function to get colors based on mode
export const getColors = (isDarkMode: boolean) => {
  return isDarkMode ? colors.dark : colors.light
}
