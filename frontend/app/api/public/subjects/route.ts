import { NextResponse } from 'next/server'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001'

export async function GET() {
  try {
    const res = await fetch(`${API_BASE}/api/content/subjects`, { cache: 'no-store' })
    const data = await res.json()

    const subjects = data.subjects || []

    // Group by subject name to get unique subjects with their class coverage
    const subjectMap: Record<string, {
      name: string
      boards: string[]
      classes: number[]
      icon_name: string
      color: string
    }> = {}

    for (const s of subjects) {
      if (!subjectMap[s.name]) {
        subjectMap[s.name] = {
          name: s.name,
          boards: [],
          classes: [],
          icon_name: s.icon_name || 'BookOpen',
          color: s.color || '#A78BFA',
        }
      }
      if (!subjectMap[s.name].boards.includes(s.board)) {
        subjectMap[s.name].boards.push(s.board)
      }
      if (!subjectMap[s.name].classes.includes(s.class_level)) {
        subjectMap[s.name].classes.push(s.class_level)
      }
    }

    // Sort classes
    for (const key of Object.keys(subjectMap)) {
      subjectMap[key].classes.sort((a, b) => a - b)
    }

    return NextResponse.json({
      subjects: Object.values(subjectMap),
      total: Object.keys(subjectMap).length,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch subjects', detail: String(error) },
      { status: 500 }
    )
  }
}
