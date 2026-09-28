'use client'

/**
 * AccountancyStage3D — the 3D stage of the Accountancy Sandbox. Two
 * modes, one canvas module (stays out of the page bundle via
 * next/dynamic ssr:false from AccountancySandbox):
 *
 *   mode="pans"    — the flagship accounting-equation visualiser:
 *                    ASSETS on the left pan, LIABILITIES + CAPITAL on the
 *                    right. Every transaction animates its dual entry (the
 *                    debit chip rises, the credit chip falls) while the
 *                    beam stays level — the golden visual of the
 *                    discipline: both sides always balance. Purely
 *                    presentational: the totals are the same numbers the
 *                    solver validated in the workbench.
 *
 *   mode="decline" — the depreciation value-decline curve: one bar per
 *                    year of book value under SLM or WDV (colour-coded),
 *                    from solver-validated numbers.
 *
 * All labels are HTML overlays rendered by the parent — the 3D layer
 * carries no text (same convention as MathsSolids3D).
 */
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

export interface PanSide {
  assets: number
  liabilities: number
  capital: number
}

export interface DeclinePoint {
  year: number
  value: number
  wdv: boolean
}

interface PansProps {
  side: PanSide
  /** changes on every posted transaction → retriggers the dual entry pulse */
  pulse: number
  debitUp: boolean
}

const SCALE = 3 // world units for the largest expected side total

function Pan({ x, height, color, accent }: {
  x: number; height: number; color: string; accent: string
}) {
  const h = Math.max(height, 0.08)
  return (
    <group position={[x, h / 2, 0]}>
      <mesh castShadow>
        <boxGeometry args={[1.15, h, 1.15]} />
        <meshStandardMaterial color={color} metalness={0.15} roughness={0.35} />
      </mesh>
      {/* glowing cap plate */}
      <mesh position={[0, h / 2 + 0.03, 0]}>
        <boxGeometry args={[1.25, 0.06, 1.25]} />
        <meshStandardMaterial color={accent} emissive={accent}
          emissiveIntensity={0.55} />
      </mesh>
    </group>
  )
}

/** the chip that flies up (debit) or down (credit) on each post */
function EntryChip({ x, up, pulse, color }: {
  x: number; up: boolean; pulse: number; color: string
}) {
  const ref = useRef<THREE.Mesh>(null)
  const start = useRef(0)
  const lastPulse = useRef(-1)
  useFrame((state) => {
    const m = ref.current
    if (!m) return
    if (lastPulse.current !== pulse) {
      lastPulse.current = pulse
      start.current = state.clock.elapsedTime
    }
    const t = Math.min((state.clock.elapsedTime - start.current) / 1.4, 1)
    // ease-out: jump 1.1 units in the entry direction, settle back
    const k = Math.sin(Math.min(t, 1) * Math.PI) * (up ? 1.1 : -1.1)
    m.position.y = 2.6 + k
    const mat = m.material as THREE.MeshStandardMaterial
    mat.emissiveIntensity = 0.8 * (1 - t)
  })
  return (
    <mesh ref={ref} position={[x, 2.6, 0]}>
      <boxGeometry args={[0.55, 0.55, 0.55]} />
      <meshStandardMaterial color={color} emissive={color}
        emissiveIntensity={0.8} metalness={0.2} roughness={0.3} />
    </mesh>
  )
}

function Beam({ tilt }: { tilt: number }) {
  const ref = useRef<THREE.Group>(null)
  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.z = THREE.MathUtils.lerp(
        ref.current.rotation.z, tilt, 0.12)
    }
  })
  return (
    <group ref={ref}>
      <mesh castShadow>
        <boxGeometry args={[7.6, 0.18, 0.5]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.5} roughness={0.3} />
      </mesh>
    </group>
  )
}

function PansScene({ side, pulse, debitUp }: PansProps) {
  const total = Math.max(side.assets, side.liabilities + side.capital, 1)
  const k = SCALE / total
  const tilt = (side.assets - (side.liabilities + side.capital)) * 0.002
  return (
    <group position={[0, -1.2, 0]}>
      <Beam tilt={tilt} />
      <mesh position={[0, -0.15, 0]}>
        <cylinderGeometry args={[0.22, 0.4, 1.1, 24]} />
        <meshStandardMaterial color="#475569" metalness={0.4} roughness={0.4} />
      </mesh>
      <group position={[0, -0.25, 0]}>
        <Pan x={-2.6} height={(side.assets) * k} color="#0ea5e9" accent="#7dd3fc" />
        {/* liabilities + capital as two stacked blocks */}
        <group>
          <mesh castShadow
            position={[2.6, ((side.capital) * k) / 2, 0]}>
            <boxGeometry args={[1.15, Math.max(side.capital * k, 0.05), 1.15]} />
            <meshStandardMaterial color="#a78bfa" metalness={0.15}
              roughness={0.35} />
          </mesh>
          <mesh castShadow
            position={[2.6, (side.capital * k) + ((side.liabilities) * k) / 2, 0]}>
            <boxGeometry args={[1.15, Math.max(side.liabilities * k, 0.05), 1.15]} />
            <meshStandardMaterial color="#f59e0b" metalness={0.15}
              roughness={0.35} />
          </mesh>
        </group>
        <EntryChip x={-2.6} up={debitUp} pulse={pulse} color="#38bdf8" />
        <EntryChip x={2.6} up={!debitUp} pulse={pulse} color="#fbbf24" />
      </group>
    </group>
  )
}

function DeclineScene({ points }: { points: DeclinePoint[] }) {
  const bars = useMemo(() => points.slice(0, 16), [points])
  const max = Math.max(...bars.map(p => p.value), 1)
  const k = SCALE / max
  const n = Math.max(bars.length, 1)
  return (
    <group position={[-((n - 1) * 0.62) / 2, -1.6, 0]}>
      {bars.map((p, i) => {
        const h = Math.max(p.value * k, 0.05)
        const color = p.wdv ? '#a78bfa' : '#38bdf8'
        return (
          <mesh key={p.year} castShadow position={[i * 0.62, h / 2, 0]}>
            <boxGeometry args={[0.44, h, 0.44]} />
            <meshStandardMaterial color={color} metalness={0.15}
              roughness={0.35} />
          </mesh>
        )
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[((n - 1) * 0.62) / 2, -0.01, 0]} receiveShadow>
        <planeGeometry args={[n * 0.8 + 2, 4]} />
        <shadowMaterial opacity={0.22} />
      </mesh>
    </group>
  )
}

export default function AccountancyStage3D({
  mode, side, pulse, debitUp, points = [],
}: {
  mode: 'pans' | 'decline'
  side: PanSide
  pulse: number
  debitUp: boolean
  points?: DeclinePoint[]
}) {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [5.2, 3.2, 6.4], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 4]} intensity={1.1} castShadow />
        {mode === 'pans'
          ? <PansScene side={side} pulse={pulse} debitUp={debitUp} />
          : <DeclineScene points={points} />}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.62, 0]} receiveShadow>
          <planeGeometry args={[24, 24]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
        <gridHelper args={[24, 24, '#1e293b', '#0f172a']} position={[0, -1.6, 0]} />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={16} />
      </Canvas>
    </div>
  )
}
