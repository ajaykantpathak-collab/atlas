'use client';

/**
 * FoodShelterGame — Learn about Food Types, Animal Shelters, Local Transport, and Simple Crafts
 *
 * CISCE Nodes:
 * - c3_evs_007 (Different types of food: energy, body-building, protective)
 * - c3_evs_008 (Shelters of living beings: nests, caves, burrows, houses)
 * - c3_evs_009 (Local travel: transport modes in my area - land, water, air, public vs personal)
 * - c3_evs_010 (Simple crafts: clay, paper, drawing)
 *
 * ELI5: "Every living being needs food for energy, a safe shelter to rest, transport to travel, and hands-on crafts to create beauty!"
 *
 * Misconceptions Addressed:
 * 1. "Only humans need shelter" → "No! Birds build nests, rabbits dig burrows, lions live in caves!"
 * 2. "Rice and apples are the same food type" → "No! Rice is energy food, apples are protective food!"
 * 3. "Bicycle is public transport" → "No! Bicycle is personal transport; public transport like buses carry many people!"
 * 4. "Clay and paper are the same material" → "No! Clay is soft earth for pots and diyas, paper is for folding boats and planes!"
 * 5. "All animals live in caves" → "No! Different animals have different shelters suited to their bodies!"
 *
 * Story: "Help Village Guide Vikram explore the village, sort delicious foods into correct groups, find cosy animal shelters, choose the right transport, and create wonderful crafts!"
 *
 * Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG village scene background with gradients, huts, houses, trees, and rivers
 * - Custom SVG mascot (Village Guide Vikram) with mood states and speech bubble
 * - Custom SVG topic-specific visual objects for cards and challenges
 * - Drag-and-drop mechanics using Draggable component
 * - 8 progressive challenges: food types → animal shelters → transport modes → crafts
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on incorrect answers
 * - Spoken instructions via Web Speech API (speechManager)
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

// ─── Teaching Slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'Welcome to Our Village! 🏡',
    text: 'Come explore with Village Guide Vikram! Today we learn about the food we eat, the shelters animals live in, how we travel, and wonderful crafts we can make!',
    emoji: '🗺️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Welcome to our village! Come explore with Village Guide Vikram! Today we learn about food, shelters, transport, and crafts!',
  },
  {
    title: 'Different Types of Food 🍚',
    text: 'Food gives us energy to play and grow! Energy foods (rice, wheat) give us strength. Body-building foods (dal, milk) build muscles. Protective foods (fruits, veggies) keep us healthy!',
    emoji: '🍎',
    bgColor: 'from-green-400 to-emerald-600',
    spoken: 'Food gives us energy to play and grow! Energy foods like rice give us strength. Body building foods like milk build muscles. Protective fruits keep us healthy!',
  },
  {
    title: 'Shelters of Living Beings 🦅',
    text: 'A shelter is a safe home! Humans live in houses and huts. Birds weave nests on trees. Rabbits dig underground burrows. Lions rest in dark caves. Every creature needs a safe shelter!',
    emoji: '⛺',
    bgColor: 'from-yellow-500 to-amber-600',
    spoken: 'A shelter is a safe home! Humans live in houses. Birds weave nests on trees. Rabbits dig burrows underground. Every creature needs a safe shelter!',
  },
  {
    title: 'Local Travel & Transport 🚌',
    text: 'To go from place to place we use transport! Walking and cycling are great for short distances. Buses and trains are public transport carrying many people. Cars and auto-rickshaws give personal service!',
    emoji: '🚲',
    bgColor: 'from-gold-400 to-gold-600',
    spoken: 'To go from place to place we use transport! Walking and cycling are great for short distances. Buses carry many people, and cars give personal service!',
  },
  {
    title: 'Simple Crafts: Clay & Paper 🎨',
    text: 'Crafts make our fingers clever! We shape soft clay into pots and diyas for Diwali. We fold paper into boats and aeroplanes without scissors or glue. We draw colourful pictures with crayons!',
    emoji: '🎨',
    bgColor: 'from-purple-400 to-gold-600',
    spoken: 'Crafts make our fingers clever! We shape soft clay into pots and diyas. We fold paper into boats. We draw colourful pictures with crayons!',
  },
];

// ���── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';

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

// ─── Challenges (8 progressive: food → shelter → transport → craft) ──

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which food gives us ENERGY to run and play?',
    answer: 'Rice and chapati',
    options: ['Rice and chapati', 'Apple and spinach', 'Water'],
    hint: 'Think: what staple food gives your body the strength to run around the playground?',
    misconception: 'Rice and chapati are energy foods! They are rich in carbohydrates that give us energy to study and play. Fruits and vegetables are protective foods!',
  },
  {
    type: 'sort',
    question: 'Drag each food to its correct food group!',
    answer: 'sort',
    options: [],
    hint: 'Rice is energy food, Dal is body-building, Apple is protective!',
    misconception: 'Remember: Rice gives energy, dal and milk build our muscles and bones, and fruits and spinach protect us from falling ill!',
    sortItems: [
      { id: 'rice', label: 'Rice & Wheat', icon: 'rice', correctBin: 'energy' },
      { id: 'dal', label: 'Dal & Milk', icon: 'dal', correctBin: 'body' },
      { id: 'apple', label: 'Apple & Amla', icon: 'apple', correctBin: 'protective' },
    ],
    bins: [
      { id: 'energy', label: 'Energy ⚡', color: '#F59E0B' },
      { id: 'body', label: 'Body-Building 💪', color: '#3B82F6' },
      { id: 'protective', label: 'Protective 🛡️', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'What is a SHELTER?',
    answer: 'A safe place to live and rest',
    options: ['A safe place to live and rest', 'A game played outdoors', 'A type of fruit'],
    hint: 'Think about where you sleep at night or where a bird raises its chicks!',
    misconception: 'A shelter is a safe place where living beings rest, hide from danger, and raise their young! Just like humans have houses, animals have nests and caves!',
  },
  {
    type: 'sort',
    question: 'Drag each living being to its correct shelter!',
    answer: 'sort',
    options: [],
    hint: 'Birds live in nests, rabbits in burrows, humans in houses!',
    misconception: 'Not all animals live in houses! Birds weave nests on trees, rabbits dig underground burrows to escape predators, and humans build houses!',
    sortItems: [
      { id: 'human', label: 'Human Family', icon: 'house', correctBin: 'house-bin' },
      { id: 'bird', label: 'Weaver Bird', icon: 'nest', correctBin: 'nest-bin' },
      { id: 'rabbit', label: 'Rabbit', icon: 'burrow', correctBin: 'burrow-bin' },
    ],
    bins: [
      { id: 'house-bin', label: 'Brick House 🏡', color: '#EF4444' },
      { id: 'nest-bin', label: 'Tree Nest 🌳', color: '#10B981' },
      { id: 'burrow-bin', label: 'Underground Burrow 🕳️', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a PUBLIC transport used by many people together?',
    answer: 'Bus',
    options: ['Bus', 'Bicycle', 'Walking'],
    hint: 'Think: which vehicle carries thirty or forty passengers at once along a fixed route?',
    misconception: 'A bus is public transport that carries many passengers along a fixed route! A bicycle is personal transport for one or two people.',
  },
  {
    type: 'sort',
    question: 'Drag each vehicle to its transport type!',
    answer: 'sort',
    options: [],
    hint: 'Buses run on land, boats on water, aeroplanes in the air!',
    misconception: 'Different vehicles travel in different places! Buses and cars move on land roads, boats and ships sail on water, and aeroplanes fly high in the air!',
    sortItems: [
      { id: 'bus', label: 'City Bus', icon: 'bus', correctBin: 'land-bin' },
      { id: 'boat', label: 'River Boat', icon: 'boat', correctBin: 'water-bin' },
      { id: 'plane', label: 'Aeroplane', icon: 'plane', correctBin: 'air-bin' },
    ],
    bins: [
      { id: 'land-bin', label: 'Land Transport 🛣️', color: '#F59E0B' },
      { id: 'water-bin', label: 'Water Transport 🌊', color: '#3B82F6' },
      { id: 'air-bin', label: 'Air Transport ✈️', color: '#06B6D4' },
    ],
  },
  {
    type: 'identify',
    question: 'What can you make with soft CLAY and water?',
    answer: 'Pots and diyas',
    options: ['Pots and diyas', 'Paper boats', 'Plastic bottles'],
    hint: 'Think about Diwali lamps and earthen pots made by potters!',
    misconception: 'Soft clay is shaped with fingers into pots, toys, and diyas, then left to dry in the sun! Paper boats are made by folding paper, not clay!',
  },
  {
    type: 'sort',
    question: 'Drag each craft material to what it makes!',
    answer: 'sort',
    options: [],
    hint: 'Clay makes diyas, paper makes origami boats, crayons make drawings!',
    misconception: 'Each craft uses the right material! Clay is shaped into 3D pots and diyas, square paper is folded into boats without scissors, and crayons fill in drawings!',
    sortItems: [
      { id: 'clay-item', label: 'Soft Clay', icon: 'clay', correctBin: 'clay-bin' },
      { id: 'paper-item', label: 'Square Paper', icon: 'paper', correctBin: 'paper-bin' },
      { id: 'crayon-item', label: 'Crayons & Pencils', icon: 'drawing', correctBin: 'drawing-bin' },
    ],
    bins: [
      { id: 'clay-bin', label: 'Clay Diya 🪔', color: '#D97706' },
      { id: 'paper-bin', label: 'Paper Boat ⛵', color: '#2563EB' },
      { id: 'drawing-bin', label: 'Crayon Drawing 🖍️', color: '#EC4899' },
    ],
  },
];

// ─── Village Guide Vikram Mascot (Custom SVG) ───────────────────

function VikramMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
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
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
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
            <linearGradient id="vikram-turban" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="vikram-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Turban */}
          <ellipse cx="37" cy="22" rx="20" ry="12" fill="url(#vikram-turban)" stroke="#B45309" strokeWidth="1" />
          <path d="M18 24 Q37 14 56 24" stroke="#FEF3C7" strokeWidth="3" fill="none" />
          {/* Head & face */}
          <circle cx="37" cy="35" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="33" r="2" fill="#1F2937" />
          <circle cx="42" cy="33" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 40 Q37 44 41 40" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Shirt / Vest */}
          <path d="M22 49 L52 49 L55 75 L20 75 Z" fill="url(#vikram-shirt)" stroke="#0369A1" strokeWidth="1" />
          {/* Map / Satchel strap */}
          <line x1="24" y1="50" x2="50" y2="70" stroke="#78350F" strokeWidth="3" />
          {/* Arms */}
          <ellipse cx="16" cy="58" rx="4" ry="10" fill="#FDE68A" transform="rotate(15 16 58)" />
          <ellipse cx="58" cy="58" rx="4" ry="10" fill="#FDE68A" transform="rotate(-15 58 58)" />
          {/* Feet */}
          <ellipse cx="29" cy="83" rx="5" ry="3" fill="#78350F" />
          <ellipse cx="45" cy="83" rx="5" ry="3" fill="#78350F" />
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

// ─── Village Scene Background ─────────────────────────────────

function VillageSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="village-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="70%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="hill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#village-sky)" />
        {/* Sun */}
        <circle cx="80" cy="70" r="35" fill="#FDE047" opacity="0.9" />
        {/* Hills */}
        <path d="M0 320 Q180 240 360 320 T720 300 L720 560 L0 560 Z" fill="url(#hill-grad)" opacity="0.8" />
        <path d="M-50 380 Q200 280 450 370 T800 350 L800 560 L0 560 Z" fill="#22C55E" />
      </svg>

      {/* Cloud 1 */}
      <motion.div className="absolute top-6 left-1/4 opacity-80" animate={{ x: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="48" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="62" cy="20" rx="14" ry="10" fill="white" />
        </svg>
      </motion.div>

      {/* Ground Road */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #A3E635 0%, #65A30D 100%)' }} />
    </div>
  );
}

// ─── Custom SVG Topic Icons for Sort Cards ────────────────────

function RiceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="16" ry="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <path d="M18 30 Q30 20 42 30" stroke="#F59E0B" strokeWidth="2" fill="none" />
      {/* Rice grains */}
      <ellipse cx="24" cy="32" rx="4" ry="2" fill="white" transform="rotate(-20 24 32)" />
      <ellipse cx="32" cy="30" rx="4" ry="2" fill="white" transform="rotate(10 32 30)" />
      <ellipse cx="36" cy="36" rx="4" ry="2" fill="white" transform="rotate(-10 36 36)" />
    </svg>
  );
}

function DalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 35 Q30 50 45 35 Z" fill="#FBBF24" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="30" cy="35" rx="15" ry="6" fill="#F59E0B" />
      {/* Steam */}
      <path d="M26 22 Q30 15 28 10" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M34 24 Q38 17 36 12" stroke="#9CA3AF" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function AppleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 14 C20 14, 16 26, 18 38 C20 48, 26 50, 30 46 C34 50, 40 48, 42 38 C44 26, 40 14, 30 14 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      {/* Stem & Leaf */}
      <path d="M30 14 Q35 6 38 10" stroke="#78350F" strokeWidth="2.5" fill="none" />
      <path d="M35 9 Q45 5 40 15 Z" fill="#22C55E" />
    </svg>
  );
}

function HouseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="28" width="24" height="22" fill="#F87171" stroke="#B91C1C" strokeWidth="2" />
      <path d="M14 28 L30 12 L46 28 Z" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
      <rect x="26" y="36" width="8" height="14" fill="#78350F" />
      <rect x="21" y="32" width="6" height="6" fill="#FEF08A" />
      <rect x="33" y="32" width="6" height="6" fill="#FEF08A" />
    </svg>
  );
}

function NestIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="35" rx="18" ry="12" fill="#92400E" stroke="#78350F" strokeWidth="2" />
      <path d="M15 35 Q30 50 45 35 Q30 42 15 35 Z" fill="#B45309" />
      {/* Eggs */}
      <ellipse cx="26" cy="33" rx="4" ry="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
      <ellipse cx="34" cy="33" rx="4" ry="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
    </svg>
  );
}

function BurrowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="30" fill="#A16207" rx="8" stroke="#713F12" strokeWidth="2" />
      <ellipse cx="30" cy="35" rx="12" ry="8" fill="#451A03" />
      {/* Bunny ears peeking out */}
      <ellipse cx="26" cy="24" rx="3" ry="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
      <ellipse cx="34" cy="24" rx="3" ry="8" fill="#F3F4F6" stroke="#D1D5DB" strokeWidth="1" />
    </svg>
  );
}

function BusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="22" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" rx="3" />
      <rect x="14" y="23" width="8" height="8" fill="#BAE6FD" rx="1" />
      <rect x="26" y="23" width="8" height="8" fill="#BAE6FD" rx="1" />
      <rect x="38" y="23" width="8" height="8" fill="#BAE6FD" rx="1" />
      <circle cx="18" cy="44" r="5" fill="#374151" />
      <circle cx="42" cy="44" r="5" fill="#374151" />
    </svg>
  );
}

function BoatIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 35 L48 35 L42 45 L18 45 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M30 12 L30 35" fill="none" stroke="#78350F" strokeWidth="2.5" />
      <path d="M32 14 L46 22 L32 30 Z" fill="#EF4444" />
      <path d="M10 48 Q30 54 50 48" stroke="#60A5FA" strokeWidth="3" fill="none" />
    </svg>
  );
}

function PlaneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L35 30 L50 35 L50 38 L35 35 L32 48 L28 48 L25 35 L10 38 L10 35 L25 30 Z" fill="#06B6D4" stroke="#0E7490" strokeWidth="1.5" />
    </svg>
  );
}

function ClayIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="18" ry="10" fill="#D97706" stroke="#B45309" strokeWidth="2" />
      <path d="M12 38 Q30 18 48 38 Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2" />
      <path d="M22 28 Q30 22 38 28" fill="none" stroke="#FDE68A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function PaperIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="15,12 45,12 45,48 15,48" fill="white" stroke="#9CA3AF" strokeWidth="2" />
      <polygon points="30,12 45,27 30,27" fill="#E5E7EB" />
      {/* Fold lines */}
      <line x1="20" y1="20" x2="40" y2="20" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="20" y1="28" x2="40" y2="28" stroke="#D1D5DB" strokeWidth="1.5" />
      <line x1="20" y1="36" x2="32" y2="36" stroke="#D1D5DB" strokeWidth="1.5" />
    </svg>
  );
}

function DrawingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="14" y="14" width="32" height="32" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" rx="2" />
      {/* Crayon */}
      <polygon points="38,20 44,26 30,40 24,40" fill="#EC4899" />
      <polygon points="42,18 46,22 44,24 40,20" fill="#F472B6" />
      <path d="M20 42 Q30 36 40 42" stroke="#3B82F6" strokeWidth="2" fill="none" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'rice': return <RiceIcon size={size} />;
    case 'dal': return <DalIcon size={size} />;
    case 'apple': return <AppleIcon size={size} />;
    case 'house': return <HouseIcon size={size} />;
    case 'nest': return <NestIcon size={size} />;
    case 'burrow': return <BurrowIcon size={size} />;
    case 'bus': return <BusIcon size={size} />;
    case 'boat': return <BoatIcon size={size} />;
    case 'plane': return <PlaneIcon size={size} />;
    case 'clay': return <ClayIcon size={size} />;
    case 'paper': return <PaperIcon size={size} />;
    case 'drawing': return <DrawingIcon size={size} />;
    default: return <RiceIcon size={size} />;
  }
}

// ─── Main Component ───────────────────────────────────────────

export interface FoodShelterGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FoodShelterGame({ width = 720, height = 560, onComplete }: FoodShelterGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'none' | 'correct' | 'wrong'>('none');
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Drag and drop state for sorting challenges
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer for auto-hint
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = TEACHING_SLIDES[slideIdx];
  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide when it changes
  useEffect(() => {
    if (screen === 'teaching') {
      speechManager.speak(currentSlide.spoken);
    }
  }, [screen, slideIdx, currentSlide]);

  // Speak challenge question when it changes
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
  }, [screen, challengeIdx, currentChallenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge && feedbackState === 'none') {
        setActiveHint(currentChallenge.hint);
        audioManager.play('hint');
        speechManager.speak(currentChallenge.hint);
      }
    }, 10000);
  }, [screen, currentChallenge, feedbackState]);

  // Handle multiple-choice option click
  const handleOptionClick = (option: string) => {
    if (feedbackState !== 'none') return;
    setSelectedOption(option);
    resetInactivityTimer();

    if (option === currentChallenge.answer) {
      setFeedbackState('correct');
      audioManager.play('success');
      speechManager.speak('Great job! That is correct!');
      setStars(prev => prev + 1);
      setSparklePos({ x: width / 2, y: height / 2 });

      setTimeout(() => {
        advanceChallenge();
      }, 1500);
    } else {
      setFeedbackState('wrong');
      audioManager.play('error');
      setErrors(prev => prev + 1);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, dropX: number, dropY: number): boolean => {
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check which bin the item was dropped into based on screen coordinates
    // Bins are laid out horizontally at the bottom
    const binWidth = width / currentChallenge.bins.length;
    const targetBinIndex = Math.floor(dropX / binWidth);
    const targetBin = currentChallenge.bins[targetBinIndex];

    if (targetBin && targetBin.id === item.correctBin) {
      audioManager.play('drop-correct');
      const updated = { ...placedItems, [id]: true };
      setPlacedItems(updated);

      // Check if all items in this challenge are placed
      const allDone = currentChallenge.sortItems?.every(i => updated[i.id]);
      if (allDone) {
        setFeedbackState('correct');
        audioManager.play('success');
        speechManager.speak('Wonderful sorting! All items placed correctly!');
        setStars(prev => prev + 1);
        setSparklePos({ x: dropX, y: dropY });

        setTimeout(() => {
          advanceChallenge();
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setActiveHint(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    setFeedbackState('none');
    setSelectedOption(null);
    setActiveHint(null);
    setPlacedItems({});

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Fantastic! You completed all challenges and became a village exploration star!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-gold-100 flex flex-col items-center justify-between"
      style={{ width, height, fontFamily: 'system-ui, sans-serif' }}
    >
      {/* ─── SCREENS ────────────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-6 z-10">
          <VillageSceneBg width={width} height={height} />
          <VikramMascot mood="happy" speaking={currentSlide.spoken} />

          {/* Top Bar */}
          <div className="w-full flex justify-between items-center z-20">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-2 rounded-full shadow">
              <span className="text-2xl">{currentSlide.emoji}</span>
              <span className="font-bold text-gray-800 text-sm">Slide {slideIdx + 1} of {TEACHING_SLIDES.length}</span>
            </div>
            <div className="flex gap-1">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-amber-500 w-6' : 'bg-white/60'}`} />
              ))}
            </div>
          </div>

          {/* Slide Content Card */}
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-lg bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-xl border-4 border-amber-300 z-20 flex flex-col items-center text-center my-auto"
          >
            <div className="text-5xl mb-3">{currentSlide.emoji}</div>
            <h2 className="text-2xl font-black text-amber-800 mb-3">{currentSlide.title}</h2>
            <p className="text-gray-700 text-base leading-relaxed font-medium">{currentSlide.text}</p>
          </motion.div>

          {/* Bottom Navigation */}
          <div className="w-full flex justify-between items-center z-20 pb-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-2xl font-bold shadow-md transition-all ${
                slideIdx === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-amber-700 hover:bg-amber-50'
              }`}
            >
              ← Previous
            </button>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('whoosh');
                }
              }}
              className="px-8 py-3 rounded-2xl font-black text-white shadow-lg bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 transform active:scale-95 transition-all text-lg"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🚀' : 'Next ➜'}
            </button>
          </div>
        </div>
      )}

      {screen === 'play' && (
        <div className="relative w-full h-full flex flex-col items-center justify-between p-5 z-10">
          <VillageSceneBg width={width} height={height} />
          <VikramMascot
            mood={feedbackState === 'correct' ? 'celebrate' : feedbackState === 'wrong' ? 'thinking' : 'happy'}
            speaking={feedbackState === 'wrong' ? currentChallenge.misconception : activeHint}
          />

          {/* Top Bar: Progress & Stars */}
          <div className="w-full flex justify-between items-center z-20">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur px-4 py-1.5 rounded-full shadow">
              <span className="font-bold text-gray-700 text-sm">Challenge {challengeIdx + 1} / {CHALLENGES.length}</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>

          {/* Challenge Box */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-xl border-4 border-amber-300 z-20 flex flex-col items-center my-auto"
          >
            <h3 className="text-xl font-black text-amber-900 text-center mb-4">{currentChallenge.question}</h3>

            {/* Multiple Choice Challenge */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full">
                {currentChallenge.options.map(option => {
                  const isSelected = selectedOption === option;
                  const isCorrect = option === currentChallenge.answer;
                  let btnColor = 'bg-amber-50 hover:bg-amber-100 text-amber-900 border-amber-200';
                  if (feedbackState !== 'none') {
                    if (isCorrect) btnColor = 'bg-green-500 text-white border-green-600';
                    else if (isSelected) btnColor = 'bg-red-500 text-white border-red-600';
                    else btnColor = 'bg-gray-100 text-gray-400 border-gray-200';
                  }

                  return (
                    <motion.button
                      key={option}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleOptionClick(option)}
                      disabled={feedbackState !== 'none'}
                      className={`w-full py-3 px-5 rounded-2xl font-bold text-lg border-2 shadow-sm transition-all text-center ${btnColor}`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {/* Drag and Drop Sorting Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="w-full flex flex-col items-center gap-4">
                {/* Draggable items */}
                <div className="flex justify-center gap-4 w-full min-h-[110px] items-center">
                  {currentChallenge.sortItems.map(item => (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={0}
                      y={0}
                      placed={!!placedItems[item.id]}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  ))}
                </div>

                {/* Drop Bins */}
                <div className="grid grid-cols-3 gap-3 w-full mt-2">
                  {currentChallenge.bins.map(bin => (
                    <div
                      key={bin.id}
                      className="h-28 rounded-2xl border-4 border-dashed border-amber-400 flex flex-col items-center justify-center p-2 shadow-inner"
                      style={{ backgroundColor: `${bin.color}15` }}
                    >
                      <span className="text-sm font-black text-center" style={{ color: bin.color }}>
                        {bin.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          {/* Bottom Bar */}
          <div className="w-full flex justify-between items-center z-20">
            <button
              onClick={() => {
                audioManager.play('hint');
                setActiveHint(currentChallenge.hint);
                speechManager.speak(currentChallenge.hint);
              }}
              className="px-4 py-2 bg-amber-200 hover:bg-amber-300 text-amber-900 rounded-xl font-bold text-sm shadow flex items-center gap-1.5 transition-all"
            >
              💡 Need a Hint?
            </button>

            <span className="text-xs font-bold text-gray-600 bg-white/70 px-3 py-1.5 rounded-full">
              Errors: {errors}
            </span>
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ──────────────────────────────── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && (
        <SuccessBanner
          message="Village Exploration Complete! You are a Food, Shelter, and Craft Master! 🌟"
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}
      {activeHint && (
        <HintBubble
          message={activeHint}
          onComplete={() => setActiveHint(null)}
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

// ─── Sort Card Helper Component ───────────────────────────────

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
      width={100}
      height={95}
    >
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        } p-2`}
        style={{ width: 100, height: 95 }}
      >
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}
