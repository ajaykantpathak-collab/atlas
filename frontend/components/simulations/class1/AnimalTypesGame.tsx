'use client';
/**
 * AnimalTypesGame - Learn about pet, wild, and domestic animals, their habitats, body parts, and care.
 *
 * CISCE Nodes: c1_bio_019 (Pet, wild, domestic), c1_bio_020 (Habitats),
 *              c1_bio_021 (Body parts), c1_bio_022 (Care and compassion)
 * Enrichment: c1_biology_enrichment_part19-22
 *
 * ELI5: "Animals live in three kinds of homes! A pet lives with you in your home,
 *   like a dog or cat. A wild animal lives in the forest or jungle, like a lion
 *   or tiger. A domestic animal lives on a farm, like a cow or goat! Animals also
 *   have different habitats (land, water, air), special body parts (wings, fins,
 *   trunks), and they all need our love and care!"
 *
 * Misconceptions (from enrichment):
 *   1. "Pet and domestic mean the same thing" → "No! Pets live inside the home as
 *      family members, while domestic animals are reared on farms or in courtyards
 *      for milk or work!"
 *   2. "A wild animal is simply a scary or angry animal" → "No! A wild animal is
 *      wild because it lives freely in a forest or jungle and has no owner - not
 *      because it is frightening!"
 *   3. "Animals that go in water must live only in water" → "No! Animals like
 *      ducks swim on ponds but also stand on land!"
 *   4. "Birds are not animals" → "No! Birds are a special group of animals that
 *      live in the air and have wings and feathers!"
 *   5. "Every long body part is a leg" → "No! A tail is at the back and wags;
 *      fins are flat for swimming; legs are below for walking!"
 *   6. "We should only care for pets" → "No! All animals feel pain and hunger,
 *      so we should show compassion to stray animals and birds too!"
 *
 * Story: "Help Zookeeper Zoya sort animals into their correct groups, match their
 *   habitats, learn their body parts, and practice caring for them! Become a Master Zookeeper!"
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
        title: 'Pet, Wild, and Domestic Animals 🐾',
        text: 'Animals live in different places! Pet animals live with us inside our homes (dog, cat). Wild animals live freely in forests and jungles with no owner (lion, tiger). Domestic animals live on farms and help us (cow, goat).',
        emoji: '🦁',
        bgColor: 'from-amber-400 to-orange-500',
        spoken: 'Animals live in different places! Pet animals live with us inside our homes, wild animals live in forests, and domestic animals live on farms!',
    },
    {
        title: 'Animal Habitats - Where They Live 🌿',
        text: 'A habitat is an animal home! Fish swim in water, land animals walk on the ground (cows, elephants), and birds fly high in the air!',
        emoji: '🌊',
        bgColor: 'from-gold-400 to-gold-500',
        spoken: 'A habitat is an animal home! Fish swim in water, land animals walk on the ground, and birds fly high in the air!',
    },
    {
        title: 'Special Body Parts 🦅',
        text: 'Every animal has special body parts! Birds have wings and beaks to fly and eat. Fish have fins and scales to swim. Elephants have long trunks!',
        emoji: '🐘',
        bgColor: 'from-emerald-400 to-teal-500',
        spoken: 'Every animal has special body parts! Birds have wings and beaks, fish have fins and scales, and elephants have long trunks!',
    },
    {
        title: 'Care and Compassion ❤️',
        text: 'Pets depend on us! They need healthy food, fresh water, a clean shelter, and lots of love. Never hurt or tease animals - they feel pain just like us!',
        emoji: '🐶',
        bgColor: 'from-pink-400 to-rose-500',
        spoken: 'Pets depend on us! They need healthy food, fresh water, a clean shelter, and lots of love. Never hurt or tease animals!',
    },
    {
        title: 'Ready for Zookeeper Duty? ⭐',
        text: 'Now you are ready to be an animal expert! Help Zookeeper Zoya sort animals, match habitats, name body parts, and show kindness!',
        emoji: '⭐',
        bgColor: 'from-purple-400 to-gold-500',
        spoken: 'Now you are ready to be an animal expert! Help Zookeeper Zoya sort animals, match habitats, and show kindness!',
    },
];
// ─── Types ────────────────────────────────────────────────────
type GameScreen = 'teaching' | 'play';
type ChallengeType = 'identify_pet' | 'identify_wild' | 'identify_domestic' | 'sort_animals' | 'identify_habitat' | 'identify_bodypart' | 'sort_habitats' | 'sort_parts';
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
        type: 'identify_pet',
        question: 'Which animal is a PET that lives with a family in a home?',
        answer: 'Dog',
        options: ['Dog', 'Lion', 'Tiger'],
        hint: 'Think: which of these animals lives inside our house and wags its tail when we come home?',
        misconception: 'A dog is a pet because it shares our home and has an owner! Lions and tigers live freely in the forest and are wild animals!',
    },
    {
        type: 'identify_wild',
        question: 'Which animal is WILD and lives freely in the forest with no owner?',
        answer: 'Lion',
        options: ['Cat', 'Lion', 'Cow'],
        hint: 'Think: which of these animals rests under a tree in the Gir Forest and finds its own food?',
        misconception: 'A lion is a wild animal because it lives in the jungle with no owner! Cats can be pets and cows are domestic farm animals!',
    },
    {
        type: 'identify_domestic',
        question: 'Which animal is DOMESTIC and reared on a farm for milk?',
        answer: 'Cow',
        options: ['Tiger', 'Cow', 'Parrot'],
        hint: 'Think: which animal lives on a village farm and gives us fresh milk?',
        misconception: 'A cow is a domestic animal reared on a farm for milk! Tigers are wild forest animals, and parrots can be pets or wild birds!',
    },
    {
        type: 'sort_animals',
        question: 'Drag each animal to its correct group! Pet, Wild, or Domestic?',
        answer: 'sort',
        options: [],
        hint: 'Pet = dog (at home). Wild = lion (in jungle). Domestic = cow (on farm)!',
        misconception: 'Remember: pets live in homes with owners, wild animals live freely in forests, and domestic animals live on farms for useful work or milk!',
        sortItems: [
            { id: 'dog', label: 'Pet Dog', emoji: '🐕', correctBin: 'pet' },
            { id: 'lion', label: 'Wild Lion', emoji: '🦁', correctBin: 'wild' },
            { id: 'cow', label: 'Domestic Cow', emoji: '🐄', correctBin: 'domestic' },
        ],
        bins: [
            { id: 'pet', label: 'Pet (Home) 🏠', color: '#3B82F6' },
            { id: 'wild', label: 'Wild (Forest) 🌲', color: '#10B981' },
            { id: 'domestic', label: 'Domestic (Farm) 🌾', color: '#F59E0B' },
        ],
    },
    {
        type: 'identify_habitat',
        question: 'Where does a FISH naturally live and swim?',
        answer: 'Water',
        options: ['Water', 'Land', 'Air'],
        hint: 'Think: where do fish swim all day using their fins?',
        misconception: 'A fish lives in water! Water is its natural habitat. Fish cannot walk on land or fly in the air!',
    },
    {
        type: 'identify_bodypart',
        question: 'Which body part helps a BIRD fly in the air?',
        answer: 'Wings',
        options: ['Wings', 'Fins', 'Hooves'],
        hint: 'Think: what does a pigeon or sparrow flap to soar through the sky?',
        misconception: 'Birds have wings to fly! Fish have fins for swimming, and cows have hooves for walking on land!',
    },
    {
        type: 'sort_habitats',
        question: 'Drag each animal to its correct habitat (Water, Land, or Air)!',
        answer: 'sort',
        options: [],
        hint: 'Fish = water, Cow = land, Bird = air!',
        misconception: 'Fish swim in water, land animals walk on the ground like cows, and birds fly in the air!',
        sortItems: [
            { id: 'fish', label: 'Fish', emoji: '🐟', correctBin: 'water' },
            { id: 'cow', label: 'Cow', emoji: '🐄', correctBin: 'land' },
            { id: 'bird', label: 'Bird', emoji: '🐦', correctBin: 'air' },
        ],
        bins: [
            { id: 'water', label: 'Water 💧', color: '#06B6D4' },
            { id: 'land', label: 'Land 🌍', color: '#84CC16' },
            { id: 'air', label: 'Air ☁️', color: '#8B5CF6' },
        ],
    },
    {
        type: 'sort_parts',
        question: 'Drag each special body part to the correct animal!',
        answer: 'sort',
        options: [],
        hint: 'Bird = wings, Fish = scales, Elephant = trunk!',
        misconception: 'Birds have wings for flying, fish have scales for swimming, and elephants have a long trunk for breathing and drinking!',
        sortItems: [
            { id: 'wings', label: 'Wings', emoji: '🪶', correctBin: 'bird' },
            { id: 'scales', label: 'Scales', emoji: '✨', correctBin: 'fish' },
            { id: 'trunk', label: 'Trunk', emoji: '🐘', correctBin: 'elephant' },
        ],
        bins: [
            { id: 'bird', label: 'Bird 🐦', color: '#EC4899' },
            { id: 'fish', label: 'Fish 🐠', color: '#3B82F6' },
            { id: 'elephant', label: 'Elephant 🐘', color: '#F97316' },
        ],
    },
];
// ─── Zookeeper Zoya Mascot Component ─���────────────────────────
function ZookeeperZoya({ mood, speaking }: {
    mood: 'happy' | 'celebrate' | 'thinking';
    speaking: string | null;
}) {
    return (<div className="absolute top-16 right-3 z-20 flex flex-col items-center">
      <AnimatePresence>
        {speaking && (<motion.div initial={{ scale: 0, opacity: 0, y: 10 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0, opacity: 0 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }} className="mb-1 bg-white rounded-xl px-3 py-2 shadow-lg max-w-[220px] border-2 border-emerald-500">
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
          {/* Zookeeper Zoya SVG */}
          {/* Hat / Cap */}
          <path d="M22 22 L53 22 L50 14 L25 14 Z" fill="#15803D"/>
          <ellipse cx="37.5" cy="22" rx="16" ry="4" fill="#166534"/>
          {/* Head */}
          <circle cx="37.5" cy="34" r="14" fill="#FFDBAC"/>
          {/* Hair */}
          <path d="M24 32 C24 24, 51 24, 51 32 L51 38 L24 38 Z" fill="#78350F"/>
          {/* Eyes */}
          <circle cx="32" cy="33" r="2" fill="#1F2937"/>
          <circle cx="43" cy="33" r="2" fill="#1F2937"/>
          {/* Smile */}
          <path d="M33 40 Q37.5 44 42 40" stroke="#1F2937" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          {/* Khaki uniform shirt */}
          <path d="M23 48 L52 48 L56 75 L19 75 Z" fill="#D97706"/>
          {/* Collar */}
          <path d="M30 48 L37.5 56 L45 48" fill="none" stroke="#B45309" strokeWidth="2"/>
          {/* Binoculars around neck */}
          <path d="M27 50 Q37.5 62 48 50" fill="none" stroke="#1F2937" strokeWidth="2"/>
          <rect x="31" y="55" width="5" height="7" rx="1" fill="#374151"/>
          <rect x="39" y="55" width="5" height="7" rx="1" fill="#374151"/>
          {/* Arms */}
          <ellipse cx="16" cy="60" rx="4" ry="10" fill="#D97706" transform="rotate(15 16 60)"/>
          <ellipse cx="59" cy="60" rx="4" ry="10" fill="#D97706" transform="rotate(-15 59 60)"/>
          {/* Feet */}
          <ellipse cx="29" cy="84" rx="5" ry="4" fill="#374151"/>
          <ellipse cx="46" cy="84" rx="5" ry="4" fill="#374151"/>
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
// ─── Zoo Scene Background ─────────────────────────────────────
function ZooScene({ width, height }: {
    width: number;
    height: number;
}) {
    return (<div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ width, height }}>
      {/* Sky gradient */}
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 720 560">
        <defs>
          <linearGradient id="zoo-sky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6EE7B7"/>
            <stop offset="30%" stopColor="#34D399"/>
            <stop offset="50%" stopColor="#10B981"/>
            <stop offset="80%" stopColor="#059669"/>
            <stop offset="100%" stopColor="#047857"/>
          </linearGradient>
        </defs>
        <rect width="720" height="560" fill="url(#zoo-sky)"/>
      </svg>
      {/* Sun */}
      <motion.div className="absolute top-4 left-4" animate={{ rotate: 360 }} transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}>
        <svg width="55" height="55" viewBox="0 0 55 55">
          <circle cx="27.5" cy="27.5" r="16" fill="#FBBF24" opacity="0.9"/>
          {[0, 45, 90, 135, 180, 225, 270, 315].map(angle => (<line key={angle} x1="27.5" y1="27.5" x2={27.5 + 24 * Math.cos(angle * Math.PI / 180)} y2={27.5 + 24 * Math.sin(angle * Math.PI / 180)} stroke="#FBBF24" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"/>))}
        </svg>
      </motion.div>
      {/* Clouds */}
      <motion.div className="absolute top-6 left-1/3 opacity-80" animate={{ x: [0, 30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}>
        <svg width="80" height="35" viewBox="0 0 80 35">
          <ellipse cx="25" cy="20" rx="18" ry="12" fill="white"/>
          <ellipse cx="45" cy="15" rx="22" ry="15" fill="white"/>
          <ellipse cx="60" cy="20" rx="15" ry="10" fill="white"/>
        </svg>
      </motion.div>
      {/* Tree in background */}
      <div className="absolute top-10 right-16 opacity-75">
        <svg width="60" height="80" viewBox="0 0 60 80">
          <rect x="25" y="45" width="10" height="35" fill="#78350F"/>
          <circle cx="30" cy="35" r="22" fill="#15803D"/>
          <circle cx="20" cy="25" r="18" fill="#16A34A"/>
          <circle cx="40" cy="25" r="18" fill="#22C55E"/>
        </svg>
      </div>
      {/* Ground grass hills at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-28" style={{ background: 'linear-gradient(180deg, #84CC16 0%, #65A30D 100%)' }}/>
      {/* Fence poles */}
      <div className="absolute bottom-12 left-0 right-0 flex justify-around opacity-40">
        {Array.from({ length: 12 }).map((_, i) => (<div key={i} className="w-2 h-16 bg-amber-900 rounded"/>))}
      </div>
    </div>);
}
// ─── Custom SVG Animal Icons ──────────────────────────────────
function DogIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 70">
      {/* Head */}
      <circle cx="35" cy="38" r="18" fill="#D97706"/>
      {/* Floppy ears */}
      <ellipse cx="20" cy="32" rx="6" ry="12" fill="#B45309" transform="rotate(20 20 32)"/>
      <ellipse cx="50" cy="32" rx="6" ry="12" fill="#B45309" transform="rotate(-20 50 32)"/>
      {/* Snout */}
      <ellipse cx="35" cy="44" rx="8" ry="6" fill="#FEF3C7"/>
      <circle cx="35" cy="42" r="3" fill="#1F2937"/>
      {/* Eyes */}
      <circle cx="29" cy="34" r="3" fill="#1F2937"/>
      <circle cx="41" cy="34" r="3" fill="#1F2937"/>
      <circle cx="30" cy="33" r="1" fill="white"/>
      <circle cx="42" cy="33" r="1" fill="white"/>
      {/* Tongue */}
      <path d="M33 47 Q35 53 37 47 Z" fill="#EF4444"/>
    </svg>);
}
function LionIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 70">
      {/* Mane */}
      <circle cx="35" cy="35" r="24" fill="#B45309"/>
      <circle cx="35" cy="35" r="20" fill="#D97706"/>
      {/* Face */}
      <circle cx="35" cy="37" r="15" fill="#FBBF24"/>
      {/* Ears */}
      <circle cx="23" cy="23" r="6" fill="#B45309"/>
      <circle cx="47" cy="23" r="6" fill="#B45309"/>
      {/* Eyes */}
      <circle cx="29" cy="34" r="2.5" fill="#1F2937"/>
      <circle cx="41" cy="34" r="2.5" fill="#1F2937"/>
      {/* Nose & Mouth */}
      <polygon points="32,40 38,40 35,44" fill="#1F2937"/>
      <path d="M35 44 L35 48 M31 48 Q35 52 39 48" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>);
}
function CowIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 70">
      {/* Head */}
      <rect x="20" y="22" width="30" height="26" rx="8" fill="white" stroke="#1F2937" strokeWidth="2"/>
      {/* Horns */}
      <path d="M22 24 L14 14 Q20 20 24 22 Z" fill="#9CA3AF"/>
      <path d="M48 24 L56 14 Q50 20 46 22 Z" fill="#9CA3AF"/>
      {/* Ears */}
      <ellipse cx="16" cy="32" rx="6" ry="4" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      <ellipse cx="54" cy="32" rx="6" ry="4" fill="white" stroke="#1F2937" strokeWidth="1.5"/>
      {/* Spots */}
      <circle cx="30" cy="30" r="5" fill="#1F2937"/>
      <circle cx="42" cy="38" r="4" fill="#1F2937"/>
      {/* Snout */}
      <ellipse cx="35" cy="42" rx="10" ry="6" fill="#FBCFE8" stroke="#1F2937" strokeWidth="1.5"/>
      <circle cx="31" cy="42" r="1.5" fill="#1F2937"/>
      <circle cx="39" cy="42" r="1.5" fill="#1F2937"/>
      {/* Eyes */}
      <circle cx="27" cy="28" r="2.5" fill="#1F2937"/>
      <circle cx="43" cy="28" r="2.5" fill="#1F2937"/>
    </svg>);
}
function FishIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 70">
      {/* Tail */}
      <path d="M50 35 L62 22 L62 48 Z" fill="#3B82F6"/>
      {/* Body */}
      <ellipse cx="32" cy="35" r="22" ry="14" fill="#60A5FA"/>
      {/* Scales pattern */}
      <path d="M25 28 Q28 32, 25 36 M33 26 Q36 31, 33 36" stroke="#93C5FD" strokeWidth="2" fill="none"/>
      {/* Fins */}
      <path d="M30 21 L36 12 L42 21 Z" fill="#2563EB"/>
      <path d="M30 49 L36 58 L42 49 Z" fill="#2563EB"/>
      {/* Eye */}
      <circle cx="18" cy="32" r="4" fill="white"/>
      <circle cx="17" cy="32" r="2" fill="#1F2937"/>
      {/* Mouth */}
      <path d="M12 37 Q15 35, 12 33" stroke="#1F2937" strokeWidth="2" fill="none" strokeLinecap="round"/>
    </svg>);
}
function BirdIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 70">
      {/* Wing */}
      <ellipse cx="32" cy="40" rx="12" ry="7" fill="#EC4899" transform="rotate(-20 32 40)"/>
      {/* Body */}
      <ellipse cx="35" cy="38" r="16" ry="12" fill="#F472B6"/>
      {/* Head */}
      <circle cx="47" cy="28" r="10" fill="#F472B6"/>
      {/* Beak */}
      <polygon points="55,27 65,25 55,31" fill="#F59E0B"/>
      {/* Eye */}
      <circle cx="49" cy="26" r="2" fill="#1F2937"/>
      {/* Tail feathers */}
      <path d="M19 38 L8 32 L12 44 Z" fill="#DB2777"/>
      {/* Legs */}
      <line x1="30" y1="50" x2="27" y2="60" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
      <line x1="40" y1="50" x2="43" y2="60" stroke="#F59E0B" strokeWidth="2" strokeLinecap="round"/>
    </svg>);
}
function ElephantIcon({ size = 65 }: {
    size?: number;
}) {
    return (<svg width={size} height={size} viewBox="0 0 70 70">
      {/* Body */}
      <ellipse cx="38" cy="40" r="18" fill="#9CA3AF"/>
      {/* Head */}
      <circle cx="26" cy="32" r="14" fill="#9CA3AF"/>
      {/* Ear */}
      <ellipse cx="22" cy="30" rx="8" ry="10" fill="#D1D5DB"/>
      {/* Trunk */}
      <path d="M18 36 Q10 42, 12 52 Q14 58, 18 56" stroke="#9CA3AF" strokeWidth="6" fill="none" strokeLinecap="round"/>
      {/* Tusk */}
      <path d="M18 42 L12 46" stroke="white" strokeWidth="3" strokeLinecap="round"/>
      {/* Eye */}
      <circle cx="24" cy="29" r="2" fill="#1F2937"/>
      {/* Legs */}
      <rect x="28" y="52" width="6" height="12" rx="2" fill="#6B7280"/>
      <rect x="44" y="52" width="6" height="12" rx="2" fill="#6B7280"/>
    </svg>);
}
// ─── Sort Card Component ───────────────────────────────────────
function renderSortIcon(id: string, size: number = 48) {
    if (id.includes('dog'))
        return <DogIcon size={size}/>;
    if (id.includes('pet'))
        return <DogIcon size={size}/>;
    if (id.includes('lion'))
        return <LionIcon size={size}/>;
    if (id.includes('wild'))
        return <LionIcon size={size}/>;
    if (id.includes('cow'))
        return <CowIcon size={size}/>;
    if (id.includes('domestic'))
        return <CowIcon size={size}/>;
    if (id.includes('land'))
        return <CowIcon size={size}/>;
    if (id.includes('fish'))
        return <FishIcon size={size}/>;
    if (id.includes('water'))
        return <FishIcon size={size}/>;
    if (id.includes('scales'))
        return <FishIcon size={size}/>;
    if (id.includes('bird'))
        return <BirdIcon size={size}/>;
    if (id.includes('air'))
        return <BirdIcon size={size}/>;
    if (id.includes('wings'))
        return <BirdIcon size={size}/>;
    if (id.includes('elephant'))
        return <ElephantIcon size={size}/>;
    if (id.includes('trunk'))
        return <ElephantIcon size={size}/>;
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
      <div className={`flex flex-col items-center justify-center rounded-xl shadow-lg ${placed ? 'opacity-40' : 'bg-white'} px-3 py-2 border-2 border-gold-200`} style={{ width: 110, height: 95 }}>
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
    return (<div className={`absolute rounded-2xl flex flex-col items-center justify-center border-4 transition-all ${isHovering ? 'scale-105 brightness-110' : ''}`} style={{ left: x, top: y, width, height, borderColor: color, background: `${color}22`, boxShadow: isHovering ? `0 0 20px ${color}` : 'none' }}>
      <div className="text-sm font-bold text-center px-1" style={{ color }}>{label}</div>
    </div>);
}

// ─── Teaching Screen ──────────────────────────────────────────

function TeachingScreen({ onStart, width, height }: {
    onStart: () => void;
    width: number;
    height: number;
}) {
  const [slide, setSlide] = useState(0);
  const total = TEACHING_SLIDES.length;
  const current = TEACHING_SLIDES[slide];

  const handleNext = () => {
    audioManager.play('tap');
    if (slide < total - 1) {
      setSlide(slide + 1);
    } else {
      audioManager.play('success');
      onStart();
    }
  };

  const handlePrev = () => {
    audioManager.play('tap');
    if (slide > 0) setSlide(slide - 1);
  };

  return (
    <div className="relative flex flex-col items-center justify-between p-6 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-800 text-white" style={{ width, height }}>
      <ZooScene width={width} height={height}/>

      {/* Top bar */}
      <div className="relative z-10 w-full flex items-center justify-between px-2">
        <div className="text-xl font-extrabold tracking-wide drop-shadow">🐾 Animal Explorer 🦁</div>
        <div className="flex gap-1.5">
          {TEACHING_SLIDES.map((_, i) => (<div key={i} className={`h-2.5 rounded-full transition-all ${i === slide ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/40'}`}/>))}
        </div>
      </div>

      {/* Slide Content Card */}
      <motion.div key={slide} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: -20 }} transition={{ duration: 0.3 }} className="relative z-10 bg-white/95 text-gray-800 rounded-3xl p-6 shadow-2xl max-w-lg w-full flex flex-col items-center text-center backdrop-blur-md my-auto border-4 border-amber-300">
        <div className="text-6xl mb-3 animate-bounce">{current.emoji}</div>
        <h2 className="text-2xl font-black text-emerald-800 mb-2">{current.title}</h2>
        <p className="text-base font-medium text-gray-700 leading-relaxed mb-4">{current.text}</p>
        <div className="flex items-center gap-3 w-full justify-between mt-2">
          {slide > 0 ? (<button onClick={handlePrev} className="px-5 py-2.5 rounded-2xl bg-gray-200 text-gray-700 font-bold hover:bg-gray-300 transition-all shadow">
              ⬅️ Back
            </button>) : <div />}
          <button onClick={handleNext} className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-extrabold text-lg hover:brightness-110 transition-all shadow-lg active:scale-95">
            {slide === total - 1 ? 'Start Game! 🚀' : 'Next ➡️'}
          </button>
        </div>
      </motion.div>

      <div className="relative z-10 text-xs text-white/80 font-medium pb-2">ICSE / CISCE Class 1 Biology Curriculum</div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────

export interface AnimalTypesGameProps {
  width?: number;
  height?: number;
  onComplete?: (score: number) => void;
}

export function AnimalTypesGame({ width = 720, height = 560, onComplete }: AnimalTypesGameProps) {
  const [screen, setScreen] = useState<GameScreen>('teaching');
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [errors, setErrors] = useState(0);
  const [stars, setStars] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [hintText, setHintText] = useState<string | null>(null);
  const [mascotMood, setMascotMood] = useState<'happy' | 'celebrate' | 'thinking'>('happy');
  const [mascotSpeech, setMascotSpeech] = useState<string | null>('Hello! I am Zookeeper Zoya. Let us explore the animal kingdom!');
  const [isGameOver, setIsGameOver] = useState(false);

  // Sort challenge state
  const [sortPlacements, setSortPlacements] = useState<Record<string, string>>();
  const [hoverBin, setHoverBin] = useState<string | null>(null);

  const challenge = CHALLENGES[currentChallengeIndex];

  // Inactivity hint timer
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      if (screen === 'play' && !isGameOver) {
        setHintText(challenge.hint);
        setMascotMood('thinking');
        setMascotSpeech('Need a hint? Check the bubble below!');
        speechManager.speak('Need a hint? Check the bubble below!');
        audioManager.play('hint');
      }
    }, 10000);
  }, [challenge, screen, isGameOver]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      speechManager.stop();
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [currentChallengeIndex, resetInactivityTimer]);

  // Reset sort placements when challenge changes
  useEffect(() => {
    setSortPlacements({});
  }, [currentChallengeIndex]);

  // Multiple choice answer handler
  const handleAnswerSelect = (option: string) => {
    audioManager.play('tap');
    resetInactivityTimer();

    if (option === challenge.answer) {
      audioManager.play('success');
      setMascotMood('celebrate');
      setMascotSpeech('Wonderful job! That is correct!');
      speechManager.speak('Wonderful job! That is correct!');
      setStars(prev => prev + 1);
      setScore(prev => prev + 15);
      setShowConfetti(true);
      setShowSparkle(true);
      setSuccessMessage('Fantastic! Correct answer! ⭐');
    } else {
      audioManager.play('error');
      setErrors(prev => prev + 1);
      setMascotMood('thinking');
      setMascotSpeech(challenge.misconception);
      speechManager.speak(challenge.misconception);
      setHintText(challenge.misconception);
    }
  };

  // Drag and drop handlers for sorting challenges
  const handleDragStart = (_id: string) => {
    audioManager.play('pickup');
    resetInactivityTimer();
  };

  const handleDragEnd = (id: string, x: number, y: number): boolean => {
    if (!challenge.bins || !challenge.sortItems) return false;

    // Check bin bounds
    for (const bin of challenge.bins) {
      let binBox = { x: 0, y: 0, w: 180, h: 120 };
      if (bin.id === 'pet' || bin.id === 'water' || bin.id === 'save' || bin.id === 'source' || bin.id === 'bird') {
        binBox = { x: 50, y: 160, w: 180, h: 120 };
      } else if (bin.id === 'wild' || bin.id === 'land' || bin.id === 'waste' || bin.id === 'not-source' || bin.id === 'fish') {
        binBox = { x: 270, y: 160, w: 180, h: 120 };
      } else {
        binBox = { x: 490, y: 160, w: 180, h: 120 };
      }

      if (x >= binBox.x && x <= binBox.x + binBox.w && y >= binBox.y && y <= binBox.y + binBox.h) {
        setHoverBin(null);
        const item = challenge.sortItems?.find(i => i.id === id);
        if (item && item.correctBin === bin.id) {
          audioManager.play('drop-correct');
          setSortPlacements(prev => ({ ...prev, [id]: bin.id }));

          // Check if all items placed correctly
          const newPlacements = { ...sortPlacements, [id]: bin.id };
          if (challenge.sortItems && Object.keys(newPlacements).length === challenge.sortItems.length) {
            audioManager.play('success');
            setMascotMood('celebrate');
            setMascotSpeech('All sorted perfectly! Amazing!');
            speechManager.speak('All sorted perfectly! Amazing!');
            setStars(prev => prev + 1);
            setScore(prev => prev + 20);
            setShowConfetti(true);
            setShowSparkle(true);
            setSuccessMessage('Great sorting! All correct! 🌟');
          }
          return true;
        } else {
          audioManager.play('drop-wrong');
          setErrors(prev => prev + 1);
          setMascotMood('thinking');
          setMascotSpeech(challenge.misconception);
          speechManager.speak(challenge.misconception);
          setHintText(challenge.misconception);
          return false;
        }
      }
    }
    setHoverBin(null);
    return false;
  };

  const handleNextChallenge = () => {
    audioManager.play('tap');
    setSuccessMessage(null);
    setHintText(null);
    setShowSparkle(false);
    setMascotMood('happy');
    setMascotSpeech('Let us tackle the next question!');
    speechManager.speak('Let us tackle the next question!');

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
      audioManager.play('celebration');
      setMascotMood('celebrate');
      setMascotSpeech('You finished all challenges! You are a true Zookeeper!');
      speechManager.speak('You finished all challenges! You are a true Zookeeper!');
      const finalScore = Math.max(0, 100 - errors * 5);
      if (onComplete) onComplete(finalScore);
    }
  };

  if (screen === 'teaching') {
    return <TeachingScreen onStart={() => setScreen('play')} width={width} height={height}/>;
  }

  return (
    <div className="relative flex flex-col items-center justify-between p-5 rounded-3xl shadow-2xl overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-900 text-white select-none" style={{ width, height }}>
      <ZooScene width={width} height={height}/>
      <ZookeeperZoya mood={mascotMood} speaking={mascotSpeech}/>

      {/* Top Header */}
      <div className="relative z-10 w-full flex items-center justify-between px-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold bg-white/20 px-3 py-1 rounded-full backdrop-blur">
            Level {currentChallengeIndex + 1} / {CHALLENGES.length}
          </span>
          <StarRow count={stars} total={CHALLENGES.length}/>
        </div>
        <div className="text-lg font-extrabold tracking-wider bg-black/20 px-4 py-1 rounded-full backdrop-blur">
          Score: {score}
        </div>
      </div>

      {/* Question Card */}
      <div className="relative z-10 my-auto bg-white/95 text-gray-800 rounded-3xl p-6 shadow-2xl max-w-xl w-full flex flex-col items-center text-center backdrop-blur-md border-4 border-emerald-400">
        <h3 className="text-xl font-black text-emerald-900 mb-4">{challenge.question}</h3>

        {/* Multiple Choice Options */}
        {challenge.answer !== 'sort' && challenge.options && (<div className="grid grid-cols-3 gap-4 w-full mt-2">
            {challenge.options.map((opt, i) => {
                const isCorrect = opt === challenge.answer;
                const isChosen = successMessage !== null;
                return (<button key={i} disabled={isChosen} onClick={() => handleAnswerSelect(opt)} className={`flex flex-col items-center justify-center p-4 rounded-2xl font-bold text-base shadow-lg transition-all transform active:scale-95 ${isChosen
                        ? isCorrect
                            ? 'bg-green-500 text-white ring-4 ring-green-300'
                            : 'bg-gray-200 text-gray-400 opacity-60'
                        : 'bg-gradient-to-b from-amber-100 to-amber-200 text-amber-900 hover:scale-105 border-2 border-amber-300'}`}>
                  <span className="text-3xl mb-1">
                    {opt === 'Dog' || opt === 'Cat' ? '🐕' : opt === 'Lion' || opt === 'Tiger' ? '🦁' : opt === 'Cow' ? '🐄' : opt === 'Water' ? '💧' : opt === 'Land' ? '🌍' : opt === 'Air' ? '☁️' : opt === 'Wings' ? '🪶' : '⭐'}
                  </span>
                  {opt}
                </button>);
            })}
          </div>)}

        {/* Sort Challenge Area */}
        {challenge.answer === 'sort' && challenge.bins && challenge.sortItems && (<div className="relative w-full h-64 mt-2">
            {/* Bins */}
            <div className="absolute inset-0 flex justify-around items-start pt-2">
              {challenge.bins.map((bin, i) => (<SortBin key={bin.id} label={bin.label} color={bin.color} x={i * 200 + 10} y={10} width={180} height={110} isHovering={hoverBin === bin.id}/>))}
            </div>

            {/* Draggable Items */}
            <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-6">
              {challenge.sortItems.map((item, i) => {
                const placed = !!sortPlacements[item.id];
                const startPositions = [{ x: 60, y: 140 }, { x: 280, y: 140 }, { x: 500, y: 140 }];
                const pos = startPositions[i] || { x: 100, y: 140 };
                return (<SortCard key={item.id} id={item.id} label={item.label} emoji={item.emoji} x={pos.x} y={pos.y} placed={placed} onDragStart={handleDragStart} onDragEnd={handleDragEnd}/>);
            })}
            </div>
          </div>)}
      </div>

      {/* Success Banner / Hint Feedback */}
      {successMessage && (<SuccessBanner message={successMessage} onComplete={handleNextChallenge}/>)}

      {hintText && !successMessage && (<HintBubble message={hintText} onComplete={() => setHintText(null)}/>)}

      {showConfetti && (<Confetti onComplete={() => setShowConfetti(false)}/>)}

      {showSparkle && (<SparkleBurst x={width / 2} y={height / 2} onComplete={() => setShowSparkle(false)}/>)}

      {/* Footer Next Button for multiple choice when correct */}
      {successMessage && challenge.answer !== 'sort' && (<div className="relative z-20 pb-2">
          <button onClick={handleNextChallenge} className="px-8 py-3 rounded-2xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-lg shadow-xl hover:scale-105 transition-all">
            Next Challenge ➡️
          </button>
        </div>)}

      {/* Sort Complete Next Button */}
      {challenge.answer === 'sort' && challenge.sortItems && Object.keys(sortPlacements).length === challenge.sortItems.length && !successMessage && (<div className="relative z-20 pb-2">
          <button onClick={handleNextChallenge} className="px-8 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-extrabold text-lg shadow-xl hover:scale-105 transition-all">
            Next Challenge ➡️
          </button>
        </div>)}
    </div>
  );
}
