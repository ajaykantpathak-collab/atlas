'use client';

import React, { useMemo, useState } from 'react';

// ─── Teaching text ───
const LEARN =
  'Emile Durkheim asked: what holds society together when everyone is DIFFERENT? In a small village everyone ' +
  'does the same work -- people bond because they are ALIKE (mechanical solidarity). In a modern city everyone ' +
  'does a different job -- people bond because they NEED each other (organic solidarity). But if the division ' +
  'of labour races ahead while shared rules lag behind, Durkheim warned of ANOMIE: a society of strangers with ' +
  'no rules. Watch the bonds change as you specialise.';

type Preset = 'village' | 'town' | 'city';

export function C11_SociologyWesternSociologistsSim() {
  const [specialisation, setSpecialisation] = useState(15); // 0-100 division of labour
  const [regulation, setRegulation] = useState(70); // shared rules keep up, 0-100
  const [speed, setSpeed] = useState(0); // how abruptly change is applied (anomie trigger)
  const [preset, setPreset] = useState<Preset>('village');

  const nodes = useMemo(() => {
    // 12 workers placed on a circle; hue spread = how different their work is
    return Array.from({ length: 12 }, (_, i) => {
      const angle = (i / 12) * Math.PI * 2;
      return {
        x: 200 + Math.cos(angle) * 90,
        y: 125 + Math.sin(angle) * 78,
        hue: Math.round((i / 12) * specialisation * 3.3),
        role: i,
      };
    });
  }, [specialisation]);

  const anomie = Math.max(0, Math.round(specialisation * 0.9 - regulation + speed * 0.5));
  const solidarityType =
    specialisation < 25 ? 'Mechanical solidarity (alike people, one shared conscience)' : specialisation < 70 ? 'Mixed: old likeness + new interdependence' : 'Organic solidarity (different specialists who need each other)';
  const collectiveConscience = Math.round(100 - specialisation * 0.85);
  const interdependence = Math.round(specialisation);

  const applyPreset = (p: Preset) => {
    setPreset(p);
    if (p === 'village') {
      setSpecialisation(10);
      setRegulation(85);
      setSpeed(0);
    } else if (p === 'town') {
      setSpecialisation(45);
      setRegulation(60);
      setSpeed(1);
    } else {
      setSpecialisation(90);
      setRegulation(25);
      setSpeed(3);
    }
  };

  const reset = () => {
    setSpecialisation(15);
    setRegulation(70);
    setSpeed(0);
    setPreset('village');
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 bg-slate-900 text-slate-100 rounded-3xl border border-slate-700 shadow-xl font-sans">
      <h1 className="text-xl md:text-2xl font-black text-gold-300">Durkheim: Division of Labour, Solidarity and Anomie</h1>
      <p className="text-sm text-slate-300 mt-2 leading-relaxed">{LEARN}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {/* Society web */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700">
          <svg viewBox="0 0 400 250" className="w-full">
            {/* likeness bonds (mechanical) -- fade as specialisation rises */}
            {nodes.map((n, i) => {
              const m = nodes[(i + 1) % 12];
              const likeness = 1 - specialisation / 100;
              return (
                <line
                  key={`mech${i}`}
                  x1={n.x}
                  y1={n.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="#94a3b8"
                  strokeWidth={2}
                  opacity={likeness * 0.8}
                  style={{ transition: 'opacity 0.3s' }}
                />
              );
            })}
            {/* interdependence bonds (organic) -- grow with specialisation, cross the circle */}
            {nodes.map((n, i) => {
              const m = nodes[(i + 6) % 12];
              const org = specialisation / 100;
              return (
                <line
                  key={`org${i}`}
                  x1={n.x}
                  y1={n.y}
                  x2={m.x}
                  y2={m.y}
                  stroke="#34d399"
                  strokeWidth={2}
                  opacity={org * 0.75}
                  style={{ transition: 'opacity 0.3s' }}
                />
              );
            })}
            {nodes.map((n, i) => (
              <circle key={i} cx={n.x} cy={n.y} r={13} fill={`hsl(${n.hue}, 70%, 62%)`} style={{ transition: 'fill 0.3s' }} />
            ))}
            <text x={200} y={18} textAnchor="middle" fontSize={12} fontWeight="bold" fill="#e2e8f0">
              Grey ring = bonds of LIKENESS. Green spokes = bonds of NEED.
            </text>
            <text x={200} y={238} textAnchor="middle" fontSize={11} fill={anomie > 50 ? '#f87171' : '#94a3b8'}>
              {anomie > 50 ? 'ANOMIE: specialists with no shared rules -- norms have not caught up!' : 'Rules and bonds are keeping pace with change.'}
            </text>
          </svg>
        </div>

        {/* Live indicators */}
        <div className="p-4 bg-slate-950 rounded-2xl border border-slate-700 text-sm space-y-3">
          <div className="text-xs uppercase tracking-wide text-slate-400">Live social diagnosis</div>
          <div className="text-slate-300">Type of solidarity:</div>
          <div className="font-bold text-emerald-300 text-sm">{solidarityType}</div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Collective conscience (shared beliefs)</span>
              <span className="font-mono text-gold-300">{collectiveConscience}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-gold-500 rounded" style={{ width: `${collectiveConscience}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Interdependence (need for others)</span>
              <span className="font-mono text-emerald-300">{interdependence}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-emerald-500 rounded" style={{ width: `${interdependence}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div>
            <div className="flex justify-between text-xs text-slate-400">
              <span>Anomie (rulelessness) risk</span>
              <span className={`font-mono ${anomie > 50 ? 'text-rose-300' : 'text-amber-300'}`}>{Math.max(0, anomie)}%</span>
            </div>
            <div className="h-3 bg-slate-800 rounded mt-1">
              <div className="h-3 bg-rose-500 rounded" style={{ width: `${Math.min(100, Math.max(0, anomie))}%`, transition: 'width 0.3s' }} />
            </div>
          </div>
          <div className="text-xs text-amber-300 pt-2 border-t border-slate-800">
            Misconception killer: Durkheim did NOT say modern society has NO solidarity. He said its KIND changes -- from being alike to being needed.
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Division of labour (specialisation)</span>
            <span className="font-mono font-bold text-gold-300">{specialisation}%</span>
          </label>
          <input type="range" aria-label="specialisation" min={0} max={100} step={5} value={specialisation} onChange={(e) => setSpecialisation(Number(e.target.value))} className="w-full mt-2 accent-gold-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Shared rules keep up (regulation)</span>
            <span className="font-mono font-bold text-emerald-300">{regulation}%</span>
          </label>
          <input type="range" aria-label="regulation" min={0} max={100} step={5} value={regulation} onChange={(e) => setRegulation(Number(e.target.value))} className="w-full mt-2 accent-emerald-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300 flex justify-between">
            <span>Abruptness of change (shock)</span>
            <span className="font-mono font-bold text-rose-300">{speed}</span>
          </label>
          <input type="range" aria-label="abruptness" min={0} max={4} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} className="w-full mt-2 accent-rose-400" />
        </div>
        <div className="p-3 bg-slate-800 rounded-2xl border border-slate-600">
          <label className="text-xs text-slate-300">Jump to a society</label>
          <div className="flex gap-2 mt-2">
            {(['village', 'town', 'city'] as Preset[]).map((p) => (
              <button
                key={p}
                onClick={() => applyPreset(p)}
                className={`flex-1 min-h-11 rounded-xl text-xs font-semibold capitalize border ${preset === p ? 'bg-gold-600 border-gold-400' : 'bg-slate-900 border-slate-600 hover:bg-slate-700'}`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button
          onClick={() => { setSpecialisation(90); setRegulation(20); setSpeed(3); }}
          className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-rose-600 border-rose-400 hover:bg-rose-500"
        >
          Trigger an anomic shock
        </button>
        <button onClick={reset} className="px-4 py-2 min-h-11 rounded-xl text-sm font-semibold border bg-slate-800 border-slate-600 hover:bg-slate-700">
          Reset society
        </button>
      </div>

      <div className="mt-5 p-4 bg-gold-950/60 rounded-2xl border border-gold-700">
        <h3 className="text-sm font-bold text-gold-300 mb-1">What to try</h3>
        <ol className="list-decimal list-inside text-xs text-slate-300 space-y-1">
          <li>Slide specialisation slowly from 0 to 100 with regulation at 90. What type of solidarity appears -- and does anomie ever rise?</li>
          <li>Press &quot;Trigger an anomic shock&quot;. Now raise ONLY the regulation slider. At what regulation % does the anomie warning disappear?</li>
        </ol>
      </div>
    </div>
  );
}

export default C11_SociologyWesternSociologistsSim;
