'use client';

/**
 * PlantsGame — Learn about plant parts, seed structure, germination, and plant types (herbs, shrubs, trees, climbers)
 *
 * CISCE Nodes: c3_bio_014 (Plant parts & functions), c3_bio_015 (Seed structure & kinds),
 *              c3_bio_016 (Seed germination), c3_bio_017 (Plant types)
 *
 * ELI5: "Plants are living green friends! Roots drink water from soil, stems carry water up,
 *   leaves cook food in the sunlight, flowers make fruits, and fruits protect seeds. Seeds wake up
 *   with water, air, and warmth to grow into new seedlings. Plants grow as tiny herbs, bushy shrubs,
 *   tall trees, or climbing vines!"
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
    title: 'Five Main Parts of a Plant! 🌱',
    text: 'A plant has five main parts: root, stem, leaf, flower, and fruit! Each part has a special job that keeps the plant alive and growing.',
    emoji: '🌱',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'A plant has five main parts: root, stem, leaf, flower, and fruit! Each part has a special job that keeps the plant alive.',
  },
  {
    title: 'Roots and Stems: Drink & Transport! 🌿',
    text: 'Roots anchor the plant firmly in the soil and absorb water and minerals like a straw! Stems hold leaves up to sunlight and carry water and food like a pipe!',
    emoji: '🌿',
    spoken: 'Roots anchor the plant and absorb water like a drinking straw. Stems support the plant and carry water like a pipe!',
    bgColor: 'from-green-500 to-teal-600',
  },
  {
    title: 'Leaves: The Tiny Kitchens! 🍃',
    text: 'Leaves are flat and green because of chlorophyll! They make food for the plant using sunlight, water, and air in a process called photosynthesis!',
    emoji: '🍃',
    spoken: 'Leaves are flat and green. They make food for the plant using sunlight, water, and air in a process called photosynthesis!',
    bgColor: 'from-teal-500 to-emerald-700',
  },
  {
    title: 'Seeds & Germination! 🌱',
    text: 'Inside every fruit are seeds with a seed coat, stored food in cotyledons, and an embryo! With water, air, and warmth, a seed germinates into a baby seedling!',
    emoji: '🌱',
    spoken: 'Inside every fruit are seeds with a seed coat, stored food, and a baby plant. With water, air, and warmth, seeds germinate into seedlings!',
    bgColor: 'from-amber-500 to-orange-600',
  },
  {
    title: 'Plant Types: Herbs, Shrubs, Trees & Climbers! 🌳',
    text: 'Plants come in 4 types! Herbs have soft green stems like mint. Shrubs have woody stems like rose. Trees have thick trunks like mango. Climbers need support like pea!',
    emoji: '🌳',
    spoken: 'Plants come in four types: herbs with soft stems, shrubs with woody branches, tall trees with thick trunks, and climbers that need support!',
    bgColor: 'from-lime-500 to-emerald-600',
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

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which plant part holds the plant firmly in the soil and absorbs water?',
    answer: 'Root',
    options: ['Root', 'Leaf', 'Flower'],
    hint: 'Think about what grows underground and acts like a drinking straw for water!',
    misconception: 'Roots do more than just hold the plant — they act like a drinking straw to absorb water and minerals from the soil!',
  },
  {
    type: 'identify',
    question: 'Which plant part makes food using sunlight, water, and carbon dioxide?',
    answer: 'Leaf',
    options: ['Stem', 'Leaf', 'Root'],
    hint: 'Think about the green part that acts like a tiny kitchen cooking food!',
    misconception: 'Leaves are the plant kitchens! They contain chlorophyll and make food through photosynthesis using sunlight!',
  },
  {
    type: 'sort',
    question: 'Drag each plant part to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Roots absorb water, stems carry food and water, leaves make food, flowers make seeds!',
    misconception: 'Remember every part has a job: roots drink, stems carry, leaves cook, flowers make fruits, and fruits protect seeds!',
    sortItems: [
      { id: 'root-part', label: 'Root', icon: 'root', correctBin: 'bin-root' },
      { id: 'stem-part', label: 'Stem', icon: 'stem', correctBin: 'bin-stem' },
      { id: 'leaf-part', label: 'Leaf', icon: 'leaf', correctBin: 'bin-leaf' },
      { id: 'flower-part', label: 'Flower', icon: 'flower', correctBin: 'bin-flower' },
    ],
    bins: [
      { id: 'bin-root', label: 'Absorbs water & anchors', color: '#8D6E63' },
      { id: 'bin-stem', label: 'Supports & transports', color: '#795548' },
      { id: 'bin-leaf', label: 'Makes food (photosynthesis)', color: '#4CAF50' },
      { id: 'bin-flower', label: 'Develops into fruit', color: '#E91E63' },
    ],
  },
  {
    type: 'identify',
    question: 'What are the THREE main parts found inside and outside a seed?',
    answer: 'Seed coat, cotyledon, embryo',
    options: ['Seed coat, cotyledon, embryo', 'Root, stem, leaf', 'Petals, pollen, nectar'],
    hint: 'Think of the protective cover, the food store, and the tiny baby plant inside!',
    misconception: 'A seed has a tough seed coat outside, a cotyledon storing food, and an embryo (baby plant) inside!',
  },
  {
    type: 'sort',
    question: 'Drag the seed germination steps in the correct order!',
    answer: 'sort',
    options: [],
    hint: 'First water is absorbed, then coat bursts, root grows down, shoot grows up!',
    misconception: 'The root always grows downward before the shoot appears upward! The seed must swell with water first.',
    sortItems: [
      { id: 'step-1', label: '1. Seed absorbs water', icon: 'seed', correctBin: 'bin-step1' },
      { id: 'step-2', label: '2. Seed coat bursts', icon: 'seed-coat', correctBin: 'bin-step2' },
      { id: 'step-3', label: '3. Root grows downward', icon: 'root', correctBin: 'bin-step3' },
      { id: 'step-4', label: '4. Shoot grows upward', icon: 'sprout', correctBin: 'bin-step4' },
    ],
    bins: [
      { id: 'bin-step1', label: 'Step 1: Swells up', color: '#03A9F4' },
      { id: 'bin-step2', label: 'Step 2: Breaks open', color: '#FF9800' },
      { id: 'bin-step3', label: 'Step 3: Radicle (root)', color: '#795548' },
      { id: 'bin-step4', label: 'Step 4: Plumule (shoot)', color: '#8BC34A' },
    ],
  },
  {
    type: 'identify',
    question: 'What THREE conditions are required for a seed to germinate?',
    answer: 'Water, air, and warmth',
    options: ['Water, air, and warmth', 'Only sunlight', 'Only dry soil'],
    hint: 'Seeds need moisture to drink, oxygen to breathe, and the right temperature to wake up!',
    misconception: 'Seeds do NOT need sunlight to germinate — they are under the soil! They need water, air (oxygen), and warmth!',
  },
  {
    type: 'sort',
    question: 'Drag each plant to its correct plant type!',
    answer: 'sort',
    options: [],
    hint: 'Mint is a herb, rose is a shrub, mango is a tree, pumpkin is a climber!',
    misconception: 'Check the stem and height: herbs have soft green stems, shrubs have woody stems near base, trees have thick trunks, climbers need support!',
    sortItems: [
      { id: 'mint', label: 'Mint (Herb)', icon: 'herb', correctBin: 'bin-herb' },
      { id: 'rose', label: 'Rose (Shrub)', icon: 'shrub', correctBin: 'bin-shrub' },
      { id: 'mango', label: 'Mango (Tree)', icon: 'tree', correctBin: 'bin-tree' },
      { id: 'pea', label: 'Pea (Climber)', icon: 'climber', correctBin: 'bin-climber' },
    ],
    bins: [
      { id: 'bin-herb', label: 'Herb (Soft stem)', color: '#8BC34A' },
      { id: 'bin-shrub', label: 'Shrub (Woody base)', color: '#8D6E63' },
      { id: 'bin-tree', label: 'Tree (Thick trunk)', color: '#5D4037' },
      { id: 'bin-climber', label: 'Climber (Weak stem)', color: '#00BCD4' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each feature to the correct plant type!',
    answer: 'sort',
    options: [],
    hint: 'Soft green stem = herb, woody branches near base = shrub, thick trunk = tree, weak stem needing support = climber!',
    misconception: 'Both height and stem type determine plant classification. A plant with a weak stem needing support is always a climber!',
    sortItems: [
      { id: 'feat-herb', label: 'Short, soft green stem', icon: 'herb', correctBin: 'bin-herb-feat' },
      { id: 'feat-shrub', label: 'Medium, woody near base', icon: 'shrub', correctBin: 'bin-shrub-feat' },
      { id: 'feat-tree', label: 'Tall with thick trunk', icon: 'tree', correctBin: 'bin-tree-feat' },
      { id: 'feat-climber', label: 'Weak stem needing support', icon: 'climber', correctBin: 'bin-climber-feat' },
    ],
    bins: [
      { id: 'bin-herb-feat', label: 'Herb Feature', color: '#8BC34A' },
      { id: 'bin-shrub-feat', label: 'Shrub Feature', color: '#8D6E63' },
      { id: 'bin-tree-feat', label: 'Tree Feature', color: '#5D4037' },
      { id: 'bin-climber-feat', label: 'Climber Feature', color: '#00BCD4' },
    ],
  },
];

// ─── Gardener Gopal Mascot ────────────────────────────────────

function GardenerGopal({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-300"
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
          {/* Straw hat */}
          <ellipse cx="37.5" cy="22" rx="28" ry="6" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M22 20 Q37.5 5 53 20 Z" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="27" y="16" width="21" height="5" fill="#EF4444" rx="2" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="13" fill="#FDBA74" stroke="#C2410C" strokeWidth="1" />
          {/* Friendly eyes */}
          <circle cx="33" cy="30" r="2" fill="#1F2937" />
          <circle cx="42" cy="30" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M34 37 Q37.5 41 41 37" stroke="#C2410C" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Green gardener apron / shirt */}
          <path d="M24 45 L51 45 L55 70 L20 70 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
          <rect x="32" y="50" width="11" height="12" fill="#FEF08A" rx="2" />
          {/* Arms */}
          <ellipse cx="16" cy="55" rx="4" ry="9" fill="#FDBA74" transform="rotate(-15 16 55)" />
          <ellipse cx="59" cy="55" rx="4" ry="9" fill="#FDBA74" transform="rotate(15 59 55)" />
          {/* Small watering can in hand */}
          <rect x="58" y="58" width="10" height="8" fill="#38BDF8" rx="1" />
          <path d="M58 60 L52 56" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──���───────────────────────────────────────

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

// ─── Botanical Garden Scene Background ────────────────────────

function GardenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* SVG Background Gradient & Garden Elements */}
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="soil-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="20%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />

        {/* Sun */}
        <circle cx="80" cy="70" r="35" fill="#FEF08A" opacity="0.9" />
        <circle cx="80" cy="70" r="25" fill="#FACC15" />

        {/* Distant hills */}
        <path d="M 0 350 Q 180 280 360 350 T 720 340 L 720 500 L 0 500 Z" fill="#22C55E" opacity="0.4" />
        <path d="M 0 370 Q 240 310 480 380 T 960 360 L 960 500 L 0 500 Z" fill="#16A34A" opacity="0.6" />

        {/* Ground soil strip */}
        <rect x="0" y={height - 80} width={width} height="80" fill="url(#soil-grad)" />

        {/* Decorative background tree */}
        <g transform="translate(60, 240)">
          <rect x="25" y="40" width="12" height="60" fill="#78350F" rx="3" />
          <circle cx="31" cy="30" r="30" fill="#15803D" />
          <circle cx="16" cy="20" r="20" fill="#22C55E" />
          <circle cx="46" cy="20" r="22" fill="#16A34A" />
        </g>
      </svg>
    </div>
  );
}

// ─── Custom SVG Plant Part & Type Icons ───────────────────────

function RootIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 L25 20" stroke="#795548" strokeWidth="4" strokeLinecap="round" />
      <path d="M25 20 Q15 28 8 38" stroke="#8D6E63" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M25 20 Q35 28 42 38" stroke="#8D6E63" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M25 25 Q20 35 15 45" stroke="#A1887F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M25 25 Q30 35 35 45" stroke="#A1887F" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="25" cy="12" r="4" fill="#4CAF50" />
    </svg>
  );
}

function StemIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="21" y="8" width="8" height="34" fill="#66BB6A" rx="4" stroke="#388E3C" strokeWidth="1.5" />
      <path d="M25 15 L10 22" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 30 L40 22" stroke="#4CAF50" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="8" cy="22" rx="6" ry="3" fill="#81C784" />
      <ellipse cx="42" cy="22" rx="6" ry="3" fill="#81C784" />
    </svg>
  );
}

function LeafIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M 10 40 Q 25 35, 40 10 Q 35 35, 10 40 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="2" />
      <path d="M 10 40 Q 25 25, 40 10" stroke="#15803D" strokeWidth="1.5" fill="none" />
      <path d="M 22 28 Q 30 25, 34 18" stroke="#15803D" strokeWidth="1" fill="none" />
      <path d="M 18 33 Q 24 30, 28 24" stroke="#15803D" strokeWidth="1" fill="none" />
    </svg>
  );
}

function FlowerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="25" cy="11" r="7" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
      <circle cx="25" cy="39" r="7" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
      <circle cx="11" cy="25" r="7" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
      <circle cx="39" cy="25" r="7" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
      <circle cx="15" cy="15" r="6" fill="#FB7185" />
      <circle cx="35" cy="15" r="6" fill="#FB7185" />
      <circle cx="15" cy="35" r="6" fill="#FB7185" />
      <circle cx="35" cy="35" r="6" fill="#FB7185" />
      <rect x="23" y="32" width="4" height="15" fill="#22C55E" rx="2" />
    </svg>
  );
}

function SeedIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <ellipse cx="25" cy="27" rx="14" ry="10" fill="#A16207" stroke="#713F12" strokeWidth="2" />
      <path d="M 15 25 Q 25 18, 35 25" stroke="#FEF08A" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SeedCoatIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M 11 25 C 11 12, 39 12, 39 25 C 39 38, 11 38, 11 25 Z" fill="none" stroke="#B45309" strokeWidth="3" strokeDasharray="4 2" />
      <ellipse cx="25" cy="25" rx="8" ry="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
    </svg>
  );
}

function SproutIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="23" y="25" width="4" height="18" fill="#16A34A" rx="2" />
      <path d="M 25 28 Q 12 22, 10 15 Q 20 18, 25 28 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1" />
      <path d="M 25 25 Q 38 19, 40 12 Q 30 15, 25 25 Z" fill="#4ADE80" stroke="#15803D" strokeWidth="1" />
      <ellipse cx="25" cy="43" rx="12" ry="4" fill="#92400E" />
    </svg>
  );
}

function HerbIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="23" y="20" width="4" height="22" fill="#4ADE80" rx="2" />
      <ellipse cx="17" cy="18" rx="8" ry="5" fill="#22C55E" transform="rotate(-30 17 18)" />
      <ellipse cx="33" cy="18" rx="8" ry="5" fill="#22C55E" transform="rotate(30 33 18)" />
      <ellipse cx="25" cy="12" rx="7" ry="4" fill="#16A34A" />
      <ellipse cx="25" cy="43" rx="10" ry="4" fill="#78350F" />
    </svg>
  );
}

function ShrubIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M 25 42 L 25 28" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
      <path d="M 25 32 L 15 22" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M 25 32 L 35 22" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="14" cy="20" r="10" fill="#16A34A" />
      <circle cx="36" cy="20" r="10" fill="#16A34A" />
      <circle cx="25" cy="13" r="12" fill="#22C55E" />
      <ellipse cx="25" cy="44" rx="12" ry="4" fill="#5D4037" />
    </svg>
  );
}

function TreeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="21" y="22" width="8" height="21" fill="#78350F" rx="2" />
      <circle cx="25" cy="18" r="16" fill="#15803D" />
      <circle cx="16" cy="15" r="11" fill="#22C55E" />
      <circle cx="34" cy="15" r="11" fill="#16A34A" />
      <ellipse cx="25" cy="44" rx="14" ry="4" fill="#5D4037" />
    </svg>
  );
}

function ClimberIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      {/* Support pole */}
      <rect x="23" y="6" width="4" height="40" fill="#A1887F" />
      {/* Twining stem */}
      <path d="M 25 42 Q 18 35, 25 28 T 25 14" stroke="#22C55E" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="14" cy="32" rx="6" ry="3" fill="#4ADE80" />
      <ellipse cx="36" cy="22" rx="6" ry="3" fill="#4ADE80" />
      <ellipse cx="14" cy="12" rx="6" ry="3" fill="#4ADE80" />
    </svg>
  );
}

// ─── Render Sort Icon Helper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'root': return <RootIcon size={size} />;
    case 'stem': return <StemIcon size={size} />;
    case 'leaf': return <LeafIcon size={size} />;
    case 'flower': return <FlowerIcon size={size} />;
    case 'seed': return <SeedIcon size={size} />;
    case 'seed-coat': return <SeedCoatIcon size={size} />;
    case 'sprout': return <SproutIcon size={size} />;
    case 'herb': return <HerbIcon size={size} />;
    case 'shrub': return <ShrubIcon size={size} />;
    case 'tree': return <TreeIcon size={size} />;
    case 'climber': return <ClimberIcon size={size} />;
    default: return <LeafIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
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
  isHovering?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl flex flex-col items-center justify-center p-2 text-center border-3 transition-all shadow-md ${isHovering ? 'scale-105 ring-4 ring-emerald-400' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
        borderWidth: 3,
      }}
    >
      <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center text-white font-bold text-sm shadow-inner" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-bold text-gray-800 leading-tight">{label}</span>
    </div>
  );
}

// ─── Main PlantsGame Component ────────────────────────────────

export interface PlantsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PlantsGame({ width = 720, height = 560, onComplete }: PlantsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Mascot state
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Multiple choice state
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  // Inactivity hint timer
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Speak teaching slide on index change
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setSpeakingText(slide.text);
    }
  }, [screen, slideIdx]);

  // Speak challenge question on challenge change
  useEffect(() => {
    if (screen === 'play') {
      const challenge = CHALLENGES[challengeIdx];
      speechManager.speak(challenge.question);
      setSpeakingText(challenge.question);
      setMascotMood('happy');
      setSelectedOption(null);
      setIsIncorrect(false);
      setPlacedItems({});
    }
  }, [screen, challengeIdx]);

  // Inactivity timer for hint
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setHintMsg(CHALLENGES[challengeIdx].hint);
        setMascotMood('thinking');
        speechManager.speak(CHALLENGES[challengeIdx].hint);
      }
    }, 10000);
  }, [challengeIdx]);

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

  // Handle multiple choice answer selection
  const handleOptionSelect = (option: string) => {
    resetInactivityTimer();
    const challenge = CHALLENGES[challengeIdx];
    setSelectedOption(option);

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      const praise = 'Wonderful job! That is correct!';
      setSuccessMsg(praise);
      setShowSuccessBanner(true);
      speechManager.speak(praise);
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(prev => prev + 1);
    } else {
      // Incorrect!
      audioManager.play('error');
      setIsIncorrect(true);
      setMascotMood('thinking');
      setErrors(prev => prev + 1);
      setHintMsg(challenge.misconception);
      speechManager.speak(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const challenge = CHALLENGES[challengeIdx];
    if (!challenge.sortItems || !challenge.bins) return false;

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Determine which bin (if any) the item was dropped into based on bounding boxes
    // Bins layout: 2x2 grid or horizontal row near bottom
    // Let's define standard bin coordinates matching the render layout
    const binWidth = 140;
    const binHeight = 70;
    const binCoords: Record<string, { x: number; y: number }> = {
      [challenge.bins[0].id]: { x: 80, y: 380 },
      [challenge.bins[1].id]: { x: 235, y: 380 },
      [challenge.bins[2].id]: { x: 390, y: 380 },
      [challenge.bins[3].id]: { x: 545, y: 380 },
    };

    let targetBinId: string | null = null;
    for (const bin of challenge.bins) {
      const coord = binCoords[bin.id];
      if (coord && x >= coord.x - 30 && x <= coord.x + binWidth && y >= coord.y - 30 && y <= coord.y + binHeight) {
        targetBinId = bin.id;
        break;
      }
    }

    setHoveredBin(null);

    if (targetBinId && targetBinId === item.correctBin) {
      // Correct drop!
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = challenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        const praise = 'Fantastic! All sorted correctly!';
        setSuccessMsg(praise);
        setShowSuccessBanner(true);
        speechManager.speak(praise);
        setStars(prev => prev + 1);
      }
      return true;
    } else {
      // Wrong drop
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setHintMsg(challenge.misconception);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  // Advance to next challenge or complete game
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const completeText = `Amazing! You are a certified Plant Master with ${finalScore} points!`;
      setSuccessMsg(completeText);
      setShowSuccessBanner(true);
      speechManager.speak(completeText);
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl select-none font-sans bg-gold-100 flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Botanical Garden Scene Background */}
      <GardenScene width={width} height={height} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm border-b border-emerald-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-white shadow-md text-xl">
            🌱
          </div>
          <div>
            <h1 className="text-base font-black text-gray-800 tracking-tight">Plant Power!</h1>
            <p className="text-xs font-semibold text-emerald-600">ICSE Class 3 Botany</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-xs font-bold text-gray-500">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
          </div>
        )}
      </div>

      {/* Gardener Gopal Mascot */}
      <GardenerGopal mood={mascotMood} speaking={speakingText} />

      {/* ─── SCREEN 1: TEACHING SLIDES ─────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-6 max-w-2xl mx-auto text-center">
          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full rounded-3xl p-8 shadow-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center border-4 border-white/40`}
          >
            <div className="text-6xl mb-4 filter drop-shadow-md">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 tracking-wide drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow max-w-lg">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          {/* Slide Navigation Dots & Button */}
          <div className="flex items-center justify-between w-full mt-6 px-4">
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { audioManager.play('tap'); setSlideIdx(i); }}
                  className={`w-3 h-3 rounded-full transition-all ${slideIdx === i ? 'bg-emerald-600 w-8' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-6 py-3 rounded-2xl bg-emerald-600 text-white font-black shadow-lg hover:bg-emerald-700 transition-all flex items-center gap-2 text-sm"
            >
              {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next Lesson ➡️' : 'Start Playing! 🚀'}
            </motion.button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY (CHALLENGES) ────────────────────── */}
      {screen === 'play' && (
        <div className="relative z-10 flex-1 w-full max-w-3xl mx-auto flex flex-col items-center justify-center p-4">
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl border-2 border-emerald-200 flex flex-col items-center"
          >
            {/* Question Header */}
            <h2 className="text-lg font-black text-gray-800 text-center mb-6 max-w-xl">
              {CHALLENGES[challengeIdx].question}
            </h2>

            {/* Multiple Choice Challenge */}
            {CHALLENGES[challengeIdx].type === 'identify' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl mb-4">
                {CHALLENGES[challengeIdx].options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = option === CHALLENGES[challengeIdx].answer;
                  let btnStyle = 'bg-emerald-50 border-emerald-300 text-gray-800 hover:bg-emerald-100';

                  if (selectedOption) {
                    if (isCorrectAnswer) btnStyle = 'bg-green-500 border-green-600 text-white shadow-lg scale-105';
                    else if (isSelected) btnStyle = 'bg-red-500 border-red-600 text-white';
                    else btnStyle = 'bg-gray-100 border-gray-200 text-gray-400 opacity-60';
                  }

                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: selectedOption ? 1 : 1.03 }}
                      whileTap={{ scale: selectedOption ? 1 : 0.97 }}
                      disabled={selectedOption !== null}
                      onClick={() => handleOptionSelect(option)}
                      className={`p-4 rounded-2xl border-2 font-bold text-sm shadow-md transition-all flex flex-col items-center justify-center text-center h-24 ${btnStyle}`}
                    >
                      <span>{option}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Challenge (Drag & Drop) */}
            {CHALLENGES[challengeIdx].type === 'sort' && CHALLENGES[challengeIdx].sortItems && CHALLENGES[challengeIdx].bins && (
              <div className="relative w-full h-[280px] bg-emerald-50/50 rounded-2xl border-2 border-dashed border-emerald-300 mb-4 overflow-hidden">
                {/* Bins at bottom */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-around px-4">
                  {CHALLENGES[challengeIdx].bins!.map((bin, i) => {
                    const binWidth = 140;
                    const binHeight = 70;
                    const leftPos = 15 + i * 145;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={leftPos}
                        y={180}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoveredBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable items at top */}
                <div className="absolute top-4 left-0 right-0 flex justify-around px-6">
                  {CHALLENGES[challengeIdx].sortItems!.map((item, i) => {
                    const isPlaced = !!placedItems[item.id];
                    const startX = 20 + i * 145;
                    const startY = 20;

                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={startX}
                        y={startY}
                        placed={isPlaced}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              </div>
            )}

            {/* Continue Button after correct answer in Multiple Choice */}
            {selectedOption === CHALLENGES[challengeIdx].answer && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextChallenge}
                className="mt-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all text-sm flex items-center gap-2"
              >
                Continue 🚀
              </motion.button>
            )}

            {/* Continue Button after sort challenge completion */}
            {CHALLENGES[challengeIdx].type === 'sort' && CHALLENGES[challengeIdx].sortItems?.every(i => placedItems[i.id]) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNextChallenge}
                className="mt-2 px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black shadow-lg hover:from-emerald-600 hover:to-green-700 transition-all text-sm flex items-center gap-2"
              >
                Continue 🚀
              </motion.button>
            )}
          </motion.div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ────────────────────────────── */}
      {showConfetti && (
        <Confetti onComplete={() => setShowConfetti(false)} />
      )}

      {showSuccessBanner && (
        <SuccessBanner
          message={successMsg}
          onComplete={() => {
            setShowSuccessBanner(false);
            if (challengeIdx >= CHALLENGES.length - 1 && onComplete) {
              // Game already completed
            } else if (selectedOption === CHALLENGES[challengeIdx]?.answer || (CHALLENGES[challengeIdx].sortItems?.every(i => placedItems[i.id]))) {
              handleNextChallenge();
            }
          }}
        />
      )}

      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
    </div>
  );
}
