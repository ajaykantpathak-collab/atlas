'use client';

/**
 * C11_BiologyLipidBilayerMembraneSim.tsx — 3D
 * Class 11 Biology — Cell: the Unit of Life — plasma membrane structure
 * (fluid-mosaic model) and the gel ⇄ fluid phase transition
 *
 * WHY 3D: "the membrane is a FLUID two-dimensional sea of phospholipids"
 * is a claim about motion and geometry. A static textbook bilayer cannot
 * show tails wiggling, tilt thinning the sheet, or proteins floating.
 *
 * HAND-DERIVED NUMERICS (all live):
 *  All-trans tail length: the C–C bond is 0.154 nm and the tetrahedral
 *  bond angle 109.5°. In the zigzag each bond tilts
 *      (180° − 109.5°)/2 = 35.25°  off the chain axis,
 *  so its axial projection is  0.154·cos 35.25° ≈ 0.126 nm  per CH₂:
 *      L = (n − 1) × 0.126 nm          (n = chain length in C)
 *  Melting temperature rises ~7 °C per 2 added carbons (DMG C14 = 23 °C,
 *  DPPC C16 = 41 °C, DSPC C18 = 55 °C — real DSC values):
 *      Tm ≈ 23 + 3.5 × (n − 14)  °C
 *  Fluid state ⇒ tails tilt ~30°; thickness:
 *      d = 2·L·cos(tilt) + 2·head (≈0.8 nm)   → real membranes 5–8 nm ✓
 *  T > Tm = FLUID (tails wiggle — watch them), T < Tm = GEL (frozen).
 */

import React, { useMemo, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text, Grid } from '@react-three/drei';
import * as THREE from 'three';
import { Droplets, Thermometer, RotateCcw, Sparkles, Waves } from 'lucide-react';

const GOLD = '#fbbf24';
const CYAN = '#38bdf8';
const ROSE = '#fb7185';
const GREEN = '#34d399';

const PER_CH2_NM = 0.126;   // axial rise per CH₂ (derived above)
const HEAD_NM = 0.4;        // headgroup half-thickness per leaflet
const SC = 3.2;             // 1 nm → scene units

/** one phospholipid: head sphere + two tails, optional live wiggle */
function Phospholipid({
  pos, n, tiltDeg, fluid, flip, seed,
}: {
  pos: [number, number, number]; n: number; tiltDeg: number; fluid: boolean;
  flip: boolean; seed: number;
}) {
  const tail = useRef<THREE.Group>(null);
  const bondN = Math.max(n - 1, 1);
  const L = bondN * PER_CH2_NM * SC;
  useFrame(({ clock }) => {
    if (!tail.current) return;
    // deterministic wiggle when fluid; frozen in gel
    const t = fluid ? Math.sin(clock.elapsedTime * 2.2 + seed * 1.7) * 0.16 : 0;
    tail.current.rotation.x = t;
    tail.current.rotation.z = t * 0.6;
  });
  const s = flip ? -1 : 1;
  return (
    <group position={pos}>
      {/* head group (hydrophilic) */}
      <mesh>
        <sphereGeometry args={[0.16, 18, 18]} />
        <meshStandardMaterial color={CYAN} emissive={CYAN} emissiveIntensity={0.45} />
      </mesh>
      {/* two fatty-acid tails (hydrophobic) */}
      <group ref={tail} rotation={[0, 0, (tiltDeg * Math.PI / 180)]}>
        {[-0.09, 0.09].map((dx, i) => (
          <group key={i}>
            <mesh position={[dx, (s * L) / 2, 0]}>
              <cylinderGeometry args={[0.028, 0.045, L, 6]} />
              <meshStandardMaterial color={GOLD} roughness={0.6} />
            </mesh>
            {/* terminal methyl bulge */}
            <mesh position={[dx, s * L, 0]}>
              <sphereGeometry args={[0.05, 10, 10]} />
              <meshStandardMaterial color="#f59e0b" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

/** a floating mosaic protein spanning both leaflets */
function MembraneProtein({ pos, w }: { pos: [number, number, number]; w: number }) {
  return (
    <group position={pos}>
      <mesh>
        <cylinderGeometry args={[w, w, 1.9 * SC, 14]} />
        <meshStandardMaterial color={ROSE} metalness={0.25} roughness={0.45} transparent opacity={0.9} />
      </mesh>
      <Text position={[0, 1.35, 0]} fontSize={0.2} color={ROSE}>protein</Text>
    </group>
  );
}

export default function C11_BiologyLipidBilayerMembraneSim() {
  const [nCarbons, setNCarbons] = useState(16);
  const [tempC, setTempC] = useState(41);
  const [showProteins, setShowProteins] = useState(true);

  // ── live numerics ──
  const m = useMemo(() => {
    const Lnm = (nCarbons - 1) * PER_CH2_NM;      // per tail, all-trans
    const tm = 23 + 3.5 * (nCarbons - 14);        // from real DSC anchors
    const fluid = tempC > tm;
    const tilt = fluid ? 30 : 4;                  // degrees
    const dnm = 2 * Lnm * Math.cos((tilt * Math.PI) / 180) + 2 * HEAD_NM;
    return { Lnm, tm, fluid, tilt, dnm };
  }, [nCarbons, tempC]);

  const tiltRad = (m.tilt * Math.PI) / 180;
  const reset = () => { setNCarbons(16); setTempC(41); setShowProteins(true); };
  const btn = (active: boolean) =>
    `px-3 py-2 rounded-lg text-xs font-display font-semibold border transition-all ${
      active ? 'bg-gold-400/15 border-gold-400/60 text-gold-300'
        : 'bg-white/5 border-white/10 text-surface-300 hover:border-white/25'}`;
  const row = (k: string, v: React.ReactNode, cls = 'text-white') => (
    <div className="flex justify-between"><span className="text-surface-500">{k}</span><span className={cls}>{v}</span></div>
  );

  // leaflet grid
  const lipids: { x: number; z: number; seed: number }[] = [];
  for (let i = 0; i < 8; i++)
    for (let j = 0; j < 5; j++)
      lipids.push({ x: (i - 3.5) * 0.55, z: (j - 2) * 0.55, seed: i * 5 + j });

  const headY = (m.Lnm * Math.cos(tiltRad) + HEAD_NM) * SC;

  return (
    <div className="space-y-4">
      {/* ── 3D stage ── */}
      <div className="relative h-[460px] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a12]">
        <Canvas camera={{ position: [4.5, 2.4, 6.5], fov: 42 }} dpr={[1, 2]}>
          <ambientLight intensity={0.55} />
          <directionalLight position={[6, 10, 6]} intensity={0.9} color="#ffe9b8" />
          <directionalLight position={[-6, 4, -6]} intensity={0.35} color="#7dd3fc" />
          <Grid args={[16, 16]} cellSize={0.5} cellThickness={0.5}
            cellColor="rgba(255,214,150,0.07)" sectionSize={2.5}
            sectionThickness={1} sectionColor="rgba(251,191,36,0.15)"
            fadeDistance={30} fadeStrength={1.2} />
          {/* upper leaflet: heads out (up), tails down */}
          {lipids.map(({ x, z, seed }, i) => (
            <Phospholipid key={`u${i}`} pos={[x, headY, z]} n={nCarbons}
              tiltDeg={m.tilt} fluid={m.fluid} flip={false} seed={seed} />
          ))}
          {/* lower leaflet: mirrored */}
          {lipids.map(({ x, z, seed }, i) => (
            <Phospholipid key={`l${i}`} pos={[x, -headY, z]} n={nCarbons}
              tiltDeg={-m.tilt} fluid={m.fluid} flip={true} seed={seed + 40} />
          ))}
          {/* embedded proteins of the fluid mosaic */}
          {showProteins && (
            <>
              <MembraneProtein pos={[-1.65, 0, 0.55]} w={0.28} />
              <MembraneProtein pos={[1.4, 0, -0.55]} w={0.22} />
            </>
          )}
          {/* thickness callout */}
          <Line points={[[2.5, -headY - 0.3, -1.5], [2.5, headY + 0.3, -1.5]]}
            color="rgba(255,255,255,0.5)" lineWidth={1.3} />
          <Text position={[2.75, 0, -1.5]} fontSize={0.22} color="#94a3b8">
            d = {m.dnm.toFixed(2)} nm
          </Text>
          <Text position={[0, headY + 0.75, 0]} fontSize={0.24} color={CYAN}>extracellular</Text>
          <Text position={[0, -headY - 0.75, 0]} fontSize={0.24} color={GREEN}>intracellular (cytosol)</Text>
          <OrbitControls enableDamping dampingFactor={0.08} minDistance={2.5} maxDistance={16} target={[0, 0, 0]} />
        </Canvas>

        {/* HUD */}
        <div className="pointer-events-none absolute left-4 top-4 z-10 w-[272px] rounded-xl border border-white/10 bg-black/60 p-3 backdrop-blur-md">
          <div className="font-display text-xs font-bold text-white">Bilayer physics — live</div>
          <div className="mt-2 space-y-1 text-[11px] text-surface-300">
            {row('chain length n', `${nCarbons} C`)}
            {row('tail length (n−1)×0.126', `${m.Lnm.toFixed(2)} nm`, 'text-gold-300')}
            {row('Tm ≈ 23 + 3.5(n−14)', `${m.tm.toFixed(0)} °C`, 'text-rose-300')}
            <div className="flex items-center justify-between border-t border-white/10 pt-1">
              <span className="text-surface-500">at {tempC} °C</span>
              <span className="font-display font-bold" style={{ color: m.fluid ? GREEN : CYAN }}>
                {m.fluid ? 'FLUID — tails wiggle' : 'GEL — tails frozen'}
              </span>
            </div>
            {row('tail tilt', `${m.tilt}°`)}
            {row('bilayer thickness d', `${m.dnm.toFixed(2)} nm`, 'text-gold-300')}
            {row('reference', 'real plasma membrane 5–8 nm')}
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-[0.18em] text-surface-400 backdrop-blur-md">
          Above Tm the tails wiggle and tilt — the membrane is a fluid mosaic
        </div>
      </div>

      {/* ── controls ── */}
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Droplets className="h-3.5 w-3.5 text-gold-400" /> chain n:</span>
        <input type="range" min={12} max={18} step={1} value={nCarbons}
          onChange={(e) => setNCarbons(Number(e.target.value))} className="h-11 w-28 accent-amber-400" />
        <span className="text-xs text-white">{nCarbons} C</span>
        <span className="flex items-center gap-1.5 text-xs text-surface-400"><Thermometer className="h-3.5 w-3.5 text-gold-400" /> T:</span>
        <input type="range" min={-10} max={80} step={1} value={tempC}
          onChange={(e) => setTempC(Number(e.target.value))} className="h-11 w-32 accent-amber-400" />
        <span className="text-xs text-white">{tempC} °C</span>
        <button onClick={() => setTempC(m.tm + 10)} className={btn(false)}>warm +10 past Tm</button>
        <button onClick={() => setShowProteins(!showProteins)} className={btn(showProteins)}>proteins</button>
        <button onClick={reset} className="ml-auto flex items-center gap-1.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-xs text-white hover:bg-white/10">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      {/* ── explainer cards ── */}
      <div className="grid gap-3 md:grid-cols-3">
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Droplets className="h-3.5 w-3.5" /> WHY A BILAYER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Phospholipids are amphipathic: cyan heads love water, gold tails fear it.
            In water there is exactly one shape where every head touches water and every
            tail hides — a sheet two molecules thick. No blueprint needed, just chemistry.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Waves className="h-3.5 w-3.5" /> FLUID &lt;-&gt; GEL</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            Cross the Tm line and tails freeze straight (gel) or wiggle at ~30° tilt (fluid).
            Fluidity is physiological: enzymes, receptors and transport all need a liquid
            membrane — which is why cholesterol fine-tunes it in animal cells.
          </p>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <div className="flex items-center gap-2 font-display text-xs font-bold text-gold-300"><Sparkles className="h-3.5 w-3.5" /> MOSAIC PROTEINS</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            The rose barrels span both leaflets — integral proteins that float IN the sea,
            not on it: channels, pumps, receptors. The Singer–Nicolson model is called a
            MOSAIC precisely because of these floating tiles.
          </p>
        </div>
      </div>

      {/* ── misconception + challenges ── */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="rounded-xl border border-rose-400/20 bg-rose-500/[0.04] p-4">
          <div className="font-display text-xs font-bold text-rose-300">MISCONCEPTION KILLER</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            &quot;The membrane is a rigid wall with fixed holes.&quot; No —
            <span className="text-white"> it is a FLUID, self-sealing liquid.</span> Tails
            trade places ~10⁷ times per second; proteins drift laterally. Drag the
            temperature up: thickness changes, tilt changes, motion starts — no wall does that.
            A &quot;wall&quot; also could not reseal after a needle puncture. A bilayer can.
          </p>
        </div>
        <div className="rounded-xl border border-gold-400/20 bg-gold-400/[0.04] p-4">
          <div className="font-display text-xs font-bold text-gold-300">WHAT TO TRY</div>
          <p className="mt-2 text-xs leading-relaxed text-surface-300">
            ① Slide n from 12 → 18 with T fixed at 41 °C: Tm rises from 2 °C to 44 °C and
            the membrane FREEZES mid-lesson — longer tails pack tighter, exactly the
            butter (C16) vs oil (C18-unsaturated) difference.
            ② Set n = 16 and hunt the transition: step T through 40, 41, 42 °C and watch
            the wiggle switch on at Tm = 41 °C.
          </p>
        </div>
      </div>

      <SelfCheck />
    </div>
  );
}

/* deterministic 3-question check (crystal-lattices pattern) */
const QUIZ: { q: string; opts: string[]; correct: number }[] = [
  { q: 'Phospholipid tails point inward because they are…', opts: ['hydrophobic', 'hydrophilic', 'positively charged'], correct: 0 },
  { q: 'Above its melting temperature Tm, a lipid bilayer is…', opts: ['fluid — tails wiggle and tilt', 'frozen solid', 'broken apart'], correct: 0 },
  { q: 'A typical plasma membrane is about…', opts: ['5–8 nm thick', '50 nm thick', '500 nm thick'], correct: 0 },
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
            <p className="text-xs text-surface-400">3 quick questions on membranes — no marks, no shame.</p>
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
