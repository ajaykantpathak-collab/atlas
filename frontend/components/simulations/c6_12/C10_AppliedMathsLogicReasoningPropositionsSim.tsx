'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C10_APPMATH_069 = 'c10_appmath_069';
const ALL_NODE_IDS = [NODE_C10_APPMATH_069];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Control: Chandrayaan Automated Gate Controller',
  intro: 'ISRO avionics engineers are programming the payload deployment logic for the Chandrayaan automated rover. The lander onboard computer continuously evaluates telemetry propositions (p, q, and r) and controls deployment valves and thrusters using strict mathematical logic.',
  context: 'A single misconfigured logic gate or inverted truth table could cause thrusters to fire in vacuum or deploy solar panels into lunar regolith. As telemetry logic specialist, you must verify proposition validity, truth tables, Venn boundaries, boolean switching circuits, and implication conditions before launch.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In formal mathematical logic, if statement p is False ("The Moon is made of green cheese"), what is the truth value of the conditional statement: "If the Moon is made of green cheese, then 2 + 2 = 5" (p → q)?',
  options: [
    'False (✗) — because 2 + 2 = 5 is mathematically false',
    'True (✓) — because a false hypothesis never violates an implication promise (vacuously true)',
    'Undefined (✗) — logic cannot evaluate impossible premises',
    'Meaningless (✗) — it is not a mathematical proposition',
  ],
  correctIndex: 1,
  hintAfter: 'Surprising, right? In mathematical logic, when the "IF" condition (antecedent) is FALSE, no promise is broken, so the implication p → q is considered TRUE (Vacuous Truth)! Let us explore why.',
};

// ─── INTERFACES ───
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
}

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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_APPMATH_069,
  title: 'Logic and Reasoning: Propositions, Connectives & Truth Tables',
  definition: 'A proposition is a declarative sentence that is either true (T) or false (F), but not both simultaneously. Compound propositions are formed by combining simple propositions using logical connectives: Negation (~), Conjunction (∧), Disjunction (∨), Implication (→), and Biconditional (↔). Truth tables systematically tabulate truth values across all combinations of atomic variables to identify tautologies, contradictions, and contingencies.',
  eli5: 'Think of logic like electronic switches and lightbulbs. A proposition is a switch that is either ON (True) or OFF (False). Connectives are how switches are wired: in series (AND: both must be ON) or in parallel (OR: either ON lights the bulb). A truth table tests every switch combination!',
  misconceptions: [
    {
      misconception: 'Logical OR (p ∨ q) is exclusive, meaning only one condition can be true.',
      correction: 'In mathematics, logical OR is INCLUSIVE: p ∨ q is True when p is True, q is True, or BOTH are True. It is False ONLY when both are False.',
    },
    {
      misconception: 'The negation of "All students passed" is "No students passed".',
      correction: 'The negation of a universal statement is existential: "At least one student failed" (or "Some students did not pass"). A single counterexample disproves "All".',
    },
    {
      misconception: 'An implication (p → q) is logically identical to its converse (q → p).',
      correction: 'Implication p → q is NOT equivalent to q → p. For example: "If it rains, roads get wet" is True, but "If roads are wet, it rained" is False (sprinklers could be on).',
    },
    {
      misconception: 'When the antecedent p is False, the implication p → q is False.',
      correction: 'When p is False, p → q is automatically TRUE (vacuous truth). A conditional contract "If you score 100%, I will buy a car" is never violated if you do not score 100%.',
    },
    {
      misconception: 'A proposition can be a question, a command, or an open algebraic formula without variable assignments.',
      correction: 'Questions ("What time is it?"), commands ("Calibrate the gyro!"), and open formulas ("x + 3 = 10" with unknown x) are NOT propositions because they cannot be assigned a definite T/F truth value.',
    },
    {
      misconception: 'The negation of (p ∧ q) is simply ~p ∧ ~q.',
      correction: 'By De Morgan’s Law, the negation of a conjunction is a disjunction of negations: ~(p ∧ q) ≡ (~p ∨ ~q).',
    },
    {
      misconception: 'A contradiction is just an opinion that differs from a consensus.',
      correction: 'In mathematical logic, a contradiction is a compound statement that evaluates to FALSE in EVERY single row of its truth table regardless of input truth values.',
    },
  ],
  diagnosticQuestions: [
    { question: 'Which of the following sentences is a valid mathematical proposition?', options: ['What is the capital of India?', 'Solve 2x + 5 = 15', 'New Delhi is the capital of India', 'May you live long!'], correctIndex: 2 },
    { question: 'What is the truth value of (T ∧ F) ∨ T?', options: ['True', 'False', 'Undefined', 'Contradiction'], correctIndex: 0 },
    { question: 'Under what condition is the implication p → q FALSE?', options: ['p is False, q is True', 'p is True, q is False', 'Both p and q are False', 'Both p and q are True'], correctIndex: 1 },
    { question: 'A compound statement that is ALWAYS true for all truth values of its components is a:', options: ['Contingency', 'Contradiction', 'Tautology', 'Biconditional'], correctIndex: 2 },
    { question: 'The logical connective ∧ (conjunction) corresponds to which set theory operation?', options: ['Union (∪)', 'Intersection (∩)', 'Complement (A′)', 'Universal set (U)'], correctIndex: 1 },
    { question: 'What is the negation of "Every prime number is odd"?', options: ['No prime numbers are odd', 'All prime numbers are even', 'At least one prime number is not odd (even)', 'Prime numbers are neither even nor odd'], correctIndex: 2 },
    { question: 'How many rows are present in the truth table of a compound statement with 3 atomic propositions (p, q, r)?', options: ['6 rows', '8 rows', '9 rows', '12 rows'], correctIndex: 1 },
    { question: 'When is the biconditional p ↔ q TRUE?', options: ['Only when both p and q are True', 'Only when both p and q are False', 'When p and q have identical truth values (both T or both F)', 'When p is True and q is False'], correctIndex: 2 },
  ],
  masteryCriteria: 'Student accurately identifies declarative propositions, constructs complete truth tables with 2^n rows, translates English conditionals into symbolic notation (~, ∧, ∨, →, ↔), classifies statements as tautologies/contradictions/contingencies, and connects logic gates with set theory Venn diagrams and switching circuits.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Series vs Parallel Logic Circuits (AND vs OR)',
    instruction: 'Toggle inputs p and q and adjust the voltage slider to observe how series (AND) and parallel (OR) circuits control payload power in real time.',
    interactionType: 'toggle-circuits',
    nodeId: NODE_C10_APPMATH_069,
  },
  {
    title: 'Lab 2: The Enigma of Implication & Vacuous Truth (p → q)',
    instruction: 'Slide sensor condition probability and trigger state. Discover why False → False and False → True always evaluate to TRUE.',
    interactionType: 'slider-implication',
    nodeId: NODE_C10_APPMATH_069,
  },
  {
    title: 'Lab 3: Venn Diagram & Set Theory Bridge',
    instruction: 'Select logical operations to see how connectives map to set theory regions (Intersection ∩, Union ∪, Complement ′, Set Difference \\).',
    interactionType: 'venn-explorer',
    nodeId: NODE_C10_APPMATH_069,
  },
  {
    title: 'Lab 4: 3-Input Rover Telemetry Combiner (p, q, r)',
    instruction: 'Toggle 3 binary sensors and change the gate threshold slider to observe 8 distinct binary states (2³ = 8 rows).',
    interactionType: 'three-input-lab',
    nodeId: NODE_C10_APPMATH_069,
  },
  {
    title: 'Lab 5: De Morgan’s Equivalence Engine',
    instruction: 'Compare ~(p ∨ q) and (~p ∧ ~q) simultaneously across all switch combinations to see why both waveforms mirror each other perfectly.',
    interactionType: 'demorgan-lab',
    nodeId: NODE_C10_APPMATH_069,
  },
  {
    title: 'Lab 6: Tautology vs Contradiction Dynamic Classifier',
    instruction: 'Evaluate p ∨ ~p (Law of Excluded Middle) and p ∧ ~p (Law of Non-Contradiction) to inspect mathematical invariants.',
    interactionType: 'tautology-tester',
    nodeId: NODE_C10_APPMATH_069,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an engineer wires two rover safety switches in series (p ∧ q), what happens to the rover arm if Switch p is ON (True) but Switch q is OFF (False)?',
    options: [
      'The arm activates because Switch p is active (✗)',
      'The arm remains powered OFF because BOTH switches must be closed for series current (✓)',
      'The system short-circuits (✗)',
      'The arm enters emergency standby (✗)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Toggle Switch p to ON and Switch q to OFF in the circuit simulator below to verify your prediction!',
  },
  {
    question: 'Predict: If a satellite checks condition p ↔ q (Biconditional), what will the output be when BOTH sensor p and sensor q are in the False state (0, 0)?',
    options: [
      'False (0) — because zero inputs produce zero output (✗)',
      'True (1) — because both sensors share the exact same truth state (✓)',
      'Undefined — sensors are inactive (✗)',
      'Fluctuating between T and F (✗)',
    ],
    correctIndex: 1,
    verifyInstruction: 'Set both inputs to F in the Biconditional gate panel to watch the green indicator lock.',
  },
  {
    question: 'Predict: For 3 proposition variables (p, q, r), how many total distinct truth assignments exist?',
    options: ['6 rows (✗)', '8 rows (2³ = 8) (✓)', '9 rows (✗)', '16 rows (✗)'],
    correctIndex: 1,
    verifyInstruction: 'Check the 3-input telemetry lab to inspect all 8 binary combinations from TTT down to FFF.',
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the OR gate output (p ∨ q) as long as at least ONE switch is flipped to True (1)?',
    observableOptions: [
      'The output stays True (1) in 3 out of 4 combinations (✓)',
      'The output turns False as soon as the other switch is off (✗)',
      'The output only lights up when both are True (✗)',
      'The output flickers randomly (✗)',
    ],
    correctIndex: 0,
  },
  {
    question: 'In the Venn diagram representation, how does the region for ~(p ∧ q) compare to (~p ∨ ~q)?',
    observableOptions: [
      'They represent completely disjoint non-overlapping sets (✗)',
      'They highlight the exact same shaded area (De Morgan’s Equivalence) (✓)',
      'The first is smaller than the second (✗)',
      'One is circular while the other is rectangular (✗)',
    ],
    correctIndex: 1,
  },
];

// ─── CHALLENGES (25 comprehensive items: Foundation, Standard, Advanced with NEP 2020 Competency Levels) ───
const CHALLENGES: Challenge[] = [
  // ── Foundation Tier (Challenges 1 to 8) ──
  {
    id: 'ch_appmath_01',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following sentences is a mathematically valid proposition?',
    options: [
      '"Bengaluru is the IT capital of Karnataka." (✓)',
      '"Please calibrate the star tracker immediately!" (✗)',
      '"What is the orbital velocity of the lander?" (✗)',
      '"Let x be an arbitrary prime number." (✗)',
    ],
    correctIndex: 0,
    explanation: 'A proposition must be a declarative statement capable of being unequivocally True or False. Commands, questions, and open declarations without assignments are not propositions.',
    hints: [
      'Ask yourself: Can this sentence be marked as True or False right now without extra information?',
      'Commands and questions cannot have a truth value of T or F.',
      '"Bengaluru is the IT capital of Karnataka" is a factual declarative statement that is True.',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_appmath_02',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Given proposition p: "ISRO launched Chandrayaan-3" (True) and q: "The Earth has 3 natural moons" (False). Find the truth value of p ∧ q.',
    options: [
      'True (T) (✗)',
      'False (F) (✓)',
      'Neither T nor F (✗)',
      'Tautology (✗)',
    ],
    correctIndex: 1,
    explanation: 'Conjunction (∧) requires BOTH operands to be True. Since q is False, T ∧ F evaluates to False.',
    hints: [
      'Remember: AND (∧) is like switches in series. Both must be closed.',
      'Evaluate: True ∧ False.',
      'Since one component is False, the entire conjunction is False (F).',
    ],
  },
  {
    id: 'ch_appmath_03',
    nodeId: NODE_C10_APPMATH_069,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each logical symbol to its corresponding connective name on the logic terminal.',
    dragItems: [
      { label: 'Conjunction (AND)', targetId: 'slot_and' },
      { label: 'Disjunction (OR)', targetId: 'slot_or' },
      { label: 'Negation (NOT)', targetId: 'slot_not' },
      { label: 'Implication (IF-THEN)', targetId: 'slot_imp' },
    ],
    correctMapping: {
      slot_and: 'Conjunction (AND)',
      slot_or: 'Disjunction (OR)',
      slot_not: 'Negation (NOT)',
      slot_imp: 'Implication (IF-THEN)',
    },
    explanation: '∧ stands for Conjunction (AND), ∨ stands for Disjunction (OR), ~ (or ¬) stands for Negation (NOT), and → denotes Implication (IF-THEN).',
    hints: [
      'The pointed-up wedge ∧ is AND, while the open wedge ∨ is OR.',
      'The tilde ~ flips truth values (NOT).',
      'The arrow → represents conditional implication.',
    ],
  },
  {
    id: 'ch_appmath_04',
    nodeId: NODE_C10_APPMATH_069,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'How many total rows will appear in the truth table for a compound formula containing 4 distinct simple propositions (p, q, r, s)?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'rows',
    explanation: 'For n independent binary propositions, the total number of truth table rows is 2^n. For n = 4: 2^4 = 16 rows.',
    hints: [
      'Each proposition has 2 possible states: True or False.',
      'Use the rule 2^n where n is the number of atomic variables.',
      'Calculate 2 raised to the power of 4.',
    ],
  },
  {
    id: 'ch_appmath_05',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which set operation directly corresponds to the logical disjunction connective (p ∨ q)?',
    options: [
      'Intersection (A ∩ B) (✗)',
      'Union (A ∪ B) (✓)',
      'Complement (A′) (✗)',
      'Universal Set (U) (✗)',
    ],
    correctIndex: 1,
    explanation: 'Disjunction p ∨ q means an element belongs to set A OR set B OR both, which is the definition of Set Union (A ∪ B).',
    hints: [
      'Think of an element that is in either A, in B, or in both.',
      'Intersection requires both (AND), while Union combines either/or.',
      'The correct answer is Union (A ∪ B).',
    ],
  },
  {
    id: 'ch_appmath_06',
    nodeId: NODE_C10_APPMATH_069,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'What is the correct negation of the statement: "Every telemetry sensor in the rover is operational"?',
    options: [
      '"No telemetry sensor in the rover is operational." (✗)',
      '"At least one telemetry sensor in the rover is not operational." (✓)',
      '"Every telemetry sensor in the rover is malfunctioning." (✗)',
      '"Telemetry sensors cannot be tested." (✗)',
    ],
    correctIndex: 1,
    explanation: 'Negation of a universal claim "All A are B" is the existential negation "Some A are not B" (at least one sensor is not operational). Negating "All" is NOT "None".',
    hints: [
      'To prove "All sensors work" is a lie, how many broken sensors do you need to find?',
      'Finding just one broken sensor is sufficient to disprove the universal claim.',
      'The proper negation is "At least one sensor is not operational."',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_appmath_07',
    nodeId: NODE_C10_APPMATH_069,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'If p is False and q is False, what are the truth values of (p ∨ q) and (p → q) respectively?',
    options: [
      'p ∨ q is False; p → q is False (✗)',
      'p ∨ q is False; p → q is True (✓)',
      'p ∨ q is True; p → q is False (✗)',
      'p ∨ q is True; p → q is True (✗)',
    ],
    correctIndex: 1,
    explanation: 'F ∨ F = False. For implication, F → F = True because a false hypothesis never violates a conditional contract (vacuous truth).',
    hints: [
      'Check OR: If neither switch is on, is there current?',
      'Check IF-THEN: When the condition fails (p = F), the implication is vacuously True.',
      'So p ∨ q = F, and p → q = T.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_appmath_08',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'What is the truth value of the negation of a contradiction (~Contradiction)?',
    options: [
      'Always True (Tautology) (✓)',
      'Always False (Contradiction) (✗)',
      'Contingency depending on atomic inputs (✗)',
      'Undefined (✗)',
    ],
    correctIndex: 0,
    explanation: 'Since a contradiction produces False across every row, negating every False produces True across every row, which is by definition a Tautology.',
    hints: [
      'A contradiction is all Fs in its truth column.',
      'What happens when you apply NOT (~) to every F?',
      'All Fs become Ts, yielding a Tautology.',
    ],
  },

  // ── Standard Tier (Challenges 9 to 16) ──
  {
    id: 'ch_appmath_09',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the compound proposition p ∨ ~p across all possible truth states. How is this statement classified?',
    options: [
      'Tautology (always True) (✓)',
      'Contradiction (always False) (✗)',
      'Contingency (depends on inputs) (✗)',
      'Invalid logical form (✗)',
    ],
    correctIndex: 0,
    explanation: 'When p = T, p ∨ ~p = T ∨ F = T. When p = F, p ∨ ~p = F ∨ T = T. Since every row yields True, it is the Law of Excluded Middle, a Tautology.',
    hints: [
      'Test case 1: p = True. What is T ∨ F?',
      'Test case 2: p = False. What is F ∨ T?',
      'Since both rows give True, the statement is a Tautology.',
    ],
  },
  {
    id: 'ch_appmath_10',
    nodeId: NODE_C10_APPMATH_069,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Arrange the sequence of steps required to construct a formal truth table for the compound statement ~(p ∧ q) → r.',
    sortItems: [
      'List all 8 combinations of truth values for p, q, and r (TTT down to FFF)',
      'Compute intermediate conjunction column: p ∧ q',
      'Apply negation to compute intermediate column: ~(p ∧ q)',
      'Evaluate final implication column: [~(p ∧ q)] → r',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Truth tables must be built from the inside out: first define inputs, next compute inner bracket (p ∧ q), then apply outer negation ~(p ∧ q), and finally evaluate the main connective → with r.',
    hints: [
      'You always begin by setting up the atomic input columns (p, q, r).',
      'Evaluate innermost brackets before applying outside negations.',
      'The main connective linking the premise to r is evaluated last.',
    ],
  },
  {
    id: 'ch_appmath_11',
    nodeId: NODE_C10_APPMATH_069,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Consider the ICSE statement: "If a number is divisible by 6 (p), then it is divisible by 3 (q)." What is its converse, and is the converse logically equivalent to the original?',
    options: [
      '"If a number is divisible by 3, then it is divisible by 6" — NOT logically equivalent (✓)',
      '"If a number is not divisible by 3, then it is not divisible by 6" — Logically equivalent (✗)',
      '"A number is divisible by 6 if and only if divisible by 3" — Logically equivalent (✗)',
      '"If a number is not divisible by 6, then not divisible by 3" — Logically equivalent (✗)',
    ],
    correctIndex: 0,
    explanation: 'The converse of p → q is q → p ("If divisible by 3, then divisible by 6"). This is NOT equivalent to the original statement (e.g., 9 is divisible by 3 but NOT by 6).',
    hints: [
      'Converse simply swaps the antecedent and consequent: q → p.',
      'Check counterexample: Is 9 divisible by 3? Yes. Is 9 divisible by 6? No.',
      'Hence the converse is a different statement and not logically equivalent.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_appmath_12',
    nodeId: NODE_C10_APPMATH_069,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Construct the symbolic proposition for: "The rover will transmit telemetry (t) IF AND ONLY IF battery power is above 20% (b) AND the antenna is oriented toward Earth (a)."',
    availableParts: ['t', '↔', '(', 'b', '∧', 'a', ')', '∨', '→', '~'],
    targetState: 't ↔ ( b ∧ a )',
    validationHint: 'Use t for transmit, ↔ for iff, ( b ∧ a ) for battery and antenna.',
    explanation: 'Let t = transmit, b = battery > 20%, a = antenna oriented. "If and only if" translates to ↔, and "and" translates to ∧ within brackets: t ↔ (b ∧ a).',
    hints: [
      'Identify the main connective: "if and only if" = ↔.',
      'The right hand side has two conditions joined by AND (∧).',
      'Assemble: t ↔ ( b ∧ a ).',
    ],
  },
  {
    id: 'ch_appmath_13',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Evaluate the truth column for the compound proposition (p ∧ q) ∧ ~p. What is its classification?',
    options: [
      'Contradiction (all rows False) (✓)',
      'Tautology (all rows True) (✗)',
      'Contingency (mixed values) (✗)',
      'Biconditional identity (✗)',
    ],
    correctIndex: 0,
    explanation: '(p ∧ q) requires p to be True. But the second operand ~p requires p to be False. Since p cannot be both True and False simultaneously, all rows evaluate to False (Contradiction).',
    hints: [
      'Write out rows: for p=T, (T ∧ q) ∧ F = F.',
      'For p=F, (F ∧ q) ∧ T = F ∧ T = F.',
      'Since every single row produces False, it is a Contradiction.',
    ],
  },
  {
    id: 'ch_appmath_14',
    nodeId: NODE_C10_APPMATH_069,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'In a telemetry batch of 50 payload sensors, 28 support Thermal (p), 24 support Radiation (q), and 12 support both (p ∧ q). How many sensors support NEITHER [~(p ∨ q)]?',
    correctAnswer: 10,
    tolerance: 0,
    unit: 'sensors',
    explanation: 'Using set-logic duality: n(p ∨ q) = n(p) + n(q) - n(p ∧ q) = 28 + 24 - 12 = 40 sensors. Neither = Total - n(p ∨ q) = 50 - 40 = 10 sensors.',
    hints: [
      'First calculate the union n(p ∨ q) = 28 + 24 - 12.',
      'Union n(p ∨ q) = 40.',
      'Subtract from total 50: 50 - 40 = 10.',
    ],
  },
  {
    id: 'ch_appmath_15',
    nodeId: NODE_C10_APPMATH_069,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'When comparing p → q with its contrapositive ~q → ~p using truth tables, what do you observe across all four rows (TT, TF, FT, FF)?',
    options: [
      'Their final truth columns are completely identical (T, F, T, T) — they are logically equivalent (���)',
      'The contrapositive is the exact inverted opposite of the implication (✗)',
      'They match only on the TT and FF rows (✗)',
      'The contrapositive is always a contradiction (✗)',
    ],
    correctIndex: 0,
    explanation: 'An implication p → q and its contrapositive ~q → ~p are logically equivalent. Both evaluate to T, F, T, T in truth tables.',
    hints: [
      'Evaluate ~q → ~p for row TF: ~F → ~T = T → F = F.',
      'Evaluate for row FT: ~T → ~F = F → T = T.',
      'Both tables yield identical outputs: T, F, T, T.',
    ],
  },
  {
    id: 'ch_appmath_16',
    nodeId: NODE_C10_APPMATH_069,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Match the logical compound statement to its equivalent simplified form according to Boolean algebra identities.',
    options: [
      'p ∧ (p ∨ q) ≡ p (Absorption Law) (✓)',
      'p ∧ (p ∨ q) ≡ q (✗)',
      'p ∧ (p ∨ q) ≡ ~p (✗)',
      'p ∧ (p ∨ q) ≡ Tautology (✗)',
    ],
    correctIndex: 0,
    explanation: 'By the Absorption Law of mathematical logic, p ∧ (p ∨ q) simplifies directly to p because if p is True, both terms are True; if p is False, the conjunction is False.',
    hints: [
      'Check when p = True: T ∧ (T ∨ q) = T ∧ T = T.',
      'Check when p = False: F ∧ (F ∨ q) = F ∧ q = F.',
      'The output always mirrors p alone!',
    ],
  },

  // ── Advanced Tier (Challenges 17 to 25) ──
  {
    id: 'ch_appmath_17',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Examine the statement: [(p → q) ∧ p] → q (Modus Ponens). What is the classification of this fundamental law of deduction?',
    options: [
      'Tautology (✓)',
      'Contradiction (✗)',
      'Contingency (✗)',
      'Fallacy of affirming the consequent (✗)',
    ],
    correctIndex: 0,
    explanation: 'Row 1 (TT): (T ∧ T) → T = T. Row 2 (TF): (F ∧ T) → F = F → F = T. Row 3 (FT): (T ∧ F) → T = F → T = T. Row 4 (FF): (T ∧ F) → F = F → F = T. Every row is True, making Modus Ponens a Tautology.',
    hints: [
      'Check if there is ANY possible row where the antecedent is True and the consequent q is False.',
      'If (p → q) ∧ p is True, then both p must be True and (p → q) must be True, which forces q to be True!',
      'Because the result is never False, it is a Tautology.',
    ],
  },
  {
    id: 'ch_appmath_18',
    nodeId: NODE_C10_APPMATH_069,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Order the equivalent logical transformation steps proving De Morgan’s Law: ~(p ∨ q) ≡ (~p ∧ ~q).',
    sortItems: [
      'Construct truth values for p ∨ q: (T, T, T, F)',
      'Negate disjunction to get LHS ~(p ∨ q): (F, F, F, T)',
      'Calculate individual negations ~p (F, F, T, T) and ~q (F, T, F, T)',
      'Compute RHS conjunction ~p ∧ ~q: (F, F, F, T) and verify LHS ≡ RHS',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'To verify equivalence step by step: evaluate the inner disjunction, negate it to get the LHS column, compute atomic negations, and perform their conjunction to verify exact column matching.',
    hints: [
      'Begin by building the LHS disjunction column.',
      'Negate the disjunction to establish the target column (F, F, F, T).',
      'Evaluate individual negations before finding their conjunction.',
    ],
  },
  {
    id: 'ch_appmath_19',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A flight software audit flags this rule: ~(p → q) ↔ (p ∧ ~q). Is this equivalence valid, and why?',
    options: [
      'Valid (✓) — An implication is False ONLY when p is True and q is False; hence its negation is p ∧ ~q',
      'Invalid (✗) — The negation of p → q should be ~p → ~q',
      'Invalid (✗) — The negation of p → q is ~p ∨ q',
      'Valid only when p and q are both True (✗)',
    ],
    correctIndex: 0,
    explanation: 'Since p → q is logically equivalent to ~p ∨ q, by De Morgan’s Law, ~(p → q) ≡ ~(~p ∨ q) ≡ p ∧ ~q. Thus the equivalence is a valid tautology.',
    hints: [
      'When is "If you work hard, you pass" broken? Exactly when you work hard (p) AND do not pass (~q).',
      'Hence the negation of p → q is precisely p ∧ ~q.',
      'The equivalence is completely valid.',
    ],
  },
  {
    id: 'ch_appmath_20',
    nodeId: NODE_C10_APPMATH_069,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Design the boolean expression representing an exclusive OR (XOR: true when either p or q is true, but NOT both) using standard connectives.',
    availableParts: ['(', 'p', '∨', 'q', ')', '∧', '~', '(', 'p', '∧', 'q', ')'],
    targetState: '( p ∨ q ) ∧ ~ ( p ∧ q )',
    validationHint: 'Assemble: ( p ∨ q ) ∧ ~ ( p ∧ q )',
    explanation: 'Exclusive OR is true when p or q is true (p ∨ q) AND it is not the case that both are true ~(p ∧ q). Combined: (p ∨ q) ∧ ~(p ∧ q).',
    hints: [
      'XOR means "p OR q" but NOT "p AND q".',
      'Express "p or q" as (p ∨ q).',
      'Conjoin with NOT both: ∧ ~(p ∧ q).',
    ],
  },
  {
    id: 'ch_appmath_21',
    nodeId: NODE_C10_APPMATH_069,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Evaluate candidate claim: "p ↔ q is logically equivalent to (p → q) ∧ (q → p)." Is this claim correct?',
    options: [
      'Yes (✓) — a biconditional is the conjunction of an implication and its converse',
      'No (✗) — a biconditional only requires one-way implication',
      'No (✗) — the converse must be negated first',
      'Yes, but only when both p and q are False (✗)',
    ],
    correctIndex: 0,
    explanation: 'By definition, biconditional ("if and only if") requires both p → q and q → p to hold simultaneously. Truth tables for both expressions yield (T, F, F, T).',
    hints: [
      'Check row TT: T ∧ T = T.',
      'Check row TF: F ∧ T = F.',
      'Check row FF: T ∧ T = T. The claim is completely correct.',
    ],
  },
  {
    id: 'ch_appmath_22',
    nodeId: NODE_C10_APPMATH_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'For a compound proposition with 3 atomic variables (p, q, r), how many distinct rows in its truth table will produce a TRUE value for the expression (p ∧ q) ∨ r?',
    correctAnswer: 5,
    tolerance: 0,
    unit: 'rows',
    explanation: 'There are 8 rows total. r is True in 4 rows (regardless of p, q). (p ∧ q) is True in 2 rows (TTT and TTF). Row TTT is already counted in r=T. So total True rows = 4 (when r=T) + 1 (when p=T, q=T, r=F) = 5 rows.',
    hints: [
      'List the 8 combinations for (p, q, r).',
      'Count all rows where r = T (there are 4 such rows).',
      'Now check rows where r = F: how many have p = T and q = T? (only 1: TTF). 4 + 1 = 5.',
    ],
  },
  {
    id: 'ch_appmath_23',
    nodeId: NODE_C10_APPMATH_069,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Classify the proposition: (p → q) ∨ (q → p).',
    options: [
      'Tautology (✓)',
      'Contingency (✗)',
      'Contradiction (✗)',
      'Undetermined (✗)',
    ],
    correctIndex: 0,
    explanation: 'If p is True and q is False, then q → p is True. In all other cases, p → q is True. Thus, in every possible universe, at least one of the two implications is True, making the disjunction a Tautology!',
    hints: [
      'Test row TF: p → q is F, but what is q → p (F → T)? It is T! So F ∨ T = T.',
      'Test all other rows where p → q is already T.',
      'Since every single row yields T, it is a Tautology.',
    ],
  },
  {
    id: 'ch_appmath_24',
    nodeId: NODE_C10_APPMATH_069,
    type: 'match',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'According to the Law of Duality in mathematical logic, what is the dual of the identity (p ∨ q) ∧ (p ∨ ~q) ≡ p?',
    options: [
      '(p ∧ q) ∨ (p ∧ ~q) ≡ p (✓)',
      '(~p ∧ ~q) ∨ (~p ∧ q) ≡ ~p (✗)',
      '(p ∨ q) ∨ (p ∨ ~q) ≡ p (✗)',
      '(p ∧ q) ∧ (p ∧ ~q) ≡ p (✗)',
    ],
    correctIndex: 0,
    explanation: 'The principle of duality states that any true logical identity remains true if ∧ is replaced by ∨, ∨ is replaced by ∧, T is replaced by F, and F is replaced by T. Hence, (p ∨ q) ∧ (p ∨ ~q) becomes (p ∧ q) ∨ (p ∧ ~q) ≡ p.',
    hints: [
      'Swap every ∧ with ∨.',
      'Swap every ∨ with ∧.',
      'Keep proposition letters unchanged.',
    ],
  },
  {
    id: 'ch_appmath_25',
    nodeId: NODE_C10_APPMATH_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'How many distinct, non-equivalent truth tables (boolean functions) can be formed using 2 atomic proposition variables (p and q)?',
    correctAnswer: 16,
    tolerance: 0,
    unit: 'functions',
    explanation: 'With 2 variables, a truth table has 2² = 4 rows. Each row can independently output either T or F (2 possibilities). Hence, total distinct functions = 2^(2^2) = 2^4 = 16 boolean functions.',
    hints: [
      'A 2-variable truth table has 4 rows.',
      'Each row can be assigned either True or False.',
      'Calculate 2 to the power of 4.',
    ],
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Chief Avionics Architect: Rover Gate Specification',
  description: 'Design the autonomous landing sequence logic for the Vikram-2 lander using formal propositions and connectives.',
  steps: [
    'Define 3 atomic propositions: a = "Altitude < 100m", v = "Vertical velocity < 2 m/s", o = "Obstacle detected".',
    'Formulate the symbolic condition for thruster cutoff: (a ∧ v) ∧ ~o.',
    'Formulate the emergency abort condition: (~v ∨ o) → Thruster_Max.',
    'Construct the 8-row truth table and verify that no state produces simultaneous Cutoff and Abort.',
  ],
};

// ─── COMPONENT IMPLEMENTATION ───
export default function C10_AppliedMathsLogicReasoningPropositionsSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C10_APPMATH_069,
  title = DEFAULT_PROPS.title || 'Logic and reasoning - propositions, connectives, and truth tables',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['applied_maths'] || SUBJECT_CONFIG['math'] || { name: 'Applied Maths', emoji: '📐', color: 'indigo' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery & Exploration states
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Simulation Lab States (Interactive variables for exploration & sandbox)
  const [switchP, setSwitchP] = useState(true);
  const [switchQ, setSwitchQ] = useState(false);
  const [switchR, setSwitchR] = useState(true);
  const [selectedConnective, setSelectedConnective] = useState<'AND' | 'OR' | 'NOT' | 'IMP' | 'BIC'>('AND');
  const [activeVennFilter, setActiveVennFilter] = useState<'UNION' | 'INTERSECT' | 'COMP_P' | 'DIFF'>('INTERSECT');
  
  // Real-time slider states connected directly to live visualizations
  const [busVoltage, setBusVoltage] = useState<number>(24); // 5V to 48V
  const [sensorSensitivity, setSensorSensitivity] = useState<number>(85); // 0% to 100%
  const [clockFrequency, setClockFrequency] = useState<number>(10); // 1Hz to 50Hz
  const [premiseCertainty, setPremiseCertainty] = useState<number>(75); // 0 to 100%

  // Reflection States
  const [reflectionSurprise, setReflectionSurprise] = useState('');
  const [reflectionExplain, setReflectionExplain] = useState('');
  const [reflectionRealLife, setReflectionRealLife] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Challenge & Interaction States
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag-and-drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback & Audio/Animation UI states
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs for persistent BKT and timers
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── ADAPTIVE CHALLENGES FILTER ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── ADAPT DIFFICULTY ON BKT MASTERY CHANGE ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── REAL-TIME LOGIC CALCULATIONS ───
  const calculatedGateOutput = useMemo(() => {
    switch (selectedConnective) {
      case 'AND': return switchP && switchQ;
      case 'OR': return switchP || switchQ;
      case 'NOT': return !switchP;
      case 'IMP': return !switchP || switchQ; // p → q is ~p ∨ q
      case 'BIC': return switchP === switchQ;
      default: return false;
    }
  }, [selectedConnective, switchP, switchQ]);

  // 3-input output calculation: (p ∧ q) ∨ r
  const calculatedThreeInputOutput = useMemo(() => {
    return (switchP && switchQ) || switchR;
  }, [switchP, switchQ, switchR]);

  // ─── 2D CANVAS OSCILLOSCOPE LOGIC WAVEFORM ANIMATION ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let time = 0;

    const render = () => {
      time += 0.02 * (clockFrequency / 10);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background telemetry grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Input Waveform p
      ctx.beginPath();
      ctx.strokeStyle = switchP ? '#22c55e' : '#ef4444';
      ctx.lineWidth = 2.5;
      const yP = switchP ? 20 : 45;
      ctx.moveTo(10, yP);
      ctx.lineTo(canvas.width - 10, yP);
      ctx.stroke();

      // Label p
      ctx.fillStyle = switchP ? '#4ade80' : '#f87171';
      ctx.font = '10px monospace';
      ctx.fillText(`Signal P: ${switchP ? 'HIGH (1)' : 'LOW (0)'} | V: ${busVoltage}V`, 12, 14);

      // Draw Input Waveform q
      ctx.beginPath();
      ctx.strokeStyle = switchQ ? '#38bdf8' : '#64748b';
      ctx.lineWidth = 2.5;
      const yQ = switchQ ? 65 : 90;
      ctx.moveTo(10, yQ);
      ctx.lineTo(canvas.width - 10, yQ);
      ctx.stroke();

      // Label q
      ctx.fillStyle = switchQ ? '#38bdf8' : '#94a3b8';
      ctx.fillText(`Signal Q: ${switchQ ? 'HIGH (1)' : 'LOW (0)'} | Sens: ${sensorSensitivity}%`, 12, 60);

      // Draw Gate Output Waveform with pulsing carrier based on voltage & frequency
      ctx.beginPath();
      ctx.strokeStyle = calculatedGateOutput ? '#fbbf24' : '#475569';
      ctx.lineWidth = 3.5;
      const yOutBase = calculatedGateOutput ? 115 : 145;
      for (let x = 10; x < canvas.width - 10; x += 4) {
        const pulse = calculatedGateOutput ? Math.sin(x * 0.15 + time * 4) * (busVoltage / 10) : 0;
        if (x === 10) ctx.moveTo(x, yOutBase + pulse);
        else ctx.lineTo(x, yOutBase + pulse);
      }
      ctx.stroke();

      // Label Output
      ctx.fillStyle = calculatedGateOutput ? '#fde047' : '#94a3b8';
      ctx.font = 'bold 11px monospace';
      ctx.fillText(
        `GATE (${selectedConnective}): ${calculatedGateOutput ? 'TRUE (ACTUATOR ENGAGED ✓)' : 'FALSE (IDLE ✗)'}`,
        12,
        110
      );

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [switchP, switchQ, selectedConnective, calculatedGateOutput, busVoltage, sensorSensitivity, clockFrequency]);

  // ─── ESCALATING HINTS HANDLER ───
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
    }
  }, [hintCount, challenge]);

  // ─── INACTIVITY AUTO-HINT ───
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 12000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // ─── DISCOVERY HANDLERS ───
  const handleDiscoveryAnswer = useCallback((selectedIndex: number) => {
    const isCorrect = selectedIndex === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent insight! You grasp vacuous truth.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the logic simulation lab. Interact with each gate.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode active. Test any switch and voltage configurations with zero grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Mission telemetry challenges initiated. Put your logic skills to the test!');
  }, []);

  // ─── PREDICTION & OBSERVATION HANDLERS ───
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now toggle the physical switches to observe the circuit.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Spot on observation!' : 'Check the light status carefully across all switch combinations.');
  }, []);

  // ─── SWITCH & INTERACTION HANDLERS ───
  const toggleSwitchP = useCallback(() => {
    setSwitchP(p => !p);
    audioManager.play('tap');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const toggleSwitchQ = useCallback(() => {
    setSwitchQ(q => !q);
    audioManager.play('tap');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const toggleSwitchR = useCallback(() => {
    setSwitchR(r => !r);
    audioManager.play('tap');
    resetInactivityTimer();
  }, [resetInactivityTimer]);

  const handleSelectConnective = useCallback((conn: 'AND' | 'OR' | 'NOT' | 'IMP' | 'BIC') => {
    setSelectedConnective(conn);
    audioManager.play('tap');
  }, []);

  const handleSelectVennFilter = useCallback((filter: 'UNION' | 'INTERSECT' | 'COMP_P' | 'DIFF') => {
    setActiveVennFilter(filter);
    audioManager.play('tap');
  }, []);

  // ─── DRAG AND DROP HANDLERS ───
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = challenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
      setWrongShake(true);
      setTimeout(() => setWrongShake(false), 500);
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  // ─── SORT HANDLERS ───
  const handleSortMove = useCallback((fromIndex: number, toIndex: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const initial = prev.length === 0 && challenge.sortItems ? challenge.sortItems.map((_, i) => i) : prev;
      const arr = [...initial];
      const [moved] = arr.splice(fromIndex, 1);
      arr.splice(toIndex, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : (challenge.sortItems?.map((_, i) => i) || []);
    const isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctOrder);
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Correct sequencing!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [sortArrangement, challenge, showNextHint]);

  // ─── CONSTRUCT CHALLENGE HANDLERS ───
  const handleAddConstructPart = useCallback((part: string) => {
    setConstructParts(prev => [...prev, part]);
    audioManager.play('tap');
  }, []);

  const handleRemoveConstructPart = useCallback((index: number) => {
    setConstructParts(prev => prev.filter((_, i) => i !== index));
    audioManager.play('pop');
  }, []);

  const handleConstructSubmit = useCallback(() => {
    const constructedString = constructParts.join(' ');
    const isCorrect = constructedString === challenge.targetState;
    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      speechManager.speak('Formula constructed with mathematical precision!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);
      showNextHint();
    }
  }, [constructParts, challenge, showNextHint]);

  // ─── COMPLETION HANDLER ───
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 4);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Simulation complete! You have mastered ICSE applied mathematical logic.');
  }, [errors, onComplete]);

  // ─── NEXT CHALLENGE HANDLER ───
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

  // ─── GENERAL ANSWER HANDLER ───
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = answer === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'numeric') {
      const num = typeof answer === 'string' ? parseFloat(answer) : answer as number;
      isCorrect = Math.abs(num - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct deduction!');
      setShowConfetti(true);
      setShowExplanation(true);
      bktStateRef.current = bktUpdate(bktStateRef.current, true);

      const srsItem = createReviewItem(challenge.nodeId, challenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
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
        speechManager.speak('Let us review the step by step proof together.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 5000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, showNextHint, hitMisconceptions, resetInactivityTimer]);

  // Clean timer on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  // ─── MOTIVATIONAL FEEDBACK TEXT GENERATION ───
  const motivationalMessage = useMemo(() => {
    if (errors === 0) return { title: 'PERFECT SCORE!', desc: 'Flawless logic! You demonstrated 100% mastery with zero telemetry logic faults.', tag: 'Master Logician' };
    if (errors <= 3) return { title: 'Great work!', desc: 'Superb conceptual understanding. You navigated connectives, implication truth, and tautologies with high precision.', tag: 'Avionics Specialist' };
    if (errors <= 7) return { title: 'Good effort!', desc: 'Solid problem solving! Review the vacuous truth and De Morgan principles to eliminate edge-case errors.', tag: 'Logic Apprentice' };
    return { title: 'Do not give up — You WILL get this!', desc: 'Mathematical logic has subtle conventions like implication contracts. Review the simulations and you will master it!', tag: 'Persistent Explorer' };
  }, [errors]);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl shadow-2xl border border-slate-800 font-sans">
      {/* ─── HEADER BAR ─── */}
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-3"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-gold-950/80 rounded-2xl border border-gold-700/50" role="img" aria-label="Maths Icon">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-bold tracking-widest text-gold-400 uppercase">ICSE Class 10 Applied Maths</span>
            <h1 className="text-lg sm:text-xl font-black text-white">{title}</h1>
          </div>
        </div>

        {/* Navigation Phase Pill */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800" role="navigation" aria-label="Simulation Phases">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map(p => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') setPhase('challenge');
              }}
              aria-label={`Switch to ${p} phase`}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                phase === p
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-white shadow-lg shadow-gold-600/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {p.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </motion.header>

      {/* ─── DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-6 bg-gradient-to-br from-gold-950/60 via-slate-900 to-slate-900 rounded-2xl border border-gold-800/60 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />
            <span className="inline-block px-3 py-1 bg-gold-900/70 text-gold-300 text-xs font-bold rounded-full mb-3 border border-gold-700/50">
              🛰️ MISSION SCENARIO
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300 mt-3 font-mono bg-gold-950/80 p-3 rounded-xl border border-gold-800/40">
              {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold tracking-wider uppercase">
              <span>⚡ Discovery Challenge</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-normal">No grading penalty — test your intuition!</span>
            </div>
            <p className="text-base sm:text-lg font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  className={`w-full text-left p-4 rounded-xl text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-900/50 border-slate-800 text-slate-500'
                      : 'bg-slate-800/80 border-slate-700/80 text-slate-200 hover:bg-slate-750 hover:border-gold-500'
                  }`}
                >
                  <span className="inline-block w-6 font-mono text-xs text-gold-400 font-bold">{String.fromCharCode(65 + i)}.</span>
                  {opt}
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-bold' : 'text-amber-400'}`}>
                  {discoveryCorrect ? '✓ Correct deduction!' : DISCOVERY_QUESTION.hintAfter}
                </p>
                <div className="flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    aria-label="Enter Logic Exploration Labs"
                    className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-gold-600/30 flex items-center gap-2"
                  >
                    <span>Enter Logic Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold tracking-wider text-gold-400 uppercase">
              Interactive Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>
            <div className="flex gap-1.5" aria-hidden="true">
              {EXPLORATION_STEPS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-gold-500' : 'w-2 bg-slate-800'}`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-5"
            >
              <div>
                <h3 className="text-xl font-bold text-white">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-sm text-amber-400 mt-1 flex items-center gap-2">
                  <span>👉</span>
                  <span>{EXPLORATION_STEPS[currentSlide].instruction}</span>
                </p>
              </div>

              {/* REAL-TIME CONTROLS BAR: SLIDERS DIRECTLY LINKED TO VISUALIZATION */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-2xl border border-slate-800">
                {/* Slider 1: Bus Voltage */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-mono">Bus Voltage:</span>
                    <span className="text-amber-400 font-bold font-mono">{busVoltage} V</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={48}
                    step={1}
                    value={busVoltage}
                    onChange={(e) => setBusVoltage(Number(e.target.value))}
                    aria-label="Adjust Telemetry Bus Voltage in Volts"
                    className="w-full accent-amber-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>5V (Min)</span>
                    <span>48V (Max)</span>
                  </div>
                </div>

                {/* Slider 2: Sensor Sensitivity */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-mono">Sensor Sensitivity:</span>
                    <span className="text-gold-400 font-bold font-mono">{sensorSensitivity}%</span>
                  </div>
                  <input
                    type="range"
                    min={10}
                    max={100}
                    step={5}
                    value={sensorSensitivity}
                    onChange={(e) => setSensorSensitivity(Number(e.target.value))}
                    aria-label="Adjust Sensor Sensitivity Percentage"
                    className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>10%</span>
                    <span>100%</span>
                  </div>
                </div>

                {/* Slider 3: Clock Frequency */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400 font-mono">Clock Rate:</span>
                    <span className="text-emerald-400 font-bold font-mono">{clockFrequency} Hz</span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={50}
                    step={1}
                    value={clockFrequency}
                    onChange={(e) => setClockFrequency(Number(e.target.value))}
                    aria-label="Adjust Logic Gate Clock Frequency in Hertz"
                    className="w-full accent-emerald-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                    <span>1 Hz</span>
                    <span>50 Hz</span>
                  </div>
                </div>
              </div>

              {/* MULTI-REPRESENTATION VISUAL WORKSPACE */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-950 p-5 rounded-2xl border border-slate-800/80">
                {/* Left side: Interactive Circuit & Gate Switcher */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex flex-wrap gap-2 pb-2 border-b border-slate-800" role="toolbar" aria-label="Logical Connectives Select">
                    {(['AND', 'OR', 'NOT', 'IMP', 'BIC'] as const).map(conn => (
                      <motion.button
                        key={conn}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleSelectConnective(conn)}
                        aria-label={`Select connective ${conn}`}
                        className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all ${
                          selectedConnective === conn
                            ? 'bg-gold-600 text-white shadow-md shadow-gold-600/40'
                            : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
                        }`}
                      >
                        {conn === 'AND' ? 'p ∧ q (AND)' :
                         conn === 'OR' ? 'p ∨ q (OR)' :
                         conn === 'NOT' ? '~p (NOT)' :
                         conn === 'IMP' ? 'p → q (IF-THEN)' :
                         'p ↔ q (IFF)'}
                      </motion.button>
                    ))}
                  </div>

                  {/* Physical Circuit SVG Visualizer */}
                  <div className="relative bg-slate-900/90 rounded-2xl p-4 border border-slate-800 min-h-[220px] flex flex-col justify-center items-center">
                    <svg viewBox="0 0 500 200" className="w-full max-h-[190px]" aria-label="Interactive circuit diagram">
                      {/* Power Source */}
                      <rect x="20" y="80" width="35" height="40" rx="4" fill="#334155" stroke="#64748b" strokeWidth="2" />
                      <text x="37" y="105" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">{busVoltage}V</text>

                      {/* Main Power Rails */}
                      <path d="M 55 100 L 90 100" stroke="#64748b" strokeWidth="3" fill="none" />

                      {/* AND Mode: Series Switches */}
                      {selectedConnective === 'AND' && (
                        <g>
                          <path d="M 90 100 L 140 100" stroke={switchP ? '#22c55e' : '#64748b'} strokeWidth="3" />
                          {/* Switch P */}
                          <line x1="140" y1="100" x2={switchP ? "190" : "185"} y2={switchP ? "100" : "75"} stroke={switchP ? '#22c55e' : '#ef4444'} strokeWidth="4" strokeLinecap="round" />
                          <circle cx="140" cy="100" r="5" fill="#f8fafc" />
                          <circle cx="190" cy="100" r="5" fill="#f8fafc" />
                          <text x="165" y="68" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Switch P {switchP ? '(✓ Closed)' : '(✗ Open)'}</text>

                          <path d="M 190 100 L 250 100" stroke={switchP ? '#22c55e' : '#64748b'} strokeWidth="3" />
                          {/* Switch Q */}
                          <line x1="250" y1="100" x2={switchQ ? "300" : "295"} y2={switchQ ? "100" : "75"} stroke={switchQ ? '#22c55e' : '#ef4444'} strokeWidth="4" strokeLinecap="round" />
                          <circle cx="250" cy="100" r="5" fill="#f8fafc" />
                          <circle cx="300" cy="100" r="5" fill="#f8fafc" />
                          <text x="275" y="68" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Switch Q {switchQ ? '(✓ Closed)' : '(✗ Open)'}</text>

                          <path d="M 300 100 L 370 100" stroke={switchP && switchQ ? '#fbbf24' : '#64748b'} strokeWidth="3" />
                        </g>
                      )}

                      {/* OR Mode: Parallel Branches */}
                      {selectedConnective === 'OR' && (
                        <g>
                          <path d="M 90 100 L 130 100 L 130 50 L 170 50" stroke="#64748b" strokeWidth="3" fill="none" />
                          <path d="M 90 100 L 130 100 L 130 150 L 170 150" stroke="#64748b" strokeWidth="3" fill="none" />

                          {/* Top Branch P */}
                          <line x1="170" y1="50" x2={switchP ? "240" : "235"} y2={switchP ? "50" : "30"} stroke={switchP ? '#22c55e' : '#ef4444'} strokeWidth="4" strokeLinecap="round" />
                          <circle cx="170" cy="50" r="5" fill="#f8fafc" />
                          <circle cx="240" cy="50" r="5" fill="#f8fafc" />
                          <text x="205" y="24" textAnchor="middle" fill="#4ade80" fontSize="11" fontWeight="bold">Branch P {switchP ? '(✓)' : '(✗)'}</text>

                          {/* Bottom Branch Q */}
                          <line x1="170" y1="150" x2={switchQ ? "240" : "235"} y2={switchQ ? "150" : "130"} stroke={switchQ ? '#22c55e' : '#ef4444'} strokeWidth="4" strokeLinecap="round" />
                          <circle cx="170" cy="150" r="5" fill="#f8fafc" />
                          <circle cx="240" cy="150" r="5" fill="#f8fafc" />
                          <text x="205" y="174" textAnchor="middle" fill="#38bdf8" fontSize="11" fontWeight="bold">Branch Q {switchQ ? '(✓)' : '(✗)'}</text>

                          {/* Join branches */}
                          <path d="M 240 50 L 290 50 L 290 100 L 370 100" stroke={switchP || switchQ ? '#fbbf24' : '#64748b'} strokeWidth="3" fill="none" />
                          <path d="M 240 150 L 290 150 L 290 100" stroke={switchP || switchQ ? '#fbbf24' : '#64748b'} strokeWidth="3" fill="none" />
                        </g>
                      )}

                      {/* Other Connectives Gate Symbol representation */}
                      {(selectedConnective === 'NOT' || selectedConnective === 'IMP' || selectedConnective === 'BIC') && (
                        <g>
                          <path d="M 90 70 L 180 70" stroke={switchP ? '#22c55e' : '#ef4444'} strokeWidth="3" />
                          <text x="130" y="60" textAnchor="middle" fill="#4ade80" fontSize="12" fontWeight="bold">P {switchP ? '(✓ T)' : '(✗ F)'}</text>

                          {selectedConnective !== 'NOT' && (
                            <>
                              <path d="M 90 130 L 180 130" stroke={switchQ ? '#38bdf8' : '#ef4444'} strokeWidth="3" />
                              <text x="130" y="150" textAnchor="middle" fill="#38bdf8" fontSize="12" fontWeight="bold">Q {switchQ ? '(✓ T)' : '(✗ F)'}</text>
                            </>
                          )}

                          {/* Logic Module Box */}
                          <rect x="180" y="45" width="120" height="110" rx="12" fill="#1e1b4b" stroke="#6366f1" strokeWidth="2" />
                          <text x="240" y="95" textAnchor="middle" fill="#c7d2fe" fontSize="13" fontWeight="bold">
                            {selectedConnective === 'NOT' ? '~P INVERTER' : selectedConnective === 'IMP' ? 'p → q LOGIC' : 'p ↔ q IFF'}
                          </text>
                          <text x="240" y="120" textAnchor="middle" fill="#a5b4fc" fontSize="10">Solid State Unit</text>

                          <path d="M 300 100 L 370 100" stroke={calculatedGateOutput ? '#fbbf24' : '#64748b'} strokeWidth="3" />
                        </g>
                      )}

                      {/* Payload Rover Light Indicator */}
                      <circle cx="410" cy="100" r="28" fill={calculatedGateOutput ? '#fef08a' : '#1e293b'} stroke={calculatedGateOutput ? '#eab308' : '#475569'} strokeWidth="3" className="transition-all duration-300" />
                      {calculatedGateOutput && (
                        <circle cx="410" cy="100" r="38" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="4 4" opacity="0.8" />
                      )}
                      <text x="410" y="105" textAnchor="middle" fill={calculatedGateOutput ? '#713f12' : '#64748b'} fontSize="11" fontWeight="bold">
                        {calculatedGateOutput ? '✓ ON' : '✗ OFF'}
                      </text>
                      <text x="410" y="145" textAnchor="middle" fill="#94a3b8" fontSize="10">Payload Status</text>
                    </svg>

                    {/* Switch Toggles */}
                    <div className="flex items-center gap-4 mt-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={toggleSwitchP}
                        aria-label={`Toggle Switch P currently ${switchP ? 'True' : 'False'}`}
                        className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                          switchP ? 'bg-emerald-950 border-emerald-500 text-emerald-300' : 'bg-rose-950 border-rose-600 text-rose-300'
                        }`}
                      >
                        <span>{switchP ? '✓' : '✗'}</span>
                        Switch P: {switchP ? 'TRUE (1)' : 'FALSE (0)'}
                      </motion.button>

                      {selectedConnective !== 'NOT' && (
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={toggleSwitchQ}
                          aria-label={`Toggle Switch Q currently ${switchQ ? 'True' : 'False'}`}
                          className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-2 ${
                            switchQ ? 'bg-gold-950 border-gold-500 text-gold-300' : 'bg-rose-950 border-rose-600 text-rose-300'
                          }`}
                        >
                          <span>{switchQ ? '✓' : '✗'}</span>
                          Switch Q: {switchQ ? 'TRUE (1)' : 'FALSE (0)'}
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Right side: Dual Multi-Representation (Venn & Waveform) */}
                <div className="lg:col-span-5 space-y-4">
                  <div className="p-4 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gold-400">Venn Diagram Duality</span>
                      <div className="flex gap-1 text-[10px] font-mono">
                        <button
                          onClick={() => handleSelectVennFilter('INTERSECT')}
                          aria-label="Select Intersection A and B"
                          className={`px-2 py-0.5 rounded ${activeVennFilter === 'INTERSECT' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          A ∩ B
                        </button>
                        <button
                          onClick={() => handleSelectVennFilter('UNION')}
                          aria-label="Select Union A or B"
                          className={`px-2 py-0.5 rounded ${activeVennFilter === 'UNION' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          A ∪ B
                        </button>
                        <button
                          onClick={() => handleSelectVennFilter('COMP_P')}
                          aria-label="Select Complement A prime"
                          className={`px-2 py-0.5 rounded ${activeVennFilter === 'COMP_P' ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'}`}
                        >
                          A′
                        </button>
                      </div>
                    </div>

                    {/* SVG Venn Diagram */}
                    <svg viewBox="0 0 260 140" className="w-full h-28 bg-slate-950 rounded-xl" aria-label="Venn diagram visualization">
                      {/* Set A circle */}
                      <circle cx="95" cy="70" r="45" fill={activeVennFilter === 'COMP_P' ? '#312e81' : activeVennFilter === 'UNION' ? '#4338ca' : '#1e293b'} opacity="0.6" stroke="#6366f1" strokeWidth="2" />
                      {/* Set B circle */}
                      <circle cx="165" cy="70" r="45" fill={activeVennFilter === 'UNION' ? '#4338ca' : '#1e293b'} opacity="0.6" stroke="#38bdf8" strokeWidth="2" />

                      {/* Intersection highlight */}
                      {activeVennFilter === 'INTERSECT' && (
                        <path d="M 130 35 A 45 45 0 0 1 130 105 A 45 45 0 0 1 130 35" fill="#22c55e" opacity="0.8" />
                      )}

                      <text x="80" y="75" fill="#c7d2fe" fontSize="12" fontWeight="bold">p (A)</text>
                      <text x="175" y="75" fill="#bae6fd" fontSize="12" fontWeight="bold">q (B)</text>
                      <text x="130" y="75" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {activeVennFilter === 'INTERSECT' ? 'p ∧ q' : activeVennFilter === 'UNION' ? 'p ∨ q' : 'A′'}
                      </text>
                    </svg>
                  </div>

                  {/* Oscilloscope Waveform Canvas */}
                  <div className="p-3 bg-slate-900/90 rounded-2xl border border-slate-800">
                    <span className="text-[11px] font-mono text-slate-400 block mb-1">Live Waveform Oscilloscope ({clockFrequency} Hz)</span>
                    <canvas ref={canvasRef} width={280} height={160} className="w-full rounded-xl bg-slate-950" />
                  </div>
                </div>
              </div>

              {/* Predict-Then-Check and Observation Blocks */}
              {currentSlide === 1 && !predictionMade && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-5 bg-gold-950/40 rounded-2xl border border-gold-700/40 space-y-3">
                  <span className="text-xs font-bold text-amber-400">🔮 PREDICT BEFORE TESTING:</span>
                  <p className="text-sm text-white font-medium">{PREDICTION_QUESTIONS[0].question}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                      <motion.button
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handlePrediction(i)}
                        aria-label={`Predict option ${i + 1}: ${opt}`}
                        className="p-3 bg-slate-800/80 rounded-xl text-xs text-left text-slate-200 hover:bg-gold-900/60 border border-slate-700"
                      >
                        {opt}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {currentSlide === 1 && predictionMade && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-emerald-950/40 rounded-2xl border border-emerald-600/40 text-xs text-emerald-300">
                  ✓ Prediction registered! Check the switches and sliders above to verify in real time.
                </motion.div>
              )}

              {/* Slide Nav Buttons */}
              <div className="flex items-center justify-between pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentSlide(s => Math.max(0, s - 1))}
                  disabled={currentSlide === 0}
                  aria-label="Go to previous exploration lab"
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  ← Previous Lab
                </motion.button>
                <span className="text-xs text-slate-500 font-mono">{currentSlide + 1} / {EXPLORATION_STEPS.length}</span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentSlide(s => s + 1)}
                    aria-label="Proceed to next exploration lab"
                    className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow-md shadow-gold-600/30"
                  >
                    Next Lab →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    aria-label="Open sandbox playground"
                    className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-600/30"
                  >
                    Open Sandbox Playground →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── SANDBOX FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Free Exploration Mode</span>
                <h3 className="text-xl font-bold text-white">Logic Sandbox & Live Truth Table Generator</h3>
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToChallenge}
                aria-label="Proceed to graded challenges"
                className="px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 text-white font-bold text-xs rounded-2xl shadow-lg shadow-gold-600/30"
              >
                Ready for Graded Challenges! →
              </motion.button>
            </div>

            <p className="text-xs text-slate-400">
              Click any row in the truth table below to inject custom binary states directly into the logic gate circuit. Adjust the live slider to see real-time probability & voltage reactions.
            </p>

            {/* Live Parameter Control Slider in Sandbox */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="w-full sm:w-1/2 space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="text-gold-300 font-mono">Premise Certainty Slider (p → q):</span>
                  <span className="text-emerald-400 font-bold font-mono">{premiseCertainty}%</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={premiseCertainty}
                  onChange={(e) => setPremiseCertainty(Number(e.target.value))}
                  aria-label="Adjust premise certainty percentage"
                  className="w-full accent-gold-500 cursor-pointer h-2 bg-slate-800 rounded-lg"
                />
              </div>
              <div className="text-xs text-slate-300 bg-slate-900 p-2.5 rounded-xl border border-slate-700 font-mono">
                Vacuous Truth Status: <strong className="text-emerald-400">{premiseCertainty === 0 ? '100% Vacuously TRUE' : premiseCertainty < 50 ? 'Likely Vacuous' : 'Empirical Evaluation'}</strong>
              </div>
            </div>

            {/* Truth Table Grid */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse" aria-label="Interactive Truth Table">
                <thead>
                  <tr className="bg-slate-950 text-gold-300 border-b border-slate-800">
                    <th className="p-3">Row #</th>
                    <th className="p-3">p</th>
                    <th className="p-3">q</th>
                    <th className="p-3">~p</th>
                    <th className="p-3">p ∧ q</th>
                    <th className="p-3">p ∨ q</th>
                    <th className="p-3">p → q</th>
                    <th className="p-3">p ↔ q</th>
                    <th className="p-3">Actuator State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800">
                  {[
                    { p: true, q: true, row: 1 },
                    { p: true, q: false, row: 2 },
                    { p: false, q: true, row: 3 },
                    { p: false, q: false, row: 4 },
                  ].map((r, idx) => {
                    const isSelected = switchP === r.p && switchQ === r.q;
                    return (
                      <tr
                        key={idx}
                        onClick={() => {
                          setSwitchP(r.p);
                          setSwitchQ(r.q);
                          audioManager.play('tap');
                        }}
                        aria-label={`Row ${r.row}: p is ${r.p ? 'True' : 'False'}, q is ${r.q ? 'True' : 'False'}`}
                        className={`cursor-pointer transition-colors ${
                          isSelected ? 'bg-gold-950/80 text-white font-bold' : 'hover:bg-slate-800/60 text-slate-300'
                        }`}
                      >
                        <td className="p-3">{r.row}</td>
                        <td className="p-3 text-emerald-400">{r.p ? '✓ T (1)' : '✗ F (0)'}</td>
                        <td className="p-3 text-gold-400">{r.q ? '✓ T (1)' : '✗ F (0)'}</td>
                        <td className="p-3">{!r.p ? '✓ T' : '✗ F'}</td>
                        <td className="p-3">{r.p && r.q ? '✓ T' : '✗ F'}</td>
                        <td className="p-3">{r.p || r.q ? '✓ T' : '✗ F'}</td>
                        <td className="p-3">{!r.p || r.q ? '✓ T' : '✗ F'}</td>
                        <td className="p-3">{r.p === r.q ? '✓ T' : '✗ F'}</td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] ${
                            (selectedConnective === 'AND' && r.p && r.q) ||
                            (selectedConnective === 'OR' && (r.p || r.q)) ||
                            (selectedConnective === 'IMP' && (!r.p || r.q)) ||
                            (selectedConnective === 'BIC' && r.p === r.q)
                              ? 'bg-emerald-900 text-emerald-300'
                              : 'bg-rose-950 text-rose-300'
                          }`}>
                            {((selectedConnective === 'AND' && r.p && r.q) ||
                            (selectedConnective === 'OR' && (r.p || r.q)) ||
                            (selectedConnective === 'IMP' && (!r.p || r.q)) ||
                            (selectedConnective === 'BIC' && r.p === r.q)) ? '✓ ACTIVATED' : '✗ IDLE'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Challenge Top Bar */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono font-bold text-slate-400">
                CHALLENGE {currentChallenge + 1} OF {filteredChallenges.length}
              </span>
              <motion.span
                key={difficulty}
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase ${
                  difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' :
                  difficulty === 'standard' ? 'bg-gold-950 text-gold-400 border border-gold-800' :
                  'bg-rose-950 text-rose-400 border border-rose-800'
                }`}
              >
                {difficulty}
              </motion.span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-400 uppercase font-mono">
                NEP: {challenge.competencyLevel}
              </span>
            </div>

            <span className="text-xs text-gold-400 font-mono">
              Score: {scoreBreakdown.correct} / {scoreBreakdown.total}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden" role="progressbar" aria-valuenow={(currentChallenge + 1)} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-purple-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Challenge Card */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-3xl border transition-all ${
              wrongFlash ? 'bg-rose-950/40 border-rose-600' : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white mb-4 leading-relaxed">{challenge.question}</p>

            {/* MCQ Type */}
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
                    disabled={showExplanation || answerRevealed}
                    aria-label={`Select Option ${String.fromCharCode(65 + i)}: ${opt}`}
                    className={`w-full text-left p-4 rounded-2xl text-sm font-medium transition-all border ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : wrongFlash
                        ? 'bg-rose-950/60 border-rose-600 text-rose-200'
                        : 'bg-slate-950/80 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-gold-500'
                    }`}
                  >
                    <span className="inline-block w-6 font-mono text-xs text-gold-400 font-bold">{String.fromCharCode(65 + i)}.</span>
                    {opt}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Type */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-2xl border border-slate-800">
                  {challenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      role="button"
                      aria-label={`Draggable connective label: ${item.label}`}
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-gold-600 text-white text-xs font-bold rounded-xl cursor-grab active:cursor-grabbing shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {[
                    { id: 'slot_and', symbol: '∧ (AND)' },
                    { id: 'slot_or', symbol: '∨ (OR)' },
                    { id: 'slot_not', symbol: '~ (NOT)' },
                    { id: 'slot_imp', symbol: '→ (IF-THEN)' },
                  ].map(target => (
                    <div
                      key={target.id}
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      aria-label={`Drop target for ${target.symbol}`}
                      className="p-4 bg-slate-950 rounded-2xl border-2 border-dashed border-slate-800 flex flex-col items-center justify-center min-h-[90px]"
                    >
                      <span className="text-xs font-mono font-bold text-slate-500 mb-1">{target.symbol}</span>
                      <span className={`text-xs font-bold ${droppedLabels[target.id] ? 'text-emerald-400' : 'text-slate-600'}`}>
                        {droppedLabels[target.id] ? `✓ ${droppedLabels[target.id]}` : '[Drop Label Here]'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  aria-label="Verify dragged connective label mappings"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Target Mappings
                </motion.button>
              </div>
            )}

            {/* Drag-Sort Type */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                {(sortArrangement.length === challenge.sortItems.length
                  ? sortArrangement.map(idx => challenge.sortItems![idx])
                  : challenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    role="button"
                    aria-label={`Sort item ${dIdx + 1}: ${item}`}
                    onDragStart={() => handleDragStart(String(dIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const fromIdx = parseInt(draggedItem || '0');
                      handleSortMove(fromIdx, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 cursor-grab flex items-center gap-3"
                  >
                    <span className="w-6 h-6 rounded-lg bg-gold-950 border border-gold-700 text-gold-300 font-mono font-bold flex items-center justify-center text-[10px]">
                      {dIdx + 1}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  aria-label="Verify sequence order of logical steps"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Sequence Order
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {challenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label={`Enter numerical value in ${challenge.unit || 'units'}`}
                    className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-gold-500 w-48"
                  />
                  <span className="text-xs font-mono text-slate-400">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation}
                    aria-label="Submit numeric answer"
                    className="px-5 py-3 bg-gold-600 text-white rounded-xl text-xs font-bold"
                  >
                    Check
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400 font-mono">{challenge.validationHint}</p>

                {/* Available Part Chips */}
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, idx) => (
                    <motion.button
                      key={idx}
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.92 }}
                      onClick={() => handleAddConstructPart(part)}
                      aria-label={`Add token ${part} to formula`}
                      className="px-3 py-1.5 bg-gold-950 border border-gold-700 text-gold-300 rounded-xl font-mono text-xs font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                {/* Assembled Parts Container */}
                <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 min-h-[70px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-gold-600 text-white rounded-xl font-mono text-xs flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button
                        onClick={() => handleRemoveConstructPart(idx)}
                        aria-label={`Remove token ${part}`}
                        className="text-rose-300 hover:text-white text-xs"
                      >
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 font-mono">[Click tokens above to construct formula]</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleConstructSubmit}
                  disabled={constructParts.length === 0 || showExplanation}
                  aria-label="Verify assembled formula"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Constructed Formula
                </motion.button>
              </div>
            )}

            {/* Step-by-Step Progressive Explanation */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gold-950/40 border border-gold-700/60 rounded-2xl space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">
                    ICSE Step-by-Step Proof & Walkthrough:
                  </span>
                </div>

                <div className="space-y-2">
                  {challenge.explanation.split('. ').filter(s => s.trim().length > 0).slice(0, revealedSteps + 1).map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs text-slate-200 leading-relaxed font-sans"
                    >
                      <span className="font-bold text-gold-400 font-mono">Step {idx + 1}:</span> {sentence}{!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-2">
                  {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => setRevealedSteps(s => s + 1)}
                      aria-label="Reveal next explanation step"
                      className="px-4 py-1.5 bg-gold-800 text-white rounded-xl text-xs font-bold"
                    >
                      Reveal Next Step →
                    </motion.button>
                  ) : (
                    <div />
                  )}

                  {revealedSteps >= challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      aria-label="Proceed to next challenge or completion"
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Mission Assessment →' : 'Proceed to Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── COMPLETION PHASE WITH MOTIVATIONAL FEEDBACK & REFLECTION ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          {/* Personalized Motivational Feedback Card */}
          <div className="p-8 bg-gradient-to-br from-gold-950/80 via-slate-900 to-slate-900 rounded-3xl border border-gold-700/60 text-center space-y-4">
            <span className="text-4xl" role="img" aria-label="Rocket Icon">🚀</span>
            <div className="inline-block px-3 py-1 bg-gold-900/80 text-gold-300 font-mono text-xs font-bold rounded-full border border-gold-700">
              {motivationalMessage.tag}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">{motivationalMessage.title}</h2>
            <p className="text-sm text-gold-200 max-w-lg mx-auto leading-relaxed">
              {motivationalMessage.desc}
            </p>

            <div className="flex items-center justify-center gap-6 pt-2">
              <div className="text-center">
                <span className="block text-2xl font-black text-emerald-400">✓ {Math.max(0, 100 - errors * 4)}%</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Accuracy Rating</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="block text-2xl font-black text-rose-400">✗ {errors}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">Telemetry Faults</span>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div className="text-center">
                <span className="block text-2xl font-black text-gold-400 capitalize">{masteryLevel}</span>
                <span className="text-[10px] text-slate-400 uppercase font-mono">BKT Logic Mastery</span>
              </div>
            </div>
          </div>

          {/* ─── REFLECTION SECTION ─── */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-gold-800/50 space-y-5">
            <div className="flex items-center gap-2">
              <span className="text-lg">💡</span>
              <h3 className="text-base font-bold text-white uppercase tracking-wider">Post-Mission Reflection & Synthesis</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consolidate your mathematical logic mastery by reflecting on the key conceptual breakthroughs from today&apos;s simulation.
            </p>

            <div className="space-y-4">
              {/* Question 1 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gold-300">
                  1. What was the most surprising thing you learned about logical connectives or vacuous truth?
                </label>
                <textarea
                  rows={2}
                  value={reflectionSurprise}
                  onChange={(e) => setReflectionSurprise(e.target.value)}
                  placeholder="e.g. When hypothesis p is False, an implication p → q is always True because no conditional promise was broken..."
                  aria-label="Reflection: What was the most surprising thing you learned?"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500 font-sans"
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gold-300">
                  2. How would you explain the difference between Conjunction (∧) and Disjunction (∨) to a friend?
                </label>
                <textarea
                  rows={2}
                  value={reflectionExplain}
                  onChange={(e) => setReflectionExplain(e.target.value)}
                  placeholder="e.g. Conjunction is like switches in series where BOTH must be ON, while Disjunction is like parallel switches where EITHER ONE turns on the bulb..."
                  aria-label="Reflection: How would you explain this to a friend?"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500 font-sans"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-gold-300">
                  3. Where in real life (e.g. coding, electronics, legal contracts, search engines) might you use this?
                </label>
                <textarea
                  rows={2}
                  value={reflectionRealLife}
                  onChange={(e) => setReflectionRealLife(e.target.value)}
                  placeholder="e.g. In software IF-conditions, database boolean queries (AND/OR), designing aircraft safety interlocks, and legal terms..."
                  aria-label="Reflection: Where in real life might you use this?"
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 placeholder-slate-600 focus:outline-none focus:border-gold-500 font-sans"
                />
              </div>

              <div className="flex justify-end pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setReflectionSubmitted(true);
                    audioManager.play('success');
                    speechManager.speak('Reflections recorded! Excellent metacognition.');
                  }}
                  aria-label="Save and record reflection thoughts"
                  className="px-5 py-2 bg-gold-600 text-white rounded-xl text-xs font-bold shadow"
                >
                  {reflectionSubmitted ? '✓ Reflections Saved' : 'Save Reflection Thoughts'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Misconceptions Remediation Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-6 bg-rose-950/30 rounded-3xl border border-rose-800/50 space-y-3">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">Your Diagnostic Knowledge Profile</span>
              {hitMisconceptions.map((mIdx, i) => {
                const m = misconceptions?.[mIdx];
                if (!m) return null;
                return (
                  <div key={i} className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
                    <p className="text-xs font-bold text-rose-300">✗ {m.misconception}</p>
                    <p className="text-xs text-emerald-300">✓ {m.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-amber-950/30 rounded-2xl border border-amber-800/40 text-xs text-slate-300 flex items-center justify-between">
            <div>
              <span className="font-bold text-amber-300 block">SRS Retention Memory Schedule</span>
              <span>
                Optimal review interval: <strong className="text-white">{errors === 0 ? '7 Days' : errors <= 3 ? '3 Days' : '1 Day'}</strong>.
              </span>
            </div>
            <span className="text-xl" role="img" aria-label="Calendar Icon">📅</span>
          </div>

          {/* Real World Capstone */}
          <div className="p-6 bg-slate-900 rounded-3xl border border-slate-800 space-y-3">
            <h3 className="text-base font-bold text-gold-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-400">{REAL_WORLD_ACTIVITY.description}</p>
            <ul className="space-y-1.5 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <li key={idx} className="text-xs text-slate-300 flex items-start gap-2">
                  <span className="text-gold-400 font-mono font-bold">{idx + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Telemetry Check Complete!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}