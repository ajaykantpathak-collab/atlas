'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 History -- Bhakti-Sufi Traditions
 * ONE concept: devotional movements answered the same question -- can a
 * person reach god directly, without priests, ritual or language barriers?
 * Pick a voice, move the ritual-to-love dial, hear the theology shift.
 * react + tailwind only.
 */

type Voice = 'kabir' | 'nanak' | 'mirabai' | 'basavanna' | 'nizamuddin';

const VOICES: { id: Voice; name: string; tradition: string; language: string; line: string; ritual: number; caste: number }[] = [
  { id: 'kabir', name: 'Kabir', tradition: 'Nirguna bhakti (weaver of Varanasi)', language: 'sadhu-kadi boli, the people\'s speech', line: 'The stone you worship, the stone you need -- where is the god in the stone?', ritual: 5, caste: 5 },
  { id: 'nanak', name: 'Guru Nanak', tradition: 'Sikh path', language: 'Punjabi hymns (shabad)', line: 'There is no Hindu, there is no Musalman -- repeat the Name, serve all.', ritual: 15, caste: 10 },
  { id: 'mirabai', name: 'Mirabai', tradition: 'Saguna bhakti (Krishna\'s bride)', language: 'Rajasthani song', line: 'I have left the palace; my Lord is the dark one of the flute.', ritual: 25, caste: 20 },
  { id: 'basavanna', name: 'Basavanna', tradition: 'Virashaiva (Lingayat)', language: 'Kannada vachanas', line: 'The rich will make temples -- what shall I, a poor man, do? My body is the temple.', ritual: 8, caste: 3 },
  { id: 'nizamuddin', name: 'Nizamuddin Auliya', tradition: 'Chishti silsila (Sufi)', language: 'Persian + Hindavi', line: 'The Sufi keeps his distance from thrones; the door of the khanqah opens to all.', ritual: 20, caste: 15 }
];

export function C12_HistoryBhaktiSufiTraditionsSim() {
  const [voice, setVoice] = useState<Voice>('kabir');
  const [ritualDial, setRitualDial] = useState(50); // 0 = pure love/devotion, 100 = orthodoxy/ritual
  const [courtDistance, setCourtDistance] = useState(80); // distance from political power
  const [crowd, setCrowd] = useState(40); // popular following

  const v = VOICES.find((x) => x.id === voice)!;
  // theology positions: the voice pulls the dial toward its own stance
  const stanceRitual = Math.round(ritualDial * 0.4 + v.ritual * 0.6);
  const stanceCaste = Math.round(v.caste * 0.5 + (100 - ritualDial) * 0.2 + crowd * 0.3);
  // royal patronage vs distance from court
  const patronage = Math.max(0, 100 - courtDistance);
  const purity = courtDistance;
  const reach = Math.min(100, Math.round(crowd * 0.6 + (100 - stanceRitual) * 0.3 + (v.id === 'nizamuddin' ? 10 : 0)));

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-fuchsia-950/80 rounded-2xl border border-fuchsia-700">🎙️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-fuchsia-400">Class 12 -- Bhakti-Sufi Traditions</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Five Voices, One Question: God Without Gatekeepers?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* ritual vs love axis */}
            <line x1={40} y1={200} x2={420} y2={200} stroke="#475569" strokeWidth={2} />
            <text x={40} y={222} fontSize={9} fill="#34d399">direct devotion (bhakti / ishq)</text>
            <text x={420} y={222} fontSize={9} fill="#fb7185" textAnchor="end">brahmanical / sharia ritual</text>
            {/* marker */}
            <circle cx={40 + stanceRitual * 3.8} cy={200} r={10} fill="#e879f9" className="transition-all duration-500" />
            <line x1={40 + stanceRitual * 3.8} y1={140} x2={40 + stanceRitual * 3.8} y2={200} stroke="#e879f9" strokeWidth={1.5} strokeDasharray="3 3" className="transition-all duration-500" />
            <text x={40 + stanceRitual * 3.8} y={132} fontSize={10} fill="#f0abfc" textAnchor="middle" fontFamily="monospace">
              stance: {stanceRitual}
            </text>
            {/* the voice's quote */}
            <rect x={30} y={30} width={400} height={80} rx={12} fill="#1e1b3a" stroke="#6d28d9" />
            <text x={230} y={54} fontSize={12} fill="#f0abfc" textAnchor="middle" fontWeight="bold">{v.name} -- {v.tradition}</text>
            <text x={230} y={76} fontSize={10.5} fill="#e2e8f0" textAnchor="middle" fontStyle="italic">&quot;{v.line}&quot;</text>
            <text x={230} y={96} fontSize={9} fill="#94a3b8" textAnchor="middle">language: {v.language}</text>
            {/* caste-barrier and court meters */}
            <g transform="translate(50,242)">
              <text x={0} y={0} fontSize={9} fill="#94a3b8">caste barrier broken: {stanceCaste}%</text>
              <rect x={0} y={6} width={150} height={9} rx={4} fill="#1e293b" />
              <rect x={0} y={6} width={stanceCaste * 1.5} height={9} rx={4} fill="#34d399" className="transition-all duration-500" />
            </g>
            <g transform="translate(250,242)">
              <text x={0} y={0} fontSize={9} fill="#94a3b8">reach to common folk: {reach}%</text>
              <rect x={0} y={6} width={150} height={9} rx={4} fill="#1e293b" />
              <rect x={0} y={6} width={reach * 1.5} height={9} rx={4} fill="#38bdf8" className="transition-all duration-500" />
            </g>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Ritual stance</p>
              <p className="font-mono font-bold text-fuchsia-300">{stanceRitual}/100</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Court patronage</p>
              <p className="font-mono font-bold text-amber-300">{patronage}%</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Khanqah purity</p>
              <p className="font-mono font-bold text-emerald-300">{purity}%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            {VOICES.map((x) => (
              <button key={x.id} onClick={() => setVoice(x.id)}
                className={`min-h-11 w-full rounded-xl text-xs font-bold text-left px-3 ${voice === x.id ? 'bg-fuchsia-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                {x.name} <span className="opacity-60 font-normal">-- {x.tradition.split(' (')[0]}</span>
              </button>
            ))}
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Ritual &lt;-&gt; love dial</span><span className="font-mono font-bold text-fuchsia-400">{ritualDial}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={ritualDial} aria-label="ritual dial"
                onChange={(e) => setRitualDial(Number(e.target.value))} className="w-full min-h-11 accent-fuchsia-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Distance from royal court</span><span className="font-mono font-bold text-amber-400">{courtDistance}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={courtDistance} aria-label="court distance"
                onChange={(e) => setCourtDistance(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Popular following</span><span className="font-mono font-bold text-sky-400">{crowd}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={crowd} aria-label="following"
                onChange={(e) => setCrowd(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
            </div>
            <button onClick={() => { setVoice('kabir'); setRitualDial(50); setCourtDistance(80); setCrowd(40); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Bhakti was Hindu and Sufism was Muslim -- two separate streams.&quot; Slide the
              ritual dial and read the quotes: Kabir mocks BOTH temple and mosque; Chishti khanqahs
              sang Hindavi songs; the traditions borrowed languages, metres and metaphors. They are
              one conversation, not two streams.
            </p>
          </div>

          <div className="bg-fuchsia-950/40 rounded-2xl border border-fuchsia-800/50 p-4 text-xs">
            <p className="font-bold text-fuchsia-300 mb-1">What to try</p>
            <p>1. Switch from Kabir to Mirabai. Whose caste-barrier bar stays high -- and why does a queen who left her palace break it differently?</p>
            <p>2. Drag court distance to 0 (embrace the Sultan). Watch patronage rise and khanqah purity fall. What did the Chishtis actually choose, historically?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_HistoryBhaktiSufiTraditionsSim;
