'use client';

/**
 * LightGame — Learn about light sources, luminous/non-luminous objects,
 *              transparent/translucent/opaque materials, and shadows!
 *
 * CISCE Nodes: c4_phy_001 (Natural/artificial sources of light),
 *              c4_phy_002 (Luminous and non-luminous objects),
 *              c4_phy_003 (Transparent, translucent, opaque objects),
 *              c4_phy_004 (Formation of shadows)
 *
 * Enrichment: c4_physics_enrichment_part1-4
 *
 * ELI5: "Light is a form of energy that helps us see the world! Things that make
 *   their own light are luminous sources — like the sun, stars, and fireflies
 *   (natural) or bulbs, candles, and torches (artificial). Objects that do not
 *   make their own light are non-luminous — like books, chairs, and the moon!
 *   Materials can be transparent (let light through clearly), translucent
 *   (let some light through), or opaque (block light completely and form shadows!)."
 *
 * Story: "Help Scientist Sandeep sort light sources, find luminous objects,
 *   test materials, and discover how shadows form in the physics lab!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG physics lab background with sky gradient, torch, sun, candle, and shadow screen
 * - Custom SVG objects (Sun, Torch, Candle, Firefly, Bulb, Star, Transparent glass,
 *   Translucent oiled paper, Opaque wood, Shadow puppet, Luminous object, Non-luminous book)
 * - Custom SVG mascot (Scientist Sandeep with lab coat, torch badge, dark glasses)
 * - Drag-and-drop: drag light items, objects, and materials into sorting bins
 * - 8 progressive challenges: identify sources → sort natural/artificial → luminous/non-luminous → transparent/translucent/opaque → shadows
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects (pickup, drop-correct, drop-wrong, success, error, celebration, hint)
 * - Confetti + celebration on success
 * - Auto-hint after EXACTLY 10 seconds of inactivity
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Types ────────────────────────────────────────────────────

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

// ─── Teaching Slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Sources of Light ☀️",
    text: "A source of light is anything that gives out light of its own! Natural sources exist in nature like the sun, stars, and fireflies. Artificial sources are made by humans like electric bulbs, torches, and candles!",
    emoji: "☀️",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "A source of light is anything that gives out light of its own! Natural sources exist in nature like the sun, stars, and fireflies. Artificial sources are made by humans like electric bulbs, torches, and candles!"
  },
  {
    title: "Luminous or Non-Luminous? 💡",
    text: "Luminous objects make their own light — like the sun, a lit candle, or a glowing firefly. Non-luminous objects do NOT make their own light — like books, chairs, and the moon! The moon reflects sunlight, it is NOT a light source!",
    emoji: "💡",
    bgColor: "from-yellow-400 to-amber-500",
    spoken: "Luminous objects make their own light, like the sun or a lit candle. Non-luminous objects do not make their own light, like books and the moon! The moon only reflects sunlight!"
  },
  {
    title: "Transparent, Translucent & Opaque 🔍",
    text: "Transparent materials let light pass through clearly like clear glass. Translucent materials let some light pass through like oiled paper. Opaque materials block light completely like wooden doors and walls!",
    emoji: "🔍",
    bgColor: "from-gold-400 to-gold-500",
    spoken: "Transparent materials let light pass through clearly like clear glass. Translucent materials let some light pass through like oiled paper. Opaque materials block light completely like wooden doors and walls!"
  },
  {
    title: "Formation of Shadows 👥",
    text: "A shadow is a dark shape formed when an opaque object blocks the path of light! Three things are needed: a light source, an opaque object, and a surface. Light travels in straight lines and cannot bend around objects!",
    emoji: "👥",
    bgColor: "from-gold-400 to-purple-500",
    spoken: "A shadow is a dark shape formed when an opaque object blocks the path of light! Three things are needed: a light source, an opaque object, and a surface."
  },
  {
    title: "Shadow Rules & Direction 📐",
    text: "The shadow is always on the opposite side of the light source. Moving an object closer to the light makes its shadow bigger! Transparent objects do not cast dark shadows because they let light pass through!",
    emoji: "📐",
    bgColor: "from-purple-400 to-pink-500",
    spoken: "The shadow is always on the opposite side of the light source. Moving an object closer to the light makes its shadow bigger!"
  },
];

// ─── Challenges (8 progressive: identify → sort) ──────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "Which of these is a NATURAL source of light?",
    answer: "The sun",
    options: ["The sun", "A torch", "An electric bulb"],
    hint: "Think: which one exists by itself in nature without humans switching it on?",
    misconception: "The sun is a natural source because it exists in nature and gives light on its own! Torches and bulbs are artificial sources made by humans!"
  },
  {
    type: 'sort',
    question: "Drag each light source into Natural or Artificial!",
    answer: "sort",
    options: [],
    hint: "Natural = sun, stars, firefly! Artificial = torch, candle, electric bulb!",
    misconception: "Remember: natural sources exist by themselves in nature (sun, stars, firefly). Artificial sources are made and operated by people (torch, candle, bulb)!",
    sortItems: [
      { id: 'sun', label: 'The Sun', icon: 'sun', correctBin: 'natural' },
      { id: 'star', label: 'Stars', icon: 'star', correctBin: 'natural' },
      { id: 'torch', label: 'Torch', icon: 'torch', correctBin: 'artificial' },
      { id: 'candle', label: 'Candle', icon: 'candle', correctBin: 'artificial' },
    ],
    bins: [
      { id: 'natural', label: 'Natural Source ☀️', color: '#F59E0B' },
      { id: 'artificial', label: 'Artificial Source 🔦', color: '#3B82F6' },
    ]
  },
  {
    type: 'identify',
    question: "What is a LUMINOUS object?",
    answer: "An object that gives out its own light",
    options: [
      "An object that gives out its own light",
      "An object that only reflects light from others",
      "An object that blocks light completely"
    ],
    hint: "Luminous comes from 'lumen' meaning light. Does it emit its own light or borrow it?",
    misconception: "A luminous object produces and emits its own light from within! Objects that only reflect light (like the moon or a mirror) are non-luminous!"
  },
  {
    type: 'sort',
    question: "Drag each object to Luminous or Non-luminous!",
    answer: "sort",
    options: [],
    hint: "Luminous = lit candle, sun, bulb! Non-luminous = book, moon, mirror!",
    misconception: "The moon is NON-luminous! It looks bright only because it reflects sunlight. It has no light of its own. Lit candles and suns are luminous!",
    sortItems: [
      { id: 'luminous-candle', label: 'Lit Candle', icon: 'candle', correctBin: 'luminous' },
      { id: 'luminous-sun', label: 'The Sun', icon: 'sun', correctBin: 'luminous' },
      { id: 'non-book', label: 'A Book', icon: 'opaque', correctBin: 'non-luminous' },
      { id: 'non-moon', label: 'The Moon', icon: 'star', correctBin: 'non-luminous' },
    ],
    bins: [
      { id: 'luminous', label: 'Luminous ✨', color: '#EAB308' },
      { id: 'non-luminous', label: 'Non-luminous 📚', color: '#64748B' },
    ]
  },
  {
    type: 'identify',
    question: "Which material lets light pass through almost completely so you can see clearly?",
    answer: "Transparent",
    options: ["Transparent", "Translucent", "Opaque"],
    hint: "Think of a clear glass windowpane — can you see right through it?",
    misconception: "Transparent materials let light pass through completely so images are sharp! Translucent materials blur light, and opaque block it completely!"
  },
  {
    type: 'sort',
    question: "Drag each material to Transparent, Translucent, or Opaque!",
    answer: "sort",
    options: [],
    hint: "Transparent = clear glass! Translucent = oiled paper! Opaque = wooden door!",
    misconception: "Remember: transparent = clear glass (see clearly); translucent = butter paper / oiled paper (see glow only); opaque = wood, metal, stone (block light completely)!",
    sortItems: [
      { id: 'trans-glass', label: 'Clear Glass', icon: 'transparent', correctBin: 'transparent' },
      { id: 'trans-oil', label: 'Oiled Paper', icon: 'translucent', correctBin: 'translucent' },
      { id: 'op-wood', label: 'Wooden Block', icon: 'opaque', correctBin: 'opaque' },
      { id: 'op-metal', label: 'Metal Plate', icon: 'opaque', correctBin: 'opaque' },
    ],
    bins: [
      { id: 'transparent', label: 'Transparent 🔍', color: '#06B6D4' },
      { id: 'translucent', label: 'Translucent 🌥️', color: '#8B5CF6' },
      { id: 'opaque', label: 'Opaque 🧱', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "What THREE things are needed to form a shadow?",
    answer: "A light source, an opaque object, and a surface",
    options: [
      "A light source, an opaque object, and a surface",
      "Only a light source and water",
      "Only a transparent glass and a mirror"
    ],
    hint: "Think about a torch, a book, and a wall. What are those three roles?",
    misconception: "A shadow needs three things: a light source to emit light, an opaque object to block it, and a surface (like a wall or ground) where the dark shape appears!"
  },
  {
    type: 'sort',
    question: "Drag each statement about shadows to True or False!",
    answer: "sort",
    options: [],
    hint: "True = light travels in straight lines, shadow is opposite light! False = transparent objects cast dark shadows!",
    misconception: "Transparent objects do NOT cast dark shadows because they let light pass through! Only opaque objects cast sharp, dark shadows. Also, shadows are always on the opposite side of the light source!",
    sortItems: [
      { id: 's-true1', label: 'Light travels in straight lines', icon: 'ray', correctBin: 'true' },
      { id: 's-true2', label: 'Shadow is opposite to light source', icon: 'shadow', correctBin: 'true' },
      { id: 's-false1', label: 'Transparent objects cast dark shadows', icon: 'transparent', correctBin: 'false' },
      { id: 's-false2', label: 'Shadows can form without any light', icon: 'torch', correctBin: 'false' },
    ],
    bins: [
      { id: 'true', label: 'True Statement ✅', color: '#22C55E' },
      { id: 'false', label: 'False Statement ❌', color: '#EF4444' },
    ]
  },
];

// ─── Scientist Sandeep Mascot (Physics Expert) ────────────────

function ScientistSandeep({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="sandeep-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="lab-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
          </defs>
          {/* Hair / Head */}
          <circle cx="37" cy="28" r="18" fill="#451A03" />
          <circle cx="37" cy="30" r="16" fill="url(#sandeep-face)" />
          {/* Lab coat body */}
          <path d="M20 50 L37 55 L55 50 L58 80 L17 80 Z" fill="url(#lab-coat)" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Torch badge on coat */}
          <circle cx="28" cy="62" r="5" fill="#EF4444" />
          <path d="M26 62 L30 62 L31 66 L25 66 Z" fill="#FBBF24" />
          {/* Glasses */}
          <rect x="25" y="24" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <rect x="39" y="24" width="10" height="8" rx="2" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="35" y1="28" x2="39" y2="28" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes inside glasses */}
          <circle cx="30" cy="28" r="2" fill="#1E293B" />
          <circle cx="44" cy="28" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M31 38 Q37 43 43 38" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Bow tie */}
          <path d="M32 46 L37 49 L42 46 L42 51 L37 48 L32 51 Z" fill="#3B82F6" />
          {/* Arms */}
          <ellipse cx="14" cy="62" rx="4" ry="10" fill="url(#lab-coat)" transform="rotate(-15 14 62)" />
          <ellipse cx="61" cy="62" rx="4" ry="10" fill="url(#lab-coat)" transform="rotate(15 61 62)" />
          {/* Feet */}
          <ellipse cx="28" cy="84" rx="5" ry="3" fill="#1E293B" />
          <ellipse cx="47" cy="84" rx="5" ry="3" fill="#1E293B" />
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

// ─── Physics Lab Scene Background ─────────────────────────────

function LabScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4338CA" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Lab background wall */}
        <rect width={width} height={height} fill="url(#lab-sky-grad)" />
        {/* Lab floor */}
        <rect x="0" y={height - 70} width={width} height="70" fill="#334155" />
        <line x1="0" y1={height - 70} x2={width} y2={height - 70} stroke="#475569" strokeWidth="3" />
        {/* Window showing night sky / stars */}
        <rect x={width - 120} y={20} width="90" height="110" fill="#0F172A" rx="4" stroke="#64748B" strokeWidth="4" />
        <line x1={width - 75} y1="20" x2={width - 75} y2="130" stroke="#64748B" strokeWidth="2" />
        <line x1={width - 120} y1="75" x2={width - 30} y2="75" stroke="#64748B" strokeWidth="2" />
        {/* Stars in window */}
        <circle cx={width - 100} cy={40} r="2" fill="#FEF08A" />
        <circle cx={width - 50} cy={50} r="1.5" fill="#FEF08A" />
        <circle cx={width - 90} cy={100} r="2" fill="#FEF08A" />
        <circle cx={width - 45} cy={110} r="1.5" fill="#FEF08A" />
        {/* Lab shelf */}
        <rect x="30" y="100" width="180" height="12" fill="#78350F" rx="2" />
        {/* Beakers on shelf */}
        <path d="M50 100 L50 80 L65 80 L65 100 Z" fill="#93C5FD" opacity="0.7" />
        <path d="M80 100 L85 75 L95 75 L100 100 Z" fill="#F472B6" opacity="0.7" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Physics Topic Icons ───────────────────────────

function SunIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#F59E0B" />
      <circle cx="30" cy="30" r="10" fill="#FBBF24" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1="30" y1="30" x2={30 + 22 * Math.cos(angle * Math.PI / 180)} y2={30 + 22 * Math.sin(angle * Math.PI / 180)} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function TorchIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Torch body */}
      <rect x="24" y="25" width="12" height="25" fill="#334155" rx="3" stroke="#1E293B" strokeWidth="1.5" />
      {/* Torch head */}
      <path d="M20 15 L40 15 L44 25 L16 25 Z" fill="#64748B" stroke="#1E293B" strokeWidth="1.5" />
      {/* Light beam / glow */}
      <path d="M22 15 L10 2 L50 2 L38 15 Z" fill="#FEF08A" opacity="0.6" />
      {/* Button */}
      <circle cx="30" cy="35" r="2" fill="#EF4444" />
    </svg>
  );
}

function CandleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Candle wax body */}
      <rect x="22" y="28" width="16" height="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" rx="2" />
      {/* Wick */}
      <line x1="30" y1="28" x2="30" y2="22" stroke="#1E293B" strokeWidth="2" />
      {/* Flame */}
      <path d="M30 8 C25 15, 24 18, 24 21 C24 24, 27 27, 30 27 C33 27, 36 24, 36 21 C36 18, 35 15, 30 8 Z" fill="#F59E0B" />
      <path d="M30 14 C28 17, 27 19, 27 21 C27 23, 29 25, 30 25 C31 25, 33 23, 33 21 C33 19, 32 17, 30 14 Z" fill="#FEF08A" />
    </svg>
  );
}

function StarIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 8 L36 22 L52 24 L40 35 L44 50 L30 42 L16 50 L20 35 L8 24 L24 22 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
    </svg>
  );
}

function TransparentIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Glass frame */}
      <rect x="12" y="10" width="36" height="40" fill="none" stroke="#475569" strokeWidth="3" rx="2" />
      {/* Clear glass shine */}
      <rect x="15" y="13" width="30" height="34" fill="#E0F2FE" opacity="0.6" />
      <line x1="20" y1="15" x2="35" y2="45" stroke="white" strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function TranslucentIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Oiled butter paper sheet */}
      <rect x="12" y="10" width="36" height="40" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" rx="2" opacity="0.8" />
      {/* Blurred spots / texture */}
      <circle cx="25" cy="25" r="8" fill="#FDE047" opacity="0.7" />
      <circle cx="40" cy="35" r="10" fill="#FEF08A" opacity="0.9" />
    </svg>
  );
}

function OpaqueIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Wooden block (opaque) */}
      <rect x="10" y="15" width="40" height="30" fill="#78350F" stroke="#451A03" strokeWidth="2" rx="2" />
      {/* Wood grain */}
      <path d="M15 22 Q30 28, 45 22" stroke="#92400E" strokeWidth="2" fill="none" />
      <path d="M15 35 Q30 41, 45 35" stroke="#92400E" strokeWidth="2" fill="none" />
    </svg>
  );
}

function ShadowIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Wall background */}
      <rect x="5" y="5" width="50" height="50" fill="#CBD5E1" rx="2" />
      {/* Dark hand shadow */}
      <path d="M25 45 L25 30 L20 25 L22 20 L27 25 L29 18 L33 18 L35 25 L40 28 L40 45 Z" fill="#1E293B" />
    </svg>
  );
}

function RayIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Light source dot */}
      <circle cx="10" cy="30" r="6" fill="#F59E0B" />
      {/* Straight light rays */}
      <line x1="18" y1="30" x2="52" y2="15" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="30" x2="52" y2="30" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
      <line x1="18" y1="30" x2="52" y2="45" stroke="#FEF08A" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'sun': return <SunIcon size={size} />;
    case 'star': return <StarIcon size={size} />;
    case 'torch': return <TorchIcon size={size} />;
    case 'candle': return <CandleIcon size={size} />;
    case 'transparent': return <TransparentIcon size={size} />;
    case 'translucent': return <TranslucentIcon size={size} />;
    case 'opaque': return <OpaqueIcon size={size} />;
    case 'shadow': return <ShadowIcon size={size} />;
    case 'ray': return <RayIcon size={size} />;
    default: return <SunIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: {
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}22`,
      }}
    >
      <div className="rounded-full px-3 py-1 mb-1 shadow-sm" style={{ backgroundColor: color }}>
        <span className="text-white text-xs font-extrabold">{label}</span>
      </div>
      <div className="border-2 border-dashed rounded-xl w-[90%] h-[55%]" style={{ borderColor: color, opacity: 0.6 }} />
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface LightGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LightGame({ width = 720, height = 560, onComplete }: LightGameProps) {
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
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const currentChallenge = CHALLENGES[challengeIdx];

  // Cleanup speech & timer on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Speak teaching slide text
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

  // Speak challenge question
  useEffect(() => {
    if (screen === 'play') {
      setSpeakingText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  // Reset sort items positions when challenge changes
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
      const msg = "Great job! You understand light and shadows!";
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
      const compMsg = "Wonderful! You are a brilliant physics star!";
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

    // Check bin hit
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 40 + idx * 320;
      const binY = 120;
      const binW = 280;
      const binH = 180;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = "Fantastic! You sorted the light and shadow facts perfectly!";
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
      className="relative select-none overflow-hidden rounded-2xl shadow-2xl font-sans"
      style={{ width, height, background: '#1E1B4B' }}
    >
      <LabScene width={width} height={height} />
      <ScientistSandeep mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10">
          <div className="flex items-center justify-between w-full max-w-xl mt-2">
            <div className="flex items-center gap-2 bg-gold-950/80 px-4 py-1.5 rounded-full border border-gold-500/30">
              <span className="text-xl">🔬</span>
              <span className="text-white font-extrabold text-sm">Lab Lesson {slideIdx + 1} of 5</span>
            </div>
            <div className="flex gap-1.5">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-amber-400 w-6' : 'bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -15 }}
            className={`w-full max-w-xl rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} border-2 border-white/30 text-white flex flex-col items-center text-center my-auto`}
          >
            <div className="text-6xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow max-w-lg">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-xl mb-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow-lg transition-all ${
                slideIdx === 0 ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed' : 'bg-white/20 text-white hover:bg-white/30'
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
                  audioManager.play('swoop');
                }
              }}
              className="px-6 py-2.5 rounded-xl font-extrabold text-sm shadow-lg bg-amber-400 hover:bg-amber-300 text-gray-900 transition-all flex items-center gap-2"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Lab Game! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          {/* Top header */}
          <div className="flex items-center justify-between w-full max-w-2xl mx-auto">
            <div className="flex items-center gap-3 bg-gold-950/80 px-4 py-2 rounded-2xl border border-gold-500/40 shadow-md">
              <span className="text-amber-400 font-extrabold text-sm">Challenge {challengeIdx + 1}/8</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <button
              onClick={handleShowHint}
              className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-gray-900 px-3.5 py-1.5 rounded-xl font-extrabold text-xs shadow-md transition-all"
            >
              💡 Hint
            </button>
          </div>

          {/* Question Box */}
          <div className="w-full max-w-2xl mx-auto bg-slate-900/80 border-2 border-gold-500/50 rounded-2xl p-4 shadow-xl text-center backdrop-blur-sm">
            <h2 className="text-white font-black text-lg drop-shadow">{currentChallenge.question}</h2>
          </div>

          {/* Interactive Challenge Area */}
          <div className="w-full max-w-2xl mx-auto flex-1 flex flex-col items-center justify-center relative my-2">
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnColor = 'bg-white/90 hover:bg-white text-gray-800 border-gold-200';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnColor = 'bg-emerald-500 text-white border-emerald-600';
                    else if (isSelected) btnColor = 'bg-rose-500 text-white border-rose-600';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-lg border-2 transition-all ${btnColor}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="absolute inset-0 flex flex-col items-center justify-between">
                {/* Bins */}
                <div className="flex justify-around w-full px-4 pt-2">
                  {currentChallenge.bins.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={idx === 0 ? 30 : 380}
                      y={10}
                      width={290}
                      height={180}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  ))}
                </div>

                {/* Draggable items */}
                <div className="flex justify-center gap-6 pb-4 w-full">
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
          </div>

          {/* Bottom controls for sort challenge completion */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems && (
            <div className="flex justify-center w-full">
              {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <motion.button
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  onClick={advanceChallenge}
                  className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base border-2 border-emerald-300"
                >
                  Continue ➔
                </motion.button>
              )}
            </div>
          )}

          {/* Next button for identify challenge when correct */}
          {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center w-full">
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={advanceChallenge}
                className="bg-emerald-500 hover:bg-emerald-400 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-base border-2 border-emerald-300"
              >
                Continue ➔
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
