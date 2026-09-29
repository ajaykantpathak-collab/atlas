'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Maths -- Statistics
 *
 * Raw-data explorer: mean, median, mode of a live-editable data set with
 * outlier experiments. Plus the full grouped-data machine from the syllabus:
 * mean by direct / assumed-mean / step-deviation, modal class formula,
 * median via cumulative frequency, and a live ogive.
 *
 * Deep layout (master-class, 5 tabs):
 *   1. Discover  -- predict-then-test walks
 *   2. Raw Data Lab -- original live-data sim, preserved + extended
 *                      (variance/SD, grouped frequency view)
 *   3. Grouped Data  -- editable frequency table, all three mean methods,
 *                       modal & median class formulas, live ogive
 *   4. Challenge -- 3-tier quiz with hints
 *   5. Truths    -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'raw' | 'grouped' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'raw', label: '2 \u00b7 Raw Data Lab', emoji: '\ud83d\udcca' },
  { id: 'grouped', label: '3 \u00b7 Grouped Data', emoji: '\ud83e\uddea' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

const START = [4, 7, 7, 9, 10, 12, 15, 18];

// ==========================================
// CHALLENGES
// ==========================================

interface Challenge {
  id: string;
  tier: 'foundation' | 'standard' | 'advanced';
  skill: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
}

const CHALLENGES: Challenge[] = [
  // --- foundation ---
  {
    id: 'ch_01',
    tier: 'foundation',
    skill: 'Definition pick',
    question: 'For the data 4, 7, 7, 9, 10, 12, 15, 18: the mode is 7 and the range is 14. What is the MEDIAN?',
    options: ['9.5', '9', '10', '7'],
    correctIndex: 0,
    explanation:
      'n = 8 (even), so median = mean of the 4th and 5th sorted values = (9 + 10)/2 = 9.5. The Raw Data Lab draws this as the pink line.',
    hints: [
      'Sort first, then find the middle TWO values.',
      'With an even count, average the two central observations.',
      '(9 + 10) / 2 = 9.5.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Which average?',
    question: 'A shop sells shoes in sizes 5, 6, 6, 7, 7, 7, 8. Which average best answers "which size should the shop stock most?"',
    options: ['mean', 'median', 'mode', 'range'],
    correctIndex: 2,
    explanation:
      'Stocking is about the MOST COMMON value -- the mode (size 7). Shoe sizes have no meaningful "average" (size 6.5 shoes do not fit anybody).',
    hints: [
      'Which average can only return a value that actually occurs in the data?',
      'You cannot stock a fractional shoe size.',
      'The mode -- size 7.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Mean formula',
    question: 'The mean of five observations is 12. Four of them are 8, 10, 12, 14. The fifth is:',
    options: ['16', '14', '18', '12'],
    correctIndex: 0,
    explanation:
      'Total = 5 \u00d7 12 = 60. Sum of four = 44. Fifth = 60 \u2212 44 = 16. Verify in the lab: enter 8, 10, 12, 14, 16 and read mean 12.',
    hints: [
      'Mean \u00d7 n gives the total of all observations.',
      'Subtract the four known values from the total.',
      '60 \u2212 44 = 16.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Outlier physics',
    question: 'Salaries at a 9-person firm: eight people earn \u20b920,000; the owner earns \u20b92,00,000. Which is TRUE?',
    options: [
      'The median salary (\u20b920,000) describes the typical worker better than the mean (\u20b940,000)',
      'The mean (\u20b940,000) describes the typical worker best',
      'Both averages equal \u20b920,000',
      'The mode is \u20b940,000',
    ],
    correctIndex: 0,
    explanation:
      'Mean = (8\u00d720k + 200k)/9 = \u20b940,000 -- double what anyone but the owner earns. Median = \u20b920,000, mode = \u20b920,000. Press the outlier button in the lab and watch exactly this split.',
    hints: [
      'Compute the mean: it includes the owner\u2019s huge salary.',
      'The median ignores HOW big the biggest value is -- only its position.',
      'Mean \u20b940,000 is inflated; median \u20b920,000 is honest.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Assumed mean method',
    question: 'Using the assumed-mean method with a = 15 for data 5, 10, 15, 20, 25 (all frequency 1): mean = a + \u03a3d/n where d = x \u2212 a. The result is:',
    options: ['15', '16', '20', '10'],
    correctIndex: 0,
    explanation:
      'd values: \u221210, \u22125, 0, 5, 10 \u2192 \u03a3d = 0 \u2192 mean = 15 + 0/5 = 15. Symmetric deviations always cancel -- that is the whole efficiency of the method.',
    hints: [
      'Deviations from 15: \u221210, \u22125, 0, +5, +10.',
      'They sum to zero -- what does that make the mean?',
      'Mean = 15 exactly.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Median of grouped data',
    question: 'Class intervals 0-10, 10-20, 20-30, 30-40 have frequencies 5, 8, 3, 4. The median class is:',
    options: ['0-10', '10-20', '20-30', '30-40'],
    correctIndex: 1,
    explanation:
      'N = 20, N/2 = 10. Cumulative frequencies: 5, 13, 16, 20. The first class whose cf exceeds 10 is 10-20 (cf 13). Median = 10 + ((10 \u2212 5)/8) \u00d7 10 = 16.25.',
    hints: [
      'Find N/2 first -- that is 10 here.',
      'Walk the cumulative frequencies until you pass 10.',
      'cf jumps from 5 to 13 at class 10-20.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Step deviation',
    question: 'For classes with midpoints 10, 20, 30, 40, 50 (frequencies 3, 7, 12, 6, 2), using a = 30 and h = 10, the step-deviation mean is a + h\u00b7(\u03a3fu/\u03a3f) where u = (x\u2212a)/h. It equals:',
    options: ['about 29.0', 'about 30.0', 'about 23.3', 'about 33.3'],
    correctIndex: 0,
    explanation:
      'u = \u22122, \u22121, 0, 1, 2. \u03a3fu = 3(\u22122) + 7(\u22121) + 0 + 6(1) + 2(2) = \u22126 \u2212 7 + 0 + 6 + 4 = \u22123. \u03a3f = 30. Mean = 30 + 10\u00d7(\u22123/30) = 29.0. Cross-check by direct method: \u03a3fx = 870, \u03a3f = 30 \u2192 870/30 = 29.0. Same answer, as always.',
    hints: [
      'Compute u = (x \u2212 30)/10 for each midpoint first.',
      '\u03a3fu = \u22126 \u2212 7 + 0 + 6 + 4; \u03a3f = 30.',
      'Mean = 30 + 10 \u00d7 (\u22123/30) = 29.0.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Mode formula',
    question: 'Modal class 20-30 has f1 = 12, f0 = 7 (previous class) and f2 = 4 (next class). The mode formula l + ((f1\u2212f0)/(2f1\u2212f0\u2212f2))\u00b7h gives:',
    options: ['20 + (5/13)\u00d710 \u2248 23.85', '20 + (5/10)\u00d710 = 25', '25 exactly', '30 + (5/13)\u00d710 \u2248 33.85'],
    correctIndex: 0,
    explanation:
      'l = 20 (lower limit), f1 \u2212 f0 = 5, 2f1 \u2212 f0 \u2212 f2 = 24 \u2212 7 \u2212 4 = 13, h = 10. Mode = 20 + (5/13)\u00d710 \u2248 23.85. The mode is pulled toward the MORE crowded neighbouring class (7 beats 4).',
    hints: [
      'Identify l, h, f0, f1, f2 from the sentence before touching the formula.',
      'The denominator is 2f1 \u2212 f0 \u2212 f2, not 2f1.',
      '20 + (5/13) \u00d7 10 \u2248 23.85.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'An ogive of 50 observations shows cumulative frequency 22 at the upper limit of class 20-30. The median lies:',
    options: [
      'in class 20-30',
      'in the NEXT class -- since 25 (N/2) has not been reached by 30',
      'exactly at 30',
      'cannot be located from an ogive',
    ],
    correctIndex: 1,
    explanation:
      'N/2 = 25. The ogive reaches only 22 by x = 30, so the median observation (the 25th/26th) sits in the following class. Reading the x-coordinate where the ogive crosses N/2 is exactly this hunt -- the Grouped tab draws it live.',
    hints: [
      'The median is the N/2-th observation.',
      'Has the ogive crossed 25 by the time x = 30?',
      'No -- so the median class starts after 30.',
    ],
  },
  // ─── Class 10 board-depth additions: statistics diagnostics ───
  {
    id: 'ch_depth_stat_class_marks',
    tier: 'standard',
    skill: 'Application',
    question:
      'A student gets mean = 28.5 for classes 0-10, 10-20, 20-30, 30-40, 40-50 but forgets what x_i stands for. What are x_i in the direct method?',
    options: [
      'The CLASS MARKS (mid-points): 5, 15, 25, 35, 45 -- each class is represented by its midpoint, weighted by f_i',
      'The upper limits: 10, 20, 30, 40, 50',
      'The lower limits: 0, 10, 20, 30, 40',
      'The class widths: 10, 10, 10, 10, 10',
    ],
    correctIndex: 0,
    explanation:
      'Grouped-data mean = sum(f_i x_i)/sum(f_i) with x_i = class mark = (lower + upper)/2. Using limits instead of midpoints shifts the mean by 5 -- a whole mark lost. Same midpoints feed the assumed-mean and step-deviation methods, so mastering x_i fixes all three at once.',
    hints: [
      'A whole class is compressed into ONE representative number.',
      'Midpoint = (0+10)/2 = 5 for the first class.',
      'Direct method: weights f_i on the midpoints.'
    ],
  },
  {
    id: 'ch_depth_stat_assumed_mean',
    tier: 'standard',
    skill: 'Analysis',
    question:
      'Compare the assumed-mean method with the direct method for the same data. Which involves smaller numbers, and why does d_i = x_i - a sum to zero?',
    options: [
      'Assumed mean works on deviations d_i from a convenient central a, so the arithmetic uses small numbers (easy mental math); the positive and negative deviations roughly cancel -- that is the point of choosing a near the centre',
      'The assumed-mean method gives a different answer from the direct method',
      'a must be zero or the mean breaks',
      'Only the direct method is allowed in boards'
    ],
    correctIndex: 0,
    explanation:
      'Both methods give the SAME mean: x-bar = a + sum(f_i d_i)/sum(f_i). The deviations d_i are small when a sits near the middle of the data, so you multiply and add single digits instead of two-digit midpoints. All three routes (direct, assumed mean, step deviation) are one family -- each simplifies the same sum differently.',
    hints: [
      'Deviations measured from the centre stay small.',
      'Choose a as a class mark near the middle.',
      'Same mean, friendlier numbers -- that is all.'
    ],
  },
  {
    id: 'ch_depth_stat_step_deviation_h',
    tier: 'advanced',
    skill: 'Analysis',
    question:
      'A student using step-deviation got mean = 42.3, then realised he divided by h = 10 when he should have MULTIPLIED back. What is the fix and the final formula?',
    options: [
      'u_i = (x_i - a)/h so x_i - a = h x u_i; hence mean = a + h x [sum(f_i u_i)/sum(f_i)] -- forgetting the h factor shifts the answer to deviations in class-width units',
      'The h factor is optional decoration',
      'The formula is mean = a - h x sum(f_i u_i)/sum(f_i)',
      'h must always be 1 for the method to work'
    ],
    correctIndex: 0,
    explanation:
      'Step deviation divides every deviation by the class width h to shrink numbers further (u_i = d_i/h). The mean scales back by multiplying by h. Quick sanity check: the mean must land inside the range of class marks -- if 42.3 sits outside 15..45, an h error is the first suspect.',
    hints: [
      'u is a SCALED deviation; undo the scale at the end.',
      'Sanity range: the mean cannot escape the data.',
      'mean = a + h x mean-of-u.'
    ],
  },
  {
    id: 'ch_depth_stat_median_formula',
    tier: 'standard',
    skill: 'Application',
    question:
      'Median class 40-50, N = 60, cumulative frequency before the class = 22, frequency of the class = 20. A student writes Median = 40 + [(30 - 22)/20] x 10 -- verify the pieces and finish.',
    options: [
      'Correct assembly: Median = l + [(N/2 - cf)/f] x h = 40 + (8/20) x 10 = 44 -- every symbol identified before substituting',
      'Wrong: use N instead of N/2, giving 49',
      'Wrong: cf means the class frequency, giving 40 + 8 x 10',
      'The median of grouped data cannot be computed by formula'
    ],
    correctIndex: 0,
    explanation:
      'Anatomy of the formula: l = lower limit of median class (40), N/2 = 30, cf = cumulative frequency BEFORE the class (22), f = frequency OF the class (20), h = class width (10). The student swapped nothing -- but the classic error is using cf AFTER the class, which inflates the numerator.',
    hints: [
      'Name l, N/2, cf, f, h before touching the calculator.',
      'cf counts everyone BELOW the median class.',
      '(30-22) = 8 of the 20 in-class steps: 8/20 of the width.'
    ],
  },
  {
    id: 'ch_depth_stat_ogive_reading',
    tier: 'standard',
    skill: 'Analysis',
    question:
      'On a less-than ogive with N = 60, the student marks 30 on the y-axis, draws a horizontal to the curve, and drops a perpendicular. What is the x-coordinate of the foot?',
    options: [
      'The MEDIAN -- the point on the ogive with cumulative frequency N/2 reads off as the median on the x-axis',
      'The mean of the distribution',
      'The mode -- highest point of the curve',
      'The upper limit of the last class',
    ],
    correctIndex: 0,
    explanation:
      'The less-than ogive plots cumulative frequency against upper class limits: at N/2 the value below which half the data lies sits exactly under the curve -- the median. Graph vs formula agree: the formula answer 44 lies in the same class the ogive points to. The more-than ogive crosses the less-than one at the same median point.',
    hints: [
      'Cumulative frequency N/2 = half the observations.',
      'Half below means: median.',
      'Mode needs a histogram, not an ogive.'
    ],
  },
  {
    id: 'ch_depth_stat_empirical_relation',
    tier: 'foundation',
    skill: 'Understanding',
    question:
      'Why is the relation 3 x Median = Mode + 2 x Mean called EMPIRICAL, and when does it hold?',
    options: [
      'It is a rule of thumb distilled from many real moderately-symmetric distributions, not a proven theorem -- it works best for unimodal distributions that are only mildly skewed, and fails for strong skew or multiple modes',
      'It is exact for every data set, proved by algebra',
      'It applies only to ungrouped data',
      'Empirical means the data was collected by experiment only'
    ],
    correctIndex: 0,
    explanation:
      'Rearranged: Mode = 3 x Median - 2 x Mean. Karl Pearson noted this approximation holds across many bell-ish datasets. Board use: given any two averages, estimate the third. Test the limits: for income data with a long right tail the formula drifts badly -- which is WHY it is called empirical and not a law.',
    hints: [
      'Empirical = observed pattern, not derived theorem.',
      'Symmetric data: mean = median = mode (check the formula).',
      'The more skewed the data, the worse the estimate.'
    ],
  },
  {
    id: 'ch_depth_stat_more_than_ogive',
    tier: 'advanced',
    skill: 'Application',
    question:
      'CBSE style: daily incomes of 50 workers are given as a "more than" series (more than 50: 50, more than 60: 42, ...). How do you convert this to a less-than ogive and find the median?',
    options: [
      'Subtract each cumulative count from N to get less-than cumulative frequencies (50 - 0 = 50 at 50, 50 - 8 = 42? -- careful: less-than cf at 60 = N - more-than cf at 60), plot upper limits vs less-than cf, then read the x at N/2 = 25',
      'Plot the more-than counts directly and read N',
      'Add the counts to N instead of subtracting',
      'Conversion is impossible from a more-than table'
    ],
    correctIndex: 0,
    explanation:
      'More-than cf counts observations ABOVE a limit; less-than cf = N - more-than cf at the same limit. After converting, plot points at (upper limit, less-than cf) and join smoothly. Median: horizontal from y = 25 to the curve, drop to the x-axis. Cross-check with the more-than ogive: the two curves intersect at the median.',
    hints: [
      'The two ogives are mirror views of one table.',
      'less-than cf + more-than cf = N at every limit.',
      'Intersections and N/2 crossings both give the median.'
    ],
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'The mean, median and mode of a data set are usually the same.',
    correction:
      'They coincide only for symmetric, single-humped data. Skew the data (the outlier button) and the three separate: mean chases extremes, median holds position, mode clumps. Their DIVERGENCE is itself information about the shape of the data.',
  },
  {
    misconception: 'Adding a constant to every value leaves the statistics unchanged.',
    correction:
      'Adding c shifts the mean and median by exactly c, but leaves the RANGE and deviations unchanged. Multiplying by c scales mean, median AND range by c. The lab\u2019s "all +1" button demonstrates the shift live.',
  },
  {
    misconception: 'In grouped data, the class 10-20 and 20-30 double-count the value 20.',
    correction:
      'By convention classes are continuous half-open intervals: 10-20 means 10 \u2264 x < 20, so 20 belongs to 20-30. That is why class width h = upper limit \u2212 lower limit = 10, with no gap.',
  },
  {
    misconception: 'The modal class IS the mode.',
    correction:
      'The modal class is the interval with highest frequency; the MODE is a computed value inside it via l + ((f1\u2212f0)/(2f1\u2212f0\u2212f2))\u00b7h. Reporting "20-30" for a mode question earns zero -- the formula pinpoints where inside the class the peak sits.',
  },
  {
    misconception: 'A bigger standard deviation means the data has bigger values.',
    correction:
      'SD measures SPREAD, not size. {1, 2, 3} and {1001, 1002, 1003} have identical SD = 1 but wildly different means. Mean = centre; SD = scatter. Both are needed to describe data honestly.',
  },
];

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_MathematicsStatisticsSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── raw data lab state (original preserved) ──
  const [data, setData] = useState<number[]>([...START]);

  // ── grouped data state ──
  const [gMid, setGMid] = useState<number[]>([10, 20, 30, 40, 50]);
  const [gFreq, setGFreq] = useState<number[]>([3, 7, 12, 6, 2]);
  const [classWidth, setClassWidth] = useState(10);
  const [gLower, setGLower] = useState(5);
  const [assumedMean, setAssumedMean] = useState(30);

  // ── discover / challenge / truths state ──
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  // ── raw stats (original formulas preserved) ──
  const stats = useMemo(() => {
    const n = data.length;
    const sum = data.reduce((a, b) => a + b, 0);
    const mean = sum / n;
    const sorted = [...data].sort((x, y) => x - y);
    const median =
      n % 2 === 1 ? sorted[(n - 1) / 2] : (sorted[n / 2 - 1] + sorted[n / 2]) / 2;
    const freq: Record<number, number> = {};
    data.forEach((v) => (freq[v] = (freq[v] || 0) + 1));
    const maxF = Math.max(...Object.values(freq));
    const modes = maxF > 1 ? Object.keys(freq).filter((k) => freq[Number(k)] === maxF).map(Number) : [];
    const range = sorted[n - 1] - sorted[0];
    const variance = data.reduce((a, b) => a + (b - mean) ** 2, 0) / n;
    return { n, sum, mean, median, modes, maxF, range, sorted, variance, sd: Math.sqrt(variance) };
  }, [data]);

  const setValue = (i: number, v: number) =>
    setData((d) => d.map((x, j) => (j === i ? Math.max(0, Math.min(20, v)) : x)));
  const addValue = () => setData((d) => (d.length < 12 ? [...d, Math.floor(Math.random() * 20)] : d));
  const removeValue = () => setData((d) => (d.length > 4 ? d.slice(0, -1) : d));
  const shiftAll = (delta: number) =>
    setData((d) => d.map((x) => Math.max(0, Math.min(20, x + delta))));
  const outlier = () => setData((d) => [...d.slice(0, -1), 20]);

  // chart geometry (original, preserved)
  const W = 440;
  const barW = W / data.length - 8;
  const meanY = 250 - (stats.mean / 20) * 220;
  const medianY = 250 - (stats.median / 20) * 220;

  // ── grouped data machine ──
  const gN = gFreq.reduce((a, b) => a + b, 0);
  const gSumFx = gMid.reduce((a, x, i) => a + x * gFreq[i], 0);
  const gMeanDirect = gSumFx / gN;
  const gD = gMid.map((x) => x - assumedMean);
  const gSumFd = gD.reduce((a, d, i) => a + d * gFreq[i], 0);
  const gMeanAssumed = assumedMean + gSumFd / gN;
  const gU = gD.map((d) => d / classWidth);
  const gSumFu = gU.reduce((a, u, i) => a + u * gFreq[i], 0);
  const gMeanStep = assumedMean + classWidth * (gSumFu / gN);
  const modalIdx = gFreq.indexOf(Math.max(...gFreq));
  const f1 = gFreq[modalIdx];
  const f0 = modalIdx > 0 ? gFreq[modalIdx - 1] : 0;
  const f2 = modalIdx < gFreq.length - 1 ? gFreq[modalIdx + 1] : 0;
  const modalLower = gMid[modalIdx] - classWidth / 2;
  const gModeDen = 2 * f1 - f0 - f2;
  const gMode =
    gModeDen !== 0 ? modalLower + ((f1 - f0) / gModeDen) * classWidth : modalLower + classWidth / 2;
  // median
  const halfN = gN / 2;
  let cum = 0;
  let medianIdx = 0;
  let cfBefore = 0;
  for (let i = 0; i < gFreq.length; i++) {
    cum += gFreq[i];
    if (cum >= halfN && medianIdx === 0 && halfN > 0) {
      medianIdx = i;
      cfBefore = cum - gFreq[i];
      break;
    }
  }
  const medianLower = gMid[medianIdx] - classWidth / 2;
  const gMedian =
    medianLower + ((halfN - cfBefore) / Math.max(gFreq[medianIdx], 1)) * classWidth;

  // ogive geometry
  const ogiveMax = Math.max(...gMid) + classWidth / 2;
  const ogivePts = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    let c = 0;
    pts.push({ x: gMid[0] - classWidth / 2, y: 0 });
    gMid.forEach((m, i) => {
      c += gFreq[i];
      pts.push({ x: m + classWidth / 2, y: c });
    });
    return pts;
  }, [gMid, gFreq, classWidth]);
  const ox = (x: number) => 40 + (x / ogiveMax) * 360;
  const oy = (y: number) => 190 - (y / Math.max(gN, 1)) * 160;

  const score = useMemo(() => {
    let right = 0;
    let attempted = 0;
    Object.entries(answers).forEach(([id, choice]) => {
      const ch = CHALLENGES.find((c) => c.id === id);
      if (ch) {
        attempted += 1;
        if (choice === ch.correctIndex) right += 1;
      }
    });
    return { right, attempted };
  }, [answers]);

  const visibleChallenges = CHALLENGES.filter((c) => tierFilter === 'all' || c.tier === tierFilter);

  const pickAnswer = (id: string, idx: number) => {
    if (revealed[id]) return;
    setAnswers((a) => ({ ...a, [id]: idx }));
    setRevealed((r) => ({ ...r, [id]: true }));
  };

  const statCard = (label: string, value: string, color: string, sub?: string) => (
    <div className="bg-slate-950 rounded-xl px-3 py-2 border border-slate-800">
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
      <p className={`font-mono font-black text-lg ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-slate-500">{sub}</p>}
    </div>
  );

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700">\ud83d\udcca</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-gold-400">Class 10 -- Statistics</span>
          <h1 className="text-xl md:text-2xl font-extrabold">Mean, Median, Mode -- Raw and Grouped</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">n = {stats.n}</span>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-gold-600 border-gold-500 text-white shadow-lg shadow-gold-900/40'
                : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            <span className="mr-1">{t.emoji}</span>
            {t.label}
          </button>
        ))}
      </nav>

      {/* ============================================================ */}
      {/* TAB 1: DISCOVER                                              */}
      {/* ============================================================ */}
      {tab === 'discover' && (
        <div className="space-y-4">
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-gold-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-gold-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              The data set 4, 7, 7, 9, 10, 12, 15, 18 has mean 10.25. You replace the 18 with 20 (the
              outlier button). Which statistic moves MOST?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'The mean jumps the most -- it uses every value\u2019s size.',
                'The median jumps the most -- it sits in the middle of the list.',
                'The mode jumps the most.',
                'All three move equally.',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 0;
                let cls = 'border-slate-700 bg-slate-900 hover:border-gold-600';
                if (predicted !== null && isCorrect) cls = 'border-emerald-600 bg-emerald-950/40';
                else if (chosen && !isCorrect) cls = 'border-rose-600 bg-rose-950/40';
                return (
                  <button
                    key={i}
                    onClick={() => setPredicted(i)}
                    disabled={predicted !== null}
                    className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                  >
                    <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                    {opt}
                    {predicted !== null && isCorrect && <span className="ml-2 text-emerald-400 font-bold text-xs">\u2713</span>}
                  </button>
                );
              })}
            </div>
            {predicted !== null && (
              <div className="mt-3 p-3 rounded-xl bg-amber-950/40 border border-amber-800 text-xs text-amber-200 leading-relaxed">
                Mean is the only average that multiplies the outlier\u2019s full size into itself; the
                median only knows WHERE the largest value sits, not how large. Verify in the Raw Data
                Lab: press outlier!, read both lines, then restore 18 by hand.
                <button onClick={() => setTab('raw')} className="ml-2 underline font-bold text-amber-300">
                  Open Raw Data Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Skew the shape',
                d: 'Press outlier!, then all +1 three times. Watch the mean line drift off the median line -- that gap IS skewness, drawn live.',
              },
              {
                t: 'Walk 2: Three mean methods',
                d: 'Grouped tab: the direct, assumed-mean and step-deviation columns agree to 6 decimal places. Three roads, one destination -- pick per exam question.',
              },
              {
                t: 'Walk 3: Find the median class',
                d: 'Grouped tab: slide a frequency and watch the median class highlight jump. The ogive crossing N/2 is the same hunt, drawn.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-gold-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: RAW DATA LAB (original sim preserved + extended)      */}
      {/* ============================================================ */}
      {tab === 'raw' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
            <svg viewBox="0 0 460 300" className="w-full" role="img" aria-label="bar chart with mean and median lines">
              <line x1={20} y1={250} x2={440} y2={250} stroke="#475569" strokeWidth={2} />
              <line x1={20} y1={30} x2={20} y2={250} stroke="#475569" strokeWidth={2} />
              {[0, 5, 10, 15, 20].map((g) => (
                <g key={g}>
                  <line x1={20} y1={250 - (g / 20) * 220} x2={440} y2={250 - (g / 20) * 220} stroke="#1e293b" strokeWidth={1} />
                  <text x={14} y={254 - (g / 20) * 220} textAnchor="end" fill="#64748b" fontSize={9}>{g}</text>
                </g>
              ))}
              {data.map((v, i) => {
                const h = (v / 20) * 220;
                const x = 28 + i * (W / data.length);
                const isMode = stats.modes.includes(v);
                return (
                  <g key={i}>
                    <rect
                      x={x} y={250 - h} width={barW} height={h} rx={4}
                      fill={isMode ? '#22d3ee' : '#38bdf8'} opacity={0.85}
                      className="transition-all duration-200"
                    />
                    <text x={x + barW / 2} y={244 - h} textAnchor="middle" fill="#e2e8f0" fontSize={10} fontFamily="monospace">
                      {v}
                    </text>
                  </g>
                );
              })}
              {/* mean line */}
              <line x1={20} y1={meanY} x2={440} y2={meanY} stroke="#f59e0b" strokeWidth={2} strokeDasharray="7 4" className="transition-all duration-200" />
              <text x={434} y={meanY - 5} textAnchor="end" fill="#f59e0b" fontSize={11} fontWeight="bold">
                mean {stats.mean.toFixed(2)}
              </text>
              {/* median line */}
              <line x1={20} y1={medianY} x2={440} y2={medianY} stroke="#f472b6" strokeWidth={2} strokeDasharray="2 4" className="transition-all duration-200" />
              <text x={24} y={medianY - 5} fill="#f472b6" fontSize={11} fontWeight="bold">
                median {stats.median}
              </text>
            </svg>
            <p className="text-[11px] text-slate-500 mt-1 text-center">
              Sorted data: {stats.sorted.join(', ')} &nbsp;\u00b7&nbsp; cyan bars = mode value(s)
            </p>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Edit each observation (0-20)</p>
              <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
                {data.map((v, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-500 w-8">x{i + 1}</span>
                    <input
                      type="range" min={0} max={20} value={v} aria-label={`observation ${i + 1}`}
                      onChange={(e) => setValue(i, Number(e.target.value))}
                      className="flex-1 accent-gold-400 h-1"
                    />
                    <span className="font-mono text-xs text-gold-300 w-6 text-right">{v}</span>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-4 gap-1.5 mt-3">
                <button onClick={addValue} className="py-1.5 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700">+ obs</button>
                <button onClick={removeValue} className="py-1.5 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700">- obs</button>
                <button onClick={() => shiftAll(1)} className="py-1.5 rounded-lg text-[10px] font-bold bg-slate-800 hover:bg-slate-700">all +1</button>
                <button onClick={outlier} className="py-1.5 rounded-lg text-[10px] font-bold bg-rose-900 hover:bg-rose-800">outlier!</button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {statCard('Mean', stats.mean.toFixed(2), 'text-amber-300', `sum ${stats.sum} / n ${stats.n}`)}
              {statCard('Median', String(stats.median), 'text-pink-300', 'middle of sorted list')}
              {statCard('Mode', stats.modes.length ? stats.modes.join(', ') : 'none', 'text-gold-300',
                stats.modes.length ? `appears ${stats.maxF} times` : 'no repeats')}
              {statCard('Range', String(stats.range), 'text-emerald-300', 'max - min')}
              {statCard('Variance', stats.variance.toFixed(2), 'text-gold-300', 'mean of squared deviations')}
              {statCard('Std. deviation', stats.sd.toFixed(2), 'text-gold-300', 'typical distance from mean')}
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                The mean uses every value, so a single extreme observation drags it. The median only
                cares about position in the sorted list -- push the outlier button and watch the amber
                mean line jump while the pink median line barely moves.
              </p>
            </div>

            <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
              <p className="font-bold text-gold-300 mb-1">What to try</p>
              <p>1. Add an outlier of 20, then try to restore the old mean by editing ONE other value. Possible?</p>
              <p className="mt-1">2. Build a data set where mean &gt; median &gt; mode. What shape do the bars have?</p>
              <p className="mt-1">3. Press all +1 five times. Which cards moved by exactly 5 and which did not move at all?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: GROUPED DATA                                          */}
      {/* ============================================================ */}
      {tab === 'grouped' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Frequency table (edit midpoints and frequencies)
              </p>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-slate-500">
                    <th className="text-left py-1">class</th>
                    <th className="text-left py-1">x\u1d62 (mid)</th>
                    <th className="text-left py-1">f\u1d62</th>
                    <th className="text-right py-1">cf</th>
                  </tr>
                </thead>
                <tbody className="font-mono">
                  {gMid.map((m, i) => {
                    let c = 0;
                    for (let j = 0; j <= i; j++) c += gFreq[j];
                    const isModal = i === modalIdx;
                    const isMedian = i === medianIdx;
                    return (
                      <tr
                        key={i}
                        className={`border-t border-slate-800 ${isModal ? 'bg-gold-950/50' : ''} ${isMedian ? 'bg-pink-950/40' : ''}`}
                      >
                        <td className="py-1 text-slate-400">
                          {m - classWidth / 2}-{m + classWidth / 2}
                        </td>
                        <td className="py-1">
                          <input
                            type="number"
                            value={m}
                            min={0}
                            max={200}
                            aria-label={`midpoint ${i + 1}`}
                            onChange={(e) =>
                              setGMid((arr) => arr.map((x, j) => (j === i ? Math.max(0, Math.min(200, Number(e.target.value) || 0)) : x)))
                            }
                            className="w-14 bg-slate-950 border border-slate-700 rounded px-1 text-gold-300"
                          />
                        </td>
                        <td className="py-1">
                          <input
                            type="number"
                            value={gFreq[i]}
                            min={0}
                            max={99}
                            aria-label={`frequency ${i + 1}`}
                            onChange={(e) =>
                              setGFreq((arr) => arr.map((x, j) => (j === i ? Math.max(0, Math.min(99, Number(e.target.value) || 0)) : x)))
                            }
                            className={`w-14 bg-slate-950 border rounded px-1 ${isModal ? 'border-gold-500 text-gold-300' : 'border-slate-700 text-slate-200'}`}
                          />
                        </td>
                        <td className="py-1 text-right text-slate-500">{c}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="grid grid-cols-3 gap-2 mt-3">
                <div>
                  <label className="text-[10px] text-slate-500 flex justify-between">
                    <span>class width h</span>
                    <span className="font-mono text-gold-300">{classWidth}</span>
                  </label>
                  <input type="range" min={2} max={20} value={classWidth} aria-label="class width"
                    onChange={(e) => setClassWidth(Number(e.target.value))} className="w-full accent-gold-500" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 flex justify-between">
                    <span>assumed mean a</span>
                    <span className="font-mono text-amber-300">{assumedMean}</span>
                  </label>
                  <input type="range" min={0} max={100} step={5} value={assumedMean} aria-label="assumed mean"
                    onChange={(e) => setAssumedMean(Number(e.target.value))} className="w-full accent-amber-500" />
                </div>
                <div>
                  <label className="text-[10px] text-slate-500 flex justify-between">
                    <span>first class starts</span>
                    <span className="font-mono text-slate-300">{gLower}</span>
                  </label>
                  <input type="range" min={0} max={50} step={5} value={gLower} aria-label="first class lower limit"
                    onChange={(e) => setGLower(Number(e.target.value))} className="w-full accent-slate-500" />
                </div>
              </div>
              <p className="text-[10px] text-slate-600 mt-2">
                cyan row = modal class \u00b7 pink row = median class \u00b7 N = {gN}
              </p>
            </div>

            {/* three-method working */}
            <div className="bg-slate-900/80 rounded-2xl border border-emerald-800/60 p-4 text-xs font-mono space-y-1.5">
              <p className="text-emerald-300 font-bold">1. Direct method</p>
              <p className="text-slate-400">
                x\u0304 = \u03a3fx / \u03a3f = {gSumFx} / {gN} = <span className="text-emerald-300 font-bold">{gMeanDirect.toFixed(4)}</span>
              </p>
              <p className="text-emerald-300 font-bold">2. Assumed mean method</p>
              <p className="text-slate-400">
                d = x \u2212 {assumedMean}: [{gD.map((d) => d).join(', ')}] \u00b7 \u03a3fd = {gSumFd}
              </p>
              <p className="text-slate-400">
                x\u0304 = a + \u03a3fd/\u03a3f = {assumedMean} + ({gSumFd}/{gN}) = <span className="text-emerald-300 font-bold">{gMeanAssumed.toFixed(4)}</span>
              </p>
              <p className="text-emerald-300 font-bold">3. Step deviation method</p>
              <p className="text-slate-400">
                u = d/{classWidth}: [{gU.map((u) => u).join(', ')}] \u00b7 \u03a3fu = {gSumFu}
              </p>
              <p className="text-slate-400">
                x\u0304 = a + h\u00b7(\u03a3fu/\u03a3f) = {assumedMean} + {classWidth}\u00d7({gSumFu}/{gN}) = <span className="text-emerald-300 font-bold">{gMeanStep.toFixed(4)}</span>
              </p>
              <p className="text-[10px] text-slate-600 font-sans">
                All three agree exactly -- they are the same sum wearing three costumes. Change a
                frequency and watch all three move together.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* mode + median cards */}
            <div className="grid grid-cols-1 gap-2">
              <div className="bg-slate-900/80 rounded-2xl border border-gold-800/60 p-4 text-xs font-mono space-y-1">
                <p className="text-gold-300 font-bold">Mode of grouped data</p>
                <p className="text-slate-400">
                  modal class {modalLower}-{modalLower + classWidth} \u00b7 f1={f1}, f0={f0}, f2={f2}, h={classWidth}
                </p>
                <p className="text-slate-400">
                  mode = l + ((f1\u2212f0)/(2f1\u2212f0\u2212f2))\u00b7h = {modalLower} + (({f1}\u2212{f0})/({2 * f1}\u2212{f0}\u2212{f2}))\u00d7{classWidth}
                </p>
                <p className="text-gold-200 font-bold text-sm">
                  = {gMode.toFixed(3)}
                  {gModeDen === 0 && <span className="text-amber-400"> (flat class -- denominator zero, midpoint used)</span>}
                </p>
              </div>

              <div className="bg-slate-900/80 rounded-2xl border border-pink-800/60 p-4 text-xs font-mono space-y-1">
                <p className="text-pink-300 font-bold">Median of grouped data</p>
                <p className="text-slate-400">
                  N/2 = {halfN} \u00b7 median class {medianLower}-{medianLower + classWidth} \u00b7 cf before = {cfBefore} \u00b7 f = {gFreq[medianIdx]}
                </p>
                <p className="text-slate-400">
                  median = l + ((N/2 \u2212 cf)/f)\u00b7h = {medianLower} + (({halfN}\u2212{cfBefore})/{gFreq[medianIdx]})\u00d7{classWidth}
                </p>
                <p className="text-pink-200 font-bold text-sm">= {gMedian.toFixed(3)}</p>
              </div>
            </div>

            {/* ogive */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-3">
              <p className="text-[10px] uppercase tracking-wider text-slate-500 mb-1">
                Less-than ogive -- the median is where it crosses N/2
              </p>
              <svg viewBox="0 0 420 210" className="w-full" role="img" aria-label="ogive">
                <line x1={40} y1={190} x2={400} y2={190} stroke="#475569" strokeWidth={1.5} />
                <line x1={40} y1={20} x2={40} y2={190} stroke="#475569" strokeWidth={1.5} />
                {/* N/2 line */}
                <line x1={40} y1={oy(halfN)} x2={400} y2={oy(halfN)} stroke="#f472b6" strokeWidth={1.5} strokeDasharray="4 3" />
                <text x={396} y={oy(halfN) - 4} textAnchor="end" fontSize={9} fill="#f472b6">N/2 = {halfN}</text>
                {/* ogive polyline */}
                <polyline
                  points={ogivePts.map((p) => `${ox(p.x)},${oy(p.y)}`).join(' ')}
                  fill="none" stroke="#22d3ee" strokeWidth={2.5}
                  className="transition-all duration-300"
                />
                {ogivePts.map((p, i) => (
                  <g key={i}>
                    <circle cx={ox(p.x)} cy={oy(p.y)} r={3} fill="#67e8f9" />
                    <text x={ox(p.x)} y={202} fontSize={8} fill="#64748b" textAnchor="middle">{p.x}</text>
                  </g>
                ))}
                <text x={220} y={209} fontSize={8} fill="#64748b" textAnchor="middle">upper class boundary</text>
              </svg>
              <p className="text-[11px] text-slate-500 leading-relaxed">
                Change any frequency: the ogive bends, the pink N/2 crossing slides, and the median
                formula above follows it exactly.
              </p>
            </div>

            <div className="bg-gold-950/40 rounded-2xl border border-gold-800/50 p-4 text-xs">
              <p className="font-bold text-gold-300 mb-1">What to try</p>
              <p>1. Make the data perfectly symmetric around 30 (hint: mirror the frequencies) -- what do mean, median and mode all become?</p>
              <p className="mt-1">2. Set f0 = f2 (equal neighbours of the modal class). Where does the mode formula drop the mode? Why is that geometrically obvious?</p>
              <p className="mt-1">3. Slide the assumed mean from 0 to 100. Does the final mean change? Does \u03a3fd? Which one is the shortcut paying for?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 4: CHALLENGE                                             */}
      {/* ============================================================ */}
      {tab === 'challenge' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-xs text-slate-400 mr-1">
              Score: <span className="font-mono font-bold text-emerald-300">{score.right}</span>/{score.attempted || 0}
            </p>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-emerald-950 text-emerald-300 border-emerald-800">
              {score.right} correct
            </span>
            <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold border bg-slate-800 text-slate-300 border-slate-700">
              {CHALLENGES.length} questions
            </span>
            <div className="ml-auto flex gap-1.5">
              {(['all', 'foundation', 'standard', 'advanced'] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTierFilter(t)}
                  className={`min-h-9 px-3 rounded-lg text-[11px] font-bold capitalize transition-all ${
                    tierFilter === t ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {visibleChallenges.map((ch, qi) => {
            const chosen = answers[ch.id];
            const isRevealed = revealed[ch.id];
            const hints = hintLevel[ch.id] ?? 0;
            return (
              <div
                key={ch.id}
                className={`p-4 rounded-2xl border ${
                  isRevealed
                    ? chosen === ch.correctIndex
                      ? 'bg-emerald-950/30 border-emerald-800'
                      : 'bg-rose-950/30 border-rose-800'
                    : 'bg-slate-900/70 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-bold border ${
                      ch.tier === 'foundation'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : ch.tier === 'standard'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-rose-950 text-rose-300 border-rose-800'
                    }`}
                  >
                    {ch.tier}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-slate-500">{ch.skill}</span>
                  <span className="text-[10px] text-slate-600 ml-auto">Q{qi + 1}</span>
                </div>
                <p className="text-sm text-slate-200 leading-relaxed mb-2.5">{ch.question}</p>
                <div className="space-y-1.5">
                  {ch.options.map((opt, i) => {
                    let cls = 'border-slate-700 bg-slate-950 hover:border-gold-600';
                    if (isRevealed && i === ch.correctIndex) cls = 'border-emerald-600 bg-emerald-950/60';
                    else if (isRevealed && i === chosen) cls = 'border-rose-600 bg-rose-950/60';
                    return (
                      <button
                        key={i}
                        onClick={() => pickAnswer(ch.id, i)}
                        disabled={isRevealed}
                        className={`w-full text-left px-4 py-2.5 rounded-xl border text-sm transition-all disabled:cursor-default ${cls}`}
                      >
                        <span className="font-mono text-xs text-slate-500 mr-2">{'ABCD'[i]}</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {!isRevealed && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      onClick={() => setHintLevel((h) => ({ ...h, [ch.id]: Math.min(3, hints + 1) }))}
                      disabled={hints >= 3}
                      className="min-h-9 px-3 rounded-lg bg-amber-950/60 border border-amber-800 text-[11px] font-bold text-amber-300 disabled:opacity-40"
                    >
                      {hints === 0 ? 'I need a hint' : `more (${hints}/3)`}
                    </button>
                    {hints > 0 && (
                      <p className="text-[11px] text-amber-200/90 leading-relaxed w-full px-1">{ch.hints[hints - 1]}</p>
                    )}
                  </div>
                )}
                {isRevealed && (
                  <div className="mt-2.5 p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className={chosen === ch.correctIndex ? 'font-bold text-emerald-400' : 'font-bold text-rose-400'}>
                      {chosen === ch.correctIndex ? 'Correct. ' : 'Not yet. '}
                    </span>
                    {ch.explanation}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 5: TRUTHS                                                */}
      {/* ============================================================ */}
      {tab === 'truths' && (
        <div className="space-y-4">
          <div className="space-y-3">
            {MISCONCEPTIONS.map((m, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{m.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {m.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-gold-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>Mean uses every value (so outliers own it); median uses only ORDER; mode uses only COUNTS.</li>
              <li>Grouped data: three mean methods agree exactly; median comes from cf; mode from the modal-class formula.</li>
              <li>SD measures spread, not size -- two data sets can share an SD and have nothing else in common.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('raw')} className="min-h-11 px-5 rounded-xl bg-gold-600 hover:bg-gold-500 text-sm font-bold">
                Back to Raw Data
              </button>
              <button onClick={() => setData([...START])} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset data set
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_MathematicsStatisticsSim;
