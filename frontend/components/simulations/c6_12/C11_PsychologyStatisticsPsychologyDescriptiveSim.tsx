'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS (ISC PSYCHOLOGY CLASS 11) ───
const NODE_C11_PSY_011 = 'c11_psy_011';
const NODE_C11_PSY_012 = 'c11_psy_012';
const NODE_C11_PSY_013 = 'c11_psy_013';
const NODE_C11_PSY_014 = 'c11_psy_014';
const NODE_C11_PSY_015 = 'c11_psy_015';
const NODE_C11_PSY_016 = 'c11_psy_016';
const NODE_C11_PSY_017 = 'c11_psy_017';
const NODE_C11_PSY_018 = 'c11_psy_018';
const NODE_C11_PSY_019 = 'c11_psy_019';
const NODE_C11_PSY_020 = 'c11_psy_020';

const ALL_NODE_IDS = [
  NODE_C11_PSY_011,
  NODE_C11_PSY_012,
  NODE_C11_PSY_013,
  NODE_C11_PSY_014,
  NODE_C11_PSY_015,
  NODE_C11_PSY_016,
  NODE_C11_PSY_017,
  NODE_C11_PSY_018,
  NODE_C11_PSY_019,
  NODE_C11_PSY_020,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'The NIMHANS Cognitive & Affective Neuroscience Lab',
  intro: 'Welcome to the Research Division at NIMHANS Bengaluru! As a junior psychologist, you are tasked with interpreting clinical test scores, testing sensory-perceptual thresholds, mapping emotional brain circuits, and determining motivational drives across adolescent cases.',
  context: 'You will analyze real empirical data distributions, calibrate optical illusions and after-images, decode James-Lange vs Schachter-Singer emotional pathways, and balance homeostatic needs.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a mental health clinic with 10 patients, 9 patients have an anxiety score of 15 (mild), but 1 severe patient scores 95. Which measure of central tendency gives the truest picture of a "typical" patient?',
  options: [
    'The Mean (it calculates the exact arithmetic average of all scores)',
    'The Median (it resists extreme outliers and reflects the 50th percentile)',
    'The Range (it captures the distance between 15 and 95)',
    'The Standard Deviation (it squares the extreme difference)',
  ],
  correctIndex: 1,
  hintAfter: 'Mean is heavily pulled by extreme values (the outlier 95 pulls the mean to 23!). The median remains unaffected at 15. Let us explore the math and the mind!',
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
  nodeId: NODE_C11_PSY_011,
  title: 'Psychology: Statistics, Sensation, Perception & Motivation',
  definition: 'Psychology as an empirical science utilizes descriptive/inferential statistics, investigates attentional determinants and perceptual organization, decodes emotional circuits (thalamus, amygdala, hypothalamus), and analyzes homeostatic drives.',
  eli5: 'Think of psychology as understanding how information enters through senses, gets organized and interpreted by the brain, triggers bodily and emotional feelings, and motivates us to act.',
  misconceptions: [
    { misconception: 'Inferential statistics is used to compute the mean and median.', correction: 'Computing mean/median is descriptive; inferential statistics tests hypothesis significance (p < 0.05) to generalize from sample to population.' },
    { misconception: 'Statistical significance means the effect is large and clinically important.', correction: 'Statistical significance only indicates the effect is unlikely due to chance; practical importance depends on effect size and real-world impact.' },
    { misconception: 'James-Lange theory states that conscious feelings cause bodily reactions.', correction: 'James-Lange claims bodily reactions occur first, and subjective feelings are the brain reading those bodily feedback signals.' },
    { misconception: 'Negative after-images show the same colors as the original image.', correction: 'Negative after-images appear in complementary colors due to photoreceptor (cone) adaptation and opponent-process rebound.' },
    { misconception: 'Instincts and learned motives are the same because both drive action.', correction: 'Instincts are unlearned, innate, stereotyped species patterns; motives are flexible, learned, and goal-directed.' },
  ],
  diagnosticQuestions: [
    { question: 'Which branch of statistics determines whether an observed difference occurred by chance?', options: ['Descriptive Statistics', 'Inferential Statistics', 'Central Tendency', 'Dispersion Index'], correctIndex: 1 },
    { question: 'What is the median of the scores: 12, 14, 15, 18, 20, 22, 50?', options: ['18', '15', '21.5', '20'], correctIndex: 0 },
    { question: 'Which of the following is an INNER determinant of attention?', options: ['Sudden loud intensity', 'High color contrast', 'Biological need (hunger)', 'Moving billboard'], correctIndex: 2 },
    { question: 'What Gestalt law explains perceiving an incomplete circle as whole?', options: ['Proximity', 'Similarity', 'Closure', 'Continuity'], correctIndex: 2 },
    { question: 'Retinal disparity is classified as which type of depth cue?', options: ['Monocular cue', 'Binocular cue', 'Pictorial cue', 'Aerial perspective'], correctIndex: 1 },
    { question: 'Staring at a bright green patch causes what color negative after-image?', options: ['Blue', 'Yellow', 'Magenta/Reddish', 'Green'], correctIndex: 2 },
    { question: 'In the Muller-Lyer illusion, which line is perceived as longer?', options: ['Line with outward-pointing fins (>—<)', 'Line with inward-pointing arrowheads (<—>)', 'Both look identical', 'The horizontal line always'], correctIndex: 0 },
    { question: 'Which brain structure acts as the emotional relay station?', options: ['Hypothalamus', 'Thalamus', 'Pons', 'Medulla'], correctIndex: 1 },
  ],
  masteryCriteria: 'Mastery across statistical calculation, Gestalt laws, depth cues, illusions, emotional theories, and homeostatic drives.',
};

// ─── EXPLORATION STEPS ───
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Central Tendency & Dispersion',
    instruction: 'Adjust the outlier score slider and observe how the Mean gets skewed while the Median remains rock-steady.',
    interactionType: 'slider-stats',
    nodeId: NODE_C11_PSY_012,
  },
  {
    title: 'Lab 2: Gestalt Organization & Figure-Ground',
    instruction: 'Toggle Gestalt principles to visualize how the brain groups individual visual elements into holistic forms.',
    interactionType: 'toggle-gestalt',
    nodeId: NODE_C11_PSY_014,
  },
  {
    title: 'Lab 3: The Illusion Workshop',
    instruction: 'Manipulate perspective lines in the Ponzo and fin angles in the Muller-Lyer illusion to experience brain heuristics.',
    interactionType: 'slider-illusion',
    nodeId: NODE_C11_PSY_017,
  },
  {
    title: 'Lab 4: Cone Fatigue & Negative After-Images',
    instruction: 'Fixate your gaze on the colored stimulus circle for 10 seconds, then toggle to the white projection screen.',
    interactionType: 'timer-afterimage',
    nodeId: NODE_C11_PSY_016,
  },
  {
    title: 'Lab 5: Brain Emotion Pathways & Homeostasis',
    instruction: 'Trigger an emotional stimulus (e.g. Cobra) and compare the neural sequences of James-Lange vs Cannon-Bard vs Schachter-Singer.',
    interactionType: 'click-emotion-circuit',
    nodeId: NODE_C11_PSY_019,
  },
];

// ─── PREDICTION QUESTIONS ───
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you add an extreme outlier of 100 to the data set {10, 11, 12, 13, 14}, what happens to Mean vs Median?',
    options: [
      'Both Mean and Median jump by over 15 points',
      'The Mean jumps dramatically to 26.6, while the Median moves only to 12.5',
      'The Median jumps, but the Mean stays close to 12',
      'Neither changes because sample size increased',
    ],
    correctIndex: 1,
    verifyInstruction: 'Check the stats simulator below by dragging the outlier slider to +100 to verify your prediction!',
    nodeId: NODE_C11_PSY_012,
  },
  {
    question: 'Predict: If you stare at high-saturation RED sindoor for 30 seconds and look at a white canvas, what color appears?',
    options: [
      'Pure Yellow',
      'Deep Saturated Red',
      'Cyan / Greenish-Blue',
      'Dark Black',
    ],
    correctIndex: 2,
    verifyInstruction: 'Use the after-image simulator in Lab 4: select Red, charge retinal cones for 5 seconds, and reveal the after-image!',
    nodeId: NODE_C11_PSY_016,
  },
];

// ─── OBSERVATION QUESTIONS ───
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the Standard Deviation as scores spread further away from the Mean?',
    observableOptions: [
      'Standard Deviation shrinks towards zero',
      'Standard Deviation increases because squared distances from the mean grow',
      'Standard Deviation remains constant regardless of dispersion',
      'Standard Deviation becomes negative',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PSY_012,
  },
  {
    question: 'In the Schachter-Singer model, what happens when physiological arousal is high but no cognitive explanation exists?',
    observableOptions: [
      'No emotion is experienced at all',
      'The person looks to surrounding situational cues (e.g., happy or angry actor) to label their state',
      'The person automatically faints',
      'The hypothalamus shuts down the limbic system',
    ],
    correctIndex: 1,
    nodeId: NODE_C11_PSY_019,
  },
];

// ─── 22 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  // FOUNDATION (7)
  {
    id: 'ch_01',
    nodeId: NODE_C11_PSY_011,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'A NIMHANS research team reports: "The mean prevalence rate of anxiety in Karnataka is 11.2% with SD = 2.4%." Which branch of statistics is this?',
    options: ['Descriptive Statistics', 'Inferential Statistics', 'Non-parametric Hypothesis Testing', 'Psychometric Item Analysis'],
    correctIndex: 0,
    explanation: 'Descriptive statistics summarizes and describes data collected from a sample using measures like Mean, Median, and Standard Deviation.',
    hints: [
      'Is the study concluding a probability about a broader unseen universe or summarizing collected numbers?',
      'Summaries of center and spread belong to descriptive statistics.',
      'Descriptive = describing the dataset at hand.',
    ],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_02',
    nodeId: NODE_C11_PSY_012,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'Calculate the Range for the following Class 11 psychology test scores: 24, 31, 18, 49, 42, 12, 35.',
    correctAnswer: 37,
    tolerance: 0,
    unit: 'points',
    explanation: 'Range = Highest Score (49) - Lowest Score (12) = 37.',
    hints: [
      'Find the highest value and the lowest value in the list.',
      'Highest is 49; lowest is 12.',
      '49 - 12 = 37.',
    ],
  },
  {
    id: 'ch_03',
    nodeId: NODE_C11_PSY_013,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A hungry commuter waiting at Mumbai CST railway station immediately notices the aroma of samosas over train departure boards. Which determinant of attention is dominant?',
    options: ['Outer Determinant: Stimulus Intensity', 'Inner Determinant: Biological Need', 'Outer Determinant: Visual Contrast', 'Inner Determinant: Unconscious Instinct'],
    correctIndex: 1,
    explanation: 'Biological needs (hunger, thirst) are internal subjective states that selectively direct attention towards drive-reducing stimuli.',
    hints: [
      'Is the hunger inside the person or in the samosa billboard?',
      'Internal bodily states are inner determinants.',
      'Need, interest, and emotion are the 3 inner determinants in the ISC syllabus.',
    ],
  },
  {
    id: 'ch_04',
    nodeId: NODE_C11_PSY_014,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match the Gestalt Laws of Perceptual Grouping to their descriptions.',
    dragItems: [
      { label: 'Proximity', targetId: 'desc_prox' },
      { label: 'Similarity', targetId: 'desc_sim' },
      { label: 'Closure', targetId: 'desc_clos' },
      { label: 'Continuity', targetId: 'desc_cont' },
    ],
    correctMapping: {
      desc_prox: 'Proximity',
      desc_sim: 'Similarity',
      desc_clos: 'Closure',
      desc_cont: 'Continuity',
    },
    explanation: 'Proximity groups nearby items; Similarity groups alike items; Closure fills perceptual gaps; Continuity follows smooth continuous pathways.',
    hints: [
      'Nearness relates to proximity.',
      'Alikeness in shape or color relates to similarity.',
      'Completing a broken boundary is closure.',
    ],
  },
  {
    id: 'ch_05',
    nodeId: NODE_C11_PSY_015,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why does a circular steel thali at a wedding feast appear circular to you even when tilted and casting an elliptical shadow on your retina?',
    options: ['Linear Perspective', 'Shape Constancy', 'Aerial Perspective', 'Figure-Ground Reversal'],
    correctIndex: 1,
    explanation: 'Shape constancy is the tendency to perceive an object as retaining its true shape despite changes in the retinal image orientation.',
    hints: [
      'The retinal image changes shape, but your perception remains constant.',
      'This is one of the four perceptual constancies (size, shape, colour, brightness).',
      'Perceiving a circle despite an elliptical projection is Shape Constancy.',
    ],
  },
  {
    id: 'ch_06',
    nodeId: NODE_C11_PSY_016,
    type: 'distinguish',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which physical property of electromagnetic radiation directly determines our psychological experience of HUE?',
    options: ['Wave Amplitude', 'Wavelength', 'Purity of Spectrum', 'Luminance Flux'],
    correctIndex: 1,
    explanation: 'Wavelength (380 nm to 760 nm) determines Hue (color name). Amplitude determines Brightness; Purity determines Saturation.',
    hints: [
      'Think of the electromagnetic spectrum in nanometres.',
      'Short waves = violet; long waves = red.',
      'Wavelength maps directly to Hue.',
    ],
  },
  {
    id: 'ch_07',
    nodeId: NODE_C11_PSY_018,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following is listed as one of the 5 Primary Emotions in the ISC Class 11 Psychology syllabus?',
    options: ['Jealousy', 'Affection', 'Pride', 'Embarrassment'],
    correctIndex: 1,
    explanation: 'The five primary emotions specified by the ISC syllabus are: Fear, Anger, Joy, Sorrow, and Affection.',
    hints: [
      'Primary emotions are innate, basic, and present from early infancy.',
      'Complex social emotions like pride or jealousy are secondary.',
      'The 5 primary emotions are: Fear, Anger, Joy, Sorrow, and Affection.',
    ],
  },

  // STANDARD (8)
  {
    id: 'ch_08',
    nodeId: NODE_C11_PSY_011,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A psychologist at AIIMS Delhi tests a new mindfulness protocol on 60 stress patients against a control group, finding p = 0.02. What does this statistical significance mean?',
    options: [
      'The therapy reduces 98% of all anxiety symptoms permanently.',
      'There is only a 2% probability that the observed group difference occurred by random chance.',
      'The sample size was too small to make any valid claim.',
      'The mindfulness protocol is proven 100% effective for all Indians.',
    ],
    correctIndex: 1,
    explanation: 'A p-value of 0.02 indicates p < 0.05, meaning there is less than a 2% likelihood that the observed difference arose due to chance fluctuations alone.',
    hints: [
      'Look at probability (p) in inferential testing.',
      'p represents the probability of the null hypothesis (random chance).',
      'p = 0.02 = 2% chance probability.',
    ],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_09',
    nodeId: NODE_C11_PSY_012,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'Find the Median for this reaction-time dataset (in milliseconds): 210, 195, 340, 220, 205, 230.',
    correctAnswer: 215,
    tolerance: 0,
    unit: 'ms',
    explanation: 'Arranged in order: 195, 205, 210, 220, 230, 340. With n=6 (even), Median is the average of 3rd and 4th terms: (210 + 220) / 2 = 215.',
    hints: [
      'First sort the numbers in ascending order.',
      'Sorted: 195, 205, 210, 220, 230, 340.',
      'Take the average of the two middle values: (210 + 220) / 2.',
    ],
  },
  {
    id: 'ch_10',
    nodeId: NODE_C11_PSY_013,
    type: 'match',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'An advertising firm in Bengaluru creates a billboard with a giant neon-saffron moving arrow against a dark grey background. Which outer determinants are exploited?',
    options: [
      'Need, Interest, and Memory',
      'Size, Colour, Movement, and Contrast',
      'Closure, Simplicity, and Convergence',
      'Instinct, Drive, and Homeostasis',
    ],
    correctIndex: 1,
    explanation: 'The giant scale (Size), bright hue (Colour), animation (Movement), and dark backdrop (Contrast) are all classical outer (stimulus-based) determinants.',
    hints: [
      'Look at the physical attributes of the advertisement.',
      'Are they internal mental drives or external stimulus properties?',
      'Giant (Size), Neon-saffron (Colour), Moving (Movement), Dark background (Contrast).',
    ],
  },
  {
    id: 'ch_11',
    nodeId: NODE_C11_PSY_015,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'When looking at railway tracks near Howrah station, two parallel iron tracks appear to converge toward a single vanishing point on the horizon. Which monocular depth cue is this?',
    options: ['Aerial Perspective', 'Linear Perspective', 'Interposition', 'Retinal Disparity'],
    correctIndex: 1,
    explanation: 'Linear perspective is the monocular pictorial cue where parallel lines appear to converge as distance increases.',
    hints: [
      'Parallel lines meeting in the distance is the textbook definition.',
      'Retinal disparity is binocular, not monocular.',
      'Converging lines = Linear Perspective.',
    ],
  },
  {
    id: 'ch_12',
    nodeId: NODE_C11_PSY_017,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why does the upper horizontal bar in the Ponzo Illusion appear longer than the lower bar of identical physical length?',
    options: [
      'The lower bar has defective pixel density.',
      'Converging lines provide depth cues making the upper bar seem farther; size constancy scales it up.',
      'The upper bar stimulates more rod photoreceptors in the peripheral retina.',
      'It is an optical hallucination caused by lack of visual attention.',
    ],
    correctIndex: 1,
    explanation: 'The Ponzo illusion exploits linear perspective: converging lines signal distance, so the brain applies size-distance constancy heuristics and magnifies the perceived length of the upper bar.',
    hints: [
      'Remember how linear perspective acts as a depth cue.',
      'If the brain thinks something is farther away but projects the same retinal size, how does it judge true size?',
      'Size constancy scales up distant objects.',
    ],
  },
  {
    id: 'ch_13',
    nodeId: NODE_C11_PSY_018,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Order the biological event sequence during a sudden acute fear response according to the physiological basis of emotion.',
    sortItems: [
      'Sensory input (visual/auditory threat) reaches the Thalamus',
      'Thalamus sends dual signals to Cortex (appraisal) and Hypothalamus',
      'Hypothalamus activates the Sympathetic Nervous System & Adrenal Medulla',
      'Adrenaline surges: tachycardia, pupil dilation, and fight-or-flight preparation',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Sensory input enters Thalamus → relays to Cortex & Hypothalamus → Hypothalamus stimulates Sympathetic system → Adrenaline release triggers bodily arousal.',
    hints: [
      'Start with the sensory relay station (Thalamus).',
      'The Thalamus splits the message upward (cortex) and downward (hypothalamus).',
      'Hypothalamus triggers autonomic response, releasing adrenaline.',
    ],
  },
  {
    id: 'ch_14',
    nodeId: NODE_C11_PSY_019,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A trekker encounters a wild elephant in Wayanad. She begins trembling and her heart pounds. She realizes: "My heart is pounding, therefore I am terrified." Which theory of emotion does this reflect?',
    options: ['Cannon-Bard Theory', 'James-Lange Theory', 'Schachter-Singer Two-Factor Theory', 'Drive Reduction Theory'],
    correctIndex: 1,
    explanation: 'James-Lange theory posits that physiological bodily changes precede and directly cause the conscious experience of emotion ("we feel afraid because we tremble").',
    hints: [
      'Body changes happen FIRST, and the brain senses bodily feedback to create the feeling.',
      'William James famously said: "We do not run because we are afraid; we are afraid because we run."',
      'Physiological arousal = cause of emotion in James-Lange.',
    ],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_15',
    nodeId: NODE_C11_PSY_020,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'An artist in Santiniketan spends hours sculpting clay purely for the internal joy and creative satisfaction it brings, refusing commercial commissions. What form of motivation is this?',
    options: ['Extrinsic Motivation', 'Homeostatic Drive', 'Intrinsic Motivation', 'Instinctive Reflex'],
    correctIndex: 2,
    explanation: 'Intrinsic motivation is the drive to engage in an activity for its own inherent satisfaction and interest, rather than for external separable rewards.',
    hints: [
      'Does the reward come from outside (money/praise) or from the activity itself?',
      'Performing an activity for its own sake is the textbook definition.',
      'Internal joy without external reward = Intrinsic Motivation.',
    ],
  },

  // ADVANCED (7)
  {
    id: 'ch_16',
    nodeId: NODE_C11_PSY_012,
    type: 'construct',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Assemble the best statistical reporting strategy for a highly skewed mental health survey with severe income and symptom outliers.',
    availableParts: ['Report Median', 'Report Mean', 'Report Interquartile Range (IQR)', 'Report Standard Deviation alone', 'Graph Frequency Distribution'],
    targetState: 'Report Median Report Interquartile Range (IQR) Graph Frequency Distribution',
    validationHint: 'Select the 3 components that are robust against extreme outliers for skewed distributions.',
    explanation: 'For skewed distributions with outliers, the Median and Interquartile Range (IQR) provide robust non-distorted summary statistics, best paired with a Frequency Distribution graph.',
    hints: [
      'Do you want measures sensitive to outliers (Mean/SD) or resistant to them (Median/IQR)?',
      'Median represents the middle 50th percentile.',
      'IQR measures the spread of the middle 50% of scores.',
    ],
  },
  {
    id: 'ch_17',
    nodeId: NODE_C11_PSY_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In Rubin’s classic Vase-Face illusion, why is it neurologically impossible to perceive both the white vase and the two black profiles as the "figure" at the exact same instant?',
    options: [
      'The optical lens cannot focus on two colors simultaneously.',
      'The figure-ground relationship requires cortical attention to assign contour ownership to one region, casting the remainder as ground.',
      'Retinal cones become fatigued within 2 milliseconds.',
      'The lateral geniculate nucleus blocks auditory-visual binding.',
    ],
    correctIndex: 1,
    explanation: 'Figure-ground segregation is mutually exclusive at any single moment because visual contours can only be owned by the attended figure, while the background remains shapeless.',
    hints: [
      'Think about figure vs ground allocation in visual cortex.',
      'Can an edge be owned by both the object and background simultaneously?',
      'Contour ownership belongs strictly to the figure at any one moment.',
    ],
  },
  {
    id: 'ch_18',
    nodeId: NODE_C11_PSY_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Why are binocular cues (retinal disparity, convergence) virtually ineffective for judging the distance of the snow-capped peak of Kanchenjunga from Darjeeling?',
    options: [
      'Because the cold atmosphere distorts binocular light refraction.',
      'Because beyond ~6 meters, the angular difference between the lines of sight of both eyes approaches zero, rendering retinal disparity negligible.',
      'Because monocular cues completely deactivate binocular cells in V1.',
      'Because accommodation can only curve the lens outward up to 100 meters.',
    ],
    correctIndex: 1,
    explanation: 'The interpupillary distance (~6.5 cm) creates meaningful retinal disparity only within near space (under 6 meters). For distant landscapes, we rely strictly on monocular cues like aerial perspective.',
    hints: [
      'How far apart are human eyes? About 6-7 cm.',
      'At several kilometres distance, is the angle between the two eyes noticeably different?',
      'Disparity approaches zero for distant objects.',
    ],
  },
  {
    id: 'ch_19',
    nodeId: NODE_C11_PSY_016,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Under the Opponent-Process Theory of colour vision, what neural mechanism explains the emergence of a cyan/greenish negative after-image after staring at a pure red stimulus?',
    options: [
      'Rods in the fovea convert rhodopsin into iodopsin.',
      'Prolonged stimulation fatigues red-responsive ganglion/cortical channels, so when viewing white light, the disinhibited green opponent channel fires higher.',
      'The lens contracts to filter out short wavelengths.',
      'The primary visual cortex deactivates all parvocellular layers.',
    ],
    correctIndex: 1,
    explanation: 'Opponent-process channels (Red-Green, Blue-Yellow, Black-White) adapt. Fatiguing the Red excitor leaves the baseline opponent Green pathway uninhibited when neutral white light is viewed.',
    hints: [
      'Think of paired opponent channels: Red vs Green.',
      'If the Red side gets exhausted, what happens when balanced white light arrives?',
      'The un-fatigued Green opponent mechanism fires stronger.',
    ],
    misconceptionIndex: 3,
  },
  {
    id: 'ch_20',
    nodeId: NODE_C11_PSY_019,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In the classic Schachter-Singer experiment, participants injected with epinephrine who were NOT informed of its true side-effects felt euphoria when placed with a happy confederate, but anger with an angry confederate. What does this demonstrate?',
    options: [
      'Physiological arousal is identical to subjective feeling.',
      'Bodily arousal is generalized and undifferentiated; cognitive appraisal of environmental context determines the specific emotional label.',
      'The Cannon-Bard simultaneous model is universally correct.',
      'Adrenaline only causes happy emotions regardless of environment.',
    ],
    correctIndex: 1,
    explanation: 'The Schachter-Singer two-factor theory demonstrates that emotion requires both physiological arousal AND a cognitive appraisal/label derived from situational cues.',
    hints: [
      'Did both groups have the exact same bodily adrenaline arousal? Yes.',
      'Why did they report completely opposite feelings (joy vs rage)?',
      'The cognitive label from the situation gave meaning to the arousal.',
    ],
  },
  {
    id: 'ch_21',
    nodeId: NODE_C11_PSY_020,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'How do biological needs (e.g., thirst) operate through homeostatic negative feedback loops in the hypothalamus?',
    options: [
      'The cortex overrides the pituitary to release unlearned instincts.',
      'Osmoreceptors detect increased blood tonicity, lateral hypothalamus triggers thirst drive, water intake restores osmolarity, and satiety signals terminate the drive.',
      'Ventromedial hypothalamus triggers sweating whenever blood sugar drops.',
      'Instincts permanently elevate set points during dehydration.',
    ],
    correctIndex: 1,
    explanation: 'Homeostasis acts as an internal thermostat: receptor detects deviation from set point → motive is activated to seek water → consumption restores equilibrium → hypothalamic signal ceases.',
    hints: [
      'Negative feedback brings a system back to its baseline set point.',
      'Osmoreceptors in the hypothalamus monitor blood hydration.',
      'Restoring balance switches off the motive.',
    ],
  },
  {
    id: 'ch_22',
    nodeId: NODE_C11_PSY_017,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Cross-cultural research in psychology revealed that people living in rural circular-hut villages (e.g. parts of Africa and rural India) are significantly LESS susceptible to the Muller-Lyer illusion than urban city dwellers. What hypothesis explains this?',
    options: [
      'Retinal Cone Distribution Hypothesis',
      'Carpentered-World Hypothesis (experience with right-angled rectangular rooms shapes depth heuristics)',
      'Genetic Chromosomal Hypothesis',
      'Trichromatic Variation Principle',
    ],
    correctIndex: 1,
    explanation: 'The Carpentered-World Hypothesis shows that urban humans learn to interpret acute/obtuse angles as interior/exterior corners of buildings, which primes the Muller-Lyer distortion.',
    hints: [
      'Think about rectangular buildings with corners vs circular round huts.',
      'Our visual experiences with modern architecture teach our brains specific corner heuristics.',
      'The Carpentered-World Hypothesis.',
    ],
  },
];

// ─── REAL-WORLD ACTIVITY ───
const REAL_WORLD_ACTIVITY = {
  title: 'Field Investigation: The College Canteen Attention & Data Audit',
  description: 'Apply psychometric descriptive statistics, attentional determinants, and motivational analysis in your school or college environment.',
  steps: [
    'Observe the school canteen: Note 3 outer determinants (bright hoardings, hot food smell) and 2 inner determinants (hunger, peer preference) that draw students.',
    'Collect reaction times or test scores of 10 classmates. Calculate the Mean, Median, and Range.',
    'Test 5 friends with the Muller-Lyer drawing on paper and record the discrepancy in millimeters.',
    'Analyze an emotion scenario (e.g., stage fright before assembly) and map the James-Lange vs Schachter-Singer interpretation.',
  ],
};

const REVIEW_INTERVAL_DAYS = [1, 3, 7, 14, 30, 90];

// ─── MAIN COMPONENT ───
function C11_PsychologyStatisticsPsychologyDescriptiveSim({
  nodeId = DEFAULT_PROPS.nodeId,
  title = DEFAULT_PROPS.title,
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['psychology'] || { name: 'Psychology', emoji: '🧠', color: 'purple' };

  // Phase flow: discovery → explore → sandbox → challenge → complete
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentChallenge, setCurrentChallenge] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Discovery State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);

  // Brilliant Exploration & Predict-Check State
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Interactive Exploration Controls State
  // Lab 1: Stats
  const [outlierValue, setOutlierValue] = useState(15);
  const [baseScores, setBaseScores] = useState<number[]>([12, 14, 15, 15, 16, 17, 18]);
  // Lab 2: Gestalt
  const [activeGestalt, setActiveGestalt] = useState<'proximity' | 'similarity' | 'closure' | 'figureGround'>('proximity');
  // Lab 3: Illusions
  const [finAngle, setFinAngle] = useState(45); // Muller Lyer fin angle
  const [ponzoTrackAngle, setPonzoTrackAngle] = useState(30);
  // Lab 4: After image
  const [afterImageColor, setAfterImageColor] = useState<'red' | 'green' | 'blue' | 'yellow'>('red');
  const [stareTimer, setStareTimer] = useState(0);
  const [isStaring, setIsStaring] = useState(false);
  const [showAfterImageScreen, setShowAfterImageScreen] = useState(false);
  // Lab 5: Emotion Brain
  const [selectedEmotionTheory, setSelectedEmotionTheory] = useState<'jamesLange' | 'cannonBard' | 'schachterSinger'>('jamesLange');
  const [activeBrainStructure, setActiveBrainStructure] = useState<string | null>(null);
  const [hydrationLevel, setHydrationLevel] = useState(60);

  // Challenge and Adaptation State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);

  // Escalating hints and visual feedback state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Drag-and-drop & Interactive Challenge state
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Feedback components state
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // ─── STATISTICAL CALCULATIONS (LAB 1) ───
  const currentDataset = useMemo(() => {
    const list = [...baseScores, outlierValue].sort((a, b) => a - b);
    return list;
  }, [baseScores, outlierValue]);

  const computedStats = useMemo(() => {
    const n = currentDataset.length;
    const sum = currentDataset.reduce((acc, val) => acc + val, 0);
    const mean = Number((sum / n).toFixed(1));
    const median = n % 2 === 1
      ? currentDataset[Math.floor(n / 2)]
      : Number(((currentDataset[n / 2 - 1] + currentDataset[n / 2]) / 2).toFixed(1));
    
    // Mode
    const freq: Record<number, number> = {};
    currentDataset.forEach(x => { freq[x] = (freq[x] || 0) + 1; });
    let maxFreq = 0;
    let modeVal = currentDataset[0];
    Object.entries(freq).forEach(([val, count]) => {
      if (count > maxFreq) {
        maxFreq = count;
        modeVal = Number(val);
      }
    });

    const variance = currentDataset.reduce((acc, v) => acc + Math.pow(v - mean, 2), 0) / n;
    const sd = Number(Math.sqrt(variance).toFixed(1));
    const range = currentDataset[n - 1] - currentDataset[0];

    return { mean, median, mode: modeVal, sd, range };
  }, [currentDataset]);

  // ─── FILTER CHALLENGES BY DIFFICULTY ───
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const challenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // ─── INITIAL MASTERY LOAD ───
  useEffect(() => {
    if (nodeId) {
      const existing = getNodeMastery(nodeId);
      if (existing && existing.bestScore > 0) {
        if (existing.bestScore >= 80) setDifficulty('advanced');
        else if (existing.bestScore >= 50) setDifficulty('standard');
        else setDifficulty('foundation');
      }
    }
  }, [nodeId]);

  // ─── BKT ADAPTATION EFFECT ───
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDiff = (mastery === 'not-started' || mastery === 'beginner') ? 'foundation'
      : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDiff) {
        setCurrentChallenge(0);
        return newDiff;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // ─── STARE TIMER FOR AFTER-IMAGE LAB ───
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (isStaring && stareTimer < 10) {
      interval = setInterval(() => {
        setStareTimer(t => {
          if (t + 1 >= 10) {
            setIsStaring(false);
            setShowAfterImageScreen(true);
            audioManager.play('chime');
            speechManager.speak('Retinal cones adapted! Look at the white canvas to see your negative after-image.');
            return 10;
          }
          return t + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isStaring, stareTimer]);

  // ─── 2D CANVAS ANIMATION (ATTENTION & BRAIN PULSE SIMULATOR) ───
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animationId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw neural pulse graph
      ctx.strokeStyle = '#8b5cf6';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      for (let x = 0; x < canvas.width; x += 3) {
        const y = 30 + Math.sin(x * 0.05 + t) * 12 * Math.cos(t * 0.5) + (x % 50 === 0 ? (Math.random() - 0.5) * 15 : 0);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      // Draw glowing beacon
      const beaconX = (t * 40) % canvas.width;
      ctx.fillStyle = '#ec4899';
      ctx.beginPath();
      ctx.arc(beaconX, 30 + Math.sin(beaconX * 0.05 + t) * 12, 5, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [phase]);

  // ─── CALLBACK HANDLERS ───
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && challenge.hints && challenge.hints[nextLevel - 1]) {
      setCurrentHint(challenge.hints[nextLevel - 1]);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(challenge.hints[nextLevel - 1]);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
      audioManager.play('pop');
    }
  }, [hintCount, challenge]);

  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const correct = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(correct);
    setDiscoveryAnswered(true);
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Spot on! The median ignores outliers.' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the interactive labs. Experiment with statistical and cognitive phenomena!');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Freely explore the parameters without grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge mode activated. Solve the clinical cases!');
  }, []);

  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction recorded! Manipulate the simulator to verify.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const correct = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(correct ? 'success' : 'pop');
    speechManager.speak(correct ? 'Accurate observation!' : 'Look closely at the spread on the graph.');
  }, []);

  const handleOutlierSliderChange = useCallback((val: number) => {
    setOutlierValue(val);
    audioManager.play('count');
  }, []);

  const handleGestaltTab = useCallback((type: 'proximity' | 'similarity' | 'closure' | 'figureGround') => {
    setActiveGestalt(type);
    audioManager.play('tap');
  }, []);

  const handleStartStare = useCallback(() => {
    setStareTimer(0);
    setShowAfterImageScreen(false);
    setIsStaring(true);
    audioManager.play('pop');
    speechManager.speak('Keep your eyes fixed on the center dot!');
  }, []);

  const handleResetStare = useCallback(() => {
    setIsStaring(false);
    setStareTimer(0);
    setShowAfterImageScreen(false);
    audioManager.play('tap');
  }, []);

  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak(`Congratulations! You completed the psychology simulation with a score of ${finalScore}%`);
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
      setCurrentChallenge(c => c + 1);
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

  const handleAnswer = useCallback((ans: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') {
      isCorrect = ans === challenge.correctIndex;
    } else if (challenge.type === 'drag-label') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctMapping);
    } else if (challenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(ans) === JSON.stringify(challenge.correctOrder);
    } else if (challenge.type === 'numeric') {
      const numAns = typeof ans === 'string' ? parseFloat(ans) : (ans as number);
      isCorrect = Math.abs(numAns - (challenge.correctAnswer || 0)) <= (challenge.tolerance || 0);
    } else if (challenge.type === 'construct') {
      isCorrect = ans === challenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('drop-correct');
      audioManager.play('success');
      speechManager.speak('Correct! Excellent psychological analysis.');
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
        speechManager.speak('Let us study the complete clinical explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);

        const srsItem = createReviewItem(challenge.nodeId, challenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${challenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [challenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  const handleDragStart = useCallback((lbl: string) => {
    setDraggedItem(lbl);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isRight = challenge.correctMapping?.[targetId] === draggedItem;
    if (isRight) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, challenge]);

  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      let arr = prev.length === challenge.sortItems?.length ? [...prev] : challenge.sortItems?.map((_, i) => i) || [];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [challenge]);

  const handleSortSubmit = useCallback(() => {
    const answer = sortArrangement.length > 0 ? sortArrangement : challenge.sortItems?.map((_, i) => i) || [];
    handleAnswer(answer);
  }, [sortArrangement, challenge, handleAnswer]);

  const handleAddPartToConstruct = useCallback((part: string) => {
    audioManager.play('tap');
    setConstructParts(prev => [...prev, part]);
  }, []);

  const handleRemovePartFromConstruct = useCallback((idx: number) => {
    audioManager.play('pop');
    setConstructParts(prev => prev.filter((_, i) => i !== idx));
  }, []);

  const handleBrainClick = useCallback((structure: string) => {
    setActiveBrainStructure(structure);
    audioManager.play('tap');
    const descriptions: Record<string, string> = {
      Thalamus: 'Thalamus: Primary sensory relay station. Splits sensory input to cortex and hypothalamus.',
      Hypothalamus: 'Hypothalamus: Master controller of the Autonomic Nervous System, pituitary hormones & homeostasis.',
      Amygdala: 'Amygdala: Evaluates threat and fear conditioning along rapid subcortical routes.',
      PrefrontalCortex: 'Prefrontal Cortex: High-level cognitive appraisal, emotion regulation, and voluntary suppression.',
    };
    speechManager.speak(descriptions[structure] || '');
  }, []);

  // Cleanup timers
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 sm:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      
      {/* ─── HEADER ─── */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-purple-950/70 border border-purple-700/50 rounded-2xl shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <span className="text-xs font-semibold tracking-wider text-purple-400 uppercase">
              ISC Class 11 Psychology Simulation
            </span>
            <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight">{title}</h1>
          </div>
        </div>

        {/* Phase Pill Navigation */}
        <div className="flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
          {(['discovery', 'explore', 'sandbox', 'challenge'] as const).map((p) => (
            <motion.button
              key={p}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (p === 'discovery') setPhase('discovery');
                if (p === 'explore') setPhase('explore');
                if (p === 'sandbox') setPhase('sandbox');
                if (p === 'challenge') setPhase('challenge');
                audioManager.play('tap');
              }}
              className={`px-3 py-1 text-xs font-bold rounded-xl transition-all ${
                phase === p 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
              aria-label={`Switch to ${p} phase`}
            >
              {p.toUpperCase()}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* ─── 1. DISCOVERY PHASE ─── */}
      {phase === 'discovery' && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }} 
          animate={{ opacity: 1, scale: 1 }}
          className="space-y-6"
        >
          {/* Narrative Scenario Box */}
          <div className="p-6 bg-gradient-to-br from-gold-950/80 via-slate-900 to-purple-950/60 rounded-2xl border border-gold-700/40 shadow-xl">
            <div className="flex items-center gap-2 text-gold-400 text-sm font-bold uppercase tracking-wider mb-2">
              <span>🏛️</span> {SCENARIO.title}
            </div>
            <p className="text-slate-200 text-base leading-relaxed mb-3">{SCENARIO.intro}</p>
            <p className="text-xs text-gold-300 bg-gold-950/50 p-2.5 rounded-lg border border-gold-800/40">
              💡 <span className="font-semibold">Lab Mission:</span> {SCENARIO.context}
            </p>
          </div>

          {/* Interactive Discovery Hook */}
          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800">
            <span className="text-xs font-bold px-2.5 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30">
              Discovery Hook • Predict the Reality
            </span>
            <h3 className="text-lg font-bold text-white mt-3 mb-4">{DISCOVERY_QUESTION.question}</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  className={`text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200'
                      : discoveryAnswered && i !== DISCOVERY_QUESTION.correctIndex
                      ? 'bg-slate-800/40 border-slate-700/30 text-slate-500'
                      : 'bg-slate-800/80 hover:bg-slate-750 border-slate-700 text-slate-200'
                  }`}
                  aria-label={`Discovery option ${i + 1}`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5 p-4 rounded-xl bg-slate-950 border border-slate-800">
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400 font-semibold' : 'text-amber-300'}`}>
                  {discoveryCorrect ? '✓ Spot on! The median ignores outliers.' : `ℹ️ ${DISCOVERY_QUESTION.hintAfter}`}
                </p>
                <div className="mt-4 flex justify-end">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleAdvanceToExploration}
                    className="px-6 py-2.5 bg-gradient-to-r from-purple-600 to-gold-600 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 flex items-center gap-2"
                  >
                    <span>Enter Interactive Research Labs</span>
                    <span>→</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORATION PHASE (BRILLIANT.ORG STYLE) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          
          {/* Step Selector Header */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800 overflow-x-auto gap-2">
            {EXPLORATION_STEPS.map((step, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setCurrentSlide(idx);
                  audioManager.play('tap');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  currentSlide === idx 
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/40'
                    : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                {idx + 1}. {step.title.split(':')[1] || step.title}
              </motion.button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 shadow-xl"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h3 className="text-lg font-bold text-purple-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <span className="text-xs px-2.5 py-1 bg-purple-950 text-purple-300 border border-purple-800 rounded-full">
                  Interactive Lab
                </span>
              </div>
              <p className="text-amber-400 text-sm font-medium mb-4 flex items-center gap-1.5">
                <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
              </p>

              {/* ─── SLIDE 0: STATS LAB (Mean vs Median vs SD) ─── */}
              {currentSlide === 0 && (
                <div className="space-y-4">
                  {/* Predict Check First */}
                  {!predictionMade && (
                    <div className="p-4 bg-gold-950/40 rounded-xl border border-gold-800/40 mb-4">
                      <p className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-2">Predict Before You Measure</p>
                      <p className="text-sm text-slate-200 font-semibold mb-3">{PREDICTION_QUESTIONS[0].question}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {PREDICTION_QUESTIONS[0].options.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handlePrediction(i)}
                            className="text-left p-2.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-200 border border-slate-700"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Interactive Visual Distribution */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="text-xs text-slate-400 font-mono">
                        Dataset: [{currentDataset.join(', ')}] (n={currentDataset.length})
                      </div>
                      <div className="text-xs text-purple-400 font-bold">
                        Outlier Slider: <span className="text-amber-300 text-sm">{outlierValue}</span>
                      </div>
                    </div>

                    {/* Outlier Range Slider */}
                    <input
                      type="range"
                      min={10}
                      max={120}
                      value={outlierValue}
                      onChange={(e) => handleOutlierSliderChange(Number(e.target.value))}
                      className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer mb-5"
                      aria-label="Manipulate outlier value slider"
                    />

                    {/* Real-time Visual SVG Distribution Graph */}
                    <svg viewBox="0 0 500 160" className="w-full h-40 bg-slate-900/80 rounded-xl p-2">
                      {/* Grid axis */}
                      <line x1="30" y1="130" x2="480" y2="130" stroke="#475569" strokeWidth="2" />
                      {[20, 40, 60, 80, 100, 120].map((tick) => {
                        const x = 30 + (tick / 120) * 440;
                        return (
                          <g key={tick}>
                            <line x1={x} y1="130" x2={x} y2="135" stroke="#64748b" />
                            <text x={x} y="148" fill="#94a3b8" fontSize="10" textAnchor="middle">{tick}</text>
                          </g>
                        );
                      })}

                      {/* Dots on axis */}
                      {currentDataset.map((val, i) => {
                        const x = 30 + (val / 120) * 440;
                        const isOutlier = i === currentDataset.length - 1;
                        return (
                          <circle
                            key={i}
                            cx={x}
                            cy="115"
                            r={isOutlier ? 7 : 5}
                            fill={isOutlier ? '#f59e0b' : '#38bdf8'}
                            opacity={0.85}
                          />
                        );
                      })}

                      {/* Mean marker */}
                      <g>
                        <line
                          x1={30 + (computedStats.mean / 120) * 440}
                          y1="30"
                          x2={30 + (computedStats.mean / 120) * 440}
                          y2="130"
                          stroke="#ef4444"
                          strokeWidth="2.5"
                          strokeDasharray="4 2"
                        />
                        <text
                          x={30 + (computedStats.mean / 120) * 440}
                          y="25"
                          fill="#ef4444"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          Mean: {computedStats.mean}
                        </text>
                      </g>

                      {/* Median marker */}
                      <g>
                        <line
                          x1={30 + (computedStats.median / 120) * 440}
                          y1="50"
                          x2={30 + (computedStats.median / 120) * 440}
                          y2="130"
                          stroke="#10b981"
                          strokeWidth="2.5"
                        />
                        <text
                          x={30 + (computedStats.median / 120) * 440}
                          y="45"
                          fill="#10b981"
                          fontSize="11"
                          fontWeight="bold"
                          textAnchor="middle"
                        >
                          Median: {computedStats.median}
                        </text>
                      </g>
                    </svg>

                    {/* Statistical Metric Cards */}
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4">
                      <div className="p-2.5 bg-rose-950/40 border border-rose-800/40 rounded-xl text-center">
                        <span className="text-[10px] text-rose-300 font-bold uppercase">Mean (Arithmetic)</span>
                        <p className="text-base font-black text-rose-400">{computedStats.mean}</p>
                        <span className="text-[9px] text-slate-400">PULLED BY OUTLIERS</span>
                      </div>
                      <div className="p-2.5 bg-emerald-950/40 border border-emerald-800/40 rounded-xl text-center">
                        <span className="text-[10px] text-emerald-300 font-bold uppercase">Median (Positional)</span>
                        <p className="text-base font-black text-emerald-400">{computedStats.median}</p>
                        <span className="text-[9px] text-slate-400">ROBUST RESISTANCE</span>
                      </div>
                      <div className="p-2.5 bg-gold-950/40 border border-gold-800/40 rounded-xl text-center">
                        <span className="text-[10px] text-gold-300 font-bold uppercase">Mode (Frequency)</span>
                        <p className="text-base font-black text-gold-400">{computedStats.mode}</p>
                        <span className="text-[9px] text-slate-400">NOMINAL APPLICABLE</span>
                      </div>
                      <div className="p-2.5 bg-purple-950/40 border border-purple-800/40 rounded-xl text-center">
                        <span className="text-[10px] text-purple-300 font-bold uppercase">Std Deviation (SD)</span>
                        <p className="text-base font-black text-purple-400">{computedStats.sd}</p>
                        <span className="text-[9px] text-slate-400">ROOT VARIANCE</span>
                      </div>
                      <div className="p-2.5 bg-amber-950/40 border border-amber-800/40 rounded-xl text-center">
                        <span className="text-[10px] text-amber-300 font-bold uppercase">Range</span>
                        <p className="text-base font-black text-amber-400">{computedStats.range}</p>
                        <span className="text-[9px] text-slate-400">MAX - MIN</span>
                      </div>
                    </div>
                  </div>

                  {/* Observation Question */}
                  {outlierValue > 50 && !observationAnswered && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2">Observation Check</p>
                      <p className="text-sm text-slate-200 mb-3">{OBSERVATION_QUESTIONS[0].question}</p>
                      <div className="space-y-2">
                        {OBSERVATION_QUESTIONS[0].observableOptions.map((opt, i) => (
                          <motion.button
                            key={i}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleObservation(i)}
                            className="w-full text-left p-2.5 text-xs rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-750"
                          >
                            {opt}
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              )}

              {/* ─── SLIDE 1: GESTALT ORGANIZATION LAB ─── */}
              {currentSlide === 1 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['proximity', 'similarity', 'closure', 'figureGround'] as const).map((g) => (
                      <motion.button
                        key={g}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleGestaltTab(g)}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl capitalize transition-all ${
                          activeGestalt === g
                            ? 'bg-gold-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400 hover:text-white'
                        }`}
                      >
                        Law of {g}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-6 bg-slate-950 rounded-xl border border-slate-800 min-h-[220px] flex flex-col items-center justify-center">
                    {activeGestalt === 'proximity' && (
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-3">Notice how your brain automatically sees 3 vertical columns of pairs, not 6 isolated lines.</p>
                        <svg viewBox="0 0 300 100" className="w-64 h-28">
                          <rect x="30" y="10" width="8" height="80" fill="#a855f7" rx="4" />
                          <rect x="50" y="10" width="8" height="80" fill="#a855f7" rx="4" />

                          <rect x="120" y="10" width="8" height="80" fill="#a855f7" rx="4" />
                          <rect x="140" y="10" width="8" height="80" fill="#a855f7" rx="4" />

                          <rect x="210" y="10" width="8" height="80" fill="#a855f7" rx="4" />
                          <rect x="230" y="10" width="8" height="80" fill="#a855f7" rx="4" />
                        </svg>
                      </div>
                    )}

                    {activeGestalt === 'similarity' && (
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-3">Visual elements sharing color/shape are bound together into distinct horizontal rows.</p>
                        <div className="grid grid-cols-6 gap-3">
                          {Array.from({ length: 18 }).map((_, i) => {
                            const isPurple = Math.floor(i / 6) % 2 === 0;
                            return (
                              <div
                                key={i}
                                className={`w-6 h-6 rounded-full flex items-center justify-center ${
                                  isPurple ? 'bg-purple-500' : 'bg-emerald-400'
                                }`}
                              />
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {activeGestalt === 'closure' && (
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-3">The brain supplies illusory contours to perceive an enclosed white triangle in the center.</p>
                        <svg viewBox="0 0 150 150" className="w-36 h-36">
                          {/* 3 Pacman circles forming Kanizsa triangle */}
                          <path d="M 30,30 L 30,60 A 30 30 0 1 0 60,30 Z" fill="#38bdf8" transform="rotate(30 30 30)" />
                          <path d="M 120,30 L 120,60 A 30 30 0 1 0 150,30 Z" fill="#38bdf8" transform="rotate(150 120 30)" />
                          <path d="M 75,120 L 75,150 A 30 30 0 1 0 105,120 Z" fill="#38bdf8" transform="rotate(270 75 120)" />
                          {/* Inverted dashed triangle showing completion */}
                          <polygon points="35,35 115,35 75,115" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 2" />
                        </svg>
                      </div>
                    )}

                    {activeGestalt === 'figureGround' && (
                      <div className="text-center">
                        <p className="text-xs text-slate-400 mb-3">Rubin's Vase: Look closely. Do you see the white vase (figure) or the two dark facing silhouettes?</p>
                        <svg viewBox="0 0 200 140" className="w-48 h-36 bg-slate-900 rounded-xl">
                          <rect width="200" height="140" fill="#0f172a" />
                          <path
                            d="M 60,10 Q 100,20 100,50 Q 100,70 80,75 Q 100,80 100,100 Q 100,130 60,135 L 140,135 Q 100,130 100,100 Q 100,80 120,75 Q 100,70 100,50 Q 100,20 140,10 Z"
                            fill="#f8fafc"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 2: ILLUSION STUDIO (Ponzo & Muller-Lyer) ─── */}
              {currentSlide === 2 && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Muller-Lyer Interactive Card */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-gold-300">Muller-Lyer Illusion</span>
                        <span className="text-xs text-slate-400">Fin angle: {finAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={85}
                        value={finAngle}
                        onChange={(e) => setFinAngle(Number(e.target.value))}
                        className="w-full accent-gold-500 mb-3"
                      />
                      <svg viewBox="0 0 240 130" className="w-full h-32 bg-slate-900 rounded-lg">
                        {/* Top Line: Inward arrowheads */}
                        <line x1="50" y1="35" x2="190" y2="35" stroke="#38bdf8" strokeWidth="3" />
                        <line x1="50" y1="35" x2={50 + Math.cos(finAngle * Math.PI / 180) * 20} y2={35 - Math.sin(finAngle * Math.PI / 180) * 20} stroke="#38bdf8" strokeWidth="3" />
                        <line x1="50" y1="35" x2={50 + Math.cos(finAngle * Math.PI / 180) * 20} y2={35 + Math.sin(finAngle * Math.PI / 180) * 20} stroke="#38bdf8" strokeWidth="3" />
                        <line x1="190" y1="35" x2={190 - Math.cos(finAngle * Math.PI / 180) * 20} y2={35 - Math.sin(finAngle * Math.PI / 180) * 20} stroke="#38bdf8" strokeWidth="3" />
                        <line x1="190" y1="35" x2={190 - Math.cos(finAngle * Math.PI / 180) * 20} y2={35 + Math.sin(finAngle * Math.PI / 180) * 20} stroke="#38bdf8" strokeWidth="3" />
                        <text x="120" y="20" fill="#94a3b8" fontSize="9" textAnchor="middle">Appears Shorter</text>

                        {/* Bottom Line: Outward feathers */}
                        <line x1="50" y1="95" x2="190" y2="95" stroke="#ec4899" strokeWidth="3" />
                        <line x1="50" y1="95" x2={50 - Math.cos(finAngle * Math.PI / 180) * 20} y2={95 - Math.sin(finAngle * Math.PI / 180) * 20} stroke="#ec4899" strokeWidth="3" />
                        <line x1="50" y1="95" x2={50 - Math.cos(finAngle * Math.PI / 180) * 20} y2={95 + Math.sin(finAngle * Math.PI / 180) * 20} stroke="#ec4899" strokeWidth="3" />
                        <line x1="190" y1="95" x2={190 + Math.cos(finAngle * Math.PI / 180) * 20} y2={95 - Math.sin(finAngle * Math.PI / 180) * 20} stroke="#ec4899" strokeWidth="3" />
                        <line x1="190" y1="95" x2={190 + Math.cos(finAngle * Math.PI / 180) * 20} y2={95 + Math.sin(finAngle * Math.PI / 180) * 20} stroke="#ec4899" strokeWidth="3" />
                        <text x="120" y="80" fill="#94a3b8" fontSize="9" textAnchor="middle">Appears Longer (Same 140px!)</text>
                      </svg>
                    </div>

                    {/* Ponzo Illusion Card */}
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs font-bold text-amber-300">Ponzo Illusion (Railway Tracks)</span>
                        <span className="text-xs text-slate-400">Track Angle: {ponzoTrackAngle}°</span>
                      </div>
                      <input
                        type="range"
                        min={15}
                        max={45}
                        value={ponzoTrackAngle}
                        onChange={(e) => setPonzoTrackAngle(Number(e.target.value))}
                        className="w-full accent-amber-500 mb-3"
                      />
                      <svg viewBox="0 0 240 130" className="w-full h-32 bg-slate-900 rounded-lg">
                        {/* Converging tracks */}
                        <line x1="20" y1="120" x2={120 - ponzoTrackAngle} y2="10" stroke="#64748b" strokeWidth="2.5" />
                        <line x1="220" y1="120" x2={120 + ponzoTrackAngle} y2="10" stroke="#64748b" strokeWidth="2.5" />
                        
                        {/* Upper bar */}
                        <line x1="90" y1="35" x2="150" y2="35" stroke="#f59e0b" strokeWidth="4" />
                        {/* Lower bar */}
                        <line x1="90" y1="100" x2="150" y2="100" stroke="#f59e0b" strokeWidth="4" />

                        <text x="120" y="25" fill="#f59e0b" fontSize="9" fontWeight="bold" textAnchor="middle">Top bar looks bigger</text>
                      </svg>
                    </div>
                  </div>
                </div>
              )}

              {/* ─── SLIDE 3: AFTER-IMAGE & COLOUR LAB ─── */}
              {currentSlide === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      {(['red', 'green', 'blue', 'yellow'] as const).map((col) => (
                        <motion.button
                          key={col}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setAfterImageColor(col);
                            handleResetStare();
                          }}
                          className={`px-3 py-1 text-xs font-bold rounded-lg capitalize border ${
                            afterImageColor === col
                              ? 'border-white shadow-md'
                              : 'border-transparent opacity-60'
                          }`}
                          style={{
                            backgroundColor: col === 'red' ? '#ef4444' : col === 'green' ? '#22c55e' : col === 'blue' ? '#3b82f6' : '#eab308',
                            color: col === 'yellow' ? '#000' : '#fff'
                          }}
                        >
                          {col}
                        </motion.button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleStartStare}
                        disabled={isStaring}
                        className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow"
                      >
                        {isStaring ? `Charging Cones (${stareTimer}s/10s)...` : 'Stare 10s'}
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleResetStare}
                        className="px-3 py-1.5 bg-slate-800 text-slate-300 text-xs font-bold rounded-xl"
                      >
                        Reset
                      </motion.button>
                    </div>
                  </div>

                  <div className="p-6 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                    {!showAfterImageScreen ? (
                      <div className="text-center">
                        <div
                          className="w-32 h-32 rounded-full mx-auto flex items-center justify-center shadow-2xl relative"
                          style={{
                            backgroundColor:
                              afterImageColor === 'red' ? '#ef4444' :
                              afterImageColor === 'green' ? '#22c55e' :
                              afterImageColor === 'blue' ? '#3b82f6' : '#eab308',
                          }}
                        >
                          <div className="w-3 h-3 bg-white rounded-full shadow" />
                        </div>
                        <p className="text-xs text-slate-400 mt-4">Fixate your gaze directly on the white center dot.</p>
                      </div>
                    ) : (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center w-full">
                        <div className="w-64 h-36 bg-white rounded-xl mx-auto flex items-center justify-center shadow-inner relative overflow-hidden">
                          {/* Complementary negative afterimage glow */}
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0.2 }}
                            animate={{ scale: 1, opacity: 0.8 }}
                            className="w-24 h-24 rounded-full blur-sm"
                            style={{
                              backgroundColor:
                                afterImageColor === 'red' ? '#06b6d4' : // Cyan for red
                                afterImageColor === 'green' ? '#ec4899' : // Magenta for green
                                afterImageColor === 'blue' ? '#f59e0b' : // Yellow for blue
                                '#3b82f6', // Blue for yellow
                            }}
                          />
                          <div className="w-2 h-2 bg-slate-400 rounded-full absolute" />
                        </div>
                        <p className="text-xs text-emerald-400 font-bold mt-3">
                          Negative After-Image Revealed! Opponent channels disinhibit complementary hue.
                        </p>
                      </motion.div>
                    )}
                  </div>
                </div>
              )}

              {/* ─── SLIDE 4: EMOTION CIRCUIT & HOMEOSTASIS ─── */}
              {currentSlide === 4 && (
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {(['jamesLange', 'cannonBard', 'schachterSinger'] as const).map((th) => (
                      <motion.button
                        key={th}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          setSelectedEmotionTheory(th);
                          audioManager.play('tap');
                        }}
                        className={`px-3 py-1.5 text-xs font-bold rounded-xl transition-all ${
                          selectedEmotionTheory === th
                            ? 'bg-purple-600 text-white shadow-md'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        {th === 'jamesLange' ? 'James-Lange Theory' : th === 'cannonBard' ? 'Cannon-Bard Theory' : 'Schachter-Singer Two-Factor'}
                      </motion.button>
                    ))}
                  </div>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800">
                    <div className="text-xs text-purple-300 font-bold mb-3 flex items-center justify-between">
                      <span>Neural Activation Sequence</span>
                      <span className="text-slate-400">Click brain nodes to inspect clinical function</span>
                    </div>

                    {/* Interactive SVG Brain Cross Section */}
                    <svg viewBox="0 0 450 180" className="w-full h-44 bg-slate-900 rounded-xl p-2">
                      {/* Brain silhouette */}
                      <path
                        d="M 50,140 Q 40,80 100,40 Q 180,10 280,20 Q 380,30 400,90 Q 410,140 350,160 Q 280,170 200,160 Z"
                        fill="#1e1b4b"
                        stroke="#4338ca"
                        strokeWidth="2"
                      />

                      {/* Cortex (Outer Shell) */}
                      <g onClick={() => handleBrainClick('PrefrontalCortex')} className="cursor-pointer">
                        <circle cx="120" cy="65" r="22" fill={activeBrainStructure === 'PrefrontalCortex' ? '#10b981' : '#312e81'} stroke="#6ee7b7" strokeWidth="2" />
                        <text x="120" y="69" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Cortex</text>
                      </g>

                      {/* Thalamus (Center Relay) */}
                      <g onClick={() => handleBrainClick('Thalamus')} className="cursor-pointer">
                        <circle cx="230" cy="90" r="20" fill={activeBrainStructure === 'Thalamus' ? '#f59e0b' : '#312e81'} stroke="#fcd34d" strokeWidth="2" />
                        <text x="230" y="94" fill="#fff" fontSize="9" fontWeight="bold" textAnchor="middle">Thalamus</text>
                      </g>

                      {/* Hypothalamus (Below Thalamus) */}
                      <g onClick={() => handleBrainClick('Hypothalamus')} className="cursor-pointer">
                        <circle cx="210" cy="130" r="18" fill={activeBrainStructure === 'Hypothalamus' ? '#ef4444' : '#312e81'} stroke="#fca5a5" strokeWidth="2" />
                        <text x="210" y="133" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Hypothalamus</text>
                      </g>

                      {/* Amygdala */}
                      <g onClick={() => handleBrainClick('Amygdala')} className="cursor-pointer">
                        <circle cx="270" cy="125" r="16" fill={activeBrainStructure === 'Amygdala' ? '#ec4899' : '#312e81'} stroke="#f472b6" strokeWidth="2" />
                        <text x="270" y="128" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">Amygdala</text>
                      </g>

                      {/* Arrows based on theory */}
                      {selectedEmotionTheory === 'jamesLange' && (
                        <g>
                          <path d="M 230,90 L 210,130" stroke="#ef4444" strokeWidth="2" markerEnd="url(#arrow)" />
                          <text x="320" y="50" fill="#f87171" fontSize="10">1. Stimulus → Bodily Arousal</text>
                          <text x="320" y="70" fill="#f87171" fontSize="10">2. Brain senses arousal → Fear</text>
                        </g>
                      )}

                      {selectedEmotionTheory === 'cannonBard' && (
                        <g>
                          <path d="M 230,90 L 120,65" stroke="#10b981" strokeWidth="2" />
                          <path d="M 230,90 L 210,130" stroke="#ef4444" strokeWidth="2" />
                          <text x="320" y="50" fill="#34d399" fontSize="10">Simultaneous dual paths:</text>
                          <text x="320" y="70" fill="#34d399" fontSize="10">Cortex (Feel) + Body (Arousal)</text>
                        </g>
                      )}

                      {selectedEmotionTheory === 'schachterSinger' && (
                        <g>
                          <text x="320" y="45" fill="#a78bfa" fontSize="10">1. General Body Arousal</text>
                          <text x="320" y="65" fill="#a78bfa" fontSize="10">2. + Cognitive Appraisal</text>
                          <text x="320" y="85" fill="#a78bfa" fontSize="10">= Specific Emotion Label</text>
                        </g>
                      )}
                    </svg>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Bottom Slide Navigation */}
          <div className="flex items-center justify-between pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('tap');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 disabled:opacity-40 text-white text-xs font-bold rounded-xl"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400 font-mono">
              Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}
            </span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('tap');
                }}
                className="px-5 py-2 bg-purple-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-purple-600/30"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-black rounded-xl shadow-lg"
              >
                Enter Free Sandbox ⚡
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX / FREE PLAY PHASE ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-5">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-lg font-bold text-white">Free Sandbox & Bio-Feedback Chamber</h3>
              <span className="text-xs font-bold px-2.5 py-0.5 bg-emerald-500/20 text-emerald-300 rounded-full border border-emerald-500/30">
                Ungraded Free Play
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Manipulate homeostatic hydration, test dynamic dataset outliers, and observe live neural canvas wave synthesis.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Real-time Canvas Pulse */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Dynamic EEG Pulse Wave</span>
                <canvas ref={canvasRef} width={380} height={70} className="w-full mt-2 rounded-lg bg-slate-900" />
              </div>

              {/* Homeostasis Hydration Balancer */}
              <div className="mt-4 pt-3 border-t border-slate-800/80">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-slate-300 font-bold">Hypothalamic Hydration Need</span>
                  <span className={`text-xs font-bold ${hydrationLevel < 40 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {hydrationLevel}% {hydrationLevel < 40 ? '(THIRST MOTIVE ACTIVE)' : '(HOMEOSTASIS BALANCED)'}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={hydrationLevel}
                  onChange={(e) => setHydrationLevel(Number(e.target.value))}
                  className="w-full accent-gold-400"
                />
              </div>
            </div>

            {/* Live Stats Sandbox */}
            <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800">
              <span className="text-xs font-bold text-gold-300 uppercase tracking-wider">Live Outlier Stretcher</span>
              <div className="mt-3">
                <input
                  type="range"
                  min={10}
                  max={150}
                  value={outlierValue}
                  onChange={(e) => handleOutlierSliderChange(Number(e.target.value))}
                  className="w-full accent-gold-500 mb-4"
                />
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-[10px] text-slate-400">MEAN</span>
                    <p className="text-sm font-bold text-rose-400">{computedStats.mean}</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-[10px] text-slate-400">MEDIAN</span>
                    <p className="text-sm font-bold text-emerald-400">{computedStats.median}</p>
                  </div>
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <span className="text-[10px] text-slate-400">STD DEV</span>
                    <p className="text-sm font-bold text-purple-400">{computedStats.sd}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-8 py-3 bg-gradient-to-r from-purple-600 via-gold-600 to-purple-700 text-white font-black text-sm rounded-2xl shadow-xl shadow-purple-600/30"
            >
              Start Clinical Assessment Challenges →
            </motion.button>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          
          {/* Challenge Header & Progress Bar */}
          <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div>
                <span className="text-xs text-purple-400 font-bold tracking-wider uppercase">
                  Case Investigation #{currentChallenge + 1}
                </span>
                <h2 className="text-base sm:text-lg font-black text-white">
                  Question {currentChallenge + 1} of {filteredChallenges.length}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <motion.span
                  key={difficulty}
                  initial={{ scale: 0.85 }}
                  animate={{ scale: 1 }}
                  className={`text-xs font-extrabold px-3 py-1 rounded-full border ${
                    difficulty === 'foundation'
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-300'
                      : difficulty === 'advanced'
                      ? 'bg-rose-950/80 border-rose-500 text-rose-300'
                      : 'bg-gold-950/80 border-gold-500 text-gold-300'
                  }`}
                >
                  {difficulty.toUpperCase()} TIER
                </motion.span>
                <span className="text-xs px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                  NEP: {challenge.competencyLevel}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-purple-500 via-gold-500 to-emerald-400 rounded-full"
                animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Question Presentation Card */}
          <motion.div
            animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
            transition={{ duration: 0.4 }}
            className={`p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/60 border-rose-500 shadow-lg shadow-rose-900/50'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <p className="text-base sm:text-lg font-semibold text-white mb-5 leading-relaxed">
              {challenge.question}
            </p>

            {/* MCQ Option Cards */}
            {(challenge.type === 'classify' || challenge.type === 'distinguish' || challenge.type === 'match') && challenge.options && (
              <div className="space-y-2.5">
                {challenge.options.map((opt, i) => (
                  <motion.button
                    key={i}
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => handleAnswer(i)}
                    disabled={showExplanation || answerRevealed}
                    className={`w-full text-left p-4 rounded-xl border text-sm font-medium transition-all ${
                      showExplanation && i === challenge.correctIndex
                        ? 'bg-emerald-950/70 border-emerald-500 text-emerald-200 shadow-md shadow-emerald-900/40'
                        : showExplanation && i !== challenge.correctIndex
                        ? 'bg-slate-800/30 border-slate-800 text-slate-500'
                        : 'bg-slate-800 hover:bg-slate-750 border-slate-700 text-slate-200'
                    }`}
                    aria-label={`Option ${i + 1}: ${opt}`}
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="font-bold text-slate-400">{String.fromCharCode(65 + i)}.</span>
                      <span>{opt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            )}

            {/* Drag-Label Challenge */}
            {challenge.type === 'drag-label' && challenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-purple-400 self-center mr-2">Available Labels:</span>
                  {challenge.dragItems.map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-3 py-1.5 bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold rounded-lg cursor-grab shadow"
                    >
                      {item.label}
                    </motion.div>
                  ))}
                </div>

                {/* Drop Targets Container */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    { id: 'desc_prox', title: 'Elements close to one another are grouped together' },
                    { id: 'desc_sim', title: 'Elements sharing shape, size or color are grouped' },
                    { id: 'desc_clos', title: 'Brain fills in missing sensory gaps to complete figure' },
                    { id: 'desc_cont', title: 'Eye follows smooth flowing lines rather than abrupt angles' },
                  ].map((target) => (
                    <div
                      key={target.id}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => handleDragDrop(target.id)}
                      className="p-3 bg-slate-950 rounded-xl border-2 border-dashed border-slate-700 hover:border-purple-500 flex flex-col justify-between min-h-[90px]"
                    >
                      <p className="text-xs text-slate-300">{target.title}</p>
                      <div className="mt-2 text-right">
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          droppedLabels[target.id] ? 'bg-purple-900 text-purple-200' : 'bg-slate-800 text-slate-500'
                        }`}>
                          {droppedLabels[target.id] || '[Drop Label Here]'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(droppedLabels)}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                  >
                    Validate Labels
                  </motion.button>
                </div>
              </div>
            )}

            {/* Drag-Sort Challenge */}
            {challenge.type === 'drag-sort' && challenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">Drag items to rearrange in correct psychological sequence:</p>
                <div className="space-y-2">
                  {(sortArrangement.length === challenge.sortItems.length
                    ? sortArrangement.map((idx) => challenge.sortItems![idx])
                    : challenge.sortItems
                  ).map((item, i) => (
                    <motion.div
                      key={i}
                      draggable
                      onDragStart={() => setDraggedItem(String(i))}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={() => {
                        const from = parseInt(draggedItem || '0');
                        handleSortMove(from, i);
                      }}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      className="p-3 bg-slate-800 hover:bg-slate-750 border border-slate-700 rounded-xl text-xs font-medium text-slate-200 cursor-grab flex items-center gap-3"
                    >
                      <span className="w-5 h-5 rounded-full bg-purple-950 border border-purple-700 text-purple-300 flex items-center justify-center font-bold text-[10px]">
                        {i + 1}
                      </span>
                      <span>{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSortSubmit}
                    disabled={showExplanation}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                  >
                    Check Order
                  </motion.button>
                </div>
              </div>
            )}

            {/* Numeric Challenge */}
            {challenge.type === 'numeric' && (
              <div className="space-y-3">
                <div className="flex items-center gap-3 max-w-sm">
                  <input
                    type="number"
                    value={numericInput}
                    onChange={(e) => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    className="w-full px-4 py-2.5 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono text-sm"
                  />
                  <span className="text-xs text-slate-400 font-bold">{challenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    disabled={showExplanation || !numericInput}
                    className="px-5 py-2.5 bg-purple-600 text-white text-xs font-bold rounded-xl"
                  >
                    Verify
                  </motion.button>
                </div>
              </div>
            )}

            {/* Construct Challenge */}
            {challenge.type === 'construct' && challenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-amber-300">{challenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {challenge.availableParts.map((part, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleAddPartToConstruct(part)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-bold rounded-lg"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 min-h-[60px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((part, i) => (
                    <motion.div
                      key={i}
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="px-3 py-1 bg-purple-900 border border-purple-700 text-purple-200 text-xs font-bold rounded-lg flex items-center gap-2"
                    >
                      <span>{part}</span>
                      <button onClick={() => handleRemovePartFromConstruct(i)} className="text-rose-400 hover:text-rose-200">
                        ✕
                      </button>
                    </motion.div>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-600 italic">Click parts above to assemble response...</span>
                  )}
                </div>

                <div className="flex justify-end pt-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(constructParts.join(' '))}
                    disabled={showExplanation || constructParts.length === 0}
                    className="px-5 py-2 bg-gold-600 text-white text-xs font-bold rounded-xl"
                  >
                    Validate Assembly
                  </motion.button>
                </div>
              </div>
            )}

            {/* Progressive Disclosure Explanation Box */}
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-5 bg-gradient-to-br from-amber-950/40 via-slate-900 to-purple-950/30 border border-amber-800/40 rounded-2xl space-y-3"
              >
                <div className="flex items-center gap-2 text-amber-300 text-xs font-bold uppercase tracking-wider">
                  <span>📖</span> Detailed Step-by-Step Psychological Explanation:
                </div>

                {challenge.explanation
                  .split('. ')
                  .filter(s => s.trim().length > 0)
                  .slice(0, revealedSteps + 1)
                  .map((sentence, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="text-xs sm:text-sm text-slate-200 leading-relaxed"
                    >
                      <span className="font-bold text-amber-400">Step {idx + 1}:</span> {sentence}
                      {!sentence.endsWith('.') && '.'}
                    </motion.p>
                  ))}

                {revealedSteps < challenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(r => r + 1)}
                    className="px-4 py-1.5 bg-amber-700/80 hover:bg-amber-600 text-white text-xs font-bold rounded-lg"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <div className="flex justify-end pt-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-600/30"
                    >
                      {currentChallenge + 1 >= filteredChallenges.length ? 'Finalize Master Assessment →' : 'Next Question →'}
                    </motion.button>
                  </div>
                )}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          
          {/* Main Success Hero Card */}
          <div className="p-6 sm:p-8 bg-gradient-to-br from-purple-950 via-slate-900 to-gold-950 rounded-3xl border border-purple-700/50 text-center shadow-2xl">
            <span className="text-5xl mb-2 block">🎓</span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">Simulation Completed!</h2>
            <p className="text-slate-300 text-sm mt-1">ISC Class 11 Psychology Cognitive & Statistics Mastery</p>

            <div className="flex justify-center items-center gap-6 mt-6">
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl min-w-[120px]">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Final Score</span>
                <p className="text-2xl font-black text-emerald-400">{Math.max(0, 100 - errors * 5)}%</p>
              </div>
              <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-2xl min-w-[120px]">
                <span className="text-[10px] text-slate-400 font-bold uppercase">BKT Mastery Level</span>
                <p className="text-2xl font-black text-purple-400 capitalize">{masteryLevel}</p>
              </div>
            </div>
          </div>

          {/* Personalized Motivational Feedback */}
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 text-center">
            <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-2">Performance Assessment</h4>
            <div className="text-xl font-black text-amber-300 mb-2">
              {errors === 0
                ? 'PERFECT SCORE!'
                : errors >= 1 && errors <= 3
                ? 'Great work!'
                : errors >= 4 && errors <= 7
                ? 'Good effort!'
                : 'Do not give up — You WILL get this!'}
            </div>
            <p className="text-sm text-slate-200">
              {errors === 0
                ? '🌟 Flawless Mastery! You evaluated statistics, perceptual grouping, illusion heuristics, and brain emotion circuits with total scientific rigor!'
                : errors <= 3
                ? '👏 Excellent work! You demonstrated strong conceptual understanding across cognitive psychology and descriptive stats. Review any minor gaps below.'
                : errors <= 7
                ? '💪 Good effort! Psychology requires connecting mathematical distributions with cognitive brain structures. Review your misconceptions below and retry for 100%!'
                : '🧠 Do not give up — You WILL get this! Take time to explore the interactive labs again and reinforce your foundational concepts.'}
            </p>
          </div>

          {/* Misconception Diagnostic Profile */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/40">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider mb-3">Diagnostic Misconception Review</h4>
              <div className="space-y-2.5">
                {hitMisconceptions.map((idx, i) => {
                  const m = misconceptions?.[idx];
                  if (!m) return null;
                  return (
                    <div key={i} className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                      <p className="text-xs font-bold text-rose-400">❌ Common Pitfall: {m.misconception}</p>
                      <p className="text-xs text-emerald-400 mt-1">✓ Scientific Truth: {m.correction}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Spaced Repetition Visibility */}
          <div className="p-5 bg-gold-950/40 rounded-2xl border border-gold-800/40">
            <h4 className="text-xs font-bold text-gold-300 uppercase tracking-wider mb-1">SM-2 Spaced Repetition Schedule</h4>
            <p className="text-xs text-slate-300">
              To consolidate memories in the hippocampus and prevent forgetting curves, review this simulation in{' '}
              <span className="font-bold text-amber-300">
                {errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}
              </span>.
            </p>
          </div>

          {/* Real-World Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800">
            <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider mb-2">
              🌍 {REAL_WORLD_ACTIVITY.title}
            </h4>
            <p className="text-xs text-slate-300 mb-4">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300">
                  <span className="font-bold text-purple-400 mr-2">{idx + 1}.</span> {step}
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── FEEDBACK OVERLAYS ─── */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Clinical Mastery Achieved!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export { C11_PsychologyStatisticsPsychologyDescriptiveSim };
export default C11_PsychologyStatisticsPsychologyDescriptiveSim;