/**
 * LivingWorldMap — Persistent world map connecting all games
 *
 * UPGRADE 4: Living world map
 *
 * Shows a visual map where each game is a location. Completing games
 * unlocks new areas, builds bridges, and fills in the map.
 * Progress is persisted in localStorage.
 *
 * This is a standalone React component (not PixiJS) because it needs
 * to be accessible outside the game canvas — on the main menu, between
 * games, and as a progress dashboard.
 */

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorldNode {
  nodeId: string;
  gameFile: string;
  classLevel: number;
  subject: string;
  region: string;
  mapX: number;
  mapY: number;
  icon: string;
  title: string;
  prerequisites?: string[];
  score?: number;
  completed: boolean;
  stars: number;
}

interface RegionProgress {
  region: string;
  completed: number;
  total: number;
}

// ─── Persistence ──────────────────────────────────────────────

const STORAGE_KEY = 'living-world-progress';

function loadProgress(): Record<string, { score: number; stars: number; completed: boolean }> {
  if (typeof window === 'undefined') return {};
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : {};
  } catch {
    return {};
  }
}

function saveProgress(data: Record<string, { score: number; stars: number; completed: boolean }>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Ignore storage errors
  }
}

export function recordGameCompletion(nodeId: string, score: number, stars: number): void {
  const progress = loadProgress();
  progress[nodeId] = { score, stars, completed: true };
  saveProgress(progress);
}

export function getGameProgress(nodeId: string): { score: number; stars: number; completed: boolean } | null {
  const progress = loadProgress();
  return progress[nodeId] || null;
}

// ─── World Map Component ──────────────────────────────────────

export interface LivingWorldMapProps {
  nodes: WorldNode[];
  onNodeClick?: (node: WorldNode) => void;
  width?: number;
  height?: number;
}

export function LivingWorldMap({ nodes, onNodeClick, width = 720, height = 480 }: LivingWorldMapProps) {
  const [progress, setProgress] = useState(loadProgress());
  const [selectedNode, setSelectedNode] = useState<WorldNode | null>(null);

  useEffect(() => {
    setProgress(loadProgress());
  }, []);

  // Merge progress into nodes
  const nodesWithProgress = nodes.map(n => ({
    ...n,
    completed: progress[n.nodeId]?.completed || false,
    score: progress[n.nodeId]?.score,
    stars: progress[n.nodeId]?.stars || 0,
  }));

  // Check if a node is unlocked
  const isUnlocked = (node: WorldNode): boolean => {
    if (!node.prerequisites || node.prerequisites.length === 0) return true;
    return node.prerequisites.every(prereq => progress[prereq]?.completed);
  };

  // Region progress
  const regions: Record<string, RegionProgress> = {};
  nodesWithProgress.forEach(n => {
    if (!regions[n.region]) {
      regions[n.region] = { region: n.region, completed: 0, total: 0 };
    }
    regions[n.region].total++;
    if (n.completed) regions[n.region].completed++;
  });

  const handleNodeClick = (node: WorldNode) => {
    if (!isUnlocked(node)) return;
    setSelectedNode(node);
    onNodeClick?.(node);
  };

  return (
    <div className="relative rounded-2xl overflow-hidden border-2 border-gold-200 bg-gradient-to-b from-gold-100 to-emerald-100" style={{ width, height }}>
      {/* Map background */}
      <svg className="absolute inset-0 w-full h-full" viewBox={`0 0 ${width} ${height}`}>
        {/* Regions as colored areas */}
        {Object.entries(regions).map(([regionName, r], i) => {
          const colors = ['#fef3c7', '#dbeafe', '#dcfce7', '#fce7f3', '#fed7aa', '#e0e7ff'];
          const color = colors[i % colors.length];
          const regionNodes = nodesWithProgress.filter(n => n.region === regionName);
          const minX = Math.min(...regionNodes.map(n => n.mapX * width)) - 40;
          const maxX = Math.max(...regionNodes.map(n => n.mapX * width)) + 40;
          const minY = Math.min(...regionNodes.map(n => n.mapY * height)) - 40;
          const maxY = Math.max(...regionNodes.map(n => n.mapY * height)) + 40;
          return (
            <g key={regionName}>
              <rect
                x={minX} y={minY}
                width={maxX - minX} height={maxY - minY}
                rx={20} fill={color} opacity={0.5}
              />
              <text
                x={(minX + maxX) / 2} y={minY + 20}
                textAnchor="middle"
                className="text-xs font-bold fill-gray-600"
              >
                {regionName} ({r.completed}/{r.total})
              </text>
            </g>
          );
        })}

        {/* Connection paths between nodes */}
        {nodesWithProgress.map(node => {
          if (!node.prerequisites) return null;
          return node.prerequisites.map(prereqId => {
            const prereq = nodesWithProgress.find(n => n.nodeId === prereqId);
            if (!prereq) return null;
            const x1 = prereq.mapX * width;
            const y1 = prereq.mapY * height;
            const x2 = node.mapX * width;
            const y2 = node.mapY * height;
            const bothCompleted = prereq.completed && node.completed;
            return (
              <line
                key={`${prereqId}-${node.nodeId}`}
                x1={x1} y1={y1} x2={x2} y2={y2}
                stroke={bothCompleted ? '#22c55e' : '#cbd5e1'}
                strokeWidth={bothCompleted ? 3 : 2}
                strokeDasharray={bothCompleted ? '0' : '5,5'}
              />
            );
          });
        })}
      </svg>

      {/* Nodes as interactive elements */}
      {nodesWithProgress.map(node => {
        const unlocked = isUnlocked(node);
        const x = node.mapX * width;
        const y = node.mapY * height;
        return (
          <motion.button
            key={node.nodeId}
            onClick={() => handleNodeClick(node)}
            disabled={!unlocked}
            className={`absolute flex flex-col items-center justify-center rounded-full shadow-lg transition-all ${
              node.completed
                ? 'bg-emerald-400 text-white'
                : unlocked
                ? 'bg-white text-gold-600 hover:scale-110'
                : 'bg-gray-300 text-gray-400 cursor-not-allowed'
            }`}
            style={{
              left: x - 24,
              top: y - 24,
              width: 48,
              height: 48,
            }}
            whileHover={unlocked ? { scale: 1.15 } : {}}
            whileTap={unlocked ? { scale: 0.95 } : {}}
          >
            <span className="text-xl">{unlocked ? node.icon : '🔒'}</span>
            {node.completed && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-yellow-400 rounded-full flex items-center justify-center text-xs"
              >
                ★
              </motion.div>
            )}
          </motion.button>
        );
      })}

      {/* Selected node detail */}
      <AnimatePresence>
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-4 shadow-xl border-2 border-gold-200"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-gray-800">{selectedNode.title}</h3>
                <p className="text-xs text-gray-500">
                  Class {selectedNode.classLevel} • {selectedNode.subject} • {selectedNode.region}
                </p>
                {selectedNode.completed && (
                  <p className="text-xs text-emerald-600 font-semibold mt-1">
                    Score: {selectedNode.score}/100 • {selectedNode.stars} stars
                  </p>
                )}
              </div>
              <button
                onClick={() => onNodeClick?.(selectedNode)}
                className="px-4 py-2 bg-gold-500 text-white rounded-lg font-bold text-sm hover:bg-gold-600"
              >
                {selectedNode.completed ? 'Play Again' : 'Start'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Progress Dashboard ───────────────────────────────────────

export function ProgressDashboard({ nodes }: { nodes: WorldNode[] }) {
  const [progress] = useState(loadProgress());

  const totalCompleted = nodes.filter(n => progress[n.nodeId]?.completed).length;
  const totalStars = nodes.reduce((sum, n) => sum + (progress[n.nodeId]?.stars || 0), 0);
  const avgScore = nodes
    .filter(n => progress[n.nodeId]?.completed)
    .reduce((sum, n) => sum + (progress[n.nodeId]?.score || 0), 0) / Math.max(1, totalCompleted);

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      <div className="bg-white rounded-xl p-4 shadow-md border-2 border-emerald-200">
        <div className="text-3xl font-black text-emerald-600">{totalCompleted}</div>
        <div className="text-xs text-gray-500 font-semibold">Games Completed</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-md border-2 border-yellow-200">
        <div className="text-3xl font-black text-yellow-600">{totalStars}</div>
        <div className="text-xs text-gray-500 font-semibold">Total Stars</div>
      </div>
      <div className="bg-white rounded-xl p-4 shadow-md border-2 border-gold-200">
        <div className="text-3xl font-black text-gold-600">{Math.round(avgScore)}</div>
        <div className="text-xs text-gray-500 font-semibold">Average Score</div>
      </div>
    </div>
  );
}
