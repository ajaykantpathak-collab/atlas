'use client';

/**
 * C12_PhysicsPrismRefractionSim.tsx — 3D
 * Class 12 Physics — Ray Optics — Refraction Through a Prism
 * [3d-lab:c12-rayoptics-prism]
 *
 * WHY 3D: a prism refracts in a PLANE but lives in 3D — and the i–D curve
 * with its minimum is far easier to read when the actual ray bends in
 * front of you and the curve floats beside it.
 *
 * HONEST NUMERICS — the prism formula derived by hand:
 *   Geometry of the triangular path:  r₁ + r₂ = A (apex angle)
 *   Deviation at the two faces:       D = (i₁ + i₂) − (r₁ + r₂) = i₁ + i₂ − A
 *   At MINIMUM deviation, dD/di₁ = 0. Since i₂ = D + A − i₁ is antisymmetric
 *   under i₁ ↔ i₂, the minimum forces the symmetric path:
 *      r₁ = r₂ = A/2   and   i₁ = i₂ = (A + D_m)/2
 *   Snell at either face then gives the NCERT formula, evaluated live:
 *      n = sin((A + D_m)/2) / sin(A/2)
 *   Every ray in the scene is traced with the VECTOR form of Snell's law
 *   (GLSL refract rule), so total internal reflection emerges by itself
 *   when n·sin r₂ exceeds 1 — no special-casing.
 *
 * Controls: apex angle A, refractive index n, angle of incidence i,
 * ray-trace animation, i–D curve overlay, Reset.
 */

import React, { useMemo, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Line, Grid, Text } from '@react-three/drei';
import * as THREE from 'three';
import { Ruler, RotateCcw, Sparkles, Triangle } from 'lucide-react';

const DEG = Math.PI / 180;

// ─────────────────────────────────────────────────────────────
// Ray optics — vector Snell (refract) + prism analytics
// ─────────────────────────────────────────────────────────────

/** GLSL-style refract: returns null on total internal reflection */
function refract(d: THREE.Vector2, n: THREE.Vector2, eta: number): THREE.Vector2 | null {
  const cosi = -d.dot(n);
  const k = 1 - eta * eta * (1 - cosi * cosi);
  if (k < 0) return null; // TIR
  return d.multiplyScalar(eta).add(n.multiplyScalar(eta * cosi - Math.sqrt(k))).normalize();
}

interface TraceResult {
  hit1: THREE.Vector2; hit2: THREE.Vector2;
  dIn: THREE.Vector2; dMid: THREE.Vector2 | null; dOut: THREE.Vector2 | null;
  reflDir: THREE.Vector2 | null;  // internal reflection direction when TIR
  tir: boolean;
  D: number; r1: number; r2: number; i2: number;
}

/** trace the ray through a triangular prism by real geometry + Snell */
function tracePrism(Adeg: number, ndeg: number, nIdx: number): TraceResult {
  const A = Adeg * DEG;
  const h = 3.2;                       // prism height (scene)
  const w = h / Math.tan(A);           // half-base for apex angle A
  const apex = new THREE.Vector2(0, h);
  const bl = new THREE.Vector2(-w, 0);
  const br = new THREE.Vector2(w, 0);

  // entry point on the LEFT face, 45% down from the apex
  const hit1 = apex.clone().lerp(bl, 0.45);
  // outward normal of left face (perpendicular to edge, away from centroid)
  const edgeL = bl.clone().sub(apex).normalize();
  let n1 = new THREE.Vector2(-edgeL.y, edgeL.x);
  const centroid = new THREE.Vector2(0, h / 3);
  if (n1.dot(hit1.clone().sub(centroid)) > 0) n1 = n1.clone().multiplyScalar(-1);

  // incident direction: angle i from the face normal, arriving from outside
  const iRad = ndeg * DEG;
  const dIn = n1.clone().multiplyScalar(-1).rotateAround(new THREE.Vector2(0, 0), -iRad).normalize();

  // refraction into the prism
  const dMid = refract(dIn.clone(), n1.clone(), 1 / nIdx);

  if (!dMid) {
    return { hit1, hit2: hit1, dIn, dMid: null, dOut: null, reflDir: null, tir: true, D: NaN, r1: NaN, r2: NaN, i2: NaN };
  }

  // intersect with the RIGHT face (apex→br)
  const edgeR = br.clone().sub(apex).normalize();
  let n2 = new THREE.Vector2(-edgeR.y, edgeR.x);
  if (n2.dot(apex.clone().sub(centroid)) > 0) n2 = n2.clone().multiplyScalar(-1);
  // solve apex + s·edgeR = hit1 + t·dMid
  const denom = -edgeR.x * dMid.y + edgeR.y * dMid.x;
  const s = ((hit1.x - apex.x) * dMid.y - (hit1.y - apex.y) * dMid.x) / denom;
  const hit2 = apex.clone().add(edgeR.clone().multiplyScalar(s));

  // exit refraction (eta = n, from inside); on TIR reflect about the face
  const dOut = refract(dMid.clone(), n2.clone().multiplyScalar(-1), nIdx);
  const n2in = n2.clone().multiplyScalar(-1);
  const reflDir = dOut ? null : dMid.clone().sub(n2in.clone().multiplyScalar(2 * dMid.dot(n2in))).normalize();

  // analytics for the HUD (2D angles via dot products)
  const angleBetween = (u: THREE.Vector2, v: THREE.Vector2) =>
    Math.acos(Math.min(1, Math.max(-1, u.dot(v)))) / DEG;
  const r1 = angleBetween(dMid, n1);
  const r2 = angleBetween(dMid.clone().multiplyScalar(-1), n2);
  const i2 = dOut ? angleBetween(dOut, n2) : NaN;
  const D = dOut ? angleBetween(dIn, dOut) : NaN;

  return { hit1, hit2, dIn, dMid, dOut, reflDir, tir: !dOut, D, r1, r2, i2 };
}

// ─────────────────────────────────────────────────────────────
// 3D pieces
// ─────────────────────────────────────────────────────────────

function PrismBody({ Adeg, nIdx }: { Adeg: number; nIdx: number }) {
  const A = Adeg * DEG;
  const h = 3.2;
  const w = h / Math.tan(A);
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, h);
    s.lineTo(-w, 0);
    s.lineTo(w, 0);
    s.closePath();
    return s;
  }, [w, h]);
  const col = nIdx < 1.45 ? '#86efac' : nIdx < 1.6 ? '#93c5fd' : '#f0abfc';
  return (
    <group>
      <mesh position={[0, 0, -0.9]}>
        <extrudeGeometry args={[shape, { depth: 1.8, bevelEnabled: false }]} />
        <meshPhysicalMaterial
          color={col} transparent opacity={0.32} roughness={0.05} metalness={0}
          transmission={0.6} thickness={1.2} depthWrite={false}
        />
      </mesh>
      {/* prism edges: front triangle, back triangle, base rails */}
      <Line points={apexEdgePts(h, w, 0.9)} color="rgba(148,163,184,0.7)" lineWidth={1.2} />
      <Line points={apexEdgePts(h, w, -0.9)} color="rgba(148,163,184,0.5)" lineWidth={1.2} />
      <Line points={[[-w, 0, 0.9], [-w, 0, -0.9]]} color="rgba(148,163,184,0.4)" lineWidth={1} />
      <Line points={[[w, 0, 0.9], [w, 0, -0.9]]} color="rgba(148,163,184,0.4)" lineWidth={1} />
      <Text position={[0, h + 0.35, 0]} fontSize={0.3} color="#fbbf24">A = {Adeg}°</Text>
    </group>
  );
}

function apexEdgePts(h: number, w: number, z: number): [number, number, number][] {
  return [[0, h, z], [-w, 0, z], [w, 0, z], [0, h, z]];
}

// ─────────────────────────────────────────────────────────────
// The sim
// ─────────────────────────────────────────────────────────────

export default function C12_PhysicsPrismRefractionSim() {
  const [Adeg, setAdeg] = useState(60);
  const [nIdx, setNIdx] = useState(1.5);
  const [iDeg, setIDeg] = useState(45);
  const [showCurve, setShowCurve] = useState(true);
  const [spin, setSpin] = useState(false);
  const [quiz, setQuiz] = useState<{ q: string; opts: string[]; correct: number; picked: number | null } | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);

  const res = tracePrism(Adeg, iDeg, nIdx);

  // minimum-deviation analytics: n = sin((A+Dm)/2)/sin(A/2) → invert for Dm
  const Dm = 2 * Math.asin(nIdx * Math.sin((Adeg * DEG) / 2)) - Adeg * DEG;

  // the i–D curve: sweep i, keep only paths that exit (no TIR)
  const curvePts = useMemo(() => {
    const pts: [number, number, number][] = [];
    for (let i = 1; i <= 89; i += 1) {
      const r = tracePrism(Adeg, i, nIdx);
      if (!r.tir && isFinite(r.D)) {
        pts.push([-3 + (i / 90) * 6, 4.2 + (r.D / 120) * 3.4, 2.6]);
      }
    }
    return pts;
  }, [Adeg, nIdx]);

  const QUIZ: { q: string; opts: string[]; correct: number }[] = [
    { q: 'At minimum deviation the ray inside the prism travels', opts: ['parallel to the base (r₁ = r₂ = A/2)', 'along the apex', 'in a circle'], correct: 0 },
    { q: 'Increasing n (denser glass) at fixed A makes the deviation', opts: ['larger', 'smaller', 'unchanged'], correct: 0 },
    { q: 'The ray fails to exit (total internal reflection) when', opts: ['n·sin r₂ > 1', 'i < 45°', 'A < 60°'], correct: 0 },
  ];
  useEffect(() => { setQuiz(null); }, [Adeg]);

  const startQuiz = () => { setQuizIdx(0); setQuiz({ ...QUIZ[0], picked: null }); };
  const answer = (i: number) => { if (quiz) setQuiz({ ...quiz, picked: i }); };
  const nextQ = () => {
    const n = quizIdx + 1;
    if (n < QUIZ.length) { setQuizIdx(n); setQuiz({ ...QUIZ[n], picked: null }); }
    else setQuiz(null);
  };

  const reset = () => { setAdeg(60); setNIdx(1.5); setIDeg(45); setShowCurve(true); setSpin(false); setQuiz(null); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;

  const v = (p: THREE.Vector2, z = 0): [number, number, number] => [p.x, p.y, z];
  const extend = (p: THREE.Vector2, d: THREE.Vector2, len: number): [number, number, number] =>
    v(p.clone().add(d.clone().multiplyScalar(len)));

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [1, 3, 13], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[10, 14, 8]} intensity={0.8} color="#ffe9b8" />
          <Grid args={[50, 50]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.10)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.2)"
            fadeDistance={70} fadeStrength={1.4} infiniteGrid position={[0, -2, 0]} />
          <group>
            <PrismBody Adeg={Adeg} nIdx={nIdx} />

            {/* the traced ray */}
            <Line points={[extend(res.hit1, res.dIn.clone().multiplyScalar(-1), 6), v(res.hit1)]}
              color="#fbbf24" lineWidth={2.5} />
            {!res.tir && res.dMid && (
              <Line points={[v(res.hit1), v(res.hit2)]} color="#f8fafc" lineWidth={2} />
            )}
            {res.tir && res.dMid && (
              <Line points={[v(res.hit1), v(res.hit2)]} color="#f87171" lineWidth={2} />
            )}
            {!res.tir && res.dOut ? (
              <Line points={[v(res.hit2), extend(res.hit2, res.dOut, 6)]} color="#60a5fa" lineWidth={2.5} />
            ) : res.tir && res.reflDir ? (
              <Line points={[v(res.hit2), extend(res.hit2, res.reflDir, 5)]} color="#f87171" lineWidth={2} dashed dashSize={0.25} gapSize={0.18} />
            ) : null}
            {res.tir && (
              <Text position={[0, -1.4, 0]} fontSize={0.36} color="#f87171">TOTAL INTERNAL REFLECTION — no exit ray</Text>
            )}

            {/* i–D curve floating above with the operating point */}
            {showCurve && curvePts.length > 2 && (
              <group>
                <Line points={curvePts} color="rgba(148,197,255,0.6)" lineWidth={1.5} />
                {!res.tir && isFinite(res.D) && (
                  <mesh position={[-3 + (iDeg / 90) * 6, 4.2 + (Math.max(0, res.D) / 120) * 3.4, 2.6]}>
                    <sphereGeometry args={[0.1, 14, 14]} />
                    <meshBasicMaterial color="#fbbf24" />
                  </mesh>
                )}
                <Text position={[0, 5.4, 2.6]} fontSize={0.26} color="#94a3b8">i–D curve (D in degrees up)</Text>
              </group>
            )}
          </group>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} maxPolarAngle={Math.PI / 2.02} target={[0, 1.5, 0]} />
        </Canvas>

        {/* live HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[252px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Prism ray trace — live Snell</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            <div className="flex justify-between"><span className="text-surface-500">apex angle A</span><span className="text-white">{Adeg}°</span></div>
            <div className="flex justify-between"><span className="text-surface-500">index n</span><span className="text-white">{nIdx.toFixed(2)}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">incidence i₁</span><span className="text-white">{iDeg}°</span></div>
            <div className="flex justify-between"><span className="text-surface-500">refraction r₁ (Snell)</span><span className="text-gold-300">{isFinite(res.r1) ? `${res.r1.toFixed(1)}°` : '—'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">r₂ = A − r₁</span><span className="text-gold-300">{isFinite(res.r2) ? `${res.r2.toFixed(1)}°` : '—'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">exit i₂</span><span className={res.tir ? 'text-rose-300' : 'text-gold-300'}>{isFinite(res.i2) ? `${res.i2.toFixed(1)}°` : 'TIR'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">deviation D = i₁+i₂−A</span><span className="text-gold-300">{isFinite(res.D) ? `${res.D.toFixed(1)}°` : '—'}</span></div>
            <div className="flex justify-between"><span className="text-surface-500">D_min (formula)</span><span className="text-white">{((Dm * 180) / Math.PI).toFixed(1)}° at i = {((Adeg + (Dm * 180) / Math.PI) / 2).toFixed(1)}°</span></div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Slide i: the gold dot rides the i–D curve to its minimum — the prism formula lives there
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Triangle className="h-3.5 w-3.5 text-gold-400" /> A:</span>
        <input type="range" min={30} max={80} step={1} value={Adeg} onChange={(e) => setAdeg(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{Adeg}°</span>
        <span className="ml-2 flex items-center gap-1.5 text-xs text-surface-400"><Ruler className="h-3.5 w-3.5 text-gold-400" /> n:</span>
        <input type="range" min={1.2} max={1.9} step={0.01} value={nIdx} onChange={(e) => setNIdx(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{nIdx.toFixed(2)}</span>
        <span className="ml-2 text-xs text-surface-400">i₁:</span>
        <input type="range" min={0} max={89} step={1} value={iDeg} onChange={(e) => setIDeg(Number(e.target.value))} className="h-11 w-40 accent-amber-400" />
        <span className="text-xs text-white">{iDeg}°</span>
        <button onClick={() => setShowCurve(!showCurve)} className={btn(showCurve)}>i–D curve</button>
        <button onClick={() => setIDeg(Math.round((Adeg + (Dm * 180) / Math.PI) / 2))} className={btn(false)}>snap to D_min</button>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin view</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── three idea cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">1 · TWICE-REFRACTED PATH</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The ray bends TOWARD the normal entering (air→glass) and AWAY leaving
            (glass→air), but because the two faces are not parallel, the two bends no
            longer cancel: the ray deviates by D = i₁ + i₂ − A, always toward the base.
            Every angle in the HUD comes from the vector Snell trace, re-solved per slide.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">2 · THE MINIMUM IS SYMMETRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            D(i₁) is antisymmetric under swapping the faces, so its minimum sits at the
            symmetric path: r₁ = r₂ = A/2, i₁ = i₂. Snell then hands over
            n = sin((A+D_m)/2)/sin(A/2) — THE practical way to measure refractive index
            with a spectrometer. Hit &quot;snap to D_min&quot; and watch the curve flatten.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="font-display text-xs font-bold text-gold-300">3 · TIR IS A SPILLOVER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Exiting needs sin i₂ = n·sin r₂ ≤ 1. Steepen the apex A or raise n and r₂
            grows until n·sin r₂ crosses 1 — the exit refract() returns no solution and
            the ray reflects internally (the red dashed ray). Prisms in binoculars use
            exactly this: 45° &gt; critical angle for glass.
          </p>
        </div>
      </div>

      {/* ── misconception + challenge ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;A prism separates colours because it adds energy / slows light
            permanently.&quot; No — the prism bends violet more than red because n
            depends on <span className="text-white">wavelength (dispersion)</span>; the
            light leaves with the same frequencies it entered. And a &quot;deviation of
            60°&quot; does not mean the ray lost speed inside — speed returns to c in air
            the instant it exits; only the PATH remembers the detour.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set n = 1.50, A = 60°, slide i until D reads its minimum ≈ 37°: feed back
            n = sin((60+37.2)/2)/sin30° ≈ 1.50 — the formula recovers the input. That
            self-consistency is the whole spectrometer practical.
            ② Raise A to 75° at n = 1.5 and sweep i: TIR appears at high i. Find the
            smallest A where the ray cannot exit at all for any i.
          </p>
        </div>
      </div>

      {/* ── quiz ── */}
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        {!quiz ? (
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="font-display text-sm font-bold text-white">Check yourself</div>
              <p className="text-xs text-surface-400">3 quick prism questions — no marks, no shame.</p>
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
