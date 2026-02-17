import type { Meta, StoryObj } from '@storybook/react';
import { getColors } from '../../config/colors';
import { Chip, type ChipProps } from './Chip';

/** Story-only args (theme/label) — Meta accepts only one type arg, so we extend Args. */
type ChipStoryArgs = ChipProps & {
  theme?: 'light' | 'dark';
  label?: string;
};

const meta: Meta<ChipStoryArgs> = {
  title: 'Portfolio/Chip',
  component: Chip,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
      description: 'Theme for catalog',
    },
  },
  args: {
    theme: 'light',
  },
};

export default meta;

type Story = StoryObj<ChipStoryArgs>;

function ChipWithTheme({
  theme,
  children,
}: {
  theme: 'light' | 'dark';
  children: React.ReactNode;
}) {
  const colors = getColors(theme === 'dark');
  return <Chip colors={colors}>{children}</Chip>;
}

export const Default: Story = {
  args: {
    theme: 'light',
    label: 'React',
  },
  argTypes: {
    label: { control: 'text' },
  },
  render: (args) => (
    <ChipWithTheme theme={args.theme ?? 'light'}>{args.label ?? 'React'}</ChipWithTheme>
  ),
};

export const Multiple: Story = {
  args: {
    theme: 'light',
  },
  render: (args) => {
    const colors = getColors(args.theme === 'dark');
    return (
      <div className="flex flex-wrap gap-2">
        <Chip colors={colors}>TypeScript</Chip>
        <Chip colors={colors}>Node.js</Chip>
        <Chip colors={colors}>Tailwind CSS</Chip>
      </div>
    );
  },
};

export const Dark: Story = {
  args: { theme: 'dark' },
  render: (args) => <ChipWithTheme theme={args.theme ?? 'dark'}>Dark theme</ChipWithTheme>,
};
