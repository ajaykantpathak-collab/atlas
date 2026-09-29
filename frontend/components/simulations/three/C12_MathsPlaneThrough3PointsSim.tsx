'use client';

/**
 * C12_MathsPlaneThrough3PointsSim.tsx — 3D
 * Class 12 Maths — Three Dimensional Geometry: plane through three points
 *
 * WHY 3D: three non-collinear points nail down exactly one plane — but you
 * only believe it when you orbit the triangle and see the normal stand up
 * out of it. Collinear points collapse the whole construction to zero.
 *
 * HAND-DERIVED NUMERICS (all live from the 9 sliders):
 *  In-plane vectors:  u = P₂−P₁,  v = P₃−P₁
 *  Normal by cross product:
 *      n = u×v = (u_yv_z−u_zv_y,  u_zv_x−u_xv_z,  u_xv_y−u_yv_x)
 *  Why n is perpendicular to BOTH: n·u = (u×v)·u = 0 because a×b is ⊥ a;
 *  algebraically the terms cancel pairwise (u·(u×v) = det with two
 *  equal rows = 0).
 *  Plane equation n·x = d with  d = n·P₁  (P₁ must satisfy its own plane).
 *  Area of the triangle = ½|u×v|  (base×height /2 in vector form).
 *  Degenerate test: |n| = 0 ⇔ u ∥ v ⇔ points collinear ⇒ NO unique plane.
 *
 * HUD verifies n·P₁ = n·P₂ = n·P₃ = d to display precision — live proof.
 */

import React, { useMemo, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Triangle, ArrowUpRight, RotateCcw, Sparkles, CircleSlash } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const BLUE = '#60a5fa';
const GREEN = '#34d399';

type V3 = [number, number, number];
type Pt = [number, number, number];

const sub = (p: Pt, q: Pt): V3 => [p[0] - q[0], p[1] - q[1], p[2] - q[2]];
const dot = (p: V3, q: V3) => p[0] * q[0] + p[1] * q[1] + p[2] * q[2];
const cross = (u: V3, v: V3): V3 => [
  u[1] * v[2] - u[2] * v[1],
  u[2] * v[0] - u[0] * v[2],
  u[0] * v[1] - u[1] * v[0],
];
const norm = (p: V3) => Math.sqrt(dot(p, p));

function PointMarker({ pos, color, label }: { pos: Pt; color: string; label: string }) {
  return (
    <group position={pos}>
      <mesh>
        <sphereGeometry args={[0.16, 28, 28]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      <Text position={[0, 0.5, 0]} fontSize={0.34} color={color} anchorX="center">{label}</Text>
    </group>
  );
}

export default function C12_MathsPlaneThrough3PointsSim() {
  const [p1, setP1] = useState<Pt>([-2, -1, 1]);
  const [p2, setP2] = useState<Pt>([3, 0.5, -1]);
  const [p3, setP3] = useState<Pt>([0, 2, 2]);
  const [showNormal, setShowNormal] = useState(true);

  const m = useMemo(() => {
    const u = sub(p2, p1);
    const v = sub(p3, p1);
    const n = cross(u, v);
    const nLen = norm(n);
    const d = dot(n, p1);
    const area = nLen / 2;
    // live verification that all three points satisfy n·x = d
    const eq2 = dot(n, p2), eq3 = dot(n, p3);
    const degenerate = nLen < 0.05;
    // orthonormal frame for drawing the extended plane + normal arrow
    const nHat: V3 = nLen > 1e-6 ? [n[0] / nLen, n[1] / nLen, n[2] / nLen] : [0, 0, 1];
    const centre: V3 = [(p1[0] + p2[0] + p3[0]) / 3, (p1[1] + p2[1] + p3[1]) / 3, (p1[2] + p2[2] + p3[2]) / 3];
    return { u, v, n, nLen, d, area, eq2, eq3, degenerate, nHat, centre };
  }, [p1, p2, p3]);

  // extended glassy plane through the triangle, oriented along n̂
  const planeMesh = useMemo(() => {
    const q = new THREE.Quaternion().setFromUnitVectors(
      new THREE.Vector3(0, 0, 1), new THREE.Vector3(...m.nHat));
    return q;
  }, [m.nHat]);

  const tri: Pt[] = [p1, p2, p3];
  const triVerts = new Float32Array([...p1, ...p2, ...p3]);

  const reset = () => { setP1([-2, -1, 1]); setP2([3, 0.5, -1]); setP3([0, 2, 2]); setShowNormal(true); };

  const axisSlider = (label: string, v: number, set: (x: number) => void, color: string) => (
    <div className="flex items-center gap-2">
      <span className="w-6 text-xs font-display font-bold" style={{ color }}>{label}</span>
      <input type="range" min={-4} max={4} step={0.5} value={v}
        onChange={(e) => set(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
      <span className="w-9 text-xs text-white">{v % 1 === 0 ? v : v.toFixed(1)}</span>
    </div>
  );
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
        <Canvas camera={{ position: [9, 6, 11], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.9} color="#ffe9b8" />
          <Grid args={[30, 30]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.22)"
            fadeDistance={60} fadeStrength={1.2} />
          {/* extended glassy plane */}
          {!m.degenerate && (
            <mesh position={m.centre} quaternion={planeMesh}>
              <planeGeometry args={[14, 14]} />
              <meshBasicMaterial color={GOLD} transparent opacity={0.09} side={THREE.DoubleSide} />
            </mesh>
          )}
          {/* the triangle P₁P₂P₃ */}
          <mesh>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[triVerts, 3]} />
            </bufferGeometry>
            <meshBasicMaterial color={GOLD} transparent opacity={0.3} side={THREE.DoubleSide} />
          </mesh>
          <Line points={[...tri, p1]} color={GOLD} lineWidth={2.6} />
          {/* normal arrow from centroid */}
          {showNormal && !m.degenerate && (
            <group>
              <Line points={[m.centre,
                [m.centre[0] + m.nHat[0] * 3.2, m.centre[1] + m.nHat[1] * 3.2, m.centre[2] + m.nHat[2] * 3.2]]}
                color={GREEN} lineWidth={3} />
              <mesh position={[
                m.centre[0] + m.nHat[0] * 3.35, m.centre[1] + m.nHat[1] * 3.35, m.centre[2] + m.nHat[2] * 3.35]}>
                <sphereGeometry args={[0.1, 16, 16]} />
                <meshBasicMaterial color={GREEN} />
              </mesh>
              <Text position={[m.centre[0] + m.nHat[0] * 3.7, m.centre[1] + m.nHat[1] * 3.7 + 0.3, m.centre[2] + m.nHat[2] * 3.7]}
                fontSize={0.32} color={GREEN}>n = u×v</Text>
            </group>
          )}
          <PointMarker pos={p1} color={ROSE} label={`P₁ (${p1.map((v) => (v % 1 === 0 ? v : v.toFixed(1))).join(',')})`} />
          <PointMarker pos={p2} color={BLUE} label={`P₂`} />
          <PointMarker pos={p3} color={GREEN} label={`P₃`} />
          {m.degenerate && (
            <Text position={[0, 5.2, 0]} fontSize={0.42} color={ROSE}>collinear → no unique plane</Text>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={34} target={[0, 1, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[280px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Plane from P₁P₂P₃ — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('u = P₂−P₁', `(${m.u.map((v) => v.toFixed(1)).join(', ')})`)}
            {row('v = P₃−P₁', `(${m.v.map((v) => v.toFixed(1)).join(', ')})`)}
            <div className="border-t border-white/10 pt-1 text-[10px] text-surface-500">
              n = u×v = ({m.n.map((v) => v.toFixed(2)).join(', ')})
            </div>
            {row('|n|', m.nLen.toFixed(3))}
            {m.degenerate ? (
              <div className="pt-1 font-display font-bold text-rose-300">DEGENERATE — points collinear</div>
            ) : (
              <>
                {row('equation', `${m.n[0].toFixed(1)}x + ${m.n[1].toFixed(1)}y + ${m.n[2].toFixed(1)}z = ${m.d.toFixed(1)}`, 'text-gold-300')}
                {row('triangle area = ½|u×v|', `${m.area.toFixed(2)} unit²`, 'text-gold-300')}
                {row('n·P₁, n·P₂, n·P₃', `${m.d.toFixed(2)} = ${m.eq2.toFixed(2)} = ${m.eq3.toFixed(2)} ✓`, 'text-emerald-300')}
              </>
            )}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The green normal stays ⊥ to every in-plane line — orbit and check
        </div>
      </div>

      {/* ── controls: 3 point cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: ROSE }}>POINT P₁</div>
          <div className="mt-2 space-y-1">
            {axisSlider('x', p1[0], (v) => setP1([v, p1[1], p1[2]]), ROSE)}
            {axisSlider('y', p1[1], (v) => setP1([p1[0], v, p1[2]]), ROSE)}
            {axisSlider('z', p1[2], (v) => setP1([p1[0], p1[1], v]), ROSE)}
          </div>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: BLUE }}>POINT P₂</div>
          <div className="mt-2 space-y-1">
            {axisSlider('x', p2[0], (v) => setP2([v, p2[1], p2[2]]), BLUE)}
            {axisSlider('y', p2[1], (v) => setP2([p2[0], v, p2[2]]), BLUE)}
            {axisSlider('z', p2[2], (v) => setP2([p2[0], p2[1], v]), BLUE)}
          </div>
        </div>
        <div className="rounded-xl border border-emerald-400/20 bg-emerald-500/[0.04] p-4">
          <div className="font-display text-xs font-bold" style={{ color: GREEN }}>POINT P₃</div>
          <div className="mt-2 space-y-1">
            {axisSlider('x', p3[0], (v) => setP3([v, p3[1], p3[2]]), GREEN)}
            {axisSlider('y', p3[1], (v) => setP3([p3[0], v, p3[2]]), GREEN)}
            {axisSlider('z', p3[2], (v) => setP3([p3[0], p3[1], v]), GREEN)}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Triangle className="h-3.5 w-3.5 text-gold-400" /> normal n = (P₂−P₁)×(P₃−P₁)</span>
        <button onClick={() => setShowNormal(!showNormal)} className={btn(showNormal)}>show normal</button>
        <span className="text-[11px] text-surface-500">d = n·P₁ = {m.d.toFixed(2)}</span>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Triangle className="h-4 w-4" /> TWO VECTORS, ONE NORMAL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Any point X on the plane keeps (X−P₁) inside the span of u and v, so it must
            satisfy <span className="text-gold-300">n·(X−P₁) = 0</span> — that IS the plane
            equation, rearranged to n·x = d.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><ArrowUpRight className="h-4 w-4" /> CROSS = AREA TOO</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The same product does double duty: |u×v| is the parallelogram area, so the
            triangle is exactly <span className="text-gold-300">½|u×v|</span> — read it live
            in the HUD while you drag.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CircleSlash className="h-4 w-4" /> DEGENERATE GUARD</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Drag P₃ onto the P₁P₂ line: u×v → 0, area → 0, the plane formula divides by
            nothing — infinitely many planes contain a line. The sim catches it before the
            equation lies.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Three points always determine a plane.&quot; Not quite —
            <span className="text-white"> three NON-COLLINEAR points</span>. Make P₁, P₂, P₃
            collinear and watch |n| hit 0: then d = n·P₁ = 0 for every plane through them,
            and the &quot;equation&quot; 0 = 0 describes everything and nothing. Uniqueness
            lives or dies on u ∦ v.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Put all three points at z = 2: the equation becomes 0x + 0y + nz = d —
            the horizontal plane z = 2, and the normal points straight up.
            ② Make P₁ = (0,0,0), P₂ = (2,0,0), P₃ = (0,2,0): n = (0,0,4), d = 0 — the
            xy-plane itself, with the triangle of area ½·2·2 = 2 unit² in the HUD.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'The normal to the plane through P₁, P₂, P₃ is…', opts: ['(P₂−P₁)×(P₃−P₁)', '(P₂−P₁)+(P₃−P₁)', '(P₂−P₁)·(P₃−P₁)'], correct: 0 },
  { q: 'In the plane equation n·x = d, d equals…', opts: ['n·P₁ for any of the three points', '|n|²', '0 always'], correct: 0 },
  { q: 'Area of triangle P₁P₂P₃ in vector form?', opts: ['½|(P₂−P₁)×(P₃−P₁)|', '|P₂−P₁|·|P₃−P₁|', '½|(P₂−P₁)·(P₃−P₁)|'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on planes from points — no marks, no shame.</p>
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
