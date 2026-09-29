'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Composition and Structure of Atmosphere
 * ONE concept: air is a gas mixture (fixed + variable gases) wrapped in
 * thermal layers. Probe the profile, change the mix, watch the layers hold.
 * Self-contained, react + tailwind only.
 */

const DRY = { n2: 78.08, o2: 20.95, ar: 0.93, co2: 0.04 }; // percent by volume

function layerOf(km: number) {
  if (km < 12) return { name: 'Troposphere', color: '#0ea5e9', note: 'weather lives here, temp falls' };
  if (km < 50) return { name: 'Stratosphere', color: '#8b5cf6', note: 'ozone absorbs UV, temp rises' };
  if (km < 80) return { name: 'Mesosphere', color: '#ec4899', note: 'coldest layer, meteors burn' };
  return { name: 'Thermosphere', color: '#f59e0b', note: 'thin air, temp soars' };
}

// temperature profile (deg C) vs altitude km, standard atmosphere style
function tempAt(km: number, co2ppm: number) {
  const gh = (co2ppm - 280) / 280; // mild warming of the lowest layers
  if (km < 12) return 15 - 6.5 * km + gh * 2.5 * (1 - km / 12);
  if (km < 50) return -63 + (km - 12) * 1.1;
  if (km < 80) return 2 - (km - 50) * 2.6;
  return 260 * (1 + (km - 80) / 40) - 260 + -86 + (km - 80) * 3.4;
}

export function C11_GeographyAtmosphereCompositionSim() {
  const [km, setKm] = useState(8);
  const [co2, setCo2] = useState(280);
  const [vapor, setVapor] = useState(0); // variable gas, 0-4%
  const [pieView, setPieView] = useState<'dry' | 'humid'>('dry');

  const mix = useMemo(() => {
    const scale = (100 - vapor) / 100;
    return {
      n2: DRY.n2 * scale,
      o2: DRY.o2 * scale,
      ar: DRY.ar * scale,
      co2: (co2 / 1e6) * 100,
      h2o: vapor
    };
  }, [co2, vapor]);

  const layer = layerOf(km);
  const t = tempAt(km, co2);
  const pressure = 1013.25 * Math.exp(-km / 8.4); // hPa, scale height 8.4 km

  // donut geometry
  const slices = [
    { k: 'N2', v: mix.n2, c: '#38bdf8' },
    { k: 'O2', v: mix.o2, c: '#34d399' },
    { k: 'Ar', v: mix.ar, c: '#a78bfa' },
    { k: 'CO2', v: mix.co2, c: '#f43f5e' },
    { k: 'H2O', v: mix.h2o, c: '#fbbf24' }
  ];
  const total = slices.reduce((s, x) => s + x.v, 0);
  let acc = 0;
  const R = 52, CX = 90, CY = 90;
  const donut = slices.map((s) => {
    const a0 = (acc / total) * 2 * Math.PI;
    acc += s.v;
    const a1 = (acc / total) * 2 * Math.PI;
    const big = a1 - a0 > Math.PI ? 1 : 0;
    const p = [
      `M ${CX + R * Math.sin(a0)} ${CY - R * Math.cos(a0)}`,
      `A ${R} ${R} 0 ${big} 1 ${CX + R * Math.sin(a1)} ${CY - R * Math.cos(a1)}`
    ].join(' ');
    return { ...s, path: p };
  });

  const py = 260 - (km / 100) * 240; // altitude -> svg y

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🎈</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Composition and Structure of Atmosphere</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Probe the Air: What It Is Made Of, Layer by Layer</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            {/* layer bands */}
            {[
              { y0: 260, y1: 171, c: 'rgba(14,165,233,0.12)' },
              { y0: 171, y1: 40, c: 'rgba(139,92,246,0.12)' },
              { y0: 40, y1: 16, c: 'rgba(236,72,153,0.12)' },
              { y0: 16, y1: 20, c: 'rgba(245,158,11,0.12)' }
            ].map((b, i) => (
              <rect key={i} x={210} y={b.y0 < b.y1 ? b.y0 : b.y1} width={120}
                height={Math.abs(b.y0 - b.y1) || 4} fill={b.c} />
            ))}
            {/* temperature curve: sample profile */}
            <path d={Array.from({ length: 41 }, (_, i) => {
              const z = (i / 40) * 100;
              const y = 260 - (z / 100) * 240;
              const x = 270 + Math.max(-58, Math.min(80, tempAt(z, co2))) * 1.1;
              return `${i === 0 ? 'M' : 'L'} ${x.toFixed(1)},${y.toFixed(1)}`;
            }).join(' ')} fill="none" stroke="#fbbf24" strokeWidth={2.5} />
            {/* probe */}
            <g className="transition-all duration-300" style={{ transform: `translateY(${py - 260}px)` }}>
              <line x1={210} y1={260} x2={330} y2={260} stroke="#f472b6" strokeDasharray="3 3" />
              <circle cx={270 + Math.max(-58, Math.min(80, t)) * 1.1} cy={260} r={5} fill="#f472b6" />
              <text x={336} y={264} fontSize={11} fill="#f472b6" fontFamily="monospace">{t.toFixed(0)} C</text>
            </g>
            <text x={214} y={278} fontSize={9} fill="#64748b">0 km</text>
            <text x={214} y={24} fontSize={9} fill="#64748b">100 km</text>
            <text x={244} y={222} fontSize={9} fill="#0ea5e9">Tropo</text>
            <text x={244} y={100} fontSize={9} fill="#8b5cf6">Strato (ozone)</text>
            {/* donut */}
            {donut.map((d, i) => (
              <path key={i} d={d.path} stroke={d.c} strokeWidth={14} fill="none" strokeLinecap="butt"
                className="transition-all duration-500" />
            ))}
            <text x={CX} y={88} textAnchor="middle" fontSize={13} fill="#e2e8f0" fontFamily="monospace">
              {pieView === 'dry' ? 'dry air' : 'humid air'}
            </text>
            <text x={CX} y={104} textAnchor="middle" fontSize={9} fill="#94a3b8">
              {slices.filter((s) => s.v > 0.05).map((s) => `${s.k} ${s.v.toFixed(2)}%`).join(' ')}
            </text>
            {/* live probe readout */}
            <text x={352} y={240} fontSize={10} fill="#94a3b8">probe {km} km</text>
            <text x={352} y={256} fontSize={11} fill="#f472b6" fontFamily="monospace">{layer.name}</text>
            <text x={352} y={272} fontSize={10} fill="#38bdf8" fontFamily="monospace">{pressure.toFixed(0)} hPa</text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Layer at probe</p>
              <p className="font-mono font-bold text-pink-400">{layer.name}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Temperature</p>
              <p className="font-mono font-bold text-amber-300">{t.toFixed(1)} C</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Pressure</p>
              <p className="font-mono font-bold text-gold-300">{pressure.toFixed(0)} hPa</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Probe altitude</span><span className="font-mono font-bold text-pink-400">{km} km</span>
              </div>
              <input type="range" min={0} max={100} step={1} value={km} aria-label="altitude"
                onChange={(e) => setKm(Number(e.target.value))} className="w-full min-h-11 accent-pink-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>CO2</span><span className="font-mono font-bold text-rose-400">{co2} ppm</span>
              </div>
              <input type="range" min={280} max={800} step={10} value={co2} aria-label="carbon dioxide"
                onChange={(e) => setCo2(Number(e.target.value))} className="w-full min-h-11 accent-rose-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Water vapor (variable gas)</span><span className="font-mono font-bold text-amber-400">{vapor.toFixed(1)}%</span>
              </div>
              <input type="range" min={0} max={4} step={0.1} value={vapor} aria-label="water vapor"
                onChange={(e) => setVapor(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setPieView(pieView === 'dry' ? 'humid' : 'dry')}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
                Show {pieView === 'dry' ? 'humid' : 'dry'} mix
              </button>
              <button onClick={() => { setKm(8); setCo2(280); setVapor(0); setPieView('dry'); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;The layers are stacked like boxes of different gases.&quot; No -- the mix (N2 78%,
              O2 21%) is nearly uniform by turbulence up to ~80 km; only the TEMPERATURE curve bends,
              and that bend is what draws each layer boundary. Ozone heating flips the curve in the
              stratosphere.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Ride the probe from 0 to 100 km. Count the temperature direction changes (falls-rises-falls-rises). Those flips ARE the layer boundaries.</p>
            <p>2. Push water vapor to 4% (tropical air). Which two slices shrink to make room, and by how much?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyAtmosphereCompositionSim;
