'use client';

/**
 * PlantReproductionGame — Learn about flower structure, pollination, sexual reproduction, seed dispersal, and vegetative reproduction.
 *
 * CISCE Nodes: c5_bio_010 (Flower structure - androecium and gynoecium),
 *              c5_bio_011 (Pollination process),
 *              c5_bio_012 (Sexual reproduction in plants),
 *              c5_bio_013 (Seed dispersal),
 *              c5_bio_014 (Vegetative reproduction)
 * Enrichment: c5_biology_enrichment_part10-14
 *
 * ELI5: "Flowers have boy parts called stamens with anther making pollen, and girl parts called pistils with sticky stigma!
 *   Pollination moves pollen to the stigma. Male and female cells join in fertilization to make seeds inside the ovary, while the ovary becomes a fruit!
 *   Seeds travel by wind, water, animals, or pod explosion. Some plants also grow from stems like potatoes, roots like carrots, or leaves like bryophyllum!"
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
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
    title: "Flower Structure: Androecium & Gynoecium 🌺",
    text: "Flowers are plant reproductive organs! The male part is the androecium (stamens with anther making pollen and filament stalk). The female part is the gynoecium (pistil with sticky stigma, style tube, and ovary with ovules).",
    emoji: "🌺",
    bgColor: "from-pink-400 to-rose-600",
    spoken: "Flowers are plant reproductive organs! The male part is the androecium with stamens making pollen. The female part is the gynoecium with stigma, style, and ovary!"
  },
  {
    title: "Pollination Process 🐝",
    text: "Pollination is the transfer of pollen grains from the anther to the stigma! Self-pollination happens within the same flower or plant. Cross-pollination happens between different plants of the same kind, helped by insects, wind, water, or birds.",
    emoji: "🐝",
    bgColor: "from-amber-400 to-orange-600",
    spoken: "Pollination is the transfer of pollen from anther to stigma! Insects, wind, and water help move pollen between flowers."
  },
  {
    title: "Sexual Reproduction in Plants 🌱",
    text: "After pollination, a pollen tube grows down the style into the ovary. The male cell joins the female egg in the ovule (fertilization)! The fertilized ovule becomes a seed, and the swollen ovary becomes a fruit protecting the seeds.",
    emoji: "🌱",
    bgColor: "from-emerald-400 to-green-600",
    spoken: "After pollination, the pollen tube grows down to the ovary. Fertilization happens when male and female cells join. The ovule becomes a seed, and the ovary becomes a fruit!"
  },
  {
    title: "Seed Dispersal 🌬️",
    text: "Seed dispersal is spreading seeds away from the parent plant to avoid overcrowding and competition! Wind carries light seeds with wings or hairs (dandelion). Water floats buoyant seeds (coconut). Animals carry hooked seeds or eat fleshy fruits (mango). Pods explode to scatter seeds!",
    emoji: "🌬️",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "Seed dispersal spreads seeds away from the parent plant. Wind, water, animals, and bursting pods help seeds travel to new places!"
  },
  {
    title: "Vegetative Reproduction 🥔",
    text: "Vegetative reproduction creates new plants from vegetative parts without seeds! Stem tubers (potato eyes), roots (sweet potato), or leaves (Bryophyllum plantlets) use stored food to grow identical clone plants much faster than seeds.",
    emoji: "🥔",
    bgColor: "from-purple-400 to-gold-600",
    spoken: "Vegetative reproduction creates new plants from stems, roots, or leaves without seeds! Potatoes, carrots, and bryophyllum grow clones using stored food."
  },
];

// ─── Custom SVG Botanical & Flower Icons ──────────────────────────────

function FlowerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      {[0, 60, 120, 180, 240, 300].map(angle => (
        <ellipse
          key={angle}
          cx={30 + 14 * Math.cos((angle * Math.PI) / 180)}
          cy={30 + 14 * Math.sin((angle * Math.PI) / 180)}
          rx="8"
          ry="5"
          fill="#F43F5E"
          stroke="#BE123C"
          strokeWidth="1"
          transform={`rotate(${angle} ${30 + 14 * Math.cos((angle * Math.PI) / 180)} ${30 + 14 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      <path d="M30 38 L30 52" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 45 Q22 40, 24 48" fill="#22C55E" />
    </svg>
  );
}

function StamenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="30" y1="50" x2="30" y2="22" stroke="#16A34A" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="30" cy="18" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <text x="30" y="58" fontSize="8" fill="#15803D" fontWeight="bold" textAnchor="middle">STAMEN</text>
    </svg>
  );
}

function PistilIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="14" rx="7" ry="4" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <line x1="30" y1="18" x2="30" y2="36" stroke="#10B981" strokeWidth="3" />
      <ellipse cx="30" cy="44" rx="12" ry="10" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
      <circle cx="27" cy="43" r="2.5" fill="#FEF08A" />
      <circle cx="33" cy="45" r="2.5" fill="#FEF08A" />
      <text x="30" y="58" fontSize="8" fill="#047857" fontWeight="bold" textAnchor="middle">PISTIL</text>
    </svg>
  );
}

function PollenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="25" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <circle cx="35" cy="20" r="4" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <circle cx="28" cy="38" r="6" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <circle cx="42" cy="35" r="5" fill="#FACC15" stroke="#CA8A04" strokeWidth="1" />
      <path d="M15 45 Q30 15, 48 30" stroke="#38BDF8" strokeWidth="2" fill="none" strokeDasharray="3,3" />
    </svg>
  );
}

function BeeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="12" ry="9" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M24 21 L24 39" stroke="#1E293B" strokeWidth="2.5" />
      <path d="M30 21 L30 39" stroke="#1E293B" strokeWidth="2.5" />
      <ellipse cx="27" cy="18" rx="6" ry="10" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" opacity="0.8" />
      <ellipse cx="33" cy="18" rx="6" ry="10" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" opacity="0.8" />
      <circle cx="19" cy="28" r="2" fill="#1E293B" />
    </svg>
  );
}

function SeedIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="12" ry="15" fill="#D97706" stroke="#92400E" strokeWidth="2" />
      <path d="M30 19 Q36 28, 30 45" stroke="#FEF3C7" strokeWidth="2" fill="none" />
      <text x="30" y="56" fontSize="8" fill="#92400E" fontWeight="bold" textAnchor="middle">SEED</text>
    </svg>
  );
}

function SeedPodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 30 Q30 15, 45 25 Q35 45, 20 30 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <circle cx="28" cy="28" r="4" fill="#FACC15" />
      <circle cx="36" cy="32" r="4" fill="#FACC15" />
      <path d="M42 22 L52 16" stroke="#15803D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function WindDispersalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="35" r="3" fill="#A1A1AA" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1="30"
          y1="35"
          x2={30 + 14 * Math.cos((angle * Math.PI) / 180)}
          y2={35 + 14 * Math.sin((angle * Math.PI) / 180)}
          stroke="#F4F4F5"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
      <path d="M10 20 Q20 10, 35 15 Q45 20, 50 12" stroke="#38BDF8" strokeWidth="2" fill="none" />
    </svg>
  );
}

function WaterDispersalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="28" rx="10" ry="12" fill="#78350F" stroke="#451A03" strokeWidth="1.5" />
      <path d="M10 42 Q20 36, 30 42 Q40 48, 50 42" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M15 50 Q25 44, 35 50 Q45 56, 55 50" stroke="#38BDF8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AnimalDispersalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="12" ry="10" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
      <path d="M18 32 L10 28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 40 L18 48" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M38 40 L42 48" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
      <path d="M42 32 L50 28" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PotatoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="16" ry="12" fill="#D97706" stroke="#92400E" strokeWidth="2" />
      <circle cx="24" cy="28" r="2" fill="#78350F" />
      <circle cx="34" cy="26" r="2" fill="#78350F" />
      <circle cx="30" cy="38" r="2" fill="#78350F" />
      <text x="30" y="56" fontSize="8" fill="#92400E" fontWeight="bold" textAnchor="middle">POTATO</text>
    </svg>
  );
}

function GingerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 28 C18 22, 28 20, 32 26 C36 20, 46 22, 44 32 C48 38, 42 44, 34 40 C26 46, 16 40, 18 28 Z" fill="#D4B28C" stroke="#854D0E" strokeWidth="2" />
      <circle cx="26" cy="28" r="1.5" fill="#854D0E" />
      <circle cx="36" cy="34" r="1.5" fill="#854D0E" />
      <text x="30" y="56" fontSize="8" fill="#854D0E" fontWeight="bold" textAnchor="middle">GINGER</text>
    </svg>
  );
}

// Map icon string to SVG component
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'flower': return <FlowerIcon size={size} />;
    case 'stamen': return <StamenIcon size={size} />;
    case 'pistil': return <PistilIcon size={size} />;
    case 'pollen': return <PollenIcon size={size} />;
    case 'bee': return <BeeIcon size={size} />;
    case 'seed': return <SeedIcon size={size} />;
    case 'seed-pod': return <SeedPodIcon size={size} />;
    case 'wind': return <WindDispersalIcon size={size} />;
    case 'water': return <WaterDispersalIcon size={size} />;
    case 'animal': return <AnimalDispersalIcon size={size} />;
    case 'potato': return <PotatoIcon size={size} />;
    case 'ginger': return <GingerIcon size={size} />;
    default: return <FlowerIcon size={size} />;
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
    question: 'Which part of the flower is the MALE reproductive organ?',
    answer: 'Androecium / Stamen (Anther + Filament)',
    options: [
      'Androecium / Stamen (Anther + Filament)',
      'Gynoecium / Pistil (Stigma + Style + Ovary)',
      'Petals and Sepals'
    ],
    hint: 'Think about the thin stalks with yellow dust at their tips that make pollen!',
    misconception: 'The male part is the androecium (stamen), NOT the gynoecium (pistil)! The stamen has the anther which produces pollen grains.',
  },
  {
    type: 'sort',
    question: 'Drag each flower part to its correct reproductive role!',
    answer: 'sort',
    options: [],
    hint: 'Stamens make pollen (male), pistils receive pollen and hold ovules (female), petals attract insects!',
    misconception: 'Make sure not to confuse male and female parts! The stamen (anther + filament) makes pollen (male), while the pistil (stigma + style + ovary) receives pollen and holds ovules (female).',
    sortItems: [
      { id: 's1', label: 'Stamen (Anther)', icon: 'stamen', correctBin: 'male' },
      { id: 'p1', label: 'Pistil (Stigma)', icon: 'pistil', correctBin: 'female' },
      { id: 'p2', label: 'Petals', icon: 'flower', correctBin: 'attract' },
    ],
    bins: [
      { id: 'male', label: 'Male Part ♂️', color: '#3B82F6' },
      { id: 'female', label: 'Female Part ♀️', color: '#EC4899' },
      { id: 'attract', label: 'Attracts Insects 🌺', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'What is POLLINATION?',
    answer: 'Transfer of pollen grains from the anther to the stigma',
    options: [
      'Transfer of pollen grains from the anther to the stigma',
      'Growth of a seed into a tiny seedling',
      'Joining of male and female cells inside the ovule'
    ],
    hint: 'It is the journey of pollen yellow dust from the male anther to the sticky female stigma!',
    misconception: 'Pollination is ONLY the transfer of pollen to the stigma! The joining of cells (fertilization) happens later inside the ovule.',
  },
  {
    type: 'sort',
    question: 'Drag each pollination description to Self or Cross-pollination!',
    answer: 'sort',
    options: [],
    hint: 'Self-pollination stays on the same flower or plant. Cross-pollination travels to a different plant!',
    misconception: 'If pollen goes to another flower on the EXACT SAME plant, it is still self-pollination! Cross-pollination requires moving to a DIFFERENT plant of the same species.',
    sortItems: [
      { id: 'sp1', label: 'Same flower/plant', icon: 'flower', correctBin: 'self' },
      { id: 'cp1', label: 'Different plant', icon: 'bee', correctBin: 'cross' },
      { id: 'cp2', label: 'Helped by bees/wind', icon: 'wind', correctBin: 'cross' },
    ],
    bins: [
      { id: 'self', label: 'Self-Pollination 🌸', color: '#F97316' },
      { id: 'cross', label: 'Cross-Pollination 🐝', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify',
    question: 'After fertilization, what does the OVULE become inside the flower?',
    answer: 'A seed containing the baby plant embryo',
    options: [
      'A seed containing the baby plant embryo',
      'A fruit protecting the flower',
      'A green sepal leaf'
    ],
    hint: 'Think about what you find inside a fruit when you cut it open!',
    misconception: 'The ovule becomes the SEED, while the ovary around it becomes the FRUIT! Do not mix up seed and fruit.',
  },
  {
    type: 'sort',
    question: 'Drag each seed to its correct dispersal method!',
    answer: 'sort',
    options: [],
    hint: 'Dandelion flies on wind, coconut floats on water, burrs stick to fur!',
    misconception: 'Not all seeds are wind-dispersed! Coconuts float on water, burrs have hooks for animal fur, and balsam pods burst open.',
    sortItems: [
      { id: 'd-wind', label: 'Dandelion (Hairs)', icon: 'wind', correctBin: 'wind-bin' },
      { id: 'd-water', label: 'Coconut (Husks)', icon: 'water', correctBin: 'water-bin' },
      { id: 'd-animal', label: 'Xanthium (Hooks)', icon: 'animal', correctBin: 'animal-bin' },
      { id: 'd-pod', label: 'Balsam (Bursting)', icon: 'seed-pod', correctBin: 'explosion-bin' },
    ],
    bins: [
      { id: 'wind-bin', label: 'Wind 🌬️', color: '#38BDF8' },
      { id: 'water-bin', label: 'Water 🌊', color: '#0284C7' },
      { id: 'animal-bin', label: 'Animals 🐾', color: '#92400E' },
      { id: 'explosion-bin', label: 'Explosion 💥', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these plants reproduces VEGETATIVELY from a stem tuber?',
    answer: 'Potato (underground stem with eyes)',
    options: [
      'Potato (underground stem with eyes)',
      'Bryophyllum (plantlets on leaf margin)',
      'Sweet potato (swollen root)'
    ],
    hint: 'Think about the underground tuber with dark spots called eyes which are buds!',
    misconception: 'A potato is an underground STEM (tuber), NOT a root! Sweet potato is a modified root, and Bryophyllum reproduces from its leaves.',
  },
  {
    type: 'sort',
    question: 'Drag each plant part to its vegetative reproduction type!',
    answer: 'sort',
    options: [],
    hint: 'Potato and ginger are stems, sweet potato and carrot are roots, Bryophyllum is a leaf!',
    misconception: 'Remember: underground tubers and rhizomes are STEMS, while carrots and sweet potatoes are modified ROOTS, and Bryophyllum uses its LEAVES!',
    sortItems: [
      { id: 'v-pot', label: 'Potato Tuber', icon: 'potato', correctBin: 'stem' },
      { id: 'v-gin', label: 'Ginger Rhizome', icon: 'ginger', correctBin: 'stem' },
      { id: 'v-bry', label: 'Bryophyllum', icon: 'flower', correctBin: 'leaf' },
    ],
    bins: [
      { id: 'stem', label: 'Stem 🥔', color: '#D97706' },
      { id: 'leaf', label: 'Leaf 🍃', color: '#10B981' },
    ],
  },
];

// ─── Gardener Gita Mascot (Botanist Gardener) ──────────────────

function GardenerGita({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="gita-sunhat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="gita-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Sun hat brim */}
          <ellipse cx="37.5" cy="22" rx="26" ry="7" fill="url(#gita-sunhat)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Head */}
          <circle cx="37.5" cy="28" r="15" fill="url(#gita-face)" stroke="#D97706" strokeWidth="1.5" />
          {/* Hat crown */}
          <path d="M25 20 C25 10, 50 10, 50 20 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
          {/* Eyes & Smile */}
          <circle cx="32" cy="27" r="1.5" fill="#1E293B" />
          <circle cx="43" cy="27" r="1.5" fill="#1E293B" />
          <path d="M33 33 Q37.5 37 42 33" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Gardening apron / shirt */}
          <path d="M22 44 L37.5 48 L53 44 L55 75 L20 75 Z" fill="#22C55E" stroke="#15803D" strokeWidth="1.5" />
          {/* Flower badge on apron */}
          <circle cx="37.5" cy="58" r="6" fill="#F43F5E" stroke="#BE123C" strokeWidth="1" />
          <circle cx="37.5" cy="58" r="2" fill="#FACC15" />
          {/* Arms */}
          <ellipse cx="16" cy="55" rx="4" ry="10" fill="#16A34A" transform="rotate(-15 16 55)" />
          <ellipse cx="59" cy="55" rx="4" ry="10" fill="#16A34A" transform="rotate(15 59 55)" />
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

// ─── Botanical Garden Scene Background ────────────────────────

function BotanicalGardenScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="garden-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="65%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#garden-sky)" />
        {/* Ground */}
        <rect x="0" y={height - 110} width={width} height="110" fill="#15803D" />
        <rect x="0" y={height - 110} width={width} height="14" fill="#22C55E" />

        {/* Background decorative flowers */}
        {[60, 160, 260, 460, 560, 660].map((cx, idx) => (
          <g key={idx} transform={`translate(${cx}, ${height - 130})`}>
            <line x1="0" y1="0" x2="0" y2="30" stroke="#15803D" strokeWidth="3" />
            <circle cx="0" cy="-5" r="10" fill={idx % 2 === 0 ? '#F43F5E' : '#A855F7'} />
            <circle cx="0" cy="-5" r="3" fill="#FACC15" />
          </g>
        ))}
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
      <div
        className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white"
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Component ────────────────────────────────────���──────

export interface PlantReproductionGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function PlantReproductionGame({ width = 720, height = 560, onComplete }: PlantReproductionGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 125, y: height - 155 };
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
      const compMsg = "Wonderful! You are a brilliant plant expert!";
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

    // Simple bin hit detection based on coordinates
    const binWidth = width / currentChallenge.bins.length;
    const droppedBinIdx = Math.floor(x / binWidth);
    const droppedBin = currentChallenge.bins[Math.max(0, Math.min(droppedBinIdx, currentChallenge.bins.length - 1))];

    if (droppedBin && droppedBin.id === item.correctBin) {
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
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-emerald-900 font-sans"
      style={{ width, height }}
    >
      <BotanicalGardenScene width={width} height={height} />
      <GardenerGita mood={mascotMood} speaking={speakingText} />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-4 flex items-center justify-between z-10 border-b border-emerald-200">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌸</span>
          <h1 className="text-sm font-extrabold text-emerald-900">Plant Reproduction</h1>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Challenge {challengeIdx + 1}/8</span>
              <StarRow count={Math.floor(score / 15)} total={8} />
            </div>
          )}
          <button
            onClick={handleShowHint}
            className="px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-xs rounded-full shadow transition-all active:scale-95 flex items-center gap-1"
          >
            <span>💡</span> Hint
          </button>
        </div>
      </div>

      {/* ── TEACHING SCREEN ── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-lg bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl border-4 border-emerald-300 flex flex-col items-center text-center mt-2">
            <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl shadow-md mb-3 bg-gradient-to-br from-emerald-400 to-teal-500 text-white">
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-lg font-extrabold text-emerald-900 mb-2">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm text-gray-700 leading-relaxed font-medium">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </div>

          <div className="flex items-center justify-between w-full max-w-lg px-2">
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === slideIdx ? 'w-8 bg-emerald-500' : 'w-2.5 bg-emerald-200'
                  }`}
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
                  audioManager.play('success');
                }
              }}
              className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-extrabold rounded-2xl shadow-lg transition-all transform active:scale-95 flex items-center gap-2 text-sm"
            >
              <span>{slideIdx < TEACHING_SLIDES.length - 1 ? 'Next Slide' : 'Start Game!'}</span>
              <span>→</span>
            </button>
          </div>
        </div>
      )}

      {/* ── PLAY SCREEN ── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col justify-between z-10">
          {/* Question Box */}
          <div className="bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-emerald-300 max-w-lg mx-auto w-full mt-2 text-center">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
              Challenge {challengeIdx + 1} of 8
            </span>
            <h2 className="text-sm font-extrabold text-gray-900 mt-1">
              {currentChallenge.question}
            </h2>
          </div>

          {/* Identify Challenge Options */}
          {currentChallenge.type === 'identify' && (
            <div className="flex flex-col gap-2.5 max-w-lg mx-auto w-full my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-emerald-50 text-gray-800 border-2 border-emerald-200';
                if (isSelected) {
                  btnStyle = isCorrectOpt
                    ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-[1.02]'
                    : 'bg-rose-500 text-white border-rose-600 animate-shake';
                }
                return (
                  <motion.button
                    key={idx}
                    whileTap={{ scale: 0.98 }}
                    onClick={e => handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null && isCorrectOpt}
                    className={`p-3.5 rounded-2xl font-bold text-xs shadow-md transition-all text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {isSelected && (
                      <span className="text-base">{isCorrectOpt ? '✅' : '❌'}</span>
                    )}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sort Challenge Bins & Draggables */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative flex-1 max-w-2xl mx-auto w-full flex flex-col justify-between pt-4">
              {/* Bins */}
              <div className="grid grid-cols-3 gap-3">
                {currentChallenge.bins.map(bin => (
                  <div
                    key={bin.id}
                    className="h-28 rounded-2xl border-4 border-dashed border-white/70 bg-white/40 backdrop-blur-md flex flex-col items-center justify-center p-2 shadow-inner"
                    style={{ backgroundColor: `${bin.color}25` }}
                  >
                    <span className="text-xs font-extrabold text-gray-800 text-center">{bin.label}</span>
                  </div>
                ))}
              </div>

              {/* Draggable Cards */}
              <div className="relative h-32">
                {currentChallenge.sortItems.map(item => {
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

          {/* Next Button when Identify challenge is correct */}
          {selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center pb-2">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-extrabold rounded-2xl shadow-xl flex items-center gap-2 text-sm"
              >
                <span>Continue</span>
                <span>→</span>
              </motion.button>
            </div>
          )}

          {/* Next Button when Sort challenge is complete */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
            <div className="flex justify-center pb-2">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 text-white font-extrabold rounded-2xl shadow-xl flex items-center gap-2 text-sm"
              >
                <span>Continue</span>
                <span>→</span>
              </motion.button>
            </div>
          )}
        </div>
      )}

      {/* ── FEEDBACK OVERLAYS ── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
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
