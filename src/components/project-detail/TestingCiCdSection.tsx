import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import AssetImage from '../AssetImage';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function TestingCiCdSection({ section, ctx }: Props) {
  const { colors, onImageClick, getImageStyle, onImageLoad } = ctx;
  const block = section.testingCiCdBlock!;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-light" style={{ color: colors.background?.text }}>
        {block.title}
      </h3>
      <ul className="space-y-3 list-none pl-0">
        {block.body.map((paragraph, j) => (
          <li
            key={j}
            className="font-light leading-relaxed flex gap-2"
            style={{ color: colors.background?.text }}
          >
            <span aria-hidden>・</span>
            <span>{paragraph}</span>
          </li>
        ))}
      </ul>
      {block.image && (
        <button
          type="button"
          onClick={() => onImageClick(block.image!)}
          className="block w-full text-left rounded-lg overflow-hidden max-w-3xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
        >
          <AssetImage
            src={block.image}
            alt=""
            width={800}
            height={450}
            loading="lazy"
            decoding="async"
            className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
            style={getImageStyle(block.image)}
            onLoad={onImageLoad}
          />
        </button>
      )}
    </div>
  );
}
