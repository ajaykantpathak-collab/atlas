'use client';

/**
 * PlantUsesGame — Learn about edible plant parts, medicinal plants, and the Sun as energy source
 *
 * CISCE Nodes: c3_bio_018 (Edible parts of plants), c3_bio_019 (Medicinal plants), c3_bio_020 (Sun as energy source)
 *
 * ELI5: "Plants are our green friends! We eat different parts of them: roots like carrots,
 *   stems like potatoes, leaves like spinach, flowers like cauliflower, fruits like mangoes,
 *   and seeds like rice. Some plants like neem, tulsi, and aloe vera are natural medicines!
 *   And the Sun gives plants energy to make food using water and air in their green leaves!"
 *
 * Misconceptions:
 *   1. "Potato is a root because it grows underground" → "No! Potato is an underground stem (tuber) with buds called eyes!"
 *   2. "Tomato is a vegetable" → "No! In biology, a tomato is a fruit because it develops from a flower and contains seeds!"
 *   3. "Spices are only for taste" → "No! Spices like turmeric and cloves also preserve food and fight germs!"
 *   4. "Plants eat soil for food" → "No! Plants make their own food in their leaves using sunlight, water, and carbon dioxide!"
 *   5. "Honey is made by bees from nowhere" → "No! Honey is a plant product made by bees from flower nectar!"
 *
 * Mascot: Herbalist Heena — friendly herbalist with a basket of herbs, a mortar and pestle, and dried flowers in her hair.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── GameScreen Type Definition ───────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_part' | 'identify_medicinal' | 'identify_sun' | 'sort_parts' | 'sort_medicinal' | 'sort_needs' | 'sort_products';

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

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Edible Plant Parts! 🥕',
    text: 'We eat different parts of plants! Roots (carrot, radish), stems (potato, ginger), leaves (spinach, cabbage), flowers (cauliflower), fruits (apple, tomato), and seeds (rice, wheat, pulses)!',
    emoji: '🥕',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'We eat different parts of plants! Roots like carrot, stems like potato, leaves like spinach, flowers like cauliflower, fruits like apple, and seeds like rice!',
  },
  {
    title: 'Roots vs. Underground Stems! 🥔',
    text: 'Be careful! A carrot is a true root. But a potato is an underground stem (tuber) because it has small buds or "eyes" that grow into new plants!',
    emoji: '🥔',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'Be careful! A carrot is a true root. But a potato is an underground stem, because it has small buds called eyes that can grow into new plants!',
  },
  {
    title: 'Medicinal Plants & Products! 🌿',
    text: 'Plants are our natural pharmacy! Tulsi leaves cure coughs. Neem leaves fight germs and skin problems. Aloe vera gel cools burns. Spices like turmeric preserve food and heal wounds!',
    emoji: '🌿',
    bgColor: 'from-teal-500 to-emerald-700',
    spoken: 'Plants are our natural pharmacy! Tulsi leaves cure coughs. Neem leaves fight germs and skin problems. Aloe vera gel cools burns. Turmeric heals wounds!',
  },
  {
    title: 'The Sun — Plant Energy! ☀️',
    text: 'The sun is the great energy source! Green leaves use sunlight, water from roots, and carbon dioxide from air to make food (glucose) and give us oxygen. This is photosynthesis!',
    emoji: '☀️',
    bgColor: 'from-yellow-400 to-amber-500',
    spoken: 'The sun is the great energy source! Green leaves use sunlight, water, and carbon dioxide to make food and give us oxygen. This is photosynthesis!',
  },
  {
    title: 'Useful Plant Products! 🪵',
    text: 'Plants give us more than food! Wood and bamboo give us paper, rubber trees give sap for rubber erasers, flowers give nectar for honey, and cotton plants give cloth!',
    emoji: '🪵',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'Plants give us more than food! Wood gives paper, rubber trees give rubber, flowers give nectar for honey, and cotton gives cloth!',
  },
];

// ─── Challenges Array (8 progressive) ─────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_part',
    question: 'Which part of a CARROT do we eat?',
    answer: 'Root',
    options: ['Root', 'Leaf', 'Seed'],
    hint: 'Carrots grow underground in the soil and absorb water and minerals!',
    misconception: 'A carrot is a ROOT that grows underground and stores food for the plant! It is not a leaf or a seed!',
  },
  {
    type: 'identify_part',
    question: 'Which part of SPINACH do we eat?',
    answer: 'Leaf',
    options: ['Root', 'Leaf', 'Flower'],
    hint: 'Spinach is flat, green, and food-making!',
    misconception: 'Spinach is a green LEAF that we cook or eat raw! It is the flat food-making part of the plant.',
  },
  {
    type: 'sort_parts',
    question: 'Drag each vegetable to the correct plant part we eat!',
    answer: 'sort',
    options: [],
    hint: 'Carrot = root, Potato = stem, Spinach = leaf, Cauliflower = flower!',
    misconception: 'Remember: Potato is an underground stem (not a root!) because it has buds. Carrot is a root. Spinach is a leaf. Cauliflower is a tight bunch of flowers!',
    sortItems: [
      { id: 'carrot', label: 'Carrot', icon: 'root', correctBin: 'root' },
      { id: 'potato', label: 'Potato', icon: 'stem', correctBin: 'stem' },
      { id: 'spinach', label: 'Spinach', icon: 'leaf', correctBin: 'leaf' },
      { id: 'cauliflower', label: 'Cauliflower', icon: 'flower', correctBin: 'flower' },
    ],
    bins: [
      { id: 'root', label: 'Root 🥕', color: '#F97316' },
      { id: 'stem', label: 'Stem 🥔', color: '#D97706' },
      { id: 'leaf', label: 'Leaf 🥬', color: '#10B981' },
      { id: 'flower', label: 'Flower 🥦', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify_medicinal',
    question: 'Which plant is used for burns and skin healing?',
    answer: 'Aloe vera',
    options: ['Aloe vera', 'Rose', 'Grass'],
    hint: 'It has thick, fleshy leaves filled with cool gel!',
    misconception: 'Aloe vera gel is applied on burns and cuts to cool and soothe the skin! Roses and grass are not medicinal cures for burns.',
  },
  {
    type: 'sort_medicinal',
    question: 'Drag each medicinal plant to its correct health use!',
    answer: 'sort',
    options: [],
    hint: 'Neem = skin & germs, Tulsi = cough & cold, Aloe vera = burns!',
    misconception: 'Neem is antiseptic for skin, Tulsi leaves help coughs and colds, and Aloe vera cools burns!',
    sortItems: [
      { id: 'neem', label: 'Neem', icon: 'neem', correctBin: 'skin' },
      { id: 'tulsi', label: 'Tulsi', icon: 'tulsi', correctBin: 'cold' },
      { id: 'aloe', label: 'Aloe vera', icon: 'aloe', correctBin: 'burns' },
    ],
    bins: [
      { id: 'skin', label: 'Skin & Germs 🌿', color: '#059669' },
      { id: 'cold', label: 'Cough & Cold 🍃', color: '#2563EB' },
      { id: 'burns', label: 'Burns & Cuts ✨', color: '#D97706' },
    ],
  },
  {
    type: 'identify_sun',
    question: 'What process do plants use sunlight for?',
    answer: 'Photosynthesis',
    options: ['Photosynthesis', 'Digestion', 'Hibernation'],
    hint: 'It is the wonderful food-making process in green leaves!',
    misconception: 'Photosynthesis is how plants use sunlight, water, and air to make their own food (glucose)! Animals digest food, they don’t do photosynthesis.',
  },
  {
    type: 'sort_needs',
    question: 'Drag each item into what plants NEED for photosynthesis vs what they PRODUCE!',
    answer: 'sort',
    options: [],
    hint: 'Plants need sunlight, water, CO2! They produce oxygen and food (glucose)!',
    misconception: 'Plants NEED sunlight, water, and carbon dioxide from the air. They PRODUCE oxygen for us to breathe and food (glucose) for themselves!',
    sortItems: [
      { id: 'sunlight', label: 'Sunlight', icon: 'sun', correctBin: 'need' },
      { id: 'water', label: 'Water', icon: 'water', correctBin: 'need' },
      { id: 'oxygen', label: 'Oxygen', icon: 'oxygen', correctBin: 'produce' },
      { id: 'sugar', label: 'Food (Glucose)', icon: 'leaf-sun', correctBin: 'produce' },
    ],
    bins: [
      { id: 'need', label: 'Plant NEEDS ☀️', color: '#EAB308' },
      { id: 'produce', label: 'Plant PRODUCES 🍃', color: '#10B981' },
    ],
  },
  {
    type: 'sort_products',
    question: 'Drag each plant product to its correct source!',
    answer: 'sort',
    options: [],
    hint: 'Paper = wood/bamboo, Rubber = rubber tree, Honey = flower nectar!',
    misconception: 'Paper comes from wood pulp, rubber comes from tree sap, and honey comes from flower nectar gathered by bees!',
    sortItems: [
      { id: 'paper', label: 'Paper', icon: 'wood', correctBin: 'wood-bin' },
      { id: 'rubber', label: 'Rubber', icon: 'rubber', correctBin: 'rubber-bin' },
      { id: 'honey', label: 'Honey', icon: 'honey', correctBin: 'honey-bin' },
    ],
    bins: [
      { id: 'wood-bin', label: 'Wood / Bamboo 🪵', color: '#78350F' },
      { id: 'rubber-bin', label: 'Rubber Tree 🌳', color: '#4B5563' },
      { id: 'honey-bin', label: 'Flower Nectar 🍯', color: '#D97706' },
    ],
  },
];

// ─── Herbalist Heena Mascot ───────────────────────────────────

function HerbalistHeena({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
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
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="heena-dress" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="heena-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Basket of herbs */}
          <ellipse cx="20" cy="70" rx="12" ry="8" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
          <path d="M10 68 Q15 60 20 62 Q25 60 30 68" fill="#10B981" />
          {/* Body / Dress */}
          <path d="M30 45 L45 45 L52 75 L23 75 Z" fill="url(#heena-dress)" stroke="#065F46" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37.5" cy="28" r="14" fill="url(#heena-skin)" stroke="#D97706" strokeWidth="1.5" />
          {/* Hair & Flowers in hair */}
          <path d="M23 26 C23 15, 52 15, 52 26 C52 35, 48 38, 48 38 L27 38 C27 38, 23 35, 23 26 Z" fill="#451A03" />
          <circle cx="30" cy="18" r="3" fill="#EC4899" />
          <circle cx="45" cy="19" r="3" fill="#FACC15" />
          {/* Eyes */}
          <circle cx="33" cy="27" r="2" fill="#1F2937" />
          <circle cx="42" cy="27" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M34 32 Q37.5 35 41 32" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Apron */}
          <path d="M30 50 L45 50 L47 73 L28 73 Z" fill="white" stroke="#D1D5DB" strokeWidth="1" />
          {/* Mortar & Pestle in hand */}
          <rect x="52" y="60" width="12" height="10" fill="#9CA3AF" rx="2" stroke="#4B5563" strokeWidth="1" />
          <line x1="58" y1="55" x2="60" y2="62" stroke="#4B5563" strokeWidth="2" strokeLinecap="round" />
          {/* Feet */}
          <ellipse cx="30" cy="80" rx="5" ry="3" fill="#1F2937" />
          <ellipse cx="45" cy="80" rx="5" ry="3" fill="#1F2937" />
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

// ─── Custom SVG Scene Background ──────────────────────────────

function KitchenGardenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#365314" />
          </linearGradient>
        </defs>
        {/* Sky */}
        <rect width={width} height={height * 0.7} fill="url(#sky-grad)" />
        {/* Sun */}
        <g transform="translate(80, 60)">
          <circle cx="0" cy="0" r="28" fill="#FEF08A" opacity="0.9" />
          <circle cx="0" cy="0" r="20" fill="#EAB308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="0" y1="0" x2={32 * Math.cos(angle * Math.PI / 180)} y2={32 * Math.sin(angle * Math.PI / 180)} stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
          ))}
        </g>
        {/* Clouds */}
        <g fill="white" opacity="0.8">
          <ellipse cx="220" cy="50" rx="35" ry="18" />
          <ellipse cx="245" cy="45" rx="25" ry="15" />
          <ellipse cx="550" cy="80" rx="40" ry="20" />
        </g>
        {/* Ground */}
        <rect y={height * 0.7} width={width} height={height * 0.3} fill="url(#ground-grad)" />
        {/* Garden fence */}
        {Array.from({ length: Math.floor(width / 40) }).map((_, i) => (
          <g key={i} transform={`translate(${i * 40}, ${height * 0.62})`}>
            <rect x="5" y="0" width="8" height="35" fill="#D97706" rx="2" />
            <polygon points="5,0 9,-8 13,0" fill="#B45309" />
          </g>
        ))}
        <rect y={height * 0.67} width={width} height="6" fill="#92400E" />
      </svg>
    </div>
  );
}

// ─── Custom Topic SVG Icons ───────────────────────────────────

function CarrotIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 L20 5 L25 20 Z" fill="#16A34A" />
      <path d="M30 15 L40 6 L35 22 Z" fill="#22C55E" />
      <path d="M30 18 C38 25, 42 35, 30 52 C18 35, 22 25, 30 18 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5" />
      <line x1="25" y1="28" x2="35" y2="28" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="23" y1="36" x2="37" y2="36" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="26" y1="44" x2="34" y2="44" stroke="#EA580C" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PotatoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="18" ry="14" fill="#D97706" stroke="#92400E" strokeWidth="1.5" />
      <circle cx="22" cy="26" r="1.5" fill="#78350F" />
      <circle cx="34" cy="24" r="1.5" fill="#78350F" />
      <circle cx="38" cy="36" r="1.5" fill="#78350F" />
      <circle cx="25" cy="38" r="1.5" fill="#78350F" />
      <circle cx="30" cy="30" r="1" fill="#78350F" />
    </svg>
  );
}

function SpinachIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 52 L30 35" stroke="#15803D" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M30 35 C15 30, 8 18, 20 12 C28 8, 30 20, 30 35 Z" fill="#22C55E" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M30 35 C45 30, 52 18, 40 12 C32 8, 30 20, 30 35 Z" fill="#16A34A" stroke="#15803D" strokeWidth="1.5" />
      <path d="M30 28 Q25 20, 20 16" stroke="#86EFAC" strokeWidth="1" fill="none" />
      <path d="M30 28 Q35 20, 40 16" stroke="#86EFAC" strokeWidth="1" fill="none" />
    </svg>
  );
}

function CauliflowerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Stalk / leaves */}
      <path d="M22 45 L30 35 L38 45 L34 52 L26 52 Z" fill="#16A34A" />
      {/* Florets */}
      <circle cx="30" cy="28" r="12" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="22" cy="32" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="38" cy="32" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="30" cy="20" r="9" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1.5" />
    </svg>
  );
}

function NeemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 52 L30 10" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      {/* Leaves alternating */}
      <path d="M30 40 Q20 38, 15 32 Q25 32, 30 40 Z" fill="#15803D" />
      <path d="M30 30 Q40 28, 45 22 Q35 22, 30 30 Z" fill="#16A34A" />
      <path d="M30 20 Q20 18, 15 12 Q25 12, 30 20 Z" fill="#22C55E" />
    </svg>
  );
}

function TulsiIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 52 L30 15" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="22" cy="28" rx="8" ry="5" fill="#10B981" transform="rotate(-30 22 28)" stroke="#047857" strokeWidth="1" />
      <ellipse cx="38" cy="28" rx="8" ry="5" fill="#10B981" transform="rotate(30 38 28)" stroke="#047857" strokeWidth="1" />
      <ellipse cx="22" cy="40" rx="8" ry="5" fill="#059669" transform="rotate(-30 22 40)" stroke="#047857" strokeWidth="1" />
      <ellipse cx="38" cy="40" rx="8" ry="5" fill="#059669" transform="rotate(30 38 40)" stroke="#047857" strokeWidth="1" />
      <circle cx="30" cy="14" r="4" fill="#8B5CF6" />
    </svg>
  );
}

function AloeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 C20 45, 10 35, 12 20 C12 30, 22 42, 30 48 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <path d="M30 50 C40 45, 50 35, 48 20 C48 30, 38 42, 30 48 Z" fill="#059669" stroke="#047857" strokeWidth="1.5" />
      <path d="M30 52 C32 40, 32 25, 30 10 C28 25, 28 40, 30 52 Z" fill="#34D399" stroke="#047857" strokeWidth="1.5" />
      {/* Spikes */}
      <path d="M14 25 L10 22 L13 28 Z" fill="#047857" />
      <path d="M46 25 L50 22 L47 28 Z" fill="#047857" />
    </svg>
  );
}

function SunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="12" fill="#EAB308" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1={30 + 16 * Math.cos(angle * Math.PI / 180)} y1={30 + 16 * Math.sin(angle * Math.PI / 180)} x2={30 + 24 * Math.cos(angle * Math.PI / 180)} y2={30 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#CA8A04" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function WaterDropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C22 22, 14 32, 14 40 C14 49, 21 54, 30 54 C39 54, 46 49, 46 40 C46 32, 38 22, 30 10 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <ellipse cx="24" cy="42" rx="4" ry="7" fill="white" opacity="0.5" transform="rotate(-20 24 42)" />
    </svg>
  );
}

function OxygenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="18" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="30" y="37" fontSize="22" fontWeight="bold" fill="#0284C7" textAnchor="middle">O₂</text>
    </svg>
  );
}

function LeafSunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 C15 45, 10 25, 25 15 C35 25, 45 35, 30 50 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      <circle cx="42" cy="18" r="10" fill="#FEF08A" stroke="#EAB308" strokeWidth="1.5" />
    </svg>
  );
}

function WoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="15" width="30" height="30" fill="#B45309" stroke="#78350F" strokeWidth="2" rx="4" />
      <line x1="15" y1="25" x2="45" y2="25" stroke="#78350F" strokeWidth="1.5" />
      <line x1="15" y1="35" x2="45" y2="35" stroke="#78350F" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="4" fill="#FEF3C7" />
    </svg>
  );
}

function RubberIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="20" width="36" height="20" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" rx="4" />
      <rect x="18" y="25" width="24" height="10" fill="#FFF1F2" rx="2" />
    </svg>
  );
}

function HoneyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 22 L40 22 L45 46 L15 46 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="30" cy="22" rx="10" ry="3" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
      <path d="M22 32 Q30 38, 38 32" stroke="#B45309" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ─── Render Sort Icon ─────────────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'root': return <CarrotIcon size={size} />;
    case 'stem': return <PotatoIcon size={size} />;
    case 'leaf': return <SpinachIcon size={size} />;
    case 'flower': return <CauliflowerIcon size={size} />;
    case 'neem': return <NeemIcon size={size} />;
    case 'tulsi': return <TulsiIcon size={size} />;
    case 'aloe': return <AloeIcon size={size} />;
    case 'sun': return <SunIcon size={size} />;
    case 'water': return <WaterDropIcon size={size} />;
    case 'oxygen': return <OxygenIcon size={size} />;
    case 'leaf-sun': return <LeafSunIcon size={size} />;
    case 'wood': return <WoodIcon size={size} />;
    case 'rubber': return <RubberIcon size={size} />;
    case 'honey': return <HoneyIcon size={size} />;
    default: return <CarrotIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-900 text-center px-1 drop-shadow-sm">{label}</span>
    </div>
  );
}

// ─── Main Component: PlantUsesGame ────────────────────────────

export interface PlantUsesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PlantUsesGame({ width = 720, height = 560, onComplete }: PlantUsesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [burstPos, setBurstPos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveringBin, setHoveringBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Initialize sort positions when challenge changes
  useEffect(() => {
    if (currentChallenge.type.startsWith('sort') && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = {
          x: 40 + idx * 135,
          y: height - 130,
        };
      });
      setItemPositions(initialPos);
      setPlacedItems({});
    }
  }, [challengeIdx, currentChallenge]);

  // Speech narration for teaching slides
  useEffect(() => {
    if (screen === 'teaching') {
      speechManager.speak(TEACHING_SLIDES[slideIdx].spoken);
    }
  }, [screen, slideIdx]);

  // Speech narration for challenges
  useEffect(() => {
    if (screen === 'play') {
      speechManager.speak(currentChallenge.question);
    }
  }, [screen, challengeIdx, currentChallenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setShowHint(true);
        setHintMessage(currentChallenge.hint);
        speechManager.speak(currentChallenge.hint);
      }
    }, 10000);
  }, [screen, showHint, currentChallenge]);

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
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Handle multiple-choice answers
  const handleAnswerSelect = (option: string) => {
    if (feedback !== null) return;
    setSelectedOption(option);
    resetInactivityTimer();

    const isCorrect = option === currentChallenge.answer;
    if (isCorrect) {
      audioManager.play('success');
      setFeedback('correct');
      setStars(prev => prev + 1);
      setBurstPos({ x: width / 2, y: height / 2 });
      speechManager.speak('Correct! Great job!');

      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
        setBurstPos(null);
        if (challengeIdx < CHALLENGES.length - 1) {
          setChallengeIdx(prev => prev + 1);
        } else {
          setShowConfetti(true);
          setShowSuccessBanner(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          speechManager.speak('Fantastic! You completed all plant challenges!');
          if (onComplete) onComplete(finalScore);
        }
      }, 1800);
    } else {
      audioManager.play('error');
      setFeedback('incorrect');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);

      setTimeout(() => {
        setFeedback(null);
        setSelectedOption(null);
      }, 2500);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const bins = currentChallenge.bins;
    if (!bins || !currentChallenge.sortItems) return false;

    // Check bin drop zones
    const binWidth = 140;
    const binHeight = 100;
    const binY = 140;

    let droppedBinId: string | null = null;
    bins.forEach((bin, idx) => {
      const binX = 50 + idx * 160;
      if (x + 55 >= binX && x + 55 <= binX + binWidth && y + 47 >= binY && y + 47 <= binY + binHeight) {
        droppedBinId = bin.id;
      }
    });

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item || !droppedBinId) {
      audioManager.play('drop-wrong');
      return false;
    }

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setBurstPos({ x: width / 2, y: height / 2 });
        speechManager.speak('Wonderful sorting! All correct!');

        setTimeout(() => {
          setBurstPos(null);
          if (challengeIdx < CHALLENGES.length - 1) {
            setChallengeIdx(prev => prev + 1);
          } else {
            setShowConfetti(true);
            setShowSuccessBanner(true);
            audioManager.play('celebration');
            const finalScore = Math.max(0, 100 - errors * 5);
            speechManager.speak('Fantastic! You completed all plant challenges!');
            if (onComplete) onComplete(finalScore);
          }
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-between select-none overflow-hidden rounded-3xl shadow-2xl bg-gradient-to-b from-sky-400 to-emerald-600 font-sans"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <KitchenGardenScene width={width} height={height} />

      {/* Mascot */}
      <HerbalistHeena
        mood={feedback === 'correct' ? 'celebrate' : feedback === 'incorrect' ? 'thinking' : 'happy'}
        speaking={hintMessage || (feedback === 'incorrect' ? currentChallenge.misconception : null)}
      />

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-between p-6 bg-black/40 backdrop-blur-sm">
          <div className="w-full flex justify-between items-center text-white">
            <span className="text-lg font-extrabold tracking-wide drop-shadow">🌱 Herbalist Heena's Plant Academy</span>
            <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full">
              Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
            </span>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -20 }}
            transition={{ type: 'spring', damping: 20 }}
            className={`w-full max-w-lg p-6 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center border-4 border-white/40`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed drop-shadow bg-black/15 p-4 rounded-2xl">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          {/* Navigation */}
          <div className="w-full max-w-lg flex justify-between items-center">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2 rounded-2xl font-bold text-white shadow-lg transition-all ${slideIdx === 0 ? 'bg-gray-500/50 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-500'}`}
            >
              ⬅️ Back
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-white scale-125' : 'bg-white/40'}`} />
              ))}
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  speechManager.speak('Let us start the plant adventure game!');
                }
              }}
              className="px-6 py-2 rounded-2xl font-bold text-white bg-emerald-600 hover:bg-emerald-500 shadow-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 z-10 flex flex-col justify-between p-4">
          {/* Top Bar */}
          <div className="flex justify-between items-center bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md z-20">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-emerald-800">Challenge {challengeIdx + 1}/{CHALLENGES.length}</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
            <button
              onClick={() => {
                audioManager.play('tap');
                setHintMessage(currentChallenge.hint);
                setShowHint(true);
                speechManager.speak(currentChallenge.hint);
              }}
              className="bg-amber-400 hover:bg-amber-300 text-amber-900 font-bold px-3 py-1 rounded-xl text-xs shadow"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Card */}
          <div className="my-2 bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg text-center max-w-xl mx-auto w-full z-20 border-2 border-emerald-300">
            <h3 className="text-base font-black text-gray-900">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Body */}
          <div className="relative flex-1 flex flex-col items-center justify-center">
            {/* Multiple Choice Challenges */}
            {!currentChallenge.type.startsWith('sort') && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md z-20">
                {currentChallenge.options.map((option, idx) => {
                  const isSelected = selectedOption === option;
                  const isCorrectAnswer = option === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-emerald-50 text-gray-800 border-2 border-emerald-300';
                  if (feedback !== null) {
                    if (isCorrectAnswer) btnBg = 'bg-emerald-500 text-white border-2 border-emerald-600 scale-105';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-2 border-rose-600';
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleAnswerSelect(option)}
                      className={`p-4 rounded-2xl font-black text-base shadow-lg transition-all ${btnBg}`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Sort Challenges */}
            {currentChallenge.type.startsWith('sort') && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-full flex flex-col justify-between" style={{ minHeight: 280 }}>
                {/* Bins */}
                <div className="flex justify-around px-4 pt-2 z-20">
                  {currentChallenge.bins.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={50 + idx * 160}
                      y={10}
                      width={140}
                      height={100}
                      isHovering={hoveringBin === bin.id}
                    />
                  ))}
                </div>

                {/* Draggable Items */}
                <div className="relative w-full h-32">
                  {currentChallenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 50, y: 150 };
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
        </div>
      )}

      {/* ─── FEEDBACK & MODALS ─── */}
      {showHint && hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => {
            setShowHint(false);
            setHintMessage(null);
          }}
        />
      )}

      {burstPos && (
        <SparkleBurst
          x={burstPos.x}
          y={burstPos.y}
          onComplete={() => setBurstPos(null)}
        />
      )}

      {showConfetti && (
        <Confetti
          onComplete={() => setShowConfetti(false)}
        />
      )}

      {showSuccessBanner && (
        <SuccessBanner
          message="🌟 Amazing Job! You are a Plant Science Expert! 🌿"
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}
    </div>
  );
}
