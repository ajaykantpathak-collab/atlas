'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PrismLogo } from '@/components/prism/PrismLogo';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  TrendingUp,
  Loader2,
  Atom,
  FlaskConical,
  Leaf,
  Calculator,
  Network,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface GraphNode {
  id: string | number;
  title: string;
  subject?: string;
  x?: number;
  y?: number;
  vx?: number;
  vy?: number;
  fx?: number | null;
  fy?: number | null;
}

interface GraphLink {
  source: string | number | GraphNode;
  target: string | number | GraphNode;
}

interface GraphData {
  nodes: GraphNode[];
  links: GraphLink[];
}

/* ------------------------------------------------------------------ */
/* Constants                                                          */
/* ------------------------------------------------------------------ */

const SUBJECTS: {
  key: string | null;
  label: string;
  color: string;
  icon: typeof Atom;
}[] = [
  { key: null, label: 'All', color: '#64748b', icon: Network },
  { key: 'physics', label: 'Physics', color: '#6366f1', icon: Atom },
  { key: 'chem', label: 'Chemistry', color: '#d946ef', icon: FlaskConical },
  { key: 'bio', label: 'Biology', color: '#10b981', icon: Leaf },
  { key: 'maths', label: 'Maths', color: '#fbbf24', icon: Calculator },
];

const SUBJECT_COLORS: Record<string, string> = {
  physics: '#6366f1',
  chem: '#d946ef',
  bio: '#10b981',
  maths: '#fbbf24',
};

const COLOR_BY_SUBJECT = (subject?: string): string => {
  if (!subject) return '#64748b';
  return SUBJECT_COLORS[subject] ?? '#64748b';
};

const MAX_ITERATIONS = 300;
const REPULSION = 6000;
const SPRING_LENGTH = 120;
const SPRING_STRENGTH = 0.04;
const CENTERING = 0.012;
const DAMPING = 0.82;

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

export default function KnowledgeGraphExplorerPage() {
  const [classLevel, setClassLevel] = useState<number>(10);
  const [activeSubject, setActiveSubject] = useState<string | null>(null);
  const [graphData, setGraphData] = useState<GraphData>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(true);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [draggingNode, setDraggingNode] = useState<GraphNode | null>(null);

  const router = useRouter();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const iterationRef = useRef<number>(0);
  const nodesRef = useRef<GraphNode[]>([]);
  const linksRef = useRef<GraphLink[]>([]);
  const dimensionsRef = useRef<{ width: number; height: number }>({
    width: 800,
    height: 600,
  });
  const dragOffsetRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const dragMovedRef = useRef<boolean>(false);

  /* -------------------------------------------------------------- */
  /* Fetch graph data                                               */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8001';
    let url = `${apiUrl}/api/content/enrichment-graph?class_level=${classLevel}&limit=200`;
    if (activeSubject) {
      url += `&subject=${activeSubject}`;
    }

    let cancelled = false;
    setLoading(true);

    fetch(url)
      .then((res) => res.json())
      .then((data: GraphData) => {
        if (cancelled) return;
        const nodes = (data.nodes ?? []).map((n) => ({ ...n }));
        const links = (data.links ?? []).map((l) => ({ ...l }));
        setGraphData({ nodes, links });
      })
      .catch(() => {
        if (cancelled) return;
        setGraphData({ nodes: [], links: [] });
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [classLevel, activeSubject]);

  /* -------------------------------------------------------------- */
  /* Initialize simulation when data changes                        */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    dimensionsRef.current = { width, height };

    const cx = width / 2;
    const cy = height / 2;

    const nodes = graphData.nodes.map((n) => ({
      ...n,
      x: cx + (Math.random() - 0.5) * 300,
      y: cy + (Math.random() - 0.5) * 300,
      vx: 0,
      vy: 0,
      fx: null,
      fy: null,
    }));

    // Resolve link source/target to node references
    const nodeMap = new Map<string | number, GraphNode>();
    nodes.forEach((n) => nodeMap.set(n.id, n));
    const links = graphData.links
      .map((l) => ({
        source:
          typeof l.source === 'object' && l.source !== null
            ? (l.source as GraphNode)
            : nodeMap.get(l.source as string | number),
        target:
          typeof l.target === 'object' && l.target !== null
            ? (l.target as GraphNode)
            : nodeMap.get(l.target as string | number),
      }))
      .filter((l) => l.source && l.target) as GraphLink[];

    nodesRef.current = nodes;
    linksRef.current = links;
    iterationRef.current = 0;

    // Start animation loop
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const tick = () => {
      const dims = dimensionsRef.current;
      const ns = nodesRef.current;
      const ls = linksRef.current;
      const iter = iterationRef.current;

      if (iter >= MAX_ITERATIONS) {
        rafRef.current = null;
        return;
      }

      // Repulsive forces (Coulomb simplified)
      for (let i = 0; i < ns.length; i++) {
        const a = ns[i];
        for (let j = i + 1; j < ns.length; j++) {
          const b = ns[j];
          let dx = (a.x ?? 0) - (b.x ?? 0);
          let dy = (a.y ?? 0) - (b.y ?? 0);
          let distSq = dx * dx + dy * dy;
          if (distSq < 1) {
            distSq = 1;
            dx = Math.random() - 0.5;
            dy = Math.random() - 0.5;
          }
          const dist = Math.sqrt(distSq);
          const force = REPULSION / distSq;
          const fx = (dx / dist) * force;
          const fy = (dy / dist) * force;
          a.vx = (a.vx ?? 0) + fx;
          a.vy = (a.vy ?? 0) + fy;
          b.vx = (b.vx ?? 0) - fx;
          b.vy = (b.vy ?? 0) - fy;
        }
      }

      // Attractive forces along links (spring)
      for (const l of ls) {
        const s = l.source as GraphNode;
        const t = l.target as GraphNode;
        const dx = (t.x ?? 0) - (s.x ?? 0);
        const dy = (t.y ?? 0) - (s.y ?? 0);
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const force = (dist - SPRING_LENGTH) * SPRING_STRENGTH;
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        s.vx = (s.vx ?? 0) + fx;
        s.vy = (s.vy ?? 0) + fy;
        t.vx = (t.vx ?? 0) - fx;
        t.vy = (t.vy ?? 0) - fy;
      }

      // Centering + damping + position update
      const cxForce = dims.width / 2;
      const cyForce = dims.height / 2;
      let maxVelocity = 0;
      for (const n of ns) {
        if (n.fx !== null && n.fx !== undefined) {
          n.x = n.fx;
          n.vx = 0;
        } else {
          n.vx = ((n.vx ?? 0) + (cxForce - (n.x ?? 0)) * CENTERING) * DAMPING;
          n.x = (n.x ?? 0) + (n.vx ?? 0);
        }
        if (n.fy !== null && n.fy !== undefined) {
          n.y = n.fy;
          n.vy = 0;
        } else {
          n.vy = ((n.vy ?? 0) + (cyForce - (n.y ?? 0)) * CENTERING) * DAMPING;
          n.y = (n.y ?? 0) + (n.vy ?? 0);
        }
        const v = Math.abs(n.vx ?? 0) + Math.abs(n.vy ?? 0);
        if (v > maxVelocity) maxVelocity = v;
      }

      iterationRef.current = iter + 1;

      // Stop early if stable
      if (maxVelocity < 0.05 && iter > 50) {
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [graphData]);

  /* -------------------------------------------------------------- */
  /* Resize observer                                                */
  /* -------------------------------------------------------------- */

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const observer = new ResizeObserver(() => {
      dimensionsRef.current = {
        width: container.clientWidth || 800,
        height: container.clientHeight || 600,
      };
    });
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  /* -------------------------------------------------------------- */
  /* Drag handlers                                                  */
  /* -------------------------------------------------------------- */

  const getPointerPosition = useCallback((e: React.MouseEvent | MouseEvent) => {
    const svg = svgRef.current;
    if (!svg) return { x: 0, y: 0 };
    const rect = svg.getBoundingClientRect();
    const clientX = 'clientX' in e ? e.clientX : 0;
    const clientY = 'clientY' in e ? e.clientY : 0;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  }, []);

  const handleNodeMouseDown = useCallback(
    (e: React.MouseEvent, node: GraphNode) => {
      e.stopPropagation();
      const pos = getPointerPosition(e);
      dragOffsetRef.current = {
        x: pos.x - (node.x ?? 0),
        y: pos.y - (node.y ?? 0),
      };
      dragMovedRef.current = false;
      node.fx = node.x;
      node.fy = node.y;
      setDraggingNode(node);
    },
    [getPointerPosition]
  );

  const handleNodeClick = useCallback(
    (node: GraphNode) => {
      if (dragMovedRef.current) return;
      router.push(`/learn/${node.id}`);
    },
    [router]
  );

  useEffect(() => {
    if (!draggingNode) return;

    const handleMouseMove = (e: MouseEvent) => {
      const pos = getPointerPosition(e);
      dragMovedRef.current = true;
      draggingNode.fx = pos.x - dragOffsetRef.current.x;
      draggingNode.fy = pos.y - dragOffsetRef.current.y;
      draggingNode.x = draggingNode.fx;
      draggingNode.y = draggingNode.fy;
      // Re-heat simulation
      if (!rafRef.current && iterationRef.current >= MAX_ITERATIONS) {
        iterationRef.current = MAX_ITERATIONS - 60;
        const tick = () => {
          /* placeholder - the main loop handles it */
        };
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    const handleMouseUp = () => {
      if (draggingNode) {
        draggingNode.fx = null;
        draggingNode.fy = null;
      }
      setDraggingNode(null);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [draggingNode, getPointerPosition]);

  /* -------------------------------------------------------------- */
  /* Hover highlight helpers                                        */
  /* -------------------------------------------------------------- */

  const connectedIds = useMemo(() => {
    if (!hoveredNode) return null;
    const ids = new Set<string | number>([hoveredNode.id]);
    for (const l of linksRef.current) {
      const s = l.source as GraphNode;
      const t = l.target as GraphNode;
      if (s.id === hoveredNode.id) ids.add(t.id);
      if (t.id === hoveredNode.id) ids.add(s.id);
    }
    return ids;
  }, [hoveredNode]);

  const isLinkHighlighted = useCallback(
    (link: GraphLink) => {
      if (!hoveredNode || !connectedIds) return false;
      const s = link.source as GraphNode;
      const t = link.target as GraphNode;
      return s.id === hoveredNode.id || t.id === hoveredNode.id;
    },
    [hoveredNode, connectedIds]
  );

  const isNodeHighlighted = useCallback(
    (node: GraphNode) => {
      if (!hoveredNode) return false;
      if (node.id === hoveredNode.id) return true;
      return connectedIds?.has(node.id) ?? false;
    },
    [hoveredNode, connectedIds]
  );

  /* -------------------------------------------------------------- */
  /* Render                                                          */
  /* -------------------------------------------------------------- */

  const dims = dimensionsRef.current;

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* Animated mesh background */}
      <div className="mesh-bg-animated absolute inset-0 -z-10" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <PrismLogo size={32} />
          <Link
            href="/dashboard"
            className="glass-card flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
        </div>

        <div className="glass-card flex items-center gap-2 rounded-xl px-3 py-2">
          <label className="text-xs font-medium text-white/60">Class</label>
          <select
            value={classLevel}
            onChange={(e) => setClassLevel(Number(e.target.value))}
            className="bg-transparent text-sm font-semibold text-white outline-none [&>option]:bg-slate-900"
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((lvl) => (
              <option key={lvl} value={lvl}>
                {lvl}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Title + controls */}
      <div className="relative z-10 px-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="glass-card flex h-11 w-11 items-center justify-center rounded-xl">
              <TrendingUp className="h-5 w-5 text-brand-400" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Knowledge Graph</h1>
              <p className="text-sm text-white/50">
                {graphData.nodes.length} nodes · {graphData.links.length} links
              </p>
            </div>
          </div>

          {/* Subject filter buttons */}
          <div className="glass-card flex flex-wrap items-center gap-1.5 rounded-xl p-1.5">
            {SUBJECTS.map((subj) => {
              const Icon = subj.icon;
              const isActive = activeSubject === subj.key;
              return (
                <button
                  key={subj.label}
                  onClick={() => setActiveSubject(subj.key)}
                  className={`flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-white'
                      : 'text-white/50 hover:text-white/80'
                  }`}
                  style={
                    isActive
                      ? { backgroundColor: subj.color + '33', color: subj.color }
                      : undefined
                  }
                >
                  <Icon className="h-3.5 w-3.5" />
                  {subj.label}
                </button>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Graph container */}
      <div
        ref={containerRef}
        className="relative z-10 mt-4 w-full px-6"
        style={{ height: 'calc(100vh - 200px)' }}
      >
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full items-center justify-center"
            >
              <div className="glass-card flex flex-col items-center gap-4 rounded-2xl px-10 py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand-400" />
                <p className="text-sm text-white/60">Building knowledge graph…</p>
              </div>
            </motion.div>
          ) : graphData.nodes.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex h-full w-full items-center justify-center"
            >
              <div className="glass-card flex flex-col items-center gap-3 rounded-2xl px-10 py-12">
                <Network className="h-8 w-8 text-white/30" />
                <p className="text-sm text-white/50">No graph data available</p>
              </div>
            </motion.div>
          ) : (
            <motion.svg
              key="graph"
              ref={svgRef}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              width="100%"
              height="100%"
              viewBox={`0 0 ${dims.width} ${dims.height}`}
              className="h-full w-full"
              style={{ cursor: draggingNode ? 'grabbing' : 'default' }}
            >
              {/* Glow filter */}
              <defs>
                <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <filter
                  id="node-glow-strong"
                  x="-50%"
                  y="-50%"
                  width="200%"
                  height="200%"
                >
                  <feGaussianBlur stdDeviation="8" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Links */}
              <g>
                {linksRef.current.map((link, i) => {
                  const s = link.source as GraphNode;
                  const t = link.target as GraphNode;
                  if (s.x == null || s.y == null || t.x == null || t.y == null)
                    return null;
                  const highlighted = isLinkHighlighted(link);
                  const dimmed = hoveredNode && !highlighted;
                  return (
                    <line
                      key={`link-${i}`}
                      x1={s.x}
                      y1={s.y}
                      x2={t.x}
                      y2={t.y}
                      stroke={highlighted ? '#ffffff' : '#ffffff'}
                      strokeOpacity={dimmed ? 0.05 : highlighted ? 0.5 : 0.15}
                      strokeWidth={highlighted ? 1.5 : 1}
                      style={{ transition: 'stroke-opacity 0.2s, stroke-width 0.2s' }}
                    />
                  );
                })}
              </g>

              {/* Nodes */}
              <g>
                {nodesRef.current.map((node) => {
                  if (node.x == null || node.y == null) return null;
                  const color = COLOR_BY_SUBJECT(node.subject);
                  const highlighted = isNodeHighlighted(node);
                  const dimmed = hoveredNode && !highlighted;
                  const isHovered = hoveredNode?.id === node.id;
                  const radius = isHovered ? 8 : 6;
                  const label =
                    (node.title ?? '').length > 20
                      ? (node.title ?? '').slice(0, 20) + '…'
                      : (node.title ?? '');
                  return (
                    <g
                      key={`node-${node.id}`}
                      transform={`translate(${node.x}, ${node.y})`}
                      style={{
                        cursor: 'pointer',
                        opacity: dimmed ? 0.25 : 1,
                        transition: 'opacity 0.2s',
                      }}
                      onMouseDown={(e) => handleNodeMouseDown(e, node)}
                      onClick={() => handleNodeClick(node)}
                      onMouseEnter={() => setHoveredNode(node)}
                      onMouseLeave={() =>
                        setHoveredNode((prev) =>
                          prev?.id === node.id ? null : prev
                        )
                      }
                    >
                      <circle
                        r={radius}
                        fill={color}
                        filter={
                          isHovered
                            ? 'url(#node-glow-strong)'
                            : 'url(#node-glow)'
                        }
                        style={{ transition: 'r 0.2s' }}
                      />
                      <circle
                        r={radius + 2}
                        fill="none"
                        stroke={color}
                        strokeOpacity={isHovered ? 0.4 : 0.15}
                        strokeWidth={1}
                        style={{ transition: 'stroke-opacity 0.2s' }}
                      />
                      {label && (
                        <text
                          y={radius + 14}
                          textAnchor="middle"
                          fill="#ffffff"
                          fillOpacity={dimmed ? 0.2 : 0.7}
                          fontSize={10}
                          fontWeight={500}
                          style={{
                            pointerEvents: 'none',
                            transition: 'fill-opacity 0.2s',
                          }}
                        >
                          {label}
                        </text>
                      )}
                      {/* Invisible larger hit area */}
                      <circle
                        r={radius + 10}
                        fill="transparent"
                        style={{ cursor: 'pointer' }}
                      />
                    </g>
                  );
                })}
              </g>
            </motion.svg>
          )}
        </AnimatePresence>

        {/* Hover tooltip */}
        {hoveredNode && !loading && graphData.nodes.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card pointer-events-none absolute left-1/2 top-4 z-20 -translate-x-1/2 rounded-lg px-4 py-2"
          >
            <p className="text-sm font-medium text-white">{hoveredNode.title}</p>
            {hoveredNode.subject && (
              <p className="text-xs capitalize text-white/50">
                {hoveredNode.subject}
              </p>
            )}
          </motion.div>
        )}
      </div>

      {/* Color legend */}
      <div className="relative z-10 flex items-center justify-center gap-4 px-6 pb-4">
        <div className="glass-card flex flex-wrap items-center gap-4 rounded-xl px-4 py-2">
          {SUBJECTS.filter((s) => s.key !== null).map((subj) => (
            <div key={subj.key} className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: subj.color,
                  boxShadow: `0 0 6px ${subj.color}`,
                }}
              />
              <span className="text-xs font-medium text-white/60">
                {subj.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
