import type { getColors } from '../../config/colors';

export interface ChipProps {
  children: React.ReactNode;
  colors: ReturnType<typeof getColors>;
  className?: string;
}

/** Tag/chip used for technologies and labels. Matches ProjectsSection and ArticleList. */
export function Chip({ children, colors, className = '' }: ChipProps) {
  return (
    <span
      className={`px-3 py-1 rounded-[2px] text-sm font-light ${className}`.trim()}
      style={{
        backgroundColor: colors.chip.bg,
        color: colors.chip.text,
      }}
    >
      {children}
    </span>
  );
}
