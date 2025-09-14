'use client'

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

interface Article {
  id: string
  title: string
  content?: string
  excerpt?: string
  url: string
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

export default function ArticleDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [article, setArticle] = useState<Article | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadArticle = async () => {
      try {
        const response = await fetch(`/api/articles/${params.id}`)
        if (!response.ok) {
          throw new Error('Article not found')
        }
        const data = await response.json()
        setArticle(data.article)
      } catch (error) {
        console.error('Error loading article:', error)
        setError('Failed to load article')
      } finally {
        setIsLoading(false)
      }
    }

    if (params.id) {
      loadArticle()
    }
  }, [params.id])

  const handleToggleFavorite = async () => {
    if (!article) return

    try {
      const response = await fetch(`/api/articles/${article.id}/favorite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isFavorite: !article.isFavorite })
      })

      if (response.ok) {
        setArticle(prev => prev ? { ...prev, isFavorite: !prev.isFavorite } : null)
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const handleMarkAsRead = async () => {
    if (!article) return

    try {
      const response = await fetch(`/api/articles/${article.id}/read`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isRead: true })
      })

      if (response.ok) {
        setArticle(prev => prev ? { ...prev, isRead: true } : null)
      }
    } catch (error) {
      console.error('Error marking as read:', error)
    }
  }

  const handleOpenOriginal = () => {
    if (article?.url) {
      window.open(article.url, '_blank', 'noopener,noreferrer')
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-64 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>
    )
  }

  if (error || !article) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">❌</div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">Article not found</h3>
        <p className="text-gray-600 mb-4">{error || 'The article you are looking for could not be found.'}</p>
        <Button onClick={() => router.push('/feed')}>
          Back to Feed
        </Button>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          ← Back
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={handleToggleFavorite}
            className={article.isFavorite ? 'text-red-600 border-red-600' : ''}
          >
            ♥ {article.isFavorite ? 'Favorited' : 'Favorite'}
          </Button>

          {!article.isRead && (
            <Button
              variant="outline"
              onClick={handleMarkAsRead}
            >
              Mark as Read
            </Button>
          )}

          <Button onClick={handleOpenOriginal}>
            Open Original
          </Button>
        </div>
      </div>

      {/* Article Content */}
      <Card className="p-6">
        {article.imageUrl && (
          <div className="w-full h-64 mb-6 rounded-lg overflow-hidden">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {article.title}
        </h1>

        <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-6 border-b">
          <span className="font-medium">{article.source.name}</span>
          {article.author && <span>by {article.author}</span>}
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
          {article.isRead && (
            <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
              Read
            </span>
          )}
        </div>

        <div className="prose prose-gray max-w-none">
          {article.content ? (
            <div dangerouslySetInnerHTML={{ __html: article.content }} />
          ) : (
            <div className="text-gray-600">
              <p className="mb-4">{article.excerpt || 'No content available for this article.'}</p>
              <p>
                <Button onClick={handleOpenOriginal} variant="outline">
                  Read full article on {article.source.name}
                </Button>
              </p>
            </div>
          )}
        </div>
      </Card>
    </div>
  )
}