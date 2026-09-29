'use client';

/**
 * MyEnvironmentGame — Learn about the environment: family, home, school, local animals,
 * plants, physical features of the locality, and food sources.
 *
 * CISCE Nodes: c2_evs_001 (My environment), c2_evs_002 (Local animals and birds),
 *              c2_evs_003 (Local plants and trees), c2_evs_004 (Physical features of locality),
 *              c2_evs_005 (Food - where it comes from)
 * Enrichment: c2_evs_enrichment_part1-5
 *
 * ELI5: "Your environment is everything around you — your family, home, school, trees,
 *   animals, land, water, and the food on your plate! Explore your surroundings with Explorer Esha!"
 *
 * Misconceptions:
 *   1. "Penguins live in our locality" → "No! Penguins live in Antarctica! In our locality
 *      we see sparrows, crows, pigeons, dogs, cats, and cows!"
 *   2. "Food comes from the shop" → "No! The shop is where we buy food, but food comes
 *      from plants (like rice and wheat) and animals (like milk and eggs) first!"
 *   3. "All trees give edible fruits" → "No! Neem gives medicine, banyan gives shade,
 *      and not all trees give fruits we can eat!"
 *   4. "Mountains are just big rocks" → "No! Mountains are land features with soil,
 *      plants, trees, animals, and flowing streams!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG neighbourhood scene background (sky, mountains, houses, trees, pond)
 * - Custom SVG mascot (Explorer Esha) with sun hat, backpack, and binoculars
 * - Custom SVG objects for all interactive items (animals, plants, land forms, food)
 * - Drag-and-drop sorting via Draggable primitive
 * - 8 progressive challenges: identify family/birds → sort animals → identify plants → sort plants/land/food
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity (10s timer)
 * - Progressive difficulty ladder
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
    title: 'Welcome to My Environment! 🏡',
    text: 'Your environment is everything around you! It includes your loving family at home, your classrooms and friends at school, tall trees, birds, animals, land, and water!',
    emoji: '🏡',
    bgColor: 'from-emerald-400 to-teal-500',
  },
  {
    title: 'Local Animals & Birds 🐦',
    text: 'Look up to see flying birds like sparrows and crows! Look around for domestic animals like cows and dogs. Each animal has a home and a role in nature!',
    emoji: '🦜',
    bgColor: 'from-gold-400 to-gold-500',
  },
  {
    title: 'Plants & Trees 🌳',
    text: 'Trees like mango give us delicious fruits in summer! Neem trees give us medicine, banyan trees give cool shade, and plants change with the seasons — fresh leaves in spring!',
    emoji: '🥭',
    bgColor: 'from-green-400 to-emerald-600',
  },
  {
    title: 'Land & Water Features 🏔️',
    text: 'Our locality has land forms like flat plains, green hills, and tall mountains! We also see water bodies like rivers, ponds, and lakes where water flows or collects.',
    emoji: '🌊',
    bgColor: 'from-gold-400 to-gold-600',
  },
  {
    title: 'Where Does Food Come From? 🌾',
    text: 'Every bite of food gives us energy to grow and play! Food comes from two main sources: plants (grains, fruits, vegetables) and animals (milk, eggs, honey)!',
    emoji: '🍲',
    bgColor: 'from-amber-400 to-orange-500',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_family' | 'identify_bird' | 'sort_animals' | 'identify_plant' | 'sort_plants' | 'identify_river' | 'sort_land_water' | 'sort_food';

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

// ─── Challenges (8 progressive) ───────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_family',
    question: 'Who are the members of your immediate FAMILY?',
    answer: 'Mother, father, brother, sister',
    options: ['Mother, father, brother, sister', 'Trees, animals, and birds', 'Sun, moon, and stars'],
    hint: 'Think about who lives in your home with you and cares for you every day!',
    misconception: 'Your family consists of the people living with you in your home — like mother, father, brother, and sister! Trees and stars are part of nature, not family members!',
  },
  {
    type: 'identify_bird',
    question: 'Which bird is commonly seen flying in our local trees and rooftops?',
    answer: 'Sparrow',
    options: ['Sparrow', 'Penguin', 'Ostrich'],
    hint: 'Look outside your classroom window! Which small bird hops on branches and chirps?',
    misconception: 'Sparrows are common local birds seen on trees and rooftops! Penguins live in freezing Antarctica, and ostriches run fast on desert ground — they are not common local birds here!',
  },
  {
    type: 'sort_animals',
    question: 'Drag each animal or bird to where it is commonly seen!',
    answer: 'sort',
    options: [],
    hint: 'Sparrows fly in the sky/trees, dogs walk on the ground, fish swim in water!',
    misconception: 'Observe where animals live! Sparrows and crows fly in the air and trees. Cows and dogs walk on the ground. Fish and ducks live in water!',
    sortItems: [
      { id: 'sparrow', label: 'Sparrow', icon: 'sparrow', correctBin: 'sky' },
      { id: 'crow', label: 'Crow', icon: 'crow', correctBin: 'sky' },
      { id: 'cow', label: 'Cow', icon: 'cow', correctBin: 'ground' },
      { id: 'dog', label: 'Dog', icon: 'dog', correctBin: 'ground' },
    ],
    bins: [
      { id: 'sky', label: 'Sky / Trees 🌳', color: '#0EA5E9' },
      { id: 'ground', label: 'Ground 🏡', color: '#10B981' },
    ],
  },
  {
    type: 'identify_plant',
    question: 'Which tree gives us delicious MANGO fruits in summer?',
    answer: 'Mango tree',
    options: ['Mango tree', 'Neem tree', 'Banyan tree'],
    hint: 'This tree has long green leaves and bears juicy yellow-red fruits in May-June!',
    misconception: 'The Mango tree gives us sweet mangoes in summer! The neem tree gives bitter medicinal leaves, and the banyan tree gives aerial roots and shade, not mangoes!',
  },
  {
    type: 'sort_plants',
    question: 'Drag each plant or tree to what special thing it gives us!',
    answer: 'sort',
    options: [],
    hint: 'Mango gives fruits, neem gives medicine, banyan gives shade!',
    misconception: 'Different plants give different gifts! Mango trees give juicy fruits, neem trees give medicinal leaves, and banyan trees give wide spreading shade!',
    sortItems: [
      { id: 'mango-tree', label: 'Mango Tree', icon: 'mango-tree', correctBin: 'fruits' },
      { id: 'neem-tree', label: 'Neem Tree', icon: 'neem-tree', correctBin: 'medicine' },
      { id: 'banyan-tree', label: 'Banyan Tree', icon: 'tree', correctBin: 'shade' },
      { id: 'tulsi-plant', label: 'Tulsi Plant', icon: 'plant', correctBin: 'medicine' },
    ],
    bins: [
      { id: 'fruits', label: 'Sweet Fruits 🥭', color: '#F59E0B' },
      { id: 'medicine', label: 'Medicine 🌿', color: '#10B981' },
      { id: 'shade', label: 'Cool Shade 🌳', color: '#6366F1' },
    ],
  },
  {
    type: 'identify_river',
    question: 'What physical features do you see near a flowing RIVER?',
    answer: 'Water and fertile land',
    options: ['Water and fertile land', 'Only tall skyscrapers', 'Only dry sand dunes'],
    hint: 'Rivers flow across land, bringing water to green fields and plants!',
    misconception: 'Rivers flow through land, providing water and fertile soil for plants and trees! They are not surrounded only by skyscrapers or desert sand dunes!',
  },
  {
    type: 'sort_land_water',
    question: 'Drag each feature! Is it a Land form or a Water body?',
    answer: 'sort',
    options: [],
    hint: 'Mountains and hills are land forms. Rivers and ponds are water bodies!',
    misconception: 'Land forms are shapes of the ground (mountains, hills, plains). Water bodies are places where water collects or flows (rivers, ponds, lakes)!',
    sortItems: [
      { id: 'mountain', label: 'Mountain', icon: 'mountain', correctBin: 'land' },
      { id: 'hill', label: 'Hill', icon: 'mountain', correctBin: 'land' },
      { id: 'river', label: 'River', icon: 'river', correctBin: 'water' },
      { id: 'pond', label: 'Pond', icon: 'pond', correctBin: 'water' },
    ],
    bins: [
      { id: 'land', label: 'Land Form 🏔️', color: '#8B5CF6' },
      { id: 'water', label: 'Water Body 🌊', color: '#0284C7' },
    ],
  },
  {
    type: 'sort_food',
    question: 'Drag each food item to where it comes from: Plants or Animals?',
    answer: 'sort',
    options: [],
    hint: 'Rice and apples grow on plants. Milk and eggs come from animals!',
    misconception: 'Food comes from two sources! Rice, wheat, and fruits come from plants. Milk, eggs, and honey come from animals. Shops only sell food — they do not make it!',
    sortItems: [
      { id: 'rice', label: 'Rice', icon: 'grain', correctBin: 'plant' },
      { id: 'apple', label: 'Apple', icon: 'apple', correctBin: 'plant' },
      { id: 'milk', label: 'Milk', icon: 'milk', correctBin: 'animal' },
      { id: 'egg', label: 'Egg', icon: 'egg', correctBin: 'animal' },
    ],
    bins: [
      { id: 'plant', label: 'From Plants 🌾', color: '#10B981' },
      { id: 'animal', label: 'From Animals 🥛', color: '#EC4899' },
    ],
  },
];

// ─── Custom SVG Mascot: Explorer Esha ─────────────────────────

function ExplorerEsha({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-25 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white/95 backdrop-blur-sm rounded-2xl px-3 py-2 shadow-xl max-w-[220px] border-2 border-amber-300"
          >
            <p className="text-xs font-bold text-gray-800 text-center">{speaking}</p>
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
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="esha-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="esha-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>

          {/* Backpack straps */}
          <path d="M25 45 L30 65 M50 45 L45 65" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
          {/* Shirt body */}
          <rect x="22" y="45" width="31" height="28" rx="6" fill="url(#esha-shirt)" stroke="#047857" strokeWidth="1.5" />
          {/* Neck */}
          <rect x="33" y="38" width="9" height="10" fill="#FDE68A" />
          {/* Head */}
          <circle cx="37.5" cy="30" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M23 28 Q25 18 37.5 18 Q50 18 52 28 Q52 22 37.5 20 Q23 22 23 28 Z" fill="#78350F" />
          {/* Eyes */}
          <circle cx="32" cy="29" r="2" fill="#1F2937" />
          <circle cx="43" cy="29" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M34 35 Q37.5 38 41 35" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Sun Hat */}
          <ellipse cx="37.5" cy="20" rx="18" ry="5" fill="url(#esha-hat)" stroke="#B45309" strokeWidth="1.5" />
          <path d="M27 18 Q37.5 8 48 18 Z" fill="url(#esha-hat)" stroke="#B45309" strokeWidth="1.5" />
          <rect x="28" y="17" width="19" height="3" fill="#EF4444" rx="1" />
          {/* Binoculars around neck */}
          <rect x="30" y="44" width="6" height="8" rx="2" fill="#374151" />
          <rect x="39" y="44" width="6" height="8" rx="2" fill="#374151" />
          <path d="M33 44 Q37.5 40 42 44" stroke="#1F2937" strokeWidth="1.5" fill="none" />
          {/* Shoes */}
          <ellipse cx="28" cy="76" rx="6" ry="4" fill="#4B5563" />
          <ellipse cx="47" cy="76" rx="6" ry="4" fill="#4B5563" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 items-center bg-white/80 px-3 py-1 rounded-full shadow-md border border-amber-200">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#F59E0B' : 'rgba(0,0,0,0.15)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Custom SVG Scene Background ──────────────────────────────

function EnvironmentScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #7DD3FC 0%, #BAE6FD 35%, #E0F2FE 60%, #86EFAC 75%, #4ADE80 100%)' }} />

      {/* Mountains */}
      <svg className="absolute bottom-28 left-0 right-0 w-full" height="140" viewBox="0 0 720 140" preserveAspectRatio="none">
        <path d="M0 140 L0 80 Q90 20, 180 90 T360 40 T540 100 T720 70 L720 140 Z" fill="#0284C7" opacity="0.35" />
        <path d="M0 140 L0 100 Q120 40, 240 110 T480 60 T720 90 L720 140 Z" fill="#0369A1" opacity="0.45" />
      </svg>

      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FBBF24" opacity="0.9" />
          <circle cx="30" cy="30" r="12" fill="#F59E0B" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>

      {/* Clouds */}
      <motion.div className="absolute top-8 left-1/4 opacity-75" animate={{ x: [0, 35, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>

      {/* Pond at bottom right */}
      <div className="absolute bottom-4 right-8">
        <svg width="140" height="60" viewBox="0 0 140 60">
          <ellipse cx="70" cy="30" rx="65" ry="25" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <ellipse cx="50" cy="28" rx="20" ry="8" fill="#7DD3FC" opacity="0.6" />
          {/* Lily pads */}
          <circle cx="35" cy="25" r="7" fill="#16A34A" />
          <circle cx="100" cy="35" r="9" fill="#16A34A" />
        </svg>
      </div>

      {/* Trees at bottom left */}
      <div className="absolute bottom-6 left-6 flex gap-4">
        <svg width="50" height="70" viewBox="0 0 50 70">
          <rect x="20" y="40" width="10" height="30" fill="#92400E" />
          <circle cx="25" cy="30" r="22" fill="#15803D" />
          <circle cx="20" cy="22" r="14" fill="#22C55E" />
        </svg>
        <svg width="60" height="85" viewBox="0 0 60 85">
          <rect x="25" y="50" width="10" height="35" fill="#78350F" />
          <circle cx="30" cy="35" r="26" fill="#166534" />
          <circle cx="30" cy="22" r="18" fill="#4ADE80" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Interactive Object Icons ──────────────────────

function HouseIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="28" width="36" height="26" fill="#F87171" stroke="#B91C1C" strokeWidth="2" rx="2" />
      <path d="M6 30 L30 8 L54 30 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      <rect x="24" y="38" width="12" height="16" fill="#92400E" rx="1" />
      <rect x="16" y="32" width="8" height="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" rx="1" />
      <rect x="36" y="32" width="8" height="8" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" rx="1" />
    </svg>
  );
}

function SchoolIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="25" width="40" height="30" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" rx="2" />
      <polygon points="30,8 6,25 54,25" fill="#3B82F6" stroke="#1E40AF" strokeWidth="2" />
      <rect x="24" y="37" width="12" height="18" fill="#1E3A8A" rx="1" />
      <rect x="14" y="29" width="8" height="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" rx="1" />
      <rect x="38" y="29" width="8" height="8" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" rx="1" />
    </svg>
  );
}

function SparrowIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="14" ry="10" fill="#D97706" />
      <circle cx="40" cy="24" r="7" fill="#B45309" />
      <circle cx="42" cy="23" r="1.5" fill="#1F2937" />
      <polygon points="47,24 53,26 47,28" fill="#F59E0B" />
      <path d="M16 32 L8 28 L14 36 Z" fill="#92400E" />
      <ellipse cx="25" cy="42" rx="3" ry="5" fill="#B45309" />
      <ellipse cx="35" cy="42" rx="3" ry="5" fill="#B45309" />
    </svg>
  );
}

function CrowIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="15" ry="11" fill="#1F2937" />
      <circle cx="41" cy="24" r="7" fill="#111827" />
      <circle cx="43" cy="23" r="1.5" fill="#FBBF24" />
      <polygon points="48,23 56,25 48,27" fill="#374151" />
      <path d="M15 32 L7 27 L13 36 Z" fill="#111827" />
      <ellipse cx="26" cy="42" rx="3" ry="6" fill="#111827" />
      <ellipse cx="34" cy="42" rx="3" ry="6" fill="#111827" />
    </svg>
  );
}

function CowIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="26" width="26" height="18" rx="4" fill="#F3F4F6" stroke="#374151" strokeWidth="1.5" />
      {/* Spots */}
      <circle cx="24" cy="32" r="4" fill="#1F2937" />
      <circle cx="36" cy="38" r="5" fill="#1F2937" />
      {/* Head */}
      <rect x="36" y="18" width="12" height="12" rx="3" fill="#F3F4F6" stroke="#374151" strokeWidth="1.5" />
      <polygon points="44,18 47,13 49,18" fill="#374151" />
      <polygon points="37,18 35,13 33,18" fill="#374151" />
      {/* Legs */}
      <rect x="20" y="44" width="3" height="10" fill="#374151" />
      <rect x="27" y="44" width="3" height="10" fill="#374151" />
      <rect x="35" y="44" width="3" height="10" fill="#374151" />
      <rect x="41" y="44" width="3" height="10" fill="#374151" />
    </svg>
  );
}

function DogIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="34" rx="14" ry="10" fill="#D97706" />
      <circle cx="40" cy="26" r="8" fill="#D97706" />
      {/* Ears */}
      <path d="M38 18 L34 24 L42 22 Z" fill="#92400E" />
      {/* Tail */}
      <path d="M16 32 Q10 26 14 20" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
      {/* Legs */}
      <rect x="20" y="42" width="3" height="10" fill="#B45309" />
      <rect x="26" y="42" width="3" height="10" fill="#B45309" />
      <rect x="34" y="42" width="3" height="10" fill="#B45309" />
      <rect x="40" y="42" width="3" height="10" fill="#B45309" />
    </svg>
  );
}

function MangoTreeIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="38" width="8" height="18" fill="#78350F" />
      <circle cx="30" cy="26" r="18" fill="#15803D" />
      {/* Mangoes */}
      <ellipse cx="22" cy="24" rx="3" ry="4" fill="#FBBF24" />
      <ellipse cx="38" cy="28" rx="3" ry="4" fill="#EF4444" />
      <ellipse cx="30" cy="18" rx="3" ry="4" fill="#F59E0B" />
    </svg>
  );
}

function NeemTreeIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="38" width="8" height="18" fill="#78350F" />
      <circle cx="30" cy="26" r="18" fill="#166534" />
      <circle cx="20" cy="20" r="10" fill="#22C55E" opacity="0.7" />
      <circle cx="40" cy="20" r="10" fill="#22C55E" opacity="0.7" />
    </svg>
  );
}

function TreeIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="38" width="8" height="18" fill="#92400E" />
      <circle cx="30" cy="25" r="18" fill="#15803D" />
    </svg>
  );
}

function PlantIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M26 50 L34 50 L32 38 L28 38 Z" fill="#B45309" />
      <path d="M30 38 Q30 25 20 22 Q30 22 30 14 Q30 22 40 22 Q30 25 30 38 Z" fill="#10B981" />
    </svg>
  );
}

function MountainIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,10 55,50 5,50" fill="#6B7280" />
      <polygon points="30,10 38,25 25,25" fill="white" opacity="0.9" />
      <polygon points="15,25 45,50 3,50" fill="#4B5563" />
    </svg>
  );
}

function RiverIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" rx="8" fill="#38BDF8" />
      <path d="M15 25 Q30 18 45 25 T45 35" stroke="white" strokeWidth="2.5" fill="none" />
      <path d="M15 35 Q30 28 45 35" stroke="white" strokeWidth="2" fill="none" opacity="0.7" />
    </svg>
  );
}

function PondIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="22" ry="16" fill="#0EA5E9" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="22" cy="27" rx="8" ry="5" fill="#38BDF8" opacity="0.6" />
      <circle cx="40" cy="34" r="5" fill="#15803D" />
    </svg>
  );
}

function GrainIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="10" ry="16" fill="#FBBF24" />
      <line x1="30" y1="16" x2="30" y2="48" stroke="#D97706" strokeWidth="1.5" />
      {[22, 28, 34, 40].map(y => (
        <line key={y} x1="24" y1={y} x2="36" y2={y - 3} stroke="#D97706" strokeWidth="1.5" />
      ))}
    </svg>
  );
}

function AppleIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="32" r="16" fill="#EF4444" />
      <path d="M30 16 Q35 12 33 8" stroke="#78350F" strokeWidth="2" fill="none" />
      <path d="M33 12 Q38 10 36 15" fill="#15803D" />
    </svg>
  );
}

function MilkIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="20" width="16" height="30" rx="3" fill="white" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M22 26 L38 26" stroke="#EF4444" strokeWidth="3" />
      <rect x="25" y="14" width="10" height="6" rx="1" fill="#94A3B8" />
    </svg>
  );
}

function EggIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="14" ry="18" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2" />
    </svg>
  );
}

// ─── Render SVG icon mapper for sort items ────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'sparrow': return <SparrowIcon size={size} />;
    case 'crow': return <CrowIcon size={size} />;
    case 'cow': return <CowIcon size={size} />;
    case 'dog': return <DogIcon size={size} />;
    case 'mango-tree': return <MangoTreeIcon size={size} />;
    case 'neem-tree': return <NeemTreeIcon size={size} />;
    case 'tree': return <TreeIcon size={size} />;
    case 'plant': return <PlantIcon size={size} />;
    case 'mountain': return <MountainIcon size={size} />;
    case 'river': return <RiverIcon size={size} />;
    case 'pond': return <PondIcon size={size} />;
    case 'grain': return <GrainIcon size={size} />;
    case 'apple': return <AppleIcon size={size} />;
    case 'milk': return <MilkIcon size={size} />;
    case 'egg': return <EggIcon size={size} />;
    default: return <HouseIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

function SortCard({ item, x, y, placed, onDragStart, onDragEnd }: {
  item: SortItem;
  x: number;
  y: number;
  placed: boolean;
  onDragStart: (id: string) => void;
  onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
  return (
    <Draggable
      id={item.id}
      x={x}
      y={y}
      draggable={!placed}
      placed={placed}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      width={110}
      height={95}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        } p-2`}
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(item.icon, 44)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 truncate max-w-[100px]">
          {item.label}
        </span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ bin, isHovering }: { bin: Bin; isHovering: boolean }) {
  return (
    <div
      className={`flex flex-col items-center justify-center rounded-2xl border-4 p-4 transition-all shadow-md ${
        isHovering ? 'scale-105 shadow-xl' : 'scale-100'
      }`}
      style={{
        backgroundColor: `${bin.color}15`,
        borderColor: bin.color,
        minWidth: 140,
        minHeight: 120,
      }}
    >
      <span className="text-sm font-black text-gray-800 text-center">{bin.label}</span>
      <span className="text-xs font-semibold text-gray-500 mt-1">Drop here!</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface MyEnvironmentGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MyEnvironmentGame({ width = 720, height = 560, onComplete }: MyEnvironmentGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIndex, setSlideIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hi! I am Explorer Esha. Let us explore our environment together!');

  // Sort challenge state
  const [sortPositions, setSortPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const currentCh = CHALLENGES[challengeIndex];
      if (currentCh) {
        setHintMessage(currentCh.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setMascotSpeech(currentCh.hint);
        speechManager.speak(currentCh.hint);
      }
    }, 10000);
  }, [challengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIndex, resetInactivityTimer]);

  // Initialize sort positions when challenge changes
  useEffect(() => {
    const ch = CHALLENGES[challengeIndex];
    if (ch && ch.type.startsWith('sort') && ch.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      ch.sortItems.forEach((item, idx) => {
        // Arrange items horizontally at the bottom
        newPos[item.id] = { x: 60 + idx * 130, y: 320 };
        newPlaced[item.id] = false;
      });
      setSortPositions(newPos);
      setPlacedItems(newPlaced);
    }
    setMascotSpeech(ch ? ch.question : 'Great job!');
    speechManager.speak(ch ? ch.question : 'Great job!');
    setMascotMood('happy');
  }, [challengeIndex]);

  // Handle multiple-choice answers
  const handleAnswerSelect = (option: string) => {
    audioManager.play('tap');
    const currentCh = CHALLENGES[challengeIndex];
    if (option === currentCh.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Correct! Brilliant observation!');
      speechManager.speak('Correct! Brilliant observation!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setShowSuccessBanner(true);
      setSuccessMessage('Fantastic! You got it right!');
      setStars(prev => prev + 1);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMessage(currentCh.misconception);
      setMascotSpeech(currentCh.misconception);
      speechManager.speak(currentCh.misconception);
    }
  };

  // Handle sort drag start
  const handleDragStart = (id: string) => {
    setActiveDragId(id);
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle sort drag end
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    setActiveDragId(null);
    const currentCh = CHALLENGES[challengeIndex];
    if (!currentCh || !currentCh.sortItems || !currentCh.bins) return false;

    const item = currentCh.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check drop coordinate against bin positions
    // Bin layout: 2 or 3 bins centered horizontally around y = 80 to 220
    const binWidth = 140;
    const totalBins = currentCh.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2;

    let droppedBinId: string | null = null;
    currentCh.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 80;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + 140) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId && droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setPlacedItems(prev => ({ ...prev, [id]: true }));
      setSparklePos({ x, y });

      // Check if all items in sort challenge are placed
      const updatedPlaced = { ...placedItems, [id]: true };
      const allDone = currentCh.sortItems.every(i => updatedPlaced[i.id]);

      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('All sorted perfectly! You are an environment pro!');
        speechManager.speak('All sorted perfectly! You are an environment pro!');
        setShowSuccessBanner(true);
        setSuccessMessage('Wonderful sorting! Perfect score!');
        setStars(prev => prev + 1);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMessage(currentCh.misconception);
      setMascotSpeech(currentCh.misconception);
      speechManager.speak(currentCh.misconception);
      return false;
    }
  };

  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    setHintMessage(null);
    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(prev => prev + 1);
    } else {
      setCompleted(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-gold-300 to-emerald-400 font-sans flex flex-col items-center justify-between"
      style={{ width, height }}
    >
      {/* Background Environment Scene */}
      <EnvironmentScene width={width} height={height} />

      {/* Header bar */}
      <div className="relative z-20 w-full px-6 py-3 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm border-b border-white/40">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-emerald-700 tracking-wide">🌿 My Environment</span>
          {screen === 'play' && (
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full">
              Challenge {challengeIndex + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
        {screen === 'play' && <StarRow count={stars} total={CHALLENGES.length} />}
      </div>

      {/* Explorer Esha Mascot */}
      <ExplorerEsha mood={mascotMood} speaking={mascotSpeech} />

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          // TEACHING SCREEN (5 slides)
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-xl w-full shadow-2xl border-4 border-amber-300 flex flex-col items-center text-center"
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIndex].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIndex].emoji}
            </div>
            <h2 className="text-2xl font-black text-gray-800 mb-3">{TEACHING_SLIDES[slideIndex].title}</h2>
            <p className="text-base font-medium text-gray-600 mb-8 leading-relaxed">{TEACHING_SLIDES[slideIndex].text}</p>

            {/* Slide Navigation Dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    i === slideIndex ? 'w-8 bg-emerald-500' : 'w-2.5 bg-gray-300'
                  }`}
                />
              ))}
            </div>

            <div className="flex gap-4 w-full">
              {slideIndex > 0 && (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIndex(prev => prev - 1);
                  }}
                  className="flex-1 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold rounded-2xl shadow transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIndex < TEACHING_SLIDES.length - 1) {
                    setSlideIndex(prev => prev + 1);
                  } else {
                    setScreen('play');
                    setMascotSpeech(CHALLENGES[0].question);
                    speechManager.speak(CHALLENGES[0].question);
                  }
                }}
                className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-black rounded-2xl shadow-lg transition-all"
              >
                {slideIndex < TEACHING_SLIDES.length - 1 ? 'Next ➔' : 'Start Exploring! 🚀'}
              </button>
            </div>
          </motion.div>
        ) : !completed ? (
          // PLAY SCREEN
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Question Card */}
            <motion.div
              key={challengeIndex}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-emerald-200 w-full text-center mb-6"
            >
              <h3 className="text-xl font-black text-gray-800">{CHALLENGES[challengeIndex].question}</h3>
            </motion.div>

            {/* Challenge Type Renderer */}
            {CHALLENGES[challengeIndex].type.startsWith('sort') ? (
              // SORTING CHALLENGE (Drag and Drop)
              <div className="relative w-full h-[320px] flex flex-col items-center">
                {/* Bins Row */}
                <div className="flex gap-6 mb-4">
                  {CHALLENGES[challengeIndex].bins?.map(bin => (
                    <SortBin key={bin.id} bin={bin} isHovering={hoveringBin === bin.id} />
                  ))}
                </div>

                {/* Draggable Items Row */}
                <div className="flex gap-4 absolute bottom-4">
                  {CHALLENGES[challengeIndex].sortItems?.map(item => (
                    <SortCard
                      key={item.id}
                      item={item}
                      x={sortPositions[item.id]?.x || 0}
                      y={sortPositions[item.id]?.y || 320}
                      placed={placedItems[item.id] || false}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>
              </div>
            ) : (
              // MULTIPLE CHOICE CHALLENGE
              <div className="grid grid-cols-1 gap-4 w-full max-w-md">
                {CHALLENGES[challengeIndex].options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full py-4 px-6 bg-white/95 hover:bg-emerald-50 border-2 border-emerald-300 rounded-2xl shadow-lg text-lg font-bold text-gray-800 text-center transition-all"
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            )}
          </div>
        ) : (
          // COMPLETION SCREEN
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white/95 backdrop-blur-md rounded-3xl p-8 max-w-md w-full shadow-2xl border-4 border-amber-400 text-center flex flex-col items-center"
          >
            <div className="text-6xl mb-4">🏆</div>
            <h2 className="text-3xl font-black text-gray-800 mb-2">Environment Hero!</h2>
            <p className="text-gray-600 font-medium mb-6">
              You explored families, homes, schools, animals, plants, land forms, and food sources!
            </p>
            <div className="flex justify-center mb-6">
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setChallengeIndex(0);
                setStars(0);
                setErrors(0);
                setCompleted(false);
                setScreen('teaching');
                setSlideIndex(0);
              }}
              className="py-3 px-8 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-black rounded-2xl shadow-lg hover:opacity-95 transition-all"
            >
              Play Again 🔄
            </button>
          </motion.div>
        )}
      </div>

      {/* Feedback & Overlay Components */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {showSuccessBanner && (
        <SuccessBanner
          message={successMessage}
          onComplete={() => {
            setShowSuccessBanner(false);
            handleNextChallenge();
          }}
        />
      )}

      {hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
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
