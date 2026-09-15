'use client';

/**
 * C12_BiologyDNAHelixSim.tsx — 3D
 * Class 12 Biology — Molecular Basis of Inheritance: the DNA double helix
 *
 * WHY 3D: "antiparallel strands", "major and minor groove", "10 bp per
 * turn" — all spatial claims. Textbook ladder drawings destroy the
 * helix; here the real B-DNA proportions are built to scale and can be
 * orbited, unwound and flipped to left-handed Z.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Helix parametrisation (Watson–Crick B-DNA, real dimensions):
 *      P(n) = ( R·cos(2π·n/T),  0.34·n,  R·sin(2π·n/T) )   nm
 *      R = 1 nm, rise = 0.34 nm per bp, T = base pairs per turn
 *  Pitch (rise per full turn):
 *      pitch = rise × T = 0.34 × 10 = 3.4 nm for B-DNA ✓ (NCERT value)
 *  Total contour length = 0.34 × N bp; total turns = N/T.
 *  Antiparallel: strand 2 runs 3′→5′, drawn offset by ~0.4 turn —
 *  that offset is WHY the grooves are unequal (major ≈ 2.2 nm wide,
 *  minor ≈ 1.2 nm).
 *  Base pairing rule: A=T with 2 H-bonds, G≡C with 3. GC% of the shown
 *  segment feeds the Marmur–Doty melting rule:
 *      Tm ≈ 69.3 + 0.41 × (%GC)   °C
 *  GC-rich DNA needs more heat to strand-separate — read it live.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Dna, Thermometer, RotateCcw, Sparkles, ArrowDownUp } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const GREEN = '#34d399';
const ROSE = '#fb7185';

const SCALE = 2;            // 1 nm → 2 scene units
const R_NM = 1;             // B-DNA helix radius (nm)
const RISE_NM = 0.34;       // rise per base pair (nm)
const OFFSET = 0.4;         // strand-2 angular offset (fraction of a turn)

const SEQ_MIXED = 'ATGCCGTAAGCTTACGGATCCGA';   // deterministic, 23 bp
const SEQ_AT = 'ATAATATTAATAATATAATATAA';     // AT-rich
const SEQ_GC = 'GCGCCGGCGCGCGCGCCGGCGCGC';    // GC-rich

type V3 = [number, number, number];

export default function C12_BiologyDNAHelixSim() {
  const [nBp, setNBp] = useState(16);
  const [bpPerTurn, setBpPerTurn] = useState(10);
  const [leftHanded, setLeftHanded] = useState(false);
  const [seqKind, setSeqKind] = useState<'mixed' | 'at' | 'gc'>('mixed');

  const seq = seqKind === 'mixed' ? SEQ_MIXED : seqKind === 'at' ? SEQ_AT : SEQ_GC;
  const shown = seq.slice(0, nBp);

  // ── live numerics ──
  const m = useMemo(() => {
    const pitch = RISE_NM * bpPerTurn;
    const lengthNm = RISE_NM * nBp;
    const turns = nBp / bpPerTurn;
    const gc = (shown.match(/[GC]/g) || []).length;
    const at = nBp - gc;
    const gcPct = (gc / Math.max(nBp, 1)) * 100;
    const tm = 69.3 + 0.41 * gcPct;
    return { pitch, lengthNm, turns, gc, at, gcPct, tm };
  }, [bpPerTurn, nBp, shown]);

  const dir = leftHanded ? -1 : 1;
  const angleAt = (n: number) => dir * (2 * Math.PI * n) / bpPerTurn;

  const bpData = useMemo(() => Array.from({ length: nBp }, (_, n) => {
    const th = angleAt(n);
    const th2 = th + dir * OFFSET * 2 * Math.PI;
    const z = n * RISE_NM * SCALE;
    const p1: V3 = [R_NM * SCALE * Math.cos(th), z, R_NM * SCALE * Math.sin(th)];
    const p2: V3 = [R_NM * SCALE * Math.cos(th2), z, R_NM * SCALE * Math.sin(th2)];
    const base = shown[n] || 'A';
    const pair = base === 'A' || base === 'T' ? 'A-T' : 'G-C';
    return { p1, p2, pair, base };
  }), [nBp, bpPerTurn, dir, shown]);

  const backbone = (phase: number): THREE.CatmullRomCurve3 => {
    const pts: THREE.Vector3[] = [];
    const steps = nBp * 8;
    for (let i = 0; i <= steps; i++) {
      const n = (i / steps) * (nBp - 1);
      const th = angleAt(n) + dir * phase * 2 * Math.PI;
      pts.push(new THREE.Vector3(
        R_NM * SCALE * Math.cos(th), n * RISE_NM * SCALE, R_NM * SCALE * Math.sin(th)));
    }
    return new THREE.CatmullRomCurve3(pts);
  };
  const curve1 = useMemo(() => backbone(0), [nBp, bpPerTurn, dir]);
  const curve2 = useMemo(() => backbone(OFFSET), [nBp, bpPerTurn, dir]);

  const reset = () => { setNBp(16); setBpPerTurn(10); setLeftHanded(false); setSeqKind('mixed'); };
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
        <Canvas camera={{ position: [7, 4, 12], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <directionalLight position={[-8, 6, -6]} intensity={0.35} color="#7dd3fc" />
          <Grid args={[24, 24]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.07)" sectionSize={3.4}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.16)"
            fadeDistance={45} fadeStrength={1.2} />
          {/* sugar-phosphate backbones */}
          <mesh>
            <tubeGeometry args={[curve1, 220, 0.13, 10, false]} />
            <meshStandardMaterial color={ROSE} metalness={0.3} roughness={0.4} />
          </mesh>
          <mesh>
            <tubeGeometry args={[curve2, 220, 0.13, 10, false]} />
            <meshStandardMaterial color={CYAN} metalness={0.3} roughness={0.4} />
          </mesh>
          {/* base-pair rungs: 2 bars for A-T, 3 for G≡C */}
          {bpData.map(({ p1, p2, pair, base }, n) => {
            const bars = pair === 'A-T' ? [-0.055, 0.055] : [-0.08, 0, 0.08];
            const col = pair === 'A-T' ? GOLD : GREEN;
            return (
              <group key={n}>
                {bars.map((dz, i) => (
                  <Line key={i}
                    points={[[p1[0], p1[1] + dz, p1[2]], [p2[0], p2[1] + dz, p2[2]]]}
                    color={col} lineWidth={2.4} />
                ))}
                <Text position={[p1[0] * 1.45, p1[1], p1[2] * 1.45]} fontSize={0.22}
                  color={pair === 'A-T' ? GOLD : GREEN}>{base}</Text>
              </group>
            );
          })}
          {/* antiparallel labels */}
          <Text position={[0, -0.9, R_NM * SCALE + 0.6]} fontSize={0.3} color={ROSE}>5′→3′</Text>
          <Text position={[R_NM * SCALE * Math.cos(dir * OFFSET * 2 * Math.PI), -0.9,
            R_NM * SCALE * Math.sin(dir * OFFSET * 2 * Math.PI) + 0.6]} fontSize={0.3} color={CYAN}>3′←5′</Text>
          {/* scale reference: 3.4 nm pitch marker */}
          <Line points={[[R_NM * SCALE + 1.2, 0, 0], [R_NM * SCALE + 1.2, RISE_NM * SCALE * 10, 0]]}
            color="rgba(255,255,255,0.5)" lineWidth={1.4} />
          <Text position={[R_NM * SCALE + 1.7, RISE_NM * SCALE * 5, 0]} fontSize={0.26} color="#94a3b8">
            1 turn = {m.pitch.toFixed(1)} nm
          </Text>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} target={[0, m.lengthNm * SCALE / 2, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[272px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">B-DNA geometry — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('helix radius R', '1.0 nm')}
            {row('rise per bp', '0.34 nm')}
            {row('bp per turn T', `${bpPerTurn}`)}
            {row('pitch = rise × T', `${m.pitch.toFixed(2)} nm`, 'text-gold-300')}
            {row(`length of ${nBp} bp`, `${m.lengthNm.toFixed(1)} nm`)}
            {row('total turns N/T', m.turns.toFixed(2))}
            <div className="mt-1 border-t border-white/10 pt-1">
              {row('A=T : G≡C in segment', `${m.at} : ${m.gc}`)}
              {row('%GC', `${m.gcPct.toFixed(0)}%`)}
              {row('Tm ≈ 69.3 + 0.41·%GC', `${m.tm.toFixed(1)} °C`, 'text-rose-300')}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Real 2 nm × 3.4 nm proportions · gold rungs = A=T (2 bonds), green = G≡C (3 bonds)
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Dna className="h-3.5 w-3.5 text-gold-400" /> bp:</span>
        <input type="range" min={8} max={23} step={1} value={nBp}
          onChange={(e) => setNBp(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{nBp}</span>
        <span className="text-xs text-surface-400">bp/turn:</span>
        <input type="range" min={8} max={12} step={0.5} value={bpPerTurn}
          onChange={(e) => setBpPerTurn(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{bpPerTurn}</span>
        <button onClick={() => setLeftHanded(!leftHanded)} className={btn(leftHanded)}>
          <ArrowDownUp className="mr-1 inline h-3 w-3" />{leftHanded ? 'Z (left)' : 'B (right)'}
        </button>
        {(['at', 'mixed', 'gc'] as const).map((s) => (
          <button key={s} onClick={() => setSeqKind(s)} className={btn(seqKind === s)}>
            {s === 'at' ? 'AT-rich' : s === 'gc' ? 'GC-rich' : 'mixed seq'}
          </button>
        ))}
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Dna className="h-4 w-4" /> ANTIPARALLEL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            One strand reads 5′→3′ going up; its partner runs 3′→5′. This is why replication
            needs a continuous leading strand and a stitched-back Okazaki lagging strand —
            polymerase only writes one direction.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> GROOVES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The strands are NOT opposite each other — offset ~0.4 of a turn. That single
            asymmetry splits the space into a wide major groove (≈2.2 nm) and a narrow
            minor groove (≈1.2 nm): where proteins grip and read the bases.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Thermometer className="h-4 w-4" /> GC = HEAT SHIELD</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            G≡C holds 3 hydrogen bonds vs A=T&apos;s 2, so GC-rich DNA melts hotter —
            Tm ≈ 69.3 + 0.41·%GC. Switch mixed → GC-rich and read Tm climb ~12 °C. PCR
            annealing temperatures are chosen from this rule.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;A pairs with T just because they fit; any base could pair with any
            other.&quot; No — <span className="text-white">pairing is chemically specific:</span>
            A=T forms exactly 2 H-bonds, G≡C exactly 3, and the purine–pyrimidine pairing is
            what keeps the diameter a constant 2 nm. Watch the rungs: A-T bars and G-C bars
            never mix — swap the sequence presets and the pairing rule never breaks.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Slide bp/turn from 10 to 8 and watch the pitch readout climb from 3.4 to
            2.72 nm — over-winding squeezes each turn. Then flip to Z (left-handed):
            same numbers, mirrored helix.
            ② Count turns: set bp = 23, bp/turn = 10 → the HUD says 2.30 turns; orbit
            top-to-bottom and count the twists yourself.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'One full turn of B-DNA spans…', opts: ['3.4 nm containing 10 bp', '0.34 nm containing 1 bp', '2 nm containing 4 bp'], correct: 0 },
  { q: 'A=T pairing is held by ___ hydrogen bonds, G≡C by ___', opts: ['2; 3', '3; 2', '1; 1'], correct: 0 },
  { q: 'The two DNA strands are…', opts: ['antiparallel — 5′→3′ opposite 3′→5′', 'parallel, both 5′→3′ up', 'unconnected'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on the double helix — no marks, no shame.</p>
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
