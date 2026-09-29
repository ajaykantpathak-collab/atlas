'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 History -- Changing Cultural Traditions (Renaissance)
 * ONE concept: the Renaissance was a change in HOW Europeans saw --
 * literally. Linear perspective, humanism and the printing press
 * rebuild art and knowledge. Drag the vanishing point, fund the studio.
 * react + tailwind only.
 */

export function C11_HistoryChangingCulturalTraditionsSim() {
  const [vp, setVp] = useState({ x: 230, y: 120 }); // vanishing point
  const [perspective, setPerspective] = useState(70); // use of linear perspective 0-100
  const [patron, setPatron] = useState(50); // patron funding 0-100
  const [press, setPress] = useState(30); // printing press spread 0-100

  // perspective grid lines converge on vanishing point
  const gridLines = useMemo(() => {
    const out: string[] = [];
    for (let i = 0; i <= 10; i++) {
      const x = 20 + i * 42;
      out.push(`M${x},260 L${vp.x},${vp.y}`);
    }
    for (let j = 1; j <= 4; j++) {
      const t = j / 5;
      // horizontal lines get denser toward the horizon
      const y = 260 - (260 - vp.y) * Math.pow(t, 1.6) * (perspective / 100);
      out.push(`M20,${y.toFixed(1)} L440,${y.toFixed(1)}`);
    }
    return out;
  }, [vp, perspective]);

  // outputs: artworks, books, literacy -- driven by patron + press
  const artworks = Math.round((perspective * 0.5 + patron) * 1.4);
  const booksPerYear = Math.round(Math.pow(press / 100, 1.5) * 2000);
  const literacy = Math.min(60, Math.round(booksPerYear / 40 + patron * 0.1));
  const humanism = Math.round((perspective + press + patron) / 3);

  const moveVp = (e: React.MouseEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setVp({ x: ((e.clientX - r.left) / r.width) * 460, y: ((e.clientY - r.top) / r.height) * 280 });
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-amber-950/80 rounded-2xl border border-amber-700">🖼️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Class 11 -- Changing Cultural Traditions</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Renaissance Studio: Perspective, Patrons, Press</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 280" className="w-full" onClick={moveVp}
            style={{ cursor: 'crosshair' }}>
            <rect x={0} y={0} width={460} height={280} rx={10} fill="#1c1917" />
            {/* canvas frame */}
            <rect x={16} y={16} width={428} height={248} rx={6} fill="#292524" stroke="#a16207" strokeWidth={4} />
            {/* floor grid in perspective */}
            {gridLines.map((d, i) => (
              <path key={i} d={d} stroke="#fbbf24" strokeWidth={1} opacity={0.5} fill="none"
                className="transition-all duration-300" />
            ))}
            {/* horizon line */}
            <line x1={16} y1={vp.y} x2={444} y2={vp.y} stroke="#fcd34d" strokeWidth={1.5}
              strokeDasharray="5 4" className="transition-all duration-300" />
            {/* vanishing point */}
            <circle cx={vp.x} cy={vp.y} r={7} fill="#f43f5e" className="transition-all duration-150" />
            <text x={vp.x + 12} y={vp.y - 8} fontSize={10} fill="#fda4af">vanishing point -- click to move</text>
            {/* two figures: god-centred vs human-centred, sized by humanism */}
            <g className="transition-all duration-500">
              <circle cx={110} cy={150} r={10 + humanism * 0.08} fill="#38bdf8" />
              <rect x={98} y={162 + humanism * 0.02} width={24} height={44 + humanism * 0.1} rx={8} fill="#38bdf8" />
              <text x={110} y={225 + humanism * 0.12} fontSize={9} fill="#7dd3fc" textAnchor="middle">man measures all things</text>
            </g>
            <g opacity={Math.max(0.15, 1 - humanism / 90)}>
              <circle cx={360} cy={70} r={16} fill="#facc15" />
              <text x={360} y={102} fontSize={9} fill="#fde047" textAnchor="middle">heaven above all</text>
            </g>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Studio output / yr</p>
              <p className="font-mono font-bold text-amber-300">{artworks} works</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Books printed / yr</p>
              <p className="font-mono font-bold text-gold-300">{booksPerYear}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Literacy (est.)</p>
              <p className="font-mono font-bold text-emerald-300">{literacy}%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Linear perspective mastery</span><span className="font-mono font-bold text-amber-400">{perspective}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={perspective} aria-label="perspective"
                onChange={(e) => setPerspective(Number(e.target.value))} className="w-full min-h-11 accent-amber-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Patron funding (Medici)</span><span className="font-mono font-bold text-emerald-400">{patron}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={patron} aria-label="patron funding"
                onChange={(e) => setPatron(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Printing press spread (1450+)</span><span className="font-mono font-bold text-gold-400">{press}</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={press} aria-label="printing press"
                onChange={(e) => setPress(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <button onClick={() => { setVp({ x: 230, y: 120 }); setPerspective(70); setPatron(50); setPress(30); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Humanism dial: {humanism}</p>
            <p>
              Perspective pulls the viewer INTO the world of humans; the press lets books outlive
              their monks; patrons pay for both. Renaissance = art + technology + money moving
              together, not &quot;great men&quot; alone.
            </p>
            <p className="font-bold text-slate-300 mt-2 mb-1">Misconception killer</p>
            <p>
              &quot;The Renaissance rejected religion.&quot; The gold halo above still hangs in the
              picture -- artists like Leonardo and Michelangelo were devout. They changed the CENTRE
              of gravity, not the faith.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Set perspective to 0 and compare the studio output with 100. Why did Brunelleschi&apos;s trick make painting feel like a science?</p>
            <p>2. Kill patron funding entirely but max the press. Does culture still spread -- just in what form instead of frescoes?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_HistoryChangingCulturalTraditionsSim;
