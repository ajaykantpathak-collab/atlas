'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 11 Biology -- Neural Control and Coordination
 * Fire a neuron: sub-threshold stimuli die out, threshold triggers the
 * all-or-none action potential; Nernst equations price Na+ and K+ gradients.
 * Self-contained: react + tailwind only.
 */

const REST = -70; // mV

export function C11_BiologyNeuralControlAndCoordinationSim() {
  const [stimulus, setStimulus] = useState(10); // mV depolarisation
  const [naOut, setNaOut] = useState(140);
  const [naIn, setNaIn] = useState(14);
  const [kOut, setKOut] = useState(5);
  const [kIn, setKIn] = useState(140);
  const [tMs, setTMs] = useState(0); // time since stimulus
  const [firing, setFiring] = useState(false);
  const rafRef = useRef<number | null>(null);

  const eNa = 61.5 * Math.log10(naOut / naIn);
  const eK = 61.5 * Math.log10(kOut / kIn);
  const threshold = -55;
  const stimMV = REST + stimulus;
  const reachesThreshold = stimMV >= threshold;

  const potentialAt = (t: number) => {
    if (!reachesThreshold) return REST + stimulus * Math.exp(-t / 3);
    if (t < 1) return REST + (30 - REST) * (t / 1); // depolarise to +30 in 1 ms
    if (t < 3) return 30 - (30 - (-85)) * ((t - 1) / 2); // repolarise to -85
    if (t < 6) return -85 + 15 * ((t - 3) / 3); // hyperpolarisation recovery
    return REST;
  };

  useEffect(() => {
    if (!firing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      setTMs((t) => {
        const nt = t + dt * 1.2; // ms, slowed 1.2x wall clock
        if (nt > (reachesThreshold ? 7 : 12)) {
          setFiring(false);
          return 0;
        }
        return nt;
      });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [firing, reachesThreshold]);

  const fire = () => { setTMs(0); setFiring(true); };

  const vNow = firing ? potentialAt(tMs) : REST;
  // Screen mapping and trace: response curve drawn up to the current time cursor
  const px = (t: number) => 50 + (t / 8) * 390;
  const py = (v: number) => 20 + ((30 - v) / 140) * 190;
  const tracePts: string[] = [];
  for (let i = 0; i <= 300; i++) {
    const t = (8 * i) / 300;
    if (t > tMs) continue;
    tracePts.push(`${px(t)},${py(potentialAt(t))}`);
  }

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-teal-950/80 rounded-2xl border border-teal-700 font-mono">mV</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-teal-400">Class 11 -- Neural Control and Coordination</span>
          <h1 className="text-xl md:text-2xl font-extrabold">All-or-None: Fire the Action Potential</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 240" className="w-full">
            <line x1={50} y1={230} x2={440} y2={230} stroke="#475569" strokeWidth={2} />
            <line x1={50} y1={20} x2={50} y2={230} stroke="#475569" strokeWidth={2} />
            {[30, 0, -55, -70, -90].map((v) => (
              <g key={v}>
                <line x1={50} y1={py(v)} x2={440} y2={py(v)}
                  stroke={v === -55 ? '#f87171' : v === -70 ? '#475569' : '#1e293b'}
                  strokeDasharray={v === -55 || v === -70 ? '5 4' : undefined} />
                <text x={45} y={py(v) + 4} textAnchor="end" fill={v === -55 ? '#f87171' : '#64748b'} fontSize={9} fontFamily="monospace">{v}</text>
              </g>
            ))}
            <text x={54} y={py(-55) - 5} fill="#f87171" fontSize={9} fontFamily="monospace">threshold -55 mV</text>
            <text x={54} y={py(-70) + 13} fill="#64748b" fontSize={9} fontFamily="monospace">resting -70 mV</text>
            {tracePts.length > 1 && <polyline points={tracePts.join(' ')} fill="none" stroke="#34d399" strokeWidth={2.5} />}
            {firing && <circle cx={px(Math.min(tMs, 8))} cy={py(vNow)} r={6} fill="#fbbf24" stroke="#fff" strokeWidth={1.2} />}
            <text x={56} y={36} fill={reachesThreshold ? '#34d399' : '#f87171'} fontSize={11} fontWeight="bold" fontFamily="monospace">
              stimulus {stimulus >= 0 ? '+' : ''}{stimulus} mV --&gt; {reachesThreshold ? 'ACTION POTENTIAL FIRES (all-or-none)' : 'sub-threshold: dies out locally'}
            </text>
            <text x={56} y={222} fill="#64748b" fontSize={10} fontFamily="monospace">time since stimulus (ms)</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Membrane potential now</span>
              <div className={`font-bold text-sm ${vNow > threshold ? 'text-amber-300' : vNow < REST - 5 ? 'text-sky-300' : 'text-emerald-300'}`}>{vNow.toFixed(1)} mV</div></div>
            <div><span className="text-slate-500">Phase</span>
              <div className="text-slate-200 font-bold text-sm">
                {!firing ? 'resting' : tMs < 1 ? 'depolarising (Na+ gates open)' : tMs < 3 ? 'repolarising (K+ gates open)' : tMs < 6 ? 'hyperpolarised (K+ slow to shut)' : 'recovering'}
              </div></div>
            <div><span className="text-slate-500">E_Na (Nernst)</span><div className="text-pink-300 font-bold text-sm">{eNa.toFixed(1)} mV</div></div>
            <div><span className="text-slate-500">E_K (Nernst)</span><div className="text-sky-300 font-bold text-sm">{eK.toFixed(1)} mV</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Stimulus strength (depolarisation)</span><span className="font-mono font-bold text-amber-400">+{stimulus} mV --&gt; {stimMV} mV</span>
              </div>
              <input type="range" min={2} max={25} step={1} value={stimulus} aria-label="Stimulus strength"
                onChange={(e) => setStimulus(Number(e.target.value))} className="w-full accent-amber-500" />
              <div className="text-[10px] text-slate-500 mt-1">
                {reachesThreshold ? 'strong enough: full spike, same shape EVERY time' : 'below threshold: graded local current only'}
              </div>
            </div>
            <button onClick={fire} className="w-full py-2.5 rounded-xl text-xs font-bold bg-teal-600 hover:bg-teal-500">
              Stimulate the neuron
            </button>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <p className="text-[11px] font-bold text-teal-300">Ion gradients set the voltages (Nernst: E = 61.5 log[out/in] mV)</p>
            {([['Na+ outside', naOut, setNaOut, 100, 200], ['Na+ inside', naIn, setNaIn, 5, 30]] as [string, number, (n: number) => void, number, number][]).map(([lbl, val, set, lo, hi]) => (
              <div key={lbl}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{lbl}</span><span className="font-mono font-bold text-pink-400">{val} mM</span>
                </div>
                <input type="range" min={lo} max={hi} step={1} value={val} aria-label={lbl}
                  onChange={(e) => set(Number(e.target.value))} className="w-full accent-pink-500" />
              </div>
            ))}
            {([['K+ outside', kOut, setKOut, 2, 10], ['K+ inside', kIn, setKIn, 90, 160]] as [string, number, (n: number) => void, number, number][]).map(([lbl, val, set, lo, hi]) => (
              <div key={lbl}>
                <div className="flex justify-between text-[11px] text-slate-400">
                  <span>{lbl}</span><span className="font-mono font-bold text-sky-400">{val} mM</span>
                </div>
                <input type="range" min={lo} max={hi} step={1} value={val} aria-label={lbl}
                  onChange={(e) => set(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>
            ))}
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              The Na+/K+ pump burns ATP to hoard Na+ outside and K+ inside; leakage makes the inside
              settle at -70 mV. A stimulus that crosses -55 mV slams Na+ channels open -- the spike
              marches to +30 mV no matter whether the stimulus was 15 mV or 40 mV (all-or-none).
              Intensity is therefore coded by FREQUENCY of spikes, never by their size.
            </p>
          </div>

          <div className="bg-teal-950/40 rounded-2xl border border-teal-800/50 p-4 text-xs">
            <p className="font-bold text-teal-300 mb-1">What to try</p>
            <p>1. Fire with 10 mV, then 25 mV: prove the spikes are identical in height -- where IS the difference between weak and strong stimulation on the trace?</p>
            <p>2. Equalise Na+ across the membrane (in = out): E_Na collapses to 0 mV -- what happens to the spike height, and which anaesthetic idea does this expose?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_BiologyNeuralControlAndCoordinationSim;
