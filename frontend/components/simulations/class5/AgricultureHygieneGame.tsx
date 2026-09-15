'use client';

/**
 * AgricultureHygieneGame — Learn about plant modifications, animal habitats & feeding habits,
 * crop types (kharif/rabi), food adulteration, and personal hygiene & diseases from unclean surroundings.
 *
 * CISCE Nodes: c5_bio_019, c5_bio_020, c5_bio_021, c5_bio_022, c5_bio_023
 * Enrichment: c5_biology_enrichment_part19-23
 *
 * ELI5: "Plants modify stems, roots and leaves to survive! Animals live in habitats and are herbivores,
 * carnivores or omnivores. Farmers grow kharif crops in monsoon and rabi crops in winter. Beware of
 * food adulteration where bad things are mixed in. Wash hands, bathe and keep surroundings clean to avoid
 * diseases like diarrhoea and dengue!"
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

const TEACHING_SLIDES = [
  {
    title: "Plant Modifications: Stems, Roots & Leaves 🌱",
    text: "Plants modify their parts to survive! Potato and ginger are underground stems that store starch (they have buds called eyes). Carrot and radish are swollen storage roots. Cactus leaves become sharp spines to save water!",
    emoji: "🌱",
    bgColor: "from-emerald-400 to-green-600",
    spoken: "Plants modify their parts to survive! Potato and ginger are underground stems that store starch. Carrot and radish are swollen storage roots. Cactus leaves become sharp spines to save water!"
  },
  {
    title: "Animal Habitats & Feeding Habits 🐾",
    text: "An animal's home is its habitat (forest, desert, water, polar region). Animals are grouped by what they eat: Herbivores eat plants (cow, deer), Carnivores eat meat (lion, tiger), and Omnivores eat both (bear, human, crow)!",
    emoji: "🐾",
    bgColor: "from-amber-400 to-orange-600",
    spoken: "An animal's home is its habitat! Animals are grouped by what they eat: Herbivores eat plants like cows, carnivores eat meat like tigers, and omnivores eat both like humans!"
  },
  {
    title: "Crop Types: Kharif & Rabi 🌾",
    text: "Farmers grow crops in two main seasons! Kharif crops are sown in monsoon (June-July) and harvested in autumn (rice, maize, cotton). Rabi crops are sown in winter (October-November) and harvested in spring (wheat, gram, mustard).",
    emoji: "🌾",
    bgColor: "from-yellow-400 to-amber-600",
    spoken: "Farmers grow crops in two main seasons! Kharif crops are sown in monsoon, like rice and maize. Rabi crops are sown in winter, like wheat and mustard."
  },
  {
    title: "Food Adulteration & Common Adulterants 🔍",
    text: "Food adulteration is mixing cheap or harmful things into food for profit! Water in milk, chalk in sugar, and banned yellow dye (metanil yellow) in turmeric are dangerous adulterants that cause illness.",
    emoji: "🔍",
    bgColor: "from-red-400 to-rose-600",
    spoken: "Food adulteration is mixing cheap or harmful things into food for profit! Water in milk and chalk in sugar are dangerous adulterants that cause illness."
  },
  {
    title: "Personal Hygiene & Clean Surroundings 🧼",
    text: "Keep clean to stay healthy! Wash hands with soap before eating, bathe daily, and brush teeth twice. Keep surroundings free of stagnant water so mosquitoes don't breed and spread dengue and malaria!",
    emoji: "🧼",
    bgColor: "from-blue-400 to-indigo-600",
    spoken: "Keep clean to stay healthy! Wash hands with soap before eating and bathe daily. Keep surroundings free of stagnant water so mosquitoes don't breed and spread dengue!"
  },
];

// ─── Custom SVG Agriculture & Hygiene Icons ────────────────────

function WheatIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 52 L30 10" stroke="#CA8A04" strokeWidth="2.5" strokeLinecap="round" />
      <ellipse cx="30" cy="14" rx="4" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <ellipse cx="23" cy="22" rx="5" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(-25 23 22)" />
      <ellipse cx="37" cy="22" rx="5" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(25 37 22)" />
      <ellipse cx="23" cy="34" rx="5" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(-25 23 34)" />
      <ellipse cx="37" cy="34" rx="5" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(25 37 34)" />
    </svg>
  );
}

function RiceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 55 Q25 35, 30 10" stroke="#16A34A" strokeWidth="2" fill="none" />
      <circle cx="25" cy="18" r="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
      <circle cx="35" cy="24" r="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
      <circle cx="24" cy="32" r="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
      <circle cx="36" cy="40" r="3" fill="#FEF08A" stroke="#CA8A04" strokeWidth="1" />
      <path d="M15 50 Q30 45, 45 50" stroke="#38BDF8" strokeWidth="3" fill="none" />
    </svg>
  );
}

function TractorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="26" width="22" height="16" fill="#EF4444" rx="3" />
      <circle cx="20" cy="44" r="8" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <circle cx="45" cy="38" r="12" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <path d="M37 30 L45 30 L45 20 L37 24 Z" fill="#94A3B8" />
      <rect x="8" y="32" width="10" height="6" fill="#94A3B8" rx="2" />
    </svg>
  );
}

function VegetableBasketIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 26 L18 48 C19 52, 41 52, 42 48 L48 26 Z" fill="#A16207" stroke="#713F12" strokeWidth="2" />
      <path d="M10 26 C10 20, 50 20, 50 26 Z" fill="#CA8A04" stroke="#854D0E" strokeWidth="2" />
      <path d="M30 14 C22 14, 22 26, 30 26 C38 26, 38 14, 30 14 Z" fill="none" stroke="#713F12" strokeWidth="3" />
      <circle cx="25" cy="22" r="6" fill="#EF4444" />
      <circle cx="35" cy="22" r="5" fill="#22C55E" />
      <circle cx="30" cy="18" r="5" fill="#F97316" />
    </svg>
  );
}

function HandWashIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 30 C15 25, 25 15, 30 25 C35 15, 45 25, 40 30 C38 35, 42 45, 35 50 L25 50 C18 45, 22 35, 20 30 Z" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="30" cy="25" r="8" fill="#38BDF8" opacity="0.6" />
      <path d="M10 40 Q30 55, 50 40" stroke="#0284C7" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SoapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="20" width="36" height="22" rx="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <circle cx="22" cy="31" r="3" fill="white" opacity="0.6" />
      <circle cx="38" cy="28" r="2" fill="white" opacity="0.6" />
      <path d="M20 18 Q30 12, 40 18" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function WaterDropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 C20 22, 12 32, 12 40 C12 50, 20 56, 30 56 C40 56, 48 50, 48 40 C48 32, 40 22, 30 8 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="23" cy="38" rx="5" ry="8" fill="white" opacity="0.5" transform="rotate(-20 23 38)" />
    </svg>
  );
}

function ModifiedStemIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="18" ry="14" fill="#A16207" stroke="#713F12" strokeWidth="2" />
      <circle cx="22" cy="26" r="2" fill="#713F12" />
      <circle cx="36" cy="30" r="2.5" fill="#713F12" />
      <circle cx="30" cy="40" r="2" fill="#713F12" />
      <circle cx="40" cy="36" r="1.5" fill="#713F12" />
    </svg>
  );
}

function ModifiedRootIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M24 12 L36 12 L33 48 L27 48 Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
      <path d="M25 10 L35 10 L32 16 L28 16 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
      <line x1="28" y1="24" x2="32" y2="24" stroke="#EA580C" strokeWidth="1.5" />
      <line x1="29" y1="34" x2="31" y2="34" stroke="#EA580C" strokeWidth="1.5" />
    </svg>
  );
}

function ModifiedLeafIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 50 C15 35, 15 25, 24 12 L36 12 C45 25, 45 35, 38 50 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <line x1="30" y1="12" x2="30" y2="50" stroke="#15803D" strokeWidth="2" />
      <line x1="30" y1="20" x2="18" y2="15" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="42" y2="25" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="40" x2="18" y2="35" stroke="#DC2626" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function AdulterationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="26" cy="26" r="14" fill="none" stroke="#DC2626" strokeWidth="3" />
      <line x1="36" y1="36" x2="50" y2="50" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
      <circle cx="26" cy="26" r="6" fill="#FACC15" />
      <path d="M22 26 L26 22 L30 26 L26 30 Z" fill="#B91C1C" />
    </svg>
  );
}

function CropFieldIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="35" width="44" height="15" fill="#84CC16" rx="4" />
      <path d="M14 35 L14 20" stroke="#16A34A" strokeWidth="2.5" />
      <path d="M24 35 L24 16" stroke="#16A34A" strokeWidth="2.5" />
      <path d="M34 35 L34 20" stroke="#16A34A" strokeWidth="2.5" />
      <path d="M44 35 L44 16" stroke="#16A34A" strokeWidth="2.5" />
      <circle cx="14" cy="18" r="4" fill="#FACC15" />
      <circle cx="24" cy="14" r="4" fill="#FACC15" />
      <circle cx="34" cy="18" r="4" fill="#FACC15" />
      <circle cx="44" cy="14" r="4" fill="#FACC15" />
    </svg>
  );
}

// Map icon string to SVG component
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'wheat': return <WheatIcon size={size} />;
    case 'rice': return <RiceIcon size={size} />;
    case 'tractor': return <TractorIcon size={size} />;
    case 'basket': return <VegetableBasketIcon size={size} />;
    case 'handwash': return <HandWashIcon size={size} />;
    case 'soap': return <SoapIcon size={size} />;
    case 'water': return <WaterDropIcon size={size} />;
    case 'mod-stem': return <ModifiedStemIcon size={size} />;
    case 'mod-root': return <ModifiedRootIcon size={size} />;
    case 'mod-leaf': return <ModifiedLeafIcon size={size} />;
    case 'adulteration': return <AdulterationIcon size={size} />;
    case 'field': return <CropFieldIcon size={size} />;
    default: return <WheatIcon size={size} />;
  }
}

// ─── Challenges (8 progressive challenges) ────���───────────────

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
    question: 'Which of the following is a KHARIF crop (sown at the beginning of the monsoon)?',
    answer: 'Rice',
    options: ['Rice', 'Wheat', 'Mustard', 'Gram'],
    hint: 'Kharif crops need plenty of water and are grown during the rainy season. Think of what grows in flooded paddy fields!',
    misconception: 'Rice is a Kharif crop grown in monsoon! Wheat, mustard, and gram are Rabi crops grown in winter. Do not confuse monsoon crops with winter crops.',
  },
  {
    type: 'sort',
    question: 'Drag each crop into the correct farming season: Kharif vs Rabi!',
    answer: 'sort',
    options: [],
    hint: 'Kharif crops are sown in June-July (monsoon). Rabi crops are sown in October-November (winter)!',
    misconception: 'Remember: Rice, maize, and cotton need monsoon rain (Kharif). Wheat, gram, and mustard grow best in cool winter weather (Rabi)!',
    sortItems: [
      { id: 'rice', label: 'Rice', icon: 'rice', correctBin: 'kharif' },
      { id: 'wheat', label: 'Wheat', icon: 'wheat', correctBin: 'rabi' },
      { id: 'maize', label: 'Maize', icon: 'field', correctBin: 'kharif' },
      { id: 'mustard', label: 'Mustard', icon: 'basket', correctBin: 'rabi' },
    ],
    bins: [
      { id: 'kharif', label: 'Kharif (Monsoon) 🌧️', color: '#3B82F6' },
      { id: 'rabi', label: 'Rabi (Winter) ❄️', color: '#F97316' },
    ],
  },
  {
    type: 'identify',
    question: 'A potato is an underground plant part with small buds called "eyes". What is it?',
    answer: 'Modified stem',
    options: ['Modified stem', 'Modified root', 'Modified leaf', 'Modified flower'],
    hint: 'Even though it grows under the soil, it has buds called eyes which prove it is a stem!',
    misconception: 'A potato is a modified underground STEM, NOT a root! Because it grows underground, students often mistake it for a root, but its eyes (buds) prove it is a stem.',
  },
  {
    type: 'sort',
    question: 'Drag each plant part to its correct plant modification type!',
    answer: 'sort',
    options: [],
    hint: 'Potato & ginger are stems; carrot & radish are roots; cactus spines are leaves!',
    misconception: 'Check original plant parts carefully! Potato has buds (stem), carrot tapers and stores food (root), cactus spines protect against water loss (leaf).',
    sortItems: [
      { id: 'pot', label: 'Potato', icon: 'mod-stem', correctBin: 'stem' },
      { id: 'car', label: 'Carrot', icon: 'mod-root', correctBin: 'root' },
      { id: 'cac', label: 'Cactus Spines', icon: 'mod-leaf', correctBin: 'leaf' },
      { id: 'gin', label: 'Ginger', icon: 'mod-stem', correctBin: 'stem' },
    ],
    bins: [
      { id: 'stem', label: 'Modified Stem 🥔', color: '#A16207' },
      { id: 'root', label: 'Modified Root 🥕', color: '#F97316' },
      { id: 'leaf', label: 'Modified Leaf 🌵', color: '#22C55E' },
    ],
  },
  {
    type: 'identify',
    question: 'What is food adulteration?',
    answer: 'The deliberate mixing of cheap or harmful substances into food for profit',
    options: [
      'The deliberate mixing of cheap or harmful substances into food for profit',
      'Washing fruits and vegetables before eating',
      'Storing grain in clean silos'
    ],
    hint: 'Think about dishonest sellers adding water to milk or chalk to sugar to make more money!',
    misconception: 'Food adulteration is dishonest mixing of impurities for profit, NOT washing or storing food safely! Adulterants lower quality and cause illness.',
  },
  {
    type: 'sort',
    question: 'Drag each food item to its common adulterant!',
    answer: 'sort',
    options: [],
    hint: 'Milk has water added; turmeric has metanil yellow dye; sugar has chalk powder!',
    misconception: 'Each food has specific common adulterants: Milk is diluted with water, turmeric is coloured with banned metanil yellow, and sugar is mixed with chalk powder!',
    sortItems: [
      { id: 'milk', label: 'Milk', icon: 'water', correctBin: 'water-bin' },
      { id: 'turmeric', label: 'Turmeric', icon: 'adulteration', correctBin: 'dye-bin' },
      { id: 'sugar', label: 'Sugar', icon: 'basket', correctBin: 'chalk-bin' },
    ],
    bins: [
      { id: 'water-bin', label: 'Water Added 💧', color: '#3B82F6' },
      { id: 'dye-bin', label: 'Metanil Yellow Dye 🧪', color: '#EF4444' },
      { id: 'chalk-bin', label: 'Chalk Powder ⚪', color: '#94A3B8' },
    ],
  },
  {
    type: 'identify',
    question: 'Which disease can spread if surroundings have stagnant water where mosquitoes breed?',
    answer: 'Dengue and Malaria',
    options: [
      'Dengue and Malaria',
      'Tooth decay',
      'Common cold from dust'
    ],
    hint: 'Think about mosquitoes laying eggs in puddles and water coolers during the monsoon!',
    misconception: 'Stagnant water breeds mosquitoes that spread dengue and malaria! Tooth decay comes from not brushing teeth, not from stagnant water.',
  },
  {
    type: 'sort',
    question: 'Drag each personal hygiene practice to its correct health benefit!',
    answer: 'sort',
    options: [],
    hint: 'Handwashing prevents diarrhoea; brushing teeth prevents cavities; bathing removes skin germs!',
    misconception: 'Every hygiene habit prevents a specific problem: washing hands stops stomach germs, bathing stops skin infections, and brushing teeth stops dental cavities!',
    sortItems: [
      { id: 'hw', label: 'Wash hands with soap', icon: 'handwash', correctBin: 'stomach' },
      { id: 'bt', label: 'Brush teeth twice daily', icon: 'soap', correctBin: 'teeth' },
      { id: 'bd', label: 'Bathe daily', icon: 'water', correctBin: 'skin' },
    ],
    bins: [
      { id: 'stomach', label: 'Prevents Diarrhoea 🦠', color: '#3B82F6' },
      { id: 'teeth', label: 'Prevents Cavities 🦷', color: '#EAB308' },
      { id: 'skin', label: 'Prevents Skin Infection 🚿', color: '#10B981' },
    ],
  },
];

// ─── Farmer Faisal Mascot ──────────────────────────────────────

function FarmerFaisal({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
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
            <linearGradient id="faisal-overalls" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="faisal-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          {/* Straw Hat */}
          <ellipse cx="37.5" cy="16" rx="26" ry="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M25 16 C25 6, 50 6, 50 16 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37.5" cy="28" r="15" fill="url(#faisal-face)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Friendly Eyes */}
          <circle cx="32" cy="26" r="2" fill="#1E293B" />
          <circle cx="43" cy="26" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 33 Q37.5 38 42 33" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Overalls body */}
          <path d="M22 43 L37.5 47 L53 43 L55 78 L20 78 Z" fill="url(#faisal-overalls)" stroke="#1E40AF" strokeWidth="1.5" />
          {/* Red shirt under overalls */}
          <rect x="28" y="43" width="19" height="12" fill="#DC2626" />
          {/* Pocket on overalls */}
          <rect x="32" y="58" width="11" height="10" fill="#1D4ED8" stroke="#93C5FD" strokeWidth="1" rx="2" />
          {/* Feet */}
          <ellipse cx="28" cy="83" rx="5" ry="3" fill="#78350F" />
          <ellipse cx="47" cy="83" rx="5" ry="3" fill="#78350F" />
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

// ─── Farm Scene Background ────────────────────────────────────

function FarmScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="farm-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="65%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#84CC16" />
          </linearGradient>
          <linearGradient id="soil-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#65A30D" />
            <stop offset="100%" stopColor="#3F6212" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#farm-sky)" />
        {/* Rolling hills */}
        <path d={`M0 ${height - 120} Q${width / 4} ${height - 160}, ${width / 2} ${height - 120} T${width} ${height - 130} L${width} ${height} L0 ${height} Z`} fill="url(#soil-grad)" />
        <rect x="0" y={height - 90} width={width} height="90" fill="#3F6212" />
        {/* Sun in sky */}
        <circle cx={width - 80} cy="70" r="30" fill="#FACC15" opacity="0.9" />
        <circle cx={width - 80} cy="70" r="40" fill="#FEF08A" opacity="0.4" />
      </svg>
    </div>
  );
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white cursor-grab active:cursor-grabbing" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface AgricultureHygieneGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AgricultureHygieneGame({ width = 720, height = 560, onComplete }: AgricultureHygieneGameProps) {
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

  const handleShowHint = useCallback(() => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  }, [currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [handleShowHint]);

  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer, currentChallenge]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 125, y: height - 150 };
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
      const compMsg = "Wonderful! You are an agriculture and hygiene champion!";
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

    // Hit test bins
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 210;
      const binY = 180;
      if (x >= binX && x <= binX + 180 && y >= binY && y <= binY + 160) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setItemPositions(prev => ({ ...prev, [id]: { x: x - 55, y: y - 45 } }));
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl select-none" style={{ width, height, background: '#1B4D3E' }}>
      <FarmScene width={width} height={height} />
      <FarmerFaisal mood={mascotMood} speaking={speakingText} />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md border-b border-white/20 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl">🌾</span>
          <h1 className="text-base font-bold text-gray-800">Agriculture & Hygiene</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            <span className="text-xs font-bold text-amber-800">Score: {score}</span>
          </div>
          <StarRow count={Math.min(5, Math.floor(score / 25))} total={5} />
        </div>
      </div>

      {/* ─── TEACHING SCREEN ────────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-8 z-20 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-xl rounded-3xl p-8 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/30 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed mb-6 opacity-95">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-5 py-2 rounded-xl font-bold text-sm bg-white/20 text-white ${slideIdx === 0 ? 'opacity-40 cursor-not-allowed' : 'hover:bg-white/30'}`}
              >
                Previous
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
                  }
                }}
                className="px-6 py-2 rounded-xl font-bold text-sm bg-white text-gray-900 shadow-lg hover:bg-amber-100 transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Game! 🚀" : "Next ➡️"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* ─── PLAY SCREEN ────────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col justify-between z-10">
          {/* Question Box */}
          <div className="bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-amber-200 max-w-2xl mx-auto w-full">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <button onClick={handleShowHint} className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 hover:bg-blue-100 flex items-center gap-1">
                💡 Need Hint?
              </button>
            </div>
            <h3 className="text-base font-bold text-gray-900">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Area: Identify (Multiple Choice) */}
          {currentChallenge.type === 'identify' && (
            <div className="max-w-xl mx-auto w-full grid grid-cols-1 gap-3 my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = "bg-white/90 hover:bg-white text-gray-800 border-amber-200";
                if (selectedOpt) {
                  if (isCorrect) btnStyle = "bg-emerald-500 text-white border-emerald-600 font-bold shadow-lg scale-[1.02]";
                  else if (isSelected) btnStyle = "bg-rose-500 text-white border-rose-600 font-bold";
                  else btnStyle = "bg-white/50 text-gray-400 border-gray-200 opacity-50";
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: selectedOpt ? 1 : 1.01 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`p-4 rounded-2xl border-2 shadow-md transition-all text-left font-medium text-sm flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrect && <span className="text-xl">✅</span>}
                    {selectedOpt && isSelected && !isCorrect && <span className="text-xl">❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Challenge Area: Sort (Drag and Drop) */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative flex-1 my-4">
              {/* Bins */}
              <div className="flex justify-around px-4 mb-4">
                {currentChallenge.bins.map(bin => (
                  <div
                    key={bin.id}
                    className="w-48 h-32 rounded-3xl border-4 border-dashed border-white/60 bg-white/20 backdrop-blur-md flex flex-col items-center justify-center p-3 shadow-inner"
                    style={{ backgroundColor: `${bin.color}22` }}
                  >
                    <span className="text-sm font-black text-white text-center drop-shadow">{bin.label}</span>
                  </div>
                ))}
              </div>

              {/* Draggable Items */}
              {currentChallenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: height - 150 };
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
          )}

          {/* Bottom Action Bar */}
          <div className="flex justify-between items-center max-w-2xl mx-auto w-full px-4">
            <span className="text-xs font-bold text-white/80">Errors: {errors}</span>
            {((currentChallenge.type === 'identify' && selectedOpt) || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={() => {
                  audioManager.play('tap');
                  advanceChallenge();
                }}
                className="px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-xl flex items-center gap-2"
              >
                {challengeIdx < CHALLENGES.length - 1 ? "Next Challenge ➡️" : "Finish Game 🎉"}
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* ─── FEEDBACK & OVERLAYS ────────────────────────────────── */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
