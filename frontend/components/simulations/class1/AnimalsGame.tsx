'use client';
/**
 * AnimalsGame - Learn about animals in our surroundings: common animals and birds,
 * body coverings (fur vs feathers), leg counts, sounds, and pets vs street animals.
 *
 * CISCE Nodes: c1_evs_003 (Animals in my surroundings)
 * Enrichment: c1_evs_enrichment_part3.marker
 *
 * ELI5: "Look around you - animals are everywhere! Dogs and cats have soft fur and four legs.
 *   Cows and goats also have fur and walk on four legs. Crows, sparrows, pigeons, and parrots
 *   have feathers and two legs. Each animal makes its own sound: dogs bark, cows moo, crows caw.
 *   Some animals live with us as pets; others live on the street. Always watch animals quietly,
 *   from a distance, and be kind to them."
 *
 * Misconceptions (from enrichment):
 *   1. "All animals have the same kind of body covering" → "Animals have different body coverings!
 *      Mammals like dogs, cats, cows, and goats have fur. Birds have feathers!"
 *   2. "A bird has four legs like a dog" → "Birds have only two legs and two wings!
 *      Dogs, cats, cows, and goats are four-legged mammals."
 *   3. "It is safe to touch and play with any street animal" → "Street animals are not pets!
 *      We must watch them quietly from a distance, never tease or chase them."
 *
 * Story: "Help Animal Lover Sonu guide friendly animals, match their sounds, sort fur vs feathers,
 *   and learn how to care for pets and street animals safely!"
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
        title: 'Animals All Around Us! 🐾',
        text: 'Animals and birds live all around us - in our homes, streets, gardens, and schools! Dogs, cats, cows, goats, crows, sparrows, pigeons, and parrots are our familiar living beings.',
        emoji: '🐕',
        bgColor: 'from-amber-400 to-orange-500',
        spoken: 'Animals and birds live all around us in our homes, streets, gardens, and schools!',
    },
    {
        title: 'Sounds of Animals! 🗣️',
        text: 'Each animal makes its own special sound! A dog barks, a cat meows, a cow moos, a goat bleats, a crow caws, and a sparrow chirps. Listen carefully to guess who is nearby!',
        emoji: '🎵',
        bgColor: 'from-orange-400 to-amber-600',
        spoken: 'Each animal makes its own special sound! A dog barks, a cat meows, a cow moos, and a goat bleats.',
    },
    {
        title: 'Fur or Feathers? 🧥',
        text: 'Mammals like dogs, cats, cows, and goats are covered in fur - short or long hair that keeps them warm. Birds like crows, sparrows, and pigeons are covered in feathers to fly!',
        emoji: '🦅',
        bgColor: 'from-emerald-400 to-teal-500',
        spoken: 'Mammals like dogs and cats have fur. Birds like crows and sparrows have feathers!',
    },
    {
        title: 'Counting Legs! 🦵',
        text: 'Dogs, cats, cows, and goats walk on four legs! Birds have two legs that they use to hop, walk, or perch, and two wings to fly. Counting legs helps us sort them easily!',
        emoji: '🔢',
        bgColor: 'from-gold-400 to-gold-500',
        spoken: 'Dogs, cats, cows, and goats walk on four legs. Birds have two legs and two wings!',
    },
    {
        title: 'Pets and Street Animals! 🏡',
        text: 'Some animals live with us as pets - like pet dogs and cats that we care for. Others live on the street. Always watch animals quietly from a distance and be kind to them!',
        emoji: '❤️',
        bgColor: 'from-pink-400 to-rose-500',
        spoken: 'Some animals live with us as pets. Others live on the street. Always watch them kindly and safely!',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_sound_dog' | 'identify_sound_cat' | 'identify_covering_bird' | 'sort_sounds' | 'identify_covering_mammal' | 'identify_pet_home' | 'sort_pet_street' | 'sort_mammal_bird';
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
        type: 'identify_sound_dog',
        question: 'What sound does a DOG make?',
        answer: 'Bark',
        options: ['Bark', 'Meow', 'Moo'],
        hint: 'Think about a dog guarding the gate! It goes "bow-wow"!',
        misconception: 'A dog barks ("bow-wow")! Cats meow, and cows moo. Each animal has its own special sound!',
    },
    {
        type: 'identify_sound_cat',
        question: 'What sound does a CAT make?',
        answer: 'Meow',
        options: ['Bark', 'Meow', 'Bleat'],
        hint: 'Think about a little cat slipping under a car! It goes "meow"!',
        misconception: 'A cat meows! Dogs bark and goats bleat. Never mix up animal sounds!',
    },
    {
        type: 'identify_covering_bird',
        question: 'What covering do BIRDS like crows and sparrows have?',
        answer: 'Feathers',
        options: ['Fur', 'Feathers', 'Scales'],
        hint: 'Birds need light body coverings to help them fly through the air!',
        misconception: 'Birds have feathers! Mammals like dogs and cats have fur. Fish and lizards have scales.',
    },
    {
        type: 'sort_sounds',
        question: 'Drag each animal to its correct sound!',
        answer: 'sort',
        options: [],
        hint: 'Dog = Bark, Cat = Meow, Cow = Moo, Goat = Bleat!',
        misconception: 'Remember the basic sounds: Dog barks, Cat meows, Cow moos, Goat bleats! Review topic fundamentals if you get mixed up.',
        sortItems: [
            { id: 'dog', label: 'Dog (Bark)', emoji: '🐕', correctBin: 'bark' },
            { id: 'cat', label: 'Cat (Meow)', emoji: '🐈', correctBin: 'meow' },
            { id: 'cow', label: 'Cow (Moo)', emoji: '🐄', correctBin: 'moo' },
            { id: 'goat', label: 'Goat (Bleat)', emoji: '🐐', correctBin: 'bleat' },
        ],
        bins: [
            { id: 'bark', label: 'Bark 🐕', color: '#F59E0B' },
            { id: 'meow', label: 'Meow 🐈', color: '#3B82F6' },
            { id: 'moo', label: 'Moo 🐄', color: '#10B981' },
            { id: 'bleat', label: 'Bleat 🐐', color: '#EC4899' },
        ],
    },
    {
        type: 'identify_covering_mammal',
        question: 'What covering do MAMMALS like dogs, cats, cows, and goats have?',
        answer: 'Fur',
        options: ['Fur', 'Feathers', 'Leaves'],
        hint: 'Touch a dog or a cat gently - you will feel soft short hair that keeps them warm!',
        misconception: 'Mammals have fur! Birds have feathers. All four-legged mammals like dogs, cats, cows, and goats are covered in fur.',
    },
    {
        type: 'identify_pet_home',
        question: 'Where do PET animals like a family dog live?',
        answer: 'With us in our home',
        options: ['With us in our home', 'In the wild jungle', 'On the moon'],
        hint: 'Pets live with us and depend on people for food, water, and shelter!',
        misconception: 'Pet animals live with us in or near our homes and are cared for by people. Street animals live on their own!',
    },
    {
        type: 'sort_pet_street',
        question: 'Drag each animal into Pet or Street animal!',
        answer: 'sort',
        options: [],
        hint: 'Pets are cared for by people at home! Street animals live on roads and find their own food!',
        misconception: 'Pet animals depend on people for care and shelter. Street animals live on their own and must be watched safely from a distance!',
        sortItems: [
            { id: 'pet-dog', label: 'Pet Dog', emoji: '🦮', correctBin: 'pet' },
            { id: 'pet-cat', label: 'Pet Cat', emoji: '🐈', correctBin: 'pet' },
            { id: 'street-dog', label: 'Street Dog', emoji: '🐕', correctBin: 'street' },
            { id: 'street-cow', label: 'Wandering Cow', emoji: '🐄', correctBin: 'street' },
        ],
        bins: [
            { id: 'pet', label: 'Pet Animal 🏡', color: '#10B981' },
            { id: 'street', label: 'Street Animal 🛣️', color: '#F97316' },
        ],
    },
    {
        type: 'sort_mammal_bird',
        question: 'Drag each animal! Is it a Mammal (Fur & 4 Legs) or a Bird (Feathers & 2 Legs)?',
        answer: 'sort',
        options: [],
        hint: 'Dogs, cows = mammals with fur & 4 legs! Crows, parrots = birds with feathers & 2 legs!',
        misconception: 'Mammals have four legs and fur. Birds have two legs, two wings, and feathers! Never say birds have four legs.',
        sortItems: [
            { id: 'dog-mammal', label: 'Dog (4 legs, fur)', emoji: '🐕', correctBin: 'mammal' },
            { id: 'cow-mammal', label: 'Cow (4 legs, fur)', emoji: '🐄', correctBin: 'mammal' },
            { id: 'crow-bird', label: 'Crow (2 legs, feathers)', emoji: '🐦', correctBin: 'bird' },
            { id: 'parrot-bird', label: 'Parrot (2 legs, feathers)', emoji: '🦜', correctBin: 'bird' },
        ],
        bins: [
            { id: 'mammal', label: 'Mammal (Fur) 🐾', color: '#8B5CF6' },
            { id: 'bird', label: 'Bird (Feathers) 🪶', color: '#06B6D4' },
        ],
    },
];
// ─── Animal Lover Sonu Mascot ─────────────────────────────────
function SonuMascot({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-amber-300">
            <p className="text-sm font-bold text-gray-800">{speaking}</p>
          </motion.div>)}
      </AnimatePresence>

      <motion.div animate={mood === 'celebrate'
            ? { rotate: [0, -12, 12, -12, 0], scale: [1, 1.2, 1] }
            : mood === 'happy'
                ? { y: [0, -5, 0] }
                : { rotate: [0, 6, 0] }} transition={{
            duration: mood === 'celebrate' ? 0.6 : 2,
            repeat: mood === 'celebrate' ? 0 : Infinity,
            ease: 'easeInOut',
        }}>
        <svg width="75" height="90" viewBox="0 0 75 90">
          {/* Cap */}
          <path d="M22 25 Q37 15 52 25 L58 30 L16 30 Z" fill="#EF4444"/>
          <path d="M45 28 L65 32 L62 36 L45 32 Z" fill="#DC2626"/>
          {/* Head */}
          <circle cx="37" cy="38" r="14" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5"/>
          {/* Eyes */}
          <circle cx="31" cy="36" r="2" fill="#1E293B"/>
          <circle cx="43" cy="36" r="2" fill="#1E293B"/>
          {/* Smile */}
          <path d="M32 44 Q37 49 42 44" stroke="#B45309" strokeWidth="2" fill="none" strokeLinecap="round"/>
          {/* Cheeks */}
          <circle cx="28" cy="41" r="2.5" fill="#FCA5A5" opacity="0.7"/>
          <circle cx="46" cy="41" r="2.5" fill="#FCA5A5" opacity="0.7"/>
          {/* Shirt */}
          <path d="M22 52 L52 52 L58 78 L16 78 Z" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="1.5"/>
          {/* Collar */}
          <path d="M30 52 L37 60 L44 52 Z" fill="white"/>
          {/* Pocket with bone */}
          <rect x="23" y="62" width="10" height="12" fill="#2563EB" rx="1"/>
          <path d="M25 66 Q29 64 31 66 Q29 68 27 66 Z" fill="white"/>
          {/* Arms */}
          <circle cx="18" cy="60" r="5" fill="#FDE047"/>
          <circle cx="56" cy="60" r="5" fill="#FDE047"/>
          {/* Feet */}
          <ellipse cx="28" cy="84" rx="6" ry="4" fill="#1E293B"/>
          <ellipse cx="46" cy="84" rx="6" ry="4" fill="#1E293B"/>
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
// ─── Animal Scene Background ──────────────────────────────────
function AnimalScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="animal-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#BAE6FD"/>
            <stop offset="40%" stopColor="#E0F2FE"/>
            <stop offset="70%" stopColor="#FEF9C3"/>
            <stop offset="100%" stopColor="#DCFCE7"/>
          </linearGradient>
        </defs>
        <rect width="720" height="560" fill="url(#animal-sky)"/>
      </svg>
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27" cy="27" r="16" fill="#FACC15" opacity="0.9"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27" y1="27" x2={27 + 24 * Math.cos(angle * Math.PI / 180)} y2={27 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FACC15" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-6 left-1/4 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="70" height="30" viewBox="0 0 70 30">
          <ellipse cx="22" cy="18" rx="16" ry="11" fill="white"/>
          <ellipse cx="40" cy="14" rx="20" ry="13" fill="white"/>
          <ellipse cx="52" cy="18" rx="14" ry="9" fill="white"/>
        </svg>
      </motion.div>
      {/* Flying Bird */}
      <motion.div className="absolute top-12 left-10" animate={{ x: [0, 100, 0], y: [0, -10, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="30" height="15" viewBox="0 0 30 15">
          <path d="M2 10 Q10 0, 15 8 Q20 0, 28 10" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </motion.div>
      {/* Ground */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #4ADE80 0%, #22C55E 100%)' }}/>
      {/* Grass tufts */}
      <div className="absolute bottom-24 left-10 flex gap-2 opacity-80">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M5 20 L5 10 L10 20 L12 8 L17 20" stroke="#15803D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute bottom-24 right-16 flex gap-2 opacity-80">
        <svg width="20" height="20" viewBox="0 0 20 20">
          <path d="M5 20 L7 10 L11 20 L13 6 L18 20" stroke="#15803D" strokeWidth="2" fill="none" strokeLinecap="round"/>
        </svg>
      </div>
    </div>);
}
// ─── Custom Animal SVG Component Icons ────────────────────────
function DogIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Dog head */}
      <ellipse cx="30" cy="32" rx="16" ry="14" fill="#D97706"/>
      {/* Ears */}
      <path d="M16 24 Q10 20, 14 34 Z" fill="#B45309"/>
      <path d="M44 24 Q50 20, 46 34 Z" fill="#B45309"/>
      {/* Eyes & nose */}
      <circle cx="23" cy="28" r="2" fill="#1E293B"/>
      <circle cx="37" cy="28" r="2" fill="#1E293B"/>
      <ellipse cx="30" cy="34" rx="4" ry="3" fill="#1E293B"/>
      {/* Tongue */}
      <path d="M28 37 Q30 43, 32 37 Z" fill="#EF4444"/>
    </svg>);
}
function CatIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Cat head */}
      <circle cx="30" cy="33" r="15" fill="#94A3B8"/>
      {/* Ears */}
      <path d="M18 22 L16 10 L28 20 Z" fill="#64748B"/>
      <path d="M42 22 L44 10 L32 20 Z" fill="#64748B"/>
      {/* Eyes */}
      <ellipse cx="23" cy="30" rx="2.5" ry="3.5" fill="#FACC15"/>
      <ellipse cx="37" cy="30" rx="2.5" ry="3.5" fill="#FACC15"/>
      <circle cx="23" cy="30" r="1" fill="#1E293B"/>
      <circle cx="37" cy="30" r="1" fill="#1E293B"/>
      {/* Nose */}
      <polygon points="30,35 27,33 33,33" fill="#F472B6"/>
      {/* Whiskers */}
      <line x1="12" y1="35" x2="22" y2="34" stroke="#334155" strokeWidth="1"/>
      <line x1="12" y1="38" x2="22" y2="37" stroke="#334155" strokeWidth="1"/>
      <line x1="48" y1="35" x2="38" y2="34" stroke="#334155" strokeWidth="1"/>
      <line x1="48" y1="38" x2="38" y2="37" stroke="#334155" strokeWidth="1"/>
    </svg>);
}
function CowIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Cow head */}
      <rect x="18" y="20" width="24" height="22" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" rx="6"/>
      {/* Spots */}
      <circle cx="24" cy="26" r="4" fill="#1E293B"/>
      <circle cx="38" cy="32" r="5" fill="#1E293B"/>
      {/* Horns */}
      <path d="M20 18 Q16 10, 22 14 Z" fill="#D97706"/>
      <path d="M40 18 Q44 10, 38 14 Z" fill="#D97706"/>
      {/* Eyes & muzzle */}
      <circle cx="23" cy="27" r="1.5" fill="#1E293B"/>
      <circle cx="37" cy="27" r="1.5" fill="#1E293B"/>
      <ellipse cx="30" cy="37" rx="8" ry="5" fill="#FBCFE8"/>
      <circle cx="27" cy="37" r="1" fill="#BE185D"/>
      <circle cx="33" cy="37" r="1" fill="#BE185D"/>
    </svg>);
}
function GoatIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Goat head */}
      <path d="M30 14 Q22 25, 24 40 L36 40 Q38 25, 30 14 Z" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5"/>
      {/* Horns */}
      <path d="M25 18 Q20 8, 15 12" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      <path d="M35 18 Q40 8, 45 12" stroke="#475569" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
      {/* Eyes & beard */}
      <circle cx="26" cy="28" r="2" fill="#1E293B"/>
      <circle cx="34" cy="28" r="2" fill="#1E293B"/>
      <path d="M28 40 Q30 48, 32 40 Z" fill="white"/>
    </svg>);
}
function BirdIcon({ size = 50 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 60 60">
      {/* Bird body */}
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="#38BDF8"/>
      {/* Head */}
      <circle cx="42" cy="24" r="8" fill="#0EA5E9"/>
      {/* Beak */}
      <polygon points="49,24 56,22 49,20" fill="#F59E0B"/>
      {/* Eye */}
      <circle cx="44" cy="23" r="1.5" fill="#1E293B"/>
      {/* Wing */}
      <ellipse cx="30" cy="34" rx="8" ry="5" fill="#0284C7" transform="rotate(-20 30 34)"/>
      {/* Tail */}
      <path d="M18 32 L10 26 L14 36 Z" fill="#0284C7"/>
    </svg>);
}
// ─── Sort Card Component ──────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('dog'))
        return <DogIcon size={size}/>;
    if (id.includes('bark'))
        return <DogIcon size={size}/>;
    if (id.includes('cat'))
        return <CatIcon size={size}/>;
    if (id.includes('meow'))
        return <CatIcon size={size}/>;
    if (id.includes('cow'))
        return <CowIcon size={size}/>;
    if (id.includes('moo'))
        return <CowIcon size={size}/>;
    if (id.includes('goat'))
        return <GoatIcon size={size}/>;
    if (id.includes('bleat'))
        return <GoatIcon size={size}/>;
    if (id.includes('bird'))
        return <BirdIcon size={size}/>;
    if (id.includes('parrot'))
        return <BirdIcon size={size}/>;
    if (id.includes('crow'))
        return <BirdIcon size={size}/>;
    if (id.includes('mammal'))
        return <DogIcon size={size}/>;
    if (id.includes('pet'))
        return <DogIcon size={size}/>;
    if (id.includes('street'))
        return <CatIcon size={size}/>;
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
    return (<Draggable id={id} x={x} y={y} draggable={!placed} placed={placed} onDragStart={onDragStart} onDragEnd={onDragEnd} width={120} height={95}>
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white border-2 border-amber-200'} px-3 py-2`} style={{ width: 120, height: 95 }}>
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
      <div className="text-sm font-bold text-center px-2" style={{ color }}>{label}</div>
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
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden" style={{ width, height, background: 'linear-gradient(135deg, #FEF3C7 0%, #FEE2E2 100%)' }}>
      <AnimalScene width={width} height={height}/>

      {/* Header */}
      <div className="relative z-10 w-full flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-md">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🐾</span>
          <h1 className="text-xl font-black text-amber-900">Animals in My Surroundings</h1>
        </div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-3 rounded-full transition-all ${i === slide ? 'w-8 bg-amber-500' : 'w-3 bg-amber-200'}`}/>))}
        </div>
      </div>

      {/* Slide Content Card */}
      <motion.div key={slide} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.4 }} className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl p-8 shadow-2xl max-w-xl w-full flex flex-col items-center text-center border-4 border-amber-200 my-auto">
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${current.bgColor} flex items-center justify-center text-4xl shadow-lg mb-4`}>
          {current.emoji}
        </div>
        <h2 className="text-2xl font-black text-gray-800 mb-3">{current.title}</h2>
        <p className="text-lg font-medium text-gray-600 leading-relaxed mb-6">{current.text}</p>

        <div className="flex gap-4 w-full">
          {slide > 0 && (<button onClick={handlePrev} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 px-6 rounded-2xl shadow-md transition-all active:scale-95 text-lg">
              ⬅️ Back
            </button>)}
          <button onClick={handleNext} className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-black py-3 px-6 rounded-2xl shadow-lg transition-all active:scale-95 text-lg">
            {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
// ─── Main Component Props ─────────────────────────────────────
export interface AnimalsGameProps {
    width?: number;
    height?: number;
    onComplete?: (score: number) => void;
}
// ─── Main Game Component ──────────────────────────────���───────
export function AnimalsGame({ width = 720, height = 560, onComplete }: AnimalsGameProps) {
    const [screen, setScreen] = useState<GameScreen>('teaching');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [stars, setStars] = useState(0);
    const [errors, setErrors] = useState(0);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const [hintMessage, setHintMessage] = useState<string | null>(null);
    const [misconceptionMsg, setMisconceptionMsg] = useState<string | null>(null);
    const [sparklePos, setSparklePos] = useState<{
        x: number;
        y: number;
    } | null>(null);
    const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
    const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! Let us explore the animals around us!');
    // Sort challenge state
    const [placedItems, setPlacedItems] = useState<Record<string, boolean>>({});
    const [hoverBin, setHoverBin] = useState<string | null>(null);
    const [itemPositions, setItemPositions] = useState<Record<string, {
        x: number;
        y: number;
    }>>({});
    const challenge = CHALLENGES[currentIndex];
    const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);
    // Reset sort item positions on challenge change
    useEffect(() => {
        if (challenge.type.startsWith('sort') && challenge.sortItems) {
            const initialPos: Record<string, {
                x: number;
                y: number;
            }> = {};
            challenge.sortItems.forEach((item, index) => {
                initialPos[item.id] = { x: 50 + index * 140, y: 340 };
            });
            setItemPositions(initialPos);
            setPlacedItems({});
        }
    }, [currentIndex, challenge]);
    // Inactivity timer for auto-hint
    const resetInactivityTimer = useCallback(() => {
        if (inactivityTimerRef.current)
            clearTimeout(inactivityTimerRef.current);
        inactivityTimerRef.current = setTimeout(() => {
            if (screen === 'play' && !showSuccess) {
                setHintMessage(challenge.hint);
                audioManager.play('hint');
                setMascotMood('thinking');
                setMascotSpeech('Need a hint? Check this out!');
                speechManager.speak('Need a hint? Check this out!');
            }
        }, 10000);
    }, [challenge, screen, showSuccess]);
    useEffect(() => {
        resetInactivityTimer();
        return () => {
            speechManager.stop();
            if (inactivityTimerRef.current)
                clearTimeout(inactivityTimerRef.current);
        };
    }, [currentIndex, resetInactivityTimer]);
    const handleCorrectAnswer = (event?: React.MouseEvent) => {
        audioManager.play('success');
        setStars(s => s + 1);
        setShowSuccess(true);
        setShowConfetti(true);
        setMascotMood('celebrate');
        setMascotSpeech('Fantastic! You got it right!');
        speechManager.speak('Fantastic! You got it right!');
        setMisconceptionMsg(null);
        if (event) {
            setSparklePos({ x: event.clientX, y: event.clientY });
        }
        else {
            setSparklePos({ x: width / 2, y: height / 2 });
        }
    };
    const handleWrongAnswer = () => {
        audioManager.play('error');
        setErrors(e => e + 1);
        setMisconceptionMsg(challenge.misconception);
        setMascotMood('thinking');
        setMascotSpeech('Remember the rule! Let us try again.');
        speechManager.speak('Remember the rule! Let us try again.');
    };
    const handleOptionClick = (option: string, e: React.MouseEvent) => {
        resetInactivityTimer();
        if (option === challenge.answer) {
            handleCorrectAnswer(e);
        }
        else {
            handleWrongAnswer();
        }
    };
    // Drag and drop handlers
    const handleDragStart = () => {
        resetInactivityTimer();
        audioManager.play('pickup');
    };
    const handleDragEnd = (id: string, x: number, y: number): boolean => {
        resetInactivityTimer();
        if (!challenge.bins || !challenge.sortItems)
            return false;
        // Check bin bounds
        const binWidth = 140;
        const binHeight = 110;
        const binY = 180;
        let targetBin: string | null = null;
        challenge.bins.forEach((bin, index) => {
            const binX = 60 + index * 150;
            if (x + 60 >= binX && x + 60 <= binX + binWidth && y + 50 >= binY && y + 50 <= binY + binHeight) {
                targetBin = bin.id;
            }
        });
        setHoverBin(null);
        const sortItem = challenge.sortItems.find(i => i.id === id);
        if (!sortItem)
            return false;
        if (targetBin && targetBin === sortItem.correctBin) {
            audioManager.play('drop-correct');
            const newPlaced = { ...placedItems, [id]: true };
            setPlacedItems(newPlaced);
            // Check if all items placed
            const allPlaced = challenge.sortItems.every(i => newPlaced[i.id]);
            if (allPlaced) {
                handleCorrectAnswer();
            }
            return true;
        }
        else {
            audioManager.play('drop-wrong');
            handleWrongAnswer();
            return false;
        }
    };
    const handleNextChallenge = () => {
        setShowSuccess(false);
        setMascotMood('happy');
        setMascotSpeech('You are learning so much about animals!');
        speechManager.speak('You are learning so much about animals!');
        if (currentIndex < CHALLENGES.length - 1) {
            setCurrentIndex(c => c + 1);
        }
        else {
            const finalScore = Math.max(0, 100 - errors * 5);
            if (onComplete)
                onComplete(finalScore);
        }
    };
    if (screen === 'teaching') {
        return <TeachingScreen onStart={() => { setScreen('play'); audioManager.play('tap'); }} width={width} height={height}/>;
    }
    return (<div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden select-none" style={{ width, height, background: 'linear-gradient(135deg, #FEF3C7 0%, #FEE2E2 100%)' }}>
      <AnimalScene width={width} height={height}/>
      <SonuMascot mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top Bar */}
      <div className="relative z-10 w-full flex items-center justify-between bg-white/80 backdrop-blur-md rounded-2xl px-6 py-3 shadow-md">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🐾</span>
          <h1 className="text-lg font-black text-amber-900">Challenge {currentIndex + 1} of {CHALLENGES.length}</h1>
        </div>
        <StarRow count={stars} total={CHALLENGES.length}/>
      </div>

      {/* Question Card */}
      <div className="relative z-10 bg-white/90 backdrop-blur-md rounded-3xl p-6 shadow-xl max-w-xl w-full flex flex-col items-center text-center border-4 border-amber-200 my-auto">
        <h2 className="text-xl font-black text-gray-800 mb-6">{challenge.question}</h2>

        {/* Multiple Choice Options */}
        {!challenge.sortItems && (<div className="grid grid-cols-1 gap-3 w-full max-w-md">
            {challenge.options.map((opt, i) => (<motion.button key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={(e) => handleOptionClick(opt, e)} className="bg-gradient-to-r from-amber-400 to-orange-400 hover:from-amber-500 hover:to-orange-500 text-white font-black py-3 px-6 rounded-2xl shadow-md transition-all text-lg">
                {opt}
              </motion.button>))}
          </div>)}

        {/* Sort Challenge Layout */}
        {challenge.sortItems && challenge.bins && (<div className="relative w-full h-[260px]">
            {/* Bins */}
            {challenge.bins.map((bin, index) => {
                const binX = 60 + index * 150;
                return (<SortBin key={bin.id} label={bin.label} color={bin.color} x={binX} y={10} width={140} height={110} isHovering={hoverBin === bin.id}/>);
            })}

            {/* Draggable Cards */}
            {challenge.sortItems.map((item) => {
                const pos = itemPositions[item.id] || { x: 50, y: 150 };
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={pos.x} y={pos.y} placed={!!placedItems[item.id]} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
          </div>)}

        {/* Misconception Feedback */}
        <AnimatePresence>
          {misconceptionMsg && (<motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-4 bg-red-100 border-2 border-red-300 rounded-2xl p-3 text-red-800 text-sm font-bold max-w-md">
              💡 {misconceptionMsg}
            </motion.div>)}
        </AnimatePresence>
      </div>

      {/* Feedback & Success Overlays */}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)}/>}
      {sparklePos && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setSparklePos(null)}/>}
      {hintMessage && <HintBubble message={hintMessage} onComplete={() => setHintMessage(null)}/>}
      {showSuccess && <SuccessBanner message="Wonderful job! Animal Hero!" onComplete={handleNextChallenge}/>}
    </div>);
}
