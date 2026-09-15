import { NextResponse } from 'next/server'
import { getEnrichmentNode } from '@/lib/markerParser'

// GET /api/local/enrichment/{nodeId}
// Returns full enrichment content for a single node

export async function GET(
  _request: Request,
  { params }: { params: { nodeId: string } }
) {
  try {
    const nodeId = params.nodeId
    if (!nodeId) {
      return NextResponse.json({ error: 'nodeId is required' }, { status: 400 })
    }

    const node = getEnrichmentNode(nodeId)
    if (!node) {
      return NextResponse.json({ error: 'Node not found' }, { status: 404 })
    }

    return NextResponse.json({
      node_id: node.node_id,
      title: node.title,
      subject: node.subject,
      class_level: node.class_level,
      definition: node.definition,
      eli5: node.eli5,
      text_walkthrough: node.text_walkthrough,
      common_misconception: node.common_misconception,
      diagnostic_question: node.diagnostic_question,
      on_failure: node.on_failure,
      cognitive_level: node.cognitive_level,
      mastery_criteria: node.mastery_criteria,
      scope_boundary: node.scope_boundary,
      source_file: node.source_file,
      source: 'local',
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch enrichment', detail: String(error) },
      { status: 500 }
    )
  }
}
