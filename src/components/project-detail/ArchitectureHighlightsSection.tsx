import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import AssetImage from '../AssetImage';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function ArchitectureHighlightsSection({ section, ctx }: Props) {
  const { colors, onImageClick, getImageStyle, onImageLoad } = ctx;
  const ah = section.architectureHighlights!;

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() => onImageClick(ah.image)}
        className="block w-full text-left rounded-lg overflow-hidden max-w-3xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
      >
        <AssetImage
          src={ah.image}
          alt=""
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
          style={getImageStyle(ah.image)}
          onLoad={onImageLoad}
        />
      </button>
      <p className="text-sm font-semibold" style={{ color: colors.background?.text }}>
        {ah.title}
      </p>
      <ul className="space-y-2 list-none pl-0">
        {ah.items.map((item, j) => (
          <li
            key={j}
            className="font-light leading-relaxed flex gap-2"
            style={{ color: colors.background?.text }}
          >
            <span aria-hidden>・</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
