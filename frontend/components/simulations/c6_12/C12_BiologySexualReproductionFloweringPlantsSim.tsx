'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 12 Biology -- Sexual Reproduction in Flowering Plants
 * ONE concept: pollination + pollen-pistil interaction. A stigma is a
 * chemical gatekeeper: only compatible pollen germinates, and its tube must
 * travel the whole style (about 1 mm per hour) to reach the ovule.
 * react + tailwind only.
 */

type Agent = 'insect' | 'wind' | 'hand';
type Source = 'self' | 'cross' | 'other';
type Phase = 'idle' | 'grow' | 'done' | 'reject';

type Grain = { x: number; y: number; compat: boolean; landed: boolean };

const STIGMA = { cx: 160, cy: 58, rx: 30, ry: 12 };
const RATE_MM_H = 1; // typical in-style pollen tube speed
const H_PER_S = 3; // simulation clock: 3 hours per real second

const onStigma = (g: Grain) => {
  const dx = (g.x - STIGMA.cx) / STIGMA.rx;
  const dy = (g.y - STIGMA.cy) / STIGMA.ry;
  return dx * dx + dy * dy <= 1;
};

function releaseGrains(agent: Agent, source: Source, selfIncompat: boolean): Grain[] {
  const compat = source === 'cross' ? true : source === 'self' ? !selfIncompat : false;
  const n = agent === 'wind' ? 26 : agent === 'hand' ? 10 : 6;
  const out: Grain[] = [];
  for (let i = 0; i < n; i++) {
    let x: number;
    let y: number;
    if (agent === 'insect') {
      x = 160 + (Math.random() * 44 - 22);
      y = 50 + Math.random() * 14;
    } else if (agent === 'hand') {
      x = 160 + (Math.random() * 26 - 13);
      y = 52 + Math.random() * 12;
    } else if (Math.random() < 0.5) {
      x = 160 + (Math.random() * 100 - 50);
      y = 42 + Math.random() * 28;
    } else {
      x = 15 + Math.random() * 290;
      y = 15 + Math.random() * 150;
    }
    const g: Grain = { x, y, compat, landed: false };
    g.landed = onStigma(g);
    out.push(g);
  }
  return out;
}

export function C12_BiologySexualReproductionFloweringPlantsSim() {
  const [agent, setAgent] = useState<Agent>('insect');
  const [source, setSource] = useState<Source>('cross');
  const [styleMm, setStyleMm] = useState(12);
  const [selfIncompat, setSelfIncompat] = useState(true);
  const [grains, setGrains] = useState<Grain[]>([]);
  const [hours, setHours] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const rafRef = useRef(0);

  const ovaryY = 84 + styleMm * 9;
  const landed = grains.filter((g) => g.landed).length;
  const germinated = grains.filter((g) => g.landed && g.compat).length;
  const tubeMm = Math.min(styleMm, hours);
  const tubeTips = grains.filter((g) => g.landed && g.compat).slice(0, 3).map((g) => g.x);

  useEffect(() => {
    if (phase !== 'grow') return;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = (t - last) / 1000;
      last = t;
      setHours((h) => h + dt * H_PER_S);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase]);

  useEffect(() => {
    if (phase === 'grow' && hours >= styleMm) setPhase('done');
  }, [phase, hours, styleMm]);

  const release = () => {
    cancelAnimationFrame(rafRef.current);
    const list = releaseGrains(agent, source, selfIncompat);
    setGrains(list);
    setHours(0);
    setPhase(list.some((g) => g.landed && g.compat) ? 'grow' : 'reject');
  };

  const reset = () => {
    cancelAnimationFrame(rafRef.current);
    setGrains([]);
    setHours(0);
    setPhase('idle');
    setAgent('insect');
    setSource('cross');
    setStyleMm(12);
    setSelfIncompat(true);
  };

  const banner =
    phase === 'done'
      ? { cls: 'bg-emerald-950/60 border-emerald-700 text-emerald-300', text: `Tube reached the ovule after ${styleMm.toFixed(1)} h. Pollination succeeded -- double fertilisation can now happen.` }
      : phase === 'reject'
      ? {
          cls: 'bg-rose-950/60 border-rose-700 text-rose-300',
          text:
            source === 'self' && selfIncompat
              ? 'Same-flower pollen: the pistil matched its own S-allele and blocked germination. Self-incompatibility forces cross-pollination.'
              : source === 'other'
              ? 'Wrong species: the stigma chemistry rejected every grain. No germination, no tube, no seed.'
              : 'No grain landed on the stigma. Pollination failed before the pistil could even test the pollen.',
        }
      : phase === 'grow'
      ? { cls: 'bg-slate-900/70 border-slate-700 text-slate-300', text: 'Pollen accepted. The tube is digesting its way down the style at about 1 mm per hour...' }
      : { cls: 'bg-slate-900/70 border-slate-800 text-slate-500', text: 'Pick a pollinator and a pollen source, then release the grains onto the flower.' };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-emerald-950/80 rounded-2xl border border-emerald-700">🌸</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Class 12 Biology -- Sexual Reproduction in Flowering Plants</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Pollination: The Stigma Is a Gatekeeper, Not a Doormat</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 320 340" className="w-full">
            <rect x={0} y={0} width={320} height={340} rx={10} fill="#0b1220" />
            {/* petals + anthers (context anatomy) */}
            <ellipse cx={160} cy={44} rx={95} ry={26} fill="#7c3aed" opacity={0.18} />
            <ellipse cx={92} cy={30} rx={14} ry={8} fill="#fbbf24" />
            <ellipse cx={228} cy={30} rx={14} ry={8} fill="#fbbf24" />
            <text x={92} y={16} fontSize={9} fill="#94a3b8" textAnchor="middle">anther</text>
            <text x={228} y={16} fontSize={9} fill="#94a3b8" textAnchor="middle">anther</text>
            {/* style walls */}
            <line x1={152} y1={66} x2={152} y2={ovaryY} stroke="#475569" strokeWidth={2} />
            <line x1={168} y1={66} x2={168} y2={ovaryY} stroke="#475569" strokeWidth={2} />
            {/* pollen tubes */}
            {tubeTips.map((x, i) => (
              <line key={i} x1={x > 160 ? 163 : x < 160 ? 157 : 160} y1={62}
                x2={x > 160 ? 163 : x < 160 ? 157 : 160} y2={62 + tubeMm * 9}
                stroke="#fbbf24" strokeWidth={2.5} strokeLinecap="round" className="transition-all duration-100" />
            ))}
            {/* stigma */}
            <ellipse cx={STIGMA.cx} cy={STIGMA.cy} rx={STIGMA.rx} ry={STIGMA.ry} fill="#334155" stroke="#64748b" />
            <text x={206} y={STIGMA.cy + 4} fontSize={9} fill="#94a3b8">stigma</text>
            {/* ovary + ovule */}
            <circle cx={160} cy={ovaryY + 16} r={30} fill="#14532d" opacity={0.5} stroke="#475569" />
            <circle cx={160} cy={ovaryY + 18} r={8}
              fill={phase === 'done' ? '#34d399' : '#475569'} className="transition-all duration-500" />
            <text x={205} y={ovaryY + 20} fontSize={9} fill="#94a3b8">ovule</text>
            <text x={205} y={ovaryY + 34} fontSize={9} fill="#94a3b8">ovary</text>
            {/* pollen grains */}
            {grains.map((g, i) => (
              <circle key={i} cx={g.x} cy={g.y} r={4}
                fill={g.compat ? '#fbbf24' : '#f87171'}
                opacity={g.landed ? (g.compat ? 0.95 : 0.35) : 0.25}
                className="transition-all duration-700" />
            ))}
            <text x={14} y={330} fontSize={9} fill="#64748b">amber = compatible grain, red = incompatible (rejected)</text>
          </svg>
          <div className={`rounded-xl border p-2 text-xs leading-relaxed transition-colors duration-300 ${banner.cls}`}>
            {banner.text}
          </div>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Pollinator</p>
              <div className="grid grid-cols-3 gap-2">
                {(['insect', 'wind', 'hand'] as Agent[]).map((a) => (
                  <button key={a} onClick={() => setAgent(a)}
                    className={`min-h-11 rounded-xl text-[10px] font-bold ${agent === a ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {a === 'insect' ? 'Insect' : a === 'wind' ? 'Wind' : 'By hand'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Pollen source</p>
              <div className="grid grid-cols-3 gap-2">
                {(['self', 'cross', 'other'] as Source[]).map((s) => (
                  <button key={s} onClick={() => setSource(s)}
                    className={`min-h-11 rounded-xl text-[10px] font-bold ${source === s ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {s === 'self' ? 'Same flower' : s === 'cross' ? 'Other plant' : 'Other species'}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Style length</span>
                <span className="font-mono font-bold text-emerald-400">{styleMm} mm</span>
              </div>
              <input type="range" min={4} max={20} step={1} value={styleMm} aria-label="style length"
                onChange={(e) => setStyleMm(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setSelfIncompat((v) => !v)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${selfIncompat ? 'bg-rose-600 text-white' : 'bg-slate-800 hover:bg-slate-700'}`}>
                Self-incompatible: {selfIncompat ? 'ON' : 'OFF'}
              </button>
              <button onClick={release} disabled={phase === 'grow'}
                className="min-h-11 rounded-xl text-xs font-bold bg-amber-500 text-slate-950 disabled:opacity-50">
                Release pollen
              </button>
            </div>
            <button onClick={reset} className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">On stigma</p>
              <p className="font-mono font-bold text-gold-300">{landed}/{grains.length}</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Germinated</p>
              <p className="font-mono font-bold text-amber-300">{germinated}</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Tube / style</p>
              <p className="font-mono font-bold text-emerald-300">{tubeMm.toFixed(1)}/{styleMm} mm</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800 col-span-2">
              <p className="text-[10px] text-slate-500">Tube travel time ({RATE_MM_H} mm/h)</p>
              <p className="font-mono font-bold text-slate-200">{Math.min(hours, styleMm).toFixed(1)} h of about {(styleMm / RATE_MM_H).toFixed(0)} h needed</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Journey</p>
              <p className="font-mono font-bold text-slate-200">{Math.round((tubeMm / styleMm) * 100)}%</p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Any pollen on any stigma starts growing.&quot; No -- the pistil chemically inspects every grain.
              Wrong-species pollen, and (in self-incompatible plants) the plant&apos;s OWN pollen, are blocked before
              a single tube forms. And pollination is only delivery: fertilisation waits until the tube reaches the ovule.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Switch the pollinator from Insect to Wind and release again. How many grains even reach the stigma? Why do wind-pollinated plants like maize make millions of grains?</p>
            <p>2. Set the style to 20 mm with Other-plant pollen: how many hours does the tube need? Now pick Same flower with self-incompatibility ON -- where exactly does the journey stop?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_BiologySexualReproductionFloweringPlantsSim;
