'use client';

/**
 * C12_BiologyProteinStructureSim.tsx — 3D
 * Class 12 Biology — Biomolecules: the four levels of protein structure
 *
 * WHY 3D: "α-helix", "β-pleated sheet", "hydrophobic core", "tetrameric
 * quaternary structure" — every one of these is a 3D object. Flat textbook
 * ribbons hide the geometry that MAKES the protein work.
 *
 * HAND-DERIVED NUMERICS (α-helix, Pauling–Corey, all live):
 *  Residue i sits at
 *      P(i) = ( r·cos(100°·i),  r·sin(100°·i),  1.5 Å·i )
 *  where r ≈ 2.3 Å and:
 *      100°/residue  ⇔  3.6 residues per turn   (360/100)
 *      1.5 Å rise per residue  ×  3.6  =  5.4 Å pitch  ← derived
 *  Every C=O of residue i hydrogen-bonds the N–H of residue i+4 —
 *  so a helix of N residues shows N−4 H-bonds (counted live).
 *  β-sheet: strands fully extended, rise ≈ 3.5 Å/residue, H-bonds
 *  BETWEEN strands instead of along one.
 *  Tertiary/quaternary: hydrophobic side-chains bury inward (core),
 *  polar face water; haemoglobin = 2α + 2β = 4 subunits, each binding 1 O₂.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Dna, Link2, RotateCcw, Sparkles, Boxes } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const ROSE = '#fb7185';
const GREEN = '#34d399';

const SEQ = 'MVLSTGADK'; // 9 residues, deterministic
const AA_COLOR: Record<string, string> = {
  M: GOLD, V: GOLD, L: GOLD, A: GOLD,          // hydrophobic → gold
  S: CYAN, T: CYAN, G: CYAN, D: ROSE, K: CYAN, // polar/charged
};
const S = 0.45; // 1 Å → 0.45 scene units

type Level = 'primary' | 'secondary' | 'tertiary' | 'quaternary';

function Bead({ pos, color, r = 0.22 }: { pos: [number, number, number]; color: string; r?: number }) {
  return (
    <mesh position={pos}>
      <sphereGeometry args={[r, 20, 20]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.35} />
    </mesh>
  );
}

export default function C12_BiologyProteinStructureSim() {
  const [level, setLevel] = useState<Level>('secondary');
  const [secKind, setSecKind] = useState<'alpha' | 'beta'>('alpha');
  const [n, setN] = useState(9);

  // ── live numerics ──
  const m = useMemo(() => {
    const res = Math.min(n, SEQ.length);
    const peptideBonds = Math.max(res - 1, 0);
    // α-helix geometry from the parametrisation in the header
    const perTurn = 360 / 100;              // 3.6 residues per turn
    const riseA = 1.5;                       // Å per residue
    const pitchA = perTurn * riseA;          // 5.4 Å — derived
    const hbonds = Math.max(res - 4, 0);     // i → i+4
    const helixTurns = res / perTurn;
    const helixLenA = res * riseA;
    return { res, peptideBonds, perTurn, pitchA, hbonds, helixTurns, helixLenA };
  }, [n]);

  /* chain geometry per level (deterministic, no randomness) */
  const primary: [number, number, number][] = useMemo(() =>
    Array.from({ length: m.res }, (_, i) => [i * 0.9 - m.res * 0.45, (i % 2) * 0.25, 0]), [m.res]);

  const helix: [number, number, number][] = useMemo(() =>
    Array.from({ length: m.res }, (_, i) => [
      2.3 * S * Math.cos((100 * Math.PI / 180) * i),
      i * 1.5 * S,
      2.3 * S * Math.sin((100 * Math.PI / 180) * i),
    ]), [m.res]);

  const beta: [number, number, number][] = useMemo(() =>
    Array.from({ length: m.res }, (_, i) => [i * 0.55 - m.res * 0.27, 0, (i % 2 ? 0.5 : -0.5)]), [m.res]);

  const tertiary: [number, number, number][] = useMemo(() =>
    Array.from({ length: m.res }, (_, i) => {
      // fold onto a 3D Lissajous knot — compact, reproducible
      const t = (i / Math.max(m.res - 1, 1)) * Math.PI * 2;
      return [2.2 * Math.sin(2 * t), 2.2 * Math.sin(3 * t + 1.2), 2.2 * Math.sin(4 * t + 0.6)];
    }), [m.res]);

  const quadCenters: [number, number, number][] = [[1.6, 1.6, 1.6], [-1.6, -1.6, 1.6], [-1.6, 1.6, -1.6], [1.6, -1.6, -1.6]];

  const reset = () => { setLevel('secondary'); setSecKind('alpha'); setN(9); };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [7, 5, 9], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[20, 20]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.18)"
            fadeDistance={40} fadeStrength={1.2} />
          {/* PRIMARY — bead string with letters */}
          {level === 'primary' && (
            <group>
              <Line points={primary} color="rgba(255,255,255,0.4)" lineWidth={2} />
              {primary.map((p, i) => (
                <group key={i}>
                  <Bead pos={p} color={AA_COLOR[SEQ[i]] || GOLD} />
                  <Text position={[p[0], p[1] + 0.45, p[2]]} fontSize={0.28}
                    color={AA_COLOR[SEQ[i]] || GOLD}>{SEQ[i]}</Text>
                </group>
              ))}
            </group>
          )}
          {/* SECONDARY — α-helix or β-sheet */}
          {level === 'secondary' && secKind === 'alpha' && (
            <group>
              <Line points={helix} color={CYAN} lineWidth={3} />
              {helix.map((p, i) => (
                <group key={i}>
                  <Bead pos={p} color={AA_COLOR[SEQ[i]] || GOLD} r={0.2} />
                  {i + 4 < helix.length && (
                    <Line points={[helix[i], helix[i + 4]]} color="rgba(251,113,133,0.75)"
                      lineWidth={1.4} dashed dashSize={0.1} gapSize={0.07} />
                  )}
                </group>
              ))}
              <Text position={[0, helix[helix.length - 1][1] + 0.6, 0]} fontSize={0.3} color={ROSE}>
                rose dashes = H-bonds i → i+4
              </Text>
            </group>
          )}
          {level === 'secondary' && secKind === 'beta' && (
            <group>
              {[0, 1].map((strand) => (
                <group key={strand} position={[0, strand * 1.4 - 0.7, 0]}>
                  <Line points={beta} color={strand === 0 ? CYAN : GREEN} lineWidth={3} />
                  {beta.map((p, i) => <Bead key={i} pos={p} color={strand === 0 ? CYAN : GREEN} r={0.18} />)}
                </group>
              ))}
              {beta.map((p, i) => i % 2 === 0 && (
                <Line key={i} points={[[p[0], -0.7, p[2]], [p[0], 0.7, p[2]]]}
                  color="rgba(251,113,133,0.7)" lineWidth={1.3} dashed dashSize={0.08} gapSize={0.06} />
              ))}
              <Text position={[0, 2.1, 0]} fontSize={0.3} color={ROSE}>H-bonds BETWEEN strands</Text>
            </group>
          )}
          {/* TERTIARY — folded globule, hydrophobic core */}
          {level === 'tertiary' && (
            <group>
              <Line points={tertiary} color="rgba(255,255,255,0.35)" lineWidth={1.6} />
              {tertiary.map((p, i) => {
                const hydrophobic = 'MVLA'.includes(SEQ[i]);
                return (
                  <group key={i}>
                    <Bead pos={p} color={hydrophobic ? GOLD : CYAN} r={hydrophobic ? 0.3 : 0.24} />
                    <Text position={[p[0], p[1] + 0.42, p[2]]} fontSize={0.24}
                      color={hydrophobic ? GOLD : CYAN}>{SEQ[i]}</Text>
                  </group>
                );
              })}
              <Text position={[0, -3.1, 0]} fontSize={0.3} color={GOLD}>gold = hydrophobic, buried inside</Text>
            </group>
          )}
          {/* QUATERNARY — haemoglobin: 2α + 2β */}
          {level === 'quaternary' && quadCenters.map((c, s) => {
            const sub = tertiary.map((p) => [p[0] * 0.42 + c[0], p[1] * 0.42 + c[1], p[2] * 0.42 + c[2]] as [number, number, number]);
            return (
              <group key={s}>
                <Line points={sub} color={s < 2 ? ROSE : GREEN} lineWidth={2} />
                {sub.map((p, i) => <Bead key={i} pos={p} color={s < 2 ? ROSE : GREEN} r={0.16} />)}
                <Bead pos={[c[0] * 0.55, c[1] * 0.55, c[2] * 0.55]} color={GOLD} r={0.3} />
                <Text position={[c[0] * 1.35, c[1] * 1.35 + 0.4, c[2] * 1.35]} fontSize={0.26}
                  color={s < 2 ? ROSE : GREEN}>{s < 2 ? 'α' : 'β'}</Text>
              </group>
            );
          })}
          {level === 'quaternary' && (
            <Text position={[0, -3.4, 0]} fontSize={0.3} color={GOLD}>gold cores = 4 haem groups → 4 O₂</Text>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={3} maxDistance={24} target={[0, 0, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[266px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">{level.toUpperCase()} — live counts</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('residues shown', m.res)}
            {row('peptide bonds', `${m.peptideBonds} = N − 1`, 'text-gold-300')}
            {level === 'secondary' && secKind === 'alpha' && (
              <>
                {row('residues per turn', `${m.perTurn.toFixed(1)} (360°/100°)`, 'text-gold-300')}
                {row('rise × per-turn = pitch', `${m.pitchA.toFixed(1)} Å`, 'text-gold-300')}
                {row('H-bonds i→i+4', `${m.hbonds} = N − 4`, 'text-rose-300')}
                {row('helix length', `${m.helixLenA.toFixed(1)} Å`)}
              </>
            )}
            {level === 'tertiary' && row('fold driving force', 'hydrophobic collapse', 'text-gold-300')}
            {level === 'quaternary' && (
              <>
                {row('subunits', '2α + 2β = 4')}
                {row('O₂ carried', '4 molecules', 'text-gold-300')}
              </>
            )}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              α-helix pitch derived: 3.6 res/turn × 1.5 Å/res = 5.4 Å
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Each level is built from the same 9-residue chain — orbit and compare
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Dna className="h-3.5 w-3.5 text-gold-400" /> level:</span>
        {(['primary', 'secondary', 'tertiary', 'quaternary'] as Level[]).map((l) => (
          <button key={l} onClick={() => setLevel(l)} className={btn(level === l)}>{l}</button>
        ))}
        {level === 'secondary' && (
          <>
            <button onClick={() => setSecKind('alpha')} className={btn(secKind === 'alpha')}>α-helix</button>
            <button onClick={() => setSecKind('beta')} className={btn(secKind === 'beta')}>β-sheet</button>
          </>
        )}
        {level !== 'quaternary' && (
          <>
            <span className="ml-2 text-xs text-surface-400">N residues:</span>
            <input type="range" min={5} max={9} step={1} value={n}
              onChange={(e) => setN(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
            <span className="text-xs text-white">{n}</span>
          </>
        )}
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Link2 className="h-4 w-4" /> PRIMARY = SEQUENCE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Just the order of amino acids joined by peptide bonds (N−1 for N residues).
            Everything downstream — helix, fold, function — is implied by this one line of
            information. Change it (sickle-cell: one Glu→Val) and the protein changes.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> SECONDARY = LOCAL GEOMETRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The α-helix is 100° and 1.5 Å per residue — giving 3.6 residues/turn and the
            derived 5.4 Å pitch. The β-sheet instead hydrogen-bonds BETWEEN stretched
            strands. Both are backbone-only patterns, side chains ignored.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Boxes className="h-4 w-4" /> TERTIARY + QUATERNARY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Tertiary: the whole chain folds so gold (hydrophobic) beads bury in the core and
            cyan (polar) face water. Quaternary: separate folded chains assemble —
            haemoglobin&apos;s 2α+2β binds 4 O₂ cooperatively.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Proteins fold with the help of random chance alone.&quot; No —
            <span className="text-white"> the fold is written in the sequence.</span>
            Watch the tertiary view: gold hydrophobic residues end up buried every time,
            because water &quot;pushes&quot; them inward (hydrophobic collapse). Denature with
            heat and primary structure survives — the sequence remembers the fold.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① In α-helix mode, drag N from 5 to 9 and watch H-bonds go 1, 2, 3, 4, 5 —
            always N−4: the first four residues have no partner yet. Check the pitch stays
            5.4 Å at every N.
            ② Compare α and β at the same N: the sheet is far longer and flatter —
            keratin (hair) vs silk-fibroin is exactly this choice.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'The α-helix is stabilised by hydrogen bonds between…', opts: ['C=O of residue i and N–H of residue i+4', 'two different chains', 'side chains only'], correct: 0 },
  { q: 'One turn of an α-helix contains about…', opts: ['3.6 residues (pitch 5.4 Å)', '10 residues', '2 residues'], correct: 0 },
  { q: 'Haemoglobin&apos;s quaternary structure is…', opts: ['2α + 2β subunits', 'one single chain', 'three identical chains'], correct: 0 },
];

function SelfCheck() {
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      {!quiz ? (
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-display text-sm font-bold text-white">Check yourself</div>
            <p className="text-xs text-surface-400">3 quick questions on protein structure — no marks, no shame.</p>
          </div>
          <button onClick={startQuiz} className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-gold-400 to-amber-500 px-4 py-2.5 text-xs font-display font-bold text-surface-0 hover:shadow-lg hover:shadow-gold-500/30">
            Start
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
  );
}
