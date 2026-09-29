'use client';
/**
 * C8_ScienceTheAmazingWorldOfSolutesSim (Class 8 Science)
 *
 * ELI5: A solution is a solute dissolved in a solvent. There is a LIMIT to
 * how much can dissolve - the solubility - and it usually RISES with
 * temperature. Cross the limit and extra solute just sits at the bottom.
 * Dilution spreads the same solute through more water, lowering concentration.
 */
import React, { useState } from 'react';

export function C8_ScienceTheAmazingWorldOfSolutesSim() {
  const [solute, setSolute] = useState(12); // spoons
  const [water, setWater] = useState(200); // mL
  const [temp, setTemp] = useState(25); // deg C
  const [stirred, setStirred] = useState(false);

  // sugar-like solubility: about 200 g per 100 mL at 25 C rising with T
  const maxDissolved = Math.round((2.2 * (water / 50)) * (1 + 0.025 * (temp - 25)) * 10) / 10;
  const dissolved = Math.min(solute, maxDissolved);
  const undissolved = Math.max(0, solute - dissolved);
  const concentration = Math.round((dissolved / (water / 100)) * 10) / 10;
  const status = undissolved > 0.01 ? 'SATURATED (some solute left over)' : 'UNSATURATED (all dissolved)';

  const fillPct = Math.min(100, (dissolved / Math.max(solute, 0.01)) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">The Amazing World of Solutes, Solvents and Solutions</h1>

      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Dissolving rules:</span> the solvent (water)
          pulls solute (sugar) particles apart and hides them between its own molecules. Each
          temperature has a maximum that fits - cross it and the extra stays visible at the bottom
          no matter how long you stir. Heating widens the limit; dilution lowers the concentration
          (solute per 100 mL) but never changes how much solute you added.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Solute added (spoons of sugar)</span><span className="font-mono text-gold-600">{solute}</span></label>
            <input type="range" min={0} max={30} value={solute} aria-label="solute" onChange={(e) => { setSolute(Number(e.target.value)); setStirred(false); }} className="w-full mt-1 accent-gold-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Water (mL)</span><span className="font-mono text-gold-600">{water}</span></label>
            <input type="range" min={50} max={500} step={25} value={water} aria-label="water" onChange={(e) => setWater(Number(e.target.value))} className="w-full mt-1 accent-gold-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Temperature (deg C)</span><span className="font-mono text-rose-600">{temp}</span></label>
            <input type="range" min={5} max={80} value={temp} aria-label="temperature" onChange={(e) => setTemp(Number(e.target.value))} className="w-full mt-1 accent-rose-600" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setStirred(true)} className="px-4 py-2 rounded-xl text-sm font-bold bg-gold-600 text-white hover:bg-gold-500 transition-all">
              Stir!
            </button>
            <button onClick={() => { setSolute(12); setWater(200); setTemp(25); setStirred(false); }} className="px-4 py-2 rounded-xl text-sm font-bold bg-slate-200 hover:bg-slate-300 transition-all">
              Clean beaker
            </button>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>can dissolve up to: <span className="font-bold text-gold-700">{maxDissolved} spoons</span> at this temperature</div>
            <div>dissolved now: <span className="font-bold text-emerald-700">{Math.round(dissolved * 10) / 10}</span> / undissolved: <span className="font-bold text-amber-700">{Math.round(undissolved * 10) / 10}</span></div>
            <div>concentration: <span className="font-bold text-gold-700">{concentration} spoons per 100 mL</span></div>
            <div className="text-xs font-sans mt-1" style={{ color: undissolved > 0.01 ? '#b45309' : '#059669' }}>{status}</div>
          </div>
        </div>

        <div className="p-2 bg-gradient-to-b from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 260 300" className="w-full">
            {/* beaker */}
            <path d="M 70 40 L 70 250 Q 70 262 82 262 L 178 262 Q 190 262 190 250 L 190 40" fill="none" stroke="#475569" strokeWidth={4} />
            {/* liquid */}
            <rect x={72} y={100} width={116} height={160} fill="#7dd3fc" opacity={0.65} rx={6} style={{ transition: 'all 300ms' }} />
            <text x={130} y={120} textAnchor="middle" fontSize="10" fill="#0c4a6e">water {water} mL</text>
            {/* dissolved tint deepens with concentration */}
            <rect x={72} y={100} width={116} height={160} fill="#eab308" opacity={Math.min(0.55, concentration / 25)} rx={6} style={{ transition: 'all 300ms' }} />
            {/* undissolved pile at bottom */}
            {undissolved > 0.01 && (
              <g>
                <ellipse cx={130} cy={258} rx={Math.min(52, 14 + undissolved * 3)} ry={Math.min(14, 4 + undissolved)} fill="#f5d576" stroke="#b45309" style={{ transition: 'all 300ms' }} />
                <text x={130} y={252} textAnchor="middle" fontSize="9" fill="#78350f">settled: {Math.round(undissolved * 10) / 10}</text>
              </g>
            )}
            {stirred && undissolved > 0.01 && (
              <text x={130} y={92} textAnchor="middle" fontSize="9" fill="#b45309">stirring cannot dissolve past the limit!</text>
            )}
            {stirred && undissolved <= 0.01 && (
              <text x={130} y={92} textAnchor="middle" fontSize="9" fill="#047857">fully dissolved - a true solution</text>
            )}
            {/* thermometer */}
            <rect x={222} y={60} width={8} height={180} rx={4} fill="#e2e8f0" />
            <rect x={222} y={240 - (temp / 80) * 180} width={8} height={(temp / 80) * 180} rx={4} fill="#ef4444" style={{ transition: 'all 300ms' }} />
            <circle cx={226} cy={244} r={9} fill="#ef4444" />
            <text x={236} y={54} fontSize="9" fill="#e11d48">{temp} deg</text>
            <text x={130} y={290} textAnchor="middle" fontSize="10" fill="#475569">dissolved share of added solute: {Math.round(fillPct)}%</text>
          </svg>
        </div>
      </div>

      <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
        <p className="text-xs font-bold text-slate-500 mb-2">SPEAK LIKE A CHEMIST</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-slate-600">
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-gold-700">Solute + solvent = solution.</span> Sugar is the solute, water the solvent, sherbet the solution.
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-gold-700">Dilute vs concentrated.</span> Same beaker, fewer spoons per 100 mL = dilute; more = concentrated.
          </div>
          <div className="p-2 bg-white rounded-xl border border-slate-200">
            <span className="font-bold text-amber-700">Saturated.</span> The moment extra solute refuses to dissolve, the solution is full for that temperature.
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Make a saturated solution at 25 deg C: how many spoons sit at the bottom? Warm to 60 deg - how many vanish? (That is why warm syrup holds more sugar.)</li>
          <li>Keep solute fixed at 10 spoons and dilute water from 100 to 400 mL: watch concentration fall by how many times?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceTheAmazingWorldOfSolutesSim;
