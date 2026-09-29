'use client';

/**
 * SolarSystemGame — Learn about the Solar System, Day & Night, Time, and Directions
 *
 * CISCE Nodes: c2_phy_006 (Day and night formation), c2_phy_007 (Solar system and heavenly bodies),
 *              c2_phy_008 (Concept of time - day, week, month, year),
 *              c2_phy_009 (Directions - left/right, above/below, near/far),
 *              c2_phy_010 (Four main directions)
 *
 * ELI5: "The sun is at the center of our solar family! Earth spins around to make day and night.
 *   Eight planets dance around the sun. Seven days make a week, twelve months make a year,
 *   and the sun always rises in the East and sets in the West!"
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
    title: 'Day and Night 🌞🌙',
    text: 'Earth is a round ball spinning in space! The sun shines all the time. When our side faces the sun, it is DAY. When our side turns away, it is NIGHT!',
    emoji: '🌍',
    bgColor: 'from-amber-400 to-gold-600',
  },
  {
    title: 'Our Solar Family 🪐',
    text: 'The sun is at the center of our solar system! Eight planets circle around the sun. Earth is our home planet. The moon goes around Earth!',
    emoji: '☀️',
    bgColor: 'from-yellow-400 to-orange-500',
  },
  {
    title: 'Ladder of Time ⏳',
    text: 'Time climbs from a single day, to 7 days in a week (Monday to Sunday), about 4 weeks in a month, and 12 months in a full year!',
    emoji: '📅',
    bgColor: 'from-gold-400 to-gold-500',
  },
  {
    title: 'Relative Directions 📍',
    text: 'We use relative words: left and right for our hands, above and below for height, and near and far for distance!',
    emoji: '👈',
    bgColor: 'from-emerald-400 to-teal-600',
  },
  {
    title: 'Four Main Directions 🧭',
    text: 'The sun always rises in the EAST and sets in the WEST. If you face the rising sun, North is to your left and South is to your right!',
    emoji: '🧭',
    bgColor: 'from-purple-400 to-gold-600',
  },
];

// ─── Types ────────────────────────────────────────────────────

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

// ─── Challenges (8 progressive: identify → sort) ─────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Why do we have day and night on Earth?',
    answer: 'Earth rotates on its axis',
    options: ['Earth rotates on its axis', 'The sun moves around Earth', 'The moon blocks the sun'],
    hint: 'Think of Earth spinning like a top in front of a lamp!',
    misconception: 'The sun does NOT move around Earth! Earth spins (rotates) on its axis. When our side faces the sun, it is day; when it turns away, it is night!',
  },
  {
    type: 'identify',
    question: 'When our side of Earth faces the sun, what time of day is it?',
    answer: 'Day',
    options: ['Day', 'Night', 'Midnight'],
    hint: 'When the sun is shining brightly on your side, are you awake in the day or sleeping at night?',
    misconception: 'When sunlight reaches our side of Earth, we experience DAY! Night happens when our side turns away from the sun!',
  },
  {
    type: 'identify',
    question: 'What is at the CENTER of our solar system?',
    answer: 'The Sun',
    options: ['The Sun', 'The Earth', 'The Moon'],
    hint: 'It is a huge, hot, glowing ball of burning gases that is the boss of our solar system!',
    misconception: 'The Sun is at the center! Earth and all the planets move around the sun, not the other way around!',
  },
  {
    type: 'sort',
    question: 'Drag the planets into their correct order from the sun (closest to farthest)!',
    answer: 'sort',
    options: [],
    hint: 'Mercury is closest to the sun, then Venus, then Earth, then Mars!',
    misconception: 'The order from the sun is: 1st Mercury, 2nd Venus, 3rd Earth, 4th Mars! Mercury is the closest planet to the sun.',
    sortItems: [
      { id: 'planet-mercury', label: '1. Mercury', icon: 'mercury', correctBin: 'bin-1' },
      { id: 'planet-venus', label: '2. Venus', icon: 'venus', correctBin: 'bin-2' },
      { id: 'planet-earth', label: '3. Earth', icon: 'earth', correctBin: 'bin-3' },
      { id: 'planet-mars', label: '4. Mars', icon: 'mars', correctBin: 'bin-4' },
    ],
    bins: [
      { id: 'bin-1', label: '1st (Closest)', color: '#9E9E9E' },
      { id: 'bin-2', label: '2nd', color: '#E53935' },
      { id: 'bin-3', label: '3rd (Earth)', color: '#1E88E5' },
      { id: 'bin-4', label: '4th', color: '#FB8C00' },
    ],
  },
  {
    type: 'identify',
    question: 'How many days are in a complete week?',
    answer: '7 days',
    options: ['7 days', '5 days', '30 days'],
    hint: 'Count from Sunday, Monday, Tuesday... all the way to Saturday!',
    misconception: 'A week ALWAYS has 7 days — Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, and Saturday! School days are 5, but the week has 7 days.',
  },
  {
    type: 'sort',
    question: 'Drag the units of time from SHORTEST to LONGEST!',
    answer: 'sort',
    options: [],
    hint: 'Day is shortest, then Week, then Month, and Year is longest!',
    misconception: 'The time ladder goes: Day (shortest) → Week (7 days) → Month (about 4 weeks) → Year (12 months, longest)!',
    sortItems: [
      { id: 'time-day', label: '1. Day', icon: 'clock', correctBin: 'bin-day' },
      { id: 'time-week', label: '2. Week', icon: 'calendar', correctBin: 'bin-week' },
      { id: 'time-month', label: '3. Month', icon: 'calendar', correctBin: 'bin-month' },
      { id: 'time-year', label: '4. Year', icon: 'calendar', correctBin: 'bin-year' },
    ],
    bins: [
      { id: 'bin-day', label: 'Day', color: '#FFB300' },
      { id: 'bin-week', label: 'Week', color: '#00ACC1' },
      { id: 'bin-month', label: 'Month', color: '#7E57C2' },
      { id: 'bin-year', label: 'Year', color: '#43A047' },
    ],
  },
  {
    type: 'identify',
    question: 'If you face the rising sun in the morning (East), which direction is on your LEFT?',
    answer: 'North',
    options: ['North', 'South', 'West'],
    hint: 'Facing East: front is East, back is West, left is North, right is South!',
    misconception: 'When facing East (rising sun), your left hand points to NORTH and your right hand points to SOUTH! Cardinal directions are fixed in space.',
  },
  {
    type: 'sort',
    question: 'Drag each direction to match its OPPOSITE cardinal direction!',
    answer: 'sort',
    options: [],
    hint: 'North is opposite to South, and East is opposite to West!',
    misconception: 'Opposite pairs: North is opposite South, and East is opposite West! They form a cross in space.',
    sortItems: [
      { id: 'dir-north', label: 'North opposite', icon: 'compass', correctBin: 'bin-south' },
      { id: 'dir-east', label: 'East opposite', icon: 'compass', correctBin: 'bin-west' },
    ],
    bins: [
      { id: 'bin-south', label: 'South', color: '#E91E63' },
      { id: 'bin-west', label: 'West', color: '#9C27B0' },
    ],
  },
];

// ─── Astronaut Aakash Mascot Component ────────────────────────

function AstronautAakash({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-200"
          >
            <p className="text-xs font-bold text-gold-900">{speaking}</p>
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
          {/* Jetpack */}
          <rect x="22" y="32" width="10" height="25" rx="3" fill="#B0BEC5" stroke="#37474F" strokeWidth="1.5" />
          <rect x="43" y="32" width="10" height="25" rx="3" fill="#B0BEC5" stroke="#37474F" strokeWidth="1.5" />
          {/* Body / Space suit */}
          <rect x="25" y="35" width="25" height="30" rx="8" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5" />
          <circle cx="37" cy="45" r="4" fill="#FFD700" /> {/* Star badge */}
          {/* Helmet */}
          <circle cx="37" cy="24" r="15" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5" />
          <circle cx="37" cy="24" r="11" fill="#263238" /> {/* Visor */}
          <ellipse cx="34" cy="21" rx="4" ry="2.5" fill="#90CAF9" opacity="0.8" /> {/* Visor reflection */}
          {/* Happy face inside visor */}
          <circle cx="33" cy="23" r="1.5" fill="white" />
          <circle cx="41" cy="23" r="1.5" fill="white" />
          <path d="M34 27 Q37 30 40 27" stroke="white" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <ellipse cx="18" cy="45" rx="5" ry="10" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5" transform="rotate(20 18 45)" />
          <ellipse cx="57" cy="45" rx="5" ry="10" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5" transform="rotate(-20 57 45)" />
          {/* Legs */}
          <rect x="27" y="62" width="8" height="15" rx="4" fill="#CFD8DC" stroke="#37474F" strokeWidth="1.5" />
          <rect x="40" y="62" width="8" height="15" rx="4" fill="#CFD8DC" stroke="#37474F" strokeWidth="1.5" />
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
      {/* Deep space gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="space-sky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#0B0D1B" />
            <stop offset="50%" stopColor="#1A103C" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#space-sky)" />
      </svg>
      {/* Twinkling Stars */}
      {[
        { top: '10%', left: '15%', size: 3 },
        { top: '25%', left: '80%', size: 4 },
        { top: '15%', left: '45%', size: 2 },
        { top: '65%', left: '10%', size: 3 },
        { top: '80%', left: '85%', size: 4 },
        { top: '40%', left: '90%', size: 2 },
        { top: '75%', left: '40%', size: 3 },
        { top: '30%', left: '25%', size: 3 },
      ].map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-white"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 2 + (i % 3), repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
      {/* Distant Planet */}
      <div className="absolute top-10 left-10 opacity-40">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="25" fill="#E91E63" />
          <ellipse cx="30" cy="30" rx="32" ry="8" fill="none" stroke="#F48FB1" strokeWidth="3" transform="rotate(-20 30 30)" />
        </svg>
      </div>
      {/* Small Rocket drifting */}
      <motion.div
        className="absolute bottom-6 left-12 opacity-60"
        animate={{ y: [0, -15, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40">
          <path d="M20 5 L28 25 L20 22 L12 25 Z" fill="#FF5722" />
          <polygon points="20,5 24,22 16,22" fill="#FF9800" />
          <path d="M12 22 L8 28 L16 26 Z" fill="#90CAF9" />
          <path d="M28 22 L32 28 L24 26 Z" fill="#90CAF9" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Topic-Specific Custom SVG Icons ──────────────────────────

function SunIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="14" fill="#FFC107" />
      <circle cx="25" cy="25" r="11" fill="#FF9800" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line
          key={angle}
          x1={25 + 16 * Math.cos((angle * Math.PI) / 180)}
          y1={25 + 16 * Math.sin((angle * Math.PI) / 180)}
          x2={25 + 22 * Math.cos((angle * Math.PI) / 180)}
          y2={25 + 22 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFEB3B"
          strokeWidth="3"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}

function EarthIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#29B6F6" />
      <path d="M15 15 Q25 10, 35 20 Q40 30, 30 38 Q18 42, 12 30 Z" fill="#66BB6A" />
      <path d="M28 10 Q32 15, 30 20 Z" fill="#66BB6A" />
    </svg>
  );
}

function MercuryIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="16" fill="#B0BEC5" />
      <circle cx="18" cy="20" r="3" fill="#78909C" opacity="0.6" />
      <circle cx="32" cy="30" r="4" fill="#78909C" opacity="0.6" />
      <circle cx="25" cy="33" r="2" fill="#78909C" opacity="0.6" />
    </svg>
  );
}

function VenusIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="18" fill="#FFCA28" />
      <path d="M10 20 Q25 12, 40 20" stroke="#FFE082" strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M12 30 Q25 22, 38 30" stroke="#FFE082" strokeWidth="3" fill="none" opacity="0.8" />
    </svg>
  );
}

function MarsIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="17" fill="#E53935" />
      <circle cx="20" cy="18" r="4" fill="#B71C1C" opacity="0.5" />
      <circle cx="33" cy="30" r="5" fill="#B71C1C" opacity="0.5" />
    </svg>
  );
}

function CalendarIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="12" width="34" height="32" rx="4" fill="white" stroke="#37474F" strokeWidth="2" />
      <rect x="8" y="12" width="34" height="10" rx="4" fill="#E53935" />
      <circle cx="15" cy="8" r="2" fill="#78909C" />
      <circle cx="35" cy="8" r="2" fill="#78909C" />
      <line x1="16" y1="28" x2="22" y2="28" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="28" x2="34" y2="28" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
      <line x1="16" y1="36" x2="22" y2="36" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
      <line x1="28" y1="36" x2="34" y2="36" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClockIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="white" stroke="#37474F" strokeWidth="2" />
      <circle cx="25" cy="25" r="2" fill="#37474F" />
      <line x1="25" y1="25" x2="25" y2="13" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
      <line x1="25" y1="25" x2="33" y2="25" stroke="#37474F" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CompassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="20" fill="#ECEFF1" stroke="#37474F" strokeWidth="2" />
      <polygon points="25,10 28,25 25,40 22,25" fill="#E53935" />
      <polygon points="25,40 28,25 25,10 22,25" fill="#90CAF9" />
      <circle cx="25" cy="25" r="3" fill="#37474F" />
      <text x="23" y="14" fontSize="8" fontWeight="bold" fill="#37474F">N</text>
      <text x="23" y="44" fontSize="8" fontWeight="bold" fill="#37474F">S</text>
    </svg>
  );
}

function renderTopicIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'mercury': return <MercuryIcon size={size} />;
    case 'venus': return <VenusIcon size={size} />;
    case 'earth': return <EarthIcon size={size} />;
    case 'mars': return <MarsIcon size={size} />;
    case 'calendar': return <CalendarIcon size={size} />;
    case 'clock': return <ClockIcon size={size} />;
    case 'compass': return <CompassIcon size={size} />;
    default: return <SunIcon size={size} />;
  }
}

// ─── Sort Card Component ───────────────────────────────────────

function SortCard({
  id,
  label,
  icon,
  x,
  y,
  placed,
  onDragStart,
  onDragEnd,
}: {
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
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-200 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        } px-2 py-1`}
        style={{ width: 110, height: 95 }}
      >
        {renderTopicIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 leading-tight">
          {label}
        </span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

function SortBin({
  label,
  color,
  x,
  y,
  width,
  height,
  isHovering,
}: {
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all duration-200 ${
        isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}22`,
      }}
    >
      <div
        className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm mb-1 shadow"
        style={{ backgroundColor: color }}
      >
        📦
      </div>
      <span className="text-xs font-bold text-gray-900 text-center leading-tight">
        {label}
      </span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slide = TEACHING_SLIDES[currentSlide];

  const handleNext = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white bg-gradient-to-br from-gold-950 via-purple-950 to-gold-950">
      <SpaceScene width={720} height={560} />
      <div className="relative z-10 max-w-lg w-full bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl flex flex-col items-center text-center">
        {/* Slide header */}
        <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${slide.bgColor} flex items-center justify-center text-3xl shadow-lg mb-4`}>
          {slide.emoji}
        </div>
        <h2 className="text-2xl font-black text-white mb-2">{slide.title}</h2>
        <p className="text-sm font-medium text-gold-100 leading-relaxed mb-6 min-h-[70px]">
          {slide.text}
        </p>

        {/* Progress dots */}
        <div className="flex gap-2 mb-6">
          {TEACHING_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          {currentSlide > 0 && (
            <button
              onClick={handlePrev}
              className="flex-1 py-3 px-6 rounded-2xl bg-white/20 hover:bg-white/30 font-bold text-white transition-all shadow-md active:scale-95"
            >
              ⬅️ Back
            </button>
          )}
          <button
            onClick={handleNext}
            className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-300 hover:to-amber-400 text-gold-950 font-black text-lg transition-all shadow-lg active:scale-95"
          >
            {currentSlide === TEACHING_SLIDES.length - 1 ? '🚀 Start Game!' : 'Next ➡️'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface SolarSystemGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SolarSystemGame({ width = 720, height = 560, onComplete }: SolarSystemGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [starsCount, setStarsCount] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Mascot speaking state
  const [mascotSpeaking, setMascotSpeaking] = useState<string | null>('Welcome space cadet! Let us explore the solar system!');
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');

  // Sort challenge draggable states
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});

  const challenge = CHALLENGES[currentChallengeIndex];

  // Inactivity hint timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play') {
        audioManager.play('hint');
        setHintMessage(challenge.hint);
        setMascotMood('thinking');
        setMascotSpeaking('Need a clue? Check this out!');
        speechManager.speak('Need a clue? Check this out!');
      }
    }, 10000);
  }, [challenge.hint, screen]);

  useEffect(() => {
    if (screen === 'play') {
      resetInactivityTimer();
    }
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, screen, resetInactivityTimer]);

  // Initialize sort positions when challenge changes
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initial: Record<string, { x: number; y: number; placed: boolean }> = {};
      challenge.sortItems.forEach((item, index) => {
        initial[item.id] = {
          x: 60 + index * 140,
          y: 380,
          placed: false,
        };
      });
      setItemPositions(initial);
    }
  }, [currentChallengeIndex, challenge]);

  // Handle multiple-choice selection
  const handleOptionClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('drop-correct');
      audioManager.play('chime');
      setSparklePos({ x, y });
      setStarsCount(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeaking('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');

      const nextIdx = currentChallengeIndex + 1;
      if (nextIdx < CHALLENGES.length) {
        setSuccessMessage('Brilliant job! Moving to next challenge!');
        setShowSuccessBanner(true);
      } else {
        // Game complete!
        setShowConfetti(true);
        audioManager.play('celebration');
        const finalScore = Math.max(0, 100 - errors * 5);
        if (onComplete) onComplete(finalScore);
      }
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeaking('Not quite right. Let us learn why!');
      speechManager.speak('Not quite right. Let us learn why!');
      setHintMessage(challenge.misconception);
    }
  };

  // Handle Sort Drag Start
  const handleDragStart = () => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Handle Sort Drag End
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Find if dropped inside any bin
    // Bins layout:
    // Bin 1: x: 80, y: 150, w: 120, h: 180
    // Bin 2: x: 280, y: 150, w: 120, h: 180
    // Bin 3: x: 480, y: 150, w: 120, h: 180 (if 3 bins)
    const binsCount = challenge.bins.length;
    const binWidth = 140;
    const startX = (width - binsCount * binWidth - (binsCount - 1) * 20) / 2;

    let droppedBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 140;
      const bw = binWidth;
      const bh = 190;

      if (x + 55 >= bx && x + 55 <= bx + bw && y + 45 >= by && y + 45 <= by + bh) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      // Correct drop!
      audioManager.play('drop-correct');
      setItemPositions(prev => ({
        ...prev,
        [id]: { x, y, placed: true },
      }));

      // Check if all items placed
      const updatedPositions = {
        ...itemPositions,
        [id]: { x, y, placed: true },
      };
      const allPlaced = challenge.sortItems?.every(i => updatedPositions[i.id]?.placed);

      if (allPlaced) {
        audioManager.play('chime');
        setStarsCount(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeaking('All sorted perfectly! Amazing!');
        speechManager.speak('All sorted perfectly! Amazing!');

        const nextIdx = currentChallengeIndex + 1;
        if (nextIdx < CHALLENGES.length) {
          setSuccessMessage('Wonderful sorting! Next challenge coming up!');
          setShowSuccessBanner(true);
        } else {
          setShowConfetti(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }
      return true;
    } else {
      // Wrong drop bin!
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeaking('Oops! That bin is not quite right.');
      speechManager.speak('Oops! That bin is not quite right.');
      setHintMessage(challenge.misconception);
      return false;
    }
  };

  const handleSuccessBannerComplete = () => {
    setShowSuccessBanner(false);
    setCurrentChallengeIndex(prev => prev + 1);
    setMascotMood('happy');
    setMascotSpeaking('Let us tackle the next space mission!');
    speechManager.speak('Let us tackle the next space mission!');
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} />;
  }

  const isCompleteScreen = currentChallengeIndex >= CHALLENGES.length;

  return (
    <div
      className="relative flex flex-col items-center justify-between select-none overflow-hidden font-sans"
      style={{ width, height, backgroundColor: '#0B0D1B' }}
    >
      {/* Background */}
      <SpaceScene width={width} height={height} />

      {/* Header bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-3 bg-white/10 backdrop-blur-md border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-yellow-400 to-amber-500 flex items-center justify-center text-lg font-black text-gold-950 shadow">
            🚀
          </div>
          <div>
            <h1 className="text-sm font-black text-white leading-tight">Solar System Explorer</h1>
            <p className="text-[10px] font-bold text-gold-200">
              Challenge {Math.min(currentChallengeIndex + 1, CHALLENGES.length)} of {CHALLENGES.length}
            </p>
          </div>
        </div>

        {/* Stars count */}
        <div className="flex items-center gap-2 bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
          <StarRow count={starsCount} total={CHALLENGES.length} />
          <span className="text-xs font-black text-yellow-400 ml-1">{starsCount}/{CHALLENGES.length}</span>
        </div>
      </div>

      {/* Mascot */}
      <AstronautAakash mood={mascotMood} speaking={mascotSpeaking} />

      {/* Main Game Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6">
        {!isCompleteScreen && (
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-gold-200 flex flex-col items-center text-center">
            {/* Question */}
            <h2 className="text-lg font-black text-gold-950 mb-6 leading-snug">
              {challenge.question}
            </h2>

            {/* Challenge Type: Identify (Multiple Choice) */}
            {challenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {challenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={e => handleOptionClick(option, e)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-gold-50 to-gold-50 hover:from-gold-100 hover:to-gold-100 border-2 border-gold-200 text-gold-950 font-bold text-sm shadow-sm transition-all flex items-center justify-center gap-3"
                  >
                    <span className="w-7 h-7 rounded-full bg-gold-600 text-white flex items-center justify-center text-xs font-black">
                      {idx + 1}
                    </span>
                    <span>{option}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Challenge Type: Sort (Drag and Drop) */}
            {challenge.type === 'sort' && challenge.bins && challenge.sortItems && (
              <div className="relative w-full h-80">
                {/* Bins */}
                <div className="absolute top-2 left-0 right-0 flex justify-center gap-5">
                  {challenge.bins.map((bin, idx) => {
                    const binsCount = challenge.bins!.length;
                    const binWidth = 140;
                    const startX = (width - binsCount * binWidth - (binsCount - 1) * 20) / 2;
                    return (
                      <div
                        key={bin.id}
                        className="absolute"
                        style={{ left: startX + idx * (binWidth + 20), top: 0 }}
                      >
                        <SortBin
                          label={bin.label}
                          color={bin.color}
                          x={0}
                          y={0}
                          width={binWidth}
                          height={190}
                          isHovering={false}
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Draggable Cards */}
                {challenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 380, placed: false };
                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={pos.x}
                      y={pos.y}
                      placed={pos.placed}
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

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => {}} />}
      {showSuccessBanner && (
        <SuccessBanner message={successMessage} onComplete={handleSuccessBannerComplete} />
      )}
      {hintMessage && (
        <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)} />
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
