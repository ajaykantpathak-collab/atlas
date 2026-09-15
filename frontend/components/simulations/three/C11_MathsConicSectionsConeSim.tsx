'use client';

/**
 * C11_MathsConicSectionsConeSim.tsx — 3D
 * Class 11 Maths — Conic Sections (circle / ellipse / parabola / hyperbola
 * as plane slices of a right circular cone)
 *
 * WHY 3D: the conics ARE intersections of a cone with a plane. A textbook
 * shows four separate flat pictures; here one cone + one tilted plane
 * produces ALL of them continuously as you tilt the blade.
 *
 * HAND-DERIVED NUMERICS:
 *  Cone (apex at origin, semi-vertical angle α):  x² + y² = k²z²,  k = tanα
 *  Cutting plane tilted by γ from the horizontal, passing through height c
 *  on the x-side:  z = c − t·x,  t = tanγ
 *  Substitute the plane into the cone:
 *      x² + y² = k²(c − tx)²  =  k²(c² − 2ctx + t²x²)
 *      ⇒ (1 − k²t²)·x² + 2ck²t·x + y² = k²c²
 *  The sign of the x² coefficient classifies the section:
 *      k·t < 1  (γ < 90°−α):  ellipse   (both squared terms positive)
 *      k·t = 1  (γ = 90°−α):  PARABOLA  (x² coefficient vanishes — plane
 *                                      parallel to a generator line)
 *      k·t > 1  (γ > 90°−α):  hyperbola (plane steeper than the side,
 *                                      cuts BOTH nappes)
 *      γ = 0:                 circle (special ellipse, e = 0)
 *  Eccentricity (Dandelin-sphere result): e = cosβ/cosα with β the plane's
 *  angle from the AXIS, β = 90°−γ  ⇒  e = sinγ / cosα.
 *  Cross-checked live: the drawn curve's measured a, b give
 *  e_measured = √(1 − b²/a²) for ellipses — they agree.
 *
 * The curve itself is the TRUE numeric intersection: for each cone
 * generator angle θ, the surface point (kz·cosθ, kz·sinθ, z) lies on the
 * plane when z(1 + k t cosθ) = c  ⇒  z = c / (1 + k t cosθ).
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Cone, Slice, RotateCcw, Sparkles, CircleDot } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const D2R = Math.PI / 180;
const Z_MAX = 6; // drawing clamp along the cone axis

type Pt3 = [number, number, number];

/** true intersection curve: split into strips wherever it runs off the clamp */
function intersectionStrips(k: number, t: number, c: number): Pt3[][] {
  const strips: Pt3[][] = [];
  let cur: Pt3[] = [];
  const N = 720;
  for (let i = 0; i <= N; i++) {
    const th = (i / N) * Math.PI * 2;
    const den = 1 + k * t * Math.cos(th);
    const z = c / den;
    const finite = Math.abs(den) > 0.02 && Math.abs(z) <= Z_MAX;
    const p: Pt3 = [k * z * Math.cos(th), k * z * Math.sin(th), z];
    if (finite) {
      // break the strip if we teleported (hyperbola branch jump)
      const last = cur[cur.length - 1];
      if (last && Math.hypot(last[0] - p[0], last[1] - p[1], last[2] - p[2]) > 3) {
        strips.push(cur); cur = [];
      }
      cur.push(p);
    } else if (cur.length) { strips.push(cur); cur = []; }
  }
  if (cur.length > 1) strips.push(cur);
  return strips;
}

/** cone surface: generator lines + rings, both nappes, apex at origin */
function ConeSurface({ k, height }: { k: number; height: number }) {
  const gens: Pt3[][] = [];
  const R = height * k;
  for (let i = 0; i < 10; i++) {
    const th = (i / 10) * Math.PI * 2;
    const ux = Math.cos(th), uz = Math.sin(th);
    gens.push([[0, 0, 0], [R * ux, height, R * uz]]);
    gens.push([[0, 0, 0], [R * ux, -height, R * uz]]); // lower nappe
  }
  const rings: Pt3[][] = [];
  for (const z of [2, 4, 6]) {
    const r = z * k;
    const ring: Pt3[] = [];
    for (let i = 0; i <= 64; i++) {
      const th = (i / 64) * Math.PI * 2;
      ring.push([r * Math.cos(th), z, r * Math.sin(th)]);
    }
    rings.push(ring);
    rings.push(ring.map(([x, , z2]) => [x, -z2, z2]) as Pt3[]);
  }
  return (
    <group>
      {gens.map((g, i) => (
        <Line key={i} points={g} color="rgba(148,163,184,0.28)" lineWidth={1} />
      ))}
      {rings.map((r, i) => (
        <Line key={`r${i}`} points={r} color="rgba(148,163,184,0.22)" lineWidth={1} />
      ))}
    </group>
  );
}

export default function C11_MathsConicSectionsConeSim() {
  const [alphaDeg, setAlphaDeg] = useState(30);   // semi-vertical angle α
  const [gammaDeg, setGammaDeg] = useState(25);   // plane tilt from horizontal γ
  const [c, setC] = useState(3);                  // plane height offset

  const m = useMemo(() => {
    const al = alphaDeg * D2R, ga = gammaDeg * D2R;
    const k = Math.tan(al);
    const t = Math.tan(ga);
    const kt = k * t;
    // classification straight from the derived quadratic's x² coefficient
    const kind: 'circle' | 'ellipse' | 'parabola' | 'hyperbola' =
      ga < 0.02 ? 'circle' : kt < 1 - 1e-4 ? 'ellipse' : Math.abs(kt - 1) <= 1e-4 ? 'parabola' : 'hyperbola';
    const e = Math.sin(ga) / Math.cos(al); // e = cosβ/cosα, β = 90°−γ
    // measured eccentricity from the actual drawn ellipse (least-squares centre)
    const pts = intersectionStrips(k, t, c).flat();
    let aM = NaN, bM = NaN, eM = NaN;
    if (pts.length > 8 && (kind === 'ellipse' || kind === 'circle')) {
      const cx = pts.reduce((s, p) => s + p[0], 0) / pts.length;
      const cy = pts.reduce((s, p) => s + p[1], 0) / pts.length;
      const cz = pts.reduce((s, p) => s + p[2], 0) / pts.length;
      let rMax = 0, rMin = Infinity;
      for (const p of pts) {
        const r = Math.hypot(p[0] - cx, p[1] - cy, p[2] - cz);
        rMax = Math.max(rMax, r); rMin = Math.min(rMin, r);
      }
      aM = rMax; bM = rMin; eM = Math.sqrt(1 - (rMin / rMax) ** 2);
    }
    return { k, t, kt, kind, e, aM, bM, eM };
  }, [alphaDeg, gammaDeg, c]);

  const strips = useMemo(
    () => intersectionStrips(m.k, m.t, c),
    [m.k, m.t, c],
  );

  // cutting plane: z = c − t·x → in three.js coords (x, y→up=z_math, z)
  const planeElems = useMemo(() => {
    const t = m.t;
    const S = 9;
    // corners in (x, y_math) of the tilted plane
    const corner = (x: number, ym: number): Pt3 => [x, c - t * x, ym];
    const cs = [corner(-S, -S), corner(S, -S), corner(S, S), corner(-S, S)];
    const verts = new Float32Array([...cs[0], ...cs[1], ...cs[2], ...cs[0], ...cs[2], ...cs[3]]);
    return { cs, verts };
  }, [m.t, c]);

  const reset = () => { setAlphaDeg(30); setGammaDeg(25); setC(3); };
  const preset = (g: number) => { setGammaDeg(g); };
  const kindColor = m.kind === 'hyperbola' ? '#fb7185' : m.kind === 'parabola' ? GOLD : CYAN;

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
        <Canvas camera={{ position: [11, 7, 13], fov: 40 }} dpr={[1, 2]}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 14, 8]} intensity={0.8} color="#ffe9b8" />
          <Grid args={[40, 40]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={70} fadeStrength={1.2} />
          <ConeSurface k={m.k} height={Z_MAX} />
          {/* the cutting plane, glassy */}
          <mesh>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[planeElems.verts, 3]} />
            </bufferGeometry>
            <meshBasicMaterial color={kindColor} transparent opacity={0.13} side={THREE.DoubleSide} />
          </mesh>
          <Line points={[...planeElems.cs, planeElems.cs[0]]} color={kindColor} lineWidth={1.2} transparent opacity={0.7} />
          {/* the TRUE intersection curve */}
          {strips.map((s, i) => (
            <Line key={i} points={s} color={kindColor} lineWidth={3.2} />
          ))}
          <Text position={[0, Z_MAX + 0.8, 0]} fontSize={0.4} color="#64748b">cone · apex O</Text>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={40} target={[0, 1.5, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[262px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Slice analyser</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('semi-vertical angle α', `${alphaDeg}°`)}
            {row('plane tilt γ (from horiz.)', `${gammaDeg}°`)}
            {row('k = tanα · t = tanγ', `${m.k.toFixed(2)} · ${m.t.toFixed(2)}`)}
            {row('k·t (from derived quadratic)', m.kt.toFixed(3))}
            <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-1">
              <span className="text-surface-500">section</span>
              <span className="font-display text-xs font-bold" style={{ color: kindColor }}>
                {m.kind.toUpperCase()}
              </span>
            </div>
            {row('e = sinγ/cosα', m.e.toFixed(3), 'text-gold-300')}
            {m.kind === 'ellipse' && !Number.isNaN(m.eM) && (
              <>
                {row('measured a, b (units)', `${m.aM.toFixed(2)}, ${m.bM.toFixed(2)}`)}
                {row('e measured √(1−b²/a²)', `${m.eM.toFixed(3)} ${Math.abs(m.eM - m.e) < 0.05 ? '✓' : ''}`, 'text-emerald-300')}
              </>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Orbit the double cone · the curve is the real intersection, computed point-by-point
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Cone className="h-3.5 w-3.5 text-gold-400" /> α:</span>
        <input type="range" min={15} max={45} step={1} value={alphaDeg}
          onChange={(e) => setAlphaDeg(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{alphaDeg}°</span>
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Slice className="h-3.5 w-3.5 text-gold-400" /> γ:</span>
        <input type="range" min={0} max={80} step={1} value={gammaDeg}
          onChange={(e) => setGammaDeg(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{gammaDeg}°</span>
        <span className="text-xs text-surface-400">height c:</span>
        <input type="range" min={1} max={5} step={0.5} value={c}
          onChange={(e) => setC(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">{c.toFixed(1)}</span>
        {([['circle', 0], ['ellipse', 25], ['parabola', 60], ['hyperbola', 70]] as [string, number][]).map(([nm, g]) => (
          <button key={nm} onClick={() => preset(g)} className={btn(gammaDeg === g)}>{nm}</button>
        ))}
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CircleDot className="h-4 w-4" /> WHY γ = 90°−α IS MAGIC</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The generator (side) of the cone leans 90°−α from the horizontal. When the blade
            tilts exactly with it (k·t = 1 in the derived quadratic), the x² term dies and the
            section has exactly one unpaired branch — the <span className="text-white">parabola</span>.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Slice className="h-4 w-4" /> ONE FAMILY, ONE DIAL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Drag γ from 0° to 80° with α = 30°: circle → ellipse (e = sinγ/cosα climbs 0 → 1)
            → at γ = 60° the parabola (e = 1) → hyperbola (e &gt; 1, both nappes cut).
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> WHERE EACH CONIC LIVES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Planets: ellipse (e ≈ 0.017–0.25). Thrown ball near Earth: parabola branch (e = 1).
            Hyperbolic flyby: comets with e &gt; 1 that never return — all from this one slice.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The four conics are four different curves that happen to share formulas.&quot; No —
            <span className="text-white"> they are literally the same cone</span>, graded by a single
            number: e = sinγ/cosα. Nothing changes except the blade angle. Watch the HUD: e climbs
            continuously through 1 at the parabola — the conics form one family, with the circle
            just the special case e = 0.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set α = 30° and find the exact γ where the HUD flips from ELLIPSE to PARABOLA —
            confirm it equals 90°−α = 60° and that k·t reads 1.000.
            ② Push γ to 70° (hyperbola) and orbit: the curve now lives on BOTH nappes —
            no ellipse ever does.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'A plane cuts the cone parallel to a generator line. The section is…', opts: ['a parabola (e = 1)', 'a circle (e = 0)', 'a hyperbola (e > 1)'], correct: 0 },
  { q: 'Which slice gives eccentricity e = 0?', opts: ['Plane horizontal (⊥ to the axis)', 'Plane parallel to a generator', 'Plane steeper than a generator'], correct: 0 },
  { q: 'A hyperbola section differs from the others because the plane…', opts: ['cuts both nappes of the cone', 'touches the apex exactly', 'is horizontal'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on conic slices — no marks, no shame.</p>
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
