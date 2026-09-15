'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C8_PHY_001 = 'c8_phy_cbse_001'; // Vision and light
const NODE_C8_PHY_002 = 'c8_phy_cbse_002'; // Reflection of light
const NODE_C8_PHY_003 = 'c8_phy_cbse_003'; // Laws of reflection
const NODE_C8_PHY_004 = 'c8_phy_cbse_004'; // Plane mirror images
const NODE_C8_PHY_005 = 'c8_phy_cbse_005'; // Regular and diffuse reflection
const NODE_C8_PHY_006 = 'c8_phy_cbse_006'; // Multiple reflection & Kaleidoscope
const NODE_C8_PHY_007 = 'c8_phy_cbse_007'; // Dispersion of light
const NODE_C8_PHY_008 = 'c8_phy_cbse_008'; // Refraction of light
const NODE_C8_PHY_009 = 'c8_phy_cbse_009'; // Refractive index
const NODE_C8_PHY_010 = 'c8_phy_cbse_010'; // Convex and concave lenses
const NODE_C8_PHY_011 = 'c8_phy_cbse_011'; // Lens optical terms
const NODE_C8_PHY_012 = 'c8_phy_cbse_012'; // Image formation by convex lens
const NODE_C8_PHY_013 = 'c8_phy_cbse_013'; // Image formation by concave lens
const NODE_C8_PHY_014 = 'c8_phy_cbse_014'; // Human eye structure
const NODE_C8_PHY_015 = 'c8_phy_cbse_015'; // Working of human eye & accommodation
const NODE_C8_PHY_016 = 'c8_phy_cbse_016'; // Defects of vision: Myopia
const NODE_C8_PHY_017 = 'c8_phy_cbse_017'; // Defects of vision: Hypermetropia
const NODE_C8_PHY_018 = 'c8_phy_cbse_018'; // Eye care and hygiene
const NODE_C8_PHY_019 = 'c8_phy_cbse_019'; // Visually impaired assistance & Braille

const ALL_NODE_IDS = [
  NODE_C8_PHY_001,
  NODE_C8_PHY_002,
  NODE_C8_PHY_003,
  NODE_C8_PHY_004,
  NODE_C8_PHY_005,
  NODE_C8_PHY_006,
  NODE_C8_PHY_007,
  NODE_C8_PHY_008,
  NODE_C8_PHY_009,
  NODE_C8_PHY_010,
  NODE_C8_PHY_011,
  NODE_C8_PHY_012,
  NODE_C8_PHY_013,
  NODE_C8_PHY_014,
  NODE_C8_PHY_015,
  NODE_C8_PHY_016,
  NODE_C8_PHY_017,
  NODE_C8_PHY_018,
  NODE_C8_PHY_019,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: Deep Space Solar Observatory Ray Physics Lab',
  intro: 'The Solar Dynamics Observatory telescope has lost mirror alignment and focus calibration! As the lead optical engineer at ISRO Control, your mission is to master reflection laws, refraction indices, lens ray dynamics, and optical vision systems to align the space telescope optics.',
  context: 'You will interact with real-time laser benches, manipulate refractive media, calibrate convex/concave lenses, and align correction lenses for defective optical sensors before deploying the observatory payload.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If a ray of light strikes a smooth plane mirror at an angle of 35° with the surface of the mirror, what is its angle of reflection?',
  options: [
    '35° because angle of incidence always equals angle of reflection.',
    '55° because the angle of incidence is measured relative to the normal line (90° - 35° = 55°).',
    '70° because light doubles its angle upon bouncing.',
    '145° because the light ray flips along the horizontal plane.',
  ],
  correctIndex: 1,
  hintAfter: 'Remember: The angle of incidence (i) and angle of reflection (r) are ALWAYS measured between the ray and the NORMAL line (perpendicular line at 90° to the surface).',
};

// ─── TEACHING SLIDES DEFINITION ───
interface TeachingSlide {
  id: string;
  title: string;
  subtitle: string;
  concept: string;
  keyTakeaway: string;
  formula?: string;
  interactiveMode: 'reflection' | 'refraction' | 'lenses' | 'eye' | 'braille';
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_reflection',
    title: '1. Laws of Reflection & Plane Mirrors',
    subtitle: 'How Light Bounces Off Surfaces',
    concept: 'Light reflects off surfaces such that: 1) Angle of Incidence (∠i) = Angle of Reflection (∠r). 2) Incident ray, normal, and reflected ray lie in the same plane. Images formed by plane mirrors are virtual, upright, lateral inverted, and equal distance behind the mirror.',
    keyTakeaway: '∠i = ∠r measured relative to the Normal line (90° to surface).',
    formula: '∠i = ∠r',
    interactiveMode: 'reflection',
  },
  {
    id: 'slide_refraction',
    title: '2. Refraction & Prism Dispersion',
    subtitle: 'Bending of Light Across Media',
    concept: 'When light travels from one transparent medium to another, it changes speed and bends. Moving into a denser medium (higher refractive index n), light bends TOWARDS the normal line. Passing white light through a triangular glass prism separates it into VIBGYOR colors because each wavelength refracts by a slightly different angle (Dispersion).',
    keyTakeaway: 'Denser medium -> Light slows down & bends TOWARDS the normal.',
    formula: 'Refractive Index (n) = Speed of light in vacuum (c) / Speed of light in medium (v)',
    interactiveMode: 'refraction',
  },
  {
    id: 'slide_lenses',
    title: '3. Convex & Concave Lenses',
    subtitle: 'Ray Tracing & Image Formation',
    concept: 'Convex lenses are converging lenses (thicker in center) that can form real inverted or virtual upright images depending on object distance. Concave lenses are diverging lenses (thinner in center) that always form virtual, erect, and diminished images.',
    keyTakeaway: 'Convex = Converges light rays to Focus (F); Concave = Diverges light rays.',
    formula: '1 / f = 1 / v - 1 / u',
    interactiveMode: 'lenses',
  },
  {
    id: 'slide_eye',
    title: '4. Human Eye & Vision Defects',
    subtitle: 'Cornea, Retina & Correction Lenses',
    concept: 'Light enters through the cornea and pupil, focused by the eye lens onto the retina screen. In Myopia (short-sightedness), light focuses BEFORE the retina (corrected with a Concave lens). In Hypermetropia (far-sightedness), light focuses BEHIND the retina (corrected with a Convex lens).',
    keyTakeaway: 'Myopia -> Concave Lens correction | Hypermetropia -> Convex Lens correction.',
    formula: 'Power of Lens P (Dioptres) = 1 / f (in metres)',
    interactiveMode: 'eye',
  },
  {
    id: 'slide_braille',
    title: '5. Eye Hygiene & Braille System',
    subtitle: 'Assistive Tech for Visual Impairment',
    concept: 'Visually impaired individuals use tactile systems like Braille (developed by Louis Braille in 1821). Braille consists of 63 dot patterns arranged in a grid of 6 dots (2 columns of 3 dots each) representing characters, numbers, and symbols.',
    keyTakeaway: 'Braille uses raised 6-dot cells to enable reading through touch.',
    formula: '6-dot Cell = 2^6 - 1 = 63 unique raised character patterns',
    interactiveMode: 'braille',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'numeric' | 'match' | 'ray-target' | 'lens-slider';
  difficulty: 'foundation' | 'standard' | 'advanced';
  question: string;
  options?: string[];
  correctIndex?: number;
  correctAnswer?: number;
  tolerance?: number;
  unit?: string;
  explanation: string;
  hints: string[];
  targetValue?: number;
}

const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_angle_reflection',
    nodeId: NODE_C8_PHY_003,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A laser beam strikes a mirror surface at an angle of 30° to the surface plane. Calculate the angle of reflection (∠r) in degrees measured from the normal line.',
    correctAnswer: 60,
    tolerance: 0.5,
    unit: 'degrees (°)',
    explanation: 'The normal line is perpendicular to the mirror surface (90°). Angle of incidence ∠i = 90° - 30° = 60°. By the law of reflection, ∠r = ∠i = 60°.',
    hints: [
      'Angle of incidence is measured between the light ray and the NORMAL line.',
      'Normal line is 90° to the mirror plane.',
      '∠i = 90° - 30° = 60°. Then ∠r = ∠i.',
    ],
  },
  {
    id: 'ch_02_plane_mirror_dist',
    nodeId: NODE_C8_PHY_004,
    type: 'numeric',
    difficulty: 'foundation',
    question: 'A student stands 4 metres away from a large plane mirror. If the student walks 1.5 metres towards the mirror, what is the distance between the student and their image in the mirror?',
    correctAnswer: 5,
    tolerance: 0.1,
    unit: 'metres (m)',
    explanation: 'Initial distance = 4 m. After moving 1.5 m closer, distance to mirror = 4 - 1.5 = 2.5 m. The image is 2.5 m behind the mirror. Total distance = 2.5 + 2.5 = 5.0 metres.',
    hints: [
      'First calculate the new distance from the student to the mirror.',
      'The image in a plane mirror is located as far behind the mirror as the object is in front of it.',
      'Total distance = (Distance to mirror) × 2.',
    ],
  },
  {
    id: 'ch_03_diffuse_reflection',
    nodeId: NODE_C8_PHY_005,
    type: 'classify',
    difficulty: 'standard',
    question: 'When light strikes a rough sheet of paper, it undergoes diffuse reflection and scatters in all directions. Are the laws of reflection still obeyed for diffuse reflection?',
    options: [
      'No, diffuse reflection breaks the laws of reflection completely.',
      'Yes, the law of reflection (∠i = ∠r) holds true at every individual microscopic point of the rough surface.',
      'Only if the incident light beam is polarized laser light.',
      'No, because diffuse reflection only happens for light passing into glass.',
    ],
    correctIndex: 1,
    explanation: 'Laws of reflection are NEVER violated. In diffuse reflection, microscopic surface irregularities mean the normal line points in different directions at each point, causing parallel rays to reflect in scattered directions.',
    hints: [
      'Do basic laws of physics break down on paper?',
      'Consider what happens to the orientation of the microscopic normal lines across a rough surface.',
      'The law ∠i = ∠r holds true at each individual point, but local surface slopes vary!',
    ],
  },
  {
    id: 'ch_04_refraction_direction',
    nodeId: NODE_C8_PHY_008,
    type: 'classify',
    difficulty: 'foundation',
    question: 'When a ray of light enters glass (optically denser medium) from air (optically rarer medium) at an angle, how does it behave?',
    options: [
      'It speeds up and bends away from the normal line.',
      'It slows down and bends towards the normal line.',
      'It travels straight without any change in direction or speed.',
      'It reflects backwards completely into the air at all angles.',
    ],
    correctIndex: 1,
    explanation: 'Glass is denser than air. As light enters glass, its wave speed decreases, causing the ray to bend TOWARDS the normal line.',
    hints: [
      'Think about moving from a light/rarer medium to a dense medium.',
      'In a denser medium, light travels slower.',
      'Slower speed causes light to bend TOWARDS the normal.',
    ],
  },
  {
    id: 'ch_05_refractive_index_calc',
    nodeId: NODE_C8_PHY_009,
    type: 'numeric',
    difficulty: 'standard',
    question: 'The speed of light in vacuum is 3.0 × 10⁸ m/s. If the refractive index of optical glass is 1.5, calculate the speed of light in this glass in units of 10⁸ m/s.',
    correctAnswer: 2,
    tolerance: 0.1,
    unit: '× 10⁸ m/s',
    explanation: 'Refractive index n = c / v. Therefore v = c / n = (3.0 × 10⁸) / 1.5 = 2.0 × 10⁸ m/s.',
    hints: [
      'Use formula: n = c / v.',
      'Rearrange formula: v = c / n.',
      'v = 3.0 / 1.5 = 2.0 × 10⁸ m/s.',
    ],
  },
  {
    id: 'ch_06_convex_lens_2f',
    nodeId: NODE_C8_PHY_012,
    type: 'classify',
    difficulty: 'standard',
    question: 'An object is placed at a distance of 2F (twice the focal length) in front of a convex lens. What are the characteristics of the image formed?',
    options: [
      'Virtual, erect, and magnified located at F.',
      'Real, inverted, and same size located at 2F on the other side of the lens.',
      'Real, erect, and highly enlarged located at infinity.',
      'Virtual, inverted, and diminished located behind the object.',
    ],
    correctIndex: 1,
    explanation: 'When an object is placed at 2F of a convex lens, a real, inverted image of the exact same size is formed at 2F on the opposite side of the lens.',
    hints: [
      'At 2F, the distance symmetry is maintained on both sides.',
      'The magnification m = v / u = -1.',
      'Image is real, inverted, and same size at 2F.',
    ],
  },
  {
    id: 'ch_07_myopia_defect',
    nodeId: NODE_C8_PHY_016,
    type: 'classify',
    difficulty: 'standard',
    question: 'A person with Myopia (short-sightedness) cannot see distant objects clearly. Where does the image of a distant object form, and which lens corrects it?',
    options: [
      'Image forms behind retina; corrected using a Convex lens.',
      'Image forms in front of retina; corrected using a Concave lens.',
      'Image forms on iris; corrected using cylindrical glass.',
      'Image forms outside cornea; corrected using plane mirror.',
    ],
    correctIndex: 1,
    explanation: 'In Myopia, the eye lens converges light too strongly (or eyeball is too long), focusing rays IN FRONT of the retina. A diverging (Concave) lens spreads the light rays slightly before entering the eye so they focus right on the retina.',
    hints: [
      'Myopia = Short-sighted (can see near, cannot see far).',
      'The light rays cross and focus BEFORE reaching the retina screen.',
      'To push the focus back to retina, we need a diverging (Concave) lens.',
    ],
  },
  {
    id: 'ch_08_dispersion_prism',
    nodeId: NODE_C8_PHY_007,
    type: 'classify',
    difficulty: 'advanced',
    question: 'When white light passes through a glass prism, it splits into seven spectral colors (VIBGYOR). Which color of light deviates (bends) the MOST?',
    options: [
      'Red light, because it has the longest wavelength and highest speed in glass.',
      'Violet light, because it has the shortest wavelength and lowest speed in glass.',
      'Green light, because it is in the exact middle of the visible spectrum.',
      'Yellow light, because it carries the maximum optical energy.',
    ],
    correctIndex: 1,
    explanation: 'Violet light has the shortest wavelength (~400 nm) and travels slowest in glass, corresponding to the highest refractive index for violet. Thus, violet light bends (deviates) the most, while red light bends the least.',
    hints: [
      'Think about VIBGYOR order from top to bottom in a spectrum.',
      'Shorter wavelength = higher refractive index = greater bending.',
      'Violet is at the bottom of the spectrum with maximum deviation.',
    ],
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    misconception: 'Angle of incidence is measured with respect to the mirror surface.',
    correction: 'Angle of incidence is ALWAYS measured between the light ray and the NORMAL line (90° to surface).',
  },
  {
    id: 'misc_2',
    misconception: 'Diffuse reflection violates the laws of reflection.',
    correction: 'Laws of reflection hold at every microscopic surface point; surface irregularity causes random normal directions.',
  },
  {
    id: 'misc_3',
    misconception: 'Light travels at the same speed in all materials.',
    correction: 'Light slows down in denser media. The ratio of speed c/v determines the medium\'s refractive index n.',
  },
  {
    id: 'misc_4',
    misconception: 'Myopia is corrected using a convex lens.',
    correction: 'Myopia (short-sightedness) is corrected using a diverging CONCAVE lens to shift focus onto retina.',
  },
  {
    id: 'misc_5',
    misconception: 'Images formed by plane mirrors are real.',
    correction: 'Plane mirror images are VIRTUAL, erect, laterally inverted, and cannot be captured on a physical screen.',
  },
];

// ─── MAIN COMPONENT ───
export default function C8_PhysicsLightCBSESim() {
  // Phase & State Navigation
  const [phase, setPhase] = useState<'intro' | 'discovery' | 'teach' | 'arena' | 'summary'>('intro');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState<number>(0);

  // Score & SRS/BKT Trackers
  const [score, setScore] = useState<number>(0);
  const [userBKT, setUserBKT] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Discovery State
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);
  const [discoveryAnswered, setDiscoveryAnswered] = useState<boolean>(false);

  // Interactive Interactive Controls State
  // 1. Reflection Controls
  const [incidentAngle, setIncidentAngle] = useState<number>(45); // degrees from normal
  const [showNormal, setShowNormal] = useState<boolean>(true);
  const [reflectionMode, setReflectionMode] = useState<'plane' | 'periscope' | 'diffuse'>('plane');

  // 2. Refraction Controls
  const [refractionMedium, setRefractionMedium] = useState<'water' | 'glass' | 'diamond'>('glass');
  const [refractionIncAngle, setRefractionIncAngle] = useState<number>(40);
  const [showPrismDispersion, setShowPrismDispersion] = useState<boolean>(false);

  // 3. Lens Controls
  const [lensType, setLensType] = useState<'convex' | 'concave'>('convex');
  const [focalLength, setFocalLength] = useState<number>(100); // px
  const [objectDistance, setObjectDistance] = useState<number>(180); // px
  const [objectHeight, setObjectHeight] = useState<number>(50); // px

  // 4. Eye Defect Controls
  const [eyeCondition, setEyeCondition] = useState<'normal' | 'myopia' | 'hypermetropia'>('myopia');
  const [correctivePower, setCorrectivePower] = useState<number>(0); // -5 to +5 dioptres

  // 5. Braille Interactive State
  const [brailleGrid, setBrailleGrid] = useState<boolean[]>([false, false, false, false, false, false]);
  const [activeBrailleChar, setActiveBrailleChar] = useState<string>('Custom');

  // Interactive Challenge Answers State
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeAnswered, setChallengeAnswered] = useState<boolean>(false);
  const [isChallengeCorrect, setIsChallengeCorrect] = useState<boolean>(false);

  // Feedback components state
  const [showHint, setShowHint] = useState<boolean>(false);
  const [currentHint, setCurrentHint] = useState<string>('');
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [showSparkle, setShowSparkle] = useState<boolean>(false);

  // Inactivity auto-hint timer
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'arena') {
        const currentCh = CHALLENGES[currentChallengeIndex];
        if (currentCh && currentCh.hints.length > 0) {
          setCurrentHint(currentCh.hints[0]);
          setShowHint(true);
          audioManager.play('hint');
          speechManager.speak('Here is a helpful hint to guide your calculation.');
        }
      }
    }, 10000);
  }, [phase, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, currentChallengeIndex, phase]);

  // Handle Discovery Selection
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      audioManager.play('success');
      speechManager.speak('Spot on! The angle of incidence is measured with respect to the normal line, giving 55 degrees.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 2000);
    } else {
      audioManager.play('error');
      speechManager.speak('Not quite. Remember that angles are measured from the perpendicular normal line.');
    }
  };

  // Refraction calculation helper
  const mediumIndices = {
    water: 1.33,
    glass: 1.52,
    diamond: 2.42,
  };
  const n1 = 1.0; // Air
  const n2 = mediumIndices[refractionMedium];
  const refAngleRad = Math.asin((n1 * Math.sin((refractionIncAngle * Math.PI) / 180)) / n2);
  const refAngleDeg = (refAngleRad * 180) / Math.PI;

  // Lens equation calculation helper
  // Lens equation: 1/f = 1/v - 1/u (with sign convention, u is negative: -objectDistance)
  // 1/v = 1/f + 1/(-u) = 1/f - 1/u => v = (f * u) / (u - f) for convex
  const fVal = lensType === 'convex' ? focalLength : -focalLength;
  const uVal = -objectDistance; // negative convention
  // 1/v = 1/f + 1/u => v = (f * u) / (u + f)
  const vVal = (fVal * uVal) / (uVal + fVal);
  const magnification = vVal / uVal;
  const imageHeight = objectHeight * magnification;

  // Eye Rays Focus Calculation
  const eyeFocusOffset = useMemo(() => {
    let baseOffset = 0; // 0 means focused right on retina (x=350)
    if (eyeCondition === 'myopia') baseOffset = -40; // focuses in front of retina
    if (eyeCondition === 'hypermetropia') baseOffset = 40; // focuses behind retina

    // Corrective power effect:
    // Myopia needs negative power (concave) to shift focus right (+)
    // Hypermetropia needs positive power (convex) to shift focus left (-)
    const adjustment = correctivePower * 12;
    const finalOffset = baseOffset + adjustment;
    return finalOffset;
  }, [eyeCondition, correctivePower]);

  const isEyeFocused = Math.abs(eyeFocusOffset) < 5;

  // Braille dot toggler
  const toggleBrailleDot = (index: number) => {
    audioManager.play('tap');
    setBrailleGrid((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  // Presets for Braille
  const setBraillePreset = (letter: string) => {
    audioManager.play('pickup');
    setActiveBrailleChar(letter);
    // Patterns: [top-left, top-right, mid-left, mid-right, bot-left, bot-right]
    const patterns: Record<string, boolean[]> = {
      A: [true, false, false, false, false, false],
      B: [true, false, true, false, false, false],
      C: [true, true, false, false, false, false],
      L: [true, false, true, false, true, false],
      LIGHT: [true, true, true, false, true, false], // Pattern for 'L' / custom
    };
    if (patterns[letter]) {
      setBrailleGrid(patterns[letter]);
    }
  };

  // Handle Challenge Answers
  const handleAnswerChallenge = () => {
    const currentCh = CHALLENGES[currentChallengeIndex];
    let correct = false;

    if (currentCh.type === 'classify' || currentCh.type === 'match') {
      if (selectedOption === currentCh.correctIndex) {
        correct = true;
      }
    } else if (currentCh.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentCh.correctAnswer !== undefined) {
        const tol = currentCh.tolerance || 0.5;
        if (Math.abs(val - currentCh.correctAnswer) <= tol) {
          correct = true;
        }
      }
    }

    setChallengeAnswered(true);
    setIsChallengeCorrect(correct);

    // BKT & SRS Updates
    const node = currentCh.nodeId;
    const reviewItem = createReviewItem(node, 'Physics');
    const quality = correct ? 5 : 1;
    sm2Update(reviewItem, quality, 0);

    setUserBKT((prev) => {
      const currentState = prev[node] || createBKTState();
      const updatedState = bktUpdate(currentState, correct);
      return { ...prev, [node]: updatedState };
    });

    if (correct) {
      setScore((prev) => prev + 15);
      audioManager.play('drop-correct');
      speechManager.speak('Excellent calculation! Correct response.');
      setShowSparkle(true);
      setTimeout(() => setShowSparkle(false), 1500);
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite correct. Check the hints and step-by-step logic below.');
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeAnswered(false);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('whoosh');
    } else {
      // Completed all challenges!
      recordGameScore(ALL_NODE_IDS, score + 20);
      setPhase('summary');
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have successfully calibrated the ISRO Solar Telescope Ray Optics Payload!');
      setShowConfetti(true);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 4000);
    }
  };

  // Average BKT Mastery
  const overallMastery = useMemo(() => {
    const pKnownList = Object.values(userBKT).map((bkt) => bkt.pKnown);
    const avg = pKnownList.reduce((a, b) => a + b, 0) / pKnownList.length;
    return avg;
  }, [userBKT]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Visual Feedback Overlays */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Mission Complete! Space Optics Calibrated!" />
      <SparkleBurst show={showSparkle} x={600} y={300} />

      {/* HEADER BAR */}
      <header className="bg-slate-900 border-b border-cyan-800/50 px-6 py-4 flex items-center justify-between shadow-lg relative z-20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-xl shadow-md shadow-cyan-500/30">
            ☀️
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-200 bg-clip-text text-transparent">
              ISRO Ray Optics Diagnostic Lab
            </h1>
            <p className="text-xs text-slate-400">Class 8 Physics • CBSE Light & Optical Instrumentation</p>
          </div>
        </div>

        {/* Global Progress & Mastery */}
        <div className="flex items-center space-x-6">
          <div className="hidden md:flex flex-col items-end">
            <span className="text-xs text-slate-400">BKT Mastery Level</span>
            <div className="flex items-center space-x-2">
              <div className="w-28 bg-slate-800 h-2.5 rounded-full overflow-hidden border border-slate-700">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-full transition-all duration-500"
                  style={{ width: `${overallMastery * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-cyan-300">{(overallMastery * 100).toFixed(0)}%</span>
            </div>
          </div>

          <div className="bg-slate-800 px-4 py-1.5 rounded-lg border border-slate-700 flex items-center space-x-2">
            <span className="text-amber-400 text-sm">⭐ Score:</span>
            <span className="font-mono font-bold text-amber-300">{score}</span>
          </div>
        </div>
      </header>

      {/* NAVIGATION TABS */}
      <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-800 px-6 py-2 flex space-x-2 overflow-x-auto">
        <button
          onClick={() => {
            setPhase('intro');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'intro' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          🚀 Mission Briefing
        </button>
        <button
          onClick={() => {
            setPhase('discovery');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'discovery' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          ❓ Discovery Predictor
        </button>
        <button
          onClick={() => {
            setPhase('teach');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'teach' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          🔬 Optics Physics Lab
        </button>
        <button
          onClick={() => {
            setPhase('arena');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'arena' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          🎯 Diagnostic Challenges
        </button>
        <button
          onClick={() => {
            setPhase('summary');
            audioManager.play('tap');
          }}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            phase === 'summary' ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30' : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          📊 Mission Mastery Report
        </button>
      </nav>

      {/* MAIN CONTAINER CONTENT */}
      <main className="flex-1 p-4 md:p-6 max-w-7xl mx-auto w-full flex flex-col relative">
        <HintBubble show={showHint} text={currentHint} />

        {/* ─── PHASE 1: NARRATIVE INTRO ─── */}
        {phase === 'intro' && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl mx-auto my-auto py-6"
          >
            <div className="bg-slate-900/90 border border-cyan-500/30 rounded-2xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl -z-10 pointer-events-none" />
              <span className="inline-block px-3 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded-full text-xs font-semibold uppercase tracking-wider mb-4">
                ISRO Space Payload Diagnostics
              </span>
              <h2 className="text-3xl font-extrabold text-white mb-4 leading-tight">{SCENARIO.title}</h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">{SCENARIO.intro}</p>
              <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 text-slate-400 text-sm mb-8">
                <strong className="text-cyan-400 font-semibold">Laboratory Directives:</strong> {SCENARIO.context}
              </div>

              {/* Topics Grid Overview */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
                {[
                  'Reflection Laws',
                  'Plane Mirrors',
                  'Refraction Index',
                  'Prism Dispersion',
                  'Convex/Concave Lenses',
                  'Human Eye Anatomy',
                  'Myopia & Hypermetropia',
                  'Eye Care Hygiene',
                  'Braille Code System',
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-800/60 p-3 rounded-lg border border-slate-700/50 flex items-center space-x-2">
                    <span className="text-cyan-400 text-xs">✓</span>
                    <span className="text-xs text-slate-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => {
                    setPhase('discovery');
                    audioManager.play('swoop');
                    speechManager.speak('Let us begin with a quick prediction challenge!');
                  }}
                  className="px-8 py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/25 transition-all transform hover:scale-[1.02]"
                >
                  Start Mission Diagnostics →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 2: DISCOVERY PREDICTOR ─── */}
        {phase === 'discovery' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-3xl mx-auto my-auto w-full">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
              <div className="flex items-center space-x-2 mb-4 text-cyan-400 text-sm font-semibold uppercase">
                <span>Predict-Before-You-Learn</span>
                <span>•</span>
                <span>Hypothesis Test</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-6 leading-snug">{DISCOVERY_QUESTION.question}</h3>

              <div className="space-y-3 mb-6">
                {DISCOVERY_QUESTION.options.map((option, idx) => (
                  <button
                    key={idx}
                    disabled={discoveryAnswered}
                    onClick={() => handleDiscoverySubmit(idx)}
                    className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                      discoverySelected === idx
                        ? idx === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                        : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <span className="w-6 h-6 rounded-full bg-slate-700/60 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
                    </div>
                  </button>
                ))}
              </div>

              {discoveryAnswered && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-slate-950 border border-cyan-800/60 rounded-xl mb-6">
                  <p className="text-xs text-cyan-300 font-semibold uppercase mb-1">Scientific Insight:</p>
                  <p className="text-sm text-slate-300 leading-relaxed">{DISCOVERY_QUESTION.hintAfter}</p>
                </motion.div>
              )}

              <div className="flex justify-between items-center">
                <span className="text-xs text-slate-500">Formulating hypotheses boosts physical intuition!</span>
                <button
                  disabled={!discoveryAnswered}
                  onClick={() => {
                    setPhase('teach');
                    audioManager.play('swoop');
                    speechManager.speak('Welcome to the Optics Laboratory. Explore the interactive light modules.');
                  }}
                  className={`px-6 py-2.5 rounded-xl font-bold text-sm transition-all ${
                    discoveryAnswered
                      ? 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-md shadow-cyan-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  Proceed to Interactive Lab →
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ─── PHASE 3: INTERACTIVE VISUAL TEACHING LAB ─── */}
        {phase === 'teach' && (
          <div className="flex-1 flex flex-col space-y-4">
            {/* Lab Slide Selector Header */}
            <div className="bg-slate-900 p-4 rounded-2xl border border-slate-800 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-2">
                {TEACHING_SLIDES.map((slide, idx) => (
                  <button
                    key={slide.id}
                    onClick={() => {
                      setCurrentSlideIndex(idx);
                      audioManager.play('tap');
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      currentSlideIndex === idx
                        ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
                    }`}
                  >
                    Slide {idx + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() => {
                  setPhase('arena');
                  audioManager.play('swoop');
                  speechManager.speak('Time for challenge mode! Test your optical diagnostic skills.');
                }}
                className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
              >
                Go to Challenges ({CHALLENGES.length}) →
              </button>
            </div>

            {/* Main Interactive Work Area */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
              {/* LEFT 5 COLS: Concept Explanation & Controls */}
              <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between shadow-xl">
                <div>
                  <span className="text-xs text-cyan-400 font-mono uppercase tracking-wider">
                    Module {currentSlideIndex + 1} of {TEACHING_SLIDES.length}
                  </span>
                  <h3 className="text-xl font-bold text-white mt-1 mb-1">{TEACHING_SLIDES[currentSlideIndex].title}</h3>
                  <p className="text-xs text-slate-400 mb-4">{TEACHING_SLIDES[currentSlideIndex].subtitle}</p>

                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 mb-4 text-sm text-slate-300 leading-relaxed">
                    {TEACHING_SLIDES[currentSlideIndex].concept}
                  </div>

                  {TEACHING_SLIDES[currentSlideIndex].formula && (
                    <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-lg mb-4">
                      <span className="text-[10px] text-cyan-400 uppercase font-semibold block mb-0.5">Physical Law Formula:</span>
                      <code className="text-sm font-mono text-cyan-200 font-bold">
                        {TEACHING_SLIDES[currentSlideIndex].formula}
                      </code>
                    </div>
                  )}

                  {/* Interactive Controls per Slide */}
                  <div className="mt-4 pt-4 border-t border-slate-800">
                    <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                      ⚡ Interactive Simulation Controls
                    </h4>

                    {/* Controls for Slide 1: Reflection */}
                    {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'reflection' && (
                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Angle of Incidence (∠i):</span>
                            <span className="font-mono text-cyan-400 font-bold">{incidentAngle}°</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="80"
                            value={incidentAngle}
                            onChange={(e) => {
                              setIncidentAngle(parseInt(e.target.value));
                              audioManager.play('tap');
                            }}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>

                        <div className="flex items-center space-x-4">
                          <label className="flex items-center space-x-2 text-xs text-slate-300 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={showNormal}
                              onChange={(e) => setShowNormal(e.target.checked)}
                              className="accent-cyan-400 rounded"
                            />
                            <span>Show Normal Line (90°)</span>
                          </label>
                        </div>

                        <div className="flex space-x-2">
                          {(['plane', 'periscope', 'diffuse'] as const).map((mode) => (
                            <button
                              key={mode}
                              onClick={() => {
                                setReflectionMode(mode);
                                audioManager.play('pickup');
                              }}
                              className={`flex-1 py-1.5 text-xs rounded-lg font-medium border capitalize transition-all ${
                                reflectionMode === mode
                                  ? 'bg-cyan-600 border-cyan-400 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-400 hover:text-white'
                              }`}
                            >
                              {mode} Mirror
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Controls for Slide 2: Refraction */}
                    {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'refraction' && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Medium 2 Material:</label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['water', 'glass', 'diamond'] as const).map((med) => (
                              <button
                                key={med}
                                onClick={() => {
                                  setRefractionMedium(med);
                                  audioManager.play('pickup');
                                }}
                                className={`py-1.5 text-xs rounded-lg font-medium capitalize border transition-all ${
                                  refractionMedium === med
                                    ? 'bg-cyan-600 border-cyan-400 text-white'
                                    : 'bg-slate-800 border-slate-700 text-slate-400'
                                }`}
                              >
                                {med} (n={mediumIndices[med]})
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Incident Light Angle in Air (∠i):</span>
                            <span className="font-mono text-cyan-400 font-bold">{refractionIncAngle}°</span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="80"
                            value={refractionIncAngle}
                            onChange={(e) => setRefractionIncAngle(parseInt(e.target.value))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>

                        <button
                          onClick={() => {
                            setShowPrismDispersion(!showPrismDispersion);
                            audioManager.play('sparkle');
                          }}
                          className={`w-full py-2 rounded-xl text-xs font-bold border transition-all ${
                            showPrismDispersion
                              ? 'bg-purple-600 border-purple-400 text-white shadow-lg shadow-purple-600/30'
                              : 'bg-slate-800 border-slate-700 text-purple-300 hover:bg-slate-750'
                          }`}
                        >
                          {showPrismDispersion ? '🌈 Mode: Prism Spectrum (VIBGYOR Active)' : '💎 Switch to Prism White Light Dispersion'}
                        </button>
                      </div>
                    )}

                    {/* Controls for Slide 3: Lenses */}
                    {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'lenses' && (
                      <div className="space-y-4">
                        <div className="flex space-x-2">
                          {(['convex', 'concave'] as const).map((type) => (
                            <button
                              key={type}
                              onClick={() => {
                                setLensType(type);
                                audioManager.play('pickup');
                              }}
                              className={`flex-1 py-1.5 text-xs font-bold rounded-lg border capitalize transition-all ${
                                lensType === type
                                  ? 'bg-cyan-600 border-cyan-400 text-white'
                                  : 'bg-slate-800 border-slate-700 text-slate-400'
                              }`}
                            >
                              {type} Lens
                            </button>
                          ))}
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Object Distance from Lens (u):</span>
                            <span className="font-mono text-cyan-400 font-bold">{objectDistance} px</span>
                          </div>
                          <input
                            type="range"
                            min="60"
                            max="300"
                            value={objectDistance}
                            onChange={(e) => setObjectDistance(parseInt(e.target.value))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs text-slate-300 mb-1">
                            <span>Lens Focal Length (f):</span>
                            <span className="font-mono text-cyan-400 font-bold">{focalLength} px</span>
                          </div>
                          <input
                            type="range"
                            min="50"
                            max="150"
                            value={focalLength}
                            onChange={(e) => setFocalLength(parseInt(e.target.value))}
                            className="w-full accent-cyan-400 cursor-pointer"
                          />
                        </div>
                      </div>
                    )}

                    {/* Controls for Slide 4: Human Eye */}
                    {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'eye' && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-xs text-slate-300 block mb-1">Eye Condition Diagnostic:</label>
                          <div className="grid grid-cols-3 gap-2">
                            {(['normal', 'myopia', 'hypermetropia'] as const).map((cond) => (
                              <button
                                key={cond}
                                onClick={() => {
                                  setEyeCondition(cond);
                                  setCorrectivePower(0);
                                  audioManager.play('pickup');
                                }}
                                className={`py-1.5 text-[11px] rounded-lg font-bold capitalize border transition-all ${
                                  eyeCondition === cond
                                    ? 'bg-cyan-600 border-cyan-400 text-white'
                                    : 'bg-slate-800 border-slate-700 text-slate-400'
                                }`}
                              >
                                {cond}
                              </button>
                            ))}
                          </div>
                        </div>

                        {eyeCondition !== 'normal' && (
                          <div>
                            <div className="flex justify-between text-xs text-slate-300 mb-1">
                              <span>Corrective Eyeglass Lens Power:</span>
                              <span className="font-mono text-cyan-400 font-bold">
                                {correctivePower > 0 ? `+${correctivePower}` : correctivePower} D
                              </span>
                            </div>
                            <input
                              type="range"
                              min="-4"
                              max="4"
                              step="0.5"
                              value={correctivePower}
                              onChange={(e) => {
                                setCorrectivePower(parseFloat(e.target.value));
                                audioManager.play('tap');
                              }}
                              className="w-full accent-cyan-400 cursor-pointer"
                            />
                            <div className="flex justify-between text-[10px] text-slate-500 mt-1">
                              <span>-4 D (Concave / Myopia)</span>
                              <span>0 D (Plain)</span>
                              <span>+4 D (Convex / Hypermetropia)</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Controls for Slide 5: Braille */}
                    {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'braille' && (
                      <div className="space-y-3">
                        <span className="text-xs text-slate-300 font-semibold block">Quick Character Presets:</span>
                        <div className="flex flex-wrap gap-2">
                          {['A', 'B', 'C', 'L', 'LIGHT'].map((char) => (
                            <button
                              key={char}
                              onClick={() => setBraillePreset(char)}
                              className={`px-3 py-1 rounded-lg text-xs font-bold border ${
                                activeBrailleChar === char
                                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                                  : 'bg-slate-800 border-slate-700 text-slate-300'
                              }`}
                            >
                              Letter {char}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-4 p-3 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex items-center space-x-3">
                  <span className="text-xl">💡</span>
                  <p className="text-xs text-emerald-200">{TEACHING_SLIDES[currentSlideIndex].keyTakeaway}</p>
                </div>
              </div>

              {/* RIGHT 7 COLS: Canvas / Interactive Optical Physics Sandbox */}
              <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between shadow-xl min-h-[420px] relative overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                    Real-Time Ray Tracing Simulation Sandbox
                  </span>
                  <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
                    Physics Engine Active
                  </span>
                </div>

                {/* SVG SIMULATION DISPLAY */}
                <div className="flex-1 bg-slate-950 rounded-xl border border-slate-800/80 relative flex items-center justify-center p-2 overflow-hidden">
                  {/* DISPLAY 1: REFLECTION */}
                  {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'reflection' && (
                    <svg viewBox="0 0 500 300" className="w-full h-full max-h-[340px]">
                      {reflectionMode === 'plane' && (
                        <>
                          {/* Mirror Base */}
                          <line x1="50" y1="220" x2="450" y2="220" stroke="#94a3b8" strokeWidth="6" strokeLinecap="round" />
                          {/* Mirror Hatch lines */}
                          {Array.from({ length: 20 }).map((_, i) => (
                            <line
                              key={i}
                              x1={60 + i * 20}
                              y1="220"
                              x2={50 + i * 20}
                              y2="232"
                              stroke="#64748b"
                              strokeWidth="2"
                            />
                          ))}

                          {/* Normal Line */}
                          {showNormal && (
                            <line x1="250" y1="50" x2="250" y2="220" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />
                          )}

                          {/* Incident Ray */}
                          {(() => {
                            const rad = (incidentAngle * Math.PI) / 180;
                            const x1 = 250 - 160 * Math.sin(rad);
                            const y1 = 220 - 160 * Math.cos(rad);
                            return (
                              <>
                                <line x1={x1} y1={y1} x2="250" y2="220" stroke="#ef4444" strokeWidth="3" />
                                <polygon
                                  points={`${(x1 + 250) / 2},${(y1 + 220) / 2} ${(x1 + 250) / 2 - 6},${(y1 + 220) / 2 - 8} ${(x1 + 250) / 2 + 8},${(y1 + 220) / 2 - 2}`}
                                  fill="#ef4444"
                                />
                              </>
                            );
                          })()}

                          {/* Reflected Ray */}
                          {(() => {
                            const rad = (incidentAngle * Math.PI) / 180;
                            const x2 = 250 + 160 * Math.sin(rad);
                            const y2 = 220 - 160 * Math.cos(rad);
                            return (
                              <>
                                <line x1="250" y1="220" x2={x2} y2={y2} stroke="#3b82f6" strokeWidth="3" />
                                <polygon
                                  points={`${(250 + x2) / 2},${(220 + y2) / 2} ${(250 + x2) / 2 - 8},${(220 + y2) / 2 - 2} ${(250 + x2) / 2 + 6},${(220 + y2) / 2 - 8}`}
                                  fill="#3b82f6"
                                />
                              </>
                            );
                          })()}

                          {/* Angle Labels */}
                          <text x="215" y="160" fill="#ef4444" className="text-xs font-bold">
                            ∠i = {incidentAngle}°
                          </text>
                          <text x="260" y="160" fill="#3b82f6" className="text-xs font-bold">
                            ∠r = {incidentAngle}°
                          </text>
                          <text x="255" y="70" fill="#f59e0b" className="text-[10px]">
                            Normal (90°)
                          </text>
                        </>
                      )}

                      {reflectionMode === 'periscope' && (
                        <>
                          <text x="170" y="30" fill="#38bdf8" className="text-xs font-bold">
                            Submarine Periscope (Two Parallel 45° Mirrors)
                          </text>
                          {/* Tube Outer */}
                          <path
                            d="M 120 50 L 260 50 L 260 200 L 380 200 L 380 240 L 220 240 L 220 90 L 120 90 Z"
                            fill="#1e293b"
                            stroke="#475569"
                            strokeWidth="3"
                          />
                          {/* Top Mirror at 45° */}
                          <line x1="220" y1="50" x2="260" y2="90" stroke="#38bdf8" strokeWidth="5" />
                          {/* Bottom Mirror at 45° */}
                          <line x1="220" y1="200" x2="260" y2="240" stroke="#38bdf8" strokeWidth="5" />
                          {/* Ray Path */}
                          <path d="M 60 70 L 240 70 L 240 220 L 440 220" fill="none" stroke="#ef4444" strokeWidth="3" strokeDasharray="6,3" />
                          <circle cx="240" cy="70" r="4" fill="#f59e0b" />
                          <circle cx="240" cy="220" r="4" fill="#f59e0b" />
                          <text x="70" y="60" fill="#ef4444" className="text-xs font-semibold">
                            Incoming Light
                          </text>
                          <text x="370" y="210" fill="#ef4444" className="text-xs font-semibold">
                            Viewer Eye
                          </text>
                        </>
                      )}

                      {reflectionMode === 'diffuse' && (
                        <>
                          {/* Rough Surface */}
                          <path
                            d="M 50 220 Q 80 210, 110 225 T 170 215 T 230 225 T 290 210 T 350 225 T 410 215 L 450 220"
                            fill="none"
                            stroke="#94a3b8"
                            strokeWidth="4"
                          />
                          {/* Parallel Incident Rays */}
                          <line x1="120" y1="60" x2="150" y2="218" stroke="#ef4444" strokeWidth="2" />
                          <line x1="180" y1="60" x2="210" y2="220" stroke="#ef4444" strokeWidth="2" />
                          <line x1="240" y1="60" x2="270" y2="215" stroke="#ef4444" strokeWidth="2" />
                          {/* Scattered Reflected Rays */}
                          <line x1="150" y1="218" x2="220" y2="80" stroke="#3b82f6" strokeWidth="2" />
                          <line x1="210" y1="220" x2="310" y2="100" stroke="#3b82f6" strokeWidth="2" />
                          <line x1="270" y1="215" x2="330" y2="70" stroke="#3b82f6" strokeWidth="2" />
                          <text x="140" y="40" fill="#ef4444" className="text-xs font-semibold">
                            Parallel Incident Rays
                          </text>
                          <text x="270" y="40" fill="#3b82f6" className="text-xs font-semibold">
                            Scattered Reflected Rays
                          </text>
                          <text x="170" y="260" fill="#94a3b8" className="text-xs">
                            Irregular Rough Surface
                          </text>
                        </>
                      )}
                    </svg>
                  )}

                  {/* DISPLAY 2: REFRACTION & PRISM */}
                  {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'refraction' && (
                    <svg viewBox="0 0 500 300" className="w-full h-full max-h-[340px]">
                      {!showPrismDispersion ? (
                        <>
                          {/* Air Medium Top */}
                          <rect x="50" y="40" width="400" height="100" fill="#0f172a" opacity="0.6" />
                          <text x="60" y="65" fill="#94a3b8" className="text-xs font-bold">
                            Medium 1: Air (n₁ = 1.00)
                          </text>

                          {/* Medium 2 Bottom */}
                          <rect x="50" y="140" width="400" height="120" fill="#0284c7" opacity="0.25" stroke="#0284c7" strokeWidth="2" />
                          <text x="60" y="165" fill="#38bdf8" className="text-xs font-bold">
                            Medium 2: {refractionMedium.toUpperCase()} (n₂ = {n2.toFixed(2)})
                          </text>

                          {/* Boundary Line */}
                          <line x1="50" y1="140" x2="450" y2="140" stroke="#38bdf8" strokeWidth="2" />
                          {/* Normal Line */}
                          <line x1="250" y1="50" x2="250" y2="240" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4,4" />

                          {/* Incident Ray */}
                          {(() => {
                            const rad = (refractionIncAngle * Math.PI) / 180;
                            const x1 = 250 - 90 * Math.sin(rad);
                            const y1 = 140 - 90 * Math.cos(rad);
                            return <line x1={x1} y1={y1} x2="250" y2="140" stroke="#f43f5e" strokeWidth="3" />;
                          })()}

                          {/* Refracted Ray */}
                          {(() => {
                            const x2 = 250 + 90 * Math.sin(refAngleRad);
                            const y2 = 140 + 90 * Math.cos(refAngleRad);
                            return <line x1="250" y1="140" x2={x2} y2={y2} stroke="#10b981" strokeWidth="3" />;
                          })()}

                          <text x="210" y="100" fill="#f43f5e" className="text-xs font-bold">
                            ∠i = {refractionIncAngle}°
                          </text>
                          <text x="260" y="180" fill="#10b981" className="text-xs font-bold">
                            ∠r = {refAngleDeg.toFixed(1)}°
                          </text>
                        </>
                      ) : (
                        <>
                          {/* Glass Prism */}
                          <polygon points="250,50 140,230 360,230" fill="#38bdf8" opacity="0.25" stroke="#38bdf8" strokeWidth="3" />
                          <text x="235" y="160" fill="#38bdf8" className="text-xs font-bold">
                            Glass Prism
                          </text>

                          {/* White Light Incident */}
                          <line x1="60" y1="180" x2="195" y2="140" stroke="#ffffff" strokeWidth="4" />
                          <text x="70" y="170" fill="#ffffff" className="text-xs font-bold">
                            White Light Beam
                          </text>

                          {/* VIBGYOR Spectrum Dispersed Rays */}
                          {[
                            { color: '#8b5cf6', label: 'V' }, // Violet
                            { color: '#4c1d95', label: 'I' },
                            { color: '#2563eb', label: 'B' },
                            { color: '#10b981', label: 'G' },
                            { color: '#f59e0b', label: 'Y' },
                            { color: '#f97316', label: 'O' },
                            { color: '#ef4444', label: 'R' }, // Red (bends least)
                          ].map((item, idx) => {
                            const yEnd = 130 + idx * 16;
                            return (
                              <g key={idx}>
                                <line x1="195" y1="140" x2="305" y2={145 + idx * 4} stroke={item.color} strokeWidth="2" />
                                <line x1="305" y1={145 + idx * 4} x2="440" y2={yEnd} stroke={item.color} strokeWidth="2.5" />
                              </g>
                            );
                          })}
                          <text x="445" y="135" fill="#ef4444" className="text-[10px] font-bold">
                            Red (Least Bending)
                          </text>
                          <text x="445" y="235" fill="#8b5cf6" className="text-[10px] font-bold">
                            Violet (Most Bending)
                          </text>
                        </>
                      )}
                    </svg>
                  )}

                  {/* DISPLAY 3: LENSES & RAY TRACING */}
                  {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'lenses' && (
                    <svg viewBox="0 0 500 300" className="w-full h-full max-h-[340px]">
                      {/* Principal Axis */}
                      <line x1="20" y1="150" x2="480" y2="150" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4,4" />

                      {/* Lens Center Line */}
                      <line x1="250" y1="40" x2="250" y2="260" stroke="#94a3b8" strokeWidth="1" strokeDasharray="2,2" />

                      {/* Lens Shape */}
                      {lensType === 'convex' ? (
                        <path d="M 250 40 Q 280 150 250 260 Q 220 150 250 40 Z" fill="#38bdf8" opacity="0.3" stroke="#38bdf8" strokeWidth="3" />
                      ) : (
                        <path
                          d="M 235 40 L 265 40 Q 250 150 265 260 L 235 260 Q 250 150 235 40 Z"
                          fill="#38bdf8"
                          opacity="0.3"
                          stroke="#38bdf8"
                          strokeWidth="3"
                        />
                      )}

                      {/* Focus Points F1 and F2 */}
                      <circle cx={250 - focalLength} cy="150" r="4" fill="#f59e0b" />
                      <circle cx={250 + focalLength} cy="150" r="4" fill="#f59e0b" />
                      <text x={250 - focalLength - 8} y="170" fill="#f59e0b" className="text-[10px] font-bold">
                        F1
                      </text>
                      <text x={250 + focalLength - 8} y="170" fill="#f59e0b" className="text-[10px] font-bold">
                        F2
                      </text>

                      {/* Object Arrow (Left) */}
                      {(() => {
                        const objX = 250 - objectDistance;
                        const objY = 150 - objectHeight;
                        return (
                          <g>
                            <line x1={objX} y1="150" x2={objX} y2={objY} stroke="#ef4444" strokeWidth="4" />
                            <polygon points={`${objX},${objY - 8} ${objX - 6},${objY} ${objX + 6},${objY}`} fill="#ef4444" />
                            <text x={objX - 15} y="145" fill="#ef4444" className="text-[10px] font-bold">
                              Object
                            </text>
                          </g>
                        );
                      })()}

                      {/* Image Arrow & Key Rays for Convex Lens */}
                      {lensType === 'convex' && isFinite(vVal) && (
                        <>
                          {/* Ray 1: Parallel to axis, refracts through F2 */}
                          <line x1={250 - objectDistance} y1={150 - objectHeight} x2="250" y2={150 - objectHeight} stroke="#38bdf8" strokeWidth="2" />
                          <line x1="250" y1={150 - objectHeight} x2={250 + vVal} y2={150 + imageHeight} stroke="#38bdf8" strokeWidth="2" />

                          {/* Ray 2: Through optical center (250, 150) */}
                          <line
                            x1={250 - objectDistance}
                            y1={150 - objectHeight}
                            x2={250 + vVal}
                            y2={150 + imageHeight}
                            stroke="#10b981"
                            strokeWidth="2"
                          />

                          {/* Formed Image */}
                          {(() => {
                            const imgX = 250 + vVal;
                            const imgY = 150 + imageHeight;
                            return (
                              <g>
                                <line x1={imgX} y1="150" x2={imgX} y2={imgY} stroke="#a855f7" strokeWidth="3" strokeDasharray={vVal < 0 ? '4,4' : undefined} />
                                <text x={imgX - 15} y={imgY + (imageHeight > 0 ? 15 : -10)} fill="#a855f7" className="text-[10px] font-bold">
                                  Image ({vVal > 0 ? 'Real' : 'Virtual'})
                                </text>
                              </g>
                            );
                          })()}
                        </>
                      )}
                    </svg>
                  )}

                  {/* DISPLAY 4: HUMAN EYE DIAGRAM */}
                  {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'eye' && (
                    <svg viewBox="0 0 500 300" className="w-full h-full max-h-[340px]">
                      {/* Eyeball Contour */}
                      <path d="M 230 60 A 90 90 0 1 1 230 240 Q 180 200 170 150 Q 180 100 230 60 Z" fill="#0f172a" stroke="#475569" strokeWidth="4" />

                      {/* Retina Layer */}
                      <path d="M 240 65 A 85 85 0 0 1 240 235" fill="none" stroke="#f43f5e" strokeWidth="4" />
                      <text x="320" y="255" fill="#f43f5e" className="text-xs font-bold">
                        Retina Screen (x=350)
                      </text>

                      {/* Cornea / Crystalline Eye Lens */}
                      <ellipse cx="200" cy="150" rx="12" ry="35" fill="#38bdf8" opacity="0.4" stroke="#38bdf8" strokeWidth="2" />
                      <text x="185" y="100" fill="#38bdf8" className="text-[10px] font-bold">
                        Eye Lens
                      </text>

                      {/* Corrective Spectacle Lens (if active) */}
                      {eyeCondition !== 'normal' && correctivePower !== 0 && (
                        <g>
                          {correctivePower < 0 ? (
                            <path d="M 120 110 Q 128 150 120 190 L 128 190 Q 134 150 128 110 Z" fill="#a855f7" opacity="0.5" stroke="#a855f7" strokeWidth="2" />
                          ) : (
                            <ellipse cx="125" cy="150" rx="6" ry="38" fill="#a855f7" opacity="0.5" stroke="#a855f7" strokeWidth="2" />
                          )}
                          <text x="90" y="95" fill="#a855f7" className="text-[10px] font-bold">
                            Glasses ({correctivePower} D)
                          </text>
                        </g>
                      )}

                      {/* Incident Light Rays into Eye */}
                      <line x1="40" y1="120" x2="200" y2="135" stroke="#f59e0b" strokeWidth="2" />
                      <line x1="40" y1="180" x2="200" y2="165" stroke="#f59e0b" strokeWidth="2" />

                      {/* Rays converging inside eye to focal point */}
                      {(() => {
                        const targetFocalX = 350 + eyeFocusOffset;
                        return (
                          <>
                            <line x1="200" y1="135" x2={targetFocalX} y2="150" stroke="#f59e0b" strokeWidth="2" />
                            <line x1="200" y1="165" x2={targetFocalX} y2="150" stroke="#f59e0b" strokeWidth="2" />
                            <circle cx={targetFocalX} cy="150" r="5" fill={isEyeFocused ? '#10b981' : '#ef4444'} />
                          </>
                        );
                      })()}

                      {/* Status Focus Banner */}
                      <rect x="180" y="20" width="220" height="30" rx="8" fill="#1e293b" stroke="#334155" />
                      <text x="190" y="40" fill={isEyeFocused ? '#10b981' : '#f59e0b'} className="text-xs font-bold">
                        {isEyeFocused ? '✓ Sharp Focus directly on Retina!' : `⚠️ Focus point offset: ${eyeFocusOffset} px`}
                      </text>
                    </svg>
                  )}

                  {/* DISPLAY 5: BRAILLE CELL INTERACTIVE */}
                  {TEACHING_SLIDES[currentSlideIndex].interactiveMode === 'braille' && (
                    <div className="flex flex-col items-center justify-center space-y-4 py-4">
                      <h4 className="text-sm font-bold text-slate-300">
                        Interactive 6-Dot Braille Cell (Click dots to toggle)
                      </h4>
                      <div className="grid grid-cols-2 gap-6 bg-slate-900 p-6 rounded-2xl border border-slate-700 shadow-inner">
                        {brailleGrid.map((active, idx) => (
                          <button
                            key={idx}
                            onClick={() => toggleBrailleDot(idx)}
                            className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-mono font-bold text-sm transition-all transform active:scale-90 ${
                              active
                                ? 'bg-amber-400 border-amber-200 text-slate-950 shadow-lg shadow-amber-400/40 scale-105'
                                : 'bg-slate-800 border-slate-600 text-slate-500 hover:border-slate-400'
                            }`}
                          >
                            {idx + 1}
                          </button>
                        ))}
                      </div>
                      <p className="text-xs text-slate-400 text-center max-w-md">
                        Active Pattern: <strong className="text-amber-400">{activeBrailleChar}</strong> • Dot positions (1-3 left, 4-6 right) allow visually impaired individuals to read tactile text!
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Navigation Buttons */}
                <div className="flex justify-between items-center mt-3 pt-2 border-t border-slate-800">
                  <button
                    disabled={currentSlideIndex === 0}
                    onClick={() => {
                      setCurrentSlideIndex((prev) => prev - 1);
                      audioManager.play('tap');
                    }}
                    className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold disabled:opacity-40"
                  >
                    ← Previous Slide
                  </button>

                  <span className="text-xs text-slate-400 font-mono">
                    Slide {currentSlideIndex + 1} / {TEACHING_SLIDES.length}
                  </span>

                  <button
                    onClick={() => {
                      if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                        setCurrentSlideIndex((prev) => prev + 1);
                        audioManager.play('tap');
                      } else {
                        setPhase('arena');
                        audioManager.play('swoop');
                      }
                    }}
                    className="px-4 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold shadow-md shadow-cyan-600/30"
                  >
                    {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Slide →' : 'Start Challenges →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─── PHASE 4: CHALLENGE ARENA ─── */}
        {phase === 'arena' && (
          <div className="max-w-4xl mx-auto my-auto w-full space-y-6 py-4">
            {/* Challenge Progress Header */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between shadow-lg">
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 rounded-lg bg-cyan-950 border border-cyan-700 text-cyan-400 flex items-center justify-center font-bold text-sm">
                  {currentChallengeIndex + 1}
                </span>
                <div>
                  <h4 className="text-sm font-bold text-white">Diagnostic Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</h4>
                  <p className="text-xs text-slate-400">Node Ref: <code className="text-cyan-400">{CHALLENGES[currentChallengeIndex].nodeId}</code></p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-400">Difficulty:</span>
                <span className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${
                  CHALLENGES[currentChallengeIndex].difficulty === 'foundation'
                    ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                    : CHALLENGES[currentChallengeIndex].difficulty === 'standard'
                    ? 'bg-amber-950 text-amber-400 border border-amber-800'
                    : 'bg-rose-950 text-rose-400 border border-rose-800'
                }`}>
                  {CHALLENGES[currentChallengeIndex].difficulty}
                </span>
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl relative">
              <h3 className="text-lg font-bold text-white mb-6 leading-relaxed">
                {CHALLENGES[currentChallengeIndex].question}
              </h3>

              {/* Classify / Choice Inputs */}
              {(CHALLENGES[currentChallengeIndex].type === 'classify' || CHALLENGES[currentChallengeIndex].type === 'match') && (
                <div className="space-y-3 mb-6">
                  {CHALLENGES[currentChallengeIndex].options?.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={challengeAnswered}
                      onClick={() => {
                        setSelectedOption(idx);
                        audioManager.play('tap');
                      }}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        selectedOption === idx
                          ? challengeAnswered
                            ? idx === CHALLENGES[currentChallengeIndex].correctIndex
                              ? 'bg-emerald-950 border-emerald-500 text-emerald-200'
                              : 'bg-rose-950 border-rose-500 text-rose-200'
                            : 'bg-cyan-950 border-cyan-500 text-cyan-200 shadow-md shadow-cyan-500/10'
                          : 'bg-slate-800/60 hover:bg-slate-800 border-slate-700/80 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-slate-700/80 flex items-center justify-center text-xs text-slate-300 font-bold shrink-0 mt-0.5">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Numeric Input */}
              {CHALLENGES[currentChallengeIndex].type === 'numeric' && (
                <div className="mb-6 space-y-3">
                  <label className="text-xs text-slate-400 block">Enter numerical calculation answer:</label>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      disabled={challengeAnswered}
                      value={numericAnswer}
                      onChange={(e) => setNumericAnswer(e.target.value)}
                      placeholder="e.g. 60"
                      className="bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white font-mono font-bold text-lg focus:outline-none focus:border-cyan-500 w-48"
                    />
                    <span className="text-slate-300 font-semibold text-sm">
                      {CHALLENGES[currentChallengeIndex].unit}
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              {!challengeAnswered ? (
                <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                  <button
                    onClick={() => {
                      const hint = CHALLENGES[currentChallengeIndex].hints[0];
                      setCurrentHint(hint);
                      setShowHint(true);
                      audioManager.play('hint');
                    }}
                    className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center space-x-1"
                  >
                    <span>💡 Request Hint</span>
                  </button>
                  <button
                    disabled={
                      (CHALLENGES[currentChallengeIndex].type === 'numeric' && !numericAnswer) ||
                      ((CHALLENGES[currentChallengeIndex].type === 'classify' || CHALLENGES[currentChallengeIndex].type === 'match') &&
                        selectedOption === null)
                    }
                    onClick={handleAnswerChallenge}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 disabled:bg-slate-800 disabled:text-slate-600 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
                  >
                    Submit Diagnostics →
                  </button>
                </div>
              ) : (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4 pt-4 border-t border-slate-800">
                  <div className={`p-4 rounded-xl border ${
                    isChallengeCorrect ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200' : 'bg-rose-950/80 border-rose-500 text-rose-200'
                  }`}>
                    <div className="flex items-center space-x-2 font-bold text-sm mb-1">
                      <span>{isChallengeCorrect ? '✓ Diagnostics Verified Correct!' : '❌ Incorrect Calibration'}</span>
                    </div>
                    <p className="text-xs leading-relaxed opacity-90">
                      {CHALLENGES[currentChallengeIndex].explanation}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button
                      onClick={handleNextChallenge}
                      className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all"
                    >
                      {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Mission Mastery Report →'}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        )}

        {/* ─── PHASE 5: SUMMARY & MASTERY REPORT ─── */}
        {phase === 'summary' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="max-w-4xl mx-auto my-auto w-full space-y-6 py-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl text-center relative overflow-hidden">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-emerald-400 to-cyan-500 mx-auto flex items-center justify-center text-3xl shadow-lg shadow-emerald-500/30 mb-4">
                🏆
              </div>
              <h2 className="text-3xl font-extrabold text-white mb-2">ISRO Telescope Optics Calibrated!</h2>
              <p className="text-slate-300 text-sm max-w-lg mx-auto mb-6">
                You have mastered Class 8 CBSE Physics Light concepts including reflection laws, refraction, lens optics, vision defects, and Braille tactile system.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Total Score</span>
                  <span className="text-3xl font-mono font-bold text-amber-400">{score}</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">BKT Mastery Level</span>
                  <span className="text-3xl font-mono font-bold text-cyan-400">{(overallMastery * 100).toFixed(0)}%</span>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <span className="text-xs text-slate-400 uppercase font-semibold block mb-1">Nodes Verified</span>
                  <span className="text-3xl font-mono font-bold text-emerald-400">{ALL_NODE_IDS.length} / 19</span>
                </div>
              </div>

              {/* Misconceptions Checklist Summary */}
              <div className="text-left bg-slate-950 p-6 rounded-xl border border-slate-800 mb-8">
                <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-4">
                  🧠 Key Physics Concepts & Misconceptions Cleared:
                </h4>
                <div className="space-y-3">
                  {MISCONCEPTIONS_CHECKLIST.map((item, idx) => (
                    <div key={idx} className="p-3 bg-slate-900 rounded-lg border border-slate-800/80 text-xs">
                      <span className="text-rose-400 line-through block mb-0.5">Misconception: {item.misconception}</span>
                      <span className="text-emerald-300 font-semibold">✓ Physics Fact: {item.correction}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => {
                    setPhase('teach');
                    setCurrentSlideIndex(0);
                    audioManager.play('swoop');
                  }}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-sm rounded-xl transition-all"
                >
                  🔄 Revisit Physics Lab
                </button>
                <button
                  onClick={() => {
                    setPhase('arena');
                    setCurrentChallengeIndex(0);
                    audioManager.play('swoop');
                  }}
                  className="px-6 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-cyan-600/30 transition-all"
                >
                  🎯 Replay Diagnostic Challenges
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}