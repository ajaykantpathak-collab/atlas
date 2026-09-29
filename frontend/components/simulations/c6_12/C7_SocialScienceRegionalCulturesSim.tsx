'use client';
/**
 * C7_SocialScienceRegionalCulturesSim (Class 7 Social Science)
 *
 * ELI5: Regional cultures were not born "pure" -- they MIXED. Pick a region on
 * the map, drag the century dial from 600 to 1900 CE, and watch language,
 * food, festival and court art appear when history actually made them. Court
 * patronage switch adds the court layer.
 */
import React, { useState } from 'react';

interface Region { id: string; name: string; x: number; y: number; lang: string; family: string; food: string; festival: string; folk: string; lit: { name: string; since: number }; court: { name: string; since: number; patron: string } }
const REGIONS: Region[] = [
  { id: 'punjab', name: 'Punjab', x: 70, y: 62, lang: 'Punjabi', family: 'Indo-Aryan', food: 'wheat roti, lassi, sarson saag', festival: 'Baisakhi harvest fair', folk: 'bhangra and gidda dances', lit: { name: 'Adi Granth compiled by Guru Arjan', since: 1600 }, court: { name: 'Harmandir Sahib gilded with gold', since: 1800, patron: 'Maharaja Ranjit Singh' } },
  { id: 'rajasthan', name: 'Rajasthan', x: 62, y: 140, lang: 'Rajasthani (Marwari, Mewari)', family: 'Indo-Aryan', food: 'dal-baati-churma, bajra', festival: 'Teej and Gangaur', folk: 'heroic ballads of Pabuji', lit: { name: 'Prithviraj Raso, heroic poems', since: 1200 }, court: { name: 'Mewar school of miniatures', since: 1600, patron: 'Sisodia rulers of Mewar' } },
  { id: 'bengal', name: 'Bengal', x: 235, y: 105, lang: 'Bengali', family: 'Indo-Aryan (Sanskrit + local tongue)', food: 'rice and fish, sweets of chhena', festival: 'Durga Puja', folk: 'pata scroll painting', lit: { name: 'Mangalkavya poems, Chaitanya songs', since: 1500 }, court: { name: 'court orders Bengali translations', since: 1500, patron: 'Sultan Hussain Shah' } },
  { id: 'odisha', name: 'Odisha', x: 205, y: 170, lang: 'Odia', family: 'Indo-Aryan', food: 'rice, mahura, chhena poda', festival: 'Jagannath Rath Yatra at Puri', folk: 'Odissi temple dance', lit: { name: 'Sarala Das Odia Mahabharata', since: 1450 }, court: { name: 'Gajapati kings expand Jagannath temple', since: 1500, patron: 'Gajapati dynasty' } },
  { id: 'kerala', name: 'Kerala', x: 125, y: 245, lang: 'Malayalam', family: 'Sanskrit + old Tamil mix', food: 'rice, coconut, banana leaf meals', festival: 'Onam', folk: 'theyyam rituals', lit: { name: 'Manipravalam: Sanskrit + Malayalam "diamond-coral"', since: 1400 }, court: { name: 'Kathakali takes shape in temples-courts', since: 1650, patron: 'chiefs of Kerala' } },
];

export function C7_SocialScienceRegionalCulturesSim() {
  const [sel, setSel] = useState('bengal');
  const [century, setCentury] = useState(1900);
  const [patronage, setPatronage] = useState(false);
  const r = REGIONS.find((x) => x.id === sel)!;
  const show = (since: number) => century >= since;
  const traits = [true, show(r.lit.since), patronage && show(r.court.since)].filter(Boolean).length;
  const reset = () => { setSel('bengal'); setCentury(1900); setPatronage(false); };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap justify-between gap-2 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 7 History - The Making of Regional Cultures</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Culture Map: Watch a Region Assemble Itself</h1>
        </div>
        <button onClick={reset} className="min-h-11 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold transition-all">Reset</button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900/70 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 320 300" className="w-full">
            <path d="M60 30 L110 20 L150 45 L160 80 L200 70 L250 60 L285 95 L260 130 L270 170 L230 200 L210 250 L165 285 L120 270 L95 230 L55 200 L40 150 L45 90 Z"
              fill="#0f172a" stroke="#334155" strokeWidth="2" />
            {REGIONS.map((g) => {
              const active = g.id === sel;
              const lit = show(g.lit.since);
              return (
                <g key={g.id} onClick={() => setSel(g.id)} style={{ cursor: 'pointer' }}>
                  <circle cx={g.x} cy={g.y} r={active ? 26 : 20}
                    fill={active ? '#4f46e5' : lit ? '#166534' : '#1e293b'} fillOpacity={active ? 0.85 : 0.7}
                    stroke={active ? '#c7d2fe' : lit ? '#4ade80' : '#475569'} strokeWidth="2"
                    style={{ transition: 'all 300ms' }} />
                  <text x={g.x} y={g.y + 4} fontSize="9" fontWeight="bold" fill="#e2e8f0" textAnchor="middle">{g.name}</text>
                  {patronage && show(g.court.since) && (
                    <circle cx={g.x} cy={g.y} r="30" fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 4" opacity="0.9" />
                  )}
                </g>
              );
            })}
          </svg>
          <div className="flex flex-wrap gap-1 mt-2">
            {REGIONS.map((g) => (
              <button key={g.id} onClick={() => setSel(g.id)}
                className={`min-h-11 px-2 rounded-lg text-[10px] font-bold border transition-all ${g.id === sel ? 'bg-gold-600 border-gold-400 text-white' : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-500'}`}>
                {g.name}
              </button>
            ))}
          </div>
          <p className="text-[11px] text-slate-400 mt-1 leading-snug">Tap a circle. Green = its literature has appeared by your chosen century. Gold dashed ring = court art active under patronage.</p>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <label className="text-xs font-semibold text-slate-400 flex justify-between">
              <span>Century dial</span><span className="font-mono text-gold-300">{century} CE</span>
            </label>
            <input type="range" min={600} max={1900} step={50} value={century} aria-label="century"
              onChange={(e) => setCentury(Number(e.target.value))} className="w-full mt-1 min-h-11 accent-gold-500" />
            <div className="flex justify-between text-[9px] font-mono text-slate-500 px-0.5">
              {[600, 800, 1000, 1200, 1400, 1600, 1800].map((c) => <span key={c}>{c}</span>)}
            </div>
            <button onClick={() => setPatronage((p) => !p)}
              className={`w-full mt-1 min-h-11 rounded-xl text-xs font-bold border transition-all ${patronage ? 'bg-amber-500 border-amber-400 text-slate-900' : 'bg-slate-950 border-slate-700 text-slate-300 hover:border-amber-500'}`}>
              Court patronage {patronage ? 'ON' : 'OFF'}
            </button>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 space-y-2">
            <p className="text-sm font-bold text-white">{r.name} in {century} CE <span className="text-[11px] font-normal text-slate-400">({traits} traits visible)</span></p>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"><span className="text-gold-300 font-bold">Language:</span> {r.lang} <span className="text-slate-500">-- {r.family}</span></div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"><span className="text-emerald-300 font-bold">Food:</span> {r.food}</div>
            <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-xs"><span className="text-gold-300 font-bold">Festival:</span> {r.festival} <span className="text-slate-500">-- {r.folk}</span></div>
            <div className={`p-2 rounded-lg border text-xs transition-all ${show(r.lit.since) ? 'bg-emerald-950/50 border-emerald-800 text-emerald-200' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <span className="font-bold">Literature {r.lit.since} CE:</span> {show(r.lit.since) ? r.lit.name : `not yet born (drag past ${r.lit.since})`}
            </div>
            <div className={`p-2 rounded-lg border text-xs transition-all ${patronage && show(r.court.since) ? 'bg-amber-950/50 border-amber-700 text-amber-200' : 'bg-slate-950 border-slate-800 text-slate-500'}`}>
              <span className="font-bold">Court art {r.court.since} CE:</span> {patronage ? (show(r.court.since) ? `${r.court.name} -- patron: ${r.court.patron}` : `not yet (needs ${r.court.since})`) : 'switch patronage ON to reveal'}
            </div>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">All five regions in {century} CE</p>
            <table className="w-full text-[11px]">
              <thead><tr className="text-slate-500">
                <th className="text-left py-1">Region</th><th className="text-left">Language</th><th className="text-left">Literature</th><th className="text-left">Court art</th>
              </tr></thead>
              <tbody>
                {REGIONS.map((g) => (
                  <tr key={g.id} className={`border-t border-slate-800 ${g.id === sel ? 'bg-gold-950/40' : ''}`}>
                    <td className="py-1 font-bold text-slate-200">{g.name}</td>
                    <td className="text-slate-400">{g.lang.split(' (')[0]}</td>
                    <td className={show(g.lit.since) ? 'text-emerald-300' : 'text-slate-600'}>{show(g.lit.since) ? 'born' : `from ${g.lit.since}`}</td>
                    <td className={patronage && show(g.court.since) ? 'text-amber-300' : 'text-slate-600'}>
                      {patronage ? (show(g.court.since) ? 'flourishing' : `from ${g.court.since}`) : 'patronage OFF'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-bold text-gold-300 mb-1">Spot the mix</p>
            <p>Bengali = Sanskrit + local speech. Malayalam = Sanskrit + old Tamil (that is what &quot;Manipravalam&quot; means: ruby-coral). Kathak moved from temple storytelling to Mughal-and-Awadh courts. Each row above only EXISTS because different currents met.</p>
            <p className="mt-2">Bengal&apos;s Chaitanya songs came from a Vaishnava wave; Rajasthan&apos;s heroic ballads grew from Rajput court culture; Kerala&apos;s Kathakali fused ritual, Sanskrit drama and local drumming -- region, religion and court braided together.</p>
            <p className="mt-2 text-slate-400">Notice the pattern in the table above: language first, literature centuries later, court art last. A culture builds in layers, like sediment.</p>
          </div>

          <div className="p-3 rounded-2xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
            <span className="font-bold">Misconception killer:</span> regional cultures are not ancient and unchanging. Bengali grew from Sanskrit PLUS local tongues; Malayalam from Sanskrit PLUS old Tamil. Rulers, saints and markets kept adding new layers every century.
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2 text-[11px]">
        <span className="text-slate-500 font-bold uppercase tracking-wider">Key words:</span>
        {['Manipravalam', 'Mangalkavya', 'miniature painting', 'Jagannath cult', 'Adi Granth', 'court patronage', 'lingua franca'].map((k) => (
          <span key={k} className="px-2 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300">{k}</span>
        ))}
      </div>

      <footer className="mt-4 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Set the dial to 1400 CE everywhere -- which of the five regions already has its literature, and which is still waiting?</p>
        <p className="mt-1">2. Turn patronage ON for Kerala: what did courts and temples add that folk tradition alone had not, and how many centuries after the language?</p>
      </footer>
    </div>
  );
}

export default C7_SocialScienceRegionalCulturesSim;
