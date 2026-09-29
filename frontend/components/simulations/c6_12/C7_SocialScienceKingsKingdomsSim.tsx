'use client';
/**
 * C7_SocialScienceKingsAndKingdomsSim (Class 7 Social Science)
 *
 * ELI5: A early-medieval "kingdom" was a layered pyramid, not one big direct
 * rule. Conquer a province, then choose who holds it: a king's officer (sends
 * most revenue), a samanta chief (keeps half, grows dangerous) or a temple
 * (sends nothing, buys legitimacy). Keep the empire alive for 20 years.
 */
import React, { useState } from 'react';

const NAMES = ['Vengi', 'Kanchipuram', 'Madurai', 'Tondaimandalam', 'Gangavadi', 'Malainadu', 'Kollam', 'Anuradhapura'];
type LayerT = 'officer' | 'samanta' | 'temple';
const SEND: Record<LayerT, number> = { officer: 0.8, samanta: 0.45, temple: 0 };
const LAYER_INFO: Record<LayerT, string> = { officer: 'king\'s officer', samanta: 'samanta chief', temple: 'temple (devadana)' };

export function C7_SocialScienceKingsKingdomsSim() {
  const [provs, setProvs] = useState<(LayerT | 'new' | null)[]>(NAMES.map(() => null));
  const [army, setArmy] = useState(1000);
  const [funding, setFunding] = useState(40);
  const [year, setYear] = useState(950);
  const [legit, setLegit] = useState(1);
  const [banner, setBanner] = useState('');

  const owned = provs.filter((p) => p === 'officer' || p === 'samanta' || p === 'temple').length;
  const gross = 120 + owned * 150;
  const sent = provs.reduce((s, p) => s + (p && p !== 'new' ? 150 * SEND[p as LayerT] : 0), 0) + 120;
  const kingShare = Math.round((sent / gross) * 100);
  const soldiers = Math.round((funding / 100) * sent * 1.5);
  const samantas = provs.filter((p) => p === 'samanta').length;
  const temples = provs.filter((p) => p === 'temple').length;

  const reset = () => { setProvs(NAMES.map(() => null)); setArmy(1000); setFunding(40); setYear(950); setLegit(1); setBanner(''); };

  const campaign = () => {
    const idx = provs.findIndex((p) => p === null);
    if (idx < 0) { setBanner('All provinces already pay tribute -- prashastis will exaggerate the rest.'); return; }
    if (army < 400) { setBanner('Not enough army to march (need 400 soldiers). Raise the army funding slider.'); return; }
    const next = [...provs]; next[idx] = 'new';
    setProvs(next); setArmy((a) => a - 300); setLegit((l) => l + 1);
    setBanner(`${NAMES[idx]} defeated. Its chief offers tribute -- now choose who will HOLD it (click the province).`);
  };

  const cycle = (i: number) => {
    const cur = provs[i];
    if (cur === null) { setBanner('Conquer this province first -- press Campaign.'); return; }
    const next = [...provs];
    next[i] = cur === 'new' ? 'officer' : cur === 'officer' ? 'samanta' : cur === 'samanta' ? 'temple' : 'officer';
    setProvs(next); setBanner('');
  };

  const nextYear = () => {
    setYear((y) => y + 1);
    let risk = samantas >= 3 ? 35 - temples * 12 : 0;
    if (risk > 0 && Math.random() * 100 < Math.max(6, risk)) {
      const i = provs.findIndex((p) => p === 'samanta');
      if (i >= 0) {
        const next = [...provs]; next[i] = null;
        setProvs(next);
        setBanner(`REBELLION! The samanta of ${NAMES[i]} stopped sending revenue and declared himself independent.`);
        return;
      }
    }
    setBanner(`Year ${year + 1}: king collected ${Math.round(sent)} tonnes of paddy out of ${gross} produced.`);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 7 History - Kings and Kingdoms</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Empire Builder: Conquer, Then Decide Who Holds the Land</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
          <div className="grid grid-cols-3 gap-2">
            {NAMES.map((nm, i) => {
              const p = provs[i];
              const style = p === null ? 'bg-slate-950 border-slate-700 text-slate-400'
                : p === 'new' ? 'bg-rose-950 border-rose-600 text-rose-200'
                : p === 'officer' ? 'bg-gold-950 border-gold-600 text-gold-200'
                : p === 'samanta' ? 'bg-amber-950 border-amber-600 text-amber-200'
                : 'bg-gold-950 border-gold-600 text-gold-200';
              return (
                <button key={nm} onClick={() => cycle(i)}
                  className={`min-h-20 p-2 rounded-xl border text-left transition-all hover:scale-[1.02] ${style}`}>
                  <p className="text-[11px] font-bold leading-tight">{nm}</p>
                  <p className="text-[10px] mt-1 leading-tight">{p === null ? 'independent chief' : p === 'new' ? 'just conquered - unassigned' : LAYER_INFO[p as LayerT]}</p>
                </button>
              );
            })}
            <div className="min-h-20 p-2 rounded-xl border border-emerald-600 bg-emerald-950 text-emerald-200">
              <p className="text-[11px] font-bold">Capital</p>
              <p className="text-[10px] mt-1">the king&apos;s own land: 120 t</p>
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-2 leading-snug">Click a province to cycle who holds it: officer - samanta - temple. Orange samantas keep half the revenue -- and get ideas.</p>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">King&apos;s revenue</p><p className="font-mono text-lg text-emerald-300">{Math.round(sent)} t paddy/yr</p><p className="text-[10px] text-slate-500">of {gross} t produced ({kingShare}%)</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Standing army</p><p className="font-mono text-lg text-rose-300">{army + soldiers} soldiers</p><p className="text-[10px] text-slate-500">{army} veterans + {soldiers} funded now</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Legitimacy</p><p className="font-mono text-lg text-gold-300">{legit + temples * 2}</p><p className="text-[10px] text-slate-500">temples +{temples * 2}, victories +{legit - 1}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Year</p><p className="font-mono text-lg text-amber-300">{year} CE</p><p className="text-[10px] text-slate-500">samantas: {samantas}/3 danger</p></div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Revenue sent to the army</span><span className="font-mono text-gold-300">{funding}% ({soldiers} soldiers)</span>
              </label>
              <input type="range" min={0} max={100} step={5} value={funding} aria-label="army funding"
                onChange={(e) => setFunding(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            </div>
            <div className="flex gap-2">
              <button onClick={campaign} className="flex-1 min-h-11 rounded-xl bg-rose-600 hover:bg-rose-500 text-xs font-bold transition-all">Campaign (costs 300 soldiers)</button>
              <button onClick={nextYear} className="flex-1 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold transition-all">Next year</button>
            </div>
            {banner && <p className={`text-xs p-2 rounded-lg border leading-relaxed ${banner.startsWith('REBELLION') ? 'bg-rose-950/50 border-rose-800 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>{banner}</p>}
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-gold-300 mb-1">What the court poet writes now</p>
            <p className="italic text-slate-200">&quot;{owned >= 6
              ? 'Conqueror of the whole southern land, lord of kings, whose fame crosses the seas, whose gifts make temples shine with gold.'
              : owned >= 3
              ? 'Hero of a hundred battles, whose sword has humbled proud chiefs and whose justice the provinces praise.'
              : 'Heir of a noble line, whose strength grows like the young moon, whose elephant corps shakes the earth.'}&quot;</p>
            <p className="text-[11px] text-slate-500 mt-2">Prashastis were court poet-composers&apos; praise poems (in Sanskrit) -- useful history, but every defeat is a &quot;victory&quot; in them. Read them critically.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> the king never ruled every village directly. Watch your own share: every samanta and temple grant shrinks what actually reaches the king -- that is how powerful chiefs later became independent kings.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Hold all 8 provinces with officers only for 5 years -- what is the king&apos;s revenue share, and could you afford the next campaign?</p>
        <p className="mt-1">2. Conquer 3 provinces, hand them all to samantas, then press Next year repeatedly -- how many years before a rebellion, and what does that teach about the samanta system?</p>
      </footer>
    </div>
  );
}

export default C7_SocialScienceKingsKingdomsSim;
