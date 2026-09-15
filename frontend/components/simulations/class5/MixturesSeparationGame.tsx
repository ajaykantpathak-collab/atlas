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

// ─── Custom SVG Icon Components ──���───────────────────────────────────────

function SolutionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 12 L44 12 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" opacity="0.9" />
      <path d="M20 25 L40 25" stroke="#B2EBF2" strokeWidth="2" />
      <circle cx="28" cy="35" r="1.5" fill="#00838F" opacity="0.6" />
      <circle cx="34" cy="40" r="1.5" fill="#00838F" opacity="0.6" />
      <circle cx="30" cy="45" r="1.5" fill="#00838F" opacity="0.6" />
      <ellipse cx="30" cy="12" rx="14" ry="4" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
    </svg>
  );
}

function SuspensionIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 12 L44 12 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" opacity="0.85" />
      <path d="M20 22 L40 22" stroke="#BCAAA4" strokeWidth="1.5" />
      <circle cx="27" cy="46" r="3" fill="#5D4037" />
      <circle cx="35" cy="47" r="2.5" fill="#6D4C41" />
      <circle cx="31" cy="43" r="2" fill="#795548" />
      <circle cx="23" cy="35" r="2" fill="#8D6E63" />
      <circle cx="37" cy="30" r="1.5" fill="#8D6E63" />
      <ellipse cx="30" cy="12" rx="14" ry="4" fill="#EFEBE9" stroke="#8D6E63" strokeWidth="2" />
    </svg>
  );
}

function ColloidIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 12 L44 12 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="2" opacity="0.95" />
      <circle cx="28" cy="28" r="3" fill="#FFF" opacity="0.7" />
      <circle cx="36" cy="36" r="2.5" fill="#FFF" opacity="0.7" />
      <circle cx="24" cy="42" r="2" fill="#FFF" opacity="0.7" />
      <circle cx="34" cy="22" r="2" fill="#FFF" opacity="0.7" />
      <ellipse cx="30" cy="12" rx="14" ry="4" fill="#FFFDE7" stroke="#FBC02D" strokeWidth="2" />
    </svg>
  );
}

function FilterPaperIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <polygon points="10,15 50,15 30,45" fill="#ECEFF1" stroke="#78909C" strokeWidth="2" />
      <path d="M22 30 Q30 35, 38 30" fill="#8D6E63" opacity="0.7" />
      <path d="M30 45 L30 55" stroke="#00ACC1" strokeWidth="3" strokeLinecap="round" />
      <circle cx="30" cy="56" r="2" fill="#00ACC1" />
    </svg>
  );
}

function BeakerIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 12 L42 12 L42 48 C42 50, 40 52, 37 52 L23 52 C20 52, 18 50, 18 48 Z" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" />
      <path d="M18 25 L42 25" stroke="#B2EBF2" strokeWidth="1.5" />
      <path d="M18 35 L42 35" stroke="#B2EBF2" strokeWidth="1.5" />
      <ellipse cx="30" cy="12" rx="12" ry="3" fill="#B2EBF2" stroke="#00ACC1" strokeWidth="2" />
    </svg>
  );
}

function EvaporationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="44" rx="20" ry="8" fill="#CFD8DC" stroke="#78909C" strokeWidth="2" />
      <path d="M22 28 Q26 18, 22 10" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M38 28 Q34 18, 38 10" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M30 30 Q30 20, 30 8" stroke="#0288D1" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.8" />
      <rect x="25" y="44" width="10" height="4" fill="#37474F" />
    </svg>
  );
}

function DistillationIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="22" cy="38" r="10" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" />
      <path d="M22 28 L38 18 L38 38" stroke="#78909C" strokeWidth="2" fill="none" />
      <circle cx="44" cy="44" r="8" fill="#E0F7FA" stroke="#00ACC1" strokeWidth="2" />
      <path d="M20 48 L24 48" stroke="#E53935" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

function MagnetIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 16 L18 34 C18 42, 42 42, 42 34 L42 16" fill="none" stroke="#E53935" strokeWidth="8" strokeLinecap="round" />
      <rect x="14" y="12" width="8" height="10" fill="#B0BEC5" />
      <rect x="38" y="12" width="8" height="10" fill="#B0BEC5" />
    </svg>
  );
}

function SandIconSVG({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 Q30 35, 50 45 L52 52 C52 54, 50 55, 48 55 L12 55 C10 55, 8 54, 8 52 Z" fill="#D7CCC8" stroke="#8D6E63" strokeWidth="2" />
      <circle cx="20" cy="48" r="1.5" fill="#8D6E63" />
      <circle cx="30" cy="50" r="1.5" fill="#8D6E63" />
      <circle cx="40" cy="47" r="1.5" fill="#8D6E63" />
    </svg>
  );
}

function SaltIconSVG({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="20" y="16" width="20" height="34" rx="3" fill="#ECEFF1" stroke="#90A4AE" strokeWidth="2" />
      <ellipse cx="30" cy="16" rx="10" ry="3" fill="#CFD8DC" stroke="#90A4AE" strokeWidth="2" />
      <circle cx="27" cy="28" r="1.5" fill="#37474F" />
      <circle cx="33" cy="28" r="1.5" fill="#37474F" />
    </svg>
  );
}

function WaterDropIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 Q40 25, 40 38 C40 45, 35 50, 30 50 C25 50, 20 45, 20 38 Q20 25, 30 10 Z" fill="#29B6F6" stroke="#0288D1" strokeWidth="2" />
    </svg>
  );
}

function PollutedWaterIcon({ size = 48 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 12 L44 12 L40 48 C40 50, 38 52, 35 52 L25 52 C22 52, 20 50, 20 48 Z" fill="#4E342E" stroke="#3E2723" strokeWidth="2" opacity="0.9" />
      <path d="M22 22 L38 25 M25 35 L35 32" stroke="#8D6E63" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="30" cy="12" rx="14" ry="4" fill="#6D4C41" stroke="#3E2723" strokeWidth="2" />
    </svg>
  );
}

function renderSortIcon(icon: string, size: number = 48) {
  switch (icon) {
    case 'solution': return <SolutionIcon size={size} />;
    case 'suspension': return <SuspensionIcon size={size} />;
    case 'colloid': return <ColloidIcon size={size} />;
    case 'filter': return <FilterPaperIcon size={size} />;
    case 'evaporation': return <EvaporationIcon size={size} />;
    case 'distillation': return <DistillationIcon size={size} />;
    case 'magnet': return <MagnetIcon size={size} />;
    case 'sand': return <SandIconSVG size={size} />;
    case 'salt': return <SaltIconSVG size={size} />;
    case 'polluted': return <PollutedWaterIcon size={size} />;
    case 'water': return <WaterDropIcon size={size} />;
    default: return <SolutionIcon size={size} />;
  }
}

// ─── Professor Purifier Pooja Mascot ─────────────────────────────────────

function ProfessorPooja({ mood, speaking }: { mood: MascotMood; speaking: string | null }) {
  return (
    <div className="absolute top-16 right-4 z-20 flex flex-col items-end">
      <AnimatePresence>
        {speaking && (
          <motion.div
            initial={{ scale: 0, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="mb-2 bg-white rounded-2xl px-4 py-3 shadow-xl max-w-[260px] border-2 border-cyan-200"
          >
            <p className="text-sm font-bold text-cyan-900">{speaking}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        animate={
          mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'thinking'
            ? { rotate: [0, 6, -6, 0], y: [0, -4, 0] }
            : { y: [0, -6, 0] }
        }
        transition={{
          duration: mood === 'celebrate' ? 0.6 : 2.5,
          repeat: mood === 'celebrate' ? 0 : Infinity,
          ease: 'easeInOut',
        }}
        className="relative flex flex-col items-center"
      >
        <svg width="85" height="100" viewBox="0 0 85 100">
          <defs>
            <linearGradient id="pooja-face" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFE0B2" />
              <stop offset="100%" stopColor="#FFCC80" />
            </linearGradient>
            <linearGradient id="pooja-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor="#E0F7FA" />
            </linearGradient>
          </defs>

          {/* Safety Goggles */}
          <rect x="24" y="24" width="37" height="16" rx="6" fill="#80DEEA" stroke="#00838F" strokeWidth="2.5" opacity="0.9" />
          <line x1="18" y1="30" x2="24" y2="30" stroke="#00838F" strokeWidth="2.5" />
          <line x1="61" y1="30" x2="67" y2="30" stroke="#00838F" strokeWidth="2.5" />

          {/* Head & Hair */}
          <circle cx="42.5" cy="35" r="22" fill="url(#pooja-face)" />
          <path d="M20 30 Q40 10, 65 30 Q68 45, 60 50 Q42 44, 25 50 Q18 40, 20 30 Z" fill="#3E2723" />

          {/* Eyes behind goggles */}
          <circle cx="33" cy="32" r="3" fill="#1A237E" />
          <circle cx="52" cy="32" r="3" fill="#1A237E" />

          {/* Smile */}
          <path d="M36 43 Q42.5 48, 49 43" stroke="#00838F" strokeWidth="2" fill="none" strokeLinecap="round" />

          {/* Lab Coat */}
          <path d="M20 58 L30 52 L35 95 L50 95 L55 52 L65 58 L70 95 L15 95 Z" fill="url(#pooja-coat)" stroke="#B0BEC5" strokeWidth="2" />
          <path d="M30 52 L35 75 L50 75 L55 52" fill="white" stroke="#B0BEC5" strokeWidth="1.5" />

          {/* Water Drop Badge */}
          <path d="M42.5,63 Q46,70 42.5,75 Q39,70 42.5,63 Z" fill="#00ACC1" />

          {/* Funnel in Hand */}
          <polygon points="62,65 72,65 67,78" fill="#ECEFF1" stroke="#78909C" strokeWidth="1.5" />
        </svg>
      </motion.div>
    </div>
  );
}

// ─── Star Row Component ──────────────────────────────────────────────────

function StarRow({ count, total }: { count: number; total: number }) {
  return (
    <div className="flex gap-1.5 bg-white/80 backdrop-blur px-3 py-1.5 rounded-full shadow-md">
      {Array.from({ length: total }).map((_, i) => (
        <motion.div
          key={i}
          initial={false}
          animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}}
          transition={{ duration: 0.5 }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFB300' : 'rgba(0,0,0,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Water Treatment Scene Background ────────────────────────────────────

function LabSceneBg({ width, height }: { width: number; height: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      <svg className="absolute inset-0" width={width} height={height} preserveAspectRatio="none">
        <defs>
          <linearGradient id="plant-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#E0F7FA" />
            <stop offset="45%" stopColor="#B2EBF2" />
            <stop offset="75%" stopColor="#4DD0E1" />
            <stop offset="100%" stopColor="#00838F" />
          </linearGradient>
          <linearGradient id="water-tank" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#00ACC1" />
            <stop offset="100%" stopColor="#006064" />
          </linearGradient>
        </defs>
        <rect width={width} height={height} fill="url(#plant-sky)" />

        {/* Water Treatment Plant Towers & Tanks in Background */}
        <rect x="40" y="140" width="80" height="90" rx="4" fill="#90A4AE" opacity="0.7" />
        <ellipse cx="80" cy="140" rx="40" ry="12" fill="#CFD8DC" opacity="0.8" />
        
        <rect x="150" y="160" width="100" height="70" rx="6" fill="url(#water-tank)" opacity="0.6" />
        <ellipse cx="200" cy="160" rx="50" ry="10" fill="#4DD0E1" opacity="0.8" />

        {/* Laboratory Bench */}
        <rect x="0" y="320" width={width} height={height - 320} fill="#37474F" />
        <rect x="0" y="320" width={width} height="12" fill="#263238" />

        {/* Beakers & Flasks Graphic on Bench */}
        <path d="M50 320 L50 280 L65 280 L65 320 Z" fill="#B2EBF2" opacity="0.5" />
        <path d="M500 320 L490 270 L515 270 L505 320 Z" fill="#80DEEA" opacity="0.5" />
      </svg>
    </div>
  );
}

// ─── Teaching Slides Definition ──────────────────────────────────────────

interface TeachingSlide {
  title: string;
  text: string;
  emoji: string;
  bgColor: string;
  spoken: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    title: "Solutions, Suspensions and Colloids 💧",
    text: "When sugar dissolves in water, it forms a clear solution! When sand is mixed, it forms a cloudy suspension where particles settle. Milk is a colloid where particles stay floating!",
    emoji: "🥛",
    bgColor: "from-cyan-400 to-blue-500",
    spoken: "When sugar dissolves in water, it forms a clear solution! When sand is mixed, it forms a suspension where particles settle. Milk is a colloid where particles stay floating!",
  },
  {
    title: "Separation of Mixtures 🔬",
    text: "A mixture can be separated because its components keep their own properties! We use differences in size, solubility, magnetism, and weight to separate them.",
    emoji: "🔍",
    bgColor: "from-teal-400 to-emerald-500",
    spoken: "A mixture can be separated because its components keep their own properties! We use differences in size, solubility, magnetism, and weight.",
  },
  {
    title: "Filtration and Decantation 🧪",
    text: "Filtration uses filter paper to trap insoluble solids (residue) while letting clear liquid (filtrate) pass through. Decantation pours off liquid after heavy solids settle down!",
    emoji: "📜",
    bgColor: "from-blue-400 to-indigo-500",
    spoken: "Filtration uses filter paper to trap insoluble solids while letting clear liquid pass through. Decantation pours off liquid after heavy solids settle down!",
  },
  {
    title: "Evaporation and Crystal Making 🔥",
    text: "When a solid is dissolved in liquid like salt in water, we cannot filter it. Heating the solution causes water to evaporate into vapour, leaving dry salt crystals behind!",
    emoji: "🧂",
    bgColor: "from-orange-400 to-red-500",
    spoken: "When a solid is dissolved in water, we cannot filter it. Heating the solution causes water to evaporate into vapour, leaving dry salt crystals behind!",
  },
  {
    title: "Water Pollution and Purification 🌍",
    text: "Polluted water contains harmful germs and sewage. We purify water by sedimentation, filtration, and boiling to kill germs and keep our communities healthy!",
    emoji: "🛡️",
    bgColor: "from-green-400 to-teal-500",
    spoken: "Polluted water contains harmful germs and sewage. We purify water by sedimentation, filtration, and boiling to keep our communities healthy!",
  },
];

// ─── Challenges Definition ───────────────────────────────────────────────

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
    question: 'What type of mixture is formed when sugar dissolves completely in water?',
    answer: 'Solution',
    options: ['Solution', 'Suspension', 'Colloid', 'Compound'],
    hint: 'Think: the sugar breaks into tiny invisible particles and the liquid becomes transparent.',
    misconception: 'A true solution is transparent and clear because the solute dissolves completely without settling!',
  },
  {
    type: 'sort',
    question: 'Drag each mixture to its correct category (Solution, Suspension, or Colloid)!',
    answer: 'sort',
    options: [],
    hint: 'Salt water dissolves completely (solution). Sand in water settles down (suspension). Milk stays cloudy and floating (colloid).',
    misconception: 'Solutions are clear and do not settle; suspensions are cloudy and settle; colloids stay milky and floating without settling.',
    sortItems: [
      { id: 'mix-1', label: 'Salt water', icon: 'solution', correctBin: 'solution' },
      { id: 'mix-2', label: 'Sand in water', icon: 'suspension', correctBin: 'suspension' },
      { id: 'mix-3', label: 'Milk', icon: 'colloid', correctBin: 'colloid' },
      { id: 'mix-4', label: 'Chalk in water', icon: 'suspension', correctBin: 'suspension' },
    ],
    bins: [
      { id: 'solution', label: 'Solution 💧', color: '#0288D1' },
      { id: 'suspension', label: 'Suspension 🏖️', color: '#8D6E63' },
      { id: 'colloid', label: 'Colloid 🥛', color: '#FBC02D' },
    ],
  },
  {
    type: 'identify',
    question: 'Which method would you use to separate insoluble sand from water?',
    answer: 'Filtration',
    options: ['Filtration', 'Evaporation', 'Distillation', 'Using a magnet'],
    hint: 'Think: sand does not dissolve, so a barrier with tiny holes will trap it while letting water through.',
    misconception: 'Filtration traps insoluble solids as residue on filter paper while letting the clear liquid pass as filtrate!',
  },
  {
    type: 'sort',
    question: 'Drag each mixture to its best separation method!',
    answer: 'sort',
    options: [],
    hint: 'Sand and water use filter paper. Salt water needs heating to dryness. Iron and sand need a magnet.',
    misconception: 'Remember: insoluble solids use filtration, dissolved solids use evaporation, and magnetic materials use a magnet!',
    sortItems: [
      { id: 'sep-1', label: 'Sand & Water', icon: 'sand', correctBin: 'filter' },
      { id: 'sep-2', label: 'Salt & Water', icon: 'salt', correctBin: 'evaporation' },
      { id: 'sep-3', label: 'Iron & Sand', icon: 'magnet', correctBin: 'magnet' },
    ],
    bins: [
      { id: 'filter', label: 'Filtration 📜', color: '#0288D1' },
      { id: 'evaporation', label: 'Evaporation 🔥', color: '#E65100' },
      { id: 'magnet', label: 'Magnet 🧲', color: '#C62828' },
    ],
  },
  {
    type: 'identify',
    question: 'What do you get when you heat a salt solution until all the water evaporates?',
    answer: 'Salt crystals',
    options: ['Salt crystals', 'Pure water', 'Mud', 'Nothing'],
    hint: 'Think: evaporation removes the liquid, but what happens to the dissolved solid?',
    misconception: 'Evaporation only turns the liquid into vapour and leaves the dissolved solid behind as clean crystals!',
  },
  {
    type: 'sort',
    question: 'Match each separation method to its correct description!',
    answer: 'sort',
    options: [],
    hint: 'Filter paper catches insoluble solids. Heating removes water. Pouring off liquid leaves heavy sediment.',
    misconception: 'Decantation is pouring off liquid after sedimentation; filtration uses a porous barrier; evaporation boils off liquid.',
    sortItems: [
      { id: 'desc-1', label: 'Filtration', icon: 'filter', correctBin: 'bin-filter' },
      { id: 'desc-2', label: 'Evaporation', icon: 'evaporation', correctBin: 'bin-evap' },
      { id: 'desc-3', label: 'Distillation', icon: 'distillation', correctBin: 'bin-dist' },
    ],
    bins: [
      { id: 'bin-filter', label: 'Traps insoluble solid on paper', color: '#00838F' },
      { id: 'bin-evap', label: 'Heats liquid to leave dry solute', color: '#EF6C00' },
      { id: 'bin-dist', label: 'Boils and condenses pure liquid', color: '#6A1B9A' },
    ],
  },
  {
    type: 'identify',
    question: 'Which of these is a major cause of river water pollution in India?',
    answer: 'Factory chemical waste & sewage',
    options: ['Factory chemical waste & sewage', 'Rain falling on green trees', 'Fish swimming in lakes', 'Wind blowing over rivers'],
    hint: 'Think: human activities and industrial discharge add harmful contaminants to rivers like the Ganga and Yamuna.',
    misconception: 'Water pollution is caused by harmful contaminants like sewage, industrial chemicals, and agricultural pesticides entering water bodies!',
  },
  {
    type: 'sort',
    question: 'Drag the water purification steps into their correct sequence!',
    answer: 'sort',
    options: [],
    hint: 'First let heavy dirt settle, then filter small bits, and finally boil to kill germs.',
    misconception: 'The correct purification order is: Sedimentation (heavy settling), Filtration (removing solids), and Boiling (killing germs)!',
    sortItems: [
      { id: 'step-1', label: 'Sedimentation', icon: 'sand', correctBin: 'bin-1' },
      { id: 'step-2', label: 'Filtration', icon: 'filter', correctBin: 'bin-2' },
      { id: 'step-3', label: 'Boiling', icon: 'evaporation', correctBin: 'bin-3' },
    ],
    bins: [
      { id: 'bin-1', label: 'Step 1: Heavy particles settle', color: '#5D4037' },
      { id: 'bin-2', label: 'Step 2: Filter remaining solids', color: '#0288D1' },
      { id: 'bin-3', label: 'Step 3: Boil to kill germs', color: '#C62828' },
    ],
  },
];

// ─── Sort Card Component ─────────────────────────────────────────────────

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
      <div className="flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-cyan-300 bg-white" style={{ width: 110, height: 95 }}>
        {renderSortIcon(icon, 40)}
        <span className="text-[11px] font-bold text-gray-800 text-center mt-1 px-1">{label}</span>
      </div>
    </Draggable>
  );
}

// ─── Main Game Component ─────────────────────────────────────────────────

export interface MixturesSeparationGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function MixturesSeparationGame({ width = 720, height = 560, onComplete }: MixturesSeparationGameProps) {
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
        newPos[item.id] = { x: 30 + idx * 135, y: height - 160 };
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
      const compMsg = "Wonderful! You are a brilliant water science champion!";
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
    currentChallenge.bins.forEach((bin) => {
      const binEl = document.getElementById(`bin-${bin.id}`);
      if (binEl) {
        const rect = binEl.getBoundingClientRect();
        if (x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom) {
          droppedBinId = bin.id;
        }
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
    <div className="relative overflow-hidden select-none bg-slate-900 rounded-3xl shadow-2xl flex flex-col items-center justify-between" style={{ width, height }}>
      <LabSceneBg width={width} height={height} />

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-6 py-3 bg-white/80 backdrop-blur-md shadow-md border-b border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="bg-cyan-500 text-white font-black px-3 py-1 rounded-full text-xs shadow">
            Class 5 Chemistry
          </div>
          <span className="text-sm font-bold text-slate-700">Mixtures & Separation</span>
        </div>
        <div className="flex items-center gap-4">
          {screen === 'play' && <StarRow count={Math.min(5, Math.floor(score / 20))} total={5} />}
          <div className="bg-amber-100 border border-amber-300 px-3 py-1 rounded-full text-xs font-bold text-amber-800">
            Score: {score}
          </div>
        </div>
      </div>

      <ProfessorPooja mood={mascotMood} speaking={speakingText} />

      {/* Confetti & Feedback overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)} />}
      {hintMsg && <HintBubble message={hintMsg} onComplete={() => setHintMsg(null)} />}
      {successMsg && <SuccessBanner message={successMsg} onComplete={() => setSuccessMsg(null)} />}

      {/* Teaching Screen */}
      {screen === 'teaching' && (
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 w-full px-8 pb-8">
          <motion.div
            key={slideIdx}
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border-4 border-cyan-200 flex flex-col items-center text-center"
          >
            <div className={`w-20 h-20 rounded-3xl bg-gradient-to-tr ${TEACHING_SLIDES[slideIdx].bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
              {TEACHING_SLIDES[slideIdx].emoji}
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-3">
              {TEACHING_SLIDES[slideIdx].title}
            </h2>
            <p className="text-base font-medium text-slate-600 leading-relaxed mb-6">
              {TEACHING_SLIDES[slideIdx].text}
            </p>
            <div className="flex items-center justify-between w-full mt-4">
              <button
                onClick={() => setSlideIdx(prev => Math.max(0, prev - 1))}
                disabled={slideIdx === 0}
                className="px-5 py-2.5 rounded-xl font-bold bg-slate-200 text-slate-700 disabled:opacity-30 hover:bg-slate-300 transition"
              >
                Previous
              </button>
              <div className="flex gap-2">
                {TEACHING_SLIDES.map((_, i) => (
                  <div key={i} className={`w-3 h-3 rounded-full ${i === slideIdx ? 'bg-cyan-500 scale-125' : 'bg-slate-300'} transition-all`} />
                ))}
              </div>
              <button
                onClick={() => {
                  audioManager.play('tap');
                  if (slideIdx < TEACHING_SLIDES.length - 1) {
                    setSlideIdx(prev => prev + 1);
                  } else {
                    setScreen('play');
                    setMascotMood('happy');
                  }
                }}
                className="px-6 py-2.5 rounded-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg hover:brightness-110 transition"
              >
                {slideIdx === TEACHING_SLIDES.length - 1 ? 'Start Lab! 🚀' : 'Next ➡️'}
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Play Screen */}
      {screen === 'play' && (
        <div className="relative z-10 flex flex-col items-center justify-between flex-1 w-full px-6 pb-6 pt-2">
          {/* Challenge Header */}
          <div className="w-full max-w-2xl bg-white/90 backdrop-blur rounded-2xl px-6 py-4 shadow-xl border-2 border-cyan-200 flex flex-col items-center text-center">
            <span className="text-xs font-bold text-cyan-700 uppercase tracking-wider mb-1">
              Challenge {challengeIdx + 1} of {CHALLENGES.length}
            </span>
            <h3 className="text-lg font-black text-slate-800">
              {currentChallenge.question}
            </h3>
          </div>

          {/* Identify Challenge Area */}
          {currentChallenge.type === 'identify' && (
            <div className="flex flex-col gap-3 w-full max-w-md my-auto">
              {currentChallenge.options.map((opt) => {
                const isSelected = selectedOpt === opt;
                const isCorrectOpt = opt === currentChallenge.answer;
                let btnStyle = "bg-white border-cyan-200 text-slate-700 hover:border-cyan-400";
                if (selectedOpt) {
                  if (isCorrectOpt) btnStyle = "bg-emerald-500 border-emerald-600 text-white shadow-emerald-200";
                  else if (isSelected) btnStyle = "bg-rose-500 border-rose-600 text-white shadow-rose-200";
                  else btnStyle = "bg-slate-100 border-slate-200 text-slate-400 opacity-50";
                }
                return (
                  <motion.button
                    key={opt}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => !selectedOpt && handleAnswerClick(opt, e)}
                    disabled={selectedOpt !== null}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold border-2 shadow-md transition text-left flex items-center justify-between ${btnStyle}`}
                  >
                    <span>{opt}</span>
                    {selectedOpt && isCorrectOpt && <span>✅</span>}
                    {selectedOpt && isSelected && !isCorrectOpt && <span>❌</span>}
                  </motion.button>
                );
              })}
            </div>
          )}

          {/* Sort Challenge Area */}
          {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (
            <div className="w-full max-w-3xl flex flex-col items-center justify-between my-auto" style={{ height: 320 }}>
              {/* Bins Row */}
              <div className="flex gap-4 w-full justify-center">
                {currentChallenge.bins.map((bin) => {
                  const isHovered = false;
                  return (
                    <div
                      key={bin.id}
                      id={`bin-${bin.id}`}
                      className={`flex-1 min-h-[130px] rounded-3xl border-4 border-dashed flex flex-col items-center justify-center p-3 text-center transition-all ${
                        isHovered ? 'scale-105 bg-white/40' : 'bg-white/20'
                      }`}
                      style={{ borderColor: bin.color }}
                    >
                      <span className="text-xs font-black text-slate-800 bg-white/80 px-3 py-1 rounded-full shadow">
                        {bin.label}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Draggable Items Row */}
              <div className="flex gap-4 justify-center items-center w-full mt-4">
                {currentChallenge.sortItems.map((item) => (
                  <SortCard
                    key={item.id}
                    id={item.id}
                    label={item.label}
                    icon={item.icon}
                    x={itemPositions[item.id]?.x || 0}
                    y={itemPositions[item.id]?.y || 0}
                    placed={placedItems[item.id] || false}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Footer Navigation / Next Button */}
          <div className="w-full max-w-2xl flex justify-between items-center mt-2">
            <button
              onClick={handleShowHint}
              className="px-4 py-2 rounded-xl font-bold bg-amber-100 border border-amber-300 text-amber-800 shadow hover:bg-amber-200 transition text-sm flex items-center gap-1.5"
            >
              💡 Need Hint?
            </button>
            {((selectedOpt && selectedOpt === currentChallenge.answer) ||
              (currentChallenge.type === 'sort' && currentChallenge.sortItems?.every(i => placedItems[i.id]))) && (
              <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={advanceChallenge}
                className="px-6 py-2.5 rounded-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg flex items-center gap-2"
              >
                Continue 🚀
              </motion.button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
