'use client'

/**
 * PhysicsScene3D — the three react-three-fiber stages of the Physics
 * Sandbox (E1 Parameter Lab + E4 System Simulator per SANDBOX_TAXONOMY.md):
 *
 *   Projectile3D — u / angle sliders → live 3D trajectory + landing marker
 *   Wave3D       — f / lambda / A sliders → travelling 3D wave surface
 *   TwoBody3D    — m1 / m2 / r sliders → two masses + force-field hint
 *
 * Purely presentational: every HUD number shown next to these stages is
 * computed (or confirmed) by physics_families / physics2 / physics3 via
 * POST /api/sandbox/solve — the scenes only draw what the solver says.
 *
 * Loaded via next/dynamic (ssr:false) from PhysicsSandbox — three.js
 * never enters the page's first-load bundle (no Lighthouse regression).
 */
import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const G = 9.8

// ------------------------------------------------------------- projectile --

export interface ProjectileProps {
  /** launch speed, m/s */
  u: number
  /** launch angle, degrees */
  angle: number
}

function TrajectoryLine({ u, angle }: ProjectileProps) {
  const lineObj = useMemo(() => {
    const th = (angle * Math.PI) / 180
    const vx = u * Math.cos(th)
    const vy = u * Math.sin(th)
    const T = (2 * vy) / G
    const pts: THREE.Vector3[] = []
    const N = 64
    for (let i = 0; i <= N; i++) {
      const t = (T * i) / N
      pts.push(new THREE.Vector3(vx * t, vy * t - 0.5 * G * t * t, 0))
    }
    const geom = new THREE.BufferGeometry().setFromPoints(pts)
    return new THREE.Line(geom, new THREE.LineBasicMaterial({ color: '#38bdf8' }))
  }, [u, angle])

  const range = ((u * Math.cos((angle * Math.PI) / 180)) *
    (2 * u * Math.sin((angle * Math.PI) / 180)) / G)

  return (
    <group>
      <primitive object={lineObj} />
      {/* launcher barrel */}
      <mesh position={[0.3, 0.3, 0]} rotation={[0, 0, (angle * Math.PI) / 180]}>
        <boxGeometry args={[1.2, 0.22, 0.22]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* landing marker at the range the kinematics predicts */}
      <mesh position={[range, 0.06, 0]}>
        <cylinderGeometry args={[0.28, 0.28, 0.12, 24]} />
        <meshStandardMaterial color="#f59e0b" emissive="#b45309" emissiveIntensity={0.4} />
      </mesh>
    </group>
  )
}

export default function Projectile3D({ u, angle }: ProjectileProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [10, 7, 14], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[8, 12, 6]} intensity={1.1} />
        <TrajectoryLine u={u} angle={angle} />
        <gridHelper args={[40, 40, '#1e293b', '#0f172a']} />
        <OrbitControls enablePan={false} minDistance={6} maxDistance={30} />
      </Canvas>
    </div>
  )
}

function range_len(u: number, angle: number): number {
  const th = (angle * Math.PI) / 180
  return (u * Math.cos(th) * 2 * u * Math.sin(th)) / G
}

// -------------------------------------------------------------------- wave --

export interface WaveProps {
  /** frequency, Hz */
  f: number
  /** wavelength, m */
  lam: number
  /** amplitude, m */
  amp: number
}

function WaveSurface({ f, lam, amp }: WaveProps) {
  const ref = useRef<THREE.Mesh>(null)
  const geom = useMemo(() =>
    new THREE.PlaneGeometry(14, 10, 90, 60), [])

  useFrame(({ clock }) => {
    const mesh = ref.current
    if (!mesh) return
    const pos = geom.attributes.position as THREE.BufferAttribute
    const t = clock.getElapsedTime()
    const k = (2 * Math.PI) / Math.max(lam, 0.3)
    const w = 2 * Math.PI * f
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      pos.setZ(i, amp * Math.sin(k * x - w * t))
    }
    pos.needsUpdate = true
    geom.computeVertexNormals()
  })

  return (
    <mesh ref={ref} geometry={geom} rotation={[-Math.PI / 2.4, 0, 0]}>
      <meshStandardMaterial color="#0ea5e9" metalness={0.35} roughness={0.25}
        transparent opacity={0.9} side={THREE.DoubleSide} />
    </mesh>
  )
}

export function Wave3D({ f, lam, amp }: WaveProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 6, 12], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 8, 6]} intensity={1.0} />
        <WaveSurface f={f} lam={lam} amp={amp} />
        <OrbitControls enablePan={false} minDistance={6} maxDistance={22} />
      </Canvas>
    </div>
  )
}

// ----------------------------------------------------------------- two-body --

export interface TwoBodyProps {
  m1: number
  m2: number
  /** separation in metres (scene units: 1 m = 1 unit, clamped for view) */
  r: number
}

function MassSphere({ m, x, color }: { m: number; x: number; color: string }) {
  // radius grows with the cube root of the mass, capped for framing
  const rad = 0.35 + Math.min(1.6, Math.cbrt(Math.max(m, 0.1)) * 0.28)
  return (
    <mesh position={[x, rad, 0]}>
      <sphereGeometry args={[rad, 40, 28]} />
      <meshStandardMaterial color={color} metalness={0.25} roughness={0.35} />
    </mesh>
  )
}

function TwoBodyScene({ m1, m2, r }: TwoBodyProps) {
  const half = Math.min(6, Math.max(2.2, r / 2))
  return (
    <group>
      <MassSphere m={m1} x={-half} color="#38bdf8" />
      <MassSphere m={m2} x={half} color="#f472b6" />
      {/* the invisible "field" between them */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[half * 2, 0.35]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.25} />
      </mesh>
    </group>
  )
}

export function TwoBody3D({ m1, m2, r }: TwoBodyProps) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [0, 6, 13], fov: 50 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 9, 5]} intensity={1.05} />
        <TwoBodyScene m1={m1} m2={m2} r={r} />
        <gridHelper args={[24, 24, '#1e293b', '#0f172a']} />
        <OrbitControls enablePan={false} minDistance={6} maxDistance={24} />
      </Canvas>
    </div>
  )
}
