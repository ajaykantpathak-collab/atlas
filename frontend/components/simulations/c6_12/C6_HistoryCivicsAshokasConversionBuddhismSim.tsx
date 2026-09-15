'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from 'recharts';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDENTIFIERS ───
const NODE_C6_HISTCIV_041 = 'c6_histciv_041';
const NODE_C6_HISTCIV_042 = 'c6_histciv_042';
const NODE_C6_HISTCIV_043 = 'c6_histciv_043';
const NODE_C6_HISTCIV_044 = 'c6_histciv_044';
const NODE_C6_HISTCIV_045 = 'c6_histciv_045';
const NODE_C6_HISTCIV_046 = 'c6_histciv_046';
const NODE_C6_HISTCIV_047 = 'c6_histciv_047';
const NODE_C6_HISTCIV_048 = 'c6_histciv_048';
const NODE_C6_HISTCIV_049 = 'c6_histciv_049';
const NODE_C6_HISTCIV_050 = 'c6_histciv_050';

const ALL_NODE_IDS = [
  NODE_C6_HISTCIV_041,
  NODE_C6_HISTCIV_042,
  NODE_C6_HISTCIV_043,
  NODE_C6_HISTCIV_044,
  NODE_C6_HISTCIV_045,
  NODE_C6_HISTCIV_046,
  NODE_C6_HISTCIV_047,
  NODE_C6_HISTCIV_048,
  NODE_C6_HISTCIV_049,
  NODE_C6_HISTCIV_050,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The Imperial Epigraphist: From Mauryan Dhamma to Gupta Grandeur',
  intro: 'You are the Chief Royal Epigraphist and Historian of Ancient India. Two great dynasties — the Mauryas and the Guptas — transformed the subcontinent from fragmented kingdoms into unified empires of moral philosophy, public welfare, and classical brilliance.',
  context: 'Examine original stone edicts, decipher Brahmi inscriptions, balance imperial budgets, manage municipal boards in Pataliputra, evaluate Samudragupta\'s tributary campaigns, and debate the true legacy of the Gupta Golden Age.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In 261 BCE, Emperor Ashoka won the brutal Kalinga War with over 100,000 casualties. How did he respond immediately to this total military triumph?',
  options: [
    'He celebrated with a grand Ashvamedha horse sacrifice and annexed southern kingdoms',
    'He felt overwhelming remorse, embraced Buddhist compassion (karuna), and renounced military conquest',
    'He built stone fortresses and doubled the size of his imperial standing army',
    'He made Sanskrit the compulsory language across all provinces to enforce discipline',
  ],
  correctIndex: 1,
  hintAfter: 'A victorious emperor abandoning war for moral welfare is one of the rarest transformations in world history. Let us explore how it happened!',
};

// ─── TOPIC-SPECIFIC SVG DIAGRAM 1: SARNATH LION CAPITAL & ASHOKA PILLAR ───
function AshokanPillarSVG() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-[340px] mx-auto drop-shadow-xl" role="img" aria-label="Diagram of Ashoka's Sarnath Lion Capital and Column">
      <defs>
        <linearGradient id="pillarGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#78350f" />
        </linearGradient>
        <linearGradient id="stoneShaftGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#475569" />
          <stop offset="50%" stopColor="#94a3b8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
        <radialGradient id="glowRad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background ambient glow */}
      <circle cx="200" cy="110" r="100" fill="url(#glowRad)" />

      {/* 4 Back-to-Back Lions (Front silhouette & Side flanking profiles) */}
      <g transform="translate(140, 20)">
        {/* Left Lion Profile */}
        <path d="M 30 55 C 10 40 15 15 35 25 C 20 20 25 5 45 15 C 40 5 60 10 55 35 Z" fill="url(#pillarGoldGrad)" opacity="0.9" />
        {/* Right Lion Profile */}
        <path d="M 90 55 C 110 40 105 15 85 25 C 100 20 95 5 75 15 C 80 5 60 10 65 35 Z" fill="url(#pillarGoldGrad)" opacity="0.9" />
        {/* Center Main Lion */}
        <path d="M 42 60 C 35 40 40 15 60 10 C 80 15 85 40 78 60 C 90 70 85 85 60 88 C 35 85 30 70 42 60 Z" fill="url(#pillarGoldGrad)" />
        {/* Center Lion Face Details */}
        <ellipse cx="60" cy="38" rx="14" ry="16" fill="#78350f" opacity="0.6" />
        <circle cx="53" cy="34" r="3" fill="#fef3c7" />
        <circle cx="67" cy="34" r="3" fill="#fef3c7" />
        <circle cx="53" cy="34" r="1.5" fill="#1e293b" />
        <circle cx="67" cy="34" r="1.5" fill="#1e293b" />
        {/* Mane strands */}
        <path d="M 45 45 Q 35 60 48 72 M 75 45 Q 85 60 72 72 M 60 48 L 60 68" stroke="#fef3c7" strokeWidth="1.5" fill="none" />
      </g>

      {/* Abacus with Relief Sculptures & Ashoka Chakra */}
      <rect x="130" y="110" width="140" height="28" rx="4" fill="#d97706" stroke="#fbbf24" strokeWidth="1.5" />
      
      {/* 24-Spoked Central Ashoka Chakra on Abacus */}
      <g transform="translate(200, 124)">
        <circle cx="0" cy="0" r="10" fill="#0f172a" stroke="#fbbf24" strokeWidth="1.5" />
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="0"
            y1="-9"
            x2="0"
            y2="9"
            stroke="#fbbf24"
            strokeWidth="0.8"
            transform={`rotate(${i * 15})`}
          />
        ))}
        <circle cx="0" cy="0" r="2.5" fill="#fbbf24" />
      </g>

      {/* Flanking Relief Animals (Horse & Bull representations) */}
      <text x="145" y="128" fill="#fef3c7" fontSize="10" fontWeight="bold">🐎</text>
      <text x="242" y="128" fill="#fef3c7" fontSize="10" fontWeight="bold">🐂</text>

      {/* Inverted Bell-shaped Lotus Base */}
      <path d="M 140 138 C 150 165 250 165 260 138 Z" fill="url(#pillarGoldGrad)" stroke="#fbbf24" strokeWidth="1.5" />
      {/* Lotus Petal Lines */}
      <path d="M 160 138 Q 170 158 175 163 M 200 138 L 200 165 M 240 138 Q 230 158 225 163" stroke="#78350f" strokeWidth="1.5" fill="none" />

      {/* Monolithic Polished Chunar Sandstone Shaft */}
      <path d="M 175 165 L 170 300 L 230 300 L 225 165 Z" fill="url(#stoneShaftGrad)" stroke="#334155" strokeWidth="2" />

      {/* Brahmi Inscription Glyphs Carved on Shaft */}
      <g fill="#fef3c7" opacity="0.85" fontSize="11" fontFamily="monospace">
        <text x="182" y="200">𑀤𑁂𑀯𑀸𑀦𑀁</text>
        <text x="182" y="225">𑀧𑀺𑀬𑁂𑀦</text>
        <text x="180" y="250">𑀧𑀺𑀬𑀤𑀲𑀺</text>
        <text x="182" y="275">𑀮𑀸𑀚𑀺𑀦𑀸</text>
      </g>

      {/* Annotation Labels */}
      <path d="M 270 35 L 310 35" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" />
      <text x="315" y="38" fill="#fbbf24" fontSize="9" fontWeight="bold">4 Sovereign Lions</text>

      <path d="M 272 124 L 310 124" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" />
      <text x="315" y="127" fill="#38bdf8" fontSize="9" fontWeight="bold">24-Spoke Chakra</text>

      <path d="M 262 152 L 310 152" stroke="#fbbf24" strokeWidth="1" strokeDasharray="2,2" />
      <text x="315" y="155" fill="#fcd34d" fontSize="9" fontWeight="bold">Inverted Lotus</text>

      <path d="M 230 238 L 305 238" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />
      <text x="310" y="241" fill="#94a3b8" fontSize="9" fontWeight="bold">Prakrit Edicts</text>
    </svg>
  );
}

// ���── TOPIC-SPECIFIC SVG DIAGRAM 2: PATALIPUTRA MUNICIPAL COUNCIL (6 BOARDS) ───
function PataliputraMunicipalSVG() {
  const boards = [
    { title: 'I. Industrial Arts', icon: '⚒️', color: '#f59e0b' },
    { title: 'II. Foreign Care', icon: '🌐', color: '#3b82f6' },
    { title: 'III. Vital Census', icon: '📜', color: '#10b981' },
    { title: 'IV. Trade & Weights', icon: '⚖️', color: '#8b5cf6' },
    { title: 'V. Manufactured', icon: '🏺', color: '#ec4899' },
    { title: 'VI. 10% Sales Tax', icon: '💰', color: '#14b8a6' },
  ];

  return (
    <svg viewBox="0 0 500 240" className="w-full max-w-[480px] mx-auto drop-shadow-xl" role="img" aria-label="Structure of the 6 Municipal Boards of Pataliputra">
      {/* Central Municipal Council Hub */}
      <rect x="170" y="10" width="160" height="42" rx="10" fill="#1e1b4b" stroke="#818cf8" strokeWidth="2" />
      <text x="250" y="28" fill="#e0e7ff" fontSize="11" fontWeight="bold" textAnchor="middle">Pataliputra City Council</text>
      <text x="250" y="44" fill="#a5b4fc" fontSize="9" textAnchor="middle">30 Commissioners (6 Boards × 5 Members)</text>

      {/* Connecting Hub Lines */}
      {boards.map((b, i) => {
        const x = 45 + (i % 3) * 155;
        const y = i < 3 ? 90 : 170;
        return (
          <g key={i}>
            <line x1="250" y1="52" x2={x + 70} y2={y} stroke="#6366f1" strokeWidth="1.5" strokeDasharray="3,3" opacity="0.6" />
            <rect x={x} y={y} width="140" height="55" rx="8" fill="#0f172a" stroke={b.color} strokeWidth="1.5" />
            <text x={x + 10} y={y + 22} fontSize="14">{b.icon}</text>
            <text x={x + 32} y={y + 22} fill="#f8fafc" fontSize="10" fontWeight="bold">{b.title}</text>
            <text x={x + 10} y={y + 42} fill="#94a3b8" fontSize="8">5 Overseers • Indica Megasthenes</text>
          </g>
        );
      })}
    </svg>
  );
}

// ─── TOPIC-SPECIFIC SVG DIAGRAM 3: GUPTA STRATEGY & NUMISMATIC DUALITY ───
function GuptaStrategySVG() {
  return (
    <svg viewBox="0 0 520 220" className="w-full max-w-[500px] mx-auto drop-shadow-xl" role="img" aria-label="Gupta Empire Strategic Division and Imperial Coins">
      <defs>
        <radialGradient id="goldCoinRad" cx="40%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#fef08a" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#78350f" />
        </radialGradient>
      </defs>

      {/* Left Card: Aryavarta Direct Annexation */}
      <rect x="15" y="15" width="235" height="190" rx="12" fill="#1e1b4b" stroke="#f43f5e" strokeWidth="1.5" />
      <rect x="25" y="25" width="215" height="24" rx="6" fill="#be123c" />
      <text x="132" y="41" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">⚔️ Aryavarta (North India)</text>
      <text x="30" y="68" fill="#fda4af" fontSize="9" fontWeight="bold">• Policy: Direct Extirpation & Rule</text>
      <text x="30" y="85" fill="#cbd5e1" fontSize="8.5">9 Kings defeated (Nagasena, Rudradeva)</text>
      <text x="30" y="100" fill="#cbd5e1" fontSize="8.5">Land annexed directly to Pataliputra base</text>
      
      {/* Ashvamedha Coin Graphic */}
      <g transform="translate(132, 145)">
        <circle cx="0" cy="0" r="32" fill="url(#goldCoinRad)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="0" y="4" fontSize="18" textAnchor="middle">🐎</text>
        <text x="0" y="22" fill="#78350f" fontSize="6.5" fontWeight="black" textAnchor="middle">ASHVAMEDHA</text>
      </g>
      <text x="132" y="195" fill="#fbcfe8" fontSize="8" textAnchor="middle">Universal Sovereign (Chakravartin)</text>

      {/* Right Card: Dakshinapatha Grahana-Moksha-Anugraha */}
      <rect x="270" y="15" width="235" height="190" rx="12" fill="#0f291e" stroke="#10b981" strokeWidth="1.5" />
      <rect x="280" y="25" width="215" height="24" rx="6" fill="#047857" />
      <text x="387" y="41" fill="#fff" fontSize="11" fontWeight="bold" textAnchor="middle">🤝 Dakshinapatha (South India)</text>
      <text x="285" y="68" fill="#6ee7b7" fontSize="9" fontWeight="bold">• Grahana ➔ Moksha ➔ Anugraha</text>
      <text x="285" y="85" fill="#cbd5e1" fontSize="8.5">12 Kings captured, freed & reinstated</text>
      <text x="285" y="100" fill="#cbd5e1" fontSize="8.5">Tribute & fealty accepted (1,500 km away)</text>

      {/* Lyrist Veena Coin Graphic */}
      <g transform="translate(387, 145)">
        <circle cx="0" cy="0" r="32" fill="url(#goldCoinRad)" stroke="#fbbf24" strokeWidth="1.5" />
        <text x="0" y="4" fontSize="18" textAnchor="middle">🪕</text>
        <text x="0" y="22" fill="#78350f" fontSize="6.5" fontWeight="black" textAnchor="middle">KAVIRAJA</text>
      </g>
      <text x="387" y="195" fill="#a7f3d0" fontSize="8" textAnchor="middle">Poet-King & Cultural Patron</text>
    </svg>
  );
}

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'drag-label' | 'drag-sort' | 'numeric' | 'construct';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation' | 'creativity';
  question: string;
  options?: string[];
  correctIndex?: number;
  dragItems?: { label: string; targetId: string }[];
  correctMapping?: Record<string, string>;
  sortItems?: string[];
  correctOrder?: number[];
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  availableParts?: string[];
  targetState?: string;
  validationHint?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  bloomLevel?: string;
}

// ─── 22 CHALLENGES (Spanning All 10 Nodes) ───
const CHALLENGES: Challenge[] = [
  // Foundation Tier (6 challenges)
  {
    id: 'ch_f01',
    nodeId: NODE_C6_HISTCIV_041,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which Buddhist council was convened by Ashoka at Pataliputra around 250 BCE to purify the Sangha, and who presided over it?',
    options: [
      'First Buddhist Council under King Ajatashatru',
      'Second Buddhist Council at Vaishali under Sabakami',
      'Third Buddhist Council under Moggaliputta Tissa',
      'Fourth Buddhist Council in Kashmir under Vasumitra',
    ],
    correctIndex: 2,
    explanation: 'Ashoka convened the Third Buddhist Council at Pataliputra around 250 BCE, presided over by the elder monk Moggaliputta Tissa, to settle doctrinal disputes and prepare foreign missionary work.',
    hints: [
      'The first council was at Rajgriha and the second was at Vaishali.',
      'Ashoka ruled from Pataliputra and his spiritual guide was an elder monk named Tissa.',
      'It was the Third Buddhist Council presided over by Moggaliputta Tissa.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_f02',
    nodeId: NODE_C6_HISTCIV_043,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Who successfully deciphered the ancient Brahmi script of Ashoka\'s edicts in 1837 CE by identifying the titles "Devanampiya" and "Piyadasi"?',
    options: [
      'Sir William Jones',
      'James Prinsep',
      'Alexander Cunningham',
      'Mortimer Wheeler',
    ],
    correctIndex: 1,
    explanation: 'James Prinsep, a scholar-official of the East India Company in Calcutta, deciphered the Brahmi script in 1837 CE, unlocking Ashoka\'s inscriptions after nearly 2,000 years.',
    hints: [
      'He worked at the Calcutta Mint and the Asiatic Society of Bengal.',
      'His breakthrough happened in 1837 by matching royal epigraph titles.',
      'The scholar was James Prinsep.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_f03',
    nodeId: NODE_C6_HISTCIV_044,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What was the specific administrative role of a royal prince bearing the title Kumara or Aryaputra in the Mauryan Empire?',
    options: [
      'Commander-in-chief of the navy stationed at Tamralipti',
      'Governor of one of the four imperial provinces (e.g., Taxila, Ujjain, Tosali, Suvarnagiri)',
      'Chief justice of the municipal city boards in Pataliputra',
      'Secret spy monitoring revenue collection in rural villages',
    ],
    correctIndex: 1,
    explanation: 'Kumaras (royal princes) governed the four great provinces: Taxila (northwest), Ujjain (west), Tosali (east), and Suvarnagiri (south). This ensured trusted royal bloodlines controlled distant frontiers.',
    hints: [
      'The Mauryan Empire was divided into four vast outlying territories.',
      'The emperor wanted family members to govern distant provincial headquarters.',
      'A Kumara served as a royal provincial governor.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_f04',
    nodeId: NODE_C6_HISTCIV_047,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why is Chandragupta I considered the real founder of the Gupta Empire, rather than his grandfather Sri Gupta or father Ghatotkacha?',
    options: [
      'He was the first to adopt the imperial title Maharajadhiraja and start the Gupta Era in 319 CE',
      'He defeated Alexander the Great in the Punjab',
      'He built the Iron Pillar of Delhi and carved Ajanta Cave 1',
      'He converted to Jainism and retired to Shravanabelagola',
    ],
    correctIndex: 0,
    explanation: 'Sri Gupta and Ghatotkacha were petty regional chiefs of Magadha. Chandragupta I was the first to assume the title Maharajadhiraja ("King of Great Kings"), forge the prestigious Lichchhavi marriage alliance, and launch the Gupta Era in 319 CE.',
    hints: [
      'Genealogical priority does not equal political foundation.',
      'Look for the imperial title meaning "King of Great Kings" and the calendar of 319 CE.',
      'Chandragupta I assumed Maharajadhiraja and founded the Gupta Era.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_f05',
    nodeId: NODE_C6_HISTCIV_046,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'During which Gupta emperor\'s reign did the Chinese Buddhist pilgrim Fa Hien travel through India (405–411 CE)?',
    options: [
      'Chandragupta I',
      'Samudragupta',
      'Chandragupta II Vikramaditya',
      'Skandagupta',
    ],
    correctIndex: 2,
    explanation: 'Fa Hien visited India during the reign of Chandragupta II Vikramaditya (c. 380–415 CE), recording peaceful administration, prosperous cities, and charitable rest houses in his Fo-kwo-ki.',
    hints: [
      'It was during the reign of Samudragupta\'s son who defeated the Shakas.',
      'This emperor also adopted the title Vikramaditya.',
      'Fa Hien visited under Chandragupta II Vikramaditya.',
    ],
    misconceptionIndex: 5,
  },
  {
    id: 'ch_f06',
    nodeId: NODE_C6_HISTCIV_045,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In the Mauryan economy, what fractional share of agricultural produce did the state claim as customary land revenue (known as bhaga)?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'th (one-sixth = 1/6)',
    explanation: 'The standard Mauryan agrarian tax was bhaga, set at one-sixth (1/6) of the agricultural harvest, which financed the army, bureaucracy, and royal welfare works.',
    hints: [
      'It is a standard Vedic and Mauryan fraction of the crop.',
      'Enter the denominator: if the fraction is 1/6, the number is 6.',
      'The fraction is one-sixth (enter 6).',
    ],
  },

  // Standard Tier (8 challenges)
  {
    id: 'ch_s01',
    nodeId: NODE_C6_HISTCIV_042,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'How did Ashoka\'s Dhamma differ fundamentally from sectarian Buddhist religious doctrine?',
    options: [
      'Dhamma enforced the Four Noble Truths, the Eightfold Path, and monastic Vinaya rules upon all citizens',
      'Dhamma was a universal secular moral code (ahimsa, truth, tolerance, kindness) that omitted sectarian doctrines',
      'Dhamma was a militant Vedic ritual system demanding compulsory animal sacrifices',
      'Dhamma required all citizens of the empire to renounce worldly life and become monks',
    ],
    correctIndex: 1,
    explanation: 'Ashoka\'s Dhamma was deliberately not sectarian Buddhism. It omitted the Four Noble Truths, Eightfold Path, and monastic Vinaya, offering instead a universal ethical minimum (ahimsa, mutual respect, religious tolerance) for a diverse multi-faith empire.',
    hints: [
      'Consider how Ashoka unified Greeks, Brahmins, Jains, and Buddhists without alienating them.',
      'Did Dhamma require belief in nirvana or monastic asceticism?',
      'Dhamma was a universal moral code of shared ethics, not dogmatic theology.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_s02',
    nodeId: NODE_C6_HISTCIV_043,
    type: 'drag-label',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Match each imperial writing script with its geographical region and writing direction.',
    dragItems: [
      { label: 'Brahmi (Left-to-Right)', targetId: 'target_central' },
      { label: 'Kharoshthi (Right-to-Left)', targetId: 'target_northwest' },
      { label: 'Greek & Aramaic', targetId: 'target_afghan' },
    ],
    correctMapping: {
      target_central: 'Brahmi (Left-to-Right)',
      target_northwest: 'Kharoshthi (Right-to-Left)',
      target_afghan: 'Greek & Aramaic',
    },
    explanation: 'Brahmi (left-to-right) was used across most of the subcontinent; Kharoshthi (right-to-left) was used in the Gandhara northwest (Shahbazgarhi/Mansehra); Greek and Aramaic were used in Kandahar (Afghanistan).',
    hints: [
      'Remember that Kharoshthi inherited the right-to-left direction from Aramaic.',
      'Brahmi is the mother script of modern Indian scripts written left-to-right.',
      'Greek and Aramaic served the Hellenistic settlements in Afghanistan.',
    ],
  },
  {
    id: 'ch_s03',
    nodeId: NODE_C6_HISTCIV_044,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An Athenian merchant arrives in Pataliputra to sell Mediterranean glassware. Which of the 6 municipal city boards described by Megasthenes is specifically responsible for registering him, arranging lodging, and providing medical aid if he falls sick?',
    options: [
      'First Board (Industrial Arts & Crafts)',
      'Second Board (Care and Registration of Foreigners)',
      'Third Board (Registration of Births and Deaths)',
      'Sixth Board (Collection of Tenth-part Sales Tax)',
    ],
    correctIndex: 1,
    explanation: 'Megasthenes recorded that the Second Municipal Board of Pataliputra had the exclusive duty of caring for foreigners — registering their arrivals, providing safe lodging, medical care during sickness, and sending their belongings home if they passed away.',
    hints: [
      'Foreign visitors, envoys, and international merchants were treated under a specialized civic board.',
      'The first board handled crafts; the third handled vital statistics.',
      'The Second Board handled foreigners.',
    ],
  },
  {
    id: 'ch_s04',
    nodeId: NODE_C6_HISTCIV_048,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'What was the exact strategic meaning of Samudragupta\'s southern policy of "Grahana-Moksha-Anugraha" towards the 12 kings of Dakshinapatha?',
    options: [
      'Extermination of dynasties, forced mass conversions, and complete destruction of southern cities',
      'Immediate annexation of all southern territories into directly administered Gupta provinces',
      'Capture in battle (Grahana), release from captivity (Moksha), and restoration as tributary kings (Anugraha)',
      'Signing a permanent defensive non-aggression pact with no financial tribute required',
    ],
    correctIndex: 2,
    explanation: 'Samudragupta captured the 12 southern rulers (Grahana), liberated them (Moksha), and graciously restored them to their thrones (Anugraha) as tributaries. This was because direct rule over lands 1,500 km away from Pataliputra was logistically impossible in the 4th century CE.',
    hints: [
      'Break down the three Sanskrit terms: Grahana = capture, Moksha = release, Anugraha = favour/reinstatement.',
      'Direct annexation in the south was impractical due to distance.',
      'The policy was capture, release, and restoration as tribute-paying subordinates.',
    ],
  },
  {
    id: 'ch_s05',
    nodeId: NODE_C6_HISTCIV_049,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why did Chandragupta II make Ujjain his second imperial capital alongside Pataliputra after defeating Western Kshatrapa ruler Rudrasimha III around 409 CE?',
    options: [
      'Pataliputra was destroyed by severe Ganga floods and completely abandoned',
      'To directly control western Arabian Sea maritime trade routes through ports like Bharuch and Sopara',
      'To convert Ujjain into an exclusively Buddhist monastery center',
      'To escape invasions launched by the Roman Empire',
    ],
    correctIndex: 1,
    explanation: 'Ujjain was the gateway to the western seaports of Bharuch (Barygaza) and Sopara. By making Ujjain his second capital, Chandragupta II tapped into wealthy Roman and Arabian maritime trade, which financed the arts and the Navaratna court.',
    hints: [
      'Think about geographical trade arteries leading to coastal Gujarat.',
      'Western ports traded heavily with the Mediterranean and Persian Gulf.',
      'Ujjain enabled direct supervision of western maritime commerce.',
    ],
  },
  {
    id: 'ch_s06',
    nodeId: NODE_C6_HISTCIV_045,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the chronological sequence of the decline and end of the Mauryan Empire in correct historical order.',
    sortItems: [
      'Death of Emperor Ashoka after 37 years of rule (c. 232 BCE)',
      '50-year period of weaker successors (Dasharatha, Samprati, Shalishuka)',
      'Financial strain and gradual loosening of provincial control',
      'Assassination of the last king Brihadratha by Commander Pushyamitra Shunga (185 BCE)',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'The decline was multi-causal and gradual: Ashoka died c. 232 BCE, weaker successors ruled for roughly half a century amidst fiscal strain, and finally in 185 BCE Brihadratha was overthrown by Pushyamitra Shunga.',
    hints: [
      'The empire did not collapse overnight when Ashoka died.',
      'Weaker successors ruled for ~50 years before the final military coup.',
      'Pushyamitra Shunga founded the Shunga dynasty in 185 BCE at the very end.',
    ],
  },
  {
    id: 'ch_s07',
    nodeId: NODE_C6_HISTCIV_046,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why must a historian read Harisena\'s Allahabad Pillar Inscription (Prayag Prasasti) critically rather than accepting every adjective as objective truth?',
    options: [
      'Harisena wrote the inscription in modern Hindi in the 19th century',
      'The inscription was forged by Portuguese colonial traders',
      'Harisena was a royal court poet paid to eulogise his patron Samudragupta as a divine hero',
      'The pillar was entirely carved before Samudragupta was born',
    ],
    correctIndex: 2,
    explanation: 'A prasasti is a courtly panegyric/eulogy. As Samudragupta\'s court poet and minister, Harisena had an institutional duty to praise the emperor extravagantly, calling him divine and invincible. Historians accept campaign geography but discount eulogistic hyperbole.',
    hints: [
      'What is the genre of a "prasasti"? Is it a neutral diary or a royal tribute poem?',
      'Who paid Harisena\'s salary and commissioned the poem?',
      'Harisena was Samudragupta\'s court poet, so his text contains royal propaganda.',
    ],
  },
  {
    id: 'ch_s08',
    nodeId: NODE_C6_HISTCIV_050,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Who first popularized the term "Golden Age" / "Classical Age" for the Gupta period in mid-20th century historical scholarship?',
    options: [
      'Emperor Chandragupta II himself on his silver coins',
      'Fa Hien in his Chinese pilgrimage diary',
      'Nationalist historians like R.C. Majumdar in "The Classical Age" (1954)',
      'Pushyamitra Shunga in his coronation edict',
    ],
    correctIndex: 2,
    explanation: 'The term "Golden Age" was never used by the Guptas themselves. It was formulated by 20th-century Indian nationalist historians such as R.C. Majumdar (1954) to highlight ancient India\'s remarkable cultural, scientific, and administrative peaks.',
    hints: [
      'Did ancient kings call their own era "Golden Age" on pillars?',
      'It was coined by modern historians during and after India\'s independence movement.',
      'R.C. Majumdar crystallised the term in 1954.',
    ],
  },

  // Advanced Tier (8 challenges)
  {
    id: 'ch_a01',
    nodeId: NODE_C6_HISTCIV_041,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Build the four core welfare infrastructure projects mandated in Ashoka\'s Rock Edict II to relieve suffering for humans and animals along imperial roads.',
    availableParts: [
      'Human Hospitals',
      'Veterinary Hospitals',
      'Banyan & Mango Shade Trees',
      'Wells at every Half-Kos (800m)',
      'Stone Fortresses',
      'Toll Gates',
    ],
    targetState: 'Human Hospitals Veterinary Hospitals Banyan & Mango Shade Trees Wells at every Half-Kos (800m)',
    validationHint: 'Select the 4 compassionate welfare measures, avoiding military or taxation structures.',
    explanation: 'Rock Edict II details the world\'s earliest state-funded human hospitals, veterinary hospitals for animals, shade trees, and wells spaced every half-kos (800m) with roadside rest houses (dharmashalas).',
    hints: [
      'Ashoka focused on reducing suffering for travelers and animals.',
      'Veterinary institutions are a unique hallmark of Ashokan public welfare.',
      'Select the 4 welfare items: Human Hospitals, Veterinary Hospitals, Shade Trees, Wells at every Half-Kos.',
    ],
  },
  {
    id: 'ch_a02',
    nodeId: NODE_C6_HISTCIV_043,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why did Ashoka deliberately inscribe his Rock and Pillar Edicts in Prakrit dialects rather than classical Sanskrit?',
    options: [
      'Ashoka did not know Sanskrit because it had not yet been invented',
      'Prakrit was the everyday spoken vernacular of ordinary farmers, traders, and women, making mass communication possible',
      'Sanskrit was banned by royal decree across the subcontinent',
      'Brahmi script could only be used to write Prakrit phonetics',
    ],
    correctIndex: 1,
    explanation: 'Sanskrit was the elite language of priestly ritual and philosophical scholarship. Ashoka chose Prakrit because he wanted his moral message of Dhamma to be directly understood by the general populace without requiring Brahmin intermediaries.',
    hints: [
      'Think about mass literacy and everyday vernacular languages.',
      'Was Ashoka speaking to elite scholars or to the entire empire\'s common people?',
      'Prakrit was the spoken language of the common masses.',
    ],
  },
  {
    id: 'ch_a03',
    nodeId: NODE_C6_HISTCIV_048,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Match Samudragupta\'s coin types with the political self-image they communicated across the empire.',
    options: [
      'Lyrist Type = Supreme Vedic Conqueror; Ashvamedha Type = Peaceful Monk',
      'Lyrist Type (Veena) = Cultured Poet-King (Kaviraja); Ashvamedha Type = Universal Sovereign Chakravartin',
      'Garuda Type = Defeated Greek Ruler; Archer Type = Foreign Merchant',
      'King-and-Queen Type = Total Renunciation of Magadha',
    ],
    correctIndex: 1,
    explanation: 'Samudragupta deliberately projected a dual image: the Lyrist type (playing the veena) proclaimed him as Kaviraja (king of poets and musicians), while the Ashvamedha type (horse at yupa) proclaimed him as Chakravartin (universal sovereign).',
    hints: [
      'Playing the veena symbolizes patronage and mastery of music and arts.',
      'The horse sacrifice is the ultimate Vedic imperial ritual.',
      'Lyrist type = Kaviraja (cultured artist); Ashvamedha = Chakravartin (supreme sovereign).',
    ],
  },
  {
    id: 'ch_a04',
    nodeId: NODE_C6_HISTCIV_047,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'If a stone inscription in modern Madhya Pradesh states that it was engraved in the year 140 of the Gupta Era, what is the corresponding year in the Common Era (CE)? (Gupta Era began in 319 CE)',
    correctAnswer: 459,
    tolerance: 0,
    unit: 'CE',
    explanation: 'Calculation: 319 CE (start of Gupta Era) + 140 years = 459 CE (during the reign of Skandagupta).',
    hints: [
      'Add the year of the inscription (140) to the founding year of the Gupta Era (319 CE).',
      '319 + 140 = ?',
      'The answer is 459 CE.',
    ],
  },
  {
    id: 'ch_a05',
    nodeId: NODE_C6_HISTCIV_050,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How do modern subaltern and Marxist historians (e.g., D.D. Kosambi, R.S. Sharma) qualify the traditional "Golden Age" narrative of the Gupta Empire?',
    options: [
      'They claim the Gupta dynasty never existed and coins were fabricated',
      'They point to Fa Hien\'s observations of Chandala untouchability and the growth of feudal land-grants that oppressed cultivators',
      'They argue the Roman Empire was culturally far superior in Sanskrit drama',
      'They prove the Guptas had no gold or silver mines',
    ],
    correctIndex: 1,
    explanation: 'While acknowledging artistic and scientific peaks (Kalidasa, Aryabhata), critical historians highlight that the Golden Age was an elite Brahminical and courtly experience. Fa Hien noted Chandalas were segregated and struck wood to warn upper castes, while royal land grants bound peasants into feudal subservience.',
    hints: [
      'Did all social strata (cultivators, outcastes, Chandalas) share equally in the golden prosperity?',
      'Consider Fa Hien\'s notes on people forced to live outside city walls and strike clappers.',
      'They emphasize social inequality, untouchability, and feudal land-grant exploitation.',
    ],
  },
  {
    id: 'ch_a06',
    nodeId: NODE_C6_HISTCIV_049,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'How does historical analysis distinguish Chandragupta II from the legendary king Vikramaditya of Ujjain associated with the Vikram Samvat (58 BCE)?',
    options: [
      'Chandragupta II founded the Vikram Samvat era in 58 BCE after defeating Alexander',
      'They are the exact same individual who magically lived for over 500 years',
      'Chandragupta II ruled c. 380–415 CE (~400 years later) and adopted the title Vikramaditya to evoke heroic Shaka-vanquishing prestige',
      'The title Vikramaditya was forced upon Chandragupta II by Roman traders',
    ],
    correctIndex: 2,
    explanation: 'The Vikram Samvat began in 58 BCE with a legendary hero of Ujjain. Chandragupta II reigned c. 380–415 CE (400 years later) and deliberately adopted the title "Vikramaditya" (Sun of Valour) after his conquest of the Western Kshatrapas to claim equivalent prestige.',
    hints: [
      'Compare 58 BCE with 380 CE — notice the four-century gap.',
      'Adopting a legendary title is a classic form of political legitimisation.',
      'Chandragupta II adopted the title centuries later to borrow heroic prestige.',
    ],
  },
  {
    id: 'ch_a07',
    nodeId: NODE_C6_HISTCIV_045,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'What made the Sarnath Lion Capital so iconic that the modern Republic of India adopted it as its National Emblem and placed its Ashoka Chakra on the tricolour flag in 1950?',
    options: [
      'It was the only stone statue discovered anywhere in India by 1947',
      'Its 4 back-to-back lions symbolize sovereign power in all directions, while the 24-spoked wheel represents the dynamic rule of righteousness and moral law (Dhamma)',
      'It was carved by Greek sculptors depicting Hellenistic gods',
      'It bears the royal signatures of all Mauryan and Gupta kings',
    ],
    correctIndex: 1,
    explanation: 'The Sarnath Lion Capital synthesizes moral authority and strength: four lions roaring truth to the four cardinal directions, standing atop the abacus with the horse, bull, elephant, and lion, anchored by the 24-spoked Ashoka Chakra representing eternal righteousness and progress.',
    hints: [
      'Consider the symbolic meaning of 4 lions facing the cardinal directions and the 24-spoked wheel.',
      'It represents moral kingship and sovereign justice over mere brute military force.',
      'The lions represent sovereign courage and the wheel represents righteous moral law.',
    ],
  },
  {
    id: 'ch_a08',
    nodeId: NODE_C6_HISTCIV_044,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Which source distinction is vital for understanding Mauryan administration: how do historians separate Megasthenes\' Indica from Chanakya\'s Arthashastra?',
    options: [
      'Indica is a 19th-century poem; Arthashastra is an edict carved on rock',
      'Indica is an outsider eyewitness account of actual municipal practices (Pataliputra\'s 6 boards & wooden walls); Arthashastra is an insider normative/prescriptive treatise on statecraft, espionage, and ministers (Mantriparishad)',
      'Indica describes the Gupta Empire; Arthashastra describes the Harsha Empire',
      'Indica was composed in Sanskrit; Arthashastra was composed in Greek',
    ],
    correctIndex: 1,
    explanation: 'Megasthenes\' Indica represents observational outsider evidence of Pataliputra\'s municipal boards and wooden palisade. Chanakya\'s Arthashastra is a prescriptive, theoretical manual of statecraft covering ministers (Mantriparishad), espionage (gudhapurusha), and revenue policy.',
    hints: [
      'Remember: Megasthenes was a Greek ambassador witnessing Pataliputra.',
      'Chanakya was the prime minister writing a handbook on how an emperor should rule.',
      'Indica is observational municipal history; Arthashastra is prescriptive imperial statecraft.',
    ],
  },
];

// ─── PROPS INTERFACE ───
interface Props {
  nodeId?: string;
  title?: string;
  definition?: string;
  eli5?: string;
  misconceptions?: { misconception: string; correction: string }[];
  diagnosticQuestions?: { question: string; options: string[]; correctIndex: number }[];
  masteryCriteria?: string;
  onComplete?: (score: number) => void;
}

// ─── DEFAULT ENRICHMENT DATA ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C6_HISTCIV_041,
  title: "Ashoka's Conversion, Dhamma & The Imperial Gupta Age",
  definition: 'A comprehensive study of ancient Indian imperial transformations: Ashoka\'s post-Kalinga conversion to Buddhism, the universal ethical code of Dhamma, rock and pillar epigraphy in Brahmi, Mauryan administrative machinery and economic decline, followed by the rise of the Gupta Empire under Chandragupta I, Samudragupta\'s conquests, Chandragupta II\'s Golden Age, and the modern historical debate.',
  eli5: 'After a terrible war in Kalinga, Emperor Ashoka traded swords for kindness, opening animal hospitals and carving peaceful rules on giant stone pillars in everyday language. Centuries later, the Gupta kings built a flourishing empire of gold coins, great scientists like Aryabhata, and master poets like Kalidasa — teaching us how rulers can shape world culture.',
  misconceptions: [
    { misconception: 'Dhamma was identical to Buddhism as a religion.', correction: 'Dhamma was a universal, non-sectarian moral code of ethics (ahimsa, truth, tolerance, respecting parents) that omitted sectarian doctrines like the Four Noble Truths and Eightfold Path.' },
    { misconception: 'Ashoka\'s edicts were composed in Sanskrit.', correction: 'The edicts were inscribed in Prakrit dialects so that ordinary farmers, traders, and border peoples could read and understand them without priests.' },
    { misconception: 'The six boards of Pataliputra governed the entire Mauryan Empire.', correction: 'The six boards were the municipal city council of the capital Pataliputra alone; imperial governance was managed through the King, Mantriparishad, and four provincial Kumaras.' },
    { misconception: 'Samudragupta directly annexed all southern kingdoms into his empire.', correction: 'He applied Grahana-Moksha-Anugraha — capturing, releasing, and restoring the 12 southern kings as tributaries because administering distant lands from Pataliputra was impractical.' },
    { misconception: 'Chandragupta II started the Vikram Samvat era in 58 BCE.', correction: 'The Vikram Samvat began in 58 BCE with a legendary hero of Ujjain; Chandragupta II ruled c. 380–415 CE (400 years later) and adopted the title Vikramaditya to evoke that prestige.' },
  ],
  diagnosticQuestions: [
    { question: 'Which battle triggered Ashoka\'s moral transformation?', options: ['Battle of Hydaspes', 'Kalinga War (261 BCE)', 'Battle of Tarain', 'Battle of Panipat'], correctIndex: 1 },
    { question: 'What script read from right-to-left was used in the northwestern Ashokan edicts?', options: ['Brahmi', 'Kharoshthi', 'Devanagari', 'Grantha'], correctIndex: 1 },
    { question: 'What was the fractional rate of the Mauryan bhaga land tax?', options: ['One-fourth (1/4)', 'One-tenth (1/10)', 'One-sixth (1/6)', 'One-half (1/2)'], correctIndex: 2 },
    { question: 'Which text provides eyewitness details of Pataliputra\'s municipal boards?', options: ['Arthashastra', 'Indica by Megasthenes', 'Mudrarakshasa', 'Rajatarangini'], correctIndex: 1 },
    { question: 'In what year did the Gupta Era commence?', options: ['58 BCE', '78 CE', '319 CE', '455 CE'], correctIndex: 2 },
    { question: 'Who composed the Allahabad Pillar Inscription (Prayag Prasasti)?', options: ['Kalidasa', 'Harisena', 'Varahamihira', 'Banabhatta'], correctIndex: 1 },
    { question: 'Which Western Kshatrapa ruler did Chandragupta II defeat around 409 CE?', options: ['Rudradaman I', 'Rudrasimha III', 'Nahapana', 'Chashtana'], correctIndex: 1 },
    { question: 'Which Chinese pilgrim recorded that Chandalas lived outside city walls during the Gupta period?', options: ['Xuanzang', 'Yijing', 'Fa Hien', 'Megasthenes'], correctIndex: 2 },
  ],
  masteryCriteria: 'Demonstrate deep understanding of Mauryan welfare, Dhamma principles, Brahmi epigraphy, administrative structures, Gupta military policies, numismatic evidence, and the Golden Age historiographical debate.',
};

// ─── INTERACTIVE EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'From Battlefield to Welfare State (261 BCE)',
    instruction: 'Slide the Moral Transformation Dial from War to Dhamma to see how state spending shifted from weapons to public health and veterinary hospitals.',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_HISTCIV_041,
  },
  {
    title: 'Deciphering Ashoka\'s Edicts: The Brahmi Script & Pillar Anatomy',
    instruction: 'Click on ancient Brahmi glyphs to translate Ashoka\'s royal proclamation and inspect the Sarnath Lion Capital architectural diagram.',
    interactionType: 'click-parts',
    nodeId: NODE_C6_HISTCIV_043,
  },
  {
    title: 'The Municipal Boards of Pataliputra',
    instruction: 'Inspect the 6 civic boards of the capital recorded by Megasthenes and explore the municipal administration flowchart.',
    interactionType: 'drag-classify',
    nodeId: NODE_C6_HISTCIV_044,
  },
  {
    title: 'Samudragupta\'s Conquest Strategy: Aryavarta vs Dakshinapatha',
    instruction: 'Toggle between Northern Annexation (Direct Rule) and Southern Grahana-Moksha-Anugraha (Tributary Alliance) on the imperial strategy diagram.',
    interactionType: 'drag-position',
    nodeId: NODE_C6_HISTCIV_048,
  },
  {
    title: 'The Golden Age Historian\'s Balance Scale',
    instruction: 'Weigh classical cultural achievements (Kalidasa, Aryabhata) against social realities (Fa Hien\'s observations on Chandalas).',
    interactionType: 'slider-observe',
    nodeId: NODE_C6_HISTCIV_050,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If Ashoka had insisted on imposing sectarian Buddhist monastic theology across all regions, what would have happened to the multi-religious Mauryan Empire?',
    options: [
      'The entire population would have peacefully converted within one month',
      'It would have provoked fierce sectarian rebellion among Brahmins, Jains, and Ajivikas, fracturing the empire',
      'The Greek settlements in Kandahar would have immediately crowned him as their supreme deity',
      'All tax revenues would have automatically doubled',
    ],
    correctIndex: 1,
    verifyInstruction: 'Notice how Ashoka avoided religious dogma and instead issued Dhamma as a universal ethical minimum accepted by all sects.',
    nodeId: NODE_C6_HISTCIV_042,
  },
  {
    question: 'Predict: Why didn\'t Samudragupta permanently station royal garrisons and governors in deep southern kingdoms like Kanchi and Vengi (over 1,500 km away)?',
    options: [
      'He had run out of swords and horses after fighting in the north',
      'Communication and supply lines across Vindhya jungles were too slow to prevent sudden provincial revolts',
      'The southern kings possessed magical flying chariots',
      'The Indian Ocean had flooded the entire Deccan plateau',
    ],
    correctIndex: 1,
    verifyInstruction: 'See how distance made tributary restoration (Grahana-Moksha-Anugraha) far wiser than unsustainable direct military occupation.',
    nodeId: NODE_C6_HISTCIV_048,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the distribution of Ashoka\'s Rock Edicts compared to his Pillar Edicts?',
    observableOptions: [
      'Rock Edicts are at the outer frontiers (Girnar, Dhauli, Shahbazgarhi), while polished Pillars are in the Gangetic heartland',
      'All edicts were clustered solely within 5 kilometres of Pataliputra',
      'Pillar Edicts were carved exclusively on sea boats in the Indian Ocean',
      'Rock Edicts were written in English and Latin',
    ],
    correctIndex: 0,
    nodeId: NODE_C6_HISTCIV_043,
  },
  {
    question: 'Look at the Gupta numismatic evidence: What key difference emerges between Samudragupta\'s coins and Chandragupta II\'s silver coinage?',
    observableOptions: [
      'Samudragupta\'s coins are made of wood, while Chandragupta II\'s are plastic',
      'Samudragupta projected personal martial/poetic glory (Ashvamedha & Veena), while Chandragupta II stamped the Garuda standard over defeated Shaka coins',
      'Neither ruler issued any currency whatsoever',
      'Chandragupta II\'s coins only show pictures of Roman emperors',
    ],
    correctIndex: 1,
    nodeId: NODE_C6_HISTCIV_046,
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Be the Heritage Epigraphist: Decoding India\'s Living Symbols',
  description: 'Connect ancient Mauryan and Gupta historical decisions directly to modern Indian democratic institutions and living symbols.',
  steps: [
    'Inspect an Indian rupee currency note: locate the Sarnath Lion Capital emblem and the Ashoka Chakra.',
    'Identify how Rock Edict XII\'s principle of interfaith tolerance connects to Article 25 of the Constitution of India (Freedom of Religion).',
    'Calculate the year in the Indian National Saka Calendar (started 78 CE) versus the Gupta Era (started 319 CE).',
    'Write a 2-paragraph heritage briefing comparing Ashoka\'s veterinary hospitals with modern animal protection laws (Article 48A).',
  ],
};

// ─── MAIN COMPONENT ───
function C6_HistoryCivicsAshokasConversionBuddhismSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C6_HISTCIV_041,
  title = DEFAULT_PROPS.title || "Ashoka's Conversion & The Gupta Age",
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['historycivics'] || { name: 'History & Civics', emoji: '📜', color: 'amber' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });

  // Exploration & Interactive State
  const [welfareBudgetShift, setWelfareBudgetShift] = useState(20);
  const [selectedBrahmiGlyph, setSelectedBrahmiGlyph] = useState<string | null>(null);
  const [selectedCityBoard, setSelectedCityBoard] = useState<number | null>(null);
  const [guptaCampaignMode, setGuptaCampaignMode] = useState<'north' | 'south'>('north');
  const [goldenAgeBalance, setGoldenAgeBalance] = useState(50);

  // Prediction & Observation State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Challenge Interaction State
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Interactive challenge types
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Discovery state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Reflection user inputs
  const [reflection1, setReflection1] = useState('');
  const [reflection2, setReflection2] = useState('');
  const [reflection3, setReflection3] = useState('');

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Animation Refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const timelineRef = useRef<HTMLDivElement | null>(null);

  // ─── ADAPTIVE DIFFICULTY FILTERING ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL LOAD FROM MASTERY STORE ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT UPDATE ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── GSAP TIMELINE ANIMATION ───
  useEffect(() => {
    if (timelineRef.current && phase === 'explore') {
      gsap.fromTo(
        timelineRef.current.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }
      );
    }
  }, [phase, currentSlide]);

  // ─── CANVAS PARTICLE SYSTEM FOR REIGN EPOCHS ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let frame = 0;

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw historical era glowing backdrop
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw floating Sanskrit/Brahmi golden energy particles
      for (let i = 0; i < 20; i++) {
        const x = (Math.sin(frame * 0.01 + i) * 0.5 + 0.5) * canvas.width;
        const y = (Math.cos(frame * 0.015 + i * 2) * 0.5 + 0.5) * canvas.height;
        const r = 1.5 + Math.sin(frame * 0.05 + i);

        ctx.beginPath();
        ctx.arc(x, y, Math.max(0.5, r), 0, Math.PI * 2);
        ctx.fillStyle = i % 2 === 0 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(99, 102, 241, 0.3)';
        ctx.fill();
      }

      // Draw Ashoka Chakra rotating silhouette
      const cx = canvas.width - 40;
      const cy = 35;
      const radius = 18;
      ctx.strokeStyle = 'rgba(245, 158, 11, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      for (let s = 0; s < 24; s++) {
        const angle = (s * Math.PI) / 12 + frame * 0.005;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(angle) * radius, cy + Math.sin(angle) * radius);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, []);

  // ─── CALLBACKS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb! You understand the turning point of Kalinga.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Let us step into the ancient Mauryan and Gupta empires.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Here is your imperial laboratory. Experiment freely with policies and balance scales.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Time for your archaeological challenges! Prove your mastery.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Now test your prediction by observing the imperial mechanism.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Sharp historical observation!' : 'Look closer at the inscriptions.');
  }, []);

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
    audioManager.play('drop-correct');
    setDraggedItem(null);
  }, [draggedItem]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length ? [...prev] : (challenge.sortItems?.map((_, i) => i) || []);
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Magnificent! You have mastered the Mauryan and Gupta eras.');
  }, [errors, onComplete]);

  const handleNextChallenge = useCallback(() => {
    setHintCount(0);
    setAnswerRevealed(false);
    setShowHint(false);
    setShowExplanation(false);
    setNumericInput('');
    setDroppedLabels({});
    setSortArrangement([]);
    setConstructParts([]);
    setWrongShake(false);
    setWrongFlash(false);
    setRevealedSteps(0);

    if (currentChallenge + 1 >= filteredChallenges.length) {
      handleComplete();
    } else {
      setCurrentChallenge(c => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const num = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = (ans as string).trim() === (challenge.targetState || '').trim();
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent historical reasoning.');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
      }
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (challenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(challenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, challenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us study the complete explanation together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + challenge.nodeId, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── DERIVED WELFARE DATA FOR EXPLORATION STEP 0 ───
  const welfareChartData = useMemo(() => [
    { name: 'Military Armaments', value: Math.max(10, 100 - welfareBudgetShift), color: '#ef4444' },
    { name: 'Human & Vet Hospitals', value: Math.min(90, welfareBudgetShift * 0.9), color: '#10b981' },
    { name: 'Shade Trees & Wells', value: Math.min(85, welfareBudgetShift * 0.85), color: '#3b82f6' },
    { name: 'Dhamma Missions', value: Math.min(75, welfareBudgetShift * 0.75), color: '#f59e0b' },
  ], [welfareBudgetShift]);

  // ─── BRAHMI GLYPH TRANSLATOR DATA ───
  const brahmiGlyphs = [
    { id: 'deva', char: '𑀤𑁂', prakrit: 'Deva', meaning: 'God / Divine' },
    { id: 'nampiye', char: '𑀦𑀁𑀧𑀺𑀬', prakrit: 'Nampiya', meaning: 'Beloved of' },
    { id: 'piyadasi', char: '𑀧𑀺𑀬𑀤𑀲𑀺', prakrit: 'Piyadasi', meaning: 'He who looks with affection' },
    { id: 'laja', char: '𑀮𑀸𑀚𑀸', prakrit: 'Laja (Raja)', meaning: 'King / Sovereign' },
    { id: 'asoko', char: '𑀅𑀲𑁄𑀓', prakrit: 'Asoka', meaning: 'Ashoka (Confirmed at Maski 1915)' },
  ];

  // ─── 6 PATALIPUTRA BOARDS DATA ───
  const cityBoardsData = [
    { id: 1, title: 'Board I: Industrial Arts', desc: 'Monitors artisans, wages, craft quality, and standard metal alloy tools.' },
    { id: 2, title: 'Board II: Foreign Residents', desc: 'Registers all incoming foreign merchants, provides housing, doctors, and safety.' },
    { id: 3, title: 'Board III: Vital Statistics', desc: 'Registers every birth and death for census, tax tracking, and property claims.' },
    { id: 4, title: 'Board IV: Trade & Measures', desc: 'Inspects weights, measures, public markets, and commercial stamps.' },
    { id: 5, title: 'Board V: Manufactured Goods', desc: 'Separates new products from second-hand goods so buyers are never cheated.' },
    { id: 6, title: 'Board VI: 1/10th Sales Tax', desc: 'Collects a strict tithe (10%) on goods sold; tax evasion carried severe penalty.' },
  ];

  // ─── MOTIVATIONAL FEEDBACK HELPER ───
  const getMotivationalFeedback = (errs: number) => {
    if (errs === 0) {
      return {
        badge: 'PERFECT SCORE!',
        subtext: 'Flawless historical mastery! You decoded every epigraph, calculated every era, and mastered both Mauryan & Gupta statecraft without a single error.',
        color: 'text-emerald-400',
        bg: 'bg-emerald-950/50',
        border: 'border-emerald-500/50',
      };
    } else if (errs <= 3) {
      return {
        badge: 'Great work!',
        subtext: 'Splendid historical acumen! You navigated the complex transitions from Ashokan Dhamma to the Gupta Golden Age with impressive accuracy.',
        color: 'text-amber-400',
        bg: 'bg-amber-950/50',
        border: 'border-amber-500/50',
      };
    } else if (errs <= 7) {
      return {
        badge: 'Good effort!',
        subtext: 'Solid understanding of ancient Indian history! Review the distinctions between Prakrit and Sanskrit, and Samudragupta’s southern tributary campaigns.',
        color: 'text-indigo-400',
        bg: 'bg-indigo-950/50',
        border: 'border-indigo-500/50',
      };
    } else {
      return {
        badge: 'Do not give up — You WILL get this!',
        subtext: 'Ancient epigraphy and historical analysis take time and practice. Review the interactive exploration slides and try the challenges again!',
        color: 'text-rose-400',
        bg: 'bg-rose-950/50',
        border: 'border-rose-500/50',
      };
    }
  };

  const motivation = getMotivationalFeedback(errors);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl relative overflow-hidden font-sans">
      {/* Top Banner & Canvas Atmosphere */}
      <div className="relative z-10 mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
            className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-xl shadow-lg shadow-amber-500/10"
          >
            {subjectConfig.emoji}
          </motion.div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
            </h1>
            <p className="text-xs text-amber-400/90 font-medium tracking-wide">
              ICSE Class 6 History & Civics • Mauryan & Gupta Empires Simulation
            </p>
          </div>
        </div>

        {/* Phase Indicator Pills */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge', 'complete'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery' || p === 'explore' || p === 'sandbox') setPhase(p);
              }}
              disabled={phase === 'complete'}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all capitalize ${
                phase === p
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Canvas Header Atmosphere */}
      <div className="relative mb-6 rounded-2xl overflow-hidden border border-slate-800/60 shadow-inner">
        <canvas ref={canvasRef} width={900} height={70} className="w-full h-[60px] object-cover block" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-slate-950/80 pointer-events-none flex items-center justify-between px-6">
          <span className="text-xs font-semibold text-amber-300/80 tracking-widest uppercase">
            Imperial Timeline: 261 BCE (Kalinga) ➔ 250 BCE (Council) ➔ 319 CE (Gupta Era) ➔ 409 CE (Vikramaditya)
          </span>
          <span className="text-xs font-mono text-indigo-300">
            Node Track: c6_histciv_041 – 050
          </span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-amber-950/40 via-slate-900 to-indigo-950/40 rounded-3xl border border-amber-600/30 shadow-xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold">
                Archival Scenario
              </span>
              <span className="text-xs text-slate-400 font-medium">The Moral Crisis of 261 BCE</span>
            </div>
            <h2 className="text-2xl font-black text-amber-100">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-slate-400 mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-4">
            <h3 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
              <span className="text-amber-400">❓ Curiosity Hook:</span> {DISCOVERY_QUESTION.question}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`p-4 text-left rounded-2xl border text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/40 border-slate-800 text-slate-500'
                      : 'bg-slate-800/70 border-slate-700 hover:border-amber-500/50 hover:bg-slate-800 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700/60 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect
                    ? '✓ Spot on! Ashoka abandoned Digvijaya (military conquest) for Dhammavijaya (moral conquest).'
                    : `⚠️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl text-sm shadow-lg shadow-amber-500/25 shrink-0"
                >
                  Enter Interactive Exploration →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Exploration Navigation Tabs */}
          <div className="flex items-center justify-between bg-slate-900 p-2 rounded-2xl border border-slate-800 overflow-x-auto">
            <div className="flex gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <motion.button
                  key={idx}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setCurrentSlide(idx);
                    audioManager.play('tap');
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    currentSlide === idx
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-800/60 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>Step {idx + 1}</span>
                </motion.button>
              ))}
            </div>
            <span className="text-xs font-mono text-slate-500 pr-2">
              {currentSlide + 1} / {EXPLORATION_STEPS.length}
            </span>
          </div>

          {/* Active Exploration Interactive Slide */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900/90 rounded-3xl border border-slate-800 space-y-5"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-amber-200">
                  {EXPLORATION_STEPS[currentSlide].title}
                </h3>
                <span className="text-xs px-2.5 py-1 rounded-lg bg-indigo-950 text-indigo-300 border border-indigo-800/60 font-mono">
                  {EXPLORATION_STEPS[currentSlide].nodeId}
                </span>
              </div>
              <p className="text-sm text-amber-400 font-medium">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* SLIDE 0: Post-Kalinga Welfare State Budget Shift */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-slate-300">Moral Transformation Dial</span>
                        <span className="text-xs font-mono font-bold text-emerald-400">{welfareBudgetShift}% Dhamma</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={welfareBudgetShift}
                        onChange={(e) => {
                          setWelfareBudgetShift(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        className="w-full accent-amber-500 cursor-pointer"
                        aria-label="Welfare Budget Dial"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                        <span>261 BCE (War)</span>
                        <span>258 BCE (Dhamma)</span>
                        <span>250 BCE (Welfare State)</span>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-900/70 rounded-xl border border-slate-800 text-xs text-slate-300 space-y-2">
                      <p className="font-semibold text-amber-300">📜 Rock Edict II & Buddhist Karuna:</p>
                      <ul className="list-disc list-inside text-slate-400 space-y-1">
                        <li>Hospitals for humans and separate hospitals for animals (World First).</li>
                        <li>Shade-giving banyan and fruit-bearing mango trees on royal roads.</li>
                        <li>Drinking wells dug at every half-kos (~800 metres).</li>
                        <li>Sangha purification at 3rd Buddhist Council (Moggaliputta Tissa).</li>
                      </ul>
                    </div>
                  </div>

                  <div className="lg:col-span-7 h-64 bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col">
                    <span className="text-xs font-bold text-slate-400 mb-2">Imperial Treasury Reallocation (%)</span>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={welfareChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                          <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={10} />
                          <YAxis dataKey="name" type="category" stroke="#94a3b8" fontSize={10} width={110} />
                          <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                          <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                            {welfareChartData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 1: Ashokan Inscription Decipherer & Sarnath Pillar SVG */}
              {currentSlide === 1 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                    <div className="md:col-span-6 space-y-4">
                      <p className="text-xs text-slate-400">
                        Click any Brahmi glyph deciphered by <strong className="text-amber-400">James Prinsep (1837)</strong> to reveal its phonetic sound in Prakrit and historical meaning:
                      </p>

                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {brahmiGlyphs.map((glyph) => (
                          <motion.button
                            key={glyph.id}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                              setSelectedBrahmiGlyph(glyph.id);
                              audioManager.play('tap');
                              speechManager.speak(`${glyph.prakrit}: meaning ${glyph.meaning}`);
                            }}
                            className={`p-3 rounded-2xl border text-center transition-all ${
                              selectedBrahmiGlyph === glyph.id
                                ? 'bg-amber-500/20 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/20'
                                : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                            }`}
                          >
                            <div className="text-2xl font-serif text-amber-400 mb-1">{glyph.char}</div>
                            <div className="text-xs font-mono font-bold text-slate-200">{glyph.prakrit}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{glyph.meaning}</div>
                          </motion.button>
                        ))}
                      </div>

                      <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-xs text-slate-300">
                        <span className="font-bold text-indigo-400">💡 Linguistic Strategy:</span> Ashoka chose <strong className="text-amber-300">Prakrit</strong> (mass vernacular) over Sanskrit and adapted scripts: <strong>Brahmi</strong> (L-to-R), <strong>Kharoshthi</strong> in northwest (R-to-L), and <strong>Greek/Aramaic</strong> in Kandahar.
                      </div>
                    </div>

                    {/* SVG Diagram 1: Sarnath Pillar */}
                    <div className="md:col-span-6 bg-slate-900 p-3 rounded-2xl border border-slate-800 text-center flex flex-col items-center justify-center">
                      <span className="text-xs font-bold text-amber-300 mb-1">🏛️ Architectural Anatomy: Sarnath Lion Capital</span>
                      <AshokanPillarSVG />
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: 6 Municipal Boards of Pataliputra & Flowchart SVG */}
              {currentSlide === 2 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="text-xs text-slate-400">
                    Megasthenes recorded in <em>Indica</em> that the capital Pataliputra was governed by a 30-member council split into 6 specialized boards of 5 members each:
                  </div>

                  {/* SVG Diagram 2: Pataliputra Municipal Flowchart */}
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <PataliputraMunicipalSVG />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {cityBoardsData.map((board) => (
                      <motion.div
                        key={board.id}
                        whileHover={{ scale: 1.02 }}
                        onClick={() => {
                          setSelectedCityBoard(board.id);
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-2xl border cursor-pointer transition-all ${
                          selectedCityBoard === board.id
                            ? 'bg-indigo-950/60 border-indigo-500 shadow-lg shadow-indigo-500/20'
                            : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-bold text-indigo-300">{board.title}</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-400">5 Members</span>
                        </div>
                        <p className="text-[11px] text-slate-300 leading-relaxed">{board.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* SLIDE 3: Samudragupta's Dual Campaign Strategy */}
              {currentSlide === 3 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="flex justify-center gap-3">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setGuptaCampaignMode('north');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        guptaCampaignMode === 'north'
                          ? 'bg-rose-600 text-white shadow-lg shadow-rose-600/30'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      ⚔️ Aryavarta: Northern Direct Annexation (9 Kings)
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        setGuptaCampaignMode('south');
                        audioManager.play('tap');
                      }}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        guptaCampaignMode === 'south'
                          ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/30'
                          : 'bg-slate-900 text-slate-400 border border-slate-800'
                      }`}
                    >
                      🤝 Dakshinapatha: Grahana-Moksha-Anugraha (12 Kings)
                    </motion.button>
                  </div>

                  {/* SVG Diagram 3: Gupta Strategy & Coinage Duality */}
                  <div className="p-3 bg-slate-900 rounded-2xl border border-slate-800">
                    <GuptaStrategySVG />
                  </div>

                  <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <h4 className="text-sm font-bold text-white mb-1">
                      {guptaCampaignMode === 'north'
                        ? 'North India (Aryavarta): Direct Provinces'
                        : 'South India (Dakshinapatha): Tributary Alliances'}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {guptaCampaignMode === 'north'
                        ? 'Because these lands lay near the capital Pataliputra, Samudragupta defeated, killed, and annexed 9 rulers (Rudradeva, Nagasena), incorporating their rich agricultural tax base directly into imperial administration.'
                        : 'Lying over 1,500 km away along the eastern coast (Vengi, Kanchi), direct military control was logistically impossible. Samudragupta captured the kings (Grahana), released them (Moksha), and restored their thrones (Anugraha) in exchange for annual tribute and fealty.'}
                    </p>
                  </div>
                </div>
              )}

              {/* SLIDE 4: The Golden Age Historiographical Balance Scale */}
              {currentSlide === 4 && (
                <div className="space-y-4 bg-slate-950 p-5 rounded-2xl border border-slate-800">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-rose-400">Subaltern / Marxist Critique (Kosambi, Sharma)</span>
                      <span className="font-bold text-amber-300">Nationalist Peak (R.C. Majumdar 1954)</span>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={goldenAgeBalance}
                      onChange={(e) => {
                        setGoldenAgeBalance(Number(e.target.value));
                        audioManager.play('balance');
                      }}
                      className="w-full accent-indigo-500 cursor-pointer"
                      aria-label="Golden Age Perspective Dial"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className={`p-4 rounded-2xl border transition-all ${
                      goldenAgeBalance < 50 ? 'bg-rose-950/40 border-rose-500' : 'bg-slate-900 border-slate-800 opacity-60'
                    }`}>
                      <h4 className="text-xs font-bold text-rose-300 mb-2">⚖️ Critical Social Realities:</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        <li>Fa Hien recorded that <strong>Chandalas</strong> lived outside city walls and struck wood to warn upper castes.</li>
                        <li>Proliferation of royal land-grants (Agraharas) bound peasants to feudal estate landlords.</li>
                        <li>Sanskrit high culture was consumed primarily by courtly and Brahminical elites.</li>
                      </ul>
                    </div>

                    <div className={`p-4 rounded-2xl border transition-all ${
                      goldenAgeBalance >= 50 ? 'bg-amber-950/40 border-amber-500' : 'bg-slate-900 border-slate-800 opacity-60'
                    }`}>
                      <h4 className="text-xs font-bold text-amber-300 mb-2">✨ Classical Civilisational Peaks:</h4>
                      <ul className="text-xs text-slate-300 space-y-1.5 list-disc list-inside">
                        <li><strong>Literature:</strong> Kalidasa (Abhijnanasakuntalam, Meghaduta) in Navaratna court.</li>
                        <li><strong>Science:</strong> Aryabhata (499 CE Aryabhatiya — Zero, decimal system, Earth rotation).</li>
                        <li><strong>Art & Architecture:</strong> Deogarh Dashavatara Temple & Ajanta Murals (Caves 1, 2, 16, 17).</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Slide Navigation Buttons */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('whoosh');
              }}
              disabled={currentSlide === 0}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl text-xs disabled:opacity-40 transition-all"
            >
              ← Previous Step
            </motion.button>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                Next Step →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/30 transition-all"
              >
                Open Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX / FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-3xl border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-black text-amber-300">Imperial History Sandbox & Observation Lab</h3>
              <p className="text-xs text-slate-400 mt-1">
                Explore variables freely without time limits or grading. Test predictions on imperial policy dynamics.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/30 shrink-0"
            >
              Ready for Graded Challenges! 🎯
            </motion.button>
          </div>

          {/* Predict-Then-Check Container */}
          <div className="p-5 bg-slate-900/80 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-indigo-300">🔮 Predict-Then-Check: Multi-Faith Governance</h4>
            {!predictionMade ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-300">{PREDICTION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handlePrediction(i)}
                      className="p-3 text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 transition-all"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-xs text-emerald-400 font-bold">
                  <span>�� Prediction Verified:</span>
                  <span className="text-slate-300">{PREDICTION_QUESTIONS[0].verifyInstruction}</span>
                </div>
                <div className="text-[11px] text-slate-400">
                  That is why Ashoka created the <strong className="text-amber-300">Dhamma Mahamattas (258 BCE)</strong> to spread universal tolerance without replacing regional religious practices.
                </div>
              </motion.div>
            )}
          </div>

          {/* Observation Lab Container */}
          <div className="p-5 bg-slate-900/80 rounded-3xl border border-slate-800 space-y-4">
            <h4 className="text-sm font-bold text-amber-300">🔍 Epigraphist Observation Check</h4>
            {!observationAnswered ? (
              <div className="space-y-2">
                <p className="text-xs text-slate-300">{OBSERVATION_QUESTIONS[0].question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => handleObservation(i)}
                      className="p-3 text-left bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs text-slate-300 transition-all"
                    >
                      {opt}
                    </motion.button>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
                <p className="text-xs text-emerald-400 font-bold">
                  ✓ Excellent observation: 14 Major Rock Edicts guarded the frontiers, while 7 Pillar Edicts stood in Gangetic pilgrim routes.
                </p>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Header & Mastery Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-3xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black text-white">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : difficulty === 'advanced'
                      ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                      : 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}
                >
                  {difficulty}
                </motion.span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-amber-300 font-mono">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Node ID: {challenge.nodeId}</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <motion.div
                  className="bg-gradient-to-r from-amber-500 to-indigo-500 h-full rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
              <span className="text-xs font-mono font-bold text-slate-300">
                {Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%
              </span>
            </div>
          </div>

          {/* Active Challenge Box */}
          <div className={`p-6 bg-slate-900/90 rounded-3xl border transition-all ${
            wrongFlash ? 'bg-rose-950/60 border-rose-500' : 'border-slate-800'
          }`}>
            <h3 className="text-base font-bold text-white mb-4 leading-relaxed">
              {challenge.question}
            </h3>

            {/* MCQ / Classify / Distinguish / Match */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-3">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                    transition={wrongShake ? { duration: 0.4 } : {}}
                    onClick={() => handleAnswer(i)}
                    disabled={answerRevealed || showExplanation}
                    className={`w-full text-left p-4 rounded-2xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-500/10'
                        : 'bg-slate-950 border-slate-800 hover:border-amber-500/40 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-xs font-bold text-amber-400 shrink-0">
                        {String.fromCharCode(65 + i)}
                      </span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-and-Drop Labeling */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-600/80 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold cursor-grab shadow"
                    >
                      ✥ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {challenge.dragItems.map((item) => (
                    <div
                      key={item.targetId}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(item.targetId)}
                      className="p-4 bg-slate-950 border-2 border-dashed border-slate-700 rounded-2xl text-center min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-[11px] text-slate-400 font-mono mb-1">
                        Region Target: {item.targetId.replace('target_', '').toUpperCase()}
                      </span>
                      <div className="text-xs font-bold text-amber-300">
                        {droppedLabels[item.targetId] || 'Drop Script Here'}
                      </div>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Script Mapping
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Sequence */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length ? sortArrangement : challenge.sortItems.map((_, i) => i)).map((itemIdx, displayIdx) => (
                  <motion.div
                    key={displayIdx}
                    draggable
                    onDragStart={() => setDraggedItem(String(displayIdx))}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, displayIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 flex items-center gap-3 cursor-grab"
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 font-bold flex items-center justify-center text-[10px]">
                      {displayIdx + 1}
                    </span>
                    <span>{challenge.sortItems![itemIdx]}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(sortArrangement.length ? sortArrangement : challenge.sortItems!.map((_, i) => i))}
                  className="px-6 py-2 bg-indigo-600 text-white font-bold rounded-xl text-xs"
                >
                  Verify Chronology
                </motion.button>
              </div>
            )}

            {/* Numeric Calculation */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm w-56 focus:outline-none focus:border-amber-500"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-amber-500 text-slate-950 font-black rounded-xl text-xs"
                  >
                    Submit Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Infrastructure Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (!constructParts.includes(part)) {
                          setConstructParts(p => [...p, part]);
                          audioManager.play('pickup');
                        }
                      }}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs border border-slate-700 font-medium"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[80px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 rounded-lg bg-indigo-950 text-indigo-200 border border-indigo-700 text-xs font-semibold flex items-center gap-2"
                    >
                      {part}
                      <button
                        onClick={() => setConstructParts(p => p.filter((_, i) => i !== idx))}
                        className="text-rose-400 hover:text-rose-200 font-bold"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500">Click elements above to assemble Ashoka's welfare infrastructure...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs disabled:opacity-40"
                >
                  Verify Infrastructure Assembly
                </motion.button>
              </div>
            )}

            {/* Progressive Disclosure Explanation */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-5 bg-amber-950/40 border border-amber-600/40 rounded-2xl space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-300">
                  <span>📜 Epigraphical & Historical Explanation:</span>
                </div>
                {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xs text-amber-100 leading-relaxed"
                  >
                    <span className="font-bold text-amber-400 font-mono">[{idx + 1}]</span> {sentence}{!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      className="px-4 py-1.5 bg-amber-700/60 hover:bg-amber-700 text-white rounded-lg text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : <div />}

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2 bg-emerald-500 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Score →' : 'Next Challenge →'}
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Motivational Feedback Banner (Personalized based on errors) */}
          <div className={`p-6 rounded-3xl border text-center space-y-3 ${motivation.bg} ${motivation.border}`}>
            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 border border-amber-500/40 mx-auto flex items-center justify-center text-3xl">
              👑
            </div>
            <div className={`text-2xl font-black ${motivation.color}`}>
              {motivation.badge}
            </div>
            <p className="text-sm text-slate-200 max-w-xl mx-auto font-medium leading-relaxed">
              {motivation.subtext}
            </p>
            <div className="flex justify-center gap-6 pt-3">
              <div className="text-center">
                <div className="text-2xl font-black text-amber-400">{Math.max(0, 100 - errors * 5)}%</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">Final Score ({errors} Errors)</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-black text-emerald-400 capitalize">{masteryLevel}</div>
                <div className="text-[10px] text-slate-400 uppercase font-mono">BKT Mastery Tier</div>
              </div>
            </div>
          </div>

          {/* Spaced Repetition Schedule (SRS) Card */}
          <div className="p-5 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-purple-950/60 rounded-3xl border border-indigo-500/40 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-2xl shrink-0">
                🔄
              </div>
              <div>
                <h4 className="text-sm font-bold text-indigo-300 flex items-center gap-2">
                  <span>Spaced Repetition Schedule (SM-2)</span>
                  <span className="px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-mono uppercase">
                    SRS Active
                  </span>
                </h4>
                <p className="text-xs text-slate-300 mt-0.5">
                  Based on your performance ({errors} {errors === 1 ? 'error' : 'errors'}), your optimal next retention session:
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <div className="text-center px-4 py-2 bg-slate-950/80 rounded-2xl border border-indigo-500/30">
                <div className="text-lg font-black text-amber-400">
                  {errors === 0 ? 'Review in 7 days' : errors <= 3 ? 'Review in 3 days' : 'Review in 1 day'}
                </div>
                <div className="text-[10px] text-slate-400 font-mono">Next Interval</div>
              </div>
            </div>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 border border-rose-800/60 rounded-3xl space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-300">
                ⚠️ Your Misconception Remediation Profile:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={idx} className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 text-xs space-y-1">
                      <p className="text-rose-400 font-semibold">❌ Misconception: {m.misconception}</p>
                      <p className="text-emerald-300 font-medium">✓ Historical Reality: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">💭</span>
              <h3 className="text-sm md:text-base font-bold text-amber-300">
                Epigraphist Reflections & Deep Thinking
              </h3>
            </div>
            
            <div className="space-y-4">
              {/* Question 1 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-indigo-300">
                  1. What was the most surprising thing you learned?
                </label>
                <textarea
                  value={reflection1}
                  onChange={(e) => setReflection1(e.target.value)}
                  placeholder="e.g., How Ashoka opened the world's first animal hospitals, or that Dhamma was not sectarian Buddhism..."
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500 resize-none h-18"
                />
              </div>

              {/* Question 2 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-amber-300">
                  2. How would you explain this to a friend?
                </label>
                <textarea
                  value={reflection2}
                  onChange={(e) => setReflection2(e.target.value)}
                  placeholder="e.g., The Mauryas unified India through ethical welfare and public roads, while the Guptas fostered a classical explosion of arts and science..."
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-amber-500 resize-none h-18"
                />
              </div>

              {/* Question 3 */}
              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-2">
                <label className="block text-xs font-bold text-emerald-300">
                  3. Where in real life might you use this?
                </label>
                <textarea
                  value={reflection3}
                  onChange={(e) => setReflection3(e.target.value)}
                  placeholder="e.g., Understanding the Ashoka Chakra on our flag, the 4 lions on currency notes, and evaluating conflicting historical sources critically..."
                  className="w-full p-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-emerald-500 resize-none h-18"
                />
              </div>
            </div>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-amber-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800/80 text-xs text-slate-400 flex items-start gap-2">
                  <span className="font-mono text-amber-400 font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Interactive Feedback Overlays */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Imperial Challenge Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C6_HistoryCivicsAshokasConversionBuddhismSim;