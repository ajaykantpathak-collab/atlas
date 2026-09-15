'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';

type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify' | 'sort';
type MascotMood = 'happy' | 'celebrate' | 'thinking';

// ─── Custom SVG Icons for Food & Teeth ────────────────────────

function RiceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="20" ry="12" fill="#E0E0E0" stroke="#9E9E9E" strokeWidth="1.5" />
      <ellipse cx="30" cy="35" rx="18" ry="10" fill="#FAFAFA" />
      <path d="M18 35 Q30 25, 42 35" fill="#FFF" stroke="#E0E0E0" strokeWidth="1" />
      <circle cx="25" cy="33" r="2" fill="#FFF" />
      <circle cx="33" cy="32" r="2.5" fill="#FFF" />
      <circle cx="28" cy="36" r="2" fill="#FFF" />
      <circle cx="36" cy="35" r="2" fill="#FFF" />
    </svg>
  );
}

function DalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="20" ry="12" fill="#FFB74D" stroke="#EF6C00" strokeWidth="1.5" />
      <ellipse cx="30" cy="35" rx="18" ry="10" fill="#FFA726" />
      <path d="M16 35 Q30 22, 44 35" fill="#FF8F00" opacity="0.6" />
      <circle cx="24" cy="33" r="1.5" fill="#FFE082" />
      <circle cx="32" cy="31" r="1.5" fill="#FFE082" />
      <circle cx="38" cy="35" r="1.5" fill="#FFE082" />
    </svg>
  );
}

function GheeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="24" width="20" height="24" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1.5" rx="3" />
      <rect x="22" y="18" width="16" height="6" fill="#FBC02D" rx="1" />
      <rect x="25" y="14" width="10" height="4" fill="#F57F17" rx="1" />
      <path d="M22 30 Q30 26, 38 30 L38 44 Q30 48, 22 44 Z" fill="#FFF59D" opacity="0.8" />
    </svg>
  );
}

function AppleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 C35 12, 42 16, 40 24 C44 26, 47 33, 44 42 C41 50, 35 52, 30 52 C25 52, 19 50, 16 42 C13 33, 16 26, 20 24 C18 16, 25 12, 30 15 Z" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5" />
      <path d="M30 15 Q33 8, 38 10" stroke="#795548" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <ellipse cx="36" cy="11" rx="4" ry="2" fill="#4CAF50" transform="rotate(30 36 11)" />
    </svg>
  );
}

function MilkIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 18 L40 18 L37 50 L23 50 Z" fill="#ECEFF1" stroke="#CFD8DC" strokeWidth="1.5" />
      <path d="M22 24 L38 24 L36.5 48 L23.5 48 Z" fill="#FFFFFF" />
      <ellipse cx="30" cy="24" rx="8" ry="3" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" />
      <text x="30" y="38" fontSize="10" fontWeight="bold" fill="#1565C0" textAnchor="middle">MILK</text>
    </svg>
  );
}

function IncisorIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 15 L38 15 L35 45 C35 48, 25 48, 25 45 Z" fill="#FAFAFA" stroke="#CFD8DC" strokeWidth="2" />
      <path d="M24 15 L36 15 L34 22 L26 22 Z" fill="#FFFFFF" />
      <line x1="30" y1="22" x2="30" y2="44" stroke="#ECEFF1" strokeWidth="1.5" />
    </svg>
  );
}

function CanineIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C35 20, 38 30, 34 46 C32 48, 28 48, 26 46 C22 30, 25 20, 30 10 Z" fill="#FAFAFA" stroke="#CFD8DC" strokeWidth="2" />
      <path d="M28 15 L32 15 L31 25 L29 25 Z" fill="#FFFFFF" />
    </svg>
  );
}

function MolarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 18 C18 14, 42 14, 42 18 C45 25, 42 35, 38 45 C36 48, 34 48, 33 45 L30 35 L27 45 C26 48, 24 48, 22 45 C18 35, 15 25, 18 18 Z" fill="#FAFAFA" stroke="#CFD8DC" strokeWidth="2" />
      <ellipse cx="24" cy="20" rx="4" ry="2" fill="#ECEFF1" />
      <ellipse cx="36" cy="20" rx="4" ry="2" fill="#ECEFF1" />
    </svg>
  );
}

function ToothStructureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 15 C20 10, 40 10, 40 15 C43 25, 38 40, 35 50 C34 52, 26 52, 25 50 C22 40, 17 25, 20 15 Z" fill="#FFFFFF" stroke="#90A4AE" strokeWidth="1.5" />
      {/* Dentine */}
      <path d="M22 18 C22 14, 38 14, 38 18 C40 26, 36 38, 34 48 C33 49, 27 49, 26 48 C24 38, 20 26, 22 18 Z" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="1" />
      {/* Pulp */}
      <path d="M27 22 C27 20, 33 20, 33 22 C34 28, 32 38, 30 44 C28 38, 26 28, 27 22 Z" fill="#FF8A80" />
    </svg>
  );
}

function ToothbrushIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="32" width="34" height="6" rx="3" fill="#42A5F5" />
      <rect x="42" y="27" width="9" height="11" rx="2" fill="#AB47BC" />
      {/* Bristles */}
      <line x1="43" y1="25" x2="43" y2="27" stroke="#E1BEE7" strokeWidth="1.5" />
      <line x1="45" y1="25" x2="45" y2="27" stroke="#E1BEE7" strokeWidth="1.5" />
      <line x1="47" y1="25" x2="47" y2="27" stroke="#E1BEE7" strokeWidth="1.5" />
      <line x1="49" y1="25" x2="49" y2="27" stroke="#E1BEE7" strokeWidth="1.5" />
    </svg>
  );
}

function CavityIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 15 C20 10, 40 10, 40 15 C43 25, 38 40, 35 50 C34 52, 26 52, 25 50 C22 40, 17 25, 20 15 Z" fill="#FAFAFA" stroke="#90A4AE" strokeWidth="1.5" />
      {/* Cavity hole */}
      <ellipse cx="32" cy="25" rx="6" ry="5" fill="#37474F" />
      <path d="M30 23 Q33 24, 32 27 Z" fill="#212121" />
    </svg>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: 'Food Components & Energy 🍚',
    text: 'We need food to grow, play, and stay healthy! Carbohydrates give quick energy (rice, chapati). Proteins build our body (dal, milk, eggs). Fats store energy (ghee, butter).',
    emoji: '🍚',
    bgColor: 'from-amber-400 to-orange-500',
    spoken: 'We need food to grow, play, and stay healthy! Carbohydrates give quick energy, proteins build our body, and fats store energy.',
  },
  {
    title: 'Vitamins & Balanced Diet 🍎',
    text: 'Vitamins and minerals protect us from diseases (fruits and vegetables). A balanced diet has a mix of all food components in right proportions. Never waste food!',
    emoji: '🥗',
    bgColor: 'from-emerald-400 to-teal-500',
    spoken: 'Vitamins and minerals protect us from diseases. A balanced diet has a mix of all food components in the right proportions.',
  },
  {
    title: 'Types of Teeth 🦷',
    text: 'We have four types of teeth! Incisors at the front cut food like scissors. Canines at the corners tear food. Premolars and molars at the back crush and grind food into a paste!',
    emoji: '🦷',
    bgColor: 'from-blue-400 to-indigo-500',
    spoken: 'We have four types of teeth! Incisors cut food, canines tear food, and premolars and molars crush and grind food.',
  },
  {
    title: 'Structure of a Tooth 🛡️',
    text: 'The crown is visible above the gum; the root is hidden in the jaw. Enamel is the hard, protective outer covering of the crown. Dentine is underneath, and pulp inside has nerves and blood vessels!',
    emoji: '🛡️',
    bgColor: 'from-cyan-400 to-blue-600',
    spoken: 'Enamel is the hardest outer covering of a tooth. Dentine is underneath, and the pulp inside contains nerves and blood vessels.',
  },
  {
    title: 'Dental Care & Cavities 🪥',
    text: 'Bacteria feed on leftover sugar and make acid. Acid eats enamel and makes cavities! Brush twice daily, floss, eat less sugar, and visit the dentist every six months!',
    emoji: '🪥',
    bgColor: 'from-purple-400 to-pink-500',
    spoken: 'Bacteria feed on sugar and make acid that causes cavities. Brush twice daily, floss, and visit the dentist regularly.',
  },
];

// ─── Challenges ───────────────────────────────────────────────

const CHALLENGES = [
  {
    type: 'identify' as ChallengeType,
    question: 'Which food gives the body the most QUICK energy for running?',
    answer: 'Rice and chapati',
    options: ['Rice and chapati', 'Ghee and butter', 'Spinach and carrot'],
    hint: 'Think: what do we eat daily that gives us instant energy for sports?',
    misconception: 'Rice and chapati are rich in carbohydrates, which give quick energy! Ghee and butter store energy, and spinach gives vitamins, but grains give instant energy for sports.',
  },
  {
    type: 'identify' as ChallengeType,
    question: 'Which food helps the body GROW and repair muscles?',
    answer: 'Dal and eggs',
    options: ['Rice and potatoes', 'Dal and eggs', 'Ghee and oil'],
    hint: 'These are body-building foods like milk, paneer, and lentils!',
    misconception: 'Dal and eggs are rich in proteins! Proteins are body-building nutrients that help grow muscles and repair body parts. Rice gives energy, and ghee stores energy.',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag each food to its main food component!',
    answer: 'sort',
    options: [],
    hint: 'Rice = carbohydrate, Dal = protein, Ghee = fat, Apple = vitamin!',
    misconception: 'Remember: grains are carbohydrates for energy, pulses and milk are proteins for building, ghee and butter are fats, and fruits are vitamins for protection!',
    sortItems: [
      { id: 'rice', label: 'Rice & Chapati', icon: 'rice', correctBin: 'carb' },
      { id: 'dal', label: 'Dal & Eggs', icon: 'dal', correctBin: 'protein' },
      { id: 'ghee', label: 'Ghee & Butter', icon: 'ghee', correctBin: 'fat' },
      { id: 'apple', label: 'Apple & Guava', icon: 'apple', correctBin: 'vitamin' },
    ],
    bins: [
      { id: 'carb', label: 'Carbohydrates 🌾', color: '#F59E0B' },
      { id: 'protein', label: 'Proteins 🥚', color: '#3B82F6' },
      { id: 'fat', label: 'Fats 🧈', color: '#EF4444' },
      { id: 'vitamin', label: 'Vitamins 🍎', color: '#10B981' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: 'Which of these meals is a BALANCED diet?',
    answer: 'Rice, dal, vegetable, chapati, curd, and fruit',
    options: ['Only rice and ghee', 'Rice, dal, vegetable, chapati, curd, and fruit', 'Only fruits and water'],
    hint: 'A balanced diet contains all food components in proper proportions!',
    misconception: 'A balanced meal needs variety! Rice, dal, vegetables, chapati, curd, and fruit together provide carbohydrates, proteins, fats, vitamins, minerals, roughage, and water.',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag each tooth type to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Incisors cut front food, canines tear, premolars crush, molars grind!',
    misconception: 'Each tooth has a special job: incisors cut like scissors, canines tear like forks, premolars crush, and molars grind food at the back!',
    sortItems: [
      { id: 'incisor', label: 'Incisors (Front)', icon: 'incisor', correctBin: 'cut' },
      { id: 'canine', label: 'Canines (Corners)', icon: 'canine', correctBin: 'tear' },
      { id: 'molar', label: 'Molars (Back)', icon: 'molar', correctBin: 'grind' },
    ],
    bins: [
      { id: 'cut', label: 'Cut & Bite ✂️', color: '#3B82F6' },
      { id: 'tear', label: 'Tear Meat 🍴', color: '#EF4444' },
      { id: 'grind', label: 'Grind & Chew ⚙️', color: '#10B981' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: 'What is the HARDEST substance in the human body covering the crown of a tooth?',
    answer: 'Enamel',
    options: ['Enamel', 'Dentine', 'Pulp'],
    hint: 'It is the shiny outer shield protecting the tooth from germs and chewing wear!',
    misconception: 'Enamel is the hardest substance in the human body! It covers the crown like a strong helmet. Dentine is underneath, and pulp is the soft living centre.',
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag the steps of cavity formation in correct order!',
    answer: 'sort',
    options: [],
    hint: 'Sugar → Bacteria feed → Acid produced → Enamel attacked → Cavity!',
    misconception: 'Cavities form when sugary food is left behind, bacteria feed on it, produce acid, attack the hard enamel, and make a hole!',
    sortItems: [
      { id: 'step1', label: 'Eat sugary food', icon: 'apple', correctBin: 's1' },
      { id: 'step2', label: 'Bacteria feed on sugar', icon: 'cavity', correctBin: 's2' },
      { id: 'step3', label: 'Bacteria produce acid', icon: 'tooth-struct', correctBin: 's3' },
      { id: 'step4', label: 'Acid attacks enamel', icon: 'incisor', correctBin: 's4' },
    ],
    bins: [
      { id: 's1', label: '1. Eat Sugar 🍬', color: '#F59E0B' },
      { id: 's2', label: '2. Bacteria Feed 🦠', color: '#EF4444' },
      { id: 's3', label: '3. Make Acid 🧪', color: '#9333EA' },
      { id: 's4', label: '4. Attack Enamel 🛡️', color: '#3B82F6' },
    ],
  },
  {
    type: 'sort' as ChallengeType,
    question: 'Drag each action to Good Dental Care or Bad Dental Care!',
    answer: 'sort',
    options: [],
    hint: 'Brushing twice, flossing, visiting dentist = good! Skipping brush, eating sweets = bad!',
    misconception: 'Good dental care keeps teeth strong: brush twice a day, floss, rinse after meals, and visit the dentist every 6 months!',
    sortItems: [
      { id: 'brush', label: 'Brush twice daily', icon: 'toothbrush', correctBin: 'good' },
      { id: 'dentist', label: 'Visit dentist every 6 mo', icon: 'tooth-struct', correctBin: 'good' },
      { id: 'skip', label: 'Skip brushing at night', icon: 'cavity', correctBin: 'bad' },
      { id: 'sweets', label: 'Eat sticky sweets before bed', icon: 'apple', correctBin: 'bad' },
    ],
    bins: [
      { id: 'good', label: 'Good Care ✅', color: '#10B981' },
      { id: 'bad', label: 'Bad Habit ❌', color: '#EF4444' },
    ],
  },
];

// ─── Dentist Dinesh Mascot ────────────────────────────────────

function DentistDinesh({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-blue-200"
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
          {/* Head & Body */}
          <circle cx="37.5" cy="30" r="18" fill="#FFE0B2" stroke="#FFCC80" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M20 25 Q37.5 12, 55 25 L55 20 Q37.5 8, 20 20 Z" fill="#3E2723" />
          {/* Doctor Coat */}
          <path d="M20 48 L37.5 55 L55 48 L58 80 L17 80 Z" fill="#FFFFFF" stroke="#CFD8DC" strokeWidth="1.5" />
          <path d="M28 48 L37.5 60 L47 48" fill="#E3F2FD" stroke="#90CAF9" strokeWidth="1" />
          {/* Tooth Badge */}
          <circle cx="30" cy="62" r="6" fill="#FFFFFF" stroke="#2196F3" strokeWidth="1.5" />
          <path d="M28 60 C28 58, 32 58, 32 60 C32 62, 30 65, 30 65 C30 65, 28 62, 28 60 Z" fill="#2196F3" />
          {/* Friendly Eyes */}
          <circle cx="31" cy="27" r="2.5" fill="#37474F" />
          <circle cx="44" cy="27" r="2.5" fill="#37474F" />
          {/* Smile */}
          <path d="M33 35 Q37.5 40, 42 35" stroke="#D32F2F" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Mirror tool in hand */}
          <line x1="55" y1="55" x2="65" y2="45" stroke="#90A4AE" strokeWidth="2" />
          <circle cx="67" cy="43" r="5" fill="#B0BEC5" stroke="#78909C" strokeWidth="1" />
          <circle cx="67" cy="43" r="3" fill="#E3F2FD" />
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

// ─── Dental Clinic & Kitchen Scene Background ──────────────────

function ClinicSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky / Clinic Wall Gradient — SVG gradient */}
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="clinic-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="40%" stopColor="#B2EBF2" />
            <stop offset="70%" stopColor="#E8F5E9" />
            <stop offset="100%" stopColor="#C8E6C9" />
          </linearGradient>
          <linearGradient id="clinic-ground-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#81C784" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#clinic-sky-grad)" />
        <rect y={height - 112} width={width} height={112} fill="url(#clinic-ground-grad)" />
      </svg>
      {/* Clinic Building Silhouette */}
      <div className="absolute top-10 left-12 opacity-30">
        <svg width="120" height="150" viewBox="0 0 120 150">
          <rect x="10" y="30" width="100" height="120" fill="#B0BEC5" />
          <polygon points="10,30 60,5 110,30" fill="#78909C" />
          <rect x="30" y="50" width="20" height="30" fill="#ECEFF1" />
          <rect x="70" y="50" width="20" height="30" fill="#ECEFF1" />
          <rect x="45" y="100" width="30" height="50" fill="#37474F" />
          {/* Red Cross / Tooth symbol on clinic */}
          <circle cx="60" cy="20" r="10" fill="#D32F2F" />
          <path d="M55 20 L65 20 M60 15 L60 25" stroke="white" strokeWidth="2" />
        </svg>
      </div>
      {/* Trees & Sun */}
      <motion.div className="absolute top-4 right-16" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FFD54F" opacity="0.8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#FFCA28" strokeWidth="2.5" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>
      {/* Flowers on grass */}
      <div className="absolute bottom-6 left-16 flex gap-10">
        <svg width="20" height="25" viewBox="0 0 20 25"><circle cx="10" cy="8" r="5" fill="#E91E63" /><circle cx="10" cy="8" r="2" fill="#FFEB3B" /><line x1="10" y1="13" x2="10" y2="25" stroke="#388E3C" strokeWidth="2" /></svg>
        <svg width="20" height="25" viewBox="0 0 20 25"><circle cx="10" cy="8" r="5" fill="#9C27B0" /><circle cx="10" cy="8" r="2" fill="#FFEB3B" /><line x1="10" y1="13" x2="10" y2="25" stroke="#388E3C" strokeWidth="2" /></svg>
        <svg width="20" height="25" viewBox="0 0 20 25"><circle cx="10" cy="8" r="5" fill="#FF9800" /><circle cx="10" cy="8" r="2" fill="#FFEB3B" /><line x1="10" y1="13" x2="10" y2="25" stroke="#388E3C" strokeWidth="2" /></svg>
      </div>
    </div>
  );
}

// ─── Sort Item Icon Renderer ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'rice': return <RiceIcon size={size} />;
    case 'dal': return <DalIcon size={size} />;
    case 'ghee': return <GheeIcon size={size} />;
    case 'apple': return <AppleIcon size={size} />;
    case 'incisor': return <IncisorIcon size={size} />;
    case 'canine': return <CanineIcon size={size} />;
    case 'molar': return <MolarIcon size={size} />;
    case 'tooth-struct': return <ToothStructureIcon size={size} />;
    case 'toothbrush': return <ToothbrushIcon size={size} />;
    case 'cavity': return <CavityIcon size={size} />;
    default: return <RiceIcon size={size} />;
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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ────────────────────���──────────────────

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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : 'shadow'}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold mb-1 shadow" style={{ backgroundColor: color }}>
        📥
      </div>
      <span className="text-xs font-extrabold text-gray-800 text-center px-1">{label}</span>
    </div>
  );
}

// ─── Main Game Component ─────────────────────────────────────

export interface FoodTeethGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FoodTeethGame({ width = 720, height = 560, onComplete }: FoodTeethGameProps) {
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

  // Cleanup speech and timer on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, []);

  // Speak teaching slides
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

  // Speak challenge questions when entering play screen or advancing
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

  // Setup sort items position when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      const count = currentChallenge.sortItems.length;
      const startX = Math.max(20, (width - count * 125) / 2);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: startX + idx * 125, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, width]);

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
      const msg = "Great job! You know about food and teeth!";
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
      const compMsg = "Wonderful! You are a brilliant star!";
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

    // Determine drop bin based on bins count and layout
    const binWidth = 140;
    const binHeight = 110;
    const totalBins = currentChallenge.bins.length;
    const spacing = 15;
    const totalWidth = totalBins * binWidth + (totalBins - 1) * spacing;
    const startX = (width - totalWidth) / 2;
    const binY = 180;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + spacing);
      const by = binY;
      if (x >= bx - 20 && x <= bx + binWidth + 20 && y >= by - 20 && y <= by + binHeight + 20) {
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
        const msg = "Fantastic! You sorted the food groups perfectly!";
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
    <div className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 flex flex-col items-center justify-between" style={{ width, height }}>
      {/* Background scene */}
      <ClinicSceneBg width={width} height={height} />

      {/* Mascot */}
      <DentistDinesh mood={mascotMood} speaking={speakingText} />

      {/* Top Navigation Bar */}
      <div className="relative z-10 w-full px-6 pt-4 flex items-center justify-between bg-white/80 backdrop-blur-md shadow-sm pb-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-extrabold text-blue-600 drop-shadow">🦷 Food & Teeth Game</span>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-600">Challenge {challengeIdx + 1}/8</span>
              <div className="w-24 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500 rounded-full transition-all duration-300" style={{ width: `${((challengeIdx + 1) / 8) * 100}%` }} />
              </div>
            </div>
            <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center p-6">
        {screen === 'teaching' ? (
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className={`w-full max-w-xl rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} p-8 text-white shadow-2xl flex flex-col items-center text-center`}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-extrabold mb-3 drop-shadow">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-lg font-medium leading-relaxed mb-6 drop-shadow-sm">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className={`px-5 py-2.5 rounded-full font-bold shadow transition-all ${slideIdx === 0 ? 'bg-white/20 text-white/40 cursor-not-allowed' : 'bg-white text-blue-600 hover:bg-blue-50'}`}
              >
                Previous
              </button>

              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/50'}`} />
                ))}
              </div>

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
                className="px-6 py-2.5 rounded-full font-bold bg-white text-blue-600 shadow hover:bg-blue-50 transition-all"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="w-full max-w-2xl flex flex-col items-center">
            {/* Question Card */}
            <motion.div
              key={challengeIdx}
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl w-full text-center mb-6 border-2 border-blue-100"
            >
              <h3 className="text-xl font-bold text-gray-800">{currentChallenge.question}</h3>
            </motion.div>

            {/* Challenge Interactive Body */}
            {currentChallenge.type === 'identify' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
                {currentChallenge.options.map(opt => {
                  const isSelected = selectedOpt === opt;
                  const isCorrectOpt = opt === currentChallenge.answer;
                  let btnBg = 'bg-white hover:bg-blue-50 text-gray-800 border-2 border-gray-200';
                  if (selectedOpt) {
                    if (isCorrectOpt) btnBg = 'bg-emerald-500 text-white border-2 border-emerald-600 shadow-lg';
                    else if (isSelected) btnBg = 'bg-rose-500 text-white border-2 border-rose-600';
                    else btnBg = 'bg-gray-100 text-gray-400 border-2 border-gray-200 opacity-60';
                  }
                  return (
                    <motion.button
                      key={opt}
                      whileHover={{ scale: selectedOpt ? 1 : 1.03 }}
                      whileTap={{ scale: selectedOpt ? 1 : 0.97 }}
                      onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                      className={`py-5 px-4 rounded-2xl font-bold text-base shadow transition-all flex flex-col items-center justify-center gap-2 ${btnBg}`}
                    >
                      <span className="text-center">{opt}</span>
                    </motion.button>
                  );
                })}
              </div>
            )}

            {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
              <div className="relative w-full h-[280px]">
                {/* Bins */}
                <div className="flex justify-center gap-4 mb-4">
                  {currentChallenge.bins.map((bin, idx) => {
                    const totalBins = currentChallenge.bins!.length;
                    const binWidth = 140;
                    const binHeight = 110;
                    const spacing = 15;
                    const totalWidth = totalBins * binWidth + (totalBins - 1) * spacing;
                    const startX = (width - totalWidth) / 2;
                    return (
                      <SortBin
                        key={bin.id}
                        label={bin.label}
                        color={bin.color}
                        x={startX + idx * (binWidth + spacing) - (width - 650) / 2}
                        y={10}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                      />
                    );
                  })}
                </div>

                {/* Draggable Cards */}
                {currentChallenge.sortItems.map(item => {
                  const pos = itemPositions[item.id] || { x: 50, y: 190 };
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

            {/* Next Button for Identify after answering correctly */}
            {currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6">
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-full shadow-lg text-lg transition-all flex items-center gap-2"
                >
                  Continue ➡️
                </button>
              </motion.div>
            )}

            {/* Next Button for Sort when all items placed */}
            {currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]) && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-6">
                <button
                  onClick={advanceChallenge}
                  className="px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-full shadow-lg text-lg transition-all flex items-center gap-2"
                >
                  Next Challenge ➡️
                </button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Feedback Overlays */}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
    </div>
  );
}
