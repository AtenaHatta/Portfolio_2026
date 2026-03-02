import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import AssetImage from '../components/AssetImage';
import { SectionContentRenderer } from '../components/project-detail';
import type { getColors } from '../config/colors';
import { devToArticles } from '../data/devto-articles';
import projectsData from '../data/projects.json';
import type { ProjectDetail } from '../types/projectDetail';

interface ProjectDetailPageProps {
  colors: ReturnType<typeof getColors>;
}

const PROJECTS = projectsData.projects as unknown as ProjectDetail[];
const MENU_ITEMS: string[] = projectsData.detailSections;

const getSlug = (item: string) => item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '');

function ProjectDetailPage({ colors }: ProjectDetailPageProps) {
  const { id } = useParams<{ id: string }>();
  const project = PROJECTS.find((p) => p.id === id) ?? PROJECTS[0];

  const relatedArticlesCount = useMemo(() => {
    const section = project.sections?.['related-articles'];
    if (!section?.relatedPostsFromDevTo) return null;
    const tagLower = (section.devToTag ?? '').toLowerCase();
    const filtered = tagLower
      ? devToArticles.filter((a) => a.tag_list.some((t) => t.toLowerCase() === tagLower))
      : devToArticles;
    return filtered.length;
  }, [project.sections]);

  const hasRelatedArticles = (() => {
    const section = project.sections?.['related-articles'];
    if (!section) return false;
    if (section.relatedPosts && section.relatedPosts.length > 0) return true;
    if (section.relatedPostsFromDevTo)
      return relatedArticlesCount !== null && relatedArticlesCount > 0;
    return false;
  })();

  const menuItems = (
    project.hiddenSections
      ? MENU_ITEMS.filter((item) => !project.hiddenSections!.includes(item))
      : MENU_ITEMS
  ).filter((item) => getSlug(item) !== 'related-articles' || hasRelatedArticles);
  const [activeSection, setActiveSection] = useState(menuItems[0]);

  useEffect(() => {
    if (menuItems.length > 0 && !menuItems.includes(activeSection)) {
      setActiveSection(menuItems[0]);
    }
  }, [menuItems, activeSection]);
  const [modalImage, setModalImage] = useState<string | null>(null);
  const [imageNaturalSize, setImageNaturalSize] = useState<
    Record<string, { w: number; h: number }>
  >({});
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const MAX_IMG_WIDTH = 672;
  const MAX_IMG_HEIGHT = 800;

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    const src = img.currentSrc || img.src;
    setImageNaturalSize((prev) => ({
      ...prev,
      [src]: { w: img.naturalWidth, h: img.naturalHeight },
    }));
  };

  const renderParagraphWithHighlights = (text: string) => {
    const highlightBg = (colors as { highlight?: { bg: string } }).highlight?.bg;
    const parts: React.ReactNode[] = [];
    const regex = /\{\{(.+?)\}\}/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.slice(lastIndex, match.index));
      }
      parts.push(
        <span
          key={`hl-${match.index}`}
          className="rounded px-1 py-0.5"
          style={highlightBg ? { backgroundColor: highlightBg } : undefined}
        >
          {match[1]}
        </span>
      );
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      parts.push(text.slice(lastIndex));
    }
    return parts.length > 0 ? parts : text;
  };

  const getImageStyle = (src: string) => {
    const size = imageNaturalSize[src];
    if (!size || size.w === 0 || size.h === 0) return {};
    return {
      maxWidth: Math.min(size.w, MAX_IMG_WIDTH),
      maxHeight: Math.min(size.h, MAX_IMG_HEIGHT),
      width: 'auto',
      height: 'auto',
    };
  };

  const scrollToSection = (item: string) => {
    setActiveSection(item);
    const el = sectionRefs.current[getSlug(item)];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null);
    };
    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [modalImage]);

  // Update active menu on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const id = entry.target.getAttribute('data-section');
          if (id) {
            const item = menuItems.find((i) => getSlug(i) === id);
            if (item) setActiveSection(item);
          }
        });
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    );

    menuItems.forEach((item) => {
      const el = sectionRefs.current[getSlug(item)];
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [menuItems]);

  const links = project.hideLinks
    ? []
    : [
        { label: 'Demo', url: project.demoUrl },
        { label: 'Source code', url: project.sourceUrl },
        { label: 'Design', url: project.designUrl },
      ].filter((link) => link.url);

  return (
    <>
      <section className="py-24 md:py-36 lg:py-48 min-h-screen">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
          <div className="flex flex-col lg:flex-row gap-12 items-stretch">
            {/* Left Section - Image (same height as right text on lg) */}
            <div className="flex-shrink-0 lg:w-2/5 min-h-0">
              {project.topImage ? (
                <div className="aspect-video lg:aspect-auto lg:h-full rounded-lg overflow-hidden border border-neutral-300 dark:border-neutral-600">
                  <AssetImage
                    src={project.topImage}
                    alt={`${project.title} overview`}
                    width={192}
                    height={128}
                    loading="eager"
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              ) : (
                <div
                  className="aspect-video lg:aspect-auto lg:h-full min-h-[200px] rounded-lg opacity-90"
                  style={{ backgroundColor: '#DC2626' }}
                />
              )}
            </div>

            {/* Right Section - Project Details */}
            <div className="flex-1 min-w-0 flex flex-col justify-center">
              <p className="text-sm font-light mb-2" style={{ color: colors.secondary.text }}>
                {project.type}
              </p>
              <h1
                className="text-2xl md:text-3xl font-light mb-6 leading-tight"
                style={{ color: colors.background.text }}
              >
                {project.title}
              </h1>

              {/* Technology Tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 rounded-[2px] text-sm font-light"
                    style={{
                      backgroundColor: colors.chip.bg,
                      color: colors.chip.text,
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-8">
                <div>
                  <span
                    className="font-medium block text-sm mb-1"
                    style={{ color: colors.secondary.text }}
                  >
                    Year
                  </span>
                  <span className="font-light" style={{ color: colors.background.text }}>
                    {project.year}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Links (below image + text row) */}
          {links.length > 0 && (
            <div className="flex flex-wrap gap-6 mt-6">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 hover:opacity-70 transition-opacity"
                  style={{ color: colors.secondary.text }}
                >
                  <span className="text-base font-light">{link.label}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ))}
            </div>
          )}

          {/* Back to Projects */}
          <div className="mt-12">
            <Link
              to="/project"
              className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
              style={{ color: colors.background.text }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              <span className="font-light">Back to Projects</span>
            </Link>
          </div>

          {/* Fixed Left Menu + Scrollable Right Content */}
          <div className="mt-16 md:mt-24 lg:mt-40 flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Mobile: Horizontal section nav */}
            <nav
              className="lg:hidden flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:mx-0 lg:px-0"
              style={{ borderBottom: `1px solid ${colors.secondary.text}20` }}
            >
              {menuItems.map((item) => {
                const isActive = activeSection === item;
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => scrollToSection(item)}
                    className="flex-shrink-0 py-2 px-3 text-sm font-light transition-opacity hover:opacity-70 whitespace-nowrap rounded"
                    style={{
                      color: isActive ? colors.background.text : colors.secondary.text,
                      fontWeight: isActive ? 500 : 300,
                    }}
                  >
                    {item}
                  </button>
                );
              })}
            </nav>
            {/* Desktop: Fixed Left Menu */}
            <nav className="hidden lg:block flex-shrink-0 w-56 sticky top-24 self-start">
              <ul className="space-y-3">
                {menuItems.map((item) => {
                  const isActive = activeSection === item;
                  return (
                    <li key={item}>
                      <button
                        type="button"
                        onClick={() => scrollToSection(item)}
                        className="text-left w-full py-1 transition-opacity hover:opacity-70"
                        style={{
                          color: isActive ? colors.background.text : colors.secondary.text,
                          fontWeight: isActive ? 500 : 300,
                        }}
                      >
                        {item}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Right Content - Scrollable */}
            <div className="flex-1 min-w-0">
              {menuItems.map((item) => {
                const slug = getSlug(item);
                return (
                  <div
                    key={item}
                    data-section={slug}
                    ref={(el) => {
                      sectionRefs.current[slug] = el;
                    }}
                    className="pt-8 pb-16 scroll-mt-24"
                  >
                    <h2
                      className="text-2xl font-light mb-6"
                      style={{ color: colors.background.text }}
                    >
                      {item}
                    </h2>
                    <div className="min-h-[200px]" style={{ color: colors.background.text }}>
                      {project.sections?.[slug] ? (
                        <>
                          {project.sections[slug].image && (
                            <div className="mb-6">
                              {project.sections[slug].imageTitle && (
                                <p
                                  className="text-lg font-light mb-2"
                                  style={{ color: colors.background.text }}
                                >
                                  {project.sections[slug].imageTitle}
                                </p>
                              )}
                              <button
                                type="button"
                                onClick={() => setModalImage(project.sections![slug].image!)}
                                className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
                              >
                                <div
                                  className="w-full max-w-3xl rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600"
                                  style={{ aspectRatio: '800/450' }}
                                >
                                  <AssetImage
                                    src={project.sections[slug].image}
                                    alt={project.sections[slug].imageTitle || 'Section image'}
                                    width={800}
                                    height={450}
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                                    style={getImageStyle(project.sections[slug].image!)}
                                    onLoad={handleImageLoad}
                                  />
                                </div>
                              </button>
                            </div>
                          )}
                          {project.sections[slug].imageBelowFirst && (
                            <div className="mb-6">
                              {project.sections[slug].imageBelowFirstTitle && (
                                <p
                                  className="text-lg font-light mb-2"
                                  style={{ color: colors.background.text }}
                                >
                                  {project.sections[slug].imageBelowFirstTitle}
                                </p>
                              )}
                              <button
                                type="button"
                                onClick={() =>
                                  setModalImage(project.sections![slug].imageBelowFirst!)
                                }
                                className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
                              >
                                <div
                                  className="w-full max-w-3xl rounded-lg overflow-hidden bg-neutral-200 dark:bg-neutral-700 border border-neutral-300 dark:border-neutral-600"
                                  style={{
                                    aspectRatio: project.sections[slug].imageBelowFirst?.includes(
                                      'certificate-flowchart'
                                    )
                                      ? '800/429'
                                      : '800/450',
                                  }}
                                >
                                  <AssetImage
                                    src={project.sections[slug].imageBelowFirst}
                                    alt={
                                      project.sections[slug].imageBelowFirstTitle || 'Section image'
                                    }
                                    width={800}
                                    height={
                                      project.sections[slug].imageBelowFirst?.includes(
                                        'certificate-flowchart'
                                      )
                                        ? 429
                                        : 450
                                    }
                                    loading="lazy"
                                    decoding="async"
                                    className="w-full h-full object-cover rounded-lg hover:opacity-90 transition-opacity"
                                    style={getImageStyle(project.sections[slug].imageBelowFirst!)}
                                    onLoad={handleImageLoad}
                                  />
                                </div>
                              </button>
                            </div>
                          )}
                          {project.sections[slug].heading &&
                            !project.sections[slug].techStackSections && (
                              <h3
                                className="text-xl font-light mb-4"
                                style={{ color: colors.background.text }}
                              >
                                {project.sections[slug].heading}
                              </h3>
                            )}
                          <SectionContentRenderer
                            section={project.sections[slug]}
                            slug={slug}
                            ctx={{
                              colors,
                              onImageClick: setModalImage,
                              getImageStyle,
                              onImageLoad: handleImageLoad,
                              renderParagraphWithHighlights,
                            }}
                          />
                          {project.sections[slug].imageBelowHeading && (
                            <div className="mt-6">
                              <button
                                type="button"
                                onClick={() =>
                                  setModalImage(project.sections![slug].imageBelowHeading!)
                                }
                                className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
                              >
                                <AssetImage
                                  src={project.sections[slug].imageBelowHeading}
                                  alt="Section image"
                                  width={800}
                                  height={450}
                                  loading="lazy"
                                  decoding="async"
                                  className="rounded-lg hover:opacity-90 transition-opacity w-full h-auto max-w-3xl"
                                  style={getImageStyle(project.sections[slug].imageBelowHeading!)}
                                  onLoad={handleImageLoad}
                                />
                              </button>
                            </div>
                          )}
                          {project.sections[slug].videoPlaceholder && (
                            <p className="mt-6 font-light italic opacity-70">Insert video</p>
                          )}
                        </>
                      ) : (
                        <p className="font-light leading-relaxed">
                          Content for {item} will go here.
                        </p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Image modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black"
          onClick={() => setModalImage(null)}
          onKeyDown={(e) => e.key === 'Escape' && setModalImage(null)}
          role="dialog"
          aria-modal="true"
          aria-label="expanded image"
        >
          <button
            type="button"
            onClick={() => setModalImage(null)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white"
            aria-label="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <AssetImage
            src={modalImage}
            alt="Enlarged view"
            decoding="async"
            loading="eager"
            fetchPriority="high"
            className="w-auto h-auto object-contain rounded-lg"
            style={
              imageNaturalSize[modalImage]
                ? {
                    maxWidth: `min(90vw, ${imageNaturalSize[modalImage].w}px)`,
                    maxHeight: `min(90vh, ${imageNaturalSize[modalImage].h}px)`,
                  }
                : { maxWidth: '90vw', maxHeight: '90vh' }
            }
            onLoad={handleImageLoad}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
}

export default ProjectDetailPage;
