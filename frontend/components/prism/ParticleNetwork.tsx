'use client'

import { useRef, useEffect, useState, useCallback } from 'react'

/* ═══════════════════════════════════════════════════════════════════════════
   ParticleNetwork — Canvas 2D interactive particle system.
   
   Colorful nodes float around, connected by lines.
   Mouse attracts nearby nodes. Nodes pulse and glow.
   Scroll adds energy — more connections, brighter colors.
   
   This is RELIABLE — Canvas 2D always works, no WebGL issues.
   ═══════════════════════════════════════════════════════════════════════════ */

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  baseX: number
  baseY: number
  size: number
  color: string
  mastery: boolean
  pulsePhase: number
}

const COLORS = [
  '#22D3EE', // cyan
  '#4ADE80', // emerald
  '#FB7185', // rose
  '#A78BFA', // violet
  '#FBBF24', // gold
  '#F472B6', // pink
]

export function ParticleNetwork({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -1000, y: -1000 })
  const scrollRef = useRef(0)
  const rafRef = useRef<number>(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    if (!mounted) return
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let w = 0
    let h = 0

    // ─── Setup ──────────────────────────────────────────────────────────────

    function resize() {
      if (!canvas) return
      const dpr = Math.min(window.devicePixelRatio, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx!.scale(dpr, dpr)
    }

    function initParticles() {
      const count = Math.min(80, Math.floor((w * h) / 12000))
      particles = []
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w
        const y = Math.random() * h
        particles.push({
          x, y,
          baseX: x, baseY: y,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: 2 + Math.random() * 4,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          mastery: Math.random() < 0.3,
          pulsePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    resize()
    initParticles()

    // ─── Mouse tracking ─────────────────────────────────────────────────────

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    function onMouseLeave() {
      mouseRef.current = { x: -1000, y: -1000 }
    }
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mouseleave', onMouseLeave)

    // ─── Scroll tracking ────────────────────────────────────────────────────

    function onScroll() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollRef.current = docHeight > 0 ? Math.min(1, window.scrollY / docHeight) : 0
    }
    window.addEventListener('scroll', onScroll, { passive: true })

    // ─── Resize ─────────────────────────────────────────────────────────────

    function onResize() {
      resize()
      initParticles()
    }
    window.addEventListener('resize', onResize)

    // ─── Animation loop ─────────────────────────────────────────────────────

    let time = 0
    function animate() {
      if (!ctx) return
      time += 0.016
      const sp = scrollRef.current
      const mouse = mouseRef.current

      // Clear with dark background
      ctx.fillStyle = '#0B0B14'
      ctx.fillRect(0, 0, w, h)

      // Draw radial gradient background (shifts with scroll)
      const gradX = w / 2 + Math.sin(time * 0.1) * 100
      const gradY = h / 2 + Math.cos(time * 0.08) * 80
      const grad = ctx.createRadialGradient(gradX, gradY, 0, w / 2, h / 2, Math.max(w, h) * 0.7)
      const hue1 = sp < 0.5 ? '99, 102, 241' : '167, 139, 250'  // indigo → violet
      const hue2 = sp < 0.5 ? '217, 70, 239' : '251, 113, 133'  // magenta → rose
      grad.addColorStop(0, `rgba(${hue1}, ${0.08 + sp * 0.05})`)
      grad.addColorStop(0.5, `rgba(${hue2}, ${0.04 + sp * 0.03})`)
      grad.addColorStop(1, 'rgba(11, 11, 20, 0)')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, w, h)

      // Update particles
      for (const p of particles) {
        // Float around
        p.x += p.vx
        p.y += p.vy

        // Bounce off edges
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        p.x = Math.max(0, Math.min(w, p.x))
        p.y = Math.max(0, Math.min(h, p.y))

        // Mouse attraction — pull toward cursor
        const dx = mouse.x - p.x
        const dy = mouse.y - p.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        if (dist < 150) {
          const force = (150 - dist) / 150 * 0.5
          p.x += dx * force * 0.02
          p.y += dy * force * 0.02
        }

        // Return to base position slowly
        p.x += (p.baseX - p.x) * 0.002
        p.y += (p.baseY - p.y) * 0.002
      }

      // Draw connections
      const connectDist = 120 + sp * 60
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < connectDist) {
            const opacity = (1 - dist / connectDist) * (0.15 + sp * 0.15)
            const bothMastered = a.mastery && b.mastery
            ctx.strokeStyle = bothMastered
              ? `rgba(99, 102, 241, ${opacity * 1.5})`
              : `rgba(130, 130, 160, ${opacity * 0.5})`
            ctx.lineWidth = bothMastered ? 1.2 : 0.5
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      // Draw particles with glow
      for (const p of particles) {
        const pulse = 1 + Math.sin(time * 2 + p.pulsePhase) * 0.2
        const size = p.size * pulse * (1 + sp * 0.3)

        // Glow halo
        if (p.mastery) {
          const glowGrad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, size * 4)
          glowGrad.addColorStop(0, p.color + '80')
          glowGrad.addColorStop(1, p.color + '00')
          ctx.fillStyle = glowGrad
          ctx.beginPath()
          ctx.arc(p.x, p.y, size * 4, 0, Math.PI * 2)
          ctx.fill()
        }

        // Core dot
        ctx.fillStyle = p.color
        ctx.globalAlpha = p.mastery ? 0.9 : 0.5 + sp * 0.2
        ctx.beginPath()
        ctx.arc(p.x, p.y, size, 0, Math.PI * 2)
        ctx.fill()
        ctx.globalAlpha = 1
      }

      // Mouse glow — a soft light follows the cursor
      if (mouse.x > 0 && mouse.y > 0) {
        const mouseGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 200)
        mouseGrad.addColorStop(0, 'rgba(99, 102, 241, 0.12)')
        mouseGrad.addColorStop(1, 'rgba(99, 102, 241, 0)')
        ctx.fillStyle = mouseGrad
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 200, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', onMouseMove)
      canvas.removeEventListener('mouseleave', onMouseLeave)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [mounted])

  if (!mounted) return <div className={className} />

  return <canvas ref={canvasRef} className={className} />
}
