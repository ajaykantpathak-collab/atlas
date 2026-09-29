'use client';

/**
 * AdaptationsGame — Learn about Animal & Plant Adaptations by Habitat and Food Habits
 *
 * CISCE Nodes: c4_bio_009 (Animal adaptation concept), c4_bio_010 (Animal adaptations by habitat),
 *              c4_bio_011 (Adaptation by food habits), c4_bio_012 (Plant adaptation concept),
 *              c4_bio_013 (Plant adaptations by habitat)
 * Enrichment: c4_biology_enrichment_part9-13
 *
 * ELI5: "Adaptation is like a special suit of clothes an animal or plant is born with!
 *   A camel has a hump to live in the hot desert. A polar bear has thick fur for the cold.
 *   Plants change too ��� cactus has spines in the desert, and lotus has broad leaves to float!"
 *
 * Misconceptions:
 *   1. "Animals choose or decide to grow adaptations" → "No! Adaptations develop over
 *      many generations through natural selection, not by an animal's wish!"
 *   2. "Camel stores liquid water in its hump" → "No! The hump stores FAT which is
 *      converted to water and energy when food is scarce!"
 *   3. "Cactus has no leaves, only thorns" → "No! Cactus leaves are modified into spines
 *      to reduce water loss and protect from animals!"
 *   4. "Only animals adapt" → "No! Plants also adapt to deserts, water, and hills!"
 *   5. "All animals in the same habitat look the same" → "No! Animals have different
 *      features depending on their food habits and how they survive!"
 *
 * Mascot: Ranger Ravi — wildlife ranger in khaki uniform with sun hat, binoculars, and nature notebook.
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

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

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

// ─── Teaching Slides (5 slides from enrichment) ─────────────

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "What is Adaptation? 🌿",
    text: "Adaptation is a special body feature or habit that helps a living thing survive in its home, called its habitat! It helps animals find food, escape predators, and cope with climate.",
    emoji: "🦊",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Adaptation is a special body feature or habit that helps a living thing survive in its home, called its habitat!"
  },
  {
    title: "Animal Adaptations by Habitat 🏜️",
    text: "Animals have bodies suited to where they live! A camel in the Thar Desert has wide feet for sand and a hump for fat storage. A fish in water has fins and a streamlined body!",
    emoji: "🐪",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Animals have bodies suited to where they live! A camel has wide feet for sand, and a fish has fins and a streamlined body!"
  },
  {
    title: "Adaptations by Food Habits 🥩",
    text: "Animals are grouped by what they eat! Herbivores eat plants and have flat teeth (cow). Carnivores eat meat and have sharp teeth and claws (tiger). Omnivores eat both (bear, human)!",
    emoji: "🐅",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "Animals are grouped by what they eat! Herbivores eat plants, carnivores eat meat, and omnivores eat both!"
  },
  {
    title: "Plant Adaptation Concept 🌵",
    text: "Plants also adapt to their surroundings! Because plants cannot move, their leaves, stems, and roots change to help them get water, sunlight, and survive harsh weather.",
    emoji: "🌵",
    bgColor: "from-green-500 to-emerald-700",
    spoken: "Plants also adapt to their surroundings! Their leaves, stems, and roots change to help them get water and sunlight."
  },
  {
    title: "Plant Adaptations by Habitat 🌲",
    text: "Desert cactus has spines instead of leaves to save water and a thick stem to store it. Lotus has broad floating leaves for water ponds. Pine trees have needle leaves to shed snow in hills!",
    emoji: "❄️",
    bgColor: "from-gold-600 to-gold-700",
    spoken: "Desert cactus has spines to save water. Lotus has broad leaves for water ponds. Pine trees have needle leaves to shed snow!"
  },
];

// ─── Challenges (8 progressive challenges) ────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is an ADAPTATION?",
    answer: "A body feature or behaviour that helps a living thing survive in its environment",
    options: [
      "A body feature or behaviour that helps a living thing survive in its environment",
      "A type of food that animals choose to eat every morning",
      "A temporary game that animals play in the forest"
    ],
    hint: "Think: why does a camel have a hump or a fish have fins? To help it survive in its home!",
    misconception: "Adaptations are NOT choices or games! They are inherited body features or habits that help animals and plants survive in their habitat over generations."
  },
  {
    type: 'identify',
    question: "Which adaptation helps a CAMEL survive in the hot desert?",
    answer: "Stores fat in its hump and has thick padded feet for hot sand",
    options: [
      "Stores fat in its hump and has thick padded feet for hot sand",
      "Has thick waterproof scales and gills to breathe underwater",
      "Has needle-like leaves to shed heavy winter snow"
    ],
    hint: "Deserts are hot, dry, and sandy. What body parts help a camel walk on sand and store energy?",
    misconception: "Camels do NOT have gills or scales! They live in dry sand, so wide padded feet keep them from sinking, and their hump stores fat for energy and water."
  },
  {
    type: 'sort',
    question: "Drag each animal to its correct habitat!",
    answer: "sort",
    options: [],
    hint: "Camel = desert, fish = water, polar bear = cold mountain, lion = forest/grassland!",
    misconception: "Remember where each animal's body features fit best: polar bear in snow, camel in sand, fish in water, lion in grass!",
    sortItems: [
      { id: 'camel', label: 'Camel', icon: 'camel', correctBin: 'desert' },
      { id: 'fish', label: 'Fish', icon: 'fish', correctBin: 'water' },
      { id: 'bear', label: 'Polar Bear', icon: 'polar-bear', correctBin: 'mountain' },
      { id: 'lion', label: 'Lion', icon: 'lion', correctBin: 'forest' },
    ],
    bins: [
      { id: 'desert', label: 'Desert 🏜️', color: '#D97706' },
      { id: 'water', label: 'Water 🌊', color: '#0284C7' },
      { id: 'mountain', label: 'Cold Mountain 🏔️', color: '#4F46E5' },
      { id: 'forest', label: 'Grassland 🌳', color: '#16A34A' },
    ],
  },
  {
    type: 'identify',
    question: "A fish has fins and a streamlined body. What is this an adaptation for?",
    answer: "Swimming easily in water",
    options: [
      "Swimming easily in water",
      "Running fast across sandy deserts",
      "Climbing high mountain trees"
    ],
    hint: "Think about where a fish lives and how its shape helps it move through liquid!",
    misconception: "Fins and streamlined bodies are NOT for running on sand or climbing trees! They help the fish slide smoothly through water and steer with ease."
  },
  {
    type: 'sort',
    question: "Drag each animal to its food habit group!",
    answer: "sort",
    options: [],
    hint: "Cow = herbivore (plants), tiger = carnivore (meat), bear = omnivore (both)!",
    misconception: "Check teeth and diet: plant eaters are herbivores with flat teeth, meat eaters are carnivores with sharp teeth, and animals eating both are omnivores!",
    sortItems: [
      { id: 'cow', label: 'Cow', icon: 'cow', correctBin: 'herbivore' },
      { id: 'tiger', label: 'Tiger', icon: 'lion', correctBin: 'carnivore' },
      { id: 'bear', label: 'Bear', icon: 'bear', correctBin: 'omnivore' },
      { id: 'goat', label: 'Goat', icon: 'cow', correctBin: 'herbivore' },
    ],
    bins: [
      { id: 'herbivore', label: 'Herbivore 🌿', color: '#16A34A' },
      { id: 'carnivore', label: 'Carnivore 🥩', color: '#DC2626' },
      { id: 'omnivore', label: 'Omnivore 🍽️', color: '#9333EA' },
    ],
  },
  {
    type: 'identify',
    question: "Why do desert plants like cactus have SPINES instead of broad leaves?",
    answer: "To reduce water loss and protect from animals",
    options: [
      "To reduce water loss and protect from animals",
      "To catch as much rainwater as possible in the sky",
      "To attract butterflies for pollination"
    ],
    hint: "In a hot desert, broad leaves lose a lot of water. What do spines do?",
    misconception: "Spines are NOT for catching rain or attracting butterflies! Broad leaves lose water through transpiration, so cactus leaves became sharp spines to save water and stop animals from eating them."
  },
  {
    type: 'sort',
    question: "Drag each plant to its correct habitat adaptation!",
    answer: "sort",
    options: [],
    hint: "Lotus = water (broad floating leaves), cactus = desert (spines), pine = hilly (needle leaves)!",
    misconception: "Match the plant part to its environment: cactus spines for desert, lotus broad leaves for ponds, pine needles for cold snowy hills!",
    sortItems: [
      { id: 'cactus', label: 'Cactus', icon: 'cactus', correctBin: 'plant-desert' },
      { id: 'lotus', label: 'Lotus', icon: 'lotus', correctBin: 'plant-water' },
      { id: 'pine', label: 'Pine Tree', icon: 'pine', correctBin: 'plant-hilly' },
      { id: 'mango', label: 'Mango', icon: 'pine', correctBin: 'plant-land' },
    ],
    bins: [
      { id: 'plant-desert', label: 'Desert 🌵', color: '#D97706' },
      { id: 'plant-water', label: 'Water 🪷', color: '#0284C7' },
      { id: 'plant-hilly', label: 'Hilly 🌲', color: '#047857' },
      { id: 'plant-land', label: 'Land Plain 🌳', color: '#65A30D' },
    ],
  },
  {
    type: 'sort',
    question: "Drag each adaptation to its correct purpose!",
    answer: "sort",
    options: [],
    hint: "Thick fur = keep warm, webbed feet = swim, sharp claws = catch prey!",
    misconception: "Every body part has a specific job! Fur keeps warm in cold, webbed feet push water, claws catch meat, and needle leaves shed snow.",
    sortItems: [
      { id: 'fur', label: 'Thick fur', icon: 'polar-bear', correctBin: 'purpose-warm' },
      { id: 'webbed', label: 'Webbed feet', icon: 'fish', correctBin: 'purpose-swim' },
      { id: 'claws', label: 'Sharp claws', icon: 'lion', correctBin: 'purpose-hunt' },
      { id: 'spines', label: 'Cactus spines', icon: 'cactus', correctBin: 'purpose-water' },
    ],
    bins: [
      { id: 'purpose-warm', label: 'Keep Warm 🧥', color: '#2563EB' },
      { id: 'purpose-swim', label: 'Swim in Water 🏊', color: '#0891B2' },
      { id: 'purpose-hunt', label: 'Catch Prey 🐅', color: '#DC2626' },
      { id: 'purpose-water', label: 'Save Water 🌵', color: '#CA8A04' },
    ],
  },
];

// ─── Ranger Ravi Mascot ───────────────────────────────────────

function RangerRavi({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
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
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
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
            <linearGradient id="ranger-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#84CC16" />
              <stop offset="100%" stopColor="#4D7C0F" />
            </linearGradient>
            <linearGradient id="ranger-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A16207" />
              <stop offset="100%" stopColor="#713F12" />
            </linearGradient>
          </defs>

          {/* Hat brim */}
          <ellipse cx="37.5" cy="22" rx="25" ry="6" fill="url(#ranger-hat)" stroke="#451A03" strokeWidth="1" />
          {/* Hat crown */}
          <path d="M22 20 Q37.5 5, 53 20 Z" fill="url(#ranger-hat)" stroke="#451A03" strokeWidth="1" />

          {/* Head / Face */}
          <circle cx="37.5" cy="35" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="33" r="2" fill="#1E293B" />
          <circle cx="43" cy="33" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 40 Q37.5 44, 42 40" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Torso (Khaki ranger uniform) */}
          <rect x="23" y="48" width="29" height="30" rx="6" fill="url(#ranger-shirt)" stroke="#3F6212" strokeWidth="1" />
          {/* Pocket */}
          <rect x="27" y="52" width="6" height="6" fill="#65A30D" rx="1" />
          <rect x="42" y="52" width="6" height="6" fill="#65A30D" rx="1" />

          {/* Binoculars around neck */}
          <rect x="30" y="45" width="5" height="7" fill="#334155" rx="1" />
          <rect x="40" y="45" width="5" height="7" fill="#334155" rx="1" />
          <path d="M32 45 Q37.5 50, 43 45" stroke="#1E293B" strokeWidth="1.5" fill="none" />

          {/* Arms */}
          <ellipse cx="18" cy="60" rx="4" ry="10" fill="#65A30D" transform="rotate(15 18 60)" />
          <ellipse cx="57" cy="60" rx="4" ry="10" fill="#65A30D" transform="rotate(-15 57 60)" />

          {/* Boots */}
          <ellipse cx="30" cy="83" rx="5" ry="4" fill="#451A03" />
          <ellipse cx="45" cy="83" rx="5" ry="4" fill="#451A03" />
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

// ─── Safari Scene Background ──────────────────────────────────

function WildlifeScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="40%" stopColor="#38BDF8" />
            <stop offset="70%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />

        {/* Mountains in background */}
        <polygon points="0,350 150,180 320,350" fill="url(#mountain-grad)" opacity="0.6" />
        <polygon points="220,350 400,150 580,350" fill="url(#mountain-grad)" opacity="0.7" />
        <polygon points="450,350 600,200 720,350" fill="url(#mountain-grad)" opacity="0.5" />
        {/* Snow caps */}
        <polygon points="150,180 185,220 115,220" fill="white" opacity="0.8" />
        <polygon points="400,150 435,190 365,190" fill="white" opacity="0.8" />

        {/* Ground hills */}
        <path d="M0 320 Q180 280, 360 320 T720 320 L720 560 L0 560 Z" fill="#22C55E" opacity="0.5" />
        <path d="M0 360 Q240 330, 480 370 T720 360 L720 560 L0 560 Z" fill="#16A34A" opacity="0.8" />
      </svg>
    </div>
  );
}

// ─── Topic SVG Icons for Sort Cards & Options ─────────────────

function CamelIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="14" ry="9" fill="#D97706" />
      <circle cx="43" cy="24" r="6" fill="#D97706" />
      <path d="M37 26 Q39 18, 42 16" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
      {/* Hump */}
      <path d="M22 28 Q26 15, 32 26" fill="#D97706" />
      {/* Legs */}
      <line x1="20" y1="42" x2="17" y2="55" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="26" y1="42" x2="25" y2="55" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="36" y1="42" x2="37" y2="55" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
      <line x1="42" y1="42" x2="45" y2="55" stroke="#92400E" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function FishIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="18" ry="10" fill="#0284C7" />
      {/* Tail fin */}
      <polygon points="48,30 56,20 56,40" fill="#0369A1" />
      {/* Dorsal fin */}
      <polygon points="25,20 32,12 37,20" fill="#0369A1" />
      {/* Eye */}
      <circle cx="18" cy="27" r="2.5" fill="white" />
      <circle cx="17.5" cy="27" r="1" fill="black" />
      {/* Gills */}
      <path d="M23 24 Q21 30, 23 36" stroke="#BAE6FD" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function PolarBearIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="34" rx="15" ry="11" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      <circle cx="43" cy="26" r="8" fill="#F8FAFC" stroke="#E2E8F0" strokeWidth="1" />
      {/* Ears */}
      <circle cx="39" cy="18" r="2.5" fill="#CBD5E1" />
      <circle cx="47" cy="18" r="2.5" fill="#CBD5E1" />
      {/* Nose */}
      <circle cx="49" cy="27" r="1.5" fill="#0F172A" />
      {/* Paws */}
      <ellipse cx="20" cy="46" rx="4" ry="3" fill="#E2E8F0" />
      <ellipse cx="40" cy="46" rx="4" ry="3" fill="#E2E8F0" />
    </svg>
  );
}

function LionIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="34" rx="15" ry="11" fill="#EAB308" />
      {/* Mane */}
      <circle cx="42" cy="26" r="10" fill="#CA8A04" />
      <circle cx="43" cy="26" r="7" fill="#FACC15" />
      {/* Nose */}
      <circle cx="49" cy="28" r="2" fill="#1C1917" />
      {/* Tail */}
      <path d="M15 32 Q8 25, 6 18" stroke="#CA8A04" strokeWidth="2.5" fill="none" />
      <circle cx="5" cy="17" r="2" fill="#CA8A04" />
    </svg>
  );
}

function CowIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="16" y="24" width="28" height="18" rx="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      {/* Spots */}
      <circle cx="24" cy="30" r="4" fill="#1E293B" />
      <circle cx="36" cy="36" r="5" fill="#1E293B" />
      {/* Head */}
      <circle cx="44" cy="24" r="7" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" />
      <circle cx="47" cy="25" r="1.5" fill="#1E293B" />
      {/* Horns */}
      <path d="M42 17 L39 12 M46 17 L49 12" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      {/* Legs */}
      <rect x="20" y="42" width="3" height="12" fill="#334155" rx="1" />
      <rect x="37" y="42" width="3" height="12" fill="#334155" rx="1" />
    </svg>
  );
}

function BearIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="15" ry="12" fill="#78350F" />
      <circle cx="42" cy="26" r="8" fill="#78350F" />
      <circle cx="38" cy="18" r="3" fill="#78350F" />
      <circle cx="46" cy="18" r="3" fill="#78350F" />
      <circle cx="46" cy="27" r="2" fill="#451A03" />
    </svg>
  );
}

function CactusIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Main stem */}
      <rect x="25" y="15" width="10" height="35" rx="5" fill="#16A34A" />
      {/* Left arm */}
      <path d="M25 28 L16 28 L16 20 L21 20" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Right arm */}
      <path d="M35 34 L44 34 L44 24 L39 24" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Spines */}
      <line x1="22" y1="20" x2="25" y2="20" stroke="#FEF08A" strokeWidth="1.5" />
      <line x1="35" y1="25" x2="38" y2="25" stroke="#FEF08A" strokeWidth="1.5" />
      <line x1="22" y1="40" x2="25" y2="40" stroke="#FEF08A" strokeWidth="1.5" />
    </svg>
  );
}

function LotusIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Lily pad */}
      <ellipse cx="30" cy="42" rx="20" ry="8" fill="#4ADE80" />
      <path d="M30 42 L38 38" stroke="#166534" strokeWidth="1.5" />
      {/* Lotus flower */}
      <path d="M30 38 Q22 30, 24 20 Q30 26, 30 38 Z" fill="#F472B6" />
      <path d="M30 38 Q38 30, 36 20 Q30 26, 30 38 Z" fill="#EC4899" />
      <path d="M30 38 Q26 24, 30 14 Q34 24, 30 38 Z" fill="#F43F5E" />
    </svg>
  );
}

function PineTreeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Trunk */}
      <rect x="27" y="40" width="6" height="12" fill="#78350F" />
      {/* Conical layers */}
      <polygon points="30,8 14,26 46,26" fill="#15803D" />
      <polygon points="30,18 10,36 50,36" fill="#16A34A" />
      <polygon points="30,28 6,45 54,45" fill="#22C55E" />
      {/* Snow on tips */}
      <path d="M30 8 L34 14 L26 14 Z" fill="white" opacity="0.8" />
      <path d="M30 18 L34 23 L26 23 Z" fill="white" opacity="0.8" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'camel': return <CamelIcon size={size} />;
    case 'fish': return <FishIcon size={size} />;
    case 'polar-bear': return <PolarBearIcon size={size} />;
    case 'lion': return <LionIcon size={size} />;
    case 'cow': return <CowIcon size={size} />;
    case 'bear': return <BearIcon size={size} />;
    case 'cactus': return <CactusIcon size={size} />;
    case 'lotus': return <LotusIcon size={size} />;
    case 'pine': return <PineTreeIcon size={size} />;
    default: return <CamelIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface AdaptationsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AdaptationsGame({ width = 720, height = 560, onComplete }: AdaptationsGameProps) {
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
  }, [challengeIdx, screen, currentChallenge.question, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 135, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setIsIncorrect(false);
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = "Great job! You understand animal adaptations!";
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
      const compMsg = "Wonderful! You are a brilliant wildlife ranger!";
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

    // Simple bin hit detection based on x coordinate ranges
    const binWidth = width / currentChallenge.bins.length;
    const binIdx = Math.floor(x / binWidth);
    const targetBin = currentChallenge.bins[Math.min(binIdx, currentChallenge.bins.length - 1)];

    if (targetBin && targetBin.id === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = "Fantastic! You sorted the adaptations perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 select-none font-sans" style={{ width, height }}>
      <WildlifeScene width={width} height={height} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-20 border-b border-white/10">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🌿</span>
          <h1 className="text-white font-bold text-lg tracking-wide">Adaptations Explorer</h1>
        </div>
        <div className="flex items-center gap-6">
          {screen === 'play' && (
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">Level {challengeIdx + 1}/8</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
          )}
          <div className="bg-emerald-600/80 text-white font-bold px-3 py-1 rounded-full text-sm shadow-inner">
            Score: {score}
          </div>
        </div>
      </div>

      <RangerRavi mood={mascotMood} speaking={speakingText} />

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 flex flex-col items-center justify-center p-6 z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center border-4 border-white/20`}
          >
            <div className="text-6xl mb-4 bg-white/20 p-4 rounded-full shadow-inner">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />
                ))}
              </div>

              <div className="flex gap-3">
                {slideIdx > 0 && (
                  <button
                    onClick={() => { audioManager.play('tap'); setSlideIdx(prev => prev - 1); }}
                    className="px-4 py-2 bg-black/20 hover:bg-black/30 rounded-xl font-bold text-sm transition-all"
                  >
                    Back
                  </button>
                )}
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
                  className="px-6 py-2.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-black text-sm shadow-lg transition-all transform hover:scale-105"
                >
                  {slideIdx < TEACHING_SLIDES.length - 1 ? 'Next ➔' : 'Start Game! 🚀'}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 flex flex-col items-center justify-between p-6 z-10">
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border-2 border-emerald-500/30 mt-2">
            <h3 className="text-gray-800 font-black text-lg text-center">{currentChallenge.question}</h3>
          </div>

          {/* Multiple Choice Challenge */}
          {currentChallenge.type === 'identify' && (
            <div className="w-full max-w-xl grid grid-cols-1 gap-3 my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = 'bg-white/90 hover:bg-white text-gray-800 border-gray-200';
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = 'bg-emerald-500 text-white border-emerald-600 shadow-emerald-500/50 shadow-lg';
                  else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600 shadow-rose-500/50 shadow-lg';
                  else btnStyle = 'bg-gray-100 text-gray-400 border-gray-200 opacity-50';
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={(e) => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`p-4 rounded-2xl font-bold text-sm border-2 transition-all shadow-md flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span className="text-xl">✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span className="text-xl">❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
            <div className="w-full flex-1 flex flex-col justify-between py-4">
              {/* Bins area */}
              <div className="grid grid-cols-4 gap-3 w-full max-w-3xl mx-auto">
                {currentChallenge.bins.map((bin) => (
                  <div
                    key={bin.id}
                    className="rounded-2xl p-4 flex flex-col items-center justify-center border-4 border-dashed shadow-inner min-h-[120px]"
                    style={{ borderColor: bin.color, backgroundColor: `${bin.color}15` }}
                  >
                    <span className="text-xs font-black text-center uppercase tracking-wider" style={{ color: bin.color }}>
                      {bin.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Draggable Items area */}
              <div className="relative h-28 w-full max-w-3xl mx-auto mt-4">
                {currentChallenge.sortItems.map((item) => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 0}
                    y={itemPositions[item.id]?.y || 0}
                    placed={placedItems[item.id]}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Action / Feedback bar */}
          <div className="w-full max-w-2xl flex items-center justify-between pb-2">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 bg-amber-500/90 hover:bg-amber-600 text-white font-bold rounded-xl shadow-lg text-sm flex items-center gap-2 transition-all transform hover:scale-105"
            >
              <span>💡 Need Hint?</span>
            </button>

            {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl shadow-xl text-sm flex items-center gap-2 transition-all transform hover:scale-105"
              >
                <span>Continue ➔</span>
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Feedback Overlays */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
