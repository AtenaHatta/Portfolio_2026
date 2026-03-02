import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function HighlightBodySection({ section, ctx }: Props) {
  const { colors } = ctx;
  const body = section.body ?? [];
  const endIndex = section.highlightBlockEndIndex!;
  const highlightBody = body.slice(0, endIndex);
  const restBody = body.slice(endIndex);

  return (
    <div className="space-y-4">
      <div
        className="p-6 rounded-lg space-y-4"
        style={{
          backgroundColor: colors.chip?.bg,
          color: colors.chip?.text,
        }}
      >
        {highlightBody.map((paragraph, i) => (
          <p key={i} className="font-light leading-relaxed opacity-80">
            {paragraph}
          </p>
        ))}
      </div>
      {restBody.map((paragraph, i) => (
        <p key={i} className="font-light leading-relaxed opacity-80">
          {paragraph}
        </p>
      ))}
    </div>
  );
}
