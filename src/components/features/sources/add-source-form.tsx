'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

interface AddSourceFormProps {
  onAdd?: (source: { name: string; url: string; type: 'rss' | 'website' }) => void
  onCancel?: () => void
}

export function AddSourceForm({ onAdd, onCancel }: AddSourceFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    url: '',
    type: 'rss' as 'rss' | 'website'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Source name is required'
    }

    if (!formData.url.trim()) {
      newErrors.url = 'URL is required'
    } else {
      try {
        new URL(formData.url)
      } catch {
        newErrors.url = 'Please enter a valid URL'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsSubmitting(true)

    try {
      // Call the onAdd function passed from parent
      await onAdd?.(formData)

      // Reset form on success
      setFormData({ name: '', url: '', type: 'rss' })
      setErrors({})
    } catch (error) {
      console.error('Error adding source:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Add New Source</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Source Name"
          placeholder="e.g., TechCrunch, Personal Blog"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          error={errors.name}
        />

        <Input
          label="URL"
          placeholder="https://example.com/feed or https://example.com"
          value={formData.url}
          onChange={(e) => setFormData({ ...formData, url: e.target.value })}
          error={errors.url}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source Type
          </label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="rss"
                checked={formData.type === 'rss'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'rss' | 'website' })}
                className="mr-2"
              />
              RSS Feed
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="type"
                value="website"
                checked={formData.type === 'website'}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'rss' | 'website' })}
                className="mr-2"
              />
              Website
            </label>
          </div>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            loading={isSubmitting}
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? 'Adding...' : 'Add Source'}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
          )}
        </div>
      </form>
    </Card>
  )
}