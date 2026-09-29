'use client';

/**
 * DirectionsMapsGame — Learn about Directions (8 cardinal points) and Maps vs Globes
 *
 * CISCE Nodes: c3_geo_006 (Directions - eight cardinal points), c3_geo_007 (Map vs globe)
 * Enrichment: c3_geography_enrichment_part6 & part7
 *
 * ELI5: "Directions help us find where places are! There are 4 main directions (North, South,
 *   East, West) and 4 intermediate directions (NE, NW, SE, SW). The sun rises in the East and
 *   sets in the West, and a compass always points North! A globe is a round 3D ball showing the
 *   true shape of the Earth, while a map is a flat 2D drawing that is easy to fold and carry
 *   to show streets and details!"
 *
 * Misconceptions:
 *   1. "Sun rises in the North" → "No! The sun always rises in the East and sets in the West!"
 *   2. "If you face East, North is on your right" → "No! When you face East, South is on your right and North is on your left!"
 *   3. "There are only 4 directions" → "No! There are 8 directions: 4 cardinal (N, S, E, W) and 4 intermediate (NE, NW, SE, SW)!"
 *   4. "Map and globe are the same" → "No! A globe is 3D and round showing true shape, while a map is 2D and flat showing detailed streets!"
 *   5. "Compass needle points to any direction" → "No! The compass needle always comes to rest pointing towards the North!"
 *
 * Story: "Help Navigator Nisha use her compass, map, and globe to explore the world,
 *   find directions, and master geography! Become a Master Explorer!"
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
    title: 'The Four Main Directions 🧭',
    text: 'There are four main directions, called cardinal directions: North (top), South (bottom), East (right), and West (left)! They are the backbone of every map and globe.',
    emoji: '🧭',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'There are four main directions, called cardinal directions: North, South, East, and West! They are the backbone of every map and globe.',
  },
  {
    title: 'Four Intermediate Directions ✨',
    text: 'Between the main directions are four intermediate points: North-East (NE), North-West (NW), South-East (SE), and South-West (SW). Together they form all eight directions!',
    emoji: '⭐',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Between the main directions are four intermediate points: North-East, North-West, South-East, and South-West. Together they form all eight directions!',
  },
  {
    title: 'Nature\'s Compass: The Sun ☀️',
    text: 'The sun rises in the east in the morning and sets in the west in the evening. If you face the rising sun, East is in front of you, South is on your right, and North is on your left!',
    emoji: '🌅',
    bgColor: 'from-yellow-400 to-amber-500',
    spoken: 'The sun rises in the east in the morning and sets in the west in the evening. If you face the rising sun, East is in front of you, South is on your right, and North is on your left!',
  },
  {
    title: 'The Compass Tool 🧭',
    text: 'A compass is an instrument with a magnetic needle that always points to the North! When you know North, you can work out all the other seven directions around the dial.',
    emoji: '📍',
    bgColor: 'from-teal-400 to-emerald-500',
    spoken: 'A compass is an instrument with a magnetic needle that always points to the North! When you know North, you can work out all the other seven directions around the dial.',
  },
  {
    title: 'Globe vs. Map 🌍🗺️',
    text: 'A globe is a round 3D model of Earth showing true shape and size. A map is a flat 2D drawing that is portable and shows fine details like streets and rivers, but stretches the poles!',
    emoji: '🌍',
    bgColor: 'from-purple-400 to-gold-500',
    spoken: 'A globe is a round three-dimensional model of Earth showing true shape and size. A map is a flat two-dimensional drawing that is portable and shows fine details!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_dir' | 'identify_sun' | 'sort_directions' | 'identify_globe_map' | 'sort_globe_map' | 'sort_globe_map_use';

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

// ─��─ Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_dir',
    question: 'In which direction does the sun rise every morning?',
    answer: 'East',
    options: ['North', 'East', 'West'],
    hint: 'Think about morning time! The sun always comes up in this direction.',
    misconception: 'The sun always rises in the EAST and sets in the WEST! Never in the north or south. Facing the rising sun means you are looking east!',
  },
  {
    type: 'identify_sun',
    question: 'If you stand facing the rising sun (East), which direction is on your RIGHT hand?',
    answer: 'South',
    options: ['North', 'South', 'West'],
    hint: 'Stretch your arms sideways when facing East. Left is North, right is South!',
    misconception: 'When you face East, South is on your right hand and North is on your left hand! West is directly behind you.',
  },
  {
    type: 'sort_directions',
    question: 'Drag each cardinal direction to its correct map position!',
    answer: 'sort',
    options: [],
    hint: 'North points to the top, South to the bottom, East to the right, West to the left!',
    misconception: 'On a properly oriented map, North is at the top, South at the bottom, East on the right, and West on the left!',
    sortItems: [
      { id: 'north', label: 'North (N)', icon: 'north', correctBin: 'top' },
      { id: 'south', label: 'South (S)', icon: 'south', correctBin: 'bottom' },
      { id: 'east', label: 'East (E)', icon: 'east', correctBin: 'right' },
      { id: 'west', label: 'West (W)', icon: 'west', correctBin: 'left' },
    ],
    bins: [
      { id: 'top', label: 'Top (North)', color: '#3B82F6' },
      { id: 'bottom', label: 'Bottom (South)', color: '#EF4444' },
      { id: 'right', label: 'Right (East)', color: '#10B981' },
      { id: 'left', label: 'Left (West)', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify_dir',
    question: 'How many total directions do we learn using main and intermediate points?',
    answer: '8 directions',
    options: ['4 directions', '8 directions', '12 directions'],
    hint: 'We have 4 main cardinal points plus 4 intermediate points in between!',
    misconception: 'There are 8 directions in total: 4 cardinal (N, S, E, W) and 4 intermediate (NE, NW, SE, SW)! Forgetting intermediate points is a common Class 3 error.',
  },
  {
    type: 'sort_directions',
    question: 'Drag each intermediate direction between its correct main neighbours!',
    answer: 'sort',
    options: [],
    hint: 'NE is between North and East. NW is between North and West!',
    misconception: 'Intermediate directions fill the gaps: North-East (NE) between North and East, South-East (SE) between South and East!',
    sortItems: [
      { id: 'ne', label: 'North-East (NE)', icon: 'ne', correctBin: 'between-n-e' },
      { id: 'nw', label: 'North-West (NW)', icon: 'nw', correctBin: 'between-n-w' },
      { id: 'se', label: 'South-East (SE)', icon: 'se', correctBin: 'between-s-e' },
      { id: 'sw', label: 'South-West (SW)', icon: 'sw', correctBin: 'between-s-w' },
    ],
    bins: [
      { id: 'between-n-e', label: 'Between N & E', color: '#8B5CF6' },
      { id: 'between-n-w', label: 'Between N & W', color: '#EC4899' },
      { id: 'between-s-e', label: 'Between S & E', color: '#14B8A6' },
      { id: 'between-s-w', label: 'Between S & W', color: '#F97316' },
    ],
  },
  {
    type: 'identify_globe_map',
    question: 'Which tool shows the TRUE shape and size of Earth without stretching polar land?',
    answer: 'Globe',
    options: ['Globe', 'Flat Map', 'Drawing on paper'],
    hint: 'A globe is round just like the real planet Earth!',
    misconception: 'A globe is a 3D round model that shows true shape and size! Flat maps stretch land near the poles (distortion), making Greenland look as big as Africa.',
  },
  {
    type: 'sort_globe_map',
    question: 'Drag each feature into the correct box: Globe or Map?',
    answer: 'sort',
    options: [],
    hint: 'Globe is 3D and round. Map is 2D flat, portable, and shows street details!',
    misconception: 'A globe is 3D, round, and non-portable. A map is 2D, flat, portable, can be folded, but distorts shapes near poles!',
    sortItems: [
      { id: 'globe-3d', label: 'Round 3D Model', icon: 'globe', correctBin: 'globe-bin' },
      { id: 'map-fold', label: 'Can be folded & carried', icon: 'map', correctBin: 'map-bin' },
      { id: 'globe-true', label: 'Shows true continent size', icon: 'globe', correctBin: 'globe-bin' },
      { id: 'map-detail', label: 'Shows small street details', icon: 'map', correctBin: 'map-bin' },
    ],
    bins: [
      { id: 'globe-bin', label: 'Globe 🌍', color: '#2563EB' },
      { id: 'map-bin', label: 'Map 🗺️', color: '#059669' },
    ],
  },
  {
    type: 'sort_globe_map_use',
    question: 'Drag each task to the best tool: Globe or Map?',
    answer: 'sort',
    options: [],
    hint: 'Use globe to see all continents together. Use map to find street turns or carry in bag!',
    misconception: 'Use a globe to understand Earth\'s round shape and true continent proportions. Use a map when you need portability or fine local details!',
    sortItems: [
      { id: 'use-continents', label: 'See all 7 continents', icon: 'globe', correctBin: 'globe-use' },
      { id: 'use-streets', label: 'Find local street turns', icon: 'map', correctBin: 'map-use' },
      { id: 'use-carry', label: 'Carry in school bag', icon: 'map', correctBin: 'map-use' },
      { id: 'use-shape', label: 'Learn Earth is a sphere', icon: 'globe', correctBin: 'globe-use' },
    ],
    bins: [
      { id: 'globe-use', label: 'Best for Globe 🌍', color: '#1D4ED8' },
      { id: 'map-use', label: 'Best for Map 🗺️', color: '#047857' },
    ],
  },
];

// ─── Navigator Nisha Mascot (Friendly Explorer with Compass & Map) ──

function NavigatorNisha({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="nisha-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
            <linearGradient id="nisha-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EA580C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
          </defs>
          {/* Explorer Hat */}
          <ellipse cx="37" cy="22" rx="26" ry="6" fill="url(#nisha-hat)" stroke="#9A3412" strokeWidth="1.5" />
          <path d="M22 22 C22 10, 52 10, 52 22 Z" fill="url(#nisha-hat)" stroke="#9A3412" strokeWidth="1.5" />
          <rect x="25" y="20" width="24" height="4" fill="#FEF08A" rx="1" />
          {/* Head */}
          <circle cx="37" cy="38" r="16" fill="url(#nisha-face)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="35" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="35" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="34" r="1" fill="white" />
          <circle cx="44" cy="34" r="1" fill="white" />
          {/* Smile */}
          <path d="M32 43 Q37 47 42 43" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="27" cy="40" r="3" fill="#F87171" opacity="0.6" />
          <circle cx="47" cy="40" r="3" fill="#F87171" opacity="0.6" />
          {/* Scarf */}
          <path d="M25 50 Q37 56 49 50 L47 58 Q37 62 27 58 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1" />
          {/* Body / Explorer vest */}
          <rect x="24" y="56" width="26" height="24" fill="#3B82F6" rx="4" stroke="#1D4ED8" strokeWidth="1.5" />
          <rect x="33" y="60" width="8" height="14" fill="#93C5FD" rx="2" />
          {/* Compass in hand */}
          <circle cx="16" cy="68" r="8" fill="#F3F4F6" stroke="#4B5536" strokeWidth="1.5" />
          <polygon points="16,62 18,68 16,74 14,68" fill="#EF4444" />
          {/* Boots */}
          <rect x="27" y="80" width="8" height="8" fill="#78350F" rx="2" />
          <rect x="40" y="80" width="8" height="8" fill="#78350F" rx="2" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Navigation Scene Background ──────────────────────────────

function NavigationScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />
        {/* Ground */}
        <rect x="0" y={height - 100} width={width} height="100" fill="url(#ground-grad)" />
        {/* Compass Rose watermark in sky */}
        <g transform={`translate(${width - 120}, 90)`} opacity="0.15">
          <circle cx="0" cy="0" r="50" fill="none" stroke="white" strokeWidth="3" />
          <polygon points="0,-60 8,-15 50,0 8,15 0,60 -8,15 -50,0 -8,-15" fill="white" />
          <polygon points="-30,-30 -5,-5 0,-45" fill="white" />
          <polygon points="30,30 5,5 0,45" fill="white" />
        </g>
      </svg>
      {/* Sun rising in east */}
      <motion.div className="absolute top-12 left-16" animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="20" fill="#FACC15" opacity="0.9" />
          <circle cx="30" cy="30" r="14" fill="#FDE047" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom Topic SVG Icon Components ─────────────────────────

function CompassRoseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#F3F4F6" stroke="#1E3A8A" strokeWidth="2" />
      <polygon points="30,6 34,26 30,30 26,26" fill="#EF4444" />
      <polygon points="30,54 34,34 30,30 26,34" fill="#9CA3AF" />
      <polygon points="54,30 34,26 30,30 34,34" fill="#3B82F6" />
      <polygon points="6,30 26,26 30,30 26,34" fill="#9CA3AF" />
      <circle cx="30" cy="30" r="4" fill="#1E3A8A" />
      <text x="30" y="14" fontSize="8" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">N</text>
      <text x="30" y="51" fontSize="8" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">S</text>
      <text x="49" y="32" fontSize="8" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">E</text>
      <text x="11" y="32" fontSize="8" fontWeight="bold" fill="#1E3A8A" textAnchor="middle">W</text>
    </svg>
  );
}

function NorthIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <polygon points="30,8 38,28 30,24 22,28" fill="#3B82F6" />
      <rect x="27" y="24" width="6" height="22" fill="#3B82F6" rx="1" />
      <text x="30" y="52" fontSize="10" fontWeight="bold" fill="#1D4ED8" textAnchor="middle">NORTH (N)</text>
    </svg>
  );
}

function SouthIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF2F2" stroke="#EF4444" strokeWidth="2" />
      <rect x="27" y="14" width="6" height="22" fill="#EF4444" rx="1" />
      <polygon points="30,52 38,32 30,36 22,32" fill="#EF4444" />
      <text x="30" y="12" fontSize="10" fontWeight="bold" fill="#B91C1C" textAnchor="middle">SOUTH (S)</text>
    </svg>
  );
}

function EastIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#ECFDF5" stroke="#10B981" strokeWidth="2" />
      <rect x="14" y="27" width="22" height="6" fill="#10B981" rx="1" />
      <polygon points="52,30 32,38 36,30 32,22" fill="#10B981" />
      <text x="30" y="51" fontSize="10" fontWeight="bold" fill="#047857" textAnchor="middle">EAST (E)</text>
    </svg>
  );
}

function WestIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <polygon points="8,30 28,38 24,30 28,22" fill="#F59E0B" />
      <rect x="24" y="27" width="22" height="6" fill="#F59E0B" rx="1" />
      <text x="30" y="51" fontSize="10" fontWeight="bold" fill="#B45309" textAnchor="middle">WEST (W)</text>
    </svg>
  );
}

function NEIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#F3E8FF" stroke="#8B5CF6" strokeWidth="2" />
      <line x1="16" y1="44" x2="44" y2="16" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" />
      <polygon points="44,16 34,16 44,26" fill="#8B5CF6" />
      <text x="30" y="53" fontSize="9" fontWeight="bold" fill="#6D28D9" textAnchor="middle">NE (N-E)</text>
    </svg>
  );
}

function NWIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FCE7F3" stroke="#EC4899" strokeWidth="2" />
      <line x1="44" y1="44" x2="16" y2="16" stroke="#EC4899" strokeWidth="5" strokeLinecap="round" />
      <polygon points="16,16 26,16 16,26" fill="#EC4899" />
      <text x="30" y="53" fontSize="9" fontWeight="bold" fill="#BE185D" textAnchor="middle">NW (N-W)</text>
    </svg>
  );
}

function SEIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#CCFBF1" stroke="#14B8A6" strokeWidth="2" />
      <line x1="16" y1="16" x2="44" y2="44" stroke="#14B8A6" strokeWidth="5" strokeLinecap="round" />
      <polygon points="44,44 34,44 44,34" fill="#14B8A6" />
      <text x="30" y="53" fontSize="9" fontWeight="bold" fill="#0F766E" textAnchor="middle">SE (S-E)</text>
    </svg>
  );
}

function SWIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FFEDD5" stroke="#F97316" strokeWidth="2" />
      <line x1="44" y1="16" x2="16" y2="44" stroke="#F97316" strokeWidth="5" strokeLinecap="round" />
      <polygon points="16,44 26,44 16,34" fill="#F97316" />
      <text x="30" y="53" fontSize="9" fontWeight="bold" fill="#C2410C" textAnchor="middle">SW (S-W)</text>
    </svg>
  );
}

function GlobeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="25" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="25" ry="10" fill="none" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 2" />
      <path d="M12 20 Q22 15, 30 22 T48 20" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 38 Q25 45, 38 38 T50 35" fill="none" stroke="#22C55E" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="5" r="3" fill="#94A3B8" />
      <rect x="27" y="55" width="6" height="3" fill="#64748B" rx="1" />
    </svg>
  );
}

function MapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="8,14 26,8 34,18 52,14 52,46 34,52 26,42 8,46" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <line x1="26" y1="8" x2="26" y2="42" stroke="#F59E0B" strokeWidth="1.5" />
      <line x1="34" y1="18" x2="34" y2="52" stroke="#F59E0B" strokeWidth="1.5" />
      <path d="M14 22 L20 28 L16 34" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 26 L46 32 L42 38" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Mapper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'north': return <NorthIcon size={size} />;
    case 'south': return <SouthIcon size={size} />;
    case 'east': return <EastIcon size={size} />;
    case 'west': return <WestIcon size={size} />;
    case 'ne': return <NEIcon size={size} />;
    case 'nw': return <NWIcon size={size} />;
    case 'se': return <SEIcon size={size} />;
    case 'sw': return <SWIcon size={size} />;
    case 'globe': return <GlobeIcon size={size} />;
    case 'map': return <MapIcon size={size} />;
    default: return <CompassRoseIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────���───────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center px-1" style={{ color }}>{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface DirectionsMapsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function DirectionsMapsGame({ width = 720, height = 560, onComplete }: DirectionsMapsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello explorer! Let us learn about directions and maps!');

  // Sort challenge placements
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
          if (screen === 'play') {
            audioManager.play('hint');
            setHintMsg(currentChallenge.hint);
            setMascotMood('thinking');
            speechManager.speak(currentChallenge.hint);
          }
        }, 10000);
  }, [screen, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when slide changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text);
    }
  }, [slideIdx, screen]);

  // Speak challenge question when challenge changes
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setPlacedItems({});
    }
  }, [challengeIdx, screen, currentChallenge]);

  // Handle teaching slide navigation
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      audioManager.play('success');
      setScreen('play');
      setSlideIdx(0);
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  // Multiple choice answer handler
  const handleAnswer = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setSparklePos({ x, y });
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! That is correct!');
      setSuccessMsg('Correct! Well done!');
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!currentChallenge.bins || !currentChallenge.sortItems) return false;

    // Check bin bounding boxes
    const binWidth = 140;
    const binHeight = 110;
    const binY = 160;
    const totalBins = currentChallenge.bins.length;
    const spacing = 15;
    const startX = (width - (totalBins * binWidth + (totalBins - 1) * spacing)) / 2;

    let droppedBinId: string | null = null;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + spacing);
      const by = binY;
      if (x >= bx - 20 && x <= bx + binWidth + 20 && y >= by - 20 && y <= by + binHeight + 20) {
        droppedBinId = bin.id;
      }
    });

    setHoverBin(null);

    if (!droppedBinId) {
      audioManager.play('drop-wrong');
      return false;
    }

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    if (droppedBinId === item.correctBin) {
      // Correct drop!
      audioManager.play('drop-correct');
      setSparklePos({ x, y });
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('Wonderful sorting! All correct!');
        speechManager.speak('Wonderful sorting! All correct!');
        setSuccessMsg('Sorting Complete! Great job!');
      }
      return true;
    } else {
      // Wrong drop!
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  // Advance to next challenge or finish game
  const handleNextChallenge = () => {
    audioManager.play('tap');
    setSuccessMsg(null);
    setHintMsg(null);
    setMascotMood('happy');

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('You are a Master Navigator and Map Expert!');
      speechManager.speak('You are a Master Navigator and Map Expert! Congratulations!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900" style={{ width, height }}>
      {/* Background scene */}
      <NavigationScene width={width} height={height} />

      {/* Mascot */}
      <NavigatorNisha mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti & Sparkles */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={handleNextChallenge} />}

      {/* ─── TEACHING SCREEN ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10 bg-slate-900/85 backdrop-blur-md">
          {/* Top header */}
          <div className="flex items-center justify-between w-full max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-3xl">{TEACHING_SLIDES[slideIdx].emoji}</span>
              <h2 className="text-xl font-black text-white">{TEACHING_SLIDES[slideIdx].title}</h2>
            </div>
            <div className="flex gap-1">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/30'}`} />
              ))}
            </div>
          </div>

          {/* Slide content box */}
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white border-4 border-white/20`}
          >
            <p className="text-lg font-bold leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          {/* Navigation buttons */}
          <div className="flex justify-between w-full max-w-xl">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${slideIdx === 0 ? 'opacity-30 cursor-not-allowed bg-slate-700' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              ⬅️ Back
            </button>
            <button
              onClick={handleNextSlide}
              className="px-8 py-3 rounded-2xl font-black text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-xl transition-all transform hover:scale-105"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          {/* Header */}
          <div className="flex items-center justify-between w-full bg-slate-900/70 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/10 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xs font-bold text-amber-400 bg-amber-400/20 px-2.5 py-1 rounded-xl">
                Challenge {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setHintMsg(currentChallenge.hint);
                speechManager.speak(currentChallenge.hint);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition-all"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="mx-auto my-2 w-full max-w-2xl bg-slate-800/90 backdrop-blur-md rounded-2xl p-4 border border-white/15 shadow-xl text-center">
            <h3 className="text-base font-black text-white">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Body */}
          <div className="flex-1 relative flex items-center justify-center">
            {/* Multiple Choice Challenges */}
            {currentChallenge.answer !== 'sort' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl px-4">
                {currentChallenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={e => handleAnswer(opt, e)}
                    className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/90 hover:bg-white text-slate-900 font-extrabold shadow-xl border-2 border-amber-400 transition-all"
                  >
                    <span className="text-sm text-center">{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenges */}
            {currentChallenge.answer === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (() => {
              const totalBins = currentChallenge.bins.length;
              const binWidth = totalBins === 4 ? 130 : 220;
              const binHeight = 100;
              const spacing = 12;
              const startX = (width - (totalBins * binWidth + (totalBins - 1) * spacing)) / 2;

              return (
                <div className="absolute inset-0">
                  {/* Bins */}
                  {currentChallenge.bins.map((bin, idx) => {
                    const bx = startX + idx * (binWidth + spacing);
                    const by = 160;
                    const isHovering = hoverBin === bin.id;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bx}
                        y={by}
                        width={binWidth}
                        height={binHeight}
                        isHovering={isHovering}
                      />
                    );
                  })}

                  {/* Draggable Items */}
                  {currentChallenge.sortItems.map((item, idx) => {
                    const placed = !!placedItems[item.id];
                    // Compute initial layout position for cards at the bottom
                    const cardWidth = 115;
                    const cardSpacing = 15;
                    const totalCardsWidth = currentChallenge.sortItems!.length * cardWidth + (currentChallenge.sortItems!.length - 1) * cardSpacing;
                    const cardStartX = (width - totalCardsWidth) / 2;
                    const cx = cardStartX + idx * (cardWidth + cardSpacing);
                    const cy = 350;

                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={cx}
                        y={cy}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
