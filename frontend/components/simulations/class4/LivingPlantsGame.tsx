'use client';

/**
 * LivingPlantsGame — Learn about living vs non-living, plant parts, and internal organs
 *
 * CISCE Nodes: c4_evs_001 (Living vs non-living), c4_evs_002 (Plants and animals),
 *              c4_evs_003 (Main internal organs)
 *
 * ELI5: "Living things grow, breathe, eat, and have babies! Non-living things
 *   like stones and chairs do not. Inside our bodies, amazing helper organs like
 *   the heart, lungs, and brain keep us alive and healthy every day!"
 *
 * Mascot: Doctor Divya (friendly doctor with stethoscope, plant badge, magnifying glass)
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: "Living vs Non-Living 🌱",
    text: "Living things grow, need food and water, breathe, reproduce, feel things, and eventually die! Non-living things like stones and chairs do none of these!",
    emoji: "🌱",
    bgColor: "from-emerald-400 to-teal-500",
    spoken: "Living things grow, need food and water, breathe, reproduce, feel things, and eventually die! Non-living things like stones and chairs do not!"
  },
  {
    title: "The Tricky Seeds & Eggs 🌰",
    text: "A dry seed or hen's egg looks lifeless, but they are LIVING in a dormant resting stage! Give them moisture, warmth, and air, and they sprout or hatch!",
    emoji: "🥚",
    bgColor: "from-teal-400 to-cyan-500",
    spoken: "A dry seed or hen's egg looks lifeless, but they are living in a dormant resting stage! Give them moisture, warmth, and air, and they sprout or hatch!"
  },
  {
    title: "Plants Around Us 🌿",
    text: "Plants are living things! Their roots anchor and drink water, stems transport food, leaves make food using sunlight, flowers make seeds, and seeds grow into new plants!",
    emoji: "🌻",
    bgColor: "from-green-400 to-emerald-500",
    spoken: "Plants are living things! Their roots anchor and drink water, stems transport food, leaves make food using sunlight, flowers make seeds, and seeds grow into new plants!"
  },
  {
    title: "Internal Organs — Inside Helpers ❤️",
    text: "Hidden safely inside our bodies are internal organs! The brain in our head thinks and controls. The heart and lungs in our chest pump blood and breathe!",
    emoji: "🧠",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "Hidden safely inside our bodies are internal organs! The brain in our head thinks and controls. The heart and lungs in our chest pump blood and breathe!"
  },
  {
    title: "Tummy Team & Working Together 🫀",
    text: "In our abdomen, the stomach, liver, kidneys, and intestines digest food and clean waste! All organs work together as a team to keep us healthy and strong!",
    emoji: "🩺",
    bgColor: "from-indigo-400 to-purple-500",
    spoken: "In our abdomen, the stomach, liver, kidneys, and intestines digest food and clean waste! All organs work together as a team to keep us healthy and strong!"
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

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

// ─── Challenges (8 progressive) ───────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which of these is a true characteristic of LIVING things?',
    answer: 'They grow, need food, breathe, and reproduce',
    options: [
      'They grow, need food, breathe, and reproduce',
      'They stay the exact same size forever',
      'They never need water or food'
    ],
    hint: 'Think about what you, puppies, and plants do every day! Do living things grow and breathe?',
    misconception: 'Living things grow, need food and water, breathe, and reproduce! Non-living things like stones do none of these.'
  },
  {
    type: 'sort',
    question: 'Drag each object! Is it Living or Non-Living?',
    answer: 'sort',
    options: [],
    hint: 'Living things grow and breathe (Tree, Puppy, Seed). Non-living things do not (Stone, Chair, Pencil)!',
    misconception: 'Remember: a dry seed is LIVING in a dormant stage! Stones and chairs are non-living because they do not grow or breathe.',
    sortItems: [
      { id: 'tree', label: 'Mango Tree', icon: 'tree', correctBin: 'living' },
      { id: 'puppy', label: 'Puppy', icon: 'puppy', correctBin: 'living' },
      { id: 'seed', label: 'Dry Seed', icon: 'seed', correctBin: 'living' },
      { id: 'stone', label: 'Stone', icon: 'stone', correctBin: 'nonliving' },
      { id: 'chair', label: 'Chair', icon: 'chair', correctBin: 'nonliving' },
      { id: 'pencil', label: 'Pencil', icon: 'pencil', correctBin: 'nonliving' },
    ],
    bins: [
      { id: 'living', label: 'Living Things 🌱', color: '#22C55E' },
      { id: 'nonliving', label: 'Non-Living Things 🪨', color: '#64748B' },
    ],
  },
  {
    type: 'identify',
    question: 'A dry chana seed looks lifeless on a table. Why is it classified as LIVING?',
    answer: 'It is in a dormant stage and sprouts when given moisture, warmth, and air',
    options: [
      'It is in a dormant stage and sprouts when given moisture, warmth, and air',
      'It is actually non-living until you paint it',
      'It moves around the room at night'
    ],
    hint: 'Think about what happens when you soak a seed in wet cotton. Does it wake up?',
    misconception: 'A dry seed is LIVING but in a dormant (resting) stage! When given moisture, warmth, and air, it germinates and grows into a seedling.'
  },
  {
    type: 'sort',
    question: 'Drag each life process to match its correct example!',
    answer: 'sort',
    options: [],
    hint: 'Growth = puppy to dog. Breathing = fish with gills. Reproduction = hen laying eggs. Response = plant bending to sun.',
    misconception: 'Every living thing shows specific life processes: growth, breathing, reproduction, and response to stimuli!',
    sortItems: [
      { id: 'growth', label: 'Puppy grows to dog', icon: 'puppy', correctBin: 'growth-bin' },
      { id: 'breathe', label: 'Fish uses gills', icon: 'fish', correctBin: 'breathe-bin' },
      { id: 'repro', label: 'Hen lays eggs', icon: 'bird', correctBin: 'repro-bin' },
      { id: 'stimuli', label: 'Plant bends to light', icon: 'plant', correctBin: 'stimuli-bin' },
    ],
    bins: [
      { id: 'growth-bin', label: 'Growth 📈', color: '#3B82F6' },
      { id: 'breathe-bin', label: 'Breathing 💨', color: '#06B6D4' },
      { id: 'repro-bin', label: 'Reproduction 🥚', color: '#EC4899' },
      { id: 'stimuli-bin', label: 'Stimuli ☀️', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify',
    question: 'Where is the BRAIN located in the human body?',
    answer: 'Inside the head, protected by the skull',
    options: [
      'Inside the head, protected by the skull',
      'Inside the chest next to the heart',
      'Inside the stomach in the abdomen'
    ],
    hint: 'Where do you feel your thoughts? The control centre is right at the top inside a bony helmet!',
    misconception: 'The brain is located inside the HEAD, protected by the skull! It acts as the body control centre for thinking and movement.'
  },
  {
    type: 'sort',
    question: 'Drag each internal organ to its correct region and function!',
    answer: 'sort',
    options: [],
    hint: 'Head = Brain. Chest = Heart & Lungs. Abdomen = Stomach, Liver, Kidneys, Intestines!',
    misconception: 'Remember: Heart and lungs are in the CHEST. Stomach, liver, kidneys, and intestines are in the ABDOMEN below the chest!',
    sortItems: [
      { id: 'brain', label: 'Brain (Head)', icon: 'brain', correctBin: 'head-bin' },
      { id: 'heart', label: 'Heart (Chest)', icon: 'heart', correctBin: 'chest-bin' },
      { id: 'lungs', label: 'Lungs (Chest)', icon: 'lungs', correctBin: 'chest-bin' },
      { id: 'stomach', label: 'Stomach (Abdomen)', icon: 'stomach', correctBin: 'abdomen-bin' },
      { id: 'liver', label: 'Liver (Abdomen)', icon: 'liver', correctBin: 'abdomen-bin' },
      { id: 'kidneys', label: 'Kidneys (Abdomen)', icon: 'kidneys', correctBin: 'abdomen-bin' },
    ],
    bins: [
      { id: 'head-bin', label: 'Head 🧠', color: '#8B5CF6' },
      { id: 'chest-bin', label: 'Chest ❤️', color: '#EF4444' },
      { id: 'abdomen-bin', label: 'Abdomen 🫀', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'Which internal organ PUMPS BLOOD to every part of the body?',
    answer: 'The heart',
    options: [
      'The heart',
      'The lungs',
      'The stomach'
    ],
    hint: 'It is a strong, fist-sized muscle beating inside your left chest!',
    misconception: 'The heart pumps blood! The lungs help us breathe air, and the stomach digests food. Each organ has its own special job.'
  },
  {
    type: 'sort',
    question: 'Drag each body part! Is it an Internal Organ or External Body Part?',
    answer: 'sort',
    options: [],
    hint: 'Internal organs are hidden inside (Heart, Brain, Stomach). External parts are on the outside (Eyes, Ears, Skin)!',
    misconception: 'Internal organs lie safely inside the body protected by bones and skin. External parts like eyes, ears, and hands are on the outside and can be seen directly.',
    sortItems: [
      { id: 'heart-ext', label: 'Heart', icon: 'heart', correctBin: 'internal' },
      { id: 'lungs-ext', label: 'Lungs', icon: 'lungs', correctBin: 'internal' },
      { id: 'brain-ext', label: 'Brain', icon: 'brain', correctBin: 'internal' },
      { id: 'eyes', label: 'Eyes', icon: 'eyes', correctBin: 'external' },
      { id: 'ears', label: 'Ears', icon: 'ears', correctBin: 'external' },
      { id: 'skin', label: 'Skin', icon: 'skin', correctBin: 'external' },
    ],
    bins: [
      { id: 'internal', label: 'Internal Organ 🫀', color: '#3B82F6' },
      { id: 'external', label: 'External Part 👀', color: '#F59E0B' },
    ],
  },
];

// ─── Doctor Divya Mascot ──────────────────────────────────────

function DoctorDivya({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-400"
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
            <linearGradient id="divya-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="divya-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
          </defs>
          {/* Hair back */}
          <circle cx="37" cy="32" r="20" fill="url(#divya-hair)" />
          {/* Face */}
          <circle cx="37" cy="34" r="16" fill="#FDE68A" />
          {/* Hair front bangs */}
          <path d="M22 28 Q37 20 52 28 Q45 22 37 24 Q29 22 22 28 Z" fill="url(#divya-hair)" />
          {/* Glasses */}
          <circle cx="31" cy="33" r="5" fill="none" stroke="#334155" strokeWidth="1.5" />
          <circle cx="43" cy="33" r="5" fill="none" stroke="#334155" strokeWidth="1.5" />
          <line x1="36" y1="33" x2="38" y2="33" stroke="#334155" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="33" r="2" fill="#0F172A" />
          <circle cx="43" cy="33" r="2" fill="#0F172A" />
          {/* Smile */}
          <path d="M33 42 Q37 46 41 42" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Lab coat body */}
          <path d="M22 52 L37 58 L53 52 L56 82 L19 82 Z" fill="url(#divya-coat)" stroke="#CBD5E1" strokeWidth="1" />
          {/* Stethoscope */}
          <path d="M37 52 Q37 62 33 68 Q31 72 33 74" fill="none" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
          <circle cx="33" cy="74" r="3" fill="#64748B" />
          {/* Plant Badge on coat */}
          <circle cx="45" cy="62" r="5" fill="#10B981" />
          <path d="M43 64 Q45 60 47 64 Z" fill="#FEF08A" />
          {/* Headband with Red Cross / Heart */}
          <rect x="20" y="24" width="34" height="4" fill="#EF4444" rx="2" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ───────────────────────────────────────

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

// ─── Nature Scene Background ──────────────────────────────────

function NatureScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="nature-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="nature-ground" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#16A34A" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#nature-sky)" />
        {/* Sun */}
        <circle cx="80" cy="70" r="35" fill="#FEF08A" opacity="0.9" />
        <circle cx="80" cy="70" r="25" fill="#FACC15" />
        {/* Rolling hills */}
        <path d="M0 380 Q180 320 360 370 T720 350 L720 560 L0 560 Z" fill="#22C55E" opacity="0.6" />
        <path d="M0 420 Q240 370 480 410 T720 400 L720 560 L0 560 Z" fill="url(#nature-ground)" />
      </svg>
      {/* Cloud 1 */}
      <motion.div className="absolute top-6 left-1/4 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Icon Components for Sort Items ────────────────

function LivingTreeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="38" width="8" height="18" fill="#8B5CF6" rx="1" />
      <circle cx="30" cy="26" r="16" fill="#22C55E" />
      <circle cx="22" cy="30" r="10" fill="#16A34A" />
      <circle cx="38" cy="30" r="10" fill="#16A34A" />
    </svg>
  );
}

function PuppyIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="36" rx="14" ry="10" fill="#D97706" />
      <circle cx="42" cy="28" r="10" fill="#D97706" />
      <ellipse cx="48" cy="24" rx="4" ry="7" fill="#B45309" transform="rotate(20 48 24)" />
      <circle cx="45" cy="26" r="1.5" fill="#1E293B" />
      <path d="M46 31 Q48 33 50 31" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <rect x="20" y="42" width="4" height="12" fill="#B45309" rx="2" />
      <rect x="36" y="42" width="4" height="12" fill="#B45309" rx="2" />
    </svg>
  );
}

function SeedIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="12" ry="16" fill="#92400E" transform="rotate(-25 30 32)" />
      <path d="M26 22 Q30 26 34 22" stroke="#FEF3C7" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function StoneIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 42 Q12 28 24 22 Q36 16 45 26 Q54 36 48 46 Q42 56 24 52 Q18 48 15 42 Z" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
      <path d="M22 30 Q30 24 38 32" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function ChairIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="16" width="24" height="20" fill="#B45309" rx="2" />
      <rect x="18" y="36" width="24" height="4" fill="#92400E" />
      <rect x="20" y="40" width="3" height="14" fill="#78350F" />
      <rect x="37" y="40" width="3" height="14" fill="#78350F" />
    </svg>
  );
}

function PencilIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="26,10 34,10 34,44 26,44" fill="#FACC15" />
      <polygon points="26,44 34,44 30,54" fill="#FDE047" />
      <polygon points="30,54 28,48 32,48" fill="#1E293B" />
      <polygon points="26,10 34,10 30,4" fill="#F43F5E" />
    </svg>
  );
}

function FishIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="30" rx="16" ry="10" fill="#0EA5E9" />
      <polygon points="46,30 56,20 54,30 56,40" fill="#0284C7" />
      <circle cx="22" cy="27" r="2" fill="#1E293B" />
    </svg>
  );
}

function BirdIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="32" rx="12" ry="9" fill="#EC4899" />
      <circle cx="40" cy="24" r="7" fill="#F472B6" />
      <polygon points="45,24 52,22 47,27" fill="#F59E0B" />
      <circle cx="42" cy="23" r="1.5" fill="#1E293B" />
      <ellipse cx="25" cy="42" rx="3" ry="8" fill="#BE185D" />
    </svg>
  );
}

function PlantIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 40 L38 40 L35 52 L25 52 Z" fill="#D97706" />
      <path d="M30 40 L30 22" stroke="#22C55E" strokeWidth="3" />
      <path d="M30 30 Q20 20 22 14 Q30 22 30 30 Z" fill="#4ADE80" />
      <path d="M30 26 Q40 16 38 10 Q30 18 30 26 Z" fill="#4ADE80" />
    </svg>
  );
}

function BrainIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 30 C15 20, 25 10, 32 18 C38 12, 48 20, 42 30 C48 38, 40 48, 32 42 C24 48, 15 38, 20 30 Z" fill="#C084FC" stroke="#9333EA" strokeWidth="2" />
      <path d="M30 18 L30 42 M22 24 Q30 28 38 24 M22 36 Q30 32 38 36" stroke="#7E22CE" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function HeartIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 C30 50, 10 35, 10 22 C10 14, 16 10, 23 10 C28 10, 30 14, 30 14 C30 14, 32 10, 37 10 C44 10, 50 14, 50 22 C50 35, 30 50, 30 50 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
    </svg>
  );
}

function LungsIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 14 L30 26" stroke="#06B6D4" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 24 C22 22, 14 26, 14 36 C14 46, 24 48, 29 42 C30 40, 30 32, 30 24 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M30 24 C38 22, 46 26, 46 36 C46 46, 36 48, 31 42 C30 40, 30 32, 30 24 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
    </svg>
  );
}

function StomachIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M24 16 L36 16 C38 24, 42 32, 38 42 C34 50, 22 48, 20 40 C18 32, 22 24, 24 16 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
    </svg>
  );
}

function LiverIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 26 C16 18, 32 14, 44 20 C50 24, 48 42, 32 44 C20 46, 16 34, 16 26 Z" fill="#9A3412" stroke="#7C2D12" strokeWidth="2" />
    </svg>
  );
}

function KidneyIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 16 C34 16, 42 22, 38 36 C36 44, 28 46, 24 40 C20 34, 18 24, 22 16 Z" fill="#FB923C" stroke="#C2410C" strokeWidth="2" />
    </svg>
  );
}

function EyesIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="18" ry="12" fill="white" stroke="#334155" strokeWidth="2" />
      <circle cx="30" cy="30" r="6" fill="#0284C7" />
      <circle cx="30" cy="30" r="3" fill="#0F172A" />
      <circle cx="28" cy="28" r="1.5" fill="white" />
    </svg>
  );
}

function EarsIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 18 C14 20, 14 42, 24 46 C30 48, 36 40, 32 30 C30 24, 26 22, 22 18 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
      <path d="M24 24 C18 26, 18 38, 25 40" stroke="#D97706" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function SkinIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="15" width="30" height="30" fill="#FCD34D" stroke="#D97706" strokeWidth="2" rx="4" />
      <circle cx="25" cy="25" r="2" fill="#D97706" opacity="0.6" />
      <circle cx="35" cy="35" r="2" fill="#D97706" opacity="0.6" />
      <circle cx="35" cy="25" r="2" fill="#D97706" opacity="0.6" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'tree': return <LivingTreeIcon size={size} />;
    case 'puppy': return <PuppyIcon size={size} />;
    case 'seed': return <SeedIcon size={size} />;
    case 'stone': return <StoneIcon size={size} />;
    case 'chair': return <ChairIcon size={size} />;
    case 'pencil': return <PencilIcon size={size} />;
    case 'fish': return <FishIcon size={size} />;
    case 'bird': return <BirdIcon size={size} />;
    case 'plant': return <PlantIcon size={size} />;
    case 'brain': return <BrainIcon size={size} />;
    case 'heart': return <HeartIcon size={size} />;
    case 'lungs': return <LungsIcon size={size} />;
    case 'stomach': return <StomachIcon size={size} />;
    case 'liver': return <LiverIcon size={size} />;
    case 'kidneys': return <KidneyIcon size={size} />;
    case 'eyes': return <EyesIcon size={size} />;
    case 'ears': return <EarsIcon size={size} />;
    case 'skin': return <SkinIcon size={size} />;
    default: return <LivingTreeIcon size={size} />;
  }
}

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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-emerald-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1">{label}</span>
      </div>
    </Draggable>
  );
}

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
      style={{ left: x, top: y, width, height, backgroundColor: `${color}20`, borderColor: color }}
    >
      <span className="text-xs font-black text-gray-800 text-center px-1">{label}</span>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface LivingPlantsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LivingPlantsGame({ width = 720, height = 560, onComplete }: LivingPlantsGameProps) {
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
      const count = currentChallenge.sortItems.length;
      currentChallenge.sortItems.forEach((item, idx) => {
        const startX = Math.max(20, (width - count * 115) / 2);
        newPos[item.id] = { x: startX + idx * 115, y: height - 125 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, width, height]);

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
      const msg = "Great job! You understand living things and plants!";
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
      const compMsg = "Wonderful! You are a brilliant plant and body expert!";
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
    const binCount = currentChallenge.bins.length;
    const binWidth = 140;
    const totalBinsWidth = binCount * binWidth + (binCount - 1) * 20;
    const startX = (width - totalBinsWidth) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 80;
      const bW = binWidth;
      const bH = 150;
      if (x >= bx && x <= bx + bW && y >= by && y <= by + bH) {
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
        const msg = "Fantastic! You sorted the living things and plants perfectly!";
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-gradient-to-b from-sky-300 to-emerald-200" style={{ width, height }}>
      <NatureScene width={width} height={height} />
      <DoctorDivya mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ───────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 z-10 bg-black/20 backdrop-blur-sm">
          <div className="w-full flex justify-between items-center bg-white/80 rounded-2xl px-4 py-2 shadow-md">
            <h1 className="text-lg font-black text-emerald-800">🌿 Living Plants & Body World</h1>
            <div className="flex gap-1">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-emerald-600' : 'bg-gray-300'}`} />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-lg">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-2 rounded-2xl font-bold text-white shadow-lg ${slideIdx === 0 ? 'bg-gray-400 opacity-50' : 'bg-emerald-600 hover:bg-emerald-700'}`}
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
                }
              }}
              className="px-8 py-3 rounded-2xl font-black text-white bg-emerald-600 hover:bg-emerald-700 shadow-xl text-lg animate-bounce"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ───────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10">
          {/* Header */}
          <div className="flex justify-between items-center bg-white/90 rounded-2xl px-4 py-2 shadow-lg backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
                Challenge {challengeIdx + 1} of {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 10)} total={8} />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShowHint}
                className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-3 py-1 rounded-xl text-xs shadow-md"
              >
                💡 Hint
              </button>
              <span className="text-sm font-black text-emerald-900 bg-emerald-200 px-3 py-1 rounded-full">
                Score: {score}
              </span>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white/95 rounded-2xl p-4 shadow-xl my-2 max-w-xl mx-auto text-center border-2 border-emerald-400">
            <h2 className="text-base font-black text-gray-800">{currentChallenge.question}</h2>
          </div>

          {/* Challenge Body */}
          <div className="flex-1 relative flex items-center justify-center">
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-emerald-50 text-gray-800 border-2 border-emerald-200';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnBg = 'bg-emerald-500 text-white border-2 border-emerald-600';
                    else if (isSelected) btnBg = 'bg-red-500 text-white border-2 border-red-600';
                  }
                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={(e) => handleAnswerClick(opt, e)}
                      disabled={selectedOpt === currentChallenge.answer}
                      className={`p-3 rounded-2xl font-bold text-sm shadow-md transition-all text-left ${btnBg}`}
                    >
                      {opt}
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && (
              <div className="absolute inset-0">
                {/* Bins */}
                {currentChallenge.bins.map((bin, idx) => {
                  const binCount = currentChallenge.bins!.length;
                  const binWidth = 140;
                  const totalBinsWidth = binCount * binWidth + (binCount - 1) * 20;
                  const startX = (width - totalBinsWidth) / 2;
                  const bx = startX + idx * (binWidth + 20);
                  const isHover = hoveredBin === bin.id;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={40}
                      width={binWidth}
                      height={150}
                      isHovering={isHover} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                })}

                {/* Draggable items */}
                {currentChallenge.sortItems?.map((item) => {
                  const pos = itemPositions[item.id] || { x: 50, y: 350 };
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

          {/* Footer Action Bar */}
          {((currentChallenge.type === 'identify' && selectedOpt) ||
            (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
            <div className="flex justify-center pb-2">
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                onClick={advanceChallenge}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-8 py-3 rounded-2xl shadow-xl text-lg flex items-center gap-2"
              >
                <span>Continue</span>
                <span>➡️</span>
              </motion.button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
