'use client';
/**
 * C9_SocialScienceStateSociety1000CESim (Class 9 Social Science)
 *
 * ELI5: Kings of the age 700-1000 CE paid servants, Brahmanas and temples with
 * LAND GRANTS: the village's taxes went to the receiver FOREVER. Grants spread
 * farming and built tanks -- but every grant shrank the king and grew the
 * chiefs who later declared independence.
 */
import React, { useState } from 'react';

const RECIPS = [
  { id: 'brahmana', label: 'Brahmana agrahara', note: 'tax-free village for learned Brahmanas; they clear forest and settle farmers' },
  { id: 'temple', label: 'Temple (devadana)', note: 'temple gets the taxes; it digs tanks that irrigate royal land too' },
  { id: 'official', label: 'Military chief (samanta)', note: 'chief keeps the taxes in return for soldiers -- and grows ambitious' },
] as const;

export function C9_SocialScienceStateSociety1000CESim() {
  const [recip, setRecip] = useState<'brahmana' | 'temple' | 'official'>('brahmana');
  const [grants, setGrants] = useState<number>(0); // villages granted away (of 12)
  const [byType, setByType] = useState({ brahmana: 0, temple: 0, official: 0 });
  const [decade, setDecade] = useState(0);
  const [risk, setRisk] = useState(0);
  const [lost, setLost] = useState(0);
  const [banner, setBanner] = useState('');

  const royal = Math.max(0, 12 - grants - lost);
  const revenue = royal * 100 * (1 + Math.min(0.36, byType.temple * 0.06)); // temple tanks lift royal yield
  const surplus = (12 - lost) * 100 + byType.brahmana * 40 + byType.temple * 40; // grants settle new villages
  const army = 800 + byType.official * 150 - lost * 100;
  const riskNow = Math.min(100, risk);

  const reset = () => { setRecip('brahmana'); setGrants(0); setByType({ brahmana: 0, temple: 0, official: 0 }); setDecade(0); setRisk(0); setLost(0); setBanner(''); };

  const grant = () => {
    if (royal <= 2) { setBanner('Only the crown lands remain -- granting more leaves the king with nothing.'); return; }
    setGrants((g) => g + 1);
    setByType((b) => ({ ...b, [recip]: b[recip] + 1 }));
    if (recip === 'official') setRisk((r) => r + 15);
    setBanner(`Grant made: one village's taxes now flow to the ${RECIPS.find((r) => r.id === recip)!.label.toLowerCase()} -- permanently.`);
  };

  const nextDecade = () => {
    if (decade >= 10) return;
    const d = decade + 1;
    const extra = byType.official ? 8 : 0; // unpaid chiefs get restless
    const nextRisk = Math.min(100, risk + (revenue < 600 ? 6 : 0) + extra);
    setDecade(d);
    setRisk(nextRisk);
    if (nextRisk >= 100) {
      setLost((l) => l + 2);
      setRisk(60);
      setBanner('A SAMANTA DECLARES INDEPENDENCE! Two more villages stop sending taxes -- the chief now mints his own title. This is how new regional kingdoms were born.');
    } else if (d % 3 === 0) {
      setBanner(`Decade ${d}: new settlements rising on granted land -- inscriptions record tanks, wells and new hamlets.`);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 9 History - State and Society up to 1000 CE</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">The Land Grant Game: Pay in Land, Lose the Kingdom?</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-400 block">Who receives the next grant?</label>
            <select value={recip} aria-label="recipient"
              onChange={(e) => setRecip(e.target.value as 'brahmana' | 'temple' | 'official')}
              className="w-full min-h-11 p-2 rounded-xl bg-slate-950 border border-slate-700 text-sm">
              {RECIPS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
            </select>
            <p className="text-xs text-slate-400 leading-relaxed">{RECIPS.find((r) => r.id === recip)!.note}</p>
            <div className="flex gap-2">
              <button onClick={grant} className="flex-1 min-h-11 rounded-xl bg-violet-600 hover:bg-violet-500 text-xs font-bold transition-all">Grant a village</button>
              <button onClick={nextDecade} disabled={decade >= 10} className="flex-1 min-h-11 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-xs font-bold disabled:opacity-40 transition-all">Next decade</button>
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-400 flex justify-between">
                <span>Samanta independence risk</span>
                <span className={`font-mono ${riskNow > 60 ? 'text-rose-400' : 'text-amber-300'}`}>{riskNow}%</span>
              </label>
              <div className="h-2.5 mt-1 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                <div className={`h-full transition-all duration-500 ${riskNow > 60 ? 'bg-rose-500' : 'bg-amber-400'}`} style={{ width: `${riskNow}%` }} />
              </div>
            </div>
          </div>
          {banner && <p className={`text-xs p-3 rounded-xl border leading-relaxed ${banner.startsWith('A SAMANTA') ? 'bg-rose-950/50 border-rose-800 text-rose-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>{banner}</p>}
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Villages paying the king</p><p className="font-mono text-lg text-emerald-300">{royal}/12</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Royal revenue</p><p className="font-mono text-lg text-amber-300">{Math.round(revenue)} t/yr</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Total kingdom surplus</p><p className="font-mono text-lg text-sky-300">{Math.round(surplus)} t/yr</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Army</p><p className="font-mono text-lg text-rose-300">{army} men</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Grants: brahmana / temple / chief</p><p className="font-mono text-lg text-violet-300">{byType.brahmana}/{byType.temple}/{byType.official}</p></div>
            <div className="p-3 rounded-2xl bg-slate-900/70 border border-slate-800"><p className="text-[11px] text-slate-400">Decade</p><p className="font-mono text-lg text-indigo-300">{decade}</p></div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p><span className="font-bold text-indigo-300">The real trade-off:</span> copperplate inscriptions record thousands of such grants. They pushed agriculture into forests and built irrigation -- total surplus RISES (watch the blue number) -- but the king&apos;s own cut falls, and the grantees became local powers: the samanta-nayaka order that replaced the old kingdoms.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2">Copperplate inscription (live)</p>
            <p className="text-xs font-mono text-slate-300 leading-relaxed">
              &quot;Be it well. In year {decade} of the reign, the king, full of merit, granted the village with its trees, water and taxes to the {RECIPS.find((r) => r.id === recip)!.label.toLowerCase()}. Whoever breaches this gift bears the sin of killing a cow at Varanasi.&quot; -- {grants} grants recorded so far.
            </p>
            <p className="text-[11px] text-slate-500 mt-2">Real charters (copper plates, temple walls) list boundaries, taxes and curses against future takers -- historians rebuild whole kingdoms from them.</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-indigo-300 mb-1">Peer kingdoms of the same age</p>
            <p><span className="font-bold text-violet-300">Tripartite struggle:</span> Palas, Gurjara-Pratiharas and Rashtrakutas fought for 200 years over Kanauj -- the symbolic prize of north India.</p>
            <p><span className="font-bold text-sky-300">Cholas:</span> rebuilt the temple-centred grant economy on an irrigation scale, and sent fleets to Sri Vijaya (1025 CE).</p>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-2">Grant register</p>
            {grants === 0 && <p className="text-xs text-slate-500">No grants yet -- the king still holds all 12 villages.</p>}
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: byType.brahmana }).map((_, i) => <span key={`b${i}`} className="px-2 py-0.5 rounded-full bg-violet-950 border border-violet-700 text-violet-200 text-[10px] font-bold">agrahara</span>)}
              {Array.from({ length: byType.temple }).map((_, i) => <span key={`t${i}`} className="px-2 py-0.5 rounded-full bg-sky-950 border border-sky-700 text-sky-200 text-[10px] font-bold">devadana</span>)}
              {Array.from({ length: byType.official }).map((_, i) => <span key={`o${i}`} className="px-2 py-0.5 rounded-full bg-rose-950 border border-rose-700 text-rose-200 text-[10px] font-bold">samanta</span>)}
            </div>
            <p className="text-[11px] text-slate-500 mt-2">Each chip = one village whose taxes changed hands forever, exactly as the register above records.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> a land grant was NOT a free gift -- land meant rent and tax FOREVER. Kings did not give away soil; they gave away future income, and every grant made the centre weaker.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Grant only to temples and brahmanas for 8 decades -- how much does TOTAL surplus grow while royal revenue falls? Which number tells you agrarian expansion was real?</p>
        <p className="mt-1">2. Grant five villages to military chiefs -- how many decades pass before an independence declaration, and what could you have done to delay it?</p>
      </footer>
    </div>
  );
}

export default C9_SocialScienceStateSociety1000CESim;
