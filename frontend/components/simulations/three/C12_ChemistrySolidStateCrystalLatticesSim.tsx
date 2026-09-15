'use client';

/**
 * C12_ChemistrySolidStateCrystalLatticesSim.tsx
 * Class 12 Chemistry — Solid State — Crystal Lattices & Unit Cells (3D)
 *
 * WHY 3D: unit cells are spatial objects. Saying "atoms touch along the
 * face diagonal in FCC" means nothing until you orbit the lattice and see
 * which sphere touches which. This sim builds the three cubic lattices:
 *
 *   Simple cubic (SCC):  atoms at 8 corners          Z = 1,  r = a/2
 *   Body-centred  (BCC): corners + 1 body centre     Z = 2,  4r = √3 a
 *   Face-centred  (FCC): corners + 6 face centres    Z = 4,  4r = √2 a
 *
 * Controls: lattice type, a (pm), animated packing of 27 unit cells,
 * close-packed direction highlighting, live packing-efficiency readout.
 *
 *   packing efficiency = (Z · (4/3)πr³) / a³
 *   SCC 68.03% (6:4 CN), BCC 68.03%? -> BCC = 68.03? no:
 *   SCC 52.36%, BCC 68.03%, FCC 74.05%   (NCERT Table 1.2)
 *   Coordination number: SCC 6, BCC 8, FCC 12.
 */

import React, { useMemo, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Grid } from '@react-three/drei';
import * as THREE from 'three';
import {
  Atom, Box, Grid3x3, Percent, RotateCcw, Sparkles, Layers, Ruler,
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
// Lattice mathematics (the honest numerics)
// ─────────────────────────────────────────────────────────────

type LatticeKind = 'scc' | 'bcc' | 'fcc';

interface LatticeSpec {
  kind: LatticeKind;
  name: string;
  atomsDesc: string;
  Z: number;             // atoms per unit cell
  rOverA: number;        // r = f(a):  SCC 1/2, BCC √3/4, FCC √2/4
  packingPct: number;    // 52.36 / 68.03 / 74.05
  CN: number;            // coordination number 6 / 8 / 12
  closePackedDir: string;
  examples: string;
}

const LATTICES: Record<LatticeKind, LatticeSpec> = {
  scc: {
    kind: 'scc', name: 'Simple Cubic (SCC)',
    atomsDesc: '8 corners only', Z: 1,
    rOverA: 0.5, packingPct: 52.36, CN: 6,
    closePackedDir: 'edge — atoms touch along the cube edge (a = 2r)',
    examples: 'Polonium (α-Po) — rare',
  },
  bcc: {
    kind: 'bcc', name: 'Body-Centred Cubic (BCC)',
    atomsDesc: '8 corners + 1 body centre', Z: 2,
    rOverA: Math.sqrt(3) / 4, packingPct: 68.03, CN: 8,
    closePackedDir: 'body diagonal — corner atom touches the body-centre atom (4r = √3 a)',
    examples: 'Na, K, Fe (α-ferrite), W, CsCl-type',
  },
  fcc: {
    kind: 'fcc', name: 'Face-Centred Cubic (FCC)',
    atomsDesc: '8 corners + 6 face centres', Z: 4,
    rOverA: Math.SQRT2 / 4, packingPct: 74.05, CN: 12,
    closePackedDir: 'face diagonal — corner atom touches the face-centre atom (4r = √2 a)',
    examples: 'Cu, Ag, Au, Al, Ni — the close-packed metals',
  },
};

/** Lattice points of one unit cell, centred at origin, in units of a. */
function latticePoints(kind: LatticeKind): [number, number, number][] {
  const c: [number, number, number][] = [];
  const h = 0.5;
  for (const x of [-h, h])
    for (const y of [-h, h])
      for (const z of [-h, h]) c.push([x, y, z]);      // 8 corners
  if (kind === 'bcc') c.push([0, 0, 0]);                 // body centre
  if (kind === 'fcc') {
    c.push([0, 0, h], [0, 0, -h]);                       // ±z faces
    c.push([0, h, 0], [0, -h, 0]);                       // ±y faces
    c.push([h, 0, 0], [-h, 0, 0]);                       // ±x faces
  }
  return c;
}

/** Contribution of one atom to Z, by its position in the cell. */
function cornerShare(kind: LatticeKind): { corners: number; faces: number; body: number } {
  if (kind === 'scc') return { corners: 8, faces: 0, body: 0 };
  if (kind === 'bcc') return { corners: 8, faces: 0, body: 1 };
  return { corners: 8, faces: 6, body: 0 };
}

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function AtomSphere({
  position, radius, color = '', contribution,
}: {
  position: [number, number, number];
  radius: number;
  color?: string;
  contribution: 'corner' | 'face' | 'body';
}) {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const palette = { corner: '#fbbf24', face: '#60a5fa', body: '#f472b6' };
  const label = { corner: '⅛ shared', face: '½ shared', body: 'full' };
  const [hover, setHover] = useState(false);
  useFrame(() => {
    if (mat.current) {
      const t = hover ? 1 : 0.85;
      mat.current.opacity += (t - mat.current.opacity) * 0.15;
    }
  });
  return (
    <mesh
      position={position}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <sphereGeometry args={[radius, 40, 40]} />
      <meshStandardMaterial
        ref={mat}
        color={color || palette[contribution]}
        metalness={0.55}
        roughness={0.32}
        transparent
        opacity={0.88}
      />
    </mesh>
  );
}

function CellEdges({ a, highlight }: { a: number; highlight: 'none' | 'edge' | 'faceDiag' | 'bodyDiag' }) {
  const h = a / 2;
  const corners: [number, number, number][] = [];
  for (const x of [-h, h]) for (const y of [-h, h]) for (const z of [-h, h]) corners.push([x, y, z]);
  const edges: [THREE.Vector3, THREE.Vector3][] = [];
  for (let i = 0; i < 8; i++)
    for (const j of [i + 1, i + 2, i + 4])
      if (j < 8) edges.push([new THREE.Vector3(...corners[i]), new THREE.Vector3(...corners[j])]);
  const goldLine = (pts: [number, number, number][]) => (
    <line>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[new Float32Array(pts.flat()), 3]} />
      </bufferGeometry>
      <lineBasicMaterial color="#fbbf24" linewidth={2} transparent opacity={0.95} />
    </line>
  );
  return (
    <group>
      {edges.map(([p, q], i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[new Float32Array([p.x, p.y, p.z, q.x, q.y, q.z]), 3]}
            />
          </bufferGeometry>
          <lineBasicMaterial color="rgba(255,255,255,0.55)" transparent opacity={0.5} />
        </line>
      ))}
      {/* close-packed direction highlight */}
      {highlight === 'edge' && goldLine([[-h, -h, -h], [h, -h, -h]])}
      {highlight === 'faceDiag' && goldLine([[-h, -h, h], [h, h, h]])}
      {highlight === 'bodyDiag' && goldLine([[-h, -h, -h], [h, h, h]])}
    </group>
  );
}

/** 3×3×3 = 27 unit cells of spheres, showing the infinite lattice. */
function LatticeCloud({
  kind, a, r, show27,
}: {
  kind: LatticeKind; a: number; r: number; show27: boolean;
}) {
  const pts = useMemo(() => latticePoints(kind), [kind]);
  const cells = useMemo(() => {
    if (!show27) return [[0, 0, 0]];
    const out: [number, number, number][] = [];
    for (let i = -1; i <= 1; i++)
      for (let j = -1; j <= 1; j++)
        for (let k = -1; k <= 1; k++) out.push([i, j, k]);
    return out;
  }, [show27]);
  return (
    <group>
      {cells.map(([ci, cj, ck], idx) => (
        <group key={idx} position={[ci * a, cj * a, ck * a]}>
          {pts.map(([x, y, z], i) => (
            <AtomSphere key={i} position={[x * a, y * a, z * a]} radius={r} contribution={
              kind === 'bcc' && x === 0 && y === 0 && z === 0 ? 'body'
                : kind === 'fcc' && (Math.abs(x) + Math.abs(y) + Math.abs(z) === 0.5) ? 'face'
                  : 'corner'
            } />
          ))}
        </group>
      ))}
    </group>
  );
}

function AnimatedGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.25;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C12_ChemistrySolidStateCrystalLatticesSim() {
  const [kind, setKind] = useState<LatticeKind>('fcc');
  const [aPm, setAPm] = useState(361);       // Cu: a = 361 pm
  const [show27, setShow27] = useState(true);
  const [spin, setSpin] = useState(true);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const spec = LATTICES[kind];

  const rPm = spec.rOverA * aPm;
  // scene scale: a in pm → scene units  a/120 (Cu FCC → ~3 units)
  const aScene = aPm / 120;
  const rScene = spec.rOverA * aScene;
  const share = cornerShare(kind);
  const zCalc = share.corners / 8 + share.faces / 2 + share.body;
  const packing = ((spec.Z * (4 / 3) * Math.PI * Math.pow(spec.rOverA, 3)) / 1) * 100;

  const highlight =
    kind === 'scc' ? 'edge' : kind === 'bcc' ? 'bodyDiag' : 'faceDiag';

  // deterministic quiz bank (3 per lattice)
  const QUIZ: Record<LatticeKind, { q: string; opts: string[]; correct: number }[]> = {
    scc: [
      { q: 'How many atoms belong fully to ONE simple-cubic unit cell (Z)?', opts: ['1', '8', '4'], correct: 0 },
      { q: 'In SCC, along which line do atoms touch?', opts: ['The cube edge', 'The face diagonal', 'The body diagonal'], correct: 0 },
      { q: 'Coordination number of SCC?', opts: ['6', '8', '12'], correct: 0 },
    ],
    bcc: [
      { q: 'Which relation holds in BCC?', opts: ['4r = √3 a', '4r = √2 a', '2r = a'], correct: 0 },
      { q: 'The body-centre atom is shared with', opts: ['No other cell — it is fully inside', '2 cells', '8 cells'], correct: 0 },
      { q: 'Coordination number of BCC?', opts: ['8', '6', '12'], correct: 0 },
    ],
    fcc: [
      { q: 'A face-centred atom is shared between how many cells?', opts: ['2', '4', '8'], correct: 0 },
      { q: 'FCC packing efficiency is', opts: ['74.05%', '68.03%', '52.36%'], correct: 0 },
      { q: 'In FCC, atoms touch along', opts: ['the face diagonal (4r = √2 a)', 'the cube edge', 'the body diagonal'], correct: 0 },
    ],
  };
  const [quizIdx, setQuizIdx] = useState(0);
  const startQuiz = () => {
    setQuizIdx(0);
    setQuiz({ ...QUIZ[kind][0], picked: null });
  };
  const answer = (i: number) => {
    if (!quiz) return;
    setQuiz({ ...quiz, picked: i });
  };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ[kind].length) { setQuizIdx(n); setQuiz({ ...QUIZ[kind][n], picked: null }); }
    else setQuiz(null);
  };

  useEffect(() => { setQuiz(null); }, [kind]);

  const reset = () => { setKind('fcc'); setAPm(361); setShow27(true); setSpin(true); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active
        ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'
    }`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [7, 5.5, 11], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.4} />
          <directionalLight position={[10, 14, 8]} intensity={1.15} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid
            args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.12)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.28)"
            fadeDistance={80} fadeStrength={1.4} infiniteGrid
          />
          <AnimatedGroup spin={spin}>
            <CellEdges a={aScene} highlight={highlight as 'none' | 'edge' | 'faceDiag' | 'bodyDiag'} />
            <LatticeCloud kind={kind} a={aScene} r={rScene} show27={show27} />
          </AnimatedGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={40} maxPolarAngle={Math.PI / 2.02} target={[0, 0, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[240px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">{spec.name}</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">a (cell edge)</span><span className="text-white">{aPm} pm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">r (atom radius)</span><span className="text-white">{rPm.toFixed(1)} pm</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Z (atoms/cell)</span><span className="text-gold-300">{spec.Z}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Coordination no.</span><span className="text-gold-300">{spec.CN}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">Packing efficiency</span><span className="text-gold-300">{spec.packingPct.toFixed(2)}%</span></div>
          </div>
        </div>

        {/* orbit hint */}
        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Drag to orbit · scroll to zoom · hover an atom
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Box className="h-3.5 w-3.5 text-gold-400" /> Lattice:</span>
        {(['scc', 'bcc', 'fcc'] as LatticeKind[]).map((k) => (
          <button key={k} onClick={() => setKind(k)} className={btn(kind === k)}>
            {LATTICES[k].name.replace(/ \(.*\)/, '')}
          </button>
        ))}
        <span className="ml-3 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> a:</span>
        <input type="range" min={250} max={600} value={aPm} onChange={(e) => setAPm(Number(e.target.value))} className="h-11 w-40 accent-amber-400" />
        <span className="text-xs text-white">{aPm} pm</span>
        <button onClick={() => setShow27(!show27)} className={btn(show27)}>27 cells</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── the math, live ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Atom className="h-4 w-4" /> ATOMS PER CELL (Z)</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            {share.corners} corners × 1/8 {share.faces ? `+ ${share.faces} faces × 1/2 ` : ''}
            {share.body ? '+ 1 body centre × 1 ' : ''}= <span className="text-gold-300">{zCalc}</span> atom{zCalc > 1 ? 's' : ''}
          </p>
          <p className="mt-1 text-[11px] text-surface-500">{spec.atomsDesc}</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Layers className="h-4 w-4" /> CLOSE-PACKED DIRECTION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">{spec.closePackedDir}</p>
          <p className="mt-1 text-[11px] text-surface-500">Highlighted in gold — orbit to see the touch point.</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Percent className="h-4 w-4" /> PACKING EFFICIENCY</div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full rounded-full bg-gradient-to-r from-gold-400 to-amber-500 transition-all duration-500" style={{ width: `${packing}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-surface-300">
            Z·(4/3)πr³ / a³ = <span className="text-gold-300">{packing.toFixed(2)}%</span> · rest is void
          </p>
          <p className="mt-1 text-[11px] text-surface-500">e.g. {spec.examples}</p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            "A unit cell has {kind === 'bcc' ? '9' : kind === 'fcc' ? '14' : '8'} atoms" — <span className="text-white">no.</span>
            Corner atoms are <span className="text-gold-300">shared by 8 cells</span> (⅛ each) and face atoms by 2 (½ each).
            That sharing is exactly why the real count is Z = {spec.Z}. Toggle 27 cells off and count the touching spheres across the boundary to see it.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Switch to BCC and orbit until the gold body diagonal runs through two touching spheres — that line is where 4r = √3a lives.
            ② Compare FCC vs SCC packing bars: the 22-point jump is why copper ships as FCC, not simple cubic.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick questions on {spec.name} — no marks, no shame.</p>
            </div>
            <button onClick={startQuiz} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 px-4 py-2.5 text-xs font-display font-bold text-surface-0 hover:shadow-lg hover:shadow-gold-500/30">
              <Sparkles className="h-3.5 w-3.5" /> Start
            </button>
          </div>
        ) : (
          <div>
            <div className="font-display text-sm font-bold text-white">{quiz.q}</div>
            <div className="mt-3 grid gap-2">
              {quiz.opts.map((o, i) => {
                const isPicked = quiz.picked === i;
                const isCorrect = i === quiz.correct;
                const show = quiz.picked !== null;
                return (
                  <button key={i} disabled={show} onClick={() => answer(i)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-2.5 text-left text-xs transition-all ${
                      show && isCorrect ? 'border-emerald-400/60 bg-emerald-500/10 text-emerald-200'
                        : show && isPicked ? 'border-rose-400/60 bg-rose-500/10 text-rose-200'
                          : 'border-white/10 bg-white/[0.04] text-surface-200 hover:border-gold-400/40'
                    }`}>
                    <span>{o}</span>
                    {show && isCorrect && <span className="text-emerald-300">✓ correct</span>}
                    {show && isPicked && !isCorrect && <span className="text-rose-300">✗ — the gold answer is marked</span>}
                  </button>
                );
              })}
            </div>
            {quiz.picked !== null && (
              <button onClick={nextQ} className="mt-3 flex items-center gap-1.5 text-xs font-display font-semibold text-gold-300 hover:text-gold-200">
                {quizIdx < QUIZ[kind].length - 1 ? 'Next question →' : 'Finish →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
