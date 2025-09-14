import { NextRequest, NextResponse } from 'next/server'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function GET(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: sources, error } = await supabase
      .from('sources')
      .select(`
        *,
        source_categories (
          categories (*)
        )
      `)
      .eq('user_id', session.user.id)

    if (error) throw error

    return NextResponse.json({ sources })
  } catch (error) {
    console.error('Error fetching sources:', error)
    return NextResponse.json(
      { error: 'Failed to fetch sources' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies })

    const { data: { session } } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()
    const { name, url, type, categoryIds } = body

    // TODO: Add validation schema
    if (!name || !url || !type) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    const { data: source, error } = await supabase
      .from('sources')
      .insert({
        user_id: session.user.id,
        name,
        url,
        type,
        status: 'pending'
      })
      .select()
      .single()

    if (error) throw error

    // TODO: Add categories association
    // TODO: Trigger initial feed parsing

    return NextResponse.json({ source })
  } catch (error) {
    console.error('Error creating source:', error)
    return NextResponse.json(
      { error: 'Failed to create source' },
      { status: 500 }
    )
  }
}