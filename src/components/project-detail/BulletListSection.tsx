import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';

interface Props {
  section: SectionContent;
  ctx: SectionRenderContext;
}

export default function BulletListSection({ section }: Props) {
  const body = section.body ?? [];

  return (
    <ul className="space-y-2 list-none pl-0">
      {body.map((paragraph, i) => (
        <li key={i} className="font-light leading-relaxed opacity-80 flex gap-2">
          <span aria-hidden>・</span>
          <span>{paragraph}</span>
        </li>
      ))}
    </ul>
  );
}
