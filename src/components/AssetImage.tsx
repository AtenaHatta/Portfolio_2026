import type { ImgHTMLAttributes } from 'react'

interface AssetImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src: string
  alt: string
  width?: number
  height?: number
}

/**
 * Renders a local asset with WebP when available (same path, .webp extension).
 * Keeps PNG as fallback. Use for /assets/*.png to get "Improved image display" benefits.
 */
export default function AssetImage({
  src,
  alt,
  width,
  height,
  loading = 'lazy',
  decoding = 'async',
  className,
  ...rest
}: AssetImageProps) {
  const webpSrc = src.replace(/\.png$/i, '.webp')
  const isLocalAsset = src.startsWith('/assets/') && /\.png$/i.test(src)
  const isHero = /hero/i.test(src)
  const effectiveLoading = isHero ? 'eager' : loading
  const effectiveRest = isHero ? { ...rest, fetchPriority: (rest.fetchPriority ?? 'high') as 'high' | 'low' | 'auto' } : rest

  if (isLocalAsset) {
    return (
      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={effectiveLoading}
          decoding={decoding}
          className={className}
          {...effectiveRest}
        />
      </picture>
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={effectiveLoading}
      decoding={decoding}
      className={className}
      {...effectiveRest}
    />
  )
}
