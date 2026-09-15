'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, masteryProb } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// TYPES AND INTERFACES
// ==========================================

export interface ECCESimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

export interface ExplorationStep {
  title: string;
  instruction: string;
  interactionType: string;
  nodeId: string;
}

export interface PredictionQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  verifyInstruction: string;
  nodeId: string;
}

export interface ObservationQuestion {
  question: string;
  observableOptions: string[];
  correctIndex: number;
  nodeId: string;
}

export interface MisconceptionItem {
  id: string;
  statement: string;
  correction: string;
  nodeId: string;
}

export interface DiagnosticQuestion {
  id: string;
  nodeId: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface ChallengeItem {
  id: string;
  nodeId: string;
  type: 'multiple-choice' | 'drag-sort' | 'numeric' | 'matching';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

// ==========================================
// CONSTANTS AND DATA DEFINITIONS
// ==========================================

const ALL_NODE_IDS = [
  'c12_bio_cbse_100',
  'c12_bio_cbse_101',
  'c12_bio_cbse_102',
  'c12_bio_cbse_103',
  'c12_bio_cbse_104',
  'c12_bio_cbse_105',
  'c12_bio_cbse_106',
  'c12_bio_cbse_107',
  'c12_bio_cbse_108',
  'c12_bio_cbse_109',
  'c12_bio_cbse_110',
  'c12_bio_cbse_111',
  'c12_bio_cbse_112',
  'c12_bio_cbse_113',
  'c12_bio_cbse_114',
  'c12_bio_cbse_115',
  'c12_bio_cbse_116',
  'c12_bio_cbse_117',
  'c12_bio_cbse_118',
  'c12_bio_cbse_119',
  'c12_bio_cbse_120',
  'c12_bio_cbse_121',
] as const;

const SCENARIO = {
  title: 'Integrated Early Childhood Care & Development Laboratory',
  intro: 'Welcome to the Advanced Human Development & ECCE Interactive Research Lab. As a lead developmental scientist and ECCE curriculum planner, you are tasked with observing, evaluating, and designing optimal growth environments for children aged 0 to 6 years.',
  context: 'You will systematically test developmental milestones across physical, cognitive, language, and socio-emotional domains, configure pedagogical scaffolding (Piaget & Vygotsky models), simulate Anganwadi/ICDS community care delivery, and engineer child-centered learning environments in compliance with NCF 2005 recommendations.',
};

const DISCOVERY_QUESTION = {
  question: 'Which of the following interventions has been scientifically proven to contribute most significantly to synaptic pruning and long-term neural pathway consolidation during the first 1,000 days of human life?',
  options: [
    'Formal rote academic instruction in reading and writing starting at 12 months',
    'Responsive, warm caregiver interactions coupled with play-based sensory exploration',
    'Strict passive isolation to minimize environmental auditory and visual stimuli',
    'High-intensity physical regimen focused on early independent locomotion',
  ],
  correctIndex: 1,
  hintAfter: 'During infancy and toddlerhood, brain development relies heavily on "serve-and-return" caregiver interactions and active sensory exploration, which forge strong neuro-synaptic networks faster than formal academic drill.',
};

const EXPLORATION_STEPS: ExplorationStep[] = [
  {
    title: 'Lab 1: Developmental Milestones & Age-Stage Mapping',
    instruction: 'Adjust the age slider from 0 to 72 months to observe neuro-motor growth, language acquisition, object permanence, and social milestone progression.',
    interactionType: 'age-milestone-simulator',
    nodeId: 'c12_bio_cbse_105',
  },
  {
    title: 'Lab 2: Attachment Dynamics & Socio-Emotional Bonding',
    instruction: 'Simulate caregiver presence, separation, and stranger introduction to observe attachment behaviors (Secure, Avoidant, Resistant/Ambivalent) and Stranger Anxiety thresholds.',
    interactionType: 'attachment-lab',
    nodeId: 'c12_bio_cbse_106',
  },
  {
    title: 'Lab 3: Cognitive Constructivism & ZPD Scaffolding',
    instruction: 'Compare Jean Piaget’s Cognitive Stages (Sensorimotor vs. Preoperational) with Lev Vygotsky’s Zone of Proximal Development (ZPD) by adjusting task difficulty and teacher scaffolding.',
    interactionType: 'cognitive-scaffolding-lab',
    nodeId: 'c12_bio_cbse_112',
  },
  {
    title: 'Lab 4: Anganwadi & ICDS Integrated Service Delivery',
    instruction: 'Allocate community health, supplementary nutrition, immunization, and preschool education resources across a simulated rural Anganwadi Center to optimize child health outcomes.',
    interactionType: 'icds-anganwadi-allocator',
    nodeId: 'c12_bio_cbse_120',
  },
  {
    title: 'Lab 5: Montessori & Play-Way Environment Design',
    instruction: 'Configure classroom learning corners (sensorial, practical life, language, outdoor play-way) to balance child-initiated exploration with structured learning under NCF 2005 guidelines.',
    interactionType: 'play-way-designer',
    nodeId: 'c12_bio_cbse_119',
  },
];

const PREDICTION_QUESTIONS: PredictionQuestion[] = [
  {
    question: 'Predict what happens when a 14-month-old toddler experiences a hidden toy placed behind an opaque barrier in Piagetian testing:',
    options: [
      'The child immediately forgets the toy exists because object permanence is absent until 48 months',
      'The child searches actively for the hidden toy because basic object permanence develops between 8–12 months',
      'The child experiences immediate panic and regression in motor skills',
      'The child shows preoperational symbolic representation and draws a schematic map of the toy',
    ],
    correctIndex: 1,
    verifyInstruction: 'Use Lab 1 to set age to 14 months and observe cognitive milestone output.',
    nodeId: 'c12_bio_cbse_111',
  },
  {
    question: 'Predict the outcome when a teacher provides prompt hints and physical guidance (scaffolding) to a 4-year-old child struggling with a 12-piece puzzle:',
    options: [
      'The child becomes completely dependent and unable to solve puzzles independently',
      'The child moves from their actual development level into the Zone of Proximal Development, achieving mastery',
      'The child immediately jumps to formal operational abstract mathematical thinking',
      'The child develops stranger anxiety toward the educator',
    ],
    correctIndex: 1,
    verifyInstruction: 'Use Lab 3 to test Scaffolding sliders in the Vygotskian interactive module.',
    nodeId: 'c12_bio_cbse_112',
  },
];

const OBSERVATION_QUESTIONS: ObservationQuestion[] = [
  {
    question: 'What do you notice about fine motor control when moving from infancy (6 months) to late preschool age (60 months)?',
    options: [
      'Motor control develops from distal fingers first to proximal shoulder joints later',
      'Development follows a Cephalocaudal and Proximodistal pattern, shifting from crude palmar grasp to refined pincer grasp and pencil control',
      'Fine motor skills deteriorate as language acquisition accelerates',
      'Fine motor mastery precedes gross motor trunk stabilization',
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_102',
  },
  {
    question: 'What happens when supplementary nutrition and health checkups are integrated alongside ECCE preschool activities in Anganwadi centers?',
    options: [
      'Nutritional levels increase but cognitive development drops due to overburdening',
      'Holistic child development improves significantly, reducing stunting, malnutrition, and school dropouts',
      'Preschool attendance plummets because mothers prefer isolated home care',
      'Child immunization rates drop due to conflict in scheduling',
    ],
    correctIndex: 1,
    nodeId: 'c12_bio_cbse_120',
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'Anganwadi Integrated ECCE Master Planning Task',
  description: 'As a District Child Development Project Officer (CDPO), you must audit an underserved rural Anganwadi Center serving 50 children aged 0-6 years and redesign its operations under NCF 2005 and ICDS directives.',
  steps: [
    'Assess nutritional status: Identify underweight/stunted children and allocate daily supplementary nutrition (500 kcal, 12-15g protein per child).',
    'Schedule Immunization & Health Days: Collaborate with ANM (Auxiliary Nurse Midwife) for routine vaccinations and Vitamin A dosage.',
    'Establish Play-Way Learning Corner: Create low-cost/no-cost sensorial and story-building play materials using local cultural items.',
    'Formulate Parent-Caregiver Workshop: Conduct monthly guidance sessions on responsive caregiving, stranger anxiety management, and positive discipline.',
  ],
};

const MISCONCEPTIONS: MisconceptionItem[] = [
  {
    id: 'misc_1',
    nodeId: 'c12_bio_cbse_108',
    statement: 'Preschool education is primarily meant to teach formal reading, writing, and arithmetic drills.',
    correction: 'ECCE/Preschool education emphasizes holistic development through play, sensory exploration, language rich environments, and social interaction, avoiding early formal academic pressure.',
  },
  {
    id: 'misc_2',
    nodeId: 'c12_bio_cbse_106',
    statement: 'Stranger anxiety in infants is a sign of poor emotional development or bad parenting.',
    correction: 'Stranger anxiety is a healthy, normal developmental milestone (around 6-12 months) indicating clear attachment formation and object permanence/person permanence.',
  },
  {
    id: 'misc_3',
    nodeId: 'c12_bio_cbse_111',
    statement: 'Young preschoolers (ages 2-5) think logically just like adults but simply lack vocabulary.',
    correction: 'According to Piaget, preschoolers are in the Preoperational stage characterized by egocentrism, animism, and centration, meaning their cognitive structure is qualitatively different from adult logic.',
  },
  {
    id: 'misc_4',
    nodeId: 'c12_bio_cbse_120',
    statement: 'Anganwadi centers are only feeding centers for poor malnourished children.',
    correction: 'Anganwadi centers under ICDS are comprehensive focal points delivering an integrated package of 6 services: nutrition, immunization, health checkups, referral services, ECCE, and health/nutrition education.',
  },
  {
    id: 'misc_5',
    nodeId: 'c12_bio_cbse_112',
    statement: 'Vygotsky’s Scaffolding means the teacher should do the task for the child whenever they struggle.',
    correction: 'Scaffolding provides temporary, calibrated support tailored to the child’s ZPD, gradually withdrawing assistance as the child gains independent mastery.',
  },
  {
    id: 'misc_6',
    nodeId: 'c12_bio_cbse_100',
    statement: 'Human Development and Family Studies (HDFS) is purely a theoretical social science with no clinical or biological applications.',
    correction: 'HDFS is an interdisciplinary academic field combining developmental biology, neuroscience, psychology, and sociology to optimize human potential across the lifespan.',
  },
];

const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    nodeId: 'c12_bio_cbse_100',
    question: 'Human Development and Family Studies (HDFS) is best defined as an academic discipline that:',
    options: [
      'Focuses exclusively on economic income distributions in urban families',
      'Studies human growth, behavior, relationships, and context systematically across the entire lifespan',
      'Teaches secondary school students standard home economics cooking techniques',
      'Investigates wildlife population dynamics',
    ],
    correctIndex: 1,
    explanation: 'HDFS is a multidisciplinary field exploring physical, cognitive, socio-emotional, and family systemic development throughout life.',
  },
  {
    id: 'diag_2',
    nodeId: 'c12_bio_cbse_101',
    question: 'What is a core emphasis of the National Curriculum Framework (NCF 2005) regarding Early Childhood Care and Education?',
    options: [
      'Conducting board examinations for children at 5 years of age',
      'Promoting play-based, child-centered, stress-free learning that respects individual child growth rates',
      'Enforcing strict English-only instruction in all preschools',
      'Replacing physical play with electronic screen-based learning',
    ],
    correctIndex: 1,
    explanation: 'NCF 2005 mandates child-centered, play-way, holistic ECCE without early formal academic stress.',
  },
  {
    id: 'diag_3',
    nodeId: 'c12_bio_cbse_103',
    question: 'Infancy is defined as the developmental period spanning:',
    options: [
      'Conception to 28 days of life',
      'Birth to approximately 1 year (12 months) of age',
      '2 years to 6 years of age',
      '6 years to 12 years of age',
    ],
    correctIndex: 1,
    explanation: 'Infancy covers birth up to 1 year of life (0-12 months). The first 28 days specifically constitute the neonatal period.',
  },
  {
    id: 'diag_4',
    nodeId: 'c12_bio_cbse_106',
    question: 'According to John Bowlby and Mary Ainsworth, "Secure Attachment" in an infant is demonstrated when:',
    options: [
      'The infant shows zero distress when left with a stranger and ignores the returning mother',
      'The infant uses the caregiver as a safe base for exploration, shows distress on separation, and is easily comforted upon reunion',
      'The infant resists all physical contact with parents at all times',
      'The infant cries uncontrollably continuously regardless of caregiver comforting',
    ],
    correctIndex: 1,
    explanation: 'Secure attachment is marked by using the caregiver as a secure base, experiencing manageable distress, and seeking reunion comfort.',
  },
  {
    id: 'diag_5',
    nodeId: 'c12_bio_cbse_110',
    question: 'The Play-Way Method of learning in ECCE is effective primarily because:',
    options: [
      'It allows adults to avoid preparing formal lesson plans',
      'It aligns with natural intrinsic motivation, fostering physical, cognitive, language, and social learning simultaneously',
      'It ensures children memorize mathematical formulas before age 3',
      'It eliminates the need for any adult supervision',
    ],
    correctIndex: 1,
    explanation: 'Play is the natural medium through which young children explore, experiment, problem-solve, and internalize concepts.',
  },
  {
    id: 'diag_6',
    nodeId: 'c12_bio_cbse_111',
    question: 'Piaget’s concept of "Egocentrism" during the Preoperational stage (ages 2-7) refers to:',
    options: [
      'Selfish behavior caused by poor parental discipline',
      'Inability of the young child to take or understand another person’s physical or conceptual perspective',
      'Superior abstract reasoning ability',
      'Focusing on multiple dimensions of an object simultaneously',
    ],
    correctIndex: 1,
    explanation: 'Egocentrism in Piagetian terms means the child assumes everyone sees, hears, and feels exactly what the child does.',
  },
  {
    id: 'diag_7',
    nodeId: 'c12_bio_cbse_119',
    question: 'A key characteristic of Maria Montessori’s approach to early childhood education is:',
    options: [
      'Teacher-led lecturing for 4 hours daily',
      'Prepared environment with self-correcting sensory materials allowing self-directed learning',
      'Complete absence of sensory materials or physical objects',
      'Frequent competitive exams among toddlers',
    ],
    correctIndex: 1,
    explanation: 'Montessori uses a prepared environment filled with self-correcting didactic materials that promote independent learning.',
  },
  {
    id: 'diag_8',
    nodeId: 'c12_bio_cbse_120',
    question: 'The Integrated Child Development Services (ICDS) scheme in India delivers services through:',
    options: [
      'Centralized AI-based automated portals',
      'Anganwadi Centers located at the village/community level',
      'Private boarding schools in urban hubs',
      'District tertiary care hospitals exclusively',
    ],
    correctIndex: 1,
    explanation: 'ICDS operates through grass-root Anganwadi Centers managed by Anganwadi Workers and Helpers in rural and urban slum communities.',
  },
];

const CHALLENGES: ChallengeItem[] = [
  // Foundation Tiers (7)
  {
    id: 'chal_1',
    nodeId: 'c12_bio_cbse_100',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'Why is Human Development and Family Studies (HDFS) categorized as an interdisciplinary academic field?',
    options: [
      'Because it only studies economic policies of national banks',
      'Because it integrates principles from biology, psychology, sociology, and education to understand human growth across life stages',
      'Because it is restricted to high school home economics classes',
      'Because it replaces medical genetics in healthcare',
    ],
    correctIndex: 1,
    explanation: 'HDFS draws from biological maturation, socio-cultural contexts, and psychological dynamics to build a holistic model of human lifespan growth.',
    hints: ['Think about what components influence a growing child.', 'Does human growth depend on biology, environment, and psychology together?', 'Interdisciplinary means drawing from multiple fields.'],
  },
  {
    id: 'chal_2',
    nodeId: 'c12_bio_cbse_101',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the primary vision of NCF 2005 regarding early childhood learning environment?',
    options: [
      'Rote memorization of nursery rhymes and numbers',
      'Stress-free, child-centered, inclusive environment fostering natural curiosity and joy',
      'Rigid timetables with mandatory written homework',
      'Standardized IQ testing for admission into nursery',
    ],
    correctIndex: 1,
    explanation: 'NCF 2005 emphasizes that early learning must be non-stressful, play-based, child-centered, and responsive to each child’s developmental pace.',
    hints: ['Is early childhood education supposed to be joyful or stressful?', 'What does child-centered mean?', 'Recall NCF 2005 core principles.'],
  },
  {
    id: 'chal_3',
    nodeId: 'c12_bio_cbse_102',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which sequence correctly lists the developmental stages of early childhood in order?',
    options: [
      'Preschool → Infancy → Neonatal → Toddlerhood',
      'Neonatal period (0-28 days) → Infancy (1-12 months) → Toddlerhood (1-3 years) → Preschool years (3-6 years)',
      'Toddlerhood → Infancy → Adolescence → Preschool',
      'Infancy → Preschool → Toddlerhood → Middle Childhood',
    ],
    correctIndex: 1,
    explanation: 'Early childhood development progresses chronologically from neonatal to infancy, toddlerhood, and the preschool period.',
    hints: ['What comes right after birth?', 'When does toddlerhood start?', 'Preschool follows toddlerhood.'],
  },
  {
    id: 'chal_4',
    nodeId: 'c12_bio_cbse_103',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Which of the following physical milestones is typically achieved during infancy (0-12 months)?',
    options: [
      'Riding a two-wheeled bicycle',
      'Cephalocaudal control progressing from head holding (3 months) to sitting (6-8 months) and crawling/standing (9-12 months)',
      'Writing fluid cursive handwriting',
      'Tying complex shoelaces independently',
    ],
    correctIndex: 1,
    explanation: 'Infants gain motor control from head to toe (cephalocaudal): lifting head first, then sitting with support, and finally crawling/standing.',
    hints: ['Cephalocaudal means head-to-tail development.', 'Can infants ride bicycles or write?', 'Head control comes before sitting.'],
  },
  {
    id: 'chal_5',
    nodeId: 'c12_bio_cbse_104',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Toddlerhood (ages 1 to 3 years) is primarily characterized by rapid development in which area?',
    options: [
      'Occupational career planning',
      'Autonomy, independent walking/running, basic language acquisition, and toilet training readiness',
      'Formal abstract philosophical debate',
      'Biological puberty and secondary sexual characteristics',
    ],
    correctIndex: 1,
    explanation: 'Toddlerhood is defined by Erikson’s stage of Autonomy vs. Shame/Doubt, along with major strides in locomotion and emerging speech.',
    hints: ['Toddlers are famous for wanting to "do it myself!".', 'Think about walking and early sentences.', 'Autonomy is key.'],
  },
  {
    id: 'chal_6',
    nodeId: 'c12_bio_cbse_105',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'The term "Developmental Milestone" refers to:',
    options: [
      'A fixed age by which every child must score 100% on standard exams',
      'A key physical, cognitive, language, or social skill that most children achieve within a predictable age range',
      'The exact height in centimeters a child achieves every month',
      'A financial grant given to mothers at birth',
    ],
    correctIndex: 1,
    explanation: 'Developmental milestones represent average functional skill markers across age spans, serving as guideposts for healthy growth.',
    hints: ['Is it a functional skill marker?', 'Milestones guide growth expectations.', 'They encompass physical, cognitive, and social domains.'],
  },
  {
    id: 'chal_7',
    nodeId: 'c12_bio_cbse_106',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'Stranger anxiety typically peaks in infants around which age range?',
    options: [
      '0 to 1 month',
      '6 to 12 months',
      '4 to 5 years',
      '10 to 12 years',
    ],
    correctIndex: 1,
    explanation: 'Stranger anxiety emerges around 6-8 months and peaks around 8-12 months as infants develop specific attachments and differentiate familiar faces.',
    hints: ['When does person permanence fully solidify?', 'It usually starts in the second half of the first year.', '6-12 months is the key window.'],
  },

  // Standard Tiers (8)
  {
    id: 'chal_8',
    nodeId: 'c12_bio_cbse_107',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'A working parent needs child care for their 2-year-old that provides a safe environment, caregiver-child ratio of 1:5, and rich social interaction. Which child care arrangement best fulfills this requirement?',
    options: [
      'Unsupervised home play',
      'A certified Crèche / Daycare center with trained ECCE caregivers',
      'Formal primary boarding school',
      'Leaving the child with screen devices all day',
    ],
    correctIndex: 1,
    explanation: 'A registered Crèche/Daycare provides structured care, trained staff, appropriate adult-child ratios, and peer social interaction for young children.',
    hints: ['What facility is designed for infants and toddlers of working parents?', 'Look for trained ECCE staff and appropriate ratios.', 'Crèche / Daycare.'],
  },
  {
    id: 'chal_9',
    nodeId: 'c12_bio_cbse_108',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is early childhood considered a "critical period" (or sensitive window) for brain and language development?',
    options: [
      'Because the brain stops growing completely after age 6',
      'Because neuroplasticity and synaptic formation peak during 0-6 years, making brain architecture highly responsive to environmental enrichment',
      'Because children cannot learn language after age 7',
      'Because bones fuse completely by age 4',
    ],
    correctIndex: 1,
    explanation: 'Over 1 million new neural connections form per second in early childhood, making early stimulation crucial for lifelong neural pathways.',
    hints: ['Think about neural plasticity and synapse creation.', 'Why are the first 6 years called foundational?', 'High neuroplasticity.'],
  },
  {
    id: 'chal_10',
    nodeId: 'c12_bio_cbse_109',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In a Child-Centered approach to early learning, what is the role of the ECCE educator?',
    options: [
      'Lecturing at the blackboard while children sit silently in rows',
      'Acting as a facilitator who plans rich learning environments and responds to children’s individual interests and needs',
      'Strictly enforcing drill worksheets and punishing errors',
      'Allowing complete chaos without any planned environment or guidance',
    ],
    correctIndex: 1,
    explanation: 'Child-centered learning positions the educator as a facilitator and observer who designs environments that invite active discovery.',
    hints: ['Is the teacher a dictator or a facilitator?', 'Child-centered means guiding from behind.', 'Facilitating active discovery.'],
  },
  {
    id: 'chal_11',
    nodeId: 'c12_bio_cbse_110',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'When children engage in socio-dramatic play (e.g., playing "doctor" or "house"), which developmental benefits are simultaneously achieved?',
    options: [
      'Only muscle exercise without cognitive impact',
      'Language expansion, perspective-taking (theory of mind), emotional regulation, and social problem-solving',
      'Instant mastery of high school biology topics',
      'Rote memorization of spelling lists',
    ],
    correctIndex: 1,
    explanation: 'Socio-dramatic play integrates multiple domains: role-play requires communication, negotiating roles builds self-regulation, and shared narrative builds cognition.',
    hints: ['What skills do children use when pretending to be doctor or parent?', 'Language, emotion, social negotiation, and imagination.', 'Multi-domain integration.'],
  },
  {
    id: 'chal_12',
    nodeId: 'c12_bio_cbse_111',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A 3-year-old child insists that pouring juice from a tall narrow glass into a short wide glass means there is now "less juice". According to Piaget, this demonstrates:',
    options: [
      'Formal operational deduction',
      'Centration and lack of conservation in the Preoperational Stage',
      'Sensorimotor reflex action',
      'Concrete operational reversibility',
    ],
    correctIndex: 1,
    explanation: 'Preoperational children focus on one salient dimension (height) while ignoring width—a cognitive characteristic known as centration.',
    hints: ['The child focuses only on height.', 'Focusing on one feature is called centration.', 'Preoperational stage trait.'],
  },
  {
    id: 'chal_13',
    nodeId: 'c12_bio_cbse_112',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'According to Vygotsky, what is the "Zone of Proximal Development" (ZPD)?',
    options: [
      'The distance between what a child can do independently and what they can achieve with guidance from a More Knowledgeable Other (MKO)',
      'The physical play area inside a preschool classroom',
      'The maximum physical height a child can reach',
      'The age zone where children cannot learn anything new',
    ],
    correctIndex: 0,
    explanation: 'ZPD is the sweet spot of learning where tasks are slightly beyond independent capability but achievable with temporary scaffolding.',
    hints: ['It represents potential growth with assistance.', 'Difference between independent level and guided level.', 'Core concept of Vygotsky.'],
  },
  {
    id: 'chal_14',
    nodeId: 'c12_bio_cbse_113',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Why is it critical to incorporate local cultural context, regional stories, and native languages into ECCE curricula in India?',
    options: [
      'To make learning confusing for toddlers',
      'Because meaningful learning occurs when new concepts connect to the child’s familiar socio-cultural lived experiences and mother tongue',
      'To standardise global curricula into a single language',
      'Because children under 5 cannot understand non-local stories',
    ],
    correctIndex: 1,
    explanation: 'Vygotsky and NCF 2005 emphasize that cognitive and socio-emotional development are deeply embedded in the child’s socio-cultural environment.',
    hints: ['Does learning work best when rooted in familiar culture?', 'Mother tongue provides emotional security and cognitive linkage.', 'Socio-cultural contextualization.'],
  },
  {
    id: 'chal_15',
    nodeId: 'c12_bio_cbse_114',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'Which of the following aligns directly with the NCF 2005 objectives for ECCE?',
    options: [
      'Introducing annual grade promotion exams for 4-year-olds',
      'Ensuring overall holistic development (physical, motor, cognitive, language, emotional, and social) through play and activity-based learning',
      'Enforcing 3 hours of mandatory homework daily',
      'Eliminating outdoor play to increase classroom desk work',
    ],
    correctIndex: 1,
    explanation: 'NCF 2005 mandates holistic developmental goals through play, activity, and experiential learning, banning formal exams in ECCE.',
    hints: ['Does NCF 2005 favor holistic play or exams?', 'Target all domains of child growth.', 'Holistic development.'],
  },

  // Advanced Tiers (7)
  {
    id: 'chal_16',
    nodeId: 'c12_bio_cbse_115',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Evaluate this scenario: An ECCE teacher notices a 4-year-old child unable to hold a pencil to draw a circle. Applying the Guiding Principles of ECCE, what is the best pedagogical intervention?',
    options: [
      'Force the child to practice handwriting drills for 2 hours until their hand aches',
      'Strengthen fine-motor finger muscles first using playdough moulding, bead stringing, and threading activities before reintroducing drawing tools',
      'Label the child as developmentally delayed and remove them from class',
      'Ignore fine motor development completely as it will fix itself spontaneously',
    ],
    correctIndex: 1,
    explanation: 'ECCE principles mandate developmentally appropriate practice: building prerequisite motor strength through engaging sensory play before fine pencil tasks.',
    hints: ['Should you force pencil practice or build finger muscle strength through fun play?', 'Playdough and bead stringing build fine motor control.', 'Developmentally appropriate practice.'],
  },
  {
    id: 'chal_17',
    nodeId: 'c12_bio_cbse_116',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'Which combination of professional skills and personal qualities is essential for an ECCE professional?',
    options: [
      'Strict authoritarian discipline, loud vocal projection, high speed lectures',
      'Patience, active observation skills, empathy, knowledge of child development milestones, and creativity in designing play materials',
      'Advanced skills in corporate finance and high school calculus',
      'Indifference to child emotional needs and reliance on digital screens',
    ],
    correctIndex: 1,
    explanation: 'ECCE professionals require deep developmental knowledge combined with empathy, observational acumen, patience, and creative activity design.',
    hints: ['What traits help a teacher understand and support small children?', 'Empathy, patience, and milestone knowledge.', 'Professional ECCE competencies.'],
  },
  {
    id: 'chal_18',
    nodeId: 'c12_bio_cbse_117',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Which career preparation pathway equips an individual to become a specialized ECCE Program Director or Child Development Specialist in India?',
    options: [
      'Degree in Mechanical Engineering followed by IT certification',
      'B.Sc. / B.A. in Human Development / Home Science followed by Master’s or Diploma in Early Childhood Care & Education (ECCE)',
      'Diploma in Corporate Accounting',
      'Short 2-day computer keyboarding course',
    ],
    correctIndex: 1,
    explanation: 'Professional specialization in HDFS/ECCE through higher education degrees (B.Sc./M.Sc. HDFS, Post-Graduate ECCE Diplomas) provides academic and practical rigor.',
    hints: ['Look for academic programs in Human Development or ECCE.', 'B.Sc./M.Sc. HDFS or PGD ECCE.', 'Specialized developmental qualification.'],
  },
  {
    id: 'chal_19',
    nodeId: 'c12_bio_cbse_118',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'An ECCE graduate is assessing career opportunities. Which array of professional roles is available within the scope of ECCE and HDFS?',
    options: [
      'Only high school physics laboratory technician',
      'Preschool Educator, Anganwadi Supervisor, ECCE Curriculum Designer, Daycare Center Manager, NGO Child Welfare Consultant, and Child Specialist Researcher',
      'Exclusive focus on commercial civil aviation',
      'Surgical assistant in neurosurgery units only',
    ],
    correctIndex: 1,
    explanation: 'ECCE/HDFS offers broad career avenues spanning institutional teaching, social welfare leadership (ICDS), policy development, entrepreneurship (daycare/preschools), and advocacy.',
    hints: ['Where can ECCE experts work?', 'Think about preschools, Anganwadis, NGOs, and curriculum design.', 'Diverse developmental roles.'],
  },
  {
    id: 'chal_20',
    nodeId: 'c12_bio_cbse_119',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'How does Maria Montessori’s concept of "Sensorial Materials" (e.g., pink tower, cylinder blocks) enhance early cognitive development?',
    options: [
      'By forcing children to memorize abstract chemical periodic tables',
      'By providing auto-didactic (self-correcting) concrete objects that allow children to isolate visual, tactile, and spatial variables through direct manipulation',
      'By serving as passive decorative ornaments in the classroom',
      'By replacing all physical objects with virtual computer simulations',
    ],
    correctIndex: 1,
    explanation: 'Montessori sensory materials isolate specific attributes (size, weight, pitch, color gradient), enabling self-correcting hands-on sensory refinement.',
    hints: ['What does self-correcting / auto-didactic mean?', 'Concrete manipulation leads to mental abstraction.', 'Isolates sensory attributes.'],
  },
  {
    id: 'chal_21',
    nodeId: 'c12_bio_cbse_120',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Synthesize the core mandate of Integrated Child Development Services (ICDS) launched in India in 1975. Which 6 services constitute its integrated package?',
    options: [
      'High school scholarships, driver training, tax exemption, bank loans, pension, housing',
      'Supplementary Nutrition, Immunization, Health Check-ups, Referral Services, Non-formal Pre-school Education, and Nutrition & Health Education',
      'Military recruitment, sports coaching, adult literacy, college loans, road building, electrification',
      'Surgical treatment, tertiary organ transplant, high school exams, career counseling, foreign scholarships, trade permits',
    ],
    correctIndex: 1,
    explanation: 'ICDS is one of the world’s largest flagship programs delivering 6 integrated services targeting pregnant/lactating mothers and children under 6 years.',
    hints: ['What 6 health and education services are given at Anganwadis?', 'Nutrition, immunization, health checkup, referral, ECCE, health education.', 'ICDS 6-service package.'],
  },
  {
    id: 'chal_22',
    nodeId: 'c12_bio_cbse_121',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Design an optimal daily learning schedule for 4-year-old preschoolers that honors NCF 2005 and child developmental science:',
    options: [
      '4 hours continuous blackboard lecturing followed by 2 hours of written quiet exam testing',
      'Welcome Circle & Conversation → Free Play in Sensory Corners → Guided Small-Group Activity → Outdoor Motor Play → Snack & Social Time → Storytelling & Departure',
      'Unsupervised computer screen viewing for 6 hours straight',
      'Physical endurance running for 5 hours without breaks or storytelling',
    ],
    correctIndex: 1,
    explanation: 'A balanced ECCE schedule alternates active and quiet play, individual exploration and group interaction, moving smoothly between sensory, physical, and socio-emotional activities.',
    hints: ['Does a good schedule alternate movement, play, snacks, and stories?', 'Look for a balanced rhythm of free play, guided group work, outdoor play, and circle time.', 'Holistic ECCE timetable.'],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const MilestonesDiagram: React.FC<{ ageMonths: number }> = ({ ageMonths }) => {
  // Determine physical/cognitive status based on age
  const getStageTitle = (m: number) => {
    if (m <= 1) return 'Neonatal Stage (0-1 mo)';
    if (m <= 12) return 'Infancy (1-12 mo)';
    if (m <= 36) return 'Toddlerhood (1-3 yrs)';
    return 'Preschool Stage (3-6 yrs)';
  };

  const getMotorDetail = (m: number) => {
    if (m <= 3) return 'Reflexive movements, holds head up briefly when prone';
    if (m <= 6) return 'Rolls over, sits with support, palmar reach';
    if (m <= 12) return 'Sits independently, crawls, pincer grasp, stands alone';
    if (m <= 24) return 'Walks independently, runs awkwardly, stacks 4-6 blocks';
    if (m <= 36) return 'Jumps with both feet, rides tricycle, uses spoon';
    if (m <= 48) return 'Hops on one foot, cuts with safety scissors, draws circle';
    return 'Skips, ties shoes, writes simple letters, refined pincer control';
  };

  const getCognitiveDetail = (m: number) => {
    if (m <= 6) return 'Tracks moving objects, prefers human faces (Sensorimotor)';
    if (m <= 12) return 'Develops Object Permanence, searches for hidden objects';
    if (m <= 24) return 'Symbolic play begins, basic cause and effect understanding';
    if (m <= 36) return 'Preoperational Stage: Egocentrism, simple categorization';
    if (m <= 48) return 'Pre-causal reasoning, creative pretend play, counts 1-5';
    return 'Intuitive thought, basic sorting by 2 attributes, early phonics';
  };

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-cyan-500/30 text-white my-4 shadow-xl">
      <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
        <h4 className="text-cyan-400 font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2-4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
          Developmental Milestone Dynamic Visualizer
        </h4>
        <span className="bg-cyan-950 text-cyan-300 px-3 py-1 rounded-full text-xs font-semibold border border-cyan-700">
          Age: {ageMonths} Months ({ (ageMonths/12).toFixed(1) } yrs)
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG Graphic Representation */}
        <div className="relative bg-slate-950 rounded-lg p-3 flex justify-center items-center min-h-[220px]">
          <svg viewBox="0 0 400 220" className="w-full h-full max-h-[220px]">
            {/* Background Grid Lines */}
            <line x1="40" y1="180" x2="360" y2="180" stroke="#334155" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="180" stroke="#334155" strokeWidth="2" />
            <text x="35" y="15" fill="#94a3b8" fontSize="10">Development Score</text>
            <text x="360" y="195" fill="#94a3b8" fontSize="10">Age (Months)</text>

            {/* Growth Curve */}
            <path
              d="M 40 170 Q 120 150, 180 110 T 360 30"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="4"
              strokeDasharray="4 2"
            />

            {/* Stage Milestone Markers */}
            <circle cx="50" cy="168" r="6" fill={ageMonths <= 1 ? '#e0f2fe' : '#0284c7'} />
            <circle cx="110" cy="148" r="6" fill={ageMonths > 1 && ageMonths <= 12 ? '#e0f2fe' : '#0284c7'} />
            <circle cx="180" cy="110" r="6" fill={ageMonths > 12 && ageMonths <= 36 ? '#e0f2fe' : '#0284c7'} />
            <circle cx="330" cy="40" r="6" fill={ageMonths > 36 ? '#e0f2fe' : '#0284c7'} />

            {/* Interactive Dynamic Indicator Marker */}
            {(() => {
              const xPos = 40 + (ageMonths / 72) * 320;
              const yPos = 170 - (ageMonths / 72) * 140;
              return (
                <g>
                  <circle cx={xPos} cy={yPos} r="12" fill="#06b6d4" opacity="0.3" className="animate-ping" />
                  <circle cx={xPos} cy={yPos} r="8" fill="#22d3ee" stroke="#ffffff" strokeWidth="2" />
                  <line x1={xPos} y1={yPos} x2={xPos} y2="180" stroke="#06b6d4" strokeWidth="1" strokeDasharray="2 2" />
                </g>
              );
            })()}

            {/* Stage Labels */}
            <text x="50" y="200" fill="#94a3b8" fontSize="9" textAnchor="middle">0-1m</text>
            <text x="110" y="200" fill="#94a3b8" fontSize="9" textAnchor="middle">12m</text>
            <text x="180" y="200" fill="#94a3b8" fontSize="9" textAnchor="middle">36m</text>
            <text x="330" y="200" fill="#94a3b8" fontSize="9" textAnchor="middle">72m</text>
          </svg>
        </div>

        {/* Dynamic Text Information Cards */}
        <div className="space-y-3">
          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <span className="text-xs uppercase tracking-wider text-cyan-400 font-bold block mb-1">
              Current Stage: {getStageTitle(ageMonths)}
            </span>
            <div className="text-sm text-slate-200">
              <strong className="text-amber-400">Motor & Physical:</strong> {getMotorDetail(ageMonths)}
            </div>
          </div>

          <div className="bg-slate-800/80 p-3 rounded-lg border border-slate-700">
            <div className="text-sm text-slate-200">
              <strong className="text-emerald-400">Cognitive & Sensory:</strong> {getCognitiveDetail(ageMonths)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PiagetVygotskyDiagram: React.FC<{ scaffoldingLevel: number; taskDifficulty: number }> = ({ scaffoldingLevel, taskDifficulty }) => {
  // Determine ZPD state
  // actual development = taskDifficulty <= 30
  // ZPD = taskDifficulty between 31 and 75
  // Frustration = taskDifficulty > 75
  const isZPD = taskDifficulty >= 30 && taskDifficulty <= 75;
  const isFrustration = taskDifficulty > 75;
  const isTooEasy = taskDifficulty < 30;

  const getZPDStatus = () => {
    if (isTooEasy) return { label: 'Zone of Actual Development (Too Easy)', color: 'text-emerald-400' };
    if (isZPD && scaffoldingLevel >= 40) return { label: 'Optimal ZPD Scaffolding! Child achieves mastery.', color: 'text-cyan-400' };
    if (isZPD && scaffoldingLevel < 40) return { label: 'In ZPD but needs higher teacher scaffolding!', color: 'text-amber-400' };
    return { label: 'Zone of Frustration (Beyond current capacity)', color: 'text-rose-400' };
  };

  const status = getZPDStatus();

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-indigo-500/30 text-white my-4 shadow-xl">
      <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
        <h4 className="text-indigo-400 font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Vygotsky’s Zone of Proximal Development (ZPD) & Scaffolding
        </h4>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
        {/* SVG ZPD Concentric Circles Diagram */}
        <div className="relative bg-slate-950 rounded-lg p-3 flex justify-center items-center min-h-[220px]">
          <svg viewBox="0 0 300 220" className="w-full h-full max-h-[220px]">
            {/* Outer Zone - Frustration */}
            <circle cx="150" cy="110" r="95" fill="#f43f5e" fillOpacity={isFrustration ? "0.35" : "0.1"} stroke="#f43f5e" strokeWidth="2" />
            <text x="150" y="30" fill="#fda4af" fontSize="10" textAnchor="middle" fontWeight="bold">Beyond Reach (Frustration Zone)</text>

            {/* Middle Zone - ZPD */}
            <circle cx="150" cy="110" r="65" fill="#06b6d4" fillOpacity={isZPD ? "0.4" : "0.15"} stroke="#06b6d4" strokeWidth="2" strokeDasharray="4 2" />
            <text x="150" y="62" fill="#67e8f9" fontSize="10" textAnchor="middle" fontWeight="bold">ZPD (Can do with Scaffolding)</text>

            {/* Inner Zone - Independent Mastery */}
            <circle cx="150" cy="110" r="35" fill="#10b981" fillOpacity={isTooEasy ? "0.5" : "0.2"} stroke="#10b981" strokeWidth="2" />
            <text x="150" y="114" fill="#a7f3d0" fontSize="9" textAnchor="middle" fontWeight="bold">Independent</text>

            {/* Current Position Marker */}
            {(() => {
              const rPos = (taskDifficulty / 100) * 90;
              return (
                <circle cx={150 + rPos * 0.7} cy={110 - rPos * 0.7} r="7" fill="#fbbf24" stroke="#ffffff" strokeWidth="2" />
              );
            })()}
          </svg>
        </div>

        {/* Status display */}
        <div className="space-y-3">
          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700">
            <span className="text-xs text-slate-400 block mb-1">Current Learning Assessment</span>
            <span className={`text-base font-bold ${status.color}`}>{status.label}</span>
          </div>

          <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 space-y-1 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Task Difficulty Level:</span>
              <span className="font-bold text-cyan-300">{taskDifficulty}%</span>
            </div>
            <div className="flex justify-between">
              <span>Caregiver Scaffolding:</span>
              <span className="font-bold text-indigo-300">{scaffoldingLevel}%</span>
            </div>
            <p className="pt-2 text-slate-400 text-[11px] leading-relaxed">
              *Scaffolding provides hints, verbal prompts, and physical demonstrations tailored to the child’s active ZPD.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AnganwadiICDSDiagram: React.FC<{ nutrition: number; health: number; ecce: number }> = ({ nutrition, health, ecce }) => {
  const overallEfficiency = Math.round((nutrition + health + ecce) / 3);

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-emerald-500/30 text-white my-4 shadow-xl">
      <div className="flex justify-between items-center mb-2 border-b border-slate-700 pb-2">
        <h4 className="text-emerald-400 font-bold text-lg flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m0 0h6m-6 0V11m6 0v10m6-11H7" />
          </svg>
          Integrated Child Development Services (ICDS) Anganwadi Model
        </h4>
        <span className="bg-emerald-950 text-emerald-300 px-3 py-1 rounded-full text-xs font-semibold border border-emerald-700">
          Center Performance Index: {overallEfficiency}%
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 my-2">
        {/* Service 1: Nutrition */}
        <div className="bg-slate-800/90 p-3 rounded-lg border border-amber-500/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-amber-400">1. Supplementary Nutrition</span>
            <span className="text-xs font-mono text-amber-300">{nutrition}%</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-amber-400 h-full transition-all duration-300" style={{ width: `${nutrition}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-300 mt-2">500 kcal & 12-15g protein per child; combats stunting and anemia.</p>
        </div>

        {/* Service 2: Health & Immunization */}
        <div className="bg-slate-800/90 p-3 rounded-lg border border-rose-500/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-rose-400">2. Health & Immunization</span>
            <span className="text-xs font-mono text-rose-300">{health}%</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-rose-400 h-full transition-all duration-300" style={{ width: `${health}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-300 mt-2">Routine vaccinations, deworming, growth monitoring, ANM referral.</p>
        </div>

        {/* Service 3: ECCE Preschool */}
        <div className="bg-slate-800/90 p-3 rounded-lg border border-cyan-500/40">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-bold text-cyan-400">3. Non-Formal ECCE</span>
            <span className="text-xs font-mono text-cyan-300">{ecce}%</span>
          </div>
          <div className="w-full bg-slate-700 h-2 rounded-full overflow-hidden">
            <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${ecce}%` }}></div>
          </div>
          <p className="text-[11px] text-slate-300 mt-2">Play-way learning, storytelling, sensory corners for children 3-6 years.</p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================

export const C12_BiologyEarlyChildhoodCareCBSESim: React.FC<ECCESimProps> = ({
  onComplete,
  initialNodeId = 'c12_bio_cbse_100',
}) => {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'diagnostic' | 'summary'>('discovery');

  // Interactive Lab Exploration Controls
  const [labAgeMonths, setLabAgeMonths] = useState<number>(24);
  const [scaffoldingVal, setScaffoldingVal] = useState<number>(50);
  const [taskDifficultyVal, setTaskDifficultyVal] = useState<number>(50);

  // Anganwadi Resource Allocator State
  const [angNutrition, setAngNutrition] = useState<number>(70);
  const [angHealth, setAngHealth] = useState<number>(80);
  const [angECCE, setAngECCE] = useState<number>(65);

  // Challenge Mode State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [challengeCompleted, setChallengeCompleted] = useState<boolean>(false);

  // Discovery / Diagnostic State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  const [diagnosticIndex, setDiagnosticIndex] = useState<number>(0);
  const [diagnosticSelected, setDiagnosticSelected] = useState<number | null>(null);
  const [diagnosticScore, setDiagnosticScore] = useState<number>(0);
  const [diagnosticComplete, setDiagnosticComplete] = useState<boolean>(false);

  // Gamification & Feedback State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [successBannerText, setSuccessBannerText] = useState<string>('');
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Hint State
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintIndex, setCurrentHintIndex] = useState<number>(0);

  // Mastery Tracking (BKT & SM-2)
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, ReturnType<typeof createReviewItem>>>(() => {
    const initial: Record<string, ReturnType<typeof createReviewItem>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Auto Hint Timer
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Reset hint state on challenge step change
    setShowHint(false);
    setCurrentHintIndex(0);

    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (!isAnswerSubmitted && activeTab === 'challenges') {
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentChallengeIndex, isAnswerSubmitted, activeTab]);

  // Handle Voice Prompts
  const speakPrompt = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // Audio fallback safeguard
    }
  };

  // ----------------------------------------------------
  // HANDLERS: DISCOVERY QUESTION
  // ----------------------------------------------------
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoverySubmitted(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('celebration');
      setShowConfetti(true);
      speakPrompt('Spot on! Responsive caregiving and play build strong neural connections in early life.');
      setTimeout(() => setShowConfetti(false), 3000);
    } else {
      audioManager.play('error');
      speakPrompt('Not quite. Consider what fuels early brain plasticity.');
    }
  };

  // ----------------------------------------------------
  // HANDLERS: CHALLENGE ENGINE
  // ----------------------------------------------------
  const currentChallenge = CHALLENGES[currentChallengeIndex];

  const handleOptionSelect = (index: number) => {
    if (isAnswerSubmitted) return;
    audioManager.play('tap');
    setSelectedOption(index);
  };

  const handleChallengeSubmit = () => {
    if (selectedOption === null || isAnswerSubmitted) return;

    setIsAnswerSubmitted(true);
    const isCorrect = selectedOption === currentChallenge.correctIndex;

    // Update BKT & SRS
    const nodeId = currentChallenge.nodeId;
    const currentBKT = bktStates[nodeId] || createBKTState(nodeId);
    const updatedBKT = bktUpdate(currentBKT, isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const currentSRS = srsItems[nodeId] || createReviewItem(nodeId);
    const updatedSRS = sm2Update(currentSRS, isCorrect ? 5 : 1);
    setSrsItems((prev) => ({ ...prev, [nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('chime');
      setScore((prev) => prev + 10);
      setStreak((prev) => prev + 1);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });
      speakPrompt('Excellent! Correct understanding of ECCE principle.');

      if (streak + 1 >= 3) {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2500);
      }
    } else {
      audioManager.play('error');
      setStreak(0);
      speakPrompt('That answer is incorrect. Review the developmental explanation.');
    }
  };

  const handleNextChallenge = () => {
    setIsAnswerSubmitted(false);
    setSelectedOption(null);
    setShowHint(false);
    setShowSparkle(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
    } else {
      setChallengeCompleted(true);
      audioManager.play('celebration');
      setSuccessBannerText(`All Challenges Completed! Total Score: ${score + 10}`);
      setShowSuccessBanner(true);
      recordGameScore('c12_bio_cbse_ecce', score + 10);
      if (onComplete) onComplete(score + 10);
    }
  };

  // ----------------------------------------------------
  // HANDLERS: DIAGNOSTIC QUIZ
  // ----------------------------------------------------
  const handleDiagnosticSelect = (index: number) => {
    if (diagnosticSelected !== null) return;
    setDiagnosticSelected(index);
    const currentDiag = DIAGNOSTIC_QUESTIONS[diagnosticIndex];
    if (index === currentDiag.correctIndex) {
      audioManager.play('drop-correct');
      setDiagnosticScore((prev) => prev + 1);
    } else {
      audioManager.play('drop-wrong');
    }
  };

  const handleDiagnosticNext = () => {
    setDiagnosticSelected(null);
    if (diagnosticIndex < DIAGNOSTIC_QUESTIONS.length - 1) {
      setDiagnosticIndex((prev) => prev + 1);
    } else {
      setDiagnosticComplete(true);
      audioManager.play('celebration');
    }
  };

  // ----------------------------------------------------
  // COMPUTED MASTERY OVERVIEW
  // ----------------------------------------------------
  const overallMastery = useMemo(() => {
    const masteryValues = ALL_NODE_IDS.map((id) => masteryProb(bktStates[id]));
    const sum = masteryValues.reduce((a, b) => a + b, 0);
    return Math.round((sum / ALL_NODE_IDS.length) * 100);
  }, [bktStates]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans relative overflow-x-hidden">
      {/* UI OVERLAY ANIMATION COMPONENTS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text={successBannerText} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble
        show={showHint && activeTab === 'challenges'}
        text={currentChallenge?.hints[currentHintIndex] || 'Explore the developmental age stages and scaffolding options.'}
      />

      {/* SIMULATION HEADER */}
      <header className="max-w-7xl mx-auto mb-6 bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs tracking-widest uppercase mb-1">
            <span>ISC Class 12 Biology</span>
            <span>•</span>
            <span>Human Development & ECCE</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Early Childhood Care and Education Laboratory
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-2xl">
            Interactive simulation covering child developmental stages, attachment theories, Piaget & Vygotsky frameworks, NCF 2005 principles, and ICDS Anganwadi administration.
          </p>
        </div>

        {/* TOP STATUS DASHBOARD */}
        <div className="flex items-center gap-4 bg-slate-950 px-4 py-3 rounded-xl border border-slate-800 self-stretch md:self-auto justify-between">
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Overall Mastery</span>
            <span className="text-lg font-bold text-cyan-400">{overallMastery}%</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Score</span>
            <span className="text-lg font-bold text-amber-400">{score}</span>
          </div>
          <div className="h-8 w-px bg-slate-800"></div>
          <div className="text-center">
            <span className="text-[10px] uppercase tracking-wider text-slate-400 block">Streak</span>
            <span className="text-lg font-bold text-emerald-400">🔥 {streak}</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto mb-6 flex flex-wrap gap-2 border-b border-slate-800 pb-3">
        {[
          { id: 'discovery', label: '1. Discovery & Context' },
          { id: 'lab', label: '2. Interactive ECCE Labs' },
          { id: 'challenges', label: `3. Challenges (${currentChallengeIndex + 1}/${CHALLENGES.length})` },
          { id: 'diagnostic', label: '4. Diagnostic Quiz' },
          { id: 'summary', label: '5. Real-World Plan & Summary' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              audioManager.play('swoop');
              setActiveTab(tab.id as typeof activeTab);
            }}
            className={`px-4 py-2.5 rounded-xl font-medium text-xs md:text-sm transition-all duration-200 flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-cyan-500 text-slate-950 font-bold shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TAB 1: DISCOVERY & SCENARIO ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* SCENARIO CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h2 className="text-xl font-bold text-cyan-400 mb-3 flex items-center gap-2">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                {SCENARIO.title}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-4">{SCENARIO.intro}</p>
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-slate-400 text-xs leading-relaxed">
                <strong className="text-slate-200 block mb-1">Your Objective:</strong>
                {SCENARIO.context}
              </div>
            </div>

            {/* DISCOVERY QUESTION CARD */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <span className="text-xs uppercase font-bold text-amber-400 tracking-wider block mb-2">
                Preconception Discovery Question
              </span>
              <h3 className="text-lg font-semibold text-white mb-4">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3 mb-4">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700';
                  if (discoverySubmitted) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                    } else if (idx === discoverySelected) {
                      btnStyle = 'bg-rose-950 border-rose-500 text-rose-200';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      disabled={discoverySubmitted}
                      onClick={() => handleDiscoverySubmit(idx)}
                      className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-950 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="bg-cyan-950/60 border border-cyan-700 p-4 rounded-xl text-cyan-200 text-xs leading-relaxed animate-fadeIn">
                  <strong className="block text-cyan-300 font-bold mb-1">Scientific Insight:</strong>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS ARRAY MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-indigo-400 uppercase tracking-wider">
                Guided Prediction Experiments
              </h3>
              {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                <div key={pIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="text-sm font-semibold text-slate-200">{pred.question}</div>
                  <div className="text-xs text-slate-400">
                    <span className="text-amber-400 font-bold">Verification:</span> {pred.verifyInstruction}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LABS ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* RENDER MANDATORY EXPLORATION STEPS MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-cyan-400 mb-4 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                Exploration Protocols (5 Modules)
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {EXPLORATION_STEPS.map((step, idx) => (
                  <div key={idx} className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-2">
                    <span className="bg-cyan-950 text-cyan-300 font-bold px-2 py-0.5 rounded text-[10px]">
                      Step {idx + 1}
                    </span>
                    <h4 className="font-bold text-slate-200 text-xs leading-tight">{step.title}</h4>
                    <p className="text-slate-400 text-[11px] leading-relaxed">{step.instruction}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* LAB INTERACTION AREA 1: MILESTONE AGE SIMULATION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center justify-between">
                <span>Lab Module 1 & 2: Milestone & Attachment Explorer</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-normal">
                  Node: c12_bio_cbse_105
                </span>
              </h3>

              {/* Age Control Slider */}
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center text-xs font-semibold">
                  <label className="text-slate-300">Child Age (0 to 72 Months):</label>
                  <span className="text-cyan-400 text-sm font-bold font-mono">{labAgeMonths} Months</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="72"
                  value={labAgeMonths}
                  onChange={(e) => {
                    setLabAgeMonths(Number(e.target.value));
                    audioManager.play('pop');
                  }}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
              </div>

              {/* Render Custom SVG Diagram 1 */}
              <MilestonesDiagram ageMonths={labAgeMonths} />
            </div>

            {/* LAB INTERACTION AREA 2: ZPD & SCAFFOLDING SIMULATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-indigo-400 flex items-center justify-between">
                <span>Lab Module 3: Vygotskian ZPD & Scaffolding Controls</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-normal">
                  Node: c12_bio_cbse_112
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <label className="text-slate-300">Task Complexity / Challenge Level:</label>
                    <span className="text-amber-400 font-mono">{taskDifficultyVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={taskDifficultyVal}
                    onChange={(e) => {
                      setTaskDifficultyVal(Number(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
                  />
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <label className="text-slate-300">Teacher / MKO Scaffolding Support:</label>
                    <span className="text-indigo-400 font-mono">{scaffoldingVal}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={scaffoldingVal}
                    onChange={(e) => {
                      setScaffoldingVal(Number(e.target.value));
                      audioManager.play('pop');
                    }}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-400"
                  />
                </div>
              </div>

              {/* Render Custom SVG Diagram 2 */}
              <PiagetVygotskyDiagram scaffoldingLevel={scaffoldingVal} taskDifficulty={taskDifficultyVal} />
            </div>

            {/* LAB INTERACTION AREA 3: ANGANWADI / ICDS RESOURCE ALLOCATOR */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-emerald-400 flex items-center justify-between">
                <span>Lab Module 4: Anganwadi ICDS Service Optimization</span>
                <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-full font-normal">
                  Node: c12_bio_cbse_120
                </span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-amber-300 block">Nutrition Budget</label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={angNutrition}
                    onChange={(e) => setAngNutrition(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 appearance-none cursor-pointer accent-amber-400"
                  />
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-rose-300 block">Health & Vaccination</label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={angHealth}
                    onChange={(e) => setAngHealth(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 appearance-none cursor-pointer accent-rose-400"
                  />
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2">
                  <label className="text-xs font-semibold text-cyan-300 block">ECCE Preschool Kits</label>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={angECCE}
                    onChange={(e) => setAngECCE(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 appearance-none cursor-pointer accent-cyan-400"
                  />
                </div>
              </div>

              {/* Render Custom SVG Diagram 3 */}
              <AnganwadiICDSDiagram nutrition={angNutrition} health={angHealth} ecce={angECCE} />
            </div>

            {/* OBSERVATION QUESTIONS ARRAY MAP */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-md font-bold text-emerald-400 uppercase tracking-wider">
                Lab Observation Questions
              </h3>
              {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                <div key={oIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                  <div className="text-sm font-semibold text-slate-200">{obs.question}</div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {obs.observableOptions.map((opt, optIdx) => (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-lg border text-xs ${
                          optIdx === obs.correctIndex
                            ? 'bg-emerald-950/60 border-emerald-500/80 text-emerald-200 font-semibold'
                            : 'bg-slate-900 border-slate-800 text-slate-400'
                        }`}
                      >
                        {opt}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {!challengeCompleted ? (
              <>
                {/* CHALLENGE TOP HEADER */}
                <div className="flex flex-wrap justify-between items-center border-b border-slate-800 pb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <span className="bg-cyan-500 text-slate-950 px-3 py-1 rounded-full text-xs font-bold">
                      Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                    </span>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                        currentChallenge.difficulty === 'foundation'
                          ? 'bg-emerald-950 text-emerald-300 border-emerald-700'
                          : currentChallenge.difficulty === 'standard'
                          ? 'bg-amber-950 text-amber-300 border-amber-700'
                          : 'bg-rose-950 text-rose-300 border-rose-700'
                      }`}
                    >
                      {currentChallenge.difficulty.toUpperCase()}
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span>Competency:</span>
                    <span className="text-slate-200 font-semibold">{currentChallenge.competencyLevel}</span>
                  </div>
                </div>

                {/* CHALLENGE QUESTION */}
                <div className="space-y-4">
                  <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                    {currentChallenge.question}
                  </h3>

                  {/* OPTIONS LIST */}
                  <div className="grid grid-cols-1 gap-3">
                    {currentChallenge.options.map((opt, idx) => {
                      let style = 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800';
                      if (selectedOption === idx) {
                        style = 'bg-cyan-950 border-cyan-500 text-cyan-200 font-semibold';
                      }
                      if (isAnswerSubmitted) {
                        if (idx === currentChallenge.correctIndex) {
                          style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (idx === selectedOption) {
                          style = 'bg-rose-950 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={isAnswerSubmitted}
                          onClick={() => handleOptionSelect(idx)}
                          className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all duration-200 flex items-start gap-3 ${style}`}
                        >
                          <span className="w-6 h-6 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* HINT AND SUBMIT BUTTONS */}
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      setShowHint(true);
                      setCurrentHintIndex((prev) => (prev + 1) % currentChallenge.hints.length);
                      audioManager.play('hint');
                    }}
                    className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
                  >
                    💡 Hint ({currentHintIndex + 1}/{currentChallenge.hints.length})
                  </button>

                  {!isAnswerSubmitted ? (
                    <button
                      disabled={selectedOption === null}
                      onClick={handleChallengeSubmit}
                      className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all duration-200 ${
                        selectedOption !== null
                          ? 'bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-lg shadow-cyan-500/20'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      Submit Answer
                    </button>
                  ) : (
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all duration-200 flex items-center gap-2"
                    >
                      Next Challenge →
                    </button>
                  )}
                </div>

                {/* EXPLANATION FEEDBACK BOX */}
                {isAnswerSubmitted && (
                  <div
                    className={`p-4 rounded-xl border text-xs leading-relaxed animate-fadeIn ${
                      selectedOption === currentChallenge.correctIndex
                        ? 'bg-emerald-950/60 border-emerald-700 text-emerald-200'
                        : 'bg-rose-950/60 border-rose-700 text-rose-200'
                    }`}
                  >
                    <strong className="block text-sm font-bold mb-1">
                      {selectedOption === currentChallenge.correctIndex ? 'Correct!' : 'Incorrect'}
                    </strong>
                    {currentChallenge.explanation}
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="text-5xl">🎉</div>
                <h3 className="text-2xl font-bold text-white">Challenge Set Completed!</h3>
                <p className="text-slate-400 text-sm max-w-md mx-auto">
                  You have successfully navigated all 22 progressive developmental and ECCE challenges.
                </p>
                <div className="text-xl font-extrabold text-cyan-400">Final Score: {score}</div>
                <button
                  onClick={() => {
                    setCurrentChallengeIndex(0);
                    setChallengeCompleted(false);
                    setScore(0);
                    setStreak(0);
                  }}
                  className="px-6 py-3 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all"
                >
                  Restart Challenge Track
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 4: DIAGNOSTIC QUIZ ================= */}
        {activeTab === 'diagnostic' && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
            {!diagnosticComplete ? (
              <>
                <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                  <h3 className="text-lg font-bold text-white">Diagnostic Knowledge Check</h3>
                  <span className="text-xs text-slate-400">
                    Question {diagnosticIndex + 1} of {DIAGNOSTIC_QUESTIONS.length}
                  </span>
                </div>

                <div className="space-y-4">
                  <p className="text-sm md:text-base font-semibold text-slate-200">
                    {DIAGNOSTIC_QUESTIONS[diagnosticIndex].question}
                  </p>

                  <div className="grid grid-cols-1 gap-3">
                    {DIAGNOSTIC_QUESTIONS[diagnosticIndex].options.map((opt, idx) => {
                      let style = 'bg-slate-950 hover:bg-slate-800 text-slate-200 border-slate-800';
                      if (diagnosticSelected !== null) {
                        if (idx === DIAGNOSTIC_QUESTIONS[diagnosticIndex].correctIndex) {
                          style = 'bg-emerald-950 border-emerald-500 text-emerald-200 font-bold';
                        } else if (idx === diagnosticSelected) {
                          style = 'bg-rose-950 border-rose-500 text-rose-200';
                        }
                      }

                      return (
                        <button
                          key={idx}
                          disabled={diagnosticSelected !== null}
                          onClick={() => handleDiagnosticSelect(idx)}
                          className={`p-4 rounded-xl border text-left text-xs md:text-sm transition-all duration-200 ${style}`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {diagnosticSelected !== null && (
                  <div className="space-y-4 pt-2">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-slate-300">
                      <strong className="text-cyan-400 block mb-1">Explanation:</strong>
                      {DIAGNOSTIC_QUESTIONS[diagnosticIndex].explanation}
                    </div>

                    <button
                      onClick={handleDiagnosticNext}
                      className="px-6 py-2.5 rounded-xl font-bold text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-all"
                    >
                      {diagnosticIndex < DIAGNOSTIC_QUESTIONS.length - 1 ? 'Next Question →' : 'View Diagnostic Result'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-8 space-y-4">
                <h3 className="text-xl font-bold text-white">Diagnostic Evaluation Complete</h3>
                <div className="text-3xl font-extrabold text-cyan-400">
                  {diagnosticScore} / {DIAGNOSTIC_QUESTIONS.length} Correct
                </div>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  Diagnostic evaluation provides baseline assessment across core ISC Biology early childhood developmental nodes.
                </p>
                <button
                  onClick={() => {
                    setDiagnosticIndex(0);
                    setDiagnosticScore(0);
                    setDiagnosticComplete(false);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
                >
                  Retake Diagnostic Assessment
                </button>
              </div>
            )}
          </div>
        )}

        {/* ================= TAB 5: REAL WORLD & SUMMARY ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* MANDATORY REAL WORLD ACTIVITY RENDER */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-cyan-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                {REAL_WORLD_ACTIVITY.title}
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-1">
                    <span className="text-cyan-400 font-bold uppercase block text-[10px]">Step {sIdx + 1}</span>
                    <p className="text-slate-200">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* COMMON MISCONCEPTIONS EXPANSION SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-rose-400 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                Key Developmental & ECCE Misconceptions Corrected
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((item) => (
                  <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2">
                    <div className="text-rose-400 font-semibold flex items-start gap-2">
                      <span className="shrink-0">❌ Myth:</span>
                      <span>{item.statement}</span>
                    </div>
                    <div className="text-emerald-300 flex items-start gap-2 pt-1 border-t border-slate-800">
                      <span className="shrink-0">✓ Scientific Fact:</span>
                      <span>{item.correction}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* NODE MASTERY MATRIX */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-400">ISC Syllabus Concept Node Mastery Index</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {ALL_NODE_IDS.map((id) => {
                  const mLevel = Math.round(masteryProb(bktStates[id]) * 100);
                  return (
                    <div key={id} className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] flex justify-between items-center">
                      <span className="text-slate-400 font-mono truncate mr-2">{id}</span>
                      <span className="text-cyan-400 font-bold">{mLevel}%</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default C12_BiologyEarlyChildhoodCareCBSESim;