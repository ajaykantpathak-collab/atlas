'use client';

/**
 * C12_MathsLinesPlanesSpaceSim.tsx — 3D
 * Class 12 Maths — Three Dimensional Geometry: line pairs & point-plane
 * distance
 *
 * WHY 3D: in 3D two lines need not meet AND need not be parallel — skew
 * lines are a genuinely 3D species. And the perpendicular "drop" from a
 * point to a plane is a 3D shadow trick you can only judge by orbiting.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  1. Classification of L₁, L₂ with directions d₁, d₂, anchors P₁, P₂:
 *       n = d₁×d₂                       (common-normal direction)
 *       w = (P₂−P₁)·n                   (signed gap along that normal)
 *       |n| ≈ 0        → parallel (or same line if w ≈ 0 too)
 *       |w| ≈ 0        → intersecting (coplanar, n ⊥ P₂−P₁)
 *       otherwise      → skew, and the shortest gap is d = |w|/|n|
 *         (w is exactly the component of P₂−P₁ along the UNIT common
 *          normal n̂:  d = |P₂−P₁)·n̂| = |w|/|n|)
 *  2. Intersection point when w ≈ 0: solve P₁+s d₁ = P₂+u d₂.
 *     Cross both sides with d₂:  s·(d₁×d₂) = (P₂−P₁)×d₂, then dot with
 *     (d₁×d₂):   s = ((P₂−P₁)×d₂)·(d₁×d₂) / |d₁×d₂|²
 *  3. Foot of perpendicular from Q to plane n·x = d:
 *     write F = Q − λn and impose n·F = d:
 *       n·Q − λ|n|² = d  ⇒  λ = (n·Q − d)/|n|²
 *       distance = |n·Q − d|/|n|
 *
 * Controls: L₂ direction yaw ψ and side-offset h; plane normal (a,b) with
 * c = 1 and offset d; probe point Q; Reset.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Spline, Plane, RotateCcw, Sparkles, MoveVertical } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const CYAN = '#7dd3fc';
const BLUE = '#60a5fa';
const GREEN = '#34d399';

type V3 = [number, number, number];
const sub = (p: V3, q: V3): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
const dotP = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
const crossP = (p: V3, q: V3): V3 => [
  p[1] * q[2] - p[2] * q[1], p[2] * q[0] - p[0] * q[2], p[0] * q[1] - p[1] * q[0],
];
const lenP = (p: V3) => Math.sqrt(dotP(p, p));

function PointTag({ pos, color, label }: { pos: V3; color: string; label: string }) {
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.14, 24, 24]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0, 0.4, 0]} fontSize={0.28} color={color} anchorX="center">{label}</Text>
    </group>
  );
}

export default function C12_MathsLinesPlanesSpaceSim() {
  const [psi, setPsi] = useState(70);     // yaw of L₂ direction, degrees
  const [h, setH] = useState(2);          // side offset of L₂ anchor
  const [pa, setPa] = useState(1);        // plane: a x + 1 y + b z = d
  const [pb, setPb] = useState(1);
  const [pd, setPd] = useState(2);
  const [q, setQ] = useState<V3>([2.5, 3.5, 2]);

  // fixed line L₁
  const P1: V3 = [-3.5, -1, -2];
  const d1: V3 = [1, 0.55, 0.35];

  const m = useMemo(() => {
    const rad = (psi * Math.PI) / 180;
    const P2: V3 = [3.5, 1.2, -2 + h];
    const d2: V3 = [Math.cos(rad), 0.45, Math.sin(rad)];
    const n = crossP(d1, d2);
    const nLen = lenP(n);
    const w = dotP(sub(P2, P1), n);
    let kind: 'parallel' | 'intersecting' | 'skew' = 'skew';
    if (nLen < 0.06) kind = 'parallel';
    else if (Math.abs(w) < 0.08) kind = 'intersecting';
    // intersection parameter s (derived above)
    let s = NaN;
    if (kind === 'intersecting') {
      const num = dotP(crossP(sub(P2, P1), d2), n);
      s = num / dotP(n, n);
    }
    const gap = nLen > 1e-6 ? Math.abs(w) / nLen : 0;
    // plane + foot of perpendicular
    const nrm: V3 = [pa, 1, pb];
    const nl2 = dotP(nrm, nrm);
    const lam = (dotP(nrm, q) - pd) / nl2;
    const F: V3 = [q[0] - lam * nrm[0], q[1] - lam * nrm[1], q[2] - lam * nrm[2]];
    const dist = Math.abs(dotP(nrm, q) - pd) / Math.sqrt(nl2);
    return { P2, d2, n, nLen, w, kind, s, gap, nrm, lam, F, dist };
  }, [psi, h, pa, pb, pd, q]);

  const seg = (P: V3, d: V3): [V3, V3] => [
    [P[0] - 3 * d[0], P[1] - 3 * d[1], P[2] - 3 * d[2]],
    [P[0] + 3 * d[0], P[1] + 3 * d[1], P[2] + 3 * d[2]],
  ];
  const [l1a, l1b] = seg(P1, d1);
  const [l2a, l2b] = seg(m.P2, m.d2);

  // plane mesh: n·x = d through foot point d·n/|n|², oriented by quaternion
  const planeMesh = useMemo(() => {
    const nrm = new THREE.Vector3(...m.nrm).normalize();
    const centre = new THREE.Vector3(...m.nrm).multiplyScalar(pd / dotP(m.nrm, m.nrm));
    const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), nrm);
    return { centre, quat };
  }, [m.nrm, pd]);

  const reset = () => { setPsi(70); setH(2); setPa(1); setPb(1); setPd(2); setQ([2.5, 3.5, 2]); };

  const kindColor = m.kind === 'parallel' ? CYAN : m.kind === 'intersecting' ? GREEN : ROSE;
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );
  const slider = (label: string, v: number, mn: number, mx: number, set: (x: number) => void) => (
    <div className="flex items-center gap-2">
      <span className="w-9 text-xs font-display font-bold text-surface-300">{label}</span>
      <input type="range" min={mn} max={mx} step={0.1} value={v}
        onChange={(e) => set(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
      <span className="w-9 text-xs text-white">{v.toFixed(1)}</span>
    </div>
  );

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [10, 7, 12], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.85} color="#ffe9b8" />
          <Grid args={[36, 36]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={70} fadeStrength={1.2} />
          {/* plane n·x = d */}
          <mesh position={planeMesh.centre} quaternion={planeMesh.quat}>
            <planeGeometry args={[8, 8]} />
            <meshBasicMaterial color={CYAN} transparent opacity={0.14} side={THREE.DoubleSide} />
          </mesh>
          {/* the two lines */}
          <Line points={[l1a, l1b]} color={GOLD} lineWidth={2.8} />
          <Line points={[l2a, l2b]} color={ROSE} lineWidth={2.8} />
          <Text position={[l1b[0] + 0.3, l1b[1], l1b[2]]} fontSize={0.3} color={GOLD}>L₁</Text>
          <Text position={[l2b[0] + 0.3, l2b[1], l2b[2]]} fontSize={0.3} color={ROSE}>L₂</Text>
          {/* intersection point or skew gap */}
          {m.kind === 'intersecting' && !Number.isNaN(m.s) && (
            <PointTag pos={[P1[0] + m.s * d1[0], P1[1] + m.s * d1[1], P1[2] + m.s * d1[2]]}
              color={GREEN} label="P (meet)" />
          )}
          {m.kind === 'skew' && (
            <Text position={[0, 5.6, 0]} fontSize={0.4} color={ROSE}>skew — shortest gap {m.gap.toFixed(2)}</Text>
          )}
          {m.kind === 'parallel' && (
            <Text position={[0, 5.6, 0]} fontSize={0.4} color={CYAN}>parallel — d₁×d₂ = 0</Text>
          )}
          {/* probe point Q and its foot F on the plane, dashed drop */}
          <PointTag pos={q} color={BLUE} label="Q" />
          <PointTag pos={m.F} color={GREEN} label="F (foot)" />
          <Line points={[q, m.F]} color="rgba(52,211,153,0.85)" lineWidth={2} dashed dashSize={0.22} gapSize={0.14} />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={36} target={[0, 1.5, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[270px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Space analyser</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between">
              <span className="text-surface-500">L₁ vs L₂</span>
              <span className="font-display font-bold" style={{ color: kindColor }}>{m.kind.toUpperCase()}</span>
            </div>
            {row('|d₁×d₂| (0 ⇒ parallel)', m.nLen.toFixed(3))}
            {row('w = (P₂−P₁)·(d₁×d₂)', m.w.toFixed(3))}
            {m.kind === 'skew' && row('gap = |w|/|d₁×d₂|', `${m.gap.toFixed(3)} units`, 'text-gold-300')}
            {m.kind === 'intersecting' && row('meets at s = ', m.s.toFixed(3), 'text-gold-300')}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              plane {pa.toFixed(1)}x + y + {pb.toFixed(1)}z = {pd.toFixed(1)}
            </div>
            {row('λ = (n·Q−d)/|n|²', m.lam.toFixed(3))}
            {row('foot F', `(${m.F.map((v) => v.toFixed(2)).join(', ')})`)}
            {row('distance Q→plane = |n·Q−d|/|n|', `${m.dist.toFixed(3)} units`, 'text-gold-300')}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The green dashed segment is always ⊥ to the glassy plane — orbit to verify
        </div>
      </div>

      {/* ── controls ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: ROSE }}>LINE L₂ (L₁ fixed)</div>
          <div className="mt-2 space-y-1">
            {slider('ψ (dir)', psi, 0, 180, setPsi)}
            {slider('h (offset)', h, -3, 3, setH)}
          </div>
          <div className="mt-2 flex gap-2">
            {([['skew', 70, 2], ['intersect', 55, -1.5], ['parallel', 8, 2]] as [string, number, number][]).map(([nm, p, hh]) => (
              <button key={nm} onClick={() => { setPsi(p); setH(hh); }}
                className={btn(m.kind === nm)}>{nm}</button>
            ))}
          </div>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">PLANE + PROBE POINT Q</div>
          <div className="mt-2 grid grid-cols-2 gap-x-4">
            {slider('a', pa, -2, 2, setPa)}
            {slider('b', pb, -2, 2, setPb)}
            {slider('d', pd, -3, 3, setPd)}
            {slider('Qx', q[0], -5, 5, (v) => setQ([v, q[1], q[2]]))}
            {slider('Qy', q[1], -1, 6, (v) => setQ([q[0], v, q[2]]))}
            {slider('Qz', q[2], -5, 5, (v) => setQ([q[0], q[1], v]))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Spline className="h-3.5 w-3.5 text-gold-400" /> n·x = d with n = ({pa.toFixed(1)}, 1, {pb.toFixed(1)})</span>
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Plane className="h-3.5 w-3.5 text-gold-400" /> |n| = {Math.sqrt(pa * pa + 1 + pb * pb).toFixed(3)}</span>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Spline className="h-4 w-4" /> SKEW LINES</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Not parallel, yet never meeting — only possible when the lines live in
            <span className="text-white"> different planes</span>. The triple product
            w = (P₂−P₁)·(d₁×d₂) measures the off-plane gap; the HUD flips INTERSECTING ↔ SKEW
            as you nudge h through 0.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><MoveVertical className="h-4 w-4" /> SHORTEST DISTANCE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Skew gap d = |w|/|d₁×d₂| and point-plane distance |n·Q−d|/|n| are the SAME idea:
            project the connector vector onto the relevant <span className="text-white">unit normal</span>.
            One idea, two formulas — both read out live above.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Plane className="h-4 w-4" /> THE FOOT</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Walk from Q backwards along n until you land on the plane: F = Q − λn with
            λ = (n·Q−d)/|n|². The dashed green line is that walk. Its length is the answer —
            F always satisfies n·F = d exactly.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;If two lines don&apos;t meet they must be parallel.&quot; That&apos;s 2D thinking —
            <span className="text-white"> in 3D skew lines are the default</span>. Drag h: for
            most values L₁ and L₂ never touch, yet d₁×d₂ ≠ 0. Parallel needs BOTH
            d₁×d₂ = 0 AND a shared plane — the HUD shows the full test, not just one clause.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Use the intersect preset, then move Q onto the intersection point P: the
            distance Q→plane and the line-gap both change — two independent geometries, one scene.
            ② Set a = 0, b = 0 (plane y = d): the distance collapses to |Q_y − d| —
            the general formula reducing to the obvious one.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Two lines with d₁×d₂ ≠ 0 and (P₂−P₁)·(d₁×d₂) = 0 are…', opts: ['intersecting', 'skew', 'parallel'], correct: 0 },
  { q: 'Distance from Q to the plane n·x = d equals…', opts: ['|n·Q − d|/|n|', '|n·Q − d|', '|n|·|Q − d|'], correct: 0 },
  { q: 'The foot of the perpendicular F from Q satisfies…', opts: ['n·F = d and F = Q − λn', 'F·Q = 0', 'F is the midpoint of Q and the origin'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on lines &amp; planes — no marks, no shame.</p>
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
