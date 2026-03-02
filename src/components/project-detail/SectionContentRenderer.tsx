import type { SectionContent, SectionRenderContext } from '../../types/projectDetail';
import ArchitectureHighlightsSection from './ArchitectureHighlightsSection';
import BulletListSection from './BulletListSection';
import ConstraintTradeOffSection from './ConstraintTradeOffSection';
import DefaultBodySection from './DefaultBodySection';
import HighlightBodySection from './HighlightBodySection';
import ImpactReflectionSection from './ImpactReflectionSection';
import KeyFeaturesSection from './KeyFeaturesSection';
import NumberedItemsOnlySection from './NumberedItemsOnlySection';
import PerformanceAccessibilitySection from './PerformanceAccessibilitySection';
import ProcessBlocksSection from './ProcessBlocksSection';
import ProcessResearchStrategySection from './ProcessResearchStrategySection';
import RelatedArticlesSection from './RelatedArticlesSection';
import SystemDesignTechStackSection from './SystemDesignTechStackSection';
import TechStackOnlySection from './TechStackOnlySection';
import TestingCiCdSection from './TestingCiCdSection';
import TimelineOnlySection from './TimelineOnlySection';

export interface SectionContentRendererProps {
  section: SectionContent;
  slug: string;
  ctx: SectionRenderContext;
}

export default function SectionContentRenderer({
  section,
  slug,
  ctx,
}: SectionContentRendererProps) {
  const researchStrategy = section.researchStrategy;
  const timelineSteps = section.timelineSteps;
  const architectureHighlights = section.architectureHighlights;
  const numberedItems = section.numberedItems;
  const techStackSections = section.techStackSections;
  const constraintTradeOffBlocks = section.constraintTradeOffBlocks;
  const performanceAccessibilityBlocks = section.performanceAccessibilityBlocks;
  const testingCiCdBlock = section.testingCiCdBlock;
  const impactReflectionBlock = section.impactReflectionBlock;
  const processBlocks = section.processBlocks;

  if (slug === 'process' && researchStrategy != null && researchStrategy.findings?.length > 0) {
    return <ProcessResearchStrategySection section={section} slug={slug} ctx={ctx} />;
  }
  if (slug === 'system-design' && architectureHighlights != null) {
    return <ArchitectureHighlightsSection section={section} ctx={ctx} />;
  }
  if (
    slug === 'system-design' &&
    numberedItems != null &&
    numberedItems.length > 0 &&
    techStackSections != null &&
    techStackSections.length > 0
  ) {
    return <SystemDesignTechStackSection section={section} slug={slug} ctx={ctx} />;
  }
  if (techStackSections != null && techStackSections.length > 0 && slug !== 'system-design') {
    return <TechStackOnlySection section={section} ctx={ctx} />;
  }
  if (
    slug === 'constraints--trade-offs' &&
    constraintTradeOffBlocks != null &&
    constraintTradeOffBlocks.length > 0
  ) {
    return <ConstraintTradeOffSection section={section} ctx={ctx} />;
  }
  if (
    slug === 'performance--accessibility' &&
    performanceAccessibilityBlocks != null &&
    performanceAccessibilityBlocks.length > 0
  ) {
    return <PerformanceAccessibilitySection section={section} ctx={ctx} />;
  }
  if (slug === 'testing--ci/cd' && testingCiCdBlock != null) {
    return <TestingCiCdSection section={section} ctx={ctx} />;
  }
  if (slug === 'impact--reflection' && impactReflectionBlock != null) {
    return <ImpactReflectionSection section={section} ctx={ctx} />;
  }
  if (processBlocks != null && processBlocks.length > 0) {
    return <ProcessBlocksSection section={section} ctx={ctx} />;
  }
  if (timelineSteps != null && timelineSteps.length > 0) {
    return <TimelineOnlySection section={section} ctx={ctx} />;
  }
  if (slug === 'related-articles') {
    return <RelatedArticlesSection section={section} ctx={ctx} />;
  }
  if (numberedItems != null && numberedItems.length > 0) {
    return <NumberedItemsOnlySection section={section} ctx={ctx} />;
  }
  const endIndex = section.highlightBlockEndIndex;
  if (endIndex != null && endIndex > 0) {
    return <HighlightBodySection section={section} ctx={ctx} />;
  }
  if (slug === 'performance--accessibility' || slug === 'key-learnings' || slug === 'next-steps') {
    return <BulletListSection section={section} ctx={ctx} />;
  }
  if (
    slug === 'product-overview' &&
    section.keyFeatures != null &&
    section.keyFeatures.length > 0
  ) {
    return <KeyFeaturesSection section={section} ctx={ctx} />;
  }
  return <DefaultBodySection section={section} ctx={ctx} />;
}
