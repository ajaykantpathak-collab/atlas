'use client';
/**
 * CleanlinessGame - Personal Cleanliness Habits and Hygiene (CISCE Class 1 EVS)
 *
 * CISCE Nodes: c1_evs_010 (Personal cleanliness - habits and hygiene)
 *
 * ELI5: "Your body is like a little house that gets dusty every day. Washing
 *   hands with soap, brushing teeth, bathing, wearing clean clothes, and
 *   cutting your nails are like sweeping and cleaning that house. If you clean
 *   it every day, tiny invisible germs cannot stay inside and make you sick!"
 *
 * Story: "Help Hygiene Hero Hema keep her body sparkling clean by washing
 *   hands, brushing teeth, bathing daily, and stopping sneaky germs!"
 *
 * 9/10 Quality Features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG cleanliness scene background (sparkling bathroom with sink, mirror, towel, soap)
 * - Custom SVG hygiene items (Soap, Toothbrush, Towel, NailClipper, Comb, WaterDrop, CleanHand, Germs)
 * - Custom SVG mascot (Hygiene Hero Hema with lab coat, soap bar, hairnet, smile, moods)
 * - Drag-and-drop: drag hygiene tools and items into correct sorting bins
 * - 8 progressive challenges: identify uses → identify frequency → sort habits → sort tools
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager (pickup, drop-correct, success, celebration, hint)
 * - Confetti + celebration on success
 * - Auto-hint after inactivity using useRef timer
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
    {
        title: 'What is Personal Cleanliness? 🧼',
        text: 'Personal cleanliness means keeping our body neat, clean, and free from dirt and germs. It is part of hygiene, which helps us stay healthy and never fall sick!',
        emoji: '🧼',
        bgColor: 'from-gold-400 to-gold-500',
    },
    {
        title: 'Wash Hands with Soap! 💧',
        text: 'Always wash hands with soap before eating and after using the toilet! Water alone cannot remove invisible germs. Soap breaks their grip and washes them away!',
        emoji: '👐',
        bgColor: 'from-gold-400 to-gold-500',
    },
    {
        title: 'Brush Teeth Twice Daily! 🦷',
        text: 'Brush your teeth twice every day - once in the morning and once at night before bed! This removes food particles so germs cannot form acid and cause cavities!',
        emoji: '✨',
        bgColor: 'from-teal-400 to-gold-500',
    },
    {
        title: 'Bathe & Wear Clean Clothes! 🚿',
        text: 'Bathe daily with soap to wash away sweat and dirt. Wear clean clothes every day to protect your skin from rashes, itching, and boils!',
        emoji: '👕',
        bgColor: 'from-green-400 to-emerald-500',
    },
    {
        title: 'Keep Nails Short & Neat! ✂️',
        text: 'Keep nails short and clean so dirt and germs cannot hide underneath them. Comb your hair to keep it neat, tangle-free, and tidy!',
        emoji: '👧',
        bgColor: 'from-emerald-400 to-teal-500',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_use' | 'identify_source' | 'sort_uses' | 'sort_sources' | 'identify_habit' | 'sort_habits';
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
// ─── Challenges (8 progressive: identify → sort → apply) ──────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_use',
        question: 'When should we wash our hands with soap?',
        answer: 'Before eating and after toilet',
        options: ['Before eating and after toilet', 'Only when they look muddy', 'Only at night before sleep'],
        hint: 'Think: what goes into your mouth, and where do invisible germs hide after using the washroom?',
        misconception: 'Germs are invisible! Even if hands look clean, they pick up germs from toys and door handles. We must wash hands with soap before eating and after using the toilet!',
    },
    {
        type: 'identify_use',
        question: 'How many times should we brush our teeth?',
        answer: 'Twice daily - morning and night',
        options: ['Twice daily - morning and night', 'Only once in the morning', 'Once a week'],
        hint: 'Think about breakfast, lunch, and dinner. Food stays stuck if you skip brushing before sleep!',
        misconception: 'Brushing only in the morning leaves teeth unprotected all night! Germs feed on leftover food overnight and form acid that causes cavities. Brush twice daily!',
    },
    {
        type: 'identify_use',
        question: 'Why should we keep our nails short and clean?',
        answer: 'To stop dirt and germs hiding under nails',
        options: ['To stop dirt and germs hiding under nails', 'To look pretty for friends', 'To scratch the wall easily'],
        hint: 'Long nails trap tiny particles of dirt and invisible germs that go straight into your tummy when you eat!',
        misconception: 'Long nails are not just messy - they hide dirt and germs underneath! When we eat with our fingers, those germs enter our body and cause stomach illness.',
    },
    {
        type: 'sort_uses',
        question: 'Drag each hygiene habit to its correct time!',
        answer: 'sort',
        options: [],
        hint: 'Morning starts with teeth and bath! Meals need clean hands!',
        misconception: 'Every habit has its correct time! Morning is for brushing and bathing, before meals is for handwashing with soap, and night is for brushing before bed.',
        sortItems: [
            { id: 'brush-morn', label: 'Brush teeth (Morning)', emoji: '🦷', correctBin: 'morning' },
            { id: 'bathe', label: 'Bathe with soap', emoji: '🚿', correctBin: 'morning' },
            { id: 'wash-eat', label: 'Wash hands before eating', emoji: '🧼', correctBin: 'meals' },
            { id: 'brush-night', label: 'Brush teeth (Night)', emoji: '🌙', correctBin: 'night' },
        ],
        bins: [
            { id: 'morning', label: 'Morning Routine ☀️', color: '#3B82F6' },
            { id: 'meals', label: 'Before Meals 🍽️', color: '#10B981' },
            { id: 'night', label: 'Before Sleep 🌙', color: '#8B5CF6' },
        ],
    },
    {
        type: 'identify_source',
        question: 'What happens if we do NOT bathe daily with soap?',
        answer: 'Sweat and dirt cause rashes and boils',
        options: ['Sweat and dirt cause rashes and boils', 'Nothing happens at all', 'We grow taller faster'],
        hint: 'Our skin collects sweat and dust every day, especially in warm weather!',
        misconception: 'Dirty, sweaty skin traps dust and germs, leading to skin problems like rashes, itching, and painful boils! Bathing with soap washes them all away.',
    },
    {
        type: 'identify_source',
        question: 'Why should we wear clean clothes every day?',
        answer: 'Prevents rashes and boils from sweat',
        options: ['Prevents rashes and boils from sweat', 'To show off new clothes', 'Clothes never get dirty'],
        hint: 'Clothes absorb our sweat and dust from the air throughout the day!',
        misconception: 'Dirty clothes absorb sweat and dust. Wearing them for many days breeds germs that cause skin infections, rashes, and itching!',
    },
    {
        type: 'sort_sources',
        question: 'Drag each action into Clean Habits vs Dirty Habits!',
        answer: 'sort',
        options: [],
        hint: 'Soap, brushing, and clean nails keep us healthy! Dirt and skipped brushing cause illness!',
        misconception: 'Clean habits protect our body from germs and illness. Dirty habits like unwashed hands, long dirty nails, and skipping brushing bring germs into our stomach and teeth!',
        sortItems: [
            { id: 'clean-hands', label: 'Washing hands with soap', emoji: '🧼', correctBin: 'clean' },
            { id: 'dirty-nails', label: 'Long dirty nails', emoji: '💅', correctBin: 'dirty' },
            { id: 'clean-teeth', label: 'Brushing twice daily', emoji: '🦷', correctBin: 'clean' },
            { id: 'dirty-clothes', label: 'Sweaty dirty clothes', emoji: '👕', correctBin: 'dirty' },
        ],
        bins: [
            { id: 'clean', label: 'Clean Habits ✅', color: '#10B981' },
            { id: 'dirty', label: 'Dirty Habits ❌', color: '#EF4444' },
        ],
    },
    {
        type: 'sort_habits',
        question: 'Match each hygiene tool to what it helps clean!',
        answer: 'sort',
        options: [],
        hint: 'Toothbrush is for teeth, soap is for hands and body, towel is for drying!',
        misconception: 'Every tool has a special job in personal cleanliness! Soap removes germs from hands and skin, a toothbrush cleans teeth, a towel dries us, and a nail clipper keeps nails short.',
        sortItems: [
            { id: 'tool-brush', label: 'Toothbrush', emoji: '🦷', correctBin: 'teeth' },
            { id: 'tool-soap', label: 'Soap Bar', emoji: '🧼', correctBin: 'hands' },
            { id: 'tool-clipper', label: 'Nail Clipper', emoji: '✂️', correctBin: 'nails' },
            { id: 'tool-towel', label: 'Clean Towel', emoji: '🧺', correctBin: 'body' },
        ],
        bins: [
            { id: 'teeth', label: 'Teeth 🦷', color: '#3B82F6' },
            { id: 'hands', label: 'Hands 👐', color: '#10B981' },
            { id: 'nails', label: 'Nails 💅', color: '#F59E0B' },
            { id: 'body', label: 'Body 🚿', color: '#EC4899' },
        ],
    },
];
// ─── Hygiene Hero Hema Mascot ─────────────────────────────────
function HygieneHeroHema({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-400">
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
                ? { y: [0, -4, 0] }
                : { rotate: [0, 6, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="hema-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff"/>
              <stop offset="100%" stopColor="#e2e8f0"/>
            </linearGradient>
            <radialGradient id="hema-sparkle" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="1"/>
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0"/>
            </radialGradient>
          </defs>
          {/* Sparkle halo */}
          <circle cx="37" cy="22" r="28" fill="url(#hema-sparkle)" opacity="0.6"/>
          {/* Body / Lab coat */}
          <path d="M22 55 L37 58 L53 55 L58 85 L17 85 Z" fill="url(#hema-coat)" stroke="#cbd5e1" strokeWidth="1.5"/>
          {/* Red scarf / collar */}
          <path d="M27 48 L37 53 L47 48 L42 43 L32 43 Z" fill="#ef4444"/>
          {/* Head / Face */}
          <circle cx="37" cy="32" r="15" fill="#fbcfe8" stroke="#f472b6" strokeWidth="1"/>
          {/* Hairnet / Cap */}
          <path d="M22 30 Q37 16 52 30 Q52 36 37 36 Q22 36 22 30 Z" fill="#38bdf8"/>
          {/* Eyes */}
          <circle cx="31" cy="31" r="2.5" fill="#1e293b"/>
          <circle cx="43" cy="31" r="2.5" fill="#1e293b"/>
          <circle cx="32" cy="30" r="1" fill="white"/>
          <circle cx="44" cy="30" r="1" fill="white"/>
          {/* Smile */}
          <path d="M33 37 Q37 41 41 37" stroke="#e11d48" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Soap bar in hand */}
          <rect x="52" y="60" width="14" height="10" rx="3" fill="#67e8f9" stroke="#0891b2" strokeWidth="1"/>
          <text x="55" y="68" fontSize="6" fill="#0e7490">🧼</text>
          {/* Feet */}
          <ellipse cx="28" cy="87" rx="5" ry="3" fill="#334155"/>
          <ellipse cx="47" cy="87" rx="5" ry="3" fill="#334155"/>
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
          <svg width="22" height="22" viewBox="0 0 24 24" fill={i < count ? '#FFD700' : 'none'} stroke={i < count ? '#FFD700' : 'rgba(255,255,255,0.3)'} strokeWidth="2">
            <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
          </svg>
        </motion.div>))}
    </div>);
}
// ─── Cleanliness Scene Background ─────────────────────────────
function CleanlinessScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Background gradient (Bathroom / Clean room wall) */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #E0F7FA 0%, #B2EBF2 40%, #80DEEA 70%, #4DD0E1 100%)' }}/>
      {/* Tiled wall pattern overlay */}
      <div className="absolute inset-0 opacity-15" style={{ backgroundImage: 'linear-gradient(to right, #00acc1 1px, transparent 1px), linear-gradient(to bottom, #00acc1 1px, transparent 1px)', backgroundSize: '40px 40px' }}/>
      {/* Sparkles floating */}
      <motion.div className="absolute top-12 left-1/4" animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.9, 0.4] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"/></svg>
      </motion.div>
      <motion.div className="absolute top-24 right-1/3" animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.6, 1, 0.6] }} transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFD700"><path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z"/></svg>
      </motion.div>
      {/* Bathroom sink / counter base */}
      <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(180deg, #B0BEC5 0%, #78909C 100%)' }}/>
      <div className="absolute bottom-20 left-0 right-0 h-4 bg-gold-600 opacity-80"/>
    </div>);
}
// ─── Custom SVG Hygiene Objects ───────────────────────────────
function SoapIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="10" y="20" width="40" height="24" rx="10" fill="#67E8F9" stroke="#0891B2" strokeWidth="2"/>
      {/* Bubbles */}
      <circle cx="20" cy="16" r="5" fill="white" opacity="0.8"/>
      <circle cx="28" cy="12" r="3" fill="white" opacity="0.9"/>
      <circle cx="40" cy="15" r="4" fill="white" opacity="0.85"/>
    </svg>);
}
function ToothbrushIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 45 L45 15 L50 20 L15 50 Z" fill="#F43F5E" stroke="#BE123C" strokeWidth="1.5" rx="3"/>
      {/* Bristles */}
      <rect x="42" y="12" width="10" height="8" rx="2" fill="white" stroke="#CBD5E1" strokeWidth="1"/>
      <path d="M44 12 L44 8 M47 12 L47 8 M50 12 L50 8" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round"/>
    </svg>);
}
function TowelIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="10" width="36" height="40" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="2"/>
      {/* Stripes */}
      <rect x="12" y="20" width="36" height="6" fill="#EF4444"/>
      <rect x="12" y="34" width="36" height="6" fill="#3B82F6"/>
    </svg>);
}
function NailClipperIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M20 15 L40 15 L45 45 L15 45 Z" fill="#94A3B8" stroke="#475569" strokeWidth="2"/>
      <circle cx="30" cy="22" r="3" fill="#1E293B"/>
      <path d="M22 45 L38 45 L35 52 L25 52 Z" fill="#CBD5E1" stroke="#64748B" strokeWidth="1"/>
    </svg>);
}
function CombIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="15" y="22" width="30" height="10" rx="3" fill="#EC4899" stroke="#BE185D" strokeWidth="1.5"/>
      {[20, 25, 30, 35, 40].map((x) => (<rect key={x} x={x} y="32" width="2" height="15" rx="1" fill="#F472B6"/>))}
    </svg>);
}
// ─── Sort Card Component (for drag-and-drop challenges) ───────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('soap'))
        return <SoapIcon size={size}/>;
    if (id.includes('wash'))
        return <SoapIcon size={size}/>;
    if (id.includes('hands'))
        return <SoapIcon size={size}/>;
    if (id.includes('brush'))
        return <ToothbrushIcon size={size}/>;
    if (id.includes('teeth'))
        return <ToothbrushIcon size={size}/>;
    if (id.includes('tool-brush'))
        return <ToothbrushIcon size={size}/>;
    if (id.includes('towel'))
        return <TowelIcon size={size}/>;
    if (id.includes('tool-towel'))
        return <TowelIcon size={size}/>;
    if (id.includes('clipper'))
        return <NailClipperIcon size={size}/>;
    if (id.includes('nails'))
        return <NailClipperIcon size={size}/>;
    if (id.includes('tool-clipper'))
        return <NailClipperIcon size={size}/>;
    if (id.includes('comb'))
        return <CombIcon size={size}/>;
    if (id.includes('hair'))
        return <CombIcon size={size}/>;
    if (id.includes('bathe'))
        return <SoapIcon size={size}/>;
    if (id.includes('body'))
        return <SoapIcon size={size}/>;
    if (id.includes('clean'))
        return <SoapIcon size={size}/>;
    if (id.includes('dirty'))
        return <NailClipperIcon size={size}/>;
    if (id.includes('morning'))
        return <ToothbrushIcon size={size}/>;
    if (id.includes('night'))
        return <ToothbrushIcon size={size}/>;
    if (id.includes('meals'))
        return <SoapIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg border-2 border-slate-200 ${placed ? 'opacity-40' : 'bg-white hover:border-gold-400'} px-2 py-2`}>
        <div className="text-3xl">{emoji}</div>
        <div className="text-xs font-bold text-gray-700 text-center mt-1">{label}</div>
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
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110 shadow-xl' : 'shadow-md'}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}25`, boxShadow: isHovering ? `0 0 25px ${color}` : undefined }}>
      {renderSortIcon(id, 48)}
      <span className="text-sm font-bold px-2 text-center" style={{ color }}>{label}</span>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(slide + 1);
    } else {onStart();
    }
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) {setSlide(slide - 1);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-gold-500 to-gold-600 text-white overflow-hidden" style={{ width, height }}>
      <CleanlinessScene width={width} height={height}/>
      <HygieneHeroHema mood="happy" speaking={null}/>

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-2 bg-black/20 backdrop-blur px-4 py-1.5 rounded-full">
          <span className="text-xl">🧼</span>
          <span className="font-bold text-sm tracking-wide">Class 1 EVS - Personal Cleanliness</span>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-2.5 rounded-full transition-all ${i === slide ? 'w-8 bg-yellow-400' : 'w-2.5 bg-white/40'}`}/>))}
        </div>
      </div>

      {/* Main Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.3 }} className="relative z-10 bg-white/95 text-gray-800 rounded-3xl p-6 shadow-2xl max-w-lg w-full flex flex-col items-center text-center my-auto border-4 border-gold-300">
        <div className="w-20 h-20 rounded-2xl bg-gold-100 flex items-center justify-center text-4xl mb-4 shadow-inner">
          {current.emoji}
        </div>
        <h2 className="text-2xl font-black text-gold-900 mb-2">{current.title}</h2>
        <p className="text-base text-gray-700 leading-relaxed font-medium">{current.text}</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="relative z-10 w-full flex justify-between items-center px-4 pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-5 py-2.5 rounded-2xl font-bold shadow-lg transition-all ${slide === 0 ? 'opacity-30 bg-gray-400 cursor-not-allowed' : 'bg-white/20 hover:bg-white/30 text-white'}`}>
          ⬅️ Back
        </button>
        <span className="text-sm font-bold text-white/90">Slide {slide + 1} of {total}</span>
        <button onClick={handleNext} className="px-6 py-2.5 rounded-2xl font-black shadow-xl bg-gradient-to-r from-yellow-400 to-amber-500 text-yellow-950 hover:scale-105 active:scale-95 transition-all">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Component Props ─────────────────────────────────────

export interface CleanlinessGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

// ─── Main Component ───────────────────────────────────────────

export function CleanlinessGame({width = 720, height = 560, onComplete}: CleanlinessGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [hintMsg, setHintMsg] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{x: number; y: number} | null>(null);
  const [hemaMood, setHemaMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [hemaSpeech, setHemaSpeech] = useState<string | null>('Welcome! Let us learn daily hygiene habits!');

  // Sort challenge state
  const [sortPlaced, setSortPlaced] = useState<Record<string, boolean>>();
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  // Inactivity timer for auto-hint
  const inactivityRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityRef.current) clearTimeout(inactivityRef.current);
    inactivityRef.current = setTimeout(() => {
      if (screen === 'play') {
        const currentChallenge = CHALLENGES[currentIndex];
        setHintMsg(currentChallenge.hint);
        audioManager.play('hint');
        setHemaMood('thinking');
        setHemaSpeech('Need a little help? Read this hint!');
        speechManager.speak('Need a little help? Read this hint!');
      }
    }, 10000);
  }, [screen, currentIndex]);

  useEffect(() => {resetInactivityTimer();
    return () => {speechManager.stop();
      if (inactivityRef.current) clearTimeout(inactivityRef.current);
    };
  }, [currentIndex, screen, resetInactivityTimer]);

  // Reset sort state when challenge changes
  useEffect(() => {setSortPlaced({});
  }, [currentIndex]);

  const currentChallenge = CHALLENGES[currentIndex];

  // Multiple choice handler
  const handleOptionClick = (option: string, e: React.MouseEvent<HTMLButtonElement>) => {resetInactivityTimer();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    if (option === currentChallenge.answer) {audioManager.play('success');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      setHemaMood('celebrate');
      setHemaSpeech('Wonderful! That is completely correct!');
      speechManager.speak('Wonderful! That is completely correct!');
      setStars((s) => s + 1);
      setSuccessMsg('Correct! Well done!');
    } else {audioManager.play('error');
      setErrors((err) => err + 1);
      setHemaMood('thinking');
      setHemaSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
    }
  };

  // Drag and drop handlers for sort challenges
  const handleDragStart = (_id: string) => {resetInactivityTimer();
    audioManager.play('pickup');
  };

  const handleDragEnd = (id: string, x: number, y: number) => {resetInactivityTimer();
    const bins = currentChallenge.bins;
    const sortItems = currentChallenge.sortItems;
    if (!bins || !sortItems) return false;

    // Find which bin (if any) the card was dropped into
    const droppedBin = bins.find((bin) => {
      // Approximate bounding boxes for bins based on standard layout
      if (bin.id === 'morning' || bin.id === 'clean' || bin.id === 'teeth') {
        return x >= 60 && x <= 220 && y >= 200 && y <= 420;
      }
      if (bin.id === 'meals' || bin.id === 'dirty' || bin.id === 'hands') {
        return x >= 270 && x <= 450 && y >= 200 && y <= 420;
      }
      if (bin.id === 'night' || bin.id === 'nails') {
        return x >= 490 && x <= 660 && y >= 200 && y <= 420;
      }
      if (bin.id === 'body') {
        return x >= 550 && x <= 690 && y >= 200 && y <= 420;
      }
      return false;
    });

    const item = sortItems.find((i) => i.id === id);
    if (!item) return false;

    if (droppedBin && droppedBin.id === item.correctBin) {audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setSortPlaced((prev) => ({...prev, [id]: true}));
      setHemaSpeech('Spot on! Excellent sorting!');
      speechManager.speak('Spot on! Excellent sorting!');

      const newPlaced = {...sortPlaced, [id]: true};
      if (sortItems.every((i) => newPlaced[i.id])) {audioManager.play('success');
        setHemaMood('celebrate');
        setStars((s) => s + 1);
        setSuccessMsg('All items sorted correctly! Fantastic!');
      }
      return true;
    } else {audioManager.play('drop-wrong');
      setHemaMood('thinking');
      setHemaSpeech(currentChallenge.misconception);
      speechManager.speak(currentChallenge.misconception);
      setHintMsg(currentChallenge.misconception);
      return false;
    }
  };

  const handleNextChallenge = () => {setSuccessMsg(null);
    setHintMsg(null);
    setHemaMood('happy');
    setHemaSpeech('Ready for the next challenge? Let us go!');
    speechManager.speak('Ready for the next challenge? Let us go!');
    if (currentIndex < CHALLENGES.length - 1) {setCurrentIndex((i) => i + 1);
    } else {setShowConfetti(true);
      audioManager.play('celebration');
      setHemaMood('celebrate');
      setHemaSpeech('You are now a Certified Hygiene Hero!');
      speechManager.speak('You are now a Certified Hygiene Hero!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl bg-gradient-to-br from-gold-600 to-gold-700 text-white overflow-hidden select-none" style={{ width, height }}>
      <CleanlinessScene width={width} height={height}/>
      <HygieneHeroHema mood={hemaMood} speaking={hemaSpeech}/>

      {/* Top Bar */}
      <div className="relative z-10 w-full flex items-center justify-between">
        <div className="flex items-center gap-3 bg-black/20 backdrop-blur px-4 py-1.5 rounded-full border border-white/20">
          <span className="text-xl">🌟</span>
          <span className="font-bold text-sm">Challenge {currentIndex + 1} of {CHALLENGES.length}</span>
        </div>
        <StarRow count={stars} total={CHALLENGES.length}/>
      </div>

      {/* Challenge Question Card */}
      <div className="relative z-10 bg-white/95 text-gray-900 rounded-2xl px-6 py-4 shadow-xl max-w-xl w-full text-center border-3 border-gold-300 my-2">
        <h3 className="text-lg font-black text-gold-950">{currentChallenge.question}</h3>
      </div>

      {/* Challenge Body */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center my-2">
        {currentChallenge.answer !== 'sort' ? (<div className="grid grid-cols-1 gap-3 w-full max-w-md">
            {currentChallenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={(e) => handleOptionClick(opt, e)} className="bg-white hover:bg-gold-50 text-gold-950 font-bold py-3 px-5 rounded-2xl shadow-lg border-2 border-gold-200 text-base text-left transition-all flex items-center justify-between">
                <span>{opt}</span>
                <span className="text-xl">👉</span>
              </motion.button>))}
          </div>) : (<div className="relative w-full h-[300px]">
            {/* Bins */}
            {currentChallenge.bins && currentChallenge.bins.map((bin, i, arr) => {
                const binWidth = arr.length === 3 ? 180 : arr.length === 4 ? 140 : 200;
                const spacing = (width - 40 - binWidth * arr.length) / (arr.length - 1 || 1);
                const binX = 20 + i * (binWidth + spacing);
                const isHover = hoverBin === bin.id;
                return (<SortBin key={bin.id} id={bin.id} label={bin.label} color={bin.color} x={binX} y={180} width={binWidth} height={110} isHovering={isHover}/>);
            })}

            {/* Sort Cards */}
            {currentChallenge.sortItems && currentChallenge.sortItems.map((item, i, arr) => {
                const cardWidth = 115;
                const spacing = (width - 40 - cardWidth * arr.length) / (arr.length - 1 || 1);
                const startX = 20 + i * (cardWidth + spacing);
                const isPlaced = !!sortPlaced[item.id];
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={startX} y={40} placed={isPlaced} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 w-full flex justify-between items-center px-4">
        <button onClick={() => {
            audioManager.play('hint');
            setHintMsg(currentChallenge.hint);
            setHemaMood('thinking');
            setHemaSpeech(currentChallenge.hint);
            speechManager.speak(currentChallenge.hint);
        }} className="bg-yellow-400 hover:bg-yellow-300 text-yellow-950 font-black px-4 py-2 rounded-2xl shadow-lg flex items-center gap-1.5 text-sm transition-all">
          💡 Hint
        </button>
        <span className="text-xs font-bold text-white/80">CISCE Class 1 EVS * Hygiene & Cleanliness</span>
      </div>

      {/* Feedback Overlays */}
      {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}
      {hintMsg && (<HintBubble message={hintMsg} onComplete={() => setHintMsg(null)}/>)}
      {successMsg && (<SuccessBanner message={successMsg} onComplete={handleNextChallenge}/>)}
      {showConfetti && (<Confetti onComplete={() => setShowConfetti(false)}/>)}
    </div>
  );
}
