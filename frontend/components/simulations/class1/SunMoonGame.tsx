'use client';
/**
 * SunMoonGame - Learn about the Sun, Day and Night, and Seasons (CISCE Class 1)
 *
 * CISCE Nodes: c1_phy_006 (Sun gives light and heat), c1_phy_007 (Sun in seasons), c1_phy_008 (Day and night)
 * Enrichment: c1_physics_enrichment_part6, part7, part8
 *
 * ELI5: "The Sun is like a giant lamp and heater in the sky! It gives us light to see
 *   and heat to feel warm during the day. At night, the Sun goes away from our sky,
 *   and the moon and stars shine! The Sun is the same all year, but summer is hot
 *   and winter is gentle because of how its rays reach us!"
 *
 * Misconceptions (from enrichment):
 *   1. "The Sun only gives us light, not heat" → "The Sun gives BOTH light and heat!"
 *   2. "The Sun itself becomes colder in winter" → "The Sun is the same! The rays are slanted in winter."
 *   3. "Moon and stars are not present in daytime" → "They are there, but the Sun's light is too bright!"
 *   4. "On a rainy day there is no Sun" → "The Sun is behind clouds like a lamp under a blanket!"
 *   5. "It is safe to look directly at the Sun" → "Never stare at the Sun; it hurts our eyes!"
 *
 * Story: "Help Tara the Young Astronomer explore the daytime sky, the nighttime sky,
 *   and how the Sun gives us light, heat, and seasonal warmth!"
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
        title: 'The Sun Gives Light & Heat! ☀️',
        text: 'The Sun is a huge, bright ball of fire in the sky! It gives us light so we can see everything, and heat so we feel warm on our skin!',
        emoji: '☀️',
        bgColor: 'from-amber-400 to-orange-500',
        spoken: 'The Sun gives us light so we can see everything during the day, and heat so we feel warm on our skin!',
    },
    {
        title: 'Day and Night 🌞🌙',
        text: 'During the day, the Sun is in the sky, making everything bright! At night, the Sun is gone, the sky is dark, and the moon and stars shine!',
        emoji: '🌙',
        bgColor: 'from-blue-500 to-indigo-700',
        spoken: 'During the day, the Sun is in the sky making everything bright. At night, the sky is dark and the moon and stars shine!',
    },
    {
        title: 'Where Are the Stars in the Day? ⭐',
        text: 'The moon and stars are in the sky during the day too! But the Sun is so bright that we cannot see their faint light until night comes!',
        emoji: '⭐',
        bgColor: 'from-sky-400 to-blue-600',
        spoken: 'The moon and stars are in the sky during the day too, but the Sun is so bright that we cannot see them until night!',
    },
    {
        title: 'Sun in Different Seasons! 🌡️❄️',
        text: 'The Sun is the same every day! But in summer it feels very hot like a stove. In winter it feels warm and gentle like a soft heater!',
        emoji: '🌡️',
        bgColor: 'from-red-400 to-amber-600',
        spoken: 'In summer the Sun feels very hot like a stove. In winter it feels warm and gentle like a soft heater!',
    },
    {
        title: 'Rainy Days and Clouds 🌧️',
        text: 'On a rainy day, thick clouds cover the Sun like a blanket over a lamp! They block the sunlight, so the day becomes cooler and darker!',
        emoji: '🌧️',
        bgColor: 'from-cyan-500 to-blue-600',
        spoken: 'On a rainy day, thick clouds cover the Sun like a blanket over a lamp, making the day cooler and darker!',
    },
];
// ─── Types ───────────────────────────���────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_sun_gifts' | 'identify_day_sky' | 'identify_night_sky' | 'sort_sky_objects' | 'identify_season' | 'identify_stars_day' | 'sort_seasons' | 'sort_day_night_acts';
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
        type: 'identify_sun_gifts',
        question: 'What two important things does the Sun give us?',
        answer: 'Light and heat',
        options: ['Light and heat', 'Water and food', 'Wind and rain'],
        hint: 'Think: what lights up our world and makes us feel warm when we stand outside?',
        misconception: 'The Sun gives BOTH light and heat! Light helps us see, and heat makes us feel warm on our skin! Never think it gives only one!',
    },
    {
        type: 'identify_day_sky',
        question: 'What is the main object we see in the sky during the DAY?',
        answer: 'Sun',
        options: ['Sun', 'Moon', 'Stars'],
        hint: 'Look up on a bright morning! What glowing ball gives us light and warmth?',
        misconception: 'The Sun is the main object seen in the daytime sky! The moon and stars shine brightly at night when the Sun goes down.',
    },
    {
        type: 'identify_night_sky',
        question: 'What do we see in the sky at NIGHT?',
        answer: 'Moon and stars',
        options: ['Moon and stars', 'Only the Sun', 'Rainclouds and rainbow'],
        hint: 'When the sun sets and the sky gets dark, what silvery and twinkling objects appear?',
        misconception: 'At night we see the moon and stars! The Sun is not seen in the night sky.',
    },
    {
        type: 'sort_sky_objects',
        question: 'Drag each object to the correct sky bin! Day sky or Night sky?',
        answer: 'sort',
        options: [],
        hint: 'Sun shines in the day! Moon and stars shine at night!',
        misconception: 'The Sun rules the daytime sky, while the moon and stars rule the nighttime sky! Place them in their proper homes!',
        sortItems: [
            { id: 'sun', label: 'Sun', emoji: '☀️', correctBin: 'day' },
            { id: 'cloud', label: 'Cloud', emoji: '☁️', correctBin: 'day' },
            { id: 'moon', label: 'Moon', emoji: '🌙', correctBin: 'night' },
            { id: 'star', label: 'Star', emoji: '⭐', correctBin: 'night' },
        ],
        bins: [
            { id: 'day', label: 'Day Sky ☀️', color: '#0288D1' },
            { id: 'night', label: 'Night Sky 🌙', color: '#311050' },
        ],
    },
    {
        type: 'identify_season',
        question: 'In which season does the Sun feel very hot and sharp, like a hot stove?',
        answer: 'Summer',
        options: ['Summer', 'Winter', 'Rainy season'],
        hint: 'Think of May and June in India when we sweat and drink cool water!',
        misconception: 'Summer is when the Sun feels very hot and sharp! In winter the Sun feels gentle and warm, not burning.',
    },
    {
        type: 'identify_stars_day',
        question: 'Why can we NOT see stars in the daytime sky?',
        answer: 'Sun is too bright',
        options: ['Sun is too bright', 'Stars disappear', 'Clouds hide them'],
        hint: 'The stars are actually still there, but what powerful light hides them?',
        misconception: 'Stars are present in the daytime sky too! But the Sun is so bright that its light overpowers their faint twinkle until night comes.',
    },
    {
        type: 'sort_seasons',
        question: 'Drag each item to the correct season!',
        answer: 'sort',
        options: [],
        hint: 'Ice cream is for hot summer! Sweaters for chilly winter! Umbrellas for rainy monsoon!',
        misconception: 'We use different things in different seasons because of how the Sun feels! Summer needs cool treats, winter needs warm sweaters, monsoon needs umbrellas!',
        sortItems: [
            { id: 'icecream', label: 'Ice Cream', emoji: '🍦', correctBin: 'summer' },
            { id: 'sweater', label: 'Woolen Sweater', emoji: '🧥', correctBin: 'winter' },
            { id: 'umbrella', label: 'Umbrella', emoji: '🌂', correctBin: 'rainy' },
            { id: 'sunglasses', label: 'Sunglasses', emoji: '🕶️', correctBin: 'summer' },
        ],
        bins: [
            { id: 'summer', label: 'Summer ☀️', color: '#D97706' },
            { id: 'winter', label: 'Winter ❄️', color: '#2563EB' },
            { id: 'rainy', label: 'Rainy 🌧️', color: '#059669' },
        ],
    },
    {
        type: 'sort_day_night_acts',
        question: 'Drag each activity! Does it happen in the Day or at Night?',
        answer: 'sort',
        options: [],
        hint: 'We go to school and play in the sun by day! We sleep under the stars at night!',
        misconception: 'Daytime is for waking, playing, and going to school under the Sun! Nighttime is for sleeping under the moon and stars!',
        sortItems: [
            { id: 'school', label: 'Go to school', emoji: '🎒', correctBin: 'day' },
            { id: 'play', label: 'Play outside', emoji: '⚽', correctBin: 'day' },
            { id: 'sleep', label: 'Sleep in bed', emoji: '🛌', correctBin: 'night' },
            { id: 'moonwatch', label: 'See moon & stars', emoji: '🌙', correctBin: 'night' },
        ],
        bins: [
            { id: 'day', label: 'Day Activity ☀️', color: '#0288D1' },
            { id: 'night', label: 'Night Activity 🌙', color: '#311050' },
        ],
    },
];
// ─── Tara Mascot (Young Astronomer) ───────────────────────────
function TaraMascot({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto border-2 border-purple-200">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
                ? { y: [0, -5, 0] }
                : { rotate: [0, 6, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2.5,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          <defs>
            <linearGradient id="dress-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#A855F7"/>
              <stop offset="100%" stopColor="#6B21A8"/>
            </linearGradient>
            <linearGradient id="telescope-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FACC15"/>
              <stop offset="100%" stopColor="#CA8A04"/>
            </linearGradient>
          </defs>
          {/* Hair back */}
          <circle cx="37" cy="32" r="18" fill="#78350F"/>
          {/* Face */}
          <circle cx="37" cy="35" r="14" fill="#FDE68A"/>
          {/* Star hair clip */}
          <path d="M48 24 L50 29 L55 30 L51 34 L52 39 L48 36 L43 39 L44 34 L40 30 L45 29 Z" fill="#FACC15" transform="scale(0.5) translate(60, 20)"/>
          {/* Eyes */}
          <circle cx="32" cy="34" r="2.5" fill="#1F2937"/>
          <circle cx="42" cy="34" r="2.5" fill="#1F2937"/>
          <circle cx="33" cy="33" r="1" fill="white"/>
          <circle cx="43" cy="33" r="1" fill="white"/>
          {/* Cheeks */}
          <circle cx="28" cy="38" r="2" fill="#F43F5E" opacity="0.6"/>
          <circle cx="46" cy="38" r="2" fill="#F43F5E" opacity="0.6"/>
          {/* Smile */}
          <path d="M33 40 Q37 44 41 40" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Purple Dress */}
          <path d="M25 50 L50 50 L58 78 L17 78 Z" fill="url(#dress-grad)"/>
          {/* Collar */}
          <path d="M30 50 L37 55 L44 50 Z" fill="white"/>
          {/* Legs & Shoes */}
          <rect x="27" y="78" width="5" height="9" fill="#FDE68A"/>
          <rect x="43" y="78" width="5" height="9" fill="#FDE68A"/>
          <ellipse cx="29" cy="87" rx="4" ry="2" fill="#4B5563"/>
          <ellipse cx="45" cy="87" rx="4" ry="2" fill="#4B5563"/>
          {/* Mini Telescope held in hand */}
          <rect x="12" y="45" width="18" height="6" rx="2" fill="url(#telescope-grad)" transform="rotate(-25 12 45)"/>
          <rect x="8" y="42" width="6" height="8" rx="1" fill="#CA8A04" transform="rotate(-25 8 42)"/>
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
// ─── Sky Scene Background ─────────────────────────────────────
function SkyScene({ width, height, isNight }: {
    width: number;
    height: number;
    isNight: boolean;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Background Gradient */}
      <div className="absolute inset-0 transition-all duration-1000" style={{
            background: isNight
                ? 'linear-gradient(180deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)'
                : 'linear-gradient(180deg, #38BDF8 0%, #7DD3FC 40%, #BAE6FD 70%, #E0F2FE 100%)',
        }}/>
      {/* Sun / Moon */}
      {isNight ? (<motion.div className="absolute top-6 right-16" animate={{ rotate: [0, 5, 0] }} transition={{ duration: 6, repeat: Infinity }}>
          <svg width="60" height="60" viewBox="0 0 60 60">
            <defs>
              <radialGradient id="moon-glow" cx="0.5" cy="0.5" r="0.5">
                <stop offset="0%" stopColor="#FEF08A" stopOpacity="1"/>
                <stop offset="100%" stopColor="#FEF08A" stopOpacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="30" cy="30" r="28" fill="url(#moon-glow)"/>
            <path d="M30 10 A20 20 0 0 1 45 42 A18 18 0 1 0 30 10 Z" fill="#FEF08A"/>
          </svg>
        </motion.div>) : (<motion.div className="absolute top-6 left-12" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
          <svg width="65" height="65" viewBox="0 0 65 65">
            <circle cx="32.5" cy="32.5" r="18" fill="#FACC15"/>
            <circle cx="32.5" cy="32.5" r="13" fill="#EAB308"/>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="32.5" y1="32.5" x2={32.5 + 26 * Math.cos((angle * Math.PI) / 180)} y2={32.5 + 26 * Math.sin((angle * Math.PI) / 180)} stroke="#FACC15" strokeWidth="3" strokeLinecap="round"/>))}
          </svg>
        </motion.div>)}
      {/* Stars (visible at night or faint in day) */}
      <div className="absolute inset-0">
        {[
            { top: '15%', left: '20%' },
            { top: '25%', left: '70%' },
            { top: '10%', left: '85%' },
            { top: '35%', left: '40%' },
            { top: '20%', left: '50%' },
        ].map((pos, idx) => (<motion.div key={idx} className="absolute" style={pos} animate={{ opacity: isNight ? [0.4, 1, 0.4] : [0.1, 0.3, 0.1], scale: [0.8, 1.2, 0.8] }} transition={{ duration: 2 + idx, repeat: Infinity }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isNight ? '#FEF08A' : '#FFFFFF'}>
              <path d="M12 2L15 9L22 10L17 15L18 22L12 19L6 22L7 15L2 10L9 9Z"/>
            </svg>
          </motion.div>))}
      </div>
      {/* Clouds */}
      <motion.div className="absolute top-12 left-1/3 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white"/>
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white"/>
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white"/>
        </svg>
      </motion.div>
      {/* Hills / Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-20" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #16A34A 100%)' }}/>
      {/* Tree on hill */}
      <div className="absolute bottom-12 left-10">
        <svg width="40" height="50" viewBox="0 0 40 50">
          <rect x="17" y="30" width="6" height="20" fill="#92400E"/>
          <circle cx="20" cy="22" r="14" fill="#15803D"/>
          <circle cx="15" cy="16" r="10" fill="#22C55E"/>
          <circle cx="25" cy="16" r="10" fill="#22C55E"/>
        </svg>
      </div>
    </div>);
}
// ─── Custom SVG Icon Components ───────────────────────────────
function SunIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <circle cx="25" cy="25" r="12" fill="#FACC15"/>
      <circle cx="25" cy="25" r="8" fill="#EAB308"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="25" y1="25" x2={25 + 20 * Math.cos((angle * Math.PI) / 180)} y2={25 + 20 * Math.sin((angle * Math.PI) / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round"/>))}
    </svg>);
}
function MoonIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5 A20 20 0 0 1 40 40 A18 18 0 1 0 25 5 Z" fill="#FEF08A"/>
      <circle cx="20" cy="22" r="3" fill="#FDE047" opacity="0.6"/>
      <circle cx="30" cy="32" r="2" fill="#FDE047" opacity="0.6"/>
    </svg>);
}
function StarIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <path d="M25 5L30 18L44 20L33 30L36 44L25 37L14 44L17 30L6 20L20 18Z" fill="#FACC15" stroke="#EAB308" strokeWidth="1.5"/>
    </svg>);
}
function SnowflakeIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 50 50">
      <g stroke="#38BDF8" strokeWidth="3" strokeLinecap="round">
        <line x1="25" y1="5" x2="25" y2="45"/>
        <line x1="5" y1="25" x2="45" y2="25"/>
        <line x1="11" y1="11" x2="39" y2="39"/>
        <line x1="11" y1="39" x2="39" y2="11"/>
      </g>
    </svg>);
}
// ��── Sort Card & Bin Components ───────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('sun'))
        return <SunIcon size={size}/>;
    if (id.includes('sunny'))
        return <SunIcon size={size}/>;
    if (id.includes('summer'))
        return <SunIcon size={size}/>;
    if (id.includes('sunglasses'))
        return <SunIcon size={size}/>;
    if (id.includes('day'))
        return <SunIcon size={size}/>;
    if (id.includes('moon'))
        return <MoonIcon size={size}/>;
    if (id.includes('night'))
        return <MoonIcon size={size}/>;
    if (id.includes('moonwatch'))
        return <MoonIcon size={size}/>;
    if (id.includes('star'))
        return <StarIcon size={size}/>;
    if (id.includes('winter'))
        return <SnowflakeIcon size={size}/>;
    if (id.includes('snow'))
        return <SnowflakeIcon size={size}/>;
    if (id.includes('icecream'))
        return <SnowflakeIcon size={size}/>;
    if (id.includes('rainy'))
        return <SnowflakeIcon size={size}/>;
    if (id.includes('umbrella'))
        return <SnowflakeIcon size={size}/>;
    if (id.includes('sweater'))
        return <SnowflakeIcon size={size}/>;
    if (id.includes('cloud'))
        return <StarIcon size={size}/>;
    if (id.includes('school'))
        return <SunIcon size={size}/>;
    if (id.includes('sleep'))
        return <MoonIcon size={size}/>;
    if (id.includes('play'))
        return <SunIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-2xl shadow-lg border-2 ${placed ? 'opacity-40 border-gray-300' : 'bg-white border-purple-200'} px-3 py-2`} style={{ width: 110, height: 95 }}>
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
    return (<div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110 shadow-2xl' : 'shadow-md'}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}25`, boxShadow: isHovering ? `0 0 25px ${color}` : 'none' }}>
      <div className="text-base font-extrabold text-center px-1" style={{ color }}>{label}</div>
    </div>);
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  useEffect(() => {audioManager.play('tap')}, [slide, current.spoken]);

  const handleNext = () => {audioManager.play('tap');
    if (slide < total - 1) {setSlide(slide + 1);}
    else {onStart();}
  };

  const handlePrev = () => {audioManager.play('tap');
    if (slide > 0) {setSlide(slide - 1);}
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center p-2 select-none overflow-hidden" style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
      <SkyScene width={width} height={height} isNight={slide === 1 || slide === 2}/>

      <div className="z-10 w-full flex justify-between items-center bg-white/80 backdrop-blur-md px-3 py-2 rounded-xl shadow-md">
        <div className="flex items-center gap-1">
          <span className="text-lg">☀️</span>
          <h1 className="text-sm font-extrabold text-purple-900">Sun & Sky Explorer</h1>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: total }).map((_, i) => (<div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'w-6 bg-purple-600' : 'w-2 bg-purple-200'}`}/>))}
        </div>
      </div>

      <div className="z-10 flex flex-col items-center w-full bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-2xl border-2 border-purple-200 mt-2">
        <motion.div key={slide} initial={{ scale: 0.8, opacity: 0, y: 15 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} className="flex flex-col items-center text-center">
          <div className="text-5xl mb-2 p-2 rounded-2xl bg-amber-50 shadow-inner">{current.emoji}</div>
          <h2 className="text-lg font-black text-purple-900 mb-2">{current.title}</h2>
          <p className="text-sm font-medium text-gray-700 leading-relaxed">{current.text}</p>
        </motion.div>
      </div>

      <div className="z-10 w-full flex justify-between items-center mt-2">
        <button onClick={handlePrev} disabled={slide === 0} className={`px-4 py-2 rounded-xl font-bold text-sm shadow-lg transition-all ${slide === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-white text-purple-700 hover:bg-purple-50 active:scale-95'}`}>
          ← Back
        </button>

        <button onClick={() => {
            audioManager.play('tap');
        }} className="px-3 py-2 rounded-xl font-bold text-sm text-white shadow-lg bg-indigo-500 hover:bg-indigo-600 active:scale-95 flex items-center gap-1">
          🔊 Listen
        </button>

        <button onClick={handleNext} className="px-5 py-2 rounded-xl font-extrabold text-white text-sm shadow-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 active:scale-95 flex items-center gap-1">
          {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➔'}
        </button>
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface SunMoonGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function SunMoonGame({width = 720, height = 560, onComplete}: SunMoonGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentIdx, setCurrentIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [speechText, setSpeechText] = useState<string | null>('Hi! I am Tara! Let us explore the Sun, sky, and seasons together!');
  const [showHint, setShowHint] = useState(false);
  const [completed, setCompleted] = useState(false);

  // Sort state for drag challenges
  const [sortPositions, setSortPositions] = useState<Record<string, {
        x: number;
        y: number;
        placed: boolean;
    }>>({});
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  const challenge = CHALLENGES[currentIdx];

  // Initialize sort positions when challenge changes
  useEffect(() => {
    if (challenge.type.startsWith('sort') && challenge.sortItems) {
      const initial: Record<string, {x: number; y: number; placed: boolean}> = {};
      challenge.sortItems.forEach((item, index) => {initial[item.id] = {
            x: 40 + (index % 3) * 130,
            y: 180 + Math.floor(index / 3) * 110,
            placed: false,
        }});
      setSortPositions(initial);
    }
    setSelectedOption(null);
    setIsCorrect(null);
    setShowFeedback(false);
    setShowHint(false);
    setMascotMood('happy');
    setSpeechText(challenge.question);
    speechManager.speak(challenge.question);
  }, [currentIdx, challenge]);

  // Inactivity timer for auto-hint
  const resetInactivity = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {setShowHint(true);
      setMascotMood('thinking');
      audioManager.play('hint');
      setSpeechText(challenge.hint);
      speechManager.speak(challenge.hint);
    }, 10000);
  }, [challenge.hint]);

  useEffect(() => {resetInactivity();
    return () => {speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [currentIdx, resetInactivity]);

  // Handle multiple-choice answers
  const handleAnswerSelect = (option: string) => {audioManager.play('tap');
    setSelectedOption(option);
    resetInactivity();

    const correct = option === challenge.answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {audioManager.play('success');
      setStars(s => s + 1);
      setMascotMood('celebrate');
      const praise = 'Wonderful! You got it right!';
      setSpeechText(praise);
      speechManager.speak(praise);

      setTimeout(() => {
        if (currentIdx < CHALLENGES.length - 1) {setCurrentIdx(c => c + 1);}
        else {setCompleted(true);
          audioManager.play('celebration');
          const finalScore = Math.max(0, 100 - errors * 5);
          if (onComplete) onComplete(finalScore);
        }
      }, 2500);
    } else {audioManager.play('error');
      setErrors(e => e + 1);
      setMascotMood('thinking');
      setSpeechText(challenge.misconception);
      speechManager.speak(challenge.misconception);
    }
  };

  // Drag-and-drop handling for sort challenges
  const handleDragStart = (_id: string) => {audioManager.play('pickup');
    resetInactivity();
  };

  const handleDragEnd = (id: string, dropX: number, dropY: number): boolean => {
    if (!challenge.bins || !challenge.sortItems) return false;

    // Check bins coordinates
    // Bin 1: left 120, top 240, width 250, height 180
    // Bin 2: left 420, top 240, width 250, height 180
    // Bin 3 (if 3 bins): left 270, top 430... Let's use simple geometric hit-test for bins
    const binsCount = challenge.bins.length;
    const bw = binsCount === 3 ? 200 : 280;
    const bh = 130;
    const binSpacing = 20;
    const totalBinsWidth = binsCount * bw + (binsCount - 1) * binSpacing;
    const binStartX = (width - totalBinsWidth) / 2;
    const binY = 10;
    let targetBinId: string | null = null;

    challenge.bins.forEach((bin, idx) => {
      const bx = binStartX + idx * (bw + binSpacing);

      if (dropX >= bx && dropX <= bx + bw && dropY >= binY && dropY <= binY + bh) {targetBinId = bin.id;}
    });

    const item = challenge.sortItems.find(i => i.id === id);
    if (item && targetBinId && targetBinId === item.correctBin) {audioManager.play('drop-correct');
      setSortPositions(prev => ({...prev,
            [id]: {x: dropX, y: dropY, placed: true},
      }));

      // Check if all items placed
      const updated = {...sortPositions, [id]: {x: dropX, y: dropY, placed: true}};
      const allPlaced = challenge.sortItems.every(i => updated[i.id]?.placed);

      if (allPlaced) {audioManager.play('success');
        setStars(s => s + 1);
        setMascotMood('celebrate');
        setShowFeedback(true);
        setIsCorrect(true);
        const praise = 'Fantastic sorting! All items are in the right place!';
        setSpeechText(praise);
        speechManager.speak(praise);

        setTimeout(() => {
          if (currentIdx < CHALLENGES.length - 1) {setCurrentIdx(c => c + 1);}
          else {setCompleted(true);
            audioManager.play('celebration');
            const finalScore = Math.max(0, 100 - errors * 5);
            if (onComplete) onComplete(finalScore);
          }
        }, 2500);
      }
      return true;
    } else {audioManager.play('drop-wrong');
      setErrors(e => e + 1);
      setMascotMood('thinking');
      setSpeechText(challenge.misconception);
      speechManager.speak(challenge.misconception);
      return false;
    }
  };

  const handleHint = () => {setShowHint(true);
    audioManager.play('hint');
    setMascotMood('thinking');
    setSpeechText(challenge.hint);
    speechManager.speak(challenge.hint);
    resetInactivity();
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
  }

  const isNightTheme = currentIdx === 2 || (challenge.type === 'sort_sky_objects' && false);

  return (
    <div className="relative w-full h-full flex flex-col items-center p-2 select-none overflow-hidden" style={{ width, height }}>
      <SkyScene width={width} height={height} isNight={isNightTheme}/>

      {/* Top Header Bar */}
      <div className="z-10 w-full flex justify-between items-center bg-white/90 backdrop-blur-md px-4 py-2 rounded-2xl shadow-lg border-2 border-purple-200">
        <div className="flex items-center gap-3">
          <span className="text-2xl font-black text-purple-900">Q {currentIdx + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleHint} className="px-4 py-2 bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold rounded-xl shadow-md active:scale-95 flex items-center gap-1.5 transition-all">
            💡 Hint
          </button>
        </div>
      </div>

      {/* Tara Mascot */}
      <TaraMascot mood={mascotMood} speaking={speechText}/>

      {/* Main Challenge Area */}
      <div className="z-10 flex flex-col items-center w-full px-2 mt-1">
        <motion.div key={currentIdx} initial={{ scale: 0.9, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-2xl border-2 border-purple-200 w-full flex flex-col items-center">
          <h2 className="text-base font-black text-purple-900 text-center mb-3 leading-snug">
            {challenge.question}
          </h2>

          {/* Multiple Choice Challenge */}
          {!challenge.sortItems && (<div className="grid grid-cols-1 gap-2 w-full">
              {challenge.options.map((opt, idx) => {
                const isSelected = selectedOption === opt;
                const isTheAnswer = opt === challenge.answer;
                let btnStyle = 'bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-200 text-purple-900 hover:bg-purple-100';
                if (showFeedback) {
                    if (isTheAnswer)
                        btnStyle = 'bg-green-500 border-green-600 text-white shadow-lg scale-105';
                    else if (isSelected && !isTheAnswer)
                        btnStyle = 'bg-red-500 border-red-600 text-white opacity-60';
                    else
                        btnStyle = 'bg-gray-100 border-gray-200 text-gray-400 opacity-50';
                }
                return (<motion.button key={idx} whileHover={{ scale: showFeedback ? 1 : 1.03 }} whileTap={{ scale: showFeedback ? 1 : 0.97 }} onClick={() => !showFeedback && handleAnswerSelect(opt)} className={`p-3 rounded-xl border-2 font-bold text-base shadow-md transition-all flex flex-col items-center justify-center gap-1 ${btnStyle}`}>
                    <span>{opt}</span>
                  </motion.button>);
            })}
            </div>)}

          {/* Sort / Drag Challenge */}
          {challenge.sortItems && challenge.bins && (<div className="relative w-full h-[280px]">
              {/* Bins */}
              {challenge.bins.map((bin, idx) => {
                const binsCount = challenge.bins!.length;
                const bw = binsCount === 3 ? 200 : 280;
                const bh = 130;
                const binSpacing = 20;
                const totalBinsWidth = binsCount * bw + (binsCount - 1) * binSpacing;
                const binStartX = (width - totalBinsWidth) / 2;
                const bx = binStartX + idx * (bw + binSpacing);
                const by = 10;
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={bx} y={by} width={bw} height={bh} isHovering={hoverBin === bin.id}/>);
            })}

              {/* Draggable Cards */}
              {challenge.sortItems.map((item) => {
                const pos = sortPositions[item.id] || { x: 50, y: 200, placed: false };
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={pos.x} y={pos.y} placed={pos.placed} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
            </div>)}
        </motion.div>
      </div>

      {/* Hint Bubble & Feedback */}
      {showHint && !showFeedback && (<HintBubble message={`💡 ${challenge.hint}`} onComplete={() => setShowHint(false)}/>)}

      {showFeedback && isCorrect && <SuccessBanner message="Fantastic! You are a Star Astronomer! ⭐" onComplete={() => { }}/>}
      {completed && <Confetti onComplete={() => { }}/>}
      {showFeedback && isCorrect && <SparkleBurst x={width / 2} y={height / 2} onComplete={() => { }}/>}

      {/* Bottom Footer Navigation */}
      <div className="z-10 w-full flex justify-between items-center px-2 mt-1">
        <button onClick={() => {
            audioManager.play('tap');
            setScreen('teaching');
        }} className="px-3 py-1.5 rounded-lg font-bold text-sm text-purple-700 bg-white/80 hover:bg-white shadow-md active:scale-95">
          📖 Review
        </button>
        <span className="text-xs font-bold text-purple-900 bg-white/80 px-3 py-1.5 rounded-lg shadow-md">
          Errors: {errors}
        </span>
      </div>
    </div>
  );
}
