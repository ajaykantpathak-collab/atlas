'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticleFieldProps {
  count?: number
  size?: number
  color?: string
  color2?: string
  speed?: number
  spread?: number
  className?: string
}

function Particles({
  count = 800,
  size = 0.015,
  color = '#6366f1',
  color2 = '#d946ef',
  speed = 0.3,
  spread = 8,
}: ParticleFieldProps) {
  const points = useRef<THREE.Points>(null!)
  const { viewport } = useThree()

  const [positions, colors] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const colors = new Float32Array(count * 3)
    const c1 = new THREE.Color(color)
    const c2 = new THREE.Color(color2)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread * 2
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread * 2
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread

      const mixed = c1.clone().lerp(c2, Math.random())
      colors[i * 3] = mixed.r
      colors[i * 3 + 1] = mixed.g
      colors[i * 3 + 2] = mixed.b
    }
    return [positions, colors]
  }, [count, color, color2, spread])

  useFrame((state) => {
    if (!points.current) return
    const time = state.clock.elapsedTime
    points.current.rotation.y = time * speed * 0.1
    points.current.rotation.x = Math.sin(time * speed * 0.15) * 0.1

    const posAttr = points.current.geometry.attributes.position as THREE.BufferAttribute
    const arr = posAttr.array as Float32Array
    for (let i = 0; i < count; i++) {
      arr[i * 3 + 1] += Math.sin(time * speed + i * 0.01) * 0.002
    }
    posAttr.needsUpdate = true
  })

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        vertexColors
        transparent
        opacity={0.6}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function FloatingShapes() {
  const group = useRef<THREE.Group>(null!)
  const shapes = useMemo(() => {
    const items: { pos: [number, number, number]; rot: [number, number, number]; scale: number; type: 'icosahedron' | 'octahedron' | 'torus' }[] = []
    for (let i = 0; i < 12; i++) {
      items.push({
        pos: [(Math.random() - 0.5) * 10, (Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4 - 2],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
        scale: 0.1 + Math.random() * 0.25,
        type: i % 3 === 0 ? 'icosahedron' : i % 3 === 1 ? 'octahedron' : 'torus',
      })
    }
    return items
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const time = state.clock.elapsedTime
    group.current.children.forEach((child, i) => {
      child.rotation.x = time * 0.2 + i
      child.rotation.y = time * 0.15 + i * 0.5
      child.position.y += Math.sin(time * 0.5 + i) * 0.003
    })
  })

  return (
    <group ref={group}>
      {shapes.map((s, i) => (
        <mesh key={i} position={s.pos} rotation={s.rot} scale={s.scale}>
          {s.type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
          {s.type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
          {s.type === 'torus' && <torusGeometry args={[0.8, 0.25, 16, 32]} />}
          <meshStandardMaterial
            color={i % 2 === 0 ? '#6366f1' : '#d946ef'}
            wireframe
            transparent
            opacity={0.15}
          />
        </mesh>
      ))}
    </group>
  )
}

export function ParticleField({
  count = 800,
  size = 0.015,
  color = '#6366f1',
  color2 = '#d946ef',
  speed = 0.3,
  spread = 8,
  className = '',
}: ParticleFieldProps) {
  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`} style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#6366f1" />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#d946ef" />
        <Particles count={count} size={size} color={color} color2={color2} speed={speed} spread={spread} />
        <FloatingShapes />
      </Canvas>
    </div>
  )
}
