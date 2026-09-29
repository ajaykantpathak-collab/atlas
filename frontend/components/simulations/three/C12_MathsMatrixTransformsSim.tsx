'use client';

/**
 * C12_MathsMatrixTransformsSim.tsx — 3D
 * Class 12 Maths — Matrices: linear transformations & the determinant
 *
 * WHY 3D: a matrix is not a grid of numbers — it is a MOVE. Watching the
 * unit cube shear, spin, flip or collapse to a pancake turns det(M) from
 * a memorised recipe into something you can see: the volume scale factor.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Composed matrix  M = H·Rz(θ)·S  where
 *      S = diag(sx, sy, sz)                    (scale)
 *      Rz = [[c,−s,0],[s,c,0],[0,0,1]], c=cosθ (rotation about z)
 *      H  = [[1,k,0],[0,1,0],[0,0,1]]          (xy shear)
 *  A linear map sends edges to edges: the unit cube becomes the
 *  parallelepiped spanned by the IMAGES of the basis vectors
 *      u = M·î, v = M·ĵ, w = M·k̂
 *  Its volume is the scalar triple product  |u·(v×w)| — and expanding
 *  that product symbolically reproduces the cofactor rule:
 *      det M = a(ei − fh) − b(di − fg) + c(dh − eg)
 *  So |det M| = volume of the transformed unit cube — derived, not
 *  asserted. det < 0 means the map flips orientation (mirror).
 *
 * The HUD computes det BOTH ways (cofactor expansion AND triple product
 * of the drawn edges) and they agree to machine precision, live.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Percent, RotateCcw, Sparkles, MoveHorizontal } from 'lucide-react';

const GOLD = '#fbbf24';
const GREY = 'rgba(255,255,255,0.35)';
const ROSE = '#fb7185';

type Mat3 = number[][]; // row-major 3x3

const I3: Mat3 = [[1, 0, 0], [0, 1, 0], [0, 0, 1]];
const mul = (A: Mat3, B: Mat3): Mat3 =>
  A.map((row, i) => row.map((_, j) => row[0] * B[0][j] + row[1] * B[1][j] + row[2] * B[2][j]));
const apply = (M: Mat3, p: [number, number, number]): [number, number, number] => [
  M[0][0] * p[0] + M[0][1] * p[1] + M[0][2] * p[2],
  M[1][0] * p[0] + M[1][1] * p[1] + M[1][2] * p[2],
  M[2][0] * p[0] + M[2][1] * p[1] + M[2][2] * p[2],
];

const CUBE_CORNERS: [number, number, number][] = [];
for (const x of [0, 1]) for (const y of [0, 1]) for (const z of [0, 1]) CUBE_CORNERS.push([x, y, z]);
// 12 cube edges as index pairs (unit cube ordering above)
const CUBE_EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 4], [1, 3], [1, 5], [2, 3], [2, 6], [3, 7], [4, 5], [4, 6], [5, 7], [6, 7],
];

export default function C12_MathsMatrixTransformsSim() {
  const [theta, setTheta] = useState(0);   // degrees about z
  const [sx, setSx] = useState(1);
  const [sy, setSy] = useState(1);
  const [sz, setSz] = useState(1);
  const [k, setK] = useState(0);           // xy shear

  const m = useMemo(() => {
    const r = (theta * Math.PI) / 180;
    const c = Math.cos(r), s = Math.sin(r);
    const S: Mat3 = [[sx, 0, 0], [0, sy, 0], [0, 0, sz]];
    const R: Mat3 = [[c, -s, 0], [s, c, 0], [0, 0, 1]];
    const H: Mat3 = [[1, k, 0], [0, 1, 0], [0, 0, 1]];
    const M = mul(H, mul(R, S));
    // cofactor expansion (a= m00, b= m01, … i= m22)
    const [a, b2, c2] = M[0];
    const [d, e, f] = M[1];
    const [g, h2, i2] = M[2];
    const det = a * (e * i2 - f * h2) - b2 * (d * i2 - f * g) + c2 * (d * h2 - e * g);
    // basis images
    const u = apply(M, [1, 0, 0]);
    const v = apply(M, [0, 1, 0]);
    const w = apply(M, [0, 0, 1]);
    // triple product u·(v×w)
    const cr: [number, number, number] = [
      v[1] * w[2] - v[2] * w[1],
      v[2] * w[0] - v[0] * w[2],
      v[0] * w[1] - v[1] * w[0],
    ];
    const triple = Math.abs(u[0] * cr[0] + u[1] * cr[1] + u[2] * cr[2]);
    const corners = CUBE_CORNERS.map((p) => apply(M, p));
    return { M, det, u, v, w, triple, corners };
  }, [theta, sx, sy, sz, k]);

  const preset = (p: 'id' | 'rot' | 'shear' | 'refl' | 'flat') => {
    if (p === 'id') { setTheta(0); setSx(1); setSy(1); setSz(1); setK(0); }
    if (p === 'rot') { setTheta(60); setSx(1); setSy(1); setSz(1); setK(0); }
    if (p === 'shear') { setTheta(0); setSx(1); setSy(1); setSz(1); setK(0.8); }
    if (p === 'refl') { setTheta(0); setSx(-1); setSy(1); setSz(1); setK(0); }
    if (p === 'flat') { setTheta(35); setSx(1.4); setSy(0.8); setSz(0); setK(0); }
  };

  const reset = () => preset('id');
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k2: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k2}</span><span className={cls}>{v}</span></div>
  );
  const slider = (label: string, v: number, mn: number, mx: number, step: number, set: (x: number) => void) => (
    <div className="flex items-center gap-2">
      <span className="w-8 text-xs font-display font-bold text-surface-300">{label}</span>
      <input type="range" min={mn} max={mx} step={step} value={v}
        onChange={(e) => set(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
      <span className="w-10 text-xs text-white">{v.toFixed(2)}</span>
    </div>
  );

  const flat = Math.abs(m.det) < 1e-9;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [3.2, 2.6, 4.2], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[6, 9, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[16, 16]} cellSize={0.5} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={2.5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={30} fadeStrength={1.2} />
          {/* original unit cube (ghost) */}
          {CUBE_EDGES.map(([i, j], e) => (
            <Line key={`o${e}`} points={[CUBE_CORNERS[i], CUBE_CORNERS[j]]} color={GREY} lineWidth={1.3} />
          ))}
          {/* transformed parallelepiped */}
          {CUBE_EDGES.map(([i, j], e) => (
            <Line key={`t${e}`} points={[m.corners[i], m.corners[j]]} color={flat ? ROSE : GOLD} lineWidth={2.6} />
          ))}
          {!flat && (
            <mesh>
              <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[
                  new Float32Array([0, 0, 0, ...m.u, ...m.w, 0, 0, 0, ...m.w, ...m.v]), 3]} />
              </bufferGeometry>
              <meshBasicMaterial color={GOLD} transparent opacity={0.16} side={THREE.DoubleSide} />
            </mesh>
          )}
          {/* basis images as labelled vectors */}
          <Line points={[[0, 0, 0], m.u]} color="#fb7185" lineWidth={3} />
          <Line points={[[0, 0, 0], m.v]} color="#60a5fa" lineWidth={3} />
          <Line points={[[0, 0, 0], m.w]} color="#34d399" lineWidth={3} />
          <Text position={[m.u[0] + 0.1, m.u[1] + 0.15, m.u[2]]} fontSize={0.18} color={ROSE}>M·î</Text>
          <Text position={[m.v[0] + 0.1, m.v[1] + 0.15, m.v[2]]} fontSize={0.18} color="#60a5fa">M·ĵ</Text>
          <Text position={[m.w[0] + 0.1, m.w[1] + 0.15, m.w[2]]} fontSize={0.18} color="#34d399">M·k̂</Text>
          {flat && <Text position={[0.5, -0.6, 0.5]} fontSize={0.26} color={ROSE}>collapsed — det = 0</Text>}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={2} maxDistance={16} target={[0.5, 0.5, 0.5]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[286px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">M = H·Rz·S — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {m.M.map((r, i) => (
              <div key={i} className="flex gap-3 text-white">
                <span className="text-surface-500">row {i + 1}</span>
                <span className="tabular-nums">{r.map((x) => x.toFixed(2).padStart(6)).join('  ')}</span>
              </div>
            ))}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              det M = a(ei−fh) − b(di−fg) + c(dh−eg)
            </div>
            {row('det by cofactor expansion', m.det.toFixed(4), 'text-gold-300')}
            {row('volume of image = |u·(v×w)|', m.triple.toFixed(4), 'text-gold-300')}
            {row('identity check', Math.abs(Math.abs(m.det) - m.triple) < 1e-6 ? 'equal ✓' : '…', 'text-emerald-300')}
            {row('orientation', m.det > 1e-9 ? 'preserved (right-handed)' : m.det < -1e-9 ? 'FLIPPED (mirror) — det < 0' : 'none (flat)', m.det < -1e-9 ? 'text-rose-300' : 'text-white')}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Grey ghost = original unit cube · gold = M applied · coloured arrows = image of each basis vector
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Box className="h-3.5 w-3.5 text-gold-400" /> presets:</span>
        {([['id', 'identity'], ['rot', 'rotate 60°'], ['shear', 'shear'], ['refl', 'reflect'], ['flat', 'collapse']] as [string, string][]).map(([p, nm]) => (
          <button key={p} onClick={() => preset(p as 'id')} className={btn(false)}>{nm}</button>
        ))}
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: ROSE }}>SCALES + SHEAR</div>
          <div className="mt-2 space-y-1">
            {slider('θ', theta, 0, 180, 1, setTheta)}
            {slider('k', k, -1.5, 1.5, 0.05, setK)}
          </div>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">SCALE sx, sy, sz</div>
          <div className="mt-2 space-y-1">
            {slider('sx', sx, -2, 2, 0.05, setSx)}
            {slider('sy', sy, -2, 2, 0.05, setSy)}
            {slider('sz', sz, -2, 2, 0.05, setSz)}
          </div>
        </div>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><MoveHorizontal className="h-4 w-4" /> COLUMNS = MOVE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The three coloured arrows are M·î, M·ĵ, M·k̂ — what the matrix DOES to each
            basis vector. Everything else follows, because linear maps preserve the grid:
            every point is a combination of those three.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Percent className="h-4 w-4" /> det = VOLUME DIAL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            |det M| = exactly how many unit cubes fit in the image — read both computations
            agreeing in the HUD. Scale sz from 1 to 0 and the parallelepiped pancakes flat:
            volume factor hits 0, the map is irreversible.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> SIGN = MIRROR</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            det &lt; 0 flips handedness — the gold solid is a mirror image of any rotation-only
            result. Slide sx across 0 and watch the sign flip while volume stays positive:
            |−1| = 1, the cube keeps its size but turns into its reflection.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;det M is just some number from a formula.&quot; No —
            <span className="text-white"> det M is the volume scale factor of the
            transformation.</span> A matrix with det = 0 CRUSHES space flat (the collapse
            preset) — which is exactly why such systems have no inverse: you cannot un-flatten
            a pancake.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Rotate 60° and read det: 1.000 — rotations PRESERVE volume (spin a rigid cube,
            nothing squashes). Then add sx = 2: det jumps to 2.000, exactly the doubling.
            ② Build det = −2 with sx = −2, then try sx = −2 AND sy = −2: the two mirrors
            compose to a rotation — det = +4, volume grows 4× but handedness restores.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'A linear map with det M = 5 sends the unit cube to a solid of volume…', opts: ['5', '1/5', 'unchanged, 1'], correct: 0 },
  { q: 'det M = 0 means the transformation…', opts: ['collapses space — no inverse exists', 'is a pure rotation', 'doubles every length'], correct: 0 },
  { q: 'A reflection matrix has determinant…', opts: ['−1 — orientation flips', '+1 — orientation preserved', '0'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on matrix transforms — no marks, no shame.</p>
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
