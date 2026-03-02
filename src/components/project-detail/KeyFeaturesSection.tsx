import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function KeyFeaturesSection({ section, ctx }: Props) {
  const { colors } = ctx;
  const body = section.body ?? [];
  const keyFeatures = section.keyFeatures!;

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {body.map((paragraph, i) => (
          <p key={i} className="font-light leading-relaxed opacity-80">
            {paragraph}
          </p>
        ))}
      </div>
      <div className="space-y-3">
        <h3 className="text-lg font-light" style={{ color: colors.background?.text }}>
          Key Features:
        </h3>
        <ul className="space-y-3 list-none pl-0">
          {keyFeatures.map((feat, i) => (
            <li key={i} className="font-light">
              <span className="font-medium" style={{ color: colors.background?.text }}>
                {feat.title}:
              </span>
              <span className="opacity-80 ml-1" style={{ color: colors.background?.text }}>
                {feat.description}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
