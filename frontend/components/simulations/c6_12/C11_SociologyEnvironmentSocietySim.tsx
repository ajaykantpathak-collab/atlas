'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'This village pasture is a COMMON RESOURCE -- nobody owns it, everybody uses it. Each herder thinks: ' +
  '"one more cow costs me nothing." But the grass is one shared pool. Watch what happens to the grass, ' +
  'the cows and EVERY family\'s income when everyone pushes a little more. Environment problems are ' +
  'social problems: they are made by many small decisions, not one villain.';

const HERDER_OPTIONS = [4, 8, 12];

export function C11_SociologyEnvironmentSocietySim() {
  const [herdPerHerder, setHerdPerHerder] = useState(4);
  const [herders, setHerders] = useState(4);
  const [monsoon, setMonsoon] = useState(70); // regrowth rate 0-100
  const [hasVillageRule, setHasVillageRule] = useState(false);
  const [grass, setGrass] = useState(80);
  const [cattleHealth, setCattleHealth] = useState(100);
  const [yearsPassed, setYearsPassed] = useState(0);
  const [history, setHistory] = useState<{ y: number; g: number }[]>([]);

  const sustainableTotal = useMemo(
    () => Math.round((monsoon / 100) * 28), // max stocking the pasture can hold long-run
    [monsoon]
  );
  // Panchayat rule caps each family's herd so the village total stays within the
  // pasture's sustainable stocking -- the rule must change the numbers, not just the label.
  const ruleCap = Math.max(1, Math.floor(sustainableTotal / herders));
  const effectiveHerd = hasVillageRule ? Math.min(herdPerHerder, ruleCap) : herdPerHerder;
  const totalCattle = effectiveHerd * herders;
  const isOverStocked = totalCattle > sustainableTotal;
  const isCapped = hasVillageRule && effectiveHerd < herdPerHerder;

  // Advance one year: logistic regrowth minus grazing
  const advanceYear = () => {
    const regrow = (monsoon / 100) * 0.9 * grass * (1 - grass / 100) * 1.6;
    const grazing = totalCattle * 0.018;
    const newGrass = Math.max(2, Math.min(100, grass + regrow - grazing));
    // cattle health tracks how full the grazing ground is
    const newHealth = Math.max(10, Math.min(100, Math.round((newGrass / 60) * 100)));
    setGrass(Math.round(newGrass * 10) / 10);
    setCattleHealth(newHealth);
    setYearsPassed((y) => y + 1);
    setHistory((h) => [...h.slice(-11), { y: yearsPassed + 1, g: Math.round(newGrass) }]);
  };

  const incomePerFamily = Math.round((effectiveHerd * cattleHealth) / 100 * 10) / 10;
  const villageIncome = Math.round(incomePerFamily * herders * 10) / 10;
  const grassColor = grass > 55 ? '#34d399' : grass > 25 ? '#fbbf24' : '#f87171';

  const reset = () => {
    setGrass(80);
    setCattleHealth(100);
    setYearsPassed(0);
    setHistory([]);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">The Village Pasture: A Commons Experiment</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Pasture visual */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 240" className="w-full">
            <rect x={20} y={30} width={360} height={150} rx={12} fill="#0f172a" stroke="#334155" />
            {/* grass field fill height shows grass stock */}
            <rect
              x={20}
              y={180 - (grass / 100) * 150}
              width={360}
              height={(grass / 100) * 150}
              rx={12}
              fill={grassColor}
              opacity={0.45}
              style={{ transition: 'all 0.3s' }}
            />
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <g key={i} transform={`translate(${60 + i * 56},${120 + (i % 2) * 26})`}>
                <line x1={0} y1={0} x2={0} y2={-14} stroke={grassColor} strokeWidth={2} opacity={0.9} />
                <line x1={0} y1={-6} x2={-6} y2={-12} stroke={grassColor} strokeWidth={2} opacity={0.9} />
                <line x1={0} y1={-6} x2={6} y2={-12} stroke={grassColor} strokeWidth={2} opacity={0.9} />
              </g>
            ))}
            {/* cow icons scaled by herd */}
            {Array.from({ length: Math.min(12, Math.ceil(totalCattle / 4)) }, (_, i) => (
              <text key={i} x={45 + i * 28} y={165} fontSize={16}>
                🐄
              </text>
            ))}
            <text x={200} y={20} textAnchor="middle" fill="#e2e8f0" fontSize={13} fontWeight="bold">
              Grass left: {grass}% {isOverStocked && <tspan fill="#f87171">-- overstocked!</tspan>}
            </text>
            <text x={200} y={205} textAnchor="middle" fill="#94a3b8" fontSize={12}>
              Sustainable for this pasture: about {sustainableTotal} cattle total
            </text>
          </svg>
          {/* history */}
          <div className="mt-2 flex items-end gap-1 h-14 border-t border-slate-800 pt-2">
            {history.length === 0 && <span className="text-xs text-slate-500">Press Advance a year to watch the grass.</span>}
            {history.map((r, i) => (
              <div
                key={i}
                title={`Year ${r.y}: grass ${r.g}%`}
                className="flex-1 rounded-t"
                style={{ height: `${r.g}%`, background: r.g > 55 ? '#34d399' : r.g > 25 ? '#fbbf24' : '#f87171', transition: 'height 0.3s' }}
              />
            ))}
          </div>
        </div>

        {/* Live working */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live village accounts</div>
          <div className="text-slate-300">
            Herders x herd each: {herders} x {effectiveHerd}
            {isCapped && <span className="text-gold-300"> (capped from {herdPerHerder})</span>} = <span className="font-mono text-gold-300">{totalCattle}</span> cattle
          </div>
          <div className="text-slate-300">
            Cattle health: <span className="font-mono text-amber-300">{cattleHealth}%</span> (tracks grass left)
          </div>
          <div className="text-slate-300">
            Income per family: <span className="font-mono text-emerald-300">{incomePerFamily}</span> units/year
          </div>
          <div className="text-slate-300">
            Whole village income: <span className="font-mono text-emerald-300 font-bold">{villageIncome}</span> units/year
          </div>
          <div className="text-slate-300">Years passed: {yearsPassed}</div>
          {hasVillageRule ? (
            <div className="text-emerald-400 text-xs pt-1">Village panchayat rule ON: each family is capped at {ruleCap} cattle (sustainable total {sustainableTotal}). Grazing drops, the grass recovers, income stabilises.</div>
          ) : (
            <div className="text-rose-400 text-xs pt-1">
              No rule: every family gains by adding one more cow -- until the shared grass is gone and ALL lose. This is the tragedy of the commons.
            </div>
          )}
          <div className="text-amber-300 text-xs pt-1 border-t border-slate-800">
            Misconception check: richer grass is NOT wasted grass. Leaving grass uncut this year is what makes next year&apos;s herd fatter.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Cattle per herder</span>
            <span className="font-mono font-bold text-gold-300">{herdPerHerder}{isCapped ? ' -> ' + effectiveHerd : ''}</span>
          </label>
          <input type="range" aria-label="cattle per herder" min={1} max={12} value={herdPerHerder} onChange={(e) => setHerdPerHerder(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300">Number of herder families</label>
          <div className="flex gap-2 mt-2">
            {HERDER_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => setHerders(n)}
                className={`flex-1 min-h-11 rounded-xl text-sm font-semibold border ${herders === n ? 'bg-gold-600 border-gold-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Monsoon strength (grass regrowth)</span>
            <span className="font-mono font-bold text-emerald-300">{monsoon}%</span>
          </label>
          <input type="range" aria-label="monsoon strength" min={10} max={100} value={monsoon} onChange={(e) => { setMonsoon(Number(e.target.value)); }} className="w-full mt-2 accent-emerald-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 flex flex-col justify-between">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Panchayat rule: cap herds</span>
            <span className={`font-mono font-bold ${hasVillageRule ? 'text-emerald-300' : 'text-rose-300'}`}>{hasVillageRule ? 'ON' : 'OFF'}</span>
          </label>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => setHasVillageRule((v) => !v)}
              className="flex-1 min-h-11 rounded-xl text-sm font-semibold border bg-slate-900 border-slate-600 hover:bg-slate-700"
            >
              Toggle rule
            </button>
            <button onClick={advanceYear} className="flex-1 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
              Advance 1 year
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => { setHerders(4); setHerdPerHerder(3); setHasVillageRule(true); }}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-emerald-600 border-emerald-400 hover:bg-emerald-500"
        >
          Play a cooperative village
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset pasture
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Set 8 families x 6 cattle, keep the rule OFF, and press Advance 1 year five times. What happens to EACH family&apos;s income -- even the ones who did not add cattle?</li>
          <li>Now switch the rule ON and reset. Compare village income after 5 years. Why does every family end up richer under a rule that limits each one?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologyEnvironmentSocietySim;
