'use client';
/**
 * C8_ScienceHowNatureWorksInHarmonySim (Class 8 Science)
 *
 * ELI5: In a grassland, rabbits eat grass and foxes eat rabbits. Each
 * population controls the other, and the balance wobbles in famous cycles:
 * more rabbits -> more foxes -> fewer rabbits -> fewer foxes -> rabbits
 * return. Disturb one link and the whole harmony wobbles.
 */
import React, { useEffect, useMemo, useState } from 'react';

interface Step {
  grass: number;
  rabbits: number;
  foxes: number;
}

function step(prev: Step, growth: number, eatRate: number): Step {
  // simple discrete predator-prey model
  const grassEaten = prev.rabbits * eatRate;
  const grass = Math.max(2, Math.min(100, prev.grass + growth - grassEaten * 0.35));
  const rabbitBirth = prev.rabbits * 0.08 * (prev.grass / 100);
  const rabbitDeath = prev.rabbits * 0.012 * prev.foxes + grassEaten * 0.06;
  const rabbits = Math.max(0, prev.rabbits + rabbitBirth - rabbitDeath);
  const foxBirth = prev.foxes * 0.05 * (prev.rabbits / 60);
  const foxDeath = prev.foxes * 0.08;
  const foxes = Math.max(0, prev.foxes + foxBirth - foxDeath);
  return { grass, rabbits, foxes };
}

export function C8_ScienceHowNatureWorksInHarmonySim() {
  const [growth, setGrowth] = useState(3);
  const [eatRate, setEatRate] = useState(0.5);
  const [initRabbits, setInitRabbits] = useState(30);
  const [initFoxes, setInitFoxes] = useState(6);
  const [history, setHistory] = useState<Step[]>([]);
  const [running, setRunning] = useState(false);

  // seed history when params change
  React.useEffect(() => {
    const h: Step[] = [{ grass: 70, rabbits: initRabbits, foxes: initFoxes }];
    for (let i = 0; i < 40; i++) h.push(step(h[h.length - 1], growth, eatRate));
    setHistory(h);
    setRunning(false);
  }, [growth, eatRate, initRabbits, initFoxes]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setHistory((h) => [...h.slice(-79), step(h[h.length - 1], growth, eatRate)]);
    }, 120);
    return () => clearInterval(id);
  }, [running, growth, eatRate]);

  const last = history[history.length - 1] || { grass: 70, rabbits: initRabbits, foxes: initFoxes };

  const chart = useMemo(() => {
    const shown = history.slice(-60);
    const map = (v: number, max: number) => 170 - (v / max) * 140;
    const pts = (key: 'grass' | 'rabbits' | 'foxes', max: number) =>
      shown.map((s, i) => `${10 + (i / Math.max(shown.length - 1, 1)) * 320},${map(s[key], max)}`).join(' ');
    return { shown, grassLine: pts('grass', 100), rabbitLine: pts('rabbits', Math.max(...shown.map((s) => s.rabbits), 1)), foxLine: pts('foxes', Math.max(...shown.map((s) => s.foxes), 1)) };
  }, [history]);

  return (
    <div className="w-full max-w-5xl mx-auto p-5 bg-white rounded-3xl border border-slate-200 shadow-xl font-sans text-slate-800">
      <h1 className="text-xl md:text-2xl font-black text-emerald-700">How Nature Works in Harmony: Grassland Cycles</h1>

      <div className="mt-3 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm leading-relaxed">
        <p>
          <span className="font-bold text-emerald-700">Every link matters:</span> grass feeds
          rabbits, rabbits feed foxes, and fox droppings feed the grass again. Because each species
          reacts to the one before it, populations rise and fall in wavy cycles - peaks of foxes
          trail peaks of rabbits by a little. Watch who leads and who follows in the chart.
        </p>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-2 p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Grass growth (rain)</span><span className="font-mono text-emerald-600">{growth}</span></label>
            <input type="range" min={1} max={6} step={0.5} value={growth} aria-label="grass growth" onChange={(e) => setGrowth(Number(e.target.value))} className="w-full mt-1 accent-emerald-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Rabbit grazing rate</span><span className="font-mono text-amber-600">{eatRate}</span></label>
            <input type="range" min={0.2} max={0.9} step={0.05} value={eatRate} aria-label="grazing rate" onChange={(e) => setEatRate(Number(e.target.value))} className="w-full mt-1 accent-amber-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Starting rabbits</span><span className="font-mono text-indigo-600">{initRabbits}</span></label>
            <input type="range" min={5} max={60} value={initRabbits} aria-label="initial rabbits" onChange={(e) => setInitRabbits(Number(e.target.value))} className="w-full mt-1 accent-indigo-600" />
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 flex justify-between"><span>Starting foxes</span><span className="font-mono text-rose-600">{initFoxes}</span></label>
            <input type="range" min={1} max={15} value={initFoxes} aria-label="initial foxes" onChange={(e) => setInitFoxes(Number(e.target.value))} className="w-full mt-1 accent-rose-600" />
          </div>
          <div className="flex gap-2">
            <button onClick={() => setRunning((r) => !r)} className={`px-4 py-2 rounded-xl text-sm font-bold text-white transition-all ${running ? 'bg-rose-600 hover:bg-rose-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}>
              {running ? 'Pause ecosystem' : 'Run ecosystem'}
            </button>
            <button onClick={() => { setRunning(false); setInitRabbits(initRabbits); }} className="px-3 py-2 rounded-xl text-sm font-bold bg-slate-200 hover:bg-slate-300 transition-all">
              Reset
            </button>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-sm">
            <div>grass cover: <span className="text-emerald-700 font-bold">{Math.round(last.grass)}%</span></div>
            <div>rabbits: <span className="text-indigo-700 font-bold">{Math.round(last.rabbits)}</span></div>
            <div>foxes: <span className="text-rose-700 font-bold">{Math.round(last.foxes)}</span></div>
          </div>
        </div>

        <div className="md:col-span-3 p-2 bg-gradient-to-br from-sky-50 to-white rounded-2xl border border-slate-200">
          <svg viewBox="0 0 340 190" className="w-full">
            <line x1={10} y1={170} x2={330} y2={170} stroke="#94a3b8" />
            <polyline points={chart.grassLine} fill="none" stroke="#16a34a" strokeWidth={2} opacity={0.7} />
            <polyline points={chart.rabbitLine} fill="none" stroke="#6366f1" strokeWidth={2.5} />
            <polyline points={chart.foxLine} fill="none" stroke="#e11d48" strokeWidth={2} />
            <g fontSize="10">
              <rect x={150} y={10} width={10} height={6} fill="#16a34a" />
              <text x={164} y={16} fill="#166534">grass</text>
              <rect x={210} y={10} width={10} height={6} fill="#6366f1" />
              <text x={224} y={16} fill="#4338ca">rabbits</text>
              <rect x={285} y={10} width={10} height={6} fill="#e11d48" />
              <text x={299} y={16} fill="#9f1239">foxes</text>
            </g>
            <text x={170} y={185} textAnchor="middle" fontSize="9" fill="#475569">time (latest 60 steps)</text>
          </svg>
          <div className="px-2 text-xs text-slate-500">
            {running ? 'Ecosystem running - watch fox peaks chase rabbit peaks.' : 'Press Run, or change any slider to test a new ecosystem.'}
          </div>
        </div>
      </div>

      <div className="mt-4 p-4 bg-emerald-50 border border-emerald-200 rounded-2xl text-sm">
        <p className="font-bold text-emerald-700 mb-1">What to try</p>
        <ol className="list-decimal ml-5 space-y-1 text-slate-700">
          <li>Run with defaults and note the order of peaks. Which population peaks FIRST after grass recovers - rabbits or foxes?</li>
          <li>Poaching event: drop foxes to 1 and watch rabbits explode, then grass crash. What grazing rate prevents a total crash?</li>
        </ol>
      </div>
    </div>
  );
}

export default C8_ScienceHowNatureWorksInHarmonySim;
