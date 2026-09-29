'use client'

/**
 * CircularFlow3D — the ONLY 3D piece of the economics sandbox (per
 * SANDBOX_TAXONOMY: economics is 2D-native except the circular-flow model
 * where 3D adds genuine value).
 *
 * Four sectors — households, firms, government, foreign — with animated
 * money flows. Flow thickness/particle speed track the slider values; the
 * GDP identity GDP = C + I + G + (X - M) is computed by the shared solver
 * (economicsSolvers.gdpExpenditure) and read out live.
 *
 * Imported lazily (next/dynamic, ssr:false) from EconomicsSandbox so the
 * three.js bundle never enters the main sandbox chunk.
 */

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import * as THREE from 'three'

export interface FlowSpec {
  /** flow label, e.g. 'C' */
  id: string
  /** amount in Rs (drives thickness + particle speed) */
  amount: number
  color: string
  /** waypoints in scene units: [x,y,z] start -> end */
  from: [number, number, number]
  to: [number, number, number]
  /** curves bend through this midpoint */
  bend?: [number, number, number]
  /** true for leakages/import-style flows (animate the other way) */
  reverse?: boolean
}

const SECTORS: { id: string; label: string; pos: [number, number, number]; color: string }[] = [
  { id: 'hh', label: 'Households', pos: [-4.2, 0, 0], color: '#38bdf8' },
  { id: 'fm', label: 'Firms', pos: [4.2, 0, 0], color: '#34d399' },
  { id: 'gov', label: 'Government', pos: [0, 3.1, -1.6], color: '#f59e0b' },
  { id: 'for', label: 'Foreign', pos: [0, -3.1, -1.6], color: '#c084fc' },
]

function SectorNode({ label, pos, color }: { label: string; pos: [number, number, number]; color: string }) {
  const ref = useRef<THREE.Mesh>(null)
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.25
  })
  return (
    <group position={pos}>
      <mesh ref={ref}>
        <icosahedronGeometry args={[0.95, 1]} />
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.25} />
      </mesh>
      <Html center distanceFactor={11}>
        <div className="rounded-lg border border-white/15 bg-slate-900/85 px-2.5 py-1 text-[11px] font-black whitespace-nowrap text-white shadow-lg">
          {label}
        </div>
      </Html>
    </group>
  )
}

function FlowParticles({ flow }: { flow: FlowSpec }) {
  const N = 6
  const mesh = useRef<THREE.InstancedMesh>(null)
  const curve = useMemo(() => {
    const a = new THREE.Vector3(...flow.from)
    const b = new THREE.Vector3(...flow.to)
    const mid = flow.bend
      ? new THREE.Vector3(...flow.bend)
      : a.clone().add(b).multiplyScalar(0.5)
    return new THREE.QuadraticBezierCurve3(a, mid, b)
  }, [flow])
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const speed = useMemo(() => 0.06 + Math.min(flow.amount / 4000, 0.55), [flow.amount])
  const scale = useMemo(() => 0.5 + Math.min(flow.amount / 2500, 2.2), [flow.amount])

  useFrame(({ clock }) => {
    if (!mesh.current) return
    const t0 = (clock.elapsedTime * speed * (flow.reverse ? -1 : 1)) % 1
    for (let i = 0; i < N; i++) {
      const t = ((t0 + i / N) % 1 + 1) % 1
      curve.getPoint(t, dummy.position)
      dummy.scale.setScalar(scale * (0.55 + 0.45 * Math.sin((t) * Math.PI)))
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    }
    mesh.current.instanceMatrix.needsUpdate = true
  })

  return (
    <>
      <mesh>
        <tubeGeometry args={[curve, 40, 0.045 + Math.min(flow.amount / 9000, 0.14), 6, false]} />
        <meshBasicMaterial color={flow.color} transparent opacity={0.22} />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshBasicMaterial color={flow.color} />
      </instancedMesh>
    </>
  )
}

export interface CircularFlow3DProps {
  c: number
  i: number
  g: number
  x: number
  m: number
}

/**
 * Scene layout: HH <-> Firms on the x-axis; Government above; Foreign
 * below.  Flows: C (HH->Firms), factor income (Firms->HH, reverse),
 * I (investment loop into Firms), G (Govt->Firms), X (Firms->Foreign),
 * M (Foreign->Firms, a leakage).
 */
export default function CircularFlow3D({ c, i, g, x, m }: CircularFlow3DProps) {
  const HH: [number, number, number] = [-4.2, 0, 0]
  const FM: [number, number, number] = [4.2, 0, 0]
  const GOV: [number, number, number] = [0, 3.1, -1.6]
  const FOR: [number, number, number] = [0, -3.1, -1.6]

  const flows: FlowSpec[] = [
    { id: 'C — consumption', amount: c, color: '#38bdf8', from: HH, to: FM, bend: [0, -1.2, 0.8] },
    { id: 'Factor income (wages)', amount: Math.max(c * 0.9, 120), color: '#7dd3fc', from: FM, to: HH, bend: [0, 1.2, 0.8], reverse: true },
    { id: 'I — investment', amount: i, color: '#34d399', from: [7.6, 2.3, 0.6], to: FM, bend: [6.4, 0.6, 1.4] },
    { id: 'G — government spending', amount: g, color: '#f59e0b', from: GOV, to: FM, bend: [2.6, 1.7, -0.4] },
    { id: 'X — exports', amount: x, color: '#c084fc', from: FM, to: FOR, bend: [3.0, -1.6, -0.4] },
    { id: 'M — imports (leakage)', amount: m, color: '#f472b6', from: FOR, to: FM, bend: [-2.8, -1.7, -0.4], reverse: true },
  ]

  return (
    <div className="relative h-[380px] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#070a14]">
      <Canvas camera={{ position: [0, 1.2, 14.5], fov: 46 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.55} />
        <pointLight position={[6, 8, 10]} intensity={110} />
        <directionalLight position={[-8, 4, 6]} intensity={1.1} />
        {SECTORS.map(s => (
          <SectorNode key={s.id} label={s.label} pos={s.pos} color={s.color} />
        ))}
        {flows.map(f => <FlowParticles key={f.id} flow={f} />)}
        <OrbitControls enablePan={false} minDistance={9} maxDistance={22} />
      </Canvas>
      <div className="pointer-events-none absolute left-3 top-3 rounded-lg border border-white/10 bg-slate-900/80 px-2.5 py-1.5">
        <p className="text-[9px] font-black uppercase tracking-widest text-gold-300">drag to orbit · scroll to zoom</p>
      </div>
    </div>
  )
}
