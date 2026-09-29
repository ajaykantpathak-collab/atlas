'use client';

import React, { useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Electric current does more than light bulbs: it produces HEAT. That heat can cook (heater), ' +
  'glow (filament bulb) or MELT a safety fuse. A fuse is a thin wire of a low-melting alloy: when ' +
  'the current climbs too high, it melts first and breaks the circuit -- protecting the house from fire.';

export function C7_ScienceElectricCurrentAndItsEffectsSim() {
  const [voltage, setVoltage] = useState(6);
  const [loadOhms, setLoadOhms] = useState(10);
  const [fuseRating, setFuseRating] = useState(2); // amps it can take
  const [switchOn, setSwitchOn] = useState(true);
  const [fused, setFused] = useState(false);

  const current = switchOn ? voltage / loadOhms : 0;
  const heatPower = current * current * loadOhms; // watts -- real physics: P = I x I x R
  const blown = current > fuseRating;

  const glow = Math.min(1, heatPower / 40);
  const wireTempColor = `hsl(${Math.max(0, 60 - heatPower * 3)}, 90%, ${45 + glow * 20}%)`;

  if (switchOn && blown && !fused) setFused(true);

  const resetFuse = () => { setFused(false); setSwitchOn(false); };

  const bulbFill = fused ? '#475569' : glow > 0.05 ? `rgba(253, 224, 71, ${0.25 + glow * 0.75})` : '#1e293b';

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Electric Current and its Effects: The Heating Effect</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Circuit */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 240" className="w-full">
          {/* circuit rectangle */}
          <rect x={60} y={60} width={480} height={130} fill="none" stroke={switchOn && !fused ? '#38bdf8' : '#475569'} strokeWidth={3} style={{ transition: 'stroke 0.3s' }} />
          {/* battery */}
          <g transform="translate(285, 45)">
            <rect x={-26} y={-14} width={18} height={28} fill="#fbbf24" />
            <rect x={8} y={-14} width={18} height={28} fill="#94a3b8" />
            <text x={0} y={34} textAnchor="middle" fill="#fbbf24" fontSize={12}>{voltage} V</text>
          </g>
          {/* bulb */}
          <g transform="translate(130, 125)">
            <circle r={26} fill={bulbFill} stroke="#94a3b8" strokeWidth={3} style={{ transition: 'fill 0.3s' }} />
            {glow > 0.05 && !fused && <circle r={34 + glow * 8} fill="rgba(253,224,71,0.25)" style={{ transition: 'all 0.3s' }} />}
            <text y={48} textAnchor="middle" fill="#94a3b8" fontSize={11}>heating element</text>
          </g>
          {/* fuse on the right side */}
          <g transform="translate(470, 125)">
            <rect x={-30} y={-12} width={60} height={24} rx={8} fill={fused ? '#7f1d1d' : '#0ea5e9'} opacity={0.85} style={{ transition: 'fill 0.4s' }} />
            <line x1={-22} y1={0} x2={22} y2={0} stroke={fused ? 'transparent' : '#e0f2fe'} strokeWidth={3} />
            {fused && <text y={5} textAnchor="middle" fill="#fecaca" fontSize={10} fontWeight="bold">MELTED</text>}
            <text y={40} textAnchor="middle" fill="#94a3b8" fontSize={11}>fuse (rated {fuseRating} A)</text>
          </g>
          {/* switch */}
          <g transform="translate(60, 125)" className="cursor-pointer" onClick={() => setSwitchOn((s) => !s)}>
            <circle cx={0} cy={-24} r={5} fill="#94a3b8" />
            <circle cx={0} cy={24} r={5} fill="#94a3b8" />
            <line x1={0} y1={-24} x2={switchOn && !fused ? 0 : 22} y2={switchOn && !fused ? 24 : 16} stroke="#e2e8f0" strokeWidth={4} style={{ transition: 'all 0.25s' }} />
            <text x={-44} y={4} fill="#94a3b8" fontSize={11}>{switchOn && !fused ? 'ON' : 'OFF'}</text>
          </g>
          {/* current label */}
          <text x={300} y={225} textAnchor="middle" fill="#38bdf8" fontSize={13} fontFamily="monospace">
            current I = V / R = {voltage} / {loadOhms} = {current.toFixed(2)} A
            {blown && <tspan fill="#f87171"> &gt; fuse rating {fuseRating} A -- fuse blows!</tspan>}
          </text>
        </svg>
      </div>

      {/* Readouts */}
      <div className="grid grid-cols-3 gap-3 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">Current</div>
          <div className="text-2xl font-black font-mono text-gold-400">{current.toFixed(2)} A</div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">Heat produced</div>
          <div className="text-2xl font-black font-mono" style={{ color: wireTempColor }}>{Math.round(heatPower)} W</div>
          <div className="text-[10px] text-slate-400">P = I x I x R</div>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${fused ? 'bg-rose-950 border-rose-500' : 'bg-emerald-950 border-emerald-700'}`}>
          <div className="text-xs uppercase text-slate-400">House status</div>
          <div className={`text-sm font-black mt-1 ${fused ? 'text-rose-300' : 'text-emerald-300'}`}>{fused ? 'Circuit broken by fuse' : 'Safe and running'}</div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>Battery voltage (V)</span><span className="font-mono font-bold text-amber-300">{voltage}</span></label>
          <input type="range" aria-label="voltage" min={2} max={24} value={voltage} onChange={(e) => setVoltage(Number(e.target.value))} className="w-full mt-2 accent-amber-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>Appliance resistance (R)</span><span className="font-mono font-bold text-gold-300">{loadOhms} ohm</span></label>
          <input type="range" aria-label="resistance" min={2} max={30} value={loadOhms} onChange={(e) => setLoadOhms(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between"><span>Fuse rating</span><span className="font-mono font-bold text-emerald-300">{fuseRating} A</span></label>
          <input type="range" aria-label="fuse rating" min={1} max={10} value={fuseRating} onChange={(e) => { setFuseRating(Number(e.target.value)); setFused(false); }} className="w-full mt-2 accent-emerald-400" />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => setSwitchOn((s) => !s)}
          className={`px-5 py-2 rounded-xl text-sm font-bold border transition-colors ${switchOn ? 'bg-rose-600 border-rose-400' : 'bg-emerald-600 border-emerald-400'}`}
        >
          {switchOn ? 'Open the switch' : 'Close the switch'}
        </button>
        <button onClick={resetFuse} className="px-4 py-2 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Replace fuse
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Keep the fuse at 2 A and raise the voltage slowly. At what voltage does the fuse blow? Write the rule connecting V, R and the blowing point.</li>
          <li>Halve the resistance (R from 10 to 5) at the same voltage. Does the current double or quadruple? Use P = I x I x R to explain what happens to the heat.</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceElectricCurrentAndItsEffectsSim;
