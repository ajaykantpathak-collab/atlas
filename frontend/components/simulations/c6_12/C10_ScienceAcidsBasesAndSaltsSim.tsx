'use client';

import React, { useMemo, useState } from 'react';

/**
 * Class 10 Science -- Acids, Bases and Salts
 *
 * pH scale explorer with universal-indicator colours, a real titration with
 * live curve and indicator choice, and the important-salts family (baking
 * soda, washing soda, bleaching powder, Plaster of Paris).
 *
 * Deep layout (master-class, 5 tabs):
 *   1. Discover -- predict-then-test walks
 *   2. pH Lab   -- original pH scale + titration bench, preserved + extended
 *                  (titration curve, indicator panel, H+/OH- readouts)
 *   3. Salts    -- the four salt families with uses, and neutralisation
 *                  in daily life
 *   4. Challenge -- 3-tier quiz with hints
 *   5. Truths   -- misconceptions + honest summary
 * Self-contained: react + tailwind only.
 */

type TabKey = 'discover' | 'ph' | 'salts' | 'challenge' | 'truths';

const TABS: { id: TabKey; label: string; emoji: string }[] = [
  { id: 'discover', label: '1 \u00b7 Predict', emoji: '\u26a1' },
  { id: 'ph', label: '2 \u00b7 pH & Titration Lab', emoji: '\ud83e\uddea' },
  { id: 'salts', label: '3 \u00b7 Salt Families', emoji: '\ud83e\uddf4' },
  { id: 'challenge', label: '4 \u00b7 Challenge', emoji: '\ud83c\udfaf' },
  { id: 'truths', label: '5 \u00b7 Truths', emoji: '\ud83e\udee0' },
];

const SUBSTANCES = [
  { name: 'Gastric juice (HCl)', ph: 1.2 },
  { name: 'Lemon juice', ph: 2.2 },
  { name: 'Vinegar', ph: 3.0 },
  { name: 'Tomato juice', ph: 4.1 },
  { name: 'Black coffee', ph: 5.0 },
  { name: 'Rain water', ph: 6.0 },
  { name: 'Pure water', ph: 7.0 },
  { name: 'Blood (healthy)', ph: 7.4 },
  { name: 'Baking soda solution', ph: 9.0 },
  { name: 'Soap solution', ph: 10.0 },
  { name: 'Household ammonia', ph: 11.5 },
  { name: 'NaOH (caustic soda)', ph: 13.5 },
];

const INDICATORS = [
  { name: 'Phenolphthalein', range: [8.2, 10.0], acidCol: 'colourless', baseCol: 'pink', tip: 'the titration favourite -- sharp pink flash at the end point of strong acid vs strong base' },
  { name: 'Methyl orange', range: [3.1, 4.4], acidCol: 'red', baseCol: 'yellow', tip: 'changes early -- right for strong acid vs weak base titrations' },
  { name: 'Litmus', range: [4.5, 8.3], acidCol: 'red', baseCol: 'blue', tip: 'the everyday classifier -- red in acid, blue in base, purple near 7' },
  { name: 'Universal indicator', range: [0, 14], acidCol: 'red\u2192green', baseCol: 'green\u2192violet', tip: 'a mixture of many dyes -- gives a full colour scale, not a flip' },
];

const SALT_FAMILIES = [
  {
    name: 'Sodium bicarbonate (baking soda)',
    formula: 'NaHCO\u2083',
    made: 'Solvay process: NaCl + NH\u2083 + CO\u2082 + H\u2082O',
    uses: ['mild non-poisonous antacid', 'baking (releases CO\u2082 on heating -- cakes rise)', 'fire extinguisher chemistry'],
    reaction: '2NaHCO\u2083 \u2192(heat) Na\u2082CO\u2083 + H\u2082O + CO\u2082',
    color: '#fbbf24',
  },
  {
    name: 'Sodium carbonate (washing soda)',
    formula: 'Na\u2082CO\u2083\u00b710H\u2082O',
    made: 'recrystallisation of sodium carbonate (itself from baking soda heating)',
    uses: ['glass and soap manufacture', 'removes permanent hardness of water', 'laboratory base standard'],
    reaction: 'Na\u2082CO\u2083 + CaCl\u2082 \u2192 CaCO\u2083\u2193 + 2NaCl (hardness removed)',
    color: '#38bdf8',
  },
  {
    name: 'Calcium oxychloride (bleaching powder)',
    formula: 'CaOCl\u2082',
    made: 'Ca(OH)\u2082 + Cl\u2082',
    uses: ['bleaching cotton and linen', 'disinfecting drinking water', 'making chloroform'],
    reaction: 'releases Cl\u2082 slowly -- that free chlorine does the killing and bleaching',
    color: '#a78bfa',
  },
  {
    name: 'Calcium sulphate hemihydrate (Plaster of Paris)',
    formula: 'CaSO\u2084\u00b7\u00bdH\u2082O',
    made: 'heating gypsum (CaSO\u2084\u00b72H\u2082O) to 373 K',
    uses: ['plastering fractured bones', 'making casts, toys, chalk', 'smooth surfaces and decoration'],
    reaction: 'CaSO\u2084\u00b7\u00bdH\u2082O + 1\u00bdH\u2082O \u2192 CaSO\u2084\u00b72H\u2082O (sets to hard gypsum)',
    color: '#f472b6',
  },
];

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
    skill: 'pH meaning',
    question: 'A solution of pH 3 compared with one of pH 5 has hydrogen ion concentration:',
    options: ['2 times more', '10 times more', '100 times more', 'the same -- pH only measures strength of odour'],
    correctIndex: 2,
    explanation:
      'pH = \u2212log[H+]. Two pH units = 10\u00b2 = 100-fold difference in [H+]. The pH scale is logarithmic -- the single most-forgotten fact on this page.',
    hints: [
      'Each pH step is a power of ten.',
      'How many steps apart are pH 3 and 5?',
      '100 times more acidic.',
    ],
  },
  {
    id: 'ch_02',
    tier: 'foundation',
    skill: 'Neutralisation',
    question: 'HCl + NaOH \u2192 NaCl + H\u2082O is called neutralisation because:',
    options: [
      'the salt formed is always neutral to taste',
      'H\u207a and OH\u207a combine into water, removing both excess acid and base character',
      'the reaction absorbs all the heat',
      'sodium neutralises chlorine',
    ],
    correctIndex: 1,
    explanation:
      'The net ionic story is H\u207a + OH\u207a \u2192 H\u2082O. Everything else (Na\u207a, Cl\u207a) just watches as spectator ions. Any acid plus any base boils down to this one line.',
    hints: [
      'Which two ions actually react?',
      'What do they form?',
      'Water -- that is the neutralisation.',
    ],
  },
  {
    id: 'ch_03',
    tier: 'foundation',
    skill: 'Indicator pick',
    question: 'Which indicator turns PINK when the solution crosses into basic territory around pH 8-10?',
    options: ['methyl orange', 'phenolphthalein', 'blue litmus in acid', 'turmeric in acid'],
    correctIndex: 1,
    explanation:
      'Phenolphthalein is colourless below ~8.2 and pink above ~10 -- the sharp flash that marks a strong acid / strong base titration\u2019s end point.',
    hints: [
      'Which indicator is the famous "pink flash" of titration practicals?',
      'Litmus goes red/blue; methyl orange red/yellow.',
      'Phenolphthalein.',
    ],
  },
  // --- standard ---
  {
    id: 'ch_04',
    tier: 'standard',
    skill: 'Titration arithmetic',
    question: '25 mL of 0.1 M HCl needs how much 0.1 M NaOH for exact neutralisation?',
    options: ['12.5 mL', '25 mL', '50 mL', '100 mL'],
    correctIndex: 1,
    explanation:
      'mmol H\u207a = 0.1 \u00d7 25 = 2.5. mmol OH\u207a needed = 2.5 \u2192 at 0.1 M that is 25 mL. Equal concentrations and a 1:1 reaction give equal volumes.',
    hints: [
      'moles H\u207a = M \u00d7 V (in the same units both sides).',
      'The reaction ratio is 1:1.',
      'Equal M \u2192 equal V: 25 mL.',
    ],
  },
  {
    id: 'ch_05',
    tier: 'standard',
    skill: 'Concentration effect',
    question: 'If the NaOH is 0.2 M (double) against the same 25 mL of 0.1 M HCl, the equivalence point arrives at:',
    options: ['50 mL', '25 mL', '12.5 mL', 'it never arrives'],
    correctIndex: 2,
    explanation:
      'Doubled concentration means each mL carries double the OH\u207a, so half the volume neutralises the same acid: 2.5 mmol \u00f7 0.2 M = 12.5 mL. The lab\u2019s concentration sliders demonstrate this instantly.',
    hints: [
      'Required mmol OH\u207a is fixed by the acid.',
      'Twice the strength halves the volume.',
      '12.5 mL.',
    ],
  },
  {
    id: 'ch_06',
    tier: 'standard',
    skill: 'Salt chemistry',
    question: 'Baking soda (NaHCO\u2083) makes cakes rise because:',
    options: [
      'it melts and forms bubbles of sodium vapour',
      'heating decomposes it, releasing CO\u2082 gas that puffs the dough',
      'it reacts with sugar to form hydrogen',
      'it absorbs moisture and expands',
    ],
    correctIndex: 1,
    explanation:
      '2NaHCO\u2083 \u2192(heat) Na\u2082CO\u2083 + H\u2082O + CO\u2082\u2191. The trapped CO\u2082 lifts the cake. The leftover Na\u2082CO\u2083 is why too much baking soda tastes soapy.',
    hints: [
      'What gas makes any dough rise?',
      'Which product of the decomposition is a gas?',
      'CO\u2082 from thermal decomposition.',
    ],
  },
  // --- advanced ---
  {
    id: 'ch_07',
    tier: 'advanced',
    skill: 'Curve reading',
    question: 'On the lab\u2019s titration curve, the pH leaps from ~3 to ~11 across a TINY volume range near equivalence. The honest reason is:',
    options: [
      'the indicator adds base suddenly',
      'near equivalence almost no excess H\u207a or OH\u207a remains, so one drop of base removes the last acid and floods the solution with OH\u207a -- log-scale pH amplifies the swing',
      'the burette is calibrated wrong',
      'water formation is exothermic and drives pH up',
    ],
    correctIndex: 1,
    explanation:
      'At equivalence the flask is pure NaCl solution (pH 7). One drop either side flips the balance between leftover acid and free OH\u207a, and because pH is logarithmic, a tenfold ion swing is a full pH unit per drop.',
    hints: [
      'What is left in the flask exactly at equivalence?',
      'How sensitively does \u2212log[H+] respond when [H+] collapses?',
      'The logarithm amplifies the chemical cliff.',
    ],
  },
  {
    id: 'ch_08',
    tier: 'advanced',
    skill: 'Water of crystallisation',
    question: 'Washing soda is Na\u2082CO\u2083\u00b710H\u2082O. The "10H\u2082O" means:',
    options: [
      'the crystal is 10% wet on the surface',
      'water molecules are locked INTO the crystal lattice (water of crystallisation), giving the formula its fixed 10:1 ratio',
      'it must be stored under water',
      'each molecule carries ten hydrogens only',
    ],
    correctIndex: 1,
    explanation:
      'Water of crystallisation is structural: heat it and the water leaves (efflorescence), leaving anhydrous Na\u2082CO\u2083. Plaster of Paris works the same chemistry in reverse -- it GAINS 1\u00bd H\u2082O to set as hard gypsum.',
    hints: [
      'Dot-notation in formulas (\u00b710H\u2082O) means what kind of incorporation?',
      'What happens on strong heating of such crystals?',
      'Lattice water -- fixed ratio, removable by heat.',
    ],
  },
  {
    id: 'ch_09',
    tier: 'advanced',
    skill: 'Synthesis',
    question: 'An antacid tablet (milk of magnesia, Mg(OH)\u2082) cures "acidity". Using this chapter\u2019s quantities, the mechanism is:',
    options: [
      'it dilutes the stomach acid with water',
      'the sparingly soluble base neutralises excess H\u207a: Mg(OH)\u2082 + 2HCl \u2192 MgCl\u2082 + 2H\u2082O -- strong enough to neutralise, mild enough to be safe',
      'it coats the stomach with salt',
      'it converts acid into more stomach lining',
    ],
    correctIndex: 1,
    explanation:
      'A controlled neutralisation. Mg(OH)\u2082\u2019s low solubility self-limits the reaction (no pH overshoot), which is exactly why weak/sparing bases -- not NaOH! -- go into medicines. Same equation as the titration bench, gentler reagents.',
    hints: [
      'Which chapter reaction is "base + acid \u2192 salt + water"?',
      'Why would no doctor prescribe caustic soda as an antacid?',
      'Neutralisation with a mild, sparingly soluble base.',
    ],
  },
  // ─── Class 10 board-depth additions: acid-base-salt diagnostics ───
  {
    id: 'ch_depth_acid_metal_rates',
    tier: 'standard',
    skill: 'Design an experiment / evaluate',
    question:
      'Equal masses of magnesium ribbon and zinc granules go into separate tubes of the same dilute acid. Compare the rates, and evaluate: "Zn + H\u2082SO\u2084 gives a white precipitate of ZnSO\u2084."',
    options: [
      'Magnesium fizzes far faster (higher in the reactivity series); the ZnSO\u2084 claim is WRONG -- zinc sulfate is soluble, so the solution stays CLEAR while only hydrogen gas bubbles off; no white precipitate forms',
      'Zinc reacts faster because granules have more surface; ZnSO\u2084 forms as a white solid',
      'Both react at identical rates; the products are insoluble',
      'Zinc does not react with dilute acids at all'
    ],
    correctIndex: 0,
    explanation:
      'Two rate factors: metal reactivity (Mg > Zn) and surface area (granules > ribbon). Proof-of-hydrogen design: iron filings + dilute H\u2082SO\u2084 in a test tube, collect the gas over water or by downward displacement in an inverted measuring cylinder, bring a burning candle/splint to the mouth -- the gas burns with a squeaky POP: hydrogen, not CO\u2082 (which extinguishes a flame).',
    hints: [
      'Series position decides speed; surface area fine-tunes it.',
      'Soluble salt + gas = no precipitate.',
      'The pop test is hydrogen\'s signature.'
    ],
  },
  {
    id: 'ch_depth_acid_oxide_pattern',
    tier: 'standard',
    skill: 'Compare reactions',
    question:
      'Compare (i) MgO + 2HNO\u2083 \u2192 Mg(NO\u2083)\u2082 + H\u2082O with (ii) Ca(OH)\u2082 + CO\u2082 \u2192 CaCO\u2083 + H\u2082O. What is the common pattern, and how would you prove ZnO is a basic oxide?',
    options: [
      'Both are "oxide + acid-like partner \u2192 salt + water" neutralisations: a metallic oxide neutralising an acid, and a base neutralising an acidic oxide. ZnO proof: warm ZnO with dilute HCl -- it dissolves forming zinc chloride and water (ZnO + 2HCl \u2192 ZnCl\u2082 + H\u2082O), showing it neutralises an acid like a metal oxide/base should',
      'One is a displacement, the other decomposition; ZnO is proved basic by burning it',
      'The common pattern is redox; ZnO cannot be tested with HCl',
      'Both reactions produce hydrogen gas; ZnO is amphoteric so it cannot be basic'
    ],
    correctIndex: 0,
    explanation:
      'Metal oxide + acid -> salt + water is the defining behaviour of BASIC oxides. To show ZnO neutralises acid: suspend it in dilute HCl, warm gently -- the white solid disappears and the solution conducts/turns litmus from red toward neutral as ZnCl\u2082 forms. (Bonus honesty: ZnO is ALSO amphoteric -- it reacts with strong alkali too -- but neutralising HCl is still basic behaviour.)',
    hints: [
      'Spot the salt + water on both product sides.',
      'A basic oxide must cancel an acid.',
      'Watching the white solid dissolve is the observation you record.'
    ],
  },
  {
    id: 'ch_depth_acid_everyday_ph',
    tier: 'advanced',
    skill: 'Application + evaluation',
    question:
      'Why can brushing immediately after orange juice (pH ~3.5) harm enamel more than waiting 30 minutes? A farmer\u2019s soil is pH 4.8 and wheat wants 6.5 -- write the treatment chemistry. Compare pepsin and trypsin pH optima.',
    options: [
      'Acid softens enamel for a while, so brushing then scrubs it away -- wait for saliva to neutralise; the farmer adds lime: Ca(OH)\u2082 (or CaCO\u2083) neutralises soil acid, e.g. H\u2082SO\u2084-in-soil + Ca(OH)\u2082 \u2192 CaSO\u2084 + 2H\u2082O raising pH toward 6.5; pepsin works at pH ~2 (stomach) while trypsin needs alkaline pH ~8, which is why pancreatic juice arrives with bicarbonate to raise the pH',
      'Juice strengthens enamel; farmers add vinegar to sour soil; both enzymes work best at pH 7',
      'Waiting matters because juice keeps working after 30 minutes only',
      'Lime treatment makes soil more acidic; enzymes ignore pH entirely'
    ],
    correctIndex: 0,
    explanation:
      'Evaluate the fertiliser claim: "ammonium sulfate always improves yield" is FALSE -- it supplies nitrogen but leaves the soil progressively acidic (from the ammonium ion), so on already-sour soil it deepens the pH problem; balanced fertilising needs lime periodicity. Same pH logic in three settings: mouth, field, gut.',
    hints: [
      'Softened enamel + abrasive brushing = erosion.',
      'Base + acidic soil -> neutral soil (liming).',
      'Enzyme optima mirror their organ chemistry.'
    ],
  },
  {
    id: 'ch_depth_acid_salt_hydrolysis',
    tier: 'advanced',
    skill: 'Evaluate + design',
    question:
      'Evaluate: "Ammonium chloride solution is acidic because NH\u2084\u207a donates OH\u207b to water." Then design a red-and-blue-litmus test that separates three unlabelled salt solutions.',
    options: [
      'The reason is WRONG -- NH\u2084\u207a donates a PROTON (H\u207a), not hydroxide: NH\u2084\u207a + H\u2082O \u2192 NH\u2083 + H\u2083O\u207a, which is what turns the solution acidic; the litmus design: dip both papers in each sample -- the one turning blue litmus red is acidic (NH\u2084Cl/AlCl\u2083 type), the one turning red litmus blue is basic (Na\u2082CO\u2083/CH\u2083COONa type), and the one changing neither is neutral (NaCl)',
      'Correct as written; litmus cannot separate salt solutions',
      'NH\u2084Cl is basic because ammonia is present; one litmus paper is enough for all three',
      'Salt solutions are always neutral'
    ],
    correctIndex: 0,
    explanation:
      'Salt hydrolysis: strong acid + weak base salt (NH\u2084Cl) -> acidic; weak acid + strong base salt (Na\u2082CO\u2083, CH\u2083COONa) -> basic; strong + strong (NaCl) -> neutral. The misconception to kill: "donates OH\u207b makes acidic" -- donors of H\u207a acidify, donors of OH\u207b alkalise. The paired-litmus protocol classifies any salt solution in one minute.',
    hints: [
      'Acid = H\u207a donor, base = OH\u207b donor (Arrhenius).',
      'Which ion wins the tug-of-war over water?',
      'One paper per solution, both colours, read the pair.'
    ],
  },
  {
    id: 'ch_depth_acid_chloralkali',
    tier: 'advanced',
    skill: 'Compare + design',
    question:
      'Why does the chlor-alkali electrolysis give chlorine at the anode instead of oxygen? Compare it with dilute H\u2082SO\u2084 electrolysis, and sketch the 9V-battery-with-pencil-leads classroom demo.',
    options: [
      'In concentrated brine, Cl\u207b discharges in preference to OH\u207b (concentration + overpotential effects), so anode gas = Cl\u2082, cathode gas = H\u2082, leaving NaOH in solution; with dilute H\u2082SO\u2084 the anode gives OXYGEN from water instead -- same apparatus, different ions and products; the demo: two pencil "leads" as graphite electrodes, salt solution, 9V battery, test tubes over the electrodes collect H\u2082 (cathode, twice the volume) and Cl\u2082 (anode), with NaOH forming in the cell',
      'Chlorine appears because NaCl is acidic; both processes give identical products',
      'Oxygen always wins at the anode regardless of solution',
      'The demo needs a car battery and platinum electrodes only'
    ],
    correctIndex: 0,
    explanation:
      'Chlor-alkali: 2NaCl + 2H\u2082O --(electricity)--> Cl\u2082 (anode) + H\u2082 (cathode) + 2NaOH (solution) -- three products, three industries (bleach/PVC, fuel/margarine, soaps/detergents). Dilute acid electrolysis instead refines water: H\u2082 at cathode, O\u2082 at anode in a 2:1 ratio. Similarity: both need inert electrodes and give hydrogen at the cathode; differences: anode product, and whether the electrolyte is consumed.',
    hints: [
      'Concentration can outrank reactivity at the anode.',
      'H\u2082 volume is double O\u2082 in water electrolysis.',
      'Graphite pencil leads ARE the inert electrodes.'
    ],
  }
];

// ==========================================
// MISCONCEPTIONS
// ==========================================

const MISCONCEPTIONS: { misconception: string; correction: string }[] = [
  {
    misconception: 'All acids are dangerous and all bases are safe.',
    correction:
      'Lemon juice and vinegar are acids we eat; drain cleaner (NaOH) is a base that dissolves skin. Danger tracks concentration and corrosiveness, not the acid/base label. Caustic soda is a base; it is far more dangerous than dilute vinegar.',
  },
  {
    misconception: 'pH 0 is "no acid" and pH 14 is "maximum acid".',
    correction:
      'Backwards: LOW pH = high [H\u207a] = strongly acidic; HIGH pH = strongly basic. And the scale does not stop at 0/14 -- concentrated 12 M HCl is about pH \u22121. 0-14 is just the convenient range for dilute aqueous solutions.',
  },
  {
    misconception: 'A neutralisation always ends at exactly pH 7.',
    correction:
      'Strong acid + strong base: yes, pH 7. Weak acid + strong base lands basic (pH > 7, e.g. sodium acetate); strong acid + weak base lands acidic. The salt\u2019s own hydrolysis decides -- one reason indicator choice matters.',
  },
  {
    misconception: 'Plaster of Paris and gypsum are the same thing.',
    correction:
      'POP is CaSO\u2084\u00b7\u00bdH\u2082O (half-water, made by heating); gypsum is CaSO\u2084\u00b72H\u2082O (full-water, the setting product). POP + 1\u00bdH\u2082O \u2192 gypsum is the setting reaction that hardens a cast.',
  },
  {
    misconception: 'Distilled water is neutral, so nothing is dissolved in it -- but rain water is also pure water.',
    correction:
      'Rain absorbs atmospheric CO\u2082 to form carbonic acid -- natural rain is pH ~5.6, mildly acidic. True neutral (pH 7) needs CO\u2082-free distilled water. "Acid rain" means pH below ~5.6, not merely acidic rain.',
  },
];

function indicatorColor(ph: number): string {
  if (ph < 2) return '#dc2626';
  if (ph < 4) return '#ea580c';
  if (ph < 6) return '#f59e0b';
  if (ph <= 8) return '#22c55e';
  if (ph < 10) return '#06b6d4';
  if (ph < 12) return '#2563eb';
  return '#7c3aed';
}

function phAtAddedNaoh(addedML: number, acidML: number, acidM: number, baseM: number): number {
  const mmolH = acidM * acidML;
  const mmolOH = baseM * addedML;
  const totalV = acidML + addedML;
  if (Math.abs(mmolH - mmolOH) < 1e-9) return 7;
  if (mmolOH < mmolH) {
    const excess = (mmolH - mmolOH) / totalV;
    return Math.max(0.3, -Math.log10(Math.max(excess, 1e-8)));
  }
  const excess = (mmolOH - mmolH) / totalV;
  return Math.min(13.7, 14 + Math.log10(Math.max(excess, 1e-8)));
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export function C10_ScienceAcidsBasesAndSaltsSim() {
  const [tab, setTab] = useState<TabKey>('discover');

  // ── pH lab state (original preserved) ──
  const [picked, setPicked] = useState(1);
  const [naohML, setNaohML] = useState(10);
  const [acidML, setAcidML] = useState(25);
  const [acidM, setAcidM] = useState(0.1);
  const [baseM, setBaseM] = useState(0.1);
  const [indicator, setIndicator] = useState(1);

  // ── salts / discover / challenge / truths state ──
  const [saltIdx, setSaltIdx] = useState(0);
  const [predicted, setPredicted] = useState<number | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [hintLevel, setHintLevel] = useState<Record<string, number>>({});
  const [tierFilter, setTierFilter] = useState<'all' | Challenge['tier']>('all');
  const [openMisc, setOpenMisc] = useState<number | null>(null);

  const substance = SUBSTANCES[picked];
  const hConc = Math.pow(10, -substance.ph);
  const ohConc = Math.pow(10, -(14 - substance.ph));

  // ── titration numerics (original formulas preserved) ──
  const mmolH = acidM * acidML;
  const mmolOH = baseM * naohML;
  const totalV = acidML + naohML;
  const titrationPH = useMemo(
    () => phAtAddedNaoh(naohML, acidML, acidM, baseM),
    [naohML, acidML, acidM, baseM]
  );

  const status =
    Math.abs(titrationPH - 7) < 0.25
      ? 'NEUTRAL -- complete neutralisation'
      : titrationPH < 7
      ? 'ACIDIC -- base is the limiting reagent so far'
      : 'BASIC -- acid fully consumed, OH\u207a in excess';
  const atEquivalence = Math.abs(mmolH - mmolOH) < 0.001;

  // equivalence volume for the current concentrations
  const eqVolume = mmolH / Math.max(baseM, 1e-6);

  // titration curve data
  const curve = useMemo(() => {
    const pts: { x: number; y: number }[] = [];
    for (let v = 0; v <= 50; v += 0.5) {
      pts.push({ x: v, y: phAtAddedNaoh(v, acidML, acidM, baseM) });
    }
    return pts;
  }, [acidML, acidM, baseM]);
  const cxp = (x: number) => 30 + (x / 50) * 380;
  const cyp = (y: number) => 210 - (y / 14) * 190;

  const ind = INDICATORS[indicator];
  const indActive = titrationPH >= ind.range[0] && titrationPH <= ind.range[1];

  const slider = (label: string, val: number, set: (v: number) => void, min: number, max: number, step: number, unit: string, color: string) => (
    <div>
      <div className="flex justify-between text-[11px] text-slate-400">
        <span>{label}</span>
        <span className={`font-mono font-bold ${color}`}>{val} {unit}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={val} aria-label={label}
        onChange={(e) => set(Number(e.target.value))} className={`w-full ${color}`} />
    </div>
  );

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

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* header */}
      <div className="flex flex-wrap items-center gap-3 pb-3 mb-3 border-b border-slate-800">
        <span className="text-3xl p-2 bg-rose-950/80 rounded-2xl border border-rose-700">\ud83e\uddea</span>
        <div className="flex-1 min-w-[220px]">
          <span className="text-xs font-bold uppercase tracking-wider text-rose-400">Class 10 -- Acids, Bases and Salts</span>
          <h1 className="text-xl md:text-2xl font-extrabold">pH, Titration Curves and Salt Families</h1>
        </div>
        <span className="font-mono text-xs text-slate-500">pH + pOH = 14</span>
      </div>

      {/* tab bar */}
      <nav className="flex flex-wrap gap-1.5 mb-4">
        {TABS.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`min-h-9 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
              tab === t.id
                ? 'bg-rose-600 border-rose-500 text-white shadow-lg shadow-rose-900/40'
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
          <div className="p-5 bg-slate-900/70 rounded-2xl border border-rose-900/60">
            <p className="text-[11px] font-bold uppercase tracking-wider text-rose-400 mb-2">Predict before you play</p>
            <p className="text-sm text-slate-200 leading-relaxed">
              You titrate 25 mL of 0.1 M HCl with 0.1 M NaOH. Sketch the pH curve in your head: does
              the pH rise from 1 to 13 in a straight line, or does something dramatic happen near the
              equivalence volume (25 mL)?
            </p>
            <div className="mt-3 space-y-2">
              {[
                'A straight, gentle climb from 1 to 13',
                'Flat near pH 1-3, then a CLIFF from ~3 to ~11 within one drop of 25 mL, then flat again',
                'A steady climb that peaks at pH 7 and stops',
                'The pH falls as base is added',
              ].map((opt, i) => {
                const chosen = predicted === i;
                const isCorrect = i === 1;
                let cls = 'border-slate-700 bg-slate-900 hover:border-rose-600';
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
                The logarithm turns a chemical cliff into a vertical wall. Drag the NaOH slider slowly
                through 25 mL in the pH Lab and watch the readout sprint across the whole scale in
                0.1 mL.
                <button onClick={() => setTab('ph')} className="ml-2 underline font-bold text-amber-300">
                  Open pH Lab \u2192
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              {
                t: 'Walk 1: Log-scale shock',
                d: 'Pick lemon juice, then soap, from the substance list. The pH gap is 8 -- the real H\u207a gap is ten million-fold. The colour strip hides the cliff.',
              },
              {
                t: 'Walk 2: Double the base',
                d: 'In the titration, set NaOH concentration to 0.2 M. Watch the curve\u2019s cliff move to 12.5 mL -- halved, exactly.',
              },
              {
                t: 'Walk 3: Name that salt',
                d: 'Salt Families tab: match baking soda, washing soda, bleaching powder and Plaster of Paris to their everyday jobs.',
              },
            ].map((s, i) => (
              <div key={i} className="p-4 bg-slate-900/70 rounded-2xl border border-slate-800">
                <p className="text-xs font-bold text-slate-200 mb-1">
                  <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-rose-600 text-[10px] font-black mr-1.5">{i + 1}</span>
                  {s.t}
                </p>
                <p className="text-xs text-slate-400 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 2: pH LAB (original sim preserved + extended)            */}
      {/* ============================================================ */}
      {tab === 'ph' && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-5">
          <div className="lg:col-span-3 space-y-4">
            {/* pH scale (original, preserved) */}
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Universal indicator scale</p>
              <div className="flex h-10 rounded-xl overflow-hidden border border-slate-700">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div
                    key={i}
                    className={`flex-1 flex items-center justify-center transition-all duration-200 ${
                      Math.abs(substance.ph - i) < 0.5 ? 'ring-4 ring-white scale-y-110 z-10' : ''
                    }`}
                    style={{ background: indicatorColor(i + 0.4) }}
                  >
                    <span className="text-[9px] font-bold text-white/90">{i}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                <span>acidic (H\u207a high)</span><span>neutral</span><span>basic (OH\u207a high)</span>
              </div>
              <div className="mt-4 flex items-center gap-4">
                <div
                  className="w-24 h-32 rounded-b-full border-4 border-slate-600 flex flex-col items-center justify-center transition-colors duration-300"
                  style={{ background: indicatorColor(substance.ph) }}
                >
                  <span className="font-black text-white text-lg drop-shadow">pH {substance.ph}</span>
                </div>
                <div className="text-sm space-y-1">
                  <p className="font-bold text-slate-200">{substance.name}</p>
                  <p className="font-mono text-xs text-rose-300">[H\u207a] = 10^\u2212{substance.ph} = {hConc.toExponential(1)} mol/L</p>
                  <p className="font-mono text-xs text-gold-300">[OH\u207b] = {ohConc.toExponential(1)} mol/L</p>
                  <p className="font-mono text-xs text-slate-500">pOH = {(14 - substance.ph).toFixed(1)}</p>
                  <p className="text-[11px] text-slate-500">[H\u207a] is {substance.ph < 7 ? `${Math.pow(10, 7 - substance.ph).toExponential(0)}\u00d7` : 'the neutral amount of'} the pure-water level</p>
                </div>
              </div>
              <select value={picked} onChange={(e) => setPicked(Number(e.target.value))} aria-label="pick substance"
                className="mt-3 w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2 text-sm">
                {SUBSTANCES.map((s, i) => (
                  <option key={s.name} value={i}>{s.name} (pH {s.ph})</option>
                ))}
              </select>
            </div>

            {/* titration curve (new) */}
            <div className="bg-slate-900/80 rounded-2xl border border-emerald-800/60 p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-1">
                Titration curve: pH vs NaOH added (live from your settings)
              </p>
              <svg viewBox="0 0 430 230" className="w-full" role="img" aria-label="titration curve">
                {[0, 7, 14].map((g) => (
                  <g key={g}>
                    <line x1={30} y1={cyp(g)} x2={410} y2={cyp(g)} stroke="#1e293b" strokeWidth={1} />
                    <text x={26} y={cyp(g) + 3} textAnchor="end" fontSize={9} fill="#64748b">{g}</text>
                  </g>
                ))}
                <line x1={30} y1={210} x2={410} y2={210} stroke="#475569" strokeWidth={1.5} />
                <line x1={30} y1={20} x2={30} y2={210} stroke="#475569" strokeWidth={1.5} />
                {/* equivalence volume marker */}
                {eqVolume <= 50 && (
                  <g>
                    <line x1={cxp(eqVolume)} y1={20} x2={cxp(eqVolume)} y2={210} stroke="#f472b6" strokeWidth={1.5} strokeDasharray="4 3" />
                    <text x={cxp(eqVolume)} y={16} textAnchor="middle" fontSize={9} fill="#f472b6">
                      equivalence {eqVolume.toFixed(1)} mL
                    </text>
                  </g>
                )}
                {/* current position */}
                {naohML <= 50 && (
                  <circle cx={cxp(naohML)} cy={cyp(titrationPH)} r={5} fill="#fbbf24" stroke="#78350f" />
                )}
                <polyline
                  points={curve.map((p) => `${cxp(p.x)},${cyp(p.y)}`).join(' ')}
                  fill="none" stroke="#34d399" strokeWidth={2.5}
                />
                <text x={220} y={227} textAnchor="middle" fontSize={9} fill="#64748b">NaOH added (mL)</text>
              </svg>
            </div>

            {/* titration bench (original, preserved) */}
            <div className="bg-slate-900/80 rounded-2xl border border-emerald-800/60 p-4">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
                Titration bench: HCl + NaOH \u2192 NaCl + H\u2082O
              </p>
              <div className="flex items-center gap-4">
                <div
                  className="w-20 h-36 border-4 border-slate-600 rounded-b-xl relative overflow-hidden transition-all duration-200"
                  style={{
                    background: `linear-gradient(to top, ${indicatorColor(titrationPH)} ${Math.min(100, (100 * naohML) / Math.max(totalV, 1)).toFixed(0)}%, rgba(255,255,255,0.08) ${Math.min(100, (100 * naohML) / Math.max(totalV, 1)).toFixed(0)}%)`,
                  }}
                >
                  <span className="absolute bottom-1 w-full text-center text-[9px] font-bold text-white drop-shadow">
                    pH {titrationPH.toFixed(2)}
                  </span>
                </div>
                <div className="flex-1 space-y-1 text-xs font-mono">
                  <p className="text-rose-300">mmol H\u207a = {acidM} \u00d7 {acidML} = {mmolH.toFixed(2)}</p>
                  <p className="text-gold-300">mmol OH\u207b = {baseM} \u00d7 {naohML} = {mmolOH.toFixed(2)}</p>
                  <p className="text-slate-300">{status}</p>
                  {atEquivalence && <p className="text-emerald-400 font-bold animate-pulse">EQUIVALENCE POINT -- salt NaCl + water only</p>}
                  <p className="text-slate-500 text-[10px] font-sans">
                    indicator <span className="font-bold">{ind.name}</span>: now showing{' '}
                    <span className={indActive ? 'text-amber-300 font-bold' : 'text-slate-400'}>
                      {indActive ? ind.baseCol : titrationPH < ind.range[0] ? ind.acidCol : ind.baseCol}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-4">
            <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-4 space-y-3">
              {slider('NaOH added', naohML, setNaohML, 0, 50, 0.5, 'mL', 'accent-gold-500')}
              {slider('HCl volume', acidML, setAcidML, 5, 50, 1, 'mL', 'accent-rose-500')}
              {slider('HCl concentration', acidM, setAcidM, 0.02, 0.2, 0.01, 'M', 'accent-amber-500')}
              {slider('NaOH concentration', baseM, setBaseM, 0.02, 0.2, 0.01, 'M', 'accent-emerald-500')}
              <button
                onClick={() => { setNaohML(10); setAcidML(25); setAcidM(0.1); setBaseM(0.1); }}
                className="w-full min-h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold"
              >
                Reset the bench
              </button>
            </div>

            {/* indicator panel (new) */}
            <div className="bg-slate-900/80 rounded-2xl border border-amber-900/50 p-4 space-y-2">
              <p className="text-xs font-bold uppercase tracking-wider text-amber-400">Choose your indicator</p>
              <div className="grid grid-cols-2 gap-1.5">
                {INDICATORS.map((ind2, i) => (
                  <button
                    key={ind2.name}
                    onClick={() => setIndicator(i)}
                    className={`py-1.5 px-2 rounded-lg text-[10px] font-bold text-left ${indicator === i ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'}`}
                  >
                    {ind2.name}
                    <span className="block font-mono text-[9px] opacity-70">pH {ind2.range[0]}-{ind2.range[1]}</span>
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                <span className="font-bold text-amber-300">{ind.name}:</span> {ind.tip}
              </p>
            </div>

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Teaching note</p>
              <p>
                pH is the power of ten behind H\u207a: pH 2 is 100,000 times more acidic than pH 7. In a
                strong acid vs strong base titration, H\u207a + OH\u207a \u2192 H\u2082O mole for mole; the
                flask turns neutral the instant the two mmol counts match -- one drop either way swings
                the pH wildly.
              </p>
            </div>

            <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
              <p className="font-bold text-rose-300 mb-1">What to try</p>
              <p>1. Set both concentrations to 0.1 M and find the exact equivalence volume. Predict it from mmol first.</p>
              <p className="mt-1">2. Double the NaOH concentration only -- why does the equivalence point now come at half the volume?</p>
              <p className="mt-1">3. Swap to methyl orange and phenolphthalein in turn. Which one would actually CATCH this titration\u2019s cliff?</p>
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* TAB 3: SALT FAMILIES                                         */}
      {/* ============================================================ */}
      {tab === 'salts' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="flex gap-1.5 flex-wrap">
              {SALT_FAMILIES.map((s, i) => (
                <button
                  key={s.name}
                  onClick={() => setSaltIdx(i)}
                  className={`min-h-9 px-3 rounded-xl text-[11px] font-bold transition-all border ${
                    saltIdx === i
                      ? 'bg-rose-600 border-rose-500 text-white'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.formula}
                </button>
              ))}
            </div>

            {(() => {
              const salt = SALT_FAMILIES[saltIdx];
              return (
                <div className="rounded-2xl border p-4" style={{ borderColor: `${salt.color}55`, background: `${salt.color}0d` }}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">\ud83e\uddf4</span>
                    <div>
                      <p className="text-sm font-extrabold text-white">{salt.name}</p>
                      <p className="font-mono text-xs" style={{ color: salt.color }}>{salt.formula}</p>
                    </div>
                  </div>
                  <div className="mt-3 space-y-2 text-xs">
                    <p className="text-slate-400"><span className="font-bold text-slate-300">made by:</span> {salt.made}</p>
                    <div>
                      <p className="font-bold text-slate-300 mb-1">uses:</p>
                      <ul className="list-disc ml-5 space-y-0.5 text-slate-400">
                        {salt.uses.map((u) => <li key={u}>{u}</li>)}
                      </ul>
                    </div>
                    <p className="font-mono text-[11px] text-slate-300 bg-slate-950 rounded-lg px-3 py-2 border border-slate-800">
                      {salt.reaction}
                    </p>
                  </div>
                </div>
              );
            })()}

            <div className="bg-slate-900/60 rounded-2xl border border-slate-800 p-4 text-xs leading-relaxed text-slate-400">
              <p className="font-bold text-slate-300 mb-1">Family logic</p>
              <p>
                Every salt here inherits the character of its parents: NaHCO\u2083 carries bicarbonate\u2019s
                mild basicity (antacid), Na\u2082CO\u2083 carries stronger basicity (washing), CaOCl\u2082
                carries chlorine\u2019s oxidising power (bleaching), and CaSO\u2084 carries gypsum\u2019s
                setting behaviour. Know the ion, predict the salt.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {/* neutralisation in daily life */}
            <div className="bg-slate-900/80 rounded-2xl border border-emerald-900/50 p-4 space-y-3">
              <p className="text-xs font-bold uppercase tracking-wider text-emerald-400">Neutralisation in daily life</p>
              {[
                { emoji: '\ud83d\udc8a', title: 'Antacid tablet', body: 'Mg(OH)\u2082 + 2HCl \u2192 MgCl\u2082 + 2H\u2082O -- a mild, sparingly soluble base mops up excess stomach H\u207a without overshooting.' },
                { emoji: '\ud83e\uddb7', title: 'Toothpaste vs plaque acid', body: 'Mouth bacteria drop oral pH after sugar; toothpaste\u2019s mild base restores pH and the fluoride builds acid-resistant enamel.' },
                { emoji: '\ud83c\udf3e', title: 'Farmer\u2019s lime on acid soil', body: 'Slaked lime Ca(OH)\u2082 neutralises soil acidity -- the same H\u207a + OH\u207a \u2192 H\u2082O, at field scale.' },
                { emoji: '\ud83d\udc1d', title: 'Wasp sting (alkaline) vs nettle', body: 'Bases and acids bite both ways: a weak acid (vinegar) treats alkaline stings; a weak base (baking soda) treats acidic ones.' },
              ].map((row) => (
                <div key={row.title} className="flex gap-3 bg-slate-950 rounded-xl border border-slate-800 p-3">
                  <span className="text-2xl">{row.emoji}</span>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{row.title}</p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">{row.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-rose-950/40 rounded-2xl border border-rose-800/50 p-4 text-xs">
              <p className="font-bold text-rose-300 mb-1">What to try</p>
              <p>1. A cake recipe swaps baking soda for washing soda. Predict three things that go wrong -- start from the formula difference.</p>
              <p className="mt-1">2. Why does bleaching powder smell of chlorine in a damp bathroom, but not in a dry jar? (Check its "made by" reaction and run it backwards.)</p>
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
                    tierFilter === t ? 'bg-rose-600 text-white' : 'bg-slate-800 text-slate-400 hover:text-white'
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
                    let cls = 'border-slate-700 bg-slate-950 hover:border-rose-600';
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
            {MISCONCEPTIONS.map((mm, i) => (
              <div key={i} className="rounded-2xl border border-rose-900/60 bg-rose-950/20 overflow-hidden">
                <button
                  onClick={() => setOpenMisc((cur) => (cur === i ? null : i))}
                  className="w-full text-left px-4 py-3 flex items-center gap-3 hover:bg-rose-950/40 transition-colors"
                >
                  <span className="text-rose-400 font-black text-lg leading-none">\u2717</span>
                  <span className="text-sm font-bold text-rose-200 flex-1">{mm.misconception}</span>
                  <span className="text-slate-500 text-xs">{openMisc === i ? '\u25b2' : '\u25bc'}</span>
                </button>
                {openMisc === i && (
                  <div className="px-4 pb-4">
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800 text-xs text-emerald-200 leading-relaxed">
                      <span className="font-bold text-emerald-300">The truth: </span>
                      {mm.correction}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-5 bg-slate-900/70 rounded-2xl border border-slate-800">
            <p className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-2">If you remember three lines</p>
            <ol className="space-y-2 text-sm text-slate-300 leading-relaxed list-decimal ml-5">
              <li>pH is logarithmic: each unit is a tenfold [H\u207a] jump.</li>
              <li>Neutralisation is H\u207a + OH\u207a \u2192 H\u2082O -- everything else is spectators.</li>
              <li>Salts inherit their ions\u2019 character: HCO\u2083\u207b mild, CO\u2083\u00b2\u207b stronger, OCl\u207b oxidising, CaSO\u2084 setting.</li>
            </ol>
            <div className="mt-3 flex gap-2">
              <button onClick={() => setTab('ph')} className="min-h-11 px-5 rounded-xl bg-rose-600 hover:bg-rose-500 text-sm font-bold">
                Back to the pH Lab
              </button>
              <button onClick={() => { setPicked(1); setNaohML(10); setAcidML(25); setAcidM(0.1); setBaseM(0.1); }} className="min-h-11 px-5 rounded-xl bg-slate-800 hover:bg-slate-700 text-sm font-bold">
                Reset the bench
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default C10_ScienceAcidsBasesAndSaltsSim;
