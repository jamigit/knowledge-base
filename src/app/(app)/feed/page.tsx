'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ArticleCard } from '@/components/features/articles/article-card'

interface Article {
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

export default function FeedPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isRefreshing, setIsRefreshing] = useState(false)

  useEffect(() => {
    loadArticles()
  }, [])

  const loadArticles = async () => {
    try {
      const response = await fetch('/api/articles')
      if (!response.ok) {
        throw new Error('Failed to fetch articles')
      }
      const data = await response.json()
      setArticles(data.articles || [])
    } catch (error) {
      console.error('Error loading articles:', error)
      // Show empty state on error
      setArticles([])
    } finally {
      setIsLoading(false)
    }
  }

  const handleRefresh = async () => {
    setIsRefreshing(true)
    await loadArticles()
    setIsRefreshing(false)
  }

  const handleMarkAsRead = (articleId: string) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? { ...article, isRead: !article.isRead }
          : article
      )
    )
    console.log('Toggled read status for article:', articleId)
  }

  const handleToggleFavorite = (articleId: string) => {
    setArticles(prev =>
      prev.map(article =>
        article.id === articleId
          ? { ...article, isFavorite: !article.isFavorite }
          : article
      )
    )
    console.log('Toggled favorite status for article:', articleId)
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-20 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Your Feed</h1>
        <Button onClick={handleRefresh} loading={isRefreshing} variant="outline">
          {isRefreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {articles.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">📰</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No articles yet</h3>
          <p className="text-gray-600 mb-4">
            Add some sources to start seeing articles in your feed
          </p>
          <Button onClick={() => window.location.href = '/sources'}>
            Add Sources
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <ArticleCard
              key={article.id}
              article={article}
              onRead={handleMarkAsRead}
              onFavorite={handleToggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  )
}