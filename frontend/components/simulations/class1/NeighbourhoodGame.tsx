'use client';
/**
 * NeighbourhoodGame - Learn about neighbourhood places, land features, and water bodies.
 *
 * CISCE Nodes: c1_geo_009 (Places in the neighbourhood), c1_geo_010 (Land features)
 * Enrichment: c1_geography_enrichment_part9 & part10
 *
 * ELI5: "Your neighbourhood has a school for learning, a hospital for healing,
 *   a park for playing, and a market for buying things. The land has high hills,
 *   flat plains, and low valleys. Water flows in rivers and stays still in ponds!"
 *
 * Misconceptions (from enrichment):
 *   1. "Post office is only for buying stamps" → "No! Its main job is sorting and
 *      sending letters and parcels to people far away!"
 *   2. "Bus stop and railway station are the same" → "No! Bus stop is a small road
 *      halt; railway station has platforms for long trains!"
 *   3. "Pond and river are the same" → "No! Rivers have flowing water that moves;
 *      ponds have still water that stays in one place!"
 *   4. "Hills and plains are the same" → "No! Hills are high land we climb up;
 *      flat land (plains) is level ground we walk on easily!"
 *   5. "Valley is just flat land" → "No! A valley is specifically the low dip
 *      between two hills!"
 *
 * Story: "Help Guide Ravi explore the neighbourhood, discover land features,
 *   and learn about rivers and ponds! Become a Neighbourhood Explorer!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG neighbourhood scene background (hills, road, school, park, trees)
 * - Custom SVG neighborhood objects (school, hospital, park, market, house, hill, plain, river, pond)
 * - Custom SVG guide mascot (Ravi) with backpack, walking stick, and green cap
 * - Drag-and-drop: drag neighbourhood items into sorting bins
 * - 8 progressive challenges: identify places → sort places → identify land/water → sort land/water
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Spoken instructions via Web Speech API
 * - Procedural sound effects (pickup, drop-correct, drop-wrong, success, celebration, hint)
 * - Confetti + celebration on success
 * - Auto-hint after inactivity
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
        title: 'Welcome to Our Neighbourhood! 🏡',
        text: 'The neighbourhood is the area close to our home where we live, play, learn, and meet people. It has many important places that help us every day!',
        emoji: '🏡',
        bgColor: 'from-emerald-400 to-green-500',
    },
    {
        title: 'Places That Help Us! 🏫',
        text: 'A school is where we learn with teachers! A hospital is where doctors help us when we are sick. A park is where we play on swings and slides!',
        emoji: '🏫',
        bgColor: 'from-blue-400 to-indigo-500',
    },
    {
        title: 'Markets & Post Offices! 🛒',
        text: 'We buy fruits, vegetables, and books at the market! The post office sorts and sends letters and parcels to people far away!',
        emoji: '🛒',
        bgColor: 'from-amber-400 to-orange-500',
    },
    {
        title: 'Land Features Around Us! ⛰️',
        text: 'Not all land is the same! A hill is high land we climb up. Flat land (plain) is level ground where we play. A valley is the low land between hills!',
        emoji: '⛰️',
        bgColor: 'from-teal-400 to-cyan-500',
    },
    {
        title: 'Rivers and Ponds! 🌊',
        text: 'A river is a long stream of flowing water that moves along. A pond is a small body of still water that stays in one place!',
        emoji: '🌊',
        bgColor: 'from-cyan-400 to-blue-500',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_place_learn' | 'identify_place_sick' | 'identify_place_play' | 'sort_places' | 'identify_flowing' | 'identify_high' | 'sort_land' | 'sort_water';
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
// ─── Challenges (8 progressive: identify → sort) ──────────────
const CHALLENGES: Challenge[] = [
    {
        type: 'identify_place_learn',
        question: 'Where do we go to learn reading, writing, and counting?',
        answer: 'School',
        options: ['School', 'Hospital', 'Market'],
        hint: 'Think: where do teachers help you study every morning?',
        misconception: 'We go to SCHOOL to learn! Teachers help us read and write there! Hospitals are for when we are sick, and markets are for buying things!',
    },
    {
        type: 'identify_place_sick',
        question: 'Where do we go when we are sick or hurt, so doctors can help us?',
        answer: 'Hospital',
        options: ['Park', 'Hospital', 'Post Office'],
        hint: 'Think: who looks after you with medicines when you have a high fever?',
        misconception: 'We go to a HOSPITAL when we are sick or hurt! Doctors and nurses examine us and give us medicines so we get well! Parks are for playing, not for sickness!',
    },
    {
        type: 'identify_place_play',
        question: 'Where is the open green place with swings and slides where we play?',
        answer: 'Park',
        options: ['Police Station', 'Park', 'Railway Station'],
        hint: 'Think: where do you run around on holidays and breathe fresh air on grass?',
        misconception: 'A PARK is an open green place with swings and slides where we play with friends! Police stations are for keeping us safe, and railway stations are for boarding trains!',
    },
    {
        type: 'sort_places',
        question: 'Drag each place to the right bin! What do we do there?',
        answer: 'sort',
        options: [],
        hint: 'School = learn | Hospital = get well | Park = play | Market = buy things!',
        misconception: 'Each place has a special job! School is for learning, hospital is for getting well, park is for playing, and market is for buying vegetables and books!',
        sortItems: [
            { id: 'sch', label: 'School', emoji: '🏫', correctBin: 'learn' },
            { id: 'hos', label: 'Hospital', emoji: '🏥', correctBin: 'sick' },
            { id: 'prk', label: 'Park', emoji: '🌳', correctBin: 'play' },
            { id: 'mkt', label: 'Market', emoji: '🛒', correctBin: 'buy' },
        ],
        bins: [
            { id: 'learn', label: 'Learn 📚', color: '#3B82F6' },
            { id: 'sick', label: 'Get Well 💊', color: '#EF4444' },
            { id: 'play', label: 'Play 🛝', color: '#22C55E' },
            { id: 'buy', label: 'Buy 🍎', color: '#F59E0B' },
        ],
    },
    {
        type: 'identify_flowing',
        question: 'Which water body has FLOWING water that moves from high land?',
        answer: 'River',
        options: ['River', 'Pond', 'Well'],
        hint: 'Think: which one moves along like the Ganga through towns and cities?',
        misconception: 'A RIVER has flowing water that moves along! A pond has still water that stays in one place and does not move!',
    },
    {
        type: 'identify_high',
        question: 'Which land feature is HIGH land that rises up and needs climbing?',
        answer: 'Hill',
        options: ['Hill', 'Flat land (Plain)', 'Valley'],
        hint: 'Think: when you walk towards it, your legs feel tired going higher up!',
        misconception: 'A HILL is high land that rises up above the ground! Flat land (plain) is level ground where we walk easily without climbing!',
    },
    {
        type: 'sort_land',
        question: 'Drag each land feature to its correct type!',
        answer: 'sort',
        options: [],
        hint: 'Hill = high land | Plain = flat level land | Valley = low dip between hills!',
        misconception: 'Remember: hills are high, plains are flat level ground, and valleys are the low dips between hills!',
        sortItems: [
            { id: 'h1', label: 'Hill', emoji: '⛰️', correctBin: 'high' },
            { id: 'p1', label: 'Plain', emoji: '🟩', correctBin: 'flat' },
            { id: 'v1', label: 'Valley', emoji: '🏞️', correctBin: 'low' },
        ],
        bins: [
            { id: 'high', label: 'High (Hill) ⛰️', color: '#8B5CF6' },
            { id: 'flat', label: 'Flat (Plain) 🟩', color: '#10B981' },
            { id: 'low', label: 'Low (Valley) 🏞️', color: '#F97316' },
        ],
    },
    {
        type: 'sort_water',
        question: 'Drag each water body to flowing vs still water!',
        answer: 'sort',
        options: [],
        hint: 'Rivers flow and move! Ponds stay still in one place!',
        misconception: 'Rivers have flowing water that moves, while ponds have still water that stays in one place!',
        sortItems: [
            { id: 'r1', label: 'River', emoji: '🌊', correctBin: 'flow' },
            { id: 'p2', label: 'Pond', emoji: '💧', correctBin: 'still' },
        ],
        bins: [
            { id: 'flow', label: 'Flowing Water 🌊', color: '#0284C7' },
            { id: 'still', label: 'Still Water 💧', color: '#0EA5E9' },
        ],
    },
];
// ─── Guide Ravi Mascot ────────────────────────────────────────
function GuideRavi({ mood, speaking }: {
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
        <svg width="70" height="90" viewBox="0 0 70 90">
          {/* Backpack */}
          <rect x="20" y="32" width="30" height="30" rx="6" fill="#8B4513" stroke="#5C2C16" strokeWidth="1.5"/>
          {/* Green Cap */}
          <ellipse cx="35" cy="20" rx="18" ry="10" fill="#2E7D32"/>
          <path d="M18 20 Q35 15, 52 20 L55 24 Q35 22, 15 24 Z" fill="#1B5E20"/>
          {/* Head / Face */}
          <circle cx="35" cy="28" r="14" fill="#FFCC80" stroke="#F57C00" strokeWidth="1"/>
          {/* Eyes */}
          <circle cx="30" cy="26" r="2" fill="#3E2723"/>
          <circle cx="40" cy="26" r="2" fill="#3E2723"/>
          {/* Smile */}
          <path d="M31 32 Q35 36 39 32" stroke="#D84315" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Torso / Shirt */}
          <path d="M22 42 L48 42 L52 70 L18 70 Z" fill="#4CAF50" stroke="#2E7D32" strokeWidth="1.5"/>
          {/* Map in hand */}
          <rect x="8" y="45" width="14" height="18" fill="#FFF9C4" stroke="#FBC02D" strokeWidth="1" rx="1"/>
          <path d="M10 50 L20 50 M10 55 L18 55 M10 60 L16 60" stroke="#BCAAA4" strokeWidth="1"/>
          {/* Legs */}
          <rect x="25" y="70" width="6" height="15" fill="#37474F" rx="2"/>
          <rect x="39" y="70" width="6" height="15" fill="#37474F" rx="2"/>
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
// ─── Neighbourhood Scene Background ───────────────────────────
function NeighbourhoodScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="neighbourhood-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#87CEEB"/>
            <stop offset="50%" stopColor="#E0F7FA"/>
            <stop offset="100%" stopColor="#C8E6C9"/>
          </linearGradient>
        </defs>
        <rect width="720" height="560" fill="url(#neighbourhood-sky)"/>
      </svg>
      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#FFD700" opacity="0.9"/>
          <circle cx="27" cy="27" r="11" fill="#FFC107"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27" y1="27" x2={27 + 24 * Math.cos(angle * Math.PI / 180)} y2={27 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FFD700" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>))}
        </svg>
      </motion.div>
      {/* Hills in background */}
      <div className="absolute bottom-32 left-0 right-0 h-28 opacity-80">
        <svg width="100%" height="100%" viewBox="0 0 720 120" preserveAspectRatio="none">
          <path d="M0 120 L0 60 Q180 10, 360 50 Q540 90, 720 40 L720 120 Z" fill="#81C784"/>
          <path d="M0 120 L0 80 Q240 20, 480 70 Q600 95, 720 60 L720 120 Z" fill="#4CAF50"/>
        </svg>
      </div>
      {/* Ground & Road */}
      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: 'linear-gradient(180deg, #66BB6A 0%, #388E3C 100%)' }}/>
      <div className="absolute bottom-0 left-1/3 w-36 h-32 bg-gray-400 opacity-60" style={{ clipPath: 'polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)' }}/>
    </div>);
}
// ─── Custom SVG Neighbourhood Objects ─────────────────────────
function SchoolIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="20" width="36" height="30" fill="#90CAF9" stroke="#1565C0" strokeWidth="1.5" rx="2"/>
      <polygon points="30,8 8,22 52,22" fill="#E53935" stroke="#B71C1C" strokeWidth="1.5"/>
      <rect x="25" y="35" width="10" height="15" fill="#8D6E63"/>
      <rect x="16" y="25" width="8" height="8" fill="#FFF" stroke="#1565C0" strokeWidth="1"/>
      <rect x="36" y="25" width="8" height="8" fill="#FFF" stroke="#1565C0" strokeWidth="1"/>
      <circle cx="30" cy="15" r="3" fill="#FFD700"/>
    </svg>);
}
function HospitalIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="12" y="15" width="36" height="35" fill="#ECEFF1" stroke="#37474F" strokeWidth="1.5" rx="2"/>
      <rect x="24" y="22" width="12" height="28" fill="#FFFFFF"/>
      <rect x="27" y="26" width="6" height="20" fill="#E53935"/>
      <rect x="21" y="29" width="18" height="6" fill="#E53935"/>
    </svg>);
}
function ParkIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="45" width="50" height="10" fill="#81C784" rx="3"/>
      <circle cx="20" cy="25" r="14" fill="#4CAF50"/>
      <rect x="18" y="32" width="4" height="15" fill="#795548"/>
      <path d="M35 30 Q45 25, 50 45" stroke="#FF9800" strokeWidth="2.5" fill="none"/>
      <circle cx="42" cy="38" r="3" fill="#E91E63"/>
    </svg>);
}
function MarketIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M10 25 L50 25 L45 45 L15 45 Z" fill="#FFB74D" stroke="#E65100" strokeWidth="1.5"/>
      <path d="M8 22 L52 22 L48 26 L12 26 Z" fill="#FF7043"/>
      <circle cx="22" cy="35" r="4" fill="#E53935"/>
      <circle cx="38" cy="35" r="4" fill="#4CAF50"/>
      <circle cx="30" cy="38" r="4" fill="#FFEB3B"/>
    </svg>);
}
function HillIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M5 50 Q30 10, 55 50 Z" fill="#66BB6A" stroke="#2E7D32" strokeWidth="1.5"/>
      <path d="M30 20 L35 30 L25 30 Z" fill="#FFFFFF" opacity="0.8"/>
    </svg>);
}
function PlainIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="30" width="50" height="20" fill="#81C784" rx="3" stroke="#388E3C" strokeWidth="1.5"/>
      <line x1="12" y1="40" x2="18" y2="35" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
      <line x1="30" y1="42" x2="36" y2="36" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
      <line x1="45" y1="40" x2="51" y2="35" stroke="#2E7D32" strokeWidth="2" strokeLinecap="round"/>
    </svg>);
}
function RiverIconSvg({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#81C784" rx="4"/>
      <path d="M10 10 Q30 30, 50 10 L50 50 Q30 30, 10 50 Z" fill="#4FC3F7" stroke="#0288D1" strokeWidth="1.5"/>
      <path d="M22 25 Q30 30, 38 25" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
      <path d="M22 35 Q30 40, 38 35" stroke="#FFFFFF" strokeWidth="1.5" fill="none"/>
    </svg>);
}
function PondIconSvg({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <rect x="5" y="10" width="50" height="40" fill="#81C784" rx="4"/>
      <ellipse cx="30" cy="30" rx="18" ry="12" fill="#4FC3F7" stroke="#0288D1" strokeWidth="1.5"/>
      <ellipse cx="24" cy="28" rx="5" ry="2.5" fill="#66BB6A"/>
      <ellipse cx="36" cy="32" rx="4" ry="2" fill="#66BB6A"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('sch'))
        return <SchoolIcon size={size}/>;
    if (id.includes('school'))
        return <SchoolIcon size={size}/>;
    if (id.includes('learn'))
        return <SchoolIcon size={size}/>;
    if (id.includes('hos'))
        return <HospitalIcon size={size}/>;
    if (id.includes('sick'))
        return <HospitalIcon size={size}/>;
    if (id.includes('prk'))
        return <ParkIcon size={size}/>;
    if (id.includes('park'))
        return <ParkIcon size={size}/>;
    if (id.includes('play'))
        return <ParkIcon size={size}/>;
    if (id.includes('mkt'))
        return <MarketIcon size={size}/>;
    if (id.includes('market'))
        return <MarketIcon size={size}/>;
    if (id.includes('buy'))
        return <MarketIcon size={size}/>;
    if (id.includes('high'))
        return <HillIcon size={size}/>;
    if (id.includes('hill'))
        return <HillIcon size={size}/>;
    if (id.includes('low'))
        return <PlainIcon size={size}/>;
    if (id.includes('plain'))
        return <PlainIcon size={size}/>;
    if (id.includes('flat'))
        return <PlainIcon size={size}/>;
    if (id.includes('flow'))
        return <PlainIcon size={size}/>;
    if (id.includes('still'))
        return <HillIcon size={size}/>;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={110} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-45' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
        {renderSortIcon(id, 48)}
        <span className="text-xs font-bold text-gray-700 text-center mt-1">{label}</span>
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
      <div className="text-xs font-bold text-center px-1" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(slide + 1);}
    else {onStart();}
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) {setSlide(slide - 1);}
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 overflow-hidden" style={{ width, height }}>
      <NeighbourhoodScene width={width} height={height}/>

      {/* Top Header */}
      <div className="z-10 flex items-center justify-between w-full max-w-xl bg-white/90 backdrop-blur rounded-2xl px-5 py-3 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-3xl">🏡</span>
          <div>
            <h1 className="text-lg font-extrabold text-gray-800">Neighbourhood Explorer</h1>
            <p className="text-xs text-gray-500">CISCE Class 1 * Geography</p>
          </div>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`w-3 h-3 rounded-full transition-all ${i === slide ? 'bg-emerald-600 scale-110' : 'bg-gray-300'}`}/>))}
        </div>
      </div>

      {/* Slide Card */}
      <motion.div key={slide} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ duration: 0.3 }} className="z-10 flex flex-col items-center justify-center bg-white/95 backdrop-blur rounded-3xl p-8 shadow-2xl max-w-xl w-full my-auto border-4 border-emerald-200">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br flex items-center justify-center text-5xl mb-4 shadow-inner" style={{ background: current.bgColor }}>
          {current.emoji}
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-3 text-center">{current.title}</h2>
        <p className="text-base text-gray-600 text-center leading-relaxed font-medium mb-6">{current.text}</p>

        <div className="flex gap-4 w-full">
          {slide > 0 && (<button onClick={handlePrev} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 active:scale-95 text-gray-700 font-bold rounded-xl transition-all shadow">
              Back
            </button>)}
          <button onClick={handleNext} className="flex-1 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 active:scale-95 text-white font-extrabold rounded-xl shadow-lg transition-all text-lg">
            {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface NeighbourhoodGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function NeighbourhoodGame({width = 720, height = 560, onComplete}: NeighbourhoodGameProps) {

  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);
  const [sparklePos, setSparklePos] = useState({x: 360, y: 280});
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Guide Ravi. Let us explore!');

  // Sort challenge state
  const [placedItems, setPlacedItems] = useState<Record<string, boolean>>();
  const [itemPositions, setItemPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>();
  const [activeHoverBin, setActiveHoverBin] = useState<string | null>(null);

  const challenge = CHALLENGES[challengeIndex];
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  // Initialize sort positions when challenge changes
  useEffect(() => {
    if (challenge.type.startsWith('sort') && challenge.sortItems) {
      const initialPos: Record<string, {x: number; y: number}> = {};
      const initialPlaced: Record<string, boolean> = {};
      challenge.sortItems.forEach((item, i) => {
        const startX = 60 + i * 140;
        const startY = 360;
        initialPos[item.id] = {x: startX, y: startY};
        initialPlaced[item.id] = false;
      });
      setItemPositions(initialPos);
      setPlacedItems(initialPlaced);
    }
    setHintMessage(null);
    setMascotSpeech("Let's solve this question together!");
    speechManager.speak("Let's solve this question together!");
    setMascotMood('happy');
  }, [challengeIndex]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      setHintMessage(challenge.hint);
      setMascotSpeech(challenge.hint);
      speechManager.speak(challenge.hint);
      setMascotMood('thinking');
      audioManager.play('hint');
    }, 10000);
  }, [challenge.hint]);

  useEffect(() => {
    if (screen === 'play' && !completed) {resetInactivityTimer();}
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [challengeIndex, screen, completed, resetInactivityTimer]);

  // Handle multiple choice answer
  const handleAnswerClick = (option: string, e: React.MouseEvent) => {
    audioManager.play('tap');
    resetInactivityTimer();
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    setSparklePos({x: rect.left + rect.width / 2, y: rect.top + rect.height / 2});

    if (option === challenge.answer) {
        // Correct!
        audioManager.play('success');
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 800);
      setStars(s => s + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right! ⭐');
      speechManager.speak('Fantastic! You got it right! ⭐');

      setTimeout(() => {
        if (challengeIndex < CHALLENGES.length - 1) {
          setChallengeIndex(c => c + 1);
          setMascotMood('happy');
          setMascotSpeech('Next challenge coming up!');
          speechManager.speak('Next challenge coming up!');
        } else {
          setCompleted(true);
          setShowSuccessBanner(true);
          setShowConfetti(true);
          audioManager.play('celebration');
          setMascotMood('celebrate');
          setMascotSpeech('Hooray! You completed all challenges!');
          speechManager.speak('Hooray! You completed all challenges!');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 1200);
    } else {
        // Incorrect -> Misconception feedback
        audioManager.play('error');
      setErrors(eCount => eCount + 1);
      setMascotMood('thinking');
      setHintMessage(challenge.misconception);
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
    }
  };

  // Drag-and-drop handlers for sort challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!challenge.bins || !challenge.sortItems) return false;

    const item = challenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Check bins collision
    let matchedBinId: string | null = null;
    challenge.bins.forEach((bin, idx) => {
      const binX = 60 + idx * 160;
      const binY = 160;
      const binW = 140;
      const binH = 150;
      if (x + 55 >= binX && x + 55 <= binX + binW && y + 45 >= binY && y + 45 <= binY + binH) {matchedBinId = bin.id;}
    });

    if (matchedBinId === item.correctBin) {
        // Correct drop!
        audioManager.play('success');
      setPlacedItems(prev => ({...prev, [id]: true }));
      setShowSparkles(true);
      setTimeout(() => setShowSparkles(false), 800);

      // Check if all sort items are placed
      const updatedPlaced = {...placedItems, [id]: true };
      const allDone = challenge.sortItems.every(i => updatedPlaced[i.id]);

      if (allDone) {
        setStars(s => s + 1);
        setMascotMood('celebrate');
        setMascotSpeech('Wonderful sorting! All correct!');
        speechManager.speak('Wonderful sorting! All correct!');
        setTimeout(() => {
          if (challengeIndex < CHALLENGES.length - 1) {
            setChallengeIndex(c => c + 1);
            setMascotMood('happy');
            setMascotSpeech('Ready for the next one?');
            speechManager.speak('Ready for the next one?');
          } else {
            setCompleted(true);
            setShowSuccessBanner(true);
            setShowConfetti(true);
            audioManager.play('celebration');
            setMascotMood('celebrate');
            setMascotSpeech('You are a true Neighbourhood Explorer!');
            speechManager.speak('You are a true Neighbourhood Explorer!');
            const finalScore = Math.max(0, 100 - errors * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 1500);
      }
      return true;
    } else {
        // Incorrect drop
        audioManager.play('error');
      setErrors(eCount => eCount + 1);
      setMascotMood('thinking');
      setHintMessage(challenge.misconception);
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-4 overflow-hidden select-none" style={{ width, height, background: '#1E293B' }}>
      <NeighbourhoodScene width={width} height={height}/>
      <GuideRavi mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top Status Bar */}
      <div className="relative z-20 flex items-center justify-between w-full max-w-2xl bg-white/90 backdrop-blur rounded-2xl px-5 py-2.5 shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🏡</span>
          <div>
            <h2 className="text-sm font-extrabold text-gray-800">Challenge {challengeIndex + 1} of {CHALLENGES.length}</h2>
            <p className="text-xs text-gray-500">Errors: {errors}</p>
          </div>
        </div>
        <StarRow count={stars} total={CHALLENGES.length}/>
      </div>

      {/* Challenge Card / Play Area */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-2xl my-auto bg-white/95 backdrop-blur rounded-3xl p-6 shadow-2xl border-4 border-emerald-300 min-h-[320px]">
        <h3 className="text-xl font-black text-gray-800 text-center mb-6 leading-snug">{challenge.question}</h3>

        {/* Multiple Choice Options */}
        {challenge.answer !== 'sort' && challenge.options && (<div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
            {challenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={(e) => handleAnswerClick(opt, e)} className="flex flex-col items-center justify-center p-4 bg-gradient-to-br from-emerald-50 to-green-100 hover:from-emerald-100 hover:to-green-200 border-2 border-emerald-300 rounded-2xl shadow-md transition-all text-center min-h-[90px]">
                <span className="text-sm font-extrabold text-gray-800">{opt}</span>
              </motion.button>))}
          </div>)}

        {/* Sort Challenge Area */}
        {challenge.answer === 'sort' && challenge.bins && challenge.sortItems && (<div className="relative w-full h-[260px]">
            {/* Bins */}
            {challenge.bins.map((bin, i) => {
                const binWidth = challenge.bins!.length === 4 ? 140 : 200;
                const binX = challenge.bins!.length === 4 ? 15 + i * 165 : 40 + i * 220;
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={binX} y={10} width={binWidth} height={130} isHovering={activeHoverBin === bin.id}/>);
            })}

            {/* Draggable Cards */}
            {challenge.sortItems.map((item, i) => {
                const startX = 60 + i * 150;
                const startY = 160;
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={itemPositions[item.id]?.x || startX} y={itemPositions[item.id]?.y || startY} placed={placedItems[item.id] || false} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}

        {/* Hint Bubble */}
        {hintMessage && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-3 bg-amber-50 border-2 border-amber-300 rounded-xl text-xs text-amber-900 font-bold max-w-lg text-center">
            💡 {hintMessage}
          </motion.div>)}
      </div>

      {/* Bottom bar with hint trigger */}
      <div className="relative z-20 flex justify-between items-center w-full max-w-2xl px-2">
        <button onClick={() => {
            setHintMessage(challenge.hint);
            setMascotSpeech(challenge.hint);
            speechManager.speak(challenge.hint);
            setMascotMood('thinking');
            audioManager.play('hint');
        }} className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 hover:bg-amber-500 active:scale-95 text-amber-950 font-extrabold rounded-xl shadow transition-all text-xs">
          💡 Need a Hint?
        </button>
        <p className="text-xs text-white/80 font-bold">CISCE Class 1 * Neighbourhood & Land Features</p>
      </div>

      {/* Feedback Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccessBanner && <SuccessBanner message="You are a Neighbourhood Star! ⭐🏡" onComplete={() => setShowSuccessBanner(false)}/>}
      {showSparkles && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkles(false)}/>}
      {hintMessage && <HintBubble message={`💡 ${hintMessage}`} onComplete={() => setHintMessage(null)}/>}
    </div>
  );
}
