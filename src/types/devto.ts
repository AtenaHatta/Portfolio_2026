export interface DevToArticle {
  id: number
  title: string
  description: string
  url: string
  cover_image: string | null
  social_image: string
  published_at: string
  tag_list: string[]
  public_reactions_count: number
  page_views_count?: number
  positive_reactions_count?: number
}
