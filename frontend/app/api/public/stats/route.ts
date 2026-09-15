import { NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function GET() {
  try {
    const [statsRes, subjectsRes] = await Promise.all([
      fetch(`${API_BASE}/api/graph/stats`, { cache: 'no-store' }),
      fetch(`${API_BASE}/api/content/subjects`, { cache: 'no-store' }),
    ])

    const stats = await statsRes.json()
    const subjectsData = await subjectsRes.json()

    // Count unique subjects and classes from the subjects endpoint
    const subjects = subjectsData.subjects || []
    const uniqueSubjectNames = new Set(subjects.map((s: { name: string }) => s.name))
    const uniqueClasses = new Set(subjects.map((s: { class_level: number }) => s.class_level))
    const boards = new Set(subjects.map((s: { board: string }) => s.board))

    // Count enrichment nodes across all subjects
    // Use limit=1 to get the total count without fetching all nodes
    const subjectNames = ['physics', 'chemistry', 'biology', 'mathematics']
    let totalEnrichment = 0
    const enrichmentCounts: Record<string, number> = {}

    await Promise.all(
      subjectNames.map(async (subj) => {
        try {
          const res = await fetch(
            `${API_BASE}/api/content/enrichment?subject=${subj}&limit=1`,
            { cache: 'no-store' }
          )
          const data = await res.json()
          const count = data.total || 0
          enrichmentCounts[subj] = count
          totalEnrichment += count
        } catch {
          enrichmentCounts[subj] = 0
        }
      })
    )

    return NextResponse.json({
      total_nodes: stats.total_nodes || 0,
      total_edges: stats.total_edges || 0,
      subjects: uniqueSubjectNames.size,
      classes: uniqueClasses.size,
      boards: boards.size,
      board_names: Array.from(boards),
      enrichment_nodes: totalEnrichment,
      enrichment_by_subject: enrichmentCounts,
      // Graph stats from Neo4j
      graph_nodes: stats.total_nodes || 0,
      graph_edges: stats.total_edges || 0,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch stats', detail: String(error) },
      { status: 500 }
    )
  }
}
