'use client';

/**
 * SafetyCleanGame — Learn about safety, personal hygiene, surroundings cleanliness,
 * water & shelter, and care of plants & animals.
 *
 * CISCE Nodes: c2_evs_006 (Water and shelter), c2_evs_007 (Safety),
 *              c2_evs_008 (Personal hygiene), c2_evs_009 (Keeping surroundings clean),
 *              c2_evs_010 (Care of plants and animals)
 *
 * ELI5: "Nurse Nisha helps us stay safe on the road, keep our bodies clean,
 *   throw waste in dustbins, and care for our animal and plant friends!"
 *
 * Misconceptions:
 *   1. "Red signal means go fast" → "No! Red means STOP! Green means GO!"
 *   2. "We can cross the road anywhere" → "No! Always use a zebra crossing!"
 *   3. "We should put butter on burns" → "No! Put cool water on burns!"
 *   4. "We can eat without washing hands if they look clean" → "No! Germs are invisible!"
 *   5. "Plants don't need care" → "No! Plants need water, sunlight, and no weeds!"
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
    title: 'Meet Nurse Nisha & Safety! ⛑️',
    text: 'Safety means protecting ourselves! Always walk on the footpath, cross at the zebra crossing, and look left, right, left! Red means STOP, green means GO!',
    emoji: '🚦',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Safety means protecting ourselves! Always walk on the footpath, cross at the zebra crossing, and look left, right, left!',
  },
  {
    title: 'Fire Safety & First Aid 🔥🩹',
    text: 'Never play with matches or firecrackers! If clothes catch fire: Stop, Drop, and Roll! For small cuts, wash with clean water, apply antiseptic, and tell an adult!',
    emoji: '🔥',
    bgColor: 'from-rose-400 to-red-500',
    spoken: 'Never play with matches or firecrackers! If clothes catch fire: Stop, Drop, and Roll!',
  },
  {
    title: 'Personal Hygiene 🧼🪥',
    text: 'Brush your teeth twice daily! Wash hands with soap before eating and after using the toilet. Bathe daily, trim nails, and wear clean clothes to keep germs away!',
    emoji: '🧼',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Brush your teeth twice daily! Wash hands with soap before eating and after using the toilet.',
  },
  {
    title: 'Keep Surroundings Clean 🗑️🌿',
    text: 'Never litter! Throw garbage in a covered dustbin. Segregate wet waste (food peels) for compost and dry waste (paper, plastic) for recycling!',
    emoji: '🗑️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Never litter! Throw garbage in a covered dustbin. Segregate wet waste and dry waste!',
  },
  {
    title: 'Care for Plants & Animals 🌱🐾',
    text: 'Water plants daily, give them sunlight, and remove weeds! Feed pets on time, give them clean water, and always handle animals gently with compassion!',
    emoji: '🌱',
    bgColor: 'from-green-400 to-emerald-600',
    spoken: 'Water plants daily, give them sunlight, and remove weeds! Feed pets on time and handle animals gently!',
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

// ─── Challenges (8 progressive: easy → hard) ──────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What should you do when you see a RED traffic signal?',
    answer: 'Stop and wait',
    options: ['Stop and wait', 'Go fast', 'Keep running'],
    hint: 'Think about the three traffic lights: Red means stop!',
    misconception: 'Red signal means STOP! Never try to rush through red. Red keeps pedestrians and cars safe from crashes!',
  },
  {
    type: 'identify',
    question: 'Where is the safest place to cross a busy road?',
    answer: 'At a zebra crossing',
    options: ['At a zebra crossing', 'Anywhere on the road', 'Between parked cars'],
    hint: 'Look for the black and white painted stripes on the road.',
    misconception: 'You cannot cross anywhere! Always use a zebra crossing or pedestrian bridge where drivers expect people to cross.',
  },
  {
    type: 'sort',
    question: 'Drag road safety rules to Follow vs Not Follow!',
    answer: 'sort',
    options: [],
    hint: 'Following rules means walking on the footpath and looking left-right-left!',
    misconception: 'Never play on the road or run after balls! Roads are for vehicles; pedestrians stay on the footpath.',
    sortItems: [
      { id: 'rule-footpath', label: 'Walk on footpath', icon: 'footpath', correctBin: 'follow' },
      { id: 'rule-zebra', label: 'Use zebra crossing', icon: 'zebra', correctBin: 'follow' },
      { id: 'rule-play', label: 'Play cricket on road', icon: 'ball', correctBin: 'not-follow' },
      { id: 'rule-run', label: 'Run between cars', icon: 'car', correctBin: 'not-follow' },
    ],
    bins: [
      { id: 'follow', label: 'Follow ✅', color: '#22C55E' },
      { id: 'not-follow', label: 'Do NOT Follow ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'What should you do if your clothes accidentally catch fire?',
    answer: 'Stop, drop and roll',
    options: ['Stop, drop and roll', 'Run as fast as you can', 'Hide under a blanket'],
    hint: 'Remember: do not run! Drop to the ground and roll to put out flames.',
    misconception: 'Never run if clothes catch fire! Running feeds oxygen to the flames and makes them grow bigger. Always stop, drop, and roll!',
  },
  {
    type: 'sort',
    question: 'Drag personal hygiene habits to Good vs Bad!',
    answer: 'sort',
    options: [],
    hint: 'Good hygiene keeps germs away: wash hands, brush twice daily, bathe!',
    misconception: 'Germs are invisible! Eating without washing hands or skipping brushing lets germs enter your body and make you sick.',
    sortItems: [
      { id: 'hygiene-brush', label: 'Brush twice daily', icon: 'toothbrush', correctBin: 'good' },
      { id: 'hygiene-wash', label: 'Wash hands with soap', icon: 'soap', correctBin: 'good' },
      { id: 'hygiene-skip', label: 'Skip bath for days', icon: 'dirt', correctBin: 'bad' },
      { id: 'hygiene-unwashed', label: 'Eat with dirty hands', icon: 'germs', correctBin: 'bad' },
    ],
    bins: [
      { id: 'good', label: 'Good Hygiene 🧼', color: '#22C55E' },
      { id: 'bad', label: 'Bad Habit 🦠', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Where should you throw fruit peels and waste paper?',
    answer: 'In a covered dustbin',
    options: ['In a covered dustbin', 'On the classroom floor', 'Out the window'],
    hint: 'Littering makes surroundings dirty and smelly. Always use a bin!',
    misconception: 'Never throw waste on the ground! Dropping litter attracts flies and mosquitoes that spread dangerous diseases.',
  },
  {
    type: 'sort',
    question: 'Drag waste items to Wet Waste vs Dry Waste!',
    answer: 'sort',
    options: [],
    hint: 'Wet waste rots and makes compost (peels, food). Dry waste can be recycled (paper, plastic)!',
    misconception: 'All waste is not the same! Segregating wet and dry waste is essential so wet waste turns into compost and dry waste gets recycled.',
    sortItems: [
      { id: 'waste-peel', label: 'Banana peel', icon: 'peel', correctBin: 'wet' },
      { id: 'waste-veg', label: 'Vegetable scraps', icon: 'veg', correctBin: 'wet' },
      { id: 'waste-paper', label: 'Old newspaper', icon: 'paper', correctBin: 'dry' },
      { id: 'waste-plastic', label: 'Plastic bottle', icon: 'bottle', correctBin: 'dry' },
    ],
    bins: [
      { id: 'wet', label: 'Wet Waste (Compost) 🌱', color: '#84CC16' },
      { id: 'dry', label: 'Dry Waste (Recycle) ♻️', color: '#0EA5E9' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag care actions to Plant Care vs Pet Care!',
    answer: 'sort',
    options: [],
    hint: 'Plants need water and sunlight. Pets need feeding on time and gentle handling!',
    misconception: 'Plants and animals are living beings! Plants need sunlight and water; pets need feeding, clean water, and gentle love without teasing.',
    sortItems: [
      { id: 'care-water', label: 'Water plant daily', icon: 'plant', correctBin: 'plant' },
      { id: 'care-weed', label: 'Remove garden weeds', icon: 'weed', correctBin: 'plant' },
      { id: 'care-feed', label: 'Feed pet dog on time', icon: 'dog', correctBin: 'pet' },
      { id: 'care-gentle', label: 'Handle pets gently', icon: 'heart', correctBin: 'pet' },
    ],
    bins: [
      { id: 'plant', label: 'Plant Care 🌿', color: '#10B981' },
      { id: 'pet', label: 'Pet Care 🐾', color: '#F97316' },
    ],
  },
];

// ─── Nurse Nisha Mascot ───────────────────────────────────────

function NurseNisha({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-25 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-red-200"
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
            <linearGradient id="nurse-uniform" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <radialGradient id="nurse-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </radialGradient>
          </defs>
          {/* Body / Uniform */}
          <path d="M22 55 L20 82 L55 82 L53 55 Z" fill="url(#nurse-uniform)" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Apron / Collar */}
          <path d="M28 55 L37 68 L47 55 Z" fill="white" stroke="#DBEAFE" strokeWidth="1" />
          {/* Red cross on apron */}
          <rect x="35" y="58" width="4" height="10" fill="#EF4444" rx="1" />
          <rect x="32" y="61" width="10" height="4" fill="#EF4444" rx="1" />
          {/* Head */}
          <circle cx="37" cy="36" r="18" fill="url(#nurse-face)" stroke="#D97706" strokeWidth="1" />
          {/* Nurse Cap */}
          <path d="M23 26 L51 26 L47 14 L27 14 Z" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
          <rect x="33" y="17" width="8" height="6" fill="#EF4444" rx="1" />
          <rect x="31" y="19" width="12" height="2" fill="#EF4444" />
          {/* Eyes */}
          <circle cx="30" cy="34" r="3" fill="#1E293B" />
          <circle cx="44" cy="34" r="3" fill="#1E293B" />
          <circle cx="31" cy="33" r="1" fill="white" />
          <circle cx="45" cy="33" r="1" fill="white" />
          {/* Smile */}
          <path d="M32 42 Q37 47 42 42" stroke="#92400E" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Rosy cheeks */}
          <circle cx="26" cy="39" r="3" fill="#F43F5E" opacity="0.4" />
          <circle cx="48" cy="39" r="3" fill="#F43F5E" opacity="0.4" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Neighbourhood Scene Background ───────────────────────────

function NeighbourhoodScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF08A 70%, #86EFAC 100%)' }} />
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FACC15" opacity="0.9" />
          <circle cx="30" cy="30" r="12" fill="#EAB308" />
        </svg>
      </motion.div>
      {/* Road at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28 bg-slate-700">
        {/* Zebra crossing stripes */}
        <div className="absolute top-0 left-1/3 right-1/3 h-full flex justify-around items-center px-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="w-6 h-full bg-white opacity-90" />
          ))}
        </div>
      </div>
      {/* Traffic light pole graphic in background */}
      <div className="absolute bottom-20 left-12 opacity-80">
        <svg width="20" height="70" viewBox="0 0 20 70">
          <rect x="8" y="20" width="4" height="50" fill="#475569" />
          <rect x="3" y="2" width="14" height="26" fill="#1E293B" rx="3" />
          <circle cx="10" cy="8" r="3" fill="#EF4444" />
          <circle cx="10" cy="15" r="3" fill="#FACC15" />
          <circle cx="10" cy="22" r="3" fill="#22C55E" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Component Icons ───────────────────────────────

function ZebraCrossingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#334155" rx="4" />
      <rect x="12" y="15" width="6" height="30" fill="white" />
      <rect x="22" y="15" width="6" height="30" fill="white" />
      <rect x="32" y="15" width="6" height="30" fill="white" />
      <rect x="42" y="15" width="6" height="30" fill="white" />
    </svg>
  );
}

function TrafficLightIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="5" width="20" height="50" fill="#1E293B" rx="4" stroke="#475569" strokeWidth="2" />
      <circle cx="30" cy="15" r="6" fill="#EF4444" />
      <circle cx="30" cy="30" r="6" fill="#FACC15" />
      <circle cx="30" cy="45" r="6" fill="#22C55E" />
    </svg>
  );
}

function FireExtinguisherIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="18" width="20" height="32" fill="#DC2626" rx="6" />
      <path d="M26 18 L26 12 L34 12 L34 18 Z" fill="#94A3B8" />
      <path d="M34 14 Q44 10, 42 22" stroke="#334155" strokeWidth="3" fill="none" strokeLinecap="round" />
      <rect x="24" y="26" width="12" height="8" fill="white" rx="1" />
      <text x="30" y="33" fontSize="8" fill="#DC2626" textAnchor="middle" fontWeight="bold">FIRE</text>
    </svg>
  );
}

function FirstAidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="18" width="36" height="30" fill="#F8FAFC" rx="4" stroke="#CBD5E1" strokeWidth="2" />
      <path d="M24 18 L24 14 Q24 12, 28 12 L32 12 Q36 12, 36 14 L36 18 Z" fill="#64748B" />
      <rect x="27" y="27" width="6" height="14" fill="#EF4444" rx="1" />
      <rect x="23" y="31" width="14" height="6" fill="#EF4444" rx="1" />
    </svg>
  );
}

function SoapIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="24" fill="#93C5FD" rx="10" stroke="#3B82F6" strokeWidth="2" />
      <ellipse cx="22" cy="28" rx="6" ry="3" fill="white" opacity="0.6" />
      <circle cx="42" cy="34" r="3" fill="white" opacity="0.7" />
    </svg>
  );
}

function ToothbrushIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 45 L42 15 L47 20 L17 50 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" rx="2" />
      <rect x="40" y="10" width="12" height="8" fill="#F43F5E" rx="2" />
      <rect x="43" y="7" width="6" height="4" fill="white" />
    </svg>
  );
}

function DustbinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="16" y="20" width="28" height="32" fill="#22C55E" rx="4" />
      <rect x="13" y="14" width="34" height="6" fill="#15803D" rx="2" />
      <rect x="25" y="8" width="10" height="6" fill="#15803D" rx="2" />
      <line x1="23" y1="26" x2="23" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="30" y1="26" x2="30" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
      <line x1="37" y1="26" x2="37" y2="46" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function PlantSaplingIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 45 L40 45 L36 32 L24 32 Z" fill="#B45309" />
      <path d="M30 32 Q30 18, 15 15 Q25 25, 30 32 Z" fill="#22C55E" />
      <path d="M30 32 Q30 18, 45 15 Q35 25, 30 32 Z" fill="#16A34A" />
      <path d="M30 45 L30 32" stroke="#15803D" strokeWidth="3" />
    </svg>
  );
}

function PetDogIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="35" rx="14" ry="10" fill="#D97706" />
      <circle cx="20" cy="30" r="8" fill="#D97706" />
      <path d="M14 24 L16 18 L20 23 Z" fill="#B45309" />
      <circle cx="17" cy="28" r="1.5" fill="black" />
      <path d="M38 42 L36 50 L40 50 Z" fill="#B45309" />
      <path d="M24 42 L22 50 L26 50 Z" fill="#B45309" />
      <path d="M44 32 Q50 30, 48 38" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function RedSignalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="#EF4444" stroke="#B91C1C" strokeWidth="3" />
      <text x="30" y="35" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">STOP</text>
    </svg>
  );
}

function GreenSignalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="20" fill="#22C55E" stroke="#15803D" strokeWidth="3" />
      <text x="30" y="35" fontSize="12" fill="white" textAnchor="middle" fontWeight="bold">GO</text>
    </svg>
  );
}

// Additional icons for sort challenge items
function FootpathIcon({ size = 48 }: { size?: number }) { return <ZebraCrossingIcon size={size} />; }
function BallIcon({ size = 48 }: { size?: number }) { return <PetDogIcon size={size} />; }
function CarIcon({ size = 48 }: { size?: number }) { return <TrafficLightIcon size={size} />; }
function DirtIcon({ size = 48 }: { size?: number }) { return <SoapIcon size={size} />; }
function GermsIcon({ size = 48 }: { size?: number }) { return <SoapIcon size={size} />; }
function PeelIcon({ size = 48 }: { size?: number }) { return <PlantSaplingIcon size={size} />; }
function VegIcon({ size = 48 }: { size?: number }) { return <PlantSaplingIcon size={size} />; }
function PaperIcon({ size = 48 }: { size?: number }) { return <DustbinIcon size={size} />; }
function BottleIcon({ size = 48 }: { size?: number }) { return <DustbinIcon size={size} />; }
function WeedIcon({ size = 48 }: { size?: number }) { return <PlantSaplingIcon size={size} />; }
function HeartIcon({ size = 48 }: { size?: number }) { return <PetDogIcon size={size} />; }

function renderSortIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'footpath': return <FootpathIcon size={size} />;
    case 'zebra': return <ZebraCrossingIcon size={size} />;
    case 'ball': return <BallIcon size={size} />;
    case 'car': return <CarIcon size={size} />;
    case 'toothbrush': return <ToothbrushIcon size={size} />;
    case 'soap': return <SoapIcon size={size} />;
    case 'dirt': return <DirtIcon size={size} />;
    case 'germs': return <GermsIcon size={size} />;
    case 'peel': return <PeelIcon size={size} />;
    case 'veg': return <VegIcon size={size} />;
    case 'paper': return <PaperIcon size={size} />;
    case 'bottle': return <BottleIcon size={size} />;
    case 'plant': return <PlantSaplingIcon size={size} />;
    case 'weed': return <WeedIcon size={size} />;
    case 'dog': return <PetDogIcon size={size} />;
    case 'heart': return <HeartIcon size={size} />;
    default: return <FirstAidIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 shadow-inner transition-all duration-200 ${isHovering ? 'scale-105 shadow-2xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-sm font-black text-gray-800 text-center">{label}</span>
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
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-blue-50 to-indigo-100 z-30">
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${slide.bgColor} text-white flex flex-col items-center text-center relative overflow-hidden`}
      >
        <span className="text-6xl mb-4">{slide.emoji}</span>
        <h2 className="text-2xl font-black mb-3">{slide.title}</h2>
        <p className="text-lg font-medium leading-relaxed mb-6 opacity-95">{slide.text}</p>

        <div className="flex gap-2 mb-6">
          {TEACHING_SLIDES.map((_, idx) => (
            <div key={idx} className={`h-2.5 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
          ))}
        </div>

        <div className="flex gap-4 w-full justify-between">
          {currentSlide > 0 ? (
            <button onClick={handlePrev} className="px-6 py-3 rounded-2xl bg-white/20 hover:bg-white/30 font-bold transition-all">
              Back
            </button>
          ) : <div />}
          <button onClick={handleNext} className="px-8 py-3 rounded-2xl bg-white text-indigo-700 font-black shadow-lg hover:bg-indigo-50 transition-all">
            {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Component: SafetyCleanGame ──────────────────────────

export interface SafetyCleanGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SafetyCleanGame({ width = 720, height = 560, onComplete }: SafetyCleanGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [score, setScore] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);

  // Feedback states
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [mascotSpeaking, setMascotSpeaking] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');

  // Sort challenge state
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const challenge = CHALLENGES[currentChallenge];

  // Inactivity timer for auto-hint
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && !showSuccess) {
        setHintMessage(challenge.hint);
        setMascotMood('thinking');
        setMascotSpeaking("Need a little help? Let's check the hint!");
        speechManager.speak("Need a little help? Let's check the hint!");
        audioManager.play('hint');
      }
    }, 10000);
  }, [challenge, screen, showSuccess]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [currentChallenge, resetInactivityTimer]);

  // Initialize sort item positions when challenge changes
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = { x: 80 + idx * 135, y: 340 };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [currentChallenge, challenge]);

  // Handle multiple-choice answers
  const handleOptionClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (option === challenge.answer) {
      // Correct
      audioManager.play('success');
      setSparklePos({ x, y });
      setStars((prev) => Math.min(prev + 1, CHALLENGES.length));
      setScore((prev) => prev + 15);
      setMascotMood('celebrate');
      setMascotSpeaking('Brilliant! You got it right! 🎉');
      speechManager.speak('Brilliant! You got it right! 🎉');

      setShowSuccess(true);
    } else {
      // Wrong (Misconception feedback)
      audioManager.play('error');
      setErrors((prev) => prev + 1);
      setMascotMood('thinking');
      setHintMessage(challenge.misconception);
      setMascotSpeaking('Not quite! Check the explanation below.');
      speechManager.speak('Not quite! Check the explanation below.');
    }
  };

  // Drag-and-drop handlers for sort challenges
  const handleDragStart = () => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    if (!challenge.sortItems || !challenge.bins) return false;
    const item = challenge.sortItems.find((i) => i.id === id);
    if (!item) return false;

    // Check bin bounding boxes
    // Bin 1: left bin (e.g. x: 80, y: 160, w: 240, h: 150)
    // Bin 2: right bin (e.g. x: 400, y: 160, w: 240, h: 150)
    let droppedBin: string | null = null;
    if (x >= 60 && x <= 320 && y >= 150 && y <= 320) {
      droppedBin = challenge.bins[0].id;
    } else if (x >= 380 && x <= 640 && y >= 150 && y <= 320) {
      droppedBin = challenge.bins[1].id;
    }

    setHoverBin(null);

    if (droppedBin === item.correctBin) {
      // Correct bin
      audioManager.play('drop-correct');
      setPlacedItems((prev) => ({ ...prev, [id]: true }));
      setItemPositions((prev) => ({ ...prev, [id]: droppedBin === challenge.bins?.[0].id ? { x: 140, y: 200 } : { x: 460, y: 200 } }));

      // Check if all items placed
      const newPlaced = { ...placedItems, [id]: true };
      const allDone = challenge.sortItems.every((i) => newPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars((prev) => Math.min(prev + 1, CHALLENGES.length));
        setScore((prev) => prev + 20);
        setMascotMood('celebrate');
        setMascotSpeaking('Wonderful sorting! All correct! 🌟');
        speechManager.speak('Wonderful sorting! All correct! 🌟');
        setShowSuccess(true);
      }
      return true;
    } else {
      // Wrong bin
      audioManager.play('drop-wrong');
      setErrors((prev) => prev + 1);
      setMascotMood('thinking');
      setHintMessage(challenge.misconception);
      setMascotSpeaking('Oops! That goes in the other bin.');
      speechManager.speak('Oops! That goes in the other bin.');
      return false;
    }
  };

  // Advance to next challenge or finish
  const handleNextChallenge = () => {
    setShowSuccess(false);
    setHintMessage(null);
    setMascotSpeaking(null);
    setMascotMood('happy');

    if (currentChallenge < CHALLENGES.length - 1) {
      setCurrentChallenge((prev) => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeaking('You completed all safety & cleanliness missions! Amazing job!');
      speechManager.speak('You completed all safety & cleanliness missions! Amazing job!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-900 select-none flex flex-col items-center justify-center font-sans" style={{ width, height }}>
      {/* Background scene */}
      <NeighbourhoodScene width={width} height={height} />

      {/* Teaching screen intro */}
      {screen === 'teaching' && <TeachingScreen onStart={() => setScreen('play')} />}

      {/* Feedback components */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)} />}
      {showSuccess && (
        <SuccessBanner
          message={currentChallenge === CHALLENGES.length - 1 ? 'Mission Complete! You are a Safety & Cleanliness Star! 🌟' : 'Awesome! Great job! 🎉'}
          onComplete={handleNextChallenge}
        />
      )}

      {/* Header bar */}
      <div className="absolute top-3 left-4 right-4 flex justify-between items-center z-20 bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border border-white/50">
        <div className="flex items-center gap-2">
          <span className="text-xl">⛑️</span>
          <div>
            <h1 className="text-xs font-black text-gray-800 uppercase tracking-wider">Safety & Cleanliness</h1>
            <p className="text-[10px] font-bold text-indigo-600">Mission {currentChallenge + 1} of {CHALLENGES.length}</p>
          </div>
        </div>

        <StarRow count={stars} total={CHALLENGES.length} />

        <div className="flex items-center gap-1 bg-indigo-100 px-3 py-1 rounded-xl">
          <span className="text-xs font-black text-indigo-700">Score: {score}</span>
        </div>
      </div>

      {/* Nurse Nisha Mascot */}
      <NurseNisha mood={mascotMood} speaking={mascotSpeaking} />

      {/* Game Challenge Area */}
      {screen === 'play' && !showSuccess && (
        <div className="relative z-10 flex flex-col items-center justify-center mt-20 w-full max-w-xl px-4">
          {/* Question Box */}
          <motion.div
            key={currentChallenge}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-indigo-200 mb-6 flex flex-col items-center text-center"
          >
            <h2 className="text-lg font-black text-gray-800 mb-6">{challenge.question}</h2>

            {/* Multiple Choice Challenge */}
            {challenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {challenge.options.map((opt, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => handleOptionClick(opt, e)}
                    className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-indigo-500 to-blue-600 text-white font-bold text-base shadow-md hover:from-indigo-600 hover:to-blue-700 transition-all flex items-center justify-center gap-3"
                  >
                    <span>✨</span>
                    <span>{opt}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge */}
            {challenge.type === 'sort' && challenge.sortItems && challenge.bins && (
              <div className="relative w-full h-[320px]">
                {/* Bins */}
                <SortBin
                  label={challenge.bins[0].label}
                  color={challenge.bins[0].color}
                  x={20}
                  y={10}
                  width={260}
                  height={130}
                  isHovering={hoverBin === challenge.bins[0].id}
                />
                <SortBin
                  label={challenge.bins[1].label}
                  color={challenge.bins[1].color}
                  x={310}
                  y={10}
                  width={260}
                  height={130}
                  isHovering={hoverBin === challenge.bins[1].id}
                />

                {/* Draggable items */}
                {challenge.sortItems.map((item) => {
                  const pos = itemPositions[item.id] || { x: 100, y: 340 };
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
          </motion.div>
        </div>
      )}
    </div>
  );
}
