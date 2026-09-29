'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';

// ─── CALL STACK EVENTS, precomputed exactly like Python evaluates them ───
type Ev = { kind: 'push' | 'return' | 'print'; fn: string; n?: number; ret?: number };

const buildFactorial = (n: number): Ev[] => {
  const evs: Ev[] = [{ kind: 'push', fn: 'main' }];
  for (let i = n; i >= 1; i--) evs.push({ kind: 'push', fn: 'factorial', n: i });
  evs.push({ kind: 'return', fn: 'factorial', n: 1, ret: 1 });
  for (let i = 2; i <= n; i++) evs.push({ kind: 'return', fn: 'factorial', n: i, ret: 0 });
  let acc = 1;
  evs.filter((e) => e.kind === 'return' && e.n && e.n >= 2).forEach((e) => {
    acc = acc * (e.n as number);
    e.ret = acc;
  });
  evs.push({ kind: 'print', fn: 'main', ret: acc });
  return evs;
};

const buildCountdown = (n: number): Ev[] => {
  const evs: Ev[] = [{ kind: 'push', fn: 'main' }];
  for (let i = n; i >= 1; i--) evs.push({ kind: 'push', fn: 'countdown', n: i });
  evs.push({ kind: 'return', fn: 'countdown', n: 1, ret: 1 });
  for (let i = 2; i <= n; i++) evs.push({ kind: 'return', fn: 'countdown', n: i, ret: i });
  evs.push({ kind: 'print', fn: 'main', ret: n });
  return evs;
};

const PROGRAMS = [
  { id: 'fact', label: 'factorial(4)', build: () => buildFactorial(4) },
  { id: 'fact5', label: 'factorial(5)', build: () => buildFactorial(5) },
  { id: 'count', label: 'countdown(3)', build: () => buildCountdown(3) },
];

export function C11_ComputerScienceFunctionsCallStackSim() {
  const [progId, setProgId] = useState('fact');
  const [stepIdx, setStepIdx] = useState(0);
  const [auto, setAuto] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const prog = PROGRAMS.find((p) => p.id === progId) || PROGRAMS[0];
  const events = useMemo(() => prog.build(), [prog]);

  // Rebuild the stack as it looked after stepIdx events
  const frames: { fn: string; n?: number; ret?: number }[] = [];
  const done: { fn: string; n?: number; ret?: number }[] = [];
  const upto = events.slice(0, stepIdx);
  upto.forEach((e) => {
    if (e.kind === 'push') frames.push({ fn: e.fn, n: e.n });
    if (e.kind === 'return') {
      const f = frames.pop();
      done.push({ fn: e.fn, n: e.n, ret: e.ret });
      if (frames.length && frames[frames.length - 1].fn === 'factorial') {
        frames[frames.length - 1].ret = e.ret; // value received by caller
      }
    }
  });

  const lastEvent = stepIdx > 0 ? events[stepIdx - 1] : null;
  const narration =
    stepIdx === 0 ? 'Press Step to call the function -- watch a stack frame appear.'
    : lastEvent?.kind === 'push' ? `Called ${lastEvent.fn}(${lastEvent.n ?? ''}) -- Python pushes a NEW frame with its OWN local n.`
    : lastEvent?.kind === 'return' ? `${lastEvent.fn}(${lastEvent.n}) returned ${lastEvent.ret} -- its frame is destroyed.`
    : `main received ${lastEvent?.ret} -- program output: ${lastEvent?.ret}`;

  useEffect(() => {
    if (!auto) return;
    timerRef.current = setInterval(() => {
      setStepIdx((s) => (s >= events.length ? (setAuto(false), s) : s + 1));
    }, 900);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [auto, events.length]);

  const pick = (id: string) => {
    setProgId(id);
    setStepIdx(0);
    setAuto(false);
  };

  const reset = () => pick(progId);

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-gold-400">CBSE Class 11 Computer Science - Functions</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Python Call Stack: frames, arguments, returns</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-gold-950 border border-gold-700 text-gold-300">Step {stepIdx} / {events.length}</span>
      </header>

      {/* CONTROLS */}
      <div className="flex flex-wrap gap-2 mb-3">
        {PROGRAMS.map((p) => (
          <button key={p.id} onClick={() => pick(p.id)} className={`min-h-11 px-4 rounded-xl text-xs font-mono font-bold border ${progId === p.id ? 'bg-gold-600 text-white border-gold-400' : 'bg-slate-900 text-slate-400 border-slate-800'}`}>
            {p.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        <button onClick={() => setStepIdx((s) => Math.max(0, s - 1))} disabled={stepIdx === 0} className={`min-h-11 px-4 rounded-2xl text-sm font-bold border ${stepIdx === 0 ? 'bg-slate-900 border-slate-800 text-slate-600' : 'bg-slate-900 border-slate-700 text-slate-200'}`}>Back</button>
        <button onClick={() => setStepIdx((s) => Math.min(events.length, s + 1))} disabled={stepIdx >= events.length} className={`flex-1 min-h-11 px-4 rounded-2xl text-sm font-bold border ${stepIdx >= events.length ? 'bg-slate-900 border-slate-800 text-slate-600' : 'bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-500'}`}>Step one action</button>
        <button onClick={() => setAuto(!auto)} className={`min-h-11 px-4 rounded-2xl text-xs font-bold border ${auto ? 'bg-amber-950/60 border-amber-700 text-amber-300' : 'bg-slate-900 border-slate-700 text-slate-300'}`}>{auto ? 'Stop auto-run' : 'Auto-run'}</button>
        <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
      </div>

      {/* CODE + STACK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Program</p>
          <pre className="text-xs font-mono text-slate-300 leading-relaxed whitespace-pre-wrap">{`def ${prog.id.startsWith('count') ? 'countdown' : 'factorial'}(n):
    ${prog.id.startsWith('count') ? 'print(n)' : 'if n <= 1:'}
    ${prog.id.startsWith('count') ? 'if n > 1:' : '    return 1'}
    ${prog.id.startsWith('count') ? '    countdown(n - 1)' : 'return n * factorial(n - 1)'}

${prog.label}`}</pre>
          <p className="text-xs text-amber-300 mt-3 min-h-10">{narration}</p>
        </div>

        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-3">
          <p className="text-[10px] uppercase tracking-wider text-slate-400 mb-2">Call stack (top of stack = last called)</p>
          <div className="space-y-1 min-h-40">
            {[...frames].reverse().map((f, i) => (
              <div key={i} className={`p-2 rounded-lg border font-mono text-xs transition-all duration-300 ${i === 0 ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200' : 'bg-slate-950 border-slate-700 text-slate-300'}`}>
                {f.fn}({f.n ?? ''})  local n = {f.n ?? '--'}{f.ret !== undefined ? `  got ${f.ret} back` : '  ...waiting'}
              </div>
            ))}
            {frames.length === 0 && (
              <div className="p-2 rounded-lg border border-dashed border-slate-700 text-slate-500 font-mono text-xs">
                stack empty -- {done.length > 0 ? 'all calls finished' : 'nothing called yet'}
              </div>
            )}
          </div>
          {done.length > 0 && (
            <p className="text-[11px] text-slate-400 mt-2 font-mono">
              returned already: {done.map((d) => `${d.fn.slice(0, 4)}(${d.n})=${d.ret}`).slice(-4).join(', ')}
            </p>
          )}
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mt-4 mb-3">
        <p>
          <span className="font-bold text-gold-300">Big idea:</span> every function CALL creates a fresh frame holding its OWN local
          variables, and RETURN destroys that frame and hands back one value.
          <span className="font-bold text-amber-300"> Misconception killer:</span> in factorial(4) there are FOUR live variables all
          named n at once -- they are different boxes, and each frame waits for the frame above it to answer.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-gold-950/60 to-slate-900 border border-gold-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Step through factorial(4) and count the deepest stack height. Why does factorial(1000) crash with recursion depth exceeded?</p>
        <p className="mt-1">2. Watch factorial(2) return 2: which frame receives that value, and what expression does it compute next?</p>
      </footer>
    </div>
  );
}

export default C11_ComputerScienceFunctionsCallStackSim;
