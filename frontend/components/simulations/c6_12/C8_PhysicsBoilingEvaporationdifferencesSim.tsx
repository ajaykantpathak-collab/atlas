'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioManager, speechManager, Confetti, SuccessBanner, HintBubble, SparkleBurst } from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// Node IDs as string literals
const NODE_C8_PHY_021 = 'c8_phy_021'; // Boiling and evaporation (differences)
const NODE_C8_PHY_022 = 'c8_phy_022'; // Linear expansion of solids
const NODE_C8_PHY_023 = 'c8_phy_023'; // Superficial (area) expansion of solids
const NODE_C8_PHY_024 = 'c8_phy_024'; // Volume (cubical) expansion of solids and liquids
const NODE_C8_PHY_025 = 'c8_phy_025'; // Pitch and frequency in musical instruments
const NODE_C8_PHY_026 = 'c8_phy_026'; // Loudness and amplitude (decibels)
const NODE_C8_PHY_027 = 'c8_phy_027'; // Static electricity and charge by friction
const NODE_C8_PHY_028 = 'c8_phy_028'; // Charging by conduction
const NODE_C8_PHY_029 = 'c8_phy_029'; // Charging by induction
const NODE_C8_PHY_030 = 'c8_phy_030'; // Electroscope

const ALL_NODE_IDS = [
  NODE_C8_PHY_021,
  NODE_C8_PHY_022,
  NODE_C8_PHY_023,
  NODE_C8_PHY_024,
  NODE_C8_PHY_025,
  NODE_C8_PHY_026,
  NODE_C8_PHY_027,
  NODE_C8_PHY_028,
  NODE_C8_PHY_029,
  NODE_C8_PHY_030,
];

// Narrative Scenario
const SCENARIO = {
  title: 'The Great Indian Science Investigation',
  intro: 'You have been appointed as Chief Science Analyst at the National Physics Laboratory. From inspecting warped railway tracks in the scorching Thar Desert to tuning classical sitars in Varanasi and investigating electrostatic sparks in Bangalore cleanrooms, your team needs deep physics intuition to diagnose and solve critical engineering puzzles.',
  context: 'Explore thermal vaporization, 1D/2D/3D thermal expansion, acoustic characteristics of musical instruments, and electrostatic charge mechanisms through live interactive apparatuses.',
};

// Discovery Question (curiosity hook)
const DISCOVERY_QUESTION = {
  question: 'On a humid 35°C monsoon afternoon in Kolkata, a tea kettle boils at 100°C while wet clothes dry on the balcony. Which statement correctly identifies their physical nature?',
  options: [
    'Both are bulk phenomena requiring external heat source to raise temperature.',
    'Boiling happens throughout the liquid at 100°C; evaporation happens only at the liquid surface at any temperature causing cooling.',
    'Evaporation is faster than boiling because humidity adds extra water molecules to the clothes.',
    'Boiling causes the water to cool down while evaporation heats up the surrounding air.',
  ],
  correctIndex: 1,
  hintAfter: "Don't worry if you missed it! Let us dive into molecular interactions to discover why evaporation and boiling are fundamentally different.",
};

// Challenge Interface
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

// 22 Progressive Challenges across all 10 nodes
const CHALLENGES: Challenge[] = [
  // 1. Boiling vs Evaporation - Foundation
  {
    id: 'ch_01',
    nodeId: NODE_C8_PHY_021,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'Why does sweat evaporating from your skin on a hot summer day in Delhi produce a cooling sensation?',
    options: [
      'Cold air molecules condense onto the skin and freeze the sweat layer.',
      'High-energy (fastest) molecules escape, lowering the average kinetic energy of the remaining liquid.',
      'Sweat absorbs cold moisture directly from the humid atmospheric breeze.',
      'Evaporation creates tiny ice crystals on the epidermis due to skin pressure.',
    ],
    correctIndex: 1,
    explanation: 'Temperature is a measure of average molecular kinetic energy. When the fastest, highest-energy molecules escape from the surface during evaporation, the remaining molecules have a lower average kinetic energy, causing the temperature of the liquid and your skin to drop.',
    hints: [
      'Think about which molecules are able to break free from the liquid surface.',
      'What happens to the average energy of a group when the most energetic members leave?',
      'Escaping high-energy molecules leave behind slower molecules, lowering the liquid temperature.',
    ],
    misconceptionIndex: 2,
  },
  // 2. Linear Expansion - Foundation (drag-label)
  {
    id: 'ch_02',
    nodeId: NODE_C8_PHY_022,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Drag each railway track component and thermal phenomenon label to its correct location on the track safety diagram.',
    dragItems: [
      { label: 'Expansion Gap', targetId: 'target_gap' },
      { label: 'Steel Rail (1D Linear Expansion)', targetId: 'target_rail' },
      { label: 'Fishplate Joint Fastener', targetId: 'target_joint' },
      { label: 'Concrete Sleeper Bed', targetId: 'target_sleeper' },
    ],
    correctMapping: {
      target_gap: 'Expansion Gap',
      target_rail: 'Steel Rail (1D Linear Expansion)',
      target_joint: 'Fishplate Joint Fastener',
      target_sleeper: 'Concrete Sleeper Bed',
    },
    explanation: 'Small expansion gaps are left between successive steel rails. During hot summers (Delta T > 30°C), linear expansion increases the length of each rail (Delta L = alpha * L * Delta T). The gaps allow free lengthening, preventing violent thermal buckling.',
    hints: [
      'The open space between adjacent rail sections prevents structural collision during hot days.',
      'The long metallic beam running horizontally is where 1D expansion occurs.',
      'Identify the horizontal rail, the gap between rails, the supporting sleepers below, and the connector.',
    ],
    misconceptionIndex: 0,
  },
  // 3. Superficial Expansion - Standard (Numeric)
  {
    id: 'ch_03',
    nodeId: NODE_C8_PHY_023,
    type: 'numeric',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'A square aluminium sheet used in solar panels in Rajasthan has an initial side of 100 cm (Area = 10,000 cm²). After heating in direct sunlight, each side expands linearly by 0.5 cm to 100.5 cm. What is the increase in area (in cm²)?',
    correctAnswer: 100.25,
    tolerance: 0.5,
    unit: 'cm²',
    explanation: 'Original area A1 = 100 cm x 100 cm = 10,000 cm². New area A2 = 100.5 cm x 100.5 cm = 10,100.25 cm². Area increase Delta A = 10,100.25 - 10,000 = 100.25 cm². Notice that the fractional area expansion (~1.0025%) is roughly double the linear expansion (~0.5%).',
    hints: [
      'Calculate the new area by squaring the expanded side length (100.5 x 100.5).',
      'Subtract the initial area of 10,000 cm² from your new area calculation.',
      '100.5 x 100.5 = 10,100.25. The difference is 100.25 cm².',
    ],
  },
  // 4. Volume Expansion - Standard (Drag-Sort)
  {
    id: 'ch_04',
    nodeId: NODE_C8_PHY_024,
    type: 'drag-sort',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Arrange the sequence of events explaining why a glass flask completely filled to the brim with water overflows when placed in a hot water bath.',
    sortItems: [
      'Both glass flask and water absorb thermal energy and their temperatures rise.',
      'Water molecules gain kinetic energy and expand in volume significantly more than the solid glass.',
      'The internal volumetric capacity of the glass flask increases only slightly.',
      'Excess water volume cannot be accommodated and spills over the flask rim.',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'Liquids have weaker intermolecular cohesive forces than solids, causing liquids to have a much higher coefficient of cubical expansion than glass. Although both expand, the liquid expands more rapidly, causing immediate overflow.',
    hints: [
      'Start with the initial heat absorption by both materials.',
      'Compare how freely liquid particles can separate compared to solid particles.',
      'End with the resulting physical overflow when the liquid volume exceeds the flask capacity.',
    ],
    misconceptionIndex: 1,
  },
  // 5. Pitch and Frequency - Foundation
  {
    id: 'ch_05',
    nodeId: NODE_C8_PHY_025,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'A sitar maestro in Varanasi wants to produce a higher pitch note from a vibrating string. Which physical modification will achieve this?',
    options: [
      'Plucking the string with a much larger force without touching the frets.',
      'Pressing the string closer to the bridge to shorten the vibrating length.',
      'Replacing the thin wire with a thicker, heavier bronze string.',
      'Loosening the wooden tuning peg to decrease the tension.',
    ],
    correctIndex: 1,
    explanation: 'Pitch depends directly on frequency. The fundamental frequency of a vibrating string increases when its length is shortened, when its tension is increased, or when its linear mass density (thickness) is decreased. Pressing the fret shortens the vibrating length, raising the pitch.',
    hints: [
      'Remember: shorter, tighter, and thinner strings vibrate faster.',
      'Higher frequency of vibration produces a higher perceived musical pitch.',
      'Stopping the string closer to the bridge shortens the vibrating portion, increasing vibrations per second.',
    ],
    misconceptionIndex: 3,
  },
  // 6. Loudness and Amplitude - Standard
  {
    id: 'ch_06',
    nodeId: NODE_C8_PHY_026,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'During a Diwali celebration, a student stands 5 m away from a loudspeaker blasting music at 90 dB. If the volume knob is turned up so the sound intensity level reaches 120 dB, what is the immediate physiological risk?',
    options: [
      'The pitch of the music will instantly double into the ultrasonic range.',
      'The sound has reached the threshold of pain, risking immediate auditory tissue damage.',
      'The frequency drops to 0 Hz, turning the sound into pure static electricity.',
      'No risk at all, because human ears only detect damage above 200 dB.',
    ],
    correctIndex: 1,
    explanation: 'On the decibel (dB) scale: 0 dB is the threshold of hearing, 60 dB is normal conversation, 85 dB is the prolonged safe exposure limit, and 120 dB is the threshold of pain where acoustic energy causes acute physical pain and ear trauma.',
    hints: [
      'Review the standard decibel scale benchmarks.',
      'Sound levels above 85 dB cause gradual hearing loss; what happens at 120 dB?',
      '120 dB represents the physiological threshold of pain.',
    ],
  },
  // 7. Static Electricity & Friction - Foundation
  {
    id: 'ch_07',
    nodeId: NODE_C8_PHY_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When a clean glass rod is rubbed briskly with a piece of dry silk cloth, what fundamental subatomic transfer occurs?',
    options: [
      'Protons move from silk to glass, making the glass positive.',
      'Electrons transfer from the glass rod to the silk cloth, leaving the glass positively charged.',
      'New positive charges are chemically created out of frictional heat energy.',
      'Electrons transfer from silk to glass, making the silk positively charged.',
    ],
    correctIndex: 1,
    explanation: 'Only electrons (the outer mobile subatomic particles) transfer during friction. Glass has a lower electron affinity than silk, so electrons transfer from glass to silk. The glass ends up with a deficit of electrons (positive) and silk with an excess of electrons (negative). Charge is conserved.',
    hints: [
      'Protons are tightly bound in atomic nuclei and NEVER transfer during electrostatic rubbing.',
      'Recall the syllabus pair: Glass + Silk -> Glass becomes POSITIVE.',
      'Glass loses electrons to silk.',
    ],
    misconceptionIndex: 4,
  },
  // 8. Charging by Conduction - Standard
  {
    id: 'ch_08',
    nodeId: NODE_C8_PHY_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'understanding',
    question: 'A negatively charged ebonite rod is brought into direct physical contact with an insulated neutral metal sphere. What charge does the sphere acquire, and why?',
    options: [
      'Positive charge, because friction between the rod and sphere strips away electrons.',
      'Negative charge, because excess mobile electrons flow from the rod into the neutral sphere by contact.',
      'Neutral charge, because conductors immediately destroy any static charge.',
      'Opposite charge to the rod because of electrostatic induction across the contact point.',
    ],
    correctIndex: 1,
    explanation: 'Charging by conduction requires direct contact. Excess electrons on the negatively charged rod repel each other and flow into the neutral metal conductor until charge is shared. The neutral body always acquires the SAME sign of charge as the charging body.',
    hints: [
      'Conduction involves direct touch and electron sharing.',
      'Does conduction produce the SAME sign or OPPOSITE sign of charge?',
      'Excess electrons flow into the sphere, giving it a negative charge identical to the rod.',
    ],
  },
  // 9. Charging by Induction - Advanced (drag-sort)
  {
    id: 'ch_09',
    nodeId: NODE_C8_PHY_029,
    type: 'drag-sort',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'Arrange the 4 mandatory steps in correct chronological order to permanently charge a neutral metal sphere POSITIVELY using a negatively charged rod via electrostatic induction.',
    sortItems: [
      'Bring the negatively charged rod near (without touching) the left side of the sphere to induce charge separation.',
      'Connect the far side of the sphere to Earth (grounding) so repelled electrons escape.',
      'Disconnect the Earth ground wire while keeping the charged rod firmly in place.',
      'Remove the negatively charged rod so remaining positive charge redistributes uniformly.',
    ],
    correctOrder: [0, 1, 2, 3],
    explanation: 'In induction: (1) Bring inducing body near -> charge separation. (2) Ground the far side -> repelled electrons escape. (3) Break ground connection FIRST -> trap the deficit. (4) Remove inducing body -> net positive charge spreads. The final charge is OPPOSITE to the inducing body.',
    hints: [
      'Charge separation must occur before grounding can drain electrons.',
      'CRITICAL: If you remove the rod before breaking the ground, electrons rush back from Earth!',
      'Sequence: Approach -> Ground -> Break Ground -> Remove Rod.',
    ],
  },
  // 10. Electroscope Sign Testing - Advanced
  {
    id: 'ch_09_b',
    nodeId: NODE_C8_PHY_030,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'A gold-leaf electroscope is already positively charged (leaves diverged). An unknown metal cylinder X is brought NEAR the top brass disc without touching. The gold leaves collapse slightly (divergence decreases). What is the sign of charge on cylinder X?',
    options: [
      'Cylinder X is positively charged, because positive repels the leaves together.',
      'Cylinder X is negatively charged, because it attracts positive charge upward toward the disc, reducing leaf repulsion.',
      'Cylinder X is completely uncharged and made of pure diamond insulator.',
      'Cylinder X has an infinite voltage that neutralises the Earth magnetic field.',
    ],
    correctIndex: 1,
    explanation: 'When an electroscope is positively charged, bringing a NEGATIVE body near the disc attracts positive charge upward toward the disc (or repels electrons downward toward the leaves), reducing the positive charge density on the leaves and decreasing their divergence. Decreased divergence indicates OPPOSITE charge.',
    hints: [
      'Think about charge redistribution inside the continuous metal rod.',
      'Increased divergence = SAME sign as electroscope. Decreased divergence = OPPOSITE sign.',
      'Since the electroscope is positive and divergence decreased, cylinder X must be negative.',
    ],
  },
  // 11. Boiling vs Evaporation - Standard (Construct)
  {
    id: 'ch_11',
    nodeId: NODE_C8_PHY_021,
    type: 'construct',
    difficulty: 'standard',
    competencyLevel: 'creativity',
    question: 'Construct the scientific definition of Boiling by selecting the 4 correct phrase tiles in logical sequence.',
    availableParts: [
      'Vaporization throughout the entire bulk of liquid',
      'at a fixed characteristic boiling point temperature',
      'where vapor pressure equals atmospheric pressure',
      'forming rapid bubbles that escape violently',
      'occurring only at the surface boundary',
      'at any random room temperature',
    ],
    targetState: 'Vaporization throughout the entire bulk of liquid at a fixed characteristic boiling point temperature where vapor pressure equals atmospheric pressure forming rapid bubbles that escape violently',
    validationHint: 'Select the 4 bulk-phenomenon tiles describing fixed boiling point, vapor pressure equilibrium, and bubble formation.',
    explanation: 'Boiling is a bulk vaporization phenomenon occurring at a fixed boiling point (100°C for water at 1 atm) where internal saturated vapor pressure matches external pressure, forming bubbles throughout.',
    hints: [
      'Avoid tiles mentioning "surface boundary only" or "any random room temperature" (those describe evaporation).',
      'Include bulk vaporization, fixed temperature, vapor pressure equilibrium, and bubbles.',
      'Assemble: Vaporization throughout bulk -> fixed boiling point -> vapor pressure equals atmospheric pressure -> bubbles escape.',
    ],
  },
  // 12. Linear Expansion Engineering - Advanced
  {
    id: 'ch_12',
    nodeId: NODE_C8_PHY_022,
    type: 'distinguish',
    difficulty: 'advanced',
    competencyLevel: 'evaluation',
    question: 'Why does a thick glass tumbler shatter when boiling tea is suddenly poured inside, whereas a very thin Pyrex glass tube remains undamaged?',
    options: [
      'Thick glass contains compressed air bubbles that explode on contact with hot water.',
      'Glass is a poor thermal conductor; the inner surface expands immediately while the outer layer remains cool, creating severe unequal thermal stress.',
      'Thin glass has zero coefficient of expansion and never expands under any temperature.',
      'Boiling tea reacts chemically with thick soda-lime glass to dissolve the silicate lattice.',
    ],
    correctIndex: 1,
    explanation: 'Glass is a poor conductor of heat. In a thick glass vessel, the inner wall heats and expands immediately (superficial/linear expansion), while the cold outer wall does not expand yet. This steep thermal gradient creates massive mechanical shear stresses that fracture brittle glass.',
    hints: [
      'Consider heat conduction rate across thick walls versus thin walls.',
      'Unequal expansion between inner and outer surfaces causes internal tension.',
      'The inner hot layer tries to expand while the outer cold layer resists, tearing the glass apart.',
    ],
  },
  // 13. Volume Expansion of Liquids - Foundation
  {
    id: 'ch_13',
    nodeId: NODE_C8_PHY_024,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'How does the volumetric thermal expansion of liquids generally compare to that of solids for the exact same rise in temperature (Delta T)?',
    options: [
      'Liquids expand significantly more than solids because intermolecular forces are weaker.',
      'Solids expand much more than liquids because atoms are packed tighter.',
      'Both solids and liquids expand by the exact same volume according to Boyle’s Law.',
      'Liquids contract when heated, while solids expand indefinitely.',
    ],
    correctIndex: 0,
    explanation: 'In liquids, intermolecular attractions are weaker and particles have greater mobility than in rigid crystal lattices of solids. Therefore, supplying thermal energy causes liquid particles to increase their average separation much more than solid particles.',
    hints: [
      'Recall why mercury or alcohol climbs rapidly in a narrow thermometer capillary.',
      'Are bonds between molecules stronger in a solid or in a liquid?',
      'Weaker bonds in liquids permit substantially larger volumetric expansion.',
    ],
  },
  // 14. Musical Instruments - Wind Column - Standard
  {
    id: 'ch_14',
    nodeId: NODE_C8_PHY_025,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'application',
    question: 'When a bansuri (bamboo flute) player lifts several fingers to open tone holes starting from the distal end, how do the vibrating air column and pitch change?',
    options: [
      'The air column lengthens and the frequency decreases, producing a lower pitch note.',
      'The effective vibrating air column shortens, increasing the frequency of vibration and raising the pitch.',
      'The amplitude of the sound wave increases, making the flute sound like a dhol drum.',
      'The speed of sound in air drops to zero inside the flute body.',
    ],
    correctIndex: 1,
    explanation: 'Opening finger holes along a wind instrument shortens the effective vibrating air column between the embouchure hole and the first open escape hole. A shorter air column vibrates at a higher frequency, raising the perceived musical pitch.',
    hints: [
      'Opening holes allows sound pressure waves to escape earlier.',
      'Does shorter vibrating length mean higher or lower frequency?',
      'Shorter air column -> higher frequency -> higher pitch.',
    ],
  },
  // 15. Sound Decibel Math - Advanced (Numeric)
  {
    id: 'ch_15',
    nodeId: NODE_C8_PHY_026,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'analysis',
    question: 'A quiet library reading room in New Delhi measures 30 dB (whisper level), while busy traffic on Connaught Place reaches 80 dB. What is the difference in sound level (in dB)?',
    correctAnswer: 50,
    tolerance: 0,
    unit: 'dB',
    explanation: 'Difference = 80 dB - 30 dB = 50 dB. Since every 10 dB increase represents roughly a doubling of perceived loudness and a 10-fold increase in sound intensity, a 50 dB increase represents a 100,000-fold increase in acoustic energy!',
    hints: [
      'Subtract the library sound level (30 dB) from the traffic sound level (80 dB).',
      '80 - 30 = ?',
      'The arithmetic difference is exactly 50 dB.',
    ],
  },
  // 16. Ebonite & Fur Friction - Foundation
  {
    id: 'ch_16',
    nodeId: NODE_C8_PHY_027,
    type: 'classify',
    difficulty: 'foundation',
    competencyLevel: 'recall',
    question: 'When an ebonite rod is rubbed with animal fur or flannel wool, what are the final signs of charge acquired by each body?',
    options: [
      'Ebonite becomes negative (gains electrons), Fur becomes positive (loses electrons).',
      'Ebonite becomes positive (loses protons), Fur becomes negative (gains protons).',
      'Both ebonite and fur become positively charged due to friction heat.',
      'Neither body acquires any charge because ebonite is an electrical conductor.',
    ],
    correctIndex: 0,
    explanation: 'Ebonite (hard vulcanised rubber) has a high electronegativity and strips electrons from the fur. The ebonite rod acquires an excess of electrons (negative charge), and the fur is left with a deficit of electrons (positive charge).',
    hints: [
      'Remember the two ICSE core pairs: Glass + Silk -> Glass is (+), Ebonite + Fur -> Ebonite is (-).',
      'Ebonite gains electrons, making it negative.',
      'Ebonite is negative, fur is positive.',
    ],
  },
  // 17. Conduction vs Induction - Standard
  {
    id: 'ch_17',
    nodeId: NODE_C8_PHY_028,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Which of the following correctly highlights a fundamental difference between charging by conduction and charging by induction?',
    options: [
      'Conduction requires direct physical contact and yields the SAME sign; induction requires no contact and yields the OPPOSITE sign after grounding.',
      'Conduction requires grounding the source; induction requires rubbing with wool.',
      'Conduction creates brand new electrons; induction destroys existing protons.',
      'Conduction only works on glass insulators; induction only works on plastic pens.',
    ],
    correctIndex: 0,
    explanation: 'In conduction, direct physical touch allows existing charge to flow and be shared, leaving both bodies with the same sign. In induction, electrostatic repulsion/attraction redistributes internal free charges without contact, and subsequent earthing produces an opposite net charge.',
    hints: [
      'Compare contact requirements and the resulting charge polarities.',
      'Conduction = touch -> same sign. Induction = no touch -> opposite sign.',
      'Option A correctly pairs contact and resulting signs.',
    ],
    misconceptionIndex: 0,
  },
  // 18. Electroscope Construction - Foundation (drag-label)
  {
    id: 'ch_18',
    nodeId: NODE_C8_PHY_030,
    type: 'drag-label',
    difficulty: 'foundation',
    competencyLevel: 'understanding',
    question: 'Label the 4 anatomical components of the Gold-Leaf Electroscope apparatus.',
    dragItems: [
      { label: 'Brass Disc / Metal Cap', targetId: 'part_cap' },
      { label: 'Ebonite Insulating Plug', targetId: 'part_plug' },
      { label: 'Brass Stem / Metal Rod', targetId: 'part_rod' },
      { label: 'Gold Leaf Foils', targetId: 'part_leaves' },
    ],
    correctMapping: {
      part_cap: 'Brass Disc / Metal Cap',
      part_plug: 'Ebonite Insulating Plug',
      part_rod: 'Brass Stem / Metal Rod',
      part_leaves: 'Gold Leaf Foils',
    },
    explanation: 'The brass cap receives charge at the top; the insulating ebonite plug prevents charge leakage to the grounded metal/glass case; the brass rod conducts charge down; and the delicate gold leaves diverge due to mutual electrostatic repulsion of like charges.',
    hints: [
      'The top circular disc receives incoming test rods.',
      'The collar around the neck insulates the rod from the outer jar.',
      'The light, ultra-thin foils at the bottom swing apart when charged.',
    ],
  },
  // 19. Two Spheres Induction - Advanced
  {
    id: 'ch_19',
    nodeId: NODE_C8_PHY_029,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'Two identical neutral brass spheres A and B on insulating stands are touching each other. A positively charged glass rod is held near sphere A (without touching). While the rod is held in place, sphere B is moved away. Finally, the glass rod is removed. What are the final charges on A and B?',
    options: [
      'Sphere A is Negative, Sphere B is Positive.',
      'Sphere A is Positive, Sphere B is Negative.',
      'Both spheres A and B become completely neutral again.',
      'Both spheres A and B acquire identical positive charges.',
    ],
    correctIndex: 0,
    explanation: 'The positive rod attracts free electrons toward sphere A (near side) and repels positive ions/deficits toward sphere B (far side). Separating the spheres while the rod is present traps the excess electrons on A (negative) and the electron deficit on B (positive). Net charge is conserved (0 + 0 = -Q + +Q).',
    hints: [
      'The positive rod attracts negative electrons towards the closest sphere (A).',
      'Sphere B loses electrons across the bridge to sphere A.',
      'Separating them traps the negative charge on A and positive charge on B.',
    ],
  },
  // 20. Evaporation Factors - Standard
  {
    id: 'ch_20',
    nodeId: NODE_C8_PHY_021,
    type: 'distinguish',
    difficulty: 'standard',
    competencyLevel: 'analysis',
    question: 'Why does 100 mL of water poured into a wide shallow thali (plate) evaporate much faster than 100 mL of water left in a narrow glass cylinder at 30°C?',
    options: [
      'The thali increases atmospheric pressure on the water molecules.',
      'The wider surface area exposes vastly more surface molecules to air, increasing the escape probability per second.',
      'The thali contains metal atoms that boil the water instantly.',
      'Water in narrow cylinders undergoes fusion into ice crystals.',
    ],
    correctIndex: 1,
    explanation: 'Evaporation is strictly a surface phenomenon. Increasing the exposed surface area gives a proportionately greater number of surface water molecules the opportunity to absorb ambient kinetic energy and escape into the atmosphere.',
    hints: [
      'Is evaporation a bulk phenomenon or a surface phenomenon?',
      'More surface area means more escape gates for energetic molecules.',
      'Wider exposed surface allows more molecules to leave simultaneously.',
    ],
  },
  // 21. Musical Pitch vs String Tension - Advanced (Numeric)
  {
    id: 'ch_21',
    nodeId: NODE_C8_PHY_025,
    type: 'numeric',
    difficulty: 'advanced',
    competencyLevel: 'application',
    question: 'A violin string vibrating in its fundamental mode produces the note A4 at 440 Hz. If the violinist plays a note one octave higher (ratio 2:1), what is the frequency of the higher note (in Hz)?',
    correctAnswer: 880,
    tolerance: 0,
    unit: 'Hz',
    explanation: 'An octave corresponds to an exact 2:1 frequency ratio. Frequency of the octave note = 440 Hz x 2 = 880 Hz.',
    hints: [
      'Recall the definition of a musical octave: frequency doubles (2:1 ratio).',
      'Multiply 440 Hz by 2.',
      '440 x 2 = 880 Hz.',
    ],
  },
  // 22. Real-World Electrostatics - Advanced
  {
    id: 'ch_22',
    nodeId: NODE_C8_PHY_027,
    type: 'classify',
    difficulty: 'advanced',
    competencyLevel: 'creativity',
    question: 'Aviation refuelling trucks at Mumbai International Airport always attach a thick copper earthing clamp to the aircraft body before pumping fuel. Why is this mandatory safety protocol enforced?',
    options: [
      'To power the jet engine ignition spark plugs during refuelling.',
      'To prevent static charge accumulated by fuel friction from creating a spark that could ignite volatile jet fuel vapours.',
      'To measure the exact weight of jet fuel entering the wing tanks.',
      'To magnetically attract metal impurities out of the aviation fuel.',
    ],
    correctIndex: 1,
    explanation: 'Pumping fuel through rubber/metal hoses causes friction between the liquid hydrocarbons and the pipe walls, accumulating dangerous electrostatic potential. Grounding provides a safe continuous conduction path to earth, preventing hazardous electrostatic sparks.',
    hints: [
      'Flowing liquids generate static charge by friction against pipes.',
      'What danger does an accumulated static spark present around volatile fuel?',
      'Earthing discharges static safely to ground, preventing catastrophic fires.',
    ],
  },
];

// Props Interface
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

// Default Props
const DEFAULT_PROPS: Props = {
  nodeId: NODE_C8_PHY_021,
  title: 'Thermal Physics, Acoustics & Electrostatics Mastery',
  definition: 'Comprehensive Class 8 Physics: Boiling vs Evaporation, 1D/2D/3D Thermal Expansion of solids & liquids, Pitch vs Frequency, Loudness & Decibels, Static Electricity, Charging by Friction, Conduction, Induction, and the Gold-Leaf Electroscope.',
  eli5: 'Heat makes particles jiggle more: some escape quietly from surfaces (evaporation) while some boil in huge bubbles everywhere! Solids stretch longer, wider, and puff up bigger. Sound travels as vibrating ripples: frequency sets the tune, amplitude sets the roar. And electrons rub, touch, and dance without contact to create electric sparks!',
  misconceptions: [
    {
      misconception: 'Evaporation only happens on hot days; on cold days water cannot evaporate.',
      correction: 'Evaporation occurs at ALL temperatures (even below 0°C). Higher temperature only increases the rate of evaporation, but is not a requirement.',
    },
    {
      misconception: 'The glass container and liquid expand equally, so filled bottles never overflow.',
      correction: 'Liquids expand significantly more than solid containers for the same temperature rise due to weaker intermolecular bonds, causing filled vessels to overflow.',
    },
    {
      misconception: 'Evaporation cools liquid because cold atmospheric air blows onto the surface.',
      correction: 'Evaporation cools because the fastest (highest-energy) molecules escape, reducing the average kinetic energy—and hence temperature—of the remaining liquid.',
    },
    {
      misconception: 'Pitch and loudness are identical; blowing a flute harder makes its pitch higher.',
      correction: 'Pitch depends strictly on frequency (air column length or string tension), whereas loudness depends on amplitude of vibration. Blowing harder increases loudness, not pitch.',
    },
    {
      misconception: 'Friction creates brand new electric charges out of mechanical energy.',
      correction: 'Charge is strictly conserved. Friction merely transfers existing mobile electrons from one body to another, leaving one positive and the other negative.',
    },
  ],
  diagnosticQuestions: [
    {
      question: 'Which of the following is a BULK phenomenon occurring at a fixed temperature?',
      options: ['Evaporation', 'Boiling', 'Sublimation below boiling point', 'Condensation on glass'],
      correctIndex: 1,
    },
    {
      question: 'What is the SI unit of frequency representing cycles per second?',
      options: ['Decibel (dB)', 'Hertz (Hz)', 'Joule (J)', 'Newton (N)'],
      correctIndex: 1,
    },
    {
      question: 'Why are expansion gaps left between successive railway tracks?',
      options: ['To allow steel rails to expand linearly in summer without buckling', 'To let rainwater drain through the ballast', 'To slow down over-speeding trains', 'To reduce track friction'],
      correctIndex: 0,
    },
    {
      question: 'Which subatomic particles physically transfer when glass is rubbed with silk?',
      options: ['Protons', 'Electrons', 'Neutrons', 'Alpha particles'],
      correctIndex: 1,
    },
    {
      question: 'What sign of charge does a neutral conductor acquire when charged by CONDUCTION from a positive rod?',
      options: ['Negative', 'Positive', 'Remains Neutral', 'Alternating charge'],
      correctIndex: 1,
    },
    {
      question: 'In charging by INDUCTION, what is the correct order of removing ground and charged rod?',
      options: ['Remove charged rod first, then disconnect earth', 'Disconnect earth first, then remove charged rod', 'Both simultaneously while cooling', 'Grounding is never disconnected'],
      correctIndex: 1,
    },
    {
      question: 'What happens to the gold leaves of a charged electroscope when touched with a finger (earthing)?',
      options: ['They diverge to 90 degrees', 'They instantly collapse flat as charge escapes to ground', 'They melt from current heat', 'They glow green'],
      correctIndex: 1,
    },
    {
      question: 'What is the safe prolonged sound exposure threshold before hearing damage occurs?',
      options: ['30 dB', '60 dB', '85 dB', '140 dB'],
      correctIndex: 2,
    },
  ],
  masteryCriteria: 'Student demonstrates full mastery of thermal vaporization, expansion dimensions, acoustic parameters, and electrostatic induction/conduction.',
};

// 5 Interactive Exploration Steps (Brilliant.org style)
const EXPLORATION_STEPS = [
  {
    title: 'Lab 1: Molecular Boiling vs Evaporation',
    instruction: 'Adjust the Thermal Heat Slider from Room Temp (25°C) to Boiling Point (100°C) and watch how vapor escape shifts from surface molecules to vigorous bulk bubble formation.',
    interactionType: 'slider-observe',
    nodeId: NODE_C8_PHY_021,
  },
  {
    title: 'Lab 2: 1D, 2D & 3D Thermal Expansion',
    instruction: 'Select Solid vs Liquid and heat the material. Watch a linear rod lengthen, a 2D sheet expand its area, and liquid volume overflow the flask.',
    interactionType: 'toggle-slider',
    nodeId: NODE_C8_PHY_024,
  },
  {
    title: 'Lab 3: Acoustics — Pitch (Hz) & Loudness (dB)',
    instruction: 'Interact with the virtual String & Air Column. Change string length, tension, and pluck amplitude to see the acoustic wave live on the oscilloscope.',
    interactionType: 'wave-oscillator',
    nodeId: NODE_C8_PHY_025,
  },
  {
    title: 'Lab 4: Triboelectricity & Electrostatic Friction',
    instruction: 'Rub the Glass Rod with Silk or Ebonite Rod with Fur by dragging across the contact pad. Watch electron transfer and test repulsion against a suspended rod.',
    interactionType: 'drag-rubbing',
    nodeId: NODE_C8_PHY_027,
  },
  {
    title: 'Lab 5: Gold-Leaf Electroscope (Conduction & Induction)',
    instruction: 'Bring charged rods near or touch the metal cap. Tap the ground wire to perform 4-step induction and observe leaf divergence angles.',
    interactionType: 'electroscope-sim',
    nodeId: NODE_C8_PHY_030,
  },
];

// Predict-Then-Check Questions
const PREDICTION_QUESTIONS = [
  {
    question: 'Predict: If you heat water in an open beaker from 30°C to 70°C (below boiling point), where will vaporization take place?',
    options: [
      'Throughout the bulk with large steam bubbles bursting everywhere.',
      'Only at the exposed top liquid-air surface, but at a faster rate.',
      'Only at the bottom glass wall without any surface loss.',
      'Water will freeze into steam crystals.',
    ],
    correctIndex: 1,
    verifyInstruction: 'Drag the heat slider to 70°C in Lab 1 and observe that energetic molecules only escape from the top boundary (no bubbles inside bulk).',
    nodeId: NODE_C8_PHY_021,
  },
  {
    question: 'Predict: In an electroscope charged positively, what happens to the gold leaf if you bring a negatively charged rod NEAR the cap (without touch)?',
    options: [
      'The leaf divergence will DECREASE (collapse slightly).',
      'The leaf divergence will INCREASE (open wider).',
      'The leaf will fall off the rod immediately.',
      'No change at all because there is no direct touch.',
    ],
    correctIndex: 0,
    verifyInstruction: 'In Lab 5, select a positively charged electroscope and bring a Negative Rod near the disc to verify that leaf divergence decreases!',
    nodeId: NODE_C8_PHY_030,
  },
];

// Observation Questions
const OBSERVATION_QUESTIONS = [
  {
    question: 'What do you notice about the bubbles inside the water beaker as the temperature reaches exactly 100°C?',
    observableOptions: [
      'Bubbles of water vapor form throughout the bulk liquid and rise rapidly to the surface.',
      'Bubbles only form on the surface like soap lather.',
      'All liquid instantly turns solid.',
      'Water temperature continues rising rapidly to 200°C without stopping.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_PHY_021,
  },
  {
    question: 'What happens to the frequency (pitch) when you reduce the vibrating string length by half on the acoustic oscillator?',
    observableOptions: [
      'The frequency doubles (2x) and the pitch sounds one octave higher.',
      'The frequency drops to zero and loudness becomes deafening.',
      'The pitch becomes very deep like a bass drum.',
      'The wave turns completely flat.',
    ],
    correctIndex: 0,
    nodeId: NODE_C8_PHY_025,
  },
];

// Real-World Scenario Final Activity
const REAL_WORLD_ACTIVITY = {
  title: 'Senior Engineering Consultant Report',
  description: 'Apply your combined physics mastery to solve 3 real-world Indian engineering challenges: railway heat-buckling on the Delhi-Jaipur line, sitar acoustic tuning in a humid monsoon auditorium, and electrostatic static-dissipative cleanroom protocols in a Bengaluru semiconductor foundry.',
  steps: [
    'Calculate the summer expansion gap required for 20-metre steel rail sections.',
    'Formulate the multi-step tuning procedure for a classical sitar and tabla set.',
    'Design an electrostatic earthing and charge-dissipation protocol for industrial petrochemical tanks.',
    'Submit your verified engineering findings to the National Physics Directorate.',
  ],
};

function C8_PhysicsBoilingEvaporationdifferencesSim({
  nodeId = DEFAULT_PROPS.nodeId || NODE_C8_PHY_021,
  title = DEFAULT_PROPS.title || 'Thermal Physics, Acoustics & Electrostatics Mastery',
  definition = DEFAULT_PROPS.definition,
  eli5 = DEFAULT_PROPS.eli5,
  misconceptions = DEFAULT_PROPS.misconceptions,
  diagnosticQuestions = DEFAULT_PROPS.diagnosticQuestions,
  masteryCriteria = DEFAULT_PROPS.masteryCriteria,
  onComplete,
}: Props = DEFAULT_PROPS) {
  const subjectConfig = SUBJECT_CONFIG['physics'] || { name: 'Physics', emoji: '⚡', color: 'cyan' };

  // Phase state
  const [phase, setPhase] = useState<'discovery' | 'explore' | 'sandbox' | 'challenge' | 'complete'>('discovery');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentChallenge, setCurrentChallenge] = useState(0);

  // Brilliant.org interactive discovery & prediction state
  const [discoveryAnswered, setDiscoveryAnswered] = useState(false);
  const [discoveryCorrect, setDiscoveryCorrect] = useState(false);
  const [predictionMade, setPredictionMade] = useState(false);
  const [predictionIndex, setPredictionIndex] = useState(-1);
  const [predictionVerified, setPredictionVerified] = useState(false);
  const [observationAnswered, setObservationAnswered] = useState(false);
  const [observationIndex, setObservationIndex] = useState(-1);

  // Adaptive Difficulty & BKT State
  const [difficulty, setDifficulty] = useState<'foundation' | 'standard' | 'advanced'>('standard');
  const [scoreBreakdown, setScoreBreakdown] = useState({ correct: 0, total: 0 });
  const [masteryLevel, setMasteryLevel] = useState('beginner');
  const [errors, setErrors] = useState(0);
  const [hitMisconceptions, setHitMisconceptions] = useState<number[]>([]);

  // Escalating hints state
  const [hintCount, setHintCount] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [currentHint, setCurrentHint] = useState('');
  const [answerRevealed, setAnswerRevealed] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  const [revealedSteps, setRevealedSteps] = useState(0);

  // Visual feedback states
  const [wrongShake, setWrongShake] = useState(false);
  const [wrongFlash, setWrongFlash] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showSparkle, setShowSparkle] = useState(false);
  const [sparklePos, setSparklePos] = useState({ x: 0, y: 0 });

  // Interactive Lab 1: Thermal Boiling/Evaporation
  const [labTemp, setLabTemp] = useState(25); // 0 to 120 °C
  const [surfaceArea, setSurfaceArea] = useState(50); // 10 to 100%
  const [airSpeed, setAirSpeed] = useState(10); // 0 to 50 km/h
  const [humidityLevel, setHumidityLevel] = useState(40); // 10 to 90%

  // Interactive Lab 2: Thermal Expansion
  const [expansionMaterial, setExpansionMaterial] = useState<'aluminium' | 'steel' | 'glass' | 'water'>('aluminium');
  const [expansionDeltaT, setExpansionDeltaT] = useState(20); // 0 to 100 °C
  const [expansionMode, setExpansionMode] = useState<'1d' | '2d' | '3d'>('1d');

  // Interactive Lab 3: Acoustics
  const [stringLength, setStringLength] = useState(60); // cm
  const [stringTension, setStringTension] = useState(50); // N
  const [stringPluckAmp, setStringPluckAmp] = useState(4); // mm
  const [windHolesOpen, setWindHolesOpen] = useState(3); // 0 to 6 holes

  // Interactive Lab 4: Electrostatics Friction
  const [frictionMaterialPair, setFrictionMaterialPair] = useState<'glass-silk' | 'ebonite-fur'>('glass-silk');
  const [rubbingProgress, setRubbingProgress] = useState(0); // 0 to 100%
  const [rodChargeVal, setRodChargeVal] = useState(0); // -100 to +100
  const [clothChargeVal, setClothChargeVal] = useState(0);

  // Interactive Lab 5: Electroscope
  const [electroscopeCharge, setElectroscopeCharge] = useState(0); // -100 to +100
  const [approachRodCharge, setApproachRodCharge] = useState<'none' | 'pos' | 'neg'>('none');
  const [approachRodDistance, setApproachRodDistance] = useState(100); // 10 to 100 mm
  const [isGrounded, setIsGrounded] = useState(false);
  const [isContactMade, setIsContactMade] = useState(false);

  // Drag and Drop & Construct State
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [droppedLabels, setDroppedLabels] = useState<Record<string, string>>({});
  const [sortArrangement, setSortArrangement] = useState<number[]>([]);
  const [numericInput, setNumericInput] = useState('');
  const [constructParts, setConstructParts] = useState<string[]>([]);

  // Persistent BKT & Timer Refs
  const bktStateRef = useRef(createBKTState());
  const inactivityTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const waveCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered challenges by adaptive difficulty
  const filteredChallenges = useMemo(() => {
    if (difficulty === 'foundation') return CHALLENGES.filter(c => c.difficulty === 'foundation');
    if (difficulty === 'standard') return CHALLENGES.filter(c => c.difficulty === 'foundation' || c.difficulty === 'standard');
    return CHALLENGES;
  }, [difficulty]);

  const activeChallenge = filteredChallenges[currentChallenge] || CHALLENGES[0];

  // Load existing mastery on mount
  useEffect(() => {
    const existing = getNodeMastery(nodeId);
    if (existing && existing.bestScore > 0) {
      if (existing.bestScore >= 80) setDifficulty('advanced');
      else if (existing.bestScore >= 50) setDifficulty('standard');
      else setDifficulty('foundation');
    }
  }, [nodeId]);

  // Adapt difficulty when BKT state updates
  useEffect(() => {
    if (scoreBreakdown.total === 0) return;
    const mastery = getMasteryLevel(bktStateRef.current.pKnown);
    setMasteryLevel(mastery);
    const newDifficulty =
      mastery === 'not-started' || mastery === 'beginner' ? 'foundation' : mastery === 'developing' ? 'standard' : 'advanced';
    setDifficulty(prev => {
      if (prev !== newDifficulty) {
        setCurrentChallenge(0);
        return newDifficulty;
      }
      return prev;
    });
  }, [scoreBreakdown]);

  // Calculate real-time physics parameters
  const evaporationRate = useMemo(() => {
    const tempFactor = Math.pow(labTemp / 20, 1.8);
    const areaFactor = surfaceArea / 50;
    const windFactor = 1 + airSpeed / 25;
    const humidityFactor = Math.max(0.1, (100 - humidityLevel) / 60);
    return (tempFactor * areaFactor * windFactor * humidityFactor).toFixed(1);
  }, [labTemp, surfaceArea, airSpeed, humidityLevel]);

  const acousticFrequency = useMemo(() => {
    // Frequency = (1 / 2L) * sqrt(T / mu)
    const effectiveLength = stringLength / 100;
    const baseFreq = (1 / (2 * effectiveLength)) * Math.sqrt((stringTension * 100) / 0.005);
    return Math.round(baseFreq);
  }, [stringLength, stringTension]);

  const acousticDecibels = useMemo(() => {
    return Math.round(40 + stringPluckAmp * 12);
  }, [stringPluckAmp]);

  // Leaf divergence calculation for electroscope
  const leafAngle = useMemo(() => {
    let effectiveLeafCharge = electroscopeCharge;

    if (approachRodCharge === 'pos') {
      const induced = Math.round((100 - approachRodDistance) * 0.6);
      effectiveLeafCharge = isGrounded ? 0 : electroscopeCharge + induced;
    } else if (approachRodCharge === 'neg') {
      const induced = Math.round((100 - approachRodDistance) * 0.6);
      effectiveLeafCharge = isGrounded ? 0 : electroscopeCharge - induced;
    }

    if (isGrounded) return 0;
    return Math.min(75, Math.abs(effectiveLeafCharge) * 0.7);
  }, [electroscopeCharge, approachRodCharge, approachRodDistance, isGrounded]);

  // Canvas Animation Effect 1: Molecular Vaporization Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let frame = 0;

    // Molecular particles
    const particles = Array.from({ length: 45 }, (_, i) => ({
      x: 30 + (i % 9) * 26 + (Math.random() - 0.5) * 8,
      y: 110 + Math.floor(i / 9) * 16 + (Math.random() - 0.5) * 6,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      escaped: false,
      escapeY: 0,
      size: 4 + Math.random() * 2,
    }));

    const render = () => {
      frame++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Beaker & Liquid Body
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const beakerLeft = 20;
      const beakerWidth = 260;
      const liquidTop = 90;
      const beakerHeight = 110;

      // Beaker outline
      ctx.strokeStyle = '#64748b';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(beakerLeft, 40);
      ctx.lineTo(beakerLeft, liquidTop + beakerHeight);
      ctx.lineTo(beakerLeft + beakerWidth, liquidTop + beakerHeight);
      ctx.lineTo(beakerLeft + beakerWidth, 40);
      ctx.stroke();

      // Liquid body
      const isBoiling = labTemp >= 100;
      const liquidGrad = ctx.createLinearGradient(0, liquidTop, 0, liquidTop + beakerHeight);
      liquidGrad.addColorStop(0, isBoiling ? 'rgba(56, 189, 248, 0.55)' : 'rgba(14, 165, 233, 0.4)');
      liquidGrad.addColorStop(1, 'rgba(2, 132, 199, 0.7)');
      ctx.fillStyle = liquidGrad;
      ctx.fillRect(beakerLeft + 2, liquidTop, beakerWidth - 4, beakerHeight);

      // Meniscus / surface line
      ctx.strokeStyle = '#38bdf8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(beakerLeft + 2, liquidTop);
      ctx.lineTo(beakerLeft + beakerWidth - 2, liquidTop);
      ctx.stroke();

      // Boiling bubbles throughout bulk
      if (isBoiling) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        for (let b = 0; b < 8; b++) {
          const bx = beakerLeft + 20 + ((b * 37 + frame * 3) % (beakerWidth - 40));
          const by = liquidTop + beakerHeight - ((frame * 2 + b * 25) % beakerHeight);
          const br = 4 + (b % 3) * 2;
          ctx.beginPath();
          ctx.arc(bx, by, br, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Render molecules
      const speedMultiplier = (labTemp / 25) * 0.8;
      particles.forEach((p) => {
        if (!p.escaped) {
          p.x += p.vx * speedMultiplier;
          p.y += p.vy * speedMultiplier;

          // Liquid boundaries
          if (p.x < beakerLeft + 8 || p.x > beakerLeft + beakerWidth - 8) p.vx *= -1;
          if (p.y > liquidTop + beakerHeight - 8) p.vy *= -1;

          // Surface escape check
          if (p.y <= liquidTop + 4) {
            const escapeProb = (labTemp / 100) * 0.08 + (airSpeed / 50) * 0.04;
            if (Math.random() < escapeProb || isBoiling) {
              p.escaped = true;
              p.escapeY = liquidTop;
            } else {
              p.vy = Math.abs(p.vy); // bounce back down
            }
          }

          ctx.fillStyle = labTemp > 80 ? '#f43f5e' : labTemp > 45 ? '#fbbf24' : '#38bdf8';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Escaped vapor molecule drifting upward
          p.escapeY -= 2 + speedMultiplier;
          p.x += (Math.random() - 0.5) * 2 + airSpeed * 0.05;

          ctx.fillStyle = 'rgba(226, 232, 240, 0.6)';
          ctx.beginPath();
          ctx.arc(p.x, p.escapeY, p.size * 0.8, 0, Math.PI * 2);
          ctx.fill();

          if (p.escapeY < 10) {
            p.escaped = false;
            p.x = beakerLeft + 20 + Math.random() * (beakerWidth - 40);
            p.y = liquidTop + 40 + Math.random() * (beakerHeight - 50);
          }
        }
      });

      // Status HUD
      ctx.fillStyle = '#e2e8f0';
      ctx.font = '11px sans-serif';
      ctx.fillText(`State: ${isBoiling ? 'BOILING (Bulk Vaporization @ 100°C)' : 'EVAPORATION (Surface Only)'}`, 10, 20);
      ctx.fillText(`Evaporation Rate: ${evaporationRate} g/min`, 10, 35);

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [labTemp, surfaceArea, airSpeed, humidityLevel, evaporationRate]);

  // Canvas Animation Effect 2: Acoustic Oscilloscope Waveform
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    const renderWave = () => {
      time += 0.04;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Grid background
      ctx.fillStyle = '#030712';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#1e293b';
      ctx.lineWidth = 1;
      for (let x = 0; x < canvas.width; x += 25) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Center baseline
      const midY = canvas.height / 2;
      ctx.strokeStyle = '#475569';
      ctx.beginPath();
      ctx.moveTo(0, midY);
      ctx.lineTo(canvas.width, midY);
      ctx.stroke();

      // Sine Wave: y = A * sin(2 * pi * f * t - k * x)
      const waveFreq = acousticFrequency / 120;
      const waveAmp = stringPluckAmp * 7;

      ctx.strokeStyle = '#22d3ee';
      ctx.lineWidth = 3;
      ctx.shadowColor = '#06b6d4';
      ctx.shadowBlur = 8;

      ctx.beginPath();
      for (let x = 0; x < canvas.width; x++) {
        const y = midY + Math.sin((x * 0.04 * waveFreq) - time * 3) * waveAmp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Overlay text
      ctx.fillStyle = '#a5f3fc';
      ctx.font = 'bold 11px sans-serif';
      ctx.fillText(`Frequency: ${acousticFrequency} Hz (Pitch)`, 10, 20);
      ctx.fillText(`Loudness: ${acousticDecibels} dB (Amplitude: ${stringPluckAmp} mm)`, 10, 35);

      animId = requestAnimationFrame(renderWave);
    };

    renderWave();
    return () => cancelAnimationFrame(animId);
  }, [acousticFrequency, acousticDecibels, stringPluckAmp]);

  // Escalating hints handler
  const showNextHint = useCallback(() => {
    const nextLevel = hintCount + 1;
    if (nextLevel <= 3 && activeChallenge.hints[nextLevel - 1]) {
      const hintMsg = activeChallenge.hints[nextLevel - 1];
      setCurrentHint(hintMsg);
      setShowHint(true);
      setHintCount(nextLevel);
      audioManager.play('hint');
      speechManager.speak(hintMsg);
    } else {
      setAnswerRevealed(true);
      setShowHint(false);
      setShowExplanation(true);
    }
  }, [hintCount, activeChallenge]);

  // Inactivity auto-hint timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    inactivityTimerRef.current = setTimeout(() => {
      if (phase === 'challenge' && !answerRevealed && hintCount === 0) {
        showNextHint();
      }
    }, 10000);
  }, [phase, answerRevealed, hintCount, showNextHint]);

  // Discovery answer handler
  const handleDiscoveryAnswer = useCallback((idx: number) => {
    const isCorrect = idx === DISCOVERY_QUESTION.correctIndex;
    setDiscoveryCorrect(isCorrect);
    setDiscoveryAnswered(true);
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Excellent physical intuition!' : DISCOVERY_QUESTION.hintAfter);
  }, []);

  // Phase transition callbacks
  const handleAdvanceToExploration = useCallback(() => {
    setPhase('explore');
    audioManager.play('whoosh');
    speechManager.speak('Welcome to the Physics Investigation Labs. Interact freely with each apparatus.');
  }, []);

  const handleAdvanceToSandbox = useCallback(() => {
    setPhase('sandbox');
    audioManager.play('whoosh');
    speechManager.speak('Free exploration sandbox mode active. Test your own variables with no grading.');
  }, []);

  const handleAdvanceToChallenge = useCallback(() => {
    setPhase('challenge');
    audioManager.play('whoosh');
    speechManager.speak('Challenge phase begun. Read each physics scenario carefully.');
  }, []);

  // Predict-then-check handlers
  const handlePrediction = useCallback((idx: number) => {
    setPredictionIndex(idx);
    setPredictionMade(true);
    audioManager.play('tap');
    speechManager.speak('Prediction locked in! Now interact with the lab to verify your hypothesis.');
  }, []);

  const handleObservation = useCallback((idx: number) => {
    setObservationIndex(idx);
    setObservationAnswered(true);
    const isCorrect = idx === OBSERVATION_QUESTIONS[0].correctIndex;
    audioManager.play(isCorrect ? 'success' : 'pop');
    speechManager.speak(isCorrect ? 'Superb observation!' : 'Look closer at the molecular movement.');
  }, []);

  // Drag-and-drop handlers for diagram challenges
  const handleDragStart = useCallback((label: string) => {
    setDraggedItem(label);
    audioManager.play('pickup');
  }, []);

  const handleDragDrop = useCallback((targetId: string) => {
    if (!draggedItem) return;
    const isCorrect = activeChallenge.correctMapping?.[targetId] === draggedItem;
    if (isCorrect) {
      setDroppedLabels(prev => ({ ...prev, [targetId]: draggedItem }));
      audioManager.play('drop-correct');
    } else {
      audioManager.play('drop-wrong');
    }
    setDraggedItem(null);
  }, [draggedItem, activeChallenge]);

  // Sort handlers for chronological challenge
  const handleSortMove = useCallback((fromIdx: number, toIdx: number) => {
    audioManager.play('pickup');
    setSortArrangement(prev => {
      const arr = prev.length === 0 && activeChallenge.sortItems ? activeChallenge.sortItems.map((_, i) => i) : [...prev];
      const [moved] = arr.splice(fromIdx, 1);
      arr.splice(toIdx, 0, moved);
      return arr;
    });
  }, [activeChallenge]);

  // Completion handler
  const handleComplete = useCallback(() => {
    const finalScore = Math.max(0, 100 - errors * 5);
    recordGameScore(ALL_NODE_IDS, finalScore);
    if (onComplete) onComplete(finalScore);
    setPhase('complete');
    setShowSuccess(true);
    audioManager.play('celebration');
    speechManager.speak('Outstanding work! You have mastered Class 8 Physics concepts.');
  }, [errors, onComplete]);

  // Next challenge handler
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

  // Primary Answer Handler for all challenge modalities
  const handleAnswer = useCallback((answer: number | Record<string, string> | number[] | string) => {
    let isCorrect = false;

    if (activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') {
      isCorrect = answer === activeChallenge.correctIndex;
    } else if (activeChallenge.type === 'drag-label') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctMapping);
    } else if (activeChallenge.type === 'drag-sort') {
      isCorrect = JSON.stringify(answer) === JSON.stringify(activeChallenge.correctOrder);
    } else if (activeChallenge.type === 'numeric') {
      const numAnswer = typeof answer === 'string' ? parseFloat(answer) : (answer as number);
      isCorrect = Math.abs(numAnswer - (activeChallenge.correctAnswer || 0)) <= (activeChallenge.tolerance || 0);
    } else if (activeChallenge.type === 'construct') {
      isCorrect = answer === activeChallenge.targetState;
    }

    if (isCorrect) {
      setScoreBreakdown(sb => ({ correct: sb.correct + 1, total: sb.total + 1 }));
      audioManager.play('success');
      audioManager.play('sparkle');
      setShowConfetti(true);
      setShowExplanation(true);
      speechManager.speak('Correct! Well deduced.');

      bktStateRef.current = bktUpdate(bktStateRef.current, true);
      const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
      const updatedSrs = sm2Update(srsItem, 5, 3500);
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        localStorage.setItem(`mastery_${activeChallenge.nodeId}`, JSON.stringify({ score: 100, date: Date.now() }));
      }
    } else {
      audioManager.play('error');
      setErrors(e => e + 1);
      setWrongShake(true);
      setWrongFlash(true);
      setTimeout(() => setWrongShake(false), 500);
      setTimeout(() => setWrongFlash(false), 800);

      if (activeChallenge.misconceptionIndex !== undefined && !hitMisconceptions.includes(activeChallenge.misconceptionIndex)) {
        setHitMisconceptions(prev => [...prev, activeChallenge.misconceptionIndex!]);
      }

      if (hintCount < 3) {
        showNextHint();
      } else {
        setAnswerRevealed(true);
        setShowExplanation(true);
        speechManager.speak('Let us review the step-by-step scientific explanation.');
        bktStateRef.current = bktUpdate(bktStateRef.current, false);
        const srsItem = createReviewItem(activeChallenge.nodeId, activeChallenge.question);
        const updatedSrs = sm2Update(srsItem, 1, 4000);
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(`srs_${activeChallenge.nodeId}`, JSON.stringify(updatedSrs));
        }
      }
    }
    resetInactivityTimer();
  }, [activeChallenge, hintCount, hitMisconceptions, showNextHint, resetInactivityTimer]);

  // Lab interaction handlers
  const handleRubbingFriction = useCallback(() => {
    audioManager.play('count');
    setRubbingProgress(prev => {
      const next = Math.min(100, prev + 25);
      if (frictionMaterialPair === 'glass-silk') {
        setRodChargeVal(Math.round(next * 0.8)); // Positive
        setClothChargeVal(-Math.round(next * 0.8)); // Negative
      } else {
        setRodChargeVal(-Math.round(next * 0.8)); // Negative
        setClothChargeVal(Math.round(next * 0.8)); // Positive
      }
      return next;
    });
  }, [frictionMaterialPair]);

  const handleResetFriction = useCallback(() => {
    audioManager.play('pop');
    setRubbingProgress(0);
    setRodChargeVal(0);
    setClothChargeVal(0);
  }, []);

  const handleElectroscopeTouchCap = useCallback(() => {
    audioManager.play('tap');
    if (approachRodCharge === 'pos') {
      setElectroscopeCharge(prev => Math.min(100, prev + 50));
      setIsContactMade(true);
    } else if (approachRodCharge === 'neg') {
      setElectroscopeCharge(prev => Math.max(-100, prev - 50));
      setIsContactMade(true);
    }
  }, [approachRodCharge]);

  const handleToggleGround = useCallback(() => {
    audioManager.play('chime');
    setIsGrounded(prev => {
      const next = !prev;
      if (next && approachRodCharge === 'none') {
        setElectroscopeCharge(0); // Complete discharge
      }
      return next;
    });
  }, [approachRodCharge]);

  const handleResetElectroscope = useCallback(() => {
    audioManager.play('pop');
    setElectroscopeCharge(0);
    setApproachRodCharge('none');
    setApproachRodDistance(100);
    setIsGrounded(false);
    setIsContactMade(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (inactivityTimerRef.current) clearTimeout(inactivityTimerRef.current);
    };
  }, []);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6 bg-slate-950 text-slate-100 rounded-3xl border border-slate-800 shadow-2xl font-sans">
      {/* Header Bar */}
      <motion.header
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between pb-4 mb-6 border-b border-slate-800 gap-4"
      >
        <div className="flex items-center gap-3">
          <span className="text-3xl p-2 bg-cyan-950/60 rounded-2xl border border-cyan-700/50 shadow-inner">
            {subjectConfig.emoji}
          </span>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
              {title}
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold">
                Class 8 ICSE
              </span>
            </h1>
            <p className="text-xs text-slate-400 mt-0.5">
              10 Concept Nodes • Thermal, Sound Waves & Electrostatics
            </p>
          </div>
        </div>

        {/* Phase Navigation / Status Badges */}
        <div className="flex items-center gap-3">
          <motion.span
            key={difficulty}
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
              difficulty === 'foundation'
                ? 'bg-emerald-950/70 text-emerald-300 border-emerald-600'
                : difficulty === 'advanced'
                ? 'bg-rose-950/70 text-rose-300 border-rose-600'
                : 'bg-cyan-950/70 text-cyan-300 border-cyan-600'
            }`}
          >
            Tier: {difficulty}
          </motion.span>
          <div className="text-right hidden sm:block">
            <div className="text-[10px] text-slate-400">Mastery State</div>
            <div className="text-xs font-bold text-amber-300 capitalize">{masteryLevel}</div>
          </div>
        </div>
      </motion.header>

      {/* ─── 1. DISCOVERY PHASE (Curiosity Hook) ─── */}
      {phase === 'discovery' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          <div className="p-5 bg-gradient-to-br from-indigo-950/70 via-slate-900 to-cyan-950/40 rounded-2xl border border-indigo-800/60 shadow-lg">
            <div className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-1 uppercase tracking-wider">
              <span>🔬 Investigation Scenario</span>
            </div>
            <h2 className="text-lg md:text-xl font-black text-white">{SCENARIO.title}</h2>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">{SCENARIO.intro}</p>
            <div className="mt-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-xs text-slate-300">
              <strong className="text-cyan-300">Mission Context:</strong> {SCENARIO.context}
            </div>
          </div>

          <div className="p-6 bg-slate-900/90 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Discovery Curiosity Hook
              </span>
              <span className="text-xs text-slate-400">Ungraded • Think & Predict</span>
            </div>
            <p className="text-base font-semibold text-white leading-snug">{DISCOVERY_QUESTION.question}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {DISCOVERY_QUESTION.options.map((opt, i) => (
                <motion.button
                  key={i}
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.985 }}
                  onClick={() => handleDiscoveryAnswer(i)}
                  disabled={discoveryAnswered}
                  aria-label={`Option ${i + 1}: ${opt}`}
                  className={`p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                    discoveryAnswered && i === DISCOVERY_QUESTION.correctIndex
                      ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 shadow-md'
                      : discoveryAnswered && !discoveryCorrect
                      ? 'bg-slate-900/60 border-slate-800 text-slate-400'
                      : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 text-slate-300">
                      {String.fromCharCode(65 + i)}
                    </span>
                    <span>{opt}</span>
                  </div>
                </motion.button>
              ))}
            </div>

            {discoveryAnswered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="pt-4 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4"
              >
                <p className={`text-sm ${discoveryCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {discoveryCorrect
                    ? '🎯 Spot on! Let us now interact with the apparatuses to discover the underlying molecular laws.'
                    : DISCOVERY_QUESTION.hintAfter}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleAdvanceToExploration}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-cyan-900/40 shrink-0"
                >
                  Enter Interactive Labs →
                </motion.button>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 2. EXPLORE PHASE (5 Interactive Guided Labs) ─── */}
      {phase === 'explore' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Lab Steps Progress Bar */}
          <div className="flex items-center justify-between bg-slate-900 p-3 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-cyan-400">Lab {currentSlide + 1} of {EXPLORATION_STEPS.length}:</span>
              <span className="text-xs font-medium text-slate-200">{EXPLORATION_STEPS[currentSlide].title}</span>
            </div>
            <div className="flex gap-1.5">
              {EXPLORATION_STEPS.map((_, sIdx) => (
                <div
                  key={sIdx}
                  className={`h-2 rounded-full transition-all ${
                    sIdx === currentSlide ? 'w-8 bg-cyan-400' : sIdx < currentSlide ? 'w-3 bg-cyan-800' : 'w-3 bg-slate-800'
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="p-5 md:p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-5"
            >
              <div className="border-b border-slate-800 pb-3">
                <h3 className="text-lg font-black text-cyan-300">{EXPLORATION_STEPS[currentSlide].title}</h3>
                <p className="text-xs md:text-sm text-amber-300 mt-1 flex items-center gap-1.5">
                  <span>👉</span> {EXPLORATION_STEPS[currentSlide].instruction}
                </p>
              </div>

              {/* ── LAB 1: Boiling vs Evaporation Molecular Chamber ── */}
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={canvasRef} width={300} height={210} className="rounded-xl w-full max-w-[320px]" />
                    <div className="w-full mt-3 grid grid-cols-3 gap-2 text-center text-[10px]">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Location</span>
                        <div className="font-bold text-cyan-300">{labTemp >= 100 ? 'Bulk & Surface' : 'Surface Only'}</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Fixed Temp?</span>
                        <div className="font-bold text-cyan-300">{labTemp >= 100 ? 'Yes (100°C)' : 'Any Temp'}</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Thermal Effect</span>
                        <div className="font-bold text-cyan-300">{labTemp >= 100 ? 'Needs Heat' : 'Causes Cooling'}</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Water Temperature:</span>
                        <span className={labTemp >= 100 ? 'text-rose-400 font-bold' : 'text-cyan-400 font-bold'}>
                          {labTemp}°C {labTemp >= 100 ? '(Boiling Point!)' : ''}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={110}
                        value={labTemp}
                        onChange={e => {
                          setLabTemp(Number(e.target.value));
                          audioManager.play('count');
                        }}
                        aria-label="Water Temperature Slider"
                        className="w-full accent-cyan-400"
                      />

                      <div className="flex justify-between text-xs font-semibold pt-1">
                        <span className="text-slate-300">Wind Speed (Fan):</span>
                        <span className="text-amber-300 font-bold">{airSpeed} km/h</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={50}
                        value={airSpeed}
                        onChange={e => setAirSpeed(Number(e.target.value))}
                        aria-label="Wind speed slider"
                        className="w-full accent-amber-400"
                      />

                      <div className="flex justify-between text-xs font-semibold pt-1">
                        <span className="text-slate-300">Relative Humidity:</span>
                        <span className="text-indigo-300 font-bold">{humidityLevel}%</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={90}
                        value={humidityLevel}
                        onChange={e => setHumidityLevel(Number(e.target.value))}
                        aria-label="Humidity level slider"
                        className="w-full accent-indigo-400"
                      />
                    </div>

                    {/* Predict-then-check mini hook */}
                    {!predictionMade ? (
                      <div className="p-3 bg-indigo-950/50 rounded-xl border border-indigo-800 text-xs space-y-2">
                        <p className="font-bold text-indigo-300">{PREDICTION_QUESTIONS[0].question}</p>
                        <div className="grid grid-cols-2 gap-1.5">
                          {PREDICTION_QUESTIONS[0].options.slice(0, 2).map((opt, pI) => (
                            <motion.button
                              key={pI}
                              whileHover={{ scale: 1.02 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handlePrediction(pI)}
                              className="p-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-left text-[11px] text-slate-200"
                            >
                              {opt}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-800 text-xs">
                        <p className="text-emerald-300 font-semibold">
                          ✓ Prediction recorded! As you drag the temperature slider to 70°C, observe that escape occurs solely at the surface.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── LAB 2: 1D, 2D & 3D Thermal Expansion Simulator ── */}
              {currentSlide === 1 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col justify-center items-center min-h-[220px]">
                    <svg viewBox="0 0 360 180" className="w-full max-w-[400px]">
                      {/* 1D Linear Rod representation */}
                      {expansionMode === '1d' && (
                        <g>
                          <text x="20" y="30" fill="#94a3b8" fontSize="11" fontWeight="bold">
                            1D Linear Expansion (ΔL = α · L₀ · ΔT)
                          </text>
                          {/* Cold reference */}
                          <rect x="30" y="50" width="200" height="16" rx="4" fill="#334155" />
                          <text x="235" y="62" fill="#64748b" fontSize="10">Initial L₀ = 100 cm</text>
                          {/* Heated expanding rod */}
                          <rect
                            x="30"
                            y="95"
                            width={200 + expansionDeltaT * 0.8}
                            height="16"
                            rx="4"
                            fill={expansionMaterial === 'aluminium' ? '#38bdf8' : expansionMaterial === 'steel' ? '#f59e0b' : '#a855f7'}
                          />
                          {/* Expansion extension zone */}
                          <rect
                            x="230"
                            y="95"
                            width={expansionDeltaT * 0.8}
                            height="16"
                            rx="2"
                            fill="#ef4444"
                            opacity={0.8}
                          />
                          <text x={235 + expansionDeltaT * 0.8} y="107" fill="#ef4444" fontSize="10" fontWeight="bold">
                            +{(expansionDeltaT * 0.04).toFixed(2)} cm (ΔL)
                          </text>

                          {/* Railway expansion gap visual */}
                          <line x1="280" y1="135" x2="340" y2="135" stroke="#64748b" strokeWidth="4" />
                          <text x="30" y="155" fill="#cbd5e1" fontSize="10">
                            Engineering rule: Expansion gaps absorb this ΔL to prevent rail buckling.
                          </text>
                        </g>
                      )}

                      {/* 2D Superficial Plate representation */}
                      {expansionMode === '2d' && (
                        <g>
                          <text x="20" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold">
                            2D Superficial Area Expansion (ΔA ≈ 2 · α · A₀ · ΔT)
                          </text>
                          <rect x="50" y="40" width="90" height="90" rx="4" fill="#334155" />
                          <rect
                            x="180"
                            y="40"
                            width={90 + expansionDeltaT * 0.45}
                            height={90 + expansionDeltaT * 0.45}
                            rx="4"
                            fill="#0ea5e9"
                            opacity={0.85}
                          />
                          <text x="95" y="90" textAnchor="middle" fill="#94a3b8" fontSize="10">A₀</text>
                          <text x={225 + expansionDeltaT * 0.22} y={90 + expansionDeltaT * 0.22} textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                            A₀ + ΔA
                          </text>
                          <text x="20" y="160" fill="#cbd5e1" fontSize="10">
                            Notice both length and breadth expand simultaneously, doubling fractional growth!
                          </text>
                        </g>
                      )}

                      {/* 3D Cubical / Liquid Overflow representation */}
                      {expansionMode === '3d' && (
                        <g>
                          <text x="20" y="25" fill="#94a3b8" fontSize="11" fontWeight="bold">
                            3D Volume Expansion: Liquid Overflow
                          </text>
                          {/* Glass Flask */}
                          <path d="M 80 40 L 95 70 L 60 140 L 140 140 L 105 70 L 120 40 Z" fill="none" stroke="#94a3b8" strokeWidth="2" />
                          {/* Water inside expanding and overflowing */}
                          <path d="M 83 45 L 95 70 L 63 137 L 137 137 L 105 70 L 117 45 Z" fill="#38bdf8" opacity={0.6} />
                          {expansionDeltaT > 30 && (
                            <path d="M 118 45 Q 130 55 128 85" fill="none" stroke="#38bdf8" strokeWidth="3" />
                          )}
                          <text x="160" y="70" fill="#e2e8f0" fontSize="11" fontWeight="bold">
                            Liquid Expansion &gt; Solid Flask
                          </text>
                          <text x="160" y="90" fill="#38bdf8" fontSize="10">
                            Overflow = ΔV(liquid) - ΔV(glass)
                          </text>
                          <text x="160" y="110" fill="#f59e0b" fontSize="10">
                            Spill volume: {(expansionDeltaT * 0.18).toFixed(1)} mL
                          </text>
                        </g>
                      )}
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex gap-2">
                      {(['1d', '2d', '3d'] as const).map(mode => (
                        <motion.button
                          key={mode}
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => {
                            setExpansionMode(mode);
                            audioManager.play('tap');
                          }}
                          className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                            expansionMode === mode
                              ? 'bg-cyan-600 border-cyan-400 text-white'
                              : 'bg-slate-800 border-slate-700 text-slate-300'
                          }`}
                        >
                          {mode.toUpperCase()} ({mode === '1d' ? 'Linear' : mode === '2d' ? 'Superficial' : 'Cubical'})
                        </motion.button>
                      ))}
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Temperature Rise (ΔT):</span>
                        <span className="text-cyan-400 font-bold">+{expansionDeltaT}°C</span>
                      </div>
                      <input
                        type="range"
                        min={0}
                        max={100}
                        value={expansionDeltaT}
                        onChange={e => setExpansionDeltaT(Number(e.target.value))}
                        aria-label="Temperature rise slider"
                        className="w-full accent-cyan-400"
                      />

                      <div className="flex justify-between text-xs font-semibold pt-1">
                        <span className="text-slate-300">Material Selection:</span>
                        <span className="text-amber-300 font-bold capitalize">{expansionMaterial}</span>
                      </div>
                      <div className="grid grid-cols-3 gap-1.5 pt-1">
                        {(['aluminium', 'steel', 'glass'] as const).map(mat => (
                          <button
                            key={mat}
                            onClick={() => {
                              setExpansionMaterial(mat);
                              audioManager.play('pop');
                            }}
                            className={`py-1.5 text-[11px] rounded-lg border capitalize font-medium ${
                              expansionMaterial === mat
                                ? 'bg-amber-500/20 border-amber-400 text-amber-300'
                                : 'bg-slate-900 border-slate-800 text-slate-400'
                            }`}
                          >
                            {mat}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 3: Pitch, Frequency & Decibel Oscilloscope ── */}
              {currentSlide === 2 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-3 rounded-2xl border border-slate-800 flex flex-col items-center">
                    <canvas ref={waveCanvasRef} width={320} height={170} className="rounded-xl w-full max-w-[340px]" />
                    <div className="w-full mt-3 grid grid-cols-2 gap-2 text-center text-xs">
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Pitch Characteristic</span>
                        <div className="font-black text-cyan-300">{acousticFrequency} Hz ({acousticFrequency > 500 ? 'High Treble' : 'Deep Bass'})</div>
                      </div>
                      <div className="p-2 bg-slate-900 rounded-lg border border-slate-800">
                        <span className="text-slate-400">Loudness Level</span>
                        <div className="font-black text-amber-300">{acousticDecibels} dB ({acousticDecibels >= 85 ? '⚠️ Warning' : 'Safe'})</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-slate-300">Vibrating String Length:</span>
                        <span className="text-cyan-400 font-bold">{stringLength} cm (Shorter = Higher Pitch)</span>
                      </div>
                      <input
                        type="range"
                        min={20}
                        max={100}
                        value={stringLength}
                        onChange={e => setStringLength(Number(e.target.value))}
                        aria-label="String length slider"
                        className="w-full accent-cyan-400"
                      />

                      <div className="flex justify-between text-xs font-semibold pt-1">
                        <span className="text-slate-300">String Tension (Tuning Peg):</span>
                        <span className="text-amber-300 font-bold">{stringTension} N (Tighter = Higher Pitch)</span>
                      </div>
                      <input
                        type="range"
                        min={10}
                        max={120}
                        value={stringTension}
                        onChange={e => setStringTension(Number(e.target.value))}
                        aria-label="String tension slider"
                        className="w-full accent-amber-400"
                      />

                      <div className="flex justify-between text-xs font-semibold pt-1">
                        <span className="text-slate-300">Pluck Amplitude (Loudness):</span>
                        <span className="text-rose-400 font-bold">{stringPluckAmp} mm (Larger = Louder dB)</span>
                      </div>
                      <input
                        type="range"
                        min={1}
                        max={8}
                        value={stringPluckAmp}
                        onChange={e => setStringPluckAmp(Number(e.target.value))}
                        aria-label="Pluck amplitude slider"
                        className="w-full accent-rose-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 4: Triboelectricity & Charge by Friction ── */}
              {currentSlide === 3 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[220px]">
                    <svg viewBox="0 0 360 180" className="w-full max-w-[400px]">
                      {/* Suspended Rod */}
                      <rect x="50" y="40" width="120" height="22" rx="6" fill={frictionMaterialPair === 'glass-silk' ? '#38bdf8' : '#334155'} stroke="#64748b" strokeWidth="2" />
                      <text x="110" y="55" textAnchor="middle" fill="#ffffff" fontSize="10" fontWeight="bold">
                        {frictionMaterialPair === 'glass-silk' ? 'Glass Rod' : 'Ebonite Rod'}
                      </text>

                      {/* Charge badges on Rod */}
                      {rodChargeVal !== 0 && (
                        <g>
                          <circle cx="65" cy="51" r="6" fill={rodChargeVal > 0 ? '#ef4444' : '#3b82f6'} />
                          <text x="65" y="54" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                            {rodChargeVal > 0 ? '+' : '−'}
                          </text>
                          <circle cx="155" cy="51" r="6" fill={rodChargeVal > 0 ? '#ef4444' : '#3b82f6'} />
                          <text x="155" y="54" textAnchor="middle" fill="white" fontSize="9" fontWeight="bold">
                            {rodChargeVal > 0 ? '+' : '−'}
                          </text>
                        </g>
                      )}

                      {/* Rubbing Cloth Pad */}
                      <rect x="220" y="40" width="90" height="40" rx="8" fill={frictionMaterialPair === 'glass-silk' ? '#fcd34d' : '#d97706'} opacity={0.8} />
                      <text x="265" y="64" textAnchor="middle" fill="#1e293b" fontSize="10" fontWeight="bold">
                        {frictionMaterialPair === 'glass-silk' ? 'Silk Cloth' : 'Animal Fur'}
                      </text>
                      {clothChargeVal !== 0 && (
                        <g>
                          <circle cx="265" cy="74" r="5" fill={clothChargeVal > 0 ? '#ef4444' : '#3b82f6'} />
                          <text x="265" y="77" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">
                            {clothChargeVal > 0 ? '+' : '−'}
                          </text>
                        </g>
                      )}

                      {/* Electron transfer arrows */}
                      {rubbingProgress > 0 && (
                        <g>
                          <path
                            d={frictionMaterialPair === 'glass-silk' ? "M 170 51 L 220 51" : "M 220 51 L 170 51"}
                            stroke="#22c55e"
                            strokeWidth="3"
                            strokeDasharray="4 4"
                          />
                          <text x="195" y="35" textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="bold">
                            e⁻ flow
                          </text>
                        </g>
                      )}

                      {/* Results readout */}
                      <text x="20" y="125" fill="#cbd5e1" fontSize="11" fontWeight="bold">
                        Frictional Electron Transfer (Conservation of Charge):
                      </text>
                      <text x="20" y="145" fill={rodChargeVal > 0 ? '#f87171' : '#60a5fa'} fontSize="10">
                        Rod Net Charge: {rodChargeVal > 0 ? `+${rodChargeVal} nC (Electron Deficit)` : rodChargeVal < 0 ? `${rodChargeVal} nC (Electron Surplus)` : 'Neutral'}
                      </text>
                      <text x="20" y="162" fill={clothChargeVal > 0 ? '#f87171' : '#60a5fa'} fontSize="10">
                        Cloth Net Charge: {clothChargeVal > 0 ? `+${clothChargeVal} nC` : clothChargeVal < 0 ? `${clothChargeVal} nC` : 'Neutral'}
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          setFrictionMaterialPair('glass-silk');
                          handleResetFriction();
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                          frictionMaterialPair === 'glass-silk'
                            ? 'bg-cyan-600 border-cyan-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Glass + Silk (+)
                      </button>
                      <button
                        onClick={() => {
                          setFrictionMaterialPair('ebonite-fur');
                          handleResetFriction();
                        }}
                        className={`flex-1 py-2 text-xs font-bold rounded-xl border ${
                          frictionMaterialPair === 'ebonite-fur'
                            ? 'bg-amber-600 border-amber-400 text-white'
                            : 'bg-slate-800 border-slate-700 text-slate-300'
                        }`}
                      >
                        Ebonite + Fur (−)
                      </button>
                    </div>

                    <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-300 font-semibold">Rubbing Intensity:</span>
                        <span className="text-emerald-400 font-bold">{rubbingProgress}%</span>
                      </div>
                      <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                        <motion.div className="h-full bg-emerald-500 rounded-full" animate={{ width: `${rubbingProgress}%` }} />
                      </div>

                      <div className="flex gap-2 pt-2">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleRubbingFriction}
                          className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl text-xs shadow-md"
                        >
                          ⚡ Rub Materials Together
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={handleResetFriction}
                          className="px-3 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
                        >
                          Reset
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── LAB 5: Gold-Leaf Electroscope (Conduction & Induction) ── */}
              {currentSlide === 4 && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                  <div className="lg:col-span-7 bg-slate-950 p-4 rounded-2xl border border-slate-800 flex flex-col items-center justify-center min-h-[240px]">
                    <svg viewBox="0 0 360 220" className="w-full max-w-[380px]">
                      {/* Glass Jar Body */}
                      <rect x="110" y="70" width="140" height="135" rx="14" fill="rgba(30, 41, 59, 0.4)" stroke="#475569" strokeWidth="2" />

                      {/* Ebonite Insulating Plug */}
                      <rect x="160" y="60" width="40" height="18" rx="3" fill="#0f172a" stroke="#d97706" strokeWidth="1.5" />

                      {/* Brass Disc / Cap */}
                      <ellipse cx="180" cy="40" rx="35" ry="8" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
                      <text x="180" y="43" textAnchor="middle" fill="#78350f" fontSize="8" fontWeight="bold">
                        Brass Cap
                      </text>

                      {/* Brass Rod */}
                      <line x1="180" y1="40" x2="180" y2="150" stroke="#f59e0b" strokeWidth="4" />

                      {/* Gold Leaves Diverging */}
                      {/* Left Fixed / Slight deflection leaf */}
                      <line x1="180" y1="150" x2={180 - Math.sin((leafAngle * Math.PI) / 180) * 45} y2={150 + Math.cos((leafAngle * Math.PI) / 180) * 45} stroke="#facc15" strokeWidth="3" />
                      {/* Right Diverging Leaf */}
                      <line x1="180" y1="150" x2={180 + Math.sin((leafAngle * Math.PI) / 180) * 45} y2={150 + Math.cos((leafAngle * Math.PI) / 180) * 45} stroke="#facc15" strokeWidth="3" />

                      {/* Ground Wire Animation */}
                      {isGrounded && (
                        <g>
                          <line x1="215" y1="40" x2="280" y2="40" stroke="#22c55e" strokeWidth="2" strokeDasharray="3 3" />
                          <line x1="280" y1="40" x2="280" y2="80" stroke="#22c55e" strokeWidth="2" />
                          {/* Earth symbol */}
                          <line x1="270" y1="80" x2="290" y2="80" stroke="#22c55e" strokeWidth="3" />
                          <line x1="273" y1="85" x2="287" y2="85" stroke="#22c55e" strokeWidth="2" />
                          <line x1="276" y1="90" x2="284" y2="90" stroke="#22c55e" strokeWidth="1.5" />
                          <text x="300" y="85" fill="#4ade80" fontSize="9" fontWeight="bold">EARTH</text>
                        </g>
                      )}

                      {/* Approaching Charged Rod */}
                      {approachRodCharge !== 'none' && (
                        <g>
                          <rect
                            x={180 - 15}
                            y={Math.max(10, 40 - (approachRodDistance * 0.35))}
                            width="30"
                            height="12"
                            rx="3"
                            fill={approachRodCharge === 'pos' ? '#ef4444' : '#3b82f6'}
                          />
                          <text
                            x="180"
                            y={Math.max(10, 40 - (approachRodDistance * 0.35)) + 9}
                            textAnchor="middle"
                            fill="white"
                            fontSize="8"
                            fontWeight="bold"
                          >
                            {approachRodCharge === 'pos' ? '+ Positive Rod' : '− Negative Rod'}
                          </text>
                        </g>
                      )}

                      {/* Angular Readout */}
                      <text x="180" y="210" textAnchor="middle" fill="#facc15" fontSize="10" fontWeight="bold">
                        Leaf Divergence Angle: {leafAngle.toFixed(1)}°
                      </text>
                    </svg>
                  </div>

                  <div className="lg:col-span-5 space-y-3">
                    <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                      <span className="text-xs font-bold text-slate-300">Test Rod Proximity:</span>
                      <div className="grid grid-cols-3 gap-1.5">
                        <button
                          onClick={() => {
                            setApproachRodCharge('none');
                            audioManager.play('pop');
                          }}
                          className={`py-1.5 text-[10px] rounded-lg border font-semibold ${
                            approachRodCharge === 'none' ? 'bg-slate-700 text-white' : 'bg-slate-900 text-slate-400'
                          }`}
                        >
                          No Rod
                        </button>
                        <button
                          onClick={() => {
                            setApproachRodCharge('pos');
                            audioManager.play('tap');
                          }}
                          className={`py-1.5 text-[10px] rounded-lg border font-semibold ${
                            approachRodCharge === 'pos' ? 'bg-rose-600 text-white' : 'bg-slate-900 text-rose-300'
                          }`}
                        >
                          + Positive
                        </button>
                        <button
                          onClick={() => {
                            setApproachRodCharge('neg');
                            audioManager.play('tap');
                          }}
                          className={`py-1.5 text-[10px] rounded-lg border font-semibold ${
                            approachRodCharge === 'neg' ? 'bg-blue-600 text-white' : 'bg-slate-900 text-blue-300'
                          }`}
                        >
                          − Negative
                        </button>
                      </div>

                      <div className="pt-2">
                        <div className="flex justify-between text-[11px] text-slate-300">
                          <span>Rod Distance:</span>
                          <span className="font-bold text-cyan-400">{approachRodDistance} mm</span>
                        </div>
                        <input
                          type="range"
                          min={10}
                          max={100}
                          value={approachRodDistance}
                          onChange={e => setApproachRodDistance(Number(e.target.value))}
                          aria-label="Rod distance slider"
                          className="w-full accent-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleElectroscopeTouchCap}
                        className="py-2 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
                      >
                        👆 Touch Cap (Conduction)
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={handleToggleGround}
                        className={`py-2 font-bold rounded-xl text-xs border ${
                          isGrounded ? 'bg-emerald-600 text-white border-emerald-400' : 'bg-slate-800 text-slate-300 border-slate-700'
                        }`}
                      >
                        {isGrounded ? '⚡ Grounded (Finger on)' : '🔌 Ground Cap (Earth)'}
                      </motion.button>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleResetElectroscope}
                      className="w-full py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-400 rounded-lg text-xs"
                    >
                      Reset Electroscope Setup
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Controls */}
          <div className="flex justify-between items-center pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCurrentSlide(s => Math.max(0, s - 1));
                audioManager.play('pop');
              }}
              disabled={currentSlide === 0}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold disabled:opacity-40"
            >
              ← Previous Lab
            </motion.button>

            <span className="text-xs text-slate-400">Step {currentSlide + 1} of {EXPLORATION_STEPS.length}</span>

            {currentSlide < EXPLORATION_STEPS.length - 1 ? (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setCurrentSlide(s => s + 1);
                  audioManager.play('whoosh');
                }}
                className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
              >
                Next Lab →
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAdvanceToSandbox}
                className="px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-900/30"
              >
                Enter Free Sandbox Mode →
              </motion.button>
            )}
          </div>
        </motion.div>
      )}

      {/* ─── 3. SANDBOX PHASE (Free Play Before Assessment) ─── */}
      {phase === 'sandbox' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="p-5 bg-slate-900 rounded-2xl border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-black text-cyan-300">Free Exploration Sandbox</h2>
              <p className="text-xs text-slate-400 mt-1">
                Zero pressure, un-graded laboratory sandbox. Manipulate temperature, acoustics, and electroscopes freely.
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAdvanceToChallenge}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-emerald-900/40 shrink-0"
            >
              Ready for Graded Challenges! →
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Quick Sandbox 1: Boiling vs Evaporation */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-cyan-300 uppercase tracking-wider">Vaporization Apparatus</h4>
              <div className="flex justify-between text-xs font-semibold">
                <span>Temperature: {labTemp}°C</span>
                <span className={labTemp >= 100 ? 'text-rose-400 font-bold' : 'text-cyan-400'}>
                  {labTemp >= 100 ? 'Boiling (Bulk)' : 'Evaporation (Surface)'}
                </span>
              </div>
              <input
                type="range"
                min={10}
                max={110}
                value={labTemp}
                onChange={e => setLabTemp(Number(e.target.value))}
                aria-label="Sandbox temperature slider"
                className="w-full accent-cyan-400"
              />
              <p className="text-[11px] text-slate-400">
                Evaporative cooling rate: <strong className="text-cyan-300">{evaporationRate} g/min</strong>. At 100°C, bubbles form throughout the entire liquid body.
              </p>
            </div>

            {/* Quick Sandbox 2: Acoustic String Waveform */}
            <div className="p-4 bg-slate-900/80 rounded-2xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-amber-300 uppercase tracking-wider">Musical String Acoustic Lab</h4>
              <div className="flex justify-between text-xs font-semibold">
                <span>Frequency: {acousticFrequency} Hz</span>
                <span className="text-amber-400 font-bold">{acousticDecibels} dB</span>
              </div>
              <input
                type="range"
                min={20}
                max={100}
                value={stringLength}
                onChange={e => setStringLength(Number(e.target.value))}
                aria-label="Sandbox string length slider"
                className="w-full accent-amber-400"
              />
              <p className="text-[11px] text-slate-400">
                Shorter length increases vibrational cycles per second (Pitch). Larger plucking amplitude raises energy (Loudness).
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* ─── 4. CHALLENGE PHASE (Adaptive BKT + Multiple Modalities) ─── */}
      {phase === 'challenge' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          {/* Header & Adaptive Tier */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-slate-400">
                  Challenge {currentChallenge + 1} of {filteredChallenges.length}
                </span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 uppercase font-semibold">
                  {activeChallenge.competencyLevel}
                </span>
              </div>
              <h3 className="text-sm md:text-base font-bold text-white mt-1">
                {activeChallenge.nodeId === NODE_C8_PHY_021 ? 'Vaporization Laws' :
                 activeChallenge.nodeId === NODE_C8_PHY_022 ? 'Linear Solid Expansion' :
                 activeChallenge.nodeId === NODE_C8_PHY_023 ? 'Superficial Expansion' :
                 activeChallenge.nodeId === NODE_C8_PHY_024 ? 'Cubical Expansion' :
                 activeChallenge.nodeId === NODE_C8_PHY_025 ? 'Musical Acoustics' :
                 activeChallenge.nodeId === NODE_C8_PHY_026 ? 'Decibel Levels' :
                 activeChallenge.nodeId === NODE_C8_PHY_027 ? 'Triboelectric Friction' :
                 activeChallenge.nodeId === NODE_C8_PHY_028 ? 'Conduction Charging' :
                 activeChallenge.nodeId === NODE_C8_PHY_029 ? 'Induction Charging' : 'Electroscope Detection'}
              </h3>
            </div>

            {/* Progress Bar */}
            <div className="w-full sm:w-48">
              <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                <span>Progress</span>
                <span>{Math.round(((currentChallenge + 1) / filteredChallenges.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 rounded-full"
                  animate={{ width: `${((currentChallenge + 1) / filteredChallenges.length) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Box */}
          <div
            className={`p-5 md:p-6 rounded-2xl border transition-all ${
              wrongFlash
                ? 'bg-rose-950/70 border-rose-500 shadow-lg shadow-rose-950/50'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <p className="text-base md:text-lg font-semibold text-white leading-relaxed mb-4">
              {activeChallenge.question}
            </p>

            {/* MODALITY A: Standard MCQ (Classify / Distinguish / Match) */}
            {(activeChallenge.type === 'classify' || activeChallenge.type === 'distinguish' || activeChallenge.type === 'match') &&
              activeChallenge.options && (
                <div className="space-y-3">
                  {activeChallenge.options.map((opt, i) => (
                    <motion.button
                      key={i}
                      whileHover={{ scale: 1.012 }}
                      whileTap={{ scale: 0.988 }}
                      animate={wrongShake ? { x: [0, -10, 10, -10, 10, 0] } : { x: 0 }}
                      transition={wrongShake ? { duration: 0.4 } : {}}
                      onClick={() => handleAnswer(i)}
                      disabled={showExplanation || answerRevealed}
                      aria-label={`Option ${i + 1}: ${opt}`}
                      className={`w-full p-4 rounded-xl text-left text-sm font-medium transition-all border ${
                        showExplanation && i === activeChallenge.correctIndex
                          ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                          : 'bg-slate-800/80 hover:bg-slate-700/80 border-slate-700 text-slate-200'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-lg bg-slate-700 flex items-center justify-center text-xs font-bold shrink-0 text-slate-300">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              )}

            {/* MODALITY B: Drag-Label Diagram */}
            {activeChallenge.type === 'drag-label' && activeChallenge.dragItems && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2 p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400 w-full mb-1">Draggable Physics Labels:</span>
                  {activeChallenge.dragItems.map((item, idx) => (
                    <motion.div
                      key={idx}
                      draggable
                      onDragStart={() => handleDragStart(item.label)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Drag item: ${item.label}`}
                      className="px-3 py-1.5 bg-cyan-700 hover:bg-cyan-600 rounded-lg text-xs font-bold text-white cursor-grab shadow-sm"
                    >
                      🏷️ {item.label}
                    </motion.div>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 flex justify-center">
                  <svg viewBox="0 0 380 190" className="w-full max-w-[420px]">
                    {/* Railway track diagram or Electroscope diagram */}
                    <rect x="30" y="30" width="140" height="20" rx="4" fill="#334155" />
                    <rect x="210" y="30" width="140" height="20" rx="4" fill="#334155" />
                    <line x1="170" y1="25" x2="210" y2="25" stroke="#ef4444" strokeWidth="2" strokeDasharray="3 3" />

                    {/* Drop Target 1: Gap */}
                    <rect
                      x="165"
                      y="60"
                      width="90"
                      height="26"
                      rx="6"
                      fill="#1e293b"
                      stroke="#64748b"
                      strokeDasharray="4 4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_gap')}
                    />
                    <text x="210" y="77" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                      {droppedLabels.target_gap || 'Drop: Expansion Gap'}
                    </text>

                    {/* Drop Target 2: Rail */}
                    <rect
                      x="30"
                      y="60"
                      width="120"
                      height="26"
                      rx="6"
                      fill="#1e293b"
                      stroke="#64748b"
                      strokeDasharray="4 4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_rail')}
                    />
                    <text x="90" y="77" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                      {droppedLabels.target_rail || 'Drop: Steel Rail'}
                    </text>

                    {/* Drop Target 3: Joint */}
                    <rect
                      x="270"
                      y="60"
                      width="100"
                      height="26"
                      rx="6"
                      fill="#1e293b"
                      stroke="#64748b"
                      strokeDasharray="4 4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_joint')}
                    />
                    <text x="320" y="77" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                      {droppedLabels.target_joint || 'Drop: Fastener'}
                    </text>

                    {/* Drop Target 4: Sleeper */}
                    <rect
                      x="130"
                      y="120"
                      width="130"
                      height="26"
                      rx="6"
                      fill="#1e293b"
                      stroke="#64748b"
                      strokeDasharray="4 4"
                      onDragOver={e => e.preventDefault()}
                      onDrop={() => handleDragDrop('target_sleeper')}
                    />
                    <text x="195" y="137" textAnchor="middle" fill="#cbd5e1" fontSize="9" fontWeight="bold">
                      {droppedLabels.target_sleeper || 'Drop: Sleeper Bed'}
                    </text>
                  </svg>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(droppedLabels)}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Verify Diagram Labels ✓
                </motion.button>
              </div>
            )}

            {/* MODALITY C: Drag-Sort Sequence */}
            {activeChallenge.type === 'drag-sort' && activeChallenge.sortItems && (
              <div className="space-y-3">
                <p className="text-xs text-amber-300">
                  Drag items or click arrows to re-order the chronological sequence correctly:
                </p>
                {(sortArrangement.length === activeChallenge.sortItems.length
                  ? sortArrangement.map(idx => activeChallenge.sortItems![idx])
                  : activeChallenge.sortItems
                ).map((item, dIdx) => (
                  <motion.div
                    key={dIdx}
                    draggable
                    onDragStart={() => handleDragStart(String(dIdx))}
                    onDragOver={e => e.preventDefault()}
                    onDrop={() => {
                      const from = parseInt(draggedItem || '0');
                      handleSortMove(from, dIdx);
                    }}
                    whileHover={{ scale: 1.01 }}
                    className="p-3.5 bg-slate-800 rounded-xl border border-slate-700 flex items-center justify-between gap-3 cursor-grab"
                  >
                    <div className="flex items-center gap-3 text-sm">
                      <span className="w-6 h-6 rounded-full bg-cyan-950 text-cyan-300 font-bold flex items-center justify-center text-xs border border-cyan-800 shrink-0">
                        {dIdx + 1}
                      </span>
                      <span className="text-slate-200">{item}</span>
                    </div>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleSortMove(dIdx, Math.max(0, dIdx - 1))}
                        disabled={dIdx === 0}
                        aria-label="Move item up"
                        className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-xs disabled:opacity-30"
                      >
                        ▲
                      </button>
                      <button
                        onClick={() => handleSortMove(dIdx, Math.min(activeChallenge.sortItems!.length - 1, dIdx + 1))}
                        disabled={dIdx === activeChallenge.sortItems.length - 1}
                        aria-label="Move item down"
                        className="p-1 rounded bg-slate-700 hover:bg-slate-600 text-xs disabled:opacity-30"
                      >
                        ▼
                      </button>
                    </div>
                  </motion.div>
                ))}

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    const ans = sortArrangement.length > 0 ? sortArrangement : activeChallenge.sortItems?.map((_, i) => i) || [];
                    handleAnswer(ans);
                  }}
                  className="mt-2 px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold"
                >
                  Confirm Physical Order ✓
                </motion.button>
              </div>
            )}

            {/* MODALITY D: Numeric Input */}
            {activeChallenge.type === 'numeric' && (
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="number"
                    step="any"
                    value={numericInput}
                    onChange={e => setNumericInput(e.target.value)}
                    placeholder="Enter calculated value"
                    aria-label="Numeric calculation answer"
                    className="px-4 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white font-mono text-sm focus:outline-none focus:border-cyan-500"
                  />
                  <span className="text-sm font-bold text-cyan-400">{activeChallenge.unit}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleAnswer(numericInput)}
                    className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl font-bold text-xs"
                  >
                    Submit Calculation
                  </motion.button>
                </div>
              </div>
            )}

            {/* MODALITY E: Construct Definition / Equation */}
            {activeChallenge.type === 'construct' && activeChallenge.availableParts && (
              <div className="space-y-4">
                <p className="text-xs text-slate-400">{activeChallenge.validationHint}</p>
                <div className="flex flex-wrap gap-2">
                  {activeChallenge.availableParts.map((part, pI) => (
                    <motion.button
                      key={pI}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setConstructParts(prev => [...prev, part])}
                      className="px-3 py-1.5 bg-indigo-900/70 hover:bg-indigo-800 border border-indigo-700 rounded-lg text-xs font-medium text-indigo-200"
                    >
                      + {part}
                    </motion.button>
                  ))}
                </div>

                <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 min-h-[90px] flex flex-wrap gap-2 items-center">
                  {constructParts.map((item, cI) => (
                    <motion.span
                      key={cI}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="px-3 py-1 bg-cyan-900/60 border border-cyan-700 rounded-lg text-xs text-cyan-200 flex items-center gap-2"
                    >
                      {item}
                      <button
                        onClick={() => setConstructParts(prev => prev.filter((_, idx) => idx !== cI))}
                        aria-label="Remove construct part"
                        className="text-rose-400 hover:text-rose-300 font-bold"
                      >
                        ✕
                      </button>
                    </motion.span>
                  ))}
                  {constructParts.length === 0 && (
                    <span className="text-xs text-slate-500 italic">Click phrase tiles above to assemble the definition...</span>
                  )}
                </div>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => handleAnswer(constructParts.join(' '))}
                  disabled={constructParts.length === 0}
                  className="px-6 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-xl text-xs font-bold disabled:opacity-40"
                >
                  Verify Definition ✓
                </motion.button>
              </div>
            )}
          </div>

          {/* Progressive Disclosure Explanation Box */}
          {showExplanation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-5 bg-gradient-to-br from-indigo-950/60 to-slate-900 border border-indigo-700/60 rounded-2xl space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                  Physics Mechanism & Step-by-Step Breakdown
                </span>
                <span className="text-xs text-slate-400">Step {revealedSteps + 1}</span>
              </div>

              {activeChallenge.explanation
                .split('. ')
                .filter(s => s.trim().length > 0)
                .slice(0, revealedSteps + 1)
                .map((sentence, sIdx) => (
                  <motion.p
                    key={sIdx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm text-slate-200 leading-relaxed"
                  >
                    <strong className="text-cyan-400">{sIdx + 1}.</strong> {sentence}
                    {!sentence.endsWith('.') && '.'}
                  </motion.p>
                ))}

              <div className="pt-2 flex items-center justify-between">
                {revealedSteps <
                activeChallenge.explanation.split('. ').filter(s => s.trim().length > 0).length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setRevealedSteps(r => r + 1)}
                    className="px-4 py-2 bg-indigo-700 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold"
                  >
                    Reveal Next Reasoning Step →
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleNextChallenge}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-lg shadow-emerald-900/40"
                  >
                    {currentChallenge + 1 >= filteredChallenges.length ? 'Complete Final Assessment →' : 'Next Challenge →'}
                  </motion.button>
                )}
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* ─── 5. COMPLETION PHASE ─── */}
      {phase === 'complete' && (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="space-y-6">
          <div className="p-6 md:p-8 bg-gradient-to-br from-slate-900 via-indigo-950/60 to-cyan-950/70 rounded-3xl border border-cyan-800 text-center space-y-4">
            <div className="inline-flex p-4 bg-cyan-500/20 rounded-full border border-cyan-400/30 text-4xl mb-1">
              🏆
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-white">Investigation Certified!</h2>
            <p className="text-sm text-slate-300 max-w-lg mx-auto">
              You have completed all 10 core physics nodes across Thermal Physics, Acoustics & Electrostatics.
            </p>

            <div className="grid grid-cols-3 gap-3 max-w-md mx-auto pt-2">
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Final Score</div>
                <div className="text-lg font-black text-cyan-300">{Math.max(0, 100 - errors * 5)}%</div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Mastery Level</div>
                <div className="text-lg font-black text-emerald-300 capitalize">{masteryLevel}</div>
              </div>
              <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800">
                <div className="text-[10px] text-slate-400">Adaptive Tier</div>
                <div className="text-lg font-black text-amber-300 uppercase">{difficulty}</div>
              </div>
            </div>
          </div>

          {/* Motivational Feedback */}
          <div className="p-5 bg-emerald-950/40 rounded-2xl border border-emerald-700/60">
            <h4 className="text-xs font-bold text-emerald-300 uppercase tracking-wider mb-1">Academic Performance Appraisal</h4>
            <p className="text-sm text-emerald-100">
              {errors === 0
                ? '🌟 FLAWLESS MASTERY! Your physical intuition regarding molecular vaporization, thermal expansion coefficients, acoustic wave parameters, and electrostatics is impeccable.'
                : errors <= 3
                ? '👍 Superb performance! You demonstrated exceptional comprehension of core ICSE board concepts. Review the targeted recommendations below to secure a perfect score.'
                : '💪 Substantial learning progress achieved. Re-examine the interactive labs and study the misconception corrections below.'}
            </p>
          </div>

          {/* Reflection Section */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-amber-300 uppercase tracking-wider flex items-center gap-2">
              <span>💭</span> Scientific Reflection & Real-World Synthesis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-cyan-300">1. Surprising Insight</h5>
                <p className="text-xs text-slate-300 font-semibold">What was the most surprising thing you learned?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Notice how evaporation continuously cools the liquid by shedding high-energy molecules at any temperature, unlike boiling which requires an entire bulk phase equilibrium.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-cyan-300">2. Teaching Others</h5>
                <p className="text-xs text-slate-300 font-semibold">How would you explain this to a friend?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Conduction shares the same sign by direct touch, while induction rearranges mobile electrons from a distance, yielding the opposite permanent sign once grounded.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <h5 className="text-xs font-bold text-cyan-300">3. Practical Application</h5>
                <p className="text-xs text-slate-300 font-semibold">Where in real life might you use this?</p>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  From leaving expansion gaps on railway tracks in scorching summers to grounding aviation fuel tankers to dissipate hazardous electrostatic sparks safely.
                </p>
              </div>
            </div>
          </div>

          {/* Misconception Tracking Gaps */}
          {hitMisconceptions.length > 0 && (
            <div className="p-5 bg-rose-950/40 rounded-2xl border border-rose-800/60 space-y-3">
              <h4 className="text-xs font-bold text-rose-300 uppercase tracking-wider">
                Targeted Misconception Correction Profile
              </h4>
              <p className="text-xs text-slate-300">Review these specific concepts that caused friction during your trials:</p>
              {hitMisconceptions.map((mIdx, idx) => {
                const item = misconceptions?.[mIdx];
                if (!item) return null;
                return (
                  <div key={idx} className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800 space-y-1">
                    <p className="text-xs text-rose-300 font-bold">❌ Common Trap: &ldquo;{item.misconception}&rdquo;</p>
                    <p className="text-xs text-emerald-300">✅ Scientific Truth: {item.correction}</p>
                  </div>
                );
              })}
            </div>
          )}

          {/* Visible Spaced Repetition (SRS) Schedule */}
          <div className="p-5 bg-gradient-to-r from-amber-950/50 via-slate-900 to-indigo-950/50 rounded-2xl border border-amber-500/40 shadow-lg space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xl">🧠</span>
                <div>
                  <h4 className="text-sm font-black text-amber-300 uppercase tracking-wider">
                    Spaced Repetition Schedule (SM-2 Algorithm)
                  </h4>
                  <p className="text-xs text-slate-300">
                    Optimal memory retention interval calculated based on your performance:
                  </p>
                </div>
              </div>
              <span className="text-xs px-3 py-1.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase tracking-wider">
                {errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className={`p-3 rounded-xl border text-center transition-all ${errors === 0 ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="text-[10px] uppercase font-bold">0 Errors (Mastered)</div>
                <div className="text-sm font-black mt-0.5 text-amber-300">review in 7 days</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Long-term consolidation</div>
              </div>
              <div className={`p-3 rounded-xl border text-center transition-all ${errors >= 1 && errors <= 3 ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="text-[10px] uppercase font-bold">1–3 Errors (Solid)</div>
                <div className="text-sm font-black mt-0.5 text-amber-300">review in 3 days</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Reinforce borderline concepts</div>
              </div>
              <div className={`p-3 rounded-xl border text-center transition-all ${errors >= 4 ? 'bg-amber-500/20 border-amber-400 text-amber-200 shadow-md' : 'bg-slate-950/60 border-slate-800 text-slate-400'}`}>
                <div className="text-[10px] uppercase font-bold">4+ Errors (Practice)</div>
                <div className="text-sm font-black mt-0.5 text-amber-300">review in 1 day</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Immediate recall boost</div>
              </div>
            </div>

            <p className="text-[11px] text-amber-200/90 bg-amber-950/40 p-2.5 rounded-xl border border-amber-800/40">
              📅 <strong>Your Next Review:</strong> We will prompt you to review this topic in <strong>{errors === 0 ? '7 days' : errors <= 3 ? '3 days' : '1 day'}</strong> ({errors === 0 ? 'review in 7 days' : errors <= 3 ? 'review in 3 days' : 'review in 1 day'}) to ensure permanent neural encoding before ICSE examinations.
            </p>
          </div>

          {/* Final Real-World Scenario Activity */}
          <div className="p-6 bg-slate-900 rounded-2xl border border-slate-800 space-y-4">
            <h3 className="text-base font-black text-cyan-300">{REAL_WORLD_ACTIVITY.title}</h3>
            <p className="text-xs text-slate-300">{REAL_WORLD_ACTIVITY.description}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
              {REAL_WORLD_ACTIVITY.steps.map((step, idx) => (
                <div key={idx} className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-300 flex items-start gap-2">
                  <span className="font-bold text-cyan-400">{idx + 1}.</span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Floating Interactive Micro-Feedback Components */}
      {showHint && <HintBubble message={currentHint} onComplete={() => setShowHint(false)} />}
      {showConfetti && <Confetti onComplete={() => setShowConfetti(false)} />}
      {showSuccess && <SuccessBanner message="Challenge Level Completed!" onComplete={() => setShowSuccess(false)} />}
      {showSparkle && <SparkleBurst x={sparklePos.x} y={sparklePos.y} onComplete={() => setShowSparkle(false)} />}
    </div>
  );
}

export default C8_PhysicsBoilingEvaporationdifferencesSim;