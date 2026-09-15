'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  audioManager,
  speechManager,
  Confetti,
  SuccessBanner,
  HintBubble,
  SparkleBurst
} from '../../../lib/sim-engine';
import { createReviewItem, sm2Update } from '../../../lib/srs';
import { createBKTState, bktUpdate, getMasteryLevel } from '../../../lib/bkt';
import { recordGameScore, getNodeMastery } from '../../../lib/masteryStore';
import { SUBJECT_CONFIG } from '../../../lib/topicGraph';

// List of all node IDs required by the curriculum
const ALL_NODE_IDS = [
  'c12_chem_cbse_302',
  'c12_chem_cbse_303',
  'c12_chem_cbse_305',
  'c12_chem_cbse_307',
  'c12_chem_cbse_308',
  'c12_chem_cbse_309',
  'c12_chem_cbse_313',
  'c12_chem_cbse_318',
  'c12_chem_cbse_319',
  'c12_chem_cbse_320',
  'c12_chem_cbse_321',
  'c12_chem_cbse_322'
] as const;

type NodeID = typeof ALL_NODE_IDS[number];

interface Challenge {
  id: number;
  nodeId: NodeID;
  title: string;
  difficulty: 'Foundation' | 'Standard' | 'Advanced';
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  hint: string;
}

const CHALLENGES: Challenge[] = [
  {
    id: 1,
    nodeId: 'c12_chem_cbse_302',
    title: 'Double Salt vs Complex Ion Dissociation',
    difficulty: 'Foundation',
    question: 'When Potassium Ferrocyanide K4[Fe(CN)6] is dissolved in water, which ions are produced in solution?',
    options: [
      'K+, Fe2+, and CN- ions separately',
      '4 K+ ions and 1 [Fe(CN)6]4- complex ion',
      'Fe2+ and 6 CN- ions only',
      'K+ and Fe3+ ions with free hydrogen cyanide'
    ],
    correctIndex: 1,
    explanation: 'Coordination compounds do NOT dissociate into constituent central metal and ligand ions. K4[Fe(CN)6] yields 4 K+ counter ions and the intact complex anion [Fe(CN)6]4-. Double salts like Mohr\'s salt dissociate completely into simple ions.',
    hint: 'Think about square brackets: species inside the coordination sphere retain their identity in solution!'
  },
  {
    id: 2,
    nodeId: 'c12_chem_cbse_303',
    title: 'Oxidation & Coordination Number Calculation',
    difficulty: 'Foundation',
    question: 'Determine the oxidation state of Cobalt and its coordination number in [Co(NH3)5Cl]Cl2:',
    options: [
      'Oxidation state = +2, Coordination number = 5',
      'Oxidation state = +3, Coordination number = 6',
      'Oxidation state = +3, Coordination number = 5',
      'Oxidation state = +1, Coordination number = 6'
    ],
    correctIndex: 1,
    explanation: 'Ligands in sphere: 5 NH3 (neutral) + 1 Cl- (-1). Counter ions: 2 Cl- (-2). Total charge equation: x + 0 - 1 - 2 = 0 => x = +3. Coordination number is the total number of donor atoms attached to metal = 5 + 1 = 6.',
    hint: 'Count only donor atoms inside square brackets for coordination number, and balance total charges for oxidation state.'
  },
  {
    id: 3,
    nodeId: 'c12_chem_cbse_305',
    title: 'IUPAC Formula Construction',
    difficulty: 'Standard',
    question: 'What is the correct chemical formula for tetraamminedichloridocobalt(III) chloride?',
    options: [
      '[Co(NH3)4Cl2]Cl',
      '[CoCl2(NH3)4]Cl3',
      'Cl[Co(NH3)4Cl2]',
      '[Co(NH3)4Cl3]'
    ],
    correctIndex: 0,
    explanation: 'By IUPAC rules: Metal symbol first (Co), followed by ligands ordered alphabetically by ligand name in formula [Co(NH3)4Cl2]+. Cobalt is +3, 2 Cl- inside give +1 net charge on sphere, needing 1 Cl- outside as counter ion.',
    hint: 'List metal first, ligands in alphabetical order by formula/name, then balance overall charge with counter ions.'
  },
  {
    id: 4,
    nodeId: 'c12_chem_cbse_307',
    title: 'Linkage Isomerism Identification',
    difficulty: 'Standard',
    question: 'Which ligand pair demonstrates linkage isomerism due to ambidentate coordination behavior?',
    options: [
      'NH3 and H2O',
      '-NO2 (nitro) and -ONO (nitrito)',
      'Cl- and Br-',
      'en (ethylenediamine) and oxalate'
    ],
    correctIndex: 1,
    explanation: 'Ambidentate ligands like NO2- can attach via Nitrogen (-NO2, nitro) or Oxygen (-ONO, nitrito). This gives rise to linkage isomerism.',
    hint: 'Look for an ambidentate ligand that has two different atom types capable of donating an electron pair.'
  },
  {
    id: 5,
    nodeId: 'c12_chem_cbse_308',
    title: 'Ionisation vs Solvate Isomerism',
    difficulty: 'Standard',
    question: 'Which test distinguishes [Co(NH3)5SO4]Br from its ionisation isomer [Co(NH3)5Br]SO4?',
    options: [
      'Adding AgNO3 yields a yellow/pale-yellow precipitate of AgBr for the first compound, while BaCl2 yields white BaSO4 for the second.',
      'Boiling with NaOH produces ammonia gas only for the first compound.',
      'Adding dilute HCl produces CO2 gas in both.',
      'Flame test shows cobalt blue flame only for the second compound.'
    ],
    correctIndex: 0,
    explanation: '[Co(NH3)5SO4]Br releases free Br- ions (gives AgBr precipitate with AgNO3), while [Co(NH3)5Br]SO4 releases free SO4 2- ions (gives BaSO4 precipitate with BaCl2).',
    hint: 'Ionisation isomers release different counter ions in aqueous solution.'
  },
  {
    id: 6,
    nodeId: 'c12_chem_cbse_309',
    title: 'Homoleptic vs Heteroleptic Complexes',
    difficulty: 'Foundation',
    question: 'Which of the following is classified as a heteroleptic complex?',
    options: [
      '[Fe(CN)6]4-',
      '[Co(NH3)6]3+',
      '[Ni(CO)4]',
      '[Co(NH3)4Cl2]+'
    ],
    correctIndex: 3,
    explanation: 'Homoleptic complexes have only ONE type of ligand attached to the central metal (e.g., [Co(NH3)6]3+). Heteroleptic complexes contain MORE THAN ONE type of ligand (e.g., [Co(NH3)4Cl2]+ has both NH3 and Cl-).',
    hint: 'Hetero means different: look for a complex with more than one kind of ligand attached to the metal.'
  },
  {
    id: 7,
    nodeId: 'c12_chem_cbse_313',
    title: 'Limitations of Valence Bond Theory (VBT)',
    difficulty: 'Standard',
    question: 'Which critical property of coordination complexes does Valence Bond Theory (VBT) FAIL to explain?',
    options: [
      'The shape of octahedral complexes',
      'The absorption spectra and vivid colors of coordination complexes',
      'The existence of covalent bonds',
      'The atomic number of transition elements'
    ],
    correctIndex: 1,
    explanation: 'VBT cannot explain why transition metal complexes exhibit distinct visual colors, nor does it account for the spectrochemical series or quantitatively predict thermodynamic stability.',
    hint: 'Think about what causes ruby red or deep blue solutions in copper/cobalt chemistry — VBT offers no energy level mechanism for color!'
  },
  {
    id: 8,
    nodeId: 'c12_chem_cbse_318',
    title: 'Tetrahedral Crystal Field Splitting (Δt)',
    difficulty: 'Advanced',
    question: 'In tetrahedral crystal field splitting, how do d-orbital energy levels arrange and how does Δt compare to Δo?',
    options: [
      'eg is higher than t2g, and Δt = 9/4 Δo',
      'e set (dx2-y2, dz2) is lower in energy than t2 set (dxy, dyz, dxz), and Δt = (4/9) Δo',
      't2g set is lower than eg set, and Δt = Δo',
      'All 5 d-orbitals remain degenerate because tetrahedral fields are symmetrical'
    ],
    correctIndex: 1,
    explanation: 'In tetrahedral fields, d-orbitals pointing between axes (t2) experience greater repulsion from approaching ligands than those along axes (e). Thus e is lower and t2 is higher (inverted pattern). Because there are only 4 ligands, Δt = 4/9 Δo, which is small, making high-spin states almost mandatory.',
    hint: 'Tetrahedral fields invert the octahedral d-orbital splitting pattern and have a smaller splitting energy (4/9 ratio).'
  },
  {
    id: 9,
    nodeId: 'c12_chem_cbse_319',
    title: 'Limitations of Crystal Field Theory (CFT)',
    difficulty: 'Advanced',
    question: 'Why is CFT\'s assumption that ligands are purely electrostatic point charges considered a limitation?',
    options: [
      'It predicts anionic ligands should cause largest splitting, but anionic ligands like I- and Cl- are actually weak field ligands in spectrochemical series',
      'It incorrectly assumes transition metals have no d-electrons',
      'It forces all octahedral complexes to be tetrahedral',
      'It ignores mass conservation during chemical reactions'
    ],
    correctIndex: 0,
    explanation: 'CFT assumes point-charge electrostatic interactions. If true, negatively charged anions should exert maximum electrostatic repulsion and cause highest splitting. But neutral ligands like CO and phen cause larger splitting than Cl- or I-, revealing the importance of covalent metal-ligand pi-bonding (addressed by LFT/MOT).',
    hint: 'Consider where negatively charged halide ions rank in the spectrochemical series compared to neutral ligands like CO.'
  },
  {
    id: 10,
    nodeId: 'c12_chem_cbse_320',
    title: 'Metallurgy & Metal Purification',
    difficulty: 'Standard',
    question: 'In the Mond process for nickel purification, which volatile coordination compound is formed and then thermally decomposed?',
    options: [
      '[Ni(CN)4]2-',
      '[Ni(CO)4]',
      '[Ni(NH3)6]2+',
      '[Ni(H2O)6]2+'
    ],
    correctIndex: 1,
    explanation: 'Impure nickel reacts with carbon monoxide at 330-350 K to form volatile tetracarbonylnickel(0) [Ni(CO)4], which decomposes at 450-470 K to yield pure nickel metal.',
    hint: 'Carbon monoxide (carbonyl) forms a neutral volatile tetra-coordinate complex with nickel.'
  },
  {
    id: 11,
    nodeId: 'c12_chem_cbse_321',
    title: 'Biological Coordination Compounds',
    difficulty: 'Foundation',
    question: 'Identify the central metal ion in Chlorophyll, Haemoglobin, and Vitamin B12 respectively:',
    options: [
      'Mg2+, Fe2+, Co3+',
      'Fe2+, Mg2+, Cu2+',
      'Zn2+, Fe3+, Co2+',
      'Ca2+, Mg2+, Fe2+'
    ],
    correctIndex: 0,
    explanation: 'Chlorophyll contains Mg2+ coordinated in a porphyrin ring. Haemoglobin contains Fe2+ in a heme complex. Vitamin B12 (cyanocobalamin) contains Co3+.',
    hint: 'Chlorophyll uses Magnesium for light capture; Haemoglobin uses Iron for oxygen binding; Vitamin B12 uses Cobalt.'
  },
  {
    id: 12,
    nodeId: 'c12_chem_cbse_322',
    title: 'Applications in Medicine and Analytical Chemistry',
    difficulty: 'Standard',
    question: 'Which coordination complex is widely used as an anti-cancer drug, and which chelating agent measures water hardness via EDTA titration?',
    options: [
      'cis-[Pt(NH3)2Cl2] (cisplatin) for cancer; EDTA4- for water hardness (Ca2+/Mg2+)',
      'trans-[Pt(NH3)2Cl2] for cancer; DMG for water hardness',
      'Wilkinson catalyst for cancer; Hypo solution for water hardness',
      '[Au(CN)2]- for cancer; EDTA for water hardness'
    ],
    correctIndex: 0,
    explanation: 'cis-[Pt(NH3)2Cl2] (cisplatin) inhibits DNA replication in cancer cells. Na2EDTA forms stable hexadentate complexes with Ca2+ and Mg2+ to determine water hardness.',
    hint: 'Cis-isomer of platinum complex is effective in oncology; EDTA forms 1:1 hexadentate complexes with metal ions.'
  }
];

// ==========================================
// SCENARIO DATA
// ==========================================
const SCENARIO = {
  title: 'CBSE Class 12 Coordination Compounds Lab',
  subtitle: 'Master Werner Theory, Crystal Field Theory, and Isomerism',
  description: 'Step into a virtual coordination chemistry lab where you name complexes, identify isomers, and explore crystal field splitting in octahedral and tetrahedral fields.',
};

// ==========================================
// DISCOVERY QUESTION
// ==========================================
const DISCOVERY_QUESTION = {
  title: 'Discovery Challenge: The Color of Transition Metal Complexes',
  question: 'Why is [Ti(H2O)6]3+ purple while [Cu(H2O)6]2+ is blue, and why are many transition metal complexes colored while main group compounds are often white?',
  options: [
    'Transition metals are naturally colored elements',
    'Transition metal complexes have partially filled d-orbitals. Crystal field splitting creates a small energy gap (Δo) between t2g and eg orbitals. Visible light photons match this gap, causing d-d electron transitions that absorb specific wavelengths, transmitting the complementary color',
    'The color comes from the ligands, not the metal',
    'Color is caused by s-orbital transitions in all metals'
],
  correctIndex: 1,
  explanation: 'Transition metal complexes are colored due to d-d transitions: partially filled d-orbitals split into t2g and eg sets by the ligand field. The energy gap (Δo) corresponds to visible light wavelengths. Absorbing one color transmits the complementary color. [Ti(H2O)6]3+ (d1) absorbs yellow-green, transmitting purple. Main group compounds lack partially filled d-orbitals, so no d-d transitions occur.',
};

// ==========================================
// TEACHING / LAB WORKSTATIONS DATA
// ==========================================
const WORKSTATIONS_INFO = [
  {
    "id": "nomenclature",
    "name": "IUPAC Nomenclature Lab",
    "description": "Name coordination compounds following IUPAC rules."
  },
  {
    "id": "isomerism",
    "name": "Isomerism Lab",
    "description": "Identify geometric, optical, and linkage isomers."
  },
  {
    "id": "cft",
    "name": "Crystal Field Theory Lab",
    "description": "Explore octahedral and tetrahedral splitting, spectrochemical series."
  },
  {
    "id": "bonding",
    "name": "Werner & Bonding Lab",
    "description": "Study Werner coordination theory and primary/secondary valencies."
  }
];

// ==========================================
// MISCONCEPTIONS (Enrichment Data)
// ==========================================
interface Misconception {
  id: string;
  title: string;
  description: string;
  correction: string;
}

const MISCONCEPTIONS: Misconception[] = [
  {
    "id": "misc_1",
    "title": "Coordination Number Equals Total Number of Ligands Attached",
    "description": "Students often believe that the coordination number of a central metal ion is simply equal to the total count of ligand molecules or ions bound to it.",
    "correction": "Coordination number is defined as the total number of ligand donor atoms directly bonded to the central metal ion through coordinate bonds. For polydentate ligands like ethylenediamine (en) or EDTA, one ligand molecule provides multiple donor atoms. For instance, in [Co(en)3]3+, there are 3 ligand molecules, but the coordination number is 6 because 'en' is a bidentate ligand."
  },
  {
    "id": "misc_2",
    "title": "Observed Color of a Complex Matches Absorbed Light Wavelength",
    "description": "Students frequently assume that a coordination compound appears in the exact color corresponding to the wavelength of light absorbed during d-d transitions.",
    "correction": "When a coordination compound absorbs light of a specific wavelength for d-d transition, that specific color is removed from white light. The light transmitted or reflected to our eyes consists of the remaining unabsorbed wavelengths. Therefore, the observed color of the complex is always the complementary color of the light absorbed, not the absorbed color itself."
  },
  {
    "id": "misc_3",
    "title": "Tetrahedral Complexes Can Exhibit Cis-Trans Geometrical Isomerism",
    "description": "Students assume that MA2B2 type tetrahedral complexes can form cis and trans isomers just like square planar complexes with the same formula.",
    "correction": "In a regular tetrahedral geometry, all four coordination positions are equidistant from each other, separated by identical bond angles of 109.5 degrees. Because no two positions are opposite or uniquely adjacent relative to others, spatial rearrangement of ligands does not create different isomers. Consequently, tetrahedral complexes do not show geometrical isomerism."
  },
  {
    "id": "misc_4",
    "title": "Crystal Field Splitting in Tetrahedral Complexes Exceeds Octahedral",
    "description": "Students often incorrectly assume that tetrahedral crystal field splitting energy (Δt) is larger than octahedral splitting energy (Δo) because of fewer ligands causing less repulsion.",
    "correction": "Tetrahedral crystal field splitting (Δt) is actually much smaller than octahedral splitting (Δo), specifically Δt = (4/9)Δo. This happens because there are only four ligands instead of six, and none of the d-orbitals point directly at the incoming ligands in a tetrahedral arrangement. Because Δt is always less than the electron pairing energy, tetrahedral complexes are almost exclusively high-spin."
  },
  {
    "id": "misc_5",
    "title": "Primary Valencies Determine Spatial Geometry in Werner Theory",
    "description": "Students confuse primary and secondary valencies, believing that ionizable primary valencies are directional and dictate the stereochemistry of the complex.",
    "correction": "According to Werner's theory, primary valency corresponds to the oxidation state, is non-directional, and is satisfied only by negative ions. Secondary valency corresponds to the coordination number and is satisfied by neutral molecules or negative ions. It is the directional secondary valencies projected in specific spatial directions that dictate the overall molecular geometry of the coordination compound."
  }
];


export default function C12_ChemistryCoordinationCompoundsCBSESim() {
  // Navigation tabs
  const [activeTab, setActiveTab] = useState<'learn' | 'lab' | 'challenge'>('learn');

  // Interactive Learning Slide state
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Dissociation Canvas State
  const [dissociationType, setDissociationType] = useState<'double' | 'complex'>('complex');
  const [reagentAdded, setReagentAdded] = useState<'none' | 'AgNO3' | 'BaCl2'>('none');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Geometry Viewer State
  const [selectedGeometry, setSelectedGeometry] = useState<'octahedral' | 'tetrahedral' | 'square_planar'>('octahedral');
  const [rotationAngle, setRotationAngle] = useState(0);

  // Linkage Isomerism State
  const [linkageMode, setLinkageMode] = useState<'nitro' | 'nitrito'>('nitro');

  // Crystal Field Splitting State
  const [dElectrons, setDElectrons] = useState<number>(4);
  const [fieldStrength, setFieldStrength] = useState<'weak' | 'strong'>('strong');
  const [fieldType, setFieldType] = useState<'tetrahedral' | 'octahedral'>('tetrahedral');

  // Lab Sandbox State
  const [labMetal, setLabMetal] = useState<string>('Co');
  const [labLigand1, setLabLigand1] = useState<string>('NH3');
  const [labCount1, setLabCount1] = useState<number>(4);
  const [labLigand2, setLabLigand2] = useState<string>('Cl');
  const [labCount2, setLabCount2] = useState<number>(2);
  const [labCounterIon, setLabCounterIon] = useState<string>('Cl');
  const [labCounterCount, setLabCounterCount] = useState<number>(1);

  // Challenge Arena State
  const [challengeIdx, setChallengeIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);

  // SRS & BKT states mapped by Node ID
  const [bktStates, setBktStates] = useState<Record<string, ReturnType<typeof createBKTState>>>(() => {
    const initial: Record<string, ReturnType<typeof createBKTState>> = {};
    ALL_NODE_IDS.forEach((id) => {
      initial[id] = createBKTState();
    });
    return initial;
  });

  // Voice narration trigger on slide change
  useEffect(() => {
    const slideSpeeches = [
      "Welcome to Coordination Compounds! Let's explore double salts versus complex ions in solution.",
      "Coordination sphere encloses central metal and ligands. Observe coordination numbers and polyhedrons.",
      "Structural isomerism includes linkage, coordination, ionisation, and solvate isomers.",
      "Crystal field splitting in tetrahedral complexes features an inverted pattern with smaller delta-t.",
      "Coordination compounds play key roles in biological systems, metallurgy, and medicine!"
    ];
    if (activeTab === 'learn' && slideSpeeches[currentSlideIndex]) {
      speechManager.speak(slideSpeeches[currentSlideIndex]);
    }
  }, [currentSlideIndex, activeTab]);

  // Audio effect on tab change
  const handleTabSelect = (tab: 'learn' | 'lab' | 'challenge') => {
    audioManager.play('swoop');
    setActiveTab(tab);
  };

  // Canvas Animation for Solution Dissociation
  useEffect(() => {
    if (activeTab !== 'learn' || currentSlideIndex !== 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let time = 0;

    // Particle setup
    interface IonParticle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      label: string;
      color: string;
      radius: number;
      isCluster?: boolean;
    }

    let particles: IonParticle[] = [];

    const resetParticles = () => {
      particles = [];
      const cx = canvas.width / 2;
      const cy = canvas.height / 2 + 20;

      if (dissociationType === 'double') {
        // Mohr's salt: Fe2+, 2 NH4+, 2 SO4 2- separate completely
        const items = [
          { label: 'Fe²⁺', color: '#e11d48', r: 16 },
          { label: 'NH₄⁺', color: '#2563eb', r: 14 },
          { label: 'NH₄⁺', color: '#2563eb', r: 14 },
          { label: 'SO₄²⁻', color: '#d97706', r: 18 },
          { label: 'SO₄²⁻', color: '#d97706', r: 18 }
        ];
        items.forEach((it) => {
          particles.push({
            x: cx + (Math.random() - 0.5) * 120,
            y: cy + (Math.random() - 0.5) * 80,
            vx: (Math.random() - 0.5) * 1.5,
            vy: (Math.random() - 0.5) * 1.5,
            label: it.label,
            color: it.color,
            radius: it.r
          });
        });
      } else {
        // K4[Fe(CN)6]: 4 K+ floating free, 1 [Fe(CN)6]4- intact cluster
        for (let i = 0; i < 4; i++) {
          particles.push({
            x: cx + (Math.random() - 0.5) * 160,
            y: cy + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 1.8,
            vy: (Math.random() - 0.5) * 1.8,
            label: 'K⁺',
            color: '#8b5cf6',
            radius: 14
          });
        }
        // Complex ion cluster
        particles.push({
          x: cx,
          y: cy,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8,
          label: '[Fe(CN)₆]⁴⁻',
          color: '#059669',
          radius: 32,
          isCluster: true
        });
      }
    };

    resetParticles();

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw Beaker Liquid
      ctx.fillStyle = '#eff6ff';
      ctx.fillRect(40, 60, canvas.width - 80, canvas.height - 80);
      ctx.strokeStyle = '#94a3b8';
      ctx.lineWidth = 4;
      ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 50);

      // Beaker Label
      ctx.fillStyle = '#334155';
      ctx.font = 'bold 14px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(
        dissociationType === 'double'
          ? "Mohr's Salt Dissociation: [Fe2+ + 2 NH4+ + 2 SO4 2-]"
          : "Potassium Ferrocyanide: 4 K+ + [Fe(CN)6]4- (Intact Sphere)",
        canvas.width / 2,
        30
      );

      // Precipitation Overlay Effect
      if (reagentAdded === 'AgNO3') {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
        ctx.fillRect(42, 62, canvas.width - 84, canvas.height - 84);
        ctx.fillStyle = '#1e293b';
        ctx.font = '12px sans-serif';
        if (dissociationType === 'double') {
          ctx.fillText('Ag+ added -> Formed Ag2SO4 / AgCl precipitate!', canvas.width / 2, 85);
        } else {
          ctx.fillText('Ag+ added -> Reacts with K+ / forms Ag4[Fe(CN)6] complex ppt!', canvas.width / 2, 85);
        }
      } else if (reagentAdded === 'BaCl2') {
        ctx.fillStyle = '#cbd5e1';
        ctx.font = '12px sans-serif';
        if (dissociationType === 'double') {
          ctx.fillText('Ba2+ added -> Thick White BaSO4 Precipitate formed!', canvas.width / 2, 85);
        } else {
          ctx.fillText('Ba2+ added -> No SO4 2- available inside complex sphere!', canvas.width / 2, 85);
        }
      }

      // Update & Draw Particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce walls
        if (p.x - p.radius < 45 || p.x + p.radius > canvas.width - 45) p.vx *= -1;
        if (p.y - p.radius < 65 || p.y + p.radius > canvas.height - 20) p.vy *= -1;

        // Draw particle sphere
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowColor = 'rgba(0,0,0,0.2)';
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        // Draw label inside
        ctx.fillStyle = '#ffffff';
        ctx.font = p.isCluster ? 'bold 12px sans-serif' : 'bold 11px sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(p.label, p.x, p.y);
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [dissociationType, reagentAdded, activeTab, currentSlideIndex]);

  // Handle Challenge Answer
  const handleAnswerSubmit = (index: number) => {
    if (isSubmitted) return;
    setSelectedOption(index);
    setIsSubmitted(true);

    const currentQ = CHALLENGES[challengeIdx];
    const isCorrect = index === currentQ.correctIndex;

    // Update BKT & SRS
    const nodeId = currentQ.nodeId;
    const updatedBKT = bktUpdate(bktStates[nodeId] || createBKTState(), isCorrect);
    setBktStates((prev) => ({ ...prev, [nodeId]: updatedBKT }));

    const srsItem = createReviewItem(nodeId, 'Chemistry');
    sm2Update(srsItem, isCorrect ? 5 : 2, 0);

    if (isCorrect) {
      audioManager.play('success');
      audioManager.play('sparkle');
      setScore((prev) => prev + 10);
      setShowConfetti(true);
      setShowSuccess(true);
      speechManager.speak("Excellent! That is the correct CBSE answer.");
      setTimeout(() => setShowConfetti(false), 3000);
      setTimeout(() => setShowSuccess(false), 2500);
    } else {
      audioManager.play('error');
      speechManager.speak("That's not quite right. Review the explanation carefully.");
    }
  };

  const nextChallenge = () => {
    audioManager.play('whoosh');
    setSelectedOption(null);
    setIsSubmitted(false);
    setShowHint(false);
    if (challengeIdx < CHALLENGES.length - 1) {
      setChallengeIdx((prev) => prev + 1);
    } else {
      recordGameScore([...ALL_NODE_IDS], score + 10);
      audioManager.play('celebration');
      speechManager.speak("Congratulations! You have completed all coordination compound challenges.");
    }
  };

  // Helper for lab charge calculation
  const getLigandCharge = (lig: string) => {
    if (['Cl', 'Br', 'NO2', 'CN', 'SCN'].includes(lig)) return -1;
    if (['SO4', 'ox'].includes(lig)) return -2;
    return 0; // NH3, H2O, CO, en
  };

  const getCounterCharge = (cnt: string) => {
    if (cnt === 'Cl' || cnt === 'Br' || cnt === 'K' || cnt === 'Na') return 1;
    if (cnt === 'SO4') return 2;
    return 1;
  };

  const calcLabOxidation = () => {
    const totalLigandCharge = getLigandCharge(labLigand1) * labCount1 + getLigandCharge(labLigand2) * labCount2;
    // sphere charge + counter ion charge = 0
    let counterSign = (labCounterIon === 'K' || labCounterIon === 'Na') ? -1 : 1; // cations written first
    let counterTotal = counterSign * getCounterCharge(labCounterIon) * labCounterCount;
    // metal + ligCharge + counterTotal = 0 => metal = -ligCharge - counterTotal
    const metalOx = -totalLigandCharge - counterTotal;
    return metalOx;
  };

  const labCoordinationNum = labCount1 + labCount2;

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-4 md:p-6 font-sans select-none">
      {/* Platform Audio & Overlay Anchors */}
      <Confetti show={showConfetti} />
      <SuccessBanner show={showSuccess} text="Correct Answer! +10 Points" />
      {sparklePos && <SparkleBurst show={true} x={sparklePos.x} y={sparklePos.y} />}

      {/* Header Bar */}
      <header className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-800/90 border border-slate-700 p-4 rounded-2xl shadow-xl backdrop-blur-md mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
            [M]
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold bg-gradient-to-r from-indigo-300 via-cyan-200 to-white bg-clip-text text-transparent">
              Coordination Compounds Mastery
            </h1>
            <p className="text-xs text-slate-400">
              CBSE Class 12 Chemistry • Interactive Visual Simulation
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-slate-950/60 p-1.5 rounded-xl border border-slate-700/50">
          <button
            onClick={() => handleTabSelect('learn')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'learn'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            📖 Visual Concepts
          </button>
          <button
            onClick={() => handleTabSelect('lab')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'lab'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🧪 Formula Builder & Lab
          </button>
          <button
            onClick={() => handleTabSelect('challenge')}
            className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
              activeTab === 'challenge'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            🎯 Exam Arena ({score} pts)
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto">
        {/* TAB 1: VISUAL CONCEPT LESSONS */}
        {activeTab === 'learn' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sidebar Navigation for Slides */}
            <div className="lg:col-span-3 bg-slate-800/60 border border-slate-700/80 rounded-2xl p-4 flex flex-col gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2 px-2">
                Core CBSE Modules
              </h3>
              {[
                { title: '1. Double Salts vs Complex Ions', node: 'c12_chem_cbse_302' },
                { title: '2. Geometry & Polyhedron', node: 'c12_chem_cbse_303' },
                { title: '3. Structural Isomerisms', node: 'c12_chem_cbse_307' },
                { title: '4. Tetrahedral CFT & Splitting', node: 'c12_chem_cbse_318' },
                { title: '5. Real-World Applications', node: 'c12_chem_cbse_320' }
              ].map((m, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    audioManager.play('tap');
                    setCurrentSlideIndex(idx);
                  }}
                  className={`text-left px-3 py-3 rounded-xl transition-all flex items-center justify-between text-sm ${
                    currentSlideIndex === idx
                      ? 'bg-indigo-600/20 border border-indigo-500/50 text-indigo-200 font-medium'
                      : 'hover:bg-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <span>{m.title}</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-900 border border-slate-700 text-slate-400 font-mono">
                    {getMasteryLevel(bktStates[m.node] || createBKTState())}
                  </span>
                </button>
              ))}
            </div>

            {/* Visual Display Stage */}
            <div className="lg:col-span-9 bg-slate-800/80 border border-slate-700 rounded-2xl p-6 flex flex-col justify-between min-h-[520px] shadow-2xl relative overflow-hidden">
              {/* SLIDE 1: Double Salts vs Coordination Compounds */}
              {currentSlideIndex === 0 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>💧</span> Dissociation Behavior in Aqueous Solution
                      </h2>
                      <p className="text-xs text-slate-400">
                        Node: <code className="text-indigo-300">c12_chem_cbse_302</code>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          audioManager.play('pop');
                          setDissociationType('double');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          dissociationType === 'double'
                            ? 'bg-amber-600 text-white shadow'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        Mohr's Salt (Double Salt)
                      </button>
                      <button
                        onClick={() => {
                          audioManager.play('pop');
                          setDissociationType('complex');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                          dissociationType === 'complex'
                            ? 'bg-emerald-600 text-white shadow'
                            : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      >
                        K4[Fe(CN)6] (Complex)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-7 bg-slate-950/80 border border-slate-800 rounded-xl p-3 flex flex-col items-center justify-center">
                      <canvas
                        ref={canvasRef}
                        width={420}
                        height={260}
                        className="rounded-lg max-w-full"
                      />
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => {
                            audioManager.play('chime');
                            setReagentAdded('AgNO3');
                          }}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs rounded-lg"
                        >
                          🧪 Add AgNO3 Test
                        </button>
                        <button
                          onClick={() => {
                            audioManager.play('chime');
                            setReagentAdded('BaCl2');
                          }}
                          className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-600 text-xs rounded-lg"
                        >
                          🧪 Add BaCl2 Test
                        </button>
                        <button
                          onClick={() => {
                            audioManager.play('tap');
                            setReagentAdded('none');
                          }}
                          className="px-2 py-1 bg-slate-900 text-slate-400 text-xs rounded-lg border border-slate-800"
                        >
                          Reset Test
                        </button>
                      </div>
                    </div>

                    <div className="md:col-span-5 flex flex-col justify-center gap-3 bg-slate-900/50 p-4 rounded-xl border border-slate-700/60 text-xs">
                      <h4 className="font-bold text-indigo-300 text-sm">Key CBSE Distinction:</h4>
                      <ul className="space-y-2 text-slate-300">
                        <li className="flex items-start gap-2">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>
                            <strong>Double Salts:</strong> Dissociate <em>completely</em> into individual simple ions (Fe²⁺, NH₄⁺, SO₄²⁻). Lose identity in water.
                          </span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>
                            <strong>Coordination Complex:</strong> Complex ion <code className="text-emerald-300">[Fe(CN)₆]⁴⁻</code> retains its structure; does NOT give free Fe²⁺ or CN⁻ tests.
                          </span>
                        </li>
                      </ul>
                      <div className="p-3 bg-indigo-950/40 border border-indigo-800/50 rounded-lg text-indigo-200">
                        💡 <strong>Werner's Evidence:</strong> Precipitate yield directly measures counter ions existing OUTSIDE square brackets!
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 2: Coordination Geometries & Polyhedron */}
              {currentSlideIndex === 1 && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>💎</span> Coordination Polyhedron & Geometry
                      </h2>
                      <p className="text-xs text-slate-400">
                        Nodes: <code className="text-indigo-300">c12_chem_cbse_303, c12_chem_cbse_309</code>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedGeometry('octahedral')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          selectedGeometry === 'octahedral' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Octahedral (CN=6)
                      </button>
                      <button
                        onClick={() => setSelectedGeometry('tetrahedral')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          selectedGeometry === 'tetrahedral' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Tetrahedral (CN=4)
                      </button>
                      <button
                        onClick={() => setSelectedGeometry('square_planar')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          selectedGeometry === 'square_planar' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Square Planar (CN=4)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    {/* SVG Interactive Geometry Visualizer */}
                    <div className="md:col-span-7 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center justify-center relative min-h-[260px]">
                      <svg width="300" height="240" viewBox="0 0 300 240" className="overflow-visible">
                        {/* Central Metal Atom */}
                        <circle cx="150" cy="120" r="24" fill="#6366f1" className="shadow-lg" />
                        <text x="150" y="125" textAnchor="middle" fill="#ffffff" fontWeight="bold" fontSize="14">
                          M
                        </text>

                        {/* Geometry Ligand Positions */}
                        {selectedGeometry === 'octahedral' && (
                          <g>
                            {/* Lines */}
                            <line x1="150" y1="120" x2="150" y2="40" stroke="#94a3b8" strokeWidth="3" strokeDasharray="2 2" />
                            <line x1="150" y1="120" x2="150" y2="200" stroke="#94a3b8" strokeWidth="3" strokeDasharray="2 2" />
                            <line x1="150" y1="120" x2="70" y2="100" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="230" y2="140" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="230" y2="100" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="70" y2="140" stroke="#94a3b8" strokeWidth="3" />

                            {/* Spheres */}
                            <circle cx="150" cy="40" r="14" fill="#10b981" />
                            <circle cx="150" cy="200" r="14" fill="#10b981" />
                            <circle cx="70" cy="100" r="14" fill="#10b981" />
                            <circle cx="230" cy="140" r="14" fill="#10b981" />
                            <circle cx="230" cy="100" r="14" fill="#10b981" />
                            <circle cx="70" cy="140" r="14" fill="#10b981" />
                          </g>
                        )}

                        {selectedGeometry === 'tetrahedral' && (
                          <g>
                            <line x1="150" y1="120" x2="150" y2="45" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="80" y2="185" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="220" y2="185" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="190" y2="140" stroke="#94a3b8" strokeWidth="3" strokeDasharray="3 3" />

                            <circle cx="150" cy="45" r="14" fill="#f59e0b" />
                            <circle cx="80" cy="185" r="14" fill="#f59e0b" />
                            <circle cx="220" cy="185" r="14" fill="#f59e0b" />
                            <circle cx="190" cy="140" r="14" fill="#f59e0b" />
                          </g>
                        )}

                        {selectedGeometry === 'square_planar' && (
                          <g>
                            <line x1="150" y1="120" x2="70" y2="60" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="230" y2="60" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="230" y2="180" stroke="#94a3b8" strokeWidth="3" />
                            <line x1="150" y1="120" x2="70" y2="180" stroke="#94a3b8" strokeWidth="3" />

                            <circle cx="70" cy="60" r="14" fill="#ec4899" />
                            <circle cx="230" cy="60" r="14" fill="#ec4899" />
                            <circle cx="230" cy="180" r="14" fill="#ec4899" />
                            <circle cx="70" cy="180" r="14" fill="#ec4899" />
                          </g>
                        )}
                      </svg>
                      <span className="text-xs text-slate-400 mt-2">
                        {selectedGeometry === 'octahedral' && 'Octahedral Polyhedron: 90° bond angles'}
                        {selectedGeometry === 'tetrahedral' && 'Tetrahedral Polyhedron: 109.5° bond angles'}
                        {selectedGeometry === 'square_planar' && 'Square Planar Polyhedron: 90° planar bond angles'}
                      </span>
                    </div>

                    <div className="md:col-span-5 space-y-3 text-xs text-slate-300">
                      <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                        <strong className="text-indigo-300 text-sm">Coordination Number Rules:</strong>
                        <p className="mt-1">
                          Only <strong>σ (sigma) bonds</strong> formed by donor ligand atoms count toward coordination number. π bonds are ignored!
                        </p>
                      </div>
                      <div className="p-3 bg-slate-900 border border-slate-700 rounded-xl">
                        <strong className="text-indigo-300 text-sm">Homoleptic vs Heteroleptic:</strong>
                        <ul className="mt-1 space-y-1">
                          <li>• <strong>Homoleptic:</strong> All ligands identical, e.g., <code className="text-emerald-400">[Co(NH3)6]3+</code></li>
                          <li>• <strong>Heteroleptic:</strong> Mixed ligand types, e.g., <code className="text-amber-400">[Co(NH3)4Cl2]+</code></li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 3: Structural Isomerisms */}
              {currentSlideIndex === 2 && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>🔀</span> Structural Isomerism & Ambidentate Ligands
                      </h2>
                      <p className="text-xs text-slate-400">
                        Nodes: <code className="text-indigo-300">c12_chem_cbse_307, c12_chem_cbse_308</code>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setLinkageMode('nitro')}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          linkageMode === 'nitro' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        M-NO2 (Nitro - Yellow)
                      </button>
                      <button
                        onClick={() => setLinkageMode('nitrito')}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          linkageMode === 'nitrito' ? 'bg-rose-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        M-ONO (Nitrito - Red)
                      </button>
                    </div>
                  </div>

                  {/* Visualizer for Ambidentate Linkage */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center">
                      <h4 className="text-xs font-bold text-slate-400 mb-2">Linkage Isomerism Visualizer</h4>
                      <svg width="260" height="150" viewBox="0 0 260 150">
                        {/* Central Cobalt */}
                        <circle cx="70" cy="75" r="22" fill="#6366f1" />
                        <text x="70" y="80" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="13">Co</text>

                        {/* Linkage bond */}
                        <line x1="92" y1="75" x2="140" y2="75" stroke="#e2e8f0" strokeWidth="4" />

                        {linkageMode === 'nitro' ? (
                          <g>
                            {/* N atom */}
                            <circle cx="155" cy="75" r="16" fill="#3b82f6" />
                            <text x="155" y="80" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">N</text>
                            {/* O atoms */}
                            <line x1="167" y1="67" x2="195" y2="45" stroke="#ef4444" strokeWidth="3" />
                            <line x1="167" y1="83" x2="195" y2="105" stroke="#ef4444" strokeWidth="3" />
                            <circle cx="205" cy="40" r="12" fill="#ef4444" />
                            <text x="205" y="44" textAnchor="middle" fill="#fff" fontSize="10">O</text>
                            <circle cx="205" cy="110" r="12" fill="#ef4444" />
                            <text x="205" y="114" textAnchor="middle" fill="#fff" fontSize="10">O</text>
                          </g>
                        ) : (
                          <g>
                            {/* O atom bonded directly */}
                            <circle cx="155" cy="75" r="16" fill="#ef4444" />
                            <text x="155" y="80" textAnchor="middle" fill="#fff" fontWeight="bold" fontSize="12">O</text>
                            {/* N atom */}
                            <line x1="171" y1="75" x2="200" y2="75" stroke="#3b82f6" strokeWidth="3" />
                            <circle cx="215" cy="75" r="14" fill="#3b82f6" />
                            <text x="215" y="79" textAnchor="middle" fill="#fff" fontSize="10">N</text>
                          </g>
                        )}
                      </svg>
                      <span className="text-xs text-amber-300 font-mono mt-1">
                        {linkageMode === 'nitro' ? '[Co(NH3)5(NO2)]Cl2 (Nitro-N complex)' : '[Co(NH3)5(ONO)]Cl2 (Nitrito-O complex)'}
                      </span>
                    </div>

                    {/* Summary of 4 Structural Isomerisms */}
                    <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-700 text-xs space-y-2">
                      <div className="border-b border-slate-800 pb-1">
                        <strong className="text-indigo-300">1. Linkage Isomerism:</strong>
                        <p className="text-slate-400">Ambidentate ligands (NO2-, SCN-) bind through different donor atoms.</p>
                      </div>
                      <div className="border-b border-slate-800 pb-1">
                        <strong className="text-indigo-300">2. Coordination Isomerism:</strong>
                        <p className="text-slate-400">Ligand exchange between cationic & anionic complexes: [Co(NH3)6][Cr(CN)6] vs [Cr(NH3)6][Co(CN)6].</p>
                      </div>
                      <div className="border-b border-slate-800 pb-1">
                        <strong className="text-indigo-300">3. Ionisation Isomerism:</strong>
                        <p className="text-slate-400">Counter ion exchanges place with a ligand inside sphere: [Co(NH3)5SO4]Br vs [Co(NH3)5Br]SO4.</p>
                      </div>
                      <div>
                        <strong className="text-indigo-300">4. Solvate / Hydrate Isomerism:</strong>
                        <p className="text-slate-400">Water inside sphere vs free crystal lattice: [Cr(H2O)6]Cl3 (violet) vs [Cr(H2O)5Cl]Cl2·H2O (green).</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 4: Tetrahedral Crystal Field Splitting (Δt) & VBT Limitations */}
              {currentSlideIndex === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-700 pb-2">
                    <div>
                      <h2 className="text-xl font-bold text-white flex items-center gap-2">
                        <span>⚡</span> Crystal Field Splitting in Tetrahedral Complexes
                      </h2>
                      <p className="text-xs text-slate-400">
                        Nodes: <code className="text-indigo-300">c12_chem_cbse_313, c12_chem_cbse_318, c12_chem_cbse_319</code>
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFieldType('tetrahedral')}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          fieldType === 'tetrahedral' ? 'bg-amber-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Tetrahedral (Inverted)
                      </button>
                      <button
                        onClick={() => setFieldType('octahedral')}
                        className={`px-3 py-1 rounded text-xs font-semibold ${
                          fieldType === 'octahedral' ? 'bg-indigo-600 text-white' : 'bg-slate-700 text-slate-300'
                        }`}
                      >
                        Octahedral (Standard)
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    {/* Energy Diagram SVG */}
                    <div className="md:col-span-7 bg-slate-950 p-3 rounded-xl border border-slate-800 flex flex-col items-center">
                      <h4 className="text-xs font-bold text-slate-300 mb-1">
                        {fieldType === 'tetrahedral' ? 'Tetrahedral Field: t2 higher, e lower' : 'Octahedral Field: eg higher, t2g lower'}
                      </h4>
                      <svg width="340" height="210" viewBox="0 0 340 210">
                        {/* Energy Axis */}
                        <line x1="30" y1="190" x2="30" y2="20" stroke="#94a3b8" strokeWidth="2" />
                        <polygon points="30,15 25,25 35,25" fill="#94a3b8" />
                        <text x="15" y="105" fill="#94a3b8" fontSize="11" transform="rotate(-90 15 105)">Energy E</text>

                        {/* Free Metal Ion (5 degenerate orbitals) */}
                        <g>
                          <text x="75" y="195" fill="#64748b" fontSize="10">Free Ion (d5)</text>
                          {[0, 1, 2, 3, 4].map((i) => (
                            <rect key={i} x={50 + i * 16} y={140} width="14" height="14" fill="none" stroke="#64748b" strokeWidth="1.5" />
                          ))}
                        </g>

                        {/* Splitting pattern */}
                        {fieldType === 'tetrahedral' ? (
                          <g>
                            {/* Higher t2 set (3 orbitals: dxy, dyz, dxz) */}
                            <text x="240" y="45" fill="#f59e0b" fontSize="12" fontWeight="bold">t2 set (+0.4 Δt)</text>
                            {[0, 1, 2].map((i) => (
                              <rect key={i} x={220 + i * 22} y={55} width="18" height="18" fill="#f59e0b22" stroke="#f59e0b" strokeWidth="2" />
                            ))}

                            {/* Lower e set (2 orbitals: dx2-y2, dz2) */}
                            <text x="240" y="155" fill="#3b82f6" fontSize="12" fontWeight="bold">e set (-0.6 Δt)</text>
                            {[0, 1].map((i) => (
                              <rect key={i} x={230 + i * 22} y={125} width="18" height="18" fill="#3b82f622" stroke="#3b82f6" strokeWidth="2" />
                            ))}

                            {/* Δt Gap indication */}
                            <line x1="200" y1="64" x2="200" y2="134" stroke="#ec4899" strokeWidth="1.5" />
                            <text x="175" y="102" fill="#ec4899" fontSize="11" fontWeight="bold">Δt = 4/9 Δo</text>
                          </g>
                        ) : (
                          <g>
                            {/* Higher eg set */}
                            <text x="240" y="45" fill="#3b82f6" fontSize="12" fontWeight="bold">eg set (+0.6 Δo)</text>
                            {[0, 1].map((i) => (
                              <rect key={i} x={230 + i * 22} y={55} width="18" height="18" fill="#3b82f622" stroke="#3b82f6" strokeWidth="2" />
                            ))}

                            {/* Lower t2g set */}
                            <text x="240" y="155" fill="#f59e0b" fontSize="12" fontWeight="bold">t2g set (-0.4 Δo)</text>
                            {[0, 1, 2].map((i) => (
                              <rect key={i} x={220 + i * 22} y={125} width="18" height="18" fill="#f59e0b22" stroke="#f59e0b" strokeWidth="2" />
                            ))}

                            {/* Δo Gap indication */}
                            <line x1="200" y1="64" x2="200" y2="134" stroke="#6366f1" strokeWidth="1.5" />
                            <text x="180" y="102" fill="#6366f1" fontSize="11" fontWeight="bold">Δo</text>
                          </g>
                        )}
                      </svg>
                    </div>

                    {/* Theoretical Limitations & Rules */}
                    <div className="md:col-span-5 bg-slate-900/60 p-3 rounded-xl border border-slate-700 text-xs space-y-2">
                      <h4 className="font-bold text-amber-300 text-sm">Key CBSE Rules for Δt:</h4>
                      <ul className="space-y-1.5 text-slate-300">
                        <li>• <strong>Inverted Pattern:</strong> e set is lower, t2 set is higher (no 'g' subscript used because tetrahedral lacks inversion center).</li>
                        <li>• <strong>4/9 Rule:</strong> <code className="text-amber-300 font-mono">Δt = (4/9) Δo</code>. Small splitting gap means Δt &lt; Pairing energy P.</li>
                        <li>• <strong>Always High Spin:</strong> Tetrahedral complexes almost NEVER form low-spin configurations!</li>
                      </ul>
                      <div className="p-2 bg-rose-950/40 border border-rose-800/50 rounded-lg text-rose-200 mt-2">
                        ⚠️ <strong>VBT & CFT Limitations:</strong> VBT fails to explain color & spectrochemical series. CFT assumes point charges and fails to account for metal-ligand covalent character (solved by LFT/MOT).
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* SLIDE 5: Real-World Applications */}
              {currentSlideIndex === 4 && (
                <div className="space-y-4">
                  <div className="border-b border-slate-700 pb-2">
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>🌍</span> Real-World Applications (Biology, Industry, Medicine)
                    </h2>
                    <p className="text-xs text-slate-400">
                      Nodes: <code className="text-indigo-300">c12_chem_cbse_320, c12_chem_cbse_321, c12_chem_cbse_322</code>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    {/* Biological Systems */}
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-2">
                          <span>🌿</span> Biological Systems (c12_chem_cbse_321)
                        </div>
                        <ul className="space-y-2 text-slate-300">
                          <li>• <strong>Chlorophyll:</strong> Mg²⁺ coordinated to porphyrin ring (photosynthesis).</li>
                          <li>• <strong>Haemoglobin:</strong> Fe²⁺ heme complex (oxygen transport in blood).</li>
                          <li>• <strong>Vitamin B12:</strong> Cobalt (Co³⁺) complex preventing pernicious anemia.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Metallurgy & Industry */}
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-amber-400 font-bold text-sm mb-2">
                          <span>🏭</span> Metallurgy & Industry (c12_chem_cbse_320)
                        </div>
                        <ul className="space-y-2 text-slate-300">
                          <li>• <strong>Gold Extraction:</strong> Soluble cyanide complex <code className="text-amber-300">[Au(CN)2]⁻</code> reduced by Zinc.</li>
                          <li>• <strong>Mond Process:</strong> Impure Ni forms volatile <code className="text-cyan-300">[Ni(CO)4]</code> decomposed to pure Nickel metal.</li>
                          <li>• <strong>Wilkinson Catalyst:</strong> <code className="text-indigo-300">[(Ph3P)3RhCl]</code> used for alkene hydrogenation.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Medicine & Analysis */}
                    <div className="bg-slate-900 border border-slate-700 p-4 rounded-xl flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-rose-400 font-bold text-sm mb-2">
                          <span>💊</span> Medicine & Analysis (c12_chem_cbse_322)
                        </div>
                        <ul className="space-y-2 text-slate-300">
                          <li>• <strong>Cis-platin:</strong> <code className="text-rose-300">cis-[Pt(NH3)2Cl2]</code> used in anti-cancer chemotherapy.</li>
                          <li>• <strong>EDTA Titration:</strong> Estimation of water hardness (Ca²⁺ & Mg²⁺).</li>
                          <li>• <strong>Chelation Therapy:</strong> EDTA removes toxic lead (Pb²⁺); D-penicillamine removes excess Copper.</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Carousel Navigation */}
              <div className="flex items-center justify-between border-t border-slate-700 pt-4 mt-4">
                <button
                  disabled={currentSlideIndex === 0}
                  onClick={() => {
                    audioManager.play('swoop');
                    setCurrentSlideIndex((prev) => prev - 1);
                  }}
                  className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-xs font-semibold"
                >
                  ← Previous Module
                </button>
                <div className="flex gap-1.5">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className={`w-2.5 h-2.5 rounded-full transition-all ${
                        currentSlideIndex === i ? 'bg-indigo-400 w-6' : 'bg-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <button
                  disabled={currentSlideIndex === 4}
                  onClick={() => {
                    audioManager.play('swoop');
                    setCurrentSlideIndex((prev) => prev + 1);
                  }}
                  className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-xs font-semibold text-white shadow"
                >
                  Next Module →
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: INTERACTIVE FORMULA & OXIDATION LAB */}
        {activeTab === 'lab' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="border-b border-slate-700 pb-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <span>🧪</span> Dynamic IUPAC Formula & Oxidation Calculator
                </h2>
                <p className="text-xs text-slate-400">
                  Build complex coordination entities live and calculate coordination number, charge, and oxidation state.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Controls Form */}
              <div className="md:col-span-6 bg-slate-900/80 p-5 rounded-xl border border-slate-700 space-y-4 text-xs">
                <h3 className="font-bold text-indigo-300 text-sm">Assemble Coordination Entity</h3>

                {/* Central Metal */}
                <div>
                  <label className="block text-slate-400 mb-1 font-semibold">Central Metal Ion:</label>
                  <select
                    value={labMetal}
                    onChange={(e) => setLabMetal(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                  >
                    <option value="Co">Cobalt (Co)</option>
                    <option value="Fe">Iron (Fe)</option>
                    <option value="Cr">Chromium (Cr)</option>
                    <option value="Ni">Nickel (Ni)</option>
                    <option value="Pt">Platinum (Pt)</option>
                  </select>
                </div>

                {/* Primary Ligand */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Primary Ligand:</label>
                    <select
                      value={labLigand1}
                      onChange={(e) => setLabLigand1(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                    >
                      <option value="NH3">Ammine (NH3)</option>
                      <option value="H2O">Aqua (H2O)</option>
                      <option value="CN">Cyano (CN-)</option>
                      <option value="en">Ethylenediamine (en)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Quantity:</label>
                    <input
                      type="number"
                      min="1"
                      max="6"
                      value={labCount1}
                      onChange={(e) => setLabCount1(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>

                {/* Secondary Ligand */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Secondary Ligand:</label>
                    <select
                      value={labLigand2}
                      onChange={(e) => setLabLigand2(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                    >
                      <option value="Cl">Chlorido (Cl-)</option>
                      <option value="Br">Bromido (Br-)</option>
                      <option value="NO2">Nitro (NO2-)</option>
                      <option value="SO4">Sulphato (SO4 2-)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Quantity:</label>
                    <input
                      type="number"
                      min="0"
                      max="4"
                      value={labCount2}
                      onChange={(e) => setLabCount2(parseInt(e.target.value) || 0)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>

                {/* Counter Ion */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Counter Ion:</label>
                    <select
                      value={labCounterIon}
                      onChange={(e) => setLabCounterIon(e.target.value)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                    >
                      <option value="Cl">Chloride (Cl-)</option>
                      <option value="Br">Bromide (Br-)</option>
                      <option value="K">Potassium (K+)</option>
                      <option value="Na">Sodium (Na+)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-slate-400 mb-1 font-semibold">Counter Ion Count:</label>
                    <input
                      type="number"
                      min="1"
                      max="4"
                      value={labCounterCount}
                      onChange={(e) => setLabCounterCount(parseInt(e.target.value) || 1)}
                      className="w-full bg-slate-800 border border-slate-600 rounded-lg p-2 text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Calculated Results Display */}
              <div className="md:col-span-6 bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col justify-between items-center text-center">
                <div className="w-full space-y-4">
                  <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
                    Formulated Chemical Compound
                  </h3>

                  {/* Chemical Formula Render */}
                  <div className="p-4 bg-slate-900 rounded-2xl border border-indigo-500/40 shadow-inner">
                    <span className="text-2xl md:text-3xl font-mono font-extrabold text-indigo-300">
                      {(labCounterIon === 'K' || labCounterIon === 'Na') && `${labCounterIon}${labCounterCount > 1 ? labCounterCount : ''}`}
                      [{labMetal}({labLigand1}){labCount1 > 1 ? labCount1 : ''}({labLigand2}){labCount2 > 1 ? labCount2 : ''}]
                      {(labCounterIon === 'Cl' || labCounterIon === 'Br') && `${labCounterIon}${labCounterCount > 1 ? labCounterCount : ''}`}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-left pt-2">
                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block">Coordination Number (CN)</span>
                      <span className="text-xl font-bold text-emerald-400 font-mono">
                        {labCoordinationNum}
                      </span>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block">Central Metal Oxidation State</span>
                      <span className="text-xl font-bold text-amber-400 font-mono">
                        +{calcLabOxidation()}
                      </span>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block">Complex Type</span>
                      <span className="text-sm font-bold text-indigo-300">
                        {labCount2 > 0 ? 'Heteroleptic' : 'Homoleptic'}
                      </span>
                    </div>

                    <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                      <span className="text-xs text-slate-400 block">Expected Polyhedron</span>
                      <span className="text-sm font-bold text-cyan-300">
                        {labCoordinationNum === 6 ? 'Octahedral' : labCoordinationNum === 4 ? 'Tetrahedral / Sq. Planar' : 'Custom Geometry'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-4 p-3 bg-indigo-950/40 rounded-xl border border-indigo-800/50 text-xs text-indigo-200 text-left">
                  💡 <strong>CBSE Formula Tip:</strong> Central metal is written first inside square brackets <code className="text-white">[M...]</code>, followed by ligands arranged in alphabetical order by their ligand names.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: ADAPTIVE CBSE CHALLENGE ARENA */}
        {activeTab === 'challenge' && (
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b border-slate-700 pb-4 gap-2">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  Question {challengeIdx + 1} of {CHALLENGES.length} • Difficulty: {CHALLENGES[challengeIdx].difficulty}
                </span>
                <h2 className="text-xl font-bold text-white">
                  {CHALLENGES[challengeIdx].title}
                </h2>
                <span className="text-xs text-slate-400">
                  Node: <code className="text-indigo-300">{CHALLENGES[challengeIdx].nodeId}</code>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    audioManager.play('hint');
                    setShowHint(!showHint);
                  }}
                  className="px-3 py-1.5 bg-amber-500/20 text-amber-300 border border-amber-500/40 rounded-lg text-xs font-semibold hover:bg-amber-500/30"
                >
                  💡 Need Hint?
                </button>
              </div>
            </div>

      <HintBubble show={showHint} text={CHALLENGES[challengeIdx].hint} />

            {/* Question Card */}
            <div className="my-6 space-y-4">
              <p className="text-base text-slate-100 font-medium leading-relaxed bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                {CHALLENGES[challengeIdx].question}
              </p>

              {/* Options */}
              <div className="grid grid-cols-1 gap-3">
                {CHALLENGES[challengeIdx].options.map((opt, idx) => {
                  let btnStyle = 'bg-slate-900 border-slate-700 hover:border-indigo-500 text-slate-200';
                  if (isSubmitted) {
                    if (idx === CHALLENGES[challengeIdx].correctIndex) {
                      btnStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-rose-950/80 border-rose-500 text-rose-200';
                    }
                  } else if (selectedOption === idx) {
                    btnStyle = 'bg-indigo-950/80 border-indigo-500 text-indigo-200';
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => !isSubmitted && setSelectedOption(idx)}
                      className={`text-left p-4 rounded-xl border transition-all flex items-start gap-3 text-sm ${btnStyle}`}
                    >
                      <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-600 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Submit / Next Controls */}
            <div className="flex items-center justify-between border-t border-slate-700 pt-4">
              {isSubmitted && (
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 max-w-xl text-xs text-slate-300">
                  <strong className="text-indigo-300 block mb-1">CBSE Concept Explanation:</strong>
                  {CHALLENGES[challengeIdx].explanation}
                </div>
              )}

              <div className="flex gap-3 ml-auto">
                {!isSubmitted ? (
                  <button
                    disabled={selectedOption === null}
                    onClick={() => handleAnswerSubmit(selectedOption!)}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white font-bold text-sm shadow-lg disabled:opacity-40"
                  >
                    Check Answer
                  </button>
                ) : (
                  <button
                    onClick={nextChallenge}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm shadow-lg flex items-center gap-2"
                  >
                    <span>{challengeIdx < CHALLENGES.length - 1 ? 'Next Question →' : 'Finish Challenge'}</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Misconception Summary Checklist */}
      <div className="text-left space-y-3 pt-4 border-t border-slate-800">
        <h3 className="text-sm font-bold text-amber-300">Common Board Exam Misconception Checklist:</h3>
        <div className="grid grid-cols-1 gap-2">
          {MISCONCEPTIONS.map((m) => (
            <div key={m.id} className="bg-slate-950 border border-slate-800 p-3 rounded-lg text-xs space-y-1">
              <div className="font-bold text-rose-400">{m.title}</div>
              <div className="text-slate-400">{m.description}</div>
              <div className="text-emerald-300 font-medium">✓ Correction: {m.correction}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}