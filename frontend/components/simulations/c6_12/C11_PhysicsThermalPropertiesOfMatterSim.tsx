'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 11 Physics -- Thermal Properties of Matter
 * Calorimetry of heating ice at -20 C to boiling water: Q = m c dT for each
 * stage plus latent heat plateaus Q = m L, timed with a real heater power.
 * Self-contained: react + tailwind only.
 */

const C_ICE = 2100; // J/(kg K)
const C_WATER = 4186; // J/(kg K)
const L_FUSION = 334000; // J/kg
const L_VAPOR = 2256000; // J/kg

export function C11_PhysicsThermalPropertiesOfMatterSim() {
  const [massKg, setMassKg] = useState(1);
  const [powerW, setPowerW] = useState(800);
  const [energy, setEnergy] = useState(0); // J delivered so far
  const [heating, setHeating] = useState(false);
  const rafRef = useRef<number | null>(null);

  // Stage energy boundaries (start: ice at -20 C, end: water at 100 C)
  const qIce = massKg * C_ICE * 20;
  const qMelt = massKg * L_FUSION;
  const qWater = massKg * C_WATER * 100;
  const qTotal = qIce + qMelt + qWater; // stop at 100 C liquid (boiling needs another 2.26 MJ/kg!)

  let tempC: number;
  let stage: string;
  let phase: 'ice' | 'mix' | 'water';
  if (energy < qIce) {
    tempC = -20 + (energy / qIce) * 20;
    stage = 'Warming ice';
    phase = 'ice';
  } else if (energy < qIce + qMelt) {
    tempC = 0;
    stage = 'Melting (latent heat of fusion)';
    phase = 'mix';
  } else {
    tempC = ((energy - qIce - qMelt) / qWater) * 100;
    stage = 'Warming water';
    phase = 'water';
  }
  if (energy >= qTotal) {
    tempC = 100;
    stage = 'Boiling point reached -- next ' + (massKg * L_VAPOR / 1000).toFixed(0) + ' kJ convert it ALL to steam at 100 C';
  }
  const elapsedMin = energy / powerW / 60;

  // Heater animation
  useEffect(() => {
    if (!heating || energy >= qTotal) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setEnergy((e) => Math.min(qTotal, e + powerW * dt * 60)); // 60x speed-up
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [heating, powerW, qTotal, energy]);

  // Temperature vs energy curve
  const px = (q: number) => 60 + (q / qTotal) * 380;
  const py = (t: number) => 230 - ((t + 20) / 130) * 190;
  const curve = `${px(0)},${py(-20)} ${px(qIce)},${py(0)} ${px(qIce + qMelt)},${py(0)} ${px(qIce + qMelt + qWater)},${py(100)}`;

  const waterFill = phase === 'ice' ? 0.35 : phase === 'mix' ? 0.5 + 0.4 * ((energy - qIce) / qMelt) : 0.9;
  const steamAlpha = energy >= qTotal ? 0.5 : 0;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700 font-mono">Q</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 11 -- Thermal Properties of Matter</span>
          <h1 className="text-xl md:text-2xl font-extrabold">The Heating Curve: Sensible Heat vs Latent Heat</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 260" className="w-full">
            <line x1={60} y1={230} x2={440} y2={230} stroke="#475569" strokeWidth={2} />
            <line x1={60} y1={230} x2={60} y2={20} stroke="#475569" strokeWidth={2} />
            <text x={250} y={252} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">Heat added Q (J)</text>
            <text x={20} y={130} fill="#64748b" fontSize={11} fontFamily="monospace" transform="rotate(-90 20 130)">Temp (C)</text>
            <line x1={60} y1={py(0)} x2={440} y2={py(0)} stroke="#334155" strokeDasharray="3 5" />
            <line x1={60} y1={py(100)} x2={440} y2={py(100)} stroke="#334155" strokeDasharray="3 5" />
            <text x={445} y={py(0) + 4} fill="#64748b" fontSize={10} fontFamily="monospace">0</text>
            <text x={445} y={py(100) + 4} fill="#64748b" fontSize={10} fontFamily="monospace">100</text>
            <polyline points={curve} fill="none" stroke="#fbbf24" strokeWidth={3} />
            <circle cx={px(Math.min(energy, qTotal))} cy={py(tempC)} r={6} fill="#f472b6" stroke="#fff" strokeWidth={1.5} />
            <text x={px(Math.min(energy, qTotal)) + 10} y={py(tempC) - 10} fill="#f9a8d4" fontSize={11} fontFamily="monospace">
              {tempC.toFixed(1)} C, {(Math.min(energy, qTotal) / 1000).toFixed(0)} kJ
            </text>
            <text x={px(qIce) + 6} y={py(0) + 16} fill="#38bdf8" fontSize={9} fontFamily="monospace">fusion {qMelt >= 1000 ? (qMelt / 1000).toFixed(0) : qMelt} kJ</text>
            <text x={px(qTotal) - 10} y={py(100) - 10} fill="#f87171" fontSize={9} fontFamily="monospace" textAnchor="end">vaporization needs {(qTotal + massKg * L_VAPOR) / 1e6 >= 1 ? ((qTotal + massKg * L_VAPOR) / 1e6).toFixed(2) : '...'} MJ total</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-5">
            <svg width="90" height="120" viewBox="0 0 90 120">
              <path d="M 20 10 L 20 100 Q 20 112 32 112 L 58 112 Q 70 112 70 100 L 70 10 Z" fill="#0f172a" stroke="#64748b" strokeWidth={2.5} />
              <rect x={22} y={112 - 92 * waterFill} width={46} height={92 * waterFill} rx={4}
                fill={phase === 'ice' ? '#bae6fd' : phase === 'mix' ? '#7dd3fc' : '#38bdf8'} opacity={0.85} />
              {steamAlpha > 0 && [28, 45, 62].map((x, i) => (
                <circle key={i} cx={x} cy={8 + (i % 2) * 6} r={4 + i} fill="#e2e8f0" opacity={steamAlpha} />
              ))}
              <rect x={12} y={92} width={66} height={12} fill={heating ? '#ef4444' : '#7f1d1d'} rx={3} />
              <text x={45} y={101} textAnchor="middle" fill="#fff" fontSize={8} fontFamily="monospace">{heating ? 'ON' : 'off'}</text>
            </svg>
            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div className="text-amber-300 font-bold text-sm">{stage}</div>
              <div>T = {tempC.toFixed(1)} deg C &nbsp;|&nbsp; t = {elapsedMin.toFixed(1)} min at {powerW} W</div>
              <div className="text-slate-500">Delivered {(energy / 1000).toFixed(0)} kJ of {(qTotal / 1000).toFixed(0)} kJ needed to reach boiling</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Mass of ice</span><span className="font-mono font-bold text-gold-400">{massKg.toFixed(1)} kg</span>
              </div>
              <input type="range" min={0.2} max={2} step={0.1} value={massKg} aria-label="Mass"
                onChange={(e) => { setMassKg(Number(e.target.value)); setEnergy(0); setHeating(false); }}
                className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Heater power</span><span className="font-mono font-bold text-rose-400">{powerW} W</span>
              </div>
              <input type="range" min={200} max={2000} step={50} value={powerW} aria-label="Heater power"
                onChange={(e) => setPowerW(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Energy delivered (drag to scrub)</span><span className="font-mono font-bold text-amber-400">{(energy / 1000).toFixed(0)} kJ</span>
              </div>
              <input type="range" min={0} max={qTotal} step={1000} value={Math.min(energy, qTotal)} aria-label="Energy delivered"
                onChange={(e) => { setEnergy(Number(e.target.value)); setHeating(false); }} className="w-full accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setHeating((h) => !h)}
                className={`py-2 rounded-xl text-xs font-bold ${heating ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
                {heating ? 'Switch off heater' : 'Run heater (60x)'}
              </button>
              <button onClick={() => { setEnergy(0); setHeating(false); }}
                className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
                Reset to -20 C ice
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-amber-800/60 p-4 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Warm ice 20 K</span><div className="text-gold-300 font-bold text-sm">{(qIce / 1000).toFixed(0)} kJ</div></div>
            <div><span className="text-slate-500">Melt at 0 C</span><div className="text-gold-300 font-bold text-sm">{(qMelt / 1000).toFixed(0)} kJ</div></div>
            <div><span className="text-slate-500">Warm water 100 K</span><div className="text-gold-300 font-bold text-sm">{(qWater / 1000).toFixed(0)} kJ</div></div>
            <div><span className="text-slate-500">Boil at 100 C</span><div className="text-rose-300 font-bold text-sm">{((massKg * L_VAPOR) / 1000).toFixed(0)} kJ</div></div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Q = m c dT changes temperature (sensible heat); Q = m L changes STATE at constant
              temperature (latent heat). For 1 kg, melting costs 334 kJ but warming that same kilo of
              water by 1 degree costs only 4.186 kJ -- the flat plateaus are ~80 and ~540 &quot;degrees
              worth&quot; of energy. That is why steam burns are so severe: condensation dumps
              2260 kJ/kg on top of the hot-water burn.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Double the power: does the shape of the curve change, or only the clock? Explain using Q = P x t.</p>
            <p>2. Compare melting vs the full vaporization plateau: their ratio should be about 6.8 for water. Verify with the kJ readouts.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PhysicsThermalPropertiesOfMatterSim;
