'use client';
/**
 * FoodGame - Learn about food: energy-giving, body-building, protective, and healthy vs junk food
 *
 * CISCE Nodes: c1_evs_006 (My need for food - types of food, healthy food)
 * Enrichment: c1_evs_enrichment_part6.marker
 *
 * ELI5: "Food is like fuel for your body. Just as a car needs petrol to move,
 *   you need food to run, play, and think. Some foods give energy, some help
 *   you grow, and some protect you from getting sick!"
 *
 * Misconceptions (from enrichment):
 *   1. "Milk is an energy-giving food because it gives strength." → "Milk is a
 *      body-building food! It helps bones and muscles grow."
 *   2. "All tasty food is healthy food." → "Chocolates and chips are junk food!
 *      They taste nice but have too much sugar, salt, or oil."
 *   3. "We eat food only to fill our stomach." → "We eat food for three reasons:
 *      energy, growth, and protection!"
 *
 * Story: "Help Chef Chintu cook healthy meals, sort food into groups, and learn
 *   what makes our body strong and happy!"
 */
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useEffect, useRef } from 'react';
import { Draggable } from '../../sim-primitives/Draggable';
import { audioManager } from '../../../lib/sim-engine/audio';
import { speechManager } from '../../../lib/sim-engine/speech';
import { Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine/feedback';
// ─── Teaching slides (from enrichment DEFINITION + TEXT_WALKTHROUGH) ──
const TEACHING_SLIDES = [
    { title: 'Food is Our Fuel! 🍛', text: 'Food gives us energy to play and study, helps our body grow taller and stronger, and protects us from falling ill!', emoji: '🍛', bgColor: 'from-amber-400 to-orange-500', spoken: 'Food gives us energy to play and study, helps our body grow taller, and protects us from falling ill!' },
    { title: 'Energy-Giving Foods 🌾', text: 'Foods like rice, roti, chapati, and potatoes give us energy to run, jump, and think all day long!', emoji: '🍚', bgColor: 'from-yellow-400 to-amber-500', spoken: 'Foods like rice, roti, and potatoes give us energy to run, jump, and think all day long!' },
    { title: 'Body-Building Foods 🥛', text: 'Milk, dal, eggs, and paneer help our bones and muscles grow strong so we get taller and stronger!', emoji: '🥛', bgColor: 'from-blue-400 to-indigo-500', spoken: 'Milk, dal, eggs, and paneer help our bones and muscles grow strong so we get taller!' },
    { title: 'Protective Foods 🍎', text: 'Fruits like apples and oranges, and vegetables like spinach and carrots guard our body against illness!', emoji: '🍎', bgColor: 'from-green-400 to-emerald-500', spoken: 'Fruits and vegetables guard our body against illness and keep us healthy!' },
    { title: 'Healthy Food vs Junk Food 🍫', text: 'Fresh meals give us goodness! Chips, chocolates, and cold drinks are junk food - they taste nice but harm our teeth and body over time if we eat too much!', emoji: '🍫', bgColor: 'from-rose-400 to-red-500', spoken: 'Fresh meals give us goodness! Chips and chocolates are junk food that can harm our body if we eat too much!' },
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
    sortItems?: {
        id: string;
        label: string;
        icon: string;
        correctBin: string;
        x: number;
        y: number;
    }[];
    bins?: {
        id: string;
        label: string;
        color: string;
        x: number;
        y: number;
        width: number;
        height: number;
    }[];
}
// ─── Challenges (8 progressive: identify → sort) ──────────────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify',
        question: 'Which food gives us ENERGY to play and study?',
        answer: 'Rice and roti',
        options: ['Rice and roti', 'Apple', 'Milk'],
        hint: 'Think: which food is made from grains and gives power for the day?',
        misconception: 'Rice and roti are energy-giving foods! Milk is body-building, and apples are protective!',
    },
    {
        type: 'identify',
        question: 'Which food helps our bones and muscles GROW tall and strong?',
        answer: 'Milk and dal',
        options: ['Chips', 'Milk and dal', 'Chocolate'],
        hint: 'Think: what do you drink or eat in a warm bowl to help your body grow?',
        misconception: 'Milk and dal are body-building foods! Chips and chocolates are junk food that do not help us grow.',
    },
    {
        type: 'identify',
        question: 'Which food PROTECTS us from getting sick?',
        answer: 'Fruits and vegetables',
        options: ['Cold drink', 'Fruits and vegetables', 'Fried snacks'],
        hint: 'Think: juicy and colourful items that act like little shields for the body!',
        misconception: 'Fruits and vegetables are protective foods! Cold drinks and fried snacks are junk food.',
    },
    {
        type: 'sort',
        question: 'Drag each food to its correct food group!',
        answer: 'sort',
        options: [],
        hint: 'Rice = energy, Milk = body-building, Apple = protective!',
        misconception: 'Remember: Rice gives energy, milk and dal build the body, and fruits and carrots protect us!',
        sortItems: [
            { id: 'rice', label: 'Rice', icon: 'rice', correctBin: 'energy', x: 40, y: 380 },
            { id: 'milk', label: 'Milk', icon: 'milk', correctBin: 'body', x: 160, y: 380 },
            { id: 'carrot', label: 'Carrot', icon: 'carrot', correctBin: 'protective', x: 280, y: 380 },
        ],
        bins: [
            { id: 'energy', label: 'Energy 🌾', color: '#D97706', x: 40, y: 150, width: 180, height: 180 },
            { id: 'body', label: 'Growth 💪', color: '#2563EB', x: 260, y: 150, width: 180, height: 180 },
            { id: 'protective', label: 'Shield 🛡️', color: '#16A34A', x: 480, y: 150, width: 180, height: 180 },
        ],
    },
    {
        type: 'identify',
        question: 'Is eating too many chips and chocolates good for us?',
        answer: 'No, it is junk food',
        options: ['Yes, it is healthy', 'No, it is junk food', 'Yes, eat every day'],
        hint: 'Think: do chips and chocolates have healthy vitamins or too much salt and sugar?',
        misconception: 'Chocolates and chips are junk food! They taste nice but have too much sugar, salt, or oil and harm our body over time.',
    },
    {
        type: 'identify',
        question: 'Why do we need to eat food every day?',
        answer: 'For energy, growth, and protection',
        options: ['Only to fill stomach', 'For energy, growth, and protection', 'Just for fun'],
        hint: 'Think about the three big jobs food does for our body!',
        misconception: 'We do not eat food just to fill our stomach! We eat for energy to move, growth to get taller, and protection from illness.',
    },
    {
        type: 'sort',
        question: 'Drag these foods into Healthy or Junk food!',
        answer: 'sort',
        options: [],
        hint: 'Fresh fruits and dal are healthy! Sweets and chips are junk food!',
        misconception: 'Healthy foods are fresh and give our body goodness. Junk food tastes sweet or salty but harms teeth and body if eaten too much.',
        sortItems: [
            { id: 'apple', label: 'Apple', icon: 'apple', correctBin: 'healthy', x: 40, y: 380 },
            { id: 'chips', label: 'Chips', icon: 'chips', correctBin: 'junk', x: 160, y: 380 },
            { id: 'egg', label: 'Egg', icon: 'egg', correctBin: 'healthy', x: 280, y: 380 },
            { id: 'choco', label: 'Chocolate', icon: 'chocolate', correctBin: 'junk', x: 400, y: 380 },
        ],
        bins: [
            { id: 'healthy', label: 'Healthy Food 🍏', color: '#16A34A', x: 80, y: 150, width: 250, height: 180 },
            { id: 'junk', label: 'Junk Food 🍫', color: '#DC2626', x: 390, y: 150, width: 250, height: 180 },
        ],
    },
    {
        type: 'sort',
        question: 'Match each food to what it does for our body!',
        answer: 'sort',
        options: [],
        hint: 'Roti = energy, Dal = body-building, Spinach = protective!',
        misconception: 'Link each food to its main work: roti/rice gives energy, dal/milk builds muscles, and spinach/carrot protects us from illness!',
        sortItems: [
            { id: 'roti', label: 'Roti', icon: 'roti', correctBin: 'energy', x: 40, y: 380 },
            { id: 'dal', label: 'Dal', icon: 'milk', correctBin: 'body', x: 160, y: 380 },
            { id: 'spinach', label: 'Spinach', icon: 'carrot', correctBin: 'protective', x: 280, y: 380 },
        ],
        bins: [
            { id: 'energy', label: 'Gives Energy ⚡', color: '#D97706', x: 40, y: 150, width: 180, height: 180 },
            { id: 'body', label: 'Builds Body 🦴', color: '#2563EB', x: 260, y: 150, width: 180, height: 180 },
            { id: 'protective', label: 'Protects Us 🛡️', color: '#16A34A', x: 480, y: 150, width: 180, height: 180 },
        ],
    },
];
// ─── Custom SVG Food Icons ────────────────────────────────────
function RiceIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="38" rx="20" ry="12" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1.5"/>
      <ellipse cx="30" cy="34" rx="16" ry="8" fill="#F8FAFC"/>
      <path d="M22 34 Q26 30, 30 34 T38 34" stroke="#64748B" strokeWidth="1" fill="none"/>
      {/* Steaming rice grains */}
      <ellipse cx="26" cy="24" rx="3" ry="2" fill="white"/>
      <ellipse cx="34" cy="22" rx="3" ry="2" fill="white"/>
      <ellipse cx="30" cy="18" rx="2.5" ry="1.5" fill="white"/>
    </svg>);
}
function RotiIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="22" fill="#D97706" stroke="#B45309" strokeWidth="2"/>
      <circle cx="30" cy="30" r="18" fill="#FBBF24"/>
      <circle cx="24" cy="25" r="2" fill="#92400E" opacity="0.6"/>
      <circle cx="36" cy="28" r="2.5" fill="#92400E" opacity="0.6"/>
      <circle cx="30" cy="36" r="2" fill="#92400E" opacity="0.6"/>
    </svg>);
}
function MilkIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 18 L40 18 L36 50 L24 50 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5"/>
      <path d="M21 22 L39 22 L37 48 L23 48 Z" fill="#F8FAFC"/>
      <path d="M22 26 L38 26 L36 46 L24 46 Z" fill="#BFDBFE"/>
      <path d="M18 18 L42 18 L40 14 L20 14 Z" fill="#64748B"/>
    </svg>);
}
function EggIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 10 C20 10, 15 25, 15 38 C15 48, 21 52, 30 52 C39 52, 45 48, 45 38 C45 25, 40 10, 30 10 Z" fill="#FEF3C7" stroke="#F59E0B" strokeWidth="2"/>
      <circle cx="30" cy="36" r="8" fill="#F59E0B"/>
      <circle cx="30" cy="36" r="5" fill="#D97706"/>
    </svg>);
}
function AppleIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M30 15 C38 12, 45 18, 45 28 C45 42, 35 50, 30 50 C25 50, 15 42, 15 28 C15 18, 22 12, 30 15 Z" fill="#EF4444" stroke="#DC2626" strokeWidth="1.5"/>
      <path d="M30 15 Q35 8, 40 10" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M35 12 Q42 10, 40 16 Z" fill="#22C55E"/>
    </svg>);
}
function CarrotIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M25 15 L35 15 L45 45 C45 45, 30 52, 15 45 Z" fill="#F97316" stroke="#C2410C" strokeWidth="1.5"/>
      <path d="M26 15 Q30 5, 34 15 Z" fill="#22C55E"/>
      <path d="M22 13 Q30 2, 38 13 Z" fill="#16A34A"/>
      <line x1="28" y1="22" x2="36" y2="28" stroke="#EA580C" strokeWidth="1.5"/>
      <line x1="25" y1="32" x2="33" y2="38" stroke="#EA580C" strokeWidth="1.5"/>
    </svg>);
}
function ChipsIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 14 L44 14 L48 50 L12 50 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" rx="3"/>
      <text x="30" y="34" fontSize="11" fill="white" fontWeight="bold" textAnchor="middle">CHIPS</text>
      <circle cx="22" cy="42" r="3" fill="#FBBF24"/>
      <circle cx="38" cy="42" r="3" fill="#FBBF24"/>
    </svg>);
}
function ChocolateIcon({ size = 48 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="15" width="30" height="30" fill="#78350F" stroke="#451A03" strokeWidth="2" rx="3"/>
      <line x1="15" y1="25" x2="45" y2="25" stroke="#451A03" strokeWidth="1.5"/>
      <line x1="15" y1="35" x2="45" y2="35" stroke="#451A03" strokeWidth="1.5"/>
      <line x1="25" y1="15" x2="25" y2="45" stroke="#451A03" strokeWidth="1.5"/>
      <line x1="35" y1="15" x2="35" y2="45" stroke="#451A03" strokeWidth="1.5"/>
    </svg>);
}
// ─── Chef Chintu Mascot ───────────────────────────────────────
function ChefChintu({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px]">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -10, 10, -10, 0], scale: [1, 1.15, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 5, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="85" viewBox="0 0 75 85">
          {/* Chef Hat */}
          <path d="M22 25 Q18 10, 30 8 Q37 2, 45 8 Q55 10, 52 25 Z" fill="white" stroke="#CBD5E1" strokeWidth="1.5"/>
          <rect x="24" y="23" width="27" height="6" fill="#F1F5F9" stroke="#CBD5E1" strokeWidth="1" rx="1"/>
          {/* Head (Face) */}
          <circle cx="37.5" cy="45" r="15" fill="#FDE68A" stroke="#D97706" strokeWidth="1.5"/>
          {/* Eyes */}
          <circle cx="32" cy="43" r="2" fill="#1E293B"/>
          <circle cx="43" cy="43" r="2" fill="#1E293B"/>
          {/* Smile */}
          <path d="M33 50 Q37.5 54 42 50" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Rosy Cheeks */}
          <circle cx="29" cy="46" r="2.5" fill="#FCA5A5" opacity="0.7"/>
          <circle cx="46" cy="46" r="2.5" fill="#FCA5A5" opacity="0.7"/>
          {/* Apron / Body */}
          <path d="M24 60 L51 60 L56 82 L19 82 Z" fill="#EF4444"/>
          <path d="M28 60 L47 60 L45 82 L30 82 Z" fill="white"/>
          {/* Wooden Spoon in hand */}
          <rect x="52" y="55" width="3" height="22" fill="#D97706" rx="1"/>
          <circle cx="53.5" cy="53" r="5" fill="#B45309"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Reward Row ──────────────────────────────────────────
function StarRow({ count, total }: {
    count: number;
    total: number;
}) {
    return (<div className="flex gap-1">
      {Array.from({ length: total }).map((_, i) => (<motion.div key={i} initial={false} animate={i < count ? { scale: [0, 1.3, 1], rotate: [0, 360] } : {}} transition={{ duration: 0.5 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.2)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Kitchen Scene Background ─────────────────────────────────
function KitchenScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Wall gradient */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="kitchen-wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7"/>
            <stop offset="50%" stopColor="#FDE68A"/>
            <stop offset="100%" stopColor="#F59E0B"/>
          </linearGradient>
        </defs>
        <rect width="720" height="560" fill="url(#kitchen-wall)"/>
      </svg>
      {/* Window */}
      <div className="absolute top-4 left-6 w-32 h-28 bg-sky-200 border-4 border-amber-900 rounded-lg overflow-hidden opacity-80">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-300 to-sky-100"/>
        {/* Window grid */}
        <div className="absolute inset-0 border-r-2 border-b-2 border-amber-900 left-1/2 top-0 bottom-0"/>
        <div className="absolute inset-0 border-b-2 border-amber-900 top-1/2 left-0 right-0"/>
        {/* Sun in window */}
        <div className="absolute top-3 right-3 w-6 h-6 bg-yellow-300 rounded-full"/>
      </div>
      {/* Kitchen Counter at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #B45309 0%, #78350F 100%)' }}/>
      <div className="absolute bottom-28 left-0 right-0 h-4 bg-amber-950 opacity-40"/>
      {/* Decorative fruit basket on counter */}
      <div className="absolute bottom-6 left-10">
        <svg width="50" height="35" viewBox="0 0 50 35">
          <ellipse cx="25" cy="20" rx="20" ry="12" fill="#D97706"/>
          <ellipse cx="25" cy="18" rx="18" ry="10" fill="#B45309"/>
          <circle cx="20" cy="12" r="6" fill="#EF4444"/>
          <circle cx="30" cy="12" r="6" fill="#22C55E"/>
          <circle cx="25" cy="10" r="5" fill="#FBBF24"/>
        </svg>
      </div>
    </div>);
}
// ─── Sort Icon Renderer ───────────────────────────────────────
function renderSortIcon(id: string, size: number) {
    switch (id) {
        case 'rice': return <RiceIcon size={size}/>;
        case 'roti': return <RotiIcon size={size}/>;
        case 'milk': return <MilkIcon size={size}/>;
        case 'egg': return <EggIcon size={size}/>;
        case 'apple': return <AppleIcon size={size}/>;
        case 'carrot': return <CarrotIcon size={size}/>;
        case 'chips': return <ChipsIcon size={size}/>;
        case 'chocolate': return <ChocolateIcon size={size}/>;
        default: return null;
    }
}
// ─── Sort Card Component ──────────────────────────────────────
function SortCard({ item, x, y, placed, onDragStart, onDragEnd }: {
    item: {
        id: string;
        label: string;
        icon: string;
        correctBin: string;
        x: number;
        y: number;
    };
    x: number;
    y: number;
    placed: boolean;
    onDragStart: (id: string) => void;
    onDragEnd: (id: string, x: number, y: number) => boolean;
}) {
    return (<Draggable id={item.id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={100} height={90}>
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 border-amber-300 ${placed ? 'opacity-40' : 'bg-white'} p-2`}>
        {renderSortIcon(item.icon, 48)}
        <span className="text-xs font-bold text-amber-900 mt-1">{item.label}</span>
      </div>
    </Draggable>);
}
// ─── Sort Bin Component ───────────────────────────────────────
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
        <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
            <div className="text-sm font-bold text-center px-2" style={{ color }}>{label}</div>
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
    <div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden" style={{ width, height }}>
      <KitchenScene width={width} height={height}/>

      {/* Top Header */}
      <div className="relative z-10 w-full flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg">
        <h1 className="text-2xl font-black text-amber-800">🍎 Chef Chintu&apos;s Kitchen</h1>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-amber-600 scale-125' : 'bg-gray-300'}`}/>))}
        </div>
      </div>

      {/* Main Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-xl w-full flex flex-col items-center text-center border-4 border-amber-300 my-auto">
        <span className="text-6xl mb-4">{current.emoji}</span>
        <h2 className="text-3xl font-black text-amber-900 mb-3">{current.title}</h2>
        <p className="text-lg font-medium text-gray-700 leading-relaxed">{current.text}</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-6 py-3 rounded-2xl font-bold text-white shadow-lg transition-all ${slide === 0 ? 'bg-gray-300 opacity-50 cursor-not-allowed' : 'bg-amber-600 hover:bg-amber-700 active:scale-95'}`}>
          ⬅️ Back
        </button>

        <button onClick={handleNext} className="px-8 py-3 rounded-2xl font-bold text-white shadow-lg bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 active:scale-95 text-lg">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface FoodGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function FoodGame({width = 720, height = 560, onComplete}: FoodGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [level, setLevel] = useState(0);
  const [score, setScore] = useState(100);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speech, setSpeech] = useState<string | null>(`Welcome to Chef Chintu's Kitchen! Let us learn about food!`);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);
  const [showHint, setShowHint] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{x: number; y: number} | null>(null);

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>();
  const [itemPositions, setItemPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>();
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[level];

  // Reset sort items when challenge changes
  useEffect(() => {
    if (currentChallenge.type === 'sort' && currentChallenge.sortItems) {
      const initialPlaced: Record<string, boolean> = {};
      const initialPos: Record<string, {x: number; y: number}> = {};
      currentChallenge.sortItems.forEach(item => {
        initialPlaced[item.id] = false;
        initialPos[item.id] = {x: item.x, y: item.y};
      });
      setPlacedItems(initialPlaced);
      setItemPositions(initialPos);
    }
  }, [level, currentChallenge]);

  // Inactivity hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play') {
        setShowHint(currentChallenge.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setSpeech('Need help? Check the hint!');
        speechManager.speak('Need help? Check the hint!');
      }
    }, 10000);
  }, [currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [level, screen, resetInactivityTimer]);

  // Handle multiple choice answer
  const handleAnswer = (option: string) => {
    resetInactivityTimer();
    audioManager.play('tap');

    if (option === currentChallenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setSpeech('Wonderful! That is correct!');
      speechManager.speak('Wonderful! That is correct!');
      setSparklePos({x: width / 2, y: height / 2});
      setStars(prev => prev + 1);

      setTimeout(() => {
        setSparklePos(null);
        if (level < CHALLENGES.length - 1) {
          setLevel(prev => prev + 1);
          setMascotMood('happy');
          setSpeech('Great job! Let us try the next challenge!');
          speechManager.speak('Great job! Let us try the next challenge!');
        } else {
          setShowConfetti(true);
          const finalScore = Math.max(0, 100 - errors * 5);
          setSuccessBanner(`Amazing! You completed all challenges with ${finalScore} points! 🎉`);
          audioManager.play('celebration');
          if (onComplete) onComplete(finalScore);
        }
      }, 1500);
    } else {
      audioManager.play('error');
      setScore(prev => Math.max(0, prev - 5));
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setShowHint(currentChallenge.misconception);
    }
  };

  // Drag-and-drop handlers for sort challenges
  const handleDragStart = (id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number) => {
    resetInactivityTimer();
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check if dropped in any bin
    const bin = currentChallenge.bins.find(b =>
      x >= b.x - 20 && x <= b.x + b.width + 20 &&
      y >= b.y - 20 && y <= b.y + b.height + 20
    );

    if (bin) {
      if (bin.id === item.correctBin) {
        audioManager.play('drop-correct');
        setPlacedItems(prev => ({...prev, [id]: true}));
        setSparklePos({x: x + 50, y: y + 50});

        // Check if all items in sort challenge are placed
        const updatedPlaced = {...placedItems, [id]: true};
        const allDone = currentChallenge.sortItems.every(i => updatedPlaced[i.id]);

        if (allDone) {
          audioManager.play('success');
          setMascotMood('celebrate');
          setSpeech('Fantastic sorting! All correct!');
          speechManager.speak('Fantastic sorting! All correct!');
          setStars(prev => prev + 1);

          setTimeout(() => {
            setSparklePos(null);
            if (level < CHALLENGES.length - 1) {
              setLevel(prev => prev + 1);
              setMascotMood('happy');
              setSpeech('Ready for the next one? Let us go!');
              speechManager.speak('Ready for the next one? Let us go!');
            } else {
              setShowConfetti(true);
              const finalScore = Math.max(0, 100 - errors * 5);
              setSuccessBanner(`Amazing! You completed all challenges with ${finalScore} points! 🎉`);
              audioManager.play('celebration');
              if (onComplete) onComplete(finalScore);
            }
          }, 1500);
        }
        return true;
      } else {
        audioManager.play('drop-wrong');
        setScore(prev => Math.max(0, prev - 5));
        setErrors(prev => prev + 1);
        setMascotMood('thinking');
        setSpeech(currentChallenge.misconception);
        speechManager.speak(currentChallenge.misconception);
        setShowHint(currentChallenge.misconception);
        return false;
      }
    }
    return false;
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => { setScreen('play'); audioManager.play('success'); }} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden" style={{ width, height }}>
      <KitchenScene width={width} height={height}/>

      {/* Top Header Bar */}
      <div className="relative z-10 w-full flex items-center justify-between bg-white/90 backdrop-blur-md rounded-2xl px-6 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-amber-800">Challenge {level + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-gray-600">Score: {score}</span>
        </div>
      </div>

      {/* Chef Chintu Mascot */}
      <ChefChintu mood={mascotMood} speaking={speech}/>

      {/* Question Card */}
      <div className="relative z-10 bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl max-w-xl w-full text-center border-4 border-amber-300 my-4">
        <h2 className="text-xl font-extrabold text-amber-900 leading-snug">{currentChallenge.question}</h2>
      </div>

      {/* Game Content Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center relative min-h-[260px]">
        {currentChallenge.type === 'identify' && (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl">
            {currentChallenge.options.map((option, idx) => (<motion.button key={idx} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => handleAnswer(option)} className="bg-white/95 hover:bg-amber-50 border-4 border-amber-300 rounded-2xl p-4 shadow-xl font-bold text-amber-900 text-base flex flex-col items-center justify-center gap-2 transition-all">
                <span>{option}</span>
              </motion.button>))}
          </div>)}

        {currentChallenge.type === 'sort' && currentChallenge.bins && currentChallenge.sortItems && (<div className="absolute inset-0">
            {/* Render Bins */}
            {currentChallenge.bins.map(bin => (<SortBin key={bin.id} label={bin.label} color={bin.color} x={bin.x} y={bin.y} width={bin.width} height={bin.height} isHovering={hoverBin === bin.id}/>))}

            {/* Render Draggable Sort Cards */}
            {currentChallenge.sortItems.map(item => (<SortCard key={item.id} item={item} x={itemPositions[item.id]?.x || item.x} y={itemPositions[item.id]?.y || item.y} placed={placedItems[item.id]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>))}
          </div>)}
      </div>

      {/* Feedback & Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {successBanner && <SuccessBanner message={successBanner} onComplete={() => setSuccessBanner(null)}/>}
      {showHint && <HintBubble message={showHint} onComplete={() => setShowHint(null)}/>}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>}
    </div>
  );
}
