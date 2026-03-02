import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function TimelineOnlySection({ section, ctx }: Props) {
  const { colors, renderParagraphWithHighlights } = ctx;
  const timelineSteps = section.timelineSteps!;
  const timelineTitle = section.imageTitle;

  return (
    <div className="space-y-8">
      {timelineTitle && (
        <p className="text-lg font-light" style={{ color: colors.background?.text }}>
          {timelineTitle}
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
              style={{ backgroundColor: colors.background?.text, opacity: 0.9 }}
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
                  className="text-sm font-light leading-snug"
                  style={{ color: colors.background?.text, opacity: 0.9 }}
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
    </div>
  );
}
