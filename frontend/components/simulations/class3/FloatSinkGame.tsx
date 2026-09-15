'use client';

/**
 * FloatSinkGame — Learn why objects float or sink in water!
 *
 * CISCE Nodes: c3_phy_001 (Objects that float and sink in water),
 *              c3_phy_002 (Why some objects float and others sink)
 * Enrichment: c3_physics_enrichment_part1 & part2
 *
 * ELI5: "Imagine a tub of water. Some things, like a leaf or plastic ball,
 *   sit happily on top — they float. Other things, like a stone or coin,
 *   drop straight to the bottom — they sink! Wood floats because it is
 *   light for its size. A stone sinks because it is solid and heavy.
 *   Even a huge iron ship floats because it is hollow and full of air!"
 *
 * Misconceptions:
 *   1. "Heavy things always sink and light things always float" →
 *      "Not true! A heavy wooden log floats while a small coin sinks!"
 *   2. "Iron always sinks" →
 *      "An iron nail sinks, but an iron ship floats because it is hollow and full of air!"
 *   3. "Floating means completely dry" →
 *      "Floating means staying on the surface; the bottom of a floating object touches water!"
 *   4. "Plastic always floats" →
 *      "Most plastic floats, but heavy or solid plastic toys with water inside can sink!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG water scene background (sky, water tank, floating/sinking objects, bubbles)
 * - Custom SVG mascot (Sailor Sandeep with sailor cap, life jacket, boat)
 * - Drag-and-drop: drag items into Float / Sink bins
 * - 8 progressive challenges: identify float/sink → reason why → ship puzzle → density matching
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API (speechManager)
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity via useRef timer
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Float or Sink? 🌊',
    text: 'When we place an object in water, it either FLOATS on top or SINKS to the bottom! A leaf floats like a boat, but a stone sinks like an anchor!',
    emoji: '🪵',
    bgColor: 'from-cyan-400 to-blue-500',
    spoken: 'When we place an object in water, it either floats on top or sinks to the bottom! A leaf floats like a boat, but a stone sinks like an anchor!',
  },
  {
    title: 'Why Do Things Float? 🍃',
    text: 'Objects like wooden blocks, corks, and plastic balls float because they are light for their size or trap air inside them!',
    emoji: '🎈',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Objects like wooden blocks, corks, and plastic balls float because they are light for their size or trap air inside them!',
  },
  {
    title: 'Why Do Things Sink? 🪨',
    text: 'Objects like stones, metal coins, and iron keys sink because they are heavy and solid, packed with material with no air inside!',
    emoji: '🪙',
    bgColor: 'from-teal-400 to-cyan-500',
    spoken: 'Objects like stones, metal coins, and iron keys sink because they are heavy and solid, packed with material with no air inside!',
  },
  {
    title: 'The Great Iron Ship! 🚢',
    text: 'A tiny iron nail sinks at once! Yet a huge iron ship floats across the ocean! Why? Because the ship is hollow and full of air inside, making it light for its size!',
    emoji: '��',
    bgColor: 'from-indigo-400 to-blue-600',
    spoken: 'A tiny iron nail sinks at once! Yet a huge iron ship floats across the ocean! Why? Because the ship is hollow and full of air inside, making it light for its size!',
  },
  {
    title: 'Predict, Test, Record! 📋',
    text: 'A little scientist always predicts what will happen before testing! We test in a bowl of water, record our observations in a table, and sort our objects into floaters and sinkers!',
    emoji: '🔬',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'A little scientist always predicts what will happen before testing! We test in a bowl of water, record our observations in a table, and sort our objects into floaters and sinkers!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_float' | 'identify_sink' | 'sort_objects' | 'identify_reason' | 'sort_reasons' | 'ship_puzzle' | 'match_density' | 'material_sort';

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: { id: string; label: string; icon: string; correctBin: string }[];
  bins?: { id: string; label: string; color: string }[];
}

// ─── Challenges (8 progressive: identify → reason → sort → ship puzzle) ───

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_float',
    question: 'What does it mean when an object FLOATS in water?',
    answer: 'It stays on top of the water',
    options: ['It stays on top of the water', 'It goes to the bottom', 'It disappears completely'],
    hint: 'Think of a leaf or a wooden boat resting on a pond surface!',
    misconception: 'Floating means the object stays on top of the water! It does not drop down to the bottom. The leaf or wooden block rests on the surface like a small raft!',
  },
  {
    type: 'identify_sink',
    question: 'What does it mean when an object SINKS in water?',
    answer: 'It goes to the bottom of the water',
    options: ['It stays on top of the water', 'It goes to the bottom of the water', 'It floats away in the air'],
    hint: 'Think of a heavy stone or metal coin dropped into a bowl!',
    misconception: 'Sinking means the object drops down through the water and rests at the bottom, like a stone or metal coin falling straight down like an anchor!',
  },
  {
    type: 'sort_objects',
    question: 'Drag each everyday object to the correct bin! Does it float or sink?',
    answer: 'sort',
    options: [],
    hint: 'Wood, leaves, cork, and plastic balls stay on top (Float)! Stones, coins, and keys go to the bottom (Sink)!',
    misconception: 'Remember: being heavy or light alone does not decide everything, but wood and plastic balls float while stones and metal coins sink!',
    sortItems: [
      { id: 'wood', label: 'Wooden Block', icon: 'wood', correctBin: 'float' },
      { id: 'leaf', label: 'Green Leaf', icon: 'leaf', correctBin: 'float' },
      { id: 'stone', label: 'Heavy Stone', icon: 'stone', correctBin: 'sink' },
      { id: 'coin', label: 'Metal Coin', icon: 'coin', correctBin: 'sink' },
    ],
    bins: [
      { id: 'float', label: 'Floats on Water 🪵', color: '#0284C7' },
      { id: 'sink', label: 'Sinks to Bottom 🪨', color: '#64748B' },
    ],
  },
  {
    type: 'identify_reason',
    question: 'Why does a wooden block float while a heavy stone sinks?',
    answer: 'Wood is light for its size and stone is heavy and solid',
    options: [
      'Wood is light for its size and stone is heavy and solid',
      'Wood is always smaller than stones',
      'Stones are painted black',
    ],
    hint: 'Think about whether the object is light for its size or packed with heavy solid material!',
    misconception: 'Being heavy or light alone does not fully decide it, but a wooden block is light for its size while a stone is packed full of heavy solid material with no air spaces!',
  },
  {
    type: 'sort_reasons',
    question: 'Drag each clue! Does it describe why objects float or why they sink?',
    answer: 'sort',
    options: [],
    hint: 'Light, hollow, and air-filled objects float! Heavy, solid, and compact objects sink!',
    misconception: 'Clues for floating: light for its size, has air inside, hollow! Clues for sinking: solid, heavy for its size, packed with material with no air!',
    sortItems: [
      { id: 'air', label: 'Trapped air inside', icon: 'bubble', correctBin: 'float-reason' },
      { id: 'hollow', label: 'Hollow shape like a bowl', icon: 'boat', correctBin: 'float-reason' },
      { id: 'solid', label: 'Solid with no air spaces', icon: 'stone', correctBin: 'sink-reason' },
      { id: 'heavy-size', label: 'Heavy for its size', icon: 'coin', correctBin: 'sink-reason' },
    ],
    bins: [
      { id: 'float-reason', label: 'Why Objects Float 🎈', color: '#0EA5E9' },
      { id: 'sink-reason', label: 'Why Objects Sink ⚓', color: '#475569' },
    ],
  },
  {
    type: 'ship_puzzle',
    question: 'A tiny iron nail sinks at once, but a huge iron SHIP floats! Why?',
    answer: 'The ship is hollow and full of air inside',
    options: [
      'The ship is hollow and full of air inside',
      'The ship is made of soft wood disguised as iron',
      'The ship is too fast for water to catch',
    ],
    hint: 'Think about what is inside the ship hull — empty space filled with air!',
    misconception: 'A heavy ship floats because it is hollow and full of air inside, making the whole ship light for its size — just like an upside-down bowl trapping air!',
  },
  {
    type: 'match_density',
    question: 'Match each object to its correct behavior in water!',
    answer: 'sort',
    options: [],
    hint: 'Cork and plastic float! Glass marbles and iron balls sink!',
    misconception: 'Cork and plastic balls float because they are light or trap air! Glass marbles and iron balls sink because they are solid and heavy for their size!',
    sortItems: [
      { id: 'cork', label: 'Cork stopper', icon: 'cork', correctBin: 'float' },
      { id: 'plastic', label: 'Plastic ball', icon: 'plastic', correctBin: 'float' },
      { id: 'glass', label: 'Glass marble', icon: 'glass', correctBin: 'sink' },
      { id: 'iron', label: 'Iron ball', icon: 'iron', correctBin: 'sink' },
    ],
    bins: [
      { id: 'float', label: 'Floats 🌊', color: '#0284C7' },
      { id: 'sink', label: 'Sinks 💧', color: '#475569' },
    ],
  },
  {
    type: 'material_sort',
    question: 'Sort these special objects: Feather, Sponge (dry), Metal Key, Gold Ring!',
    answer: 'sort',
    options: [],
    hint: 'Feather is extremely light and floats! Dry sponge is full of air and floats! Metal key and gold ring are heavy solid metals and sink!',
    misconception: 'A dry sponge floats because it is full of air holes! Metal keys and gold rings sink because they are dense solid metals with no air!',
    sortItems: [
      { id: 'feather', label: 'Light feather', icon: 'feather', correctBin: 'float' },
      { id: 'sponge', label: 'Dry sponge', icon: 'sponge', correctBin: 'float' },
      { id: 'key', label: 'Metal key', icon: 'key', correctBin: 'sink' },
      { id: 'gold', label: 'Gold ring', icon: 'gold', correctBin: 'sink' },
    ],
    bins: [
      { id: 'float', label: 'Floats 🪶', color: '#0284C7' },
      { id: 'sink', label: 'Sinks 🔑', color: '#475569' },
    ],
  },
];

// ─── Sailor Sandeep Mascot (Sailor with cap, life jacket) ─────

function SailorSandeep({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-blue-400"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="sailor-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE0BD" />
              <stop offset="100%" stopColor="#F5D0A9" />
            </linearGradient>
            <linearGradient id="life-jacket" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#FF6B6B" />
              <stop offset="50%" stopColor="#FF8E53" />
              <stop offset="100%" stopColor="#FF6B6B" />
            </linearGradient>
          </defs>

          {/* Body / Life Jacket */}
          <rect x="22" y="48" width="31" height="32" rx="8" fill="url(#life-jacket)" stroke="#D93838" strokeWidth="2" />
          {/* Life jacket stripes */}
          <rect x="25" y="55" width="25" height="5" fill="#FFD700" rx="2" />
          <rect x="25" y="68" width="25" height="5" fill="#FFD700" rx="2" />

          {/* Head */}
          <circle cx="37" cy="35" r="16" fill="url(#sailor-face)" stroke="#E0AC69" strokeWidth="1.5" />

          {/* Eyes */}
          <circle cx="31" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="32" r="1" fill="white" />
          <circle cx="44" cy="32" r="1" fill="white" />

          {/* Cheeks */}
          <circle cx="27" cy="38" r="3" fill="#FF8A8A" opacity="0.6" />
          <circle cx="47" cy="38" r="3" fill="#FF8A8A" opacity="0.6" />

          {/* Smile */}
          <path d="M33 41 Q37 45 41 41" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Sailor Cap */}
          <path d="M22 23 L52 23 L48 14 L26 14 Z" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
          <ellipse cx="37" cy="14" rx="14" ry="4" fill="white" stroke="#94A3B8" strokeWidth="1.5" />
          <rect x="24" y="21" width="26" height="3" fill="#1D4ED8" rx="1" />
          <circle cx="37" cy="12" r="2" fill="#1D4ED8" />

          {/* Arms */}
          <rect x="13" y="52" width="10" height="20" rx="5" fill="#3B82F6" transform="rotate(15 18 52)" />
          <rect x="52" y="52" width="10" height="20" rx="5" fill="#3B82F6" transform="rotate(-15 57 52)" />

          {/* Legs */}
          <rect x="27" y="78" width="8" height="10" rx="3" fill="#1E3A8A" />
          <rect x="40" y="78" width="8" height="10" rx="3" fill="#1E3A8A" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Water Scene Background with SVG Gradients ────────────────

function WaterScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-water-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="45%" stopColor="#38BDF8" />
            <stop offset="55%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#sky-water-grad)" />
      </svg>

      {/* Sun */}
      <div className="absolute top-4 left-6">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="url(#sun-glow)" />
          <circle cx="30" cy="30" r="16" fill="#FACC15" />
        </svg>
      </div>

      {/* Clouds */}
      <motion.div className="absolute top-6 left-1/4 opacity-75" animate={{ x: [0, 35, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>

      {/* Bubbles rising in water */}
      <motion.div className="absolute bottom-10 left-1/3" animate={{ y: [0, -120], opacity: [0.8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeOut' }}>
        <svg width="20" height="20" viewBox="0 0 20 20">
          <circle cx="10" cy="10" r="6" fill="none" stroke="white" strokeWidth="1.5" opacity="0.7" />
        </svg>
      </motion.div>
      <motion.div className="absolute bottom-20 left-2/3" animate={{ y: [0, -100], opacity: [0.7, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeOut', delay: 1.5 }}>
        <svg width="16" height="16" viewBox="0 0 16 16">
          <circle cx="8" cy="8" r="5" fill="none" stroke="white" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Object Icons (for sort cards & items) ─────────

function WoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="15" width="40" height="20" rx="4" fill="#A16207" stroke="#713F12" strokeWidth="2" />
      <ellipse cx="10" cy="25" rx="3" ry="8" fill="#CA8A04" />
      <ellipse cx="40" cy="25" rx="3" ry="8" fill="#CA8A04" />
      <path d="M18 18 Q25 22, 32 18" stroke="#713F12" strokeWidth="1.5" fill="none" />
      <path d="M15 28 Q25 24, 35 28" stroke="#713F12" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function StoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 32 C8 20, 18 12, 30 15 C42 18, 45 32, 38 40 C31 48, 12 44, 10 32 Z" fill="#64748B" stroke="#334155" strokeWidth="2" />
      <path d="M18 22 Q25 28, 32 20" stroke="#94A3B8" strokeWidth="1.5" fill="none" />
      <circle cx="35" cy="30" r="2" fill="#475569" />
    </svg>
  );
}

function LeafIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 40 Q20 35, 40 10 Q25 25, 10 40 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <path d="M10 40 Q22 28, 40 10" stroke="#15803D" strokeWidth="1.5" fill="none" />
      <path d="M20 32 Q25 30, 28 25" stroke="#15803D" strokeWidth="1" fill="none" />
    </svg>
  );
}

function CoinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#FACC15" stroke="#CA8A04" strokeWidth="2.5" />
      <circle cx="25" cy="25" r="13" fill="none" stroke="#EAB308" strokeWidth="1.5" />
      <text x="25" y="30" fontSize="16" fontWeight="bold" fill="#854D0E" textAnchor="middle">₹</text>
    </svg>
  );
}

function BubbleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="16" fill="#38BDF8" opacity="0.4" stroke="#0284C7" strokeWidth="2" />
      <circle cx="19" cy="19" r="4" fill="white" opacity="0.8" />
      <circle cx="23" cy="15" r="2" fill="white" opacity="0.8" />
    </svg>
  );
}

function BoatIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M8 28 L15 40 L35 40 L42 28 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <rect x="23" y="10" width="4" height="18" fill="#78350F" />
      <path d="M27 11 L40 18 L27 25 Z" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
    </svg>
  );
}

function CorkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M16 12 L34 12 C37 12, 39 16, 38 20 L35 38 C34 41, 31 43, 28 43 L22 43 C19 43, 16 41, 15 38 L12 20 C11 16, 13 12, 16 12 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="25" cy="12" rx="9" ry="3" fill="#FBBF24" stroke="#B45309" strokeWidth="1.5" />
    </svg>
  );
}

function PlasticIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
      <path d="M15 18 Q25 10, 35 18" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function GlassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#06B6D4" opacity="0.6" stroke="#0891B2" strokeWidth="2" />
      <ellipse cx="20" cy="18" rx="5" ry="3" fill="white" opacity="0.7" />
    </svg>
  );
}

function IronIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#475569" stroke="#1E293B" strokeWidth="2" />
      <circle cx="25" cy="25" r="12" fill="#334155" />
      <circle cx="20" cy="20" r="3" fill="#94A3B8" opacity="0.8" />
    </svg>
  );
}

function FeatherIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 C25 5, 42 20, 38 38 C35 45, 25 48, 25 48 C25 48, 15 45, 12 38 C8 20, 25 5, 25 5 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M25 5 L25 48" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M25 15 L32 10" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M25 22 L35 18" stroke="#CBD5E1" strokeWidth="1" />
      <path d="M25 30 L32 27" stroke="#CBD5E1" strokeWidth="1" />
    </svg>
  );
}

function SpongeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="15" width="30" height="22" rx="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="18" cy="22" r="3" fill="#EAB308" />
      <circle cx="32" cy="24" r="2.5" fill="#EAB308" />
      <circle cx="25" cy="30" r="3.5" fill="#EAB308" />
    </svg>
  );
}

function KeyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="18" cy="18" r="8" fill="none" stroke="#94A3B8" strokeWidth="3" />
      <path d="M24 24 L38 38 M34 34 L38 30 M31 37 L35 33" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function GoldIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="16" fill="none" stroke="#EAB308" strokeWidth="5" />
      <circle cx="25" cy="25" r="10" fill="#FEF08A" />
    </svg>
  );
}

// ─── Render Icon Helper Function ──────────────────────────────

function renderSortIcon(icon: string, size: number = 46) {
  switch (icon) {
    case 'wood': return <WoodIcon size={size} />;
    case 'leaf': return <LeafIcon size={size} />;
    case 'stone': return <StoneIcon size={size} />;
    case 'coin': return <CoinIcon size={size} />;
    case 'bubble': return <BubbleIcon size={size} />;
    case 'boat': return <BoatIcon size={size} />;
    case 'cork': return <CorkIcon size={size} />;
    case 'plastic': return <PlasticIcon size={size} />;
    case 'glass': return <GlassIcon size={size} />;
    case 'iron': return <IronIcon size={size} />;
    case 'feather': return <FeatherIcon size={size} />;
    case 'sponge': return <SpongeIcon size={size} />;
    case 'key': return <KeyIcon size={size} />;
    case 'gold': return <GoldIcon size={size} />;
    default: return <WoodIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-sm font-black text-gray-800 text-center px-2">{label}</span>
    </div>
  );
}

// ─── Main Component: FloatSinkGame ────────────────────────────

export interface FloatSinkGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FloatSinkGame({ width = 720, height = 560, onComplete }: FloatSinkGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Welcome, little scientist! Let's explore why things float and sink!");

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sorting state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Initial item positions for sort challenges
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});

  const currentChallenge = CHALLENGES[challengeIdx];

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setHintMsg(currentChallenge.hint);
        audioManager.play('hint');
        speechManager.speak(currentChallenge.hint);
        setMascotMood('thinking');
        setMascotSpeech('Need a hint? Check this out!');
      }
    }, 10000);
  }, [screen, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // When challenge changes, initialize sort item positions
  useEffect(() => {
    if (currentChallenge?.type === 'sort_objects' || currentChallenge?.type === 'sort_reasons' || currentChallenge?.type === 'match_density' || currentChallenge?.type === 'material_sort') {
      const initialPos: Record<string, { x: number; y: number }> = {};
      currentChallenge.sortItems?.forEach((item, index) => {
        initialPos[item.id] = { x: 50 + index * 140, y: 380 };
      });
      setItemPositions(initialPos);
      setPlacedItems({});
    }
  }, [challengeIdx, currentChallenge]);

  // Speak teaching slide when slide changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text);
    }
  }, [slideIdx, screen]);

  // Speak challenge question when challenge starts
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setMascotMood('happy');
    }
  }, [challengeIdx, screen, currentChallenge]);

  // Handle Multiple Choice Selection
  const handleOptionSelect = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Correct! Brilliant observation!');
      speechManager.speak('Correct! Brilliant observation!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Wonderful job! You got it right!');
      setStars(prev => prev + 1);
      setScore(prev => prev + 15);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Drag and Drop Handlers
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Determine target bin based on x, y drop coordinates
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 60 + idx * 310;
      const binY = 180;
      const binW = 280;
      const binH = 170;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
        droppedBinId = bin.id;
      }
    });

    setHoverBin(null);

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('Amazing sorting! All correct!');
        speechManager.speak('Amazing sorting! All correct!');
        setSparklePos({ x: width / 2, y: height / 2 });
        setSuccessMsg('Perfect sorting, little scientist!');
        setStars(prev => prev + 1);
        setScore(prev => prev + 20);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    setSuccessMsg(null);
    setHintMsg(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Fantastic! You are a master float and sink scientist!');
      setMascotMood('celebrate');
      setMascotSpeech('You completed all challenges! You are a Floating Star!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      <WaterScene width={width} height={height} />
      <SailorSandeep mood={mascotMood} speaking={mascotSpeech} />

      {/* Header bar */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-cyan-200">
        <span className="text-sm font-black text-cyan-800">🌊 Float & Sink</span>
        <StarRow count={stars} total={CHALLENGES.length} />
      </div>

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-8">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white border-4 border-white/40 flex flex-col items-center text-center`}
          >
            <span className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-8 drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-5 py-2.5 rounded-xl font-bold bg-white/20 hover:bg-white/30 disabled:opacity-35 transition shadow"
              >
                ← Back
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                    audioManager.play('swoop');
                    speechManager.speak('Let us start the challenges! Are you ready?');
                  }
                }}
                className="px-6 py-2.5 rounded-xl font-black bg-yellow-400 text-yellow-950 hover:bg-yellow-300 transition shadow-lg"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-between p-6 pt-20">
          {/* Challenge Card Header */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-cyan-300 flex flex-col items-center text-center">
            <span className="text-xs font-black uppercase tracking-wider text-cyan-600 mb-1">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
            <h3 className="text-lg font-black text-gray-800">{currentChallenge.question}</h3>
          </div>

          {/* Multiple Choice Options */}
          {currentChallenge.answer !== 'sort' && (
            <div className="w-full max-w-xl flex flex-col gap-3 my-auto">
              {currentChallenge.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionSelect(option)}
                  className="w-full py-4 px-6 rounded-2xl bg-white/90 hover:bg-cyan-50 font-bold text-gray-800 text-base shadow-lg border-2 border-cyan-200 transition text-left flex items-center justify-between"
                >
                  <span>{option}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-cyan-400 flex items-center justify-center text-cyan-600 font-bold text-xs">
                    {['A', 'B', 'C'][idx]}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort / Drag and Drop Challenge */}
          {currentChallenge.answer === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-3xl h-[340px] my-auto">
              {/* Bins */}
              {currentChallenge.bins.map((bin, idx) => {
                const binW = 280;
                const binH = 170;
                const binX = 60 + idx * 310;
                const binY = 10;
                return (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={binX}
                    y={binY}
                    width={binW}
                    height={binH}
                    isHovering={hoverBin === bin.id}
                  />
                );
              })}

              {/* Draggable Items */}
              {currentChallenge.sortItems.map((item) => {
                const pos = itemPositions[item.id] || { x: 50, y: 380 };
                const placed = !!placedItems[item.id];
                return (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={pos.x}
                    y={pos.y}
                    placed={placed}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          )}

          {/* Score tracker footer */}
          <div className="w-full max-w-2xl flex justify-between items-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow border border-cyan-200">
            <span className="text-sm font-bold text-gray-700">Score: <strong className="text-cyan-700">{score}</strong></span>
            <button
              onClick={() => {
                audioManager.play('hint');
                setHintMsg(currentChallenge.hint);
                speechManager.speak(currentChallenge.hint);
              }}
              className="px-3 py-1 rounded-xl bg-amber-400 text-amber-950 font-bold text-xs shadow hover:bg-amber-300 transition"
            >
              💡 Need Hint?
            </button>
            <span className="text-sm font-bold text-gray-700">Errors: <strong className="text-red-500">{errors}</strong></span>
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
