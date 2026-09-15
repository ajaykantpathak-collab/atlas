'use client';

/**
 * C11_BiologyPlantTransportTranspirationSim.tsx — 3D
 * Class 11 Biology — Transport in Plants: transpiration pull (cohesion–
 * tension model)
 *
 * WHY 3D: a 100-metre unbroken water column hanging UNDER TENSION inside
 * tiny xylem tubes is hard to believe until you see the beads holding
 * together while the leaves pull.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  1. Tension at the top from the hanging column (gauge pressure):
 *         ΔP = ρ·g·h      ρ = 1000 kg/m³, g = 9.8 m/s²
 *      h = 100 m → ΔP ≈ 0.98 MPa of PULL at the leaf. Real xylem sustains
 *      −0.5 to −3 MPa — the sim flags cavitation (column snaps) past −2 MPa.
 *  2. Capillary rise ALONE (the wrong answer students give):
 *      Laplace pressure 2γ/r must hold the column:  2γ/r = ρ·g·h_cap
 *          ⇒ h_cap = 2γ / (ρ·g·r)     γ = 0.072 N/m, r = xylem radius
 *      r = 100 µm → h_cap ≈ 0.15 m. FIFTEEN CENTIMETRES. Capillarity
 *      cannot lift water up a banyan — this division is the whole
 *      misconception kill.
 *  3. Transpiration rate drives the flux: stomatal aperture fraction a
 *      scales the bead speed (qualitative) — the tension READOUT stays
 *      ρgh-derived, honest to the model.
 */

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';
import { CloudRain, TrendingUp, RotateCcw, Sparkles, TriangleAlert } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const GREEN = '#34d399';
const ROSE = '#fb7185';

const RHO = 1000;      // kg/m³
const G = 9.8;         // m/s²
const GAMMA = 0.072;   // N/m surface tension of water
const CAVITATION_MPA = 2.0;

/** water column beads riding the xylem */
function WaterColumn({ hScene, aperture, moving }: { hScene: number; aperture: number; moving: boolean }) {
  const grp = useRef<THREE.Group>(null);
  const n = Math.max(Math.floor(hScene / 0.5), 2);
  const phase = useRef(0);
  useFrame((_, delta) => {
    if (moving) phase.current = (phase.current + delta * (0.15 + aperture * 0.9)) % (0.5);
  });
  const beads: number[] = [];
  for (let i = 0; i < n; i++) beads.push(i * 0.5);
  return (
    <group ref={grp}>
      {beads.map((y, i) => {
        const yy = ((y + phase.current) % hScene) + 0.2;
        return (
          <mesh key={i} position={[0, yy, 0]}>
            <sphereGeometry args={[0.09, 12, 12]} />
            <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.7} transparent opacity={0.9} />
          </mesh>
        );
      })}
    </group>
  );
}

export default function C11_BiologyPlantTransportTranspirationSim() {
  const [heightM, setHeightM] = useState(30);        // tree height (m)
  const [aperture, setAperture] = useState(60);      // stomatal aperture %
  const [radiusUm, setRadiusUm] = useState(100);     // xylem radius (µm)
  const [showCapillary, setShowCapillary] = useState(true);

  const m = useMemo(() => {
    const tensionPa = RHO * G * heightM;             // ΔP = ρgh
    const tensionMPa = tensionPa / 1e6;
    const cavitated = tensionMPa > CAVITATION_MPA;
    // capillary rise from Laplace balance: h = 2γ/(ρ g r)
    const r = radiusUm * 1e-6;                       // m
    const hCap = (2 * GAMMA) / (RHO * G * r);        // m
    return { tensionPa, tensionMPa, cavitated, hCap };
  }, [heightM, radiusUm]);

  // scene scale: tree drawn ~14 units tall regardless of real height,
  // capillary column drawn at its TRUE relative height vs the tree
  const treeScene = 14;
  const capFrac = Math.min(m.hCap / heightM, 1);
  const reset = () => { setHeightM(30); setAperture(60); setRadiusUm(100); setShowCapillary(true); };

  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  const leaves: [number, number, number][] = [];
  for (let i = 0; i < 9; i++) {
    leaves.push([Math.sin(i * 2.4) * (1.6 + (i % 3) * 0.5), treeScene + 0.4 + (i % 2) * 0.5, Math.cos(i * 2.4) * (1.6 + (i % 3) * 0.5)]);
  }

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [10, 8, 14], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[10, 16, 8]} intensity={0.85} color="#ffe9b8" />
          {/* soil */}
          <mesh position={[0, -0.15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <circleGeometry args={[6, 32]} />
            <meshStandardMaterial color="#3f2f1d" roughness={1} />
          </mesh>
          {/* trunk: hollow xylem tube */}
          <mesh position={[0, treeScene / 2, 0]}>
            <cylinderGeometry args={[0.32, 0.5, treeScene, 16, 1, true]} />
            <meshStandardMaterial color="#7c5a3a" roughness={0.8} side={THREE.DoubleSide} transparent opacity={0.62} />
          </mesh>
          {/* xylem inner glass */}
          <mesh position={[0, treeScene / 2, 0]}>
            <cylinderGeometry args={[0.16, 0.16, treeScene, 12, 1, true]} />
            <meshStandardMaterial color={CYAN} transparent opacity={0.18} side={THREE.DoubleSide} />
          </mesh>
          {/* water column */}
          {!m.cavitated && <WaterColumn hScene={treeScene} aperture={aperture / 100} moving />}
          {m.cavitated && (
            <>
              <WaterColumn hScene={treeScene * 0.45} aperture={0} moving={false} />
              <Text position={[0, treeScene * 0.62, 0]} fontSize={0.5} color={ROSE}>CAVITATION — column snapped</Text>
            </>
          )}
          {/* roots + canopy */}
          {[0, 1, 2, 3, 4].map((i) => (
            <Line key={i}
              points={[[0, 0.1, 0], [Math.cos(i * 1.256) * 2.2, -0.5, Math.sin(i * 1.256) * 2.2]]}
              color="#8a6b47" lineWidth={3} />
          ))}
          {leaves.map((p, i) => (
            <group key={i} position={p} rotation={[0, i, 0]}>
              <mesh rotation={[Math.PI / 2.4, 0, 0]}>
                <sphereGeometry args={[0.55, 14, 10]} />
                <meshStandardMaterial color={GREEN} transparent opacity={0.85} roughness={0.5} />
              </mesh>
              {/* stomatal aperture bar on each leaf */}
              <mesh position={[0, -0.5, 0]}>
                <boxGeometry args={[0.7 * (aperture / 100), 0.06, 0.2]} />
                <meshStandardMaterial color={GOLD} emissive={GOLD} emissiveIntensity={0.6} />
              </mesh>
            </group>
          ))}
          <Text position={[0, treeScene + 2.6, 0]} fontSize={0.5} color={GREEN}>
            {leaves.length} leaves · stomata {aperture}% open
          </Text>
          {/* capillary-height comparison drawn to scale */}
          {showCapillary && (
            <group position={[3.4, 0, 0]}>
              <mesh position={[0, (treeScene * capFrac) / 2, 0]}>
                <cylinderGeometry args={[0.1, 0.1, Math.max(treeScene * capFrac, 0.05), 10]} />
                <meshStandardMaterial color={ROSE} emissive={ROSE} emissiveIntensity={0.3} />
              </mesh>
              <Text position={[0.4, 0.8, 0]} fontSize={0.42} color={ROSE}>
                capillary-only rise: {m.hCap < 1 ? `${(m.hCap * 100).toFixed(0)} cm` : `${m.hCap.toFixed(1)} m`}
              </Text>
              <Text position={[0.4, 0.2, 0]} fontSize={0.36} color="#94a3b8">vs the tree — drawn to scale</Text>
            </group>
          )}
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={4} maxDistance={34} target={[1.5, 6, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[280px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Cohesion–tension — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('tree height h', `${heightM} m`)}
            {row('tension ΔP = ρ·g·h', `${(m.tensionMPa * 1000).toFixed(0)} kPa = ${m.tensionMPa.toFixed(2)} MPa`, 'text-gold-300')}
            {row('xylem sustains', '−0.5 to −3 MPa (measured)')}
            {m.cavitated ? (
              <div className="flex items-center gap-1 pt-0.5 text-[10px] text-rose-300">
                <TriangleAlert className="h-3 w-3" /> &gt; {CAVITATION_MPA} MPa — embolism risk!
              </div>
            ) : (
              <div className="pt-0.5 text-[10px] text-emerald-300">column intact — cohesion holds</div>
            )}
            <div className="mt-1 border-t border-white/10 pt-1 text-[10px] text-surface-500">
              capillary test: h = 2γ/(ρgr), r = {radiusUm} µm
            </div>
            {row('capillary rise alone', m.hCap < 1 ? `${(m.hCap * 100).toFixed(1)} cm` : `${m.hCap.toFixed(2)} m`, 'text-rose-300')}
            {row('fraction of the climb', `${(capFrac * 100).toFixed(1)} %`, 'text-rose-300')}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Cyan beads climb by transpiration pull — the red stick is everything capillarity manages
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><CloudRain className="h-3.5 w-3.5 text-gold-400" /> height:</span>
        <input type="range" min={1} max={130} step={1} value={heightM}
          onChange={(e) => setHeightM(Number(e.target.value))} className="h-11 w-36 accent-amber-400" />
        <span className="text-xs text-white">{heightM} m</span>
        <span className="text-xs text-surface-400">stomata:</span>
        <input type="range" min={0} max={100} step={5} value={aperture}
          onChange={(e) => setAperture(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{aperture}%</span>
        <span className="text-xs text-surface-400">xylem r:</span>
        <input type="range" min={10} max={200} step={5} value={radiusUm}
          onChange={(e) => setRadiusUm(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{radiusUm} µm</span>
        <button onClick={() => setShowCapillary(!showCapillary)} className={btn(showCapillary)}>capillary compare</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><CloudRain className="h-3.5 w-3.5" /> EVAPORATION = PUMP</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Water leaves the leaf through open stomata; each escaping molecule tugs the
            next. The whole column is pulled upward by tension created at the TOP —
            a pump with no moving parts, powered by sunlight.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><TrendingUp className="h-3.5 w-3.5" /> COHESION HOLDS THE LINE</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Water&apos;s cohesion (H-bonds) plus adhesion to xylem walls let the column
            survive negative pressures of −0.5 to −3 MPa. Push past ~2 MPa of demand
            (try h = 130 m at full stomata) and the column snaps: cavitation.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-3.5 w-3.5" /> WHY THIN XYLEM</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Thinner tubes hold tension more safely but raise resistance; that trade-off
            fixes xylem at ~20–200 µm. The capillary readout shows the same radius gives
            only centimetres of passive wicking — tension does the rest.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;Water rises because capillary action sucks it up the thin tubes.&quot; No —
            <span className="text-white"> capillarity tops out at centimetres.</span>
            Read the HUD: with r = 100 µm, h = 2γ/(ρgr) ≈ 15 cm — a 30 m tree needs 200×
            more. The red stick beside the trunk is drawn to TRUE scale. The real engine is
            tension from evaporation, held by cohesion.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Slide height to 110 m: tension reads 1.08 MPa — inside xylem&apos;s range, and
            close to the tallest known trees (~115 m). Push to 130: past 1.27 MPa, nearing
            the snap.
            ② Shrink the xylem to r = 10 µm: capillary rise grows 10× to ~1.5 m — still
            nowhere near the canopy, and now flow resistance climbs too. There is no
            radius that rescues capillarity.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Water reaches the top of a tall tree mainly by…', opts: ['transpiration pull with cohesion of the column', 'capillary action alone', 'root pressure pushing from below'], correct: 0 },
  { q: 'Capillary rise in a 100 µm xylem tube is only about…', opts: ['0.15 m', '15 m', '150 m'], correct: 0 },
  { q: 'Tension at the top of a water column of height h is…', opts: ['ρgh', 'ρg/h', '2γh'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on transpiration — no marks, no shame.</p>
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
