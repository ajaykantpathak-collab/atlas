'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 History -- Writing and City Life (Mesopotamia)
 * ONE concept: writing was invented because cities outgrew memory --
 * tallies of grain, sheep and debts. Press tokens into a clay tablet,
 * grow the city, watch scribes appear. react + tailwind only.
 */

type Token = 'barley' | 'sheep' | 'beer' | 'labour' | 'silver';

const TOKENS: { id: Token; wedge: string; label: string; glyph: string }[] = [
  { id: 'barley', wedge: 'M8,4 L16,4 L14,14 L6,14 Z', label: 'barley (jars of grain)', glyph: '#' },
  { id: 'sheep', wedge: 'M12,2 L20,10 L12,18 L4,10 Z', label: 'sheep (heads)', glyph: 'O' },
  { id: 'beer', wedge: 'M6,4 L18,4 L16,16 L8,16 Z', label: 'beer (jars)', glyph: '@' },
  { id: 'labour', wedge: 'M4,10 L20,6 L20,14 L4,14 Z', label: 'labour days', glyph: 'V' },
  { id: 'silver', wedge: 'M10,3 L17,10 L10,17 L3,10 Z', label: 'silver (shekels)', glyph: 'o' }
];

export function C11_HistoryWritingCityLifeSim() {
  const [records, setRecords] = useState<{ t: Token; n: number }[]>([]);
  const [citySize, setCitySize] = useState(20); // hundred people
  const [irrigation, setIrrigation] = useState(50); // canal maintenance need

  const needs = useMemo(() => {
    const grain = Math.ceil(citySize * 0.8 / 10);
    const sheep = Math.ceil(citySize / 40);
    const beer = Math.ceil(citySize / 100);
    const labour = Math.ceil((citySize * irrigation) / 2000);
    return { barley: grain, sheep, beer, labour, silver: 0 };
  }, [citySize, irrigation]);

  const debt = Math.max(0, (needs.barley - (records.find((r) => r.t === 'barley')?.n || 0)) * 3
    + (needs.labour - (records.find((r) => r.t === 'labour')?.n || 0)));
  const famine = debt > 12;

  const press = (t: Token) => {
    setRecords((prev) => {
      const ex = prev.find((r) => r.t === t);
      if (ex) return prev.map((r) => (r.t === t ? { ...r, n: r.n + 1 } : r));
      return [...prev, { t, n: 1 }];
    });
  };

  const neededScribes = Math.min(12, Math.max(1, Math.ceil(citySize / 40 + records.length / 6)));

  const clearTablet = () => setRecords([]);

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-yellow-950/80 rounded-2xl border border-yellow-700">🧱</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-yellow-400/90">Class 11 -- Writing and City Life</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Uruk&apos;s Tablet: Cities Outgrow Memory</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full">
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#0b1220" />
            {/* city skyline */}
            {Array.from({ length: 7 }, (_, i) => {
              const h = 20 + (citySize / 100) * 60 + (i === 3 ? 26 : 0) + (i % 2) * 8;
              return <rect key={i} x={30 + i * 30} y={96 - h} width={22} height={h} fill="#a16207"
                stroke="#d6d3d1" strokeWidth={0.6} className="transition-all duration-300" opacity={0.9} />;
            })}
            <text x={140} y={110} fontSize={9} fill="#fcd34d">the temple ziggurat (center) -- where records are kept</text>
            {/* canals */}
            <path d="M20,120 C120,140 340,140 440,120" stroke="#0ea5e9" strokeWidth={4 + irrigation * 0.04} fill="none"
              opacity={0.7} className="transition-all duration-300">
              <animate attributeName="stroke-dasharray" values="10,6;16,6" dur="1.4s" repeatCount="indefinite" />
            </path>
            <text x={230} y={145} fontSize={9} fill="#7dd3fc" textAnchor="middle">
              canals need {needs.labour} labour-day records/season (irrigation {irrigation})
            </text>
            {/* clay tablet */}
            <rect x={40} y={160} width={240} height={104} rx={8} fill="#d6c7a1" stroke="#78350f" strokeWidth={2} />
            <text x={160} y={176} fontSize={9} fill="#78350f" textAnchor="middle" fontWeight="bold">TABLET OF THE HOUSE OF BARLEY</text>
            {records.length === 0 && (
              <text x={160} y={220} fontSize={10} fill="#92400e" textAnchor="middle">empty clay -- press wedges on the right</text>
            )}
            {records.map((r, i) => {
              const tok = TOKENS.find((t) => t.id === r.t)!;
              return (
                <text key={i} x={56 + Math.floor(i / 3) * 78} y={198 + (i % 3) * 18} fontSize={12} fill="#451a03" fontFamily="monospace">
                  {tok.glyph.repeat(Math.min(6, r.n))} x{r.n}
                </text>
              );
            })}
            {/* debt panel */}
            <rect x={300} y={160} width={140} height={104} rx={8} fill={famine ? '#450a0a' : '#0c1c33'}
              stroke={famine ? '#f43f5e' : '#1e3a5f'} className="transition-colors duration-300" />
            <text x={370} y={182} fontSize={10} fill="#cbd5e1" textAnchor="middle">scribes employed: {neededScribes}</text>
            <text x={370} y={202} fontSize={10} fill="#cbd5e1" textAnchor="middle">city needs:</text>
            <text x={310} y={220} fontSize={9} fill="#94a3b8">barley {needs.barley}, sheep {needs.sheep}, beer {needs.beer}</text>
            <text x={310} y={236} fontSize={9} fill="#94a3b8">labour {needs.labour} days</text>
            <text x={370} y={256} fontSize={11} fontWeight="bold" textAnchor="middle"
              fill={famine ? '#fb7185' : '#34d399'}>
              {famine ? 'shortfall! grain debt ' + debt : 'accounts balanced (debt ' + debt + ')'}
            </text>
          </svg>
          <div className="grid grid-cols-4 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">City population</p>
              <p className="font-mono font-bold text-amber-300">{citySize}00</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Records on tablet</p>
              <p className="font-mono font-bold text-stone-200">{records.reduce((s, r) => s + r.n, 0)}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Scribes needed</p>
              <p className="font-mono font-bold text-sky-300">{neededScribes}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Debt units</p>
              <p className={`font-mono font-bold ${famine ? 'text-rose-400' : 'text-emerald-300'}`}>{debt}</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-2">
            <p className="text-[11px] text-slate-400 font-bold">Press a wedge (records one unit):</p>
            {TOKENS.map((t) => (
              <button key={t.id} onClick={() => press(t.id)}
                className="min-h-11 w-full rounded-xl text-xs font-bold bg-stone-100 text-stone-900 hover:bg-amber-100 flex items-center gap-3 px-3">
                <svg viewBox="0 0 24 20" width={26} height={20}><path d={t.wedge} fill="#451a03" /></svg>
                {t.label}
              </button>
            ))}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button onClick={clearTablet}
                className="min-h-11 rounded-xl text-xs font-bold bg-rose-700 hover:bg-rose-600">Wipe tablet</button>
              <button onClick={() => { setRecords([]); setCitySize(20); setIrrigation(50); }}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>City population (hundreds)</span><span className="font-mono font-bold text-amber-400">{citySize}00</span>
              </div>
              <input type="range" min={5} max={100} step={5} value={citySize} aria-label="city size"
                onChange={(e) => setCitySize(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Canal irrigation demand</span><span className="font-mono font-bold text-sky-400">{irrigation}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={irrigation} aria-label="irrigation"
                onChange={(e) => setIrrigation(Number(e.target.value))} className="w-full min-h-11 accent-sky-500" />
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Writing began with poems and stories.&quot; The first tablets are receipts -- barley,
              beer, labour debts. Literature came centuries LATER. Writing was urban bookkeeping
              before it was culture.
            </p>
          </div>

          <div className="bg-yellow-950/40 rounded-2xl border border-yellow-800/50 p-4 text-xs">
            <p className="font-bold text-yellow-300 mb-1">What to try</p>
            <p>1. Grow the city to 100 hundred people but record nothing. Read the shortfall -- why does a big city REQUIRE writing?</p>
            <p>2. Push irrigation to 100 and cover the labour debt with wedge presses. Who in the city gets paid in silver -- and why is there no silver token yet?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HistoryWritingCityLifeSim;
