'use client';
/**
 * C9_SocialScienceForestSocietySim (Class 9 Social Science)
 *
 * ELI5: Colonial "scientific forestry" turned mixed forests into single-species
 * timber factories and the Forest Acts made villagers' everyday use a CRIME.
 * Pick a regime, set railway sleeper demand, and advance decade by decade
 * from 1860 to 1920.
 */
import React, { useState } from 'react';

const DECADES = [1860, 1870, 1880, 1890, 1900, 1910, 1920];
interface Log { year: number; text: string; bad: boolean }

export function C9_SocialScienceForestSocietySim() {
  const [reserve, setReserve] = useState(true);
  const [demand, setDemand] = useState(60); // thousand sleepers per year
  const [step, setStep] = useState(0);
  const [cover, setCover] = useState(100);
  const [species, setSpecies] = useState(6);
  const [offences, setOffences] = useState(0);
  const [goods, setGoods] = useState(28); // villager income from forest Rs/mo
  const [log, setLog] = useState<Log[]>([]);
  const [coverHistory, setCoverHistory] = useState<number[]>([100]);

  const reset = () => { setReserve(true); setDemand(60); setStep(0); setCover(100); setSpecies(6); setOffences(0); setGoods(28); setLog([]); setCoverHistory([100]); };

  const advance = () => {
    if (step >= 6) return;
    const year = DECADES[step];
    const coverLoss = (demand / 6000) * (reserve ? 1.15 : 0.7);
    const newCover = Math.max(8, cover - coverLoss);
    const newSpecies = reserve ? Math.max(1, species - 1) : Math.max(4, species - 0.3);
    const newOffences = reserve ? offences + (demand / 10000) * 6 : offences;
    const newGoods = reserve ? Math.max(2, goods - 2) : Math.max(4, goods - coverLoss * 1.5);
    let text: string;
    if (reserve) {
      text = `${year}: forest declared RESERVED. Railways take ${demand}k sleepers; clear-felled blocks replanted with sal only. ${Math.round((demand / 10000) * 6)} villagers convicted for grazing or collecting wood.`;
    } else {
      text = `${year}: villagers keep customary rights -- shifting cultivation, grazing, fruit, fuel. Timber cut ${Math.round(demand * 0.4)}k, slower, and mixed forest regenerates.`;
    }
    if (newCover < 30) text += ' Forest so thin that fuel and fodder are scarce -- hunger years ahead.';
    setCover(newCover); setSpecies(newSpecies); setOffences(newOffences); setGoods(newGoods);
    setCoverHistory((h) => [...h, newCover]);
    setLog((l) => [{ year, text, bad: reserve || newCover < 30 }, ...l]);
    setStep((s) => s + 1);
  };

  const pts = coverHistory.map((c, i) => `${20 + (i / 6) * 280},${110 - c * 0.95}`).join(' ');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 9 History - Forest Society and Colonialism</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">A Forest Under Two Regimes, 1860-1920</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 space-y-4">
          <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 320 130" className="w-full">
              <line x1="20" y1="110" x2="310" y2="110" stroke="#475569" />
              <text x="20" y="122" fontSize="8" fill="#64748b">1860</text>
              <text x="295" y="122" fontSize="8" fill="#64748b">1920</text>
              <polyline points={pts} fill="none" stroke={reserve ? '#f43f5e' : '#34d399'} strokeWidth="2.5" style={{ transition: 'all 400ms' }} />
              <text x="160" y="12" fontSize="8" fill="#94a3b8" textAnchor="middle">forest cover remaining, % of 1860</text>
            </svg>
          </div>
          <div className="p-3 bg-slate-900/70 rounded-2xl border border-slate-800 max-h-52 overflow-y-auto space-y-2">
            {log.length === 0 && <p className="text-xs text-slate-500">Press "Advance 10 years" to start the clock.</p>}
            {log.map((l, i) => (
              <p key={i} className={`text-xs leading-relaxed p-2 rounded-lg border ${l.bad ? 'bg-rose-950/40 border-rose-900 text-rose-200' : 'bg-emerald-950/40 border-emerald-900 text-emerald-200'}`}>{l.text}</p>
            ))}
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <button onClick={() => setReserve((r) => !r)}
              className={`w-full min-h-11 rounded-xl text-xs font-bold border transition-all ${reserve ? 'bg-rose-700 border-rose-500 text-white' : 'bg-emerald-700 border-emerald-500 text-white'}`}>
              Regime: {reserve ? 'Colonial RESERVED forest (Forest Acts)' : 'Village-managed community forest'}
            </button>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Railway sleeper demand</span>
                <span className="font-mono text-amber-300">{demand}k sleepers/yr</span>
              </label>
              <input type="range" min={10} max={120} step={5} value={demand} aria-label="sleeper demand"
                onChange={(e) => setDemand(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-amber-500" />
            </div>
            <button onClick={advance} disabled={step >= 6}
              className="w-full min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold disabled:opacity-40 transition-all">
              Advance 10 years {step < 6 ? `(to ${DECADES[step]})` : ''}
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Forest cover</p><p className="font-mono text-lg text-emerald-300">{Math.round(cover)}%</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Tree species mix</p><p className="font-mono text-lg text-lime-300">{species.toFixed(1)}/6 kinds</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Villagers convicted</p><p className="font-mono text-lg text-rose-300">{Math.round(offences)}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Villager forest income</p><p className="font-mono text-lg text-amber-300">Rs {Math.round(goods)}/mo</p></div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 space-y-1 leading-relaxed">
            <p className="font-bold text-gold-300 mb-1">The sleeper maths that started it all</p>
            <p>Each mile of railway track needed about <span className="font-mono text-amber-300">2,000 wooden sleepers</span>. As track length exploded from 1850s, forests near lines were stripped first. Dietrich Brandis, the first Inspector-General of Forests, brought German &quot;scientific forestry&quot;: fell an area, plant one valuable species (sal, teak), fell again on a 30-year cycle.</p>
            <p className="mt-1">Your slider: <span className="font-mono text-amber-300">{demand}k sleepers/yr</span> lays roughly <span className="font-mono text-emerald-300">{Math.round(demand / 2)} miles</span> of new track every year -- each mile a strip of forest turned into a single-species plantation.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-gold-300 mb-1">Who used the forest before the Acts</p>
            <p>Shifting cultivators (jhum), pastoralists such as Gujjar and Gaddi herds, and village households collecting mahua flowers, tendu leaves, fuel and fodder. When the 1878 Forest Act put forests under state control, all of these ordinary acts became punishable -- and resentment fed rebellions like Bastar in 1910.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-gold-300 mb-1">1878 Forest Act: three kinds of forest</p>
            <p><span className="font-bold text-rose-300">Reserved:</span> best forests; no access at all. <span className="font-bold text-amber-300">Protected:</span> limited rights, all revocable. <span className="font-bold text-emerald-300">Village:</span> what was left for villagers.</p>
            <p className="mt-1">A first conviction could cost Rs 5 to Rs 50 -- months of a labourer&apos;s wage -- or a week in the lock-up for cutting grass.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-lime-400 mb-2">Species mix now ({species.toFixed(1)} of 6 kinds)</p>
            <div className="flex gap-1 h-4">
              {['sal', 'teak', 'bamboo', 'mahua', 'tendu', 'peepal'].map((sp, i) => (
                <div key={sp} className={`flex-1 rounded ${i < Math.round(species) ? 'bg-lime-500' : 'bg-slate-950 border border-slate-800'} transition-all duration-500`} title={sp} />
              ))}
            </div>
            <p className="text-[10px] text-slate-500 mt-1">Grey slots = kinds lost. Plantation forestry keeps ONE commercial kind; a mixed forest keeps all six -- and everything that feeds on them.</p>
            <p className="text-[10px] text-slate-500 mt-1">Watch how fast the greys appear in reserve mode at high demand -- that is &quot;scientific&quot; forestry in numbers.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> forests were NOT empty wilderness before the British "managed" them. Villagers and pastoralists used them systematically -- shifting cultivation, grazing, collecting fruit and fuel. The Acts criminalised a working system.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Run the full 60 years in reserve mode at 100k sleepers -- how low does cover fall, and what happens to species mix? Why does "scientific" forestry reduce the number of kinds of trees?</p>
        <p className="mt-1">2. Switch to community mode at the same demand -- compare convictions and villager income, then explain who paid the real cost of the railways.</p>
      </footer>
    </div>
  );
}

export default C9_SocialScienceForestSocietySim;
