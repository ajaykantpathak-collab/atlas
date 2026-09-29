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

// ─── SVG Icon Components ────��─────────────────────────────────

function GlobeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
      <path d="M8 30 Q 30 20, 52 30" stroke="#0284C7" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
      <path d="M8 30 Q 30 40, 52 30" stroke="#0284C7" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
      <path d="M30 8 Q 20 30, 30 52" stroke="#0284C7" strokeWidth="1.5" fill="none" strokeDasharray="2,2" />
      <line x1="30" y1="52" x2="30" y2="56" stroke="#475569" strokeWidth="3" />
      <ellipse cx="30" cy="56" rx="10" ry="3" fill="#475569" />
    </svg>
  );
}

function LatitudeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <line x1="8" y1="18" x2="52" y2="18" stroke="#DC2626" strokeWidth="2" />
      <line x1="6" y1="30" x2="54" y2="30" stroke="#EF4444" strokeWidth="3" />
      <line x1="8" y1="42" x2="52" y2="42" stroke="#DC2626" strokeWidth="2" />
    </svg>
  );
}

function LongitudeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 8 Q 18 30, 30 52" stroke="#2563EB" strokeWidth="2.5" fill="none" />
      <path d="M30 8 Q 42 30, 30 52" stroke="#2563EB" strokeWidth="2.5" fill="none" />
      <line x1="30" y1="8" x2="30" y2="52" stroke="#1D4ED8" strokeWidth="3" />
    </svg>
  );
}

function EquatorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#38BDF8" stroke="#0369A1" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="22" ry="7" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
      <text x="21" y="33" fontSize="10" fontWeight="bold" fill="#78350F">0°</text>
    </svg>
  );
}

function PrimeMeridianIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M30 8 Q 12 30, 30 52" stroke="#DC2626" strokeWidth="2" fill="none" />
      <path d="M30 8 Q 48 30, 30 52" stroke="#2563EB" strokeWidth="2" fill="none" />
      <circle cx="30" cy="30" r="5" fill="#DC2626" />
      <text x="23" y="18" fontSize="8" fontWeight="bold" fill="#B91C1C">0°</text>
    </svg>
  );
}

function CompassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="white" stroke="#334155" strokeWidth="2" />
      <polygon points="30,10 34,30 30,50 26,30" fill="#EF4444" />
      <polygon points="30,10 30,50 34,30 26,30" fill="#DC2626" opacity="0.6" />
      <polygon points="10,30 30,34 50,30 30,26" fill="#3B82F6" />
      <text x="27" y="14" fontSize="8" fontWeight="bold" fill="#0F172A">N</text>
      <text x="27" y="49" fontSize="8" fontWeight="bold" fill="#0F172A">S</text>
      <text x="51" y="32" fontSize="8" fontWeight="bold" fill="#0F172A">E</text>
      <text x="5" y="32" fontSize="8" fontWeight="bold" fill="#0F172A">W</text>
    </svg>
  );
}

function GridIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="4" fill="#F0FDF4" stroke="#15803D" strokeWidth="2" />
      <line x1="8" y1="20" x2="52" y2="20" stroke="#86EFAC" strokeWidth="2" />
      <line x1="8" y1="32" x2="52" y2="32" stroke="#86EFAC" strokeWidth="2" />
      <line x1="8" y1="44" x2="52" y2="44" stroke="#86EFAC" strokeWidth="2" />
      <line x1="20" y1="8" x2="20" y2="52" stroke="#86EFAC" strokeWidth="2" />
      <line x1="32" y1="8" x2="32" y2="52" stroke="#86EFAC" strokeWidth="2" />
      <line x1="44" y1="8" x2="44" y2="52" stroke="#86EFAC" strokeWidth="2" />
      <circle cx="32" cy="32" r="4" fill="#DC2626" />
    </svg>
  );
}

function TemperatureZoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <rect x="8" y="24" width="44" height="12" fill="#FEE2E2" />
      <rect x="8" y="14" width="44" height="10" fill="#FEF08A" />
      <rect x="8" y="36" width="44" height="10" fill="#FEF08A" />
      <circle cx="30" cy="30" r="22" fill="none" stroke="#0284C7" strokeWidth="2" />
    </svg>
  );
}

function TorridZoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="6" fill="#FEF2F2" stroke="#DC2626" strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="#F59E0B" />
      <path d="M30 10 L30 6 M30 50 L30 54 M10 30 L6 30 M50 30 L54 30" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TemperateZoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="6" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
      <path d="M15 38 L25 24 L35 34 L45 20" stroke="#16A34A" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="45" cy="20" r="3" fill="#16A34A" />
    </svg>
  );
}

function FrigidZoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="6" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2" />
      <path d="M30 14 L30 46 M16 24 L44 36 M16 36 L44 24" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <circle cx="30" cy="30" r="2" fill="#1E293B" />
      <line x1="30" y1="30" x2="30" y2="16" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="40" y2="30" stroke="#1E293B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'globe': return <GlobeIcon size={size} />;
    case 'latitude': return <LatitudeIcon size={size} />;
    case 'longitude': return <LongitudeIcon size={size} />;
    case 'equator': return <EquatorIcon size={size} />;
    case 'prime-meridian': return <PrimeMeridianIcon size={size} />;
    case 'compass': return <CompassIcon size={size} />;
    case 'grid': return <GridIcon size={size} />;
    case 'temperature-zone': return <TemperatureZoneIcon size={size} />;
    case 'torrid-zone': return <TorridZoneIcon size={size} />;
    case 'temperate-zone': return <TemperateZoneIcon size={size} />;
    case 'frigid-zone': return <FrigidZoneIcon size={size} />;
    case 'clock': return <ClockIcon size={size} />;
    default: return <GlobeIcon size={size} />;
  }
}

// ─── Teaching Slides ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Latitudes: Parallels of Earth 🌍",
    text: "Latitudes are imaginary lines running east to west, parallel to the Equator. The Equator is 0° latitude and splits the Earth into the Northern and Southern Hemispheres!",
    emoji: "🌍",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Latitudes are imaginary lines running east to west, parallel to the Equator. The Equator is zero degrees latitude and splits the Earth into Northern and Southern Hemispheres!"
  },
  {
    title: "Key Latitudes & Tropics 🌡️",
    text: "Key latitudes include the Tropic of Cancer at 23.5°N, the Tropic of Capricorn at 23.5°S, the Arctic Circle at 66.5°N, and the Antarctic Circle at 66.5°S!",
    emoji: "🌡️",
    bgColor: "from-teal-500 to-gold-600",
    spoken: "Key latitudes include the Tropic of Cancer at 23.5 degrees North, the Tropic of Capricorn at 23.5 degrees South, and the Arctic and Antarctic Circles at 66.5 degrees!"
  },
  {
    title: "Longitudes: Meridians from Pole to Pole 🧭",
    text: "Longitudes are imaginary lines running from the North Pole to the South Pole. The Prime Meridian at 0° longitude passes through Greenwich, England, splitting East and West!",
    emoji: "🧭",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Longitudes run from pole to pole. The Prime Meridian at zero degrees longitude passes through Greenwich, England, splitting the Earth into Eastern and Western Hemispheres!"
  },
  {
    title: "The Geographic Grid 🌐",
    text: "The geographic grid is the network formed by criss-crossing latitudes and longitudes. Every place on Earth has a unique coordinate pair — latitude first, then longitude!",
    emoji: "🌐",
    bgColor: "from-gold-500 to-purple-600",
    spoken: "The geographic grid is formed by criss-crossing latitudes and longitudes. Every place on Earth has a unique coordinate pair, with latitude first and longitude second!"
  },
  {
    title: "Time Zones & Temperature Zones ☀️",
    text: "Every 15° of longitude equals 1 hour of time difference. IST is 5 hours 30 minutes ahead of GMT! The Earth also has three temperature zones: Torrid (hot), Temperate (moderate), and Frigid (cold).",
    emoji: "☀️",
    bgColor: "from-emerald-500 to-green-600",
    spoken: "Every 15 degrees of longitude equals 1 hour. IST is 5 hours 30 minutes ahead of GMT! The Earth has three temperature zones: Torrid, Temperate, and Frigid."
  }
];

// ─── Challenges ───────────────────────────────────────────────

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
    question: "What are LATITUDES?",
    answer: "Horizontal lines running east to west on the globe",
    options: [
      "Horizontal lines running east to west on the globe",
      "Vertical lines connecting the North and South Poles",
      "Lines showing time zones across countries"
    ],
    hint: "Think about horizontal rungs of a ladder lying flat around the Earth!",
    misconception: "Latitudes run east to west horizontally, parallel to the Equator. Vertical lines running north to south are longitudes!"
  },
  {
    type: 'sort',
    question: "Drag each latitude feature to its correct description!",
    answer: "sort",
    options: [],
    hint: "The Equator is 0° latitude and splits hemispheres. The Tropics are at 23.5°, and Polar Circles are at 66.5°!",
    misconception: "Each latitude line has a precise degree value and position. Remember the Equator is 0°, Tropics are 23.5°, and Polar Circles are 66.5°!",
    sortItems: [
      { id: 'item-eq', label: 'Equator (0°)', icon: 'equator', correctBin: 'bin-eq' },
      { id: 'item-can', label: 'Tropic of Cancer (23.5°N)', icon: 'latitude', correctBin: 'bin-can' },
      { id: 'item-cap', label: 'Tropic of Capricorn (23.5°S)', icon: 'latitude', correctBin: 'bin-cap' },
      { id: 'item-arc', label: 'Arctic Circle (66.5°N)', icon: 'latitude', correctBin: 'bin-arc' }
    ],
    bins: [
      { id: 'bin-eq', label: 'Largest Circle 🌍', color: '#0284C7' },
      { id: 'bin-can', label: 'Northern Tropic ☀️', color: '#CA8A04' },
      { id: 'bin-cap', label: 'Southern Tropic ☀️', color: '#D97706' },
      { id: 'bin-arc', label: 'Northern Circle ❄️', color: '#2563EB' }
    ]
  },
  {
    type: 'identify',
    question: "What is the PRIME MERIDIAN?",
    answer: "The 0° longitude line passing through Greenwich, England",
    options: [
      "The 0° longitude line passing through Greenwich, England",
      "The 0° latitude line that splits the northern and southern hemispheres",
      "The line where the calendar date changes in the Pacific Ocean"
    ],
    hint: "Think about the starting line for measuring east and west longitudes near London!",
    misconception: "The Prime Meridian is 0° longitude passing through Greenwich. The 0° latitude line is the Equator!"
  },
  {
    type: 'sort',
    question: "Drag each longitude feature to its correct description!",
    answer: "sort",
    options: [],
    hint: "Longitudes meet at poles, Prime Meridian is 0°, and International Date Line is near 180°!",
    misconception: "Longitudes are not parallel; they converge at the poles. The Prime Meridian is 0°, and IST is fixed at 82.5°E!",
    sortItems: [
      { id: 'item-pm', label: 'Prime Meridian', icon: 'prime-meridian', correctBin: 'bin-pm' },
      { id: 'item-lon', label: 'Longitudes', icon: 'longitude', correctBin: 'bin-lon' },
      { id: 'item-idl', label: 'Int. Date Line', icon: 'clock', correctBin: 'bin-idl' },
      { id: 'item-ist', label: 'IST Meridian', icon: 'clock', correctBin: 'bin-ist' }
    ],
    bins: [
      { id: 'bin-pm', label: '0° at Greenwich 🇬🇧', color: '#B91C1C' },
      { id: 'bin-lon', label: 'Meet at Poles 🧭', color: '#1D4ED8' },
      { id: 'bin-idl', label: 'Near 180° Meridian 📅', color: '#7C3AED' },
      { id: 'bin-ist', label: '82.5°E for India 🇮🇳', color: '#059669' }
    ]
  },
  {
    type: 'identify',
    question: "What is the geographic GRID?",
    answer: "The network of intersecting latitudes and longitudes on the globe",
    options: [
      "The network of intersecting latitudes and longitudes on the globe",
      "A map showing only the state boundaries of India",
      "A set of parallel lines that never cross each other"
    ],
    hint: "Think of a spreadsheet net formed when east-west and north-south lines cross at right angles!",
    misconception: "The geographic grid is formed by the intersection of latitudes and longitudes, creating coordinate pairs for every location on Earth!"
  },
  {
    type: 'sort',
    question: "Drag each coordinate value to its correct feature!",
    answer: "sort",
    options: [],
    hint: "0° is Equator/Prime Meridian, 23.5°N is Tropic of Cancer, 82.5°E is IST, 180° is Date Line!",
    misconception: "Each value on the globe has a precise meaning: 0° for Equator/Prime Meridian, 23.5°N for Cancer, 82.5°E for India's standard time!",
    sortItems: [
      { id: 'coord-eq', label: '0° Latitude', icon: 'equator', correctBin: 'bin-eq' },
      { id: 'coord-can', label: '23.5°N Latitude', icon: 'latitude', correctBin: 'bin-can' },
      { id: 'coord-ist', label: '82.5°E Longitude', icon: 'clock', correctBin: 'bin-ist' },
      { id: 'coord-idl', label: '180° Longitude', icon: 'clock', correctBin: 'bin-idl' }
    ],
    bins: [
      { id: 'bin-eq', label: 'Equator 🌍', color: '#0284C7' },
      { id: 'bin-can', label: 'Tropic of Cancer ☀️', color: '#CA8A04' },
      { id: 'bin-ist', label: 'Indian Standard Time 🇮🇳', color: '#059669' },
      { id: 'bin-idl', label: 'Date Line 📅', color: '#7C3AED' }
    ]
  },
  {
    type: 'identify',
    question: "How many hours ahead is IST (Indian Standard Time) from GMT?",
    answer: "5 hours 30 minutes",
    options: [
      "5 hours 30 minutes",
      "12 hours exactly",
      "1 hour 15 minutes",
      "0 hours (same as GMT)"
    ],
    hint: "Multiply India's standard meridian 82.5° by 4 minutes per degree!",
    misconception: "IST is 5 hours 30 minutes ahead of GMT because India's standard meridian is 82.5°E (82.5 × 4 minutes = 330 minutes = 5 hours 30 minutes)!"
  },
  {
    type: 'sort',
    question: "Drag each temperature zone to its correct description!",
    answer: "sort",
    options: [],
    hint: "Torrid zone is hottest near equator, Temperate is moderate, Frigid is freezing near poles!",
    misconception: "The three temperature zones are based on latitude and sun angle: Torrid is hot with direct rays, Temperate is moderate with seasons, and Frigid is freezing!",
    sortItems: [
      { id: 'zone-tor', label: 'Torrid Zone', icon: 'torrid-zone', correctBin: 'bin-tor' },
      { id: 'zone-temp', label: 'Temperate Zone', icon: 'temperate-zone', correctBin: 'bin-temp' },
      { id: 'zone-frig', label: 'Frigid Zone', icon: 'frigid-zone', correctBin: 'bin-frig' }
    ],
    bins: [
      { id: 'bin-tor', label: 'Hottest Near Equator 🔥', color: '#DC2626' },
      { id: 'bin-temp', label: 'Moderate With Seasons 🌳', color: '#16A34A' },
      { id: 'bin-frig', label: 'Freezing Near Poles ❄️', color: '#3B82F6' }
    ]
  }
];

// ─── Navigator Navya Mascot ───────────────────────────────────

function NavigatorNavya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -5, 0] }
              : { rotate: [0, 8, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="navya-body" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <radialGradient id="navya-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Sailor Jacket / Body */}
          <rect x="22" y="48" width="31" height="30" rx="6" fill="url(#navya-body)" stroke="#0F172A" strokeWidth="2" />
          <path d="M37 48 L37 78" stroke="#38BDF8" strokeWidth="2" />
          {/* Compass Badge */}
          <circle cx="30" cy="58" r="5" fill="white" stroke="#D97706" strokeWidth="1.5" />
          <polygon points="30,54 32,58 30,62 28,58" fill="#DC2626" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="14" fill="url(#navya-face)" stroke="#D97706" strokeWidth="2" />
          {/* Sailor Hat */}
          <ellipse cx="37.5" cy="22" rx="16" ry="6" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M25 21 Q 37.5 12, 50 21 L 46 26 Q 37.5 20, 29 26 Z" fill="#1E3A8A" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1E293B" />
          <circle cx="43" cy="30" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 37 Q 37.5 41, 42 37" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Map in Hand */}
          <rect x="52" y="52" width="14" height="6" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(25 52 52)" />
          {/* Feet */}
          <ellipse cx="30" cy="82" rx="5" ry="3" fill="#0F172A" />
          <ellipse cx="45" cy="82" rx="5" ry="3" fill="#0F172A" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row ─────────────────────────────────────────────────

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
      width={110}
      height={95}
    >
      <div
        className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white cursor-grab active:cursor-grabbing select-none p-1"
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 38)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface LatLongGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LatLongGame({ width = 720, height = 560, onComplete }: LatLongGameProps) {
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
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

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
        newPos[item.id] = { x: 30 + idx * 140, y: height - 155 };
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
      const compMsg = "Wonderful! You are a brilliant navigation expert!";
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

    // Hit test bins
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      const binEl = document.getElementById(bin.id);
      if (binEl) {
        const rect = binEl.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          droppedBinId = bin.id;
        }
      }
    });

    if (droppedBinId === item.correctBin) {
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
      className="relative overflow-hidden select-none font-sans rounded-2xl shadow-2xl"
      style={{ width, height }}
    >
      {/* Background SVG with Gradient & Navigation Room Elements */}
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="nav-room-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="60%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#020617" />
          </linearGradient>
          <radialGradient id="porthole-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0284C7" stopOpacity="0.2" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#nav-room-grad)" />

        {/* Porthole window showing sky & stars */}
        <circle cx={width - 80} cy={80} r={45} fill="url(#porthole-glow)" stroke="#64748B" strokeWidth="6" />
        <circle cx={width - 95} cy={65} r="3" fill="white" opacity="0.8" />
        <circle cx={width - 65} cy={95} r="2.5" fill="white" opacity="0.9" />
        <circle cx={width - 75} cy={85} r="2" fill="white" opacity="0.7" />

        {/* Wooden desk/console at bottom */}
        <path d={`M 0 ${height - 40} L ${width} ${height - 40} L ${width} ${height} L 0 ${height} Z`} fill="#334155" />
        <path d={`M 0 ${height - 45} L ${width} ${height - 45} L ${width} ${height - 40} L 0 ${height - 40} Z`} fill="#475569" />
      </svg>

      {/* Top HUD */}
      <div className="absolute top-3 left-3 right-3 z-20 flex justify-between items-center bg-slate-900/80 backdrop-blur-md px-4 py-2 rounded-xl border border-slate-700">
        <div className="flex items-center gap-3">
          <GlobeIcon size={32} />
          <span className="text-white font-black text-lg tracking-wide">Latitudes & Longitudes</span>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 font-bold">Level</span>
              <span className="text-sm font-black text-amber-400">{challengeIdx + 1}/8</span>
            </div>
            <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
              <span className="text-xs text-slate-400 font-bold">Score</span>
              <span className="text-sm font-black text-emerald-400">{score}</span>
            </div>
            <StarRow count={Math.min(3, Math.floor(score / 25) + 1)} total={3} />
          </div>
        )}
      </div>

      <NavigatorNavya mood={mascotMood} speaking={speakingText} />

      {/* ─── TEACHING SCREEN ──────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col justify-between z-10">
          <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={slideIdx}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={`w-full p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl border-4 border-white/20 text-white`}
              >
                <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
                <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
                <p className="text-base font-medium leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-4">
              {TEACHING_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIdx(idx);
                  }}
                  className={`w-3 h-3 rounded-full transition-all ${idx === slideIdx ? 'bg-amber-400 w-8' : 'bg-slate-600'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center max-w-xl mx-auto w-full">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-xl font-bold transition-all ${slideIdx === 0 ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-800 text-white hover:bg-slate-700 border border-slate-600'}`}
            >
              Previous
            </button>
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  audioManager.play('success');
                  setScreen('play');
                  setMascotMood('celebrate');
                }
              }}
              className="px-8 py-3 rounded-xl font-black bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-lg hover:from-amber-600 hover:to-orange-600 transition-all text-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Exploration! 🚀" : "Next ➡️"}
            </button>
          </div>
        </div>
      )}

      {/* ���── PLAY SCREEN ──────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 pb-4 px-6 flex flex-col justify-between z-10">
          {/* Question Box */}
          <div className="bg-slate-900/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-xl max-w-2xl mx-auto w-full flex justify-between items-center">
            <h3 className="text-white font-bold text-base md:text-lg flex-1">{currentChallenge.question}</h3>
            <button
              onClick={handleShowHint}
              className="ml-3 px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/50 rounded-xl font-bold text-xs transition-all flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>

          {/* Identify Challenge Type */}
          {currentChallenge.type === 'identify' && (
            <div className="flex-1 flex flex-col justify-center items-center max-w-xl mx-auto w-full gap-3 my-2">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-slate-800/90 border-slate-700 text-white hover:bg-slate-700';

                if (selectedOpt !== null) {
                  if (isCorrectOpt) {
                    btnStyle = 'bg-emerald-600 border-emerald-400 text-white ring-4 ring-emerald-400/30';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-600 border-rose-400 text-white ring-4 ring-rose-400/30';
                  } else {
                    btnStyle = 'bg-slate-800/50 border-slate-800 text-slate-500 opacity-50';
                  }
                }

                return (
                  <motion.button
                    key={i}
                    whileHover={selectedOpt === null ? { scale: 1.02 } : {}}
                    whileTap={selectedOpt === null ? { scale: 0.98 } : {}}
                    onClick={e => selectedOpt === null && handleAnswerClick(opt, e)}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-left transition-all shadow-lg flex items-center justify-between ${btnStyle}`}
                  >
                    <span className="text-sm md:text-base">{opt}</span>
                    <span className="w-7 h-7 rounded-full bg-black/20 flex items-center justify-center text-xs font-black">
                      {String.fromCharCode(65 + i)}
                    </span>
                  </motion.button>
                );
              })}

              {selectedOpt !== null && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 w-full flex justify-end"
                >
                  <button
                    onClick={advanceChallenge}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-xl shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all text-base"
                  >
                    Continue ➡️
                  </button>
                </motion.div>
              )}
            </div>
          )}

          {/* Sort Challenge Type */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
            <div className="flex-1 flex flex-col justify-between max-w-3xl mx-auto w-full py-2">
              {/* Bins */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full">
                {currentChallenge.bins.map(bin => {
                  const isHovered = hoveredBin === bin.id;
                  return (
                    <div
                      key={bin.id}
                      id={bin.id}
                      className={`h-28 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-2 transition-all bg-slate-900/60 backdrop-blur-md ${isHovered ? 'border-solid scale-105' : 'border-slate-600'}`}
                      style={{ borderColor: bin.color }}
                    >
                      <span className="text-xs font-black text-center text-white" style={{ color: bin.color }}>
                        {bin.label}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-1">Drop here</span>
                    </div>
                  );
                })}
              </div>

              {/* Completion check for sort */}
              {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex justify-center my-2"
                >
                  <button
                    onClick={advanceChallenge}
                    className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-xl hover:from-emerald-600 hover:to-teal-700 transition-all text-lg"
                  >
                    Fantastic! Next Level 🚀
                  </button>
                </motion.div>
              )}

              {/* Draggable Items */}
              <div className="relative h-28 w-full flex justify-around items-center bg-slate-900/40 rounded-2xl border border-slate-700 px-4">
                {currentChallenge.sortItems.map(item => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 0}
                    y={itemPositions[item.id]?.y || 0}
                    placed={!!placedItems[item.id]}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Feedback Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
