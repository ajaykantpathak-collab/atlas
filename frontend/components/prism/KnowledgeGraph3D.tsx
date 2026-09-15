'use client'

import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { useRef, useMemo, useState, useEffect, Suspense } from 'react'
import * as THREE from 'three'

/* ═══════════════════════════════════════════════════════════════════════════
   Synapse — a living neural network.
   
   Learning = your brain building connections. This visualizes that.
   Neurons glow, fire, and connect as you scroll. You're inside a mind
   coming alive.
   
   Memory-optimized: ~80 neurons, ~40 edges, ~40 flow particles.
   No massive starfield. Custom shaders kept simple.
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Bioluminescent palette (warm, alive, not corporate) ────────────────────

const NEURON_COLORS = [
  new THREE.Color('#22D3EE'), // cyan — physics
  new THREE.Color('#4ADE80'), // emerald — chemistry
  new THREE.Color('#FB7185'), // rose — biology
  new THREE.Color('#A78BFA'), // violet — maths
  new THREE.Color('#FBBF24'), // gold — english
  new THREE.Color('#F472B6'), // pink — hindi
]

// ─── Types ──────────────────────────────────────────────────────────────────

interface Neuron {
  position: THREE.Vector3
  color: THREE.Color
  colorIdx: number
  size: number
  mastery: number
  activateAt: number  // scroll progress to light up
  phase: number       // pulse offset
}

// ─── Generate neural network (structured, not random) ───────────────────────

function generateNetwork(): { neurons: Neuron[]; edges: [number, number][] } {
  const neurons: Neuron[] = []
  const count = 80

  // Build in clusters — like brain regions
  const clusters = 6
  const clusterCenters: THREE.Vector3[] = []
  for (let c = 0; c < clusters; c++) {
    const angle = (c / clusters) * Math.PI * 2
    clusterCenters.push(new THREE.Vector3(
      Math.cos(angle) * 4,
      (Math.random() - 0.5) * 3,
      Math.sin(angle) * 4,
    ))
  }

  for (let i = 0; i < count; i++) {
    const cluster = i % clusters
    const center = clusterCenters[cluster]
    const colorIdx = cluster % NEURON_COLORS.length

    // Neurons cluster around centers with some spread
    const spread = 2.5
    const pos = new THREE.Vector3(
      center.x + (Math.random() - 0.5) * spread,
      center.y + (Math.random() - 0.5) * spread,
      center.z + (Math.random() - 0.5) * spread,
    )

    const mastery = Math.random() < 0.35 ? 0.7 + Math.random() * 0.3 : Math.random() * 0.35
    const size = mastery > 0.7 ? 0.09 + mastery * 0.05 : 0.05 + Math.random() * 0.03

    neurons.push({
      position: pos,
      color: NEURON_COLORS[colorIdx],
      colorIdx,
      size,
      mastery,
      activateAt: 0.03 + (i / count) * 0.55 + Math.random() * 0.08,
      phase: Math.random() * Math.PI * 2,
    })
  }

  // Build edges — connect within clusters + some cross-cluster
  const edges: [number, number][] = []
  for (let i = 0; i < count; i++) {
    const dists = neurons
      .map((n, j) => ({ j, d: neurons[i].position.distanceTo(n.position) }))
      .filter((x) => x.j !== i && x.d < 3.5)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2 + Math.floor(Math.random() * 2))
    for (const { j } of dists) {
      if (i < j) edges.push([i, j])
    }
  }

  // Add a few long-range connections (cross-cluster)
  for (let k = 0; k < 8; k++) {
    const a = Math.floor(Math.random() * count)
    const b = (a + 30 + Math.floor(Math.random() * 20)) % count
    if (a < b) edges.push([a, b])
  }

  return { neurons, edges }
}

// ─── Neuron Mesh (with glow halo for mastered ones) ─────────────────────────

function NeuronMesh({
  neuron,
  index,
  scrollProgress,
}: {
  neuron: Neuron
  index: number
  scrollProgress: React.MutableRefObject<number>
}) {
  const coreRef = useRef<THREE.Mesh>(null)
  const haloRef = useRef<THREE.Mesh>(null)
  const coreMatRef = useRef<THREE.MeshStandardMaterial>(null)
  const haloMatRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame((state) => {
    const sp = scrollProgress.current
    const t = state.clock.elapsedTime
    const active = sp > neuron.activateAt

    if (coreRef.current && coreMatRef.current) {
      if (active) {
        const growth = Math.min(1, (sp - neuron.activateAt) / 0.06)
        const pulse = 1 + Math.sin(t * 1.8 + neuron.phase) * 0.1
        coreRef.current.scale.setScalar(growth * pulse)
        coreMatRef.current.emissiveIntensity = (neuron.mastery > 0.7 ? 2.5 : 1.2) * growth
        coreMatRef.current.opacity = growth * (neuron.mastery > 0.7 ? 0.95 : 0.55)
      } else {
        coreRef.current.scale.setScalar(0.01)
        coreMatRef.current.opacity = 0
      }
    }

    if (haloRef.current && haloMatRef.current && neuron.mastery > 0.7) {
      if (active) {
        const growth = Math.min(1, (sp - neuron.activateAt) / 0.08)
        const haloPulse = 1 + Math.sin(t * 1.2 + neuron.phase) * 0.15
        haloRef.current.scale.setScalar(growth * haloPulse)
        haloMatRef.current.opacity = growth * 0.15
      } else {
        haloMatRef.current.opacity = 0
      }
    }
  })

  return (
    <group position={neuron.position}>
      {/* Core neuron */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[neuron.size, 12, 12]} />
        <meshStandardMaterial
          ref={coreMatRef}
          color={neuron.color}
          emissive={neuron.color}
          emissiveIntensity={0}
          transparent
          opacity={0}
        />
      </mesh>
      {/* Glow halo — only for mastered neurons */}
      {neuron.mastery > 0.7 && (
        <mesh ref={haloRef}>
          <sphereGeometry args={[neuron.size * 2.8, 8, 8]} />
          <meshBasicMaterial
            ref={haloMatRef}
            color={neuron.color}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

// ─── Synapse (edge between neurons, with flowing signal) ────────────────────

function Synapse({
  a,
  b,
  color,
  scrollProgress,
  threshold,
  bothMastered,
  signalDelay,
}: {
  a: THREE.Vector3
  b: THREE.Vector3
  color: THREE.Color
  scrollProgress: React.MutableRefObject<number>
  threshold: number
  bothMastered: boolean
  signalDelay: number
}) {
  const lineMatRef = useRef<THREE.LineBasicMaterial>(null)
  const signalRef = useRef<THREE.Mesh>(null)
  const signalMatRef = useRef<THREE.MeshBasicMaterial>(null)

  const positions = useMemo(
    () => new Float32Array([a.x, a.y, a.z, b.x, b.y, b.z]),
    [a, b],
  )

  useFrame((state) => {
    const sp = scrollProgress.current
    const t = state.clock.elapsedTime
    const active = sp > threshold

    if (lineMatRef.current) {
      if (active) {
        const growth = Math.min(1, (sp - threshold) / 0.06)
        lineMatRef.current.opacity = growth * (bothMastered ? 0.3 : 0.1)
      } else {
        lineMatRef.current.opacity = 0
      }
    }

    // Signal particle travels along the synapse
    if (signalRef.current && signalMatRef.current) {
      if (active && bothMastered) {
        const progress = ((t + signalDelay) % 2.5) / 2.5
        signalRef.current.position.lerpVectors(a, b, progress)
        signalMatRef.current.opacity = Math.sin(progress * Math.PI) * 0.9
        signalRef.current.visible = true
      } else {
        signalRef.current.visible = false
      }
    }
  })

  return (
    <group>
      {/* Connection line */}
      <line>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          ref={lineMatRef}
          color={color}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </line>
      {/* Flowing signal */}
      <mesh ref={signalRef}>
        <sphereGeometry args={[0.035, 8, 8]} />
        <meshBasicMaterial
          ref={signalMatRef}
          color={color}
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  )
}

// ─── Ambient particles (light dust, not heavy) ──────────────────────────────

function AmbientParticles({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const ref = useRef<THREE.Points>(null)
  const count = 300

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 12
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      pos[i * 3 + 2] = r * Math.cos(phi)
    }
    return pos
  }, [])

  useFrame((state) => {
    if (!ref.current) return
    const t = state.clock.elapsedTime
    ref.current.rotation.y = t * 0.015
    const sp = scrollProgress.current
    const mat = ref.current.material as THREE.PointsMaterial
    mat.opacity = 0.06 + sp * 0.1
  })

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#6366f1"
        transparent
        opacity={0.06}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

// ─── Camera (scroll-driven + mouse parallax) ────────────────────────────────

function CameraController({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera, mouse } = useThree()

  useFrame((state) => {
    const sp = scrollProgress.current
    const t = state.clock.elapsedTime

    // Camera moves THROUGH the network — from 7 to 14
    const targetZ = 7 + sp * 8
    camera.position.z += (targetZ - camera.position.z) * 0.04

    // Mouse parallax — feel alive
    const targetX = mouse.x * 1.2
    const targetY = mouse.y * 0.8
    camera.position.x += (targetX - camera.position.x) * 0.03
    camera.position.y += (targetY - camera.position.y) * 0.03

    // Gentle breathing
    camera.position.z += Math.sin(t * 0.25) * 0.04

    camera.lookAt(0, 0, 0)
  })

  return null
}

// ─── Scene ──────────────────────────────────────────────────────────────────

function SynapseScene({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { neurons, edges } = useMemo(() => generateNetwork(), [])

  return (
    <>
      {/* Warm, alive lighting — like inside a brain */}
      <ambientLight intensity={0.12} color="#1a1530" />
      <pointLight position={[0, 0, 0]} intensity={1.2} color="#6366f1" distance={12} />
      <pointLight position={[8, 4, 4]} intensity={0.35} color="#d946ef" />
      <pointLight position={[-8, -4, -4]} intensity={0.25} color="#22d3ee" />
      <pointLight position={[0, 8, 0]} intensity={0.15} color="#fbbf24" />

      <Suspense fallback={null}>
        {/* Neurons */}
        {neurons.map((neuron, i) => (
          <NeuronMesh
            key={i}
            neuron={neuron}
            index={i}
            scrollProgress={scrollProgress}
          />
        ))}

        {/* Synapses (connections with flowing signals) */}
        {edges.map(([a, b], i) => (
          <Synapse
            key={`syn-${i}`}
            a={neurons[a].position}
            b={neurons[b].position}
            color={neurons[a].mastery > 0.7 ? neurons[a].color : new THREE.Color('#312e4a')}
            scrollProgress={scrollProgress}
            threshold={Math.max(neurons[a].activateAt, neurons[b].activateAt)}
            bothMastered={neurons[a].mastery > 0.7 && neurons[b].mastery > 0.7}
            signalDelay={i * 0.25}
          />
        ))}

        <AmbientParticles scrollProgress={scrollProgress} />
      </Suspense>

      {/* Deep fog — like being inside something organic */}
      <fog attach="fog" args={['#0A0A14', 8, 28]} />
      <CameraController scrollProgress={scrollProgress} />
    </>
  )
}

// ─── Main Export ────────────────────────────────────────────────────────────

export function KnowledgeGraph3D({ className = '' }: { className?: string }) {
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
      <Canvas
        camera={{ position: [0, 0, 7], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <SynapseScene scrollProgress={scrollProgress} />
        <EffectComposer>
          <Bloom
            intensity={0.7}
            luminanceThreshold={0.08}
            luminanceSmoothing={0.9}
            mipmapBlur
            radius={0.6}
          />
          <Vignette eskil={false} offset={0.25} darkness={0.65} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}
