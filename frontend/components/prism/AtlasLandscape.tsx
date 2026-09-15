'use client'

import { useRef, useEffect, useState } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   AtlasLandscape — Canvas 2D topographic map.
   
   The metaphor is a MAP, not orbitals.
   - Contour lines forming topographic regions
   - Each subject is a labeled territory on the map
   - Grid coordinates and compass markers
   - Warm amber/indigo palette (not cold crypto vibes)
   
   Phase 0: Map fades in, contour lines draw themselves
   Phase 2: Regions are fully visible, interactive, glowing
   ═══════════════════════════════════════════════════════════════════════════ */

export type AtlasPhase = 0 | 1 | 2

interface RegionDef {
  name: string
  subject: string
  color: string
  colorRgb: [number, number, number]
  cx: number
  cy: number
  radius: number
  topics: number
  mastered: number
  shape: 'crystal' | 'molecular' | 'geometric' | 'organic'
}

const REGIONS: RegionDef[] = [
  { name: 'Physics Peaks',   subject: 'Physics',    color: '#38BDF8', colorRgb: [56, 189, 248],  cx: 0.20, cy: 0.35, radius: 0.14, topics: 32, mastered: 11, shape: 'crystal' },
  { name: 'Chemistry Vale',  subject: 'Chemistry',  color: '#FBBF24', colorRgb: [251, 191, 36],  cx: 0.45, cy: 0.55, radius: 0.12, topics: 28, mastered: 8,  shape: 'molecular' },
  { name: 'Maths Plains',    subject: 'Maths',      color: '#A78BFA', colorRgb: [167, 139, 250], cx: 0.65, cy: 0.38, radius: 0.13, topics: 35, mastered: 14, shape: 'geometric' },
  { name: 'Biology Grove',   subject: 'Biology',    color: '#FB7185', colorRgb: [251, 113, 133], cx: 0.82, cy: 0.52, radius: 0.11, topics: 24, mastered: 6,  shape: 'organic' },
]

export { REGIONS }
export type Region = RegionDef

function seededRandom(seed: number) {
  let s = seed
  return () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
}

// ─── Component ──────────────────────────────────────────────────────────────

export function AtlasLandscape({
  className = '',
  phase = 0,
  onRegionHover,
  activeRegion,
  drawProgress = 1,
  regions = REGIONS,
}: {
  className?: string
  phase?: AtlasPhase
  onRegionHover?: (region: RegionDef | null) => void
  activeRegion?: string | null
  drawProgress?: number
  regions?: RegionDef[]
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)
  const phaseRef = useRef(phase)
  const activeRegionRef = useRef(activeRegion)
  const smoothPhaseRef = useRef(0)
  const drawProgressRef = useRef(drawProgress)
  const smoothDrawProgressRef = useRef(drawProgress)
  const regionsRef = useRef(regions)
  const regenerateRef = useRef<(() => void) | null>(null)

  useEffect(() => { phaseRef.current = phase }, [phase])
  useEffect(() => { activeRegionRef.current = activeRegion }, [activeRegion])
  useEffect(() => { drawProgressRef.current = drawProgress }, [drawProgress])
  useEffect(() => {
    regionsRef.current = regions
    // Regenerate map data when regions change
    if (regenerateRef.current) regenerateRef.current()
  }, [regions])
  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = 0, h = 0, dpr = 1
    let contourLines: { points: { x: number; y: number }[]; opacity: number; offset: number }[] = []
    let gridDots: { x: number; y: number; phase: number }[] = []
    let particles: { x: number; y: number; vx: number; vy: number; size: number; color: string }[] = []
    let rivers: { points: { x: number; y: number }[]; width: number }[] = []
    let roads: { x1: number; y1: number; x2: number; y2: number }[] = []
    let elevationBlobs: { x: number; y: number; radius: number; opacity: number }[] = []
    let time = 0

    function resize() {
      if (!canvas) return
      dpr = window.devicePixelRatio || 1
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateMap()
    }

    function generateMap() {
      const regs = regionsRef.current
      // Generate contour lines around each region
      contourLines = []
      for (let ri = 0; ri < regs.length; ri++) {
        const region = regs[ri]
        const cx = region.cx * w
        const cy = region.cy * h
        const baseR = region.radius * Math.min(w, h)
        const rand = seededRandom(ri * 1000 + 42)

        // 4 contour rings per region
        for (let ring = 0; ring < 4; ring++) {
          const ringR = baseR * (0.4 + ring * 0.25)
          const points: { x: number; y: number }[] = []
          const segments = 60
          for (let j = 0; j <= segments; j++) {
            const angle = (j / segments) * Math.PI * 2
            // Organic noise
            const noise = Math.sin(angle * 3 + ri * 2) * 0.1 + Math.sin(angle * 7 + ri) * 0.05 + (rand() - 0.5) * 0.08
            const r = ringR * (1 + noise)
            points.push({
              x: cx + Math.cos(angle) * r,
              y: cy + Math.sin(angle) * r * 0.7, // squashed for perspective
            })
          }
          contourLines.push({
            points,
            opacity: 0.15 + ring * 0.05,
            offset: ri * 100 + ring * 30,
          })
        }
      }

      // Grid dots — sparse coordinate markers
      gridDots = []
      const rand2 = seededRandom(999)
      for (let i = 0; i < 120; i++) {
        gridDots.push({
          x: rand2() * w,
          y: rand2() * h,
          phase: rand2() * Math.PI * 2,
        })
      }

      // Floating particles — warm amber and cool indigo
      particles = []
      const rand3 = seededRandom(777)
      for (let i = 0; i < 40; i++) {
        const isWarm = rand3() > 0.5
        particles.push({
          x: rand3() * w,
          y: rand3() * h,
          vx: (rand3() - 0.5) * 0.15,
          vy: (rand3() - 0.5) * 0.08,
          size: 1 + rand3() * 2,
          color: isWarm ? '251, 191, 36' : '99, 102, 241',
        })
      }

      // Rivers — learning paths that wind through the map
      rivers = []
      const rand4 = seededRandom(4242)
      // 2 rivers flowing across the map
      for (let ri = 0; ri < 2; ri++) {
        const points: { x: number; y: number }[] = []
        const startY = (0.2 + ri * 0.5) * h
        const segments = 30
        for (let j = 0; j <= segments; j++) {
          const t = j / segments
          const baseX = t * w
          const waveY = Math.sin(t * Math.PI * 3 + ri * 2) * h * 0.12
          const noiseY = (rand4() - 0.5) * h * 0.05
          points.push({
            x: baseX + (rand4() - 0.5) * w * 0.03,
            y: startY + waveY + noiseY,
          })
        }
        rivers.push({ points, width: ri === 0 ? 2 : 1.5 })
      }

      // Roads — dashed connections between regions
      roads = []
      for (let i = 0; i < regs.length; i++) {
        for (let j = i + 1; j < regs.length; j++) {
          roads.push({
            x1: regs[i].cx * w,
            y1: regs[i].cy * h,
            x2: regs[j].cx * w,
            y2: regs[j].cy * h,
          })
        }
      }

      // Elevation blobs — soft shaded areas around each region
      elevationBlobs = []
      for (const region of regs) {
        const rand5 = seededRandom(region.cx * 1000 + region.cy * 100)
        for (let i = 0; i < 3; i++) {
          elevationBlobs.push({
            x: (region.cx + (rand5() - 0.5) * 0.1) * w,
            y: (region.cy + (rand5() - 0.5) * 0.1) * h,
            radius: region.radius * Math.min(w, h) * (1.2 + rand5() * 0.5),
            opacity: 0.02 + rand5() * 0.02,
          })
        }
      }
    }

    function lerp(a: number, b: number, t: number) { return a + (b - a) * t }

    // ─── Draw functions ──────────────────────────────────────────────────────

    function drawBackground(sp: number) {
      if (!ctx) return
      // Warm dark background — not cold black
      const grad = ctx.createLinearGradient(0, 0, 0, h)
      grad.addColorStop(0, 'rgba(14, 12, 24, 1)')
      grad.addColorStop(0.5, 'rgba(18, 16, 32, 1)')
      grad.addColorStop(1, 'rgba(12, 10, 20, 1)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Subtle warm glow at top-right (amber)
      const warmGlow = ctx.createRadialGradient(w * 0.85, h * 0.15, 0, w * 0.85, h * 0.15, Math.max(50, w * 0.4))
      warmGlow.addColorStop(0, 'rgba(251, 191, 36, 0.04)')
      warmGlow.addColorStop(1, 'rgba(251, 191, 36, 0)')
      ctx.fillStyle = warmGlow
      ctx.fillRect(0, 0, w, h)

      // Cool glow at bottom-left (indigo)
      const coolGlow = ctx.createRadialGradient(w * 0.15, h * 0.85, 0, w * 0.15, h * 0.85, Math.max(50, w * 0.4))
      coolGlow.addColorStop(0, 'rgba(99, 102, 241, 0.05)')
      coolGlow.addColorStop(1, 'rgba(99, 102, 241, 0)')
      ctx.fillStyle = coolGlow
      ctx.fillRect(0, 0, w, h)
    }

    function drawElevation(sp: number, dp: number) {
      if (!ctx) return
      const opacity = Math.min(1, sp * 1.2) * Math.min(1, dp * 1.5)
      if (opacity < 0.02) return

      for (const blob of elevationBlobs) {
        const grad = ctx.createRadialGradient(blob.x, blob.y, 0, blob.x, blob.y, Math.max(10, blob.radius))
        grad.addColorStop(0, `rgba(255, 255, 255, ${blob.opacity * opacity})`)
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${blob.opacity * opacity * 0.3})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.fillStyle = grad
        ctx.beginPath()
        ctx.arc(blob.x, blob.y, Math.max(10, blob.radius), 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawRivers(sp: number, dp: number) {
      if (!ctx) return
      const opacity = Math.min(1, sp * 1.2) * Math.min(1, (dp - 0.2) * 1.5)
      if (opacity < 0.05) return

      for (const river of rivers) {
        const drawCount = Math.floor(river.points.length * dp)
        if (drawCount < 2) continue

        // River glow
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.08})`
        ctx.lineWidth = river.width * 4
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'
        ctx.beginPath()
        for (let j = 0; j < drawCount; j++) {
          const p = river.points[j]
          if (j === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()

        // River line
        ctx.strokeStyle = `rgba(56, 189, 248, ${opacity * 0.25})`
        ctx.lineWidth = river.width
        ctx.beginPath()
        for (let j = 0; j < drawCount; j++) {
          const p = river.points[j]
          if (j === 0) ctx.moveTo(p.x, p.y)
          else ctx.lineTo(p.x, p.y)
        }
        ctx.stroke()

        // Flowing dots along the river
        const flowProgress = (time * 0.3) % 1
        const flowIdx = Math.floor(flowProgress * drawCount)
        if (flowIdx < drawCount) {
          const p = river.points[flowIdx]
          ctx.fillStyle = `rgba(56, 189, 248, ${opacity * 0.6})`
          ctx.beginPath()
          ctx.arc(p.x, p.y, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
    }

    function drawRoads(sp: number, dp: number) {
      if (!ctx) return
      const opacity = Math.min(1, sp * 1.2) * Math.min(1, (dp - 0.4) * 2)
      if (opacity < 0.05) return

      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.08})`
      ctx.lineWidth = 1
      ctx.setLineDash([4, 6])
      for (const road of roads) {
        ctx.beginPath()
        ctx.moveTo(road.x1, road.y1)
        ctx.lineTo(road.x2, road.y2)
        ctx.stroke()
      }
      ctx.setLineDash([])
    }

    function drawGrid(sp: number) {
      if (!ctx) return
      const opacity = Math.min(1, sp * 0.8) * 0.3

      // Grid dots
      for (const dot of gridDots) {
        const twinkle = 0.3 + Math.sin(time * 0.5 + dot.phase) * 0.2
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * twinkle * 0.3})`
        ctx.beginPath()
        ctx.arc(dot.x, dot.y, 1, 0, Math.PI * 2)
        ctx.fill()
      }

      // Coordinate grid lines — very subtle
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.04})`
      ctx.lineWidth = 0.5
      const gridSpacing = Math.max(40, w / 20)
      for (let x = 0; x < w; x += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, h)
        ctx.stroke()
      }
      for (let y = 0; y < h; y += gridSpacing) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(w, y)
        ctx.stroke()
      }
    }

    function drawContours(sp: number, dp: number) {
      if (!ctx) return
      const mapOpacity = Math.min(1, sp * 1.2)
      const regs = regionsRef.current

      for (let i = 0; i < contourLines.length; i++) {
        const line = contourLines[i]
        const regionIdx = Math.floor(i / 4)
        const region = regs[regionIdx]
        if (!region) continue
        const [r, g, b] = region.colorRgb
        const isActive = activeRegionRef.current === region.subject

        const ringWithinRegion = i % 4
        const ringOpacity = line.opacity * mapOpacity * (isActive ? 1.5 : 1)

        // Draw progress — only draw up to dp fraction of points
        const drawCount = Math.floor(line.points.length * dp)
        if (drawCount < 2) continue

        ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${ringOpacity})`
        ctx.lineWidth = isActive ? 1.5 : 1
        ctx.setLineDash([])
        ctx.beginPath()
        for (let j = 0; j < drawCount; j++) {
          const p = line.points[j]
          const breathe = 1 + Math.sin(time * 0.3 + line.offset) * 0.02
          const cx = region.cx * w
          const cy = region.cy * h
          const px = cx + (p.x - cx) * breathe
          const py = cy + (p.y - cy) * breathe
          if (j === 0) ctx.moveTo(px, py)
          else ctx.lineTo(px, py)
        }
        if (dp >= 1) ctx.closePath()
        ctx.stroke()

        // Fill the innermost ring with a subtle glow (only when fully drawn)
        if (ringWithinRegion === 0 && mapOpacity > 0.5 && dp > 0.8) {
          const fillGrad = ctx.createRadialGradient(
            region.cx * w, region.cy * h, 0,
            region.cx * w, region.cy * h, Math.max(10, region.radius * Math.min(w, h))
          )
          const fillOpacity = (isActive ? 0.12 : 0.06) * mapOpacity * Math.min(1, (dp - 0.8) * 5)
          fillGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${fillOpacity})`)
          fillGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
          ctx.fillStyle = fillGrad
          ctx.fill()
        }
      }
    }

    function drawRegionCenters(sp: number, dp: number) {
      if (!ctx) return
      const mapOpacity = Math.min(1, sp * 1.2)
      if (dp < 0.3) return // Only show centers after contours start drawing
      const regs = regionsRef.current

      for (let i = 0; i < regs.length; i++) {
        const region = regs[i]
        const [r, g, b] = region.colorRgb
        const cx = region.cx * w
        const cy = region.cy * h
        const isActive = activeRegionRef.current === region.subject

        // Pulsing glow
        const pulse = 1 + Math.sin(time * 0.8 + i) * 0.15
        const glowR = Math.max(8, region.radius * Math.min(w, h) * 0.3 * pulse)
        const glowGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, glowR)
        const glowOp = (isActive ? 0.4 : 0.2) * mapOpacity
        glowGrad.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${glowOp})`)
        glowGrad.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${glowOp * 0.3})`)
        glowGrad.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`)
        ctx.fillStyle = glowGrad
        ctx.beginPath()
        ctx.arc(cx, cy, glowR, 0, Math.PI * 2)
        ctx.fill()

        // Center dot
        const dotR = Math.max(3, 5 * pulse)
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${mapOpacity})`
        ctx.shadowColor = region.color
        ctx.shadowBlur = isActive ? 15 : 8
        ctx.beginPath()
        ctx.arc(cx, cy, dotR, 0, Math.PI * 2)
        ctx.fill()
        ctx.shadowBlur = 0

        // Crosshair marker (map style)
        if (mapOpacity > 0.6) {
          ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${mapOpacity * 0.4})`
          ctx.lineWidth = 1
          const ch = 12
          ctx.beginPath()
          ctx.moveTo(cx - ch, cy); ctx.lineTo(cx - ch + 4, cy)
          ctx.moveTo(cx + ch - 4, cy); ctx.lineTo(cx + ch, cy)
          ctx.moveTo(cx, cy - ch); ctx.lineTo(cx, cy - ch + 4)
          ctx.moveTo(cx, cy + ch - 4); ctx.lineTo(cx, cy + ch)
          ctx.stroke()
        }
      }
    }

    function drawParticles(sp: number) {
      if (!ctx) return
      const opacity = Math.min(1, sp * 0.8)

      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = w
        if (p.x > w) p.x = 0
        if (p.y < 0) p.y = h
        if (p.y > h) p.y = 0

        ctx.fillStyle = `rgba(${p.color}, ${opacity * 0.3})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function drawCompass(sp: number) {
      if (!ctx) return
      const opacity = Math.min(1, sp * 1.2) * 0.3
      if (opacity < 0.05) return

      // Small compass marker in bottom-left
      const cx = 30, cy = h - 30
      ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, 12, 0, Math.PI * 2)
      ctx.stroke()

      // N indicator
      ctx.fillStyle = `rgba(251, 191, 36, ${opacity * 1.5})`
      ctx.beginPath()
      ctx.moveTo(cx, cy - 10)
      ctx.lineTo(cx - 3, cy)
      ctx.lineTo(cx + 3, cy)
      ctx.closePath()
      ctx.fill()

      ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.5})`
      ctx.font = '8px monospace'
      ctx.textAlign = 'center'
      ctx.fillText('N', cx, cy - 14)
    }

    function drawRegionLabels(sp: number, dp: number) {
      if (!ctx) return
      const opacity = Math.min(1, (sp - 0.5) * 2) * Math.min(1, (dp - 0.6) * 2.5)
      if (opacity < 0.05) return
      const regs = regionsRef.current

      for (const region of regs) {
        const [r, g, b] = region.colorRgb
        const cx = region.cx * w
        const cy = region.cy * h
        const labelY = cy + region.radius * Math.min(w, h) * 0.7 + 15

        // Region name
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity * 0.8})`
        ctx.font = 'bold 11px Inter, sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(region.name.toUpperCase(), cx, labelY)

        // Coordinates (map style)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity * 0.3})`
        ctx.font = '8px monospace'
        ctx.fillText(
          `${Math.round(region.cx * 100)}°E ${Math.round(region.cy * 100)}°N`,
          cx, labelY + 12
        )
      }
    }

    // ─── Mouse parallax ──────────────────────────────────────────────────────

    function handleMouse(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    function handleClick(e: MouseEvent) {
      if (!onRegionHover || !canvas) return
      const rect = canvas.getBoundingClientRect()
      const mx = e.clientX - rect.left
      const my = e.clientY - rect.top
      const regs = regionsRef.current

      for (const region of regs) {
        const dx = mx - region.cx * w
        const dy = my - region.cy * h
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < region.radius * Math.min(w, h)) {
          onRegionHover(region)
          return
        }
      }
      onRegionHover(null)
    }

    // ─── Animation loop ──────────────────────────────────────────────────────

    function animate() {
      time += 0.016

      // Smooth phase
      const target = phaseRef.current
      smoothPhaseRef.current += (target - smoothPhaseRef.current) * 0.08
      if (Math.abs(target - smoothPhaseRef.current) < 0.01) {
        smoothPhaseRef.current = target
      }
      const sp = smoothPhaseRef.current

      // Smooth draw progress
      const dpTarget = drawProgressRef.current
      smoothDrawProgressRef.current += (dpTarget - smoothDrawProgressRef.current) * 0.06
      const dp = smoothDrawProgressRef.current

      // Clear
      ctx!.clearRect(0, 0, w, h)

      // Draw layers
      drawBackground(sp)
      drawElevation(sp, dp)
      drawGrid(sp)
      drawRivers(sp, dp)
      drawRoads(sp, dp)
      drawParticles(sp)
      drawContours(sp, dp)
      drawRegionCenters(sp, dp)
      drawRegionLabels(sp, dp)
      drawCompass(sp)

      rafRef.current = requestAnimationFrame(animate)
    }

    resize()
    window.addEventListener('resize', resize)
    canvas.addEventListener('mousemove', handleMouse)
    canvas.addEventListener('click', handleClick)
    animate()

    // Expose generateMap for external regeneration
    regenerateRef.current = generateMap

    return () => {
      window.removeEventListener('resize', resize)
      canvas.removeEventListener('mousemove', handleMouse)
      canvas.removeEventListener('click', handleClick)
      cancelAnimationFrame(rafRef.current)
      regenerateRef.current = null
    }
  }, [mounted, onRegionHover])

  return <canvas ref={canvasRef} className={className} />
}
