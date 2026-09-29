'use client';
/**
 * C7_SocialScienceNewBeginningsCitiesSim (Class 7 Social Science)
 *
 * ELI5: Around 2500 years ago rulers of the mahajanapadas started taking a
 * REGULAR tax (about one-sixth of produce) to pay STANDING armies and build
 * huge fort walls. Set the tax, feed the army, raise the wall -- and survive
 * Magadha's next attack.
 */
import React, { useState } from 'react';

export function C7_SocialScienceNewBeginningsCitiesSim() {
  const [tax, setTax] = useState(16.7); // % of produce (one-sixth)
  const [armyShare, setArmyShare] = useState(50); // % of revenue to soldiers
  const [plough, setPlough] = useState(false);
  const [fort, setFort] = useState(0);
  const [pop, setPop] = useState(600); // farming families
  const [year, setYear] = useState(0);
  const [banner, setBanner] = useState('');
  const [saved, setSaved] = useState(0); // treasury
  const [log, setLog] = useState<{ y: number; text: string; bad: boolean }[]>([]);

  const produce = pop * (plough ? 1.45 : 1.0); // tonnes of grain
  const revenue = (produce * tax) / 100; // tonnes collected by the raja
  const soldiers = Math.round((revenue * armyShare) / 100 * 6);
  const happiness = Math.max(0, Math.round(100 - Math.abs(tax - 16.7) * 3.5 - (tax > 25 ? 12 : 0)));
  const defense = Math.round(soldiers * (1 + 0.5 * fort));
  const attackIn = 4 - (year % 4);
  const attackForce = 300 + year * 60;

  const reset = () => { setTax(16.7); setArmyShare(50); setPlough(false); setFort(0); setPop(600); setYear(0); setBanner(''); setSaved(0); setLog([]); };

  const buildFort = () => {
    if (fort >= 3) { setBanner('The wall is already triple-ring -- nothing more to build.'); return; }
    if (saved < 120) { setBanner(`A fort ring costs 120 t of grain. Treasury has ${Math.round(saved)} t -- raise tax or wait a year.`); return; }
    setSaved((s) => s - 120); setFort((f) => f + 1);
    setBanner(`Fort ring ${fort + 1} built: defence multiplied by 1.5.`);
  };

  const nextYear = () => {
    if ((year + 1) % 4 === 0) {
      if (defense < attackForce) {
        setBanner(`DEFEAT! Magadha's army (${attackForce}) broke through your defence (${defense}). Your janapada is absorbed -- the big fish ate the small one.`);
        setLog((l) => [{ y: year + 1, text: `Magadha broke through: ${attackForce} vs your ${defense}. Captured.`, bad: true }, ...l]);
        return;
      }
      setLog((l) => [{ y: year + 1, text: `Siege survived: defence ${defense} held off ${attackForce}.`, bad: false }, ...l]);
      setBanner(`Siege survived! Magadha attacked with ${attackForce}; your soldiers and walls held at ${defense}.`);
    } else if (happiness < 35) {
      const left = Math.max(50, Math.round(pop * 0.94));
      setPop(left);
      setBanner(`Over-taxed families are walking away to other janapadas: ${600 - left} families gone so far.`);
      setLog((l) => [{ y: year + 1, text: `${600 - left} families migrated away over the years.`, bad: true }, ...l]);
    } else {
      setBanner(`Peaceful year ${year + 1}. Farmers owe ${(tax / 100 * 100).toFixed(0)} parts in 600 -- tax was fixed, not begged in war-time.`);
      setLog((l) => [{ y: year + 1, text: `Peaceful year: collected ${Math.round(revenue)} t at ${tax.toFixed(1)}% tax.`, bad: false }, ...l]);
    }
    setSaved((s) => s + revenue * 0.25);
    setYear((y) => y + 1);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 7 History - New Beginnings: Cities and States</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Run a Mahajanapada: Tax, Army, Fort</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Tax on produce (the law books say about 1/6)</span>
                <span className="font-mono text-amber-300">{tax.toFixed(1)}% = {(tax / 100 * 6).toFixed(2)}/6</span>
              </label>
              <input type="range" min={0} max={33} step={0.5} value={tax} aria-label="tax rate"
                onChange={(e) => setTax(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-amber-500" />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Revenue spent on standing army</span>
                <span className="font-mono text-rose-300">{armyShare}% = {soldiers} soldiers</span>
              </label>
              <input type="range" min={0} max={80} step={5} value={armyShare} aria-label="army share"
                onChange={(e) => setArmyShare(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-rose-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={() => setPlough((p) => !p)}
                className={`flex-1 min-h-11 rounded-xl text-xs font-bold border transition-all ${plough ? 'bg-emerald-600 border-emerald-500 text-white' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-emerald-600'}`}>
                Iron plough {plough ? 'ON (+45% yield)' : 'OFF'}
              </button>
              <button onClick={buildFort} className="flex-1 min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-xs font-bold transition-all">
                Build fort ring (120 t) [{fort}/3]
              </button>
            </div>
            <button onClick={nextYear} className="w-full min-h-11 rounded-xl bg-gold-600 hover:bg-gold-500 text-sm font-bold transition-all">
              Next year -- Magadha attacks in {attackIn} year{attackIn === 1 ? '' : 's'} ({attackForce} strong)
            </button>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> early kings did not only fight -- they ran a system. Brahamanas composed rules fixing the farmer&apos;s tax at one-sixth so the raja got a KNOWN income every year, and in return tradespeople, soldiers and fort-builders got paid. Too greedy, and your farmers simply leave.
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Farming families</p><p className="font-mono text-lg text-emerald-300">{pop}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Grain produced</p><p className="font-mono text-lg text-amber-300">{Math.round(produce)} t</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Raja&apos;s revenue</p><p className="font-mono text-lg text-gold-300">{Math.round(revenue)} t</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Treasury</p><p className="font-mono text-lg text-gold-300">{Math.round(saved)} t</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Defence index</p><p className={`font-mono text-lg ${defense >= attackForce ? 'text-emerald-300' : 'text-rose-400'}`}>{defense}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Farmer mood</p><p className={`font-mono text-lg ${happiness >= 50 ? 'text-emerald-300' : 'text-rose-400'}`}>{happiness}/100</p></div>
          </div>

          {banner && (
            <p className={`text-xs p-3 rounded-xl border leading-relaxed ${banner.startsWith('DEFEAT') ? 'bg-rose-950/50 border-rose-800 text-rose-200' : banner.startsWith('Siege') ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>{banner}</p>
          )}

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 max-h-44 overflow-y-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">Chronicle of your janapada</p>
            {log.length === 0 && <p className="text-xs text-slate-500">Nothing yet -- press Next year.</p>}
            <div className="space-y-1">
              {log.map((e, i) => (
                <p key={i} className={`text-xs leading-relaxed ${e.bad ? 'text-rose-300' : 'text-slate-300'}`}>
                  <span className="font-mono text-slate-500">Y{e.y}</span> {e.text}
                </p>
              ))}
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p><span className="font-bold text-gold-300">The real chain:</span> iron plough + paddy transplanting made surplus grain -- surplus let rajas collect tax -- tax paid a PERMANENT army -- armies built the thick fort walls archaeologists still dig up at sites like Rajgir.</p>
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Keep tax exactly at one-sixth and still survive the year-4 attack -- what combination of plough, army share and fort did you need?</p>
        <p className="mt-1">2. Push tax to 33% for three years and watch the mood meter -- explain what happens to your defence when farmers leave, even though tax per family is unchanged.</p>
      </footer>
    </div>
  );
}

export default C7_SocialScienceNewBeginningsCitiesSim;
