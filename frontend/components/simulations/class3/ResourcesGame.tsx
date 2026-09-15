'use client';

/**
 * ResourcesGame — Learn about natural resources: water, soil, forests, sun, air,
 * conservation, and local geography.
 *
 * CISCE Nodes: c3_geo_011 (Natural resources - water, soil, forests),
 *              c3_geo_012 (Local geography - my region)
 * Enrichment: c3_geography_enrichment_part11 & part12
 *
 * ELI5: "Natural resources are free gifts from nature — water to drink and farm,
 *   soil to grow food, forests for wood, oxygen, and animal homes, and the sun
 *   for light and warmth! They are limited like a piggy bank, so we must conserve them!"
 *
 * Misconceptions (from enrichment):
 *   1. "Natural resources are unlimited" → "Many resources like fresh water and forests
 *      are limited and can run out or be polluted! We must conserve them!"
 *   2. "Soil is just dirty dirt" → "Soil is valuable! It contains rich nutrients
 *      that help crops grow our food!"
 *   3. "Forests are only for wood" → "Forests give us oxygen, medicine, fruits,
 *      protect soil, and give shelter to wildlife!"
 *   4. "Paper is made in factories from plastic" → "Paper is made from tree wood pulp!
 *      Wasting paper means cutting down more forests!"
 *   5. "Local geography is about the whole world" → "Local geography studies our own region —
 *      nearby rivers, landforms, crops, and resources!"
 *
 * Story: "Help Conservationist Kavya explore nature, learn about natural resources,
 *   protect forests and soil, and save water to become a Certified Nature Guardian!"
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
    title: 'What Are Natural Resources? 🌿',
    text: 'Natural resources are gifts from nature that we use to live, grow food, and build shelters! They are not made by people — water, soil, forests, and sun are natural!',
    emoji: '🌿',
    bgColor: 'from-emerald-400 to-green-600',
    spoken: 'Natural resources are gifts from nature that we use to live, grow food, and build shelters. Water, soil, forests, and sun are natural resources!',
  },
  {
    title: 'Water & Soil — Our Life Givers! 💧',
    text: 'Water in rivers and groundwater is used for drinking and farming. Alluvial soil in the Northern Plains is rich and fertile, growing wheat, rice, and sugarcane!',
    emoji: '💧',
    bgColor: 'from-blue-400 to-cyan-600',
    spoken: 'Water is used for drinking and farming. Fertile soil helps plants and crops grow wheat, rice, and sugarcane!',
  },
  {
    title: 'Wonderful Forests! 🌲',
    text: 'Forests give us timber for furniture, oxygen to breathe, fruits, and medicine! Their roots hold soil tightly to prevent soil erosion and floods.',
    emoji: '🌲',
    bgColor: 'from-green-500 to-emerald-700',
    spoken: 'Forests give us timber, oxygen, fruits, and medicine. Their roots hold soil tightly to prevent soil erosion and floods!',
  },
  {
    title: 'Conserve Like a Piggy Bank! 💰',
    text: 'Resources are like money in a piggy bank! If we keep taking without saving, it becomes empty. We must conserve water, plant trees, and avoid waste!',
    emoji: '🌱',
    bgColor: 'from-amber-400 to-orange-600',
    spoken: 'Resources are like money in a piggy bank. If we keep taking without saving, it becomes empty. We must conserve water, plant trees, and avoid waste!',
  },
  {
    title: 'Local Geography — My Region! 🗺️',
    text: 'Local geography studies our own region — nearby rivers, landforms, climate, crops, and resources that shape our daily clothes, food, and work!',
    emoji: '🗺️',
    bgColor: 'from-teal-400 to-blue-600',
    spoken: 'Local geography studies our own region, nearby rivers, landforms, climate, and crops that shape our daily food and work!',
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
    question: 'What are natural resources?',
    answer: 'Gifts of nature that we use to live',
    options: [
      'Gifts of nature that we use to live',
      'Plastic toys made in factories',
      'Video games played on computers',
    ],
    hint: 'Think: what exists on its own in land, water, and air without being made by humans?',
    misconception: 'Natural resources are gifts of nature like water, soil, and forests — not man-made plastic toys or video games!',
  },
  {
    type: 'identify',
    question: 'Which of these is a natural resource?',
    answer: 'River water',
    options: ['River water', 'Plastic bottle', 'Glass window'],
    hint: 'Look for something that comes directly from nature, not manufactured in a factory.',
    misconception: 'River water is a natural resource! Plastic bottles and glass windows are man-made objects, not gifts of nature.',
  },
  {
    type: 'sort',
    question: 'Drag each natural resource to its main use or feature!',
    answer: 'sort',
    options: [],
    hint: 'Water is for drinking/farming, soil for growing crops, forest for wood/oxygen, sun for light/energy!',
    misconception: 'Each natural resource has a specific role: water quenches thirst and waters crops, soil grows food, forests give oxygen and timber!',
    sortItems: [
      { id: 'water-use', label: 'Water', icon: 'water', correctBin: 'drink-farm' },
      { id: 'soil-use', label: 'Soil', icon: 'soil', correctBin: 'grow-crops' },
      { id: 'forest-use', label: 'Forest', icon: 'forest', correctBin: 'wood-oxygen' },
      { id: 'sun-use', label: 'Sunlight', icon: 'sun', correctBin: 'light-energy' },
    ],
    bins: [
      { id: 'drink-farm', label: 'Drinking & Farming 💧', color: '#0284C7' },
      { id: 'grow-crops', label: 'Growing Crops 🌱', color: '#16A34A' },
      { id: 'wood-oxygen', label: 'Wood & Oxygen 🌲', color: '#15803D' },
      { id: 'light-energy', label: 'Light & Energy ☀️', color: '#CA8A04' },
    ],
  },
  {
    type: 'identify',
    question: 'Why are forests important for our planet?',
    answer: 'They give oxygen, wood, and animal shelter',
    options: [
      'They give oxygen, wood, and animal shelter',
      'They block all sunlight from reaching earth',
      'They are only used to build giant parking lots',
    ],
    hint: 'Think about what trees produce and who lives inside them.',
    misconception: 'Forests are vital because they give us oxygen to breathe, timber, medicine, and safe homes for wildlife — they do not block sunlight or exist for parking lots!',
  },
  {
    type: 'sort',
    question: 'Drag each forest product to its correct category!',
    answer: 'sort',
    options: [],
    hint: 'Wood makes furniture, neem/tulsi makes medicine, mangoes are fruit, trees give oxygen!',
    misconception: 'Forests provide diverse products: strong timber for furniture and houses, leaves like neem for healing medicine, and fresh oxygen for breathing!',
    sortItems: [
      { id: 'wood-prod', label: 'Timber Wood', icon: 'wood', correctBin: 'furniture' },
      { id: 'med-prod', label: 'Neem & Tulsi', icon: 'leaf', correctBin: 'medicine' },
      { id: 'fruit-prod', label: 'Fresh Mango', icon: 'crop', correctBin: 'food' },
      { id: 'oxy-prod', label: 'Fresh Oxygen', icon: 'oxygen', correctBin: 'breathing' },
    ],
    bins: [
      { id: 'furniture', label: 'Furniture & Houses 🪑', color: '#B45309' },
      { id: 'medicine', label: 'Medicines 🌿', color: '#047857' },
      { id: 'food', label: 'Delicious Food 🍎', color: '#DC2626' },
      { id: 'breathing', label: 'Clean Breathing Air 💨', color: '#0284C7' },
    ],
  },
  {
    type: 'identify',
    question: 'Why is alluvial soil in the Northern Plains so special?',
    answer: 'It is very fertile and grows wheat and rice',
    options: [
      'It is very fertile and grows wheat and rice',
      'It is made entirely of hard concrete blocks',
      'It can only be used to make plastic toys',
    ],
    hint: 'Think about what rivers deposit in plains and why farmers love it for crops.',
    misconception: 'Alluvial soil brought down by rivers is rich and fertile, making the Northern Plains perfect for growing wheat, rice, and sugarcane — it is not made of concrete!',
  },
  {
    type: 'sort',
    question: 'Drag each action to Conserve or Waste natural resources!',
    answer: 'sort',
    options: [],
    hint: 'Turning off taps and planting trees conserve resources; leaving taps running wastes them!',
    misconception: 'Conservation means protecting resources: closing taps saves water, planting trees grows forests, while leaving taps running or polluting rivers wastes them!',
    sortItems: [
      { id: 'act-tap', label: 'Close tap tightly', icon: 'save-water', correctBin: 'conserve' },
      { id: 'act-tree', label: 'Plant a new tree', icon: 'plant-tree', correctBin: 'conserve' },
      { id: 'act-run', label: 'Let tap run wastefully', icon: 'river', correctBin: 'waste' },
      { id: 'act-cut', label: 'Cut down all forests', icon: 'forest', correctBin: 'waste' },
    ],
    bins: [
      { id: 'conserve', label: 'Conserve Resources ✅', color: '#16A34A' },
      { id: 'waste', label: 'Waste Resources ⚠️', color: '#DC2626' },
    ],
  },
  {
    type: 'sort',
    question: 'What does local geography study about your region?',
    answer: 'sort',
    options: [],
    hint: 'Local geography studies landforms, climate, crops, and rivers nearby — not the moon!',
    misconception: 'Local geography studies our immediate surroundings: nearby rivers, landforms, climate, and local crops — it does not study what happened centuries ago or objects on the moon!',
    sortItems: [
      { id: 'geo-river', label: 'Nearby Rivers', icon: 'river', correctBin: 'local' },
      { id: 'geo-crop', label: 'Local Crops', icon: 'crop', correctBin: 'local' },
      { id: 'geo-moon', label: 'Moon Rocks', icon: 'sun', correctBin: 'not-local' },
      { id: 'geo-dino', label: 'Ancient Dinosaurs', icon: 'wood', correctBin: 'not-local' },
    ],
    bins: [
      { id: 'local', label: 'Local Geography 🗺️', color: '#0284C7' },
      { id: 'not-local', label: 'Not Local Geography ❌', color: '#6B7280' },
    ],
  },
];

// ─── Conservationist Kavya Mascot ─────────────────────────────

function KavyaMascot({ mood, speaking }: { mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null }) {
  return (
    <div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[220px] border-2 border-emerald-400"
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
            <linearGradient id="skin-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
            <linearGradient id="shirt-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#22C55E" />
              <stop offset="100%" stopColor="#15803D" />
            </linearGradient>
          </defs>
          {/* Sun hat */}
          <ellipse cx="37.5" cy="24" rx="26" ry="7" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
          <path d="M21 24 C21 14, 54 14, 54 24 Z" fill="#EAB308" stroke="#CA8A04" strokeWidth="1" />
          <rect x="25" y="21" width="25" height="4" fill="#16A34A" rx="1" />
          {/* Head */}
          <circle cx="37.5" cy="35" r="14" fill="url(#skin-grad)" stroke="#CA8A04" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="32" cy="33" r="2" fill="#111827" />
          <circle cx="43" cy="33" r="2" fill="#111827" />
          {/* Smile */}
          <path d="M33 39 Q37.5 43 42 39" stroke="#92400E" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Torso / Shirt */}
          <path d="M23 52 L52 52 L56 75 L19 75 Z" fill="url(#shirt-grad)" stroke="#166534" strokeWidth="1.5" rx="3" />
          {/* Recycle badge */}
          <circle cx="37.5" cy="62" r="5" fill="white" stroke="#15803D" strokeWidth="1" />
          <path d="M37.5 59 L35 64 L40 64 Z" fill="#16A34A" />
          {/* Arms */}
          <rect x="13" y="54" width="7" height="15" fill="#EAB308" rx="3" transform="rotate(10 13 54)" />
          <rect x="55" y="54" width="7" height="15" fill="#EAB308" rx="3" transform="rotate(-10 55 54)" />
          {/* Feet */}
          <ellipse cx="28" cy="84" rx="6" ry="4" fill="#1E293B" />
          <ellipse cx="47" cy="84" rx="6" ry="4" fill="#1E293B" />
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

// ─── Natural Resources Scene Background ───────────────────────

function ResourcesScene({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* SVG Background with Gradients */}
      <svg className="absolute inset-0 w-full h-full" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7DD3FC" />
            <stop offset="40%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
          <linearGradient id="mountain-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>
          <linearGradient id="soil-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#84CC16" />
            <stop offset="100%" stopColor="#65A30D" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#sky-grad)" />
        {/* Mountains */}
        <polygon points="0,280 140,140 280,280" fill="url(#mountain-grad)" opacity="0.8" />
        <polygon points="200,280 360,110 520,280" fill="url(#mountain-grad)" opacity="0.9" />
        <polygon points="400,280 560,150 720,280" fill="url(#mountain-grad)" opacity="0.7" />
        {/* Ground */}
        <rect x="0" y="270" width={width} height={height - 270} fill="url(#soil-grad)" />
      </svg>

      {/* Sun in sky */}
      <motion.div className="absolute top-6 left-10" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FACC15" opacity="0.9" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
            <line key={angle} x1="30" y1="30" x2={30 + 26 * Math.cos(angle * Math.PI / 180)} y2={30 + 26 * Math.sin(angle * Math.PI / 180)} stroke="#EAB308" strokeWidth="3" strokeLinecap="round" />
          ))}
        </svg>
      </motion.div>

      {/* Fluffy clouds */}
      <motion.div className="absolute top-10 left-1/3 opacity-85" animate={{ x: [0, 40, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="90" height="35" viewBox="0 0 90 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white" />
          <ellipse cx="50" cy="15" rx="22" ry="15" fill="white" />
          <ellipse cx="70" cy="20" rx="15" ry="10" fill="white" />
        </svg>
      </motion.div>

      {/* River flowing across ground */}
      <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden opacity-90">
        <svg className="w-full h-full" viewBox="0 0 720 120" preserveAspectRatio="none">
          <path d="M0 40 Q200 90, 400 40 T720 50 L720 120 L0 120 Z" fill="#0284C7" />
          <path d="M0 60 Q200 110, 400 60 T720 70" stroke="#E0F2FE" strokeWidth="3" fill="none" opacity="0.7" />
        </svg>
      </div>

      {/* Trees on the banks */}
      <div className="absolute bottom-20 left-12">
        <svg width="45" height="55" viewBox="0 0 45 55">
          <rect x="18" y="35" width="9" height="20" fill="#78350F" />
          <circle cx="22.5" cy="25" r="18" fill="#15803D" />
          <circle cx="16" cy="20" r="10" fill="#16A34A" />
          <circle cx="29" cy="20" r="10" fill="#16A34A" />
        </svg>
      </div>
      <div className="absolute bottom-24 right-16">
        <svg width="50" height="60" viewBox="0 0 50 60">
          <rect x="20" y="38" width="10" height="22" fill="#78350F" />
          <circle cx="25" cy="26" r="20" fill="#166534" />
          <circle cx="18" cy="20" r="12" fill="#22C55E" />
          <circle cx="32" cy="20" r="12" fill="#22C55E" />
        </svg>
      </div>
    </div>
  );
}

// ─── Custom SVG Icons for Topics ──────────────────────────────

function WaterResourceIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M30 12 C24 22, 16 30, 16 38 C16 46, 22 50, 30 50 C38 50, 44 46, 44 38 C44 30, 36 22, 30 12 Z" fill="#0284C7" />
      <ellipse cx="25" cy="35" rx="5" ry="8" fill="#38BDF8" opacity="0.6" />
    </svg>
  );
}

function SoilIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <rect x="12" y="32" width="36" height="18" fill="#92400E" rx="4" />
      <path d="M20 32 Q30 20, 40 32" fill="#16A34A" />
      <circle cx="30" cy="25" r="8" fill="#22C55E" />
    </svg>
  );
}

function ForestIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#DCFCE7" stroke="#15803D" strokeWidth="2" />
      <rect x="26" y="34" width="8" height="14" fill="#78350F" />
      <polygon points="30,12 16,36 44,36" fill="#15803D" />
      <polygon points="30,18 12,40 48,40" fill="#16A34A" opacity="0.8" />
    </svg>
  );
}

function SunIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2" />
      <circle cx="30" cy="30" r="12" fill="#FACC15" stroke="#EAB308" strokeWidth="1" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (
        <line key={angle} x1="30" y1="30" x2={30 + 20 * Math.cos(angle * Math.PI / 180)} y2={30 + 20 * Math.sin(angle * Math.PI / 180)} stroke="#EAB308" strokeWidth="2.5" strokeLinecap="round" />
      ))}
    </svg>
  );
}

function WoodIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
      <rect x="15" y="22" width="30" height="16" fill="#D97706" rx="3" />
      <ellipse cx="15" cy="30" rx="4" ry="8" fill="#B45309" />
      <ellipse cx="45" cy="30" rx="4" ry="8" fill="#F59E0B" />
    </svg>
  );
}

function LeafIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
      <path d="M30 12 C30 12, 45 20, 45 35 C45 45, 30 48, 30 48 C30 48, 15 45, 15 35 C15 20, 30 12, 30 12 Z" fill="#22C55E" />
      <path d="M30 18 L30 45" stroke="#14532D" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function CropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FFEDD5" stroke="#C2410C" strokeWidth="2" />
      <circle cx="30" cy="30" r="14" fill="#F97316" />
      <path d="M30 12 Q35 6, 38 12" stroke="#15803D" strokeWidth="2" fill="none" />
      <path d="M30 16 C25 22, 25 38, 30 44 C35 38, 35 22, 30 16 Z" fill="#FB923C" />
    </svg>
  );
}

function OxygenIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <text x="30" y="36" fontSize="16" fontWeight="bold" fill="#0369A1" textAnchor="middle">O₂</text>
      <circle cx="30" cy="30" r="20" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" fill="none" />
    </svg>
  );
}

function SaveWaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2" />
      <path d="M30 16 C24 24, 18 30, 18 36 C18 42, 23 46, 30 46 C37 46, 42 42, 42 36 C42 30, 36 24, 30 16 Z" fill="#22C55E" />
      <path d="M24 35 L28 39 L38 27" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlantTreeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
      <rect x="27" y="32" width="6" height="14" fill="#92400E" />
      <circle cx="30" cy="24" r="12" fill="#16A34A" />
      <path d="M18 46 L42 46" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function RiverIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2" />
      <path d="M12 25 Q30 15, 48 25 T48 35 Q30 45, 12 35 Z" fill="#38BDF8" />
      <path d="M15 30 Q30 22, 45 30" stroke="white" strokeWidth="2" fill="none" />
    </svg>
  );
}

// ─── Render Sort Icon Mapper ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'water': return <WaterResourceIcon size={size} />;
    case 'soil': return <SoilIcon size={size} />;
    case 'forest': return <ForestIcon size={size} />;
    case 'sun': return <SunIcon size={size} />;
    case 'wood': return <WoodIcon size={size} />;
    case 'leaf': return <LeafIcon size={size} />;
    case 'crop': return <CropIcon size={size} />;
    case 'oxygen': return <OxygenIcon size={size} />;
    case 'save-water': return <SaveWaterIcon size={size} />;
    case 'plant-tree': return <PlantTreeIcon size={size} />;
    case 'river': return <RiverIcon size={size} />;
    default: return <WaterResourceIcon size={size} />;
  }
}

// ─── Sort Card Component ──────────────────────────────────────

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
        className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-emerald-300 ${
          placed ? 'opacity-40 bg-gray-100' : 'bg-white'
        }`}
        style={{ width: 110, height: 95 }}
      >
        {renderSortIcon(icon, 42)}
        <span className="text-[10px] font-extrabold text-gray-800 text-center mt-1 px-1">
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 text-center transition-all shadow-md ${
        isHovering ? 'scale-105 shadow-2xl' : ''
      }`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-900 leading-tight">
        {label}
      </span>
      <span className="text-[10px] text-gray-600 mt-1 font-semibold">Drop here!</span>
    </div>
  );
}

// ─── Main Component Props & Export ────────────────────────────

export interface ResourcesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ResourcesGame({
  width = 720,
  height = 560,
  onComplete,
}: ResourcesGameProps) {
  // Game screens and state
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [slideIdx, setSlideIdx] = useState(0);
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparkle, setSparkle] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>(
    "Hi! I'm Kavya! Let's explore and protect our natural resources!"
  );

  // Sort challenge placed items
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer for auto-hint
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Speech and audio cleanup on unmount
  useEffect(() => {
    return () => {
      speechManager.stop();
    };
  }, []);

  // Speak when slide changes
  useEffect(() => {
    if (screen === 'teaching') {
      const slide = TEACHING_SLIDES[slideIdx];
      setMascotSpeech(slide.spoken);
      speechManager.speak(slide.spoken);
    }
  }, [screen, slideIdx]);

  // Speak when challenge changes
  useEffect(() => {
    if (screen === 'play') {
      setMascotSpeech(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
      resetInactivityTimer();
    }
    return () => clearInactivityTimer();
  }, [challengeIdx, screen]);

  const resetInactivityTimer = () => {
    clearInactivityTimer();
    inactivityRef.current = setTimeout(() => {
      if (currentChallenge) {
        setHintMsg(currentChallenge.hint);
        setMascotSpeech(currentChallenge.hint);
        audioManager.play('hint');
        speechManager.speak(currentChallenge.hint);
      }
    }, 10000);
  };

  const clearInactivityTimer = () => {
    if (inactivityRef.current) {
      clearTimeout(inactivityRef.current);
      inactivityRef.current = null;
    }
  };

  // Handle multiple-choice option click
  const handleOptionClick = (opt: string) => {
    resetInactivityTimer();
    if (opt === currentChallenge.answer) {
      audioManager.play('success');
      setStars((prev) => prev + 1);
      setMascotMood('celebrate');
      setSuccessMsg('Amazing job! Correct answer!');
      setMascotSpeech('Wonderful! You got it right!');
      speechManager.speak('Wonderful! You got it right!');
      setSparkle({ x: width / 2, y: height / 2 });

      setTimeout(() => {
        setSuccessMsg(null);
        setMascotMood('happy');
        advanceChallenge();
      }, 1500);
    } else {
      audioManager.play('error');
      setErrors((prev) => prev + 1);
      setMascotMood('thinking');
      setHintMsg(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
    }
  };

  // Handle Drag & Drop for sorting challenges
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const item = currentChallenge.sortItems?.find((i) => i.id === id);
    if (!item || !currentChallenge.bins) return false;

    // Determine target bin based on drop coordinates (x, y)
    // 2 bins or 4 bins layout calculation
    const isFourBins = currentChallenge.bins.length === 4;
    let droppedBinId = '';

    if (isFourBins) {
      if (x < width / 2 && y < height / 2 + 30) droppedBinId = currentChallenge.bins[0].id;
      else if (x >= width / 2 && y < height / 2 + 30) droppedBinId = currentChallenge.bins[1].id;
      else if (x < width / 2) droppedBinId = currentChallenge.bins[2].id;
      else droppedBinId = currentChallenge.bins[3].id;
    } else {
      if (x < width / 2) droppedBinId = currentChallenge.bins[0].id;
      else droppedBinId = currentChallenge.bins[1].id;
    }

    if (droppedBinId === item.correctBin) {
      audioManager.play('drop-correct');
      const updatedPlaced = { ...placedItems, [id]: true };
      setPlacedItems(updatedPlaced);
      setSparkle({ x, y });

      const allDone = currentChallenge.sortItems?.every((i) => updatedPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars((prev) => prev + 1);
        setMascotMood('celebrate');
        setSuccessMsg('All sorted correctly! Brilliant!');
        setMascotSpeech('Fantastic sorting skills!');
        speechManager.speak('Fantastic sorting skills!');

        setTimeout(() => {
          setSuccessMsg(null);
          setMascotMood('happy');
          setPlacedItems({});
          advanceChallenge();
        }, 1800);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors((prev) => prev + 1);
      setMascotMood('thinking');
      setHintMsg(currentChallenge.misconception);
      setMascotSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      return false;
    }
  };

  const advanceChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx((prev) => prev + 1);
    } else {
      setShowConfetti(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      const finalScore = Math.max(0, 100 - errors * 5);
      setMascotSpeech('Congratulations! You are a Certified Nature Guardian!');
      speechManager.speak('Congratulations! You are a Certified Nature Guardian!');
      if (onComplete) {
        onComplete(finalScore);
      }
    }
  };

  const handleHintClick = () => {
    audioManager.play('hint');
    setHintMsg(currentChallenge.hint);
    setMascotSpeech(currentChallenge.hint);
    speechManager.speak(currentChallenge.hint);
  };

  return (
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl bg-slate-900 flex flex-col items-center justify-between font-sans"
      style={{ width, height }}
    >
      {/* Background Scene */}
      <ResourcesScene width={width} height={height} />

      {/* Confetti & Sparkles */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparkle && (
        <SparkleBurst
          x={sparkle.x}
          y={sparkle.y}
          onComplete={() => setSparkle(null)}
        />
      )}
      {successMsg && (
        <SuccessBanner
          message={successMsg}
          onComplete={() => setSuccessMsg(null)}
        />
      )}
      {hintMsg && (
        <HintBubble
          message={hintMsg}
          onComplete={() => setHintMsg(null)}
        />
      )}

      {/* Mascot */}
      <KavyaMascot mood={mascotMood} speaking={mascotSpeech} />

      {/* Header bar */}
      <div className="absolute top-3 left-4 right-20 z-10 flex items-center justify-between bg-white/80 backdrop-blur-md px-4 py-2 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-xl">🌿</span>
          <h1 className="text-sm font-black text-emerald-800 tracking-wide">
            Resources & Nature Guardian
          </h1>
        </div>
        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-gray-700">
              Challenge {challengeIdx + 1} / {CHALLENGES.length}
            </span>
            <StarRow count={stars} total={CHALLENGES.length} />
          </div>
        )}
      </div>

      {/* ─── SCREEN 1: TEACHING INTRO ─── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-6 pt-16 pb-8">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`w-full max-w-lg rounded-3xl p-6 shadow-2xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
            style={{ minHeight: '320px' }}
          >
            <span className="text-6xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-black mb-3 drop-shadow">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-sm font-medium leading-relaxed bg-black/20 p-4 rounded-2xl">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
          </motion.div>

          {/* Slide navigation dots & buttons */}
          <div className="flex items-center justify-between w-full max-w-lg mt-6 px-4">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx((prev) => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2 rounded-xl font-bold shadow transition-all ${
                slideIdx === 0
                  ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
                  : 'bg-white text-emerald-800 hover:bg-emerald-100'
              }`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-3 rounded-full transition-all ${
                    i === slideIdx ? 'w-8 bg-emerald-400' : 'w-3 bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx((prev) => prev + 1);
                } else {
                  setScreen('play');
                }
              }}
              className="px-6 py-2 rounded-xl font-black bg-emerald-500 text-white shadow-lg hover:bg-emerald-400 transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next'}
            </button>
          </div>
        </div>
      )}

      {/* ─── SCREEN 2: GAMEPLAY CHALLENGES ─── */}
      {screen === 'play' && (
        <div className="relative z-10 flex flex-col items-center justify-between w-full h-full pt-20 pb-6 px-6">
          {/* Question Banner */}
          <div className="w-full max-w-xl bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-emerald-300 text-center">
            <h3 className="text-base font-black text-gray-800 leading-snug">
              {currentChallenge.question}
            </h3>
          </div>

          {/* Challenge Content */}
          <div className="w-full max-w-2xl flex-1 flex flex-col items-center justify-center relative my-2">
            {currentChallenge.type === 'identify' ? (
              <div className="flex flex-col gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => handleOptionClick(opt)}
                    className="w-full bg-white/95 hover:bg-emerald-50 border-2 border-emerald-400 rounded-2xl py-3 px-6 text-sm font-extrabold text-gray-800 shadow-lg transition-all text-center"
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>
            ) : (
              /* Sort Challenge UI */
              <div className="w-full h-[320px] relative">
                {/* Render Bins */}
                {currentChallenge.bins &&
                  currentChallenge.bins.map((bin, idx) => {
                    const isFour = currentChallenge.bins?.length === 4;
                    const binWidth = isFour ? 160 : 220;
                    const binHeight = isFour ? 100 : 110;
                    let bx = 40;
                    let by = 20;

                    if (isFour) {
                      bx = idx % 2 === 0 ? 30 : width - 210;
                      by = idx < 2 ? 10 : 130;
                    } else {
                      bx = idx === 0 ? 40 : width - 280;
                      by = 60;
                    }

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

                {/* Render Draggable Sort Items */}
                {currentChallenge.sortItems?.map((item, idx) => {
                  const isFour = currentChallenge.sortItems?.length === 4;
                  const startX = width / 2 - 120 + (idx % 2) * 130;
                  const startY = isFour ? 250 : 210;

                  return (
                    <SortCard
                      key={item.id}
                      id={item.id}
                      label={item.label}
                      icon={item.icon}
                      x={startX}
                      y={startY}
                      placed={!!placedItems[item.id]}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Footer Controls / Hint Button */}
          <div className="w-full max-w-xl flex items-center justify-between px-4">
            <button
              onClick={handleHintClick}
              className="flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold px-4 py-2 rounded-xl shadow-lg transition-all text-xs"
            >
              💡 Need a Hint?
            </button>
            <span className="text-xs text-white font-bold drop-shadow">
              Score: {stars} / {CHALLENGES.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
