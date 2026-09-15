/* ═══════════════════════════════════════════════════════════════════════════
   Real content data for 5 C10 Physics nodes.
   Pulled from actual .marker files in D:\cisce\physics.
   This is test data — the backend will serve this from parsed .marker files.
   ═══════════════════════════════════════════════════════════════════════════ */

import type { TopicRegion } from '@/components/world/LivingWorld'

// ─── Regions (from class10_physics_nodes.marker) ────────────────────────────

export const REAL_REGIONS: TopicRegion[] = [
  {
    id: 'c10_phy_001',
    title: 'Turning Effect of Force',
    unit: 'Mechanics',
    cx: 0.15, cy: 0.25, radius: 0.08,
    mastery: 0, examMarks: 8, questionsToMastery: 12,
    prerequisites: [],
    effectType: 'machines',
    colorRgb: [56, 189, 248],
  },
  {
    id: 'c10_phy_002',
    title: 'Centre of Gravity',
    unit: 'Mechanics',
    cx: 0.28, cy: 0.20, radius: 0.07,
    mastery: 0, examMarks: 6, questionsToMastery: 10,
    prerequisites: ['c10_phy_001'],
    effectType: 'default',
    colorRgb: [56, 189, 248],
  },
  {
    id: 'c10_phy_004',
    title: 'Work, Energy & Power',
    unit: 'Mechanics',
    cx: 0.40, cy: 0.28, radius: 0.08,
    mastery: 0, examMarks: 10, questionsToMastery: 15,
    prerequisites: ['c10_phy_001'],
    effectType: 'motion',
    colorRgb: [56, 189, 248],
  },
  {
    id: 'c10_phy_012',
    title: 'Levers',
    unit: 'Machines',
    cx: 0.22, cy: 0.42, radius: 0.09,
    mastery: 0, examMarks: 10, questionsToMastery: 14,
    prerequisites: ['c10_phy_001'],
    effectType: 'machines',
    colorRgb: [251, 191, 36],
  },
  {
    id: 'c10_phy_010',
    title: 'Velocity Ratio & Pulleys',
    unit: 'Machines',
    cx: 0.35, cy: 0.48, radius: 0.08,
    mastery: 0, examMarks: 9, questionsToMastery: 13,
    prerequisites: ['c10_phy_004'],
    effectType: 'machines',
    colorRgb: [251, 191, 36],
  },
]

// ─── Content per node (from enrichment .marker files) ───────────────────────

export interface NodeContent {
  nodeId: string
  title: string
  definition: string
  eli5: string
  walkthrough: string
  realWorldApp: string
  misconception: string
  diagnosticQuestions: DiagnosticQuestion[]
  simulationType: 'lever' | 'pulley' | 'none'
}

export interface DiagnosticQuestion {
  level: 'recall' | 'reasoning' | 'evaluate' | 'apply' | 'create'
  question: string
  options: string[]
  correctIndex: number
  explanation: string
  onFailure: string
}

// ─── Node c10_phy_001: Turning Effect of Force ──────────────────────────────

const NODE_001: NodeContent = {
  nodeId: 'c10_phy_001',
  title: 'Turning Effect of Force',
  definition: 'Moment of a force (torque) = the turning effect of a force around a pivot.\n\nFormula: Moment = Force × perpendicular distance from pivot\n         τ = F × d\n\nSI unit: newton-metre (N·m)\ncgs unit: dyne-centimetre (dyne·cm)\n1 N·m = 10⁷ dyne·cm\n\nPrinciple of moments: When something is balanced (not rotating),\n  clockwise moments = anticlockwise moments',
  eli5: 'Imagine a seesaw. A light child sitting far from the middle can balance a heavy child sitting close to the middle. The "turning effect" depends on BOTH how hard you push (force) AND how far you are from the pivot (distance). A small force far away can balance a big force close up.',
  walkthrough: 'The moment of a force is the rotational analogue of force. Just as a net force causes linear acceleration, a net moment causes rotational acceleration.\n\nMoment = Force × Perpendicular distance from the pivot to the line of action of the force (τ = F × d)\n\nThe phrase "perpendicular distance" is critical. It is the shortest distance from the pivot to the line of action of the force — not necessarily the distance to where the force is applied. This is why doorknobs are placed far from the hinge — maximum moment for minimum effort.\n\nEvery moment has a sense of rotation: clockwise or anticlockwise. On a seesaw, a person on the right creates a clockwise moment, while a person on the left creates an anticlockwise moment.\n\nThe principle of moments: when balanced, Σ(clockwise moments) = Σ(anticlockwise moments).',
  realWorldApp: 'A bottle opener is a second-class lever where the fulcrum is at the cap edge, load is the cap, and effort is applied at the handle end — giving mechanical advantage greater than 1. A nutcracker is also second class. In contrast, tongs used in Indian kitchens to lift hot rotis are a third-class lever where effort lies between fulcrum and load, trading force for speed.',
  misconception: 'Students often use the actual distance from the pivot to the point of application, instead of the perpendicular distance from the pivot to the line of action of the force. If the force is applied at an angle, the perpendicular distance is less than the actual distance, and the moment is smaller than expected.',
  simulationType: 'lever',
  diagnosticQuestions: [
    {
      level: 'recall',
      question: 'Define moment of a force (torque) and state its SI unit.',
      options: [
        'Moment = F × d. SI unit: newton-metre (N·m)',
        'Moment = F + d. SI unit: newton (N)',
        'Moment = F / d. SI unit: pascal (Pa)',
        'Moment = F × d². SI unit: newton per metre (N/m)',
      ],
      correctIndex: 0,
      explanation: 'Moment of a force = Force × perpendicular distance from pivot to line of action. SI unit: N·m. It is a vector quantity whose direction is the sense of rotation (clockwise or anticlockwise).',
      onFailure: 'Review c8_phy_011 — In Class 8, you learned moment = F × d. If this fails, the basic definition was not retained.',
    },
    {
      level: 'reasoning',
      question: 'A uniform metre rule is pivoted at its centre (50 cm). A weight of 3 N is hung at the 65 cm mark. Where should a 6 N weight be hung on the other side to balance the rule?',
      options: [
        '42.5 cm mark',
        '57.5 cm mark',
        '38.0 cm mark',
        '45.0 cm mark',
      ],
      correctIndex: 0,
      explanation: 'Pivot at 50 cm. 3 N at 65 cm → distance = 15 cm = 0.15 m. Clockwise moment = 3 × 0.15 = 0.45 N·m. For equilibrium: 6 × d = 0.45 → d = 0.075 m = 7.5 cm. The 6 N weight goes at 50 − 7.5 = 42.5 cm mark.',
      onFailure: 'Review c8_phy_011 — The calculation M = F × d needs revision. Practice the formula application.',
    },
    {
      level: 'evaluate',
      question: 'A mechanic finds it difficult to loosen a tight bolt with a spanner. Which two methods increase the turning effect WITHOUT applying more force?',
      options: [
        'Use a longer spanner AND push perpendicular to the handle',
        'Push harder AND use a shorter spanner',
        'Push at an angle AND use a longer spanner',
        'Use a shorter spanner AND push perpendicular',
      ],
      correctIndex: 0,
      explanation: 'Moment = F × d. (1) A longer spanner increases d, so the same F gives a larger moment. (2) Pushing perpendicular (90°) maximises the perpendicular distance. Both increase F × d without requiring more force.',
      onFailure: 'Review c8_phy_011 — Q3 tests reasoning about how changing d and the angle affects the moment.',
    },
    {
      level: 'apply',
      question: 'A uniform metre rule is pivoted at the 40 cm mark. A 3 N weight is at 10 cm and a 2 N weight is at 70 cm. Where should a 1.5 N weight be hung to balance?',
      options: [
        '60 cm mark (right side)',
        '20 cm mark (left side)',
        '55 cm mark (right side)',
        '25 cm mark (left side)',
      ],
      correctIndex: 0,
      explanation: '3 N at 10 cm: distance from pivot = 30 cm = 0.30 m. Anticlockwise = 3 × 0.30 = 0.90 N·m. 2 N at 70 cm: distance = 30 cm. Clockwise = 2 × 0.30 = 0.60 N·m. Need more clockwise: 0.90 − 0.60 = 0.30 N·m. 1.5 × d = 0.30 → d = 0.20 m = 20 cm. On right side: 40 + 20 = 60 cm mark.',
      onFailure: 'Review the worked examples in the walkthrough. Common errors: forgetting unit conversion, misidentifying clockwise vs anticlockwise.',
    },
    {
      level: 'create',
      question: 'Design an experiment to verify the principle of moments using a metre rule, knife-edge pivot, and three weights (1 N, 2 N, 3 N). What is the KEY measurement you must record?',
      options: [
        'The distance of each weight from the pivot AND the weight values',
        'Only the total weight on each side',
        'The length of the metre rule',
        'The time taken for the rule to balance',
      ],
      correctIndex: 0,
      explanation: 'You must record: pivot position, position of each weight, distance of each weight from pivot, and weight values. Then verify: Σ(clockwise moments) = Σ(anticlockwise moments), where each moment = weight × distance from pivot. Source of error: weight of strings — minimise by using light threads.',
      onFailure: 'Review the principle of moments and the verification experiment. The student must measure both distances and weights to compute moments.',
    },
  ],
}

// ─── Node c10_phy_002: Centre of Gravity ────────────────────────────────────

const NODE_002: NodeContent = {
  nodeId: 'c10_phy_002',
  title: 'Centre of Gravity',
  definition: 'Centre of gravity (CG) = the single point where the entire weight of a body appears to act.\n\nFor regular shapes:\n• Rectangle → where the diagonals cross\n• Circle → the centre\n• Triangle → the centroid (where the medians meet)\n\nFor irregular shapes: hang it from 2 different points, draw plumb lines from each — where they cross is the CG.',
  eli5: 'Every object has one special spot called the centre of gravity — the place where you can imagine ALL of the object\'s weight is concentrated. If you balance a ruler on your finger, that spot is right in the middle.',
  walkthrough: 'Every particle of a body experiences a downward gravitational force (weight = mg). The centre of gravity is the single point where the entire weight can be considered to act.\n\nFor regular uniform bodies, the CG coincides with the geometrical centre. For an irregular lamina, the plumb-line method works because when the lamina hangs freely, the CG lies directly below the point of suspension (the weight acts vertically through the CG, and the moment about the suspension point is zero only when the CG is directly below it).\n\nTwo factors affect CG position: (1) shape of the body, (2) distribution of mass. A racing car has a low CG because its heavy engine is mounted low, making it more stable.',
  realWorldApp: 'A low centre of gravity makes a racing car stable — when it tilts on a sharp turn, the CG must rise through a large angle before passing outside the wheelbase, so gravity restores it. This is the same reason a wobble doll (with a weighted bottom) always stands back up.',
  misconception: 'Students often assume the CG must always lie within the material of the body. Correction: For a uniform ring, the CG is at the centre — which is empty space. For an L-shaped object, the CG can lie outside the body entirely.',
  simulationType: 'none',
  diagnosticQuestions: [
    {
      level: 'recall',
      question: 'Where is the centre of gravity of a uniform triangular lamina located?',
      options: [
        'At the centroid — intersection of the three medians',
        'At the intersection of the diagonals',
        'At the centre of the longest side',
        'At the vertex of the largest angle',
      ],
      correctIndex: 0,
      explanation: 'For a uniform triangular lamina, the CG is at the centroid — the point of intersection of the three medians. Each median joins a vertex to the midpoint of the opposite side.',
      onFailure: 'Review c10_phy_001 — The principle of moments (equilibrium condition) is what locates the CG.',
    },
    {
      level: 'reasoning',
      question: 'An irregular lamina is suspended from point A and a plumb line is drawn. Then from point B. Why does the intersection of the two plumb lines give the CG?',
      options: [
        'Because the CG must lie directly below every point of suspension for zero net moment',
        'Because the plumb line always points to the centre of the Earth',
        'Because the lamina is uniform and symmetric',
        'Because the two suspension points are equidistant from the CG',
      ],
      correctIndex: 0,
      explanation: 'When the lamina hangs freely, it rotates until the CG is directly below the suspension point (weight acts through CG; moment about suspension = 0 only when CG is directly below). Two different suspension points give two different vertical lines. Their intersection is the only point common to both — so it must be the CG.',
      onFailure: 'Review c10_phy_001 — The plumb-line method works because of the moment equilibrium condition.',
    },
    {
      level: 'evaluate',
      question: 'A uniform metre rule has a 20 g weight glued to one end. How does the CG shift?',
      options: [
        'Toward the heavier end (the end with the glued weight)',
        'Away from the heavier end',
        'It stays at the midpoint',
        'It moves to the glued weight itself',
      ],
      correctIndex: 0,
      explanation: 'Originally the CG is at the midpoint (50 cm). Adding mass at one end makes the distribution non-uniform. The CG shifts toward the heavier end. The two factors affecting CG: (1) shape, (2) mass distribution.',
      onFailure: 'Review c9_phy_020 — Every particle is pulled downward by gravity. Mass distribution determines weight distribution, which shifts the CG.',
    },
    {
      level: 'apply',
      question: 'A uniform cone has height 15 cm. Its CG is at h/4 from the base. How high is the CG above the table when the cone stands on its base?',
      options: [
        '3.75 cm',
        '7.5 cm',
        '11.25 cm',
        '15 cm',
      ],
      correctIndex: 0,
      explanation: 'CG of a uniform cone is at h/4 from the base = 15/4 = 3.75 cm from the base. When standing on its base, the CG is 3.75 cm above the table. This low CG makes the cone stable on its base.',
      onFailure: 'Review the CG positions for regular bodies. The student must know CG of a cone is at h/4 from the base.',
    },
    {
      level: 'create',
      question: 'Design a "wobble doll" that always returns upright after being tipped. Where should the mass be concentrated?',
      options: [
        'At the lowest point inside the base, making the CG very low',
        'At the top of the doll, making the CG high',
        'Evenly distributed throughout the body',
        'In the arms of the doll',
      ],
      correctIndex: 0,
      explanation: 'Place a heavy weight at the lowest point inside the shell. This makes the CG very low. When tipped, the CG rises, and gravity creates a restoring moment that returns the doll upright. The lower the CG, the greater the tilt angle before toppling. This is stable equilibrium.',
      onFailure: 'Review the factors affecting CG position and the concept of stable equilibrium from c10_phy_003.',
    },
  ],
}

// ─── Node c10_phy_004: Work, Energy & Power ─────────────────────────────────

const NODE_004: NodeContent = {
  nodeId: 'c10_phy_004',
  title: 'Work, Energy & Power',
  definition: 'Work = Force × displacement × cos(angle between them)\n         W = F × s × cos(θ)\n\n• Same direction (θ = 0°): W = Fs (maximum work)\n• Perpendicular (θ = 90°): W = 0 (no work!)\n• Opposite (θ = 180°): W = −Fs (work against the force)\n\nEnergy = capacity to do work. Unit: joule (J)\n  KE = ½mv²    PE = mgh\n\nPower = Work ÷ Time. Unit: watt (W)\n  1 horsepower = 746 W',
  eli5: 'Work is when you push something and it moves. If you push a wall and it doesn\'t move, you did zero work (even though you\'re tired!). Energy is the "currency" — you spend energy to do work. Power is how FAST you spend it.',
  walkthrough: 'Work done by a force: W = F × s × cos(θ), where θ is the angle between force and displacement.\n\nSpecial cases:\n- θ = 0° (same direction): W = Fs (maximum work)\n- θ = 90° (perpendicular): W = 0 (no work done — e.g., carrying a suitcase horizontally, gravity does no work)\n- θ = 180° (opposite): W = −Fs (work done against the force)\n\nEnergy is the capacity to do work. Kinetic energy (KE = ½mv²) is energy of motion. Potential energy (PE = mgh) is energy of position. The law of conservation of energy: energy cannot be created or destroyed, only transformed.\n\nPower = Work / Time. A 100 W bulb converts 100 joules of electrical energy into light and heat every second. 1 horsepower = 746 W.',
  realWorldApp: 'A standard Crompton or Havells ceiling fan is rated about 75 W. In one hour it consumes 0.075 units of electricity (1 unit = 1 kWh). The newer BLDC fans run at about 28 W, saving nearly 60% energy compared to old induction fans — which is why BEE star ratings push consumers towards them.',
  misconception: 'Students often think carrying a heavy suitcase horizontally involves doing work against gravity. Correction: When force (upward, to hold the suitcase) and displacement (horizontal) are perpendicular (θ = 90°), W = 0. You do work only when lifting the suitcase vertically (W = mgh). The tiredness from carrying it horizontally is due to muscular effort, not physics work.',
  simulationType: 'none',
  diagnosticQuestions: [
    {
      level: 'recall',
      question: 'State the formula for work when force and displacement are at an angle θ. What is the work when θ = 90°?',
      options: [
        'W = Fs cos θ. When θ = 90°, W = 0 (no work done)',
        'W = Fs sin θ. When θ = 90°, W = Fs',
        'W = Fs + θ. When θ = 90°, W = Fs + 90',
        'W = Fs / θ. When θ = 90°, W = Fs/90',
      ],
      correctIndex: 0,
      explanation: 'W = F × s × cos(θ). When θ = 90°, cos(90°) = 0, so W = 0. This means when force and displacement are perpendicular, no work is done. Example: carrying a suitcase horizontally — gravity pulls down, you walk sideways, no work against gravity.',
      onFailure: 'Review c8_phy_013 — In Class 8, you learned work as W = F × s (same direction). Now we generalise to W = Fs cos θ.',
    },
    {
      level: 'reasoning',
      question: 'A force of 30 N acts at 60° to the direction of displacement of 10 m. Calculate the work done.',
      options: [
        '150 J',
        '300 J',
        '260 J',
        '0 J',
      ],
      correctIndex: 0,
      explanation: 'W = F × s × cos(θ) = 30 × 10 × cos(60°) = 30 × 10 × 0.5 = 150 J. If the angle were 0°, W would be 300 J (maximum).',
      onFailure: 'Review c9_math_060 — In Class 9 Maths, you learned trigonometric ratios. The cos θ factor requires knowing cos 0°, cos 30°, cos 60°, cos 90°.',
    },
    {
      level: 'evaluate',
      question: 'A man carries a 10 kg suitcase on his head and walks horizontally 20 m. Another man lifts a 10 kg suitcase vertically 2 m. Compare the work done.',
      options: [
        'Man 1: 0 J. Man 2: 196 J. Walking horizontally with weight on head = no work against gravity.',
        'Man 1: 1960 J. Man 2: 196 J. Man 1 does more work because he walks further.',
        'Both do 196 J of work.',
        'Man 1: 200 J. Man 2: 20 J.',
      ],
      correctIndex: 0,
      explanation: 'Man 1: Force (upward, to hold suitcase) is perpendicular to displacement (horizontal). θ = 90°, cos 90° = 0, W = 0. Man 2: Force and displacement are in the same direction (upward). W = mgh = 10 × 9.8 × 2 = 196 J. The first man does NO physics work against gravity — his tiredness is muscular, not physics work.',
      onFailure: 'Review c8_phy_013 — The zero-work case (θ = 90°) and W = mgh both build on understanding when force and displacement are aligned or perpendicular.',
    },
    {
      level: 'apply',
      question: 'A pump lifts 200 kg of water to a height of 15 m in 2 minutes. Calculate the power in watts. (g = 9.8 m/s²)',
      options: [
        '245 W',
        '490 W',
        '29400 W',
        '122.5 W',
      ],
      correctIndex: 0,
      explanation: 'Work = mgh = 200 × 9.8 × 15 = 29400 J. Time = 2 min = 120 s. Power = W/t = 29400/120 = 245 W. In horsepower: 245/746 ≈ 0.33 hp.',
      onFailure: 'Review c10_phy_004 — Power = Work/Time. The student must calculate work first (W = mgh), then divide by time (in seconds).',
    },
    {
      level: 'create',
      question: 'Design an experiment to measure a student\'s power output by running up stairs. What measurements are needed?',
      options: [
        'Student\'s mass, height of stairs, and time taken to climb',
        'Student\'s height, weight of shoes, and number of steps',
        'Student\'s mass, length of stairs, and speed of running',
        'Student\'s weight, temperature, and heart rate',
      ],
      correctIndex: 0,
      explanation: 'Power = Work/Time = mgh/t. Measurements: (1) mass of student (m, in kg), (2) vertical height of staircase (h, in metres — measure with a tape), (3) time to climb (t, in seconds — use a stopwatch). Then P = m × g × h / t. Example: 50 kg student, 5 m stairs, 8 s → P = 50 × 9.8 × 5 / 8 = 306 W.',
      onFailure: 'Review c8_phy_017 — The distinction between energy (capacity) and power (rate) needs clarification.',
    },
  ],
}

// ─── Node c10_phy_012: Levers ───────────────────────────────────────────────

const NODE_012: NodeContent = {
  nodeId: 'c10_phy_012',
  title: 'Levers',
  definition: 'A lever is a bar that pivots on a fixed point called the fulcrum.\n\n3 parts: Fulcrum (pivot), Load (what you want to move), Effort (the force you apply).\n\n3 classes:\n• Class 1: Fulcrum in the middle → seesaw, scissors, crowbar\n• Class 2: Load in the middle → nutcracker, bottle opener, wheelbarrow\n• Class 3: Effort in the middle → tongs, tweezers, fishing rod\n\nMechanical Advantage = Load ÷ Effort = Effort arm ÷ Load arm',
  eli5: 'A lever is a stick that pivots on a point. Push on one end, something happens on the other. Where you put the pivot (fulcrum) decides whether you get more force, more speed, or more reach. A bottle opener, a pair of scissors, and a fishing rod are all levers — just with the pivot in different places.',
  walkthrough: 'A lever has three elements: Fulcrum (F — the pivot), Load (L — the resistance to overcome), and Effort (E — the applied force).\n\nClass 1 (Fulcrum in middle): seesaw, crowbar, scissors, pliers. MA can be > 1, = 1, or < 1 depending on arm lengths. MA = Effort arm / Load arm.\n\nClass 2 (Load in middle): nutcracker, bottle opener, wheelbarrow. MA is always > 1 because the effort arm is always longer than the load arm. This is why nutcrackers and bottle openers make work easier.\n\nClass 3 (Effort in middle): tongs, tweezers, fishing rod. MA is always < 1. These trade force for speed and range of motion — you get less force but more movement.\n\nMechanical Advantage = Load / Effort = Effort arm / Load arm. For Class 2, effort arm > load arm always, so MA > 1 always.',
  realWorldApp: 'A bottle opener is a second-class lever: fulcrum at the cap edge, load is the cap, effort at the handle end — MA > 1. A nutcracker is also second class. Tongs used in Indian kitchens to lift hot rotis are third-class: effort between fulcrum and load, trading force for speed and range of motion.',
  misconception: 'Students often think Class 2 levers always have the highest MA. Correction: MA depends on the ratio of arm lengths, not the class. A Class 1 lever with a very long effort arm can have higher MA than a Class 2 lever with short arms. The class tells you the arrangement, not the MA value.',
  simulationType: 'lever',
  diagnosticQuestions: [
    {
      level: 'recall',
      question: 'Which class of lever has the fulcrum between the load and the effort? Give one example.',
      options: [
        'Class 1 — seesaw, crowbar, scissors',
        'Class 2 — nutcracker, bottle opener',
        'Class 3 — tongs, tweezers, fishing rod',
        'Class 4 — pulley, wheel and axle',
      ],
      correctIndex: 0,
      explanation: 'Class 1 lever: Fulcrum is between Load and Effort. Examples: seesaw, crowbar, scissors, pliers. MA can be > 1, = 1, or < 1 depending on the arm lengths.',
      onFailure: 'Review c10_phy_001 — The principle of moments is the basis of lever operation. The lever balances when Effort × effort arm = Load × load arm.',
    },
    {
      level: 'reasoning',
      question: 'A Class 2 lever has a load arm of 20 cm and an effort arm of 80 cm. Calculate the MA. If the load is 400 N, what effort is needed?',
      options: [
        'MA = 4, Effort = 100 N',
        'MA = 0.25, Effort = 1600 N',
        'MA = 4, Effort = 400 N',
        'MA = 2, Effort = 200 N',
      ],
      correctIndex: 0,
      explanation: 'MA = Effort arm / Load arm = 80/20 = 4. Effort = Load / MA = 400/4 = 100 N. Class 2 levers always have MA > 1 because the effort arm is always longer than the load arm.',
      onFailure: 'Review c10_phy_001 — The lever is an application of the principle of moments: Effort × effort arm = Load × load arm.',
    },
    {
      level: 'evaluate',
      question: 'Why are tongs (used to lift hot rotis) designed as Class 3 levers even though MA < 1?',
      options: [
        'Because Class 3 trades force for speed and range of motion — you get more movement at the load end',
        'Because Class 3 is cheaper to manufacture',
        'Because Class 3 has the highest MA',
        'Because Class 3 is required by safety regulations',
      ],
      correctIndex: 0,
      explanation: 'Class 3 levers have MA < 1 (effort between fulcrum and load). But they trade force for speed and range of motion: a small movement of the effort produces a larger movement at the load end. Tongs, tweezers, and fishing rods need precise control and large movement, not force multiplication.',
      onFailure: 'Review c10_phy_001 — The principle of moments explains why MA < 1 when the effort arm is shorter than the load arm.',
    },
    {
      level: 'apply',
      question: 'A crowbar (Class 1 lever) is 1.5 m long. The fulcrum is 0.3 m from the load end. An effort of 120 N is applied at the other end. What is the maximum load that can be lifted?',
      options: [
        '480 N',
        '120 N',
        '600 N',
        '200 N',
      ],
      correctIndex: 0,
      explanation: 'Effort arm = 1.5 − 0.3 = 1.2 m. Load arm = 0.3 m. MA = Effort arm / Load arm = 1.2/0.3 = 4. Load = MA × Effort = 4 × 120 = 480 N. The crowbar multiplies the force by 4.',
      onFailure: 'Review c10_phy_011 — MA = Effort arm / Load arm. The student must correctly identify which arm is which based on fulcrum position.',
    },
    {
      level: 'create',
      question: 'Design a lever system to lift a 2000 N stone using only 250 N of effort. Specify the class, fulcrum position, and arm lengths.',
      options: [
        'Class 1 or 2. MA = 8. Effort arm = 8 × load arm. E.g., load arm = 20 cm, effort arm = 160 cm, fulcrum 20 cm from load.',
        'Class 3. MA = 8. Load arm = 8 × effort arm.',
        'Class 1. MA = 0.125. Effort = 2000 × 0.125 = 250 N.',
        'Any class. MA = 2000/250 = 8, but only Class 3 can achieve this.',
      ],
      correctIndex: 0,
      explanation: 'Required MA = Load/Effort = 2000/250 = 8. Use Class 1 (fulcrum between load and effort) or Class 2 (load between fulcrum and effort). For MA = 8: effort arm = 8 × load arm. Example: load arm = 20 cm, effort arm = 160 cm. For Class 1: place fulcrum 20 cm from the load, apply effort 160 cm on the other side. For Class 2: place fulcrum at one end, load 20 cm from fulcrum, effort 180 cm from fulcrum (effort arm = 180, load arm = 20, MA = 9 — adjust to get MA = 8). Class 3 cannot work here because MA < 1 always.',
      onFailure: 'Review c10_phy_001 (principle of moments) and c10_phy_011 (MA framework). The student must design arm lengths that give MA = 8.',
    },
  ],
}

// ─── Node c10_phy_010: Velocity Ratio & Pulleys ─────────────────────────────

const NODE_010: NodeContent = {
  nodeId: 'c10_phy_010',
  title: 'Velocity Ratio & Pulleys',
  definition: 'Velocity Ratio (VR) = distance moved by effort ÷ distance moved by load\n         VR = dE / dL\n\nFor a block and tackle with n pulleys: VR = n\n\nMA = Load ÷ Effort (what you actually get)\nEfficiency = (MA / VR) × 100%\n\nIdeal machine (no friction): MA = VR, efficiency = 100%\nReal machine: MA < VR, efficiency < 100%',
  eli5: 'A pulley system is like climbing stairs with a rope. More rope segments pulling up = less force you need, but you pull more rope. VR tells you how many times the rope multiplies your effort. 4 pulleys = pull 4 times more rope, but use 4 times less force (ideally).',
  walkthrough: 'Velocity Ratio (VR) = distance moved by effort (dE) / distance moved by load (dL).\n\nFor a single fixed pulley: VR = 1 (no mechanical advantage, just changes direction).\nFor a single movable pulley: VR = 2 (rope supports the load from two sides).\nFor a block and tackle with n pulleys: VR = n.\n\nMA = Load / Effort (what you actually get).\nVR = dE / dL (what the geometry gives).\nEfficiency η = (MA / VR) × 100%.\n\nIn an ideal machine (no friction): MA = VR, η = 100%.\nIn a real machine: MA < VR (friction reduces MA), so η < 100%.\n\nIf a calculation gives η > 100%, an error has been made — no real machine can be more than 100% efficient.',
  realWorldApp: 'On a construction site, workers use a block and tackle with 4 pulleys to lift 1000 N concrete blocks. A worker applies 300 N of effort. MA = 1000/300 = 3.33. VR = 4. Efficiency = (3.33/4) × 100 = 83.3%. The lost 16.7% goes to friction in the pulleys and rope — that\'s why the pulleys feel warm after long use.',
  misconception: 'Students often think VR depends on friction. Correction: VR depends only on the geometry of the machine (distances moved). It does NOT depend on friction, load, or effort. Friction changes MA, not VR. Worn-out parts change MA, not VR.',
  simulationType: 'pulley',
  diagnosticQuestions: [
    {
      level: 'recall',
      question: 'State the formula for Velocity Ratio (VR). For a block and tackle with 4 pulleys, what is the VR?',
      options: [
        'VR = dE / dL. For 4 pulleys: VR = 4',
        'VR = dL / dE. For 4 pulleys: VR = 4',
        'VR = Load / Effort. For 4 pulleys: VR = 4',
        'VR = Effort / Load. For 4 pulleys: VR = 0.25',
      ],
      correctIndex: 0,
      explanation: 'VR = distance moved by effort / distance moved by load = dE / dL. For a block and tackle with n pulleys, VR = n (number of rope segments supporting the load). So 4 pulleys → VR = 4.',
      onFailure: 'Review c10_phy_009 — MA = Load/Effort. VR is the geometric counterpart.',
    },
    {
      level: 'reasoning',
      question: 'A block and tackle has 4 pulleys. The efficiency is 75%. If the load is 600 N, what effort is needed?',
      options: [
        '200 N',
        '150 N',
        '800 N',
        '450 N',
      ],
      correctIndex: 0,
      explanation: 'VR = 4. η = 75% = 0.75. MA = η × VR = 0.75 × 4 = 3. Effort = Load / MA = 600 / 3 = 200 N. Without friction (ideal), effort would be 600/4 = 150 N. The extra 50 N overcomes friction.',
      onFailure: 'Review c10_phy_011 — Efficiency η = MA/VR. The student must first find MA from η × VR, then find effort.',
    },
    {
      level: 'evaluate',
      question: 'A student calculates a pulley system\'s efficiency as 120%. What should you conclude?',
      options: [
        'An error has been made — no real machine can have η > 100%. Re-check measurements.',
        'The machine is very efficient and well-lubricated',
        'The VR was counted incorrectly — it should be higher',
        'The load was too heavy for the system',
      ],
      correctIndex: 0,
      explanation: 'η > 100% is a red flag. Real machines always have friction, so some input work is always wasted as heat. η can never equal 100%, let alone exceed it. If a calculation gives η > 100%, re-check: measurements of load, effort, dE, and dL. Usually MA > VR was computed wrongly.',
      onFailure: 'Review c10_phy_011 — Efficiency = MA/VR. η > 100% means MA > VR, which is impossible for a real machine.',
    },
    {
      level: 'apply',
      question: 'A block and tackle with 4 pulleys lifts a load of 800 N to a height of 2 m. The efficiency is 80%. Calculate (a) the effort, (b) the distance the effort rope is pulled, (c) the work done against friction.',
      options: [
        '(a) 250 N, (b) 8 m, (c) 400 J',
        '(a) 200 N, (b) 8 m, (c) 0 J',
        '(a) 320 N, (b) 2 m, (c) 640 J',
        '(a) 250 N, (b) 2 m, (c) 400 J',
      ],
      correctIndex: 0,
      explanation: '(a) VR = 4. MA = η × VR = 0.80 × 4 = 3.2. Effort = Load/MA = 800/3.2 = 250 N. (b) VR = dE/dL = 4, so dE = 4 × dL = 4 × 2 = 8 m. (c) Work input = Effort × dE = 250 × 8 = 2000 J. Work output = Load × dL = 800 × 2 = 1600 J. Work against friction = 2000 − 1600 = 400 J.',
      onFailure: 'Review c10_phy_010 (VR = dE/dL) and c10_phy_011 (η = MA/VR). Common errors: not finding MA from η × VR, or confusing dE and dL.',
    },
    {
      level: 'create',
      question: 'Design an experiment to determine the efficiency of a single movable pulley. What apparatus do you need and what do you measure?',
      options: [
        'Spring balance (for effort), known weights (load), metre rule (for dE and dL). Measure: effort, load, dE, dL. Calculate MA = L/E, VR = dE/dL, η = MA/VR × 100%.',
        'Only a stopwatch and a weight. Measure time to lift the load.',
        'A voltmeter and ammeter. Measure electrical input.',
        'A thermometer. Measure temperature change of the pulley.',
      ],
      correctIndex: 0,
      explanation: 'Apparatus: a single movable pulley, string, spring balance (to measure effort), slotted weights (for load), metre rule (to measure distances). Procedure: (1) Set up the movable pulley with the load hanging. (2) Attach the spring balance to the free end of the rope. (3) Pull the rope up steadily and note the effort reading. (4) Measure dL (how far the load rises) and dE (how far you pull the rope). (5) Calculate: MA = Load/Effort, VR = dE/dL (should be 2), η = (MA/VR) × 100%. Sources of error: friction at the pulley axle, weight of the lower pulley block, stretching of the string.',
      onFailure: 'Review c9_phy_045 — Work, energy, and machine efficiency. The student must measure both forces and distances to compute MA, VR, and η.',
    },
  ],
}

// ─── Export all ──────────────────────────────────────────────────────────────

export const NODE_CONTENT: Record<string, NodeContent> = {
  'c10_phy_001': NODE_001,
  'c10_phy_002': NODE_002,
  'c10_phy_004': NODE_004,
  'c10_phy_010': NODE_010,
  'c10_phy_012': NODE_012,
}
