import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import AssetImage from '../AssetImage';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function DefaultBodySection({ section, ctx }: Props) {
  const { onImageClick, getImageStyle, onImageLoad } = ctx;
  const body = section.body ?? [];

  return (
    <div className="space-y-4">
      {body.map((paragraph, i) => (
        <div key={i} className="space-y-4">
          <p className="font-light leading-relaxed opacity-80">{paragraph}</p>
          {section.imageAfterIndex === i && section.imageAfterIndexSrc && (
            <div className="my-6">
              <button
                type="button"
                onClick={() => onImageClick(section.imageAfterIndexSrc!)}
                className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
              >
                <AssetImage
                  src={section.imageAfterIndexSrc}
                  alt="Section image"
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg hover:opacity-90 transition-opacity"
                  style={getImageStyle(section.imageAfterIndexSrc)}
                  onLoad={onImageLoad}
                />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
