'use client'

/**
 * BiologyCell3D — the 3D Organism/Cell Explorer stage (SANDBOX_TAXONOMY.md,
 * biology engine #1).  Renders a plant / animal / prokaryotic cell as 3D
 * structures the student can click; every organelle hover/click surfaces
 * its authored one-line function (static curated table below — the same
 * closed-world style as the chemistry molecule table) and BiologySandbox
 * fetches the authored corpus content for the linked node.
 *
 * Purely presentational: no solver math here.  Loaded via
 * next/dynamic(ssr:false) so three.js stays out of the page bundle.
 */
import { Canvas } from '@react-three/fiber'
import { Html, OrbitControls } from '@react-three/drei'
import { useMemo, useState } from 'react'
import { ORGANELLE_FACTS } from './biologyTopics'

export type CellType = 'plant' | 'animal' | 'prokaryote'

export interface OrganelleInfo {
  key: string
  label: string
  fn: string
}

// ORGANELLE_FACTS (the authored function table) lives in biologyTopics.ts
// so solver-only consumers never import three.js.  Re-exported for the
// 3D module's own use below.

interface Blob {
  key: string
  color: string
  pos: [number, number, number]
  size: number
  /** squashed ellipsoid factor [x, y, z] (1 = sphere) */
  squash?: [number, number, number]
}

const MEMBRANE_COLOR = '#7dd3fc'
const WALL_COLOR = '#4ade80'

function Organelle({ blob, selected, onSelect }:
  { blob: Blob; selected: string | null; onSelect: (k: string) => void }) {
  const [hover, setHover] = useState(false)
  const sq = blob.squash ?? [1, 1, 1]
  const active = selected === blob.key
  return (
    <mesh
      position={blob.pos}
      scale={[blob.size * sq[0], blob.size * sq[1], blob.size * sq[2]]}
      onPointerOver={(e) => { e.stopPropagation(); setHover(true) }}
      onPointerOut={() => setHover(false)}
      onClick={(e) => { e.stopPropagation(); onSelect(blob.key) }}
    >
      <sphereGeometry args={[1, 32, 24]} />
      <meshStandardMaterial
        color={blob.color}
        transparent
        opacity={hover || active ? 0.95 : 0.8}
        emissive={active ? '#fbbf24' : hover ? '#ffffff' : '#000000'}
        emissiveIntensity={active ? 0.55 : hover ? 0.25 : 0}
        roughness={0.4}
      />
    </mesh>
  )
}

function CellScene({ cellType, selected, onSelect }: {
  cellType: CellType
  selected: string | null
  onSelect: (k: string) => void
}) {
  const [memHover, setMemHover] = useState(false)
  const [wallHover, setWallHover] = useState(false)
  const blobs = useMemo<Blob[]>(() => {
    if (cellType === 'prokaryote') {
      return [
        { key: 'nucleoid', color: '#fbbf24', pos: [0, 0, 0], size: 0.85, squash: [1.5, 0.9, 1.2] },
        { key: 'ribosome', color: '#f472b6', pos: [0.9, 0.6, 0.3], size: 0.16 },
        { key: 'ribosome', color: '#f472b6', pos: [-0.8, -0.5, 0.4], size: 0.14 },
        { key: 'ribosome', color: '#f472b6', pos: [0.2, -0.9, -0.3], size: 0.15 },
        { key: 'ribosome', color: '#f472b6', pos: [-0.5, 0.8, -0.5], size: 0.13 },
        { key: 'mitochondria', color: '#fb923c', pos: [0.6, -0.3, 0.7], size: 0.22, squash: [1.8, 0.8, 0.8] },
      ]
    }
    const common: Blob[] = [
      { key: 'nucleus', color: '#a78bfa', pos: [-0.5, 0.4, 0], size: 1.0 },
      { key: 'mitochondria', color: '#fb923c', pos: [1.1, 0.5, 0.4], size: 0.34, squash: [1.9, 0.75, 0.8] },
      { key: 'mitochondria', color: '#fb923c', pos: [0.4, -0.9, -0.5], size: 0.3, squash: [1.9, 0.75, 0.8] },
      { key: 'ribosome', color: '#f472b6', pos: [1.3, -0.4, 0.6], size: 0.14 },
      { key: 'ribosome', color: '#f472b6', pos: [-0.9, -0.6, 0.7], size: 0.13 },
      { key: 'cytoplasm', color: '#0ea5e9', pos: [1.2, 0.9, -0.8], size: 0.35, squash: [1, 0.7, 1] },
    ]
    if (cellType === 'plant') {
      return [
        ...common,
        { key: 'vacuole', color: '#38bdf8', pos: [0.7, -0.2, 0.1], size: 1.25, squash: [1.25, 1.0, 1.0] },
        { key: 'chloroplast', color: '#22c55e', pos: [-0.9, -0.7, 0.6], size: 0.3, squash: [1.7, 0.7, 0.9] },
        { key: 'chloroplast', color: '#22c55e', pos: [0.2, 1.1, 0.7], size: 0.28, squash: [1.7, 0.7, 0.9] },
        { key: 'chloroplast', color: '#22c55e', pos: [-0.4, 0.0, -1.1], size: 0.31, squash: [1.7, 0.7, 0.9] },
      ]
    }
    return [
      ...common,
      { key: 'vacuole', color: '#38bdf8', pos: [0.8, -0.5, -0.4], size: 0.4, squash: [1.3, 1.0, 1.1] },
    ]
  }, [cellType])

  const R = 2.35
  return (
    <group>
      {/* membrane — transparent boundary sphere */}
      <mesh
        onPointerOver={() => setMemHover(true)}
        onPointerOut={() => setMemHover(false)}
        onClick={(e) => { e.stopPropagation(); onSelect('membrane') }}
      >
        <sphereGeometry args={[R, 48, 32]} />
        <meshStandardMaterial
          color={MEMBRANE_COLOR}
          transparent
          opacity={memHover ? 0.35 : 0.16}
          roughness={0.15}
          side={2}
        />
      </mesh>
      {/* cell wall — plants and prokaryotes only */}
      {(cellType === 'plant' || cellType === 'prokaryote') && (
        <mesh
          onClick={(e) => { e.stopPropagation(); onSelect('wall') }}
          onPointerOver={(e) => { e.stopPropagation(); setWallHover(true) }}
          onPointerOut={() => setWallHover(false)}
        >
          <sphereGeometry args={[R * 1.12, 48, 32]} />
          <meshStandardMaterial
            color={WALL_COLOR}
            transparent
            opacity={wallHover ? 0.32 : 0.12}
            roughness={0.7}
            side={2}
          />
        </mesh>
      )}
      {blobs.map((b, i) => (
        <Organelle key={b.key + i} blob={b} selected={selected} onSelect={onSelect} />
      ))}
      <Html center position={[0, -R - 0.7, 0]}>
        <div className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
          {cellType === 'plant' ? 'plant cell — wall + membrane + chloroplasts + big vacuole'
            : cellType === 'animal' ? 'animal cell — membrane only, small vacuoles'
              : 'prokaryote — nucleoid DNA, no nucleus, ribosomes'}
        </div>
      </Html>
    </group>
  )
}

export default function BiologyCell3D({ cellType, selected, onSelect }: {
  cellType: CellType
  selected: string | null
  onSelect: (k: string) => void
}) {
  return (
    <div className="h-full w-full">
      <Canvas camera={{ position: [5, 3.5, 5.5], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 8, 4]} intensity={1.05} />
        <pointLight position={[-6, -4, -6]} intensity={0.25} color="#38bdf8" />
        <CellScene cellType={cellType} selected={selected} onSelect={onSelect} />
        <OrbitControls enablePan={false} minDistance={4} maxDistance={13} />
      </Canvas>
    </div>
  )
}
