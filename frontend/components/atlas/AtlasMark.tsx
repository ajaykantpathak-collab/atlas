'use client'

/**
 * AtlasMark — the Atlas logo.
 *
 * A miniature galaxy: nodes laid on a golden-angle spiral (the same
 * phyllotaxis a real spiral galaxy approximates), linked by faint
 * connections, with a bright core. Every dot is a concept; the swirl is
 * the syllabus. Deterministic — no Math.random — so SSR and client
 * render identically.
 *
 * Replaces the old PrismLogo orb everywhere.
 */

const PALETTE = ['#fbbf24', '#6366f1', '#8b5cf6', '#10b981', '#ec4899', '#22d3ee']

interface AtlasMarkProps {
  size?: number
  className?: string
  /** show the "Atlas" wordmark next to the mark */
  wordmark?: boolean
}

export function AtlasMark({ size = 32, className = '', wordmark = false }: AtlasMarkProps) {
  // Golden-angle spiral — deterministic positions, ~18 nodes
  const N = 18
  const GOLDEN = 2.399963
  const nodes = Array.from({ length: N }, (_, i) => {
    const r = 4 + (i / N) * 15               // radius 4..19 in a 48 viewBox
    const a = i * GOLDEN
    return {
      x: 24 + Math.cos(a) * r,
      y: 24 + Math.sin(a) * r,
      color: PALETTE[i % PALETTE.length],
      size: i === 0 ? 2.6 : 1.1 + (i % 3) * 0.35,   // bright core + varied stars
    }
  })
  // spiral-arm connectors: each node links to the node ~2 back (a visible arm)
  const links = nodes.slice(2).map((n, i) => ({ a: nodes[i], b: n }))

  const mark = (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      role="img"
      aria-label="Atlas"
      className="overflow-visible"
    >
      <defs>
        <radialGradient id="atlas-mark-core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="45%" stopColor="#fbbf24" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#fbbf24" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="atlas-mark-ring" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0.9" />
        </linearGradient>
      </defs>

      {/* halo */}
      <circle cx="24" cy="24" r="13" fill="url(#atlas-mark-core)" />

      {/* orbit ring */}
      <circle
        cx="24" cy="24" r="21.5" fill="none"
        stroke="url(#atlas-mark-ring)" strokeWidth="0.9" opacity="0.55"
        strokeDasharray="2.5 3.5"
      />

      {/* arm connectors */}
      {links.map((l, i) => (
        <line
          key={i}
          x1={l.a.x} y1={l.a.y} x2={l.b.x} y2={l.b.y}
          stroke="#64748b" strokeWidth="0.4" opacity="0.35"
        />
      ))}

      {/* stars */}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.size} fill={n.color} />
      ))}

      {/* core */}
      <circle cx="24" cy="24" r="1.6" fill="#fffbeb" />
    </svg>
  )

  if (!wordmark) return <span className={`inline-flex ${className}`}>{mark}</span>
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {mark}
      <span className="font-display text-lg font-bold text-white tracking-tight">Atlas</span>
    </span>
  )
}

export default AtlasMark
