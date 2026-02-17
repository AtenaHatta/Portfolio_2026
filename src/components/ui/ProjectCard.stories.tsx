import type { Meta, StoryObj } from '@storybook/react';
import { getColors } from '../../config/colors';
import { ProjectCard, type ProjectCardProps } from './ProjectCard';

/** Story args: component props + theme (Meta accepts only one type arg). */
type ProjectCardStoryArgs = ProjectCardProps & { theme?: 'light' | 'dark' };

const meta: Meta<ProjectCardStoryArgs> = {
  title: 'Portfolio/ProjectCard',
  component: ProjectCard,
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: 'radio',
      options: ['light', 'dark'],
    },
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
  },
  args: {
    theme: 'light',
    size: 'md',
  },
};

export default meta;

type Story = StoryObj<ProjectCardStoryArgs>;

export const Default: Story = {
  args: {
    theme: 'light',
    type: 'Full-stack',
    title: 'E-Certificate Issuance Platform',
    technologies: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    size: 'md',
  },
  render: (args) => {
    const colors = getColors(args.theme === 'dark');
    return (
      <div className="max-w-2xl">
        <ProjectCard
          colors={colors}
          type={args.type}
          title={args.title}
          technologies={args.technologies}
          size={args.size}
        />
      </div>
    );
  },
};

export const WithPlaceholderImage: Story = {
  args: {
    theme: 'light',
    type: 'CMS',
    title: 'College CMS',
    technologies: ['Next.js', 'Prisma', 'Tailwind'],
    size: 'md',
  },
  render: (args) => {
    const colors = getColors(args.theme === 'dark');
    return (
      <div className="max-w-2xl">
        <ProjectCard
          colors={colors}
          type={args.type}
          title={args.title}
          technologies={args.technologies}
          size={args.size}
          image={
            <div
              className="w-full h-full flex items-center justify-center text-4xl"
              style={{ color: colors.secondary.text }}
            >
              📄
            </div>
          }
        />
      </div>
    );
  },
};

export const SmallSize: Story = {
  args: {
    theme: 'light',
    type: 'Tool',
    title: 'CLI Tool',
    technologies: ['Rust'],
    size: 'sm',
  },
  render: (args) => {
    const colors = getColors(args.theme === 'dark');
    return (
      <div className="max-w-xl">
        <ProjectCard
          colors={colors}
          type={args.type}
          title={args.title}
          technologies={args.technologies}
          size="sm"
        />
      </div>
    );
  },
};

export const Dark: Story = {
  args: {
    theme: 'dark',
    type: 'Full-stack',
    title: 'E-Certificate Issuance Platform',
    technologies: ['React', 'Node.js', 'TypeScript'],
    size: 'md',
  },
  render: (args) => {
    const colors = getColors(args.theme === 'dark');
    return (
      <div className="max-w-2xl">
        <ProjectCard
          colors={colors}
          type={args.type}
          title={args.title}
          technologies={args.technologies}
          size={args.size}
        />
      </div>
    );
  },
};
