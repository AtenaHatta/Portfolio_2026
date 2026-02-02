import { useParams, Link } from 'react-router-dom'
import { useRef, useState, useEffect } from 'react'
import { getColors } from '../config/colors'
import projectsData from '../data/projects.json'

interface ProjectDetailPageProps {
  colors: ReturnType<typeof getColors>
}

interface NumberedItem {
  title: string
  description: string
  subPoints?: string[]
}

interface TechStackSection {
  title: string
  items: string[]
}

interface ProcessSubsectionItem {
  title: string
  body: string
}

interface ProcessSubsection {
  heading: string
  body?: string[]
  items?: ProcessSubsectionItem[]
  imageSrc?: string
}

interface ProcessBlock {
  title: string
  body?: string[]
  subsections?: ProcessSubsection[]
  imageSrc?: string
}

interface KeyFeature {
  title: string
  description: string
}

interface SectionContent {
  heading?: string
  body: string[]
  techStackBody?: string[]
  videoPlaceholder?: boolean
  image?: string
  imageTitle?: string
  imageBelowFirst?: string
  imageBelowFirstTitle?: string
  imageBelowHeading?: string
  highlightBlockEndIndex?: number
  numberedItems?: NumberedItem[]
  techStackSections?: TechStackSection[]
  processBlocks?: ProcessBlock[]
  imageAfterIndex?: number
  imageAfterIndexSrc?: string
  keyFeatures?: KeyFeature[]
}

interface ProjectDetail {
  id: string
  type: string
  title: string
  technologies: string[]
  year: string
  role: string
  member: string
  demoUrl?: string
  sourceUrl?: string
  designUrl?: string
  sections?: Record<string, SectionContent>
  hiddenSections?: string[]
  hideLinks?: boolean
  topImage?: string
}

const PROJECTS: ProjectDetail[] = projectsData.projects as ProjectDetail[]
const MENU_ITEMS: string[] = projectsData.detailSections

function ProjectDetailPage({ colors }: ProjectDetailPageProps) {
  const { id } = useParams<{ id: string }>()
  const project = PROJECTS.find((p) => p.id === id) ?? PROJECTS[0]
  const menuItems = project.hiddenSections
    ? MENU_ITEMS.filter((item) => !project.hiddenSections!.includes(item))
    : MENU_ITEMS
  const [activeSection, setActiveSection] = useState(menuItems[0])
  const [modalImage, setModalImage] = useState<string | null>(null)
  const [imageNaturalSize, setImageNaturalSize] = useState<Record<string, { w: number; h: number }>>({})
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  const MAX_IMG_WIDTH = 672
  const MAX_IMG_HEIGHT = 800

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    const src = img.currentSrc || img.src
    setImageNaturalSize((prev) => ({
      ...prev,
      [src]: { w: img.naturalWidth, h: img.naturalHeight },
    }))
  }

  const getImageStyle = (src: string) => {
    const size = imageNaturalSize[src]
    if (!size || size.w === 0 || size.h === 0) return {}
    return {
      maxWidth: Math.min(size.w, MAX_IMG_WIDTH),
      maxHeight: Math.min(size.h, MAX_IMG_HEIGHT),
      width: 'auto',
      height: 'auto',
    }
  }

  const getSlug = (item: string) =>
    item.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '')

  const scrollToSection = (item: string) => {
    setActiveSection(item)
    const el = sectionRefs.current[getSlug(item)]
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setModalImage(null)
    }
    if (modalImage) {
      document.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [modalImage])

  // Update active menu on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const id = entry.target.getAttribute('data-section')
          if (id) {
            const item = menuItems.find((i) => getSlug(i) === id)
            if (item) setActiveSection(item)
          }
        })
      },
      { root: null, rootMargin: '-20% 0px -70% 0px', threshold: 0 }
    )

    menuItems.forEach((item) => {
      const el = sectionRefs.current[getSlug(item)]
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [menuItems])

  const links = project.hideLinks
    ? []
    : [
        { label: 'Demo', url: project.demoUrl },
        { label: 'Source code', url: project.sourceUrl },
        { label: 'Design', url: project.designUrl },
      ]

  return (
    <>
    <section className="py-24 md:py-36 lg:py-48 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12 lg:px-24">
        <div className="flex flex-col lg:flex-row gap-12 items-stretch">
          {/* Left Section - Image (same height as right text on lg) */}
          <div className="flex-shrink-0 lg:w-2/5 min-h-0">
            {project.topImage ? (
              <div className="aspect-video lg:aspect-auto lg:h-full rounded-lg overflow-hidden">
                <img
                  src={project.topImage}
                  alt=""
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
            <p
              className="text-sm font-light mb-2"
              style={{ color: colors.secondary.text }}
            >
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
                <span className="font-medium block text-sm mb-1" style={{ color: colors.secondary.text }}>
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
            to="/#projects"
            className="inline-flex items-center gap-2 hover:opacity-70 transition-opacity"
            style={{ color: colors.background.text }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="font-light">Back to Projects</span>
          </Link>
        </div>

        {/* Fixed Left Menu + Scrollable Right Content */}
        <div className="mt-16 md:mt-24 lg:mt-40 flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Mobile: Horizontal section nav */}
          <nav className="lg:hidden flex overflow-x-auto gap-4 pb-4 -mx-6 px-6 sm:-mx-8 sm:px-8 md:-mx-12 md:px-12 lg:mx-0 lg:px-0" style={{ borderBottom: `1px solid ${colors.secondary.text}20` }}>
            {menuItems.map((item) => {
              const isActive = activeSection === item
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
              )
            })}
          </nav>
          {/* Desktop: Fixed Left Menu */}
          <nav className="hidden lg:block flex-shrink-0 w-56 sticky top-24 self-start">
            <ul className="space-y-3">
              {menuItems.map((item) => {
                const isActive = activeSection === item
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
                )
              })}
            </ul>
          </nav>

          {/* Right Content - Scrollable */}
          <div className="flex-1 min-w-0">
            {menuItems.map((item) => {
              const slug = getSlug(item)
              return (
                <div
                  key={item}
                  data-section={slug}
                  ref={(el) => {
                    sectionRefs.current[slug] = el
                  }}
                  className="pt-8 pb-16 scroll-mt-24"
                >
                  <h2
                    className="text-2xl font-light mb-6"
                    style={{ color: colors.background.text }}
                  >
                    {item}
                  </h2>
                  <div
                    className="min-h-[200px]"
                    style={{ color: colors.background.text }}
                  >
                    {project.sections?.[slug] ? (
                      <>
                        {project.sections[slug].image && (
                          <div className="mb-6">
                            {(project.sections[slug] as SectionContent).imageTitle && (
                              <p className="text-lg font-light mb-2" style={{ color: colors.background.text }}>
                                {(project.sections[slug] as SectionContent).imageTitle}
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={() => setModalImage(project.sections![slug].image!)}
                              className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
                            >
                              <img
                                src={project.sections[slug].image}
                                alt=""
                                className="rounded-lg hover:opacity-90 transition-opacity"
                                style={getImageStyle(project.sections[slug].image!)}
                                onLoad={handleImageLoad}
                              />
                            </button>
                          </div>
                        )}
                        {project.sections[slug].imageBelowFirst && (
                          <div className="mb-6">
                            {(project.sections[slug] as SectionContent).imageBelowFirstTitle && (
                              <p className="text-lg font-light mb-2" style={{ color: colors.background.text }}>
                                {(project.sections[slug] as SectionContent).imageBelowFirstTitle}
                              </p>
                            )}
                            <button
                              type="button"
                              onClick={() => setModalImage(project.sections![slug].imageBelowFirst!)}
                              className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
                            >
                              <img
                                src={project.sections[slug].imageBelowFirst}
                                alt=""
                                className="rounded-lg hover:opacity-90 transition-opacity"
                                style={getImageStyle(project.sections[slug].imageBelowFirst!)}
                                onLoad={handleImageLoad}
                              />
                            </button>
                          </div>
                        )}
                        {project.sections[slug].heading && !project.sections[slug].techStackSections && (
                          <h3 className="text-xl font-light mb-4" style={{ color: colors.background.text }}>
                            {project.sections[slug].heading}
                          </h3>
                        )}
                        {(() => {
                          const section = project.sections[slug]
                          const numberedItems = section.numberedItems
                          const techStackSections = section.techStackSections
                          if (slug === 'system-design' && numberedItems != null && numberedItems.length > 0 && techStackSections != null && techStackSections.length > 0) {
                            // Architecture: Tech stack first, then numbered list (Client → Server, etc.)
                            return (
                              <div className="space-y-8">
                                {/* 1. Tech stack block (first) */}
                                <div className="space-y-4">
                                  <div
                                    className="p-6 rounded-lg space-y-5"
                                    style={{
                                      backgroundColor: colors.block?.bg ?? colors.chip.bg,
                                      color: colors.chip.text,
                                    }}
                                  >
                                    {section.heading && (
                                      <h3
                                        className="text-lg font-light"
                                        style={{ color: colors.background.text }}
                                      >
                                        {section.heading}
                                      </h3>
                                    )}
                                    {techStackSections.map((sec, i) => (
                                    <div key={i} className="space-y-2">
                                        <p
                                          className="font-medium flex items-start gap-2"
                                          style={{ color: colors.background.text }}
                                        >
                                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current opacity-80" aria-hidden />
                                          {sec.title}
                                        </p>
                                        <ul className="ml-5 space-y-1 list-none">
                                          {sec.items.map((item, j) => {
                                            const colonIndex = item.indexOf(': ')
                                            const keyPart = colonIndex >= 0 ? item.slice(0, colonIndex + 2) : ''
                                            const valuePart = colonIndex >= 0 ? item.slice(colonIndex + 2) : item
                                            return (
                                              <li
                                                key={j}
                                                className="font-light leading-relaxed text-sm"
                                              >
                                                {keyPart ? (
                                                  <>
                                                    <span className="opacity-80" style={{ color: colors.background.text }}>{keyPart}</span>
                                                    <span style={{ color: colors.background.text }}>{valuePart}</span>
                                                  </>
                                                ) : (
                                                  <span className="opacity-80" style={{ color: colors.background.text }}>{item}</span>
                                                )}
                                              </li>
                                            )
                                          })}
                                        </ul>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                                {/* Numbered list (2, 3, 4 for system-design) - same block background as 1. Tech stack */}
                                <div
                                  className="p-6 rounded-lg space-y-6"
                                  style={{
                                    backgroundColor: colors.block?.bg ?? colors.chip.bg,
                                    color: colors.chip.text,
                                  }}
                                >
                                  <ol className="space-y-6 list-none pl-0">
                                    {numberedItems.map((item, i) => {
                                      const num = slug === 'system-design' ? i + 2 : i + 1
                                      return (
                                        <li key={i} className="font-light">
                                          <span className="font-medium" style={{ color: colors.background.text }}>
                                            {num}. {item.title}
                                          </span>
                                          {item.description && (
                                            <p className="mt-1 leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                              {item.description}
                                            </p>
                                          )}
                                          {item.subPoints && item.subPoints.length > 0 && (
                                            <ul className="mt-2 ml-4 space-y-1 list-disc">
                                              {item.subPoints.map((point, j) => (
                                                <li key={j} className="leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                                  {point}
                                                </li>
                                              ))}
                                            </ul>
                                          )}
                                        </li>
                                      )
                                    })}
                                  </ol>
                                </div>
                                {/* Why Vue3?: (no background) */}
                                {((section as SectionContent).techStackBody != null && (section as SectionContent).techStackBody!.length > 0) && (
                                  <div className="space-y-4">
                                    {(section as SectionContent).techStackBody!.map((paragraph, i) => (
                                      i === 0 && paragraph === 'Why Vue3?:' ? (
                                        <h3
                                          key={i}
                                          className="text-lg font-light"
                                          style={{ color: colors.background.text }}
                                        >
                                          {paragraph}
                                        </h3>
                                      ) : (
                                        <p key={i} className="font-light leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                          {paragraph}
                                        </p>
                                      )
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          }
                          if (techStackSections != null && techStackSections.length > 0 && slug !== 'system-design') {
                            return (
                              <div className="space-y-4">
                                <div
                                  className="p-6 rounded-lg space-y-5"
                                  style={{
                                    backgroundColor: colors.block?.bg ?? colors.chip.bg,
                                    color: colors.chip.text,
                                  }}
                                >
                                  {section.heading && (
                                    <h3
                                      className="text-lg font-light"
                                      style={{ color: colors.background.text }}
                                    >
                                      {section.heading}
                                    </h3>
                                  )}
                                  {techStackSections.map((sec, i) => (
                                    <div key={i} className="space-y-2">
                                      <p
                                        className="font-medium flex items-start gap-2"
                                        style={{ color: colors.background.text }}
                                      >
                                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 bg-current opacity-80" aria-hidden />
                                        {sec.title}
                                      </p>
                                      <ul className="ml-5 space-y-1 list-none">
                                        {sec.items.map((item, j) => {
                                          const colonIndex = item.indexOf(': ')
                                          const keyPart = colonIndex >= 0 ? item.slice(0, colonIndex + 2) : ''
                                          const valuePart = colonIndex >= 0 ? item.slice(colonIndex + 2) : item
                                          return (
                                            <li
                                              key={j}
                                              className="font-light leading-relaxed text-sm"
                                            >
                                              {keyPart ? (
                                                <>
                                                  <span className="opacity-80" style={{ color: colors.background.text }}>{keyPart}</span>
                                                  <span style={{ color: colors.background.text }}>{valuePart}</span>
                                                </>
                                              ) : (
                                                <span className="opacity-80" style={{ color: colors.background.text }}>{item}</span>
                                              )}
                                            </li>
                                          )
                                        })}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                                {section.body.length > 0 && (
                                  <div className="space-y-4">
                                    {section.body.map((paragraph, i) => (
                                      <p key={i} className="font-light leading-relaxed opacity-80">
                                        {paragraph}
                                      </p>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )
                          }
                          const processBlocks = section.processBlocks
                          if (processBlocks != null && processBlocks.length > 0) {
                            return (
                              <div className="space-y-4">
                                {processBlocks.map((block, i) => (
                                  <div
                                    key={i}
                                    className="p-6 rounded-lg space-y-5"
                                    style={{
                                      backgroundColor: colors.block?.bg ?? colors.chip.bg,
                                      color: colors.background.text,
                                    }}
                                  >
                                    <p
                                      className="font-medium text-lg"
                                      style={{ color: colors.background.text }}
                                    >
                                      {block.title}
                                    </p>
                                    {block.subsections ? (
                                      <div className="space-y-5">
                                        {block.subsections.map((sub, j) => {
                                          const isChallengeOrSolution = sub.heading?.startsWith('Challenge:') === true || sub.heading?.startsWith('Solution:') === true
                                          return (
                                            <div
                                              key={j}
                                              className="space-y-3"
                                            >
                                              <p
                                                className={`font-medium ${isChallengeOrSolution ? 'inline-block rounded px-3 py-1.5' : ''}`}
                                                style={
                                                  isChallengeOrSolution
                                                    ? { backgroundColor: (colors as { challengeSolutionLabel?: { bg: string } }).challengeSolutionLabel?.bg ?? colors.block?.bg ?? colors.chip.bg, color: colors.background.text }
                                                    : { color: colors.background.text }
                                                }
                                              >
                                                {sub.heading}
                                              </p>
                                              {sub.items ? (
                                                <div className="space-y-4">
                                                  {sub.items.map((item, k) => (
                                                    <div key={k} className="space-y-2">
                                                      <p
                                                        className="font-medium"
                                                        style={{ color: colors.background.text }}
                                                      >
                                                        {item.title}
                                                      </p>
                                                      <p className="font-light leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                                        {item.body}
                                                      </p>
                                                    </div>
                                                  ))}
                                                </div>
                                              ) : (
                                                sub.body?.map((paragraph, k) => (
                                                  <p key={k} className="font-light leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                                    {paragraph}
                                                  </p>
                                                ))
                                              )}
                                              {sub.imageSrc && (
                                                <div className="mt-4">
                                                  <button
                                                    type="button"
                                                    onClick={() => setModalImage(sub.imageSrc!)}
                                                    className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
                                                  >
                                                    <img
                                                      src={sub.imageSrc}
                                                      alt=""
                                                      className="rounded-lg hover:opacity-90 transition-opacity max-w-full"
                                                      style={getImageStyle(sub.imageSrc)}
                                                      onLoad={handleImageLoad}
                                                    />
                                                  </button>
                                                </div>
                                              )}
                                            </div>
                                          )
                                        })}
                                      </div>
                                    ) : (
                                      block.body?.map((paragraph, j) => (
                                        <p key={j} className="font-light leading-relaxed opacity-80">
                                          {paragraph}
                                        </p>
                                      ))
                                    )}
                                    {block.imageSrc && (
                                      <div className="mt-6">
                                        <button
                                          type="button"
                                          onClick={() => setModalImage(block.imageSrc!)}
                                          className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
                                        >
                                          <img
                                            src={block.imageSrc}
                                            alt=""
                                            className="rounded-lg hover:opacity-90 transition-opacity"
                                            style={getImageStyle(block.imageSrc)}
                                            onLoad={handleImageLoad}
                                          />
                                        </button>
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            )
                          }
                          if (numberedItems != null && numberedItems.length > 0) {
                            return (
                              <ol className="space-y-6 list-none pl-0">
                                {numberedItems.map((item, i) => (
                                  <li key={i} className="font-light">
                                    <span className="font-medium" style={{ color: colors.background.text }}>
                                      {i + 1}. {item.title}
                                    </span>
                                    <p className="mt-1 leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                      {item.description}
                                    </p>
                                    {item.subPoints && item.subPoints.length > 0 && (
                                      <ul className="mt-2 ml-4 space-y-1 list-disc">
                                        {item.subPoints.map((point, j) => (
                                          <li key={j} className="leading-relaxed opacity-80" style={{ color: colors.background.text }}>
                                            {point}
                                          </li>
                                        ))}
                                      </ul>
                                    )}
                                  </li>
                                ))}
                              </ol>
                            )
                          }
                          const endIndex = section.highlightBlockEndIndex
                          const body = section.body
                          if (endIndex != null && endIndex > 0) {
                            const highlightBody = body.slice(0, endIndex)
                            const restBody = body.slice(endIndex)
                            return (
                              <div className="space-y-4">
                                <div
                                  className="p-6 rounded-lg space-y-4"
                                  style={{
                                    backgroundColor: colors.chip.bg,
                                    color: colors.chip.text,
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
                            )
                          }
                          if (slug === 'performance-accessibility' || slug === 'key-learnings' || slug === 'next-steps') {
                            return (
                              <ul className="space-y-2 list-none pl-0">
                                {body.map((paragraph, i) => (
                                  <li
                                    key={i}
                                    className="font-light leading-relaxed opacity-80 flex gap-2"
                                  >
                                    <span aria-hidden>・</span>
                                    <span>{paragraph}</span>
                                  </li>
                                ))}
                              </ul>
                            )
                          }
                          const keyFeatures = (section as SectionContent).keyFeatures
                          if (slug === 'product-overview' && keyFeatures != null && keyFeatures.length > 0) {
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
                                  <h3 className="text-lg font-light" style={{ color: colors.background.text }}>
                                    Key Features:
                                  </h3>
                                  <ul className="space-y-3 list-none pl-0">
                                    {keyFeatures.map((feat, i) => (
                                      <li key={i} className="font-light">
                                        <span className="font-medium" style={{ color: colors.background.text }}>
                                          {feat.title}:
                                        </span>
                                        <span className="opacity-80 ml-1" style={{ color: colors.background.text }}>
                                          {feat.description}
                                        </span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )
                          }
                          return (
                            <div className="space-y-4">
                              {body.map((paragraph, i) => (
                                <div key={i} className="space-y-4">
                                  <p className="font-light leading-relaxed opacity-80">
                                    {paragraph}
                                  </p>
                                  {section.imageAfterIndex === i && section.imageAfterIndexSrc && (
                                    <div className="my-6">
                                      <button
                                        type="button"
                                        onClick={() => setModalImage(section.imageAfterIndexSrc!)}
                                        className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 rounded-lg"
                                      >
                                        <img
                                          src={section.imageAfterIndexSrc}
                                          alt=""
                                          className="rounded-lg hover:opacity-90 transition-opacity"
                                          style={getImageStyle(section.imageAfterIndexSrc)}
                                          onLoad={handleImageLoad}
                                        />
                                      </button>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )
                        })()}
                        {project.sections[slug].imageBelowHeading && (
                          <div className="mt-6">
                            <button
                              type="button"
                              onClick={() => setModalImage(project.sections![slug].imageBelowHeading!)}
                              className="block w-full text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-white rounded-lg"
                            >
                              <img
                                src={project.sections[slug].imageBelowHeading}
                                alt=""
                                className="rounded-lg hover:opacity-90 transition-opacity w-full h-auto max-w-3xl"
                                style={getImageStyle(project.sections[slug].imageBelowHeading!)}
                                onLoad={handleImageLoad}
                              />
                            </button>
                          </div>
                        )}
                        {project.sections[slug].videoPlaceholder && (
                          <p className="mt-6 font-light italic opacity-70">
                            動画挿入
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="font-light leading-relaxed">
                        Content for {item} will go here.
                      </p>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>

    {/* Image modal */}
    {modalImage && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80"
        onClick={() => setModalImage(null)}
        onKeyDown={(e) => e.key === 'Escape' && setModalImage(null)}
        role="dialog"
        aria-modal="true"
        aria-label="拡大画像"
      >
        <button
          type="button"
          onClick={() => setModalImage(null)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 transition-colors text-white"
          aria-label="閉じる"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <img
          src={modalImage}
          alt=""
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
  )
}

export default ProjectDetailPage
