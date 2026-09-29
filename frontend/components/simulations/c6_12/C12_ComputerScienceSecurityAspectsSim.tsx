'use client';

import React, { useEffect, useRef, useState } from 'react';

/**
 * Class 12 Computer Science -- Security Aspects
 * ONE concept: malware classes are defined by HOW they move. A worm
 * replicates by itself, a virus moves only when a human shares or opens
 * an infected file, a trojan never replicates at all -- and an antivirus
 * catches only what its signature database knows. react + tailwind only.
 */

// ─── Knowledge-graph node wiring ───
const NODE_C12_CS_042 = 'c12_cs_042'; // Network threats and defenses - firewalls, IDS, malware, phishing
export const ALL_NODE_IDS = [NODE_C12_CS_042];

type Mal = 'worm' | 'virus' | 'trojan';
type St = 'clean' | 'infected' | 'quarantined';

const N = 24; // 6 x 4 office LAN
const COLS = 6;
const FILL: Record<St, string> = { clean: '#334155', infected: '#f43f5e', quarantined: '#10b981' };

export function C12_ComputerScienceSecurityAspectsSim() {
  const [mal, setMal] = useState<Mal>('worm');
  const [nodes, setNodes] = useState<St[]>(() => Array(N).fill('clean') as St[]);
  const [avOn, setAvOn] = useState(true);
  const [coverage, setCoverage] = useState(70);
  const [activity, setActivity] = useState(5);
  const [running, setRunning] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [stolen, setStolen] = useState(0);
  const [toast, setToast] = useState('Pick a malware class, then release it into the office LAN.');
  const raf = useRef(0);
  const nodesRef = useRef<St[]>(nodes);

  const infected = nodes.filter((s) => s === 'infected').length;
  const quarantined = nodes.filter((s) => s === 'quarantined').length;
  const clean = N - infected - quarantined;
  const blocked = () => avOn && Math.random() < (coverage / 100) * 0.9;

  const applyNodes = (next: St[]) => {
    nodesRef.current = next;
    setNodes(next);
  };

  useEffect(() => {
    if (!running) return;
    let acc = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      acc += dt;
      if (acc >= 0.7) {
        acc = 0;
        setSeconds((s) => s + 1);
        const cur = nodesRef.current;
        const next = [...cur];
        const of = (st: St) => next.map((v, i) => (v === st ? i : -1)).filter((i) => i >= 0);
        if (mal === 'worm') {
          of('infected').forEach(() => {
            const tgt = Math.floor(Math.random() * N);
            if (next[tgt] === 'clean' && !blocked()) next[tgt] = 'infected';
          });
          setToast(`Worm tick: ${infected} machine(s) each tried to copy itself. No human needed.`);
        } else if (mal === 'virus') {
          const src = of('infected');
          const dst = of('clean');
          if (src.length > 0 && dst.length > 0 && Math.random() < (activity / 10) * 0.95) {
            const t2 = dst[Math.floor(Math.random() * dst.length)];
            if (blocked()) setToast('Antivirus recognised the infected file signature -- copy blocked.');
            else next[t2] = 'infected';
          } else {
            setToast(`Virus waits: it only moves when a file is shared (now ${activity} opens/h).`);
          }
        } else {
          setStolen((v) => v + 0.4 + Math.random() * 0.6);
          setToast('Trojan does not replicate -- it quietly siphons data from its one host.');
        }
        applyNodes(next);
      }
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [running, mal, activity, coverage, avOn, infected]);

  const release = () => {
    const cur = nodesRef.current;
    const dst = cur.map((v, i) => (v === 'clean' ? i : -1)).filter((i) => i >= 0);
    if (dst.length === 0) {
      setToast('No clean machines left to infect.');
      return;
    }
    const next = [...cur];
    const tgt = dst[Math.floor(Math.random() * dst.length)];
    if (blocked()) {
      next[tgt] = 'quarantined';
      setToast('Signature DB knew this sample -- installer quarantined on arrival.');
    } else {
      next[tgt] = 'infected';
      setStolen(0);
      setSeconds(0);
      setToast(
        mal === 'worm'
          ? 'Worm is loose: it will copy itself with NO user action.'
          : mal === 'virus'
          ? 'Virus landed in one machine: it moves only when files are shared.'
          : 'Trojan installed: it will NEVER replicate -- only siphon this host.'
      );
      setRunning(true);
    }
    applyNodes(next);
  };

  const scan = () => {
    if (!avOn) {
      setToast('Antivirus is OFF -- there is nothing to scan with.');
      return;
    }
    let caught = 0;
    const next = nodesRef.current.map((s) => {
      if (s === 'infected' && Math.random() < coverage / 100) {
        caught += 1;
        return 'quarantined' as St;
      }
      return s;
    });
    applyNodes(next);
    setToast(caught > 0 ? `Full scan: ${caught} infected machine(s) quarantined.` : 'Full scan: signatures matched nothing still infected.');
  };

  const freshOutbreak = (m: Mal) => {
    setMal(m);
    applyNodes(Array(N).fill('clean') as St[]);
    setRunning(false);
    setSeconds(0);
    setStolen(0);
    setToast(m === 'worm' ? 'Worm selected: self-propagating.' : m === 'virus' ? 'Virus selected: rides on human file-sharing.' : 'Trojan selected: one install, no replication.');
  };

  const reset = () => {
    freshOutbreak(mal);
    setAvOn(true);
    setCoverage(70);
    setActivity(5);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700">🛡️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 12 Computer Science -- Security Aspects</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Worm vs Virus vs Trojan: Who Moves Without You?</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3 space-y-3">
          <svg viewBox="0 0 330 230" className="w-full">
            <rect x={0} y={0} width={330} height={230} rx={10} fill="#0b1220" />
            <text x={12} y={18} fontSize={10} fill="#64748b">office LAN -- each box is one PC</text>
            {Array.from({ length: N }, (_, i) => {
              const x = 24 + (i % COLS) * 52;
              const y = 32 + Math.floor(i / COLS) * 48;
              const st = nodes[i];
              return (
                <g key={i}>
                  <rect x={x} y={y} width={40} height={30} rx={5}
                    fill={FILL[st]} stroke={st === 'infected' ? '#fda4af' : '#0f172a'} strokeWidth={2}
                    className="transition-all duration-300" />
                  {st === 'infected' && <rect x={x} y={y} width={40} height={30} rx={5} fill="none" stroke="#f43f5e" className="animate-pulse" strokeWidth={3} />}
                  {st === 'quarantined' && <text x={x + 20} y={y + 21} fontSize={14} textAnchor="middle" fill="#052e16">🔒</text>}
                  <text x={x + 20} y={y + 20} fontSize={9} textAnchor="middle" fill={st === 'quarantined' ? '#052e16' : '#cbd5e1'}>{i + 1}</text>
                </g>
              );
            })}
            <text x={24} y={222} fontSize={9} fill="#94a3b8">slate = clean · rose = infected · green 🔒 = quarantined by antivirus</text>
          </svg>

          <div className={`rounded-xl border p-2 text-xs leading-relaxed transition-colors duration-300 ${toast.includes('blocked') || toast.includes('quarantined') || toast.includes('OFF') ? 'bg-emerald-950/60 border-emerald-700 text-emerald-300' : toast.includes('loose') || toast.includes('landed') || toast.includes('installed') ? 'bg-rose-950/60 border-rose-700 text-rose-300' : 'bg-slate-900/70 border-slate-700 text-slate-300'}`}>
            {toast}
          </div>

          <div className="grid grid-cols-4 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Clean</p>
              <p className="font-mono font-bold text-slate-200">{clean} PC</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Infected</p>
              <p className="font-mono font-bold text-rose-300">{infected} PC</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Compromised</p>
              <p className="font-mono font-bold text-amber-300">{Math.round(((infected + quarantined) / N) * 100)} %</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Data siphoned</p>
              <p className="font-mono font-bold text-gold-300">{stolen.toFixed(1)} MB</p>
            </div>
          </div>
          <p className="text-[10px] text-slate-500 text-center">outbreak clock {mm}:{ss} · signature coverage {coverage} %</p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div>
              <p className="text-[11px] text-slate-400 mb-1">Malware class</p>
              <div className="grid grid-cols-3 gap-2">
                {(['worm', 'virus', 'trojan'] as Mal[]).map((m) => (
                  <button key={m} onClick={() => freshOutbreak(m)}
                    className={`min-h-11 rounded-xl text-[10px] font-bold capitalize ${mal === m ? 'bg-rose-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>File-sharing activity</span>
                <span className="font-mono font-bold text-gold-400">{activity} opens/h</span>
              </div>
              <input type="range" min={0} max={10} step={1} value={activity} aria-label="file sharing activity"
                onChange={(e) => setActivity(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Signature DB coverage</span>
                <span className="font-mono font-bold text-emerald-400">{coverage} %</span>
              </div>
              <input type="range" min={30} max={100} step={5} value={coverage} aria-label="antivirus signature coverage"
                onChange={(e) => setCoverage(Number(e.target.value))} className="w-full min-h-11 accent-emerald-500" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={() => setAvOn((v) => !v)}
                className={`min-h-11 rounded-xl text-[10px] font-bold ${avOn ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'}`}>
                Antivirus: {avOn ? 'ON' : 'OFF'}
              </button>
              <button onClick={() => setRunning((v) => !v)} className="min-h-11 rounded-xl text-xs font-bold bg-amber-500 text-slate-950">
                {running ? 'Pause' : 'Run'}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={release} className="min-h-11 rounded-xl text-xs font-bold bg-rose-500 text-slate-950">Release malware</button>
              <button onClick={scan} className="min-h-11 rounded-xl text-xs font-bold bg-gold-500 text-slate-950">Full scan</button>
            </div>
            <button onClick={reset} className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset</button>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;Malware spreads by itself.&quot; Only a WORM does. A virus is a parasite: without a human sharing or opening an
              infected file it goes nowhere. A trojan cannot copy itself at all -- it needs YOUR install click. And antivirus is not
              magic: at 40 % coverage (a zero-day outbreak) most copies sail straight past the scan.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Pick Virus and drag file-sharing to 0 opens/h: the outbreak freezes. Now pick Worm with the same setting -- why does it keep eating PCs?</p>
            <p>2. Release the Trojan with antivirus ON at 40 % coverage and scan every few seconds. Repeat at 95 %. Which coverage actually saves the data, and what does that tell you about zero-days?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_ComputerScienceSecurityAspectsSim;
