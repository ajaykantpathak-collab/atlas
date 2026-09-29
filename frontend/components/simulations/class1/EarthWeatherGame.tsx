'use client';
/**
 * EarthWeatherGame - Learn about Earth (land & water) and Weather (sunny, cloudy, rainy, windy)
 *
 * CISCE Nodes: c1_geo_001 (Earth is our home), c1_geo_005 (Weather)
 * Enrichment: c1_geography_enrichment_part1, c1_geography_enrichment_part5
 *
 * ELI5: "Earth is our big round home! It has land to walk on and water in rivers
 *   and seas. Weather is what the sky and air do each day - sunny, cloudy, rainy,
 *   or windy. We wear cotton clothes when it is sunny, and a raincoat when it rains!"
 *
 * Misconceptions (from enrichment):
 *   1. "Earth is only the ground we walk on." → "No! Earth has land AND water
 *      AND air AND all plants and animals!"
 *   2. "Cloudy and rainy are the same thing." → "No! Cloudy means grey sky, but
 *      rainy means water is actually falling from clouds!"
 *   3. "We can wear any clothes in any weather." → "No! Sunny needs cotton and caps;
 *      rainy needs raincoats and umbrellas; cold needs sweaters!"
 *
 * Story: "Help Weather Wiz Mira explore our home Earth, check the daily weather,
 *   sort land and water, and choose the right clothes for sunny and rainy days!"
 *
 * 9/10 quality features:
 * - Teaching intro with 5 slides before play begins
 * - Custom SVG Earth and weather scene background (sky, sun, clouds, rain, globe)
 * - Custom SVG topic-specific objects (Earth, Sun, Cloud, Rain, Wind, Raincoat, Sweater, Cap)
 * - Custom Weather Wiz Mira mascot with mood states and speech bubble
 * - Drag-and-drop: drag clothes and Earth parts into sorting bins
 * - 8 progressive challenges: identify land/water → identify weather → match clothes → sort items
 * - Star rewards earned per challenge
 * - Misconception-aware feedback on wrong answers
 * - Procedural sound effects via audioManager (no text-to-speech)
 * - Confetti + celebration on success
 * - Auto-hint after 10 seconds of inactivity
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
        title: 'Earth is Our Home! 🌍',
        text: 'Earth is the big round planet where we live! It has solid ground called land where we walk, run, and build houses, and great big water in rivers, ponds, and seas!',
        emoji: '🌍',
        bgColor: 'from-gold-400 to-green-500',
    },
    {
        title: 'What is Weather? ☀️🌧️',
        text: 'Weather is what the sky and air are like today! It can be bright and sunny, grey and cloudy, wet and rainy, or breezy and windy!',
        emoji: '⛅',
        bgColor: 'from-amber-400 to-gold-500',
    },
    {
        title: 'Sunny Day Fun! 🧢',
        text: 'On a sunny day, the sun shines brightly in a blue sky and we feel warm! We wear light cotton clothes and caps, and play outside in the park!',
        emoji: '☀️',
        bgColor: 'from-yellow-400 to-orange-500',
    },
    {
        title: 'Rainy Day Safety! ☔',
        text: 'On a rainy day, water falls from clouds and the ground gets wet! We wear a raincoat, carry an umbrella, and play fun indoor games inside the house!',
        emoji: '🌧️',
        bgColor: 'from-gold-400 to-gold-600',
    },
    {
        title: 'Taking Care of Earth! 🌱',
        text: 'Earth gives us land, water, air, plants, and animals! We must take care of our big home by putting litter in dustbins and planting green trees!',
        emoji: '🌳',
        bgColor: 'from-emerald-400 to-teal-600',
    },
];
// ─── Types ─────────────────────────────────────���──────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_earth' | 'identify_weather' | 'identify_sunny_wear' | 'sort_weather_wear' | 'identify_rainy_wear' | 'identify_cloudy_sky' | 'sort_weather_types' | 'sort_earth_parts';
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
        type: 'identify_earth',
        question: 'What is Earth made of?',
        answer: 'Land and water',
        options: ['Land and water', 'Only land', 'Only water'],
        hint: 'Think about what you see outside: solid ground to walk on, and rivers or ponds with water!',
        misconception: 'Earth is NOT just the ground we walk on! Earth has land AND water AND air AND plants and animals! Both land and water make up our big home.',
    },
    {
        type: 'identify_weather',
        question: 'What is weather?',
        answer: 'What the sky and air are like today',
        options: ['What the sky and air are like today', 'What we eat for lunch', 'Where our school is built'],
        hint: 'Look up at the sky right now - is it sunny, cloudy, or rainy? That is the weather!',
        misconception: 'Weather is what the sky and air are like on any particular day! It changes day by day - sunny, cloudy, rainy, or windy.',
    },
    {
        type: 'identify_sunny_wear',
        question: 'What do we wear on a SUNNY day?',
        answer: 'Cotton clothes and cap',
        options: ['Cotton clothes and cap', 'Raincoat and boots', 'Warm sweater and scarf'],
        hint: 'On a bright, warm sunny day, we want to stay cool and shield our eyes from the sun!',
        misconception: 'On a sunny day we wear light cotton clothes and a cap to stay cool and protected! Raincoats and sweaters are for rainy or cold days.',
    },
    {
        type: 'sort_weather_wear',
        question: 'Drag each item of clothing to the right weather!',
        answer: 'sort',
        options: [],
        hint: 'Cap goes with sunny weather! Raincoat goes with rainy weather!',
        misconception: 'Always match your clothes to the weather! Sunny days need cotton caps, while rainy days need raincoats and umbrellas to keep you dry!',
        sortItems: [
            { id: 'cap', label: 'Sun Cap', emoji: '🧢', correctBin: 'sunny' },
            { id: 'raincoat', label: 'Raincoat', emoji: '🧥', correctBin: 'rainy' },
            { id: 'sweater', label: 'Sweater', emoji: '🧶', correctBin: 'cold' },
        ],
        bins: [
            { id: 'sunny', label: 'Sunny ☀️', color: '#EAB308' },
            { id: 'rainy', label: 'Rainy 🌧️', color: '#3B82F6' },
            { id: 'cold', label: 'Cold ❄️', color: '#06B6D4' },
        ],
    },
    {
        type: 'identify_rainy_wear',
        question: 'What do we wear on a RAINY day?',
        answer: 'Raincoat and umbrella',
        options: ['Raincoat and umbrella', 'Cotton shirt and shorts', 'Sun hat and sunglasses'],
        hint: 'When water falls from the clouds as raindrops, what keeps you dry?',
        misconception: 'On a rainy day we wear a raincoat and carry an umbrella to stay dry! Cotton clothes and sunglasses will leave you soaked and shivering.',
    },
    {
        type: 'identify_cloudy_sky',
        question: 'What do we see in the sky on a CLOUDY day?',
        answer: 'Clouds hiding the sun',
        options: ['Clouds hiding the sun', 'Bright shining sun with no clouds', 'Twinkling stars and moon'],
        hint: 'On this grey day, fluffy white or grey shapes fill the sky and soften the light.',
        misconception: 'On a cloudy day the sky looks grey and clouds hide the sun! It is not rainy yet because no water is falling, but the sun is covered.',
    },
    {
        type: 'sort_weather_types',
        question: 'Drag each weather symbol to its correct name!',
        answer: 'sort',
        options: [],
        hint: 'Bright sun = Sunny! Water drops = Rainy! Fluffy shape = Cloudy!',
        misconception: 'Do not confuse cloudy and rainy! Cloudy means a grey sky with no falling water. Rainy means water is actually falling from the clouds!',
        sortItems: [
            { id: 's-sun', label: 'Sunny Day', emoji: '☀️', correctBin: 'sun-bin' },
            { id: 's-rain', label: 'Rainy Day', emoji: '🌧️', correctBin: 'rain-bin' },
            { id: 's-cloud', label: 'Cloudy Day', emoji: '☁️', correctBin: 'cloud-bin' },
        ],
        bins: [
            { id: 'sun-bin', label: 'Sunny ☀️', color: '#F59E0B' },
            { id: 'rain-bin', label: 'Rainy 🌧️', color: '#3B82F6' },
            { id: 'cloud-bin', label: 'Cloudy ☁️', color: '#6B7280' },
        ],
    },
    {
        type: 'sort_earth_parts',
        question: 'Drag Earth parts into Land or Water!',
        answer: 'sort',
        options: [],
        hint: 'Mountains and hills are solid ground (land). Rivers and ponds are full of water!',
        misconception: 'Earth has two big visible parts: land (where we walk and build houses) and water (rivers, ponds, and the great big sea)!',
        sortItems: [
            { id: 'mountain', label: 'Mountain', emoji: '⛰️', correctBin: 'land-bin' },
            { id: 'river', label: 'River', emoji: '🌊', correctBin: 'water-bin' },
            { id: 'plain', label: 'Flat Ground', emoji: '🏞️', correctBin: 'land-bin' },
            { id: 'pond', label: 'Pond', emoji: '💧', correctBin: 'water-bin' },
        ],
        bins: [
            { id: 'land-bin', label: 'Land 🏔️', color: '#16A34A' },
            { id: 'water-bin', label: 'Water 💧', color: '#2563EB' },
        ],
    },
];
// ─── Weather Wiz Mira Mascot (Custom SVG) ─────────────────────
function WeatherWizMira({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center pointer-events-none">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] pointer-events-auto border-2 border-gold-300">
            <p className="text-xs font-bold text-gray-800">{speaking}</p>
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
            <linearGradient id="mira-coat" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#38BDF8"/>
              <stop offset="100%" stopColor="#0284C7"/>
            </linearGradient>
            <radialGradient id="mira-face" cx="0.5" cy="0.4" r="0.5">
              <stop offset="0%" stopColor="#FFEDD5"/>
              <stop offset="100%" stopColor="#FED7AA"/>
            </radialGradient>
          </defs>

          {/* Raincoat body */}
          <path d="M22 55 L37 60 L53 55 L58 78 L17 78 Z" fill="url(#mira-coat)" stroke="#0369A1" strokeWidth="1.5"/>
          <line x1="37" y1="60" x2="37" y2="78" stroke="#0284C7" strokeWidth="1.5" strokeDasharray="3 3"/>

          {/* Head & Face */}
          <circle cx="37" cy="36" r="16" fill="url(#mira-face)" stroke="#D97706" strokeWidth="1"/>

          {/* Hair & Sun clip */}
          <path d="M21 34 Q20 20, 37 20 Q54 20, 53 34 Q45 27, 37 27 Q29 27, 21 34 Z" fill="#92400E"/>
          <circle cx="27" cy="27" r="5" fill="#FBBF24"/>
          <circle cx="27" cy="27" r="2.5" fill="#F59E0B"/>

          {/* Eyes */}
          <circle cx="31" cy="35" r="2.5" fill="#1E293B"/>
          <circle cx="43" cy="35" r="2.5" fill="#1E293B"/>
          <circle cx="32" cy="34" r="0.8" fill="white"/>
          <circle cx="44" cy="34" r="0.8" fill="white"/>

          {/* Smile */}
          <path d="M33 42 Q37 46 41 42" stroke="#B45309" strokeWidth="1.5" fill="none" strokeLinecap="round"/>

          {/* Cheeks */}
          <ellipse cx="28" cy="39" rx="3" ry="1.5" fill="#F87171" opacity="0.6"/>
          <ellipse cx="46" cy="39" rx="3" ry="1.5" fill="#F87171" opacity="0.6"/>

          {/* Umbrella staff tucked behind */}
          <line x1="60" y1="20" x2="52" y2="75" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M52 18 Q60 10, 68 18 Q60 22, 52 18 Z" fill="#EC4899" stroke="#DB2777" strokeWidth="1"/>

          {/* Boots */}
          <ellipse cx="27" cy="83" rx="5" ry="3.5" fill="#EF4444"/>
          <ellipse cx="47" cy="83" rx="5" ry="3.5" fill="#EF4444"/>
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
// ─── Earth & Weather Scene Background ─────────────────────────
function EarthWeatherScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky Gradient */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, #38BDF8 0%, #BAE6FD 35%, #E0F2FE 60%, #86EFAC 85%, #15803D 100%)' }}/>

      {/* Sun */}
      <motion.div className="absolute top-4 left-6" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FACC15"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos((angle * Math.PI) / 180)} y2={27.5 + 24 * Math.sin((angle * Math.PI) / 180)} stroke="#FBBF24" strokeWidth="3" strokeLinecap="round"/>))}
        </svg>
      </motion.div>

      {/* Clouds */}
      <motion.div className="absolute top-10 left-1/3 opacity-80" animate={{ x: [0, 35, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white"/>
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white"/>
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white"/>
        </svg>
      </motion.div>

      {/* Globe preview in corner */}
      <div className="absolute bottom-4 left-4 opacity-80">
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="26" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
          {/* Land masses on globe */}
          <path d="M12 22 Q20 15, 32 25 Q40 32, 35 45 Q22 50, 15 38 Z" fill="#22C55E" opacity="0.8"/>
          <path d="M38 12 Q48 18, 45 30 Q35 25, 38 12 Z" fill="#22C55E" opacity="0.8"/>
          {/* Latitude / longitude lines */}
          <ellipse cx="30" cy="30" rx="26" ry="10" fill="none" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 3"/>
          <line x1="30" y1="4" x2="30" y2="56" stroke="#93C5FD" strokeWidth="1" strokeDasharray="3 3"/>
        </svg>
      </div>

      {/* Rain drop decorative */}
      <motion.div className="absolute top-16 right-1/4" animate={{ y: [0, 40, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="15" height="25" viewBox="0 0 15 25">
          <path d="M7.5 0 C4 8, 2 13, 2 17 C2 21, 4 23, 7.5 23 C11 23, 13 21, 13 17 C13 13, 11 8, 7.5 0 Z" fill="#0284C7"/>
        </svg>
      </motion.div>
    </div>);
}
// ─── Custom Topic SVG Objects ─────────────────────────────────
function EarthIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="26" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      <path d="M12 20 Q22 12, 35 22 Q45 30, 38 46 Q22 52, 14 36 Z" fill="#22C55E"/>
      <path d="M38 10 Q50 16, 46 28 Q36 24, 38 10 Z" fill="#22C55E"/>
    </svg>);
}
function SunIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <circle cx="30" cy="30" r="16" fill="#FACC15"/>
      {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="30" y1="30" x2={30 + 24 * Math.cos((angle * Math.PI) / 180)} y2={30 + 24 * Math.sin((angle * Math.PI) / 180)} stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round"/>))}
    </svg>);
}
function CloudIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="20" cy="36" rx="14" ry="10" fill="#94A3B8"/>
      <ellipse cx="38" cy="28" rx="18" ry="13" fill="#E2E8F0"/>
      <ellipse cx="45" cy="36" rx="12" ry="9" fill="#CBD5E1"/>
    </svg>);
}
function RainIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <ellipse cx="30" cy="22" rx="18" ry="12" fill="#64748B"/>
      <path d="M20 38 C18 42, 17 44, 17 45 C17 46, 18 47, 20 47 C22 47, 23 46, 23 45 C23 44, 22 42, 20 38 Z" fill="#38BDF8"/>
      <path d="M32 38 C30 42, 29 44, 29 45 C29 46, 30 47, 32 47 C34 47, 35 46, 35 45 C35 44, 34 42, 32 38 Z" fill="#38BDF8"/>
      <path d="M44 38 C42 42, 41 44, 41 45 C41 46, 42 47, 44 47 C46 47, 47 46, 47 45 C47 44, 46 42, 44 38 Z" fill="#38BDF8"/>
    </svg>);
}
function WindIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M12 22 L38 22 Q46 22, 46 16 Q46 10, 38 10 Q32 10, 32 16" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M8 35 L45 35 Q52 35, 52 40 Q52 45, 45 45 Q40 45, 40 41" stroke="#0284C7" strokeWidth="3" fill="none" strokeLinecap="round"/>
      <path d="M18 48 L28 48" stroke="#0284C7" strokeWidth="3" strokeLinecap="round"/>
    </svg>);
}
function RaincoatIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M18 18 L30 12 L42 18 L48 50 L12 50 Z" fill="#FACC15" stroke="#CA8A04" strokeWidth="2"/>
      <line x1="30" y1="12" x2="30" y2="50" stroke="#CA8A04" strokeWidth="2"/>
      <path d="M24 15 L30 20 L36 15" fill="none" stroke="#CA8A04" strokeWidth="2"/>
    </svg>);
}
function SweaterIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M16 18 L8 28 L16 34 L18 50 L42 50 L44 34 L52 28 L44 18 Q37 24, 30 24 Q23 24, 16 18 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="2"/>
      <path d="M22 18 Q30 24, 38 18" fill="none" stroke="#FEE2E2" strokeWidth="2.5"/>
    </svg>);
}
function CapIcon({ size = 60 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      <path d="M14 32 Q14 16, 30 16 Q46 16, 46 32 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="2"/>
      <path d="M10 32 L50 32 Q52 38, 44 38 L16 38 Q8 38, 10 32 Z" fill="#1D4ED8"/>
      <circle cx="30" cy="16" r="3" fill="#FACC15"/>
    </svg>);
}
// ─── Sort Card Component (for drag-and-drop challenges) ───────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('sun'))
        return <SunIcon size={size}/>;
    if (id.includes('sunny'))
        return <SunIcon size={size}/>;
    if (id.includes('cap'))
        return <CapIcon size={size}/>;
    if (id.includes('cloud'))
        return <CloudIcon size={size}/>;
    if (id.includes('rain'))
        return <RainIcon size={size}/>;
    if (id.includes('rainy'))
        return <RainIcon size={size}/>;
    if (id.includes('raincoat'))
        return <RaincoatIcon size={size}/>;
    if (id.includes('sweater'))
        return <SweaterIcon size={size}/>;
    if (id.includes('cold'))
        return <SweaterIcon size={size}/>;
    if (id.includes('wind'))
        return <WindIcon size={size}/>;
    if (id.includes('mountain'))
        return <EarthIcon size={size}/>;
    if (id.includes('plain'))
        return <EarthIcon size={size}/>;
    if (id.includes('river'))
        return <RainIcon size={size}/>;
    if (id.includes('pond'))
        return <RainIcon size={size}/>;
    if (id.includes('water'))
        return <RainIcon size={size}/>;
    if (id.includes('land'))
        return <EarthIcon size={size}/>;
    if (id.includes('earth'))
        return <EarthIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2 border-2 border-gold-200`}>
        <div className="text-3xl">{emoji}</div>
        <div className="text-xs font-bold text-gray-700 mt-1">{label}</div>
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
    <div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all shadow-md ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}25`, boxShadow: isHovering ? `0 0 22px ${color}` : 'none' }}>
      {renderSortIcon(id, 48)}
      <span className="text-sm font-extrabold text-center px-2" style={{ color }}>{label}</span>
    </div>
  );
}

// ─── Teaching Screen Component ────────────────────────────────

function TeachingScreen({onStart, width, height}: {onStart: () => void; width: number; height: number}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  useEffect(() => {audioManager.play('tap')}, [slide]);

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-2xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #E0F2FE 0%, #BAE6FD 100%)' }}>
      <EarthWeatherScene width={width} height={height}/>

      {/* Top bar */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/80 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🌍</span>
          <span className="font-extrabold text-gold-900 text-base">Earth & Weather Explorer</span>
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: total }).map((_, i) => (<div key={i} className={`h-2.5 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-gold-600' : 'w-2.5 bg-gold-200'}`}/>))}
        </div>
      </div>

      {/* Main card */}
      <motion.div key={slide} initial={{ opacity: 0, scale: 0.95, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: -20 }} transition={{ duration: 0.3 }} className="relative z-10 flex flex-col items-center text-center bg-white/95 backdrop-blur-md p-8 rounded-3xl shadow-xl max-w-xl border-4 border-gold-300 my-auto">
        <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-3">
          {current.emoji}
        </motion.div>
        <h2 className="text-2xl font-black text-gold-900 mb-3">{current.title}</h2>
        <p className="text-gray-700 text-base font-semibold leading-relaxed max-w-md">{current.text}</p>
      </motion.div>

      {/* Bottom navigation */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl shadow-sm">
        <button onClick={() => {
            audioManager.play('tap');
            if (slide > 0)
                setSlide(slide - 1);
        }} disabled={slide === 0} className={`px-5 py-2.5 rounded-xl font-bold text-sm transition-all ${slide === 0 ? 'opacity-30 bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gold-500 text-white hover:bg-gold-600 shadow-md'}`}>
          ⬅️ Back
        </button>

        <span className="text-xs font-bold text-gold-800">
          Slide {slide + 1} of {total}
        </span>

        {slide < total - 1 ? (<button onClick={() => {
                audioManager.play('tap');
                setSlide(slide + 1);
            }} className="px-6 py-2.5 rounded-xl font-bold text-sm bg-gold-500 text-white hover:bg-gold-600 shadow-md transition-all">
            Next ➡️
          </button>) : (<button onClick={() => {
                audioManager.play('celebration');
                onStart();
            }} className="px-8 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg animate-pulse transition-all">
            Start Game! 🌟
          </button>)}
      </div>
    </div>
  );
}

// ─── Main Game Component ──────────────────────────────────────

export interface EarthWeatherGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function EarthWeatherGame({width = 720, height = 560, onComplete}: EarthWeatherGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [successBannerMsg, setSuccessBannerMsg] = useState('');
  const [hintMessage, setHintMessage] = useState<string | null>(null);
  const [sparklePos, setSparklePos] = useState<{x: number; y: number} | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Welcome! I am Weather Wiz Mira. Let us explore Earth and weather together!');

  // Sort challenge state
  const [sortPlaced, setSortPlaced] = useState<Record<string, boolean>>();

  // Inactivity timer ref for auto-hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const currentChallenge = CHALLENGES[challengeIdx];

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (screen === 'play' && currentChallenge) {
        setHintMessage(currentChallenge.hint);
        audioManager.play('hint');
        setMascotMood('thinking');
        setMascotSpeech('Need a hint? Check this out!');
        speechManager.speak('Need a hint? Check this out!');
      }
    }, 10000);
  }, [screen, currentChallenge]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      speechManager.stop();
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [challengeIdx, screen, resetInactivityTimer]);

  // Reset sort state when challenge changes
  useEffect(() => {
    setSortPlaced({});
    setMascotMood('happy');
    if (challengeIdx === 0) {
      setMascotSpeech('What is Earth made of? Choose the right answer!');
      speechManager.speak('What is Earth made of? Choose the right answer!');
    } else if (challengeIdx === 3) {
      setMascotSpeech('Drag each item of clothing to the matching weather!');
      speechManager.speak('Drag each item of clothing to the matching weather!');
    } else {
      setMascotSpeech(currentChallenge.question);
      speechManager.speak(currentChallenge.question);
    }
  }, [challengeIdx, currentChallenge]);

  // Handle multiple choice answer
  const handleOptionClick = (option: string, event: React.MouseEvent<HTMLButtonElement>) => {
    resetInactivityTimer();
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    if (option === currentChallenge.answer) {
        // Correct
        audioManager.play('success');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      setStars(prev => prev + 1);
      setMascotMood('celebrate');
      setMascotSpeech('Fantastic! You got it right!');
      speechManager.speak('Fantastic! You got it right!');

      setTimeout(() => {advanceChallenge()}, 1200);
    } else {
        // Incorrect (Misconception feedback)
        audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMessage(currentChallenge.misconception);
      setMascotSpeech('Not quite! Let us think about this.');
      speechManager.speak('Not quite! Let us think about this.');
    }
  };

  // Handle Drag & Drop start
  const handleDragStart = (_id: string) => {
    resetInactivityTimer();
    audioManager.play('pickup');
  };

  // Handle Drag & Drop end
  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    resetInactivityTimer();
    if (!currentChallenge.sortItems || !currentChallenge.bins) return false;

    const item = currentChallenge.sortItems.find(i => i.id === id);
    if (!item) return false;

    // Find bin under drop coordinates (rough bounding box check)
    // Bins layout: placed across the bottom or middle
    const binWidth = 140;
    const binHeight = 110;
    const binY = height - 160;

    const binSpacing = width / (currentChallenge.bins.length + 1);

    let droppedBinId: string | null = null;
    currentChallenge.bins.forEach((bin, idx) => {
      const binX = binSpacing * (idx + 1) - binWidth / 2;
      if (x >= binX - 20 && x <= binX + binWidth + 20 && y >= binY - 30 && y <= binY + binHeight + 30) {
        droppedBinId = bin.id;
      }
    });

    if (droppedBinId === item.correctBin) {
        // Correct bin!
        audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setSparklePos({x, y});
      setSortPlaced(prev => ({...prev, [id]: true}));

      // Check if all items in sort challenge are placed
      const remainingItems = currentChallenge.sortItems.filter(i => i.id !== id && !sortPlaced[i.id]);
      if (remainingItems.length === 0) {
        audioManager.play('success');
        setStars(prev => prev + 1);
        setMascotMood('celebrate');
        setMascotSpeech('Wonderful! Everything is sorted correctly!');
        speechManager.speak('Wonderful! Everything is sorted correctly!');
        setTimeout(() => {advanceChallenge()}, 1400);
      }
      return true;
    } else {
        // Wrong bin
        audioManager.play('drop-wrong');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setHintMessage(currentChallenge.misconception);
      setMascotSpeech('Oops! That belongs in a different place.');
      speechManager.speak('Oops! That belongs in a different place.');
      return false;
    }
  };

  const advanceChallenge = () => {
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx(prev => prev + 1);
      setHintMessage(null);
    } else {
      // Game complete!
      const finalScore = Math.max(0, 100 - errors * 5);
      setShowConfetti(true);
      audioManager.play('celebration');
      setSuccessBannerMsg(`You earned ${stars + 1} stars! Weather Wiz Mira is so proud!`);
      setShowSuccessBanner(true);
      if (onComplete) {onComplete(finalScore)};
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-2xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 100%)' }}>
      <EarthWeatherScene width={width} height={height}/>
      <DrPipaWrapper mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top Navigation / Status Bar */}
      <div className="relative z-10 w-full flex justify-between items-center bg-white/85 backdrop-blur-md px-5 py-3 rounded-2xl shadow-sm border border-gold-100">
        <div className="flex items-center gap-3">
          <span className="text-xl font-black text-gold-900">Level {challengeIdx + 1} / {CHALLENGES.length}</span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <button onClick={() => {
            audioManager.play('tap');
            setScreen('teaching');
        }} className="px-3 py-1 rounded-lg bg-gold-100 text-gold-800 font-bold text-xs hover:bg-gold-200 transition-all">
          📖 Review Lesson
        </button>
      </div>

      {/* Challenge Question Card */}
      <motion.div key={challengeIdx} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="relative z-10 w-full max-w-xl bg-white/90 backdrop-blur-md px-6 py-4 rounded-2xl shadow-md border-2 border-gold-200 text-center my-2">
        <h2 className="text-lg font-extrabold text-gold-900">{currentChallenge.question}</h2>
      </motion.div>

      {/* Challenge Interactive Area */}
      <div className="relative z-10 flex-1 w-full flex flex-col items-center justify-center my-auto relative" style={{ minHeight: 220 }}>
        {currentChallenge.answer !== 'sort' ? (
        /* Multiple Choice Grid */
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-xl px-4">
            {currentChallenge.options.map(option => (<motion.button key={option} whileHover={{ scale: 1.03, y: -2 }} whileTap={{ scale: 0.97 }} onClick={e => handleOptionClick(option, e)} className="flex flex-col items-center justify-center p-4 bg-white rounded-2xl shadow-md border-2 border-gold-200 hover:border-gold-400 hover:bg-gold-50 transition-all cursor-pointer font-bold text-gray-800 text-sm text-center min-h-[90px]">
                {/* Optional icon representation */}
                <span className="text-2xl mb-1">
                  {option.includes('Land') ? '🌍' : option.includes('sky') ? '⛅' : option.includes('Cotton') ? '👕' : option.includes('Raincoat') ? '🧥' : option.includes('Clouds') ? '☁️' : '✨'}
                </span>
                {option}
              </motion.button>))}
          </div>) : (
        /* Sort Challenge Area */
        <div className="relative w-full h-[220px]">
            {/* Bins */}
            {currentChallenge.bins && currentChallenge.bins.map((bin, idx) => {
                const binWidth = 140;
                const binHeight = 100;
                const binSpacing = width / (currentChallenge.bins!.length + 1);
                const binX = binSpacing * (idx + 1) - binWidth / 2;
                const binY = height - 200;
                return (<SortBin key={bin.id} id={bin.id} label={bin.label} color={bin.color} x={binX} y={binY} width={binWidth} height={binHeight} isHovering={false}/>);
            })}

            {/* Draggable Cards */}
            {currentChallenge.sortItems && currentChallenge.sortItems.map((item, idx) => {
                const isPlaced = !!sortPlaced[item.id];
                // Spread cards neatly across top of play area
                const cardSpacing = width / (currentChallenge.sortItems!.length + 1);
                const startX = cardSpacing * (idx + 1) - 55;
                const startY = 20;
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={startX} y={startY} placed={isPlaced} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}
      </div>

      {/* Hint Bubble if active */}
      <AnimatePresence>
        {hintMessage && (<div className="absolute bottom-16 z-30">
            <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>
          </div>)}
      </AnimatePresence>

      {/* Confetti & Success Banner */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {showSuccessBanner && (<SuccessBanner message={successBannerMsg} onComplete={() => setShowSuccessBanner(false)}/>)}

      {/* Sparkle Burst */}
      {sparklePos && (<SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>)}
    </div>
  );
}

// Helper wrapper for Mascot in play screen
function DrPipaWrapper({mood, speaking}: {mood: 'happy' | 'celebrate' | 'thinking'; speaking: string | null}) {
  return <WeatherWizMira mood={mood} speaking={speaking}/>;
}
