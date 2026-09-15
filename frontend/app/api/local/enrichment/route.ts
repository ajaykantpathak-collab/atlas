import { NextResponse } from 'next/server'
import { getEnrichmentList } from '@/lib/markerParser'

// GET /api/local/enrichment?subject=maths&class_level=1
// Returns list of enrichment node summaries (replaces backend /api/content/enrichment)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const subject = searchParams.get('subject') || 'maths'
    const classLevel = parseInt(searchParams.get('class_level') || '1', 10)
    const limit = parseInt(searchParams.get('limit') || '200', 10)

    const nodes = getEnrichmentList(subject, classLevel)
    const limited = nodes.slice(0, limit)

    return NextResponse.json({
      nodes: limited,
      total: nodes.length,
      source: 'local',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load enrichment list', detail: String(error) },
      { status: 500 }
    )
  }
}
