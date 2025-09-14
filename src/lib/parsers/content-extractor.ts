// Content extraction utilities using @mozilla/readability

export interface ExtractedContent {
  title: string
  content: string
  textContent: string
  length: number
  excerpt: string
  byline?: string // Author
  siteName?: string
  publishedTime?: Date
  lang?: string
  dir?: string
}

export class ContentExtractor {
  /**
   * Extract clean article content from HTML
   */
  static async extractFromHTML(html: string, url: string): Promise<ExtractedContent | null> {
    try {
      // TODO: Implement with @mozilla/readability and JSDOM
      // This requires server-side execution

      throw new Error('Content extraction not implemented yet - install @mozilla/readability and jsdom')

      // Example implementation:
      // const { JSDOM } = require('jsdom')
      // const { Readability } = require('@mozilla/readability')
      //
      // const dom = new JSDOM(html, { url })
      // const reader = new Readability(dom.window.document)
      // const article = reader.parse()
      //
      // if (!article) return null
      //
      // return {
      //   title: article.title,
      //   content: article.content,
      //   textContent: article.textContent,
      //   length: article.length,
      //   excerpt: article.excerpt,
      //   byline: article.byline,
      //   siteName: article.siteName,
      //   publishedTime: this.extractPublishedDate(html),
      //   lang: dom.window.document.documentElement.lang,
      //   dir: dom.window.document.documentElement.dir
      // }

    } catch (error) {
      console.error('Content extraction failed:', error)
      return null
    }
  }

  /**
   * Extract article content from URL
   */
  static async extractFromURL(url: string): Promise<ExtractedContent | null> {
    try {
      // TODO: Implement URL fetching and content extraction
      // 1. Fetch HTML content from URL
      // 2. Extract content using Readability
      // 3. Return structured content

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; FeedFlow/1.0; +https://feedflow.app/bot)'
        }
      })

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`)
      }

      const html = await response.text()
      return this.extractFromHTML(html, url)

    } catch (error) {
      console.error('URL extraction failed:', error)
      return null
    }
  }

  /**
   * Extract published date from HTML content
   */
  private static extractPublishedDate(html: string): Date | undefined {
    try {
      // Look for common date patterns in meta tags and JSON-LD
      const patterns = [
        /<meta[^>]*property="article:published_time"[^>]*content="([^"]*)"[^>]*>/i,
        /<meta[^>]*name="pubdate"[^>]*content="([^"]*)"[^>]*>/i,
        /<meta[^>]*name="date"[^>]*content="([^"]*)"[^>]*>/i,
        /<time[^>]*datetime="([^"]*)"[^>]*>/i
      ]

      for (const pattern of patterns) {
        const match = html.match(pattern)
        if (match && match[1]) {
          const date = new Date(match[1])
          if (!isNaN(date.getTime())) {
            return date
          }
        }
      }

      // TODO: Parse JSON-LD structured data for datePublished

      return undefined
    } catch (error) {
      return undefined
    }
  }

  /**
   * Generate excerpt from content
   */
  static generateExcerpt(content: string, maxLength = 200): string {
    try {
      // Remove HTML tags and normalize whitespace
      const cleanText = content
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()

      if (cleanText.length <= maxLength) {
        return cleanText
      }

      // Find the last complete sentence within the limit
      const truncated = cleanText.substring(0, maxLength)
      const lastSentence = truncated.lastIndexOf('.')
      const lastSpace = truncated.lastIndexOf(' ')

      const cutPoint = lastSentence > maxLength * 0.8 ? lastSentence + 1 : lastSpace

      return cutPoint > 0
        ? truncated.substring(0, cutPoint) + '...'
        : truncated + '...'

    } catch (error) {
      return content.substring(0, maxLength) + '...'
    }
  }

  /**
   * Extract images from content
   */
  static extractImages(content: string, baseUrl?: string): string[] {
    try {
      const images: string[] = []
      const imgRegex = /<img[^>]+src=["']([^"'>]+)["'][^>]*>/gi

      let match
      while ((match = imgRegex.exec(content)) !== null) {
        let src = match[1]

        // Convert relative URLs to absolute
        if (baseUrl && src.startsWith('/')) {
          const base = new URL(baseUrl)
          src = new URL(src, base.origin).toString()
        }

        images.push(src)
      }

      return images
    } catch (error) {
      return []
    }
  }

  /**
   * Detect content language
   */
  static detectLanguage(content: string): string | undefined {
    try {
      // TODO: Implement language detection
      // Could use a library like franc or langdetect
      // For now, return undefined

      return undefined
    } catch (error) {
      return undefined
    }
  }

  /**
   * Calculate reading time estimate
   */
  static calculateReadingTime(content: string, wordsPerMinute = 200): number {
    try {
      const wordCount = content
        .replace(/<[^>]*>/g, '')
        .split(/\s+/)
        .filter(word => word.length > 0).length

      return Math.ceil(wordCount / wordsPerMinute)
    } catch (error) {
      return 0
    }
  }
}