'use client';

/**
 * PlantsGame — Learn about plants: parts, products, and modifications
 *
 * CISCE Nodes: c2_bio_010 (Parts of plants), c2_bio_011 (Plant products and uses),
 *              c2_bio_012 (Plant modifications)
 * Enrichment: c2_biology_enrichment_part10-12
 *
 * ELI5: "A plant is like a little person with special body parts. Its roots are
 *   its feet that stay in the mud and drink water. Its stem is its back and its
 *   straw tube. Its leaves are green plates that make food in the sun. Its
 *   flower is pretty so insects visit it. Its fruit is a bag that keeps the seed
 *   safe. And the seed is a tiny baby that can grow into a new plant!"
 *
 * Misconceptions (from enrichment):
 *   1. "Carrot is a stem because it is thick and underground" → "No! Carrot is a
 *      modified ROOT that tapers down and stores food. Roots do not have buds!"
 *   2. "Potato is a root because it grows in the soil" → "No! Potato is a modified
 *      STEM (tuber) because it has eyes which are buds that grow new shoots!"
 *   3. "Leaves are only for decoration" → "No! Leaves are food factories that make
 *      food using sunlight through photosynthesis!"
 *   4. "Flowers are just for beauty" → "No! Flowers attract insects to help make
 *      seeds, and flowers grow into fruits!"
 *   5. "Onion is a root" → "No! Onion is a modified stem (bulb) with fleshy layers
 *      that store food!"
 *
 * Story: "Help Mali Kavya the gardener explore plant parts, sort plant products,
 *   and discover underground food stores! Become a Plant Expert!"
 *
 * Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG garden scene background (sky, sun, soil ground, watering can, pots)
 * - Custom SVG plant component objects (Root, Stem, Leaf, Flower, Fruit, Seed, Carrot, Potato, etc.)
 * - Custom SVG gardener mascot (Mali Kavya) with mood states and speech bubble
 * - Drag-and-drop: drag items into sorting bins
 * - 8 progressive challenges: identify parts → identify functions → sort products → sort modifications
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity via useRef timer
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
    title: 'Parts of a Plant! 🌱',
    text: 'Every plant has six main parts: Root (holds plant & drinks water), Stem (carries water like a straw), Leaf (makes food in sun), Flower (makes seeds), Fruit (protects seeds), and Seed (grows new plant)!',
    emoji: '🌱',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'Every plant has six main parts: Root, Stem, Leaf, Flower, Fruit, and Seed!'
  },
  {
    title: 'Roots and Stems! 🌿',
    text: 'Roots stay hidden in soil and hold the plant firm while drinking water. The stem stands tall like a pillar and carries water from roots up to the leaves!',
    emoji: '🌿',
    bgColor: 'from-green-500 to-teal-600',
    spoken: 'Roots hold the plant and drink water. The stem carries water up to the leaves!'
  },
  {
    title: 'Leaves Make Food! 🍃',
    text: 'Leaves are flat and green because of chlorophyll! They cook food for the plant using sunlight, air, and water. This special cooking is called photosynthesis!',
    emoji: '🍃',
    bgColor: 'from-teal-400 to-emerald-500',
    spoken: 'Leaves make food for the plant using sunlight through photosynthesis!'
  },
  {
    title: 'Wonderful Plant Products! 🍎',
    text: 'Plants give us so many useful things! We get fruits and vegetables for food, timber and wood for furniture, cotton for clothes, rubber for erasers, and neem for medicine!',
    emoji: '🍎',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Plants give us food, wood, cotton, rubber, and medicine!'
  },
  {
    title: 'Underground Food Stores! 🥔',
    text: 'Some plants store food underground! A potato and ginger are modified stems with buds. A carrot and radish are modified roots that taper down with no buds!',
    emoji: '🥔',
    bgColor: 'from-yellow-500 to-amber-600',
    spoken: 'Potatoes and ginger are modified stems. Carrots and radishes are modified roots!'
  },
];

// ─── Types ────────────────────────────────────────────────────

type ChallengeType = 'identify_part' | 'identify_function' | 'identify_leaf' | 'sort_functions' | 'identify_carrot' | 'identify_potato' | 'sort_products' | 'sort_modifications';

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

// ─── Challenges (8 progressive: identify parts → sort functions → sort products → sort modifications) ──

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_part',
    question: 'Which part of the plant stays underground and holds it firmly in the soil?',
    answer: 'Root',
    options: ['Root', 'Leaf', 'Flower'],
    hint: 'Think: what is hidden under the soil like an anchor?',
    misconception: 'The ROOT is hidden under the soil and grips the plant firmly! Leaves are up in the air catching sunlight, and flowers are colourful to attract insects!',
  },
  {
    type: 'identify_function',
    question: 'Which part of the plant carries water from roots up to the leaves like a pipe?',
    answer: 'Stem',
    options: ['Stem', 'Seed', 'Fruit'],
    hint: 'Think: what stands up tall and acts as the plant\'s highway and pillar?',
    misconception: 'The STEM is the plant\'s pillar and highway! It holds leaves up to sunlight and carries water from roots to all parts of the plant.',
  },
  {
    type: 'identify_leaf',
    question: 'What is the main job of the green leaf?',
    answer: 'Make food using sunlight',
    options: ['Make food using sunlight', 'Absorb water from soil', 'Grow new roots'],
    hint: 'Think: leaves are green food factories containing chlorophyll!',
    misconception: 'The leaf\'s main job is making food using sunlight through photosynthesis! Absorbing water is the job of the roots, not the leaves.',
  },
  {
    type: 'sort_functions',
    question: 'Drag each plant part to its main job!',
    answer: 'sort',
    options: [],
    hint: 'Root holds and drinks, Stem carries water, Leaf makes food, Flower makes seeds!',
    misconception: 'Each part has a special job: Root grips soil and drinks water; Stem carries water up; Leaf makes food; Flower attracts insects to make seeds!',
    sortItems: [
      { id: 'root-item', label: 'Root', icon: 'root', correctBin: 'root-bin' },
      { id: 'stem-item', label: 'Stem', icon: 'stem', correctBin: 'stem-bin' },
      { id: 'leaf-item', label: 'Leaf', icon: 'leaf', correctBin: 'leaf-bin' },
      { id: 'flower-item', label: 'Flower', icon: 'flower', correctBin: 'flower-bin' },
    ],
    bins: [
      { id: 'root-bin', label: 'Holds plant & absorbs water', color: '#8D6E63' },
      { id: 'stem-bin', label: 'Carries water & food', color: '#795548' },
      { id: 'leaf-bin', label: 'Makes food (Photosynthesis)', color: '#4CAF50' },
      { id: 'flower-bin', label: 'Attracts insects & makes seeds', color: '#E91E63' },
    ],
  },
  {
    type: 'identify_carrot',
    question: 'A carrot is thick, orange, and grows underground. What plant part is it really?',
    answer: 'Modified root',
    options: ['Modified root', 'Modified stem', 'Leaf'],
    hint: 'Think: does a carrot have buds or eyes? No, it tapers down like a root!',
    misconception: 'A carrot is a modified ROOT! Even though it is thick and underground, it tapers down and has NO buds or eyes. Stems have buds, roots do not!',
  },
  {
    type: 'identify_potato',
    question: 'A potato grows underground and has little pits called eyes. What plant part is it?',
    answer: 'Modified stem',
    options: ['Modified stem', 'Modified root', 'Fruit'],
    hint: 'Think: those eyes on a potato are buds that can grow new shoots!',
    misconception: 'A potato is a modified STEM (tuber)! Its eyes are buds that can grow into new shoots. Roots do not have buds or eyes!',
  },
  {
    type: 'sort_products',
    question: 'Drag each plant product to what it gives us!',
    answer: 'sort',
    options: [],
    hint: 'Cotton for clothes, Neem for medicine, Timber for wood, Mustard for oil!',
    misconception: 'Plants provide diverse gifts: Cotton gives cloth, Neem leaves give medicine, Tree trunks give timber wood, Mustard seeds give cooking oil!',
    sortItems: [
      { id: 'clothes-item', label: 'Cotton Shirt', icon: 'clothes', correctBin: 'clothes-bin' },
      { id: 'med-item', label: 'Neem Medicine', icon: 'medicine', correctBin: 'med-bin' },
      { id: 'wood-item', label: 'Wooden Chair', icon: 'wood', correctBin: 'wood-bin' },
      { id: 'oil-item', label: 'Mustard Oil', icon: 'oil', correctBin: 'oil-bin' },
    ],
    bins: [
      { id: 'clothes-bin', label: 'Clothes (Cotton)', color: '#3B82F6' },
      { id: 'med-bin', label: 'Medicine (Neem)', color: '#10B981' },
      { id: 'wood-bin', label: 'Wood & Furniture', color: '#8B5CF6' },
      { id: 'oil-bin', label: 'Oil (Seeds)', color: '#F59E0B' },
    ],
  },
  {
    type: 'sort_modifications',
    question: 'Drag each vegetable! Is it a modified root or a modified stem?',
    answer: 'sort',
    options: [],
    hint: 'Carrot & Radish = roots (tapering, no buds)! Potato & Ginger = stems (tubers/rhizomes with buds)!',
    misconception: 'Roots store food by tapering (carrot, radish)! Stems store food with buds or bulb layers (potato, ginger, onion)!',
    sortItems: [
      { id: 'carrot-mod', label: 'Carrot', icon: 'carrot', correctBin: 'root-mod-bin' },
      { id: 'radish-mod', label: 'Radish', icon: 'radish', correctBin: 'root-mod-bin' },
      { id: 'potato-mod', label: 'Potato', icon: 'potato', correctBin: 'stem-mod-bin' },
      { id: 'ginger-mod', label: 'Ginger', icon: 'ginger', correctBin: 'stem-mod-bin' },
    ],
    bins: [
      { id: 'root-mod-bin', label: 'Modified Root 🥕', color: '#F97316' },
      { id: 'stem-mod-bin', label: 'Modified Stem 🥔', color: '#84CC16' },
    ],
  },
];

// ─── Mali Kavya Mascot (Friendly Gardener with Straw Hat & Sunflower Pin) ─��

function MaliKavya({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-green-300"
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
            <linearGradient id="face-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFDCB6" />
              <stop offset="100%" stopColor="#F5C297" />
            </linearGradient>
            <linearGradient id="apron-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
          </defs>

          {/* Straw Hat Brim */}
          <ellipse cx="37" cy="28" rx="30" ry="8" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37" cy="36" r="16" fill="url(#face-grad)" stroke="#D97706" strokeWidth="1" />
          {/* Straw Hat Crown */}
          <path d="M22 28 C22 15, 52 15, 52 28 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <rect x="22" y="26" width="30" height="4" fill="#EF4444" /> {/* Hat ribbon */}

          {/* Eyes */}
          <circle cx="31" cy="34" r="2.5" fill="#1F2937" />
          <circle cx="43" cy="34" r="2.5" fill="#1F2937" />
          <circle cx="32" cy="33" r="1" fill="white" />
          <circle cx="44" cy="33" r="1" fill="white" />

          {/* Cheeks */}
          <ellipse cx="28" cy="39" r="3" fill="#FCA5A5" opacity="0.6" />
          <ellipse cx="46" cy="39" r="3" fill="#FCA5A5" opacity="0.6" />

          {/* Smile */}
          <path d="M33 42 Q37 46 41 42" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Green Apron body */}
          <path d="M25 50 L49 50 L53 82 L21 82 Z" fill="url(#apron-grad)" stroke="#15803D" strokeWidth="1.5" />

          {/* Sunflower Pin on Apron */}
          <circle cx="37" cy="62" r="6" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
          <circle cx="37" cy="62" r="2.5" fill="#78350F" />
          {[0, 60, 120, 180, 240, 300].map(a => (
            <ellipse key={a} cx={37 + 5 * Math.cos(a * Math.PI / 180)} cy={62 + 5 * Math.sin(a * Math.PI / 180)} rx="2" ry="1" fill="#FEF08A" transform={`rotate(${a} 37 62)`} />
          ))}

          {/* Trowel in hand (left) */}
          <path d="M12 55 L20 62 L18 64 L10 57 Z" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1" />
          <line x1="8" y1="58" x2="14" y2="64" stroke="#92400E" strokeWidth="2.5" strokeLinecap="round" />
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

// ─── Garden Scene Background ──────────────────────────────────

function GardenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF08A 70%, #86EFAC 100%)' }} />
      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FACC15" opacity="0.9" />
          <circle cx="27.5" cy="27.5" r="11" fill="#EAB308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          ))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/4 opacity-80" animate={{ x: [0, 35, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="75" height="35" viewBox="0 0 75 35">
          <ellipse cx="24" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="44" cy="15" rx="22" ry="14" fill="white" />
          <ellipse cx="56" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>
      {/* Soil ground at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #16A34A 30%, #78350F 35%, #451A03 100%)' }} />
      {/* Little flowers on ground */}
      <div className="absolute bottom-24 left-10 opacity-90">
        <svg width="24" height="30" viewBox="0 0 24 30">
          <line x1="12" y1="30" x2="12" y2="15" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="5" fill="#EC4899" />
          <circle cx="12" cy="12" r="2" fill="#FACC15" />
        </svg>
      </div>
      <div className="absolute bottom-24 left-36 opacity-90">
        <svg width="24" height="30" viewBox="0 0 24 30">
          <line x1="12" y1="30" x2="12" y2="15" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="5" fill="#3B82F6" />
          <circle cx="12" cy="12" r="2" fill="#FACC15" />
        </svg>
      </div>
      <div className="absolute bottom-24 right-20 opacity-90">
        <svg width="24" height="30" viewBox="0 0 24 30">
          <line x1="12" y1="30" x2="12" y2="15" stroke="#15803D" strokeWidth="2.5" />
          <circle cx="12" cy="12" r="5" fill="#A855F7" />
          <circle cx="12" cy="12" r="2" fill="#FACC15" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom Plant Component SVG Icons ─────────────────────────

function RootIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L30 25" stroke="#2E7D32" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 25 Q30 40, 20 50 M30 25 Q30 38, 40 50 M30 32 Q22 42, 12 48 M30 32 Q38 42, 48 48" stroke="#8D6E63" strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="25" r="5" fill="#4CAF50" />
    </svg>
  );
}

function StemIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="8" width="8" height="44" fill="#4CAF50" rx="3" stroke="#2E7D32" strokeWidth="1.5" />
      <path d="M26 20 L15 14 M34 35 L45 29" stroke="#388E3C" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="13" cy="13" rx="7" ry="4" fill="#81C784" />
      <ellipse cx="47" cy="28" rx="7" ry="4" fill="#81C784" />
    </svg>
  );
}

function LeafIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 50 Q30 40, 50 10 Q30 15, 10 50 Z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5" />
      <path d="M10 50 Q28 35, 50 10" stroke="#81C784" strokeWidth="2" fill="none" />
      <path d="M25 38 L32 30 M33 26 L42 18 M20 42 L28 36" stroke="#81C784" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function FlowerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="30" y1="30" x2="30" y2="52" stroke="#388E3C" strokeWidth="3.5" strokeLinecap="round" />
      <circle cx="30" cy="30" r="7" fill="#F59E0B" />
      {[0, 60, 120, 180, 240, 300].map(a => (
        <ellipse key={a} cx={30 + 12 * Math.cos(a * Math.PI / 180)} cy={30 + 12 * Math.sin(a * Math.PI / 180)} rx="8" ry="5" fill="#EC4899" transform={`rotate(${a} 30 30)`} />
      ))}
      <circle cx="30" cy="30" r="5" fill="#FACC15" />
    </svg>
  );
}

function FruitIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 12 Q33 18, 30 22" stroke="#4B5563" strokeWidth="2" fill="none" />
      <path d="M30 12 C18 12, 12 25, 15 38 C18 48, 42 48, 45 38 C48 25, 42 12, 30 12 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      <ellipse cx="23" cy="28" rx="4" ry="7" fill="#FDBA74" opacity="0.7" />
    </svg>
  );
}

function SeedIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="12" ry="16" fill="#854D0E" stroke="#713F12" strokeWidth="1.5" />
      <path d="M30 22 Q25 12, 20 10 M30 22 Q35 12, 40 8" stroke="#4ADE80" strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="20" cy="10" rx="3" ry="2" fill="#4ADE80" />
      <ellipse cx="40" cy="8" rx="3" ry="2" fill="#4ADE80" />
    </svg>
  );
}

function CarrotIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 10 L30 16 L38 10" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M22 16 L38 16 L33 48 L27 48 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      <line x1="28" y1="22" x2="32" y2="24" stroke="#EA580C" strokeWidth="1.5" />
      <line x1="27" y1="32" x2="33" y2="34" stroke="#EA580C" strokeWidth="1.5" />
      <line x1="28" y1="42" x2="32" y2="44" stroke="#EA580C" strokeWidth="1.5" />
    </svg>
  );
}

function RadishIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M24 12 L30 18 L36 12" stroke="#22C55E" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="30" cy="35" r="14" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" />
      <path d="M30 49 L30 56" stroke="#F43F5E" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function PotatoIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="16" ry="12" fill="#A16207" stroke="#713F12" strokeWidth="1.5" />
      <circle cx="24" cy="28" r="1.5" fill="#713F12" />
      <circle cx="35" cy="35" r="1.5" fill="#713F12" />
      <circle cx="32" cy="25" r="1.5" fill="#713F12" />
    </svg>
  );
}

function GingerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 30 C15 20, 25 22, 30 28 C35 22, 45 20, 48 30 C50 40, 38 45, 30 38 C22 45, 12 40, 15 30 Z" fill="#D97706" stroke="#B45309" strokeWidth="1.5" />
      <circle cx="22" cy="27" r="2" fill="#92400E" />
      <circle cx="38" cy="27" r="2" fill="#92400E" />
      <circle cx="30" cy="35" r="2" fill="#92400E" />
    </svg>
  );
}

function ClothesIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 15 L30 12 L42 15 L48 25 L40 28 L38 48 L22 48 L20 28 L12 25 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <circle cx="30" cy="20" r="3" fill="white" />
    </svg>
  );
}

function MedicineIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="23" y="14" width="14" height="8" fill="#9CA3AF" rx="2" />
      <path d="M18 22 L42 22 L45 50 C45 52, 43 54, 40 54 L20 54 C17 54, 15 52, 15 50 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <rect x="25" y="32" width="10" height="12" fill="white" rx="1" />
      <path d="M30 35 L30 41 M27 38 L33 38" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function WoodIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="15" width="30" height="30" fill="#8B5CF6" rx="3" stroke="#6D28D9" strokeWidth="1.5" />
      <line x1="15" y1="25" x2="45" y2="25" stroke="#7C3AED" strokeWidth="2" />
      <line x1="15" y1="35" x2="45" y2="35" stroke="#7C3AED" strokeWidth="2" />
    </svg>
  );
}

function OilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M25 15 L35 15 L37 24 L23 24 Z" fill="#9CA3AF" />
      <ellipse cx="30" cy="38" rx="14" ry="16" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
      <path d="M26 34 Q30 30, 34 34" stroke="white" strokeWidth="2" fill="none" opacity="0.6" />
    </svg>
  );
}

function renderPlantIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'root': return <RootIcon size={size} />;
    case 'stem': return <StemIcon size={size} />;
    case 'leaf': return <LeafIcon size={size} />;
    case 'flower': return <FlowerIcon size={size} />;
    case 'fruit': return <FruitIcon size={size} />;
    case 'seed': return <SeedIcon size={size} />;
    case 'carrot': return <CarrotIcon size={size} />;
    case 'radish': return <RadishIcon size={size} />;
    case 'potato': return <PotatoIcon size={size} />;
    case 'ginger': return <GingerIcon size={size} />;
    case 'clothes': return <ClothesIcon size={size} />;
    case 'medicine': return <MedicineIcon size={size} />;
    case 'wood': return <WoodIcon size={size} />;
    case 'oil': return <OilIcon size={size} />;
    default: return <RootIcon size={size} />;
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
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        }`}
        style={{ width: 110, height: 95 }}
      >
        {renderPlantIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface PlantsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PlantsGame({ width = 720, height = 560, onComplete }: PlantsGameProps) {
  type GameScreen = 'teaching' | 'play';
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIndex, setSlideIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello young botanist! Let us explore wonderful plants!');

  // Sort challenge state
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});
  const challenge = CHALLENGES[challengeIndex];

  // Inactivity hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && challenge) {
        setShowHint(challenge.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setMascotSpeech('Need a little sprout of help? Check the hint!');
        speechManager.speak('Need a little sprout of help? Check the hint!');
      }
    }, 10000);
  }, [screen, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIndex, resetInactivityTimer]);

  // Reset sort item positions when challenge changes
  useEffect(() => {
    if (challenge && challenge.type.startsWith('sort') && challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number; placed: boolean }> = {};
      challenge.sortItems.forEach((item, index) => {
        initialPos[item.id] = {
          x: 60 + index * 145,
          y: height - 150,
          placed: false,
        };
      });
      setItemPositions(initialPos);
    }
  }, [challengeIndex, challenge, height]);

  // Handle multiple-choice answer selection
  const handleOptionClick = (option: string, e: React.MouseEvent) => {
    resetInactivityTimer();
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    setSparklePos({ x: rect.left + rect.width / 2, y: rect.top });

    if (option === challenge.answer) {
      audioManager.play('success');
      setScore(s => s + 15);
      setStars(s => s + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Brilliant discovery! You know your plants!');
      speechManager.speak('Brilliant discovery! You know your plants!');
      setShowSuccess('Correct! Amazing botany skills!');
    } else {
      audioManager.play('error');
      setErrors(eCount => eCount + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setShowHint(challenge.misconception);
    }
  };

  // Handle sort drag start
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Handle sort drag end
  const handleDragEnd = (id: string, x: number, y: number) => {
    resetInactivityTimer();
    if (!challenge.sortItems || !challenge.bins) return false;

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bin drop zones (simple bounding box check)
    const binWidth = width / challenge.bins.length;
    const binIndex = challenge.bins.findIndex((b, idx) => {
      const binLeft = idx * binWidth;
      const binRight = (idx + 1) * binWidth;
      return x >= binLeft - 20 && x <= binRight + 20 && y >= 200 && y <= 380;
    });

    if (binIndex !== -1) {
      const targetBin = challenge.bins[binIndex];
      if (item.correctBin === targetBin.id) {
        audioManager.play('drop-correct');
        setItemPositions(prev => ({
          ...prev,
          [id]: { x, y, placed: true },
        }));

        // Check if all items in sort challenge are placed
        const updated = { ...itemPositions, [id]: { x, y, placed: true } };
        const allPlaced = challenge.sortItems.every(i => updated[i.id]?.placed);

        if (allPlaced) {
          audioManager.play('success');
          setScore(s => { setStars(s + 1); return s + 20; });
          setMascotMood('celebrate');
          setMascotSpeech('All sorted perfectly! You are a true Plant Expert!');
          speechManager.speak('All sorted perfectly! You are a true Plant Expert!');
          setShowSuccess('Wonderful sorting! Every plant part is in its right place!');
        }
        return true;
      } else {
        audioManager.play('drop-wrong');
        setErrors(eCount => eCount + 1);
        setMascotMood('thinking');
        setMascotSpeech(challenge.misconception);
        speechManager.speak(challenge.misconception);
        setShowHint(challenge.misconception);
        return false;
      }
    }
    return false;
  };

  // Proceed to next challenge or complete game
  const handleNextChallenge = () => {
    setShowSuccess(null);
    setShowHint(null);
    setMascotMood('happy');
    setMascotSpeech('Let us grow to the next challenge!');
    speechManager.speak('Let us grow to the next challenge!');

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex(c => c + 1);
    } else {
      // Game complete
      audioManager.play('celebration');
      setShowConfetti(true);
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-sky-300 to-green-400 select-none flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Garden Scene Background */}
      <GardenScene width={width} height={height} />

      {/* Mali Kavya Mascot */}
      <MaliKavya mood={mascotMood} speaking={mascotSpeech} />

      {/* ─── TEACHING SCREEN ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-6 bg-white/85 backdrop-blur-md">
          <div className="flex items-center justify-between w-full mt-2">
            <h2 className="text-2xl font-black text-green-800 flex items-center gap-2">
              🌿 Plant Explorers Academy
            </h2>
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, idx) => (
                <div key={idx} className={`w-3 h-3 rounded-full transition-all ${idx === slideIndex ? 'bg-green-600 w-6' : 'bg-green-300'}`} />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIndex}
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center max-w-lg my-auto bg-white rounded-3xl p-6 shadow-xl border-4 border-green-300"
          >
            <span className="text-6xl mb-3">{TEACHING_SLIDES[slideIndex].emoji}</span>
            <h3 className="text-xl font-black text-green-900 mb-2">{TEACHING_SLIDES[slideIndex].title}</h3>
            <p className="text-sm font-semibold text-gray-700 leading-relaxed">{TEACHING_SLIDES[slideIndex].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-lg mb-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIndex > 0) setSlideIndex(s => s - 1);
              }}
              disabled={slideIndex === 0}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${
                slideIndex === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600'
              }`}
            >
              ⬅️ Previous
            </button>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIndex < TEACHING_SLIDES.length - 1) {
                  setSlideIndex(s => s + 1);
                } else {
                  setScreen('play');
                  audioManager.play('chime');
                  setMascotSpeech('Your garden adventure begins now!');
                  speechManager.speak('Your garden adventure begins now!');
                }
              }}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg hover:brightness-110"
            >
              {slideIndex === TEACHING_SLIDES.length - 1 ? 'Start Planting! 🌱' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────── */}
      {screen === 'play' && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full p-4">
          {/* Top Header */}
          <div className="flex items-center justify-between w-full px-2">
            <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl shadow-md border border-green-200">
              <span className="text-xs font-extrabold text-green-800">Challenge {challengeIndex + 1} / {CHALLENGES.length}</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
            <div className="bg-white/90 backdrop-blur px-3 py-1.5 rounded-2xl shadow-md border border-green-200">
              <span className="text-xs font-extrabold text-amber-700">⭐ Score: {score}</span>
            </div>
          </div>

          {/* Challenge Box */}
          <motion.div
            key={challengeIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center w-full max-w-xl my-auto bg-white/95 backdrop-blur rounded-3xl p-5 shadow-2xl border-4 border-green-300"
          >
            <h3 className="text-base font-black text-green-900 text-center mb-4">{challenge.question}</h3>

            {/* Multiple Choice Options */}
            {!challenge.type.startsWith('sort') && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {challenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={e => handleOptionClick(option, e)}
                    className="flex items-center justify-between p-3.5 bg-gradient-to-r from-emerald-50 to-green-100 border-2 border-green-400 rounded-2xl shadow-md text-green-900 font-bold text-sm hover:bg-green-200 transition-all cursor-pointer"
                  >
                    <span>{option}</span>
                    <span className="text-lg">🌱</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge Bins and Draggables */}
            {challenge.type.startsWith('sort') && challenge.bins && challenge.sortItems && (
              <div className="flex flex-col items-center w-full">
                {/* Bins Row */}
                <div className="grid grid-cols-2 gap-3 w-full mb-2">
                  {challenge.bins.map(bin => (
                    <div
                      key={bin.id}
                      className="flex flex-col items-center justify-center h-24 rounded-2xl border-4 border-dashed shadow-inner p-2"
                      style={{ borderColor: bin.color, backgroundColor: `${bin.color}15` }}
                    >
                      <span className="text-xs font-black text-center" style={{ color: bin.color }}>{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable Items Row */}
                <div className="relative w-full h-[105px] mt-2">
                  {challenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 0, y: 0, placed: false };
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
          </motion.div>

          {/* Footer Bar */}
          <div className="flex justify-between items-center w-full px-4 mb-2">
            <button
              onClick={() => {
                audioManager.play('hint');
                setShowHint(challenge.hint);
              }}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl shadow-md text-xs"
            >
              💡 Hint
            </button>

            {challenge.type.startsWith('sort') && (
              <button
                onClick={() => {
                  audioManager.play('success');
                  // Auto-complete sort challenge if child struggles
                  const updated: Record<string, { x: number; y: number; placed: boolean }> = {};
                  challenge.sortItems?.forEach(i => {
                    updated[i.id] = { x: 0, y: 0, placed: true };
                  });
                  setItemPositions(updated);
                  setScore(s => { setStars(s + 1); return s + 20; });
                  setMascotMood('celebrate');
                  setMascotSpeech('Great job sorting!');
                  speechManager.speak('Great job sorting!');
                  setShowSuccess('Wonderful sorting!');
                }}
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-md text-xs"
              >
                ✨ Auto Sort (Demo)
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ────────────────────────────── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}

      {showSuccess && (
        <SuccessBanner
          message={showSuccess}
          onComplete={handleNextChallenge}
        />
      )}

      {showHint && (
        <HintBubble
          message={showHint}
          onComplete={() => setShowHint(null)}
        />
      )}
    </div>
  );
}
