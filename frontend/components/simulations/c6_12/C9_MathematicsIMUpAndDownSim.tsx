'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

// ─── MAIN COMPONENT: Ferris wheel - circular motion, height patterns and arcs ───
export function C9_MathematicsIMUpAndDownSim() {
  const [radius, setRadius] = useState(12); // metres
  const [period, setPeriod] = useState(10); // seconds per full turn
  const [clockwise, setClockwise] = useState(true);
  const [running, setRunning] = useState(true);
  const [time, setTime] = useState(0); // seconds elapsed
  const [history, setHistory] = useState<number[]>([]);
  const histRef = useRef<number[]>([]);

  const hub = radius + 2; // hub sits 2 m above the loading platform
  const top = hub + radius;

  // ─── ANIMATION LOOP (10 ticks of 0.1 s per simulated second) ───
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setTime((t) => t + 0.1);
    }, 100);
    return () => clearInterval(id);
  }, [running]);

  // ─── REAL NUMERICS: angle, height (unit-circle projection), arc distance ───
  const angleDeg = useMemo(() => {
    const raw = (360 * time) / period;
    return ((clockwise ? -raw : raw) % 360 + 360) % 360;
  }, [time, period, clockwise]);

  const height = useMemo(() => hub + radius * Math.sin((angleDeg * Math.PI) / 180), [angleDeg, hub, radius]);

  const rimSpeed = (2 * Math.PI * radius) / period; // m/s along the rim
  const distance = rimSpeed * time; // arc length travelled
  const turns = time / period;

  // rolling height history for the strip chart
  useEffect(() => {
    histRef.current = [...histRef.current.slice(-199), height];
    setHistory(histRef.current);
  }, [height]);

  const reset = () => {
    setTime(0);
    histRef.current = [];
    setHistory([]);
  };

  // ─── SVG LAYOUT ───
  const pxm = 260 / (top + 2); // pixels per metre
  const cx = 200;
  const cy = 300 - hub * pxm;
  const rPx = radius * pxm;
  const th = (angleDeg * Math.PI) / 180;
  const cabX = cx + rPx * Math.cos(th);
  const cabY = cy - rPx * Math.sin(th);
  const spokeAngles = [0, 45, 90, 135, 180, 225, 270, 315];

  const chartPts = history
    .map((h, i) => `${(i / 199) * 540 + 10},${150 - (h / top) * 135}`)
    .join(' ');

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Mathematics - Circles and Patterns</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Up and Down, Round and Round: The Ferris Wheel</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">
          t = {time.toFixed(1)} s
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Radius R</span>
            <span className="text-gold-300 font-mono font-bold">{radius} m</span>
          </label>
          <input type="range" min={5} max={25} value={radius} aria-label="wheel radius"
            onChange={(e) => { setRadius(Number(e.target.value)); reset(); }} className="w-full mt-2 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Period T</span>
            <span className="text-emerald-300 font-mono font-bold">{period} s</span>
          </label>
          <input type="range" min={4} max={20} value={period} aria-label="rotation period"
            onChange={(e) => setPeriod(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
        </div>
        <button
          onClick={() => setClockwise(!clockwise)}
          className="p-3 rounded-2xl text-sm font-bold border transition-all bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800"
        >
          Direction: {clockwise ? 'clockwise' : 'anticlockwise'}
        </button>
        <div className="flex gap-2">
          <button
            onClick={() => setRunning(!running)}
            className={`flex-1 p-3 rounded-2xl text-sm font-bold transition-all ${running ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}
          >
            {running ? 'Pause' : 'Run'}
          </button>
          <button onClick={reset} className="flex-1 p-3 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800">
            Reset
          </button>
        </div>
      </div>

      {/* WHEEL + CHART */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-3 bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 560 320" className="w-full h-60 md:h-72">
            <line x1="10" y1="300" x2="550" y2="300" stroke="#334155" strokeWidth="3" />
            <text x="545" y="292" fill="#64748b" fontSize="10" textAnchor="end">ground</text>
            {/* support legs */}
            <line x1={cx - 30} y1="300" x2={cx} y2={cy} stroke="#475569" strokeWidth="4" />
            <line x1={cx + 30} y1="300" x2={cx} y2={cy} stroke="#475569" strokeWidth="4" />
            {/* wheel */}
            <circle cx={cx} cy={cy} r={rPx} fill="none" stroke="#6366f1" strokeWidth="3" />
            {spokeAngles.map((deg) => {
              const a = (deg * Math.PI) / 180;
              return <line key={deg} x1={cx} y1={cy} x2={cx + rPx * Math.cos(a)} y2={cy - rPx * Math.sin(a)} stroke="#312e81" strokeWidth="1.5" />;
            })}
            <circle cx={cx} cy={cy} r="5" fill="#e2e8f0" />
            {/* cabins: main + opposite */}
            <circle cx={cabX} cy={cabY} r="7" fill="#34d399" />
            <circle cx={2 * cx - cabX} cy={2 * cy - cabY} r="6" fill="#38bdf8" opacity="0.7" />
            {/* vertical height indicator */}
            <line x1={cabX} y1={cabY} x2={cabX} y2="300" stroke="#34d399" strokeDasharray="4 4" strokeWidth="1.5" />
            <text x={cabX + 8} y={cabY - 8} fill="#34d399" fontSize="12" fontWeight="bold">
              {height.toFixed(1)} m
            </text>
            {/* radius label */}
            <text x={cx - rPx / 2 - 10} y={cy - rPx / 2 - 6} fill="#a5b4fc" fontSize="11">R = {radius} m</text>
          </svg>
        </div>

        <div className="md:col-span-2 space-y-3">
          <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Height vs time (one breath in, one breath out)</p>
            <svg viewBox="0 0 560 160" className="w-full h-28">
              <line x1="10" y1="150" x2="550" y2="150" stroke="#334155" />
              <line x1="10" y1="10" x2="10" y2="150" stroke="#334155" />
              {history.length > 1 && <polyline points={chartPts} fill="none" stroke="#34d399" strokeWidth="2.5" />}
              <text x="20" y="20" fill="#64748b" fontSize="10">top = {top} m</text>
              <text x="20" y="146" fill="#64748b" fontSize="10">bottom = 2 m</text>
            </svg>
          </div>
          <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Angle turned</p>
              <p className="text-sm font-mono font-bold text-gold-300">{angleDeg.toFixed(0)} deg</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Full turns</p>
              <p className="text-sm font-mono font-bold text-gold-300">{turns.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Circumference</p>
              <p className="text-sm font-mono font-bold text-amber-300">{(2 * Math.PI * radius).toFixed(1)} m</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase">Arc distance</p>
              <p className="text-sm font-mono font-bold text-emerald-300">{distance.toFixed(1)} m</p>
            </div>
          </div>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> one full turn covers an arc of 2 x pi x R metres, so the rim speed is
          2 pi R / T. Meanwhile the cabin height rises and falls in a repeating pattern with period T: it is the projection of the turning
          radius on the vertical. Circular motion in one direction becomes up-and-down oscillation in the other.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Predict the cabin height after exactly half a period from the bottom, then pause the wheel and check the readout.</p>
        <p className="mt-1">2. Find the period T that sends a rider over the top exactly 5 times in one minute (rim speed stays under 8 m/s for comfort).</p>
      </footer>
    </div>
  );
}

export default C9_MathematicsIMUpAndDownSim;
