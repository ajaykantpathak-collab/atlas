'use client';

/**
 * ContinentsGame — Learn about Continents, Oceans, and India on the globe!
 *
 * CISCE Nodes: c3_geo_003 (Continents introduction), c3_geo_004 (Oceans introduction),
 *              c3_geo_005 (India on the globe)
 * Enrichment: c3_geography_enrichment_part3, part4, part5
 *
 * ELI5: "Look at a globe — blue parts are water (oceans) and coloured parts are land (continents).
 *   There are 7 continents: Asia is the biggest and Australia is the smallest!
 *   There are 5 oceans: Pacific is the biggest. India is a great country in Asia,
 *   surrounded by the Indian Ocean in the south!"
 *
 * Misconceptions & Corrections:
 *   1. "India is a continent" → "No! India is a country located INSIDE the continent of Asia!"
 *   2. "Australia is only an island" → "No! Australia is both an island AND the smallest continent!"
 *   3. "Antarctica has many towns and people" → "No! Antarctica is covered in ice all year round; almost no people live there!"
 *   4. "The Arabian Sea and Bay of Bengal are separate oceans" → "No! They are arms or parts of the Indian Ocean!"
 *   5. "There are only 5 continents" → "No! There are 7 continents in total!"
 *
 * Story: "Join Captain Kartik on an amazing world voyage! Explore continents, sail across oceans,
 *   and discover India on the globe to become a Geography Master!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Type Definition ──────────────────────────────────────────

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

// ─── Teaching Slides (5 slides) ───────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Welcome to Earth! 🌍',
    text: 'Earth is our wonderful home! When we look at a globe, the blue parts are water (oceans) and the coloured parts are land (continents). About 71% of Earth is covered in water!',
    emoji: '���',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'Earth is our wonderful home! When we look at a globe, the blue parts are water and the coloured parts are land. About seventy-one percent of Earth is covered in water!',
  },
  {
    title: 'The 7 Continents! 🏔️',
    text: 'A continent is a very large landmass. There are 7 continents: Asia (largest), Africa, North America, South America, Antarctica (covered in ice), Europe, and Australia (smallest)!',
    emoji: '🏔️',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'A continent is a very large landmass. There are seven continents: Asia is the largest, followed by Africa, North America, South America, Antarctica covered in ice, Europe, and Australia the smallest!',
  },
  {
    title: 'The 5 Oceans! 🌊',
    text: 'An ocean is a vast body of salty water. The 5 oceans are the Pacific Ocean (largest), Atlantic Ocean (S-shaped), Indian Ocean, Southern Ocean, and the cold Arctic Ocean!',
    emoji: '🌊',
    bgColor: 'from-cyan-500 to-blue-600',
    spoken: 'An ocean is a vast body of salty water. The five oceans are the Pacific Ocean, Atlantic Ocean, Indian Ocean, Southern Ocean, and the cold Arctic Ocean!',
  },
  {
    title: 'India on the Globe! 🇮🇳',
    text: 'India is a large country located in the southern part of Asia! It lies in the Northern Hemisphere. The Tropic of Cancer passes through its middle.',
    emoji: '🇮🇳',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'India is a large country located in the southern part of Asia! It lies in the Northern Hemisphere, and the Tropic of Cancer passes through its middle.',
  },
  {
    title: 'Seas Around India! 🗺️',
    text: 'India has natural water boundaries on three sides: the Arabian Sea to the west, the Bay of Bengal to the east, and the Indian Ocean to the south!',
    emoji: '🗺️',
    bgColor: 'from-sky-500 to-blue-700',
    spoken: 'India has natural water boundaries on three sides: the Arabian Sea to the west, the Bay of Bengal to the east, and the Indian Ocean to the south!',
  },
];

// ─── Challenges (8 progressive challenges) ────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is a continent?',
    answer: 'A very large area of land',
    options: ['A very large area of land', 'A small island in a pond', 'A type of ocean water'],
    hint: 'Think about what makes up the green and brown parts on a globe — they are huge blocks of land!',
    misconception: 'A continent is a very large, continuous landmass! It is much bigger than an island or a country. There are seven of them on Earth!',
  },
  {
    type: 'identify',
    question: 'How many continents are there on Earth?',
    answer: '7',
    options: ['5', '7', '10'],
    hint: 'Count them: Asia, Africa, North America, South America, Antarctica, Europe, Australia!',
    misconception: 'There are exactly 7 continents on Earth! Asia is the largest and Australia is the smallest.',
  },
  {
    type: 'sort',
    question: 'Drag each continent to its special feature!',
    answer: 'sort',
    options: [],
    hint: 'Match Asia to largest, Antarctica to ice, Australia to smallest island continent!',
    misconception: 'Each continent has a unique feature: Asia is largest, Antarctica is covered in ice, and Australia is the smallest island continent!',
    sortItems: [
      { id: 'asia', label: 'Asia', icon: 'asia', correctBin: 'bin-asia' },
      { id: 'antarctica', label: 'Antarctica', icon: 'antarctica', correctBin: 'bin-antarctica' },
      { id: 'australia', label: 'Australia', icon: 'australia', correctBin: 'bin-australia' },
    ],
    bins: [
      { id: 'bin-asia', label: 'Largest, most people 🌏', color: '#3B82F6' },
      { id: 'bin-antarctica', label: 'Covered in thick ice ❄️', color: '#06B6D4' },
      { id: 'bin-australia', label: 'Smallest, island continent 🦘', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which is the LARGEST continent on Earth?',
    answer: 'Asia',
    options: ['Australia', 'Asia', 'Europe'],
    hint: 'It covers about one-third of all land on Earth and is home to India!',
    misconception: 'Asia is the LARGEST continent! Australia is the smallest. Never confuse the two!',
  },
  {
    type: 'sort',
    question: 'Drag each ocean to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Pacific is biggest, Indian is south of India, Arctic is coldest at north pole!',
    misconception: 'The Pacific Ocean is the largest, the Indian Ocean is south of India, and the Arctic Ocean is the coldest around the North Pole!',
    sortItems: [
      { id: 'pacific', label: 'Pacific Ocean', icon: 'pacific', correctBin: 'bin-pacific' },
      { id: 'indian', label: 'Indian Ocean', icon: 'indian', correctBin: 'bin-indian' },
      { id: 'arctic', label: 'Arctic Ocean', icon: 'arctic', correctBin: 'bin-arctic' },
    ],
    bins: [
      { id: 'bin-pacific', label: 'Largest & deepest ocean 🌊', color: '#2563EB' },
      { id: 'bin-indian', label: 'South of India 🇮🇳', color: '#0D9488' },
      { id: 'bin-arctic', label: 'Coldest near North Pole 🧊', color: '#4F46E5' },
    ],
  },
  {
    type: 'identify',
    question: 'Which ocean is named after our country India?',
    answer: 'Indian Ocean',
    options: ['Pacific Ocean', 'Indian Ocean', 'Atlantic Ocean'],
    hint: 'Look at the ocean that lies directly to the south of India!',
    misconception: 'The Indian Ocean is named after India because it washes against India’s southern shores!',
  },
  {
    type: 'sort',
    question: 'Sort these statements about India into True or False!',
    answer: 'sort',
    options: [],
    hint: 'Is India a continent or a country? Is it in Asia or Africa?',
    misconception: 'India is a country located IN Asia — India is NOT a continent itself! And India is entirely in the Northern Hemisphere!',
    sortItems: [
      { id: 'india-asia', label: 'India is in Asia', icon: 'india-true', correctBin: 'bin-true' },
      { id: 'india-continent', label: 'India is a continent', icon: 'india-false', correctBin: 'bin-false' },
    ],
    bins: [
      { id: 'bin-true', label: 'True ✅', color: '#16A34A' },
      { id: 'bin-false', label: 'False ❌', color: '#DC2626' },
    ],
  },
  {
    type: 'sort',
    question: 'Sort these places into Continent or Ocean!',
    answer: 'sort',
    options: [],
    hint: 'Asia and Africa are big landmasses (Continents). Pacific and Atlantic are big water bodies (Oceans).',
    misconception: 'Continents are landmasses (like Africa), while Oceans are huge bodies of salt water (like the Atlantic Ocean)!',
    sortItems: [
      { id: 'africa-item', label: 'Africa', icon: 'africa', correctBin: 'bin-continent' },
      { id: 'atlantic-item', label: 'Atlantic Ocean', icon: 'atlantic', correctBin: 'bin-ocean' },
    ],
    bins: [
      { id: 'bin-continent', label: 'Continent (Land) 🏔️', color: '#D97706' },
      { id: 'bin-ocean', label: 'Ocean (Water) 🌊', color: '#0284C7' },
    ],
  },
];

// ─── Captain Kartik Mascot ────────────────────────────────────

function CaptainKartik({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[220px] border-2 border-blue-400"
          >
            <p className="text-xs font-bold text-blue-900">{speaking}</p>
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
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="captain-uniform" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <radialGradient id="captain-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#CA8A04" />
            </radialGradient>
          </defs>
          {/* Captain Hat */}
          <path d="M20 22 L55 22 L50 12 L25 12 Z" fill="#0F172A" stroke="#38BDF8" strokeWidth="1.5" />
          <ellipse cx="37" cy="22" rx="20" ry="4" fill="#1E293B" />
          <circle cx="37" cy="17" r="4" fill="#FACC15" />
          {/* Head */}
          <circle cx="37" cy="35" r="16" fill="url(#captain-face)" stroke="#854D0E" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="32" r="0.8" fill="white" />
          <circle cx="44" cy="32" r="0.8" fill="white" />
          {/* Smile */}
          <path d="M32 41 Q37 46 42 41" stroke="#713F12" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Uniform Body */}
          <path d="M22 51 L52 51 L58 82 L16 82 Z" fill="url(#captain-uniform)" stroke="#38BDF8" strokeWidth="1.5" />
          {/* Gold Buttons */}
          <circle cx="37" cy="60" r="2" fill="#FACC15" />
          <circle cx="37" cy="70" r="2" fill="#FACC15" />
          {/* Anchor Pin on Collar */}
          <path d="M33 53 L37 57 L41 53" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1">
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

// ─── World Scene Background ─────────────────────���─────────────

function WorldSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="world-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E3A8A" />
            <stop offset="40%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <radialGradient id="globe-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#world-sky)" />
        <circle cx={width / 2} cy={height / 2} r={Math.min(width, height) * 0.45} fill="url(#globe-glow)" />
      </svg>
      {/* Floating stars */}
      <motion.div className="absolute top-10 left-10" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 3, repeat: Infinity }}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="#FDE047"><path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" /></svg>
      </motion.div>
      <motion.div className="absolute top-16 right-16" animate={{ opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 4, repeat: Infinity, delay: 1 }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#FDE047"><path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" /></svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

function AsiaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" opacity="0.2" />
      <path d="M15 20 C25 10, 45 15, 50 30 C55 45, 35 50, 20 40 C10 30, 10 25, 15 20 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <circle cx="35" cy="35" r="4" fill="#DC2626" />
      <text x="35" y="47" fontSize="8" fontWeight="bold" fill="#B45309" textAnchor="middle">ASIA</text>
    </svg>
  );
}

function AfricaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" opacity="0.2" />
      <path d="M22 12 C32 10, 42 20, 38 35 C34 50, 22 52, 18 42 C14 32, 18 15, 22 12 Z" fill="#10B981" stroke="#059669" strokeWidth="2" />
      <text x="30" y="55" fontSize="8" fontWeight="bold" fill="#047857" textAnchor="middle">AFRICA</text>
    </svg>
  );
}

function AustraliaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" opacity="0.2" />
      <ellipse cx="32" cy="32" rx="16" ry="12" fill="#EC4899" stroke="#DB2777" strokeWidth="2" />
      <text x="32" y="55" fontSize="8" fontWeight="bold" fill="#BE185D" textAnchor="middle">AUSTRALIA</text>
    </svg>
  );
}

function AntarcticaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" opacity="0.2" />
      <path d="M12 35 C20 28, 40 28, 48 35 C52 42, 38 48, 30 48 C22 48, 8 42, 12 35 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="30" y="55" fontSize="8" fontWeight="bold" fill="#0369A1" textAnchor="middle">ANTARCTICA</text>
    </svg>
  );
}

function PacificOceanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#1D4ED8" />
      <path d="M15 30 Q25 20, 35 30 T55 30" stroke="white" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M15 40 Q25 30, 35 40 T55 40" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
      <text x="30" y="55" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">PACIFIC</text>
    </svg>
  );
}

function IndianOceanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#0EA5E9" />
      <path d="M20 25 L40 25 L35 40 L25 40 Z" fill="#FACC15" opacity="0.8" />
      <text x="30" y="55" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">INDIAN</text>
    </svg>
  );
}

function ArcticOceanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#6366F1" />
      <circle cx="30" cy="30" r="10" fill="white" opacity="0.9" />
      <text x="30" y="55" fontSize="8" fontWeight="bold" fill="white" textAnchor="middle">ARCTIC</text>
    </svg>
  );
}

function GlobeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M10 30 Q30 10, 50 30 Q30 50, 10 30" fill="#10B981" opacity="0.8" />
      <ellipse cx="30" cy="30" rx="10" ry="26" fill="none" stroke="#1D4ED8" strokeWidth="1.5" />
      <line x1="4" y1="30" x2="56" y2="30" stroke="#1D4ED8" strokeWidth="1.5" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'asia': return <AsiaIcon size={size} />;
    case 'antarctica': return <AntarcticaIcon size={size} />;
    case 'australia': return <AustraliaIcon size={size} />;
    case 'pacific': return <PacificOceanIcon size={size} />;
    case 'indian': return <IndianOceanIcon size={size} />;
    case 'arctic': return <ArcticOceanIcon size={size} />;
    case 'india-true': return <GlobeIcon size={size} />;
    case 'india-false': return <AsiaIcon size={size} />;
    case 'africa': return <AfricaIcon size={size} />;
    case 'atlantic': return <PacificOceanIcon size={size} />;
    default: return <GlobeIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-blue-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 120, height: 95 }}>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-lg transition-all duration-200 ${
        isHovering ? 'scale-105 shadow-2xl ring-4 ring-yellow-300' : ''
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color + '25',
        borderColor: color,
      }}
    >
      <span className="text-xs md:text-sm font-black text-white text-center drop-shadow-md">{label}</span>
    </div>
  );
}

// ─── Main Component Export ────────────────────────────────────

export interface ContinentsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ContinentsGame({ width = 720, height = 560, onComplete }: ContinentsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  // Mascot speaking state
  const [mascotMsg, setMascotMsg] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');

  // Drag and drop state for sort challenges
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and Mascot helper
  const speakAndShow = useCallback((text: string, mood: 'happy' | 'celebrate' | 'thinking' = 'happy') => {
    setMascotMsg(text);
    setMascotMood(mood);
    speechManager.speak(text);
  }, []);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setHintText(currentChallenge.hint);
        setShowHint(true);
        audioManager.play('hint');
        speakAndShow(currentChallenge.hint, 'thinking');
      }
    }, 10000);
  }, [screen, currentChallenge, speakAndShow]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Initialize teaching slide speech
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speakAndShow(slide.spoken, 'happy');
    }
  }, [slideIdx, screen, speakAndShow]);

  // Initialize sort positions when challenge changes
  useEffect(() => {
    if (currentChallenge?.type === 'sort' && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = { x: 50 + idx * 130, y: 380 };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
      speakAndShow(currentChallenge.question, 'happy');
    } else if (currentChallenge?.type === 'identify') {
      speakAndShow(currentChallenge.question, 'happy');
    }
  }, [challengeIdx, currentChallenge, speakAndShow]);

  // Handle multiple choice answer
  const handleAnswerClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 });

    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setStars(prev => prev + 1);
      setSuccessMsg('Wonderful! Correct answer! ⭐');
      setShowSuccessBanner(true);
      speakAndShow('Fantastic job! That is correct!', 'celebrate');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setHintText(currentChallenge.misconception);
      setShowHint(true);
      speakAndShow(currentChallenge.misconception, 'thinking');
    }
  };

  // Drag and drop handlers
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    if (!currentChallenge.bins || !currentChallenge.sortItems) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bin collision
    let matchedBin: string | null = null;
    const bins = currentChallenge.bins;

    bins.forEach((bin, idx) => {
      const binX = 50 + idx * 210;
      const binY = 160;
      const binW = 190;
      const binH = 180;

      if (x + 60 >= binX && x + 60 <= binX + binW && y + 45 >= binY && y + 45 <= binY + binH) {
        matchedBin = bin.id;
      }
    });

    if (matchedBin === item.correctBin) {
      audioManager.play('drop-correct');
      const newPlaced = { ...placedItems, [id]: true };
      setPlacedItems(newPlaced);

      const allDone = currentChallenge.sortItems.every(i => newPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setSuccessMsg('All sorted correctly! Amazing! 🌟');
        setShowSuccessBanner(true);
        speakAndShow('Brilliant! You sorted everything correctly!', 'celebrate');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setHintText(currentChallenge.misconception);
      setShowHint(true);
      speakAndShow(currentChallenge.misconception, 'thinking');
      return false;
    }
  };

  // Advance to next challenge or complete
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      speakAndShow('You completed the world voyage! You are a Geography Master!', 'celebrate');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, backgroundColor: '#0F172A' }}
    >
      {/* Background World Scene */}
      <WorldSceneBackground width={width} height={height} />

      {/* Captain Kartik Mascot */}
      <CaptainKartik mood={mascotMood} speaking={mascotMsg} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur-md border-b border-blue-500/30 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌍</span>
          <h1 className="text-white font-black text-lg tracking-wide drop-shadow">Continents & Oceans Voyage</h1>
        </div>
        <div className="flex items-center gap-4">
          <StarRow count={stars} total={CHALLENGES.length} />
          {screen === 'play' && (
            <span className="bg-blue-600/60 text-blue-200 text-xs font-bold px-3 py-1 rounded-full border border-blue-400/40">
              Quest {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
      </div>

      {/* Screen 1: Teaching Slides */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col items-center justify-between z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIdx}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.3 }}
              className={`w-full max-w-xl rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-8 shadow-2xl border-4 border-white/20 flex flex-col items-center text-center`}
            >
              <span className="text-6xl mb-4 drop-shadow-lg">{TEACHING_SLIDES[slideIdx].emoji}</span>
              <h2 className="text-2xl md:text-3xl font-black text-white mb-4 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-white/95 text-base md:text-lg font-medium leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
            </motion.div>
          </AnimatePresence>

          {/* Navigation & Progress */}
          <div className="w-full max-w-xl flex items-center justify-between px-4">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold text-white shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-slate-700/50 opacity-40 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-500 active:scale-95'
              }`}
            >
              ⬅️ Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-yellow-400' : 'w-3 bg-white/30'}`} />
              ))}
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('success');
                }
              }}
              className="px-6 py-2.5 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 shadow-xl active:scale-95"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Voyage! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* Screen 2: Play Challenges */}
      {screen === 'play' && currentChallenge && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col items-center justify-between z-10">
          {/* Question Box */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-slate-900/80 backdrop-blur-md rounded-2xl p-4 border-2 border-blue-500/40 shadow-xl text-center"
          >
            <h2 className="text-white font-extrabold text-lg md:text-xl drop-shadow">{currentChallenge.question}</h2>
          </motion.div>

          {/* Challenge Content Area */}
          <div className="w-full max-w-2xl flex-1 relative flex items-center justify-center my-2">
            {/* Multiple Choice Challenge */}
            {currentChallenge.type === 'identify' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={e => handleAnswerClick(opt, e)}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-base md:text-lg shadow-xl border border-blue-400/40 flex items-center justify-center transition-all"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="w-full h-full relative">
                {/* Bins */}
                <div className="absolute top-2 left-0 right-0 flex justify-around px-4">
                  {currentChallenge.bins.map((bin, idx) => {
                    const binWidth = currentChallenge.bins!.length === 2 ? 260 : 180;
                    const binX = idx === 0 ? 30 : idx === 1 ? 320 : 50;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={binX}
                        y={10}
                        width={binWidth}
                        height={110}
                        isHovering={hoveringBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable Cards */}
                <div className="absolute bottom-6 left-0 right-0 flex justify-around px-8">
                  {currentChallenge.sortItems.map((item) => (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={itemPositions[item.id]?.x || 0}
                      y={itemPositions[item.id]?.y || 0}
                      placed={placedItems[item.id]}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback Overlays */}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}

      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}

      {showSuccessBanner && (
        <SuccessBanner
          message={successMsg}
          onComplete={handleNextChallenge}
        />
      )}

      {showHint && (
        <HintBubble
          message={hintText}
          onComplete={() => setShowHint(false)}
        />
      )}
    </div>
  );
}
