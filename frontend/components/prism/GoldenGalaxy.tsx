'use client'

import { useRef, useEffect } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   GoldenGalaxy — one object. Black and gold.

   The Atlas centerpiece: a single monumental spiral galaxy rendered in
   gold light on deep black — the Lumen cosmos reborn in a monochrome
   luxury palette. ~7,000 additive-light particles in a two-arm spiral
   with differential rotation, a breathing white-gold core, thin orbit
   rings, and rare comets crossing the disc.

   Canvas 2D, pre-rendered glow sprites, ~60fps everywhere.
   `compact` renders the same object smaller and quieter for the hero
   mockup card.
   ═══════════════════════════════════════════════════════════════════════════ */

const SQUASH = 0.52          // disc tilt (y squash)
const CORE_FRAC = 0.16       // particles in the central bulge
const ARMS = 2
const PITCH = 0.30           // log-spiral tightness
const SHEAR = 0.45           // rotation curve exponent (mild — arms persist)
const BASE_W = 0.16          // angular speed at the edge
const COMETS = 3

function rng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0
    return s / 4294967296
  }
}

// gold temperature by radius: core = white-gold, edge = deep amber
function goldRgb(t: number): [number, number, number] {
  // t 0 (core) → 1 (edge)
  const r = Math.round(255 - 40 * t)
  const g = Math.round(226 - 110 * t)
  const b = Math.round(160 - 110 * t)
  return [r, g, b]
}

function makeSprite(rgb: [number, number, number], size: number): HTMLCanvasElement {
  const c = document.createElement('canvas')
  c.width = c.height = size
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  grad.addColorStop(0, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`)
  grad.addColorStop(0.22, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.55)`)
  grad.addColorStop(0.55, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.14)`)
  grad.addColorStop(1, `rgba(${rgb[0]},${rgb[1]},${rgb[2]},0)`)
  g.fillStyle = grad
  g.fillRect(0, 0, size, size)
  return c
}

export function GoldenGalaxy({ className = '', compact = false }: { className?: string; compact?: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const rand = rng(77202609)
    const COUNT = compact ? 2600 : 7200
    const dustCount = compact ? 130 : 420
    const ringCount = compact ? 2 : 3

    // ── build the galaxy ──
    interface Star {
      r: number        // 0..1 disc radius
      a0: number       // base angle (includes arm winding)
      speed: number    // angular speed (differential)
      size: number
      tw: number       // twinkle phase
      thick: number    // vertical offset factor
      bright: number
    }
    const stars: Star[] = []
    const coreCount = Math.floor(COUNT * CORE_FRAC)
    for (let i = 0; i < coreCount; i++) {
      const r = Math.pow(rand(), 1.9) * 0.20
      stars.push({
        r,
        a0: rand() * Math.PI * 2,
        speed: BASE_W * 2.6 / Math.pow(0.28 + r, SHEAR),
        size: 1.1 + rand() * 1.6,
        tw: rand() * Math.PI * 2,
        thick: (rand() - 0.5) * 0.05,
        bright: 0.85 + rand() * 0.15,
      })
    }
    const armCount = COUNT - coreCount
    for (let i = 0; i < armCount; i++) {
      const inArm = rand() < 0.78
      let r: number, a0: number
      if (inArm) {
        const t = Math.pow(rand(), 0.62)
        r = 0.14 + t * 0.86
        const arm = i % ARMS
        const jitter = (rand() - 0.5) * (0.16 + t * 0.30)
        a0 = (arm / ARMS) * Math.PI * 2 + Math.log(r / 0.14) / PITCH + jitter
      } else {
        r = 0.14 + Math.pow(rand(), 0.7) * 0.86
        a0 = rand() * Math.PI * 2
      }
      stars.push({
        r,
        a0,
        speed: BASE_W * 2.6 / Math.pow(0.28 + r, SHEAR),
        size: 0.7 + rand() * 1.7,
        tw: rand() * Math.PI * 2,
        thick: (rand() - 0.5) * (0.05 + r * 0.035),
        bright: 0.35 + rand() * 0.65,
      })
    }

    const dust: { x: number; y: number; s: number; a: number; p: number }[] = []
    for (let i = 0; i < dustCount; i++) {
      dust.push({ x: rand(), y: rand(), s: 0.5 + rand() * 1.3, a: 0.06 + rand() * 0.22, p: rand() * Math.PI * 2 })
    }

    interface Comet { t: number; speed: number; a: number }
    const comets: Comet[] = []
    for (let i = 0; i < COMETS; i++) {
      comets.push({ t: rand(), speed: 0.10 + rand() * 0.08, a: rand() * Math.PI * 2 })
    }

    // sprites
    const coreSprite = makeSprite([255, 244, 214], 256)
    const starSprite = makeSprite([255, 226, 150], 64)
    const dimSprite = makeSprite([212, 160, 70], 48)
    const ringSprite = makeSprite([255, 232, 180], 128)
    const cometSprite = makeSprite([255, 240, 200], 48)

    let W = 0, H = 0, dpr = 1
    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = rect.width; H = rect.height
      canvas.width = Math.max(1, Math.floor(W * dpr))
      canvas.height = Math.max(1, Math.floor(H * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = (e.clientX - rect.left) / Math.max(rect.width, 1)
      mouseRef.current.y = (e.clientY - rect.top) / Math.max(rect.height, 1)
    }
    canvas.addEventListener('pointermove', onMove)

    const start = performance.now()

    const frame = (now: number) => {
      const t = (now - start) / 1000
      const { x: mx, y: my } = mouseRef.current
      const parX = (mx - 0.5) * 14
      const parY = (my - 0.5) * 10

      ctx.clearRect(0, 0, W, H)
      const cx = W / 2 + parX
      const cy = H / 2 + parY
      const R = Math.min(W * 0.46, H * 0.92)

      // ── nebula backdrop ──
      ctx.globalCompositeOperation = 'lighter'
      const breathe = 1 + Math.sin(t * 0.5) * 0.04
      const bg = R * 1.25 * breathe
      ctx.globalAlpha = 0.20
      ctx.drawImage(coreSprite, cx - bg / 2, cy - bg / 2 * SQUASH, bg, bg * SQUASH)

      // ── thin orbit rings ──
      for (let ring = 0; ring < ringCount; ring++) {
        const rr = R * (0.42 + ring * 0.26)
        ctx.globalAlpha = 0.09 - ring * 0.02
        ctx.strokeStyle = 'rgba(255,226,160,1)'
        ctx.lineWidth = ring === 1 ? 1.1 : 0.6
        ctx.beginPath()
        ctx.ellipse(cx, cy, rr, rr * SQUASH, 0, 0, Math.PI * 2)
        ctx.stroke()
      }

      // ── dust ──
      ctx.globalCompositeOperation = 'source-over'
      for (const d of dust) {
        const twk = 0.6 + Math.sin(t * 1.3 + d.p) * 0.4
        ctx.globalAlpha = d.a * twk
        ctx.fillStyle = '#e8dcc0'
        ctx.beginPath()
        ctx.arc(d.x * W + parX * 0.5, d.y * H + parY * 0.35, d.s, 0, Math.PI * 2)
        ctx.fill()
      }

      // ── the galaxy ──
      ctx.globalCompositeOperation = 'lighter'
      // core glow
      const coreR = R * (0.30 + Math.sin(t * 0.8) * 0.015) * 2
      ctx.globalAlpha = 0.9
      ctx.drawImage(coreSprite, cx - coreR / 2, cy - coreR / 2 * SQUASH, coreR, coreR * SQUASH)

      // cursor stir: stars within the field lean toward the pointer with a
      // slight swirl; stateless per frame, so they drift back when it leaves
      const stirR = R * 0.38
      const mxPx = mouseRef.current.x * W
      const myPx = mouseRef.current.y * H
      let sprite = starSprite
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i]
        const ang = s.a0 + t * s.speed
        let x = cx + Math.cos(ang) * s.r * R
        let y = cy + Math.sin(ang) * s.r * R * SQUASH + s.thick * R
        const sdx = mxPx - x
        const sdy = myPx - y
        const sd2 = sdx * sdx + sdy * sdy
        if (sd2 < stirR * stirR) {
          const sd = Math.sqrt(sd2) || 1
          const f = Math.pow(1 - sd / stirR, 2)
          const pull = f * 20
          const swirl = f * 12 * (s.r > 0.3 ? 1 : -1)
          x += (sdx / sd) * pull - (sdy / sd) * swirl
          y += (sdy / sd) * pull + (sdx / sd) * swirl
        }
        const twk = 0.75 + Math.sin(t * 2 + s.tw) * 0.25
        sprite = s.r < 0.22 ? starSprite : dimSprite
        const sz = s.size * (compact ? 7 : 9) * twk
        ctx.globalAlpha = Math.min(1, s.bright * twk * (compact ? 0.85 : 1))
        ctx.drawImage(sprite, x - sz / 2, y - sz / 2, sz, sz)
        // hard pixel at the center of bright stars
        if (s.bright > 0.8 && !compact) {
          ctx.globalAlpha = s.bright * twk
          ctx.fillStyle = '#fff2d0'
          ctx.fillRect(x - 0.7, y - 0.7, 1.4, 1.4)
        }
      }

      // ── comets crossing the disc ──
      for (const c of comets) {
        c.t += c.speed * 0.016
        if (c.t > 1.3) { c.t = -0.2; c.a = rand() * Math.PI * 2 }
        if (c.t < 0 || c.t > 1) continue
        const rr = R * (0.5 + 0.42 * Math.sin(c.a * 3.1 + t * 0.05))
        const a = c.a + c.t * 0.6
        const x1 = cx + Math.cos(a - 0.10) * rr
        const y1 = cy + Math.sin(a - 0.10) * rr * SQUASH
        const x0 = cx + Math.cos(a) * rr
        const y0 = cy + Math.sin(a) * rr * SQUASH
        const fade = Math.sin(c.t * Math.PI)
        const grad = ctx.createLinearGradient(x1, y1, x0, y0)
        grad.addColorStop(0, 'rgba(255,236,190,0)')
        grad.addColorStop(1, `rgba(255,236,190,${0.7 * fade})`)
        ctx.globalAlpha = 1
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x0, y0); ctx.stroke()
        ctx.globalAlpha = 0.95 * fade
        ctx.drawImage(cometSprite, x0 - 8, y0 - 8, 16, 16)
      }

      // ── occasional ring shimmer ──
      const shimmer = (Math.sin(t * 0.35) + 1) / 2
      ctx.globalAlpha = 0.10 + shimmer * 0.10
      ctx.drawImage(ringSprite, cx - R * 0.9, cy - R * 0.9 * SQUASH, R * 1.8, R * 1.8 * SQUASH)

      ctx.globalAlpha = 1
      ctx.globalCompositeOperation = 'source-over'
      rafRef.current = requestAnimationFrame(frame)
    }
    rafRef.current = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafRef.current)
      ro.disconnect()
      canvas.removeEventListener('pointermove', onMove)
    }
  }, [compact])

  return <canvas ref={canvasRef} className={className} aria-hidden />
}
