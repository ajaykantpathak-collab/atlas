'use client';

/**
 * C12_MathsScalarTripleProductSim.tsx — 3D
 * Class 12 Maths — Vector Algebra: scalar triple product & coplanarity
 *
 * WHY 3D: [a b c] is the volume of a box that only exists in 3D. Set the
 * three vectors coplanar and the box dies to a zero-volume sheet — the
 * determinant hits zero in front of your eyes.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Scalar triple product:  [a b c] = a·(b×c)
 *  Expanding b×c = (b₂c₃−b₃c₂, b₃c₁−b₁c₃, b₁c₂−b₂c₁) and dotting with a
 *  reproduces exactly the 3×3 determinant expansion:
 *      [a b c] = a₁(b₂c₃−b₃c₂) − a₂(b₃c₁−b₁c₃) + a₃(b₁c₂−b₂c₁)
 *              = det | a₁ a₂ a₃ |
 *                    | b₁ b₂ b₃ |
 *                    | c₁ c₂ c₃ |
 *  Volume: the parallelepiped spanned by a, b, c has base area |b×c| and
 *  height |a|·|cos θ| where θ is between a and b×c (the base normal):
 *      V = |b×c| · |a||cos θ| = |a·(b×c)| = |[a b c]|
 *  Coplanarity: vectors in one plane give zero height ⇒ [a b c] = 0 —
 *  THE standard test. Sign of [a b c] tells handedness: positive =
 *  right-handed triple (matches î, ĵ, k̂).
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Box, Volume2, RotateCcw, Sparkles, Layers } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const BLUE = '#60a5fa';
const GREEN = '#34d399';

type V3 = [number, number, number];
const cross = (u: V3, v: V3): V3 => [
  u[1] * v[2] - u[2] * v[1],
  u[2] * v[0] - u[0] * v[2],
  u[0] * v[1] - u[1] * v[0],
];
const dot = (u: V3, v: V3) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];

/** parallelepiped from origin along a,b,c: 6 quad faces = 12 triangles */
function BoxFaces({ a, b, c, color, opacity }: { a: V3; b: V3; c: V3; color: string; opacity: number }) {
  const o: V3 = [0, 0, 0];
  const ab: V3 = [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
  const ac: V3 = [a[0] + c[0], a[1] + c[1], a[2] + c[2]];
  const bc: V3 = [b[0] + c[0], b[1] + c[1], b[2] + c[2]];
  const abc: V3 = [a[0] + b[0] + c[0], a[1] + b[1] + c[1], a[2] + b[2] + c[2]];
  const quads: V3[][] = [
    [o, b, bc, c], [a, ab, abc, ac],          // c-faces
    [o, a, ac, c], [b, ab, abc, bc],          // a-faces
    [o, a, ab, b], [c, ac, abc, bc],          // b-faces
  ];
  const tris = quads.flatMap(([p, q, r, s]) => [...p, ...q, ...r, ...p, ...r, ...s]);
  return (
    <group>
      <mesh>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[new Float32Array(tris), 3]} />
        </bufferGeometry>
        <meshBasicMaterial color={color} transparent opacity={opacity} side={THREE.DoubleSide} depthWrite={false} />
      </mesh>
      {([[ab, abc], [ac, abc], [bc, abc]] as [V3, V3][]).map(([p, q], i) => (
        <Line key={`f${i}`} points={[p, q]} color="rgba(255,255,255,0.15)" lineWidth={1} />
      ))}
    </group>
  );
}

export default function C12_MathsScalarTripleProductSim() {
  const [a, setA] = useState<V3>([3, 0, 1]);
  const [b, setB] = useState<V3>([1, 3, 0]);
  const [c, setC] = useState<V3>([0, 1, 3]);
  const [showFaces, setShowFaces] = useState(true);

  const m = useMemo(() => {
    const bc = cross(b, c);
    const triple = dot(a, bc);
    // det expansion written out term by term
    const det =
      a[0] * (b[1] * c[2] - b[2] * c[1]) -
      a[1] * (b[0] * c[2] - b[2] * c[0]) +
      a[2] * (b[0] * c[1] - b[1] * c[0]);
    const bcLen = Math.sqrt(dot(bc, bc));
    const vol = Math.abs(triple);
    const coplanar = vol < 0.05;
    const rightHanded = triple > 0;
    return { bc, triple, det, bcLen, vol, coplanar, rightHanded };
  }, [a, b, c]);

  const reset = () => { setA([3, 0, 1]); setB([1, 3, 0]); setC([0, 1, 3]); setShowFaces(true); };
  const coplanarPreset = () => { setA([2, 1, 0]); setB([1, 3, 0]); setC([-1, 5, 0]); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );
  const vecSliders = (label: string, v: V3, set: (x: V3) => void, color: string) => (
    <div className="rounded-xl border p-3" style={{ borderColor: `${color}33`, background: `${color}0a` }}>
      <div className="font-display text-xs font-bold" style={{ color }}>{label}</div>
      <div className="mt-2 grid grid-cols-3 gap-2">
        {([0, 1, 2] as const).map((i) => (
          <div key={i} className="flex items-center gap-1.5">
            <span className="w-4 text-[11px] font-bold" style={{ color }}>{['x', 'y', 'z'][i]}</span>
            <input type="range" min={-4} max={4} step={0.5} value={v[i]}
              onChange={(e) => { const nv = [...v] as V3; nv[i] = Number(e.target.value); set(nv); }}
              className="h-11 w-16 accent-amber-400" />
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [8, 7, 10], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.85} color="#ffe9b8" />
          <Grid args={[24, 24]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={50} fadeStrength={1.2} />
          {/* the three edge vectors */}
          <Line points={[[0, 0, 0], a]} color={ROSE} lineWidth={3.2} />
          <Line points={[[0, 0, 0], b]} color={BLUE} lineWidth={3.2} />
          <Line points={[[0, 0, 0], c]} color={GREEN} lineWidth={3.2} />
          <Text position={[a[0] + 0.25, a[1] + 0.25, a[2]]} fontSize={0.3} color={ROSE}>a</Text>
          <Text position={[b[0] + 0.25, b[1] + 0.25, b[2]]} fontSize={0.3} color={BLUE}>b</Text>
          <Text position={[c[0] + 0.25, c[1] + 0.25, c[2]]} fontSize={0.3} color={GREEN}>c</Text>
          {/* the box */}
          <BoxFaces a={a} b={b} c={c}
            color={m.coplanar ? ROSE : GOLD} opacity={m.coplanar ? 0.1 : showFaces ? 0.16 : 0.04} />
          {/* b×c normal arrow (the base&apos;s perpendicular) */}
          {m.bcLen > 0.1 && (
            <Line points={[[0, 0, 0],
              [m.bc[0] / m.bcLen * 2.2, m.bc[1] / m.bcLen * 2.2, m.bc[2] / m.bcLen * 2.2]]}
              color="rgba(255,255,255,0.55)" lineWidth={1.6} dashed dashSize={0.18} gapSize={0.12} />
          )}
          {m.coplanar && (
            <Text position={[0, 4.6, 0]} fontSize={0.4} color={ROSE}>coplanar — the box has zero height</Text>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} target={[1.5, 1.2, 1.5]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[286px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Triple product — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="text-[10px] text-surface-500">
              b×c = ({m.bc.map((v) => v.toFixed(2)).join(', ')})
            </div>
            {row('|b×c| (base area)', `${m.bcLen.toFixed(3)} unit²`)}
            {row('a·(b×c) direct', m.triple.toFixed(4), 'text-gold-300')}
            {row('det |a; b; c| expansion', m.det.toFixed(4), 'text-gold-300')}
            {row('identity check', Math.abs(m.triple - m.det) < 1e-9 ? 'equal ✓' : '…', 'text-emerald-300')}
            <div className="mt-1 border-t border-white/10 pt-1">
              {row('box volume = |[abc]|', `${m.vol.toFixed(3)} unit³`, 'text-gold-300')}
              {row('orientation', m.coplanar ? 'flat' : m.rightHanded ? 'right-handed (+)' : 'left-handed (−)', m.coplanar ? 'text-rose-300' : 'text-white')}
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Volume = base area |b×c| × height = |a·(b×c)| — orbit and see the height
        </div>
      </div>

      {/* ── controls ── */}
      <div className="grid gap-3 md:grid-cols-3">
        {vecSliders('VECTOR a', a, setA, ROSE)}
        {vecSliders('VECTOR b', b, setB, BLUE)}
        {vecSliders('VECTOR c', c, setC, GREEN)}
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Box className="h-3.5 w-3.5 text-gold-400" /> [a b c] = a·(b×c)</span>
        <button onClick={() => setShowFaces(!showFaces)} className={btn(showFaces)}>box faces</button>
        <button onClick={coplanarPreset} className={btn(false)}>coplanar preset (all z = 0)</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Volume2 className="h-4 w-4" /> GEOMETRY FIRST</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            b×c is a vector ⊥ to the base with length = base area. Dotting with a asks how
            much of a stands along that normal — i.e. the <span className="text-white">height</span>.
            Area × height = volume. The formula is just that sentence.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Layers className="h-4 w-4" /> SAME AS THE DETERMINANT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Writing a·(b×c) out term by term gives exactly the 3×3 determinant rows a, b, c.
            The HUD shows both computed separately — they never disagree. This is why the
            det formula &quot;works&quot;.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> ZERO = COPLANAR</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Press the coplanar preset: all three vectors drop into the z = 0 sheet, height
            → 0, [a b c] → 0. That zero test is how exam questions check four-point
            coplanarity: make edge vectors, take the det.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Swapping the vectors doesn&apos;t change the triple product.&quot; No —
            <span className="text-white"> swapping ANY two flips its sign</span>:
            [a b c] = [b c a] = [c a b], but [a c b] = −[a b c]. The volume |·| stays the
            same, yet the sign tracks handedness — swap b and c in the sim and watch the
            readout go negative while the box keeps its size.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Make a = (1,0,0), b = (0,2,0), c = (0,0,3): the box becomes a rectangular
            cuboid and [a b c] = 6 = 1·2·3 — the determinant reduced to multiplying the diagonal.
            ② Nudge c to (1,2,0) with a, b in the z = 0 plane: volume stays 0 —
            any c IN the plane of a and b passes the zero test.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Three vectors are coplanar exactly when…', opts: ['[a b c] = 0', '[a b c] > 0', 'a·b = 0'], correct: 0 },
  { q: '|[a b c]| geometrically equals…', opts: ['volume of the parallelepiped on a, b, c', 'area of triangle abc', 'length of a'], correct: 0 },
  { q: 'Swapping two vectors in the triple product…', opts: ['flips the sign', 'doubles the value', 'changes nothing at all'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on the triple product — no marks, no shame.</p>
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
