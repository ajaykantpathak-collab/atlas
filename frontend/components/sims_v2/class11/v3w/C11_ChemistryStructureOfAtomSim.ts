import type { SimDef } from '../../engine/types';
import C11_ChemistryStructureOfAtomSim from '../../../simulations/c6_12/C11_ChemistryStructureOfAtomSim';

/** v3 wrapped master — C11_ChemistryStructureOfAtomSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistrystructureofatomsim: SimDef = {
    id: 'v3w_c11_chemistrystructureofatomsim',
    title: 'Covalent Bond: Lewis Structures',
    subtitle: 'This node covers the step‑by‑step procedure for drawing Lewis structures, application of.',
    classLevel: 11, subject: 'chemistry', topic: 'Covalent Bond: Lewis Structures',
    chapters: [],
    nodeIds: ['c11_chem_cbse_04_003', 'c11_chem_cbse_04_004', 'c11_chem_cbse_04_005', 'c11_chem_cbse_04_010', 'c11_chem_cbse_04_011', 'c11_chem_cbse_04_012', 'c11_chem_cbse_02_003', 'c11_chem_cbse_02_009', 'c11_chem_cbse_06_006', 'c11_chem_cbse_04_001', 'c11_chem_cbse_03_001', 'c11_chem_cbse_03_002', 'c11_chem_cbse_03_003', 'c11_chem_cbse_03_013', 'c11_chem_cbse_04_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe a glass of water (H2O) – it’s a liquid at room temperature, yet its molecule is tiny.', goal: 'Master Covalent Bond: Lewis Structures.' },
    discovery: {
        question: 'Explain why the bond angle in NH₃ (107°) is smaller than the ideal tetrahedral angle (109.5°) but larger than the H–O–H angle in H₂O (104.5°).',
        options: ['NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)', 'both have one lone pair', 'electronegativity difference'],
        answer: 'NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)',
        hook: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of.',
    },
    teaching: [
        { title: 'A Lewis structure is a diagrammatic.', text: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that shows the arrangement of valence electrons as bonding pairs (shared between atoms) and lone pairs (localized on.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_003', title: 'A Lewis structure is a diagrammatic.',
          scaffold: { problem: 'Draw the Lewis structure of carbon dioxide (CO2). Include all steps and verify formal charges.',
            steps: [
            { text: 'Count valence electrons. C (Group 14) = 4; O (Group 16) = 6 each. Total = 4 + 2×6 = 16 electrons.' },
            { text: 'Determine skeletal structure. Carbon is less electronegative than oxygen → central atom. Skeleton: O‑C‑O.' },
            { text: 'Place single bonds. Two C‑O single bonds use 4 electrons. Remaining = 12 electrons.' },
            { text: 'Complete octets on terminal oxygens. Each O needs 6 more electrons (3 lone pairs). 2×6 = 12 electrons placed.' },
            { text: 'Check central atom octet. Carbon has only 4 electrons (two single bonds). Not an octet.' },
            { text: 'Form multiple bonds. Move one lone pair from each oxygen to form a double bond with carbon.' },
            { text: 'Calculate formal charges. FC(C) = 4 – 0 – ½(8) = 0. FC(O) = 6 – 4 – ½(4) = 0. All zero → optimal structure.', faded: true, blankAnswer: 'O=C=O with two lone pairs on each oxygen. All formal.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_004', title: 'Formal charge is the hypothetical.',
          scaffold: { problem: 'Calculate the formal charge on each atom in the carbon monoxide molecule (CO).',
            steps: [
            { text: 'Identify the valence electrons for each atom. Carbon (Group 14) has 4 valence electrons.' },
            { text: 'From the Lewis structure :C≡O:, count non-bonding electrons on each atom.' },
            { text: 'Count bonding electrons. The triple bond consists of 3 shared pairs → 6 bonding electrons for each atom (each atom.' },
            { text: 'Apply the formal charge formula FC = V – N – ½B. For C: FC = 4 – 2 – ½(6) = 4 – 2 – 3 = –1.' },
            { text: 'Verify the sum of formal charges equals the overall charge of the neutral molecule: –1 + (+1) = 0.', faded: true, blankAnswer: 'FC(C) = –1, FC(O) = +1. Sum = 0. The formal charge.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_005', title: 'VSEPR (Valence Shell Electron Pair.',
          scaffold: { problem: 'Predict the molecular geometry, electron-pair geometry, and approximate bond angles for the chlorate ion, ClO₃⁻.',
            steps: [
            { text: 'Count total valence electrons = 7 (Cl) + 3×6 (O) + 1 (negative charge) = 26 electrons.' },
            { text: 'Draw Lewis structure: Cl central, three Cl–O single bonds use 6 electrons; complete octets on terminal O atoms (3×6 =.' },
            { text: 'Minimize formal charges by forming one Cl=O double bond: move a lone pair from one O to form π bond.' },
            { text: 'Form second Cl=O double bond: Cl FC = 7 – 0 – ½(10) = 0; two double-bonded O FC = 0; one single-bonded O FC = –1.' },
            { text: 'Steric number = 4 → electron-pair geometry = tetrahedral. Molecular geometry = trigonal pyramidal (one vertex occupied.' },
            { text: 'Ideal tetrahedral angle 109.5°; lone pair–bond pair repulsion compresses O–Cl–O angles to ≈ 106–107° (experimental.', faded: true, blankAnswer: 'Electron-pair geometry: tetrahedral; Molecular geometry:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_010', title: 'Hydrogen bonding is a special type of.',
          scaffold: { problem: 'A student measures the boiling points of four compounds: ethanol (C₂H₅OH, 78 °C), dimethyl ether (CH₃OCH₃, –24 °C), propane (C₃H₈, –42 °C),.',
            steps: [
            { text: 'Identify the molecular formula and molar mass of each compound.' },
            { text: 'Draw Lewis structures and identify H-bond donor sites (H attached to N, O, F) and acceptor sites (lone pairs on N, O,.' },
            { text: 'Classify intermolecular forces for each. Ethanol: strong intermolecular H-bonding (donor + acceptor) + London forces.' },
            { text: 'Rank expected boiling point order based on force strength. H-bonding > dipole-dipole > London forces.' },
            { text: 'Compare with experimental data. Ethanol 78 °C (H-bonding network).' },
            { text: 'Conclude that the presence of an H-bond donor (O–H) is the decisive factor; mere presence of O or F as acceptor is.', faded: true, blankAnswer: 'Ethanol\'s high boiling point (78 °C) is due to extensive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_011', title: 'Resonance structures are multiple valid.',
          scaffold: { problem: 'Draw all resonance structures for the nitrite ion (NO₂⁻). Calculate formal charges on each atom in each structure.',
            steps: [
            { text: 'Count valence electrons. N (Group 15) = 5, each O = 6, plus 1 for negative charge. Total = 5 + 12 + 1 = 18 electrons.' },
            { text: 'Draw skeletal structure with N central (less electronegative).' },
            { text: 'Check octets. Terminal O atoms have octets (2 bonding + 6 lone). N has only 6 electrons (2 bonds + 1 lone pair).' },
            { text: 'Generate equivalent Structure II by moving the double bond to the other O: ⁻O–N=O.' },
            { text: 'Calculate formal charges for Structure I: FC(N) = 5 – 2 – ½(6) = 0; FC(double-bonded O) = 6 – 4 – ½(4) = 0;.' },
            { text: 'Bond order = (2 + 1)/2 = 1.5 for each N–O bond. Both bonds equivalent in hybrid.', faded: true, blankAnswer: 'Two equivalent canonical structures: O=N–O⁻ ↔ ⁻O–N=O..' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_012', title: 'The dipole moment (μ) of a polar.',
          scaffold: { problem: 'Calculate the net dipole moment of H₂O given that each O−H bond dipole moment is 1.51 D and the H−O−H bond angle is 104.5°.',
            steps: [
            { text: 'Identify the geometry — H₂O is bent (VSEPR: 2 bond pairs + 2 lone pairs → tetrahedral electron geometry, bent molecular.' },
            { text: 'Set up vector addition — place the molecule in the xy-plane with the bisector of the H−O−H angle along the +x axis.' },
            { text: 'Resolve each bond dipole into x and y components. For the upper O−H bond: μ_x = μ_OH cos(52.25°), μ_y = μ_OH.' },
            { text: 'Sum components — μ_net,x = 2 × 1.51 × cos(52.25°) = 2 × 1.51 × 0.611 = 1.845 D; μ_net,y = 1.51 × sin(52.25°) − 1.51 ×.' },
            { text: 'Net dipole moment magnitude μ_net = √(μ_net,x² + μ_net,y²) = 1.845 D ≈ 1.85 D.' },
            { text: 'Convert to SI: μ_net = 1.845 D × 3.336 × 10⁻³⁰ C·m/D = 6.155 × 10⁻³⁰ C·m.', faded: true, blankAnswer: 'μ_net = 1.85 D = 6.16 × 10⁻³⁰ C·m, directed along the.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_04_004', title: 'Identify each idea',
          dissect: { specimen: 'Covalent Bond: Lewis Structures', spots: [
            { id: 's1', label: 'A Lewis structure is a', prompt: 'Which idea is this? — A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that.', answer: 'A Lewis structure is a', options: ['A Lewis structure is a', 'Formal charge is the hypothetical', 'VSEPR Valence Shell Electron Pair', 'Hydrogen bonding is a special'] },
            { id: 's2', label: 'Formal charge is the hypothetical', prompt: 'Which idea is this? — Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,.', answer: 'Formal charge is the hypothetical', options: ['Formal charge is the hypothetical', 'A Lewis structure is a', 'VSEPR Valence Shell Electron Pair', 'Hydrogen bonding is a special'] },
            { id: 's3', label: 'VSEPR Valence Shell Electron Pair', prompt: 'Which idea is this? — VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional.', answer: 'VSEPR Valence Shell Electron Pair', options: ['VSEPR Valence Shell Electron Pair', 'A Lewis structure is a', 'Formal charge is the hypothetical', 'Hydrogen bonding is a special'] },
            { id: 's4', label: 'Hydrogen bonding is a special', prompt: 'Which idea is this? — Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a.', answer: 'Hydrogen bonding is a special', options: ['Hydrogen bonding is a special', 'A Lewis structure is a', 'Formal charge is the hypothetical', 'VSEPR Valence Shell Electron Pair'] },
            { id: 's5', label: 'Resonance structures are multiple valid', prompt: 'Which idea is this? — Resonance structures are multiple valid Lewis structures for a molecule or polyatomic ion.', answer: 'Resonance structures are multiple valid', options: ['Resonance structures are multiple valid', 'A Lewis structure is a', 'Formal charge is the hypothetical', 'VSEPR Valence Shell Electron Pair'] },
            { id: 's6', label: 'The dipole moment of', prompt: 'Which idea is this? — The dipole moment (μ) of a polar covalent bond is the product of the magnitude of the.', answer: 'The dipole moment of', options: ['The dipole moment of', 'A Lewis structure is a', 'Formal charge is the hypothetical', 'VSEPR Valence Shell Electron Pair'] }
          ] } }
    ],
    explore: { component: C11_ChemistryStructureOfAtomSim, prompt: 'Explore the interactive — Covalent Bond: Lewis Structures' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_003', difficulty: 'standard',
          question: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic.',
          hint: 'Revisit the Kossel‑Lewis approach (c11_chem_cbse_04_001) and the electron distribution in.',
          misconception: 'Students often think the central atom is always the one with the lowest electronegativity, but they forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that',
                  options: ['A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,', 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the central atom is always the one with the lowest electronegativity, but they forget that hydrogen is never a central.' }
          ],
            remediations: { 'the-central-atom-is-always': { steps: ['If a student consistently miscounts valence electrons for ions, have them practice a three‑step drill: (1) write the.', 'Then draw Lewis structures for a series: CH4, NH3, H2O, NH4+, OH‑.', 'Use colour‑coded pens: one colour for neutral atom electrons, another for added/removed electrons.', 'This visual separation reinforces the charge adjustment step.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_004', difficulty: 'standard',
          question: 'Formal charge is the hypothetical charge assigned to an atom in a Lewis.',
          hint: 'If stuck, revisit the step-by-step procedure for writing Lewis structures (node.',
          misconception: 'Students often treat formal charge as the actual charge on an atom (like oxidation state) and believe it represents.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,',
                  options: ['Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional', 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat formal charge as the actual charge on an atom (like oxidation state) and believe it represents real electron density.' }
          ],
            remediations: { 'students-often-treat-formal-charge': { steps: ['If a student confuses formal charge with oxidation state: (1) Have them calculate both for a simple molecule like HCl.', 'Oxidation state: H = +1, Cl = –1.', 'Formal charge: H = 1 – 0 – ½(2) = 0, Cl = 7 – 6 – ½(2) = 0.', '(2) For the ½-factor error: give a molecule with a double bond (e.g., CO₂).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_005', difficulty: 'standard',
          question: 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the.',
          hint: 'If stuck, revisit c11_chem_cbse_04_003 (Lewis structures) and c11_chem_cbse_04_004.',
          misconception: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of.',
          parts: [
                { id: 'a', prompt: 'Explain why the bond angle in NH₃ (107°) is smaller than the ideal tetrahedral angle (109.5°) but larger than the H–O–H angle in H₂O (104.5°).', answer: 'NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)',
                  options: ['NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)', 'both have one lone pair', 'electronegativity difference'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of 2) and/or place lone.' }
          ],
            remediations: { 'students-treat-double-triple-bonds': { steps: ['If a student miscounts domains or misplaces lone pairs: (1) Have them re-draw the Lewis structure showing ALL valence.', '(2) Circle each bonding pair and lone pair on the central atom with different colors.', '(3) Count circles → steric number.', '(4) Use a 3D model kit or ball-and-stick simulation: place 5 balloons (3 equatorial, 2 axial) on a central sphere;.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In PF₅, all P–F bond lengths are equal because the molecule is trigonal bipyramidal." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'trigonal bipyramidal'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of 2) and/or place lone.' }
          ],
            remediations: { 'students-treat-double-triple-bonds': { steps: ['If a student miscounts domains or misplaces lone pairs: (1) Have them re-draw the Lewis structure showing ALL valence.', '(2) Circle each bonding pair and lone pair on the central atom with different colors.', '(3) Count circles → steric number.', '(4) Use a 3D model kit or ball-and-stick simulation: place 5 balloons (3 equatorial, 2 axial) on a central sphere;.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_010', difficulty: 'standard',
          question: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs.',
          hint: 'If stuck, revisit c11_chem_cbse_04_012 (Polarity of Bonds: Dipole Moment) to review.',
          misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**:.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a',
                  options: ['Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,', 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**: Only H bonded to N, O,.' }
          ],
            remediations: { 'misconception-1-any-polar-bond': { steps: ['If the student cannot distinguish intra- vs intermolecular H-bonding or misidentifies H-bond donors/acceptors: **Step.', '**Step 2**: Draw Lewis structures of H₂O, HF, NH₃, CH₃OH, CH₃F, CH₃SH, o-nitrophenol.', 'Circle every H atom attached to N, O, F — these are donors.', 'Circle every lone pair on N, O, F — these are acceptors.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_010', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**:.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Intramolecular hydrogen bonding increases the boiling point of a compound because it adds extra attractive forces within the molecule.".', answer: 'The statement is FALSE',
                  options: ['The statement is FALSE', 'more H-bonds = higher boiling point'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**: Only H bonded to N, O,.' }
          ],
            remediations: { 'misconception-1-any-polar-bond': { steps: ['If the student cannot distinguish intra- vs intermolecular H-bonding or misidentifies H-bond donors/acceptors: **Step.', '**Step 2**: Draw Lewis structures of H₂O, HF, NH₃, CH₃OH, CH₃F, CH₃SH, o-nitrophenol.', 'Circle every H atom attached to N, O, F — these are donors.', 'Circle every lone pair on N, O, F — these are acceptors.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_011', difficulty: 'standard',
          question: 'Resonance structures are multiple valid Lewis structures for a molecule or.',
          hint: 'Revisit Lewis structure steps (c11_chem_cbse_04_003) and formal charge formula.',
          misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a.',
          parts: [
                { id: 'a', prompt: 'The experimentally determined O–O bond length in ozone (O₃) is 128 pm. A typical O–O single bond is 148 pm and O=O double bond is 121 pm.', answer: 'Ozone has two major canonical forms: O=O–O ↔ O–O=O',
                  options: ['Ozone has two major canonical forms: O=O–O ↔ O–O=O', 'bond order is 1 or 2', 'correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a tautomeric.' },
                { id: 'b', prompt: 'Draw all three canonical resonance structures for the carbonate ion (CO₃²⁻). Calculate the formal charge on each atom in one structure.', answer: 'Step 1: Central C, three terminal O atoms',
                  options: ['Step 1: Central C, three terminal O atoms', 'resonates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a tautomeric.' }
          ],
            remediations: { 'resonance-means-the-molecule-resonates': { steps: ['Use physical ball-and-stick models: build one structure for ethene (fixed double bond) and a "hybrid" model for benzene.', 'Practice drawing canonical forms side-by-side, circling only the electrons that move (π-bonds and lone pairs) while.', 'Calculate formal charges for every atom in every canonical form – this forces attention to electron redistribution, not.', 'Watch animation of electron density in ozone/carbonate showing continuous cloud, not flipping bonds.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a.',
          parts: [
                { id: 'a', prompt: 'Two students propose canonical forms for the nitrite ion (NO₂⁻): Student A: O=N–O⁻ (with lone pairs) Student B: ⁻O–N≡O⁺ Evaluate which structure contributes.', answer: 'Structure A: FC(N) = 5 – 2 – ½(6) = 0',
                  options: ['Structure A: FC(N) = 5 – 2 – ½(6) = 0', 'resonates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a tautomeric.' },
                { id: 'b', prompt: 'Design a simple experiment or observation that could distinguish between a molecule with localized double bonds (like ethene) and one with.', answer: 'Good answer: Measure C–C bond lengths via X-ray diffraction',
                  options: ['Good answer: Measure C–C bond lengths via X-ray diffraction', 'resonates'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a tautomeric.' }
          ],
            remediations: { 'resonance-means-the-molecule-resonates': { steps: ['Use physical ball-and-stick models: build one structure for ethene (fixed double bond) and a "hybrid" model for benzene.', 'Practice drawing canonical forms side-by-side, circling only the electrons that move (π-bonds and lone pairs) while.', 'Calculate formal charges for every atom in every canonical form – this forces attention to electron redistribution, not.', 'Watch animation of electron density in ozone/carbonate showing continuous cloud, not flipping bonds.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_012', difficulty: 'standard',
          question: 'The dipole moment (μ) of a polar covalent bond is the product of the magnitude.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR theory) for geometry and.',
          misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have.',
          parts: [
                { id: 'a', prompt: 'Define dipole moment and state its SI unit. Why is the crossed arrow representation used in chemistry instead of the conventional vector arrow?', answer: 'Dipole moment (μ) = charge (q) × distance of separation (r)',
                  options: ['Dipole moment (μ) = charge (q) × distance of separation (r)', 'polar bonds always make a polar molecule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' },
                { id: 'b', prompt: 'Explain why CO₂ has zero net dipole moment while H₂O has a net dipole moment of 1.85 D, even though both contain polar bonds.', answer: 'CO₂ is linear (O=C=O, 180°)',
                  options: ['CO₂ is linear (O=C=O, 180°)', 'CO₂ has no polar bonds', 'H₂O is linear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' },
                { id: 'c', prompt: 'The bond dipole moment of H−F is 1.91 D and the H−F bond length is 92 pm. Calculate the partial charge (δ) on each atom in units of elementary charge (e).', answer: 'μ = 1.91 D = 1.91 × 3.336 × 10⁻³⁰ = 6.372 × 10⁻³⁰ C·m',
                  options: ['μ = 1.91 D = 1.91 × 3.336 × 10⁻³⁰ = 6.372 × 10⁻³⁰ C·m', 'polar bonds always make a polar molecule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' }
          ],
            remediations: { 'polar-bonds-always-make-a': { steps: ['If a student cannot predict molecular polarity from geometry: (1) Review VSEPR shapes (c11_chem_cbse_04_005) — draw the.', '(2) Draw each bond dipole as an arrow on the central atom.', '(3) Resolve each dipole into x, y, z components using trigonometry (c10_math_cbse_08_001).', '(4) Sum components; if all sums are zero, μ_net = 0.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_012', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have.',
          parts: [
                { id: 'a', prompt: 'A student claims: "BF₃ has polar B−F bonds, so it must have a net dipole moment." Evaluate this statement and correct the error.', answer: 'The statement is false',
                  options: ['The statement is false', 'polar bonds always make a polar molecule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' },
                { id: 'b', prompt: 'Design a simple experiment using household items to demonstrate that water is a polar molecule but carbon tetrachloride (CCl₄) is non-polar.', answer: 'Charge a plastic ruler by rubbing with wool',
                  options: ['Charge a plastic ruler by rubbing with wool', 'polar bonds always make a polar molecule'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' }
          ],
            remediations: { 'polar-bonds-always-make-a': { steps: ['If a student cannot predict molecular polarity from geometry: (1) Review VSEPR shapes (c11_chem_cbse_04_005) — draw the.', '(2) Draw each bond dipole as an arrow on the central atom.', '(3) Resolve each dipole into x, y, z components using trigonometry (c10_math_cbse_08_001).', '(4) Sum components; if all sums are zero, μ_net = 0.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
