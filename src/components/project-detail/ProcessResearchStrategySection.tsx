import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import AssetImage from '../AssetImage';

interface Props {
  section: SectionContent;
  slug: string;
  ctx: SectionRenderContext;
}

export default function ProcessResearchStrategySection({ section, ctx }: Props) {
  const { colors, onImageClick, getImageStyle, onImageLoad, renderParagraphWithHighlights } = ctx;
  const researchStrategy = section.researchStrategy!;
  const timelineSteps = section.timelineSteps;
  const { phaseTitle, findings, strategyTitle, strategyItems } = researchStrategy;
  const sectionBg = colors.block?.bg ?? colors.chip?.bg ?? '';
  const cardBg = '#807C7C';
  const imageHeight = 'h-52';

  return (
    <div className="space-y-8">
      {timelineSteps != null && timelineSteps.length > 0 && (
        <>
          {section.imageTitle && (
            <p className="text-lg font-light" style={{ color: colors.background?.text }}>
              {section.imageTitle}
            </p>
          )}
          <div
            className="relative flex flex-col sm:flex-row sm:items-stretch gap-6 sm:gap-4 overflow-x-auto pb-4"
            aria-label="Project lifecycle timeline"
          >
            <div
              className="hidden sm:block absolute h-px"
              style={{
                top: '6px',
                left: `${100 / (2 * timelineSteps.length)}%`,
                right: `${100 / (2 * timelineSteps.length)}%`,
                backgroundColor: colors.background?.text,
                opacity: 0.4,
              }}
              aria-hidden
            />
            {timelineSteps.map((step, i) => (
              <div key={i} className="relative flex flex-col items-center flex-1 min-w-[120px]">
                <div
                  className="relative z-10 w-3 h-3 rounded-full flex-shrink-0 mb-3 border-2 border-transparent"
                  style={{
                    backgroundColor: colors.background?.text,
                    opacity: 0.9,
                  }}
                  aria-hidden
                />
                <div
                  className="w-full rounded px-3 py-2 mb-2 text-center text-sm font-medium"
                  style={{
                    backgroundColor: colors.chip?.bg ?? colors.block?.bg ?? '#374151',
                    color: colors.background?.text,
                  }}
                >
                  {step.title}
                </div>
                <div className="space-y-0.5 text-center">
                  {step.items.map((item, j) => (
                    <p
                      key={j}
                      className="text-xs font-light leading-snug text-left"
                      style={{
                        color: colors.background?.text,
                        opacity: 0.9,
                      }}
                    >
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {section.body && section.body.length > 0 && (
            <div className="pt-4 space-y-3">
              {section.body.map((paragraph, i) => (
                <p
                  key={i}
                  className="font-light leading-relaxed opacity-90"
                  style={{ color: colors.background?.text }}
                >
                  {renderParagraphWithHighlights(paragraph)}
                </p>
              ))}
            </div>
          )}
        </>
      )}
      <div
        className="rounded-lg p-6 md:p-8 space-y-6"
        style={{
          backgroundColor: sectionBg,
          color: colors.background?.text,
        }}
      >
        <h3 className="text-lg font-light" style={{ color: colors.background?.text }}>
          {phaseTitle}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {findings.map((f, i) => (
            <div
              key={i}
              className="rounded-sm text-center flex flex-col overflow-hidden justify-between"
              style={{ backgroundColor: cardBg, color: '#000' }}
            >
              <div className="pt-6 pb-2 px-4 space-y-1 flex-shrink-0">
                <p className="text-sm font-medium opacity-90" style={{ color: '#000' }}>
                  {f.title}
                </p>
                <p className="text-lg font-bold py-2" style={{ color: '#000' }}>
                  {f.metric}
                </p>
                <p
                  className="text-xs font-light leading-relaxed opacity-90"
                  style={{ color: '#000' }}
                >
                  {f.description}
                </p>
              </div>
              <button
                type="button"
                onClick={() => onImageClick(f.image)}
                className="w-full overflow-hidden flex-shrink-0 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
              >
                <div className={`w-full ${imageHeight} min-h-0`}>
                  <AssetImage
                    src={f.image}
                    alt=""
                    width={400}
                    height={160}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover object-center hover:opacity-90 transition-opacity"
                    style={getImageStyle(f.image)}
                    onLoad={onImageLoad}
                  />
                </div>
              </button>
            </div>
          ))}
        </div>
        <div className="flex justify-center py-2" aria-hidden>
          <AssetImage
            src="/assets/portfolio-arrow-down.webp"
            alt=""
            width={150}
            height={150}
            loading="lazy"
            decoding="async"
            className="object-contain"
            style={{ opacity: 0.9 }}
            onLoad={onImageLoad}
          />
        </div>
        <div
          className="p-6 rounded-xs flex justify-between md:flex-row md:gap-6"
          style={{ backgroundColor: cardBg, color: '#fff' }}
        >
          <div className="flex-1 space-y-3">
            <p
              className="text-sm font-semibold uppercase tracking-wide opacity-90"
              style={{ color: '#000' }}
            >
              {strategyTitle}
            </p>
            <ol className="space-y-2 list-decimal list-inside font-light text-sm">
              {strategyItems.map((item, j) => (
                <li key={j} className="leading-relaxed" style={{ color: '#000' }}>
                  {item}
                </li>
              ))}
            </ol>
          </div>
          <button
            type="button"
            onClick={() => onImageClick('/assets/portfolio-research-result.webp')}
            className="cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
          >
            <AssetImage
              src="/assets/portfolio-research-result.webp"
              alt=""
              width={150}
              height={150}
              loading="lazy"
              decoding="async"
              className="object-contain hover:opacity-90 transition-opacity"
              style={{ opacity: 0.9 }}
              onLoad={onImageLoad}
            />
          </button>
        </div>
      </div>
      {section.phase2Mockup &&
        (() => {
          const p2 = section.phase2Mockup;
          return (
            <>
              <h3 className="text-lg font-light mt-8" style={{ color: colors.background?.text }}>
                {p2.title}
              </h3>
              <p className="font-light leading-relaxed" style={{ color: colors.background?.text }}>
                {p2.body}
              </p>
              <button
                type="button"
                onClick={() => onImageClick(p2.image)}
                className="block w-full text-left rounded-lg overflow-hidden max-w-3xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                <AssetImage
                  src={p2.image}
                  alt=""
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
                  style={getImageStyle(p2.image)}
                  onLoad={onImageLoad}
                />
              </button>
              <p className="text-sm font-medium" style={{ color: colors.background?.text }}>
                {p2.subtitle}
              </p>
              <button
                type="button"
                onClick={() => onImageClick(p2.image2)}
                className="block w-full text-left rounded-lg overflow-hidden max-w-3xl cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white"
              >
                <AssetImage
                  src={p2.image2}
                  alt=""
                  width={800}
                  height={450}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain hover:opacity-90 transition-opacity"
                  style={getImageStyle(p2.image2)}
                  onLoad={onImageLoad}
                />
              </button>
            </>
          );
        })()}
      {section.phase3TechStack &&
        (() => {
          const p3 = section.phase3TechStack!;
          return (
            <div className="mt-8 space-y-3">
              <h3 className="text-lg font-light" style={{ color: colors.background?.text }}>
                {p3.title}
              </h3>
              <div className="space-y-3">
                <ul className="space-y-2 list-none pl-0">
                  {p3.items.map((item, j) => (
                    <li
                      key={j}
                      className="font-light flex items-center gap-2"
                      style={{ color: colors.background?.text }}
                    >
                      <span aria-hidden>・</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })()}
    </div>
  );
}
