'use client';

/**
 * BirdsGame — Learn about birds, body parts, flight, food habits, beaks, and nests
 *
 * CISCE Nodes: c3_bio_006 (Common birds and body parts), c3_bio_007 (How birds fly),
 *              c3_bio_008 (Bird food habits and beak adaptation), c3_bio_009 (Bird nests and habitats)
 * Enrichment: c3_biology_enrichment_part6-9
 *
 * ELI5: "Birds are wonderful animals! They have a beak to eat, wings to fly,
 *   and feathers like a warm jacket. Crows, sparrows, pigeons, parrots, and eagles
 *   are common birds. They have hollow bones and strong chest muscles for flying,
 *   special beaks for their food, and cozy nests for their eggs and chicks!"
 *
 * Misconceptions:
 *   1. "Birds live in nests all year round" → "No! Nests are used only for laying eggs and raising chicks!"
 *   2. "All birds eat the same food" → "No! A parrot's curved beak cracks nuts, an eagle's hooked beak tears meat!"
 *   3. "Feathers are only for flying" → "No! Feathers also keep birds warm like a jacket and waterproof in rain!"
 *   4. "Penguins and ostriches are common Indian birds" → "No! They are not native to India! Sparrows, crows, pigeons are!"
 *
 * Story: "Help Birdwatcher Bina explore the bird sanctuary, learn about bird body parts,
 *   match beaks to food, and discover how birds fly and build nests!"
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
    title: 'Common Birds in India! 🐦',
    text: 'Birds are living animals! Around us in India, we see sparrows, crows, pigeons, parrots, and majestic eagles. Every bird has a head, eyes, beak, wings, feathers, a tail, and feet!',
    emoji: '🦜',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Birds are living animals! Around us in India, we see sparrows, crows, pigeons, parrots, and eagles. Every bird has a beak, wings, feathers, and feet!'
  },
  {
    title: 'How Birds Fly! ✈️',
    text: 'Flight is amazing! Birds have wings that push air down to create lift. Their bones are hollow and light with air spaces inside, and strong chest muscles flap the wings!',
    emoji: '🦅',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Flight is amazing! Birds have wings that push air down to create lift. Their bones are hollow and light, and strong chest muscles flap the wings!'
  },
  {
    title: 'Beaks and Food Habits! 🌰',
    text: 'A bird has no teeth, so its beak is its tool! Sparrows have short conical beaks for seeds, eagles have hooked beaks for meat, and parrots have curved beaks for cracking hard nuts!',
    emoji: '🌰',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'A bird has no teeth, so its beak is its tool! Sparrows have short beaks for seeds, eagles have hooked beaks for meat, and parrots have curved beaks for nuts!'
  },
  {
    title: 'Feathers — A Warm Jacket! 🧥',
    text: 'Feathers cover the whole bird like a cozy warm jacket. They keep the bird warm in winter, stay dry in rain, and make flying possible by giving the wings a smooth surface!',
    emoji: '🪶',
    bgColor: 'from-teal-400 to-emerald-500',
    spoken: 'Feathers cover the bird like a cozy warm jacket. They keep the bird warm, dry in rain, and make flying possible!'
  },
  {
    title: 'Nests and Habitats! 🪺',
    text: 'A nest is a safe cradle built for laying eggs and raising chicks — not just a sleeping bed! Weaver birds weave hanging baskets, tailor birds stitch leaves, and woodpeckers drill tree trunks!',
    emoji: '🪺',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'A nest is a safe cradle built for laying eggs and raising chicks! Weaver birds weave hanging baskets, tailor birds stitch leaves, and woodpeckers drill tree trunks!'
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_bird' | 'identify_flight' | 'sort_body_parts' | 'identify_why_fly' | 'sort_food_beak' | 'identify_nest_use' | 'sort_nest_types' | 'sort_flight_features';

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
    type: 'identify_bird',
    question: 'Which of these is a common bird we see around us in India?',
    answer: 'House Sparrow',
    options: ['House Sparrow', 'Penguin', 'Ostrich'],
    hint: 'Think of the small brown bird that hops on garden walls and balconies in India!',
    misconception: 'The House Sparrow is very common in Indian homes and gardens! Penguins live in cold Antarctica and ostriches in Africa — they are not common Indian birds.',
  },
  {
    type: 'identify_flight',
    question: 'Which body part helps a bird leave the ground and stay in the air?',
    answer: 'Wings',
    options: ['Wings', 'Heavy beak', 'Thick claws'],
    hint: 'These are the two feather-covered arms that the bird flaps up and down.',
    misconception: 'Wings are the flat, feather-covered arms that push air down to lift the bird! Heavy beaks and thick claws do not create lift for flying.',
  },
  {
    type: 'sort_body_parts',
    question: 'Drag each bird body part to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Wings push air for flying, feathers keep warm, tail steers, hollow bones make the body light!',
    misconception: 'Every body part has a special job! Wings give lift, feathers act like a warm jacket, hollow bones keep the body light, and claws help perch.',
    sortItems: [
      { id: 'wing', label: 'Wings', icon: 'wing', correctBin: 'fly' },
      { id: 'feather', label: 'Feathers', icon: 'feather', correctBin: 'warm' },
      { id: 'bone', label: 'Hollow bones', icon: 'bone', correctBin: 'light' },
      { id: 'tail', label: 'Tail', icon: 'tail', correctBin: 'steer' },
    ],
    bins: [
      { id: 'fly', label: 'Push Air / Fly ✈️', color: '#3B82F6' },
      { id: 'warm', label: 'Warm & Dry 🧥', color: '#10B981' },
      { id: 'light', label: 'Make Body Light 🪶', color: '#8B5CF6' },
      { id: 'steer', label: 'Steer & Brake 🧭', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify_why_fly',
    question: 'Why can birds fly high in the sky while human beings cannot?',
    answer: 'Birds have hollow bones and wings',
    options: ['Birds have hollow bones and wings', 'Humans are too small', 'Humans do not eat enough seeds'],
    hint: 'Think about what makes a bird light and how its arms are shaped compared to ours.',
    misconception: 'Birds have hollow bones that make them light and large curved wings that push air! Human bones are solid and heavy, and our arms cannot create lift.',
  },
  {
    type: 'sort_food_beak',
    question: 'Drag each bird to its correct food based on its beak shape!',
    answer: 'sort',
    options: [],
    hint: 'Parrots crack nuts with curved beaks, eagles tear meat with hooked beaks, sparrows peck seeds!',
    misconception: 'Beak shape tells us what a bird eats! Parrots eat fruits and nuts with curved beaks; eagles eat meat and fish with hooked beaks.',
    sortItems: [
      { id: 'parrot', label: 'Parrot (Curved beak)', icon: 'parrot', correctBin: 'fruit' },
      { id: 'eagle', label: 'Eagle (Hooked beak)', icon: 'eagle', correctBin: 'meat' },
      { id: 'sparrow', label: 'Sparrow (Conical beak)', icon: 'sparrow', correctBin: 'seeds' },
      { id: 'woodpecker', label: 'Woodpecker (Chisel beak)', icon: 'woodpecker', correctBin: 'insects' },
    ],
    bins: [
      { id: 'fruit', label: 'Fruits & Nuts 🥜', color: '#EF4444' },
      { id: 'meat', label: 'Meat & Fish 🐟', color: '#DC2626' },
      { id: 'seeds', label: 'Grains & Seeds 🌱', color: '#10B981' },
      { id: 'insects', label: 'Insects in bark 🪲', color: '#D97706' },
    ],
  },
  {
    type: 'identify_nest_use',
    question: 'What is the main purpose of a bird building a nest?',
    answer: 'Laying eggs and raising chicks',
    options: ['Laying eggs and raising chicks', 'Sleeping comfortably every night', 'Storing extra food for winter'],
    hint: 'Nests are safe nurseries! Birds do not sleep in nests all year round after chicks grow up.',
    misconception: 'A nest is NOT just a bedroom for sleeping every night! It is a safe cradle used specifically for laying eggs, sheltering chicks, and raising them until they can fly.',
  },
  {
    type: 'sort_nest_types',
    question: 'Drag each bird to its special nest-building style!',
    answer: 'sort',
    options: [],
    hint: 'Weaver birds weave hanging baskets, tailor birds stitch leaves, woodpeckers drill tree holes!',
    misconception: 'Different birds build unique homes! Weaver birds weave grass baskets, tailor birds stitch leaves together with fibres, and woodpeckers drill tree cavities.',
    sortItems: [
      { id: 'weaver', label: 'Baya Weaver', icon: 'weaver', correctBin: 'hanging' },
      { id: 'tailor', label: 'Tailor Bird', icon: 'tailor', correctBin: 'stitched' },
      { id: 'woodpecker', label: 'Woodpecker', icon: 'woodpecker', correctBin: 'cavity' },
      { id: 'pigeon', label: 'Pigeon', icon: 'pigeon', correctBin: 'ledge' },
    ],
    bins: [
      { id: 'hanging', label: 'Hanging Basket 🌾', color: '#3B82F6' },
      { id: 'stitched', label: 'Stitched Leaves 🍃', color: '#10B981' },
      { id: 'cavity', label: 'Tree Cavity 🪵', color: '#8B5CF6' },
      { id: 'ledge', label: 'Building Ledge 🏛️', color: '#6B7280' },
    ],
  },
  {
    type: 'sort_flight_features',
    question: 'Drag each feature! Does it HELP a bird fly or NOT?',
    answer: 'sort',
    options: [],
    hint: 'Hollow bones, wings, and feathers help fly! Heavy bones and no wings do not help!',
    misconception: 'Flight requires lightness and power! Hollow bones, wings, feathers, and strong chest muscles help a bird fly. Heavy solid bones and lack of wings keep animals on the ground.',
    sortItems: [
      { id: 'hollow', label: 'Hollow bones', icon: 'bone', correctBin: 'helps' },
      { id: 'chest', label: 'Strong chest muscles', icon: 'wing', correctBin: 'helps' },
      { id: 'heavy', label: 'Heavy solid bones', icon: 'bone-heavy', correctBin: 'not-helps' },
      { id: 'nowings', label: 'No wings', icon: 'no-wings', correctBin: 'not-helps' },
    ],
    bins: [
      { id: 'helps', label: 'Helps Fly ✅', color: '#10B981' },
      { id: 'not-helps', label: 'Does Not Help ❌', color: '#EF4444' },
    ],
  },
];

// ─── Birdwatcher Bina Mascot ──────────────────────────────────

function BinaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
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
            <linearGradient id="bina-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFE0BD" />
              <stop offset="100%" stopColor="#F5D0A9" />
            </linearGradient>
            <linearGradient id="bina-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* Hat / Safari Cap */}
          <ellipse cx="37" cy="22" rx="22" ry="6" fill="#D97706" />
          <path d="M22 20 Q37 8 52 20 Z" fill="#F59E0B" />
          <rect x="25" y="17" width="24" height="4" fill="#B45309" rx="1" />
          {/* Head */}
          <circle cx="37" cy="32" r="14" fill="url(#bina-skin)" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1F2937" />
          <circle cx="42" cy="30" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 38 Q37 42 41 38" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Feather Pin on Hat */}
          <path d="M48 16 Q55 10 58 14 Q52 18 48 16 Z" fill="#EC4899" />
          {/* Binoculars around neck */}
          <rect x="30" y="44" width="6" height="10" fill="#4B5563" rx="1" />
          <rect x="39" y="44" width="6" height="10" fill="#4B5563" rx="1" />
          <path d="M28 46 Q37 52 46 46" stroke="#1F2937" strokeWidth="1.5" fill="none" />
          {/* Safari Shirt */}
          <path d="M22 55 L37 48 L52 55 L55 82 L20 82 Z" fill="url(#bina-shirt)" />
          {/* Pocket & Feather badge */}
          <rect x="27" y="58" width="8" height="8" fill="#047857" rx="1" />
          <path d="M31 60 Q34 56 35 59 Q33 63 31 60 Z" fill="#F472B6" />
          {/* Guidebook in hand */}
          <rect x="12" y="60" width="12" height="16" fill="#3B82F6" rx="1" />
          <line x1="15" y1="64" x2="21" y2="64" stroke="white" strokeWidth="1" />
          <line x1="15" y1="68" x2="21" y2="68" stroke="white" strokeWidth="1" />
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

// ─── Forest Scene Background ──────────────────────────────────

function ForestScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky SVG Gradient Background */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="bird-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#bird-sky-grad)" />
        {/* Rolling Hills */}
        <path d="M0 380 Q180 320 360 370 T720 350 L720 560 L0 560 Z" fill="url(#ground-grad)" opacity="0.8" />
        <path d="M0 420 Q240 370 480 410 T720 400 L720 560 L0 560 Z" fill="#16A34A" />
      </svg>

      {/* Sun */}
      <div className="absolute top-4 left-6">
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="18" fill="#FDE047" opacity="0.9" />
          <circle cx="27" cy="27" r="12" fill="#FACC15" />
        </svg>
      </div>

      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/4 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="48" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="62" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>

      {/* Tree on left */}
      <div className="absolute bottom-16 left-4">
        <svg width="90" height="180" viewBox="0 0 90 180">
          <rect x="35" y="90" width="20" height="90" fill="#78350F" rx="3" />
          <ellipse cx="45" cy="80" rx="42" ry="45" fill="#15803D" />
          <ellipse cx="30" cy="65" rx="30" ry="32" fill="#16A34A" />
          <ellipse cx="60" cy="70" rx="28" ry="30" fill="#22C55E" />
          {/* Nest on tree branch */}
          <ellipse cx="45" cy="110" rx="18" ry="8" fill="#92400E" stroke="#78350F" strokeWidth="1.5" />
          <circle cx="42" cy="107" r="3" fill="#FEF3C7" />
          <circle cx="48" cy="108" r="3" fill="#FEF3C7" />
        </svg>
      </div>

      {/* Flying birds in background */}
      <motion.div className="absolute top-16 right-1/3" animate={{ x: [0, -40, 0], y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="40" height="20" viewBox="0 0 40 20">
          <path d="M2 12 Q10 2, 20 12 Q30 2, 38 12" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
      <motion.div className="absolute top-24 right-1/4" animate={{ x: [0, -30, 0], y: [0, -5, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}>
        <svg width="30" height="15" viewBox="0 0 40 20">
          <path d="M2 12 Q10 2, 20 12 Q30 2, 38 12" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Bird & Topic Component Icons ───────────────────

function SparrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="16" ry="12" fill="#D97706" />
      <circle cx="42" cy="28" r="9" fill="#B45309" />
      <circle cx="45" cy="27" r="2" fill="#1F2937" />
      <path d="M51 27 L57 26 L51 29 Z" fill="#1F2937" />
      <ellipse cx="18" cy="38" rx="8" ry="5" fill="#92400E" transform="rotate(-15 18 38)" />
      <path d="M12 33 L4 28 L8 36 Z" fill="#78350F" />
      <circle cx="24" cy="47" r="2" fill="#B45309" />
      <circle cx="36" cy="47" r="2" fill="#B45309" />
    </svg>
  );
}

function CrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="16" ry="13" fill="#1F2937" />
      <circle cx="43" cy="27" r="9" fill="#111827" />
      <circle cx="46" cy="26" r="2" fill="#FACC15" />
      <path d="M52 26 L60 25 L52 29 Z" fill="#030712" />
      <ellipse cx="16" cy="38" rx="9" ry="6" fill="#374151" transform="rotate(-20 16 38)" />
      <path d="M10 32 L2 26 L6 35 Z" fill="#111827" />
      <circle cx="24" cy="48" r="2" fill="#1F2937" />
      <circle cx="36" cy="48" r="2" fill="#1F2937" />
    </svg>
  );
}

function ParrotIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="28" cy="36" rx="15" ry="13" fill="#22C55E" />
      <circle cx="40" cy="27" r="9" fill="#16A34A" />
      <circle cx="43" cy="26" r="2" fill="#1F2937" />
      {/* Curved red beak */}
      <path d="M48 26 Q54 26 52 33 Q49 33 48 28 Z" fill="#EF4444" />
      <ellipse cx="15" cy="42" rx="10" ry="5" fill="#15803D" transform="rotate(-30 15 42)" />
      <path d="M8 48 L2 58 L10 54 Z" fill="#FACC15" />
      <circle cx="22" cy="49" r="2" fill="#16A34A" />
      <circle cx="34" cy="49" r="2" fill="#16A34A" />
    </svg>
  );
}

function EagleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="17" ry="14" fill="#78350F" />
      <circle cx="42" cy="26" r="10" fill="#FEF3C7" />
      <circle cx="45" cy="25" r="2" fill="#1F2937" />
      {/* Hooked beak */}
      <path d="M50 25 Q58 24 56 32 Q53 31 50 27 Z" fill="#F59E0B" />
      <ellipse cx="14" cy="38" rx="12" ry="6" fill="#92400E" transform="rotate(-15 14 38)" />
      <path d="M8 32 L0 25 L5 36 Z" fill="#451A03" />
      <circle cx="23" cy="49" r="2.5" fill="#D97706" />
      <circle cx="37" cy="49" r="2.5" fill="#D97706" />
    </svg>
  );
}

function PigeonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="16" ry="12" fill="#94A3B8" />
      <circle cx="42" cy="28" r="9" fill="#64748B" />
      <circle cx="45" cy="27" r="2" fill="#1F2937" />
      <path d="M51 27 L57 26 L51 29 Z" fill="#334155" />
      {/* Iridescent neck patch */}
      <path d="M38 24 Q42 32 36 36 Z" fill="#38BDF8" opacity="0.6" />
      <ellipse cx="18" cy="38" rx="8" ry="5" fill="#64748B" transform="rotate(-15 18 38)" />
      <path d="M12 34 L4 30 L8 38 Z" fill="#475569" />
      <circle cx="24" cy="47" r="2" fill="#64748B" />
      <circle cx="36" cy="47" r="2" fill="#64748B" />
    </svg>
  );
}

function WoodpeckerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="15" ry="12" fill="#DC2626" />
      <circle cx="42" cy="27" r="9" fill="#1F2937" />
      <circle cx="45" cy="26" r="2" fill="#FACC15" />
      {/* Chisel beak */}
      <path d="M51 26 L60 28 L51 30 Z" fill="#9CA3AF" />
      {/* Red crest */}
      <path d="M35 18 Q45 10 48 20 Z" fill="#EF4444" />
      <ellipse cx="18" cy="38" rx="8" ry="5" fill="#111827" transform="rotate(-15 18 38)" />
      <circle cx="24" cy="47" r="2" fill="#1F2937" />
      <circle cx="36" cy="47" r="2" fill="#1F2937" />
    </svg>
  );
}

function WeaverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="15" ry="12" fill="#FACC15" />
      <circle cx="42" cy="28" r="9" fill="#CA8A04" />
      <circle cx="45" cy="27" r="2" fill="#1F2937" />
      <path d="M51 27 L58 26 L51 30 Z" fill="#854D0E" />
      {/* Black mask */}
      <path d="M38 24 Q44 26 42 32 Q38 30 38 24 Z" fill="#1F2937" />
      <ellipse cx="18" cy="38" rx="8" ry="5" fill="#EAB308" transform="rotate(-15 18 38)" />
      <circle cx="24" cy="47" r="2" fill="#CA8A04" />
      <circle cx="36" cy="47" r="2" fill="#CA8A04" />
    </svg>
  );
}

function TailorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="15" ry="12" fill="#84CC16" />
      <circle cx="42" cy="28" r="9" fill="#65A30D" />
      <circle cx="45" cy="27" r="2" fill="#1F2937" />
      <path d="M51 27 L58 26 L51 29 Z" fill="#3F6212" />
      {/* Rusty crown */}
      <path d="M36 20 Q42 16 46 22 Z" fill="#D97706" />
      <ellipse cx="18" cy="38" rx="8" ry="5" fill="#65A30D" transform="rotate(-15 18 38)" />
      <circle cx="24" cy="47" r="2" fill="#65A30D" />
      <circle cx="36" cy="47" r="2" fill="#65A30D" />
    </svg>
  );
}

function WingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 30 Q30 5, 50 20 Q40 45, 10 30 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M15 28 Q30 15, 45 22" stroke="#E0F2FE" strokeWidth="1" fill="none" />
      <path d="M18 35 Q32 22, 42 28" stroke="#E0F2FE" strokeWidth="1" fill="none" />
    </svg>
  );
}

function FeatherIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 5 Q40 20, 35 45 Q30 55, 30 55 Q30 55, 25 45 Q20 20, 30 5 Z" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      <line x1="30" y1="5" x2="30" y2="55" stroke="#065F46" strokeWidth="1" />
      <path d="M30 15 L22 22 M30 25 L38 32 M30 35 L22 42" stroke="#065F46" strokeWidth="1" />
    </svg>
  );
}

function BoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="26" width="30" height="8" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" rx="4" />
      <circle cx="15" cy="24" r="5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="15" cy="36" r="5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="45" cy="24" r="5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      <circle cx="45" cy="36" r="5" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
      {/* Hollow air space icon */}
      <circle cx="30" cy="30" r="2" fill="#38BDF8" />
    </svg>
  );
}

function TailIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 15 L45 30 L15 45 L25 30 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <line x1="20" y1="22" x2="40" y2="30" stroke="#FEF3C7" strokeWidth="1" />
      <line x1="20" y1="38" x2="40" y2="30" stroke="#FEF3C7" strokeWidth="1" />
    </svg>
  );
}

function HeavyBoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="24" width="36" height="12" fill="#64748B" stroke="#334155" strokeWidth="1.5" rx="5" />
      <circle cx="12" cy="22" r="7" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      <circle cx="12" cy="38" r="7" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      <circle cx="48" cy="22" r="7" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      <circle cx="48" cy="38" r="7" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
    </svg>
  );
}

function NoWingsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="15" fill="#EF4444" opacity="0.2" />
      <path d="M15 15 L45 45 M45 15 L15 45" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'wing': return <WingIcon size={size} />;
    case 'feather': return <FeatherIcon size={size} />;
    case 'bone': return <BoneIcon size={size} />;
    case 'tail': return <TailIcon size={size} />;
    case 'sparrow': return <SparrowIcon size={size} />;
    case 'eagle': return <EagleIcon size={size} />;
    case 'parrot': return <ParrotIcon size={size} />;
    case 'woodpecker': return <WoodpeckerIcon size={size} />;
    case 'weaver': return <WeaverIcon size={size} />;
    case 'tailor': return <TailorIcon size={size} />;
    case 'pigeon': return <PigeonIcon size={size} />;
    case 'bone-heavy': return <HeavyBoneIcon size={size} />;
    case 'no-wings': return <NoWingsIcon size={size} />;
    default: return <SparrowIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-emerald-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 40)}
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
  isHovering?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{ left: x, top: y, width, height, backgroundColor: `${color}15`, borderColor: color }}
    >
      <span className="text-xs font-black text-center text-gray-900">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface BirdsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function BirdsGame({ width = 720, height = 560, onComplete }: BirdsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(0);
  const [binaMood, setBinaMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [binaSpeech, setBinaSpeech] = useState<string | null>('Hello! I am Bina the Birdwatcher. Let us learn about amazing birds!');
  const [hintVisible, setHintVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Multiple choice state
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [activeDragId, setActiveDragId] = useState<string | null>(null);

  // Inactivity timer ref
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Current challenge
  const challenge = CHALLENGES[challengeIdx];

  // Speak when slide or challenge changes
  useEffect(() => {
    if (screen === 'teaching') {
      speechManager.speak(TEACHING_SLIDES[slideIdx].spoken);
      setBinaSpeech(TEACHING_SLIDES[slideIdx].title);
    } else if (screen === 'play' && challenge) {
      speechManager.speak(challenge.question);
      setBinaSpeech(challenge.question);
    }
    return () => {
      speechManager.stop();
    };
  }, [screen, slideIdx, challengeIdx]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && challenge) {
        setHintVisible(true);
        audioManager.play('hint');
        speechManager.speak(challenge.hint);
        setBinaSpeech(challenge.hint);
        setBinaMood('thinking');
      }
    }, 10000);
  }, [challenge, screen]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Reset sort state when challenge changes
  useEffect(() => {
    setPlacedItems({});
    setSelectedOpt(null);
    setHintVisible(false);
    setSuccessMsg(null);
  }, [challengeIdx]);

  // Handle teaching next/prev
  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      audioManager.play('success');
      setScreen('play');
      setBinaMood('celebrate');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  // Handle multiple choice answer
  const handleSelectOption = (opt: string) => {
    audioManager.play('tap');
    setSelectedOpt(opt);
    resetInactivityTimer();

    if (opt === challenge.answer) {
      audioManager.play('success');
      setBinaMood('celebrate');
      setStars(prev => prev + 1);
      setScore(prev => prev + 12);
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Brilliant! That is correct! 🌟');
      speechManager.speak('Brilliant! That is correct!');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setBinaMood('thinking');
      setBinaSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
    }
  };

  // Advance after success banner
  const handleSuccessComplete = () => {
    setSuccessMsg(null);
    setShowConfetti(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      setBinaMood('happy');
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      setBinaSpeech('Amazing! You are a certified Bird Expert! 🦅🏆');
      speechManager.speak('Amazing! You are a certified Bird Expert!');
      if (onComplete) onComplete(finalScore);
    }
  };

  // Sort handlers
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    setActiveDragId(id);
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    setActiveDragId(null);
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bins collision
    const binWidth = 140;
    const binHeight = 110;
    const binY = 320;
    const totalBins = challenge.bins.length;
    const startX = (width - totalBins * (binWidth + 15)) / 2;

    let droppedBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bX = startX + idx * (binWidth + 15);
      const bY = binY;
      if (x >= bX - 20 && x <= bX + binWidth + 20 && y >= bY - 20 && y <= bY + binHeight + 20) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      const allDone = challenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        audioManager.play('success');
        setBinaMood('celebrate');
        setStars(prev => prev + 1);
        setScore(prev => prev + 15);
        setSparklePos({ x: width / 2, y: height / 2 });
        setSuccessMsg('Wonderful sorting! Perfect match! 🌟');
        speechManager.speak('Wonderful sorting! Perfect match!');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setBinaMood('thinking');
      setBinaSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}
    >
      {/* Forest Background */}
      <ForestScene width={width} height={height} />

      {/* Mascot */}
      <BinaMascot mood={binaMood} speaking={binaSpeech} />

      {/* Confetti & Success Banner */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={handleSuccessComplete} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* Hint Bubble */}
      {hintVisible && (
        <HintBubble
          message={challenge.hint}
          onComplete={() => setHintVisible(false)}
        />
      )}

      {/* ─── SCREEN 1: TEACHING ───────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10 bg-black/20 backdrop-blur-xs">
          {/* Top header */}
          <div className="w-full flex justify-between items-center bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg">
            <h1 className="text-xl font-black text-emerald-700">🌿 Bird Sanctuary Learning</h1>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-emerald-600 scale-125' : 'bg-gray-300'}`}
                />
              ))}
            </div>
          </div>

          {/* Slide Card */}
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl p-8 rounded-3xl shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="w-full max-w-xl flex justify-between">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${slideIdx === 0 ? 'opacity-40 bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-emerald-700 hover:bg-emerald-50'}`}
            >
              ⬅️ Previous
            </button>
            <button
              onClick={handleNextSlide}
              className="px-8 py-3 rounded-2xl font-black text-white bg-emerald-600 shadow-xl hover:bg-emerald-700 transition-all scale-105"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: PLAY ───────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 bg-black/10 backdrop-blur-xs">
          {/* Top Header */}
          <div className="flex justify-between items-center bg-white/90 backdrop-blur-md px-5 py-2.5 rounded-2xl shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <div className="text-sm font-black text-gray-700">Score: {score} 🌟</div>
          </div>

          {/* Challenge Box */}
          <div className="flex flex-col items-center my-auto">
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white/95 backdrop-blur-md px-8 py-6 rounded-3xl shadow-2xl max-w-xl w-full text-center border-4 border-emerald-300"
            >
              <h2 className="text-lg font-black text-gray-800 mb-5">{challenge.question}</h2>

              {/* Multiple Choice Options */}
              {challenge.answer !== 'sort' && challenge.options && (
                <div className="grid grid-cols-1 gap-3">
                  {challenge.options.map(opt => {
                    const isSelected = selectedOpt === opt;
                    const isCorrect = opt === challenge.answer;
                    let btnStyle = 'bg-emerald-50 border-emerald-300 text-emerald-900 hover:bg-emerald-100';
                    if (selectedOpt) {
                      if (isCorrect) btnStyle = 'bg-green-500 border-green-600 text-white font-black scale-102';
                      else if (isSelected) btnStyle = 'bg-red-500 border-red-600 text-white';
                      else btnStyle = 'bg-gray-100 border-gray-200 text-gray-400 opacity-50';
                    }
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => !selectedOpt && handleSelectOption(opt)}
                        disabled={selectedOpt !== null}
                        className={`py-3.5 px-5 rounded-2xl border-2 font-bold text-sm shadow-md transition-all ${btnStyle}`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>
              )}

              {/* Sort Challenge Area */}
              {challenge.answer === 'sort' && challenge.sortItems && challenge.bins && (
                <div className="relative h-[250px] w-full mt-2">
                  {/* Bins at bottom */}
                  {challenge.bins.map((bin, bIdx) => {
                    const totalBins = challenge.bins!.length;
                    const bWidth = 140;
                    const bHeight = 100;
                    const startX = (width - 40 - totalBins * (bWidth + 12)) / 2;
                    const bX = startX + bIdx * (bWidth + 12);
                    const bY = 135;
                    const isHover = activeDragId !== null;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={bX}
                        y={bY}
                        width={bWidth}
                        height={bHeight}
                        isHovering={isHover}
                      />
                    );
                  })}

                  {/* Draggable Items at top */}
                  {challenge.sortItems.map((item, iIdx) => {
                    const placed = !!placedItems[item.id];
                    const totalItems = challenge.sortItems!.length;
                    const itemW = 115;
                    const startX = (width - 40 - totalItems * (itemW + 10)) / 2;
                    const itemX = startX + iIdx * (itemW + 10);
                    const itemY = 15;

                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={itemX}
                        y={itemY}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
                </div>
              )}
            </motion.div>
          </div>

          {/* Bottom Controls */}
          <div className="flex justify-between items-center px-4">
            <button
              onClick={() => {
                setHintVisible(true);
                audioManager.play('hint');
                speechManager.speak(challenge.hint);
                setBinaSpeech(challenge.hint);
                setBinaMood('thinking');
              }}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black rounded-xl shadow-md text-xs flex items-center gap-1.5"
            >
              💡 Need a Hint?
            </button>
            <div className="text-xs font-bold text-gray-600">
              Bird Sanctuary Explore — CISCE Class 3 Biology
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
