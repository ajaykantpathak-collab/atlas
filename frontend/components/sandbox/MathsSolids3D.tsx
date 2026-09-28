'use client'

/**
 * MathsSolids3D — the mensuration manipulative stage. Renders ONE solid
 * (cube / cylinder / cone / sphere / hemisphere) at live slider-driven
 * dimensions inside a react-three-fiber canvas. Purely presentational:
 * all measurement math lives in MathsSandbox so the numbers shown in the
 * HUD are the same ones the solver family computes.
 *
 * Loaded via next/dynamic (ssr:false) from MathsSandbox — three.js never
 * enters the page's first-load bundle.
 */
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

export type SolidKind =
  | 'cube' | 'cylinder' | 'cone' | 'sphere' | 'hemisphere'

interface Props {
  solid: SolidKind
  /** edge (cube), radius (round solids) */
  s: number
  /** height (cylinder/cone) */
  h: number
}

function SolidMesh({ solid, s, h }: Props) {
  // world-scale normalisation keeps every solid framed in one camera
  const dim = solid === 'cube' ? s : solid === 'cylinder' || solid === 'cone'
    ? Math.max(s * 2, h)
    : s * 2
  const k = 3 / Math.max(dim, 0.001)
  const R = s * k
  const H = h * k

  if (solid === 'cube') {
    return (
      <mesh castShadow position={[0, (s * k) / 2, 0]}>
        <boxGeometry args={[R, R, R]} />
        <meshStandardMaterial color="#38bdf8" metalness={0.15} roughness={0.35} />
      </mesh>
    )
  }
  if (solid === 'cylinder') {
    return (
      <mesh castShadow position={[0, H / 2, 0]}>
        <cylinderGeometry args={[R, R, H, 48]} />
        <meshStandardMaterial color="#a78bfa" metalness={0.15} roughness={0.35} />
      </mesh>
    )
  }
  if (solid === 'cone') {
    return (
      <mesh castShadow position={[0, H / 2, 0]}>
        <coneGeometry args={[R, H, 48]} />
        <meshStandardMaterial color="#f59e0b" metalness={0.1} roughness={0.4} />
      </mesh>
    )
  }
  if (solid === 'sphere') {
    return (
      <mesh castShadow position={[0, R, 0]}>
        <sphereGeometry args={[R, 48, 32]} />
        <meshStandardMaterial color="#34d399" metalness={0.2} roughness={0.3} />
      </mesh>
    )
  }
  // hemisphere: top half-sphere + flat circular base
  return (
    <group>
      <mesh castShadow position={[0, R * 0.001, 0]}>
        <sphereGeometry args={[R, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#f472b6" metalness={0.15} roughness={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[R, 48]} />
        <meshStandardMaterial color="#9d174d" roughness={0.6} side={2} />
      </mesh>
    </group>
  )
}

export default function MathsSolids3D({ solid, s, h }: Props) {
  return (
    <div className="h-full w-full">
      <Canvas shadows camera={{ position: [4.5, 3.5, 5.5], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 4]} intensity={1.1} castShadow />
        <SolidMesh solid={solid} s={s} h={h} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <shadowMaterial opacity={0.25} />
        </mesh>
        <gridHelper args={[20, 20, '#1e293b', '#0f172a']} position={[0, 0, 0]} />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={14} />
      </Canvas>
    </div>
  )
}
