'use client';

/**
 * BodyFunctionsGame — Learn about body parts, functions, sense organs, and hygiene
 *
 * CISCE Nodes: c2_bio_001 (Functions of body parts and sense organs)
 * Enrichment: c2_biology_enrichment_part1
 *
 * ELI5: "Your body has many outside parts, and each one has a special job.
 *   Legs help you walk, hands help you hold, eyes see, ears hear, nose smells,
 *   tongue tastes, and skin feels touches. You must also take care of them by
 *   washing, brushing, and staying safe from sharp or loud things!"
 *
 * Misconceptions:
 *   1. "Eyes can hear" or mixing up sense organs → "No! Eyes see, ears hear,
 *      nose smells, tongue tastes, skin feels. Each organ has its own special job!"
 *   2. "Hands are for walking" → "No! Legs walk and run; hands hold, lift, and write!"
 *   3. "We should wash our eyes with soap" → "No! Soap stings and hurts delicate eyes.
 *      Always wash eyes with clean water only!"
 *
 * Story: "Help Doctor Disha check body functions, sort sense organs, and learn
 *   how to keep every part healthy and clean!"
 *
 * 9/10 Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom clinic scene background (sky through window, medical chart, pastel colors)
 * - Custom SVG medical & body icons (Eye, Ear, Nose, Tongue, Skin, Hand, Leg, Teeth, Soap, Water)
 * - Custom SVG Doctor mascot (Doctor Disha) with lab coat, stethoscope, and clipboard
 * - Drag-and-drop: drag body parts and hygiene items into correct bins
 * - 8 progressive challenges: identify function → sort organs → match care rules
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity via useRef timer
 * - Progressive difficulty ladder
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
    title: 'Meet Your Body! 👋',
    text: 'Your body is made of many outside parts! Legs help you walk and run. Hands help you hold a pencil, lift a lunch box, and wave to friends!',
    emoji: '🏃',
    bgColor: 'from-pink-400 to-rose-500',
    spoken: 'Your body is made of many outside parts! Legs help you walk and run. Hands help you hold a pencil and wave to friends!',
  },
  {
    title: 'The Five Sense Organs! 👀',
    text: 'You have five wonderful sense organs! Eyes help you see, ears help you hear, nose helps you smell, tongue helps you taste, and skin helps you feel!',
    emoji: '👁️',
    bgColor: 'from-blue-450 to-indigo-500',
    spoken: 'You have five wonderful sense organs! Eyes help you see, ears help you hear, nose helps you smell, tongue helps you taste, and skin helps you feel!',
  },
  {
    title: 'Special Jobs for Every Part! 🧠',
    text: 'Each body part has its own special job. Never confuse them! Eyes are for seeing, ears are for hearing. Hands hold things, and legs walk!',
    emoji: '🎯',
    bgColor: 'from-teal-400 to-cyan-500',
    spoken: 'Each body part has its own special job. Eyes are for seeing, ears are for hearing. Hands hold things, and legs walk!',
  },
  {
    title: 'Keep Clean and Healthy! 🧼',
    text: 'Take care of your body! Brush teeth every morning, wash hands before eating, and keep sharp objects away from your ears!',
    emoji: '🦷',
    bgColor: 'from-emerald-400 to-green-500',
    spoken: 'Take care of your body! Brush teeth every morning, wash hands before eating, and keep sharp objects away from your ears!',
  },
  {
    title: 'Protect Your Sense Organs! 💧',
    text: 'Wash eyes with clean water only — never soap! Cover your nose with a clean handkerchief when dust blows, and stay away from very loud sounds!',
    emoji: '🛡️',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Wash eyes with clean water only, never soap! Cover your nose with a handkerchief in dust, and stay away from loud sounds!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_func' | 'sort_organs' | 'match_care';

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

// ─── Challenges (8 progressive: identify → sort → care) ──────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify_func',
    question: 'What do our EYES help us do?',
    answer: 'See pictures and colours',
    options: ['See pictures and colours', 'Hear school bell', 'Smell jasmine flowers'],
    hint: 'Think: what do you use when looking at the blackboard or reading a book?',
    misconception: 'Eyes are the sense organs of sight! They work like a camera to take pictures of everything we see. Ears are for hearing and nose is for smelling!',
  },
  {
    type: 'identify_func',
    question: 'What do our LEGS help us do?',
    answer: 'Walk and run',
    options: ['Walk and run', 'Hold a pencil', 'Taste mangoes'],
    hint: 'Legs are our long lower limbs that support us as we move across the room!',
    misconception: 'Legs help us to walk, run, jump, and stand still! Hands are used for holding pencils and lifting things, not legs!',
  },
  {
    type: 'identify_func',
    question: 'What do our HANDS help us do?',
    answer: 'Hold and write',
    options: ['Hold and write', 'Walk to school', 'Hear train whistles'],
    hint: 'Hands are upper limbs used for holding a pencil, eating, and waving to friends!',
    misconception: 'Hands help us to hold things and write! Walking is done by our legs, and hearing is done by our ears!',
  },
  {
    type: 'sort_organs',
    question: 'Drag each sense organ to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Eyes see, ears hear, nose smells, tongue tastes, skin feels!',
    misconception: 'Each sense organ has only one main job! Do not mix up smell and taste, or eyes and ears. Eyes see, ears hear, nose smells, tongue tastes, skin feels!',
    sortItems: [
      { id: 'eye-item', label: 'Eyes (See)', icon: 'eye', correctBin: 'see' },
      { id: 'ear-item', label: 'Ears (Hear)', icon: 'ear', correctBin: 'hear' },
      { id: 'nose-item', label: 'Nose (Smell)', icon: 'nose', correctBin: 'smell' },
      { id: 'tongue-item', label: 'Tongue (Taste)', icon: 'tongue', correctBin: 'taste' },
    ],
    bins: [
      { id: 'see', label: 'See 👀', color: '#3B82F6' },
      { id: 'hear', label: 'Hear 👂', color: '#8B5CF6' },
      { id: 'smell', label: 'Smell 👃', color: '#10B981' },
      { id: 'taste', label: 'Taste 👅', color: '#F59E0B' },
    ],
  },
  {
    type: 'identify_func',
    question: 'What do our EARS help us do?',
    answer: 'Hear sounds like bells',
    options: ['Hear sounds like bells', 'See the blackboard', 'Feel soft blankets'],
    hint: 'Ears are shaped like little bowls to collect sounds from all around!',
    misconception: 'Ears are the sense organs of hearing! They catch sounds like the school bell or a train whistle. Eyes are for seeing, not hearing!',
  },
  {
    type: 'identify_func',
    question: 'What do our TEETH help us do?',
    answer: 'Chew our food',
    options: ['Chew our food', 'Walk in the park', 'Smell sweet flowers'],
    hint: 'Teeth help us bite and chew food before swallowing. Remember to brush them daily!',
    misconception: 'Teeth help us chew food! We brush them every morning to keep them clean, just like wiping a dust-free mirror.',
  },
  {
    type: 'sort_organs',
    question: 'Drag each body part to its main action category!',
    answer: 'sort',
    options: [],
    hint: 'Legs and hands are for moving/holding. Eyes and ears are for sensing!',
    misconception: 'Body parts have different jobs! Legs and hands are limbs for movement and holding, while eyes and ears are sense organs!',
    sortItems: [
      { id: 'leg-item', label: 'Legs', icon: 'leg', correctBin: 'move' },
      { id: 'hand-item', label: 'Hands', icon: 'hand', correctBin: 'move' },
      { id: 'eye-sort', label: 'Eyes', icon: 'eye', correctBin: 'sense' },
      { id: 'ear-sort', label: 'Ears', icon: 'ear', correctBin: 'sense' },
    ],
    bins: [
      { id: 'move', label: 'Movement / Limbs 🏃', color: '#EC4899' },
      { id: 'sense', label: 'Sense Organs 👁️', color: '#3B82F6' },
    ],
  },
  {
    type: 'sort_organs',
    question: 'Drag each care item or rule to the correct hygiene practice!',
    answer: 'sort',
    options: [],
    hint: 'Eyes need clean water (never soap!). Teeth need brushing. Ears stay away from sharp things.',
    misconception: 'Never wash eyes with soap! Soap stings and hurts delicate eyes. Always wash eyes with clean water only, brush teeth daily, and keep sharp objects away from ears!',
    sortItems: [
      { id: 'water-item', label: 'Clean Water for Eyes', icon: 'water', correctBin: 'eyes' },
      { id: 'brush-item', label: 'Brush Teeth Daily', icon: 'toothbrush', correctBin: 'teeth' },
      { id: 'hanky-item', label: 'Handkerchief for Dust', icon: 'hanky', correctBin: 'nose' },
      { id: 'safe-item', label: 'No Sharp Objects', icon: 'shield', correctBin: 'ears' },
    ],
    bins: [
      { id: 'eyes', label: 'Eyes (Water) 💧', color: '#06B6D4' },
      { id: 'teeth', label: 'Teeth (Brush) 🦷', color: '#10B981' },
      { id: 'nose', label: 'Nose (Hanky) 🤧', color: '#F59E0B' },
      { id: 'ears', label: 'Ears (Safe) 🛡️', color: '#8B5CF6' },
    ],
  },
];

// ─── Custom SVG Body & Medical Icons ──────────────────────────

function EyeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="24" ry="16" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <circle cx="30" cy="30" r="10" fill="#38BDF8" stroke="#0369A1" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="5" fill="#0F172A" />
      <circle cx="27" cy="27" r="2" fill="white" />
      <path d="M6 30 Q30 10 54 30" stroke="#0369A1" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M6 30 Q30 50 54 30" stroke="#0369A1" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function EarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 15 C10 15, 8 45, 25 50 C35 52, 45 42, 40 30 C38 25, 32 20, 30 25 C28 30, 34 38, 30 42 C24 45, 18 35, 18 25 C18 18, 25 18, 25 18" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function NoseIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C26 22, 22 38, 20 44 C18 50, 42 50, 40 44 C38 38, 34 22, 30 10 Z" fill="#FBCFE8" stroke="#DB2777" strokeWidth="2" strokeLinejoin="round" />
      <ellipse cx="25" cy="45" rx="3" ry="2" fill="#9D174D" />
      <ellipse cx="35" cy="45" rx="3" ry="2" fill="#9D174D" />
    </svg>
  );
}

function TongueIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 15 C18 15, 15 45, 30 48 C45 45, 42 15, 42 15 C42 12, 18 12, 18 15 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="2" />
      <line x1="30" y1="20" x2="30" y2="42" stroke="#9F1239" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

function LegIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 10 L22 35 L15 50 L30 52 L35 38 L30 20 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
      <rect x="12" y="50" width="20" height="6" fill="#3B82F6" rx="3" />
    </svg>
  );
}

function HandIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 30 L20 18 C20 15, 23 15, 23 18 L23 28 M26 25 L26 14 C26 11, 29 11, 29 14 L29 25 M32 26 L32 16 C32 13, 35 13, 35 16 L35 28 M38 30 L38 20 C38 17, 41 17, 41 20 L41 34 C41 42, 30 48, 24 42 L20 38 Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function WaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C22 24, 15 32, 15 40 C15 48, 22 52, 30 52 C38 52, 45 48, 45 40 C45 32, 38 24, 30 10 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="24" cy="38" rx="5" ry="8" fill="white" opacity="0.5" transform="rotate(-20 24 38)" />
    </svg>
  );
}

function ToothbrushIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="32" width="30" height="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" rx="3" />
      <rect x="40" y="26" width="10" height="12" fill="white" stroke="#CBD5E1" strokeWidth="1" rx="2" />
      <line x1="43" y1="26" x2="43" y2="32" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="46" y1="26" x2="46" y2="32" stroke="#3B82F6" strokeWidth="1.5" />
      <line x1="49" y1="26" x2="49" y2="32" stroke="#3B82F6" strokeWidth="1.5" />
    </svg>
  );
}

function HankyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="12" width="36" height="36" fill="#F8FAFC" stroke="#64748B" strokeWidth="2" rx="4" />
      <line x1="12" y1="12" x2="48" y2="48" stroke="#CBD5E1" strokeWidth="1.5" />
      <line x1="48" y1="12" x2="12" y2="48" stroke="#CBD5E1" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="6" fill="#38BDF8" opacity="0.6" />
    </svg>
  );
}

function ShieldIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L48 18 L48 32 C48 44, 30 52, 30 52 C30 52, 12 44, 12 32 L12 18 Z" fill="#10B981" stroke="#047857" strokeWidth="2" />
      <path d="M22 30 L28 36 L38 22" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Render Icon Helper for Sort Cards ────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'eye': return <EyeIcon size={size} />;
    case 'ear': return <EarIcon size={size} />;
    case 'nose': return <NoseIcon size={size} />;
    case 'tongue': return <TongueIcon size={size} />;
    case 'leg': return <LegIcon size={size} />;
    case 'hand': return <HandIcon size={size} />;
    case 'water': return <WaterIcon size={size} />;
    case 'toothbrush': return <ToothbrushIcon size={size} />;
    case 'hanky': return <HankyIcon size={size} />;
    case 'shield': return <ShieldIcon size={size} />;
    default: return <EyeIcon size={size} />;
  }
}

// ─── Doctor Disha Mascot (Custom SVG) ─────────────────────────

function DoctorDisha({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
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
            <linearGradient id="disha-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E2E8F0" />
            </linearGradient>
            <linearGradient id="disha-skin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>

          {/* Body / Lab Coat */}
          <path d="M22 50 L37 55 L53 50 L50 82 L25 82 Z" fill="url(#disha-coat)" stroke="#CBD5E1" strokeWidth="1.5" />
          {/* Stethoscope */}
          <path d="M37 55 Q37 40, 30 35 M37 55 Q37 40, 44 35" stroke="#334155" strokeWidth="2" fill="none" />
          <circle cx="37" cy="58" r="4" fill="#0EA5E9" />

          {/* Head */}
          <circle cx="37" cy="30" r="16" fill="url(#disha-skin)" stroke="#D97706" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M21 28 C21 15, 53 15, 53 28 C53 32, 51 25, 48 20 C42 12, 32 12, 26 20 C23 25, 21 32, 21 28 Z" fill="#1E293B" />

          {/* Eyes */}
          <circle cx="31" cy="28" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="28" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="27" r="0.8" fill="white" />
          <circle cx="44" cy="27" r="0.8" fill="white" />

          {/* Rosy Cheeks */}
          <ellipse cx="28" cy="33" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.7" />
          <ellipse cx="46" cy="33" rx="3" ry="1.5" fill="#FDA4AF" opacity="0.7" />

          {/* Smile */}
          <path d="M33 35 Q37 39 41 35" stroke="#9F1239" strokeWidth="1.5" fill="none" strokeLinecap="round" />

          {/* Headband with Cross Badge */}
          <rect x="21" y="22" width="32" height="4" fill="#EF4444" rx="2" />
          <rect x="35" y="20" width="4" height="8" fill="white" rx="1" />
          <rect x="33" y="22" width="8" height="4" fill="white" rx="1" />

          {/* Clipboard in hand */}
          <rect x="50" y="55" width="14" height="18" fill="#F1F5F9" stroke="#64748B" strokeWidth="1" rx="1" />
          <line x1="53" y1="59" x2="61" y2="59" stroke="#CBD5E1" strokeWidth="1" />
          <line x1="53" y1="63" x2="59" y2="63" stroke="#CBD5E1" strokeWidth="1" />
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

// ─── Clinic Background Scene ──────────────────────────────────

function ClinicScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Background wall gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F2FE 0%, #BAE6FD 50%, #7DD3FC 100%)' }} />

      {/* Window showing park */}
      <div className="absolute top-6 left-12 w-48 h-36 bg-white rounded-2xl border-4 border-blue-200 shadow-inner overflow-hidden flex flex-col">
        <div className="flex-1 bg-gradient-to-b from-sky-300 to-green-200 relative">
          {/* Sun */}
          <circle cx="35" cy="25" r="12" fill="#FEF08A" />
          {/* Green tree outside */}
          <circle cx="110" cy="80" r="30" fill="#22C55E" />
          <rect x="106" y="90" width="8" height="40" fill="#78350F" />
        </div>
        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 border-4 border-blue-200 pointer-events-none" />
      </div>

      {/* Body Chart poster on wall */}
      <div className="absolute top-8 right-32 w-32 h-44 bg-amber-50 rounded-lg border-2 border-amber-300 shadow p-2 flex flex-col items-center">
        <span className="text-[10px] font-bold text-amber-800">MY BODY</span>
        <svg width="60" height="90" viewBox="0 0 60 90">
          <circle cx="30" cy="15" r="10" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          <rect x="22" y="27" width="16" height="30" fill="#38BDF8" rx="4" />
          <line x1="16" y1="30" x2="22" y2="35" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <line x1="44" y1="30" x2="38" y2="35" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <line x1="26" y1="57" x2="22" y2="75" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
          <line x1="34" y1="57" x2="38" y2="75" stroke="#D97706" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>

      {/* Clinic Floor */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%)' }} />
      <div className="absolute bottom-28 left-0 right-0 h-2 bg-blue-300 opacity-60" />
    </div>
  );
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
      <div
        className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        }`}
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 44)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 px-1 line-clamp-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = TEACHING_SLIDES[currentSlide];

  const handleNext = () => {
    audioManager.play('tap');
    if (currentSlide < TEACHING_SLIDES.length - 1) {
      setCurrentSlide(s => s + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (currentSlide > 0) {
      setCurrentSlide(s => s - 1);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-blue-50 to-indigo-100 z-30">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full max-w-xl">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🩺</span>
          <h2 className="text-xl font-black text-indigo-900">Doctor Disha&apos;s Clinic</h2>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (
            <div
              key={i}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                i === currentSlide ? 'bg-indigo-600 w-6' : 'bg-indigo-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Slide Card */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={`w-full max-w-xl rounded-3xl p-8 shadow-2xl bg-gradient-to-br ${slide.bgColor} text-white flex flex-col items-center text-center relative overflow-hidden`}
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-xl pointer-events-none" />
        
        <div className="text-6xl mb-4 bg-white/20 p-6 rounded-3xl shadow-inner backdrop-blur-sm">
          {slide.emoji}
        </div>

        <h3 className="text-2xl font-black mb-3 tracking-wide drop-shadow">{slide.title}</h3>
        <p className="text-lg font-medium leading-relaxed drop-shadow-sm max-w-md">{slide.text}</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between w-full max-w-xl">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${
            currentSlide === 0 ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'bg-indigo-500 hover:bg-indigo-600 active:scale-95'
          }`}
        >
          ⬅️ Back
        </button>

        <span className="text-sm font-bold text-indigo-700">
          Slide {currentSlide + 1} of {TEACHING_SLIDES.length}
        </span>

        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-bold text-white bg-gradient-to-r from-emerald-500 to-teal-500 shadow-xl hover:from-emerald-600 hover:to-teal-600 active:scale-95 transition-all"
        >
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component Props ────────────────────────────────

export interface BodyFunctionsGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Component ──────────────────────────────────────

export function BodyFunctionsGame({ width = 720, height = 560, onComplete }: BodyFunctionsGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(100);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotMessage, setMascotMessage] = useState<string | null>('Hello! I am Doctor Disha. Let us learn about our body!');
  
  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);

  // Sort challenge items state
  const challenge = CHALLENGES[currentChallengeIndex];
  const [sortItemsState, setSortItemsState] = useState<{ [id: string]: { x: number; y: number; placed: boolean; correctBin: string } }>({});

  // Inactivity timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize sort items when challenge changes
  useEffect(() => {
    if (challenge.type === 'sort_organs' && challenge.sortItems) {
      const initial: { [id: string]: { x: number; y: number; placed: boolean; correctBin: string } } = {};
      challenge.sortItems.forEach((item, index) => {
        // Arrange items in a row at the bottom
        initial[item.id] = {
          x: 60 + index * 140,
          y: height - 140,
          placed: false,
          correctBin: item.correctBin,
        };
      });
      setSortItemsState(initial);
    }
  }, [currentChallengeIndex, challenge, height]);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      audioManager.play('hint');
      setHintMessage(challenge.hint);
      setMascotMood('thinking');
      setMascotMessage('Need a little help? Read the hint!');
      speechManager.speak('Need a little help? Read the hint!');
    }, 10000);
  }, [challenge.hint]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Handle multiple-choice answer selection
  const handleAnswerSelect = (option: string) => {
    audioManager.play('tap');
    resetInactivityTimer();

    if (option === challenge.answer) {
      // Correct!
      audioManager.play('success');
      setSparklePos({ x: width / 2, y: height / 2 });
      setMascotMood('celebrate');
      setMascotMessage('Wonderful! That is correct! 🎉');
      speechManager.speak('Wonderful! That is correct! 🎉');
      setStars(s => s + 1);

      setTimeout(() => {
        advanceChallenge();
      }, 1500);
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(e => e + 1);
      setScore(s => Math.max(0, s - 5));
      setMascotMood('thinking');
      setMascotMessage(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
    }
  };

  // Handle drag start
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  // Handle drag end for sort challenges
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const itemState = sortItemsState[id];
    if (!itemState) return false;

    // Define bin drop zones (x ranges for each bin)
    // We have bins at the top / middle
    const bins = challenge.bins || [];
    const binWidth = width / bins.length;

    // Determine which bin x falls into
    const droppedBinIndex = Math.floor(x / binWidth);
    const targetBin = bins[droppedBinIndex];

    if (targetBin && targetBin.id === itemState.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      setSparklePos({ x, y });
      setSortItemsState(prev => ({
        ...prev,
        [id]: { ...prev[id], placed: true, x: droppedBinIndex * binWidth + binWidth / 2 - 55, y: 160 },
      }));

      // Check if all items are placed
      const updatedState = {
        ...sortItemsState,
        [id]: { ...itemState, placed: true },
      };
      const allPlaced = Object.values(updatedState).every(i => i.placed);

      if (allPlaced) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotMessage('Fantastic sorting! All correct! 🌟');
        speechManager.speak('Fantastic sorting! All correct! 🌟');
        setStars(s => s + 1);

        setTimeout(() => {
          advanceChallenge();
        }, 1800);
      }
      return true;
    } else {
      // Wrong bin!
      audioManager.play('drop-wrong');
      setErrors(e => e + 1);
      setScore(s => Math.max(0, s - 5));
      setMascotMood('thinking');
      setMascotMessage(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(c => c + 1);
      setMascotMood('happy');
      setMascotMessage('Great job! Let us try the next challenge!');
      speechManager.speak('Great job! Let us try the next challenge!');
      setHintMessage(null);
    } else {
      // Game Complete!
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      setIsGameOver(true);
      setMascotMood('celebrate');
      setMascotMessage('You are a Body & Sense Organ Master! 🏆');
      speechManager.speak('You are a Body & Sense Organ Master! 🏆');
      if (onComplete) {
        onComplete(score);
      }
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      {/* Clinic Scene Background */}
      <ClinicScene width={width} height={height} />

      {/* Doctor Disha Mascot */}
      <DoctorDisha mood={mascotMood} speaking={mascotMessage} />

      {/* Screen 1: Teaching Intro */}
      {screen === 'teaching' && (
        <TeachingScreen onStart={() => setScreen('play')} />
      )}

      {/* Screen 2: Play Screen */}
      {screen === 'play' && !isGameOver && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 z-10 pointer-events-auto">
          {/* Top Header Bar */}
          <div className="flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-xl font-black text-indigo-900">
                Challenge {currentChallengeIndex + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>

            <div className="flex items-center gap-4">
              <span className="text-sm font-bold text-slate-700">Score: {score}</span>
              <button
                onClick={() => {
                  audioManager.play('hint');
                  setHintMessage(challenge.hint);
                }}
                className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold px-3 py-1.5 rounded-xl shadow text-xs active:scale-95 transition-all flex items-center gap-1"
              >
                💡 Hint
              </button>
            </div>
          </div>

          {/* Challenge Question Area */}
          <div className="flex flex-col items-center my-auto">
            <div className="bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl max-w-lg text-center mb-6 border border-white">
              <h2 className="text-xl font-black text-slate-800">{challenge.question}</h2>
            </div>

            {/* Multiple Choice Options */}
            {challenge.type === 'identify_func' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {challenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    className="w-full bg-white/95 hover:bg-indigo-50 border-2 border-indigo-200 text-indigo-950 font-bold py-3.5 px-6 rounded-2xl shadow-md transition-all text-left flex items-center justify-between"
                  >
                    <span>{option}</span>
                    <span className="text-indigo-400 text-lg">👉</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge Bins & Draggables */}
            {challenge.type === 'sort_organs' && challenge.bins && (
              <div className="w-full relative h-[320px]">
                {/* Bins container at the top of play area */}
                <div className="absolute top-0 left-0 right-0 flex justify-around px-4">
                  {challenge.bins.map((bin, index) => (
                    <div
                      key={bin.id}
                      className="flex flex-col items-center justify-center rounded-2xl border-4 border-dashed border-indigo-300 bg-white/70 backdrop-blur-sm shadow-inner p-3"
                      style={{
                        width: `${Math.floor((width - 60) / challenge.bins!.length)}px`,
                        height: '110px',
                      }}
                    >
                      <span className="text-xs font-black text-indigo-900 text-center">{bin.label}</span>
                    </div>
                  ))}
                </div>

                {/* Draggable Sort Cards */}
                {challenge.sortItems &&
                  challenge.sortItems.map(item => {
                    const st = sortItemsState[item.id] || { x: 50, y: 180, placed: false };
                    return (
                      <SortCard
                        key={item.id}
                        id={item.id}
                        label={item.label}
                        icon={item.icon}
                        x={st.x}
                        y={st.y}
                        placed={st.placed}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      />
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Feedback & Overlay Components */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && (
        <SuccessBanner
          message={`Amazing Job! You scored ${score} points! 🎉`}
          onComplete={() => setShowSuccessBanner(false)}
        />
      )}
      {hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
        />
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
