'use client';
/**
 * C8_MathematicsASquareAndACubeSim - "A Square and A Cube" (Class 8 Maths)
 *
 * ELI5: Arrange dots in a square grid and you get a square number (n x n = n^2).
 * Stack those square layers on top of each other and you build a cube (n x n x n = n^3).
 * Bonus secret: every square number is the sum of the first n odd numbers!
 */
import React, { useMemo, useState } from 'react';

const ODD_LAYERS = [1, 3, 5, 7, 9, 11, 13]; // first 7 odd numbers

export function C8_MathematicsASquareAndACubeSim() {
  const [mode, setMode] = useState<'square' | 'cube'>('square');
  const [n, setN] = useState(4);
  const [highlightLayer, setHighlightLayer] = useState(4); // 1..n from bottom
  const [showOddLayers, setShowOddLayers] = useState(true);

  const squareTotal = n * n;
  const cubeTotal = n * n * n;
  const oddSum = useMemo(
    () => ODD_LAYERS.slice(0, n).reduce((s, v) => s + v, 0),
    [n]
  );

  // Geometry for the cube stack (fake isometric view)
  const cell = Math.min(26, Math.floor(190 / n));
  const W = cell * n;
  const K = Math.min(26, W * 0.22); // isometric skew
  const baseX = 60;
  const baseY = 200;
  const layerGap = Math.min(18, Math.max(10, Math.floor(160 / Math.max(n, 1))));

  const corners = (k: number) => {
    // k = 1 is the bottom layer
    const y = baseY - (k - 1) * layerGap;
    return {
      bl: { x: baseX, y },
      br: { x: baseX + W, y },
      tr: { x: baseX + W + K, y: y - K },
      tl: { x: baseX + K, y: y - K },
    };
  };

  const pt = (c: ReturnType<typeof corners>, u: number, v: number) => ({
    x: c.bl.x + u * (c.br.x - c.bl.x) + v * (c.tl.x - c.bl.x),
    y: c.bl.y + u * (c.br.y - c.bl.y) + v * (c.tl.y - c.bl.y),
  });

  const dotGrid = () => {
    const c = corners(highlightLayer);
    const dots: JSX.Element[] = [];
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        const p = pt(c, (i + 0.5) / n, (j + 0.5) / n);
        dots.push(
          <circle key={`d${i}-${j}`} cx={p.x} cy={p.y} r={Math.max(2.2, cell * 0.14)} fill="#1e293b" opacity={0.85} />
        );
      }
    }
    return dots;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-gold-700">
        A Square and A Cube - Dot Builder
      </h1>

      {/* Teaching text */}
      <div className="mt-3 p-4 bg-gold-50 border border-gold-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-gold-700">Square numbers:</span> n dots across and n
          dots down give n x n = n^2 dots. Every square number can be built by wrapping L-shaped
          layers of odd numbers: 1 + 3 + 5 + ... + (2n-1) = n^2.
        </p>
        <p className="mt-1">
          <span className="font-bold text-gold-700">Cube numbers:</span> stack n square layers of
          n x n dots and you get n x n x n = n^3 dots - a cube! Volume of a cube with side n is
          exactly n^3.
        </p>
      </div>

      {/* Controls */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <button
          onClick={() => setMode('square')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'square' ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}
        >
          Square mode
        </button>
        <button
          onClick={() => setMode('cube')}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${mode === 'cube' ? 'bg-gold-600 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}
        >
          Cube mode
        </button>
        <button
          onClick={() => setShowOddLayers((s) => !s)}
          className={`px-4 py-2 rounded-xl text-sm font-bold transition-all ${showOddLayers ? 'bg-amber-500 text-white shadow' : 'bg-slate-100 hover:bg-slate-200'}`}
        >
          {showOddLayers ? 'Odd layers: ON' : 'Odd layers: OFF'}
        </button>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
          <label className="text-xs font-semibold text-slate-500 flex justify-between">
            <span>Side length n</span>
            <span className="text-gold-600 font-mono">{n}</span>
          </label>
          <input
            type="range"
            min={1}
            max={7}
            value={n}
            aria-label="Side length n"
            onChange={(e) => {
              const v = Number(e.target.value);
              setN(v);
              setHighlightLayer(Math.min(highlightLayer, v));
            }}
            className="w-full mt-2 accent-gold-600"
          />
          {mode === 'cube' && (
            <>
              <label className="mt-3 text-xs font-semibold text-slate-500 flex justify-between">
                <span>Highlighted cube layer (bottom = 1)</span>
                <span className="text-emerald-600 font-mono">{highlightLayer}</span>
              </label>
              <input
                type="range"
                min={1}
                max={n}
                value={highlightLayer}
                aria-label="Highlighted cube layer"
                onChange={(e) => setHighlightLayer(Number(e.target.value))}
                className="w-full mt-2 accent-emerald-600"
              />
            </>
          )}
          <div className="mt-3 p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            {mode === 'square' ? (
              <>
                <div className="text-gold-700 font-bold">{n} x {n} = {squareTotal} dots</div>
                {showOddLayers && (
                  <div className="mt-1 text-slate-600">
                    {ODD_LAYERS.slice(0, n).join(' + ')} = <span className="text-amber-600 font-bold">{oddSum}</span>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="text-gold-700 font-bold">
                  {n} x {n} x {n} = {cubeTotal} dots
                </div>
                <div className="mt-1 text-slate-600">
                  each of {n} layers holds {squareTotal} dots
                </div>
              </>
            )}
          </div>
        </div>

        {/* Visualization */}
        <div className="p-2 bg-gradient-to-b from-gold-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 340 230" className="w-full">
            {mode === 'square' ? (
              <>
                {Array.from({ length: n }).flatMap((_, r) =>
                  Array.from({ length: n }).map((__, c) => {
                    const isL = showOddLayers && r + c >= n - 1;
                    return (
                      <circle
                        key={`s${r}-${c}`}
                        cx={40 + c * (260 / 7)}
                        cy={30 + r * (26)}
                        r={Math.min(10, 260 / 7 / 2 - 1)}
                        fill={isL && showOddLayers ? '#f59e0b' : '#6366f1'}
                        opacity={0.9}
                        style={{ transition: 'fill 300ms' }}
                      />
                    );
                  })
                )}
                <text x={40} y={210} fontSize="12" fill="#475569">
                  {showOddLayers ? 'Amber = newest L-shaped odd layer' : 'n x n dot grid'}
                </text>
              </>
            ) : (
              <>
                {Array.from({ length: n }).map((_, idx) => {
                  const k = idx + 1;
                  const c = corners(k);
                  const isHi = k === highlightLayer;
                  const d = `M ${c.bl.x} ${c.bl.y} L ${c.br.x} ${c.br.y} L ${c.tr.x} ${c.tr.y} L ${c.tl.x} ${c.tl.y} Z`;
                  return (
                    <g key={`layer-${k}`}>
                      <path
                        d={d}
                        fill={isHi ? '#a5b4fc' : '#e0e7ff'}
                        stroke="#6366f1"
                        strokeWidth={isHi ? 2 : 1}
                        opacity={0.95}
                        style={{ transition: 'all 300ms' }}
                      />
                      <text x={c.tl.x - 6} y={c.tl.y - 4} fontSize="10" textAnchor="end" fill="#6366f1">
                        L{k}
                      </text>
                    </g>
                  );
                })}
                {dotGrid()}
                <text x={baseX} y={222} fontSize="11" fill="#475569">
                  Layer {highlightLayer} of {n}: {n} x {n} = {squareTotal} dots
                </text>
              </>
            )}
          </svg>
        </div>
      </div>

      {/* What to try */}
      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>
            Set n = 5 and check: does 1 + 3 + 5 + 7 + 9 equal 5 x 5? Now switch to cube mode and
            compute 5^3 without a calculator, then verify.
          </li>
          <li>
            In cube mode, find the smallest n whose cube is more than 100. Then predict n for the
            first cube above 200 and test it.
          </li>
        </ol>
      </div>
    </div>
  );
}

export default C8_MathematicsASquareAndACubeSim;
