'use client';

/**
 * HealthGame — Learn about personal cleanliness, healthy body (food, rest, exercise),
 * and clean surroundings & public health for Class 3 students (ICSE/CISCE curriculum).
 *
 * CISCE Nodes: c3_bio_021 (Personal cleanliness), c3_bio_022 (Healthy body through food, rest, exercise),
 *              c3_bio_023 (Clean surroundings and public health)
 * Enrichment: c3_biology_enrichment_part21-23
 *
 * ELI5: "Personal cleanliness, healthy food, rest, and clean surroundings keep you strong,
 *   germ-free, and happy! Wash hands with soap, brush teeth twice daily, eat fresh fruits
 *   and vegetables, sleep 8-10 hours, play outside, and keep your surroundings clean!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG clinic & park scene background
 * - Custom SVG mascot: Nurse Nirmala (friendly nurse with first-aid kit and thermometer)
 * - Custom SVG topic objects (Soap, Toothbrush, Comb, NailCutter, Towel, Apple, Vegetable,
 *   Running, Sleep, WaterGlass, Dustbin, MosquitoNet, JunkFood, Germ)
 * - 8 progressive challenges: multiple choice & drag-and-drop sorting
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API (speechManager)
 * - Procedural sound effects via audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity
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
    title: 'Personal Cleanliness! 🧼',
    text: 'Keep your body clean to stop invisible germs! Wash hands with soap before eating and after toilet. Brush your teeth twice a day. Bathe daily, wear clean clothes, and trim your nails!',
    emoji: '🧼',
    bgColor: 'from-gold-400 to-gold-500',
    spoken: 'Keep your body clean to stop invisible germs! Wash hands with soap before eating and after toilet. Brush your teeth twice a day. Bathe daily, wear clean clothes, and trim your nails!',
  },
  {
    title: 'Food, Rest & Exercise! 🍎',
    text: 'Eat healthy food like fresh fruits, vegetables, rice, dal, and milk! Avoid junk food. Sleep for 8 to 10 hours so your body repairs and grows. Play outside and exercise daily!',
    emoji: '🍎',
    bgColor: 'from-emerald-400 to-green-500',
    spoken: 'Eat healthy food like fresh fruits, vegetables, rice, dal, and milk! Avoid junk food. Sleep for 8 to 10 hours so your body repairs and grows. Play outside and exercise daily!',
  },
  {
    title: 'Clean Surroundings! 🗑️',
    text: 'Keep your home, school, and neighborhood clean! Throw garbage in covered dustbins. Never litter or spit in public. Use cloth bags instead of plastic polythene bags!',
    emoji: '🗑️',
    bgColor: 'from-teal-400 to-gold-600',
    spoken: 'Keep your home, school, and neighborhood clean! Throw garbage in covered dustbins. Never litter or spit in public. Use cloth bags instead of plastic polythene bags!',
  },
  {
    title: 'Beware of Mosquitoes! 🦟',
    text: 'Stagnant water in old tires, pots, and open drains is where mosquitoes breed! Mosquitoes spread diseases like malaria and dengue. Keep water covered and drains clear!',
    emoji: '🦟',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'Stagnant water in old tires, pots, and open drains is where mosquitoes breed! Mosquitoes spread diseases like malaria and dengue. Keep water covered and drains clear!',
  },
  {
    title: 'Public Health Champions! 🌟',
    text: 'Public health means the health of the whole community! When everyone keeps themselves and their surroundings clean, everyone stays healthy and happy. Be a Cleanliness Champion!',
    emoji: '🌟',
    bgColor: 'from-gold-400 to-purple-500',
    spoken: 'Public health means the health of the whole community! When everyone keeps themselves and their surroundings clean, everyone stays healthy and happy. Be a Cleanliness Champion!',
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
    question: 'How often should you brush your teeth?',
    answer: 'Twice a day — morning and night',
    options: ['Twice a day — morning and night', 'Once a week', 'Only when teeth hurt'],
    hint: 'Think: when do you brush? Once after waking up and once before going to bed!',
    misconception: 'Brushing once a day is NOT enough! You must brush your teeth at least twice a day — in the morning and before bed — to stop bacteria from causing cavities.',
  },
  {
    type: 'identify',
    question: 'When should you wash your hands with soap?',
    answer: 'Before eating and after using the toilet',
    options: ['Before eating and after using the toilet', 'Only on Sundays', 'Never wash with soap'],
    hint: 'Think: where do germs hide? They enter through hands during meals and after using the toilet!',
    misconception: 'Washing hands with only water is NOT enough! Water alone cannot remove oily dirt and bacteria. Always use soap and rub between your fingers!',
  },
  {
    type: 'sort',
    question: 'Drag each personal cleanliness habit to Good or Bad!',
    answer: 'sort',
    options: [],
    hint: 'Good habits: brushing twice, washing hands, bathing daily, trimming nails! Bad: skipping bath, eating with dirty hands!',
    misconception: 'Personal cleanliness requires daily care! Skipping baths or eating with dirty hands allows invisible germs to enter your body and cause illness like diarrhoea.',
    sortItems: [
      { id: 'brush', label: 'Brush twice daily', icon: 'toothbrush', correctBin: 'good' },
      { id: 'wash', label: 'Wash hands with soap', icon: 'soap', correctBin: 'good' },
      { id: 'bathe', label: 'Bathe daily', icon: 'towel', correctBin: 'good' },
      { id: 'skip-bath', label: 'Skip bath & wear dirty clothes', icon: 'germ', correctBin: 'bad' },
    ],
    bins: [
      { id: 'good', label: 'Good Habit ✅', color: '#22C55E' },
      { id: 'bad', label: 'Bad Habit ❌', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a HEALTHY food choice?',
    answer: 'Fresh fruits and vegetables',
    options: ['Fresh fruits and vegetables', 'Chips and cola', 'Only sweets and chocolates'],
    hint: 'Your body needs good fuel! Fruits and vegetables give vitamins and energy.',
    misconception: 'Junk food like chips and cola do NOT give healthy nutrition! They have empty calories. Fresh fruits, vegetables, dal, rice, and milk build a strong body.',
  },
  {
    type: 'sort',
    question: 'Drag each item to Keep Body Healthy or Harm Body!',
    answer: 'sort',
    options: [],
    hint: 'Healthy: eating fruits, sleeping 8 hours, exercising! Harm: junk food, staying up late, dirty water!',
    misconception: 'Good food, rest, and exercise work together! If you eat well but never sleep or exercise, or if you eat junk food and drink dirty water, your body becomes weak.',
    sortItems: [
      { id: 'apple', label: 'Fresh Apple', icon: 'apple', correctBin: 'healthy' },
      { id: 'sleep', label: 'Sleep 8-10 hours', icon: 'sleep', correctBin: 'healthy' },
      { id: 'junk', label: 'Junk food & cola', icon: 'junk', correctBin: 'harm' },
      { id: 'dirty-water', label: 'Drink dirty water', icon: 'germ', correctBin: 'harm' },
    ],
    bins: [
      { id: 'healthy', label: 'Healthy Body 🌟', color: '#22C55E' },
      { id: 'harm', label: 'Harm Body ⚠️', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'How many hours of sleep does a Class 3 child need every night?',
    answer: '8-10 hours',
    options: ['8-10 hours', '2 hours', '15 hours'],
    hint: 'Sleep charges your body battery! Children need a full night of rest.',
    misconception: 'Sleep is NOT a waste of time! During sleep, your body repairs tired muscles, stores energy, and helps your brain grow. Children need 8 to 10 hours of sleep.',
  },
  {
    type: 'sort',
    question: 'Drag each action to Clean Surroundings or Dirty Surroundings!',
    answer: 'sort',
    options: [],
    hint: 'Clean: throw garbage in dustbin, cover water! Dirty: littering on road, stagnant water breeding mosquitoes!',
    misconception: 'Stagnant water and open garbage are NOT harmless! Stagnant water in old pots and tires breeds mosquitoes that spread malaria and dengue.',
    sortItems: [
      { id: 'dustbin', label: 'Throw waste in dustbin', icon: 'dustbin', correctBin: 'clean' },
      { id: 'net', label: 'Use mosquito net', icon: 'net', correctBin: 'clean' },
      { id: 'litter', label: 'Litter on road', icon: 'germ', correctBin: 'dirty' },
      { id: 'stagnant', label: 'Stagnant water', icon: 'germ', correctBin: 'dirty' },
    ],
    bins: [
      { id: 'clean', label: 'Clean Surroundings 🏡', color: '#22C55E' },
      { id: 'dirty', label: 'Dirty Surroundings 🦠', color: '#EF4444' },
    ],
  },
  {
    type: 'sort',
    question: 'Drag each disease to its prevention method!',
    answer: 'sort',
    options: [],
    hint: 'Malaria needs mosquito nets! Diarrhoea needs clean drinking water! Colds need handwashing!',
    misconception: 'Diseases spread through germs, dirty water, and mosquito bites! You can prevent malaria by stopping stagnant water and using nets, and prevent diarrhoea by drinking clean water.',
    sortItems: [
      { id: 'malaria', label: 'Malaria prevention', icon: 'net', correctBin: 'net-bin' },
      { id: 'diarrhoea', label: 'Diarrhoea prevention', icon: 'water-glass', correctBin: 'water-bin' },
      { id: 'germs', label: 'Cold / Germ prevention', icon: 'soap', correctBin: 'soap-bin' },
    ],
    bins: [
      { id: 'net-bin', label: 'Mosquito Net 🦟', color: '#0284C7' },
      { id: 'water-bin', label: 'Clean Water 💧', color: '#10B981' },
      { id: 'soap-bin', label: 'Wash Hands 🧼', color: '#8B5CF6' },
    ],
  },
];

// ─── Nurse Nirmala Mascot Component ───────────────────────────

function NurseNirmala({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-pink-200"
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
            <linearGradient id="nurse-uniform" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="100%" stopColor="#BAE6FD" />
            </linearGradient>
            <radialGradient id="nurse-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FFEDD5" />
              <stop offset="100%" stopColor="#FED7AA" />
            </radialGradient>
          </defs>
          {/* Nurse Cap */}
          <path d="M22 20 L53 20 L48 8 L27 8 Z" fill="white" stroke="#CBD5E1" strokeWidth="1.5" />
          <circle cx="37.5" cy="14" r="5" fill="#EF4444" />
          <path d="M35 14 L40 14 M37.5 11.5 L37.5 16.5" stroke="white" strokeWidth="2" strokeLinecap="round" />

          {/* Head & Face */}
          <circle cx="37.5" cy="35" r="18" fill="url(#nurse-face)" stroke="#FDBA74" strokeWidth="1" />

          {/* Eyes */}
          <circle cx="31" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="44" cy="33" r="2.5" fill="#1E293B" />
          <circle cx="32" cy="32" r="1" fill="white" />
          <circle cx="45" cy="32" r="1" fill="white" />

          {/* Smile */}
          <path d="M32 40 Q37.5 45 43 40" stroke="#C2410C" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Body / Uniform */}
          <path d="M20 52 C20 48, 25 45, 37.5 45 C50 45, 55 48, 55 52 L60 82 L15 82 Z" fill="url(#nurse-uniform)" stroke="#0284C7" strokeWidth="1.5" />

          {/* Red Cross on Uniform */}
          <rect x="34" y="55" width="7" height="7" fill="white" rx="1" />
          <rect x="36.5" y="53" width="2" height="11" fill="#EF4444" />
          <rect x="32" y="57.5" width="11" height="2" fill="#EF4444" />

          {/* Stethoscope around neck */}
          <path d="M28 45 Q37.5 55 47 45" stroke="#64748B" strokeWidth="2" fill="none" />
          <circle cx="37.5" cy="55" r="3" fill="#334155" />

          {/* Feet */}
          <ellipse cx="28" cy="85" rx="5" ry="3" fill="#334155" />
          <ellipse cx="47" cy="85" rx="5" ry="3" fill="#334155" />
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Scene Background Component ───────────────────────────────

function HealthSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="clinic-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="40%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
          <linearGradient id="roof-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F87171" />
            <stop offset="100%" stopColor="#DC2626" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#clinic-sky)" />
      </svg>

      {/* Sun */}
      <div className="absolute top-4 left-6">
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="18" fill="#FACC15" opacity="0.9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="27.5" y1="27.5" x2={27.5 + 25 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 25 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </div>

      {/* Health Clinic Building in Background */}
      <div className="absolute bottom-24 left-10 opacity-80">
        <svg width="140" height="120" viewBox="0 0 140 120">
          <rect x="20" y="40" width="100" height="80" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="2" />
          <polygon points="10,40 70,10 130,40" fill="url(#roof-grad)" />
          {/* Medical Cross on Roof */}
          <rect x="63" y="18" width="14" height="14" fill="white" rx="2" />
          <rect x="68" y="15" width="4" height="20" fill="#EF4444" />
          <rect x="60" y="23" width="20" height="4" fill="#EF4444" />
          {/* Windows & Door */}
          <rect x="35" y="55" width="20" height="25" fill="#BAE6FD" rx="2" />
          <rect x="85" y="55" width="20" height="25" fill="#BAE6FD" rx="2" />
          <rect x="55" y="80" width="30" height="40" fill="#94A3B8" rx="2" />
        </svg>
      </div>

      {/* Ground Grass */}
      <div className="absolute bottom-0 left-0 right-0 h-24" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #22C55E 100%)' }} />
    </div>
  );
}

// ─── Custom SVG Topic Icons ───────────────────────────────────

function SoapIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="24" rx="10" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <ellipse cx="25" cy="28" rx="8" ry="4" fill="white" opacity="0.6" />
      <path d="M35 18 C33 14, 38 12, 40 15 C42 12, 47 14, 45 18 Z" fill="white" opacity="0.8" />
    </svg>
  );
}

function ToothbrushIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 L45 15 L48 18 L13 48 Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
      <rect x="42" y="10" width="10" height="8" rx="2" fill="#F43F5E" />
      <path d="M44 8 L46 6 L48 8" stroke="white" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function CombIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="22" width="30" height="12" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
      {[20, 25, 30, 35, 40].map(x => (
        <line key={x} x1={x} y1="34" x2={x} y2="45" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function TowelIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="12" width="30" height="36" rx="4" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5" />
      <line x1="15" y1="20" x2="45" y2="20" stroke="#F472B6" strokeWidth="3" />
      <line x1="15" y1="40" x2="45" y2="40" stroke="#F472B6" strokeWidth="3" />
    </svg>
  );
}

function AppleIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 C20 15, 15 25, 15 35 C15 45, 22 50, 30 50 C38 50, 45 45, 45 35 C45 25, 40 15, 30 15 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
      <path d="M30 15 Q35 8, 40 10" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M32 11 Q38 12, 35 17 Z" fill="#22C55E" />
    </svg>
  );
}

function SleepIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="32" width="40" height="16" rx="4" fill="#6366F1" stroke="#4338CA" strokeWidth="1.5" />
      <circle cx="22" cy="28" r="8" fill="#FED7AA" />
      <path d="M19 27 Q22 30, 25 27" stroke="#1E293B" strokeWidth="1.5" fill="none" />
      <text x="35" y="20" fontSize="16" fontWeight="bold" fill="#3B82F6">z Z z</text>
    </svg>
  );
}

function JunkIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="18,20 42,20 48,50 12,50" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      <text x="21" y="38" fontSize="11" fontWeight="bold" fill="white">CHIPS</text>
      <circle cx="42" cy="18" r="8" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
      <text x="38" y="21" fontSize="9" fontWeight="bold" fill="white">COLA</text>
    </svg>
  );
}

function GermIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="14" fill="#10B981" stroke="#047857" strokeWidth="1.5" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1={30 + 10 * Math.cos(angle * Math.PI / 180)} y1={30 + 10 * Math.sin(angle * Math.PI / 180)} x2={30 + 18 * Math.cos(angle * Math.PI / 180)} y2={30 + 18 * Math.sin(angle * Math.PI / 180)} stroke="#047857" strokeWidth="2.5" strokeLinecap="round" />
      ))}
      <circle cx="26" cy="27" r="2" fill="white" />
      <circle cx="34" cy="27" r="2" fill="white" />
    </svg>
  );
}

function DustbinIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="18" width="24" height="30" rx="3" fill="#64748B" stroke="#334155" strokeWidth="1.5" />
      <rect x="14" y="14" width="32" height="5" rx="2" fill="#475569" />
      <line x1="24" y1="25" x2="24" y2="40" stroke="#94A3B8" strokeWidth="2" />
      <line x1="30" y1="25" x2="30" y2="40" stroke="#94A3B8" strokeWidth="2" />
      <line x1="36" y1="25" x2="36" y2="40" stroke="#94A3B8" strokeWidth="2" />
    </svg>
  );
}

function MosquitoNetIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 L50 48 L10 48 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="1.5" opacity="0.8" />
      <circle cx="30" cy="10" r="4" fill="#3B82F6" />
      <path d="M20 30 Q30 25, 40 30" stroke="#94A3B8" strokeWidth="1" fill="none" />
      <path d="M15 40 Q30 35, 45 40" stroke="#94A3B8" strokeWidth="1" fill="none" />
    </svg>
  );
}

function WaterGlassIcon({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 15 L42 15 L38 45 L22 45 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
      <path d="M20 25 L40 25 L38 43 L22 43 Z" fill="#38BDF8" opacity="0.7" />
    </svg>
  );
}

// ─── Render Icon Helper ───────────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'soap': return <SoapIcon size={size} />;
    case 'toothbrush': return <ToothbrushIcon size={size} />;
    case 'comb': return <CombIcon size={size} />;
    case 'towel': return <TowelIcon size={size} />;
    case 'apple': return <AppleIcon size={size} />;
    case 'sleep': return <SleepIcon size={size} />;
    case 'junk': return <JunkIcon size={size} />;
    case 'germ': return <GermIcon size={size} />;
    case 'dustbin': return <DustbinIcon size={size} />;
    case 'net': return <MosquitoNetIcon size={size} />;
    case 'water-glass': return <WaterGlassIcon size={size} />;
    default: return <SoapIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-gold-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
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
  isHovering?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-3 shadow-md transition-all ${
        isHovering ? 'scale-105 shadow-xl' : ''
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        borderColor: color,
        backgroundColor: `${color}15`,
      }}
    >
      <div className="text-xs sm:text-sm font-extrabold text-center" style={{ color }}>
        {label}
      </div>
    </div>
  );
}

// ─── Main Game Component ─────────────────────────────────────

export interface HealthGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function HealthGame({ width = 720, height = 560, onComplete }: HealthGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [spokenText, setSpokenText] = useState<string | null>(null);

  // Feedback states
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
  const [cardPositions, setCardPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [hoveredBin, setHoveredBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Initialize card positions on challenge change
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        initialPos[item.id] = { x: 30 + (idx % 2) * 130, y: 310 + Math.floor(idx / 2) * 105 };
        initialPlaced[item.id] = false;
      });
      setCardPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [challengeIdx, currentChallenge]);

  // Speech and audio for teaching slides
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setSpokenText(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Speech and audio for challenges
  useEffect(() => {
    if (screen === 'play') {
      setSpokenText(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
    }
  }, [screen, challengeIdx, currentChallenge]);

  // Inactivity hint timer
  useEffect(() => {
    if (screen === 'play') {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
          if (screen === 'play') {
            handleShowHint();
          }
        }, 10000);
    }
    return () => {
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [screen, challengeIdx]);

  // Cleanup speech on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  const handleShowHint = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotMood('thinking');
    setSpokenText(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  const handleAnswerClick = (option: string) => {
    if (option === currentChallenge.answer) {
      // Correct!
      audioManager.play('success');
      setMascotMood('celebrate');
      setSparklePos({ x: width / 2, y: height / 2 });
      setSuccessMsg('Correct! Great job! 🎉');
      setScore(prev => prev + 15);
      setSpokenText('Correct! Great job!');
      speechManager.speak('Correct! Great job!');
    } else {
      // Wrong!
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMsg(currentChallenge.misconception);
      setSpokenText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bins collision
    let droppedInBin: string | null = null;
    const binWidth = 140;
    const binHeight = 90;

    currentChallenge.bins.forEach((bin, idx) => {
      // Bins placed horizontally in upper area
      const binX = 50 + idx * 165;
      const binY = 160;
      if (x + 55 >= binX && x + 55 <= binX + binWidth && y + 45 >= binY && y + 45 <= binY + binHeight) {
        droppedInBin = bin.id;
      }
    });

    if (droppedInBin && droppedInBin === item.correctBin) {
      // Correct bin!
      audioManager.play('drop-correct');
      setSparklePos({ x, y });

      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);

      const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);
      if (allDone) {
        setShowConfetti(true);
        audioManager.play('celebration');
        setMascotMood('celebrate');
        setSuccessMsg('Wonderful! All sorted correctly! 🌟');
        setScore(prev => prev + 25);
        setSpokenText('Wonderful! All sorted correctly!');
        speechManager.speak('Wonderful! All sorted correctly!');
      }
      return true;
    } else {
      // Wrong bin or outside
      audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setHintMsg(currentChallenge.misconception);
      setSpokenText(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  const handleNextChallenge = () => {
    setSuccessMsg(null);
    setHintMsg(null);
    setSparklePos(null);
    setMascotMood('happy');

    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
    } else {
      // All challenges complete!
      setShowConfetti(true);
      audioManager.play('celebration');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 font-sans"
      style={{ width, height }}
    >
      <HealthSceneBackground width={width} height={height} />
      <NurseNirmala mood={mascotMood} speaking={spokenText} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-6 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <span className="text-xl font-extrabold text-gold-800">🏥 Health & Cleanliness Game</span>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-gray-700">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
            <StarRow count={Math.min(3, Math.floor(score / 30) + 1)} total={3} />
          </div>
        )}
      </div>

      {/* ─── TEACHING SCREEN ───────────────────────────────────── */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 px-8 pb-8 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-xl bg-white/95 backdrop-blur rounded-3xl p-6 shadow-xl border-4 border-gold-300 flex flex-col items-center text-center">
            <div className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black text-gold-900 mb-2">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium text-gray-700 leading-relaxed mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            {/* Slide dots */}
            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-gold-600 w-6' : 'bg-gray-300'}`}
                />
              ))}
            </div>

            <div className="flex gap-4 w-full justify-between">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-6 py-2.5 rounded-xl font-bold text-white shadow transition-all ${
                  slideIdx === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-slate-500 hover:bg-slate-600'
                }`}
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
                className="px-8 py-2.5 rounded-xl font-bold text-white bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-700 hover:to-gold-600 shadow-lg"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Playing! 🚀' : 'Next ➜'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ───────────────────────────────────────── */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 px-6 pb-6 flex flex-col items-center justify-between z-10">
          {/* Question Box */}
          <div className="w-full max-w-xl bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border-2 border-gold-300 flex flex-col items-center text-center">
            <h3 className="text-lg font-black text-gray-900 mb-1">{currentChallenge.question}</h3>
            <button
              onClick={handleShowHint}
              className="text-xs font-bold text-gold-600 hover:text-gold-800 underline mt-1"
            >
              Need a hint? 💡
            </button>
          </div>

          {/* Multiple Choice Options */}
          {currentChallenge.type === 'identify' && (
            <div className="w-full max-w-xl flex flex-col gap-3 my-auto">
              {currentChallenge.options.map((option, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleAnswerClick(option)}
                  className="w-full py-3.5 px-6 rounded-2xl bg-white/95 hover:bg-gold-50 shadow-md font-bold text-gray-800 text-left border-2 border-gold-200 transition-all flex items-center justify-between"
                >
                  <span>{option}</span>
                  <div className="w-6 h-6 rounded-full border-2 border-gold-300 flex items-center justify-center text-xs font-extrabold text-gold-600">
                    {String.fromCharCode(65 + idx)}
                  </div>
                </motion.button>
              ))}
            </div>
          )}

          {/* Sort Challenge Area */}
          {currentChallenge.type === 'sort' && currentChallenge.sortItems && currentChallenge.bins && (
            <div className="w-full max-w-2xl h-80 relative my-auto">
              {/* Bins */}
              {currentChallenge.bins.map((bin, idx) => {
                const binWidth = currentChallenge.bins?.length === 3 ? 140 : 220;
                const binX = currentChallenge.bins?.length === 3 ? 30 + idx * 165 : 60 + idx * 260;
                return (
                  <SortBin
                    key={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={binX}
                    y={160}
                    width={binWidth}
                    height={95}
                    isHovering={hoveredBin === bin.id}
                  />
                );
              })}

              {/* Draggable Cards */}
              {currentChallenge.sortItems.map(item => {
                const pos = cardPositions[item.id] || { x: 50, y: 310 };
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

          {/* Bottom Navigation spacer / finish */}
          <div className="w-full max-w-xl flex justify-between items-center h-12">
            <span className="text-xs font-bold text-white drop-shadow">Score: {score}</span>
            {successMsg && (
              <button
                onClick={handleNextChallenge}
                className="px-6 py-2 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg animate-bounce"
              >
                Continue ➜
              </button>
            )}
          </div>
        </div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─────────────────────────────────── */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => {}} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}

export default HealthGame;
