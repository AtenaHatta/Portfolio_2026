import type { getColors } from '../../config/colors';

const ARROW_ICON = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2.5}
    aria-hidden
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
  </svg>
);

const baseClass =
  'group flex items-center gap-2 px-6 py-3 rounded-lg transition-all hover:opacity-80 font-medium';

interface ButtonBaseProps {
  children: React.ReactNode;
  colors: ReturnType<typeof getColors>;
  icon?: React.ReactNode;
  showArrow?: boolean;
  className?: string;
}

interface ButtonAsButton extends ButtonBaseProps {
  as: 'button';
  onClick: () => void;
  type?: 'button' | 'submit';
}

interface ButtonAsLink extends ButtonBaseProps {
  as: 'a';
  href: string;
  external?: boolean;
}

interface ButtonAsSpan extends ButtonBaseProps {
  as: 'span';
}

export type ButtonProps = ButtonAsButton | ButtonAsLink | ButtonAsSpan;

/** Primary CTA button. Matches HeroSection action buttons. */
export function Button(props: ButtonProps) {
  const { children, colors, icon, showArrow = true, className = '' } = props;
  const style = {
    backgroundColor: colors.button.bg,
    color: colors.button.text,
  };

  const content = (
    <>
      {icon}
      <span>{children}</span>
      {showArrow && ARROW_ICON}
    </>
  );

  if (props.as === 'button') {
    const { onClick, type = 'button' } = props;
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseClass} ${className}`.trim()}
        style={style}
      >
        {content}
      </button>
    );
  }

  if (props.as === 'a') {
    const { href, external } = props;
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={`${baseClass} ${className}`.trim()}
        style={style}
      >
        {content}
      </a>
    );
  }

  return (
    <span className={`${baseClass} ${className}`.trim()} style={style}>
      {content}
    </span>
  );
}
