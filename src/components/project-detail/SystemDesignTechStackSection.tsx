import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  slug: string;
  ctx: SectionRenderContext;
}

function formatTechItem(item: string, colors: SectionRenderContext['colors']) {
  const colonIndex = item.indexOf(': ');
  const keyPart = colonIndex >= 0 ? item.slice(0, colonIndex + 2) : '';
  const valuePart = colonIndex >= 0 ? item.slice(colonIndex + 2) : item;
  if (keyPart) {
    return (
      <>
        <span className="opacity-80" style={{ color: colors.background?.text }}>
          {keyPart}
        </span>
        <span style={{ color: colors.background?.text }}>{valuePart}</span>
      </>
    );
  }
  return (
    <span className="opacity-80" style={{ color: colors.background?.text }}>
      {item}
    </span>
  );
}

export default function SystemDesignTechStackSection({ section, slug, ctx }: Props) {
  const { colors } = ctx;
  const techStackSections = section.techStackSections!;
  const numberedItems = section.numberedItems!;

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <div
          className="p-6 rounded-lg space-y-5"
          style={{
            backgroundColor: colors.block?.bg ?? colors.chip?.bg,
            color: colors.chip?.text,
          }}
        >
          {section.heading && (
            <h3 className="text-lg font-light" style={{ color: colors.background?.text }}>
              {section.heading}
            </h3>
          )}
          {techStackSections.map((sec, i) => (
            <div key={i} className="space-y-2">
              <p
                className="font-medium flex items-start gap-2"
                style={{ color: colors.background?.text }}
              >
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current opacity-80"
                  aria-hidden
                />
                {sec.title}
              </p>
              <ul className="ml-5 space-y-1 list-none">
                {sec.items.map((item, j) => (
                  <li key={j} className="font-light leading-relaxed text-sm">
                    {formatTechItem(item, colors)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      <div
        className="p-6 rounded-lg space-y-6"
        style={{
          backgroundColor: colors.block?.bg ?? colors.chip?.bg,
          color: colors.chip?.text,
        }}
      >
        <ol className="space-y-6 list-none pl-0">
          {numberedItems.map((item, i) => {
            const num = slug === 'system-design' ? i + 2 : i + 1;
            return (
              <li key={i} className="font-light">
                <span className="font-medium" style={{ color: colors.background?.text }}>
                  {num}. {item.title}
                </span>
                {item.description && (
                  <p
                    className="mt-1 leading-relaxed opacity-80"
                    style={{ color: colors.background?.text }}
                  >
                    {item.description}
                  </p>
                )}
                {item.subPoints && item.subPoints.length > 0 && (
                  <ul className="mt-2 ml-4 space-y-1 list-disc">
                    {item.subPoints.map((point, j) => (
                      <li
                        key={j}
                        className="leading-relaxed opacity-80"
                        style={{ color: colors.background?.text }}
                      >
                        {point}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            );
          })}
        </ol>
      </div>
      {section.techStackBody != null && section.techStackBody.length > 0 && (
        <div className="space-y-4">
          {section.techStackBody.map((paragraph, i) =>
            i === 0 && paragraph === 'Why Vue3?:' ? (
              <h3 key={i} className="text-lg font-light" style={{ color: colors.background?.text }}>
                {paragraph}
              </h3>
            ) : (
              <p
                key={i}
                className="font-light leading-relaxed opacity-80"
                style={{ color: colors.background?.text }}
              >
                {paragraph}
              </p>
            )
          )}
        </div>
      )}
    </div>
  );
}
