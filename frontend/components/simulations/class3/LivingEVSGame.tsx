'use client';

/**
 * LivingEVSGame — Learn about living and non-living things, plants vs animals, and external body parts
 *
 * CISCE Nodes: c3_evs_001 (Living and non-living things),
 *              c3_evs_002 (Plants and animals basic differences and similarities),
 *              c3_evs_003 (External body parts of humans and animals)
 *
 * ELI5: "Living things grow, eat, breathe, and have babies like dogs, trees, and you!
 *   Non-living things like stones and chairs do not grow or breathe. Plants and animals
 *   are both alive, but plants make their own food in leaves and stay in one place,
 *   while animals move around and eat food! Humans and animals share many body parts
 *   like eyes and ears, but have special parts like wings, tails, and hands!"
 *
 * Misconceptions Addressed:
 *   1. "Plants are non-living because they don't move from place to place" →
 *      "Plants grow, need water, breathe, and reproduce! Movement of parts (turning to light)
 *      and growth make them living, even though roots fix them in one spot."
 *   2. "A fan is living because it moves" →
 *      "Fans move because of electricity, not on their own! They do not grow, eat, or breathe."
 *   3. "Plants do not need food" →
 *      "Plants DO need food, but they make it themselves in their leaves using sunlight,
 *      water, and carbon dioxide (photosynthesis)!"
 *   4. "Humans and animals have nothing in common" →
 *      "Both are living things, grow, need food and water, breathe, and reproduce,
 *      and both have eyes, ears, and noses!"
 *   5. "Only humans have eyes and ears" →
 *      "Animals also have eyes, ears, noses, and mouths to sense the world!"
 *
 * Story: "Join Explorer Esha with her magnifying glass, sun hat, and backpack
 *   to explore nature, classify living and non-living things, compare plants and animals,
 *   and discover amazing body parts!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Game Screen Type Definition ──────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_living' | 'identify_non_living' | 'sort_living' | 'identify_similarity' | 'sort_plant_animal' | 'identify_sense' | 'sort_body_parts' | 'sort_human_animal';

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

// ─── Teaching Slides (5 exact slides) ─────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Living vs Non-Living 🌳🪨',
    text: 'Living things grow, need food and water, breathe, move, and have babies! Trees, dogs, birds, and humans are living. Stones, chairs, and books are non-living!',
    emoji: '🌿',
    bgColor: 'from-emerald-400 to-teal-600',
    spoken: 'Living things grow, need food and water, breathe, move, and have babies. Trees, dogs, birds, and humans are living things. Stones, chairs, and books are non-living!'
  },
  {
    title: 'Plants are Living! 🌱',
    text: 'Plants cannot walk around, but they ARE living! They grow from tiny seeds, take in water, breathe through leaves, turn toward sunlight, and make seeds!',
    emoji: '🌻',
    bgColor: 'from-green-400 to-emerald-600',
    spoken: 'Plants cannot walk around, but they are living! They grow from tiny seeds, take in water, breathe through leaves, and make new seeds.'
  },
  {
    title: 'Plants and Animals 🌲🐕',
    text: 'Both are alive and grow! But plants make their own food in their green leaves using sunlight. Animals cannot make food — they must eat plants or other animals!',
    emoji: '🦌',
    bgColor: 'from-teal-400 to-gold-600',
    spoken: 'Both plants and animals are alive and grow. But plants make their own food using sunlight, while animals must eat plants or other animals.'
  },
  {
    title: 'Human and Animal Needs 🧡',
    text: 'Humans and animals share basic needs: food, water, air, and sleep! Both grow, feel hunger, and have babies. Both have eyes, ears, and noses to sense the world!',
    emoji: '🐾',
    bgColor: 'from-gold-400 to-gold-600',
    spoken: 'Humans and animals share basic needs like food, water, air, and sleep. Both have eyes, ears, and noses to sense the world around them.'
  },
  {
    title: 'External Body Parts 👁️👂',
    text: 'Our body parts have special jobs! Eyes are for seeing, ears for hearing, nose for smelling, tongue for tasting, and skin for feeling. Animals have wings, fins, tails, and paws!',
    emoji: '🔍',
    bgColor: 'from-gold-400 to-gold-600',
    spoken: 'Our body parts have special jobs. Eyes are for seeing, ears for hearing, nose for smelling. Animals have wings, fins, tails, and paws suited to their homes!'
  },
];

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_living',
    question: 'Which of these is a LIVING thing?',
    answer: 'A mango tree that grows',
    options: ['A stone that stays the same size', 'A wooden chair', 'A mango tree that grows'],
    hint: 'Look for signs of life! Does it grow, need water, and breathe?',
    misconception: 'A mango tree is living because it grows from a seed, needs water, breathes, and produces seeds! Stones and wooden chairs do not grow, eat, or breathe, so they are non-living.',
  },
  {
    type: 'identify_non_living',
    question: 'Which of these is a NON-LIVING thing?',
    answer: 'A plastic chair',
    options: ['A rose plant', 'A stray dog', 'A plastic chair'],
    hint: 'Non-living things do not grow, breathe, or need food. Which one is a non-living object?',
    misconception: 'A plastic chair is non-living! It does not grow, eat, breathe, or have baby chairs. Rose plants and stray dogs are living things.',
  },
  {
    type: 'sort_living',
    question: 'Drag each object into Living or Non-Living!',
    answer: 'sort',
    options: [],
    hint: 'Living things grow and breathe (dog, tree, bird). Non-living things do not (stone, bench, water)!',
    misconception: 'Remember: living things show signs of life like growth, eating, and breathing. Stones, benches, and water are non-living things!',
    sortItems: [
      { id: 'dog', label: 'Stray Dog', icon: 'dog', correctBin: 'living' },
      { id: 'tree', label: 'Neem Tree', icon: 'tree', correctBin: 'living' },
      { id: 'stone', label: 'River Stone', icon: 'stone', correctBin: 'non-living' },
      { id: 'bench', label: 'Park Bench', icon: 'bench', correctBin: 'non-living' },
    ],
    bins: [
      { id: 'living', label: 'Living Things 🌿', color: '#10B981' },
      { id: 'non-living', label: 'Non-Living 🪨', color: '#6B7280' },
    ],
  },
  {
    type: 'identify_similarity',
    question: 'What is a similarity between a plant and an animal?',
    answer: 'Both are living things that grow',
    options: ['Both can talk with language', 'Both are living things that grow', 'Both can run around'],
    hint: 'Think about what makes both plants and animals alike. Are they alive?',
    misconception: 'Plants and animals are both living things that grow, need water, and reproduce! Plants cannot run or talk, but both share the basic signs of life.',
  },
  {
    type: 'sort_plant_animal',
    question: 'Drag each feature! Does it belong to a Plant or an Animal?',
    answer: 'sort',
    options: [],
    hint: 'Plants make their own food in leaves and stay in one place. Animals move around and eat food!',
    misconception: 'Plants make their food by photosynthesis in their leaves and are fixed by roots. Animals move around to find food and have legs or wings!',
    sortItems: [
      { id: 'p-food', label: 'Makes own food', icon: 'plant', correctBin: 'plant' },
      { id: 'p-root', label: 'Fixed by roots', icon: 'tree', correctBin: 'plant' },
      { id: 'a-move', label: 'Walks with legs', icon: 'dog', correctBin: 'animal' },
      { id: 'a-eat', label: 'Eats food', icon: 'bird', correctBin: 'animal' },
    ],
    bins: [
      { id: 'plant', label: 'Plant Feature 🌿', color: '#059669' },
      { id: 'animal', label: 'Animal Feature 🐾', color: '#D97706' },
    ],
  },
  {
    type: 'identify_sense',
    question: 'Which external body part do we use to SEE?',
    answer: 'Eyes',
    options: ['Ears', 'Eyes', 'Nose'],
    hint: 'We open these two organs on our face to look at colourful flowers and read books!',
    misconception: 'Eyes are for seeing! Ears are for hearing sounds, and the nose is for smelling fragrances. Every sense organ has its own special job.',
  },
  {
    type: 'sort_body_parts',
    question: 'Drag each body part to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Eyes see, ears hear, nose smells, legs walk!',
    misconception: 'Each body part has a specific job: eyes for seeing, ears for hearing, nose for smelling, and legs for walking and running!',
    sortItems: [
      { id: 'eye', label: 'Eyes (See)', icon: 'eye', correctBin: 'see' },
      { id: 'ear', label: 'Ears (Hear)', icon: 'ear', correctBin: 'hear' },
      { id: 'nose', label: 'Nose (Smell)', icon: 'nose', correctBin: 'smell' },
      { id: 'leg', label: 'Legs (Walk)', icon: 'leg', correctBin: 'walk' },
    ],
    bins: [
      { id: 'see', label: 'Seeing 👀', color: '#3B82F6' },
      { id: 'hear', label: 'Hearing 👂', color: '#8B5CF6' },
      { id: 'smell', label: 'Smelling 👃', color: '#EC4899' },
      { id: 'walk', label: 'Walking 🦵', color: '#10B981' },
    ],
  },
  {
    type: 'sort_human_animal',
    question: 'Drag each feature! Does it belong to Humans, Animals, or Both?',
    answer: 'sort',
    options: [],
    hint: 'Both humans and animals have eyes and legs! Humans use hands for writing. Animals have fur and tails!',
    misconception: 'Humans and animals both share eyes, ears, and legs! But humans use hands for writing, while animals like cats have fur and tails.',
    sortItems: [
      { id: 'h-hand', label: 'Hands for writing', icon: 'hand', correctBin: 'human' },
      { id: 'a-tail', label: 'Tail for balance', icon: 'paw', correctBin: 'animal' },
      { id: 'b-eyes', label: 'Eyes and ears', icon: 'eye', correctBin: 'both' },
      { id: 'b-legs', label: 'Legs for moving', icon: 'leg', correctBin: 'both' },
    ],
    bins: [
      { id: 'human', label: 'Human 🙋', color: '#2563EB' },
      { id: 'animal', label: 'Animal 🐅', color: '#D97706' },
      { id: 'both', label: 'Both 🤝', color: '#7C3AED' },
    ],
  },
];

// ─── Explorer Esha Mascot ─────────────────────────────────────

function ExplorerEsha({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[240px] border-2 border-emerald-400"
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
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="esha-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="esha-hat" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* Backpack straps */}
          <rect x="25" y="45" width="25" height="22" rx="6" fill="#B45309" />
          {/* Body / Shirt */}
          <path d="M22 45 Q37 40 53 45 L52 70 Q37 75 22 70 Z" fill="url(#esha-shirt)" stroke="#047857" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37" cy="28" r="14" fill="#FDE68A" stroke="#F59E0B" strokeWidth="1" />
          {/* Sun hat */}
          <ellipse cx="37" cy="17" rx="18" ry="5" fill="url(#esha-hat)" stroke="#B45309" strokeWidth="1.5" />
          <path d="M25 15 Q37 5 49 15 Z" fill="url(#esha-hat)" stroke="#B45309" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="27" r="2" fill="#1F2937" />
          <circle cx="42" cy="27" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 33 Q37 37 41 33" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Magnifying glass in hand */}
          <circle cx="58" cy="55" r="7" fill="none" stroke="#3B82F6" strokeWidth="3" />
          <line x1="53" y1="60" x2="48" y2="65" stroke="#1F2937" strokeWidth="2.5" strokeLinecap="round" />
          {/* Legs */}
          <rect x="28" y="70" width="4" height="14" rx="2" fill="#1F2937" />
          <rect x="43" y="70" width="4" height="14" rx="2" fill="#1F2937" />
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

// ─── Nature Park Scene Background (SVG with Gradients) ────────

function NatureScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
          <linearGradient id="trunk-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width={width} height={height * 0.65} fill="url(#sky-grad)" />
        {/* Sun */}
        <circle cx={width - 70} cy={50} r={28} fill="#FEF08A" opacity="0.9" />
        <circle cx={width - 70} cy={50} r={20} fill="#FACC15" />
        {/* Ground */}
        <rect y={height * 0.65} width={width} height={height * 0.35} fill="url(#ground-grad)" />
        {/* Distant Hills */}
        <path d={`M0 ${height * 0.65} Q ${width * 0.25} ${height * 0.5}, ${width * 0.5} ${height * 0.65} T ${width} ${height * 0.65} L ${width} ${height * 0.65} L 0 ${height * 0.65} Z`} fill="#22C55E" opacity="0.6" />
        {/* Pond in park */}
        <ellipse cx={width * 0.25} cy={height * 0.82} rx={60} ry={22} fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
        <ellipse cx={width * 0.25} cy={height * 0.83} rx={45} ry={14} fill="#7DD3FC" opacity="0.5" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Topic Icons for Sort Cards ────────────────────

function TreeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="36" width="8" height="18" fill="url(#trunk-grad)" rx="1" />
      <circle cx="30" cy="24" r="16" fill="#16A34A" />
      <circle cx="22" cy="20" r="10" fill="#22C55E" />
      <circle cx="38" cy="20" r="10" fill="#22C55E" />
    </svg>
  );
}

function DogIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="35" rx="14" ry="9" fill="#D97706" />
      <circle cx="44" cy="28" r="8" fill="#D97706" />
      <ellipse cx="48" cy="25" rx="3" ry="5" fill="#B45309" transform="rotate(-20 48 25)" />
      <circle cx="46" cy="26" r="1.5" fill="#1F2937" />
      <rect x="22" y="42" width="3" height="12" rx="1.5" fill="#B45309" />
      <rect x="38" y="42" width="3" height="12" rx="1.5" fill="#B45309" />
      <path d="M18 32 Q12 28 16 24" stroke="#B45309" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function StoneIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 42 Q15 28, 30 26 Q48 24, 50 42 Q52 52, 30 52 Q10 52, 12 42 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="2" />
      <ellipse cx="28" cy="34" r="4" fill="#D1D5DB" opacity="0.6" />
    </svg>
  );
}

function BenchIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="24" width="40" height="14" rx="2" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      <rect x="12" y="40" width="6" height="12" fill="#4B5563" />
      <rect x="42" y="40" width="6" height="12" fill="#4B5563" />
      <rect x="10" y="14" width="40" height="8" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
    </svg>
  );
}

function BirdIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="32" rx="12" ry="8" fill="#3B82F6" />
      <circle cx="42" cy="25" r="6" fill="#3B82F6" />
      <polygon points="46,25 54,23 46,27" fill="#F59E0B" />
      <circle cx="43" cy="24" r="1" fill="white" />
      <path d="M25 38 Q20 48, 15 45" stroke="#1D4ED8" strokeWidth="2.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function EyeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 30 Q30 12, 50 30 Q30 48, 10 30 Z" fill="white" stroke="#1F2937" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="10" fill="#3B82F6" />
      <circle cx="30" cy="30" r="4" fill="#1F2937" />
      <circle cx="27" cy="27" r="2.5" fill="white" />
    </svg>
  );
}

function EarIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 15 C12 15, 10 45, 32 45 C42 45, 48 35, 45 25 C43 18, 35 18, 32 25 C30 32, 38 35, 36 40" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function NoseIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 Q24 35, 20 42 Q28 46, 36 42 Q32 35, 30 15 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <ellipse cx="25" cy="42" rx="2" ry="1.5" fill="#92400E" />
      <ellipse cx="35" cy="42" rx="2" ry="1.5" fill="#92400E" />
    </svg>
  );
}

function LegIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="12" width="10" height="28" rx="5" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      <ellipse cx="30" cy="44" rx="8" ry="5" fill="#3B82F6" />
    </svg>
  );
}

function HandIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="25" width="20" height="20" rx="4" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      <rect x="21" y="12" width="3" height="15" rx="1.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="26" y="10" width="3" height="17" rx="1.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="31" y="11" width="3" height="16" rx="1.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
      <rect x="36" y="15" width="3" height="13" rx="1.5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5" />
    </svg>
  );
}

function PawIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="12" ry="10" fill="#92400E" />
      <circle cx="20" cy="24" r="4.5" fill="#92400E" />
      <circle cx="27" cy="20" r="4.5" fill="#92400E" />
      <circle cx="33" cy="20" r="4.5" fill="#92400E" />
      <circle cx="40" cy="24" r="4.5" fill="#92400E" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'dog': return <DogIcon size={size} />;
    case 'tree': return <TreeIcon size={size} />;
    case 'stone': return <StoneIcon size={size} />;
    case 'bench': return <BenchIcon size={size} />;
    case 'bird': return <BirdIcon size={size} />;
    case 'eye': return <EyeIcon size={size} />;
    case 'ear': return <EarIcon size={size} />;
    case 'nose': return <NoseIcon size={size} />;
    case 'leg': return <LegIcon size={size} />;
    case 'hand': return <HandIcon size={size} />;
    case 'paw': return <PawIcon size={size} />;
    case 'plant': return <TreeIcon size={size} />;
    default: return <TreeIcon size={size} />;
  }
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-emerald-300 ${placed ? 'opacity-40' : 'bg-white'} p-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 truncate w-full">{label}</span>
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
  isHovering?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-lg transition-transform ${isHovering ? 'scale-105 border-yellow-400' : 'border-white/80'}`}
      style={{ left: x, top: y, width, height, backgroundColor: color + '33', borderColor: color }}
    >
      <div className="w-8 h-8 rounded-full mb-1 flex items-center justify-center text-white font-black shadow-md" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-extrabold text-gray-900 text-center bg-white/90 px-2 py-0.5 rounded-md shadow-sm">
        {label}
      </span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface LivingEVSGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LivingEVSGame({ width = 720, height = 560, onComplete }: LivingEVSGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hi! I am Explorer Esha. Let us explore the living world!');

  // Sort challenge states
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Current challenge
  const challenge = CHALLENGES[challengeIdx];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setShowHint(true);
        setMascotMood('thinking');
        speechManager.speak(challenge.hint);
      }
    }, 10000);
  }, [challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Clean up speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Initialize positions when challenge changes to sort
  useEffect(() => {
    if (challenge && challenge.type.startsWith('sort')) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems?.forEach((item, idx) => {
        initialPos[item.id] = { x: 50 + idx * 130, y: 340 };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
    setShowHint(false);
    if (screen === 'play' && challenge) {
      setMascotSpeech(challenge.question);
      speechManager.speak(challenge.question);
    }
  }, [challengeIdx, screen, challenge]);

  // Handle teaching slide spoken audio
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setMascotSpeech(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [slideIdx, screen]);

  // Multiple choice answer handler
  const handleAnswerClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('success');
      setSparklePos({ x, y });
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      const praise = 'Fantastic! You got it right!';
      setMascotSpeech(praise);
      speechManager.speak(praise);
      setShowSuccessBanner(true);
      setSuccessMessage('Brilliant job! 🌟');
    } else {
      // Incorrect (Misconception feedback)
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!challenge.bins || !challenge.sortItems) return false;

    // Check which bin (if any) the item was dropped into
    // Bins are positioned around y = 140 to 260
    let matchedBin: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const binX = 60 + idx * 210;
      const binY = 130;
      const binW = 180;
      const binH = 150;
      if (x >= binX - 20 && x <= binX + binW + 20 && y >= binY - 20 && y <= binY + binH + 20) {
        matchedBin = bin.id;
      }
    });

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item || !matchedBin) {
      audioManager.play('drop-wrong');
      return false;
    }

    if (matchedBin === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      // Check if all items in sort challenge are placed correctly
      const allDone = challenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setSparklePos({ x: width / 2, y: height / 2 });
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('All sorted correctly! You are a brilliant nature explorer!');
        speechManager.speak('All sorted correctly! You are a brilliant nature explorer!');
        setShowSuccessBanner(true);
        setSuccessMessage('Perfect sorting! 🌟');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  // Advance challenge or finish
  const handleNextChallenge = () => {
    setShowSuccessBanner(false);
    setMascotMood('happy');
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      setMascotSpeech('Hooray! You completed all challenges and became a Master Explorer!');
      speechManager.speak('Hooray! You completed all challenges and became a Master Explorer!');
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl select-none" style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
      {/* Background Nature Scene */}
      <NatureScene width={width} height={height} />

      {/* Explorer Esha Mascot */}
      <ExplorerEsha mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti & Success Feedback */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && <SuccessBanner message={successMessage} onComplete={handleNextChallenge} />}
      {showHint && (
        <HintBubble
          message={challenge.hint}
          onComplete={() => {
            setShowHint(false);
            speechManager.speak(challenge.hint);
          }}
        />
      )}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <h1 className="text-lg font-black text-emerald-800 tracking-wide">Living World Explorer</h1>
        </div>
        <div className="flex items-center gap-4">
          <StarRow count={stars} total={CHALLENGES.length} />
          {screen === 'play' && (
            <span className="text-xs font-bold bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full shadow-sm">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col items-center justify-center z-0">
        {screen === 'teaching' ? (
          // ─── Teaching Screen ──────────────────────────────
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col items-center border-4 border-emerald-300 mt-6"
          >
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-3xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black text-emerald-900 mb-2 text-center">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm font-medium text-gray-700 text-center leading-relaxed mb-6 px-4">
              {TEACHING_SLIDES[slideIdx].text}
            </p>

            {/* Slide Navigation Dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setSlideIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${idx === slideIdx ? 'bg-emerald-600 w-8' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 w-full justify-between">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${slideIdx === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
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
                    audioManager.play('success');
                  }
                }}
                className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg hover:from-emerald-600 hover:to-teal-700 transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
              </button>
            </div>
          </motion.div>
        ) : (
          // ─── Play Screen ──────────────────────────────────
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl flex flex-col items-center border-4 border-emerald-300 mt-6 relative min-h-[400px]"
          >
            {/* Question Header */}
            <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl px-6 py-3 mb-6 w-full text-center shadow-inner">
              <h3 className="text-base font-black text-emerald-900">{challenge.question}</h3>
            </div>

            {/* Challenge Content: Multiple Choice or Sort */}
            {challenge.answer !== 'sort' ? (
              // Multiple Choice Options
              <div className="grid grid-cols-1 gap-3 w-full max-w-md my-4">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={e => handleAnswerClick(opt, e)}
                    className="w-full py-3.5 px-5 bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-2 border-emerald-300 rounded-2xl font-bold text-sm text-emerald-900 shadow-md transition-all text-left flex items-center justify-between"
                  >
                    <span>{opt}</span>
                    <span className="text-lg">👉</span>
                  </motion.button>
                ))}
              </div>
            ) : (
              // Sort Challenge (Drag and Drop)
              <div className="w-full h-72 relative my-2">
                {/* Bins */}
                <div className="flex justify-around absolute top-2 left-0 right-0 z-0">
                  {challenge.bins?.map((bin, idx) => {
                    const binWidth = challenge.bins?.length === 2 ? 260 : 180;
                    const binX = idx === 0 ? 30 : idx === 1 ? 310 : 210;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={binX}
                        y={10}
                        width={binWidth}
                        height={120}
                        isHovering={hoverBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable Items */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 z-10">
                  {challenge.sortItems?.map(item => {
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
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
