'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import type { SoundEffect } from '../../../lib/sim-engine/types';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// ─── NODE IDS ───
const NODE_C7_PHY_001 = 'c7_phy_cbse_001'; // Luminous vs Non-luminous objects
const NODE_C7_PHY_002 = 'c7_phy_cbse_002'; // Rectilinear propagation of light
const NODE_C7_PHY_003 = 'c7_phy_cbse_003'; // Transparent, translucent, and opaque materials
const NODE_C7_PHY_004 = 'c7_phy_cbse_004'; // Formation of shadows (Umbra and Penumbra)
const NODE_C7_PHY_005 = 'c7_phy_cbse_005'; // Factors affecting shadow size and sharpness
const NODE_C7_PHY_006 = 'c7_phy_cbse_006'; // Pinhole camera & inverted image formation
const NODE_C7_PHY_007 = 'c7_phy_cbse_007'; // Reflection of light (Incident ray, Reflected ray, Normal)
const NODE_C7_PHY_008 = 'c7_phy_cbse_008'; // Laws of reflection (Angle i = Angle r)
const NODE_C7_PHY_009 = 'c7_phy_cbse_009'; // Plane mirrors & image properties (Lateral inversion, virtual image)
const NODE_C7_PHY_010 = 'c7_phy_cbse_010'; // Real-world optical devices (Periscope & ray tracing)

const ALL_NODE_IDS = [
  NODE_C7_PHY_001,
  NODE_C7_PHY_002,
  NODE_C7_PHY_003,
  NODE_C7_PHY_004,
  NODE_C7_PHY_005,
  NODE_C7_PHY_006,
  NODE_C7_PHY_007,
  NODE_C7_PHY_008,
  NODE_C7_PHY_009,
  NODE_C7_PHY_010,
];

// ─── NARRATIVE SCENARIO ───
const SCENARIO = {
  title: 'Mission: The Deep-Space Optical Beacon & Lunar Recon Laboratory',
  intro: 'Welcome to ISRO Lunar Optical Research Station. High-frequency laser communications, solar shadow mapping, and orbital periscope systems rely on the fundamental behavior of light rays. Master rectilinear propagation, shadow physics, pinhole optics, and reflection dynamics to calibrate our space payload telemetry!',
  context: 'Manipulate light beams, adjust pinholes, experiment with materials, align reflection mirrors, and verify physical laws across our interactive optical benches.',
};

// ─── DISCOVERY QUESTION ───
const DISCOVERY_QUESTION = {
  question: 'In a completely pitch-black room with no light sources present, you hold up a highly polished plane mirror. Can you see your reflection in the mirror?',
  options: [
    'Yes, because a plane mirror always reflects your image regardless of room lighting.',
    'No, because we see objects only when light reflected from them enters our eyes.',
    'Yes, but the image will be inverted and blurred due to lack of contrast.',
    'Only if you stand within 10 centimeters of the glass surface.',
  ],
  correctIndex: 1,
  hintAfter: 'Think about how sight works! Do our eyes emit light rays, or do they receive light bounced off objects?',
};

// ─── TEACHING SLIDES ───
interface TeachingSlide {
  id: string;
  nodeId: string;
  title: string;
  subtitle: string;
  content: string[];
  keyFormula?: string;
  conceptSummary: string;
}

const TEACHING_SLIDES: TeachingSlide[] = [
  {
    id: 'slide_01',
    nodeId: NODE_C7_PHY_001,
    title: '1. Light Sources & Transmission Media',
    subtitle: 'Luminous vs Non-Luminous & Material Optical Density',
    content: [
      'Luminous objects (Sun, burning candle, glowing LED) emit their own light energy.',
      'Non-luminous objects (Moon, mirror, wooden block) do not emit light; they become visible only by bouncing/reflecting light.',
      'Transparent materials (clear glass, water) allow light to pass through almost completely.',
      'Translucent materials (frosted glass, butter paper) scatter light, allowing partial passage.',
      'Opaque materials (wood, cardboard, metal) block light completely, casting distinct shadows.',
    ],
    conceptSummary: 'Light requires a source to emit photons, which interact with media based on material opacity.',
  },
  {
    id: 'slide_02',
    nodeId: NODE_C7_PHY_002,
    title: '2. Rectilinear Propagation of Light',
    subtitle: 'Light Travels strictly in Straight Lines',
    content: [
      'Light always travels in straight lines in a uniform medium. This property is called Rectilinear Propagation.',
      'When three cards with small central holes are aligned perfectly straight, light from a candle flame passes through all three to reaching your eye.',
      'If any single card is moved even slightly out of alignment, the light path is blocked instantly.',
      'This straight-line behavior is the foundation of shadow geometry and optical ray tracing.',
    ],
    keyFormula: 'Ray Path: \\vec{r}(t) = \\vec{r}_0 + \\vec{v}t',
    conceptSummary: 'Light rays do not bend around sharp macro obstacles; they continue straight ahead.',
  },
  {
    id: 'slide_03',
    nodeId: NODE_C7_PHY_004,
    title: '3. Shadow Physics: Umbra & Penumbra',
    subtitle: 'Dark Regions Formed by Light Interception',
    content: [
      'A shadow is formed when an opaque object blocks light coming from a source.',
      'Point Light Source: Produces a single, sharp, completely dark region called the UMBRA.',
      'Extended Light Source (like a large bulb): Produces a dark central UMBRA surrounded by a partial, lighter shadow zone called the PENUMBRA.',
      'Moving the obstacle closer to the light source increases shadow size; moving it closer to the screen decreases shadow size and makes it sharper.',
    ],
    keyFormula: '\\text{Shadow Ratio: } \\frac{h_{\\text{shadow}}}{h_{\\text{object}}} = \\frac{D_{\\text{screen}}}{D_{\\text{object}}}',
    conceptSummary: 'Shadow geometry depends directly on light source dimensions and relative distances.',
  },
  {
    id: 'slide_04',
    nodeId: NODE_C7_PHY_006,
    title: '4. The Pinhole Camera',
    subtitle: 'Inverted Image Formation via Straight Rays',
    content: [
      'A pinhole camera consists of a light-tight box with a tiny pinhole on one side and a translucent screen on the opposite side.',
      'Top light rays from an object travel straight down through the pinhole to the bottom screen, while bottom rays travel up.',
      'Result: The pinhole camera forms a REAL, INVERTED (upside-down) image on the screen.',
      'Making the pinhole larger brightens the image but makes it blurry because multiple overlapping rays enter.',
    ],
    keyFormula: '\\frac{h_i}{h_o} = \\frac{v}{u} \\quad \\Rightarrow \\quad h_i = h_o \\times \\frac{\\text{Screen Distance}}{\\text{Object Distance}}',
    conceptSummary: 'Pinhole cameras prove rectilinear propagation by projecting inverted real images.',
  },
  {
    id: 'slide_05',
    nodeId: NODE_C7_PHY_008,
    title: '5. Laws of Reflection & Plane Mirrors',
    subtitle: 'Angle of Incidence equals Angle of Reflection',
    content: [
      'Reflection is the bouncing back of light when it strikes a smooth polished surface.',
      'Incident Ray: Light ray falling on mirror. Reflected Ray: Ray bouncing off mirror. Normal: Line perpendicular ($90^\\circ$) to mirror surface at point of incidence.',
      'First Law of Reflection: Angle of Incidence ($\angle i$) = Angle of Reflection ($\angle r$).',
      'Plane Mirror Image Characteristics: Virtual (behind mirror), erect, same size as object, equal distance behind mirror ($d_i = d_o$), and LATERALLY INVERTED (left-right reversed).',
    ],
    keyFormula: '\\angle i = \\angle r, \\quad d_{\\text{image}} = d_{\\text{object}}',
    conceptSummary: 'Specular reflection on plane mirrors yields virtual, laterally inverted, equal-sized images.',
  },
];

// ─── CHALLENGE INTERFACE ───
interface Challenge {
  id: string;
  nodeId: string;
  type: 'classify' | 'numeric' | 'drag-label' | 'drag-sort' | 'ray-adjust' | 'mcq';
  difficulty: 'foundation' | 'standard' | 'advanced';
  competencyLevel: 'recall' | 'understanding' | 'application' | 'analysis' | 'evaluation';
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
  explanation: string;
  hints: string[];
}

// ─── 10 COMPREHENSIVE CHALLENGES ───
const CHALLENGES: Challenge[] = [
  {
    id: 'ch_01_luminous',
    nodeId: NODE_C7_PHY_001,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Which of the following items is a LUMINOUS object?',
    options: [
      'The Moon glowing at night',
      'A shiny stainless steel mirror',
      'A glowing firefly in the dark',
      'A bright diamond under spotlight',
    ],
    correctIndex: 2,
    explanation: 'A firefly produces its own chemical light (bioluminescence) and is luminous. The Moon, mirror, and diamond only reflect light from external sources.',
    hints: [
      'Ask yourself: Which item produces its own internal light source?',
      'Does the Moon create light or reflect sunlight?',
      'Fireflies emit light through internal bioluminescence.',
    ],
  },
  {
    id: 'ch_02_rectilinear',
    nodeId: NODE_C7_PHY_002,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A student tries to view a candle flame through a flexible rubber hose. When the hose is bent into an S-shape, the flame is no longer visible. Why?',
    options: [
      'Bending the hose absorbs all thermal radiation.',
      'Light travels only in straight lines and cannot bend around curves inside the hose.',
      'The air inside a curved pipe loses oxygen, extinguishing the light beam.',
      'Reflection inside rubber turns light rays into ultraviolet beams.',
    ],
    correctIndex: 1,
    explanation: 'This experiment directly demonstrates rectilinear propagation: light rays travel strictly in straight paths and cannot automatically curve inside a bent hose.',
    hints: [
      'Think about the fundamental geometric path light follows in a uniform medium.',
      'Light cannot bend around smooth macro curves without mirrors.',
      'Rectilinear propagation means straight-line propagation.',
    ],
  },
  {
    id: 'ch_03_materials',
    nodeId: NODE_C7_PHY_003,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Match each material to its correct optical transmission behavior label.',
    dragItems: [
      { label: 'Opaque Material', targetId: 'box_cardboard' },
      { label: 'Transparent Material', targetId: 'box_clear_glass' },
      { label: 'Translucent Material', targetId: 'box_butter_paper' },
    ],
    correctMapping: {
      box_cardboard: 'Opaque Material',
      box_clear_glass: 'Transparent Material',
      box_butter_paper: 'Translucent Material',
    },
    explanation: 'Clear glass is transparent (lets light through cleanly), butter paper is translucent (diffuses light), and cardboard is opaque (blocks light completely).',
    hints: [
      'Clear glass allows you to see objects clearly behind it.',
      'Butter paper scatters light partially.',
      'Cardboard creates dark shadows because light cannot pass through it.',
    ],
  },
  {
    id: 'ch_04_shadow_zones',
    nodeId: NODE_C7_PHY_004,
    type: 'mcq',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'During a solar eclipse, observers on Earth inside region A experience a total solar eclipse, while observers in surrounding region B experience a partial eclipse. What are regions A and B called?',
    options: [
      'A = Penumbra, B = Umbra',
      'A = Umbra, B = Penumbra',
      'A = Reflection Zone, B = Refraction Zone',
      'A = Focal point, B = Corona',
    ],
    correctIndex: 1,
    explanation: 'The complete dark central shadow region where all light is blocked is the UMBRA (total eclipse). The lighter partial shadow around it is the PENUMBRA (partial eclipse).',
    hints: [
      'Umbra means total darkness / deep shadow.',
      'Penumbra means partial / fringe shadow.',
      'Total eclipse occurs inside the central Umbra.',
    ],
  },
  {
    id: 'ch_05_shadow_calc',
    nodeId: NODE_C7_PHY_005,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A point light source is placed 50 cm away from a wooden pole of height 10 cm. A screen is placed behind the pole at a distance of 150 cm from the light source. What is the height of the shadow formed on the screen in cm?',
    correctAnswer: 30,
    tolerance: 0.5,
    unit: 'cm',
    explanation: 'By similar triangles: Shadow Height / Object Height = Screen Distance / Object Distance. Shadow Height / 10 = 150 / 50 = 3. Therefore, Shadow Height = 10 × 3 = 30 cm.',
    hints: [
      'Use the ratio formula: Shadow Height / Object Height = Screen Distance / Light-to-Object Distance.',
      'Light-to-object distance u = 50 cm. Light-to-screen distance v = 150 cm.',
      'Shadow Height = 10 × (150 / 50) = 30 cm.',
    ],
  },
  {
    id: 'ch_06_pinhole_inversion',
    nodeId: NODE_C7_PHY_006,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A pinhole camera has a box depth (screen distance) of 20 cm. It is pointed at a tree of height 3 meters (300 cm) standing 600 cm away from the pinhole. What is the height of the inverted image of the tree on the camera screen in cm?',
    correctAnswer: 10,
    tolerance: 0.2,
    unit: 'cm',
    explanation: 'Image Height / Object Height = Screen Distance / Object Distance. h_i / 300 = 20 / 600. So h_i = 300 × (20 / 600) = 10 cm.',
    hints: [
      'Formula: Image Height (h_i) = Object Height (h_o) × (Screen Distance / Object Distance).',
      'h_o = 300 cm, u = 600 cm, v = 20 cm.',
      'h_i = 300 × (20 / 600) = 10 cm.',
    ],
  },
  {
    id: 'ch_07_angle_reflection',
    nodeId: NODE_C7_PHY_007,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A laser beam strikes a plane mirror such that the angle between the incident ray and the surface of the mirror is 35°. What is the angle of reflection (angle between reflected ray and the normal)?',
    correctAnswer: 55,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'The Normal is 90° to the mirror surface. Angle of incidence angle(i) = 90° - 35° = 55°. According to the Law of Reflection, Angle of Reflection angle(r) = angle(i) = 55°.',
    hints: [
      'Be careful! The problem gives the angle with the mirror SURFACE (35°), not with the Normal.',
      'Angle of incidence (i) = 90° - 35° = 55°.',
      'Law of reflection states angle(r) = angle(i) = 55°.',
    ],
  },
  {
    id: 'ch_08_lateral_inversion',
    nodeId: NODE_C7_PHY_008,
    type: 'mcq',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'An emergency vehicle has the word "AMBULANCE" printed in reverse lettering on its front bonnet. Why is it printed this way?',
    options: [
      'It is a military encryption standard used for security.',
      'Drivers viewing it through their rear-view plane mirrors see it laterally inverted into normal readable text.',
      'It creates an optical illusion that makes the ambulance appear closer.',
      'Refraction through the windscreen flips the text vertically.',
    ],
    correctIndex: 1,
    explanation: 'Plane mirrors produce lateral inversion (left becomes right, right becomes left). Writing AMBULANCE in reverse ensures drivers ahead read it correctly in their mirrors.',
    hints: [
      'Plane mirrors interchange left and right sides of an object.',
      'When you raise your left hand in front of a mirror, your image raises its right hand.',
      'This left-right flipping is called lateral inversion.',
    ],
  },
  {
    id: 'ch_09_mirror_distance',
    nodeId: NODE_C7_PHY_009,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A student stands 2.5 meters in front of a large plane mirror. She then steps back by 1.5 meters away from the mirror. What is the total distance between the student and her virtual image now?',
    correctAnswer: 8,
    tolerance: 0.1,
    unit: 'meters',
    explanation: 'New distance to mirror = 2.5 + 1.5 = 4.0 meters. In a plane mirror, the image forms at an equal distance behind the mirror (4.0 meters). Total distance = 4.0 + 4.0 = 8.0 meters.',
    hints: [
      'Calculate the new distance between student and mirror first: 2.5m + 1.5m = 4.0m.',
      'In a plane mirror, object distance = image distance = 4.0m.',
      'Total distance from person to image = 4.0m + 4.0m = 8.0m.',
    ],
  },
  {
    id: 'ch_10_periscope_angles',
    nodeId: NODE_C7_PHY_010,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'In a submarine periscope, light rays enter horizontally through the top window and must emerge horizontally at the bottom eyepiece. At what angle to the horizontal light path must the two plane mirrors be set inside the periscope tube?',
    correctAnswer: 45,
    tolerance: 0.5,
    unit: 'degrees',
    explanation: 'To turn a light ray by 90° downwards and then 90° forward, each plane mirror must be mounted at 45° to the incoming ray path so that angle of incidence = 45° and total turn = 90°.',
    hints: [
      'The light beam needs to turn by 90 degrees at each corner.',
      'If light turns by 90°, angle of incidence + angle of reflection = 90°.',
      'Since angle(i) = angle(r), angle(i) = 45°, so mirror angle = 45°.',
    ],
  },
];

// ─── MISCONCEPTIONS CHECKLIST ───
const MISCONCEPTIONS_CHECKLIST = [
  {
    id: 'misc_01',
    title: 'Misconception: "Our eyes send out invisible light rays to see objects."',
    correction: 'Correct Concept: Eyes are passive optical receivers. Objects are visible ONLY because external light source photons bounce off them and enter our pupil.',
  },
  {
    id: 'misc_02',
    title: 'Misconception: "Shadows are physical dark objects or physical stains on the floor."',
    correction: 'Correct Concept: A shadow is simply an absence of light in a region blocked by an opaque barrier.',
  },
  {
    id: 'misc_03',
    title: 'Misconception: "A bigger pinhole in a camera makes the image bigger."',
    correction: 'Correct Concept: A bigger pinhole makes the image BRIGHTER and BLURRY, but image size depends ONLY on screen distance and object distance.',
  },
  {
    id: 'misc_04',
    title: 'Misconception: "Angle of incidence is measured relative to the mirror surface."',
    correction: 'Correct Concept: Angle of incidence is ALWAYS measured relative to the NORMAL line (the 90° perpendicular to the mirror surface).',
  },
  {
    id: 'misc_05',
    title: 'Misconception: "Inverted images in pinhole cameras are laterally flipped vertically and horizontally."',
    correction: 'Correct Concept: The image is inverted top-to-bottom and inverted left-to-right because straight light rays cross at the pinhole point.',
  },
];

// ─── MAIN COMPONENT ───
export default function C7_PhysicsLightShadowsReflectionsCBSESim() {
  // Navigation & Game State
  const [activeTab, setActiveTab] = useState<'discovery' | 'teach' | 'lab' | 'challenges' | 'misconceptions' | 'summary'>('discovery');
  const [slideIndex, setSlideIndex] = useState(0);
  const [challengeIndex, setChallengeIndex] = useState(0);

  // SRS & BKT Tracking
  const [bktState, setBktState] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  const [srsItems, setSrsItems] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createReviewItem(id, 'Physics');
    });
    return initial;
  });

  // Discovery Question State
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoverySelected, setDiscoverySelected] = useState<number | null>(null);

  // Challenge User Inputs
  const [userNumericInput, setUserNumericInput] = useState<string>('');
  const [userSelectedOption, setUserSelectedOption] = useState<number | null>(null);
  const [dragAssignments, setDragAssignments] = useState<Record<string, string>>({});
  const [challengeFeedback, setChallengeFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);

  // Feedback FX States
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccessBanner, setShowSuccessBanner] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [currentHintText, setCurrentHintText] = useState('');

  // Auto-hint timer reference
  const inactivityTimerRef = useRef<NodeJS.Timeout | null>(null);

  // ─── INTERACTIVE LAB CONTROLS STATE ───
  const [labMode, setLabMode] = useState<'propagation' | 'shadows' | 'reflection' | 'periscope'>('propagation');
  
  // Tab 1: Pinhole Camera Lab
  const [pinholeObjDist, setPinholeObjDist] = useState<number>(300); // cm
  const [pinholeScreenDist, setPinholeScreenDist] = useState<number>(20); // cm
  const [pinholeAperture, setPinholeAperture] = useState<number>(2); // mm
  const [objHeight, setObjHeight] = useState<number>(12); // cm

  // Tab 2: Shadow Lab
  const [lightSourceType, setLightSourceType] = useState<'point' | 'extended'>('extended');
  const [lightSourceRadius, setLightSourceRadius] = useState<number>(20); // px
  const [obstacleDistance, setObstacleDistance] = useState<number>(60); // cm
  const [screenDistanceShadow, setScreenDistanceShadow] = useState<number>(140); // cm
  const [obstacleMaterial, setObstacleMaterial] = useState<'opaque' | 'translucent' | 'transparent'>('opaque');

  // Tab 3: Reflection Lab
  const [incidentAngle, setIncidentAngle] = useState<number>(40); // degrees
  const [showNormal, setShowNormal] = useState<boolean>(true);
  const [showVirtualImage, setShowVirtualImage] = useState<boolean>(true);

  // Tab 4: Periscope Alignment Lab
  const [mirror1Angle, setMirror1Angle] = useState<number>(45); // degrees
  const [mirror2Angle, setMirror2Angle] = useState<number>(45); // degrees
  const [periscopeBeamAligned, setPeriscopeBeamAligned] = useState<boolean>(true);

  // Canvas Refs
  const pinholeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const shadowCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const reflectionCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const periscopeCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Speech Helper
  const triggerSpeech = useCallback((text: string) => {
    try {
      speechManager.speak(text);
    } catch (e) {
      console.warn('Speech syntax unsupported in current environment', e);
    }
  }, []);

  // Audio Helper
  const triggerAudio = useCallback((sound: SoundEffect) => {
    try {
      audioManager.play(sound);
    } catch (e) {
      console.warn('Audio playback error', e);
    }
  }, []);

  // Reset inactivity auto-hint
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (activeTab === 'challenges' && !challengeFeedback) {
        const curCh = CHALLENGES[challengeIndex];
        if (curCh && curCh.hints.length > 0) {
          setCurrentHintText(`Auto-Hint: ${curCh.hints[0]}`);
          setShowHint(true);
          triggerAudio('hint');
        }
      }
    }, 12000);
  }, [activeTab, challengeIndex, challengeFeedback, triggerAudio]);

  useEffect(() => {
    resetInactivityTimer();
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, [resetInactivityTimer, challengeIndex, activeTab]);

  // Calculated Pinhole values
  const pinholeImageHeight = useMemo(() => {
    const h_i = objHeight * (pinholeScreenDist / pinholeObjDist);
    return Math.round(h_i * 10) / 10;
  }, [objHeight, pinholeScreenDist, pinholeObjDist]);

  // Calculated Shadow values
  const shadowGeometry = useMemo(() => {
    const d_obj = obstacleDistance;
    const d_scr = screenDistanceShadow;
    const r_src = lightSourceType === 'point' ? 2 : lightSourceRadius;
    const r_obj = 25; // fixed obstacle radius in px

    if (d_scr <= d_obj) {
      return { umbraRadius: r_obj, penumbraRadius: r_obj };
    }

    // Similar triangle ratios
    const umbraRadius = Math.max(0, r_obj + (r_obj - r_src) * ((d_scr - d_obj) / d_obj));
    const penumbraRadius = r_obj + (r_obj + r_src) * ((d_scr - d_obj) / d_obj);

    return {
      umbraRadius: Math.round(umbraRadius),
      penumbraRadius: Math.round(penumbraRadius),
    };
  }, [lightSourceType, lightSourceRadius, obstacleDistance, screenDistanceShadow]);

  // ─── CANVAS DRAWING: PINHOLE CAMERA ───
  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'propagation') return;
    const canvas = pinholeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // Background optical bench grid
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 20) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    // Optical Axis
    const axisY = height / 2;
    ctx.strokeStyle = '#334155';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(10, axisY);
    ctx.lineTo(width - 10, axisY);
    ctx.stroke();
    ctx.setLineDash([]);

    // Object (Candle Flame on Left)
    const objX = 80;
    const candleH = Math.min(100, objHeight * 6);
    const topY = axisY - candleH;
    const botY = axisY;

    // Draw Candle Body
    ctx.fillStyle = '#f59e0b';
    ctx.fillRect(objX - 6, botY - candleH + 15, 12, candleH - 15);
    // Draw Candle Flame
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(objX, topY + 8, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fbbf24';
    ctx.beginPath();
    ctx.arc(objX, topY + 8, 4, 0, Math.PI * 2);
    ctx.fill();

    // Pinhole Box Structure
    const pinholeX = 320;
    const boxW = 160;
    const screenX = pinholeX + boxW;

    // Draw Dark Box
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.fillRect(pinholeX, axisY - 110, boxW, 220);
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 2;
    ctx.strokeRect(pinholeX, axisY - 110, boxW, 220);

    // Pinhole Wall & Gap
    const gapSize = Math.max(2, pinholeAperture * 2.5);
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#94a3b8';
    ctx.beginPath();
    ctx.moveTo(pinholeX, axisY - 110);
    ctx.lineTo(pinholeX, axisY - gapSize / 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(pinholeX, axisY + gapSize / 2);
    ctx.lineTo(pinholeX, axisY + 110);
    ctx.stroke();

    // Translucent Screen on Right of Box
    ctx.fillStyle = 'rgba(224, 242, 254, 0.4)';
    ctx.fillRect(screenX - 4, axisY - 100, 8, 200);
    ctx.strokeStyle = '#38bdf8';
    ctx.strokeRect(screenX - 4, axisY - 100, 8, 200);

    // Light Rays through Pinhole
    const imgScale = pinholeScreenDist / pinholeObjDist;
    const invH = candleH * imgScale;
    const invTopY = axisY + invH; // Inverted flame tip goes below axis!

    // Ray 1: Top of flame through pinhole to screen
    ctx.strokeStyle = '#f59e0b';
    ctx.lineWidth = Math.max(1, 3 - pinholeAperture * 0.3);
    ctx.shadowBlur = pinholeAperture * 2;
    ctx.shadowColor = '#f59e0b';

    ctx.beginPath();
    ctx.moveTo(objX, topY);
    ctx.lineTo(pinholeX, axisY);
    ctx.lineTo(screenX, invTopY);
    ctx.stroke();

    // Ray 2: Bottom of candle base through pinhole
    ctx.strokeStyle = '#38bdf8';
    ctx.beginPath();
    ctx.moveTo(objX, botY);
    ctx.lineTo(pinholeX, axisY);
    ctx.lineTo(screenX, axisY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Inverted Image on Translucent Screen
    ctx.save();
    ctx.translate(screenX + 10, axisY);
    ctx.scale(1, -1); // Upside down transform!
    ctx.fillStyle = 'rgba(245, 158, 11, ' + (1 / (pinholeAperture * 0.4 + 0.6)) + ')';
    ctx.fillRect(-6, 0, 12, invH - 15);
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.arc(0, invH - 8, 7, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Labels
    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px sans-serif';
    ctx.fillText('Object (H = ' + objHeight + ' cm)', objX - 30, axisY + 30);
    ctx.fillText('Pinhole', pinholeX - 22, axisY - 120);
    ctx.fillText('Inverted Real Image', screenX - 40, axisY + 125);
    ctx.fillText(`Image Height h_i = ${pinholeImageHeight} cm`, screenX - 45, axisY + 140);
  }, [activeTab, labMode, pinholeObjDist, pinholeScreenDist, pinholeAperture, objHeight, pinholeImageHeight]);

  // ─── CANVAS DRAWING: SHADOW FORMATION ───
  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'shadows') return;
    const canvas = shadowCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const centerY = height / 2;
    const srcX = 60;
    const obstacleX = srcX + obstacleDistance * 2.2;
    const screenX = srcX + screenDistanceShadow * 2.2;

    // Light Source
    const srcR = lightSourceType === 'point' ? 4 : lightSourceRadius;
    ctx.shadowBlur = 20;
    ctx.shadowColor = '#fef08a';
    ctx.fillStyle = '#fef08a';
    ctx.beginPath();
    ctx.arc(srcX, centerY, srcR, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Obstacle Object
    const obsR = 25;
    ctx.fillStyle = obstacleMaterial === 'opaque' ? '#475569' : obstacleMaterial === 'translucent' ? 'rgba(148, 163, 184, 0.6)' : 'rgba(56, 189, 248, 0.2)';
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(obstacleX, centerY, obsR, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Screen
    ctx.fillStyle = '#334155';
    ctx.fillRect(screenX, 20, 10, height - 40);

    // Shadow Geometry Lines & Cone
    const { umbraRadius, penumbraRadius } = shadowGeometry;

    if (obstacleMaterial === 'opaque') {
      // Penumbra Cone (Outer rays)
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.moveTo(srcX, centerY - srcR);
      ctx.lineTo(screenX, centerY + penumbraRadius);
      ctx.lineTo(screenX, centerY - penumbraRadius);
      ctx.lineTo(srcX, centerY + srcR);
      ctx.closePath();
      ctx.fill();

      // Umbra Cone (Inner rays)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
      ctx.beginPath();
      ctx.moveTo(obstacleX, centerY - obsR);
      ctx.lineTo(screenX, centerY - umbraRadius);
      ctx.lineTo(screenX, centerY + umbraRadius);
      ctx.lineTo(obstacleX, centerY + obsR);
      ctx.closePath();
      ctx.fill();

      // Light Rays Lines
      ctx.strokeStyle = 'rgba(254, 240, 138, 0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(srcX, centerY - srcR);
      ctx.lineTo(screenX, centerY - penumbraRadius);
      ctx.moveTo(srcX, centerY + srcR);
      ctx.lineTo(screenX, centerY + penumbraRadius);
      ctx.stroke();

      // Screen Shadow Profile Projection on right side
      ctx.fillStyle = '#000000'; // Umbra
      ctx.fillRect(screenX + 12, centerY - umbraRadius, 15, umbraRadius * 2);

      // Penumbra upper & lower
      ctx.fillStyle = '#475569';
      ctx.fillRect(screenX + 12, centerY - penumbraRadius, 15, penumbraRadius - umbraRadius);
      ctx.fillRect(screenX + 12, centerY + umbraRadius, 15, penumbraRadius - umbraRadius);
    } else if (obstacleMaterial === 'translucent') {
      ctx.fillStyle = 'rgba(100, 116, 139, 0.3)';
      ctx.fillRect(screenX + 12, centerY - penumbraRadius, 15, penumbraRadius * 2);
    }

    // Text Overlay Readouts
    ctx.fillStyle = '#f8fafc';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Source (${lightSourceType.toUpperCase()})`, srcX - 35, centerY + srcR + 25);
    ctx.fillText(`Obstacle (${obstacleMaterial})`, obstacleX - 35, centerY + obsR + 25);
    ctx.fillText('Screen', screenX - 15, 15);

    if (obstacleMaterial === 'opaque') {
      ctx.fillStyle = '#fbbf24';
      ctx.fillText(`Umbra Radius: ${umbraRadius} px`, screenX - 120, height - 35);
      ctx.fillText(`Penumbra Radius: ${penumbraRadius} px`, screenX - 120, height - 15);
    }
  }, [activeTab, labMode, lightSourceType, lightSourceRadius, obstacleDistance, screenDistanceShadow, obstacleMaterial, shadowGeometry]);

  // ─── CANVAS DRAWING: LAWS OF REFLECTION ───
  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'reflection') return;
    const canvas = reflectionCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const mirrorY = height - 80;
    const poiX = width / 2; // Point of incidence

    // Draw Plane Mirror Surface
    ctx.fillStyle = '#38bdf8';
    ctx.fillRect(50, mirrorY, width - 100, 10);
    // Mirror hatched backing line
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 1.5;
    for (let x = 55; x < width - 100; x += 12) {
      ctx.beginPath();
      ctx.moveTo(x, mirrorY + 10);
      ctx.lineTo(x - 8, mirrorY + 20);
      ctx.stroke();
    }

    // Draw Normal Line
    if (showNormal) {
      ctx.strokeStyle = '#94a3b8';
      ctx.setLineDash([6, 6]);
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(poiX, mirrorY);
      ctx.lineTo(poiX, 40);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = '#94a3b8';
      ctx.font = '12px sans-serif';
      ctx.fillText('Normal (N)', poiX - 28, 30);
    }

    // Calculations for incident and reflected rays
    const rad = (incidentAngle * Math.PI) / 180;
    const rayLength = 220;

    const incStartX = poiX - rayLength * Math.sin(rad);
    const incStartY = mirrorY - rayLength * Math.cos(rad);

    const refEndX = poiX + rayLength * Math.sin(rad);
    const refEndY = mirrorY - rayLength * Math.cos(rad);

    // Incident Ray
    ctx.strokeStyle = '#ef4444'; // Red incident beam
    ctx.lineWidth = 3;
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#ef4444';
    ctx.beginPath();
    ctx.moveTo(incStartX, incStartY);
    ctx.lineTo(poiX, mirrorY);
    ctx.stroke();

    // Reflected Ray
    ctx.strokeStyle = '#22c55e'; // Green reflected beam
    ctx.shadowColor = '#22c55e';
    ctx.beginPath();
    ctx.moveTo(poiX, mirrorY);
    ctx.lineTo(refEndX, refEndY);
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Angle Arcs
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 1.5;
    // Incident angle arc
    ctx.beginPath();
    ctx.arc(poiX, mirrorY, 50, -Math.PI / 2 - rad, -Math.PI / 2);
    ctx.stroke();
    // Reflected angle arc
    ctx.beginPath();
    ctx.arc(poiX, mirrorY, 50, -Math.PI / 2, -Math.PI / 2 + rad);
    ctx.stroke();

    // Virtual Image behind mirror demonstration
    if (showVirtualImage) {
      const objDist = 120;
      const realObjX = poiX - objDist;
      const realObjY = mirrorY - 60;
      const virtObjX = poiX + objDist;
      const virtObjY = mirrorY + 60;

      // Real Object (Candle)
      ctx.fillStyle = '#f59e0b';
      ctx.fillRect(realObjX - 5, realObjY, 10, 50);
      ctx.fillStyle = '#ef4444';
      ctx.beginPath();
      ctx.arc(realObjX, realObjY - 5, 6, 0, Math.PI * 2);
      ctx.fill();

      // Virtual Image (Dashed behind mirror)
      ctx.fillStyle = 'rgba(245, 158, 11, 0.4)';
      ctx.fillRect(virtObjX - 5, mirrorY + 10, 10, 50);

      // Distance dashed markers
      ctx.strokeStyle = '#38bdf8';
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(realObjX, mirrorY);
      ctx.lineTo(virtObjX, mirrorY);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#38bdf8';
      ctx.fillText(`Real Object (d_o = 1.2m)`, realObjX - 45, mirrorY - 70);
      ctx.fillText(`Virtual Image (d_i = 1.2m)`, virtObjX - 45, mirrorY + 75);
    }

    // Readout Labels
    ctx.fillStyle = '#ef4444';
    ctx.font = '14px sans-serif';
    ctx.fillText(`Incident Ray (i = ${incidentAngle}°)`, incStartX - 40, incStartY - 10);

    ctx.fillStyle = '#22c55e';
    ctx.fillText(`Reflected Ray (r = ${incidentAngle}°)`, refEndX - 20, refEndY - 10);

    ctx.fillStyle = '#fbbf24';
    ctx.font = '16px sans-serif';
    ctx.fillText(`Law Verified: Angle i (${incidentAngle}°) = Angle r (${incidentAngle}°)`, width / 2 - 130, height - 20);
  }, [activeTab, labMode, incidentAngle, showNormal, showVirtualImage]);

  // ─── CANVAS DRAWING: PERISCOPE RAY TRACING ───
  useEffect(() => {
    if (activeTab !== 'lab' || labMode !== 'periscope') return;
    const canvas = periscopeCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw Periscope Z-Tube Frame
    ctx.strokeStyle = '#475569';
    ctx.lineWidth = 6;
    ctx.beginPath();
    // Top Horizontal Snorkel
    ctx.moveTo(60, 60);
    ctx.lineTo(260, 60);
    ctx.lineTo(260, 280);
    ctx.lineTo(460, 280);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.lineTo(200, 120);
    ctx.lineTo(200, 340);
    ctx.lineTo(460, 340);
    ctx.stroke();

    // Top Mirror 1 at (230, 90)
    const m1X = 230;
    const m1Y = 90;
    const m1Rad = (mirror1Angle * Math.PI) / 180;
    const mLen = 45;

    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(m1X - mLen * Math.cos(m1Rad), m1Y - mLen * Math.sin(m1Rad));
    ctx.lineTo(m1X + mLen * Math.cos(m1Rad), m1Y + mLen * Math.sin(m1Rad));
    ctx.stroke();

    // Bottom Mirror 2 at (230, 310)
    const m2X = 230;
    const m2Y = 310;
    const m2Rad = (mirror2Angle * Math.PI) / 180;

    ctx.beginPath();
    ctx.moveTo(m2X - mLen * Math.cos(m2Rad), m2Y - mLen * Math.sin(m2Rad));
    ctx.lineTo(m2X + mLen * Math.cos(m2Rad), m2Y + mLen * Math.sin(m2Rad));
    ctx.stroke();

    // Check Ray Tracing Alignment
    const isAligned = mirror1Angle === 45 && mirror2Angle === 45;
    setPeriscopeBeamAligned(isAligned);

    // Laser Light Beam Path
    ctx.strokeStyle = '#38bdf8';
    ctx.lineWidth = 3;
    ctx.shadowBlur = 12;
    ctx.shadowColor = '#38bdf8';

    ctx.beginPath();
    ctx.moveTo(20, 90); // Entry ray
    ctx.lineTo(m1X, m1Y);

    if (isAligned) {
      ctx.lineTo(m2X, m2Y); // Vertical drop down channel
      ctx.lineTo(480, 310); // Emergence ray to eye
    } else {
      // Misaligned ray deflection bounce
      const defAngle1 = (90 - 2 * mirror1Angle) * (Math.PI / 180);
      const errY = m1Y + 220 * Math.cos(defAngle1);
      const errX = m1X + 220 * Math.sin(defAngle1);
      ctx.lineTo(errX, errY);
    }
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Draw Eye Observer on right bottom
    ctx.fillStyle = '#f8fafc';
    ctx.beginPath();
    ctx.arc(500, 310, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#0284c7';
    ctx.beginPath();
    ctx.arc(495, 310, 6, 0, Math.PI * 2);
    ctx.fill();

    // Alignment Status Glow
    ctx.font = '14px sans-serif';
    if (isAligned) {
      ctx.fillStyle = '#22c55e';
      ctx.fillText('✓ Beam Aligned: Target Sighted by Observer!', 140, 30);
    } else {
      ctx.fillStyle = '#ef4444';
      ctx.fillText('✕ Beam Misaligned: Adjust both mirror angles to 45°', 110, 30);
    }

    ctx.fillStyle = '#94a3b8';
    ctx.font = '12px sans-serif';
    ctx.fillText(`Mirror 1: ${mirror1Angle}°`, m1X - 80, m1Y - 10);
    ctx.fillText(`Mirror 2: ${mirror2Angle}°`, m2X - 80, m2Y + 25);
  }, [activeTab, labMode, mirror1Angle, mirror2Angle]);

  // ─── ACTION HANDLERS ───
  const handleDiscoverySubmit = (index: number) => {
    setDiscoverySelected(index);
    setDiscoveryAnswered(true);
    if (index === DISCOVERY_QUESTION.correctIndex) {
      triggerAudio('success');
      triggerSpeech('Spot on! Mirrors do not generate light; they only bounce existing rays.');
    } else {
      triggerAudio('error');
      triggerSpeech('Notice that without light photons entering our eyes, no reflection is visible.');
    }
  };

  const handleChallengeSubmit = () => {
    const curCh = CHALLENGES[challengeIndex];
    if (!curCh) return;

    let isCorrect = false;

    if (curCh.type === 'classify' || curCh.type === 'mcq') {
      isCorrect = userSelectedOption === curCh.correctIndex;
    } else if (curCh.type === 'numeric') {
      const val = parseFloat(userNumericInput);
      if (!isNaN(val) && curCh.correctAnswer !== undefined) {
        const tol = curCh.tolerance || 0.1;
        isCorrect = Math.abs(val - curCh.correctAnswer) <= tol;
      }
    } else if (curCh.type === 'drag-label') {
      if (curCh.correctMapping) {
        isCorrect = Object.entries(curCh.correctMapping).every(
          ([key, val]) => dragAssignments[key] === val
        );
      }
    }

    // Update SRS and BKT
    const node = curCh.nodeId;
    const oldBkt = bktState[node] || createBKTState();
    const updatedBkt = bktUpdate(oldBkt, isCorrect);
    setBktState((prev) => ({ ...prev, [node]: updatedBkt }));

    const oldSrs = srsItems[node] || createReviewItem(node, 'Physics');
    const updatedSrs = sm2Update(oldSrs, isCorrect ? 5 : 2, 0);
    setSrsItems((prev) => ({ ...prev, [node]: updatedSrs }));

    if (isCorrect) {
      triggerAudio('drop-correct');
      triggerAudio('sparkle');
      setShowSparkle(true);
      setShowSuccessBanner(true);
      setChallengeFeedback({ isCorrect: true, text: `Correct! ${curCh.explanation}` });
      triggerSpeech('Excellent work! Your optical physics calculation is spot on.');
      setTimeout(() => setShowSuccessBanner(false), 2500);
    } else {
      triggerAudio('drop-wrong');
      setChallengeFeedback({ isCorrect: false, text: `Not quite. ${curCh.explanation}` });
      triggerSpeech('Let us analyze the ray geometry and try again.');
    }
  };

  const nextChallenge = () => {
    setChallengeFeedback(null);
    setUserSelectedOption(null);
    setUserNumericInput('');
    setDragAssignments({});
    setShowHint(false);

    if (challengeIndex < CHALLENGES.length - 1) {
      setChallengeIndex((prev) => prev + 1);
      triggerAudio('tap');
    } else {
      // Finished all challenges
      const totalScore = Math.round(
        (Object.values(bktState).reduce((acc, curr) => acc + curr.pKnown, 0) / ALL_NODE_IDS.length) * 100
      );
      recordGameScore(ALL_NODE_IDS, totalScore);
      setActiveTab('summary');
      triggerAudio('celebration');
      setShowConfetti(true);
      triggerSpeech('Congratulations! You have successfully mastered Light, Shadows, and Reflections!');
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 text-slate-100 font-sans p-4 md:p-8 flex flex-col items-center">
      {/* HEADER BAR */}
      <header className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-amber-300 to-emerald-400">
            CBSE Class 7 Physics: Light, Shadows & Reflections
          </h1>
          <p className="text-sm text-slate-400 mt-1">{SCENARIO.title}</p>
        </div>

        {/* NAVIGATION TABS */}
        <nav className="flex flex-wrap gap-2 mt-4 md:mt-0">
          {(['discovery', 'teach', 'lab', 'challenges', 'misconceptions', 'summary'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                triggerAudio('tap');
              }}
              className={`px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                activeTab === tab
                  ? 'bg-sky-500 text-slate-950 shadow-lg shadow-sky-500/30'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </nav>
      </header>

      {/* VISUAL FEEDBACK OVERLAYS */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccessBanner} text="Mastery Point Earned!" />
      <SparkleBurst show={showSparkle} x={400} y={300} />
      <HintBubble show={showHint} text={currentHintText} />

      {/* MAIN CONTAINER */}
      <main className="w-full max-w-6xl bg-slate-900/80 rounded-2xl border border-slate-800 p-6 shadow-2xl backdrop-blur-md">
        
        {/* ─── MODE 1: DISCOVERY QUESTION ─── */}
        {activeTab === 'discovery' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="bg-sky-950/40 border border-sky-800/50 p-6 rounded-xl">
              <span className="text-xs font-bold text-sky-400 tracking-wider uppercase">Predict Before You Learn</span>
              <h2 className="text-xl font-bold text-slate-100 mt-2">{DISCOVERY_QUESTION.question}</h2>
              <p className="text-sm text-slate-400 mt-1">{DISCOVERY_QUESTION.hintAfter}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {DISCOVERY_QUESTION.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDiscoverySubmit(idx)}
                  disabled={discoveryAnswered}
                  className={`p-4 rounded-xl text-left font-medium border transition-all ${
                    discoverySelected === idx
                      ? idx === DISCOVERY_QUESTION.correctIndex
                        ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                        : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      : 'bg-slate-800/60 border-slate-700 text-slate-200 hover:bg-slate-800 hover:border-slate-600'
                  }`}
                >
                  <span className="inline-block w-6 h-6 rounded-full bg-slate-700 text-center text-xs leading-6 mr-3">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  {option}
                </button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 bg-slate-800 rounded-xl border border-slate-700 flex justify-between items-center">
                <p className="text-sm text-sky-300">
                  {discoverySelected === DISCOVERY_QUESTION.correctIndex
                    ? 'Correct! Light reflection is essential for human sight.'
                    : 'Remember: Sight requires light rays bouncing off an object into your eye!'}
                </p>
                <button
                  onClick={() => {
                    setActiveTab('teach');
                    triggerAudio('swoop');
                  }}
                  className="px-5 py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-lg shadow-md"
                >
                  Start Guided Lessons →
                </button>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* ─── MODE 2: TEACHING LESSONS ─── */}
        {activeTab === 'teach' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            <div className="flex justify-between items-center">
              <span className="text-xs font-semibold text-slate-400">
                Lesson {slideIndex + 1} of {TEACHING_SLIDES.length}
              </span>
              <div className="flex gap-2">
                <button
                  disabled={slideIndex === 0}
                  onClick={() => {
                    setSlideIndex((p) => p - 1);
                    triggerAudio('tap');
                  }}
                  className="px-3 py-1 bg-slate-800 disabled:opacity-40 rounded text-sm"
                >
                  Prev
                </button>
                <button
                  disabled={slideIndex === TEACHING_SLIDES.length - 1}
                  onClick={() => {
                    setSlideIndex((p) => p + 1);
                    triggerAudio('tap');
                  }}
                  className="px-3 py-1 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 rounded text-sm font-semibold"
                >
                  Next
                </button>
              </div>
            </div>

            {/* Current Slide Display */}
            {(() => {
              const slide = TEACHING_SLIDES[slideIndex];
              return (
                <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl space-y-4">
                  <h2 className="text-2xl font-bold text-amber-400">{slide.title}</h2>
                  <h3 className="text-md font-semibold text-sky-300">{slide.subtitle}</h3>

                  <ul className="space-y-3">
                    {slide.content.map((point, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-300 text-sm">
                        <span className="text-sky-400 font-bold">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  {slide.keyFormula && (
                    <div className="p-3 bg-slate-900 border border-amber-500/30 rounded-lg text-center font-mono text-amber-300">
                      {slide.keyFormula}
                    </div>
                  )}

                  <div className="p-3 bg-sky-950/50 border border-sky-800/40 rounded-lg text-xs text-sky-200">
                    <strong className="text-sky-400">Core Takeaway: </strong> {slide.conceptSummary}
                  </div>
                </div>
              );
            })()}

            <div className="flex justify-end gap-4">
              <button
                onClick={() => {
                  setActiveTab('lab');
                  triggerAudio('swoop');
                }}
                className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg"
              >
                Enter Interactive Optics Lab →
              </button>
            </div>
          </motion.div>
        )}

        {/* ─── MODE 3: INTERACTIVE LAB BENCH ─── */}
        {activeTab === 'lab' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* LAB SUB-NAVIGATION */}
            <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3">
              {[
                { id: 'propagation', label: '1. Rectilinear & Pinhole' },
                { id: 'shadows', label: '2. Shadow & Opacity' },
                { id: 'reflection', label: '3. Laws of Reflection' },
                { id: 'periscope', label: '4. Periscope Beam Tracing' },
              ].map((sub) => (
                <button
                  key={sub.id}
                  onClick={() => {
                    setLabMode(sub.id as any);
                    triggerAudio('tap');
                  }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    labMode === sub.id
                      ? 'bg-amber-400 text-slate-950'
                      : 'bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {sub.label}
                </button>
              ))}
            </div>

            {/* TAB 1: PINHOLE CAMERA CANVAS & CONTROLS */}
            {labMode === 'propagation' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <canvas ref={pinholeCanvasRef} width={600} height={320} className="w-full h-auto rounded-lg" />
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-amber-400 text-sm">Pinhole Optics Control</h3>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Object Distance ($u$):</span>
                      <span className="font-mono text-sky-400">{pinholeObjDist} cm</span>
                    </label>
                    <input
                      type="range"
                      min={150}
                      max={500}
                      value={pinholeObjDist}
                      onChange={(e) => setPinholeObjDist(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Box Depth / Screen Dist ($v$):</span>
                      <span className="font-mono text-sky-400">{pinholeScreenDist} cm</span>
                    </label>
                    <input
                      type="range"
                      min={10}
                      max={40}
                      value={pinholeScreenDist}
                      onChange={(e) => setPinholeScreenDist(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Pinhole Diameter:</span>
                      <span className="font-mono text-sky-400">{pinholeAperture} mm</span>
                    </label>
                    <input
                      type="range"
                      min={1}
                      max={6}
                      step={0.5}
                      value={pinholeAperture}
                      onChange={(e) => setPinholeAperture(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
                    <p>
                      <strong>Magnification Formula:</strong>{' $\\frac{h_i}{h_o} = \\frac{v}{u}$'}
                    </p>
                    <p className="text-amber-300">
                      {'Calculated Image Height: $h_i = '}{pinholeImageHeight}{'\\text{ cm}$'}
                    </p>
                    {pinholeAperture > 4 && (
                      <p className="text-rose-400 font-semibold">
                        ⚠ Larger aperture increases brightness but causes blur due to ray overlap!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: SHADOW & OPACITY LAB */}
            {labMode === 'shadows' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <canvas ref={shadowCanvasRef} width={600} height={320} className="w-full h-auto rounded-lg" />
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-amber-400 text-sm">Shadow Control Bench</h3>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Light Source Type:</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLightSourceType('point')}
                        className={`flex-1 py-1 text-xs rounded font-bold ${
                          lightSourceType === 'point' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Point Source
                      </button>
                      <button
                        onClick={() => setLightSourceType('extended')}
                        className={`flex-1 py-1 text-xs rounded font-bold ${
                          lightSourceType === 'extended' ? 'bg-amber-400 text-slate-950' : 'bg-slate-800 text-slate-400'
                        }`}
                      >
                        Extended Bulb
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 block mb-1">Material Transmission:</label>
                    <select
                      value={obstacleMaterial}
                      onChange={(e) => setObstacleMaterial(e.target.value as any)}
                      className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 p-2 rounded"
                    >
                      <option value="opaque">Opaque (Wood/Metal) - Total Block</option>
                      <option value="translucent">Translucent (Butter Paper) - Scattering</option>
                      <option value="transparent">Transparent (Clear Glass) - Direct Pass</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Obstacle Distance:</span>
                      <span className="font-mono text-sky-400">{obstacleDistance} cm</span>
                    </label>
                    <input
                      type="range"
                      min={30}
                      max={100}
                      value={obstacleDistance}
                      onChange={(e) => setObstacleDistance(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Screen Distance:</span>
                      <span className="font-mono text-sky-400">{screenDistanceShadow} cm</span>
                    </label>
                    <input
                      type="range"
                      min={obstacleDistance + 20}
                      max={220}
                      value={screenDistanceShadow}
                      onChange={(e) => setScreenDistanceShadow(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: LAWS OF REFLECTION */}
            {labMode === 'reflection' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <canvas ref={reflectionCanvasRef} width={600} height={320} className="w-full h-auto rounded-lg" />
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-amber-400 text-sm">Reflection Parameters</h3>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Angle of Incidence ($\angle i$):</span>
                      <span className="font-mono text-emerald-400">{incidentAngle}°</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={incidentAngle}
                      onChange={(e) => setIncidentAngle(Number(e.target.value))}
                      className="w-full accent-emerald-400"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="normCheck"
                      checked={showNormal}
                      onChange={(e) => setShowNormal(e.target.checked)}
                      className="accent-sky-400"
                    />
                    <label htmlFor="normCheck" className="text-xs text-slate-300">
                      Display Normal Line ($90^\circ$)
                    </label>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="virtCheck"
                      checked={showVirtualImage}
                      onChange={(e) => setShowVirtualImage(e.target.checked)}
                      className="accent-sky-400"
                    />
                    <label htmlFor="virtCheck" className="text-xs text-slate-300">
                      Display Plane Mirror Virtual Image
                    </label>
                  </div>

                  <div className="p-3 bg-slate-900 rounded-lg border border-slate-700 text-xs text-slate-300 space-y-1">
                    <p className="text-emerald-400 font-bold">1st Law: $\angle i = \angle r$</p>
                    <p>Plane Mirror Image is Virtual, Erect, Equal Distance ($d_i = d_o$), and Laterally Inverted.</p>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: PERISCOPE RAY TRACING */}
            {labMode === 'periscope' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
                  <canvas ref={periscopeCanvasRef} width={600} height={360} className="w-full h-auto rounded-lg" />
                </div>
                <div className="bg-slate-800/50 p-4 rounded-xl border border-slate-700 space-y-4">
                  <h3 className="font-bold text-amber-400 text-sm">Submarine Periscope Mirrors</h3>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Top Mirror Angle:</span>
                      <span className="font-mono text-sky-400">{mirror1Angle}°</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={mirror1Angle}
                      onChange={(e) => setMirror1Angle(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-slate-300 flex justify-between">
                      <span>Bottom Mirror Angle:</span>
                      <span className="font-mono text-sky-400">{mirror2Angle}°</span>
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={90}
                      value={mirror2Angle}
                      onChange={(e) => setMirror2Angle(Number(e.target.value))}
                      className="w-full accent-sky-400"
                    />
                  </div>

                  <button
                    onClick={() => {
                      setMirror1Angle(45);
                      setMirror2Angle(45);
                      triggerAudio('chime');
                    }}
                    className="w-full py-2 bg-sky-600 hover:bg-sky-500 text-xs font-bold rounded-lg text-slate-950"
                  >
                    Auto-Align Mirrors to 45°
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* ─── MODE 4: CHALLENGES ─── */}
        {activeTab === 'challenges' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
            {/* Progress Header */}
            <div className="flex justify-between items-center bg-slate-800/60 p-4 rounded-xl border border-slate-700">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider">Challenge</span>
                <h3 className="text-lg font-bold text-sky-400">
                  {challengeIndex + 1} of {CHALLENGES.length}
                </h3>
              </div>
              <div className="flex gap-2">
                <span className="px-2.5 py-1 rounded bg-amber-950/80 border border-amber-600 text-amber-300 text-xs font-bold">
                  {CHALLENGES[challengeIndex].difficulty.toUpperCase()}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-slate-300 text-xs">
                  {CHALLENGES[challengeIndex].competencyLevel.toUpperCase()}
                </span>
              </div>
            </div>

            {/* Challenge Question Card */}
            {(() => {
              const curCh = CHALLENGES[challengeIndex];
              return (
                <div className="bg-slate-800/40 border border-slate-700 p-6 rounded-xl space-y-5">
                  <h2 className="text-lg font-bold text-slate-100">{curCh.question}</h2>

                  {/* Multiple Choice / Classification */}
                  {(curCh.type === 'classify' || curCh.type === 'mcq') && curCh.options && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {curCh.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => setUserSelectedOption(i)}
                          className={`p-3.5 rounded-xl text-left text-sm font-medium border transition-all ${
                            userSelectedOption === i
                              ? 'bg-sky-950 border-sky-400 text-sky-200'
                              : 'bg-slate-900/80 border-slate-700 text-slate-300 hover:bg-slate-800'
                          }`}
                        >
                          <span className="font-bold mr-2">{String.fromCharCode(65 + i)}.</span> {opt}
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Numeric Input */}
                  {curCh.type === 'numeric' && (
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                      <input
                        type="number"
                        placeholder="Enter numerical answer"
                        value={userNumericInput}
                        onChange={(e) => setUserNumericInput(e.target.value)}
                        className="p-3 bg-slate-950 border border-slate-700 rounded-xl text-slate-100 font-mono text-lg focus:outline-none focus:border-sky-400 w-full sm:w-64"
                      />
                      <span className="text-slate-400 font-bold text-sm">{curCh.unit || ''}</span>
                    </div>
                  )}

                  {/* Drag-Label Matching */}
                  {curCh.type === 'drag-label' && curCh.dragItems && (
                    <div className="space-y-4">
                      <p className="text-xs text-slate-400">Assign each optical label to the matching material slot:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {curCh.dragItems.map((item) => (
                          <div key={item.targetId} className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                            <span className="text-xs font-mono text-amber-400 uppercase">{item.targetId.replace('box_', '')}</span>
                            <select
                              value={dragAssignments[item.targetId] || ''}
                              onChange={(e) =>
                                setDragAssignments((prev) => ({ ...prev, [item.targetId]: e.target.value }))
                              }
                              className="w-full bg-slate-900 border border-slate-700 text-xs text-slate-200 p-2 rounded"
                            >
                              <option value="">Select label...</option>
                              <option value="Opaque Material">Opaque Material</option>
                              <option value="Transparent Material">Transparent Material</option>
                              <option value="Translucent Material">Translucent Material</option>
                            </select>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Feedback Message */}
                  {challengeFeedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-xl text-sm border ${
                        challengeFeedback.isCorrect
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-rose-950/80 border-rose-500 text-rose-200'
                      }`}
                    >
                      {challengeFeedback.text}
                    </motion.div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex flex-wrap justify-between items-center gap-3 pt-2">
                    <button
                      onClick={() => {
                        setCurrentHintText(curCh.hints[0] || 'Analyze the optical ray principles!');
                        setShowHint(true);
                        triggerAudio('hint');
                      }}
                      className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg"
                    >
                      💡 Request Hint
                    </button>

                    {!challengeFeedback ? (
                      <button
                        onClick={handleChallengeSubmit}
                        className="px-6 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-xl shadow-lg"
                      >
                        Submit Answer
                      </button>
                    ) : (
                      <button
                        onClick={nextChallenge}
                        className="px-6 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold rounded-xl shadow-lg"
                      >
                        {challengeIndex < CHALLENGES.length - 1 ? 'Next Challenge →' : 'View Mission Summary'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* ─── MODE 5: MISCONCEPTIONS CHECKLIST ─── */}
        {activeTab === 'misconceptions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <h2 className="text-xl font-bold text-amber-400 mb-2">Common Physics Misconceptions</h2>
            <div className="grid grid-cols-1 gap-4">
              {MISCONCEPTIONS_CHECKLIST.map((item) => (
                <div key={item.id} className="p-4 bg-slate-800/60 border border-slate-700 rounded-xl space-y-2">
                  <h3 className="text-md font-bold text-rose-300">{item.title}</h3>
                  <p className="text-sm text-emerald-300 font-medium">{item.correction}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ─── MODE 6: SUMMARY & MASTERY DASHBOARD ─── */}
        {activeTab === 'summary' && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6 text-center py-4">
            <div className="inline-block p-4 bg-emerald-950/80 border border-emerald-500 rounded-full text-4xl mb-2">
              🏆
            </div>
            <h2 className="text-2xl font-extrabold text-slate-100">ISRO Mission Telemetry Verified!</h2>
            <p className="text-sm text-slate-300 max-w-xl mx-auto">
              You have successfully completed the CBSE Class 7 Light, Shadows, and Reflections module. All optical parameters, pinhole dynamics, and reflection geometry are calibrated!
            </p>

            {/* Mastery Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-w-2xl mx-auto pt-4 text-left">
              {ALL_NODE_IDS.map((nodeId, idx) => {
                const pKnown = bktState[nodeId]?.pKnown || 0.1;
                const masteryPct = Math.round(pKnown * 100);
                return (
                  <div key={nodeId} className="p-3 bg-slate-800/70 border border-slate-700 rounded-xl">
                    <span className="text-[10px] text-slate-400 uppercase font-mono">Node #{idx + 1}</span>
                    <div className="text-xs font-bold text-slate-200 truncate">{nodeId}</div>
                    <div className="w-full bg-slate-900 h-2 rounded-full mt-2 overflow-hidden">
                      <div className="bg-sky-400 h-full transition-all" style={{ width: `${masteryPct}%` }} />
                    </div>
                    <span className="text-[10px] text-sky-300 font-mono mt-1 block">{masteryPct}% Mastery</span>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => {
                setActiveTab('lab');
                triggerAudio('swoop');
              }}
              className="mt-6 px-8 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold rounded-xl shadow-xl transition-all"
            >
              Re-enter Sandbox Lab
            </button>
          </motion.div>
        )}
      </main>
    </div>
  );
}