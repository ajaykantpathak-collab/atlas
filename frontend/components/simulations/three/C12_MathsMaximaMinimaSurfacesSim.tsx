'use client';

/**
 * C12_MathsMaximaMinimaSurfacesSim.tsx — 3D
 * Class 12 Maths — Application of Derivatives: maxima, minima & saddle
 * points on a surface z = f(x, y)
 *
 * WHY 3D: "saddle point" is a 3D animal. Along x the origin of z = x²−y²
 * looks like a minimum, along y a maximum — no flat picture shows both
 * at once.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Tangent plane at (x₀,y₀) from the first-order Taylor expansion
 *      f(x₀+Δx, y₀+Δy) = f₀ + f_x·Δx + f_y·Δy + (higher order)
 *  ⇒  tangent plane:  z = f₀ + f_x(x−x₀) + f_y(y−y₀)
 *  Gradient ∇f = (f_x, f_y) points UPHILL. Steepest-ascent direction IN
 *  the tangent plane is (f_x, f_y, |∇f|²): check with plane normal
 *  (−f_x, −f_y, 1):  −f_x² −f_y² + |∇f|² = 0 ✓  (it lies in the plane)
 *  Second-derivative test at a critical point (∇f = 0):
 *      D = f_xx·f_yy − (f_xy)²
 *      D > 0, f_xx > 0 → local MINIMUM      (bowl in every direction)
 *      D > 0, f_xx < 0 → local MAXIMUM
 *      D < 0           → SADDLE (curvature signs disagree)
 *  (Derived exactly like the 1D sign-chart: expand f along a line
 *   (x₀+t, y₀+st) and demand the t² coefficient f_xx + 2s·f_xy + s²f_yy
 *   keep one sign for ALL slopes s ⇔ discriminant (2f_xy)² − 4f_xx f_yy < 0.)
 *
 * Partials are analytic per preset — no finite differences.
 */

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Mountain, TrendingUp, RotateCcw, Sparkles, Split } from 'lucide-react';

const GOLD = '#fbbf24';
const ROSE = '#fb7185';
const CYAN = '#38bdf8';
const GREEN = '#34d399';

type Preset = {
  key: string; name: string;
  f: (x: number, y: number) => number;
  fx: (x: number, y: number) => number;
  fy: (x: number, y: number) => number;
  fxx: (x: number, y: number) => number;
  fyy: (x: number, y: number) => number;
  fxy: (x: number, y: number) => number;
  zScale: number;
  criticals: string;
};

const PRESETS: Preset[] = [
  { key: 'bowl', name: 'bowl  x²+y²', zScale: 0.32,
    f: (x, y) => x * x + y * y,
    fx: (x) => 2 * x, fy: (_x, y) => 2 * y,
    fxx: () => 2, fyy: () => 2, fxy: () => 0,
    criticals: 'one minimum at (0, 0)' },
  { key: 'saddle', name: 'saddle  x²−y²', zScale: 0.55,
    f: (x, y) => x * x - y * y,
    fx: (x) => 2 * x, fy: (_x, y) => -2 * y,
    fxx: () => 2, fyy: () => -2, fxy: () => 0,
    criticals: 'one saddle at (0, 0)' },
  { key: 'double', name: 'twin wells  x⁴+y⁴−4x²−2y²', zScale: 0.22,
    f: (x, y) => x ** 4 + y ** 4 - 4 * x * x - 2 * y * y,
    fx: (x) => 4 * x ** 3 - 8 * x, fy: (_x, y) => 4 * y ** 3 - 4 * y,
    fxx: (x) => 12 * x * x - 8, fyy: (y) => 12 * y * y - 4, fxy: () => 0,
    criticals: 'minima at (±√2, ±1), saddle at (0, 0)' },
  { key: 'monkey', name: 'monkey  x³−3xy²', zScale: 0.3,
    f: (x, y) => x ** 3 - 3 * x * y * y,
    fx: (x, y) => 3 * x * x - 3 * y * y, fy: (x, y) => -6 * x * y,
    fxx: (x) => 6 * x, fyy: () => 0, fxy: (_x, y) => -6 * y,
    criticals: 'degenerate (monkey) saddle at (0, 0)' },
];

const D = 3;      // domain ±3
const ZC = 6;     // draw clamp
const N = 60;     // grid resolution

function SurfaceMesh({ preset, spin }: { preset: Preset; spin: boolean }) {
  const grp = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (grp.current && spin) grp.current.rotation.y += delta * 0.12; });
  const geo = useMemo(() => {
    const positions: number[] = [];
    const colors: number[] = [];
    const indices: number[] = [];
    const cLow = new THREE.Color('#3b82f6');
    const cMid = new THREE.Color('#a78bfa');
    const cHigh = new THREE.Color('#fbbf24');
    const tmp = new THREE.Color();
    for (let i = 0; i <= N; i++) {
      for (let j = 0; j <= N; j++) {
        const x = -D + (2 * D * i) / N;
        const y = -D + (2 * D * j) / N;
        const z = Math.max(-ZC, Math.min(ZC, preset.f(x, y) * preset.zScale));
        positions.push(x, z, y);
        const t = (z + ZC) / (2 * ZC);
        if (t < 0.5) tmp.copy(cLow).lerp(cMid, t * 2);
        else tmp.copy(cMid).lerp(cHigh, (t - 0.5) * 2);
        colors.push(tmp.r, tmp.g, tmp.b);
      }
    }
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < N; j++) {
        const a = i * (N + 1) + j, b = a + N + 1;
        indices.push(a, b, a + 1, b, b + 1, a + 1);
      }
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    g.setIndex(indices);
    g.computeVertexNormals();
    return g;
  }, [preset]);
  return (
    <group ref={grp}>
      <mesh geometry={geo}>
        <meshStandardMaterial vertexColors side={THREE.DoubleSide}
          metalness={0.2} roughness={0.55} transparent opacity={0.94} />
      </mesh>
      {/* wire outline for readability */}
      <lineSegments>
        <wireframeGeometry args={[geo]} />
        <lineBasicMaterial color="rgba(255,255,255,0.05)" transparent opacity={0.25} />
      </lineSegments>
    </group>
  );
}

/** probe ball + tangent plane + steepest-ascent arrow, all computed live */
function Probe({ preset, x0, y0 }: { preset: Preset; x0: number; y0: number }) {
  const s = preset.zScale;
  const f0 = preset.f(x0, y0);
  const gx = preset.fx(x0, y0);
  const gy = preset.fy(x0, y0);
  const g2 = gx * gx + gy * gy;
  // steepest-ascent tangent direction (fx, fy, |∇f|²) — see derivation
  const dirLen = Math.sqrt(g2 + g2 * g2);
  const dir: [number, number, number] = g2 > 1e-6
    ? [(gx * 1.4) / dirLen, (g2 * 1.4) / dirLen, (gy * 1.4) / dirLen]
    : [0, 0, 0];
  // tangent-plane patch corners: z = f0 + fx(x−x0) + fy(y−y0)
  const R = 1.5;
  const px = (dx: number, dy: number) => {
    const X = x0 + dx, Y = y0 + dy;
    const z = Math.max(-ZC - 2, Math.min(ZC + 2, (f0 + gx * dx / s + gy * dy / s) * s));
    return [X, Math.max(-ZC, Math.min(ZC, z)), Y] as [number, number, number];
  };
  const cs = [px(-R, -R), px(R, -R), px(R, R), px(-R, R)];
  const verts = new Float32Array([...cs[0], ...cs[1], ...cs[2], ...cs[0], ...cs[2], ...cs[3]]);
  const z0 = Math.max(-ZC, Math.min(ZC, f0 * s));
  return (
    <group>
      <mesh>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[verts, 3]} />
        </bufferGeometry>
        <meshBasicMaterial color={GOLD} transparent opacity={0.32} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[x0, z0, y0]}>
        <sphereGeometry args={[0.16, 24, 24]} />
        <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.6} />
      </mesh>
      {/* drop line to the floor */}
      <Line points={[[x0, z0, y0], [x0, -ZC, y0]]} color="rgba(251,113,133,0.4)" lineWidth={1.2} dashed dashSize={0.18} gapSize={0.12} />
      {/* uphill arrow hugging the surface */}
      {g2 > 1e-4 && (
        <Line points={[[x0, z0, y0], [x0 + dir[0], z0 + dir[1], y0 + dir[2]]]} color={GREEN} lineWidth={3} />
      )}
      <Text position={[x0, z0 + 0.5, y0]} fontSize={0.26} color={ROSE}>z = {f0.toFixed(2)}</Text>
    </group>
  );
}

export default function C12_MathsMaximaMinimaSurfacesSim() {
  const [pi, setPi] = useState(1);
  const preset = PRESETS[pi];
  const [x0, setX0] = useState(0);
  const [y0, setY0] = useState(0);
  const [spin, setSpin] = useState(false);

  const m = useMemo(() => {
    const f0 = preset.f(x0, y0);
    const gx = preset.fx(x0, y0);
    const gy = preset.fy(x0, y0);
    const g = Math.hypot(gx, gy);
    const fxx = preset.fxx(x0, y0);
    const fyy = preset.fyy(x0, y0);
    const fxy = preset.fxy(x0, y0);
    const Dv = fxx * fyy - fxy * fxy;
    let cls = 'not a critical point';
    if (g < 0.12) {
      if (Dv > 1e-6) cls = fxx > 0 ? 'LOCAL MINIMUM' : 'LOCAL MAXIMUM';
      else if (Dv < -1e-6) cls = 'SADDLE POINT';
      else cls = 'degenerate — test inconclusive';
    }
    return { f0, gx, gy, g, fxx, fyy, fxy, Dv, cls };
  }, [preset, x0, y0]);

  const reset = () => { setPi(1); setX0(0); setY0(0); setSpin(false); };
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
        <Canvas camera={{ position: [8.5, 7, 10], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[8, 12, 6]} intensity={0.85} color="#ffe9b8" />
          <directionalLight position={[-10, 6, -8]} intensity={0.4} color="#7dd3fc" />
          <Grid args={[24, 24]} cellSize={1} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.08)" sectionSize={5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.18)"
            fadeDistance={55} fadeStrength={1.2} />
          <SurfaceMesh preset={preset} spin={spin} />
          <Probe preset={preset} x0={x0} y0={y0} />
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={32} target={[0, 0, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[272px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Surface probe — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('(x₀, y₀)', `(${x0.toFixed(2)}, ${y0.toFixed(2)})`)}
            {row('f(x₀, y₀)', m.f0.toFixed(3), 'text-gold-300')}
            {row('f_x, f_y', `${m.gx.toFixed(2)}, ${m.gy.toFixed(2)}`)}
            {row('|∇f| (0 ⇒ flat)', m.g.toFixed(3))}
            {row('f_xx, f_yy, f_xy', `${m.fxx.toFixed(1)}, ${m.fyy.toFixed(1)}, ${m.fxy.toFixed(1)}`)}
            {row('D = f_xx·f_yy − f_xy²', m.Dv.toFixed(2))}
            <div className="flex items-center justify-between border-t border-white/10 pt-1">
              <span className="text-surface-500">verdict</span>
              <span className="font-display text-[11px] font-bold" style={{
                color: m.cls.includes('MIN') ? CYAN : m.cls.includes('MAX') ? GREEN
                  : m.cls.includes('SADDLE') ? ROSE : '#94a3b8',
              }}>{m.cls.toUpperCase()}</span>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Gold patch = tangent plane · green arrow = steepest uphill direction
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Mountain className="h-3.5 w-3.5 text-gold-400" /> surface:</span>
        {PRESETS.map((p, i) => (
          <button key={p.key} onClick={() => setPi(i)} className={btn(pi === i)}>{p.name}</button>
        ))}
        <span className="ml-2 text-xs text-surface-400">x₀:</span>
        <input type="range" min={-D} max={D} step={0.05} value={x0}
          onChange={(e) => setX0(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{x0.toFixed(2)}</span>
        <span className="text-xs text-surface-400">y₀:</span>
        <input type="range" min={-D} max={D} step={0.05} value={y0}
          onChange={(e) => setY0(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{y0.toFixed(2)}</span>
        <button onClick={() => setSpin(!spin)} className={btn(spin)}>spin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><TrendingUp className="h-4 w-4" /> THE TANGENT PLANE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            z = f₀ + f_x(x−x₀) + f_y(y−y₀) is the first-order Taylor cut — the flat
            &quot;best guess&quot; of the surface. Park the probe on a green uphill arrow
            and see the patch tilt to kiss the surface exactly there.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Split className="h-4 w-4" /> GRADIENT = UPHILL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ∇f = (f_x, f_y) always points up the steepest slope — the green arrow hugs the
            surface along (f_x, f_y, |∇f|²). Where ∇f = 0 every direction is flat:
            that&apos;s a critical point, max / min or saddle.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Mountain className="h-4 w-4" /> THE D-TEST</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            D = f_xx·f_yy − f_xy² asks if curvature agrees along every slope. D &gt; 0:
            one consensus (min if f_xx &gt; 0, max if f_xx &lt; 0). D &lt; 0: the x-curve and
            y-curve disagree → <span className="text-white">saddle</span>.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;If f_x = f_y = 0 it&apos;s a maximum or minimum.&quot; No —
            <span className="text-white"> the saddle x²−y² has both partials zero at the
            origin yet is neither</span>: slide along x you&apos;re at a min, along y at a max.
            You NEED the D-test. Set the saddle preset, park at (0,0), read D = −4.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Twin wells: hunt all FIVE critical points by driving |∇f| under 0.12 —
            four minima at (±1.41, ±1) and the central saddle; check each verdict against D.
            ② Monkey saddle at (0,0): D = 0 — the test goes silent, proving the 1D-style
            sign chart has limits even in 2 variables.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'At a critical point, D < 0 means…', opts: ['saddle point', 'local minimum', 'local maximum'], correct: 0 },
  { q: 'The gradient ∇f at a point points…', opts: ['steepest uphill', 'steepest downhill', 'along the x-axis'], correct: 0 },
  { q: 'D > 0 and f_xx > 0 at a critical point gives…', opts: ['local minimum', 'saddle', 'inflection'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on surface extrema — no marks, no shame.</p>
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
