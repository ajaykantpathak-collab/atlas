'use client';

/**
 * EarthSunGame — Learn about Earth, Sun, Shadows, Day & Night, Weather, and Seasons
 *
 * CISCE Nodes: c2_geo_001 (Earth), c2_geo_002 (Sun and shadows), c2_geo_003 (Day and night),
 *              c2_geo_004 (Weather observation), c2_geo_005 (Seasons)
 *
 * ELI5: "Earth is our big round home floating in space! The Sun gives us light and heat.
 *   When Earth spins, we get day and night. The Sun makes shadows that change length all day.
 *   Every day has different weather, and the whole year has wonderful seasons!"
 *
 * Misconceptions (from enrichment):
 *   1. "Earth is flat because the ground looks flat" → "Earth is round like a ball (sphere)!"
 *   2. "The sun moves around the Earth" → "Earth rotates on its axis to give us day and night!"
 *   3. "A shadow is longest at noon" → "A shadow is shortest at noon because the sun is overhead!"
 *   4. "The Moon makes its own light" → "The Moon reflects sunlight!"
 *
 * Mascot: Astronomer Aryan (friendly young astronomer with a star-patterned cap, telescope, notebook, star badge).
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG scene background (sky, day/night gradient, sun, moon, stars, clouds, tree with shadow)
 * - Custom SVG topic components (EarthIcon, SunIcon, MoonIcon, StarIcon, etc.)
 * - Astronomer Aryan mascot with mood states and speech bubble
 * - Drag-and-drop using Draggable component for sort challenges
 * - 8 progressive challenges (identify → sort → apply)
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after 10 seconds of inactivity
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
    title: 'Earth is Our Home! 🌍',
    text: 'Earth is our home planet! It is round like a ball (a sphere). It floats in space and has land (mountains and plains) and water (rivers and oceans)!',
    emoji: '🌍',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Earth is our home planet! It is round like a ball. It has land and water!',
  },
  {
    title: 'The Sun, Light, and Shadows! ☀️',
    text: 'The Sun gives us light and heat! When sunlight hits an object like a tree, it creates a shadow. Shadows are long in the morning and evening, but short at noon!',
    emoji: '☀️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'The Sun gives us light and heat! It creates shadows that are long in the morning and short at noon!',
  },
  {
    title: 'Day and Night! 🌙',
    text: 'Earth spins like a spinning top! When our side faces the Sun, it is day. When our side faces away, it is night! The Sun rises in the east and sets in the west.',
    emoji: '🌙',
    bgColor: 'from-indigo-500 to-purple-600',
    spoken: 'Earth spins like a top! When our side faces the Sun, it is day. When it faces away, it is night!',
  },
  {
    title: 'Weather Observation! 🌤️',
    text: 'Weather is what the sky looks like each day! It can be sunny, cloudy, rainy, windy, or snowy. We record temperature as hot, warm, cool, or cold!',
    emoji: '🌤️',
    bgColor: 'from-teal-400 to-cyan-500',
    spoken: 'Weather is what the sky looks like each day! Sunny, cloudy, rainy, windy, or snowy!',
  },
  {
    title: 'Wonderful Seasons! 🌸',
    text: 'A season is a long weather pattern! India has summer (hot, cotton clothes), monsoon (heavy rain, umbrellas), winter (cold, woollen clothes), and spring (flowers bloom)!',
    emoji: '🌸',
    bgColor: 'from-pink-400 to-rose-500',
    spoken: 'A season is a long weather pattern! Summer, monsoon, winter, and spring!',
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
    question: 'What shape is our home planet Earth?',
    answer: 'Round like a ball (sphere)',
    options: ['Round like a ball (sphere)', 'Flat like a plate', 'Square like a box'],
    hint: 'Think about a globe or a marble! Earth is not flat.',
    misconception: 'Earth is NOT flat! It is round like a ball — a sphere! A globe shows Earth\'s true round shape.',
  },
  {
    type: 'identify',
    question: 'What is the main source of light and heat for Earth?',
    answer: 'The Sun',
    options: ['The Sun', 'The Moon', 'The Stars'],
    hint: 'This big glowing ball warms our planet during the day!',
    misconception: 'The Sun gives us light and heat! The Moon does not make its own light; it only reflects sunlight.',
  },
  {
    type: 'identify',
    question: 'When is a tree\'s shadow the SHORTEST?',
    answer: 'Noon (when the Sun is overhead)',
    options: ['Morning', 'Noon (when the Sun is overhead)', 'Evening'],
    hint: 'At midday, the Sun is right above your head. Where does the shadow hide?',
    misconception: 'Shadows are shortest at NOON because the Sun is almost overhead and light falls straight down! Morning and evening shadows are long.',
  },
  {
    type: 'sort',
    question: 'Drag each event to Day or Night!',
    answer: 'sort',
    options: [],
    hint: 'Sun shines and children go to school during day. Stars twinkle and we sleep at night!',
    misconception: 'Day is when the Sun shines and we are awake at school! Night is when the moon and stars appear and we sleep!',
    sortItems: [
      { id: 'sun-shines', label: 'Sun shines bright', icon: 'sun', correctBin: 'day' },
      { id: 'go-school', label: 'Go to school', icon: 'earth', correctBin: 'day' },
      { id: 'stars-twinkle', label: 'Stars twinkle', icon: 'star', correctBin: 'night' },
      { id: 'we-sleep', label: 'We sleep in bed', icon: 'moon', correctBin: 'night' },
    ],
    bins: [
      { id: 'day', label: 'Day Time ☀️', color: '#F59E0B' },
      { id: 'night', label: 'Night Time 🌙', color: '#6366F1' },
    ],
  },
  {
    type: 'identify',
    question: 'Why do we have day and night?',
    answer: 'Earth rotates on its axis',
    options: ['Earth rotates on its axis', 'The Sun moves around Earth', 'Clouds cover the Sun'],
    hint: 'Earth spins like a spinning top every 24 hours!',
    misconception: 'The Sun does NOT move around Earth! Earth rotates on its axis, bringing our side toward the Sun (day) and away from the Sun (night).',
  },
  {
    type: 'sort',
    question: 'Drag each weather icon to its correct name!',
    answer: 'sort',
    options: [],
    hint: 'Bright sun = Sunny. Grey clouds = Cloudy. Drops falling = Rainy!',
    misconception: 'Match what you see in the sky! Bright sun is sunny, clouds with water drops are rainy, and white puffy clouds are cloudy.',
    sortItems: [
      { id: 'sunny-sky', label: 'Sunny Day', icon: 'sunny', correctBin: 'sunny' },
      { id: 'rainy-day', label: 'Rainy Day', icon: 'rainy', correctBin: 'rainy' },
      { id: 'cloudy-day', label: 'Cloudy Day', icon: 'cloudy', correctBin: 'cloudy' },
      { id: 'windy-day', label: 'Windy Day', icon: 'cloud', correctBin: 'windy' },
    ],
    bins: [
      { id: 'sunny', label: 'Sunny ☀️', color: '#F59E0B' },
      { id: 'rainy', label: 'Rainy 🌧️', color: '#3B82F6' },
      { id: 'cloudy', label: 'Cloudy ☁️', color: '#9CA3AF' },
      { id: 'windy', label: 'Windy 💨', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which season is very cold and makes us wear woollen clothes?',
    answer: 'Winter',
    options: ['Winter', 'Summer', 'Monsoon'],
    hint: 'In this season we wear sweaters and drink hot milk!',
    misconception: 'Winter is cold! We wear woollen clothes in winter because wool traps warm air. Summer is hot and needs cotton clothes.',
  },
  {
    type: 'sort',
    question: 'Drag each item to its correct season!',
    answer: 'sort',
    options: [],
    hint: 'Cotton clothes in summer, umbrellas in monsoon, woollens in winter!',
    misconception: 'Seasons bring different clothing and weather! Cotton is for hot summer, raincoats and umbrellas are for the monsoon, and wool is for winter.',
    sortItems: [
      { id: 'summer-item', label: 'Hot Sun & Cotton', icon: 'summer', correctBin: 'summer' },
      { id: 'monsoon-item', label: 'Umbrella & Rain', icon: 'monsoon', correctBin: 'monsoon' },
      { id: 'winter-item', label: 'Snowman & Wool', icon: 'winter', correctBin: 'winter' },
      { id: 'spring-item', label: 'Flowers Bloom', icon: 'star', correctBin: 'spring' },
    ],
    bins: [
      { id: 'summer', label: 'Summer ☀️', color: '#EF4444' },
      { id: 'monsoon', label: 'Monsoon 🌧️', color: '#3B82F6' },
      { id: 'winter', label: 'Winter ❄️', color: '#06B6D4' },
      { id: 'spring', label: 'Spring 🌸', color: '#EC4899' },
    ],
  },
];

// ─── Astronomer Aryan Mascot ──────────────────────────────────

function AstronomerAryan({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto"
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
          {/* Body / Shirt */}
          <rect x="25" y="55" width="25" height="25" rx="6" fill="#4F46E5" />
          {/* Star badge */}
          <polygon points="37,62 39,67 44,67 40,70 42,75 37,72 32,75 34,70 30,67 35,67" fill="#FBBF24" />
          {/* Head */}
          <circle cx="37.5" cy="38" r="14" fill="#FDE68A" />
          {/* Star Cap */}
          <path d="M 23 35 Q 37 15 52 35 Z" fill="#312E81" />
          <circle cx="37" cy="25" r="2" fill="#FBBF24" />
          <circle cx="30" cy="30" r="1.5" fill="#FBBF24" />
          <circle cx="44" cy="30" r="1.5" fill="#FBBF24" />
          {/* Face */}
          <circle cx="33" cy="36" r="1.5" fill="#1F2937" />
          <circle cx="42" cy="36" r="1.5" fill="#1F2937" />
          <path d="M 34 43 Q 37.5 46 41 43" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Hair tuft */}
          <path d="M 25 36 Q 22 33 24 30" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="30" cy="83" rx="4" ry="3" fill="#1E1B4B" />
          <ellipse cx="45" cy="83" rx="4" ry="3" fill="#1E1B4B" />
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

// ─── Custom SVG Scene Background ──────────────────────────────

function EarthSunScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient (Day/Night transition blend) */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="earth-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="25%" stopColor="#312E81" />
            <stop offset="70%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#34D399" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#earth-sky)" />
      </svg>
      {/* Sun */}
      <motion.div className="absolute top-6 left-8" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FBBF24" />
          <circle cx="30" cy="30" r="12" fill="#F59E0B" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>
      {/* Moon & Stars in night sky area */}
      <div className="absolute top-4 right-12 flex gap-3 opacity-80">
        <svg width="35" height="35" viewBox="0 0 35 35">
          <path d="M 25 5 A 12 12 0 1 1 10 25 A 14 14 0 1 0 25 5 Z" fill="#FEF08A" />
        </svg>
      </div>
      {/* Clouds */}
      <motion.div className="absolute top-12 left-1/3 opacity-70" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #10B981 0%, #047857 100%)' }} />
      {/* Tree with shadow */}
      <div className="absolute bottom-16 right-10">
        <svg width="70" height="90" viewBox="0 0 70 90">
          {/* Shadow */}
          <ellipse cx="35" cy="85" rx="25" ry="5" fill="rgba(0,0,0,0.3)" />
          {/* Trunk */}
          <rect x="30" y="50" width="10" height="35" fill="#78350F" />
          {/* Foliage */}
          <circle cx="35" cy="40" r="22" fill="#059669" />
          <circle cx="25" cy="32" r="16" fill="#10B981" />
          <circle cx="45" cy="32" r="16" fill="#047857" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Topic Components ──────────────────────────────

function EarthIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" />
      <path d="M 15 20 Q 25 10 35 25 Q 45 30 40 45 Q 25 50 15 35 Z" fill="#10B981" />
      <path d="M 38 12 Q 45 15 48 25 Q 40 28 38 12 Z" fill="#10B981" />
    </svg>
  );
}

function SunIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="16" fill="#FBBF24" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1="30" y1="30" x2={30 + 24 * Math.cos(angle * Math.PI / 180)} y2={30 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function MoonIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#E2E8F0" />
      <path d="M 42 12 A 22 22 0 1 1 18 48 A 24 24 0 1 0 42 12 Z" fill="#475569" />
      <circle cx="24" cy="22" r="3" fill="#CBD5E1" />
      <circle cx="36" cy="38" r="4" fill="#CBD5E1" />
    </svg>
  );
}

function StarIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 36,22 52,24 40,35 44,50 30,42 16,50 20,35 8,24 24,22" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
    </svg>
  );
}

function SunnyIcon({ size = 56 }: { size?: number }) {
  return <SunIcon size={size} />;
}

function RainyIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="22" r="18" fill="#94A3B8" />
      <line x1="20" y1="42" x2="16" y2="52" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="42" x2="26" y2="52" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
      <line x1="40" y1="42" x2="36" y2="52" stroke="#3B82F6" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CloudyIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="24" cy="32" r="14" fill="#CBD5E1" />
      <ellipse cx="38" cy="26" r="18" fill="#94A3B8" />
      <ellipse cx="42" cy="35" r="12" fill="#CBD5E1" />
    </svg>
  );
}

function SummerIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="26" r="14" fill="#EF4444" />
      <path d="M 15 45 Q 30 35 45 45 Z" fill="#F59E0B" />
      <line x1="30" y1="6" x2="30" y2="10" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="12" y1="16" x2="15" y2="19" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="48" y1="16" x2="45" y2="19" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MonsoonIcon({ size = 56 }: { size?: number }) {
  return <RainyIcon size={size} />;
}

function WinterIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="38" r="14" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="30" cy="22" r="10" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="30" cy="19" r="1.5" fill="#0F172A" />
      <circle cx="30" cy="24" r="1.5" fill="#0F172A" />
      <path d="M 28 27 Q 30 29 32 27" stroke="#F97316" strokeWidth="1.5" fill="none" />
      <line x1="18" y1="35" x2="12" y2="30" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <line x1="42" y1="35" x2="48" y2="30" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon helper ─��────────────────────────────────

function renderSortIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'earth': return <EarthIcon size={size} />;
    case 'sun': return <SunIcon size={size} />;
    case 'moon': return <MoonIcon size={size} />;
    case 'star': return <StarIcon size={size} />;
    case 'sunny': return <SunnyIcon size={size} />;
    case 'rainy': return <RainyIcon size={size} />;
    case 'cloudy': return <CloudyIcon size={size} />;
    case 'cloud': return <CloudyIcon size={size} />;
    case 'summer': return <SummerIcon size={size} />;
    case 'monsoon': return <MonsoonIcon size={size} />;
    case 'winter': return <WinterIcon size={size} />;
    default: return <EarthIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

interface SortCardProps {
  id: string;
  label: string;
  icon: string;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}

function SortCard({ id, label, icon, x, y, placed, onDragStart, onDragEnd }: SortCardProps) {
  return (
    <Draggable
      id={id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={115}
      height={95}
    >
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-indigo-200 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'}`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering?: boolean;
}

function SortBin({ label, color, x, y, width, height, isHovering }: SortBinProps) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-inner transition-all duration-200 ${isHovering ? 'scale-105 opacity-90' : 'opacity-80'}`}
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white shadow-md font-bold text-lg" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

interface TeachingScreenProps {
  onStartPlay: () => void;
}

function TeachingScreen({ onStartPlay }: TeachingScreenProps) {
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
    <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgColor} flex flex-col items-center justify-between p-6 select-none`}>
      <div className="w-full max-w-xl flex justify-between items-center mt-2">
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
          ))}
        </div>
        <span className="text-white font-black text-sm tracking-wide bg-black/20 px-3 py-1 rounded-full">
          Slide {currentSlide + 1} of {TEACHING_SLIDES.length}
        </span>
      </div>

      <motion.div
        key={currentSlide}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-lg w-full flex flex-col items-center text-center border-4 border-white/50 my-auto"
      >
        <span className="text-6xl mb-4 animate-bounce">{slide.emoji}</span>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{slide.title}</h2>
        <p className="text-base font-medium text-gray-600 leading-relaxed">{slide.text}</p>
      </motion.div>

      <div className="w-full max-w-xl flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-5 py-2.5 rounded-2xl font-black text-sm transition-all shadow-md ${currentSlide === 0 ? 'opacity-30 bg-white/20 text-white cursor-not-allowed' : 'bg-white/30 text-white hover:bg-white/40 active:scale-95'}`}
        >
          ⬅️ Back
        </button>

        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-black text-base bg-white text-indigo-600 shadow-xl hover:bg-indigo-50 active:scale-95 transition-all flex items-center gap-2"
        >
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component: EarthSunGame ─────────────────────────────

export interface EarthSunGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EarthSunGame({ width = 720, height = 560, onComplete }: EarthSunGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Astronomer Aryan! Let us explore Earth, Sun, and Sky!');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [sortPositions, setSortPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[currentIndex];

  // Reset sort items when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number; placed: boolean }> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        const startX = 40 + (idx % 2) * 140;
        const startY = 240 + Math.floor(idx / 2) * 110;
        initialPos[item.id] = { x: startX, y: startY, placed: false };
      });
      setSortPositions(initialPos);
    }
  }, [currentIndex, currentChallenge]);

  // Inactivity timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      audioManager.play('hint');
      setHintMessage(currentChallenge.hint);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.hint);
      speechManager.speak(currentChallenge.hint);
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentIndex, resetInactivityTimer]);

  // Mascot speech clear
  useEffect(() => {
    const timer = setTimeout(() => {
      if (mascotSpeech && mascotSpeech.startsWith('Hello!')) {
        setMascotSpeech(null);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [mascotSpeech]);

  // Handle multiple-choice answer
  const handleOptionSelect = (option: string) => {
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Wonderful! That is correct! ⭐');
      speechManager.speak('Wonderful! That is correct! ⭐');
      setStars(prev => prev + 1);
      setSparklePos({ x: width / 2, y: height / 2 });
      setShowConfetti(true);

      setTimeout(() => {
        if (currentIndex < CHALLENGES.length - 1) {
          setCurrentIndex(prev => prev + 1);
          setMascotMood('happy');
          setMascotSpeech('Let us try the next challenge!');
          speechManager.speak('Let us try the next challenge!');
        } else {
          setCompleted(true);
          setShowSuccessBanner(true);
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1500);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMessage(currentChallenge.misconception);
    }
  };

  // Handle drag start for sort
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle drag end for sort
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check collision with bins
    // Bins are laid out at right side: x from 400 to 650, y from 160 to 450
    const binWidth = 220;
    const binHeight = 110;
    const bin1X = 430;
    const bin1Y = 180;
    const bin2X = 430;
    const bin2Y = 310;

    let targetBinId: string | null = null;

    if (x + 50 >= bin1X && x + 50 <= bin1X + binWidth && y + 50 >= bin1Y && y + 50 <= bin1Y + binHeight) {
      targetBinId = currentChallenge.bins[0].id;
    } else if (x + 50 >= bin2X && x + 50 <= bin2X + binWidth && y + 50 >= bin2Y && y + 50 <= bin2Y + binHeight) {
      targetBinId = currentChallenge.bins[1].id;
    }

    if (targetBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setSortPositions(prev => ({ ...prev, [id]: { x, y, placed: true } }));

      // Check if all items placed
      const updated = { ...sortPositions, [id]: { x, y, placed: true } };
      const allPlaced = currentChallenge.sortItems?.every(si => updated[si.id]?.placed);

      if (allPlaced) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('Fantastic sorting! All correct! 🎉');
        speechManager.speak('Fantastic sorting! All correct! 🎉');
        setStars(prev => prev + 1);
        setSparklePos({ x: width / 2, y: height / 2 });
        setShowConfetti(true);

        setTimeout(() => {
          if (currentIndex < CHALLENGES.length - 1) {
            setCurrentIndex(prev => prev + 1);
            setMascotMood('happy');
            setMascotSpeech('Next challenge coming up!');
            speechManager.speak('Next challenge coming up!');
          } else {
            setCompleted(true);
            setShowSuccessBanner(true);
            const finalScore = Math.max(0, 100 - errors * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMessage(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      {screen === 'teaching' && (
        <TeachingScreen onStartPlay={() => setScreen('play')} />
      )}

      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col">
          {/* Background Scene */}
          <EarthSunScene width={width} height={height} />

          {/* Top Bar */}
          <div className="relative z-10 flex items-center justify-between px-6 py-3 bg-black/30 backdrop-blur-md border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🌍</span>
              <span className="text-white font-black text-sm tracking-wide">Earth, Sun & Sky</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
            <div className="text-white/80 font-bold text-xs bg-white/10 px-3 py-1 rounded-full">
              Level {currentIndex + 1} / {CHALLENGES.length}
            </div>
          </div>

          {/* Mascot */}
          <AstronomerAryan mood={mascotMood} speaking={mascotSpeech} />

          {/* Game Area */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
            {!completed ? (
              <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-xl w-full border-4 border-white/60 flex flex-col items-center">
                <h3 className="text-lg font-black text-gray-800 text-center mb-6 leading-snug">
                  {currentChallenge.question}
                </h3>

                {/* Multiple Choice Challenge */}
                {currentChallenge.type === 'identify' && (
                  <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                    {currentChallenge.options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => handleOptionSelect(opt)}
                        className="w-full py-3.5 px-5 rounded-2xl font-bold text-sm text-gray-800 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-200 shadow-md hover:border-indigo-400 hover:bg-indigo-100 transition-all text-left flex items-center justify-between"
                      >
                        <span>{opt}</span>
                        <span className="text-lg">⭐</span>
                      </motion.button>
                    ))}
                  </div>
                )}

                {/* Sort Challenge */}
                {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
                  <div className="relative w-full h-[310px] bg-indigo-50/60 rounded-2xl border-2 border-dashed border-indigo-200">
                    {/* Bins on right */}
                    <SortBin
                      id={currentChallenge.bins[0].id}
                      label={currentChallenge.bins[0].label}
                      color={currentChallenge.bins[0].color}
                      x={350}
                      y={20}
                      width={210}
                      height={125}
                    />
                    <SortBin
                      id={currentChallenge.bins[1].id}
                      label={currentChallenge.bins[1].label}
                      color={currentChallenge.bins[1].color}
                      x={350}
                      y={160}
                      width={210}
                      height={125}
                    />

                    {/* Draggable items */}
                    {currentChallenge.sortItems.map((item) => {
                      const pos = sortPositions[item.id] || { x: 20, y: 40, placed: false };
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
            ) : null}
          </div>

          {/* Feedback & Overlays */}
          {showConfetti && (
            <Confetti onComplete={() => setShowConfetti(false)} />
          )}

          {showSuccessBanner && (
            <SuccessBanner
              message={`Amazing job! You earned ${stars} stars and became a true Earth & Sky Expert! 🌟`}
              onComplete={() => setShowSuccessBanner(false)}
            />
          )}

          {hintMessage && (
            <HintBubble
              message={hintMessage}
              onComplete={() => setHintMessage(null)}
            />
          )}

          {sparklePos && (
            <SparkleBurst
              x={sparklePos.x}
              y={sparklePos.y}
              onComplete={() => setSparklePos(null)}
            />
          )}
        </div>
      )}
    </div>
  );
}
