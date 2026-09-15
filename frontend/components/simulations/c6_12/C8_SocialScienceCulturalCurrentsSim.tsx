'use client';
/**
 * C8_SocialScienceCulturalCurrentsSim (Class 8 Social Science)
 *
 * ELI5: Big cultural forms of the 13th-17th centuries were BLENDS, made when
 * a powerful patron connected two traditions. Pick a patron, connect two
 * traditions, and watch the new art form appear on the network -- or pick a
 * pair with no patron and watch nothing happen.
 */
import React, { useState } from 'react';

interface Patron { id: string; name: string; from: number; to: number; desc: string }
const PATRONS: Patron[] = [
  { id: 'khalji', name: 'Sultanate court of Delhi', from: 1290, to: 1400, desc: 'Turkish-Afghan sultans building a new capital style' },
  { id: 'sufi', name: 'Sufi khanqahs', from: 1250, to: 1650, desc: 'hospices where Persian mysticism met village song' },
  { id: 'bhakti', name: 'Bhakti saints (Kabir, Mirabai)', from: 1450, to: 1600, desc: 'saint-poets singing in the people\'s tongue' },
  { id: 'vijayanagara', name: 'Krishnadevaraya, Vijayanagara', from: 1509, to: 1530, desc: 'the greatest Telugu king and his court of poets' },
  { id: 'akbar', name: 'Akbar\'s imperial atelier', from: 1560, to: 1605, desc: 'a studio of Persian and Indian artists side by side' },
];
interface Trad { id: string; name: string }
const TRADS: Trad[] = [
  { id: 'persian', name: 'Persian' },
  { id: 'turkish', name: 'Turkish' },
  { id: 'sanskrit', name: 'Sanskrit' },
  { id: 'local', name: 'Local languages (Telugu, Hindi...)'},
  { id: 'folk', name: 'Folk devotional song' },
  { id: 'painting', name: 'Indian painting' },
];
interface Recipe { patron: string; needs: [string, string]; out: string; note: string }
const RECIPES: Recipe[] = [
  { patron: 'akbar', needs: ['persian', 'painting'], out: 'Mughal miniature painting', note: 'Persian line + Indian colour, e.g. Akbarnama album' },
  { patron: 'akbar', needs: ['persian', 'sanskrit'], out: 'Razmnama: Mahabharata in Persian', note: 'Sanskrit scholars and Persian scribes working together' },
  { patron: 'khalji', needs: ['turkish', 'local'], out: 'Indo-Islamic arch and dome', note: 'Turkish arch on Indian craftsmanship: the new capital style' },
  { patron: 'vijayanagara', needs: ['sanskrit', 'local'], out: 'Amuktamalyada, Telugu court classic', note: 'the king himself writing in Telugu with Sanskrit learning' },
  { patron: 'sufi', needs: ['persian', 'folk'], out: 'Qawwali and sama singing', note: 'Persian mystic poetry set to local folk rhythm' },
  { patron: 'bhakti', needs: ['sanskrit', 'folk'], out: 'Sant bhasha dohas of Kabir', note: 'scripture ideas in the language of the market' },
];

export function C8_SocialScienceCulturalCurrentsSim() {
  const [century, setCentury] = useState(1590);
  const [patron, setPatron] = useState<string | null>(null);
  const [picks, setPicks] = useState<string[]>([]);
  const [made, setMade] = useState<Recipe[]>([]);
  const [msg, setMsg] = useState('');

  const active = (p: Patron) => century >= p.from - 30 && century <= p.to + 10;
  const reset = () => { setCentury(1590); setPatron(null); setPicks([]); setMade([]); setMsg(''); };
  const choose = (pid: string) => {
    const p = PATRONS.find((x) => x.id === pid)!;
    if (!active(p)) { setMsg(`${p.name} is not active around ${century} CE -- move the time dial.`); return; }
    setPatron(pid); setPicks([]); setMsg('');
  };
  const clickTrad = (tid: string) => {
    if (!patron) { setMsg('First select a patron (they supply the money and the court).'); return; }
    if (picks.includes(tid)) { setPicks(picks.filter((x) => x !== tid)); return; }
    const next = [...picks, tid].slice(-2);
    setPicks(next);
    if (next.length === 2) {
      const hit = RECIPES.find((r) => r.patron === patron &&
        ((r.needs[0] === next[0] && r.needs[1] === next[1]) || (r.needs[0] === next[1] && r.needs[1] === next[0])));
      if (hit) {
        if (!made.find((m) => m.out === hit.out)) setMade((m) => [...m, hit]);
        setMsg(`NEW FORM: ${hit.out}. ${hit.note}`);
      } else {
        setMsg('This patron-tradition pair never produced a famous form -- try another pairing.');
      }
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-indigo-400">Class 8 History - Cultural Currents, 13th to 17th Centuries</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Patron Network Builder: Where New Art Forms Come From</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 340 250" className="w-full">
            {TRADS.map((t, i) => {
              const tx = 240 + 78 * Math.cos((i / TRADS.length) * 2 * Math.PI - Math.PI / 2);
              const ty = 125 + 95 * Math.sin((i / TRADS.length) * 2 * Math.PI - Math.PI / 2);
              const on = patron && picks.includes(t.id);
              return (
                <g key={t.id} style={{ cursor: 'pointer' }} onClick={() => clickTrad(t.id)}>
                  {patron && on && <line x1="70" y1="125" x2={tx} y2={ty} stroke="#34d399" strokeWidth="2.5" />}
                  {patron && !on && <line x1="70" y1="125" x2={tx} y2={ty} stroke="#334155" strokeWidth="1" strokeDasharray="3 3" />}
                  <circle cx={tx} cy={ty} r={on ? 24 : 20} fill={on ? '#065f46' : '#1e293b'} stroke={on ? '#34d399' : '#475569'} strokeWidth="2"
                    style={{ transition: 'all 250ms' }} />
                  <text x={tx} y={ty + 3} fontSize="7.5" fill="#e2e8f0" textAnchor="middle" fontWeight="bold">{t.name.slice(0, 14)}</text>
                </g>
              );
            })}
            <circle cx="70" cy="125" r="34" fill={patron ? '#4c1d95' : '#1e293b'} stroke={patron ? '#c4b5fd' : '#475569'} strokeWidth="2" style={{ transition: 'all 250ms' }} />
            <text x="70" y="120" fontSize="8" fill="#e2e8f0" textAnchor="middle" fontWeight="bold">{patron ? PATRONS.find((p) => p.id === patron)!.name.slice(0, 18) : 'select a'}</text>
            <text x="70" y="131" fontSize="8" fill="#e2e8f0" textAnchor="middle" fontWeight="bold">{patron ? PATRONS.find((p) => p.id === patron)!.name.slice(18, 36) || '' : 'patron'}</text>
            <text x="170" y="242" fontSize="8" fill="#64748b" textAnchor="middle">patron connects traditions -- each green edge is money + workshop</text>
          </svg>
          <label className="text-xs font-semibold text-slate-400 flex justify-between mt-1">
            <span>Time dial</span><span className="font-mono text-indigo-300">{century} CE</span>
          </label>
          <input type="range" min={1250} max={1650} step={10} value={century} aria-label="century"
            onChange={(e) => setCentury(Number(e.target.value))} className="w-full min-h-11 accent-indigo-500" />
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-1">
            <p className="text-xs font-bold uppercase tracking-wider text-violet-400 mb-1">Patrons (dim = not alive yet)</p>
            {PATRONS.map((p) => (
              <button key={p.id} onClick={() => choose(p.id)}
                className={`w-full min-h-11 p-2 text-left rounded-xl border text-xs transition-all ${patron === p.id ? 'border-violet-500 bg-violet-950/50' : active(p) ? 'border-slate-800 bg-slate-950 hover:border-slate-500' : 'border-slate-900 bg-slate-950 opacity-40'}`}>
                <span className="font-bold text-slate-100">{p.name}</span>
                <span className="text-slate-500"> {p.from}-{p.to}</span>
                <p className="text-slate-400 leading-snug">{p.desc}</p>
              </button>
            ))}
          </div>
          {msg && <p className={`text-xs p-3 rounded-xl border leading-relaxed ${msg.startsWith('NEW') ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-300'}`}>{msg}</p>}
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Composite culture meter: {made.length}/6 famous forms</p>
            <div className="h-2 mt-2 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${(made.length / 6) * 100}%` }} />
            </div>
            <div className="mt-2 space-y-1">
              {made.map((m) => <p key={m.out} className="text-xs text-emerald-200">+ {m.out}</p>)}
              {made.length === 0 && <p className="text-xs text-slate-500">Nothing yet. Hint: Akbar is active from 1560.</p>}
            </div>
          </div>
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed space-y-1">
            <p><span className="font-bold text-indigo-300">Where Urdu comes from:</span> Persian/Turkish army camps + local Hindi speech = Urdu, literally &quot;camp language&quot;. It is a recipe blend like the ones above.</p>
            <p><span className="font-bold text-violet-300">Kathak&apos;s journey:</span> temple storytellers -- Mughal court -- Awadh courts: one dance form carrying three worlds.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> no great form of this age came from a single source. Mughal painting, qawwali, sant poetry and the arch-and-dome style are all BLENDS -- mixing was the engine, patronage was the fuel.
          </div>
        </div>
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Build all 6 forms. Which single tradition appears in the most blends -- and which patron sits at the centre of the network?</p>
        <p className="mt-1">2. Set the dial to 1300 CE and try to make Mughal miniatures -- explain why it is impossible, then make the two blends that WERE possible.</p>
      </footer>
    </div>
  );
}

export default C8_SocialScienceCulturalCurrentsSim;
