'use client'

import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'

interface ArticleCardProps {
  article: {
    id: string
    title: string
    excerpt?: string
    author?: string
    publishedAt: string
    imageUrl?: string
    isRead: boolean
    isFavorite: boolean
    source: {
      name: string
      url: string
    }
  }
  onRead?: (articleId: string) => void
  onFavorite?: (articleId: string) => void
}

export function ArticleCard({ article, onRead, onFavorite }: ArticleCardProps) {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/articles/${article.id}`)
  }

  return (
    <Card className="p-4 hover:shadow-md transition-shadow cursor-pointer" onClick={handleClick}>
      <div className="flex gap-3 md:gap-4">
        {article.imageUrl && (
          <div className="w-16 h-16 md:w-20 md:h-20 flex-shrink-0">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover rounded-md"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          <h3 className={`text-base md:text-lg font-semibold line-clamp-2 ${
            article.isRead ? 'text-gray-600' : 'text-gray-900'
          }`}>
            {article.title}
          </h3>

          {article.excerpt && (
            <p className="text-gray-600 text-sm mt-1 line-clamp-2 hidden sm:block">
              {article.excerpt}
            </p>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-2 gap-2">
            <div className="text-xs text-gray-500 truncate">
              <span className="font-medium">{article.source.name}</span>
              {article.author && <span className="hidden sm:inline"> • {article.author}</span>}
              <span> • {new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onFavorite?.(article.id)
                }}
                className={`text-sm px-2 py-1 rounded transition-colors ${
                  article.isFavorite
                    ? 'text-red-600 bg-red-50'
                    : 'text-gray-500 hover:text-red-600'
                }`}
                aria-label={article.isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                ♥
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  onRead?.(article.id)
                }}
                className="text-xs sm:text-sm text-blue-600 hover:text-blue-800 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
              >
                {article.isRead ? 'Read' : 'Mark Read'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}