'use client';

/**
 * SoundNoiseGame — Learn about sounds made by common objects, pleasant and
 *                  unpleasant sounds, sound as a warning signal, and noise pollution!
 *
 * CISCE Nodes: c5_phy_001 (Sounds made by common objects),
 *              c5_phy_002 (Pleasant and unpleasant sounds),
 *              c5_phy_003 (Sound as a warning signal),
 *              c5_phy_004 (Noise pollution and its effects on health)
 *
 * Enrichment: c5_physics_enrichment_part1-4
 *
 * ELI5: "Sound is a form of energy made by vibrating objects! Common objects
 *   make different sounds — bells ring, drums beat, and whistles blow. Some
 *   sounds are pleasant like birds singing, while others are unpleasant noise
 *   like loud traffic horns. Special sounds act as warning signals like
 *   ambulance sirens and fire alarms! Too much loud noise causes noise pollution
 *   which harms our health."
 *
 * Story: "Help Musician Maya test musical instruments, explore pleasant sounds,
 *   respond to emergency sirens, and reduce noise pollution in the city!"
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

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Sounds Made by Common Objects 🎵",
    text: "Sound is produced when an object vibrates — moves back and forth very quickly! Everyday objects make unique sounds: a clock ticks steadily, a whistle is shrill, a tea kettle hisses when boiling, and a bell rings clearly when struck.",
    emoji: "🎵",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "Sound is produced when an object vibrates! Everyday objects make unique sounds: a clock ticks steadily, a whistle is shrill, a tea kettle hisses when boiling, and a bell rings clearly when struck."
  },
  {
    title: "Pleasant & Unpleasant Sounds 🎶",
    text: "Pleasant sounds feel soothing, smooth, and rhythmic to our ears — like birds chirping, gentle wind, or soft flute music. Unpleasant sounds feel harsh, loud, and jarring — like loud traffic honking or firecrackers bursting!",
    emoji: "🎶",
    bgColor: "from-yellow-400 to-amber-500",
    spoken: "Pleasant sounds feel soothing, smooth, and rhythmic to our ears, like birds chirping or soft flute music. Unpleasant sounds feel harsh, loud, and jarring, like loud traffic honking or firecrackers bursting!"
  },
  {
    title: "Sound as a Warning Signal 🚨",
    text: "A warning signal is a special sound that carries an urgent message and tells people to act quickly for safety! Examples include fire alarms telling people to evacuate, ambulance sirens asking drivers to give way, and school bells marking period changes.",
    emoji: "🚨",
    bgColor: "from-gold-400 to-gold-500",
    spoken: "A warning signal is a special sound that carries an urgent message and tells people to act quickly for safety! Examples include fire alarms, ambulance sirens, and school bells."
  },
  {
    title: "Noise Pollution & Health 🏙️",
    text: "Noise pollution is the presence of unwanted, harmful loud sounds in our surroundings. Causes include heavy traffic, loudspeakers, and construction. It causes hearing loss, headaches, sleep disturbance, and difficulty concentrating!",
    emoji: "🏙️",
    bgColor: "from-gold-400 to-purple-500",
    spoken: "Noise pollution is the presence of unwanted, harmful loud sounds in our surroundings. It causes hearing loss, headaches, sleep disturbance, and difficulty concentrating!"
  },
  {
    title: "How to Reduce Noise Pollution 🌳",
    text: "We can reduce noise pollution by planting trees along roads as natural sound barriers, avoiding unnecessary vehicle honking near schools and hospitals, keeping television and music volumes low, and wearing earplugs in noisy factories!",
    emoji: "🌳",
    bgColor: "from-purple-400 to-pink-500",
    spoken: "We can reduce noise pollution by planting trees along roads as sound barriers, avoiding unnecessary vehicle honking, keeping music volumes low, and wearing earplugs in noisy factories!"
  },
];

// ─── Challenges (8 progressive) ──────────────────────���────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "Which of these produces a PLEASANT sound?",
    answer: "Birds singing in the morning",
    options: [
      "Birds singing in the morning",
      "Loud truck horns in traffic",
      "Jackhammers at construction sites"
    ],
    hint: "Think: which sound feels soothing, smooth, and calming to your ears?",
    misconception: "Birds singing, soft music, and gentle rain are pleasant sounds because they feel soothing and smooth. Truck horns and jackhammers are loud and harsh!"
  },
  {
    type: 'sort',
    question: "Drag each sound to Pleasant or Unpleasant!",
    answer: "sort",
    options: [],
    hint: "Pleasant = birds singing, soft flute! Unpleasant = traffic horns, firecracker explosion!",
    misconception: "Remember: pleasant sounds are soft, rhythmic, and musical (flute, birdsong). Unpleasant sounds are loud, harsh, and jarring (truck horns, firecrackers)!",
    sortItems: [
      { id: 's1', label: 'Birds Singing', icon: 'bird', correctBin: 'pleasant' },
      { id: 's2', label: 'Soft Flute', icon: 'musical', correctBin: 'pleasant' },
      { id: 's3', label: 'Traffic Horns', icon: 'traffic', correctBin: 'unpleasant' },
      { id: 's4', label: 'Firecrackers', icon: 'drum', correctBin: 'unpleasant' },
    ],
    bins: [
      { id: 'pleasant', label: 'Pleasant Sound 🎶', color: '#22C55E' },
      { id: 'unpleasant', label: 'Unpleasant Sound 💥', color: '#EF4444' },
    ]
  },
  {
    type: 'identify',
    question: "How is sound used as a WARNING signal?",
    answer: "It carries a message of danger and tells people to act quickly for safety",
    options: [
      "It carries a message of danger and tells people to act quickly for safety",
      "It is only used for entertainment and relaxation",
      "It has no special purpose in daily life"
    ],
    hint: "Think about an ambulance siren or a fire alarm — why do they sound?",
    misconception: "A warning signal carries an urgent message and requires a response, like an ambulance siren asking drivers to give way or a fire alarm telling people to evacuate!"
  },
  {
    type: 'sort',
    question: "Drag each warning sound to its correct emergency purpose!",
    answer: "sort",
    options: [],
    hint: "Fire alarm = fire emergency! Ambulance siren = medical emergency!",
    misconception: "Each warning sound has a specific meaning. Fire alarms signal fire and evacuation; ambulance sirens signal medical emergencies and ask for way!",
    sortItems: [
      { id: 'w1', label: 'Fire Alarm', icon: 'bell', correctBin: 'fire' },
      { id: 'w2', label: 'Ambulance Siren', icon: 'siren', correctBin: 'medical' },
      { id: 'w3', label: 'School Bell', icon: 'clock', correctBin: 'school' },
      { id: 'w4', label: 'Smoke Detector', icon: 'bell', correctBin: 'fire' },
    ],
    bins: [
      { id: 'fire', label: 'Fire Emergency 🔥', color: '#EF4444' },
      { id: 'medical', label: 'Medical Emergency 🚑', color: '#3B82F6' },
      { id: 'school', label: 'School Routine 🏫', color: '#EAB308' },
    ]
  },
  {
    type: 'identify',
    question: "What is noise pollution?",
    answer: "The presence of unwanted, harmful loud sounds in the environment",
    options: [
      "The presence of unwanted, harmful loud sounds in the environment",
      "Soft music played on a piano",
      "Gentle rain falling on the roof"
    ],
    hint: "Think about what happens when too many loud, unpleasant sounds occur together in a city.",
    misconception: "Noise pollution is the build-up of unwanted, unpleasant loud sounds like heavy traffic, construction, and loudspeakers that disturb health and peace!"
  },
  {
    type: 'sort',
    question: "Drag each source to whether it causes noise pollution!",
    answer: "sort",
    options: [],
    hint: "Causes noise = traffic, construction drills! Does not cause noise = birdsong, gentle rain!",
    misconception: "Not all sounds cause pollution. Natural sounds like birdsong and rain are pleasant, while heavy traffic, industrial machines, and loudspeakers cause noise pollution!",
    sortItems: [
      { id: 'n1', label: 'Heavy Traffic', icon: 'traffic', correctBin: 'yes' },
      { id: 'n2', label: 'Construction Drill', icon: 'drum', correctBin: 'yes' },
      { id: 'n3', label: 'Birds Singing', icon: 'bird', correctBin: 'no' },
      { id: 'n4', label: 'Gentle Rain', icon: 'musical', correctBin: 'no' },
    ],
    bins: [
      { id: 'yes', label: 'Causes Noise Pollution ⚠️', color: '#EF4444' },
      { id: 'no', label: 'Quiet / Natural 🌿', color: '#22C55E' },
    ]
  },
  {
    type: 'identify',
    question: "Which health problem can be caused by long-term exposure to loud noise?",
    answer: "Hearing damage and hearing loss",
    options: [
      "Hearing damage and hearing loss",
      "Better eyesight and night vision",
      "Stronger bones and muscles"
    ],
    hint: "Think about the delicate parts inside your ears when exposed to very loud sounds for a long time.",
    misconception: "Very loud noise can injure the delicate parts of the inner ear, leading to hearing loss that may be permanent! It also causes headaches and sleep disturbance."
  },
  {
    type: 'sort',
    question: "Drag each action or effect to Health Effect or Prevention!",
    answer: "sort",
    options: [],
    hint: "Health effect = hearing loss, headaches! Prevention = plant trees, wear earplugs!",
    misconception: "Remember: health effects include hearing loss, stress, and sleep problems. Preventions include planting trees as sound barriers, wearing earplugs, and lowering volume!",
    sortItems: [
      { id: 'e1', label: 'Hearing Loss', icon: 'ear', correctBin: 'effect' },
      { id: 'e2', label: 'Headaches & Stress', icon: 'headphone', correctBin: 'effect' },
      { id: 'e3', label: 'Plant Trees as Barriers', icon: 'tree', correctBin: 'prevention' },
      { id: 'e4', label: 'Wear Earplugs', icon: 'headphone', correctBin: 'prevention' },
    ],
    bins: [
      { id: 'effect', label: 'Health Effect 🏥', color: '#EF4444' },
      { id: 'prevention', label: 'Prevention 🛡️', color: '#22C55E' },
    ]
  },
];

// ─── Musician Maya Mascot ─────────────────────────────────────

function MusicianMaya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
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
            <linearGradient id="maya-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="maya-jacket" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899" />
              <stop offset="100%" stopColor="#BE185D" />
            </linearGradient>
          </defs>
          {/* Hair / Head */}
          <circle cx="37" cy="28" r="18" fill="#831843" />
          <circle cx="37" cy="30" r="16" fill="url(#maya-face)" />
          {/* Jacket body */}
          <path d="M20 50 L37 55 L55 50 L58 80 L17 80 Z" fill="url(#maya-jacket)" />
          {/* Musical note badge */}
          <circle cx="28" cy="62" r="5" fill="#FBBF24" />
          <path d="M26 62 L30 60 L30 65" stroke="#1E293B" strokeWidth="1.5" fill="none" />
          {/* Headphones over ears */}
          <path d="M21 22 Q37 8 53 22" stroke="#334155" strokeWidth="3" fill="none" />
          <rect x="18" y="22" width="6" height="12" rx="3" fill="#334155" />
          <rect x="51" y="22" width="6" height="12" rx="3" fill="#334155" />
          {/* Eyes */}
          <circle cx="30" cy="28" r="2.5" fill="#1E293B" />
          <circle cx="44" cy="28" r="2.5" fill="#1E293B" />
          {/* Smile */}
          <path d="M31 38 Q37 43 43 38" stroke="#831843" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Arms */}
          <ellipse cx="14" cy="62" rx="4" ry="10" fill="url(#maya-jacket)" transform="rotate(-15 14 62)" />
          <ellipse cx="61" cy="62" rx="4" ry="10" fill="url(#maya-jacket)" transform="rotate(15 61 62)" />
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

// ─── Music Studio Scene Background ────────────────────────────

function StudioScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="studio-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="50%" stopColor="#312E81" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
          <linearGradient id="floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        {/* Studio background wall */}
        <rect width={width} height={height} fill="url(#studio-sky-grad)" />
        {/* Floor */}
        <rect x="0" y={height - 70} width={width} height="70" fill="url(#floor-grad)" />
        <line x1="0" y1={height - 70} x2={width} y2={height - 70} stroke="#64748B" strokeWidth="3" />
        {/* Studio window showing pleasant trees outside */}
        <rect x={width - 130} y={20} width="100" height="110" fill="#0F172A" rx="4" stroke="#64748B" strokeWidth="4" />
        <line x1={width - 80} y1="20" x2={width - 80} y2="130" stroke="#64748B" strokeWidth="2" />
        <line x1={width - 130} y1="75" x2={width - 30} y2="75" stroke="#64748B" strokeWidth="2" />
        {/* Tree outside window */}
        <circle cx={width - 80} cy={50} r="22" fill="#15803D" opacity="0.8" />
        <rect x={width - 84} y={65} width="8" height="35" fill="#78350F" />
        {/* Sound wave display graphic on studio wall */}
        <path d="M 40 50 Q 60 20, 80 50 T 120 50 T 160 50 T 200 50" fill="none" stroke="#38BDF8" strokeWidth="3" opacity="0.6" />
        <path d="M 40 70 Q 70 100, 100 70 T 160 70 T 220 70" fill="none" stroke="#F43F5E" strokeWidth="2" opacity="0.4" />
      </svg>
    </div>
  );
}

// ─── Custom SVG Sound & Noise Topic Icons ─────────────────────

function SoundWaveIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#E0F2FE" rx="6" stroke="#0284C7" strokeWidth="2" />
      <path d="M 12 30 Q 18 10, 24 30 T 36 30 T 48 30" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BellIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M 30 10 C 20 10, 18 25, 15 35 L 45 35 C 42 25, 40 10, 30 10 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="30" cy="42" r="5" fill="#CA8A04" />
      <path d="M 22 8 Q 30 2, 38 8" fill="none" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SirenIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M 15 40 L 45 40 L 40 25 L 20 25 Z" fill="#334155" stroke="#1E293B" strokeWidth="2" />
      <circle cx="30" cy="20" r="10" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
      <path d="M 24 10 Q 30 2, 36 10" fill="none" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MusicalNoteIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="40" r="7" fill="#8B5CF6" />
      <path d="M 27 40 L 27 15 L 45 20 L 45 35" fill="none" stroke="#8B5CF6" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="45" cy="35" r="7" fill="#8B5CF6" />
    </svg>
  );
}

function HeadphoneIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M 15 35 A 18 18 0 0 1 45 35" fill="none" stroke="#3B82F6" strokeWidth="5" strokeLinecap="round" />
      <rect x="10" y="32" width="8" height="15" rx="4" fill="#1E293B" />
      <rect x="42" y="32" width="8" height="15" rx="4" fill="#1E293B" />
    </svg>
  );
}

function BirdIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#22C55E" />
      <circle cx="40" cy="26" r="5" fill="#22C55E" />
      <circle cx="42" cy="25" r="1.5" fill="#1E293B" />
      <polygon points="45,26 53,24 45,29" fill="#EAB308" />
      <path d="M 22 36 Q 16 45, 12 42" fill="none" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function TrafficIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="10" width="24" height="40" fill="#334155" rx="4" stroke="#1E293B" strokeWidth="2" />
      <circle cx="30" cy="20" r="5" fill="#EF4444" />
      <circle cx="30" cy="30" r="5" fill="#EAB308" />
      <circle cx="30" cy="40" r="5" fill="#22C55E" />
    </svg>
  );
}

function EarIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M 32 10 C 20 10, 15 22, 18 35 C 20 42, 28 50, 32 50 C 38 50, 42 42, 40 32 C 38 22, 35 15, 32 10 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      <path d="M 28 20 C 24 22, 23 32, 28 38" fill="none" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TreeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="35" width="8" height="18" fill="#78350F" />
      <circle cx="30" cy="25" r="16" fill="#16A34A" />
      <circle cx="22" cy="22" r="10" fill="#22C55E" />
      <circle cx="38" cy="22" r="10" fill="#22C55E" />
    </svg>
  );
}

function DrumIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="20" rx="18" ry="8" fill="#CBD5E1" stroke="#475569" strokeWidth="2" />
      <path d="M 12 20 L 12 40 C 12 45, 48 45, 48 40 L 48 20" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="30" cy="40" rx="18" ry="8" fill="#93C5FD" stroke="#475569" strokeWidth="2" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'bird': return <BirdIcon size={size} />;
    case 'musical': return <MusicalNoteIcon size={size} />;
    case 'traffic': return <TrafficIcon size={size} />;
    case 'drum': return <DrumIcon size={size} />;
    case 'bell': return <BellIcon size={size} />;
    case 'siren': return <SirenIcon size={size} />;
    case 'clock': return <BellIcon size={size} />;
    case 'ear': return <EarIcon size={size} />;
    case 'headphone': return <HeadphoneIcon size={size} />;
    case 'tree': return <TreeIcon size={size} />;
    default: return <SoundWaveIcon size={size} />;
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
      width={110}
      height={95}
    >
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white cursor-grab active:cursor-grabbing p-2" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-800 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface SoundNoiseGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SoundNoiseGame({ width = 720, height = 560, onComplete }: SoundNoiseGameProps) {
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
        newPos[item.id] = { x: 35 + idx * 140, y: height - 150 };
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
      const compMsg = "Wonderful! You are a brilliant sound expert!";
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

    // Hit test bins in upper area
    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, bIdx) => {
      const binX = 50 + bIdx * 190;
      const binY = 130;
      if (x >= binX && x <= binX + 170 && y >= binY && y <= binY + 130) {
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
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 text-white flex flex-col items-center justify-between font-sans"
      style={{ width, height }}
    >
      <StudioScene width={width} height={height} />
      <MusicianMaya mood={mascotMood} speaking={speakingText} />

      {/* Header bar */}
      <div className="absolute top-3 left-4 right-20 z-20 flex items-center justify-between bg-slate-800/80 backdrop-blur px-4 py-2 rounded-2xl border border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-amber-400">Sound & Noise Lab</span>
          {screen === 'play' && (
            <span className="text-xs bg-gold-600/80 px-2 py-1 rounded-lg font-semibold">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-300">Score:</span>
            <span className="text-sm font-extrabold text-amber-300">{score}</span>
          </div>
          <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />
        </div>
      </div>

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full max-w-xl px-6 pt-16 pb-6">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            className={`w-full p-6 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-xl border border-white/20 flex flex-col items-center text-center`}
          >
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-xl font-extrabold text-white mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-sm font-medium text-white/90 leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>
            <div className="flex items-center justify-between w-full">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-4 py-2 rounded-xl bg-black/20 text-white font-bold text-xs disabled:opacity-30 hover:bg-black/30 transition"
              >
                Previous
              </button>
              <div className="flex gap-1.5">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`h-2 rounded-full transition-all ${i === slideIdx ? 'w-6 bg-white' : 'w-2 bg-white/40'}`} />
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
                className="px-5 py-2 rounded-xl bg-white text-slate-900 font-extrabold text-xs shadow hover:bg-amber-100 transition"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Play! 🚀" : "Next"}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="relative z-10 flex flex-col items-center justify-between flex-1 w-full max-w-2xl px-4 pt-16 pb-6">
          {/* Question Box */}
          <div className="w-full bg-slate-800/90 backdrop-blur border border-slate-700 rounded-2xl p-4 shadow-lg text-center mt-2">
            <h3 className="text-sm font-bold text-amber-300 mb-1">Question {challengeIdx + 1}</h3>
            <p className="text-sm font-semibold text-white">{currentChallenge.question}</p>
          </div>

          {/* Challenge Content: Identify (Multiple Choice) vs Sort */}
          {currentChallenge.type === 'identify' && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-md my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrectAns = opt === currentChallenge.answer;
                let btnStyle = "bg-slate-800/90 hover:bg-slate-700 border-slate-600 text-white";
                if (selectedOpt) {
                  if (isCorrectAns) btnStyle = "bg-emerald-600 border-emerald-400 text-white";
                  else if (isSelected) btnStyle = "bg-rose-600 border-rose-400 text-white opacity-80";
                  else btnStyle = "bg-slate-800/50 border-slate-700 text-slate-400";
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={(e) => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`p-3 rounded-2xl border-2 font-bold text-xs shadow transition flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectAns && <span className="text-white text-base">✅</span>}
                    {selectedOpt && isSelected && !isCorrectAns && <span className="text-white text-base">❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {currentChallenge.type === 'sort' && currentChallenge.bins && (
            <div className="relative w-full flex-1 my-3">
              {/* Drop Bins */}
              <div className="flex justify-around w-full mb-4">
                {currentChallenge.bins.map((bin) => (
                  <div
                    key={bin.id}
                    style={{ borderColor: bin.color }}
                    className="w-40 h-28 rounded-2xl border-4 border-dashed bg-slate-800/70 backdrop-blur flex flex-col items-center justify-center p-2 shadow-inner"
                  >
                    <span className="text-xs font-extrabold text-center" style={{ color: bin.color }}>
                      {bin.label}
                    </span>
                    <span className="text-[10px] text-slate-400 mt-1">Drop here</span>
                  </div>
                ))}
              </div>

              {/* Draggable Sort Cards */}
              <div className="absolute inset-x-0 bottom-2 flex justify-center gap-4">
                {currentChallenge.sortItems?.map((item) => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 0}
                    y={itemPositions[item.id]?.y || 0}
                    placed={placedItems[item.id] || false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Bottom Controls / Next button */}
          <div className="w-full flex items-center justify-between mt-3">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs border border-amber-500/40 transition flex items-center gap-1.5"
            >
              💡 Need Hint?
            </button>

            {((currentChallenge.type === 'identify' && selectedOpt) ||
              (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold text-xs shadow-lg flex items-center gap-2 transition"
              >
                {challengeIdx < CHALLENGES.length - 1 ? "Next Challenge ➡️" : "Complete Mission! 🏆"}
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Feedback & Overlays */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
