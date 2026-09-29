'use client';
/**
 * C11_HomeScienceFabricCareSim (Class 11 Home Science)
 *
 * ELI5: every fibre has a breaking point. Cotton shrugs off 60 degree C water
 * and a hard spin; wool FELTS at 40 degree C with agitation -- the scales on
 * its fibres lock together and the sweater becomes a doll's sweater. Silk and
 * rayon lose strength when wet. Set the wash wrong and watch the garment pay.
 */

import React, { useState } from 'react';

// ─── Knowledge-graph node wiring ───
const NODE_C11_HOME_027 = 'c11_home_027'; // Laundering of Cotton and Linen
const NODE_C11_HOME_028 = 'c11_home_028'; // Laundering of Wool, Silk and Rayon
const NODE_C11_HOME_029 = 'c11_home_029'; // Finishing and Storage of Clothes
const NODE_C11_HOME_030 = 'c11_home_030'; // Household Methods of Stain Removal
export const ALL_NODE_IDS = [NODE_C11_HOME_027, NODE_C11_HOME_028, NODE_C11_HOME_029, NODE_C11_HOME_030];

type Fibre = 'cotton' | 'wool' | 'silk' | 'rayon';
type Dry = 'line' | 'flat' | 'tumble';

interface FibreInfo {
  name: string;
  maxTemp: number;   // deg C safe wash ceiling
  agitHurt: number;  // damage points per agitation step
  dryHurt: number;   // damage points if tumble dried
  shrinkMax: number; // worst-case shrinkage %
  note: string;
}

const FIBRES: Record<Fibre, FibreInfo> = {
  cotton: { name: 'Cotton', maxTemp: 60, agitHurt: 0.6, dryHurt: 3, shrinkMax: 6, note: 'strongest when wet -- survives hot washes and hard spins' },
  wool:   { name: 'Wool', maxTemp: 30, agitHurt: 3.2, dryHurt: 12, shrinkMax: 35, note: 'scales lock (felting) with heat + rubbing -- never tumble' },
  silk:   { name: 'Silk', maxTemp: 30, agitHurt: 2.0, dryHurt: 10, shrinkMax: 15, note: 'loses 20% strength when wet -- gentle wash, shade dry' },
  rayon:  { name: 'Rayon', maxTemp: 40, agitHurt: 2.4, dryHurt: 8, shrinkMax: 20, note: 'weakest when wet -- no wringing, no tumble' },
};

const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

export function C11_HomeScienceFabricCareSim() {
  const [fibre, setFibre] = useState<Fibre>('wool');
  const [temp, setTemp] = useState(30);
  const [agitation, setAgitation] = useState(2);
  const [drying, setDrying] = useState<Dry>('flat');
  const [washes, setWashes] = useState(0);

  const f = FIBRES[fibre];

  // damage model: heat over the ceiling, agitation, and wrong drying stack up
  const perWash =
    Math.max(0, temp - f.maxTemp) * 1.8 +
    agitation * f.agitHurt +
    (drying === 'tumble' ? f.dryHurt : 0) +
    (fibre === 'silk' && drying === 'line' && temp > 40 ? 4 : 0); // sun-heat on wet silk
  const totalDamage = clamp(perWash * Math.max(washes, 0) / 10, 0, 100);
  const shrink = clamp((totalDamage / 100) * f.shrinkMax, 0, f.shrinkMax);

  const condition =
    totalDamage < 10 ? { label: 'like new', col: '#34d399' }
    : totalDamage < 30 ? { label: 'slightly worn', col: '#fbbf24' }
    : totalDamage < 60 ? { label: 'shrunken / felted', col: '#fb923c' }
    : { label: 'ruined', col: '#f43f5e' };

  const reset = () => { setTemp(30); setAgitation(2); setDrying('flat'); setWashes(0); };

  const gx = 60 + (shrink / f.shrinkMax) * 55; // garment grows "smaller" inside the frame
  const gy = 40 + (shrink / f.shrinkMax) * 38;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-pink-950/80 rounded-2xl border border-pink-700">🧺</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-pink-400">Class 11 Home Science -- Care and Maintenance of Fabrics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">One Wrong Wash: Why Wool Hates Heat</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        {/* visualization */}
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3 space-y-3">
          <svg viewBox="0 0 400 250" className="w-full">
            <rect x={0} y={0} width={400} height={250} rx={10} fill="#0b1220" />
            <text x={12} y={18} fontSize={10} fill="#64748b">washing tub -- the garment shrinks as damage builds</text>
            {/* water line */}
            <rect x={20} y={200} width={360} height={36} rx={8} fill="#0ea5e9" opacity={0.15 + Math.min(temp, 90) / 400} />
            <text x={24} y={222} fontSize={10} fill="#7dd3fc">water {temp} °C {temp > f.maxTemp ? '-- ABOVE this fibre\'s safe ceiling' : '-- safe range'}</text>
            {/* garment */}
            <g className="transition-all duration-500">
              <rect x={gx} y={gy} width={400 - 2 * gx} height={250 - 2 * gy - 30} rx={18}
                fill={fibre === 'wool' ? '#a78bfa' : fibre === 'silk' ? '#f9a8d4' : fibre === 'rayon' ? '#67e8f9' : '#fca5a5'}
                opacity={0.9} stroke={condition.col} strokeWidth={3} />
              <rect x={gx + 30} y={gy} width={400 - 2 * gx - 60} height={26} rx={8} fill="#0b1220" opacity={0.5} />
              <text x={200} y={125} fontSize={12} textAnchor="middle" fill="#0f172a" fontWeight="bold">{f.name}</text>
            </g>
            {/* steam when hot */}
            {temp > f.maxTemp && (
              <text x={352} y={60} fontSize={20} fill="#fca5a5" className="animate-pulse">♨</text>
            )}
          </svg>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Water temp</p>
              <p className={`font-mono font-bold ${temp > f.maxTemp ? 'text-rose-300' : 'text-gold-300'}`}>{temp} °C</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Shrinkage</p>
              <p className="font-mono font-bold text-amber-300">{shrink.toFixed(1)} %</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Washes run</p>
              <p className="font-mono font-bold text-slate-200">{washes}</p>
            </div>
          </div>

          <div className="rounded-xl border p-2 text-xs leading-relaxed" style={{ borderColor: condition.col + '55', color: condition.col, background: condition.col + '11' }}>
            Condition after {washes} wash(es): {condition.label}. {f.note}.
          </div>
        </div>

        {/* controls */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Fabric</p>
              <div className="grid grid-cols-4 gap-2">
                {(Object.keys(FIBRES) as Fibre[]).map((k) => (
                  <button key={k} onClick={() => { setFibre(k); setWashes(0); }}
                    className={`min-h-11 rounded-xl text-[10px] font-bold capitalize ${fibre === k ? 'bg-pink-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {k}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Wash temperature</span>
                <span className="font-mono font-bold text-gold-400">{temp} °C (safe ≤ {f.maxTemp} °C)</span>
              </div>
              <input type="range" min={5} max={90} step={5} value={temp} aria-label="wash temperature"
                onChange={(e) => setTemp(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Agitation (rubbing / spin)</span>
                <span className="font-mono font-bold text-gold-400">{agitation} / 10</span>
              </div>
              <input type="range" min={0} max={10} step={1} value={agitation} aria-label="agitation level"
                onChange={(e) => setAgitation(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Drying method</p>
              <div className="grid grid-cols-3 gap-2">
                {(['line', 'flat', 'tumble'] as Dry[]).map((d) => (
                  <button key={d} onClick={() => setDrying(d)}
                    className={`min-h-11 rounded-xl text-[10px] font-bold ${drying === d ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {d === 'line' ? 'Line / sun' : d === 'flat' ? 'Flat dry' : 'Tumble'}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setWashes((w) => w + 1)} className="min-h-11 rounded-xl text-xs font-bold bg-pink-500 text-slate-950">
                Run a wash
              </button>
              <button onClick={reset} className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Hot water cleans better, so hotter is always better.&quot; For cotton yes -- for wool it is a disaster: heat plus
              rubbing makes the fibre scales interlock (felting) and the shrinkage is permanent. And a tumble dryer damages wool
              about {FIBRES.wool.dryHurt}x more per wash than a flat dry.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Pick Wool, set 60 °C and agitation 8, then run 3 washes. Now reset and wash the same sweater at 30 °C, agitation 1 -- compare the shrinkage.</p>
            <p>2. Find the hottest wash silk survives with zero tumble damage. Which is the real limit: temperature, rubbing, or the dryer?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HomeScienceFabricCareSim;
