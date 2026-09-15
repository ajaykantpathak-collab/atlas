'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 11 Geography -- Introduction to Remote Sensing
 * ONE concept: a satellite photographs the ground as pixels; resolution
 * and the choice of spectral band decide what you can classify.
 * react + tailwind only.
 */

type Band = 'true' | 'false';

// ground truth scene: 24x18 grid of classes from a procedural map
const W = 24, H = 18;
function classAt(col: number, row: number): 'water' | 'forest' | 'crop' | 'urban' {
  // river: diagonal band around col = row * 0.9 + 5
  if (Math.abs(col - (row * 0.9 + 5)) < 1.6) return 'water';
  if (row < 6 && col > 14) return 'forest';
  if (col > 15 && row > 10) return 'urban';
  if (row > 6 && col < 12) return 'crop';
  return col % 7 === 0 ? 'forest' : 'crop';
}
const CLASS_COLOR: Record<string, string> = {
  water: '#0e7490', forest: '#166534', crop: '#a16207', urban: '#57534e'
};
// reflectances: red, nir (0-1)
const REFL: Record<string, [number, number]> = {
  water: [0.08, 0.03], forest: [0.05, 0.55], crop: [0.10, 0.42], urban: [0.18, 0.22]
};

export function C11_GeographyRemoteSensingSim() {
  const [res, setRes] = useState(4); // pixels merged per side: 1 (fine) .. 6 (coarse)
  const [band, setBand] = useState<Band>('true');
  const [cloud, setCloud] = useState(0); // % cloud cover
  const [probe, setProbe] = useState<{ c: number; r: number } | null>(null);

  const ndvi = (cls: string) => {
    const [r, n] = REFL[cls];
    return (n - r) / (n + r);
  };

  const cells = useMemo(() => {
    const out: { x: number; y: number; w: number; h: number; fill: string; cls: string; key: string }[] = [];
    for (let y = 0; y < H; y += res) {
      for (let x = 0; x < W; x += res) {
        // majority class within the merged block
        const counts: Record<string, number> = {};
        let n = 0;
        for (let dy = 0; dy < res; dy++) {
          for (let dx = 0; dx < res; dx++) {
            const cls = classAt(x + dx, y + dy);
            counts[cls] = (counts[cls] || 0) + 1;
            n++;
          }
        }
        const cls = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
        const cloudy = ((x * 7 + y * 13) % 100) < cloud * 0.6;
        const fill = cloudy ? '#e2e8f0' : band === 'true' ? CLASS_COLOR[cls]
          : ndvi(cls) > 0.2 ? '#22c55e' : ndvi(cls) > 0.05 ? '#eab308' : '#1d4ed8';
        out.push({ x, y, w: res, h: res, fill, cls: cloudy ? 'cloud' : cls, key: `${x}-${y}-${res}` });
      }
    }
    return out;
  }, [res, band, cloud]);

  const forestArea = cells.filter((c) => c.cls === 'forest').length;
  const totalCells = cells.length;
  const mPerPx = 5 * res; // 5 m per base cell

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">🛰️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 11 -- Introduction to Remote Sensing</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Pixel Detective: Resolution and Bands Change the Story</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 380" className="w-full">
            {cells.map((c) => (
              <g key={c.key} onClick={() => setProbe({ c: c.x, r: c.y })}
                className="cursor-pointer">
                <rect x={10 + c.x * 19} y={30 + c.y * 19} width={c.w * 19 - 1.5} height={c.h * 19 - 1.5}
                  fill={c.fill} stroke="#020617" strokeWidth={1}
                  className="transition-all duration-300" />
              </g>
            ))}
            {probe && cells.some((c) => c.x === probe.c && c.y === probe.r) && (() => {
              const cell = cells.find((c) => c.x === probe.c && c.y === probe.r)!;
              return (
                <g>
                  <rect x={10 + probe.c * 19} y={30 + probe.r * 19} width={cell.w * 19 - 1.5}
                    height={cell.h * 19 - 1.5} fill="none" stroke="#f472b6" strokeWidth={3} />
                  <rect x={340} y={30} width={130} height={92} rx={8} fill="#020617" stroke="#334155" />
                  <text x={352} y={50} fontSize={10} fill="#94a3b8">Pixel class</text>
                  <text x={352} y={66} fontSize={12} fill="#f472b6" fontFamily="monospace">{cell.cls}</text>
                  <text x={352} y={84} fontSize={10} fill="#94a3b8">NDVI</text>
                  <text x={352} y={100} fontSize={11} fill="#22c55e" fontFamily="monospace">
                    {cell.cls === 'cloud' || cell.cls === 'water' ? (cell.cls === 'water' ? ndvi('water').toFixed(2) : 'n/a') : ndvi(cell.cls).toFixed(2)}
                  </text>
                  <text x={352} y={116} fontSize={9} fill="#64748b">click pixels to probe</text>
                </g>
              );
            })()}
            <text x={10} y={22} fontSize={11} fill="#94a3b8">
              {band === 'true' ? 'True colour (red-green-blue)' : 'False colour (NIR-red-green): vegetation glows'}
            </text>
            <text x={10} y={372} fontSize={10} fill="#64748b">
              ground sample distance: {mPerPx} m/pixel -- forest share {(100 * forestArea / totalCells).toFixed(0)}%
            </text>
          </svg>
          <div className="grid grid-cols-3 gap-2 text-center text-xs mt-1">
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Resolution</p>
              <p className="font-mono font-bold text-emerald-300">{mPerPx} m/px</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Image pixels</p>
              <p className="font-mono font-bold text-sky-300">{totalCells}</p>
            </div>
            <div className="bg-slate-950 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Cloud cover</p>
              <p className="font-mono font-bold text-slate-300">{cloud}%</p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Spatial resolution (merge)</span>
                <span className="font-mono font-bold text-emerald-400">{mPerPx} m/pixel</span>
              </div>
              <input type="range" min={1} max={6} step={1} value={res} aria-label="resolution"
                onChange={(e) => setRes(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Cloud cover</span><span className="font-mono font-bold text-slate-300">{cloud}%</span>
              </div>
              <input type="range" min={0} max={100} step={5} value={cloud} aria-label="cloud cover"
                onChange={(e) => setCloud(Number(e.target.value))} className="w-full min-h-11 accent-slate-400" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setBand('true')}
                className={`min-h-11 rounded-xl text-xs font-bold ${band === 'true' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                True colour
              </button>
              <button onClick={() => setBand('false')}
                className={`min-h-11 rounded-xl text-xs font-bold ${band === 'false' ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                False colour
              </button>
            </div>
            <button onClick={() => { setRes(4); setBand('true'); setCloud(0); setProbe(null); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;A sharper satellite image is always a better one.&quot; Coarse pixels still classify
              forests fine, because whole pixels BECOME the class -- but the river (a few metres wide)
              vanishes when a pixel grows to {mPerPx} m. Match resolution to the feature, not the ego.
            </p>
          </div>

          <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <p>1. Probe the same forest pixel in true colour, then false colour. Which band combo makes vegetation jump out, and why (NIR reflectance)?</p>
            <p>2. Coarsen the image until the river disappears completely. At what m/pixel does it vanish?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_GeographyRemoteSensingSim;
