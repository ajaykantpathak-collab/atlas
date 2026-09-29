'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Indian architecture across 4,000 years, read as DATA: each era is a row with a date, a material, a function ' +
  'and a signature feature. Scrub the timeline, then use the feature filters to see which techniques appeared ' +
  'when -- and how styles borrowed from the eras before them.';

interface Era {
  year: number; // approximate BCE negative
  display: string;
  name: string;
  material: string;
  fn: string;
  feature: string;
  tags: string[]; // feature-filter keys
}

const ERAS: Era[] = [
  { year: -2500, display: '2500 BCE', name: 'Harappan cities', material: 'Burnt brick, baked clay', fn: 'Urban housing, granaries, drainage', feature: 'Grid streets with covered drains', tags: ['brick', 'water'] },
  { year: -250, display: '250 BCE', name: 'Stupas (Sanchi, Bharhut)', material: 'Brick and dressed stone', fn: 'Relic shrine: circular walkway for pradakshina', feature: 'Hemispherical mound with gateways', tags: ['stone', 'symbol'] },
  { year: -100, display: '100 BCE', name: 'Rock-cut chaityas and viharas', material: 'Solid basalt carved inwards', fn: 'Prayer halls and monasteries', feature: 'Interior carved out of mountain rock', tags: ['stone', 'symbol'] },
  { year: 500, display: '500 CE', name: 'First stone temples (Nagara and Dravida)', material: 'Sandstone, granite blocks', fn: 'House of the deity: garbhagriha and tower', feature: 'Two regional styles of temple tower', tags: ['stone', 'symbol'] },
  { year: 1250, display: '1250 CE', name: 'Sultanate arches and domes', material: 'Masonry with lime mortar', fn: 'Mosques, tombs, forts', feature: 'True arch and dome (arcuate build)', tags: ['arch', 'stone'] },
  { year: 1650, display: '1650 CE', name: 'Mughal synthesis (Fatehpur Sikri, Taj Mahal)', material: 'Red sandstone, white marble inlay', fn: 'Imperial tombs, courts, charbagh gardens', feature: 'Dome + garden + inlay merged into one style', tags: ['arch', 'water', 'symbol'] },
  { year: 1900, display: '1900 CE', name: 'Colonial Indo-Saracenic', material: 'Brick, steel, stucco', fn: 'Railway stations, courts, memorial halls', feature: 'Gothic + Mughal hybrid for the Empire', tags: ['arch', 'brick', 'water'] },
];

const TAG_META: Record<string, string> = { stone: 'Dressed stone', brick: 'Brick', arch: 'Arch and dome', water: 'Water design', symbol: 'Sacred geometry' };

const eraX = (e: Era) => 40 + ((Math.log10(e.year + 3000) - 3.38) / 0.3) * 300; // log-ish mapping across timeline

export function C11_EconomicsIndianArtArchitectureSim() {
  const [idx, setIdx] = useState(0);
  const [filter, setFilter] = useState<string | null>(null);

  const era = ERAS[idx];
  const matchCount = useMemo(() => (filter ? ERAS.filter((e) => e.tags.includes(filter)).length : ERAS.length), [filter]);

  const reset = () => {
    setIdx(0);
    setFilter(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">The Architecture Timeline Mapper</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      {/* Timeline */}
      <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 400 190" className="w-full">
          <line x1={40} y1={150} x2={360} y2={150} stroke="#475569" strokeWidth={3} />
          <text x={40} y={172} fontSize={10} fill="#64748b">2500 BCE</text>
          <text x={200} y={172} textAnchor="middle" fontSize={10} fill="#64748b">500 CE</text>
          <text x={360} y={172} textAnchor="end" fontSize={10} fill="#64748b">1900 CE</text>
          {ERAS.map((e, i) => {
            const x = eraX(e);
            const dim = filter !== null && !e.tags.includes(filter);
            return (
              <g key={e.display} onClick={() => setIdx(i)} className="cursor-pointer" opacity={dim ? 0.25 : 1} style={{ transition: 'opacity 0.3s' }}>
                <circle cx={x} cy={150} r={idx === i ? 9 : 6} fill={idx === i ? '#818cf8' : '#38bdf8'} stroke="#e2e8f0" strokeWidth={idx === i ? 2 : 0} style={{ transition: 'all 0.3s' }} />
                <text x={x} y={135} textAnchor="middle" fontSize={9} fill="#94a3b8">{e.display}</text>
                <text x={x} y={idx === i ? 122 : 126} textAnchor="middle" fontSize={8.5} fill={idx === i ? '#c7d2fe' : '#64748b'} style={{ transition: 'all 0.3s' }}>
                  {e.name.split(' ').slice(0, 2).join(' ')}
                </text>
              </g>
            );
          })}
          {/* marker needle */}
          <line x1={eraX(era)} y1={40} x2={eraX(era)} y2={146} stroke="#818cf8" strokeWidth={1.5} strokeDasharray="3 3" style={{ transition: 'all 0.3s' }} />
          <text x={200} y={20} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#e2e8f0">
            {era.display}: {era.name} {filter && `-- ${matchCount}/7 eras share "${TAG_META[filter]}"`}
          </text>
          <text x={200} y={188} textAnchor="middle" fontSize={10} fill="#94a3b8">Tap any dot to inspect that era</text>
        </svg>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Era card */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Era record: {era.display}</div>
          <div className="font-bold text-gold-300">{era.name}</div>
          <div className="text-slate-300">Material: <span className="font-mono text-gold-300">{era.material}</span></div>
          <div className="text-slate-300">Function: <span className="font-mono text-gold-300">{era.fn}</span></div>
          <div className="text-slate-300">Signature: <span className="font-mono text-emerald-300">{era.feature}</span></div>
          <div className="flex flex-wrap gap-1 pt-1">
            {era.tags.map((t) => (
              <span key={t} className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-slate-800 border border-slate-600 text-slate-300">{TAG_META[t]}</span>
            ))}
          </div>
        </div>

        {/* Feature filters */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-2">
          <div className="text-xs uppercase tracking-wide text-slate-400">Feature filter</div>
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(TAG_META).map(([k, label]) => (
              <button
                key={k}
                onClick={() => setFilter(filter === k ? null : k)}
                className={`min-h-11 rounded-xl text-[11px] font-semibold border ${filter === k ? 'bg-gold-600 border-gold-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
              >
                {label}
                <span className="block text-[9px] font-normal text-slate-400">{ERAS.filter((e) => e.tags.includes(k)).length} of 7 eras</span>
              </button>
            ))}
          </div>
          <div className="text-amber-300 text-xs pt-2 border-t border-slate-800">
            Misconception killer: &quot;Indian architecture is one unchanging temple style.&quot; The timeline shows repeated borrowing --
            the arch came via the Sultanate, marble inlay via the Mughals, steel roofs via the colonial era. Styles travel and mix.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 mt-4">
        <label className="text-xs text-slate-300 flex justify-between">
          <span>Scrub the timeline</span>
          <span className="font-mono font-bold text-gold-300">{era.display}</span>
        </label>
        <input type="range" aria-label="timeline" min={0} max={ERAS.length - 1} step={1} value={idx}
          onChange={(e) => setIdx(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        <div className="flex justify-between text-[10px] text-slate-500 px-1">
          {ERAS.map((e, i) => (
            <span key={e.display} className={i === idx ? 'text-gold-300 font-bold' : ''}>{i % 2 === 0 ? e.display : ''}</span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={() => { setFilter('arch'); setIdx(4); }} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-gold-600 border-gold-400 hover:bg-gold-500">
          Show when the dome arrived
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Filter by &quot;Water design&quot;. Which two eras engineer water, and what changed between Harappan drains and Mughal charbagh canals?</li>
          <li>Jump to 1250 CE, then 1650 CE. List what the Mughal era KEEPS from the Sultanate era and what it adds -- borrow, not replace?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_EconomicsIndianArtArchitectureSim;
