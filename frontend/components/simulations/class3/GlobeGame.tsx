'use client';

/**
 * GlobeGame — Learn about the Globe, Earth shape, size, continents, oceans, and equator.
 *
 * CISCE Nodes: c3_geo_001 (Globe - model of Earth), c3_geo_002 (Earth - shape and size)
 * Enrichment: c3_geography_enrichment_part1-2
 *
 * ELI5: "The Earth is so huge that we can never see all of it at once. So we make
 *   a small round ball that looks just like the Earth — that ball is a globe.
 *   The Earth is round like a ball, slightly squashed at the poles and bulging at
 *   the equator. It is called the blue planet because two-thirds is covered in water!"
 *
 * Misconceptions:
 *   1. "Earth is flat because the ground looks flat to us." → "No! Earth is a
 *      spherical geoid — photos from space prove it is a round blue ball!"
 *   2. "Earth is mostly land." → "No! About two-thirds (71%) of Earth is covered
 *      in water! That is why it looks blue from space!"
 *   3. "A globe and a flat map show the Earth in the same way." → "No! A globe
 *      shows the true round shape without distortion. Flat maps stretch some parts!"
 *   4. "The axis of the globe is just a stand to hold it." → "No! The axis represents
 *      the imaginary line around which the real Earth spins!"
 *   5. "The equator is a real line painted on the ground." → "No! The equator is
 *      an imaginary line drawn around the middle of the Earth!"
 *
 * Story: "Help Geeta the Geographer explore the Earth, spin the globe, and learn
 *   all about our wonderful blue home planet to become a Master Geographer!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG world explorer scene background with globe, stars, space
 * - Custom SVG geographic objects (Globe, Earth from space, Continent, Ocean, Equator, Poles, Axis, Compass, Ship)
 * - Custom SVG Geographer mascot (Geeta) with magnifying glass and lab coat
 * - Drag-and-drop: drag items into correct classification bins
 * - 8 progressive challenges: identify globe → shape → sort globe vs map → water → parts of earth → size → true/false → globe use
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects (drop, success, celebration)
 * - Confetti + celebration on success
 * - Auto-hint after inactivity
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── GameScreen Type Definition (Must be defined before use!) ──
type GameScreen = 'teaching' | 'play';

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: 'The Globe — Model of Earth 🌍',
    text: 'A globe is a small spherical model of the Earth. Because the Earth is too huge to see all at once, a globe shrinks it down so we can study continents and oceans in proportion!',
    emoji: '🌍',
    bgColor: 'from-blue-500 to-indigo-600',
    spoken: 'A globe is a small spherical model of the Earth. Because the Earth is too huge to see all at once, a globe shrinks it down so we can study continents and oceans in proportion!',
  },
  {
    title: 'Shape and Size of Earth 🌐',
    text: 'The Earth is shaped like a sphere — slightly flattened at the poles and bulging at the equator. It is about 12,742 kilometres across and 40,000 kilometres around!',
    emoji: '🌐',
    bgColor: 'from-cyan-500 to-blue-600',
    spoken: 'The Earth is shaped like a sphere, slightly flattened at the poles and bulging at the equator. It is about 12,742 kilometres across and 40,000 kilometres around!',
  },
  {
    title: 'Land and Water 🌊',
    text: 'The Earth is called the blue planet because about two-thirds of its surface is covered with water (oceans), while one-third is land (continents like Asia and Africa)!',
    emoji: '🌊',
    bgColor: 'from-teal-500 to-cyan-600',
    spoken: 'The Earth is called the blue planet because about two-thirds of its surface is covered with water, while one-third is land!',
  },
  {
    title: 'Axis and Equator 🧭',
    text: 'A tilted rod passing through the globe is the axis, representing the line Earth spins on. The equator is the imaginary belt around the middle dividing Northern and Southern hemispheres!',
    emoji: '🧭',
    bgColor: 'from-indigo-500 to-purple-600',
    spoken: 'A tilted rod passing through the globe is the axis, representing the line Earth spins on. The equator is the imaginary belt around the middle!',
  },
  {
    title: 'Globe vs. Flat Map 🗺️',
    text: 'A globe shows the true round shape of Earth without stretching. Flat maps are easy to carry and show details, but they always distort some parts of the Earth!',
    emoji: '🗺️',
    bgColor: 'from-blue-600 to-teal-600',
    spoken: 'A globe shows the true round shape of Earth without stretching. Flat maps are easy to carry and show details, but they distort some parts!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type ChallengeType = 'identify_globe' | 'identify_shape' | 'sort_model' | 'identify_water' | 'sort_parts' | 'identify_size' | 'sort_truefalse' | 'sort_globe_uses';

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
    type: 'identify_globe',
    question: 'What is a GLOBE?',
    answer: 'A small round model of the Earth',
    options: ['A small round model of the Earth', 'A type of flat paper map', 'A flying compass'],
    hint: 'Think: what do we call the round ball sitting on the classroom table that shows all continents?',
    misconception: 'A globe is a small spherical model of the Earth that shows its true round shape! It is not a flat map or a compass.',
  },
  {
    type: 'identify_shape',
    question: 'What is the shape of the Earth?',
    answer: 'Round like a ball (geoid)',
    options: ['Round like a ball (geoid)', 'Flat like a plate', 'Square like a box'],
    hint: 'Think about photographs taken by astronauts from space — what shape do they show?',
    misconception: 'The Earth is not flat! It is round like a ball (a spherical geoid), slightly flattened at the poles and bulging at the equator. Space photos prove this!',
  },
  {
    type: 'sort_model',
    question: 'Drag each feature to Globe or Map!',
    answer: 'sort',
    options: [],
    hint: 'Globes are 3D round models showing true shapes. Flat maps are 2D paper drawings that can be folded.',
    misconception: 'Globes show the true round shape and cannot be folded. Flat maps are 2D drawings on paper that can be folded and carried easily!',
    sortItems: [
      { id: 'g1', label: 'Round 3D model', icon: 'globe', correctBin: 'globe' },
      { id: 'g2', label: 'Shows true shape', icon: 'earth', correctBin: 'globe' },
      { id: 'm1', label: 'Flat 2D paper', icon: 'compass', correctBin: 'map' },
      { id: 'm2', label: 'Can be folded', icon: 'ship', correctBin: 'map' },
    ],
    bins: [
      { id: 'globe', label: 'Globe 🌍', color: '#3B82F6' },
      { id: 'map', label: 'Flat Map 🗺️', color: '#14B8A6' },
    ],
  },
  {
    type: 'identify_water',
    question: "Why is the Earth called the 'blue planet'?",
    answer: 'Because most of it is covered with water',
    options: ['Because most of it is covered with water', 'Because the sky is blue', 'Because it has blue animals'],
    hint: 'Look at photographs from space — what covers about two-thirds of the Earth?',
    misconception: 'Earth is called the blue planet because about two-thirds (71%) of its surface is covered with huge oceans of blue water! The sky is blue too, but the oceans make Earth look blue from space.',
  },
  {
    type: 'sort_parts',
    question: 'Drag each part of the Earth to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Land is brown/green, water is blue, equator is the middle belt, poles are top and bottom!',
    misconception: 'Land is brown and green (continents), water is blue (oceans), the equator is the middle line dividing hemispheres, and the poles are the top and bottom points!',
    sortItems: [
      { id: 'p1', label: 'Land (Continents)', icon: 'land', correctBin: 'land-bin' },
      { id: 'p2', label: 'Water (Oceans)', icon: 'water', correctBin: 'water-bin' },
      { id: 'p3', label: 'Equator (Belt)', icon: 'equator', correctBin: 'equator-bin' },
      { id: 'p4', label: 'North Pole (Top)', icon: 'northpole', correctBin: 'pole-bin' },
    ],
    bins: [
      { id: 'land-bin', label: 'Land 🏔️', color: '#10B981' },
      { id: 'water-bin', label: 'Water 🌊', color: '#3B82F6' },
      { id: 'equator-bin', label: 'Equator 🌐', color: '#8B5CF6' },
      { id: 'pole-bin', label: 'Pole ❄️', color: '#EC4899' },
    ],
  },
  {
    type: 'identify_size',
    question: 'How much of the Earth is covered by water?',
    answer: 'About two-thirds (2/3)',
    options: ['About two-thirds (2/3)', 'About half (1/2)', 'Almost all (9/10)'],
    hint: 'Think about the oceans and seas — they take up much more space than land!',
    misconception: 'About two-thirds (two out of three parts) of the Earth is covered by water! Land takes up only about one-third of the planet.',
  },
  {
    type: 'sort_truefalse',
    question: 'Drag each fact about Earth to True or False!',
    answer: 'sort',
    options: [],
    hint: 'Earth is very large, millions live on it (True). Earth is not as small as a football and you cannot walk around it in a day (False)!',
    misconception: 'Earth is enormously large — it takes days to travel around it and millions live here! It is definitely not as small as a football or smaller than the moon.',
    sortItems: [
      { id: 'tf1', label: 'Earth is very large', icon: 'earth', correctBin: 'true-bin' },
      { id: 'tf2', label: 'Millions live on Earth', icon: 'continent', correctBin: 'true-bin' },
      { id: 'tf3', label: 'Earth is as small as football', icon: 'globe', correctBin: 'false-bin' },
      { id: 'tf4', label: 'You can walk around in a day', icon: 'ship', correctBin: 'false-bin' },
    ],
    bins: [
      { id: 'true-bin', label: 'True ✅', color: '#22C55E' },
      { id: 'false-bin', label: 'False ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'sort_globe_uses',
    question: 'Can a globe show this? Sort into Globe Can / Cannot!',
    answer: 'sort',
    options: [],
    hint: 'Globes show continents, oceans, true shapes, and the equator. They are too small to show tiny streets or weather forecasts!',
    misconception: 'Globes show continents, oceans, and true shapes in proportion! But because they are small models, they CANNOT show tiny streets, house numbers, or live weather forecasts.',
    sortItems: [
      { id: 'gu1', label: 'Continents & Oceans', icon: 'ocean', correctBin: 'can-bin' },
      { id: 'gu2', label: 'Equator and Poles', icon: 'axis', correctBin: 'can-bin' },
      { id: 'gu3', label: 'Small streets & houses', icon: 'scale', correctBin: 'cannot-bin' },
      { id: 'gu4', label: 'Live weather forecast', icon: 'compass', correctBin: 'cannot-bin' },
    ],
    bins: [
      { id: 'can-bin', label: 'Globe Can ✅', color: '#22C55E' },
      { id: 'cannot-bin', label: 'Globe Cannot ❌', color: '#EF4444' },
    ],
  },
];

// ─── Geeta Mascot (Friendly Geographer with Globe & Magnifying Glass) ──

function GeetaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-blue-300"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
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
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="geeta-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#FACC15" />
            </linearGradient>
            <linearGradient id="geeta-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* Hat / Explorer hat */}
          <ellipse cx="37" cy="18" rx="20" ry="5" fill="#B45309" />
          <path d="M22 16 Q37 2 52 16 Z" fill="#D97706" />
          <rect x="25" y="14" width="24" height="3" fill="#92400E" />

          {/* Head */}
          <circle cx="37" cy="30" r="14" fill="url(#geeta-face)" />
          {/* Eyes */}
          <circle cx="31" cy="28" r="2.5" fill="#1E3A8A" />
          <circle cx="43" cy="28" r="2.5" fill="#1E3A8A" />
          <circle cx="32" cy="27" r="1" fill="white" />
          <circle cx="44" cy="27" r="1" fill="white" />
          {/* Smile */}
          <path d="M32 35 Q37 40 42 35" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Explorer Jacket */}
          <path d="M22 44 L37 48 L52 44 L55 70 L20 70 Z" fill="url(#geeta-coat)" />
          {/* Scarf */}
          <path d="M27 42 Q37 46 47 42 L45 48 Q37 52 29 48 Z" fill="#EF4444" />

          {/* Magnifying Glass in hand */}
          <circle cx="58" cy="55" r="7" fill="none" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="58" cy="55" r="5" fill="#E0F2FE" opacity="0.6" />
          <line x1="63" y1="60" x2="68" y2="65" stroke="#475569" strokeWidth="3" strokeLinecap="round" />

          {/* Tiny Globe in other hand */}
          <circle cx="15" cy="56" r="7" fill="#3B82F6" />
          <path d="M10 56 Q15 52 20 56" stroke="#22C55E" strokeWidth="1.5" fill="none" />

          {/* Feet */}
          <ellipse cx="28" cy="83" rx="5" ry="3.5" fill="#78350F" />
          <ellipse cx="46" cy="83" rx="5" ry="3.5" fill="#78350F" />
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

// ─── World Scene Background (with SVG gradient & themed elements) ──

function WorldScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width="100%" height="100%" preserveAspectRatio="none">
        <defs>
          <linearGradient id="space-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="50%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
          <radialGradient id="globe-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#space-grad)" />

        {/* Stars */}
        {[
          { cx: 50, cy: 40, r: 2 }, { cx: 120, cy: 80, r: 1.5 }, { cx: 200, cy: 30, r: 2.5 },
          { cx: 350, cy: 70, r: 1 }, { cx: 500, cy: 40, r: 2 }, { cx: 640, cy: 90, r: 1.5 },
          { cx: 80, cy: 150, r: 2 }, { cx: 280, cy: 130, r: 1.5 }, { cx: 450, cy: 160, r: 2 },
        ].map((star, i) => (
          <circle key={i} cx={star.cx} cy={star.cy} r={star.r} fill="#FDE047" opacity="0.8" />
        ))}
      </svg>

      {/* Background Globe illustration */}
      <motion.div
        className="absolute bottom-4 left-6 opacity-30"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <svg width="120" height="120" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="45" fill="#3B82F6" stroke="#60A5FA" strokeWidth="2" />
          <path d="M20 40 Q40 20, 70 50 T40 80 Z" fill="#22C55E" opacity="0.7" />
          <path d="M50 20 Q70 30, 60 70 Z" fill="#22C55E" opacity="0.6" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Geographic Icons ──────────────────────────────

function GlobeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="globe-sph" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
      {/* Stand */}
      <path d="M20 52 L40 52 M30 42 L30 52" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" />
      <path d="M15 42 Q30 50, 45 42" fill="none" stroke="#94A3B8" strokeWidth="3" />
      {/* Globe Ball */}
      <circle cx="30" cy="24" r="18" fill="url(#globe-sph)" stroke="#1D4ED8" strokeWidth="1" />
      {/* Continents */}
      <path d="M22 18 Q26 14, 32 18 T36 26 T26 32 Z" fill="#22C55E" opacity="0.8" />
      <path d="M34 22 Q40 24, 38 32 T30 30 Z" fill="#22C55E" opacity="0.7" />
      {/* Tilt axis */}
      <line x1="24" y1="2" x2="36" y2="46" stroke="#EF4444" strokeWidth="1.5" strokeDasharray="2,2" />
    </svg>
  );
}

function EarthFromSpaceIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#1D4ED8" />
      <path d="M15 20 Q30 10, 45 25 T35 48 T15 35 Z" fill="#16A34A" opacity="0.85" />
      <path d="M38 12 Q48 18, 42 28 Z" fill="#16A34A" opacity="0.8" />
      {/* Cloud swirl */}
      <path d="M12 25 Q25 22, 32 28" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M35 42 Q42 38, 48 45" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function ContinentIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="10" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
      {/* Continent shape */}
      <path d="M20 20 Q35 15, 42 28 T30 42 T18 32 Z" fill="#15803D" />
      <circle cx="30" cy="28" r="3" fill="#EF4444" />
    </svg>
  );
}

function OceanIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="10" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
      <path d="M15 25 Q25 20, 35 25 T55 25" stroke="#0284C7" strokeWidth="3" fill="none" />
      <path d="M12 35 Q22 30, 32 35 T52 35" stroke="#0284C7" strokeWidth="2.5" fill="none" />
      <path d="M18 45 Q28 40, 38 45 T48 45" stroke="#0284C7" strokeWidth="2" fill="none" />
    </svg>
  );
}

function EquatorIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="30" cy="30" rx="22" ry="7" fill="none" stroke="#EF4444" strokeWidth="3" strokeDasharray="4,2" />
      <text x="30" y="55" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#DC2626">EQUATOR</text>
    </svg>
  );
}

function NorthPoleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 8 L33 16 L41 16 L35 21 L37 29 L30 24 L23 29 L25 21 L19 16 L27 16 Z" fill="#F59E0B" />
      <circle cx="30" cy="8" r="5" fill="#EF4444" />
      <text x="30" y="52" textAnchor="middle" fontSize="9" fontWeight="bold" fill="#0369A1">NORTH POLE</text>
    </svg>
  );
}

function AxisIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="#60A5FA" opacity="0.5" />
      <line x1="20" y1="5" x2="40" y2="55" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
      <circle cx="20" cy="5" r="3" fill="#DC2626" />
      <circle cx="40" cy="55" r="3" fill="#DC2626" />
    </svg>
  );
}

function LandIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="10" fill="#DCFCE7" stroke="#22C55E" strokeWidth="2" />
      <path d="M12 40 L22 25 L32 35 L42 20 L48 40 Z" fill="#16A34A" />
      <circle cx="42" cy="20" r="4" fill="#F59E0B" />
    </svg>
  );
}

function WaterIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="8" width="44" height="44" rx="10" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="2" />
      <path d="M30 15 C25 25, 18 32, 18 38 C18 45, 23 50, 30 50 C37 50, 42 45, 42 38 C42 32, 35 25, 30 15 Z" fill="#0284C7" />
    </svg>
  );
}

function CompassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#F8FAFC" stroke="#475569" strokeWidth="2" />
      <polygon points="30,12 34,30 30,48 26,30" fill="#EF4444" />
      <polygon points="30,48 34,30 30,12 26,30" fill="#CBD5E1" />
      <circle cx="30" cy="30" r="4" fill="#1E293B" />
      <text x="30" y="10" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#EF4444">N</text>
    </svg>
  );
}

function ScaleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="20" rx="4" fill="#F1F5F9" stroke="#64748B" strokeWidth="2" />
      <line x1="15" y1="30" x2="45" y2="30" stroke="#334155" strokeWidth="2" />
      <line x1="15" y1="25" x2="15" y2="35" stroke="#334155" strokeWidth="2" />
      <line x1="30" y1="26" x2="30" y2="34" stroke="#334155" strokeWidth="2" />
      <line x1="45" y1="25" x2="45" y2="35" stroke="#334155" strokeWidth="2" />
    </svg>
  );
}

function ShipIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 35 L48 35 L42 48 L18 48 Z" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
      <rect x="28" y="15" width="4" height="20" fill="#334155" />
      <polygon points="32,15 45,22 32,29" fill="#EF4444" />
      <path d="M8 46 Q30 54, 52 46" stroke="#0284C7" strokeWidth="3" fill="none" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'globe': return <GlobeIcon size={size} />;
    case 'earth': return <EarthFromSpaceIcon size={size} />;
    case 'continent': return <ContinentIcon size={size} />;
    case 'ocean': return <OceanIcon size={size} />;
    case 'equator': return <EquatorIcon size={size} />;
    case 'northpole': return <NorthPoleIcon size={size} />;
    case 'axis': return <AxisIcon size={size} />;
    case 'land': return <LandIcon size={size} />;
    case 'water': return <WaterIcon size={size} />;
    case 'compass': return <CompassIcon size={size} />;
    case 'scale': return <ScaleIcon size={size} />;
    case 'ship': return <ShipIcon size={size} />;
    default: return <GlobeIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-blue-200 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-center" style={{ color }}>{label}</span>
      <div className="text-[10px] font-semibold text-gray-500 mt-1">Drop here</div>
    </div>
  );
}

// ─── Main GlobeGame Component ─────────────────────────────────

export interface GlobeGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function GlobeGame({ width = 720, height = 560, onComplete }: GlobeGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [hintText, setHintText] = useState('');
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>("Hello! I'm Geeta. Let's explore our Earth and globes!");

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Initialize sort item positions
  useEffect(() => {
    if (currentChallenge?.type.startsWith('sort') && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const startX = 60;
      const startY = 320;
      currentChallenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = {
          x: startX + (idx % 2) * 140,
          y: startY + Math.floor(idx / 2) * 105,
        };
      });
      setItemPositions(initialPos);
      setPlacedItems({});
    }
  }, [challengeIdx]);

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      speechManager.speak(slide.spoken);
      setMascotSpeech(slide.text.slice(0, 50) + '...');
    }
  }, [screen, slideIdx]);

  // Speak challenge question
  useEffect(() => {
    if (screen === 'play' && currentChallenge) {
      speechManager.speak(currentChallenge.question);
      setMascotSpeech(currentChallenge.question);
      setMascotMood('happy');
      setShowHint(false);
    }
  }, [screen, challengeIdx]);

  // Inactivity timer for auto-hint
  useEffect(() => {
    if (screen === 'play') {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
          if (screen === 'play') {
            audioManager.play('hint');
            setShowHint(true);
            setHintText(currentChallenge.hint);
            setMascotMood('thinking');
            speechManager.speak(currentChallenge.hint);
          }
        }, 10000);
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [screen, challengeIdx, currentChallenge]);

  // Handle multiple choice answer
  const handleOptionClick = useCallback((option: string) => {
    if (!currentChallenge) return;
    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setStars(prev => prev + 1);
      setSuccessMsg('Brilliant! That is correct! ⭐');
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic job! You got it right!');
      speechManager.speak('Fantastic job! That is correct!');
      setSparklePos({ x: width / 2, y: height / 2 });
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setShowHint(true);
      setHintText(currentChallenge.misconception);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  }, [currentChallenge, width, height]);

  // Drag and drop handlers
  const handleDragStart = useCallback((id: string) => {
    audioManager.play('pickup');
  }, []);

  const handleDragEnd = useCallback((id: string, x: number, y: number) => {
    if (!currentChallenge || !currentChallenge.bins || !currentChallenge.sortItems) return false;

    // Check which bin (if any) the item was dropped into
    const binWidth = 140;
    const binHeight = 110;
    const binY = 190;

    let matchedBin: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 160;
      if (x >= binX - 20 && x <= binX + binWidth && y >= binY - 20 && y <= binY + binHeight) {
        matchedBin = bin.id;
      }
    });

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    if (matchedBin && matchedBin === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setSuccessMsg('All sorted perfectly! Great job! ⭐');
        setMascotMood('celebrate');
        setMascotSpeech('All sorted correctly! You are a geography star!');
        speechManager.speak('All sorted correctly! You are a geography star!');
        setShowConfetti(true);
        setSparklePos({ x: width / 2, y: height / 2 });
      }
      return true;
    } else {
      // Wrong bin
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setShowHint(true);
      setHintText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  }, [currentChallenge, placedItems, width, height]);

  // Advance to next challenge or finish
  const handleNextChallenge = useCallback(() => {
    setSuccessMsg(null);
    setShowConfetti(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // Game Complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      speechManager.speak('Congratulations! You completed all challenges and became a Master Geographer!');
      if (onComplete) onComplete(finalScore);
    }
  }, [challengeIdx, errors, onComplete]);

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, background: 'linear-gradient(135deg, #0F172A 0%, #1E3A8A 50%, #3B82F6 100%)' }}
    >
      {/* Background World Scene */}
      <WorldScene width={width} height={height} />

      {/* Mascot */}
      <GeetaMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Confetti */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}

      {/* Sparkle Burst */}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}

      {/* Success Banner */}
      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={handleNextChallenge}
        />
      )}

      {/* Hint Bubble */}
      {showHint && (
        <HintBubble
          message={hintText}
          onComplete={() => setShowHint(false)}
        />
      )}

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-black/40 backdrop-blur-md px-6 flex items-center justify-between z-10 border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="bg-blue-600 text-white rounded-xl px-3 py-1 font-black text-sm shadow-inner flex items-center gap-1.5">
            <GlobeIcon size={20} />
            <span>GLOBE & EARTH</span>
          </div>
          {screen === 'play' && (
            <span className="text-xs font-bold text-blue-200">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={stars} total={CHALLENGES.length} />}
          <button
            onClick={() => {
              audioManager.play('tap');
              setScreen(prev => (prev === 'teaching' ? 'play' : 'teaching'));
            }}
            className="bg-white/20 hover:bg-white/30 text-white rounded-xl px-3 py-1 text-xs font-bold transition shadow"
          >
            {screen === 'teaching' ? 'Start Game 🚀' : 'Review Lessons 📖'}
          </button>
        </div>
      </div>

      {/* TEACHING SCREEN */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center border-4 border-white/20`}
          >
            <span className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-4 py-2 rounded-xl font-bold text-sm ${slideIdx === 0 ? 'opacity-40 bg-black/20' : 'bg-black/30 hover:bg-black/40 text-white'}`}
              >
                ← Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-6 bg-white' : 'w-2.5 bg-white/40'}`}
                  />
                ))}
              </div>

              {slideIdx < TEACHING_SLIDES.length - 1 ? (
                <button
                  onClick={() => {
                    audioManager.play('tap');
                    setSlideIdx(prev => prev + 1);
                  }}
                  className="px-4 py-2 rounded-xl font-bold text-sm bg-black/30 hover:bg-black/40 text-white"
                >
                  Next →
                </button>
              ) : (
                <button
                  onClick={() => {
                    audioManager.play('celebration');
                    setScreen('play');
                  }}
                  className="px-6 py-2 rounded-xl font-black text-sm bg-yellow-400 hover:bg-yellow-300 text-gray-900 shadow-lg animate-bounce"
                >
                  Play Game! 🚀
                </button>
              )}
            </div>
          </motion.div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {screen === 'play' && currentChallenge && (
        <div className="absolute inset-0 pt-16 pb-6 px-6 flex flex-col items-center justify-start z-10">
          {/* Question Box */}
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-blue-300 text-center mb-4 mt-2"
          >
            <h3 className="text-lg font-black text-gray-800">{currentChallenge.question}</h3>
          </motion.div>

          {/* Multiple Choice Challenges */}
          {currentChallenge.answer !== 'sort' && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-xl my-auto">
              {currentChallenge.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleOptionClick(option)}
                  className="w-full bg-white hover:bg-blue-50 text-gray-800 font-bold py-3.5 px-6 rounded-2xl shadow-lg border-2 border-blue-200 text-left flex items-center justify-between transition-all"
                >
                  <span>{option}</span>
                  <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">
                    {['A', 'B', 'C'][idx]}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort / Drag and Drop Challenges */}
          {currentChallenge.answer === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-xl h-[360px] mt-2">
              {/* Bins */}
              <div className="flex justify-around absolute top-0 left-0 right-0">
                {currentChallenge.bins.map((bin, idx) => (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={idx * 210 + 20}
                    y={10}
                    width={180}
                    height={100}
                    isHovering={hoverBin === bin.id}
                  />
                ))}
              </div>

              {/* Draggable Items */}
              {currentChallenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: 320 };
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
          )}
        </div>
      )}
    </div>
  );
}
