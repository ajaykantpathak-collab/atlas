'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_PHY_001 = 'c7_phy_cbse_001'; // Rectilinear propagation of light
const NODE_C7_PHY_002 = 'c7_phy_cbse_002'; // Pinhole camera & shadows
const NODE_C7_PHY_003 = 'c7_phy_cbse_003'; // Reflection of light & laws of reflection
const NODE_C7_PHY_004 = 'c7_phy_cbse_004'; // Regular vs Diffuse reflection
const NODE_C7_PHY_005 = 'c7_phy_cbse_005'; // Plane mirror image formation & characteristics
const NODE_C7_PHY_007 = 'c7_phy_cbse_007'; // Lateral inversion in plane mirrors
const NODE_C7_PHY_008 = 'c7_phy_cbse_008'; // Introduction to spherical mirrors (concave/convex)
const NODE_C7_PHY_009 = 'c7_phy_cbse_009'; // Focus & Center of curvature
const NODE_C7_PHY_010 = 'c7_phy_cbse_010'; // Concave mirror ray diagrams & images (real vs virtual)
const NODE_C7_PHY_011 = 'c7_phy_cbse_011'; // Convex mirror characteristics & rear-view mirror applications
const NODE_C7_PHY_012 = 'c7_phy_cbse_012'; // Lenses (convex converging & concave diverging)
const NODE_C7_PHY_013 = 'c7_phy_cbse_013'; // Image formation by convex lens & magnifying glass
const NODE_C7_PHY_014 = 'c7_phy_cbse_014'; // Prism & Dispersion of light (spectrum of white light)
const NODE_C7_PHY_015 = 'c7_phy_cbse_015'; // Newton's color disc (recombination of colors)

const ALL_NODE_IDS = [
  NODE_C7_PHY_001,
  NODE_C7_PHY_002,
  NODE_C7_PHY_003,
  NODE_C7_PHY_004,
  NODE_C7_PHY_005,
  NODE_C7_PHY_007,
  NODE_C7_PHY_008,
  NODE_C7_PHY_009,
  NODE_C7_PHY_010,
  NODE_C7_PHY_011,
  NODE_C7_PHY_012,
  NODE_C7_PHY_013,
  NODE_C7_PHY_014,
  NODE_C7_PHY_015,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission Photon: ISRO Space Telescope & Solar Optics Laboratory',
  intro: 'Welcome Chief Optical Engineer! The INSAT-4G solar imaging satellite and deep-space observatory payload are undergoing pre-launch optical calibration. Your goal is to inspect rectilinear light beams, align reflecting mirrors, calibrate concave solar concentrators, correct lens aberrations, and analyze white light dispersion using prisms and high-speed color discs.',
  context: 'Manipulate light rays, mirrors, lenses, pinhole cameras, and prisms in real time to master geometrical optics and optics hardware.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'If you shine a narrow beam of sunlight onto a triangular glass prism, what happens to the emerging light on the screen?',
  options: [
    'It turns into a sharp monochromatic laser beam.',
    'It splits into a vibrant rainbow band of seven colors ranging from Red to Violet.',
    'It bounces completely backwards like a silver mirror.',
    'It gets absorbed completely, producing a dark shadow.',
  ],
  correctIndex: 1,
  explanation: 'White sunlight is a mixture of seven colors. Glass refracts different colors by slightly different angles, causing white light to disperse into a spectrum (VIBGYOR).',
  hintAfter: 'Think about what causes natural rainbows after rain showers!',
};

// ─── TEACHING SLIDES ───
const TEACHING_SLIDES = [
  {
    id: 'slide_1',
    nodeId: NODE_C7_PHY_001,
    title: '1. Rectilinear Propagation & Pinhole Camera',
    subtitle: 'Light travels in straight paths',
    content: 'Light always travels along straight lines in a uniform medium. This fundamental property is called rectilinear propagation. A pinhole camera forms an upside-down (inverted) real image because rays crossing through a tiny hole travel straight from the top and bottom of the object to opposite sides of the screen.',
    keyFormula: 'Image Orientation: Inverted (Real)',
    visualType: 'pinhole',
  },
  {
    id: 'slide_2',
    nodeId: NODE_C7_PHY_003,
    title: '2. Reflection & Laws of Light',
    subtitle: 'Angle of Incidence = Angle of Reflection',
    content: 'When light hits a smooth polished surface, it bounces back. The Law of Reflection states that the Angle of Incidence (∠i) is ALWAYS equal to the Angle of Reflection (∠r). Both rays and the Normal line lie on the same plane.',
    keyFormula: '∠i = ∠r',
    visualType: 'reflection',
  },
  {
    id: 'slide_3',
    nodeId: NODE_C7_PHY_005,
    title: '3. Plane Mirrors & Lateral Inversion',
    subtitle: 'Virtual, erect, and left-right swapped',
    content: 'A plane mirror forms an image that is virtual (cannot be caught on a screen), erect, and the same size as the object. The distance of the image behind the mirror equals the distance of the object in front. In lateral inversion, your right hand appears as the image’s left hand!',
    keyFormula: 'Distance Object = Distance Image',
    visualType: 'planeMirror',
  },
  {
    id: 'slide_4',
    nodeId: NODE_C7_PHY_010,
    title: '4. Spherical Mirrors: Concave & Convex',
    subtitle: 'Converging vs Diverging curved surfaces',
    content: 'Concave mirrors curve inwards like a spoon bowl and CONVERGE light rays to a Focus (F). They can form real inverted images (or magnified virtual images when close). Convex mirrors bulge outwards, DIVERGE light rays, and always form diminished virtual erect images with a wide field of view (ideal for car rear-view mirrors!).',
    keyFormula: 'Focus (f) = Radius of Curvature (R) / 2',
    visualType: 'sphericalMirror',
  },
  {
    id: 'slide_5',
    nodeId: NODE_C7_PHY_014,
    title: '5. Lenses, Dispersion & Newton’s Disc',
    subtitle: 'Splitting white light and recombining spectrum',
    content: 'Convex lenses converge parallel rays to focus light (used as magnifying glasses). Concave lenses diverge light rays. A glass prism separates white light into 7 colors (VIBGYOR) via dispersion. Rapidly spinning a Newton’s disc with seven colors recombines them into white due to persistence of vision!',
    keyFormula: 'Spectrum: Red (least bent) to Violet (most bent)',
    visualType: 'dispersion',
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_1',
    concept: 'Virtual Image on Screen',
    misconception: 'Believing virtual images formed by plane or convex mirrors can be projected on a paper screen.',
    truth: 'Virtual images are formed where light rays only appear to meet when produced backwards; they cannot be captured on a physical screen.',
  },
  {
    id: 'misc_2',
    concept: 'Prism Adds Color',
    misconception: 'Thinking a glass prism paints or colors white light.',
    truth: 'The glass prism does not add color. White light ALREADY contains all seven colors, which bend at different angles due to different speeds in glass.',
  },
  {
    id: 'misc_3',
    concept: 'Convex Mirror Image Size',
    misconception: 'Expecting a convex mirror to magnify objects.',
    truth: 'Convex mirrors ALWAYS form virtual, erect, and DIMINISHED (smaller) images, giving a wide view of distant traffic.',
  },
  {
    id: 'misc_4',
    concept: 'Light Rays Bending in Straight Air',
    misconception: 'Thinking light naturally curves around obstacles without reflection or refraction.',
    truth: 'Light travels in strictly straight lines in a homogeneous medium (rectilinear propagation).',
  },
  {
    id: 'misc_5',
    concept: 'Newton Disc Magic',
    misconception: 'Thinking Newton’s disc changes physical paints into white chemicals when rotated.',
    truth: 'The colors recombine optically in the human eye due to persistence of vision when spun faster than 16 frames per second.',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'distinguish' | 'match' | 'numeric' | 'multiple-choice';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hints: string[];
  misconceptionIndex?: number;
  unit?: string;
  targetValue?: number;
  tolerance?: number;
}

// ─── 10 PROGRESSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_1',
    nodeId: NODE_C7_PHY_001,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Three cardboards with small central holes are aligned in a straight line. Light from a candle flame is visible only when all three holes are perfectly aligned. Which property of light does this prove?',
    options: [
      'Dispersion of light into colors',
      'Rectilinear propagation of light',
      'Lateral inversion of light',
      'Diffraction around sharp edges',
    ],
    correctIndex: 1,
    explanation: 'Because light travels strictly along straight lines (rectilinear propagation), rays can only pass through all three pinholes when they form an unbroken straight line.',
    hints: ['Think about whether light can curve around shifted cardboard holes.'],
  },
  {
    id: 'ch_2',
    nodeId: NODE_C7_PHY_003,
    type: 'numeric',
    difficulty: 'foundation',
    competencyLevel: 'application',
    question: 'A laser ray strikes a flat polished mirror at an angle of 35° with respect to the normal line. What is the angle of reflection (∠r)?',
    options: ['35°', '55°', '70°', '90°'],
    correctIndex: 0,
    targetValue: 35,
    tolerance: 0,
    unit: 'degrees',
    explanation: 'According to the first Law of Reflection, the angle of reflection equals the angle of incidence (∠i = ∠r = 35°).',
    hints: ['Law of Reflection states ∠i = ∠r.'],
  },
  {
    id: 'ch_3',
    nodeId: NODE_C7_PHY_007,
    type: 'multiple-choice',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Why is the word "AMBULANCE" printed backwards (𝛇ƆИA⅃U𝛁MA) on the front of emergency vehicles?',
    options: [
      'It is a military code for high-speed sirens.',
      'Drivers viewing it in their rear-view mirror will see it laterally inverted into correct readable order.',
      'It increases light reflection during night driving.',
      'It prevents diffraction shadows from wind deflection.',
    ],
    correctIndex: 1,
    explanation: 'Plane and convex rear-view mirrors reverse left and right (lateral inversion). Pre-inverting the lettering allows drivers ahead to read "AMBULANCE" normally in their mirrors.',
    hints: ['Think about what happens when you raise your right hand in front of a mirror!'],
    misconceptionIndex: 0,
  },
  {
    id: 'ch_4',
    nodeId: NODE_C7_PHY_008,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A dentist uses a small curved handheld mirror to inspect a patient’s tooth, obtaining an enlarged erect view. What mirror type is this and why?',
    options: [
      'Convex mirror because it bends rays outwards.',
      'Concave mirror because when held very close (object within focus), it produces a virtual, erect, and magnified image.',
      'Plane mirror coated with blue optical gel.',
      'Concave mirror because it produces an inverted real shadow on the gums.',
    ],
    correctIndex: 1,
    explanation: 'When an object is placed closer than the principal focus (u < f) of a concave mirror, it creates a virtual, erect, and enlarged image, making tiny tooth cavities easy to examine!',
    hints: ['Which spherical mirror can form magnified erect images when very close?'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_5',
    nodeId: NODE_C7_PHY_009,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A concave solar concentrator dish has a radius of curvature of 80 cm. At what distance from the mirror center should the satellite heat collector tube be placed to absorb maximum focused solar energy?',
    options: ['160 cm', '80 cm', '40 cm', '20 cm'],
    correctIndex: 2,
    targetValue: 40,
    tolerance: 0,
    unit: 'cm',
    explanation: 'Parallel sunlight rays converge at the principal focus. The focal length f = R / 2 = 80 cm / 2 = 40 cm.',
    hints: ['Focal length is half of the radius of curvature (f = R / 2).'],
  },
  {
    id: 'ch_6',
    nodeId: NODE_C7_PHY_011,
    type: 'classify',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'Why are convex mirrors preferred over plane mirrors as side rear-view mirrors in cars and ISRO lunar rovers?',
    options: [
      'They produce real inverted images of distant obstacles.',
      'They form smaller (diminished) erect images, providing a much wider field of view for the driver.',
      'They absorb excess sunlight to eliminate glare.',
      'They invert colors to make objects visible at night.',
    ],
    correctIndex: 1,
    explanation: 'Convex mirrors curve outwards, producing diminished erect virtual images. This allows the driver to see a much broader area behind the vehicle than a flat plane mirror would show.',
    hints: ['Think about field of view and whether the image needs to stay erect.'],
    misconceptionIndex: 2,
  },
  {
    id: 'ch_7',
    nodeId: NODE_C7_PHY_012,
    type: 'multiple-choice',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'A student holds a lens in sunlight and focuses a bright tiny spot onto a piece of paper until it begins to smoke and burn. What type of lens is this and what is that bright spot?',
    options: [
      'Concave diverging lens; the spot is a virtual image of the paper.',
      'Convex converging lens; the spot is the real image of the Sun formed at the principal focus.',
      'Plane glass slab; the spot is a reflected highlight.',
      'Cylindrical prism; the spot is violet monochromatic laser.',
    ],
    correctIndex: 1,
    explanation: 'A convex lens converges parallel rays of sunlight to a single point called the principal focus (F). The concentrated light and heat energy burn the paper.',
    hints: ['Parallel rays converge to a single focal point using a converging lens.'],
  },
  {
    id: 'ch_8',
    nodeId: NODE_C7_PHY_014,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'understanding',
    question: 'When white sunlight passes through a glass prism, which color of light bends (refracts) the MOST and which bends the LEAST?',
    options: [
      'Red bends most, Violet bends least.',
      'Violet bends most, Red bends least.',
      'Green bends most, Yellow bends least.',
      'All colors bend by the exact same angle.',
    ],
    correctIndex: 1,
    explanation: 'In glass, violet light slows down the most and undergoes maximum deviation (bends most). Red light slows down the least and undergoes minimum deviation (bends least).',
    hints: ['Remember VIBGYOR order: Violet is at the bottom of the spectrum!'],
    misconceptionIndex: 1,
  },
  {
    id: 'ch_9',
    nodeId: NODE_C7_PHY_015,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A disc painted with seven sector colors (VIBGYOR) is rotated rapidly at 2000 RPM. What color does the disc appear to human eyes, and what principle explains this?',
    options: [
      'It appears pitch black due to destructive wave interference.',
      'It appears off-white / light grey due to persistence of vision blending the rapid optical color signals in the retina.',
      'It flashes neon green because green light is in the middle of VIBGYOR.',
      'It turns transparent like clear glass.',
    ],
    correctIndex: 1,
    explanation: 'When the disc rotates faster than the eye can resolve individual images (persistence of vision, ~1/16th of a second), all seven rainbow colors blend together in the retina to produce white light.',
    hints: ['Sir Isaac Newton demonstrated white light recombination with this spinning disc.'],
    misconceptionIndex: 4,
  },
  {
    id: 'ch_10',
    nodeId: NODE_C7_PHY_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'In an optics lab experiment with a concave mirror of focal length f = 15 cm, an illuminated candle is placed 30 cm (at 2f or C) in front of the mirror. At what distance in front of the mirror should a screen be placed to capture the sharp real image?',
    options: ['15 cm', '30 cm', '45 cm', '60 cm'],
    correctIndex: 1,
    targetValue: 30,
    tolerance: 0,
    unit: 'cm',
    explanation: 'Using the mirror formula (1/f = 1/v + 1/u) with u = -30 and f = -15, 1/v = 1/(-15) - 1/(-30) = -1/30, so v = -30 cm. When an object is at the center of curvature C (2f), its real image is formed right at C!',
    hints: ['Object at C forms an inverted real image of equal size at C.'],
  },
];

// ─── MAIN COMPONENT ───
export default function C7_PhysicsLightReflectionMirrorsCBSESim() {
  // Navigation & Mode
  const [mode, setMode] = useState<'predict' | 'learn' | 'lab' | 'challenges' | 'mastery'>('predict');
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);

  // SRS & BKT Learning State
  const [bktState, setBktState] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [score, setScore] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<Set<string>>(new Set());

  // Interactivity feedback state
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 400, y: 300 });

  // Predict mode state
  const [predictSelected, setPredictSelected] = useState<number | null>(null);
  const [predictSubmitted, setPredictSubmitted] = useState(false);

  // Challenge selection state
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [numericAnswer, setNumericAnswer] = useState<string>('');
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; message: string } | null>(null);

  // ─── LAB SIMULATION STATES ───
  const [labTab, setLabTab] = useState<'pinhole' | 'reflection' | 'spherical' | 'lensPrism'>('spherical');

  // Lab A: Pinhole & Rectilinear
  const [pinholeDistance, setPinholeDistance] = useState(50); // cm
  const [pinholeSize, setPinholeSize] = useState(2); // mm
  const [objectHeight, setObjectHeight] = useState(40); // cm

  // Lab B: Reflection & Plane Mirror
  const [incidentAngle, setIncidentAngle] = useState(40); // degrees
  const [mirrorText, setMirrorText] = useState('ISRO 2025');

  // Lab C: Spherical Mirror
  const [mirrorType, setMirrorType] = useState<'concave' | 'convex'>('concave');
  const [focalLength, setFocalLength] = useState(20); // cm
  const [objectDist, setObjectDist] = useState(35); // cm from mirror

  // Lab D: Prism Dispersion & Newton Disc Canvas
  const [prismAngle, setPrismAngle] = useState(60);
  const [lightIntensity, setLightIntensity] = useState(80);
  const [discRPM, setDiscRPM] = useState(0);

  // Auto-hint timer (10s inactivity)
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    setShowHint(false);
    inactivityTimerRef.current = setTimeout(() => {
      if (mode === 'challenges') {
        const ch = CHALLENGES[currentChallengeIndex];
        setCurrentHint(ch.hints[0] || 'Take a close look at the ray diagrams or formulas.');
        setShowHint(true);
        audioManager.play('hint');
      }
    }, 10000);
  }, [mode, currentChallengeIndex]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [mode, currentChallengeIndex, resetInactivityTimer]);

  // Canvas Ref for Newton's Spinning Disc
  const discCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    let animId: number;
    let rotationAngle = 0;

    const renderDisc = () => {
      const canvas = discCanvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      const radius = Math.min(width, height) / 2 - 10;
      const cx = width / 2;
      const cy = height / 2;

      ctx.clearRect(0, 0, width, height);

      // Colors VIBGYOR
      const colors = ['#7f00ff', '#4b0082', '#0000ff', '#00ff00', '#ffff00', '#ff7f00', '#ff0000'];
      const sliceAngle = (2 * Math.PI) / colors.length;

      // Update rotation speed
      rotationAngle += (discRPM * Math.PI) / 300;

      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotationAngle);

      // If RPM is high (> 600 RPM), blend towards white / light grey due to persistence of vision
      if (discRPM > 600) {
        const blendFactor = Math.min(1, (discRPM - 600) / 1000);
        ctx.beginPath();
        ctx.arc(0, 0, radius, 0, 2 * Math.PI);
        const greyVal = Math.floor(220 + blendFactor * 30);
        ctx.fillStyle = `rgb(${greyVal}, ${greyVal}, ${greyVal})`;
        ctx.fill();
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 3;
        ctx.stroke();
      } else {
        for (let i = 0; i < colors.length; i++) {
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.arc(0, 0, radius, i * sliceAngle, (i + 1) * sliceAngle);
          ctx.closePath();
          ctx.fillStyle = colors[i];
          ctx.fill();
          ctx.strokeStyle = '#1e293b';
          ctx.lineWidth = 2;
          ctx.stroke();
        }
      }

      // Center spindle cap
      ctx.beginPath();
      ctx.arc(0, 0, 15, 0, 2 * Math.PI);
      ctx.fillStyle = '#0f172a';
      ctx.fill();
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.restore();

      if (discRPM > 0) {
        animId = requestAnimationFrame(renderDisc);
      }
    };

    renderDisc();

    return () => {
      if (animId) cancelAnimationFrame(animId);
    };
  }, [discRPM]);

  // Canvas Ref for Prism Refraction Spectrum
  const prismCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = prismCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    ctx.clearRect(0, 0, width, height);

    // Draw Dark Laboratory Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Prism coordinates
    const px1 = width * 0.5;
    const py1 = 50;
    const px2 = width * 0.35;
    const py2 = height - 60;
    const px3 = width * 0.65;
    const py3 = height - 60;

    // Glass Prism shape
    ctx.beginPath();
    ctx.moveTo(px1, py1);
    ctx.lineTo(px2, py2);
    ctx.lineTo(px3, py3);
    ctx.closePath();
    ctx.fillStyle = 'rgba(186, 230, 253, 0.25)';
    ctx.fill();
    ctx.strokeStyle = '#7dd3fc';
    ctx.lineWidth = 3;
    ctx.stroke();

    // Incident White Light Ray from left source
    const sourceX = 30;
    const sourceY = height * 0.65;
    const hitX = (px1 + px2) / 2;
    const hitY = (py1 + py2) / 2;

    // Light beam source flashlight
    ctx.beginPath();
    ctx.arc(sourceX, sourceY, 12, 0, Math.PI * 2);
    ctx.fillStyle = '#fef08a';
    ctx.fill();

    // White light ray beam
    const alphaVal = lightIntensity / 100;
    ctx.beginPath();
    ctx.moveTo(sourceX, sourceY);
    ctx.lineTo(hitX, hitY);
    ctx.strokeStyle = `rgba(255, 255, 255, ${alphaVal})`;
    ctx.lineWidth = 5;
    ctx.stroke();

    // Spectrum inside & exiting prism
    const colors = ['#ff0000', '#ff7f00', '#ffff00', '#00ff00', '#0000ff', '#4b0082', '#7f00ff'];
    const exitBaseX = (px1 + px3) / 2;
    const exitBaseY = (py1 + py3) / 2;

    colors.forEach((col, idx) => {
      const bendFactor = (idx + 1) * 4; // Violet bends more
      const exitY = exitBaseY + bendFactor - 14;

      // Inside prism path
      ctx.beginPath();
      ctx.moveTo(hitX, hitY);
      ctx.lineTo(exitBaseX, exitY);
      ctx.strokeStyle = col;
      ctx.lineWidth = 2;
      ctx.stroke();

      // Screen exit ray path
      const screenX = width - 40;
      const screenY = exitY + bendFactor * 2.5;

      ctx.beginPath();
      ctx.moveTo(exitBaseX, exitY);
      ctx.lineTo(screenX, screenY);
      ctx.strokeStyle = col;
      ctx.lineWidth = 3;
      ctx.stroke();

      // Screen glow dot
      ctx.beginPath();
      ctx.arc(screenX, screenY, 4, 0, Math.PI * 2);
      ctx.fillStyle = col;
      ctx.fill();
    });

    // White Light Screen on right
    ctx.fillStyle = '#334155';
    ctx.fillRect(width - 40, 40, 15, height - 80);
    ctx.strokeStyle = '#94a3b8';
    ctx.strokeRect(width - 40, 40, 15, height - 80);
  }, [prismAngle, lightIntensity]);

  // ─── CALCULATIONS FOR SPHERICAL MIRROR LAB ───
  const calculateSphericalMirror = useMemo(() => {
    const f = mirrorType === 'concave' ? -focalLength : focalLength;
    const u = -objectDist; // Cartesian sign convention

    // Mirror formula: 1/f = 1/v + 1/u => 1/v = 1/f - 1/u = (u - f) / (f * u) => v = (f * u) / (u - f)
    const v = (f * u) / (u - f);
    const m = -v / u; // Magnification
    const imageDist = Math.abs(v);
    const isReal = mirrorType === 'concave' && objectDist > focalLength;

    return {
      v,
      m,
      imageDist,
      isReal,
      isErect: m > 0,
      imageHeight: Math.min(120, Math.max(15, Math.abs(m) * 35)),
    };
  }, [mirrorType, focalLength, objectDist]);

  // ─── HANDLERS ───
  const handlePredictSubmit = () => {
    if (predictSelected === null) return;
    setPredictSubmitted(true);
    const isCorrect = predictSelected === DISCOVERY_QUESTION.correctIndex;
    if (isCorrect) {
      audioManager.play('success');
      speechManager.speak('Great intuition! Sunlight breaks down into a spectrum of seven colors.');
    } else {
      audioManager.play('error');
      speechManager.speak('Good attempt! Let us explore how light bends and splits through prisms.');
    }
  };

  const handleChallengeOptionSelect = (index: number) => {
    setSelectedOption(index);
    resetInactivityTimer();
    audioManager.play('tap');
  };

  const handleChallengeSubmit = () => {
    const currentCh = CHALLENGES[currentChallengeIndex];
    let isCorrect = false;

    if (currentCh.type === 'numeric') {
      const val = parseFloat(numericAnswer);
      if (!isNaN(val) && currentCh.targetValue !== undefined) {
        const tol = currentCh.tolerance || 0;
        isCorrect = Math.abs(val - currentCh.targetValue) <= tol;
      }
    } else {
      isCorrect = selectedOption === currentCh.correctIndex;
    }

    // SRS & BKT updates
    const currentBKT = bktState[currentCh.nodeId] || createBKTState();
    const newBKT = bktUpdate(currentBKT, isCorrect);
    setBktState((prev) => ({ ...prev, [currentCh.nodeId]: newBKT }));

    const reviewItem = createReviewItem(currentCh.nodeId, 'Physics');
    sm2Update(reviewItem, isCorrect ? 5 : 1, 0);

    if (isCorrect) {
      audioManager.play('drop-correct');
      audioManager.play('sparkle');
      speechManager.speak('Correct answer! Fantastic understanding of light optics.');
      setScore((prev) => prev + (currentCh.difficulty === 'advanced' ? 30 : currentCh.difficulty === 'standard' ? 20 : 10));
      setCompletedChallenges((prev) => new Set(prev).add(currentCh.id));
      setShowSparkle(true);
      setSparklePos({ x: 500, y: 300 });

      setChallengeFeedback({
        isCorrect: true,
        message: `Excellent! ${currentCh.explanation}`,
      });
    } else {
      audioManager.play('drop-wrong');
      speechManager.speak('Not quite right. Review the explanation and try again.');
      setChallengeFeedback({
        isCorrect: false,
        message: `Incorrect. ${currentCh.explanation}`,
      });
    }
  };

  const handleNextChallenge = () => {
    setSelectedOption(null);
    setNumericAnswer('');
    setChallengeFeedback(null);
    setShowHint(false);

    if (currentChallengeIndex < CHALLENGES.length - 1) {
      setCurrentChallengeIndex((prev) => prev + 1);
      audioManager.play('swoop');
    } else {
      // Completed all challenges!
      recordGameScore(ALL_NODE_IDS, score + 50);
      setShowConfetti(true);
      setShowSuccessBanner(true);
      audioManager.play('celebration');
      speechManager.speak('Congratulations! You have completed all ISRO Light & Optics Diagnostics!');
      setMode('mastery');
    }
  };

  // Compute Overall Mastery Level
  const overallMastery = useMemo(() => {
    const levels = ALL_NODE_IDS.map((id) => getMasteryLevel(bktState[id]?.pKnown ?? 0.1));
    const numericLevels = levels.map((l) => (l === 'mastered' ? 1 : l === 'proficient' ? 0.7 : l === 'developing' ? 0.4 : 0.1));
    const avg = numericLevels.reduce((a, b) => a + b, 0) / numericLevels.length;
    return Math.round(avg * 100);
  }, [bktState]);

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* ─── HEADER / NAVIGATION BAR ─── */}
      <header className="w-full bg-slate-900/90 border-b border-cyan-800/40 backdrop-blur-md px-4 py-3 sticky top-0 z-50 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/30">
            <span className="text-xl font-black text-white">💡</span>
          </div>
          <div>
            <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-300 bg-clip-text text-transparent">
              ISRO Optics Lab: Light & Reflection
            </h1>
            <p className="text-xs text-slate-400">Class 7 CBSE Physics • Interactive Ray Laboratory</p>
          </div>
        </div>

        {/* TOP TABS */}
        <div className="hidden md:flex items-center space-x-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          {(['predict', 'learn', 'lab', 'challenges', 'mastery'] as const).map((m) => (
            <button
              key={m}
              onClick={() => {
                setMode(m);
                audioManager.play('tap');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all duration-200 ${
                mode === m
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
              }`}
            >
              {m === 'predict' ? '🎯 Predict' : m === 'learn' ? '📚 Learn' : m === 'lab' ? '🔬 Lab Simulator' : m === 'challenges' ? '⚡ Challenges' : '🏆 Mastery'}
            </button>
          ))}
        </div>

        {/* SCORE & MASTERY READOUT */}
        <div className="flex items-center space-x-4">
          <div className="bg-slate-800/90 border border-cyan-500/30 px-3 py-1 rounded-lg flex items-center space-x-2">
            <span className="text-xs text-slate-400">Mastery</span>
            <span className="text-sm font-bold text-cyan-400">{overallMastery}%</span>
          </div>
          <div className="bg-slate-800/90 border border-amber-500/30 px-3 py-1 rounded-lg flex items-center space-x-2">
            <span className="text-xs text-slate-400">Score</span>
            <span className="text-sm font-bold text-amber-400">{score} pt</span>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION TABS */}
      <div className="md:hidden flex items-center justify-around bg-slate-900 border-b border-slate-800 p-2">
        {(['predict', 'learn', 'lab', 'challenges', 'mastery'] as const).map((m) => (
          <button
            key={m}
            onClick={() => {
              setMode(m);
              audioManager.play('tap');
            }}
            className={`px-2 py-1 rounded text-xs font-medium capitalize ${
              mode === m ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 flex flex-col justify-between">
        <AnimatePresence mode="wait">
          {/* ─── 1. PREDICT MODE (DISCOVERY QUESTION) ─── */}
          {mode === 'predict' && (
            <motion.div
              key="predict"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              <div className="bg-slate-900/80 border border-cyan-500/30 rounded-2xl p-6 shadow-2xl space-y-4 backdrop-blur">
                <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-300 text-xs font-semibold">
                  Discovery Phase • Predict Before Learning
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-slate-100">{SCENARIO.title}</h2>
                <p className="text-slate-300 text-sm leading-relaxed">{SCENARIO.intro}</p>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                <h3 className="text-lg font-bold text-sky-300 flex items-center space-x-2">
                  <span>🤔 Curiosity Challenge:</span>
                </h3>
                <p className="text-base text-slate-200">{DISCOVERY_QUESTION.question}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {DISCOVERY_QUESTION.options.map((opt, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        if (!predictSubmitted) {
                          setPredictSelected(idx);
                          audioManager.play('tap');
                        }
                      }}
                      className={`p-4 rounded-xl border text-left text-sm transition-all duration-200 ${
                        predictSelected === idx
                          ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-500/20'
                          : 'border-slate-800 bg-slate-850 hover:border-slate-700 text-slate-300'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                          {String.fromCharCode(65 + idx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {!predictSubmitted ? (
                  <button
                    disabled={predictSelected === null}
                    onClick={handlePredictSubmit}
                    className={`w-full py-3 rounded-xl font-bold transition-all shadow-lg ${
                      predictSelected !== null
                        ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-cyan-500/25 hover:brightness-110'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Submit Hypothesis & Test
                  </button>
                ) : (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                    <div
                      className={`p-4 rounded-xl border ${
                        predictSelected === DISCOVERY_QUESTION.correctIndex
                          ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                          : 'bg-amber-950/40 border-amber-500/50 text-amber-200'
                      }`}
                    >
                      <p className="font-bold mb-1">
                        {predictSelected === DISCOVERY_QUESTION.correctIndex ? '🎉 Spot on!' : '💡 Interesting prediction!'}
                      </p>
                      <p className="text-xs leading-relaxed">{DISCOVERY_QUESTION.explanation}</p>
                    </div>

                    <button
                      onClick={() => {
                        setMode('learn');
                        audioManager.play('whoosh');
                      }}
                      className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold shadow-lg hover:brightness-110"
                    >
                      Proceed to Interactive Visual Lessons →
                    </button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* ─── 2. LEARN MODE (INTERACTIVE SLIDES) ─── */}
          {mode === 'learn' && (
            <motion.div
              key="learn"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* SLIDE HEADER SLIDER */}
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-400">Lesson Progress:</span>
                  <span className="text-sm font-bold text-cyan-400">
                    {currentSlideIndex + 1} / {TEACHING_SLIDES.length}
                  </span>
                </div>

                <div className="flex space-x-2">
                  {TEACHING_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setCurrentSlideIndex(idx);
                        audioManager.play('tap');
                      }}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlideIndex === idx ? 'bg-cyan-400 scale-125' : 'bg-slate-700 hover:bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* SLIDE CARD */}
              {(() => {
                const slide = TEACHING_SLIDES[currentSlideIndex];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
                    <div className="lg:col-span-7 space-y-4">
                      <span className="px-3 py-1 rounded-full bg-cyan-950 border border-cyan-700/50 text-cyan-300 text-xs font-semibold">
                        {slide.subtitle}
                      </span>
                      <h2 className="text-2xl font-bold text-white">{slide.title}</h2>
                      <p className="text-slate-300 text-sm leading-relaxed">{slide.content}</p>
                      <div className="p-3 bg-slate-950 rounded-xl border border-indigo-500/30 font-mono text-xs text-indigo-300">
                        🔑 {slide.keyFormula}
                      </div>
                    </div>

                    {/* INTERACTIVE VISUAL DEMO FOR EACH SLIDE */}
                    <div className="lg:col-span-5 bg-slate-950 rounded-xl border border-slate-800 p-4 flex flex-col items-center justify-center min-h-[260px]">
                      {slide.visualType === 'pinhole' && (
                        <div className="w-full space-y-3 text-center">
                          <svg className="w-full h-40 bg-slate-900 rounded-lg border border-slate-800" viewBox="0 0 300 150">
                            {/* Candle Flame Object */}
                            <path d="M 40 100 L 40 60" stroke="#f59e0b" strokeWidth="6" strokeLinecap="round" />
                            <polygon points="40,50 35,62 45,62" fill="#ef4444" />
                            <circle cx="40" cy="55" r="4" fill="#fbbf24" />

                            {/* Pinhole Barrier */}
                            <line x1="150" y1="10" x2="150" y2="65" stroke="#475569" strokeWidth="4" />
                            <line x1="150" y1="85" x2="150" y2="140" stroke="#475569" strokeWidth="4" />

                            {/* Straight Rays through pinhole */}
                            <line x1="40" y1="50" x2="260" y2="110" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="4 2" />
                            <line x1="40" y1="100" x2="260" y2="40" stroke="#38bdf8" strokeWidth="1.5" strokeDasharray="4 2" />

                            {/* Screen & Inverted Image */}
                            <line x1="260" y1="10" x2="260" y2="140" stroke="#94a3b8" strokeWidth="3" />
                            <path d="M 260 40 L 260 110" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
                            <polygon points="260,115 255,103 265,103" fill="#ef4444" />
                          </svg>
                          <p className="text-xs text-slate-400">Rays cross through the pinhole producing an INVERTED real image!</p>
                        </div>
                      )}

                      {slide.visualType === 'reflection' && (
                        <div className="w-full space-y-3 text-center">
                          <svg className="w-full h-40 bg-slate-900 rounded-lg border border-slate-800" viewBox="0 0 300 150">
                            {/* Mirror Surface */}
                            <line x1="30" y1="120" x2="270" y2="120" stroke="#06b6d4" strokeWidth="4" />
                            {/* Normal Line */}
                            <line x1="150" y1="20" x2="150" y2="120" stroke="#94a3b8" strokeWidth="2" strokeDasharray="4 4" />
                            <text x="155" y="35" fill="#94a3b8" fontSize="10">
                              Normal
                            </text>

                            {/* Incident Ray */}
                            <line x1="70" y1="40" x2="150" y2="120" stroke="#f43f5e" strokeWidth="3" />
                            <text x="80" y="65" fill="#f43f5e" fontSize="10" fontWeight="bold">
                              ∠i = 45°
                            </text>

                            {/* Reflected Ray */}
                            <line x1="150" y1="120" x2="230" y2="40" stroke="#10b981" strokeWidth="3" />
                            <text x="195" y="65" fill="#10b981" fontSize="10" fontWeight="bold">
                              ∠r = 45°
                            </text>
                          </svg>
                          <p className="text-xs text-slate-400">Angle of Incidence (∠i) always equals Angle of Reflection (∠r).</p>
                        </div>
                      )}

                      {slide.visualType === 'planeMirror' && (
                        <div className="w-full space-y-3 text-center">
                          <div className="flex items-center justify-around bg-slate-900 p-3 rounded-lg border border-slate-800">
                            <div className="text-center">
                              <span className="text-xs text-slate-400">Object Hand</span>
                              <div className="text-3xl mt-1">✋ (Right)</div>
                            </div>
                            <div className="h-16 w-1 bg-cyan-400 shadow-md shadow-cyan-400/50" />
                            <div className="text-center">
                              <span className="text-xs text-slate-400">Virtual Mirror Image</span>
                              <div className="text-3xl mt-1 scale-x-[-1]">✋ (Left)</div>
                            </div>
                          </div>
                          <p className="text-xs text-slate-400">Lateral Inversion: Left appears Right & Right appears Left!</p>
                        </div>
                      )}

                      {slide.visualType === 'sphericalMirror' && (
                        <div className="w-full space-y-3 text-center">
                          <svg className="w-full h-40 bg-slate-900 rounded-lg border border-slate-800" viewBox="0 0 300 150">
                            {/* Principal Axis */}
                            <line x1="20" y1="75" x2="280" y2="75" stroke="#475569" strokeWidth="1.5" strokeDasharray="3 3" />
                            {/* Concave Mirror Curve */}
                            <path d="M 230 20 Q 200 75 230 130" fill="none" stroke="#38bdf8" strokeWidth="4" />
                            {/* Focus Point */}
                            <circle cx="140" cy="75" r="4" fill="#f59e0b" />
                            <text x="135" y="95" fill="#f59e0b" fontSize="10" fontWeight="bold">
                              Focus (F)
                            </text>
                            {/* Center of Curvature */}
                            <circle cx="70" cy="75" r="4" fill="#a855f7" />
                            <text x="65" y="95" fill="#a855f7" fontSize="10" fontWeight="bold">
                              Center (C)
                            </text>

                            {/* Converging parallel rays */}
                            <line x1="20" y1="40" x2="215" y2="40" stroke="#fbbf24" strokeWidth="2" />
                            <line x1="215" y1="40" x2="140" y2="75" stroke="#fbbf24" strokeWidth="2" />
                            <line x1="20" y1="110" x2="215" y2="110" stroke="#fbbf24" strokeWidth="2" />
                            <line x1="215" y1="110" x2="140" y2="75" stroke="#fbbf24" strokeWidth="2" />
                          </svg>
                          <p className="text-xs text-slate-400">Concave mirrors converge parallel light rays directly to the Focus!</p>
                        </div>
                      )}

                      {slide.visualType === 'dispersion' && (
                        <div className="w-full space-y-3 text-center">
                          <div className="w-full h-36 bg-slate-900 rounded-lg flex items-center justify-center p-2 border border-slate-800">
                            <div className="h-6 w-full rounded-md bg-gradient-to-r from-red-500 via-yellow-400 via-green-500 via-blue-500 to-purple-600 shadow-lg flex items-center justify-center text-[10px] font-bold text-slate-950 tracking-wider">
                              V I B G Y O R
                            </div>
                          </div>
                          <p className="text-xs text-slate-400">Prism disperses white light into spectrum colors: VIBGYOR!</p>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })()}

              {/* SLIDE NAVIGATION CONTROLS */}
              <div className="flex justify-between items-center">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    setCurrentSlideIndex((prev) => prev - 1);
                    audioManager.play('swoop');
                  }}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    currentSlideIndex > 0
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-slate-900 text-slate-600 cursor-not-allowed border border-slate-850'
                  }`}
                >
                  ← Previous Slide
                </button>

                <button
                  onClick={() => {
                    if (currentSlideIndex < TEACHING_SLIDES.length - 1) {
                      setCurrentSlideIndex((prev) => prev + 1);
                      audioManager.play('swoop');
                    } else {
                      setMode('lab');
                      audioManager.play('celebration');
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg shadow-cyan-500/20 hover:brightness-110"
                >
                  {currentSlideIndex < TEACHING_SLIDES.length - 1 ? 'Next Visual Slide →' : 'Enter Interactive Optics Lab 🔬'}
                </button>
              </div>
            </motion.div>
          )}

          {/* ─── 3. LAB SIMULATOR (HANDS-ON PLAYGROUND) ─── */}
          {mode === 'lab' && (
            <motion.div
              key="lab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* LAB SELECTOR SUB-TABS */}
              <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-3 rounded-2xl border border-slate-800">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider">Select Experiment Apparatus:</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'spherical', label: '🔍 Spherical Mirror Lab' },
                    { id: 'reflection', label: '📐 Law of Reflection' },
                    { id: 'pinhole', label: '📷 Pinhole Camera' },
                    { id: 'lensPrism', label: '🌈 Prism & Newton Disc' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setLabTab(tab.id as any);
                        audioManager.play('tap');
                      }}
                      className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        labTab === tab.id
                          ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                          : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* TOOL A: SPHERICAL MIRROR INTERACTIVE LAB */}
              {labTab === 'spherical' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">Curved Spherical Mirror Ray Diagnostics</h3>
                      <p className="text-xs text-slate-400">
                        Adjust focal length (f) and object distance (u) to observe real vs virtual image formation.
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 bg-slate-950 p-1.5 rounded-xl border border-slate-800">
                      <button
                        onClick={() => {
                          setMirrorType('concave');
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          mirrorType === 'concave' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Concave Mirror
                      </button>
                      <button
                        onClick={() => {
                          setMirrorType('convex');
                          audioManager.play('pop');
                        }}
                        className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                          mirrorType === 'convex' ? 'bg-cyan-500 text-slate-950' : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Convex Mirror
                      </button>
                    </div>
                  </div>

                  {/* SVG DYNAMIC RAY OPTICS SCHEMATIC */}
                  <div className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-x-auto flex justify-center">
                    <svg className="w-full max-w-3xl h-64 bg-slate-950 rounded-lg" viewBox="0 0 600 240">
                      {/* Grid background lines */}
                      <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
                        </pattern>
                      </defs>
                      <rect width="600" height="240" fill="url(#grid)" />

                      {/* Principal Optical Axis */}
                      <line x1="20" y1="120" x2="580" y2="120" stroke="#64748b" strokeWidth="1.5" strokeDasharray="4 4" />
                      <text x="30" y="110" fill="#64748b" fontSize="10">
                        Principal Axis
                      </text>

                      {/* Mirror Pole (P) at X = 350 */}
                      {mirrorType === 'concave' ? (
                        <path d="M 350 20 Q 300 120 350 220" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      ) : (
                        <path d="M 350 20 Q 400 120 350 220" fill="none" stroke="#38bdf8" strokeWidth="4" />
                      )}
                      <circle cx="350" cy="120" r="4" fill="#38bdf8" />
                      <text x="355" y="135" fill="#38bdf8" fontSize="10" fontWeight="bold">
                        P
                      </text>

                      {/* Focus (F) and Center of Curvature (C) */}
                      {mirrorType === 'concave' ? (
                        <>
                          <circle cx={350 - focalLength * 4} cy="120" r="4" fill="#f59e0b" />
                          <text x={350 - focalLength * 4 - 5} y="138" fill="#f59e0b" fontSize="11" fontWeight="bold">
                            F
                          </text>
                          <circle cx={350 - focalLength * 8} cy="120" r="4" fill="#a855f7" />
                          <text x={350 - focalLength * 8 - 5} y="138" fill="#a855f7" fontSize="11" fontWeight="bold">
                            C
                          </text>
                        </>
                      ) : (
                        <>
                          <circle cx={350 + focalLength * 4} cy="120" r="4" fill="#f59e0b" />
                          <text x={350 + focalLength * 4 - 5} y="138" fill="#f59e0b" fontSize="11" fontWeight="bold">
                            F
                          </text>
                          <circle cx={350 + focalLength * 8} cy="120" r="4" fill="#a855f7" />
                          <text x={350 + focalLength * 8 - 5} y="138" fill="#a855f7" fontSize="11" fontWeight="bold">
                            C
                          </text>
                        </>
                      )}

                      {/* Object Arrow */}
                      {(() => {
                        const objX = 350 - objectDist * 4;
                        return (
                          <g id="object-arrow">
                            <line x1={objX} y1="120" x2={objX} y2="60" stroke="#22c55e" strokeWidth="4" />
                            <polygon points={`${objX},50 ${objX - 6},62 ${objX + 6},62`} fill="#22c55e" />
                            <text x={objX - 12} y="45" fill="#22c55e" fontSize="10" fontWeight="bold">
                              Object (u={objectDist}cm)
                            </text>
                          </g>
                        );
                      })()}

                      {/* Calculated Image Arrow */}
                      {(() => {
                        const imgX = 350 + calculateSphericalMirror.v * 4;
                        const isErect = calculateSphericalMirror.isErect;
                        const yTarget = isErect ? 120 - calculateSphericalMirror.imageHeight : 120 + calculateSphericalMirror.imageHeight;
                        const polyHead = isErect
                          ? `${imgX},${yTarget - 8} ${imgX - 5},${yTarget + 4} ${imgX + 5},${yTarget + 4}`
                          : `${imgX},${yTarget + 8} ${imgX - 5},${yTarget - 4} ${imgX + 5},${yTarget - 4}`;

                        if (imgX > 10 && imgX < 590) {
                          return (
                            <g id="image-arrow">
                              <line
                                x1={imgX}
                                y1="120"
                                x2={imgX}
                                y2={yTarget}
                                stroke="#e11d48"
                                strokeWidth="3"
                                strokeDasharray={calculateSphericalMirror.isReal ? 'none' : '4 2'}
                              />
                              <polygon points={polyHead} fill="#e11d48" />
                              <text x={imgX - 15} y={isErect ? yTarget - 12 : yTarget + 18} fill="#e11d48" fontSize="10" fontWeight="bold">
                                Image ({calculateSphericalMirror.isReal ? 'Real' : 'Virtual'})
                              </text>
                            </g>
                          );
                        }
                        return null;
                      })()}

                      {/* Primary Incident Rays */}
                      <line x1={350 - objectDist * 4} y1="60" x2="350" y2="60" stroke="#fbbf24" strokeWidth="1.5" strokeDasharray="2 2" />
                    </svg>
                  </div>

                  {/* READOUT & CONTROLS */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Focal Length (f):</span>
                        <span className="font-bold text-cyan-400">{focalLength} cm</span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="40"
                        step="1"
                        value={focalLength}
                        onChange={(e) => {
                          setFocalLength(Number(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />

                      <div className="flex justify-between items-center text-xs">
                        <span className="text-slate-400">Object Distance (u):</span>
                        <span className="font-bold text-emerald-400">{objectDist} cm</span>
                      </div>
                      <input
                        type="range"
                        min="5"
                        max="75"
                        step="1"
                        value={objectDist}
                        onChange={(e) => {
                          setObjectDist(Number(e.target.value));
                          audioManager.play('tap');
                        }}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    <div className="md:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 font-mono text-xs">
                      <div className="text-cyan-300 font-bold flex items-center justify-between border-b border-slate-800 pb-2">
                        <span>📊 Real-Time Optics Formula Output:</span>
                        <span className="text-[10px] text-slate-400 font-normal">Mirror Formula: 1/f = 1/v + 1/u</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-slate-300">
                        <div>
                          <p>
                            Image Distance (v):{' '}
                            <span className="text-amber-400 font-bold">{calculateSphericalMirror.imageDist.toFixed(1)} cm</span>
                          </p>
                          <p>
                            Magnification (m):{' '}
                            <span className="text-purple-400 font-bold">{calculateSphericalMirror.m.toFixed(2)}x</span>
                          </p>
                        </div>
                        <div>
                          <p>
                            Image Nature:{' '}
                            <span className={`font-bold ${calculateSphericalMirror.isReal ? 'text-emerald-400' : 'text-rose-400'}`}>
                              {calculateSphericalMirror.isReal ? 'REAL & INVERTED' : 'VIRTUAL & ERECT'}
                            </span>
                          </p>
                          <p>
                            Screen Projectable:{' '}
                            <span className="text-white font-bold">{calculateSphericalMirror.isReal ? 'YES ✅' : 'NO ❌'}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOOL B: REFLECTION & PLANE MIRROR LAB */}
              {labTab === 'reflection' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                  <h3 className="text-xl font-bold text-white">Law of Reflection & Plane Mirror Inversion Lab</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* SVG Interactive Reflection Angle Visualizer */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                      <svg className="w-full h-56 bg-slate-950" viewBox="0 0 300 200">
                        {/* Mirror base */}
                        <line x1="20" y1="160" x2="280" y2="160" stroke="#06b6d4" strokeWidth="5" />
                        <line x1="150" y1="20" x2="150" y2="160" stroke="#64748b" strokeWidth="2" strokeDasharray="4 4" />
                        <text x="155" y="35" fill="#64748b" fontSize="10">
                          Normal
                        </text>

                        {/* Rays based on incidentAngle */}
                        {(() => {
                          const rad = (incidentAngle * Math.PI) / 180;
                          const rayLen = 130;
                          const inX = 150 - rayLen * Math.sin(rad);
                          const inY = 160 - rayLen * Math.cos(rad);
                          const refX = 150 + rayLen * Math.sin(rad);
                          const refY = 160 - rayLen * Math.cos(rad);

                          return (
                            <>
                              <line x1={inX} y1={inY} x2="150" y2="160" stroke="#ef4444" strokeWidth="3" />
                              <line x1="150" y1="160" x2={refX} y2={refY} stroke="#10b981" strokeWidth="3" />

                              <text x={inX - 10} y={inY - 5} fill="#ef4444" fontSize="10" fontWeight="bold">
                                ∠i = {incidentAngle}°
                              </text>
                              <text x={refX - 10} y={refY - 5} fill="#10b981" fontSize="10" fontWeight="bold">
                                ∠r = {incidentAngle}°
                              </text>
                            </>
                          );
                        })()}
                      </svg>

                      <div className="w-full space-y-2 mt-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Adjust Angle of Incidence (∠i):</span>
                          <span className="font-bold text-cyan-400">{incidentAngle}°</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="80"
                          value={incidentAngle}
                          onChange={(e) => {
                            setIncidentAngle(Number(e.target.value));
                            audioManager.play('tap');
                          }}
                          className="w-full accent-cyan-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Lateral Inversion Text Simulator */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-cyan-300 mb-2">Lateral Inversion Live Display</h4>
                        <p className="text-xs text-slate-400 mb-3">
                          Type text below to see how a plane mirror laterally reverses every character!
                        </p>
                        <input
                          type="text"
                          value={mirrorText}
                          onChange={(e) => setMirrorText(e.target.value)}
                          maxLength={12}
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-sm text-cyan-300 font-mono focus:outline-none focus:border-cyan-400"
                          placeholder="Type word here..."
                        />
                      </div>

                      <div className="p-4 bg-slate-900 rounded-xl border border-cyan-500/30 text-center space-y-2">
                        <p className="text-xs text-slate-400">Virtual Mirror Image (Reversed):</p>
                        <div className="text-2xl font-mono font-bold text-amber-400 scale-x-[-1] inline-block tracking-widest">
                          {mirrorText}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TOOL C: PINHOLE CAMERA LAB */}
              {labTab === 'pinhole' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                  <h3 className="text-xl font-bold text-white">Rectilinear Light & Pinhole Camera Laboratory</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-4">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Pinhole Screen Distance:</span>
                        <span className="font-bold text-cyan-400">{pinholeDistance} cm</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="100"
                        value={pinholeDistance}
                        onChange={(e) => setPinholeDistance(Number(e.target.value))}
                        className="w-full accent-cyan-400 cursor-pointer"
                      />

                      <div className="flex justify-between text-xs">
                        <span className="text-slate-400">Object Height:</span>
                        <span className="font-bold text-emerald-400">{objectHeight} cm</span>
                      </div>
                      <input
                        type="range"
                        min="20"
                        max="80"
                        value={objectHeight}
                        onChange={(e) => setObjectHeight(Number(e.target.value))}
                        className="w-full accent-emerald-400 cursor-pointer"
                      />
                    </div>

                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center space-y-3 font-mono text-xs">
                      <p className="text-slate-400">Calculated Pinhole Image Height:</p>
                      <p className="text-2xl font-bold text-cyan-300">
                        {((objectHeight * pinholeDistance) / 100).toFixed(1)} cm
                      </p>
                      <p className="text-slate-400 text-[11px]">
                        (Image Height = Object Height × Screen Distance / Object Distance)
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* TOOL D: PRISM DISPERSION & NEWTON DISC */}
              {labTab === 'lensPrism' && (
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                  <h3 className="text-xl font-bold text-white">Prism Dispersion & Newton’s Recombination Disc</h3>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Prism Spectrum Canvas */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-cyan-300">Prism Light Spectrum Canvas</h4>
                        <span className="text-xs text-slate-400">VIBGYOR Dispersion</span>
                      </div>
                      <canvas ref={prismCanvasRef} width={420} height={220} className="w-full h-52 bg-slate-950 rounded-lg" />
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Sunlight Intensity:</span>
                          <span className="font-bold text-amber-400">{lightIntensity}%</span>
                        </div>
                        <input
                          type="range"
                          min="30"
                          max="100"
                          value={lightIntensity}
                          onChange={(e) => setLightIntensity(Number(e.target.value))}
                          className="w-full accent-amber-400 cursor-pointer"
                        />
                      </div>
                    </div>

                    {/* Newton Spinning Disc Canvas */}
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3 flex flex-col items-center">
                      <div className="flex items-center justify-between w-full">
                        <h4 className="text-sm font-bold text-cyan-300">Newton’s Color Recombination Disc</h4>
                        <span className="text-xs text-slate-400">{discRPM} RPM</span>
                      </div>

                      <canvas ref={discCanvasRef} width={200} height={200} className="w-48 h-48 bg-slate-950 rounded-full shadow-lg" />

                      <div className="w-full space-y-2">
                        <div className="flex justify-between text-xs text-slate-300">
                          <span>Spin Velocity (RPM):</span>
                          <span className="font-bold text-indigo-400">{discRPM} RPM</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="1500"
                          step="50"
                          value={discRPM}
                          onChange={(e) => {
                            setDiscRPM(Number(e.target.value));
                            if (Number(e.target.value) > 600) audioManager.play('whoosh');
                          }}
                          className="w-full accent-indigo-400 cursor-pointer"
                        />
                      </div>
                      <p className="text-[11px] text-slate-400 text-center">
                        {discRPM > 600
                          ? '✨ High Speed: Persistence of vision merges all 7 colors into WHITE light!'
                          : 'Spin above 600 RPM to observe optical white light recombination.'}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* ACTION BUTTON TO CHALLENGES */}
              <button
                onClick={() => {
                  setMode('challenges');
                  audioManager.play('celebration');
                }}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 text-slate-950 font-black text-base shadow-xl hover:brightness-110"
              >
                Proceed to Competency Diagnostic Challenges ⚡
              </button>
            </motion.div>
          )}

          {/* ─── 4. CHALLENGES MODE ─── */}
          {mode === 'challenges' && (
            <motion.div
              key="challenges"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-6"
            >
              {/* CHALLENGE HEADER BAR */}
              <div className="flex items-center justify-between bg-slate-900 p-4 rounded-2xl border border-slate-800">
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-bold text-sm">
                    {currentChallengeIndex + 1}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-white">Challenge {currentChallengeIndex + 1} of {CHALLENGES.length}</h3>
                    <p className="text-xs text-slate-400 capitalize">
                      Difficulty: <span className="text-amber-400">{CHALLENGES[currentChallengeIndex].difficulty}</span> •{' '}
                      {CHALLENGES[currentChallengeIndex].competencyLevel}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setShowHint(!showHint);
                      if (!showHint) {
                        setCurrentHint(CHALLENGES[currentChallengeIndex].hints[0]);
                        audioManager.play('hint');
                      }
                    }}
                    className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center space-x-1 border border-amber-500/30"
                  >
                    <span>💡 Hint</span>
                  </button>
                </div>
              </div>

              {/* HINT BUBBLE COMPONENT */}
              <HintBubble show={showHint} text={currentHint} />

              {/* MAIN QUESTION CONTAINER */}
              {(() => {
                const ch = CHALLENGES[currentChallengeIndex];
                return (
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
                    <p className="text-base md:text-lg font-semibold text-slate-100">{ch.question}</p>

                    {/* NUMERIC INPUT TYPE */}
                    {ch.type === 'numeric' ? (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <input
                            type="number"
                            value={numericAnswer}
                            onChange={(e) => setNumericAnswer(e.target.value)}
                            placeholder="Enter calculated value..."
                            className="px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-lg font-mono text-cyan-300 focus:outline-none focus:border-cyan-400 w-64"
                          />
                          <span className="text-sm font-bold text-slate-400">{ch.unit}</span>
                        </div>
                      </div>
                    ) : (
                      /* MULTIPLE CHOICE OPTIONS */
                      <div className="grid grid-cols-1 gap-3">
                        {ch.options.map((opt, idx) => (
                          <button
                            key={idx}
                            disabled={challengeFeedback !== null}
                            onClick={() => handleChallengeOptionSelect(idx)}
                            className={`p-4 rounded-xl border text-left text-sm transition-all ${
                              selectedOption === idx
                                ? 'border-cyan-400 bg-cyan-950/40 text-cyan-200 shadow-md shadow-cyan-500/20 font-semibold'
                                : 'border-slate-800 bg-slate-950 hover:border-slate-700 text-slate-300'
                            }`}
                          >
                            <div className="flex items-start space-x-3">
                              <span className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-400 shrink-0">
                                {String.fromCharCode(65 + idx)}
                              </span>
                              <span>{opt}</span>
                            </div>
                          </button>
                        ))}
                      </div>
                    )}

                    {/* FEEDBACK & SUBMIT BUTTON */}
                    {challengeFeedback === null ? (
                      <button
                        disabled={ch.type === 'numeric' ? !numericAnswer : selectedOption === null}
                        onClick={handleChallengeSubmit}
                        className={`w-full py-3.5 rounded-xl font-bold text-base transition-all shadow-lg ${
                          (ch.type === 'numeric' ? numericAnswer : selectedOption !== null)
                            ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 hover:brightness-110 shadow-cyan-500/25'
                            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        }`}
                      >
                        Verify Optics Solution
                      </button>
                    ) : (
                      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                        <div
                          className={`p-4 rounded-xl border ${
                            challengeFeedback.isCorrect
                              ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-200'
                              : 'bg-rose-950/40 border-rose-500/50 text-rose-200'
                          }`}
                        >
                          <p className="font-bold mb-1">{challengeFeedback.isCorrect ? '✅ Excellent!' : '❌ Let’s review:'}</p>
                          <p className="text-xs leading-relaxed">{challengeFeedback.message}</p>
                        </div>

                        <button
                          onClick={handleNextChallenge}
                          className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 text-white font-bold text-base shadow-lg hover:brightness-110"
                        >
                          {currentChallengeIndex < CHALLENGES.length - 1 ? 'Next Optics Challenge →' : 'Complete Diagnostic Mission 🏆'}
                        </button>
                      </motion.div>
                    )}
                  </div>
                );
              })()}
            </motion.div>
          )}

          {/* ─── 5. MASTERY & REAL-WORLD MISSION SUMMARY ─── */}
          {mode === 'mastery' && (
            <motion.div
              key="mastery"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6 text-center"
            >
              <div className="bg-slate-900 border border-cyan-500/40 rounded-2xl p-8 shadow-2xl space-y-6 max-w-2xl mx-auto">
                <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-amber-400 to-cyan-400 flex items-center justify-center text-4xl shadow-lg shadow-cyan-500/30">
                  🏆
                </div>

                <h2 className="text-3xl font-extrabold text-white">ISRO Payload Diagnostic Complete!</h2>
                <p className="text-slate-300 text-sm">
                  You have successfully analyzed rectilinear light paths, verified law of reflection angles, calibrated curved concave/convex mirror optics, and observed prism dispersion!
                </p>

                <div className="grid grid-cols-2 gap-4 bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-xs text-slate-400 block">Overall Concept Mastery</span>
                    <span className="text-2xl font-black text-cyan-400">{overallMastery}%</span>
                  </div>
                  <div>
                    <span className="text-xs text-slate-400 block">Total Diagnostic Score</span>
                    <span className="text-2xl font-black text-amber-400">{score} pts</span>
                  </div>
                </div>

                <div className="space-y-2 text-left bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Mastered Concept Nodes:</h4>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {ALL_NODE_IDS.map((nodeId) => (
                      <span key={nodeId} className="px-2.5 py-1 rounded-md bg-cyan-950 border border-cyan-700/40 text-[11px] font-mono text-cyan-300">
                        {nodeId} ✓
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <button
                    onClick={() => {
                      setMode('lab');
                      audioManager.play('tap');
                    }}
                    className="flex-1 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm border border-slate-700"
                  >
                    Return to Optics Lab
                  </button>
                  <button
                    onClick={() => {
                      setCurrentChallengeIndex(0);
                      setMode('challenges');
                      audioManager.play('whoosh');
                    }}
                    className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-sm shadow-lg hover:brightness-110"
                  >
                    Replay Challenges
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FEEDBACK OVERLAYS */}
      <SuccessBanner show={showSuccessBanner} text="ISRO Payload Diagnostic Complete!" />
      <Confetti show={showConfetti} />
      <SparkleBurst show={showSparkle} x={sparklePos.x} y={sparklePos.y} />
    </div>
  );
}