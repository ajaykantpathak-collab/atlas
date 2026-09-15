'use client';

/**
 * WeightCapacityGame — Learn about weight, capacity, and conservation of volume
 *
 * CISCE Nodes: c3_math_029 (Non-standard units to weigh objects),
 *              c3_math_030 (Measurement and comparison of capacity),
 *              c3_math_031 (Conservation of volume)
 * Enrichment: c3_maths_enrichment_part29, part30, part31
 *
 * ELI5: "Weight is how heavy something is! We use a simple balance to count
 *   how many stones or marbles balance against an object. Capacity is how
 *   much liquid a container can hold! We count how many small cups fill a jug.
 *   Conservation of volume means pouring water into a different shaped container
 *   changes how it looks, but the amount of water stays exactly the same!"
 *
 * Misconceptions (from enrichment):
 *   1. "A bigger object is always heavier" → "No! A big sponge is lighter than
 *      a small iron ball! Always use a balance scale, never judge by size!"
 *   2. "Taller container always holds more" → "No! Height does not decide capacity
 *      alone! A tall thin glass can hold less than a short wide bowl!"
 *   3. "Water becomes more when poured into a wider or taller container" →
 *      "No! The amount of water stays the same. Only the container shape changes!"
 *   4. "Different stones give the exact same number" → "No! Non-standard units
 *      are not uniform. That is why we need standard units like gram and litre!"
 *   5. "A balance scale measures length" → "No! A balance scale compares and
 *      measures WEIGHT!"
 *
 * Story: "Help Chef Chitra use her balance scale, measuring cups, and cooking pots
 *   to weigh fruits, fill jugs, and discover the magic of water volume!"
 *
 * Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG kitchen scene background (sky gradient, stove, counter, pots)
 * - Custom SVG icon functions for weighing and capacity objects
 * - Custom SVG mascot (Chef Chitra) with mood states and speech bubble
 * - Drag-and-drop: drag items into correct weight, capacity, and volume bins
 * - 8 progressive challenges: identify weight → compare capacity → sort heavy/light → volume conservation
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API (speechManager)
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity (useRef timer)
 * - Progressive difficulty ladder
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

export interface WeightCapacityGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Weighing Objects ⚖️',
    text: 'Weight tells us how heavy or light an object is! We use a simple balance scale to find out. When the rod hangs level, both sides are equal!',
    emoji: '⚖️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Weight tells us how heavy or light an object is! We use a simple balance scale to find out. When the rod hangs level, both sides are equal!',
  },
  {
    title: 'Non-Standard Units 🪨',
    text: 'We can weigh a pencil by counting how many small stones or marbles balance against it! If 4 stones balance it, the pencil weighs 4 stones!',
    emoji: '🪨',
    bgColor: 'from-orange-400 to-amber-600',
    spoken: 'We can weigh a pencil by counting how many small stones or marbles balance against it! If 4 stones balance it, the pencil weighs 4 stones!',
  },
  {
    title: 'Capacity of Containers 🥛',
    text: 'Capacity is how much liquid a container can hold! To measure capacity, we fill a small cup and pour it into a jug, counting how many cups it takes!',
    emoji: '🥛',
    bgColor: 'from-cyan-400 to-blue-500',
    spoken: 'Capacity is how much liquid a container can hold! To measure capacity, we fill a small cup and pour it into a jug, counting how many cups it takes!',
  },
  {
    title: 'Compare Capacities 🏺',
    text: 'A mug holds more than a spoon, but less than a bucket! Always use the same measuring unit when comparing two containers so the comparison is fair.',
    emoji: '🏺',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'A mug holds more than a spoon, but less than a bucket! Always use the same measuring unit when comparing two containers so the comparison is fair.',
  },
  {
    title: 'Conservation of Volume 🌊',
    text: 'When we pour water from a tall glass into a wide bowl, the water level changes, but the amount of water stays exactly the same! This is conservation of volume!',
    emoji: '🌊',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'When we pour water from a tall glass into a wide bowl, the water level changes, but the amount of water stays exactly the same! This is conservation of volume!',
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which is HEAVIER: a stone or a feather?',
    answer: 'Stone',
    options: ['Stone', 'Feather', 'Both same'],
    hint: 'Think: which one is made of heavy rock and which is light and fluffy?',
    misconception: 'A stone is much heavier than a feather! Size and weight are different — never guess by looks, but a stone is dense rock while a feather is light bird down!',
  },
  {
    type: 'identify',
    question: 'What tool do we use to compare the WEIGHT of two objects?',
    answer: 'Balance scale',
    options: ['Balance scale', 'Ruler', 'Measuring cup'],
    hint: 'Think: a seesaw tool with two pans that dips down on the heavier side!',
    misconception: 'We use a balance scale to compare weight! A ruler measures length, and a measuring cup measures liquid capacity — not weight!',
  },
  {
    type: 'sort',
    question: 'Drag each object to Heavy or Light!',
    answer: 'sort',
    options: [],
    hint: 'Iron balls and bricks are heavy! Feathers and cotton are light!',
    misconception: 'Heavy objects like bricks and iron balls need strong support! Light objects like feathers and cotton float easily in the air!',
    sortItems: [
      { id: 'stone', label: 'Stone', icon: 'stone', correctBin: 'heavy' },
      { id: 'brick', label: 'Brick', icon: 'stone', correctBin: 'heavy' },
      { id: 'feather', label: 'Feather', icon: 'feather', correctBin: 'light' },
      { id: 'cotton', label: 'Cotton', icon: 'feather', correctBin: 'light' },
    ],
    bins: [
      { id: 'heavy', label: 'Heavy 🏋️', color: '#EF4444' },
      { id: 'light', label: 'Light 🪶', color: '#22C55E' },
    ],
  },
  {
    type: 'identify',
    question: 'What does CAPACITY mean?',
    answer: 'How much liquid a container can hold',
    options: [
      'How much liquid a container can hold',
      'How heavy something is',
      'How long something is',
    ],
    hint: 'Think about filling a bottle or glass with water to the brim!',
    misconception: 'Capacity is how much liquid a container can hold when filled to the top! How heavy something is is its weight, and how long is its length!',
  },
  {
    type: 'sort',
    question: 'Drag each container from smallest capacity to largest capacity!',
    answer: 'sort',
    options: [],
    hint: 'Order: Spoon < Glass < Bottle < Bucket!',
    misconception: 'Capacity increases from tiny spoons to giant buckets! A spoon holds a few drops, a glass holds a cup, a bottle holds more, and a bucket holds a lot!',
    sortItems: [
      { id: 'spoon', label: 'Spoon', icon: 'spoon', correctBin: 'small' },
      { id: 'glass', label: 'Glass', icon: 'glass', correctBin: 'medium' },
      { id: 'bottle', label: 'Bottle', icon: 'bottle', correctBin: 'large' },
      { id: 'bucket', label: 'Bucket', icon: 'bucket', correctBin: 'huge' },
    ],
    bins: [
      { id: 'small', label: 'Tiny 🥄', color: '#F59E0B' },
      { id: 'medium', label: 'Small 🥛', color: '#3B82F6' },
      { id: 'large', label: 'Big 🍼', color: '#8B5CF6' },
      { id: 'huge', label: 'Giant 🪣', color: '#EC4899' },
    ],
  },
  {
    type: 'identify',
    question: 'Which holds MORE water: a jug or a glass?',
    answer: 'Jug',
    options: ['Jug', 'Glass', 'Both same'],
    hint: 'Think: which vessel can fill several cups while the other is small?',
    misconception: 'A jug holds more water than a single glass! A jug is a large serving vessel, whereas a glass is smaller and holds a single portion!',
  },
  {
    type: 'sort',
    question: 'Drag each measurement action to Weight or Capacity!',
    answer: 'sort',
    options: [],
    hint: 'Weighing uses a balance scale and stones! Capacity uses cups and pouring water!',
    misconception: 'Weight uses a balance scale to find heaviness with stones or marbles! Capacity uses cups or spoons to fill containers with liquid!',
    sortItems: [
      { id: 'stone-balance', label: 'Weighing with stones', icon: 'balance', correctBin: 'weight' },
      { id: 'apple-weight', label: 'Apple on balance scale', icon: 'apple', correctBin: 'weight' },
      { id: 'pour-water', label: 'Pouring water into jug', icon: 'jug', correctBin: 'capacity' },
      { id: 'spoon-fill', label: 'Counting spoons of juice', icon: 'cup', correctBin: 'capacity' },
    ],
    bins: [
      { id: 'weight', label: 'Weight ⚖️', color: '#F97316' },
      { id: 'capacity', label: 'Capacity 🥛', color: '#06B6D4' },
    ],
  },
  {
    type: 'sort',
    question: 'Sort these statements about volume into True or False!',
    answer: 'sort',
    options: [],
    hint: 'Water volume stays the same when poured into different container shapes!',
    misconception: 'Volume is conserved! Pouring water into a taller or wider container changes how it looks, but the amount of water stays exactly the same. It never magically becomes more or less!',
    sortItems: [
      { id: 't1', label: 'Water volume stays same when poured', icon: 'water-drop', correctBin: 'true' },
      { id: 't2', label: 'Shape changes but amount stays same', icon: 'pot', correctBin: 'true' },
      { id: 'f1', label: 'Water becomes more in a taller glass', icon: 'glass', correctBin: 'false' },
      { id: 'f2', label: 'Volume changes when container shape changes', icon: 'bottle', correctBin: 'false' },
    ],
    bins: [
      { id: 'true', label: 'True ✅', color: '#22C55E' },
      { id: 'false', label: 'False ❌', color: '#EF4444' },
    ],
  },
];

// ─── Chef Chitra Mascot ───────────────────────────────────────

function ChefChitra({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300"
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
            <radialGradient id="chef-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Chef Hat */}
          <ellipse cx="37.5" cy="18" rx="20" ry="12" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <path d="M22 24 L25 35 L50 35 L53 24 Z" fill="white" stroke="#E5E7EB" strokeWidth="1" />
          <rect x="23" y="32" width="29" height="5" fill="#EF4444" rx="2" />
          {/* Head */}
          <circle cx="37.5" cy="45" r="16" fill="url(#chef-face)" />
          {/* Eyes */}
          <circle cx="31" cy="43" r="2.5" fill="#1F2937" />
          <circle cx="44" cy="43" r="2.5" fill="#1F2937" />
          <circle cx="32" cy="42" r="0.8" fill="white" />
          <circle cx="45" cy="42" r="0.8" fill="white" />
          {/* Cheeks */}
          <ellipse cx="28" cy="48" rx="3" ry="1.5" fill="#FCA5A5" opacity="0.7" />
          <ellipse cx="47" cy="48" rx="3" ry="1.5" fill="#FCA5A5" opacity="0.7" />
          {/* Smile */}
          <path d="M33 51 Q37.5 55 42 51" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Apron & Body */}
          <path d="M22 62 C22 58, 53 58, 53 62 L57 85 L18 85 Z" fill="#3B82F6" />
          <path d="M27 65 L48 65 L45 85 L30 85 Z" fill="white" />
          {/* Spoon in hand */}
          <rect x="52" y="55" width="3" height="18" fill="#D1D5DB" rx="1" transform="rotate(25 52 55)" />
          <circle cx="56" cy="52" r="4" fill="#9CA3AF" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Scene Background ──────────────────────────────

function KitchenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="kitchen-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="60%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" />
          </linearGradient>
          <linearGradient id="counter-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>
          <linearGradient id="wall-tile" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="100%" stopColor="#FEF08A" />
          </linearGradient>
        </defs>

        {/* Wall background */}
        <rect width={width} height={height * 0.75} fill="url(#kitchen-sky)" />

        {/* Kitchen tiles pattern */}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={i} x1={i * 90} y1="0" x2={i * 90} y2={height * 0.75} stroke="#FDE047" strokeWidth="1" opacity="0.4" />
        ))}
        {Array.from({ length: 5 }).map((_, i) => (
          <line key={i} x1="0" y1={i * 80} x2={width} y2={i * 80} stroke="#FDE047" strokeWidth="1" opacity="0.4" />
        ))}

        {/* Counter top */}
        <rect x="0" y={height * 0.75} width={width} height={height * 0.25} fill="url(#counter-grad)" />
        <rect x="0" y={height * 0.75} width={width} height="12" fill="#F59E0B" opacity="0.8" />

        {/* Shelf on wall */}
        <rect x="40" y="80" width="220" height="12" fill="#78350F" rx="2" />
      </svg>

      {/* Decorative shelf items (SVG) */}
      <div className="absolute top-12 left-16 flex gap-6 items-end">
        <JugIcon size={36} />
        <MeasuringCupIcon size={32} />
        <BottleIcon size={34} />
      </div>
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

function BalanceScaleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Stand base */}
      <path d="M20 52 L40 52 L35 48 L25 48 Z" fill="#78350F" />
      {/* Vertical pole */}
      <rect x="28" y="15" width="4" height="35" fill="#92400E" rx="1" />
      {/* Top cap */}
      <circle cx="30" cy="15" r="5" fill="#B45309" />
      {/* Beam */}
      <line x1="10" y1="18" x2="50" y2="18" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
      {/* Left pan */}
      <line x1="12" y1="18" x2="15" y2="35" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="18" y1="18" x2="15" y2="35" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M8 35 Q15 45, 22 35 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Right pan */}
      <line x1="42" y1="18" x2="45" y2="32" stroke="#9CA3AF" strokeWidth="1.5" />
      <line x1="48" y1="18" x2="45" y2="32" stroke="#9CA3AF" strokeWidth="1.5" />
      <path d="M38 32 Q45 42, 52 32 Z" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
      {/* Small stone on right pan */}
      <circle cx="45" cy="35" r="4" fill="#6B7280" />
    </svg>
  );
}

function StoneIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="18" ry="13" fill="#6B7280" stroke="#4B5563" strokeWidth="2" />
      <ellipse cx="24" cy="28" rx="6" ry="4" fill="#9CA3AF" opacity="0.6" />
      <path d="M18 35 Q25 42, 38 35" stroke="#374151" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FeatherIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 45 Q30 30, 48 12" stroke="#D1D5DB" strokeWidth="2" fill="none" />
      <path d="M15 45 C20 40, 35 25, 48 12 C35 20, 20 35, 15 45 Z" fill="#38BDF8" opacity="0.8" stroke="#0284C7" strokeWidth="1" />
      <path d="M25 38 Q33 32, 42 22" stroke="#BAE6FD" strokeWidth="1" fill="none" />
    </svg>
  );
}

function MeasuringCupIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 18 L22 46 L38 46 L42 18 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="30" cy="18" rx="12" ry="4" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
      {/* Handle */}
      <path d="M42 22 Q50 25, 42 38" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Water inside */}
      <path d="M20 28 L22 44 L38 44 L40 28 Z" fill="#38BDF8" opacity="0.7" />
      {/* Measurement lines */}
      <line x1="23" y1="32" x2="27" y2="32" stroke="#0369A1" strokeWidth="1.5" />
      <line x1="23" y1="38" x2="26" y2="38" stroke="#0369A1" strokeWidth="1.5" />
    </svg>
  );
}

function BottleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="10" width="10" height="8" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1" rx="1" />
      <path d="M25 18 C25 15, 20 15, 20 22 L20 50 C20 52, 22 54, 25 54 L35 54 C38 54, 40 52, 40 50 L40 22 C40 15, 35 15, 35 18 Z" fill="#E0F2FE" stroke="#2563EB" strokeWidth="2" />
      <path d="M22 30 L22 50 C22 52, 23 52, 25 52 L35 52 C37 52, 38 52, 38 50 L38 30 Z" fill="#38BDF8" opacity="0.6" />
    </svg>
  );
}

function JugIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 18 C18 15, 42 15, 42 18 L46 48 C46 52, 42 54, 38 54 L22 54 C18 54, 14 52, 14 48 Z" fill="#FEF08A" stroke="#D97706" strokeWidth="2" />
      {/* Spout */}
      <path d="M42 18 L50 14 L44 24 Z" fill="#FACC15" stroke="#D97706" strokeWidth="1.5" />
      {/* Handle */}
      <path d="M14 24 Q6 34, 14 44" stroke="#D97706" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Liquid */}
      <path d="M16 26 L44 26 L45 48 C45 51, 42 52, 38 52 L22 52 C18 52, 15 51, 15 48 Z" fill="#60A5FA" opacity="0.7" />
    </svg>
  );
}

function GlassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 16 L23 48 C23 51, 25 52, 28 52 L32 52 C35 52, 37 51, 37 48 L40 16 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="30" cy="16" rx="10" ry="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M21 28 L23 48 C23 50, 25 50, 28 50 L32 50 C35 50, 37 50, 37 48 L39 28 Z" fill="#38BDF8" opacity="0.7" />
    </svg>
  );
}

function BucketIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Handle arc */}
      <path d="M15 20 Q30 5, 45 20" stroke="#4B5563" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Bucket body */}
      <path d="M14 20 L18 50 C18 53, 22 54, 25 54 L35 54 C38 54, 42 53, 42 50 L46 20 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
      <ellipse cx="30" cy="20" rx="16" ry="4" fill="#FDA4af" stroke="#BE123C" strokeWidth="1.5" />
      <path d="M16 28 L17 48 C17 50, 21 52, 25 52 L35 52 C39 52, 43 50, 43 48 L44 28 Z" fill="#38BDF8" opacity="0.7" />
    </svg>
  );
}

function SpoonIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="28" y="25" width="4" height="26" fill="#9CA3AF" rx="2" transform="rotate(-30 30 30)" />
      <ellipse cx="20" cy="18" rx="8" ry="6" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="1.5" transform="rotate(-30 20 18)" />
    </svg>
  );
}

function PotIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="22" rx="18" ry="4" fill="#4B5563" />
      <path d="M12 22 C12 45, 48 45, 48 22 Z" fill="#6B7280" stroke="#374151" strokeWidth="2" />
      <path d="M8 20 L14 20" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      <path d="M46 20 L52 20" stroke="#374151" strokeWidth="3" strokeLinecap="round" />
      {/* Lid */}
      <path d="M22 15 Q30 8, 38 15 Z" fill="#9CA3AF" />
      <circle cx="30" cy="9" r="3" fill="#D1D5DB" />
    </svg>
  );
}

function WaterDropIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C24 22, 16 33, 16 40 C16 48, 22 52, 30 52 C38 52, 44 48, 44 40 C44 33, 36 22, 30 10 Z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="2" />
      <ellipse cx="25" cy="38" rx="4" ry="7" fill="white" opacity="0.5" />
    </svg>
  );
}

// ─── Render Sort Icon Helper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'stone': return <StoneIcon size={size} />;
    case 'feather': return <FeatherIcon size={size} />;
    case 'spoon': return <SpoonIcon size={size} />;
    case 'glass': return <GlassIcon size={size} />;
    case 'bottle': return <BottleIcon size={size} />;
    case 'bucket': return <BucketIcon size={size} />;
    case 'balance': return <BalanceScaleIcon size={size} />;
    case 'apple': return <MeasuringCupIcon size={size} />;
    case 'jug': return <JugIcon size={size} />;
    case 'cup': return <MeasuringCupIcon size={size} />;
    case 'water-drop': return <WaterDropIcon size={size} />;
    case 'pot': return <PotIcon size={size} />;
    default: return <StoneIcon size={size} />;
  }
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

function SortBin({ label, color, x, y, width, height, isHovering }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="px-3 py-1 rounded-full text-xs font-black text-white shadow-sm mb-1" style={{ backgroundColor: color }}>
        {label}
      </div>
      <div className="text-[10px] text-gray-500 font-medium">Drop here</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export function WeightCapacityGame({ width = 720, height = 560, onComplete }: WeightCapacityGameProps) {
  // Screen & Flow state
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback state
  const [feedbackState, setFeedbackState] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);

  // Mascot state
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  // Inactivity timer ref for auto-hint
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Current challenge
  const challenge = CHALLENGES[challengeIdx];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && feedbackState === 'idle') {
        const h = challenge.hint;
        setHintMessage(h);
        audioManager.play('hint');
        speechManager.speak(h);
        setMascotMood('thinking');
        setMascotSpeech('Need a hint, friend? Look here!');
      }
    }, 10000);
  }, [screen, feedbackState, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when slideIdx changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.title);
      setMascotMood('happy');
    }
  }, [screen, slideIdx]);

  // Speak challenge question when challengeIdx changes
  useEffect(() => {
    if (screen === 'play') {
      speechManager.speak(challenge.question);
      setMascotSpeech(challenge.question);
      setMascotMood('happy');
      // Initialize sort item positions if sort challenge
      if (challenge.type === 'sort' && challenge.sortItems) {
        const newPos: Record<string, { x: number; y: number }> = {};
        challenge.sortItems.forEach((item, idx) => {
          newPos[item.id] = { x: 30 + (idx % 2) * 130, y: 340 + Math.floor(idx / 2) * 105 };
        });
        setItemPositions(newPos);
        setPlacedItems({});
      }
    }
  }, [screen, challengeIdx, challenge]);

  // Handle teaching slide navigation
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      setScreen('play');
      audioManager.play('success');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev + 1);
    }
  };

  // Handle multiple choice answer selection
  const handleAnswerClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (feedbackState !== 'idle') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('success');
      setFeedbackState('correct');
      setFeedbackMsg('Brilliant! That is correct!');
      setSparklePos({ x, y });
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Wonderful job! Chef Chitra is proud!');
      speechManager.speak('Wonderful job! That is correct!');

      setTimeout(() => {
        advanceChallenge();
      }, 1600);
    } else {
      // Wrong!
      audioManager.play('error');
      setFeedbackState('wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
    }
  };

  const advanceChallenge = () => {
    setFeedbackState('idle');
    setSparklePos(null);
    setMascotSpeech(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // All challenges complete!
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      speechManager.speak('Amazing! You are a master of weight, capacity, and volume!');
      if (onComplete) onComplete(finalScore);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!challenge.bins || !challenge.sortItems) return false;

    // Find which bin (if any) the item was dropped into
    // Bins layout: top at y=220, height=110. Bin 1 x=60, Bin 2 x=380 (approx)
    const binWidth = 260;
    const binHeight = 110;
    const binY = 220;

    let targetBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const binX = 70 + idx * 300;
      if (x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 20 && y <= binY + binHeight + 20) {
        targetBinId = bin.id;
      }
    });

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item || !targetBinId) {
      audioManager.play('drop-wrong');
      return false;
    }

    if (targetBinId === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      // Check if all items placed
      const allDone = challenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setFeedbackState('correct');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('All sorted perfectly!');
        speechManager.speak('Fantastic sorting! Every item is in its right place!');

        setTimeout(() => {
          advanceChallenge();
        }, 1600);
      }
      return true;
    } else {
      // Wrong bin!
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl select-none" style={{ width, height, background: 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)' }}>
      {/* Background Scene */}
      <KitchenScene width={width} height={height} />

      {/* Mascot */}
      <ChefChitra mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti & Success Banner */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && (
        <SuccessBanner
          message="🎉 Level Complete! Master of Weight & Capacity! ⚖️"
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}

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

      {/* ─── SCREEN 1: TEACHING ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10 bg-black/30 backdrop-blur-sm">
          {/* Header */}
          <div className="w-full flex justify-between items-center text-white px-4">
            <span className="text-sm font-bold tracking-wider uppercase bg-amber-600/80 px-3 py-1 rounded-full shadow">
              Class 3 Math • Weight & Capacity
            </span>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-amber-400 scale-125' : 'bg-white/50'}`} />
              ))}
            </div>
          </div>

          {/* Slide Card */}
          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.4, type: 'spring' }}
            className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center border-4 border-white/40`}
          >
            <div className="text-6xl mb-4 bg-white/20 p-4 rounded-2xl shadow-inner">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-lg font-medium leading-relaxed drop-shadow">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="w-full max-w-xl flex justify-between px-4 pb-2">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${
                slideIdx === 0 ? 'opacity-40 cursor-not-allowed bg-gray-300 text-gray-500' : 'bg-white text-amber-700 hover:bg-amber-50 active:scale-95'
              }`}
            >
              ← Back
            </button>
            <button
              onClick={handleNextSlide}
              className="px-8 py-3 rounded-2xl font-black bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-xl hover:from-amber-600 hover:to-orange-700 active:scale-95 transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY (CHALLENGES) ─────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-lg border border-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase text-amber-800 bg-amber-100 px-3 py-1 rounded-full">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                const h = challenge.hint;
                setHintMessage(h);
                speechManager.speak(h);
              }}
              className="px-3 py-1 bg-amber-500 text-white rounded-xl text-xs font-bold shadow hover:bg-amber-600 active:scale-95 transition"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border-2 border-amber-300 my-2 text-center max-w-2xl mx-auto w-full">
            <h3 className="text-xl font-black text-gray-800 drop-shadow-sm">
              {challenge.question}
            </h3>
          </div>

          {/* Challenge Content area */}
          <div className="flex-1 relative flex items-center justify-center my-2">
            {/* MULTIPLE CHOICE CHALLENGES */}
            {challenge.type === 'identify' && challenge.options && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
                {challenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={(e) => handleAnswerClick(option, e)}
                    disabled={feedbackState !== 'idle'}
                    className="p-5 rounded-2xl bg-white/95 border-3 border-amber-300 shadow-xl font-black text-gray-800 text-base hover:bg-amber-50 hover:border-amber-500 transition-all flex flex-col items-center justify-center gap-2"
                  >
                    <span>{option}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* SORT / DRAG & DROP CHALLENGES */}
            {challenge.type === 'sort' && challenge.bins && challenge.sortItems && (
              <div className="absolute inset-0 flex flex-col justify-between">
                {/* Bins row */}
                <div className="flex justify-around px-8 pt-2">
                  {challenge.bins.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={idx === 0 ? 80 : 390}
                      y={10}
                      width={240}
                      height={120}
                      isHovering={hoveringBin === bin.id}
                    />
                  ))}
                </div>

                {/* Draggable items row */}
                <div className="flex justify-center gap-6 pb-4">
                  {challenge.sortItems.map((item) => {
                    const pos = itemPositions[item.id] || { x: 100, y: 150 };
                    const placed = !!placedItems[item.id];
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
              </div>
            )}
          </div>

          {/* Feedback Banner */}
          <AnimatePresence>
            {feedbackState === 'wrong' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="bg-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl text-center font-bold text-sm max-w-xl mx-auto w-full flex items-center justify-between border-2 border-red-300"
              >
                <span>⚠️ {challenge.misconception}</span>
                <button
                  onClick={() => setFeedbackState('idle')}
                  className="bg-white text-red-600 px-3 py-1 rounded-xl text-xs font-black shadow hover:bg-red-50"
                >
                  Try Again
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
