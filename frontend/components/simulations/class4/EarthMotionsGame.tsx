'use client';

/**
 * EarthMotionsGame — Learn about Earth's rotation, revolution, and seasons
 *
 * CISCE Nodes: c4_geo_001 (Rotation of Earth), c4_geo_002 (Revolution of Earth),
 *              c4_geo_003 (Seasons caused by revolution and axis tilt)
 * Enrichment: c4_geography_enrichment_part1-3
 *
 * ELI5: "Imagine a spinning top twirling in one place. The Earth spins in just the
 *   same way on an invisible stick called the axis, from the North Pole to the South
 *   Pole, turning west to east in 24 hours to give us day and night! At the same
 *   time, the Earth walks all the way around the Sun in a big oval loop taking
 *   365 and a quarter days — one year! Together with the 23.5-degree tilted axis,
 *   this yearly journey gives us the four seasons!"
 *
 * Misconceptions (from enrichment):
 *   1. "Rotation and revolution are the same thing." → "No! Rotation is spinning on
 *      the axis in 24 hours (day/night). Revolution is orbiting the Sun in 365.25 days (year)!"
 *   2. "The Sun moves around the Earth from east to west." → "No! The Earth rotates
 *      west to east beneath the Sun, making the Sun appear to move across our sky!"
 *   3. "Seasons are caused by being closer to or farther from the Sun." → "No! Seasons
 *      are caused by the combination of revolution and the 23.5-degree tilted axis!"
 *   4. "Rotation causes seasons." → "No! Rotation causes day and night. Revolution and
 *      tilt together cause the seasons!"
 *   5. "Both hemispheres have summer at the same time." → "No! Seasons are opposite!
 *      When India has summer in June, Australia has winter!"
 *
 * Story: "Help Astronaut Arjun explore space, spin the globe, and discover how
 *   rotation, revolution, and the tilted axis create day, night, and the seasons!
 *   Become an Earth Science Star!"
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

// ─── Teaching Slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Rotation of the Earth 🌍",
    text: "Rotation is the spinning of the Earth on its own axis from west to east. One full spin takes 24 hours, which is equal to one whole day and night!",
    emoji: "🔄",
    bgColor: "from-blue-500 to-indigo-600",
    spoken: "Rotation is the spinning of the Earth on its own axis from west to east. One full spin takes 24 hours, giving us day and night!"
  },
  {
    title: "The Tilted Axis 📐",
    text: "The axis is an imaginary line from the North Pole to the South Pole through the Earth's centre. It is tilted at an angle of 23.5 degrees from the vertical!",
    emoji: "🧭",
    bgColor: "from-indigo-500 to-purple-600",
    spoken: "The axis is an imaginary line from the North Pole to the South Pole, tilted at an angle of 23.5 degrees from the vertical!"
  },
  {
    title: "Revolution around the Sun ☀️",
    text: "Revolution is the Earth's yearly journey travelling in an elliptical orbit around the Sun. One full revolution takes 365 and one-quarter days — one year!",
    emoji: "🪐",
    bgColor: "from-cyan-500 to-blue-600",
    spoken: "Revolution is the Earth's yearly journey travelling in an elliptical orbit around the Sun, taking 365.25 days for one year!"
  },
  {
    title: "Leap Years & Extra Days 📅",
    text: "The leftover quarter-day from each revolution adds up over four years to make one full extra day — February 29th in a leap year with 366 days!",
    emoji: "⏱️",
    bgColor: "from-teal-500 to-cyan-600",
    spoken: "The leftover quarter-day from each revolution adds up over four years to make February 29th in a leap year!"
  },
  {
    title: "Seasons Caused by Tilt & Revolution 🍂",
    text: "Seasons are caused by revolution combined with the 23.5-degree axis tilt! When the Northern Hemisphere tilts toward the Sun, we get summer; when away, winter!",
    emoji: "🌸",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Seasons are caused by revolution combined with the axis tilt! When our hemisphere tilts toward the Sun, we get summer; when away, winter!"
  }
];

// ─── Challenges (8 progressive: identify → sort → apply) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is ROTATION of the Earth?",
    answer: "Spinning on its own axis from west to east in 24 hours",
    options: [
      "Spinning on its own axis from west to east in 24 hours",
      "Travelling in a big loop around the Sun in one year",
      "Standing completely still in space"
    ],
    hint: "Think: rotation is like a spinning top turning on the spot in one day!",
    misconception: "Rotation is the Earth SPINNING on its own axis, taking 24 hours! Travelling around the Sun is REVOLUTION, not rotation!"
  },
  {
    type: 'sort',
    question: "Drag each statement! Is it TRUE or FALSE about Earth's rotation?",
    answer: "sort",
    options: [],
    hint: "True facts: Earth rotates west to east, takes 24 hours, causes day and night, axis tilts at 23.5 degrees!",
    misconception: "Remember: rotation takes 24 hours and causes day and night! Revolution takes a year and causes seasons! Do not mix them up!",
    sortItems: [
      { id: 'rot-true-1', label: 'Rotates west to east', icon: 'rotation', correctBin: 'true' },
      { id: 'rot-true-2', label: 'Takes 24 hours (1 day)', icon: 'clock', correctBin: 'true' },
      { id: 'rot-false-1', label: 'Takes 365 days', icon: 'revolution', correctBin: 'false' },
      { id: 'rot-false-2', label: 'Rotation causes seasons', icon: 'seasons', correctBin: 'false' }
    ],
    bins: [
      { id: 'true', label: 'TRUE about Rotation ✅', color: '#22C55E' },
      { id: 'false', label: 'FALSE about Rotation ❌', color: '#EF4444' }
    ]
  },
  {
    type: 'identify',
    question: "How long does ONE ROTATION of the Earth take?",
    answer: "24 hours (one day)",
    options: [
      "24 hours (one day)",
      "365 days (one year)",
      "12 hours (half a day)"
    ],
    hint: "One full spin of the Earth from one midnight to the next midnight takes this long!",
    misconception: "One rotation takes 24 hours, which equals one day! 365 days is how long one revolution takes!"
  },
  {
    type: 'sort',
    question: "Drag each event to the right time of day caused by rotation!",
    answer: "sort",
    options: [],
    hint: "Sunrise = moving into sunlight; Noon = facing Sun directly; Sunset = moving out of sunlight; Night = facing away!",
    misconception: "As the Earth rotates eastward, places move from darkness into light (sunrise), face the Sun (noon), and turn away into night (sunset)!",
    sortItems: [
      { id: 'sun-rise', label: 'Sunrise in the east', icon: 'sun', correctBin: 'sunrise' },
      { id: 'sun-noon', label: 'Noon (sun overhead)', icon: 'sun', correctBin: 'noon' },
      { id: 'sun-set', label: 'Sunset in the west', icon: 'sun', correctBin: 'sunset' },
      { id: 'night-time', label: 'Night (facing away)', icon: 'moon', correctBin: 'night' }
    ],
    bins: [
      { id: 'sunrise', label: 'Sunrise 🌅', color: '#F59E0B' },
      { id: 'noon', label: 'Noon ☀️', color: '#3B82F6' },
      { id: 'sunset', label: 'Sunset 🌇', color: '#EC4899' },
      { id: 'night', label: 'Night 🌙', color: '#4B5563' }
    ]
  },
  {
    type: 'identify',
    question: "What is REVOLUTION of the Earth?",
    answer: "Travelling around the Sun in an orbit in 365.25 days",
    options: [
      "Travelling around the Sun in an orbit in 365.25 days",
      "Spinning on its own axis in 24 hours",
      "Floating randomly in outer space"
    ],
    hint: "Think: revolution is the big yearly trip around the Sun in an oval path!",
    misconception: "Revolution is the Earth's yearly journey orbiting the Sun! Spinning on its own axis is rotation!"
  },
  {
    type: 'sort',
    question: "Drag each fact! Is it TRUE or FALSE about Earth's revolution?",
    answer: "sort",
    options: [],
    hint: "True: orbits Sun, takes 365.25 days, equals one year, combined with tilt causes seasons! False: takes 24 hours!",
    misconception: "Revolution takes 365.25 days (one year). The extra quarter day accumulates over 4 years to create a leap year!",
    sortItems: [
      { id: 'rev-true-1', label: 'Takes 365.25 days', icon: 'revolution', correctBin: 'true' },
      { id: 'rev-true-2', label: 'Equals one year', icon: 'clock', correctBin: 'true' },
      { id: 'rev-false-1', label: 'Takes 24 hours', icon: 'rotation', correctBin: 'false' },
      { id: 'rev-false-2', label: 'Causes day and night', icon: 'sun', correctBin: 'false' }
    ],
    bins: [
      { id: 'true', label: 'TRUE about Revolution ✅', color: '#22C55E' },
      { id: 'false', label: 'FALSE about Revolution ❌', color: '#EF4444' }
    ]
  },
  {
    type: 'identify',
    question: "What causes SEASONS on Earth?",
    answer: "Revolution around the Sun COMBINED with the 23.5-degree axis tilt",
    options: [
      "Revolution around the Sun COMBINED with the 23.5-degree axis tilt",
      "Only the daily rotation of the Earth",
      "The Earth getting closer to or farther from the Sun"
    ],
    hint: "Remember: seasons need BOTH the yearly journey and the leaning 23.5-degree axis!",
    misconception: "Seasons are NOT caused by distance from the Sun! They are caused by revolution combined with the 23.5-degree axis tilt!"
  },
  {
    type: 'sort',
    question: "Drag each hemisphere condition to the correct season!",
    answer: "sort",
    options: [],
    hint: "June: Northern tilted toward Sun = summer; Southern tilted away = winter. December: opposite!",
    misconception: "Seasons are opposite in the two hemispheres! When it is summer in India (June), it is winter in Australia!",
    sortItems: [
      { id: 'june-north', label: 'June: North tilted toward', icon: 'summer', correctBin: 'summer' },
      { id: 'dec-south', label: 'Dec: South tilted toward', icon: 'summer', correctBin: 'summer' },
      { id: 'june-south', label: 'June: South tilted away', icon: 'winter', correctBin: 'winter' },
      { id: 'dec-north', label: 'Dec: North tilted away', icon: 'winter', correctBin: 'winter' }
    ],
    bins: [
      { id: 'summer', label: 'Summer ☀️', color: '#F59E0B' },
      { id: 'winter', label: 'Winter ❄️', color: '#3B82F6' }
    ]
  }
];

// ─── Astronaut Arjun Mascot (Space Scientist) ───────────────────

function AstronautArjun({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-indigo-200"
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
              ? { y: [0, -5, 0] }
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
            <linearGradient id="suit-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>
            <radialGradient id="visor-grad" cx="0.3" cy="0.3" r="0.7">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="70%" stopColor="#1E3A8A" />
              <stop offset="100%" stopColor="#0F172A" />
            </radialGradient>
          </defs>
          {/* Backpack */}
          <rect x="20" y="32" width="35" height="30" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
          {/* Body / Suit */}
          <rect x="22" y="40" width="31" height="32" rx="8" fill="url(#suit-grad)" stroke="#64748B" strokeWidth="1.5" />
          {/* Globe badge on chest */}
          <circle cx="37" cy="52" r="6" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          <path d="M33 52 Q37 48 41 52 Q37 56 33 52 Z" fill="#22C55E" opacity="0.8" />
          {/* Helmet / Head */}
          <circle cx="37" cy="24" r="16" fill="url(#suit-grad)" stroke="#64748B" strokeWidth="1.5" />
          {/* Visor */}
          <ellipse cx="39" cy="25" rx="11" ry="9" fill="url(#visor-grad)" />
          {/* Visor shine */}
          <ellipse cx="35" cy="22" rx="4" ry="2" fill="white" opacity="0.6" transform="rotate(-20 35 22)" />
          {/* Arms */}
          <rect x="12" y="42" width="12" height="22" rx="6" fill="url(#suit-grad)" stroke="#64748B" strokeWidth="1.5" />
          <rect x="51" y="42" width="12" height="22" rx="6" fill="url(#suit-grad)" stroke="#64748B" strokeWidth="1.5" />
          {/* Boots */}
          <rect x="24" y="70" width="12" height="12" rx="4" fill="#334155" />
          <rect x="39" y="70" width="12" height="12" rx="4" fill="#334155" />
          {/* Antenna */}
          <line x1="37" y1="8" x2="37" y2="2" stroke="#475569" strokeWidth="2" />
          <circle cx="37" cy="2" r="3" fill="#EF4444" />
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

// ─── Space Scene Background ───────────────────────────────────

function SpaceScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="space-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0B0F19" />
            <stop offset="50%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <radialGradient id="sun-glow" cx="0.5" cy="0.5" r="0.5">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" stopOpacity="0" />
          </radialGradient>
        </defs>
        <rect width={width} height={height} fill="url(#space-grad)" />

        {/* Stars */}
        {[
          { x: 50, y: 40, r: 1.5 }, { x: 120, y: 90, r: 2 }, { x: 200, y: 30, r: 1 },
          { x: 310, y: 110, r: 2.5 }, { x: 420, y: 50, r: 1.5 }, { x: 530, y: 80, r: 2 },
          { x: 620, y: 40, r: 1 }, { x: 680, y: 130, r: 2 }, { x: 80, y: 180, r: 1.5 },
          { x: 250, y: 220, r: 2 }, { x: 450, y: 200, r: 1 }, { x: 600, y: 230, r: 2.5 }
        ].map((star, i) => (
          <circle key={i} cx={star.x} cy={star.y} r={star.r} fill="white" opacity={0.8} />
        ))}
      </svg>
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

function EarthIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <defs>
        <radialGradient id="earth-grad" cx="0.3" cy="0.3" r="0.7">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="70%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="24" fill="url(#earth-grad)" />
      {/* Continents */}
      <path d="M18 20 Q24 15, 30 22 Q36 15, 42 22 Q45 28, 38 34 Q30 40, 22 34 Q15 28, 18 20 Z" fill="#22C55E" opacity="0.8" />
      <path d="M12 36 Q18 32, 22 40 Q18 45, 12 40 Z" fill="#22C55E" opacity="0.7" />
      {/* Axis line */}
      <line x1="30" y1="2" x2="30" y2="58" stroke="#EF4444" strokeWidth="2" strokeDasharray="3 2" />
    </svg>
  );
}

function RotationIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="none" stroke="#3B82F6" strokeWidth="4" />
      <path d="M30 6 L36 12 L24 12 Z" fill="#3B82F6" />
      <path d="M30 54 L36 48 L24 48 Z" fill="#3B82F6" />
      <circle cx="30" cy="30" r="8" fill="#FACC15" />
    </svg>
  );
}

function RevolutionIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="26" ry="16" fill="none" stroke="#A855F7" strokeWidth="2" strokeDasharray="4 2" />
      <circle cx="30" cy="30" r="8" fill="#FACC15" />
      <circle cx="12" cy="22" r="5" fill="#3B82F6" />
    </svg>
  );
}

function ClockIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="white" stroke="#334155" strokeWidth="2.5" />
      <circle cx="30" cy="30" r="2" fill="#334155" />
      <line x1="30" y1="30" x2="30" y2="14" stroke="#334155" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="30" x2="42" y2="30" stroke="#334155" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SunIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#FACC15" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1="30" y1="30" x2={30 + 24 * Math.cos(angle * Math.PI / 180)} y2={30 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function MoonIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M38 12 A18 18 0 1 1 22 48 A22 22 0 1 0 38 12 Z" fill="#94A3B8" />
    </svg>
  );
}

function SeasonsIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#1E293B" stroke="#475569" strokeWidth="2" />
      <circle cx="30" cy="15" r="5" fill="#FACC15" />
      <circle cx="45" cy="30" r="5" fill="#F97316" />
      <circle cx="30" cy="45" r="5" fill="#22C55E" />
      <circle cx="15" cy="30" r="5" fill="#38BDF8" />
    </svg>
  );
}

function SummerIcon({ size = 50 }: { size?: number }) {
  return <SunIcon size={size} />;
}

function WinterIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#38BDF8" opacity="0.2" />
      <path d="M30 10 L30 50 M10 30 L50 30 M16 16 L44 44 M16 44 L44 16" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Sort Icon Function ────────────────────��───────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'rotation': return <RotationIcon size={size} />;
    case 'revolution': return <RevolutionIcon size={size} />;
    case 'clock': return <ClockIcon size={size} />;
    case 'sun': return <SunIcon size={size} />;
    case 'moon': return <MoonIcon size={size} />;
    case 'seasons': return <SeasonsIcon size={size} />;
    case 'summer': return <SummerIcon size={size} />;
    case 'winter': return <WinterIcon size={size} />;
    default: return <EarthIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={100}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-indigo-200 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`} style={{ width: 120, height: 100 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 transition-all duration-200 shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-sm font-extrabold text-center" style={{ color }}>{label}</span>
      <div className="mt-1 text-xs text-gray-400 font-medium">Drop here</div>
    </div>
  );
}

// ─── Main Component Export ────────────────────────────────────

export interface EarthMotionsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EarthMotionsGame({ width = 720, height = 560, onComplete }: EarthMotionsGameProps) {
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

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 155, y: height - 170 };
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
      const msg = "Great job! You understand Earth's motions!";
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
      const compMsg = "Wonderful! You are an Earth Science Star!";
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

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 50 + idx * 310;
      const binY = 170;
      const binW = 280;
      const binH = 150;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

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
        const msg = "Fantastic! You sorted Earth's motions perfectly!";
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
    <div className="relative overflow-hidden select-none font-sans" style={{ width, height, backgroundColor: '#0F172A' }}>
      <SpaceScene width={width} height={height} />
      <AstronautArjun mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10">
          <div className="w-full flex justify-between items-center max-w-2xl">
            <h1 className="text-2xl font-black text-white drop-shadow-md">Earth Motions Explorer 🚀</h1>
            <div className="flex gap-1">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-cyan-400' : 'w-2.5 bg-white/30'}`} />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-2xl rounded-3xl p-8 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl border border-white/20 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-extrabold mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed max-w-lg">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-2xl">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${slideIdx === 0 ? 'bg-gray-600 opacity-40 cursor-not-allowed' : 'bg-slate-700 hover:bg-slate-600'}`}
            >
              Previous
            </button>
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
              className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-xl"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🌟' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          {/* Header Bar */}
          <div className="flex justify-between items-center max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-cyan-300">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleShowHint}
                className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-400 text-amber-300 text-xs font-bold hover:bg-amber-500/30 flex items-center gap-1 shadow"
              >
                💡 Hint
              </button>
              <div className="text-cyan-200 font-extrabold text-sm">Score: {score}</div>
            </div>
          </div>

          {/* Question Box */}
          <div className="max-w-3xl mx-auto w-full bg-slate-800/90 border border-slate-700 rounded-2xl p-4 shadow-xl text-center">
            <h2 className="text-lg font-extrabold text-white">{currentChallenge.question}</h2>
          </div>

          {/* Challenge Content */}
          <div className="max-w-3xl mx-auto w-full flex-1 flex flex-col justify-center relative">
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 max-w-lg mx-auto w-full">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnBg = 'bg-slate-800/80 hover:bg-slate-700 border-slate-600 text-white';
                  if (selectedOpt) {
                    if (isCorrectAnswer) btnBg = 'bg-emerald-600 border-emerald-400 text-white';
                    else if (isSelected) btnBg = 'bg-rose-600 border-rose-400 text-white';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`p-4 rounded-2xl border-2 font-bold text-left shadow-lg transition-all flex items-center justify-between ${btnBg}`}
                    >
                      <span>{opt}</span>
                      {selectedOpt && isCorrectAnswer && <span>✅</span>}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[320px]">
                {/* Bins */}
                <div className="absolute top-0 left-0 right-0 flex justify-around">
                  {currentChallenge.bins.map((bin, idx) => (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={35 + idx * 315}
                      y={10}
                      width={280}
                      height={140}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  ))}
                </div>

                {/* Draggable Items */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 220 };
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
          </div>

          {/* Footer Navigation for Identify mode */}
          {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center pb-2">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={advanceChallenge}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl"
              >
                Continue ➡️
              </motion.button>
            </div>
          )}

          {/* Footer Navigation for Sort mode when all placed */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
            <div className="flex justify-center pb-2">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={advanceChallenge}
                className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-600 shadow-xl"
              >
                Continue ➡️
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
