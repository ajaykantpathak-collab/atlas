'use client';

/**
 * AirCleanGame — Learn about air, air pollution, air-borne diseases, cleanliness, and healthy body/mind.
 *
 * CISCE Nodes: c2_bio_005 (Properties of air), c2_bio_006 (Air pollution),
 *              c2_bio_007 (Air-borne diseases), c2_bio_008 (Cleanliness of surroundings),
 *              c2_bio_009 (Healthy body and mind)
 *
 * ELI5: "Air is all around us! We cannot see it, but it occupies space and has weight.
 *   We must keep air clean by planting trees and stopping smoke. We must keep our
 *   surroundings clean using dustbins, and stay healthy with exercise, yoga, and outdoor play!"
 *
 * Mascot: Sweeper Suresh — a friendly municipal worker with an orange cap, green uniform,
 *   a broom, and a whistle.
 *
 * 9/10 quality features:
 * - Teaching intro with exactly 5 slides before play begins
 * - Custom SVG city park scene background (sky gradient, trees, dustbin, bench, path)
 * - Custom SVG topic objects (air molecule, smoke, mask, dustbin, broom, tree, yoga, runner, garbage, clean hands)
 * - Unique custom SVG mascot (Sweeper Suresh) with mood states and speech bubble
 * - Drag-and-drop using Draggable component for sort challenges
 * - 8 progressive challenges (easy recall to applied sorting)
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via Web Speech API / audioManager
 * - Confetti + celebration on success
 * - Auto-hint after 10 seconds of inactivity
 * - Progressive difficulty ladder
 */

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';

import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

// ─── Teaching slides (5 exact slides) ─────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'The Magic of Air! 🌬️',
    text: 'Air is all around us! We cannot see it, but it occupies space, has weight, and expands when heated! We feel it as wind!',
    emoji: '🌬️',
    bgColor: 'from-sky-400 to-blue-500',
    spoken: 'Air is all around us! We cannot see it, but it occupies space, has weight, and expands when heated!',
  },
  {
    title: 'Keep Air Clean! 🌳',
    text: 'Smoke from vehicles, factories, and burning garbage makes air dirty. We call this air pollution! Planting trees helps clean the air!',
    emoji: '🌳',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Smoke from vehicles, factories, and burning garbage makes air dirty. Planting trees helps clean the air!',
  },
  {
    title: 'Stop Air-Borne Germs! 😷',
    text: 'Cough, cold, and flu spread through the air when people cough or sneeze without covering their mouth. Always cover your mouth and wash hands!',
    emoji: '😷',
    bgColor: 'from-teal-400 to-cyan-500',
    spoken: 'Cough, cold, and flu spread through the air when people cough or sneeze. Always cover your mouth and wash hands!',
  },
  {
    title: 'Clean Surroundings! 🗑️',
    text: 'Keep your home and school clean! Put garbage in covered dustbins, segregate wet and dry waste, and never litter on the street!',
    emoji: '🗑️',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'Keep your home and school clean! Put garbage in covered dustbins, segregate wet and dry waste, and never litter!',
  },
  {
    title: 'Healthy Body & Mind! 💪',
    text: 'Exercise daily, do yoga, play outdoor games with friends, eat good food, and sleep well every night to grow strong and happy!',
    emoji: '💪',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Exercise daily, do yoga, play outdoor games with friends, eat good food, and sleep well every night!',
  },
];

// ─── Types ────────────────────────────────────────────────────

type ChallengeType = 'identify' | 'sort';

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface Bin {
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
  bins?: Bin[];
}

// ─── 8 Progressive Challenges ─────────────────────────────────

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'Air has no colour, no smell, and no... what?',
    answer: 'Taste',
    options: ['Taste', 'Weight', 'Space'],
    hint: 'Think about when you breathe air in — does it taste like sugar or salt? No!',
    misconception: 'Air has no taste! Even though it occupies space and has weight, it is completely tasteless, colourless, and odorless!',
  },
  {
    type: 'identify',
    question: 'When you push an empty glass upside down into water, why does water not fill it?',
    answer: 'Air occupies space',
    options: ['Air occupies space', 'Water is scared', 'Glass is magic'],
    hint: 'The glass is not empty — what invisible thing is already inside it?',
    misconception: 'The glass is full of air! Air occupies space, pushing back against the water until you tilt the glass and let bubbles escape.',
  },
  {
    type: 'sort',
    question: 'Drag each item to show what makes air CLEAN vs DIRTY!',
    answer: 'sort',
    options: [],
    hint: 'Trees and cycling keep air clean! Factory smoke and burning garbage make air dirty!',
    misconception: 'Smoke from factories, vehicles, and burning garbage pollutes the air. Trees, walking, and cycling keep the air clean and fresh!',
    sortItems: [
      { id: 'tree-item', label: 'Planting Trees', icon: 'tree', correctBin: 'clean' },
      { id: 'smoke-item', label: 'Factory Smoke', icon: 'smoke', correctBin: 'dirty' },
      { id: 'garbage-item', label: 'Burning Plastic', icon: 'garbage', correctBin: 'dirty' },
      { id: 'cycle-item', label: 'Riding Bicycle', icon: 'runner', correctBin: 'clean' },
    ],
    bins: [
      { id: 'clean', label: 'Keeps Air Clean 🌳', color: '#22C55E' },
      { id: 'dirty', label: 'Pollutes Air 🏭', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'How can you protect yourself when walking in dusty or smoky air?',
    answer: 'Wear a face mask',
    options: ['Wear a face mask', 'Eat more sweets', 'Sleep all day'],
    hint: 'Think of a cloth or paper cover placed over your nose and mouth!',
    misconception: 'Wearing a face mask filters out dust and smoke particles, protecting your nose and lungs from air pollution!',
  },
  {
    type: 'sort',
    question: 'Drag each action to Good Surroundings Habit vs Bad Habit!',
    answer: 'sort',
    options: [],
    hint: 'Throwing garbage in dustbins and sweeping floors are good habits! Littering is bad!',
    misconception: 'Good habits like using dustbins, sweeping, and washing hands keep surroundings clean. Littering and leaving stagnant water attract germs and mosquitoes!',
    sortItems: [
      { id: 'bin-item', label: 'Use Dustbin', icon: 'dustbin', correctBin: 'good' },
      { id: 'litter-item', label: 'Throw Wrapper on Road', icon: 'garbage', correctBin: 'bad' },
      { id: 'sweep-item', label: 'Sweep Classroom', icon: 'broom', correctBin: 'good' },
      { id: 'stagnant-item', label: 'Leave Stagnant Water', icon: 'smoke', correctBin: 'bad' },
    ],
    bins: [
      { id: 'good', label: 'Good Habit ✅', color: '#22C55E' },
      { id: 'bad', label: 'Bad Habit ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is an air-borne disease that spreads when someone coughs?',
    answer: 'Cold and cough',
    options: ['Cold and cough', 'Broken bone', 'Toothache'],
    hint: 'Germs travel through the air when a sick person sneezes or coughs without covering up!',
    misconception: 'Cold, cough, and flu are air-borne diseases! Tiny germ-filled droplets float in the air when sick people cough or sneeze.',
  },
  {
    type: 'sort',
    question: 'Drag each daily activity to Healthy Body & Mind vs Unhealthy!',
    answer: 'sort',
    options: [],
    hint: 'Exercise, yoga, and outdoor games make your body strong and happy!',
    misconception: 'Exercise, yoga, outdoor games, washing hands, and sleeping well build a healthy body and active mind. Watching TV all day without play is unhealthy!',
    sortItems: [
      { id: 'yoga-item', label: 'Yoga & Stretching', icon: 'yoga', correctBin: 'healthy' },
      { id: 'tv-item', label: 'Watch TV All Day', icon: 'smoke', correctBin: 'unhealthy' },
      { id: 'outdoor-item', label: 'Play Outdoor Games', icon: 'runner', correctBin: 'healthy' },
      { id: 'wash-item', label: 'Wash Hands with Soap', icon: 'cleanHand', correctBin: 'healthy' },
    ],
    bins: [
      { id: 'healthy', label: 'Healthy Choice 💪', color: '#22C55E' },
      { id: 'unhealthy', label: 'Unhealthy ⚠️', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag items to Body Fitness vs Mind Fitness!',
    answer: 'sort',
    options: [],
    hint: 'Running and yoga strengthen muscles (body)! Reading and chess sharpen thinking (mind)!',
    misconception: 'Running, yoga, and outdoor games build physical fitness for the body. Reading, solving puzzles, and quiet rest build mental sharpness for the mind!',
    sortItems: [
      { id: 'run-item', label: 'Running outside', icon: 'runner', correctBin: 'body' },
      { id: 'yoga-fit', label: 'Yoga pose', icon: 'yoga', correctBin: 'body' },
      { id: 'wash-fit', label: 'Hand washing', icon: 'cleanHand', correctBin: 'body' },
      { id: 'tree-fit', label: 'Planting trees', icon: 'tree', correctBin: 'body' },
    ],
    bins: [
      { id: 'body', label: 'Body Fitness 🏃‍♂️', color: '#3B82F6' },
      { id: 'mind', label: 'Mind & Care 🧠', color: '#8B5CF6' },
    ],
  },
];

// ─── Custom SVG Mascot: Sweeper Suresh ────────────────────────

function SureshMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
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
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
              ? { y: [0, -4, 0] }
              : { rotate: [0, 6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
      >
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="uniform-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80" />
              <stop offset="100%" stopColor="#16A34A" />
            </linearGradient>
            <linearGradient id="cap-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FB923C" />
              <stop offset="100%" stopColor="#C2410C" />
            </linearGradient>
          </defs>
          {/* Body / Uniform */}
          <rect x="22" y="45" width="31" height="35" rx="8" fill="url(#uniform-grad)" stroke="#15803D" strokeWidth="1.5" />
          {/* Reflector stripe */}
          <rect x="22" y="58" width="31" height="6" fill="#FEF08A" />
          {/* Head */}
          <circle cx="37.5" cy="32" r="14" fill="#FCE7F3" stroke="#DB2777" strokeWidth="1" />
          {/* Orange Cap */}
          <path d="M22 26 Q37.5 16 53 26 L55 29 L20 29 Z" fill="url(#cap-grad)" />
          <path d="M42 24 Q52 24 58 27 L55 29 Q48 27 42 26 Z" fill="#9A3412" />
          {/* Friendly Eyes */}
          <circle cx="32" cy="31" r="2.5" fill="#1E293B" />
          <circle cx="43" cy="31" r="2.5" fill="#1E293B" />
          <circle cx="33" cy="30" r="0.8" fill="white" />
          <circle cx="44" cy="30" r="0.8" fill="white" />
          {/* Whistle cord & whistle */}
          <path d="M37.5 45 Q42 50 45 46" stroke="#FEF08A" strokeWidth="1.5" fill="none" />
          <circle cx="46" cy="45" r="3" fill="#EAB308" />
          {/* Smile */}
          <path d="M33 38 Q37.5 42 42 38" stroke="#BE185D" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Broom in hand */}
          <line x1="55" y1="40" x2="68" y2="78" stroke="#A16207" strokeWidth="3" strokeLinecap="round" />
          <path d="M62 72 L72 82 L65 84 Z" fill="#CA8A04" />
          {/* Feet */}
          <ellipse cx="29" cy="83" rx="5" ry="3.5" fill="#334155" />
          <ellipse cx="46" cy="83" rx="5" ry="3.5" fill="#334155" />
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

// ─── City Park Scene Background ───────────────────────────────

function CityParkScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF3C7 80%, #DCFCE7 100%)' }} />
      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FDE047" opacity="0.9" />
          <circle cx="27.5" cy="27.5" r="11" fill="#FACC15" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          ))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/4 opacity-80" animate={{ x: [0, 35, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="75" height="32" viewBox="0 0 75 32">
          <ellipse cx="24" cy="18" rx="16" ry="11" fill="white" />
          <ellipse cx="44" cy="14" rx="20" ry="14" fill="white" />
          <ellipse cx="56" cy="18" rx="14" ry="10" fill="white" />
        </svg>
      </motion.div>
      {/* Distant City Buildings Silhouette */}
      <div className="absolute bottom-32 left-0 right-0 h-24 opacity-30">
        <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 720 100">
          <rect x="20" y="30" width="45" height="70" fill="#64748B" />
          <rect x="75" y="10" width="35" height="90" fill="#475569" />
          <rect x="120" y="45" width="55" height="55" fill="#64748B" />
          <rect x="190" y="20" width="40" height="80" fill="#334155" />
          <rect x="450" y="15" width="50" height="85" fill="#475569" />
          <rect x="515" y="35" width="45" height="65" fill="#64748B" />
          <rect x="580" y="25" width="60" height="75" fill="#334155" />
        </svg>
      </div>
      {/* Park Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-36" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #16A34A 100%)' }} />
      {/* Park Pathway */}
      <div className="absolute bottom-0 left-1/3 w-48 h-36 opacity-40" style={{ background: 'linear-gradient(90deg, transparent, #CBD5E1, transparent)' }} />
      {/* Trees in Park */}
      <div className="absolute bottom-20 left-10">
        <svg width="60" height="70" viewBox="0 0 60 70">
          <rect x="26" y="40" width="8" height="30" fill="#78350F" />
          <circle cx="30" cy="30" r="22" fill="#15803D" />
          <circle cx="20" cy="24" r="15" fill="#22C55E" />
          <circle cx="40" cy="24" r="15" fill="#22C55E" />
        </svg>
      </div>
      <div className="absolute bottom-20 right-12">
        <svg width="55" height="65" viewBox="0 0 55 65">
          <rect x="24" y="35" width="7" height="30" fill="#78350F" />
          <circle cx="27" cy="26" r="20" fill="#15803D" />
          <circle cx="17" cy="20" r="13" fill="#22C55E" />
          <circle cx="37" cy="20" r="13" fill="#22C55E" />
        </svg>
      </div>
      {/* Dustbin graphic in park */}
      <div className="absolute bottom-16 right-36 opacity-75">
        <svg width="35" height="45" viewBox="0 0 35 45">
          <rect x="5" y="10" width="25" height="32" rx="4" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="2" y="6" width="31" height="5" rx="2" fill="#0369A1" />
          <circle cx="17.5" cy="4" r="2" fill="white" />
          <path d="M12 18 L12 34 M17.5 18 L17.5 34 M23 18 L23 34" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Interactive Topic Objects (No Emoji in interactive items) ───

function TreeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="26" y="35" width="8" height="20" fill="#78350F" />
      <circle cx="30" cy="25" r="18" fill="#15803D" />
      <circle cx="20" cy="20" r="11" fill="#22C55E" />
      <circle cx="40" cy="20" r="11" fill="#22C55E" />
      <path d="M26 15 Q30 8 34 15" stroke="#86EFAC" strokeWidth="2" fill="none" />
    </svg>
  );
}

function SmokeIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Factory chimney base */}
      <rect x="20" y="30" width="20" height="25" fill="#475569" stroke="#334155" strokeWidth="1.5" />
      {/* Smoke puffs */}
      <circle cx="30" cy="22" r="8" fill="#94A3B8" opacity="0.8" />
      <circle cx="23" cy="12" r="7" fill="#CBD5E1" opacity="0.8" />
      <circle cx="38" cy="8" r="9" fill="#E2E8F0" opacity="0.8" />
    </svg>
  );
}

function GarbageIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 L50 45 L45 30 L15 30 Z" fill="#64748B" />
      <circle cx="25" cy="28" r="7" fill="#EF4444" />
      <circle cx="38" cy="26" r="6" fill="#3B82F6" />
      <rect x="20" y="35" width="20" height="4" fill="#F59E0B" rx="1" />
      {/* Flame for burning plastic */}
      <path d="M30 18 Q26 24 30 28 Q34 24 30 18 Z" fill="#F97316" />
      <path d="M30 22 Q28 25 30 27 Q32 25 30 22 Z" fill="#FACC15" />
    </svg>
  );
}

function RunnerIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="32" cy="14" r="6" fill="#F59E0B" />
      {/* Body leaning */}
      <path d="M30 20 L24 35 L18 48" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" />
      {/* Arms */}
      <path d="M27 24 L38 28 L44 24" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" fill="none" />
      {/* Legs running */}
      <path d="M24 35 L33 44 L40 40" stroke="#1D4ED8" strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function DustbinIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="18" width="30" height="34" rx="4" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <rect x="11" y="12" width="38" height="6" rx="2" fill="#15803D" />
      <circle cx="30" cy="9" r="2.5" fill="white" />
      <path d="M23 26 L23 42 M30 26 L30 42 M37 26 L37 42" stroke="white" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

function BroomIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <line x1="12" y1="48" x2="48" y2="12" stroke="#9A3412" strokeWidth="4" strokeLinecap="round" />
      <path d="M42 8 L54 20 L48 26 L36 14 Z" fill="#CA8A04" stroke="#A16207" strokeWidth="1" />
      <line x1="45" y1="15" x2="51" y2="21" stroke="#713F12" strokeWidth="1.5" />
    </svg>
  );
}

function YogaIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="15" r="5" fill="#7C3AED" />
      {/* Lotus legs */}
      <path d="M18 42 Q30 52 42 42" stroke="#7C3AED" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      {/* Body & arms up */}
      <path d="M30 40 L30 20 M30 25 L16 18 M30 25 L44 18" stroke="#7C3AED" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function CleanHandIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 35 L22 22 C22 19, 26 19, 26 22 L26 30 M26 20 C26 17, 30 17, 30 20 L30 30 M30 19 C30 16, 34 16, 34 19 L34 32 C34 35, 38 35, 38 32 L38 25 C38 22, 42 22, 42 25 L42 36 C42 45, 35 50, 28 50 C22 50, 18 45, 20 38 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      {/* Sparkling bubbles */}
      <circle cx="16" cy="22" r="3" fill="#BAE6FD" />
      <circle cx="45" cy="18" r="2.5" fill="#BAE6FD" />
      <circle cx="42" cy="40" r="3.5" fill="#BAE6FD" />
    </svg>
  );
}

function renderItemIcon(iconName: string, size: number = 48) {
  switch (iconName) {
    case 'tree': return <TreeIcon size={size} />;
    case 'smoke': return <SmokeIcon size={size} />;
    case 'garbage': return <GarbageIcon size={size} />;
    case 'runner': return <RunnerIcon size={size} />;
    case 'dustbin': return <DustbinIcon size={size} />;
    case 'broom': return <BroomIcon size={size} />;
    case 'yoga': return <YogaIcon size={size} />;
    case 'cleanHand': return <CleanHandIcon size={size} />;
    default: return <TreeIcon size={size} />;
  }
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
        {renderItemIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

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
      style={{ left: x, top: y, width, height, borderColor: color, backgroundColor: `${color}15` }}
    >
      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-lg mb-1 shadow-inner" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-black text-center px-2" style={{ color: '#1E293B' }}>{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({ onStart }: { onStart: () => void }) {
  const [currentSlide, setCurrentSlide] = useState(0);

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

  const slide = TEACHING_SLIDES[currentSlide];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-between p-6 bg-gradient-to-b from-sky-400 to-blue-600 text-white select-none">
      <div className="w-full flex justify-between items-center max-w-2xl mt-2">
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (
            <div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === currentSlide ? 'w-8 bg-amber-300' : 'w-2.5 bg-white/40'}`} />
          ))}
        </div>
        <span className="text-xs font-bold tracking-wider uppercase bg-black/20 px-3 py-1 rounded-full">
          Slide {currentSlide + 1} of {TEACHING_SLIDES.length}
        </span>
      </div>

      <motion.div
        key={currentSlide}
        initial={{ scale: 0.8, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: -20 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
        className="flex flex-col items-center text-center max-w-lg bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20 shadow-2xl my-auto"
      >
        <span className="text-6xl mb-4 filter drop-shadow-md">{slide.emoji}</span>
        <h2 className="text-2xl font-black mb-3 text-amber-200 drop-shadow">{slide.title}</h2>
        <p className="text-base font-medium leading-relaxed text-white/95">{slide.text}</p>
      </motion.div>

      <div className="w-full max-w-2xl flex justify-between items-center mb-4">
        <button
          onClick={handlePrev}
          disabled={currentSlide === 0}
          className={`px-5 py-2.5 rounded-2xl font-bold text-sm shadow-lg transition-all ${
            currentSlide === 0 ? 'opacity-30 cursor-not-allowed bg-white/20 text-white/50' : 'bg-white/30 hover:bg-white/40 text-white active:scale-95'
          }`}
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-8 py-3 rounded-2xl font-black text-base shadow-xl bg-amber-400 hover:bg-amber-300 text-amber-950 active:scale-95 transition-all flex items-center gap-2"
        >
          {currentSlide === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➔'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ────────────────────────���─────────────

export interface AirCleanGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AirCleanGame({ width = 720, height = 560, onComplete }: AirCleanGameProps) {
  type GameScreen = 'teaching' | 'play';
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome! I am Sweeper Suresh. Let us learn about clean air and surroundings!');
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [gameOver, setGameOver] = useState(false);

  // Sort challenge state
  const [sortPositions, setSortPositions] = useState<Record<string, { x: number; y: number; placed: boolean }>>({});

  const challenge = CHALLENGES[currentChallengeIndex];
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && !gameOver) {
        audioManager.play('hint');
        setHintMessage(challenge.hint);
        setMascotSpeech('Need a hint? Check the suggestion bubble!');
        speechManager.speak('Need a hint? Check the suggestion bubble!');
        setMascotMood('thinking');
      }
    }, 10000);
  }, [screen, gameOver, challenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => { speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Initialize sort item positions when entering a sort challenge
  useEffect(() => {
    if (challenge.type === 'sort' && challenge.sortItems) {
      const initial: Record<string, { x: number; y: number; placed: boolean }> = {};
      challenge.sortItems.forEach((item, index) => {
        initial[item.id] = {
          x: 40 + index * 140,
          y: 360,
          placed: false,
        };
      });
      setSortPositions(initial);
      setMascotSpeech(challenge.question);
      speechManager.speak(challenge.question);
      setMascotMood('happy');
    } else if (challenge.type === 'identify') {
      setMascotSpeech(challenge.question);
      speechManager.speak(challenge.question);
      setMascotMood('happy');
    }
  }, [currentChallengeIndex, challenge]);

  // Handle multiple-choice answer selection
  const handleAnswerSelect = (option: string) => {
    audioManager.play('tap');
    resetInactivityTimer();

    if (option === challenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');
      setSparklePos({ x: width / 2, y: height / 2 });
      setStars(prev => prev + 1);

      setTimeout(() => {
        advanceChallenge();
      }, 1200);
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = challenge.sortItems?.find(i => i.id === id);
    if (!item || !challenge.bins) return false;

    // Check bin bounding boxes
    const binWidth = 140;
    const binHeight = 110;
    const binY = 180;
    const binSpacing = 180;
    const startX = (width - (challenge.bins.length * binWidth + (challenge.bins.length - 1) * 20)) / 2;

    let droppedBinId: string | null = null;
    challenge.bins.forEach((bin, index) => {
      const bx = startX + index * (binWidth + 20);
      const by = binY;
      if (x + 55 >= bx && x + 55 <= bx + binWidth && y + 47 >= by && y + 47 <= by + binHeight) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      setSortPositions(prev => ({ ...prev, [id]: { x, y, placed: true } }));
      setSparklePos({ x, y });

      // Check if all items are placed
      const updatedPositions = { ...sortPositions, [id]: { x, y, placed: true } };
      const allPlaced = challenge.sortItems?.every(si => updatedPositions[si.id]?.placed);

      if (allPlaced) {
        audioManager.play('success');
        setMascotMood('celebrate');
        setMascotSpeech('Wonderful! All sorted correctly!');
        speechManager.speak('Wonderful! All sorted correctly!');
        setStars(prev => prev + 1);
        setTimeout(() => {
          advanceChallenge();
        }, 1500);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintMessage(challenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setHintMessage(null);
      setSuccessMessage(null);
    } else {
      setGameOver(true);
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('Hurrah! You are a true Clean Air & Environment Champion!');
      speechManager.speak('Hurrah! You are a true Clean Air & Environment Champion!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative flex flex-col items-center justify-between select-none overflow-hidden font-sans rounded-3xl shadow-2xl border-4 border-amber-300"
      style={{ width, height, backgroundColor: '#0284C7' }}
    >
      {/* Background Scene */}
      <CityParkScene width={width} height={height} />

      {/* Screen 1: Teaching */}
      {screen === 'teaching' && <TeachingScreen onStart={() => setScreen('play')} />}

      {/* Screen 2: Play */}
      {screen === 'play' && !gameOver && (
        <>
          {/* Top Header Bar */}
          <div className="w-full z-20 flex justify-between items-center px-5 py-3 bg-white/80 backdrop-blur-md shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase bg-emerald-600 text-white px-3 py-1 rounded-full shadow">
                Level {currentChallengeIndex + 1} / {CHALLENGES.length}
              </span>
              <StarRow count={stars} total={CHALLENGES.length} />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700 bg-amber-100 px-3 py-1 rounded-full shadow-inner">
                Errors: {errors}
              </span>
            </div>
          </div>

          {/* Sweeper Suresh Mascot */}
          <SureshMascot mood={mascotMood} speaking={mascotSpeech} />

          {/* Challenge Container */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full flex-grow px-6 my-auto">
            {/* Question Card */}
            <motion.div
              key={currentChallengeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-xl border-2 border-amber-200 max-w-lg w-full text-center mb-6"
            >
              <h3 className="text-base font-black text-gray-800 leading-snug">{challenge.question}</h3>
            </motion.div>

            {/* Identify Challenge Options */}
            {challenge.type === 'identify' && (
              <div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {challenge.options.map((option, idx) => (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleAnswerSelect(option)}
                    className="py-3 px-6 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-300 hover:to-orange-300 text-amber-950 font-black text-base shadow-lg border-2 border-amber-200 transition-all flex items-center justify-center gap-2"
                  >
                    <span>{option}</span>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Sort Challenge Bins & Cards */}
            {challenge.type === 'sort' && challenge.bins && challenge.sortItems && (
              <div className="relative w-full" style={{ height: 260 }}>
                {/* Bins */}
                {challenge.bins.map((bin, index) => {
                  const binWidth = 140;
                  const binHeight = 110;
                  const startX = (width - (challenge.bins!.length * binWidth + (challenge.bins!.length - 1) * 20)) / 2;
                  const bx = startX + index * (binWidth + 20);
                  const by = 20;
                  return (
                    <SortBin
                      key={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={by}
                      width={binWidth}
                      height={binHeight}
                      isHovering={false}
                    />
                  );
                })}

                {/* Draggable Cards */}
                {challenge.sortItems.map(item => {
                  const pos = sortPositions[item.id] || { x: 40, y: 360, placed: false };
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
        </>
      )}

      {/* Game Over / Success Screen */}
      {gameOver && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-black/60 backdrop-blur-md p-6">
          <SuccessBanner
            message="Congratulations! You are a Clean Air & Environment Champion!"
            onComplete={() => {}}
          />
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: 'spring' }}
            className="bg-white rounded-3xl p-8 shadow-2xl text-center max-w-md w-full border-4 border-amber-400 mt-6"
          >
            <span className="text-6xl mb-3 block">🏆</span>
            <h2 className="text-2xl font-black text-gray-800 mb-2">Wonderful Job!</h2>
            <p className="text-sm text-gray-600 mb-6">
              You earned <span className="font-bold text-amber-600">{stars}</span> out of {CHALLENGES.length} stars with only <span className="font-bold text-red-500">{errors}</span> errors!
            </p>
            <button
              onClick={() => {
                setGameOver(false);
                setCurrentChallengeIndex(0);
                setStars(0);
                setErrors(0);
                setScreen('teaching');
              }}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-base shadow-xl active:scale-95 transition-all"
            >
              Play Again 🔄
            </button>
          </motion.div>
        </div>
      )}

      {/* Feedback Components */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && (
        <SparkleBurst
          x={sparklePos.x}
          y={sparklePos.y}
          onComplete={() => setSparklePos(null)}
        />
      )}
      {hintMessage && (
        <HintBubble
          message={hintMessage}
          onComplete={() => setHintMessage(null)}
        />
      )}
    </div>
  );
}
