'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── DOUBLE FERTILISATION: the one event unique to angiosperms ───
// Two fusions, one event: Syngamy (n + n -> 2n zygote) and Triple Fusion (n + n + n -> 3n PEN).
const STAGES = [
  { id: 0, name: 'Pollen landed on stigma', hint: 'A compatible pollen grain germinates. Press "Grow pollen tube".' },
  { id: 1, name: 'Pollen tube growing through style', hint: 'The tube follows chemical signals to the micropylar end.' },
  { id: 2, name: 'Tube releases 2 male gametes', hint: 'One synergid degenerates; both gametes (n each) are delivered.' },
  { id: 3, name: 'Syngamy complete', hint: 'Gamete 1 (n) + egg (n) = zygote 2n. The future embryo.' },
  { id: 4, name: 'Triple fusion complete', hint: 'Gamete 2 (n) + 2 polar nuclei (n+n) = 3n primary endosperm nucleus. The embryo\'s food store.' },
];

export function C12_BiologyFloweringPlantDoubleFertilisationSim() {
  const [stage, setStage] = useState(0);
  const [growth, setGrowth] = useState(0);
  const [speed, setSpeed] = useState(1);
  const rafRef = useRef<number>(0);

  // Animated tube growth only during stage 1
  useEffect(() => {
    if (stage !== 1) return;
    const tick = () => {
      setGrowth((g) => {
        const next = g + 0.012 * speed;
        if (next >= 1) {
          setStage(2);
          return 1;
        }
        rafRef.current = requestAnimationFrame(tick);
        return next;
      });
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [stage, speed]);

  const advance = () => {
    if (stage === 0) setStage(1);
    else if (stage === 2) setStage(3);
    else if (stage === 3) setStage(4);
  };

  const reset = () => {
    setStage(0);
    setGrowth(0);
    setSpeed(1);
  };

  // SVG geometry
  const tubeX = 150 + growth * 90;
  const zygone = stage >= 3;
  const penDone = stage >= 4;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 12 Biology - Sexual Reproduction in Flowering Plants</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Double Fertilisation Event Cam</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-emerald-950 border border-emerald-700 text-emerald-300">Stage {stage} / 4</span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <button onClick={advance} disabled={stage === 1 || stage === 4} className={`min-h-11 px-4 rounded-2xl text-sm font-bold border ${stage === 1 || stage === 4 ? 'bg-slate-900 border-slate-800 text-slate-600' : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500'}`}>
          {stage === 0 ? 'Grow pollen tube' : stage === 2 ? 'Release gametes: fuse with egg' : stage === 3 ? 'Fuse second gamete with polar nuclei' : 'Event complete'}
        </button>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Tube growth speed</span>
            <span className="text-amber-300 font-mono font-bold">{speed.toFixed(1)}x</span>
          </label>
          <input type="range" min={0.5} max={3} step={0.1} value={speed} aria-label="pollen tube growth speed"
            onChange={(e) => setSpeed(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-amber-500" />
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Replay event</button>
      </div>

      {/* EMBRYO SAC VISUAL */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 470 250" className="w-full h-56 md:h-64" preserveAspectRatio="xMidYMid meet">
          {/* stigma + style */}
          <rect x="20" y="105" width="110" height="40" rx="18" fill="#4c1d95" stroke="#8b5cf6" />
          <text x="40" y="100" fill="#c4b5fd" fontSize="10">stigma</text>
          <rect x="120" y="115" width="120" height="20" fill="#312e81" stroke="#6366f1" />
          <text x="140" y="112" fill="#a5b4fc" fontSize="10">style</text>
          {/* pollen grain */}
          {stage === 0 && <circle cx="60" cy="125" r="12" fill="#fbbf24" stroke="#92400e" strokeWidth="2" />}
          {/* growing tube */}
          {stage >= 1 && (
            <path d={`M 60 125 Q 110 100 150 125 L ${tubeX} 125`} fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinecap="round" />
          )}
          {stage === 1 && <circle cx={tubeX} cy="125" r="6" fill="#fde68a" stroke="#92400e" />}

          {/* embryo sac */}
          <ellipse cx="300" cy="125" rx="140" ry="95" fill="#0f172a" stroke="#38bdf8" strokeWidth="2" />
          <text x="300" y="228" fill="#7dd3fc" fontSize="10" textAnchor="middle">embryo sac (female gametophyte, all cells n)</text>
          {/* antipodals */}
          <circle cx="410" cy="125" r="9" fill="#1e293b" stroke="#64748b" />
          <circle cx="404" cy="108" r="7" fill="#1e293b" stroke="#64748b" />
          <circle cx="404" cy="142" r="7" fill="#1e293b" stroke="#64748b" />
          <text x="404" y="170" fill="#94a3b8" fontSize="9" textAnchor="middle">3 antipodals</text>
          {/* central cell polar nuclei */}
          <circle cx="325" cy="125" r="16" fill={penDone ? '#065f46' : '#1e293b'} stroke={penDone ? '#34d399' : '#475569'} className="transition-all duration-500" strokeWidth="2" />
          <text x="325" y="129" fill={penDone ? '#a7f3d0' : '#94a3b8'} fontSize="8" textAnchor="middle" fontWeight="bold">{penDone ? '3n PEN' : '2 polar (n+n)'}</text>
          {/* egg apparatus: micropylar end (left of sac) */}
          <circle cx="196" cy="105" r="10" fill="#1e293b" stroke="#64748b" />
          <text x="196" y="86" fill="#94a3b8" fontSize="9" textAnchor="middle">synergid 1</text>
          <circle cx="208" cy="145" r="10" fill="#1e293b" stroke="#64748b" />
          <text x="208" y="168" fill="#94a3b8" fontSize="9" textAnchor="middle">synergid 2</text>
          <circle cx="232" cy="125" r="12" fill={zygone ? '#065f46' : '#1e293b'} stroke={zygone ? '#34d399' : '#f472b6'} className="transition-all duration-500" strokeWidth="2" />
          <text x="232" y="157" fill={zygone ? '#a7f3d0' : '#f9a8d4'} fontSize="9" textAnchor="middle" fontWeight="bold">{zygone ? '2n zygote' : 'egg (n)'}</text>
          {/* male gametes travelling after release */}
          {stage >= 2 && (
            <g className="transition-all duration-700">
              <circle cx={zygone ? 232 : 260} cy={zygone ? 125 : 122} r="5" fill="#fbbf24" />
              <circle cx={penDone ? 325 : 275} cy={penDone ? 125 : 130} r="5" fill="#fbbf24" />
            </g>
          )}
          <text x="188" y="35" fill="#64748b" fontSize="10">micropyle this side</text>
          {stage === 1 && (
            <rect x="30" y="215" width={410 * growth} height="6" rx="3" fill="#fbbf24" />
          )}
        </svg>
      </div>

      {/* LIVE PLOIDY LEDGER */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Event stage</p>
          <p className="text-sm font-bold text-white">{STAGES[stage].name}</p>
          <p className="text-xs text-slate-400 mt-1">{STAGES[stage].hint}</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${zygone ? 'bg-emerald-950/60 border-emerald-700' : 'bg-slate-900 border-slate-800'}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Zygote (embryo)</p>
          <p className={`text-lg font-extrabold font-mono ${zygone ? 'text-emerald-300' : 'text-slate-500'}`}>{zygone ? '2n' : '--'}</p>
          <p className="text-xs text-slate-400">{zygone ? 'egg n + sperm n' : 'waiting'}</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${penDone ? 'bg-emerald-950/60 border-emerald-700' : 'bg-slate-900 border-slate-800'}`}>
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Endosperm (PEN)</p>
          <p className={`text-lg font-extrabold font-mono ${penDone ? 'text-emerald-300' : 'text-slate-500'}`}>{penDone ? '3n' : '--'}</p>
          <p className="text-xs text-slate-400">{penDone ? 'sperm n + polar n + n' : 'waiting'}</p>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-emerald-300">Big idea:</span> double fertilisation = TWO fusion events triggered by ONE pollen tube.
          The zygote (2n) becomes the embryo; the 3n primary endosperm nucleus becomes the seed&apos;s food tissue.
          <span className="font-bold text-amber-300"> Misconception killer:</span> double fertilisation does NOT mean two embryos --
          one sperm makes the baby, the other makes its lunchbox.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Replay the event and pause at stage 3: which two nuclei have fused, and what ploidy does the ledger show for the zygote?</p>
        <p className="mt-1">2. In a 2n = 24 plant, each gamete is n = 12. Use the ledger to predict chromosome counts of the embryo and the endosperm, then explain why they differ.</p>
      </footer>
    </div>
  );
}

export default C12_BiologyFloweringPlantDoubleFertilisationSim;
