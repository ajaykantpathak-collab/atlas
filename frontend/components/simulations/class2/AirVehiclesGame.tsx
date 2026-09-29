'use client';

/**
 * AirVehiclesGame — Learn about air, vehicle fuels, and noise pollution
 *
 * CISCE Nodes: c2_phy_001 (Revision of air), c2_phy_002 (Properties of air),
 *              c2_phy_003 (Vehicles run on petrol, diesel, CNG, electricity),
 *              c2_phy_004 (Noise from vehicles and loud sounds),
 *              c2_phy_005 (Ways to reduce noise pollution)
 *
 * Mascot: Mechanic Manoj — friendly mechanic with blue overalls, wrench,
 * oil stain on cheek, and cap with car logo. Custom SVG.
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (5 slides) ──────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Air is All Around Us! 💨',
    text: 'Air is invisible — we cannot see it, but it is everywhere! We feel it when the wind blows or when we wave a fan. We breathe air to live!',
    emoji: '🌬️',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Air is invisible, but it is everywhere! We feel it when the wind blows or when we wave a fan.',
  },
  {
    title: 'Properties of Air! 🎈',
    text: 'Air has no colour and no smell. It occupies space! When you blow air into a balloon, it fills up and gets bigger. Air also has weight.',
    emoji: '🎈',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Air has no colour and occupies space! When you blow into a balloon, it gets bigger.',
  },
  {
    title: 'What Powers Vehicles? 🚗⚡',
    text: 'Vehicles need energy to move! Cars run on petrol or electricity. Buses and trucks run on diesel. Auto rickshaws run on CNG. Electric cars use batteries and have no exhaust smoke!',
    emoji: '⛽',
    bgColor: 'from-gold-450 to-purple-500',
    spoken: 'Vehicles need energy to move! Cars use petrol, buses use diesel, autos use CNG, and electric cars use batteries!',
  },
  {
    title: 'Noise from Vehicles & Sounds! 🔊',
    text: 'Engines and honking horns make loud sounds. Firecrackers, construction drills, and loud music also make noise. Too much loud sound is called noise pollution!',
    emoji: '📢',
    bgColor: 'from-amber-500 to-orange-600',
    spoken: 'Engines and honking horns make loud sounds. Too much loud sound is called noise pollution!',
  },
  {
    title: 'Reducing Noise Pollution! 🌳',
    text: 'We can reduce noise! Do not honk unnecessarily. Keep TV and music volume low. Do not burst loud firecrackers. Plant trees because they absorb sound!',
    emoji: '🌳',
    bgColor: 'from-emerald-500 to-teal-600',
    spoken: 'We can reduce noise by not honking unnecessarily, keeping volume low, and planting trees!',
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

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Air is which type of substance?',
    answer: 'An invisible gas we can feel',
    options: ['An invisible gas we can feel', 'A liquid we can see', 'A solid we can touch'],
    hint: 'Think: can you see air in the room? No, but you feel it when the wind blows!',
    misconception: 'Air is an invisible gas! Just because you cannot see it with your eyes does not mean it is not there — you feel it as wind and breathe it every second!',
  },
  {
    type: 'identify',
    question: 'What happens when you blow air into an empty balloon?',
    answer: 'It fills up and gets bigger',
    options: ['It fills up and gets bigger', 'It stays the exact same size', 'It becomes smaller'],
    hint: 'Think about what air does inside the balloon. Air occupies space!',
    misconception: 'The balloon gets bigger because air occupies space! Air is a real substance that takes up room inside the rubber walls.',
  },
  {
    type: 'identify',
    question: 'What fuel do most family cars run on?',
    answer: 'Petrol',
    options: ['Petrol', 'Water', 'Air'],
    hint: 'Cars go to the petrol pump to fill up their tanks!',
    misconception: 'Cars run on petrol (or sometimes diesel or electricity)! They do not run on water or plain air. Petrol burns in the engine to give energy.',
  },
  {
    type: 'sort',
    question: 'Drag each vehicle to the fuel or energy source it uses!',
    answer: 'sort',
    options: [],
    hint: 'Cars use petrol! Buses use diesel! Autos use CNG! Electric cars use electricity!',
    misconception: 'Different vehicles need different fuels! Heavy trucks need diesel for pulling power, cars use petrol, auto rickshaws use clean CNG, and electric cars use battery power.',
    sortItems: [
      { id: 'car', label: 'Family Car', icon: 'car', correctBin: 'petrol' },
      { id: 'bus', label: 'School Bus', icon: 'bus', correctBin: 'diesel' },
      { id: 'auto', label: 'Auto Rickshaw', icon: 'auto', correctBin: 'cng' },
      { id: 'ev', label: 'Electric Car', icon: 'electric', correctBin: 'electricity' },
    ],
    bins: [
      { id: 'petrol', label: 'Petrol ⛽', color: '#EF4444' },
      { id: 'diesel', label: 'Diesel 🛢️', color: '#F59E0B' },
      { id: 'cng', label: 'CNG 🔵', color: '#3B82F6' },
      { id: 'electricity', label: 'Electricity ⚡', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which vehicle does NOT make air pollution from an exhaust pipe?',
    answer: 'Electric car',
    options: ['Electric car', 'Diesel truck', 'Petrol car'],
    hint: 'Electric vehicles run on batteries stored with electricity. They have no tailpipe!',
    misconception: 'Electric cars produce zero exhaust smoke! Petrol and diesel vehicles burn fuel in an engine and release smoke into the air.',
  },
  {
    type: 'identify',
    question: 'What is NOISE POLLUTION?',
    answer: 'Too much loud sound that hurts our ears',
    options: ['Too much loud sound that hurts our ears', 'A pleasant song of a bird', 'Soft whispering in the library'],
    hint: 'Think: is soft bird song pollution? No, noise pollution is harsh, loud sound!',
    misconception: 'Noise pollution is caused by harsh, loud sounds that hurt our ears, give us headaches, and disturb sleep. Soft bird songs and whispers are peaceful!',
  },
  {
    type: 'sort',
    question: 'Drag each sound source to Loud Noise or Quiet Sound!',
    answer: 'sort',
    options: [],
    hint: 'Firecrackers and honking horns are loud! Soft music and birds are quiet!',
    misconception: 'Firecrackers and continuous honking make harsh, loud noise that disturbs people. Birds chirping and soft music are pleasant and quiet.',
    sortItems: [
      { id: 'cracker', label: 'Firecracker', icon: 'cracker', correctBin: 'loud' },
      { id: 'horn', label: 'Honking Horn', icon: 'horn', correctBin: 'loud' },
      { id: 'bird', label: 'Bird Chirping', icon: 'bird', correctBin: 'quiet' },
      { id: 'music', label: 'Soft Music', icon: 'music', correctBin: 'quiet' },
    ],
    bins: [
      { id: 'loud', label: 'Loud Noise 📢', color: '#EF4444' },
      { id: 'quiet', label: 'Quiet Sound 🌿', color: '#10B981' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each action! Does it reduce noise or cause noise?',
    answer: 'sort',
    options: [],
    hint: 'Planting trees and low volume reduce noise! Bursting crackers and continuous honking cause noise!',
    misconception: 'Good habits reduce noise pollution (planting trees which absorb sound, keeping TV volume low). Bad habits cause noise pollution (bursting loud crackers, continuous honking).',
    sortItems: [
      { id: 'tree', label: 'Plant Trees', icon: 'tree', correctBin: 'reduce' },
      { id: 'low-vol', label: 'Keep TV Volume Low', icon: 'tv-low', correctBin: 'reduce' },
      { id: 'burst-cr', label: 'Burst Loud Crackers', icon: 'cracker', correctBin: 'cause' },
      { id: 'honk-lot', label: 'Honk Continuously', icon: 'horn-bad', correctBin: 'cause' },
    ],
    bins: [
      { id: 'reduce', label: 'Reduce Noise ✅', color: '#10B981' },
      { id: 'cause', label: 'Cause Noise ⚠️', color: '#EF4444' },
    ],
  },
];

// ─── Custom SVG Icons for Interactive Objects ─────────────────

function AirIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 20 Q25 10, 40 20 T50 35" stroke="#38BDF8" strokeWidth="3" fill="none" strokeLinecap="round" />
      <path d="M15 35 Q30 25, 45 35" stroke="#0284C7" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M20 45 Q35 35, 50 45" stroke="#7DD3FC" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="12" cy="28" r="2" fill="#38BDF8" />
      <circle cx="48" cy="25" r="3" fill="#0284C7" />
    </svg>
  );
}

function BalloonIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="24" rx="14" ry="17" fill="#EF4444" />
      <path d="M30 41 L30 45" stroke="#991B1B" strokeWidth="2" />
      <polygon points="27,45 33,45 30,49" fill="#B91C1C" />
      <path d="M30 49 Q33 55, 27 58" stroke="#6B7280" strokeWidth="1.5" fill="none" />
      <ellipse cx="25" cy="18" rx="3" ry="5" fill="white" opacity="0.6" />
    </svg>
  );
}

function CarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="25" width="40" height="15" fill="#3B82F6" rx="4" />
      <path d="M18 25 L24 15 L36 15 L42 25 Z" fill="#60A5FA" />
      <circle cx="20" cy="40" r="6" fill="#1F2937" />
      <circle cx="20" cy="40" r="2" fill="#9CA3AF" />
      <circle cx="40" cy="40" r="6" fill="#1F2937" />
      <circle cx="40" cy="40" r="2" fill="#9CA3AF" />
    </svg>
  );
}

function BusIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="8" y="16" width="44" height="24" fill="#F59E0B" rx="3" />
      <rect x="12" y="20" width="8" height="8" fill="#E0F2FE" rx="1" />
      <rect x="24" y="20" width="8" height="8" fill="#E0F2FE" rx="1" />
      <rect x="36" y="20" width="8" height="8" fill="#E0F2FE" rx="1" />
      <circle cx="16" cy="42" r="5" fill="#1F2937" />
      <circle cx="44" cy="42" r="5" fill="#1F2937" />
    </svg>
  );
}

function AutoIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 25 L35 18 L45 35 L15 35 Z" fill="#10B981" />
      <rect x="30" y="20" width="12" height="15" fill="#6EE7B7" rx="2" />
      <circle cx="20" cy="40" r="5" fill="#1F2937" />
      <circle cx="42" cy="40" r="5" fill="#1F2937" />
    </svg>
  );
}

function ElectricCarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="25" width="40" height="15" fill="#8B5CF6" rx="4" />
      <path d="M18 25 L24 15 L36 15 L42 25 Z" fill="#C4B5FD" />
      <polygon points="30,18 26,26 32,26 28,34" fill="#FACC15" />
      <circle cx="20" cy="40" r="6" fill="#1F2937" />
      <circle cx="40" cy="40" r="6" fill="#1F2937" />
    </svg>
  );
}

function CrackerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="22" width="8" height="22" fill="#EF4444" rx="2" />
      <line x1="30" y1="22" x2="30" y2="12" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="2,2" />
      <circle cx="30" cy="10" r="3" fill="#F59E0B" />
      <path d="M20 15 L24 18 M40 15 L36 18 M18 30 L22 30 M38 30 L42 30" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HornIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 25 L35 15 L35 35 L15 25 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <path d="M35 15 Q45 20, 45 25 Q45 30, 35 35" fill="none" stroke="#D97706" strokeWidth="3" />
      <rect x="10" y="22" width="6" height="8" fill="#4B5563" rx="1" />
      <path d="M46 20 Q52 25, 46 30" stroke="#EF4444" strokeWidth="2" fill="none" />
    </svg>
  );
}

function BirdIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="10" ry="8" fill="#38BDF8" />
      <circle cx="38" cy="26" r="6" fill="#38BDF8" />
      <circle cx="40" cy="25" r="1.5" fill="#1F2937" />
      <polygon points="44,26 49,27 44,29" fill="#F59E0B" />
      <path d="M22 36 L15 44 M25 38 L20 45" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      <path d="M25 28 Q20 20, 15 25" fill="none" stroke="#0284C7" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MusicIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="40" r="6" fill="#8B5CF6" />
      <circle cx="40" cy="35" r="6" fill="#8B5CF6" />
      <line x1="26" y1="40" x2="26" y2="15" stroke="#8B5CF6" strokeWidth="3" />
      <line x1="46" y1="35" x2="46" y2="12" stroke="#8B5CF6" strokeWidth="3" />
      <path d="M26 15 L46 12 L46 18 L26 21 Z" fill="#8B5CF6" />
    </svg>
  );
}

function TreeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="27" y="38" width="6" height="14" fill="#92400E" rx="1" />
      <circle cx="30" cy="26" r="14" fill="#10B981" />
      <circle cx="22" cy="30" r="10" fill="#059669" />
      <circle cx="38" cy="30" r="10" fill="#059669" />
    </svg>
  );
}

function TvLowIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="16" width="36" height="24" fill="#4B5563" rx="3" />
      <rect x="16" y="20" width="28" height="16" fill="#93C5FD" rx="1" />
      <polygon points="26,24 34,28 26,32" fill="#1F2937" />
      <rect x="24" y="40" width="12" height="4" fill="#374151" rx="1" />
    </svg>
  );
}

function HornBadIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 28 L30 18 L30 38 L12 28 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
      <path d="M30 18 Q40 23, 40 28 Q40 33, 30 38" fill="none" stroke="#DC2626" strokeWidth="3" />
      <text x="35" y="15" fill="#EF4444" fontSize="16" fontWeight="bold">!</text>
      <text x="45" y="30" fill="#EF4444" fontSize="16" fontWeight="bold">!!</text>
    </svg>
  );
}

// Helper to render sort card icon by ID or icon string
function renderSortCardIcon(iconStr: string, size: number = 48) {
  if (iconStr === 'car') return <CarIcon size={size} />;
  if (iconStr === 'bus') return <BusIcon size={size} />;
  if (iconStr === 'auto') return <AutoIcon size={size} />;
  if (iconStr === 'electric') return <ElectricCarIcon size={size} />;
  if (iconStr === 'cracker') return <CrackerIcon size={size} />;
  if (iconStr === 'horn') return <HornIcon size={size} />;
  if (iconStr === 'bird') return <BirdIcon size={size} />;
  if (iconStr === 'music') return <MusicIcon size={size} />;
  if (iconStr === 'tree') return <TreeIcon size={size} />;
  if (iconStr === 'tv-low') return <TvLowIcon size={size} />;
  if (iconStr === 'horn-bad') return <HornBadIcon size={size} />;
  return <AirIcon size={size} />;
}

// ─── Mechanic Manoj Mascot ────────────────────────────────────

function MechanicManoj({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-400"
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
        <svg width="75" height="85" viewBox="0 0 75 85">
          {/* Cap */}
          <path d="M25 18 L50 18 Q55 18, 55 23 L58 25 L20 25 Z" fill="#2563EB" />
          <ellipse cx="45" cy="24" rx="14" ry="4" fill="#1D4ED8" />
          {/* Face */}
          <circle cx="37.5" cy="38" r="14" fill="#FDE68A" />
          {/* Oil stain on cheek */}
          <ellipse cx="28" cy="42" rx="3" ry="2" fill="#374151" opacity="0.7" />
          {/* Eyes */}
          <circle cx="32" cy="36" r="2" fill="#1F2937" />
          <circle cx="43" cy="36" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M33 44 Q37.5 48 42 44" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Overalls / Body */}
          <path d="M22 52 L53 52 L56 78 L19 78 Z" fill="#3B82F6" />
          <path d="M30 52 L30 65 L45 65 L45 52 Z" fill="white" />
          {/* Wrench in pocket / hand */}
          <rect x="52" y="55" width="4" height="15" fill="#9CA3AF" rx="1" transform="rotate(25 52 55)" />
          <circle cx="56" cy="68" r="4" fill="#6B7280" />
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

// ─── Garage Scene Background ──────────────────────────────────

function GarageScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky / Garage Wall Gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="garage-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="40%" stopColor="#334155" />
            <stop offset="70%" stopColor="#475569" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#garage-sky)" />
      </svg>
      {/* Garage Roof Beams */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-slate-900 border-b-4 border-slate-700 flex justify-around items-center px-4 opacity-50">
        <div className="w-16 h-4 bg-slate-800 rounded" />
        <div className="w-24 h-4 bg-slate-800 rounded" />
        <div className="w-16 h-4 bg-slate-800 rounded" />
      </div>
      {/* Charging Station & Fuel Pump silhouette in background */}
      <div className="absolute bottom-16 left-8 opacity-25">
        <svg width="60" height="90" viewBox="0 0 60 90">
          <rect x="10" y="20" width="40" height="70" fill="#38BDF8" rx="4" />
          <rect x="18" y="30" width="24" height="20" fill="#0F172A" rx="2" />
          <circle cx="30" cy="65" r="8" fill="#10B981" />
        </svg>
      </div>
      <div className="absolute bottom-16 right-8 opacity-25">
        <svg width="60" height="90" viewBox="0 0 60 90">
          <rect x="10" y="20" width="40" height="70" fill="#EF4444" rx="4" />
          <rect x="18" y="30" width="24" height="20" fill="#0F172A" rx="2" />
          <circle cx="30" cy="65" r="8" fill="#F59E0B" />
        </svg>
      </div>
      {/* Workshop Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-16" style={{ background: 'linear-gradient(180deg, #334155 0%, #0F172A 100%)' }} />
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface AirVehiclesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AirVehiclesGame({ width = 720, height = 560, onComplete }: AirVehiclesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [mistakes, setMistakes] = useState(0);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Mechanic Manoj. Let us learn about air and vehicles!');

  // Sort challenge placed state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      const currentChallenge = CHALLENGES[challengeIdx];
      if (currentChallenge) {
        setHintMsg(currentChallenge.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setMascotSpeech('Need a hint? Check this out!');
        speechManager.speak('Need a hint? Check this out!');
      }
    }, 10000);
  }, [challengeIdx]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Reset sort items when challenge changes
  useEffect(() => {
    setPlacedItems({});
  }, [challengeIdx]);

  const handleNextSlide = () => {
    audioManager.play('tap');
    if (slideIdx < TEACHING_SLIDES.length - 1) {
      setSlideIdx(slideIdx + 1);
    } else {
      audioManager.play('success');
      setScreen('play');
      setMascotSpeech('Great! Now let us start our exciting challenges!');
      speechManager.speak('Great! Now let us start our exciting challenges!');
    }
  };

  const handlePrevSlide = () => {
    audioManager.play('tap');
    if (slideIdx > 0) {
      setSlideIdx(slideIdx - 1);
    }
  };

  const handleAnswerSelect = (option: string) => {
    resetInactivityTimer();
    const currentChallenge = CHALLENGES[challengeIdx];
    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setSparklePos({ x: width / 2, y: height / 2 });
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');
      setScore(prev => prev + 15);
      setStars(prev => Math.min(prev + 1, 24));

      setTimeout(() => {
        setSparklePos(null);
        if (challengeIdx < CHALLENGES.length - 1) {
          setChallengeIdx(prev => prev + 1);
          setMascotMood('happy');
          setMascotSpeech('Ready for the next challenge? Let us go!');
          speechManager.speak('Ready for the next challenge? Let us go!');
        } else {
          // Game complete
          setShowConfetti(true);
          audioManager.play('celebration');
          setSuccessMsg('You are a Master Air & Vehicle Explorer! 🏆');
          const finalScore = Math.max(0, 100 - mistakes * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1200);
    } else {
      // Wrong
      audioManager.play('error');
      setMistakes(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Sort challenge handlers
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, dropX: number, dropY: number): boolean => {
    resetInactivityTimer();
    const challenge = CHALLENGES[challengeIdx];
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bins positions (approximate hit test based on dropX/dropY or bins layout)
    // For simplicity in Class 2 games, if dropped in upper/lower or left/right bin area
    // Let's check which bin the item is closest to or match by drop position.
    // Bins are rendered at the bottom or middle. Let's check dropX relative to screen width.
    const binWidth = width / challenge.bins.length;
    const targetBinIdx = Math.floor(dropX / binWidth);
    const targetBin = challenge.bins[Math.max(0, Math.min(challenge.bins.length - 1, targetBinIdx))];

    if (targetBin && targetBin.id === item.correctBin) {
      audioManager.play('drop-correct');
      setPlacedItems(prev => ({ ...prev, [id]: true }));
      setScore(prev => prev + 10);
      setStars(prev => Math.min(prev + 1, 24));

      // Check if all sort items placed
      const remaining = challenge.sortItems?.filter(i => i.id !== id && !placedItems[i.id]);
      if (!remaining || remaining.length === 0) {
        audioManager.play('success');
        setSparklePos({ x: width / 2, y: height / 2 });
        setMascotMood('celebrate');
        setMascotSpeech('All sorted perfectly! Wonderful job!');
        speechManager.speak('All sorted perfectly! Wonderful job!');

        setTimeout(() => {
          setSparklePos(null);
          if (challengeIdx < CHALLENGES.length - 1) {
            setChallengeIdx(prev => prev + 1);
            setMascotMood('happy');
            setMascotSpeech('Ready for the next challenge? Let us go!');
            speechManager.speak('Ready for the next challenge? Let us go!');
          } else {
            setShowConfetti(true);
            audioManager.play('celebration');
            setSuccessMsg('You are a Master Air & Vehicle Explorer! 🏆');
            const finalScore = Math.max(0, 100 - mistakes * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 1200);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setMistakes(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMsg(challenge.misconception);
      return false;
    }
  };

  const currentChallenge = CHALLENGES[challengeIdx];

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl select-none font-sans" style={{ width, height, background: '#0F172A' }}>
      {/* Background Scene */}
      <GarageScene width={width} height={height} />

      {/* Mascot Manoj */}
      <MechanicManoj mood={mascotMood} speaking={mascotSpeech} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-10 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-gold-400">Air & Vehicles</span>
          {screen === 'play' && (
            <span className="text-xs bg-gold-500/30 text-gold-300 font-bold px-2.5 py-1 rounded-full border border-gold-400/30">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={stars} total={8} />}
          <div className="bg-slate-800 text-gold-300 font-bold px-3 py-1 rounded-lg border border-slate-700 text-sm">
            Score: {score}
          </div>
        </div>
      </div>

      {/* ─── SCREEN: TEACHING ─────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={slideIdx}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className={`w-full max-w-lg rounded-3xl p-8 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl flex flex-col items-center text-white border-4 border-white/20`}
            >
              <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
              <h2 className="text-2xl font-black mb-3 text-center drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-base font-medium text-center leading-relaxed drop-shadow bg-black/10 p-4 rounded-2xl">
                {TEACHING_SLIDES[slideIdx].text}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Dots & Buttons */}
          <div className="flex items-center justify-between w-full max-w-lg mt-6 px-4">
            <button
              onClick={handlePrevSlide}
              disabled={slideIdx === 0}
              className={`px-5 py-2.5 rounded-xl font-bold text-sm shadow transition ${
                slideIdx === 0 ? 'bg-slate-700/50 text-slate-500 cursor-not-allowed' : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              Back
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all duration-300 ${i === slideIdx ? 'w-8 bg-gold-400' : 'w-2.5 bg-slate-600'}`}
                />
              ))}
            </div>

            <button
              onClick={handleNextSlide}
              className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gradient-to-r from-gold-500 to-gold-600 text-white shadow-lg hover:from-gold-400 hover:to-gold-500 transition"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN: PLAY (Challenges) ────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-16 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <motion.div
            key={challengeIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xl bg-slate-900/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-2 border-slate-700 flex flex-col items-center"
          >
            <h3 className="text-lg font-bold text-white text-center mb-6 px-2">
              {currentChallenge.question}
            </h3>

            {/* Identify / Multiple Choice Challenge */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-slate-800 hover:bg-slate-700 border-2 border-slate-600 hover:border-gold-400 text-white font-bold text-sm shadow-md transition flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-xs text-gold-400 font-black">
                      {idx + 1}
                    </span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
              <div className="w-full flex flex-col items-center">
                {/* Bins container */}
                <div className="flex gap-4 mb-6 w-full justify-center">
                  {currentChallenge.bins.map(bin => (
                    <div
                      key={bin.id}
                      className="flex-1 max-w-[150px] h-28 rounded-2xl border-4 border-dashed border-slate-600 bg-slate-800/80 flex flex-col items-center justify-center p-2 shadow-inner"
                      style={{ borderColor: bin.color }}
                    >
                      <span className="text-xs font-black text-center text-white">{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable items */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {currentChallenge.sortItems.map(item => {
                    const placed = placedItems[item.id] || false;
                    return (
                      <Draggable
                        key={item.id}
                        id={item.id}
                        x={0}
                        y={0}
                        draggable={!placed}
                        placed={placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                        width={110}
                        height={95}
                      >
                        <div
                          className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-slate-600 ${
                            placed ? 'opacity-30 bg-slate-800' : 'bg-slate-800 hover:bg-slate-700'
                          }`}
                          style={{ width: 110, height: 95 }}
                        >
                          {renderSortCardIcon(item.icon, 44)}
                          <span className="text-[11px] font-bold text-slate-200 text-center mt-1">{item.label}</span>
                        </div>
                      </Draggable>
                    );
                  })}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* ─── Feedback Overlays ───────���────────────────────────── */}
      {showConfetti && (
        <Confetti
          onComplete={() => {
            setShowConfetti(false);
          }}
        />
      )}

      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={() => {
            setSuccessMsg(null);
          }}
        />
      )}

      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => {
            setHintMsg(null);
          }}
        />
      )}

      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => {
            setSparklePos(null);
          }}
        />
      )}
    </div>
  );
}
