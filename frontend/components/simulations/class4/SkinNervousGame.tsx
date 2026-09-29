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

// ─── SVG ICON COMPONENTS (Custom SVG, No Emoji as Primary) ───

function BrainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C20 10, 10 18, 12 30 C10 40, 20 50, 30 48 C40 50, 50 40, 48 30 C50 18, 40 10, 30 10 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
      <path d="M30 10 L30 48" stroke="#DB2777" strokeWidth="2" strokeDasharray="3 3" />
      <path d="M20 20 C25 25, 25 35, 20 40" stroke="#FBCFE8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M40 20 C35 25, 35 35, 40 40" stroke="#FBCFE8" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M18 28 C22 30, 28 30, 32 28" stroke="#FBCFE8" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function SpinalCordIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="24" y="5" width="12" height="50" rx="6" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="30" cy="12" r="3" fill="#1D4ED8" />
      <circle cx="30" cy="22" r="3" fill="#1D4ED8" />
      <circle cx="30" cy="32" r="3" fill="#1D4ED8" />
      <circle cx="30" cy="42" r="3" fill="#1D4ED8" />
      <path d="M16 12 L24 12 M36 12 L44 12" stroke="#3B82F6" strokeWidth="2" />
      <path d="M16 22 L24 22 M36 22 L44 22" stroke="#3B82F6" strokeWidth="2" />
      <path d="M16 32 L24 32 M36 32 L44 32" stroke="#3B82F6" strokeWidth="2" />
      <path d="M16 42 L24 42 M36 42 L44 42" stroke="#3B82F6" strokeWidth="2" />
    </svg>
  );
}

function NerveIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 30 Q30 10, 50 30 Q30 50, 10 30 Z" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
      <circle cx="30" cy="30" r="8" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
      <path d="M30 22 L30 10 M30 38 L30 50 M22 30 L10 30 M38 30 L50 30" stroke="#CA8A04" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SkinIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      {/* Epidermis */}
      <rect x="10" y="10" width="40" height="15" rx="3" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
      {/* Dermis */}
      <rect x="10" y="25" width="40" height="25" rx="3" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2" />
      {/* Nerve ending */}
      <path d="M30 50 L30 35 Q35 30, 30 25" stroke="#2563EB" strokeWidth="2" fill="none" />
      <circle cx="30" cy="25" r="3" fill="#2563EB" />
    </svg>
  );
}

function EpidermisIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="30" rx="6" fill="#FDE68A" stroke="#D97706" strokeWidth="2.5" />
      <path d="M15 25 L45 25" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 2" />
      <path d="M15 35 L45 35" stroke="#D97706" strokeWidth="1.5" strokeDasharray="4 2" />
      <text x="30" y="33" fontSize="10" fill="#92400E" textAnchor="middle" fontWeight="bold">SHIELD</text>
    </svg>
  );
}

function DermisIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="15" width="40" height="30" rx="6" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2.5" />
      <circle cx="22" cy="30" r="4" fill="#2563EB" />
      <circle cx="38" cy="30" r="4" fill="#2563EB" />
      <path d="M22 30 L38 30" stroke="#2563EB" strokeWidth="2" />
      <text x="30" y="48" fontSize="10" fill="#991B1B" textAnchor="middle" fontWeight="bold">SENSORS</text>
    </svg>
  );
}

function TouchIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 40 L20 25 C20 20, 40 20, 40 25 L40 40 Z" fill="#FBCFE8" stroke="#EC4899" strokeWidth="2" />
      <circle cx="30" cy="22" r="6" fill="#F472B6" />
      <path d="M15 45 C15 52, 45 52, 45 45" fill="none" stroke="#EC4899" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function HotIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 25 L45 25 L42 45 C42 48, 38 50, 30 50 C22 50, 18 48, 18 45 Z" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2" />
      <path d="M45 28 L50 25 L50 35 L45 32 Z" fill="#DC2626" />
      {/* Steam */}
      <path d="M24 18 Q27 12, 24 8" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M36 18 Q33 12, 36 8" stroke="#EF4444" strokeWidth="2" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function ColdIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="18" y="18" width="24" height="24" rx="4" fill="#93C5FD" stroke="#2563EB" strokeWidth="2" transform="rotate(45 30 30)" />
      <circle cx="30" cy="30" r="4" fill="#60A5FA" />
      <path d="M30 10 L30 50 M10 30 L50 30" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function PainIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="30,8 45,45 30,38 15,45" fill="#EF4444" stroke="#B91C1C" strokeWidth="2" />
      <circle cx="30" cy="22" r="3" fill="white" />
    </svg>
  );
}

function SweatIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C22 25, 16 33, 16 40 C16 48, 22 52, 30 52 C38 52, 44 48, 44 40 C44 33, 38 25, 30 10 Z" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <ellipse cx="25" cy="38" rx="4" ry="6" fill="white" opacity="0.6" />
    </svg>
  );
}

function HairIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 50 L30 15" stroke="#78350F" strokeWidth="4" strokeLinecap="round" />
      <circle cx="30" cy="45" r="8" fill="#FDE68A" stroke="#B45309" strokeWidth="2" />
    </svg>
  );
}

function EyeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 30 C20 15, 40 15, 50 30 C40 45, 20 45, 10 30 Z" fill="white" stroke="#1E3A8A" strokeWidth="2" />
      <circle cx="30" cy="30" r="10" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
      <circle cx="30" cy="30" r="4" fill="#1E3A8A" />
      <circle cx="33" cy="27" r="2" fill="white" />
    </svg>
  );
}

function EarIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M22 15 C12 15, 12 45, 25 45 C32 45, 38 38, 38 30 C38 22, 30 20, 30 25 C30 30, 35 35, 30 40" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

// ─── Render Helper for Sort Cards ─────────────────────────────

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'brain': return <BrainIcon size={size} />;
    case 'spinal': return <SpinalCordIcon size={size} />;
    case 'nerve': return <NerveIcon size={size} />;
    case 'skin': return <SkinIcon size={size} />;
    case 'epidermis': return <EpidermisIcon size={size} />;
    case 'dermis': return <DermisIcon size={size} />;
    case 'touch': return <TouchIcon size={size} />;
    case 'hot': return <HotIcon size={size} />;
    case 'cold': return <ColdIcon size={size} />;
    case 'pain': return <PainIcon size={size} />;
    case 'sweat': return <SweatIcon size={size} />;
    case 'hair': return <HairIcon size={size} />;
    case 'eye': return <EyeIcon size={size} />;
    case 'ear': return <EarIcon size={size} />;
    default: return <BrainIcon size={size} />;
  }
}

// ─── Hospital Neurology Lab Scene Background ──────────────────

function SceneBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="lab-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="60%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#7DD3FC" />
          </linearGradient>
          <linearGradient id="lab-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#lab-sky)" />
        {/* Lab Window / Skyline */}
        <rect x="40" y="30" width="120" height="150" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" rx="4" />
        <line x1="100" y1="30" x2="100" y2="180" stroke="#0284C7" strokeWidth="2" />
        <line x1="40" y1="105" x2="160" y2="105" stroke="#0284C7" strokeWidth="2" />
        {/* Floor */}
        <rect x="0" y={height - 80} width={width} height="80" fill="url(#lab-floor)" />
      </svg>
    </div>
  );
}

// ─── Neurologist Neha Mascot ──────────────────────────────────

function NehaMascot({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white/95 backdrop-blur rounded-2xl px-4 py-3 shadow-xl max-w-[260px] border-2 border-gold-300"
          >
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'thinking'
              ? { rotate: [0, 8, 0] }
              : { y: [0, -5, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="flex flex-col items-center"
      >
        <svg width="85" height="100" viewBox="0 0 100 120">
          {/* Lab coat body */}
          <path d="M30 70 L20 110 L80 110 L70 70 Z" fill="white" stroke="#CBD5E1" strokeWidth="2" />
          <path d="M50 70 L35 110 L65 110 Z" fill="#38BDF8" />
          {/* Stethoscope */}
          <path d="M40 70 C35 85, 65 85, 60 70" fill="none" stroke="#64748B" strokeWidth="2.5" />
          <circle cx="50" cy="85" r="5" fill="#EF4444" />
          {/* Head & Hair */}
          <circle cx="50" cy="45" r="22" fill="#FED7AA" stroke="#C2410C" strokeWidth="1.5" />
          <path d="M28 40 C28 20, 72 20, 72 40 C72 50, 68 50, 65 40 C62 30, 38 30, 35 40 C32 50, 28 50, 28 40 Z" fill="#78350F" />
          {/* Glasses */}
          <circle cx="41" cy="43" r="7" fill="none" stroke="#1E293B" strokeWidth="2" />
          <circle cx="59" cy="43" r="7" fill="none" stroke="#1E293B" strokeWidth="2" />
          <line x1="48" y1="43" x2="52" y2="43" stroke="#1E293B" strokeWidth="2" />
          {/* Eyes */}
          <circle cx="41" cy="43" r="2" fill="#1E293B" />
          <circle cx="59" cy="43" r="2" fill="#1E293B" />
          {/* Smile */}
          <path d="M45 55 Q50 60 55 55" stroke="#C2410C" strokeWidth="2" fill="none" strokeLinecap="round" />
          {/* Brain badge */}
          <circle cx="50" cy="95" r="7" fill="#F472B6" stroke="#DB2777" strokeWidth="1.5" />
          <path d="M47 95 Q50 90 53 95" stroke="white" strokeWidth="1.5" fill="none" />
          {/* Reflex Hammer in hand */}
          <rect x="75" y="75" width="4" height="25" rx="2" fill="#94A3B8" transform="rotate(30 75 75)" />
          <rect x="68" y="73" width="16" height="6" rx="2" fill="#334155" transform="rotate(30 75 75)" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Reward Row ──────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.4, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Sort Card & Bin Components ───────────────────────────────

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-gold-300 ${placed ? 'opacity-40 bg-gray-100' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
  isHovering: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}

function SortBin({ label, color, x, y, width, height, isHovering, onMouseEnter, onMouseLeave }: SortBinProps) {
  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}15`,
        borderColor: color,
      }}
    >
      <span className="text-sm font-extrabold text-gray-800 text-center px-2">{label}</span>
    </div>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Skin: The Largest Sense Organ! 🛡️",
    text: "The skin covers our entire body like a protective blanket! It has two main layers: the outer epidermis and the inner dermis. It protects us and helps us feel the world!",
    emoji: "🛡️",
    bgColor: "from-amber-400 to-orange-500",
    spoken: "The skin covers our entire body like a protective blanket! It has two main layers: the outer epidermis and the inner dermis. It protects us and helps us feel the world!",
  },
  {
    title: "Two Layers of Skin 🔬",
    text: "The epidermis is the thin outer layer that acts like a raincoat against germs and dirt. The dermis is the thick inner layer with tiny nerve endings that pick up touch, hot, cold, and pain!",
    emoji: "🔬",
    bgColor: "from-gold-400 to-gold-600",
    spoken: "The epidermis is the thin outer layer that acts like a raincoat against germs and dirt. The dermis is the thick inner layer with tiny nerve endings that pick up touch, hot, cold, and pain!",
  },
  {
    title: "Sweating Keeps Us Cool 💧",
    text: "When we play hard or when it is very hot, our skin produces sweat through tiny pores. As the sweat dries, it takes away heat and cools our body down!",
    emoji: "💧",
    bgColor: "from-teal-400 to-gold-600",
    spoken: "When we play hard or when it is very hot, our skin produces sweat through tiny pores. As the sweat dries, it takes away heat and cools our body down!",
  },
  {
    title: "The Nervous System: Boss & Highway 🧠",
    text: "The nervous system is our body's control network! It is made of three parts: the brain (the control centre inside the skull), the spinal cord (the information highway), and nerves (tiny wires across the body)!",
    emoji: "🧠",
    bgColor: "from-purple-400 to-gold-600",
    spoken: "The nervous system is our body's control network! It is made of three parts: the brain, the spinal cord, and nerves!",
  },
  {
    title: "The Amazing Signal Pathway ⚡",
    text: "When you touch a hot pan: Skin feels it -> Nerve carries signal -> Spinal cord -> Brain decides -> Response! The message travels at lightning speed!",
    emoji: "⚡",
    bgColor: "from-pink-500 to-rose-600",
    spoken: "When you touch a hot pan: Skin feels it, nerve carries signal, spinal cord, brain decides, and response! The message travels at lightning speed!",
  },
];

// ─── Challenges ───────────────────────────────────────────────

interface SortItem {
  id: string;
  label: string;
  icon: string;
  correctBin: string;
}

interface SortBinDef {
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
  bins?: SortBinDef[];
}

const CHALLENGES: Challenge[] = [
  {
    type: 'identify',
    question: "What is the LARGEST sense organ of the human body?",
    answer: "The skin",
    options: ["The skin", "The eye", "The ear"],
    hint: "Think: which organ covers your entire body from head to toe?",
    misconception: "The skin is the largest sense organ because it covers our whole body! Eyes, ears, nose, and tongue are located in specific spots, but skin is everywhere.",
  },
  {
    type: 'identify',
    question: "What are the TWO main layers of the skin?",
    answer: "Epidermis (outer) and dermis (inner)",
    options: ["Epidermis (outer) and dermis (inner)", "Skull and brain", "Heart and lungs"],
    hint: "Think about the thin outer shield and the thicker inner layer with nerve endings.",
    misconception: "The two main layers are the epidermis (outer protective layer) and dermis (inner layer with nerve endings). Skull and brain belong to the nervous system!",
  },
  {
    type: 'sort',
    question: "Drag each skin part or function to the correct layer!",
    answer: "sort",
    options: [],
    hint: "Epidermis is the outer shield against germs. Dermis has nerve endings for feeling!",
    misconception: "The outer epidermis protects against germs and water loss. The inner dermis contains nerve endings for touch, heat, cold, and pain, plus sweat glands and hair follicles!",
    sortItems: [
      { id: 'epi-shield', label: 'Protects from germs', icon: 'epidermis', correctBin: 'epidermis' },
      { id: 'der-nerve', label: 'Nerve endings for touch', icon: 'dermis', correctBin: 'dermis' },
      { id: 'der-sweat', label: 'Sweat glands for cooling', icon: 'sweat', correctBin: 'dermis' },
      { id: 'epi-water', label: 'Prevents water loss', icon: 'skin', correctBin: 'epidermis' },
    ],
    bins: [
      { id: 'epidermis', label: 'Epidermis (Outer)', color: '#D97706' },
      { id: 'dermis', label: 'Dermis (Inner)', color: '#DC2626' },
    ],
  },
  {
    type: 'identify',
    question: "When you touch a HOT cup of tea, what happens FIRST?",
    answer: "Nerve endings in the skin feel heat and send a message",
    options: [
      "Nerve endings in the skin feel heat and send a message",
      "The brain pulls the hand away without any signal",
      "The hand moves on its own without touching anything"
    ],
    hint: "Skin nerve endings act like antennas to pick up heat or cold first!",
    misconception: "The skin's nerve endings must feel the heat first and send a signal through nerves to the brain before the brain can order the hand to move!",
  },
  {
    type: 'sort',
    question: "Drag the signal pathway steps in correct order (1 to 4)!",
    answer: "sort",
    options: [],
    hint: "Starts at sense organ -> nerve -> spinal cord -> brain!",
    misconception: "The correct pathway always starts at the sense organ collecting information, travels along nerves, through the spinal cord, up to the brain, and finally back to the muscles as a response!",
    sortItems: [
      { id: 'step-1', label: '1. Skin feels touch', icon: 'touch', correctBin: 'bin-1' },
      { id: 'step-2', label: '2. Nerve sends signal', icon: 'nerve', correctBin: 'bin-2' },
      { id: 'step-3', label: '3. Spinal cord highway', icon: 'spinal', correctBin: 'bin-3' },
      { id: 'step-4', label: '4. Brain decides response', icon: 'brain', correctBin: 'bin-4' },
    ],
    bins: [
      { id: 'bin-1', label: 'Step 1', color: '#2563EB' },
      { id: 'bin-2', label: 'Step 2', color: '#7C3AED' },
      { id: 'bin-3', label: 'Step 3', color: '#DB2777' },
      { id: 'bin-4', label: 'Step 4', color: '#059669' },
    ],
  },
  {
    type: 'identify',
    question: "Which organ is the CONTROL CENTRE of the body that helps us think, learn, and remember?",
    answer: "The brain",
    options: ["The brain", "The heart", "The stomach"],
    hint: "It is a soft, jelly-like organ protected safely inside your skull.",
    misconception: "The brain is the control centre of the body! It helps us think, remember, feel emotions, and decide how we move.",
  },
  {
    type: 'sort',
    question: "Drag each nervous system part to its correct function!",
    answer: "sort",
    options: [],
    hint: "Brain = control centre. Spinal cord = information highway. Nerves = tiny wires.",
    misconception: "The brain controls thinking and memory, the spinal cord carries messages up and down the back highway, and nerves branch out like wires to every corner of the body!",
    sortItems: [
      { id: 'part-brain', label: 'Brain: Control centre', icon: 'brain', correctBin: 'bin-brain' },
      { id: 'part-spinal', label: 'Spinal cord: Message highway', icon: 'spinal', correctBin: 'bin-spinal' },
      { id: 'part-nerves', label: 'Nerves: Wire-like carriers', icon: 'nerve', correctBin: 'bin-nerves' },
    ],
    bins: [
      { id: 'bin-brain', label: 'Brain 🧠', color: '#DB2777' },
      { id: 'bin-spinal', label: 'Spinal Cord 🧬', color: '#2563EB' },
      { id: 'bin-nerves', label: 'Nerves ⚡', color: '#D97706' },
    ],
  },
  {
    type: 'sort',
    question: "Drag each sense organ to what it senses!",
    answer: "sort",
    options: [],
    hint: "Eyes = sight, Ears = hearing, Skin = touch/pain!",
    misconception: "Each sense organ has a specific job: eyes for sight, ears for hearing, nose for smell, tongue for taste, and skin for touch, temperature, and pain!",
    sortItems: [
      { id: 'sense-eye', label: 'Eyes: Sight', icon: 'eye', correctBin: 'bin-sight' },
      { id: 'sense-ear', label: 'Ears: Hearing', icon: 'ear', correctBin: 'bin-hearing' },
      { id: 'sense-skin', label: 'Skin: Touch & Pain', icon: 'touch', correctBin: 'bin-touch' },
    ],
    bins: [
      { id: 'bin-sight', label: 'Sight 👀', color: '#2563EB' },
      { id: 'bin-hearing', label: 'Hearing 👂', color: '#059669' },
      { id: 'bin-touch', label: 'Touch ✋', color: '#D97706' },
    ],
  },
];

// ─── Component Props ──────────────────────────────────────────

export interface SkinNervousGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Game Component ──────────────────────────────────────

export function SkinNervousGame({ width = 720, height = 560, onComplete }: SkinNervousGameProps) {
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
  }, [challengeIdx, screen, currentChallenge.question, resetInactivityTimer]);

  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const newPos: Record<string, { x: number; y: number }> = {};
      const newPlaced: Record<string, boolean> = {};
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 30 + idx * 125, y: height - 165 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height, currentChallenge]);

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
      const msg = "Great job! You know your body systems!";
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
      const compMsg = "Wonderful! You are a brilliant nervous system expert!";
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

    // Check bin hit
    let droppedBinId: string | null = null;
    const bins = currentChallenge.bins;
    bins.forEach((bin, idx) => {
      const binX = 40 + idx * (Math.floor((width - 80) / bins.length));
      const binY = 160;
      const binW = Math.floor((width - 100) / bins.length);
      const binH = 140;
      if (x >= binX - 20 && x <= binX + binW + 20 && y >= binY - 20 && y <= binY + binH + 20) {
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
        const msg = "Fantastic! You sorted the skin and nervous facts perfectly!";
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
    <div
      className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans"
      style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}
    >
      <SceneBackground width={width} height={height} />
      <NehaMascot mood={mascotMood} speaking={speakingText} />

      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}

      {/* Top Header Bar */}
      <div className="absolute top-4 left-4 right-24 z-10 flex items-center justify-between bg-white/90 backdrop-blur px-4 py-2 rounded-2xl shadow-md border border-gold-200">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-gold-700">Skin & Nerves 🧠</span>
          <StarRow count={Math.min(5, Math.floor(score / 25))} total={5} />
        </div>
        <div className="flex items-center gap-4 text-sm font-bold text-gray-700">
          <span>Score: {score}</span>
          {screen === 'play' && (
            <span>Challenge {challengeIdx + 1}/{CHALLENGES.length}</span>
          )}
        </div>
      </div>

      {/* TEACHING SCREEN */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-24 pb-6 px-8 flex flex-col items-center justify-between z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`w-full max-w-xl p-6 rounded-3xl shadow-xl bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white flex flex-col items-center text-center`}
          >
            <span className="text-5xl mb-3">{TEACHING_SLIDES[slideIdx].emoji}</span>
            <h2 className="text-2xl font-extrabold mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
          </motion.div>

          <div className="flex items-center justify-between w-full max-w-xl px-4">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-5 py-2 rounded-2xl font-bold shadow-md transition-all ${slideIdx === 0 ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-white text-gold-700 hover:bg-gold-50'}`}
            >
              Previous
            </button>

            <div className="flex gap-2">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slideIdx ? 'bg-gold-600 scale-125' : 'bg-gold-200'}`} />
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
              className="px-6 py-2.5 rounded-2xl font-extrabold shadow-lg bg-gold-600 text-white hover:bg-gold-700 transition-all"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? "Start Game! 🚀" : "Next ➔"}
            </button>
          </div>
        </div>
      )}

      {/* PLAY SCREEN */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-24 pb-6 px-6 flex flex-col items-center justify-between z-10">
          {/* Question Box */}
          <div className="w-full max-w-2xl bg-white/95 backdrop-blur rounded-2xl p-4 shadow-lg border border-gold-200 text-center">
            <h3 className="text-lg font-extrabold text-gray-800">{currentChallenge.question}</h3>
          </div>

          {/* Multiple Choice Options */}
          {currentChallenge.type === 'identify' && currentChallenge.options && (
            <div className="grid grid-cols-1 gap-3 w-full max-w-lg my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = "bg-white border-gold-300 hover:bg-gold-50 text-gray-800";
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = "bg-emerald-500 border-emerald-600 text-white font-bold";
                  else if (isSelected) btnStyle = "bg-rose-500 border-rose-600 text-white font-bold";
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`py-3.5 px-6 rounded-2xl border-2 shadow-md text-base transition-all ${btnStyle}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sort Challenge Area */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="w-full h-full relative my-auto">
              {/* Bins */}
              {currentChallenge.bins.map((bin, idx) => {
                const binW = Math.floor((width - 80) / currentChallenge.bins!.length);
                const binX = 35 + idx * binW;
                return (
                  <SortBin
                    key={bin.id}
                    id={bin.id}
                    label={bin.label}
                    color={bin.color}
                    x={binX}
                    y={150}
                    width={binW - 10}
                    height={140}
                    isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                  />
                );
              })}

              {/* Draggable Items */}
              {currentChallenge.sortItems.map((item) => {
                const pos = itemPositions[item.id] || { x: 50, y: height - 160 };
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

          {/* Bottom Action Bar */}
          <div className="w-full max-w-2xl flex items-center justify-between px-4">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 rounded-xl bg-amber-100 border border-amber-300 text-amber-800 font-bold text-sm shadow hover:bg-amber-200 transition-all"
            >
              💡 Need Hint?
            </button>

            {((currentChallenge.type === 'identify' && selectedOpt === currentChallenge.answer) ||
              (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={advanceChallenge}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white font-extrabold shadow-lg hover:bg-emerald-700 transition-all"
              >
                Continue ➔
              </motion.button>
            )}

            {isIncorrect && currentChallenge.type === 'identify' && (
              <button
                onClick={() => {
                  setSelectedOpt(null);
                  setIsIncorrect(false);
                }}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold text-sm shadow hover:bg-rose-700 transition-all"
              >
                Try Again 🔄
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
