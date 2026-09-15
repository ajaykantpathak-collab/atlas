'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 11 Physics -- Oscillations
 * A live mass-spring SHM oscillator: x(t) = A cos(omega t), with a running
 * kinetic/potential energy budget that proves E = 1/2 k A^2 is constant.
 * Self-contained: react + tailwind only.
 */

export function C11_PhysicsOscillationsSim() {
  const [amplitude, setAmplitude] = useState(0.25); // m
  const [mass, setMass] = useState(0.5); // kg
  const [springK, setSpringK] = useState(50); // N/m
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const rafRef = useRef<number | null>(null);

  const omega = Math.sqrt(springK / mass); // rad/s
  const period = (2 * Math.PI) / omega; // s
  const freq = 1 / period; // Hz
  const x = amplitude * Math.cos(omega * time); // m
  const v = -amplitude * omega * Math.sin(omega * time); // m/s
  const a = -omega * omega * x; // m/s^2
  const ke = 0.5 * mass * v * v; // J
  const pe = 0.5 * springK * x * x; // J
  const totalE = 0.5 * springK * amplitude * amplitude; // J
  const maxSpeed = amplitude * omega; // m/s

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      setTime((t) => t + dt);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  // SVG mapping: equilibrium at 240; 1 m = 300 px
  const wallX = 60;
  const eqX = 240;
  const blockW = 54;
  const blockX = eqX + x * 300 - blockW / 2;
  const coilY = 150;
  const coils = 9;
  const startX = wallX;
  const endX = eqX + x * 300;
  const pts: string[] = [`${startX},${coilY}`];
  for (let i = 1; i <= coils * 2; i++) {
    const px = startX + ((endX - startX) * i) / (coils * 2 + 1);
    const py = coilY + (i % 2 === 0 ? -22 : 22);
    pts.push(`${px},${py}`);
  }
  pts.push(`${endX},${coilY}`);

  // x-t trace window (last 2 periods)
  const trace: string[] = [];
  for (let i = 0; i <= 120; i++) {
    const tt = time - 2 * period + (2 * period * i) / 120;
    if (tt < 0) continue;
    const xx = amplitude * Math.cos(omega * tt);
    trace.push(`${60 + (260 * i) / 120},${210 - xx * 160}`);
  }

  const energyBar = (val: number, color: string) => {
    const h = totalE > 0 ? Math.max(0, (val / totalE) * 110) : 0;
    return <rect x={0} y={110 - h} width={30} height={h} fill={color} rx={3} />;
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-2xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700 font-mono">~</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 11 -- Oscillations</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Mass on a Spring: SHM and the Energy Budget</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 480 260" className="w-full">
            <rect x={wallX - 18} y={90} width={16} height={120} fill="#334155" rx={3} />
            <polyline points={pts.join(' ')} fill="none" stroke="#94a3b8" strokeWidth={2.5} />
            <line x1={eqX} y1={80} x2={eqX} y2={230} stroke="#475569" strokeDasharray="4 5" />
            <text x={eqX} y={244} textAnchor="middle" fill="#64748b" fontSize={10} fontFamily="monospace">x = 0</text>
            <rect x={blockX} y={coilY - 32} width={blockW} height={64} fill="#065f46" stroke="#34d399" strokeWidth={2} rx={6} />
            <text x={eqX + x * 300} y={coilY + 4} textAnchor="middle" fill="#d1fae5" fontSize={11} fontWeight="bold" fontFamily="monospace">
              {mass.toFixed(1)} kg
            </text>
            <line x1={400} y1={60} x2={400} y2={230} stroke="#334155" strokeWidth={1.5} />
            <line x1={396} y1={210} x2={404} y2={210} stroke="#334155" />
            <circle cx={400} cy={210 - (x / 0.55) * 150} r={5} fill="#f472b6" />
            <text x={412} y={214 - (x / 0.55) * 150} fill="#f472b6" fontSize={10} fontFamily="monospace">x={x.toFixed(3)} m</text>
          </svg>

          <svg viewBox="0 0 480 220" className="w-full mt-2 bg-slate-950 rounded-xl border border-slate-800">
            <line x1={60} y1={110} x2={460} y2={110} stroke="#334155" strokeDasharray="3 4" />
            <text x={12} y={115} fill="#64748b" fontSize={10} fontFamily="monospace">x(t)</text>
            <text x={330} y={20} fill="#94a3b8" fontSize={10} fontFamily="monospace">
              t = {time.toFixed(2)} s  ({(time / period).toFixed(1)} periods)
            </text>
            {trace.length > 1 && (
              <polyline points={trace.join(' ')} fill="none" stroke="#38bdf8" strokeWidth={2.5} />
            )}
            <circle cx={60 + 260} cy={110 - x * 160} r={5} fill="#fbbf24" />
            <text x={70} y={200} fill="#475569" fontSize={10} fontFamily="monospace">T = {period.toFixed(3)} s, f = {freq.toFixed(2)} Hz, omega = {omega.toFixed(1)} rad/s</text>
          </svg>

          <div className="flex items-end gap-6 mt-3 px-2">
            <svg width="46" height="120" viewBox="0 0 30 110" className="bg-slate-950 rounded border border-slate-800">
              {energyBar(ke, '#34d399')}
              <text x={15} y={108} textAnchor="middle" fill="#6ee7b7" fontSize={8}>KE</text>
            </svg>
            <svg width="46" height="120" viewBox="0 0 30 110" className="bg-slate-950 rounded border border-slate-800">
              {energyBar(pe, '#f472b6')}
              <text x={15} y={108} textAnchor="middle" fill="#f9a8d4" fontSize={8}>PE</text>
            </svg>
            <svg width="46" height="120" viewBox="0 0 30 110" className="bg-slate-950 rounded border border-slate-800">
              {energyBar(totalE, '#fbbf24')}
              <text x={15} y={108} textAnchor="middle" fill="#fde68a" fontSize={8}>E tot</text>
            </svg>
            <div className="text-xs font-mono text-slate-400 space-y-1">
              <div>KE = {ke.toFixed(3)} J</div>
              <div>PE = {pe.toFixed(3)} J</div>
              <div className="text-amber-300 font-bold">KE + PE = {(ke + pe).toFixed(3)} J = 1/2 k A^2 = {totalE.toFixed(3)} J</div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Amplitude A</span><span className="font-mono font-bold text-sky-400">{amplitude.toFixed(2)} m</span>
              </div>
              <input type="range" min={0.05} max={0.5} step={0.01} value={amplitude} aria-label="Amplitude"
                onChange={(e) => setAmplitude(Number(e.target.value))} className="w-full accent-sky-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Mass m</span><span className="font-mono font-bold text-indigo-400">{mass.toFixed(1)} kg</span>
              </div>
              <input type="range" min={0.1} max={2} step={0.1} value={mass} aria-label="Mass"
                onChange={(e) => setMass(Number(e.target.value))} className="w-full accent-indigo-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Spring constant k</span><span className="font-mono font-bold text-emerald-400">{springK} N/m</span>
              </div>
              <input type="range" min={5} max={100} step={1} value={springK} aria-label="Spring constant"
                onChange={(e) => setSpringK(Number(e.target.value))} className="w-full accent-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setPlaying((p) => !p)} className="py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-500">
                {playing ? 'Pause' : 'Play'}
              </button>
              <button onClick={() => setTime(0)} className="py-2 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">
                Reset t = 0
              </button>
            </div>
            <div className="flex gap-1.5">
              {[
                { label: 'Stiff', k: 100, m: 0.5 },
                { label: 'Heavy', k: 20, m: 2 },
                { label: 'Default', k: 50, m: 0.5 },
              ].map((p) => (
                <button key={p.label} onClick={() => { setSpringK(p.k); setMass(p.m); }}
                  className="flex-1 py-1 rounded-lg text-[11px] font-bold bg-slate-800 hover:bg-slate-700 text-slate-300">
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900/80 rounded-2xl border border-emerald-800/60 p-4 text-xs font-mono grid grid-cols-2 gap-2">
            <div><span className="text-slate-500">omega = sqrt(k/m)</span><div className="text-emerald-300 font-bold text-sm">{omega.toFixed(2)} rad/s</div></div>
            <div><span className="text-slate-500">v max = A omega</span><div className="text-sky-300 font-bold text-sm">{maxSpeed.toFixed(2)} m/s</div></div>
            <div><span className="text-slate-500">a now = -omega^2 x</span><div className="text-rose-300 font-bold text-sm">{a.toFixed(2)} m/s^2</div></div>
            <div><span className="text-slate-500">v now</span><div className="text-amber-300 font-bold text-sm">{v.toFixed(2)} m/s</div></div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Teaching note</p>
            <p>
              SHM happens whenever restoring force is proportional to displacement: F = -kx, so
              a = -omega^2 x with omega = sqrt(k/m). Period is INDEPENDENT of amplitude -- double A
              and the motion travels farther but faster, taking exactly the same time. Energy sloshes
              between PE = 1/2 k x^2 (max at the ends) and KE = 1/2 m v^2 (max at center), but their
              sum is locked at 1/2 k A^2.
            </p>
          </div>

          <div className="bg-emerald-950/40 rounded-2xl border border-emerald-800/50 p-4 text-xs">
            <p className="font-bold text-emerald-300 mb-1">What to try</p>
            <p>1. Double the amplitude while watching the energy bar: E should QUADRUPLE, yet the period must not change. Verify both.</p>
            <p>2. Set mass 2 kg and k 20 N/m, then compute T = 2 pi sqrt(m/k) by hand. Does the displayed period match to 3 digits?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_PhysicsOscillationsSim;
