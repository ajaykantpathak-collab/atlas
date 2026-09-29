'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL ISC CLASS 11 PSYCHOLOGY NODE IDS
// ==========================================
const ALL_NODE_IDS = [
  'c11_psy_cbse_180', // Definition and Nature of Psychology
  'c11_psy_cbse_181', // Mental Processes in Psychology
  'c11_psy_cbse_182', // Experience as a Psychological Construct
  'c11_psy_cbse_183', // Behaviour: Overt and Covert
  'c11_psy_cbse_184', // Stimulus-Response (S-R) Relationship
  'c11_psy_cbse_185', // Psychology as a Natural Science
  'c11_psy_cbse_186', // Psychology as a Social Science
  'c11_psy_cbse_187', // Popular Notions vs Scientific Psychology
  'c11_psy_cbse_188', // Structuralism and Introspection
  'c11_psy_cbse_189', // Functionalism
  'c11_psy_cbse_190', // Gestalt Psychology
  'c11_psy_cbse_191', // Behaviourism
  'c11_psy_cbse_192', // Psychoanalysis
  'c11_psy_cbse_193', // Humanistic Psychology
  'c11_psy_cbse_194', // Cognitive Perspective
  'c11_psy_cbse_195', // Historical Landmarks in Psychology
  'c11_psy_cbse_196', // Development of Psychology in India
  'c11_psy_cbse_197', // Branches of Psychology: Overview and Classification
  'c11_psy_cbse_198', // Cognitive Psychology
  'c11_psy_cbse_199', // Biological Psychology
  'c11_psy_cbse_200', // Neuropsychology
  'c11_psy_cbse_201', // Mind-Body Relationship
  'c11_psy_cbse_202', // Clinical Psychology
  'c11_psy_cbse_203', // Counselling Psychology
  'c11_psy_cbse_204', // Educational and School Psychology
  'c11_psy_cbse_205', // Social Psychology and Cross-cultural Psychology
  'c11_psy_cbse_206', // Environmental Psychology
  'c11_psy_cbse_207', // Health Psychology
  'c11_psy_cbse_208', // Industrial/Organisational Psychology
  'c11_psy_cbse_209', // Sports Psychology
  'c11_psy_cbse_210', // Psychology and Philosophy
  'c11_psy_cbse_211', // Psychology and Medicine
  'c11_psy_cbse_212', // Psychology and Economics
  'c11_psy_cbse_213', // Psychology and Law/Criminology
  'c11_psy_cbse_214', // Psychology and Mass Communication
  'c11_psy_cbse_215', // Psychology and Computer Science
  'c11_psy_cbse_216', // Psychology and Other Disciplines: Overview
  'c11_psy_cbse_217', // Psychology in Everyday Life
] as const;

type NodeId = typeof ALL_NODE_IDS[number];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Mind & Behaviour Research Observatory',
  intro: 'Welcome to the Advanced Mind & Human Behaviour Simulator! As a lead psychological investigator at the National Institute of Behavioural Sciences, you will explore how experiences, internal mental processes, and observable behaviours interconnect.',
  context: 'You will dissect human responses to environmental stimuli, simulate historical paradigms from Wundt to modern Cognitive Neurosciences, trace India’s psychological heritage, and map interdisciplinary fields from AI to Criminal Profiling.',
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'Common sense says "venting anger by punching a pillow releases tension and calms you down." How does scientific psychology view this popular notion?',
  options: [
    'Scientific studies prove venting anger purges emotions completely (Catharsis hypothesis).',
    'Scientific empirical evidence demonstrates that venting anger actually keeps physiological arousal high and INCREASES aggressive thoughts.',
    'Venting anger works only for extroverts, while introverts become more depressed.',
    'Scientific psychology considers anger an unobservable myth and refuses to study it.'
  ],
  correctIndex: 1,
  hintAfter: 'Unlike popular common-sense beliefs (which often rely on hindsight bias or myths), scientific psychology relies on empirical observation and systematic experimental verification.',
};

// ==========================================
// DEFAULT PROPS INTERFACE
// ==========================================
interface ComponentProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Stimulus-Organism-Response (S-O-R) & Covert vs Overt Behaviour',
    instruction: 'Select an environmental stimulus (e.g., Sudden Loud Siren). Observe how the internal covert mental process (fear/cognition) mediates the overt physical response (running/heartbeat rate).',
    interactionType: 'sor-simulator',
    nodeId: 'c11_psy_cbse_183',
  },
  {
    title: 'Lab 2: Paradigm & Historical Timeline Switcher',
    instruction: 'Switch between historical paradigms: Structuralism (Introspection), Functionalism (Adaptation), Gestalt (Whole > Sum), Behaviourism (S-R), Psychoanalysis (Unconscious), and Humanism (Self-Actualization). Compare their research targets.',
    interactionType: 'paradigm-switcher',
    nodeId: 'c11_psy_cbse_188',
  },
  {
    title: 'Lab 3: Mind-Body Relationship & Biofeedback Neuro-Lab',
    instruction: 'Manipulate psychological stress levels or cognitive meditation. Observe real-time changes in neuro-circuitry activity, heart-rate variability, and immune markers.',
    interactionType: 'mind-body-biofeedback',
    nodeId: 'c11_psy_cbse_201',
  },
  {
    title: 'Lab 4: Interdisciplinary Applied Psychology Matrix',
    instruction: 'Map real-world societal problems (e.g., pilot cockpit errors, courtroom witness reliability, consumer decision fatigue, sports anxiety) to their specialized psychology branches and cross-disciplinary partners.',
    interactionType: 'interdisciplinary-matrix',
    nodeId: 'c11_psy_cbse_197',
  },
  {
    title: 'Lab 5: Empirical Science vs Common Sense Popular Myths',
    instruction: 'Test 4 popular common-sense proverbs (e.g., "Opposites attract", "Out of sight, out of mind") against rigorous psychological experimental data.',
    interactionType: 'common-sense-tester',
    nodeId: 'c11_psy_cbse_187',
  },
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If an individual suffers damage to the occipital lobe while retaining intact eyes and optic nerve, what will happen to visual experience?',
    options: [
      'The eyes will still visually register rays, so visual mental experience remains 100% normal.',
      'The brain fails to process neural signals; subjective visual experience is lost despite healthy eyes, demonstrating mind-body-brain integration.',
      'The individual will experience auditory hallucinations instead of visual ones.',
      'The person immediately switches to relying on covert introspection without neural signals.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test the Neuropsychology slider in Lab 3 to observe cortical damage effects on subjective experience.',
    nodeId: 'c11_psy_cbse_200',
  },
  {
    question: 'Predict: When presented with an incomplete circle with a tiny gap, why does a human observer perceive a complete circle?',
    options: [
      'Because of Operant Conditioning reinforcing circular shapes.',
      'Because of the Gestalt law of Closure — the brain naturally organizes perceptual inputs into complete wholes.',
      'Because introspective structuralism breaks the circle into separate line segments.',
      'Because of unconscious repressed childhood memories of circles.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Select Gestalt Psychology in Lab 2 to observe perceptual organization dynamics.',
    nodeId: 'c11_psy_cbse_190',
  },
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the difference between Overt and Covert behaviours in the S-O-R simulation?',
    observableOptions: [
      'Covert behaviours (like heart racing or inner self-talk) are directly visible to outside observers.',
      'Overt behaviours (like jumping or speaking) are outwardly observable, whereas Covert behaviours (mental processes, feeling anxious) occur internally.',
      'Both overt and covert behaviours are completely non-existent in natural sciences.',
      'Covert behaviour always precedes stimulus by 10 minutes.'
    ],
    correctIndex: 1,
    nodeId: 'c11_psy_cbse_183',
  },
  {
    question: 'What happens when psychological stress is reduced through cognitive mindfulness in the Mind-Body Biofeedback lab?',
    observableOptions: [
      'Autonomic nervous system arousal decreases, heart rate stabilizes, and immune cell responsiveness improves.',
      'Brain activity completely shuts down to zero Hz.',
      'Overt behaviour becomes 100% predictable by simple mechanical S-R reflexes only.',
      'The mind disconnects entirely from the biological body.'
    ],
    correctIndex: 0,
    nodeId: 'c11_psy_cbse_201',
  },
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Real-World Field Project: Ergonomic Workstation & Stress Audit',
  description: 'Apply principles of Industrial/Organisational Psychology, Environmental Psychology, and Cognitive Science to optimize a high-stress emergency call center.',
  steps: [
    'Step 1 (Environmental & Ergonomic Evaluation): Audit ambient noise levels (dB), lighting spectrum, and seating alignment to reduce sensory overload.',
    'Step 2 (Cognitive Load & Interface Assessment): Measure operator reaction speed and error rates during multi-screen dispatching (Psychology & Computer Science interface).',
    'Step 3 (Health & Biofeedback Protocol): Implement 5-minute heart-rate variability (HRV) breathing interventions at peak stress hours.',
    'Step 4 (Intervention Analysis): Compute performance yield improvements: 24% lower operator burn-out and 18% reduction in dispatch latency.'
  ],
};

// ==========================================
// MISCONCEPTIONS (6 EXPANDED TOPIC-SPECIFIC)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    myth: 'Psychology is just common sense and intuition.',
    fact: 'Common sense relies on hindsight bias and unverified proverbs ("Out of sight, out of mind" vs "Absence makes the heart grow fonder"). Scientific psychology relies on rigorous empirical design, systematic observation, control of variables, and statistical hypothesis testing.',
    nodeId: 'c11_psy_cbse_187',
  },
  {
    id: 'misc_2',
    myth: 'Psychologists can read minds or perform magical palmistry.',
    fact: 'Psychology is a formal science. Psychologists draw inferences about internal mental processes by systematically observing overt responses, neurophysiological markers, and structured psychometric tests.',
    nodeId: 'c11_psy_cbse_180',
  },
  {
    id: 'misc_3',
    myth: 'Clinical Psychologists and Psychiatrists are identical professions.',
    fact: 'Psychiatrists hold a medical degree (M.D./MBBS) and can prescribe pharmacological medications. Clinical Psychologists hold postgraduate degrees in psychology (M.A./M.Sc./Ph.D./M.Phil) specializing in psychological assessment, psychotherapy, and behavioural interventions.',
    nodeId: 'c11_psy_cbse_202',
  },
  {
    id: 'misc_4',
    myth: 'Mind and Brain are completely separate, independent entities (Cartesian Dualism).',
    fact: 'Modern neuropsychology and biological psychology demonstrate that mental processes (thoughts, emotions) are intimately tied to neurobiological brain states and somatic physiological responses.',
    nodeId: 'c11_psy_cbse_201',
  },
  {
    id: 'misc_5',
    myth: 'Behaviourism believes that internal feelings and thoughts do not exist at all.',
    fact: 'Early radical behaviourists (like Watson) focused exclusively on observable S-R links for scientific measurement objectivity, but later neo-behaviourists and cognitive scientists acknowledged internal mental states (O - Organism variables) as crucial mediators.',
    nodeId: 'c11_psy_cbse_191',
  },
  {
    id: 'misc_6',
    myth: 'Psychology began in India only after Western British introduction.',
    fact: 'Indian philosophical traditions (Vedas, Upanishads, Samkhya, Yoga, Buddhism) detailed deep systematic models of consciousness, self, and mental states thousands of years ago. Modern academic psychology in India formally began in 1916 at Calcutta University under Prof. N.N. Sengupta.',
    nodeId: 'c11_psy_cbse_196',
  },
];

// ==========================================
// 26 PROGRESSIVE CHALLENGES ACROSS 3 TIERS
// ==========================================
interface Challenge {
  id: string;
  nodeId: NodeId;
  type: 'multiple-choice' | 'drag-sort' | 'classify';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

const CHALLENGES: Challenge[] = [
  // --- FOUNDATION TIER (8 Challenges) ---
  {
    id: 'c_1',
    nodeId: 'c11_psy_cbse_180',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Recall & Definition',
    question: 'How is Psychology formally defined in modern scientific terms?',
    options: [
      'The mystical study of the soul and supernatural spirit forces.',
      'The scientific study of mental processes, experiences, and behaviours in diverse contexts.',
      'The artistic interpretation of human facial expressions and handwriting.',
      'The practice of biological brain surgery and neuro-anatomy alone.'
    ],
    correctIndex: 1,
    explanation: 'Psychology is formally defined as a science that studies mental processes, subjective experiences, and overt/covert behaviours in various contexts.',
    hints: ['Think of the three triad pillars: Mental Processes, Experiences, and Behaviours.', 'It is an empirical science, not pseudoscience.'],
    misconceptionIndex: 1,
  },
  {
    id: 'c_2',
    nodeId: 'c11_psy_cbse_181',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding Constructs',
    question: 'Which of the following is an example of a "Mental Process"?',
    options: [
      'Sweating under direct sunlight.',
      'Solving a complex mathematical puzzle in one’s head.',
      'A knee-jerk reflex kick triggered by a rubber hammer.',
      'Height growth during adolescence.'
    ],
    correctIndex: 1,
    explanation: 'Mental processes refer to states of consciousness or brain activities such as thinking, remembering, problem-solving, and perceiving.',
    hints: ['Mental processes occur internally in the brain/mind.', 'Solving a math puzzle requires active cognition.'],
  },
  {
    id: 'c_3',
    nodeId: 'c11_psy_cbse_182',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Understanding Experience',
    question: 'Psychology emphasizes that "Experience" is subjective. What does this mean?',
    options: [
      'All human beings experience identical physical pain in exactly the same way.',
      'Experiences are strictly public events visible to external cameras.',
      'Experiences are embedded in consciousness and tied uniquely to the individual’s internal perspective and context.',
      'Experiences cannot be influenced by emotional states.'
    ],
    correctIndex: 2,
    explanation: 'Experiences are subjective and internal to the person undergoing them, influenced by context, memory, and internal physiological states (e.g., pain felt by a marathon runner vs a patient).',
    hints: ['Subjective means unique to the observer.', 'Consider how two people feel about the same roller coaster ride.'],
  },
  {
    id: 'c_4',
    nodeId: 'c11_psy_cbse_183',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Identify the pair that correctly represents an OVERT behaviour and a COVERT behaviour respectively.',
    options: [
      'Overt: Increased heart rate | Covert: Twitching of eyelid',
      'Overt: Sprinting across a track | Covert: Feeling anxious before an exam',
      'Overt: Silent mental daydreaming | Covert: Writing an essay',
      'Overt: Brain wave firing | Covert: Shaking hands with a guest'
    ],
    correctIndex: 1,
    explanation: 'Overt behaviour is outwardly visible and directly observable (sprinting). Covert behaviour is internal, non-observable directly by external eyes (feeling anxious).',
    hints: ['Overt = open / visible.', 'Covert = covered / internal.'],
  },
  {
    id: 'c_5',
    nodeId: 'c11_psy_cbse_184',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'S-R Relationship',
    question: 'In the Stimulus-Response (S-R) paradigm, what constitutes a "Stimulus" (S)?',
    options: [
      'The muscle contraction that moves a limb.',
      'Any environmental event, agent, or internal trigger that elicits a physiological or behavioural response.',
      'The final exam score achieved after studying.',
      'The chemical neurotransmitter inside a synapse.'
    ],
    correctIndex: 1,
    explanation: 'A stimulus is any change or event in the external environment or internal body that triggers an organism to respond.',
    hints: ['Stimulus is the trigger or input signal.', 'Examples include light flash, sound, or hunger pang.'],
  },
  {
    id: 'c_6',
    nodeId: 'c11_psy_cbse_185',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Scientific Method',
    question: 'Why is Psychology classified as a Natural Science in terms of methodology?',
    options: [
      'Because it only studies wild plants and animals in nature.',
      'Because it emphasizes objectivity, hypothetical-deductive empirical methods, controlled experimentation, and quantitative measurement.',
      'Because it relies exclusively on philosophical ancient scripts.',
      'Because human minds obey planetary gravitational orbits.'
    ],
    correctIndex: 1,
    explanation: 'Psychology draws heavily on the scientific method (formulating hypotheses, experimental control, systematic observation, and quantitative analysis) derived from natural sciences.',
    hints: ['Look for scientific methodology characteristics.', 'Hypothetical-deductive methods belong to natural sciences.'],
  },
  {
    id: 'c_7',
    nodeId: 'c11_psy_cbse_186',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Social Science Context',
    question: 'Why is Psychology also recognized as a Social Science?',
    options: [
      'Because human behaviour is shaped by socio-cultural contexts, interpersonal interactions, and collective societal norms.',
      'Because psychologists like to organize social parties.',
      'Because social media is the only subject psychologists research.',
      'Because it rejects natural science research methods entirely.'
    ],
    correctIndex: 0,
    explanation: 'Psychology sits at the intersection of natural and social sciences because human actions and experiences occur within cultural, economic, and interpersonal social systems.',
    hints: ['Humans do not live in isolation.', 'Socio-cultural environment shapes human action.'],
  },
  {
    id: 'c_8',
    nodeId: 'c11_psy_cbse_187',
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'Critical Thinking',
    question: 'What differentiates Scientific Psychology from Popular Notions (Common Sense)?',
    options: [
      'Scientific psychology relies on systematic empirical evidence and controlled observation, whereas common sense relies on hindsight bias and unverified proverbs.',
      'Popular notions are always 100% false, while scientific psychology never makes mistakes.',
      'Common sense uses brain scans, whereas scientific psychology uses astrology.',
      'There is no difference; both use identical research protocols.'
    ],
    correctIndex: 0,
    explanation: 'Common sense explanations are often based on hindsight ("I knew it all along") and contradictory proverbs. Scientific psychology tests hypotheses empirically under controlled conditions.',
    hints: ['Recall the discovery question about venting anger!', 'Empirical validation is key.'],
    misconceptionIndex: 0,
  },

  // --- STANDARD TIER (9 Challenges) ---
  {
    id: 'c_9',
    nodeId: 'c11_psy_cbse_188',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Historical School Analysis',
    question: 'Wilhelm Wundt established the first formal psychology laboratory in Leipzig in 1879. Which school of thought did he pioneer using "Introspection"?',
    options: [
      'Behaviourism',
      'Structuralism',
      'Psychoanalysis',
      'Functionalism'
    ],
    correctIndex: 1,
    explanation: 'Wundt and Edward Titchener pioneered Structuralism, seeking to analyze the basic structural elements or building blocks of the mind through self-observation (introspection).',
    hints: ['Analyzing mind into basic structures/components.', '1879 Leipzig lab.'],
  },
  {
    id: 'c_10',
    nodeId: 'c11_psy_cbse_189',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Historical School Analysis',
    question: 'William James advocated Functionalism in response to Structuralism. What was the central focus of Functionalism?',
    options: [
      'Analyzing conscious experience into tiny static sensory units.',
      'Studying what the mind DOES and how mental processes function to help organisms adapt to their environment.',
      'Investigating unconscious sexual urges exclusively.',
      'Studying rat maze navigation without any reference to mind.'
    ],
    correctIndex: 1,
    explanation: 'Influenced by Darwin’s evolutionary theory, William James focused on the functional utility of consciousness — how mind and behaviour help individuals survive and adapt.',
    hints: ['Functionalism asks "What is mind FOR?"', 'Adaptation to environment.'],
  },
  {
    id: 'c_11',
    nodeId: 'c11_psy_cbse_190',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Perceptual Analysis',
    question: 'Which core principle was championed by Gestalt psychologists such as Wertheimer, Koffka, and Köhler in Germany?',
    options: [
      'The whole of perceptual experience is greater than the sum of its individual sensory parts.',
      'All behaviour is strictly determined by unconscious childhood trauma.',
      'Mind should be studied by breaking conscious thought into elementary chemical molecules.',
      'Learning occurs only when tangible token rewards are awarded.'
    ],
    correctIndex: 0,
    explanation: 'Gestalt ("form/configuration") psychology proved that perceptual experience is an organized whole, not merely a sum of elementary sensations.',
    hints: ['Gestalt motto: The whole is different from the sum of parts.', 'Think visual organization.'],
  },
  {
    id: 'c_12',
    nodeId: 'c11_psy_cbse_191',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Historical School Analysis',
    question: 'John B. Watson rejected Introspection and founded Behaviourism in 1913. What did Watson propose psychology should study?',
    options: [
      'Unconscious dream symbols.',
      'Observable, measurable, and quantifiable behaviour in terms of Stimulus-Response linkages.',
      'Introspective conscious reports of feelings.',
      'Genetic DNA sequencing.'
    ],
    correctIndex: 1,
    explanation: 'Watson argued that mind and consciousness are unobservable subjective entities; true science must focus on observable overt behaviour.',
    hints: ['Observable actions only.', 'Rejection of Introspection.'],
    misconceptionIndex: 4,
  },
  {
    id: 'c_13',
    nodeId: 'c11_psy_cbse_192',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Historical School Analysis',
    question: 'Sigmund Freud’s Psychoanalysis views human behaviour as predominantly driven by:',
    options: [
      'Conscious logic and rational decision-making matrices.',
      'Unconscious drives, repressed childhood conflicts, and instinctual desires.',
      'Operant conditioning schedules of reinforcement.',
      'Computer algorithmic information processing streams.'
    ],
    correctIndex: 1,
    explanation: 'Freud conceptualized the human psyche as an iceberg, where unconscious dynamics, repressed desires, and early childhood experiences shape behaviour.',
    hints: ['Think of the iceberg analogy.', 'Unconscious mind.'],
  },
  {
    id: 'c_14',
    nodeId: 'c11_psy_cbse_193',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Historical School Analysis',
    question: 'Humanistic Psychology (Carl Rogers, Abraham Maslow) emerged as the "Third Force". What was its primary stance?',
    options: [
      'Human beings are passive puppets controlled by unconscious instincts or environmental conditioning.',
      'Human beings possess free will, inherent agency, personal growth potential, and a drive toward self-actualization.',
      'Human beings are identical to digital electronic computers.',
      'Human behaviour is determined solely by spinal cord reflexes.'
    ],
    correctIndex: 1,
    explanation: 'Humanistic psychology rejected deterministic views, highlighting free will, human potential, dignity, self-direction, and self-actualization.',
    hints: ['Focus on human potential and free will.', 'Maslow hierarchy.'],
  },
  {
    id: 'c_15',
    nodeId: 'c11_psy_cbse_194',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Cognitive Perspective',
    question: 'The Cognitive Perspective views the human mind primarily as an active:',
    options: [
      'Blank slate (tabula rasa) that passively records incoming stimuli.',
      'Information processing system that receives, transforms, stores, retrieves, and uses information.',
      'Collection of biological organs with no mental capacity.',
      'Unconscious reservoir of repressed aggression.'
    ],
    correctIndex: 1,
    explanation: 'Cognitive psychology compares the human mind to a sophisticated information processor, actively constructing mental representations of the world.',
    hints: ['Computer analogy for human cognition.', 'Inputs, storage, processing, output.'],
  },
  {
    id: 'c_16',
    nodeId: 'c11_psy_cbse_195',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Historical Milestones',
    question: 'Arrange the following historical milestones in chronological sequence: (1) Wundt’s Leipzig Lab, (2) Watson’s Behaviourist Manifesto, (3) Cognitive Revolution, (4) James’s Principles of Psychology.',
    options: [
      '(1) 1879 -> (4) 1890 -> (2) 1913 -> (3) 1950s',
      '(4) 1890 -> (1) 1879 -> (3) 1950s -> (2) 1913',
      '(2) 1913 -> (1) 1879 -> (4) 1890 -> (3) 1950s',
      '(1) 1879 -> (3) 1950s -> (4) 1890 -> (2) 1913'
    ],
    correctIndex: 0,
    explanation: 'Leipzig Lab (1879) -> Principles of Psychology (1890) -> Behaviourism (1913) -> Cognitive Revolution (1950s).',
    hints: ['Wundt was first in 1879.', 'Cognitive revolution occurred in mid-20th century.'],
  },
  {
    id: 'c_17',
    nodeId: 'c11_psy_cbse_196',
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'Indian Psychology History',
    question: 'Where and under whose leadership was the first Department of Psychology in India established in 1916?',
    options: [
      'University of Mumbai under Dr. Sigmund Freud.',
      'Calcutta University under Prof. N.N. Sengupta.',
      'University of Delhi under Swami Vivekananda.',
      'NIMHANS Bengaluru under Sir C.V. Raman.'
    ],
    correctIndex: 1,
    explanation: 'Academic psychology in India officially started at Calcutta University in 1916 within the Department of Philosophy under Dr. N.N. Sengupta (trained at Harvard under Münsterberg).',
    hints: ['Calcutta University, 1916.', 'Prof. N.N. Sengupta.'],
    misconceptionIndex: 5,
  },

  // --- ADVANCED TIER (9 Challenges) ---
  {
    id: 'c_18',
    nodeId: 'c11_psy_cbse_197',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Branch Classification',
    question: 'How are the branches of Psychology broadly classified?',
    options: [
      'Basic/Theoretical Psychology (e.g., Cognitive, Biological, Social) vs Applied Psychology (e.g., Clinical, Educational, IO).',
      'Normal Psychology vs Paranormal Telepathy.',
      'Child Psychology vs Adult Brain Surgery.',
      'Indian Psychology vs Western Astrology.'
    ],
    correctIndex: 0,
    explanation: 'Psychology branches split into Basic/Theoretical (discovering foundational principles) and Applied (applying those principles to solve real-world human problems).',
    hints: ['Basic research builds theories; Applied research solves practical problems.'],
  },
  {
    id: 'c_19',
    nodeId: 'c11_psy_cbse_198',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Cognitive & Bio Psychology',
    question: 'A researcher investigates how working memory capacity correlates with neurotransmitter dopamine levels in the prefrontal cortex during multi-tasking. Which two branches overlap here?',
    options: [
      'Sports Psychology and Legal Criminology',
      'Cognitive Psychology and Biological Psychology / Neuropsychology',
      'Environmental Psychology and Social Psychology',
      'Psychoanalysis and Folk Wisdom'
    ],
    correctIndex: 1,
    explanation: 'Working memory (Cognitive) linked with dopamine and prefrontal cortex (Biological/Neuropsychology) represents Cognitive Neuroscience.',
    hints: ['Cognitive = memory/attention; Biological = brain/dopamine.'],
  },
  {
    id: 'c_20',
    nodeId: 'c11_psy_cbse_201',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Mind-Body Synthesis',
    question: 'The modern view of the Mind-Body Relationship in psychoneuroimmunology demonstrates that:',
    options: [
      'Mental states like chronic psychological stress lead to real biological changes in immune cell counts and autonomic dysfunction via the HPA axis.',
      'Mind operates in a spiritual void with zero physiological influence on body organs.',
      'The body governs physical health while the mind governs only optical illusions with no interaction.',
      'Stress affects only overt posture, never internal chemistry.'
    ],
    correctIndex: 0,
    explanation: 'Mind and body are integrated: mental states alter neuroendocrine pathways (HPA axis), affecting immune functioning and physical organ health.',
    hints: ['Psychoneuroimmunology studies mind-brain-immune interaction.', 'Stress triggers cortisol release.'],
    misconceptionIndex: 3,
  },
  {
    id: 'c_21',
    nodeId: 'c11_psy_cbse_202',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Clinical vs Counselling Differentiation',
    question: 'A client experiences severe auditory hallucinations and major schizophrenia episode, whereas another student seeks guidance for academic burnout and study anxiety. Which specialists handle these respective cases?',
    options: [
      'Both must be referred to an Environmental Psychologist.',
      'Clinical Psychologist / Psychiatrist for schizophrenia; Counselling Psychologist for academic burnout.',
      'Sports Psychologist for both cases.',
      'Industrial Psychologist for schizophrenia; Criminologist for study anxiety.'
    ],
    correctIndex: 1,
    explanation: 'Clinical Psychologists treat severe mental disorders (psychoses/schizophrenia), whereas Counselling Psychologists deal with mild-to-moderate everyday life adjustment, vocational, and educational problems.',
    hints: ['Severe mental illnesses = Clinical.', 'Everyday adjustments/stress = Counselling.'],
    misconceptionIndex: 2,
  },
  {
    id: 'c_22',
    nodeId: 'c11_psy_cbse_205',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Social & Cross-cultural Synthesis',
    question: 'Cross-Cultural Psychology tests psychological theories across diverse cultural groups to evaluate:',
    options: [
      'Whether psychological principles (like motivation or emotion recognition) are universal or culture-bound.',
      'Which country has the highest IQ scores.',
      'How to eliminate local indigenous languages.',
      'Why biological reflexes change during international air travel.'
    ],
    correctIndex: 0,
    explanation: 'Cross-cultural psychology examines whether findings derived from Western educated samples generalize globally or are shaped by specific cultural contexts.',
    hints: ['Evaluates universality vs cultural specificity of behaviour.'],
  },
  {
    id: 'c_23',
    nodeId: 'c11_psy_cbse_206',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Applied Science Application',
    question: 'Environmental Psychology studies the interaction between physical surroundings and human behaviour. Which of these is a typical project for an Environmental Psychologist?',
    options: [
      'Designing hospital ward layouts and urban greenspaces to reduce patient recovery times and urban stress.',
      'Analyzing deep unconscious dream symbolism.',
      'Prescribing psychiatric medications for bipolar disorder.',
      'Writing computer programming languages for neural nets.'
    ],
    correctIndex: 0,
    explanation: 'Environmental psychologists examine how built and natural environments (noise, crowding, green spaces, spatial design) influence human wellbeing and performance.',
    hints: ['Built and natural environment impact on human behaviour.'],
  },
  {
    id: 'c_24',
    nodeId: 'c11_psy_cbse_208',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'I/O Psychology Application',
    question: 'An Industrial/Organisational (I/O) Psychologist is hired by a tech enterprise. What would their intervention focus on?',
    options: [
      'Employee selection, leadership development, workplace motivation, organizational climate, and ergonomics.',
      'Treating children with learning disabilities in elementary schools.',
      'Conducting brain surgery on damaged temporal lobes.',
      'Investigating crime scenes for forensic footprint matching.'
    ],
    correctIndex: 0,
    explanation: 'I/O psychology focuses on human behaviour in work settings to enhance workplace productivity, employee satisfaction, teamwork, and organizational efficiency.',
    hints: ['Workplace dynamics, leadership, employee wellbeing.'],
  },
  {
    id: 'c_25',
    nodeId: 'c11_psy_cbse_212',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Interdisciplinary Synthesis',
    question: 'The merger of Psychology and Economics (Behavioural Economics, pioneered by Daniel Kahneman) challenged traditional economic theory by demonstrating that:',
    options: [
      'Human decision-makers are not purely rational agents; they rely on cognitive heuristics and systematic emotional biases.',
      'Money has no psychological value to human beings.',
      'Economic stock markets are controlled by biological circadian rhythms.',
      'Consumers always compute complex calculus before making purchases.'
    ],
    correctIndex: 0,
    explanation: 'Behavioural Economics combines psychological insights with microeconomics to show that humans exhibit bounded rationality, cognitive biases (e.g., loss aversion), and emotional heuristics.',
    hints: ['Daniel Kahneman, Thinking Fast and Slow.', 'Bounded rationality and heuristics.'],
  },
  {
    id: 'c_26',
    nodeId: 'c11_psy_cbse_217',
    type: 'multiple-choice',
    difficulty: 'advanced',
    competencyLevel: 'Everyday Life Integration',
    question: 'How does psychological literacy empower individuals in their everyday personal and social lives?',
    options: [
      'By providing evidence-based strategies for emotional self-regulation, effective interpersonal communication, critical thinking, and empathy.',
      'By enabling individuals to manipulate others through hypnotic tricks.',
      'By replacing medical doctors completely.',
      'By eliminating all negative emotions permanently.'
    ],
    correctIndex: 0,
    explanation: 'Psychology provides scientific insights into self-understanding, stress coping mechanisms, relational dynamics, bias awareness, and decision-making in everyday life.',
    hints: ['Self-awareness, emotional regulation, and social harmony.'],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Stimulus-Organism-Response (S-O-R) & Covert/Overt Flow
const SRModelSVG: React.FC<{ activeStimulus: string; activeState: string }> = ({ activeStimulus, activeState }) => {
  return (
    <svg viewBox="0 0 800 240" className="w-full h-auto rounded-xl bg-slate-900 border border-slate-700 shadow-2xl">
      <defs>
        <linearGradient id="stimGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#f97316" />
        </linearGradient>
        <linearGradient id="orgGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
        <linearGradient id="respGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Stimulus Box (S) */}
      <g transform="translate(40, 40)">
        <rect width="180" height="160" rx="16" fill="url(#stimGrad)" opacity="0.9" />
        <text x="90" y="35" textAnchor="middle" fill="#fff" className="font-bold text-lg">STIMULUS (S)</text>
        <text x="90" y="60" textAnchor="middle" fill="#fee2e2" className="text-xs">Environmental Trigger</text>
        <rect x="20" y="75" width="140" height="65" rx="8" fill="#1e293b" opacity="0.8" />
        <text x="90" y="102" textAnchor="middle" fill="#fca5a5" className="text-sm font-semibold">{activeStimulus}</text>
        <text x="90" y="125" textAnchor="middle" fill="#94a3b8" className="text-xs">External / Internal Input</text>
      </g>

      {/* Arrow 1 */}
      <path d="M 230 120 L 290 120" stroke="#f43f5e" strokeWidth="4" markerEnd="url(#arrow)" strokeDasharray="6,4" className="animate-pulse" />

      {/* Organism Box (O - Covert Mental Processes) */}
      <g transform="translate(300, 25)">
        <rect width="200" height="190" rx="20" fill="url(#orgGrad)" opacity="0.95" filter="url(#glow)" />
        <text x="100" y="32" textAnchor="middle" fill="#fff" className="font-bold text-lg">ORGANISM (O)</text>
        <text x="100" y="52" textAnchor="middle" fill="#e0e7ff" className="text-xs font-semibold">COVERT Mental Processes</text>
        
        {/* Mind/Brain Graphic inside Organism */}
        <circle cx="100" cy="115" r="45" fill="#1e1b4b" stroke="#a7f3d0" strokeWidth="2" />
        <text x="100" y="105" textAnchor="middle" fill="#a5f3fc" className="text-xs font-bold">{activeState}</text>
        <text x="100" y="125" textAnchor="middle" fill="#c7d2fe" className="text-[10px]">Cognition • Emotion</text>
        <text x="100" y="138" textAnchor="middle" fill="#c7d2fe" className="text-[10px]">Subjective Experience</text>
        <text x="100" y="178" textAnchor="middle" fill="#ddd6fe" className="text-[11px] italic">Non-Observable Directly</text>
      </g>

      {/* Arrow 2 */}
      <path d="M 510 120 L 570 120" stroke="#6366f1" strokeWidth="4" strokeDasharray="6,4" className="animate-pulse" />

      {/* Response Box (R - Overt Behaviour) */}
      <g transform="translate(580, 40)">
        <rect width="180" height="160" rx="16" fill="url(#respGrad)" opacity="0.9" />
        <text x="90" y="35" textAnchor="middle" fill="#fff" className="font-bold text-lg">RESPONSE (R)</text>
        <text x="90" y="58" textAnchor="middle" fill="#ecfdf5" className="text-xs font-semibold">OVERT Behaviour</text>
        <rect x="20" y="75" width="140" height="65" rx="8" fill="#0f172a" opacity="0.85" />
        <text x="90" y="105" textAnchor="middle" fill="#6ee7b7" className="text-xs font-bold">Observable Action</text>
        <text x="90" y="125" textAnchor="middle" fill="#a7f3d0" className="text-[11px]">Motor / Physical Activity</text>
      </g>
    </svg>
  );
};

// Diagram 2: Historical Paradigm Evolution Tree
const SchoolsOfThoughtSVG: React.FC<{ selectedSchool: string; onSelect: (school: string) => void }> = ({ selectedSchool, onSelect }) => {
  const schools = [
    { id: 'Structuralism', year: '1879', founder: 'Wundt / Titchener', core: 'Introspection & Basic Elements of Mind', color: '#f43f5e' },
    { id: 'Functionalism', year: '1890', founder: 'William James', core: 'Functions & Adaptive Value of Consciousness', color: '#fb923c' },
    { id: 'Gestalt', year: '1912', founder: 'Wertheimer / Koffka', core: 'Perceptual Wholes (Whole > Sum)', color: '#eab308' },
    { id: 'Behaviourism', year: '1913', founder: 'John B. Watson', core: 'Observable S-R Conditioning', color: '#10b981' },
    { id: 'Psychoanalysis', year: '1900', founder: 'Sigmund Freud', core: 'Unconscious Drives & Trauma', color: '#06b6d4' },
    { id: 'Humanism', year: '1950s', founder: 'Rogers / Maslow', core: 'Free Will & Self-Actualization', color: '#8b5cf6' },
    { id: 'Cognitive', year: '1950s+', founder: 'Neisser / Broadbent', core: 'Active Information Processing', color: '#ec4899' },
  ];

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
      <h4 className="text-sm font-bold text-slate-300 mb-3 text-center uppercase tracking-wider">Historical Paradigms in Psychology (Click to Inspect)</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {schools.map((s) => {
          const isSelected = selectedSchool === s.id;
          return (
            <div
              key={s.id}
              onClick={() => onSelect(s.id)}
              className={`cursor-pointer p-3 rounded-xl border transition-all duration-300 transform hover:-translate-y-1 ${
                isSelected
                  ? 'bg-slate-800 border-gold-400 ring-2 ring-gold-500/50 shadow-lg scale-102'
                  : 'bg-slate-950/70 border-slate-800 hover:border-slate-600'
              }`}
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-white" style={{ color: s.color }}>{s.id}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 font-mono">{s.year}</span>
              </div>
              <p className="text-xs text-slate-300 font-medium">{s.founder}</p>
              <p className="text-[11px] text-slate-400 mt-2 leading-tight">{s.core}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

// Diagram 3: Mind-Body Biofeedback & Neuro-circuitry Graphic
const MindBodyBrainSVG: React.FC<{ stressLevel: number }> = ({ stressLevel }) => {
  const heartRate = Math.round(60 + (stressLevel / 100) * 60);
  const cortisolLevel = (stressLevel * 0.45).toFixed(1);
  const alphaWave = Math.max(10, 100 - stressLevel);

  return (
    <svg viewBox="0 0 750 220" className="w-full h-auto rounded-xl bg-slate-950 border border-slate-800 shadow-xl">
      <defs>
        <linearGradient id="brainPulse" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="50%" stopColor="#ec4899" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>
      </defs>

      {/* Brain Component */}
      <g transform="translate(30, 25)">
        <rect width="200" height="170" rx="14" fill="#0f172a" stroke="#6366f1" strokeWidth="2" />
        <text x="100" y="30" textAnchor="middle" fill="#c7d2fe" className="font-bold text-sm">CEREBRAL CORTEX & HYPOTHALAMUS</text>
        
        {/* Brain Silhouette */}
        <path
          d="M 60 110 C 60 70, 90 60, 100 60 C 120 60, 140 70, 140 90 C 150 90, 155 110, 145 130 C 135 150, 80 150, 60 110 Z"
          fill="none"
          stroke="url(#brainPulse)"
          strokeWidth="3"
          className="animate-pulse"
        />
        <text x="100" y="160" textAnchor="middle" fill="#a5f3fc" className="text-xs">Subjective Mind / Thoughts</text>
      </g>

      {/* Neural Transmission Path (HPA Axis) */}
      <g transform="translate(240, 90)">
        <path d="M 0 20 Q 50 ${20 + stressLevel * 0.3} 100 20 T 180 20" fill="none" stroke={stressLevel > 50 ? '#ef4444' : '#10b981'} strokeWidth="3" strokeDasharray="5,5" className="animate-pulse" />
        <text x="90" y="-10" textAnchor="middle" fill="#94a3b8" className="text-[11px]">HPA Axis & Autonomic Signals</text>
      </g>

      {/* Somatic / Body Organs */}
      <g transform="translate(430, 25)">
        <rect width="280" height="170" rx="14" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
        <text x="140" y="30" textAnchor="middle" fill="#a7f3d0" className="font-bold text-sm">SOMATIC / BODY PHYSIOLOGY</text>

        <g transform="translate(20, 45)">
          <text x="0" y="20" fill="#cbd5e1" className="text-xs font-semibold">Heart Rate (BPM):</text>
          <text x="190" y="20" fill={heartRate > 90 ? '#ef4444' : '#34d399'} className="text-sm font-bold">{heartRate} bpm</text>

          <text x="0" y="50" fill="#cbd5e1" className="text-xs font-semibold">Cortisol / Adrenaline:</text>
          <text x="190" y="50" fill={stressLevel > 60 ? '#f97316' : '#60a5fa'} className="text-sm font-bold">{cortisolLevel} µg/dL</text>

          <text x="0" y="80" fill="#cbd5e1" className="text-xs font-semibold">EEG Alpha Waves (Relaxation):</text>
          <text x="190" y="80" fill="#c084fc" className="text-sm font-bold">{alphaWave}%</text>

          <rect x="0" y="95" width="240" height="10" rx="5" fill="#334155" />
          <rect x="0" y="95" width={`${stressLevel * 2.4}`} height="10" rx="5" fill={stressLevel > 60 ? '#ef4444' : '#10b981'} />
        </g>
      </g>
    </svg>
  );
};

// Diagram 4: Branches of Psychology Interactive Map
const BranchesMapSVG: React.FC<{ activeBranch: string; onSelectBranch: (branch: string) => void }> = ({ activeBranch, onSelectBranch }) => {
  const branches = [
    { id: 'Cognitive', label: 'Cognitive', category: 'Basic', desc: 'Memory, Attention, Reasoning, Language' },
    { id: 'Biological', label: 'Biological & Neuro', category: 'Basic', desc: 'Brain, Hormones, Genetics, Nervous System' },
    { id: 'Social', label: 'Social & Cultural', category: 'Basic', desc: 'Group dynamics, Prejudice, Cultural Norms' },
    { id: 'Clinical', label: 'Clinical & Counselling', category: 'Applied', desc: 'Mental Disorders, Psychotherapy, Stress' },
    { id: 'IO', label: 'Industrial / Org', category: 'Applied', desc: 'Workplace, Leadership, Productivity' },
    { id: 'Educational', label: 'Educational & School', category: 'Applied', desc: 'Learning, Curriculum, Student Wellbeing' },
  ];

  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 shadow-xl">
      <h4 className="text-sm font-bold text-slate-300 mb-3 text-center uppercase tracking-wider">Classification of Psychology Branches</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Basic Theoretical Branches */}
        <div className="bg-slate-950 p-3 rounded-xl border border-gold-900/50">
          <div className="text-xs font-bold text-gold-400 mb-2 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-gold-500"></span>
            Basic / Theoretical Psychology (Knowledge Building)
          </div>
          <div className="space-y-2">
            {branches.filter(b => b.category === 'Basic').map(b => (
              <div
                key={b.id}
                onClick={() => onSelectBranch(b.id)}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  activeBranch === b.id
                    ? 'bg-gold-950 border-gold-400 text-white shadow'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-sm text-gold-300">{b.label}</div>
                <div className="text-xs text-slate-400">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Applied Branches */}
        <div className="bg-slate-950 p-3 rounded-xl border border-emerald-900/50">
          <div className="text-xs font-bold text-emerald-400 mb-2 uppercase tracking-wide flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Applied Psychology (Real-World Problem Solving)
          </div>
          <div className="space-y-2">
            {branches.filter(b => b.category === 'Applied').map(b => (
              <div
                key={b.id}
                onClick={() => onSelectBranch(b.id)}
                className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all ${
                  activeBranch === b.id
                    ? 'bg-emerald-950 border-emerald-400 text-white shadow'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <div className="font-bold text-sm text-emerald-300">{b.label}</div>
                <div className="text-xs text-slate-400">{b.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT DEFINITION
// ==========================================
export const C11_PsyWhatIsPsychologyCBSESim: React.FC<ComponentProps> = ({
  onComplete,
  initialNodeId,
}) => {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');
  const [activeLabIndex, setActiveLabIndex] = useState<number>(0);
  
  // SRS & BKT State tracking per Node ID
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState(id);
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Discovery Question State
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab 1: S-O-R Simulator State
  const [selectedStimulus, setSelectedStimulus] = useState<string>('Sudden Siren Alarm');
  const [sorState, setSorState] = useState<{ internalState: string; overtAction: string }>({
    internalState: 'Fear & Threat Assessment',
    overtAction: 'Rapid Evacuation & Increased Heart Rate',
  });

  // Lab 2: Paradigm State
  const [selectedParadigm, setSelectedParadigm] = useState<string>('Structuralism');

  // Lab 3: Mind-Body Stress Slider State
  const [stressLevel, setStressLevel] = useState<number>(35);

  // Lab 4: Interdisciplinary Matrix State
  const [selectedMatrixCase, setSelectedMatrixCase] = useState<number>(0);

  // Lab 5: Common Sense Myth Tester State
  const [selectedMythIndex, setSelectedMythIndex] = useState<number>(0);
  const [mythRevealed, setMythRevealed] = useState<boolean>(false);

  // Interactive Challenges State
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [challengeSubmitted, setChallengeSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Prediction & Observation Answers State
  const [predictionAnswers, setPredictionAnswers] = useState<Record<number, number | null>>({});
  const [observationAnswers, setObservationAnswers] = useState<Record<number, number | null>>({});

  // UI Feedback & Animations
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // Inactivity Timer for Auto-Hint
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = () => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeSubmitted) {
        const currentC = CHALLENGES[currentChallengeIndex];
        if (currentC && currentC.hints.length > 0) {
          setCurrentHint(`Hint: ${currentC.hints[0]}`);
          setShowHint(true);
          audioManager.play('hint');
        }
      }
    }, 10000); // 10s auto hint
  };

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [currentChallengeIndex, activeTab, challengeSubmitted]);

  // Initial sound on launch
  useEffect(() => {
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Mind and Behaviour Research Observatory.');
  }, []);

  // S-O-R Stimulus selector logic
  const handleStimulusChange = (stim: string) => {
    setSelectedStimulus(stim);
    audioManager.play('tap');
    if (stim === 'Sudden Siren Alarm') {
      setSorState({ internalState: 'Fear & Cognitive Appraisal', overtAction: 'Evacuating room & Pulse spiking' });
    } else if (stim === 'Unexpected Math Test') {
      setSorState({ internalState: 'Performance Anxiety / Memory Retrieval', overtAction: 'Gripping pencil tight & Sweating' });
    } else if (stim === 'Compliment from Peer') {
      setSorState({ internalState: 'Dopamine Release & Self-Esteem Boost', overtAction: 'Smiling & Verbal thank you' });
    } else {
      setSorState({ internalState: 'Satiety Center Activation', overtAction: 'Reaching out for food' });
    }
  };

  // Discovery Submit Handler
  const handleDiscoverySubmit = () => {
    if (discoveryChoice === null) return;
    setDiscoverySubmitted(true);
    if (discoveryChoice === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowSparkle(true);
      speechManager.speak('Correct! Scientific psychology overrides common sense intuition through empirical testing.');
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Common sense relies on hindsight bias, whereas psychology tests empirically.');
    }
  };

  // Challenge Option Submit Handler
  const handleChallengeSubmit = () => {
    if (selectedOption === null) return;
    setChallengeSubmitted(true);
    resetInactivityTimer();

    const currentC = CHALLENGES[currentChallengeIndex];
    const isCorrect = selectedOption === currentC.correctIndex;

    // Update BKT & SRS
    const updatedBKT = bktUpdate(bktStates[currentC.nodeId] || createBKTState(currentC.nodeId), isCorrect);
    setBktStates(prev => ({ ...prev, [currentC.nodeId]: updatedBKT }));

    const updatedSRS = sm2Update(srsItems[currentC.nodeId] || createReviewItem(currentC.nodeId), isCorrect ? 5 : 1);
    setSrsItems(prev => ({ ...prev, [currentC.nodeId]: updatedSRS }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('chime');
      setScore(prev => prev + 10);
      setCompletedChallenges(prev => new Set(prev).add(currentC.id));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
      speechManager.speak('Excellent understanding of psychological concepts!');
    } else {
      audioManager.play('drop-wrong');
      audioManager.play('error');
      speechManager.speak('Incorrect answer. Review the concept explanation below.');
    }
  };

  const handleNextChallenge = () => {
    setChallengeSubmitted(false);
    setSelectedOption(null);
    setShowHint(false);
    audioManager.play('swoop');

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      recordGameScore('c11_psy_what_is_psychology', score + 10);
      if (onComplete) {
        onComplete(score + 10);
      }
      setActiveTab('summary');
    }
  };

  // Interdisciplinary Matrix Cases Data
  const matrixCases = [
    {
      problem: 'Flight Cockpit Layout causing Pilot Altitude Disorientations',
      branch: 'Cognitive & Human Factors Psychology',
      discipline: 'Aeronautical Engineering & Ergonomics',
      solution: 'Redesigning head-up display interfaces to align with human visual-spatial attention capacity.'
    },
    {
      problem: 'Eyewitness Memory Distortion in Criminal Trials',
      branch: 'Cognitive & Legal Psychology',
      discipline: 'Law & Criminology',
      solution: 'Implementing cognitive interview techniques and double-blind police lineups to prevent misinformation bias.'
    },
    {
      problem: 'Consumer Impulse Purchasing on E-Commerce Apps',
      branch: 'Industrial/Organisational & Behavioural Economics',
      discipline: 'Economics & Marketing',
      solution: 'Utilizing cognitive loss-aversion framing and dark-pattern friction nudges.'
    },
    {
      problem: 'Post-Heart Attack Patient Anxiety & Non-Adherence to Medication',
      branch: 'Health Psychology & Clinical Psychology',
      discipline: 'Medicine & Cardiology',
      solution: 'Designing cognitive-behavioural stress management (CBSM) protocols to improve cardiac rehabilitation.'
    }
  ];

  // Common Sense Myths Data
  const commonSenseMyths = [
    {
      myth: 'Myth 1: "Venting anger by punching a bag reduces aggressive urges."',
      empiricalResult: 'False (EMPIRICALLY DISPROVED). Bushman (2002) showed that venting keeps physiological heart rate high and reinforces neural pathways for aggression.',
      psychologicalPrinciple: 'Rumination & Physiological Arousal maintenance.'
    },
    {
      myth: 'Myth 2: "Opposites attract in romantic relationships."',
      empiricalResult: 'False (EMPIRICALLY DISPROVED). Decades of social psychological research prove the Similarity-Attraction Effect (homophily) is vastly stronger.',
      psychologicalPrinciple: 'Attitude similarity, socio-demographic alignment, and cognitive validation.'
    },
    {
      myth: 'Myth 3: "Subliminal messages on TV can easily brainwash people to buy products."',
      empiricalResult: 'False (EMPIRICALLY DISPROVED). Subliminal stimuli have minor brief priming effects in lab settings, but cannot force complex purchase actions.',
      psychologicalPrinciple: 'Threshold of conscious awareness & executive cognitive control.'
    },
    {
      myth: 'Myth 4: "Human memory acts like an exact digital video recording of past events."',
      empiricalResult: 'False (EMPIRICALLY DISPROVED). Loftus showed memory is reconstructive, malleable, and easily distorted by post-event suggestion.',
      psychologicalPrinciple: 'Constructive Schema Processing & Memory Fallibility.'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-3 md:p-6 select-none">
      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered! Keep Going!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />

      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900/90 border border-slate-800 rounded-2xl p-4 mb-6 shadow-2xl backdrop-blur-md flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-gold-500 via-gold-500 to-purple-600 flex items-center justify-center text-2xl font-bold shadow-lg shadow-gold-500/30">
            Ψ
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-gold-400 via-gold-300 to-purple-400">
              ISC Class 11: What is Psychology?
            </h1>
            <p className="text-xs text-slate-400">Interactive Mind, Behaviour & Interdisciplinary Observatory</p>
          </div>
        </div>

        {/* NAVIGATION TABS */}
        <div className="flex bg-slate-950 p-1.5 rounded-xl border border-slate-800 gap-1 text-xs md:text-sm font-semibold">
          <button
            onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'discovery' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            1. Discovery
          </button>
          <button
            onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'lab' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            2. Interactive Labs
          </button>
          <button
            onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'challenges' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            3. Challenges ({completedChallenges.size}/{CHALLENGES.length})
          </button>
          <button
            onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
            className={`px-4 py-2 rounded-lg transition-all ${activeTab === 'summary' ? 'bg-gold-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'}`}
          >
            4. Real-World Audit
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-7xl mx-auto">
        {/* ================= TAB 1: DISCOVERY ================= */}
        {activeTab === 'discovery' && (
          <div className="space-y-6">
            {/* SCENARIO CARD */}
            <div className="bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 p-6 rounded-2xl border border-gold-900/50 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
              <span className="text-xs font-bold uppercase tracking-widest text-gold-400 bg-gold-950/80 px-3 py-1 rounded-full border border-gold-800">
                Observatory Scenario
              </span>
              <h2 className="text-2xl font-bold text-white mt-3 mb-2">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-3">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs italic bg-slate-950/60 p-3 rounded-lg border border-slate-800">{SCENARIO.context}</p>
            </div>

            {/* DISCOVERY COUNTER-INTUITIVE QUESTION */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-3 h-3 rounded-full bg-gold-400 animate-ping"></span>
                <h3 className="text-lg font-bold text-gold-300">Initial Discovery Challenge</h3>
              </div>
              <p className="text-slate-200 font-medium mb-4 text-sm leading-relaxed">{DISCOVERY_QUESTION.question}</p>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => (
                  <button
                    key={idx}
                    disabled={discoverySubmitted}
                    onClick={() => { setDiscoveryChoice(idx); audioManager.play('tap'); }}
                    className={`w-full text-left p-4 rounded-xl border text-sm transition-all flex items-start gap-3 ${
                      discoveryChoice === idx
                        ? 'bg-gold-900/60 border-gold-400 text-white font-medium shadow-md'
                        : 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-gold-400 shrink-0 mt-0.5">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              {!discoverySubmitted ? (
                <button
                  disabled={discoveryChoice === null}
                  onClick={handleDiscoverySubmit}
                  className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-400 hover:to-gold-500 disabled:opacity-50 transition-all shadow-lg shadow-gold-500/25"
                >
                  Verify Discovery Answer
                </button>
              ) : (
                <div className="p-4 rounded-xl bg-slate-950 border border-gold-800/80 animate-fade-in">
                  <p className="text-xs font-bold text-gold-400 mb-1">Scientific Insight:</p>
                  <p className="text-sm text-slate-200">{DISCOVERY_QUESTION.hintAfter}</p>
                  <button
                    onClick={() => { setActiveTab('lab'); audioManager.play('whoosh'); }}
                    className="mt-4 px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md transition-all"
                  >
                    Proceed to Interactive Exploration Labs →
                  </button>
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS (RENDERED MANDATORY SECTION) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-6">
              <h3 className="text-lg font-bold text-purple-300 border-b border-slate-800 pb-2">Hypothesis & Prediction Tests</h3>
              {PREDICTION_QUESTIONS.map((pq, qIdx) => (
                <div key={qIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-sm font-semibold text-slate-200 mb-3">{pq.question}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    {pq.options.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setPredictionAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`p-3 rounded-lg border text-xs text-left transition-all ${
                          predictionAnswers[qIdx] === oIdx
                            ? 'bg-purple-900/60 border-purple-400 text-white font-medium'
                            : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                  {predictionAnswers[qIdx] !== undefined && (
                    <div className="text-xs text-slate-400 bg-slate-900 p-2.5 rounded border border-slate-800">
                      <span className="font-bold text-purple-400">Lab Verification Instruction: </span>
                      {pq.verifyInstruction}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 2: INTERACTIVE LABS ================= */}
        {activeTab === 'lab' && (
          <div className="space-y-6">
            {/* LAB SELECTOR HEADER */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { setActiveLabIndex(idx); audioManager.play('pop'); }}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                    activeLabIndex === idx
                      ? 'bg-gradient-to-br from-gold-900 to-purple-950 border-gold-400 text-white shadow-lg ring-1 ring-gold-400/50'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-[10px] text-gold-400 uppercase font-bold mb-1">Step 0{idx + 1}</div>
                  <div className="line-clamp-2">{step.title.split(':')[1] || step.title}</div>
                </button>
              ))}
            </div>

            {/* ACTIVE LAB CARD */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">{EXPLORATION_STEPS[activeLabIndex].title}</h3>
                  <p className="text-xs text-slate-400 mt-1">{EXPLORATION_STEPS[activeLabIndex].instruction}</p>
                </div>
                <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-[10px] text-gold-300 font-mono">
                  Node: {EXPLORATION_STEPS[activeLabIndex].nodeId}
                </span>
              </div>

              {/* LAB 1: S-O-R & OVERT/COVERT LAB */}
              {activeLabIndex === 0 && (
                <div className="space-y-6">
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs text-slate-400 self-center font-bold mr-2">Select Stimulus Trigger:</span>
                    {['Sudden Siren Alarm', 'Unexpected Math Test', 'Compliment from Peer', 'Smell of Delicious Food'].map((s) => (
                      <button
                        key={s}
                        onClick={() => handleStimulusChange(s)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          selectedStimulus === s
                            ? 'bg-red-950 border-red-500 text-red-200 shadow'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>

                  <SRModelSVG activeStimulus={selectedStimulus} activeState={sorState.internalState} />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-purple-900/60">
                      <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Internal COVERT Behaviour</h4>
                      <p className="text-sm text-purple-200 font-semibold">{sorState.internalState}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Unobservable directly from outside. Requires self-report, EEG, or cognitive response measurements.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/60">
                      <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2">Outward OVERT Behaviour</h4>
                      <p className="text-sm text-emerald-200 font-semibold">{sorState.overtAction}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        Directly visible, camera-recordable physical motor activity or verbal utterance.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: HISTORICAL PARADIGMS */}
              {activeLabIndex === 1 && (
                <div className="space-y-4">
                  <SchoolsOfThoughtSVG selectedSchool={selectedParadigm} onSelect={(s) => setSelectedParadigm(s)} />
                  <div className="p-4 rounded-xl bg-slate-950 border border-gold-900/60">
                    <h4 className="text-sm font-bold text-gold-300">Detailed Paradigm Analysis: {selectedParadigm}</h4>
                    <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                      {selectedParadigm === 'Structuralism' && 'Pioneered by Wilhelm Wundt (1879) & Titchener. Used Introspection under controlled lab conditions to analyze conscious experience into elementary sensory structures.'}
                      {selectedParadigm === 'Functionalism' && 'Founded by William James (1890). Influenced by Darwin, it shifted focus from what mind IS to what mind DOES in adapting organisms to environmental demands.'}
                      {selectedParadigm === 'Gestalt' && 'Formed by Wertheimer, Koffka & Köhler (1912). Proved that perceptual organization creates unified experience where the whole is qualitatively distinct from sensory parts.'}
                      {selectedParadigm === 'Behaviourism' && 'Pioneered by John B. Watson (1913) & Skinner. Banished subjective introspection; defined psychology purely as objective science of observable Stimulus-Response actions.'}
                      {selectedParadigm === 'Psychoanalysis' && 'Developed by Sigmund Freud (1900). Emphasized unconscious drives, repressed desires, and early childhood experiences through psychoanalytic therapy.'}
                      {selectedParadigm === 'Humanism' && 'Pioneered by Carl Rogers & Abraham Maslow (1950s) as "Third Force". Reasserted human free will, dignity, personal growth, and self-actualization.'}
                      {selectedParadigm === 'Cognitive' && 'Emerging in 1950s (Neisser, Broadbent). Re-opened the "black box" of mind using computer metaphor: studying memory retrieval, attention filters, and logical reasoning.'}
                    </p>
                  </div>
                </div>
              )}

              {/* LAB 3: MIND-BODY BIOFEEDBACK */}
              {activeLabIndex === 2 && (
                <div className="space-y-6">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center gap-4">
                    <label className="text-xs font-bold text-slate-300 shrink-0">Adjust Psychological Stress Level:</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stressLevel}
                      onChange={(e) => setStressLevel(Number(e.target.value))}
                      className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                    />
                    <span className={`px-3 py-1 rounded-lg text-xs font-bold ${stressLevel > 60 ? 'bg-red-950 text-red-300' : 'bg-emerald-950 text-emerald-300'}`}>
                      {stressLevel}% Stress
                    </span>
                  </div>

                  <MindBodyBrainSVG stressLevel={stressLevel} />

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
                    <span className="font-bold text-purple-400">Psychoneuroimmunology Insight: </span>
                    As subjective stress increases, the hypothalamus signals the pituitary gland to release ACTH, driving the adrenal cortex to secrete cortisol. Sustained high cortisol suppresses lymphocyte activity, proving that internal mental states directly regulate somatic biological health.
                  </div>
                </div>
              )}

              {/* LAB 4: INTERDISCIPLINARY MATRIX */}
              {activeLabIndex === 3 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                    {matrixCases.map((c, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedMatrixCase(idx); audioManager.play('tap'); }}
                        className={`p-3 rounded-xl border text-left transition-all ${
                          selectedMatrixCase === idx
                            ? 'bg-gold-950 border-gold-400 text-white shadow-lg'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[10px] font-bold text-gold-400 mb-1">Case 0{idx + 1}</div>
                        <div className="text-xs font-semibold line-clamp-2">{c.problem}</div>
                      </button>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-gold-900/60 space-y-3">
                    <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                      <span className="text-xs font-bold text-gold-400 uppercase tracking-wider">Applied Case Analysis</span>
                      <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-300 font-mono">
                        {matrixCases[selectedMatrixCase].branch}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white">{matrixCases[selectedMatrixCase].problem}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">Partner Discipline:</span>
                        <span className="text-sm font-semibold text-gold-300">{matrixCases[selectedMatrixCase].discipline}</span>
                      </div>
                      <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
                        <span className="text-[11px] font-bold text-slate-400 block mb-1">Psychological Solution / Protocol:</span>
                        <span className="text-xs text-slate-200">{matrixCases[selectedMatrixCase].solution}</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: EMPIRICAL VS COMMON SENSE */}
              {activeLabIndex === 4 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {commonSenseMyths.map((m, idx) => (
                      <button
                        key={idx}
                        onClick={() => { setSelectedMythIndex(idx); setMythRevealed(false); audioManager.play('tap'); }}
                        className={`p-4 rounded-xl border text-left text-xs font-semibold transition-all ${
                          selectedMythIndex === idx
                            ? 'bg-purple-950 border-purple-400 text-white shadow-md'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        {m.myth}
                      </button>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-slate-950 border border-purple-900/60 space-y-4">
                    <h4 className="text-base font-bold text-purple-300">
                      {commonSenseMyths[selectedMythIndex].myth}
                    </h4>

                    {!mythRevealed ? (
                      <button
                        onClick={() => { setMythRevealed(true); audioManager.play('sparkle'); }}
                        className="px-5 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg transition-all"
                      >
                        Run Empirical Verification Test →
                      </button>
                    ) : (
                      <div className="space-y-3 animate-fade-in">
                        <div className="p-3 rounded-lg bg-red-950/40 border border-red-800 text-red-200 text-xs leading-relaxed">
                          <span className="font-bold">Empirical Result: </span>
                          {commonSenseMyths[selectedMythIndex].empiricalResult}
                        </div>
                        <div className="p-3 rounded-lg bg-gold-950/40 border border-gold-800 text-gold-200 text-xs">
                          <span className="font-bold">Underlying Psychological Principle: </span>
                          {commonSenseMyths[selectedMythIndex].psychologicalPrinciple}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS (RENDERED MANDATORY SECTION) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-base font-bold text-gold-300 border-b border-slate-800 pb-2">Lab Observation Checkpoint</h3>
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs font-semibold text-slate-200 mb-3">{oq.question}</p>
                  <div className="space-y-2">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <button
                        key={oIdx}
                        onClick={() => {
                          setObservationAnswers(prev => ({ ...prev, [idx]: oIdx }));
                          audioManager.play('tap');
                        }}
                        className={`w-full text-left p-2.5 rounded-lg border text-xs transition-all ${
                          observationAnswers[idx] === oIdx
                            ? 'bg-gold-950 border-gold-400 text-white'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= TAB 3: CHALLENGES ================= */}
        {activeTab === 'challenges' && (
          <div className="space-y-6 max-w-4xl mx-auto">
            {/* PROGRESS & MASTERY HEADER */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 shadow-xl flex flex-wrap justify-between items-center gap-4">
              <div>
                <span className="text-xs text-slate-400 font-bold block">CHALLENGE PROGRESS</span>
                <span className="text-lg font-extrabold text-white">
                  Question {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-bold block">CURRENT SCORE</span>
                  <span className="text-lg font-black text-gold-400">{score} PTS</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-xs text-emerald-400">
                  {Math.round(((currentChallengeIndex + 1) / CHALLENGES.length) * 100)}%
                </div>
              </div>
            </div>

            {/* HINT BUBBLE COMPONENT */}
            <HintBubble show={showHint} text={currentHint} />

            {/* CHALLENGE CARD */}
            {(() => {
              const currentC = CHALLENGES[currentChallengeIndex];
              return (
                <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-2xl space-y-6 relative">
                  {/* METADATA BADGES */}
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div className="flex items-center gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        currentC.difficulty === 'foundation' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        currentC.difficulty === 'standard' ? 'bg-gold-950 text-gold-300 border border-gold-800' :
                        'bg-purple-950 text-purple-300 border border-purple-800'
                      }`}>
                        {currentC.difficulty}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">{currentC.competencyLevel}</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-500">Node: {currentC.nodeId}</span>
                  </div>

                  {/* QUESTION TEXT */}
                  <h3 className="text-lg md:text-xl font-bold text-white leading-relaxed">
                    {currentC.question}
                  </h3>

                  {/* OPTIONS GRID */}
                  <div className="space-y-3">
                    {currentC.options.map((optionText, optIdx) => {
                      const isSelected = selectedOption === optIdx;
                      let btnStyle = 'bg-slate-950/80 border-slate-800 text-slate-300 hover:border-slate-700';
                      if (challengeSubmitted) {
                        if (optIdx === currentC.correctIndex) {
                          btnStyle = 'bg-emerald-950/90 border-emerald-400 text-emerald-100 font-semibold shadow-lg ring-1 ring-emerald-500';
                        } else if (isSelected) {
                          btnStyle = 'bg-red-950/90 border-red-500 text-red-200 font-semibold';
                        }
                      } else if (isSelected) {
                        btnStyle = 'bg-gold-950 border-gold-400 text-white font-semibold ring-1 ring-gold-400';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={challengeSubmitted}
                          onClick={() => {
                            setSelectedOption(optIdx);
                            audioManager.play('tap');
                            resetInactivityTimer();
                          }}
                          className={`w-full text-left p-4 rounded-xl border text-sm transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                        >
                          <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                            isSelected ? 'bg-gold-600 text-white' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{optionText}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* SUBMIT / NEXT CONTROLS */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => {
                        setShowHint(!showHint);
                        if (!showHint && currentC.hints.length > 0) {
                          setCurrentHint(currentC.hints[0]);
                          audioManager.play('hint');
                        }
                      }}
                      className="text-xs text-gold-400 hover:text-gold-300 font-semibold flex items-center gap-1"
                    >
                      💡 {showHint ? 'Hide Hint' : 'Request Hint'}
                    </button>

                    {!challengeSubmitted ? (
                      <button
                        disabled={selectedOption === null}
                        onClick={handleChallengeSubmit}
                        className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-gold-600 to-purple-600 hover:from-gold-500 hover:to-purple-500 disabled:opacity-50 transition-all shadow-lg shadow-gold-500/25"
                      >
                        Submit Response
                      </button>
                    ) : (
                      <button
                        onClick={handleNextChallenge}
                        className="px-6 py-3 rounded-xl font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg shadow-emerald-500/25"
                      >
                        Next Question →
                      </button>
                    )}
                  </div>

                  {/* EXPLANATION & MISCONCEPTIONS BOX */}
                  {challengeSubmitted && (
                    <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3 animate-fade-in">
                      <div>
                        <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block mb-1">Scientific Explanation</span>
                        <p className="text-xs text-slate-300 leading-relaxed">{currentC.explanation}</p>
                      </div>

                      {currentC.misconceptionIndex !== undefined && (
                        <div className="p-3 rounded-lg bg-gold-950/40 border border-gold-800 text-xs">
                          <span className="font-bold text-gold-300 block mb-0.5">Common Misconception Alert:</span>
                          <span className="text-gold-200">{MISCONCEPTIONS[currentC.misconceptionIndex].fact}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })()}
          </div>
        )}

        {/* ================= TAB 4: REAL-WORLD SUMMARY & MISCONCEPTIONS ================= */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            {/* REAL WORLD ACTIVITY CARD (RENDERED MANDATORY SECTION) */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-gold-900/60 shadow-2xl space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-xs font-bold uppercase">
                  Real-World Application Activity
                </span>
              </div>
              <h2 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
              <p className="text-xs text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
                    <span className="font-bold text-gold-400 block">Protocol Step 0{idx + 1}</span>
                    <p className="leading-relaxed">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* EXPANDED MISCONCEPTIONS SUMMARY */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl space-y-4">
              <h3 className="text-lg font-bold text-amber-300 border-b border-slate-800 pb-2">
                Core Misconceptions & Scientific Corrections
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((m) => (
                  <div key={m.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="text-xs font-bold text-red-400 flex items-center gap-1">
                      <span>❌ Popular Myth:</span>
                      <span>{m.myth}</span>
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed pl-3 border-l-2 border-emerald-500">
                      <span className="font-bold text-emerald-400">Scientific Fact: </span>
                      {m.fact}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SYLLABUS NODES COVERAGE GRID */}
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
              <h3 className="text-sm font-bold text-slate-300 mb-3 uppercase tracking-wider">
                ISC Curriculum Mastered Nodes (38 Node Total Coverage)
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {ALL_NODE_IDS.map((nodeId) => {
                  const bkt = bktStates[nodeId];
                  const level = bkt ? getMasteryLevel(bkt) : 'novice';
                  return (
                    <span
                      key={nodeId}
                      className={`px-2 py-1 rounded text-[10px] font-mono border ${
                        level === 'mastered' ? 'bg-emerald-950 text-emerald-300 border-emerald-800' :
                        level === 'proficient' ? 'bg-gold-950 text-gold-300 border-gold-800' :
                        'bg-slate-950 text-slate-400 border-slate-800'
                      }`}
                    >
                      {nodeId}
                    </span>
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

export default C11_PsyWhatIsPsychologyCBSESim;