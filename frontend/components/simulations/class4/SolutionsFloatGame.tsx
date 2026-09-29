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

function WoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="18" width="44" height="24" rx="3" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
      <ellipse cx="16" cy="30" rx="3" ry="8" fill="#A1887F" />
      <path d="M24 22 L36 38 M30 22 L42 38" stroke="#D7CCC8" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function GlassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 12 L44 12 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" opacity="0.85" />
      <path d="M20 22 L40 22" stroke="#80DEEA" strokeWidth="1.5" />
      <ellipse cx="30" cy="12" rx="14" ry="4" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
    </svg>
  );
}

function MetalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="16" rx="8" ry="6" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="2" />
      <rect x="27" y="20" width="6" height="30" rx="2" fill="#B0BEC5" stroke="#78909C" strokeWidth="2" />
      <circle cx="30" cy="46" r="4" fill="#90A4AE" />
    </svg>
  );
}

function PlasticIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="23" y="10" width="14" height="6" rx="1" fill="#FF7043" stroke="#D84315" strokeWidth="1.5" />
      <path d="M23 16 C20 18, 18 22, 18 26 L18 48 C18 50, 20 52, 22 52 L38 52 C40 52, 42 50, 42 48 L42 26 C42 22, 40 18, 37 16 Z" fill="#81D4FA" stroke="#0288D1" strokeWidth="2" opacity="0.8" />
      <rect x="22" y="30" width="16" height="14" rx="2" fill="white" opacity="0.7" />
    </svg>
  );
}

function ClothIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 15 Q30 8, 48 15 Q52 30, 48 45 Q30 52, 12 45 Q8 30, 12 15 Z" fill="#AB47BC" stroke="#7B1FA2" strokeWidth="2" />
      <path d="M15 20 Q30 25, 45 20 M15 35 Q30 40, 45 35" stroke="#E1BEE7" strokeWidth="1.5" fill="none" strokeDasharray="3,3" />
    </svg>
  );
}

function SugarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 38 L45 38 L42 50 C42 52, 40 54, 37 54 L23 54 C20 54, 18 52, 18 50 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" />
      <circle cx="25" cy="45" r="2" fill="white" />
      <circle cx="32" cy="48" r="1.5" fill="white" />
      <circle cx="36" cy="43" r="2" fill="white" />
      <path d="M20 20 Q30 10, 40 20" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M30 14 L30 32 M25 24 L35 24" stroke="#4FC3F7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SaltIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="16" width="20" height="34" rx="3" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      <ellipse cx="30" cy="16" rx="10" ry="3" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="2" />
      <circle cx="27" cy="28" r="1.5" fill="#37474F" />
      <circle cx="33" cy="28" r="1.5" fill="#37474F" />
      <circle cx="30" cy="35" r="1.5" fill="#37474F" />
      <path d="M25 42 L35 42" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SandIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 Q30 35, 50 45 L52 52 C52 54, 50 55, 48 55 L12 55 C10 55, 8 54, 8 52 Z" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />
      <circle cx="20" cy="48" r="1.5" fill="#8D6E63" />
      <circle cx="30" cy="50" r="1.5" fill="#8D6E63" />
      <circle cx="40" cy="47" r="1.5" fill="#8D6E63" />
      <circle cx="25" cy="52" r="1" fill="#8D6E63" />
    </svg>
  );
}

function ChalkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="24" y="12" width="12" height="38" rx="2" fill="#FAFAFA" stroke="#BDBDBD" strokeWidth="2" transform="rotate(15 30 30)" />
      <path d="M18 42 Q30 50, 42 42" stroke="#E0E0E0" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function FloatingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="30" width="40" height="12" rx="2" fill="#8D6E63" stroke="#5D4037" strokeWidth="2" />
      <path d="M0 42 Q15 38, 30 42 T60 42 L60 55 L0 55 Z" fill="#29B6F6" opacity="0.85" />
    </svg>
  );
}

function SinkingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M0 15 L60 15 L60 20 L0 20 Z" fill="#29B6F6" opacity="0.5" />
      <rect x="27" y="32" width="6" height="22" rx="1" fill="#78909C" stroke="#37474F" strokeWidth="2" />
      <path d="M20 32 L40 32 L35 28 L25 28 Z" fill="#90A4AE" stroke="#37474F" strokeWidth="1.5" />
      <circle cx="30" cy="54" r="3" fill="#546E7A" />
    </svg>
  );
}

function ThermometerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="10" width="10" height="34" rx="5" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="2" />
      <circle cx="30" cy="46" r="7" fill="#E53935" stroke="#C62828" strokeWidth="2" />
      <rect x="28" y="22" width="4" height="22" fill="#E53935" rx="2" />
    </svg>
  );
}

function SmokeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="32" width="16" height="20" fill="#78909C" stroke="#455A64" strokeWidth="2" />
      <circle cx="30" cy="24" r="8" fill="#B0BEC5" opacity="0.8" />
      <circle cx="22" cy="14" r="7" fill="#CFD8DC" opacity="0.7" />
      <circle cx="38" cy="10" r="6" fill="#ECEFF1" opacity="0.6" />
    </svg>
  );
}

function MaskIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 22 C12 18, 20 15, 30 15 C40 15, 48 18, 48 22 L48 38 C48 42, 40 45, 30 45 C20 45, 12 42, 12 38 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" />
      <path d="M6 25 L12 28 M54 25 L48 28" stroke="#00ACC1" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 28 Q30 35, 42 28" stroke="#B2EBF2" strokeWidth="2" fill="none" />
      <path d="M18 34 Q30 41, 42 34" stroke="#B2EBF2" strokeWidth="2" fill="none" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'wood': return <WoodIcon size={size} />;
    case 'glass': return <GlassIcon size={size} />;
    case 'metal': return <MetalIcon size={size} />;
    case 'plastic': return <PlasticIcon size={size} />;
    case 'cloth': return <ClothIcon size={size} />;
    case 'sugar': return <SugarIcon size={size} />;
    case 'salt': return <SaltIcon size={size} />;
    case 'sand': return <SandIcon size={size} />;
    case 'chalk': return <ChalkIcon size={size} />;
    case 'floating': return <FloatingIcon size={size} />;
    case 'sinking': return <SinkingIcon size={size} />;
    case 'smoke': return <SmokeIcon size={size} />;
    case 'mask': return <MaskIcon size={size} />;
    default: return <WoodIcon size={size} />;
  }
}

// ─── Professor Pooja Mascot ──────────────────────────────────────────────

function ProfessorPooja({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-[260px] border-2 border-gold-200"
          >
            <p className="text-sm font-bold text-gold-900">{speaking}</p>
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
            <linearGradient id="pooja-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE0B2" />
              <stop offset="100%" stopColor="#FFCC80" />
            </linearGradient>
            <linearGradient id="pooja-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#ECEFF1" />
            </linearGradient>
          </defs>

          {/* Safety Goggles */}
          <rect x="24" y="24" width="37" height="16" rx="6" fill="#4DD0E1" stroke="#00838F" strokeWidth="2.5" opacity="0.9" />
          <line x1="18" y1="30" x2="24" y2="30" stroke="#00838F" strokeWidth="2.5" />
          <line x1="61" y1="30" x2="67" y2="30" stroke="#00838F" strokeWidth="2.5" />

          {/* Head & Hair */}
          <circle cx="42.5" cy="35" r="22" fill="url(#pooja-face)" />
          <path d="M20 30 Q40 10, 65 30 Q68 45, 60 50 Q42 44, 25 50 Q18 40, 20 30 Z" fill="#3E2723" />

          {/* Eyes behind goggles */}
          <circle cx="33" cy="32" r="3" fill="#1A237E" />
          <circle cx="52" cy="32" r="3" fill="#1A237E" />

          {/* Smile */}
          <path d="M36 43 Q42.5 48, 49 43" stroke="#D84315" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Lab Coat */}
          <path d="M20 58 L30 52 L35 95 L50 95 L55 52 L65 58 L70 95 L15 95 Z" fill="url(#pooja-coat)" stroke="#B0BEC5" strokeWidth="2" />
          <path d="M30 52 L35 75 L50 75 L55 52" fill="white" stroke="#B0BEC5" strokeWidth="1.5" />

          {/* Floating Boat Badge on Coat */}
          <polygon points="42.5,62 47,70 38,70" fill="#0288D1" />
          <rect x="36" y="70" width="13" height="4" rx="1" fill="#0288D1" />

          {/* Test Tube in Hand */}
          <rect x="62" y="65" width="6" height="18" rx="2" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="1.5" transform="rotate(20 62 65)" />
          <path d="M63 70 L67 70" stroke="#26A69A" strokeWidth="2" />
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

// ─── Chemistry Lab Scene Background ──────────────────────────────────────

function LabSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="40%" stopColor="#B2EBF2" />
            <stop offset="70%" stopColor="#80DEEA" />
            <stop offset="100%" stopColor="#26A69A" />
          </linearGradient>
          <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00ACC1" />
            <stop offset="50%" stopColor="#00838F" />
            <stop offset="100%" stopColor="#006064" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#lab-sky)" />

        {/* Distant Factory with Smoke */}
        <rect x="50" y="120" width="70" height="90" fill="#78909C" opacity="0.8" />
        <polygon points="45,120 85,90 125,120" fill="#546E7A" opacity="0.8" />
        <rect x="75" y="80" width="12" height="45" fill="#90A4AE" />
        <circle cx="81" cy="65" r="10" fill="#CFD8DC" opacity="0.6" />
        <circle cx="88" cy="48" r="14" fill="#ECEFF1" opacity="0.5" />

        {/* Green Hills & Trees */}
        <path d="M0 220 Q180 160, 360 220 Q540 160, 720 220 L720 300 L0 300 Z" fill="#66BB6A" />
        <circle cx="150" cy="205" r="22" fill="#2E7D32" />
        <circle cx="280" cy="195" r="28" fill="#388E3C" />
        <circle cx="580" cy="200" r="25" fill="#2E7D32" />

        {/* Lab Bench */}
        <rect x="0" y="320" width={width} height={height - 320} fill="#37474F" />
        <rect x="0" y="320" width={width} height="12" fill="#263238" />

        {/* River segment across bench */}
        <rect x="180" y="320" width="360" height="25" fill="url(#river-grad)" />
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
    title: 'Materials and Their Properties 🪵',
    text: 'Every object is made of a material! Wood is hard and floats. Glass is transparent and rigid. Metal is shiny and strong. Plastic is waterproof!',
    emoji: '🪵',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Every object is made of a material! Wood is hard and floats. Glass is transparent and rigid. Metal is shiny and strong!',
  },
  {
    title: 'Solutions in Water 💧',
    text: 'When a solid like sugar dissolves in water, it spreads evenly to form a clear solution! The sugar is the solute, and the water is the solvent.',
    emoji: '🧂',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'When a solid like sugar dissolves in water, it spreads evenly to form a clear solution! Sugar is the solute and water is the solvent.',
  },
  {
    title: 'Soluble and Non-Soluble 🏖️',
    text: 'Soluble substances dissolve in water like salt and sugar. Non-soluble substances do NOT dissolve like sand and chalk powder; they settle at the bottom!',
    emoji: '🏖️',
    bgColor: 'from-teal-400 to-emerald-500',
    spoken: 'Soluble substances dissolve in water like salt and sugar. Non-soluble substances do not dissolve like sand and chalk powder.',
  },
  {
    title: 'Temperature & Solubility 🔥',
    text: 'Heating water increases solubility! Warm water can dissolve MORE sugar than cold water. Stirring also helps solids dissolve faster!',
    emoji: '🔥',
    bgColor: 'from-orange-400 to-red-500',
    spoken: 'Heating water increases solubility! Warm water can dissolve more sugar than cold water. Stirring also helps solids dissolve faster!',
  },
  {
    title: 'Sink, Float, and Clean Air ⛵🌳',
    text: 'Objects less dense than water float, while dense objects sink! Air pollution from smoke and dust harms health. Planting trees keeps the air clean!',
    emoji: '🌳',
    bgColor: 'from-green-400 to-teal-500',
    spoken: 'Objects less dense than water float, while dense objects sink! Air pollution harms health. Planting trees keeps the air clean!',
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
    question: 'Which material is TRANSPARENT (you can see clearly through it)?',
    answer: 'Glass window',
    options: ['Wooden door', 'Glass window', 'Iron sheet'],
    hint: 'Think: through which material can light pass completely so you see clearly?',
    misconception: 'Glass is transparent because light passes through it so you can see clearly. Wooden doors and iron sheets are opaque!',
  },
  {
    type: 'identify',
    question: 'Which material is FLEXIBLE (can bend without breaking)?',
    answer: 'Cotton cloth',
    options: ['Glass tumbler', 'Cotton cloth', 'Brick'],
    hint: 'Think: which of these can you fold or bend in your hands easily?',
    misconception: 'Cloth and rubber are flexible because they bend without breaking. Glass and brick are rigid and may break if bent!',
  },
  {
    type: 'sort',
    question: 'Drag each material to its correct property!',
    answer: 'sort',
    options: [],
    hint: 'Glass lets light through (transparent). Wood is solid and stiff (rigid). Cloth bends easily (flexible).',
    misconception: 'Check carefully: glass is transparent and rigid, wood is opaque and rigid, cloth is flexible and soft!',
    sortItems: [
      { id: 's-glass', label: 'Glass window', icon: 'glass', correctBin: 'transparent' },
      { id: 's-wood', label: 'Wooden door', icon: 'wood', correctBin: 'opaque' },
      { id: 's-cloth', label: 'Cloth shirt', icon: 'cloth', correctBin: 'flexible' },
      { id: 's-metal', label: 'Metal spoon', icon: 'metal', correctBin: 'rigid' },
    ],
    bins: [
      { id: 'transparent', label: 'Transparent 🔍', color: '#0288D1' },
      { id: 'opaque', label: 'Opaque 🚪', color: '#78909C' },
      { id: 'flexible', label: 'Flexible 🧶', color: '#AB47BC' },
      { id: 'rigid', label: 'Rigid 🛡️', color: '#5D4037' },
    ],
  },
  {
    type: 'identify',
    question: 'What happens when you stir SUGAR into water?',
    answer: 'It dissolves and forms a solution',
    options: [
      'It dissolves and forms a solution',
      'It stays solid at the bottom forever',
      'It turns the water into a solid',
    ],
    hint: 'Think: where do the sugar crystals go when you stir them in water?',
    misconception: 'Sugar dissolves in water to form a true solution where the solute spreads out evenly. It does not vanish forever, but breaks into tiny invisible pieces!',
  },
  {
    type: 'sort',
    question: 'Drag each substance to Soluble or Non-soluble in water!',
    answer: 'sort',
    options: [],
    hint: 'Sugar and salt disappear and make clear water (soluble). Sand and chalk stay visible and settle down (non-soluble).',
    misconception: 'Remember: soluble substances like sugar and salt dissolve completely. Non-soluble substances like sand and chalk do not dissolve and settle at the bottom!',
    sortItems: [
      { id: 'sug', label: 'Sugar', icon: 'sugar', correctBin: 'soluble' },
      { id: 'sal', label: 'Common Salt', icon: 'salt', correctBin: 'soluble' },
      { id: 'snd', label: 'Sand', icon: 'sand', correctBin: 'nonsoluble' },
      { id: 'chk', label: 'Chalk Powder', icon: 'chalk', correctBin: 'nonsoluble' },
    ],
    bins: [
      { id: 'soluble', label: 'Soluble in Water ✅', color: '#2E7D32' },
      { id: 'nonsoluble', label: 'Non-Soluble ❌', color: '#C62828' },
    ],
  },
  {
    type: 'identify',
    question: 'What happens to solubility when water is HEATED?',
    answer: 'More sugar can dissolve in hot water',
    options: [
      'More sugar can dissolve in hot water',
      'Less sugar dissolves in hot water',
      'Temperature makes no difference',
    ],
    hint: 'Think: why does hot tea hold more sugar than cold water?',
    misconception: 'Heating water increases solubility because faster water particles pull apart and hold more solute! Hot water dissolves more sugar than cold water.',
  },
  {
    type: 'sort',
    question: 'Drag each object! Does it float or sink in water?',
    answer: 'sort',
    options: [],
    hint: 'Wood and plastic are light for their size and float. Iron nails and stone are dense and sink!',
    misconception: 'Objects less dense than water float (wood, plastic), while dense objects sink (iron nail, glass marble)! A large wooden plank floats even if heavy.',
    sortItems: [
      { id: 'flw', label: 'Wooden Block', icon: 'wood', correctBin: 'float' },
      { id: 'plf', label: 'Plastic Bottle', icon: 'plastic', correctBin: 'float' },
      { id: 'snk', label: 'Iron Nail', icon: 'sinking', correctBin: 'sink' },
      { id: 'glssnk', label: 'Glass Marble', icon: 'glass', correctBin: 'sink' },
    ],
    bins: [
      { id: 'float', label: 'Floats ⛵', color: '#0288D1' },
      { id: 'sink', label: 'Sinks ⚓', color: '#455A64' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each item to Air Pollution Cause or Prevention!',
    answer: 'sort',
    options: [],
    hint: 'Factory smoke and vehicle exhaust pollute the air. Planting trees and wearing masks help keep air clean!',
    misconception: 'Air pollution is caused by harmful smoke, dust, and burning waste. We prevent it by planting trees, using public transport, and avoiding waste burning!',
    sortItems: [
      { id: 'smk', label: 'Factory Smoke', icon: 'smoke', correctBin: 'cause' },
      { id: 'msk', label: 'Wearing Mask', icon: 'mask', correctBin: 'prevent' },
    ],
    bins: [
      { id: 'cause', label: 'Pollution Cause 🏭', color: '#D32F2F' },
      { id: 'prevent', label: 'Prevention 🌳', color: '#2E7D32' },
    ],
  },
];

// ─── Main Component Props ──────────────────────────────────────────────

export interface SolutionsFloatGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SolutionsFloatGame({ width = 720, height = 560, onComplete }: SolutionsFloatGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 130, y: 160 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setIsIncorrect(false);
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = 'Great job! You understand solutions and floating!';
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
      const compMsg = 'Wonderful! You are a brilliant science star!';
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

    // Bin collision check — positions must match the bin render positions
    const binCount = currentChallenge.bins.length;
    const sortAreaWidth = 528;
    const binSpacing = binCount <= 2 ? 220 : binCount <= 4 ? 140 : 110;
    const binStartX = Math.max(10, (sortAreaWidth - binCount * binSpacing) / 2);
    const binY = 10;
    const binW = binSpacing - 10;
    const binH = 90;
    const matchedBin = currentChallenge.bins.find((bin, idx) => {
      const binX = binStartX + idx * binSpacing;
      return x >= binX - 15 && x <= binX + binW + 15 && y >= binY - 15 && y <= binY + binH + 15;
    });

    if (matchedBin && matchedBin.id === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = 'Fantastic! You sorted the solutions and float facts perfectly!';
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl select-none" style={{ width, height, background: '#E0F7FA' }}>
      <LabSceneBg width={width} height={height} />
      <ProfessorPooja mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── Teaching Screen ──────────────────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-8 bg-black/30 backdrop-blur-sm z-10">
          <div className="w-full flex justify-between items-center">
            <span className="text-white font-black text-xl drop-shadow-md">Class 4 Chemistry Lab 🧪</span>
            <StarRow count={slideIdx + 1} total={TEACHING_SLIDES.length} />
          </div>

          <motion.div
            key={slideIdx}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`w-full max-w-xl rounded-3xl p-8 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl text-white text-center border-4 border-white/40`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-lg font-medium leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex gap-4 w-full max-w-xl justify-between">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className="px-6 py-3 rounded-2xl bg-white/80 font-bold text-gray-700 shadow hover:bg-white disabled:opacity-40"
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
                  audioManager.play('whoosh');
                }
              }}
              className="px-8 py-3 rounded-2xl bg-yellow-400 font-black text-gold-900 shadow-lg hover:bg-yellow-300 transform active:scale-95"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Experiment! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── Play Screen ──────────────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <span className="bg-gold-600 text-white font-black px-4 py-1.5 rounded-full shadow text-sm">
                Challenge {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <span className="bg-amber-500 text-white font-black px-4 py-1.5 rounded-full shadow text-sm">
                Score: {score} 🌟
              </span>
            </div>
            <button
              onClick={handleShowHint}
              className="bg-white/90 hover:bg-white text-gold-700 font-bold px-4 py-1.5 rounded-full shadow flex items-center gap-1.5 text-sm"
            >
              💡 Hint
            </button>
          </div>

          <div className="flex flex-col items-center my-auto">
            <motion.div
              key={challengeIdx}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl max-w-xl w-full text-center border-4 border-gold-100 mb-6"
            >
              <h3 className="text-xl font-black text-gold-900 mb-4">{currentChallenge.question}</h3>

              {currentChallenge.type === 'identify' && (
                <div className="grid grid-cols-1 gap-3">
                  {currentChallenge.options.map(opt => {
                    const isSelected = selectedOpt === opt;
                    const isCorrect = opt === currentChallenge.answer;
                    return (
                      <motion.button
                        key={opt}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={e => handleAnswerClick(opt, e)}
                        disabled={selectedOpt === currentChallenge.answer}
                        className={`p-4 rounded-2xl font-bold text-lg shadow transition-all ${
                          isSelected
                            ? isCorrect
                              ? 'bg-green-500 text-white ring-4 ring-green-300'
                              : 'bg-red-500 text-white ring-4 ring-red-300'
                            : 'bg-gold-50 hover:bg-gold-100 text-gold-900 border-2 border-gold-200'
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {currentChallenge.type === 'sort' && currentChallenge.bins && (
                <div className="relative h-64 w-full mt-2">
                  {/* Bins — absolute positioning to match collision detection */}
                  {currentChallenge.bins.map((bin, idx) => {
                    const binCount = currentChallenge.bins!.length;
                    const sortAreaWidth = 528;
                    const binSpacing = binCount <= 2 ? 220 : binCount <= 4 ? 140 : 110;
                    const binStartX = Math.max(10, (sortAreaWidth - binCount * binSpacing) / 2);
                    const binX = binStartX + idx * binSpacing;
                    const binW = binSpacing - 10;
                    return (
                      <div
                        key={bin.id}
                        className={`absolute rounded-2xl p-3 border-4 border-dashed flex flex-col items-center justify-center bg-white/70 shadow-inner transition-all duration-150 ${hoveredBin === bin.id ? 'scale-105 bg-white/95 shadow-lg ring-2 ring-amber-300' : ''}`}
                        style={{ borderColor: bin.color, minHeight: 90, left: binX, top: 10, width: binW }}
                        onMouseEnter={() => setHoveredBin(bin.id)}
                        onMouseLeave={() => setHoveredBin(null)}
                      >
                        <span className="text-xs font-black text-gray-700 text-center">{bin.label}</span>
                      </div>
                    );
                  })}

                  {/* Draggable Items */}
                  {currentChallenge.sortItems?.map(item => {
                    const pos = itemPositions[item.id] || { x: 50, y: 160 };
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

            {isIncorrect && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => {
                  setIsIncorrect(false);
                  setSelectedOpt(null);
                }}
                className="bg-amber-500 hover:bg-amber-400 text-white font-black px-6 py-2.5 rounded-2xl shadow-lg"
              >
                Try Again 🔄
              </motion.button>
            )}
          </div>

          <div className="flex justify-end">
            {currentChallenge.type === 'sort' &&
              Object.values(placedItems).every(Boolean) && (
                <motion.button
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  onClick={advanceChallenge}
                  className="bg-green-500 hover:bg-green-400 text-white font-black px-8 py-3 rounded-2xl shadow-xl flex items-center gap-2"
                >
                  Next Challenge ➡️
                </motion.button>
              )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Sort Card Helper ────────────────────────────────────────────────────

function SortCard({
  id,
  label,
  icon,
  x,
  y,
  placed,
  onDragStart,
  onDragEnd,
}: {
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
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-gold-200 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white hover:border-gold-400'
        } p-2`}
        style={{ width: 115, height: 95 }}
      >
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 truncate w-full">{label}</span>
      </div>
    </Draggable>
  );
}
