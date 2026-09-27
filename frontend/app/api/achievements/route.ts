import { NextResponse } from 'next/server'

// Server-side route handler: resolve the backend from INSIDE the frontend
// container (localhost:8001 does not exist there — the backends are
// backend-1/backend-2 on the docker network).
const API_BASE =
  process.env.INTERNAL_API_URL || 'http://backend-1:8000'

/**
 * Same-origin proxy for GET /api/achievements.
 *
 * The backend serves this route ONLY with a trailing slash and 307-redirects
 * the bare path with an ABSOLUTE Location (http://localhost:8001/...). A
 * browser fetch refused to follow that cross-origin hop (CORS), so the
 * dashboard's achievements widget broke; Next's trailing-slash normalization
 * also made the slash-correct URL unreachable from the client. This handler
 * performs the slash-correct backend call server-side — where redirects and
 * CORS don't apply — and forwards the caller's Authorization header.
 */
export async function GET(req: Request) {
  const auth = req.headers.get('authorization') ?? undefined
  const filter = new URL(req.url).searchParams.get('filter') ?? 'all'
  try {
    const upstream = await fetch(
      `${API_BASE}/api/achievements/?filter=${encodeURIComponent(filter)}`,
      { headers: auth ? { Authorization: auth } : undefined, cache: 'no-store' }
    )
    const data = await upstream.json().catch(() => null)
    return NextResponse.json(data ?? { error: 'Upstream returned no JSON' }, {
      status: upstream.status,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Achievements upstream failed', detail: String(error) },
      { status: 502 }
    )
  }
}
