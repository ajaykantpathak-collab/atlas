'use client';

import React, { useEffect, useMemo, useState } from 'react';

const MEDIA = [
  { id: 'air', label: 'Air (342 m/s)', v: 342 },
  { id: 'water', label: 'Water (1480 m/s)', v: 1480 },
  { id: 'steel', label: 'Steel (5100 m/s)', v: 5100 },
];

// ─── MAIN COMPONENT: frequency, wavelength, pitch and echo ───
export function C9_ScienceSoundWavesCharacteristicsAndApplicationsSim() {
  const [freq, setFreq] = useState(440); // Hz
  const [amplitude, setAmplitude] = useState(25); // px loudness
  const [medium, setMedium] = useState('air');
  const [wallDist, setWallDist] = useState(20); // m
  const [running, setRunning] = useState(true);
  const [phase, setPhase] = useState(0);

  const v = MEDIA.find((m) => m.id === medium)!.v;

  // ─── REAL NUMERICS: wave equation v = f x lambda ───
  const lambda = v / freq; // metres
  const periodMs = 1000 / freq;
  const echoTime = (2 * wallDist) / v; // seconds there and back
  const echoOk = echoTime >= 0.1;

  const pitchClass =
    freq < 20 ? 'Infrasonic (below human hearing)' :
    freq > 20000 ? 'Ultrasonic (above human hearing)' :
    freq < 250 ? 'Low pitch (bass)' :
    freq < 2000 ? 'Mid pitch (speech range)' : 'High pitch (sharp)';

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setPhase((p) => p + 0.25), 40);
    return () => clearInterval(id);
  }, [running]);

  // draw the travelling wave: more cycles for higher frequency
  const cycles = Math.max(2, Math.min(20, Math.round(freq / 150)));
  const lambdaPx = 500 / cycles;
  const wavePts = useMemo(() => {
    const pts: string[] = [];
    for (let px = 0; px <= 500; px += 4) {
      const y = 70 - amplitude * Math.sin((2 * Math.PI * px) / lambdaPx - phase);
      pts.push(`${px + 20},${y}`);
    }
    return pts.join(' ');
  }, [amplitude, lambdaPx, phase]);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* HEADER */}
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 9 Science - Sound</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Sound Waves: Pitch, Loudness and Echo</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300 font-mono">
          lambda = {lambda.toFixed(3)} m
        </span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Frequency</span>
            <span className="text-gold-300 font-mono font-bold">{freq} Hz</span>
          </label>
          <input type="range" min={10} max={40000} step={10} value={freq} aria-label="frequency"
            onChange={(e) => setFreq(Number(e.target.value))} className="w-full mt-2 accent-gold-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Amplitude</span>
            <span className="text-emerald-300 font-mono font-bold">{amplitude} px</span>
          </label>
          <input type="range" min={5} max={45} value={amplitude} aria-label="amplitude"
            onChange={(e) => setAmplitude(Number(e.target.value))} className="w-full mt-2 accent-emerald-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 block mb-1">Medium</label>
          <select value={medium} aria-label="medium" onChange={(e) => setMedium(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2 py-1.5 text-sm text-slate-200">
            {MEDIA.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Wall distance</span>
            <span className="text-amber-300 font-mono font-bold">{wallDist} m</span>
          </label>
          <input type="range" min={5} max={100} value={wallDist} aria-label="wall distance"
            onChange={(e) => setWallDist(Number(e.target.value))} className="w-full mt-2 accent-amber-500" />
        </div>
        <button onClick={() => setRunning(!running)} className={`p-3 rounded-2xl text-sm font-bold ${running ? 'bg-amber-600 text-white' : 'bg-emerald-600 text-white'}`}>
          {running ? 'Freeze wave' : 'Play wave'}
        </button>
      </div>

      {/* WAVE VISUAL */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3 mb-4">
        <svg viewBox="0 0 560 140" className="w-full h-36 md:h-40">
          <line x1="20" y1="70" x2="540" y2="70" stroke="#334155" strokeDasharray="4 4" />
          <polyline points={wavePts} fill="none" stroke="#38bdf8" strokeWidth="2.5" />
          <text x="24" y="18" fill="#64748b" fontSize="10">compression peaks up, rarefactions down - a longitudinal wave drawn as displacement</text>
          <text x="540" y="132" fill="#64748b" fontSize="10" textAnchor="end">{cycles} wavelength(s) shown</text>
        </svg>
      </div>

      {/* READOUTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">Wave equation</p>
          <p className="text-xs font-mono font-bold text-gold-300 mt-1">{freq} x {lambda.toFixed(3)} = {v} m/s</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">Time period</p>
          <p className="text-sm font-mono font-bold text-gold-300 mt-1">{periodMs.toFixed(2)} ms</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] text-slate-400 uppercase">Pitch</p>
          <p className="text-xs font-bold text-fuchsia-300 mt-1">{pitchClass}</p>
        </div>
        <div className={`p-3 rounded-2xl border text-center ${echoOk ? 'bg-emerald-950/60 border-emerald-700' : 'bg-slate-900 border-slate-800'}`}>
          <p className="text-[10px] text-slate-400 uppercase">Echo off wall</p>
          <p className="text-sm font-mono font-bold text-amber-300 mt-1">{echoTime.toFixed(3)} s</p>
          <p className={`text-[10px] mt-0.5 ${echoOk ? 'text-emerald-300' : 'text-slate-500'}`}>
            {echoOk ? 'heard as a distinct echo (> 0.1 s)' : 'too fast: blends with the original sound'}
          </p>
        </div>
      </div>

      {/* TEACHING TEXT */}
      <div className="mt-4 p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> sound is a mechanical longitudinal wave. Its speed is fixed by the
          medium, so v = f x lambda ties the three numbers together: raise the frequency and the wavelength must shrink. Frequency sets pitch,
          amplitude sets loudness, and an echo needs at least 0.1 s of travel time (about 17 m from a wall in air) to be heard separately.
        </p>
      </div>

      {/* WHAT TO TRY */}
      <footer className="mt-3 p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Keep f = 342 Hz and switch medium air to steel: watch the wavelength jump - explain why pitch is unchanged but lambda changes.</p>
        <p className="mt-1">2. Find the minimum wall distance for a distinct echo in air (expect about 17 m), then repeat in water.</p>
      </footer>
    </div>
  );
}

export default C9_ScienceSoundWavesCharacteristicsAndApplicationsSim;
