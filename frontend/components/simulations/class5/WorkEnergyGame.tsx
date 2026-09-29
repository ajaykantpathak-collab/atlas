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

// ─── SVG Icon Components ────��────────────────────────────────

function WorkDoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="16" r="6" fill="#3B82F6" />
      <path d="M22 28 L30 22 L38 28 L35 45 L25 45 Z" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="18" y="32" width="6" height="12" rx="2" fill="#F59E0B" />
      <rect x="36" y="32" width="6" height="12" rx="2" fill="#F59E0B" />
      <path d="M20 52 L40 52" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 20 L50 20 M46 16 L50 20 L46 24" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function NoWorkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="10" height="35" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2" />
      <circle cx="32" cy="22" r="5" fill="#EF4444" />
      <path d="M28 32 L36 28 L34 45 L26 45 Z" fill="#F87171" />
      <path d="M36 30 L46 30 M42 26 L46 30 L42 34" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <line x1="8" y1="52" x2="52" y2="52" stroke="#374151" strokeWidth="3" />
    </svg>
  );
}

function LightBulbIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="25" r="12" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      <rect x="26" y="39" width="8" height="6" rx="1" fill="#9CA3AF" />
      <path d="M26 47 L34 47 M28 50 L32 50" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 15 L18 18 M46 15 L42 18 M30 10 L30 14" stroke="#F59E0B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function FireIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 Q40 25, 36 38 Q44 44, 30 50 Q16 44, 24 38 Q20 25, 30 10 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      <path d="M30 22 Q35 32, 30 42 Q25 32, 30 22 Z" fill="#FACC15" />
    </svg>
  );
}

function BatteryIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="18" width="24" height="30" rx="3" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="26" y="12" width="8" height="6" rx="1" fill="#93C5FD" />
      <line x1="24" y1="28" x2="36" y2="28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="22" x2="30" y2="34" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <line x1="24" y1="40" x2="36" y2="40" stroke="white" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function SoundWaveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 22 L22 22 L32 15 L32 45 L22 38 L15 38 Z" fill="#8B5CF6" stroke="#5B21B6" strokeWidth="2" />
      <path d="M38 22 Q44 30, 38 38" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M43 17 Q52 30, 43 43" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SolarPanelIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="18" width="36" height="22" rx="2" fill="#1E40AF" stroke="#1E3A8A" strokeWidth="2" />
      <line x1="12" y1="29" x2="48" y2="29" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="24" y1="18" x2="24" y2="40" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="36" y1="18" x2="36" y2="40" stroke="#93C5FD" strokeWidth="1.5" />
      <path d="M30 40 L30 48 M22 48 L38 48" stroke="#4B5563" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function WindTurbineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="30" y1="50" x2="30" y2="22" stroke="#6B7280" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="22" r="3" fill="#374151" />
      <path d="M30 22 L15 12 M30 22 L45 18 M30 22 L32 38 Z" stroke="#38BDF8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="30" cy="52" rx="8" ry="3" fill="#9CA3AF" />
    </svg>
  );
}

function CoalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 42 Q12 32, 22 28 Q26 18, 38 22 Q48 25, 45 38 Q48 48, 30 48 Q15 52, 15 42 Z" fill="#374151" stroke="#1F2937" strokeWidth="2" />
      <circle cx="25" cy="32" r="3" fill="#4B5563" />
      <circle cx="38" cy="35" r="2.5" fill="#4B5563" />
    </svg>
  );
}

function DamIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 20 L48 20 L42 45 L18 45 Z" fill="#6B7280" stroke="#374151" strokeWidth="2" />
      <path d="M12 25 Q25 28, 48 25" stroke="#38BDF8" strokeWidth="4" fill="none" />
      <path d="M30 30 L30 42 M26 38 L30 42 L34 38" stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PetrolIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="20" width="24" height="28" rx="3" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <path d="M30 14 L30 20" stroke="#991B1B" strokeWidth="3" strokeLinecap="round" />
      <path d="M42 28 L50 22 L52 26 L42 34 Z" fill="#F59E0B" />
      <text x="30" y="37" fontSize="10" fontWeight="bold" fill="white" textAnchor="middle">FUEL</text>
    </svg>
  );
}

function EnergyChartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <line x1="18" y1="40" x2="42" y2="40" stroke="#92400E" strokeWidth="2" />
      <line x1="18" y1="40" x2="18" y2="20" stroke="#92400E" strokeWidth="2" />
      <rect x="22" y="30" width="5" height="10" fill="#3B82F6" />
      <rect x="30" y="24" width="5" height="16" fill="#10B981" />
      <rect x="38" y="18" width="5" height="22" fill="#F59E0B" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'workDone': return <WorkDoneIcon size={size} />;
    case 'noWork': return <NoWorkIcon size={size} />;
    case 'light': return <LightBulbIcon size={size} />;
    case 'heat': return <FireIcon size={size} />;
    case 'electricity': return <BatteryIcon size={size} />;
    case 'sound': return <SoundWaveIcon size={size} />;
    case 'solar': return <SolarPanelIcon size={size} />;
    case 'wind': return <WindTurbineIcon size={size} />;
    case 'coal': return <CoalIcon size={size} />;
    case 'petrol': return <PetrolIcon size={size} />;
    case 'hydro': return <DamIcon size={size} />;
    default: return <WorkDoneIcon size={size} />;
  }
}

// ─── Physics Workshop Background ──────────────────────────────

function PhysicsBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-energy-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
          <linearGradient id="ground-energy-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#475569" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-energy-grad)" />
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#ground-energy-grad)" />
        {/* Sun glowing */}
        <circle cx="100" cy="80" r="35" fill="#FBBF24" opacity="0.2" />
        <circle cx="100" cy="80" r="25" fill="#F59E0B" opacity="0.3" />
      </svg>
    </div>
  );
}

// ─── Engineer Eshaan Mascot ───────────────────────────────────

function EngineerEsha({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
              ? { y: [0, -4, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="70" height="85" viewBox="0 0 70 85">
          {/* Hard Hat */}
          <path d="M20 22 Q35 10, 50 22 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <rect x="16" y="22" width="38" height="4" rx="2" fill="#D97706" />
          {/* Head & Face */}
          <circle cx="35" cy="38" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Solar Panel Badge on hat */}
          <rect x="30" y="15" width="10" height="7" rx="1" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="30" cy="37" r="2" fill="#1F2937" />
          <circle cx="40" cy="37" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M31 43 Q35 47, 39 43" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Overalls / Body */}
          <path d="M22 52 L35 48 L48 52 L52 75 L18 75 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
          {/* Wind Turbine Badge */}
          <circle cx="35" cy="62" r="5" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
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
    title: "What is Work in Science? 🏋️",
    text: "In science, work is done ONLY when a force is applied AND the object actually moves! Pushing a wall that does not budge is WORK NOT DONE, even if you feel tired!",
    emoji: "🏋️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "In science, work is done only when a force is applied and the object actually moves. Pushing a wall that does not move is work not done!",
  },
  {
    title: "Energy is Needed for Work! ⚡",
    text: "Energy is the ability to do work! Without energy, no work can be done. Our body gets energy from food, cars get energy from fuel, and appliances get energy from electricity.",
    emoji: "⚡",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Energy is the ability to do work. Without energy, no work can be done. Our body gets energy from food and cars get energy from fuel!",
  },
  {
    title: "Forms of Energy! 💡",
    text: "Energy appears in many forms! Light energy helps us see, heat energy keeps us warm and cooks food, electrical energy runs appliances, and sound energy lets us hear!",
    emoji: "💡",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Energy appears in many forms like light energy to see, heat energy to warm, electrical energy for appliances, and sound energy to hear!",
  },
  {
    title: "Renewable Energy Sources ☀️",
    text: "Renewable sources never run out because nature replaces them quickly! Solar energy from sunlight and wind energy from moving air can be used again and again.",
    emoji: "☀️",
    bgColor: "from-purple-500 to-gold-600",
    spoken: "Renewable sources never run out because nature replaces them quickly, like solar energy from sunlight and wind energy from moving air!",
  },
  {
    title: "Non-Renewable Sources 🛢️",
    text: "Non-renewable sources like coal and petroleum exist in limited amounts in the Earth. They took millions of years to form and will eventually run out when used up!",
    emoji: "🛢️",
    bgColor: "from-rose-500 to-red-600",
    spoken: "Non-renewable sources like coal and petroleum exist in limited amounts and took millions of years to form. Once used up, they are gone!",
  },
];

// ─── Challenges Definition ──────────────���─────────────────----

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
    question: 'In which case is WORK DONE in the scientific sense?',
    answer: 'Lifting a school bag from the floor to a table',
    options: [
      'Lifting a school bag from the floor to a table',
      'Pushing a strong brick wall that does not move',
      'Holding a heavy bucket still above your head',
    ],
    hint: 'Remember the two conditions: force applied AND the object must move!',
    misconception: 'Feeling tired is not enough! Work is done only when a force is applied AND the object actually changes its position.',
  },
  {
    type: 'sort',
    question: 'Drag each action to Work Done or Work Not Done!',
    answer: 'sort',
    options: [],
    hint: 'Did the object move in the direction of the force?',
    misconception: 'Carrying a bag horizontally is work not done because the lifting force is upward while motion is forward!',
    sortItems: [
      { id: 's1', label: 'Lifting a bucket of water', icon: 'workDone', correctBin: 'work-done' },
      { id: 's2', label: 'Pushing a wall that stays still', icon: 'noWork', correctBin: 'no-work' },
      { id: 's3', label: 'Pulling a cart forward', icon: 'workDone', correctBin: 'work-done' },
      { id: 's4', label: 'Holding a heavy box still', icon: 'noWork', correctBin: 'no-work' },
    ],
    bins: [
      { id: 'work-done', label: 'Work Done ✅', color: '#10B981' },
      { id: 'no-work', label: 'Work Not Done ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'What is needed in order to do any work?',
    answer: 'Energy',
    options: [
      'Energy',
      'Loud noise',
      'Cold water',
    ],
    hint: 'Think of what fuels your body and makes cars run!',
    misconception: 'Energy is the ability or capacity to do work. Without energy, no work can be done.',
  },
  {
    type: 'sort',
    question: 'Drag each example to its correct Form of Energy!',
    answer: 'sort',
    options: [],
    hint: 'Light helps us see, heat warms, electricity runs appliances, sound lets us hear!',
    misconception: 'Match each energy form to the specific work it does — light for seeing, heat for warming, electricity for appliances, sound for hearing!',
    sortItems: [
      { id: 'e1', label: 'Glowing light bulb', icon: 'light', correctBin: 'light-bin' },
      { id: 'e2', label: 'Campfire warmth', icon: 'heat', correctBin: 'heat-bin' },
      { id: 'e3', label: 'Battery running a torch', icon: 'electricity', correctBin: 'elec-bin' },
      { id: 'e4', label: 'Beating a drum', icon: 'sound', correctBin: 'sound-bin' },
    ],
    bins: [
      { id: 'light-bin', label: 'Light 💡', color: '#F59E0B' },
      { id: 'heat-bin', label: 'Heat 🔥', color: '#EF4444' },
      { id: 'elec-bin', label: 'Electrical ⚡', color: '#3B82F6' },
      { id: 'sound-bin', label: 'Sound 🔊', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a RENEWABLE source of energy?',
    answer: 'Solar energy from sunlight',
    options: [
      'Solar energy from sunlight',
      'Coal from deep mines',
      'Petrol from crude oil',
    ],
    hint: 'Which source never runs out because the Sun provides it every day?',
    misconception: 'Solar energy is renewable because sunlight is continuously available and naturally replaced every morning!',
  },
  {
    type: 'sort',
    question: 'Drag each source to Renewable or Non-Renewable!',
    answer: 'sort',
    options: [],
    hint: 'Solar and wind never run out. Coal and petrol will eventually run out!',
    misconception: 'Remember: renewable sources like solar and wind do not run out, while non-renewable sources like coal and petrol take millions of years to form and are limited.',
    sortItems: [
      { id: 'r1', label: 'Sunlight (Solar)', icon: 'solar', correctBin: 'renewable' },
      { id: 'r2', label: 'Wind energy', icon: 'wind', correctBin: 'renewable' },
      { id: 'r3', label: 'Coal from mines', icon: 'coal', correctBin: 'non-renewable' },
      { id: 'r4', label: 'Petrol from oil', icon: 'petrol', correctBin: 'non-renewable' },
    ],
    bins: [
      { id: 'renewable', label: 'Renewable ☀️', color: '#10B981' },
      { id: 'non-renewable', label: 'Non-Renewable 🛢️', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Why are coal and petroleum called non-renewable?',
    answer: 'They took millions of years to form and will run out',
    options: [
      'They took millions of years to form and will run out',
      'They can be regrown in a few days like plants',
      'They are produced fresh every morning by sunlight',
    ],
    hint: 'Think about ancient plants and animals trapped underground!',
    misconception: 'Coal and petroleum are finite stocks locked in the Earth. Once burned, they are gone forever and cannot be replaced in our lifetime.',
  },
  {
    type: 'sort',
    question: 'Sort these energy sources correctly!',
    answer: 'sort',
    options: [],
    hint: 'Dam/Hydro is renewable, coal/petrol are non-renewable!',
    misconception: 'Hydroelectric energy from flowing river water is renewable, whereas coal and petroleum are non-renewable fossil fuels!',
    sortItems: [
      { id: 'x1', label: 'Hydroelectric Dam', icon: 'hydro', correctBin: 'renewable' },
      { id: 'x2', label: 'Coal power plant', icon: 'coal', correctBin: 'non-renewable' },
      { id: 'x3', label: 'Solar rooftop panels', icon: 'solar', correctBin: 'renewable' },
      { id: 'x4', label: 'Petrol vehicle fuel', icon: 'petrol', correctBin: 'non-renewable' },
    ],
    bins: [
      { id: 'renewable', label: 'Renewable 🌿', color: '#10B981' },
      { id: 'non-renewable', label: 'Non-Renewable ⚠️', color: '#EF4444' },
    ],
  },
];

// ─── Sort Card & Bin Components ───────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovered ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <span className="text-xs font-bold px-2 py-1 rounded-lg text-white shadow" style={{ backgroundColor: color }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface WorkEnergyGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function WorkEnergyGame({ width = 720, height = 560, onComplete }: WorkEnergyGameProps) {
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
      const count = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - count * 120) / 2);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + idx * 125, y: height - 130 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

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
      const compMsg = "Wonderful! You are an expert energy engineer!";
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
    const binCount = currentChallenge.bins.length;
    const binWidth = 140;
    const binHeight = 90;
    const totalWidth = binCount * binWidth + (binCount - 1) * 20;
    const startX = (width - totalWidth) / 2;
    const binY = 180;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
        droppedBinId = bin.id;
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
    <div className="relative overflow-hidden select-none font-sans rounded-2xl shadow-2xl border-4 border-amber-400 bg-slate-900" style={{ width, height }}>
      <PhysicsBackground width={width} height={height} />
      <EngineerEsha mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      {/* Header bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur border-b border-slate-700 flex items-center justify-between px-4 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-amber-400 tracking-wide">Work & Energy Explorer</span>
          <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-700">
            Score: {score}
          </span>
          {screen === 'play' && (
            <button
              onClick={handleShowHint}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-1 rounded-full text-xs shadow transition flex items-center gap-1"
            >
              💡 Hint
            </button>
          )}
        </div>
      </div>

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-between z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className={`w-full max-w-xl p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-2 border-white/20 flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm leading-relaxed font-medium bg-black/20 p-4 rounded-xl border border-white/10">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          <div className="flex items-center justify-between w-full max-w-xl px-4">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2 rounded-xl font-bold text-white shadow ${slideIdx === 0 ? 'bg-gray-600 opacity-40 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500'}`}
            >
              ⬅️ Previous
            </button>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-amber-400 scale-125' : 'bg-slate-600'} transition-all`} />
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
              className="px-6 py-2 rounded-xl font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 shadow"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-4 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-2xl bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-xl">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-amber-400">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <span className="text-xs font-bold text-slate-400">{Math.round(((challengeIdx) / CHALLENGES.length) * 100)}% Complete</span>
            </div>
            <h3 className="text-base font-extrabold text-white text-center">{currentChallenge.question}</h3>
          </div>

          {/* Identify Challenge */}
          {currentChallenge.type === 'identify' && (
            <div className="flex flex-col gap-3 w-full max-w-md my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-slate-800/90 border-slate-600 text-white hover:bg-slate-700';
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = 'bg-emerald-600 border-emerald-400 text-white';
                  else if (isSelected) btnStyle = 'bg-rose-600 border-rose-400 text-white';
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`w-full p-4 rounded-2xl border-2 text-sm font-bold shadow-lg transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span className="text-lg">✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span className="text-lg">❌</span>}
                  </motion.button>
                );
              })}
              {selectedOpt && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={advanceChallenge}
                  className="mt-4 w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-xl text-center"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Game! 🏆'}
                </motion.button>
              )}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full flex-1 my-2">
              {/* Bins */}
              <div className="absolute top-4 left-0 right-0 flex justify-center gap-4">
                {currentChallenge.bins.map((bin) => (
                  <SortBin
                    key={bin.id}
                    id={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={0}
                    y={0}
                    width={140}
                    height={90}
                    isHovered={hoveredBin === bin.id}
                  />
                ))}
              </div>

              {/* Draggable Cards */}
              {currentChallenge.sortItems.map((item) => {
                const pos = itemPositions[item.id] || { x: 50, y: 350 };
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

              {/* Advance Button when all placed */}
              {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-4 left-0 right-0 flex justify-center z-30"
                >
                  <button
                    onClick={advanceChallenge}
                    className="px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-2xl shadow-2xl text-base border-2 border-white"
                  >
                    {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge 🚀' : 'Complete Game! 🏆'}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
