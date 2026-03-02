import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function ConstraintTradeOffSection({ section, ctx }: Props) {
  const { colors } = ctx;
  const blocks = section.constraintTradeOffBlocks!;

  return (
    <div className="space-y-4">
      {blocks.map((block, i) => (
        <div
          key={i}
          className="p-6 rounded-lg space-y-4"
          style={{
            backgroundColor: colors.block?.bg ?? colors.chip?.bg,
            color: colors.background?.text,
          }}
        >
          <p className="font-medium text-lg" style={{ color: colors.background?.text }}>
            {block.heading}
          </p>
          <div className="space-y-3">
            {block.body.map((paragraph, j) => (
              <p
                key={j}
                className="font-light leading-relaxed opacity-90"
                style={{ color: colors.background?.text }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
