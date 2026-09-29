import { NextResponse } from 'next/server'

// Backend base for server-side route handlers: INTERNAL_API_URL is set in the
// frontend container (http://backends:8000). localhost:8001 does not exist there
// — see app/api/achievements/route.ts for the same policy. Dev fallback kept.
const API_BASE =
  process.env.INTERNAL_API_URL ||
  process.env.NEXT_PUBLIC_API_URL ||
  'http://localhost:8001'

/**
 * Public solver demo — lets visitors try the deterministic math solver
 * without signing up. No auth required.
 *
 * GET  /api/public/solver-demo/problem-types?class_level=10 — list problem types
 * POST /api/public/solver-demo/solve — solve a step
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const classLevel = searchParams.get('class_level') || '10'
  const stepType = searchParams.get('step_type')

  // If step_type is provided, fetch a specific step type definition
  if (stepType) {
    try {
      const res = await fetch(`${API_BASE}/api/solver/step-types/${stepType}`, {
        cache: 'no-store',
      })
      const data = await res.json()
      return NextResponse.json(data)
    } catch (error) {
      return NextResponse.json(
        { error: 'Failed to load step type', detail: String(error) },
        { status: 500 }
      )
    }
  }

  // Otherwise, fetch problem types from multiple class levels for variety
  try {
    const classLevels = [7, 8, 10, 12]
    const allTypes: Array<{ id: string; name: string; description: string; topic: string; class_level: string; example: string; num_steps: number }> = []

    await Promise.all(
      classLevels.map(async (cl) => {
        try {
          const res = await fetch(
            `${API_BASE}/api/solver/problem-types?class_level=${cl}`,
            { cache: 'no-store' }
          )
          const data = await res.json()
          for (const p of data.problem_types || []) {
            allTypes.push({
              id: p.id,
              name: p.name,
              description: p.description,
              topic: p.topic,
              class_level: p.class_level,
              example: p.example,
              num_steps: p.num_steps,
            })
          }
        } catch { /* skip failed class */ }
      })
    )

    // Curated subset — pick the most visual and varied problem types
    const wantedIds = [
      'solve_quadratic',              // Class 10 — algebra
      'pythagoras_hypotenuse_problem', // Class 7 — geometry
      'find_percentage_of',           // Class 7 — arithmetic
      'compound_interest_problem',    // Class 8 — commercial math
      'area_circle_problem',          // Class 7 — mensuration
      'arc_length_problem',           // Class 10 — mensuration
      'sector_area_problem',          // Class 10 — mensuration
      'volume_hemisphere_problem',    // Class 10 — 3D mensuration
      'standard_deviation_problem',   // Class 10 — statistics
    ]
    const demoTypes = allTypes.filter((p) => wantedIds.includes(p.id))

    // Sort by class level for a natural progression
    demoTypes.sort((a, b) => Number(a.class_level) - Number(b.class_level))

    return NextResponse.json({ problem_types: demoTypes, total: demoTypes.length })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to load problem types', detail: String(error) },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { step_type_id, inputs } = body

    if (!step_type_id || !inputs) {
      return NextResponse.json(
        { error: 'step_type_id and inputs are required' },
        { status: 400 }
      )
    }

    // Forward to the real solver — no auth needed for the demo
    const res = await fetch(`${API_BASE}/api/solver/solve/step`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ step_type_id, inputs }),
      cache: 'no-store',
    })

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to solve', detail: String(error) },
      { status: 500 }
    )
  }
}
