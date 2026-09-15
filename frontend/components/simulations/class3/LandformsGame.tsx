'use client';

/**
 * LandformsGame — Learn about landforms, rivers of India, and weather vs climate
 *
 * CISCE Nodes: c3_geo_008 (Landforms - mountains and plains),
 *              c3_geo_009 (Rivers of India - introduction),
 *              c3_geo_010 (Weather vs climate - basic)
 *
 * ELI5: "The Earth is not flat like a table. It has tall mountains with pointed peaks,
 *   smaller rounded hills, wide flat plains where we grow food and build cities, valleys
 *   between hills, and high flat-topped plateaus! Rivers like the Ganga and Yamuna flow
 *   from mountain glaciers down to the sea. And remember: weather changes every day,
 *   while climate stays the same for many years!"
 *
 * Misconceptions (from enrichment):
 *   1. "Mountains and hills are the same" → "No! Mountains are very tall with pointed peaks
 *      and snow on top, while hills are smaller and have rounded tops!"
 *   2. "Plains are boring and useless" → "No! Plains are flat, fertile land where millions
 *      of people live, grow crops like rice and wheat, and build cities easily!"
 *   3. "Rivers start from the sea and go up" → "No! Rivers start high up in mountains and
 *      glaciers as melting snow, and flow DOWN to the sea!"
 *   4. "Weather and climate are the same" → "No! Weather is what happens today (sunny or rainy),
 *      while climate is the average pattern over many years!"
 *   5. "All rivers flow east" → "No! Most rivers flow east to the Bay of Bengal, but some
 *      like the Narmada flow west into the Arabian Sea!"
 *
 * Story: "Join Ranger Ravi on an exciting journey across India! Explore tall mountains,
 *   green plains, mighty rivers like the Ganga, and learn the difference between today's
 *   weather and yearly climate!"
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
    title: 'Welcome to Landforms! ⛰️',
    text: 'A landform is a natural shape on the Earth. Mountains are very tall with pointed peaks and snow! Hills are smaller with rounded tops. Plains are wide flat land, great for farming and building cities!',
    emoji: '🏔️',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Welcome to landforms! Mountains are very tall with pointed peaks and snow! Hills are smaller with rounded tops. Plains are wide flat land, great for farming and building cities!',
  },
  {
    title: 'Valleys and Plateaus! 🌄',
    text: 'A valley is the low land between mountains or hills. A plateau is flat high land — it looks like a table raised high above the ground! The Deccan Plateau covers much of southern India.',
    emoji: '🏞️',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'A valley is the low land between mountains or hills. A plateau is flat high land, looking like a table raised high above the ground! The Deccan Plateau covers much of southern India.',
  },
  {
    title: 'Mighty Rivers of India! 🌊',
    text: 'A river is a natural stream of water starting in mountains and flowing to the sea. The Ganga is India is most important river! The Yamuna is its tributary, joining at Prayagraj.',
    emoji: '💧',
    bgColor: 'from-cyan-400 to-blue-600',
    spoken: 'A river is a natural stream of water starting in mountains and flowing to the sea. The Ganga is India is most important river! The Yamuna is its tributary, joining at Prayagraj.',
  },
  {
    title: 'Weather vs Climate! ☀️🌧️',
    text: 'Weather is what the sky is doing right now — sunny today, rainy tomorrow! Climate is the average weather over many years. India has three seasons: summer, winter, and monsoon!',
    emoji: '⛅',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Weather is what the sky is doing right now, like sunny today or rainy tomorrow! Climate is the average weather over many years. India has three seasons: summer, winter, and monsoon!',
  },
  {
    title: 'Be a Geography Hero! 🌟',
    text: 'Plains are densely populated because life is easy there. Mountains are sparsely populated because they are cold and steep. Keep our rivers clean and protect nature!',
    emoji: '🌿',
    bgColor: 'from-purple-400 to-indigo-600',
    spoken: 'Plains are densely populated because life is easy there. Mountains are sparsely populated because they are cold and steep. Keep our rivers clean and protect nature!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_mountain' | 'identify_plain' | 'sort_landforms' | 'farming_plain' | 'sort_rivers' | 'river_importance' | 'sort_weather_climate' | 'sort_mountain_plain';

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

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_mountain',
    question: 'What is a MOUNTAIN?',
    answer: 'A very tall landform with a pointed peak',
    options: [
      'A very tall landform with a pointed peak',
      'A flat area of low land',
      'A deep hole in the ground',
    ],
    hint: 'Think about the Himalayas! They rise very high into the sky and have pointed snowy tops.',
    misconception: 'Mountains are NOT flat or low! A mountain is very tall with a pointed peak called a summit. Hills are smaller with rounded tops, but mountains tower high above everything else!',
  },
  {
    type: 'identify_plain',
    question: 'What is a PLAIN?',
    answer: 'A large, flat area of low land',
    options: [
      'A tall mountain with snow',
      'A large, flat area of low land',
      'A steep rocky cliff',
    ],
    hint: 'Picture the floor of a room. Plains stretch out flat and low, watered by great rivers!',
    misconception: 'A plain is NOT a mountain or a cliff! Plains are flat, low land formed by rivers spreading rich soil. That is why millions of people live on plains like the Ganga plain!',
  },
  {
    type: 'sort_landforms',
    question: 'Drag each landform to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Match each landform: Mountain (pointed peak), Hill (rounded top), Plain (flat land), Valley (low land between hills), Plateau (flat table top high up)!',
    misconception: 'Remember: Mountains have pointed peaks with snow; hills have rounded tops; plains are flat low land; valleys lie between hills; plateaus are flat high land like tables!',
    sortItems: [
      { id: 'mountain', label: 'Mountain', icon: 'mountain', correctBin: 'bin-mountain' },
      { id: 'hill', label: 'Hill', icon: 'hill', correctBin: 'bin-hill' },
      { id: 'plain', label: 'Plain', icon: 'plain', correctBin: 'bin-plain' },
      { id: 'plateau', label: 'Plateau', icon: 'plateau', correctBin: 'bin-plateau' },
    ],
    bins: [
      { id: 'bin-mountain', label: 'Tall with peak ⛰️', color: '#3B82F6' },
      { id: 'bin-hill', label: 'Small & rounded 🏔️', color: '#10B981' },
      { id: 'bin-plain', label: 'Flat low land 🌾', color: '#F59E0B' },
      { id: 'bin-plateau', label: 'Flat high table 🪨', color: '#8B5CF6' },
    ],
  },
  {
    type: 'farming_plain',
    question: 'Which landform is BEST for farming and building large cities?',
    answer: 'Plain',
    options: ['Mountain', 'Plain', 'Plateau edge'],
    hint: 'Think where people build huge cities like Delhi and Patna. Is it flat and fertile or steep and rocky?',
    misconception: 'Mountains are steep, cold, and rocky, making farming and building very hard (sparsely populated)! Plains are flat and fertile, making them ideal for crops and cities (densely populated)!',
  },
  {
    type: 'sort_rivers',
    question: 'Drag each Indian river to its correct home!',
    answer: 'sort',
    options: [],
    hint: 'Ganga is the top river in northern plains. Yamuna joins Ganga at Prayagraj. Godavari is the longest in the south!',
    misconception: 'Do not confuse Indian rivers! The Ganga starts at Gangotri glacier, Yamuna is its tributary, and Godavari is the longest river in peninsular southern India!',
    sortItems: [
      { id: 'ganga', label: 'Ganga', icon: 'ganga', correctBin: 'bin-north' },
      { id: 'yamuna', label: 'Yamuna', icon: 'yamuna', correctBin: 'bin-tributary' },
      { id: 'godavari', label: 'Godavari', icon: 'godavari', correctBin: 'bin-south' },
      { id: 'brahmaputra', label: 'Brahmaputra', icon: 'brahmaputra', correctBin: 'bin-northeast' },
    ],
    bins: [
      { id: 'bin-north', label: 'Northern Ganga 💧', color: '#2563EB' },
      { id: 'bin-tributary', label: 'Ganga Tributary 🌊', color: '#0EA5E9' },
      { id: 'bin-south', label: 'Southern Peninsular 🌴', color: '#10B981' },
      { id: 'bin-northeast', label: 'Northeast Brahmaputra 🏔️', color: '#6366F1' },
    ],
  },
  {
    type: 'river_importance',
    question: 'Why are rivers extremely useful to us?',
    answer: 'They give water for drinking, farming, and transport',
    options: [
      'They give water for drinking, farming, and transport',
      'They make mountains taller every year',
      'They are only used for swimming in summer',
    ],
    hint: 'Rivers provide water to quench thirst, irrigate crops in fields, and carry boats!',
    misconception: 'Rivers do not make mountains taller! Rivers are life-givers: they provide drinking water, irrigate wheat and rice fields, and serve as water roads for transport!',
  },
  {
    type: 'sort_weather_climate',
    question: 'Sort these into Weather (today) or Climate (long-term pattern)!',
    answer: 'sort',
    options: [],
    hint: 'Weather changes daily (rain today, hot right now). Climate is what a place is like for many years (monsoon season, desert dry year-round)!',
    misconception: 'Weather is what happens right now and changes daily! Climate is the average weather pattern over 30 years or more. Mumbai is hot and humid every year (climate), but today might be cloudy (weather)!',
    sortItems: [
      { id: 'w1', label: 'Raining today', icon: 'rain', correctBin: 'bin-weather' },
      { id: 'w2', label: 'Hot right now', icon: 'sun', correctBin: 'bin-weather' },
      { id: 'c1', label: 'Monsoon every June', icon: 'cloud', correctBin: 'bin-climate' },
      { id: 'c2', label: 'Deserts dry all year', icon: 'thermometer', correctBin: 'bin-climate' },
    ],
    bins: [
      { id: 'bin-weather', label: 'Weather (Today) ⛅', color: '#F59E0B' },
      { id: 'bin-climate', label: 'Climate (Years) 📅', color: '#3B82F6' },
    ],
  },
  {
    type: 'sort_mountain_plain',
    question: 'Sort each feature into Mountain or Plain!',
    answer: 'sort',
    options: [],
    hint: 'Mountains are cold, steep, and rocky. Plains are flat, fertile, and easy to build on!',
    misconception: 'Mountains are cold with snow peaks and steep slopes where few people live. Plains are flat, low, and fertile where millions of people farm and build cities!',
    sortItems: [
      { id: 'm1', label: 'Snowy peak', icon: 'mountain', correctBin: 'bin-m' },
      { id: 'm2', label: 'Steep slopes', icon: 'hill', correctBin: 'bin-m' },
      { id: 'p1', label: 'Flat fertile soil', icon: 'plain', correctBin: 'bin-p' },
      { id: 'p2', label: 'Easy to build cities', icon: 'plateau', correctBin: 'bin-p' },
    ],
    bins: [
      { id: 'bin-m', label: 'Mountain 🏔️', color: '#1E40AF' },
      { id: 'bin-p', label: 'Plain 🌾', color: '#D97706' },
    ],
  },
];

// ─── Ranger Ravi Mascot ───────────────────────────────────────

function RangerRavi({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
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
            <linearGradient id="ranger-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="ranger-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Body / Shirt */}
          <rect x="22" y="45" width="31" height="30" rx="6" fill="url(#ranger-shirt)" stroke="#065F46" strokeWidth="1.5" />
          <rect x="34" y="45" width="7" height="30" fill="#047857" />
          {/* Neck */}
          <rect x="33" y="38" width="9" height="9" fill="url(#ranger-skin)" />
          {/* Head */}
          <circle cx="37.5" cy="27" r="13" fill="url(#ranger-skin)" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="33" cy="25" r="2" fill="#1F2937" />
          <circle cx="42" cy="25" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M34 31 Q37.5 35 41 31" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Ranger Hat */}
          <ellipse cx="37.5" cy="15" rx="18" ry="4" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          <path d="M26 14 Q37.5 2 49 14 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
          {/* Hat band */}
          <rect x="25" y="13" width="25" height="3" fill="#065F46" />
          {/* Binoculars around neck */}
          <rect x="31" y="43" width="5" height="7" rx="1" fill="#4B5563" />
          <rect x="39" y="43" width="5" height="7" rx="1" fill="#4B5563" />
          <path d="M33 43 Q37.5 40 42 43" stroke="#1F2937" strokeWidth="1.5" fill="none" />
          {/* Feet */}
          <ellipse cx="30" cy="80" rx="5" ry="3.5" fill="#4B5563" />
          <ellipse cx="45" cy="80" rx="5" ry="3.5" fill="#4B5563" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ──────────────────────────────────────────

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

// ─── Landform Scene Background (with SVG gradient) ────────────

function LandformScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width={width} height={height} fill="url(#sky-gradient)" />
        {/* Distant Mountains */}
        <path d="M0 250 L120 120 L250 250 L380 140 L520 250 L640 100 L720 200 L720 350 L0 350 Z" fill="#94A3B8" opacity="0.6" />
        {/* Main Mountains with Snow Peaks */}
        <path d="M40 320 L180 160 L320 320 Z" fill="url(#mountain-grad)" />
        <path d="M180 160 L205 195 L155 195 Z" fill="white" /> {/* Snow cap */}
        <path d="M450 340 L580 180 L720 340 Z" fill="url(#mountain-grad)" />
        <path d="M580 180 L605 210 L555 210 Z" fill="white" /> {/* Snow cap */}
        {/* Rolling Hills & Plains */}
        <path d="M0 280 Q200 240, 400 300 T720 280 L720 400 L0 400 Z" fill="#22C55E" opacity="0.8" />
        {/* Flowing River */}
        <path d="M320 300 Q380 340, 350 420 L400 420 Q440 340, 360 300 Z" fill="url(#river-grad)" />
      </svg>
      {/* Sun */}
      <div className="absolute top-4 left-6">
        <svg width="45" height="45" viewBox="0 0 45 45">
          <circle cx="22.5" cy="22.5" r="14" fill="#FBBF24" opacity="0.9" />
          <circle cx="22.5" cy="22.5" r="9" fill="#F59E0B" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Component Icons for Sort Cards ───────────────

function MountainIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M5 42 L25 10 L45 42 Z" fill="#475569" stroke="#334155" strokeWidth="2" />
      <path d="M25 10 L30 18 L20 18 Z" fill="white" />
    </svg>
  );
}

function HillIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M5 42 Q25 10, 45 42 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
    </svg>
  );
}

function PlainIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="25" width="40" height="15" fill="#F59E0B" rx="3" />
      <line x1="10" y1="20" x2="10" y2="25" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <line x1="20" y1="18" x2="20" y2="25" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="20" x2="30" y2="25" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="18" x2="40" y2="25" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PlateauIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M8 35 L15 20 L35 20 L42 35 Z" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" />
      <rect x="12" y="17" width="26" height="4" fill="#A78BFA" rx="1" />
    </svg>
  );
}

function GangaIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M5 15 Q25 5, 45 35" stroke="#2563EB" strokeWidth="5" fill="none" strokeLinecap="round" />
      <circle cx="25" cy="18" r="4" fill="#93C5FD" />
    </svg>
  );
}

function YamunaIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 40 Q25 20, 40 10" stroke="#0EA5E9" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function GodavariIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M5 25 Q25 35, 45 15" stroke="#10B981" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BrahmaputraIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 10 Q25 40, 40 25" stroke="#6366F1" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function RainWeatherIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="20" rx="14" ry="9" fill="#94A3B8" />
      <line x1="18" y1="32" x2="15" y2="40" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="32" x2="22" y2="40" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="32" x2="29" y2="40" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SunWeatherIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="12" fill="#F59E0B" />
      <circle cx="25" cy="25" r="16" stroke="#FBBF24" strokeWidth="2" strokeDasharray="4 4" fill="none" />
    </svg>
  );
}

function CloudWeatherIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="25" rx="16" ry="11" fill="#64748B" />
    </svg>
  );
}

function ThermometerWeatherIcon({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="21" y="10" width="8" height="26" rx="4" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="25" cy="35" r="6" fill="#EF4444" />
      <rect x="23" y="18" width="4" height="15" fill="#EF4444" />
    </svg>
  );
}

// ─── Render Sort Icon Helper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'mountain': return <MountainIcon size={size} />;
    case 'hill': return <HillIcon size={size} />;
    case 'plain': return <PlainIcon size={size} />;
    case 'plateau': return <PlateauIcon size={size} />;
    case 'ganga': return <GangaIcon size={size} />;
    case 'yamuna': return <YamunaIcon size={size} />;
    case 'godavari': return <GodavariIcon size={size} />;
    case 'brahmaputra': return <BrahmaputraIcon size={size} />;
    case 'rain': return <RainWeatherIcon size={size} />;
    case 'sun': return <SunWeatherIcon size={size} />;
    case 'cloud': return <CloudWeatherIcon size={size} />;
    case 'thermometer': return <ThermometerWeatherIcon size={size} />;
    default: return <MountainIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1.5`} style={{ width: 115, height: 90 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all duration-200 shadow-md ${isHovering ? 'scale-105 ring-4 ring-amber-300' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 shadow-inner" style={{ backgroundColor: color }}>
        <div className="w-3 h-3 rounded-full bg-white opacity-80" />
      </div>
      <span className="text-xs font-black text-gray-900 text-center tracking-tight leading-snug">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface LandformsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LandformsGame({ width = 720, height = 560, onComplete }: LandformsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge items state
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const challenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide text
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Speak challenge question
  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(challenge.question);
      speechManager.speak(challenge.question);
    }
  }, [screen, challengeIdx]);

  // Reset inactivity timer
  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && challenge) {
        setHintMessage(challenge.hint);
        setShowHint(true);
        audioManager.play('hint');
        speechManager.speak(challenge.hint);
        setMascotMood('thinking');
      }
    }, 10000);
  }, [screen, challenge]);

  useEffect(() => {
    resetInactivity();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, resetInactivity]);

  // Initialize sort positions when entering sort challenge
  useEffect(() => {
    if (challenge.type === 'sort_landforms' || challenge.type === 'sort_rivers' || challenge.type === 'sort_weather_climate' || challenge.type === 'sort_mountain_plain') {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems?.forEach((item, index) => {
        initialPos[item.id] = { x: 50 + index * 150, y: 390 };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [challengeIdx, challenge]);

  // Handle multiple-choice answers
  const handleMultipleChoice = (option: string) => {
    resetInactivity();
    if (option === challenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSuccessMessage('Fantastic! Correct answer! ⭐');
      setShowSuccessBanner(true);
      setSparklePos({ x: width / 2, y: height / 2 });
      speechManager.speak('Fantastic! That is correct!');
      setScore(prev => prev + 10);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMessage(challenge.misconception);
      setShowHint(true);
      speechManager.speak(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    resetInactivity();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    resetInactivity();
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bins coordinates
    // Bin 1: left 40, top 240, width 300, height 110
    // Bin 2: left 380, top 240, width 300, height 110
    // For 4 bins: 2x2 grid or horizontal row
    const binWidth = challenge.bins.length > 2 ? 145 : 300;
    const binHeight = 115;

    let matchedBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bx = challenge.bins?.length === 4 ? (idx % 2 === 0 ? 50 : 380) : (idx === 0 ? 50 : 380);
      const by = challenge.bins?.length === 4 ? (idx < 2 ? 220 : 340) : 250;

      if (x + 50 >= bx && x + 50 <= bx + binWidth && y + 45 >= by && y + 45 <= by + binHeight) {
        matchedBinId = bin.id;
      }
    });

    if (matchedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setItemPositions(prev => ({ ...prev, [id]: { x: -100, y: -100 } }));
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      // Check if all sort items are placed
      const allDone = challenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setSuccessMessage('Wonderful sorting! All correct! ⭐');
        setShowSuccessBanner(true);
        setSparklePos({ x: width / 2, y: height / 2 });
        speechManager.speak('Wonderful sorting! All correct!');
        setScore(prev => prev + 15);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMessage(challenge.misconception);
      setShowHint(true);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    setShowSuccessBanner(false);
    setShowHint(false);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
      speechManager.speak('Congratulations! You are a certified Landforms and Rivers Hero!');
    }
  };

  return (
    <div
      className="relative select-none flex flex-col items-center justify-between overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      {/* Background */}
      <LandformScene width={width} height={height} />

      {/* Header Bar */}
      <div className="relative z-20 w-full px-6 py-3 flex items-center justify-between bg-black/30 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-amber-300 drop-shadow">⛰️ Ranger Ravi's Landforms</span>
          {screen === 'play' && (
            <span className="text-xs font-bold text-cyan-200 bg-white/10 px-2.5 py-1 rounded-full">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={Math.min(5, Math.floor(score / 15) + 1)} total={5} />}
          <button
            onClick={() => {
              audioManager.play('tap');
              speechManager.stop();
              setScreen(screen === 'teaching' ? 'play' : 'teaching');
            }}
            className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-white font-bold rounded-xl shadow transition-transform active:scale-95 text-xs"
          >
            {screen === 'teaching' ? 'Play Game 🚀' : 'Teaching Guide 📖'}
          </button>
        </div>
      </div>

      {/* Mascot */}
      <RangerRavi mood={mascotMood} speaking={speakingText} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-4">
        {screen === 'teaching' ? (
          /* Teaching Slides Screen */
          <motion.div
            key="teaching"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl flex flex-col items-center text-center relative border-4 border-white/30`}
          >
            <span className="text-6xl mb-3 drop-shadow-lg">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6 drop-shadow px-4">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-auto pt-4 border-t border-white/20">
              <button
                disabled={slideIdx === 0}
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => Math.max(0, prev - 1));
                }}
                className={`px-4 py-2 rounded-xl font-bold text-sm bg-white/20 hover:bg-white/30 transition-all ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed' : ''}`}
              >
                ⬅️ Previous
              </button>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />
                ))}
              </div>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                  }
                }}
                className="px-5 py-2 rounded-xl font-bold text-sm bg-amber-400 hover:bg-amber-300 text-gray-900 shadow-lg transition-transform active:scale-95"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Play Screen */
          <motion.div
            key={`challenge-${challengeIdx}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-amber-300 flex flex-col items-center relative min-h-[350px] justify-between"
          >
            {/* Question Header */}
            <div className="text-center mb-4">
              <span className="text-xs font-black tracking-wider text-indigo-600 uppercase bg-indigo-50 px-3 py-1 rounded-full">
                Question {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h2 className="text-xl font-black text-gray-800 mt-2">{challenge.question}</h2>
            </div>

            {/* Multiple Choice Options */}
            {challenge.answer !== 'sort' && challenge.options && (
              <div className="w-full grid grid-cols-1 gap-3 my-auto max-w-md">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleMultipleChoice(opt)}
                    className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 hover:from-amber-100 hover:to-orange-100 border-2 border-amber-300 font-bold text-gray-800 text-base shadow-md transition-all text-left flex items-center justify-between"
                  >
                    <span>{opt}</span>
                    <span className="w-6 h-6 rounded-full bg-amber-400 text-white flex items-center justify-center text-xs font-black">
                      {['A', 'B', 'C'][idx]}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge Area */}
            {challenge.answer === 'sort' && challenge.bins && (
              <div className="w-full h-[250px] relative mt-2">
                {/* Bins */}
                {challenge.bins.map((bin, idx) => {
                  const is4 = challenge.bins?.length === 4;
                  const bx = is4 ? (idx % 2 === 0 ? 30 : 370) : (idx === 0 ? 30 : 370);
                  const by = is4 ? (idx < 2 ? 10 : 135) : 30;
                  const bw = is4 ? 300 : 300;
                  const bh = is4 ? 110 : 180;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={by}
                      width={bw}
                      height={bh}
                      isHovering={hoverBin === bin.id}
                    />
                  );
                })}

                {/* Draggable Items */}
                {challenge.sortItems?.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 390 };
                  const placed = placedItems[item.id] || false;
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
          </motion.div>
        )}
      </div>

      {/* Footer Info */}
      <div className="relative z-20 w-full py-2 px-6 bg-black/40 backdrop-blur-md flex items-center justify-between text-xs text-white/80 border-t border-white/10">
        <span>Score: <strong className="text-amber-300">{score}</strong></span>
        <span>CISCE Class 3 Geography • Landforms & Rivers</span>
        <span>Errors: <strong className="text-red-300">{errors}</strong></span>
      </div>

      {/* Confetti */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {/* Success Banner */}
      {showSuccessBanner && (
        <SuccessBanner
          message={successMessage}
          onComplete={() => {
            setShowSuccessBanner(false);
            advanceChallenge();
          }}
        />
      )}

      {/* Hint Bubble */}
      {showHint && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setShowHint(false)}
        />
      )}

      {/* Sparkle Burst */}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
    </div>
  );
}
