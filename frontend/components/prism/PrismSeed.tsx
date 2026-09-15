'use client'

import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'
import { motion } from 'framer-motion'
import { PrismGraphOrb } from './LivingGraph'

/* ═══════════════════════════════════════════════════════════════════════════
   PrismSeed — the scroll-driven landing experience.

   A large living graph orb sits at the center of the page.
   As the user scrolls, the orb grows and a knowledge graph expands outward.
   The scroll IS the story: seed → growth → mastery → universe.

   The centerpiece is the SAME living graph orb used in the nav logo,
   just enlarged — consistent branding.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Spectrum ──────────────────────────────────────────────────────────────

const SPECTRUM: Record<string, { hex: string; rgb: [number, number, number] }> = {
  physics:   { hex: '#38BDF8', rgb: [56, 189, 248] },
  chemistry: { hex: '#4ADE80', rgb: [74, 222, 128] },
  biology:   { hex: '#FB7185', rgb: [251, 113, 133] },
  maths:     { hex: '#A78BFA', rgb: [167, 139, 250] },
}

const SPECTRUM_BEAMS = Object.values(SPECTRUM).map((c, i) => ({
  color: new THREE.Color(c.hex),
  angle: (i / 4) * Math.PI * 2,
}))

// ─── Graph Nodes (grow around the center orb) ──────────────────────────────

interface SeedNode {
  position: THREE.Vector3
  color: THREE.Color
  mastery: number
  size: number
  growthThreshold: number
}

function buildSeedGraph(): SeedNode[] {
  const nodes: SeedNode[] = []
  const colors = Object.values(SPECTRUM)
  const nodesPerBeam = 20

  SPECTRUM_BEAMS.forEach((beam, beamIdx) => {
    for (let i = 0; i < nodesPerBeam; i++) {
      const dist = 2.5 + i * 0.5 + Math.random() * 0.3
      const angle = beam.angle + (Math.random() - 0.5) * 0.5
      const yOffset = (Math.random() - 0.5) * 1.5
      const zOffset = (Math.random() - 0.5) * 1.5

      const growthThreshold = 0.15 + (i / nodesPerBeam) * 0.4 + Math.random() * 0.05
      const mastered = Math.random() < 0.3 && i > 5
      const mastery = mastered ? 0.7 + Math.random() * 0.3 : Math.random() * 0.3

      nodes.push({
        position: new THREE.Vector3(
          Math.cos(angle) * dist,
          Math.sin(angle) * dist + yOffset,
          zOffset,
        ),
        color: beam.color,
        mastery,
        size: mastered ? 0.08 + mastery * 0.05 : 0.04 + mastery * 0.03,
        growthThreshold,
      })
    }
  })

  return nodes
}

// ─── Central Orb (the enlarged logo) ───────────────────────────────────────

function CentralOrb({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const haloRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    if (groupRef.current) {
      groupRef.current.rotation.z = t * 0.1
      const scale = 1.2 - sp * 0.4
      groupRef.current.scale.setScalar(scale)
    }

    if (haloRef.current) {
      haloRef.current.rotation.z = -t * 0.2
      const haloPulse = 1 + Math.sin(t * 0.8) * 0.12
      haloRef.current.scale.setScalar(haloPulse)
    }
  })

  // Build the orb — a ring of colored nodes like the SVG logo
  const orbNodes = useMemo(() => {
    const count = 8
    return SPECTRUM_BEAMS.map((beam, i) => {
      const angle = (i / count) * Math.PI * 2
      const r = 0.8
      return {
        pos: new THREE.Vector3(Math.cos(angle) * r, Math.sin(angle) * r, 0),
        color: beam.color,
      }
    })
  }, [])

  return (
    <group ref={groupRef}>
      {/* Faint halo ring */}
      <mesh ref={haloRef}>
        <ringGeometry args={[1.0, 1.08, 32]} />
        <meshBasicMaterial
          color="#6366f1"
          transparent
          opacity={0.1}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Colored nodes around the orb — matches the SVG logo exactly */}
      {orbNodes.map((node, i) => (
        <mesh key={i} position={node.pos}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={2}
            transparent
            opacity={0.95}
          />
        </mesh>
      ))}

      {/* Connections between orb nodes — same as SVG logo */}
      {orbNodes.map((node, i) => {
        const next = orbNodes[(i + 1) % orbNodes.length]
        const positions = new Float32Array([
          node.pos.x, node.pos.y, node.pos.z,
          next.pos.x, next.pos.y, next.pos.z,
        ])
        return (
          <line key={`conn-${i}`}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial
              color="#6366f1"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </line>
        )
      })}
    </group>
  )
}

// ─── Graph Nodes that grow around the orb ──────────────────────────────────

function GraphNodes({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const nodes = useMemo(() => buildSeedGraph(), [])

  const edges = useMemo(() => {
    const result: { a: SeedNode; b: SeedNode }[] = []
    for (let i = 0; i < nodes.length; i++) {
      const dists = nodes
        .map((n, j) => ({ j, d: nodes[i].position.distanceTo(n.position) }))
        .filter(x => x.j !== i && x.d < 2.5)
        .sort((a, b) => a.d - b.d)
        .slice(0, 2)
      for (const { j } of dists) {
        if (i < j) result.push({ a: nodes[i], b: nodes[j] })
      }
    }
    return result
  }, [nodes])

  useFrame((state) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    groupRef.current.rotation.y = t * 0.04
    groupRef.current.rotation.x = Math.sin(t * 0.03) * 0.08

    groupRef.current.children.forEach((child, i) => {
      if (i < nodes.length) {
        const node = nodes[i]
        const visible = sp > node.growthThreshold
        const mesh = child as THREE.Mesh
        const mat = mesh.material as THREE.MeshPhysicalMaterial

        if (visible) {
          const growthProgress = Math.min(1, (sp - node.growthThreshold) / 0.1)
          mesh.scale.setScalar(growthProgress)
          mesh.position.y = node.position.y + Math.sin(t * 0.4 + i * 0.3) * 0.08
          mesh.position.x = node.position.x + Math.cos(t * 0.3 + i * 0.2) * 0.05

          if (node.mastery > 0.7) {
            const pulse = 1 + Math.sin(t * 1.2 + i * 0.5) * 0.08
            mesh.scale.multiplyScalar(pulse)
          }

          mat.opacity = growthProgress * (node.mastery > 0.7 ? 0.95 : 0.4 + node.mastery * 0.3)
        } else {
          mesh.scale.setScalar(0)
          mat.opacity = 0
        }
      }
    })
  })

  return (
    <group ref={groupRef}>
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[node.size, 16, 16]} />
          <meshPhysicalMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={node.mastery > 0.7 ? 1.5 : 0.4}
            transparent
            opacity={0}
            roughness={0.2}
            metalness={0.3}
            clearcoat={0.8}
          />
        </mesh>
      ))}

      {edges.map((edge, i) => {
        const positions = new Float32Array([
          edge.a.position.x, edge.a.position.y, edge.a.position.z,
          edge.b.position.x, edge.b.position.y, edge.b.position.z,
        ])
        const bothMastered = edge.a.mastery > 0.7 && edge.b.mastery > 0.7
        const edgeThreshold = Math.max(edge.a.growthThreshold, edge.b.growthThreshold)
        return (
          <EdgeLine
            key={`edge-${i}`}
            positions={positions}
            color={bothMastered ? edge.a.color : new THREE.Color('#1E1E30')}
            opacity={bothMastered ? 0.25 : 0.06}
            scrollProgress={scrollProgress}
            threshold={edgeThreshold}
          />
        )
      })}
    </group>
  )
}

// ─── Edge with scroll-driven visibility ─────────────────────────────────────

function EdgeLine({
  positions,
  color,
  opacity,
  scrollProgress,
  threshold,
}: {
  positions: Float32Array
  color: THREE.Color
  opacity: number
  scrollProgress: React.MutableRefObject<number>
  threshold: number
}) {
  const matRef = useRef<THREE.LineBasicMaterial>(null)

  useFrame(() => {
    const sp = scrollProgress.current
    if (matRef.current) {
      if (sp > threshold) {
        const growth = Math.min(1, (sp - threshold) / 0.1)
        matRef.current.opacity = growth * opacity
      } else {
        matRef.current.opacity = 0
      }
    }
  })

  return (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <lineBasicMaterial
        ref={matRef}
        color={color}
        transparent
        opacity={0}
        blending={THREE.AdditiveBlending}
      />
    </line>
  )
}

// ─── Ambient Dust ───────────────────────────────────────────────────────────

function AmbientDust({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const pointsRef = useRef<THREE.Points>(null)
  const count = 500

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 6 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return
    const t = state.clock.elapsedTime
    pointsRef.current.rotation.y = t * 0.02
    const sp = scrollProgress.current
    const mat = pointsRef.current.material as THREE.PointsMaterial
    mat.opacity = 0.05 + sp * 0.15
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.015}
        color="#818cf8"
        transparent
        opacity={0.05}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Camera Controller ──────────────────────────────────────────────────────

function CameraController({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree()

  useFrame(() => {
    const sp = scrollProgress.current
    const targetZ = 6 + sp * 10
    camera.position.z += (targetZ - camera.position.z) * 0.05
  })

  return null
}

// ─── The Scene ──────────────────────────────────────────────────────────────

function SeedScene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#ffffff" distance={8} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <pointLight position={[-10, -10, -10]} intensity={0.2} color="#d946ef" />

      <Suspense fallback={null}>
        <CentralOrb scrollProgress={scrollProgress} />
        <GraphNodes scrollProgress={scrollProgress} />
        <AmbientDust scrollProgress={scrollProgress} />
      </Suspense>

      <fog attach="fog" args={['#0B0B14', 8, 30]} />
      <CameraController scrollProgress={scrollProgress} />
    </>
  )
}

// ─── Main Component ─────────────────────────────────────────────────────────

export function PrismSeed({ className = '' }: { className?: string }) {
  const scrollProgress = useRef(0)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = docHeight > 0 ? Math.min(1, scrollTop / docHeight) : 0
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!mounted) return <div className={className} />

  return (
    <div className={className}>
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 2]} gl={{ antialias: true, alpha: true }}>
        <SeedScene scrollProgress={scrollProgress} />
        <EffectComposer>
          <Bloom
            intensity={1.2}
            luminanceThreshold={0.15}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.8}
          />
          <Vignette eskil={false} offset={0.2} darkness={0.9} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
