'use client'

/**
 * AtlasGalaxy — the real 9,010-node knowledge galaxy on a 2D canvas.
 *
 * Renders public/galaxy.json (the same precomputed 3D layout the /galaxy
 * 3D page uses) with a slow Y-rotation, perspective tilt, subject-spectrum
 * colours, depth shading and twinkle. One shared fetch caches the data for
 * every instance on the page.
 *
 * Drop-in replacement for GoldenGalaxy: `<AtlasGalaxy className compact />`.
 */
import { useEffect, useRef } from 'react'

/* subject code -> colour (spectrum, matches the app's design tokens) */
const SUBJ_COLORS: Record<string, string> = {
  math: '#fbbf24', maths: '#fbbf24', acc: '#f59e0b', bs: '#fb923c',
  phy: '#6366f1', physics: '#6366f1',
  chem: '#d946ef', chemistry: '#d946ef',
  bio: '#10b981', biology: '#10b981', biotech: '#34d399',
  eng: '#ec4899', engl: '#ec4899', english: '#ec4899',
  eng_f: '#f472b6', eng_k: '#f472b6', eng_s: '#f9a8d4', eng_v: '#f9a8d4', eng_w: '#fb7185',
  gram: '#fb7185', hin_a: '#f43f5e', hin_al: '#f43f5e', hin_ar: '#e11d48', hin_v: '#e11d48',
  hist: '#a78bfa', history: '#a78bfa', civ: '#8b5cf6', civics: '#8b5cf6',
  geo: '#2dd4bf', geography: '#2dd4bf', psy: '#c084fc', soc: '#94a3b8',
  eco: '#fde047', economics: '#fde047', ca: '#4ade80', comp: '#22d3ee',
  cs: '#22d3ee', ip: '#38bdf8', stat: '#facc15', ps: '#818cf8', hs: '#f0abfc', sst: '#fda4af',
}
const FALLBACK = '#64748b'

interface GNode { id: string; subj: string; pos: [number, number, number] }
interface GalaxyData { nodes: GNode[] }

let _dataPromise: Promise<GalaxyData> | null = null
function loadGalaxy(): Promise<GalaxyData> {
  if (!_dataPromise) {
    _dataPromise = fetch('/galaxy.json')
      .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
      .catch(() => ({ nodes: [] }))
  }
  return _dataPromise
}

/* cheap deterministic hash → per-star phase */
function hash01(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0
  return (h % 10000) / 10000
}

interface AtlasGalaxyProps {
  className?: string
  /** compact = sampled + no animation (cards, tight corners) */
  compact?: boolean
  /** max stars to draw (default: all 9,010) */
  maxNodes?: number
  /** spin speed, radians/sec (default 0.03 — one lap ≈ 3.5 min) */
  spin?: number
}

export function AtlasGalaxy({ className = '', compact = false, maxNodes, spin = 0.03 }: AtlasGalaxyProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    let disposed = false
    let stars: { x: number; y: number; z: number; c: string; r: number; tw: number; tp: number }[] = []

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    loadGalaxy().then(data => {
      if (disposed || !data.nodes.length) return
      let list = data.nodes
      if (compact || (maxNodes && list.length > maxNodes)) {
        const cap = maxNodes ?? 1200
        const step = Math.max(1, Math.floor(list.length / cap))
        list = list.filter((_, i) => i % step === 0)
      }
      stars = list.map(n => ({
        x: n.pos[0], y: n.pos[1], z: n.pos[2],
        c: SUBJ_COLORS[n.subj] ?? FALLBACK,
        r: 0.8 + hash01(n.id) * 1.1,
        tw: 0.5 + hash01(n.id + 't') * 1.4,
        tp: hash01(n.id + 'p') * Math.PI * 2,
      }))
    })

    const TILT = 0.62 // rad — tip the disc so the spiral reads
    const cosT = Math.cos(TILT), sinT = Math.sin(TILT)

    const draw = (t: number) => {
      const w = canvas.width, h = canvas.height
      if (!w || !h) { raf = requestAnimationFrame(draw); return }
      ctx.clearRect(0, 0, w, h)

      // background nebula wash
      const bg = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.5)
      bg.addColorStop(0, 'rgba(30,27,75,0.35)')
      bg.addColorStop(0.6, 'rgba(12,10,30,0.15)')
      bg.addColorStop(1, 'rgba(0,0,0,0)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      if (stars.length) {
        const cx = w / 2, cy = h / 2
        const scale = Math.min(w, h) / 520          // world ±235 → viewport
        const rot = compact ? 0.4 : t * spin * 0.001
        const cosR = Math.cos(rot), sinR = Math.sin(rot)
        const persp = 620                            // fake perspective distance

        // bright core glow
        const core = ctx.createRadialGradient(cx, cy, 0, cx, cy, 60 * dpr)
        core.addColorStop(0, 'rgba(253,230,138,0.5)')
        core.addColorStop(1, 'rgba(253,230,138,0)')
        ctx.fillStyle = core
        ctx.beginPath(); ctx.arc(cx, cy, 60 * dpr, 0, Math.PI * 2); ctx.fill()

        for (const s of stars) {
          // rotate around Y, tilt around X, project
          const rx = s.x * cosR - s.z * sinR
          const rz = s.x * sinR + s.z * cosR
          const ry = s.y * cosT - rz * sinT * 0.35
          const depth = persp / (persp + rz * cosT)   // 0.6..1.5
          const sx = cx + rx * scale * depth
          const sy = cy + ry * scale * depth
          const tw = compact ? 1 : 0.7 + 0.3 * Math.sin(t * 0.001 * s.tw + s.tp)
          const size = s.r * depth * dpr
          ctx.globalAlpha = Math.min(1, 0.45 * depth * tw + 0.15)
          ctx.fillStyle = s.c
          ctx.beginPath(); ctx.arc(sx, sy, Math.max(0.4, size), 0, Math.PI * 2); ctx.fill()
        }
        ctx.globalAlpha = 1
      }

      if (!disposed) raf = requestAnimationFrame(draw)
    }
    raf = requestAnimationFrame(draw)

    return () => { disposed = true; cancelAnimationFrame(raf); ro.disconnect() }
  }, [compact, maxNodes, spin])

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />
}

export default AtlasGalaxy
