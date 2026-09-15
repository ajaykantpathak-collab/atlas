'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NAMED NODE CONSTANTS ───
const NODE_C10_MATH_061 = 'c10_math_061';
const NODE_C10_MATH_062 = 'c10_math_062';
const NODE_C10_MATH_063 = 'c10_math_063';
const NODE_C10_MATH_064 = 'c10_math_064';
const NODE_C10_MATH_065 = 'c10_math_065';
const NODE_C10_MATH_066 = 'c10_math_066';
const NODE_C10_MATH_067 = 'c10_math_067';
const NODE_C10_MATH_068 = 'c10_math_068';
const NODE_C10_MATH_069 = 'c10_math_069';
const NODE_C10_MATH_070 = 'c10_math_070';

const ALL_NODE_IDS = [
  NODE_C10_MATH_061,
  NODE_C10_MATH_062,
  NODE_C10_MATH_063,
  NODE_C10_MATH_064,
  NODE_C10_MATH_065,
  NODE_C10_MATH_066,
  NODE_C10_MATH_067,
  NODE_C10_MATH_068,
  NODE_C10_MATH_069,
  NODE_C10_MATH_070,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Architect of the Grand Vedic Observatory & Silo Dome',
  intro: 'You are the Chief Geometrician for the construction of a high-tech observatory dome and composite grain storage silo in Gujarat. You must lay out precise tangent laser lines, circumscribe hexagonal solar towers, and calculate exact material areas and volumes to ensure structural stability without wasting costly titanium-coated sheets.',
  context: 'Precision is paramount in CISCE board geometry: tangents require auxiliary Thales semi-circles, circumcenters demand perpendicular side bisectors, and 3D solids conserve volume during melting and recasting while hiding joined interior faces.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you stand at an external point P (10 cm from the centre of a circle of radius 6 cm) and shoot two tangent laser beams to touch the circle at T₁ and T₂, what is the exact length of each tangent segment PT?',
  options: [
    '6.0 cm (equal to the radius)',
    '8.0 cm (via Pythagorean theorem √(10² - 6²))',
    '10.0 cm (equal to the distance from centre)',
    '11.66 cm (via √(10² + 6²))',
  ],
  correctIndex: 1,
  hintAfter: 'Because the radius to the point of contact is perpendicular to the tangent (∠OTP = 90°), ΔOPT forms a right triangle with hypotenuse OP = 10 cm and leg OT = 6 cm!',
};

// ─── INTERACTION & EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Auxiliary Circle Tangent Method',
    instruction: 'Drag the external point distance slider (OP) and observe how the auxiliary circle centered at midpoint M automatically determines the tangent points T₁ and T₂ where ∠OT₁P = 90°.',
    interactionType: 'slider-tangent',
    nodeId: NODE_C10_MATH_061,
  },
  {
    title: 'Triangle Incircle vs Circumcircle',
    instruction: 'Switch between "Circumcentre" (side perpendicular bisectors) and "Incentre" (angle bisectors) to see how circumcentre can exit obtuse triangles while incentre stays locked inside.',
    interactionType: 'toggle-triangle-circles',
    nodeId: NODE_C10_MATH_062,
  },
  {
    title: 'Regular Hexagon Symmetries',
    instruction: 'Adjust the side length s. Watch how Circumradius R = s and Inradius r = (√3/2)s, sharing the exact same central point due to 6-fold symmetry.',
    interactionType: 'slider-hexagon',
    nodeId: NODE_C10_MATH_063,
  },
  {
    title: 'Cylinder & Cone Slant Dynamics',
    instruction: 'Adjust height h and radius r. Observe how cone slant height l = √(r² + h²) directly controls Curved Surface Area (πrl) while Volume is strictly 1/3 of the cylinder (1/3 πr²h).',
    interactionType: 'slider-cone-cylinder',
    nodeId: NODE_C10_MATH_066,
  },
  {
    title: 'Combination of Solids & Hidden Joints',
    instruction: 'Combine a cylinder body with a conical tent top and hemispherical base. Watch how internal contact discs are subtracted from Surface Area but Volumes remain purely additive.',
    interactionType: 'combo-solids-builder',
    nodeId: NODE_C10_MATH_070,
  },
];

// ─── PREDICT-THEN-CHECK QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you melt a solid cylinder of radius 6 cm and height 10 cm into a narrower cylinder of radius 4 cm, what will happen to the height?',
    options: [
      'Height decreases to 6.67 cm',
      'Height remains exactly 10 cm',
      'Height increases to 22.5 cm to conserve total volume',
      'Height doubles to 20 cm',
    ],
    correctIndex: 2,
    verifyInstruction: 'Conservation of volume dictates π(6)²(10) = π(4)²(h₂), hence 360π = 16π h₂ -> h₂ = 22.5 cm!',
    nodeId: NODE_C10_MATH_065,
  },
  {
    question: 'Predict: When a solid hemisphere is formed by slicing a sphere of radius r in half, why is its Total Surface Area 3πr² and not 2πr²?',
    options: [
      'Because cutting in half doubles the curved surface',
      'Because cutting exposes a brand-new flat circular cross-section of area πr²',
      'Because the curved dome area increases to 2.5πr²',
      'It is an approximation for non-spherical domes',
    ],
    correctIndex: 1,
    verifyInstruction: 'The total surface area equals the curved dome (2πr²) PLUS the newly exposed base disc (πr²) = 3πr²!',
    nodeId: NODE_C10_MATH_068,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the triangle circumcentre as you drag vertex A to make the top angle obtuse (>90°)?',
    observableOptions: [
      'The circumcentre stays fixed at the centroid',
      'The circumcentre moves outside the triangle boundary',
      'The circumcentre collapses to the origin',
      'The inradius becomes equal to the circumradius',
    ],
    correctIndex: 1,
    nodeId: NODE_C10_MATH_062,
  },
  {
    question: 'In the combination tent (cone atop cylinder), what happens to the shared circular boundary between them?',
    observableOptions: [
      'It is painted twice on both inside and outside',
      'It is included in both individual volumes and surface areas',
      'It is internal and excluded from outer surface area, but fully included in volume calculation',
      'It cancels out the volume of the cone',
    ],
    correctIndex: 2,
    nodeId: NODE_C10_MATH_070,
  },
];

// ─── REAL WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Engineering an Indian Space Silo & Radar Station',
  description: 'Design a weather-proof telemetry silo consisting of a cylindrical concrete base (radius 7 m, height 12 m) capped with a conical radar radome (slant height 25 m). Calculate the titanium cladding area and the pressurized internal volume.',
  steps: [
    '1. Calculate vertical radome height: h = √(25² - 7²) = 24 m.',
    '2. Compute outer cladding area = 2πrh (cylinder) + πrl (cone) = 2π(7)(12) + π(7)(25) = 168π + 175π = 343π ≈ 1,078 m².',
    '3. Compute internal capacity = πr²h_cyl + 1/3 πr²h_cone = π(49)(12) + 1/3 π(49)(24) = 588π + 392π = 980π ≈ 3,080 m³.',
    '4. Verify that the joined circular contact interface (πr² = 154 m²) is omitted from outer cladding.',
  ],
};

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

// ─── 22 CHALLENGES ACROSS 3 TIERS & 10 NODES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_math_01',
    nodeId: NODE_C10_MATH_061,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'In constructing tangents from an external point P to a circle with centre O, what geometric theorem guarantees that angle OT₁P = 90°?',
    options: [
      'Angle in a semicircle is a right angle (Thales theorem)',
      'Alternate segment theorem',
      'Angles subtended by the same arc are equal',
      'Pythagorean converse only',
    ],
    correctIndex: 0,
    explanation: 'The auxiliary circle is drawn with diameter OP. Because T₁ lies on this auxiliary circle, angle OT₁P is inscribed in a semicircle and is exactly 90°, proving PT₁ is perpendicular to radius OT₁.',
    hints: [
      'Think about the circle whose diameter is the line segment OP.',
      'What is the angle subtended by a diameter at any point on its circumference?',
      'An angle inscribed in a semicircle is always 90°.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_math_02',
    nodeId: NODE_C10_MATH_062,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Which construction correctly locates the circumcentre of a triangle versus its incentre?',
    options: [
      'Circumcentre = perpendicular bisectors of sides; Incentre = internal angle bisectors',
      'Circumcentre = angle bisectors; Incentre = side medians',
      'Circumcentre = altitudes; Incentre = perpendicular bisectors',
      'Circumcentre = medians; Incentre = angle bisectors',
    ],
    correctIndex: 0,
    explanation: 'The circumcentre is the intersection of perpendicular bisectors of the sides (equidistant from vertices), while the incentre is the intersection of angle bisectors (equidistant from sides).',
    hints: [
      'Circumcircle passes through the 3 vertices. Which line is equidistant from two vertices?',
      'Incircle touches the 3 sides. Which line is equidistant from two rays/sides?',
      'Sides bisected -> Circumcentre. Angles bisected -> Incentre.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_03',
    nodeId: NODE_C10_MATH_063,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'For a regular hexagon of side length s, what are its circumradius R and inradius (apothem) r?',
    options: [
      'R = s, and r = (√3 / 2)s',
      'R = 2s, and r = s / 2',
      'R = (√3 / 2)s, and r = s',
      'R = s√2, and r = s / √2',
    ],
    correctIndex: 0,
    explanation: 'A regular hexagon is composed of 6 congruent equilateral triangles of side s. The circumradius R = s, and the inradius r is the altitude of one equilateral triangle: (��3/2)s.',
    hints: [
      'Connect the 6 vertices of a regular hexagon to its centre. What kind of triangles are formed?',
      'The 6 central triangles have side lengths equal to the circumradius and an angle of 360°/6 = 60°.',
      'An equilateral triangle of side s has height (√3/2)s.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_math_04',
    nodeId: NODE_C10_MATH_064,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each solid mensuration component to its correct algebraic formula.',
    dragItems: [
      { label: '2πrh', targetId: 'target_cyl_csa' },
      { label: '2πr(r + h)', targetId: 'target_cyl_tsa' },
      { label: 'πrl', targetId: 'target_cone_csa' },
      { label: '4πr²', targetId: 'target_sphere_sa' },
    ],
    correctMapping: {
      target_cyl_csa: '2πrh',
      target_cyl_tsa: '2πr(r + h)',
      target_cone_csa: 'πrl',
      target_sphere_sa: '4πr²',
    },
    explanation: 'Cylinder curved area is 2πrh; closed cylinder is 2πr(r+h); cone curved area is πrl (with slant height l); sphere area is 4πr².',
    hints: [
      'Unrolling a cylinder lateral surface gives a rectangle of length 2πr and width h.',
      'Adding two circular bases πr² gives 2πrh + 2πr² = 2πr(r+h).',
      'A cone curved sector area is πrl, and a sphere has total continuous area 4πr².',
    ],
  },
  {
    id: 'ch_math_05',
    nodeId: NODE_C10_MATH_068,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A metallic ball has radius r = 7 cm. Using π = 22/7, calculate its total surface area in cm².',
    correctAnswer: 616,
    tolerance: 1,
    unit: 'cm²',
    explanation: 'SA = 4πr² = 4 × (22/7) × 7² = 4 × 22 × 7 = 616 cm².',
    hints: [
      'Use the formula SA = 4πr².',
      'Substitute r = 7: SA = 4 × (22/7) × 49.',
      '4 × 22 × 7 = 616 cm².',
    ],
  },
  {
    id: 'ch_math_06',
    nodeId: NODE_C10_MATH_061,
    type: 'drag-sort',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Arrange the sequence of steps to construct tangents from an external point P to circle (O, r).',
    sortItems: [
      'Join OP and construct its perpendicular bisector to find midpoint M',
      'With centre M and radius MO, draw the auxiliary circle',
      'Mark intersection points T₁ and T₂ with the given circle',
      'Draw straight lines PT₁ and PT₂ to complete the tangents',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: '1. Join OP & find midpoint M. 2. Draw auxiliary circle (M, MO). 3. Mark intersections T₁, T₂. 4. Draw rays PT₁ and PT₂.',
    hints: [
      'First locate the midpoint of OP by drawing intersecting arcs.',
      'Next use that midpoint as the centre of the helper circle.',
      'The helper circle cuts the original circle at the contact points.',
    ],
  },
  {
    id: 'ch_math_07',
    nodeId: NODE_C10_MATH_061,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'From an external point P located 13 cm from the centre of a circle of radius 5 cm, tangents PT₁ and PT₂ are drawn. Calculate the length of tangent PT₁ in cm.',
    correctAnswer: 12,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'In right-angled ΔOT₁P, OP = 13 cm (hypotenuse) and OT₁ = 5 cm. By Pythagoras: PT₁ = √(13² - 5²) = √(169 - 25) = √144 = 12 cm.',
    hints: [
      'The radius to tangent is perpendicular, making ΔOPT₁ right-angled at T₁.',
      'OP is the hypotenuse: OP² = OT₁² + PT₁².',
      'PT₁ = √(169 - 25) = √144 = 12 cm.',
    ],
  },
  {
    id: 'ch_math_08',
    nodeId: NODE_C10_MATH_064,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A closed cylindrical storage tank has base diameter 2.8 m and height 5 m. Taking π = 22/7, find the total cost of painting its entire outer surface at ₹25 per m².',
    correctAnswer: 1408,
    tolerance: 5,
    unit: '₹',
    explanation: 'Radius r = 2.8 / 2 = 1.4 m. TSA = 2πr(r + h) = 2 × (22/7) × 1.4 × (1.4 + 5) = 2 × 4.4 × 6.4 = 56.32 m². Cost = 56.32 × ₹25 = ₹1,408.',
    hints: [
      'Do not forget to convert diameter 2.8 m to radius r = 1.4 m!',
      'Closed tank requires Total Surface Area: TSA = 2πr(r + h).',
      'TSA = 56.32 m². Multiply by the rate ₹25/m².',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_09',
    nodeId: NODE_C10_MATH_067,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A conical heap of grain has base radius r = 7 m and slant height l = 25 m. Taking π = 22/7, compute the volume of grain in m³.',
    correctAnswer: 1232,
    tolerance: 2,
    unit: 'm³',
    explanation: 'Vertical height h = √(l² - r²) = √(25² - 7²) = √(625 - 49) = √576 = 24 m. Volume V = 1/3 π r² h = (1/3) × (22/7) × 49 × 24 = (1/3) × 22 × 7 × 24 = 1,232 m³.',
    hints: [
      'First calculate perpendicular height h using h = √(l² - r²).',
      'h = √(625 - 49) = 24 m.',
      'Volume = 1/3 × π × r² × h = (1/3) × (22/7) × 49 × 24 = 1,232 m³.',
    ],
  },
  {
    id: 'ch_math_010',
    nodeId: NODE_C10_MATH_069,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A solid metallic cone of radius 6 cm and height 24 cm is melted and recast into a solid sphere of radius R. What is the value of R?',
    options: ['6 cm', '4 cm', '8 cm', '12 cm'],
    correctIndex: 0,
    explanation: 'Volume of cone = 1/3 π r² h = 1/3 π (36)(24) = 288π. Volume of sphere = 4/3 π R³ = 288π. Thus 4/3 R³ = 288 -> R³ = 288 × 3 / 4 = 216 -> R = ∛216 = 6 cm.',
    hints: [
      'Equate the two volumes: 1/3 π r_cone² h_cone = 4/3 π R_sphere³.',
      'Cancel π and 1/3 from both sides: (6)²(24) = 4 R³ -> 864 = 4 R³.',
      'R³ = 216 -> R = ∛216 = 6 cm.',
    ],
  },
  {
    id: 'ch_math_011',
    nodeId: NODE_C10_MATH_065,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A hollow iron pipe of length h = 100 cm has outer radius R = 5 cm and inner radius r = 4 cm. Taking π = 22/7, find the volume of iron in cm³ (rounded to nearest whole number).',
    correctAnswer: 2829,
    tolerance: 5,
    unit: 'cm³',
    explanation: 'Volume of material V = π h (R² - r²) = (22/7) × 100 × (25 - 16) = (22/7) × 100 × 9 = 19800 / 7 ≈ 2828.57 cm³ ≈ 2829 cm³.',
    hints: [
      'Material volume is the annular area multiplied by length: π h (R² - r²).',
      'R² - r² = 25 - 16 = 9.',
      'V = (22/7) × 100 × 9 = 19800 / 7 ≈ 2828.6 cm³.',
    ],
  },
  {
    id: 'ch_math_012',
    nodeId: NODE_C10_MATH_063,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why do the circumcentre and incentre of a regular hexagon coincide, while for an irregular or scalene triangle they are distinct?',
    options: [
      'Because the regular hexagon possesses 6-fold rotational and reflectional symmetry fixing a single central point',
      'Because all polygons with an even number of sides have identical centres',
      'Because the side length always equals the height of the polygon',
      'Because regular hexagons have no interior diagonals',
    ],
    correctIndex: 0,
    explanation: 'Symmetry requires that any invariant geometric centre (circumcentre or incentre) must be the unique point fixed by all rotations and reflections, which is the geometric centre O.',
    hints: [
      'Think about rotating a regular hexagon by 60° about its centre.',
      'Perpendicular bisectors of sides and angle bisectors are mapped onto each other by symmetry axes.',
      'Symmetry forces all center definitions to coincide at O.',
    ],
  },
  {
    id: 'ch_math_013',
    nodeId: NODE_C10_MATH_070,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A circus tent is cylindrical up to 3 m height with radius 7 m, topped by a cone of slant height 25 m. Taking π = 22/7, find total canvas required for outer curved walls and roof in m².',
    correctAnswer: 682,
    tolerance: 2,
    unit: 'm²',
    explanation: 'Canvas = CSA of cylinder + CSA of cone = 2πrh + πrl = 2(22/7)(7)(3) + (22/7)(7)(25) = 132 + 550 = 682 m². The internal floor joint is excluded.',
    hints: [
      'Curved surface of cylinder = 2πrh = 2 × (22/7) × 7 × 3 = 132 m².',
      'Curved surface of conical roof = πrl = (22/7) × 7 × 25 = 550 m².',
      'Total Canvas = 132 + 550 = 682 m².',
    ],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_math_014',
    nodeId: NODE_C10_MATH_068,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A hemispherical steel bowl of inner radius r = 7 cm is to be tin-plated on its inner curved surface only. Which area formula must be used?',
    options: [
      'CSA = 2πr² (only the inner dome is plated)',
      'TSA = 3πr² (includes circular rim)',
      'SA = 4πr² (entire full sphere)',
      'V = 2/3 πr³ (internal capacity)',
    ],
    correctIndex: 0,
    explanation: 'A bowl is open at the top. Plating "inner curved surface only" means only the hemispherical curved dome is plated, which is CSA = 2πr².',
    hints: [
      'Is the bowl sealed with a lid or open at the top?',
      'The phrase specifies "inner curved surface only".',
      'Half of sphere surface area 4πr² is 2πr².',
    ],
  },
  {
    id: 'ch_math_015',
    nodeId: NODE_C10_MATH_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A solid metallic sphere of radius 6 cm is melted and drawn into a long cylindrical wire of radius 0.2 cm. What is the total length of wire produced in metres (m)? (π cancels)',
    correctAnswer: 72,
    tolerance: 0.5,
    unit: 'm',
    explanation: 'Volume of sphere = 4/3 π (6)³ = 4/3 π (216) = 288π cm³. Wire volume = π (0.2)² h = 0.04π h cm³. Equating: 288π = 0.04π h -> h = 288 / 0.04 = 7200 cm = 72 m.',
    hints: [
      'Equate 4/3 π R³ = π r_wire² h.',
      '4/3 × 216 = 0.04 × h -> 288 = 0.04 h.',
      'h = 7200 cm = 72 metres.',
    ],
  },
  {
    id: 'ch_math_016',
    nodeId: NODE_C10_MATH_064,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A solid closed cylinder of radius r and height h is cut into two equal cylinders by a plane perpendicular to its axis. What is the combined total surface area of BOTH halves?',
    options: [
      '2πr(r + h) + 2πr² = 2πrh + 4πr²',
      '2πr(r + h) (remains unchanged)',
      '4πrh + 2πr²',
      'πrh + πr²',
    ],
    correctIndex: 0,
    explanation: 'Original closed cylinder has TSA = 2πrh + 2πr². The horizontal cut creates TWO new circular flat faces, each of area πr² (total +2πr²). Thus new combined area = 2πrh + 4πr² = 2πr(2r + h).',
    hints: [
      'Cutting exposes two brand-new circular cross sections.',
      'Original TSA had 2 circular lids + 1 lateral wall.',
      'Now there are 4 circular lids + the same lateral wall: 2πrh + 4πr².',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_math_017',
    nodeId: NODE_C10_MATH_070,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Assemble the correct algebraic formula for the Total Volume of a capsule (cylinder of radius r, height h, with hemispherical ends of radius r on both sides).',
    availableParts: ['πr²h', '+', '4/3 πr³', '2/3 πr³', '2πrh', '4πr²'],
    targetState: 'πr²h + 4/3 πr³',
    validationHint: 'Add the cylinder volume to the two hemisphere volumes combined (which make one full sphere).',
    explanation: 'A capsule has a cylindrical center (volume = πr²h) plus two hemispheres at ends (2 × 2/3 πr³ = 4/3 πr³). Total volume = πr²h + 4/3 πr³.',
    hints: [
      'What is the volume of the middle cylindrical barrel?',
      'What is the combined volume of two identical hemispheres of radius r?',
      'Total volume = πr²h + 4/3 πr³.',
    ],
  },
  {
    id: 'ch_math_018',
    nodeId: NODE_C10_MATH_067,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A cone, a hemisphere, and a cylinder stand on equal bases (radius r) and have the same height h = r. What is the exact ratio of their volumes V_cone : V_hemisphere : V_cylinder?',
    options: ['1 : 2 : 3', '1 : 3 : 2', '2 : 3 : 4', '1 : √3 : 2'],
    correctIndex: 0,
    explanation: 'V_cone = 1/3 π r²(r) = 1/3 π r³. V_hemi = 2/3 π r³. V_cyl = π r²(r) = 3/3 π r³. Dividing by 1/3 π r³ yields the classic Archimedean ratio 1 : 2 : 3.',
    hints: [
      'Substitute h = r into each formula.',
      'V_cone = 1/3 π r³, V_hemi = 2/3 π r³, V_cyl = 1 π r³.',
      'Multiply all three by 3 / (π r³) to get integer ratios.',
    ],
  },
  {
    id: 'ch_math_019',
    nodeId: NODE_C10_MATH_062,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'An ICSE student was asked to construct the circumscribed circle on ΔABC. Instead, they bisected angles ∠A and ∠B with a compass and drew a circle tangent to the sides. Evaluate this solution.',
    options: [
      'Incorrect: They constructed the Inscribed Circle (incircle). Circumcircle requires perpendicular bisectors of sides to find vertices circumcentre.',
      'Correct: For all triangles, angle bisectors locate the circumcentre.',
      'Partially correct: They only needed to bisect the third angle ∠C to get the circumcircle.',
      'Incorrect: A protractor must be used instead of compasses for circumcentres.',
    ],
    correctIndex: 0,
    explanation: 'Angle bisectors locate the INCENTRE (centre of incircle tangent to sides). Circumcircle requires PERPENDICULAR BISECTORS of the sides (equidistant from vertices). This is a top-flagged examiner mistake.',
    hints: [
      'What circle is tangent to the inner sides of a triangle?',
      'Which construction lines find points equidistant from vertices?',
      'Perpendicular bisectors find circumcentre; angle bisectors find incentre.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_math_020',
    nodeId: NODE_C10_MATH_069,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A hollow brass shell has outer radius R = 5 cm and inner radius r = 3 cm. Taking π = 22/7, find the volume of brass in cm³ (rounded to 1 decimal place).',
    correctAnswer: 410.7,
    tolerance: 1,
    unit: 'cm³',
    explanation: 'Volume V = 4/3 π (R³ - r³) = 4/3 × (22/7) × (125 - 27) = 4/3 × (22/7) × 98 = 4/3 × 22 × 14 = 1232 / 3 ≈ 410.67 cm³.',
    hints: [
      'Formula: V = 4/3 π (R³ - r³).',
      'R³ - r³ = 125 - 27 = 98.',
      'V = (4 × 22 × 98) / (3 × 7) = 1232 / 3 ≈ 410.7 cm³.',
    ],
  },
  {
    id: 'ch_math_021',
    nodeId: NODE_C10_MATH_070,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A solid wooden toy consists of a cone of height 6 cm mounted on a hemisphere of radius 3 cm. If it is melted/recast into a single solid sphere of radius R, calculate R in cm.',
    correctAnswer: 3,
    tolerance: 0.1,
    unit: 'cm',
    explanation: 'Volume of cone = 1/3 π (3)² (6) = 18π. Volume of hemisphere = 2/3 π (3)³ = 18π. Total Volume = 18π + 18π = 36π. For sphere: 4/3 π R³ = 36π -> R³ = 27 -> R = 3 cm.',
    hints: [
      'Total volume = Cone (1/3 π r² h) + Hemisphere (2/3 π r³).',
      'With h = 6 cm, r = 3 cm: V_cone = 18π, V_hemi = 18π -> Total = 36π.',
      '4/3 π R³ = 36π -> R³ = 27 -> R = 3 cm.',
    ],
  },
  {
    id: 'ch_math_022',
    nodeId: NODE_C10_MATH_063,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'What is the exact ratio of the area of the incircle to the area of the circumcircle of any regular hexagon?',
    options: ['3 : 4', '√3 : 2', '1 : 2', '3 : 2'],
    correctIndex: 0,
    explanation: 'Inradius r = (√3/2)s, Circumradius R = s. Area of incircle = π r² = π (3/4 s²) = 3/4 π s². Area of circumcircle = π R² = π s². Ratio = (3/4 π s²) / (π s²) = 3 : 4.',
    hints: [
      'Area ratio equals the square of the radius ratio: (r / R)².',
      'r / R = [(√3/2)s] / s = √3 / 2.',
      '(√3 / 2)² = 3 / 4.',
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

// ─── DEFAULT PROPS ───
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C10_MATH_061,
  title: 'Circle Tangents, Polygon Constructions & Solid Mensuration',
  definition:
    'Construction of tangents from external points using auxiliary Thales circles; circumscribing and inscribing circles on triangles and regular hexagons; calculation of surface areas and volumes for cylinders, cones, spheres, hemispheres, and compound combinations with conservation of volume.',
  eli5:
    'Use compasses to find right angles inside helper circles, pack triangles and hexagons with perfect round boundaries, and melt, recast, and assemble 3D solids while minding hidden joints.',
  misconceptions: [
    {
      misconception: 'Eyeballing tangent points without drawing the auxiliary Thales circle on OP.',
      correction: 'Tangents require perpendicularity (∠OT₁P = 90°), which is guaranteed only when T₁ lies on the auxiliary circle whose diameter is OP.',
    },
    {
      misconception: 'Bisecting interior angles to find the circumcentre of a triangle.',
      correction: 'Angle bisectors locate the INCENTRE (equidistant from sides). Circumcentre requires PERPENDICULAR BISECTORS of the sides (equidistant from vertices).',
    },
    {
      misconception: 'Assuming circumcentre and incentre are different points in a regular hexagon.',
      correction: 'Due to 6-fold rotational and reflectional symmetry, all symmetry axes intersect at the exact same geometric centre O for a regular hexagon.',
    },
    {
      misconception: 'Using diameter directly as radius in cylinder or cone formulas.',
      correction: 'Always halve the given diameter (r = d/2) before substituting into πr²h or 4πr² to avoid a 4× or 8× calculation error.',
    },
    {
      misconception: 'Adding total surface areas of combined solids without subtracting shared contact faces.',
      correction: 'When solids are joined (e.g. cone atop cylinder), the common boundary is internal and must be omitted from outer exposed surface area.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Why is the auxiliary circle drawn with diameter OP when constructing tangents?',
      options: ['To create a right angle at point of contact via Thales theorem', 'To double the radius of the given circle', 'To find the centroid', 'To bisect angle P'],
      correctIndex: 0,
    },
    {
      question: 'Where does the circumcentre of an obtuse-angled triangle lie?',
      options: ['Inside the triangle', 'On the longest side', 'Outside the triangle', 'At the obtuse vertex'],
      correctIndex: 2,
    },
    {
      question: 'What is the inradius of a regular hexagon of side 6 cm?',
      options: ['3√3 cm (≈ 5.2 cm)', '6 cm', '3 cm', '6√3 cm'],
      correctIndex: 0,
    },
    {
      question: 'If a closed cylinder has radius 7 cm and height 10 cm, what is its TSA?',
      options: ['440 cm²', '748 cm²', '308 cm²', '1540 cm²'],
      correctIndex: 1,
    },
    {
      question: 'What is the ratio of cone volume to cylinder volume with identical base and height?',
      options: ['1 : 2', '1 : 3', '2 : 3', '1 : 4'],
      correctIndex: 1,
    },
    {
      question: 'What is the Total Surface Area of a solid hemisphere of radius r?',
      options: ['2πr²', '3πr²', '4πr²', '2/3 πr³'],
      correctIndex: 1,
    },
    {
      question: 'When a solid sphere is melted and recast into a cylinder, what quantity is strictly conserved?',
      options: ['Total Surface Area', 'Curved Surface Area', 'Volume', 'Radius'],
      correctIndex: 2,
    },
    {
      question: 'In a circus tent (cone atop cylinder), what is the canvas area needed?',
      options: ['2πrh + πrl', '2πr(r+h) + πr(l+r)', '2πrh + πr²', 'πr²h + 1/3 πr²h'],
      correctIndex: 0,
    },
  ],
  masteryCriteria: 'Master ruler-and-compass tangent/polygon constructions and compute 3D solid mensuration with 85%+ accuracy.',
};

// ─── MAIN COMPONENT ───
export default function C10_MathematicsConstructionTangentsCircleSim({
  nodeId = DEFAULT_PROPS.nodeId!,
  title = DEFAULT_PROPS.title!,
  misconceptions = DEFAULT_PROPS.misconceptions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['math'] || { name: 'Mathematics', emoji: '📐', color: 'indigo' };

  // Phase State: discovery -> explore -> sandbox -> challenge -> complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Discovery Hooks State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Interactive Exploration & Sandbox Variables
  const [opDistance, setOpDistance] = useState(13); // cm
  const [circleRadius, setCircleRadius] = useState(5); // cm
  const [triangleType, setTriangleType] = useState<'acute' | 'right' | 'obtuse'>('acute');
  const [triangleCircleMode, setTriangleCircleMode] = useState<'circumcircle' | 'incircle'>('circumcircle');
  const [hexSide, setHexSide] = useState(4); // cm
  const [solidRadius, setSolidRadius] = useState(7); // cm
  const [solidHeight, setSolidHeight] = useState(24); // cm
  const [animSpeed] = useState(1);

  // Predict & Observation states
  const [predictionMade, setPredictionMade] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Drag & drop / Sort / Numeric / Construct states
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Visual feedback animations
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle] = useState(false);
  const [sparklePos] = useState({ x: 0, y: 0 });
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── FILTERED CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter((c) => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter((c) => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── CALCULATED TANGENT VALUES ───
  const tangentCalculations = useMemo(() => {
    const r = circleRadius;
    const d = Math.max(opDistance, r + 0.5);
    const tangentLen = Math.sqrt(Math.max(0, d * d - r * r));
    const angleAlpha = Math.asin(r / d); // half angle at P
    return {
      r,
      d,
      tangentLen: tangentLen.toFixed(2),
      angleDeg: ((angleAlpha * 180) / Math.PI).toFixed(1),
    };
  }, [circleRadius, opDistance]);

  // ─── CALCULATED HEXAGON VALUES ───
  const hexagonCalculations = useMemo(() => {
    const s = hexSide;
    const R = s;
    const r = (Math.sqrt(3) / 2) * s;
    const circumArea = Math.PI * R * R;
    const incircleArea = Math.PI * r * r;
    return {
      s,
      R: R.toFixed(2),
      r: r.toFixed(2),
      circumArea: circumArea.toFixed(2),
      incircleArea: incircleArea.toFixed(2),
      areaRatio: '3 : 4 (75%)',
    };
  }, [hexSide]);

  // ─── CALCULATED SOLID & CONE VALUES ───
  const solidCalculations = useMemo(() => {
    const r = solidRadius;
    const h = solidHeight;
    const slantHeight = Math.sqrt(r * r + h * h);
    const cylCSA = 2 * Math.PI * r * h;
    const cylTSA = 2 * Math.PI * r * (r + h);
    const cylVol = Math.PI * r * r * h;
    const coneCSA = Math.PI * r * slantHeight;
    const coneTSA = Math.PI * r * (r + slantHeight);
    const coneVol = (1 / 3) * Math.PI * r * r * h;
    const sphereSA = 4 * Math.PI * r * r;
    const sphereVol = (4 / 3) * Math.PI * Math.pow(r, 3);
    const hemiTSA = 3 * Math.PI * r * r;
    const hemiVol = (2 / 3) * Math.PI * Math.pow(r, 3);

    return {
      slantHeight: slantHeight.toFixed(2),
      cylCSA: cylCSA.toFixed(1),
      cylTSA: cylTSA.toFixed(1),
      cylVol: cylVol.toFixed(1),
      coneCSA: coneCSA.toFixed(1),
      coneTSA: coneTSA.toFixed(1),
      coneVol: coneVol.toFixed(1),
      sphereSA: sphereSA.toFixed(1),
      sphereVol: sphereVol.toFixed(1),
      hemiTSA: hemiTSA.toFixed(1),
      hemiVol: hemiVol.toFixed(1),
    };
  }, [solidRadius, solidHeight]);

  // ─── LOAD MASTERY ON MOUNT ───
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // ─── BKT ADAPTIVE EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty((prev) => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── 2D CANVAS ANIMATION (Tangent Laser & Dynamic Ray Scanning) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw Grid
      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < w; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += 25) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Centre & Scaling
      const cx = 110;
      const cy = h / 2;
      const scale = 11;
      const rPx = circleRadius * scale;
      const opPx = opDistance * scale;
      const px = cx + opPx;
      const py = cy;

      // Given Circle (O, r)
      ctx.beginPath();
      ctx.arc(cx, cy, rPx, 0, 2 * Math.PI);
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2.5;
      ctx.fillStyle = 'rgba(56, 189, 248, 0.08)';
      ctx.fill();
      ctx.stroke();

      // Centre O
      ctx.beginPath();
      ctx.arc(cx, cy, 4, 0, 2 * Math.PI);
      ctx.fillStyle = '#38bdf8';
      ctx.fill();
      ctx.fillStyle = '#94a3b8';
      ctx.font = '11px sans-serif';
      ctx.fillText('O (Centre)', cx - 25, cy - 10);

      // Line OP
      ctx.beginPath();
      ctx.setLineDash([4, 4]);
      ctx.moveTo(cx, cy);
      ctx.lineTo(px, py);
      ctx.strokeStyle = '#64748b';
      ctx.stroke();
      ctx.setLineDash([]);

      // Point P
      ctx.beginPath();
      ctx.arc(px, py, 5, 0, 2 * Math.PI);
      ctx.fillStyle = '#f59e0b';
      ctx.fill();
      ctx.fillText(`P (OP=${opDistance}cm)`, px + 8, py + 4);

      // Midpoint M
      const mx = (cx + px) / 2;
      const my = cy;
      const auxRPx = opPx / 2;

      // Auxiliary Circle
      ctx.beginPath();
      ctx.arc(mx, my, auxRPx, 0, 2 * Math.PI);
      ctx.strokeStyle = 'rgba(168, 85, 247, 0.45)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.beginPath();
      ctx.arc(mx, my, 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = '#a855f7';
      ctx.fill();
      ctx.fillText('M', mx - 4, my - 8);

      // Calculate exact tangent contact points T1 & T2
      const d = opDistance;
      const r = circleRadius;
      if (d > r) {
        const sinA = r / d;
        const cosA = Math.sqrt(1 - sinA * sinA);
        const tLen = Math.sqrt(d * d - r * r);

        const t1x = cx + r * scale * sinA;
        const t1y = cy - r * scale * cosA;
        const t2x = cx + r * scale * sinA;
        const t2y = cy + r * scale * cosA;

        // Radii OT1 and OT2
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(t1x, t1y);
        ctx.moveTo(cx, cy);
        ctx.lineTo(t2x, t2y);
        ctx.strokeStyle = '#ef4444';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Tangents PT1 and PT2
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(t1x, t1y);
        ctx.moveTo(px, py);
        ctx.lineTo(t2x, t2y);
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 2.5;
        ctx.stroke();

        // Contact points
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(t1x, t1y, 4, 0, 2 * Math.PI);
        ctx.arc(t2x, t2y, 4, 0, 2 * Math.PI);
        ctx.fill();
        ctx.fillText(`T₁ (PT₁=${tLen.toFixed(1)}cm)`, t1x - 30, t1y - 8);
        ctx.fillText(`T₂ (PT₂=${tLen.toFixed(1)}cm)`, t2x - 30, t2y + 16);

        // Perpendicular Right Angle Markers
        const sq = 8;
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.rect(t1x - sq, t1y, sq, sq);
        ctx.stroke();
      }

      // Scanning Laser Beam Animation
      angle += 0.02 * animSpeed;
      const laserX = cx + rPx * Math.cos(angle);
      const laserY = cy + rPx * Math.sin(angle);
      ctx.beginPath();
      ctx.arc(laserX, laserY, 3, 0, 2 * Math.PI);
      ctx.fillStyle = '#38bdf8';
      ctx.shadowColor = '#38bdf8';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [circleRadius, opDistance, animSpeed]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLvl = hintCount + 1;
    if (nextLvl <= 3 && activeChallenge.hints[nextLvl - 1]) {
      setCurrentHint(activeChallenge.hints[nextLvl - 1]);
      setShowHint(true);
      setHintCount(nextLvl);
      audioManager.play('hint');
      speechManager.speak(activeChallenge.hints[nextLvl - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Outstanding geometric intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive construction and mensuration lab. Let us explore each concept step by step.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration mode unlocked. Experiment with tangent distances, polygon shapes, and 3D solids.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Starting challenge mode. Test your knowledge on CISCE Board 2026 competency questions.');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Now inspect the physical simulation to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Accurate scientific observation!' : 'Look closely at the bisectors meeting point.');
  }, []);

  const handleOpSlider = useCallback((val: number) => {
    setOpDistance(val);
    audioManager.play('count');
  }, []);

  const handleRadiusSlider = useCallback((val: number) => {
    setCircleRadius(val);
    audioManager.play('count');
  }, []);

  const handleHexSideSlider = useCallback((val: number) => {
    setHexSide(val);
    audioManager.play('count');
  }, []);

  const handleSolidDimensions = useCallback((r: number, h: number) => {
    setSolidRadius(r);
    setSolidHeight(h);
    audioManager.play('count');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Superb work! You achieved a score of ${finalScore} percent.`);
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
      setCurrentChallenge((c) => c + 1);
      audioManager.play('whoosh');
    }
  }, [currentChallenge, filteredChallenges.length, handleComplete]);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  const handleAnswer = useCallback(
    (answer: number | Record<string, string> | number[] | string) => {
      let isCorrect = false;

      if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
        isCorrect = answer === activeChallenge.correctIndex;
      } else if (activeChallenge.type === 'drag-label') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
      } else if (activeChallenge.type === 'drag-sort') {
        isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
      } else if (activeChallenge.type === 'numeric') {
        const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
        isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0.1);
      } else if (activeChallenge.type === 'construct') {
        isCorrect = (answer as string).trim() === (activeChallenge.targetState || '').trim();
      }

      if (isCorrect) {
        setScoreBreakdown((sb) => ({ correct: sb.correct + 1, total: sb.total + 1 }));
        audioManager.play('drop-correct');
        audioManager.play('success');
        speechManager.speak('Correct! Brilliant deduction.');
        setShowConfetti(true);
        setShowExplanation(true);
        bktStateRef.current = bktUpdate(bktStateRef.current, true);

        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 5, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
        }
      } else {
        audioManager.play('drop-wrong');
        audioManager.play('error');
        setErrors((e) => e + 1);
        setWrongShake(true);
        setWrongFlash(true);
        setTimeout(() => setWrongShake(false), 500);
        setTimeout(() => setWrongFlash(false), 800);

        if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
          setHitMisconceptions((prev) => [...prev, activeChallenge.misconceptionIndex!]);
        }

        if (hintCount < 3) {
          showNextHint();
        } else {
          setAnswerRevealed(true);
          setShowExplanation(true);
          speechManager.speak('Let us study the complete step-by-step ICSE derivation.');
          bktStateRef.current = bktUpdate(bktStateRef.current, false);

          const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
          const updatedSrs = sm2Update(srsItem, 1, 4000);
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem('srs_' + activeChallenge.nodeId, JSON.stringify(updatedSrs));
          }
        }
      }
      resetInactivityTimer();
    },
    [activeChallenge, hintCount, showNextHint, resetInactivityTimer, hitMisconceptions]
  );

  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback(
    (targetId: string) => {
      if (!draggedItem) return;
      const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
      if (isCorrect) {
        setDroppedLabels((prev) => ({ ...prev, [targetId]: draggedItem }));
        audioManager.play('drop-correct');
      } else {
        audioManager.play('drop-wrong');
      }
      setDraggedItem(null);
    },
    [draggedItem, activeChallenge]
  );

  const handleSortMove = useCallback(
    (fromIndex: number, toIndex: number) => {
      audioManager.play('pickup');
      setSortArrangement((prev) => {
        if (prev.length === 0 && activeChallenge.sortItems) {
          prev = activeChallenge.sortItems.map((_, i) => i);
        }
        const arr = [...prev];
        const [moved] = arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, moved);
        return arr;
      });
    },
    [activeChallenge]
  );

  const handleSortSubmit = useCallback(() => {
    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(ans);
  }, [sortArrangement, activeChallenge, handleAnswer]);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((s) => Math.min(EXPLORATION_STEPS.length - 1, s + 1));
    audioManager.play('whoosh');
  }, []);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((s) => Math.max(0, s - 1));
    audioManager.play('whoosh');
  }, []);

  // Inactivity cleanup
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* ─── HEADER BAR ─── */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-indigo-950/80 rounded-2xl border border-indigo-700/50 shadow-inner" aria-hidden="true">{subjectConfig.emoji}</span>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-indigo-400">ICSE Class 10 • Mathematics</span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                : difficulty === 'advanced'
                ? 'bg-rose-950/80 text-rose-300 border-rose-700'
                : 'bg-indigo-950/80 text-indigo-300 border-indigo-700'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <span className="px-3 py-1 bg-slate-900 rounded-full text-xs font-bold text-slate-300 border border-slate-800">
            Mastery: {masteryLevel}
          </span>
        </div>
      </div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-6 space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/60 via-slate-900 to-slate-900 rounded-2xl border border-indigo-800/60 shadow-lg">
            <h2 className="text-lg font-bold text-indigo-300 flex items-center gap-2">
              <span aria-hidden="true">🚀</span> {SCENARIO.title}
            </h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-xs text-indigo-400/80 mt-2 italic bg-indigo-950/40 p-2.5 rounded-xl border border-indigo-900/40">
              💡 {SCENARIO.context}
            </p>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Curiosity Discovery Challenge</span>
            <p className="text-base sm:text-lg font-bold text-white mt-1 mb-4 leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border ${
                    discoveryAnswered
                      ? i === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/90 border-emerald-500 text-emerald-200 shadow-lg shadow-emerald-950'
                        : 'bg-slate-900/50 border-slate-800 text-slate-500 opacity-60'
                      : 'bg-slate-800/80 hover:bg-indigo-950/60 border-slate-700/80 text-slate-200 hover:border-indigo-500'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2">
                      <span className="font-bold text-indigo-400">{String.fromCharCode(65 + i)}.</span>
                      <span>{opt}</span>
                    </div>
                    {discoveryAnswered && (
                      <span className="font-bold text-sm" aria-hidden="true">
                        {i === DISCOVERY_QUESTION.correctIndex ? '✓' : '✗'}
                      </span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-300 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot-on! You recognized the right-angled triangle.' : `ⓘ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    aria-label="Enter interactive laboratory"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-950 flex items-center gap-2"
                  >
                    <span>Enter Interactive Lab</span>
                    <span aria-hidden="true">→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          {/* Step Progress Pills */}
          <div className="flex items-center justify-between gap-2 overflow-x-auto pb-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                aria-label={`Go to Step ${idx + 1}: ${step.title}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentSlide(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                  currentSlide === idx
                    ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-950'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
                }`}
              >
                {idx + 1}. {step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 sm:p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="text-lg font-black text-indigo-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 bg-indigo-950 text-indigo-400 rounded-lg font-mono border border-indigo-900">
                  Step {currentSlide + 1} of {EXPLORATION_STEPS.length}
                </span>
              </div>
              <p className="text-sm text-amber-300/90 bg-amber-950/20 p-3 rounded-xl border border-amber-900/30">
                👉 {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: Tangent Construction Simulator ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
                    <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <canvas ref={canvasRef} width={520} height={260} className="w-full h-auto rounded-lg" aria-label="Geometric diagram showing auxiliary circle tangent construction" />
                    </div>
                    <div className="space-y-3 bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs">
                      <h4 className="font-bold text-white text-sm border-b border-slate-800 pb-2">Live Geometric Parameters</h4>
                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <label htmlFor="slide-op-dist">External Distance OP:</label>
                          <span className="font-mono text-indigo-400 font-bold">{opDistance} cm</span>
                        </div>
                        <input
                          id="slide-op-dist"
                          aria-label="Adjust external distance OP in centimeters"
                          type="range"
                          min={7}
                          max={20}
                          value={opDistance}
                          onChange={(e) => handleOpSlider(Number(e.target.value))}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-400 mb-1">
                          <label htmlFor="slide-circle-rad">Circle Radius r (OT):</label>
                          <span className="font-mono text-sky-400 font-bold">{circleRadius} cm</span>
                        </div>
                        <input
                          id="slide-circle-rad"
                          aria-label="Adjust circle radius in centimeters"
                          type="range"
                          min={3}
                          max={6}
                          value={circleRadius}
                          onChange={(e) => handleRadiusSlider(Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>
                      <div className="p-3 bg-slate-900 rounded-lg space-y-1 font-mono text-slate-300">
                        <p>PT₁ = √(OP² - OT₁²)</p>
                        <p className="text-emerald-400 font-bold">
                          PT₁ = √({opDistance}² - {circleRadius}²) = {tangentCalculations.tangentLen} cm
                        </p>
                        <p className="text-amber-400">∠T₁PO = {tangentCalculations.angleDeg}° (Total ∠T₁PT₂ = {(Number(tangentCalculations.angleDeg) * 2).toFixed(1)}°)</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 1: Triangle Incircle vs Circumcircle ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3 items-center justify-between">
                    <div className="flex gap-2">
                      {(['circumcircle', 'incircle'] as const).map((mode) => (
                        <motion.button
                          key={mode}
                          aria-label={`Select ${mode} mode`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setTriangleCircleMode(mode);
                            audioManager.play('tap');
                          }}
                          className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                            triangleCircleMode === mode
                              ? 'bg-purple-600 text-white border-purple-400 shadow-lg shadow-purple-950'
                              : 'bg-slate-950 text-slate-400 border-slate-800'
                          }`}
                        >
                          {mode} Mode
                        </motion.button>
                      ))}
                    </div>
                    <div className="flex gap-2 text-xs">
                      {(['acute', 'right', 'obtuse'] as const).map((t) => (
                        <button
                          key={t}
                          aria-label={`Select ${t} triangle`}
                          onClick={() => {
                            setTriangleType(t);
                            audioManager.play('pop');
                          }}
                          className={`px-3 py-1.5 rounded-lg font-semibold capitalize border ${
                            triangleType === t ? 'bg-indigo-600 text-white border-indigo-400' : 'bg-slate-800 text-slate-400 border-slate-700'
                          }`}
                        >
                          {t} Δ
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* SVG Triangle Visualizer */}
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                    <svg viewBox="0 0 400 240" className="w-full max-w-lg h-auto" aria-label="Diagram of triangle and its center">
                      {(() => {
                        let ax = 200,
                          ay = 40,
                          bx = 80,
                          by = 190,
                          cx = 320,
                          cy = 190;
                        if (triangleType === 'right') {
                          ax = 80;
                          ay = 40;
                        } else if (triangleType === 'obtuse') {
                          ax = 340;
                          ay = 100;
                        }

                        let ox = 200,
                          oy = 130,
                          R = 95;
                        if (triangleType === 'right') {
                          ox = (ax + cx) / 2;
                          oy = (ay + cy) / 2;
                          R = Math.hypot(cx - ox, cy - oy);
                        } else if (triangleType === 'obtuse') {
                          ox = 180;
                          oy = 230;
                          R = Math.hypot(bx - ox, by - oy);
                        }

                        const ix = (ax + bx + cx) / 3;
                        const iy = (ay + by + cy) / 3 + 10;
                        const inRadius = 38;

                        return (
                          <g>
                            <polygon
                              points={`${ax},${ay} ${bx},${by} ${cx},${cy}`}
                              fill="rgba(99, 102, 241, 0.12)"
                              stroke="#6366f1"
                              strokeWidth="2.5"
                            />
                            <circle cx={ax} cy={ay} r="4" fill="#818cf8" />
                            <circle cx={bx} cy={by} r="4" fill="#818cf8" />
                            <circle cx={cx} cy={cy} r="4" fill="#818cf8" />
                            <text x={ax} y={ay - 8} fill="#c7d2fe" fontSize="11" textAnchor="middle">
                              A
                            </text>
                            <text x={bx - 10} y={by + 4} fill="#c7d2fe" fontSize="11">
                              B
                            </text>
                            <text x={cx + 6} y={cy + 4} fill="#c7d2fe" fontSize="11">
                              C
                            </text>

                            {triangleCircleMode === 'circumcircle' ? (
                              <g>
                                <line x1={bx} y1={by} x2={ox} y2={oy} stroke="#a855f7" strokeDasharray="4 4" strokeWidth="1" />
                                <line x1={cx} y1={cy} x2={ox} y2={oy} stroke="#a855f7" strokeDasharray="4 4" strokeWidth="1" />
                                <line x1={ax} y1={ay} x2={ox} y2={oy} stroke="#a855f7" strokeDasharray="4 4" strokeWidth="1" />
                                <circle cx={ox} cy={oy} r={R} fill="none" stroke="#22c55e" strokeWidth="2" strokeDasharray="6 3" />
                                <circle cx={ox} cy={oy} r="5" fill="#22c55e" />
                                <text x={ox + 8} y={oy + 4} fill="#86efac" fontSize="11" fontWeight="bold">
                                  O (Circumcentre) {triangleType === 'obtuse' ? '[OUTSIDE!]' : ''}
                                </text>
                              </g>
                            ) : (
                              <g>
                                <line x1={ax} y1={ay} x2={ix} y2={iy} stroke="#ec4899" strokeDasharray="3 3" strokeWidth="1" />
                                <line x1={bx} y1={by} x2={ix} y2={iy} stroke="#ec4899" strokeDasharray="3 3" strokeWidth="1" />
                                <line x1={cx} y1={cy} x2={ix} y2={iy} stroke="#ec4899" strokeDasharray="3 3" strokeWidth="1" />
                                <circle cx={ix} cy={iy} r={inRadius} fill="none" stroke="#ec4899" strokeWidth="2.5" />
                                <circle cx={ix} cy={iy} r="4.5" fill="#ec4899" />
                                <text x={ix + 8} y={iy + 4} fill="#f472b6" fontSize="11" fontWeight="bold">
                                  I (Incentre) [ALWAYS INSIDE]
                                </text>
                              </g>
                            )}
                          </g>
                        );
                      })()}
                    </svg>
                  </div>

                  {/* Observation Question inside Slide 1 */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-indigo-900/40">
                    <p className="text-xs font-bold text-indigo-400 mb-2">Observation Question: What happens to the circumcentre in an obtuse triangle?</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                        <button
                          key={i}
                          aria-label={`Observation option ${i + 1}: ${opt}`}
                          onClick={() => handleObservation(i)}
                          className={`p-2.5 text-left rounded-lg border transition-all flex items-center justify-between ${
                            observationAnswered
                              ? i === OBSERVATION_QUESTIONS[0].correctIndex
                                ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                                : 'bg-slate-900 border-slate-800 text-slate-500'
                              : 'bg-slate-900 hover:bg-indigo-950 border-slate-800 text-slate-300'
                          }`}
                        >
                          <span>{opt}</span>
                          {observationAnswered && (
                            <span className="font-bold text-xs ml-2" aria-hidden="true">
                              {i === OBSERVATION_QUESTIONS[0].correctIndex ? '✓' : '✗'}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: Regular Hexagon Symmetries ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 280 260" className="w-full max-w-xs h-auto" aria-label="Regular hexagon with incircle and circumcircle">
                        {(() => {
                          const cx = 140;
                          const cy = 130;
                          const rCircum = hexSide * 24;
                          const rIn = ((Math.sqrt(3) / 2) * hexSide) * 24;

                          const pts: string[] = [];
                          for (let i = 0; i < 6; i++) {
                            const angle = (i * 60 * Math.PI) / 180;
                            const x = cx + rCircum * Math.cos(angle);
                            const y = cy + rCircum * Math.sin(angle);
                            pts.push(`${x},${y}`);
                          }

                          return (
                            <g>
                              <circle cx={cx} cy={cy} r={rCircum} fill="none" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 4" />
                              <circle cx={cx} cy={cy} r={rIn} fill="none" stroke="#ec4899" strokeWidth="1.5" />
                              <polygon points={pts.join(' ')} fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="2.5" />
                              {pts.map((pt, idx) => (
                                <line key={idx} x1={cx} y1={cy} x2={pt.split(',')[0]} y2={pt.split(',')[1]} stroke="#475569" strokeWidth="1" />
                              ))}
                              <circle cx={cx} cy={cy} r="4" fill="#fbbf24" />
                              <text x={cx} y={cy - 8} fill="#fbbf24" fontSize="10" textAnchor="middle">
                                O (Shared Centre)
                              </text>
                            </g>
                          );
                        })()}
                      </svg>
                    </div>

                    <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between text-slate-300">
                        <label htmlFor="slide-hex-side">Side Length s:</label>
                        <span className="font-mono text-indigo-400 font-bold">{hexSide} cm</span>
                      </div>
                      <input
                        id="slide-hex-side"
                        aria-label="Adjust hexagon side length in centimeters"
                        type="range"
                        min={2}
                        max={5}
                        step={0.5}
                        value={hexSide}
                        onChange={(e) => handleHexSideSlider(Number(e.target.value))}
                        className="w-full accent-indigo-500"
                      />
                      <div className="p-3 bg-slate-900 rounded-lg space-y-2 text-slate-300 font-mono">
                        <p>Circumradius R = s = <span className="text-sky-400 font-bold">{hexagonCalculations.R} cm</span></p>
                        <p>Inradius r = (√3/2)s = <span className="text-pink-400 font-bold">{hexagonCalculations.r} cm</span></p>
                        <p>Circumcircle Area = πR² = {hexagonCalculations.circumArea} cm²</p>
                        <p>Incircle Area = πr² = {hexagonCalculations.incircleArea} cm²</p>
                        <p className="text-emerald-400 font-bold">Area Ratio = π(3/4 s²) / πs² = {hexagonCalculations.areaRatio}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: Cone & Cylinder Dynamics ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  {!predictionMade && (
                    <div className="p-4 bg-indigo-950/50 rounded-xl border border-indigo-800">
                      <p className="text-xs font-bold text-amber-300 mb-2">Predict Before You Slide:</p>
                      <p className="text-sm text-white font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <button
                            key={i}
                            aria-label={`Prediction option ${i + 1}: ${opt}`}
                            onClick={() => handlePrediction(i)}
                            className="p-2.5 text-left bg-slate-900 hover:bg-slate-800 rounded-lg border border-slate-700 text-slate-200"
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {predictionMade && (
                    <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs text-emerald-300">
                      ✓ {PREDICTION_QUESTIONS[0].verifyInstruction}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center items-center">
                      <svg viewBox="0 0 260 220" className="w-full max-w-xs h-auto" aria-label="3D Cylinder and inscribed cone illustration">
                        <g>
                          <rect x="50" y="50" width="160" height="130" fill="rgba(56, 189, 248, 0.12)" stroke="#38bdf8" strokeWidth="2" />
                          <ellipse cx="130" cy="50" rx="80" ry="18" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="2" />
                          <ellipse cx="130" cy="180" rx="80" ry="18" fill="rgba(56, 189, 248, 0.25)" stroke="#38bdf8" strokeWidth="2" />

                          <line x1="50" y1="180" x2="130" y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
                          <line x1="210" y1="180" x2="130" y2="50" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />

                          <text x="130" y="42" fill="#38bdf8" fontSize="10" textAnchor="middle">
                            Cylinder Top (r = {solidRadius})
                          </text>
                          <text x="130" y="115" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">
                            Cone Vol = 1/3 Cylinder Vol
                          </text>
                        </g>
                      </svg>
                    </div>

                    <div className="space-y-3 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div>
                        <div className="flex justify-between text-slate-300">
                          <label htmlFor="slide-solid-rad">Radius r:</label>
                          <span className="font-mono text-indigo-400 font-bold">{solidRadius} cm</span>
                        </div>
                        <input
                          id="slide-solid-rad"
                          aria-label="Adjust solid radius in centimeters"
                          type="range"
                          min={3}
                          max={14}
                          value={solidRadius}
                          onChange={(e) => handleSolidDimensions(Number(e.target.value), solidHeight)}
                          className="w-full accent-indigo-500"
                        />
                      </div>
                      <div>
                        <div className="flex justify-between text-slate-300">
                          <label htmlFor="slide-solid-ht">Height h:</label>
                          <span className="font-mono text-sky-400 font-bold">{solidHeight} cm</span>
                        </div>
                        <input
                          id="slide-solid-ht"
                          aria-label="Adjust solid height in centimeters"
                          type="range"
                          min={6}
                          max={30}
                          value={solidHeight}
                          onChange={(e) => handleSolidDimensions(solidRadius, Number(e.target.value))}
                          className="w-full accent-sky-500"
                        />
                      </div>

                      <div className="p-3 bg-slate-900 rounded-lg space-y-1 text-slate-300 font-mono">
                        <p>Slant Height l = √(r² + h²) = <span className="text-amber-400 font-bold">{solidCalculations.slantHeight} cm</span></p>
                        <p>Cylinder Volume = πr²h = <span className="text-sky-400">{solidCalculations.cylVol} cm³</span></p>
                        <p>Cone Volume = 1/3 πr²h = <span className="text-amber-400 font-bold">{solidCalculations.coneVol} cm³</span></p>
                        <p>Cone CSA = πrl = {solidCalculations.coneCSA} cm²</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: Combination of Solids & Hidden Joints ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-center">
                      <svg viewBox="0 0 240 280" className="w-full max-w-xs h-auto" aria-label="Combination solid of cone, cylinder, and hemisphere">
                        <g>
                          <polygon points="120,30 50,110 190,110" fill="rgba(245, 158, 11, 0.2)" stroke="#f59e0b" strokeWidth="2" />
                          <text x="120" y="75" fill="#f59e0b" fontSize="10" textAnchor="middle">
                            Cone Top (CSA: πrl)
                          </text>

                          <ellipse cx="120" cy="110" rx="70" ry="14" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />
                          <text x="120" y="114" fill="#ef4444" fontSize="9" textAnchor="middle" fontWeight="bold">
                            ✕ HIDDEN CONTACT DISC
                          </text>

                          <rect x="50" y="110" width="140" height="90" fill="rgba(56, 189, 248, 0.15)" stroke="#38bdf8" strokeWidth="2" />
                          <text x="120" y="155" fill="#38bdf8" fontSize="10" textAnchor="middle">
                            Cylinder Body (CSA: 2πrh)
                          </text>

                          <ellipse cx="120" cy="200" rx="70" ry="14" fill="none" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />

                          <path d="M 50,200 A 70,70 0 0,0 190,200 Z" fill="rgba(168, 85, 247, 0.2)" stroke="#a855f7" strokeWidth="2" />
                          <text x="120" y="235" fill="#a855f7" fontSize="10" textAnchor="middle">
                            Hemisphere (CSA: 2πr²)
                          </text>
                        </g>
                      </svg>
                    </div>

                    <div className="space-y-2 text-xs bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-300">
                      <h4 className="font-bold text-white text-sm">Combined Mensuration Rule</h4>
                      <p className="p-2.5 bg-slate-900 rounded-lg text-emerald-300 font-mono">
                        ✓ Total Volume = V_cone + V_cyl + V_hemi (Purely Additive!)
                      </p>
                      <p className="p-2.5 bg-slate-900 rounded-lg text-rose-300 font-mono">
                        ✕ Outer Surface Area = CSA_cone + CSA_cyl + CSA_hemi (Shared bases subtracted!)
                      </p>
                      <p className="text-slate-400">
                        In an ICSE circus tent or composite silo, never add 2πr(r+h) and πr(l+r). Always isolate exposed curved lateral walls.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Controls */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                <motion.button
                  aria-label="Go to previous exploration step"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePrevSlide}
                  disabled={currentSlide === 0}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-white rounded-xl text-xs font-bold"
                >
                  ← Previous
                </motion.button>
                <span className="text-xs text-slate-400 font-mono">
                  {currentSlide + 1} / {EXPLORATION_STEPS.length}
                </span>
                {currentSlide < EXPLORATION_STEPS.length - 1 ? (
                  <motion.button
                    aria-label="Go to next exploration step"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextSlide}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Next Step →
                  </motion.button>
                ) : (
                  <motion.button
                    aria-label="Proceed to free sandbox play"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToSandbox}
                    className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-950"
                  >
                    Free Sandbox Play →
                  </motion.button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-6">
          <div className="p-5 bg-slate-900/90 rounded-2xl border border-slate-800 flex flex-wrap justify-between items-center gap-4">
            <div>
              <h2 className="text-lg font-black text-indigo-300">Free Geometry & 3D Mensuration Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">Manipulate all geometric parameters simultaneously with zero grading pressure.</p>
            </div>
            <motion.button
              aria-label="Proceed to competency challenge mode"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-emerald-950"
            >
              Ready for Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* 2D Tangent Interactive Canvas */}
            <div className="lg:col-span-2 bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3">
              <span className="text-xs font-bold text-indigo-400">Live Ruler-and-Compass Scanner</span>
              <canvas ref={canvasRef} width={500} height={250} className="w-full h-auto bg-slate-950 rounded-xl" aria-label="Interactive tangent scanner canvas" />
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label htmlFor="sb-op-dist" className="text-slate-400 block mb-1">Distance OP: {opDistance} cm</label>
                  <input id="sb-op-dist" aria-label="Sandbox distance OP" type="range" min={7} max={20} value={opDistance} onChange={(e) => setOpDistance(Number(e.target.value))} className="w-full accent-indigo-500" />
                </div>
                <div>
                  <label htmlFor="sb-rad" className="text-slate-400 block mb-1">Radius r: {circleRadius} cm</label>
                  <input id="sb-rad" aria-label="Sandbox circle radius" type="range" min={3} max={6} value={circleRadius} onChange={(e) => setCircleRadius(Number(e.target.value))} className="w-full accent-sky-500" />
                </div>
              </div>
            </div>

            {/* Live Solid Calculations Card */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 space-y-3 text-xs">
              <span className="text-xs font-bold text-indigo-400">3D Solid Live Engine</span>
              <div>
                <label htmlFor="sb-solid-rad" className="text-slate-400 block mb-1">Solid Radius r: {solidRadius} cm</label>
                <input id="sb-solid-rad" aria-label="Sandbox solid radius" type="range" min={3} max={14} value={solidRadius} onChange={(e) => setSolidRadius(Number(e.target.value))} className="w-full accent-indigo-500" />
              </div>
              <div>
                <label htmlFor="sb-solid-ht" className="text-slate-400 block mb-1">Solid Height h: {solidHeight} cm</label>
                <input id="sb-solid-ht" aria-label="Sandbox solid height" type="range" min={6} max={30} value={solidHeight} onChange={(e) => setSolidHeight(Number(e.target.value))} className="w-full accent-sky-500" />
              </div>

              <div className="p-3 bg-slate-950 rounded-xl space-y-1.5 font-mono text-slate-300">
                <p className="text-amber-400">Cone Slant: l = {solidCalculations.slantHeight} cm</p>
                <p>Cylinder Vol: {solidCalculations.cylVol} cm³</p>
                <p>Cone Vol: {solidCalculations.coneVol} cm³ (1/3)</p>
                <p>Sphere SA: {solidCalculations.sphereSA} cm²</p>
                <p>Sphere Vol: {solidCalculations.sphereVol} cm³</p>
                <p>Hemisphere TSA: {solidCalculations.hemiTSA} cm² (3πr²)</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 space-y-5">
          {/* Progress Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
                Challenge {currentChallenge + 1} of {filteredChallenges.length}
              </span>
              <h2 className="text-sm font-bold text-white flex items-center gap-2">
                <span>Node: {activeChallenge.nodeId}</span>
                <span className="px-2 py-0.5 bg-slate-800 text-slate-400 rounded text-[10px] font-mono">
                  NEP: {activeChallenge.competencyLevel.toUpperCase()}
                </span>
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Errors: {errors}</span>
              <button
                aria-label={`Get a hint, step ${hintCount} of 3`}
                onClick={showNextHint}
                className="px-3 py-1 bg-amber-950/80 hover:bg-amber-900 text-amber-300 rounded-lg text-xs font-bold border border-amber-700"
              >
                Hint ({hintCount}/3)
              </button>
            </div>
          </div>

          {/* Animated Progress Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-slate-800" role="progressbar" aria-valuenow={currentChallenge + 1} aria-valuemin={1} aria-valuemax={filteredChallenges.length}>
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"
              animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <motion.div
            key={activeChallenge.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 bg-slate-900 rounded-2xl border transition-all ${
              wrongFlash ? 'bg-rose-950/60 border-rose-500 shadow-xl shadow-rose-950' : 'border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-bold text-white leading-relaxed mb-6">{activeChallenge.question}</p>

            {/* MCQ Types */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Option ${String.fromCharCode(65 + i)}: ${opt}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={answerRevealed || showExplanation}
                      className={`text-left p-4 rounded-xl text-sm font-medium transition-all duration-200 border flex items-start justify-between gap-2.5 ${
                        showExplanation
                          ? i === activeChallenge.correctIndex
                            ? 'bg-emerald-950 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-950'
                            : 'bg-slate-950/50 border-slate-900 text-slate-600'
                          : 'bg-slate-950 hover:bg-indigo-950/60 border-slate-800 text-slate-200 hover:border-indigo-600'
                      }`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-indigo-400 font-bold">{String.fromCharCode(65 + i)}.</span>
                        <span>{opt}</span>
                      </div>
                      {showExplanation && (
                        <span className="font-bold text-sm ml-2" aria-hidden="true">
                          {i === activeChallenge.correctIndex ? '✓' : '✗'}
                        </span>
                      )}
                    </motion.button>
                  ))}
                </div>
              )}

            {/* Drag Label Type */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 self-center mr-2">Drag Formulas:</span>
                  {activeChallenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable formula ${item.label}`}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-indigo-700 hover:bg-indigo-600 rounded-lg cursor-grab text-white font-mono text-xs font-bold"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'target_cyl_csa', label: 'Cylinder CSA' },
                    { id: 'target_cyl_tsa', label: 'Closed Cylinder TSA' },
                    { id: 'target_cone_csa', label: 'Cone CSA' },
                    { id: 'target_sphere_sa', label: 'Sphere SA' },
                  ].map((tgt) => (
                    <div
                      key={tgt.id}
                      aria-label={`Drop target for ${tgt.label}`}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(tgt.id)}
                      className="p-4 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 text-center space-y-2 min-h-[90px] flex flex-col justify-center items-center"
                    >
                      <span className="text-xs text-slate-400 font-medium">{tgt.label}</span>
                      <span className="font-mono text-sm text-emerald-400 font-black">
                        {droppedLabels[tgt.id] ? `✓ ${droppedLabels[tgt.id]}` : 'Drop Here'}
                      </span>
                    </div>
                  ))}
                </div>

                <motion.button
                  aria-label="Verify drag and drop labels"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Labels
                </motion.button>
              </div>
            )}

            {/* Drag Sort Type */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag to arrange steps in proper sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === activeChallenge.sortItems.length
                    ? sortArrangement.map((idx) => activeChallenge.sortItems![idx])
                    : activeChallenge.sortItems
                  ).map((item, displayIdx) => (
                    <motion.div
                      key={displayIdx}
                      role="button"
                      tabIndex={0}
                      aria-label={`Draggable step ${displayIdx + 1}: ${item}`}
                      draggable
                      onDragStart={() => setDraggedItem(String(displayIdx))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const fromIdx = parseInt(draggedItem || '0');
                        handleSortMove(fromIdx, displayIdx);
                      }}
                      whileHover={{ scale: 1.01 }}
                      className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-slate-200 text-xs font-medium cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-indigo-900 text-indigo-300 flex items-center justify-center font-bold text-[10px]">
                        {displayIdx + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  aria-label="Check sequence arrangement"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={handleSortSubmit}
                  disabled={showExplanation}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Check Sequence
                </motion.button>
              </div>
            )}

            {/* Numeric Type */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    aria-label={`Enter numerical answer in ${activeChallenge.unit || 'units'}`}
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter numerical answer"
                    className="px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-indigo-500 w-64"
                  />
                  <span className="text-sm font-bold text-slate-400">{activeChallenge.unit}</span>
                  <motion.button
                    aria-label="Submit numeric answer"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold"
                  >
                    Check Answer
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Type */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      aria-label={`Add component ${part}`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setConstructParts((prev) => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-950 hover:bg-indigo-900 border border-indigo-700 text-indigo-200 rounded-lg text-xs font-mono font-bold"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap items-center gap-2">
                  {constructParts.map((part, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-2.5 py-1 bg-indigo-700 rounded text-white font-mono text-xs flex items-center gap-1.5"
                    >
                      {part}
                      <button aria-label={`Remove component ${part}`} onClick={() => setConstructParts((p) => p.filter((_, idx) => idx !== i))} className="text-red-300 font-bold">
                        ×
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && <span className="text-xs text-slate-600">Click algebra tokens above to build formula...</span>}
                </div>

                <motion.button
                  aria-label="Verify constructed algebraic formula"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={showExplanation || constructParts.length === 0}
                  className="px-5 py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold"
                >
                  Verify Formula
                </motion.button>
              </div>
            )}

            {/* Progressive Explanation Step-by-Step */}
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6 p-4 bg-slate-950 rounded-xl border border-indigo-900/60 space-y-3">
                <span className="text-xs font-black text-indigo-400 uppercase tracking-wider">CISCE Model Explanation & Justification:</span>
                <div className="space-y-2">
                  {activeChallenge.explanation
                    .split('. ')
                    .filter((s) => s.trim().length > 0)
                    .slice(0, revealedSteps + 1)
                    .map((sentence, i) => (
                      <motion.p key={i} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="text-xs sm:text-sm text-slate-300">
                        <span className="font-bold text-indigo-400 font-mono">[{i + 1}]</span> {sentence}
                        {!sentence.endsWith('.') && '.'}
                      </motion.p>
                    ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-900">
                  {revealedSteps < activeChallenge.explanation.split('. ').filter((s) => s.trim().length > 0).length - 1 ? (
                    <motion.button
                      aria-label="Show next step of derivation"
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setRevealedSteps((s) => s + 1)}
                      className="px-4 py-1.5 bg-indigo-800 text-indigo-100 rounded-lg text-xs font-bold"
                    >
                      Show Next Step →
                    </motion.button>
                  ) : (
                    <motion.button
                      aria-label="Proceed to next challenge or final screen"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-950"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Simulation →' : 'Next Challenge →'}
                    </motion.button>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="mt-6 space-y-6">
          <div className="p-6 bg-gradient-to-br from-indigo-950 via-slate-900 to-slate-900 rounded-2xl border border-indigo-700/60 shadow-xl text-center space-y-3">
            <span className="text-4xl" aria-hidden="true">🏆</span>
            <h2 className="text-2xl font-black text-white">Simulation Completed!</h2>
            
            {/* MOTIVATIONAL FEEDBACK BADGE */}
            <div className="inline-block px-5 py-2 rounded-2xl font-black text-base sm:text-lg uppercase tracking-wide shadow-md border bg-slate-950/80">
              {errors === 0 && <span className="text-emerald-400 border-emerald-500">✓ PERFECT SCORE!</span>}
              {errors >= 1 && errors <= 3 && <span className="text-cyan-400 border-cyan-500">✓ Great work!</span>}
              {errors >= 4 && errors <= 7 && <span className="text-amber-400 border-amber-500">✓ Good effort!</span>}
              {errors >= 8 && <span className="text-rose-400 border-rose-500">Do not give up — You WILL get this!</span>}
            </div>

            <div className="flex justify-center gap-6 text-sm font-mono mt-2">
              <span className="text-emerald-400 font-bold">Final Score: {Math.max(0, 100 - errors * 5)}%</span>
              <span className="text-indigo-400 font-bold">Errors: {errors}</span>
              <span className="text-purple-400 font-bold">Mastery: {masteryLevel.toUpperCase()}</span>
            </div>
          </div>

          {/* Detailed Examiner Feedback */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
            <span className="font-bold text-indigo-400">Examiner Appraisal: </span>
            {errors === 0
              ? 'Flawless performance! You possess complete mastery of ruler-and-compass circle tangents, polygon centers, and 3D solid combination problems.'
              : errors <= 3
              ? 'Commendable work! Your grasp of auxiliary Thales semi-circles and solid volume conservation is strong. Review the small slips below for perfection.'
              : errors <= 7
              ? 'Good effort! You understand the foundational properties. Revisit the common traps regarding diameter halving and internal contact face exclusion.'
              : 'Do not give up — You WILL get this! Practice constructing the auxiliary circles and tracking shared faces between combined solids step by step.'}
          </div>

          {/* Misconceptions Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-900/60 space-y-3">
              <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2">
                <span aria-hidden="true">⚠️</span> Specific Misconceptions Diagnosed:
              </h3>
              <div className="space-y-2">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-950 rounded-xl border border-rose-900/40 text-xs space-y-1">
                      <p className="text-rose-400 font-bold">✗ {m.misconception}</p>
                      <p className="text-emerald-400 font-medium">✓ {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Schedule */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800 text-xs space-y-1">
            <span className="font-bold text-amber-400">Spaced Repetition (SM-2 Interval):</span>
            <p className="text-slate-400">
              Your next review session for Node Group c10_math_061-070 is scheduled in{' '}
              <span className="text-white font-bold font-mono">{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</span> to solidify long-term recall.
            </p>
          </div>

          {/* Real World Activity Completion */}
          <div className="p-5 bg-indigo-950/40 rounded-2xl border border-indigo-800/60 space-y-3">
            <h3 className="text-sm font-black text-indigo-300">🏗️ {REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400 font-mono">
              {REAL_WORLD_ACTIVITY.steps.map((step, i) => (
                <div key={i} className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Mastered!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => {}} />}
    </div>
  );
}