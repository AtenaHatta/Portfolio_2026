import type { getColors } from '../../config/colors';
import { Chip } from './Chip';

export type ProjectCardSize = 'sm' | 'md';

export interface ProjectCardProps {
  colors: ReturnType<typeof getColors>;
  type: string;
  title: string;
  technologies: string[];
  /** Optional image URL or element (e.g. <AssetImage /> or <img />) */
  image?: React.ReactNode;
  size?: ProjectCardSize;
  className?: string;
}

const sizeClasses = {
  sm: 'sm:w-48 h-40 sm:h-32',
  md: 'sm:w-64 h-52 sm:h-44',
};

/** Card layout used for projects (and similar to articles). Wrap in Link or <a> for navigation. */
export function ProjectCard({
  colors,
  type,
  title,
  technologies,
  image,
  size = 'md',
  className = '',
}: ProjectCardProps) {
  const imageContainerClass = `flex-shrink-0 w-full rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 aspect-video sm:aspect-auto ${sizeClasses[size]}`;
  return (
    <div
      className={`flex flex-col sm:flex-row gap-4 sm:gap-6 group hover:opacity-80 transition-opacity ${className}`.trim()}
    >
      <div className={imageContainerClass}>
        {image ?? <div className="w-full h-full" style={{ backgroundColor: colors.chip.bg }} />}
      </div>
      <div className="flex-1">
        <p className="text-sm font-light mb-2" style={{ color: colors.secondary.text }}>
          {type}
        </p>
        <h3 className="text-xl font-light mb-3" style={{ color: colors.background.text }}>
          {title}
        </h3>
        <div className="flex flex-wrap gap-2">
          {technologies.map((tech, i) => (
            <Chip key={i} colors={colors}>
              {tech}
            </Chip>
          ))}
        </div>
      </div>
    </div>
  );
}
