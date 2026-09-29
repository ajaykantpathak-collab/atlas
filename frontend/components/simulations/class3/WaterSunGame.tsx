'use client';

/**
 * WaterSunGame — Learn about Water properties, Water as a resource, and the Sun as a natural resource
 *
 * CISCE Nodes: c3_chem_006 (Some properties of water), c3_chem_007 (Water as a resource), c3_chem_008 (Sun as a natural resource)
 * Enrichment: c3_chemistry_enrichment_part6, part7, part8
 *
 * ELI5: "Water is a liquid that takes the shape of its container, is transparent, and dissolves sugar and salt!
 *   Water is a precious resource used for drinking, cooking, and farming. The Sun is our greatest natural energy source —
 *   it gives us heat and light, drives the water cycle, helps plants make food, and powers solar panels and cookers!"
 *
 * Misconceptions:
 *   1. "Water has a colour" → "No! Pure clean water is transparent and colourless!"
 *   2. "All water is safe to drink" → "No! River and pond water have germs. We must boil or filter it!"
 *   3. "Sun only gives light" → "No! The Sun gives us both light and heat energy!"
 *   4. "Solar energy costs money" → "No! Sunlight from the Sun is 100% free!"
 *   5. "Water is unlimited" → "No! Clean drinking water is limited — we must save every drop!"
 *
 * Story: "Join Environmentalista Ela on a grand science journey to explore the wonderful properties of water,
 *   discover water as Earth's most precious resource, and harness the glorious Sun as our natural energy powerhouse!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Type Definitions ─────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface Bin {
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
  bins?: Bin[];
}

export interface WaterSunGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Wonders of Water 💧',
    text: 'Water is a liquid that takes the shape of whatever container you pour it into! Pure, clean water is transparent, colourless, tasteless, and odourless. It dissolves sugar and salt to form solutions!',
    emoji: '💧',
    bgColor: 'from-gold-400 to-gold-600',
    spoken: 'Water is a liquid that takes the shape of its container. Pure clean water is transparent and dissolves sugar and salt!',
  },
  {
    title: 'Water as Our Resource 🚰',
    text: 'Water is Earth\'s most precious resource! All living things need water to survive. We use water for drinking, cooking, bathing, washing, farming, and industries. We must keep water clean by boiling or filtering!',
    emoji: '🌊',
    bgColor: 'from-gold-500 to-gold-600',
    spoken: 'Water is Earth\'s most precious resource. We use it for drinking, cooking, and farming. Always boil or filter water before drinking!',
  },
  {
    title: 'Saving Water 🪣',
    text: 'Clean drinking water is limited! We can save water by closing taps tightly while brushing, fixing leaking taps, using a bucket for bathing instead of a hose, and collecting rainwater!',
    emoji: '🌱',
    bgColor: 'from-teal-500 to-emerald-600',
    spoken: 'Clean drinking water is limited. Save water by turning off taps while brushing and fixing leaks!',
  },
  {
    title: 'The Sun — Our Natural Powerhouse ☀️',
    text: 'The Sun is a magnificent natural resource that gives us light and heat energy! It is a renewable energy source that shines every day. Without the Sun, life on Earth could not exist!',
    emoji: '☀️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'The Sun is a natural resource giving us light and heat energy. It is renewable and shines every single day!',
  },
  {
    title: 'How the Sun Helps Us 🔋',
    text: 'Sunlight helps green plants make food through photosynthesis! The Sun also dries wet clothes, evaporates water for the water cycle, and powers solar panels and solar cookers!',
    emoji: '🌻',
    bgColor: 'from-orange-400 to-amber-600',
    spoken: 'Sunlight helps plants make food, dries wet clothes, drives the water cycle, and powers solar panels and cookers!',
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What is the normal state of pure water at room temperature?',
    answer: 'Liquid',
    options: ['Liquid', 'Solid', 'Gas'],
    hint: 'Think: Can you pour water from a glass into a bowl? It flows freely!',
    misconception: 'Water at room temperature is a liquid! It flows and takes the shape of its container, unlike solids like ice or gases like steam.',
  },
  {
    type: 'identify',
    question: 'At what temperature does liquid water turn into ice (solid)?',
    answer: '0 degrees Celsius',
    options: ['0 degrees Celsius', '50 degrees Celsius', '100 degrees Celsius'],
    hint: 'Think about putting water in the freezer compartment of a refrigerator!',
    misconception: 'Water freezes into ice at 0 degrees Celsius! At 100 degrees Celsius, water boils and turns into steam.',
  },
  {
    type: 'sort',
    question: 'Drag each statement to True or False about water!',
    answer: 'sort',
    options: [],
    hint: 'Think about pure water: is it clear and colourless? Does it dissolve salt?',
    misconception: 'Pure water is transparent, colourless, odourless, and dissolves substances like sugar and salt! It is never solid at room temperature and has no colour.',
    sortItems: [
      { id: 't1', label: 'Water is transparent', icon: 'water-drop', correctBin: 'true-bin' },
      { id: 't2', label: 'Dissolves sugar & salt', icon: 'filter', correctBin: 'true-bin' },
      { id: 'f1', label: 'Water has a bright colour', icon: 'dirty-water', correctBin: 'false-bin' },
      { id: 'f2', label: 'Water is solid in a room', icon: 'thermometer', correctBin: 'false-bin' },
    ],
    bins: [
      { id: 'true-bin', label: 'True Statement ✅', color: '#10B981' },
      { id: 'false-bin', label: 'False Statement ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is the most important use of water for living things?',
    answer: 'Drinking and staying alive',
    options: ['Drinking and staying alive', 'Making plastic toys', 'Painting walls'],
    hint: 'All animals and humans must drink this every single day to survive!',
    misconception: 'Drinking and staying alive is the most critical use of water! Every living cell in plants, animals, and humans needs water to function.',
  },
  {
    type: 'sort',
    question: 'Drag each water source to Safe to Drink or Unsafe without boiling/filtering!',
    answer: 'sort',
    options: [],
    hint: 'Raw river water and muddy puddles have germs! Treated taps and filtered water are safe!',
    misconception: 'Raw river water and open puddles contain germs and mud! They are unsafe until boiled or filtered. Treated tap water and tested well water are safe.',
    sortItems: [
      { id: 's1', label: 'Filtered Tap Water', icon: 'tap', correctBin: 'safe-bin' },
      { id: 's2', label: 'Tested Well Water', icon: 'well', correctBin: 'safe-bin' },
      { id: 'u1', label: 'Raw River Water', icon: 'river', correctBin: 'unsafe-bin' },
      { id: 'u2', label: 'Muddy Puddle Water', icon: 'rain-cloud', correctBin: 'unsafe-bin' },
    ],
    bins: [
      { id: 'safe-bin', label: 'Safe to Drink 🚰', color: '#3B82F6' },
      { id: 'unsafe-bin', label: 'Needs Boiling/Filtering ⚠️', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'The Sun is a vital natural resource because it provides us with:',
    answer: 'Light and heat energy',
    options: ['Light and heat energy', 'Only cold breeze', 'Only sound waves'],
    hint: 'Step outside on a sunny day — what do you feel on your skin and see with your eyes?',
    misconception: 'The Sun gives us BOTH light and heat energy! This energy drives the water cycle, warms our planet, and powers life.',
  },
  {
    type: 'sort',
    question: 'Drag each solar application to how the Sun helps us!',
    answer: 'sort',
    options: [],
    hint: 'Solar panels make electricity! Solar cookers cook food! Sunlight helps plants make food!',
    misconception: 'The Sun powers solar panels to make electricity, runs solar cookers to cook food without fuel, and gives energy to plants for photosynthesis!',
    sortItems: [
      { id: 'sp1', label: 'Solar Panel Electricity', icon: 'solar-panel', correctBin: 'electricity-bin' },
      { id: 'sc1', label: 'Solar Cooker Food', icon: 'solar-cooker', correctBin: 'cooking-bin' },
      { id: 'ph1', label: 'Plant Photosynthesis', icon: 'plant', correctBin: 'plant-bin' },
    ],
    bins: [
      { id: 'electricity-bin', label: 'Electricity ⚡', color: '#8B5CF6' },
      { id: 'cooking-bin', label: 'Cooking Food 🍲', color: '#EC4899' },
      { id: 'plant-bin', label: 'Plant Food 🌱', color: '#10B981' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each action to Save Water or Waste Water!',
    answer: 'sort',
    options: [],
    hint: 'Closing taps while brushing saves water! Leaving taps running wastes water!',
    misconception: 'Good habits like turning off taps while brushing, fixing leaks, and using buckets save precious water! Leaving taps running wastes thousands of litres.',
    sortItems: [
      { id: 'w1', label: 'Turn off tap while brushing', icon: 'water-drop', correctBin: 'save-bin' },
      { id: 'w2', label: 'Fix leaking taps quickly', icon: 'bucket', correctBin: 'save-bin' },
      { id: 'w3', label: 'Leave tap running all day', icon: 'tap', correctBin: 'waste-bin' },
      { id: 'w4', label: 'Use hose to wash car daily', icon: 'river', correctBin: 'waste-bin' },
    ],
    bins: [
      { id: 'save-bin', label: 'Save Water 💧', color: '#10B981' },
      { id: 'waste-bin', label: 'Waste Water 🚫', color: '#EF4444' },
    ],
  },
];

// ─── Custom SVG Mascot: Environmentalista Ela ─────────────────

function ElaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-30 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            className="mb-1 bg-white/95 backdrop-blur rounded-2xl px-4 py-2 shadow-xl border-2 border-emerald-400 max-w-[240px]"
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
              ? { y: [0, -5, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="80" height="95" viewBox="0 0 80 95">
          {/* Sun hat */}
          <ellipse cx="40" cy="22" rx="28" ry="8" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <path d="M28 20 C28 10, 52 10, 52 20 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          {/* Face head */}
          <circle cx="40" cy="35" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="35" cy="33" r="2.5" fill="#1F2937" />
          <circle cx="45" cy="33" r="2.5" fill="#1F2937" />
          <circle cx="36" cy="32" r="0.8" fill="white" />
          <circle cx="46" cy="32" r="0.8" fill="white" />
          {/* Smile */}
          <path d="M36 40 Q40 44 44 40" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Green lab coat / shirt */}
          <path d="M25 50 L40 55 L55 50 L58 75 L22 75 Z" fill="#10B981" stroke="#059669" strokeWidth="1.5" />
          <path d="M35 53 L40 60 L45 53" fill="white" />
          {/* Small plant pin on coat */}
          <circle cx="31" cy="62" r="3" fill="#34D399" />
          <path d="M31 65 L31 69" stroke="#065F46" strokeWidth="1" />
          {/* Arms holding water bottle */}
          <ellipse cx="20" cy="62" rx="4" ry="9" fill="#FDE68A" transform="rotate(20 20 62)" />
          <ellipse cx="60" cy="62" rx="4" ry="9" fill="#FDE68A" transform="rotate(-20 60 62)" />
          {/* Water bottle in hand */}
          <rect x="55" y="55" width="8" height="14" fill="#38BDF8" rx="2" stroke="#0284C7" strokeWidth="1" />
          <rect x="57" y="52" width="4" height="3" fill="#0284C7" rx="1" />
          {/* Feet */}
          <ellipse cx="32" cy="88" rx="5" ry="4" fill="#4B5563" />
          <ellipse cx="48" cy="88" rx="5" ry="4" fill="#4B5563" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ───────────────────��──────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-md border border-amber-200">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#F59E0B' : 'none'} stroke={i < count ? '#D97706' : '#9CA3AF'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Scene Background ──────────────────────────────

function WaterSunSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#10B981" />
          </linearGradient>
          <linearGradient id="river-gradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="50%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="60%" stopColor="#F59E0B" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D97706" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Sky and Ground */}
        <rect width={width} height={height} fill="url(#sky-gradient)" />

        {/* Radiant Sun in top left */}
        <circle cx="80" cy="80" r="50" fill="url(#sun-glow)" />
        <circle cx="80" cy="80" r="28" fill="#FBBF24" stroke="#F59E0B" strokeWidth="2" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 80 + 34 * Math.cos(rad);
          const y1 = 80 + 34 * Math.sin(rad);
          const x2 = 80 + 46 * Math.cos(rad);
          const y2 = 80 + 46 * Math.sin(rad);
          return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />;
        })}

        {/* Fluffy Clouds */}
        <g fill="white" opacity="0.85">
          <ellipse cx="250" cy="70" rx="35" ry="18" />
          <ellipse cx="275" cy="62" rx="25" ry="15" />
          <ellipse cx="225" cy="65" rx="22" ry="13" />

          <ellipse cx="550" cy="90" rx="40" ry="20" />
          <ellipse cx="580" cy="82" rx="28" ry="16" />
          <ellipse cx="525" cy="86" rx="25" ry="14" />
        </g>

        {/* Rolling Green Hills */}
        <path d="M0 400 Q180 320 360 380 T720 360 L720 560 L0 560 Z" fill="#059669" opacity="0.9" />
        <path d="M0 440 Q220 370 480 420 T720 400 L720 560 L0 560 Z" fill="#047857" />

        {/* Flowing River */}
        <path d="M480 420 Q560 480 620 560 L380 560 Q340 490 410 420 Z" fill="url(#river-gradient)" />

        {/* Solar Panel Illustration on Hill */}
        <g transform="translate(140, 370)">
          <rect x="0" y="0" width="50" height="30" fill="#1E3A8A" rx="2" stroke="#93C5FD" strokeWidth="1.5" transform="skewX(-15)" />
          <line x1="12" y1="0" x2="12" y2="30" stroke="#93C5FD" strokeWidth="1" transform="skewX(-15)" />
          <line x1="25" y1="0" x2="25" y2="30" stroke="#93C5FD" strokeWidth="1" transform="skewX(-15)" />
          <line x1="38" y1="0" x2="38" y2="30" stroke="#93C5FD" strokeWidth="1" transform="skewX(-15)" />
          <line x1="0" y1="15" x2="50" y2="15" stroke="#93C5FD" strokeWidth="1" transform="skewX(-15)" />
          <rect x="22" y="30" width="6" height="20" fill="#4B5563" />
        </g>

        {/* Water Well Illustration */}
        <g transform="translate(50, 420)">
          <rect x="0" y="10" width="40" height="30" fill="#78350F" rx="3" stroke="#451A03" strokeWidth="2" />
          <ellipse cx="20" cy="10" rx="20" ry="6" fill="#1E3A8A" stroke="#451A03" strokeWidth="2" />
          <rect x="5" y="-5" width="4" height="20" fill="#78350F" />
          <rect x="31" y="-5" width="4" height="20" fill="#78350F" />
          <path d="M2 -7 L20 -20 L38 -7 Z" fill="#B91C1C" stroke="#991B1B" strokeWidth="1.5" />
        </g>
      </svg>
    </div>
  );
}

// ─── Custom Topic-Specific SVG Icons ──────────────────────────

function WaterDropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <linearGradient id="drop-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <path d="M30 5 C22 18, 12 30, 12 42 C12 52, 20 58, 30 58 C40 58, 48 52, 48 42 C48 30, 38 18, 30 5 Z" fill="url(#drop-grad)" stroke="#0369A1" strokeWidth="2" />
      <ellipse cx="24" cy="35" rx="5" ry="8" fill="white" opacity="0.5" />
    </svg>
  );
}

function DirtyWaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 20 C15 15, 45 15, 45 20 L42 50 C42 53, 18 53, 18 50 Z" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      <ellipse cx="30" cy="20" rx="15" ry="5" fill="#D97706" />
      <circle cx="24" cy="35" r="3" fill="#451A03" />
      <circle cx="36" cy="42" r="4" fill="#451A03" />
      <circle cx="30" cy="28" r="2" fill="#451A03" />
    </svg>
  );
}

function FilterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 12 L50 12 L36 32 L36 48 L24 48 L24 32 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <rect x="15" y="16" width="30" height="6" fill="#CBD5E1" rx="2" />
      <path d="M22 38 Q30 42 38 38" stroke="#38BDF8" strokeWidth="3" fill="none" />
      <path d="M26 44 Q30 46 34 44" stroke="#38BDF8" strokeWidth="3" fill="none" />
    </svg>
  );
}

function RiverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect width="60" height="60" fill="#84CC16" rx="8" />
      <path d="M10 0 Q35 30 10 60 L30 60 Q55 30 30 0 Z" fill="#0EA5E9" />
      <path d="M18 15 Q25 20 18 25" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M22 35 Q29 40 22 45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function WellIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="24" width="36" height="26" fill="#78350F" rx="3" stroke="#451A03" strokeWidth="2" />
      <ellipse cx="30" cy="24" rx="18" ry="6" fill="#1E3A8A" stroke="#451A03" strokeWidth="2" />
      <rect x="8" y="8" width="4" height="22" fill="#78350F" />
      <rect x="48" y="8" width="4" height="22" fill="#78350F" />
      <path d="M4 10 L30 0 L56 10 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
    </svg>
  );
}

function TapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="22" width="28" height="8" fill="#64748B" rx="3" />
      <path d="M30 22 L38 12 L46 12 L46 22 Z" fill="#475569" />
      <circle cx="42" cy="8" r="5" fill="#EF4444" />
      <path d="M34 30 C32 35, 30 38, 30 42 C30 44, 32 46, 34 46 C36 46, 38 44, 38 42 C38 38, 36 35, 34 30 Z" fill="#38BDF8" />
    </svg>
  );
}

function SolarPanelIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="6" y="12" width="48" height="30" fill="#1E3A8A" rx="3" stroke="#93C5FD" strokeWidth="2" />
      <line x1="18" y1="12" x2="18" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="30" y1="12" x2="30" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="42" y1="12" x2="42" y2="42" stroke="#93C5FD" strokeWidth="1.5" />
      <line x1="6" y1="27" x2="54" y2="27" stroke="#93C5FD" strokeWidth="1.5" />
      <rect x="27" y="42" width="6" height="14" fill="#4B5563" />
    </svg>
  );
}

function SolarCookerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 25 L50 25 L40 45 L20 45 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" />
      <circle cx="30" cy="32" r="8" fill="#334155" stroke="#0F172A" strokeWidth="1.5" />
      <path d="M15 12 L45 12 L38 25 L22 25 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M26 10 L30 4 L34 10 Z" fill="#F59E0B" />
    </svg>
  );
}

function RainCloudIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="24" cy="22" rx="14" ry="10" fill="#94A3B8" />
      <ellipse cx="38" cy="18" rx="16" ry="12" fill="#64748B" />
      <ellipse cx="45" cy="24" rx="10" ry="8" fill="#94A3B8" />
      <path d="M20 36 L17 44" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 36 L27 44" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M40 36 L37 44" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function ThermometerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="8" width="10" height="34" rx="5" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
      <circle cx="30" cy="44" r="8" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <rect x="28" y="20" width="4" height="22" fill="#EF4444" />
    </svg>
  );
}

function BucketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 16 L44 16 L40 46 L20 46 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <path d="M16 16 Q30 4 44 16" stroke="#475569" strokeWidth="2.5" fill="none" />
      <ellipse cx="30" cy="16" rx="14" ry="4" fill="#0EA5E9" />
    </svg>
  );
}

function PlantIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 45 L40 45 L36 55 L24 55 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      <path d="M30 45 L30 25" stroke="#16A34A" strokeWidth="3" />
      <path d="M30 32 C20 32, 12 24, 20 16 C25 22, 30 28, 30 32 Z" fill="#22C55E" />
      <path d="M30 25 C40 25, 48 17, 40 9 C35 15, 30 21, 30 25 Z" fill="#22C55E" />
    </svg>
  );
}

// ─── Render Icon Helper for Sort Cards ────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'water-drop': return <WaterDropIcon size={size} />;
    case 'dirty-water': return <DirtyWaterIcon size={size} />;
    case 'filter': return <FilterIcon size={size} />;
    case 'river': return <RiverIcon size={size} />;
    case 'well': return <WellIcon size={size} />;
    case 'tap': return <TapIcon size={size} />;
    case 'solar-panel': return <SolarPanelIcon size={size} />;
    case 'solar-cooker': return <SolarCookerIcon size={size} />;
    case 'rain-cloud': return <RainCloudIcon size={size} />;
    case 'thermometer': return <ThermometerIcon size={size} />;
    case 'bucket': return <BucketIcon size={size} />;
    case 'plant': return <PlantIcon size={size} />;
    default: return <WaterDropIcon size={size} />;
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
      width={120}
      height={100}
    >
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} p-2`} style={{ width: 120, height: 100 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

interface SortBinProps {
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
      className={`absolute rounded-3xl border-4 flex flex-col items-center justify-center p-3 shadow-2xl transition-all duration-300 ${isHovering ? 'scale-105 ring-4 ring-yellow-400' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="w-12 h-3 rounded-full mb-2 opacity-50" style={{ backgroundColor: color }} />
      <span className="text-sm font-extrabold text-center drop-shadow-sm" style={{ color: '#1F2937' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Main Component: WaterSunGame ─────────────────────────────

export function WaterSunGame({ width = 720, height = 560, onComplete }: WaterSunGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome! I am Ela! Let us explore Water and the Sun together!');

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Multiple choice state
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isWrong, setIsWrong] = useState(false);

  // Sort challenge state
  const [cardPositions, setCardPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current challenge
  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio setup
  useEffect(() => {
    speechManager.speak(TEACHING_SLIDES[0].spoken);
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // Reset inactivity timer on interaction
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
          if (screen === 'play') {
            handleShowHint();
          }
        }, 10000);
  }, []);

  // Initialize sort card positions when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        // Arrange sort items nicely at the top/center
        initialPos[item.id] = { x: 50 + idx * 135, y: 150 };
        initialPlaced[item.id] = false;
      });
      setCardPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
    setSelectedAnswer(null);
    setIsWrong(false);
    resetInactivityTimer();
  }, [challengeIdx, currentChallenge, resetInactivityTimer]);

  // Handle teaching slide change
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      const next = slideIdx + 1;
      setSlideIdx(next);
      speechManager.speak(TEACHING_SLIDES[next].spoken);
    } else {
      setScreen('play');
      audioManager.play('whoosh');
      setMascotMood('happy');
      setMascotSpeech('Challenge time! Let us test your knowledge!');
      speechManager.speak('Challenge time! Let us test your knowledge!');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      const prev = slideIdx - 1;
      setSlideIdx(prev);
      speechManager.speak(TEACHING_SLIDES[prev].spoken);
    }
  };

  // Multiple choice answer handler
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    setSelectedAnswer(option);
    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Brilliant! That is correct!');
      speechManager.speak('Brilliant! That is correct!');
      setSuccessMsg('Wonderful job! Correct answer!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(prev => prev + 1);
    } else {
      // Wrong!
      audioManager.play('error');
      setIsWrong(true);
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Advance to next challenge after success banner
  const handleSuccessComplete = () => {
    setSuccessMsg(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      setMascotMood('happy');
      setMascotSpeech('Next challenge! You can do it!');
      speechManager.speak(currentChallenge.question);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('Amazing! You are a true Water and Sun Hero!');
      speechManager.speak('Amazing! You are a true Water and Sun Hero!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  // Sort drag handlers
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check which bin x,y falls into
    // Bin 1: left side (e.g. x: 80 to 280, y: 320 to 480)
    // Bin 2: right side (e.g. x: 380 to 580, y: 320 to 480)
    let matchedBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = idx === 0 ? 80 : 380;
      const binY = 310;
      const binW = 240;
      const binH = 170;
      if (x >= binX - 30 && x <= binX + binW && y >= binY - 30 && y <= binY + binH) {
        matchedBin = bin.id;
      }
    });

    if (matchedBin) {
      if (matchedBin === item.correctBin) {
        // Correct bin!
        audioManager.play('drop-correct');
        const updatedPlaced = { ...placedItems, [id]: true };
        setPlacedItems(updatedPlaced);
        setCardPositions(prev => ({ ...prev, [id]: { x: matchedBin === currentChallenge.bins?.[0].id ? 140 : 440, y: 370 } }));
        
        // Check if all sort items placed
        const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
        if (allDone) {
          audioManager.play('success');
          setMascotMood('celebrate');
          setMascotSpeech('Fantastic sorting! All correct!');
          speechManager.speak('Fantastic sorting! All correct!');
          setSuccessMsg('Amazing sorting skills!');
          setSparklePos({ x: width / 2, y: height / 2 });
          setStars(prev => prev + 1);
        }
        return true;
      } else {
        // Wrong bin!
        audioManager.play('drop-wrong');
        setMascotMood('thinking');
        setMascotSpeech(currentChallenge.misconception);
        speechManager.speak(currentChallenge.misconception);
        setErrors(prev => prev + 1);
        return false;
      }
    }
    return false;
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-gold-300 to-emerald-400 font-sans"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <WaterSunSceneBackground width={width} height={height} />

      {/* Mascot Ela */}
      <ElaMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {/* Success Banner */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={handleSuccessComplete} />}

      {/* Hint Bubble */}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      {/* Sparkle Burst */}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── SCREEN 1: TEACHING SLIDES ────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10 bg-black/20 backdrop-blur-sm">
          {/* Top Bar */}
          <div className="w-full flex justify-between items-center bg-white/80 backdrop-blur px-6 py-3 rounded-2xl shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{TEACHING_SLIDES[slideIdx].emoji}</span>
              <h1 className="text-lg font-extrabold text-gray-800">Class 3 Science: Water & Sun Explorer</h1>
            </div>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`w-3 h-3 rounded-full transition-all ${idx === slideIdx ? 'bg-emerald-600 scale-125' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Card */}
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-8 rounded-3xl shadow-2xl text-white flex flex-col items-center text-center border-4 border-white/40`}
          >
            <div className="text-6xl mb-4 bg-white/20 p-4 rounded-full shadow-inner">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          {/* Navigation Controls */}
          <div className="w-full max-w-xl flex justify-between items-center">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-xl font-bold shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-gray-800 hover:bg-gray-100'
              }`}
            >
              ← Back
            </button>
            <span className="text-white font-extrabold text-sm drop-shadow">
              Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
            <button
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-xl font-bold bg-amber-400 text-gray-900 shadow-xl hover:bg-amber-300 transition-all flex items-center gap-2"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Challenges! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY & CHALLENGES ──────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          {/* Top Status Bar */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-white">
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-gold-800">
                Challenge {challengeIdx + 1} / {CHALLENGES.length}
              </span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
            <button
              onClick={handleShowHint}
              className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-gray-900 font-extrabold rounded-xl shadow-md text-xs transition-all flex items-center gap-1"
            >
              💡 Hint
            </button>
          </div>

          {/* Challenge Box */}
          <div className="my-auto mx-auto w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-emerald-300 flex flex-col items-center">
            <h3 className="text-lg font-black text-gray-800 text-center mb-5">
              {currentChallenge.question}
            </h3>

            {/* Multiple Choice Options */}
            {currentChallenge.type === 'identify' && currentChallenge.options && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((option, idx) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectOption = option === currentChallenge.answer;
                  let btnStyle = 'bg-gradient-to-r from-gold-50 to-gold-50 border-gold-200 text-gray-800 hover:bg-gold-100';
                  if (selectedAnswer) {
                    if (isCorrectOption) btnStyle = 'bg-green-500 text-white border-green-600 scale-102';
                    else if (isSelected) btnStyle = 'bg-red-500 text-white border-red-600';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedAnswer ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !selectedAnswer && handleAnswerSelect(option)}
                      className={`py-3 px-5 rounded-2xl font-bold text-sm border-2 shadow-md transition-all text-left flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{option}</span>
                      {selectedAnswer && isCorrectOption && <span>✅</span>}
                      {selectedAnswer && isSelected && !isCorrectOption && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Challenge Area */}
            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[240px]">
                {/* Bins */}
                {currentChallenge.bins.map((bin, idx) => {
                  const binX = idx === 0 ? 30 : 360;
                  const binW = 280;
                  const binH = 140;
                  const isHover = hoverBin === bin.id;
                  return (
                    <div key={bin.id} style={{ position: 'absolute', left: binX, top: 40 }}>
                      <SortBin
                        label={bin.label}
                        color={bin.color}
                        x={0}
                        y={0}
                        width={binW}
                        height={binH}
                        isHovering={isHover}
                      />
                    </div>
                  );
                })}

                {/* Draggable Cards */}
                {currentChallenge.sortItems.map(item => {
                  const pos = cardPositions[item.id] || { x: 50, y: 0 };
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

            {/* Wrong Answer Misconception Feedback */}
            {isWrong && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-3 bg-red-50 border-2 border-red-300 rounded-2xl text-red-800 text-xs font-bold text-center max-w-md shadow-md"
              >
                <p>⚠️ Common Misconception Check:</p>
                <p className="mt-1 font-normal">{currentChallenge.misconception}</p>
                <button
                  onClick={() => {
                    setIsWrong(false);
                    setSelectedAnswer(null);
                  }}
                  className="mt-2 px-4 py-1 bg-red-600 text-white rounded-xl text-xs font-extrabold hover:bg-red-700 transition-all"
                >
                  Try Again 🔄
                </button>
              </motion.div>
            )}
          </div>

          {/* Bottom Bar */}
          <div className="flex justify-between items-center bg-white/80 backdrop-blur px-6 py-3 rounded-2xl shadow-lg border border-white">
            <span className="text-xs font-extrabold text-gray-700">
              CISCE Class 3 Science • Water & Sun Resources
            </span>
            <span className="text-xs font-extrabold text-emerald-700">
              Score: {stars} / {CHALLENGES.length} Stars
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
