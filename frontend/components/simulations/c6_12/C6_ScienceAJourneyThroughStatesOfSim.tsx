/**
 * C6 Science -- A Journey through States of Water (Curiosity)
 *
 * One chapter concept: water changes state -- ice below 0 C, liquid
 * between 0 and 100 C, steam at and above 100 C -- because heat makes
 * particles move faster and spread apart.
 *
 * Interaction model: slide the temperature (or let the burner heat /
 * freezer cool it automatically) and watch 40 water particles change
 * between a slow lattice, a jiggly liquid and fast-rising steam.
 */
import React, { useState, useEffect } from 'react';

type State = 'ice' | 'water' | 'steam';
type Mode = 'off' | 'heat' | 'cool';

function stateOf(t: number): State {
  if (t < 0) return 'ice';
  if (t < 100) return 'water';
  return 'steam';
}

// deterministic pseudo-random so server and client render the same
function rand(i: number, salt: number): number {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

function C6_ScienceAJourneyThroughStatesOfSim() {
  const [temp, setTemp] = useState(25);
  const [mode, setMode] = useState<Mode>('off');
  const [view, setView] = useState<'particles' | 'world'>('particles');

  const st = stateOf(temp);

  useEffect(() => {
    if (mode === 'off') return;
    const id = setInterval(() => {
      setTemp((t) => {
        const next = t + (mode === 'heat' ? 2 : -2);
        if ((mode === 'heat' && next >= 120) || (mode === 'cool' && next <= -20)) {
          setMode('off');
          return Math.max(-20, Math.min(120, next));
        }
        return next;
      });
    }, 90);
    return () => clearInterval(id);
  }, [mode]);

  const dur = (4.2 - Math.abs(temp) / 40).toFixed(2); // hotter -> faster jiggle
  const waterTop = 60;
  const waterBottom = 150;
  const waterLevel = st === 'steam' ? 120 : st === 'ice' ? 76 : 82;

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-white rounded-3xl border-2 border-sky-200 shadow-xl font-sans text-slate-800">
      <style>
        {
          '@keyframes jigg { 0%,100% { transform: translate(0,0); } 25% { transform: translate(1.6px,-1.6px); } 50% { transform: translate(-1.6px,1px); } 75% { transform: translate(1px,1.6px); } }' +
          '@keyframes swim { 0%,100% { transform: translate(0,0); } 30% { transform: translate(9px,7px); } 60% { transform: translate(-8px,5px); } 85% { transform: translate(6px,-7px); } }' +
          '@keyframes rise { 0% { transform: translateY(0); opacity: 0.9; } 100% { transform: translateY(-95px); opacity: 0.1; } }'
        }
      </style>
      <h2 className="text-xl md:text-2xl font-black text-sky-700">A Journey through States of Water</h2>
      <p className="text-sm text-slate-600 mt-1 leading-relaxed">
        Water is the same substance in three forms: <b>ice</b> (solid, below 0 C), <b>water</b> (liquid, 0-100 C)
        and <b>steam</b> (gas, 100 C and above). Heat gives particles energy to move faster and break apart; cooling
        calms them back into place. Watch the tiny particles dance!
      </p>

      <div className="grid md:grid-cols-[1fr_220px] gap-4 mt-4">
        <div className="rounded-2xl border-2 border-sky-100 bg-sky-50/40 overflow-hidden">
          <svg viewBox="0 0 420 260" className="w-full">
            <rect width="420" height="260" fill="#f0f9ff" />
            <text x="210" y="18" textAnchor="middle" fontSize="15" fontWeight="900" fill={st === 'ice' ? '#0284c7' : st === 'water' ? '#0369a1' : '#b45309'}>
              {st === 'ice' ? 'ICE (solid) -- particles locked in a lattice' : st === 'water' ? 'WATER (liquid) -- particles slide around' : 'STEAM (gas) -- particles fly free!'}
            </text>
            <path d="M 140 60 L 140 200 L 280 200 L 280 60" fill="none" stroke="#64748b" strokeWidth="4" />
            <path d="M 132 60 L 148 60 M 132 200 L 148 200 M 272 60 L 288 60 M 272 200 L 288 200" stroke="#64748b" strokeWidth="4" />
            {st !== 'steam' && <rect x="142" y={waterBottom - (waterBottom - waterTop) * ((waterLevel - 60) / 60) + 0} width="136" height={(waterBottom - waterTop) * ((waterLevel - 60) / 60)} fill="#7dd3fc" opacity="0.6" rx="3" />}
            {st === 'ice' && <rect x="142" y={waterTop} width="136" height={waterBottom - waterTop} fill="#bae6fd" opacity="0.7" rx="3" />}
            {Array.from({ length: 40 }, (_, i) => {
              const gx = 152 + (i % 8) * 16 + (st === 'ice' ? 0 : rand(i, 1) * 118);
              const gy = st === 'ice' ? 70 + Math.floor(i / 8) * 15 : waterTop + 8 + rand(i, 2) * (waterBottom - waterTop - 16);
              const anim = st === 'ice' ? 'jigg ' + dur + 's ease-in-out infinite' : st === 'water' ? 'swim ' + dur + 's ease-in-out infinite' : 'rise 1.6s linear infinite';
              const delay = (rand(i, 3) * 2).toFixed(2) + 's';
              const steamX = 145 + rand(i, 4) * 130;
              const steamY = 190 - rand(i, 5) * 20;
              const cx = st === 'steam' ? steamX : gx;
              const cy = st === 'steam' ? steamY : gy;
              const color = st === 'ice' ? '#0284c7' : st === 'water' ? '#0369a1' : '#94a3b8';
              const r = st === 'steam' ? 4.5 : 5;
              return <circle key={'p' + i} cx={cx} cy={cy} r={r} fill={color} style={{ animation: anim, animationDelay: delay }} />;
            })}
            <rect x="300" y="120" width="46" height="80" rx="6" fill={temp > 30 ? '#f87171' : '#cbd5e1'} />
            <text x="323" y="150" textAnchor="middle" fontSize="18">🔥</text>
            <text x="323" y="215" textAnchor="middle" fontSize="10" fill="#b91c1c" fontWeight="bold">burner</text>
            <rect x="74" y="120" width="46" height="80" rx="6" fill={temp < 5 ? '#60a5fa' : '#cbd5e1'} />
            <text x="97" y="150" textAnchor="middle" fontSize="18">🧊</text>
            <text x="97" y="215" textAnchor="middle" fontSize="10" fill="#1d4ed8" fontWeight="bold">freezer</text>
          </svg>
        </div>

        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-sky-600 text-white text-center">
            <div className="text-xs uppercase tracking-widest opacity-80">Temperature</div>
            <div className="text-4xl font-black">{temp}&deg;C</div>
            <div className="text-xs font-bold uppercase">{st}</div>
          </div>
          <label className="block text-xs font-semibold text-slate-500">
            Move the temperature slider
            <input type="range" min={-20} max={120} value={temp} onChange={(e) => { setMode('off'); setTemp(Number(e.target.value)); }} className="w-full accent-sky-600" />
          </label>
          <div className="flex gap-2">
            <button onClick={() => setMode(mode === 'heat' ? 'off' : 'heat')} className={'flex-1 px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (mode === 'heat' ? 'bg-red-500 text-white' : 'bg-red-100 text-red-700 hover:bg-red-200')}>
              Heat it
            </button>
            <button onClick={() => setMode(mode === 'cool' ? 'off' : 'cool')} className={'flex-1 px-2 py-2 rounded-xl text-xs font-black transition-colors ' + (mode === 'cool' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-700 hover:bg-blue-200')}>
              Cool it
            </button>
          </div>
          <button onClick={() => setView(view === 'particles' ? 'world' : 'particles')} className="w-full px-3 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-bold hover:bg-slate-200 transition-colors">
            View: {view === 'particles' ? 'tiny particles' : 'big world'} (toggle)
          </button>
          <div className="p-2 rounded-xl bg-amber-50 border-2 border-amber-200 text-[11px] text-amber-800 font-semibold">
            Melting at 0&deg;C, boiling at 100&deg;C -- the two magic numbers of water!
          </div>
        </div>
      </div>

      {view === 'world' && (
        <div className="mt-3 p-3 rounded-2xl bg-sky-50 border-2 border-sky-200 text-xs text-sky-800 font-semibold transition-all">
          In the big world: at {temp}&deg;C water looks like <b>{st === 'ice' ? 'ice cubes and snow' : st === 'water' ? 'rivers, rain and your water bottle' : 'invisible vapour and clouds high in the sky'}</b>. Same substance, different particle dance!
        </div>
      )}

      <div className="mt-4 p-3 rounded-2xl bg-emerald-50 border-2 border-emerald-200">
        <div className="text-sm font-black text-emerald-800">What to try</div>
        <ol className="text-xs text-emerald-700 list-decimal list-inside mt-1 space-y-1">
          <li>Heat the water and stop EXACTLY when it becomes steam. At what temperature did the particles break free? Why do the steam particles leave the beaker?</li>
          <li>Some water "disappears" from wet clothes even below 100&deg;C. Slide to 40&deg;C and watch carefully -- which particles escape first?</li>
        </ol>
      </div>
    </div>
  );
}

export { C6_ScienceAJourneyThroughStatesOfSim };
export default C6_ScienceAJourneyThroughStatesOfSim;
