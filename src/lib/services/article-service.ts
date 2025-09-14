import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export interface Article {
  id: string
  sourceId: string
  title: string
  content?: string
  excerpt?: string
  url: string
  author?: string
  publishedAt: string
  imageUrl?: string
  isFavorite: boolean
  isRead: boolean
  readingProgress: number
  contentHash: string
  createdAt: string
  source: {
    id: string
    name: string
    url: string
    type: 'rss' | 'website'
  }
  notes?: {
    id: string
    content: any // TipTap JSON
    tags: string[]
  }
}

export interface ArticleFilters {
  sourceIds?: string[]
  categoryIds?: string[]
  isRead?: boolean
  isFavorite?: boolean
  searchQuery?: string
  dateRange?: {
    start: Date
    end: Date
  }
}

export class ArticleService {
  private static supabase = createClientComponentClient()

  /**
   * Fetch articles with filters and pagination
   */
  static async getArticles(
    filters: ArticleFilters = {},
    limit = 20,
    offset = 0
  ): Promise<{ articles: Article[]; total: number }> {
    try {
      let query = this.supabase
        .from('articles')
        .select(`
          *,
          source:sources (
            id,
            name,
            url,
            type
          ),
          notes:article_notes (
            id,
            content,
            tags
          )
        `)

      // Apply filters
      if (filters.sourceIds?.length) {
        query = query.in('source_id', filters.sourceIds)
      }

      if (filters.isRead !== undefined) {
        query = query.eq('is_read', filters.isRead)
      }

      if (filters.isFavorite !== undefined) {
        query = query.eq('is_favorite', filters.isFavorite)
      }

      if (filters.searchQuery) {
        query = query.or(
          `title.ilike.%${filters.searchQuery}%,content.ilike.%${filters.searchQuery}%`
        )
      }

      if (filters.dateRange) {
        query = query
          .gte('published_at', filters.dateRange.start.toISOString())
          .lte('published_at', filters.dateRange.end.toISOString())
      }

      // Get total count
      const { count } = await this.supabase
        .from('articles')
        .select('*', { count: 'exact', head: true })

      // Get paginated results
      const { data: articles, error } = await query
        .order('published_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) throw error

      return {
        articles: articles || [],
        total: count || 0
      }
    } catch (error) {
      console.error('Error fetching articles:', error)
      return { articles: [], total: 0 }
    }
  }

  /**
   * Mark article as read/unread
   */
  static async markAsRead(articleId: string, isRead = true, readingProgress = 0) {
    try {
      const { error } = await this.supabase
        .from('articles')
        .update({
          is_read: isRead,
          reading_progress: readingProgress,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error updating read status:', error)
      return { success: false, error }
    }
  }

  /**
   * Toggle favorite status
   */
  static async toggleFavorite(articleId: string, isFavorite: boolean) {
    try {
      const { error } = await this.supabase
        .from('articles')
        .update({
          is_favorite: isFavorite,
          updated_at: new Date().toISOString()
        })
        .eq('id', articleId)

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error updating favorite status:', error)
      return { success: false, error }
    }
  }

  /**
   * Save article notes
   */
  static async saveNotes(articleId: string, content: any, tags: string[]) {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) throw new Error('User not authenticated')

      const { error } = await this.supabase
        .from('article_notes')
        .upsert({
          article_id: articleId,
          user_id: user.id,
          content,
          tags,
          updated_at: new Date().toISOString()
        })

      if (error) throw error
      return { success: true }
    } catch (error) {
      console.error('Error saving notes:', error)
      return { success: false, error }
    }
  }

  /**
   * Get article statistics
   */
  static async getArticleStats(): Promise<{
    total: number
    unread: number
    favorites: number
    readToday: number
  }> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser()
      if (!user) return { total: 0, unread: 0, favorites: 0, readToday: 0 }

      const today = new Date()
      today.setHours(0, 0, 0, 0)

      const [totalRes, unreadRes, favoritesRes, readTodayRes] = await Promise.all([
        this.supabase.from('articles').select('id', { count: 'exact', head: true }),
        this.supabase.from('articles').select('id', { count: 'exact', head: true }).eq('is_read', false),
        this.supabase.from('articles').select('id', { count: 'exact', head: true }).eq('is_favorite', true),
        this.supabase
          .from('articles')
          .select('id', { count: 'exact', head: true })
          .eq('is_read', true)
          .gte('updated_at', today.toISOString())
      ])

      return {
        total: totalRes.count || 0,
        unread: unreadRes.count || 0,
        favorites: favoritesRes.count || 0,
        readToday: readTodayRes.count || 0
      }
    } catch (error) {
      console.error('Error fetching article stats:', error)
      return { total: 0, unread: 0, favorites: 0, readToday: 0 }
    }
  }
}