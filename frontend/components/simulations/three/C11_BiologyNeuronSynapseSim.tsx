'use client';

/**
 * C11_BiologyNeuronSynapseSim.tsx — 3D
 * Class 11 Biology — Neural Control and Coordination: the action potential
 * and the chemical synapse
 *
 * WHY 3D: a nerve impulse is a moving patch of reversed voltage, and a
 * synapse is a 20-nanometre CANYON chemicals must jump. Both are spatial;
 * both come alive when you can orbit them.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  Nernst equilibrium potential — at equilibrium the electrical work
 *  balances the osmotic work for ion z:
 *      zF·E = RT·ln([out]/[in])   ⇒   E = (RT/zF)·ln([out]/[in])
 *  At 37 °C (T = 310 K): RT/F = 8.314×310/96485 = 26.7 mV; dividing by
 *  ln 10 converts to decades:
 *      E = 61.5/z · log₁₀([out]/[in])  mV
 *  K⁺ with out = 5, in = 140 mM:  E = 61.5·log(5/140) ≈ −89 mV ✓
 *  Na⁺ with out = 145, in = 12:   E ≈ +67 mV  — the two battery voltages
 *  that power the action potential. Change concentrations, watch the
 *  battery re-charge itself arithmetically.
 *  Conduction speed (real values): unmyelinated ≈ 1 m/s, saltatory
 *  myelinated ≈ 120 m/s. Travel time over a 1 m nerve to the toe:
 *      t = d/v = 1 s vs 0.008 s — the myelin story in one division.
 */

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text, Tube } from '@react-three/drei';
import * as THREE from 'three';
import { Zap, BatteryCharging, RotateCcw, Sparkles, Timer } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const ROSE = '#fb7185';
const GREEN = '#34d399';

const R_T = 8.314 * 310;   // J/mol at 37 °C
const F_C = 96485;         // C/mol

/** AP pulse riding the axon at v_scene units/s */
function Impulse({ length, speed, active }: { length: number; speed: number; active: boolean }) {
  const ref = useRef<THREE.Group>(null);
  const acc = useRef(0);
  useFrame((_, delta) => {
    if (active) acc.current = (acc.current + delta * speed) % length;
    if (ref.current) ref.current.position.x = acc.current;
  });
  return (
    <group ref={ref} position={[0, 0, 0]}>
      <mesh>
        <sphereGeometry args={[0.32, 20, 20]} />
        <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={1.2} />
      </mesh>
      <pointLight color={GOLD} intensity={6} distance={3} />
    </group>
  );
}

export default function C11_BiologyNeuronSynapseSim() {
  const [ion, setIon] = useState<'K' | 'Na'>('K');
  const [out, setOut] = useState(5);     // mM
  const [inn, setInn] = useState(140);   // mM
  const [myelin, setMyelin] = useState(true);

  const m = useMemo(() => {
    const z = 1;
    const E = ((R_T / (z * F_C)) / Math.log(10)) * 1000 * Math.log10(out / Math.max(inn, 1e-6)); // mV
    const v = myelin ? 120 : 1;             // m/s conduction
    const travelMs = (1000 / v) * 1000;     // over 1 m, in ms
    return { E, v, travelMs };
  }, [out, inn, myelin]);

  const pickIon = (io: 'K' | 'Na') => {
    setIon(io);
    if (io === 'K') { setOut(5); setInn(140); } else { setOut(145); setInn(12); }
  };

  const reset = () => { pickIon('K'); setMyelin(true); };

  // axon path (gentle 3D curve from soma to terminal)
  const axonCurve = useMemo(() => new THREE.CatmullRomCurve3([
    new THREE.Vector3(-8, 0.5, 0), new THREE.Vector3(-4, 1.2, 0.8),
    new THREE.Vector3(0, -0.4, -0.6), new THREE.Vector3(4, 0.9, 0.5),
    new THREE.Vector3(7.4, 0.2, 0),
  ]), []);
  // myelin segments along the axon
  const sheaths = useMemo(() => [0.1, 0.28, 0.46, 0.64, 0.82].map((u) => {
    const p = axonCurve.getPoint(u);
    return p;
  }), [axonCurve]);

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
        <Canvas camera={{ position: [2, 5, 14], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[8, 12, 6]} intensity={0.85} color="#ffe9b8" />
          {/* soma */}
          <group position={[-9.4, 0.4, 0]}>
            <mesh>
              <sphereGeometry args={[1.5, 28, 28]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.5} transparent opacity={0.85} />
            </mesh>
            <mesh>
              <sphereGeometry args={[0.55, 20, 20]} />
              <meshStandardMaterial color={VIOLET_C} emissive={VIOLET_C} emissiveIntensity={0.5} />
            </mesh>
            <Text position={[0, 2.3, 0]} fontSize={0.42} color="#cbd5e1">cell body</Text>
            {/* dendrites */}
            {([[1.1, 1.1, 0.3], [1.0, -1.0, -0.3], [1.2, 0.2, -0.9]] as [number, number, number][]).map((d, i) => (
              <Line key={i} points={[[d[0] * 0.8, d[1] * 0.8, d[2] * 0.8], [d[0] * 2.4, d[1] * 2.4, d[2] * 2.4]]}
                color="rgba(148,163,184,0.8)" lineWidth={2.4} />
            ))}
          </group>
          {/* axon */}
          <Tube args={[axonCurve as unknown as THREE.Curve<THREE.Vector3>, 80, 0.22, 12]}>
            <meshStandardMaterial color="#64748b" roughness={0.45} />
          </Tube>
          {/* myelin sheath beads */}
          {myelin && sheaths.map((p, i) => (
            <mesh key={i} position={p}>
              <capsuleGeometry args={[0.42, 1.1, 8, 16]} />
              <meshStandardMaterial color="#e2e8f0" roughness={0.35} transparent opacity={0.8} />
            </mesh>
          ))}
          {myelin && <Text position={[sheaths[2].x, sheaths[2].y + 1.4, sheaths[2].z]} fontSize={0.4} color="#e2e8f0">myelin (saltatory jumps)</Text>}
          <Impulse length={14} speed={myelin ? 9 : 0.9} active />
          {/* synaptic terminal + cleft + postsynaptic membrane */}
          <group position={[9.2, 0.2, 0]}>
            <mesh rotation={[0, 0, -Math.PI / 2]}>
              <coneGeometry args={[0.9, 1.8, 20]} />
              <meshStandardMaterial color="#94a3b8" roughness={0.45} transparent opacity={0.85} />
            </mesh>
            {/* vesicles */}
            {[[-0.15, 0.5, 0.15], [0.2, 0.8, -0.1], [0.05, 0.35, -0.2], [0.35, 0.4, 0.2]].map((p, i) => (
              <mesh key={i} position={p as [number, number, number]}>
                <sphereGeometry args={[0.16, 14, 14]} />
                <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.4} />
              </mesh>
            ))}
            {/* synaptic cleft 20 nm */}
            <Line points={[[0.95, -0.9, 0], [0.95, 0.9, 0]]} color="rgba(251,191,36,0.6)" lineWidth={1.5} />
            <Line points={[[1.35, -0.9, 0], [1.35, 0.9, 0]]} color="rgba(251,191,36,0.6)" lineWidth={1.5} />
            <Text position={[1.15, 1.35, 0]} fontSize={0.32} color={GOLD}>cleft 20 nm</Text>
            {/* neurotransmitter dots crossing */}
            {[0, 1, 2, 3, 4].map((i) => (
              <mesh key={i} position={[1.15, -0.4 + i * 0.28, Math.sin(i * 2) * 0.3]}>
                <sphereGeometry args={[0.06, 10, 10]} />
                <meshStandardMaterial color={GREEN} emissive={GREEN} emissiveIntensity={0.9} />
              </mesh>
            ))}
            {/* postsynaptic membrane with receptors */}
            <mesh position={[1.55, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <planeGeometry args={[2.2, 2]} />
              <meshStandardMaterial color={ROSE} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
            <Text position={[1.15, -1.4, 0]} fontSize={0.34} color={ROSE}>receptors</Text>
            <Text position={[2.9, 0.2, 0]} fontSize={0.36} color="#cbd5e1">next neuron</Text>
          </group>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={30} target={[0, 0, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[278px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Nernst battery — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('ion', ion === 'K' ? 'K⁺ (z = +1)' : 'Na⁺ (z = +1)')}
            {row('[out], [in] (mM)', `${out} , ${inn}`)}
            {row('E = 61.5·log₁₀(out/in)', `${m.E.toFixed(1)} mV`, 'text-gold-300')}
            {row('reference', ion === 'K' ? 'K⁺ ≈ −89 mV' : 'Na⁺ ≈ +67 mV')}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">conduction</div>
            {row('mode', myelin ? 'myelinated · saltatory' : 'unmyelinated · continuous')}
            {row('speed v', `${m.v} m/s`, 'text-gold-300')}
            {row('time over 1 m', m.travelMs >= 1000 ? `${(m.travelMs / 1000).toFixed(1)} s` : `${m.travelMs.toFixed(0)} ms`, 'text-gold-300')}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          The gold spark is the AP · green dots are neurotransmitter crossing the 20 nm cleft
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><BatteryCharging className="h-3.5 w-3.5 text-gold-400" /> ion battery:</span>
        <button onClick={() => pickIon('K')} className={btn(ion === 'K')}>K⁺</button>
        <button onClick={() => pickIon('Na')} className={btn(ion === 'Na')}>Na⁺</button>
        <span className="text-xs text-surface-400">[out]:</span>
        <input type="range" min={1} max={160} step={1} value={out}
          onChange={(e) => setOut(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="w-12 text-xs text-white">{out} mM</span>
        <span className="text-xs text-surface-400">[in]:</span>
        <input type="range" min={5} max={160} step={1} value={inn}
          onChange={(e) => setInn(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="w-12 text-xs text-white">{inn} mM</span>
        <button onClick={() => setMyelin(!myelin)} className={btn(myelin)}>myelin</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Zap className="h-4 w-4" /> THE NERNST BATTERY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            E = 61.5·log₁₀(out/in) mV at 37 °C — derived by balancing RT·ln against zFE.
            K⁺ leaks out leaving the inside −89 mV; Na⁺ wants to rush in at +67 mV. The
            action potential just opens the doors in sequence.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Timer className="h-4 w-4" /> SALTATORY = FAST</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Myelin forces the spark to JUMP node to node: 120 m/s vs 1 m/s bare. Over the
            ~1 m to your big toe that is 8 ms versus a full second — the difference between
            reflexes and philosophical delays.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-4 w-4" /> THE 20 nm JUMP</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Electricity stops at the terminal; chemistry takes over. Vesicles dump
            neurotransmitter across a cleft just 20 nm wide, receptors gate the next
            neuron — this one-way chemical bridge is why nerves conduct one way.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The impulse is electricity flowing DOWN the wire like a copper cable.&quot;
            No — <span className="text-white">ions cross the membrane, electrons never do</span>.
            The signal is a travelling patch of permeability change, regenerated at every
            node; that&apos;s why it never fades, and why myelin (insulation!) makes it
            FASTER, not slower — the exact opposite of a wire.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Make [out] = [in] for K⁺ (drag out to 140): E reads 0.0 mV — no gradient,
            no battery, no resting potential. Hyperkalemia in the ER kills exactly here.
            ② Flip myelin off and watch the spark crawl — then read the HUD: 1 m takes
            1.0 s. Now imagine coordinating a sprint at that speed.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

const VIOLET_C = '#a78bfa';

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'At 37 °C the K⁺ equilibrium potential with [out]=5, [in]=140 mM is about…', opts: ['−89 mV', '+89 mV', '0 mV'], correct: 0 },
  { q: 'Myelination speeds conduction because the impulse…', opts: ['jumps node to node (saltatory)', 'gets extra electrons', 'bypasses the axon'], correct: 0 },
  { q: 'Across a chemical synapse the signal crosses via…', opts: ['neurotransmitter diffusion (≈20 nm cleft)', 'direct electric current', 'chromosome transfer'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on neurons &amp; synapses — no marks, no shame.</p>
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
