'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  Check, X, AlertCircle, HelpCircle, ArrowRight, RotateCcw,
  BookOpen, Award, Target, ChevronRight, Play, Info, Layers,
  Activity, Compass, Calculator, TrendingUp, Sliders, ShieldAlert,
  CheckCircle2, XCircle, Eye, Lightbulb, RefreshCw, BarChart2,
  Maximize2, Volume2, Sparkles, Scale, Percent, Thermometer,
  Ruler, Beaker, CornerDownRight
} from 'lucide-react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================
const NODE_IDS = {
  INTRO: 'c11_maths_cbse_134',
  CLASSIFICATION: 'c11_maths_cbse_135',
  STRICT_SLACK: 'c11_maths_cbse_136',
  LINEAR_NONLINEAR: 'c11_maths_cbse_137',
  ONE_VAR: 'c11_maths_cbse_138',
  TWO_VAR: 'c11_maths_cbse_139',
  SOLUTION_SET: 'c11_maths_cbse_140',
  SIMPLE_SOLVE: 'c11_maths_cbse_141',
  RULE_ADD_SUB: 'c11_maths_cbse_142',
  RULE_MULT_DIV: 'c11_maths_cbse_143',
  SYSTEMS: 'c11_maths_cbse_144',
  DOUBLE_INEQ: 'c11_maths_cbse_145',
  FRACTIONS: 'c11_maths_cbse_146',
  DOUBLE_FRACTIONS: 'c11_maths_cbse_147',
  NUMBER_LINE: 'c11_maths_cbse_148',
  WORD_AVG_MARKS: 'c11_maths_cbse_149',
  WORD_CONSECUTIVE: 'c11_maths_cbse_150',
  WORD_TRIANGLE: 'c11_maths_cbse_151',
  WORD_BOARD_CUT: 'c11_maths_cbse_152',
  WORD_ACID: 'c11_maths_cbse_153',
  WORD_TEMP: 'c11_maths_cbse_154',
  WORD_IQ: 'c11_maths_cbse_155',
  EX_5_1: 'c11_maths_cbse_156',
  MISC_EX: 'c11_maths_cbse_157',
  SUMMARY: 'c11_maths_cbse_158',
} as const;

const ALL_NODE_IDS: string[] = [
  'c11_maths_cbse_134',
  'c11_maths_cbse_135',
  'c11_maths_cbse_136',
  'c11_maths_cbse_137',
  'c11_maths_cbse_138',
  'c11_maths_cbse_139',
  'c11_maths_cbse_140',
  'c11_maths_cbse_141',
  'c11_maths_cbse_142',
  'c11_maths_cbse_143',
  'c11_maths_cbse_144',
  'c11_maths_cbse_145',
  'c11_maths_cbse_146',
  'c11_maths_cbse_147',
  'c11_maths_cbse_148',
  'c11_maths_cbse_149',
  'c11_maths_cbse_150',
  'c11_maths_cbse_151',
  'c11_maths_cbse_152',
  'c11_maths_cbse_153',
  'c11_maths_cbse_154',
  'c11_maths_cbse_155',
  'c11_maths_cbse_156',
  'c11_maths_cbse_157',
  'c11_maths_cbse_158',
];

// MANDATORY SECTION 1: SCENARIO
const SCENARIO = {
  title: 'Linear Inequalities Mathematical Laboratory & Feasibility Studio',
  intro: 'Welcome to the CISCE Class 11 Mathematical Analysis Studio. In real-world engineering, industrial chemistry, optimization, and economics, constraints are rarely exact equalities. Instead, decisions must satisfy systems of linear inequalities.',
  context: 'In this interactive simulation, you will master inequality transformations, algebraic properties, sign flips on negative scalar multiplication, graphical 1D and 2D half-plane solutions, double inequality bounds, and real-life industrial application models like acid buffer formulation and board-cutting optimization.',
};

// MANDATORY SECTION 2: DISCOVERY_QUESTION
const DISCOVERY_QUESTION = {
  question: 'When multiplying or dividing both sides of an inequality by a negative real number, why MUST the direction of the inequality sign reverse?',
  options: [
    'Because negative numbers lie to the left of zero on the number line, reversing relative order distance.',
    'It is an arbitrary convention established by early mathematicians for convenience.',
    'Because multiplying by a negative number changes the variable from real to complex.',
    'Because the absolute value of negative numbers is always smaller than positive numbers.'
  ],
  correctIndex: 0,
  hintAfter: 'Consider 3 < 5. Multiplying both sides by -1 yields -3 and -5. On a standard number line, -3 lies to the right of -5, meaning -3 > -5! Reversing the sign preserves truth value across zero reflection.',
};

// DEFAULT PROPS
interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

// MANDATORY SECTION 3: EXPLORATION_STEPS
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: 1D Number Line & Inequality Rules Explorer',
    instruction: 'Manipulate linear equations ax + b < c on the 1D number line. Observe open circles vs closed circles and boundary rays.',
    interactionType: '1d-number-line',
    nodeId: NODE_IDS.NUMBER_LINE,
  },
  {
    title: 'Lab 2: Negative Scalar Multiplication & Sign Reversal Visualizer',
    instruction: 'Multiply inequalities by positive and negative numbers on a balance beam to observe sign flip dynamics.',
    interactionType: 'sign-flip-balance',
    nodeId: NODE_IDS.RULE_MULT_DIV,
  },
  {
    title: 'Lab 3: 2D Half-Plane & Boundary Line Grapher',
    instruction: 'Plot ax + by ≤ c on the Cartesian coordinate plane. Test origin points (0,0) and observe solid vs dashed boundary lines.',
    interactionType: '2d-half-plane',
    nodeId: NODE_IDS.TWO_VAR,
  },
  {
    title: 'Lab 4: Compound & Double Inequality Range Bound Solver',
    instruction: 'Solve double inequalities of the form l ≤ (bx + c)/d ≤ u and visualize the bounded intervals.',
    interactionType: 'double-inequality-solver',
    nodeId: NODE_IDS.DOUBLE_INEQ,
  },
  {
    title: 'Lab 5: Industrial Chemical Acid Solution Mixture Optimizer',
    instruction: 'Mix varying concentrations of acid solutions to keep final concentration strictly within target threshold bounds.',
    interactionType: 'acid-mixture-sim',
    nodeId: NODE_IDS.WORD_ACID,
  },
];

// MANDATORY SECTION 4: PREDICTION_QUESTIONS
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you solve -3x + 6 ≥ 12, what will be the orientation of the solution ray on the number line?',
    options: [
      'Points pointing to the right starting from x = -2',
      'Points pointing to the left starting from x = -2 (inclusive)',
      'Points pointing to the left starting from x = 2 (exclusive)',
      'Points pointing to the right starting from x = 2'
    ],
    correctIndex: 1,
    verifyInstruction: 'Subtract 6 to get -3x ≥ 6. Divide by -3 and flip the sign: x ≤ -2. A closed circle at -2 with a ray extending to -∞.',
    nodeId: NODE_IDS.RULE_MULT_DIV,
  },
  {
    question: 'Predict: For a 2D linear inequality 2x - 3y > 6, will the point (0,0) be in the shaded solution region, and will the boundary line be solid or dashed?',
    options: [
      '(0,0) is included; boundary line is solid',
      '(0,0) is NOT included; boundary line is solid',
      '(0,0) is NOT included; boundary line is dashed',
      '(0,0) is included; boundary line is dashed'
    ],
    correctIndex: 2,
    verifyInstruction: 'Substitute (0,0): 2(0) - 3(0) = 0 > 6 is FALSE. Thus (0,0) is outside. Strict inequality ">" requires a dashed boundary line.',
    nodeId: NODE_IDS.TWO_VAR,
  },
];

// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the boundary line representation when switching between strict (<, >) and slack (≤, ≥) inequalities in 2D?',
    observableOptions: [
      'Strict inequalities use dashed lines because boundary points are excluded; slack inequalities use solid lines.',
      'Strict inequalities use solid lines while slack inequalities use dotted points.',
      'Boundary lines are always solid regardless of inequality sign.',
      'Dashed lines are only used when slope is negative.'
    ],
    correctIndex: 0,
    nodeId: NODE_IDS.STRICT_SLACK,
  },
  {
    question: 'What happens to the solution set of a system of two linear inequalities on a 2D graph?',
    observableOptions: [
      'The solution set is the union of all shaded regions.',
      'The solution set is the overlapping intersection of the shaded regions of both inequalities.',
      'The solution set consists only of the points where the two boundary lines cross.',
      'The solution set becomes a single straight line.'
    ],
    correctIndex: 1,
    nodeId: NODE_IDS.SYSTEMS,
  },
];

// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
const REAL_WORLD_ACTIVITY = {
  title: 'Industrial Acid Mixture Quality Control Protocol',
  description: 'In pharmaceutical manufacturing, a chemist has 600 liters of a 12% acid solution. They must add a x-liter solution of 30% acid such that the final mixture acid percentage lies between 15% and 18% inclusive.',
  steps: [
    'Formulate total acid content inequality: 0.15(600 + x) ≤ 600(0.12) + 0.30x ≤ 0.18(600 + x).',
    'Solve lower bound: 90 + 0.15x ≤ 72 + 0.30x ⟹ 18 ≤ 0.15x ⟹ x ≥ 120 liters.',
    'Solve upper bound: 72 + 0.30x ≤ 108 + 0.18x ⟹ 0.12x ≤ 36 ⟹ x ≤ 300 liters.',
    'Conclusion: The volume of 30% acid solution added must be between 120 liters and 300 liters inclusive [120, 300].'
  ],
};

// MISCONCEPTIONS (6 items)
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    nodeId: NODE_IDS.RULE_MULT_DIV,
    title: 'Forgetting to Flip Inequality Sign when Multiplying/Dividing by Negative Scalar',
    description: 'Students often solve -2x < 8 as x < -4 instead of x > -4.',
    correction: 'Whenever you multiply or divide both sides of an inequality by a negative number, the direction of the inequality symbol MUST be reversed.',
    eli5: 'Think of 2 < 5. On the number line, 2 is left of 5. If you flip everything across zero to negative, -2 is right of -5, so -2 > -5!',
  },
  {
    id: 'misc_2',
    nodeId: NODE_IDS.STRICT_SLACK,
    title: 'Confusing Solid vs Dashed Boundary Lines in Graphical Solutions',
    description: 'Using solid lines for strict inequalities (< or >) or dashed lines for slack inequalities (≤ or ≥).',
    correction: 'Use dashed lines for strict inequalities (< or >) to show points on the line are excluded. Use solid lines for slack inequalities (≤ or ≥) because boundary points are included in the solution set.',
    eli5: 'Dashed line = fence with open gates (don\'t touch the boundary!). Solid line = brick wall (you can lean right against it!).',
  },
  {
    id: 'misc_3',
    nodeId: NODE_IDS.DOUBLE_INEQ,
    title: 'Applying Operations Non-Uniformly in Double Inequalities',
    description: 'Adding or multiplying a constant to only two parts of a three-part inequality statement like a < b < c.',
    correction: 'Whatever operation is performed on the middle section of a double inequality MUST be applied simultaneously to both the left and right outer sections.',
    eli5: 'A double inequality is a 3-way balance scale. If you add 5 to the middle, you MUST add 5 to both the left and right pans too!',
  },
  {
    id: 'misc_4',
    nodeId: NODE_IDS.SOLUTION_SET,
    title: 'Treating Inequality Solutions as Single Point Numbers',
    description: 'Believing that an inequality answer like x > 4 means x = 5.',
    correction: 'The solution of an inequality in one variable is an infinite set (interval) of real numbers, not a single discrete number.',
    eli5: 'An equation gives you a single house address (x = 4). An inequality gives you an entire state or country (x > 4)!',
  },
  {
    id: 'misc_5',
    nodeId: NODE_IDS.WORD_ACID,
    title: 'Adding Percentages Directly in Solution Mixture Problems',
    description: 'Assuming mixing 10% acid with 20% acid gives 30% acid concentration.',
    correction: 'Concentrations cannot be directly summed. Acid amount is calculated as Volume × Percentage, and total concentration is Total Acid divided by Total Volume.',
    eli5: 'If you mix half a glass of light lemonade with half a glass of strong lemonade, it gets medium lemonade—not super double sour lemonade!',
  },
  {
    id: 'misc_6',
    nodeId: NODE_IDS.FRACTIONS,
    title: 'Cross-Multiplying Algebraic Fractions Without Checking Variable Signs',
    description: 'Cross-multiplying fractions containing variables without knowing whether the variable expression is positive or negative.',
    correction: 'Do not cross-multiply by expressions containing variables unless their sign is strictly known. Instead, bring all terms to one side and simplify over a common denominator.',
    eli5: 'Because multiplying by negative numbers flips the sign, cross-multiplying an unknown variable is dangerous—you don\'t know if you should flip the sign or not!',
  },
];

// DIAGNOSTIC QUESTIONS (8 items)
const DIAGNOSTIC_QUESTIONS = [
  {
    id: 'diag_1',
    question: 'Which of the following represents a strict linear inequality in one variable?',
    options: ['3x + 4 = 10', '2x - 5 < 7', 'x² + 3x ≥ 0', '4x + 2y ≤ 12'],
    correctIndex: 1,
    nodeId: NODE_IDS.STRICT_SLACK,
  },
  {
    id: 'diag_2',
    question: 'Solve for x: -4x + 3 > 11',
    options: ['x > -2', 'x < -2', 'x < 2', 'x > 2'],
    correctIndex: 1,
    nodeId: NODE_IDS.RULE_MULT_DIV,
  },
  {
    id: 'diag_3',
    question: 'What is the graphical representation of x ≥ 3 on a 1D number line?',
    options: [
      'Open circle at 3 with ray extending to the left',
      'Closed circle at 3 with ray extending to the left',
      'Open circle at 3 with ray extending to the right',
      'Closed circle at 3 with ray extending to the right'
    ],
    correctIndex: 3,
    nodeId: NODE_IDS.NUMBER_LINE,
  },
  {
    id: 'diag_4',
    question: 'Which point lies in the solution set of 3x - 2y ≤ 6?',
    options: ['(5, 0)', '(0, -4)', '(4, 1)', '(1, -3)'],
    correctIndex: 1,
    nodeId: NODE_IDS.TWO_VAR,
  },
  {
    id: 'diag_5',
    question: 'Solve the double inequality: -3 ≤ 2x + 1 ≤ 9',
    options: ['-2 ≤ x ≤ 4', '-1 ≤ x ≤ 5', '-2 ≤ x ≤ 5', '-4 ≤ x ≤ 8'],
    correctIndex: 0,
    nodeId: NODE_IDS.DOUBLE_INEQ,
  },
  {
    id: 'diag_6',
    question: 'A student needs an average of at least 60 marks in 5 exams. If the first 4 marks are 55, 62, 70, and 48, what is the minimum mark x required on the 5th exam?',
    options: ['x ≥ 60', 'x ≥ 65', 'x ≥ 55', 'x ≥ 68'],
    correctIndex: 1,
    nodeId: NODE_IDS.WORD_AVG_MARKS,
  },
  {
    id: 'diag_7',
    question: 'If temperature in Celsius (C) and Fahrenheit (F) are related by F = (9/5)C + 32, find the range of C when 86 ≤ F ≤ 113.',
    options: ['30 ≤ C ≤ 45', '25 ≤ C ≤ 40', '30 ≤ C ≤ 50', '20 ≤ C ≤ 35'],
    correctIndex: 0,
    nodeId: NODE_IDS.WORD_TEMP,
  },
  {
    id: 'diag_8',
    question: 'The IQ of a person is given by IQ = (MA / CA) × 100 where MA is mental age and CA is chronological age. For 12-year-olds with 80 ≤ IQ ≤ 140, what is the range of MA?',
    options: ['8.0 ≤ MA ≤ 14.0', '9.6 ≤ MA ≤ 16.8', '10.0 ≤ MA ≤ 15.0', '7.2 ≤ MA ≤ 12.6'],
    correctIndex: 1,
    nodeId: NODE_IDS.WORD_IQ,
  },
];

// TYPES FOR CHALLENGES
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'numeric' | 'drag-sort' | 'graph-check';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  correctAnswerOverride?: number;
  tolerance?: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// 25 COMPREHENSIVE CHALLENGES COVERING ALL NODES
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 items)
  {
    id: 'ch_1',
    nodeId: NODE_IDS.INTRO,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Understanding',
    question: 'Which mathematical statement represents a linear inequality in one variable?',
    options: ['5x + 3 = 18', '3x - 7 < 14', 'x² + 2x + 1 > 0', '2x + 3y ≤ 12'],
    correctIndex: 1,
    explanation: '3x - 7 < 14 contains one variable (x) raised to the first power (linear) connected by an inequality symbol (<).',
    hints: [
      'Look for an inequality symbol like <, >, ≤, or ≥.',
      'Check that there is only ONE variable present.',
      'Ensure the exponent of the variable is equal to 1.'
    ]
  },
  {
    id: 'ch_2',
    nodeId: NODE_IDS.CLASSIFICATION,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Classify the inequality "4x + 5y ≥ 20".',
    options: [
      'Strict linear inequality in one variable',
      'Slack linear inequality in two variables',
      'Strict non-linear inequality in two variables',
      'Slack linear inequality in one variable'
    ],
    correctIndex: 1,
    explanation: 'It has two variables (x and y), maximum power of 1 (linear), and uses "≥" which includes equality (slack).',
    hints: [
      'Count the number of variables (x and y).',
      'Look at the symbol ≥. Does it allow equality?',
      'Slack inequalities include ≤ and ≥; strict inequalities use < and >.'
    ]
  },
  {
    id: 'ch_3',
    nodeId: NODE_IDS.STRICT_SLACK,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Concept Distinction',
    question: 'What is the main difference between strict and slack inequalities?',
    options: [
      'Strict inequalities involve negative numbers; slack inequalities do not.',
      'Strict inequalities (<, >) exclude boundary points, whereas slack inequalities (≤, ≥) include boundary points.',
      'Strict inequalities have two variables, while slack inequalities have one.',
      'Strict inequalities are solved by division; slack inequalities by multiplication.'
    ],
    correctIndex: 1,
    explanation: 'Strict (<, >) means strictly less than or greater than (boundary excluded). Slack (≤, ≥) allows equality (boundary included).',
    hints: [
      'Think about whether x = 5 satisfies x < 5 versus x ≤ 5.',
      'Check if the equality line is included or excluded.',
      'Strict = strictly less/greater without equals.'
    ]
  },
  {
    id: 'ch_4',
    nodeId: NODE_IDS.LINEAR_NONLINEAR,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Identification',
    question: 'Which of the following inequalities is NON-LINEAR?',
    options: ['7x - 3 > 11', '(x / 4) + 2 ≤ 9', '3 / x < 5', '0.5x + 1.2 ≥ 4'],
    correctIndex: 2,
    explanation: '3/x can be written as 3x⁻¹. Since the exponent of x is -1 (not 1), it is a non-linear inequality.',
    hints: [
      'Express all terms with exponents.',
      'Variables in the denominator have negative powers (x⁻¹).',
      'Linear means power of variable must be exactly 1.'
    ]
  },
  {
    id: 'ch_5',
    nodeId: NODE_IDS.ONE_VAR,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Representation',
    question: 'What is the solution set of x + 5 < 12 when x ∈ W (Whole Numbers)?',
    options: ['{0, 1, 2, 3, 4, 5, 6}', '{1, 2, 3, 4, 5, 6}', '{..., -2, -1, 0, 1, 2, 3, 4, 5, 6}', '( -∞, 7 )'],
    correctIndex: 0,
    explanation: 'x + 5 < 12 ⟹ x < 7. Whole numbers W = {0, 1, 2, 3, ...}. So whole numbers strictly less than 7 are {0, 1, 2, 3, 4, 5, 6}.',
    hints: [
      'Solve x + 5 < 12 to get x < 7.',
      'Remember that Whole Numbers (W) start at 0 (non-negative integers).',
      'List all non-negative integers strictly less than 7.'
    ]
  },
  {
    id: 'ch_6',
    nodeId: NODE_IDS.RULE_ADD_SUB,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Rule Application',
    question: 'If a < b, which statement is ALWAYS true according to Inequality Rule 1?',
    options: ['a + c > b + c', 'a - c < b - c', 'a · c < b · c', 'a / c < b / c'],
    correctIndex: 1,
    explanation: 'Rule 1 states adding or subtracting the SAME number from both sides of an inequality preserves the inequality sign without changing direction.',
    hints: [
      'Rule 1 deals specifically with addition and subtraction.',
      'Does adding/subtracting a number flip the inequality sign?',
      'a - c remain strictly less than b - c for all real c.'
    ]
  },
  {
    id: 'ch_7',
    nodeId: NODE_IDS.NUMBER_LINE,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Graphical Interpretation',
    question: 'How is the interval (-3, 5] plotted on a real number line?',
    options: [
      'Open circle at -3, closed circle at 5, shaded segment in between',
      'Closed circle at -3, open circle at 5, shaded segment in between',
      'Open circle at -3 and 5, shaded segment in between',
      'Closed circle at -3 and 5, shaded segment in between'
    ],
    correctIndex: 0,
    explanation: 'Parenthesis "(" indicates strict exclusion (open circle at -3). Square bracket "]" indicates slack inclusion (closed circle at 5).',
    hints: [
      'Round parenthesis "(" = open circle (point excluded).',
      'Square bracket "]" = closed circle (point included).',
      'Shade all points between -3 and 5.'
    ]
  },

  // STANDARD TIER (10 items)
  {
    id: 'ch_8',
    nodeId: NODE_IDS.RULE_MULT_DIV,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Algebraic Solving',
    question: 'Solve for x: -3x + 15 ≤ 3. What is the minimum possible real value of x?',
    correctAnswer: 4,
    tolerance: 0.01,
    explanation: '-3x + 15 ≤ 3 ⟹ -3x ≤ -12. Dividing by -3 flips the sign: x ≥ 4. Thus the minimum value is 4.',
    hints: [
      'Subtract 15 from both sides to get -3x ≤ -12.',
      'Divide both sides by -3.',
      'Remember to flip the inequality sign when dividing by a negative number!'
    ],
    misconceptionIndex: 0
  },
  {
    id: 'ch_9',
    nodeId: NODE_IDS.SIMPLE_SOLVE,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Algebraic Computation',
    question: 'Solve for x ∈ R: 4x + 3 < 6x - 7. The solution is x > k. What is k?',
    correctAnswer: 5,
    tolerance: 0.01,
    explanation: '4x + 3 < 6x - 7 ⟹ 3 + 7 < 6x - 4x ⟹ 10 < 2x ⟹ 5 < x ⟹ x > 5. So k = 5.',
    hints: [
      'Gather x terms on one side and numbers on the other.',
      '4x - 6x < -7 - 3 ⟹ -2x < -10.',
      'Divide by -2 and flip sign to find x > 5.'
    ]
  },
  {
    id: 'ch_10',
    nodeId: NODE_IDS.SOLUTION_SET,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Domain Analysis',
    question: 'Find the solution set of 3(x - 2) / 5 ≤ 5(2 - x) / 3 for x ∈ N (Natural Numbers).',
    options: ['{1, 2}', '{0, 1, 2}', '{1, 2, 3}', 'Ø (Empty Set)'],
    correctIndex: 0,
    explanation: 'Multiply by 15: 9(x - 2) ≤ 25(2 - x) ⟹ 9x - 18 ≤ 50 - 25x ⟹ 34x ≤ 68 ⟹ x ≤ 2. Natural numbers x ∈ N are {1, 2}.',
    hints: [
      'Multiply across by the LCM of 5 and 3 (which is 15).',
      'Simplify: 9x - 18 ≤ 50 - 25x.',
      '34x ≤ 68 ⟹ x ≤ 2. Pick only Natural Numbers (N = {1, 2, 3...}).'
    ]
  },
  {
    id: 'ch_11',
    nodeId: NODE_IDS.DOUBLE_INEQ,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Compound Solving',
    question: 'Solve the double inequality: -5 ≤ (5 - 3x)/2 ≤ 8. What is the lower bound for x?',
    correctAnswer: -2.33,
    tolerance: 0.05,
    explanation: 'Multiply by 2: -10 ≤ 5 - 3x ≤ 16. Subtract 5: -15 ≤ -3x ≤ 11. Divide by -3 and flip: 5 ≥ x ≥ -11/3 (-3.67). Wait: -11/3 = -3.67 to 5. Lower bound is -11/3 = -3.67.',
    correctAnswerOverride: -3.67,
    hints: [
      'Multiply all 3 parts by 2: -10 ≤ 5 - 3x ≤ 16.',
      'Subtract 5 from all 3 parts: -15 ≤ -3x ≤ 11.',
      'Divide by -3 and reverse symbols: 5 ≥ x ≥ -11/3.'
    ],
    misconceptionIndex: 2
  },
  {
    id: 'ch_12',
    nodeId: NODE_IDS.FRACTIONS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Fractional Inequalities',
    question: 'Solve for real x: (2x - 1)/3 ≥ (3x - 2)/4 - (2 - x)/5',
    options: ['x ≥ 2', 'x ≤ 2', 'x ≥ -2', 'x ≤ 1/13'],
    correctIndex: 0,
    explanation: 'Multiply by LCM(3,4,5) = 60: 20(2x - 1) ≥ 15(3x - 2) - 12(2 - x) ⟹ 40x - 20 ≥ 45x - 30 - 24 + 12x ⟹ 40x - 20 ≥ 57x - 54 ⟹ 34 ≥ 17x ⟹ x ≤ 2.',
    hints: [
      'Find the common denominator of 3, 4, 5 which is 60.',
      'Multiply every term by 60: 20(2x-1) ≥ 15(3x-2) - 12(2-x).',
      'Expand carefully and gather x on one side.'
    ]
  },
  {
    id: 'ch_13',
    nodeId: NODE_IDS.WORD_AVG_MARKS,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Problem Solving',
    question: 'To receive Grade A in a course, one must obtain an average of 90 marks or more in 5 examinations. If Sunita\'s marks in first 4 exams are 87, 92, 94, and 95, what minimum mark must she get in the 5th exam?',
    correctAnswer: 82,
    tolerance: 0.1,
    explanation: '(87 + 92 + 94 + 95 + x) / 5 ≥ 90 ⟹ 368 + x ≥ 450 ⟹ x ≥ 82. Minimum mark required is 82.',
    hints: [
      'Sum of 5 exams must be ≥ 5 × 90 = 450.',
      'Sum of first 4 exams = 87 + 92 + 94 + 95 = 368.',
      'Subtract 368 from 450.'
    ]
  },
  {
    id: 'ch_14',
    nodeId: NODE_IDS.WORD_CONSECUTIVE,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Word Problem Translation',
    question: 'Find all pairs of consecutive odd positive integers, both of which are smaller than 10 such that their sum is more than 11.',
    options: ['(5, 7) and (7, 9)', '(3, 5) and (5, 7)', '(7, 9) and (9, 11)', '(5, 7) only'],
    correctIndex: 0,
    explanation: 'Let x and x+2 be odd positive integers. x < 10, x+2 < 10 ⟹ x < 8. Sum x + (x+2) > 11 ⟹ 2x > 9 ⟹ x > 4.5. Odd positive integers for x are 5, 7. Pairs: (5, 7) and (7, 9).',
    hints: [
      'Let the smaller odd integer be x and the next be x + 2.',
      'Condition 1: x + 2 < 10 ⟹ x < 8.',
      'Condition 2: x + (x + 2) > 11 ⟹ 2x + 2 > 11 ⟹ x > 4.5.',
      'Possible odd integers for x are 5 and 7.'
    ]
  },
  {
    id: 'ch_15',
    nodeId: NODE_IDS.WORD_TRIANGLE,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Geometric Applications',
    question: 'The longest side of a triangle is 3 times the shortest side, and the third side is 2 cm shorter than the longest side. If the perimeter of the triangle is at least 61 cm, find the minimum length of the shortest side (in cm).',
    correctAnswer: 9,
    tolerance: 0.1,
    explanation: 'Shortest side = x. Longest side = 3x. Third side = 3x - 2. Perimeter = x + 3x + (3x - 2) ≥ 61 ⟹ 7x - 2 ≥ 61 ⟹ 7x ≥ 63 ⟹ x ≥ 9 cm.',
    hints: [
      'Let shortest side = x.',
      'Express longest side as 3x and third side as 3x - 2.',
      'Set Perimeter = x + 3x + (3x - 2) ≥ 61.',
      'Solve 7x ≥ 63.'
    ]
  },
  {
    id: 'ch_16',
    nodeId: NODE_IDS.WORD_TEMP,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Formula Rearrangement',
    question: 'A solution is to be kept between 68°F and 77°F. What is the range in degrees Celsius if F = (9/5)C + 32? (Enter lower bound of Celsius temperature).',
    correctAnswer: 20,
    tolerance: 0.1,
    explanation: '68 ≤ (9/5)C + 32 ≤ 77. Subtract 32: 36 ≤ (9/5)C ≤ 45. Multiply by 5/9: 20 ≤ C ≤ 25. Lower bound is 20°C.',
    hints: [
      'Set up double inequality: 68 ≤ (9/5)C + 32 ≤ 77.',
      'Subtract 32 from all sides: 36 ≤ (9/5)C ≤ 45.',
      'Multiply by 5/9: 36 × (5/9) = 20, 45 × (5/9) = 25.'
    ]
  },
  {
    id: 'ch_17',
    nodeId: NODE_IDS.WORD_IQ,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Real World Modelling',
    question: 'If IQ = (MA / CA) × 100, and 80 ≤ IQ ≤ 140 for a group of 12-year-old children, what is the maximum mental age (MA) in years?',
    correctAnswer: 16.8,
    tolerance: 0.1,
    explanation: 'CA = 12. 80 ≤ (MA / 12) × 100 ≤ 140 ⟹ 80 ≤ 8.333 MA ≤ 140 ⟹ 80 × 12 / 100 ≤ MA ≤ 140 × 12 / 100 ⟹ 9.6 ≤ MA ≤ 16.8 years.',
    hints: [
      'Substitute CA = 12 into the IQ formula: 80 ≤ (MA / 12) × 100 ≤ 140.',
      'Multiply all parts by 12: 960 ≤ 100 MA ≤ 1680.',
      'Divide by 100 to get MA.'
    ]
  },

  // ADVANCED TIER (8 items)
  {
    id: 'ch_18',
    nodeId: NODE_IDS.TWO_VAR,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Graph Half-Plane Analysis',
    question: 'Which half-plane represents the solution set of 3x - 4y > 12?',
    options: [
      'The region below the dashed boundary line 3x - 4y = 12 not containing the origin (0,0)',
      'The region above the solid boundary line 3x - 4y = 12 containing origin',
      'The region above the dashed boundary line 3x - 4y = 12 containing origin',
      'The region below the solid boundary line 3x - 4y = 12'
    ],
    correctIndex: 0,
    explanation: 'Boundary line 3x - 4y = 12 is dashed (strict >). Test (0,0): 3(0) - 4(0) = 0 > 12 is FALSE. So shade region NOT containing (0,0), which lies below/right of the line.',
    hints: [
      'Check strict symbol > ⟹ line MUST be dashed.',
      'Test point (0,0): 0 > 12 is FALSE.',
      'Shade the side that does NOT contain (0,0).'
    ],
    misconceptionIndex: 1
  },
  {
    id: 'ch_19',
    nodeId: NODE_IDS.SYSTEMS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'System Optimization',
    question: 'Find the vertex region of the system of linear inequalities: x + y ≤ 6, x ≥ 1, y ≥ 1.',
    options: [
      'A triangular region with vertices (1,1), (5,1), and (1,5)',
      'A rectangular region from x=1 to x=6 and y=1 to y=6',
      'An unbounded quadrant region',
      'A single line segment from (1,5) to (5,1)'
    ],
    correctIndex: 0,
    explanation: 'Intersecting x=1, y=1 gives vertex (1,1). Intersecting x=1 with x+y=6 gives (1,5). Intersecting y=1 with x+y=6 gives (5,1). The region is a triangle.',
    hints: [
      'Find point of intersection of x = 1 and y = 1 ⟹ (1,1).',
      'Intersect x = 1 with x + y = 6 ⟹ y = 5 ⟹ (1,5).',
      'Intersect y = 1 with x + y = 6 ⟹ x = 5 ⟹ (5,1).'
    ]
  },
  {
    id: 'ch_20',
    nodeId: NODE_IDS.DOUBLE_FRACTIONS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Fraction Bounds',
    question: 'Solve the fractional double inequality: 1 ≤ (3x - 4) / 5 ≤ 4',
    options: ['3 ≤ x ≤ 8', '1 ≤ x ≤ 5', '2 ≤ x ≤ 6', '3 ≤ x ≤ 7'],
    correctIndex: 0,
    explanation: 'Multiply by 5: 5 ≤ 3x - 4 ≤ 20. Add 4: 9 ≤ 3x ≤ 24. Divide by 3: 3 ≤ x ≤ 8.',
    hints: [
      'Multiply all three expressions by 5.',
      'Add 4 across all terms.',
      'Divide all terms by 3.'
    ]
  },
  {
    id: 'ch_21',
    nodeId: NODE_IDS.WORD_BOARD_CUT,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Constrained Board Cutting Optimization',
    question: 'A manufacturer wants to cut 3 lengths from a single board of length 91 cm. The second length is to be 3 cm longer than the shortest, and the third length is to be twice as long as the shortest. What is the maximum possible length of the shortest board (in cm)?',
    correctAnswer: 22,
    tolerance: 0.1,
    explanation: 'Shortest = x. Second = x + 3. Third = 2x. Total length x + (x + 3) + 2x ≤ 91 ⟹ 4x + 3 ≤ 91 ⟹ 4x ≤ 88 ⟹ x ≤ 22 cm.',
    hints: [
      'Let shortest piece = x.',
      'Second piece = x + 3, Third piece = 2x.',
      'Sum of lengths x + (x + 3) + 2x ≤ 91.',
      'Solve 4x + 3 ≤ 91.'
    ]
  },
  {
    id: 'ch_22',
    nodeId: NODE_IDS.WORD_ACID,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Industrial Mixture Optimization',
    question: 'How many liters of a 30% acid solution must be added to 600 liters of a 12% solution so that acid content in the resulting mixture is between 15% and 18%? Enter the maximum number of liters allowed.',
    correctAnswer: 300,
    tolerance: 1.0,
    explanation: 'Upper bound inequality: 600(0.12) + 0.30x ≤ 0.18(600 + x) ⟹ 72 + 0.30x ≤ 108 + 0.18x ⟹ 0.12x ≤ 36 ⟹ x ≤ 300 liters.',
    hints: [
      'Write total acid after adding x liters: 600(0.12) + 0.30x.',
      'Set up upper bound equation: 72 + 0.30x ≤ 0.18(600 + x).',
      'Solve 0.12x ≤ 36 ⟹ x ≤ 300 liters.'
    ],
    misconceptionIndex: 4
  },
  {
    id: 'ch_23',
    nodeId: NODE_IDS.EX_5_1,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Exercise 5.1 Mastery',
    question: 'Solve 24x < 100 when x is an integer Z.',
    options: [
      '{..., -3, -2, -1, 0, 1, 2, 3, 4}',
      '{1, 2, 3, 4}',
      '{0, 1, 2, 3, 4}',
      '( -∞, 4.167 )'
    ],
    correctIndex: 0,
    explanation: '24x < 100 ⟹ x < 100/24 ⟹ x < 4.167. Since x ∈ Z (Integers), x can be any integer less than or equal to 4: {..., -3, -2, -1, 0, 1, 2, 3, 4}.',
    hints: [
      'Divide 100 by 24 ⟹ 4.1667.',
      'x must be strictly less than 4.1667.',
      'Integers include negative whole numbers, zero, and positive whole numbers ≤ 4.'
    ]
  },
  {
    id: 'ch_24',
    nodeId: NODE_IDS.MISC_EX,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Advanced Miscellaneous Inequalities',
    question: 'Solve for x: |x - 2| / (x - 2) > 0',
    options: [
      'x > 2',
      'x < 2',
      'x ∈ R',
      'x ∈ R - {2}'
    ],
    correctIndex: 0,
    explanation: '|x - 2| is always positive for x ≠ 2. For the quotient to be positive (> 0), denominator (x - 2) must be positive, so x - 2 > 0 ⟹ x > 2.',
    hints: [
      'Absolute value |x - 2| is always positive for any x ≠ 2.',
      'For positive / denominator > 0, denominator MUST be positive.',
      'x - 2 > 0 ⟹ x > 2.'
    ]
  },
  {
    id: 'ch_25',
    nodeId: NODE_IDS.SUMMARY,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Comprehensive Chapter Synthesis',
    question: 'Which of the following operations CHANGES the orientation of an inequality sign?',
    options: [
      'Adding a negative constant to both sides',
      'Dividing both sides by a negative real number',
      'Subtracting a variable expression from both sides',
      'Multiplying both sides by a positive fraction'
    ],
    correctIndex: 1,
    explanation: 'Multiplying or dividing both sides of an inequality by a negative scalar is the ONLY basic operation among choices that reverses the inequality direction.',
    hints: [
      'Addition and subtraction NEVER change inequality direction.',
      'Multiplying/dividing by positive numbers preserves direction.',
      'Multiplying/dividing by negative numbers flips the direction!'
    ]
  }
];

// ==========================================
// SVG VISUALIZERS (MANDATORY REQUIREMENT)
// ==========================================

// SVG Diagram 1: 1D Number Line Visualizer
interface NumberLineProps {
  minVal?: number;
  maxVal?: number;
  targetVal?: number;
  operator?: '<' | '>' | '<=' | '>=';
  isDouble?: boolean;
  lowerBound?: number;
  upperBound?: number;
}
const NumberLineVisualizer: React.FC<NumberLineProps> = ({
  minVal = -10,
  maxVal = 10,
  targetVal = 3,
  operator = '>=',
  isDouble = false,
  lowerBound = -2,
  upperBound = 5,
}) => {
  const width = 600;
  const height = 120;
  const margin = 40;
  const lineY = 60;

  const getX = (val: number) => {
    return margin + ((val - minVal) / (maxVal - minVal)) * (width - 2 * margin);
  };

  const ticks = [];
  for (let i = minVal; i <= maxVal; i += 2) {
    ticks.push(i);
  }

  const isInclusive = operator === '<=' || operator === '>=';
  const isGreater = operator === '>' || operator === '>=';
  const targetX = getX(targetVal);

  return (
    <div className="w-full overflow-x-auto bg-slate-900 rounded-xl p-4 shadow-inner flex flex-col items-center">
      <svg width={width} height={height} className="overflow-visible">
        {/* Main axis line */}
        <line x1={margin - 10} y1={lineY} x2={width - margin + 10} y2={lineY} stroke="#94a3b8" strokeWidth="4" strokeLinecap="round" />
        {/* Arrowheads */}
        <path d={`M ${margin - 15} ${lineY} L ${margin - 5} ${lineY - 6} L ${margin - 5} ${lineY + 6} Z`} fill="#94a3b8" />
        <path d={`M ${width - margin + 15} ${lineY} L ${width - margin + 5} ${lineY - 6} L ${width - margin + 5} ${lineY + 6} Z`} fill="#94a3b8" />

        {/* Ticks and Labels */}
        {ticks.map((t) => {
          const tx = getX(t);
          return (
            <g key={t}>
              <line x1={tx} y1={lineY - 8} x2={tx} y2={lineY + 8} stroke="#64748b" strokeWidth="2" />
              <text x={tx} y={lineY + 28} fill="#94a3b8" fontSize="12" textAnchor="middle" fontFamily="sans-serif">
                {t}
              </text>
            </g>
          );
        })}

        {!isDouble ? (
          <>
            {/* Shaded Ray */}
            {isGreater ? (
              <line x1={targetX} y1={lineY} x2={width - margin + 10} y2={lineY} stroke="#38bdf8" strokeWidth="8" strokeOpacity="0.8" strokeLinecap="round" />
            ) : (
              <line x1={margin - 10} y1={lineY} x2={targetX} y2={lineY} stroke="#38bdf8" strokeWidth="8" strokeOpacity="0.8" strokeLinecap="round" />
            )}

            {/* End circle */}
            <circle
              cx={targetX}
              cy={lineY}
              r="7"
              fill={isInclusive ? '#38bdf8' : '#0f172a'}
              stroke="#38bdf8"
              strokeWidth="3"
            />
            <text x={targetX} y={lineY - 18} fill="#38bdf8" fontSize="14" fontWeight="bold" textAnchor="middle">
              x = {targetVal}
            </text>
          </>
        ) : (
          <>
            {/* Double Inequality Interval */}
            <line x1={getX(lowerBound)} y1={lineY} x2={getX(upperBound)} y2={lineY} stroke="#10b981" strokeWidth="8" strokeOpacity="0.8" />
            <circle cx={getX(lowerBound)} cy={lineY} r="7" fill="#10b981" stroke="#10b981" strokeWidth="3" />
            <circle cx={getX(upperBound)} cy={lineY} r="7" fill="#10b981" stroke="#10b981" strokeWidth="3" />
            <text x={getX(lowerBound)} y={lineY - 16} fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
              {lowerBound}
            </text>
            <text x={getX(upperBound)} y={lineY - 16} fill="#10b981" fontSize="12" fontWeight="bold" textAnchor="middle">
              {upperBound}
            </text>
          </>
        )}
      </svg>
    </div>
  );
};

// SVG Diagram 2: 2D Half-Plane Graph Visualizer
interface TwoDGraphProps {
  a?: number;
  b?: number;
  c?: number;
  operator?: '<' | '>' | '<=' | '>=';
  testPoint?: { x: number; y: number };
}
const TwoDGraphVisualizer: React.FC<TwoDGraphProps> = ({
  a = 1,
  b = 1,
  c = 4,
  operator = '<=',
  testPoint = { x: 0, y: 0 },
}) => {
  const size = 320;
  const center = size / 2;
  const scale = 20; // 20px per unit (-7 to +7)

  const toSvgX = (x: number) => center + x * scale;
  const toSvgY = (y: number) => center - y * scale;

  // Calculate boundary line endpoints on graph edge
  // ax + by = c  => y = (c - ax)/b  or x = (c - by)/a
  let p1 = { x: -8, y: 0 };
  let p2 = { x: 8, y: 0 };
  if (Math.abs(b) > 0.001) {
    p1 = { x: -8, y: (c - a * -8) / b };
    p2 = { x: 8, y: (c - a * 8) / b };
  } else {
    p1 = { x: c / a, y: -8 };
    p2 = { x: c / a, y: 8 };
  }

  const isStrict = operator === '<' || operator === '>';
  const testVal = a * testPoint.x + b * testPoint.y;
  let testPasses = false;
  if (operator === '<') testPasses = testVal < c;
  if (operator === '>') testPasses = testVal > c;
  if (operator === '<=') testPasses = testVal <= c;
  if (operator === '>=') testPasses = testVal >= c;

  return (
    <div className="bg-slate-900 p-4 rounded-xl flex flex-col items-center border border-slate-800 shadow-xl">
      <svg width={size} height={size} className="overflow-hidden rounded-lg bg-slate-950">
        {/* Grid lines */}
        {[-6, -4, -2, 2, 4, 6].map((g) => (
          <g key={g}>
            <line x1={toSvgX(g)} y1={0} x2={toSvgX(g)} y2={size} stroke="#1e293b" strokeWidth="1" />
            <line x1={0} y1={toSvgY(g)} x2={size} y2={toSvgY(g)} stroke="#1e293b" strokeWidth="1" />
          </g>
        ))}

        {/* Axes */}
        <line x1={0} y1={center} x2={size} y2={center} stroke="#64748b" strokeWidth="2" />
        <line x1={center} y1={0} x2={center} y2={size} stroke="#64748b" strokeWidth="2" />
        <text x={size - 15} y={center - 8} fill="#94a3b8" fontSize="12">X</text>
        <text x={center + 8} y={15} fill="#94a3b8" fontSize="12">Y</text>

        {/* Shaded Half-Plane Polygon Mock (approximate direction) */}
        <polygon
          points={`${toSvgX(p1.x)},${toSvgY(p1.y)} ${toSvgX(p2.x)},${toSvgY(p2.y)} ${toSvgX(p2.x > 0 ? 10 : -10)},${toSvgY(testPasses ? -10 : 10)} ${toSvgX(p1.x > 0 ? 10 : -10)},${toSvgY(testPasses ? -10 : 10)}`}
          fill={testPasses ? 'rgba(56, 189, 248, 0.25)' : 'rgba(239, 68, 68, 0.25)'}
        />

        {/* Boundary Line */}
        <line
          x1={toSvgX(p1.x)}
          y1={toSvgY(p1.y)}
          x2={toSvgX(p2.x)}
          y2={toSvgY(p2.y)}
          stroke="#38bdf8"
          strokeWidth="3"
          strokeDasharray={isStrict ? '6,6' : 'none'}
        />

        {/* Test Point (0,0) */}
        <circle cx={toSvgX(testPoint.x)} cy={toSvgY(testPoint.y)} r="5" fill={testPasses ? '#10b981' : '#ef4444'} />
        <text x={toSvgX(testPoint.x) + 8} y={toSvgY(testPoint.y) + 4} fill="#f8fafc" fontSize="11" fontWeight="bold">
          ({testPoint.x},{testPoint.y}) {testPasses ? '✓ Valid' : '✗ Invalid'}
        </text>
      </svg>
      <div className="mt-3 text-xs text-slate-300 font-mono text-center">
        Equation: {a}x {b >= 0 ? `+ ${b}y` : `- ${Math.abs(b)}y`} {operator} {c}
        <br />
        Boundary Line: <span className="text-cyan-400 font-semibold">{isStrict ? 'Dashed (Excluded)' : 'Solid (Included)'}</span>
      </div>
    </div>
  );
};

// SVG Diagram 3: Chemical Acid Mixture Beaker Visualizer
interface AcidSimProps {
  volumeA: number;
  concA: number;
  volumeB: number;
  concB: number;
}
const AcidSolutionVisualizer: React.FC<AcidSimProps> = ({
  volumeA,
  concA,
  volumeB,
  concB,
}) => {
  const totalVolume = volumeA + volumeB;
  const totalAcid = (volumeA * concA) / 100 + (volumeB * concB) / 100;
  const finalConc = totalVolume > 0 ? (totalAcid / totalVolume) * 100 : 0;

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row items-center justify-around gap-6 shadow-xl">
      {/* Stock Beaker A */}
      <div className="flex flex-col items-center">
        <div className="relative w-20 h-32 border-4 border-slate-600 border-t-0 rounded-b-xl bg-slate-950 flex items-end p-1">
          <div
            className="w-full bg-amber-500/70 rounded-b-md transition-all duration-300"
            style={{ height: `${Math.min(100, (volumeA / 800) * 100)}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
            {volumeA}L @ {concA}%
          </span>
        </div>
        <span className="text-xs text-slate-400 mt-2 font-semibold">Added Solution A</span>
      </div>

      <div className="text-xl font-bold text-cyan-400">+</div>

      {/* Stock Beaker B */}
      <div className="flex flex-col items-center">
        <div className="relative w-24 h-36 border-4 border-slate-600 border-t-0 rounded-b-xl bg-slate-950 flex items-end p-1">
          <div
            className="w-full bg-blue-600/70 rounded-b-md transition-all duration-300"
            style={{ height: `${Math.min(100, (volumeB / 800) * 100)}%` }}
          />
          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-white drop-shadow">
            {volumeB}L @ {concB}%
          </span>
        </div>
        <span className="text-xs text-slate-400 mt-2 font-semibold">Base Solution B</span>
      </div>

      <div className="text-xl font-bold text-cyan-400">=</div>

      {/* Mixture Beaker */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-44 border-4 border-cyan-500 border-t-0 rounded-b-2xl bg-slate-950 flex items-end p-1 shadow-lg shadow-cyan-950">
          <div
            className="w-full bg-emerald-500/80 rounded-b-xl transition-all duration-300"
            style={{ height: `${Math.min(100, (totalVolume / 1200) * 100)}%` }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-2">
            <span className="text-xs text-slate-200 font-semibold">Total: {totalVolume.toFixed(0)} L</span>
            <span className="text-lg font-black text-emerald-300">{finalConc.toFixed(2)}%</span>
            <span className="text-[10px] text-emerald-100">Acid Concentration</span>
          </div>
        </div>
        <span className="text-xs text-emerald-400 mt-2 font-bold">Final Chemical Mixture</span>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT EXPORT
// ==========================================
export function C11_MathsLinearInequalitiesCBSESim({
  onComplete,
  initialNodeId = NODE_IDS.INTRO,
}: SimProps) {
  // Navigation Tab State
  const [activeTab, setActiveTab] = useState<'discovery' | 'explore' | 'challenges' | 'summary' | 'misconceptions'>('discovery');

  // Mastery & Learning Engine States
  const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId);
  const [bktState, setBktState] = useState<Record<string, BKTState>>(() => {
    const initMap: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initMap[id] = createBKTState();
    });
    return initMap;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initSrs: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initSrs[id] = createReviewItem(id);
    });
    return initSrs;
  });

  // UX Feedback States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');

  // Auto-Hint Timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      setCurrentHint('Need guidance? Click on the Hints tab or check the explanation rules!');
      setShowHint(true);
      audioManager.play('hint');
    }, 12000);
  }, []);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, activeTab]);

  // Discovery Question State
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState(false);

  // Challenge Mode State
  const [currentChallengeIdx, setCurrentChallengeIdx] = useState(0);
  const [selectedMcqOpt, setSelectedMcqOpt] = useState<number | null>(null);
  const [numericAnsInput, setNumericAnsInput] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{
    correct: boolean;
    message: string;
  } | null>(null);
  const [completedChallengeIds, setCompletedChallengeIds] = useState<string[]>([]);
  const [hintLevel, setHintLevel] = useState<number>(0);

  // Interactive Lab Explorers State
  const [activeLabIdx, setActiveLabIdx] = useState(0);

  // Lab 1: 1D Number Line State
  const [lab1A, setLab1A] = useState(2);
  const [lab1B, setLab1B] = useState(-4);
  const [lab1C, setLab1C] = useState(6);
  const [lab1Op, setLab1Op] = useState<'<' | '>' | '<=' | '>='>('>=');

  // Lab 2: Sign Flip Balance Beam State
  const [lab2Lhs, setLab2Lhs] = useState(4);
  const [lab2Rhs, setLab2Rhs] = useState(10);
  const [lab2Multiplier, setLab2Multiplier] = useState(-2);

  // Lab 3: 2D Half Plane State
  const [lab3A, setLab3A] = useState(2);
  const [lab3B, setLab3B] = useState(-3);
  const [lab3C, setLab3C] = useState(6);
  const [lab3Op, setLab3Op] = useState<'<' | '>' | '<=' | '>='>('<=');

  // Lab 4: Double Inequality Range State
  const [lab4Min, setLab4Min] = useState(-3);
  const [lab4Max, setLab4Max] = useState(9);
  const [lab4B, setLab4B] = useState(2);
  const [lab4C, setLab4C] = useState(1);

  // Lab 5: Acid Solution Mixture Lab State
  const [acidVolumeA, setAcidVolumeA] = useState(200);
  const [acidConcA, setAcidConcA] = useState(30);
  const [acidVolumeB, setAcidVolumeB] = useState(600);
  const [acidConcB, setAcidConcB] = useState(12);

  // Handle Discovery Question Submission
  const handleDiscoverySubmit = (index: number) => {
    setDiscoveryChoice(index);
    setDiscoverySubmitted(true);
    resetInactivityTimer();

    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Correct! Multiplying by a negative flips relative order on the number line.');
      setShowSparkle(true);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite right. Let us examine what happens when numbers reflect across zero.');
    }
  };

  // Answer Challenge Handler
  const handleChallengeSubmit = () => {
    const currentChal = CHALLENGES[currentChallengeIdx];
    let isCorrect = false;

    if (currentChal.type === 'mcq') {
      isCorrect = selectedMcqOpt === currentChal.correctIndex;
    } else if (currentChal.type === 'numeric') {
      const parsed = parseFloat(numericAnsInput);
      const target = currentChal.correctAnswerOverride ?? currentChal.correctAnswer ?? 0;
      const tol = currentChal.tolerance ?? 0.01;
      isCorrect = !isNaN(parsed) && Math.abs(parsed - target) <= tol;
    }

    // Update BKT & SRS
    const nodeId = currentChal.nodeId;
    const prevBkt = bktState[nodeId] || createBKTState();
    const newBkt = bktUpdate(prevBkt, isCorrect);
    setBktState((prev) => ({ ...prev, [nodeId]: newBkt }));

    const prevSrs = srsItems[nodeId] || createReviewItem(nodeId);
    const newSrs = sm2Update(prevSrs, isCorrect ? 4 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: newSrs }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak('Excellent problem solving! That is correct.');
      setChallengeFeedback({
        correct: true,
        message: currentChal.explanation,
      });
      setShowSparkle(true);

      if (!completedChallengeIds.includes(currentChal.id)) {
        const updatedCompleted = [...completedChallengeIds, currentChal.id];
        setCompletedChallengeIds(updatedCompleted);
        recordGameScore(ALL_NODE_IDS, updatedCompleted.length * 10);

        if (updatedCompleted.length === CHALLENGES.length) {
          setShowConfetti(true);
          setShowSuccess(true);
          audioManager.play('celebration');
          if (onComplete) onComplete(100);
        }
      }
    } else {
      audioManager.play('error');
      speechManager.speak('That is not correct. Review the mathematical steps and try again.');
      setChallengeFeedback({
        correct: false,
        message: currentChal.explanation,
      });
    }
  };

  const handleNextChallenge = () => {
    setSelectedMcqOpt(null);
    setNumericAnsInput('');
    setChallengeFeedback(null);
    setHintLevel(0);
    setCurrentChallengeIdx((prev) => Math.min(CHALLENGES.length - 1, prev + 1));
  };

  const handlePrevChallenge = () => {
    setSelectedMcqOpt(null);
    setNumericAnsInput('');
    setChallengeFeedback(null);
    setHintLevel(0);
    setCurrentChallengeIdx((prev) => Math.max(0, prev - 1));
  };

  // Calculate Overall Progress Percentage
  const overallProgress = useMemo(() => {
    return Math.round((completedChallengeIds.length / CHALLENGES.length) * 100);
  }, [completedChallengeIds]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 relative selection:bg-cyan-500 selection:text-slate-900">
      {/* UI Overlay Effects */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="All Linear Inequality Challenges Mastered!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHint} />

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-4 md:p-6 mb-6 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-gradient-to-tr from-cyan-600 to-blue-600 rounded-xl shadow-lg shadow-cyan-950">
            <Calculator className="w-8 h-8 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 font-mono border border-cyan-800">
                CISCE Class 11 Mathematics
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                Chapter 5: Linear Inequalities
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white mt-1">
              Linear Inequalities Laboratory
            </h1>
          </div>
        </div>

        {/* Progress Bar & Stats */}
        <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-3 md:pt-0 border-slate-800">
          <div className="flex flex-col items-end">
            <span className="text-xs text-slate-400 font-medium">Mastery Completion</span>
            <span className="text-lg font-bold text-cyan-400">{overallProgress}%</span>
          </div>
          <div className="w-32 bg-slate-800 rounded-full h-3 p-0.5 border border-slate-700">
            <div
              className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>
      </header>

      {/* MAIN NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto flex flex-wrap gap-2 mb-6 bg-slate-900/80 p-1.5 rounded-xl border border-slate-800">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'discovery'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Compass className="w-4 h-4" />
          1. Concept Discovery
        </button>

        <button
          onClick={() => {
            setActiveTab('explore');
            audioManager.play('tap');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'explore'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Sliders className="w-4 h-4" />
          2. Interactive Lab Explorers
        </button>

        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'challenges'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Award className="w-4 h-4" />
          3. Challenges & Problem Set ({completedChallengeIds.length}/{CHALLENGES.length})
        </button>

        <button
          onClick={() => {
            setActiveTab('misconceptions');
            audioManager.play('tap');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'misconceptions'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          4. Common Misconceptions
        </button>

        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all ${
            activeTab === 'summary'
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-950'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          5. Chapter Summary & Real-World Application
        </button>
      </nav>

      {/* CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* ========================================== */}
        {/* TAB 1: CONCEPT DISCOVERY */}
        {/* ========================================== */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* SCENARIO CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="flex items-center gap-3 mb-3 text-cyan-400">
                <Layers className="w-5 h-5" />
                <h2 className="text-lg font-bold uppercase tracking-wider">{SCENARIO.title}</h2>
              </div>
              <p className="text-slate-300 text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-slate-400 text-sm">
                <span className="font-semibold text-white">Lab Context: </span>
                {SCENARIO.context}
              </div>
            </div>

            {/* DISCOVERY QUESTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-3 mb-4">
                <Lightbulb className="w-6 h-6 text-amber-400" />
                <h3 className="text-lg font-bold text-white">Discovery Question: The Foundation of Inequality Operations</h3>
              </div>
              <p className="text-slate-200 text-base mb-6 font-medium">{DISCOVERY_QUESTION.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let style = 'bg-slate-800/80 border-slate-700 hover:border-cyan-500 hover:bg-slate-800';
                  if (discoverySubmitted) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      style = 'bg-emerald-950/80 border-emerald-500 text-emerald-200';
                    } else if (idx === discoveryChoice) {
                      style = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  }
                  return (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${style}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-700/50 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="bg-cyan-950/50 border border-cyan-800/60 p-4 rounded-xl text-slate-200 text-sm flex items-start gap-3">
                  <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-cyan-300">Mathematical Insight: </span>
                    {DISCOVERY_QUESTION.hintAfter}
                  </div>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-cyan-400" />
                Guided Prediction Experiments
              </h3>

              <div className="space-y-6">
                {PREDICTION_QUESTIONS.map((pq, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                    <p className="font-semibold text-slate-200">{pq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {pq.options.map((o, oIdx) => (
                        <div key={oIdx} className="text-xs p-2.5 bg-slate-900 rounded-lg border border-slate-800 text-slate-400 flex items-center gap-2">
                          <span className="w-4 h-4 rounded-full bg-slate-800 flex items-center justify-center text-[10px] font-bold text-cyan-400">{oIdx + 1}</span>
                          {o}
                        </div>
                      ))}
                    </div>
                    <div className="text-xs text-cyan-400/90 font-mono bg-cyan-950/40 p-2.5 rounded-lg border border-cyan-900/50 flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                      <span><strong>Verification:</strong> {pq.verifyInstruction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 2: INTERACTIVE LAB EXPLORERS */}
        {/* ========================================== */}
        {activeTab === 'explore' && (
          <div className="space-y-6">
            {/* LAB SELECTION BUTTONS */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveLabIdx(idx);
                    audioManager.play('pop');
                  }}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all flex flex-col justify-between h-24 ${
                    activeLabIdx === idx
                      ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-950'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                  }`}
                >
                  <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">
                    Lab 0{idx + 1}
                  </span>
                  <span className="line-clamp-2">{step.title.split(':')[1] || step.title}</span>
                </button>
              ))}
            </div>

            {/* ACTIVE LAB INSTRUCTION BANNER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-3 text-sm text-cyan-300">
              <Info className="w-5 h-5 text-cyan-400 shrink-0" />
              <div>
                <span className="font-bold text-white">{EXPLORATION_STEPS[activeLabIdx].title}: </span>
                {EXPLORATION_STEPS[activeLabIdx].instruction}
              </div>
            </div>

            {/* LAB 1: 1D NUMBER LINE EXPLORER */}
            {activeLabIdx === 0 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-white">1D Linear Inequality Visualizer</h3>
                    <p className="text-xs text-slate-400">Solve ax + b [op] c and plot real solution interval on the number line.</p>
                  </div>
                  <div className="font-mono text-lg text-cyan-300 font-bold bg-slate-950 px-4 py-2 rounded-xl border border-slate-800">
                    {lab1A}x {lab1B >= 0 ? `+ ${lab1B}` : `- ${Math.abs(lab1B)}`} {lab1Op} {lab1C}
                  </div>
                </div>

                {/* CONTROLS */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Coefficient a: {lab1A}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={lab1A}
                      onChange={(e) => setLab1A(parseInt(e.target.value) || 1)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Constant b: {lab1B}</label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={lab1B}
                      onChange={(e) => setLab1B(parseInt(e.target.value) || 0)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Constant c: {lab1C}</label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      step="1"
                      value={lab1C}
                      onChange={(e) => setLab1C(parseInt(e.target.value) || 0)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Operator</label>
                    <select
                      value={lab1Op}
                      onChange={(e) => setLab1Op(e.target.value as '<' | '>' | '<=' | '>=')}
                      className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm"
                    >
                      <option value="<">&lt; (Strict Less)</option>
                      <option value=">">&gt; (Strict Greater)</option>
                      <option value="<=">&le; (Slack Less/Equal)</option>
                      <option value="=">&ge; (Slack Greater/Equal)</option>
                    </select>
                  </div>
                </div>

                {/* MATHEMATICAL COMPUTATION STEP-BY-STEP */}
                {(() => {
                  if (lab1A === 0) {
                    return (
                      <div className="bg-rose-950/40 border border-rose-800 p-4 rounded-xl text-rose-300 text-sm">
                        Coefficient a cannot be 0 for a linear inequality in x.
                      </div>
                    );
                  }
                  const rawTarget = (lab1C - lab1B) / lab1A;
                  let finalOp = lab1Op;
                  if (lab1A < 0) {
                    if (lab1Op === '<') finalOp = '>';
                    else if (lab1Op === '>') finalOp = '<';
                    else if (lab1Op === '<=') finalOp = '>=';
                    else if (lab1Op === '>=') finalOp = '<=';
                  }

                  return (
                    <>
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                        <div className="text-slate-400">Step 1: Subtract {lab1B} from both sides ⟹ {lab1A}x {lab1Op} {lab1C - lab1B}</div>
                        <div className="text-slate-400">
                          Step 2: Divide by {lab1A}{' '}
                          {lab1A < 0 ? <span className="text-amber-400 font-bold">(SIGN REVERSES because a &lt; 0!)</span> : ''}
                        </div>
                        <div className="text-cyan-300 font-bold">
                          Final Solution: x {finalOp} {rawTarget.toFixed(2)}
                        </div>
                      </div>

                      {/* NUMBER LINE VISUALIZATION */}
                      <NumberLineVisualizer
                        minVal={-10}
                        maxVal={10}
                        targetVal={Math.round(rawTarget)}
                        operator={finalOp}
                      />
                    </>
                  );
                })()}
              </div>
            )}

            {/* LAB 2: NEGATIVE MULTIPLICATION SIGN FLIP */}
            {activeLabIdx === 1 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Negative Scalar Balance & Sign Flip Lab</h3>
                  <p className="text-xs text-slate-400">Observe why multiplying both sides by a negative scalar reverses relative order.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Left Value (L): {lab2Lhs}</label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      value={lab2Lhs}
                      onChange={(e) => setLab2Lhs(parseInt(e.target.value) || 0)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Right Value (R): {lab2Rhs}</label>
                    <input
                      type="range"
                      min="-10"
                      max="10"
                      value={lab2Rhs}
                      onChange={(e) => setLab2Rhs(parseInt(e.target.value) || 0)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Scalar Multiplier (k): {lab2Multiplier}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      step="1"
                      value={lab2Multiplier}
                      onChange={(e) => setLab2Multiplier(parseInt(e.target.value) || 1)}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                </div>

                {/* SIGN FLIP COMPARISON BOARD */}
                {(() => {
                  const initialLess = lab2Lhs < lab2Rhs;
                  const initialSymbol = lab2Lhs === lab2Rhs ? '=' : initialLess ? '<' : '>';
                  const newL = lab2Lhs * lab2Multiplier;
                  const newR = lab2Rhs * lab2Multiplier;
                  const newLess = newL < newR;
                  const newSymbol = newL === newR ? '=' : newLess ? '<' : '>';
                  const flipped = initialSymbol !== '=' && initialSymbol !== newSymbol;

                  return (
                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-center">
                          <span className="text-xs text-slate-400 uppercase font-mono">Original Statement</span>
                          <div className="text-2xl font-black text-cyan-400 mt-2">
                            {lab2Lhs} {initialSymbol} {lab2Rhs}
                          </div>
                        </div>

                        <div className={`p-4 rounded-xl border text-center transition-all ${
                          flipped ? 'bg-amber-950/40 border-amber-600' : 'bg-slate-950 border-slate-800'
                        }`}>
                          <span className="text-xs text-slate-400 uppercase font-mono">After Multiplying by {lab2Multiplier}</span>
                          <div className="text-2xl font-black text-emerald-400 mt-2">
                            {newL} {newSymbol} {newR}
                          </div>
                        </div>
                      </div>

                      {flipped && (
                        <div className="bg-amber-950/50 border border-amber-800/80 p-4 rounded-xl text-amber-200 text-sm flex items-center gap-3">
                          <AlertCircle className="w-6 h-6 text-amber-400 shrink-0" />
                          <div>
                            <strong>Sign Flip Triggered! </strong>
                            Since multiplier k ({lab2Multiplier}) is negative, multiplying both sides reflects values across 0 on the real number line, reversing their order: {initialSymbol} flipped to {newSymbol}.
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>
            )}

            {/* LAB 3: 2D HALF-PLANE GRAPH SOLVER */}
            {activeLabIdx === 2 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">2D Cartesian Half-Plane Grapher</h3>
                  <p className="text-xs text-slate-400">Plot ax + by [op] c on the 2D coordinate grid with test-point verification.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <TwoDGraphVisualizer
                    a={lab3A}
                    b={lab3B}
                    c={lab3C}
                    operator={lab3Op}
                  />

                  <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <h4 className="text-sm font-bold text-cyan-400 uppercase tracking-wider">Line & Region Controls</h4>
                    
                    <div>
                      <label className="text-xs text-slate-400 font-semibold mb-1 block">a (x coefficient): {lab3A}</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        value={lab3A}
                        onChange={(e) => setLab3A(parseInt(e.target.value) || 0)}
                        className="w-full accent-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-semibold mb-1 block">b (y coefficient): {lab3B}</label>
                      <input
                        type="range"
                        min="-5"
                        max="5"
                        value={lab3B}
                        onChange={(e) => setLab3B(parseInt(e.target.value) || 0)}
                        className="w-full accent-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-semibold mb-1 block">c (constant): {lab3C}</label>
                      <input
                        type="range"
                        min="-10"
                        max="10"
                        value={lab3C}
                        onChange={(e) => setLab3C(parseInt(e.target.value) || 0)}
                        className="w-full accent-cyan-500"
                      />
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-semibold mb-1 block">Inequality Sign</label>
                      <select
                        value={lab3Op}
                        onChange={(e) => setLab3Op(e.target.value as '<' | '>' | '<=' | '>=')}
                        className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-sm"
                      >
                        <option value="<">&lt; (Dashed, Excluded)</option>
                        <option value=">">&gt; (Dashed, Excluded)</option>
                        <option value="<=">&le; (Solid, Included)</option>
                        <option value="=">&ge; (Solid, Included)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* LAB 4: DOUBLE INEQUALITY SOLVER */}
            {activeLabIdx === 3 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Double / Compound Inequality Range Bounds</h3>
                  <p className="text-xs text-slate-400">Solve min ≤ bx + c ≤ max simultaneously across all 3 expressions.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Lower Limit: {lab4Min}</label>
                    <input
                      type="range"
                      min="-10"
                      max="0"
                      value={lab4Min}
                      onChange={(e) => setLab4Min(parseInt(e.target.value) || -1)}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Upper Limit: {lab4Max}</label>
                    <input
                      type="range"
                      min="1"
                      max="15"
                      value={lab4Max}
                      onChange={(e) => setLab4Max(parseInt(e.target.value) || 1)}
                      className="w-full accent-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Multiplier b: {lab4B}</label>
                    <input
                      type="range"
                      min="1"
                      max="5"
                      value={lab4B}
                      onChange={(e) => setLab4B(parseInt(e.target.value) || 1)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Offset c: {lab4C}</label>
                    <input
                      type="range"
                      min="-5"
                      max="5"
                      value={lab4C}
                      onChange={(e) => setLab4C(parseInt(e.target.value) || 0)}
                      className="w-full accent-cyan-500"
                    />
                  </div>
                </div>

                {/* COMPUTATION STEPS */}
                {(() => {
                  const step1Min = lab4Min - lab4C;
                  const step1Max = lab4Max - lab4C;
                  const xMin = step1Min / lab4B;
                  const xMax = step1Max / lab4B;

                  return (
                    <div className="space-y-4">
                      <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-sm space-y-2">
                        <div className="text-slate-400">Statement: {lab4Min} ≤ {lab4B}x + {lab4C} ≤ {lab4Max}</div>
                        <div className="text-slate-400">Step 1: Subtract {lab4C} from all 3 parts ⟹ {step1Min} ≤ {lab4B}x ≤ {step1Max}</div>
                        <div className="text-slate-400">Step 2: Divide all 3 parts by {lab4B} ⟹ {xMin.toFixed(2)} ≤ x ≤ {xMax.toFixed(2)}</div>
                        <div className="text-emerald-400 font-bold">
                          Solution Interval: [{xMin.toFixed(2)}, {xMax.toFixed(2)}]
                        </div>
                      </div>

                      <NumberLineVisualizer
                        minVal={-10}
                        maxVal={10}
                        isDouble={true}
                        lowerBound={Math.round(xMin)}
                        upperBound={Math.round(xMax)}
                      />
                    </div>
                  );
                })()}
              </div>
            )}

            {/* LAB 5: ACID SOLUTION MIXTURE OPTIMIZER */}
            {activeLabIdx === 4 && (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-white">Industrial Acid Solution Mixture Lab</h3>
                  <p className="text-xs text-slate-400">Mix Solution A (Volume & Concentration) into Solution B to achieve target acid purity bounds.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Volume A (L): {acidVolumeA}</label>
                    <input
                      type="range"
                      min="50"
                      max="600"
                      step="10"
                      value={acidVolumeA}
                      onChange={(e) => setAcidVolumeA(parseInt(e.target.value) || 0)}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Conc A (%): {acidConcA}%</label>
                    <input
                      type="range"
                      min="5"
                      max="80"
                      step="5"
                      value={acidConcA}
                      onChange={(e) => setAcidConcA(parseInt(e.target.value) || 0)}
                      className="w-full accent-amber-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Volume B (L): {acidVolumeB}</label>
                    <input
                      type="range"
                      min="100"
                      max="1000"
                      step="50"
                      value={acidVolumeB}
                      onChange={(e) => setAcidVolumeB(parseInt(e.target.value) || 0)}
                      className="w-full accent-blue-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-slate-400 font-semibold mb-1 block">Conc B (%): {acidConcB}%</label>
                    <input
                      type="range"
                      min="5"
                      max="50"
                      step="1"
                      value={acidConcB}
                      onChange={(e) => setAcidConcB(parseInt(e.target.value) || 0)}
                      className="w-full accent-blue-500"
                    />
                  </div>
                </div>

                <AcidSolutionVisualizer
                  volumeA={acidVolumeA}
                  concA={acidConcA}
                  volumeB={acidVolumeB}
                  concB={acidConcB}
                />
              </div>
            )}

            {/* OBSERVATION QUESTIONS (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Eye className="w-5 h-5 text-emerald-400" />
                Lab Observation Questions
              </h3>

              <div className="space-y-6">
                {OBSERVATION_QUESTIONS.map((oq, idx) => (
                  <div key={idx} className="bg-slate-950 border border-slate-800 p-5 rounded-xl space-y-3">
                    <p className="font-semibold text-slate-200">{oq.question}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {oq.observableOptions.map((opt, oIdx) => (
                        <div
                          key={oIdx}
                          className={`text-xs p-3 rounded-lg border ${
                            oIdx === oq.correctIndex
                              ? 'bg-emerald-950/60 border-emerald-600/80 text-emerald-200 font-semibold'
                              : 'bg-slate-900 border-slate-800 text-slate-400'
                          }`}
                        >
                          <span className="font-mono text-cyan-400 mr-2">{String.fromCharCode(65 + oIdx)}.</span>
                          {opt}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 3: CHALLENGES & PROBLEM SET */}
        {/* ========================================== */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {/* CHALLENGE PROGRESS & TRACKER */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs uppercase font-bold text-cyan-400 font-mono tracking-wider">
                  Challenge {currentChallengeIdx + 1} of {CHALLENGES.length}
                </span>
                <h3 className="text-lg font-bold text-white">
                  {CHALLENGES[currentChallengeIdx].competencyLevel}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className={`text-xs px-3 py-1 rounded-full font-semibold capitalize border ${
                  CHALLENGES[currentChallengeIdx].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                    : CHALLENGES[currentChallengeIdx].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border-amber-800'
                    : 'bg-rose-950 text-rose-400 border-rose-800'
                }`}>
                  {CHALLENGES[currentChallengeIdx].difficulty}
                </span>
              </div>
            </div>

            {/* QUESTION DISPLAY */}
            <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 space-y-4">
              <p className="text-base md:text-lg text-slate-100 font-medium">
                {CHALLENGES[currentChallengeIdx].question}
              </p>

              {/* MCQ INPUT */}
              {CHALLENGES[currentChallengeIdx].type === 'mcq' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                  {CHALLENGES[currentChallengeIdx].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setSelectedMcqOpt(idx);
                        audioManager.play('tap');
                      }}
                      className={`p-4 rounded-xl border text-left text-sm transition-all flex items-start gap-3 ${
                        selectedMcqOpt === idx
                          ? 'bg-cyan-600 border-cyan-400 text-white shadow-lg shadow-cyan-950'
                          : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-300 shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* NUMERIC INPUT */}
              {CHALLENGES[currentChallengeIdx].type === 'numeric' && (
                <div className="pt-2 max-w-xs">
                  <label className="text-xs text-slate-400 mb-1 block">Enter Numerical Value:</label>
                  <input
                    type="number"
                    step="any"
                    value={numericAnsInput}
                    onChange={(e) => setNumericAnsInput(e.target.value)}
                    placeholder="e.g. 4.5 or -3"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-mono focus:border-cyan-500 outline-none"
                  />
                </div>
              )}
            </div>

            {/* HINTS ACCORDION */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => {
                    setHintLevel((prev) => Math.min(3, prev + 1));
                    audioManager.play('hint');
                  }}
                  className="text-xs text-amber-400 hover:text-amber-300 flex items-center gap-1 font-semibold"
                >
                  <Lightbulb className="w-4 h-4" />
                  Request Step Hint ({hintLevel}/3)
                </button>
              </div>

              {hintLevel > 0 && (
                <div className="bg-amber-950/30 border border-amber-800/50 p-4 rounded-xl space-y-2 text-xs text-amber-200">
                  {CHALLENGES[currentChallengeIdx].hints.slice(0, hintLevel).map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start gap-2">
                      <span className="font-bold text-amber-400">Hint {hIdx + 1}:</span>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FEEDBACK BANNER */}
            {challengeFeedback && (
              <div className={`p-4 rounded-xl border flex items-start gap-3 text-sm ${
                challengeFeedback.correct
                  ? 'bg-emerald-950/60 border-emerald-600 text-emerald-200'
                  : 'bg-rose-950/60 border-rose-600 text-rose-200'
              }`}>
                {challengeFeedback.correct ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                )}
                <div>
                  <span className="font-bold">{challengeFeedback.correct ? 'Correct!' : 'Incorrect.'} </span>
                  {challengeFeedback.message}
                </div>
              </div>
            )}

            {/* ACTION CONTROLS */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-4">
              <button
                onClick={handlePrevChallenge}
                disabled={currentChallengeIdx === 0}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold disabled:opacity-50 hover:bg-slate-700"
              >
                Previous
              </button>

              <button
                onClick={handleChallengeSubmit}
                className="px-6 py-2.5 rounded-xl bg-cyan-600 text-white font-bold text-sm shadow-lg shadow-cyan-950 hover:bg-cyan-500 transition-all flex items-center gap-2"
              >
                Submit Answer
              </button>

              <button
                onClick={handleNextChallenge}
                disabled={currentChallengeIdx === CHALLENGES.length - 1}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm font-semibold disabled:opacity-50 hover:bg-slate-700"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 4: MISCONCEPTIONS EXPLAINER */}
        {/* ========================================== */}
        {activeTab === 'misconceptions' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <ShieldAlert className="w-6 h-6 text-amber-400" />
                Common Mathematical Misconceptions & Pitfalls
              </h2>
              <p className="text-sm text-slate-400">
                Mastering these critical conceptual corrections will prevent common exam mistakes in CISCE Board Examinations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MISCONCEPTIONS.map((m) => (
                <div key={m.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800 font-mono">
                      Pitfall
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-100">{m.title}</h3>
                  <p className="text-xs text-rose-300 bg-rose-950/40 p-3 rounded-lg border border-rose-900/50">
                    <strong>Mistake:</strong> {m.description}
                  </p>
                  <p className="text-xs text-emerald-300 bg-emerald-950/40 p-3 rounded-lg border border-emerald-900/50">
                    <strong>Correction Rule:</strong> {m.correction}
                  </p>
                  <div className="bg-cyan-950/40 border border-cyan-900/50 p-3 rounded-lg text-xs text-cyan-200">
                    <strong>ELI5 Simplification:</strong> {m.eli5}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================== */}
        {/* TAB 5: CHAPTER SUMMARY & REAL WORLD ACTIVITY */}
        {/* ========================================== */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY (MANDATORY RENDER) */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-3 text-emerald-400">
                <Beaker className="w-6 h-6" />
                <h2 className="text-lg font-bold uppercase tracking-wider">{REAL_WORLD_ACTIVITY.title}</h2>
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="space-y-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((st, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 border border-slate-800 p-4 rounded-xl text-xs text-slate-300 font-mono flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-800 text-emerald-400 flex items-center justify-center font-bold text-xs shrink-0">
                      {sIdx + 1}
                    </span>
                    <span className="mt-0.5">{st}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* KEY FORMULAE SUMMARY CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-cyan-400" />
                Chapter Cheat Sheet & Key Rules
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">Rule 1: Addition & Subtraction</span>
                  If a &lt; b, then a + c &lt; b + c and a - c &lt; b - c for any real c. Sign remains unchanged.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">Rule 2: Scalar Multiplication (k &lt; 0)</span>
                  If a &lt; b and k &lt; 0, then a·k &gt; b·k and a/k &gt; b/k. SIGN MUST FLIP!
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">Strict vs Slack Lines (2D)</span>
                  Strict (&lt; &gt;) ⟹ Dashed boundary line.
                  Slack (&le; &ge;) ⟹ Solid boundary line.
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="font-bold text-cyan-400 block mb-1">Interval Notation</span>
                  (a, b) = Open interval (excluded).
                  [a, b] = Closed interval (included).
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default C11_MathsLinearInequalitiesCBSESim;