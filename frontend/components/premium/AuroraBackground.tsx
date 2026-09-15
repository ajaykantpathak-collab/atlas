'use client'

import { useEffect, useRef } from 'react'

interface AuroraBackgroundProps {
  className?: string
  intensity?: 'subtle' | 'medium' | 'vibrant'
  speed?: 'slow' | 'normal' | 'fast'
}

export function AuroraBackground({
  className = '',
  intensity = 'medium',
  speed = 'normal',
}: AuroraBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    let time = 0

    const speedMap = { slow: 0.003, normal: 0.006, fast: 0.012 }
    const intensityMap = {
      subtle: { opacity: 0.15, blur: 80 },
      medium: { opacity: 0.3, blur: 60 },
      vibrant: { opacity: 0.5, blur: 40 },
    }
    const spd = speedMap[speed]
    const int = intensityMap[intensity]

    const colors = [
      { r: 99, g: 102, b: 241 },
      { r: 139, g: 92, b: 246 },
      { r: 217, g: 70, b: 239 },
      { r: 56, g: 189, b: 248 },
    ]

    const blobs = Array.from({ length: 5 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.001,
      vy: (Math.random() - 0.5) * 0.001,
      color: colors[i % colors.length],
      radius: 200 + Math.random() * 300,
    }))

    function resize() {
      if (!canvas || !ctx) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function animate() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      time += spd

      blobs.forEach((blob, i) => {
        blob.x += blob.vx + Math.sin(time + i) * 0.0005
        blob.y += blob.vy + Math.cos(time + i * 1.3) * 0.0005

        if (blob.x < -0.2) blob.x = 1.2
        if (blob.x > 1.2) blob.x = -0.2
        if (blob.y < -0.2) blob.y = 1.2
        if (blob.y > 1.2) blob.y = -0.2

        const x = blob.x * canvas.width
        const y = blob.y * canvas.height
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, blob.radius)

        gradient.addColorStop(0, `rgba(${blob.color.r},${blob.color.g},${blob.color.b},${int.opacity})`)
        gradient.addColorStop(0.5, `rgba(${blob.color.r},${blob.color.g},${blob.color.b},${int.opacity * 0.3})`)
        gradient.addColorStop(1, `rgba(${blob.color.r},${blob.color.g},${blob.color.b},0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(x, y, blob.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
    }
  }, [intensity, speed])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0, filter: `blur(${intensity === 'subtle' ? 80 : intensity === 'medium' ? 60 : 40}px)` }}
    />
  )
}
