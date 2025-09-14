'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { SourceCard } from '@/components/features/sources/source-card'
import { AddSourceForm } from '@/components/features/sources/add-source-form'

interface Source {
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

export default function SourcesPage() {
  const [sources, setSources] = useState<Source[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSources = async () => {
      try {
        const response = await fetch('/api/sources')
        if (!response.ok) {
          throw new Error('Failed to fetch sources')
        }
        const data = await response.json()
        setSources(data.sources || [])
      } catch (error) {
        console.error('Error loading sources:', error)
        // Show empty state on error
        setSources([])
      } finally {
        setIsLoading(false)
      }
    }

    loadSources()
  }, [])

  const handleAddSource = async (sourceData: { name: string; url: string; type: 'rss' | 'website' }) => {
    try {
      const response = await fetch('/api/sources', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sourceData)
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.error || 'Failed to add source')
      }

      const data = await response.json()
      const newSource: Source = {
        id: data.source.id,
        name: data.source.name,
        url: data.source.url,
        type: data.source.type,
        status: data.source.status || 'pending',
        articleCount: 0,
        lastUpdated: data.source.created_at
      }

      setSources(prev => [newSource, ...prev])
      setShowAddForm(false)
      console.log('Added source:', newSource)
    } catch (error) {
      console.error('Error adding source:', error)
      throw error
    }
  }

  const handleRefreshSource = async (sourceId: string) => {
    try {
      const response = await fetch('/api/feeds', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId, forceRefresh: true })
      })

      if (!response.ok) {
        throw new Error('Failed to refresh source')
      }

      // Update source status to indicate refresh
      setSources(prev =>
        prev.map(source =>
          source.id === sourceId
            ? { ...source, status: 'pending', lastUpdated: new Date().toISOString() }
            : source
        )
      )

      console.log('Refreshing source:', sourceId)
    } catch (error) {
      console.error('Error refreshing source:', error)
    }
  }

  const handleEditSource = (sourceId: string) => {
    console.log('Editing source:', sourceId)
    // TODO: Implement source editing
  }

  const handleDeleteSource = async (sourceId: string) => {
    if (confirm('Are you sure you want to delete this source?')) {
      setSources(prev => prev.filter(source => source.id !== sourceId))
      console.log('Deleted source:', sourceId)
      // TODO: Implement actual deletion
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-10 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900">Sources</h1>
        <Button
          onClick={() => setShowAddForm(true)}
          className="w-full sm:w-auto"
        >
          Add Source
        </Button>
      </div>

      {showAddForm && (
        <AddSourceForm
          onAdd={handleAddSource}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {sources.length === 0 ? (
        <div className="text-center py-8 md:py-12">
          <div className="text-gray-400 text-4xl md:text-6xl mb-4">📡</div>
          <h3 className="text-base md:text-lg font-medium text-gray-900 mb-2">No sources added yet</h3>
          <p className="text-sm md:text-base text-gray-600 mb-4 px-4">
            Add your first RSS feed or website to start aggregating content
          </p>
          <Button
            onClick={() => setShowAddForm(true)}
            className="w-full sm:w-auto"
          >
            Add Your First Source
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {sources.map((source) => (
            <SourceCard
              key={source.id}
              source={source}
              onRefresh={handleRefreshSource}
              onEdit={handleEditSource}
              onDelete={handleDeleteSource}
            />
          ))}
        </div>
      )}
    </div>
  )
}