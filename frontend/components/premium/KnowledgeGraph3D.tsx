'use client'

import { useRef, type ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

interface NodeData {
  id: string
  label: string
  position: [number, number, number]
  color: string
  size: number
  connections?: [number, number][]
}

function KnowledgeNode({
  position,
  color,
  size,
  label,
  index,
}: {
  position: [number, number, number]
  color: string
  size: number
  label: string
  index: number
}) {
  const mesh = useRef<THREE.Mesh>(null!)
  const halo = useRef<THREE.Mesh>(null!)

  useFrame((state) => {
    if (!mesh.current || !halo.current) return
    const t = state.clock.elapsedTime
    mesh.current.position.y = position[1] + Math.sin(t * 0.5 + index) * 0.1
    mesh.current.rotation.y = t * 0.2 + index

    halo.current.rotation.z = t * 0.3
    const pulseScale = 1 + Math.sin(t * 2 + index) * 0.1
    halo.current.scale.setScalar(pulseScale)
  })

  return (
    <group position={position}>
      <mesh ref={mesh}>
        <icosahedronGeometry args={[size, 0]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={halo} scale={1.5}>
        <ringGeometry args={[size * 1.2, size * 1.4, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.2} side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}

function ConnectionLines({ connections, nodes }: { connections: [number, number][]; nodes: NodeData[] }) {
  const lines = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!lines.current) return
    lines.current.children.forEach((line, i) => {
      const mat = (line as THREE.Mesh).material as THREE.MeshBasicMaterial
      mat.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2 + i) * 0.05
    })
  })

  return (
    <group ref={lines}>
      {connections.map(([from, to], i) => {
        const start = nodes[from].position
        const end = nodes[to].position
        const mid = [
          (start[0] + end[0]) / 2,
          (start[1] + end[1]) / 2,
          (start[2] + end[2]) / 2,
        ] as [number, number, number]

        const curve = new THREE.QuadraticBezierCurve3(
          new THREE.Vector3(...start),
          new THREE.Vector3(mid[0], mid[1] + 0.5, mid[2]),
          new THREE.Vector3(...end)
        )
        const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.008, 8, false)

        return (
          <mesh key={i} geometry={tubeGeo}>
            <meshBasicMaterial
              color="#6366f1"
              transparent
              opacity={0.15}
            />
          </mesh>
        )
      })}
    </group>
  )
}

function GraphScene({ nodes, connections }: { nodes: NodeData[]; connections: [number, number][] }) {
  const group = useRef<THREE.Group>(null!)

  useFrame((state) => {
    if (!group.current) return
    group.current.rotation.y = state.clock.elapsedTime * 0.1
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.15
  })

  return (
    <group ref={group}>
      {nodes.map((node, i) => (
        <KnowledgeNode
          key={node.id}
          position={node.position}
          color={node.color}
          size={node.size}
          label={node.label}
          index={i}
        />
      ))}
      <ConnectionLines connections={connections} nodes={nodes} />
    </group>
  )
}

interface KnowledgeGraph3DProps {
  className?: string
  autoRotate?: boolean
}

export function KnowledgeGraph3D({ className = '' }: KnowledgeGraph3DProps) {
  const nodes: NodeData[] = [
    { id: 'math', label: 'Mathematics', position: [0, 0, 0], color: '#6366f1', size: 0.25 },
    { id: 'alg', label: 'Algebra', position: [-1.5, 0.8, 0.5], color: '#818cf8', size: 0.15 },
    { id: 'geo', label: 'Geometry', position: [1.5, 0.8, 0.5], color: '#818cf8', size: 0.15 },
    { id: 'calc', label: 'Calculus', position: [0, 1.5, -0.5], color: '#a5b4fc', size: 0.12 },
    { id: 'sci', label: 'Science', position: [0, -1.5, 0], color: '#d946ef', size: 0.22 },
    { id: 'phys', label: 'Physics', position: [-1.2, -2, 0.5], color: '#e879f9', size: 0.14 },
    { id: 'chem', label: 'Chemistry', position: [1.2, -2, 0.5], color: '#e879f9', size: 0.14 },
    { id: 'bio', label: 'Biology', position: [0, -2.5, -0.5], color: '#f0abfc', size: 0.13 },
    { id: 'eng', label: 'English', position: [2, 0, -1], color: '#38bdf8', size: 0.18 },
    { id: 'hist', label: 'History', position: [-2, 0, -1], color: '#fbbf24', size: 0.18 },
    { id: 'quad', label: 'Quadratics', position: [-2.2, 1.5, 0.8], color: '#c084fc', size: 0.08 },
    { id: 'light', label: 'Light', position: [-1.8, -2.8, 0.8], color: '#fda4af', size: 0.08 },
  ]

  const connections: [number, number][] = [
    [0, 1], [0, 2], [1, 3], [2, 3], [1, 10],
    [4, 5], [4, 6], [4, 7], [5, 11],
    [0, 4], [0, 8], [0, 9],
  ]

  return (
    <div className={`relative ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.8} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#d946ef" />
        <pointLight position={[0, 5, 5]} intensity={0.3} color="#38bdf8" />
        <GraphScene nodes={nodes} connections={connections} />
      </Canvas>
    </div>
  )
}
