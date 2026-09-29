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

// ─── Custom SVG Icons for Skeletal System ────────────────────

function SkullIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C18 10, 15 22, 18 34 C19 38, 23 42, 25 45 L25 50 L35 50 L35 45 C37 42, 41 38, 42 34 C45 22, 42 10, 30 10 Z" fill="#F5F5F5" stroke="#78909C" strokeWidth="2" />
      <circle cx="23" cy="26" r="5" fill="#37474F" />
      <circle cx="37" cy="26" r="5" fill="#37474F" />
      <path d="M28 35 L32 35 L30 40 Z" fill="#37474F" />
      <line x1="24" y1="46" x2="36" y2="46" stroke="#78909C" strokeWidth="2" />
    </svg>
  );
}

function BackboneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="25" y="8" width="10" height="6" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <rect x="24" y="16" width="12" height="6" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <rect x="23" y="24" width="14" height="6" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <rect x="24" y="32" width="12" height="6" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <rect x="25" y="40" width="10" height="6" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <rect x="26" y="48" width="8" height="6" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <line x1="30" y1="8" x2="30" y2="54" stroke="#D32F2F" strokeWidth="2" strokeDasharray="2,2" />
    </svg>
  );
}

function RibsIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="28" y="12" width="4" height="38" rx="2" fill="#B0BEC5" />
      <path d="M30 16 Q15 20, 20 26" fill="none" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 16 Q45 20, 40 26" fill="none" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 23 Q12 28, 18 35" fill="none" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 23 Q48 28, 42 35" fill="none" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 30 Q14 36, 22 43" fill="none" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" />
      <path d="M30 30 Q46 36, 38 43" fill="none" stroke="#CFD8DC" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function ArmBoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="14" r="5" fill="#CFD8DC" stroke="#78909C" strokeWidth="1.5" />
      <rect x="27" y="18" width="6" height="22" rx="3" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <circle cx="30" cy="43" r="4" fill="#90A4AE" />
      <rect x="24" y="46" width="5" height="12" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1" />
      <rect x="31" y="46" width="5" height="12" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1" />
    </svg>
  );
}

function LegBoneIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="12" r="6" fill="#CFD8DC" stroke="#78909C" strokeWidth="1.5" />
      <rect x="26" y="17" width="8" height="25" rx="4" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <circle cx="30" cy="45" r="4" fill="#FFB74D" />
      <rect x="27" y="49" width="6" height="9" rx="2" fill="#ECEFF1" stroke="#78909C" strokeWidth="1" />
    </svg>
  );
}

function JointIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="10" width="30" height="15" rx="5" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <rect x="15" y="35" width="30" height="15" rx="5" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
      <circle cx="30" cy="30" r="8" fill="#FF8A80" stroke="#D32F2F" strokeWidth="1.5" />
      <path d="M22 30 Q30 24, 38 30 Q30 36, 22 30 Z" fill="#FFCDD2" />
    </svg>
  );
}

function HingeJointIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M15 15 L45 15 L45 25 L35 25 L35 45 L45 45 L45 55 L15 55 L15 45 L25 45 L25 25 L15 25 Z" fill="#E3F2FD" stroke="#1976D2" strokeWidth="1.5" />
      <circle cx="30" cy="35" r="6" fill="#1976D2" />
      <path d="M27 35 L33 35" stroke="white" strokeWidth="2" />
    </svg>
  );
}

function BallSocketJointIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="22" r="10" fill="#E8F5E9" stroke="#388E3C" strokeWidth="1.5" />
      <path d="M15 32 Q30 52, 45 32 Z" fill="#C8E6C9" stroke="#388E3C" strokeWidth="1.5" />
      <circle cx="30" cy="22" r="4" fill="#388E3C" />
    </svg>
  );
}

function CalciumIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 20 L40 20 L37 50 L23 50 Z" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="1.5" />
      <path d="M22 26 L38 26 L36.5 48 L23.5 48 Z" fill="#FFFFFF" />
      <text x="30" y="40" fontSize="11" fontWeight="bold" fill="#F57F17" textAnchor="middle">Ca++</text>
      <circle cx="30" cy="14" r="5" fill="#FBC02D" />
    </svg>
  );
}

function PostureIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="14" r="5" fill="#FFE0B2" stroke="#F57C00" strokeWidth="1.5" />
      <line x1="30" y1="19" x2="30" y2="42" stroke="#F57C00" strokeWidth="3" strokeLinecap="round" />
      <line x1="30" y1="26" x2="20" y2="35" stroke="#F57C00" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="26" x2="40" y2="35" stroke="#F57C00" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="42" x2="22" y2="52" stroke="#F57C00" strokeWidth="2.5" strokeLinecap="round" />
      <line x1="30" y1="42" x2="38" y2="52" stroke="#F57C00" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

// ─── Teaching Slides ──────────────────────────────────────────

const TEACHING_SLIDES = [
  {
    title: "The Human Skeleton 💀",
    text: "The skeleton is the framework of bones inside your body. It gives shape and support like a steel building frame! Without bones, we would be soft and floppy.",
    emoji: "💀",
    bgColor: "from-gold-500 to-gold-600",
    spoken: "The skeleton is the framework of bones inside your body. It gives shape and support like a steel building frame!",
  },
  {
    title: "Protection of Organs 🛡️",
    text: "Bones protect delicate internal organs! The skull guards the brain like a helmet. The rib cage protects the heart and lungs from injury during play.",
    emoji: "🛡️",
    bgColor: "from-emerald-500 to-teal-600",
    spoken: "Bones protect delicate internal organs! The skull guards the brain, and the rib cage protects the heart and lungs.",
  },
  {
    title: "The Backbone & Vertebrae 🦴",
    text: "Your backbone or spine runs down your back. It is not one long bone, but a column of 33 small ring-like bones called vertebrae that let you bend and twist!",
    emoji: "🦴",
    bgColor: "from-amber-500 to-orange-600",
    spoken: "Your backbone is a column of small ring-like bones called vertebrae that let you bend and twist safely.",
  },
  {
    title: "Joints and Movement 🤸",
    text: "A joint is where two or more bones meet. Hinge joints (elbow, knee) bend like doors. Ball-and-socket joints (shoulder, hip) rotate in all directions!",
    emoji: "🤸",
    bgColor: "from-purple-500 to-pink-600",
    spoken: "Joints are where bones meet. Hinge joints bend like doors, and ball-and-socket joints rotate in all directions.",
  },
  {
    title: "Bone Care & Posture 🥛",
    text: "Keep bones strong with calcium-rich food (milk, curd, green veggies) and vitamin D from sunlight. Sit straight, stand tall, and exercise daily to protect your spine!",
    emoji: "🥛",
    bgColor: "from-gold-500 to-gold-700",
    spoken: "Keep bones strong with calcium-rich food and sunlight. Sit straight and exercise daily to protect your spine.",
  },
];

// ─── Challenges ───────────────────────────────────────────────

const CHALLENGES = [
  {
    type: 'identify' as ChallengeType,
    question: "Which bone protects the soft brain from knocks and bumps?",
    answer: "Skull",
    options: ["Skull", "Rib cage", "Backbone", "Jawbone"],
    hint: "Think of a hard helmet that covers your head!",
    misconception: "The skull is the hard bony case that surrounds the brain, acting like a helmet to protect it from bumps.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each bone to its correct body function!",
    answer: "sort",
    options: [],
    hint: "Skull protects brain, ribs protect heart/lungs, spine supports upper body!",
    misconception: "Each bone has a specific job: skull protects the brain, rib cage shields heart and lungs, and the backbone supports the body.",
    sortItems: [
      { id: 'skull-bone', label: 'Skull', icon: 'skull', correctBin: 'protect-brain' },
      { id: 'ribs-bone', label: 'Rib Cage', icon: 'ribs', correctBin: 'protect-chest' },
      { id: 'spine-bone', label: 'Backbone', icon: 'backbone', correctBin: 'support-body' },
    ],
    bins: [
      { id: 'protect-brain', label: 'Proteins Brain 🧠', color: '#3B82F6' },
      { id: 'protect-chest', label: 'Protects Heart ❤️', color: '#EF4444' },
      { id: 'support-body', label: 'Supports Spine 🦴', color: '#10B981' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: "What are the main functions of the skeletal system?",
    answer: "Support, protection, and movement with muscles",
    options: ["Support, protection, and movement with muscles", "Digesting food and pumping blood", "Seeing, hearing, and smelling", "Fighting germs and clotting blood"],
    hint: "Think: shape, shielding organs, and walking with muscles!",
    misconception: "Bones give shape and support, protect delicate organs like the brain and heart, and help in movement when muscles pull them.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each joint to its correct type and location!",
    answer: "sort",
    options: [],
    hint: "Elbow and knee are hinges; shoulder and hip are ball-and-socket!",
    misconception: "Hinge joints like elbow and knee bend and straighten like a door. Ball-and-socket joints like the shoulder allow rotation in all directions.",
    sortItems: [
      { id: 'elbow-joint', label: 'Elbow (Hinge)', icon: 'hinge-joint', correctBin: 'hinge' },
      { id: 'shoulder-joint', label: 'Shoulder (Ball & Socket)', icon: 'ball-socket', correctBin: 'ball' },
      { id: 'neck-joint', label: 'Neck (Pivot)', icon: 'joint', correctBin: 'pivot' },
    ],
    bins: [
      { id: 'hinge', label: 'Hinge Joint 🚪', color: '#F59E0B' },
      { id: 'ball', label: 'Ball & Socket ⚽', color: '#3B82F6' },
      { id: 'pivot', label: 'Pivot Joint 🔄', color: '#9333EA' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: "Why is the backbone not just one long, stiff bone?",
    answer: "It is made of small vertebrae that let us bend and twist",
    options: ["It is made of small vertebrae that let us bend and twist", "Because bones grow longer every day", "So it can pump blood through the body", "To make the neck turn around completely"],
    hint: "Think why you can tie your shoelaces or bend down!",
    misconception: "The backbone is a column of small ring-like bones called vertebrae. If it were one single bone, you could never bend down or twist!",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each activity to whether it Helps or Harms bones!",
    answer: "sort",
    options: [],
    hint: "Drinking milk and sitting straight helps; slouching and skipping meals harms!",
    misconception: "Healthy bones need calcium from milk, regular exercise, and good posture. Slouching and poor posture strain the spine and cause pain.",
    sortItems: [
      { id: 'milk', label: 'Drink milk & eat curd', icon: 'calcium', correctBin: 'helps' },
      { id: 'posture-good', label: 'Sit straight & stand tall', icon: 'posture', correctBin: 'helps' },
      { id: 'slouch', label: 'Slouch while reading', icon: 'backbone', correctBin: 'harms' },
    ],
    bins: [
      { id: 'helps', label: 'Helps Bones 👍', color: '#10B981' },
      { id: 'harms', label: 'Harms Bones 👎', color: '#EF4444' },
    ],
  },
  {
    type: 'identify' as ChallengeType,
    question: "Which joint allows the head to turn from side to side like shaking 'no'?",
    answer: "Pivot joint in the neck",
    options: ["Pivot joint in the neck", "Hinge joint in the elbow", "Ball and socket in the knee", "Gliding joint in the skull"],
    hint: "It is right below your head!",
    misconception: "The neck has a pivot joint that allows the head to turn from side to side.",
  },
  {
    type: 'sort' as ChallengeType,
    question: "Drag each bone care tip to its correct category!",
    answer: "sort",
    options: [],
    hint: "Milk for calcium, walking for exercise, sitting tall for posture!",
    misconception: "Bone care requires a balanced approach: calcium for bone hardness, exercise for strength, and correct posture to protect the spine.",
    sortItems: [
      { id: 'calcium-tip', label: 'Eat green veggies & cheese', icon: 'calcium', correctBin: 'nutrition' },
      { id: 'exercise-tip', label: 'Run, skip, & play outdoors', icon: 'leg-bone', correctBin: 'exercise' },
      { id: 'posture-tip', label: 'Use both straps on backpack', icon: 'posture', correctBin: 'posture-cat' },
    ],
    bins: [
      { id: 'nutrition', label: 'Nutrition 🥛', color: '#3B82F6' },
      { id: 'exercise', label: 'Exercise 🏃', color: '#10B981' },
      { id: 'posture-cat', label: 'Posture 🎒', color: '#F59E0B' },
    ],
  },
];

// ─── Coach Karan Mascot ───────────────────────────────────────

function CoachKaran({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-orange-200"
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
          {/* Head */}
          <circle cx="37.5" cy="28" r="16" fill="#FFCC80" stroke="#F57C00" strokeWidth="1.5" />
          {/* Cap */}
          <path d="M20 22 Q37.5 12, 55 22 L58 18 Q37.5 8, 17 18 Z" fill="#E65100" />
          <path d="M45 19 Q55 18, 62 21 Q55 25, 45 22 Z" fill="#EF6C00" />
          {/* Tracksuit Body */}
          <path d="M20 46 L37.5 52 L55 46 L58 80 L17 80 Z" fill="#1565C0" stroke="#0D47A1" strokeWidth="1.5" />
          <path d="M30 46 L37.5 60 L45 46" fill="#FFFFFF" />
          {/* Whistle */}
          <circle cx="37.5" cy="44" r="3" fill="#FFD700" />
          <path d="M37.5 35 Q42 40, 37.5 44" fill="none" stroke="#B0BEC5" strokeWidth="1.5" />
          {/* Face */}
          <circle cx="31" cy="26" r="2" fill="#37474F" />
          <circle cx="44" cy="26" r="2" fill="#37474F" />
          <path d="M33 34 Q37.5 38, 42 34" stroke="#D32F2F" strokeWidth="2" fill="none" strokeLinecap="round" />
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

// ─── Gymnasium Scene Background ────────────────────────────────

function GymnasiumSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="gym-wall-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFF3E0" />
            <stop offset="60%" stopColor="#FFE0B2" />
            <stop offset="100%" stopColor="#D7CCC8" />
          </linearGradient>
          <linearGradient id="gym-floor-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8D6E63" />
            <stop offset="100%" stopColor="#5D4037" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#gym-wall-grad)" />
        <rect y={height - 110} width={width} height={110} fill="url(#gym-floor-grad)" />
      </svg>
      {/* Window with sky */}
      <div className="absolute top-8 left-12 w-28 h-36 bg-gold-100 border-4 border-amber-800 rounded-t-xl opacity-70 flex items-center justify-center">
        <div className="text-xs text-gold-400 font-bold">SUNLIGHT ☀️</div>
      </div>
      {/* Skeleton model poster on wall */}
      <div className="absolute top-10 right-28 w-20 h-32 bg-white border-2 border-gray-400 rounded p-1 opacity-80 flex flex-col items-center">
        <div className="text-[9px] font-bold text-gray-700">SKELETON</div>
        <div className="my-auto"><SkullIcon size={30} /></div>
      </div>
    </div>
  );
}

// ─── Sort Item Icon Renderer ──────────────────────────────────

function renderSortIcon(icon: string, size: number = 44) {
  switch (icon) {
    case 'skull': return <SkullIcon size={size} />;
    case 'ribs': return <RibsIcon size={size} />;
    case 'backbone': return <BackboneIcon size={size} />;
    case 'arm-bone': return <ArmBoneIcon size={size} />;
    case 'leg-bone': return <LegBoneIcon size={size} />;
    case 'joint': return <JointIcon size={size} />;
    case 'hinge-joint': return <HingeJointIcon size={size} />;
    case 'ball-socket': return <BallSocketJointIcon size={size} />;
    case 'calcium': return <CalciumIcon size={size} />;
    case 'posture': return <PostureIcon size={size} />;
    default: return <SkullIcon size={size} />;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-orange-300 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-1`} style={{ width: 115, height: 95 }}>
        {renderSortIcon(icon, 42)}
        <span className="text-[11px] font-bold text-gray-700 text-center mt-1 leading-tight">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Sort Bin Component ───────────────────────────────────────

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

// ─── Main Game Component ──────────────────────────────────────

export interface SkeletalGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SkeletalGame({ width = 720, height = 560, onComplete }: SkeletalGameProps) {
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
      currentChallenge.sortItems.forEach((item, idx) => {
        newPos[item.id] = { x: 50 + idx * 140, y: height - 150 };
        newPlaced[item.id] = false;
      });
      setItemPositions(newPos);
      setPlacedItems(newPlaced);
    }
  }, [challengeIdx, height]);

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
      const compMsg = "Wonderful! You are a skeletal system expert!";
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
    const binWidth = 150;
    const binHeight = 90;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2;

    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = 130;
      if (x >= bx && x <= bx + binWidth && y >= by && y <= by + binHeight) {
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
    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-amber-50 select-none font-sans" style={{ width, height }}>
      <GymnasiumSceneBg width={width} height={height} />
      <CoachKaran mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Effects */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}

      {/* Header */}
      <div className="absolute top-0 left-0 right-0 h-14 bg-white/80 backdrop-blur-md px-4 flex items-center justify-between border-b border-orange-200 z-10">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center text-white shadow font-black text-lg">
            🦴
          </div>
          <div>
            <h1 className="text-sm font-extrabold text-gray-800 leading-tight">Skeletal System & Bones</h1>
            <p className="text-[10px] text-gray-500 font-medium">Class 5 • ICSE Biology</p>
          </div>
        </div>

        {screen === 'play' && (
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-bold text-gray-500">CHALLENGE {challengeIdx + 1} OF {CHALLENGES.length}</span>
              <StarRow count={Math.floor(score / 15)} total={5} />
            </div>
            <div className="bg-orange-500 text-white font-extrabold px-3 py-1 rounded-full text-sm shadow">
              ⭐ {score}
            </div>
          </div>
        )}
      </div>

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="absolute inset-0 pt-20 pb-6 px-8 flex flex-col items-center justify-center z-10">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className={`w-full max-w-xl rounded-3xl p-8 bg-gradient-to-br ${TEACHING_SLIDES[slideIdx].bgColor} text-white shadow-2xl flex flex-col items-center text-center`}
            style={{ minHeight: 320 }}
          >
            <div className="text-6xl mb-4">{TEACHING_SLIDES[slideIdx].emoji}</div>
            <h2 className="text-2xl font-black mb-3">{TEACHING_SLIDES[slideIdx].title}</h2>
            <p className="text-base font-medium leading-relaxed max-w-lg mb-6">{TEACHING_SLIDES[slideIdx].text}</p>

            <div className="flex gap-2 mb-6">
              {TEACHING_SLIDES.map((_, i) => (
                <div key={i} className={`h-2.5 rounded-full transition-all ${i === slideIdx ? 'w-8 bg-white' : 'w-2.5 bg-white/40'}`} />
              ))}
            </div>

            <div className="flex gap-4 w-full justify-between">
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx > 0) setSlideIdx(prev => prev - 1);
                }}
                disabled={slideIdx === 0}
                className="px-5 py-2.5 rounded-xl bg-white/20 hover:bg-white/30 font-bold disabled:opacity-30 transition-all text-sm"
              >
                ⬅️ Previous
              </button>

              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    audioManager.play('celebration');
                    setScreen('play');
                  }
                }}
                className="px-6 py-2.5 rounded-xl bg-white text-orange-600 font-extrabold shadow-lg hover:scale-105 transition-all text-sm"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="absolute inset-0 pt-20 pb-6 px-6 flex flex-col z-10">
          <div className="bg-white/90 backdrop-blur rounded-2xl p-4 shadow-lg border border-orange-200 mb-4 max-w-2xl mx-auto w-full flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-gray-800 leading-snug">{currentChallenge.question}</h2>
            <button
              onClick={handleShowHint}
              className="ml-3 px-3 py-1.5 bg-amber-100 hover:bg-amber-200 text-amber-800 font-extrabold rounded-xl text-xs flex items-center gap-1 shadow-sm shrink-0"
            >
              💡 Hint
            </button>
          </div>

          {currentChallenge.type === 'identify' && (
            <div className="max-w-xl mx-auto w-full grid grid-cols-2 gap-3 my-auto">
              {currentChallenge.options.map((opt, i) => {
                const isSelected = selectedOpt === opt;
                const isCorrectAns = opt === currentChallenge.answer;
                let btnStyle = 'bg-white hover:bg-orange-50 border-orange-200 text-gray-800';
                if (selectedOpt) {
                  if (isCorrectAns) btnStyle = 'bg-emerald-500 text-white border-emerald-600';
                  else if (isSelected) btnStyle = 'bg-rose-500 text-white border-rose-600';
                  else btnStyle = 'bg-gray-100 text-gray-400 border-gray-200 opacity-50';
                }
                return (
                  <motion.button
                    key={i}
                    whileHover={{ scale: selectedOpt ? 1 : 1.02 }}
                    whileTap={{ scale: selectedOpt ? 1 : 0.98 }}
                    onClick={e => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`p-4 rounded-2xl border-2 font-extrabold text-sm shadow-md transition-all flex items-center justify-center text-center ${btnStyle}`}
                  >
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          )}

          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="relative flex-1 max-w-2xl mx-auto w-full my-auto">
              {/* Bins */}
              <div className="flex justify-center gap-4 mb-8">
                {currentChallenge.bins.map((bin, idx) => {
                  const totalBins = currentChallenge.bins!.length;
                  const binWidth = 150;
                  const binHeight = 90;
                  const startX = (width - totalBins * (binWidth + 20)) / 2;
                  return (
                    <div key={bin.id} style={{ position: 'absolute', left: startX + idx * (binWidth + 20), top: 130 }}>
                      <SortBin
                        label={bin.label}
                        color={bin.color}
                        x={0}
                        y={0}
                        width={binWidth}
                        height={binHeight}
                        isHovering={hoveredBin === bin.id}
                        onMouseEnter={() => setHoveredBin(bin.id)}
                        onMouseLeave={() => setHoveredBin(null)}
                      />
                    </div>
                  );
                })}
              </div>

              {/* Draggable items */}
              {currentChallenge.sortItems.map(item => {
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

          {/* Next Button when answered */}
          {(selectedOpt || (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-auto flex justify-center pb-2">
              <button
                onClick={advanceChallenge}
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-amber-600 text-white font-black rounded-2xl shadow-xl hover:scale-105 transition-all text-base"
              >
                {challengeIdx < CHALLENGES.length - 1 ? 'Next Challenge ➡️' : 'Complete Game! 🎉'}
              </button>
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
