'use client';

/**
 * WaterGame — Learn about Water Storage, Properties, Conservation & Vessels
 * CISCE Nodes: c2_chem_001 (Storage), c2_chem_002 (Properties), c2_chem_003 (Conservation), c2_chem_004 (Vessels)
 *
 * ELI5: "Water is a precious helper in every home! We store it in clay pots, steel containers,
 *   and water tanks. Pure water has no colour, taste, or smell. We must conserve every drop,
 *   close taps tightly, and fix leaks!"
 *
 * Mascot: Jalwala Jaya — Friendly Water Conservation Officer with a blue uniform, drop badge, & clipboard.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching Slides (Exactly 5 slides as per spec) ────────────

const TEACHING_SLIDES = [
  {
    title: 'Storage of Water! 🏺',
    text: 'Water collected from taps, rain, or wells must be stored safely! We keep water in covered containers like clay pots (matkas), steel buckets, and water tanks so dust and insects cannot get in.',
    emoji: '🏺',
    bgColor: 'from-cyan-400 to-blue-500',
    spoken: 'Water collected from taps, rain, or wells must be stored safely in covered containers!'
  },
  {
    title: 'Simple Properties of Water! ✨',
    text: 'Pure, clean water has NO colour, NO taste, and NO smell! When poured into a clear glass, you can see right through it. It is transparent like a clear window!',
    emoji: '💧',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Pure clean water has no colour, no taste, and no smell! You can see right through it.'
  },
  {
    title: 'Vessels and Containers! 🪣',
    text: 'Different vessels have different jobs! A clay pot (matka) keeps drinking water cool naturally. A bucket helps us carry water for bathing. A water tank stores large amounts for the whole house!',
    emoji: '🪣',
    bgColor: 'from-teal-400 to-cyan-500',
    spoken: 'Different vessels have different jobs! Clay pots keep water cool, buckets carry water for bathing.'
  },
  {
    title: 'Water Conservation! 🚰',
    text: 'Fresh water is precious and limited! Always close taps tightly after use, use a mug instead of a running shower, and never let water overflow. Every drop counts!',
    emoji: '🌿',
    bgColor: 'from-green-400 to-emerald-500',
    spoken: 'Fresh water is precious and limited! Always close taps tightly and never let water overflow.'
  },
  {
    title: 'Preventing Leaks & Reuse! 🔄',
    text: 'A dripping tap wastes many litres of water every day! Report leaks to an adult right away. Reuse vegetable wash water to water the plants in your garden!',
    emoji: '🌱',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'A dripping tap wastes many litres of water! Report leaks and reuse clean water for plants.'
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

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What colour is pure, clean water?',
    answer: 'No colour (Colourless)',
    options: ['No colour (Colourless)', 'Bright blue', 'Milky white'],
    hint: 'Look through a glass of clean drinking water. Does it have any colour of its own?',
    misconception: 'Pure water has NO colour! The sea looks blue because of the sky reflection, but clean water in a glass is completely colourless and transparent!',
  },
  {
    type: 'identify',
    question: 'What does pure, clean water taste like?',
    answer: 'No taste (Tasteless)',
    options: ['No taste (Tasteless)', 'Sweet', 'Salty'],
    hint: 'Take a small sip of clean drinking water. Does it taste sweet or salty?',
    misconception: 'Pure water is tasteless! If water tastes sweet or salty, something has been mixed into it! Clean water has no taste of its own.',
  },
  {
    type: 'identify',
    question: 'What does pure, clean water smell like?',
    answer: 'No smell (Odourless)',
    options: ['No smell (Odourless)', 'Sweet fragrance', 'Smells like food'],
    hint: 'Bring a glass of clean water close to your nose. Do you smell flowers or food?',
    misconception: 'Pure water is odourless! It has no smell at all. If water smells nice, essence or soap has been added to it!',
  },
  {
    type: 'sort',
    question: 'Drag each vessel to its correct daily use at home!',
    answer: 'sort',
    options: [],
    hint: 'Clay pots keep water cool for drinking, buckets are for bathing, water tanks store large amounts!',
    misconception: 'Different vessels have specific jobs! Matkas cool drinking water through evaporation, buckets help us carry and pour water for bathing, and tanks store water for the whole house!',
    sortItems: [
      { id: 'matka', label: 'Clay pot (Matka)', icon: 'clay-pot', correctBin: 'drinking' },
      { id: 'bucket', label: 'Bucket', icon: 'bucket', correctBin: 'bathing' },
      { id: 'bottle', label: 'Water bottle', icon: 'bottle', correctBin: 'carrying' },
      { id: 'tank', label: 'Water tank', icon: 'tank', correctBin: 'storing' },
    ],
    bins: [
      { id: 'drinking', label: 'Cool Drinking 🏺', color: '#0284C7' },
      { id: 'bathing', label: 'Bathing 🚿', color: '#0D9488' },
      { id: 'carrying', label: 'Carrying 🎒', color: '#D97706' },
      { id: 'storing', label: 'Large Storing 🏢', color: '#4F46E5' },
    ],
  },
  {
    type: 'identify',
    question: 'Which tap is WASTING water?',
    answer: 'Leaking tap',
    options: ['Leaking tap', 'Closed tap', 'Tap turned off tightly'],
    hint: 'Think about a tap that drips water drop by drop all day long!',
    misconception: 'A leaking tap wastes many litres of water every day! A closed tap saves water. Always report leaks to an adult right away!',
  },
  {
    type: 'sort',
    question: 'Drag each action into Save Water or Waste Water!',
    answer: 'sort',
    options: [],
    hint: 'Closing taps while brushing and using mugs saves water. Leaving taps running wastes water!',
    misconception: 'Good habits like closing taps, fixing leaks, and using a bucket save precious water! Leaving taps running while brushing wastes gallons of water!',
    sortItems: [
      { id: 'close-brush', label: 'Close tap while brushing', icon: 'closed-tap', correctBin: 'save' },
      { id: 'fix-leak', label: 'Fix leaking tap quickly', icon: 'closed-tap', correctBin: 'save' },
      { id: 'run-tap', label: 'Leave tap open while brushing', icon: 'leaking-tap', correctBin: 'waste' },
      { id: 'long-shower', label: 'Long shower with running tap', icon: 'leaking-tap', correctBin: 'waste' },
    ],
    bins: [
      { id: 'save', label: 'Save Water ✅', color: '#16A34A' },
      { id: 'waste', label: 'Waste Water ⚠️', color: '#DC2626' },
    ],
  },
  {
    type: 'identify',
    question: 'Why should we store water in a CLAY POT (Matka)?',
    answer: 'It keeps water cool and safe',
    options: ['It keeps water cool and safe', 'It makes water colourful', 'It makes water sweet'],
    hint: 'Feel a clay pot in summer. Why is the water inside so refreshingly cool?',
    misconception: 'A clay pot (matka) is made of porous clay. Water seeps through tiny holes and evaporates, taking heat away and keeping the water inside naturally cool and fresh!',
  },
  {
    type: 'sort',
    question: 'Drag each water source to Natural or Man-Made!',
    answer: 'sort',
    options: [],
    hint: 'Rivers, rain, and lakes are made by nature. Taps and water tanks are made by humans!',
    misconception: 'Rivers, rain, ponds, and wells are natural water sources provided by nature! Taps, water tanks, and bottles are man-made storage vessels and systems!',
    sortItems: [
      { id: 'river', label: 'River', icon: 'river', correctBin: 'natural' },
      { id: 'rain', label: 'Rain', icon: 'rain', correctBin: 'natural' },
      { id: 'tap', label: 'Tap', icon: 'tap', correctBin: 'manmade' },
      { id: 'tank', label: 'Water Tank', icon: 'tank', correctBin: 'manmade' },
    ],
    bins: [
      { id: 'natural', label: 'Natural Source 🌊', color: '#0284C7' },
      { id: 'manmade', label: 'Man-Made 🏗️', color: '#7C3AED' },
    ],
  },
];

// ─── Custom SVG Icons for Topic Objects ───────────────────────

function WaterDropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 C18 20, 10 30, 10 38 C10 45, 17 48, 25 48 C33 48, 40 45, 40 38 C40 30, 32 20, 25 5 Z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" />
      <ellipse cx="20" cy="35" rx="4" ry="7" fill="white" opacity="0.6" />
    </svg>
  );
}

function ClayPotIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="14" rx="8" ry="3" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
      <path d="M17 14 C10 22, 10 36, 17 42 C21 45, 29 45, 33 42 C40 36, 40 22, 33 14 Z" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      <path d="M15 26 Q25 30, 35 26" stroke="#92400E" strokeWidth="2" fill="none" />
      <path d="M25 6 L25 11" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SteelContainerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="12" y="12" width="26" height="32" rx="4" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
      <ellipse cx="25" cy="12" rx="13" ry="4" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
      <rect x="20" y="6" width="10" height="6" rx="2" fill="#64748B" stroke="#475569" strokeWidth="1.5" />
      <path d="M15 25 L35 25" stroke="#64748B" strokeWidth="1.5" opacity="0.7" />
    </svg>
  );
}

function BottleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="20" y="6" width="10" height="8" rx="2" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      <rect x="16" y="14" width="18" height="30" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" opacity="0.8" />
      <rect x="20" y="20" width="10" height="15" rx="3" fill="white" opacity="0.4" />
    </svg>
  );
}

function BucketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M10 15 L40 15 L36 42 L14 42 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="25" cy="15" rx="15" ry="4" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M12 15 C12 2, 38 2, 38 15" stroke="#475569" strokeWidth="2" fill="none" />
      <ellipse cx="25" cy="16" rx="12" ry="3" fill="#93C5FD" />
    </svg>
  );
}

function TapIconComponent({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="18" width="22" height="8" rx="3" fill="#64748B" stroke="#334155" strokeWidth="2" />
      <path d="M28 18 L28 28 L36 34 L36 40" stroke="#64748B" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="20" cy="12" r="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
      <path d="M36 41 C35 43, 34 45, 34 46 C34 47, 35 48, 36 48 C37 48, 38 47, 38 46 C38 45, 37 43, 36 41 Z" fill="#0EA5E9" />
    </svg>
  );
}

function RiverIconComponent({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="0" y="10" width="50" height="30" fill="#22C55E" />
      <path d="M0 20 Q12 15, 25 25 T50 20 L50 35 Q37 40, 25 30 T0 35 Z" fill="#0EA5E9" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M10 26 Q18 22, 25 28" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.8" />
    </svg>
  );
}

function ClosedTapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="20" width="26" height="8" rx="3" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <circle cx="20" cy="13" r="5" fill="#16A34A" stroke="#14532D" strokeWidth="1.5" />
      <path d="M30 24 L38 24" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
      <circle cx="38" cy="24" r="3" fill="#16A34A" />
    </svg>
  );
}

function LeakingTapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="18" width="22" height="8" rx="3" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <path d="M28 18 L28 28 L36 34 L36 38" stroke="#EF4444" strokeWidth="6" fill="none" strokeLinecap="round" />
      <motion.g animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>
        <path d="M36 43 C35 44, 34 45, 34 46 C34 47, 35 48, 36 48 C37 48, 38 47, 38 46 C38 45, 37 44, 36 43 Z" fill="#EF4444" />
      </motion.g>
    </svg>
  );
}

function RainIconComponent({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="18" rx="16" ry="10" fill="#94A3B8" />
      <path d="M15 28 L13 36" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M25 28 L23 38" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M35 28 L33 36" stroke="#0EA5E9" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function TankIconComponent({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="14" width="34" height="26" rx="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="25" cy="14" rx="17" ry="5" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <circle cx="25" cy="27" r="5" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
    </svg>
  );
}

// Helper to render the correct custom SVG icon based on string key
function renderTopicIcon(iconKey: string, size: number = 48) {
  switch (iconKey) {
    case 'clay-pot': return <ClayPotIcon size={size} />;
    case 'bucket': return <BucketIcon size={size} />;
    case 'bottle': return <BottleIcon size={size} />;
    case 'tank': return <TankIconComponent size={size} />;
    case 'tap': return <TapIconComponent size={size} />;
    case 'closed-tap': return <ClosedTapIcon size={size} />;
    case 'leaking-tap': return <LeakingTapIcon size={size} />;
    case 'river': return <RiverIconComponent size={size} />;
    case 'rain': return <RainIconComponent size={size} />;
    default: return <WaterDropIcon size={size} />;
  }
}

// ─── Jalwala Jaya Mascot (Water Conservation Officer) ──────────

function JalwalaJayaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-cyan-400"
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
            <linearGradient id="uniform-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="100%" stopColor="#0369A1" />
            </linearGradient>
            <radialGradient id="face-grad" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#FDE047" />
            </radialGradient>
          </defs>
          {/* Body / Uniform */}
          <path d="M22 55 L37 52 L53 55 L58 78 L17 78 Z" fill="url(#uniform-grad)" stroke="#075985" strokeWidth="1.5" />
          {/* Water drop badge on uniform */}
          <path d="M37 60 C35 63, 33 65, 33 67 C33 69, 35 70, 37 70 C39 70, 41 69, 41 67 C41 65, 39 63, 37 60 Z" fill="#38BDF8" stroke="white" strokeWidth="1" />
          {/* Head */}
          <circle cx="37" cy="36" r="18" fill="url(#face-grad)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Officer Cap */}
          <path d="M22 26 L52 26 L48 18 L26 18 Z" fill="#0369A1" stroke="#075985" strokeWidth="1.5" />
          <ellipse cx="37" cy="26" rx="16" ry="3" fill="#0284C7" />
          <ellipse cx="37" cy="22" rx="4" ry="2" fill="#FACC15" />
          {/* Eyes */}
          <circle cx="30" cy="34" r="2.5" fill="#1E293B" />
          <circle cx="44" cy="34" r="2.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M31 42 Q37 47 43 42" stroke="#854D0E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Clipboard in hand */}
          <rect x="52" y="55" width="14" height="18" rx="2" fill="#F8FAFC" stroke="#64748B" strokeWidth="1.5" />
          <line x1="55" y1="59" x2="63" y2="59" stroke="#EF4444" strokeWidth="1.5" />
          <line x1="55" y1="63" x2="61" y2="63" stroke="#94A3B8" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ───────────────────────────────────���──────

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
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#FACC15' : 'none'} stroke={i < count ? '#CA8A04' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Scene Background ──────────────────────────────

function WaterGameBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #38BDF8 0%, #BAE6FD 35%, #E0F2FE 60%, #7DD3FC 100%)' }} />
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FACC15" opacity="0.9" />
          <circle cx="30" cy="30" r="12" fill="#EAB308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-8 left-1/4 opacity-80" animate={{ x: [0, 40, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>
      {/* River / Ground at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #0EA5E9 0%, #0284C7 50%, #0369A1 100%)' }} />
      {/* Animated River Waves */}
      <motion.div className="absolute bottom-20 left-0 right-0" animate={{ x: [0, 25, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="100%" height="25" viewBox="0 0 500 25" preserveAspectRatio="none">
          <path d="M0 12 Q62 0, 125 12 T250 12 T375 12 T500 12" stroke="white" strokeWidth="2.5" fill="none" opacity="0.6" />
        </svg>
      </motion.div>
      {/* Clay pots and steel container illustrations in bottom background */}
      <div className="absolute bottom-4 left-10 opacity-70">
        <ClayPotIcon size={56} />
      </div>
      <div className="absolute bottom-4 left-28 opacity-70">
        <SteelContainerIcon size={52} />
      </div>
      <div className="absolute bottom-4 right-12 opacity-70">
        <TankIconComponent size={60} />
      </div>
    </div>
  );
}

// ─── Sort Card Component (Drag-and-Drop) ──────────────────────

function SortCard({ item, x, y, placed, onDragStart, onDragEnd }: {
  item: { id: string; label: string; icon: string; correctBin: string };
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable id={item.id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={100}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-cyan-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} p-2`} style={{ width: 120, height: 100 }}>
        {renderTopicIcon(item.icon, 48)}
        <span className="text-xs font-bold text-gray-800 text-center mt-1">{item.label}</span>
      </div>
    </Draggable>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = TEACHING_SLIDES[currentSlide];

  const handleNext = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(prev => prev + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(prev => prev - 1);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-30" style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
      {/* Top Header */}
      <div className="w-full flex items-center justify-between max-w-xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black text-cyan-800">💧 Water Game</span>
          <span className="text-xs bg-cyan-600 text-white px-2 py-0.5 rounded-full font-bold">Class 2</span>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-cyan-600' : 'w-2.5 bg-cyan-300'}`} />
          ))}
        </div>
      </div>

      {/* Slide Card */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl p-8 border-4 border-cyan-200 flex flex-col items-center text-center my-auto"
      >
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl mb-4 shadow-inner" style={{ background: 'linear-gradient(135deg, #E0F2FE 0%, #7DD3FC 100%)' }}>
          {slide.emoji}
        </div>
        <h2 className="text-2xl font-black text-cyan-900 mb-3">{slide.title}</h2>
        <p className="text-base text-gray-700 leading-relaxed font-medium mb-6">{slide.text}</p>
        <div className="bg-cyan-50 rounded-2xl p-4 border border-cyan-200 w-full">
          <p className="text-xs font-bold text-cyan-800">💡 ICSE Curriculum Note:</p>
          <p className="text-xs text-cyan-700 mt-1">Water is precious! Store it properly in covered vessels, know its pure properties, and conserve every drop.</p>
        </div>
      </motion.div>

      {/* Navigation Footer */}
      <div className="w-full max-w-xl flex justify-between items-center">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-6 py-3 rounded-2xl font-bold text-sm shadow-md transition-all ${currentSlide === 0 ? 'opacity-40 cursor-not-allowed bg-gray-200 text-gray-400' : 'bg-white text-cyan-700 hover:bg-cyan-50'}`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-black text-white text-base shadow-lg transition-all transform hover:scale-105 active:scale-95"
          style={{ background: 'linear-gradient(135deg, #0284C7 0%, #0369A1 100%)' }}
        >
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🚀' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ─────────────────────────────────────

export interface WaterGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function WaterGame({ width = 720, height = 560, onComplete }: WaterGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [hintText, setHintText] = useState<string | null>(null);

  // Mascot states
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome! I am Officer Jalwala Jaya. Let us learn about water!');

  // Sort challenge states
  const [sortPlacements, setSortPlacements] = useState<Record<string, string>>({});
  const [dragPositions, setDragPositions] = useState<Record<string, { x: number; y: number }>>({});

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const challenge = CHALLENGES[currentChallengeIndex];

  // Reset sort items positions when challenge changes
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      challenge.sortItems.forEach((item, index) => {
        initialPos[item.id] = { x: 40 + index * 140, y: 340 };
      });
      setDragPositions(initialPos);
      setSortPlacements({});
    }
  }, [currentChallengeIndex, challenge]);

  // Inactivity timer reset
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      audioManager.play('hint');
      setHintText(challenge.hint);
      setMascotMood('thinking');
      setMascotSpeech('Need a hint? Check this out!');
      speechManager.speak('Need a hint? Check this out!');
    }, 10000);
  }, [challenge.hint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Handle multiple-choice answer selection
  const handleAnswerSelect = (option: string) => {
    audioManager.play('tap');
    resetInactivityTimer();

    if (option === challenge.answer) {
      audioManager.play('success');
      setScore(prev => prev + 15);
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Wonderful! Spot on!');
      speechManager.speak('Wonderful! Spot on!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setShowConfetti(true);
      setSuccessMessage('Brilliant answer! You are a Water Hero! 🌟');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintText(challenge.misconception);
    }
  };

  // Handle Drag Start
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle Drag End for Sort Challenges
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!challenge.sortItems || !challenge.bins) return false;
    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Determine target bin based on drop coordinates
    // Bins are rendered in a row at the top/middle
    let droppedBinId: string | null = null;
    challenge.bins.forEach((bin, index) => {
      const binX = 50 + index * 155;
      const binY = 160;
      if (x >= binX - 20 && x <= binX + 130 && y >= binY - 20 && y <= binY + 120) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setSortPlacements(prev => ({ ...prev, [id]: droppedBinId! }));

      // Check if all items are sorted correctly
      const newPlacements = { ...sortPlacements, [id]: droppedBinId! };
      if (Object.keys(newPlacements).length === challenge.sortItems.length) {
        audioManager.play('success');
        setScore(prev => prev + 25);
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('All sorted correctly! Amazing job!');
        speechManager.speak('All sorted correctly! Amazing job!');
        setShowConfetti(true);
        setSuccessMessage('Fantastic sorting! You mastered this challenge! 🌟');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintText(challenge.misconception);
      return false;
    }
  };

  // Advance to next challenge or finish
  const handleNextChallenge = () => {
    audioManager.play('tap');
    setSuccessMessage(null);
    setShowConfetti(false);
    setSparklePos(null);
    setHintText(null);
    setMascotMood('happy');
    setMascotSpeech('Keep up the great work, Water Hero!');
    speechManager.speak('Keep up the great work, Water Hero!');

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Game Complete
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between select-none overflow-hidden rounded-3xl shadow-2xl border-4 border-cyan-300 bg-sky-50" style={{ width, height }}>
      {/* Background Scene */}
      <WaterGameBackground width={width} height={height} />

      {/* Teaching Screen Modal */}
      {screen === 'teaching' && (
        <TeachingScreen onStart={() => setScreen('play')} />
      )}

      {/* Top Navigation & Score Bar */}
      <div className="w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b-2 border-cyan-200 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-cyan-900">💧 Water Game</span>
          <span className="text-xs bg-cyan-600 text-white px-2.5 py-1 rounded-full font-bold">
            Challenge {currentChallengeIndex + 1} / {CHALLENGES.length}
          </span>
        </div>
        <StarRow count={stars} total={CHALLENGES.length} />
      </div>

      {/* Jalwala Jaya Mascot */}
      <JalwalaJayaMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Main Challenge Area */}
      <div className="relative flex-1 w-full flex flex-col items-center justify-center p-6 z-10 max-w-2xl">
        <motion.div
          key={currentChallengeIndex}
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-full bg-white/95 backdrop-blur-md rounded-3xl shadow-xl p-6 border-4 border-cyan-200 flex flex-col items-center text-center"
        >
          <h2 className="text-xl font-black text-gray-800 mb-6">{challenge.question}</h2>

          {/* Multiple Choice Challenge */}
          {challenge.type === 'identify' && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-md">
              {challenge.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerSelect(option)}
                  className="w-full py-4 px-6 rounded-2xl font-bold text-base text-cyan-900 bg-gradient-to-r from-cyan-50 to-blue-50 border-2 border-cyan-300 shadow-md hover:bg-cyan-100 transition-all flex items-center justify-between"
                >
                  <span>{option}</span>
                  <span className="text-cyan-600 font-black">→</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort Challenge */}
          {challenge.type === 'sort' && challenge.sortItems && challenge.bins && (
            <div className="w-full flex flex-col items-center">
              {/* Bins Drop Targets */}
              <div className="flex justify-center gap-4 mb-6 w-full">
                {challenge.bins.map((bin, idx) => (
                  <div
                    key={bin.id}
                    className="flex flex-col items-center justify-center rounded-2xl border-3 border-dashed border-gray-400 bg-white/80 p-3 shadow-md"
                    style={{ width: 130, height: 110, borderColor: bin.color }}
                  >
                    <span className="text-xs font-black text-center" style={{ color: bin.color }}>{bin.label}</span>
                    <div className="text-[10px] text-gray-500 mt-1">Drop here</div>
                  </div>
                ))}
              </div>

              {/* Draggable Items */}
              <div className="relative w-full h-32">
                {challenge.sortItems.map(item => {
                  const placed = !!sortPlacements[item.id];
                  const pos = dragPositions[item.id] || { x: 40, y: 10 };
                  return (
                    <SortCard
                      key={item.id}
                      item={item}
                      x={pos.x}
                      y={pos.y}
                      placed={placed}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMessage && (
        <SuccessBanner message={successMessage} onComplete={handleNextChallenge} />
      )}
      {hintText && !successMessage && (
        <HintBubble message={hintText} onComplete={() => setHintText(null)} />
      )}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}
    </div>
  );
}
