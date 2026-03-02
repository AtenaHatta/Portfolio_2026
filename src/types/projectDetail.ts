/** Shared types for project detail sections (ProjectDetailPage and section block components). */
import type React from 'react';

export interface NumberedItem {
  title: string;
  description: string;
  subPoints?: string[];
}

export interface TechStackSection {
  title: string;
  items: string[];
}

export interface ProcessSubsectionItem {
  title: string;
  body: string;
}

export interface ProcessSubsection {
  heading: string;
  body?: string[];
  items?: ProcessSubsectionItem[];
  imageSrc?: string;
}

export interface ProcessBlock {
  title: string;
  body?: string[];
  subsections?: ProcessSubsection[];
  imageSrc?: string;
}

export interface KeyFeature {
  title: string;
  description: string;
}

export interface ResearchFinding {
  title: string;
  metric: string;
  description: string;
  image: string;
}

export interface ResearchStrategy {
  phaseTitle: string;
  findings: ResearchFinding[];
  strategyTitle: string;
  strategyItems: string[];
}

export interface SectionContent {
  heading?: string;
  body?: string[];
  techStackBody?: string[];
  videoPlaceholder?: boolean;
  image?: string;
  imageTitle?: string;
  imageBelowFirst?: string;
  imageBelowFirstTitle?: string;
  imageBelowHeading?: string;
  highlightBlockEndIndex?: number;
  numberedItems?: NumberedItem[];
  techStackSections?: TechStackSection[];
  processBlocks?: ProcessBlock[];
  imageAfterIndex?: number;
  imageAfterIndexSrc?: string;
  keyFeatures?: KeyFeature[];
  timelineSteps?: { title: string; items: string[] }[];
  researchStrategy?: ResearchStrategy;
  phase2Mockup?: {
    title: string;
    body: string;
    image: string;
    subtitle: string;
    image2: string;
  };
  phase3TechStack?: { title: string; items: string[] };
  constraintTradeOffBlocks?: { heading: string; body: string[] }[];
  performanceAccessibilityBlocks?: { title: string; body: string[]; image?: string }[];
  testingCiCdBlock?: { title: string; body: string[]; image?: string };
  impactReflectionBlock?: { body: string[]; image?: string };
  architectureHighlights?: { image: string; title: string; items: string[] };
  relatedPosts?: { title: string; url: string; date?: string }[];
  relatedPostsFromDevTo?: boolean;
  devToTag?: string;
}

export interface ProjectDetail {
  id: string;
  type: string;
  title: string;
  technologies: string[];
  year: string;
  role: string;
  member: string;
  demoUrl?: string;
  sourceUrl?: string;
  designUrl?: string;
  sections?: Record<string, SectionContent>;
  hiddenSections?: string[];
  hideLinks?: boolean;
  topImage?: string;
}

/** Props passed to section block components: colors, image modal, image style, highlight renderer. */
export interface SectionRenderContext {
  colors: Record<string, unknown> & {
    background?: { text: string };
    secondary?: { text: string };
    chip?: { bg: string; text: string };
    block?: { bg: string };
    highlight?: { bg: string };
    challengeSolutionLabel?: { bg: string };
  };
  onImageClick: (src: string) => void;
  getImageStyle: (src: string) => React.CSSProperties;
  onImageLoad: (e: React.SyntheticEvent<HTMLImageElement>) => void;
  renderParagraphWithHighlights: (text: string) => React.ReactNode;
}
