'use client';

/**
 * LivingThingsGame — Class 3 Biology (ICSE/CISCE)
 * Nodes: c3_bio_001 (Living & Non-living), c3_bio_002 (Internal Organs),
 *        c3_bio_003 (Respiratory System), c3_bio_004 (Inhale & Exhale),
 *        c3_bio_005 (Air Pollution & Breathing Problems)
 *
 * Mascot: Doctor Deepa — friendly doctor with white coat, stethoscope, glasses, clipboard.
 * Scene Background: Hospital garden with sky gradient, hospital building, trees, bench, skeleton model.
 * 8 Progressive Challenges with drag-and-drop & multiple choice.
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
    title: 'Living & Non-Living Things! 🌱',
    text: 'Living things grow on their own, need food and water, breathe, move, and reproduce! Examples: plants, animals, humans. Stones and chairs are non-living!',
    emoji: '🌱',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'Living things grow on their own, need food and water, breathe, move, and reproduce! Examples include plants, animals, and humans. Stones and chairs are non-living!',
  },
  {
    title: 'Internal Organs of Our Body! 🫀',
    text: 'Hidden safely inside our body are amazing organs! The heart pumps blood, the lungs help us breathe, the stomach digests food, and the brain controls everything!',
    emoji: '🫀',
    bgColor: 'from-red-400 to-rose-600',
    spoken: 'Hidden safely inside our body are amazing organs! The heart pumps blood, the lungs help us breathe, the stomach digests food, and the brain controls everything!',
  },
  {
    title: 'The Respiratory System! 👃',
    text: 'We breathe air through our nose, down the windpipe (trachea), and into the lungs! The nose filters dust with tiny hairs and sticky mucus.',
    emoji: '👃',
    bgColor: 'from-gold-400 to-gold-600',
    spoken: 'We breathe air through our nose, down the windpipe, and into the lungs! The nose filters dust with tiny hairs and sticky mucus.',
  },
  {
    title: 'Inhale and Exhale! 💨',
    text: 'When we inhale (breathe in), our chest expands and ribs move out as air fills the lungs. When we exhale (breathe out), our chest shrinks and air leaves!',
    emoji: '💨',
    bgColor: 'from-amber-400 to-orange-600',
    spoken: 'When we inhale, our chest expands and ribs move out as air fills the lungs. When we exhale, our chest shrinks and air leaves!',
  },
  {
    title: 'Air Pollution & Clean Lungs! 🌳',
    text: 'Smoke from vehicles and factories, dust, and burning garbage pollute the air! Polluted air causes coughing and asthma. Plant trees and wear masks to protect your lungs!',
    emoji: '🌳',
    bgColor: 'from-purple-400 to-gold-600',
    spoken: 'Smoke from vehicles and factories, dust, and burning garbage pollute the air! Polluted air causes coughing and asthma. Plant trees and wear masks to protect your lungs!',
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

// ─── Challenges (8 progressive) ───────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Which of these is a LIVING thing?',
    answer: 'Rose plant',
    options: ['Rose plant', 'Stone', 'Chair'],
    hint: 'Think: Which one grows on its own, needs water, and breathes?',
    misconception: 'A rose plant is living because it grows, needs water, and breathes! Stones and chairs are non-living — they do not grow or breathe.',
  },
  {
    type: 'identify',
    question: 'Which is a true feature of ALL living things?',
    answer: 'They grow on their own and breathe',
    options: ['They grow on their own and breathe', 'They are made of wood', 'They never change over time'],
    hint: 'Living things need food, water, and air, and they grow from inside!',
    misconception: 'Living things grow, need food and water, breathe, and reproduce! Non-living things do not. Movement alone does not prove something is living (a fan moves with electricity, but is non-living).',
  },
  {
    type: 'sort',
    question: 'Drag each object to Living or Non-Living!',
    answer: 'sort',
    options: [],
    hint: 'Living things grow and breathe (Dog, Plant). Non-living things do not (Stone, Chair).',
    misconception: 'Remember: Plants and dogs are living because they grow, need food, and breathe. Stones and chairs do not grow or breathe, so they are non-living!',
    sortItems: [
      { id: 'item-plant', label: 'Rose plant', icon: 'plant', correctBin: 'living' },
      { id: 'item-dog', label: 'Puppy', icon: 'dog', correctBin: 'living' },
      { id: 'item-stone', label: 'Stone', icon: 'stone', correctBin: 'nonliving' },
      { id: 'item-chair', label: 'Wooden chair', icon: 'chair', correctBin: 'nonliving' },
    ],
    bins: [
      { id: 'living', label: 'Living Things 🌿', color: '#22C55E' },
      { id: 'nonliving', label: 'Non-Living 🪨', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which internal organ pumps blood to the whole body?',
    answer: 'Heart',
    options: ['Heart', 'Lungs', 'Stomach'],
    hint: 'Place your hand on the left side of your chest — you can feel it thumping!',
    misconception: 'The heart is a muscular organ that pumps blood to all parts of the body! The lungs are for breathing, and the stomach is for digesting food.',
  },
  {
    type: 'sort',
    question: 'Drag each internal organ to its correct job!',
    answer: 'sort',
    options: [],
    hint: 'Heart = pumps blood. Lungs = breathe air. Stomach = digests food. Liver = cleans blood.',
    misconception: 'Each organ has its own special job! The heart pumps blood, lungs breathe air, stomach digests food, and liver cleans the blood.',
    sortItems: [
      { id: 'org-heart', label: 'Heart', icon: 'heart', correctBin: 'pump' },
      { id: 'org-lungs', label: 'Lungs', icon: 'lungs', correctBin: 'breathe' },
      { id: 'org-stomach', label: 'Stomach', icon: 'stomach', correctBin: 'digest' },
      { id: 'org-liver', label: 'Liver', icon: 'liver', correctBin: 'clean' },
    ],
    bins: [
      { id: 'pump', label: 'Pumps Blood 🫀', color: '#EF4444' },
      { id: 'breathe', label: 'Breathes Air 🫁', color: '#3B82F6' },
      { id: 'digest', label: 'Digests Food 🍲', color: '#F59E0B' },
      { id: 'clean', label: 'Cleans Blood 🧪', color: '#8B5CF6' },
    ],
  },
  {
    type: 'identify',
    question: 'When we inhale (breathe in), what happens to our chest?',
    answer: 'Chest expands and ribs move out',
    options: ['Chest expands and ribs move out', 'Chest shrinks and ribs move in', 'Nothing changes at all'],
    hint: 'Take a deep breath in — feel your chest get bigger as air fills your lungs!',
    misconception: 'When we inhale, our chest expands and ribs move out because the lungs fill with air like a balloon! When we exhale, the chest shrinks.',
  },
  {
    type: 'sort',
    question: 'Drag the breathing steps in the correct order from start to finish!',
    answer: 'sort',
    options: [],
    hint: 'Air enters the nose first, goes down the windpipe, and reaches the lungs!',
    misconception: 'The path of air is: 1. Enters nose nostrils → 2. Travels down windpipe (trachea) → 3. Reaches lungs → 4. Lungs take in oxygen!',
    sortItems: [
      { id: 'step-1', label: '1. Air enters nose', icon: 'nose', correctBin: 's1' },
      { id: 'step-2', label: '2. Down windpipe', icon: 'windpipe', correctBin: 's2' },
      { id: 'step-3', label: '3. Reaches lungs', icon: 'lungs', correctBin: 's3' },
    ],
    bins: [
      { id: 's1', label: 'Step 1: Nose 👃', color: '#06B6D4' },
      { id: 's2', label: 'Step 2: Windpipe 🌬️', color: '#3B82F6' },
      { id: 's3', label: 'Step 3: Lungs 🫁', color: '#8B5CF6' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each item into Air Pollution Cause or Protection Way!',
    answer: 'sort',
    options: [],
    hint: 'Factory smoke causes pollution. Wearing masks and planting trees protect us!',
    misconception: 'Vehicle exhaust and factory smoke pollute the air and harm our lungs. Wearing a face mask and planting trees are great ways to protect ourselves and keep air clean!',
    sortItems: [
      { id: 'poll-smoke', label: 'Factory smoke', icon: 'smoke', correctBin: 'pollution' },
      { id: 'poll-car', label: 'Vehicle exhaust', icon: 'smoke', correctBin: 'pollution' },
      { id: 'prot-mask', label: 'Wear a face mask', icon: 'mask', correctBin: 'protect' },
      { id: 'prot-tree', label: 'Plant more trees', icon: 'plant', correctBin: 'protect' },
    ],
    bins: [
      { id: 'pollution', label: 'Causes Pollution 🏭', color: '#EF4444' },
      { id: 'protect', label: 'Protects Lungs 🌳', color: '#22C55E' },
    ],
  },
];

// ─── Doctor Deepa Mascot ──────────────────────────────────────

function DoctorDeepa({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-gold-300"
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
            <linearGradient id="coat-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>
            <linearGradient id="skin-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* Head */}
          <circle cx="37" cy="25" r="16" fill="url(#skin-grad)" stroke="#D97706" strokeWidth="1" />
          {/* Hair */}
          <path d="M21 22 C21 12, 53 12, 53 22 C53 15, 21 15, 21 22 Z" fill="#78350F" />
          {/* Glasses */}
          <circle cx="31" cy="24" r="5" fill="none" stroke="#1E3A8A" strokeWidth="1.5" />
          <circle cx="43" cy="24" r="5" fill="none" stroke="#1E3A8A" strokeWidth="1.5" />
          <line x1="36" y1="24" x2="38" y2="24" stroke="#1E3A8A" strokeWidth="1.5" />
          {/* Eyes */}
          <circle cx="31" cy="24" r="2" fill="#1E3A8A" />
          <circle cx="43" cy="24" r="2" fill="#1E3A8A" />
          {/* Smile */}
          <path d="M33 32 Q37 36 41 32" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Stethoscope */}
          <path d="M25 45 Q37 60 50 45" fill="none" stroke="#334155" strokeWidth="2" />
          <circle cx="37" cy="58" r="4" fill="#EF4444" />
          {/* White Lab Coat */}
          <path d="M22 40 L37 45 L52 40 L55 85 L20 85 Z" fill="url(#coat-grad)" stroke="#94A3B8" strokeWidth="1.5" />
          <path d="M37 45 L37 85" stroke="#94A3B8" strokeWidth="1" strokeDasharray="3 3" />
          {/* Clipboard */}
          <rect x="48" y="50" width="16" height="22" fill="#FBBF24" stroke="#D97706" strokeWidth="1" rx="2" />
          <rect x="52" y="48" width="8" height="3" fill="#94A3B8" rx="1" />
          <line x1="51" y1="56" x2="61" y2="56" stroke="#B45309" strokeWidth="1" />
          <line x1="51" y1="61" x2="59" y2="61" stroke="#B45309" strokeWidth="1" />
          <line x1="51" y1="66" x2="57" y2="66" stroke="#B45309" strokeWidth="1" />
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

// ─── Hospital Garden Scene Background ─────────────────────────

function HospitalScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4ADE80" />
            <stop offset="100%" stopColor="#15803D" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />
        {/* Ground */}
        <rect x="0" y={height * 0.7} width={width} height={height * 0.3} fill="url(#ground-grad)" />
      </svg>

      {/* Hospital Building in Background */}
      <div className="absolute bottom-[30%] left-8 opacity-40">
        <svg width="120" height="100" viewBox="0 0 120 100">
          <rect x="10" y="20" width="100" height="80" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" />
          {/* Red Cross */}
          <rect x="52" y="30" width="16" height="30" fill="#EF4444" rx="2" />
          <rect x="45" y="37" width="30" height="16" fill="#EF4444" rx="2" />
          {/* Windows */}
          <rect x="20" y="35" width="16" height="20" fill="#93C5FD" rx="2" />
          <rect x="84" y="35" width="16" height="20" fill="#93C5FD" rx="2" />
          <rect x="20" y="65" width="16" height="20" fill="#93C5FD" rx="2" />
          <rect x="84" y="65" width="16" height="20" fill="#93C5FD" rx="2" />
        </svg>
      </div>

      {/* Clouds */}
      <motion.div className="absolute top-4 left-1/4 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

function PlantIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="52" rx="12" ry="5" fill="#8D6E63" />
      <path d="M30 50 Q30 35, 30 20" stroke="#4CAF50" strokeWidth="4" strokeLinecap="round" />
      <path d="M30 35 Q18 30, 15 20 Q25 22, 30 35 Z" fill="#66BB6A" />
      <path d="M30 25 Q42 20, 45 12 Q38 18, 30 25 Z" fill="#66BB6A" />
      <circle cx="30" cy="16" r="5" fill="#F43F5E" />
    </svg>
  );
}

function DogIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Body */}
      <ellipse cx="30" cy="36" rx="14" ry="10" fill="#D97706" />
      {/* Head */}
      <circle cx="42" cy="28" r="9" fill="#D97706" />
      {/* Ear */}
      <path d="M44 20 Q48 15, 42 22 Z" fill="#B45309" />
      {/* Snout */}
      <circle cx="48" cy="30" r="3" fill="#1E293B" />
      {/* Legs */}
      <rect x="20" y="43" width="4" height="12" fill="#D97706" rx="2" />
      <rect x="36" y="43" width="4" height="12" fill="#D97706" rx="2" />
      {/* Tail */}
      <path d="M16 32 Q10 25, 12 20" stroke="#D97706" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function StoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 42 Q15 25, 30 22 Q48 20, 52 38 Q55 50, 32 52 Q10 54, 12 42 Z" fill="#64748B" stroke="#475569" strokeWidth="2" />
      <ellipse cx="28" cy="32" rx="6" ry="3" fill="#94A3B8" opacity="0.6" />
    </svg>
  );
}

function ChairIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="25" width="24" height="4" fill="#9A3412" rx="1" />
      <rect x="18" y="28" width="4" height="24" fill="#7C2D12" rx="1" />
      <rect x="38" y="28" width="4" height="24" fill="#7C2D12" rx="1" />
      <rect x="18" y="10" width="4" height="16" fill="#7C2D12" rx="1" />
      <rect x="38" y="10" width="4" height="16" fill="#7C2D12" rx="1" />
      <rect x="18" y="14" width="24" height="4" fill="#9A3412" rx="1" />
    </svg>
  );
}

function HeartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 C20 40, 8 30, 8 18 C8 11, 14 6, 21 6 C26 6, 30 10, 30 14 C30 10, 34 6, 39 6 C46 6, 52 11, 52 18 C52 30, 40 40, 30 50 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="2" />
      {/* Shine */}
      <ellipse cx="20" cy="16" rx="4" ry="2" fill="white" opacity="0.6" transform="rotate(-30 20 16)" />
    </svg>
  );
}

function LungsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Windpipe */}
      <rect x="27" y="8" width="6" height="14" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" rx="2" />
      {/* Left Lung */}
      <path d="M27 22 C15 22, 10 32, 12 45 C14 52, 24 50, 27 42 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
      {/* Right Lung */}
      <path d="M33 22 C45 22, 50 32, 48 45 C46 52, 36 50, 33 42 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
    </svg>
  );
}

function StomachIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 12 Q45 15, 42 32 Q38 50, 24 45 Q16 42, 18 30 Q20 18, 22 12 Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2" />
    </svg>
  );
}

function LiverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 20 Q35 15, 48 25 Q52 40, 35 45 Q18 48, 12 35 Z" fill="#9A3412" stroke="#7C2D12" strokeWidth="2" />
    </svg>
  );
}

function NoseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 Q22 30, 26 44 Q30 48, 34 44 Q38 30, 30 10 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      <circle cx="26" cy="42" r="2.5" fill="#78350F" />
      <circle cx="34" cy="42" r="2.5" fill="#78350F" />
    </svg>
  );
}

function WindpipeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="22" y="8" width="16" height="44" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="2" rx="4" />
      {[16, 26, 36, 46].map(y => (
        <line key={y} x1="22" y1={y} x2="38" y2={y} stroke="#94A3B8" strokeWidth="2" />
      ))}
    </svg>
  );
}

function SmokeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="25" cy="38" r="10" fill="#94A3B8" opacity="0.8" />
      <circle cx="38" cy="30" r="12" fill="#64748B" opacity="0.7" />
      <circle cx="28" cy="18" r="8" fill="#475569" opacity="0.6" />
    </svg>
  );
}

function MaskIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 25 Q30 18, 48 25 Q52 38, 30 42 Q8 38, 12 25 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <path d="M6 22 L14 26" stroke="#334155" strokeWidth="2.5" />
      <path d="M54 22 L46 26" stroke="#334155" strokeWidth="2.5" />
      <line x1="20" y1="30" x2="40" y2="30" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
      <line x1="20" y1="35" x2="40" y2="35" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3" />
    </svg>
  );
}

// ─── Render Sort Icon Helper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'plant': return <PlantIcon size={size} />;
    case 'dog': return <DogIcon size={size} />;
    case 'stone': return <StoneIcon size={size} />;
    case 'chair': return <ChairIcon size={size} />;
    case 'heart': return <HeartIcon size={size} />;
    case 'lungs': return <LungsIcon size={size} />;
    case 'stomach': return <StomachIcon size={size} />;
    case 'liver': return <LiverIcon size={size} />;
    case 'nose': return <NoseIcon size={size} />;
    case 'windpipe': return <WindpipeIcon size={size} />;
    case 'smoke': return <SmokeIcon size={size} />;
    case 'mask': return <MaskIcon size={size} />;
    default: return <PlantIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all ${isHovering ? 'scale-105 shadow-2xl' : 'shadow-md'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: color + '22',
        borderColor: color,
      }}
    >
      <span className="text-sm font-extrabold text-gray-800 text-center px-2">{label}</span>
      <div className="mt-1 text-xs text-gray-500 font-semibold">Drop here!</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface LivingThingsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function LivingThingsGame({ width = 720, height = 560, onComplete }: LivingThingsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Multiple choice selection state
  const [selectedOpt, setSelectedOpt] = useState<string | null>(null);
  const [isIncorrect, setIsIncorrect] = useState(false);

  // Sort challenge states
  const currentChallenge = CHALLENGES[challengeIdx];
  const [itemPositions, setItemPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Stop speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak teaching slide
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpeakingText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

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
  }, [challengeIdx, screen]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      handleShowHint();
    }, 10000);
  }, [currentChallenge]);

  // Initialize sort item positions when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 40 + idx * 130, y: height - 160 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpeakingText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  // Multiple choice answer check
  const handleAnswerClick = (opt: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    setSelectedOpt(opt);
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (opt === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x, y });
      setScore(prev => prev + 10);
      const msg = 'Great job! That is correct!';
      setSuccessMsg(msg);
      setSpeakingText(msg);
      speechManager.speak(msg);
    } else {
      // Incorrect -> show misconception
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
      // Game complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      const compMsg = 'Wonderful! You are a brilliant Biology Star!';
      setSpeakingText(compMsg);
      speechManager.speak(compMsg);
      if (onComplete) onComplete(finalScore);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find(i => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Check if dropped into correct bin
    // Bins layout: top: 120, width: 140, height: 180
    const binWidth = 140;
    const binHeight = 170;
    const binY = 120;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x + 55 >= bx && x + 55 <= bx + binWidth && y + 45 >= by && y + 45 <= by + binHeight) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

    if (droppedBinId === item.correctBin) {
      // Correct drop!
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparklePos({ x, y });

      const allDone = currentChallenge.sortItems?.every(i => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setScore(prev => prev + 15);
        const msg = 'Fantastic sorting! All correct!';
        setSuccessMsg(msg);
        setSpeakingText(msg);
        speechManager.speak(msg);
      }
      return true;
    } else {
      // Wrong bin
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
    <div className="relative overflow-hidden select-none font-sans rounded-3xl shadow-2xl bg-slate-900 border-4 border-gold-400" style={{ width, height }}>
      {/* Background */}
      <HospitalScene width={width} height={height} />

      {/* Mascot */}
      <DoctorDeepa mood={mascotMood} speaking={speakingText} />

      {/* Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}

      {/* ─── TEACHING SCREEN ──────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-slate-900/60 backdrop-blur-sm z-10">
          {/* Header */}
          <div className="flex items-center justify-between w-full max-w-xl">
            <div className="flex items-center gap-2 bg-gold-500/30 px-4 py-1.5 rounded-full border border-gold-300">
              <span className="text-xl">🩺</span>
              <span className="text-white font-extrabold text-sm">Class 3 Biology Explorer</span>
            </div>
            <div className="flex gap-1">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-gold-400' : 'w-2.5 bg-white/30'}`} />
              ))}
            </div>
          </div>

          {/* Slide Card */}
          <motion.div
            key={slideIdx}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className={`w-full max-w-xl p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl border-4 border-white/40 flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-extrabold text-white mb-3 drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-white font-medium text-base leading-relaxed drop-shadow bg-black/15 p-4 rounded-2xl">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          {/* Navigation */}
          <div className="flex justify-between w-full max-w-xl">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${slideIdx === 0 ? 'bg-slate-700/50 opacity-40 cursor-not-allowed' : 'bg-gold-600 hover:bg-gold-500 active:scale-95'}`}
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
              className="px-8 py-3 rounded-2xl font-extrabold text-white bg-gradient-to-r from-emerald-500 to-green-600 shadow-lg hover:brightness-110 active:scale-95"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ──────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 flex flex-col justify-between p-6 z-10 bg-slate-900/40 backdrop-blur-xs">
          {/* Top Bar */}
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-3">
              <span className="bg-gold-600 text-white font-extrabold px-3 py-1.5 rounded-full text-xs shadow">
                Level {challengeIdx + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShowHint}
                className="bg-amber-500 hover:bg-amber-400 text-white font-bold px-3 py-1.5 rounded-full text-xs shadow flex items-center gap-1 active:scale-95"
              >
                💡 Hint
              </button>
              <div className="bg-emerald-600 text-white font-extrabold px-3 py-1.5 rounded-full text-xs shadow">
                Score: {score}
              </div>
            </div>
          </div>

          {/* Question Box */}
          <div className="bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-gold-300 max-w-xl mx-auto w-full text-center my-2">
            <h3 className="text-base font-extrabold text-gray-800">{currentChallenge.question}</h3>
          </div>

          {/* Challenge Area */}
          <div className="flex-1 relative flex items-center justify-center max-w-2xl mx-auto w-full">
            {currentChallenge.type === 'identify' && (
              <div className="flex flex-col gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectAnswer = opt === currentChallenge.answer;
                  let btnColor = 'bg-white hover:bg-gold-50 text-gray-800 border-gold-200';
                  if (isSelected && isCorrectAnswer) btnColor = 'bg-emerald-500 text-white border-emerald-600';
                  if (isSelected && !isCorrectAnswer) btnColor = 'bg-rose-500 text-white border-rose-600';

                  return (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={e => handleAnswerClick(opt, e)}
                      disabled={selectedOpt !== null && isCorrectAnswer}
                      className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm shadow-md border-2 transition-all flex items-center justify-between ${btnColor}`}
                    >
                      <span>{opt}</span>
                      <span className="text-lg">{isCorrectAnswer && selectedOpt ? '✅' : '👉'}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[320px]">
                {/* Bins */}
                <div className="flex justify-center gap-4 absolute top-0 left-0 right-0">
                  {currentChallenge.bins.map((bin, idx) => {
                    const totalBins = currentChallenge.bins?.length || 1;
                    const binWidth = Math.floor(520 / totalBins);
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={idx * (binWidth + 12)}
                        y={0}
                        width={binWidth}
                        height={160}
                        isHovering={hoveredBin === bin.id}
                      />
                    );
                  })}
                </div>

                {/* Draggable Items */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-4 flex-wrap">
                  {currentChallenge.sortItems.map((item, idx) => {
                    const placed = placedItems[item.id] || false;
                    const pos = itemPositions[item.id] || { x: idx * 120, y: 220 };
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

          {/* Bottom Action Bar for MC completion */}
          {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
            <div className="flex justify-center pb-2">
              <button
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-emerald-500 to-green-600 text-white font-extrabold px-8 py-3 rounded-2xl shadow-xl hover:brightness-110 active:scale-95 animate-bounce"
              >
                Continue ➡️
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
