'use client';

import React, { useState } from 'react';

/**
 * Class 11 Physics -- Thermodynamics
 * Ideal gas taken from V1 to V2 either isothermally or adiabatically.
 * PV curve with shaded work area, first-law bookkeeping in real joules.
 * Self-contained: react + tailwind only.
 */

const R = 8.314; // J / (mol K)

export function C11_PhysicsThermodynamicsSim() {
  const [tempK, setTempK] = useState(300);
  const [v1, setV1] = useState(10); // litres
  const [v2, setV2] = useState(20); // litres
  const [process, setProcess] = useState<'isothermal' | 'adiabatic'>('isothermal');
  const [gammaMode, setGammaMode] = useState<'mono' | 'di'>('mono');

  const gamma = gammaMode === 'mono' ? 5 / 3 : 7 / 5;
  const vMin = Math.min(v1, v2);
  const vMax = Math.max(v1, v2);

  // Pressures in kPa (kPa x L = J, convenient for ideal gas)
  const p1 = (R * tempK) / v1;
  const expansion = v2 > v1;
  const workIso = R * tempK * Math.log(v2 / v1); // J, positive for expansion

  const p2Iso = (R * tempK) / v2;
  const p2Adi = p1 * Math.pow(v1 / v2, gamma);
  const t2Adi = tempK * Math.pow(v1 / v2, gamma - 1);
  const workAdi = (p1 * v1 - p2Adi * v2) / (gamma - 1); // J

  const isIso = process === 'isothermal';
  const p2 = isIso ? p2Iso : p2Adi;
  const work = isIso ? workIso : workAdi; // J, positive = by gas
  const qHeat = isIso ? workIso : 0;
  const deltaU = isIso ? 0 : -workAdi;
  const tFinal = isIso ? tempK : t2Adi;

  // PV trace
  const pts: string[] = [];
  const steps = 80;
  const vLo = Math.min(vMin, vMax) * 0.85;
  const vHi = Math.max(vMin, vMax) * 1.15;
  const px = (V: number) => 70 + ((V - 3) / 45) * 380;
  const py = (P: number) => 250 - (P / 700) * 210;
  for (let i = 0; i <= steps; i++) {
    const V = Math.min(v1, v2) + ((Math.max(v1, v2) - Math.min(v1, v2)) * i) / steps;
    const P = isIso ? (R * tempK) / V : p1 * Math.pow(v1 / V, gamma);
    pts.push(`${px(V)},${py(P)}`);
  }
  // Also draw the faint reference isotherm family
  const isoRef = (T: number): string => {
    const arr: string[] = [];
    for (let i = 0; i <= 60; i++) {
      const V = 3.5 + (44 * i) / 60;
      arr.push(`${px(V)},${py((R * T) / V)}`);
    }
    return arr.join(' ');
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700 font-mono">PV</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 11 -- Thermodynamics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Isothermal vs Adiabatic: Where Does the Energy Go?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 280" className="w-full">
            <polyline points={isoRef(200)} fill="none" stroke="#1e293b" strokeWidth={1.5} />
            <polyline points={isoRef(300)} fill="none" stroke="#1e293b" strokeWidth={1.5} />
            <polyline points={isoRef(400)} fill="none" stroke="#1e293b" strokeWidth={1.5} />
            <polyline points={isoRef(500)} fill="none" stroke="#1e293b" strokeWidth={1.5} />
            <line x1={px(3)} y1={250} x2={px(47)} y2={250} stroke="#475569" strokeWidth={2} />
            <line x1={px(3)} y1={250} x2={px(3)} y2={20} stroke="#475569" strokeWidth={2} />
            <text x={px(25)} y={270} textAnchor="middle" fill="#64748b" fontSize={11} fontFamily="monospace">Volume (L)</text>
            <text x={16} y={135} fill="#64748b" fontSize={11} fontFamily="monospace" transform="rotate(-90 16 135)">P (kPa)</text>
            {pts.length > 1 && (
              <>
                <polygon points={`${px(Math.min(v1, v2))},250 ${pts.join(' ')} ${px(Math.max(v1, v2))},250`}
                  fill={isIso ? 'rgba(56,189,248,0.15)' : 'rgba(251,191,36,0.15)'} />
                <polyline points={pts.join(' ')} fill="none"
                  stroke={isIso ? '#38bdf8' : '#fbbf24'} strokeWidth={3} />
              </>
            )}
            <circle cx={px(v1)} cy={py(p1)} r={5} fill="#f472b6" />
            <text x={px(v1) + 8} y={py(p1) - 8} fill="#f9a8d4" fontSize={10} fontFamily="monospace">
              1: {v1} L, {p1.toFixed(0)} kPa
            </text>
            <circle cx={px(v2)} cy={py(p2)} r={5} fill="#34d399" />
            <text x={px(v2) + 8} y={py(p2) - 8} fill="#6ee7b7" fontSize={10} fontFamily="monospace">
              2: {v2} L, {p2.toFixed(0)} kPa
            </text>
            <text x={px(30)} y={40} fill={isIso ? '#38bdf8' : '#fbbf24'} fontSize={12} fontWeight="bold" fontFamily="monospace">
              {isIso ? `isothermal T = ${tempK} K` : `adiabatic gamma = ${gamma.toFixed(3)}`}
            </text>
            <text x={px(30)} y={58} fill="#64748b" fontSize={10} fontFamily="monospace">
              shaded area = work = {Math.abs(work).toFixed(0)} J {work >= 0 ? '(by gas)' : '(on gas)'}
            </text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center gap-4">
            <svg width="150" height="70" viewBox="0 0 150 70">
              <rect x={10} y={10} width={130} height={50} fill="#0f172a" stroke="#475569" strokeWidth={2} rx={4} />
              <rect x={12} y={12} width={Math.max(8, (v2 / 50) * 124)} height={46} fill={isIso ? '#0369a1' : '#b45309'} opacity={0.7} />
              <rect x={12 + Math.max(8, (v2 / 50) * 124)} y={10} width={8} height={50} fill="#94a3b8" />
              <text x={70} y={40} textAnchor="middle" fill="#e2e8f0" fontSize={10} fontFamily="monospace">{v2} L, {tFinal.toFixed(0)} K</text>
            </svg>
            <div className="text-xs font-mono text-slate-400">
              <div className="text-amber-300 font-bold text-sm">First law: Delta U = Q - W</div>
              <div>Q = {qHeat.toFixed(0)} J &nbsp; W = {work.toFixed(0)} J &nbsp; Delta U = {deltaU.toFixed(0)} J</div>
              <div className="text-slate-500">Final T = {tFinal.toFixed(1)} K ({expansion ? 'expansion' : 'compression'})</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setProcess('isothermal')}
                className={`py-2 rounded-xl text-xs font-bold ${process === 'isothermal' ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Isothermal (slow)
              </button>
              <button onClick={() => setProcess('adiabatic')}
                className={`py-2 rounded-xl text-xs font-bold ${process === 'adiabatic' ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Adiabatic (insulated)
              </button>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Gas temperature T1</span><span className="font-mono font-bold text-rose-400">{tempK} K</span>
              </div>
              <input type="range" min={200} max={600} step={10} value={tempK} aria-label="Temperature"
                onChange={(e) => setTempK(Number(e.target.value))} className="w-full accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Start volume V1</span><span className="font-mono font-bold text-gold-400">{v1} L</span>
              </div>
              <input type="range" min={5} max={40} step={1} value={v1} aria-label="Initial volume"
                onChange={(e) => setV1(Number(e.target.value))} className="w-full accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>End volume V2</span><span className="font-mono font-bold text-emerald-400">{v2} L</span>
              </div>
              <input type="range" min={5} max={45} step={1} value={v2} aria-label="Final volume"
                onChange={(e) => setV2(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setGammaMode('mono')}
                className={`py-1.5 rounded-lg text-[11px] font-bold ${gammaMode === 'mono' ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Monatomic gamma 5/3
              </button>
              <button onClick={() => setGammaMode('di')}
                className={`py-1.5 rounded-lg text-[11px] font-bold ${gammaMode === 'di' ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Diatomic gamma 7/5
              </button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-rose-800/60 p-4 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">P1 = nRT1/V1</span><div className="text-rose-300 font-bold text-sm">{p1.toFixed(1)} kPa</div></div>
            <div><span className="text-slate-500">P2</span><div className="text-emerald-300 font-bold text-sm">{p2.toFixed(1)} kPa</div></div>
            <div className="col-span-2 text-[10px] text-slate-500 border-t border-slate-800 pt-2">
              {isIso
                ? 'W = nRT ln(V2/V1) = 8.314 x ' + tempK + ' x ln(' + (v2 / v1).toFixed(2) + ') = ' + workIso.toFixed(0) + ' J'
                : 'W = (P1V1 - P2V2)/(gamma - 1) = ' + workAdi.toFixed(0) + ' J, T2 = T1(V1/V2)^(gamma-1) = ' + t2Adi.toFixed(0) + ' K'}
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Isothermal: the gas stays at T1 because heat Q = W flows in -- the isotherm is the
              gentlest curve, so it delivers the MOST expansion work. Adiabatic: Q = 0, so the gas
              pays for the work out of its own internal energy and cools (Delta U = -W); the curve
              is steeper because PV^gamma = constant with gamma &gt; 1. Compression in reverse: the
              adiabatic pump heats your bicycle pump.
            </p>
          </div>

          <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
            <p className="font-bold text-rose-300 mb-1">What to try</p>
            <p>1. Double V at 300 K both ways: the isotherm returns Q = 1729 J; the adiabat cools to about 189 K (mono). Check both numbers appear.</p>
            <p>2. Compress (V2 smaller than V1) adiabatically with a diatomic gas -- why is the temperature rise smaller than for a monatomic one?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PhysicsThermodynamicsSim;
