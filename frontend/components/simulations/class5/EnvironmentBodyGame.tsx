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

// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──

const TEACHING_SLIDES = [
  {
    title: "Environment: Living & Non-Living 🌿",
    text: "The environment is everything around us! It includes living things (plants, animals, humans) and non-living things (air, water, soil, sunlight). They constantly interact and depend on each other.",
    emoji: "🌍",
    bgColor: "from-emerald-400 to-green-600",
    spoken: "The environment is everything around us! It includes living things like plants and animals, and non-living things like air, water, soil, and sunlight. They constantly interact and depend on each other."
  },
  {
    title: "Plants vs Animals: Similarities 🌱🐾",
    text: "Both plants and animals are living things! They share life processes: both grow, both need food and water, both respire, both reproduce, and both respond to stimuli.",
    emoji: "🌱",
    bgColor: "from-green-400 to-teal-600",
    spoken: "Both plants and animals are living things! They share life processes: both grow, both need food and water, both respire, both reproduce, and both respond to stimuli."
  },
  {
    title: "Plants vs Animals: Differences 🍃🐰",
    text: "Plants are autotrophic — they make their own food by photosynthesis using sunlight, water, and carbon dioxide. Animals are heterotrophic — they cannot make food and must eat plants or other animals, moving freely!",
    emoji: "🍃",
    bgColor: "from-teal-400 to-gold-600",
    spoken: "Plants make their own food by photosynthesis using sunlight and chlorophyll. Animals cannot make food and must eat plants or other animals, moving around freely to find food."
  },
  {
    title: "Internal Organs: Lungs, Heart, Stomach 🫁❤️",
    text: "Internal organs are hidden inside our body! Lungs take in oxygen and release carbon dioxide. The heart pumps blood to the whole body day and night. The stomach digests food using digestive juices.",
    emoji: "🫁",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "Internal organs are hidden inside our body! Lungs take in oxygen and release carbon dioxide. The heart pumps blood to the whole body. The stomach digests food using digestive juices."
  },
  {
    title: "Physical Features: Hills, Plains, Deserts, Valleys ⛰️🏜️",
    text: "Earth has different landforms! Hills are raised lands with slopes. Plains are flat, fertile lands perfect for farming. Deserts are dry sandy regions with little rain. Valleys are low areas between hills with rivers.",
    emoji: "⛰️",
    bgColor: "from-amber-400 to-orange-600",
    spoken: "Earth has different landforms! Hills are raised lands with slopes. Plains are flat, fertile lands perfect for farming. Deserts are dry sandy regions with little rain. Valleys are low areas between hills with rivers."
  },
];

// ─── Custom SVG Icons for Environment, Body, and Landforms ────

function EnvironmentIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="24" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
      <path d="M10 40 Q25 25, 40 40 Q50 30, 45 20 Q35 10, 20 20 Q10 30, 10 40 Z" fill="#22C55E" />
      <circle cx="30" cy="18" r="6" fill="#FACC15" />
    </svg>
  );
}

function PlantIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 L30 25" stroke="#15803D" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 35 C20 30, 15 20, 20 15 C25 15, 30 25, 30 35 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M30 25 C40 20, 45 10, 40 5 C35 5, 30 15, 30 25 Z" fill="#4ADE80" stroke="#16A34A" strokeWidth="1.5" />
      <path d="M22 50 L38 50" stroke="#78350F" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function AnimalIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="32" cy="35" rx="14" ry="10" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
      <circle cx="44" cy="26" r="8" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
      <path d="M48 20 L52 14" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 20 L38 14" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <circle cx="46" cy="25" r="1.5" fill="#1E293B" />
      <path d="M20 40 L18 52" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M42 40 L44 52" stroke="#64748B" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function LungsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 L30 25" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round" />
      <path d="M28 25 C15 25, 10 35, 15 45 C20 52, 28 48, 28 35 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" />
      <path d="M32 25 C45 25, 50 35, 45 45 C40 52, 32 48, 32 35 Z" fill="#FCA5A5" stroke="#EF4444" strokeWidth="2" />
    </svg>
  );
}

function HeartIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 C20 40, 10 30, 10 20 C10 12, 16 8, 23 8 C28 8, 30 12, 30 12 C30 12, 32 8, 37 8 C44 8, 50 12, 50 20 C50 30, 40 40, 30 50 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
    </svg>
  );
}

function StomachIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 15 C35 15, 45 25, 38 45 C32 52, 20 48, 22 38 C23 32, 28 30, 26 22 Z" fill="#FDBA74" stroke="#F97316" strokeWidth="2" />
    </svg>
  );
}

function HillIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 50 L30 18 L50 50 Z" fill="#16A34A" stroke="#15803D" strokeWidth="2" />
      <path d="M25 50 L40 28 L55 50 Z" fill="#22C55E" opacity="0.6" />
    </svg>
  );
}

function PlainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="35" width="40" height="15" fill="#84CC16" stroke="#65A30D" strokeWidth="2" rx="2" />
      <line x1="15" y1="42" x2="45" y2="42" stroke="#4D7C0F" strokeWidth="1.5" strokeDasharray="3,3" />
      <line x1="15" y1="47" x2="45" y2="47" stroke="#4D7C0F" strokeWidth="1.5" strokeDasharray="3,3" />
    </svg>
  );
}

function DesertIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" rx="8" />
      <path d="M15 40 Q30 25, 45 40" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <circle cx="42" cy="18" r="6" fill="#F97316" />
    </svg>
  );
}

function ValleyIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 15 L25 45 L35 45 L50 15 Z" fill="none" stroke="#16A34A" strokeWidth="3" />
      <path d="M25 45 Q30 48, 35 45" fill="none" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function BrainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 C20 15, 15 22, 18 30 C12 33, 15 42, 22 45 C25 48, 35 48, 38 45 C45 42, 48 33, 42 30 C45 22, 40 15, 30 15 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
      <path d="M30 15 L30 45" stroke="#BE185D" strokeWidth="1.5" />
    </svg>
  );
}

// Map icon string to SVG component
function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'environment': return <EnvironmentIcon size={size} />;
    case 'plant': return <PlantIcon size={size} />;
    case 'animal': return <AnimalIcon size={size} />;
    case 'lungs': return <LungsIcon size={size} />;
    case 'heart': return <HeartIcon size={size} />;
    case 'stomach': return <StomachIcon size={size} />;
    case 'hill': return <HillIcon size={size} />;
    case 'plain': return <PlainIcon size={size} />;
    case 'desert': return <DesertIcon size={size} />;
    case 'valley': return <ValleyIcon size={size} />;
    case 'brain': return <BrainIcon size={size} />;
    default: return <EnvironmentIcon size={size} />;
  }
}

// ─── Challenges (8 progressive challenges) ────────────────���───

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

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: 'What does the environment consist of?',
    answer: 'Living and non-living things that interact',
    options: [
      'Living and non-living things that interact',
      'Only living plants and animals',
      'Only non-living air, water, and soil'
    ],
    hint: 'Think about both the living creatures and the non-living air, water, and soil around us!',
    misconception: 'The environment is NOT just plants and animals! It includes both living things AND non-living things (air, water, soil, sunlight) that interact continuously.',
  },
  {
    type: 'sort',
    question: 'Drag each component into Living or Non-Living!',
    answer: 'sort',
    options: [],
    hint: 'Living things grow and reproduce (plants, animals, humans). Non-living things do not (air, water, soil, sunlight)!',
    misconception: 'Air, water, and soil are non-living components of the environment, even though living things depend on them completely!',
    sortItems: [
      { id: 's-plant', label: 'Mango Tree', icon: 'plant', correctBin: 'living' },
      { id: 's-animal', label: 'Cow', icon: 'animal', correctBin: 'living' },
      { id: 's-air', label: 'Air', icon: 'environment', correctBin: 'nonliving' },
      { id: 's-water', label: 'Water', icon: 'environment', correctBin: 'nonliving' },
      { id: 's-soil', label: 'Soil', icon: 'environment', correctBin: 'nonliving' },
    ],
    bins: [
      { id: 'living', label: 'Living Things 🌿', color: '#10B981' },
      { id: 'nonliving', label: 'Non-Living Things 💧', color: '#3B82F6' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a SIMILARITY between plants and animals?',
    answer: 'Both are living things that grow and reproduce',
    options: [
      'Both are living things that grow and reproduce',
      'Both can move freely from place to place',
      'Both make their own food by photosynthesis'
    ],
    hint: 'Think about the basic characteristics of life that both share!',
    misconception: 'Plants do NOT move around or make food the same way animals do, but both ARE living things that grow, need food and water, respire, and reproduce!',
  },
  {
    type: 'sort',
    question: 'Drag each feature to Plant or Animal!',
    answer: 'sort',
    options: [],
    hint: 'Plants make their own food and stay fixed. Animals eat other food and move around!',
    misconception: 'Remember: plants make food by photosynthesis (autotrophic), while animals must eat food (heterotrophic) and can move freely!',
    sortItems: [
      { id: 'f-photo', label: 'Makes food by photosynthesis', icon: 'plant', correctBin: 'plant-bin' },
      { id: 'f-move', label: 'Moves freely from place to place', icon: 'animal', correctBin: 'animal-bin' },
      { id: 'f-chlor', label: 'Has green chlorophyll', icon: 'plant', correctBin: 'plant-bin' },
      { id: 'f-organs', label: 'Has heart and lungs', icon: 'heart', correctBin: 'animal-bin' },
    ],
    bins: [
      { id: 'plant-bin', label: 'Plants 🍃', color: '#10B981' },
      { id: 'animal-bin', label: 'Animals 🐇', color: '#F97316' },
    ],
  },
  {
    type: 'identify',
    question: 'Which internal organ pumps blood to the whole body?',
    answer: 'Heart',
    options: ['Heart', 'Lungs', 'Stomach', 'Brain'],
    hint: 'Place your hand on the left side of your chest. Feel the thump-thump pumping blood!',
    misconception: 'The HEART pumps blood! The lungs take in oxygen, the stomach digests food, and the brain controls thinking. Do not mix up organ functions!',
  },
  {
    type: 'sort',
    question: 'Drag each internal organ to its correct function!',
    answer: 'sort',
    options: [],
    hint: 'Lungs breathe, heart pumps blood, stomach digests food!',
    misconception: 'Check carefully: Lungs handle breathing and gas exchange, the heart pumps blood, and the stomach digests food using digestive juices!',
    sortItems: [
      { id: 'o-lungs', label: 'Takes in oxygen (Lungs)', icon: 'lungs', correctBin: 'b-lungs' },
      { id: 'o-heart', label: 'Pumps blood (Heart)', icon: 'heart', correctBin: 'b-heart' },
      { id: 'o-stomach', label: 'Digests food (Stomach)', icon: 'stomach', correctBin: 'b-stomach' },
    ],
    bins: [
      { id: 'b-lungs', label: 'Lungs 🫁', color: '#3B82F6' },
      { id: 'b-heart', label: 'Heart ❤️', color: '#EF4444' },
      { id: 'b-stomach', label: 'Stomach 🍔', color: '#F97316' },
    ],
  },
  {
    type: 'identify',
    question: 'What is a PLAIN?',
    answer: 'A large flat or gently rolling stretch of land, good for farming',
    options: [
      'A large flat or gently rolling stretch of land, good for farming',
      'A dry sandy region with very little rainfall',
      'A high raised piece of land with a peak'
    ],
    hint: 'Think of the wide flat agricultural lands of Punjab and the Ganga basin!',
    misconception: 'A plain is flat and fertile, made by river deposits, NOT a dry desert or a steep hill! Plains are ideal for farming.',
  },
  {
    type: 'sort',
    question: 'Drag each physical feature to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Hills have slopes, plains are flat, deserts are dry, valleys lie between hills!',
    misconception: 'Remember: Hills are raised with slopes; plains are flat and fertile; deserts are dry with little rain; valleys lie between hills or mountains with a river!',
    sortItems: [
      { id: 'land-hill', label: 'Raised land with slopes', icon: 'hill', correctBin: 'bin-hill' },
      { id: 'land-plain', label: 'Flat fertile land for farming', icon: 'plain', correctBin: 'bin-plain' },
      { id: 'land-desert', label: 'Dry region with little rain', icon: 'desert', correctBin: 'bin-desert' },
      { id: 'land-valley', label: 'Low land between hills with river', icon: 'valley', correctBin: 'bin-valley' },
    ],
    bins: [
      { id: 'bin-hill', label: 'Hills ⛰️', color: '#16A34A' },
      { id: 'bin-plain', label: 'Plains 🌾', color: '#84CC16' },
      { id: 'bin-desert', label: 'Deserts 🌵', color: '#EAB308' },
      { id: 'bin-valley', label: 'Valleys 🌊', color: '#38BDF8' },
    ],
  },
];

// ─── Explorer Aditi Mascot ────────────────────────────────────

function ExplorerAditi({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]"
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
            <linearGradient id="aditi-jacket" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="aditi-face" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#EAB308" />
            </linearGradient>
          </defs>
          {/* Hat / Head */}
          <ellipse cx="37.5" cy="18" rx="18" ry="5" fill="#D97706" />
          <circle cx="37.5" cy="28" r="15" fill="url(#aditi-face)" stroke="#CA8A04" strokeWidth="1.5" />
          {/* Hair */}
          <path d="M22 28 C22 18, 53 18, 53 28 C53 32, 50 35, 48 35 C46 35, 44 30, 37.5 30 C31 30, 29 35, 27 35 C25 35, 22 32, 22 28 Z" fill="#78350F" />
          {/* Eyes */}
          <circle cx="32" cy="27" r="2" fill="#1E293B" />
          <circle cx="43" cy="27" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M33 33 Q37.5 37 42 33" stroke="#1E293B" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Explorer Jacket */}
          <path d="M22 44 L37.5 48 L53 44 L55 75 L20 75 Z" fill="url(#aditi-jacket)" stroke="#065F46" strokeWidth="1.5" />
          {/* Badge */}
          <circle cx="30" cy="55" r="5" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1" />
          <text x="30" y="58" fontSize="8" fill="white" fontWeight="bold" textAnchor="middle">ECO</text>
          {/* Arms */}
          <ellipse cx="16" cy="55" rx="4" ry="10" fill="#047857" transform="rotate(-15 16 55)" />
          <ellipse cx="59" cy="55" rx="4" ry="10" fill="#047857" transform="rotate(15 59 55)" />
          {/* Feet */}
          <ellipse cx="28" cy="82" rx="5" ry="3" fill="#334155" />
          <ellipse cx="47" cy="82" rx="5" ry="3" fill="#334155" />
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

// ─── Nature Exploration Scene Background ─────────────────────

function NatureSceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="nature-sky-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#22C55E" />
          </linearGradient>
          <linearGradient id="hill-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#15803D" />
            <stop offset="100%" stopColor="#166534" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#nature-sky-grad)" />
        {/* Distant Hills */}
        <path d="M0 300 Q150 200, 300 280 Q450 180, 600 260 L720 300 L720 560 L0 560 Z" fill="url(#hill-grad)" opacity="0.6" />
        {/* Ground */}
        <rect x="0" y={height - 110} width={width} height="110" fill="#15803D" />
        <rect x="0" y={height - 110} width={width} height="14" fill="#22C55E" />
      </svg>
    </div>
  );
}

// ─── Sort Card & Bin Components ──────────────────────────────

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
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 bg-white" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 44)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

interface SortBinProps {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovered: boolean;
}

function SortBin({ label, color, x, y, width, height, isHovered }: SortBinProps) {
  return (
    <div
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovered ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}25`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-900 text-center px-2">{label}</span>
      <div className="absolute bottom-2 text-[9px] font-semibold text-gray-600">Drop here!</div>
    </div>
  );
}

// ─── Main Component ──────────────────────────────────────────

export interface EnvironmentBodyGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EnvironmentBodyGame({ width = 720, height = 560, onComplete }: EnvironmentBodyGameProps) {
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
      const count = currentChallenge.sortItems.length;
      const spacing = Math.floor((width - 80) / count);
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 40 + idx * spacing, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, width, height]);

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

    // Check bin bounding boxes
    const binCount = currentChallenge.bins.length;
    const binWidth = Math.floor((width - 60) / binCount) - 15;
    const binHeight = 110;
    const binY = 120;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = 30 + idx * (binWidth + 15);
      if (x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 20 && y <= binY + binHeight + 20) {
        droppedBinId = bin.id;
      }
    });

    setHoveredBin(null);

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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-slate-900 select-none font-sans" style={{ width, height }}>
      <NatureSceneBackground width={width} height={height} />
      <ExplorerAditi mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}

      {/* ─── TEACHING SCREEN ─── */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full p-6 text-white">
          <div className="flex items-center justify-between w-full max-w-xl bg-black/40 backdrop-blur-md rounded-2xl px-4 py-3 border border-white/10 shadow-lg">
            <span className="text-sm font-black text-emerald-400 tracking-wider uppercase">Class 5 EVS • Environment & Body</span>
            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2.5 rounded-full transition-all duration-300 ${idx === slideIdx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-white/30'}`}
                />
              ))}
            </div>
          </div>

          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col items-center text-center p-8 rounded-3xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} shadow-2xl max-w-xl w-full border border-white/20`}
          >
            <div className="text-6xl mb-4 animate-bounce">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3 tracking-wide drop-shadow-md">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed drop-shadow text-white/90">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex justify-between w-full max-w-xl pb-2">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold shadow-lg transition-all ${slideIdx === 0 ? 'bg-white/10 text-white/40 cursor-not-allowed' : 'bg-white text-gray-900 hover:bg-emerald-50 hover:text-emerald-700'}`}
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
              className="px-8 py-3 rounded-2xl font-black bg-gradient-to-r from-emerald-400 to-green-500 text-white shadow-xl hover:from-emerald-500 hover:to-green-600 transition-all transform hover:scale-105"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Exploration! 🚀' : 'Next ➔'}
            </button>
          </div>
        </div>
      )}

      {/* ─── PLAY SCREEN ─── */}
      {screen === 'play' && (
        <div className="relative z-10 flex flex-col items-center justify-between h-full p-6 text-white">
          {/* Header Bar */}
          <div className="flex items-center justify-between w-full max-w-2xl bg-black/50 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 shadow-lg">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-extrabold text-amber-300">Score: {score}</span>
              <button
                onClick={handleShowHint}
                className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow transition-all"
              >
                💡 Hint
              </button>
            </div>
          </div>

          {/* Challenge Card */}
          <div className="flex flex-col items-center max-w-2xl w-full my-auto">
            <motion.div
              key={challengeIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-slate-800/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/15 w-full text-center"
            >
              <h3 className="text-lg font-black text-white mb-6 leading-snug">{currentChallenge.question}</h3>

              {/* IDENTIFY CHALLENGE TYPE */}
              {currentChallenge.type === 'identify' && (
                <div className="flex flex-col gap-3 w-full">
                  {currentChallenge.options.map((opt, idx) => {
                    const isSelected = selectedOpt === opt;
                    const isCorrect = opt === currentChallenge.answer;
                    let btnStyle = 'bg-slate-700 hover:bg-slate-600 text-white border-white/10';
                    if (selectedOpt) {
                      if (isCorrect) btnStyle = 'bg-emerald-600 text-white border-emerald-400 shadow-lg shadow-emerald-600/30';
                      else if (isSelected) btnStyle = 'bg-rose-600 text-white border-rose-400 shadow-lg shadow-rose-600/30';
                    }
                    return (
                      <motion.button
                        key={idx}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                        disabled={selectedOpt !== null}
                        className={`w-full p-4 rounded-2xl border-2 font-bold text-left text-sm transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{opt}</span>
                        {selectedOpt && isCorrect && <span className="text-xl">✅</span>}
                        {selectedOpt && isSelected && !isCorrect && <span className="text-xl">❌</span>}
                      </motion.button>
                    );
                  })}

                  {selectedOpt && (
                    <motion.button
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      onClick={advanceChallenge}
                      className="mt-4 mx-auto px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-black rounded-2xl shadow-xl transition-all transform hover:scale-105"
                    >
                      Continue ➔
                    </motion.button>
                  )}
                </div>
              )}

              {/* SORT CHALLENGE TYPE */}
              {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
                <div className="relative w-full h-[260px]">
                  {/* Bins */}
                  <div className="flex justify-around w-full mb-4">
                    {currentChallenge.bins.map((bin, idx) => {
                      const binCount = currentChallenge.bins?.length || 1;
                      const binWidth = Math.floor((width - 60) / binCount) - 15;
                      return (
                        <SortBin
                          key={bin.id}
                          id={bin.id}
                          label={bin.label}
                          color={bin.color}
                          x={30 + idx * (binWidth + 15)}
                          y={10}
                          width={binWidth}
                          height={110}
                          isHovered={hoveredBin === bin.id}
                        />
                      );
                    })}
                  </div>

                  {/* Draggable items */}
                  {currentChallenge.sortItems.map(item => {
                    const pos = itemPositions[item.id] || { x: 50, y: 180 };
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

                  {/* Continue button when all sorted */}
                  {currentChallenge.sortItems.every(i => placedItems[i.id]) && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute inset-x-0 bottom-2 flex justify-center z-30"
                    >
                      <button
                        onClick={advanceChallenge}
                        className="px-8 py-3 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-500 hover:to-green-600 text-white font-black rounded-2xl shadow-xl transition-all transform hover:scale-105"
                      >
                        Continue ➔
                      </button>
                    </motion.div>
                  )}
                </div>
              )}
            </motion.div>
          </div>

          <div className="w-full max-w-2xl flex justify-between items-center pb-2">
            <span className="text-xs text-white/60">ICSE Class 5 EVS • Environment & Body</span>
            {challengeIdx === CHALLENGES.length - 1 && selectedOpt && (
              <button
                onClick={advanceChallenge}
                className="px-6 py-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold rounded-xl shadow-lg"
              >
                Complete Game 🎉
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
