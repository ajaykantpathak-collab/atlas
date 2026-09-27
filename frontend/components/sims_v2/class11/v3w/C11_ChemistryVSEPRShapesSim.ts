import type { SimDef } from '../../engine/types';
import C11_ChemistryVSEPRShapesSim from '../../../simulations/three/C11_ChemistryVSEPRShapesSim';

/** v3 wrapped master — C11_ChemistryVSEPRShapesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryvseprshapessim: SimDef = {
    id: 'v3w_c11_chemistryvseprshapessim',
    title: 'VSEPRShapes',
    subtitle: 'Covers Kossel-Lewis theory, Lewis symbols, octet rule, covalent bond formation.',
    classLevel: 11, subject: 'chemistry', topic: 'Kossel-Lewis Approach to Chemical Bonding',
    chapters: [],
    nodeIds: ['c11_chem_cbse_04_001', 'c11_chem_cbse_04_003', 'c11_chem_cbse_04_005', 'c11_chem_cbse_04_012', 'c11_chem_cbse_04_007', 'c11_chem_cbse_10_001', 'c11_chem_cbse_09_007', 'c11_chem_cbse_02_014'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Observe how table salt (NaCl) dissolves in water to conduct electricity, while sugar (C₁₂H₂₂O₁₁) dissolves.', goal: 'Master VSEPRShapes.' },
    discovery: {
        question: 'Explain why the bond angle in NH₃ (107°) is smaller than the ideal tetrahedral angle (109.5°) but larger than the H–O–H angle in H₂O (104.5°).',
        options: ['NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)', 'both have one lone pair', 'electronegativity difference'],
        answer: 'NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)',
        hook: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of.',
    },
    teaching: [
        { title: 'The Kossel-Lewis approach explains chemical.', text: 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing to achieve stable noble gas configurations (octet/duplet), where Lewis symbols represent valence electrons as.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_001', title: 'The Kossel-Lewis approach explains.',
          scaffold: { problem: 'Draw the Lewis structure of the carbonate ion (CO₃²⁻) and calculate formal charges on all atoms.',
            steps: [
            { text: 'Count total valence electrons: C (Group 14) = 4, O (Group 16) = 6 each × 3 = 18, plus 2 for 2- charge = 24 valence.' },
            { text: 'Determine skeleton: Carbon is least electronegative (central), three O atoms terminal.' },
            { text: 'Distribute electrons: 3 single bonds use 6 electrons. Remaining 18 electrons placed as lone pairs on terminal O atoms.' },
            { text: 'Check octets: Each O has 2 bonding + 6 non-bonding = 8 electrons (octet satisfied).' },
            { text: 'Form multiple bond: Move one lone pair from an O to form C=O double bond. Now carbon has 4 bonding pairs = 8 electrons.' },
            { text: 'Calculate formal charges: For double-bonded O: FC = 6 - 4 - ½(4) = 0. For each single-bonded O: FC = 6 - 6 - ½(2) = -1.', faded: true, blankAnswer: 'Lewis structure shows carbon central with one C=O double.' }
            ] } },
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
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_007', title: 'Hybridisation is the concept of mixing.',
          scaffold: { problem: 'In the industrial production of acrylonitrile (CH₂=CH–CN), a key intermediate is the vinyl radical (•CH=CH₂).',
            steps: [
            { text: 'Draw the Lewis structure of the vinyl radical. Carbon 1 (CH) has one H, one C (double bond), and one unpaired electron.' },
            { text: 'Count steric number for each carbon. For C1: three electron domains (one σ to H, one σ to C2, one unpaired electron in.' },
            { text: 'Assign hybridisation. SN=3 → sp² for both carbons. Each carbon has three sp² hybrids and one unhybridised p orbital.' },
            { text: 'Describe sigma framework. C1 uses two sp² hybrids for C1–H and C1–C2 σ bonds; the third sp² hybrid holds the unpaired.' },
            { text: 'Describe pi bond. The unhybridised p orbitals on C1 and C2 overlap sidewise to form the π bond of the double bond.' },
            { text: 'Predict geometry. Both carbons are trigonal planar (~120°). The unpaired electron on C1 resides in an sp² hybrid.' },
            { text: 'Verify with experimental data. ESR spectroscopy of vinyl radical shows the unpaired electron has ~33% s-character,.', faded: true, blankAnswer: 'Both carbons are sp² hybridised. Geometry: trigonal planar.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_10_001', title: 'Organic compounds are covalent.',
          scaffold: { problem: 'A hydrocarbon with molecular formula C₅H₁₀ decolourises bromine water and gives a positive Baeyer\'s test.',
            steps: [
            { text: 'Analyse molecular formula C₅H₁₀. For acyclic alkane: C₅H₁₂. DoU = (2×5 + 2 - 10)/2 = 1.' },
            { text: 'Positive Br₂ water and Baeyer\'s test → unsaturation is a carbon–carbon double bond (alkene), not a ring (cycloalkanes.' },
            { text: 'No geometrical isomerism → the double bond must be terminal (C=C at end) or symmetrically substituted.' },
            { text: 'Draw bond-line for pent-1-ene: 5-carbon zigzag with double bond between C-1 and C-2 (shown as two parallel lines.' },
            { text: 'Hybridisation: C-1 (sp²), C-2 (sp²), C-3 (sp³), C-4 (sp³), C-5 (sp³). Class: Acyclic aliphatic alkene.', faded: true, blankAnswer: 'Bond-line: =CH–CH₂–CH₂–CH₂–CH₃ (zigzag with double bond at.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_04_003', title: 'Identify each idea',
          dissect: { specimen: 'VSEPRShapes', spots: [
            { id: 's1', label: 'The Kossel-Lewis approach explains chemical', prompt: 'Which idea is this? — The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing.', answer: 'The Kossel-Lewis approach explains chemical', options: ['The Kossel-Lewis approach explains chemical', 'A Lewis structure is a', 'VSEPR Valence Shell Electron Pair', 'The dipole moment of'] },
            { id: 's2', label: 'A Lewis structure is a', prompt: 'Which idea is this? — A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that.', answer: 'A Lewis structure is a', options: ['A Lewis structure is a', 'The Kossel-Lewis approach explains chemical', 'VSEPR Valence Shell Electron Pair', 'The dipole moment of'] },
            { id: 's3', label: 'VSEPR Valence Shell Electron Pair', prompt: 'Which idea is this? — VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional.', answer: 'VSEPR Valence Shell Electron Pair', options: ['VSEPR Valence Shell Electron Pair', 'The Kossel-Lewis approach explains chemical', 'A Lewis structure is a', 'The dipole moment of'] },
            { id: 's4', label: 'The dipole moment of', prompt: 'Which idea is this? — The dipole moment (μ) of a polar covalent bond is the product of the magnitude of the.', answer: 'The dipole moment of', options: ['The dipole moment of', 'The Kossel-Lewis approach explains chemical', 'A Lewis structure is a', 'VSEPR Valence Shell Electron Pair'] },
            { id: 's5', label: 'Hybridisation is the concept of', prompt: 'Which idea is this? — Hybridisation is the concept of mixing atomic orbitals of slightly different energies on.', answer: 'Hybridisation is the concept of', options: ['Hybridisation is the concept of', 'The Kossel-Lewis approach explains chemical', 'A Lewis structure is a', 'VSEPR Valence Shell Electron Pair'] },
            { id: 's6', label: 'Organic compounds are covalent compounds', prompt: 'Which idea is this? — Organic compounds are covalent compounds of carbon (excluding oxides, carbonates,.', answer: 'Organic compounds are covalent compounds', options: ['Organic compounds are covalent compounds', 'The Kossel-Lewis approach explains chemical', 'A Lewis structure is a', 'VSEPR Valence Shell Electron Pair'] }
          ] } }
    ],
    explore: { component: C11_ChemistryVSEPRShapesSim, prompt: 'Explore the interactive — VSEPRShapes' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_001', difficulty: 'standard',
          question: 'The Kossel-Lewis approach explains chemical bonding through electron transfer.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells: 2n² Rule" and "Valency:.',
          misconception: 'Students treat the octet rule as absolute: they force octets on all atoms even when impossible (e.g., drawing 5 bonds.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing',
                  options: ['The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional', 'The dipole moment (μ) of a polar covalent bond is the product of the magnitude of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the octet rule as absolute: they force octets on all atoms even when impossible (e.g., drawing 5 bonds on nitrogen in NO₃⁻.' }
          ],
            remediations: { 'students-treat-the-octet-rule': { steps: ['List valence electrons for each atom using periodic table group number.', 'Determine if central atom is period 2 (max 8 e⁻) or period 3+ (can expand).', 'For odd total valence electrons, accept one atom will have 7 e⁻.', 'Draw skeleton, distribute electrons, check octets.', 'Calculate formal charges — if central atom has high formal charge (>±1), consider expanded octet (if period 3+) or.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_003', difficulty: 'standard',
          question: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic.',
          hint: 'Revisit the Kossel‑Lewis approach (c11_chem_cbse_04_001) and the electron distribution in.',
          misconception: 'Students often think the central atom is always the one with the lowest electronegativity, but they forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that',
                  options: ['A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the three-dimensional', 'The dipole moment (μ) of a polar covalent bond is the product of the magnitude of the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the central atom is always the one with the lowest electronegativity, but they forget that hydrogen is never a central.' }
          ],
            remediations: { 'the-central-atom-is-always': { steps: ['If a student consistently miscounts valence electrons for ions, have them practice a three‑step drill: (1) write the.', 'Then draw Lewis structures for a series: CH4, NH3, H2O, NH4+, OH‑.', 'Use colour‑coded pens: one colour for neutral atom electrons, another for added/removed electrons.', 'This visual separation reinforces the charge adjustment step.'] } } },
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
            remediations: { 'polar-bonds-always-make-a': { steps: ['If a student cannot predict molecular polarity from geometry: (1) Review VSEPR shapes (c11_chem_cbse_04_005) — draw the.', '(2) Draw each bond dipole as an arrow on the central atom.', '(3) Resolve each dipole into x, y, z components using trigonometry (c10_math_cbse_08_001).', '(4) Sum components; if all sums are zero, μ_net = 0.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_007', difficulty: 'standard',
          question: 'Hybridisation is the concept of mixing atomic orbitals of slightly different.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR) to practice assigning steric numbers and.',
          misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation,.',
          parts: [
                { id: 'a', prompt: 'Both NH₃ and H₂O have sp³ hybridised central atoms, yet the H–N–H bond angle (107°) is larger than the H–O–H bond angle (104.5°).', answer: 'NH₃ has one lone pair and three bond pairs',
                  options: ['NH₃ has one lone pair and three bond pairs', 'oxygen is more electronegative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation, and they confuse it.' }
          ],
            remediations: { 'hybridisation-is-a-real-physical': { steps: ['If a student cannot determine hybridisation from a Lewis structure: (1) Have them draw the Lewis structure with formal.', '(2) Count steric number = number of atoms bonded to central atom (sigma bonds) + number of lone pairs on central atom.', '(3) Map steric number to hybridisation: SN=2 → sp, SN=3 → sp², SN=4 → sp³.', '(4) Practice with ions: NO₃⁻ (SN=3, sp²), NH₄⁺ (SN=4, sp³), ClO₂⁻ (SN=4, sp³).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In the reaction BF₃ + NH₃ → F₃B←NH₃, the boron atom changes hybridisation from sp² to sp³, but the nitrogen atom remains sp³ hybridised.".', answer: 'The statement is correct',
                  options: ['The statement is correct', 'nitrogen becomes sp²'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation, and they confuse it.' }
          ],
            remediations: { 'hybridisation-is-a-real-physical': { steps: ['If a student cannot determine hybridisation from a Lewis structure: (1) Have them draw the Lewis structure with formal.', '(2) Count steric number = number of atoms bonded to central atom (sigma bonds) + number of lone pairs on central atom.', '(3) Map steric number to hybridisation: SN=2 → sp, SN=3 → sp², SN=4 → sp³.', '(4) Practice with ions: NO₃⁻ (SN=3, sp²), NH₄⁺ (SN=4, sp³), ClO₂⁻ (SN=4, sp³).'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_10_001', difficulty: 'standard',
          question: 'Organic compounds are covalent compounds of carbon (excluding oxides,.',
          hint: 'If stuck on hybridisation or shapes, revisit Class 11 Physics "Chemical Bonding and.',
          misconception: '**Misconception:** "In bond-line formulas, every vertex is a CH₂ group." **Exact error:** Students forget that.',
          parts: [
                { id: 'a', prompt: 'Explain why a carbon–carbon single bond (σ) allows free rotation but a carbon–carbon double bond (σ + π) restricts rotation.', answer: 'A σ bond has cylindrical symmetry along the internuclear axis',
                  options: ['A σ bond has cylindrical symmetry along the internuclear axis', 'double bonds are stronger so they don\'t rotate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "In bond-line formulas, every vertex is a CH₂ group." **Exact error:** Students forget that **terminal vertices are.' }
          ],
            remediations: { 'misconception-in-bond-line-formulas': { steps: ['**Remediation:** (1) Take a molecular model kit (or use clay/toothpicks).', 'Count H on each C: ends = 3, middles = 2.', '(2) Draw its bond-line formula side-by-side.', 'Label each vertex: "CH₃", "CH₂", "CH₂", "CH₃".'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
