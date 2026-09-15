'use client'

import { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { useKnowledgeGraph } from '../../hooks'

interface GraphNode {
  id: string
  topic: string
  subject: string
  class_level: number
  chapter_name: string
  is_root: boolean
  difficulty: string
  concept_tags?: string[]
}

interface GraphLink {
  source: string
  target: string
  reason: string
  depth_reason?: string
  cross_subject_reason?: string
  confidence?: string
  edge_type?: string
}

interface KnowledgeGraph3DProps {
  className?: string
  board?: string
  classLevel?: number
  subject?: string
  autoRotate?: boolean
  onNodeClick?: (nodeId: string) => void
  maxNodes?: number
}

// Subject colors
const SUBJECT_COLORS: Record<string, string> = {
  physics: '#6366f1',
  chemistry: '#818cf8',
  biology: '#22c55e',
  biotechnology: '#16a34a',
  math: '#a5b4fc',
  applied_maths: '#c084fc',
  english_literature: '#38bdf8',
  hindi: '#fbbf24',
  history: '#f59e0b',
  civics: '#f97316',
  geography: '#10b981',
  economics: '#84cc16',
  sociology: '#ec4899',
  political_science: '#f43f5e',
  psychology: '#d946ef',
  accountancy: '#06b6d4',
  business_studies: '#0ea5e9',
  computer_science: '#3b82f6',
  ai: '#6366f1',
  home_science: '#fda4af',
  legal_studies: '#fbbf24',
  physical_education: '#34d399',
}

function getNodeColor(subject: string, isRoot: boolean): string {
  const baseColor = SUBJECT_COLORS[subject?.toLowerCase()] || '#a78bfa'
  return isRoot ? baseColor : baseColor
}

function getNodeSize(isRoot: boolean, linkCount: number): number {
  if (isRoot) return 0.22
  return Math.max(0.06, Math.min(0.15, 0.06 + linkCount * 0.005))
}

// Force-directed layout (simplified — spherical distribution by subject)
function computeLayout(nodes: GraphNode[], links: GraphLink[]) {
  const positions: Record<string, [number, number, number]> = {}
  
  // Group nodes by subject
  const subjectGroups: Record<string, string[]> = {}
  for (const node of nodes) {
    const subj = node.subject?.toLowerCase() || 'other'
    if (!subjectGroups[subj]) subjectGroups[subj] = []
    subjectGroups[subj].push(node.id)
  }
  
  const subjects = Object.keys(subjectGroups)
  const subjectAngle = (2 * Math.PI) / Math.max(subjects.length, 1)
  
  // Place each subject cluster on a ring
  subjects.forEach((subj, sIdx) => {
    const clusterAngle = sIdx * subjectAngle
    const clusterRadius = 3
    const clusterCenter: [number, number, number] = [
      Math.cos(clusterAngle) * clusterRadius,
      0,
      Math.sin(clusterAngle) * clusterRadius,
    ]
    
    const nodeIds = subjectGroups[subj]
    nodeIds.forEach((nodeId, nIdx) => {
      const localAngle = (nIdx / Math.max(nodeIds.length, 1)) * 2 * Math.PI
      const localRadius = 0.5 + Math.random() * 1.5
      positions[nodeId] = [
        clusterCenter[0] + Math.cos(localAngle) * localRadius,
        clusterCenter[1] + (Math.random() - 0.5) * 2,
        clusterCenter[2] + Math.sin(localAngle) * localRadius,
      ]
    })
  })
  
  return positions
}

function KnowledgeNodeMesh({
  position,
  color,
  size,
  label,
  index,
  onClick,
  isHighlighted,
}: {
  position: [number, number, number]
  color: string
  size: number
  label: string
  index: number
  onClick?: () => void
  isHighlighted?: boolean
}) {
  const mesh = useRef<THREE.Mesh>(null!)
  const halo = useRef<THREE.Mesh>(null!)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (!mesh.current || !halo.current) return
    const t = state.clock.elapsedTime
    mesh.current.position.y = position[1] + Math.sin(t * 0.3 + index) * 0.08
    mesh.current.rotation.y = t * 0.15 + index

    halo.current.rotation.z = t * 0.2
    const pulseScale = 1 + Math.sin(t * 1.5 + index) * 0.08
    halo.current.scale.setScalar(pulseScale)
  })

  const effectiveSize = hovered || isHighlighted ? size * 1.3 : size

  return (
    <group position={position}>
      <mesh
        ref={mesh}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <icosahedronGeometry args={[effectiveSize, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={halo} scale={1.5}>
        <ringGeometry args={[effectiveSize * 1.2, effectiveSize * 1.4, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.4 : 0.15} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ConnectionLines({
  links,
  positions,
  nodeIdToIndex,
}: {
  links: { from: [number, number, number]; to: [number, number, number]; confidence?: string }[]
  positions: Record<string, [number, number, number]>
  nodeIdToIndex: Record<string, number>
}) {
  const lines = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!lines.current) return
    lines.current.children.forEach((line, i) => {
      const mat = (line as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = 0.08 + Math.sin(state.clock.elapsedTime * 1.5 + i * 0.5) * 0.04
    })
  })

  return (
    <group ref={lines}>
      {links.map((link, i) => {
        const start = link.from
        const end = link.to
        const mid = [
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2,
          (start[2] + end[2]) / 2,
        ] as [number, number, number]

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(...start),
          new THREE.Vector3(mid[0], mid[1] + 0.3, mid[2]),
          new THREE.Vector3(...end)
        )
        const tubeGeo = new THREE.TubeGeometry(curve, 12, 0.005, 6, false)

        // Color by confidence
        const color = link.confidence === 'high' ? '#6366f1' : link.confidence === 'low' ? '#f59e0b' : '#818cf8'

        return (
          <mesh key={i} geometry={tubeGeo}>
            <meshBasicMaterial color={color} transparent opacity={0.12} />
          </mesh>
        )
      })}
    </group>
  )
}

function GraphScene({
  nodes,
  links,
  positions,
  autoRotate,
  onNodeClick,
  highlightedNode,
}: {
  nodes: GraphNode[]
  links: GraphLink[]
  positions: Record<string, [number, number, number]>
  autoRotate: boolean
  onNodeClick?: (nodeId: string) => void
  highlightedNode?: string | null
}) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!group.current) return
    if (autoRotate) {
      group.current.rotation.y = state.clock.elapsedTime * 0.08
      group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.1
    }
  })

  // Build link position pairs
  const linkPairs = useMemo(() => {
    return links
      .map((link) => {
        const fromPos = positions[link.source]
        const toPos = positions[link.target]
        if (!fromPos || !toPos) return null
        return { from: fromPos, to: toPos, confidence: link.confidence }
      })
      .filter(Boolean) as { from: [number, number, number]; to: [number, number, number]; confidence?: string }[]
  }, [links, positions])

  // Count links per node for sizing
  const linkCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    for (const link of links) {
      counts[link.source] = (counts[link.source] || 0) + 1
      counts[link.target] = (counts[link.target] || 0) + 1
    }
    return counts
  }, [links])

  return (
    <group ref={group}>
      {nodes.map((node, i) => {
        const pos = positions[node.id]
        if (!pos) return null
        return (
          <KnowledgeNodeMesh
            key={node.id}
            position={pos}
            color={getNodeColor(node.subject, node.is_root)}
            size={getNodeSize(node.is_root, linkCounts[node.id] || 0)}
            label={node.topic}
            index={i}
            onClick={() => onNodeClick?.(node.id)}
            isHighlighted={highlightedNode === node.id}
          />
        )
      })}
      <ConnectionLines links={linkPairs} positions={positions} nodeIdToIndex={{}} />
    </group>
  )
}

export function KnowledgeGraph3DReal({
  className = '',
  board = 'CBSE',
  classLevel,
  subject,
  autoRotate = true,
  onNodeClick,
  maxNodes = 200,
}: KnowledgeGraph3DProps) {
  const [highlightedNode, setHighlightedNode] = useState<string | null>(null)
  
  const { data, isLoading, error } = useKnowledgeGraph(
    classLevel ? board : undefined,
    classLevel,
  )

  // Extract nodes and links from API response
  const { nodes, links, positions } = useMemo(() => {
    if (!data || !data.nodes) {
      return { nodes: [] as GraphNode[], links: [] as GraphLink[], positions: {} as Record<string, [number, number, number]> }
    }

    let apiNodes = data.nodes as unknown as GraphNode[]
    let apiLinks = (data.links || []) as unknown as GraphLink[]

    // Filter by subject if specified
    if (subject) {
      apiNodes = apiNodes.filter((n) => n.subject?.toLowerCase() === subject.toLowerCase())
      const nodeIds = new Set(apiNodes.map((n) => n.id))
      apiLinks = apiLinks.filter((l) => nodeIds.has(l.source) && nodeIds.has(l.target))
    }

    // Limit nodes for performance
    if (apiNodes.length > maxNodes) {
      // Keep root nodes and most-connected nodes
      const rootNodeIds = new Set(apiNodes.filter((n) => n.is_root).map((n) => n.id))
      const linkCounts: Record<string, number> = {}
      for (const link of apiLinks) {
        linkCounts[link.source] = (linkCounts[link.source] || 0) + 1
        linkCounts[link.target] = (linkCounts[link.target] || 0) + 1
      }
      apiNodes.sort((a, b) => {
        const aScore = (a.is_root ? 1000 : 0) + (linkCounts[a.id] || 0)
        const bScore = (b.is_root ? 1000 : 0) + (linkCounts[b.id] || 0)
        return bScore - aScore
      })
      const keptIds = new Set(apiNodes.slice(0, maxNodes).map((n) => n.id))
      apiNodes = apiNodes.filter((n) => keptIds.has(n.id))
      apiLinks = apiLinks.filter((l) => keptIds.has(l.source) && keptIds.has(l.target))
    }

    const pos = computeLayout(apiNodes, apiLinks)
    return { nodes: apiNodes, links: apiLinks, positions: pos }
  }, [data, subject, maxNodes])

  if (isLoading) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="text-slate-400 text-sm animate-pulse">Loading knowledge graph...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="text-red-400 text-sm">Graph unavailable</div>
      </div>
    )
  }

  if (nodes.length === 0) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        <div className="text-slate-500 text-sm">No graph data</div>
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />
        <pointLight position={[0, 5, 5]} intensity={0.3} color="#38bdf8" />
        <GraphScene
          nodes={nodes}
          links={links}
          positions={positions}
          autoRotate={autoRotate}
          onNodeClick={(nid) => {
            setHighlightedNode(nid)
            onNodeClick?.(nid)
          }}
          highlightedNode={highlightedNode}
        />
      </Canvas>
      {/* Info overlay */}
      <div className="absolute bottom-2 left-2 text-xs text-slate-400 pointer-events-none">
        {nodes.length} nodes · {links.length} edges
        {highlightedNode && <div className="mt-1 text-indigo-300">Selected: {highlightedNode}</div>}
      </div>
    </div>
  )
}

// Backward-compatible export (keeps the decorative version as fallback)
export { KnowledgeGraph3DReal as default }
