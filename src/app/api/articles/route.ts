import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { ArticleService } from '@/lib/services/article-service'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const limit = parseInt(searchParams.get('limit') || '20')
    const offset = parseInt(searchParams.get('offset') || '0')

    // Get filter parameters
    const filters: any = {}
    const isRead = searchParams.get('isRead')
    const isFavorite = searchParams.get('isFavorite')
    const sourceId = searchParams.get('sourceId')
    const searchQuery = searchParams.get('search')

    if (isRead !== null) filters.isRead = isRead === 'true'
    if (isFavorite !== null) filters.isFavorite = isFavorite === 'true'
    if (sourceId) filters.sourceId = sourceId
    if (searchQuery) filters.searchQuery = searchQuery

    const result = await ArticleService.getArticles(filters, limit, offset)

    return NextResponse.json(result)
  } catch (error) {
    console.error('Error fetching articles:', error)
    return NextResponse.json(
      { error: 'Failed to fetch articles' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // TODO: Implement article creation/import logic
    // This will handle adding new articles or RSS feeds

    return NextResponse.json({
      message: 'Article creation endpoint ready for implementation',
      received: body
    })
  } catch (error) {
    console.error('Error creating article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }
}