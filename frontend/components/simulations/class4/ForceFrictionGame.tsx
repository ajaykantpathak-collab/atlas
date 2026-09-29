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

// ─── SVG Icon Components ────��─────────────────────────────────

function PushIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="20" width="30" height="20" rx="3" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="2" />
      <path d="M5 30 L20 30 M15 25 L20 30 L15 35" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="45" cy="30" r="6" fill="#F43F5E" />
    </svg>
  );
}

function PullIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="20" width="30" height="20" rx="3" fill="#34D399" stroke="#047857" strokeWidth="2" />
      <path d="M40 30 L25 30 M30 25 L25 30 L30 35" stroke="#2563EB" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="15" cy="30" r="6" fill="#3B82F6" />
    </svg>
  );
}

function MuscleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 35 Q15 20, 30 20 Q45 20, 45 35 Q45 45, 30 45 Q15 45, 15 35 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <path d="M22 30 Q30 25, 38 30" stroke="#78350F" strokeWidth="2" fill="none" />
      <circle cx="30" cy="32" r="4" fill="#78350F" />
    </svg>
  );
}

function GravityIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="20" r="8" fill="#EF4444" stroke="#991B1B" strokeWidth="1.5" />
      <path d="M30 28 L30 45 M25 40 L30 45 L35 40" stroke="#1D4ED8" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="30" cy="50" rx="15" ry="3" fill="#9CA3AF" />
    </svg>
  );
}

function MagnetIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 15 L18 35 Q18 45, 30 45 Q42 45, 42 35 L42 15" stroke="#EF4444" strokeWidth="8" fill="none" strokeLinecap="round" />
      <rect x="14" y="12" width="8" height="8" fill="#60A5FA" rx="1" />
      <rect x="38" y="12" width="8" height="8" fill="#F87171" rx="1" />
    </svg>
  );
}

function FrictionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="25" width="40" height="10" rx="2" fill="#9CA3AF" stroke="#4B5563" strokeWidth="1.5" />
      <rect x="15" y="35" width="30" height="10" rx="2" fill="#D1D5DB" stroke="#4B5563" strokeWidth="1.5" />
      <path d="M20 25 L25 15 M30 25 L35 15 M40 25 L45 15" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function BicycleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="15" cy="40" r="10" fill="none" stroke="#374151" strokeWidth="3" />
      <circle cx="45" cy="40" r="10" fill="none" stroke="#374151" strokeWidth="3" />
      <path d="M15 40 L30 20 L45 40 L30 40 Z" fill="none" stroke="#3B82F6" strokeWidth="3" strokeLinejoin="round" />
      <circle cx="30" cy="40" r="4" fill="#F59E0B" />
    </svg>
  );
}

function OilCanIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 35 L25 25 L40 30 L45 40 L15 40 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" rx="2" />
      <path d="M40 30 L52 20 L55 23 L45 35 Z" fill="#EAB308" />
      <rect x="25" y="18" width="10" height="7" fill="#FBBF24" rx="1" />
    </svg>
  );
}

function PowderIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="18" ry="10" fill="#F3F4F6" stroke="#9CA3AF" strokeWidth="1.5" />
      <circle cx="22" cy="20" r="3" fill="#38BDF8" />
      <circle cx="30" cy="15" r="3.5" fill="#38BDF8" />
      <circle cx="38" cy="22" r="3" fill="#38BDF8" />
      <path d="M22 20 Q30 28, 38 22" stroke="#0284C7" strokeWidth="2" fill="none" strokeDasharray="3,3" />
    </svg>
  );
}

function CarromIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="10" width="40" height="40" fill="#FEF08A" stroke="#854D0E" strokeWidth="2" rx="4" />
      <circle cx="16" cy="16" r="3" fill="#1F2937" />
      <circle cx="44" cy="16" r="3" fill="#1F2937" />
      <circle cx="16" cy="44" r="3" fill="#1F2937" />
      <circle cx="44" cy="44" r="3" fill="#1F2937" />
      <circle cx="30" cy="30" r="6" fill="#EF4444" />
    </svg>
  );
}

function ShapeChangeIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="30" rx="16" ry="12" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
      <path d="M10 30 L18 30 M50 30 L42 30" stroke="#1D4ED8" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function DirectionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="20" cy="40" r="6" fill="#3B82F6" />
      <path d="M20 34 Q20 15, 42 20" stroke="#EF4444" strokeWidth="2.5" fill="none" strokeDasharray="4,4" />
      <path d="M38 16 L45 21 L38 24 Z" fill="#EF4444" />
    </svg>
  );
}

function ShoeSoleIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 15 Q35 12, 45 22 Q52 32, 42 45 Q32 52, 22 45 Q12 35, 18 15 Z" fill="#78716C" stroke="#44403C" strokeWidth="2" />
      <line x1="22" y1="22" x2="38" y2="22" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
      <line x1="20" y1="30" x2="40" y2="30" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
      <line x1="22" y1="38" x2="36" y2="38" stroke="#A8A29E" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'push': return <PushIcon size={size} />;
    case 'pull': return <PullIcon size={size} />;
    case 'muscle': return <MuscleIcon size={size} />;
    case 'gravity': return <GravityIcon size={size} />;
    case 'magnet': return <MagnetIcon size={size} />;
    case 'friction': return <FrictionIcon size={size} />;
    case 'bicycle': return <BicycleIcon size={size} />;
    case 'oil': return <OilCanIcon size={size} />;
    case 'powder': return <PowderIcon size={size} />;
    case 'carrom': return <CarromIcon size={size} />;
    case 'shape': return <ShapeChangeIcon size={size} />;
    case 'direction': return <DirectionIcon size={size} />;
    case 'shoe': return <ShoeSoleIcon size={size} />;
    default: return <PushIcon size={size} />;
  }
}

// ─── Physics Workshop Background ──────────────────────────────

function PhysicsBackground({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="workshop-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="50%" stopColor="#334155" />
            <stop offset="100%" stopColor="#475569" />
          </linearGradient>
          <linearGradient id="workshop-floor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#workshop-sky)" />
        <rect y={height * 0.75} width={width} height={height * 0.25} fill="url(#workshop-floor)" />
        {/* Gear decorations */}
        <circle cx="80" cy="80" r="30" fill="none" stroke="#64748B" strokeWidth="4" strokeDasharray="10,6" opacity="0.4" />
        <circle cx={width - 80} cy="100" r="40" fill="none" stroke="#64748B" strokeWidth="6" strokeDasharray="12,8" opacity="0.3" />
      </svg>
    </div>
  );
}

// ─── Engineer Esha Mascot ─────────────────────────────────────

function EngineerEsha({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
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
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
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
        <svg width="70" height="85" viewBox="0 0 70 85">
          {/* Hard Hat */}
          <path d="M20 22 Q35 10, 50 22 Z" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
          <rect x="16" y="22" width="38" height="4" rx="2" fill="#D97706" />
          {/* Head & Face */}
          <circle cx="35" cy="38" r="14" fill="#FDE68A" stroke="#D97706" strokeWidth="1" />
          {/* Goggles on hat */}
          <rect x="25" y="25" width="20" height="7" rx="3" fill="#60A5FA" stroke="#1E3A8A" strokeWidth="1" />
          {/* Eyes */}
          <circle cx="30" cy="37" r="2" fill="#1F2937" />
          <circle cx="40" cy="37" r="2" fill="#1F2937" />
          {/* Smile */}
          <path d="M31 43 Q35 47, 39 43" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round" />
          {/* Overalls / Body */}
          <path d="M22 52 L35 48 L48 52 L52 75 L18 75 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5" />
          {/* Gear Badge */}
          <circle cx="35" cy="62" r="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1" />
          <circle cx="35" cy="62" r="2" fill="white" />
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
    title: "Push and Pull! 🚪",
    text: "A force is a push or a pull! A push sends things AWAY from you, like pushing a heavy classroom door. A pull brings things CLOSER to you, like pulling a desk drawer out!",
    emoji: "🚪",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "A force is a push or a pull! A push sends things away from you, and a pull brings things closer to you!",
  },
  {
    title: "Force Changes Shape & Direction! ⚽",
    text: "Force can change an object's shape — like squeezing a soft clay ball! Force can also change a moving object's direction — like hitting a cricket ball with a bat!",
    emoji: "⚽",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Force can change an object's shape like squeezing clay, and change a moving object's direction like hitting a cricket ball!",
  },
  {
    title: "Four Types of Forces! 🌍",
    text: "Forces come from different sources! Muscular force (from muscles), gravitational force (the Earth pulling things down), magnetic force (magnets pulling iron), and frictional force!",
    emoji: "🌍",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Forces come from four sources: muscular force, gravitational force, magnetic force, and frictional force!",
  },
  {
    title: "Friction as a Force! 🛑",
    text: "Friction is the force that opposes motion when two surfaces rub together. It acts opposite to the direction of motion, which is why a rolling ball gradually slows down and stops!",
    emoji: "🛑",
    bgColor: "from-purple-500 to-gold-600",
    spoken: "Friction is the force that opposes motion when two surfaces rub together, making a rolling ball slow down and stop!",
  },
  {
    title: "Using Oil and Powder! 🛢️",
    text: "Friction can be useful for walking and braking, but harmful in machines. We use oil, grease, and fine powder to make surfaces smooth and reduce friction so parts move easily!",
    emoji: "🛢️",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "We use oil and powder to make surfaces smooth and reduce friction so machine parts move easily!",
  },
];

// ─── Challenges Definition ────────────────────────────────────

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
    question: 'What is a force?',
    answer: 'A push or a pull that acts on an object',
    options: [
      'A push or a pull that acts on an object',
      'A type of sound made by metal',
      'A glowing light in the sky',
    ],
    hint: 'Think about everyday actions like opening a door or pulling a drawer!',
    misconception: 'A force is not sound or light — it is a push or a pull that can make things move, stop, or change shape!',
  },
  {
    type: 'sort',
    question: 'Drag each action into Push or Pull!',
    answer: 'sort',
    options: [],
    hint: 'Push sends things away from you. Pull brings things closer to you!',
    misconception: 'Remember: push sends an object away from your body, while pull brings an object closer to your body!',
    sortItems: [
      { id: 'p1', label: 'Pushing a door open', icon: 'push', correctBin: 'push-bin' },
      { id: 'p2', label: 'Pushing a shopping cart', icon: 'push', correctBin: 'push-bin' },
      { id: 'p3', label: 'Pulling a desk drawer', icon: 'pull', correctBin: 'pull-bin' },
      { id: 'p4', label: 'Pulling a trolley bag', icon: 'pull', correctBin: 'pull-bin' },
    ],
    bins: [
      { id: 'push-bin', label: 'Push (Away) ➡️', color: '#3B82F6' },
      { id: 'pull-bin', label: 'Pull (Toward) ⬅️', color: '#10B981' },
    ],
  },
  {
    type: 'identify',
    question: 'What can a force do to an object?',
    answer: 'Change its speed, direction, or shape',
    options: [
      'Change its speed, direction, or shape',
      'Only make it heavier immediately',
      'Only make it colder in the dark',
    ],
    hint: 'Think about hitting a cricket ball or squeezing soft clay!',
    misconception: 'Force can change an object speed, direction of motion, and shape, but it does not change its weight or temperature directly!',
  },
  {
    type: 'sort',
    question: 'Drag each action to the correct Type of Force!',
    answer: 'sort',
    options: [],
    hint: 'Muscles = muscular. Earth = gravitational. Magnet = magnetic. Rubbing = frictional!',
    misconception: 'Check the source: muscles for muscular, Earth for gravity, magnets for magnetic, and rubbing surfaces for friction!',
    sortItems: [
      { id: 'f1', label: 'Lifting a water bucket', icon: 'muscle', correctBin: 'muscular' },
      { id: 'f2', label: 'Apple falling from tree', icon: 'gravity', correctBin: 'gravitational' },
      { id: 'f3', label: 'Magnet picking iron nails', icon: 'magnet', correctBin: 'magnetic' },
      { id: 'f4', label: 'Ball stopping on grass', icon: 'friction', correctBin: 'frictional' },
    ],
    bins: [
      { id: 'muscular', label: 'Muscular 🦾', color: '#F59E0B' },
      { id: 'gravitational', label: 'Gravitational 🍎', color: '#EF4444' },
      { id: 'magnetic', label: 'Magnetic 🧲', color: '#8B5CF6' },
      { id: 'frictional', label: 'Frictional 🛑', color: '#06B6D4' },
    ],
  },
  {
    type: 'identify',
    question: 'Why does a rolling ball eventually STOP on the ground?',
    answer: 'Friction between the ball and the ground slows it down',
    options: [
      'Friction between the ball and the ground slows it down',
      'Gravity pulls the ball downward into the earth',
      'The ball runs out of stored internal energy',
    ],
    hint: 'No one pushes it backward, so what rubbing force acts against it?',
    misconception: 'A moving object does not carry a supply of force that gets used up. It stops because friction from the ground acts against its motion!',
  },
  {
    type: 'sort',
    question: 'Sort into Useful Friction or Harmful Friction!',
    answer: 'sort',
    options: [],
    hint: 'Useful = walking, braking, writing. Harmful = shoe wear, machine heat!',
    misconception: 'Remember: friction helps us walk and brake (useful), but it also wears out shoes and heats up machine parts (harmful)!',
    sortItems: [
      { id: 'u1', label: 'Walking without slipping', icon: 'friction', correctBin: 'useful' },
      { id: 'u2', label: 'Braking a bicycle', icon: 'bicycle', correctBin: 'useful' },
      { id: 'u3', label: 'Shoe soles wearing thin', icon: 'shoe', correctBin: 'harmful' },
      { id: 'u4', label: 'Machine parts overheating', icon: 'friction', correctBin: 'harmful' },
    ],
    bins: [
      { id: 'useful', label: 'Useful Friction ✅', color: '#10B981' },
      { id: 'harmful', label: 'Harmful Friction ⚠️', color: '#EF4444' },
    ],
  },
  {
    type: 'identify',
    question: 'What can we use to REDUCE friction on a bicycle chain?',
    answer: 'Oil or grease',
    options: [
      'Oil or grease',
      'Coarse dry sand',
      'Clean cold water',
    ],
    hint: 'This slippery substance forms a smooth layer between the metal parts!',
    misconception: 'Oil and grease form a smooth, slippery layer that fills tiny gaps, reducing friction so moving parts slide easily!',
  },
  {
    type: 'sort',
    question: 'Drag each method to Reduce Friction or Increase Friction!',
    answer: 'sort',
    options: [],
    hint: 'Oil and powder reduce friction. Tread and rubber soles increase friction!',
    misconception: 'Oil, grease, and powder make surfaces smooth to reduce friction. Tyre treads and rubber shoe soles increase friction for grip!',
    sortItems: [
      { id: 'm1', label: 'Oil on bicycle chain', icon: 'oil', correctBin: 'reduce' },
      { id: 'm2', label: 'Powder on carrom board', icon: 'powder', correctBin: 'reduce' },
      { id: 'm3', label: 'Deep tread on tyres', icon: 'bicycle', correctBin: 'increase' },
      { id: 'm4', label: 'Rough rubber shoe soles', icon: 'shoe', correctBin: 'increase' },
    ],
    bins: [
      { id: 'reduce', label: 'Reduce Friction 🛢️', color: '#3B82F6' },
      { id: 'increase', label: 'Increase Friction 👟', color: '#10B981' },
    ],
  },
];

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
    <Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[10px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
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
      className={`absolute rounded-2xl border-4 flex flex-col items-center justify-center p-2 transition-all shadow-md ${isHovering ? 'scale-105 shadow-xl' : ''}`}
      style={{
        left: x,
        top: y,
        width,
        height,
        backgroundColor: `${color}20`,
        borderColor: color,
      }}
    >
      <span className="text-xs font-black text-gray-800 text-center">{label}</span>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface ForceFrictionGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function ForceFrictionGame({ width = 720, height = 560, onComplete }: ForceFrictionGameProps) {
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
      const startX = (width - count * 120) / 2;
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: Math.max(20, startX + idx * 125), y: height - 140 };
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
      const msg = "Great job! You understand force and friction!";
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
      const compMsg = "Wonderful! You are an expert engineer!";
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

    // Check bin collision
    let droppedBinId: string | null = null;
    const binsConfig = currentChallenge.bins;
    const binWidth = 140;
    const binHeight = 90;
    const totalBins = binsConfig.length;
    const startX = (width - (totalBins * binWidth + (totalBins - 1) * 20)) / 2;

    binsConfig.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 130;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
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
        const msg = "Fantastic! You sorted the force and friction facts perfectly!";
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
    <div className="relative overflow-hidden rounded-3xl shadow-2xl select-none font-sans" style={{ width, height, background: '#0F172A' }}>
      <PhysicsBackground width={width} height={height} />
      <EngineerEsha mood={mascotMood} speaking={speakingText} />

      {/* Top Header Bar */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-6 z-10 border-b border-slate-700">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-amber-400">⚙️ Force & Friction Lab</span>
          {screen === 'play' && (
            <span className="text-xs font-bold bg-slate-800 text-slate-300 px-3 py-1 rounded-full border border-slate-700">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">SCORE:</span>
            <span className="text-sm font-black text-amber-400">{score}</span>
          </div>
          {screen === 'play' && <StarRow count={Math.min(5, Math.floor(score / 15))} total={5} />}
          <button
            onClick={handleShowHint}
            className="flex items-center gap-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-bold px-3 py-1.5 rounded-full border border-amber-500/40 transition-all cursor-pointer"
          >
            💡 Hint
          </button>
        </div>
      </div>

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-xl bg-slate-800/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl border border-slate-700 flex flex-col items-center text-center">
            <motion.div
              key={slideIdx}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full flex flex-col items-center"
            >
              <div className="text-5xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
              <h2 className="text-2xl font-black text-white mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed">{TEACHING_SLIDES[slideIdx].text}</p>
            </motion.div>

            {/* Slide Indicators */}
            <div className="flex gap-2 mt-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-amber-400' : 'w-2.5 bg-slate-600'}`}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between w-full max-w-xl">
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx > 0) setSlideIdx(prev => prev - 1);
              }}
              disabled={slideIdx === 0}
              className={`px-6 py-3 rounded-2xl font-bold text-sm transition-all ${slideIdx === 0 ? 'opacity-30 bg-slate-800 text-slate-500 cursor-not-allowed' : 'bg-slate-800 hover:bg-slate-700 text-white cursor-pointer shadow-lg'}`}
            >
              ⬅️ Previous
            </button>
            <button
              onClick={() => {
                audioManager.play('tap');
                if (slideIdx < TEACHING_SLIDES.length - 1) {
                  setSlideIdx(prev => prev + 1);
                } else {
                  setScreen('play');
                  audioManager.play('chime');
                }
              }}
              className="px-8 py-3 rounded-2xl font-black text-sm bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-xl cursor-pointer"
            >
              {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Lab Challenges! 🚀' : 'Next ➡️'}
            </button>
          </div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col items-center justify-between z-10">
          <div className="w-full max-w-2xl bg-slate-800/80 backdrop-blur-md rounded-2xl p-4 shadow-xl border border-slate-700 flex flex-col items-center text-center">
            <h3 className="text-base md:text-lg font-black text-white">{currentChallenge.question}</h3>
          </div>

          {/* Multiple Choice Challenge */}
          {currentChallenge.type === 'identify' && (
            <div className="w-full max-w-md flex flex-col gap-3 my-auto">
              {currentChallenge.options.map((opt, idx) => {
                const isSelected = selectedOpt === opt;
                const isCorrect = opt === currentChallenge.answer;
                let btnStyle = 'bg-slate-800/90 hover:bg-slate-700 border-slate-600 text-white';
                if (selectedOpt) {
                  if (isCorrect) btnStyle = 'bg-emerald-600 border-emerald-400 text-white shadow-lg shadow-emerald-900/50';
                  else if (isSelected) btnStyle = 'bg-rose-600 border-rose-400 text-white shadow-lg shadow-rose-900/50';
                  else btnStyle = 'bg-slate-800/40 border-slate-700 text-slate-500 opacity-50';
                }
                return (
                  <motion.button
                    key={idx}
                    whileHover={!selectedOpt ? { scale: 1.02 } : {}}
                    whileTap={!selectedOpt ? { scale: 0.98 } : {}}
                    onClick={e => selectedOpt !== currentChallenge.answer && handleAnswerClick(opt, e)}
                    disabled={selectedOpt === currentChallenge.answer}
                    className={`w-full p-4 rounded-2xl border-2 font-bold text-sm text-left transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrect && <span className="text-xl">✅</span>}
                    {selectedOpt && isSelected && !isCorrect && <span className="text-xl">❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sort Challenge */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative w-full max-w-2xl h-[300px] my-auto">
              {/* Bins */}
              {(() => {
                const binsConfig = currentChallenge.bins;
                const totalBins = binsConfig.length;
                const binWidth = totalBins === 4 ? 130 : 180;
                const binHeight = 90;
                const startX = (width - (totalBins * binWidth + (totalBins - 1) * 20)) / 2;

                return binsConfig.map((bin, idx) => {
                  const bx = startX + idx * (binWidth + 20);
                  const by = 20;
                  return (
                    <SortBin
                      key={bin.id}
                      id={bin.id}
                      label={bin.label}
                      color={bin.color}
                      x={bx}
                      y={by}
                      width={binWidth}
                      height={binHeight}
                      isHovering={hoveredBin === bin.id} onMouseEnter={() => setHoveredBin(bin.id)} onMouseLeave={() => setHoveredBin(null)}
                    />
                  );
                });
              })()}

              {/* Draggable Items */}
              {currentChallenge.sortItems.map(item => {
                const pos = itemPositions[item.id] || { x: 50, y: 220 };
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
          <div className="w-full max-w-2xl flex justify-between items-center h-12">
            <div>
              {isIncorrect && (
                <button
                  onClick={() => {
                    setSelectedOpt(null);
                    setIsIncorrect(false);
                    setHintMsg(null);
                  }}
                  className="bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-bold px-4 py-2 rounded-xl border border-rose-500/40 transition-all cursor-pointer"
                >
                  🔄 Try Again
                </button>
              )}
            </div>
            {(selectedOpt === currentChallenge.answer || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={advanceChallenge}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-black text-sm px-8 py-3 rounded-2xl shadow-xl cursor-pointer"
              >
                Continue 🚀
              </motion.button>
            )}
          </div>
        </div>
      )}

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={advanceChallenge} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
    </div>
  );
}
