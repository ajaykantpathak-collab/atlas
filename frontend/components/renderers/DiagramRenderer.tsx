'use client'

import { useRef, useEffect, useState } from 'react'

export interface DiagramNode {
  id: string
  label: string
  x: number
  y: number
  color?: string
  size?: number
}

export interface DiagramEdge {
  source: string
  target: string
  label?: string
  animated?: boolean
}

interface DiagramRendererProps {
  nodes: DiagramNode[]
  edges: DiagramEdge[]
  className?: string
  highlightNode?: string
  onNodeClick?: (nodeId: string) => void
}

export function DiagramRenderer({
  nodes,
  edges,
  className = '',
  highlightNode,
  onNodeClick,
}: DiagramRendererProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [animFrame, setAnimFrame] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()
    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr
    ctx.scale(dpr, dpr)

    let raf: number
    const render = (time: number) => {
      setAnimFrame(time)
      ctx.clearRect(0, 0, rect.width, rect.height)

      const scaleX = rect.width / 100
      const scaleY = rect.height / 100

      // Draw edges
      edges.forEach((edge) => {
        const source = nodes.find((n) => n.id === edge.source)
        const target = nodes.find((n) => n.id === edge.target)
        if (!source || !target) return

        const sx = source.x * scaleX
        const sy = source.y * scaleY
        const tx = target.x * scaleX
        const ty = target.y * scaleY

        const isHighlighted =
          highlightNode === edge.source || highlightNode === edge.target ||
          hoveredNode === edge.source || hoveredNode === edge.target

        ctx.beginPath()
        ctx.moveTo(sx, sy)
        ctx.lineTo(tx, ty)
        ctx.strokeStyle = isHighlighted
          ? 'rgba(249, 115, 22, 0.6)'
          : 'rgba(120, 113, 108, 0.25)'
        ctx.lineWidth = isHighlighted ? 2 : 1
        ctx.stroke()

        // Animated dot along edge
        if (edge.animated || isHighlighted) {
          const t = ((time / 2000) % 1)
          const dotX = sx + (tx - sx) * t
          const dotY = sy + (ty - sy) * t
          ctx.beginPath()
          ctx.arc(dotX, dotY, 3, 0, Math.PI * 2)
          ctx.fillStyle = 'rgba(251, 146, 60, 0.8)'
          ctx.fill()
        }

        // Edge label
        if (edge.label) {
          const mx = (sx + tx) / 2
          const my = (sy + ty) / 2
          ctx.font = '10px JetBrains Mono, monospace'
          ctx.fillStyle = 'rgba(168, 162, 158, 0.6)'
          ctx.textAlign = 'center'
          ctx.fillText(edge.label, mx, my - 4)
        }
      })

      // Draw nodes
      nodes.forEach((node) => {
        const x = node.x * scaleX
        const y = node.y * scaleY
        const size = node.size || 20
        const isHovered = hoveredNode === node.id
        const isHighlighted = highlightNode === node.id
        const color = node.color || '#f97316'

        // Glow
        if (isHovered || isHighlighted) {
          ctx.beginPath()
          ctx.arc(x, y, size + 8, 0, Math.PI * 2)
          const grad = ctx.createRadialGradient(x, y, size, x, y, size + 8)
          grad.addColorStop(0, color + '40')
          grad.addColorStop(1, color + '00')
          ctx.fillStyle = grad
          ctx.fill()
        }

        // Node circle
        ctx.beginPath()
        ctx.arc(x, y, size, 0, Math.PI * 2)
        ctx.fillStyle = isHighlighted ? color : color + '30'
        ctx.fill()
        ctx.strokeStyle = color
        ctx.lineWidth = isHovered ? 2.5 : 1.5
        ctx.stroke()

        // Label
        ctx.font = `${isHovered ? 'bold ' : ''}11px Plus Jakarta Sans, sans-serif`
        ctx.fillStyle = isHovered || isHighlighted ? '#f5f5f4' : '#a8a29e'
        ctx.textAlign = 'center'
        ctx.fillText(node.label, x, y + size + 16)
      })

      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)
    return () => cancelAnimationFrame(raf)
  }, [nodes, edges, highlightNode, hoveredNode, animFrame])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top
    const scaleX = rect.width / 100
    const scaleY = rect.height / 100

    let found: string | null = null
    for (const node of nodes) {
      const dx = node.x * scaleX - mx
      const dy = node.y * scaleY - my
      if (Math.sqrt(dx * dx + dy * dy) < (node.size || 20) + 4) {
        found = node.id
        break
      }
    }
    setHoveredNode(found)
    canvas.style.cursor = found ? 'pointer' : 'default'
  }

  const handleClick = () => {
    if (hoveredNode && onNodeClick) onNodeClick(hoveredNode)
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setHoveredNode(null)}
      onClick={handleClick}
      className={`renderer-canvas ${className}`}
    />
  )
}
