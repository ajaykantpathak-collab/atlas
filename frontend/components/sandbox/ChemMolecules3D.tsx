'use client'

/**
 * ChemMolecules3D — the chemistry 3D stage (lazy-loaded, ssr:false —
 * three.js never enters the page's first-load bundle).
 *
 * Two presentational views on one react-three-fiber canvas:
 *  1. MoleculeViewer  — ball-and-stick models built from real molecular
 *     geometry (standard bond lengths/angles: H2O 0.96 Å 104.5°, CO2
 *     1.16 Å linear, CH4 1.09 Å tetrahedral, NH3 1.01 Å 107°, NaCl
 *     rock-salt lattice a/2 = 2.82 Å). Rotate + zoom via OrbitControls.
 *  2. ReactionParticles3D — before/after atom inventories for the equation
 *     workbench; the atom counts shown are the same ones the solver's
 *     balanced coefficients produce (conservation of mass, made visible).
 *
 * Purely presentational: ground truth (balanced coefficients, formulas)
 * always comes from POST /api/sandbox/solve (chemistry_families.py), never
 * computed here.
 */
import { useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

// ---------------------------------------------------------------- elements --

const ELEMENT_STYLE: Record<string, { color: string; r: number }> = {
  H: { color: '#f1f5f9', r: 0.30 },
  C: { color: '#475569', r: 0.52 },
  N: { color: '#3b82f6', r: 0.50 },
  O: { color: '#ef4444', r: 0.50 },
  Na: { color: '#a78bfa', r: 0.72 },
  Mg: { color: '#fbbf24', r: 0.65 },
  Al: { color: '#cbd5e1', r: 0.65 },
  S: { color: '#eab308', r: 0.58 },
  Cl: { color: '#22c55e', r: 0.68 },
  Ca: { color: '#f97316', r: 0.75 },
  Fe: { color: '#d97706', r: 0.70 },
  Cu: { color: '#f97316', r: 0.70 },
  Zn: { color: '#94a3b8', r: 0.68 },
}

function styleOf(el: string) {
  return ELEMENT_STYLE[el] ?? { color: '#38bdf8', r: 0.5 }
}

interface Atom3D { el: string; p: [number, number, number] }

function Ball({ el, p, scale = 1 }: { el: string; p: [number, number, number]; scale?: number }) {
  const s = styleOf(el)
  return (
    <mesh position={p}>
      <sphereGeometry args={[s.r * scale, 32, 24]} />
      <meshStandardMaterial color={s.color} metalness={0.25} roughness={0.35} />
    </mesh>
  )
}

function Stick({ a, b, radius = 0.09 }: { a: [number, number, number]; b: [number, number, number]; radius?: number }) {
  const { mid, quat, len } = useMemo(() => {
    const va = new THREE.Vector3(...a)
    const vb = new THREE.Vector3(...b)
    const dir = vb.clone().sub(va)
    const len = dir.length()
    const mid = va.clone().add(vb).multiplyScalar(0.5)
    const quat = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 1, 0), dir.clone().normalize())
    return { mid, quat, len }
  }, [a, b])
  return (
    <mesh position={mid.toArray()} quaternion={quat}>
      <cylinderGeometry args={[radius, radius, len, 12]} />
      <meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.1} />
    </mesh>
  )
}

// ------------------------------------------------------- molecular geometries --

type MoleculeKey = 'H2O' | 'CO2' | 'CH4' | 'NH3' | 'NaCl'

/** Ball-and-stick data from standard bond lengths and angles (Å). */
const MOLECULES: Record<MoleculeKey, {
  label: string
  atoms: Atom3D[]
  bonds: [number, number][]
  /** grid step for the ionic lattice (Å); 0 = molecular */
  lattice?: number
}> = {
  H2O: {
    label: 'H2O — water (bent, 104.5°)',
    atoms: [
      { el: 'O', p: [0, 0, 0] },
      { el: 'H', p: [0.757, 0.586, 0] },
      { el: 'H', p: [-0.757, 0.586, 0] },
    ],
    bonds: [[0, 1], [0, 2]],
  },
  CO2: {
    label: 'CO2 — carbon dioxide (linear)',
    atoms: [
      { el: 'C', p: [0, 0, 0] },
      { el: 'O', p: [1.16, 0, 0] },
      { el: 'O', p: [-1.16, 0, 0] },
    ],
    bonds: [[0, 1], [0, 2]],
  },
  CH4: {
    label: 'CH4 — methane (tetrahedral, 109.5°)',
    atoms: [
      { el: 'C', p: [0, 0, 0] },
      { el: 'H', p: [0.629, 0.629, 0.629] },
      { el: 'H', p: [0.629, -0.629, -0.629] },
      { el: 'H', p: [-0.629, 0.629, -0.629] },
      { el: 'H', p: [-0.629, -0.629, 0.629] },
    ],
    bonds: [[0, 1], [0, 2], [0, 3], [0, 4]],
  },
  NH3: {
    label: 'NH3 — ammonia (pyramidal, 107°)',
    atoms: [
      { el: 'N', p: [0, 0.19, 0] },
      { el: 'H', p: [0.95, -0.19, 0] },
      { el: 'H', p: [-0.475, -0.19, 0.823] },
      { el: 'H', p: [-0.475, -0.19, -0.823] },
    ],
    bonds: [[0, 1], [0, 2], [0, 3]],
  },
  NaCl: {
    label: 'NaCl — rock-salt lattice (3×3×3, 2.82 Å)',
    atoms: [],
    bonds: [],
    lattice: 1.41,
  },
}

function latticeAtoms(step: number): Atom3D[] {
  const out: Atom3D[] = []
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++)
      for (let k = 0; k < 3; k++)
        out.push({
          el: (i + j + k) % 2 === 0 ? 'Na' : 'Cl',
          p: [(i - 1) * step, (j - 1) * step, (k - 1) * step],
        })
  return out
}

function fitScale(atoms: Atom3D[], target = 2.1): number {
  let max = 0.001
  for (const a of atoms) max = Math.max(max, Math.hypot(...a.p))
  return target / max
}

function MoleculeGroup({ mol }: { mol: MoleculeKey }) {
  const def = MOLECULES[mol]
  const atoms = def.lattice ? latticeAtoms(def.lattice) : def.atoms
  const k = fitScale(atoms, def.lattice ? 2.3 : 2.1)
  return (
    <group>
      {def.lattice
        ? // ionic lattice: faint nearest-neighbour connectors, no sticks
        null
        : def.bonds.map(([i, j], n) => (
          <Stick key={n} a={atoms[i].p.map(v => v * k) as [number, number, number]}
            b={atoms[j].p.map(v => v * k) as [number, number, number]} />
        ))}
      {atoms.map((a, i) => (
        <Ball key={i} el={a.el} p={a.p.map(v => v * k) as [number, number, number]} scale={def.lattice ? 0.75 : 1} />
      ))}
    </group>
  )
}

export default function MoleculeViewer({ molecule }: { molecule: MoleculeKey }) {
  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [3.2, 2.4, 4.6], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.55} />
        <directionalLight position={[5, 8, 4]} intensity={1.15} />
        <pointLight position={[-4, -2, -4]} intensity={0.35} />
        <MoleculeGroup mol={molecule} />
        <OrbitControls enablePan={false} minDistance={3} maxDistance={12} />
      </Canvas>
      <p className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-bold text-slate-400 pointer-events-none">
        {MOLECULES[molecule].label} · drag to rotate, scroll to zoom
      </p>
    </div>
  )
}

export type { MoleculeKey }

// ------------------------------------------------- reaction particle counts --

export interface AtomInventory {
  /** element symbol -> total atoms (coefficients x subscripts) */
  [el: string]: number
}

/** deterministic ring layout for n spheres of one element */
function ring(count: number, el: string, offset: [number, number, number]): Atom3D[] {
  const out: Atom3D[] = []
  const s = styleOf(el)
  const perRow = Math.ceil(Math.sqrt(count))
  const gap = s.r * 2 + 0.12
  for (let i = 0; i < count; i++) {
    const row = Math.floor(i / perRow)
    const col = i % perRow
    const inRow = Math.min(perRow, count - row * perRow)
    out.push({
      el,
      p: [
        offset[0] + (col - (inRow - 1) / 2) * gap,
        offset[1] - row * gap,
        offset[2],
      ],
    })
  }
  return out
}

/**
 * Before/after atom inventory. The parent computes BOTH inventories from
 * the SOLVER's balanced coefficients (atom tally client-side mirrors the
 * same arithmetic for display only). Equal totals = mass conserved.
 */
export function ReactionParticles3D({
  before, after,
}: { before: AtomInventory; after: AtomInventory }) {
  const groups = useMemo(() => {
    const place = (inv: AtomInventory, xCenter: number) => {
      const els = Object.keys(inv).sort()
      const out: Atom3D[] = []
      let yTop = ((els.length - 1) / 2) * 1.1
      for (const el of els) {
        out.push(...ring(inv[el] || 0, el, [xCenter, yTop, 0]))
        yTop -= 1.1
      }
      return out
    }
    return { b: place(before, -2.4), a: place(after, 2.4) }
  }, [before, after])

  return (
    <div className="h-full w-full relative">
      <Canvas camera={{ position: [0, 0.4, 7.2], fov: 42 }} dpr={[1, 1.5]}>
        <color attach="background" args={['#020617']} />
        <ambientLight intensity={0.6} />
        <directionalLight position={[4, 7, 5]} intensity={1.1} />
        {groups.b.map((a, i) => <Ball key={'b' + i} el={a.el} p={a.p} scale={0.8} />)}
        {groups.a.map((a, i) => <Ball key={'a' + i} el={a.el} p={a.p} scale={0.8} />)}
        <OrbitControls enablePan={false} enableZoom={false} />
      </Canvas>
      <span className="absolute top-2 left-3 text-[10px] font-black text-gold-300 uppercase tracking-widest pointer-events-none">before</span>
      <span className="absolute top-2 right-3 text-[10px] font-black text-emerald-300 uppercase tracking-widest pointer-events-none">after</span>
    </div>
  )
}
