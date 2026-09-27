'use client'

import { useRef, useMemo, useState, useEffect, Suspense, useCallback } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'

/* ═══════════════════════════════════════════════════════════════════════════
   LivingGraph — the dynamic, mastery-driven knowledge graph.
   This IS the Prism brand identity. It replaces the static triangle logo.

   Design philosophy:
   - NOT a cold corporate network diagram (Vercel/Stripe)
   - NOT a childish cartoon (Duolingo)
   - A LIVING ECOSYSTEM that grows with the student
   - Think: "Spotify Wrapped meets knowledge graph" — warm, personal, magical
   - Mastered nodes BLOOM with particle halos and energy rings
   - Mastered edges have FLOW PARTICLES — synaptic pulses traveling along them
   - Subject clusters have WARM COLORED LIGHTING — not cold blue
   - The whole graph BREATHES — gentle organic movement, not just rotation

   Three modes:
   - "orb"   — tiny SVG graph for nav bars (no Three.js, lightweight)
   - "card"  — medium SVG graph for auth pages, inline cards
   - "hero"  — full Three.js 3D graph with bloom + flow particles

   Mastery-driven:
   - Nodes glow brighter when mastered (mastery = 0..1)
   - Mastered nodes get particle halos + energy rings
   - Mastered edges get flow particles (synaptic pulses)
   - Subject colors flow through the graph as warm light
   - Overall graph density/glow scales with total mastery
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Types ────────────────────────────────────────────────────────────────

export interface GraphNodeData {
  id: string
  subject: string
  mastery: number // 0 = unlearned, 1 = mastered
  position?: [number, number, number]
}

export interface GraphEdgeData {
  source: string
  target: string
}

export interface LivingGraphProps {
  mode: 'orb' | 'card' | 'hero'
  nodes?: GraphNodeData[]
  edges?: GraphEdgeData[]
  className?: string
  interactive?: boolean
  onNodeClick?: (nodeId: string) => void
  autoRotate?: boolean
  density?: number
}

// ─── Spectrum Colors (warmer than before) ──────────────────────────────────

const SPECTRUM: Record<string, { hex: string; rgb: [number, number, number]; light: string }> = {
  physics:   { hex: '#38BDF8', rgb: [56, 189, 248],  light: '#0EA5E9' },
  chemistry: { hex: '#4ADE80', rgb: [74, 222, 128],  light: '#22C55E' },
  biology:   { hex: '#FB7185', rgb: [251, 113, 133], light: '#F43F5E' },
  maths:     { hex: '#A78BFA', rgb: [167, 139, 250], light: '#8B5CF6' },
  cs:        { hex: '#22D3EE', rgb: [34, 211, 238],  light: '#06B6D4' },
  geography: { hex: '#FB923C', rgb: [251, 146, 60],  light: '#F97316' },
  english:   { hex: '#F472B6', rgb: [244, 114, 182], light: '#EC4899' },
  evs:       { hex: '#84CC16', rgb: [132, 204, 22],  light: '#65A30D' },
  default:   { hex: '#818CF8', rgb: [129, 140, 248], light: '#6366F1' },
}

function colorFor(subject: string) {
  return SPECTRUM[subject] || SPECTRUM.default
}

// ─── Demo Data Generator ───────────────────────────────────────────────────

function generateDemoGraph(count: number): { nodes: GraphNodeData[]; edges: GraphEdgeData[] } {
  const subjects = Object.keys(SPECTRUM).filter(s => s !== 'default')
  const nodes: GraphNodeData[] = []
  for (let i = 0; i < count; i++) {
    const subject = subjects[Math.floor(Math.random() * subjects.length)]
    nodes.push({
      id: `demo-${i}`,
      subject,
      mastery: Math.random() < 0.35 ? 0.65 + Math.random() * 0.35 : Math.random() * 0.3,
    })
  }
  const edges: GraphEdgeData[] = []
  for (let i = 0; i < count; i++) {
    const neighbors = 1 + Math.floor(Math.random() * 2)
    for (let j = 0; j < neighbors; j++) {
      const target = Math.floor(Math.random() * count)
      if (target !== i) {
        edges.push({ source: `demo-${i}`, target: `demo-${target}` })
      }
    }
  }
  return { nodes, edges }
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODE: ORB — tiny living SVG graph for nav bars
   A small cluster that pulses with warm energy. Feels like a living seed.
   ═══════════════════════════════════════════════════════════════════════════ */

function GraphOrb({ size, nodes, density }: { size: number; nodes?: GraphNodeData[]; density: number }) {
  const data = useMemo(() => {
    if (nodes && nodes.length > 0) return { nodes, edges: [] as GraphEdgeData[] }
    return generateDemoGraph(density)
  }, [nodes, density])

  const positions = useMemo(() => {
    return data.nodes.map((_, i) => {
      const angle = (i / data.nodes.length) * Math.PI * 2
      const r = size * 0.3 + Math.random() * size * 0.06
      return {
        x: size / 2 + Math.cos(angle) * r,
        y: size / 2 + Math.sin(angle) * r,
      }
    })
  }, [data.nodes, size])

  return (
    <motion.svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="overflow-visible"
      animate={{ rotate: 360 }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
    >
      <defs>
        <radialGradient id="orb-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.2" />
          <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        {Object.entries(SPECTRUM).filter(([k]) => k !== 'default').map(([subject, c]) => (
          <radialGradient key={`orb-grad-${subject}`} id={`orb-grad-${subject}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.hex} stopOpacity="1" />
            <stop offset="100%" stopColor={c.hex} stopOpacity="0.3" />
          </radialGradient>
        ))}
      </defs>

      {/* Warm background glow */}
      <circle cx={size / 2} cy={size / 2} r={size * 0.48} fill="url(#orb-glow)" />

      {/* Ring edges — connect adjacent nodes */}
      {positions.map((p, i) => {
        const next = positions[(i + 1) % positions.length]
        const node = data.nodes[i]
        const nextNode = data.nodes[(i + 1) % data.nodes.length]
        if (!node || !nextNode) return null
        const bothMastered = node.mastery > 0.7 && nextNode.mastery > 0.7
        return (
          <line
            key={`ring-${i}`}
            x1={p.x} y1={p.y} x2={next.x} y2={next.y}
            stroke={bothMastered ? colorFor(node.subject).hex : '#1E1E30'}
            strokeWidth={bothMastered ? 0.7 : 0.3}
            opacity={bothMastered ? 0.35 : 0.08}
          />
        )
      })}

      {/* Nodes — mastered ones bloom with glow */}
      {positions.map((p, i) => {
        const node = data.nodes[i]
        if (!node) return null
        const c = colorFor(node.subject)
        const mastered = node.mastery > 0.7
        const partial = node.mastery > 0.3
        const nodeSize = mastered ? 1.6 + node.mastery * 1.0 : partial ? 1.2 + node.mastery * 0.6 : 0.9
        return (
          <motion.g key={`node-${i}`}>
            {/* Glow halo for mastered nodes */}
            {mastered && (
              <motion.circle
                cx={p.x} cy={p.y} r={nodeSize * 2.5}
                fill={`url(#orb-grad-${node.subject})`}
                animate={{ opacity: [0.3, 0.5, 0.3], scale: [0.8, 1.2, 0.8] }}
                transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: 'easeInOut', delay: i * 0.1 }}
                style={{ transformOrigin: `${p.x}px ${p.y}px` }}
              />
            )}
            {/* Core node */}
            <motion.circle
              cx={p.x} cy={p.y} r={nodeSize}
              fill={c.hex}
              animate={{
                scale: [1, 1.3, 1],
                opacity: mastered ? [0.9, 1, 0.9] : [0.3, 0.5, 0.3],
              }}
              transition={{
                duration: 2 + (i % 3),
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.12,
              }}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                filter: mastered ? `drop-shadow(0 0 2px ${c.hex})` : 'none',
              }}
            />
          </motion.g>
        )
      })}
    </motion.svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODE: CARD — medium SVG graph for auth pages, inline cards
   Shows subject clusters with warm glows. More detailed than orb.
   ═══════════════════════════════════════════════════════════════════════════ */

function GraphCard({ width, height, nodes, density }: { width: number; height: number; nodes?: GraphNodeData[]; density: number }) {
  const data = useMemo(() => {
    if (nodes && nodes.length > 0) return { nodes, edges: [] as GraphEdgeData[] }
    return generateDemoGraph(density)
  }, [nodes, density])

  const positions = useMemo(() => {
    const subjectClusters: Record<string, { cx: number; cy: number }> = {}
    const subjects = Array.from(new Set(data.nodes.map(n => n.subject)))
    subjects.forEach((s, i) => {
      const angle = (i / subjects.length) * Math.PI * 2
      subjectClusters[s] = {
        cx: width / 2 + Math.cos(angle) * width * 0.22,
        cy: height / 2 + Math.sin(angle) * height * 0.22,
      }
    })
    return data.nodes.map(node => {
      const cluster = subjectClusters[node.subject] || { cx: width / 2, cy: height / 2 }
      return {
        x: cluster.cx + (Math.random() - 0.5) * width * 0.16,
        y: cluster.cy + (Math.random() - 0.5) * height * 0.16,
      }
    })
  }, [data.nodes, width, height])

  const edges = useMemo(() => {
    const result: { s: number; t: number; dist: number }[] = []
    for (let i = 0; i < data.nodes.length; i++) {
      const dists = data.nodes
        .map((_, j) => ({
          j,
          d: Math.pow(positions[i].x - positions[j].x, 2) + Math.pow(positions[i].y - positions[j].y, 2),
        }))
        .filter(x => x.j !== i)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
      for (const { j, d } of dists) {
        if (i < j) result.push({ s: i, t: j, dist: d })
      }
    }
    return result
  }, [data.nodes, positions])

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
      <defs>
        <radialGradient id="card-bg-glow" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.1" />
          <stop offset="50%" stopColor="#8b5cf6" stopOpacity="0.04" />
          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
        </radialGradient>
        {Object.entries(SPECTRUM).filter(([k]) => k !== 'default').map(([subject, c]) => (
          <radialGradient key={`card-cluster-${subject}`} id={`card-cluster-${subject}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.hex} stopOpacity="0.18" />
            <stop offset="50%" stopColor={c.hex} stopOpacity="0.06" />
            <stop offset="100%" stopColor={c.hex} stopOpacity="0" />
          </radialGradient>
        ))}
        {Object.entries(SPECTRUM).filter(([k]) => k !== 'default').map(([subject, c]) => (
          <radialGradient key={`card-node-${subject}`} id={`card-node-${subject}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={c.hex} stopOpacity="1" />
            <stop offset="100%" stopColor={c.hex} stopOpacity="0.2" />
          </radialGradient>
        ))}
      </defs>

      {/* Background glow */}
      <rect width={width} height={height} fill="url(#card-bg-glow)" />

      {/* Subject cluster glows */}
      {Array.from(new Set(data.nodes.map(n => n.subject))).map(subject => {
        const cluster = data.nodes.filter(n => n.subject === subject)
        if (cluster.length === 0) return null
        const cx = cluster.reduce((s, n) => {
          const idx = data.nodes.indexOf(n)
          return s + positions[idx].x
        }, 0) / cluster.length
        const cy = cluster.reduce((s, n) => {
          const idx = data.nodes.indexOf(n)
          return s + positions[idx].y
        }, 0) / cluster.length
        return (
          <motion.circle
            key={subject}
            cx={cx} cy={cy} r={width * 0.14}
            fill={`url(#card-cluster-${subject})`}
            animate={{ opacity: [0.6, 0.9, 0.6] }}
            transition={{ duration: 4 + Math.random() * 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        )
      })}

      {/* Edges */}
      {edges.map(({ s, t }, i) => {
        const nodeS = data.nodes[s]
        const nodeT = data.nodes[t]
        const bothMastered = nodeS.mastery > 0.7 && nodeT.mastery > 0.7
        const sameSubject = nodeS.subject === nodeT.subject
        const c = colorFor(nodeS.subject)
        return (
          <line
            key={`edge-${i}`}
            x1={positions[s].x} y1={positions[s].y}
            x2={positions[t].x} y2={positions[t].y}
            stroke={bothMastered ? c.hex : sameSubject ? c.hex : '#262640'}
            strokeWidth={bothMastered ? 1.2 : 0.5}
            opacity={bothMastered ? 0.4 : sameSubject ? 0.1 : 0.05}
          />
        )
      })}

      {/* Nodes with bloom halos */}
      {positions.map((p, i) => {
        const node = data.nodes[i]
        const c = colorFor(node.subject)
        const mastered = node.mastery > 0.7
        const partial = node.mastery > 0.3
        const nodeSize = mastered ? 2.5 + node.mastery * 2 : partial ? 2 + node.mastery * 1.2 : 1.5
        return (
          <motion.g key={`node-${i}`}>
            {/* Bloom halo for mastered nodes */}
            {mastered && (
              <motion.circle
                cx={p.x} cy={p.y} r={nodeSize * 3}
                fill={`url(#card-node-${node.subject})`}
                animate={{
                  opacity: [0.3, 0.5, 0.3],
                  r: [nodeSize * 2.5, nodeSize * 3.5, nodeSize * 2.5],
                }}
                transition={{ duration: 2.5 + Math.random(), repeat: Infinity, ease: 'easeInOut', delay: i * 0.06 }}
              />
            )}
            {/* Energy ring for mastered nodes */}
            {mastered && (
              <motion.circle
                cx={p.x} cy={p.y} r={nodeSize * 1.8}
                fill="none"
                stroke={c.hex}
                strokeWidth={0.4}
                opacity={0.3}
                animate={{ r: [nodeSize * 1.5, nodeSize * 2.2, nodeSize * 1.5], opacity: [0.4, 0.1, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.08 }}
              />
            )}
            {/* Core node */}
            <motion.circle
              cx={p.x} cy={p.y} r={nodeSize}
              fill={c.hex}
              animate={{
                r: [nodeSize, nodeSize * 1.2, nodeSize],
                opacity: mastered ? [0.95, 1, 0.95] : [0.3, 0.45, 0.3],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.07,
              }}
              style={{
                filter: mastered ? `drop-shadow(0 0 4px ${c.hex})` : partial ? `drop-shadow(0 0 2px ${c.hex}60)` : 'none',
              }}
            />
          </motion.g>
        )
      })}
    </svg>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   MODE: HERO — full 3D Three.js graph with bloom + flow particles
   The showpiece. Used on landing hero and dashboard centerpiece.
   ═══════════════════════════════════════════════════════════════════════════ */

interface ThreeNode {
  position: THREE.Vector3
  color: THREE.Color
  mastery: number
  size: number
  id: string
  subject: string
  mastered: boolean
}

function buildThreeGraph(nodes: GraphNodeData[], edges: GraphEdgeData[]) {
  const subjects = Array.from(new Set(nodes.map(n => n.subject)))
  const subjectCenters: Record<string, THREE.Vector3> = {}
  subjects.forEach((s, i) => {
    const phi = Math.acos(-1 + (2 * (i + 0.5)) / subjects.length)
    const theta = Math.sqrt(subjects.length * Math.PI) * phi
    const r = 4.5
    subjectCenters[s] = new THREE.Vector3(
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi),
    )
  })

  const threeNodes: ThreeNode[] = nodes.map((node) => {
    const center = subjectCenters[node.subject] || new THREE.Vector3(0, 0, 0)
    const offset = new THREE.Vector3(
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3.5,
      (Math.random() - 0.5) * 3.5,
    )
    const c = colorFor(node.subject)
    const mastered = node.mastery > 0.7
    return {
      position: center.clone().add(offset),
      color: new THREE.Color(c.hex),
      mastery: node.mastery,
      size: mastered ? 0.09 + node.mastery * 0.06 : 0.05 + node.mastery * 0.03,
      id: node.id,
      subject: node.subject,
      mastered,
    }
  })

  const nodeMap = new Map(threeNodes.map(n => [n.id, n]))
  const threeEdges = edges
    .map(e => {
      const a = nodeMap.get(e.source)
      const b = nodeMap.get(e.target)
      if (!a || !b) return null
      return { a, b, bothMastered: a.mastered && b.mastered }
    })
    .filter(Boolean) as { a: ThreeNode; b: ThreeNode; bothMastered: boolean }[]

  return { threeNodes, threeEdges }
}

// ─── 3D Node with bloom + halo + energy ring ───────────────────────────────

function NodeMesh({ node, index }: { node: ThreeNode; index: number }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const ringRef = useRef<THREE.Mesh>(null)
  const { mastered } = node

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    // Gentle organic floating — like breathing
    meshRef.current.position.y = node.position.y + Math.sin(t * 0.4 + index * 0.3) * 0.12
    meshRef.current.position.x = node.position.x + Math.cos(t * 0.3 + index * 0.2) * 0.08

    // Mastered nodes pulse
    if (mastered && meshRef.current) {
      const pulse = 1 + Math.sin(t * 1.2 + index * 0.5) * 0.08
      meshRef.current.scale.setScalar(pulse)
    }

    // Halo rotates and breathes
    if (haloRef.current && mastered) {
      haloRef.current.rotation.z = t * 0.5 + index
      const haloPulse = 1 + Math.sin(t * 0.8 + index) * 0.15
      haloRef.current.scale.setScalar(haloPulse)
    }

    // Energy ring counter-rotates
    if (ringRef.current && mastered) {
      ringRef.current.rotation.x = t * 0.3 + index * 0.5
      ringRef.current.rotation.y = t * 0.4 + index * 0.3
    }
  })

  return (
    <group position={node.position}>
      {/* Core node — glass-like with emissive glow */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[node.size, 20, 20]} />
        <meshPhysicalMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={mastered ? 1.5 : node.mastery > 0.3 ? 0.6 : 0.2}
          transparent
          opacity={mastered ? 0.95 : node.mastery > 0.3 ? 0.5 + node.mastery * 0.3 : 0.25}
          roughness={0.2}
          metalness={0.3}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
        />
      </mesh>

      {/* Particle halo — only for mastered nodes */}
      {mastered && (
        <mesh ref={haloRef}>
          <ringGeometry args={[node.size * 1.8, node.size * 2.2, 32]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.3}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}

      {/* Energy ring — only for mastered nodes */}
      {mastered && (
        <mesh ref={ringRef}>
          <torusGeometry args={[node.size * 2.8, node.size * 0.08, 8, 32]} />
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={0.2}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      )}
    </group>
  )
}

// ─── Flow Particles along mastered edges ────────────────────────────────────

function FlowParticles({ a, b, color, count = 3 }: { a: THREE.Vector3; b: THREE.Vector3; color: THREE.Color; count?: number }) {
  const groupRef = useRef<THREE.Group>(null)
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      progress: i / count,
      speed: 0.3 + Math.random() * 0.2,
      size: 0.02 + Math.random() * 0.02,
    }))
  }, [count])

  useFrame((state, delta) => {
    if (!groupRef.current) return
    groupRef.current.children.forEach((child, i) => {
      const p = particles[i]
      p.progress += delta * p.speed
      if (p.progress > 1) p.progress -= 1
      const t = p.progress
      // Lerp along edge with slight curve
      const curve = Math.sin(t * Math.PI) * 0.3
      child.position.lerpVectors(a, b, t)
      child.position.y += curve
    })
  })

  return (
    <group ref={groupRef}>
      {particles.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[particles[i].size, 8, 8]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.8}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  )
}

// ─── 3D Edge Line ──────────────────────────────────────────────────────────

function EdgeLine({ a, b, bothMastered }: { a: ThreeNode; b: ThreeNode; bothMastered: boolean }) {
  const positions = useMemo(() => {
    return new Float32Array([
      a.position.x, a.position.y, a.position.z,
      b.position.x, b.position.y, b.position.z,
    ])
  }, [a, b])

  const color = useMemo(() => {
    return bothMastered ? a.color : new THREE.Color('#1E1E30')
  }, [a, b, bothMastered])

  return (
    <>
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={2} array={positions} itemSize={3} />
        </bufferGeometry>
        <lineBasicMaterial
          color={color}
          transparent
          opacity={bothMastered ? 0.25 : 0.06}
        />
      </line>
      {bothMastered && <FlowParticles a={a.position} b={b.position} color={a.color} />}
    </>
  )
}

// ─── Ambient dust particles for depth ──────────────────────────────────────

function AmbientDust({ count = 500 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const [positions, sizes] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const sz = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      const r = 8 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
      sz[i] = 0.01 + Math.random() * 0.02
    }
    return [pos, sz]
  }, [count])

  useFrame((state) => {
    if (!pointsRef.current) return
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#818cf8"
        transparent
        opacity={0.15}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── 3D Graph Scene ────────────────────────────────────────────────────────

function GraphScene({
  nodes,
  edges,
  autoRotate,
  interactive,
}: {
  nodes: GraphNodeData[]
  edges: GraphEdgeData[]
  autoRotate: boolean
  interactive: boolean
}) {
  const groupRef = useRef<THREE.Group>(null)
  const { camera } = useThree()

  const { threeNodes, threeEdges } = useMemo(() => buildThreeGraph(nodes, edges), [nodes, edges])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    if (autoRotate) {
      groupRef.current.rotation.y = t * 0.05
      groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.1
    }
    // Camera breathing — subtle, organic
    camera.position.z = 12 + Math.sin(t * 0.2) * 0.4
  })

  // Mouse parallax
  useEffect(() => {
    if (!interactive) return
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 0.3
      const y = (e.clientY / window.innerHeight - 0.5) * 0.2
      if (groupRef.current) {
        groupRef.current.rotation.y += (x - groupRef.current.rotation.y * 0.05) * 0.01
        groupRef.current.rotation.x += (y - groupRef.current.rotation.x * 0.05) * 0.01
      }
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [interactive])

  return (
    <group ref={groupRef}>
      {/* Warm subject cluster lighting */}
      {Array.from(new Set(nodes.map(n => n.subject))).map(subject => {
        const cluster = threeNodes.filter(n => n.subject === subject)
        if (cluster.length === 0) return null
        const center = new THREE.Vector3()
        cluster.forEach(n => center.add(n.position))
        center.divideScalar(cluster.length)
        const c = colorFor(subject)
        return (
          <pointLight
            key={subject}
            position={center}
            color={new THREE.Color(c.hex)}
            intensity={0.4}
            distance={10}
            decay={2}
          />
        )
      })}

      {/* Edges with flow particles */}
      {threeEdges.map((edge, i) => (
        <EdgeLine key={`edge-${i}`} a={edge.a} b={edge.b} bothMastered={edge.bothMastered} />
      ))}

      {/* Nodes with halos + energy rings */}
      {threeNodes.map((node, i) => (
        <NodeMesh key={node.id} node={node} index={i} />
      ))}

      {/* Ambient dust for depth */}
      <AmbientDust count={400} />
    </group>
  )
}

// ─── Hero Graph with bloom post-processing ──────────────────────────────────

function HeroGraph({
  nodes,
  edges,
  className,
  interactive,
  autoRotate,
}: {
  nodes: GraphNodeData[]
  edges: GraphEdgeData[]
  className?: string
  interactive?: boolean
  autoRotate?: boolean
}) {
  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 12], fov: 50 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <ambientLight intensity={0.25} />
        <pointLight position={[10, 10, 10]} intensity={0.6} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#d946ef" />
        <Suspense fallback={null}>
          <GraphScene
            nodes={nodes}
            edges={edges}
            autoRotate={autoRotate ?? true}
            interactive={interactive ?? false}
          />
        </Suspense>
        <fog attach="fog" args={['#0B0B14', 9, 24]} />
        {/* Bloom post-processing — THE key to cinematic glow */}
        <EffectComposer>
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.7}
          />
          <Vignette eskil={false} offset={0.3} darkness={0.8} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   Main Export — LivingGraph
   ═══════════════════════════════════════════════════════════════════════════ */

export function LivingGraph({
  mode,
  nodes,
  edges = [],
  className = '',
  interactive = false,
  onNodeClick,
  autoRotate = true,
  density,
  orbSize = 36,
}: LivingGraphProps & { orbSize?: number }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const defaultDensity = mode === 'orb' ? 7 : mode === 'card' ? 28 : 100
  const actualDensity = density ?? defaultDensity

  const demoData = useMemo(() => {
    if (nodes && nodes.length > 0) return null
    return generateDemoGraph(actualDensity)
  }, [nodes, actualDensity])

  const actualNodes = nodes && nodes.length > 0 ? nodes : demoData?.nodes || []
  const actualEdges = edges.length > 0 ? edges : demoData?.edges || []

  if (mode === 'orb') {
    // Don't render until mounted to avoid hydration mismatch (Math.random in demo data)
    if (!mounted) {
      return <div className={`relative ${className}`} style={{ width: orbSize, height: orbSize }} />
    }
    return (
      <div className={`relative ${className}`} style={{ width: orbSize, height: orbSize }}>
        <GraphOrb size={orbSize} nodes={actualNodes} density={actualDensity} />
      </div>
    )
  }

  if (mode === 'card') {
    // demo layouts use Math.random() at render time — gate behind mount
    // so server and client HTML can never disagree (hydration crash)
    if (!mounted) return <div className={`relative ${className}`} />
    return (
      <div className={`relative ${className}`}>
        <GraphCard width={400} height={300} nodes={actualNodes} density={actualDensity} />
      </div>
    )
  }

  // hero mode
  if (!mounted) return <div className={className} />

  return (
    <HeroGraph
      nodes={actualNodes}
      edges={actualEdges}
      className={className}
      interactive={interactive}
      autoRotate={autoRotate}
    />
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PrismGraphOrb — convenience wrapper for nav bars.
   A small, living graph orb that replaces PrismLogo.
   ═══════════════════════════════════════════════════════════════════════════ */

export function PrismGraphOrb({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <LivingGraph mode="orb" density={7} orbSize={size} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════════════════
   PrismGraphWordmark — graph orb + "Atlas" text. Used in navigation.
   ═══════════════════════════════════════════════════════════════════════════ */

export function PrismGraphWordmark({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <PrismGraphOrb size={32} />
      <span className="font-display text-lg font-bold text-white tracking-tight">
        Prism
      </span>
    </div>
  )
}
