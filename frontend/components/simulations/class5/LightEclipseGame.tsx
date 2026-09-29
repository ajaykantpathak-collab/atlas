'use client';

/**
 * LightEclipseGame — Learn about luminous/non-luminous objects, transparent/translucent/opaque
 *                    materials, shadow formation, day and night rotation, and solar/lunar eclipses!
 *
 * CISCE Nodes: c5_phy_009 (Luminous and non-luminous objects),
 *              c5_phy_010 (Transparent, translucent and opaque objects),
 *              c5_phy_011 (Conditions for shadow formation),
 *              c5_phy_012 (Day and night formation - earth's rotation),
 *              c5_phy_013 (Solar and lunar eclipses)
 *
 * Mascot: Astronomer Aryan — an astronomer with a telescope, star map, and moon badge.
 */

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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

// ─── Teaching Slides (Aligned with CISCE enrichment text) ──

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Luminous vs Non-Luminous ✨",
    text: "Luminous objects emit their own light — like the sun, stars, a lit candle, or a glowing bulb! Non-luminous objects do NOT produce their own light; they only reflect light from luminous sources — like books, chairs, and the moon!",
    emoji: "☀️",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "Luminous objects emit their own light like the sun and a lit candle. Non-luminous objects do not emit light and only reflect it, like a book and the moon!"
  },
  {
    title: "Transparent, Translucent & Opaque 🔍",
    text: "Transparent materials let light pass through completely so you see clearly (clear glass, water). Translucent materials let partial light pass through with a blurred view (frosted glass, butter paper). Opaque materials block light completely (wood, metal, stone)!",
    emoji: "🔍",
    bgColor: "from-gold-400 to-gold-500",
    spoken: "Transparent materials let light pass through completely like clear glass. Translucent materials let partial light pass through like frosted glass. Opaque materials block light completely like wood!"
  },
  {
    title: "Conditions for Shadow Formation 👥",
    text: "A shadow is a dark shape formed when an opaque object blocks light. Three conditions are needed: (1) a light source, (2) an opaque object, and (3) a surface or screen! Transparent objects do not cast dark shadows because they let light pass through.",
    emoji: "👥",
    bgColor: "from-gold-400 to-purple-500",
    spoken: "A shadow needs three conditions: a light source, an opaque object, and a surface or screen. Without all three, no shadow can form!"
  },
  {
    title: "Day and Night by Earth's Rotation 🌍",
    text: "Day and night happen because the earth rotates on its axis from west to east once every 24 hours. The half facing the sun has day, while the opposite half is in the earth's own shadow and has night!",
    emoji: "🌍",
    bgColor: "from-emerald-400 to-teal-600",
    spoken: "Day and night are caused by the earth rotating on its axis from west to east every 24 hours. One half faces the sun for day, and the opposite half is in shadow for night!"
  },
  {
    title: "Solar and Lunar Eclipses 🌑",
    text: "An eclipse is a cosmic shadow! A solar eclipse happens when the moon is between the sun and earth, casting its shadow on earth. A lunar eclipse happens when the earth is between the sun and moon, casting its shadow on the moon!",
    emoji: "🌑",
    bgColor: "from-purple-500 to-slate-800",
    spoken: "An eclipse is a cosmic shadow! A solar eclipse happens when the moon blocks the sun from earth. A lunar eclipse happens when the earth blocks sunlight from reaching the moon."
  },
];

// ─── Challenges (8 progressive challenges) ────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "Which of these is a LUMINOUS object?",
    answer: "The sun",
    options: ["The sun", "The moon", "A wooden book", "A mirror"],
    hint: "Think: which object produces its own light and glows in the dark without borrowing light?",
    misconception: "The moon and mirror are non-luminous! They appear bright only because they reflect sunlight. The sun emits its own light, making it luminous."
  },
  {
    type: 'sort',
    question: "Drag each object to Luminous or Non-luminous!",
    answer: "sort",
    options: [],
    hint: "Luminous = makes its own light (Sun, Star, Lit candle, Bulb). Non-luminous = needs borrowed light (Moon, Book, Mirror, Chair)!",
    misconception: "Remember: the moon does not produce its own light; it reflects sunlight and is non-luminous. A lit candle and the sun emit their own light.",
    sortItems: [
      { id: 'sun', label: 'The Sun', icon: 'sun', correctBin: 'luminous' },
      { id: 'moon', label: 'The Moon', icon: 'moon', correctBin: 'non-luminous' },
      { id: 'candle', label: 'Lit Candle', icon: 'candle', correctBin: 'luminous' },
      { id: 'book', label: 'A Book', icon: 'opaque', correctBin: 'non-luminous' },
    ],
    bins: [
      { id: 'luminous', label: 'Luminous ✨', color: '#EAB308' },
      { id: 'non-luminous', label: 'Non-luminous 📚', color: '#64748B' },
    ]
  },
  {
    type: 'identify',
    question: "Through which material can you see objects clearly?",
    answer: "Transparent",
    options: ["Transparent", "Translucent", "Opaque", "Reflective"],
    hint: "Think of looking through a clean plain glass windowpane.",
    misconception: "Transparent materials let light pass through completely so images are sharp and clear. Translucent only blurs light, and opaque blocks it entirely."
  },
  {
    type: 'sort',
    question: "Drag each material to Transparent, Translucent, or Opaque!",
    answer: "sort",
    options: [],
    hint: "Transparent = clear glass! Translucent = frosted glass / butter paper! Opaque = wood / stone!",
    misconception: "Frosted glass is translucent because it scatters light and blurs images — it is not transparent! Opaque materials like wood allow zero light through.",
    sortItems: [
      { id: 'glass', label: 'Clear Glass', icon: 'transparent', correctBin: 'transparent' },
      { id: 'frosted', label: 'Frosted Glass', icon: 'translucent', correctBin: 'translucent' },
      { id: 'wood', label: 'Wooden Block', icon: 'opaque', correctBin: 'opaque' },
      { id: 'water', label: 'Pure Water', icon: 'transparent', correctBin: 'transparent' },
    ],
    bins: [
      { id: 'transparent', label: 'Transparent 🔍', color: '#06B6D4' },
      { id: 'translucent', label: 'Translucent 🌥️', color: '#8B5CF6' },
      { id: 'opaque', label: 'Opaque 🧱', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "What THREE conditions are required for a shadow to form?",
    answer: "Light source, opaque object, and surface",
    options: [
      "Light source, opaque object, and surface",
      "Light source, transparent object, and air",
      "Sun, water, and mirror",
      "Torch, transparent glass, and open space"
    ],
    hint: "Think: what three things do you need to make a hand shadow on your classroom wall?",
    misconception: "A shadow requires a light source, an opaque object to block the light, and a surface or screen to catch the dark shape. Without all three, no shadow appears."
  },
  {
    type: 'sort',
    question: "Drag each shadow statement to True or False!",
    answer: "sort",
    options: [],
    hint: "True = shadow is opposite light source, transparent objects cast no shadow! False = shadows can form without any light!",
    misconception: "Transparent objects do NOT cast dark shadows because they let light pass through! Also, shadows are always formed on the side opposite to the light source.",
    sortItems: [
      { id: 's1', label: 'Shadow is opposite to light', icon: 'shadow', correctBin: 'true' },
      { id: 's2', label: 'Transparent objects cast dark shadows', icon: 'transparent', correctBin: 'false' },
      { id: 's3', label: 'Shadows need an opaque blocker', icon: 'opaque', correctBin: 'true' },
      { id: 's4', label: 'Shadows can form in total darkness', icon: 'star', correctBin: 'false' },
    ],
    bins: [
      { id: 'true', label: 'True Statement ✅', color: '#22C55E' },
      { id: 'false', label: 'False Statement ❌', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "What causes day and night on Earth?",
    answer: "Earth's rotation on its axis",
    options: [
      "Earth's rotation on its axis",
      "The sun moving around the earth",
      "The moon blocking the sun",
      "Earth's revolution around the stars"
    ],
    hint: "Think about the earth spinning like a top on an imaginary line from North to South pole.",
    misconception: "The sun does not move around the earth — the earth rotates on its axis from west to east once every 24 hours, causing the sun to appear to rise and set."
  },
  {
    type: 'sort',
    question: "Drag each eclipse feature to Solar Eclipse or Lunar Eclipse!",
    answer: "sort",
    options: [],
    hint: "Solar eclipse = Moon between Sun and Earth! Lunar eclipse = Earth between Sun and Moon!",
    misconception: "In a solar eclipse, the moon is in the middle and casts its shadow on earth (seen during day). In a lunar eclipse, the earth is in the middle and casts its shadow on the moon (seen at night).",
    sortItems: [
      { id: 'e1', label: 'Moon between Sun & Earth', icon: 'solareclipse', correctBin: 'solar' },
      { id: 'e2', label: 'Earth between Sun & Moon', icon: 'lunareclipse', correctBin: 'lunar' },
      { id: 'e3', label: 'Occurs during the Day', icon: 'sun', correctBin: 'solar' },
      { id: 'e4', label: 'Occurs at Night', icon: 'moon', correctBin: 'lunar' },
    ],
    bins: [
      { id: 'solar', label: 'Solar Eclipse ☀️', color: '#F59E0B' },
      { id: 'lunar', label: 'Lunar Eclipse 🌙', color: '#3B82F6' },
    ]
  },
];

// ─── Astronomer Aryan Mascot ───────────��──────────────────────

function AstronomerAryan({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="aryan-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="astronomer-robe" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E1B4B" />
              <stop offset="100%" stopColor="#312E81" />
            </linearGradient>
          </defs>
          {/* Hair / Head */}
          <circle cx="37" cy="28" r="18" fill="#1E293B" />
          <circle cx="37" cy="30" r="16" fill="url(#aryan-face)" />
          {/* Robe body */}
          <path d="M20 50 L37 55 L55 50 L58 80 L17 80 Z" fill="url(#astronomer-robe)" stroke="#4338CA" strokeWidth="1.5" />
          {/* Moon badge on robe */}
          <circle cx="28" cy="62" r="6" fill="#FBBF24" />
          <path d="M26 59 Q30 62 26 65 Q29 63 26 59 Z" fill="#1E1B4B" />
          {/* Telescope eyepiece / glasses */}
          <circle cx="37" cy="28" r="9" fill="none" stroke="#FBBF24" strokeWidth="2" />
          <circle cx="37" cy="28" r="4" fill="#3B82F6" opacity="0.8" />
          {/* Smile */}
          <path d="M31 38 Q37 43 43 38" stroke="#78350F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <ellipse cx="14" cy="62" rx="4" ry="10" fill="url(#astronomer-robe)" transform="rotate(-15 14 62)" />
          <ellipse cx="61" cy="62" rx="4" ry="10" fill="url(#astronomer-robe)" transform="rotate(15 61 62)" />
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

// ─── Observatory Scene Background ─────────────────────────────

function ObservatoryBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="obs-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#090D16" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <radialGradient id="obs-moon-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
          </radialGradient>
        </defs>
        {/* Night sky background */}
        <rect width={width} height={height} fill="url(#obs-sky-grad)" />
        {/* Stars */}
        <circle cx="80" cy="50" r="1.5" fill="#FEF08A" />
        <circle cx="200" cy="80" r="2" fill="#FEF08A" />
        <circle cx="350" cy="40" r="1.5" fill="#FEF08A" />
        <circle cx="500" cy="70" r="2" fill="#FEF08A" />
        <circle cx="640" cy="45" r="1.5" fill="#FEF08A" />
        {/* Observatory Dome / Horizon silhouette */}
        <path d={`M0 ${height - 60} Q ${width / 2} ${height - 120} ${width} ${height - 60} L ${width} ${height} L 0 ${height} Z`} fill="#1E293B" />
        {/* Ground */}
        <rect x="0" y={height - 60} width={width} height="60" fill="#0F172A" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

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

function MoonIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="18" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="1.5" />
      <path d="M22 20 Q32 25, 22 40 Q38 35, 22 20 Z" fill="#94A3B8" opacity="0.6" />
      <circle cx="38" cy="22" r="3" fill="#94A3B8" opacity="0.5" />
      <circle cx="25" cy="42" r="2.5" fill="#94A3B8" opacity="0.5" />
    </svg>
  );
}

function EarthIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="18" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
      <path d="M20 20 Q28 15, 35 25 Q42 35, 30 42 Q18 40, 20 20 Z" fill="#22C55E" opacity="0.8" />
      <path d="M38 15 Q45 20, 42 28 Z" fill="#22C55E" opacity="0.8" />
      {/* Rotation arrow */}
      <path d="M12 30 A 18 18 0 0 1 48 30" stroke="#FEF08A" strokeWidth="2" fill="none" strokeDasharray="3 3" />
      <polygon points="48,27 53,30 48,33" fill="#FEF08A" />
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
      <rect x="12" y="10" width="36" height="40" fill="none" stroke="#475569" strokeWidth="3" rx="2" />
      <rect x="15" y="13" width="30" height="34" fill="#E0F2FE" opacity="0.6" />
      <line x1="20" y1="15" x2="35" y2="45" stroke="white" strokeWidth="2" opacity="0.8" />
    </svg>
  );
}

function TranslucentIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" rx="2" opacity="0.8" />
      <circle cx="25" cy="25" r="8" fill="#FDE047" opacity="0.7" />
      <circle cx="40" cy="35" r="10" fill="#FEF08A" opacity="0.9" />
    </svg>
  );
}

function OpaqueIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="30" fill="#78350F" stroke="#451A03" strokeWidth="2" rx="2" />
      <path d="M15 22 Q30 28, 45 22" stroke="#92400E" strokeWidth="2" fill="none" />
      <path d="M15 35 Q30 41, 45 35" stroke="#92400E" strokeWidth="2" fill="none" />
    </svg>
  );
}

function ShadowIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="5" width="50" height="50" fill="#CBD5E1" rx="2" />
      <path d="M25 45 L25 30 L20 25 L22 20 L27 25 L29 18 L33 18 L35 25 L40 28 L40 45 Z" fill="#1E293B" />
    </svg>
  );
}

function SolarEclipseIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="30" r="10" fill="#F59E0B" />
      <circle cx="32" cy="30" r="8" fill="#1E293B" />
      <circle cx="45" cy="30" r="6" fill="#3B82F6" />
      <line x1="5" y1="30" x2="55" y2="30" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function LunarEclipseIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="15" cy="30" r="10" fill="#F59E0B" />
      <circle cx="30" cy="30" r="8" fill="#3B82F6" />
      <circle cx="45" cy="30" r="6" fill="#CBD5E1" />
      <line x1="5" y1="30" x2="55" y2="30" stroke="#FEF08A" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
  );
}

function CandleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="28" width="16" height="24" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" rx="2" />
      <line x1="30" y1="28" x2="30" y2="22" stroke="#1E293B" strokeWidth="2" />
      <path d="M30 8 C25 15, 24 18, 24 21 C24 24, 27 27, 30 27 C33 27, 36 24, 36 21 C36 18, 35 15, 30 8 Z" fill="#F59E0B" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'sun': return <SunIcon size={size} />;
    case 'moon': return <MoonIcon size={size} />;
    case 'candle': return <CandleIcon size={size} />;
    case 'opaque': return <OpaqueIcon size={size} />;
    case 'transparent': return <TransparentIcon size={size} />;
    case 'translucent': return <TranslucentIcon size={size} />;
    case 'shadow': return <ShadowIcon size={size} />;
    case 'solareclipse': return <SolarEclipseIcon size={size} />;
    case 'lunareclipse': return <LunarEclipseIcon size={size} />;
    case 'star': return <StarIcon size={size} />;
    default: return <SunIcon size={size} />;
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
      width={115}
      height={95}
    >
      <div
        className="flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-amber-300 bg-white/95 backdrop-blur cursor-grab active:cursor-grabbing hover:scale-105 transition-transform"
        style={{ width: 115, height: 95 }}
      >
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface LightEclipseGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LightEclipseGame({ width = 720, height = 560, onComplete }: LightEclipseGameProps) {
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
        newPos[item.id] = { x: 35 + idx * 140, y: height - 165 };
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
      const compMsg = "Wonderful! You are an astronomy expert!";
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

    // Check bin collision based on bins count & layout
    const binWidth = width / currentChallenge.bins.length;
    const droppedBinIdx = Math.floor(x / binWidth);
    const targetBin = currentChallenge.bins[droppedBinIdx];

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
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      <ObservatoryBackground width={width} height={height} />
      <AstronomerAryan mood={mascotMood} speaking={speakingText} />

      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur border-b border-slate-700 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <span className="text-xl">🔭</span>
          <h1 className="text-white font-bold text-base tracking-wide">Light & Eclipses Lab</h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full border border-slate-600">
            <span className="text-amber-400 font-extrabold text-sm">⭐ {score}</span>
          </div>
          {screen === 'play' && (
            <div className="flex items-center gap-1.5">
              <StarRow count={challengeIdx} total={CHALLENGES.length} />
            </div>
          )}
        </div>
      </div>

      {/* Confetti & Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && (
        <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />
      )}
      {successMsg && (
        <SuccessBanner message={successMsg} onComplete={advanceChallenge} />
      )}
      {hintMsg && (
        <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />
      )}

      {/* Screen 1: Teaching Slides */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            className={`w-full max-w-xl rounded-3xl p-8 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border-4 border-white/20 flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-auto">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-4 py-2 rounded-xl bg-white/20 hover:bg-white/30 font-bold text-xs disabled:opacity-30 transition-colors"
              >
                Previous
              </button>

              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div
                    key={i}
                    className={`h-2 rounded-full transition-all ${i === slideIdx ? 'w-6 bg-white' : 'w-2 bg-white/40'}`}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    audioManager.play('success');
                    setScreen('play');
                  }
                }}
                className="px-5 py-2.5 rounded-xl bg-white text-gray-900 font-extrabold text-xs shadow-lg hover:bg-amber-100 transition-colors"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Screen 2: Play Screen (Challenges) */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-4 px-6 flex flex-col z-10">
          <div className="my-2 bg-slate-800/90 backdrop-blur rounded-2xl p-4 border border-slate-700 shadow-lg flex flex-col items-center text-center">
            <span className="text-xs font-extrabold text-amber-400 uppercase tracking-widest mb-1">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
            <h2 className="text-base font-bold text-white">{currentChallenge.question}</h2>
          </div>

          {/* Identify Challenge Type */}
          {currentChallenge.type === 'identify' && (
            <div className="flex-1 flex flex-col justify-center items-center gap-3 my-auto">
              <div className="grid grid-cols-2 gap-3 w-full max-w-lg">
                {currentChallenge.options.map((opt, idx) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrect = opt === currentChallenge.answer;
                  let btnStyle = "bg-slate-800/90 text-white border-slate-600 hover:bg-slate-700";
                  if (selectedOpt) {
                    if (isCorrect) btnStyle = "bg-emerald-600 text-white border-emerald-400";
                    else if (isSelected) btnStyle = "bg-rose-600 text-white border-rose-400";
                  }
                  return (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null}
                      className={`p-4 rounded-2xl font-bold text-sm border-2 shadow-lg transition-all flex items-center justify-center text-center ${btnStyle}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>

              {selectedOpt && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={advanceChallenge}
                  className="mt-4 px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 font-extrabold text-sm shadow-xl"
                >
                  {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Game! 🎉'}
                </motion.button>
              )}
            </div>
          )}

          {/* Sort Challenge Type */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="flex-1 flex flex-col justify-between pt-2 pb-4">
              {/* Bins container */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-xl mx-auto mb-4">
                {currentChallenge.bins.map(bin => (
                  <div
                    key={bin.id}
                    className="h-32 rounded-3xl border-4 border-dashed border-slate-600 bg-slate-800/60 backdrop-blur flex flex-col items-center justify-center p-3 transition-colors"
                    style={{ borderColor: bin.color }}
                  >
                    <span className="text-sm font-black text-white">{bin.label}</span>
                    <span className="text-[10px] text-slate-400 mt-1">Drop items here</span>
                  </div>
                ))}
              </div>

              {/* Draggable items container */}
              <div className="relative h-28 w-full max-w-xl mx-auto flex justify-around items-center">
                {currentChallenge.sortItems.map(item => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 0}
                    y={itemPositions[item.id]?.y || 0}
                    placed={!!placedItems[item.id]}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>

              {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                <div className="flex justify-center mt-2">
                  <motion.button
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    onClick={advanceChallenge}
                    className="px-6 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-gray-900 font-extrabold text-sm shadow-xl"
                  >
                    {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Game! 🎉'}
                  </motion.button>
                </div>
              )}
            </div>
          )}

          {/* Hint button */}
          <div className="flex justify-center pb-2">
            <button
              onClick={handleShowHint}
              className="px-4 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-amber-400 font-bold text-xs border border-slate-600 shadow-md flex items-center gap-1.5"
            >
              <span>💡 Need a Hint?</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
