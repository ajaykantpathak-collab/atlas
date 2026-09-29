'use client';

/**
 * MeasurementGame — Learn about length, weight, and capacity
 *
 * CISCE Nodes: c2_math_020 (Length using non-standard units),
 *              c2_math_021 (Compare weights - heavier/lighter),
 *              c2_math_022 (Simple balance to compare weights),
 *              c2_math_023 (Order containers by capacity)
 *
 * Enrichment: c2_maths_enrichment_part20-23
 *
 * ELI5: "Builder Bala helps us measure the world! We measure length with
 *   hand spans, footsteps, and pencils. We compare weights using our hands
 *   or a balance scale where the heavier side goes down. And we see how much
 *   containers hold — like a bucket holding more water than a tiny cup!"
 *
 * Misconceptions Addressed:
 *   1. "Bigger objects are always heavier" → "No! A big balloon is lighter than a small stone!"
 *   2. "Hand span is the same for everyone" → "No! Different people have different hand sizes!"
 *   3. "The balance going UP means heavier" → "No! The side that goes DOWN is heavier!"
 *   4. "Capacity and weight are the same" → "Capacity is how much it holds; weight is how heavy it feels!"
 *
 * Features:
 * - Teaching intro with exactly 5 slides before play begins
 * - Custom SVG construction site background with animated elements
 * - Custom SVG topic-specific objects (Ruler, HandSpan, FootStep, Pencil, BalanceScale, HeavyWeight, LightWeight, BigContainer, SmallContainer, WaterGlass)
 * - Unique mascot (Builder Bala — friendly builder with yellow hard hat, measuring tape, tool belt) with mood states and speech bubble
 * - Drag-and-drop: drag items into sorting bins using Draggable primitive
 * - 8 progressive challenges: length measurement → weight comparison → balance scale → capacity sorting
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken-free gameplay using Web Audio sound effects (audioManager)
 * - Confetti + celebration on success
 * - Auto-hint timer (10s inactivity)
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Measuring Length 📏',
    text: 'Before rulers, we measure length with body parts and everyday objects! Hand spans, footsteps, pencils, and sticks help us find how long things are. My desk is 5 hand spans long!',
    emoji: '📏',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Before rulers, we measure length with hand spans, footsteps, and pencils! My desk is 5 hand spans long!'
  },
  {
    title: 'Comparing Weights ⚖️',
    text: 'Weight tells us how heavy or light an object is! A brick is heavier than a feather. A pencil is lighter than a textbook. We can feel the pull in our hands or use a balance scale!',
    emoji: '⚖️',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Weight tells us how heavy or light an object is! A brick is heavier than a feather. A pencil is lighter than a book!'
  },
  {
    title: 'The Simple Balance 🔄',
    text: 'A simple balance has two pans. When you put objects on each pan, the heavier side goes DOWN and the lighter side goes UP! If both sides stay level, they weigh the same!',
    emoji: '⚖️',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'A simple balance has two pans. The heavier side goes down and the lighter side goes up!'
  },
  {
    title: 'Size vs Weight 🎈🪨',
    text: 'Bigger objects are NOT always heavier! A large balloon filled with air is much lighter than a small stone. Weight depends on what is inside, not just how big it looks!',
    emoji: '🎈',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'Bigger objects are not always heavier! A large balloon is lighter than a small stone!'
  },
  {
    title: 'Container Capacity 🪣💧',
    text: 'Capacity is how much liquid a container can hold! A bucket holds more water than a jug, and a jug holds more than a small glass. We order them from least to most capacity!',
    emoji: '🪣',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Capacity is how much liquid a container can hold! A bucket holds more water than a jug and a glass!'
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

// ─── Challenges (8 progressive: length → weight → balance → capacity) ──

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'The table is 5 hand spans long. What property are we measuring?',
    answer: 'Length',
    options: ['Length', 'Weight', 'Capacity'],
    hint: 'Think: are we finding out how long the table is, how heavy it is, or how much water it holds?',
    misconception: 'We are measuring LENGTH! Hand spans, footsteps, and pencils measure how long or far something is, not its weight or capacity!',
  },
  {
    type: 'identify',
    question: 'Which of these objects is HEAVIER?',
    answer: 'A brick',
    options: ['A feather', 'A brick', 'They are the same'],
    hint: 'Hold both in your imagination. Which one pulls your hand down much more?',
    misconception: 'A brick is much HEAVIER than a feather! A feather pulls your hand down almost not at all, while a brick is heavy and solid!',
  },
  {
    type: 'identify',
    question: 'Which of these objects is LIGHTER?',
    answer: 'A pencil',
    options: ['A bag of books', 'A pencil', 'They are the same'],
    hint: 'Think about which one you can easily lift with just two fingers.',
    misconception: 'A pencil is LIGHTER than a bag of books! A bag of books is heavy because it contains many items.',
  },
  {
    type: 'sort',
    question: 'Drag each object to the correct weight group: Heavier or Lighter!',
    answer: 'sort',
    options: [],
    hint: 'Stones, bricks, and watermelons are heavy! Feathers, pencils, and leaves are light!',
    misconception: 'Remember: size does not always mean heavier, but dense objects like bricks and stones are always heavier than light things like feathers and pencils!',
    sortItems: [
      { id: 'brick', label: 'Brick', icon: 'heavy', correctBin: 'heavier' },
      { id: 'watermelon', label: 'Watermelon', icon: 'heavy', correctBin: 'heavier' },
      { id: 'feather', label: 'Feather', icon: 'light', correctBin: 'lighter' },
      { id: 'pencil', label: 'Pencil', icon: 'light', correctBin: 'lighter' },
    ],
    bins: [
      { id: 'heavier', label: 'Heavier 🏋️', color: '#EF4444' },
      { id: 'lighter', label: 'Lighter 🪶', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify',
    question: 'On a simple balance scale, the side with the heavier object goes...',
    answer: 'DOWN',
    options: ['DOWN', 'UP', 'Stays level'],
    hint: 'Think of a see-saw in the park! The heavier child makes their side go which way?',
    misconception: 'The heavier object makes its pan go DOWN! The lighter object goes UP. A level beam means equal weight!',
  },
  {
    type: 'sort',
    question: 'Drag each container to the correct capacity group: Holds More or Holds Less!',
    answer: 'sort',
    options: [],
    hint: 'Buckets and big jugs hold a lot of water! Small glasses and cups hold very little!',
    misconception: 'Capacity is how much liquid fits inside! A large bucket holds much more water than a tiny drinking glass.',
    sortItems: [
      { id: 'bucket', label: 'Steel Bucket', icon: 'big-container', correctBin: 'more' },
      { id: 'tank', label: 'Water Tank', icon: 'big-container', correctBin: 'more' },
      { id: 'glass', label: 'Water Glass', icon: 'small-container', correctBin: 'less' },
      { id: 'cup', label: 'Tea Cup', icon: 'small-container', correctBin: 'less' },
    ],
    bins: [
      { id: 'more', label: 'Holds More 🪣', color: '#22C55E' },
      { id: 'less', label: 'Holds Less 🥛', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'If 3 uniform pencils fit end-to-end along a storybook, how long is the book?',
    answer: '3 pencils',
    options: ['3 pencils', '3 kilograms', '3 litres'],
    hint: 'We measured with pencils! So the length is stated as a count of pencil units.',
    misconception: 'The measurement is "3 pencils"! Always state the unit name along with the count — never just a number.',
  },
  {
    type: 'sort',
    question: 'Drag each item to the correct measurement type: Length, Weight, or Capacity!',
    answer: 'sort',
    options: [],
    hint: 'Hand spans measure length. Balance scales measure weight. Water glasses measure capacity!',
    misconception: 'Length uses hand spans or pencils; Weight uses balance scales and heavier/lighter; Capacity uses glasses and buckets!',
    sortItems: [
      { id: 'handspan', label: 'Hand Span', icon: 'handspan', correctBin: 'length' },
      { id: 'balance', label: 'Balance Scale', icon: 'balance', correctBin: 'weight' },
      { id: 'glass', label: 'Water Glass', icon: 'water-glass', correctBin: 'capacity' },
      { id: 'footstep', label: 'Footstep', icon: 'footstep', correctBin: 'length' },
    ],
    bins: [
      { id: 'length', label: 'Length 📏', color: '#F59E0B' },
      { id: 'weight', label: 'Weight ⚖️', color: '#EF4444' },
      { id: 'capacity', label: 'Capacity 💧', color: '#3B82F6' },
    ],
  },
];

// ─── Builder Bala Mascot ───────────────────────────────────────

function BuilderBala({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-4 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-4 py-2 shadow-xl max-w-[240px] border-2 border-amber-300"
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
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="hardhat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FACC15" />
              <stop offset="100%" stopColor="#CA8A04" />
            </linearGradient>
            <linearGradient id="overalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>

          {/* Hard Hat */}
          <path d="M20 28 Q37 12 55 28 Z" fill="url(#hardhat)" stroke="#854D0E" strokeWidth="1.5" />
          <rect x="15" y="26" width="45" height="5" rx="2" fill="#EAB308" stroke="#854D0E" strokeWidth="1" />

          {/* Head & Face */}
          <circle cx="37" cy="42" r="14" fill="#FED7AA" stroke="#C2410C" strokeWidth="1" />

          {/* Safety Goggles on Hat / Forehead */}
          <rect x="27" y="34" width="20" height="6" rx="3" fill="#0EA5E9" opacity="0.8" />

          {/* Eyes */}
          <circle cx="32" cy="42" r="2" fill="#1F2937" />
          <circle cx="42" cy="42" r="2" fill="#1F2937" />

          {/* Smile */}
          <path d="M33 48 Q37 52 41 48" stroke="#C2410C" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Body & Overalls */}
          <path d="M24 56 L50 56 L54 78 L20 78 Z" fill="url(#overalls)" stroke="#1E40AF" strokeWidth="1" />
          <rect x="31" y="60" width="12" height="10" rx="2" fill="#60A5FA" />

          {/* Tool belt */}
          <rect x="20" y="70" width="34" height="4" fill="#78350F" />
          <circle cx="28" cy="72" r="2.5" fill="#F59E0B" />
          <circle cx="46" cy="72" r="2.5" fill="#F59E0B" />

          {/* Measuring tape on belt */}
          <circle cx="37" cy="72" r="3" fill="#EF4444" />

          {/* Boots */}
          <ellipse cx="27" cy="83" rx="5" ry="3" fill="#451A03" />
          <ellipse cx="47" cy="83" rx="5" ry="3" fill="#451A03" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Construction Site SVG Background ─────────────────────────

function ConstructionScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #38BDF8 0%, #BAE6FD 40%, #FEF08A 70%, #FDE047 100%)' }} />

      {/* Sun */}
      <div className="absolute top-4 left-6">
        <svg width="55" height="55" viewBox="0 0 50 50">
          <circle cx="25" cy="25" r="16" fill="#FACC15" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="25" y1="25" x2={25 + 23 * Math.cos(angle * Math.PI / 180)} y2={25 + 23 * Math.sin(angle * Math.PI / 180)} stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      {/* Distant Crane Silhouette */}
      <div className="absolute top-10 right-16 opacity-30">
        <svg width="100" height="120" viewBox="0 0 100 120">
          <line x1="20" y1="120" x2="20" y2="20" stroke="#1E293B" strokeWidth="4" />
          <line x1="20" y1="20" x2="90" y2="10" stroke="#1E293B" strokeWidth="3" />
          <line x1="20" y1="35" x2="5" y2="50" stroke="#1E293B" strokeWidth="3" />
          <line x1="90" y1="10" x2="90" y2="40" stroke="#1E293B" strokeWidth="2" />
        </svg>
      </div>

      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #D97706 0%, #B45309 60%, #78350F 100%)' }} />

      {/* Measuring tape decoration on ground */}
      <div className="absolute bottom-4 left-0 right-0 h-4 opacity-70">
        <svg width="1000" height="20" viewBox="0 0 1000 20" preserveAspectRatio="none">
          <rect x="0" y="5" width="1000" height="10" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
          {Array.from({ length: 40 }).map((_, i) => (
            <line key={i} x1={i * 25} y1="5" x2={i * 25} y2={i % 5 === 0 ? "15" : "10"} stroke="#1F2937" strokeWidth="1.5" />
          ))}
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Topic Objects ─────────────────────────────────

function RulerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="20" rx="3" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      {[15, 20, 25, 30, 35, 40, 45].map(x => (
        <line key={x} x1={x} y1="20" x2={x} y2={x % 10 === 25 ? "28" : "25"} stroke="#1F2937" strokeWidth="1.5" />
      ))}
      <text x="35" y="34" fontSize="8" fontWeight="bold" fill="#1F2937">cm</text>
    </svg>
  );
}

function HandSpanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 40 Q20 20, 35 15 Q45 20, 45 35 L45 45 L15 45 Z" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5" />
      <path d="M25 45 L25 30 M32 45 L32 25 M39 45 L39 30" stroke="#C2410C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FootStepIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="12" ry="20" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" transform="rotate(-15 30 30)" />
      <circle cx="26" cy="14" r="3" fill="#64748B" />
      <circle cx="31" cy="12" r="2.5" fill="#64748B" />
      <circle cx="35" cy="13" r="2" fill="#64748B" />
    </svg>
  );
}

function PencilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="15,45 45,15 50,20 20,50" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <polygon points="15,45 20,50 12,48" fill="#FCA5A5" />
      <polygon points="12,48 15,45 10,43" fill="#1F2937" />
      <rect x="42" y="12" width="6" height="6" rx="1" fill="#F472B6" transform="rotate(45 45 15)" />
    </svg>
  );
}

function BalanceScaleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="20" width="6" height="30" fill="#64748B" />
      <polygon points="20,50 40,50 30,45" fill="#334155" />
      <line x1="12" y1="22" x2="48" y2="26" stroke="#475569" strokeWidth="3" strokeLinecap="round" />
      {/* Left pan */}
      <line x1="12" y1="22" x2="8" y2="38" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="12" y1="22" x2="16" y2="38" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M6 38 Q12 44, 18 38 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
      {/* Right pan (tipped down) */}
      <line x1="48" y1="26" x2="44" y2="44" stroke="#94A3B8" strokeWidth="1.5" />
      <line x1="48" y1="26" x2="52" y2="44" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M42 44 Q48 50, 54 44 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1" />
    </svg>
  );
}

function HeavyWeightIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="22" width="24" height="26" rx="4" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <path d="M24 22 C24 14, 36 14, 36 22" fill="none" stroke="#64748B" strokeWidth="3" />
      <text x="24" y="39" fontSize="12" fontWeight="bold" fill="#F8FAFC">10kg</text>
    </svg>
  );
}

function LightWeightIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 Q40 25, 30 50 Q20 25, 30 10 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      <path d="M30 15 L30 45" stroke="#E2E8F0" strokeWidth="1" />
      {[20, 30, 40].map(y => (
        <path key={y} d={`M30 ${y} Q38 ${y - 5}, 42 ${y}`} fill="none" stroke="#CBD5E1" strokeWidth="1" />
      ))}
      {[20, 30, 40].map(y => (
        <path key={y} d={`M30 ${y} Q22 ${y - 5}, 18 ${y}`} fill="none" stroke="#CBD5E1" strokeWidth="1" />
      ))}
    </svg>
  );
}

function BigContainerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 18 L45 18 L42 50 L18 50 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="30" cy="18" rx="15" ry="4" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <rect x="25" y="12" width="10" height="4" rx="1" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1.5" />
    </svg>
  );
}

function SmallContainerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 22 L40 22 L37 46 L23 46 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
      <ellipse cx="30" cy="22" rx="10" ry="3" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
    </svg>
  );
}

function WaterGlassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 18 L40 18 L36 48 L24 48 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" opacity="0.9" />
      <path d="M22 28 L38 28 L36 46 L24 46 Z" fill="#38BDF8" opacity="0.7" />
      <ellipse cx="30" cy="18" rx="10" ry="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
    </svg>
  );
}

// ─── Render Helper for Sort Card Icons ────────────────────────

function renderSortIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'heavy': return <HeavyWeightIcon size={size} />;
    case 'light': return <LightWeightIcon size={size} />;
    case 'big-container': return <BigContainerIcon size={size} />;
    case 'small-container': return <SmallContainerIcon size={size} />;
    case 'handspan': return <HandSpanIcon size={size} />;
    case 'balance': return <BalanceScaleIcon size={size} />;
    case 'water-glass': return <WaterGlassIcon size={size} />;
    case 'footstep': return <FootStepIcon size={size} />;
    default: return <PencilIcon size={size} />;
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
      width={110}
      height={95}
    >
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 46)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 truncate max-w-[100px]">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

interface SortBinProps {
  id: string;
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${
        isHovering ? 'scale-105 border-yellow-400 bg-yellow-50' : 'border-dashed bg-white/80'
      }`}
      style={{ left: x, top: y, width, height, borderColor: color }}
    >
      <span className="text-sm font-black text-gray-800 text-center px-2">{label}</span>
      <span className="text-[10px] text-gray-500 mt-1">Drop here</span>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface MeasurementGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Component ──────────────────────────────────────

export function MeasurementGame({ width = 720, height = 560, onComplete }: MeasurementGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(100);
  const [errorsCount, setErrorsCount] = useState(0);
  const [stars, setStars] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'misconception'; message: string } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Builder Bala. Let us measure and weigh things together!');
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge positions
  const [sortPositions, setSortPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer on interaction
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && !feedback) {
        const ch = CHALLENGES[currentChallenge];
        setHintMessage(ch.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setMascotSpeech('Need a hint? Check this out!');
        speechManager.speak('Need a hint? Check this out!');
      }
    }, 10000);
  }, [screen, currentChallenge, feedback]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer, currentChallenge]);

  // Initialize sort positions when entering a sort challenge
  useEffect(() => {
    const ch = CHALLENGES[currentChallenge];
    if (ch.type === 'sort' && ch.sortItems) {
      const initial: Record<string, { x: number; y: number; placed: boolean }> = {};
      ch.sortItems.forEach((item, i) => {
        initial[item.id] = {
          x: 40 + i * 140,
          y: 340,
          placed: false,
        };
      });
      setSortPositions(initial);
    }
  }, [currentChallenge]);

  // Handle teaching slide navigation
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      setScreen('play');
      audioManager.play('swoop');
      setMascotSpeech('Great! Now let us solve the challenges!');
      speechManager.speak('Great! Now let us solve the challenges!');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  // Multiple choice answer check
  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    const ch = CHALLENGES[currentChallenge];

    if (option === ch.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');
      setStars(s => s + 1);
      setSparklePos({ x: width / 2, y: height / 2 });
      setFeedback({ type: 'success', message: 'Wonderful! Spot on!' });

      setTimeout(() => {
        setFeedback(null);
        setSparklePos(null);
        if (currentChallenge < CHALLENGES.length - 1) {
          setCurrentChallenge(c => c + 1);
          setMascotMood('happy');
          setMascotSpeech('Ready for the next challenge?');
          speechManager.speak('Ready for the next challenge?');
        } else {
          // Game complete!
          setShowConfetti(true);
          setShowSuccessBanner(true);
          audioManager.play('celebration');
          setMascotSpeech('You are a Master Measurer!');
          speechManager.speak('You are a Master Measurer!');
          const finalScore = Math.max(0, 100 - errorsCount * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1500);
    } else {
      // Wrong — show misconception feedback
      audioManager.play('error');
      setMascotMood('thinking');
      setMascotSpeech('Oops! Not quite right.');
      speechManager.speak('Oops! Not quite right.');
      setErrorsCount(e => e + 1);
      setScore(s => Math.max(0, s - 5));
      setFeedback({ type: 'misconception', message: ch.misconception });
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const ch = CHALLENGES[currentChallenge];
    if (!ch.sortItems || !ch.bins) return false;

    const item = ch.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check if dropped inside any bin
    // Bin 1: left ~ 100, top ~ 200, width ~ 240, height ~ 120
    // Bin 2: left ~ 380, top ~ 200, width ~ 240, height ~ 120
    let droppedBinId: string | null = null;

    ch.bins.forEach((bin, idx) => {
      const binX = 80 + idx * 280;
      const binY = 180;
      const binW = 240;
      const binH = 130;

      if (x + 55 >= binX && x + 55 <= binX + binW && y + 45 >= binY && y + 45 <= binY + binH) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

    if (droppedBinId === item.correctBin) {
      // Correct drop!
      audioManager.play('drop-correct');
      setSortPositions(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items are placed
      const updatedPositions = {
        ...sortPositions,
        [id]: { x, y, placed: true },
      };

      const allPlaced = ch.sortItems.every(i => updatedPositions[i.id]?.placed);

      if (allPlaced) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('Amazing sorting skills!');
        speechManager.speak('Amazing sorting skills!');
        setStars(s => s + 1);
        setShowConfetti(true);
        setSparklePos({ x: width / 2, y: height / 2 });

        setTimeout(() => {
          setShowConfetti(false);
          setSparklePos(null);
          if (currentChallenge < CHALLENGES.length - 1) {
            setCurrentChallenge(c => c + 1);
            setMascotMood('happy');
            setMascotSpeech('Let us try the next challenge!');
            speechManager.speak('Let us try the next challenge!');
          } else {
            setShowSuccessBanner(true);
            audioManager.play('celebration');
            setMascotSpeech('You completed all measurement challenges!');
            speechManager.speak('You completed all measurement challenges!');
            const finalScore = Math.max(0, 100 - errorsCount * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 1800);
      }
      return true;
    } else {
      // Wrong drop!
      audioManager.play('drop-wrong');
      setMascotMood('thinking');
      setMascotSpeech(ch.misconception);
      speechManager.speak(ch.misconception);
      setErrorsCount(e => e + 1);
      setScore(s => Math.max(0, s - 5));
      return false;
    }
  };

  const handleHintClick = () => {
    audioManager.play('hint');
    const ch = CHALLENGES[currentChallenge];
    setHintMessage(ch.hint);
    setMascotMood('thinking');
    setMascotSpeech('Here is a helpful tip!');
    speechManager.speak('Here is a helpful tip!');
  };

  // ─────────────────────────────────────────────────────────────
  // RENDER: Teaching Screen
  // ─────────────────────────────────────────────────────────────

  if (screen === 'teaching') {
    const slide = TEACHING_SLIDES[currentSlide];
    return (
      <div className="relative flex flex-col items-center justify-center select-none overflow-hidden rounded-3xl shadow-2xl bg-amber-50" style={{ width, height }}>
        <ConstructionScene width={width} height={height} />
        <BuilderBala mood={mascotMood} speaking={mascotSpeech} />

        {/* Top Bar */}
        <div className="absolute top-4 left-4 z-20 flex items-center gap-3 bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-md">
          <span className="text-sm font-black text-amber-700">Builder Bala&apos;s Workshop</span>
          <div className="flex gap-1">
            {TEACHING_SLIDES.map((_, i) => (
              <div key={i} className={`h-2.5 rounded-full transition-all ${i === currentSlide ? 'w-6 bg-amber-500' : 'w-2.5 bg-gray-300'}`} />
            ))}
          </div>
        </div>

        {/* Slide Card */}
        <div className="relative z-10 flex flex-col items-center justify-center max-w-lg mx-6 bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl border-4 border-amber-300 mt-12">
          <motion.div
            key={currentSlide}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${slide.bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {slide.emoji}
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-3">{slide.title}</h2>
            <p className="text-base font-medium text-gray-600 leading-relaxed mb-6">{slide.text}</p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between w-full gap-4">
            {currentSlide > 0 ? (
              <button
                onClick={handlePrevSlide}
                className="px-5 py-2.5 rounded-2xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 active:scale-95 transition-all shadow"
              >
                Back
              </button>
            ) : <div />}

            <button
              onClick={handleNextSlide}
              className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 active:scale-95 transition-all shadow-lg text-lg flex items-center gap-2"
            >
              {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ─────────────────────────────────────────────────────────────
  // RENDER: Play Screen
  // ─────────────────────────────────────────────────────────────

  const challenge = CHALLENGES[currentChallenge];

  return (
    <div className="relative flex flex-col items-center justify-between select-none overflow-hidden rounded-3xl shadow-2xl bg-amber-50 p-6" style={{ width, height }}>
      <ConstructionScene width={width} height={height} />
      <BuilderBala mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Header */}
      <div className="relative z-20 w-full flex items-center justify-between bg-white/90 backdrop-blur px-5 py-3 rounded-2xl shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-3 py-1 rounded-xl">
            Challenge {currentChallenge + 1} of {CHALLENGES.length}
          </span>
          <StarRow count={stars} total={CHALLENGES.length} />
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={handleHintClick}
            className="flex items-center gap-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-bold px-3 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 text-xs"
          >
            💡 Hint
          </button>
          <div className="text-xs font-black text-gray-700 bg-gray-100 px-3 py-1.5 rounded-xl">
            Score: {score}
          </div>
        </div>
      </div>

      {/* Challenge Card */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-xl my-auto bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl border-4 border-amber-300">
        <h3 className="text-xl font-black text-gray-800 text-center mb-6">{challenge.question}</h3>

        {/* MULTIPLE CHOICE CHALLENGE */}
        {challenge.type === 'identify' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
            {challenge.options.map((option, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => handleAnswerSelect(option)}
                className="flex flex-col items-center justify-center p-4 rounded-2xl bg-gradient-to-b from-amber-50 to-orange-100 hover:from-amber-100 hover:to-orange-200 border-2 border-amber-300 shadow-md font-black text-gray-800 text-center transition-all min-h-[90px]"
              >
                {option === 'Length' && <RulerIcon size={40} />}
                {option === 'Weight' && <BalanceScaleIcon size={40} />}
                {option === 'Capacity' && <BigContainerIcon size={40} />}
                {option === 'A brick' && <HeavyWeightIcon size={40} />}
                {option === 'A feather' && <LightWeightIcon size={40} />}
                {option === 'A pencil' && <PencilIcon size={40} />}
                {option === 'A bag of books' && <HeavyWeightIcon size={40} />}
                {option === 'DOWN' && <span className="text-3xl mb-1">⬇️</span>}
                {option === 'UP' && <span className="text-3xl mb-1">⬆️</span>}
                {option === 'Stays level' && <span className="text-3xl mb-1">⚖️</span>}
                {option === '3 pencils' && <PencilIcon size={40} />}
                {option === '3 kilograms' && <HeavyWeightIcon size={40} />}
                {option === '3 litres' && <WaterGlassIcon size={40} />}
                <span className="mt-1 text-sm">{option}</span>
              </motion.button>
            ))}
          </div>
        )}

        {/* SORT CHALLENGE */}
        {challenge.type === 'sort' && challenge.sortItems && challenge.bins && (
          <div className="relative w-full h-[260px]">
            {/* Bins */}
            <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
              {challenge.bins.map((bin, idx) => (
                <SortBin
                  key={bin.id}
                  id={bin.id}
                  label={bin.label}
                  color={bin.color}
                  x={idx * 270 + 10}
                  y={10}
                  width={240}
                  height={120}
                  isHovering={hoveredBin === bin.id}
                />
              ))}
            </div>

            {/* Draggable Items */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-around px-6">
              {challenge.sortItems.map((item) => {
                const pos = sortPositions[item.id] || { x: 0, y: 0, placed: false };
                return (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={pos.x}
                    y={pos.y}
                    placed={pos.placed}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Feedback Overlay */}
      <AnimatePresence>
        {feedback && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className={`absolute bottom-6 left-6 right-6 z-30 p-4 rounded-2xl shadow-2xl border-2 text-center ${
              feedback.type === 'success' ? 'bg-emerald-100 border-emerald-400 text-emerald-900' : 'bg-red-100 border-red-400 text-red-900'
            }`}
          >
            <p className="font-black text-base">{feedback.message}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hint Bubble */}
      {hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
        />
      )}

      {/* Sparkle Burst */}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}

      {/* Success Banner */}
      {showSuccessBanner && (
        <SuccessBanner
          message="🎉 Incredible! You are a Master of Measurement! 🏆"
          onComplete={() => {}}
        />
      )}
    </div>
  );
}
