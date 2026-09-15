'use client';

/**
 * C12_ChemistryMetallicCrystalsSim.tsx — 3D
 * Class 12 Chemistry — Solid State — Packing in Metals: CCP vs HCP
 * [3d-lab:c12-solidstate-metals]
 *
 * WHY 3D: the entire difference between the two most common metal
 * structures is WHERE THE THIRD LAYER GOES — a purely 3D fact invisible
 * in any flat figure. Watch both stacks build and the third layer choose.
 *
 * HONEST NUMERICS — layer height and c/a derived by hand:
 *   Three mutually touching spheres of radius r have centres at the
 *   corners of an equilateral triangle of side 2r; the sphere nestled on
 *   top has its centre above the triangle centroid. Centroid-to-corner
 *   distance is 2r/√3, so Pythagoras on the touching line (length 2r):
 *      h² + (2r/√3)² = (2r)²   →   h = 2r√(2/3)
 *   An HCP cell stacks two such layers:  c = 2h = 4r√(2/3), a = 2r
 *      →  c/a = 2√(2/3) = 1.633   (ideal HCP)
 *   Real metals deviate — Mg 1.624, Zn 1.856 — because electrons are not
 *   spheres; the HUD shows both ideal and measured values.
 *   Packing efficiency (evaluated live): FCC cell of 4 atoms with
 *   4r = √2·a →  η = 4·(4/3)πr³/a³ = π/(3√2) = 74.05% — identical for
 *   CCP and ideal HCP, and BOTH have CN = 12. Same efficiency, different
 *   symmetry: that is the exam trap this sim defuses.
 *
 * Controls: structure (CCP/HCP), build animation, explode layers,
 * highlight the decisive third layer, spin, Reset.
 */

import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Atom, RotateCcw, Sparkles, Layers } from 'lucide-react';

type V3 = [number, number, number];

const D = 1;                      // sphere spacing
const RS = D / 2;
const H = Math.sqrt(2 / 3) * D;   // interlayer height
const SQ3 = Math.sqrt(3);

const OFF: Record<'A' | 'B' | 'C', [number, number]> = {
  A: [0, 0],
  B: [D / 2, SQ3 / 6],
  C: [0, SQ3 / 3],
};
const LAYER_COL: Record<'A' | 'B' | 'C', string> = {
  A: '#fbbf24', B: '#60a5fa', C: '#c084fc',
};

function layerPts(cols: number, rows: number): [number, number][] {
  const out: [number, number][] = [];
  for (let j = 0; j < rows; j++)
    for (let i = 0; i < cols; i++)
      out.push([(i + j / 2) * D - cols * 0.55, j * (SQ3 / 2) * D - rows * 0.42]);
  return out;
}

const COLS = 4;
const ROWS = 3;
const PTS = layerPts(COLS, ROWS);

function StackBuilder({ kind, explode, building, buildT, showThird }: {
  kind: 'ccp' | 'hcp'; explode: number; building: boolean; buildT: React.MutableRefObject<number>;
  showThird: boolean;
}) {
  const stack: ('A' | 'B' | 'C')[] = kind === 'ccp' ? ['A', 'B', 'C'] : ['A', 'B', 'A'];
  const done = buildT.current >= stack.length * 0.9;
  const nVisible = building ? Math.min(stack.length, Math.floor(buildT.current / 0.9) + 1) : stack.length;
  // partial reveal of the layer currently appearing; complete stack stays stable
  const layerFrac = !building || done ? 1 : (buildT.current % 0.9) / 0.9;

  const visible = useMemo(() => stack.slice(0, Math.min(stack.length, nVisible)), [stack, nVisible]);

  return (
    <group>
      {visible.map((label, k) => {
        const z = 0.6 + k * H * (1 + explode * 2.4);
        const nPts = building && k === visible.length - 1 && layerFrac < 1
          ? Math.max(1, Math.floor(PTS.length * layerFrac))
          : PTS.length;
        const isThird = k === 2;
        return (
          <group key={`${label}-${k}`} position={[0, 0, z]}>
            {PTS.slice(0, nPts).map(([x, y], i) => (
              <mesh key={i} position={[x + OFF[label][0], y + OFF[label][1], 0]}>
                <sphereGeometry args={[RS * 0.98, 24, 24]} />
                <meshStandardMaterial
                  color={LAYER_COL[label]} metalness={0.5} roughness={0.3}
                  transparent opacity={isThird && showThird && k === 2 ? 1 : 0.94}
                  emissive={isThird && showThird ? LAYER_COL[label] : '#000'}
                  emissiveIntensity={isThird && showThird ? 0.35 : 0}
                />
              </mesh>
            ))}
            <Text position={[COLS * 0.8, ROWS * 0.3, 0]} fontSize={0.42} color={LAYER_COL[label]}>{label}</Text>
          </group>
        );
      })}

      {/* ghost markers: where the THIRD layer could go (the decisive choice) */}
      {showThird && (
        <group position={[0, 0, 0.6 + 2 * H * (1 + explode * 2.4)]}>
          {/* ghost of an A atom (HCP choice): directly above an A-site */}
          <mesh position={[PTS[1][0], PTS[1][1], 0]}>
            <sphereGeometry args={[RS * 0.55, 16, 16]} />
            <meshBasicMaterial color="rgba(251,191,36,0.35)" transparent opacity={0.4} />
          </mesh>
          {/* ghost of a C atom (CCP choice): above the still-empty hollows */}
          <mesh position={[PTS[1][0] + OFF.C[0], PTS[1][1] + OFF.C[1], 0]}>
            <sphereGeometry args={[RS * 0.55, 16, 16]} />
            <meshBasicMaterial color="rgba(192,132,252,0.35)" transparent opacity={0.4} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function SpinGroup({ children, spin }: { children: React.ReactNode; spin: boolean }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ref.current && spin) ref.current.rotation.y += delta * 0.16;
  });
  return <group ref={ref}>{children}</group>;
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

const METALS_HCP = [
  { name: 'Mg', ca: 1.624 }, { name: 'Co', ca: 1.634 }, { name: 'Zn', ca: 1.856 },
];

/** deterministic build clock — increments the shared ref each frame */
function BuildClock({ building, buildT, done }: { building: boolean; buildT: React.MutableRefObject<number>; done: () => boolean }) {
  useFrame((_, delta) => {
    if (building && !done()) buildT.current += delta;
  });
  return null;
}

export default function C12_ChemistryMetallicCrystalsSim() {
  const [kind, setKind] = useState<'ccp' | 'hcp'>('ccp');
  const [explode, setExplode] = useState(0.35);
  const [building, setBuilding] = useState(true);
  const [showThird, setShowThird] = useState(true);
  const [spin, setSpin] = useState(true);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const buildT = useRef(0);
  const [, tick] = useState(0);

  // gentle re-render cadence so the deterministic build animation reveals layers
  useEffect(() => {
    if (!building) return;
    const id = setInterval(() => {
      if (buildT.current < 2.7) tick((x) => x + 1);
    }, 90);
    return () => clearInterval(id);
  }, [building]);

  const packing = Math.PI / (3 * Math.SQRT2) * 100; // evaluated from 4·(4/3)πr³/a³ with 4r=√2a

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'The stacking sequence of CCP/FCC layers is', opts: ['ABC ABC…', 'AB AB…', 'AABB AA…'], correct: 0 },
    { q: 'Packing efficiency of CCP vs ideal HCP is', opts: ['equal — 74.05% both', 'CCP higher', 'HCP higher'], correct: 0 },
    { q: 'Ideal HCP has c/a equal to', opts: ['2√(2/3) ≈ 1.633', '√2 ≈ 1.414', '1.5'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); setBuilding(true); buildT.current = 0; }, [kind]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setKind('ccp'); setExplode(0.35); setBuilding(true); setShowThird(true); setSpin(true); buildT.current = 0; setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [7.5, 5.5, 9.5], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.45} />
          <directionalLight position={[10, 14, 8]} intensity={1.05} color="#ffe9b8" />
          <directionalLight position={[-12, 6, -10]} intensity={0.5} color="#7dd3fc" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={60} fadeStrength={1.4} infiniteGrid position={[0, -0.6, 0]} />
          <BuildClock building={building} buildT={buildT} done={() => buildT.current >= 2.7} />
          <SpinGroup spin={spin}>
            <StackBuilder kind={kind} explode={explode} building={building} buildT={buildT} showThird={showThird} />
          </SpinGroup>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 1.3 + explode, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[258px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">
            {kind === 'ccp' ? 'CCP (FCC) — ABC ABC…' : 'HCP — AB AB…'} · live metrics
          </div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">stacking</span><span className="text-white">{kind === 'ccp' ? 'A→B→C (no site repeat)' : 'A→B→A (site repeat)'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">packing η = π/3√2</span><span className="text-gold-300">{packing.toFixed(2)}% both</span></div>
            <div className="flex justify-between"><span className="text-surface-500">coordination number</span><span className="text-gold-300">12 both</span></div>
            <div className="flex justify-between"><span className="text-surface-500">layer height h</span><span className="text-white">2r√(2/3) = {H.toFixed(3)}d</span></div>
            <div className="flex justify-between"><span className="text-surface-500">c/a ideal (HCP)</span><span className="text-white">2√(2/3) = {(2 * Math.sqrt(2 / 3)).toFixed(3)}</span></div>
            <div className="mt-1.5 border-t border-white/10 pt-1.5 text-[10px] uppercase tracking-wider text-surface-500">real HCP metals (c/a measured)</div>
            {METALS_HCP.map((m) => (
              <div key={m.name} className="flex justify-between">
                <span className="text-surface-500">{m.name}</span>
                <span className="text-white">{m.ca.toFixed(3)} {m.ca > 1.6334 ? '(stretched)' : '(ideal-ish)'}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Only layer 3 decides: C over the empty hollows (CCP) or A back over its own sites (HCP)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Atom className="h-3.5 w-3.5 text-gold-400" /> structure:</span>
        <button onClick={() => setKind('ccp')} className={btn(kind === 'ccp')}>CCP / FCC (Cu, Al)</button>
        <button onClick={() => setKind('hcp')} className={btn(kind === 'hcp')}>HCP (Mg, Zn)</button>
        <span className="ml-2 text-xs text-surface-400">explode:</span>
        <input type="range" min={0} max={1} step={0.02} value={explode} onChange={(e) => setExplode(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <button onClick={() => { setBuilding(true); buildT.current = 0; }} className={btn(building)}>rebuild</button>
        <button onClick={() => setShowThird(!showThird)} className={btn(showThird)}>layer-3 ghosts</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · LAYER 3 IS THE WHOLE STORY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Layers A and B are identical in both structures. The fork: layer 3 either
            repeats A directly above itself (ABAB…, HCP) or covers the only remaining
            hollows (ABCABC…, CCP). Toggle the structures with the ghosts on and watch
            the gold vs violet ghost positions — that one choice is the difference
            between magnesium and copper.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · SAME 74%, DIFFERENT SYMMETRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Both pack at η = π/(3√2) = 74.05% with CN 12 — the two densest ways to
            stack equal spheres, full stop. So packing efficiency can NEVER tell you
            which structure a metal has; you need X-ray diffraction. The exam trap
            &quot;FCC packs better than HCP&quot; dies right here.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · c/a = 1.633 IS PYTHAGORAS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Three touching spheres make an equilateral triangle of side 2r; the
            nesting sphere sits h = 2r√(2/3) above, giving c = 2h and c/a = 1.633.
            Zinc measures 1.856 — real electron clouds are squeezable, so ideal HCP
            is a model, not a law. The HUD lists the measured deviations.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;HCP and FCC are different names for the same lattice.&quot; No — they
            share local coordination (every atom has 12 neighbours either way) but the
            long-range <span className="text-white">symmetry differs completely</span>:
            FCC has 4 close-packed directions and is cubic; HCP has one special
            six-fold axis. That is why FCC metals (Cu, Al, Au) are ductile while
            strongly-HCP metals (Zn, Mg) cleave along basal planes. Same balls,
            different crystal.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Rebuild each structure with the ghosts visible: in HCP the gold ghost
            (A-site) sits exactly under a layer-1 atom; in CCP the violet ghost (C
            hollow) does not align with ANY atom below. One glance = the whole concept.
            ② Set explode to 0 and orbit top-down: both structures look identical —
            proof that packing efficiency and layer count cannot distinguish them,
            only the 3D sequence can.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick metallic-packing questions — no marks, no shame.</p>
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
                {quizIdx < QUIZ.length - 1 ? 'Next question →' : 'Finish →'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
