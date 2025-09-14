'use client'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface SourceCardProps {
  source: {
    id: string
    name: string
    url: string
    type: 'rss' | 'website'
    status: 'active' | 'error' | 'pending'
    lastUpdated?: string
    errorMessage?: string
    articleCount?: number
    categories?: Array<{
      id: string
      name: string
      color: string
    }>
  }
  onEdit?: (sourceId: string) => void
  onDelete?: (sourceId: string) => void
  onRefresh?: (sourceId: string) => void
}

export function SourceCard({ source, onEdit, onDelete, onRefresh }: SourceCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50'
      case 'error': return 'text-red-600 bg-red-50'
      case 'pending': return 'text-yellow-600 bg-yellow-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-gray-900">{source.name}</h3>
          <p className="text-sm text-gray-600 truncate">{source.url}</p>
        </div>

        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(source.status)}`}>
            {source.status}
          </span>
          <span className="text-xs px-2 py-1 bg-blue-50 text-blue-600 rounded-full">
            {source.type}
          </span>
        </div>
      </div>

      {source.categories && source.categories.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {source.categories.map((category) => (
            <span
              key={category.id}
              className="text-xs px-2 py-1 rounded-full text-white"
              style={{ backgroundColor: category.color }}
            >
              {category.name}
            </span>
          ))}
        </div>
      )}

      {source.status === 'error' && source.errorMessage && (
        <div className="text-sm text-red-600 mb-3 p-2 bg-red-50 rounded">
          {source.errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
        <span>
          {source.articleCount || 0} articles
        </span>
        {source.lastUpdated && (
          <span>
            Updated {new Date(source.lastUpdated).toLocaleDateString()}
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => onRefresh?.(source.id)}
          className="flex-1"
        >
          Refresh
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onEdit?.(source.id)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => onDelete?.(source.id)}
          className="text-red-600 hover:text-red-700"
        >
          Delete
        </Button>
      </div>
    </Card>
  )
}