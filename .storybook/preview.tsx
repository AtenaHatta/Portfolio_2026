import type { Preview } from '@storybook/react';
import { getColors } from '../src/config/colors';
import { PortfolioThemeProvider } from '../src/storybook/PortfolioThemeContext';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    layout: 'centered',
    backgrounds: { disable: true },
  },
  decorators: [
    (Story, context) => {
      const theme = (context.globals?.theme as 'light' | 'dark') ?? 'light';
      const colors = getColors(theme === 'dark');
      return (
        <PortfolioThemeProvider theme={theme}>
          <div
            style={{
              backgroundColor: colors.background.bg,
              color: colors.background.text,
              minHeight: '100vh',
              padding: '2rem',
            }}
          >
            <Story />
          </div>
        </PortfolioThemeProvider>
      );
    },
  ],
};

export default preview;
