'use client'

import { useEffect, useRef, useState } from 'react'

interface CustomCursorProps {
  color?: string
  size?: number
  trailLength?: number
  enabled?: boolean
}

export function CustomCursor({
  color = '#6366f1',
  size = 8,
  trailLength = 12,
  enabled = true,
}: CustomCursorProps) {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (!enabled) return
    if (window.matchMedia('(pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let rafId: number

    function onMouseMove(e: MouseEvent) {
      mouseX = e.clientX
      mouseY = e.clientY
      setVisible(true)

      if (dot) dot.style.transform = `translate(${mouseX - size / 2}px, ${mouseY - size / 2}px)`

      const target = e.target as HTMLElement
      const isInteractive = target.closest('a, button, [role="button"], input, textarea, select, .cursor-pointer, [data-cursor="hover"]')
      setHovering(!!isInteractive)
    }

    function onMouseDown() { setClicking(true) }
    function onMouseUp() { setClicking(false) }
    function onMouseLeave() { setVisible(false) }
    function onMouseEnter() { setVisible(true) }

    function animateRing() {
      ringX += (mouseX - ringX) * 0.15
      ringY += (mouseY - ringY) * 0.15
      const ringSize = hovering ? 48 : 32
      if (ring) ring.style.transform = `translate(${ringX - ringSize / 2}px, ${ringY - ringSize / 2}px) scale(${clicking ? 0.8 : 1})`
      rafId = requestAnimationFrame(animateRing)
    }
    animateRing()

    document.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mousedown', onMouseDown)
    document.addEventListener('mouseup', onMouseUp)
    document.addEventListener('mouseleave', onMouseLeave)
    document.addEventListener('mouseenter', onMouseEnter)

    document.body.style.cursor = 'none'

    return () => {
      cancelAnimationFrame(rafId)
      document.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mousedown', onMouseDown)
      document.removeEventListener('mouseup', onMouseUp)
      document.removeEventListener('mouseleave', onMouseLeave)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.body.style.cursor = ''
    }
  }, [enabled, size, hovering, clicking])

  if (!enabled) return null

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full transition-opacity duration-200"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          opacity: visible ? 1 : 0,
          boxShadow: `0 0 ${size * 2}px ${color}`,
        }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998] rounded-full border transition-all duration-200"
        style={{
          width: 32,
          height: 32,
          borderColor: hovering ? color : `${color}40`,
          borderWidth: hovering ? 2 : 1,
          opacity: visible ? (hovering ? 0.8 : 0.4) : 0,
          backgroundColor: hovering ? `${color}10` : 'transparent',
        }}
      />
    </>
  )
}
