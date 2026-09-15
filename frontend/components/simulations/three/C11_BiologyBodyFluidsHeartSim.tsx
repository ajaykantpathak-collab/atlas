'use client';

/**
 * C11_BiologyBodyFluidsHeartSim.tsx — 3D
 * Class 11 Biology — Body Fluids and Circulation: chambers & double flow
 *
 * WHY 3D: the heart is a plumbing junction where blue and red blood NEVER
 * mix, in three dimensions. Orbiting the four chambers with their inflows
 * and outflows makes the double-circulation argument physically obvious.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Cardiac output (definition of the pump):
 *      CO = SV × HR        e.g. 70 mL × 72 bpm = 5.04 L/min ✓
 *  Ejection fraction (how much of the filled blood leaves):
 *      EF = SV / EDV × 100%    (healthy ≈ 55–70%)
 *  Mean arterial pressure — the circuit is an Ohm's-law loop
 *  (Q = ΔP/R ⇒ ΔP = Q·R):
 *      MAP ≈ CO × TPR      (CO in L/min, TPR in mmHg·min/L)
 *      e.g. 5.04 × 18 ≈ 91 mmHg ✓ normal
 *  Pulse interval:  T = 60/HR  s — halve the beat, double the filling
 *  time. All four readouts update from the same three sliders.
 */

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { HeartPulse, Activity, RotateCcw, Sparkles, Droplets } from 'lucide-react';

const GOLD = '#fbbf24';
const BLUE = '#60a5fa';   // deoxygenated
const RED = '#fb7185';    // oxygenated
const GREEN = '#34d399';

/** the whole heart beats at the slider rate — one shared clock */
function BeatingHeart({ hr, sv, children }: { hr: number; sv: number; children: React.ReactNode }) {
  const grp = useRef<THREE.Group>(null);
  const acc = useRef(0);
  useFrame((_, delta) => {
    acc.current += delta;
    const period = 60 / hr;
    const phase = (acc.current % period) / period;         // 0..1
    const kick = Math.exp(-Math.pow((phase - 0.08) / 0.06, 2)); // systole spike
    if (grp.current) {
      const s = 1 + kick * 0.06 * (sv / 70);
      grp.current.scale.set(s, s, s);
    }
  });
  return <group ref={grp}>{children}</group>;
}

/** blood particle on a fixed path; speed scales with cardiac output */
function Particle({ path, color, offset, speed }: {
  path: [number, number, number][]; color: string; offset: number; speed: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new THREE.CatmullRomCurve3(path.map((p) => new THREE.Vector3(...p))), [path]);
  const u = useRef(offset);
  useFrame((_, delta) => {
    u.current = (u.current + delta * speed) % 1;
    if (mesh.current) {
      const p = curve.getPoint(u.current);
      mesh.current.position.copy(p);
    }
  });
  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[0.14, 10, 10]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function C11_BiologyBodyFluidsHeartSim() {
  const [hr, setHr] = useState(72);       // beats per minute
  const [sv, setSv] = useState(70);       // stroke volume mL
  const [edv, setEdv] = useState(110);    // end-diastolic volume mL
  const [tpr, setTpr] = useState(18);     // total peripheral resistance mmHg·min/L

  // ── live numerics ──
  const m = useMemo(() => {
    const co = (sv * hr) / 1000;          // L/min
    const ef = (sv / edv) * 100;          // %
    const map = co * tpr;                 // mmHg
    const period = 60 / hr;               // s per beat
    return { co, ef, map, period };
  }, [hr, sv, edv, tpr]);

  const reset = () => { setHr(72); setSv(70); setEdv(110); setTpr(18); };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  const speed = m.co / 5; // particle speed scaled to cardiac output

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [0, 2, 13], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 8]} intensity={0.85} color="#ffe9b8" />
          <directionalLight position={[-8, -4, -6]} intensity={0.3} color="#7dd3fc" />
          <BeatingHeart hr={hr} sv={sv}>
            {/* right side (blue): RA → RV */}
            <mesh position={[-2.2, 1.4, 0]}>
              <sphereGeometry args={[1.15, 26, 26]} />
              <meshStandardMaterial color={BLUE} transparent opacity={0.72} emissive={BLUE} emissiveIntensity={0.15} />
            </mesh>
            <mesh position={[-1.6, -1.1, 0]}>
              <sphereGeometry args={[1.35, 26, 26]} />
              <meshStandardMaterial color={BLUE} transparent opacity={0.72} emissive={BLUE} emissiveIntensity={0.15} />
            </mesh>
            {/* left side (red): LA → LV (thicker wall) */}
            <mesh position={[2.2, 1.6, 0]}>
              <sphereGeometry args={[1.05, 26, 26]} />
              <meshStandardMaterial color={RED} transparent opacity={0.72} emissive={RED} emissiveIntensity={0.15} />
            </mesh>
            <mesh position={[1.6, -1.0, 0]}>
              <sphereGeometry args={[1.5, 26, 26]} />
              <meshStandardMaterial color={RED} transparent opacity={0.75} emissive={RED} emissiveIntensity={0.18} />
            </mesh>
            {/* vessels: venae cavae, pulmonary artery, pulmonary veins, aorta */}
            <mesh position={[-2.6, 3, 0]}>
              <cylinderGeometry args={[0.34, 0.34, 2.6, 14]} />
              <meshStandardMaterial color={BLUE} transparent opacity={0.55} />
            </mesh>
            <mesh position={[-2.3, -3.2, 0]}>
              <cylinderGeometry args={[0.34, 0.34, 2.6, 14]} />
              <meshStandardMaterial color={BLUE} transparent opacity={0.55} />
            </mesh>
            <mesh position={[-2.1, 2.6, 1]} rotation={[0.5, 0, 0.3]}>
              <cylinderGeometry args={[0.38, 0.38, 3, 14]} />
              <meshStandardMaterial color="#818cf8" transparent opacity={0.55} />
            </mesh>
            <mesh position={[2.4, 3.1, 0]} rotation={[0, 0, -0.22]}>
              <cylinderGeometry args={[0.42, 0.42, 3.4, 14]} />
              <meshStandardMaterial color={RED} transparent opacity={0.6} />
            </mesh>
            <mesh position={[3.1, 2.2, -0.8]} rotation={[0.6, 0, 0.4]}>
              <cylinderGeometry args={[0.24, 0.24, 2, 12]} />
              <meshStandardMaterial color={RED} transparent opacity={0.5} />
            </mesh>
            {/* chamber labels */}
            <Text position={[-2.2, 2.9, 1.3]} fontSize={0.5} color={BLUE}>RA</Text>
            <Text position={[-2.8, -1.1, 1.3]} fontSize={0.5} color={BLUE}>RV</Text>
            <Text position={[2.3, 3.1, 1.2]} fontSize={0.5} color={RED}>LA</Text>
            <Text position={[2.6, -1.0, 1.6]} fontSize={0.5} color={RED}>LV</Text>
            <Text position={[-3.6, 4.6, 0]} fontSize={0.4} color={BLUE}>venae cavae</Text>
            <Text position={[-2.1, 4.6, 1.9]} fontSize={0.38} color="#818cf8">pulmonary artery →</Text>
            <Text position={[3.7, 5.2, 0]} fontSize={0.4} color={RED}>aorta → body</Text>
            {/* septum */}
            <Line points={[[0, 3.2, 0], [0, -2.8, 0]]} color="rgba(255,255,255,0.35)" lineWidth={2} />
            <Text position={[0, 3.9, 0]} fontSize={0.38} color="#cbd5e1">septum — no mixing</Text>
          </BeatingHeart>
          {/* deoxygenated circuit: body → RA → RV → pulmonary artery */}
          {[0, 0.25, 0.5, 0.75].map((o, i) => (
            <Particle key={`b${i}`}
              path={[[-2.6, 4.8, 0], [-2.4, 3.4, 0], [-2.2, 1.6, 0], [-1.9, 0.3, 0], [-1.6, -1.4, 0], [-2.1, 2.4, 1.2], [-1.4, 4.2, 1.8]]}
              color={BLUE} offset={o} speed={0.10 * speed} />
          ))}
          {/* oxygenated circuit: lungs → LA → LV → aorta */}
          {[0, 0.25, 0.5, 0.75].map((o, i) => (
            <Particle key={`r${i}`}
              path={[[3.4, 3.4, -1.4], [2.8, 2.4, -0.6], [2.3, 1.8, 0], [2.0, 0.4, 0], [1.7, -1.2, 0], [2.5, 2.6, 0], [3.2, 5.4, 0]]}
              color={RED} offset={o} speed={0.10 * speed} />
          ))}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={5} maxDistance={26} target={[0, 0.5, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[268px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Pump &amp; circuit — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('HR', `${hr} bpm`)}
            {row('SV', `${sv} mL`)}
            {row('CO = SV × HR', `${m.co.toFixed(2)} L/min`, 'text-gold-300')}
            {row('EF = SV/EDV', `${m.ef.toFixed(0)} % (healthy 55–70)`, 'text-gold-300')}
            {row('MAP ≈ CO × TPR', `${m.map.toFixed(0)} mmHg (normal ≈ 90–100)`, 'text-gold-300')}
            {row('pulse interval 60/HR', `${m.period.toFixed(2)} s`)}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              blue = deoxygenated (right heart) · red = oxygenated (left heart)
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The heart pulses at the slider rate — particle speed scales with cardiac output
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><HeartPulse className="h-3.5 w-3.5 text-gold-400" /> HR:</span>
        <input type="range" min={40} max={180} step={2} value={hr}
          onChange={(e) => setHr(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{hr} bpm</span>
        <span className="text-xs text-surface-400">SV:</span>
        <input type="range" min={40} max={120} step={5} value={sv}
          onChange={(e) => setSv(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{sv} mL</span>
        <span className="text-xs text-surface-400">EDV:</span>
        <input type="range" min={80} max={150} step={5} value={edv}
          onChange={(e) => setEdv(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">{edv} mL</span>
        <span className="text-xs text-surface-400">TPR:</span>
        <input type="range" min={12} max={28} step={1} value={tpr}
          onChange={(e) => setTpr(Number(e.target.value))} className="h-11 w-24 accent-amber-400" />
        <span className="text-xs text-white">{tpr}</span>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Droplets className="h-3.5 w-3.5" /> DOUBLE CIRCULATION</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Right heart: body → lungs (blue). Left heart: lungs → body (red). Two pumps in
            series inside one organ — the septum guarantees zero mixing, which is why
            birds and mammals can power warm-blooded metabolisms.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Activity className="h-3.5 w-3.5" /> CO = SV × HR</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            70 mL × 72 beats = 5 L/min — your entire blood volume passes every minute.
            Exercise raises both terms: HR can triple, SV can grow ~1.5×, so CO reaches
            20–25 L/min. Watch the particles speed as you slide.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-3.5 w-3.5" /> THE OHM&apos;S LAW OF VESSELS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            MAP = CO × TPR is Q = ΔP/R rearranged: flow times resistance. Vasodilation
            (TPR ↓) with CO fixed drops pressure — exactly how BP medication works.
            Same three sliders, one cardiac ward.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Arteries carry oxygenated blood and veins deoxygenated.&quot; No —
            <span className="text-white"> arteries carry blood AWAY from the heart.</span>
            The pulmonary artery leaves the right ventricle carrying BLUE blood to the
            lungs; the pulmonary veins return RED. Watch the particle tracks: vessel
            colour follows oxygen, artery/vein follows direction. Different rules.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Set HR = 40 (athlete bradycardia), SV = 100: CO still reads 4.0 L/min —
            resting output is preserved by BIGGER STROKES, not faster beats.
            ② Push TPR to 28 at default CO: MAP reads ~141 mmHg — hypertension by
            arithmetic alone. Then drop SV to 50 and see EF fall below 40% —
            heart-failure territory, defined by a ratio.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'The pulmonary artery carries…', opts: ['deoxygenated blood from RV to lungs', 'oxygenated blood to the body', 'oxygenated blood from lungs to LA'], correct: 0 },
  { q: 'CO = 70 mL × 72 bpm equals…', opts: ['5.04 L/min', '50.4 L/min', '0.5 L/min'], correct: 0 },
  { q: 'MAP ≈ CO × TPR is the circulatory version of…', opts: ["Ohm's law (ΔP = Q·R)", "Newton's second law", "the ideal gas law"], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on circulation — no marks, no shame.</p>
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
