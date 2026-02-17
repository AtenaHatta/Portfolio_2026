import { useEffect, useState } from 'react';
import { getColors } from '../config/colors';

export const useTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    // Apply theme classes to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('bg-black', 'text-white');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('bg-black', 'text-white');
      document.body.classList.add('bg-gray-100', 'text-black');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const colors = getColors(isDarkMode);

  return {
    isDarkMode,
    toggleTheme,
    colors,
  };
};
