'use client';

import React, { useEffect, useRef, useState } from 'react';

// ─── PACKET SWITCHING: a file is chopped into packets; each hops client -> router -> ISP -> backbone -> server ───
const PATH = [
  { x: 45, y: 125, label: 'Client' },
  { x: 150, y: 55, label: 'Router' },
  { x: 255, y: 125, label: 'ISP' },
  { x: 360, y: 55, label: 'Backbone' },
  { x: 435, y: 125, label: 'Server' },
];
const PKT_KB = 64; // fixed packet payload
const HOPS = PATH.length - 1;

type Pkt = { id: number; t0: number; lost: boolean; lostAt: number };

export function C12_ComputerSciencePacketJourneySim() {
  const [fileMB, setFileMB] = useState(2);
  const [latencyMs, setLatencyMs] = useState(30);
  const [lossPct, setLossPct] = useState(0);
  const [pkts, setPkts] = useState<Pkt[]>([]);
  const [now, setNow] = useState(0);
  const [flying, setFlying] = useState(false);
  const rafRef = useRef<number>(0);

  const fileKB = Math.round(fileMB * 1024);
  const packetCount = Math.ceil(fileKB / PKT_KB);
  const perPacketMs = HOPS * latencyMs + 400; // hop queueing + wire travel
  const expectedMs = (packetCount - 1) * 120 + perPacketMs; // staggered 120 ms apart

  const send = () => {
    const t = performance.now();
    const list: Pkt[] = Array.from({ length: packetCount }, (_, i) => ({
      id: i,
      t0: t + i * 120,
      lost: Math.random() < lossPct / 100,
      lostAt: 0.25 + Math.random() * 0.55,
    }));
    setPkts(list);
    setNow(t);
    setFlying(true);
  };

  useEffect(() => {
    if (!flying) return;
    const tick = () => {
      const t = performance.now();
      setNow(t);
      const allDone = pkts.length > 0 && pkts.every((p) => t > p.t0 + perPacketMs);
      if (allDone) {
        setFlying(false);
        return;
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [flying, pkts, perPacketMs]);

  const pointAt = (progress: number) => {
    const seg = Math.min(HOPS - 1, Math.floor(progress * HOPS));
    const f = progress * HOPS - seg;
    const a = PATH[seg];
    const b = PATH[seg + 1];
    return { x: a.x + (b.x - a.x) * f, y: a.y + (b.y - a.y) * f };
  };

  const delivered = pkts.filter((p) => !p.lost && now > p.t0 + perPacketMs).length;
  const lostCount = pkts.filter((p) => p.lost && now > p.t0 + p.lostAt * perPacketMs).length;

  const reset = () => {
    setFileMB(2);
    setLatencyMs(30);
    setLossPct(0);
    setPkts([]);
    setFlying(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <header className="flex flex-wrap items-center justify-between gap-3 pb-3 mb-4 border-b border-slate-800">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-sky-400">CBSE Class 12 Computer Science - Computer Networks</p>
          <h1 className="text-lg md:text-xl font-extrabold text-white">Packet Journey: how your file crosses the internet</h1>
        </div>
        <span className="px-3 py-1 text-xs font-bold rounded-full bg-sky-950 border border-sky-700 text-sky-300">Network Lab</span>
      </header>

      {/* CONTROLS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>File to send</span>
            <span className="text-indigo-300 font-mono font-bold">{fileMB.toFixed(1)} MB = {packetCount} packets</span>
          </label>
          <input type="range" min={0.5} max={6} step={0.5} value={fileMB} aria-label="file size in megabytes"
            onChange={(e) => setFileMB(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-indigo-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Latency per hop</span>
            <span className="text-amber-300 font-mono font-bold">{latencyMs} ms</span>
          </label>
          <input type="range" min={5} max={100} step={5} value={latencyMs} aria-label="latency per hop in milliseconds"
            onChange={(e) => setLatencyMs(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-amber-500" />
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
          <label className="text-xs text-slate-400 flex justify-between">
            <span>Packet loss chance</span>
            <span className="text-rose-300 font-mono font-bold">{lossPct} %</span>
          </label>
          <input type="range" min={0} max={40} step={5} value={lossPct} aria-label="packet loss percentage"
            onChange={(e) => setLossPct(Number(e.target.value))} className="w-full mt-2 min-h-11 accent-rose-500" />
        </div>
      </div>
      <div className="flex gap-2 mb-4">
        <button onClick={send} disabled={flying} className={`flex-1 min-h-11 px-4 rounded-2xl text-sm font-bold border ${flying ? 'bg-slate-900 border-slate-800 text-slate-600' : 'bg-sky-600 border-sky-500 text-white hover:bg-sky-500'}`}>
          {flying ? 'Transmitting...' : 'Send file'}
        </button>
        <button onClick={reset} className="min-h-11 px-4 rounded-2xl text-sm font-bold bg-slate-900 border border-slate-700 text-slate-300 hover:bg-slate-800">Reset</button>
      </div>

      {/* NETWORK MAP */}
      <div className="bg-slate-900 rounded-2xl border border-slate-800 p-2 mb-4">
        <svg viewBox="0 0 470 175" className="w-full h-52 md:h-56" preserveAspectRatio="xMidYMid meet">
          <polyline points={PATH.map((p) => `${p.x} ${p.y}`).join(' ')} fill="none" stroke="#334155" strokeWidth="4" strokeDasharray="7 5" />
          {PATH.map((p, i) => (
            <g key={i}>
              <circle cx={p.x} cy={p.y} r="13" fill="#1e293b" stroke="#38bdf8" strokeWidth="2" />
              <text x={p.x} y={p.y + 4} fill="#7dd3fc" fontSize="9" textAnchor="middle" fontWeight="bold">{i + 1}</text>
              <text x={p.x} y={p.y + 30} fill="#94a3b8" fontSize="10" textAnchor="middle">{p.label}</text>
            </g>
          ))}
          {pkts.map((p) => {
            const raw = (now - p.t0) / perPacketMs;
            if (raw <= 0 || raw >= 1) return null;
            if (p.lost && raw >= p.lostAt) {
              const pos = pointAt(p.lostAt);
              return <text key={p.id} x={pos.x} y={pos.y - 8} fill="#f43f5e" fontSize="13" textAnchor="middle">x</text>;
            }
            const pos = pointAt(raw);
            return <rect key={p.id} x={pos.x - 6} y={pos.y - 5} width="12" height="10" rx="2" fill="#fbbf24" stroke="#92400e" />;
          })}
        </svg>
      </div>

      {/* LIVE COUNTS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Packets dispatched</p>
          <p className="text-lg font-extrabold text-indigo-300 font-mono">{pkts.length}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-emerald-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Delivered</p>
          <p className="text-lg font-extrabold text-emerald-300 font-mono">{delivered}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-rose-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Lost in transit</p>
          <p className="text-lg font-extrabold text-rose-300 font-mono">{lostCount}</p>
        </div>
        <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800 text-center">
          <p className="text-[10px] uppercase tracking-wider text-slate-400">Expected time</p>
          <p className="text-lg font-extrabold text-amber-300 font-mono">{(expectedMs / 1000).toFixed(2)} s</p>
        </div>
      </div>

      <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs text-slate-300 leading-relaxed mb-3">
        <p>
          <span className="font-bold text-sky-300">Big idea:</span> the internet does not send your file whole -- it chops it into
          fixed-size packets that travel independently and are reassembled at the server. Lost packets are re-requested automatically (that is TCP).
          <span className="font-bold text-amber-300"> Misconception killer:</span> latency (distance, hops) and bandwidth (packets per second) are different
          limits -- a small latency slider change barely moves a big file&apos;s time, but packet size does.
        </p>
      </div>

      <footer className="p-4 rounded-2xl bg-gradient-to-r from-sky-950/60 to-slate-900 border border-sky-900/60 text-xs text-slate-200 leading-relaxed">
        <p className="font-bold text-emerald-300 uppercase tracking-wide text-[11px] mb-1">What to try</p>
        <p>1. Send a 6 MB file at 5 ms latency, then at 100 ms latency. Compare expected times -- is doubling latency the same as doubling file size?</p>
        <p className="mt-1">2. Set loss to 20% and send twice. Why does the delivered count differ each run, and what must the server do about the missing packets?</p>
      </footer>
    </div>
  );
}

export default C12_ComputerSciencePacketJourneySim;
