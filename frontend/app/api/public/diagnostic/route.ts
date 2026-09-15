import { NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

/**
 * Public diagnostic scan — finds prerequisite gaps for a target topic.
 * No auth required — this is a public endpoint for the landing page diagnostic flow.
 *
 * POST body: { topic: string, subject?: string, class_level?: number }
 * Returns: { target_node, gaps: [...], path: [...] }
 */
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { topic, subject, class_level } = body

    if (!topic) {
      return NextResponse.json({ error: 'topic is required' }, { status: 400 })
    }

    // Step 1: Search for the target node
    const searchParams = new URLSearchParams({ q: topic })
    if (class_level) searchParams.set('class_level', String(class_level))

    const searchRes = await fetch(
      `${API_BASE}/api/graph/search?${searchParams.toString()}`,
      { cache: 'no-store' }
    )
    const searchData = await searchRes.json()

    if (!searchData.nodes || searchData.nodes.length === 0) {
      return NextResponse.json({
        error: 'Topic not found in the curriculum graph',
        topic,
      }, { status: 404 })
    }

    // Pick the best matching node (highest score)
    const targetNode = searchData.nodes[0]
    const nodeId = targetNode.props.node_id

    // Step 2: Find gaps (what prerequisites are missing)
    const gapsRes = await fetch(`${API_BASE}/api/graph/gaps`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_node_id: nodeId,
        mastered_node_ids: [],
        max_depth: 10,
      }),
      cache: 'no-store',
    })
    const gapsData = await gapsRes.json()

    // Step 3: Get the learning path
    const pathRes = await fetch(`${API_BASE}/api/graph/path`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        target_node_id: nodeId,
        mastered_node_ids: [],
        max_depth: 10,
      }),
      cache: 'no-store',
    })
    const pathData = await pathRes.json()

    // Deduplicate gaps by node_id and sort by depth
    const seenNodes = new Set<string>()
    const uniqueGaps = (gapsData.gaps || []).filter((g: { node_id: string }) => {
      if (seenNodes.has(g.node_id)) return false
      seenNodes.add(g.node_id)
      return true
    }).sort((a: { depth: number }, b: { depth: number }) => a.depth - b.depth)

    // Deduplicate path
    const seenPath = new Set<string>()
    const uniquePath = (pathData.path || []).filter((p: { node_id: string }) => {
      if (seenPath.has(p.node_id)) return false
      seenPath.add(p.node_id)
      return true
    })

    return NextResponse.json({
      target_node: {
        node_id: nodeId,
        topic: targetNode.props.topic,
        class_level: targetNode.props.class_level,
        subject: targetNode.props.subject,
        board: targetNode.props.board,
      },
      gaps: uniqueGaps.slice(0, 20).map((g: { node_id: string; topic: string; class_level: number; subject: string; depth: number; is_root: boolean }) => ({
        node_id: g.node_id,
        topic: g.topic,
        class_level: g.class_level,
        subject: g.subject,
        depth: g.depth,
        is_root: g.is_root,
      })),
      gap_count: uniqueGaps.length,
      path: uniquePath.slice(0, 15).map((p: { node_id: string; topic: string; class_level: number; subject: string; depth: number }) => ({
        node_id: p.node_id,
        topic: p.topic,
        class_level: p.class_level,
        subject: p.subject,
        depth: p.depth,
      })),
      path_length: uniquePath.length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to run diagnostic', detail: String(error) },
      { status: 500 }
    )
  }
}
