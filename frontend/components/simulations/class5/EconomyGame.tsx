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

function FarmIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="10" width="48" height="40" rx="4" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <path d="M10 40 L30 20 L50 40 Z" fill="#22C55E" />
      <path d="M22 40 L30 30 L38 40 Z" fill="#16A34A" />
      <line x1="12" y1="46" x2="48" y2="46" stroke="#1E3A8A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TractorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="24" width="24" height="16" rx="3" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <circle cx="18" cy="42" r="8" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      <circle cx="42" cy="40" r="10" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      <path d="M34 24 L42 30 L42 40" stroke="#334155" strokeWidth="3" fill="none" />
      <path d="M12 24 L16 14 L26 14 L30 24" fill="#991B1B" />
    </svg>
  );
}

function FactoryIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="26" width="44" height="24" fill="#64748B" stroke="#334155" strokeWidth="2" />
      <polygon points="8,26 18,12 28,26 38,12 48,26" fill="#475569" stroke="#334155" strokeWidth="2" />
      <rect x="14" y="32" width="6" height="8" fill="#FDE047" />
      <rect x="26" y="32" width="6" height="8" fill="#FDE047" />
      <rect x="38" y="32" width="6" height="8" fill="#FDE047" />
      <path d="M18 12 L18 6 M38 12 L38 4" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TrainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="20" width="22" height="20" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="32" y="24" width="20" height="16" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="14" cy="44" r="5" fill="#334155" />
      <circle cx="24" cy="44" r="5" fill="#334155" />
      <circle cx="42" cy="44" r="5" fill="#334155" />
      <rect x="12" y="24" width="8" height="6" fill="white" />
    </svg>
  );
}

function TruckIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="24" width="28" height="16" rx="2" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      <rect x="36" y="28" width="16" height="12" rx="2" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
      <circle cx="16" cy="42" r="5" fill="#1E293B" />
      <circle cx="42" cy="42" r="5" fill="#1E293B" />
    </svg>
  );
}

function ShipIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M8 36 L12 48 L48 48 L52 36 Z" fill="#0284C7" stroke="#0369A1" strokeWidth="2" />
      <rect x="22" y="22" width="16" height="14" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
      <rect x="28" y="14" width="4" height="8" fill="#64748B" />
      <path d="M6 34 Q 30 42, 54 34" stroke="#38BDF8" strokeWidth="3" fill="none" />
    </svg>
  );
}

function AirplaneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 6 L34 26 L52 32 L52 36 L34 32 L32 50 L28 50 L26 32 L8 36 L8 32 L26 26 Z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" />
    </svg>
  );
}

function RuralVillageIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="15,26 25,14 35,26" fill="#B45309" />
      <rect x="17" y="26" width="16" height="18" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
      <polygon points="35,30 43,20 51,30" fill="#92400E" />
      <rect x="37" y="30" width="12" height="14" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
    </svg>
  );
}

function CityIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="20" width="12" height="30" fill="#475569" stroke="#1E293B" strokeWidth="2" />
      <rect x="22" y="10" width="16" height="40" fill="#334155" stroke="#0F172A" strokeWidth="2" />
      <rect x="40" y="26" width="12" height="24" fill="#64748B" stroke="#1E293B" strokeWidth="2" />
      <rect x="11" y="24" width="2" height="4" fill="#FEF08A" />
      <rect x="15" y="24" width="2" height="4" fill="#FEF08A" />
      <rect x="26" y="14" width="3" height="5" fill="#FEF08A" />
      <rect x="31" y="14" width="3" height="5" fill="#FEF08A" />
    </svg>
  );
}

function PopulationChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="4" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" />
      <rect x="14" y="32" width="6" height="14" fill="#3B82F6" />
      <rect x="24" y="24" width="6" height="22" fill="#10B981" />
      <rect x="34" y="16" width="6" height="30" fill="#F59E0B" />
      <line x1="10" y1="46" x2="50" y2="46" stroke="#0F172A" strokeWidth="2" />
    </svg>
  );
}

function CropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 L30 20" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 35 Q 20 25, 20 15 Q 30 25, 30 35 Z" fill="#22C55E" />
      <path d="M30 25 Q 40 18, 40 10 Q 30 18, 30 25 Z" fill="#4ADE80" />
      <ellipse cx="30" cy="42" rx="4" ry="6" fill="#CA8A04" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'crop': return <CropIcon size={size} />;
    case 'farm': return <FarmIcon size={size} />;
    case 'tractor': return <TractorIcon size={size} />;
    case 'factory': return <FactoryIcon size={size} />;
    case 'train': return <TrainIcon size={size} />;
    case 'truck': return <TruckIcon size={size} />;
    case 'ship': return <ShipIcon size={size} />;
    case 'airplane': return <AirplaneIcon size={size} />;
    case 'village': return <RuralVillageIcon size={size} />;
    case 'city': return <CityIcon size={size} />;
    case 'chart': return <PopulationChartIcon size={size} />;
    default: return <FarmIcon size={size} />;
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
    title: "Agriculture in India 🌾",
    text: "Agriculture is the main occupation of India, where nearly half the population depends on farming! We grow food grains like rice and wheat, and cash crops like cotton and sugarcane during Kharif (monsoon) and Rabi (winter) seasons.",
    emoji: "🌾",
    bgColor: "from-emerald-500 to-green-600",
    spoken: "Agriculture is the main occupation of India, where nearly half the population depends on farming! We grow food grains like rice and wheat, and cash crops during Kharif and Rabi seasons."
  },
  {
    title: "Industries in India 🏭",
    text: "Industries convert raw materials into finished products. Agro-based industries use farm products like cotton and sugar. Mineral-based industries use minerals like iron, steel, and cement to build our nation's infrastructure!",
    emoji: "🏭",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Industries convert raw materials into finished products. Agro-based industries use farm products, while mineral-based industries use minerals like iron and steel."
  },
  {
    title: "Transport in India 🚆",
    text: "Transport connects people, markets, and industries across India's vast lands. We use Roadways for flexible travel, Railways for long distances and heavy cargo, Waterways for cheap bulk shipping, and Airways for fast travel!",
    emoji: "🚆",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Transport connects people and goods across India. We use roadways, railways, waterways, and airways depending on cost, speed, and distance."
  },
  {
    title: "Population: Rural & Urban 🏙️",
    text: "India's massive population is divided into rural areas (villages where farming is key) and urban areas (cities with industries and services). Many people move from villages to cities for jobs, education, and better healthcare.",
    emoji: "🏙️",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "India's population is divided into rural villages and urban cities. Many people migrate from villages to cities for jobs, education, and healthcare."
  },
  {
    title: "Economic Growth & Development 📈",
    text: "Balancing agriculture, modern industries, efficient transport, and population control ensures that India's economy grows steadily, providing a prosperous and healthy life for every citizen!",
    emoji: "📈",
    bgColor: "from-teal-500 to-cyan-600",
    spoken: "Balancing agriculture, industries, transport, and population control ensures India's economy grows steadily, providing prosperity for all."
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
    question: "What is the main occupation of the majority of people in India?",
    answer: "Agriculture",
    options: [
      "Agriculture",
      "Information Technology",
      "Aerospace Engineering"
    ],
    hint: "Think about which sector employs nearly half of India's working population directly off the land!",
    misconception: "Agriculture is the main occupation because India has vast fertile plains, monsoon rains, and a large rural population depending on farming!"
  },
  {
    type: 'sort',
    question: "Drag each crop or agricultural item to its correct category!",
    answer: "sort",
    options: [],
    hint: "Rice is sown in monsoon (Kharif), wheat in winter (Rabi), and cotton/tea are cash or plantation crops!",
    misconception: "Kharif crops are sown in monsoon (June-July) like rice, rabi in winter (Oct-Nov) like wheat, and cash/plantation crops are grown for sale!",
    sortItems: [
      { id: 'c-rice', label: 'Rice (Kharif)', icon: 'crop', correctBin: 'bin-kharif' },
      { id: 'c-wheat', label: 'Wheat (Rabi)', icon: 'crop', correctBin: 'bin-rabi' },
      { id: 'c-cotton', label: 'Cotton (Cash)', icon: 'crop', correctBin: 'bin-cash' }
    ],
    bins: [
      { id: 'bin-kharif', label: 'Kharif (Monsoon) 🌧️', color: '#0284C7' },
      { id: 'bin-rabi', label: 'Rabi (Winter) ❄️', color: '#2563EB' },
      { id: 'bin-cash', label: 'Cash Crop 💰', color: '#16A34A' }
    ]
  },
  {
    type: 'identify',
    question: "Which of the following is an AGRO-BASED industry?",
    answer: "Cotton textile mill",
    options: [
      "Cotton textile mill",
      "Iron and steel plant",
      "Cement manufacturing plant"
    ],
    hint: "Agro-based industries process raw materials that come directly from farms, like cotton or sugarcane!",
    misconception: "Cotton textile mills are agro-based because they use farm-grown cotton, whereas steel and cement plants are mineral-based!"
  },
  {
    type: 'sort',
    question: "Drag each industry to whether it is Agro-Based or Mineral-Based!",
    answer: "sort",
    options: [],
    hint: "Sugar and jute come from farms (agro-based); iron and steel come from mines (mineral-based)!",
    misconception: "Agro-based industries use farm raw materials (sugar, jute, textiles), while mineral-based industries use mine ores (steel, cement, aluminum)!",
    sortItems: [
      { id: 'ind-sugar', label: 'Sugar Mill', icon: 'factory', correctBin: 'bin-agro' },
      { id: 'ind-steel', label: 'Steel Plant', icon: 'factory', correctBin: 'bin-mineral' },
      { id: 'ind-jute', label: 'Jute Mill', icon: 'factory', correctBin: 'bin-agro' },
      { id: 'ind-cement', label: 'Cement Plant', icon: 'factory', correctBin: 'bin-mineral' }
    ],
    bins: [
      { id: 'bin-agro', label: 'Agro-Based 🌾', color: '#16A34A' },
      { id: 'bin-mineral', label: 'Mineral-Based ⛏️', color: '#B45309' }
    ]
  },
  {
    type: 'identify',
    question: "Which is the FASTEST means of transport in India?",
    answer: "Airways",
    options: [
      "Airways",
      "Railways",
      "Waterways"
    ],
    hint: "Think about which vehicle flies through the sky between major cities in just a couple of hours!",
    misconception: "Airways are the fastest means of transport, though they are also the costliest. Waterways are the cheapest for heavy cargo!"
  },
  {
    type: 'sort',
    question: "Drag each transport mode to its best feature!",
    answer: "sort",
    options: [],
    hint: "Roads reach everywhere, rails carry heavy loads long distances, water is cheapest for bulk cargo, air is fastest!",
    misconception: "Roadways provide door-to-door village access, railways handle bulk cross-country travel, waterways are cheapest for heavy goods, and airways are fastest!",
    sortItems: [
      { id: 'tr-road', label: 'Roadways', icon: 'truck', correctBin: 'bin-road' },
      { id: 'tr-rail', label: 'Railways', icon: 'train', correctBin: 'bin-rail' },
      { id: 'tr-water', label: 'Waterways', icon: 'ship', correctBin: 'bin-water' },
      { id: 'tr-air', label: 'Airways', icon: 'airplane', correctBin: 'bin-air' }
    ],
    bins: [
      { id: 'bin-road', label: 'Flexible & Local 🚚', color: '#EA580C' },
      { id: 'bin-rail', label: 'Long Distance 🚆', color: '#2563EB' },
      { id: 'bin-water', label: 'Cheapest for Cargo 🚢', color: '#0284C7' },
      { id: 'bin-air', label: 'Fastest Travel ✈️', color: '#9333EA' }
    ]
  },
  {
    type: 'identify',
    question: "What is the main reason people migrate from villages to cities in India?",
    answer: "Better jobs, education, and healthcare",
    options: [
      "Better jobs, education, and healthcare",
      "To enjoy noisy traffic and crowded streets",
      "Because villages have no air to breathe"
    ],
    hint: "Think about why a family might move: employment, good schools for children, and specialist hospitals!",
    misconception: "Rural-to-urban migration is driven primarily by the search for better employment opportunities, higher education, and advanced healthcare facilities."
  },
  {
    type: 'sort',
    question: "Drag each characteristic to Rural or Urban area!",
    answer: "sort",
    options: [],
    hint: "Villages and farming belong to rural; skyscrapers and offices belong to urban!",
    misconception: "Rural areas are characterized by farming, villages, and open nature. Urban areas feature cities, factories, services, and high population density!",
    sortItems: [
      { id: 'char-farm', label: 'Agriculture & Farming', icon: 'farm', correctBin: 'bin-rural' },
      { id: 'char-city', label: 'Skyscrapers & Offices', icon: 'city', correctBin: 'bin-urban' },
      { id: 'char-vill', label: 'Quiet Village Life', icon: 'village', correctBin: 'bin-rural' },
      { id: 'char-ind', label: 'Industries & Services', icon: 'factory', correctBin: 'bin-urban' }
    ],
    bins: [
      { id: 'bin-rural', label: 'Rural (Villages) 🏡', color: '#16A34A' },
      { id: 'bin-urban', label: 'Urban (Cities) 🏙️', color: '#2563EB' }
    ]
  }
];

// ─── Economist Arnav Mascot ───────────��─────────────────────────

function EconomistArnav({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-400"
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
            <linearGradient id="arnav-suit" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="100%" stopColor="#065F46" />
            </linearGradient>
            <radialGradient id="arnav-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Suit / Body */}
          <rect x="22" y="48" width="31" height="30" rx="6" fill="url(#arnav-suit)" stroke="#064E3B" strokeWidth="2" />
          <path d="M37 48 L37 78" stroke="#A7F3D0" strokeWidth="2" />
          {/* Rupee Badge */}
          <circle cx="30" cy="58" r="5" fill="white" stroke="#059669" strokeWidth="1.5" />
          <text x="27" y="61" fontSize="9" fontWeight="bold" fill="#059669">₹</text>
          {/* Head */}
          <circle cx="37.5" cy="32" r="14" fill="url(#arnav-face)" stroke="#D97706" strokeWidth="2" />
          {/* Glasses */}
          <circle cx="32" cy="30" r="4" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="43" cy="30" r="4" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="36" y1="30" x2="39" y2="30" stroke="#1E293B" strokeWidth="1.5" />
          {/* Smile */}
          <path d="M33 nav-smile Q 37.5 39, 42 35" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M33 36 Q 37.5 40, 42 36" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Hair */}
          <path d="M23 25 Q 37.5 16, 52 25" fill="#451A03" />
          {/* Briefcase */}
          <rect x="50" y="54" width="14" height="10" rx="2" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
          <path d="M54 54 L54 52 L60 52 L60 54" fill="none" stroke="#451A03" strokeWidth="1.5" />
          {/* Feet */}
          <ellipse cx="30" cy="82" rx="5" ry="3" fill="#064E3B" />
          <ellipse cx="45" cy="82" rx="5" ry="3" fill="#064E3B" />
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

// ─── Scene Background ─────────────────────────────────────────

function EconomySceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="economy-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BAE6FD" />
            <stop offset="60%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#economy-sky)" />
        {/* Distant farm hills */}
        <path d={`M0 ${height * 0.65} Q ${width * 0.3} ${height * 0.45}, ${width * 0.6} ${height * 0.6} T ${width} ${height * 0.55} L ${width} ${height} L 0 ${height} Z`} fill="#86EFAC" opacity="0.5" />
        {/* City skyline silhouettes */}
        <rect x={width * 0.7} y={height * 0.4} width={width * 0.25} height={height * 0.25} fill="#94A3B8" opacity="0.3" />
      </svg>
    </div>
  );
}

// ─── Sort Card & Bin ──────────────────────────────────────────

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
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 ${
          placed ? 'bg-green-100 border-green-400 opacity-60' : 'bg-white border-emerald-300'
        }`}
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;
}

function SortBin({ id, label, color, x, y, width, height, isHovered }: SortBinProps) {
  return (
    <div
      id={id}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${
        isHovered ? 'scale-105 shadow-2xl' : 'shadow-md'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center px-2">{label}</span>
    </div>
  );
}

// ─── Main EconomyGame Component ────────────────────────────────

export interface EconomyGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EconomyGame({ width = 720, height = 560, onComplete }: EconomyGameProps) {
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

  const handleShowHint = useCallback(() => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  }, [currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [handleShowHint]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, currentChallenge, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 160, y: height - 160 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, currentChallenge]);

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
      const msg = "Brilliant! That is correct!";
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
      const compMsg = "Fantastic job! You mastered Indian Economy!";
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

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach(bin => {
      const el = document.getElementById(bin.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        if (x >= rect.left - 30 && x <= rect.right + 30 && y >= rect.top - 30 && y <= rect.bottom + 30) {
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
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-emerald-50 select-none font-sans"
      style={{ width, height }}
    >
      <EconomySceneBackground width={width} height={height} />
      <EconomistArnav mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Success Banner */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}

      {/* ─── TEACHING SCREEN ────────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10">
          <div className="w-full flex justify-between items-center bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-emerald-200">
            <h1 className="text-xl font-black text-emerald-900">Class 5 Geography: Indian Economy</h1>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-600">
                Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
              </span>
              <button
                onClick={() => setScreen('play')}
                className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl shadow transition"
              >
                Start Game 🚀
              </button>
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl p-6 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center my-auto border-4 border-white/30`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed bg-black/20 p-4 rounded-2xl">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          <div className="w-full max-w-xl flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-md">
            <button
              onClick={() => {
                audioManager.play('tap');
                setSlideIdx(prev => Math.max(0, prev - 1));
              }}
              disabled={slideIdx === 0}
              className="px-5 py-2 bg-gray-200 hover:bg-gray-300 disabled:opacity-40 font-bold rounded-xl text-gray-700 transition"
            >
              Previous
            </button>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === slideIdx ? 'bg-emerald-600 scale-125' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            {slideIdx < TEACHING_SLIDES.length - 1 ? (
              <button
                onClick={() => {
                  audioManager.play('tap');
                  setSlideIdx(prev => prev + 1);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 font-bold rounded-xl text-white shadow transition"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => {
                  audioManager.play('success');
                  setScreen('play');
                }}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 font-bold rounded-xl text-white shadow-lg transition"
              >
                Play Game! 🎮
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md border border-emerald-200">
            <div className="flex items-center gap-3">
              <span className="text-sm font-black text-emerald-800">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={Math.min(3, Math.floor(score / 30))} total={3} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-gray-700">Score: {score}</span>
              <button
                onClick={handleShowHint}
                className="px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold rounded-xl text-xs shadow transition flex items-center gap-1"
              >
                💡 Hint
              </button>
            </div>
          </div>

          {/* Main Challenge Area */}
          <div className="flex flex-col items-center justify-center my-auto">
            <div className="bg-white/95 backdrop-blur-md px-6 py-4 rounded-3xl shadow-xl border-2 border-emerald-300 max-w-xl text-center mb-6">
              <h2 className="text-lg font-black text-gray-800">{currentChallenge.question}</h2>
            </div>

            {/* IDENTIFY CHALLENGE */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnStyle = 'bg-white hover:bg-emerald-50 text-gray-800 border-emerald-300';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnStyle = 'bg-green-500 text-white border-green-600';
                    else if (isSelected) btnStyle = 'bg-red-500 text-white border-red-600';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null && isCorrectAnswer}
                      className={`p-4 rounded-2xl font-bold border-2 shadow-md transition text-left flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAnswer && <span>✅</span>}
                      {selectedOpt && isSelected && !isCorrectAnswer && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* SORT CHALLENGE */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full max-w-2xl h-[280px]">
                {/* Bins */}
                <div className="flex justify-around absolute top-2 left-0 right-0">
                  {currentChallenge.bins.map(bin => (
                    <SortBin
                      key={bin.id}
                      id={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={0}
                      y={0}
                      width={160}
                      height={100}
                      isHovered={hoveredBin === bin.id}
                    />
                  ))}
                </div>

                {/* Draggable Items */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 180 };
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
          </div>

          {/* Bottom Navigation / Next Button */}
          <div className="flex justify-end bg-white/80 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md">
            {((selectedOpt && selectedOpt === currentChallenge.answer) ||
              (currentChallenge.type === 'sort' &&
                currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black rounded-2xl shadow-lg flex items-center gap-2"
              >
                <span>Next Challenge</span>
                <span>➡️</span>
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
