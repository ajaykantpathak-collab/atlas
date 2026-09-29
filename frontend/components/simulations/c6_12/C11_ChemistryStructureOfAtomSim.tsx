'use client';

import React, { useState } from 'react';

/**
 * Class 11 Chemistry -- Structure of Atom
 * Bohr model: E_n = -13.6 Z^2 / n^2 eV; electron jumps emit/absorb photons with
 * real wavelengths that reproduce the Lyman, Balmer and Paschen series.
 * Self-contained: react + tailwind only.
 */

const SPECIES = [
  { z: 1, label: 'H', name: 'Hydrogen atom' },
  { z: 2, label: 'He+', name: 'He+ ion' },
  { z: 3, label: 'Li2+', name: 'Li2+ ion' },
];

const SERIES: Record<number, { name: string; region: string }> = {
  1: { name: 'Lyman', region: 'ultraviolet' },
  2: { name: 'Balmer', region: 'visible' },
  3: { name: 'Paschen', region: 'infrared' },
  4: { name: 'Brackett', region: 'infrared' },
  5: { name: 'Pfund', region: 'far infrared' },
};

function photonColor(nm: number): string {
  if (nm < 380) return '#8b5cf6';
  if (nm < 450) return '#6366f1';
  if (nm < 495) return '#06b6d4';
  if (nm < 570) return '#22c55e';
  if (nm < 590) return '#eab308';
  if (nm < 620) return '#f97316';
  if (nm <= 750) return '#ef4444';
  return '#78716c';
}

export function C11_ChemistryStructureOfAtomSim() {
  const [z, setZ] = useState(1);
  const [ni, setNi] = useState(3);
  const [nf, setNf] = useState(2);

  const energy = (n: number) => (-13.6 * z * z) / (n * n); // eV
  const eI = energy(ni);
  const eF = energy(nf);
  const emission = ni > nf;
  const dE = Math.abs(eI - eF); // eV
  const lambdaNm = 1240 / dE; // nm
  const freqTHz = (299792.458 / lambdaNm) * 1000 / 1000; // THz (c/lambda)
  const series = SERIES[Math.min(nf, 5)] || { name: 'n_f >= 6', region: 'far infrared' };
  const ieFromGround = 13.6 * z * z; // eV
  const color = photonColor(lambdaNm);

  // Orbit radii: true r_n proportional to n^2/Z; compress with sqrt for display
  const rOrbit = (n: number) => 14 + 26 * n * Math.sqrt(1 / z) * (z === 1 ? 1 : 0.85);
  const cx = 220;
  const cy = 165;
  const electronAngle = -0.6;
  const eX = cx + rOrbit(ni) * Math.cos(electronAngle);
  const eY = cy + rOrbit(ni) * Math.sin(electronAngle);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700 font-mono">e-</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 11 -- Structure of Atom</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Bohr Quantum Jumps and Real Spectral Lines</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 470 330" className="w-full">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <circle key={n} cx={cx} cy={cy} r={rOrbit(n)} fill="none"
                stroke={n === ni ? '#f472b6' : n === nf ? '#34d399' : '#1e293b'}
                strokeWidth={n === ni || n === nf ? 2.5 : 1.2} strokeDasharray={n === nf ? '5 4' : undefined} />
            ))}
            <circle cx={cx} cy={cy} r={9} fill="#fbbf24" />
            <text x={cx} y={cy + 24} textAnchor="middle" fill="#fbbf24" fontSize={10} fontFamily="monospace">nucleus +{z}</text>
            <circle cx={eX} cy={eY} r={7} fill={emission ? '#f472b6' : '#34d399'} />
            <text x={eX + 10} y={eY - 8} fill={emission ? '#f9a8d4' : '#6ee7b7'} fontSize={10} fontFamily="monospace">
              n={ni} ({eI.toFixed(2)} eV)
            </text>
            {emission && (() => {
              const x0 = cx + rOrbit(nf) * Math.cos(electronAngle);
              const y0 = cy + rOrbit(nf) * Math.sin(electronAngle);
              const mx = (eX + x0) / 2 + 46;
              const my = (eY + y0) / 2;
              let wave = `M ${eX} ${eY}`;
              for (let i = 1; i <= 8; i++) {
                wave += ` L ${eX + ((mx - eX) * i) / 8} ${eY + ((my - eY) * i) / 8 + (i % 2 === 0 ? -8 : 8)}`;
              }
              return (
                <g>
                  <path d={wave} fill="none" stroke={color} strokeWidth={2.5} />
                  <circle cx={x0} cy={y0} r={4} fill={color} opacity={0.9} />
                  <text x={mx + 14} y={my + 4} fill={color} fontSize={11} fontFamily="monospace" fontWeight="bold">
                    {lambdaNm.toFixed(1)} nm
                  </text>
                  <text x={cx + rOrbit(nf) * 0.35} y={cy + rOrbit(nf) + 16} fill="#6ee7b7" fontSize={10} fontFamily="monospace">
                    n={nf}: {eF.toFixed(2)} eV
                  </text>
                </g>
              );
            })()}
            {!emission && (
              <text x={cx} y={310} textAnchor="middle" fill="#f87171" fontSize={11} fontFamily="monospace">
                n_i &lt;= n_f: the electron must ABSORB {dE.toFixed(2)} eV to climb -- no photon emitted
              </text>
            )}
            <text x={20} y={30} fill="#64748b" fontSize={11} fontFamily="monospace">E_n = -13.6 Z^2 / n^2 eV</text>
            <text x={20} y={46} fill="#64748b" fontSize={11} fontFamily="monospace">1/lambda = R Z^2 (1/n_f^2 - 1/n_i^2)</text>
          </svg>

          <div className="mt-2 p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">Delta E emitted</span><div className="text-amber-300 font-bold text-sm">{emission ? dE.toFixed(3) + ' eV' : '-- (absorption)'}</div></div>
            <div><span className="text-slate-500">Wavelength</span><div className="font-bold text-sm" style={{ color: emission ? color : '#64748b' }}>{emission ? lambdaNm.toFixed(1) + ' nm' : '--'}</div></div>
            <div><span className="text-slate-500">Frequency</span><div className="text-gold-300 font-bold text-sm">{emission ? freqTHz.toFixed(0) + ' THz' : '--'}</div></div>
            <div><span className="text-slate-500">Spectral series</span><div className="text-gold-300 font-bold text-sm">{emission ? `${series.name} (${series.region})` : '--'}</div></div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {SPECIES.map((s) => (
                <button key={s.z} onClick={() => setZ(s.z)}
                  className={`py-2 rounded-xl text-xs font-bold ${z === s.z ? 'bg-gold-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                  {s.label}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Excited level n_i</span><span className="font-mono font-bold text-pink-400">{ni}</span>
              </div>
              <input type="range" min={2} max={8} step={1} value={ni} aria-label="Initial level"
                onChange={(e) => setNi(Number(e.target.value))} className="w-full accent-pink-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Final level n_f</span><span className="font-mono font-bold text-emerald-400">{nf}</span>
              </div>
              <input type="range" min={1} max={7} step={1} value={nf} aria-label="Final level"
                onChange={(e) => setNf(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div className="text-[11px] font-mono text-slate-400">
              {ni <= nf ? 'Set n_i above n_f to see emission.' : 'n_i > n_f: photon emitted.'}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
            <div className="text-gold-300 font-bold">Energy ladder ({SPECIES.find((s) => s.z === z)?.name})</div>
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex justify-between text-slate-400">
                <span>n={n}</span><span className={n === ni ? 'text-pink-400 font-bold' : n === nf ? 'text-emerald-400 font-bold' : ''}>{energy(n).toFixed(2)} eV</span>
              </div>
            ))}
            <div className="text-slate-500 border-t border-slate-800 pt-1">
              Ionization from ground = 13.6 x {z}^2 = <b className="text-amber-300">{ieFromGround.toFixed(1)} eV</b>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              Levels crowd together as n grows (spacing falls like 1/n^3), so Lyman lines (to n=1)
              bunch in the UV while Balmer lines (to n=2) spread across the visible. Heavier
              hydrogen-like ions scale ALL energies by Z^2: He+ emits 4x the photon energy -- its
              Balmer alpha lands at 121 nm, deep in the ultraviolet.
            </p>
          </div>

          <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
            <p className="font-bold text-gold-300 mb-1">What to try</p>
            <p>1. Reproduce the four visible Balmer lines of hydrogen (n_f = 2, n_i = 3,4,5,6) -- the display should show 656, 486, 434, 410 nm.</p>
            <p>2. Choose Li2+ with n_i = 2, n_f = 1: compute the photon energy by hand as 13.6 x 9 x (1 - 1/4) = 91.8 eV and check the wavelength.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_ChemistryStructureOfAtomSim;
