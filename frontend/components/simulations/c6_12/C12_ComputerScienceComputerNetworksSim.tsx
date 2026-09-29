'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 12 Computer Science -- Computer Networks
 * ONE concept: topology decides cost and fault-tolerance. Click any node
 * (or the bus backbone) to kill it and watch hops, reachability and cable
 * length recompute from the live graph. react + tailwind only.
 */

type Topo = 'star' | 'ring' | 'mesh' | 'bus';
const M_PER_PX = 0.25; // campus scale: 1 px = 0.25 m
const INF = 99;

const dist = (a: { x: number; y: number }, b: { x: number; y: number }) =>
  Math.hypot(a.x - b.x, a.y - b.y);

export function C12_ComputerScienceComputerNetworksSim() {
  const [topo, setTopo] = useState<Topo>('star');
  const [n, setN] = useState(6);
  const [deadNodes, setDeadNodes] = useState<boolean[]>([]);
  const [deadLinks, setDeadLinks] = useState<Record<string, boolean>>({});

  const positions = useMemo(() => {
    if (topo === 'bus') {
      return Array.from({ length: n }, (_, i) => ({ x: 60 + (340 / (n - 1)) * i, y: 190 }));
    }
    const cx = 230;
    const cy = topo === 'star' ? 150 : 145;
    const r = 102;
    return Array.from({ length: n }, (_, i) => {
      const a = (Math.PI * 2 * i) / (topo === 'star' ? n - 1 : n) - Math.PI / 2;
      return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
    });
  }, [topo, n]);

  const edges = useMemo(() => {
    const out: { a: number; b: number; key: string }[] = [];
    if (topo === 'ring') {
      for (let i = 0; i < n; i++) {
        const a = i;
        const b = (i + 1) % n;
        out.push({ a, b, key: `${Math.min(a, b)}-${Math.max(a, b)}` }); // includes the closing wrap link
      }
    } else {
      for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
          const wanted = topo === 'mesh' || (topo === 'star' && i === 0);
          if (wanted) out.push({ a: i, b: j, key: `${i}-${j}` });
        }
      }
    }
    return out;
  }, [topo, n]);

  const stats = useMemo(() => {
    const alive: number[] = [];
    for (let i = 0; i < n; i++) if (!deadNodes[i]) alive.push(i);
    const adj: boolean[][] = Array.from({ length: n }, () => Array(n).fill(false));
    if (topo === 'bus') {
      if (!deadLinks['bus']) {
        for (const i of alive) for (const j of alive) if (i !== j) adj[i][j] = true;
      }
    } else {
      for (const e of edges) {
        if (!deadLinks[e.key] && !deadNodes[e.a] && !deadNodes[e.b]) {
          adj[e.a][e.b] = true;
          adj[e.b][e.a] = true;
        }
      }
    }
    const d: number[][] = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => (i === j ? 0 : adj[i][j] ? 1 : INF))
    );
    for (let k = 0; k < n; k++)
      for (let i = 0; i < n; i++)
        for (let j = 0; j < n; j++) d[i][j] = Math.min(d[i][j], d[i][k] + d[k][j]);

    const hops: number[] = [];
    for (let x = 0; x < alive.length; x++)
      for (let y = x + 1; y < alive.length; y++)
        if (d[alive[x]][alive[y]] < INF) hops.push(d[alive[x]][alive[y]]);
    const totalPairs = (alive.length * (alive.length - 1)) / 2;

    const cablePx =
      topo === 'bus'
        ? (deadLinks['bus'] ? 0 : 340) + 90 * alive.length
        : edges
            .filter((e) => !deadLinks[e.key] && !deadNodes[e.a] && !deadNodes[e.b])
            .reduce((s, e) => s + dist(positions[e.a], positions[e.b]), 0);

    // single points of failure: remove one alive node, are the rest still one component?
    const spofs: string[] = [];
    for (const v of alive) {
      const rest = alive.filter((x) => x !== v);
      if (rest.length < 2) continue;
      const seen = new Set<number>([rest[0]]);
      const q = [rest[0]];
      while (q.length) {
        const cur = q.pop() as number;
        for (const nxt of rest)
          if (!seen.has(nxt) && adj[cur][nxt] && cur !== v && nxt !== v) {
            seen.add(nxt);
            q.push(nxt);
          }
      }
      if (seen.size < rest.length) spofs.push(topo === 'star' && v === 0 ? 'hub' : `node ${v + 1}`);
    }
    if (topo === 'bus' && !deadLinks['bus'] && alive.length >= 2) spofs.push('backbone');

    return {
      aliveCount: alive.length,
      totalPairs,
      okPairs: hops.length,
      avgHops: hops.length ? hops.reduce((s, h) => s + h, 0) / hops.length : 0,
      worstHops: hops.length ? Math.max(...hops) : 0,
      cableM: (cablePx * M_PER_PX) / 1,
      spofs,
    };
  }, [topo, n, deadNodes, deadLinks, edges, positions]);

  const changeTopo = (t: Topo) => {
    setTopo(t);
    setDeadNodes([]);
    setDeadLinks({});
  };
  const changeN = (v: number) => {
    setN(v);
    setDeadNodes([]);
    setDeadLinks({});
  };
  const kill = (i: number) =>
    setDeadNodes((arr) => Array.from({ length: n }, (_, k) => (k === i ? !arr[k] : arr[k])));

  const fact =
    topo === 'star'
      ? `${n - 1} cables; every frame must pass the hub`
      : topo === 'ring'
      ? `${n} cables; data circles node to node`
      : topo === 'mesh'
      ? `${(n * (n - 1)) / 2} cables; every pair talks directly`
      : `1 backbone + ${n} taps; the whole LAN shares one cable`;

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">🕸️</span>
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 12 Computer Science -- Computer Networks</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Topologies: Pay in Cable, Win in Survival</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
          <svg viewBox="0 0 460 300" className="w-full">
            <rect x={0} y={0} width={460} height={300} rx={10} fill="#0b1220" />
            {topo === 'bus' && (
              <g onClick={() => setDeadLinks((l) => ({ ...l, bus: !l.bus }))} className="cursor-pointer">
                <rect x={52} y={82} width={356} height={16} fill="transparent" />
                <line x1={60} y1={90} x2={400} y2={90} stroke={deadLinks['bus'] ? '#7f1d1d' : '#38bdf8'}
                  strokeWidth={6} strokeDasharray={deadLinks['bus'] ? '8 6' : undefined} />
                <text x={230} y={76} fontSize={10} fill="#94a3b8" textAnchor="middle">
                  {deadLinks['bus'] ? 'backbone CUT -- click to repair' : 'backbone (click to cut)'}
                </text>
              </g>
            )}
            {topo !== 'bus' &&
              edges.map((e) => {
                const alive = !deadLinks[e.key] && !deadNodes[e.a] && !deadNodes[e.b];
                return (
                  <line key={e.key} x1={positions[e.a].x} y1={positions[e.a].y}
                    x2={positions[e.b].x} y2={positions[e.b].y}
                    stroke={alive ? '#475569' : '#1e293b'} strokeWidth={2}
                    strokeDasharray={alive ? undefined : '4 5'} />
                );
              })}
            {topo === 'bus' &&
              positions.map((p, i) => (
                <line key={`drop${i}`} x1={p.x} y1={90} x2={p.x} y2={p.y - 14}
                  stroke={deadLinks['bus'] || deadNodes[i] ? '#1e293b' : '#475569'} strokeWidth={2} />
              ))}
            {positions.map((p, i) => (
              <g key={i} onClick={() => kill(i)} className="cursor-pointer">
                <circle cx={p.x} cy={p.y} r={14}
                  fill={deadNodes[i] ? '#334155' : topo === 'star' && i === 0 ? '#a78bfa' : '#38bdf8'}
                  stroke={deadNodes[i] ? '#7f1d1d' : '#0ea5e9'} strokeWidth={2}
                  className="transition-all duration-300" />
                {deadNodes[i] && (
                  <text x={p.x} y={p.y + 4} fontSize={13} fill="#f87171" textAnchor="middle" fontWeight="bold">x</text>
                )}
                <text x={p.x} y={p.y - 20} fontSize={9} fill="#94a3b8" textAnchor="middle">
                  {topo === 'star' && i === 0 ? 'hub' : `PC ${i + 1}`}
                </text>
              </g>
            ))}
          </svg>
          <p className="text-xs text-slate-400 mt-1 bg-slate-950 rounded-xl border border-slate-800 p-2">
            {fact} -- click any node to switch it off, click again to restore.
          </p>
        </div>

        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
            <div className="grid grid-cols-4 gap-2">
              {(['star', 'ring', 'mesh', 'bus'] as Topo[]).map((t) => (
                <button key={t} onClick={() => changeTopo(t)}
                  className={`min-h-11 rounded-xl text-[10px] font-bold capitalize ${topo === t ? 'bg-gold-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700'}`}>
                  {t}
                </button>
              ))}
            </div>
            <div>
              <div className="flex justify-between text-[11px] text-slate-400">
                <span>Computers on the LAN</span>
                <span className="font-mono font-bold text-gold-400">{n} nodes</span>
              </div>
              <input type="range" min={4} max={8} step={1} value={n} aria-label="node count"
                onChange={(e) => changeN(Number(e.target.value))} className="w-full min-h-11 accent-gold-500" />
            </div>
            <button onClick={() => { setDeadNodes([]); setDeadLinks({}); }}
              className="min-h-11 w-full rounded-xl text-xs font-bold bg-slate-700 hover:bg-slate-600">Reset (heal all nodes)</button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center text-xs">
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Cable in use</p>
              <p className="font-mono font-bold text-amber-300">{stats.cableM.toFixed(1)} m</p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Reachable pairs</p>
              <p className="font-mono font-bold text-gold-300">
                {stats.okPairs}/{stats.totalPairs} ({stats.totalPairs ? Math.round((stats.okPairs / stats.totalPairs) * 100) : 0}%)
              </p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Avg / worst hops</p>
              <p className="font-mono font-bold text-slate-200">
                {stats.okPairs ? `${stats.avgHops.toFixed(1)} / ${stats.worstHops}` : '-- / --'}
              </p>
            </div>
            <div className="bg-slate-900/60 rounded-xl p-2 border border-slate-800">
              <p className="text-[10px] text-slate-500">Single points of failure</p>
              <p className={`font-mono font-bold ${stats.spofs.length ? 'text-rose-400' : 'text-emerald-400'}`}>
                {stats.spofs.length ? stats.spofs.join(', ') : 'none'}
              </p>
            </div>
          </div>

          <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
            <p className="font-bold text-slate-300 mb-1">Misconception killer</p>
            <p>
              &quot;One dead node always kills the network.&quot; No -- the weakness lives in the SHAPE, not the count.
              In a ring the survivors stay connected as a line; in a star only the HUB is fatal; in a mesh nothing
              short of several failures disconnects anyone.
            </p>
          </div>

          <div className="bg-amber-950/40 rounded-2xl border border-amber-800/50 p-4 text-xs">
            <p className="font-bold text-amber-300 mb-1">What to try</p>
            <p>1. Kill the hub in an 8-node star, then kill any single node in an 8-node mesh: compare the reachable-pairs stat. Which topology survives, and at what cable cost?</p>
            <p>2. At 6 nodes count the cables: mesh needs n(n-1)/2 = 15 links while star needs 5. Is mesh fault-tolerance worth triple the cable for a school lab?</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default C12_ComputerScienceComputerNetworksSim;
