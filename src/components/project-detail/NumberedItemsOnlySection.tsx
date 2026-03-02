import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function NumberedItemsOnlySection({ section, ctx }: Props) {
  const { colors } = ctx;
  const numberedItems = section.numberedItems!;

  return (
    <ol className="space-y-6 list-none pl-0">
      {numberedItems.map((item, i) => (
        <li key={i} className="font-light">
          <span className="font-medium" style={{ color: colors.background?.text }}>
            {i + 1}. {item.title}
          </span>
          <p className="mt-1 leading-relaxed opacity-80" style={{ color: colors.background?.text }}>
            {item.description}
          </p>
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
      ))}
    </ol>
  );
}
