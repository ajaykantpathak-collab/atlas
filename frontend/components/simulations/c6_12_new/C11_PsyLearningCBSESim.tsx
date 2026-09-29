'use client';

import React, { useState, useEffect, useRef } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// ALL NODE IDS FOR ISC PSYCHOLOGY: LEARNING
// ==========================================
const NODE_DEF_NATURE = 'c11_psy_cbse_058';
const NODE_PAVLOV_EXP = 'c11_psy_cbse_059';
const NODE_STAGES_CLASSICAL = 'c11_psy_cbse_060';
const NODE_DETERMINANTS_CLASSICAL = 'c11_psy_cbse_061';
const NODE_SKINNER_BOX = 'c11_psy_cbse_062';
const NODE_REINFORCEMENT_SCHEDULES = 'c11_psy_cbse_063';
const NODE_KEY_PROCESSES = 'c11_psy_cbse_064';
const NODE_OBSERVATIONAL = 'c11_psy_cbse_065';
const NODE_LEARNED_HELPLESSNESS = 'c11_psy_cbse_066';
const NODE_INSIGHT_LEARNING = 'c11_psy_cbse_067';
const NODE_LATENT_COGNITIVE_MAPS = 'c11_psy_cbse_068';
const NODE_VERBAL_METHODS = 'c11_psy_cbse_069';
const NODE_VERBAL_DETERMINANTS = 'c11_psy_cbse_070';
const NODE_SKILL_NATURE = 'c11_psy_cbse_071';
const NODE_FITTS_MODEL = 'c11_psy_cbse_072';
const NODE_MOTIVATION_LEARNING = 'c11_psy_cbse_073';
const NODE_PREPAREDNESS = 'c11_psy_cbse_074';
const NODE_PUNISHMENT = 'c11_psy_cbse_075';
const NODE_DISABILITIES_DEF = 'c11_psy_cbse_076';
const NODE_DISABILITIES_SYMPTOMS = 'c11_psy_cbse_077';
const NODE_DISABILITIES_REMEDIATION = 'c11_psy_cbse_078';
const NODE_CLASSICAL_VS_OPERANT = 'c11_psy_cbse_079';
const NODE_PRIMARY_SECONDARY = 'c11_psy_cbse_080';
const NODE_SHAPING = 'c11_psy_cbse_081';
const NODE_CLASSICAL_OPERANT_DIFF = 'c11_psy_cbse_082';

const ALL_NODE_IDS = [
  'c11_psy_cbse_058', 'c11_psy_cbse_059', 'c11_psy_cbse_060', 'c11_psy_cbse_061',
  'c11_psy_cbse_062', 'c11_psy_cbse_063', 'c11_psy_cbse_064', 'c11_psy_cbse_065',
  'c11_psy_cbse_066', 'c11_psy_cbse_067', 'c11_psy_cbse_068', 'c11_psy_cbse_069',
  'c11_psy_cbse_070', 'c11_psy_cbse_071', 'c11_psy_cbse_072', 'c11_psy_cbse_073',
  'c11_psy_cbse_074', 'c11_psy_cbse_075', 'c11_psy_cbse_076', 'c11_psy_cbse_077',
  'c11_psy_cbse_078', 'c11_psy_cbse_079', 'c11_psy_cbse_080', 'c11_psy_cbse_081',
  'c11_psy_cbse_082'
];

// ==========================================
// MANDATORY SECTION 1: SCENARIO
// ==========================================
const SCENARIO = {
  title: 'Behavioral & Cognitive Experimental Psychology Laboratory',
  intro: 'Welcome to the Virtual Psychology Research Facility! You are directing experimental paradigms in classical conditioning, operant response dynamics, cognitive mapping, observational modeling, and skill acquisition.',
  context: 'In this simulation, you will manipulate temporal contiguity in Pavlovian chambers, configure reinforcement schedules in Skinner boxes, demonstrate Tolman\'s latent learning in complex mazes, trace Fitts\' motor skill phases, and evaluate learning disability remediation strategies.'
};

// ==========================================
// MANDATORY SECTION 2: DISCOVERY_QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  question: 'If a rat explores a complex maze without receiving any food reward for 10 consecutive days, what happens to its learning compared to a rat that receives food every day?',
  options: [
    'It learns nothing because reinforcement is strictly mandatory for any learning to occur.',
    'It builds an internal cognitive map silently, and when food is introduced on Day 11, its performance instantly matches or exceeds the daily-rewarded group.',
    'It develops learned helplessness and loses the physical capacity to navigate the maze.',
    'It unlearns basic motor skills due to lack of positive motivation.'
  ],
  correctIndex: 1,
  hintAfter: 'Edward Tolman demonstrated that learning can occur latently without immediate reinforcement. Reinforcement affects performance (manifestation), not the acquisition of the cognitive representation!'
};

// ==========================================
// MANDATORY SECTION 3: EXPLORATION_STEPS
// ==========================================
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Classical Conditioning & Acquisition Contiguity',
    instruction: 'Adjust the Inter-Stimulus Interval (ISI) between the Neutral Stimulus (Tone) and Unconditioned Stimulus (Food) to observe how CS-US temporal pairing drives conditioning.',
    interactionType: 'pavlovian-pairing',
    nodeId: NODE_PAVLOV_EXP
  },
  {
    title: 'Lab 2: Operant Conditioning & Reinforcement Schedules',
    instruction: 'Toggle between FR, VR, FI, and VI reinforcement schedules in the Skinner Box to plot real-time cumulative response curves and observe extinction dynamics.',
    interactionType: 'skinner-box-schedule',
    nodeId: NODE_REINFORCEMENT_SCHEDULES
  },
  {
    title: 'Lab 3: Tolman\'s Latent Learning & Cognitive Maps',
    instruction: 'Simulate the 3 experimental groups in Tolman & Honzik\'s maze (Continuous Reward, No Reward, Delayed Reward on Day 11) to inspect error curves.',
    interactionType: 'tolman-cognitive-map',
    nodeId: NODE_LATENT_COGNITIVE_MAPS
  },
  {
    title: 'Lab 4: Fitts\' 3-Phase Motor Skill Acquisition Model',
    instruction: 'Trace a subject\'s reaction time and movement error rate across Cognitive, Associative, and Autonomous phases as practice hours increase.',
    interactionType: 'fitts-skill-phases',
    nodeId: NODE_FITTS_MODEL
  },
  {
    title: 'Lab 5: Learning Disability Diagnostic & Remediation Simulator',
    instruction: 'Identify symptoms of Dyslexia, Dyscalculia, and Dysgraphia, and test multisensory and token economy intervention strategies.',
    interactionType: 'disability-remediation',
    nodeId: NODE_DISABILITIES_REMEDIATION
  }
];

// ==========================================
// MANDATORY SECTION 4: PREDICTION_QUESTIONS
// ==========================================
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: Which operant schedule of reinforcement generates the highest response rate with maximum resistance to extinction?',
    options: [
      'Fixed Interval (FI)',
      'Fixed Ratio (FR)',
      'Variable Ratio (VR)',
      'Continuous Reinforcement (CRF)'
    ],
    correctIndex: 2,
    verifyInstruction: 'Test Variable Ratio (VR) vs Fixed Ratio (FR) in Lab 2 to observe cumulative slope and persistence during extinction trials.',
    nodeId: NODE_REINFORCEMENT_SCHEDULES
  },
  {
    question: 'Predict: What temporal sequence between CS and US yields the fastest classical conditioning acquisition?',
    options: [
      'Simultaneous conditioning (CS and US presented at the exact same instant)',
      'Delayed conditioning (CS begins slightly before US and continues until US starts)',
      'Backward conditioning (US is presented before CS)',
      'Trace conditioning with a 30-second delay gap'
    ],
    correctIndex: 1,
    verifyInstruction: 'Vary the Inter-Stimulus Interval (ISI) slider in Lab 1 between 0ms, 500ms, and negative values to observe salivation drops acquired.',
    nodeId: NODE_DETERMINANTS_CLASSICAL
  }
];

// ==========================================
// MANDATORY SECTION 5: OBSERVATION_QUESTIONS
// ==========================================
const OBSERVATION_QUESTIONS = [
  {
    question: 'What distinctive pattern appears on a cumulative recorder graph under a Fixed-Interval (FI) schedule?',
    observableOptions: [
      'A completely flat horizontal line with zero responses.',
      'A post-reinforcement pause followed by an accelerated response curve ("scallop pattern").',
      'A steep, uninterrupted straight vertical-like diagonal line without pauses.',
      'An erratic waveform with random spikes and sudden drops.'
    ],
    correctIndex: 1,
    nodeId: NODE_REINFORCEMENT_SCHEDULES
  },
  {
    question: 'What happens to maze error rates in Group C (Delayed Reward) on Day 12 right after food is introduced on Day 11?',
    observableOptions: [
      'Errors remain high because 10 days without reward destroyed their ability to learn.',
      'Errors drop dramatically overnight to match or beat the continuously rewarded group.',
      'Errors increase because food causes panic and disorientation.',
      'Errors decline slowly over 30 additional days of gradual trial-and-error.'
    ],
    correctIndex: 1,
    nodeId: NODE_LATENT_COGNITIVE_MAPS
  }
];

// ==========================================
// MANDATORY SECTION 6: REAL_WORLD_ACTIVITY
// ==========================================
const REAL_WORLD_ACTIVITY = {
  title: 'Applied Behavioral & Educational Intervention Plan',
  description: 'Design a structured behavioral shaping and skill-acquisition program for a student struggling with task completion and motor writing fluency.',
  steps: [
    'Step 1: Perform baseline assessment of target behavior (e.g., current focus span = 4 minutes; writing speed = 6 words/min).',
    'Step 2: Define primary reinforcers (break time) and secondary reinforcers (token system: 5 stars = 15-minute free activity).',
    'Step 3: Implement shaping via successive approximations (reinforce 5 mins of focus, then 7 mins, then 10 mins).',
    'Step 4: Transition motor writing from Cognitive Phase (heavy conscious control) to Autonomous Phase through multisensory tracing and spaced practice.'
  ]
};

// ==========================================
// MISCONCEPTIONS (6 Topic-Specific)
// ==========================================
const MISCONCEPTIONS = [
  {
    id: 'misc_1',
    statement: 'Negative reinforcement is the same thing as punishment.',
    correction: 'Negative reinforcement INCREASES a target behavior by removing an aversive stimulus (e.g., taking medicine to remove a headache). Punishment DECREASES a target behavior by introducing an aversive stimulus or taking away a pleasant one.',
    nodeId: NODE_PUNISHMENT
  },
  {
    id: 'misc_2',
    statement: 'Learning only occurs when physical behavior changes immediately.',
    correction: 'Tolman showed that learning can occur latently (cognitive map formation) without any immediate change in performance until motivation/reinforcement is introduced.',
    nodeId: NODE_LATENT_COGNITIVE_MAPS
  },
  {
    id: 'misc_3',
    statement: 'Extinction completely erases the learned association from memory.',
    correction: 'Extinction suppresses performance through new inhibitory learning. Spontaneous recovery proves the original trace remains intact.',
    nodeId: NODE_KEY_PROCESSES
  },
  {
    id: 'misc_4',
    statement: 'Learning disabilities are caused by low intelligence or poor organ vision/hearing.',
    correction: 'Learning disabilities (e.g., Dyslexia, Dyscalculia) are neurodevelopmental processing differences present in individuals with normal or above-average IQ and intact senses.',
    nodeId: NODE_DISABILITIES_DEF
  },
  {
    id: 'misc_5',
    statement: 'Classical conditioning and Operant conditioning are identical processes.',
    correction: 'Classical conditioning pairs involuntary autonomic responses with antecedent stimuli (CS-US). Operant conditioning pairs voluntary behaviors with consequent outcomes (R-S).',
    nodeId: NODE_CLASSICAL_VS_OPERANT
  },
  {
    id: 'misc_6',
    statement: 'Any stimulus can be conditioned equally well to any response.',
    correction: 'Seligman and Garcia demonstrated biological preparedness: organisms are evolutionary wired to learn certain associations (taste-illness) much faster than arbitrary pairings (light-illness).',
    nodeId: NODE_PREPAREDNESS
  }
];

// ==========================================
// INTERFACES
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'drag-sort' | 'numeric' | 'match';
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
// 22+ PROGRESSIVE CHALLENGES
// ==========================================
const CHALLENGES: Challenge[] = [
  // FOUNDATION TIER (7 Challenges)
  {
    id: 'c1',
    nodeId: NODE_DEF_NATURE,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which statement accurately captures the formal psychological definition of learning?',
    options: [
      'Any temporary change in behavior caused by fatigue, drugs, or physical maturation.',
      'A relatively permanent change in behavior or behavioral potential produced by experience or practice.',
      'An innate biological reflex present at birth without prior environmental interaction.',
      'A temporary emotional reaction to sudden environmental stress.'
    ],
    correctIndex: 1,
    explanation: 'Learning is defined as a relatively permanent change in behavior or mental associations resulting from experience, distinguishing it from temporary states like fatigue or maturation.',
    hints: [
      'Think about whether learning goes away immediately after a resting period.',
      'Does learning come from experience or purely from biological growth?',
      'Key words are "relatively permanent" and "experience".'
    ]
  },
  {
    id: 'c2',
    nodeId: NODE_PAVLOV_EXP,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'In Pavlov\'s classic experiment with dogs, what was the Unconditioned Stimulus (US)?',
    options: [
      'The ringing sound of the bell',
      'The meat powder / food',
      'The lab assistant\'s footsteps',
      'The salivation response to the bell'
    ],
    correctIndex: 1,
    explanation: 'Food naturally and automatically elicits salivation without any prior training, making it the Unconditioned Stimulus (US).',
    hints: [
      'Unconditioned means unlearned or natural.',
      'Which stimulus triggers salivation without any prior conditioning?',
      'The food powder naturally stimulates the salivary reflex.'
    ]
  },
  {
    id: 'c3',
    nodeId: NODE_STAGES_CLASSICAL,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'What is the Conditioned Response (CR) in Pavlovian classical conditioning?',
    options: [
      'The unlearned reflex to food powder',
      'The learned salivation response triggered by the Conditioned Stimulus (bell)',
      'The physical presentation of meat powder',
      'The neutral auditory frequency of the tuning fork'
    ],
    correctIndex: 1,
    explanation: 'The CR is the learned response to a previously neutral stimulus (CS) after conditioning has taken place.',
    hints: [
      'Conditioned means learned.',
      'What does the dog do when it hears the bell after pairing?',
      'It is salivation in response to the bell.'
    ]
  },
  {
    id: 'c4',
    nodeId: NODE_SKINNER_BOX,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'What is the primary defining feature of Operant Conditioning formulated by B.F. Skinner?',
    options: [
      'Behavior is governed by antecedent involuntary autonomic reflexes.',
      'Behavior is influenced, controlled, and maintained by its consequences.',
      'Learning takes place entirely through unconscious dream analysis.',
      'Responses are learned solely by watching peer models without direct action.'
    ],
    correctIndex: 1,
    explanation: 'Skinner emphasized that operant behavior operates on the environment to produce consequences, which determine whether the behavior will recur.',
    hints: [
      'Operants operate on the environment.',
      'Do consequences strengthen or weaken voluntary behaviors?',
      'Focus on the role of consequences (rewards and punishments).'
    ]
  },
  {
    id: 'c5',
    nodeId: NODE_KEY_PROCESSES,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Understanding',
    question: 'When a conditioned dog salivates to a 1000 Hz bell tone and ALSO to a similar 1100 Hz tone, which process is occurring?',
    options: [
      'Stimulus Discrimination',
      'Stimulus Generalization',
      'Spontaneous Recovery',
      'Extinction'
    ],
    correctIndex: 1,
    explanation: 'Stimulus generalization occurs when an organism responds to stimuli that are similar to the original conditioned stimulus.',
    hints: [
      'The dog is generalizing its response across similar stimuli.',
      'Is it differentiating or treating similar sounds alike?',
      'Responding to similar stimuli = Generalization.'
    ]
  },
  {
    id: 'c6',
    nodeId: NODE_OBSERVATIONAL,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'According to Albert Bandura\'s Social Learning Theory, what are the four sequential steps of Observational Learning?',
    options: [
      'Acquisition -> Extinction -> Recovery -> Generalization',
      'Attention -> Retention -> Motor Reproduction -> Motivation/Reinforcement',
      'Sensation -> Perception -> Cognition -> Action',
      'Trial -> Error -> Insight -> Mastery'
    ],
    correctIndex: 1,
    explanation: 'Bandura identified four key observational processes: Attention (noticing), Retention (remembering), Motor Reproduction (executing), and Motivation (reasons to act).',
    hints: [
      'First you must pay attention, then remember it.',
      'Then you physically attempt it, and need motivation to perform it.',
      'ARMM: Attention, Retention, Reproduction, Motivation.'
    ]
  },
  {
    id: 'c7',
    nodeId: NODE_PRIMARY_SECONDARY,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Recall',
    question: 'Which of the following is classified as a Secondary (Conditioned) Reinforcer?',
    options: [
      'Water for a thirsty animal',
      'Food for a hungry child',
      'Money / Tokens',
      'Warmth in a freezing environment'
    ],
    correctIndex: 2,
    explanation: 'Money is a secondary reinforcer because its reinforcing value is learned through pairing with primary reinforcers (food, shelter).',
    hints: [
      'Primary reinforcers satisfy biological survival needs.',
      'Secondary reinforcers acquire value through association.',
      'Money derives value from what it can buy.'
    ]
  },

  // STANDARD TIER (8 Challenges)
  {
    id: 'c8',
    nodeId: NODE_REINFORCEMENT_SCHEDULES,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'A slot machine pays out jackpots after an unpredictable number of lever pulls (e.g., after 3, 17, 8, 42 pulls). Which reinforcement schedule is this?',
    options: [
      'Fixed Ratio (FR)',
      'Fixed Interval (FI)',
      'Variable Ratio (VR)',
      'Variable Interval (VI)'
    ],
    correctIndex: 2,
    explanation: 'Variable Ratio (VR) delivers reinforcement after an unpredictable (variable) number of responses, yielding extremely high steady response rates and high resistance to extinction.',
    hints: [
      'Is it based on number of responses (ratio) or elapsed time (interval)?',
      'Is the number fixed or unpredictable (variable)?',
      'Unpredictable number of responses = Variable Ratio.'
    ]
  },
  {
    id: 'c9',
    nodeId: NODE_DETERMINANTS_CLASSICAL,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In classical conditioning, why is Delayed Conditioning (CS starts 0.5s before US) significantly more effective than Simultaneous Conditioning?',
    options: [
      'Because simultaneous conditioning overwhelms the sensory cortex.',
      'Because the CS must reliably act as an informative SIGNAL predicting the imminent arrival of the US.',
      'Because simultaneous conditioning causes backward inhibition.',
      'Because delayed conditioning requires no neural processing.'
    ],
    correctIndex: 1,
    explanation: 'Information value and signal predictability are key determinants of classical conditioning (Rescorla\'s model). The CS must predict the US.',
    hints: [
      'Think of signal theory: a bell ringing AT THE SAME TIME as food gives no advance warning.',
      'Learning relies on predictability.',
      'The CS acts as an informative predictive signal.'
    ]
  },
  {
    id: 'c10',
    nodeId: NODE_LEARNED_HELPLESSNESS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'In Martin Seligman\'s classic experiments, dogs exposed to inescapable shocks later failed to jump over a low barrier to escape shocks even when escape was easy. This phenomenon is called:',
    options: [
      'Operant Extinction',
      'Learned Helplessness',
      'Systematic Desensitization',
      'Latent Inhibition'
    ],
    correctIndex: 1,
    explanation: 'Learned Helplessness occurs when an organism learns that its responses have no control over negative outcomes, leading to passive resignation.',
    hints: [
      'The animal learns that nothing it does matters.',
      'It creates a belief of lack of control over bad events.',
      'Seligman coined "Learned Helplessness".'
    ]
  },
  {
    id: 'c11',
    nodeId: NODE_INSIGHT_LEARNING,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'Wolfgang Köhler observed Sultan the chimpanzee suddenly combining two short sticks to reach a banana outside his cage. How does Insight Learning differ from Thorndike\'s Trial-and-Error learning?',
    options: [
      'Insight involves gradual step-by-step stamping in of correct muscle movements.',
      'Insight occurs suddenly ("Aha!" moment) through cognitive restructuring of the perceptual field without repetitive motor trial and error.',
      'Insight requires physical continuous food reward after every single attempt.',
      'Insight is purely involuntary autonomic conditioning.'
    ],
    correctIndex: 1,
    explanation: 'Insight learning is a cognitive process involving sudden reorganization of relationships in a problem situation, leading to a quick solution.',
    hints: [
      'Think of the "Aha!" moment.',
      'Is it slow gradual trial and error or sudden problem solving?',
      'It relies on cognitive perception of spatial/logical relationships.'
    ]
  },
  {
    id: 'c12',
    nodeId: NODE_LATENT_COGNITIVE_MAPS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    question: 'In Tolman and Honzik\'s 1930 maze experiment, what proved that unrewarded rats in Group C had actually been learning the maze during Days 1 to 10?',
    options: [
      'They ran slower on Day 11 than on Day 1.',
      'Their error rates dropped sharply on Day 12 immediately after food was introduced on Day 11, matching the continuously rewarded group.',
      'They stopped entering the maze altogether.',
      'They displayed constant displacement activities.'
    ],
    correctIndex: 1,
    explanation: 'The sudden dramatic performance improvement upon introducing reward proved that a cognitive map was formed latently during the unrewarded trials.',
    hints: [
      'Look at what happened right after reward was introduced on Day 11.',
      'Did their errors decrease slowly or drop instantly?',
      'An instant drop in errors on Day 12 proved latent learning.'
    ]
  },
  {
    id: 'c13',
    nodeId: NODE_SHAPING,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application',
    question: 'To teach a dog to turn on a light switch, a trainer rewards looking at the wall, then walking to the wall, then touching the switch. This method of reinforcing successive approximations is:',
    options: [
      'Counterconditioning',
      'Shaping',
      'Stimulus Discrimination',
      'Aversive Conditioning'
    ],
    correctIndex: 1,
    explanation: 'Shaping is an operant technique where closer and closer approximations (successive approximations) of a complex target behavior are systematically reinforced.',
    hints: [
      'The trainer builds a complex behavior in gradual steps.',
      'What term describes reinforcing successive approximations?',
      'Shaping.'
    ]
  },
  {
    id: 'c14',
    nodeId: NODE_VERBAL_METHODS,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Understanding',
    question: 'Which method of verbal learning study involves presenting list items in pairs (e.g., Cat - 42, Tree - 89) where presenting the first word requires recalling the second?',
    options: [
      'Free Recall Method',
      'Serial Learning Method',
      'Paired-Associates Method',
      'Recognition Method'
    ],
    correctIndex: 2,
    explanation: 'In Paired-Associates learning, subjects learn pairs of words (Stimulus - Response), similar to learning foreign language vocabulary words.',
    hints: [
      'The words are presented as stimulus-response pairs.',
      'Think of flashcards matching terms to definitions.',
      'Paired-Associates Method.'
    ]
  },
  {
    id: 'c15',
    nodeId: NODE_PUNISHMENT,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Analysis',
    misconceptionIndex: 0,
    question: 'A parent takes away a teenager\'s smartphone privileges after the teenager stays out past curfew. What operant contingency is being applied?',
    options: [
      'Positive Reinforcement',
      'Negative Reinforcement',
      'Positive Punishment',
      'Negative Punishment (Response Cost)'
    ],
    correctIndex: 3,
    explanation: 'Negative punishment involves REMOVING a desirable stimulus (phone) to DECREASE an unwanted behavior (breaking curfew).',
    hints: [
      'Is something added (positive) or removed (negative)?',
      'Is the goal to increase (reinforcement) or decrease (punishment) curfew breaking?',
      'Removing pleasant stimulus to reduce behavior = Negative Punishment.'
    ]
  },

  // ADVANCED TIER (7 Challenges)
  {
    id: 'c16',
    nodeId: NODE_FITTS_MODEL,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'According to Paul Fitts and Posner\'s 3-stage model of skill acquisition, what characterizes the transition into the final Autonomous Phase?',
    options: [
      'High conscious demand, deliberate self-instruction, slow execution speed, and frequent errors.',
      'Gradual reduction in errors, motor program refining, moderate conscious control.',
      'Execution becomes automatic with minimal cognitive demand, allowing execution of simultaneous secondary tasks.',
      'Complete loss of speed-accuracy tradeoff capacity.'
    ],
    correctIndex: 2,
    explanation: 'In the Autonomous Phase, performance requires minimal conscious effort, errors are low, and the performer can process external signals or dual tasks smoothly.',
    hints: [
      'Autonomous means self-governing without conscious thought.',
      'Think of an expert driver listening to music while navigating.',
      'Minimal cognitive effort with high speed and accuracy.'
    ]
  },
  {
    id: 'c17',
    nodeId: NODE_PREPAREDNESS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    question: 'In the classic Garcia Effect (conditioned taste aversion), rats easily conditioned an aversion between sweet water and nausea induced hours later, but FAILED to condition an aversion between sweet water and electric shocks. Why?',
    options: [
      'Rats cannot perceive sweet taste.',
      'Biological preparedness equips organisms to associate gustatory cues with internal gastrointestinal illness, but not auditory/visual cues.',
      'Electric shocks disrupt all memory formation permanently.',
      'Classical conditioning does not apply to visceral organs.'
    ],
    correctIndex: 1,
    explanation: 'Garcia demonstrated biological preparedness: evolutionary selection predisposes organisms to form specific stimulus-consequence pairings (taste-nausea) far more readily than others (light-nausea).',
    hints: [
      'Evolution prepares animals to connect taste with illness.',
      'External shocks are naturally associated with external lights/sounds.',
      'This proves constraints of biological preparedness.'
    ]
  },
  {
    id: 'c18',
    nodeId: NODE_CLASSICAL_VS_OPERANT,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    misconceptionIndex: 4,
    question: 'Which structural breakdown correctly distinguishes Classical Conditioning from Operant Conditioning across key operational parameters?',
    options: [
      'Classical: Voluntary motor responses / Consequence-driven; Operant: Involuntary autonomic responses / Stimulus-driven.',
      'Classical: Involuntary reflexive responses / Antecedent S-S association; Operant: Voluntary responses / Consequent R-S association.',
      'Classical: Governed by Skinner\'s Box; Operant: Governed by Pavlov\'s fistula.',
      'Classical: Works only with secondary reinforcers; Operant: Works only with primary reinforcers.'
    ],
    correctIndex: 1,
    explanation: 'Classical conditioning involves involuntary reflexes conditioned to antecedent signals (S-S). Operant conditioning involves voluntary behaviors shaped by consequences (R-S).',
    hints: [
      'Classical deals with involuntary autonomic reflexes (salivation, heart rate).',
      'Operant deals with voluntary actions operating on the environment.',
      'S-S vs R-S contingency.'
    ]
  },
  {
    id: 'c19',
    nodeId: NODE_DISABILITIES_DEF,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Evaluation',
    misconceptionIndex: 3,
    question: 'A student exhibits severe difficulty decoding text phonetically, reversing letters (b/d), and reading fluently, despite normal intelligence, adequate instruction, and intact vision. How is this diagnosed?',
    options: [
      'Intellectual Disability (Mental Retardation)',
      'Specific Learning Disability: Dyslexia',
      'Specific Learning Disability: Dyscalculia',
      'Attention Deficit Hyperactivity Disorder (ADHD) exclusively'
    ],
    correctIndex: 1,
    explanation: 'Dyslexia is a specific learning disability characterized by difficulties with accurate and/or fluent word recognition and poor spelling/decoding abilities despite normal intelligence.',
    hints: [
      'The issue is specifically in reading and phonological decoding.',
      'The student has average or high intelligence.',
      'Specific reading disorder = Dyslexia.'
    ]
  },
  {
    id: 'c20',
    nodeId: NODE_DISABILITIES_REMEDIATION,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'Which pedagogical remediation strategy is scientifically validated for assisting children with severe Dyslexia in acquiring phonemic awareness and reading skills?',
    options: [
      'Rote memorization under high-stress timed examinations.',
      'Multisensory Structured Language (Orton-Gillingham approach) combining visual, auditory, and kinesthetic-tactile pathways simultaneously.',
      'Total avoidance of written text and reliance exclusively on lectures.',
      'Pharmacological sedation to suppress active motor exploration.'
    ],
    correctIndex: 1,
    explanation: 'Multisensory structured language instruction engages visual, auditory, kinesthetic, and tactile senses together to reinforce sound-symbol associations.',
    hints: [
      'Engages multiple senses (visual, auditory, tactile) at the same time.',
      'Known as the Orton-Gillingham multisensory approach.',
      'Multisensory structured language teaching.'
    ]
  },
  {
    id: 'c21',
    nodeId: NODE_VERBAL_DETERMINANTS,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Analysis',
    question: 'In verbal learning, what does the Serial Position Effect predict when individuals recall an unorganized list of 20 items presented sequentially?',
    options: [
      'Items in the exact middle of the list are recalled best.',
      'High recall for items at the beginning (Primacy effect) and end (Recency effect), with worst recall for middle items.',
      'Uniform equal recall accuracy across all 20 positions.',
      'Recall accuracy depends entirely on word length, ignoring serial position.'
    ],
    correctIndex: 1,
    explanation: 'The Serial Position Effect yields a U-shaped curve: Primacy effect (early items get long-term rehearsal) and Recency effect (late items remain in short-term memory).',
    hints: [
      'Think of a U-shaped graph curve.',
      'First items and last items are remembered best.',
      'Primacy (first) and Recency (last) items dominate memory performance.'
    ]
  },
  {
    id: 'c22',
    nodeId: NODE_MOTIVATION_LEARNING,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis',
    question: 'According to the Yerkes-Dodson Law governing motivation and learning efficiency, what level of arousal yields OPTIMAL performance on complex cognitive tasks?',
    options: [
      'Extremely high arousal (panic / intense pressure)',
      'Moderate arousal level',
      'Zero arousal (complete sleep / apathy)',
      'Fluctuating extreme swings of arousal every 5 seconds'
    ],
    correctIndex: 1,
    explanation: 'The Yerkes-Dodson Law demonstrates an inverted-U relationship between arousal and performance: optimal performance occurs at a moderate level of arousal, especially for complex tasks.',
    hints: [
      'Picture an inverted-U curve.',
      'Too low = sleepiness; too high = anxiety and panic.',
      'Moderate arousal optimizes cognitive performance.'
    ]
  }
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

// Diagram 1: Pavlovian Classical Conditioning Neural Arc Visualizer
const PavlovDiagram: React.FC<{ isi: number; trials: number; extinction: boolean; CRStrength: number }> = ({
  isi, trials, extinction, CRStrength
}) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-lg my-4">
      <h4 className="text-amber-400 font-semibold text-center text-sm mb-2">
        Pavlovian Conditioning Neural Arc & Reflex Chamber
      </h4>
      <svg viewBox="0 0 600 240" className="w-full h-56">
        <defs>
          <linearGradient id="glowBell" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="glowFood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.5" />
          </filter>
        </defs>

        {/* Background Chamber */}
        <rect x="10" y="10" width="580" height="220" rx="12" fill="#1e293b" stroke="#334155" strokeWidth="2" />

        {/* CS Node: Bell */}
        <g transform="translate(60, 40)" filter="url(#shadow)">
          <circle cx="40" cy="40" r="32" fill="url(#glowBell)" />
          <path d="M 40 20 L 50 45 L 30 45 Z" fill="#fff" />
          <circle cx="40" cy="52" r="4" fill="#fef08a" />
          <text x="40" y="90" textAnchor="middle" fill="#fde68a" fontSize="12" fontWeight="bold">
            CS: Tone / Bell
          </text>
        </g>

        {/* US Node: Food */}
        <g transform="translate(60, 140)" filter="url(#shadow)">
          <circle cx="40" cy="40" r="32" fill="url(#glowFood)" />
          <path d="M 28 40 C 28 25, 52 25, 52 40 C 52 55, 28 55, 28 40 Z" fill="#fef2f2" />
          <text x="40" y="90" textAnchor="middle" fill="#fca5a5" fontSize="12" fontWeight="bold">
            US: Meat Powder
          </text>
        </g>

        {/* Brain Processing Center */}
        <g transform="translate(260, 80)">
          <rect x="0" y="0" width="100" height="80" rx="16" fill="#0f172a" stroke="#6366f1" strokeWidth="3" />
          <text x="50" y="32" textAnchor="middle" fill="#a5b4fc" fontSize="12" fontWeight="bold">
            Auditory & Sensory
          </text>
          <text x="50" y="50" textAnchor="middle" fill="#818cf8" fontSize="11">
            Association Cortex
          </text>
          <text x="50" y="68" textAnchor="middle" fill="#38bdf8" fontSize="10">
            ISI: {isi} ms
          </text>
        </g>

        {/* Pathways: CS to Brain */}
        <path
          d="M 132 72 L 260 100"
          stroke="#f59e0b"
          strokeWidth={isi >= 200 && isi <= 1000 ? "4" : "1.5"}
          strokeDasharray={extinction ? "4 4" : "none"}
        />

        {/* Pathways: US to Brain */}
        <path
          d="M 132 172 L 260 140"
          stroke="#ef4444"
          strokeWidth="4"
        />

        {/* Output Node: Salivation CR/UR */}
        <g transform="translate(450, 80)" filter="url(#shadow)">
          <circle cx="40" cy="40" r="36" fill="#0284c7" />
          {/* Saliva Droplet Animation Visual */}
          <path
            d="M 40 20 C 30 40, 25 50, 40 60 C 55 50, 50 40, 40 20 Z"
            fill="#7dd3fc"
            transform={`scale(${0.5 + CRStrength / 200}) translate(${40 - 40 * (0.5 + CRStrength / 200)}, ${40 - 40 * (0.5 + CRStrength / 200)})`}
          />
          <text x="40" y="95" textAnchor="middle" fill="#7dd3fc" fontSize="12" fontWeight="bold">
            Response (UR/CR)
          </text>
        </g>

        {/* Pathway Brain to Output */}
        <path
          d="M 360 120 L 450 120"
          stroke="#38bdf8"
          strokeWidth={Math.max(1, (CRStrength / 100) * 6)}
        />

        {/* Dynamic Display Meter */}
        <rect x="420" y="10" width="160" height="40" rx="6" fill="#0f172a" stroke="#38bdf8" />
        <text x="500" y="26" textAnchor="middle" fill="#7dd3fc" fontSize="11" fontWeight="bold">
          Salivation: {CRStrength.toFixed(1)} Drops
        </text>
        <text x="500" y="40" textAnchor="middle" fill="#94a3b8" fontSize="9">
          Trials Completed: {trials}
        </text>
      </svg>
    </div>
  );
};

// Diagram 2: Skinner Box Operant Cumulative Response Visualizer
const SkinnerBoxDiagram: React.FC<{
  schedule: string;
  presses: number;
  reinforcers: number;
  curvePoints: { x: number; y: number }[];
}> = ({ schedule, presses, reinforcers, curvePoints }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-lg my-4">
      <h4 className="text-emerald-400 font-semibold text-center text-sm mb-2">
        Operant Skinner Box & Cumulative Response Recorder
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* SVG Skinner Chamber */}
        <svg viewBox="0 0 280 200" className="w-full h-48 bg-slate-950 rounded-lg border border-slate-800">
          <rect x="10" y="10" width="260" height="180" fill="#1e293b" rx="8" />

          {/* Grid Floor */}
          <line x1="20" y1="170" x2="260" y2="170" stroke="#94a3b8" strokeWidth="4" strokeDasharray="6 4" />

          {/* Cue Light */}
          <circle cx="50" cy="40" r="12" fill={reinforcers % 2 === 1 ? "#f59e0b" : "#334155"} filter="drop-shadow(0 0 6px #f59e0b)" />
          <text x="50" y="65" fill="#94a3b8" fontSize="9" textAnchor="middle">Signal Light</text>

          {/* Lever */}
          <rect x="30" y="110" width="40" height="10" rx="3" fill="#64748b" transform="rotate(-15 30 110)" />
          <circle cx="30" cy="110" r="6" fill="#cbd5e1" />
          <text x="50" y="135" fill="#cbd5e1" fontSize="9" textAnchor="middle">Lever</text>

          {/* Food Hopper */}
          <rect x="210" y="130" width="40" height="40" rx="4" fill="#0f172a" stroke="#10b981" strokeWidth="2" />
          <circle cx="230" cy="150" r="8" fill="#f59e0b" />
          <text x="230" y="185" fill="#10b981" fontSize="9" textAnchor="middle">Food Hopper</text>

          {/* Animal Graphic (Rat representation) */}
          <ellipse cx="140" cy="150" rx="30" ry="18" fill="#94a3b8" />
          <circle cx="165" cy="142" r="10" fill="#cbd5e1" />
          <circle cx="168" cy="140" r="2" fill="#0f172a" />
          <path d="M 110 155 Q 90 160 80 145" stroke="#f472b6" strokeWidth="3" fill="none" />
        </svg>

        {/* Cumulative Recorder Graph */}
        <svg viewBox="0 0 280 200" className="w-full h-48 bg-slate-950 rounded-lg border border-slate-800">
          <text x="140" y="20" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">
            Cumulative Record ({schedule} Schedule)
          </text>
          {/* Axes */}
          <line x1="40" y1="170" x2="260" y2="170" stroke="#475569" strokeWidth="2" />
          <line x1="40" y1="30" x2="40" y2="170" stroke="#475569" strokeWidth="2" />

          <text x="150" y="192" fill="#64748b" fontSize="9" textAnchor="middle">Elapsed Time (Seconds)</text>
          <text x="15" y="100" fill="#64748b" fontSize="9" transform="rotate(-90 15 100)" textAnchor="middle">
            Cumulative Presses
          </text>

          {/* Polyline plotting response curve */}
          {curvePoints.length > 1 && (
            <polyline
              fill="none"
              stroke="#34d399"
              strokeWidth="3"
              points={curvePoints.map(p => `${40 + (p.x / 100) * 210},${170 - (p.y / 50) * 135}`).join(' ')}
            />
          )}

          {/* Score metrics */}
          <text x="50" y="45" fill="#a7f3d0" fontSize="10">Presses: {presses}</text>
          <text x="50" y="60" fill="#fef08a" fontSize="10">Pellets: {reinforcers}</text>
        </svg>
      </div>
    </div>
  );
};

// Diagram 3: Tolman Latent Learning Maze & Error Curve
const TolmanMazeDiagram: React.FC<{ group: string; day: number; errors: number }> = ({ group, day, errors }) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-lg my-4">
      <h4 className="text-gold-400 font-semibold text-center text-sm mb-2">
        Tolman & Honzik (1930) Latent Learning Maze Paradigm
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Maze Schematic */}
        <svg viewBox="0 0 260 180" className="w-full h-44 bg-slate-950 rounded-lg border border-slate-800">
          <rect x="10" y="10" width="240" height="160" fill="#0f172a" rx="6" />
          {/* Maze Walls */}
          <path d="M 30 150 L 30 30 L 90 30 L 90 120 L 150 120 L 150 30 L 220 30 L 220 150" fill="none" stroke="#38bdf8" strokeWidth="4" />
          <path d="M 60 170 L 60 60 L 120 60 L 120 150 L 180 150 L 180 60 L 240 60" fill="none" stroke="#38bdf8" strokeWidth="4" />

          {/* Start Point */}
          <circle cx="45" cy="160" r="8" fill="#22c55e" />
          <text x="45" y="163" fill="#fff" fontSize="8" textAnchor="middle" fontWeight="bold">S</text>

          {/* End Goal Box */}
          <circle cx="230" cy="45" r="8" fill={group === 'unrewarded' && day <= 10 ? "#64748b" : "#eab308"} />
          <text x="230" y="48" fill="#000" fontSize="8" textAnchor="middle" fontWeight="bold">G</text>

          <text x="130" y="90" fill="#94a3b8" fontSize="10" textAnchor="middle">
            Cognitive Map Formation
          </text>
        </svg>

        {/* Error Curve Display */}
        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400">Selected Experimental Condition:</div>
            <div className="text-sm font-bold text-gold-300 mb-1">
              {group === 'rewarded' && 'Group A: Continuous Reward (Daily)'}
              {group === 'unrewarded' && 'Group B: Never Rewarded'}
              {group === 'delayed_reward' && 'Group C: Reward Introduced on Day 11'}
            </div>
            <div className="text-xs text-slate-300">Current Simulation Day: <span className="text-amber-400 font-bold">{day} / 14</span></div>
          </div>

          <div className="my-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-slate-400">Average Maze Errors:</span>
              <span className="text-gold-400 font-bold">{errors.toFixed(1)}</span>
            </div>
            <div className="w-full bg-slate-800 h-3 rounded-full overflow-hidden">
              <div
                className="bg-gold-500 h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (errors / 30) * 100)}%` }}
              ></div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            {group === 'delayed_reward' && day >= 11
              ? '⚡ Sharp drop in errors on Day 12 reveals latent cognitive map constructed silently during Days 1-10!'
              : 'Observe how food reinforcement influences performance vs silent internal map acquisition.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// Diagram 4: Fitts' 3-Stage Skill Acquisition Curve
const FittsCurveDiagram: React.FC<{ stage: string; practiceHours: number; errorRate: number; speed: number }> = ({
  stage, practiceHours, errorRate, speed
}) => {
  return (
    <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 shadow-lg my-4">
      <h4 className="text-gold-400 font-semibold text-center text-sm mb-2">
        Fitts & Posner 3-Phase Motor Skill Acquisition Dynamics
      </h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <svg viewBox="0 0 280 180" className="w-full h-44 bg-slate-950 rounded-lg border border-slate-800">
          {/* Background Phases */}
          <rect x="30" y="20" width="70" height="130" fill="#312e81" opacity="0.4" />
          <rect x="100" y="20" width="80" height="130" fill="#1e1b4b" opacity="0.4" />
          <rect x="180" y="20" width="80" height="130" fill="#064e3b" opacity="0.4" />

          <text x="65" y="35" fill="#a5b4fc" fontSize="9" textAnchor="middle" fontWeight="bold">1. Cognitive</text>
          <text x="140" y="35" fill="#c084fc" fontSize="9" textAnchor="middle" fontWeight="bold">2. Associative</text>
          <text x="220" y="35" fill="#6ee7b7" fontSize="9" textAnchor="middle" fontWeight="bold">3. Autonomous</text>

          {/* Axes */}
          <line x1="30" y1="150" x2="260" y2="150" stroke="#64748b" strokeWidth="2" />
          <line x1="30" y1="20" x2="30" y2="150" stroke="#64748b" strokeWidth="2" />

          {/* Speed Curve (Rising) */}
          <path d="M 30 140 Q 120 100 260 40" fill="none" stroke="#10b981" strokeWidth="3" />
          <text x="250" y="30" fill="#10b981" fontSize="8" fontWeight="bold">Execution Speed</text>

          {/* Error Rate Curve (Falling) */}
          <path d="M 30 40 Q 100 120 260 145" fill="none" stroke="#ef4444" strokeWidth="3" />
          <text x="250" y="140" fill="#ef4444" fontSize="8" fontWeight="bold">Error Rate</text>

          {/* Current Practice Hours Marker */}
          {(() => {
            const markerX = 30 + Math.min(230, (practiceHours / 100) * 230);
            return (
              <line x1={markerX} y1="20" x2={markerX} y2="150" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 4" />
            );
          })()}
        </svg>

        <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs text-slate-400">Current Skill Phase:</div>
            <div className="text-base font-extrabold text-gold-300 capitalize">
              {stage} Phase
            </div>
            <div className="text-xs text-slate-400 mt-1">Accumulated Practice: <span className="text-emerald-400 font-bold">{practiceHours} Hours</span></div>
          </div>

          <div className="space-y-2 my-1">
            <div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Execution Speed (Ops/min):</span>
                <span className="text-emerald-400 font-bold">{speed}</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: `${Math.min(100, (speed / 120) * 100)}%` }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Error Frequency (%):</span>
                <span className="text-rose-400 font-bold">{errorRate}%</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div className="bg-rose-500 h-full" style={{ width: `${errorRate}%` }}></div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-slate-400 italic">
            {stage === 'cognitive' && 'Phase 1: High cognitive load, explicit verbal thoughts, frequent errors.'}
            {stage === 'associative' && 'Phase 2: Motor patterns forming, errors dropping, movements smoothing.'}
            {stage === 'autonomous' && 'Phase 3: Automatic execution, fast, effortless, resilient to distraction.'}
          </p>
        </div>
      </div>
    </div>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================
export default function C11_PsyLearningCBSESim() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'discovery' | 'lab' | 'challenges' | 'summary'>('discovery');

  // Discovery tab state
  const [discoveryChoice, setDiscoveryChoice] = useState<number | null>(null);
  const [discoverySubmitted, setDiscoverySubmitted] = useState<boolean>(false);

  // Lab step state
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // --- Interactive Lab 1 State (Pavlovian) ---
  const [isiTime, setIsiTime] = useState<number>(500); // ms
  const [pavlovTrials, setPavlovTrials] = useState<number>(0);
  const [extinctionActive, setExtinctionActive] = useState<boolean>(false);
  const [salivationOutput, setSalivationOutput] = useState<number>(0);

  // --- Interactive Lab 2 State (Skinner Box) ---
  const [scheduleType, setScheduleType] = useState<'FR' | 'VR' | 'FI' | 'VI'>('FR');
  const [leverPresses, setLeverPresses] = useState<number>(0);
  const [reinforcersDelivered, setReinforcersDelivered] = useState<number>(0);
  const [cumulativePoints, setCumulativePoints] = useState<{ x: number; y: number }[]>([{ x: 0, y: 0 }]);

  // --- Interactive Lab 3 State (Tolman Latent Learning) ---
  const [tolmanGroup, setTolmanGroup] = useState<'rewarded' | 'unrewarded' | 'delayed_reward'>('delayed_reward');
  const [mazeDay, setMazeDay] = useState<number>(1);
  const [mazeErrors, setMazeErrors] = useState<number>(28);

  // --- Interactive Lab 4 State (Fitts Skill Model) ---
  const [practiceHours, setPracticeHours] = useState<number>(5);
  const [skillStage, setSkillStage] = useState<'cognitive' | 'associative' | 'autonomous'>('cognitive');
  const [execSpeed, setExecSpeed] = useState<number>(20);
  const [errorRate, setErrorRate] = useState<number>(75);

  // --- Interactive Lab 5 State (Learning Disabilities) ---
  const [selectedDisability, setSelectedDisability] = useState<'dyslexia' | 'dyscalculia' | 'dysgraphia'>('dyslexia');
  const [selectedStrategy, setSelectedStrategy] = useState<string>('');
  const [remediationFeedback, setRemediationFeedback] = useState<string>('');

  // Challenges state
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [answerSubmitted, setAnswerSubmitted] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Audio/Visual Feedback State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });

  // BKT & SRS Stores
  const [bktStates, setBktStates] = useState<Record<string, BKTState>>(() => {
    const initial: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, SRSItem>>(() => {
    const initial: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      initial[id] = createReviewItem(id);
    });
    return initial;
  });

  // Auto-hint timer reference
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Audio & Speech initiation
  useEffect(() => {
    speechManager.speak("Welcome to the Virtual Behavioral and Cognitive Psychology Research Laboratory!");
  }, []);

  // Reset auto-hint timer on interaction
  const resetHintTimer = (hintText: string) => {
    setShowHint(false);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setCurrentHintText(hintText);
      setShowHint(true);
      audioManager.play('hint');
    }, 10000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Update Pavlovian salivation dynamic calculation
  useEffect(() => {
    if (extinctionActive) {
      const remaining = Math.max(0, salivationOutput - 1.5);
      setSalivationOutput(remaining);
      return;
    }
    // Optimal ISI for Pavlovian classical conditioning is around 500ms
    let efficiency = 0;
    if (isiTime >= 200 && isiTime <= 800) {
      efficiency = 1.0 - Math.abs(isiTime - 500) / 600;
    } else if (isiTime > 800 && isiTime <= 2000) {
      efficiency = 0.4;
    } else {
      efficiency = 0.05; // extremely short or backward contiguity
    }
    const newlyAcquired = Math.min(10, pavlovTrials * efficiency * 1.8);
    setSalivationOutput(newlyAcquired);
  }, [isiTime, pavlovTrials, extinctionActive]);

  // Update Tolman maze error calculations
  useEffect(() => {
    if (tolmanGroup === 'rewarded') {
      // Steady error decrease from day 1 to 14
      const calculated = Math.max(3, 30 - mazeDay * 2.0);
      setMazeErrors(calculated);
    } else if (tolmanGroup === 'unrewarded') {
      // Slow minimal reduction due to basic familiarization
      const calculated = Math.max(18, 30 - mazeDay * 0.7);
      setMazeErrors(calculated);
    } else {
      // Delayed reward group (reward introduced on Day 11)
      if (mazeDay <= 10) {
        const calculated = Math.max(18, 30 - mazeDay * 0.7);
        setMazeErrors(calculated);
      } else {
        // Dramatic drop on Day 12 to match or beat continuous reward!
        const calculated = Math.max(2, 20 - (mazeDay - 10) * 5.5);
        setMazeErrors(calculated);
      }
    }
  }, [tolmanGroup, mazeDay]);

  // Update Fitts' Model Skill Phase calculation
  useEffect(() => {
    if (practiceHours < 25) {
      setSkillStage('cognitive');
      setExecSpeed(15 + practiceHours * 0.8);
      setErrorRate(Math.max(35, 80 - practiceHours * 1.8));
    } else if (practiceHours < 70) {
      setSkillStage('associative');
      setExecSpeed(35 + (practiceHours - 25) * 1.2);
      setErrorRate(Math.max(12, 35 - (practiceHours - 25) * 0.5));
    } else {
      setSkillStage('autonomous');
      setExecSpeed(90 + Math.min(30, (practiceHours - 70) * 0.6));
      setErrorRate(Math.max(2, 12 - (practiceHours - 70) * 0.3));
    }
  }, [practiceHours]);

  // --- Pavlovian Controls ---
  const handleRunPavlovTrial = () => {
    audioManager.play('tap');
    setExtinctionActive(false);
    setPavlovTrials(prev => prev + 1);
    if (pavlovTrials % 3 === 0) {
      audioManager.play('chime');
      speechManager.speak("Observe how temporal contiguity between CS and US builds the conditioned salivation reflex.");
    }
  };

  const handleRunExtinctionTrial = () => {
    audioManager.play('whoosh');
    setExtinctionActive(true);
    setPavlovTrials(prev => prev + 1);
  };

  // --- Skinner Box Controls ---
  const handlePressLever = () => {
    audioManager.play('pop');
    const newPresses = leverPresses + 1;
    setLeverPresses(newPresses);

    let reinforced = false;
    if (scheduleType === 'FR' && newPresses % 5 === 0) reinforced = true;
    if (scheduleType === 'VR' && newPresses % (Math.floor(Math.random() * 6) + 3) === 0) reinforced = true;
    if (scheduleType === 'FI' && newPresses % 8 === 0) reinforced = true;
    if (scheduleType === 'VI' && newPresses % (Math.floor(Math.random() * 8) + 4) === 0) reinforced = true;

    if (reinforced) {
      audioManager.play('drop-correct');
      setReinforcersDelivered(prev => prev + 1);
      speechManager.speak("Reinforcement delivered! Notice the response pattern on the cumulative recorder.");
    }

    // Add point to curve
    const lastX = cumulativePoints[cumulativePoints.length - 1].x;
    setCumulativePoints(prev => [...prev.slice(-30), { x: lastX + 3, y: Math.min(50, newPresses) }]);
  };

  // --- Learning Disability Strategy Submission ---
  const handleEvaluateStrategy = (strategy: string) => {
    audioManager.play('tap');
    setSelectedStrategy(strategy);
    if (selectedDisability === 'dyslexia' && strategy === 'multisensory') {
      audioManager.play('success');
      setRemediationFeedback('CORRECT! Multisensory Structured Language (visual-auditory-kinesthetic pairing) is the evidence-based gold standard for Dyslexia.');
    } else if (selectedDisability === 'dyscalculia' && strategy === 'concrete-representational') {
      audioManager.play('success');
      setRemediationFeedback('CORRECT! Concrete-Representational-Abstract (CRA) sequencing with visual math manipulatives remediates Dyscalculia.');
    } else if (selectedDisability === 'dysgraphia' && strategy === 'fine-motor-tech') {
      audioManager.play('success');
      setRemediationFeedback('CORRECT! Assistive speech-to-text combined with ergonomic grip adaptation remediates Dysgraphia execution barriers.');
    } else {
      audioManager.play('drop-wrong');
      setRemediationFeedback('Sub-optimal strategy. Select a targeted intervention specifically matched to the neural processing domain of this disability.');
    }
  };

  // --- Challenge Evaluation ---
  const handleAnswerSubmit = (optionIndex: number) => {
    if (answerSubmitted) return;
    setSelectedAnswer(optionIndex);
    setAnswerSubmitted(true);

    const activeChallenge = CHALLENGES[currentChallengeIndex];
    const isCorrect = optionIndex === activeChallenge.correctIndex;

    // Update BKT State
    const currentBkt = bktStates[activeChallenge.nodeId] || createBKTState();
    const updatedBkt = bktUpdate(currentBkt, isCorrect);
    setBktStates(prev => ({ ...prev, [activeChallenge.nodeId]: updatedBkt }));

    // Update SRS Item
    const currentSrs = srsItems[activeChallenge.nodeId] || createReviewItem(activeChallenge.nodeId);
    const updatedSrs = sm2Update(currentSrs, isCorrect ? 5 : 2);
    setSrsItems(prev => ({ ...prev, [activeChallenge.nodeId]: updatedSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      setScore(prev => prev + 10);
      setShowSparkle(true);
      setSparklePos({ x: 400, y: 200 });
      speechManager.speak("Excellent analysis! That is correct.");
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak("Not quite. Review the psychological principle and attempt the next challenge.");
    }
  };

  const handleNextChallenge = () => {
    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setAnswerSubmitted(false);
      setShowHint(false);
      resetHintTimer(CHALLENGES[currentChallengeIndex + 1].hints[0]);
    } else {
      // Completed all challenges
      audioManager.play('celebration');
      setShowConfetti(true);
      setShowSuccessBanner(true);
      recordGameScore('c11_psy_learning', score, 220);
      speechManager.speak("Congratulations! You have mastered the ISC Psychology Learning experimental simulation unit!");
    }
  };

  // Discovery Question Submit
  const handleDiscoverySubmit = (idx: number) => {
    setDiscoveryChoice(idx);
    setDiscoverySubmitted(true);
    if (idx === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      audioManager.play('sparkle');
      speechManager.speak("Brilliant prediction! Tolman showed that learning can remain latent until reinforcement triggers performance.");
    } else {
      audioManager.play('drop-wrong');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8">
      {/* HEADER BAR */}
      <header className="max-w-7xl mx-auto bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-gold-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ISC Class 11 Psychology
            </span>
            <span className="bg-amber-500/20 text-amber-400 text-xs font-semibold px-3 py-1 rounded-full border border-amber-500/30">
              Chapter: Learning
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl font-black text-white mt-2 tracking-tight">
            Behavioral & Cognitive Experimental Lab
          </h1>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Classical Conditioning, Operant Schedules, Cognitive Maps, Observational Modeling & Skill Acquisition
          </p>
        </div>

        {/* Score & Navigation Badges */}
        <div className="flex items-center gap-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-slate-400 font-medium">Research Score</div>
            <div className="text-xl font-black text-emerald-400">{score} PTS</div>
          </div>
          <div className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-center">
            <div className="text-xs text-slate-400 font-medium">Mastery Nodes</div>
            <div className="text-xl font-black text-gold-400">
              {Object.values(bktStates).filter(b => getMasteryLevel(b) === 'mastered').length} / 25
            </div>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="max-w-7xl mx-auto flex gap-2 border-b border-slate-800 mb-8 overflow-x-auto pb-2">
        <button
          onClick={() => { setActiveTab('discovery'); audioManager.play('tap'); }}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'discovery'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          1. Paradigm Discovery
        </button>
        <button
          onClick={() => { setActiveTab('lab'); audioManager.play('tap'); }}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'lab'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          2. Interactive Research Labs (5)
        </button>
        <button
          onClick={() => { setActiveTab('challenges'); audioManager.play('tap'); }}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'challenges'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          3. Evaluative Challenges (22)
        </button>
        <button
          onClick={() => { setActiveTab('summary'); audioManager.play('tap'); }}
          className={`px-5 py-3 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap ${
            activeTab === 'summary'
              ? 'bg-gold-600 text-white shadow-lg shadow-gold-500/30'
              : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-850'
          }`}
        >
          4. Lab Report & Real-World Plan
        </button>
      </nav>

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto">
        {/* TAB 1: DISCOVERY */}
        {activeTab === 'discovery' && (
          <div className="space-y-8">
            {/* Scenario Card */}
            <div className="bg-gradient-to-r from-slate-900 via-gold-950/40 to-slate-900 border border-gold-500/30 rounded-2xl p-6 md:p-8 shadow-xl">
              <h2 className="text-xl md:text-2xl font-bold text-gold-300 mb-3">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-4">{SCENARIO.intro}</p>
              <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{SCENARIO.context}</p>
            </div>

            {/* Counterintuitive Discovery Question */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-amber-500/20 text-amber-400 text-xs font-bold px-3 py-1 rounded-full uppercase">
                  Preconception Discovery Hypothesis
                </span>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-white mb-6">{DISCOVERY_QUESTION.question}</h3>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {DISCOVERY_QUESTION.options.map((opt, idx) => {
                  let btnStyle = "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300";
                  if (discoverySubmitted) {
                    if (idx === DISCOVERY_QUESTION.correctIndex) {
                      btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                    } else if (discoveryChoice === idx) {
                      btnStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                    }
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleDiscoverySubmit(idx)}
                      disabled={discoverySubmitted}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="font-bold text-xs bg-slate-800 px-2 py-1 rounded text-slate-300 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {discoverySubmitted && (
                <div className="bg-gold-950/50 border border-gold-500/40 rounded-xl p-4 text-xs md:text-sm text-gold-200">
                  <span className="font-bold text-gold-300">Theoretical Insight: </span>
                  {DISCOVERY_QUESTION.hintAfter}
                </div>
              )}
            </div>

            {/* PREDICTION QUESTIONS SECTION */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Experimental Predictions</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PREDICTION_QUESTIONS.map((pred, pIdx) => (
                  <div key={pIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block mb-2">
                      Prediction #{pIdx + 1}
                    </span>
                    <p className="text-sm text-slate-200 font-medium mb-3">{pred.question}</p>
                    <div className="space-y-2 mb-3">
                      {pred.options.map((opt, oIdx) => (
                        <div key={oIdx} className="text-xs text-slate-400 bg-slate-900 p-2 rounded border border-slate-800 flex items-center gap-2">
                          <span className="font-bold text-slate-500">{String.fromCharCode(65 + oIdx)}.</span>
                          <span>{opt}</span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-amber-400/90 bg-amber-950/30 p-2 rounded border border-amber-900/50 italic">
                      💡 Verification: {pred.verifyInstruction}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE LABS */}
        {activeTab === 'lab' && (
          <div className="space-y-8">
            {/* Lab Stepper Header */}
            <div className="flex border-b border-slate-800 overflow-x-auto pb-4 gap-2">
              {EXPLORATION_STEPS.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => { setCurrentStepIndex(idx); audioManager.play('tap'); }}
                  className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                    currentStepIndex === idx
                      ? 'bg-gold-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {step.title.split(':')[0]}
                </button>
              ))}
            </div>

            {/* Active Lab Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                    Interactive Lab Station #{currentStepIndex + 1}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1">
                    {EXPLORATION_STEPS[currentStepIndex].title}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-400 mt-1">
                    {EXPLORATION_STEPS[currentStepIndex].instruction}
                  </p>
                </div>
              </div>

              {/* RENDER SPECIFIC LAB INTERACTION */}
              {/* LAB 1: Pavlov Classical Conditioning */}
              {currentStepIndex === 0 && (
                <div>
                  <PavlovDiagram
                    isi={isiTime}
                    trials={pavlovTrials}
                    extinction={extinctionActive}
                    CRStrength={salivationOutput}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 mt-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-2">
                        Inter-Stimulus Interval (ISI CS-US Gap): <span className="text-amber-400 font-mono text-sm">{isiTime} ms</span>
                      </label>
                      <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={isiTime}
                        onChange={(e) => setIsiTime(Number(e.target.value))}
                        className="w-full accent-amber-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                        <span>0ms (Simultaneous)</span>
                        <span>500ms (Optimal CS Signal)</span>
                        <span>2000ms (Trace Delay)</span>
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <button
                        onClick={handleRunPavlovTrial}
                        className="bg-amber-600 hover:bg-amber-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg flex items-center justify-center gap-2"
                      >
                        ⚡ Run Acquisition Trial (Pair CS + US)
                      </button>
                      <button
                        onClick={handleRunExtinctionTrial}
                        className="bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold py-2.5 px-4 rounded-xl text-xs transition border border-slate-700 flex items-center justify-center gap-2"
                      >
                        🛑 Run Extinction Trial (CS Only Without US)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 2: Skinner Operant Box */}
              {currentStepIndex === 1 && (
                <div>
                  <SkinnerBoxDiagram
                    schedule={scheduleType}
                    presses={leverPresses}
                    reinforcers={reinforcersDelivered}
                    curvePoints={cumulativePoints}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 mt-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-2">Select Reinforcement Schedule:</label>
                      <div className="grid grid-cols-2 gap-2">
                        {(['FR', 'VR', 'FI', 'VI'] as const).map((sched) => (
                          <button
                            key={sched}
                            onClick={() => {
                              setScheduleType(sched);
                              setLeverPresses(0);
                              setReinforcersDelivered(0);
                              setCumulativePoints([{ x: 0, y: 0 }]);
                              audioManager.play('tap');
                            }}
                            className={`p-2.5 text-xs font-bold rounded-lg border transition ${
                              scheduleType === sched
                                ? 'bg-emerald-600 text-white border-emerald-500'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                            }`}
                          >
                            {sched === 'FR' && 'Fixed Ratio (FR-5)'}
                            {sched === 'VR' && 'Variable Ratio (VR)'}
                            {sched === 'FI' && 'Fixed Interval (FI)'}
                            {sched === 'VI' && 'Variable Interval (VI)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center gap-3">
                      <button
                        onClick={handlePressLever}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-xl text-sm transition shadow-lg flex items-center justify-center gap-2"
                      >
                        🔴 Press Response Lever (Subject Action)
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 3: Tolman Latent Learning */}
              {currentStepIndex === 2 && (
                <div>
                  <TolmanMazeDiagram
                    group={tolmanGroup}
                    day={mazeDay}
                    errors={mazeErrors}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950 p-6 rounded-xl border border-slate-800 mt-4">
                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-2">Experimental Group Condition:</label>
                      <div className="space-y-2">
                        {(['rewarded', 'unrewarded', 'delayed_reward'] as const).map((grp) => (
                          <button
                            key={grp}
                            onClick={() => { setTolmanGroup(grp); audioManager.play('tap'); }}
                            className={`w-full text-left p-3 text-xs font-bold rounded-lg border transition ${
                              tolmanGroup === grp
                                ? 'bg-gold-600 text-white border-gold-500'
                                : 'bg-slate-900 text-slate-400 border-slate-800 hover:bg-slate-850'
                            }`}
                          >
                            {grp === 'rewarded' && 'Group A: Food Reward Delivered Daily'}
                            {grp === 'unrewarded' && 'Group B: Never Rewarded in Goal Box'}
                            {grp === 'delayed_reward' && 'Group C: Food Introduced on Day 11 (Latent Test)'}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-slate-400 font-bold block mb-2">
                        Simulation Trial Day: <span className="text-gold-400 font-mono text-sm">{mazeDay}</span>
                      </label>
                      <input
                        type="range"
                        min="1"
                        max="14"
                        step="1"
                        value={mazeDay}
                        onChange={(e) => setMazeDay(Number(e.target.value))}
                        className="w-full accent-gold-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                        <span>Day 1 (Initial Maze Exploration)</span>
                        <span>Day 11 (Food Introduced for Group C)</span>
                        <span>Day 14 (Asymptotic Mastery)</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 4: Fitts' Skill Acquisition */}
              {currentStepIndex === 3 && (
                <div>
                  <FittsCurveDiagram
                    stage={skillStage}
                    practiceHours={practiceHours}
                    errorRate={errorRate}
                    speed={execSpeed}
                  />

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 mt-4">
                    <label className="text-xs text-slate-400 font-bold block mb-2">
                      Accumulated Practice Time: <span className="text-gold-400 font-mono text-sm">{practiceHours} Hours</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      step="1"
                      value={practiceHours}
                      onChange={(e) => setPracticeHours(Number(e.target.value))}
                      className="w-full accent-gold-500 bg-slate-800 h-2 rounded-lg cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-500 mt-2">
                      <span>1h (Cognitive Stage: Heavy conscious effort)</span>
                      <span>40h (Associative Stage: Motor program tuning)</span>
                      <span>100h (Autonomous Stage: High speed, low error)</span>
                    </div>
                  </div>
                </div>
              )}

              {/* LAB 5: Learning Disability Diagnostic & Remediation */}
              {currentStepIndex === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {(['dyslexia', 'dyscalculia', 'dysgraphia'] as const).map((dis) => (
                      <button
                        key={dis}
                        onClick={() => {
                          setSelectedDisability(dis);
                          setRemediationFeedback('');
                          audioManager.play('tap');
                        }}
                        className={`p-4 rounded-xl border text-left transition ${
                          selectedDisability === dis
                            ? 'bg-purple-950/60 border-purple-500 text-purple-200'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="font-bold text-sm uppercase mb-1">{dis}</div>
                        <div className="text-xs text-slate-400">
                          {dis === 'dyslexia' && 'Phonological decoding & text reading fluency deficit.'}
                          {dis === 'dyscalculia' && 'Numerical concept processing & spatial quantitative deficit.'}
                          {dis === 'dysgraphia' && 'Fine motor handwriting & visual-spatial writing layout deficit.'}
                        </div>
                      </button>
                    ))}
                  </div>

                  <div className="bg-slate-950 p-6 rounded-xl border border-slate-800">
                    <h4 className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
                      Select Evidence-Based Remediation Intervention:
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <button
                        onClick={() => handleEvaluateStrategy('multisensory')}
                        className="p-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 hover:border-gold-500 text-left"
                      >
                        🧠 Multisensory Structured Language (VAK Approach)
                      </button>
                      <button
                        onClick={() => handleEvaluateStrategy('concrete-representational')}
                        className="p-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 hover:border-gold-500 text-left"
                      >
                        🔢 Concrete-Representational-Abstract (CRA) Math Sequencing
                      </button>
                      <button
                        onClick={() => handleEvaluateStrategy('fine-motor-tech')}
                        className="p-3 text-xs bg-slate-900 border border-slate-800 rounded-lg text-slate-200 hover:border-gold-500 text-left"
                      >
                        ✍️ Speech-to-Text Assistive Tech & Ergonomic Adaptation
                      </button>
                    </div>

                    {remediationFeedback && (
                      <div className={`mt-4 p-4 rounded-xl border text-xs font-semibold ${
                        remediationFeedback.startsWith('CORRECT')
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-300'
                          : 'bg-rose-950/40 border-rose-500 text-rose-300'
                      }`}>
                        {remediationFeedback}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* OBSERVATION QUESTIONS RENDERED IN LAB */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Empirical Observation Check</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {OBSERVATION_QUESTIONS.map((obs, oIdx) => (
                  <div key={oIdx} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block mb-2">
                      Observation Observation #{oIdx + 1}
                    </span>
                    <p className="text-sm text-slate-200 font-medium mb-3">{obs.question}</p>
                    <div className="space-y-2">
                      {obs.observableOptions.map((opt, optIdx) => (
                        <div
                          key={optIdx}
                          className={`text-xs p-2.5 rounded border ${
                            optIdx === obs.correctIndex
                              ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200'
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
          </div>
        )}

        {/* TAB 3: CHALLENGES */}
        {activeTab === 'challenges' && (
          <div className="space-y-8">
            {/* Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center gap-4">
              <div>
                <span className="text-xs text-gold-400 font-bold uppercase tracking-wider">
                  Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}
                </span>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded uppercase ${
                    CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                      ? 'bg-gold-500/20 text-gold-400 border border-gold-500/30'
                      : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                      ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  }`}>
                    {CHALLENGES[currentChallengeIndex].difficulty}
                  </span>
                  <span className="text-xs text-slate-400">
                    Competency: {CHALLENGES[currentChallengeIndex].competencyLevel}
                  </span>
                </div>
              </div>

              {/* Step indicator bar */}
              <div className="w-full md:w-64 bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800">
                <div
                  className="bg-gold-500 h-full transition-all duration-300"
                  style={{ width: `${((currentChallengeIndex + 1) / CHALLENGES.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Active Challenge Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg md:text-xl font-bold text-white mb-6">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              <div className="grid grid-cols-1 gap-3 mb-6">
                {CHALLENGES[currentChallengeIndex].options.map((opt, idx) => {
                  let btnStyle = "border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300";
                  if (answerSubmitted) {
                    if (idx === CHALLENGES[currentChallengeIndex].correctIndex) {
                      btnStyle = "border-emerald-500 bg-emerald-950/40 text-emerald-200 font-semibold";
                    } else if (selectedAnswer === idx) {
                      btnStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                    }
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswerSubmit(idx)}
                      disabled={answerSubmitted}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 ${btnStyle}`}
                    >
                      <span className="font-bold text-xs bg-slate-800 px-2.5 py-1 rounded text-slate-300 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span className="text-sm">{opt}</span>
                    </button>
                  );
                })}
              </div>

              {/* Feedback and Explanation */}
              {answerSubmitted && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-xl border text-sm ${
                    selectedAnswer === CHALLENGES[currentChallengeIndex].correctIndex
                      ? 'bg-emerald-950/50 border-emerald-500/40 text-emerald-200'
                      : 'bg-rose-950/50 border-rose-500/40 text-rose-200'
                  }`}>
                    <span className="font-bold block mb-1">
                      {selectedAnswer === CHALLENGES[currentChallengeIndex].correctIndex ? 'Correct Explanation:' : 'Incorrect:'}
                    </span>
                    {CHALLENGES[currentChallengeIndex].explanation}
                  </div>

                  <button
                    onClick={handleNextChallenge}
                    className="w-full bg-gold-600 hover:bg-gold-500 text-white font-bold py-3 px-6 rounded-xl transition shadow-lg flex items-center justify-center gap-2"
                  >
                    {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'Complete Unit Simulation'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 4: SUMMARY & REAL-WORLD ACTIVITY */}
        {activeTab === 'summary' && (
          <div className="space-y-8">
            {/* Misconceptions Grid */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <span className="text-rose-400">⚠️</span> Common Psychological Misconceptions Cleared
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {MISCONCEPTIONS.map((misc) => (
                  <div key={misc.id} className="bg-slate-950 p-5 rounded-xl border border-slate-800">
                    <div className="text-xs text-rose-400 font-bold mb-1">❌ Myth: {misc.statement}</div>
                    <div className="text-xs text-emerald-300 leading-relaxed">
                      <span className="font-bold">✓ Fact: </span>{misc.correction}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* REAL-WORLD ACTIVITY RENDERED */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-xl">
              <span className="text-xs text-gold-400 font-bold uppercase tracking-wider block mb-2">
                Applied Behavioral Psychology Task
              </span>
              <h3 className="text-xl font-bold text-white mb-3">{REAL_WORLD_ACTIVITY.title}</h3>
              <p className="text-slate-300 text-xs md:text-sm mb-6 leading-relaxed">
                {REAL_WORLD_ACTIVITY.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {REAL_WORLD_ACTIVITY.steps.map((stepStr, sIdx) => (
                  <div key={sIdx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex items-start gap-3">
                    <span className="bg-gold-600/30 text-gold-300 border border-gold-500/40 text-xs font-bold rounded-lg px-2.5 py-1 mt-0.5">
                      {sIdx + 1}
                    </span>
                    <span className="text-xs text-slate-300 leading-relaxed">{stepStr}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* FEEDBACK OVERLAYS */}
      <HintBubble show={showHint} text={currentHintText} />
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Psychology Learning Unit Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}