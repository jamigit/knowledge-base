'use client'

import { useState } from 'react'

export default function SearchPage() {
  const [query, setQuery] = useState('')

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Search</h1>
        <p className="text-gray-600 mt-2">
          Search through your articles and sources
        </p>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search articles, sources, or topics..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <button className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Search
        </button>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <div className="text-center text-gray-500">
          {query ? (
            <p>Search results for "{query}" will appear here</p>
          ) : (
            <p>Enter a search term to find articles and sources</p>
          )}
        </div>
      </div>
    </div>
  )
}