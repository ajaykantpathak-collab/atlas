'use client';

/**
 * AnimalsGame — Learn about animal characteristics, habitats, and the butterfly life cycle
 *
 * CISCE Nodes: c2_bio_013 (Animal characteristics), c2_bio_014 (Animal habitats), c2_bio_015 (Life cycle of butterfly)
 * Enrichment: c2_biology_enrichment_part13-15
 *
 * ELI5: "Animals are alive and do three special things: they move, they grow, and they eat food!
 *   They live in special homes called habitats like water, trees, and underground.
 *   And a butterfly goes through an amazing journey of four stages: egg, caterpillar, pupa, and adult butterfly!"
 *
 * Misconceptions addressed:
 *   1. "Animals move in the same way" → "No! Dogs walk/run, birds fly, fish swim, snakes crawl!"
 *   2. "Growing and moving are the same" → "No! Movement is changing place; growth is getting bigger over time!"
 *   3. "A habitat is like a zoo cage" → "No! A habitat is a natural home like a burrow, tree, or pond!"
 *   4. "All birds live in nests on branches" → "No! Different birds build different nests or live in holes!"
 *   5. "The pupa is just sleeping and nothing happens" → "No! The pupa is a busy workshop where metamorphosis happens!"
 *
 * Story: "Help Ranger Rohan explore the wildlife park, sort animals into their correct habitats,
 *   and discover the magical life cycle of the butterfly! Become a Junior Wildlife Ranger!"
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
    title: 'Animals Are Alive! 🐾',
    text: 'Animals are living beings that do three special things: they move from place to place, they grow from a young form to an adult, and they eat food for energy!',
    emoji: '🐾',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Animals are living beings that move, grow, and eat food!',
  },
  {
    title: 'How Animals Move! 🦅',
    text: 'Different animals move in different ways! Dogs walk and run on legs, birds fly with wings, fish swim with fins and tails, and snakes crawl on their long bodies!',
    emoji: '🦅',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Dogs walk and run, birds fly, fish swim, and snakes crawl!',
  },
  {
    title: 'Animal Habitats (Homes) 🏡',
    text: 'A habitat is the natural home where an animal lives and finds food! Some live underground in burrows, some high up in trees, and some in water like ponds and rivers!',
    emoji: '🏡',
    bgColor: 'from-green-400 to-emerald-500',
    spoken: 'A habitat is a natural home like burrows underground, trees, or water!',
  },
  {
    title: 'Why Animals Need Shelter! 🛡️',
    text: 'Animals need shelter to stay safe from enemies and bad weather like rain and hot sun. It is also a safe place for parents to raise their young ones!',
    emoji: '🛡️',
    bgColor: 'from-teal-400 to-gold-500',
    spoken: 'Animals need shelter to stay safe from enemies and weather, and to raise babies!',
  },
  {
    title: 'Butterfly Life Cycle! 🦋',
    text: 'A butterfly goes through 4 amazing stages called metamorphosis: 1. Egg on a leaf → 2. Caterpillar (larva) that eats leaves → 3. Chrysalis (pupa) → 4. Adult Butterfly!',
    emoji: '🦋',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'The butterfly life cycle has four stages: egg, caterpillar, chrysalis, and adult butterfly!',
  },
];

// ─── Types ─────────────────────────────────────────────────���──

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

// ─── Challenges (8 progressive: identify characteristics, habitats, butterfly lifecycle) ──

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What can animals do that plants generally cannot?',
    answer: 'Move from place to place',
    options: ['Move from place to place', 'Grow bigger over time', 'Need water to live'],
    hint: 'Think: Can a tree walk to the park? Animals can walk, run, fly, or swim!',
    misconception: 'Animals can move from place to place by themselves (locomotion)! Most plants stay firmly rooted in one place. Both grow and need water, but only animals can move around!',
  },
  {
    type: 'identify',
    question: 'Where does a fish naturally live?',
    answer: 'In water',
    options: ['In water', 'On tree branches', 'Underground in a burrow'],
    hint: 'A fish breathes through gills and swims with fins! Where is it at home?',
    misconception: 'A fish lives under water in a pond, river, or sea! It breathes through gills and uses fins to swim. It cannot live on trees or underground!',
  },
  {
    type: 'identify',
    question: 'Where does a rabbit make its home?',
    answer: 'Underground burrow',
    options: ['Underground burrow', 'High in a tree branch', 'Floating on a pond'],
    hint: 'A rabbit digs soft soil to make cool, safe rooms below the ground!',
    misconception: 'A rabbit lives in an underground burrow! The soil keeps it cool in summer, warm in winter, and safe from enemies like dogs and foxes.',
  },
  {
    type: 'sort',
    question: 'Drag each animal to its correct natural habitat!',
    answer: 'sort',
    options: [],
    hint: 'Fish live in water, monkeys live in trees, and rabbits live underground!',
    misconception: 'Each animal has a body suited to its home! Fish belong in water with fins, monkeys belong in trees with grasping hands, and rabbits belong underground in burrows!',
    sortItems: [
      { id: 'fish', label: 'Fish', icon: 'fish', correctBin: 'water' },
      { id: 'frog', label: 'Frog', icon: 'frog', correctBin: 'water' },
      { id: 'monkey', label: 'Monkey', icon: 'monkey', correctBin: 'tree' },
      { id: 'bird', label: 'Bird', icon: 'bird', correctBin: 'tree' },
      { id: 'rabbit', label: 'Rabbit', icon: 'rabbit', correctBin: 'underground' },
      { id: 'snake', label: 'Snake', icon: 'snake', correctBin: 'underground' },
    ],
    bins: [
      { id: 'water', label: 'Water 🌊', color: '#0288D1' },
      { id: 'tree', label: 'Trees 🌳', color: '#388E3C' },
      { id: 'underground', label: 'Underground 🕳️', color: '#8D6E63' },
    ],
  },
  {
    type: 'identify',
    question: 'What does a caterpillar eat to grow big?',
    answer: 'Leaves',
    options: ['Leaves', 'Fish', 'Stones'],
    hint: 'A caterpillar is born on a plant and spends all its time chewing green parts!',
    misconception: 'A caterpillar eats leaves! It hatches on a leaf, eats constantly to grow, and moults its skin several times before turning into a pupa.',
  },
  {
    type: 'identify',
    question: 'What comes right after the caterpillar stage in the butterfly life cycle?',
    answer: 'Chrysalis (Pupa)',
    options: ['Chrysalis (Pupa)', 'Adult Butterfly', 'Egg'],
    hint: 'After eating and growing, the caterpillar forms a hard case around itself to transform!',
    misconception: 'The stage after caterpillar is the pupa, called a chrysalis in butterflies! Inside the chrysalis, amazing metamorphosis happens as the caterpillar turns into a butterfly.',
  },
  {
    type: 'sort',
    question: 'Drag the 4 stages of the butterfly life cycle in the correct order!',
    answer: 'sort',
    options: [],
    hint: '1st: Egg on leaf -> 2nd: Caterpillar -> 3rd: Chrysalis -> 4th: Adult Butterfly!',
    misconception: 'Order matters! The cycle is: Egg is laid on a leaf -> Egg hatches into Caterpillar (larva) -> Caterpillar forms Chrysalis (pupa) -> Adult Butterfly emerges with wings!',
    sortItems: [
      { id: 'stage1', label: '1. Egg on Leaf', icon: 'egg', correctBin: 'bin1' },
      { id: 'stage2', label: '2. Caterpillar', icon: 'caterpillar', correctBin: 'bin2' },
      { id: 'stage3', label: '3. Chrysalis', icon: 'chrysalis', correctBin: 'bin3' },
      { id: 'stage4', label: '4. Butterfly', icon: 'butterfly', correctBin: 'bin4' },
    ],
    bins: [
      { id: 'bin1', label: '1st: Egg 🥚', color: '#F59E0B' },
      { id: 'bin2', label: '2nd: Caterpillar 🐛', color: '#84CC16' },
      { id: 'bin3', label: '3rd: Chrysalis 🌿', color: '#10B981' },
      { id: 'bin4', label: '4th: Butterfly 🦋', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each animal to how it moves!',
    answer: 'sort',
    options: [],
    hint: 'Birds fly with wings, fish swim with fins, snakes crawl on their body, dogs run on legs!',
    misconception: 'Every animal has specific body parts for movement! Birds use wings for flying, fish use fins for swimming, snakes use body muscles for crawling, and dogs use legs for walking/running!',
    sortItems: [
      { id: 'bird-fly', label: 'Bird (Fly)', icon: 'bird', correctBin: 'fly' },
      { id: 'fish-swim', label: 'Fish (Swim)', icon: 'fish', correctBin: 'swim' },
      { id: 'snake-crawl', label: 'Snake (Crawl)', icon: 'snake', correctBin: 'crawl' },
      { id: 'dog-walk', label: 'Dog (Walk/Run)', icon: 'dog', correctBin: 'walk' },
    ],
    bins: [
      { id: 'fly', label: 'Fly 🦅', color: '#0EA5E9' },
      { id: 'swim', label: 'Swim 🐟', color: '#3B82F6' },
      { id: 'crawl', label: 'Crawl 🐍', color: '#10B981' },
      { id: 'walk', label: 'Walk/Run 🐕', color: '#F97316' },
    ],
  },
];

// ─── Ranger Rohan Mascot (Wildlife Ranger) ────────────────────

function RangerRohan({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
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
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
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
        <svg width="75" height="85" viewBox="0 0 75 85">
          {/* Ranger Hat */}
          <ellipse cx="37" cy="22" rx="26" ry="7" fill="#8D6E63" stroke="#5D4037" strokeWidth="1.5" />
          <path d="M22 20 Q37 5, 53 20 Z" fill="#A1887F" stroke="#5D4037" strokeWidth="1.5" />
          <rect x="24" y="17" width="26" height="4" fill="#D7CCC8" />
          {/* Head */}
          <circle cx="37" cy="32" r="12" fill="#FFE0BD" stroke="#D4A373" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="33" cy="30" r="2" fill="#2C3E50" />
          <circle cx="41" cy="30" r="2" fill="#2C3E50" />
          <path d="M34 35 Q37 38 40 35" stroke="#C0392B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Binoculars around neck */}
          <rect x="29" y="42" width="6" height="8" rx="2" fill="#34495E" />
          <rect x="39" y="42" width="6" height="8" rx="2" fill="#34495E" />
          <path d="M31 42 Q37 39 43 42" stroke="#7F8C8D" strokeWidth="2" fill="none" />
          {/* Khaki Vest / Shirt */}
          <path d="M22 45 L37 48 L53 45 L55 70 L20 70 Z" fill="#C2B280" stroke="#8C7853" strokeWidth="1.5" />
          <line x1="37" y1="48" x2="37" y2="70" stroke="#8C7853" strokeWidth="1.5" strokeDasharray="3 3" />
          {/* Pocket */}
          <rect x="25" y="52" width="7" height="6" fill="#A39368" rx="1" />
          {/* Arms */}
          <ellipse cx="17" cy="55" rx="4" ry="9" fill="#C2B280" transform="rotate(15 17 55)" />
          <ellipse cx="58" cy="55" rx="4" ry="9" fill="#C2B280" transform="rotate(-15 58 55)" />
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

// ─── Forest Scene Background ──────────────────────────────���───

function ForestScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="forest-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB" />
            <stop offset="40%" stopColor="#BDE0FE" />
            <stop offset="70%" stopColor="#A8E6CF" />
            <stop offset="100%" stopColor="#56AB2F" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#forest-sky)" />
      </svg>
      {/* Mountains */}
      <div className="absolute bottom-32 left-0 right-0 h-40 opacity-70">
        <svg width="100%" height="100%" viewBox="0 0 800 200" preserveAspectRatio="none">
          <path d="M0 200 L0 120 Q100 80, 200 130 Q300 70, 450 140 Q600 60, 800 110 L800 200 Z" fill="#6B8E23" />
          <path d="M100 200 L250 90 Q350 120, 500 80 Q650 130, 800 100 L800 200 Z" fill="#557A2B" opacity="0.8" />
        </svg>
      </div>
      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="18" fill="#FFD700" opacity="0.9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="27" y1="27" x2={27 + 25 * Math.cos(angle * Math.PI / 180)} y2={27 + 25 * Math.sin(angle * Math.PI / 180)} stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          ))}
        </svg>
      </motion.div>
      {/* Ground & Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-36" style={{ background: 'linear-gradient(180deg, #4CAF50 0%, #2E7D32 100%)' }} />
      {/* Pond on bottom left */}
      <div className="absolute bottom-4 left-8 opacity-90">
        <svg width="140" height="50" viewBox="0 0 140 50">
          <ellipse cx="70" cy="25" rx="65" ry="20" fill="#29B6F6" stroke="#0288D1" strokeWidth="2" />
          <ellipse cx="70" cy="25" rx="55" ry="14" fill="#4FC3F7" />
          <ellipse cx="40" cy="22" rx="10" ry="4" fill="#81C784" />
          <ellipse cx="100" cy="28" rx="12" ry="5" fill="#81C784" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom Topic SVG Icons ───────────────────────────────────

function FishIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="30" rx="16" ry="10" fill="#FF9800" stroke="#E65100" strokeWidth="1.5" />
      <path d="M16 30 L8 22 L8 38 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="1" />
      <circle cx="42" cy="27" r="2.5" fill="#212121" />
      <path d="M30 20 Q35 25, 30 30" stroke="#FFB74D" strokeWidth="2" fill="none" />
      <path d="M35 20 Q40 25, 35 30" stroke="#FFB74D" strokeWidth="2" fill="none" />
    </svg>
  );
}

function BirdIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="38" cy="24" r="7" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <ellipse cx="26" cy="32" rx="12" ry="8" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="1.5" />
      <path d="M45 23 L52 25 L45 27 Z" fill="#F59E0B" />
      <path d="M26 40 L22 48 M32 40 L36 48" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round" />
      <path d="M18 28 Q25 15, 35 22" stroke="#1D4ED8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function FrogIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="34" rx="15" ry="12" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5" />
      <circle cx="22" cy="24" r="6" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />
      <circle cx="38" cy="24" r="6" fill="#81C784" stroke="#2E7D32" strokeWidth="1.5" />
      <circle cx="22" cy="23" r="2.5" fill="#212121" />
      <circle cx="38" cy="23" r="2.5" fill="#212121" />
      <path d="M22 38 Q30 44, 38 38" stroke="#1B5E20" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function RabbitIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="36" rx="13" ry="11" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="1.5" />
      <ellipse cx="25" cy="18" rx="3.5" ry="10" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="1.5" />
      <ellipse cx="35" cy="18" rx="3.5" ry="10" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="1.5" />
      <circle cx="24" cy="34" r="2" fill="#424242" />
      <path d="M38 33 Q43 32, 40 37" stroke="#9E9E9E" strokeWidth="2" fill="none" />
    </svg>
  );
}

function SnakeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 45 Q30 45, 30 35 Q30 25, 45 25 Q52 25, 50 18" stroke="#84CC16" strokeWidth="6" fill="none" strokeLinecap="round" />
      <circle cx="51" cy="15" r="5" fill="#65A30D" />
      <circle cx="53" cy="14" r="1.5" fill="white" />
      <circle cx="53.5" cy="14" r="0.7" fill="black" />
      <path d="M56 16 L60 17" stroke="#EF4444" strokeWidth="1.5" />
    </svg>
  );
}

function MonkeyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="32" r="14" fill="#A1887F" stroke="#5D4037" strokeWidth="1.5" />
      <circle cx="17" cy="28" r="5" fill="#A1887F" stroke="#5D4037" strokeWidth="1.5" />
      <circle cx="43" cy="28" r="5" fill="#A1887F" stroke="#5D4037" strokeWidth="1.5" />
      <ellipse cx="30" cy="35" rx="9" ry="7" fill="#D7CCC8" />
      <circle cx="26" cy="32" r="2" fill="#3E2723" />
      <circle cx="34" cy="32" r="2" fill="#3E2723" />
      <path d="M26 38 Q30 42, 34 38" stroke="#3E2723" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function DogIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="35" rx="14" ry="10" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <path d="M18 30 L14 20 L22 26 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="42" cy="30" r="7" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="45" cy="28" r="2" fill="black" />
      <path d="M47 33 Q50 35, 47 36" stroke="black" strokeWidth="1.5" fill="none" />
      <rect x="23" y="43" width="4" height="10" fill="#B45309" rx="2" />
      <rect x="37" y="43" width="4" height="10" fill="#B45309" rx="2" />
    </svg>
  );
}

function EggIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="12" ry="16" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
      <ellipse cx="26" cy="24" rx="4" ry="6" fill="white" opacity="0.6" />
      {/* Leaf base */}
      <path d="M10 45 Q30 55, 50 45 Q30 35, 10 45 Z" fill="#10B981" />
    </svg>
  );
}

function CaterpillarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 40 Q30 50, 50 40" stroke="#059669" strokeWidth="3" fill="none" />
      <circle cx="16" cy="38" r="6" fill="#84CC16" stroke="#365314" strokeWidth="1" />
      <circle cx="26" cy="35" r="6" fill="#84CC16" stroke="#365314" strokeWidth="1" />
      <circle cx="36" cy="35" r="6" fill="#84CC16" stroke="#365314" strokeWidth="1" />
      <circle cx="46" cy="37" r="7" fill="#65A30D" stroke="#365314" strokeWidth="1" />
      <circle cx="48" cy="35" r="1.5" fill="black" />
      <path d="M44 32 L42 27 M50 32 L52 27" stroke="#365314" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function ChrysalisIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="30" y1="10" x2="30" y2="20" stroke="#374151" strokeWidth="2" />
      <ellipse cx="30" cy="36" rx="9" ry="16" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M24 28 Q30 32, 36 28" stroke="#047857" strokeWidth="1.5" fill="none" />
      <path d="M23 36 Q30 40, 37 36" stroke="#047857" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ButterflyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="3" ry="14" fill="#374151" />
      {/* Left wings */}
      <path d="M30 22 C15 15, 5 25, 12 35 C18 42, 28 38, 30 34 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
      <path d="M30 35 C15 40, 10 50, 20 52 C28 53, 30 42, 30 36 Z" fill="#F43F5E" stroke="#BE185D" strokeWidth="1.5" />
      {/* Right wings */}
      <path d="M30 22 C45 15, 55 25, 48 35 C42 42, 32 38, 30 34 Z" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
      <path d="M30 35 C45 40, 50 50, 40 52 C32 53, 30 42, 30 36 Z" fill="#F43F5E" stroke="#BE185D" strokeWidth="1.5" />
      {/* Antennae */}
      <path d="M29 16 Q24 10, 20 12" stroke="#374151" strokeWidth="1.5" fill="none" />
      <path d="M31 16 Q36 10, 40 12" stroke="#374151" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// ─── Render Sort Icon helper ──────────────────────────────────

function renderSortIcon(id: string, size: number = 48) {
  if (id.includes('fish')) return <FishIcon size={size} />;
  if (id.includes('bird')) return <BirdIcon size={size} />;
  if (id.includes('frog')) return <FrogIcon size={size} />;
  if (id.includes('rabbit')) return <RabbitIcon size={size} />;
  if (id.includes('snake')) return <SnakeIcon size={size} />;
  if (id.includes('monkey')) return <MonkeyIcon size={size} />;
  if (id.includes('dog')) return <DogIcon size={size} />;
  if (id.includes('stage1') || id.includes('egg')) return <EggIcon size={size} />;
  if (id.includes('stage2') || id.includes('caterpillar')) return <CaterpillarIcon size={size} />;
  if (id.includes('stage3') || id.includes('chrysalis')) return <ChrysalisIcon size={size} />;
  if (id.includes('stage4') || id.includes('butterfly')) return <ButterflyIcon size={size} />;
  return <FishIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon || id, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

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
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-sm font-extrabold text-gray-800 text-center px-2">{label}</span>
      <div className="absolute inset-0 border-2 border-dashed rounded-xl opacity-40 pointer-events-none" style={{ borderColor: color }} />
    </div>
  );
}

// ──��� Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = TEACHING_SLIDES[currentSlide];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-30" style={{ background: 'linear-gradient(135deg, #1E3A8A 0%, #3B82F6 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between w-full max-w-2xl mt-2">
        <h1 className="text-2xl font-extrabold text-white tracking-wide">🌿 Ranger Rohan’s Wildlife Guide</h1>
        <span className="text-sm font-bold text-amber-300 bg-black/30 px-3 py-1 rounded-full">Slide {currentSlide + 1} of 5</span>
      </div>

      {/* Main Slide Card */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.4 }}
        className={`w-full max-w-2xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${slide.bgColor} flex flex-col items-center text-center border-4 border-white/40`}
      >
        <span className="text-6xl mb-4">{slide.emoji}</span>
        <h2 className="text-2xl font-black text-white mb-4 drop-shadow-md">{slide.title}</h2>
        <p className="text-lg font-medium text-white/95 leading-relaxed max-w-xl">{slide.text}</p>
      </motion.div>

      {/* Navigation & Dots */}
      <div className="flex flex-col items-center gap-4 w-full max-w-2xl mb-2">
        <div className="flex gap-2">
          {TEACHING_SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                audioManager.play('tap');
                setCurrentSlide(i);
              }}
              className={`h-3 rounded-full transition-all ${currentSlide === i ? 'w-8 bg-amber-400' : 'w-3 bg-white/40'}`}
            />
          ))}
        </div>

        <div className="flex justify-between w-full">
          <button
            onClick={() => {
              if (currentSlide > 0) {
                audioManager.play('tap');
                setCurrentSlide(currentSlide - 1);
              }
            }}
            disabled={currentSlide === 0}
            className={`px-6 py-2.5 rounded-2xl font-bold text-white shadow-lg transition-all ${currentSlide === 0 ? 'opacity-40 bg-gray-500 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500'}`}
          >
            ← Previous
          </button>

          {currentSlide < TEACHING_SLIDES.length - 1 ? (
            <button
              onClick={() => {
                audioManager.play('tap');
                setCurrentSlide(currentSlide + 1);
              }}
              className="px-6 py-2.5 rounded-2xl font-bold text-white shadow-lg bg-emerald-600 hover:bg-emerald-500 transition-all"
            >
              Next →
            </button>
          ) : (
            <button
              onClick={() => {
                audioManager.play('celebration');
                onStart();
              }}
              className="px-8 py-3 rounded-2xl font-black text-white shadow-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:scale-105 transition-all text-lg animate-pulse"
            >
              Start Game! 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component Props Interface ───────────────────────────

export interface AnimalsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Component ──────────────────────────────────────

export function AnimalsGame({ width = 720, height = 560, onComplete }: AnimalsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>("Let's explore the wildlife park!");
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparkleCoords, setSparkleCoords] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});

  const challenge = CHALLENGES[currentIndex];
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && !completed && challenge) {
        setHintMessage(challenge.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setSpeakingText("Need a hint, Ranger?");
        speechManager.speak("Need a hint, Ranger?");
      }
    }, 10000);
  }, [screen, completed, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [currentIndex, resetInactivityTimer]);

  // Init positions for sort challenge
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, index) => {
        const startX = 30 + (index % 3) * 125;
        const startY = 320 + Math.floor(index / 3) * 105;
        initialPos[item.id] = { x: startX, y: startY };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [currentIndex, challenge]);

  // Handle Multiple Choice Answer
  const handleAnswer = (option: string) => {
    resetInactivityTimer();
    if (option === challenge.answer) {
      audioManager.play('success');
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setSpeakingText('Fantastic job! That is correct!');
      speechManager.speak('Fantastic job! That is correct!');
      setSparkleCoords({ x: width / 2, y: height / 2 });
      setShowSuccessBanner(true);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setSpeakingText(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
    }
  };

  // Handle Drag Start
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle Drag End for Sort
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bins collision
    let droppedInBin: string | null = null;
    challenge.bins.forEach((bin, bIdx) => {
      const binX = 40 + bIdx * (2100 / challenge.bins!.length);
      const binY = 80;
      const binW = 180;
      const binH = 200;
      if (x + 55 >= binX && x + 55 <= binX + binW && y + 45 >= binY && y + 45 <= binY + binH) {
        droppedInBin = bin.id;
      }
    });

    if (droppedInBin === item.correctBin) {
      audioManager.play('drop-correct');
      setPlacedItems(prev => ({ ...prev, [id]: true }));
      
      // Check if all items placed
      const updatedPlaced = { ...placedItems, [id]: true };
      const allDone = challenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('celebration');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setSpeakingText('Amazing sorting! All correct!');
        speechManager.speak('Amazing sorting! All correct!');
        setShowSuccessBanner(true);
        setShowConfetti(true);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setSpeakingText(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      return false;
    }
  };

  // Advance challenge
  const nextChallenge = () => {
    setShowSuccessBanner(false);
    setShowConfetti(false);
    setHintMessage(null);
    setMascotMood('happy');
    setSpeakingText("Keep going, Ranger!");
    speechManager.speak("Keep going, Ranger!");

    if (currentIndex < CHALLENGES.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCompleted(true);
      audioManager.play('celebration');
      setShowConfetti(true);
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden select-none font-sans" style={{ width, height, maxWidth: '100%', maxHeight: '100%' }}>
      {/* Teaching Screen */}
      {screen === 'teaching' && <TeachingScreen onStart={() => setScreen('play')} />}

      {/* Forest Background */}
      <ForestScene width={width} height={height} />

      {/* Mascot */}
      <RangerRohan mood={mascotMood} speaking={speakingText} />

      {/* Top Bar */}
      <div className="absolute top-3 left-4 right-20 z-20 flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black text-gray-700 tracking-wider">CHALLENGE {currentIndex + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length} />
        </div>
        <button
          onClick={() => {
            audioManager.play('tap');
            setScreen('teaching');
          }}
          className="text-xs font-bold text-gold-700 bg-gold-100 hover:bg-gold-200 px-3 py-1.5 rounded-xl transition-all shadow-sm"
        >
          📖 Guide
        </button>
      </div>

      {/* Main Play Area */}
      {screen === 'play' && !completed && (
        <div className="absolute inset-x-4 top-20 bottom-4 z-10 flex flex-col justify-between p-4">
          {/* Question Card */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-amber-300 max-w-xl mx-auto w-full text-center"
          >
            <h2 className="text-base sm:text-lg font-extrabold text-gray-800 leading-snug">{challenge.question}</h2>
          </motion.div>

          {/* Multiple Choice Options */}
          {challenge.type === 'identify' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto w-full my-auto">
              {challenge.options.map((opt, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(opt)}
                  className="bg-white/95 hover:bg-amber-50 border-2 border-amber-300 rounded-2xl p-4 shadow-lg text-sm font-bold text-gray-800 text-center transition-all flex flex-col items-center justify-center gap-2"
                >
                  <span className="text-2xl">🌱</span>
                  <span>{opt}</span>
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort Challenge Area */}
          {challenge.type === 'sort' && challenge.sortItems && challenge.bins && (
            <div className="relative w-full h-[340px] my-auto">
              {/* Bins */}
              <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
                {challenge.bins.map((bin, bIdx) => {
                  const binW = Math.floor((width - 60) / challenge.bins!.length);
                  const binX = bIdx * (binW + 15) + 10;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={0}
                      width={binW}
                      height={190}
                      isHovering={false}
                    />
                  );
                })}
              </div>

              {/* Draggable Items */}
              {challenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: 250 };
                return (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={pos.x}
                    y={pos.y}
                    placed={!!placedItems[item.id]}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Completion Screen */}
      {completed && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-center bg-gradient-to-br from-amber-500 to-orange-600 p-6 text-white text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="bg-white text-gray-900 rounded-3xl p-8 shadow-2xl max-w-md w-full border-4 border-amber-300">
            <span className="text-6xl mb-3 block">🏆</span>
            <h2 className="text-2xl font-black mb-2 text-amber-600">Wildlife Ranger Master!</h2>
            <p className="text-sm font-medium text-gray-600 mb-6">You successfully completed all animal characteristics, habitats, and butterfly life cycle challenges!</p>
            <div className="flex justify-center mb-6">
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setCurrentIndex(0);
                setStars(0);
                setErrors(0);
                setCompleted(false);
                setScreen('teaching');
              }}
              className="w-full py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:scale-105 transition-all shadow-lg text-lg"
            >
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      )}

      {/* Feedback & Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && (
        <SuccessBanner
          message="Fantastic work, Ranger!"
          onComplete={nextChallenge}
        />
      )}
      {hintMessage && !showSuccessBanner && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
        />
      )}
      {sparkleCoords && (
        <SparkleBurst
          x={sparkleCoords.x}
          y={sparkleCoords.y}
          onComplete={() => setSparkleCoords(null)}
        />
      )}
    </div>
  );
}
