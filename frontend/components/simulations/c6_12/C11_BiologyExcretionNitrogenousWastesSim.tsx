'use client';
/**
 * C11_BiologyExcretionNitrogenousWastesSim (Class 11 Biology)
 *
 * ELI5: Breaking down proteins always makes AMMONIA -- the real poison. Animals
 * pay ATP to repackage it as urea or uric acid, trading energy for water.
 * Excreting 1 g of nitrogen costs ~500 mL water as ammonia, ~50 mL as urea,
 * ~10 mL as uric acid paste. Pick a mode, shrink the habitat water, and see
 * who survives -- and why a tadpole changes its waste when it becomes a frog.
 */
import React, { useEffect, useState } from 'react';

// ─── Knowledge-graph node wiring ───
const NODE_C11_BIO_052 = 'c11_bio_052'; // Excretory system and nephron structure
const NODE_C11_BIO_055 = 'c11_bio_055'; // Excretory disorders and dialysis
export const ALL_NODE_IDS = [NODE_C11_BIO_052, NODE_C11_BIO_055];

type Mode = 'ammonia' | 'urea' | 'uric';
interface ModeInfo { name: string; water: number; toxicity: string; atp: number; col: string }
const MODES: Record<Mode, ModeInfo> = {
  ammonia: { name: 'Ammonia (ammonotelic)', water: 500, toxicity: 'most toxic', atp: 0, col: '#f43f5e' },
  urea: { name: 'Urea (ureotelic)', water: 50, toxicity: 'less toxic', atp: 1, col: '#f59e0b' },
  uric: { name: 'Uric acid (uricotelic)', water: 10, toxicity: 'least toxic', atp: 3, col: '#34d399' },
};
interface Animal { name: string; mode: Mode; water: number; note: string }
const ANIMALS: Animal[] = [
  { name: 'Rohu (bony fish)', mode: 'ammonia', water: 500, note: 'surrounded by water, flushes ammonia straight through gills' },
  { name: 'Tadpole', mode: 'ammonia', water: 500, note: 'aquatic larva -- like a fish' },
  { name: 'Adult frog', mode: 'urea', water: 60, note: 'lives on land between ponds; liver converts ammonia to urea' },
  { name: 'Human', mode: 'urea', water: 60, note: 'kidneys save water; urea leaves in about 1.5 L of urine' },
  { name: 'Crow', mode: 'uric', water: 15, note: 'flying light: no bladder, paste saves water and weight' },
  { name: 'Garden lizard', mode: 'uric', water: 12, note: 'dry skin, dry habitat: excretes a chalky pellet' },
];

export function C11_BiologyExcretionNitrogenousWastesSim() {
  const [mode, setMode] = useState<Mode>('ammonia');
  const [animal, setAnimal] = useState(1); // tadpole
  const [water, setWater] = useState(500); // mL of water the animal can spare per day
  const [grams, setGrams] = useState(1.0); // g of nitrogenous waste per day
  const [t, setT] = useState(0);

  useEffect(() => {
    let raf = 0;
    const tick = () => { setT((v) => v + 0.016); raf = requestAnimationFrame(tick); };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const m = MODES[mode];
  const needed = m.water * grams;            // mL/day of water to flush the waste
  const safe = water >= needed;
  const bar = (mL: number) => Math.min(100, (Math.sqrt(mL) / Math.sqrt(600)) * 100);
  const dropY = safe ? ((t * 40) % 46) : 0;
  const isTadpole = ANIMALS[animal].name === 'Tadpole';

  const pickAnimal = (i: number) => { setAnimal(i); setMode(ANIMALS[i].mode); setWater(ANIMALS[i].water); };
  const growUp = () => { pickAnimal(2); };
  const reset = () => { setAnimal(1); setMode('ammonia'); setWater(500); setGrams(1.0); };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">CBSE Class 11 Biology - Excretory Products and their Elimination</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Ammonia vs Urea vs Uric Acid: the Water Bill</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <p className="text-xs text-slate-400 mb-3">Protein breakdown makes ammonia, the most toxic waste of all. Choose the packaging molecule and the habitat water, then read the bill in mL.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-2">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Waste molecule</p>
          {(['ammonia', 'urea', 'uric'] as Mode[]).map((k) => (
            <button key={k} onClick={() => setMode(k)}
              className={`w-full min-h-11 px-3 rounded-xl text-xs font-bold border text-left transition-all ${mode === k ? 'border-gold-400 bg-gold-950/50' : 'border-slate-800 bg-slate-950 hover:border-slate-600'}`}>
              {MODES[k].name} <span className="text-slate-400">- needs {MODES[k].water} mL/g</span>
            </button>
          ))}
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Animal (sets its natural mode)</p>
          <div className="grid grid-cols-2 gap-2">
            {ANIMALS.map((a, i) => (
              <button key={a.name} onClick={() => pickAnimal(i)}
                className={`min-h-11 px-2 rounded-xl text-[11px] font-bold border transition-all ${animal === i ? 'border-gold-400 bg-gold-950/50 text-gold-200' : 'border-slate-800 bg-slate-950 text-slate-300 hover:border-slate-600'}`}>
                {a.name}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 leading-snug">{ANIMALS[animal].note}</p>
          {isTadpole && (
            <button onClick={growUp} className="w-full min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold transition-all">Grow up! (metamorphosis)</button>
          )}
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-3">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Water available per day</span>
            <span className="text-gold-300 font-mono font-bold">{water} mL</span>
          </label>
          <input type="range" min={5} max={600} step={5} value={water} aria-label="water available per day"
            onChange={(e) => setWater(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Waste to remove</span>
            <span className="text-amber-300 font-mono font-bold">{grams.toFixed(1)} g/day</span>
          </label>
          <input type="range" min={0.5} max={2} step={0.1} value={grams} aria-label="grams of waste per day"
            onChange={(e) => setGrams(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-3">
        <svg viewBox="0 0 560 190" className="w-full h-44 md:h-48" preserveAspectRatio="xMidYMid meet">
          {/* water needed bars, sqrt-scaled so 10 mL stays visible */}
          {(['ammonia', 'urea', 'uric'] as Mode[]).map((k, i) => (
            <g key={k}>
              <rect x={20} y={18 + i * 40} width={bar(MODES[k].water) * 3.4} height={26} rx={6}
                style={{ fill: mode === k ? MODES[k].col : '#1e293b', transition: 'fill 0.4s' }} stroke={mode === k ? '#e2e8f0' : '#334155'} strokeWidth={1} />
              <text x={24} y={35 + i * 40} fontSize="10" fontWeight="bold" fill={mode === k ? '#0f172a' : '#94a3b8'}>{MODES[k].name.split(' ')[0]}: {MODES[k].water} mL/g - {MODES[k].toxicity}, {MODES[k].atp} ATP</text>
            </g>
          ))}
          {/* available water gauge */}
          <rect x={20} y={142} width={bar(water) * 3.4} height={18} rx={6} fill="#0ea5e9" style={{ transition: 'width 0.2s' }} />
          <text x={24} y={155} fontSize="10" fontWeight="bold" fill="#0f172a">habitat water: {water} mL/day</text>
          {/* flush animation: drops when safe with liquid waste, pellets for uric acid */}
          {mode !== 'uric' ? (
            <g>
              <circle cx={480} cy={30 + dropY} r={4} fill="#38bdf8" style={{ opacity: safe ? 0.9 : 0 }} />
              <circle cx={495} cy={22 + dropY} r={3} fill="#38bdf8" style={{ opacity: safe ? 0.7 : 0 }} />
              <text x={488} y={96} fontSize="9" textAnchor="middle" fill="#38bdf8">{safe ? 'dilute + flush' : 'no flush!'}</text>
            </g>
          ) : (
            <g>
              <ellipse cx={484} cy={70} rx={7} ry={4} fill="#e7e5e4" style={{ opacity: safe ? 1 : 0 }} />
              <ellipse cx={497} cy={74} rx={6} ry={3.4} fill="#d6d3d1" style={{ opacity: safe ? 1 : 0 }} />
              <text x={490} y={96} fontSize="9" textAnchor="middle" fill="#a8a29e">{safe ? 'dry paste, almost no water' : 'cannot even make paste'}</text>
            </g>
          )}
        </svg>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-1">
          <div className="p-2 rounded-xl bg-slate-950 border border-amber-800 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Water needed</p>
            <p className="text-base font-extrabold font-mono text-amber-300">{needed.toFixed(0)} mL/day</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-gold-800 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Water available</p>
            <p className="text-base font-extrabold font-mono text-gold-300">{water} mL/day</p>
          </div>
          <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-center">
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Energy paid (per NH3)</p>
            <p className="text-base font-extrabold font-mono text-gold-300">{m.atp} ATP</p>
          </div>
          <div className={`p-2 rounded-xl border text-center ${safe ? 'bg-emerald-950/60 border-emerald-700' : 'bg-rose-950/60 border-rose-700'}`}>
            <p className="text-[10px] uppercase tracking-wider text-slate-400">Verdict</p>
            <p className={`text-xs font-bold ${safe ? 'text-emerald-300' : 'text-rose-300'}`}>{safe ? 'waste removed safely' : mode === 'ammonia' ? 'ammonia poisons the blood' : 'animal dehydrates'}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <span className="font-bold text-emerald-300">Misconception killer:</span> urea and uric acid are not &quot;the waste&quot; -- they are detox packaging. Ammonia is what proteins actually release, and it is lethal even in tiny amounts. Every animal that lives on land pays ATP in the liver to repackage it and save water. The mode follows the habitat: water-rich = ammonia, dry = paste.
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 to-slate-900 border border-emerald-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Keep ammonia and drag habitat water down to 20 mL/day. Read the verdict -- then switch to uric acid. How little water still keeps this animal alive?</p>
        <p className="mt-1">2. Select the Tadpole and press &quot;Grow up!&quot;. Which molecule does the adult frog switch to, and how many times less water does each gram now cost?</p>
      </footer>
    </div>
  );
}

export default C11_BiologyExcretionNitrogenousWastesSim;
