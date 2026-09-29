'use client';

/**
 * DirectionsMapGame — Learn about directions, picture maps, water sources, and land/water features
 *
 * CISCE Nodes: c2_geo_006 (Directions - left, right, near, far),
 *              c2_geo_007 (Four main directions - N, S, E, W),
 *              c2_geo_008 (Picture maps - locating places),
 *              c2_geo_009 (Water sources - natural & man-made),
 *              c2_geo_010 (Land and water around us)
 *
 * ELI5: "The sun rises in the east and sets in the west! When you face east,
 *   your left hand points north and your right hand points south. Picture maps
 *   show us where schools, parks, and hospitals are. Water comes from rivers,
 *   rains, and taps, and the earth has hills, plains, rivers, and lakes!"
 *
 * Misconceptions (from enrichment):
 *   1. "Sun rises in the west" → "No! The sun always rises in the EAST and sets in the WEST!"
 *   2. "If I face east, my right hand points north" → "No! When facing east, your LEFT hand points north and your RIGHT hand points south!"
 *   3. "Sea water is safe to drink" → "No! Sea water is salty and unfit for drinking; we need fresh water from rivers, wells, and taps!"
 *   4. "A map is just a drawing" → "No! A map is a bird's-eye view with a north arrow that helps us locate real places!"
 *   5. "Plateaus are just big hills" → "No! A hill has a peak, but a plateau is high land that is flat on top like a table!"
 *
 * Story: "Help Guide Gaurav explore the town, read maps, find directions,
 *   discover water sources, and learn about the land and water around us!"
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
    title: 'Directions Around Us! 🧭',
    text: 'Left and right help us find where things are. Near things are close by, and far things are a long walk away! The blackboard is in front, and the door is on the right!',
    emoji: '🧭',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Left and right help us find where things are. Near things are close by, and far things are a long walk away!',
  },
  {
    title: 'The Four Main Directions! 🌅',
    text: 'The sun always rises in the EAST and sets in the WEST! When you stand facing East, your left hand points NORTH and your right hand points SOUTH!',
    emoji: '☀️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'The sun always rises in the east and sets in the west! When you face east, your left hand points north and your right hand points south!',
  },
  {
    title: 'Picture Maps & Landmarks! 🗺️',
    text: 'A picture map is a bird-eye view showing places like your school, hospital, park, and market. Every map has a north arrow (N) so we never get lost!',
    emoji: '🗺️',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'A picture map is a bird-eye view showing places like your school, hospital, park, and market. Every map has a north arrow!',
  },
  {
    title: 'Sources of Water! 💧',
    text: 'Water is precious! Natural sources include rivers, ponds, lakes, and rain. Man-made sources include taps, wells, hand pumps, and water tanks!',
    emoji: '💧',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Water is precious! Natural sources include rivers, ponds, lakes, and rain. Man-made sources include taps, wells, hand pumps, and water tanks!',
  },
  {
    title: 'Land and Water Features! ⛰️',
    text: 'Earth has land features like hills (high land), plains (flat land), and plateaus (flat high land). Water features include rivers, streams, lakes, and oceans!',
    emoji: '⛰️',
    bgColor: 'from-purple-400 to-gold-600',
    spoken: 'Earth has land features like hills, plains, and plateaus. Water features include rivers, streams, lakes, and oceans!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';

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

// ─── Challenges (8 progressive: identify → sort) ──────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'The sun rises in which direction every morning?',
    answer: 'East',
    options: ['East', 'West', 'North', 'South'],
    hint: 'Think about when you wake up early — the sun always appears on this side!',
    misconception: 'The sun NEVER rises in the west! The sun always rises in the EAST and sets in the WEST. Remember: East is where the morning begins!',
  },
  {
    type: 'identify',
    question: 'If you stand facing the rising sun (East), your left hand points towards which direction?',
    answer: 'North',
    options: ['North', 'South', 'West', 'East'],
    hint: 'Stretch out your arms when facing east. Your left hand points north!',
    misconception: 'When facing east, your LEFT hand points North and your right hand points South! Do not mix up left and right sides of your body!',
  },
  {
    type: 'sort',
    question: 'Drag each direction to its correct match!',
    answer: 'sort',
    options: [],
    hint: 'East is where sun rises, West is where sun sets, North is top, South is bottom!',
    misconception: 'Remember the fixed points: Sun rises in East, sets in West. North is opposite to South!',
    sortItems: [
      { id: 'dir-east', label: 'Sun Rises Here', icon: 'sun-east', correctBin: 'east' },
      { id: 'dir-west', label: 'Sun Sets Here', icon: 'sun-west', correctBin: 'west' },
      { id: 'dir-north', label: 'Top of Map (N)', icon: 'arrow-north', correctBin: 'north' },
      { id: 'dir-south', label: 'Bottom of Map (S)', icon: 'arrow-south', correctBin: 'south' },
    ],
    bins: [
      { id: 'east', label: 'East 🌅', color: '#F59E0B' },
      { id: 'west', label: 'West 🌇', color: '#EF4444' },
      { id: 'north', label: 'North ⬆️', color: '#3B82F6' },
      { id: 'south', label: 'South ⬇️', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'What is the purpose of the north arrow on a picture map?',
    answer: 'To show which way is north',
    options: ['To show which way is north', 'To make the map look pretty', 'To show where the river flows', 'To show how big the town is'],
    hint: 'Without this arrow, we would not know which way the map is turned!',
    misconception: 'The north arrow is NOT just for decoration! It is the most important symbol on a map because all other directions (South, East, West) depend on it.',
  },
  {
    type: 'sort',
    question: 'Drag each neighbourhood place to NEAR or FAR from home!',
    answer: 'sort',
    options: [],
    hint: 'Places right next door or across the street are near. Places in another city are far!',
    misconception: 'Near and far depend on distance! The park next door is near, but grandmother\'s village in another city is far!',
    sortItems: [
      { id: 'place-park', label: 'Park Next Door', icon: 'park', correctBin: 'near' },
      { id: 'place-market', label: 'Local Market', icon: 'market', correctBin: 'near' },
      { id: 'place-city', label: 'Distant Airport', icon: 'airport', correctBin: 'far' },
      { id: 'place-village', label: 'Faraway Village', icon: 'village', correctBin: 'far' },
    ],
    bins: [
      { id: 'near', label: 'Near 🟢', color: '#10B981' },
      { id: 'far', label: 'Far 🔴', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a safe water source we use directly from home pipes?',
    answer: 'Tap water',
    options: ['Tap water', 'Sea water', 'Muddy puddle water', 'Unfiltered river water'],
    hint: 'Water in our kitchen sink comes out of this fixture!',
    misconception: 'Sea water is salty and unfit for drinking! Muddy puddles have germs. Tap water from treated municipal supply is clean and safe for home use.',
  },
  {
    type: 'sort',
    question: 'Drag each water source to Natural or Man-Made!',
    answer: 'sort',
    options: [],
    hint: 'Natural water comes from nature (rivers, rain). Man-made water is built by people (taps, wells, tanks)!',
    misconception: 'Taps and wells are built by humans (man-made), while rivers and rain come directly from nature (natural)!',
    sortItems: [
      { id: 'src-river', label: 'River', icon: 'river', correctBin: 'natural' },
      { id: 'src-rain', label: 'Rainwater', icon: 'rain', correctBin: 'natural' },
      { id: 'src-tap', label: 'Tap water', icon: 'tap', correctBin: 'manmade' },
      { id: 'src-well', label: 'Well', icon: 'well', correctBin: 'manmade' },
    ],
    bins: [
      { id: 'natural', label: 'Natural 🌿', color: '#10B981' },
      { id: 'manmade', label: 'Man-Made 🏗️', color: '#3B82F6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each feature to Land Feature or Water Body!',
    answer: 'sort',
    options: [],
    hint: 'Hills and plains are solid land. Rivers and lakes are filled with water!',
    misconception: 'A hill is raised land you walk on, while a river is flowing water! Do not confuse land shapes with water bodies.',
    sortItems: [
      { id: 'feat-hill', label: 'Hill', icon: 'hill', correctBin: 'land' },
      { id: 'feat-plain', label: 'Plain', icon: 'plain', correctBin: 'land' },
      { id: 'feat-river', label: 'River', icon: 'river-body', correctBin: 'water' },
      { id: 'feat-lake', label: 'Lake', icon: 'lake', correctBin: 'water' },
    ],
    bins: [
      { id: 'land', label: 'Land Feature ⛰️', color: '#8B5CF6' },
      { id: 'water', label: 'Water Body 🌊', color: '#0284C7' },
    ],
  },
];

// ─── Guide Gaurav Mascot (Custom SVG) ─────────────────────────

function GuideGaurav({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300"
          >
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="gaurav-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE0BD" />
              <stop offset="100%" stopColor="#F5D0B1" />
            </linearGradient>
            <linearGradient id="gaurav-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Hat / Sun Cap */}
          <ellipse cx="37" cy="22" rx="22" ry="7" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
          <path d="M22 20 Q37 8 52 20 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <rect x="25" y="18" width="24" height="4" fill="#EF4444" />
          {/* Head / Face */}
          <circle cx="37" cy="35" r="16" fill="url(#gaurav-face)" stroke="#D4B296" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="31" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="32" r="1" fill="white" />
          <circle cx="44" cy="32" r="1" fill="white" />
          {/* Smile */}
          <path d="M32 42 Q37 47 42 42" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Cheeks */}
          <circle cx="27" cy="38" r="3" fill="#F87171" opacity="0.4" />
          <circle cx="47" cy="38" r="3" fill="#F87171" opacity="0.4" />
          {/* Body / Shirt */}
          <path d="M22 52 L52 52 L56 75 L18 75 Z" fill="url(#gaurav-shirt)" stroke="#0369A1" strokeWidth="1" />
          {/* Compass Badge */}
          <circle cx="37" cy="62" r="6" fill="white" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="37,58 39,62 37,66 35,62" fill="#EF4444" />
          {/* Map in hand */}
          <rect x="50" y="55" width="16" height="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" rx="1" transform="rotate(15 50 55)" />
          {/* Legs */}
          <rect x="26" y="75" width="6" height="12" fill="#1E3A8A" />
          <rect x="43" y="75" width="6" height="12" fill="#1E3A8A" />
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

// ─── Custom SVG Scene Background ──────────────────────────────

function MapSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 40%, #FEF9C3 70%, #DCFCE7 100%)' }} />
      {/* Compass rose watermark in background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10">
        <svg width="300" height="300" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="none" stroke="#0284C7" strokeWidth="2" />
          <polygon points="50,5 45,50 50,45" fill="#EF4444" />
          <polygon points="50,5 55,50 50,45" fill="#DC2626" />
          <polygon points="50,95 45,50 50,55" fill="#3B82F6" />
          <polygon points="50,95 55,50 50,55" fill="#2563EB" />
          <polygon points="5,50 50,45 45,50" fill="#F59E0B" />
          <polygon points="95,50 50,45 55,50" fill="#10B981" />
          <circle cx="50" cy="50" r="6" fill="#1E293B" />
        </svg>
      </div>
      {/* Hill in background */}
      <div className="absolute bottom-20 left-10 opacity-30">
        <svg width="180" height="80" viewBox="0 0 180 80">
          <path d="M0 80 Q90 0, 180 80 Z" fill="#10B981" />
        </svg>
      </div>
      {/* River meandering */}
      <div className="absolute bottom-0 right-0 w-full h-32 opacity-40">
        <svg width="100%" height="120" viewBox="0 0 720 120" preserveAspectRatio="none">
          <path d="M720 40 Q500 10, 360 60 T0 80 L0 120 L720 120 Z" fill="#38BDF8" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

function CompassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="22" fill="white" stroke="#FBBF24" strokeWidth="1" />
      {/* Needle */}
      <polygon points="30,10 33,30 30,35" fill="#EF4444" />
      <polygon points="30,50 33,30 30,35" fill="#3B82F6" />
      <circle cx="30" cy="30" r="3" fill="#1E293B" />
      {/* Letters */}
      <text x="27" y="17" fontSize="10" fontWeight="bold" fill="#DC2626">N</text>
      <text x="27" y="47" fontSize="10" fontWeight="bold" fill="#2563EB">S</text>
      <text x="44" y="33" fontSize="10" fontWeight="bold" fill="#D97706">E</text>
      <text x="10" y="33" fontSize="10" fontWeight="bold" fill="#D97706">W</text>
    </svg>
  );
}

function SunIcon({ type, size = 50 }: { type: 'east' | 'west'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#F59E0B" />
      {type === 'east' ? (
        <path d="M10 45 L50 45" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      ) : (
        <path d="M10 45 L50 45" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      )}
      <circle cx="30" cy="30" r="18" fill="none" stroke="#FBBF24" strokeWidth="2" strokeDasharray="3 3" />
    </svg>
  );
}

function ArrowDirIcon({ dir, size = 50 }: { dir: 'north' | 'south'; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="40" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="4" />
      {dir === 'north' ? (
        <g>
          <polygon points="30,16 38,28 22,28" fill="#3B82F6" />
          <rect x="27" y="28" width="6" height="16" fill="#3B82F6" />
          <text x="26" y="46" fontSize="12" fontWeight="bold" fill="#1E3A8A">N</text>
        </g>
      ) : (
        <g>
          <polygon points="30,44 38,32 22,32" fill="#10B981" />
          <rect x="27" y="16" width="6" height="16" fill="#10B981" />
          <text x="26" y="46" fontSize="12" fontWeight="bold" fill="#065F46">S</text>
        </g>
      )}
    </svg>
  );
}

function ParkIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="38" width="50" height="14" fill="#86EFAC" rx="2" />
      {/* Tree 1 */}
      <circle cx="20" cy="26" r="12" fill="#22C55E" />
      <rect x="18" y="32" width="4" height="10" fill="#92400E" />
      {/* Tree 2 */}
      <circle cx="40" cy="22" r="10" fill="#16A34A" />
      <rect x="38" y="28" width="4" height="14" fill="#92400E" />
    </svg>
  );
}

function MarketIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="25" width="40" height="25" fill="#FEF3C7" stroke="#D97706" strokeWidth="1.5" rx="2" />
      <polygon points="10,25 30,12 50,25" fill="#EF4444" />
      <rect x="22" y="34" width="16" height="16" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1" />
    </svg>
  );
}

function AirportIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="25" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" rx="4" />
      <path d="M15 32 L45 32" stroke="#EF4444" strokeWidth="2" strokeDasharray="4 2" />
      <polygon points="35,26 42,32 35,38" fill="#334155" />
    </svg>
  );
}

function VillageIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="28" width="30" height="20" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
      <polygon points="12,28 30,12 48,28" fill="#DC2626" />
      <rect x="26" y="36" width="8" height="12" fill="#92400E" />
    </svg>
  );
}

function RiverSourceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 15 Q30 30, 50 15 Q30 45, 50 50" fill="none" stroke="#38BDF8" strokeWidth="6" strokeLinecap="round" />
      <circle cx="30" cy="30" r="22" fill="none" stroke="#0284C7" strokeWidth="2" strokeDasharray="4 2" />
    </svg>
  );
}

function RainSourceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="22" r="16" fill="#94A3B8" />
      <line x1="20" y1="35" x2="16" y2="45" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="35" x2="26" y2="45" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="35" x2="36" y2="45" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TapSourceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="18" width="30" height="6" fill="#64748B" rx="2" />
      <rect x="32" y="12" width="8" height="12" fill="#94A3B8" rx="1" />
      <path d="M36 24 C34 32, 34 36, 36 42" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function WellSourceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="25" width="30" height="22" fill="#A16207" stroke="#78350F" strokeWidth="1.5" rx="2" />
      <ellipse cx="30" cy="27" rx="11" ry="5" fill="#1E3A8A" />
      <rect x="12" y="10" width="4" height="18" fill="#78350F" />
      <rect x="44" y="10" width="4" height="18" fill="#78350F" />
      <path d="M12 12 L30 4 L48 12 Z" fill="#B91C1C" />
    </svg>
  );
}

function HillIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M5 50 Q30 10, 55 50 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <path d="M30 25 Q38 35, 45 42" stroke="white" strokeWidth="2" fill="none" opacity="0.6" strokeLinecap="round" />
    </svg>
  );
}

function PlainIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="32" width="50" height="16" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" rx="2" />
      <line x1="12" y1="40" x2="22" y2="40" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="40" x2="48" y2="40" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function LakeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="22" ry="12" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <ellipse cx="22" cy="33" rx="5" ry="2" fill="#86EFAC" />
    </svg>
  );
}

// ─── Sort Card Component (for drag-and-drop challenges) ───────

function renderSortIcon(id: string, size: number = 48) {
  if (id === 'sun-east') return <SunIcon type="east" size={size} />;
  if (id === 'sun-west') return <SunIcon type="west" size={size} />;
  if (id === 'arrow-north') return <ArrowDirIcon dir="north" size={size} />;
  if (id === 'arrow-south') return <ArrowDirIcon dir="south" size={size} />;
  if (id === 'park') return <ParkIcon size={size} />;
  if (id === 'market') return <MarketIcon size={size} />;
  if (id === 'airport') return <AirportIcon size={size} />;
  if (id === 'village') return <VillageIcon size={size} />;
  if (id === 'river') return <RiverSourceIcon size={size} />;
  if (id === 'rain') return <RainSourceIcon size={size} />;
  if (id === 'tap') return <TapSourceIcon size={size} />;
  if (id === 'well') return <WellSourceIcon size={size} />;
  if (id === 'hill') return <HillIcon size={size} />;
  if (id === 'plain') return <PlainIcon size={size} />;
  if (id === 'river-body') return <RiverSourceIcon size={size} />;
  if (id === 'lake') return <LakeIcon size={size} />;
  return <CompassIcon size={size} />;
}

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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${
        isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black px-2 py-1 rounded-lg text-white shadow-sm" style={{ backgroundColor: color }}>
        {label}
      </span>
      <div className="absolute inset-0 border-2 border-dashed rounded-2xl pointer-events-none opacity-40" style={{ borderColor: color }} />
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStartPlay }: { onStartPlay: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = TEACHING_SLIDES[currentSlide];

  const handleNext = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onStartPlay();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-6 bg-gradient-to-br from-gold-100 via-amber-50 to-emerald-100 overflow-hidden select-none">
      <MapSceneBg width={720} height={560} />
      <GuideGaurav mood="happy" speaking={slide.spoken} />

      {/* Header */}
      <div className="z-10 text-center mt-2">
        <h1 className="text-2xl font-black text-gold-900 drop-shadow-sm">🧭 Guide Gaurav’s Map & Directions Academy 🗺️</h1>
        <p className="text-sm font-semibold text-gray-700">ICSE Class 2 Geography Explorer</p>
      </div>

      {/* Slide Card */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -50 }}
        transition={{ duration: 0.3 }}
        className="z-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-300 max-w-lg w-full flex flex-col items-center text-center my-auto"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-3xl shadow-md mb-3">
          {slide.emoji}
        </div>
        <h2 className="text-xl font-black text-gray-800 mb-2">{slide.title}</h2>
        <p className="text-base font-medium text-gray-600 leading-relaxed">{slide.text}</p>
      </motion.div>

      {/* Navigation Footer */}
      <div className="z-10 w-full max-w-lg flex items-center justify-between px-4 pb-2">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-4 py-2 rounded-xl font-bold shadow transition-all ${
            currentSlide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          ⬅️ Back
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {TEACHING_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all ${
                i === currentSlide ? 'bg-amber-500 scale-125' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-6 py-2 rounded-xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 shadow-lg hover:brightness-105 active:scale-95 transition-all"
        >
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface DirectionsMapGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function DirectionsMapGame({ width = 720, height = 560, onComplete }: DirectionsMapGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [mascotSpoken, setMascotSpoken] = useState<string | null>("Welcome! Let's explore directions and maps!");
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');

  // Sort challenge state
  const [sortItemsState, setSortItemsState] = useState<{ [id: string]: { x: number; y: number; placed: boolean } }>({});
  const [draggedId, setDraggedId] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && !isCompleted) {
        audioManager.play('hint');
        setHintMessage(currentChallenge.hint);
        setMascotMood('thinking');
        setMascotSpoken('Need a hint? Check this out!');
        speechManager.speak('Need a hint? Check this out!');
      }
    }, 10000);
  }, [currentChallenge, screen, isCompleted]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Initialize sort item positions when entering a sort challenge
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const initial: { [id: string]: { x: number; y: number; placed: boolean } } = {};
      currentChallenge.sortItems.forEach((item, index) => {
        initial[item.id] = {
          x: 50 + (index % 2) * 140,
          y: 340 + Math.floor(index / 2) * 105,
          placed: false,
        };
      });
      setSortItemsState(initial);
    }
  }, [challengeIdx, currentChallenge]);

  // Handle multiple-choice answers
  const handleOptionClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setScore(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpoken('Brilliant! That is correct!');
      speechManager.speak('Brilliant! That is correct!');
      setShowSuccessBanner(true);
      setShowConfetti(true);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpoken(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMessage(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    setDraggedId(id);
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setDraggedId(null);
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Determine target bin based on drop coordinates (x, y)
    // Bins are laid out horizontally in the top area: y between 80 and 220
    let droppedBinId: string | null = null;
    const binWidth = 140;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 15)) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 15);
      const by = 80;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 20 && y <= by + 120) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setSortItemsState(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items are placed
      const updated = { ...sortItemsState, [id]: { x, y, placed: true } };
      const allDone = currentChallenge.sortItems.every(i => updated[i.id]?.placed);

      if (allDone) {
        audioManager.play('success');
        setScore(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpoken('Wonderful! All sorted correctly!');
        speechManager.speak('Wonderful! All sorted correctly!');
        setShowSuccessBanner(true);
        setShowConfetti(true);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpoken(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMessage(currentChallenge.misconception);
      return false;
    }
  };

  // Advance to next challenge
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    setShowConfetti(false);
    setHintMessage(null);
    setMascotMood('happy');
    setMascotSpoken('Great job! Let us try the next one.');
    speechManager.speak('Great job! Let us try the next one.');

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setIsCompleted(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      onComplete?.(finalScore);
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStartPlay={() => setScreen('play')} />;
  }

  return (
    <div className="relative flex flex-col items-center justify-between select-none overflow-hidden" style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 50%, #FEF9C3 100%)' }}>
      <MapSceneBg width={width} height={height} />
      <GuideGaurav mood={mascotMood} speaking={mascotSpoken} />

      {/* Top HUD */}
      <div className="z-10 w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md shadow-sm border-b border-amber-200">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-gold-900 bg-gold-100 px-3 py-1 rounded-full">
            Challenge {challengeIdx + 1} of {CHALLENGES.length}
          </span>
          <StarRow count={score} total={CHALLENGES.length} />
        </div>
        <div className="text-xs font-bold text-gray-600">
          Errors: <span className="text-red-500 font-black">{errors}</span>
        </div>
      </div>

      {/* Main Challenge Area */}
      <div className="z-10 flex-1 w-full flex flex-col items-center justify-center p-4 max-w-2xl relative">
        {/* Question Card */}
        <motion.div
          key={challengeIdx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-300 w-full text-center mb-6"
        >
          <h2 className="text-lg font-black text-gray-800 leading-snug">{currentChallenge.question}</h2>
        </motion.div>

        {/* Challenge Body: Identify vs Sort */}
        {currentChallenge.type === 'identify' ? (
          <div className="grid grid-cols-2 gap-4 w-full max-w-lg">
            {currentChallenge.options.map(opt => (
              <motion.button
                key={opt}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={e => handleOptionClick(opt, e)}
                className="bg-white hover:bg-amber-50 border-3 border-amber-400 rounded-2xl p-4 shadow-md font-bold text-gray-800 text-sm flex items-center justify-center transition-all min-h-[60px]"
              >
                {opt}
              </motion.button>
            ))}
          </div>
        ) : (
          <div className="relative w-full h-[280px]">
            {/* Bins */}
            {currentChallenge.bins && (
              <div className="absolute top-2 left-0 right-0 flex justify-center gap-3 px-4">
                {currentChallenge.bins.map((bin, idx) => {
                  const totalBins = currentChallenge.bins!.length;
                  const binWidth = Math.floor((width - 60 - (totalBins - 1) * 15) / totalBins);
                  const startX = 30 + idx * (binWidth + 15);
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={startX}
                      y={0}
                      width={Math.min(binWidth, 150)}
                      height={90}
                      isHovering={false}
                    />
                  );
                })}
              </div>
            )}

            {/* Draggable Cards */}
            {currentChallenge.sortItems && currentChallenge.sortItems.map(item => {
              const pos = sortItemsState[item.id] || { x: 50, y: 340, placed: false };
              return (
                <SortCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  x={pos.x}
                  y={pos.y}
                  placed={pos.placed}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              );
            })}
          </div>
        )}
      </div>

      {/* Completion / Success Modals */}
      {showSuccessBanner && (
        <SuccessBanner
          message="Fantastic job! You got it right!"
          onComplete={handleNextChallenge}
        />
      )}

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
        />
      )}

      {/* Final Victory Overlay */}
      {isCompleted && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            className="bg-white rounded-3xl p-8 shadow-2xl border-4 border-amber-400 max-w-md w-full flex flex-col items-center"
          >
            <div className="text-6xl mb-3">🗺️🏆</div>
            <h1 className="text-3xl font-black text-gray-800 mb-2">Master Explorer!</h1>
            <p className="text-gray-600 mb-6 font-medium">You have mastered directions, picture maps, water sources, and land features!</p>
            <div className="flex gap-2 mb-6">
              <StarRow count={CHALLENGES.length} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                setChallengeIdx(0);
                setScore(0);
                setErrors(0);
                setIsCompleted(false);
                setScreen('teaching');
              }}
              className="px-8 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black rounded-2xl shadow-lg hover:brightness-105 active:scale-95 transition-all text-lg"
            >
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
