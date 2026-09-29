'use client';

/**
 * EarthSkyGame — Learn about the Earth, Sun, Moon, Stars, Physical Features, and Clean Food, Air & Water
 *
 * CISCE Nodes:
 * - c3_evs_004: The earth, sun, moon and stars - basic introduction
 * - c3_evs_005: Physical features of my locality
 * - c3_evs_006: Need for clean food, air and water
 *
 * ELI5: "The earth is our home in space, shaped like a big round ball with air and water.
 * In the day, the burning hot sun gives us light and heat. At night, the moon shines by reflecting
 * the sun's light and changes shape, while tiny stars twinkle far away. Around our home, we see
 * natural physical features like hills, plains, and rivers. Every day, we need clean food, clean air,
 * and clean water to stay healthy and strong!"
 *
 * Misconceptions (from enrichment):
 * 1. "The moon makes its own light, just like the sun" → "No! The moon reflects sunlight like a mirror!"
 * 2. "Stars are tiny because they are small" → "No! Stars are huge suns that look tiny because they are far away!"
 * 3. "All trees are natural features" → "No! Wild forest trees are natural, but park trees planted in rows are man-made!"
 * 4. "If water looks clear, it is safe to drink" → "No! Clear water can have invisible germs. We must boil or filter it!"
 * 5. "Covering food is only for keeping flies away" → "No! It also stops dust, insects, and germs!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Type Definitions ──────────────────────────────────────────

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

export interface EarthSkyGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Teaching Slides (5 slides) ────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Our Home: The Earth 🌍',
    text: 'The earth is the planet we live on! It is shaped like a big round ball floating in space, and it is the only home we have with air to breathe, water to drink, plants, and animals.',
    emoji: '🌍',
    bgColor: 'from-gold-400 to-gold-600',
    spoken: 'The earth is the planet we live on! It is shaped like a big round ball with air, water, plants, and animals.',
  },
  {
    title: 'The Sun, Moon & Stars ☀️🌙✨',
    text: 'The sun gives us light and heat during the day. The moon shines at night by reflecting sunlight and changes shape! Stars are huge distant suns that twinkle in the dark night sky.',
    emoji: '☀️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'The sun gives us light and heat. The moon reflects sunlight and changes shape. Stars twinkle far away in the night sky.',
  },
  {
    title: 'Physical Features of Our Locality 🏞️',
    text: 'Around our home and school, we see physical features made by nature! Mountains, hills, plains, valleys, and rivers like flowing streams are natural features of our locality.',
    emoji: '🏔️',
    bgColor: 'from-emerald-400 to-teal-600',
    spoken: 'Around our home we see natural physical features like mountains, hills, plains, valleys, and rivers.',
  },
  {
    title: 'Clean Food, Air & Water 💧🍎💨',
    text: 'To stay healthy and strong, we need clean food, clean air, and clean water! Dirty water has germs, uncovered food attracts flies, and smoky air causes coughing.',
    emoji: '💧',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'We need clean food, clean air, and clean water to stay healthy. Dirty water and spoiled food cause illness.',
  },
  {
    title: 'Healthy Habits Every Day! 🧼',
    text: 'Wash hands before eating, cover your food with a lid, drink boiled or filtered water, and play in fresh green parks to keep germs away and stay active!',
    emoji: '🧼',
    bgColor: 'from-green-500 to-emerald-700',
    spoken: 'Wash your hands, cover your food, drink boiled water, and breathe fresh air to keep germs away!',
  },
];

// ─── Challenges (8 progressive challenges) ──────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What does the Sun give us during the day?',
    answer: 'Light and heat',
    options: ['Light and heat', 'Cold ice and snow', 'Toys and books'],
    hint: 'Think about what makes the day bright and keeps us warm!',
    misconception: 'The sun is a huge ball of burning hot gases that gives us two vital gifts: light to see and heat to keep us warm and help plants grow!',
  },
  {
    type: 'identify',
    question: 'Why does the Moon appear to change its shape on different nights?',
    answer: 'We see different parts lit by the sun',
    options: ['We see different parts lit by the sun', 'The moon breaks into pieces', 'The moon hides behind clouds'],
    hint: 'The moon reflects sunlight. As it moves, we see different lit parts!',
    misconception: 'The moon does not break! It shines by reflecting sunlight, and as it orbits the earth, we see different illuminated parts, making it look like a silver plate or banana.',
  },
  {
    type: 'sort',
    question: 'Drag each sky object to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Match the sun, moon, stars, and earth to what they do!',
    misconception: 'Review sky basics: Sun gives light and heat; Moon reflects sunlight; Stars twinkle far away; Earth is our home planet!',
    sortItems: [
      { id: 'sun-item', label: 'Sun', icon: 'sun', correctBin: 'bin-sun' },
      { id: 'moon-item', label: 'Moon', icon: 'moon', correctBin: 'bin-moon' },
      { id: 'star-item', label: 'Stars', icon: 'star', correctBin: 'bin-star' },
      { id: 'earth-item', label: 'Earth', icon: 'earth', correctBin: 'bin-earth' },
    ],
    bins: [
      { id: 'bin-sun', label: 'Gives light & heat ☀️', color: '#F59E0B' },
      { id: 'bin-moon', label: 'Reflects sunlight 🌙', color: '#6366F1' },
      { id: 'bin-star', label: 'Twinkling dots ✨', color: '#8B5CF6' },
      { id: 'bin-earth', label: 'Our home planet 🌍', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a NATURAL physical feature of a locality?',
    answer: 'River',
    options: ['River', 'Plastic water tank', 'Paved road'],
    hint: 'Natural features are made by nature, not built by humans!',
    misconception: 'A river is a natural water body formed by nature! Water tanks and paved roads are man-made features built by people.',
  },
  {
    type: 'sort',
    question: 'Drag each physical feature to its correct type!',
    answer: 'sort',
    options: [],
    hint: 'Match mountains, rivers, plains, and ponds to their land/water types!',
    misconception: 'Physical features are natural land and water forms: Mountains are tall raised land, Rivers are flowing water, Plains are flat land, Ponds are small still water!',
    sortItems: [
      { id: 'mountain-item', label: 'Mountain', icon: 'mountain', correctBin: 'bin-land' },
      { id: 'river-item', label: 'River', icon: 'river', correctBin: 'bin-water' },
      { id: 'plain-item', label: 'Plain', icon: 'plain', correctBin: 'bin-land' },
      { id: 'pond-item', label: 'Pond', icon: 'pond', correctBin: 'bin-water' },
    ],
    bins: [
      { id: 'bin-land', label: 'Land Form ⛰️', color: '#10B981' },
      { id: 'bin-water', label: 'Water Body 🌊', color: '#0EA5E9' },
    ],
  },
  {
    type: 'identify',
    question: 'Why do we need CLEAN water to drink?',
    answer: 'Dirty water has germs that make us sick',
    options: ['Dirty water has germs that make us sick', 'Dirty water tastes sweeter', 'Dirty water is colder'],
    hint: 'Invisible germs in dirty water cause stomach ache and loose motions!',
    misconception: 'Clear-looking water can still contain invisible germs! Drinking dirty water causes stomach aches and diseases. We must boil or filter drinking water.',
  },
  {
    type: 'sort',
    question: 'Drag each item to Clean/Healthy or Dirty/Unhealthy!',
    answer: 'sort',
    options: [],
    hint: 'Filtered water and covered food keep us healthy. Uncovered food with flies and polluted air make us sick!',
    misconception: 'Clean food, water, and air protect our health. Uncovered food attracts flies and germs, and smoky air harms our lungs!',
    sortItems: [
      { id: 'clean-water-item', label: 'Filtered Water', icon: 'clean-water', correctBin: 'bin-clean' },
      { id: 'dirty-water-item', label: 'Puddle Water', icon: 'dirty-water', correctBin: 'bin-dirty' },
      { id: 'clean-food-item', label: 'Covered Food', icon: 'clean-food', correctBin: 'bin-clean' },
      { id: 'spoiled-food-item', label: 'Flies on Food', icon: 'spoiled-food', correctBin: 'bin-dirty' },
    ],
    bins: [
      { id: 'bin-clean', label: 'Clean & Healthy ✅', color: '#22C55E' },
      { id: 'bin-dirty', label: 'Dirty & Unhealthy ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each action to Keep Clean or Causes Pollution!',
    answer: 'sort',
    options: [],
    hint: 'Boiling water and planting trees keep us clean. Burning plastic and throwing waste cause pollution!',
    misconception: 'We must protect our environment! Planting trees gives us clean air, while throwing waste in rivers and burning plastic pollutes our earth.',
    sortItems: [
      { id: 'boil-item', label: 'Boil Drinking Water', icon: 'clean-water', correctBin: 'bin-keep' },
      { id: 'plastic-item', label: 'Burn Plastic', icon: 'smoke', correctBin: 'bin-pollute' },
      { id: 'tree-item', label: 'Plant Trees', icon: 'tree', correctBin: 'bin-keep' },
      { id: 'waste-item', label: 'Throw Waste in River', icon: 'dirty-water', correctBin: 'bin-pollute' },
    ],
    bins: [
      { id: 'bin-keep', label: 'Keep Clean 🌱', color: '#10B981' },
      { id: 'bin-pollute', label: 'Causes Pollution 🏭', color: '#F43F5E' },
    ],
  },
];

// ─── Custom SVG Icons for Topic Objects ────────────────────────

function SunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="12" fill="#F59E0B" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={25 + 16 * Math.cos((angle * Math.PI) / 180)}
          y1={25 + 16 * Math.sin((angle * Math.PI) / 180)}
          x2={25 + 22 * Math.cos((angle * Math.PI) / 180)}
          y2={25 + 22 * Math.sin((angle * Math.PI) / 180)}
          stroke="#F59E0B"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function MoonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M35 10 A18 18 0 1 1 15 35 A18 18 0 0 0 35 10 Z" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="22" cy="22" r="3" fill="#CBD5E1" opacity="0.6" />
      <circle cx="30" cy="32" r="2" fill="#CBD5E1" opacity="0.6" />
    </svg>
  );
}

function StarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 L30 18 L45 20 L33 30 L37 43 L25 35 L13 43 L17 30 L5 20 L20 18 Z" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5" />
    </svg>
  );
}

function EarthIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#3B82F6" />
      <path d="M15 15 Q25 10 35 20 Q40 30 30 38 Q15 40 12 28 Z" fill="#22C55E" opacity="0.8" />
      <path d="M30 10 Q38 12 35 20 Z" fill="#22C55E" opacity="0.8" />
    </svg>
  );
}

function MountainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <polygon points="25,5 45,45 5,45" fill="#64748B" />
      <polygon points="25,5 33,22 25,20 17,22" fill="#F8FAFC" />
      <polygon points="12,20 30,45 2,45" fill="#475569" />
    </svg>
  );
}

function RiverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect width="50" height="50" fill="#E0F2FE" rx="8" />
      <path d="M10 5 Q25 20 15 35 T40 45" stroke="#0284C7" strokeWidth="6" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function PlainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect width="50" height="50" fill="#ECFDF5" rx="8" />
      <path d="M5 35 Q25 25 45 35 L45 45 L5 45 Z" fill="#10B981" />
      <circle cx="15" cy="28" r="4" fill="#F59E0B" />
    </svg>
  );
}

function PondIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="25" rx="20" ry="14" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="18" cy="22" rx="5" ry="2" fill="#4ADE80" />
      <circle cx="30" cy="28" r="2" fill="#F43F5E" />
    </svg>
  );
}

function CleanWaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 8 C18 20, 12 26, 12 34 C12 41, 18 45, 25 45 C32 45, 38 41, 38 34 C38 26, 32 20, 25 8 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <ellipse cx="21" cy="32" rx="3" ry="5" fill="white" opacity="0.6" />
    </svg>
  );
}

function DirtyWaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 8 C18 20, 12 26, 12 34 C12 41, 18 45, 25 45 C32 45, 38 41, 38 34 C38 26, 32 20, 25 8 Z" fill="#78716C" stroke="#44403C" strokeWidth="1.5" />
      <circle cx="20" cy="30" r="3" fill="#1C1917" />
      <circle cx="30" cy="36" r="2.5" fill="#1C1917" />
    </svg>
  );
}

function CleanFoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="32" rx="20" ry="8" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M15 30 Q25 15 35 30 Z" fill="#EF4444" />
      <path d="M25 15 Q28 8 32 12 Z" fill="#22C55E" />
    </svg>
  );
}

function SpoiledFoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="32" rx="20" ry="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
      <path d="M15 30 Q25 18 35 30 Z" fill="#78350F" />
      {/* Fly */}
      <ellipse cx="22" cy="18" rx="3" ry="2" fill="#1E293B" />
      <ellipse cx="18" cy="15" rx="2" ry="3" fill="#94A3B8" opacity="0.7" />
      <ellipse cx="26" cy="15" rx="2" ry="3" fill="#94A3B8" opacity="0.7" />
    </svg>
  );
}

function SmokeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="18" y="30" width="14" height="15" fill="#475569" />
      <circle cx="25" cy="24" r="6" fill="#94A3B8" opacity="0.8" />
      <circle cx="20" cy="15" r="8" fill="#CBD5E1" opacity="0.7" />
      <circle cx="30" cy="8" r="6" fill="#E2E8F0" opacity="0.6" />
    </svg>
  );
}

function TreeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="22" y="30" width="6" height="15" fill="#78350F" />
      <circle cx="25" cy="20" r="14" fill="#22C55E" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'sun': return <SunIcon size={size} />;
    case 'moon': return <MoonIcon size={size} />;
    case 'star': return <StarIcon size={size} />;
    case 'earth': return <EarthIcon size={size} />;
    case 'mountain': return <MountainIcon size={size} />;
    case 'river': return <RiverIcon size={size} />;
    case 'plain': return <PlainIcon size={size} />;
    case 'pond': return <PondIcon size={size} />;
    case 'clean-water': return <CleanWaterIcon size={size} />;
    case 'dirty-water': return <DirtyWaterIcon size={size} />;
    case 'clean-food': return <CleanFoodIcon size={size} />;
    case 'spoiled-food': return <SpoiledFoodIcon size={size} />;
    case 'smoke': return <SmokeIcon size={size} />;
    case 'tree': return <TreeIcon size={size} />;
    default: return <SunIcon size={size} />;
  }
}

// ─── Skywatcher Sana Mascot ───────────────────────────────────

function SkywatcherSana({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-4 py-2.5 shadow-xl max-w-[240px] border-2 border-gold-300"
          >
            <p className="text-xs font-bold text-gray-800 leading-snug">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
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
          {/* Body / Dress */}
          <path d="M22 55 L53 55 L60 82 L15 82 Z" fill="#0284C7" />
          {/* Scarf */}
          <path d="M25 45 Q37 52 50 45 L52 52 Q37 60 23 52 Z" fill="#38BDF8" />
          {/* Head */}
          <circle cx="37" cy="30" r="16" fill="#FDE047" />
          <circle cx="37" cy="30" r="14" fill="#FED7AA" />
          {/* Hair */}
          <path d="M23 25 Q37 10 51 25 Q45 15 37 15 Q29 15 23 25 Z" fill="#78350F" />
          {/* Eyes */}
          <circle cx="31" cy="28" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="28" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="27" r="1" fill="white" />
          <circle cx="44" cy="27" r="1" fill="white" />
          {/* Smile */}
          <path d="M33 36 Q37 40 41 36" stroke="#9A3412" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Telescope in hand */}
          <rect x="48" y="45" width="20" height="6" rx="3" fill="#94A3B8" transform="rotate(-30 48 45)" />
          <circle cx="65" cy="35" r="4" fill="#CBD5E1" />
          {/* Feet */}
          <ellipse cx="27" cy="85" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="48" cy="85" rx="5" ry="3" fill="#1E293B" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 items-center bg-black/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
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

// ─── EarthSky Scene Background ────────────────────────────────

function EarthSkyScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="35%" stopColor="#312E81" />
            <stop offset="65%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#166534" />
            <stop offset="100%" stopColor="#14532D" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />

        {/* Twinkling stars */}
        {[
          { cx: 60, cy: 40 }, { cx: 140, cy: 70 }, { cx: 220, cy: 30 }, { cx: 310, cy: 85 },
          { cx: 400, cy: 45 }, { cx: 490, cy: 65 }, { cx: 580, cy: 35 }, { cx: 660, cy: 80 },
        ].map((s, idx) => (
          <circle key={idx} cx={s.cx} cy={s.cy} r="2" fill="white" opacity="0.8" />
        ))}

        {/* Sun in sky */}
        <circle cx="100" cy="100" r="30" fill="#F59E0B" opacity="0.9" />

        {/* Mountains */}
        <polygon points="0,400 150,220 300,400" fill="#334155" />
        <polygon points="200,400 380,180 560,400" fill="#1E293B" />
        <polygon points="450,400 600,250 720,400" fill="#475569" />

        {/* Ground */}
        <rect x="0" y="400" width={width} height={height - 400} fill="url(#ground-grad)" />
      </svg>
    </div>
  );
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-gold-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1.5`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all shadow-lg ${isHovering ? 'scale-105 shadow-2xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-900 text-center drop-shadow-sm">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export function EarthSkyGame({ width = 720, height = 560, onComplete }: EarthSkyGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showHintBubble, setShowHintBubble] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>(null);

  // Multiple choice state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Sort state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  // Inactivity timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Speak teaching slide when slideIdx changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text.slice(0, 50) + '...');
    }
  }, [screen, slideIdx]);

  // Speak challenge question when challenge changes
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setMascotMood('happy');
      setSelectedOption(null);
      setPlacedItems({});
      setShowHintBubble(false);

      // Reset inactivity timer
      resetInactivityTimer();
    }
  }, [screen, challengeIdx]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setShowHintBubble(true);
        setMascotMood('thinking');
        speechManager.speak(currentChallenge.hint);
      }
    }, 10000);
  }, [currentChallenge]);

  // Handle Multiple Choice Answer
  const handleSelectOption = (opt: string) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(opt);

    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      speechManager.speak('Great job! That is correct!');
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(prev => prev + 1);
      setShowSuccessBanner(true);
      setSuccessMsg('Wonderful! ⭐ +1 Star');
    } else {
      audioManager.play('error');
      speechManager.speak(currentChallenge.misconception);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      setErrors(prev => prev + 1);
      setShowHintBubble(true);
    }
  };

  // Handle Sort Drag Start
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    setDraggingId(id);
    resetInactivityTimer();
  };

  // Handle Sort Drag End
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    setDraggingId(null);
    if (!currentChallenge.bins || !currentChallenge.sortItems) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bin collision
    const binWidth = 140;
    const binHeight = 110;
    const binY = height - 160;

    for (let i = 0; i < currentChallenge.bins.length; i++) {
      const bin = currentChallenge.bins[i];
      const binX = 40 + i * (width - 80) / Math.max(1, currentChallenge.bins.length - 1);

      if (x + 55 >= binX && x + 55 <= binX + binWidth && y + 45 >= binY && y + 45 <= binY + binHeight) {
        setHoveringBin(null);
        if (bin.id === item.correctBin) {
          audioManager.play('drop-correct');
          speechManager.speak('Correct placement!');
          setSparklePos({ x: x + 55, y: y + 45 });

          const updatedPlaced = { ...placedItems, [id]: true };
          setPlacedItems(updatedPlaced);

          const allDone = currentChallenge.sortItems.every(si => updatedPlaced[si.id]);
          if (allDone) {
            audioManager.play('success');
            speechManager.speak('Amazing! All items sorted correctly!');
            setMascotMood('celebrate');
            setMascotSpeech('All sorted! You are a superstar!');
            setStars(prev => prev + 1);
            setShowSuccessBanner(true);
            setSuccessMsg('Sorting Complete! ⭐ +1 Star');
          }
          return true;
        } else {
          audioManager.play('drop-wrong');
          speechManager.speak(currentChallenge.misconception);
          setMascotMood('thinking');
          setMascotSpeech(currentChallenge.misconception);
          setErrors(prev => prev + 1);
          setShowHintBubble(true);
          return false;
        }
      }
    }
    return false;
  };

  // Advance to next challenge or complete game
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    setShowHintBubble(false);
    setSelectedOption(null);

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You completed all challenges and became a master Earth and Sky explorer!');
      setMascotMood('celebrate');
      setMascotSpeech('You did it! Master Explorer!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, background: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)' }}
    >
      {/* Background Scene */}
      <EarthSkyScene width={width} height={height} />

      {/* Mascot */}
      <SkywatcherSana mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti & Sparkles */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {/* Success Banner */}
      {showSuccessBanner && (
        <SuccessBanner
          message={successMsg}
          onComplete={handleNextChallenge}
        />
      )}

      {/* Hint Bubble */}
      {showHintBubble && currentChallenge && (
        <HintBubble
          message={currentChallenge.hint}
          onComplete={() => setShowHintBubble(false)}
        />
      )}

      {/* ─── SCREEN 1: TEACHING ───────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-black/40 backdrop-blur-md">
          {/* Header */}
          <div className="flex justify-between items-center">
            <span className="text-white font-black text-lg tracking-wide drop-shadow">
              🌍 Earth & Sky Academy • Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/40'}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Content Card */}
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`mx-auto my-auto max-w-lg w-full rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4 p-4 rounded-full bg-white/20 shadow-inner">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-extrabold mb-3 drop-shadow-md">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-base font-medium leading-relaxed drop-shadow">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold text-white shadow-lg transition-all ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed bg-gray-600' : 'bg-gold-600 hover:bg-gold-500'}`}
            >
              ⬅️ Previous
            </button>

            <button
              onClick={() => {
                audioManager.play('success');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl transition-all text-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY (CHALLENGES) ──────────────────────── */}
      {screen === 'play' && currentChallenge && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-black/30 backdrop-blur-sm">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="bg-gold-500/80 text-white font-black text-xs px-3 py-1.5 rounded-full shadow">
                Level {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                setShowHintBubble(true);
                speechManager.speak(currentChallenge.hint);
              }}
              className="flex items-center gap-1.5 bg-amber-500/90 hover:bg-amber-400 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-lg transition-all"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Card */}
          <div className="bg-white/95 rounded-3xl p-6 shadow-2xl mx-auto max-w-xl w-full border-4 border-gold-300 text-center my-auto">
            <h3 className="text-xl font-extrabold text-gray-900 mb-6 leading-snug">
              {currentChallenge.question}
            </h3>

            {/* Multiple Choice Options */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3.5">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentChallenge.answer;
                  let btnBg = 'bg-gold-50 hover:bg-gold-100 text-gray-800 border-gold-200';

                  if (selectedOption !== null) {
                    if (isCorrect) btnBg = 'bg-emerald-500 text-white border-emerald-600 scale-[1.02]';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-rose-600';
                    else btnBg = 'bg-gray-100 text-gray-400 border-gray-200 opacity-60';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={selectedOption === null ? { scale: 1.02 } : {}}
                      whileTap={selectedOption === null ? { scale: 0.98 } : {}}
                      onClick={() => handleSelectOption(opt)}
                      disabled={selectedOption !== null}
                      className={`p-4 rounded-2xl font-bold text-base border-2 shadow-md transition-all flex items-center justify-center ${btnBg}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Challenge Area */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative h-[240px] w-full mt-2">
                {/* Bins at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-around px-4">
                  {currentChallenge.bins.map((bin, i) => {
                    const binWidth = 140;
                    const binHeight = 110;
                    const binX = 20 + i * (width - 120) / Math.max(1, currentChallenge.bins!.length - 1);
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={binX - 40}
                        y={height - 290}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoveringBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable items */}
                {currentChallenge.sortItems.map((item, idx) => {
                  const placed = !!placedItems[item.id];
                  const startX = 50 + idx * 135;
                  const startY = 10;
                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={startX}
                      y={startY}
                      placed={placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Navigation */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                audioManager.play('tap');
                setScreen('teaching');
              }}
              className="px-4 py-2 rounded-xl font-bold text-xs bg-white/20 hover:bg-white/30 text-white backdrop-blur transition-all"
            >
              📖 Review Lessons
            </button>

            {currentChallenge.type === 'sort' && (
              <button
                onClick={() => {
                  // Skip or proceed if all sorted
                  const allDone = currentChallenge.sortItems?.every(i => placedItems[i.id]);
                  if (allDone || stars > challengeIdx) {
                    handleNextChallenge();
                  } else {
                    audioManager.play('hint');
                    speechManager.speak('Drag all items into their correct bins first!');
                    setShowHintBubble(true);
                  }
                }}
                className="px-6 py-2.5 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-lg transition-all"
              >
                Continue ➡️
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
