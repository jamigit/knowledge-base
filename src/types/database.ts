export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string | null
          preferences: any
          created_at: string
        }
        Insert: {
          id: string
          email?: string | null
          preferences?: any
          created_at?: string
        }
        Update: {
          id?: string
          email?: string | null
          preferences?: any
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          user_id: string
          name: string
          color: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          color?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          color?: string
          created_at?: string
        }
      }
      sources: {
        Row: {
          id: string
          user_id: string
          name: string
          url: string
          type: 'rss' | 'website'
          status: 'active' | 'error' | 'pending'
          last_updated: string | null
          error_message: string | null
          update_frequency: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          url: string
          type?: 'rss' | 'website'
          status?: 'active' | 'error' | 'pending'
          last_updated?: string | null
          error_message?: string | null
          update_frequency?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          url?: string
          type?: 'rss' | 'website'
          status?: 'active' | 'error' | 'pending'
          last_updated?: string | null
          error_message?: string | null
          update_frequency?: number
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          source_id: string
          title: string
          content: string | null
          excerpt: string | null
          url: string
          author: string | null
          published_at: string
          image_url: string | null
          is_favorite: boolean
          is_read: boolean
          reading_progress: number
          content_hash: string | null
          created_at: string
        }
        Insert: {
          id?: string
          source_id: string
          title: string
          content?: string | null
          excerpt?: string | null
          url: string
          author?: string | null
          published_at?: string
          image_url?: string | null
          is_favorite?: boolean
          is_read?: boolean
          reading_progress?: number
          content_hash?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          source_id?: string
          title?: string
          content?: string | null
          excerpt?: string | null
          url?: string
          author?: string | null
          published_at?: string
          image_url?: string | null
          is_favorite?: boolean
          is_read?: boolean
          reading_progress?: number
          content_hash?: string | null
          created_at?: string
        }
      }
      article_notes: {
        Row: {
          id: string
          article_id: string
          user_id: string
          content: any
          tags: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          article_id: string
          user_id: string
          content: any
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          article_id?: string
          user_id?: string
          content?: any
          tags?: string[]
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}