'use client';
/**
 * PlantsGame - Learn about plants in our surroundings: parts, types, and observation
 *
 * CISCE Nodes: c1_evs_004 (Plants in my surroundings - common plants and trees)
 * Enrichment: c1_evs_enrichment_part4
 *
 * ELI5: "Plants are living things all around you. A plant has five parts: the root
 *   under the ground, the stem standing up, the green leaves, the pretty flowers,
 *   and the fruits. Trees like mango are tall with thick trunks. Shrubs like rose
 *   are shorter with many thin stems. Herbs like marigold are tiny with soft green stems."
 *
 * Misconceptions:
 *   1. "A small plant is always a herb and a big plant is always a tree."
 *      → Size alone is not enough! Check the stem. A rose is small but woody = shrub.
 *   2. "The root is not a part because we cannot see it."
 *      → The root IS a part, hidden under soil. It holds the plant firmly and takes water.
 *   3. "All leaves are the same shape."
 *      → Mango leaves are long and pointed; neem leaves are small and narrow!
 *
 * Mascot: Gardener Gita (friendly young gardener with a straw hat and watering can)
 * 8 Progressive Challenges: Tree vs Shrub vs Herb → Sort types → Root/Leaves → Sort plant parts
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
        title: 'Welcome to Plants! 🌱',
        text: 'Plants are living things all around us - in gardens, parks, and pots! Every plant has visible parts: stem, leaves, flowers, and fruits, plus roots hiding under the soil!',
        emoji: '🌿',
        bgColor: 'from-green-400 to-emerald-600',
        spoken: 'Plants are living things all around us in gardens and parks!'
    },
    {
        title: 'Five Parts of a Plant 🌳',
        text: '1. Root (under ground, holds plant)\n2. Stem (stands up, carries water)\n3. Leaf (flat green part)\n4. Flower (colourful & sweet)\n5. Fruit (grows from flower)',
        emoji: '🌸',
        bgColor: 'from-emerald-400 to-teal-600',
        spoken: 'Five parts of a plant are root, stem, leaf, flower, and fruit!'
    },
    {
        title: 'Trees, Shrubs, and Herbs 🌳🌿🌾',
        text: '* Trees: Tall with thick woody trunks (Mango, Banyan, Neem)\n* Shrubs: Medium with thin woody stems & thorns (Rose)\n* Herbs: Small with soft green stems (Marigold, Grass)',
        emoji: '🌳',
        bgColor: 'from-lime-400 to-green-600',
        spoken: 'Trees are tall with thick trunks, shrubs are medium with woody stems, and herbs are small with soft stems!'
    },
    {
        title: 'Colours and Shapes 🍃🌼',
        text: 'Leaves and flowers come in many shapes and colours! A mango leaf is long and dark green. A neem leaf is small, narrow, and bitter. A marigold is round and orange!',
        emoji: '🍂',
        bgColor: 'from-amber-400 to-orange-600',
        spoken: 'Leaves and flowers come in many shapes and colours like mango and neem leaves!'
    },
    {
        title: 'Careful Observation 🔍',
        text: 'Always look closely at height and stem before naming a plant type! Size alone is not enough - a rose plant is small, but it has woody stems so it is a shrub!',
        emoji: '🔍',
        bgColor: 'from-teal-400 to-gold-600',
        spoken: 'Always look closely at height and stem before naming a plant type!'
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_type' | 'sort_types' | 'identify_part' | 'sort_parts';
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
        type: 'identify_type',
        question: 'Which plant is very TALL with one thick, hard, woody TRUNK?',
        answer: 'Mango tree',
        options: ['Mango tree', 'Rose plant', 'Marigold herb'],
        hint: 'Think: which of these is huge with a thick brown trunk?',
        misconception: 'A mango tree is tall with a thick woody trunk! Small plants with soft stems are herbs, and medium plants with woody stems are shrubs.',
    },
    {
        type: 'identify_type',
        question: 'Which plant is medium-height with many thin WOODY stems and thorns?',
        answer: 'Rose plant',
        options: ['Banyan tree', 'Rose plant', 'Grass'],
        hint: 'It has small sharp thorns and several thin woody stems rising from the base.',
        misconception: 'The rose plant is a shrub! Even though it is smaller than a tree, it has woody stems and thorns, so it is NOT a herb.',
    },
    {
        type: 'identify_type',
        question: 'Which plant is very small with a soft, green, juicy STEM?',
        answer: 'Marigold herb',
        options: ['Neem tree', 'Rose plant', 'Marigold herb'],
        hint: 'It is small and you can easily pinch its stem between your fingers.',
        misconception: 'The marigold is a herb because its stem is soft and green, not woody! Trees and shrubs have hard woody stems.',
    },
    {
        type: 'sort_types',
        question: 'Drag each plant into the correct group: Tree, Shrub, or Herb!',
        answer: 'sort',
        options: [],
        hint: 'Mango = Tree (tall, thick trunk). Rose = Shrub (medium, woody stems). Marigold = Herb (small, soft green stem).',
        misconception: 'Check both height and stem! Mango is tall with a thick trunk (Tree), Rose has woody stems (Shrub), Marigold has a soft green stem (Herb).',
        sortItems: [
            { id: 'mango', label: 'Mango Tree', emoji: '🌳', correctBin: 'tree' },
            { id: 'rose', label: 'Rose Plant', emoji: '🌹', correctBin: 'shrub' },
            { id: 'marigold', label: 'Marigold', emoji: '🌼', correctBin: 'herb' },
        ],
        bins: [
            { id: 'tree', label: 'Tree 🌳', color: '#15803D' },
            { id: 'shrub', label: 'Shrub 🌿', color: '#B45309' },
            { id: 'herb', label: 'Herb 🌱', color: '#047857' },
        ],
    },
    {
        type: 'identify_part',
        question: 'Which part of the plant grows UNDER the soil and holds it firmly?',
        answer: 'Root',
        options: ['Root', 'Leaf', 'Flower'],
        hint: 'It hides under the dirt and drinks water for the plant!',
        misconception: 'The root IS a real part of the plant, even though it is hidden under the soil! It holds the plant firmly so the wind does not blow it away.',
    },
    {
        type: 'identify_part',
        question: 'Which flat green part of the plant makes food using sunlight?',
        answer: 'Leaf',
        options: ['Root', 'Leaf', 'Fruit'],
        hint: 'It is flat and green, and grows out of the stem in many shapes!',
        misconception: 'Leaves are the flat green parts that grow from the stem. Mango leaves are long and pointed; neem leaves are small and narrow.',
    },
    {
        type: 'sort_parts',
        question: 'Drag each plant part to what it does!',
        answer: 'sort',
        options: [],
        hint: 'Root drinks water, Stem carries water, Leaf makes food!',
        misconception: 'Every plant part has a special job! Root drinks from soil, stem stands upright, leaf makes food, flower makes seeds, and fruit holds seeds!',
        sortItems: [
            { id: 'p-root', label: 'Root (drinks water)', emoji: '🪨', correctBin: 'root-job' },
            { id: 'p-stem', label: 'Stem (carries water)', emoji: '🪵', correctBin: 'stem-job' },
            { id: 'p-leaf', label: 'Leaf (makes food)', emoji: '🍃', correctBin: 'leaf-job' },
        ],
        bins: [
            { id: 'root-job', label: 'Underground 🪨', color: '#854D0E' },
            { id: 'stem-job', label: 'Upright 🪵', color: '#3F6212' },
            { id: 'leaf-job', label: 'Green 🍃', color: '#16A34A' },
        ],
    },
    {
        type: 'identify_type',
        question: 'True or False: A rose plant is a herb because it is small.',
        answer: 'False',
        options: ['True', 'False'],
        hint: 'Think about the rose stem: is it soft and green, or woody with thorns?',
        misconception: 'False! Size alone is not enough. The rose plant has woody stems and thorns, so it is a shrub, not a herb!',
    },
];
// ─── Gardener Gita Mascot ──────────────────────────────────────
function GardenerGita({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto">
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
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="gita-apron" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#4ADE80"/>
              <stop offset="100%" stopColor="#16A34A"/>
            </linearGradient>
            <linearGradient id="gita-hat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FDE047"/>
              <stop offset="100%" stopColor="#CA8A04"/>
            </linearGradient>
          </defs>

          {/* Straw Hat Brim */}
          <ellipse cx="37" cy="22" rx="30" ry="7" fill="url(#gita-hat)" stroke="#854D0E" strokeWidth="1"/>
          {/* Head */}
          <circle cx="37" cy="30" r="14" fill="#FED7AA"/>
          {/* Hat Top */}
          <path d="M25 22 Q37 8 49 22 Z" fill="url(#gita-hat)" stroke="#854D0E" strokeWidth="1"/>
          {/* Hair */}
          <circle cx="27" cy="32" r="4" fill="#451A03"/>
          <circle cx="47" cy="32" r="4" fill="#451A03"/>
          {/* Eyes */}
          <circle cx="32" cy="28" r="2" fill="#1E293B"/>
          <circle cx="42" cy="28" r="2" fill="#1E293B"/>
          {/* Smile */}
          <path d="M33 35 Q37 39 41 35" stroke="#9A3412" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Rosy cheeks */}
          <circle cx="29" cy="32" r="2.5" fill="#FCA5A5" opacity="0.6"/>
          <circle cx="45" cy="32" r="2.5" fill="#FCA5A5" opacity="0.6"/>
          {/* Green Apron & Shirt */}
          <path d="M22 44 L52 44 L55 80 L20 80 Z" fill="url(#gita-apron)" stroke="#166534" strokeWidth="1.5"/>
          {/* Pocket with flower */}
          <rect x="30" y="58" width="15" height="15" fill="#22C55E" rx="2" stroke="#15803D" strokeWidth="1"/>
          <circle cx="37" cy="63" r="3" fill="#EC4899"/>
          <circle cx="37" cy="63" r="1" fill="#FEF08A"/>
          {/* Feet */}
          <ellipse cx="28" cy="84" rx="5" ry="3" fill="#78350F"/>
          <ellipse cx="47" cy="84" rx="5" ry="3" fill="#78350F"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Star Row ─────────────────────────────────────────────────
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
// ─── Garden Scene Background ──────────────────────────────────
function GardenScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #BAE6FD 0%, #E0F2FE 40%, #FEF9C3 70%, #DCFCE7 100%)' }}/>
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#FDE047" opacity="0.9"/>
          <circle cx="27" cy="27" r="11" fill="#FACC15"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27" y1="27" x2={27 + 24 * Math.cos(angle * Math.PI / 180)} y2={27 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-6 left-1/3 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="65" height="28" viewBox="0 0 65 28">
          <ellipse cx="20" cy="16" rx="15" ry="10" fill="white"/>
          <ellipse cx="38" cy="12" rx="18" ry="12" fill="white"/>
          <ellipse cx="48" cy="16" rx="13" ry="8" fill="white"/>
        </svg>
      </motion.div>
      {/* Green Lawn Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #16A34A 60%, #15803D 100%)' }}/>
      {/* Garden Flowers on Lawn */}
      <div className="absolute bottom-4 left-10 flex gap-8 opacity-90">
        <svg width="25" height="35" viewBox="0 0 25 35">
          <line x1="12.5" y1="35" x2="12.5" y2="15" stroke="#15803D" strokeWidth="3"/>
          <circle cx="12.5" cy="10" r="7" fill="#F43F5E"/>
          <circle cx="12.5" cy="10" r="3" fill="#FEF08A"/>
        </svg>
        <svg width="25" height="35" viewBox="0 0 25 35">
          <line x1="12.5" y1="35" x2="12.5" y2="15" stroke="#15803D" strokeWidth="3"/>
          <circle cx="12.5" cy="10" r="7" fill="#F97316"/>
          <circle cx="12.5" cy="10" r="3" fill="#FEF08A"/>
        </svg>
        <svg width="25" height="35" viewBox="0 0 25 35">
          <line x1="12.5" y1="35" x2="12.5" y2="15" stroke="#15803D" strokeWidth="3"/>
          <circle cx="12.5" cy="10" r="7" fill="#A855F7"/>
          <circle cx="12.5" cy="10" r="3" fill="#FEF08A"/>
        </svg>
      </div>
      {/* Butterfly */}
      <motion.div className="absolute top-20 right-28" animate={{ y: [0, -15, 0], x: [0, 10, -10, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="30" height="25" viewBox="0 0 30 25">
          <ellipse cx="15" cy="12.5" rx="2" ry="8" fill="#451A03"/>
          <ellipse cx="9" cy="9" rx="7" ry="5" fill="#EC4899" transform="rotate(-30 9 9)"/>
          <ellipse cx="21" cy="9" rx="7" ry="5" fill="#EC4899" transform="rotate(30 21 9)"/>
          <ellipse cx="9" cy="16" rx="5" ry="4" fill="#F43F5E" transform="rotate(20 9 16)"/>
          <ellipse cx="21" cy="16" rx="5" ry="4" fill="#F43F5E" transform="rotate(-20 21 16)"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Plant Topic SVG Icons ─────────────────────────────────────
function TreeIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <rect x="21" y="32" width="8" height="15" fill="#92400E" rx="1"/>
      <circle cx="25" cy="22" r="14" fill="#15803D"/>
      <circle cx="18" cy="18" r="9" fill="#16A34A"/>
      <circle cx="32" cy="18" r="9" fill="#16A34A"/>
    </svg>);
}
function ShrubIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <line x1="25" y1="45" x2="25" y2="30" stroke="#78350F" strokeWidth="2.5"/>
      <line x1="25" y1="35" x2="14" y2="24" stroke="#78350F" strokeWidth="2"/>
      <line x1="25" y1="35" x2="36" y2="24" stroke="#78350F" strokeWidth="2"/>
      <circle cx="25" cy="22" r="11" fill="#16A34A"/>
      <circle cx="14" cy="22" r="8" fill="#22C55E"/>
      <circle cx="36" cy="22" r="8" fill="#22C55E"/>
      <circle cx="25" cy="16" r="3" fill="#F43F5E"/>
    </svg>);
}
function HerbIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 45 Q23 30, 25 20" stroke="#84CC16" strokeWidth="3" fill="none"/>
      <ellipse cx="18" cy="25" rx="7" ry="4" fill="#22C55E" transform="rotate(-30 18 25)"/>
      <ellipse cx="32" cy="22" rx="7" ry="4" fill="#22C55E" transform="rotate(30 32 22)"/>
      <circle cx="25" cy="14" r="6" fill="#EAB308"/>
    </svg>);
}
// ─── Sort Card Component ───────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('tree'))
        return <TreeIcon size={size}/>;
    if (id.includes('mango'))
        return <TreeIcon size={size}/>;
    if (id.includes('shrub'))
        return <ShrubIcon size={size}/>;
    if (id.includes('rose'))
        return <ShrubIcon size={size}/>;
    if (id.includes('herb'))
        return <HerbIcon size={size}/>;
    if (id.includes('marigold'))
        return <HerbIcon size={size}/>;
    if (id.includes('root'))
        return <HerbIcon size={size}/>;
    if (id.includes('leaf'))
        return <ShrubIcon size={size}/>;
    if (id.includes('stem'))
        return <TreeIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2`} style={{ width: 110, height: 95 }}>
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
      <div className="text-sm font-extrabold" style={{ color }}>{label}</div>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(slide + 1);}
    else {audioManager.play('celebration');
      onStart();
    }
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) setSlide(slide - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 select-none overflow-hidden rounded-2xl shadow-2xl" style={{ width, height, background: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)' }}>
      <GardenScene width={width} height={height}/>
      <GardenerGita mood="happy" speaking={current.spoken}/>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-xl bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌱</span>
          <h1 className="text-lg font-extrabold text-emerald-800">Plants in my Surroundings</h1>
        </div>
        <div className="text-sm font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
          Slide {slide + 1} of {total}
        </div>
      </div>

      {/* Main Slide Card */}
      <div className="relative z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-xl w-full my-auto border-2 border-emerald-200">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${current.bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
          {current.emoji}
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-2 text-center">{current.title}</h2>
        <p className="text-base font-semibold text-gray-700 text-center whitespace-pre-line leading-relaxed px-4">{current.text}</p>
      </div>

      {/* Navigation Buttons & Progress Dots */}
      <div className="relative z-10 flex items-center justify-between w-full max-w-xl px-4 pb-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-5 py-2.5 rounded-xl font-extrabold text-sm shadow-md transition-all ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-emerald-700 hover:bg-emerald-50 active:scale-95'}`}>
          ← Back
        </button>

        <div className="flex gap-2">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-3 rounded-full transition-all ${i === slide ? 'w-8 bg-emerald-600' : 'w-3 bg-emerald-300'}`}/>))}
        </div>

        <button onClick={handleNext} className="px-6 py-2.5 rounded-xl font-extrabold text-sm shadow-lg bg-gradient-to-r from-emerald-500 to-green-600 text-white hover:from-emerald-600 hover:to-green-700 active:scale-95 shadow-emerald-300">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next →'}
        </button>
      </div>
    </div>);
}
// ─── Main Game Component ──────────────────────────────────────
export interface PlantsGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
export function PlantsGame({ width = 720, height = 560, onComplete }: PlantsGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [errors, setErrors] = useState(0);
    const [stars, setStars] = useState(0);
    const [completed, setCompleted] = useState(false);
    // Feedback state
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [hintText, setHintText] = useState<string | null>(null);
    const [sparklePos, setSparklePos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    // Mascot speech & mood
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Let us learn about plants!');
    // Sort challenge state
    const [sortState, setSortState] = useState<{
        [id: string]: boolean;
    }>({});
    const [draggedPos, setDraggedPos] = useState<{
        [id: string]: {
            x: number;
            y: number;
        };
    }>({});
    // Inactivity timer ref
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    const currentChallenge = CHALLENGES[currentIndex];
    // Reset sort items when challenge changes
    useEffect(() => {
        if (currentChallenge.type === 'sort_types' || currentChallenge.type === 'sort_parts') {
            const initialPlaced: {
                [id: string]: boolean;
            } = {};
            const initialPos: {
                [id: string]: {
                    x: number;
                    y: number;
                };
            } = {};
            currentChallenge.sortItems?.forEach((item, index) => {
                initialPlaced[item.id] = false;
                initialPos[item.id] = { x: 50 + index * 130, y: 380 };
            });
            setSortState(initialPlaced);
            setDraggedPos(initialPos);
        }
        setMascotSpeech(currentChallenge.question);
        speechManager.speak(currentChallenge.question);
        setMascotMood('happy');
    }, [currentIndex, currentChallenge]);
    // Inactivity auto-hint timer
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current)
            clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            audioManager.play('hint');
            setHintText(currentChallenge.hint);
            setMascotMood('thinking');
            setMascotSpeech('Need a little clue? Look at the hint!');
            speechManager.speak('Need a little clue? Look at the hint!');
        }, 10000);
    }, [currentChallenge]);
    useEffect(() => {
        resetInactivityTimer();
        return () => {
            speechManager.stop();
            if (inactivityTimerRef.current)
                clearTimeout(inactivityTimerRef.current);
        };
    }, [currentIndex, resetInactivityTimer]);
    // Handle multiple-choice answers
    const handleAnswerSelect = (option: string, event?: React.MouseEvent) => {
        resetInactivityTimer();
        const isCorrect = option === currentChallenge.answer;
        if (isCorrect) {
            audioManager.play('success');
            setScore(prev => prev + 12.5);
            setStars(prev => prev + 1);
            setMascotMood('celebrate');
            setMascotSpeech('Wonderful! That is correct! 🎉');
            speechManager.speak('Wonderful! That is correct! 🎉');
            if (event) {
                setSparklePos({ x: event.clientX, y: event.clientY });
            }
            setSuccessMsg('Brilliant observation! ⭐');
            setShowSuccess(true);
        }
        else {
            audioManager.play('error');
            setErrors(prev => prev + 1);
            setMascotMood('thinking');
            setMascotSpeech(currentChallenge.misconception);
            speechManager.speak(currentChallenge.misconception);
            setHintText(currentChallenge.misconception);
        }
    };
    // Handle sort drag start
    const handleDragStart = (id: string) => {
        audioManager.play('pickup');
        resetInactivityTimer();
    };
    // Handle sort drag end
    const handleDragEnd = (id: string, x: number, y: number): boolean => {
        resetInactivityTimer();
        const item = currentChallenge.sortItems?.find(i => i.id === id);
        if (!item || !currentChallenge.bins)
            return false;
        // Check which bin container (bounding box) the item was dropped into
        let matchedBin: string | null = null;
        const binWidth = 160;
        const binHeight = 120;
        const binY = 320;
        currentChallenge.bins.forEach((bin, index) => {
            const binX = 60 + index * 210;
            if (x >= binX - 20 && x <= binX + binWidth && y >= binY - 20 && y <= binY + binHeight) {
                matchedBin = bin.id;
            }
        });
        if (matchedBin === item.correctBin) {
            audioManager.play('drop-correct');
            setSortState(prev => ({ ...prev, [id]: true }));
            setMascotMood('celebrate');
            setMascotSpeech('Spot on! Great sorting! 🌿');
            speechManager.speak('Spot on! Great sorting! 🌿');
            // Check if all items in sort challenge are placed
            const updatedSortState = { ...sortState, [id]: true };
            const allDone = currentChallenge.sortItems?.every(i => updatedSortState[i.id]);
            if (allDone) {
                audioManager.play('success');
                setScore(prev => prev + 12.5);
                setStars(prev => prev + 1);
                setSuccessMsg('All items sorted perfectly! 🌟');
                setShowSuccess(true);
            }
            return true;
        }
        else {
            audioManager.play('drop-wrong');
            setErrors(prev => prev + 1);
            setMascotMood('thinking');
            setMascotSpeech(currentChallenge.misconception);
            speechManager.speak(currentChallenge.misconception);
            setHintText(currentChallenge.misconception);
            return false;
        }
    };
    // Advance to next challenge after success banner
    const handleSuccessComplete = () => {
        setShowSuccess(false);
        if (currentIndex < CHALLENGES.length - 1) {
            setCurrentIndex(prev => prev + 1);
        }
        else {
            setCompleted(true);
            setShowConfetti(true);
            audioManager.play('celebration');
            setMascotMood('celebrate');
            setMascotSpeech('You are a certified Plant Hero! 🌳🏆');
            speechManager.speak('You are a certified Plant Hero! 🌳🏆');
            const finalScore = Math.max(0, Math.round(100 - errors * 5));
            if (onComplete)
                onComplete(finalScore);
        }
    };
    return (<div className="relative flex flex-col items-center justify-between p-4 select-none overflow-hidden rounded-2xl shadow-2xl" style={{ width, height, background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)' }}>
      {/* Background & Mascot */}
      <GardenScene width={width} height={height}/>
      <GardenerGita mood={mascotMood} speaking={mascotSpeech}/>

      {/* Screen 1: Teaching Intro */}
      {screen === 'teaching' && (<TeachingScreen width={width} height={height} onStart={() => setScreen('play')}/>)}

      {/* Screen 2: Play Screen */}
      {screen === 'play' && !completed && (<>
          {/* Header Bar */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-2xl bg-white/85 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-md border border-emerald-100">
            <div className="flex items-center gap-3">
              <span className="text-xl font-extrabold text-emerald-800">Challenge {currentIndex + 1} / {CHALLENGES.length}</span>
              <div className="w-28 h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-500 transition-all duration-500" style={{ width: `${((currentIndex + 1) / CHALLENGES.length) * 100}%` }}/>
              </div>
            </div>
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>

          {/* Question Box */}
          <div className="relative z-10 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl p-4 shadow-lg max-w-2xl w-full my-3 border border-emerald-200">
            <h2 className="text-lg font-black text-gray-800 text-center leading-snug">{currentChallenge.question}</h2>
          </div>

          {/* Challenge Content: Multiple Choice or Sort */}
          <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-2xl my-2">
            {currentChallenge.type !== 'sort_types' && currentChallenge.type !== 'sort_parts' ? (<div className="grid grid-cols-1 gap-3 w-full max-w-md">
                {currentChallenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={e => handleAnswerSelect(opt, e)} className="flex items-center justify-center gap-3 py-3 px-5 bg-white hover:bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl shadow-md text-base font-extrabold text-gray-800 transition-all cursor-pointer">
                    <span>{opt === 'Mango tree' ? '🌳' : opt === 'Rose plant' ? '🌹' : opt === 'Marigold herb' ? '🌼' : opt === 'Root' ? '🪨' : opt === 'Leaf' ? '🍃' : opt === 'Fruit' ? '🍎' : opt === 'Flower' ? '🌸' : '🌿'}</span>
                    <span>{opt}</span>
                  </motion.button>))}
              </div>) : (<div className="relative w-full h-[300px]">
                {/* Bins */}
                <div className="absolute top-0 left-0 right-0 flex justify-around px-2">
                  {currentChallenge.bins?.map((bin, index) => (<SortBin key={bin.id} label={bin.label} color={bin.color} x={index * 210 + 20} y={10} width={180} height={120} isHovering={false}/>))}
                </div>

                {/* Sort Cards */}
                {currentChallenge.sortItems?.map(item => (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={draggedPos[item.id]?.x || 50} y={draggedPos[item.id]?.y || 380} placed={sortState[item.id]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>))}
              </div>)}
          </div>
        </>)}

      {/* Completion Screen */}
      {completed && (<div className="relative z-20 flex flex-col items-center justify-center bg-white/95 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-lg w-full my-auto border-4 border-emerald-300 text-center">
          <div className="text-6xl mb-3">🏆</div>
          <h2 className="text-3xl font-black text-emerald-800 mb-2">Plant Hero!</h2>
          <p className="text-lg font-bold text-gray-700 mb-6">You have mastered plant parts, trees, shrubs, and herbs!</p>
          <div className="flex justify-center mb-6">
            <StarRow count={stars} total={CHALLENGES.length}/>
          </div>
          <button onClick={() => {
                setCurrentIndex(0);
                setScore(0);
                setErrors(0);
                setStars(0);
                setCompleted(false);
                setShowConfetti(false);
            }} className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-green-600 text-white font-black text-lg rounded-2xl shadow-lg hover:from-emerald-600 hover:to-green-700 active:scale-95 transition-all">
            Play Again 🔄
          </button>
        </div>)}

      {/* Feedback Components */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccess && <SuccessBanner message={successMsg} onComplete={handleSuccessComplete}/>}
      {hintText && <HintBubble message={hintText} onComplete={() => setHintText(null)}/>}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>}
    </div>);
}
