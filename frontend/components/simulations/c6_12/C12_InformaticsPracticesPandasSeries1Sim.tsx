'use client';

/**
 * C12_InformaticsPracticesPandasSeries1Sim.tsx
 * Class 12 Informatics Practices — Data Handling Using Pandas - I
 * (NCERT/CBSE unit leip102: Series + DataFrame basics)
 *
 * HONEST NUMERICS — this sim re-implements pandas semantics faithfully:
 *   • dtype: int64 only when EVERY value is an integer; one 7.5 or one
 *     NaN flips the whole Series to float64 (real numpy promotion).
 *   • s1 + s2 aligns on index-label UNION (sorted); any label present in
 *     only one Series yields NaN — counted live.
 *   • DataFrame from a dict of Series: index = union of all Series
 *     indices → df.shape = (union rows, columns), df.size = rows × cols,
 *     df.ndim = 2 — computed, never hardcoded.
 *   • Column arithmetic (CS + IP) propagates NaN exactly like pandas.
 *   • isnull counts, dropna() (any-NaN rows removed) and fillna(mean)
 *     (mean of NON-NULL values) all recomputed from live data.
 *   • loc is LABEL-based, iloc is POSITION-based — shown side by side.
 *
 * Controls: editable values/labels, dtype-bending inputs, series
 * add-element, operation selector, scalar-op toggle, column toggles,
 * add/rename/delete column, head/tail + n-slider, loc/iloc selector,
 * boolean-mask threshold slider, dropna/fillna buttons, Reset.
 */

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Sigma,
  Braces,
  Rows3,
  Columns3,
  ListFilter,
  Binary,
  Table2,
  Trash2,
  Eraser,
  ArrowRightLeft,
  Hash,
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
// CONCEPT NODES TRACKED BY BKT (unit leip102)
// ==========================================
const ALL_NODE_IDS = [
  'leip102_series',
  'leip102_series_attributes',
  'leip102_vectorized_alignment',
  'leip102_dataframe',
  'leip102_loc_iloc_missing',
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// SOURCE DATA (deterministic)
// ==========================================
// Three class-test Series with deliberately MISALIGNED labels:
// CS & Math cover 5 + 2 students, IP covers a different 5.
const INITIAL_CS: Array<[string, number | null]> = [
  ['Ravi', 92], ['Megha', 78], ['Arjun', 85], ['Priya', 67], ['Kabir', 88],
];
const INITIAL_IP: Array<[string, number | null]> = [
  ['Arjun', 90], ['Priya', 74], ['Kabir', 81], ['Ishita', 95], ['Dev', 69],
];
const INITIAL_MATH: Array<[string, number | null]> = [
  ['Ravi', 80], ['Megha', 91], ['Arjun', 76], ['Priya', 84], ['Kabir', 70], ['Ishita', 88], ['Dev', 75],
];

type SeriesData = Array<[string, number | null]>;

const unionLabels = (a: SeriesData, b: SeriesData): string[] =>
  Array.from(new Set([...a.map(p => p[0]), ...b.map(p => p[0])])).sort();

const lookup = (s: SeriesData, label: string): number | null => {
  const hit = s.find(p => p[0] === label);
  return hit ? hit[1] : null;
};

// real numpy-style dtype promotion: int64 only if every non-null value is integral
function dtypeOf(values: Array<number | null>): string {
  const nonNull = values.filter((v): v is number => v !== null);
  if (nonNull.length === 0) return 'float64';
  return nonNull.every(v => Number.isInteger(v)) ? 'int64' : 'float64';
}

function seriesStats(values: Array<number | null>) {
  const nonNull = values.filter((v): v is number => v !== null);
  const sum = nonNull.reduce((a, b) => a + b, 0);
  const mean = nonNull.length ? sum / nonNull.length : null;
  const min = nonNull.length ? Math.min(...nonNull) : null;
  const max = nonNull.length ? Math.max(...nonNull) : null;
  return { count: nonNull.length, sum, mean, min, max, nulls: values.length - nonNull.length };
}

// ==========================================
// SCENARIO / DISCOVERY / PREDICTIONS
// ==========================================
const SCENARIO = {
  title: 'The Pandas Data Workshop',
  intro: 'pandas is Python\u2019s spreadsheet-on-steroids. Today you operate its two core structures: the one-dimensional Series and the two-dimensional DataFrame — with three real class-test datasets whose labels deliberately do not match.',
  context: 'Every panel recomputes real pandas semantics: dtype promotion, label alignment, NaN propagation, dropna/fillna. If the panel says 3 NaNs, you can count them yourself in the table.',
};

const DISCOVERY_QUESTION = {
  question: 's1 has labels [a, b, c], s2 has labels [b, c, d]. What does the expression s1 + s2 return?',
  options: [
    'Labels [b, c] only — pandas keeps the intersection of labels',
    'Labels [a, b, c, d] — with NaN at a and d, because pandas aligns on the UNION of labels',
    'An error — Series with different labels cannot be added',
    'Labels [a, b, c, d] — with 0 at a and d'
  ],
  correctIndex: 1,
  hintAfter: 'pandas aligns data on the UNION of index labels for arithmetic. A label missing on either side becomes NaN (Not a Number) in the result — never 0, never an error.'
};

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: a Series holds 92, 78, 7.5, 67. What is its dtype?',
    options: [
      'int64 — most values are whole numbers',
      'float64 — one non-integer value promotes the WHOLE Series to float',
      'object — mixed values become text',
      'int32 — pandas picks the smallest fitting type'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 1: type 7.5 into any value cell and watch the dtype readout flip from int64 to float64.',
    nodeId: 'leip102_series_attributes' as NodeId
  },
  {
    question: 'Predict: you run dropna() on a DataFrame where 2 of 7 rows contain a NaN. What is the new shape if it had 7 rows and 3 columns?',
    options: [
      '(7, 3) — dropna() replaces NaN with 0',
      '(5, 3) — rows containing ANY NaN are removed; columns never change',
      '(7, 2) — the column containing NaN is removed',
      '(5, 2) — both the rows and one column shrink'
    ],
    correctIndex: 1,
    verifyInstruction: 'Verify in Lab 5: press dropna() and read the before/after shape readouts.',
    nodeId: 'leip102_loc_iloc_missing' as NodeId
  }
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'Observation: in Lab 4, run loc[2] and iloc[2] on the default DataFrame (labels Ravi, Megha, Arjun…). What do you see?',
    observableOptions: [
      'Both return the same row because 2 always means the third row',
      'loc[2] fails / finds no label \u201c2\u201d, while iloc[2] returns Arjun\u2019s row (position 2, zero-based)',
      'loc[2] returns Arjun and iloc[2] returns Megha',
      'Both return an error — mixed types are not allowed'
    ],
    correctIndex: 1,
    nodeId: 'leip102_loc_iloc_missing' as NodeId
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'pd_01',
    misconception: 'Adding two Series with different labels gives an error, like plain Python lists.',
    correction: 'pandas aligns on the UNION of labels first. Only truly unalignable data produces NaN in the result — never a crash. That is exactly why s1 + s2 of the CS and IP tests shows NaN for Ravi (no IP mark) and Ishita (no CS mark).',
    nodeId: 'leip102_vectorized_alignment' as NodeId
  },
  {
    id: 'pd_02',
    misconception: 'loc and iloc are two spellings of the same selection.',
    correction: 'loc is LABEL-based (loc["Arjun"] finds the row whose index label is Arjun), iloc is POSITION-based (iloc[0] is always the first row). With default integer labels they coincide — with our name labels they diverge completely.',
    nodeId: 'leip102_loc_iloc_missing' as NodeId
  },
  {
    id: 'pd_03',
    misconception: 'One decimal value in a Series only changes that element\u2019s type.',
    correction: 'A pandas Series has ONE dtype for all elements. A single 7.5 among integers promotes every element to float64 — pandas trades element-level types for whole-array speed.',
    nodeId: 'leip102_series_attributes' as NodeId
  },
  {
    id: 'pd_04',
    misconception: 'df.size counts the number of columns.',
    correction: 'df.size = total CELLS = rows × columns. Our default 7 × 4 DataFrame has size 28. The number of columns is len(df.columns) and rows is len(df.index).',
    nodeId: 'leip102_dataframe' as NodeId
  },
  {
    id: 'pd_05',
    misconception: 'fillna() makes the DataFrame smaller, like dropna().',
    correction: 'fillna() REPLACES every NaN with a value you supply (0, mean…), so the shape is unchanged. Only dropna() removes rows/columns and shrinks the shape. Verify both in Lab 5.',
    nodeId: 'leip102_loc_iloc_missing' as NodeId
  },
  {
    id: 'pd_06',
    misconception: 'NaN means zero, so summing a Series with NaN gives NaN-free results.',
    correction: 'NaN (Not a Number) marks MISSING data. pandas aggregations like sum() and mean() SKIP NaNs by default (that is why mean() uses count of non-null), but the NaN cells themselves stay in the data until you fill or drop them.',
    nodeId: 'leip102_vectorized_alignment' as NodeId
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
    id: 'ch_pd_01',
    nodeId: 'leip102_series',
    type: 'mcq',
    difficulty: 'foundation',
    question: 'Which statement about a pandas Series is TRUE?',
    options: [
      'It is always two-dimensional with rows and columns',
      'It is a one-dimensional labelled array — values plus an index',
      'It can store values without any index',
      'Its values must all be strings'
    ],
    correctIndex: 1,
    explanation: 'A Series is a one-dimensional labelled array: every value is pinned to an index label. Labels make alignment and loc-selection possible.',
    hints: ['DataFrame is the 2-D one.', 'Think value + label pairs.', 'One-dimensional, labelled.']
  },
  {
    id: 'ch_pd_02',
    nodeId: 'leip102_series_attributes',
    type: 'numeric',
    difficulty: 'foundation',
    question: 'For the default CS Series (5 values), what does s.size return?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'elements',
    explanation: 'size counts ALL elements of the Series — 5 here — while count() would count only the NON-NULL ones. Verify both readouts in Lab 1.',
    hints: ['size vs count: one ignores NaN, one does not.', 'Count the CS values in Lab 1.', 'Five students, five elements.']
  },
  {
    id: 'ch_pd_03',
    nodeId: 'leip102_dataframe',
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A DataFrame has 7 rows and 3 columns. What is df.size?',
    correctAnswer: 21,
    tolerance: 0,
    unit: 'cells',
    explanation: 'size = rows × columns = 7 × 3 = 21 total cells. shape returns the tuple (7, 3) and ndim is 2.',
    hints: ['size is the product.', '7 × 3 = ?', 'Twenty-one cells.'],
    misconceptionIndex: 3
  },
  // --- STANDARD ---
  {
    id: 'ch_pd_04',
    nodeId: 'leip102_vectorized_alignment',
    type: 'numeric',
    difficulty: 'standard',
    question: 's1 + s2 on the default CS (labels: Ravi, Megha, Arjun, Priya, Kabir) and IP (labels: Arjun, Priya, Kabir, Ishita, Dev) Series — how many NaN cells appear in the result?',
    correctAnswer: 4,
    tolerance: 0,
    unit: 'NaNs',
    explanation: 'Label union = {Ravi, Megha, Arjun, Priya, Kabir, Ishita, Dev} = 7 labels. Ravi and Megha lack an IP value; Ishita and Dev lack a CS value → 4 NaNs. Verify in Lab 2.',
    hints: ['First compute the UNION of labels (7).', 'Which labels appear in only ONE Series?', '2 + 2 = 4 NaNs.'],
    misconceptionIndex: 0
  },
  {
    id: 'ch_pd_05',
    nodeId: 'leip102_loc_iloc_missing',
    type: 'mcq',
    difficulty: 'standard',
    question: 'On the default DataFrame (index labels Ravi, Megha, Arjun, …), which call returns the row for Arjun?',
    options: [
      'df.loc[2] and df.iloc[2] — they are identical',
      'df.iloc["Arjun"] — iloc accepts labels',
      'df.loc["Arjun"] — loc selects by index LABEL',
      'df.row[2] — pandas has a row() selector'
    ],
    correctIndex: 2,
    explanation: 'Arjun sits at POSITION 2 (zero-based) but his LABEL is "Arjun". Label access is loc["Arjun"]; position access is iloc[2]. loc[2] would look for a label literally named 2 and find nothing.',
    hints: ['Which accessor takes LABELS?', 'iloc only takes integer positions.', 'loc["Arjun"] it is.'],
    misconceptionIndex: 1
  },
  {
    id: 'ch_pd_06',
    nodeId: 'leip102_series_attributes',
    type: 'mcq',
    difficulty: 'standard',
    question: 'marks / 2 is run on an int64 Series. What is the dtype of the result?',
    options: [
      'int64 — division keeps the input dtype',
      'float64 — true division always produces floats',
      'bool — division returns True/False flags',
      'object — division converts numbers to text'
    ],
    correctIndex: 1,
    explanation: 'Python/pandas true division (/) returns float64 even when both operands are whole — 92 / 2 = 46.0. (Floor division // would keep int64.) Verify with the scalar op in Lab 2.',
    hints: ['What does 92 / 2 print in Python?', 'Think of the decimal point.', 'Division promotes to float.']
  },
  // --- ADVANCED ---
  {
    id: 'ch_pd_07',
    nodeId: 'leip102_dataframe',
    type: 'numeric',
    difficulty: 'advanced',
    question: 'Starting from the default 7 × 3 DataFrame, you add a Total column (CS + IP + Math) and then delete the Math column. What is df.size now?',
    correctAnswer: 21,
    tolerance: 0,
    unit: 'cells',
    explanation: 'Adding Total: 7 × 4 (size 28). Deleting Math: 7 × 3 again → size = 21. Row count never changed because add/delete COLUMN operations leave the index untouched.',
    hints: ['Track rows × columns at each step.', 'Add a column: 7 × 4. Delete one: 7 × 3.', '7 × 3 = 21 cells.']
  },
  {
    id: 'ch_pd_08',
    nodeId: 'leip102_loc_iloc_missing',
    type: 'numeric',
    difficulty: 'advanced',
    question: 'df.dropna() is run on the default 7-row DataFrame where Ravi, Megha (missing IP), Ishita and Dev (missing CS) contain NaN. How many rows remain?',
    correctAnswer: 3,
    tolerance: 0,
    unit: 'rows',
    explanation: 'dropna() keeps only rows with NO NaN: Arjun, Priya and Kabir — the only students with all three marks. Shape becomes (3, 3). Verify in Lab 5, then press fillna(mean) to see the alternative.',
    hints: ['A row survives only with zero NaNs.', 'Which students have ALL of CS, IP and Math?', 'Arjun, Priya, Kabir — 3 rows.']
  }
];

const REAL_WORLD_ACTIVITY = {
  title: 'Data Task: The Class Test Report Card',
  description: 'You are the class data analyst. Reproduce this simulation on your own machine and hand in real outputs.',
  steps: [
    'Step 1: import pandas as pd, build s1 = pd.Series({"Ravi":92, ...}) exactly as in Lab 1 and print s1.dtype.',
    'Step 2: Create total = s_cs + s_ip and count the NaNs yourself — does it match Lab 2?',
    'Step 3: Build df = pd.DataFrame({"CS": s_cs, "IP": s_ip, "Math": s_math}); verify df.shape, df.size against Lab 3.',
    'Step 4: Report who needs a re-test: df[df["CS"] < 70]["CS"] — and argue dropna() vs fillna() for the school office.'
  ]
};

// ==========================================
// SMALL UI PIECES
// ==========================================
const Readout: React.FC<{ label: string; value: string; tone?: 'indigo' | 'emerald' | 'amber' | 'rose' | 'sky' | 'violet' }> = ({ label, value, tone = 'indigo' }) => {
  const tones: Record<string, string> = {
    indigo: 'text-indigo-300',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    rose: 'text-rose-400',
    sky: 'text-sky-300',
    violet: 'text-violet-300',
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

const CodeLine: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 font-mono text-[11px] text-emerald-300 overflow-x-auto whitespace-pre">
    {children}
  </div>
);

const Cell: React.FC<{ v: number | null }> = ({ v }) => (
  <td className={`px-3 py-1.5 text-right font-mono ${v === null ? 'text-rose-400 italic' : 'text-slate-200'}`}>
    {v === null ? 'NaN' : String(v)}
  </td>
);

// ==========================================
// MAIN COMPONENT
// ==========================================
export default function C12_InformaticsPracticesPandasSeries1Sim({
  initialNodeId = 'leip102_series',
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
    CHALLENGES.forEach(c => { initial[c.id] = createReviewItem(c.id, 'Pandas I'); });
    return initial;
  });

  // Discovery
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number>>({});

  // ── Lab 1: Series explorer ──
  const [csSeries, setCsSeries] = useState<SeriesData>(() => INITIAL_CS.map(p => ({ ...p }) as [string, number | null]));

  // ── Lab 2: alignment ──
  const [op, setOp] = useState<'+' | '-' | '*' | '/' | '>'>('+');
  const [useScalar, setUseScalar] = useState<boolean>(false);
  const [scalar, setScalar] = useState<number>(2);

  // ── Lab 3: DataFrame builder ──
  const [colCS, setColCS] = useState<boolean>(true);
  const [colIP, setColIP] = useState<boolean>(true);
  const [colMath, setColMath] = useState<boolean>(true);
  const [colTotal, setColTotal] = useState<boolean>(false);
  const [csRenamed, setCsRenamed] = useState<boolean>(false);
  const [headMode, setHeadMode] = useState<'head' | 'tail'>('head');
  const [sliceN, setSliceN] = useState<number>(5);

  // ── Lab 4: selection ──
  const [selMethod, setSelMethod] = useState<'loc' | 'iloc'>('loc');
  const [selLabel, setSelLabel] = useState<string>('Arjun');
  const [selPos, setSelPos] = useState<number>(2);
  const [maskColumn, setMaskColumn] = useState<'CS' | 'IP' | 'Math'>('CS');
  const [maskThreshold, setMaskThreshold] = useState<number>(70);

  // ── Lab 5: missing values ──
  const [missingAction, setMissingAction] = useState<'view' | 'dropna' | 'fillna0' | 'fillnaMean'>('view');

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

  // ── DERIVED: Lab 1 series ──
  const csValues = csSeries.map(p => p[1]);
  const csStats = seriesStats(csValues);
  const csDtype = dtypeOf(csValues);

  // ── DERIVED: Lab 2 alignment (labels are shared with Lab 1's CS series) ──
  const ipSeries: SeriesData = INITIAL_IP;
  const alignResult = useMemo(() => {
    const labels = unionLabels(csSeries, ipSeries);
    return labels.map(label => {
      const a = lookup(csSeries, label);
      const b = lookup(ipSeries, label);
      let v: number | null = null;
      if (useScalar) {
        if (a === null) return [label, null] as [string, number | null];
        switch (op) {
          case '+': v = a + scalar; break;
          case '-': v = a - scalar; break;
          case '*': v = a * scalar; break;
          case '/': v = a / scalar; break;
          case '>': v = a > scalar ? 1 : 0; break;
        }
        return [label, v] as [string, number | null];
      }
      if (a === null || b === null) return [label, null] as [string, number | null];
      switch (op) {
        case '+': v = a + b; break;
        case '-': v = a - b; break;
        case '*': v = a * b; break;
        case '/': v = a / b; break;
        case '>': v = a > b ? 1 : 0; break;
      }
      return [label, v] as [string, number | null];
    });
  }, [csSeries, ipSeries, op, useScalar, scalar]);

  const alignNaNs = alignResult.filter(p => p[1] === null).length;
  const resultDtype = dtypeOf(alignResult.map(p => p[1]));

  // ── DERIVED: Lab 3 DataFrame (dict of Series → union index, like pandas) ──
  const dfLabels = useMemo(() => {
    const s1 = unionLabels(csSeries, ipSeries);
    return Array.from(new Set([...s1, ...INITIAL_MATH.map(p => p[0])])).sort();
  }, [csSeries, ipSeries]);
  const allColumnsOn = colCS || colIP || colMath || colTotal;
  const activeColCount = (colCS ? 1 : 0) + (colIP ? 1 : 0) + (colMath ? 1 : 0) + (colTotal ? 1 : 0);

  const cellOf = (label: string, col: 'CS' | 'IP' | 'Math' | 'Total'): number | null => {
    if (col === 'CS') return lookup(csSeries, label);
    if (col === 'IP') return lookup(ipSeries, label);
    if (col === 'Math') return lookup(INITIAL_MATH, label);
    // Total = CS + IP + Math with NaN propagation — exactly like pandas column arithmetic
    const cs = lookup(csSeries, label);
    const ip = lookup(ipSeries, label);
    const mt = lookup(INITIAL_MATH, label);
    if (cs === null || ip === null || mt === null) return null;
    return cs + ip + mt;
  };

  const dfRows = useMemo(() => {
    return dfLabels.map(label => {
      const cs = cellOf(label, 'CS');
      const ip = cellOf(label, 'IP');
      const math = cellOf(label, 'Math');
      return {
        label,
        CS: colCS ? cs : undefined,
        IP: colIP ? ip : undefined,
        Math: colMath ? math : undefined,
        Total: colTotal ? cellOf(label, 'Total') : undefined,
        _anyNaN: [cs, ip, math].some(v => v === null),
      };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dfLabels, colCS, colIP, colMath, colTotal, csSeries]);

  const dfShape: [number, number] = [dfRows.length, activeColCount];
  const dfSize = dfShape[0] * dfShape[1];
  const slicedRows = headMode === 'head' ? dfRows.slice(0, sliceN) : dfRows.slice(-sliceN);

  // ── DERIVED: Lab 4 selection ──
  const selectionResult = useMemo(() => {
    if (selMethod === 'loc') {
      const row = dfRows.find(r => r.label === selLabel);
      return row ? [row] : [];
    }
    const row = dfRows[selPos];
    return row ? [row] : [];
  }, [dfRows, selMethod, selLabel, selPos]);

  const maskResult = useMemo(() => {
    return dfRows.filter(r => {
      const v = maskColumn === 'CS' ? r.CS : maskColumn === 'IP' ? r.IP : r.Math;
      return v !== null && v !== undefined && v > maskThreshold;
    });
  }, [dfRows, maskColumn, maskThreshold]);

  // ── DERIVED: Lab 5 missing data ──
  const nullsPerColumn = useMemo(() => {
    const count = (col: 'CS' | 'IP' | 'Math') => dfRows.filter(r => (col === 'CS' ? r.CS : col === 'IP' ? r.IP : r.Math) === null).length;
    const total = dfRows.filter(r => r.Total === null).length;
    return { CS: count('CS'), IP: count('IP'), Math: count('Math'), Total: colTotal ? total : undefined };
  }, [dfRows, colTotal]);

  const colMean = (col: 'CS' | 'IP' | 'Math'): number | null => {
    const vals = dfRows.map(r => (col === 'CS' ? r.CS : col === 'IP' ? r.IP : r.Math)).filter((v): v is number => v !== null && v !== undefined);
    return vals.length ? vals.reduce((a, b) => a + b, 0) / vals.length : null;
  };

  const missingViewRows = useMemo(() => {
    if (missingAction === 'dropna') return dfRows.filter(r => !r._anyNaN);
    if (missingAction === 'fillna0') {
      return dfRows.map(r => ({
        ...r,
        CS: r.CS === null ? 0 : r.CS,
        IP: r.IP === null ? 0 : r.IP,
        Math: r.Math === null ? 0 : r.Math,
      }));
    }
    if (missingAction === 'fillnaMean') {
      const mCS = colMean('CS'), mIP = colMean('IP'), mMath = colMean('Math');
      return dfRows.map(r => ({
        ...r,
        CS: r.CS === null ? (mCS === null ? null : Math.round(mCS * 100) / 100) : r.CS,
        IP: r.IP === null ? (mIP === null ? null : Math.round(mIP * 100) / 100) : r.IP,
        Math: r.Math === null ? (mMath === null ? null : Math.round(mMath * 100) / 100) : r.Math,
      }));
    }
    return dfRows;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dfRows, missingAction]);

  // ── RESET ──
  const resetAll = () => {
    setCsSeries(INITIAL_CS.map(p => ({ ...p }) as [string, number | null]));
    setOp('+'); setUseScalar(false); setScalar(2);
    setColCS(true); setColIP(true); setColMath(true); setColTotal(false); setCsRenamed(false);
    setHeadMode('head'); setSliceN(5);
    setSelMethod('loc'); setSelLabel('Arjun'); setSelPos(2);
    setMaskColumn('CS'); setMaskThreshold(70);
    setMissingAction('view');
    setDiscoverySelected(null); setDiscoverySubmitted(false);
    setPredictionAnswers({}); setObservationAnswers({});
    setCurrentChallengeIndex(0); setActiveExplorationIndex(0);
    playFx('whoosh');
    speakText('DataFrames rebuilt. The workshop is back to its default datasets.');
  };

  // ── Lab 1 handlers ──
  const setValue = (idx: number, raw: string) => {
    setCsSeries(prev => prev.map((p, i) => (i === idx ? [p[0], raw === '' ? null : Number(raw)] as [string, number | null] : p)));
  };

  const setLabel = (idx: number, raw: string) => {
    setCsSeries(prev => prev.map((p, i) => (i === idx ? [raw, p[1]] as [string, number | null] : p)));
  };

  const addSeriesElement = () => {
    setCsSeries(prev => {
      if (prev.length >= 8) return prev;
      const extras: Array<[string, number | null]> = [['Meera', 94], ['Naina', 58], ['Om', 71], ['Payal', 66]];
      return [...prev, extras[prev.length % extras.length]];
    });
    playFx('pop');
    speakText(`Element appended. Size is now ${csSeries.length + 1}.`);
  };

  const dropLastElement = () => {
    setCsSeries(prev => (prev.length <= 2 ? prev : prev.slice(0, -1)));
    playFx('tap');
    speakText(`Element dropped. Size is now ${Math.max(csSeries.length - 1, 2)}.`);
  };

  // ── Challenge handlers ──
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      playFx('success');
      speakText('Correct! Pandas aligns on the union of labels.');
    } else {
      playFx('error');
      speakText('Not quite. Watch Lab 2 to see alignment in action.');
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
      const val = parseFloat(numericInput);
      if (isNaN(val)) return;
      const target = currentChallenge.correctAnswer ?? 0;
      const tol = currentChallenge.tolerance ?? 0;
      isCorrect = Math.abs(val - target) <= tol;
    }

    const nodeId = currentChallenge.nodeId;
    const oldBkt = bktStates[nodeId] || createBKTState();
    setBktStates(prev => ({ ...prev, [nodeId]: bktUpdate(oldBkt, isCorrect) }));

    const oldSrs = srsItems[currentChallenge.id] || createReviewItem(currentChallenge.id, 'Pandas I');
    setSrsItems(prev => ({ ...prev, [currentChallenge.id]: sm2Update(oldSrs, isCorrect ? 5 : 1, 0) }));

    if (isCorrect) {
      playFx('sparkle');
      setScore(prev => prev + 10);
      setStreak(prev => {
        const s = prev + 1;
        if (s >= 3) { setShowConfetti(true); playFx('celebration'); setTimeout(() => setShowConfetti(false), 2500); }
        return s;
      });
      speakText('Correct. The output matches pandas exactly!');
    } else {
      playFx('error');
      setStreak(0);
      speakText('Incorrect. Compare with the lab output below.');
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
      speakText('You have mastered Pandas Part One!');
      setTimeout(() => setShowSuccessBanner(false), 2200);
      if (onComplete) onComplete(score + 20);
    }
  };

  const averageMastery = useMemo(() => {
    const vals = ALL_NODE_IDS.map(id => bktStates[id]?.pKnown ?? 0);
    return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 100);
  }, [bktStates]);

  const csColName = csRenamed ? 'CompSci' : 'CS';

  const EXPLORATION_STEPS = [
    { title: 'Lab 1: Series Explorer', instruction: 'Edit values and labels, add elements, and watch dtype, size, shape, sum and mean recompute — real numpy promotion rules.', nodeId: 'leip102_series' as NodeId },
    { title: 'Lab 2: Alignment & Vector Ops', instruction: 'Add, subtract, multiply, divide or compare CS with IP. Different labels → NaN. Switch to a scalar op to broadcast.', nodeId: 'leip102_vectorized_alignment' as NodeId },
    { title: 'Lab 3: DataFrame Builder', instruction: 'Toggle columns from a dict of Series, add a computed Total, rename CS, then slice with head()/tail() and your own n.', nodeId: 'leip102_dataframe' as NodeId },
    { title: 'Lab 4: loc, iloc & Boolean Mask', instruction: 'Pull one row by LABEL (loc) or POSITION (iloc), then filter the class with df[cs > threshold].', nodeId: 'leip102_loc_iloc_missing' as NodeId },
    { title: 'Lab 5: Missing Values Clinic', instruction: 'Count NaNs per column, then treat them: dropna() shrinks the table, fillna(0) and fillna(mean) reshape nothing — compare honestly.', nodeId: 'leip102_loc_iloc_missing' as NodeId },
  ];

  const renderDFTable = (rows: typeof dfRows) => (
    <div className="overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full text-xs">
        <thead>
          <tr className="bg-slate-800/80">
            <th className="px-2 py-2 text-left text-slate-400 font-mono">index</th>
            {rows.length > 0 && Object.keys(rows[0]).filter(k => !k.startsWith('_')).map(k => {
              if (k === 'CS' && !colCS) return null;
              if (k === 'IP' && !colIP) return null;
              if (k === 'Math' && !colMath) return null;
              if (k === 'Total' && !colTotal) return null;
              return <th key={k} className="px-3 py-2 text-left font-bold text-slate-200 whitespace-nowrap">{k === 'CS' && csRenamed ? 'CompSci' : k}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.label + i} className={i % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}>
              <td className="px-2 py-1.5 font-mono text-slate-500">{r.label}</td>
              {(['CS', 'IP', 'Math', 'Total'] as const).map(c => {
                if (c === 'CS' && !colCS) return null;
                if (c === 'IP' && !colIP) return null;
                if (c === 'Math' && !colMath) return null;
                if (c === 'Total' && !colTotal) return null;
                const v = r[c];
                return <Cell key={c} v={v === undefined ? null : v} />;
              })}
            </tr>
          ))}
          {rows.length === 0 && (
            <tr><td className="px-3 py-3 text-slate-500 italic" colSpan={5}>Empty DataFrame — no rows match (this is what pandas returns too).</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-2 sm:p-4 md:p-6 select-none">
      {/* HEADER */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 backdrop-blur border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-700 rounded-xl shadow-lg">
            <Braces className="w-8 h-8 text-slate-950" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400 bg-clip-text text-transparent">
              Data Handling Using Pandas — I
            </h1>
            <p className="text-xs text-slate-400">Class 12 IP • Series • Alignment • DataFrame • loc/iloc • NaN clinic</p>
          </div>
        </div>

        <div className="flex items-center gap-4 flex-wrap justify-end">
          <div className="bg-slate-800/80 px-4 py-2 rounded-xl border border-slate-700 flex items-center gap-3">
            <div className="flex items-center gap-1 text-emerald-400 font-bold text-sm">
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
              {soundEnabled ? <Volume2 className="w-5 h-5 text-emerald-400" /> : <VolumeX className="w-5 h-5 text-slate-500" />}
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
          { id: 'summary', label: '5. Summary & Real Task', icon: Layers }
        ].map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id as 'discovery' | 'lab' | 'challenges' | 'misconceptions' | 'summary'); playFx('tap'); }}
              className={`flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                active
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 shadow-lg shadow-emerald-500/20 font-bold'
                  : 'bg-slate-900/80 hover:bg-slate-800 text-slate-400 border border-slate-800'
              }`}>
              <Icon className={`w-4 h-4 ${active ? 'text-slate-950' : 'text-emerald-400'}`} />
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
              <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
              <h2 className="text-2xl font-bold text-emerald-400 mb-3 flex items-center gap-2">
                <Compass className="w-6 h-6" /> Scenario Context
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-base leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800/80">{SCENARIO.context}</p>
            </div>

            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
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
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-xs font-bold text-emerald-400">
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
                    <p className="font-bold mb-1">pandas Insight:</p>
                    <p>{DISCOVERY_QUESTION.hintAfter}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" /> Interactive Predictions
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
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950 shadow-md'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}>
                  {step.title}
                </button>
              ))}
            </div>

            <div className="bg-slate-900 border border-emerald-500/20 rounded-2xl p-5 shadow-xl flex items-center gap-4">
              <div className="p-3 bg-emerald-500/10 rounded-xl border border-emerald-500/30">
                <Beaker className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="font-bold text-emerald-400 text-sm">{EXPLORATION_STEPS[activeExplorationIndex].title}</h3>
                <p className="text-slate-300 text-sm">{EXPLORATION_STEPS[activeExplorationIndex].instruction}</p>
              </div>
            </div>

            {/* ── LAB 1: SERIES ── */}
            {activeExplorationIndex === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><Sigma className="w-4 h-4" /> s_cs — the CS class test (editable)</h4>
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-800/80">
                          <th className="px-3 py-2 text-left text-slate-200 font-bold">index label</th>
                          <th className="px-3 py-2 text-right text-slate-200 font-bold">value</th>
                        </tr>
                      </thead>
                      <tbody>
                        {csSeries.map((p, i) => (
                          <tr key={i} className={i % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}>
                            <td className="px-2 py-1.5">
                              <input value={p[0]} onChange={e => setLabel(i, e.target.value)}
                                className="w-28 min-h-8 bg-slate-900 border border-slate-700 rounded-lg px-2 text-xs text-sky-300 font-mono focus:border-emerald-500 outline-none" />
                            </td>
                            <td className="px-2 py-1.5 text-right">
                              <input value={p[1] === null ? '' : String(p[1])} onChange={e => setValue(i, e.target.value)}
                                className="w-24 min-h-8 bg-slate-900 border border-slate-700 rounded-lg px-2 text-xs text-slate-100 font-mono text-right focus:border-emerald-500 outline-none" />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={addSeriesElement} className="px-4 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-all">+ append element</button>
                    <button onClick={dropLastElement} className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-xs font-bold transition-all">− drop last</button>
                  </div>
                  <CodeLine>{`s_cs = pd.Series(${JSON.stringify(Object.fromEntries(csSeries.map(p => [p[0], p[1]])))})`}</CodeLine>
                </div>
                <div className="bg-slate-950 p-5 rounded-xl border border-slate-800 space-y-3">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><Hash className="w-4 h-4" /> Attribute readouts</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <Readout label="s.size" value={`${csSeries.length} elements`} tone="emerald" />
                    <Readout label="s.count()" value={`${csStats.count} non-null`} tone="sky" />
                    <Readout label="s.shape" value={`(${csSeries.length},)`} tone="indigo" />
                    <Readout label="s.ndim" value="1" tone="indigo" />
                    <Readout label="s.dtype" value={csDtype} tone={csDtype === 'int64' ? 'emerald' : 'amber'} />
                    <Readout label="NaN cells" value={`${csStats.nulls}`} tone={csStats.nulls ? 'rose' : 'emerald'} />
                    <Readout label="s.sum()" value={csStats.sum === null ? '—' : String(csStats.sum)} tone="violet" />
                    <Readout label="s.mean()" value={csStats.mean === null ? '—' : csStats.mean.toFixed(2)} tone="violet" />
                    <Readout label="s.min()" value={csStats.min === null ? '—' : String(csStats.min)} tone="sky" />
                    <Readout label="s.max()" value={csStats.max === null ? '—' : String(csStats.max)} tone="sky" />
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Type 7.5 anywhere: dtype flips int64 → float64 for the WHOLE Series. Leave a cell empty → NULL/NaN — and mean() still works because pandas skips NaNs.
                  </p>
                </div>
              </div>
            )}

            {/* ── LAB 2: ALIGNMENT ── */}
            {activeExplorationIndex === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><ArrowRightLeft className="w-4 h-4" /> Operation console</h4>
                  <div className="grid grid-cols-5 gap-1.5">
                    {(['+', '-', '*', '/', '>'] as const).map(o => (
                      <button key={o} onClick={() => { setOp(o); playFx('tap'); }}
                        className={`py-2.5 rounded-xl border font-mono text-sm font-bold transition-all ${
                          op === o ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'
                        }`}>
                        {o}
                      </button>
                    ))}
                  </div>
                  <label className="flex items-center justify-between text-xs text-slate-300 pt-2">
                    <span>Scalar mode: s_cs {op} k</span>
                    <button onClick={() => { setUseScalar(!useScalar); playFx('tap'); }}
                      className={`w-11 h-6 rounded-full transition-colors relative ${useScalar ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                      <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${useScalar ? 'left-[22px]' : 'left-0.5'}`} />
                    </button>
                  </label>
                  {useScalar && (
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-2">
                        <span>k (scalar):</span>
                        <span className="font-bold text-emerald-400">{scalar}</span>
                      </div>
                      <input type="range" min={1} max={10} value={scalar} onChange={e => setScalar(Number(e.target.value))} className="w-full accent-emerald-500" />
                    </div>
                  )}
                  <CodeLine>{useScalar ? `result = s_cs ${op} ${scalar}` : `result = s_cs ${op} s_ip`}</CodeLine>
                  <div className="grid grid-cols-2 gap-2">
                    <Readout label="Union labels" value={`${alignResult.length} labels`} tone="indigo" />
                    <Readout label="NaN in result" value={`${alignNaNs} cells`} tone={alignNaNs ? 'rose' : 'emerald'} />
                    <Readout label="Aligned pairs" value={useScalar ? `all ${csSeries.length}` : `${alignResult.length - alignNaNs}`} tone="sky" />
                    <Readout label="Result dtype" value={resultDtype} tone={resultDtype === 'int64' ? 'emerald' : 'amber'} />
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  <div className="overflow-x-auto rounded-xl border border-slate-800">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="bg-slate-800/80">
                          <th className="px-3 py-2 text-left text-slate-400 font-mono">label</th>
                          <th className="px-3 py-2 text-right text-slate-200 font-bold">s_cs (CS test)</th>
                          <th className="px-3 py-2 text-right text-slate-200 font-bold">s_ip (IP test)</th>
                          <th className="px-3 py-2 text-right text-emerald-300 font-bold">result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {alignResult.map(([label, v], rowIdx) => {
                          const a = lookup(csSeries, label);
                          const b = lookup(ipSeries, label);
                          return (
                            <tr key={label} className={rowIdx % 2 === 0 ? 'bg-slate-950/60' : 'bg-slate-900/60'}>
                              <td className="px-3 py-1.5 font-mono text-slate-400">{label}</td>
                              <Cell v={a} />
                              <Cell v={b} />
                              <td className={`px-3 py-1.5 text-right font-mono font-bold ${v === null ? 'text-rose-400 italic' : 'text-emerald-300'}`}>
                                {v === null ? 'NaN' : String(Math.round(v * 100) / 100)}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Ravi and Megha have no IP test; Ishita and Dev have no CS test — pair them and pandas answers NaN, not 0 and not an error.
                    In scalar mode nothing can be missing, so every row computes — broadcasting.
                  </p>
                </div>
              </div>
            )}

            {/* ── LAB 3: DATAFRAME ── */}
            {activeExplorationIndex === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><Columns3 className="w-4 h-4" /> df = pd.DataFrame({'{'}&quot;CS&quot;: …{'}'})</h4>
                  {([
                    { label: 'CS column', on: colCS, set: setColCS },
                    { label: 'IP column', on: colIP, set: setColIP },
                    { label: 'Math column', on: colMath, set: setColMath },
                    { label: 'Total (= CS+IP+Math)', on: colTotal, set: setColTotal },
                  ] as const).map(c => (
                    <label key={c.label} className="flex items-center justify-between text-xs text-slate-300 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2.5">
                      <span>{c.label}</span>
                      <button onClick={() => { c.set(!c.on); playFx('tap'); }}
                        className={`w-11 h-6 rounded-full transition-colors relative ${c.on ? 'bg-emerald-500' : 'bg-slate-700'}`}>
                        <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${c.on ? 'left-[22px]' : 'left-0.5'}`} />
                      </button>
                    </label>
                  ))}
                  <div className="flex gap-2">
                    <button onClick={() => { setColTotal(true); playFx('chime'); }} className="flex-1 py-2 bg-emerald-600/80 hover:bg-emerald-500 text-white rounded-xl text-[11px] font-bold">
                      + add Total column
                    </button>
                    <button onClick={() => { setColTotal(false); playFx('pop'); }} className="flex items-center justify-center gap-1 py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-[11px] font-bold">
                      <Trash2 className="w-3.5 h-3.5" /> del
                    </button>
                  </div>
                  <button onClick={() => { setCsRenamed(!csRenamed); playFx('tap'); }} className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700 rounded-xl text-[11px] font-bold">
                    {csRenamed ? `df.rename(columns={"CS":"CS"}) — undo` : `df.rename(columns={"CS":"CompSci"})`}
                  </button>
                  <div className="grid grid-cols-2 gap-2">
                    <Readout label="df.shape" value={`(${dfShape[0]}, ${dfShape[1]})`} tone="indigo" />
                    <Readout label="df.size" value={`${dfSize} cells`} tone="emerald" />
                    <Readout label="df.ndim" value="2" tone="indigo" />
                    <Readout label="len(df.columns)" value={String(activeColCount)} tone="sky" />
                  </div>
                  <CodeLine>{`df.index → [${dfLabels.slice(0, 4).join(', ')}…]\ndf.columns → [${[colCS ? (csRenamed ? 'CompSci' : 'CS') : null, colIP ? 'IP' : null, colMath ? 'Math' : null, colTotal ? 'Total' : null].filter(Boolean).join(', ')}]`}</CodeLine>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex gap-1.5">
                      {(['head', 'tail'] as const).map(m => (
                        <button key={m} onClick={() => { setHeadMode(m); playFx('tap'); }}
                          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${headMode === m ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                          df.{m}()
                        </button>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                      <span className="text-xs text-slate-400">n =</span>
                      <input type="range" min={1} max={7} value={sliceN} onChange={e => { setSliceN(Number(e.target.value)); playFx('count'); }} className="flex-1 accent-emerald-500" />
                      <span className="text-xs font-bold text-emerald-400 w-4">{sliceN}</span>
                    </div>
                  </div>
                  <CodeLine>{`df.${headMode}(${sliceN})  →  ${slicedRows.length} of ${dfRows.length} rows`}</CodeLine>
                  {renderDFTable(slicedRows)}
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    Building a DataFrame from a dict of Series takes the UNION of all Series indices (7 students) and inserts NaN where a Series has no value — the CS column is missing for Ishita and Dev, exactly as in real pandas.
                  </p>
                </div>
              </div>
            )}

            {/* ── LAB 4: LOC / ILOC / MASK ── */}
            {activeExplorationIndex === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><ListFilter className="w-4 h-4" /> Row selection: loc vs iloc</h4>
                  <div className="flex gap-2">
                    {(['loc', 'iloc'] as const).map(m => (
                      <button key={m} onClick={() => { setSelMethod(m); playFx('tap'); }}
                        className={`px-5 py-2.5 rounded-xl border text-xs font-bold font-mono transition-all ${selMethod === m ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                        df.{m}[…]
                      </button>
                    ))}
                  </div>
                  {selMethod === 'loc' ? (
                    <select value={selLabel} onChange={e => { setSelLabel(e.target.value); playFx('tap'); }}
                      className="w-full min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-3 text-sm text-slate-200">
                      {dfLabels.map(l => <option key={l} value={l}>{l}</option>)}
                    </select>
                  ) : (
                    <div>
                      <div className="flex justify-between text-xs text-slate-300 mb-2">
                        <span>Position (zero-based):</span>
                        <span className="font-bold text-emerald-400">{selPos}</span>
                      </div>
                      <input type="range" min={0} max={dfLabels.length - 1} value={selPos} onChange={e => { setSelPos(Number(e.target.value)); playFx('count'); }} className="w-full accent-emerald-500" />
                    </div>
                  )}
                  <CodeLine>{selMethod === 'loc' ? `df.loc["${selLabel}"]` : `df.iloc[${selPos}]`}</CodeLine>
                  {selectionResult.length ? (
                    <div className="bg-slate-950 border border-emerald-500/40 rounded-xl p-4 font-mono text-xs text-slate-200 space-y-1">
                      {selectionResult.map(r => (
                        <p key={r.label}>
                          <span className="text-sky-300">{r.label}</span> → CS {r.CS === null ? 'NaN' : r.CS}, IP {r.IP === null ? 'NaN' : r.IP}, Math {r.Math === null ? 'NaN' : r.Math}
                          {r.Total !== undefined && <span>, Total {r.Total === null ? 'NaN' : r.Total}</span>}
                        </p>
                      ))}
                    </div>
                  ) : (
                    <Verdict ok={false} text={`KeyError / position out of range: ${selMethod === 'loc' ? `"${selLabel}" is not an index label` : `position ${selPos} exceeds the last row`}`} />
                  )}
                  {selMethod === 'loc' && selLabel === 'Ravi' && (
                    <p className="text-[11px] text-amber-300">Notice: try loc[2] mentally — no label is the number 2. That is the loc/iloc trap in one line.</p>
                  )}
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><Binary className="w-4 h-4" /> Boolean indexing</h4>
                  <div>
                    <div className="flex justify-between text-xs text-slate-300 mb-2">
                      <span>Threshold on {maskColumn}:</span>
                      <span className="font-bold text-emerald-400">{maskThreshold} marks</span>
                    </div>
                    <input type="range" min={50} max={100} value={maskThreshold} onChange={e => { setMaskThreshold(Number(e.target.value)); playFx('count'); }} className="w-full accent-emerald-500" />
                  </div>
                  <div className="flex gap-2">
                    {(['CS', 'IP', 'Math'] as const).map(c => (
                      <button key={c} onClick={() => { setMaskColumn(c); playFx('tap'); }}
                        className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all ${maskColumn === c ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                        {c}
                      </button>
                    ))}
                  </div>
                  <CodeLine>{`df[df["${maskColumn === 'CS' && csRenamed ? 'CompSci' : maskColumn}"] > ${maskThreshold}]`}</CodeLine>
                  <Readout label="Rows passing the mask" value={`${maskResult.length} of ${dfRows.length} students`} tone={maskResult.length ? 'emerald' : 'rose'} />
                  {renderDFTable(maskResult)}
                </div>
              </div>
            )}

            {/* ── LAB 5: MISSING VALUES ── */}
            {activeExplorationIndex === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="font-bold text-emerald-400 text-sm flex items-center gap-2"><Eraser className="w-4 h-4" /> NaN clinic</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {([
                      { id: 'view', label: 'df (view)' },
                      { id: 'dropna', label: 'df.dropna()' },
                      { id: 'fillna0', label: 'df.fillna(0)' },
                      { id: 'fillnaMean', label: 'fillna(mean)' },
                    ] as const).map(a => (
                      <button key={a.id} onClick={() => { setMissingAction(a.id); playFx('tap'); }}
                        className={`py-2.5 px-2 rounded-xl border text-[11px] font-bold font-mono transition-all ${missingAction === a.id ? 'bg-emerald-500 border-emerald-400 text-slate-950' : 'bg-slate-950 border-slate-800 text-slate-400'}`}>
                        {a.label}
                      </button>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <Readout label="df.isnull().sum()" value={`CS ${nullsPerColumn.CS} • IP ${nullsPerColumn.IP} • Math ${nullsPerColumn.Math}`} tone={nullsPerColumn.CS + nullsPerColumn.IP ? 'rose' : 'emerald'} />
                    <Readout label="Shape after action" value={missingAction === 'dropna' ? `(${missingViewRows.length}, ${activeColCount})` : `(${dfRows.length}, ${activeColCount})`} tone={missingAction === 'dropna' ? 'amber' : 'indigo'} />
                  </div>
                  {missingAction === 'fillnaMean' && (
                    <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 font-mono text-[11px] text-slate-300">
                      column means (non-null): CS {colMean('CS')?.toFixed(1)}, IP {colMean('IP')?.toFixed(1)}, Math {colMean('Math')?.toFixed(1)}
                    </div>
                  )}
                  <p className="text-[11px] text-slate-500 leading-relaxed">
                    dropna() removes every row with ANY NaN — the shape shrinks. fillna() keeps all 7 rows and only changes cell values. Same data, two very different report cards.
                  </p>
                </div>
                <div className="lg:col-span-2 space-y-3">
                  <CodeLine>{missingAction === 'view' ? 'df' : missingAction === 'dropna' ? 'df.dropna()' : missingAction === 'fillna0' ? 'df.fillna(0)' : 'df.fillna(df.mean())'}</CodeLine>
                  {renderDFTable(missingViewRows)}
                  {missingAction === 'dropna' && (
                    <Readout label="Students kept (complete data)" value={missingViewRows.map(r => r.label).join(', ') || 'nobody'} tone="emerald" />
                  )}
                </div>
              </div>
            )}

            {/* Guided observation */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-slate-100 mb-4 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-400" /> {OBSERVATION_QUESTIONS[0].question}
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
                      style = 'bg-indigo-950/80 border-indigo-500 text-indigo-100';
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
                      className="flex-1 min-h-11 bg-slate-950 border border-slate-700 rounded-xl px-4 text-lg text-slate-100 focus:border-emerald-500 outline-none"
                    />
                    {currentChallenge.unit && <span className="text-sm text-slate-500 font-bold">{currentChallenge.unit}</span>}
                  </div>
                </div>
              )}

              {!challengeFeedback?.submitted ? (
                <button onClick={handleSubmitChallenge} className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 rounded-xl font-bold shadow-lg hover:from-emerald-400 transition-all">
                  Submit Answer
                </button>
              ) : (
                <div className="space-y-4">
                  <Verdict ok={challengeFeedback.isCorrect} text={challengeFeedback.isCorrect ? 'Correct! +10 points.' : 'Incorrect — compare with the lab output.'} />
                  <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-sm text-slate-300">
                    <p className="font-bold text-emerald-400 mb-1">Explanation:</p>{challengeFeedback.explanation}
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
              <h2 className="text-2xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <AlertTriangle className="w-6 h-6" /> Key Misconceptions Clarified
              </h2>
              <p className="text-slate-400 text-sm mb-6">The classic pandas traps — every one of them reproducible in the labs above.</p>
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
            <div className="bg-slate-900 border border-emerald-500/30 rounded-2xl p-6 shadow-xl">
              <h2 className="text-2xl font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <Sparkles className="w-6 h-6" /> {REAL_WORLD_ACTIVITY.title}
              </h2>
              <p className="text-slate-300 text-sm mb-6">{REAL_WORLD_ACTIVITY.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <div className="w-7 h-7 rounded-full bg-emerald-500 text-slate-950 font-bold text-xs flex items-center justify-center flex-shrink-0">{idx + 1}</div>
                    <p className="text-slate-300 text-xs leading-relaxed font-mono">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-400" /> Concept Mastery Matrix
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
                {ALL_NODE_IDS.map(nodeId => {
                  const m = Math.round((bktStates[nodeId]?.pKnown ?? 0) * 100);
                  const level = getMasteryLevel(bktStates[nodeId]?.pKnown ?? 0);
                  return (
                    <div key={nodeId} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-center">
                      <p className="text-[10px] text-slate-400 font-mono mb-1">{nodeId}</p>
                      <div className="text-lg font-bold text-emerald-400">{m}%</div>
                      <p className="text-[10px] text-slate-500">{level}</p>
                      <div className="w-full bg-slate-800 h-1.5 rounded-full mt-2 overflow-hidden">
                        <div className="bg-emerald-500 h-full transition-all duration-500" style={{ width: `${m}%` }} />
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
          message={currentChallenge.hints[currentHintIndex] || 'Re-run the operation in the lab and read the counters.'}
          onComplete={() => setShowHint(false)}
        />
      )}
      {showHint && currentChallenge && currentHintIndex < 2 && (
        <button onClick={() => setCurrentHintIndex(i => i + 1)} className="fixed bottom-4 right-4 z-40 px-4 py-2 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold shadow-xl">
          Next hint ({currentHintIndex + 1}/3)
        </button>
      )}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccessBanner && <SuccessBanner message="Pandas Part One mastered!" onComplete={() => setShowSuccessBanner(false)} />}
    </div>
  );
}
