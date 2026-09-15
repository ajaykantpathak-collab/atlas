'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Adolescence is the growing-up bridge between childhood and adulthood, usually from 11 to 18. ' +
  'Growth does not happen evenly: girls start their growth spurt earlier (around 10-12), boys ' +
  'later (around 12-14) but often grow taller in the end. Good food, sleep and exercise during ' +
  'these years matter more than any other time.';

// Approximate median height (cm) for ages 8-18
const GIRLS = [128, 134, 140, 147, 152, 155, 157, 158, 159, 159.5, 160];
const BOYS = [128, 133, 138, 144, 151, 157, 162, 166, 169, 171, 172];

const MILESTONES: { minAge: number; text: string }[] = [
  { minAge: 0, text: 'Childhood: steady, slow growth.' },
  { minAge: 10, text: 'Growth spurt begins -- the fastest growth since babyhood! Height can jump 8-10 cm in a year.' },
  { minAge: 12, text: 'Body changes appear (puberty): skin, hair, voice, and sweat glands become more active.' },
  { minAge: 14, text: 'Bones and muscles strengthen fast. Iron and calcium needs are at their highest.' },
  { minAge: 16, text: 'Growth slows down; the long bones approach their final length.' },
  { minAge: 18, text: 'Adulthood reached: height is settled, but muscles and judgement keep maturing.' },
];

export function C7_ScienceAdolescenceAStageOfGrowthSim() {
  const [age, setAge] = useState(12);
  const [sex, setSex] = useState<'girls' | 'boys'>('girls');
  const [diet, setDiet] = useState<'balanced' | 'poor'>('balanced');

  const data = sex === 'girls' ? GIRLS : BOYS;
  const idx = age - 8;
  const height = data[idx] ?? data[data.length - 1];
  // Diet effect: poor diet costs a small but visible fraction -- teaching point, not exact medicine
  const shownHeight = diet === 'balanced' ? height : height - 3;
  const growthThisYear = (data[idx] ?? 0) - (data[Math.max(0, idx - 1)] ?? 0);
  const milestone = useMemo(() => [...MILESTONES].reverse().find((m) => age >= m.minAge)!.text, [age]);

  const toXY = (i: number, h: number) => ({ x: 40 + (i * 520) / 10, y: 200 - (h - 110) * 2.6 });

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-indigo-300">Adolescence: A Stage of Growth and Change</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="flex gap-2 mt-4">
        {(['girls', 'boys'] as const).map((g) => (
          <button
            key={g}
            onClick={() => setSex(g)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold border capitalize transition-colors ${sex === g ? 'bg-indigo-600 border-indigo-400' : 'bg-slate-800 border-slate-600 hover:bg-slate-700'}`}
          >
            {g} curve
          </button>
        ))}
        <button
          onClick={() => setDiet((d) => (d === 'balanced' ? 'poor' : 'balanced'))}
          className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-colors ${diet === 'poor' ? 'bg-pink-600 border-pink-400' : 'bg-emerald-600 border-emerald-400'}`}
        >
          {diet === 'balanced' ? 'Balanced diet (on)' : 'Poor diet (on)'}
        </button>
      </div>

      {/* Growth chart */}
      <div className="mt-4 p-4 bg-slate-950 rounded-2xl border border-slate-700">
        <svg viewBox="0 0 600 240" className="w-full">
          <line x1={40} y1={200} x2={580} y2={200} stroke="#475569" strokeWidth={2} />
          <line x1={40} y1={200} x2={40} y2={20} stroke="#475569" strokeWidth={2} />
          {[120, 140, 160, 180].map((h) => (
            <g key={h}>
              <line x1={40} y1={200 - (h - 110) * 2.6} x2={580} y2={200 - (h - 110) * 2.6} stroke="#1e293b" />
              <text x={34} y={204 - (h - 110) * 2.6} textAnchor="end" fill="#64748b" fontSize={10}>{h}cm</text>
            </g>
          ))}
          {/* curves */}
          <polyline
            points={GIRLS.map((h, i) => { const p = toXY(i, h); return `${p.x},${p.y}`; }).join(' ')}
            fill="none"
            stroke={sex === 'girls' ? '#f472b6' : '#f472b6'}
            strokeWidth={2}
            strokeDasharray={sex === 'girls' ? undefined : '4 4'}
            opacity={sex === 'girls' ? 1 : 0.4}
          />
          <polyline
            points={BOYS.map((h, i) => { const p = toXY(i, h); return `${p.x},${p.y}`; }).join(' ')}
            fill="none"
            stroke="#38bdf8"
            strokeWidth={2}
            strokeDasharray={sex === 'boys' ? undefined : '4 4'}
            opacity={sex === 'boys' ? 1 : 0.4}
          />
          {/* age ticks */}
          {data.map((_, i) => (
            <text key={i} x={toXY(i, 110).x} y={216} textAnchor="middle" fill="#94a3b8" fontSize={11}>
              {i + 8}
            </text>
          ))}
          {/* marker */}
          {(() => {
            const p = toXY(idx, shownHeight);
            return (
              <g style={{ transition: 'all 0.25s' }}>
                <line x1={p.x} y1={p.y} x2={p.x} y2={200} stroke="#34d399" strokeDasharray="3 3" />
                <circle cx={p.x} cy={p.y} r={8} fill={diet === 'balanced' ? '#34d399' : '#fb7185'} />
                <text x={Math.min(p.x + 12, 520)} y={p.y - 12} fill="#e2e8f0" fontSize={13} fontWeight="bold">
                  age {age}: {Math.round(shownHeight)} cm
                </text>
              </g>
            );
          })()}
          <text x={310} y={232} textAnchor="middle" fill="#64748b" fontSize={11}>
            age (years) -- pink dashed: girls, blue solid: boys (typical median curves)
          </text>
        </svg>
      </div>

      {/* Readouts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">Height now</div>
          <div className="text-2xl font-black font-mono text-emerald-400">{Math.round(shownHeight)} cm</div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">Grew this year</div>
          <div className="text-2xl font-black font-mono text-sky-400">{Math.round(growthThisYear * 10) / 10} cm</div>
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600 text-center">
          <div className="text-xs uppercase text-slate-400">Stage</div>
          <div className="text-sm font-bold text-amber-300 mt-1 leading-tight">{milestone}</div>
        </div>
      </div>

      {/* Age slider */}
      <div className="mt-4 p-3 bg-slate-800 rounded-2xl border border-slate-600">
        <label className="text-xs text-slate-300 flex justify-between">
          <span>Age</span>
          <span className="font-mono font-bold text-emerald-300">{age} years</span>
        </label>
        <input type="range" aria-label="age" min={8} max={18} value={age} onChange={(e) => setAge(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
      </div>

      <div className="mt-5 p-4 bg-indigo-950/60 rounded-2xl border border-indigo-700">
        <h3 className="text-sm font-bold text-indigo-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Slide the age slowly from 8 to 18 for girls, then for boys. At which age does each curve climb steepest, and who starts first?</li>
          <li>Switch the diet button to poor at age 11 and ride up to 18. The 3 cm gap looks small -- why do doctors still worry about it?</li>
        </ol>
      </div>
    </div>
  );
}

export default C7_ScienceAdolescenceAStageOfGrowthSim;
