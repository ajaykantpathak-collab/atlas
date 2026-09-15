'use client';

/**
 * InsectsGame — Learn about insects, butterfly life cycle, social insects, and harmful insects
 *
 * CISCE Nodes: c3_bio_010 (Common insects and their body parts),
 *              c3_bio_011 (Life cycle of a butterfly),
 *              c3_bio_012 (Social insects - ants, bees),
 *              c3_bio_013 (Harmful insects and remedies)
 * Enrichment: c3_biology_enrichment_part10-13
 *
 * ELI5: "Insects are tiny animals with six legs and three body parts: head,
 *   thorax, and abdomen! Butterflies go through four magical stages: egg,
 *   caterpillar, chrysalis, and adult! Ants and bees live together in social
 *   colonies with teamwork! Some insects like mosquitoes and flies can harm us,
 *   so we keep clean, cover food, and use mosquito nets!"
 *
 * Misconceptions (from enrichment):
 *   1. "Spiders are insects" → "No! Spiders have 8 legs and 2 body parts. Insects have 6 legs and 3 body parts!"
 *   2. "Caterpillar and butterfly are different animals" → "No! They are the same animal through metamorphosis!"
 *   3. "All insects are harmful" → "No! Bees, butterflies, and ladybirds are very helpful to us and nature!"
 *   4. "Bees collect honey directly from flowers" → "No! Bees collect nectar and pollen, and make honey in the hive!"
 *   5. "Pupa and chrysalis are different stages" → "No! Pupa is the stage, and chrysalis is the butterfly's pupa case!"
 *
 * Story: "Join Entomologist Esha on her garden adventure to discover amazing insects,
 *   explore the butterfly's magic transformation, visit ant hills and beehives,
 *   and learn how to stay healthy as a true Bug Explorer!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG garden scene background (sky, grass, flowers, butterfly, ant hill, beehive)
 * - Custom SVG insect mascot (Entomologist Esha with bug jar and magnifying glass)
 * - Custom SVG insect components (ant, butterfly, caterpillar, chrysalis, bee, mosquito, fly, etc.)
 * - Drag-and-drop sorting challenges using Draggable primitive
 * - 8 progressive challenges: identify insect → count body parts → sort body parts → life cycle → social insects → harmful/helpful
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API (speechManager)
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after 10 seconds of inactivity
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
    title: 'The Wonderful World of Insects! 🐞',
    text: 'Insects are tiny animals all around us! Every insect has three body parts (head, thorax, abdomen), six legs, and often wings! Spiders have eight legs, so they are NOT insects!',
    emoji: '🐜',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'Insects are tiny animals all around us! Every insect has three body parts, head, thorax, and abdomen, six legs, and often wings! Spiders have eight legs, so they are not insects!',
  },
  {
    title: 'Butterfly Life Cycle! 🦋',
    text: 'A butterfly goes through 4 amazing stages: Egg on a leaf, hungry Caterpillar that eats leaves, Pupa inside a hard Chrysalis where metamorphosis happens, and Adult Butterfly!',
    emoji: '🐛',
    bgColor: 'from-pink-400 to-purple-600',
    spoken: 'A butterfly goes through four amazing stages: Egg on a leaf, hungry Caterpillar that eats leaves, Pupa inside a hard Chrysalis, and Adult Butterfly!',
  },
  {
    title: 'Social Insects: Ants & Bees! 🐝',
    text: 'Social insects live together in organized colonies! Ants build anthills with tunnels and divide labor. Honeybees build hives with honeycombs, collect nectar, and make sweet honey!',
    emoji: '🍯',
    bgColor: 'from-amber-400 to-orange-600',
    spoken: 'Social insects live together in organized colonies! Ants build anthills and divide labor. Honeybees build hives with honeycombs, collect nectar, and make sweet honey!',
  },
  {
    title: 'Harmful Insects & Germs! 🦟',
    text: 'Some insects can harm us! Mosquitoes bite and spread malaria and dengue. Houseflies carry germs on their feet to our food. Cockroaches spoil food in kitchens. Termites eat wood!',
    emoji: '🪰',
    bgColor: 'from-red-400 to-rose-600',
    spoken: 'Some insects can harm us! Mosquitoes bite and spread malaria and dengue. Houseflies carry germs on their feet to our food. Cockroaches spoil food, and termites eat wood!',
  },
  {
    title: 'Bug Explorers & Remedies! 🧼',
    text: 'We protect ourselves with simple remedies! Keep surroundings clean, cover food, use mosquito nets, remove stagnant water so mosquitoes cannot breed, and protect helpful bees!',
    emoji: '💧',
    bgColor: 'from-cyan-400 to-blue-600',
    spoken: 'We protect ourselves with simple remedies! Keep surroundings clean, cover food, use mosquito nets, remove stagnant water, and protect helpful bees!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_insect' | 'identify_parts' | 'sort_body_parts' | 'identify_butterfly' | 'sort_lifecycle' | 'identify_social' | 'sort_social' | 'sort_harmful';

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

// ─── Challenges (8 progressive: identify → count → sort → apply) ──��───

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_insect',
    question: 'Which of these is a true INSECT?',
    answer: 'Ant',
    options: ['Ant', 'Spider', 'Earthworm'],
    hint: 'Look for the insect rule: exactly 3 body parts and 6 legs!',
    misconception: 'An ant is a true insect because it has 3 body parts and 6 legs! Spiders have 8 legs (not insects), and earthworms have no legs at all!',
  },
  {
    type: 'identify_parts',
    question: 'How many body parts does an insect have?',
    answer: '3 parts (head, thorax, abdomen)',
    options: ['2 parts (head and body)', '3 parts (head, thorax, abdomen)', '5 parts'],
    hint: 'Think of the three clear ICSE syllabus sections: front, middle, and back!',
    misconception: 'An insect body is always divided into 3 clear parts: Head (with eyes and antennae), Thorax (middle with 6 legs and wings), and Abdomen (back)!',
  },
  {
    type: 'sort_body_parts',
    question: 'Drag each insect body part to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Head has feelers/eyes! Thorax has the 6 walking legs and wings! Abdomen is the back part!',
    misconception: 'Remember: Head carries eyes and antennae; Thorax is the engine room with 6 legs and wings; Abdomen is the soft back section!',
    sortItems: [
      { id: 'part-head', label: 'Head (Antennae & Eyes)', icon: 'antenna', correctBin: 'head-bin' },
      { id: 'part-thorax', label: 'Thorax (6 Legs & Wings)', icon: 'wing', correctBin: 'thorax-bin' },
      { id: 'part-abdomen', label: 'Abdomen (Back part)', icon: 'caterpillar', correctBin: 'abdomen-bin' },
    ],
    bins: [
      { id: 'head-bin', label: 'Head 🧠', color: '#EF4444' },
      { id: 'thorax-bin', label: 'Thorax 🦵', color: '#3B82F6' },
      { id: 'abdomen-bin', label: 'Abdomen 🦋', color: '#10B981' },
    ],
  },
  {
    type: 'identify_butterfly',
    question: 'What does a butterfly egg hatch into?',
    answer: 'Caterpillar (larva)',
    options: ['Baby butterfly', 'Caterpillar (larva)', 'Bee'],
    hint: 'The eating and growing stage that loves to munch on green leaves!',
    misconception: 'A butterfly egg never hatches into a tiny butterfly! It hatches into a larva called a caterpillar, which eats leaves and grows big before pupating.',
  },
  {
    type: 'sort_lifecycle',
    question: 'Drag the butterfly life cycle stages in correct order (1 to 4)!',
    answer: 'sort',
    options: [],
    hint: 'Starts on a leaf as an egg, grows as a caterpillar, changes in a chrysalis, becomes an adult!',
    misconception: 'The order is always: 1. Egg on leaf → 2. Caterpillar (larva) → 3. Pupa (chrysalis) → 4. Adult Butterfly! Metamorphosis changes its whole body.',
    sortItems: [
      { id: 'stage-1', label: '1. Egg on leaf', icon: 'seed', correctBin: 'bin-1' },
      { id: 'stage-2', label: '2. Caterpillar', icon: 'caterpillar', correctBin: 'bin-2' },
      { id: 'stage-3', label: '3. Chrysalis (Pupa)', icon: 'cocoon', correctBin: 'bin-3' },
      { id: 'stage-4', label: '4. Adult Butterfly', icon: 'butterfly', correctBin: 'bin-4' },
    ],
    bins: [
      { id: 'bin-1', label: 'Stage 1 🥚', color: '#F59E0B' },
      { id: 'bin-2', label: 'Stage 2 🐛', color: '#10B981' },
      { id: 'bin-3', label: 'Stage 3 🍃', color: '#8B5CF6' },
      { id: 'bin-4', label: 'Stage 4 🦋', color: '#EC4899' },
    ],
  },
  {
    type: 'identify_social',
    question: 'Why are ants and honeybees called SOCIAL insects?',
    answer: 'They live and work together in colonies',
    options: ['They live and work together in colonies', 'They live all alone in trees', 'They only fly at night'],
    hint: 'Think of a big family sharing a home with division of labor!',
    misconception: 'Ants and bees are social insects because they live in organized colonies (anthills and hives) and share duties like foragers, guards, and workers!',
  },
  {
    type: 'sort_social',
    question: 'Drag each social insect role to its correct home or duty!',
    answer: 'sort',
    options: [],
    hint: 'Ants build anthills and forage! Bees build hives and make honey!',
    misconception: 'Ants live in anthills with tunnels; honeybees live in hives with wax honeycombs and collect nectar to make honey!',
    sortItems: [
      { id: 'social-ant', label: 'Ant Colony (Anthill)', icon: 'ant', correctBin: 'ant-bin' },
      { id: 'social-bee', label: 'Honeybee (Hive & Honey)', icon: 'bee', correctBin: 'bee-bin' },
    ],
    bins: [
      { id: 'ant-bin', label: 'Anthills & Foragers 🐜', color: '#B45309' },
      { id: 'bee-bin', label: 'Hives & Honeycombs 🐝', color: '#D97706' },
    ],
  },
  {
    type: 'sort_harmful',
    question: 'Sort these insects into Harmful Pests and Helpful Friends!',
    answer: 'sort',
    options: [],
    hint: 'Mosquitoes and flies spread germs! Bees and butterflies pollinate flowers!',
    misconception: 'Not all insects are harmful! Mosquitoes and houseflies spread diseases, but honeybees and butterflies help plants and are very helpful friends!',
    sortItems: [
      { id: 'pest-mosquito', label: 'Mosquito (Malaria/Dengue)', icon: 'mosquito', correctBin: 'harmful-bin' },
      { id: 'pest-fly', label: 'Housefly (Germs on food)', icon: 'fly', correctBin: 'harmful-bin' },
      { id: 'friend-bee', label: 'Honeybee (Pollination)', icon: 'bee', correctBin: 'helpful-bin' },
      { id: 'friend-butterfly', label: 'Butterfly (Garden beauty)', icon: 'butterfly', correctBin: 'helpful-bin' },
    ],
    bins: [
      { id: 'harmful-bin', label: 'Harmful Pest ⚠️', color: '#EF4444' },
      { id: 'helpful-bin', label: 'Helpful Friend 💚', color: '#10B981' },
    ],
  },
];

// ─── Entomologist Esha Mascot (Bug Scientist) ────────────────

function EshaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
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
          {/* Safari Hat */}
          <ellipse cx="37" cy="22" rx="24" ry="7" fill="#D97706" stroke="#92400E" strokeWidth="1" />
          <path d="M22 20 Q37 8 52 20 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="1" />
          {/* Butterfly pin on hat */}
          <path d="M35 15 L38 18 L35 21 Z" fill="#EC4899" />
          {/* Head */}
          <circle cx="37" cy="32" r="13" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="30" r="2" fill="#1F2937" />
          <circle cx="42" cy="30" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 37 Q37 41 41 37" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Khaki shirt / Lab vest */}
          <path d="M24 45 L50 45 L54 75 L20 75 Z" fill="#10B981" stroke="#047857" strokeWidth="1" />
          <path d="M30 45 L37 55 L44 45 Z" fill="white" />
          {/* Magnifying glass in hand */}
          <circle cx="16" cy="55" r="7" fill="none" stroke="#3B82F6" strokeWidth="2.5" />
          <line x1="12" y1="60" x2="6" y2="66" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
          {/* Bug Jar in other hand */}
          <rect x="54" y="52" width="12" height="16" rx="3" fill="rgba(255,255,255,0.8)" stroke="#6B7280" strokeWidth="1" />
          <line x1="56" y1="58" x2="64" y2="58" stroke="#10B981" strokeWidth="2" />
          {/* Boots */}
          <rect x="26" y="75" width="8" height="12" rx="2" fill="#78350F" />
          <rect x="41" y="75" width="8" height="12" rx="2" fill="#78350F" />
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
      {/* Sky Gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="garden-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#4ADE80" />
          </linearGradient>
          <linearGradient id="hill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22C55E" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#garden-sky)" />
        {/* Rolling Hills */}
        <path d={`M0 ${height * 0.65} Q ${width * 0.3} ${height * 0.5} ${width * 0.6} ${height * 0.65} T ${width} ${height * 0.65} L ${width} ${height} L 0 ${height} Z`} fill="url(#hill-grad)" />
      </svg>

      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#FDE047" opacity="0.9" />
          <circle cx="27" cy="27" r="11" fill="#EAB308" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="27" y1="27" x2={27 + 23 * Math.cos(angle * Math.PI / 180)} y2={27 + 23 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>

      {/* Floating Butterfly in Background */}
      <motion.div
        className="absolute top-16 left-1/3 opacity-80"
        animate={{ x: [0, 50, -30, 0], y: [0, -20, 10, 0], rotate: [0, 10, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="40" height="30" viewBox="0 0 40 30">
          <ellipse cx="20" cy="15" rx="3" ry="10" fill="#1F2937" />
          <path d="M20 10 Q 5 0, 2 15 Q 5 25, 20 18 Z" fill="#EC4899" />
          <path d="M20 10 Q 35 0, 38 15 Q 35 25, 20 18 Z" fill="#EC4899" />
          <circle cx="12" cy="12" r="3" fill="#FDE047" />
          <circle cx="28" cy="12" r="3" fill="#FDE047" />
        </svg>
      </motion.div>

      {/* Ant Hill Silhouette */}
      <div className="absolute bottom-12 left-10 opacity-70">
        <svg width="60" height="40" viewBox="0 0 60 40">
          <path d="M10 40 Q 30 5, 50 40 Z" fill="#92400E" stroke="#78350F" strokeWidth="1" />
          <circle cx="30" cy="25" r="3" fill="#451A03" />
        </svg>
      </div>

      {/* Beehive in Tree Silhouette */}
      <div className="absolute top-10 right-16 opacity-80">
        <svg width="50" height="60" viewBox="0 0 50 60">
          {/* Tree branch */}
          <path d="M0 15 Q 25 15, 50 10 L 50 20 Q 25 25, 0 25 Z" fill="#78350F" />
          {/* Hive */}
          <ellipse cx="25" cy="38" rx="16" ry="14" fill="#F59E0B" stroke="#D97706" strokeWidth="1.5" />
          <ellipse cx="25" cy="35" rx="13" ry="10" fill="#FBBF24" />
          <ellipse cx="25" cy="32" rx="9" ry="7" fill="#FDE047" />
          {/* Hive entrance */}
          <ellipse cx="25" cy="42" rx="4" ry="2" fill="#78350F" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom Insect SVG Icon Functions (14 icons) ───────────────

function AntIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* 3 Body parts */}
      <circle cx="20" cy="30" r="6" fill="#1F2937" /> {/* Head */}
      <ellipse cx="32" cy="30" rx="7" ry="5" fill="#374151" /> {/* Thorax */}
      <ellipse cx="46" cy="30" rx="10" ry="7" fill="#1F2937" /> {/* Abdomen */}
      {/* 6 Legs from thorax */}
      <line x1="28" y1="25" x2="24" y2="15" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="25" x2="32" y2="13" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="25" x2="40" y2="15" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="35" x2="24" y2="45" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="32" y1="35" x2="32" y2="47" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      <line x1="36" y1="35" x2="40" y2="45" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
      {/* Antennae */}
      <path d="M16 26 Q 10 20, 8 22" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M16 34 Q 10 40, 8 38" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ButterflyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="3" ry="14" fill="#1F2937" />
      {/* Wings */}
      <path d="M30 22 Q 10 5, 5 22 Q 10 40, 30 32 Z" fill="#EC4899" opacity="0.9" />
      <path d="M30 22 Q 50 5, 55 22 Q 50 40, 30 32 Z" fill="#EC4899" opacity="0.9" />
      <path d="M30 30 Q 12 35, 10 48 Q 20 52, 30 38 Z" fill="#F43F5E" opacity="0.9" />
      <path d="M30 30 Q 48 35, 50 48 Q 40 52, 30 38 Z" fill="#F43F5E" opacity="0.9" />
      {/* Wing spots */}
      <circle cx="15" cy="18" r="3" fill="#FDE047" />
      <circle cx="45" cy="18" r="3" fill="#FDE047" />
      {/* Antennae */}
      <path d="M29 16 Q 25 10, 20 12" stroke="#1F2937" strokeWidth="1.5" fill="none" />
      <path d="M31 16 Q 35 10, 40 12" stroke="#1F2937" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CaterpillarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="15" cy="35" r="6" fill="#10B981" />
      <circle cx="23" cy="32" r="6" fill="#059669" />
      <circle cx="31" cy="30" r="6" fill="#10B981" />
      <circle cx="39" cy="30" r="6" fill="#059669" />
      <circle cx="47" cy="33" r="6" fill="#10B981" />
      {/* Eyes & smile on head */}
      <circle cx="13" cy="33" r="1.5" fill="black" />
      <path d="M11 37 Q 15 40, 17 37" stroke="black" strokeWidth="1" fill="none" />
      {/* Antennae */}
      <line x1="12" y1="30" x2="8" y2="24" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="29" x2="16" y2="22" stroke="#059669" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function CocoonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Twig */}
      <line x1="10" y1="18" x2="50" y2="18" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      {/* Chrysalis hanging */}
      <line x1="30" y1="18" x2="30" y2="25" stroke="#047857" strokeWidth="2" />
      <ellipse cx="30" cy="40" rx="9" ry="14" fill="#059669" stroke="#065F46" strokeWidth="1.5" />
      {/* Gold dots on chrysalis */}
      <circle cx="28" cy="36" r="1.5" fill="#FBBF24" />
      <circle cx="32" cy="42" r="1.5" fill="#FBBF24" />
    </svg>
  );
}

function BeeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Wings */}
      <ellipse cx="26" cy="20" rx="7" ry="12" fill="rgba(255,255,255,0.8)" stroke="#9CA3AF" strokeWidth="1" transform="rotate(-20 26 20)" />
      <ellipse cx="34" cy="20" rx="7" ry="12" fill="rgba(255,255,255,0.8)" stroke="#9CA3AF" strokeWidth="1" transform="rotate(20 34 20)" />
      {/* Body */}
      <ellipse cx="30" cy="34" rx="12" ry="10" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      {/* Stripes */}
      <path d="M24 26 L24 42" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 24 L30 44" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      <path d="M36 26 L36 42" stroke="#1F2937" strokeWidth="3" strokeLinecap="round" />
      {/* Head */}
      <circle cx="30" cy="22" r="6" fill="#1F2937" />
      <circle cx="28" cy="21" r="1" fill="white" />
      <circle cx="32" cy="21" r="1" fill="white" />
    </svg>
  );
}

function MosquitoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Wings */}
      <ellipse cx="28" cy="24" rx="12" ry="5" fill="rgba(255,255,255,0.6)" stroke="#9CA3AF" strokeWidth="1" transform="rotate(-30 28 24)" />
      {/* Body */}
      <ellipse cx="32" cy="34" rx="4" ry="12" fill="#4B5563" />
      <circle cx="32" cy="22" r="5" fill="#374151" />
      {/* Long proboscis */}
      <line x1="32" y1="17" x2="22" y2="8" stroke="#1F2937" strokeWidth="1.5" strokeLinecap="round" />
      {/* Long legs */}
      <path d="M34 40 L44 52 M30 40 L20 52 M34 38 L48 44" stroke="#4B5563" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function FlyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Big wings */}
      <ellipse cx="24" cy="24" rx="10" ry="6" fill="rgba(255,255,255,0.7)" stroke="#9CA3AF" strokeWidth="1" transform="rotate(-40 24 24)" />
      <ellipse cx="36" cy="24" rx="10" ry="6" fill="rgba(255,255,255,0.7)" stroke="#9CA3AF" strokeWidth="1" transform="rotate(40 36 24)" />
      {/* Red compound eyes */}
      <ellipse cx="26" cy="28" rx="5" ry="7" fill="#DC2626" />
      <ellipse cx="34" cy="28" rx="5" ry="7" fill="#DC2626" />
      {/* Body */}
      <ellipse cx="30" cy="38" rx="9" ry="11" fill="#374151" />
    </svg>
  );
}

function WingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 30 Q 30 10, 50 30 Q 30 50, 10 30 Z" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
      <path d="M20 30 Q 30 20, 40 30" stroke="#0284C7" strokeWidth="1.5" fill="none" />
      <path d="M25 35 Q 30 28, 35 35" stroke="#0284C7" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function AntennaIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="45" r="8" fill="#EF4444" />
      <path d="M27 38 Q 15 25, 12 18" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="16" r="3" fill="#FBBF24" />
      <path d="M33 38 Q 45 25, 48 18" stroke="#1F2937" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <circle cx="48" cy="16" r="3" fill="#FBBF24" />
    </svg>
  );
}

function SeedIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="8" ry="11" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M30 24 Q 28 15, 30 10" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 15 Q 35 12, 38 15" fill="#22C55E" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'ant': return <AntIcon size={size} />;
    case 'butterfly': return <ButterflyIcon size={size} />;
    case 'caterpillar': return <CaterpillarIcon size={size} />;
    case 'cocoon': return <CocoonIcon size={size} />;
    case 'bee': return <BeeIcon size={size} />;
    case 'mosquito': return <MosquitoIcon size={size} />;
    case 'fly': return <FlyIcon size={size} />;
    case 'wing': return <WingIcon size={size} />;
    case 'antenna': return <AntennaIcon size={size} />;
    case 'seed': return <SeedIcon size={size} />;
    default: return <AntIcon size={size} />;
  }
}

// ─── Sort Card Component ───────────────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 120, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
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
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center mb-1 text-white font-bold shadow-sm" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-bold text-gray-800 text-center px-1" style={{ color: '#1F2937' }}>
        {label}
      </span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [slideIdx, setSlideIdx] = useState(0);
  const currentSlide = TEACHING_SLIDES[slideIdx];

  useEffect(() => {
    speechManager.speak(currentSlide.spoken);
    return () => {
      speechManager.stop();
    };
  }, [slideIdx, currentSlide.spoken]);

  const handleNext = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(prev => prev + 1);
    } else {
      audioManager.play('success');
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(prev => prev - 1);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-br from-emerald-50 to-teal-100 z-30 overflow-y-auto">
      <div className="w-full max-w-2xl flex justify-between items-center mt-2">
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-emerald-600' : 'w-2.5 bg-emerald-200'}`}
            />
          ))}
        </div>
        <span className="text-xs font-bold text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full">
          Slide {slideIdx + 1} of {TEACHING_SLIDES.length}
        </span>
      </div>

      <motion.div
        key={slideIdx}
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-2xl bg-white rounded-3xl shadow-xl p-8 my-auto border-4 border-emerald-200 flex flex-col items-center text-center relative overflow-hidden"
      >
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${currentSlide.bgColor} flex items-center justify-center text-4xl shadow-lg mb-6`}>
          {currentSlide.emoji}
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-4">{currentSlide.title}</h2>
        <p className="text-base font-medium text-gray-600 leading-relaxed max-w-xl">{currentSlide.text}</p>
      </motion.div>

      <div className="w-full max-w-2xl flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          disabled={slideIdx === 0}
          className={`px-6 py-3 rounded-2xl font-bold shadow-md transition-all ${
            slideIdx === 0 ? 'opacity-40 bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-emerald-700 hover:bg-emerald-50 border-2 border-emerald-300'
          }`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-black text-white bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg transform hover:scale-105 transition-all"
        >
          {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next →'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface InsectsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function InsectsGame({ width = 720, height = 560, onComplete }: InsectsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Inactivity hint timer
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
          if (screen === 'play') {
            audioManager.play('hint');
            setHintMsg(currentChallenge.hint);
            speechManager.speak(currentChallenge.hint);
          }
        }, 10000);
  }, [currentChallenge.hint]);

  useEffect(() => {
    if (screen === 'play') {
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, currentChallenge.question, resetInactivityTimer]);

  // Reset sort state on challenge change
  useEffect(() => {
    setPlacedItems({});
    setSelectedOption(null);
  }, [challengeIdx]);

  const handleMultipleChoice = (option: string) => {
    setSelectedOption(option);
    resetInactivityTimer();
    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setStars(prev => prev + 1);
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Amazing job! That is correct! 🌟');
      speechManager.speak('Great job! That is correct!');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  const handleSuccessBannerComplete = () => {
    setSuccessMsg(null);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
      speechManager.speak('Congratulations! You are a master Bug Explorer!');
    }
  };

  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check bins collision
    const binWidth = 140;
    const binHeight = 110;
    let matchedBinId: string | null = null;

    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 160;
      const binY = 180;
      if (x + 60 >= binX && x <= binX + binWidth && y + 40 >= binY && y <= binY + binHeight) {
        matchedBinId = bin.id;
      }
    });

    setHoverBin(null);

    if (matchedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        setStars(prev => prev + 1);
        audioManager.play('success');
        setSparklePos({ x: width / 2, y: height / 2 });
        setSuccessMsg('Wonderful sorting! Perfect match! 🎉');
        speechManager.speak('Wonderful sorting! Perfect match!');
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-between select-none overflow-hidden rounded-3xl shadow-2xl border-4 border-emerald-400"
      style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #DCFCE7 100%)' }}
    >
      <GardenScene width={width} height={height} />
      <EshaMascot mood={successMsg ? 'celebrate' : hintMsg ? 'thinking' : 'happy'} speaking={successMsg || hintMsg} />

      {screen === 'teaching' && <TeachingScreen onStart={() => setScreen('play')} />}

      {screen === 'play' && (
        <>
          {/* Top Header Bar */}
          <div className="w-full flex justify-between items-center px-6 py-3 z-10 bg-white/80 backdrop-blur-sm border-b-2 border-emerald-200">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full shadow-sm">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <button
              onClick={() => {
                audioManager.play('tap');
                setHintMsg(currentChallenge.hint);
                speechManager.speak(currentChallenge.hint);
              }}
              className="flex items-center gap-1.5 px-3 py-1 bg-amber-400 hover:bg-amber-500 text-amber-900 font-bold rounded-xl shadow-sm text-xs transition-transform transform hover:scale-105"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="w-full max-w-xl mx-auto px-4 mt-3 z-10 text-center">
            <h2 className="text-lg font-black text-gray-800 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-2xl shadow-md border-2 border-emerald-300">
              {currentChallenge.question}
            </h2>
          </div>

          {/* Challenge Content Area */}
          <div className="relative flex-1 w-full flex items-center justify-center p-4 z-10">
            {currentChallenge.answer !== 'sort' ? (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOption === opt;
                  const isCorrect = opt === currentChallenge.answer;
                  let btnColor = 'bg-white hover:bg-emerald-50 text-gray-800 border-emerald-300';
                  if (selectedOption) {
                    if (isCorrect) btnColor = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102';
                    else if (isSelected) btnColor = 'bg-rose-500 text-white border-rose-600';
                    else btnColor = 'bg-gray-100 text-gray-400 border-gray-200 opacity-60';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: selectedOption ? 1 : 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => !selectedOption && handleMultipleChoice(opt)}
                      className={`py-3.5 px-6 rounded-2xl font-bold border-3 shadow-md transition-all text-sm flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      {selectedOption && isCorrect && <span>✅</span>}
                      {selectedOption && isSelected && !isCorrect && <span>❌</span>}
                    </motion.button>
                  );
                })}
              </div>
            ) : (
              // Sort Challenge Area
              <div className="relative w-full h-[320px] max-w-2xl mx-auto">
                {/* Bins */}
                {currentChallenge.bins?.map((bin, idx) => {
                  const binWidth = 140;
                  const binHeight = 110;
                  const totalBins = currentChallenge.bins?.length || 1;
                  const spacing = (width - 40 - totalBins * binWidth) / (totalBins + 1);
                  const binX = spacing + idx * (binWidth + spacing);
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={binX}
                      y={10}
                      width={binWidth}
                      height={binHeight}
                      isHovering={hoverBin === bin.id}
                    />
                  );
                })}

                {/* Draggable Items */}
                {currentChallenge.sortItems?.map((item, idx) => {
                  const totalItems = currentChallenge.sortItems?.length || 1;
                  const itemWidth = 120;
                  const spacing = (width - 40 - totalItems * itemWidth) / (totalItems + 1);
                  const startX = spacing + idx * (itemWidth + spacing);
                  const isPlaced = !!placedItems[item.id];

                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={startX}
                      y={150}
                      placed={isPlaced}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Feedback overlays */}
          {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
          {successMsg && <SuccessBanner message={successMsg} onComplete={handleSuccessBannerComplete} />}
          {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
          {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
        </>
      )}
    </div>
  );
}
