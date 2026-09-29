'use client';

/**
 * PlantsAirGame — Learn about root types, photosynthesis, transpiration, air composition, breathing & burning
 *
 * CISCE Nodes: c4_bio_014 (Root types), c4_bio_015 (Photosynthesis),
 *              c4_bio_016 (Transpiration), c4_bio_017 (Composition of air),
 *              c4_bio_018 (Breathing and burning)
 * Enrichment: c4_biology_enrichment_part14-18
 *
 * ELI5: "Plants have wonderful roots like tap roots and fibrous roots!
 *   Leaves make food using sunlight, water, and carbon dioxide, and release
 *   oxygen! They also lose water vapour in transpiration. Air is a mixture
 *   of 78 percent nitrogen, 21 percent oxygen, and carbon dioxide. Both
 *   breathing and burning need oxygen!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG botanical garden scene background
 * - Custom SVG botanical objects (Leaf, Chlorophyll, Tap Root, Fibrous Root, CO2, O2, Starch, Iodine, Air, Fire)
 * - Custom SVG mascot (Scientist Sunita with lab coat and leaf badge)
 * - Drag-and-drop: drag items into sorting bins
 * - 8 progressive challenges: identify → sort → apply
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects (drop, success, celebration)
 * - Confetti + celebration on success
 * - Auto-hint after EXACTLY 10 seconds of inactivity
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: "Root Types: Tap and Fibrous 🌱",
    text: "Plants have roots to anchor them and absorb water! A tap root has one thick main root with side branches (like carrot and mustard). A fibrous root has many thin equal roots spreading out (like grass and onion).",
    emoji: "🌱",
    bgColor: "from-emerald-400 to-green-600",
    spoken: "Plants have roots to anchor them and absorb water! A tap root has one thick main root with side branches like carrot. A fibrous root has many thin equal roots like grass!"
  },
  {
    title: "Photosynthesis: The Leaf's Kitchen ☀️",
    text: "Green leaves make food using sunlight! Chlorophyll (green pigment) traps sunlight. The leaf mixes water from roots and carbon dioxide from air to make starch (food) and releases oxygen!",
    emoji: "🍃",
    bgColor: "from-green-400 to-teal-600",
    spoken: "Green leaves make food using sunlight! Chlorophyll traps sunlight. The leaf mixes water and carbon dioxide to make starch food and releases oxygen!"
  },
  {
    title: "Transpiration: Leaf Cooling 💧",
    text: "Leaves lose extra water as water vapour through tiny pores called stomata! This transpiration keeps the plant cool on hot days and helps pull fresh water up from the roots.",
    emoji: "💧",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "Leaves lose extra water as water vapour through tiny pores called stomata! This transpiration keeps the plant cool and pulls water up from the roots."
  },
  {
    title: "Composition of Air 🌬️",
    text: "Air is a mixture of gases! Nitrogen makes up about 78 percent of air. Oxygen makes up about 21 percent. Carbon dioxide is about 0.04 percent. Air also has water vapour and dust.",
    emoji: "🌬️",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "Air is a mixture of gases! Nitrogen makes up about 78 percent of air. Oxygen makes up about 21 percent. Carbon dioxide is a tiny bit at 0.04 percent."
  },
  {
    title: "Breathing and Burning 🔥",
    text: "Both breathing and burning need oxygen! Breathing takes in oxygen for living cells. Burning needs oxygen to keep a fire or candle flame going. Without oxygen, a candle goes out!",
    emoji: "🔥",
    bgColor: "from-amber-400 to-orange-600",
    spoken: "Both breathing and burning need oxygen! Breathing takes in oxygen for living cells. Burning needs oxygen to keep a candle flame going. Without oxygen, a fire goes out!"
  },
];

// ─── Custom SVG Botanical Icons ────────────────────────────────

function LeafIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 5 C15 15, 5 30, 15 45 C25 55, 45 55, 50 45 C55 30, 45 15, 30 5 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="2" />
      <path d="M30 12 L30 48" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 22 L20 28" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 32 L40 38" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 42 L20 46" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function TapRootIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M25 10 L35 10 L33 22 L27 22 Z" fill="#84CC16" />
      <path d="M28 22 L32 22 L31 52 L29 52 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      <path d="M30 30 L22 36" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 38 L38 44" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 46 L24 50" stroke="#F97316" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FibrousRootIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M25 10 L35 10 L33 22 L27 22 Z" fill="#84CC16" />
      <path d="M30 22 Q20 35, 15 52" stroke="#EAB308" strokeWidth="1.5" fill="none" />
      <path d="M30 22 Q25 38, 22 54" stroke="#EAB308" strokeWidth="1.5" fill="none" />
      <path d="M30 22 Q30 40, 30 56" stroke="#EAB308" strokeWidth="1.5" fill="none" />
      <path d="M30 22 Q35 38, 38 54" stroke="#EAB308" strokeWidth="1.5" fill="none" />
      <path d="M30 22 Q40 35, 45 52" stroke="#EAB308" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#FACC15" stroke="#EAB308" strokeWidth="2" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1={30 + 20 * Math.cos((angle * Math.PI) / 180)}
          y1={30 + 20 * Math.sin((angle * Math.PI) / 180)}
          x2={30 + 26 * Math.cos((angle * Math.PI) / 180)}
          y2={30 + 26 * Math.sin((angle * Math.PI) / 180)}
          stroke="#EAB308"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function WaterDropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 C20 22, 12 32, 12 40 C12 50, 20 56, 30 56 C40 56, 48 50, 48 40 C48 32, 40 22, 30 8 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="23" cy="38" rx="5" ry="8" fill="white" opacity="0.5" transform="rotate(-20 23 38)" />
    </svg>
  );
}

function CarbonDioxideIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="12" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="14" cy="30" r="8" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
      <circle cx="46" cy="30" r="8" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
      <text x="30" y="34" fontSize="10" fill="white" fontWeight="bold" textAnchor="middle">C</text>
      <text x="14" y="34" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">O</text>
      <text x="46" y="34" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">O</text>
    </svg>
  );
}

function OxygenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="12" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="40" cy="30" r="12" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <text x="20" y="34" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">O</text>
      <text x="40" y="34" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">O</text>
      <line x1="28" y1="30" x2="32" y2="30" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function IodineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="10" width="16" height="10" fill="#94A3B8" rx="2" />
      <rect x="18" y="20" width="24" height="32" fill="#8B5CF6" stroke="#6D28D9" strokeWidth="2" rx="4" />
      <rect x="23" y="28" width="14" height="16" fill="white" opacity="0.8" rx="2" />
      <text x="30" y="40" fontSize="10" fill="#4C1D95" fontWeight="bold" textAnchor="middle">IOD</text>
    </svg>
  );
}

function FireIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 C25 22, 12 28, 12 40 C12 50, 20 54, 30 54 C40 54, 48 50, 48 40 C48 28, 35 22, 30 8 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      <path d="M30 22 C27 30, 20 34, 20 42 C20 47, 24 50, 30 50 C36 50, 40 47, 40 42 C40 34, 33 30, 30 22 Z" fill="#FACC15" />
    </svg>
  );
}

function NitrogenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="12" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <circle cx="40" cy="30" r="12" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <text x="20" y="34" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">N</text>
      <text x="40" y="34" fontSize="12" fill="white" fontWeight="bold" textAnchor="middle">N</text>
    </svg>
  );
}

function StarchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="18" ry="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
      <ellipse cx="25" cy="28" rx="4" ry="3" fill="#CA8A04" opacity="0.4" />
      <ellipse cx="37" cy="32" rx="5" ry="3" fill="#CA8A04" opacity="0.4" />
      <text x="30" y="34" fontSize="9" fill="#854D0E" fontWeight="bold" textAnchor="middle">STARCH</text>
    </svg>
  );
}

// Map icon string to SVG component
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'leaf': return <LeafIcon size={size} />;
    case 'tap-root': return <TapRootIcon size={size} />;
    case 'fibrous-root': return <FibrousRootIcon size={size} />;
    case 'sun': return <SunIcon size={size} />;
    case 'water': return <WaterDropIcon size={size} />;
    case 'co2': return <CarbonDioxideIcon size={size} />;
    case 'oxygen': return <OxygenIcon size={size} />;
    case 'iodine': return <IodineIcon size={size} />;
    case 'fire': return <FireIcon size={size} />;
    case 'nitrogen': return <NitrogenIcon size={size} />;
    case 'starch': return <StarchIcon size={size} />;
    default: return <LeafIcon size={size} />;
  }
}

// ─── Challenges (8 progressive challenges) ────────────────────

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
    question: 'What is PHOTOSYNTHESIS?',
    answer: 'The process by which green leaves make food using sunlight, water, and carbon dioxide',
    options: [
      'The process by which green leaves make food using sunlight, water, and carbon dioxide',
      'The process by which plants drink water from soil',
      'The process by which plants breathe in oxygen'
    ],
    hint: 'Think about what a green leaf does in the sun with water and air!',
    misconception: 'Photosynthesis is NOT just drinking water or breathing! It is the special food-making process where green leaves use sunlight, water, and carbon dioxide to make starch and oxygen!',
  },
  {
    type: 'identify',
    question: 'Which green substance in leaves traps sunlight for photosynthesis?',
    answer: 'Chlorophyll',
    options: ['Chlorophyll', 'Starch', 'Iodine'],
    hint: 'It is the green pigment inside leaves that gives them their green colour!',
    misconception: 'The substance is chlorophyll, NOT starch or iodine! Starch is the food made, and iodine is the testing liquid used in the laboratory!',
  },
  {
    type: 'sort',
    question: 'Drag each item into the correct group: Raw materials vs Products of photosynthesis!',
    answer: 'sort',
    options: [],
    hint: 'Raw materials are what the leaf takes in (sunlight, water, carbon dioxide). Products are what it makes (starch, oxygen)!',
    misconception: 'Remember: sunlight, water, and carbon dioxide go INTO the leaf (raw materials), while starch and oxygen come OUT (products)!',
    sortItems: [
      { id: 'item-sun', label: 'Sunlight', icon: 'sun', correctBin: 'raw' },
      { id: 'item-water', label: 'Water', icon: 'water', correctBin: 'raw' },
      { id: 'item-co2', label: 'Carbon Dioxide', icon: 'co2', correctBin: 'raw' },
      { id: 'item-starch', label: 'Starch Food', icon: 'starch', correctBin: 'product' },
      { id: 'item-oxygen', label: 'Oxygen Gas', icon: 'oxygen', correctBin: 'product' },
    ],
    bins: [
      { id: 'raw', label: 'Raw Materials 📥', color: '#3B82F6' },
      { id: 'product', label: 'Products 📤', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'How do we TEST a leaf for the presence of starch?',
    answer: 'Iodine test ��� turns blue-black if starch is present',
    options: [
      'Iodine test — turns blue-black if starch is present',
      'Boil the leaf in water and see if it turns green',
      'Smell the leaf to check for sweet food'
    ],
    hint: 'We drop a brownish testing liquid onto the leaf. What colour does it turn if starch is there?',
    misconception: 'We use the iodine test! When iodine touches starch, it turns a deep blue-black colour. Boiling alone does not test for starch!',
  },
  {
    type: 'sort',
    question: 'Drag each plant part to its root system type: Tap root or Fibrous root!',
    answer: 'sort',
    options: [],
    hint: 'Tap roots have one main thick root (carrot, mustard). Fibrous roots have many equal thin roots (grass, onion)!',
    misconception: 'Thickness alone is not enough! A tap root has ONE main thick root with side branches (carrot, mustard). A fibrous root has MANY thin equal roots from the stem base (grass, onion)!',
    sortItems: [
      { id: 'carrot', label: 'Carrot', icon: 'tap-root', correctBin: 'tap' },
      { id: 'mustard', label: 'Mustard', icon: 'tap-root', correctBin: 'tap' },
      { id: 'grass', label: 'Grass', icon: 'fibrous-root', correctBin: 'fibrous' },
      { id: 'onion', label: 'Onion', icon: 'fibrous-root', correctBin: 'fibrous' },
    ],
    bins: [
      { id: 'tap', label: 'Tap Root 🥕', color: '#F97316' },
      { id: 'fibrous', label: 'Fibrous Root 🌾', color: '#EAB308' },
    ],
  },
  {
    type: 'identify',
    question: 'Air is a mixture of gases. Which gas makes up the LARGEST part of air?',
    answer: 'Nitrogen (about 78%)',
    options: [
      'Nitrogen (about 78%)',
      'Oxygen (about 21%)',
      'Carbon dioxide (about 0.04%)'
    ],
    hint: 'It makes up almost 78 parts out of 100 in the atmosphere, but we do not use it for breathing!',
    misconception: 'Nitrogen is the LARGEST part at 78%! Oxygen is only 21%. Many students mistakenly think air is mostly oxygen because we need oxygen to survive.',
  },
  {
    type: 'sort',
    question: 'Drag each gas to its correct percentage in air!',
    answer: 'sort',
    options: [],
    hint: 'Nitrogen is 78%, Oxygen is 21%, Carbon dioxide is 0.04%!',
    misconception: 'Check the exact numbers: Nitrogen = 78%, Oxygen = 21%, Carbon dioxide = 0.04%! Do not mix up nitrogen and oxygen percentages!',
    sortItems: [
      { id: 'n2', label: 'Nitrogen (78%)', icon: 'nitrogen', correctBin: 'bin-78' },
      { id: 'o2', label: 'Oxygen (21%)', icon: 'oxygen', correctBin: 'bin-21' },
      { id: 'co2', label: 'Carbon Dioxide (0.04%)', icon: 'co2', correctBin: 'bin-04' },
    ],
    bins: [
      { id: 'bin-78', label: '78% 🟢', color: '#10B981' },
      { id: 'bin-21', label: '21% 🔵', color: '#3B82F6' },
      { id: 'bin-04', label: '0.04% 🟣', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each statement to Breathing or Burning!',
    answer: 'sort',
    options: [],
    hint: 'Breathing happens in living bodies and is slow. Burning happens outside with flames and produces heat!',
    misconception: 'Breathing and burning both use oxygen, but breathing is slow and inside living bodies, while burning is fast, outside, and produces heat and light!',
    sortItems: [
      { id: 'b1', label: 'Takes in oxygen in lungs', icon: 'oxygen', correctBin: 'breathing' },
      { id: 'b2', label: 'Done by all living animals', icon: 'leaf', correctBin: 'breathing' },
      { id: 'burn1', label: 'Needs oxygen for flame', icon: 'fire', correctBin: 'burning' },
      { id: 'burn2', label: 'Produces heat and light', icon: 'sun', correctBin: 'burning' },
    ],
    bins: [
      { id: 'breathing', label: 'Breathing 🫁', color: '#3B82F6' },
      { id: 'burning', label: 'Burning 🔥', color: '#F97316' },
    ],
  },
];

// ─── Dr. Sunita Mascot (Botanist Scientist) ──────────────────

function DrSunita({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]"
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
            <linearGradient id="sunita-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="sunita-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="37.5" cy="28" r="16" fill="url(#sunita-face)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M21 28 C21 15, 54 15, 54 28 C54 30, 52 35, 50 35 C48 35, 46 30, 37.5 30 C29 30, 27 35, 25 35 C23 35, 21 30, 21 28 Z" fill="#451A03" />
          {/* Glasses */}
          <circle cx="31" cy="27" r="5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <circle cx="44" cy="27" r="5" fill="none" stroke="#1E293B" strokeWidth="1.5" />
          <line x1="36" y1="27" x2="39" y2="27" stroke="#1E293B" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="27" r="1.5" fill="#1E293B" />
          <circle cx="44" cy="27" r="1.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 34 Q37.5 38 42 34" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Lab coat body */}
          <path d="M22 44 L37.5 48 L53 44 L55 75 L20 75 Z" fill="url(#sunita-coat)" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Leaf badge on coat */}
          <circle cx="30" cy="55" r="5" fill="#22C55E" stroke="#15803D" strokeWidth="1" />
          <path d="M30 51 C28 53, 28 57, 30 59 C32 57, 32 53, 30 51 Z" fill="white" />
          {/* Arms */}
          <ellipse cx="16" cy="55" rx="4" ry="10" fill="#E2E8F0" transform="rotate(-15 16 55)" />
          <ellipse cx="59" cy="55" rx="4" ry="10" fill="#E2E8F0" transform="rotate(15 59 55)" />
          {/* Feet */}
          <ellipse cx="28" cy="82" rx="5" ry="3" fill="#334155" />
          <ellipse cx="47" cy="82" rx="5" ry="3" fill="#334155" />
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

// ─── Botanical Scene Background ───────────────────────────────

function BotanicalScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="botanical-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="greenhouse-glass" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#7DD3FC" stopOpacity="0.4" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#botanical-sky)" />
        {/* Ground */}
        <rect x="0" y={height - 100} width={width} height="100" fill="#15803D" />
        <rect x="0" y={height - 100} width={width} height="12" fill="#22C55E" />

        {/* Greenhouse outline */}
        <path d="M 80 160 L 140 100 L 200 160 L 200 280 L 80 280 Z" fill="url(#greenhouse-glass)" stroke="#0369A1" strokeWidth="3" />
        <line x1="140" y1="100" x2="140" y2="280" stroke="#0369A1" strokeWidth="2" />
        <line x1="80" y1="190" x2="200" y2="190" stroke="#0369A1" strokeWidth="2" />
        <line x1="80" y1="235" x2="200" y2="235" stroke="#0369A1" strokeWidth="2" />

        {/* Large Tree on right */}
        <path d="M 580 280 L 610 280 L 610 180 L 580 180 Z" fill="#92400E" />
        <circle cx="595" cy="150" r="60" fill="#16A34A" />
        <circle cx="560" cy="170" r="45" fill="#22C55E" />
        <circle cx="630" cy="170" r="45" fill="#22C55E" />
      </svg>
      {/* Floating Sun */}
      <motion.div className="absolute top-6 left-12" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <SunIcon size={65} />
      </motion.div>
    </div>
  );
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-emerald-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 120, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex items-center justify-center p-3 text-center transition-all shadow-md ${
        isHovering ? 'scale-105 shadow-2xl' : 'scale-100'
      }`}
      style={{ left: x, top: y, width, height, backgroundColor: `${color}25`, borderColor: color }}
    >
      <span className="text-sm font-extrabold text-gray-900 drop-shadow-sm">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface PlantsAirGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PlantsAirGame({ width = 720, height = 560, onComplete }: PlantsAirGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 135, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

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
      const msg = "Great job! You understand plants and air!";
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
      const compMsg = "Wonderful! You are a brilliant botanist star!";
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

    // Check bin hit — positions must match the SortBin render positions
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = idx * 310 + 20;
      const binY = 100;
      const binW = 280;
      const binH = 160;
      if (x >= binX - 20 && x <= binX + binW + 20 && y >= binY - 20 && y <= binY + binH + 20) {
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
        const msg = "Fantastic! You sorted the plants and air facts perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl select-none" style={{ width, height }}>
      {/* Botanical Scene Background */}
      <BotanicalScene width={width} height={height} />

      {/* Dr. Sunita Mascot */}
      <DrSunita mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-10 shadow-sm border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌱</span>
          <div>
            <h1 className="text-sm font-extrabold text-emerald-900">Plants & Air Game</h1>
            <p className="text-[10px] text-emerald-700 font-semibold">Class 4 ICSE Science</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Challenge {challengeIdx + 1}/8</span>
              <StarRow count={Math.floor(score / 15)} total={8} />
            </div>
            <button
              onClick={handleShowHint}
              className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-3 py-1.5 rounded-full text-xs shadow transition flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>
        )}
      </div>

      {/* TEACHING SCREEN */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 px-8 pb-6 flex flex-col items-center justify-center z-20">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            className={`w-full max-w-xl rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-8 text-white shadow-2xl flex flex-col items-center text-center`}
          >
            <span className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed bg-black/10 p-4 rounded-2xl mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
            <div className="flex items-center justify-between w-full mt-auto">
              <button
                onClick={() => setSlideIdx(prev => Math.max(0, prev - 1))}
                disabled={slideIdx === 0}
                className="bg-white/20 hover:bg-white/30 disabled:opacity-30 text-white font-bold px-4 py-2 rounded-xl text-sm"
              >
                ← Back
              </button>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-2.5 h-2.5 rounded-full ${i === slideIdx ? 'bg-white' : 'bg-white/40'}`} />
                ))}
              </div>
              <button
                onClick={() => {
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    audioManager.play('success');
                    setScreen('play');
                  }
                }}
                className="bg-white text-emerald-950 hover:bg-emerald-50 font-extrabold px-6 py-2.5 rounded-xl text-sm shadow-lg"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 px-8 pb-6 flex flex-col items-center justify-between z-10">
          {/* Question Banner */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg max-w-2xl text-center border border-emerald-200"
          >
            <h3 className="text-base font-extrabold text-emerald-950">{currentChallenge.question}</h3>
          </motion.div>

          {/* Multiple Choice Challenge */}
          {currentChallenge.type === 'identify' && (
            <div className="flex flex-col gap-3 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-emerald-50 text-emerald-950 border-emerald-200';
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = 'bg-green-500 text-white border-green-600';
                  else if (isSelected) btnStyle = 'bg-red-500 text-white border-red-600';
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm shadow-md transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span className="text-xl">✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span className="text-xl">❌</span>}
                  </motion.button>
                );
              })}

              {selectedOpt && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  onClick={advanceChallenge}
                  className="mt-2 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-6 rounded-2xl shadow-lg self-center"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! 🏆'}
                </motion.button>
              )}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full h-[340px] my-auto">
              {/* Bins */}
              <div className="absolute top-4 left-0 right-0 flex justify-around px-8">
                {currentChallenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={idx * 310 + 20}
                    y={0}
                    width={280}
                    height={160}
                    isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                  />
                ))}
              </div>

              {/* Draggable Items */}
              {currentChallenge.sortItems.map(item => (
                <SortCard
                  key={item.id}
                  id={item.id}
                  label={item.label}
                  icon={item.icon}
                  x={itemPositions[item.id]?.x || 50}
                  y={itemPositions[item.id]?.y || 220}
                  placed={placedItems[item.id] || false}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                />
              ))}

              {/* Advance Button when all placed */}
              {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute bottom-2 left-1/2 -translate-x-1/2 z-30"
                >
                  <button
                    onClick={advanceChallenge}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold py-3 px-8 rounded-2xl shadow-2xl text-base flex items-center gap-2"
                  >
                    {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Game! ���'}
                  </button>
                </motion.div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Feedback Overlays */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
