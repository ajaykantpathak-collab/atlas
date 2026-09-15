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

function SolidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" rx="4" fill="#3F51B5" stroke="#1A237E" strokeWidth="2.5" />
      <circle cx="21" cy="21" r="3" fill="#C5CAE9" />
      <circle cx="30" cy="21" r="3" fill="#C5CAE9" />
      <circle cx="39" cy="21" r="3" fill="#C5CAE9" />
      <circle cx="21" cy="30" r="3" fill="#C5CAE9" />
      <circle cx="30" cy="30" r="3" fill="#C5CAE9" />
      <circle cx="39" cy="30" r="3" fill="#C5CAE9" />
      <circle cx="21" cy="39" r="3" fill="#C5CAE9" />
      <circle cx="30" cy="39" r="3" fill="#C5CAE9" />
      <circle cx="39" cy="39" r="3" fill="#C5CAE9" />
    </svg>
  );
}

function LiquidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 16 L44 16 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" opacity="0.85" />
      <path d="M20 28 Q30 24, 40 32 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#00BCD4" opacity="0.6" />
      <circle cx="26" cy="36" r="2.5" fill="#E0F7FA" />
      <circle cx="34" cy="42" r="2.5" fill="#E0F7FA" />
      <circle cx="31" cy="34" r="2" fill="#E0F7FA" />
      <circle cx="23" cy="44" r="2" fill="#E0F7FA" />
    </svg>
  );
}

function GasIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="6" fill="none" stroke="#FF9800" strokeWidth="2" strokeDasharray="4 4" />
      <circle cx="20" cy="22" r="3.5" fill="#FFB74D" />
      <circle cx="42" cy="18" r="3.5" fill="#FFB74D" />
      <circle cx="31" cy="31" r="3.5" fill="#FFB74D" />
      <circle cx="18" cy="43" r="3.5" fill="#FFB74D" />
      <circle cx="44" cy="40" r="3.5" fill="#FFB74D" />
      <path d="M22 24 L28 29 M39 20 L33 27 M31 33 L40 38" stroke="#FFE0B2" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L50 20 L50 40 L30 50 L10 40 L10 20 Z" fill="#B3E5FC" stroke="#0288D1" strokeWidth="2" />
      <path d="M30 10 L30 30 L50 20 M30 30 L10 20 M30 30 L30 50" stroke="#81D4FA" strokeWidth="1.5" />
    </svg>
  );
}

function WaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 Q42 28, 42 38 C42 45, 37 50, 30 50 C23 50, 18 45, 18 38 Q18 28, 30 10 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="2" />
      <path d="M25 35 Q30 32, 35 36" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7" />
    </svg>
  );
}

function SteamIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 42 Q15 36, 20 30 Q25 24, 20 18" stroke="#90A4AE" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M30 45 Q25 38, 32 32 Q38 26, 30 15" stroke="#B0BEC5" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M40 42 Q45 35, 38 28 Q32 20, 40 12" stroke="#CFD8DC" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function BurnerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="46" width="30" height="6" rx="2" fill="#455A64" />
      <rect x="27" y="32" width="6" height="15" fill="#78909C" />
      <ellipse cx="30" cy="32" rx="8" ry="3" fill="#90A4AE" />
      <path d="M20 32 Q30 5, 40 32 Q35 24, 30 15 Q25 24, 20 32 Z" fill="#FF7043" opacity="0.9" />
      <path d="M24 30 Q30 12, 36 30 Q33 22, 30 18 Q27 22, 24 30 Z" fill="#FFEE58" opacity="0.9" />
    </svg>
  );
}

function CamphorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,12 48,22 48,42 30,52 12,42 12,22" fill="#F5F5F5" stroke="#9E9E9E" strokeWidth="2" />
      <path d="M20 28 L40 28 M20 35 L35 35" stroke="#E0E0E0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M35 15 Q45 8, 52 16" stroke="#B0BEC5" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="3 3" />
    </svg>
  );
}

function NaphthaleneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="16" fill="#FAFAFA" stroke="#BDBDBD" strokeWidth="2" />
      <circle cx="24" cy="24" r="3" fill="#EEEEEE" />
      <path d="M38 22 Q48 15, 52 24" stroke="#90A4AE" strokeWidth="2" strokeLinecap="round" fill="none" strokeDasharray="2 2" />
    </svg>
  );
}

function ThermometerObjIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="10" width="10" height="34" rx="5" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
      <circle cx="30" cy="46" r="7" fill="#E53935" stroke="#C62828" strokeWidth="2" />
      <rect x="28" y="22" width="4" height="22" fill="#E53935" rx="2" />
      <line x1="35" y1="16" x2="40" y2="16" stroke="#78909C" strokeWidth="1.5" />
      <line x1="35" y1="26" x2="40" y2="26" stroke="#78909C" strokeWidth="1.5" />
      <line x1="35" y1="36" x2="40" y2="36" stroke="#78909C" strokeWidth="1.5" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'solid': return <SolidIcon size={size} />;
    case 'liquid': return <LiquidIcon size={size} />;
    case 'gas': return <GasIcon size={size} />;
    case 'ice': return <IceIcon size={size} />;
    case 'water': return <WaterIcon size={size} />;
    case 'steam': return <SteamIcon size={size} />;
    case 'burner': return <BurnerIcon size={size} />;
    case 'camphor': return <CamphorIcon size={size} />;
    case 'naphthalene': return <NaphthaleneIcon size={size} />;
    case 'thermometer': return <ThermometerObjIcon size={size} />;
    default: return <SolidIcon size={size} />;
  }
}

// ─── Scientist Sana Mascot ───────────────────────────────────────────────

function ScientistSana({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-[260px] border-2 border-cyan-200"
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
            <linearGradient id="sana-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE0B2" />
              <stop offset="100%" stopColor="#FFCC80" />
            </linearGradient>
            <linearGradient id="sana-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F7FA" />
            </linearGradient>
          </defs>

          {/* Safety Goggles on forehead */}
          <rect x="25" y="16" width="35" height="14" rx="5" fill="#4DD0E1" stroke="#00838F" strokeWidth="2" opacity="0.9" />
          <line x1="18" y1="22" x2="25" y2="22" stroke="#00838F" strokeWidth="2" />
          <line x1="60" y1="22" x2="67" y2="22" stroke="#00838F" strokeWidth="2" />

          {/* Head & Hair */}
          <circle cx="42.5" cy="35" r="21" fill="url(#sana-face)" />
          <path d="M21 32 Q40 12, 64 32 Q66 46, 58 50 Q42 44, 27 50 Q19 42, 21 32 Z" fill="#212121" />

          {/* Eyes */}
          <circle cx="33" cy="33" r="3" fill="#1A237E" />
          <circle cx="52" cy="33" r="3" fill="#1A237E" />

          {/* Smile */}
          <path d="M36 44 Q42.5 49, 49 44" stroke="#D84315" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Lab Coat */}
          <path d="M20 56 L30 50 L35 95 L50 95 L55 50 L65 56 L70 95 L15 95 Z" fill="url(#sana-coat)" stroke="#B0BEC5" strokeWidth="2" />
          <path d="M30 50 L35 75 L50 75 L55 50" fill="white" stroke="#B0BEC5" strokeWidth="1.5" />

          {/* Flask Badge on Coat */}
          <path d="M40 62 L45 62 L47 70 L38 70 Z" fill="#00ACC1" />

          {/* Test Tube in hand */}
          <rect x="63" y="65" width="5" height="18" rx="2" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="1.5" transform="rotate(15 63 65)" />
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

// ─── Chemistry Laboratory Scene Background ───────────────────────────────

function LabSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-bg-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="50%" stopColor="#B2EBF2" />
            <stop offset="85%" stopColor="#80DEEA" />
            <stop offset="100%" stopColor="#00838F" />
          </linearGradient>
          <linearGradient id="bench-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#37474F" />
            <stop offset="100%" stopColor="#263238" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#lab-bg-grad)" />

        {/* Laboratory Window with sky & clouds */}
        <rect x="60" y="40" width="160" height="150" rx="10" fill="#E1F5FE" stroke="#00838F" strokeWidth="4" />
        <line x1="140" y1="40" x2="140" y2="190" stroke="#00838F" strokeWidth="3" />
        <line x1="60" y1="115" x2="220" y2="115" stroke="#00838F" strokeWidth="3" />
        <circle cx="100" cy="75" r="15" fill="white" opacity="0.8" />
        <circle cx="180" cy="90" r="20" fill="white" opacity="0.8" />

        {/* State Change Poster on Wall */}
        <rect x="480" y="30" width="180" height="110" rx="6" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="3" />
        <text x="570" y="52" fontSize="12" fontWeight="bold" fill="#F57F17" textAnchor="middle">STATES OF MATTER</text>
        <circle cx="510" cy="85" r="16" fill="#C5CAE9" stroke="#3F51B5" strokeWidth="2" />
        <text x="510" y="89" fontSize="10" fontWeight="bold" fill="#1A237E" textAnchor="middle">SOLID</text>
        <path d="M530 85 L545 85" stroke="#3F51B5" strokeWidth="2" markerEnd="url(#arrow)" />
        <circle cx="570" cy="85" r="16" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
        <text x="570" y="89" fontSize="10" fontWeight="bold" fill="#006064" textAnchor="middle">LIQ</text>
        <path d="M590 85 L605 85" stroke="#00ACC1" strokeWidth="2" />
        <circle cx="630" cy="85" r="16" fill="#FFE0B2" stroke="#FF9800" strokeWidth="2" />
        <text x="630" y="89" fontSize="10" fontWeight="bold" fill="#E65100" textAnchor="middle">GAS</text>

        {/* Laboratory Bench */}
        <rect x="0" y="330" width={width} height={height - 330} fill="url(#bench-grad)" />
        <rect x="0" y="330" width={width} height="14" fill="#1F2937" />

        {/* Beakers and Flasks on Bench */}
        <path d="M30 310 L45 330 L15 330 Z" fill="#B2EBF2" opacity="0.7" />
        <rect x="80" y="295" width="25" height="35" rx="3" fill="#E0F7FA" stroke="#00838F" strokeWidth="2" opacity="0.85" />
        <path d="M80 310 L105 310" stroke="#00ACC1" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

// ─── Teaching Slides Definition ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Three States of Matter 🧊",
    text: "Matter exists in three main states: Solid (fixed shape and volume), Liquid (fixed volume, takes container shape), and Gas (no fixed shape or volume)!",
    emoji: "🧊",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Matter exists in three main states: Solid with fixed shape and volume, Liquid with fixed volume, and Gas with no fixed shape or volume!",
  },
  {
    title: "Interconversion of States 🔄",
    text: "Matter can change from one state to another when we heat or cool it! Ice melts into water, and water boils into steam. This is called interconversion.",
    emoji: "🔄",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "Matter can change from one state to another when we heat or cool it! Ice melts into water, and water boils into steam. This is interconversion.",
  },
  {
    title: "Melting and Freezing 🔥❄️",
    text: "Melting is solid changing to liquid on heating (like ice at 0 degrees Celsius). Freezing is liquid changing to solid on cooling (like water turning to ice).",
    emoji: "🔥",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Melting is solid changing to liquid on heating. Freezing is liquid changing to solid on cooling. Both happen at the same temperature for pure substances!",
  },
  {
    title: "Evaporation and Condensation 💧☁️",
    text: "Evaporation turns liquid into gas at the surface (wet clothes drying). Condensation turns gas back into liquid on cooling (water drops on a cold glass).",
    emoji: "☁️",
    bgColor: "from-teal-500 to-emerald-600",
    spoken: "Evaporation turns liquid into gas at the surface. Condensation turns gas back into liquid when it cools down on a cold surface.",
  },
  {
    title: "Sublimation (Skipping Liquid!) 🌬️",
    text: "Sublimation is when a solid turns DIRECTLY into a gas without becoming a liquid first! Camphor, naphthalene balls, and dry ice are wonderful examples.",
    emoji: "🌬️",
    bgColor: "from-purple-500 to-indigo-700",
    spoken: "Sublimation is when a solid turns directly into a gas without becoming a liquid first! Camphor and naphthalene balls are wonderful examples.",
  },
];

// ─── Challenges Definition ───────────────────��───────────────────────────

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
    question: 'In which state of matter do particles have a FIXED shape and volume?',
    answer: 'Solid',
    options: ['Solid', 'Liquid', 'Gas', 'None of these'],
    hint: 'Think: which state stays firm and keeps its own shape unless broken or melted?',
    misconception: 'Solids have a definite shape and volume. Liquids take the shape of their container, and gases fill all space!',
  },
  {
    type: 'sort',
    question: 'Drag each property to its correct state of matter!',
    answer: 'sort',
    options: [],
    hint: 'Solids have fixed shape and volume. Liquids take container shape. Gases fill the entire container!',
    misconception: 'Remember: solids keep fixed shape and volume, liquids flow to take container shape, and gases expand to fill any container completely!',
    sortItems: [
      { id: 's1', label: 'Fixed shape & volume', icon: 'solid', correctBin: 'solid-bin' },
      { id: 's2', label: 'Takes container shape', icon: 'liquid', correctBin: 'liquid-bin' },
      { id: 's3', label: 'Fills entire container', icon: 'gas', correctBin: 'gas-bin' },
    ],
    bins: [
      { id: 'solid-bin', label: 'Solid 🧊', color: '#3F51B5' },
      { id: 'liquid-bin', label: 'Liquid 💧', color: '#00ACC1' },
      { id: 'gas-bin', label: 'Gas 🌬️', color: '#FF9800' },
    ],
  },
  {
    type: 'identify',
    question: 'What is the process called when a solid turns directly into a liquid?',
    answer: 'Melting',
    options: ['Melting', 'Freezing', 'Evaporation', 'Sublimation'],
    hint: 'Think: what happens to ice cream on a warm day in Chennai?',
    misconception: 'Melting is the change from solid to liquid on heating. Freezing is liquid to solid. Do not confuse the two!',
  },
  {
    type: 'sort',
    question: 'Drag each state change process to its correct name!',
    answer: 'sort',
    options: [],
    hint: 'Solid to liquid is melting. Liquid to solid is freezing. Liquid to gas is evaporation.',
    misconception: 'Careful! Solid to liquid is melting, liquid to solid is freezing, liquid to gas is evaporation, and gas to liquid is condensation.',
    sortItems: [
      { id: 'p1', label: 'Solid to Liquid', icon: 'ice', correctBin: 'melting' },
      { id: 'p2', label: 'Liquid to Solid', icon: 'water', correctBin: 'freezing' },
      { id: 'p3', label: 'Liquid to Gas', icon: 'steam', correctBin: 'evaporation' },
      { id: 'p4', label: 'Gas to Liquid', icon: 'thermometer', correctBin: 'condensation' },
    ],
    bins: [
      { id: 'melting', label: 'Melting 🔥', color: '#E65100' },
      { id: 'freezing', label: 'Freezing ❄️', color: '#0288D1' },
      { id: 'evaporation', label: 'Evaporation ☀️', color: '#2E7D32' },
      { id: 'condensation', label: 'Condensation 💧', color: '#512DA8' },
    ],
  },
  {
    type: 'identify',
    question: 'At what temperature does pure ice melt into water under normal conditions?',
    answer: '0 degrees Celsius',
    options: ['0 degrees Celsius', '100 degrees Celsius', '50 degrees Celsius', '25 degrees Celsius'],
    hint: 'Think: at what temperature on the thermometer does water turn into solid ice in the freezer?',
    misconception: 'Pure ice melts and water freezes at exactly 0 degrees Celsius. 100 degrees Celsius is the boiling point of water!',
  },
  {
    type: 'sort',
    question: 'Drag each everyday example to the correct process!',
    answer: 'sort',
    options: [],
    hint: 'Ice turning to water is melting. Water turning to ice in freezer is freezing. Wet clothes drying is evaporation.',
    misconception: 'Make sure you match the starting and ending states: ice to water is melting, water to ice is freezing, water to steam is evaporation, and water drops on a cold glass is condensation!',
    sortItems: [
      { id: 'ex1', label: 'Ice cream melting', icon: 'ice', correctBin: 'melt' },
      { id: 'ex2', label: 'Water to ice in freezer', icon: 'water', correctBin: 'freeze' },
      { id: 'ex3', label: 'Wet clothes drying', icon: 'steam', correctBin: 'evap' },
      { id: 'ex4', label: 'Drops on cold glass', icon: 'thermometer', correctBin: 'cond' },
    ],
    bins: [
      { id: 'melt', label: 'Melting 🔥', color: '#E65100' },
      { id: 'freeze', label: 'Freezing ❄️', color: '#0288D1' },
      { id: 'evap', label: 'Evaporation ☀️', color: '#2E7D32' },
      { id: 'cond', label: 'Condensation 💧', color: '#512DA8' },
    ],
  },
  {
    type: 'identify',
    question: 'What is SUBLIMATION?',
    answer: 'Solid directly changing to gas without becoming liquid',
    options: [
      'Solid directly changing to gas without becoming liquid',
      'Liquid changing to gas very slowly',
      'Gas changing directly into a solid',
      'Solid changing into a liquid first',
    ],
    hint: 'Think: what do camphor and naphthalene balls do in a cupboard without leaving any wet puddle?',
    misconception: 'Sublimation is a special exception where a solid changes straight into a gas, completely skipping the liquid state!',
  },
  {
    type: 'sort',
    question: 'Drag each substance or factor to its correct category!',
    answer: 'sort',
    options: [],
    hint: 'Camphor and naphthalene undergo sublimation. Temperature and wind speed affect evaporation.',
    misconception: 'Camphor and naphthalene sublime directly to gas. Heat and wind make evaporation happen faster!',
    sortItems: [
      { id: 'sub1', label: 'Camphor (Kapur)', icon: 'camphor', correctBin: 'sublimation' },
      { id: 'sub2', label: 'Naphthalene balls', icon: 'naphthalene', correctBin: 'sublimation' },
      { id: 'fac1', label: 'Higher temperature', icon: 'burner', correctBin: 'evap-factor' },
      { id: 'fac2', label: 'Breezy wind', icon: 'steam', correctBin: 'evap-factor' },
    ],
    bins: [
      { id: 'sublimation', label: 'Sublimation 🌬️', color: '#7B1FA2' },
      { id: 'evap-factor', label: 'Faster Evaporation ☀️', color: '#C2185B' },
    ],
  },
];

// ─── Component Props ─────────────────────────────────────────────────────

export interface StatesMatterGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Component ──────────────────────────────────────────────────────

export function StatesMatterGame({ width = 720, height = 560, onComplete }: StatesMatterGameProps) {
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
        newPos[item.id] = { x: startX + idx * 125, y: height - 165 };
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
      const compMsg = "Wonderful! You are a brilliant chemistry star!";
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
      const el = document.getElementById(`bin-${bin.id}`);
      if (el) {
        const rect = el.getBoundingClientRect();
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl border-4 border-cyan-300 bg-cyan-900" style={{ width, height }}>
      <LabSceneBg width={width} height={height} />
      <ScientistSana mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ────────────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col justify-between p-8 bg-gradient-to-b from-black/40 via-transparent to-black/60">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-lg">
              <span className="text-2xl">{TEACHING_SLIDES[slideIdx].emoji}</span>
              <h2 className="text-xl font-extrabold text-cyan-900">{TEACHING_SLIDES[slideIdx].title}</h2>
            </div>
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-3 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-cyan-400' : 'w-3 bg-white/50'}`} />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="my-auto bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl border-2 border-cyan-200 max-w-xl mx-auto text-center"
          >
            <p className="text-xl font-medium text-gray-800 leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between items-center">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${
                slideIdx === 0 ? 'opacity-40 cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-white text-cyan-900 hover:bg-cyan-50'
              }`}
            >
              Previous
            </button>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('celebration');
                }
              }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-extrabold text-lg rounded-2xl shadow-xl transform hover:scale-105 transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Lab Challenges! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6">
          {/* Top Bar */}
          <div className="flex items-center justify-between bg-white/90 backdrop-blur px-4 py-2.5 rounded-2xl shadow-lg z-10">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-wider text-cyan-700 bg-cyan-100 px-3 py-1 rounded-full">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleShowHint}
                className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 px-3 py-1.5 rounded-xl font-bold text-sm shadow transition-all"
              >
                💡 Hint
              </button>
              <div className="bg-cyan-100 text-cyan-900 px-4 py-1 rounded-full font-black text-sm shadow">
                Score: {score}
              </div>
            </div>
          </div>

          {/* Question Box */}
          <div className="my-2 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-cyan-200 max-w-2xl mx-auto text-center">
            <h3 className="text-lg font-bold text-gray-900">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Content Area */}
          <div className="relative flex-1 my-2 flex items-center justify-center">
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-2 gap-4 max-w-lg w-full px-4">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnBg = 'bg-white/90 hover:bg-white text-gray-800 border-cyan-200';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnBg = 'bg-green-500 text-white border-green-600';
                    else if (isSelected && !isCorrectAnswer) btnBg = 'bg-red-500 text-white border-red-600';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOpt ? 1 : 1.03 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.97 }}
                      onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl font-bold text-base shadow-lg border-2 transition-all flex items-center justify-center text-center ${btnBg}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="w-full h-full flex flex-col justify-between items-center py-2">
                {/* Bins */}
                <div className="flex gap-4 justify-center w-full px-4 z-10">
                  {currentChallenge.bins.map(bin => {
                    const isHovered = hoveredBin === bin.id;
                    return (
                      <div
                        key={bin.id}
                        id={`bin-${bin.id}`}
                        onMouseEnter={() => setHoveredBin(bin.id)}
                        onMouseLeave={() => setHoveredBin(null)}
                        className={`flex-1 max-w-[160px] h-28 rounded-2xl border-4 border-dashed flex flex-col items-center justify-center p-3 shadow-lg transition-all ${
                          isHovered ? 'scale-105 bg-white/95' : 'bg-white/80'
                        }`}
                        style={{ borderColor: bin.color }}
                      >
                        <span className="text-sm font-black text-center" style={{ color: bin.color }}>
                          {bin.label}
                        </span>
                        <div className="text-[10px] text-gray-500 mt-1 font-semibold">Drop here</div>
                      </div>
                    );
                  })}
                </div>

                {/* Draggable Items */}
                <div className="relative w-full h-36">
                  {currentChallenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 50, y: 20 };
                    const placed = placedItems[item.id] || false;
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={pos.x}
                        y={pos.y}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={(id, x, y) => handleDragEnd(id, x, y)}
                        width={115}
                        height={95}
                      >
                        <div
                          className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 transition-all ${
                            placed ? 'bg-green-100 border-green-500 opacity-60' : 'bg-white border-cyan-300 hover:scale-105'
                          }`}
                          style={{ width: 115, height: 95 }}
                        >
                          {renderSortIcon(item.icon, 42)}
                          <span className="text-[11px] font-extrabold text-gray-800 text-center mt-1 px-1">
                            {item.label}
                          </span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Navigation / Advance Bar */}
          {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-center pb-2 z-30"
            >
              <button
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-extrabold text-lg rounded-2xl shadow-2xl transform hover:scale-105 transition-all"
              >
                Continue 🚀
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
