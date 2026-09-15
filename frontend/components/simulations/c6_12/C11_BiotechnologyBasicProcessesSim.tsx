'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 11 Biotechnology -- Basic Processes
 * ONE concept: semi-conservative DNA replication (the Meselson-Stahl logic).
 * A culture started as 15N/15N (heavy) duplexes grows in 14N medium. Pick the
 * replication model the cell uses and watch the CsCl density bands confirm
 * or kill it. Real arithmetic: duplex counts per generation, band densities.
 */

type Model = 'semi' | 'cons' | 'disp';
type Kind = 'HH' | 'HL' | 'LL' | 'HY';

const D_LL = 1.71; // g/cm3, 14N/14N duplex
const D_HH = 1.724; // g/cm3, 15N/15N duplex
const STEP = 0.014; // heavy-to-light density spread
const MAX_GEN = 5;
const KIND_COLOR: Record<Kind, string> = { HH: '#8b5cf6', HL: '#fbbf24', LL: '#38bdf8', HY: '#34d399' };

const densityOf = (heavyFrac: number) => D_LL + STEP * heavyFrac;

function countsFor(model: Model, gen: number) {
  const total = Math.pow(2, gen);
  if (gen === 0) return { hh: 1, hl: 0, ll: 0, hy: 0, heavyPerHy: 1, total };
  if (model === 'cons') return { hh: 1, hl: 0, ll: total - 1, hy: 0, heavyPerHy: 0, total };
  if (model === 'semi') return { hh: 0, hl: 2, ll: total - 2, hy: 0, heavyPerHy: 0, total };
  return { hh: 0, hl: 0, ll: 0, hy: total, heavyPerHy: 1 / total, total }; // dispersive
}

function bandsFor(model: Model, gen: number) {
  const c = countsFor(model, gen);
  const out: { d: number; frac: number; kind: Kind }[] = [];
  if (c.hh) out.push({ d: D_HH, frac: c.hh / c.total, kind: 'HH' });
  if (c.hy) out.push({ d: densityOf(c.heavyPerHy), frac: 1, kind: 'HY' });
  if (c.hl) out.push({ d: densityOf(0.5), frac: c.hl / c.total, kind: 'HL' });
  if (c.ll) out.push({ d: D_LL, frac: c.ll / c.total, kind: 'LL' });
  return out;
}

function duplexIcons(model: Model, gen: number): Kind[] {
  const c = countsFor(model, gen);
  const arr: Kind[] = [];
  for (let i = 0; i < c.hh; i++) arr.push('HH');
  for (let i = 0; i < c.hy; i++) arr.push('HY');
  for (let i = 0; i < c.hl; i++) arr.push('HL');
  for (let i = 0; i < c.ll; i++) arr.push('LL');
  return arr.slice(0, 32);
}

function DuplexIcon({ kind }: { kind: Kind }) {
  if (kind === 'HY') {
    return (
      <svg width={30} height={18} viewBox="0 0 30 18" aria-label="dispersive duplex">
        {[2, 10].map((y) => (
          <g key={y}>
            <rect x={1} y={y} width={14} height={6} rx={2} fill="#8b5cf6" />
            <rect x={15} y={y} width={14} height={6} rx={2} fill="#38bdf8" />
          </g>
        ))}
      </svg>
    );
  }
  const c1 = kind === 'LL' ? '#38bdf8' : '#8b5cf6';
  const c2 = kind === 'HH' ? '#8b5cf6' : '#38bdf8';
  return (
    <svg width={30} height={18} viewBox="0 0 30 18" aria-label={kind + ' duplex'}>
      <rect x={1} y={2} width={28} height={6} rx={2} fill={c1} />
      <rect x={1} y={10} width={28} height={6} rx={2} fill={c2} />
    </svg>
  );
}

const yOf = (d: number) => 14 + ((1.728 - d) / 0.022) * 292;

export function C11_BiotechnologyBasicProcessesSim() {
  const [model, setModel] = useState<Model>('semi');
  const [gen, setGen] = useState(0);
  const [playing, setPlaying] = useState(false);
  const rafRef = useRef(0);

  useEffect(() => {
    if (!playing) return;
    let last = performance.now();
    const tick = (t: number) => {
      if (t - last >= 1100) {
        last = t;
        setGen((g) => Math.min(MAX_GEN, g + 1));
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing]);

  useEffect(() => {
    if (playing && gen >= MAX_GEN) setPlaying(false);
  }, [playing, gen]);

  const c = countsFor(model, gen);
  const bands = bandsFor(model, gen);
  const icons = duplexIcons(model, gen);

  const evidence =
    gen === 0
      ? 'Start: every duplex is heavy 15N/15N. One band will sit at 1.724 g/cm3.'
      : model === 'cons'
      ? 'Generation 1 shows TWO bands (heavy + light): the photocopier picture. This is exactly what Meselson and Stahl did NOT see.'
      : model === 'disp'
      ? 'One band that drifts lighter every generation -- old and new DNA are scrambled inside each duplex. No pure species ever appears.'
      : gen === 1
      ? 'ONE band at 1.717 g/cm3: every duplex carries one old and one new strand. Conservative would have shown two bands here.'
      : 'Two bands (hybrid + light) and the hybrid NEVER vanishes. Dispersive would still show a single drifting band.';

  const reset = () => {
    setPlaying(false);
    setModel('semi');
    setGen(0);
  };

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-violet-950/80 rounded-2xl border border-violet-700">🧬</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-violet-400">Class 11 Biotechnology -- Basic Processes</span>
          <h1 className="text-xl md:text-2xl font-extrabold">How Does DNA Copy Itself? Test All Three Models</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <div className="grid grid-cols-2 gap-3">
            <svg viewBox="0 0 240 320" className="w-full">
              <text x={120} y={10} fontSize={9} fill="#94a3b8" textAnchor="middle">CsCl density gradient tube</text>
              <rect x={78} y={14} width={84} height={292} rx={42} fill="#0b1220" stroke="#334155" />
              {[
                { d: D_HH, t: '1.724' },
                { d: densityOf(0.5), t: '1.717' },
                { d: D_LL, t: '1.710' },
              ].map((g) => (
                <g key={g.t}>
                  <line x1={82} y1={yOf(g.d)} x2={158} y2={yOf(g.d)} stroke="#1e293b" strokeDasharray="3 3" />
                  <text x={168} y={yOf(g.d) + 3} fontSize={8} fill="#64748b">{g.t}</text>
                </g>
              ))}
              {bands.map((b) => (
                <rect key={b.kind} x={82} width={76} rx={5} fill={KIND_COLOR[b.kind]} opacity={0.92}
                  className="transition-all duration-700"
                  y={yOf(b.d) - Math.max(10, b.frac * 200) / 2}
                  height={Math.max(10, b.frac * 200)} />
              ))}
              <text x={120} y={316} fontSize={9} fill="#64748b" textAnchor="middle">g/cm3 (light on top, heavy at bottom)</text>
            </svg>
            <div>
              <p className="text-[10px] text-slate-500 mb-1">All duplexes after {gen} replication round{gen === 1 ? '' : 's'} ({c.total} total)</p>
              <div className="grid grid-cols-4 gap-1">
                {icons.map((k, i) => (
                  <div key={i} className="flex items-center justify-center bg-slate-950 rounded-lg border border-slate-800 py-1">
                    <DuplexIcon kind={k} />
                  </div>
                ))}
              </div>
              {c.total > 32 && <p className="text-[10px] text-slate-500 mt-1">+ {c.total - 32} more, same pattern</p>}
              <p className="text-[10px] text-slate-500 mt-2">Key: violet = 15N old strand, blue = 14N new strand, half-half = scrambled</p>
            </div>
          </div>
          <p className="text-xs leading-relaxed text-slate-300 mt-2 bg-slate-950 rounded-xl border border-slate-800 p-2">{evidence}</p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-3 gap-2">
              {(['semi', 'cons', 'disp'] as Model[]).map((m) => (
                <button key={m} onClick={() => { setModel(m); setGen(0); setPlaying(false); }}
                  className={`min-h-11 rounded-xl text-[10px] font-bold ${model === m ? 'bg-violet-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {m === 'semi' ? 'Semi-conservative' : m === 'cons' ? 'Conservative' : 'Dispersive'}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Replication rounds</span>
                <span className="font-mono font-bold text-violet-400">{gen} (duplexes 2^{gen} = {c.total})</span>
              </div>
              <input type="range" min={0} max={MAX_GEN} step={1} value={gen} aria-label="generations"
                onChange={(e) => setGen(Number(e.target.value))} className="w-full min-h-11 accent-violet-500" />
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => setPlaying((p) => !p)}
                className={`min-h-11 rounded-xl text-xs font-bold ${playing ? 'bg-amber-500 text-slate-950' : 'bg-emerald-600 text-white'}`}>
                {playing ? 'Pause' : 'Grow culture'}
              </button>
              <button onClick={() => setGen((g) => Math.min(MAX_GEN, g + 1))}
                className="min-h-11 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700">+1 round</button>
              <button onClick={reset} className="min-h-11 rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
            </div>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            {([
              ['HH', c.hh], ['HL', c.hl], ['LL', c.ll], ['HY', c.hy],
            ] as [Kind, number][]).map(([k, n]) => (
              <div key={k} className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
                <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1">
                  <span className="inline-block w-2 h-2 rounded-full" style={{ background: KIND_COLOR[k] }} />{k}
                </p>
                <p className="font-mono font-bold text-slate-200">{((n / c.total) * 100).toFixed(1)}%</p>
              </div>
            ))}
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              Most students picture DNA copying like a photocopier: the original stays whole and a fresh copy
              rolls out. That is the conservative model -- and round 1 kills it: the whole culture bands at the
              hybrid position, so EVERY daughter duplex carries one parental strand. Old and new always travel together.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Switch to Conservative and step to round 1: two bands appear. Meselson and Stahl saw ONE band at 1.717 g/cm3 -- which model survives that observation?</p>
            <p>2. Grow semi-conservative to round 4: only 2 of 16 duplexes are still hybrid. What percentage is that, and why does it never reach zero?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C11_BiotechnologyBasicProcessesSim;
