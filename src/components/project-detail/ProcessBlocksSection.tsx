import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import AssetImage from '../AssetImage';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function ProcessBlocksSection({ section, ctx }: Props) {
  const { colors, onImageClick, getImageStyle, onImageLoad, renderParagraphWithHighlights } = ctx;
  const processBlocks = section.processBlocks!;
  const challengeBg =
    (colors as { challengeSolutionLabel?: { bg: string } }).challengeSolutionLabel?.bg ??
    colors.block?.bg ??
    colors.chip?.bg;

  return (
    <div className="space-y-4">
      {processBlocks.map((block, i) => (
        <div
          key={i}
          className="p-6 rounded-lg space-y-5"
          style={{
            backgroundColor: colors.block?.bg ?? colors.chip?.bg,
            color: colors.background?.text,
          }}
        >
          <p className="font-medium text-lg" style={{ color: colors.background?.text }}>
            {block.title}
          </p>
          {block.subsections ? (
            <div className="space-y-5">
              {block.subsections.map((sub, j) => {
                const isChallengeOrSolution =
                  sub.heading?.startsWith('Challenge:') === true ||
                  sub.heading?.startsWith('Solution:') === true;
                return (
                  <div key={j} className="space-y-3">
                    <p
                      className={`font-medium ${isChallengeOrSolution ? 'inline-block rounded px-3 py-1.5' : ''}`}
                      style={
                        isChallengeOrSolution
                          ? { backgroundColor: challengeBg, color: colors.background?.text }
                          : { color: colors.background?.text }
                      }
                    >
                      {sub.heading}
                    </p>
                    {sub.items ? (
                      <div className="space-y-4">
                        {sub.items.map((item, k) => (
                          <div key={k} className="space-y-2">
                            <p className="font-medium" style={{ color: colors.background?.text }}>
                              {item.title}
                            </p>
                            <p
                              className="font-light leading-relaxed opacity-80"
                              style={{ color: colors.background?.text }}
                            >
                              {item.body}
                            </p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      sub.body?.map((paragraph, k) => (
                        <p
                          key={k}
                          className="font-light leading-relaxed opacity-80"
                          style={{ color: colors.background?.text }}
                        >
                          {renderParagraphWithHighlights(paragraph)}
                        </p>
                      ))
                    )}
                    {sub.imageSrc && (
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => onImageClick(sub.imageSrc!)}
                          className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
                        >
                          <AssetImage
                            src={sub.imageSrc}
                            alt={sub.heading || 'Section diagram'}
                            width={800}
                            height={450}
                            loading="lazy"
                            decoding="async"
                            className="rounded-lg hover:opacity-90 transition-opacity max-w-full"
                            style={getImageStyle(sub.imageSrc)}
                            onLoad={onImageLoad}
                          />
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            block.body?.map((paragraph, j) => (
              <p
                key={j}
                className="font-light leading-relaxed opacity-80"
                style={{ color: colors.background?.text }}
              >
                {paragraph}
              </p>
            ))
          )}
          {block.imageSrc && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onImageClick(block.imageSrc!)}
                className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
              >
                <AssetImage
                  src={block.imageSrc}
                  alt={block.title || 'Process step image'}
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="rounded-lg hover:opacity-90 transition-opacity"
                  style={getImageStyle(block.imageSrc)}
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
