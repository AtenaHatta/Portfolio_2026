import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function TechStackOnlySection({ section, ctx }: Props) {
  const { colors } = ctx;
  const techStackSections = section.techStackSections!;
  const body = section.body ?? [];

  return (
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
              {sec.items.map((item, j) => {
                const colonIndex = item.indexOf(': ');
                const keyPart = colonIndex >= 0 ? item.slice(0, colonIndex + 2) : '';
                const valuePart = colonIndex >= 0 ? item.slice(colonIndex + 2) : item;
                return (
                  <li key={j} className="font-light leading-relaxed text-sm">
                    {keyPart ? (
                      <>
                        <span className="opacity-80" style={{ color: colors.background?.text }}>
                          {keyPart}
                        </span>
                        <span style={{ color: colors.background?.text }}>{valuePart}</span>
                      </>
                    ) : (
                      <span className="opacity-80" style={{ color: colors.background?.text }}>
                        {item}
                      </span>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
      {body.length > 0 && (
        <div className="space-y-4">
          {body.map((paragraph, i) => (
            <p
              key={i}
              className="font-light leading-relaxed opacity-80"
              style={{ color: colors.background?.text }}
            >
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
