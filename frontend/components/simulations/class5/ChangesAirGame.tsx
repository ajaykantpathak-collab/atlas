'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Custom SVG Icon Components ──���───────────────────────────────────────

function PhysicalChangeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 35 Q30 25, 45 35 L45 45 Q30 55, 15 45 Z" fill="#B3E5FC" stroke="#0288D1" strokeWidth="2" />
      <circle cx="30" cy="20" r="8" fill="#FFF59D" stroke="#FBC02D" strokeWidth="2" />
      <path d="M22 10 L38 20 M38 10 L22 20" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ChemicalChangeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 45 L40 45 L35 25 L25 25 Z" fill="#E0E0E0" stroke="#616161" strokeWidth="2" />
      <path d="M30 25 L30 15" stroke="#616161" strokeWidth="2" />
      <path d="M22 15 L38 15" stroke="#616161" strokeWidth="2" />
      <path d="M25 10 Q30 5, 35 10 T30 15" fill="#FF7043" opacity="0.8" />
      <circle cx="28" cy="35" r="3" fill="#FF5722" />
      <circle cx="33" cy="30" r="2" fill="#FF9800" />
    </svg>
  );
}

function AirCompositionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="#E1F5FE" stroke="#0288D1" strokeWidth="2" />
      <path d="M30 10 A20 20 0 0 1 50 30 L30 30 Z" fill="#4FC3F7" />
      <path d="M50 30 A20 20 0 1 1 30 10 L30 30 Z" fill="#81D4FA" />
      <text x="36" y="24" fontSize="8" fontWeight="bold" fill="#01579B">78%</text>
      <text x="18" y="42" fontSize="7" fontWeight="bold" fill="#01579B">21%</text>
    </svg>
  );
}

function NitrogenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E0F7FA" stroke="#00838F" strokeWidth="2" />
      <text x="30" y="35" fontSize="16" fontWeight="bold" fill="#006064" textAnchor="middle">N₂</text>
      <text x="30" y="46" fontSize="8" fontWeight="bold" fill="#00838F" textAnchor="middle">78%</text>
    </svg>
  );
}

function OxygenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="2" />
      <text x="30" y="35" fontSize="16" fontWeight="bold" fill="#F57F17" textAnchor="middle">O₂</text>
      <text x="30" y="46" fontSize="8" fontWeight="bold" fill="#F9A825" textAnchor="middle">21%</text>
    </svg>
  );
}

function SeaBreezeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="40" width="20" height="15" fill="#8D6E63" />
      <rect x="25" y="40" width="30" height="15" fill="#0288D1" />
      <path d="M35 25 Q25 15, 15 25" fill="none" stroke="#00E676" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="15,25 20,22 20,28" fill="#00E676" />
    </svg>
  );
}

function LandBreezeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="40" width="20" height="15" fill="#8D6E63" />
      <rect x="25" y="40" width="30" height="15" fill="#0288D1" />
      <path d="M15 25 Q25 15, 35 25" fill="none" stroke="#FF5722" strokeWidth="2.5" strokeLinecap="round" />
      <polygon points="35,25 30,22 30,28" fill="#FF5722" />
    </svg>
  );
}

function VentilatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="30" rx="3" fill="#CFD8DC" stroke="#455A64" strokeWidth="2" />
      <line x1="10" y1="25" x2="50" y2="25" stroke="#455A64" strokeWidth="2" />
      <line x1="10" y1="35" x2="50" y2="35" stroke="#455A64" strokeWidth="2" />
      <path d="M30 5 L30 15" stroke="#455A64" strokeWidth="3" />
    </svg>
  );
}

function ExhaustFanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#37474F" stroke="#263238" strokeWidth="2" />
      <path d="M30 30 L20 15 C25 12, 35 12, 40 15 Z" fill="#90A4AE" />
      <path d="M30 30 L45 20 C48 25, 48 35, 45 40 Z" fill="#90A4AE" />
      <path d="M30 30 L40 45 C35 48, 25 48, 20 45 Z" fill="#90A4AE" />
      <circle cx="30" cy="30" r="5" fill="#B0BEC5" />
    </svg>
  );
}

function BurningIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="35" width="10" height="15" fill="#78909C" />
      <path d="M30 10 Q38 22, 30 35 Q22 22, 30 10 Z" fill="#FF9800" />
      <path d="M30 18 Q34 25, 30 32 Q26 25, 30 18 Z" fill="#FFEB3B" />
    </svg>
  );
}

function RustingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="12" width="8" height="38" rx="2" fill="#90A4AE" stroke="#455A64" strokeWidth="2" />
      <path d="M26 20 Q34 25, 34 30 Q26 35, 34 40 Z" fill="#D84315" opacity="0.85" />
      <circle cx="30" cy="25" r="3" fill="#BF360C" />
      <circle cx="31" cy="38" r="4" fill="#BF360C" />
    </svg>
  );
}

function WindIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 20 Q25 15, 35 20 T50 20" stroke="#00ACC1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M15 35 Q30 30, 45 35 T55 35" stroke="#00ACC1" strokeWidth="3" fill="none" strokeLinecap="round" />
      <polygon points="48,17 55,20 48,23" fill="#00ACC1" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'physical': return <PhysicalChangeIcon size={size} />;
    case 'chemical': return <ChemicalChangeIcon size={size} />;
    case 'nitrogen': return <NitrogenIcon size={size} />;
    case 'oxygen': return <OxygenIcon size={size} />;
    case 'sea-breeze': return <SeaBreezeIcon size={size} />;
    case 'land-breeze': return <LandBreezeIcon size={size} />;
    case 'ventilator': return <VentilatorIcon size={size} />;
    case 'exhaust': return <ExhaustFanIcon size={size} />;
    case 'burning': return <BurningIcon size={size} />;
    case 'rusting': return <RustingIcon size={size} />;
    default: return <PhysicalChangeIcon size={size} />;
  }
}

// ─── Meteorologist Meera Mascot ──────────────────────────────────────────

function MeteorologistMeera({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-25 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-[260px] border-2 border-cyan-200 pointer-events-auto"
          >
            <p className="text-sm font-bold text-cyan-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'thinking'
            ? { rotate: [0, 6, -6, 0], y: [0, -4, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center"
      >
        <svg width="85" height="100" viewBox="0 0 85 100">
          <defs>
            <linearGradient id="meera-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFCC80" />
              <stop offset="100%" stopColor="#FFE0B2" />
            </linearGradient>
            <linearGradient id="meera-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#00BCD4" />
              <stop offset="100%" stopColor="#00838F" />
            </linearGradient>
          </defs>

          {/* Weather Cap */}
          <ellipse cx="42.5" cy="18" rx="20" ry="7" fill="#006064" />
          <path d="M22 18 Q42 5, 62 18 Z" fill="#00838F" />
          <rect x="35" y="11" width="15" height="4" rx="2" fill="#FFD700" />

          {/* Head & Face */}
          <circle cx="42.5" cy="35" r="20" fill="url(#meera-face)" />

          {/* Eyes & Smile */}
          <circle cx="34" cy="32" r="2.5" fill="#1A237E" />
          <circle cx="51" cy="32" r="2.5" fill="#1A237E" />
          <path d="M36 43 Q42.5 48, 49 43" stroke="#D84315" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Weather Scientist Jacket */}
          <path d="M20 55 L30 50 L35 95 L50 95 L55 50 L65 55 L70 95 L15 95 Z" fill="url(#meera-coat)" stroke="#006064" strokeWidth="2" />
          <circle cx="42.5" cy="65" r="4" fill="#FFD700" />
          <circle cx="42.5" cy="78" r="4" fill="#FFD700" />

          {/* Mini Anemometer in Hand */}
          <rect x="62" y="60" width="4" height="25" fill="#78909C" />
          <circle cx="64" cy="56" r="8" fill="none" stroke="#FF5722" strokeWidth="2" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ──────────────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFB300' : 'rgba(0,0,0,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Weather Station Scene Background ────────────────────────────────────

function WeatherStationBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="50%" stopColor="#B2EBF2" />
            <stop offset="100%" stopColor="#4DD0E1" />
          </linearGradient>
          <linearGradient id="ground-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#388E3C" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-gradient)" />

        {/* Clouds */}
        <circle cx="120" cy="80" r="25" fill="white" opacity="0.8" />
        <circle cx="145" cy="85" r="20" fill="white" opacity="0.8" />
        <circle cx="100" cy="95" r="18" fill="white" opacity="0.8" />

        <circle cx="520" cy="110" r="30" fill="white" opacity="0.7" />
        <circle cx="550" cy="115" r="22" fill="white" opacity="0.7" />

        {/* Ground */}
        <rect x="0" y={height - 120} width={width} height="120" fill="url(#ground-gradient)" />

        {/* Weather Station Building */}
        <rect x="50" y={height - 240} width="140" height="130" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
        <polygon points="40,{height-240} 120,{height-300} 200,{height-240}" fill="#D32F2F" />
        <rect x="80" y={height - 210} width="30" height="40" fill="#90A4AE" />
        <rect x="130" y={height - 210} width="30" height="40" fill="#90A4AE" />

        {/* Ventilator high up */}
        <rect x="110" y={height - 230} width="20" height="10" fill="#37474F" />

        {/* Wind Vane on roof */}
        <line x1="120" y1={height - 300} x2="120" y2={height - 330} stroke="#37474F" strokeWidth="3" />
        <polygon points="110,{height-330} 130,{height-330} 120,{height-345}" fill="#FFD700" />
      </svg>
    </div>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────────��──────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Physical Changes 🧊",
    text: "In a physical change, no new substance is formed! The shape, size, or state may change, but it is still the same material. Most physical changes are easily reversible — like melting ice or dissolving salt in water.",
    emoji: "🧊",
    bgColor: "from-cyan-400 to-blue-500",
    spoken: "In a physical change, no new substance is formed! The shape or state may change, but it is still the same material. They are usually reversible, like melting ice or dissolving salt.",
  },
  {
    title: "Chemical Changes 🔥",
    text: "In a chemical change, one or more brand-new substances are formed! They have completely different properties and the change is usually irreversible — like burning paper, cooking food, or rusting iron.",
    emoji: "🔥",
    bgColor: "from-orange-400 to-red-500",
    spoken: "In a chemical change, a brand new substance is formed! They are usually irreversible, like burning wood, cooking food, or rusting iron.",
  },
  {
    title: "Composition of Air 🌬️",
    text: "Air is a mixture of gases! Nitrogen is the most abundant gas, making up about 78% (four-fifths) of air. Oxygen is about 21% and is needed for breathing and burning. Carbon dioxide and other gases make up the rest.",
    emoji: "🌬️",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "Air is a mixture of gases! Nitrogen makes up about seventy-eight percent of air, while oxygen makes up about twenty-one percent.",
  },
  {
    title: "Land and Sea Breezes 🌊",
    text: "During the day, land heats faster than water; warm air rises and cool air from the sea flows in — this is the Sea Breeze! At night, land cools faster than water, and the breeze blows from land to sea — the Land Breeze!",
    emoji: "🌊",
    bgColor: "from-teal-400 to-emerald-500",
    spoken: "During the day, land heats faster than water and cool sea air blows inward as a sea breeze. At night, land cools faster and a land breeze blows outward.",
  },
  {
    title: "Ventilators & Exhaust Fans 🏠",
    text: "Warm air is lighter than cool air, so warm stale air rises to the top of a room. Ventilators placed high near the ceiling let this warm air escape! Exhaust fans force out smoke, heat, and odors from kitchens and bathrooms.",
    emoji: "🏠",
    bgColor: "from-purple-400 to-pink-500",
    spoken: "Warm air rises because it is lighter. Ventilators near the ceiling let warm stale air escape, while exhaust fans quickly remove smoke and odors.",
  },
];

// ─── Challenges Definition ───────────────────────────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBin {
  id: string;
  label: string;
  color: string;
}

interface Challenge {
  type: ChallengeType;
  question: string;
  answer: string;
  options: string[];
  hint: string;
  misconception: string;
  sortItems?: SortItem[];
  bins?: SortBin[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which of the following is a PHYSICAL change?',
    answer: 'Melting of ice into water',
    options: ['Burning of wood', 'Melting of ice into water', 'Rusting of iron nail', 'Cooking of raw egg'],
    hint: 'Think: in which change is no new substance formed and it can be easily reversed?',
    misconception: 'Melting ice is physical because water remains the same substance and can be frozen back into ice. Burning and rusting form brand-new substances!',
  },
  {
    type: 'sort',
    question: 'Drag each change to Physical or Chemical change!',
    answer: 'sort',
    options: [],
    hint: 'Physical changes do not form new substances (like melting ice). Chemical changes create new materials (like burning wood).',
    misconception: 'Remember: dissolving, boiling, and melting are physical changes. Burning, rusting, and cooking are chemical changes because new substances are formed!',
    sortItems: [
      { id: 'c1', label: 'Melting Ice', icon: 'physical', correctBin: 'physical' },
      { id: 'c2', label: 'Burning Wood', icon: 'chemical', correctBin: 'chemical' },
      { id: 'c3', label: 'Rusting Iron', icon: 'rusting', correctBin: 'chemical' },
      { id: 'c4', label: 'Boiling Water', icon: 'physical', correctBin: 'physical' },
    ],
    bins: [
      { id: 'physical', label: 'Physical Change 🧊', color: '#0288D1' },
      { id: 'chemical', label: 'Chemical Change 🔥', color: '#D32F2F' },
    ],
  },
  {
    type: 'identify',
    question: 'Which gas is the MOST abundant (largest part) in the air?',
    answer: 'Nitrogen (~78%)',
    options: ['Oxygen (~21%)', 'Nitrogen (~78%)', 'Carbon dioxide', 'Water vapour'],
    hint: 'Think: which gas makes up nearly four-fifths of the air around us?',
    misconception: 'Many think air is mostly oxygen because we breathe it, but Nitrogen makes up about 78% of air, while Oxygen is only 21%!',
  },
  {
    type: 'sort',
    question: 'Drag each gas or component to its correct property or role in air!',
    answer: 'sort',
    options: [],
    hint: 'Nitrogen is 78% and most abundant. Oxygen is 21% and supports breathing and burning.',
    misconception: 'Nitrogen is the most abundant gas (78%), whereas oxygen is second (21%) and essential for respiration and burning.',
    sortItems: [
      { id: 'g1', label: 'Nitrogen (78%)', icon: 'nitrogen', correctBin: 'abundant' },
      { id: 'g2', label: 'Oxygen (21%)', icon: 'oxygen', correctBin: 'oxygen' },
    ],
    bins: [
      { id: 'abundant', label: 'Most Abundant (~78%) 🔵', color: '#00838F' },
      { id: 'oxygen', label: 'Respiration & Burning (~21%) 🟡', color: '#F57F17' },
    ],
  },
  {
    type: 'identify',
    question: 'During the DAY, which breeze blows and from where?',
    answer: 'Sea breeze, blowing from sea to land',
    options: [
      'Sea breeze, blowing from sea to land',
      'Land breeze, blowing from land to sea',
      'No breeze blows during the day',
    ],
    hint: 'Think: land heats faster than water during the day. Warm air rises over land, so cool air rushes in from where?',
    misconception: 'During the day, land heats faster than water. Warm air rises over land, and cool air from the sea flows in — creating a sea breeze!',
  },
  {
    type: 'sort',
    question: 'Drag each breeze description to Day (Sea Breeze) or Night (Land Breeze)!',
    answer: 'sort',
    options: [],
    hint: 'Sea breeze happens in the day from sea to land. Land breeze happens at night from land to sea.',
    misconception: 'Sea breeze occurs during the day when land heats faster. Land breeze occurs at night when land cools faster than the sea.',
    sortItems: [
      { id: 'b1', label: 'Sea Breeze (Day)', icon: 'sea-breeze', correctBin: 'day' },
      { id: 'b2', label: 'Land Breeze (Night)', icon: 'land-breeze', correctBin: 'night' },
    ],
    bins: [
      { id: 'day', label: 'Daytime (Sea Breeze) 🌊', color: '#0288D1' },
      { id: 'night', label: 'Nighttime (Land Breeze) 🌙', color: '#455A64' },
    ],
  },
  {
    type: 'identify',
    question: 'What is the main purpose of an exhaust fan in a kitchen?',
    answer: 'To remove warm stale air, smoke, and odors',
    options: [
      'To remove warm stale air, smoke, and odors',
      'To cool food in the refrigerator',
      'To bring in hot air from outside',
      'To light up the cooking stove',
    ],
    hint: 'Think: what builds up when cooking food with oil and spices on a hot stove?',
    misconception: 'Exhaust fans actively remove hot, smoky, and odor-filled air from kitchens and bathrooms. Fresh air then enters through windows.',
  },
  {
    type: 'sort',
    question: 'Drag each ventilation feature to its correct job!',
    answer: 'sort',
    options: [],
    hint: 'Ventilators are near the ceiling for hot air to escape. Exhaust fans actively pull out smoke and odors.',
    misconception: 'Ventilators are placed high near the ceiling because warm air rises. Exhaust fans use a motor to push out smoke and steam quickly.',
    sortItems: [
      { id: 'v1', label: 'Ventilator', icon: 'ventilator', correctBin: 'escape' },
      { id: 'v2', label: 'Exhaust Fan', icon: 'exhaust', correctBin: 'remove' },
    ],
    bins: [
      { id: 'escape', label: 'Let warm air escape high up 🏠', color: '#00838F' },
      { id: 'remove', label: 'Actively suck out smoke/fumes 💨', color: '#D32F2F' },
    ],
  },
];

// ─── Component Props ─────────────────────────────────────────────────────

export interface ChangesAirGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ChangesAirGame({ width = 720, height = 560, onComplete }: ChangesAirGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<MascotMood>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const currentChallenge = CHALLENGES[challengeIdx];

  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 50 + idx * 140, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! That is correct!";
      setSuccessMsg(msg);
      setSpeakingText(msg);
      speechManager.speak(msg);
    } else {
      audioManager.play('error');
      setMascotMood('thinking');
      setIsIncorrect(true);
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  const advanceChallenge = () => {
    setSelectedOpt(null);
    setIsIncorrect(false);
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = "Wonderful! You mastered changes and air!";
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Simple bin hit-test based on drop coordinates
    const binWidth = width / currentChallenge.bins.length;
    const droppedBinIdx = Math.floor(x / binWidth);
    const targetBin = currentChallenge.bins[droppedBinIdx];

    if (targetBin && targetBin.id === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });
      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = "Fantastic sorting! All correct!";
        setSuccessMsg(msg);
        setSpeakingText(msg);
        speechManager.speak(msg);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpeakingText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-cyan-900 border-4 border-cyan-500"
      style={{ width, height }}
    >
      <WeatherStationBg width={width} height={height} />
      <MeteorologistMeera mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ─────────────────────���──────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 z-10 bg-black/30 backdrop-blur-sm">
          <div className="w-full flex justify-between items-center">
            <h1 className="text-2xl font-extrabold text-white drop-shadow-md">
              Class 5 Chemistry: Changes & Air
            </h1>
            <span className="text-white/80 font-bold">
              Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className={`w-full max-w-xl p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl text-white border-4 border-white/40 flex flex-col items-center text-center`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-xl items-center">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-2.5 rounded-full font-bold text-white shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-cyan-600 hover:bg-cyan-500'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  audioManager.play('success');
                  setScreen('play');
                }
              }}
              className="px-6 py-2.5 rounded-full font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-black/20 backdrop-blur-xs">
          {/* Top Bar */}
          <div className="flex justify-between items-center">
            <StarRow count={Math.floor(score / 15)} total={6} />
            <div className="bg-white/90 px-4 py-1.5 rounded-full shadow-md font-extrabold text-cyan-900 text-sm">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </div>
            <button
              onClick={handleShowHint}
              className="bg-amber-400 hover:bg-amber-300 text-amber-950 px-4 py-1.5 rounded-full font-extrabold shadow-md flex items-center gap-1 transition-all"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="bg-white/95 rounded-3xl p-5 shadow-2xl border-4 border-cyan-300 max-w-2xl mx-auto w-full text-center my-auto">
            <h3 className="text-xl font-black text-cyan-950 mb-4">{currentChallenge.question}</h3>

            {/* Identify Type */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnBg = 'bg-cyan-50 hover:bg-cyan-100 text-cyan-950 border-cyan-200';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnBg = 'bg-emerald-500 text-white border-emerald-600 scale-105';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-rose-600';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl font-bold border-2 shadow-md transition-all text-sm flex items-center justify-center ${btnBg}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Type */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative h-64 w-full flex flex-col justify-between">
                {/* Bins */}
                <div className="flex justify-around w-full mb-4">
                  {currentChallenge.bins.map((bin, idx) => (
                    <div
                      key={idx}
                      className="flex-1 mx-2 h-24 rounded-2xl border-4 border-dashed border-white flex flex-col items-center justify-center shadow-inner"
                      style={{ backgroundColor: bin.color, opacity: 0.9 }}
                    >
                      <span className="text-white font-extrabold text-sm drop-shadow">{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="flex justify-around items-center w-full pb-4">
                  {currentChallenge.sortItems.map(item => {
                    const placed = placedItems[item.id];
                    const pos = itemPositions[item.id] || { x: 0, y: 0 };
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={pos.x}
                        y={pos.y}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        width={110}
                        height={90}
                      >
                        <div
                          className="flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-cyan-300 bg-white cursor-grab active:cursor-grabbing"
                          style={{ width: 110, height: 90 }}
                        >
                          {renderSortIcon(item.icon, 38)}
                          <span className="text-[10px] font-bold text-gray-800 text-center mt-1 px-1">{item.label}</span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Next Button after answering */}
            {((currentChallenge.type === 'identify' && selectedOpt) ||
              (currentChallenge.type === 'sort' &&
                currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 flex justify-center"
              >
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    advanceChallenge();
                  }}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-8 py-3 rounded-full shadow-lg text-base transition-all"
                >
                  Continue ➔
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Bar info */}
          <div className="flex justify-between items-center text-white/90 text-xs font-bold">
            <span>Score: {score} pts</span>
            <span>Errors: {errors}</span>
          </div>
        </div>
      )}
    </div>
  );
}
