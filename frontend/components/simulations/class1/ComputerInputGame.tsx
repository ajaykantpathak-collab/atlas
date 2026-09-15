'use client';
/**
 * ComputerInputGame - Learn about computer input devices, keyboard, mouse, storage, and etiquette
 *
 * CISCE Nodes: c1_cs_006 (Mouse), c1_cs_007 (Keyboard), c1_cs_008 (Special keys),
 *              c1_cs_009 (Storage), c1_cs_010 (Etiquette/safety)
 *
 * ELI5: "Computers are helpers that need our input! We use a mouse to point
 *   and click, a keyboard to type letters and numbers, and special keys like
 *   spacebar and enter to do cool tricks. We keep our work in storage devices
 *   like USB drives. Always treat the computer with care - wash your hands,
 *   type gently, and keep food and water far away!"
 *
 * Misconceptions:
 *   1. "Press keys as hard as possible" → "No! Type softly with gentle taps!
 *      A computer keyboard is not a drum!"
 *   2. "Eat and drink right next to the computer" → "No! Spilled juice or food
 *      crumbs can break the keyboard and mouse!"
 *   3. "All keys do the exact same thing" → "No! Each key has a special job
 *      like making spaces, starting new lines, or erasing mistakes!"
 *   4. "The mouse and keyboard are the only parts of a computer" → "No!
 *      We also have storage devices like USB flash drives to save our pictures!"
 *   5. "You don't need to wash hands before typing" → "No! Clean hands keep
 *      the mouse and keyboard clean and working smoothly!"
 *
 * Story: "Help Tech Tina the young computer teacher explore the computer lab,
 *   learn about input devices, special keys, storage, and computer safety!"
 *
 * Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom computer desk scene background with window, monitor, keyboard, and floating icons
 * - Custom SVG icon components for mouse, keyboard, spacebar, enter, delete, USB drive, hard drive, and safety
 * - Tech Tina mascot with custom SVG and expression states
 * - Drag-and-drop sorting challenges using Draggable primitive
 * - 8 progressive challenges: identify mouse → identify keyboard → special keys → sort special keys → storage → safety identification → sort safety rules → sort device functions
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager
 * - Confetti + SuccessBanner + HintBubble + SparkleBurst feedback primitives
 * - Auto-hint after inactivity
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides ──────────────────────────────────────────
const TEACHING_SLIDES = [
    {
        title: 'Meet the Computer Mouse! 🖱️',
        text: 'The mouse helps us point and click! Use the left click to select items, the right click for menus, and the scroll wheel to move up and down easily!',
        emoji: '🖱️',
        bgColor: 'from-blue-500 to-indigo-600',
    },
    {
        title: 'The Magical Keyboard! ⌨️',
        text: 'The keyboard lets us type letters from A to Z and numbers from 0 to 9! Each key has its own special job to help us write stories and do math!',
        emoji: '⌨️',
        bgColor: 'from-indigo-500 to-purple-600',
    },
    {
        title: 'Special Keys! ␣ ↵ ⌫',
        text: 'Special keys do amazing tricks! The Spacebar makes a space between words, the Enter key starts a brand new line, and Delete removes mistakes!',
        emoji: '✨',
        bgColor: 'from-purple-500 to-pink-600',
    },
    {
        title: 'Safe Storage! 💾',
        text: 'Where do we keep our drawings and homework? We save them in storage devices like USB flash drives and hard disks so we never lose them!',
        emoji: '💾',
        bgColor: 'from-teal-500 to-emerald-600',
    },
    {
        title: 'Computer Etiquette & Safety! 🛡️',
        text: 'Always wash your hands before typing! Press keys gently - a keyboard is not a drum! And never bring food or water near the computer!',
        emoji: '🛡️',
        bgColor: 'from-emerald-500 to-cyan-600',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_keyboard' | 'identify_special' | 'sort_keys' | 'identify_storage' | 'identify_safety' | 'sort_safety' | 'sort_devices';
interface Challenge {
    type: ChallengeType;
    question: string;
    answer: string;
    options: string[];
    hint: string;
    misconception: string;
    sortItems?: {
        id: string;
        label: string;
        emoji: string;
        correctBin: string;
    }[];
    bins?: {
        id: string;
        label: string;
        color: string;
    }[];
}
// ─── Challenges (8 progressive) ───────────────────────────────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_use',
        question: 'What do we use to CLICK and point on the computer screen?',
        answer: 'Computer Mouse',
        options: ['Computer Mouse', 'Computer Monitor', 'Computer Speaker'],
        hint: 'Think about the small device with a tail wire that fits under your hand!',
        misconception: 'The computer mouse is used to point and click! The monitor is the screen you look at, and the speaker is for sound!',
    },
    {
        type: 'identify_keyboard',
        question: 'What device do we use to TYPE letters and numbers?',
        answer: 'Keyboard',
        options: ['Keyboard', 'Computer Mouse', 'USB Drive'],
        hint: 'It has lots of letter keys from A to Z and number keys from 0 to 9!',
        misconception: 'The keyboard is used for typing letters and numbers! The mouse is for pointing, and a USB drive is for storage!',
    },
    {
        type: 'identify_special',
        question: 'Which key makes a SPACE between words when typing?',
        answer: 'Spacebar',
        options: ['Spacebar', 'Enter key', 'Delete key'],
        hint: 'It is the longest key right at the bottom of the keyboard!',
        misconception: 'The spacebar is the long key at the bottom used to make spaces between words! Enter starts a new line, and Delete removes characters!',
    },
    {
        type: 'sort_keys',
        question: 'Drag each key to what it does!',
        answer: 'sort',
        options: [],
        hint: 'Spacebar makes spaces, Enter starts a new line, Delete removes mistakes, Letter keys type words!',
        misconception: 'Each key has a unique job! Spacebar makes spaces, Enter goes to the next line, and letter keys type out words and names!',
        sortItems: [
            { id: 'space', label: 'Spacebar', emoji: '␣', correctBin: 'space-bin' },
            { id: 'enter', label: 'Enter key', emoji: '↵', correctBin: 'enter-bin' },
            { id: 'delete', label: 'Delete key', emoji: '⌫', correctBin: 'delete-bin' },
        ],
        bins: [
            { id: 'space-bin', label: 'Makes Spaces ␣', color: '#3B82F6' },
            { id: 'enter-bin', label: 'Next Line ↵', color: '#10B981' },
            { id: 'delete-bin', label: 'Erases ⌫', color: '#EF4444' },
        ],
    },
    {
        type: 'identify_storage',
        question: 'Where do we SAVE our digital pictures and homework files?',
        answer: 'USB Storage Drive',
        options: ['USB Storage Drive', 'Computer Mouse', 'Keyboard'],
        hint: 'It is a small pocket-sized device that remembers files safely!',
        misconception: 'USB storage drives keep our files safe! The mouse points and the keyboard types, but storage devices remember your work for later!',
    },
    {
        type: 'identify_safety',
        question: 'Should we eat food or drink juice right next to the computer keyboard?',
        answer: 'No, keep food and drinks away',
        options: ['No, keep food and drinks away', 'Yes, anytime you want', 'Only when thirsty'],
        hint: 'Spilled juice or sticky food crumbs can ruin the delicate keyboard!',
        misconception: 'Never eat or drink near the computer! Spills can ruin the electronics, and crumbs stick under the keys!',
    },
    {
        type: 'sort_safety',
        question: 'Drag each action to Safe or Unsafe computer habits!',
        answer: 'sort',
        options: [],
        hint: 'Washing hands and typing gently are safe. Banging keys and drinking juice nearby are unsafe!',
        misconception: 'Computers need gentle care! Wash hands before typing, press keys softly, and keep drinks far away!',
        sortItems: [
            { id: 'wash', label: 'Wash hands first', emoji: '🧼', correctBin: 'safe-bin' },
            { id: 'gentle', label: 'Type gently', emoji: '🖐️', correctBin: 'safe-bin' },
            { id: 'juice', label: 'Drink juice near keyboard', emoji: '🧃', correctBin: 'unsafe-bin' },
            { id: 'bang', label: 'Bang keys like a drum', emoji: '🥁', correctBin: 'unsafe-bin' },
        ],
        bins: [
            { id: 'safe-bin', label: 'Safe Habit ✅', color: '#10B981' },
            { id: 'unsafe-bin', label: 'Unsafe Habit ⚠️', color: '#EF4444' },
        ],
    },
    {
        type: 'sort_devices',
        question: 'Drag each item to its correct computer job!',
        answer: 'sort',
        options: [],
        hint: 'Mouse points and clicks, Keyboard types letters, USB drive stores files!',
        misconception: 'Every computer part has a special job! Mouse points, keyboard types, and USB drive stores your files!',
        sortItems: [
            { id: 'm-dev', label: 'Mouse', emoji: '🖱️', correctBin: 'point-bin' },
            { id: 'k-dev', label: 'Keyboard', emoji: '⌨️', correctBin: 'type-bin' },
            { id: 'u-dev', label: 'USB Drive', emoji: '💾', correctBin: 'store-bin' },
        ],
        bins: [
            { id: 'point-bin', label: 'Point & Click 🖱️', color: '#3B82F6' },
            { id: 'type-bin', label: 'Type Letters ⌨️', color: '#8B5CF6' },
            { id: 'store-bin', label: 'Save Files 💾', color: '#059669' },
        ],
    },
];
// ─── Tech Tina Mascot ─────────────────────────────────────────
function TechTina({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-14 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-2xl px-3 py-2 shadow-xl max-w-[210px] border-2 border-pink-300">
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 5, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="tina-shirt" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EC4899"/>
              <stop offset="100%" stopColor="#BE185D"/>
            </linearGradient>
            <linearGradient id="tina-hair" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7C2D12"/>
              <stop offset="100%" stopColor="#451A03"/>
            </linearGradient>
          </defs>
          {/* Pigtails */}
          <circle cx="16" cy="35" r="10" fill="url(#tina-hair)"/>
          <circle cx="59" cy="35" r="10" fill="url(#tina-hair)"/>
          {/* Head / Face */}
          <circle cx="37" cy="38" r="18" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5"/>
          {/* Hair fringe */}
          <path d="M22 30 Q37 22 52 30 Q45 35 37 32 Q29 35 22 30 Z" fill="url(#tina-hair)"/>
          {/* Pink Headset */}
          <path d="M20 38 Q37 12 55 38" stroke="#EC4899" strokeWidth="3" fill="none" strokeLinecap="round"/>
          <circle cx="20" cy="38" r="4" fill="#DB2777"/>
          <circle cx="55" cy="38" r="4" fill="#DB2777"/>
          <path d="M55 38 Q58 48 53 50" stroke="#DB2777" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Eyes */}
          <circle cx="30" cy="36" r="3" fill="#1F2937"/>
          <circle cx="44" cy="36" r="3" fill="#1F2937"/>
          <circle cx="31" cy="35" r="1" fill="white"/>
          <circle cx="45" cy="35" r="1" fill="white"/>
          {/* Smile */}
          <path d="M32 44 Q37 49 42 44" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Body / Shirt with keyboard pattern */}
          <path d="M22 56 L52 56 L58 85 L16 85 Z" fill="url(#tina-shirt)"/>
          {/* Keyboard keys graphic on shirt */}
          <rect x="26" y="62" width="6" height="5" fill="white" rx="1"/>
          <rect x="34" y="62" width="6" height="5" fill="white" rx="1"/>
          <rect x="42" y="62" width="6" height="5" fill="white" rx="1"/>
          <rect x="30" y="70" width="14" height="5" fill="white" rx="1"/>
          {/* Arms */}
          <ellipse cx="14" cy="65" rx="4" ry="8" fill="#FDE68A" transform="rotate(-15 14 65)"/>
          <ellipse cx="61" cy="65" rx="4" ry="8" fill="#FDE68A" transform="rotate(15 61 65)"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Row ───────────────────────���─────────────────────────
function StarRow({ count, total }: {
    count: number;
    total: number;
}) {
    return (<div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (<motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Computer Scene Background ────────────────────────────────
function ComputerSceneBackground({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #1E1B4B 0%, #312E81 40%, #4338CA 70%, #1E1B4B 100%)' }}/>
      {/* Window showing sky outside */}
      <div className="absolute top-4 left-8 w-36 h-28 rounded-2xl border-4 border-indigo-900 bg-gradient-to-b from-sky-400 to-indigo-300 overflow-hidden opacity-80">
        <div className="absolute top-2 left-1/2 w-1 h-full bg-indigo-900"/>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-indigo-900"/>
        {/* Sun outside */}
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-yellow-300 opacity-90 shadow-lg"/>
      </div>
      {/* Computer Desk Surface at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #78350F 0%, #451A03 100%)' }}/>
      <div className="absolute bottom-32 left-0 right-0 h-3 bg-amber-950 opacity-60"/>
      {/* Floating Key Icons in background */}
      <motion.div className="absolute top-16 right-32 opacity-30" animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="px-3 py-2 bg-indigo-500 rounded-lg text-white font-mono font-bold text-xs shadow-md">ESC</div>
      </motion.div>
      <motion.div className="absolute top-28 right-52 opacity-25" animate={{ y: [0, 10, 0], rotate: [0, -5, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
        <div className="px-3 py-2 bg-pink-500 rounded-lg text-white font-mono font-bold text-xs shadow-md">ENTER</div>
      </motion.div>
    </div>);
}
// ─── Custom SVG Component Icons ───────────────────────────────
function MouseClickIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      <ellipse cx="32" cy="34" rx="18" ry="24" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      {/* Divider line */}
      <line x1="32" y1="10" x2="32" y2="30" stroke="#1D4ED8" strokeWidth="2" strokeLinecap="round"/>
      {/* Scroll wheel */}
      <rect x="30" y="16" width="4" height="10" rx="2" fill="#93C5FD" stroke="#1D4ED8" strokeWidth="1"/>
      {/* Cable */}
      <path d="M32 10 Q32 2, 24 2" stroke="#60A5FA" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>);
}
function KeyboardIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="6" y="16" width="52" height="32" rx="6" fill="#475569" stroke="#334155" strokeWidth="2"/>
      {/* Inner keyboard plate */}
      <rect x="9" y="19" width="46" height="26" rx="4" fill="#1E293B"/>
      {/* Key rows */}
      <rect x="12" y="22" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="20" y="22" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="28" y="22" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="36" y="22" width="6" height="5" rx="1" fill="#94A3B8"/>
      <rect x="44" y="22" width="8" height="5" rx="1" fill="#94A3B8"/>

      <rect x="12" y="29" width="7" height="5" rx="1" fill="#94A3B8"/>
      <rect x="21" y="29" width="7" height="5" rx="1" fill="#94A3B8"/>
      <rect x="30" y="29" width="7" height="5" rx="1" fill="#94A3B8"/>
      <rect x="39" y="29" width="13" height="5" rx="1" fill="#94A3B8"/>

      {/* Spacebar */}
      <rect x="18" y="37" width="28" height="5" rx="1" fill="#60A5FA"/>
    </svg>);
}
function SpacebarIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="8" y="24" width="48" height="16" rx="4" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      <text x="32" y="36" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">SPACE</text>
    </svg>);
}
function EnterKeyIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="16" y="16" width="32" height="32" rx="6" fill="#10B981" stroke="#047857" strokeWidth="2"/>
      <path d="M38 24 L38 34 L24 34 M28 30 L24 34 L28 38" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
function DeleteKeyIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      <rect x="16" y="16" width="32" height="32" rx="6" fill="#EF4444" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M24 24 L40 40 M40 24 L24 40" stroke="white" strokeWidth="3" strokeLinecap="round"/>
    </svg>);
}
function UsbDriveIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      {/* USB Connector plug */}
      <rect x="24" y="12" width="16" height="12" rx="2" fill="#94A3B8" stroke="#64748B" strokeWidth="1.5"/>
      {/* Body */}
      <rect x="20" y="24" width="24" height="30" rx="6" fill="#0D9488" stroke="#0F766E" strokeWidth="2"/>
      <circle cx="32" cy="38" r="4" fill="#5EEAD4"/>
    </svg>);
}
function SafetyShieldIcon({ size = 64 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 64 64">
      <path d="M32 10 L52 18 V34 C52 46, 32 54, 32 54 C32 54, 12 46, 12 34 V18 Z" fill="#10B981" stroke="#047857" strokeWidth="2"/>
      <path d="M22 32 L29 39 L42 24" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('m-dev'))
        return <MouseClickIcon size={size}/>;
    if (id.includes('mouse'))
        return <MouseClickIcon size={size}/>;
    if (id.includes('point'))
        return <MouseClickIcon size={size}/>;
    if (id.includes('k-dev'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('keyboard'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('type'))
        return <KeyboardIcon size={size}/>;
    if (id.includes('space'))
        return <SpacebarIcon size={size}/>;
    if (id.includes('enter'))
        return <EnterKeyIcon size={size}/>;
    if (id.includes('delete'))
        return <DeleteKeyIcon size={size}/>;
    if (id.includes('u-dev'))
        return <UsbDriveIcon size={size}/>;
    if (id.includes('store'))
        return <UsbDriveIcon size={size}/>;
    if (id.includes('safe'))
        return <SafetyShieldIcon size={size}/>;
    if (id.includes('gentle'))
        return <SafetyShieldIcon size={size}/>;
    if (id.includes('wash'))
        return <SafetyShieldIcon size={size}/>;
    if (id.includes('bang'))
        return <DeleteKeyIcon size={size}/>;
    if (id.includes('juice'))
        return <DeleteKeyIcon size={size}/>;
    if (id.includes('unsafe'))
        return <DeleteKeyIcon size={size}/>;
    return null;
}
function SortCard({ id, label, emoji, x, y, placed, onDragStart, onDragEnd }: {
    id: string;
    label: string;
    emoji: string;
    x: number;
    y: number;
    placed: boolean;
    onDragStart: (id: string) => void;
    onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-xl border-2 border-indigo-200 ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2`}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-indigo-900 mt-1">{label}</span>
      </div>
    </Draggable>);
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
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}25`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      <div className="text-xs font-bold text-center px-2" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {
    audioManager.play('tap');
    if (slide < total - 1) {
      setSlide(slide + 1);
    } else {
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slide > 0) {
      setSlide(slide - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center p-6 select-none overflow-hidden" style={{ width, height }}>
      <ComputerSceneBackground width={width} height={height}/>
      <TechTina mood="happy" speaking={current.text}/>

      <div className="relative z-10 flex flex-col items-center max-w-xl bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-2xl border-4 border-pink-300 mt-12">
        {/* Progress Dots */}
        <div className="flex gap-2 mb-4">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-pink-500' : 'w-2.5 bg-gray-300'}`}/>))}
        </div>

        {/* Slide Icon */}
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-pink-500 to-purple-500 flex items-center justify-center text-4xl shadow-lg mb-4">
          {current.emoji}
        </div>

        {/* Title */}
        <h2 className="text-2xl font-black text-indigo-900 text-center mb-2">{current.title}</h2>

        {/* Text */}
        <p className="text-base font-medium text-gray-700 text-center mb-6 leading-relaxed px-4">{current.text}</p>

        {/* Buttons */}
        <div className="flex gap-4 w-full justify-between">
          <button onClick={handlePrev} disabled={slide === 0} className={`px-6 py-2.5 rounded-xl font-bold text-sm shadow-md transition-all ${slide === 0 ? 'opacity-30 bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'}`}>
            ← Back
          </button>
          <button onClick={handleNext} className="px-8 py-2.5 rounded-xl font-black text-sm text-white bg-gradient-to-r from-pink-500 to-purple-600 shadow-lg hover:brightness-110 active:scale-95 transition-all">
            {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➜'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface ComputerInputGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Component ─────────────────────��─────────────────────

export function ComputerInputGame({width = 720, height = 560, onComplete}: ComputerInputGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [tinaMood, setTinaMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [tinaSpeech, setTinaSpeech] = useState<string | null>('Hello! Click Start to play!');

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});

  // Inactivity timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[currentIdx];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setHintMessage(currentChallenge.hint);
        audioManager.play('hint');
        setTinaSpeech(currentChallenge.hint);
        speechManager.speak(currentChallenge.hint);
        setTinaMood('thinking');
      }
    }, 10000);
  }, [screen, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentIdx, screen, resetInactivityTimer]);

  // Reset sort state when challenge changes
  useEffect(() => {
    setPlacedItems({});
    setTinaSpeech(currentChallenge.question);
    speechManager.speak(currentChallenge.question);
    setTinaMood('happy');
  }, [currentIdx, currentChallenge]);

  // Multiple Choice Handler
  const handleAnswerSelect = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (option === currentChallenge.answer) {
        // Correct!
        audioManager.play('success');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      setStars(s => s + 1);
      setTinaMood('celebrate');
      setTinaSpeech('Fantastic job! You got it right! 🎉');
      speechManager.speak('Fantastic job! You got it right! 🎉');

      setTimeout(() => {
        if (currentIdx < CHALLENGES.length - 1) {
          setCurrentIdx(i => i + 1);
          setTinaMood('happy');
        } else {
        // Game complete!
          setShowConfetti(true);
          setShowSuccessBanner(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1200);
    } else {
        // Wrong!
        audioManager.play('error');
      setErrors(e => e + 1);
      setTinaMood('thinking');
      setHintMessage(currentChallenge.misconception);
      setTinaSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      audioManager.play('hint');
    }
  };

  // Sort Drag Start
  const handleDragStart = () => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Sort Drag End
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Find if dropped over correct bin
    // Bins layout positioning
    const binWidth = 140;
    const binHeight = 85;
    const binY = 320;
    const totalBins = currentChallenge.bins.length;
    const startX = (width - totalBins * (binWidth + 20)) / 2 + 10;

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const bx = startX + idx * (binWidth + 20);
      const by = binY;
      if (x >= bx - 30 && x <= bx + binWidth + 30 && y >= by - 30 && y <= by + binHeight + 30) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
        // Correct bin!
        audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      const newPlaced = {...placedItems, [id]: true};
      setPlacedItems(newPlaced);

      // Check if all items placed
      const allDone = currentChallenge.sortItems.every(i => newPlaced[i.id]);
      if (allDone) {
        audioManager.play('success');
        setStars(s => s + 1);
        setTinaMood('celebrate');
        setTinaSpeech('Awesome! All sorted correctly! 🌟');
        speechManager.speak('Awesome! All sorted correctly! 🌟');

        setTimeout(() => {
          if (currentIdx < CHALLENGES.length - 1) {
            setCurrentIdx(i => i + 1);
            setTinaMood('happy');
          } else {
            setShowConfetti(true);
            setShowSuccessBanner(true);
            audioManager.play('celebration');
            const finalScore = Math.max(0, 100 - errors * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 1400);
      }
      return true;
    } else {
        // Wrong bin!
        audioManager.play('drop-wrong');
      setErrors(e => e + 1);
      setTinaMood('thinking');
      setHintMessage(currentChallenge.misconception);
      setTinaSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      audioManager.play('hint');
      return false;
    }
  };

  return (
    <div className="relative select-none overflow-hidden rounded-3xl shadow-2xl font-sans bg-indigo-950" style={{ width, height }}>
      {screen === 'teaching' ? (<TeachingScreen width={width} height={height} onStart={() => setScreen('play')}/>) : (<div className="relative flex flex-col items-center justify-between p-6" style={{ width, height }}>
          <ComputerSceneBackground width={width} height={height}/>
          <TechTina mood={tinaMood} speaking={tinaSpeech}/>

          {/* Top Header Bar */}
          <div className="relative z-10 w-full flex items-center justify-between bg-white/10 backdrop-blur-md px-5 py-2.5 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-white">Challenge {currentIdx + 1} of {CHALLENGES.length}</span>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Challenge Question Card */}
          <div className="relative z-10 my-4 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-xl border-2 border-indigo-200 max-w-xl text-center">
            <h2 className="text-lg font-black text-indigo-950">{currentChallenge.question}</h2>
          </div>

          {/* Game Area / Options / Sort */}
          <div className="relative z-10 flex-1 w-full flex items-center justify-center">
            {currentChallenge.answer !== 'sort' ? (
            // Multiple Choice Options
            <div className="grid grid-cols-1 gap-3 w-full max-w-md px-4">
                {currentChallenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={e => handleAnswerSelect(opt, e)} className="flex items-center justify-between bg-white hover:bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 shadow-lg text-indigo-950 font-bold text-base transition-all">
                    <span>{opt}</span>
                    <span className="w-8 h-8 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 text-sm font-bold">
                      {['A', 'B', 'C'][i]}
                    </span>
                  </motion.button>))}
              </div>) : (
            // Sort Challenge Drag & Drop Area
            <div className="relative w-full h-[280px]">
                {/* Bins at bottom */}
                {currentChallenge.bins && (() => {
                    const binWidth = 140;
                    const binHeight = 85;
                    const binY = 160;
                    const totalBins = currentChallenge.bins.length;
                    const startX = (width - totalBins * (binWidth + 20)) / 2 + 10;
                    return currentChallenge.bins.map((bin, idx) => {
                        const bx = startX + idx * (binWidth + 20);
                        return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={bx} y={binY} width={binWidth} height={binHeight} isHovering={false}/>);
                    });
                })()}

                {/* Draggable Cards at top */}
                {currentChallenge.sortItems && (() => {
                    const cardWidth = 115;
                    const cardHeight = 90;
                    const totalItems = currentChallenge.sortItems.length;
                    const startX = (width - totalItems * (cardWidth + 15)) / 2 + 7.5;
                    const cardY = 30;
                    return currentChallenge.sortItems.map((item, idx) => {
                        const cx = startX + idx * (cardWidth + 15);
                        const placed = !!placedItems[item.id];
                        return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={cx} y={cardY} placed={placed} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
                    });
                })()}
              </div>)}
          </div>

          {/* Feedback & Hint Components */}
          {hintMessage && (<HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>)}

          {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}

          {showConfetti && (<Confetti onComplete={() => setShowConfetti(false)}/>)}

          {showSuccessBanner && (<SuccessBanner message={`Amazing job! You earned ${stars} stars and mastered computer inputs! 🏆`} onComplete={() => setShowSuccessBanner(false)}/>)}
        </div>)}
    </div>
  );
}
