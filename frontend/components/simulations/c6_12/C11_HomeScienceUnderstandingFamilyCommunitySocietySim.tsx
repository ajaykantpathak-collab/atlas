'use client';

/**
 * C11_HomeScienceUnderstandingFamilyCommunitySocietySim.tsx
 * Class 11 Home Science — Understanding Family, Community and Society
 * (NCERT unit kehe107: From Self to Family • Family as the Basic
 * Institution • Community and Society)
 *
 * HONEST NUMERICS — every readout is computed from live state, and every
 * default constant is a published public statistic:
 *   Census of India 2011: population 1,210.9 million; households 246.7 M;
 *   average household size 4.5; sex ratio 943 F per 1000 M; rural 68.8% /
 *   urban 31.2%; age split 0-14 = 30.8%, 15-59 = 60.6%, 60+ = 8.6%.
 *   NSS 68th round (2011-12): food share of monthly expenditure
 *   rural 48.6%, urban 38.6%.
 *   Dependency ratio = (dependents / working-age) × 100 — computed from
 *   the live sliders, not hardcoded.
 *   Budget rupee amounts = income × percent / 100 (integer rupees).
 *
 * Controls: member sliders, family-type buttons, function-weight sliders,
 * life-cycle stage slider, dependency sliders (India 2011 defaults),
 * community-type selector, income + 6 budget-allocation sliders,
 * normalize button, Reset.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Home,
  Users,
  Wallet,
  Heart,
  School,
  Building2,
  TreePine,
  PieChart,
  Clock,
  Coins,
  Landmark,
  GraduationCap,
  Activity,
  UserPlus,
  Award,
  BookOpen,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Layers,
  Info,
  Volume2,
  VolumeX,
  Compass,
  Beaker,
  AlertTriangle,
  Lightbulb,
  TrendingUp,
  Flame,
  HelpCircle,
  Sparkles,
} from 'lucide-react';

import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble } from '../../../lib/sim-engine';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore } from '../../../lib/masteryStore';

type SRSItem = ReturnType<typeof createReviewItem>;
type BKTState = ReturnType<typeof createBKTState>;

// ==========================================
// CONCEPT NODES TRACKED BY BKT (unit kehe107)
// ==========================================
const ALL_NODE_IDS = [
  'kehe107_self_to_family',
  'kehe107_family_institution',
  'kehe107_family_types',
  'kehe107_life_cycle',
  'kehe107_community_society',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// PUBLISHED DATA (stable public statistics)
// ==========================================
const CENSUS_2011 = {
  populationMillion: 1210.9,
  householdsMillion: 246.7,
  avgHouseholdSize: 4.5,
  sexRatio: 943,                       // females per 1000 males
  ruralSharePct: 68.8,
  urbanSharePct: 31.2,
  ageChildrenPct: 30.8,                // 0-14 years
  ageWorkingPct: 60.6,                 // 15-59 years
  ageElderlyPct: 8.6,                  // 60+ years
};

const NSS_2011_FOOD_SHARE = { rural: 48.6, urban: 38.6 };   // % of monthly expenditure

// Duvall's eight-stage family life cycle (standard family-science model)
const LIFE_STAGES = [
  { name: '1. Beginning family', years: 'married couple, no children', headAge: '20-28', members: 2, task: 'Establish the couple as a family unit; plan finances and roles together.', budget: 'Housing setup & savings' },
  { name: '2. Childbearing family', years: 'oldest child birth-30 months', headAge: '22-30', members: 3.2, task: 'Adjust to the newborn: care routines, higher health and food spending.', budget: 'Food, health care, baby needs' },
  { name: '3. Preschool family', years: 'oldest child 2.5-6 yrs', headAge: '24-33', members: 3.8, task: 'Socialise and educate the young child; cope with constant supervision needs.', budget: 'Pre-school, food, play material' },
  { name: '4. School-age family', years: 'oldest child 6-13 yrs', headAge: '30-40', members: 4.2, task: 'Support school learning; children join peer groups and activities.', budget: 'Education, transport, activities' },
  { name: '5. Teenage family', years: 'oldest child 13-20 yrs', headAge: '35-45', members: 4.2, task: 'Negotiate independence; guide identity and career choices of adolescents.', budget: 'Education (boards/coaching), clothing' },
  { name: '6. Launching centre', years: 'first child leaves \u2192 last leaves', headAge: '45-55', members: 3.0, task: 'Release young adults into work and marriage; renew the couple relationship.', budget: 'Higher education, weddings, savings' },
  { name: '7. Middle-aged parents', years: 'empty nest \u2192 retirement', headAge: '50-62', members: 2.0, task: 'Rebuild the couple unit; care for own ageing parents; plan retirement income.', budget: 'Health, retirement savings' },
  { name: '8. Ageing family', years: 'retirement \u2192 later years', headAge: '62+', members: 2.0, task: 'Adapt to reduced income and strength; wisdom and tradition roles in the family.', budget: 'Health care, medicines, support to kin' },
];

const FAMILY_FUNCTIONS = [
  { id: 'economic', name: 'Economic', desc: 'Earning, sharing and managing money, goods and work.' },
  { id: 'reproductive', name: 'Reproductive', desc: 'Bringing children into the world and giving them a home.' },
  { id: 'socialization', name: 'Socialization', desc: 'Teaching language, habits, values and roles to the next generation.' },
  { id: 'emotional', name: 'Emotional care', desc: 'Love, security and belonging — the psychological shelter.' },
  { id: 'health', name: 'Health care', desc: 'Feeding, nursing and safeguarding the health of members.' },
  { id: 'cultural', name: 'Cultural & religious', desc: 'Passing on festivals, rituals, customs and traditions.' },
  { id: 'recreational', name: 'Recreational', desc: 'Play, celebrations and shared leisure inside the family.' },
  { id: 'educational', name: 'Educational', desc: 'First lessons, homework support and life skills.' },
];

const COMMUNITY_TYPES = [
  {
    id: 'rural',
    name: 'Rural community',
    icon: TreePine,
    facts: 'Village; 68.8% of Indians lived in rural areas (Census 2011). Work centres on farming — cultivators (24.6%) + agricultural labourers (30.0%) formed 54.6% of India\u2019s workers.',
    relations: 'PRIMARY relations: face-to-face, lifelong, everyone knows everyone; strong informal social control through custom and elders.',
    density: 'Low settlement density; land and seasons pace daily life.',
  },
  {
    id: 'urban',
    name: 'Urban community',
    icon: Building2,
    facts: 'City/town; 31.2% urban population (377.1 million) in Census 2011 — concentrated on 2-3% of India\u2019s land area.',
    relations: 'SECONDARY relations: segmental, role-based (shopkeeper, teacher, neighbour); formal control through police, courts, municipal bodies.',
    density: 'High density; money, clocks and transport pace daily life.',
  },
  {
    id: 'tribal',
    name: 'Tribal community',
    icon: Landmark,
    facts: 'Adivasi communities (8.6% of the population, Census 2011) with their own language, council and territory.',
    relations: 'Primary, kin-based and collective; the village council (e.g. gram sabha) settles disputes by custom.',
    density: 'Forest, hill or plateau settlements with common land rights.',
  },
];

// ==========================================
// SCENARIO / DISCOVERY / PREDICTIONS
// ==========================================
const SCENARIO = {
  title: 'The Family & Community Research Station',
  intro: 'You are a Home Science field researcher. Build families on screen, run them through the eight stages of the family life cycle, compare communities using real Census of India numbers, and balance a real family budget.',
  context: 'Everything you change is computed live: household size, dependency ratio, care load, per-capita income and rupee allocations. The defaults are not invented — they come from Census 2011 and NSS 2011-12.',
};

const DISCOVERY_QUESTION = {
  question: 'The Census of India counts people as ONE household only when they live together AND share which daily activity?',
  options: [
    'Watching television together in the same room',
    'Eating food cooked from one common kitchen',
    'Owning the house in joint names',
    'Voting at the same polling booth'
  ],
  correctIndex: 1,
  hintAfter: 'For the Census, a household is a group of persons who normally live together and take food from a COMMON KITCHEN (a common chulha). That is why a household can include servants or lodgers who are NOT family — family is about kinship, household about the shared kitchen.'
};

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: a couple, their two children and ONE widowed grandmother live together. What family type is this?',
    options: [
      'Nuclear — any couple with children is nuclear',
      'Extended (three-generation) — a relative beyond the nuclear pair lives in',
      'Single-parent — the grandmother counts as the only parent',
      'Commune — four different relationships under one roof'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 1: set children 2, adults 2, grandparents 1 and read the family-type verdict.',
    nodeId: 'kehe107_family_types' as NodeId
  },
  {
    question: 'Predict: India\u2019s 2011 age mix was 30.8% children (0-14), 60.6% working age (15-59), 8.6% elderly (60+). What is the dependency ratio?',
    options: [
      'About 39 per 100 — only children count as dependents',
      'About 65 per 100 — (30.8 + 8.6) ÷ 60.6 × 100',
      'About 61 per 100 — only the elderly count as dependents',
      'About 100 per 100 — every person depends on someone'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 4: keep the India-2011 default sliders and read the computed dependency ratio.',
    nodeId: 'kehe107_community_society' as NodeId
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: in Lab 5, as you slide monthly income DOWN from ₹60,000 towards ₹8,000 with fixed percentage sliders, what happens to the RUPEES spent on food?',
    observableOptions: [
      'Rupees on food stay exactly the same — percentages fix everything',
      'Rupees on food fall with income, and the FOOD SHARE stays constant in %',
      'Rupees on food fall, yet food becomes a LARGER claim on poor budgets — Engel\u2019s pattern',
      'Rupees on food rise, because poor families eat more'
    ],
    correctIndex: 2,
    nodeId: 'kehe107_family_institution' as NodeId
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'hm_01',
    misconception: 'Family and household mean the same thing.',
    correction: 'FAMILY is a kinship group — related by blood, marriage or adoption. A HOUSEHOLD (Census definition) is everyone who lives under one roof and eats from a common kitchen, which may include servants or lodgers who are not kin. One roof ≠ one family.',
    nodeId: 'kehe107_self_to_family' as NodeId
  },
  {
    id: 'hm_02',
    misconception: 'The joint family has disappeared; only nuclear families exist now.',
    correction: 'Both forms coexist across India. Millions of households remain joint or three-generation (often for care and economy), while urban work migration favours nuclear units. Family type is a living strategy, not a vanished relic.',
    nodeId: 'kehe107_family_types' as NodeId
  },
  {
    id: 'hm_03',
    misconception: 'Socialization is finished by the time a child starts school.',
    correction: 'Socialization is lifelong. The family remains a key agency at every stage, joined later by school, peers, media and workplace — each re-teaching roles (primary and secondary socialization).',
    nodeId: 'kehe107_family_institution' as NodeId
  },
  {
    id: 'hm_04',
    misconception: 'A crowd of people is a community.',
    correction: 'A community needs a SHARED TERRITORY, ongoing interaction and a feeling of belonging ("we-feeling"). A railway platform crowd has none of these; a village of 800 people has all three.',
    nodeId: 'kehe107_community_society' as NodeId
  },
  {
    id: 'hm_05',
    misconception: 'Society and community are synonyms.',
    correction: 'COMMUNITY is concrete and territory-bound (a village, a mohalla). SOCIETY is the wider web of social relationships and institutions — abstract, not limited to one place. Every community is part of society; society is not one community.',
    nodeId: 'kehe107_community_society' as NodeId
  },
  {
    id: 'hm_06',
    misconception: 'Rural and urban communities differ only in population size.',
    correction: 'The deeper difference is social: rural life runs on primary, homogeneous, custom-guided relations; urban life on secondary, heterogeneous, law-guided relations. Occupation (54.6% agricultural workers in rural India vs urban services) drives the contrast.',
    nodeId: 'kehe107_community_society' as NodeId
  }
];

// ==========================================
// CHALLENGES (8 across 3 tiers)
// ==========================================
export interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'mcq' | 'numeric';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION ---
  {
    id: 'ch_hm_01',
    nodeId: 'kehe107_self_to_family',
    type: 'mcq',
    difficulty: 'foundation',
    question: 'Which statement about the family as an institution is TRUE?',
    options: [
      'The family is universal — found in every known society',
      'The family exists only where the government registers it',
      'Families are a modern invention of the last 200 years',
      'Only married couples with children count as families'
    ],
    correctIndex: 0,
    explanation: 'The family is called the basic and universal institution of society: every society organises reproduction, care and socialization through some family form, whatever its exact structure.',
    hints: ['Think of every society you have read about.', 'What does every newborn need to survive?', 'Universality is the keyword.']
  },
  {
    id: 'ch_hm_02',
    nodeId: 'kehe107_family_types',
    type: 'mcq',
    difficulty: 'foundation',
    question: 'A household has a husband, wife, their three children and the husband\u2019s younger brother. This is best described as…',
    options: [
      'A nuclear family — parents plus children only',
      'An extended family — a collateral relative (brother) joins the nuclear pair',
      'A single-parent family',
      'A childless family'
    ],
    correctIndex: 1,
    explanation: 'The nuclear unit (couple + children) PLUS another kin member (brother = collateral kin) makes it an extended family.',
    hints: ['Count the relationships beyond the couple.', 'A brother is a collateral relative, not a lineal one.', 'Nuclear + one extra kin = extended.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_hm_03',
    nodeId: 'kehe107_family_institution',
    type: 'numeric',
    difficulty: 'foundation',
    question: 'Using Census 2011: 246.7 million households with average household size 4.5. About how many million people live in these households? (millions)',
    correctAnswer: 1110,
    tolerance: 12,
    unit: 'million people',
    explanation: '246.7 million × 4.5 ≈ 1,110 million (1.11 billion) — the household population. The remainder of the 1,210.9 million total lives in institutional households (hostels, ashrams, prisons, barracks).',
    hints: ['Households × average size = household population.', '246.7 × 4.5 = ?', '246.7 × 4.5 = 1,110 million.']
  },
  // --- STANDARD ---
  {
    id: 'ch_hm_04',
    nodeId: 'kehe107_community_society',
    type: 'numeric',
    difficulty: 'standard',
    question: 'A family has 2 children, 2 working adults and 2 grandparents. Compute the dependency ratio in %: (dependents ÷ working-age) × 100.',
    correctAnswer: 200,
    tolerance: 0,
    unit: '%',
    explanation: 'Dependents = children + elderly = 2 + 2 = 4. Working-age = 2. Ratio = 4 ÷ 2 × 100 = 200% — two dependents for every earner, which is why joint families pool incomes.',
    hints: ['Who counts as a dependent here?', 'Children (0-14) and elderly (60+) are dependents.', '4 ÷ 2 × 100 = 200.']
  },
  {
    id: 'ch_hm_05',
    nodeId: 'kehe107_self_to_family',
    type: 'mcq',
    difficulty: 'standard',
    question: 'For Census 2011, when do several persons count as ONE household?',
    options: [
      'When they are all blood relatives living anywhere in the same city',
      'When they live together AND eat food cooked in a common kitchen',
      'When they share the same surname and gotra',
      'When their names appear on one ration card only'
    ],
    correctIndex: 1,
    explanation: 'The Census household = persons living together and taking food from a common kitchen. Kinship is NOT required — a live-in cook eating from the same kitchen joins the household, though not the family.',
    hints: ['Recall the Discovery question.', 'The kitchen is the Census clue.', 'Common kitchen, common roof.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_hm_06',
    nodeId: 'kehe107_life_cycle',
    type: 'numeric',
    difficulty: 'standard',
    question: 'In Duvall\u2019s eight-stage family life cycle, at which STAGE NUMBER does the family become a \u201claunching centre\u201d (children begin leaving home)?',
    correctAnswer: 6,
    tolerance: 0,
    unit: 'stage',
    explanation: 'Stage 6 is the launching centre: from the first child\u2019s departure to the last. The family shrinks, redecorates roles, and the couple relationship moves back to centre stage.',
    hints: ['Two stages come after it.', 'The ageing family is stage 8.', 'It is the sixth of eight.']
  },
  // --- ADVANCED ---
  {
    id: 'ch_hm_07',
    nodeId: 'kehe107_community_society',
    type: 'numeric',
    difficulty: 'advanced',
    question: 'Census 2011 recorded 943 females per 1000 males. If a town has 48,000 males, how many females does the national ratio predict?',
    correctAnswer: 45264,
    tolerance: 60,
    unit: 'females',
    explanation: '48,000 × 943 ÷ 1000 = 45,264 females. The sex ratio is a simple proportion — that is how demographers estimate missing counts from the ratio.',
    hints: ['Ratio means per 1000.', '48000 × 943 ÷ 1000 = ?', '48000 × 0.943 = 45,264.']
  },
  {
    id: 'ch_hm_08',
    nodeId: 'kehe107_family_institution',
    type: 'numeric',
    difficulty: 'advanced',
    question: 'NSS 2011-12: rural Indian households spent 48.6% of monthly expenditure on food. A rural family spends ₹14,000 per month. What are its food rupees? (nearest rupee)',
    correctAnswer: 6804,
    tolerance: 20,
    unit: '₹ per month',
    explanation: '₹14,000 × 48.6 ÷ 100 = ₹6,804. Poorer households devote a larger SHARE to food — Engel\u2019s law — which is why food-price rises hit rural budgets hardest.',
    hints: ['Food rupees = expenditure × food share ÷ 100.', '14000 × 48.6 = 680,400; divide by 100.', '₹6,804.']
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Field Study: Map Your Own Family & Community',
  description: 'Carry the simulation into your home — four steps of a real Home Science field record.',
  steps: [
    'Step 1: Draw your family tree for three generations and label each member\u2019s role (earner, carer, learner).',
    'Step 2: Decide: is your home ONE household or two? Apply the common-kitchen test — not the surname test.',
    'Step 3: List every function your family performed THIS WEEK (economic, care, socialization…) and who carried each.',
    'Step 4: Interview a grandparent about how your community (rural/urban/tribal) has changed — record 3 changes in occupation or relations.'
  ]
};

// ==========================================
// PURE DERIVED HELPERS
// ==========================================
function familyType(children: number, adults: number, grandparents: number): { label: string; why: string } {
  if (children === 0 && adults === 1) return { label: 'Single-person / solo living', why: 'One adult, no children — increasingly common in cities.' };
  if (adults <= 1 && children > 0) return { label: 'Single-parent family', why: 'One adult raises the children alone.' };
  if (grandparents === 0 && children > 0 && adults <= 2) return { label: 'Nuclear family', why: 'Parents (or parent) + children, no other kin in the home.' };
  if (grandparents > 0) return { label: 'Extended (lineal) family', why: 'Three generations under one roof: children \u2192 parents \u2192 grandparents.' };
  return { label: 'Joint / collateral family', why: 'Additional adult kin (uncles, aunts, cousins, siblings\u2019 spouses) share the household.' };
}

function inr(n: number): string {
  return '\u20B9' + Math.round(n).toLocaleString('en-IN');
}

function millionFmt(n: number): string {
  return n.toLocaleString('en-IN', { maximumFractionDigits: 1 });
}

// ==========================================
// FAMILY TREE SVG
// ==========================================
const FamilyTreeSVG: React.FC<{ children: number; adults: number; grandparents: number; stagePulse: boolean }> = ({ children, adults, grandparents, stagePulse }) => {
  const makeRow = (count: number, y: number, fill: string, label: string) => {
    const persons: React.ReactNode[] = [];
    const spacing = 46;
    const startX = 150 - ((Math.max(count, 1) - 1) * spacing) / 2;
    for (let i = 0; i < count; i++) {
      const x = startX + i * spacing;
      persons.push(
        <g key={`${label}-${i}`} style={{ transition: 'transform 0.4s ease, opacity 0.4s ease' }}>
          <circle cx={x} cy={y} r={11} fill={fill} stroke="#0f172a" strokeWidth={1.5} className={stagePulse ? 'animate-pulse' : ''} />
          <circle cx={x} cy={y + 19} r={7.5} fill={fill} stroke="#0f172a" strokeWidth={1.5} />
        </g>
      );
    }
    return persons;
  };

  return (
    <svg viewBox="0 0 300 170" className="w-full" preserveAspectRatio="xMidYMid meet">
      <rect x="0" y="0" width="300" height="170" rx="12" fill="#020618" />
      {grandparents > 0 && makeRow(grandparents, 30, '#a78bfa', 'gp')}
      {makeRow(adults, 80, '#34d399', 'ad')}
      {children > 0 && makeRow(children, 130, '#fbbf24', 'ch')}
      <text x="150" y="12" textAnchor="middle" fontSize="8" fill="#64748b">GENERATION 1 — grandparents (60+): {grandparents}</text>
      <text x="150" y="60" textAnchor="middle" fontSize="8" fill="#64748b">GENERATION 2 — adults (18-59): {adults}</text>
      <text x="150" y="110" textAnchor="middle" fontSize="8" fill="#64748b">GENERATION 3 — children (0-14): {children}</text>
      <text x="150" y="162" textAnchor="middle" fontSize="9" fill="#94a3b8">Household size: {children + adults + grandparents} members</text>
    </svg>
  );
};

// ==========================================
// READOUT + VERDICT (match app design system)
// ==========================================
const Readout: React.FC<{ label: string; value: string; tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet' }> = ({ label, value, tone = 'indigo' }) => {
  const tones: Record<string, string> = {
    indigo: 'text-gold-300',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    sky: 'text-gold-300',
    violet: 'text-gold-300',
  };
  return (
    <div className="bg-slate-900 rounded-lg border border-slate-800 px-3 py-2">
      <p className="text-[10px] text-slate-500 uppercase tracking-wide">{label}</p>
      <p className={`text-sm font-bold ${tones[tone]}`}>{value}</p>
    </div>
  );
};

const Verdict: React.FC<{ ok: boolean; text: string }> = ({ ok, text }) => (
  <div className={`flex items-start gap-2 rounded-lg border p-3 text-xs ${ok ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200' : 'border-rose-500/40 bg-rose-950/40 text-rose-200'}`}>
    {ok ? <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" /> : <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
    <span>{text}</span>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C11_HomeScienceUnderstandingFamilyCommunitySocietySim({
  initialNodeId = 'kehe107_self_to_family',
  onComplete,
  devMode = false
}: {
  initialNodeId?: string;
  onComplete?: (score: number) => void;
  devMode?: boolean;
}) {
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('discovery');
  const [activeExplorationIndex, setActiveExplorationIndex] = useState<number>(0);

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [speechEnabled, setSpeechEnabled] = useState<boolean>(true);

  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => { initial[id] = createBKTState(); });
    return initial;
  });
  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    CHALLENGES.forEach(c => { initial[c.id] = createReviewItem(c.id, 'Family, Community and Society'); });
    return initial;
  });

  // Discovery
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // Lab 1 + 2 + 5 SHARED FAMILY STATE
  const [childrenCount, setChildrenCount] = useState<number>(2);
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [grandparentsCount, setGrandparentsCount] = useState<number>(2);

  // Lab 2: function emphasis weights (0-3)
  const [funcWeights, setFuncWeights] = useState<Record<string, number>>(() => {
    const w: Record<string, number> = {};
    FAMILY_FUNCTIONS.forEach(f => { w[f.id] = 2; });
    return w;
  });

  // Lab 3: life-cycle stage (1-8)
  const [stage, setStage] = useState<number>(4);

  // Lab 4: dependency structure (India 2011 defaults) + community
  const [depChildren, setDepChildren] = useState<number>(CENSUS_2011.ageChildrenPct);
  const [depWorking, setDepWorking] = useState<number>(CENSUS_2011.ageWorkingPct);
  const [depElderly, setDepElderly] = useState<number>(CENSUS_2011.ageElderlyPct);
  const [communityId, setCommunityId] = useState<string>('rural');

  // Lab 5: budget
  const [income, setIncome] = useState<number>(28000);
  const [budget, setBudget] = useState<Record<string, number>>({
    food: 40, housing: 20, education: 12, health: 8, savings: 10, other: 10,
  });

  // Challenge engine
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericInput, setNumericInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ submitted: boolean; isCorrect: boolean; explanation: string } | null>(null);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);

  // FX
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const playFx = useCallback((sound: SoundEffect) => {
    if (soundEnabled) audioManager.play(sound);
  }, [soundEnabled]);

  const speakText = useCallback((text: string) => {
    if (speechEnabled) speechManager.speak(text);
  }, [speechEnabled]);

  const currentChallenge = CHALLENGES[currentChallengeIndex];

  useEffect(() => {
    setSelectedOption(null);
    setNumericInput('');
    setChallengeFeedback(null);
    setShowHint(false);
    setCurrentHintIndex(0);
  }, [currentChallengeIndex, currentChallenge]);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (activeTab === 'challenges' && !challengeFeedback?.submitted) {
      timerRef.current = setTimeout(() => {
        setShowHint(true);
        playFx('hint');
      }, 10000);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [activeTab, currentChallengeIndex, challengeFeedback, playFx]);

  // ── DERIVED (all honest, from live state) ──
  const householdSize = childrenCount + adultsCount + grandparentsCount;
  const dependents = childrenCount + grandparentsCount;
  const earners = adultsCount;
  const dependencyRatio = earners > 0 ? Math.round((dependents / earners) * 100) : null;
  const careLoad = adultsCount > 0 ? childrenCount / adultsCount : null;
  const typeVerdict = familyType(childrenCount, adultsCount, grandparentsCount);
  const careRatioText = careLoad !== null ? `${careLoad.toFixed(2)} children per adult` : 'no adults present';

  const totalWeight = FAMILY_FUNCTIONS.reduce((s, f) => s + funcWeights[f.id], 0);
  const weightedCareCapacity = adultsCount * (funcWeights.emotional + funcWeights.health + funcWeights.socialization) / 3;
  const careGap = childrenCount - weightedCareCapacity;

  const stageData = LIFE_STAGES[stage - 1];
  const timelineYears = (stage - 1) * 7;

  const depTotal = depChildren + depWorking + depElderly;
  const depRatio2011 = depWorking > 0 ? Math.round(((depChildren + depElderly) / depWorking) * 100) : null;
  const childWomanText = useMemo(() => {
    return `children (0-14) are ${((depChildren / Math.max(depTotal, 1)) * 100).toFixed(1)}% of this population mix`;
  }, [depChildren, depTotal]);

  const budgetTotalPct = Object.values(budget).reduce((a, b) => a + b, 0);
  const perCapita = householdSize > 0 ? income / householdSize : 0;
  const foodRupees = income * budget.food / 100;
  const nssRef = communityId === 'urban' ? NSS_2011_FOOD_SHARE.urban : NSS_2011_FOOD_SHARE.rural;
  const foodShareDelta = budget.food - nssRef;

  // ── RESET ──
  const resetAll = () => {
    setChildrenCount(2); setAdultsCount(2); setGrandparentsCount(2);
    const w: Record<string, number> = {};
    FAMILY_FUNCTIONS.forEach(f => { w[f.id] = 2; });
    setFuncWeights(w);
    setStage(4);
    setDepChildren(CENSUS_2011.ageChildrenPct);
    setDepWorking(CENSUS_2011.ageWorkingPct);
    setDepElderly(CENSUS_2011.ageElderlyPct);
    setCommunityId('rural');
    setIncome(28000);
    setBudget({ food: 40, housing: 20, education: 12, health: 8, savings: 10, other: 10 });
    setDiscoverySelected(null); setDiscoverySubmitted(false);
    setPredictionAnswers({}); setObservationAnswers({});
    setCurrentChallengeIndex(0); setActiveExplorationIndex(0);
    playFx('whoosh');
    speakText('Reset. The research station is back to the India 2011 defaults.');
  };

  const normalizeBudget = () => {
    const total = budgetTotalPct || 1;
    const next: Record<string, number> = {};
    Object.entries(budget).forEach(([k, v]) => { next[k] = Math.round((v / total) * 100); });
    // fix rounding drift on the largest bucket
    const drift = 100 - Object.values(next).reduce((a, b) => a + b, 0);
    let biggest = 'food';
    Object.keys(next).forEach(k => { if (next[k] > next[biggest]) biggest = k; });
    next[biggest] += drift;
    setBudget(next);
    playFx('chime');
    speakText('Allocations normalized to exactly one hundred percent.');
  };

  // ── Challenge handlers ──
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      playFx('success');
      speakText('Correct! The common kitchen is the Census test for a household.');
    } else {
      playFx('error');
      speakText('Not quite. The Census watches the kitchen, not the surname.');
    }
  };

  const setPrediction = (pIdx: number, oIdx: number, correct: number) => {
    setPredictionAnswers(prev => ({ ...prev, [pIdx]: oIdx }));
    playFx(oIdx === correct ? 'success' : 'error');
  };

  const handleSubmitChallenge = () => {
    if (!currentChallenge) return;
    let isCorrect = false;
    if (currentChallenge.type === 'mcq') {
      if (selectedOption === null) return;
      isCorrect = selectedOption === currentChallenge.correctIndex;
    } else {
      const val = parseFloat(numericInput.replace(/,/g, ''));
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0;
      isCorrect = Math.abs(val - target) <= tol;
    }

    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState();
    setBktStates(prev => ({ ...prev, [nodeId]: bktUpdate(oldBkt, isCorrect) }));

    const oldSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id, 'Family, Community and Society');
    setSrsItems(prev => ({ ...prev, [currentChallenge.id]: sm2Update(oldSrs, isCorrect ? 5 : 1, 0) }));

    if (isCorrect) {
      playFx('sparkle');
      setScore(prev => prev + 10);
      setStreak(prev => {
        const s = prev + 1;
        if (s >= 3) { setShowConfetti(true); playFx('celebration'); setTimeout(() => setShowConfetti(false), 2500); }
        return s;
      });
      speakText('Correct. Field observation recorded!');
    } else {
      playFx('error');
      setStreak(0);
      speakText('Incorrect. Read the field notes below.');
    }
    setChallengeFeedback({ submitted: true, isCorrect, explanation: currentChallenge.explanation });
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      playFx('whoosh');
    } else {
      recordGameScore([...ALL_NODE_IDS], score + 20);
      setShowSuccessBanner(true);
      playFx('celebration');
      speakText('You have mastered Family, Community and Society!');
      setTimeout(() => setShowSuccessBanner(false), 2200);
      if (onComplete) onComplete(score + 20);
    }
  };

  const averageMastery = useMemo(() => {
    const vals = ALL_NODE_IDS.map(id => bktStates[id]?.pKnown ?? 0);
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100);
  }, [bktStates]);

  const EXPLORATION_STEPS = [
    { title: 'Lab 1: Build a Family', instruction: 'Slide children, adults and grandparents. Watch household size, dependency ratio and the family-type verdict change live.', nodeId: 'kehe107_family_types' as NodeId },
    { title: 'Lab 2: Functions of the Family', instruction: 'Weight the eight functions the family performs, then watch the function wheel and the care gap re-balance.', nodeId: 'kehe107_family_institution' as NodeId },
    { title: 'Lab 3: Family Life Cycle', instruction: 'Move through Duvall\u2019s eight stages — the family grows, launches and ages while tasks and budget priorities shift.', nodeId: 'kehe107_life_cycle' as NodeId },
    { title: 'Lab 4: Community & Census Data', instruction: 'Real Census 2011 numbers: rebuild India\u2019s age mix, read the dependency ratio, and compare rural, urban and tribal communities.', nodeId: 'kehe107_community_society' as NodeId },
    { title: 'Lab 5: Family Budget', instruction: 'The family as consumer unit: set income, split six spending heads, normalize to 100% and compare your food share with NSS 2011-12 reality.', nodeId: 'kehe107_self_to_family' as NodeId },
  ];

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 select-none">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl shadow-lg">
            <Home className="w-8 h-8 text-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent">
              Understanding Family, Community &amp; Society
            </h1>
            <p className="text-xs text-slate-400">Class 11 Home Science • Family • Community • Real Census 2011 data</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
            <div className="flex items-center gap-1 text-pink-400 font-bold text-sm">
              <Award className="w-4 h-4" /> Score: {score}
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
              <TrendingUp className="w-4 h-4" /> Mastery: {averageMastery}%
            </div>
            <div className="w-px h-4 bg-slate-700" />
            <div className="flex items-center gap-1 text-orange-400 font-bold text-sm">
              <Flame className="w-4 h-4" /> Streak: {streak}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setSoundEnabled(!soundEnabled)} className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors" title="Toggle Sound FX">
              {soundEnabled ? <Volume2 className="w-5 h-5 text-pink-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
            </button>
            <button onClick={() => setSpeechEnabled(!speechEnabled)} className="p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-slate-300 transition-colors" title="Toggle Voice Readout">
              <BookOpen className={`w-5 h-5 ${speechEnabled ? 'text-emerald-400' : 'text-slate-500'}`} />
            </button>
            <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 text-white rounded-xl text-xs font-bold shadow-lg transition-all">
              <RotateCcw className="w-4 h-4" /> RESET ALL
            </button>
          </div>
        </div>
      </header>

      {/* NAV TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          { id: 'discovery', label: '1. Discovery Portal', icon: Compass },
          { id: 'lab', label: '2. Interactive Lab', icon: Beaker },
          { id: 'challenges', label: `3. Challenge Suite (${CHALLENGES.length})`, icon: Award },
          { id: 'misconceptions', label: '4. Misconceptions', icon: AlertTriangle },
          { id: 'summary', label: '5. Summary & Field Study', icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id as 'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'); playFx('tap'); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-pink-500 to-rose-600 text-slate-950 shadow-lg shadow-pink-500/20 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}>
              <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-pink-400'}`} />
              {tab.label}
            </button>
          );
        })}
      </nav>

      <main className="max-w-7xl mx-auto">
        {/* ══════ TAB 1: DISCOVERY ══════ */}
        {activeTab === 'discovery' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-pink-400 mb-3 flex items-center gap-2">
                <Compass className="w-6 h-6" /> Scenario Context
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">{SCENARIO.context}</p>
            </div>

            <div className="bg-slate-900 border border-pink-500/30 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-400 animate-pulse" />
                <h3 className="text-xl font-bold text-slate-100">Discovery Hypothesis Challenge</h3>
              </div>
              <p className="text-slate-200 text-lg font-medium mb-6">{DISCOVERY_QUESTION.question}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => {
                  const isSelected = discoverySelected === idx;
                  const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
                  let btnStyle = 'bg-slate-800/80 hover:bg-slate-700 text-slate-200 border-slate-700';
                  if (discoverySubmitted) {
                    if (isCorrect) btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-bold';
                    else if (isSelected) btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                  }
                  return (
                    <button key={idx} onClick={() => handleDiscoverySubmit(idx)} disabled={discoverySubmitted}
                      className={`p-4 rounded-xl border text-left transition-all text-sm leading-relaxed flex items-start gap-3 ${btnStyle}`}>
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-pink-400">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </button>
                  );
                })}
              </div>
              {discoverySubmitted && (
                <div className="bg-amber-950/40 border border-amber-500/40 rounded-xl p-4 text-amber-200 text-sm flex items-start gap-3">
                  <Info className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold mb-1">Field Insight:</p>
                    <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-pink-400" /> Interactive Predictions
              </h3>
              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <p className="font-semibold text-slate-200 mb-3">{pred.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pred.options.map((opt, oIdx) => {
                        const chosen = predictionAnswers[pIdx] === oIdx;
                        let style = 'bg-slate-900 border-slate-800 text-slate-300 hover:bg-slate-800';
                        if (predictionAnswers[pIdx] !== undefined) {
                          if (oIdx === pred.correctIndex) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                          else if (chosen) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                        }
                        return (
                          <button key={oIdx} onClick={() => setPrediction(pIdx, oIdx, pred.correctIndex)}
                            className={`p-3 rounded-xl border text-left text-xs transition-all ${style}`}>
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {predictionAnswers[pIdx] !== undefined && (
                      <p className="mt-3 text-xs text-amber-300 flex items-center gap-2">
                        <Info className="w-4 h-4" /> {pred.verifyInstruction}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB 2: LAB ══════ */}
        {activeTab === 'lab' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex gap-2 overflow-x-auto scrollbar-none">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button key={idx} onClick={() => { setActiveExplorationIndex(idx); playFx('tap'); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                    activeExplorationIndex === idx
                      ? 'bg-pink-500 border-pink-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}>
                  {step.title}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 border border-pink-500/20 rounded-2xl p-5 shadow-xl flex items-center gap-4">
              <div className="p-3 bg-pink-500/10 rounded-xl border border-pink-500/30">
                <Beaker className="w-6 h-6 text-pink-400" />
              </div>
              <div>
                <h3 className="font-bold text-pink-400 text-sm">{EXPLORATION_STEPS[activeExplorationIndex].title}</h3>
                <p className="text-slate-300 text-sm">{EXPLORATION_STEPS[activeExplorationIndex].instruction}</p>
              </div>
            </div>

            {/* ── LAB 1: BUILD A FAMILY ── */}
            {activeExplorationIndex === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <FamilyTreeSVG children={childrenCount} adults={adultsCount} grandparents={grandparentsCount} stagePulse={false} />
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <Readout label="Household size" value={`${householdSize} members`} tone="violet" />
                    <Readout label="Dependents" value={`${dependents} (0-14 + 60+)`} tone="amber" />
                    <Readout label="Earners (18-59)" value={`${earners} adults`} tone="emerald" />
                    <Readout label="Dependency ratio" value={dependencyRatio === null ? 'no earners!' : `${dependencyRatio} per 100 earners`} tone={dependencyRatio !== null && dependencyRatio > 150 ? 'rose' : 'emerald'} />
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2"><Users className="w-4 h-4" /> Family Members</h4>
                  {([
                    { label: 'Children (0-14 yrs)', value: childrenCount, set: setChildrenCount, max: 6 },
                    { label: 'Adults (18-59 yrs)', value: adultsCount, set: setAdultsCount, max: 6 },
                    { label: 'Grandparents (60+ yrs)', value: grandparentsCount, set: setGrandparentsCount, max: 4 },
                  ] as const).map(s => (
                    <div key={s.label}>
                      <div className="flex justify-between text-xs text-slate-300 mb-2">
                        <span>{s.label}:</span>
                        <span className="font-bold text-pink-400">{s.value}</span>
                      </div>
                      <input type="range" min={0} max={s.max} value={s.value} onChange={e => { s.set(Number(e.target.value)); playFx('pop'); }} className="w-full accent-pink-500" />
                    </div>
                  ))}
                  <div className="bg-slate-900 p-4 rounded-lg border border-pink-500/40 space-y-2">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wide">Family-type verdict</p>
                    <p className="text-sm font-bold text-pink-300">{typeVerdict.label}</p>
                    <p className="text-[11px] text-slate-400">{typeVerdict.why}</p>
                  </div>
                  <p className="text-[11px] text-slate-500">Care load: <span className="text-amber-300 font-bold">{careRatioText}</span> — how many children each adult must look after.</p>
                </div>
              </div>
            )}

            {/* ── LAB 2: FUNCTIONS ── */}
            {activeExplorationIndex === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2"><Heart className="w-4 h-4" /> The Eight Functions — weight their importance (0-3)</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {FAMILY_FUNCTIONS.map(f => (
                      <div key={f.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-xs font-bold text-slate-200">{f.name}</span>
                          <span className="text-[10px] text-pink-400 font-bold">weight {funcWeights[f.id]}/3</span>
                        </div>
                        <input type="range" min={0} max={3} step={1} value={funcWeights[f.id]}
                          onChange={e => { setFuncWeights(prev => ({ ...prev, [f.id]: Number(e.target.value) })); playFx('tap'); }}
                          className="w-full accent-pink-500" />
                        <p className="text-[10px] text-slate-500 mt-1">{f.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-4">
                  <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2"><PieChart className="w-4 h-4" /> Function Wheel &amp; Care Gap</h4>
                  <svg viewBox="0 0 200 200" className="w-full">
                    {(() => {
                      let angle = -90;
                      const cx = 100, cy = 100, r = 80;
                      const colors = ['#f472b6', '#fb7185', '#fbbf24', '#34d399', '#38bdf8', '#a78bfa', '#f97316', '#4ade80'];
                      const total = totalWeight || 1;
                      return FAMILY_FUNCTIONS.map((f, i) => {
                        const frac = funcWeights[f.id] / total;
                        const a0 = (angle * Math.PI) / 180;
                        angle += frac * 360;
                        const a1 = (angle * Math.PI) / 180;
                        const large = frac > 0.5 ? 1 : 0;
                        const x0 = cx + r * Math.cos(a0), y0 = cy + r * Math.sin(a0);
                        const x1 = cx + r * Math.cos(a1), y1 = cy + r * Math.sin(a1);
                        return (
                          <path key={f.id}
                            d={`M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 ${large} 1 ${x1} ${y1} Z`}
                            fill={colors[i]} opacity={0.85}
                            style={{ transition: 'd 0.3s ease' }}>
                            <title>{f.name}: {Math.round(frac * 100)}% of emphasis</title>
                          </path>
                        );
                      });
                    })()}
                    <circle cx="100" cy="100" r="26" fill="#020618" stroke="#334155" />
                    <text x="100" y="97" textAnchor="middle" fontSize="9" fill="#94a3b8">{totalWeight}</text>
                    <text x="100" y="108" textAnchor="middle" fontSize="7" fill="#64748b">weight units</text>
                  </svg>
                  <Readout label="Total emphasis" value={`${totalWeight} weight-units`} tone="violet" />
                  <div className="bg-slate-900 p-3 rounded-lg border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                    Care capacity = {adultsCount} adults × weighted care functions = <span className="text-gold-300 font-bold">{weightedCareCapacity.toFixed(1)}</span> vs {childrenCount} children needing care →
                    care gap = <span className={`font-bold ${careGap > 0 ? 'text-rose-400' : 'text-emerald-400'}`}>{careGap > 0 ? `+${careGap.toFixed(1)} short` : 'covered'}</span>.
                  </div>
                  {careGap > 0 && (
                    <p className="text-[11px] text-amber-300">A positive care gap is why the extended family shares child care — grandparents reduce it without adding earners.</p>
                  )}
                </div>
              </div>
            )}

            {/* ── LAB 3: LIFE CYCLE ── */}
            {activeExplorationIndex === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2"><Clock className="w-4 h-4" /> Duvall&apos;s Eight-Stage Family Life Cycle</h4>
                  <svg viewBox="0 0 340 120" className="w-full">
                    <polyline
                      points={LIFE_STAGES.map((s, i) => `${20 + i * 42},${100 - s.members * 14}`).join(' ')}
                      fill="none" stroke="#f472b6" strokeWidth="2.5" strokeLinejoin="round"
                      style={{ transition: 'all 0.4s ease' }}
                    />
                    {LIFE_STAGES.map((s, i) => (
                      <g key={i} onClick={() => { setStage(i + 1); playFx('tap'); }} className="cursor-pointer">
                        <circle cx={20 + i * 42} cy={100 - s.members * 14} r={stage === i + 1 ? 6 : 3.5}
                          fill={stage === i + 1 ? '#f472b6' : '#475569'}
                          style={{ transition: 'all 0.3s ease' }} />
                        <text x={20 + i * 42} y="114" textAnchor="middle" fontSize="7" fill="#64748b">{i + 1}</text>
                      </g>
                    ))}
                    <text x="170" y="12" textAnchor="middle" fontSize="8" fill="#64748b">typical household size at each stage (y-axis) — click a dot</text>
                  </svg>
                  <input type="range" min={1} max={8} value={stage} onChange={e => { setStage(Number(e.target.value)); playFx('tap'); }} className="w-full accent-pink-500" />
                  <div className="bg-slate-950 p-5 rounded-xl border border-pink-500/40 space-y-2">
                    <p className="text-sm font-bold text-pink-300">{stageData.name}</p>
                    <p className="text-xs text-slate-300">{stageData.years} • head of family aged {stageData.headAge}</p>
                    <p className="text-xs text-slate-400"><span className="text-gold-300 font-bold">Development task:</span> {stageData.task}</p>
                    <p className="text-xs text-slate-400"><span className="text-emerald-300 font-bold">Budget priority:</span> {stageData.budget}</p>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-pink-400 text-sm">Stage Readouts</h4>
                  <Readout label="Stage" value={`${stage} of 8`} tone="violet" />
                  <Readout label="Years since marriage" value={`≈ ${timelineYears} yrs`} tone="sky" />
                  <Readout label="Typical household size" value={`${stageData.members} members`} tone="amber" />
                  <div className="text-[11px] text-slate-500 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                    The family is a DYNAMIC institution: membership, roles and spending priorities change at every stage.
                    Note stage 6 (launching): household size falls fastest while education and wedding costs peak.
                  </div>
                  <button onClick={() => { setStage(s => (s % 8) + 1); playFx('pop'); }} className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-pink-400 border border-slate-700 rounded-xl text-xs font-bold transition-all">
                    Advance to next stage ▸
                  </button>
                </div>
              </div>
            )}

            {/* ── LAB 4: COMMUNITY & CENSUS ── */}
            {activeExplorationIndex === 3 && (
              <div className="space-y-6">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2"><Activity className="w-4 h-4" /> India&apos;s Age Mix — Census 2011 defaults (30.8 / 60.6 / 8.6)</h4>
                    {([
                      { label: 'Children 0-14 yrs', value: depChildren, set: setDepChildren, color: 'accent-amber-500' },
                      { label: 'Working age 15-59 yrs', value: depWorking, set: setDepWorking, color: 'accent-emerald-500' },
                      { label: 'Elderly 60+ yrs', value: depElderly, set: setDepElderly, color: 'accent-gold-500' },
                    ] as const).map(s => (
                      <div key={s.label}>
                        <div className="flex justify-between text-xs text-slate-300 mb-2">
                          <span>{s.label}:</span>
                          <span className="font-bold text-pink-400">{s.value.toFixed(1)}%</span>
                        </div>
                        <input type="range" min={0} max={80} step={0.1} value={s.value} onChange={e => s.set(Number(e.target.value))} className={`w-full ${s.color}`} />
                      </div>
                    ))}
                    <div className="flex flex-wrap gap-2">
                      <button onClick={() => { setDepChildren(CENSUS_2011.ageChildrenPct); setDepWorking(CENSUS_2011.ageWorkingPct); setDepElderly(CENSUS_2011.ageElderlyPct); playFx('chime'); }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-pink-400 border border-slate-700 rounded-xl text-xs font-bold">
                        Restore Census 2011 mix
                      </button>
                      <button onClick={() => { const t = depTotal || 1; setDepChildren(Math.round((t * 0.16) * 10) / 10); setDepWorking(Math.round((t * 0.67) * 10) / 10); setDepElderly(Math.round((t * 0.17) * 10) / 10); playFx('whoosh'); }}
                        className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 rounded-xl text-xs font-bold">
                        Ageing scenario (2036 projection style)
                      </button>
                    </div>
                  </div>
                  <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                    <h4 className="font-bold text-pink-400 text-sm">Demography Readouts</h4>
                    <Readout label="Age-mix total" value={`${depTotal.toFixed(1)}% (normalize to 100)`} tone={Math.abs(depTotal - 100) < 0.15 ? 'emerald' : 'amber'} />
                    <Readout label="Dependency ratio" value={depRatio2011 === null ? 'no working age!' : `${depRatio2011} per 100 workers`} tone={depRatio2011 !== null && depRatio2011 > 70 ? 'rose' : 'emerald'} />
                    <Readout label="Population 2011" value={`${millionFmt(CENSUS_2011.populationMillion)} million`} tone="sky" />
                    <Readout label="Households 2011" value={`${millionFmt(CENSUS_2011.householdsMillion)} million`} tone="sky" />
                    <Readout label="Sex ratio 2011" value={`${CENSUS_2011.sexRatio} F per 1000 M`} tone="violet" />
                    <p className="text-[11px] text-slate-500">{childWomanText}</p>
                  </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                  <h4 className="font-bold text-pink-400 text-sm mb-4 flex items-center gap-2"><Landmark className="w-4 h-4" /> Community Types — real Census character</h4>
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {COMMUNITY_TYPES.map(c => (
                      <button key={c.id} onClick={() => { setCommunityId(c.id); playFx('tap'); }}
                        className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold border transition-all ${
                          communityId === c.id ? 'bg-pink-500 border-pink-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}>
                        <c.icon className="w-4 h-4" /> {c.name}
                      </button>
                    ))}
                  </div>
                  {(() => {
                    const c = COMMUNITY_TYPES.find(x => x.id === communityId) ?? COMMUNITY_TYPES[0];
                    return (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <p className="font-bold text-pink-300 mb-2">Facts (Census 2011)</p>{c.facts}
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <p className="font-bold text-gold-300 mb-2">Social relations</p>{c.relations}
                        </div>
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <p className="font-bold text-emerald-300 mb-2">Life texture</p>{c.density}
                        </div>
                      </div>
                    );
                  })()}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                    <Readout label="Rural India 2011" value={`${CENSUS_2011.ruralSharePct}% of people`} tone="emerald" />
                    <Readout label="Urban India 2011" value={`${CENSUS_2011.urbanSharePct}% of people`} tone="sky" />
                    <Readout label="NSS food share (rural)" value={`${NSS_2011_FOOD_SHARE.rural}% of spend`} tone="amber" />
                    <Readout label="NSS food share (urban)" value={`${NSS_2011_FOOD_SHARE.urban}% of spend`} tone="amber" />
                  </div>
                </div>
              </div>
            )}

            {/* ── LAB 5: BUDGET ── */}
            {activeExplorationIndex === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-pink-400 text-sm flex items-center gap-2"><Wallet className="w-4 h-4" /> The Family as Consumer Unit</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Monthly household income:</span>
                      <span className="font-bold text-emerald-400">{inr(income)}</span>
                    </div>
                    <input type="range" min={8000} max={100000} step={1000} value={income} onChange={e => setIncome(Number(e.target.value))} className="w-full accent-emerald-500" />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-1"><span>₹8,000</span><span>₹1,00,000</span></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {([
                      { key: 'food', name: 'Food', icon: Coins },
                      { key: 'housing', name: 'Housing & fuel', icon: Home },
                      { key: 'education', name: 'Education', icon: GraduationCap },
                      { key: 'health', name: 'Health', icon: Heart },
                      { key: 'savings', name: 'Savings', icon: School },
                      { key: 'other', name: 'Clothing, travel, other', icon: UserPlus },
                    ] as const).map(b => (
                      <div key={b.key} className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="font-bold text-slate-200 flex items-center gap-1"><b.icon className="w-3.5 h-3.5 text-pink-400" /> {b.name}</span>
                          <span className="text-emerald-400 font-bold">{inr(income * budget[b.key] / 100)} <span className="text-slate-500">({budget[b.key]}%)</span></span>
                        </div>
                        <input type="range" min={0} max={60} value={budget[b.key]}
                          onChange={e => { setBudget(prev => ({ ...prev, [b.key]: Number(e.target.value) })); playFx('count'); }}
                          className="w-full accent-pink-500" />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={normalizeBudget} className="px-4 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-slate-950 rounded-xl text-xs font-bold shadow-lg hover:from-pink-400 transition-all">
                      Normalize allocations to 100%
                    </button>
                    <span className={`px-4 py-2.5 rounded-xl text-xs font-bold border ${Math.abs(budgetTotalPct - 100) < 0.01 ? 'bg-emerald-950/60 border-emerald-500 text-emerald-300' : 'bg-amber-950/60 border-amber-500 text-amber-300'}`}>
                      Current total: {budgetTotalPct}%
                    </span>
                  </div>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-pink-400 text-sm">Budget Readouts</h4>
                  <Readout label="Household size (from Lab 1)" value={`${householdSize} members`} tone="violet" />
                  <Readout label="Per-capita income" value={`${inr(perCapita)} per member`} tone="emerald" />
                  <Readout label="Food rupees" value={`${inr(foodRupees)} per month`} tone="amber" />
                  <Readout label="NSS reference food share" value={`${nssRef}% (${communityId} India, 2011-12)`} tone="sky" />
                  <div className={`rounded-lg border p-3 text-xs ${Math.abs(foodShareDelta) <= 5 ? 'border-emerald-500/40 bg-emerald-950/40 text-emerald-200' : 'border-amber-500/40 bg-amber-950/40 text-amber-200'}`}>
                    Your food share {budget.food}% is {foodShareDelta >= 0 ? '+' : ''}{foodShareDelta.toFixed(0)} points vs the real {communityId} average.
                    {' '}Engel&apos;s law: as income FALLS the food SHARE rises — try {inr(8000)} and watch food crowd out education.
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Money is finite: every +1% to food must come from −1% elsewhere. That trade-off is the family&apos;s economic function in action.
                  </p>
                </div>
              </div>
            )}

            {/* Guided observation question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-pink-400" /> {OBSERVATION_QUESTIONS[0].question}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, idx) => {
                  const answered = observationAnswers[0] !== undefined;
                  const chosen = observationAnswers[0] === idx;
                  let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';
                  if (answered) {
                    if (idx === OBSERVATION_QUESTIONS[0].correctIndex) style = 'bg-emerald-950/70 border-emerald-500 text-emerald-200';
                    else if (chosen) style = 'bg-rose-950/70 border-rose-500 text-rose-200';
                  }
                  return (
                    <button key={idx} onClick={() => {
                      setObservationAnswers(prev => ({ ...prev, 0: idx }));
                      playFx(idx === OBSERVATION_QUESTIONS[0].correctIndex ? 'success' : 'error');
                    }} className={`p-3 rounded-xl border text-left text-xs transition-all ${style}`}>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB 3: CHALLENGES ══════ */}
        {activeTab === 'challenges' && currentChallenge && (
          <div className="space-y-6 animate-fadeIn max-w-3xl mx-auto">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${
                  currentChallenge.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  currentChallenge.difficulty === 'standard' ? 'bg-amber-950 text-amber-400 border border-amber-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {currentChallenge.difficulty}
                </span>
                <span className="text-xs text-slate-500">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length} • {currentChallenge.nodeId}</span>
              </div>
              <p className="text-lg font-semibold text-slate-100 mb-6">{currentChallenge.question}</p>

              {currentChallenge.type === 'mcq' && (
                <div className="space-y-3 mb-6">
                  {currentChallenge.options?.map((opt, idx) => {
                    let style = 'bg-slate-950 border-slate-800 text-slate-300 hover:bg-slate-800';
                    if (challengeFeedback?.submitted) {
                      if (idx === currentChallenge.correctIndex) style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                      else if (selectedOption === idx) style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    } else if (selectedOption === idx) {
                      style = 'bg-gold-950/80 border-gold-500 text-gold-100';
                    }
                    return (
                      <button key={idx} onClick={() => { if (!challengeFeedback?.submitted) { setSelectedOption(idx); playFx('tap'); } }}
                        className={`w-full p-4 rounded-xl border text-left text-sm transition-all ${style}`}>
                        <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span>{opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {currentChallenge.type === 'numeric' && (
                <div className="mb-6">
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      value={numericInput}
                      onChange={e => setNumericInput(e.target.value)}
                      disabled={challengeFeedback?.submitted}
                      placeholder="Your answer"
                      className="flex-1 min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-4 text-lg text-slate-100 focus:border-pink-500 outline-none"
                    />
                    {currentChallenge.unit && <span className="text-sm text-slate-500 font-bold">{currentChallenge.unit}</span>}
                  </div>
                </div>
              )}

              {!challengeFeedback?.submitted ? (
                <button onClick={handleSubmitChallenge} className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-600 text-slate-950 rounded-xl font-bold shadow-lg hover:from-pink-400 transition-all">
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <Verdict ok={challengeFeedback.isCorrect} text={challengeFeedback.isCorrect ? 'Correct! +10 points.' : 'Incorrect — read the field notes.'} />
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300">
                    <p className="font-bold text-pink-400 mb-1">Field notes:</p>{challengeFeedback.explanation}
                  </div>
                  <button onClick={handleNextChallenge} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl font-bold shadow-lg hover:from-emerald-400 transition-all">
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge' : 'Finish & Record Score'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ══════ TAB 4: MISCONCEPTIONS ══════ */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-pink-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Key Misconceptions Clarified
              </h2>
              <p className="text-slate-400 text-sm mb-6">The exam traps of family, community and society — each disproved with real definitions and data.</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {MISCONCEPTIONS.map(m => (
                  <div key={m.id} className="bg-slate-950 p-5 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-sm">
                      <XCircle className="w-5 h-5" /> Misconception
                    </div>
                    <p className="text-slate-200 text-sm font-semibold">{m.misconception}</p>
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm pt-2 border-t border-slate-800">
                      <CheckCircle2 className="w-5 h-5" /> Correct Fact
                    </div>
                    <p className="text-slate-300 text-xs leading-relaxed">{m.correction}</p>
                    <p className="text-[10px] text-slate-600 font-mono pt-1">verify in Lab: {m.nodeId}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════ TAB 5: SUMMARY ══════ */}
        {activeTab === 'summary' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="bg-slate-900 border border-pink-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-pink-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm mb-6">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-pink-500 text-slate-950 font-bold text-xs flex items-center justify-center flex-shrink-0">{idx + 1}</div>
                    <p className="text-slate-300 text-xs leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-pink-400" /> Concept Mastery Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const m = Math.round((bktStates[nodeId]?.pKnown ?? 0) * 100);
                  const level = getMasteryLevel(bktStates[nodeId]?.pKnown ?? 0);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 font-mono mb-1">{nodeId}</p>
                      <div className="text-lg font-bold text-pink-400">{m}%</div>
                      <p className="text-[10px] text-slate-500">{level}</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-pink-500 h-full transition-all duration-500" style={{ width: `${m}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
              {devMode && <p className="text-xs text-slate-500 mt-4 font-mono">devMode • initialNodeId: {initialNodeId} • SRS items: {Object.keys(srsItems).length}</p>}
            </div>
          </div>
        )}
      </main>

      {showHint && currentChallenge && (
        <HintBubble
          message={currentChallenge.hints[currentHintIndex] || 'Re-read the Census definitions — kitchen and kinship are different tests.'}
          onComplete={() => setShowHint(false)}
        />
      )}
      {showHint && currentChallenge && currentHintIndex < 2 && (
        <button onClick={() => setCurrentHintIndex(i => i + 1)} className="fixed bottom-4 right-4 z-40 px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-xl">
          Next hint ({currentHintIndex + 1}/3)
        </button>
      )}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && <SuccessBanner message="Family, Community & Society mastered!" onComplete={() => setShowSuccessBanner(false)} />}
    </div>
  );
}
