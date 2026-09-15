'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update, SRSItem } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel, BKTState } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ==========================================
// CONSTANTS & NODE DEFINITIONS
// ==========================================
const NODE_028 = 'c11_psy_cbse_028'; // Nature and Functions of Memory
const NODE_029 = 'c11_psy_cbse_029'; // Memory Processes: Encoding, Storage, and Retrieval
const NODE_030 = 'c11_psy_cbse_030'; // Stage Model of Memory (Atkinson and Shiffrin, 1968)
const NODE_031 = 'c11_psy_cbse_031'; // Sensory Memory System
const NODE_032 = 'c11_psy_cbse_032'; // Short-Term Memory (STM)
const NODE_033 = 'c11_psy_cbse_033'; // Long-Term Memory (LTM)
const NODE_034 = 'c11_psy_cbse_034'; // Control Processes in Memory
const NODE_035 = 'c11_psy_cbse_035'; // Maintenance Rehearsal
const NODE_036 = 'c11_psy_cbse_036'; // Chunking as a Memory Strategy
const NODE_037 = 'c11_psy_cbse_037'; // Elaborative Rehearsal
const NODE_038 = 'c11_psy_cbse_038'; // Working Memory Model (Baddeley, 1986)
const NODE_039 = 'c11_psy_cbse_039'; // Levels of Processing Model (Craik and Lockhart, 1972)
const NODE_040 = 'c11_psy_cbse_040'; // Declarative vs Procedural Memory
const NODE_041 = 'c11_psy_cbse_041'; // Episodic Memory
const NODE_042 = 'c11_psy_cbse_042'; // Semantic Memory
const NODE_043 = 'c11_psy_cbse_043'; // Special Long-Term Memory Phenomena
const NODE_044 = 'c11_psy_cbse_044'; // Autobiographical Memory and Childhood Amnesia
const NODE_045 = 'c11_psy_cbse_045'; // Implicit Memory
const NODE_046 = 'c11_psy_cbse_046'; // Forgetting: Nature and Causes
const NODE_047 = 'c11_psy_cbse_047'; // Ebbinghaus Forgetting Curve
const NODE_048 = 'c11_psy_cbse_048'; // Trace Decay Theory of Forgetting
const NODE_049 = 'c11_psy_cbse_049'; // Interference Theory of Forgetting
const NODE_050 = 'c11_psy_cbse_050'; // Proactive and Retroactive Interference
const NODE_051 = 'c11_psy_cbse_051'; // Retrieval Failure Theory
const NODE_052 = 'c11_psy_cbse_052'; // Repressed Memories and Fugue State
const NODE_053 = 'c11_psy_cbse_053'; // Mnemonics: Image-Based Methods
const NODE_054 = 'c11_psy_cbse_054'; // Mnemonics: Organization-Based Methods
const NODE_055 = 'c11_psy_cbse_055'; // Deep Processing for Memory Improvement
const NODE_056 = 'c11_psy_cbse_056'; // PQRST Method for Memory Improvement
const NODE_057 = 'c11_psy_cbse_057'; // Fugue State and Dissociative Amnesia

const ALL_NODE_IDS = [
  NODE_028, NODE_029, NODE_030, NODE_031, NODE_032, NODE_033, NODE_034, NODE_035,
  NODE_036, NODE_037, NODE_038, NODE_039, NODE_040, NODE_041, NODE_042, NODE_043,
  NODE_044, NODE_045, NODE_046, NODE_047, NODE_048, NODE_049, NODE_050, NODE_051,
  NODE_052, NODE_053, NODE_054, NODE_055, NODE_056, NODE_057
];

// ==========================================
// MANDATORY SECTIONS
// ==========================================

const SCENARIO = {
  title: 'Cognitive Neuro-Psychology Memory Dynamics Lab',
  intro: 'Welcome to the Human Memory Research Facility. You are conducting interactive empirical experiments to map how the human brain encodes, stores, retrieves, and forgets information.',
  context: 'Through live psychometric trials (Sperling partial report, Miller 7±2 chunking, Baddeley dual-task execution, Craik & Lockhart depth analysis, and Ebbinghaus retention modeling), you will uncover the quantitative and qualitative mechanisms of cognitive retention.',
};

const DISCOVERY_QUESTION = {
  question: 'If you present a person with 12 visual letters flashed for only 50 milliseconds (0.05 seconds), how many letters can they actually retain in their immediate sensory buffer immediately after exposure?',
  options: [
    'Only 1 to 2 letters, because 50ms is too fast for the eye to perceive visual information.',
    'Almost all 12 letters, but the visual trace (iconic memory) decays rapidly within 250-500 milliseconds.',
    'Exactly 7 letters, matching Miller\'s magic number for short-term memory.',
    'Zero letters, as long-term memory requires at least 5 seconds of rehearsal to form any trace.'
  ],
  correctIndex: 1,
  hintAfter: 'Sperling (1960) demonstrated that iconic memory holds almost the entire visual array, but it fades in less than half a second unless quickly transferred to short-term memory!',
};

const DEFAULT_PROPS = {
  initialNodeId: NODE_028,
};

const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Sperling Visual Sensory Memory (Iconic Flash)',
    instruction: 'Flash a 3x4 grid of letters for 50ms. Test immediate full report vs partial tone-guided report to measure sensory memory capacity and decay.',
    interactionType: 'sperling-lab',
    nodeId: NODE_031,
  },
  {
    title: 'Lab 2: STM Digit Span & Chunking Dynamics',
    instruction: 'Test recall accuracy of un-chunked digits vs semantic chunked numbers (e.g., 1-9-4-7-1-9-5-0 vs 1947 1950) to observe Miller 7±2 expansion.',
    interactionType: 'chunking-lab',
    nodeId: NODE_036,
  },
  {
    title: 'Lab 3: Baddeley Working Memory Dual-Task Visualizer',
    instruction: 'Simulate concurrent Phonological Loop (repeating digits) and Visuospatial Sketchpad (spatial maze tracking) to prove multi-component independence.',
    interactionType: 'baddeley-lab',
    nodeId: NODE_038,
  },
  {
    title: 'Lab 4: Craik & Lockhart Depth of Processing Engine',
    instruction: 'Process words at Structural (CAPITAL letters?), Phonemic (rhymes with...?), or Semantic (is it a living creature?) levels to compare LTM recall percentage.',
    interactionType: 'craik-lab',
    nodeId: NODE_039,
  },
  {
    title: 'Lab 5: Ebbinghaus Forgetting & Retention Simulator',
    instruction: 'Manipulate time delay (15 min to 31 days) and review repetitions (0 to 5 reviews) to visualize the exponential decay curve and savings score.',
    interactionType: 'ebbinghaus-lab',
    nodeId: NODE_047,
  },
];

const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: When a participant performs a visual tracking task while simultaneously rehearsing digits aloud, what will happen to performance compared to doing two visual tasks at once?',
    options: [
      'Visual performance will crash completely because all cognitive tasks draw from one single pool.',
      'Performance remains high because the Phonological Loop and Visuospatial Sketchpad operate independently.',
      'Digit rehearsal will be completely impossible while visual tracking is active.',
      'Both tasks will convert into long-term procedural memory automatically.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Test the dual-task visualizer in Lab 3 to compare cross-modal vs intra-modal interference.',
    nodeId: NODE_038,
  },
  {
    question: 'Predict: On the Ebbinghaus forgetting curve for nonsense syllables, when does the steepest rate of memory loss occur?',
    options: [
      'Gradually over 30 days in a perfectly linear downward slope.',
      'Within the first hour immediately following learning.',
      'Only after 24 hours during deep sleep consolidation.',
      'After 7 days when trace decay reaches maximum intensity.'
    ],
    correctIndex: 1,
    verifyInstruction: 'Adjust the time slider in Lab 5 from 20 minutes to 31 days to observe where the curve drops sharpest.',
    nodeId: NODE_047,
  },
];

const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you observe when words are processed semantically (meaning) compared to structural processing (font size/casing)?',
    observableOptions: [
      'Structural processing leads to 3x higher long-term retention than semantic processing.',
      'Semantic processing creates deeper cognitive traces, producing dramatically higher recall rates.',
      'Both structural and semantic processing result in identical short-term recall scores.',
      'Phonemic processing completely replaces semantic processing in LTM.'
    ],
    correctIndex: 1,
    nodeId: NODE_039,
  },
  {
    question: 'What happens when you group 12 individual numbers into 4 meaningful year-chunks (e.g., 1947, 1950, 1999, 2024)?',
    observableOptions: [
      'The memory load exceeds STM capacity and performance drops to 0.',
      'The 12 items consume 12 distinct slots in short-term memory regardless.',
      'The effective memory load is reduced to 4 items, fitting easily within the 7 ± 2 capacity limit.',
      'The numbers enter sensory memory and decay in 200 milliseconds.'
    ],
    correctIndex: 2,
    nodeId: NODE_036,
  },
];

const REAL_WORLD_ACTIVITY = {
  title: 'PQRST Study Optimization & Cognitive Rehearsal Plan',
  description: 'Apply psychological principles of levels of processing, chunking, and spaced repetition to master complex CISCE exam chapters systematically.',
  steps: [
    'Preview (P): Scan section headings, diagrams, and summaries to create an initial semantic schema framework.',
    'Question (Q): Formulate diagnostic questions (Who, What, Why, How) for each topic section before reading.',
    'Read & Self-Recite (R & R): Perform deep semantic encoding by answering your questions in your own words and applying elaborative rehearsal.',
    'Test (T): Conduct spaced retrieval practice using the Ebbinghaus 24-hour and 7-day review windows to flatten the forgetting curve.'
  ],
};

// ==========================================
// TYPES & INTERFACES
// ==========================================
interface Challenge {
  id: string;
  nodeId: string;
  type: 'mcq' | 'sort' | 'numeric' | 'match';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: string;
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  matchPairs?: { left: string; right: string }[];
  sortItems?: string[];
  correctOrder?: string[];
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
}

interface Misconception {
  id: string;
  title: string;
  explanation: string;
  correction: string;
  nodeId: string;
}

interface DiagnosticQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  nodeId: string;
  remedialConcept: string;
}

// ==========================================
// MISCONCEPTIONS DATA (6 items)
// ==========================================
const MISCONCEPTIONS: Misconception[] = [
  {
    id: 'misc_1',
    title: 'Memory acts like a exact Video Recording',
    explanation: 'Many believe human memory records events verbatim and plays them back like a video camera.',
    correction: 'Memory is reconstructive, dynamic, and subject to schema distortion, interference, and active re-consolidation.',
    nodeId: NODE_028,
  },
  {
    id: 'misc_2',
    title: 'Short-Term Memory is just time-based storage',
    explanation: 'Believing STM is merely a static waiting room where items sit before moving to LTM or vanishing.',
    correction: 'STM is active working memory (Baddeley) that manipulates, reorganizes, and processes multi-modal data concurrently.',
    nodeId: NODE_038,
  },
  {
    id: 'misc_3',
    title: 'Rote Repetition is the best way to remember',
    explanation: 'Assuming repeating a definition 50 times (maintenance rehearsal) ensures long-term mastery.',
    correction: 'Maintenance rehearsal only keeps info in STM. Deep semantic processing and elaborative rehearsal build resilient LTM pathways.',
    nodeId: NODE_037,
  },
  {
    id: 'misc_4',
    title: 'Forgetting means memories are completely erased from brain storage',
    explanation: 'Thinking forgotten facts have physically disappeared from the cerebral cortex.',
    correction: 'Most forgetting in LTM is due to retrieval failure (lack of cues) or interference, not trace extinction.',
    nodeId: NODE_051,
  },
  {
    id: 'misc_5',
    title: 'Proactive Interference is about future memories ruining old ones',
    explanation: 'Confusing proactive interference with retroactive interference.',
    correction: 'Proactive = PREVIOUS learning interferes with NEW learning. Retroactive = NEW learning interferes with OLD memories.',
    nodeId: NODE_050,
  },
  {
    id: 'misc_6',
    title: 'Infantile Amnesia is caused by psychological trauma in infancy',
    explanation: 'Attributing the inability to remember early childhood before age 3 to repressed traumatic events.',
    correction: 'Childhood/Infantile amnesia is due to undeveloped hippocampal neural architecture and lack of linguistic encoding systems in infants.',
    nodeId: NODE_044,
  },
];

// ==========================================
// DIAGNOSTIC QUESTIONS (8 items)
// ==========================================
const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 'diag_1',
    question: 'Which sequence correctly represents the three core stages of memory processing?',
    options: ['Storage → Encoding → Retrieval', 'Encoding → Storage → Retrieval', 'Retrieval → Storage → Encoding', 'Sensory → Short Term → Long Term'],
    correctIndex: 1,
    nodeId: NODE_029,
    remedialConcept: 'Memory Processing Pipeline: Info must first be encoded, then stored, then retrieved.',
  },
  {
    id: 'diag_2',
    question: 'According to Atkinson and Shiffrin (1968), what is the primary control process required to transfer information from Sensory Memory to STM?',
    options: ['Elaborative Rehearsal', 'Attention', 'Deep Semantic Categorization', 'Chunking'],
    correctIndex: 1,
    nodeId: NODE_030,
    remedialConcept: 'Selective Attention acts as the gatekeeper between Sensory Memory and Short-Term Memory.',
  },
  {
    id: 'diag_3',
    question: 'What is Miller\'s classic "magic number" regarding the capacity limit of Short-Term Memory?',
    options: ['3 ± 1 items', '7 ± 2 items', '12 ± 4 items', 'Unlimited items'],
    correctIndex: 1,
    nodeId: NODE_032,
    remedialConcept: 'George Miller (1956) identified STM capacity as 7 ± 2 chunks of information.',
  },
  {
    id: 'diag_4',
    question: 'In Baddeley\'s Working Memory Model, which subcomponent manages visual and spatial information?',
    options: ['Phonological Loop', 'Central Executive', 'Visuospatial Sketchpad', 'Episodic Buffer'],
    correctIndex: 2,
    nodeId: NODE_038,
    remedialConcept: 'Visuospatial Sketchpad handles mental imagery, spatial layout, and visual manipulation.',
  },
  {
    id: 'diag_5',
    question: 'Remembering your first day at high school or your 10th birthday party is an example of:',
    options: ['Semantic Memory', 'Episodic Memory', 'Procedural Memory', 'Implicit Motor Skill'],
    correctIndex: 1,
    nodeId: NODE_041,
    remedialConcept: 'Episodic memory stores personal autobiographical events with specific temporal and spatial contexts.',
  },
  {
    id: 'diag_6',
    question: 'Old phone numbers making it hard to remember a newly acquired phone number is an example of:',
    options: ['Retroactive Interference', 'Proactive Interference', 'Trace Decay', 'Dissociative Fugue'],
    correctIndex: 1,
    nodeId: NODE_050,
    remedialConcept: 'Proactive Interference: Prior stored memories interfere with learning or recalling new information.',
  },
  {
    id: 'diag_7',
    question: 'According to Craik and Lockhart\'s Levels of Processing, which level yields the strongest memory trace?',
    options: ['Structural (Visual form)', 'Phonemic (Sound pattern)', 'Semantic (Meaning & context)', 'Perceptual (Brightness)'],
    correctIndex: 2,
    nodeId: NODE_039,
    remedialConcept: 'Semantic processing involves deep analysis of meaning, creating richer inter-connected memory traces.',
  },
  {
    id: 'diag_8',
    question: 'In the PQRST mnemonic method for study skills, what does the letter "S" stand for?',
    options: ['Speed-reading', 'Self-Recitation / State', 'Storage', 'Sensory Scanning'],
    correctIndex: 1,
    nodeId: NODE_056,
    remedialConcept: 'PQRST = Preview, Question, Read, Self-Recite, Test.',
  },
];

// ==========================================
// 22+ CHALLENGES (FOUNDATION, STANDARD, ADVANCED)
// ==========================================
const CHALLENGES: Challenge[] = [
  // --- FOUNDATION (7) ---
  {
    id: 'chal_1',
    nodeId: NODE_028,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Knowledge & Recall',
    question: 'Define the nature of human memory in contemporary cognitive psychology.',
    options: [
      'A static recording tape that stores exact visual duplicates of environment inputs.',
      'A mental system that receives, encodes, stores, alters, and retrieves information.',
      'A single muscle-like organ in the brain that shrinks when not exercised.',
      'An unchangeable archive that permanently locks memories upon initial contact.'
    ],
    correctIndex: 1,
    explanation: 'Memory is defined as an active cognitive system for receiving, encoding, storing, organizing, altering, and retrieving information.',
    hints: ['Think of memory as a dynamic process with stages.', 'It involves active transformation, not just passive recording.', 'Notice the three core stages: encoding, storage, retrieval.'],
    misconceptionIndex: 0,
  },
  {
    id: 'chal_2',
    nodeId: NODE_030,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Conceptual Understanding',
    question: 'In Atkinson & Shiffrin\'s Stage Model (1968), what is the correct flow of information between structural stores?',
    options: [
      'Sensory Memory → Long-Term Memory → Short-Term Memory',
      'Short-Term Memory → Sensory Memory → Long-Term Memory',
      'Sensory Memory → Short-Term Memory → Long-Term Memory',
      'Long-Term Memory → Sensory Memory → Working Memory'
    ],
    correctIndex: 2,
    explanation: 'Environmental stimuli first enter Sensory Memory, selected items pass via attention to STM, and rehearsed items move to LTM.',
    hints: ['First comes raw sensory input.', 'Selective attention moves it to immediate temporary storage.', 'Rehearsal transfers it to permanent store.'],
  },
  {
    id: 'chal_3',
    nodeId: NODE_031,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Identification',
    question: 'What is the duration and capacity of Visual Sensory Memory (Iconic Memory)?',
    options: [
      'Duration: ~30 seconds; Capacity: 7 items',
      'Duration: 250 to 500 milliseconds; Capacity: Large visual field array',
      'Duration: Permanent; Capacity: Unlimited',
      'Duration: 5 minutes; Capacity: 3 items'
    ],
    correctIndex: 1,
    explanation: 'Iconic memory holds an almost complete snapshot of the visual stimulus array, but decays rapidly in 250-500ms.',
    hints: ['Iconic memory is ultra-brief.', 'Think of a sparkler wire image fading instantly in your vision.', 'It holds a lot of detail, but for under half a second.'],
  },
  {
    id: 'chal_4',
    nodeId: NODE_036,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'Strategy Application',
    question: 'How does the process of "Chunking" enhance Short-Term Memory efficiency?',
    options: [
      'It increases the actual physical time limit of STM from 20s to 5 hours.',
      'It expands the 7 ± 2 capacity limit by combining individual discrete items into meaningful higher-order units.',
      'It converts visual information directly into motor reflex responses.',
      'It bypasses STM entirely and routes facts straight into semantic LTM.'
    ],
    correctIndex: 1,
    explanation: 'Chunking recombines individual bits of data (e.g., 1, 9, 4, 7) into single units (1947), fitting more total info into 7 ± 2 slots.',
    hints: ['Think of grouping phone numbers or historic dates.', 'It reorganizes information to use fewer STM slots.', 'Capacity remains ~7 items, but each item contains more data.'],
  },
  {
    id: 'chal_5',
    nodeId: NODE_040,
    type: 'match',
    difficulty: 'foundation',
    competencyLevel: 'Classification',
    question: 'Match each memory taxonomy category with its defining characteristic.',
    matchPairs: [
      { left: 'Declarative Memory', right: 'Explicit knowledge of facts and events (conscious awareness)' },
      { left: 'Procedural Memory', right: 'Implicit motor skills and habits (e.g. riding a bicycle)' },
      { left: 'Episodic Memory', right: 'Personal life experiences with time and place tags' },
      { left: 'Semantic Memory', right: 'General factual knowledge, concepts, and word meanings' }
    ],
    explanation: 'Declarative consists of explicit Episodic (personal) and Semantic (general facts), while Procedural covers implicit motor/skill habits.',
    hints: ['Declarative = knowing THAT (facts).', 'Procedural = knowing HOW (skills).', 'Episodic = personal diary events.'],
  },
  {
    id: 'chal_6',
    nodeId: NODE_047,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'Data Interpretation',
    question: 'According to Ebbinghaus\'s research on nonsense syllables, roughly what percentage of learned material is lost within the FIRST 20 to 60 minutes if no rehearsal occurs?',
    correctAnswer: 55,
    explanation: 'Ebbinghaus found that memory drops sharply, losing around 50% to 60% of nonsense material within the first hour.',
    hints: ['The drop is extremely steep immediately after learning.', 'It is more than half of the material.', 'Enter an integer around 55%.'],
  },
  {
    id: 'chal_7',
    nodeId: NODE_056,
    type: 'sort',
    difficulty: 'foundation',
    competencyLevel: 'Sequential Understanding',
    question: 'Arrange the steps of the PQRST study method in correct order from start to end.',
    sortItems: ['Preview', 'Question', 'Read', 'Self-Recite', 'Test'],
    correctOrder: ['Preview', 'Question', 'Read', 'Self-Recite', 'Test'],
    explanation: 'PQRST stands for Preview chapter, Question key topics, Read section, Self-Recite material, and Test overall retention.',
    hints: ['P = Preview initial structure.', 'Q = Question target goals.', 'R = Read deep text.', 'S = Self-Recite.', 'T = Test knowledge.'],
  },

  // --- STANDARD (8) ---
  {
    id: 'chal_8',
    nodeId: NODE_035,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Comparative Analysis',
    question: 'Differentiate Maintenance Rehearsal from Elaborative Rehearsal.',
    options: [
      'Maintenance rehearsal links info to prior knowledge; Elaborative rehearsal uses silent mechanical repetition.',
      'Maintenance rehearsal keeps info in STM via repetition; Elaborative rehearsal connects info to existing LTM networks.',
      'Maintenance rehearsal creates semantic networks; Elaborative rehearsal decays after 5 seconds.',
      'Both types are identical in cognitive depth and long-term durability.'
    ],
    correctIndex: 1,
    explanation: 'Maintenance rehearsal is shallow repetition to maintain STM state. Elaborative rehearsal analyzes meaning and builds semantic connections for LTM.',
    hints: ['Maintenance = keeping alive in STM (e.g. repeating a phone number).', 'Elaborative = connecting with existing knowledge in LTM.', 'Depth of processing is the key difference.'],
    misconceptionIndex: 2,
  },
  {
    id: 'chal_9',
    nodeId: NODE_038,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Model Evaluation',
    question: 'What is the primary role of the "Central Executive" in Baddeley\'s Working Memory Model?',
    options: [
      'To store speech-based acoustic traces for up to 2 seconds.',
      'To serve as an attentive control system coordinating sub-systems, allocating focus, and switching tasks.',
      'To act as a passive visual sketchbook for spatial shapes.',
      'To automatically encode sensory flashes into permanent declarative LTM.'
    ],
    correctIndex: 1,
    explanation: 'The Central Executive allocates attentional resources, manages task-switching, and controls the Phonological Loop, Visuospatial Sketchpad, and Episodic Buffer.',
    hints: ['It acts like the boss or conductor of working memory.', 'It does not store data itself.', 'It focuses attention and coordinates slave systems.'],
    misconceptionIndex: 1,
  },
  {
    id: 'chal_10',
    nodeId: NODE_039,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Experimental Deduction',
    question: 'In Craik & Lockhart\'s (1972) experiment, why did semantic questions ("Does target word fit sentence X?") yield higher recall than structural questions ("Is word in CAPITAL letters?")?',
    options: [
      'Structural processing takes longer, causing fatigue.',
      'Semantic processing engages deeper cognitive analysis, creating stronger, richer, and more retrievable memory traces.',
      'Capital letters blind visual sensory memory.',
      'Sentence fitting uses maintenance rehearsal exclusively.'
    ],
    correctIndex: 1,
    explanation: 'Deeper levels of analysis (semantic) produce more elaborate, longer-lasting, and stronger memory traces than shallow perceptual/structural analysis.',
    hints: ['Focus on depth of processing.', 'Meaning requires active cognitive integration.', 'Deeper processing = stronger memory trace.'],
  },
  {
    id: 'chal_11',
    nodeId: NODE_050,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Application & Distinction',
    question: 'An Indian student learns French in Class 9, then learns Spanish in Class 11. On a Spanish exam, French vocabulary keeps popping up into their mind. This is an example of:',
    options: [
      'Retroactive Interference',
      'Proactive Interference',
      'Trace Decay',
      'Childhood Amnesia'
    ],
    correctIndex: 1,
    explanation: 'Proactive interference occurs when previously learned material (French) interferes with the recall of newly learned material (Spanish).',
    hints: ['Proactive = Old interferes with New.', 'Retroactive = New interferes with Old.', 'Here, French (old) disrupts Spanish (new).'],
    misconceptionIndex: 4,
  },
  {
    id: 'chal_12',
    nodeId: NODE_051,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Theoretical Analysis',
    question: 'What does the "Tip-of-the-Tongue" (TOT) phenomenon prove about memory loss?',
    options: [
      'The memory trace has completely decayed and disappeared from brain tissue.',
      'The memory trace is stored in LTM, but retrieval failure occurs due to missing or inadequate retrieval cues.',
      'Working memory capacity has shrunk below 3 items.',
      'Proactive interference has permanently erased the word.'
    ],
    correctIndex: 1,
    explanation: 'TOT proves that information is available in storage, but temporarily inaccessible due to a lack of effective retrieval cues.',
    hints: ['You feel you know it, but can\'t access it right now.', 'Available vs accessible distinction.', 'Lack of retrieval cues is key.'],
    misconceptionIndex: 3,
  },
  {
    id: 'chal_13',
    nodeId: NODE_044,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'Biological Basis Analysis',
    question: 'Why can adults rarely recall specific episodic events from before age 3 (Childhood/Infantile Amnesia)?',
    options: [
      'Infants repress all early memories due to birth trauma.',
      'The hippocampus is neurobiologically immature, and language development needed for narrative encoding is lacking.',
      'Sensory memory does not function in infants below 3 years old.',
      'Infants only possess short-term memory lasting 2 seconds.'
    ],
    correctIndex: 1,
    explanation: 'Childhood amnesia stems from immature hippocampal neural structures and the absence of linguistic encoding frameworks in early infancy.',
    hints: ['Consider brain maturation.', 'Hippocampus is critical for episodic consolidation.', 'Language aids autobiographical framing.'],
    misconceptionIndex: 5,
  },
  {
    id: 'chal_14',
    nodeId: NODE_053,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'Strategy Identification',
    question: 'Match each mnemonic technique with its correct description.',
    matchPairs: [
      { left: 'Method of Loci', right: 'Associating items to be remembered with physical locations along a familiar path' },
      { left: 'Peg-Word System', right: 'Linking numbers to rhyming anchor words (1-Sun, 2-Shoe) combined with visual imagery' },
      { left: 'Acronym Method', right: 'Combining initial letters of words to form a memorable code word (e.g. VIBGYOR)' },
      { left: 'Keyword Method', right: 'Connecting foreign words to familiar sounding native words via visual interactive images' }
    ],
    explanation: 'Loci relies on spatial routes; Peg-word uses rhyming anchors; Acronym uses first letters; Keyword uses acoustic + visual bridging.',
    hints: ['Loci = places/locations.', 'Peg = rhyming pegs (1-sun).', 'Acronym = first letter combo.'],
  },
  {
    id: 'chal_15',
    nodeId: NODE_045,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'Quantitative Memory Analysis',
    question: 'In a digit span task, a subject recall sequence was: [7, 4, 1, 9, 2, 8, 5, 3, 6]. If their STM capacity is strictly 7 chunks, how many digits are dropped or forgotten from overflow?',
    correctAnswer: 2,
    explanation: 'With 9 items presented and capacity limit of 7 chunks, 9 - 7 = 2 items overflow from short-term memory capacity.',
    hints: ['Subtract maximum STM capacity (7) from total items presented (9).', ' simple arithmetic difference.', 'Answer is 2.'],
  },

  // --- ADVANCED (7) ---
  {
    id: 'chal_16',
    nodeId: NODE_038,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Experimental Design & Critique',
    question: 'In Baddeley & Hitch\'s dual-task paradigm, participants perform a spatial tracking task while simultaneously repeating "the-the-the" aloud. What does this reveal about cognitive architecture?',
    options: [
      'Both tasks crash because they share the Central Executive exclusively.',
      'Spatial tracking (Visuospatial) and verbal repetition (Phonological Loop) utilize separate, independent slave sub-components without major mutual interference.',
      'Spatial tracking forces verbal repetition to transfer into long-term procedural memory.',
      'Verbal repetition shuts down visual perception within 50 milliseconds.'
    ],
    correctIndex: 1,
    explanation: 'Dual-task performance across different modalities demonstrates that Working Memory consists of domain-specific, independent sub-systems (loop vs sketchpad).',
    hints: [' cross-modal tasks interfere much less than intra-modal tasks.', 'Visual + Verbal = independent resources.', 'Supports Baddeley\'s multi-component architecture.'],
  },
  {
    id: 'chal_17',
    nodeId: NODE_049,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Evaluative Reasoning',
    question: 'Contrast Trace Decay Theory and Interference Theory of forgetting.',
    options: [
      'Decay theory states forgetting happens due to emotional stress; Interference theory attributes it to brain cell death.',
      'Decay theory claims memory traces naturally fade with passing time in disuse; Interference theory claims stored memories block or distort one another during retrieval.',
      'Decay theory applies only to LTM; Interference theory applies only to Sensory memory.',
      'Both theories claim memory never changes after initial storage.'
    ],
    correctIndex: 1,
    explanation: 'Decay theory links forgetting to physical trace erosion over time without rehearsal; Interference theory attributes forgetting to mutual competition between overlapping memory items.',
    hints: ['Decay = time & disuse.', 'Interference = competition between memories.', 'Think time passage vs memory collision.'],
  },
  {
    id: 'chal_18',
    nodeId: NODE_052,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Clinical Psychology Integration',
    question: 'How does Dissociative Fugue state differ from standard organic Retrograde Amnesia?',
    options: [
      'Dissociative fugue involves physical skull trauma resulting in inability to form new semantic facts.',
      'Dissociative fugue involves unexpected travel away from home accompanied by complete loss of personal autobiographical identity, driven by psychological conflict rather than physical brain damage.',
      'Organic retrograde amnesia causes loss of motor habits while preserving recent memories.',
      'Dissociative fugue is caused by Ebbinghaus curve exponential decay.'
    ],
    correctIndex: 1,
    explanation: 'Dissociative Fugue is a psychological condition featuring sudden travel and identity loss without structural organic brain lesions, unlike traumatic organic amnesia.',
    hints: ['Fugue involves wandering and identity loss.', 'It is psychological/psychogenic in origin, not physical trauma.', 'Autobiographical memory is uniquely affected.'],
  },
  {
    id: 'chal_19',
    nodeId: NODE_043,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Cognitive Phenomenon Analysis',
    question: 'Why are "Flashbulb Memories" (e.g., vivid personal recall of hearing about major national disasters) uniquely vivid, despite being subject to gradual decay and distortion over time?',
    options: [
      'They bypass short-term memory and encode directly into procedural muscle memory.',
      'High emotional arousal triggers amygdala-hippocampal activation, producing extreme confidence and vivid sensory details, though facts can still drift over years.',
      'Flashbulb memories are perfectly immune to any memory decay or interference.',
      'They rely exclusively on maintenance rehearsal in sensory memory.'
    ],
    correctIndex: 1,
    explanation: 'Emotional intensity activates the amygdala, producing highly vivid and confident episodic traces, but empirical testing proves their factual accuracy still degrades over time.',
    hints: ['Emotion heightens vividness and subjective certainty.', 'Amygdala involvement amplifies encoding.', 'Confidence remains high, but factual accuracy can still erode.'],
  },
  {
    id: 'chal_20',
    nodeId: NODE_055,
    type: 'sort',
    difficulty: 'advanced',
    competencyLevel: 'Hierarchy Construction',
    question: 'Order the levels of memory processing from shallowest (lowest retention) to deepest (highest retention).',
    sortItems: ['Structural (Visual font check)', 'Phonemic (Rhyming check)', 'Semantic (Meaning & concept fit)', 'Self-Referential (Personal connection)'],
    correctOrder: ['Structural (Visual font check)', 'Phonemic (Rhyming check)', 'Semantic (Meaning & concept fit)', 'Self-Referential (Personal connection)'],
    explanation: 'Self-referential processing (connecting info to oneself) is even deeper than general semantic analysis, followed by phonemic, and lastly structural.',
    hints: ['Visual physical traits are shallowest.', 'Sound is intermediate.', 'Meaning is deep.', 'Relating to self is deepest.'],
  },
  {
    id: 'chal_21',
    nodeId: NODE_048,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'Quantitative Calculation',
    question: 'In a memory retention experiment, a student takes 100 seconds to learn a list of terms originally. After 24 hours, re-learning the same list takes 40 seconds. What is the student\'s Savings Score percentage?',
    correctAnswer: 60,
    explanation: 'Savings Score % = [(Original Time - Relearning Time) / Original Time] * 100 = [(100 - 40) / 100] * 100 = 60%.',
    hints: ['Savings = (Original - Relearn) / Original.', '100 - 40 = 60.', '60 / 100 * 100 = 60%.'],
  },
  {
    id: 'chal_22',
    nodeId: NODE_057,
    type: 'mcq',
    difficulty: 'advanced',
    competencyLevel: 'Synthesis & Case Evaluation',
    question: 'A patient with severe anterograde amnesia after hippocampal damage cannot remember what they ate for breakfast 10 minutes ago. However, they rapidly learn to solve a complex mirror-tracing puzzle over 5 days, despite claiming each day that they have never seen the puzzle before. What does this demonstrate?',
    options: [
      'Anterograde amnesia destroys all types of long-term memory equally.',
      'Dissociation between damaged explicit/declarative memory (hippocampus) and preserved implicit/procedural memory (cerebellum/basal ganglia).',
      'The patient is undergoing proactive interference during breakfast.',
      'Mirror-tracing is governed exclusively by sensory iconic memory.'
    ],
    correctIndex: 1,
    explanation: 'Hippocampal damage impairs explicit declarative episodic encoding, while procedural skill learning (implicit) relies on intact basal ganglia and cerebellum networks.',
    hints: ['Explicit memory requires hippocampus.', 'Procedural motor skills rely on basal ganglia & cerebellum.', 'Shows clear double dissociation in memory systems.'],
  },
];

// ==========================================
// CUSTOM SVG DIAGRAM COMPONENTS
// ==========================================

const AtkinsonShiffrinDiagram: React.FC<{ activeStage: string }> = ({ activeStage }) => {
  return (
    <svg className="w-full h-48 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700" viewBox="0 0 700 220">
      <defs>
        <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#38bdf8" />
        </marker>
        <marker id="arrow-decay" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#ef4444" />
        </marker>
      </defs>

      {/* Input Stimuli */}
      <text x="30" y="105" fill="#e2e8f0" fontSize="12" fontWeight="bold">Sensory Inputs</text>
      <text x="30" y="120" fill="#94a3b8" fontSize="10">(Sight, Sound)</text>
      <line x1="110" y1="110" x2="160" y2="110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />

      {/* Box 1: Sensory Memory */}
      <rect
        x="165" y="60" width="130" height="100" rx="8"
        fill={activeStage === 'sensory' ? '#1e3a8a' : '#1e293b'}
        stroke={activeStage === 'sensory' ? '#60a5fa' : '#475569'}
        strokeWidth={activeStage === 'sensory' ? '3' : '1.5'}
      />
      <text x="230" y="85" fill="#60a5fa" fontSize="13" fontWeight="bold" textAnchor="middle">Sensory Memory</text>
      <text x="230" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">Iconic / Echoic</text>
      <text x="230" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">Cap: Large | Dur: &lt; 1s</text>

      {/* Arrow to STM with Attention label */}
      <line x1="295" y1="110" x2="365" y2="110" stroke="#38bdf8" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="330" y="100" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">Attention</text>

      {/* Box 2: Short Term Memory */}
      <rect
        x="370" y="60" width="140" height="100" rx="8"
        fill={activeStage === 'stm' ? '#1e3a8a' : '#1e293b'}
        stroke={activeStage === 'stm' ? '#60a5fa' : '#475569'}
        strokeWidth={activeStage === 'stm' ? '3' : '1.5'}
      />
      <text x="440" y="85" fill="#38bdf8" fontSize="13" fontWeight="bold" textAnchor="middle">Short-Term (STM)</text>
      <text x="440" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">Working Memory</text>
      <text x="440" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">Cap: 7 ± 2 | Dur: ~20s</text>

      {/* STM Rehearsal Loop */}
      <path d="M 410 60 C 410 30, 470 30, 470 60" fill="transparent" stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow)" />
      <text x="440" y="25" fill="#f59e0b" fontSize="9" textAnchor="middle">Maintenance Rehearsal</text>

      {/* Arrow to LTM */}
      <line x1="510" y1="95" x2="575" y2="95" stroke="#10b981" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="542" y="87" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">Encoding</text>

      {/* Arrow from LTM (Retrieval) */}
      <line x1="575" y1="125" x2="510" y2="125" stroke="#a855f7" strokeWidth="3" markerEnd="url(#arrow)" />
      <text x="542" y="140" fill="#a855f7" fontSize="10" fontWeight="bold" textAnchor="middle">Retrieval</text>

      {/* Box 3: Long Term Memory */}
      <rect
        x="580" y="60" width="110" height="100" rx="8"
        fill={activeStage === 'ltm' ? '#1e3a8a' : '#1e293b'}
        stroke={activeStage === 'ltm' ? '#60a5fa' : '#475569'}
        strokeWidth={activeStage === 'ltm' ? '3' : '1.5'}
      />
      <text x="635" y="85" fill="#10b981" fontSize="13" fontWeight="bold" textAnchor="middle">Long-Term (LTM)</text>
      <text x="635" y="105" fill="#cbd5e1" fontSize="10" textAnchor="middle">Explicit / Implicit</text>
      <text x="635" y="125" fill="#94a3b8" fontSize="9" textAnchor="middle">Cap: Unlimited | Dur: Lifetime</text>

      {/* Decay Arrows */}
      <line x1="230" y1="160" x2="230" y2="190" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow-decay)" />
      <text x="230" y="202" fill="#ef4444" fontSize="9" textAnchor="middle">Rapid Decay</text>

      <line x1="440" y1="160" x2="440" y2="190" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3,3" markerEnd="url(#arrow-decay)" />
      <text x="440" y="202" fill="#ef4444" fontSize="9" textAnchor="middle">Forgetting / Displacement</text>
    </svg>
  );
};

const BaddeleyWorkingMemoryDiagram: React.FC<{ activeSubsystem?: string }> = ({ activeSubsystem }) => {
  return (
    <svg className="w-full h-52 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700" viewBox="0 0 650 240">
      {/* Central Executive */}
      <rect
        x="200" y="15" width="250" height="55" rx="10"
        fill={activeSubsystem === 'executive' ? '#3b82f6' : '#1e293b'}
        stroke="#60a5fa" strokeWidth="2"
      />
      <text x="325" y="38" fill="#ffffff" fontSize="14" fontWeight="bold" textAnchor="middle">Central Executive</text>
      <text x="325" y="55" fill="#93c5fd" fontSize="10" textAnchor="middle">Attentional Controller & Resource Allocator</text>

      {/* Connectors */}
      <line x1="250" y1="70" x2="130" y2="115" stroke="#94a3b8" strokeWidth="2" />
      <line x1="325" y1="70" x2="325" y2="115" stroke="#94a3b8" strokeWidth="2" />
      <line x1="400" y1="70" x2="520" y2="115" stroke="#94a3b8" strokeWidth="2" />

      {/* Subsystem 1: Phonological Loop */}
      <rect
        x="30" y="115" width="200" height="85" rx="8"
        fill={activeSubsystem === 'phonological' ? '#831843' : '#1e293b'}
        stroke="#ec4899" strokeWidth="2"
      />
      <text x="130" y="138" fill="#f472b6" fontSize="13" fontWeight="bold" textAnchor="middle">Phonological Loop</text>
      <text x="130" y="156" fill="#fbcfe8" fontSize="10" textAnchor="middle">• Phonological Store (Inner Ear)</text>
      <text x="130" y="174" fill="#fbcfe8" fontSize="10" textAnchor="middle">• Articulatory Process (Inner Voice)</text>

      {/* Subsystem 2: Episodic Buffer */}
      <rect
        x="245" y="115" width="160" height="85" rx="8"
        fill={activeSubsystem === 'buffer' ? '#713f12' : '#1e293b'}
        stroke="#eab308" strokeWidth="2"
      />
      <text x="325" y="138" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle">Episodic Buffer</text>
      <text x="325" y="158" fill="#fef08a" fontSize="10" textAnchor="middle">Multimodal Integration</text>
      <text x="325" y="176" fill="#fef08a" fontSize="10" textAnchor="middle">&amp; LTM Interface</text>

      {/* Subsystem 3: Visuospatial Sketchpad */}
      <rect
        x="420" y="115" width="200" height="85" rx="8"
        fill={activeSubsystem === 'visuospatial' ? '#064e3b' : '#1e293b'}
        stroke="#10b981" strokeWidth="2"
      />
      <text x="520" y="138" fill="#34d399" fontSize="13" fontWeight="bold" textAnchor="middle">Visuospatial Sketchpad</text>
      <text x="520" y="156" fill="#a7f3d0" fontSize="10" textAnchor="middle">• Visual Cache (Form &amp; Color)</text>
      <text x="520" y="174" fill="#a7f3d0" fontSize="10" textAnchor="middle">• Inner Scribe (Spatial &amp; Movement)</text>

      {/* Base LTM Link */}
      <line x1="325" y1="200" x2="325" y2="230" stroke="#eab308" strokeWidth="2" strokeDasharray="3,3" />
      <text x="325" y="235" fill="#e2e8f0" fontSize="10" textAnchor="middle">Long-Term Memory Systems</text>
    </svg>
  );
};

const LevelsOfProcessingDiagram: React.FC<{ activeLevel?: string }> = ({ activeLevel }) => {
  return (
    <svg className="w-full h-44 bg-slate-900 rounded-xl p-2 shadow-inner border border-slate-700" viewBox="0 0 600 180">
      {/* Structural */}
      <rect
        x="30" y="40" width="160" height="100" rx="8"
        fill={activeLevel === 'structural' ? '#7f1d1d' : '#1e293b'}
        stroke="#f87171" strokeWidth="2"
      />
      <text x="110" y="65" fill="#fca5a5" fontSize="13" fontWeight="bold" textAnchor="middle">Structural</text>
      <text x="110" y="85" fill="#fee2e2" fontSize="10" textAnchor="middle">Shallow Processing</text>
      <text x="110" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">Visual font &amp; casing</text>
      <text x="110" y="125" fill="#ef4444" fontSize="11" fontWeight="bold" textAnchor="middle">~15% Recall</text>

      {/* Arrow 1 */}
      <line x1="190" y1="90" x2="220" y2="90" stroke="#94a3b8" strokeWidth="2" />

      {/* Phonemic */}
      <rect
        x="220" y="40" width="160" height="100" rx="8"
        fill={activeLevel === 'phonemic' ? '#78350f' : '#1e293b'}
        stroke="#fbbf24" strokeWidth="2"
      />
      <text x="300" y="65" fill="#fde047" fontSize="13" fontWeight="bold" textAnchor="middle">Phonemic</text>
      <text x="300" y="85" fill="#fef08a" fontSize="10" textAnchor="middle">Intermediate Processing</text>
      <text x="300" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">Acoustic &amp; rhyming</text>
      <text x="300" y="125" fill="#f59e0b" fontSize="11" fontWeight="bold" textAnchor="middle">~45% Recall</text>

      {/* Arrow 2 */}
      <line x1="380" y1="90" x2="410" y2="90" stroke="#94a3b8" strokeWidth="2" />

      {/* Semantic */}
      <rect
        x="410" y="40" width="160" height="100" rx="8"
        fill={activeLevel === 'semantic' ? '#064e3b' : '#1e293b'}
        stroke="#34d399" strokeWidth="2"
      />
      <text x="490" y="65" fill="#6ee7b7" fontSize="13" fontWeight="bold" textAnchor="middle">Semantic</text>
      <text x="490" y="85" fill="#d1fae5" fontSize="10" textAnchor="middle">Deep Processing</text>
      <text x="490" y="105" fill="#94a3b8" fontSize="9" textAnchor="middle">Meaning &amp; context</text>
      <text x="490" y="125" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">~85% Recall</text>
    </svg>
  );
};

// ==========================================
// MAIN COMPONENT CLASS
// ==========================================

export interface SimProps {
  onComplete?: (score: number) => void;
  initialNodeId?: string;
}

export const C11_PsyHumanMemoryCBSESim: React.FC<SimProps> = ({
  onComplete,
  initialNodeId = NODE_028,
}) => {
  // Navigation Tabs State
  const [activeTab, setActiveTab] = useState<'discovery' | 'labs' | 'challenges' | 'misconceptions' | 'summary'>('discovery');

  // Lab Interactive States
  const [currentLabIndex, setCurrentLabIndex] = useState<number>(0);

  // Lab 1: Sperling Sensory Memory Flash state
  const [sperlingState, setSperlingState] = useState<'idle' | 'flashing' | 'recalled'>('idle');
  const [sperlingGrid, setSperlingGrid] = useState<string[][]>([
    ['K', 'X', 'B', 'R'],
    ['M', 'P', 'Z', 'T'],
    ['L', 'D', 'F', 'W']
  ]);
  const [sperlingTargetRow, setSperlingTargetRow] = useState<number | null>(null);
  const [sperlingInput, setSperlingInput] = useState<string>('');
  const [sperlingScore, setSperlingScore] = useState<string | null>(null);

  // Lab 2: Chunking state
  const [chunkingMode, setChunkingMode] = useState<'unchunked' | 'chunked'>('unchunked');
  const [chunkingTestActive, setChunkingTestActive] = useState<boolean>(false);
  const [chunkingSequence, setChunkingSequence] = useState<string>('');
  const [chunkingUserGuess, setChunkingUserGuess] = useState<string>('');
  const [chunkingResult, setChunkingResult] = useState<string | null>(null);

  // Lab 3: Baddeley Dual Task state
  const [dualTaskVisualTracking, setDualTaskVisualTracking] = useState<boolean>(false);
  const [dualTaskVerbalLoop, setDualTaskVerbalLoop] = useState<boolean>(false);
  const [dualTaskEfficiency, setDualTaskEfficiency] = useState<number>(100);

  // Lab 4: Craik-Lockhart Depth of Processing state
  const [craikWordIndex, setCraikWordIndex] = useState<number>(0);
  const [craikUserRatings, setCraikUserRatings] = useState<{ word: string; level: 'structural' | 'phonemic' | 'semantic'; answered: boolean }[]>([]);
  const [craikRecallScore, setCraikRecallScore] = useState<{ structural: number; phonemic: number; semantic: number } | null>(null);

  // Lab 5: Ebbinghaus Curve Delay State
  const [ebbinghausDays, setEbbinghausDays] = useState<number>(0);
  const [ebbinghausReviews, setEbbinghausReviews] = useState<number>(0);

  // Master Challenge System State
  const [activeChallengeIdx, setActiveChallengeIdx] = useState<number>(0);
  const [selectedMcqOption, setSelectedMcqOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [userMatchPairs, setUserMatchPairs] = useState<{ [key: string]: string }>({});
  const [userSortOrder, setUserSortOrder] = useState<string[]>([]);
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Engine Feedback Components State
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number }>({ x: 400, y: 300 });
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHintText, setCurrentHintText] = useState<string>('');

  // Diagnostic / Discovery state
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryFeedback, setDiscoveryFeedback] = useState<boolean | null>(null);

  // BKT & Mastery States
  const [bktMap, setBktMap] = useState<Record<string, BKTState>>(() => {
    const map: Record<string, BKTState> = {};
    ALL_NODE_IDS.forEach(id => {
      map[id] = createBKTState();
    });
    return map;
  });

  const [srsMap, setSrsMap] = useState<Record<string, SRSItem>>(() => {
    const map: Record<string, SRSItem> = {};
    ALL_NODE_IDS.forEach(id => {
      map[id] = createReviewItem(id);
    });
    return map;
  });

  // Auto hint timer ref
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset hints on challenge change
  useEffect(() => {
    setShowHint(false);
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && CHALLENGES[activeChallengeIdx]) {
        setCurrentHintText(CHALLENGES[activeChallengeIdx].hints[0]);
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 12000);

    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [activeChallengeIdx, activeTab]);

  // Initial setup for sort challenge items
  useEffect(() => {
    const currentChal = CHALLENGES[activeChallengeIdx];
    if (currentChal && currentChal.type === 'sort' && currentChal.sortItems) {
      setUserSortOrder([...currentChal.sortItems].sort(() => Math.random() - 0.5));
    }
  }, [activeChallengeIdx]);

  // Handle Audio Speech trigger
  const triggerSpeech = (text: string) => {
    try {
      speechManager.speak(text);
    } catch {
      // safe fallback
    }
  };

  // Helper score calculator
  const calculateTotalScore = () => {
    return Math.round((completedChallenges.size / CHALLENGES.length) * 100);
  };

  // ==========================================
  // LAB INTERACTION HANDLERS
  // ==========================================

  // Lab 1: Sperling Flash
  const runSperlingFlash = (partialReport: boolean) => {
    audioManager.play('whoosh');
    setSperlingState('flashing');
    setSperlingScore(null);
    setSperlingInput('');

    // Randomize grid
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const newGrid = [
      Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * 26)]),
      Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * 26)]),
      Array.from({ length: 4 }, () => letters[Math.floor(Math.random() * 26)]),
    ];
    setSperlingGrid(newGrid);

    const targetRowIndex = partialReport ? Math.floor(Math.random() * 3) : null;
    setSperlingTargetRow(targetRowIndex);

    // Flash for 50ms
    setTimeout(() => {
      setSperlingState('recalled');
      if (partialReport) {
        audioManager.play('chime');
        triggerSpeech(`Tone played for row ${targetRowIndex! + 1}`);
      }
    }, 150);
  };

  const verifySperlingAnswer = () => {
    if (sperlingTargetRow !== null) {
      const correctRowLetters = sperlingGrid[sperlingTargetRow].join('');
      const userEntered = sperlingInput.toUpperCase().trim();
      let matchCount = 0;
      for (let i = 0; i < Math.min(4, userEntered.length); i++) {
        if (correctRowLetters.includes(userEntered[i])) matchCount++;
      }
      // Partial report multiplier (3 rows * match)
      const estimatedTotal = matchCount * 3;
      setSperlingScore(`Partial Tone Recall: ${matchCount}/4 in targeted row. Estimated total in Iconic Store = ${estimatedTotal}/12 letters!`);
      audioManager.play('sparkle');
    } else {
      const allLetters = sperlingGrid.flat().join('');
      const userEntered = sperlingInput.toUpperCase().trim();
      let matchCount = 0;
      for (let i = 0; i < userEntered.length; i++) {
        if (allLetters.includes(userEntered[i])) matchCount++;
      }
      setSperlingScore(`Full Report Recall: ${matchCount}/12 total letters retained in immediate memory limit.`);
      audioManager.play('pop');
    }
  };

  // Lab 2: Chunking Test
  const startChunkingTest = () => {
    audioManager.play('whoosh');
    setChunkingResult(null);
    setChunkingUserGuess('');

    const rawSeq = chunkingMode === 'unchunked' ? '1947195019992024' : '1947 1950 1999 2024';
    setChunkingSequence(rawSeq);
    setChunkingTestActive(true);

    setTimeout(() => {
      setChunkingTestActive(false);
    }, 2500);
  };

  const verifyChunkingGuess = () => {
    const cleanGuess = chunkingUserGuess.replace(/\s+/g, '');
    const cleanSeq = chunkingSequence.replace(/\s+/g, '');

    if (cleanGuess === cleanSeq) {
      setChunkingResult('Perfect Recall! Chunking reduced 16 items into 4 semantic units (1947, 1950, 1999, 2024).');
      audioManager.play('celebration');
      setShowSparkle(true);
    } else {
      setChunkingResult(`Partial Recall. Unchunked 16 individual digits exceed Miller's 7 ± 2 limit!`);
      audioManager.play('error');
    }
  };

  // Lab 3: Baddeley Dual Task Calculation
  useEffect(() => {
    if (!dualTaskVisualTracking && !dualTaskVerbalLoop) {
      setDualTaskEfficiency(100);
    } else if (dualTaskVisualTracking && !dualTaskVerbalLoop) {
      setDualTaskEfficiency(95); // Cross-modal independence
    } else if (!dualTaskVisualTracking && dualTaskVerbalLoop) {
      setDualTaskEfficiency(95);
    } else {
      // Concurrent dual-task across different slave systems!
      setDualTaskEfficiency(90); // Very minor hit due to Central Executive switching overhead
    }
  }, [dualTaskVisualTracking, dualTaskVerbalLoop]);

  // Lab 4: Craik & Lockhart Setup
  const craikWords = [
    { word: 'ELEPHANT', level: 'structural' as const, question: 'Is the word in UPPERCASE font?' },
    { word: 'GUITAR', level: 'phonemic' as const, question: 'Does it rhyme with "STAR"?' },
    { word: 'TEACHER', level: 'semantic' as const, question: 'Is this an educated human profession?' },
    { word: 'BANANA', level: 'structural' as const, question: 'Does it start with a lowercase letter?' },
    { word: 'CLOCK', level: 'phonemic' as const, question: 'Does it rhyme with "ROCK"?' },
    { word: 'HOSPITAL', level: 'semantic' as const, question: 'Is it a place where medical care is given?' },
  ];

  const handleCraikAnswer = (answered: boolean) => {
    audioManager.play('tap');
    const currentItem = craikWords[craikWordIndex];
    setCraikUserRatings(prev => [...prev, { word: currentItem.word, level: currentItem.level, answered }]);

    if (craikWordIndex < craikWords.length - 1) {
      setCraikWordIndex(prev => prev + 1);
    } else {
      // Calculate depth effect
      setCraikRecallScore({
        structural: 20, // Shallow structural baseline
        phonemic: 50,   // Intermediate phonemic baseline
        semantic: 90    // Deep semantic retention
      });
      audioManager.play('celebration');
      triggerSpeech('Semantic processing yields 90% long term retention compared to only 20% for structural!');
    }
  };

  // Lab 5: Ebbinghaus retention curve formula
  const ebbinghausRetention = useMemo(() => {
    // Retention R = e^(-t/S) where repetitions boost strength S
    const strengthMultiplier = 1 + ebbinghausReviews * 1.5;
    const baseRetention = Math.exp(-ebbinghausDays / (3 * strengthMultiplier)) * 100;
    return Math.max(10, Math.min(100, Math.round(baseRetention)));
  }, [ebbinghausDays, ebbinghausReviews]);

  // ==========================================
  // CHALLENGE ENGINE HANDLERS
  // ==========================================

  const handleMcqSelect = (index: number) => {
    audioManager.play('tap');
    setSelectedMcqOption(index);
  };

  const handleMatchSelect = (left: string, right: string) => {
    audioManager.play('pickup');
    setUserMatchPairs(prev => ({ ...prev, [left]: right }));
  };

  const handleSortMove = (fromIndex: number, toIndex: number) => {
    audioManager.play('swoop');
    const updated = [...userSortOrder];
    const [moved] = updated.splice(fromIndex, 1);
    updated.splice(toIndex, 0, moved);
    setUserSortOrder(updated);
  };

  const submitChallengeAnswer = () => {
    const currentChal = CHALLENGES[activeChallengeIdx];
    let isCorrect = false;

    if (currentChal.type === 'mcq') {
      isCorrect = selectedMcqOption === currentChal.correctIndex;
    } else if (currentChal.type === 'numeric') {
      const parsed = parseFloat(numericAnswer.trim());
      isCorrect = parsed === currentChal.correctAnswer;
    } else if (currentChal.type === 'match') {
      isCorrect = (currentChal.matchPairs || []).every(
        pair => userMatchPairs[pair.left] === pair.right
      );
    } else if (currentChal.type === 'sort') {
      isCorrect = JSON.stringify(userSortOrder) === JSON.stringify(currentChal.correctOrder);
    }

    // Update BKT & SRS
    const currentBkt = bktMap[currentChal.nodeId] || createBKTState();
    const newBkt = bktUpdate(currentBkt, isCorrect);
    setBktMap(prev => ({ ...prev, [currentChal.nodeId]: newBkt }));

    const currentSrs = srsMap[currentChal.nodeId] || createReviewItem(currentChal.nodeId);
    const newSrs = sm2Update(currentSrs, isCorrect ? 5 : 1);
    setSrsMap(prev => ({ ...prev, [currentChal.nodeId]: newSrs }));

    if (isCorrect) {
      audioManager.play('drop-correct');
      setChallengeFeedback({ isCorrect: true, text: 'Excellent! ' + currentChal.explanation });
      setCompletedChallenges(prev => new Set(prev).add(currentChal.id));
      setShowSuccess(true);
      setShowSparkle(true);
      setSparklePos({ x: window.innerWidth / 2, y: window.innerHeight / 3 });

      const newScore = Math.round(((completedChallenges.size + 1) / CHALLENGES.length) * 100);
      recordGameScore('c11_psy_human_memory', newScore);

      if (completedChallenges.size + 1 === CHALLENGES.length) {
        setShowConfetti(true);
        audioManager.play('celebration');
        triggerSpeech('Congratulations! You have completed all human memory challenges!');
        if (onComplete) onComplete(newScore);
      }
    } else {
      audioManager.play('drop-wrong');
      setChallengeFeedback({
        isCorrect: false,
        text: 'Not quite. ' + currentChal.explanation + (currentChal.misconceptionIndex !== undefined ? ' Watch out for misconception: ' + MISCONCEPTIONS[currentChal.misconceptionIndex]?.title : '')
      });
    }
  };

  const nextChallenge = () => {
    setSelectedMcqOption(null);
    setNumericAnswer('');
    setUserMatchPairs({});
    setChallengeFeedback(null);
    setShowSuccess(false);

    if (activeChallengeIdx < CHALLENGES.length - 1) {
      setActiveChallengeIdx(prev => prev + 1);
    }
  };

  const prevChallenge = () => {
    setSelectedMcqOption(null);
    setNumericAnswer('');
    setUserMatchPairs({});
    setChallengeFeedback(null);
    setShowSuccess(false);

    if (activeChallengeIdx > 0) {
      setActiveChallengeIdx(prev => prev - 1);
    }
  };

  // ==========================================
  // DISCOVERY QUESTION HANDLER
  // ==========================================
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    const correct = index === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryFeedback(correct);

    if (correct) {
      audioManager.play('celebration');
      setShowConfetti(true);
      triggerSpeech('Correct! Sperling iconic memory retains almost all visual information for less than half a second.');
    } else {
      audioManager.play('error');
      triggerSpeech('That is a common preconception, but sensory memory holds almost the whole grid momentarily!');
    }
  };

  // Render Current Lab UI
  const renderInteractiveLab = () => {
    switch (currentLabIndex) {
      case 0:
        return (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-sky-400">Lab 1: Sperling Visual Sensory Memory (Iconic Flash)</h3>
                <p className="text-sm text-slate-300">Node: {NODE_031} | Sensory Memory System</p>
              </div>
              <span className="bg-sky-950 text-sky-300 text-xs px-3 py-1 rounded-full border border-sky-700 font-mono">50ms Exposure</span>
            </div>

            <AtkinsonShiffrinDiagram activeStage="sensory" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              {/* Visual Flash Display */}
              <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-8 flex flex-col items-center justify-center min-h-[220px]">
                {sperlingState === 'idle' && (
                  <p className="text-slate-400 text-center">Click a button below to flash 12 letters for 50 milliseconds.</p>
                )}

                {sperlingState === 'flashing' && (
                  <div className="grid grid-cols-4 gap-4 animate-pulse">
                    {sperlingGrid.flat().map((char, idx) => (
                      <div key={idx} className="w-12 h-12 bg-sky-600 text-white font-mono font-bold text-2xl rounded flex items-center justify-center shadow-lg">
                        {char}
                      </div>
                    ))}
                  </div>
                )}

                {sperlingState === 'recalled' && (
                  <div className="text-center space-y-3">
                    <p className="text-amber-400 text-sm font-semibold">
                      {sperlingTargetRow !== null ? `Tone Signal Played for Row ${sperlingTargetRow + 1}!` : 'Full Report: Recall as many as possible.'}
                    </p>
                    <div className="grid grid-cols-4 gap-2 opacity-20">
                      {sperlingGrid.flat().map((_, idx) => (
                        <div key={idx} className="w-10 h-10 bg-slate-700 rounded border border-slate-600"></div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Controls & Input */}
              <div className="space-y-4">
                <div className="flex gap-3">
                  <button
                    onClick={() => runSperlingFlash(false)}
                    className="flex-1 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-md text-sm"
                  >
                    1. Flash Full Report
                  </button>
                  <button
                    onClick={() => runSperlingFlash(true)}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-semibold py-2.5 px-4 rounded-lg transition shadow-md text-sm"
                  >
                    2. Flash Tone-Guided Partial
                  </button>
                </div>

                {sperlingState === 'recalled' && (
                  <div className="space-y-3 bg-slate-900/60 p-4 rounded-xl border border-slate-700">
                    <label className="block text-xs text-slate-300 font-semibold">
                      Enter the letters you remember:
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={sperlingInput}
                        onChange={e => setSperlingInput(e.target.value.toUpperCase())}
                        placeholder="e.g. KXB"
                        className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono uppercase"
                      />
                      <button
                        onClick={verifySperlingAnswer}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-4 rounded-lg text-sm"
                      >
                        Verify
                      </button>
                    </div>
                  </div>
                )}

                {sperlingScore && (
                  <div className="bg-emerald-950/80 border border-emerald-600 p-3 rounded-xl text-emerald-200 text-xs leading-relaxed font-mono">
                    {sperlingScore}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-sky-400">Lab 2: STM Digit Span & Chunking Dynamics</h3>
                <p className="text-sm text-slate-300">Node: {NODE_036} | Chunking Strategy</p>
              </div>
              <span className="bg-purple-950 text-purple-300 text-xs px-3 py-1 rounded-full border border-purple-700 font-mono">Miller 7 ± 2</span>
            </div>

            <AtkinsonShiffrinDiagram activeStage="stm" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 text-center space-y-4">
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Digit Stream Presentation</span>
                <div className="min-h-[60px] flex items-center justify-center">
                  {chunkingTestActive ? (
                    <span className="text-3xl font-mono font-bold text-amber-400 tracking-widest animate-pulse">
                      {chunkingSequence}
                    </span>
                  ) : (
                    <span className="text-slate-500 text-sm">Click Start Test below to expose digit sequence for 2.5 seconds</span>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex rounded-lg bg-slate-900 p-1 border border-slate-700">
                  <button
                    onClick={() => setChunkingMode('unchunked')}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition ${chunkingMode === 'unchunked' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    16 Unchunked Digits
                  </button>
                  <button
                    onClick={() => setChunkingMode('chunked')}
                    className={`flex-1 py-1.5 rounded-md text-xs font-semibold transition ${chunkingMode === 'chunked' ? 'bg-indigo-600 text-white' : 'text-slate-400'}`}
                  >
                    4 Semantic Chunks (Years)
                  </button>
                </div>

                <button
                  onClick={startChunkingTest}
                  disabled={chunkingTestActive}
                  className="w-full bg-purple-600 hover:bg-purple-500 disabled:opacity-50 text-white font-semibold py-2.5 rounded-lg text-sm shadow-md"
                >
                  Start Sequence Flash
                </button>

                {!chunkingTestActive && chunkingSequence && (
                  <div className="space-y-2">
                    <input
                      type="text"
                      value={chunkingUserGuess}
                      onChange={e => setChunkingUserGuess(e.target.value)}
                      placeholder="Type remembered numbers..."
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-white font-mono text-sm"
                    />
                    <button
                      onClick={verifyChunkingGuess}
                      className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-2 rounded-lg text-sm"
                    >
                      Verify Recall Accuracy
                    </button>
                  </div>
                )}

                {chunkingResult && (
                  <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs text-sky-300 leading-relaxed font-mono">
                    {chunkingResult}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-sky-400">Lab 3: Baddeley Working Memory Dual-Task Visualizer</h3>
                <p className="text-sm text-slate-300">Node: {NODE_038} | Working Memory Model (1986)</p>
              </div>
              <span className="bg-emerald-950 text-emerald-300 text-xs px-3 py-1 rounded-full border border-emerald-700 font-mono">Multi-Component</span>
            </div>

            <BaddeleyWorkingMemoryDiagram
              activeSubsystem={
                dualTaskVisualTracking && dualTaskVerbalLoop
                  ? 'executive'
                  : dualTaskVisualTracking
                  ? 'visuospatial'
                  : dualTaskVerbalLoop
                  ? 'phonological'
                  : undefined
              }
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900 p-5 rounded-xl border border-slate-700">
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-slate-200">Toggle Concurrent Cognitive Demands:</h4>
                <label className="flex items-center space-x-3 bg-slate-800 p-3 rounded-lg border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dualTaskVerbalLoop}
                    onChange={e => {
                      setDualTaskVerbalLoop(e.target.checked);
                      audioManager.play('tap');
                    }}
                    className="w-4 h-4 text-pink-600 rounded"
                  />
                  <div>
                    <span className="text-sm font-bold text-pink-400">Task A: Phonological Loop</span>
                    <p className="text-xs text-slate-400">Repeat "1-2-3-4" silently in your inner voice continuously.</p>
                  </div>
                </label>

                <label className="flex items-center space-x-3 bg-slate-800 p-3 rounded-lg border border-slate-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dualTaskVisualTracking}
                    onChange={e => {
                      setDualTaskVisualTracking(e.target.checked);
                      audioManager.play('tap');
                    }}
                    className="w-4 h-4 text-emerald-600 rounded"
                  />
                  <div>
                    <span className="text-sm font-bold text-emerald-400">Task B: Visuospatial Sketchpad</span>
                    <p className="text-xs text-slate-400">Track a moving red dot through a 3D spatial maze path mentally.</p>
                  </div>
                </label>
              </div>

              <div className="flex flex-col justify-center items-center p-4 bg-slate-950 rounded-xl border border-slate-800 text-center">
                <span className="text-xs text-slate-400 font-semibold mb-1">Overall System Performance</span>
                <div className="text-4xl font-extrabold font-mono text-emerald-400 mb-2">
                  {dualTaskEfficiency}%
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-xs">
                  {dualTaskVisualTracking && dualTaskVerbalLoop
                    ? 'High cross-modal independence! Because Task A and Task B target different slave systems, performance remains high.'
                    : 'Activate both sub-components above to observe cross-modal dual-task execution in action.'}
                </p>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-sky-400">Lab 4: Craik & Lockhart Depth of Processing Engine</h3>
                <p className="text-sm text-slate-300">Node: {NODE_039} | Levels of Processing Model</p>
              </div>
              <span className="bg-teal-950 text-teal-300 text-xs px-3 py-1 rounded-full border border-teal-700 font-mono">Structural vs Semantic</span>
            </div>

            <LevelsOfProcessingDiagram activeLevel={craikWords[craikWordIndex]?.level} />

            {craikRecallScore === null ? (
              <div className="bg-slate-900 border-2 border-slate-700 rounded-xl p-6 text-center space-y-6">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 uppercase font-semibold">Word {craikWordIndex + 1} of {craikWords.length}</span>
                  <div className="text-3xl font-mono font-extrabold text-teal-400 tracking-wider">
                    {craikWords[craikWordIndex].word}
                  </div>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 inline-block max-w-md">
                  <p className="text-slate-200 text-sm font-medium">{craikWords[craikWordIndex].question}</p>
                  <span className="text-xs text-slate-500 uppercase font-semibold mt-1 block">Level: {craikWords[craikWordIndex].level}</span>
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => handleCraikAnswer(true)}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-2.5 rounded-lg font-semibold text-sm shadow-md"
                  >
                    YES
                  </button>
                  <button
                    onClick={() => handleCraikAnswer(false)}
                    className="bg-rose-600 hover:bg-rose-500 text-white px-8 py-2.5 rounded-lg font-semibold text-sm shadow-md"
                  >
                    NO
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 p-6 rounded-xl border border-slate-700 space-y-4">
                <h4 className="text-base font-bold text-slate-100 text-center">Empirical Recall Results by Processing Depth</h4>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="bg-slate-950 p-4 rounded-xl border border-rose-900/50">
                    <span className="text-xs text-rose-400 font-semibold uppercase">Structural</span>
                    <div className="text-3xl font-bold text-rose-400 mt-2">{craikRecallScore.structural}%</div>
                    <span className="text-[10px] text-slate-400">Visual/Casing only</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-amber-900/50">
                    <span className="text-xs text-amber-400 font-semibold uppercase">Phonemic</span>
                    <div className="text-3xl font-bold text-amber-400 mt-2">{craikRecallScore.phonemic}%</div>
                    <span className="text-[10px] text-slate-400">Acoustic/Rhyme</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-emerald-900/50">
                    <span className="text-xs text-emerald-400 font-semibold uppercase">Semantic</span>
                    <div className="text-3xl font-bold text-emerald-400 mt-2">{craikRecallScore.semantic}%</div>
                    <span className="text-[10px] text-slate-400">Meaning & Context</span>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setCraikWordIndex(0);
                    setCraikUserRatings([]);
                    setCraikRecallScore(null);
                  }}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 py-2 rounded-lg text-xs font-semibold"
                >
                  Restart Experiment
                </button>
              </div>
            )}
          </div>
        );

      case 4:
        return (
          <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-xl space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-sky-400">Lab 5: Ebbinghaus Forgetting & Retention Simulator</h3>
                <p className="text-sm text-slate-300">Node: {NODE_047} | Forgetting Curve & Savings Score</p>
              </div>
              <span className="bg-rose-950 text-rose-300 text-xs px-3 py-1 rounded-full border border-rose-700 font-mono">Exponential Decay</span>
            </div>

            <div className="bg-slate-900 p-5 rounded-xl border border-slate-700 space-y-4">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Time Elapsed: <strong className="text-sky-400 font-mono text-sm">{ebbinghausDays} Days</strong></span>
                <span>Spaced Review Repetitions: <strong className="text-emerald-400 font-mono text-sm">{ebbinghausReviews} Reviews</strong></span>
                <span>Retention Level: <strong className="text-amber-400 font-mono text-sm">{ebbinghausRetention}%</strong></span>
              </div>

              {/* Graphical Retention Curve Representation */}
              <div className="h-32 bg-slate-950 rounded-lg p-4 relative flex items-end border border-slate-800">
                <div
                  className="w-full bg-gradient-to-t from-rose-600 via-amber-500 to-emerald-500 rounded-t transition-all duration-300"
                  style={{ height: `${ebbinghausRetention}%` }}
                ></div>
                <div className="absolute top-2 right-4 text-xs font-mono text-slate-400">
                  R = e<sup>(-t / S)</sup>
                </div>
              </div>

              {/* Sliders */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Time Delay (Days after initial learning):</label>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={ebbinghausDays}
                    onChange={e => {
                      setEbbinghausDays(parseInt(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-sky-500 cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-300">Spaced Repetitions (Review Count):</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    value={ebbinghausReviews}
                    onChange={e => {
                      setEbbinghausReviews(parseInt(e.target.value));
                      audioManager.play('tap');
                    }}
                    className="w-full accent-emerald-500 cursor-pointer"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                <strong>Insight:</strong> Forgetting occurs most rapidly immediately after learning (dropping sharply in the first 20 minutes to 1 day). Adding spaced reviews increases memory strength (S), flattening the decay slope!
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 font-sans">
      {/* TOP BAR BRANDING */}
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-800 pb-4">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">CISCE Class 11 Psychology • Memory Unit</span>
          <h1 className="text-2xl md:text-3xl font-extrabold text-white">Human Memory Cognitive Dynamics Lab</h1>
        </div>

        <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 px-4 py-2 rounded-xl">
          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-semibold uppercase">Overall Mastery</span>
            <span className="text-lg font-mono font-bold text-emerald-400">{calculateTotalScore()}%</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-600 flex items-center justify-center font-bold text-emerald-400 text-sm">
            {completedChallenges.size}/{CHALLENGES.length}
          </div>
        </div>
      </header>

      {/* FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Challenge Mastered!" />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* MAIN NAV TABS */}
      <nav className="max-w-6xl mx-auto mb-8 flex flex-wrap gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => {
            setActiveTab('discovery');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${activeTab === 'discovery' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'}`}
        >
          1. Discovery
        </button>
        <button
          onClick={() => {
            setActiveTab('labs');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${activeTab === 'labs' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'}`}
        >
          2. Interactive Labs ({EXPLORATION_STEPS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('challenges');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${activeTab === 'challenges' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'}`}
        >
          3. Challenges ({CHALLENGES.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('misconceptions');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${activeTab === 'misconceptions' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'}`}
        >
          4. Misconceptions ({MISCONCEPTIONS.length})
        </button>
        <button
          onClick={() => {
            setActiveTab('summary');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg font-semibold text-sm transition ${activeTab === 'summary' ? 'bg-sky-600 text-white shadow-md' : 'text-slate-400 hover:bg-slate-900'}`}
        >
          5. PQRST Real-World Lab
        </button>
      </nav>

      {/* TAB 1: DISCOVERY & PREDICTIONS */}
      {activeTab === 'discovery' && (
        <main className="max-w-4xl mx-auto space-y-8">
          {/* SCENARIO CARD */}
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-widest">Lab Context</span>
            <h2 className="text-xl font-bold text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{SCENARIO.intro}</p>
            <p className="text-sm text-slate-400 leading-relaxed">{SCENARIO.context}</p>
          </section>

          {/* DISCOVERY QUESTION */}
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">Counterintuitive Discovery Question</span>
            <h3 className="text-base font-semibold text-slate-100">{DISCOVERY_QUESTION.question}</h3>

            <div className="space-y-2">
              {DISCOVERY_QUESTION.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition ${
                    discoverySelected === idx
                      ? discoveryFeedback
                        ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950 border-rose-500 text-rose-200'
                      : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                  }`}
                >
                  <span className="font-bold mr-2">{String.fromCharCode(65 + idx)}.</span> {opt}
                </button>
              ))}
            </div>

            {discoveryFeedback !== null && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${discoveryFeedback ? 'bg-emerald-950/80 border-emerald-600 text-emerald-200' : 'bg-amber-950/80 border-amber-600 text-amber-200'}`}>
                {DISCOVERY_QUESTION.hintAfter}
              </div>
            )}
          </section>

          {/* PREDICTION QUESTIONS ARRAY */}
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
            <h3 className="text-lg font-bold text-sky-400">Hypothesis & Prediction Tasks</h3>
            {PREDICTION_QUESTIONS.map((pq, idx) => (
              <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                <p className="text-sm font-semibold text-slate-200">{pq.question}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {pq.options.map((opt, oIdx) => (
                    <div key={oIdx} className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs text-slate-300">
                      <span className="font-bold text-sky-400 mr-1.5">{String.fromCharCode(65 + oIdx)}.</span>
                      {opt}
                    </div>
                  ))}
                </div>
                <p className="text-[11px] text-amber-400 font-mono">Verification: {pq.verifyInstruction}</p>
              </div>
            ))}
          </section>
        </main>
      )}

      {/* TAB 2: INTERACTIVE LABS */}
      {activeTab === 'labs' && (
        <main className="max-w-5xl mx-auto space-y-8">
          {/* EXPLORATION STEPS SELECTOR */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <button
                key={idx}
                onClick={() => {
                  setCurrentLabIndex(idx);
                  audioManager.play('tap');
                }}
                className={`p-3 rounded-xl border text-left text-xs font-semibold transition ${
                  currentLabIndex === idx
                    ? 'bg-sky-600 border-sky-400 text-white shadow-lg'
                    : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <span className="block text-[10px] opacity-75 uppercase">Lab {idx + 1}</span>
                {step.title.split(':')[1] || step.title}
              </button>
            ))}
          </div>

          {/* ACTIVE INTERACTIVE LAB VIEW */}
          {renderInteractiveLab()}

          {/* OBSERVATION QUESTIONS ARRAY */}
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-emerald-400">Lab Observation Checkpoints</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {OBSERVATION_QUESTIONS.map((oq, idx) => (
                <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <p className="text-xs font-semibold text-slate-200">{oq.question}</p>
                  <ul className="space-y-1">
                    {oq.observableOptions.map((opt, oIdx) => (
                      <li key={oIdx} className={`text-[11px] p-2 rounded ${oIdx === oq.correctIndex ? 'bg-emerald-950/60 text-emerald-300 font-medium border border-emerald-800/50' : 'text-slate-400'}`}>
                        • {opt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}

      {/* TAB 3: CHALLENGES */}
      {activeTab === 'challenges' && (
        <main className="max-w-4xl mx-auto space-y-6">
          {/* CHALLENGE PROGRESS & HEADER */}
          <div className="flex justify-between items-center bg-slate-900 p-4 rounded-xl border border-slate-800">
            <div>
              <span className="text-xs font-bold text-sky-400 uppercase">
                Challenge {activeChallengeIdx + 1} of {CHALLENGES.length}
              </span>
              <h2 className="text-sm font-semibold text-slate-200">
                Competency: {CHALLENGES[activeChallengeIdx].competencyLevel}
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2.5 py-1 rounded-full border uppercase font-mono font-bold ${
                CHALLENGES[activeChallengeIdx].difficulty === 'foundation'
                  ? 'bg-emerald-950 border-emerald-700 text-emerald-300'
                  : CHALLENGES[activeChallengeIdx].difficulty === 'standard'
                  ? 'bg-amber-950 border-amber-700 text-amber-300'
                  : 'bg-rose-950 border-rose-700 text-rose-300'
              }`}>
                {CHALLENGES[activeChallengeIdx].difficulty}
              </span>
            </div>
          </div>

          {/* ACTIVE CHALLENGE CONTAINER */}
          <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-6 shadow-xl">
            <p className="text-base font-semibold text-slate-100 leading-relaxed">
              {CHALLENGES[activeChallengeIdx].question}
            </p>

            {/* TYPE: MCQ */}
            {CHALLENGES[activeChallengeIdx].type === 'mcq' && CHALLENGES[activeChallengeIdx].options && (
              <div className="space-y-2">
                {CHALLENGES[activeChallengeIdx].options!.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleMcqSelect(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-sm font-medium transition ${
                      selectedMcqOption === idx
                        ? 'bg-sky-950 border-sky-500 text-sky-200'
                        : 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <span className="font-bold mr-2 text-sky-400">{String.fromCharCode(65 + idx)}.</span> {opt}
                  </button>
                ))}
              </div>
            )}

            {/* TYPE: NUMERIC */}
            {CHALLENGES[activeChallengeIdx].type === 'numeric' && (
              <div className="space-y-3 max-w-xs">
                <label className="text-xs text-slate-400 font-semibold block">Enter Numeric Value:</label>
                <input
                  type="number"
                  value={numericAnswer}
                  onChange={e => setNumericAnswer(e.target.value)}
                  placeholder="e.g. 55"
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono text-lg focus:outline-none focus:border-sky-500"
                />
              </div>
            )}

            {/* TYPE: MATCH */}
            {CHALLENGES[activeChallengeIdx].type === 'match' && CHALLENGES[activeChallengeIdx].matchPairs && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-semibold">Select matching pairing for each left item:</p>
                {CHALLENGES[activeChallengeIdx].matchPairs!.map((pair, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-xs font-semibold text-sky-300 md:w-1/3">{pair.left}</span>
                    <select
                      value={userMatchPairs[pair.left] || ''}
                      onChange={e => handleMatchSelect(pair.left, e.target.value)}
                      className="w-full md:w-2/3 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-200"
                    >
                      <option value="">-- Choose matching definition --</option>
                      {CHALLENGES[activeChallengeIdx].matchPairs!.map((p, pIdx) => (
                        <option key={pIdx} value={p.right}>{p.right}</option>
                      ))}
                    </select>
                  </div>
                ))}
              </div>
            )}

            {/* TYPE: SORT */}
            {CHALLENGES[activeChallengeIdx].type === 'sort' && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400 font-semibold">Re-order items into correct sequence (use arrows):</p>
                <div className="space-y-2">
                  {userSortOrder.map((item, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs font-mono font-bold text-sky-400 mr-3">{idx + 1}.</span>
                      <span className="text-xs text-slate-200 flex-1">{item}</span>
                      <div className="flex gap-1">
                        <button
                          disabled={idx === 0}
                          onClick={() => handleSortMove(idx, idx - 1)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold"
                        >
                          ↑
                        </button>
                        <button
                          disabled={idx === userSortOrder.length - 1}
                          onClick={() => handleSortMove(idx, idx + 1)}
                          className="px-2 py-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 rounded text-xs font-bold"
                        >
                          ↓
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SUBMIT BUTTON */}
            <div className="pt-4 border-t border-slate-800 flex justify-between items-center">
              <button
                onClick={submitChallengeAnswer}
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-2.5 rounded-xl text-sm shadow-md transition"
              >
                Submit Answer
              </button>

              <div className="flex gap-2">
                <button
                  disabled={activeChallengeIdx === 0}
                  onClick={prevChallenge}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Previous
                </button>
                <button
                  disabled={activeChallengeIdx === CHALLENGES.length - 1}
                  onClick={nextChallenge}
                  className="bg-slate-800 hover:bg-slate-700 disabled:opacity-40 text-slate-300 font-semibold px-4 py-2 rounded-lg text-xs"
                >
                  Next
                </button>
              </div>
            </div>

            {/* FEEDBACK BANNER */}
            {challengeFeedback && (
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
                challengeFeedback.isCorrect ? 'bg-emerald-950/90 border-emerald-600 text-emerald-200' : 'bg-rose-950/90 border-rose-600 text-rose-200'
              }`}>
                {challengeFeedback.text}
              </div>
            )}
          </div>
        </main>
      )}

      {/* TAB 4: MISCONCEPTIONS */}
      {activeTab === 'misconceptions' && (
        <main className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-xl font-bold text-sky-400">Psychological Misconceptions & Evidence-Based Corrections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {MISCONCEPTIONS.map(misc => (
              <div key={misc.id} className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3 shadow-xl">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-bold text-rose-400">{misc.title}</h3>
                  <span className="text-[10px] font-mono bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800">{misc.nodeId}</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-amber-400">Flawed Assumption:</strong> {misc.explanation}
                </p>
                <p className="text-xs text-emerald-300 leading-relaxed bg-emerald-950/50 p-3 rounded-xl border border-emerald-900">
                  <strong>Cognitive Truth:</strong> {misc.correction}
                </p>
              </div>
            ))}
          </div>
        </main>
      )}

      {/* TAB 5: PQRST REAL-WORLD ACTIVITY SUMMARY */}
      {activeTab === 'summary' && (
        <main className="max-w-4xl mx-auto space-y-8">
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest">Real-World Application</span>
            <h2 className="text-xl font-bold text-white">{REAL_WORLD_ACTIVITY.title}</h2>
            <p className="text-sm text-slate-300 leading-relaxed">{REAL_WORLD_ACTIVITY.description}</p>

            <div className="space-y-3 pt-2">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="w-6 h-6 rounded-full bg-purple-950 border border-purple-600 text-purple-300 flex items-center justify-center font-mono font-bold text-xs shrink-0">
                    {idx + 1}
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">{step}</p>
                </div>
              ))}
            </div>
          </section>

          {/* DIAGNOSTIC RECAP TABLE */}
          <section className="bg-slate-900 p-6 rounded-2xl border border-slate-800 space-y-4 shadow-xl">
            <h3 className="text-lg font-bold text-sky-400">Diagnostic Mastery Summary ({DIAGNOSTIC_QUESTIONS.length} Questions)</h3>
            <div className="space-y-3">
              {DIAGNOSTIC_QUESTIONS.map(dq => (
                <div key={dq.id} className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-sky-400">{dq.nodeId}</span>
                    <p className="text-xs font-semibold text-slate-200">{dq.question}</p>
                    <p className="text-[11px] text-slate-400 italic">Remedial Concept: {dq.remedialConcept}</p>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 shrink-0">
                    Ans: {dq.options[dq.correctIndex]}
                  </span>
                </div>
              ))}
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default C11_PsyHumanMemoryCBSESim;