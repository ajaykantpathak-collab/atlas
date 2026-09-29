'use client';
/**
 * SafetyGame - Learn safety rules: protection from accidents and hazards
 *
 * CISCE Nodes: c1_evs_009 (Protection from accidents and hazards - safety rules)
 * Enrichment: c1_evs_enrichment_part9
 *
 * ELI5: "Some things at home and on the road can hurt us - like knives, fire,
 *   switches, stairs, and cars. These are called hazards. Safety rules are the
 *   simple things we do so hazards do not hurt us: do not touch sharp things
 *   without a grown-up, never play with matches, keep wet hands away from switches,
 *   walk slowly on stairs, hold a hand on the road, and if you get hurt, tell a grown-up right away!"
 *
 * Misconceptions (from enrichment):
 *   1. "A small matchstick cannot do any harm, so it is okay to play with it."
 *      → "A single matchstick can light curtains or clothes in seconds, growing into a fire that burns the whole house!"
 *   2. "If I touch a switch with slightly wet hands, nothing will happen."
 *      → "Water carries electricity! Wet hands let current pass through the body and give a dangerous shock!"
 *   3. "If I get hurt, I should hide it or wash it myself."
 *      → "Always tell a grown-up immediately! They know how to give first aid and keep you safe!"
 *
 * Story: "Help Safety Star Sana sort safety rules, identify hazards at home and
 *   school, and learn how to stay safe everywhere!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG safety scene background (house, road, zebra crossing, sky, sun)
 * - Custom SVG object components (traffic light, first-aid kit, helmet, matchstick, knife, socket, footpath, zebra crossing)
 * - Custom SVG mascot (Safety Star Sana) with yellow vest, whistle, and speech bubble
 * - Drag-and-drop: drag safety items into correct sorting bins
 * - 8 progressive challenges: identify rules → identify hazards → sort rules → road safety
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via Web Speech API / audioManager
 * - Confetti + celebration on success
 * - Auto-hint after inactivity (10 seconds)
 * - Progressive difficulty ladder
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'Welcome to Safety School! 🛡️', text: 'Accidents happen suddenly and can hurt us like a cut or a burn. Hazards are things around us that can cause accidents. Safety rules help us stay safe!', emoji: '🛡️', bgColor: 'from-amber-400 to-orange-500' },
    { title: 'Sharp Objects & Fire 🔪🔥', text: 'Knives, scissors, and broken glass can cut our skin. Matchsticks, candles, and stoves can burn us. Never touch them without a grown-up beside you!', emoji: '🔪', bgColor: 'from-red-400 to-rose-500' },
    { title: 'Electricity & Falls ⚡🪜', text: 'Never touch a switch or socket with wet hands because water carries electricity and gives a shock. Walk slowly on stairs and never climb chairs or tables!', emoji: '⚡', bgColor: 'from-gold-400 to-gold-500' },
    { title: 'Road Safety on Indian Roads 🚦🚶', text: 'Always hold a grown-up hand, walk on the footpath, and look left, then right, then left again before crossing the road where vehicles move fast!', emoji: '🚦', bgColor: 'from-emerald-400 to-teal-500' },
    { title: 'When You Get Hurt 🩹👩‍⚕️', text: 'If you get a cut or burn, never hide it! Tell a teacher, parent, or grown-up right away so they can give first aid and keep you safe!', emoji: '🩹', bgColor: 'from-purple-400 to-gold-600' },
];
// ─── Types ────────────────────────────────────────────────────
type ChallengeType = 'identify_road' | 'identify_fire' | 'identify_electricity' | 'sort_rules' | 'identify_footpath' | 'identify_hurt' | 'sort_safe_unsafe' | 'sort_locations';
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
// ─── Challenges (8 progressive: easy → hard) ──────────────────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_road',
        question: 'What should we do before crossing the road?',
        answer: 'Look left-right-left and hold a grown-up hand',
        options: ['Look left-right-left and hold a grown-up hand', 'Run fast across the road', 'Close eyes and walk'],
        hint: 'Think about Indian roads with fast vehicles. We check both sides and hold a hand!',
        misconception: 'Never run or close your eyes on the road! Always look left, then right, then left again and hold a grown-up hand!',
    },
    {
        type: 'identify_fire',
        question: 'Should we touch matches or a lighted stove?',
        answer: 'No, never without a grown-up',
        options: ['No, never without a grown-up', 'Yes, it is fun to play', 'Only sometimes'],
        hint: 'A single matchstick can start a fire that burns clothes and houses!',
        misconception: 'A small matchstick is NOT harmless! It can ignite curtains or clothes in seconds. Never touch matches or go near a lighted stove without a grown-up!',
    },
    {
        type: 'identify_electricity',
        question: 'What should we do with wet hands near electrical switches?',
        answer: 'Keep them away and dry hands first',
        options: ['Keep them away and dry hands first', 'Touch the switch quickly', 'Splash water on it'],
        hint: 'Water carries electricity and can give you a dangerous shock!',
        misconception: 'Even slightly wet hands are dangerous! Water carries electric current through the skin. Always dry your hands fully before touching any switch!',
    },
    {
        type: 'sort_rules',
        question: 'Drag each hazard item to the correct safety rule!',
        answer: 'sort',
        options: [],
        hint: 'Matchstick = fire hazard, Knife = sharp hazard, Socket = electrical hazard!',
        misconception: 'Each hazard has its own rule: sharp objects need a grown-up, matches must never be played with, and wet hands stay away from switches!',
        sortItems: [
            { id: 'knife', label: 'Knife / Scissors', emoji: '🔪', correctBin: 'sharp' },
            { id: 'match', label: 'Matchstick', emoji: '🔥', correctBin: 'fire' },
            { id: 'socket', label: 'Electric Socket', emoji: '🔌', correctBin: 'electric' },
        ],
        bins: [
            { id: 'sharp', label: 'Sharp (No Grown-up)', color: '#EF4444' },
            { id: 'fire', label: 'Fire (No Matches)', color: '#F97316' },
            { id: 'electric', label: 'Electric (Dry Hands)', color: '#3B82F6' },
        ],
    },
    {
        type: 'identify_footpath',
        question: 'Where is the safest place to walk when walking along a road?',
        answer: 'On the footpath',
        options: ['On the footpath', 'In the middle of the road', 'Behind fast cars'],
        hint: 'Footpaths are built away from moving traffic for pedestrians!',
        misconception: 'Walking in the middle of the road is extremely dangerous because of fast vehicles. Always walk safely on the footpath!',
    },
    {
        type: 'identify_hurt',
        question: 'What should you do if you fall in the playground and scrape your knee?',
        answer: 'Tell a grown-up right away',
        options: ['Tell a grown-up right away', 'Hide it and say nothing', 'Try to fix it with dirty water'],
        hint: 'Grown-ups know how to give first aid and keep you safe!',
        misconception: 'Never hide an injury! Hiding a cut or burn is dangerous because it needs proper first aid from a parent, teacher, or nurse.',
    },
    {
        type: 'sort_safe_unsafe',
        question: 'Drag each action into Safe or Unsafe!',
        answer: 'sort',
        options: [],
        hint: 'Holding hands and walking slowly are safe. Running on stairs or touching switches with wet hands is unsafe!',
        misconception: 'Safety rules protect us from falls, shocks, and cuts. Skipping them is an unnecessary risk!',
        sortItems: [
            { id: 'stairs', label: 'Walk slowly on stairs', emoji: '🪜', correctBin: 'safe' },
            { id: 'hand', label: 'Hold adult hand on road', emoji: '🤝', correctBin: 'safe' },
            { id: 'wet-switch', label: 'Touch switch wet-handed', emoji: '⚡', correctBin: 'unsafe' },
            { id: 'climb-chair', label: 'Climb high on chairs', emoji: '🪑', correctBin: 'unsafe' },
        ],
        bins: [
            { id: 'safe', label: 'Safe Action ✅', color: '#22C55E' },
            { id: 'unsafe', label: 'Unsafe Hazard ❌', color: '#EF4444' },
        ],
    },
    {
        type: 'sort_locations',
        question: 'Where do these safety rules belong?',
        answer: 'sort',
        options: [],
        hint: 'Knives and matches are at home. Stairs and pushing rules are at school. Footpaths are on the road!',
        misconception: 'Different places have different hazards. We must follow safety rules everywhere - at home, at school, and on the road!',
        sortItems: [
            { id: 'home-knife', label: 'No knives without adult', emoji: '🔪', correctBin: 'home' },
            { id: 'school-stairs', label: 'Walk slowly on stairs', emoji: '🏫', correctBin: 'school' },
            { id: 'road-left', label: 'Look left-right-left', emoji: '🚦', correctBin: 'road' },
        ],
        bins: [
            { id: 'home', label: 'Home 🏡', color: '#8B5CF6' },
            { id: 'school', label: 'School 🏫', color: '#EC4899' },
            { id: 'road', label: 'Road 🛣️', color: '#F59E0B' },
        ],
    },
];
// ─── Mascot: Safety Star Sana ─────────────────────────────────
function SafetyStarSana({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-14 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-400">
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 6, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <radialGradient id="sana-face" cx="0.4" cy="0.4" r="0.6">
              <stop offset="0%" stopColor="#FDE047"/>
              <stop offset="100%" stopColor="#EAB308"/>
            </radialGradient>
          </defs>
          {/* Safety Star Head */}
          <path d="M37.5 5 L44 22 L62 25 L49 37 L52 55 L37.5 46 L23 55 L26 37 L13 25 L31 22 Z" fill="url(#sana-face)" stroke="#CA8A04" strokeWidth="2"/>
          {/* Eyes & Smile */}
          <circle cx="30" cy="28" r="4" fill="#1E293B"/>
          <circle cx="45" cy="28" r="4" fill="#1E293B"/>
          <circle cx="31.5" cy="27" r="1.5" fill="white"/>
          <circle cx="46.5" cy="27" r="1.5" fill="white"/>
          <path d="M33 36 Q37.5 42 42 36" stroke="#854D0E" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          {/* Yellow Safety Vest Body */}
          <rect x="25" y="55" width="25" height="25" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" rx="4"/>
          {/* Reflective stripes on vest */}
          <rect x="29" y="58" width="4" height="18" fill="white" opacity="0.8"/>
          <rect x="42" y="58" width="4" height="18" fill="white" opacity="0.8"/>
          {/* Whistle */}
          <circle cx="37.5" cy="53" r="3" fill="#94A3B8" stroke="#475569" strokeWidth="1"/>
          {/* Feet */}
          <ellipse cx="30" cy="83" rx="5" ry="3.5" fill="#334155"/>
          <ellipse cx="45" cy="83" rx="5" ry="3.5" fill="#334155"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Reward Row ────────────��─────────────────────────────
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
// ─── Safety Scene Background ──────────────────────────────────
function SafetySceneBg({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #38BDF8 0%, #BAE6FD 40%, #E0F2FE 60%, #86EFAC 100%)' }}/>
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FACC15" opacity="0.9"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/4 opacity-80" animate={{ x: [0, 35, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="75" height="30" viewBox="0 0 75 30">
          <ellipse cx="22" cy="18" rx="16" ry="11" fill="white"/>
          <ellipse cx="42" cy="14" rx="20" ry="13" fill="white"/>
          <ellipse cx="56" cy="18" rx="13" ry="9" fill="white"/>
        </svg>
      </motion.div>
      {/* Road at bottom with zebra crossing */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: '#334155' }}/>
      <div className="absolute bottom-0 left-1/3 right-1/3 h-28 flex justify-around items-center px-4">
        {Array.from({ length: 5 }).map((_, i) => (<div key={i} className="w-8 h-20 bg-white opacity-90 rounded-sm"/>))}
      </div>
      {/* Footpath */}
      <div className="absolute bottom-28 left-0 right-0 h-6 bg-slate-300 border-t-2 border-slate-400"/>
    </div>);
}
// ─── Custom SVG Safety Objects ────────────────────────────────
function TrafficLightIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size * 1.5} viewBox="0 0 40 60">
      <rect x="8" y="5" width="24" height="50" fill="#1E293B" rx="6" stroke="#0F172A" strokeWidth="2"/>
      <circle cx="20" cy="15" r="5" fill="#EF4444"/>
      <circle cx="20" cy="30" r="5" fill="#FACC15"/>
      <circle cx="20" cy="45" r="5" fill="#22C55E"/>
    </svg>);
}
function FirstAidIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="5" y="12" width="40" height="32" fill="#EF4444" rx="6" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M25 6 L25 12 M20 9 L30 9" stroke="#B91C1C" strokeWidth="3" strokeLinecap="round"/>
      {/* White Cross */}
      <rect x="21" y="20" width="8" height="16" fill="white" rx="1"/>
      <rect x="17" y="24" width="16" height="8" fill="white" rx="1"/>
    </svg>);
}
function MatchstickIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <line x1="15" y1="40" x2="35" y2="15" stroke="#D97706" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="37" cy="13" r="5" fill="#DC2626"/>
      {/* Little flame */}
      <path d="M37 3 C35 0, 42 -2, 40 4 C43 6, 39 9, 37 3 Z" fill="#F59E0B"/>
    </svg>);
}
function KnifeIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="10" y="32" width="12" height="12" fill="#78350F" rx="2"/>
      <path d="M20 35 L42 13 C45 10, 48 13, 45 16 L23 38 Z" fill="#94A3B8" stroke="#475569" strokeWidth="1.5"/>
    </svg>);
}
function SocketIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="8" y="8" width="34" height="34" fill="white" rx="6" stroke="#64748B" strokeWidth="2"/>
      <circle cx="20" cy="22" r="3" fill="#1E293B"/>
      <circle cx="30" cy="22" r="3" fill="#1E293B"/>
      <circle cx="25" cy="35" r="3" fill="#1E293B"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('knife'))
        return <KnifeIcon size={size}/>;
    if (id.includes('sharp'))
        return <KnifeIcon size={size}/>;
    if (id.includes('home-knife'))
        return <KnifeIcon size={size}/>;
    if (id.includes('match'))
        return <MatchstickIcon size={size}/>;
    if (id.includes('fire'))
        return <MatchstickIcon size={size}/>;
    if (id.includes('socket'))
        return <SocketIcon size={size}/>;
    if (id.includes('electric'))
        return <SocketIcon size={size}/>;
    if (id.includes('wet-switch'))
        return <SocketIcon size={size}/>;
    if (id.includes('stairs'))
        return <FirstAidIcon size={size}/>;
    if (id.includes('climb-chair'))
        return <FirstAidIcon size={size}/>;
    if (id.includes('road'))
        return <TrafficLightIcon size={size}/>;
    if (id.includes('hand'))
        return <TrafficLightIcon size={size}/>;
    if (id.includes('safe'))
        return <FirstAidIcon size={size}/>;
    if (id.includes('unsafe'))
        return <MatchstickIcon size={size}/>;
    if (id.includes('home'))
        return <FirstAidIcon size={size}/>;
    if (id.includes('school'))
        return <FirstAidIcon size={size}/>;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={115} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-2 py-2 border-2 border-slate-200`}>
        {renderSortIcon(id, 48)}
        <span className="text-[10px] font-bold text-slate-700 mt-1 text-center">{label}</span>
      </div>
    </Draggable>);
}

function SortBin({ id, label, color, x, y, width, height, isHovering }: {
  id: string;
  label: string;
  color: string;
  x: number;
  y: number;
  width: number;
  height: number;
  isHovering: boolean;
}) {
  return (
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      {renderSortIcon(id, 48)}
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
    if (slide > 0) setSlide(slide - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-2xl shadow-2xl overflow-hidden" style={{ width, height, background: 'linear-gradient(135deg, #1E293B 0%, #0F172A 100%)' }}>
      <SafetySceneBg width={width} height={height}/>
      <SafetyStarSana mood="happy" speaking={null}/>

      {/* Top Bar */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/10 backdrop-blur-md px-4 py-2 rounded-xl">
        <span className="text-white font-bold text-sm">🛡️ Safety Star School (Class 1 EVS)</span>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-amber-400 scale-125' : 'bg-white/30'}`}/>))}
        </div>
      </div>

      {/* Slide Content Card */}
      <motion.div key={slide} initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -20, scale: 0.95 }} transition={{ duration: 0.3 }} className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-[540px] text-center border-4 border-amber-400 flex flex-col items-center my-auto">
        <span className="text-6xl mb-3">{current.emoji}</span>
        <h2 className="text-2xl font-extrabold text-slate-800 mb-2">{current.title}</h2>
        <p className="text-base text-slate-600 font-medium leading-relaxed">{current.text}</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all shadow-md ${slide === 0 ? 'bg-slate-700/50 text-slate-400 cursor-not-allowed' : 'bg-slate-700 text-white hover:bg-slate-600'}`}>
          ⬅️ Back
        </button>

        <button onClick={handleNext} className="px-8 py-3 rounded-xl font-extrabold text-base bg-gradient-to-r from-amber-400 to-orange-500 text-slate-900 shadow-lg hover:brightness-110 active:scale-95 transition-all">
          {slide === total - 1 ? 'Start Safety Quest! 🚀' : 'Next ➔'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface SafetyGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

type GameScreen = 'teaching' | 'play';

export function SafetyGame({width = 720, height = 560, onComplete}: SafetyGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Safety Star Sana. Let us learn safety rules together!');

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>();
  const [itemPositions, setItemPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>();
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const challenge = CHALLENGES[challengeIdx];

  // Inactivity timer for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      setShowHint(true);
      setMascotMood('thinking');
      setMascotSpeech('Need a hint? Check the hint button!');
      speechManager.speak('Need a hint? Check the hint button!');
      audioManager.play('hint');
    }, 10000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, resetInactivityTimer]);

  // Initialize positions for sort challenges
  useEffect(() => {
    if (challenge.sortItems) {
      const initialPos: Record<string, { x: number; y: number }> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, index) => {
        initialPos[item.id] = { x: 40 + index * 130, y: 350 };
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
  }, [challengeIdx, challenge.sortItems]);

  const handleMultipleChoice = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === challenge.answer) {
      audioManager.play('success');
      setSparklePos({ x, y });
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You know your safety rules!');
      speechManager.speak('Fantastic! You know your safety rules!');
      setStars(s => s + 1);

      setTimeout(() => {
        if (challengeIdx < CHALLENGES.length - 1) {
          setChallengeIdx(c => c + 1);
          setMascotMood('happy');
          setMascotSpeech('Great job! Here is the next challenge.');
          speechManager.speak('Great job! Here is the next challenge.');
        } else {
          setShowConfetti(true);
          setShowSuccess(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1200);
    } else {
      audioManager.play('error');
      setErrors(err => err + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setShowHint(true);
    }
  };

  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    const safeItem = challenge.sortItems?.find((i: { id: string }) => i.id === id);
    if (!safeItem || !challenge.bins) return false;

    // Check bins collision
    let matchedBin: string | null = null;
    challenge.bins.forEach((bin: { id: string }, index: number) => {
      const binX = 50 + index * 210;
      const binY = 140;
      const binW = 190;
      const binH = 180;
      if (x >= binX && x <= binX + binW && y >= binY && y <= binY + binH) {
        matchedBin = bin.id;
      }
    });

    setHoverBin(null);

    if (matchedBin === safeItem.correctBin) {
      audioManager.play('drop-correct');
      setPlacedItems(prev => ({ ...prev, [id]: true }));
      setMascotMood('happy');
      setMascotSpeech('Spot on! That is the correct safety rule!');
      speechManager.speak('Spot on! That is the correct safety rule!');

      // Check if all sort items are placed
      const updatedPlaced = { ...placedItems, [id]: true };
      const allDone = challenge.sortItems?.every((i: { id: string }) => updatedPlaced[i.id]);

      if (allDone) {
        setStars(s => s + 1);
        setTimeout(() => {
          if (challengeIdx < CHALLENGES.length - 1) {
            setChallengeIdx(c => c + 1);
            setMascotSpeech('Amazing sorting! Let us keep going.');
            speechManager.speak('Amazing sorting! Let us keep going.');
          } else {
            setShowConfetti(true);
            setShowSuccess(true);
            audioManager.play('celebration');
            const finalScore = Math.max(0, 100 - errors * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 1200);
      }
      return true;
    } else {
      audioManager.play('drop-wrong');
      setErrors(err => err + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setShowHint(true);
      return false;
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => { setScreen('play'); audioManager.play('success'); }} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-2xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #0F172A 100%)' }}>
      <SafetySceneBg width={width} height={height}/>
      <SafetyStarSana mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/10 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/20">
        <div className="flex items-center gap-3">
          <span className="text-white font-black text-sm">🛡️ Challenge {challengeIdx + 1} of {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <button onClick={() => { setShowHint(true); audioManager.play('hint'); }} className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-extrabold text-xs px-3 py-1.5 rounded-xl shadow transition-all flex items-center gap-1">
          💡 Hint
        </button>
      </div>

      {/* Challenge Question Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-5 shadow-2xl max-w-[580px] w-full text-center border-4 border-amber-400 my-auto">
        <h3 className="text-lg font-extrabold text-slate-800 mb-4">{challenge.question}</h3>

        {/* Multiple Choice Options */}
        {challenge.answer !== 'sort' && challenge.options && (<div className="grid grid-cols-1 gap-3 max-w-[460px] mx-auto">
            {challenge.options.map((option, idx) => (<motion.button key={idx} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={(e) => handleMultipleChoice(option, e)} className="w-full py-3 px-4 rounded-2xl font-bold text-sm bg-gradient-to-r from-slate-100 to-slate-200 hover:from-amber-100 hover:to-orange-100 text-slate-800 border-2 border-slate-300 hover:border-amber-400 shadow transition-all text-left flex items-center justify-between">
                <span>{option}</span>
                <span className="text-lg">👉</span>
              </motion.button>))}
          </div>)}

        {/* Sort Challenge View */}
        {challenge.answer === 'sort' && challenge.sortItems && challenge.bins && (<div className="relative h-[280px] w-full">
            {/* Bins */}
            <div className="flex justify-around absolute top-0 left-0 right-0">
              {challenge.bins.map((bin, index) => {
                const binX = 20 + index * 215;
                return (<SortBin key={bin.id} id={bin.id} label={bin.label} color={bin.color} x={binX} y={10} width={190} height={160} isHovering={hoverBin === bin.id}/>);
            })}
            </div>

            {/* Draggable Cards */}
            {challenge.sortItems.map((item) => (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={itemPositions[item.id]?.x || 50} y={itemPositions[item.id]?.y || 200} placed={placedItems[item.id] || false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>))}
          </div>)}
      </div>

      {/* Footer Info */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 text-xs text-white/70 font-bold">
        <span>Errors: {errors}</span>
        <span>CISCE Class 1 EVS * Safety Rules</span>
      </div>

      {/* Feedback Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccess && (
        <SuccessBanner
          message={`Amazing Safety Hero! You finished all challenges with ${stars} stars!`}
          onComplete={() => setShowSuccess(false)}
        />
      )}
      {showHint && (<HintBubble message={challenge.hint} onComplete={() => setShowHint(false)}/>)}
      {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}
    </div>
  );
}
