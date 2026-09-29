/**
 * C6 Science -- Garbage in, Garbage out
 *
 * One chapter concept: household waste splits into TWO kinds --
 * biodegradable waste rots into compost in days-to-months and feeds
 * the soil again, while non-biodegradable waste (plastic, glass,
 * metal) stays almost unchanged for hundreds of years. That is why we
 * segregate into green and blue bins.
 *
 * Interaction model: sort each item into the green (wet/compost) or
 * blue (dry/recycle) bin, then drag the day slider or jump 500 years
 * to watch the compost pile rot -- and watch the plastic NOT move.
 */
import React, { useState } from 'react';

type Item = { name: string; emojiColor: string; bio: boolean; rotDays: number };

// rotDays: honest order-of-magnitude times for natural decomposition
const ITEMS: Item[] = [
  { name: 'Banana peel', emojiColor: '#facc15', bio: true, rotDays: 30 },
  { name: 'Paper bag', emojiColor: '#d6d3d1', bio: true, rotDays: 40 },
  { name: 'Dry leaf', emojiColor: '#a16207', bio: true, rotDays: 25 },
  { name: 'Cotton cloth', emojiColor: '#f9a8d4', bio: true, rotDays: 170 },
  { name: 'Plastic bottle', emojiColor: '#60a5fa', bio: false, rotDays: 164250 }, // ~450 years
  { name: 'Polythene bag', emojiColor: '#93c5fd', bio: false, rotDays: 365000 }, // up to ~1000 years
  { name: 'Glass jar', emojiColor: '#a7f3d0', bio: false, rotDays: 36500000 }, // effectively never
  { name: 'Steel spoon', emojiColor: '#9ca3af', bio: false, rotDays: 18250 }, // ~50 years
];

function C6_ScienceGarbageInGarbageOutSim() {
  const [selected, setSelected] = useState(0);
  const [bins, setBins] = useState<Record<number, 'green' | 'blue'>>({});
  const [days, setDays] = useState(0);

  const reset = () => {
    setBins({});
    setDays(0);
    setSelected(0);
  };

  const put = (bin: 'green' | 'blue') => {
    setBins({ ...bins, [selected]: bin });
    const next = ITEMS.findIndex((_, i) => bins[i] === undefined && i !== selected);
    if (next >= 0) setSelected(next);
  };

  const sortedCount = Object.keys(bins).length;
  const composted = (it: Item): number => (bins[ITEMS.indexOf(it)] === 'green' ? Math.min(1, days / it.rotDays) : 0);
  const allGreenRotting = ITEMS.filter((it) => bins[ITEMS.indexOf(it)] === 'green');
  const readyCompost = allGreenRotting.length > 0 && allGreenRotting.every((it) => days >= it.rotDays);
  const years = days >= 730 ? Math.round(days / 365) : 0;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-emerald-200 shadow-xl font-sans text-slate-800">
      <h2 className="text-xl md:text-2xl font-black text-emerald-700">Garbage in, garbage out -- sort it, then race time</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Kitchen waste <b>rots</b>: bacteria eat it and turn it into dark, rich <b>compost</b>. Plastic, glass and
        metal hardly <b>rot at all</b> -- a bottle stays for hundreds of years. Sort every item, then travel
        through time and see which pile survives!
      </p>

      <div className="grid md:grid-cols-[1fr_240px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 overflow-hidden">
          <svg viewBox="0 0 640 280" className="w-full">
            <rect width="640" height="280" fill="#f0fdf4" />
            <text x="320" y="26" textAnchor="middle" fontSize="15" fontWeight="900" fill="#166534">
              Time machine: {years > 0 ? years + ' years passed' : days + ' days passed'}
            </text>
            {/* green bin pile */}
            <rect x="20" y="60" width="280" height="190" rx="14" fill="#dcfce7" stroke="#22c55e" strokeWidth="3" />
            <text x="160" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#166534">GREEN bin pile (rotting)</text>
            {ITEMS.filter((it) => it.bio).map((it, idx) => {
              const f = composted(it);
              const w = 60 * (1 - f * 0.92);
              const inGreen = bins[ITEMS.indexOf(it)] === 'green';
              return (
                <g key={it.name} opacity={inGreen ? 1 : 0.25} style={{ transition: 'opacity 0.3s' }}>
                  <rect x={40 + (idx % 2) * 130} y={80 + Math.floor(idx / 2) * 42} width={inGreen ? Math.max(5, w) : 60} height="26" rx="13" fill={f >= 1 ? '#4c1d95' : it.emojiColor} style={{ transition: 'width 0.4s ease, fill 0.4s' }} />
                  <text x={40 + (idx % 2) * 130 + 32} y={80 + Math.floor(idx / 2) * 42 + 17} textAnchor="middle" fontSize="9" fontWeight="bold" fill={f >= 1 ? '#f5f3ff' : '#1f2937'}>
                    {f >= 1 ? 'compost!' : it.name}
                  </text>
                </g>
              );
            })}
            {/* blue bin pile */}
            <rect x="340" y="60" width="280" height="190" rx="14" fill="#dbeafe" stroke="#3b82f6" strokeWidth="3" />
            <text x="480" y="50" textAnchor="middle" fontSize="12" fontWeight="bold" fill="#1e3a8a">BLUE bin pile (recycling)</text>
            {ITEMS.filter((it) => !it.bio).map((it, idx) => {
              const inBlue = bins[ITEMS.indexOf(it)] === 'blue';
              return (
                <g key={it.name} opacity={inBlue ? 1 : 0.25} style={{ transition: 'opacity 0.3s' }}>
                  <rect x={360 + (idx % 2) * 130} y={80 + Math.floor(idx / 2) * 42} width="60" height="26" rx="4" fill={it.emojiColor} />
                  <text x={360 + (idx % 2) * 130 + 30} y={80 + Math.floor(idx / 2) * 42 + 17} textAnchor="middle" fontSize="8.5" fontWeight="bold" fill="#1f2937">
                    {inBlue ? 'UNCHANGED' : it.name}
                  </text>
                </g>
              );
            })}
            {readyCompost && (
              <text x="160" y="268" textAnchor="middle" fontSize="13" fontWeight="900" fill="#7c3aed">
                Compost ready -- food for plants again!
              </text>
            )}
          </svg>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-slate-100 rounded-2xl">
            <div className="text-xs uppercase tracking-widest text-slate-500">Now sorting ({sortedCount}/8 done)</div>
            <div className="text-lg font-black text-slate-800" style={{ color: ITEMS[selected].emojiColor }}>
              {ITEMS[selected].name}
            </div>
            <div className="text-[11px] text-slate-500">
              Made by nature or by a factory? Rots in {ITEMS[selected].rotDays > 1000 ? Math.round(ITEMS[selected].rotDays / 365) + ' years' : ITEMS[selected].rotDays + ' days'}.
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => put('green')} className="min-h-11 px-2 rounded-xl text-xs font-black bg-green-500 text-white hover:bg-green-600 transition-colors">
              Green bin (wet, rots)
            </button>
            <button onClick={() => put('blue')} className="min-h-11 px-2 rounded-xl text-xs font-black bg-gold-500 text-white hover:bg-gold-600 transition-colors">
              Blue bin (dry, recycle)
            </button>
          </div>
          <div className="flex flex-wrap gap-1">
            {ITEMS.map((it, i) => (
              <button key={it.name} onClick={() => setSelected(i)} className={'w-7 h-7 rounded-full text-[10px] font-black ' + (bins[i] ? (bins[i] === 'green' ? 'bg-green-500 text-white' : 'bg-gold-500 text-white') : i === selected ? 'bg-amber-400' : 'bg-slate-200 text-slate-500')}>
                {i + 1}
              </button>
            ))}
          </div>
          <div>
            <label className="flex justify-between text-xs font-semibold text-slate-500">
              <span>Days passed</span>
              <span className="text-emerald-700 font-black">{days}</span>
            </label>
            <input type="range" min={0} max={1825} step={5} value={Math.min(days, 1825)} onChange={(e) => setDays(Number(e.target.value))} className="w-full accent-emerald-500" />
            <button onClick={() => setDays(182625)} className="w-full mt-1 px-3 py-2 rounded-xl text-xs font-black bg-gold-500 text-white hover:bg-gold-600 transition-colors">
              Jump 500 years!
            </button>
          </div>
          <button onClick={reset} className="w-full px-3 py-2 rounded-xl text-xs font-black bg-slate-800 text-white hover:bg-slate-700 transition-colors">
            Reset
          </button>
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-rose-50 border-2 border-rose-200">
        <div className="text-sm font-black text-rose-800">Misconception buster</div>
        <div className="text-xs text-rose-700 mt-0.5">
          "Everything rots eventually, so why bother?" Jump 500 years and look at the blue bin: the bottle is UNCHANGED. It does not become soil -- it crumbles into tiny pieces that poison it.
        </div>
      </div>

      <div className="mt-4 p-3 rounded-2xl bg-gold-50 border-2 border-gold-200">
        <div className="text-sm font-black text-gold-800">What to try</div>
        <ol className="text-xs text-gold-700 list-decimal list-inside mt-1 space-y-1">
          <li>How many days until ALL the green-bin items become compost? Set the slider there and check the purple compost.</li>
          <li>Sort cotton cloth, then find how many times LONGER a plastic bottle takes to disappear than the cloth.</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceGarbageInGarbageOutSim };
export default C6_ScienceGarbageInGarbageOutSim;
