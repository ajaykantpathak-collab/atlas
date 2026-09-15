'use client';

/**
 * EcosystemWasteGame — Learn about producers, consumers, food chains, decomposers, scavengers, and waste management
 *
 * CISCE Nodes: c5_bio_015 (Producers and consumers), c5_bio_016 (Food chains),
 *              c5_bio_017 (Decomposers and scavengers), c5_bio_018 (Degradable and non-degradable waste)
 * Enrichment: c5_biology_enrichment_part15-18
 *
 * ELI5: "Green plants make their own food using sunlight, making them producers! Animals cannot make food, so they are consumers. A food chain shows who eats whom, always starting with a plant. Scavengers and decomposers clean up dead matter, and earthworms and fungi turn it into rich soil food. Degradable waste rots naturally, but plastic and glass stay forever and need to be reduced and recycled!"
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Producers and Consumers 🌱",
    text: "Producers are green plants that make their own food using sunlight, water, and carbon dioxide through photosynthesis! Consumers (like cows, lions, and humans) cannot make food and must depend on plants or other animals.",
    emoji: "🌱",
    bgColor: "from-emerald-400 to-green-600",
    spoken: "Producers are green plants that make their own food using sunlight and chlorophyll! Consumers like cows and lions cannot make food and depend on others."
  },
  {
    title: "Food Chains: Who Eats Whom 🦌",
    text: "A food chain is a straight-line picture showing the flow of energy. It always starts with a producer (like grass), moves to a primary consumer herbivore (like a deer), and then a secondary consumer carnivore (like a tiger). Arrows point from food to eater!",
    emoji: "🌾",
    bgColor: "from-green-400 to-teal-600",
    spoken: "A food chain shows who eats whom. It always starts with a producer, moves to a herbivore, and then a carnivore. Arrows point from the food to the eater!"
  },
  {
    title: "Scavengers and Decomposers 🍄",
    text: "Scavengers (like vultures and crows) feed on dead animals to keep nature clean. Decomposers (like fungi, bacteria, and earthworms) break down dead plants and animals into simple soil nutrients so new plants can grow!",
    emoji: "🍄",
    bgColor: "from-amber-400 to-orange-600",
    spoken: "Scavengers like vultures eat dead animals to keep nature clean. Decomposers like fungi and bacteria break down dead matter and return nutrients to the soil."
  },
  {
    title: "Degradable Waste 🍌",
    text: "Degradable waste is garbage that can be broken down naturally by decomposers. Examples include fruit peels, vegetable scraps, dry leaves, and paper. They rot and turn into rich compost for gardens!",
    emoji: "🍌",
    bgColor: "from-lime-400 to-emerald-600",
    spoken: "Degradable waste is garbage that can be broken down naturally by decomposers, like fruit peels and dry leaves, turning into rich compost."
  },
  {
    title: "Non-Degradable Waste ♻️",
    text: "Non-degradable waste cannot be broken down by decomposers and stays in the environment for hundreds of years. Examples include plastic bags, glass bottles, and metal cans. We must reduce, reuse, and recycle them!",
    emoji: "♻️",
    bgColor: "from-cyan-400 to-blue-600",
    spoken: "Non-degradable waste like plastic and glass cannot be broken down by decomposers. We must reduce, reuse, and recycle them to protect Earth."
  },
];

// ─── Custom SVG Ecosystem Icons ────────────────────────────────

function GrassIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 50 Q15 30, 10 12 Q18 28, 22 50 Z" fill="#22C55E" />
      <path d="M30 50 Q25 25, 20 8 Q28 25, 33 50 Z" fill="#4ADE80" />
      <path d="M40 50 Q42 28, 48 10 Q42 30, 38 50 Z" fill="#16A34A" />
      <rect x="15" y="48" width="30" height="6" fill="#854D0E" rx="2" />
    </svg>
  );
}

function TreeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="32" width="8" height="20" fill="#9A3412" />
      <circle cx="30" cy="22" r="16" fill="#16A34A" />
      <circle cx="23" cy="20" r="10" fill="#22C55E" />
      <circle cx="37" cy="20" r="10" fill="#22C55E" />
    </svg>
  );
}

function DeerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="34" rx="14" ry="10" fill="#D97706" />
      <circle cx="44" cy="22" r="7" fill="#D97706" />
      <path d="M48 18 L53 10 M46 18 L43 10" stroke="#92400E" strokeWidth="2" strokeLinecap="round" />
      <rect x="22" y="42" width="3" height="14" fill="#B45309" rx="1" />
      <rect x="27" y="42" width="3" height="14" fill="#B45309" rx="1" />
      <rect x="38" y="42" width="3" height="14" fill="#B45309" rx="1" />
      <rect x="43" y="42" width="3" height="14" fill="#B45309" rx="1" />
    </svg>
  );
}

function TigerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="34" rx="16" ry="10" fill="#F97316" />
      <path d="M22 28 L20 34 M26 28 L25 34 M30 28 L30 34" stroke="#1E293B" strokeWidth="2" />
      <circle cx="44" cy="26" r="8" fill="#F97316" />
      <circle cx="47" cy="23" r="2" fill="#1E293B" />
      <rect x="20" y="42" width="4" height="14" fill="#C2410C" rx="1" />
      <rect x="26" y="42" width="4" height="14" fill="#C2410C" rx="1" />
      <rect x="36" y="42" width="4" height="14" fill="#C2410C" rx="1" />
      <rect x="42" y="42" width="4" height="14" fill="#C2410C" rx="1" />
    </svg>
  );
}

function MushroomIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M14 26 C14 14, 46 14, 46 26 C46 29, 14 29, 14 26 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="24" cy="20" r="3" fill="white" />
      <circle cx="36" cy="22" r="2.5" fill="white" />
      <rect x="25" y="28" width="10" height="22" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" rx="2" />
    </svg>
  );
}

function VultureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="12" ry="8" fill="#475569" />
      <circle cx="40" cy="24" r="6" fill="#DC2626" />
      <path d="M45 23 L52 25 L45 27 Z" fill="#94A3B8" />
      <path d="M18 30 C10 20, 4 25, 2 35 C10 38, 15 36, 18 30 Z" fill="#334155" />
      <path d="M42 30 C50 20, 56 25, 58 35 C50 38, 45 36, 42 30 Z" fill="#334155" />
    </svg>
  );
}

function CompostBinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="16" width="30" height="34" fill="#16A34A" stroke="#14532D" strokeWidth="2" rx="4" />
      <rect x="12" y="10" width="36" height="6" fill="#15803D" rx="2" />
      <path d="M20 26 L40 26 M20 34 L40 34 M20 42 L40 42" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
      <text x="30" y="22" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">COMPOST</text>
    </svg>
  );
}

function RecycleBinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="16" width="30" height="34" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" rx="4" />
      <rect x="12" y="10" width="36" height="6" fill="#2563EB" rx="2" />
      <path d="M24 30 L30 22 L36 30 M30 22 L30 42" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M24 38 L30 46 L36 38" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function PlasticBottleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="10" width="10" height="6" fill="#64748B" rx="1" />
      <path d="M25 16 C25 14, 35 14, 35 16 L38 24 L22 24 Z" fill="#38BDF8" opacity="0.8" />
      <rect x="20" y="24" width="20" height="28" fill="#38BDF8" opacity="0.7" rx="3" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="24" y="30" width="12" height="14" fill="white" opacity="0.5" rx="2" />
    </svg>
  );
}

function BananaPeelIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 38 Q22 25, 15 15 Q22 22, 28 34 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 38 Q40 25, 48 16 Q40 23, 33 34 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M30 40 Q30 28, 30 18 Q33 25, 32 38 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="31" cy="42" rx="4" ry="3" fill="#854D0E" />
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

function FoodChainDiagramIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="12" cy="30" r="8" fill="#22C55E" />
      <path d="M22 30 L32 30 M28 26 L32 30 L28 34" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="42" cy="30" r="8" fill="#F97316" />
      <text x="12" y="34" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">PL</text>
      <text x="42" y="34" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">AN</text>
    </svg>
  );
}

// Map icon string to SVG component
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'grass': return <GrassIcon size={size} />;
    case 'tree': return <TreeIcon size={size} />;
    case 'deer': return <DeerIcon size={size} />;
    case 'tiger': return <TigerIcon size={size} />;
    case 'mushroom': return <MushroomIcon size={size} />;
    case 'vulture': return <VultureIcon size={size} />;
    case 'plastic-bottle': return <PlasticBottleIcon size={size} />;
    case 'banana-peel': return <BananaPeelIcon size={size} />;
    case 'sun': return <SunIcon size={size} />;
    case 'food-chain': return <FoodChainDiagramIcon size={size} />;
    case 'compost-bin': return <CompostBinIcon size={size} />;
    case 'recycle-bin': return <RecycleBinIcon size={size} />;
    default: return <GrassIcon size={size} />;
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
    question: 'Which of these is a PRODUCER in a food chain?',
    answer: 'Grass / Green plant',
    options: ['Grass / Green plant', 'Deer', 'Tiger', 'Vulture'],
    hint: 'Producers can make their own food using sunlight, water, and carbon dioxide!',
    misconception: 'Producers are green plants like grass or trees because they make their own food through photosynthesis. Animals like deer and tigers are consumers because they cannot make their own food!',
  },
  {
    type: 'sort',
    question: 'Drag each organism to its correct ecosystem role!',
    answer: 'sort',
    options: [],
    hint: 'Grass and trees make food (Producers). Deer eat plants (Herbivores). Tigers eat animals (Carnivores). Mushrooms rot dead matter (Decomposers). Vultures eat dead animals (Scavengers)!',
    misconception: 'Remember: plants make food (Producers), animals that eat plants are herbivores, animals that eat meat are carnivores, fungi rot dead matter (Decomposers), and vultures eat dead animal flesh (Scavengers)!',
    sortItems: [
      { id: 's-grass', label: 'Grass', icon: 'grass', correctBin: 'producer' },
      { id: 's-tree', label: 'Mango Tree', icon: 'tree', correctBin: 'producer' },
      { id: 's-deer', label: 'Deer', icon: 'deer', correctBin: 'herbivore' },
      { id: 's-tiger', label: 'Tiger', icon: 'tiger', correctBin: 'carnivore' },
      { id: 's-mush', label: 'Mushroom', icon: 'mushroom', correctBin: 'decomposer' },
      { id: 's-vult', label: 'Vulture', icon: 'vulture', correctBin: 'scavenger' },
    ],
    bins: [
      { id: 'producer', label: 'Producer 🌱', color: '#16A34A' },
      { id: 'herbivore', label: 'Herbivore 🦌', color: '#D97706' },
      { id: 'carnivore', label: 'Carnivore 🐅', color: '#F97316' },
      { id: 'decomposer', label: 'Decomposer 🍄', color: '#8B5CF6' },
      { id: 'scavenger', label: 'Scavenger 🦅', color: '#475569' },
    ],
  },
  {
    type: 'identify',
    question: 'What is the correct order of a simple food chain?',
    answer: 'Grass -> Deer -> Tiger',
    options: [
      'Grass -> Deer -> Tiger',
      'Tiger -> Deer -> Grass',
      'Deer -> Grass -> Tiger',
      'Grass -> Tiger -> Deer'
    ],
    hint: 'A food chain always starts with a plant producer, then a herbivore consumer, then a carnivore consumer!',
    misconception: 'A food chain always starts with a plant producer (Grass) that makes food from sunlight, followed by a plant-eating herbivore (Deer), and then a meat-eating carnivore (Tiger). Arrows show energy flowing from food to eater!',
  },
  {
    type: 'sort',
    question: 'Drag each food chain to its correct environment!',
    answer: 'sort',
    options: [],
    hint: 'Match the living organisms to where they naturally live (Forest, Grassland, Pond, Farm)!',
    misconception: 'Make sure the organisms belong to the correct habitat! For example, tigers live in forests, frogs live in grasslands/ponds, and fish live in water.',
    sortItems: [
      { id: 'fc-forest', label: 'Grass -> Deer -> Tiger', icon: 'food-chain', correctBin: 'forest' },
      { id: 'fc-pond', label: 'Algae -> Small Fish -> Heron', icon: 'food-chain', correctBin: 'pond' },
      { id: 'fc-farm', label: 'Plant -> Goat -> Human', icon: 'food-chain', correctBin: 'farm' },
    ],
    bins: [
      { id: 'forest', label: 'Forest 🌲', color: '#15803D' },
      { id: 'pond', label: 'Pond 💧', color: '#0284C7' },
      { id: 'farm', label: 'Farm 🌾', color: '#CA8A04' },
    ],
  },
  {
    type: 'identify',
    question: 'What is the main function of DECOMPOSERS (like fungi and bacteria)?',
    answer: 'Break down dead matter and return nutrients to the soil',
    options: [
      'Break down dead matter and return nutrients to the soil',
      'Hunt live animals for food in the forest',
      'Make food inside leaves using sunlight',
      'Keep the air clean by flying high'
    ],
    hint: 'They rot fallen leaves and dead animals so the soil gets rich food for new plants!',
    misconception: 'Decomposers do not hunt or fly! Their special job is breaking down dead plants and animals into simple substances, returning vital nutrients to the soil so new plants can grow.',
  },
  {
    type: 'sort',
    question: 'Drag each organism to Decomposer or Scavenger!',
    answer: 'sort',
    options: [],
    hint: 'Scavengers eat dead animals (vulture, crow). Decomposers rot dead matter into soil nutrients (mushroom, bacteria, earthworm)!',
    misconception: 'Do not confuse scavengers and decomposers! Vultures and crows are scavengers that eat dead animal flesh. Mushrooms, bacteria, and earthworms are decomposers that rot matter into soil nutrients.',
    sortItems: [
      { id: 'm-mush', label: 'Mushroom', icon: 'mushroom', correctBin: 'dec' },
      { id: 'm-vult', label: 'Vulture', icon: 'vulture', correctBin: 'scav' },
      { id: 'm-earth', label: 'Earthworm', icon: 'grass', correctBin: 'dec' },
      { id: 'm-crow', label: 'Crow', icon: 'vulture', correctBin: 'scav' },
    ],
    bins: [
      { id: 'dec', label: 'Decomposer 🍄', color: '#8B5CF6' },
      { id: 'scav', label: 'Scavenger 🦅', color: '#475569' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is NON-DEGRADABLE waste?',
    answer: 'Plastic bottle',
    options: ['Plastic bottle', 'Banana peel', 'Dry leaves', 'Used paper'],
    hint: 'It does not rot or disappear in soil even after hundreds of years!',
    misconception: 'Plastic bottles are non-degradable because decomposers cannot break them down. Banana peels, dry leaves, and paper are degradable and rot naturally in soil!',
  },
  {
    type: 'sort',
    question: 'Drag each waste item to Degradable or Non-Degradable!',
    answer: 'sort',
    options: [],
    hint: 'Can nature helpers (decomposers) eat and rot it? If yes, degradable. If it stays for centuries, non-degradable!',
    misconception: 'Remember: fruit peels, vegetable scraps, paper, and cotton are degradable because decomposers rot them. Plastic bottles, glass, and metal cans are non-degradable and stay forever!',
    sortItems: [
      { id: 'w-banana', label: 'Banana Peel', icon: 'banana-peel', correctBin: 'deg' },
      { id: 'w-plastic', label: 'Plastic Bottle', icon: 'plastic-bottle', correctBin: 'nondeg' },
      { id: 'w-paper', label: 'Used Notebook Paper', icon: 'banana-peel', correctBin: 'deg' },
      { id: 'w-glass', label: 'Glass Bangle', icon: 'plastic-bottle', correctBin: 'nondeg' },
    ],
    bins: [
      { id: 'deg', label: 'Degradable 🍌', color: '#16A34A' },
      { id: 'nondeg', label: 'Non-Degradable ♻️', color: '#2563EB' },
    ],
  },
];

// ─── Ranger Rohan Mascot ──────────────────────────────────────

function RangerRohan({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="rohan-uniform" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#15803D" />
              <stop offset="100%" stopColor="#166534" />
            </linearGradient>
            <linearGradient id="rohan-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          {/* Ranger Hat */}
          <ellipse cx="37.5" cy="14" rx="22" ry="5" fill="#B45309" stroke="#78350F" strokeWidth="1" />
          <path d="M26 12 C26 4, 49 4, 49 12 Z" fill="#D97706" stroke="#B45309" strokeWidth="1" />
          {/* Head */}
          <circle cx="37.5" cy="28" r="15" fill="url(#rohan-face)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="32" cy="27" r="2" fill="#1E293B" />
          <circle cx="43" cy="27" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 34 Q37.5 38 42 34" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Uniform body */}
          <path d="M22 44 L37.5 48 L53 44 L55 75 L20 75 Z" fill="url(#rohan-uniform)" stroke="#14532D" strokeWidth="1.5" />
          {/* Binoculars strap */}
          <path d="M25 46 L37.5 56 L50 46" stroke="#78350F" strokeWidth="2" fill="none" />
          {/* Binoculars */}
          <rect x="30" y="54" width="6" height="8" fill="#334155" rx="1" />
          <rect x="39" y="54" width="6" height="8" fill="#334155" rx="1" />
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

// ─── Ecosystem Scene Background ───────────────────────────────

function EcosystemScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="forest-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="river-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0EA5E9" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#forest-sky)" />
        {/* Ground */}
        <rect x="0" y={height - 110} width={width} height="110" fill="#15803D" />
        <rect x="0" y={height - 110} width={width} height="14" fill="#22C55E" />

        {/* River curve */}
        <path d={`M ${width * 0.6} ${height - 110} Q ${width * 0.7} ${height - 60}, ${width * 0.8} ${height}`} fill="url(#river-grad)" />

        {/* Distant mountains */}
        <path d={`M 0 ${height - 110} L 120 ${height - 210} L 240 ${height - 110} L 450 ${height - 240} L 720 ${height - 110} Z`} fill="#166534" opacity="0.6" />
      </svg>
    </div>
  );
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
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 bg-white cursor-grab active:cursor-grabbing" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface EcosystemWasteGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EcosystemWasteGame({ width = 720, height = 560, onComplete }: EcosystemWasteGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 115, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

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
      const compMsg = "Wonderful! You are an ecosystems expert!";
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

    // Check bin bounding boxes
    const binWidth = width / currentChallenge.bins.length;
    let droppedBinId = '';
    currentChallenge.bins.forEach((bin, idx) => {
      const binLeft = idx * binWidth;
      const binRight = (idx + 1) * binWidth;
      if (x >= binLeft && x <= binRight && y < height - 160) {
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
    <div className="relative overflow-hidden select-none font-sans" style={{ width, height, backgroundColor: '#0f172a' }}>
      <EcosystemScene width={width} height={height} />
      <RangerRohan mood={mascotMood} speaking={speakingText} />

      {/* Top HUD */}
      <div className="absolute top-3 left-3 right-24 z-20 flex items-center justify-between bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-emerald-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌳</span>
          <span className="font-black text-emerald-800 text-sm">Ecosystems & Waste</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-emerald-100 px-3 py-1 rounded-full">
            <span className="text-xs font-bold text-emerald-800">Score: {score}</span>
          </div>
          {screen === 'play' && (
            <StarRow count={Math.floor(score / 20)} total={5} />
          )}
        </div>
      </div>

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 pt-20">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className={`w-full max-w-xl rounded-3xl p-6 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/40 flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed mb-6 bg-black/20 p-4 rounded-2xl backdrop-blur-sm">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-5 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-sm disabled:opacity-30 transition-all"
              >
                Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`}
                  />
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
                className="px-6 py-2.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-black text-sm shadow-lg transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col p-6 pt-20">
          {/* Challenge Header */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-emerald-200 mb-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <button
                onClick={handleShowHint}
                className="flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-100 hover:bg-amber-200 px-3 py-1 rounded-full transition-all"
              >
                💡 Need a Hint?
              </button>
            </div>
            <h3 className="text-base font-black text-gray-800">{currentChallenge.question}</h3>
          </div>

          {/* Identify Challenge */}
          {currentChallenge.type === 'identify' && (
            <div className="flex-1 flex flex-col justify-center items-center gap-3 max-w-lg mx-auto w-full pb-16">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-emerald-50 text-gray-800 border-emerald-200';
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = 'bg-emerald-500 text-white border-emerald-600';
                  else if (isSelected) btnStyle = 'bg-red-500 text-white border-red-600 animate-shake';
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`w-full p-4 rounded-2xl font-bold text-sm shadow-md border-2 transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span className="text-lg">✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span className="text-lg">❌</span>}
                  </motion.button>
                );
              })}

              {successMsg && (
                <div className="w-full mt-2">
                  <SuccessBanner message={successMsg} onComplete={advanceChallenge} />
                </div>
              )}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="flex-1 flex flex-col justify-between pb-16 relative">
              {/* Bins area */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl mx-auto pt-2">
                {currentChallenge.bins.map((bin) => {
                  const binItems = currentChallenge.sortItems?.filter(i => i.correctBin === bin.id) || [];
                  const allBinPlaced = binItems.every(i => placedItems[i.id]);
                  return (
                    <div
                      key={bin.id}
                      style={{ backgroundColor: bin.color }}
                      className={`rounded-2xl p-4 shadow-lg border-2 border-white/40 text-white flex flex-col items-center justify-center transition-all min-h-[90px] ${allBinPlaced ? 'opacity-80 scale-95' : ''}`}
                    >
                      <span className="font-black text-xs text-center">{bin.label}</span>
                      <div className="flex gap-1 mt-2 flex-wrap justify-center">
                        {binItems.map(item => placedItems[item.id] && (
                          <span key={item.id} className="text-xs bg-white/30 px-2 py-0.5 rounded-full font-bold">✓ {item.label}</span>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Draggable items area */}
              <div className="absolute inset-x-0 bottom-4 flex flex-wrap justify-center gap-3 px-4">
                {currentChallenge.sortItems.map((item) => {
                  const pos = itemPositions[item.id] || { x: 0, y: 0 };
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

              {successMsg && (
                <div className="absolute inset-x-4 bottom-20 z-30">
                  <SuccessBanner message={successMsg} onComplete={advanceChallenge} />
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* Feedback elements */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
