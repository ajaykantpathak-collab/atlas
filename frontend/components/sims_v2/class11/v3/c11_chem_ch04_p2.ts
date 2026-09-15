import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch04_p2: SimDef = {
    id: 'v3_c11_chem_ch04_p2',
    title: 'Chemical Bonding and Molecular Structure · Part 2/2',
    subtitle: 'Weigh electron bookkeeping against lattice energy to explain why salt exists at all.',
    classLevel: 11, subject: 'chemistry', topic: 'Chemical Bonding and Molecular Structure · Part 2/2',
    chapters: ['c11_chem_ch04'],
    nodeIds: ['c11_chem_cbse_04_007', 'c11_chem_cbse_04_008', 'c11_chem_cbse_04_009', 'c11_chem_cbse_04_010', 'c11_chem_cbse_04_011', 'c11_chem_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an energeticist auditing why ionic crystals form', intro: 'Sodium and chlorine both \'want\' noble-gas shells — but the energy ledger is still in the red. Find who foots the bill.', goal: 'Apply Kossel-Lewis electron accounting and use Born-Haber energetics to explain ionic bond formation.' },
    discovery: {
        question: 'Making Na+ from Na costs +496 kJ/mol and making Cl- releases only -349 kJ/mol — the gas-phase ions are still +147 kJ/mol in the red, yet salt forms spontaneously. What pays the bill?',
        options: ['The huge lattice enthalpy released when gaseous ions pack into a crystal', 'The octet rule makes the energy debt disappear', 'Chlorine donates the missing energy back to sodium', 'Room temperature automatically supplies the deficit'],
        answer: 'The huge lattice enthalpy released when gaseous ions pack into a crystal',
        hook: 'Completing octets isn\'t what makes ionic solids stable — the pay-off is in the packing, about -788 kJ/mol for NaCl.',
    },
    teaching: [
        { title: 'Hybridisation: sp, sp2, sp3', text: 'Hybridisation is the concept of mixing atomic orbitals of slightly different energies on the same atom to form an equal number of new, degenerate hybrid orbitals with identical shapes and energies.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_04_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Build a Born-Haber energy ledger for NaCl and decide whether octet completion or lattice enthalpy really drives its formation.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_008', title: 'Molecular Orbital Theory: Bonding and Antibonding',
          scaffold: { problem: 'Using Molecular Orbital Theory, determine the bond order and magnetic nature of the superoxide ion O₂⁻.',
            steps: [
            { text: 'Identify total valence electrons. O has 6 valence electrons. O₂⁻ has 2×6 + 1 = 13 valence electrons.' },
            { text: 'Recall the MO energy ordering for O₂ and beyond (σ₂p_z below π₂p_x/π₂p_y).' },
            { text: 'Fill 13 electrons following Aufbau, Pauli, Hund: (σ₂s)² (σ*₂s)² (σ₂p_z)² (π₂p_x)² (π*₂p_y)² (π*₂p_x)¹.' },
            { text: 'Count bonding electrons: σ₂s (2), σ₂p_z (2), π₂p_x (2), π₂p_y (2) = 8.' },
            { text: 'Bond order = ½(8 - 5) = 1.5. One unpaired electron in π*₂p_y → paramagnetic.' },
            { text: 'For O₂²⁻ (14 valence electrons): filling adds one more electron to π*₂p_y → (π*₂p_x)² (π*₂p_y)².', faded: true, blankAnswer: 'O₂⁻ bond order = 1.5, paramagnetic; O₂²⁻ bond order = 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_009', title: 'Bond Order and Magnetic Properties',
          scaffold: { problem: 'Liquid oxygen is attracted to a magnet while liquid nitrogen is not.',
            steps: [
            { text: 'Determine total electrons. O₂ has 16 electrons (8+8); N₂ has 14 electrons (7+7).' },
            { text: 'Select correct MO energy diagram. For O₂ (Z=8), use O₂/F₂ ordering: σ1s < σ*1s < σ2s < σ*2s < σ2pz < π2px=π2py <.' },
            { text: 'Fill electrons. O₂: σ1s² σ*1s² σ2s² σ*2s² σ2pz² π2px² π2py² π*2px¹ π*2py¹. N₂: σ1s² σ*1s² σ2s² σ*2s² π2px² π2py² σ2pz².' },
            { text: 'Count bonding (Nb) and antibonding (Na) electrons (valence only, core cancels).' },
            { text: 'Interpret. O₂ has unpaired electrons in π* orbitals → attracted to magnetic field (paramagnetic).', faded: true, blankAnswer: 'O₂: Bond Order = 2, Paramagnetic (2 unpaired electrons).' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_04_010', title: 'Hydrogen Bonding: Intermolecular and Intramolecular',
          caseStudy: { intro: 'Observe that water boils at 100 °C while hydrogen sulfide (H₂S, molar mass 34 g mol⁻¹, similar to water\'s 18 g mol⁻¹) boils at –60 °C.',
            decisions: [{ prompt: 'Define hydrogen bonding and name the two types with one example each.', options: [
                { text: 'Hydrogen bonding is the electrostatic attraction between a hydrogen atom covalently', outcome: 'Hydrogen bonding is the electrostatic attraction between a hydrogen atom covalently bonded to.' },
                { text: 'without', outcome: 'Not quite — **Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen.', reveals: 'misconception-1-any-polar-bond' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_011', title: 'Resonance Structures',
          scaffold: { problem: 'Draw all resonance structures for the nitrite ion (NO₂⁻). Calculate formal charges on each atom in each structure.',
            steps: [
            { text: 'Count valence electrons. N (Group 15) = 5, each O = 6, plus 1 for negative charge. Total = 5 + 12 + 1 = 18 electrons.' },
            { text: 'Draw skeletal structure with N central (less electronegative).' },
            { text: 'Check octets. Terminal O atoms have octets (2 bonding + 6 lone). N has only 6 electrons (2 bonds + 1 lone pair).' },
            { text: 'Generate equivalent Structure II by moving the double bond to the other O: ⁻O–N=O.' },
            { text: 'Calculate formal charges for Structure I: FC(N) = 5 – 2 – ½(6) = 0; FC(double-bonded O) = 6 – 4 – ½(4) = 0.' },
            { text: 'Bond order = (2 + 1)/2 = 1.5 for each N–O bond. Both bonds equivalent in hybrid.', faded: true, blankAnswer: 'Two equivalent canonical structures: O=N–O⁻ ↔ ⁻O–N=O.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_012', title: 'Polarity of Bonds: Dipole Moment',
          scaffold: { problem: 'Calculate the net dipole moment of H₂O given that each O−H bond dipole moment is 1.51 D and the H−O−H bond angle is 104.5°.',
            steps: [
            { text: 'Identify the geometry — H₂O is bent (VSEPR: 2 bond pairs + 2 lone pairs → tetrahedral electron geometry, bent molecular.' },
            { text: 'Set up vector addition — place the molecule in the xy-plane with the bisector of the H−O−H angle along the +x axis.' },
            { text: 'Resolve each bond dipole into x and y components. For the upper O−H bond: μ_x = μ_OH cos(52.25°), μ_y = μ_OH.' },
            { text: 'Sum components — μ_net,x = 2 × 1.51 × cos(52.25°) = 2 × 1.51 × 0.611 = 1.845 D; μ_net,y = 1.51 × sin(52.25°) − 1.51.' },
            { text: 'Net dipole moment magnitude μ_net = √(μ_net,x² + μ_net,y²) = 1.845 D ≈ 1.85 D.' },
            { text: 'Convert to SI: μ_net = 1.845 D × 3.336 × 10⁻³⁰ C·m/D = 6.155 × 10⁻³⁰ C·m.', faded: true, blankAnswer: 'μ_net = 1.85 D = 6.16 × 10⁻³⁰ C·m, directed along the.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a peer-tutoring session you ask juniors to draw Lewis structures for BF3, NO2 and SF6. One junior forces five bonds onto nitrogen \'to complete its octet\', refuses SF6 entirely (\'sulphur can\'t have twelve electrons — octet rule!\'), and concludes BF3 must be wrongly described by chemists.',
            decisions: [{ prompt: 'How do you correct the session?', options: [
                { text: 'The octet rule is a guide with three known failure modes: incomplete octet (BF3 — boron stable at 6 e⁻), odd-electron species (NO2 — one atom keeps 7 e⁻), and expanded octet (SF6 — period-3+ atoms can exceed 8). Forcing octets everywhere produces impossible structures like pentavalent N.', outcome: 'Formal charge and total valence count pick the best Lewis structure; period-2 atoms are octet-bound, but the rule bends below and beyond.' },
                { text: 'The junior is right — the octet rule is a law of bonding; molecules that violate it can\'t exist.', outcome: 'BF3, NO and SF6 are shelf-stable chemicals; the \'rule\' describes common ground states, not a universal constraint on every atom.', reveals: 'octet-rule-is-absolute' },
                { text: 'Nitrogen CAN have five bonds — period-2 atoms expand octets just like sulphur.', outcome: 'Period-2 atoms lack accessible d-orbitals and physically cap at 8 e⁻; expansion is a period-3+ privilege — exactly backwards from the correction needed.', reveals: 'period2-expands-octet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'Ionic bonds aren\'t paid for by octets — they\'re paid for when countless ions snap into a lattice.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_007', difficulty: 'standard',
          question: 'Hybridisation is the concept of mixing atomic orbitals of slightly different.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR) to practice assigning steric numbers and.',
          misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation.',
          parts: [
                { id: 'a', prompt: 'Both NH₃ and H₂O have sp³ hybridised central atoms, yet the H–N–H bond angle (107°) is larger than the H–O–H bond angle (104.5°).', answer: 'NH₃ has one lone pair and three bond pairs',
                  options: ['NH₃ has one lone pair and three bond pairs', 'oxygen is more electronegative'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR) to practice assigning steric numbers and electron.',
                  misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation, and they confuse.' }
          ],
            remediations: { 'hybridisation-is-a-real-physical': { steps: ['If a student cannot determine hybridisation from a Lewis structure: (1) Have them draw the Lewis structure with formal.', '(2) Count steric number = number of atoms bonded to central atom (sigma bonds) + number of lone pairs on central atom.', '(3) Map steric number to hybridisation: SN=2 → sp, SN=3 → sp², SN=4 → sp³.', '(4) Practice with ions: NO₃⁻ (SN=3, sp²), NH₄⁺ (SN=4, sp³), ClO₂⁻ (SN=4, sp³).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In the reaction BF₃ + NH₃ → F₃B←NH₃, the boron atom changes hybridisation from sp² to sp³, but the nitrogen atom remains sp³ hybridised.".', answer: 'The statement is correct',
                  options: ['The statement is correct', 'nitrogen becomes sp²'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR) to practice assigning steric numbers and electron.',
                  misconception: 'Students often believe hybridisation is a real physical excitation of electrons that occurs *during* bond formation, and they confuse.' }
          ],
            remediations: { 'hybridisation-is-a-real-physical': { steps: ['If a student cannot determine hybridisation from a Lewis structure: (1) Have them draw the Lewis structure with formal.', '(2) Count steric number = number of atoms bonded to central atom (sigma bonds) + number of lone pairs on central atom.', '(3) Map steric number to hybridisation: SN=2 → sp, SN=3 → sp², SN=4 → sp³.', '(4) Practice with ions: NO₃⁻ (SN=3, sp²), NH₄⁺ (SN=4, sp³), ClO₂⁻ (SN=4, sp³).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_008', difficulty: 'standard',
          question: 'Molecular Orbital Theory describes covalent bonding as the combination.',
          hint: 'Revisit c11_chem_cbse_04_006 (Valence Bond Theory) for orbital overlap types and.',
          misconception: 'Students often believe that "antibonding orbitals are always higher in energy than all bonding orbitals" and thus fill.',
          parts: [
                { id: 'a', prompt: 'Write the molecular orbital electron configuration for N₂ and calculate its bond order. Predict its magnetic behaviour.', answer: 'N₂ (14 electrons): KK (σ₂s)² (σ*₂s)² (π₂p_x)² (π₂p_y)² (σ₂p_z)²',
                  options: ['N₂ (14 electrons): KK (σ₂s)² (σ*₂s)² (π₂p_x)² (π₂p_y)² (σ₂p_z)²', 'antibonding orbitals are always higher in energy than all bonding orbitals', 'node between nuclei', 'node at nucleus'],
                  hint: 'Revisit c11_chem_cbse_04_006 (Valence Bond Theory) for orbital overlap types and c9_chem_ch2_6 for.',
                  misconception: 'Students often believe that "antibonding orbitals are always higher in energy than all bonding orbitals" and thus fill σ*₂s before.' },
                { id: 'b', prompt: 'Compare the MO diagrams of O₂ and F₂. Why does O₂ have two unpaired electrons while F₂ has none, despite both using the same energy ordering?', answer: 'O₂ has 12 valence electrons → configuration:',
                  options: ['O₂ has 12 valence electrons → configuration:', 'F₂ has unpaired electrons', 'antibonding orbitals are always higher in energy than all bonding orbitals', 'node between nuclei'],
                  hint: 'Revisit c11_chem_cbse_04_006 (Valence Bond Theory) for orbital overlap types and c9_chem_ch2_6 for.',
                  misconception: 'Students often believe that "antibonding orbitals are always higher in energy than all bonding orbitals" and thus fill σ*₂s before.' }
          ],
            remediations: { 'antibonding-orbitals-are-always-higher': { steps: ['Draw two 1s orbitals on paper: shade one lobe positive, the other negative.', 'Show addition (same signs overlap) → increased density between nuclei → bonding.', 'Show subtraction (opposite signs overlap) → cancellation between nuclei → node → antibonding.', 'Use two coloured pens to sketch σ₂s, σ*₂s, σ₂p_z, π₂p_x, π₂p_y, π*₂p_x, π*₂p_y, σ*₂p_z for N₂ and O₂ side-by-side.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_009', difficulty: 'standard',
          question: 'Bond order is defined as half the difference between the number of electrons.',
          hint: 'If stuck, review c11_chem_cbse_04_008 (Molecular Orbital Theory) focusing on the two.',
          misconception: 'Students often write the MO configuration for O₂⁺ as σ1s² σ*1s² σ2s² σ*2s² σ2pz² π2px² π2py² π*2px¹ (removing electron.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Bond order is defined as half the difference between the number of electrons in bonding',
                  options: ['Bond order is defined as half the difference between the number of electrons in bonding', 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'An ionic bond is the electrostatic force of attraction between oppositely charged ions', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that'],
                  hint: 'If stuck, review c11_chem_cbse_04_008 (Molecular Orbital Theory) focusing on the two energy level.',
                  misconception: 'Students often write the MO configuration for O₂⁺ as σ1s² σ*1s² σ2s² σ*2s² σ2pz² π2px² π2py² π*2px¹ (removing electron from π*) instead.' }
          ],
            remediations: { 'students-often-write-the-mo': { steps: ['Have them draw the two MO energy diagrams side by side (O₂/F₂ vs B₂/C₂/N₂) on paper, labelling σ2pz and π2px/π2py.', 'Use the "cross-over" rule: for Z ≤ 7 (N), π2p < σ2p; for Z ≥ 8 (O), σ2p < π2p.', 'Practice writing configurations for O₂, O₂⁺, O₂⁻, O₂²⁻, N₂, N₂⁺, N₂⁻ sequentially, explicitly stating "HOMO is ___".', 'Verify each with bond order calculation and magnetic property prediction.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_010', difficulty: 'standard',
          question: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs.',
          hint: 'If stuck, revisit c11_chem_cbse_04_012 (Polarity of Bonds: Dipole Moment) to review.',
          misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a',
                  options: ['Hydrogen bonding is a special type of dipole-dipole interaction that occurs when a', 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'An ionic bond is the electrostatic force of attraction between oppositely charged ions', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_012 (Polarity of Bonds: Dipole Moment) to review.',
                  misconception: '**Misconception 1**: "Any polar bond involving hydrogen (e.g., H–Cl, H–S, H–Br) forms hydrogen bonds." **Reality**: Only H bonded to N,.' }
          ],
            remediations: { 'misconception-1-any-polar-bond': { steps: ['If the student cannot distinguish intra- vs intermolecular H-bonding or misidentifies H-bond donors/acceptors: **Step.', '**Step 2**: Draw Lewis structures of H₂O, HF, NH₃, CH₃OH, CH₃F, CH₃SH, o-nitrophenol.', 'Circle every H atom attached to N, O, F — these are donors.', 'Circle every lone pair on N, O, F — these are acceptors.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_011', difficulty: 'standard',
          question: 'Resonance structures are multiple valid Lewis structures for a molecule.',
          hint: 'Revisit Lewis structure steps (c11_chem_cbse_04_003) and formal charge formula.',
          misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like.',
          parts: [
                { id: 'a', prompt: 'The experimentally determined O–O bond length in ozone (O₃) is 128 pm. A typical O–O single bond is 148 pm and O=O double bond is 121 pm.', answer: 'Ozone has two major canonical forms: O=O–O ↔ O–O=O',
                  options: ['Ozone has two major canonical forms: O=O–O ↔ O–O=O', 'bond order is 1 or 2', 'correct', 'resonates'],
                  hint: 'Revisit Lewis structure steps (c11_chem_cbse_04_003) and formal charge formula.',
                  misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a tautomeric.' },
                { id: 'b', prompt: 'Draw all three canonical resonance structures for the carbonate ion (CO₃²⁻). Calculate the formal charge on each atom in one structure.', answer: 'Step 1: Central C, three terminal O atoms',
                  options: ['Step 1: Central C, three terminal O atoms', 'resonates'],
                  hint: 'Revisit Lewis structure steps (c11_chem_cbse_04_003) and formal charge formula.',
                  misconception: 'Students believe resonance means the molecule "resonates" or flips back and forth between canonical structures (like a tautomeric.' }
          ],
            remediations: { 'resonance-means-the-molecule-resonates': { steps: ['Use physical ball-and-stick models: build one structure for ethene (fixed double bond) and a "hybrid" model for benzene.', 'Practice drawing canonical forms side-by-side, circling only the electrons that move (π-bonds and lone pairs) while.', 'Calculate formal charges for every atom in every canonical form – this forces attention to electron redistribution, not.', 'Watch animation of electron density in ozone/carbonate showing continuous cloud, not flipping bonds.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_012', difficulty: 'standard',
          question: 'The dipole moment (μ) of a polar covalent bond is the product of the magnitude.',
          hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR theory) for geometry and.',
          misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have.',
          parts: [
                { id: 'a', prompt: 'Define dipole moment and state its SI unit. Why is the crossed arrow representation used in chemistry instead of the conventional vector arrow?', answer: 'Dipole moment (μ) = charge (q) × distance of separation (r)',
                  options: ['Dipole moment (μ) = charge (q) × distance of separation (r)', 'polar bonds always make a polar molecule', 'unit as Debye only, or drawing arrow from negative to positive'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR theory) for geometry and c10_chem_cbse_05_010.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' },
                { id: 'b', prompt: 'Explain why CO₂ has zero net dipole moment while H₂O has a net dipole moment of 1.85 D, even though both contain polar bonds.', answer: 'CO₂ is linear (O=C=O, 180°)',
                  options: ['CO₂ is linear (O=C=O, 180°)', 'CO₂ has no polar bonds', 'H₂O is linear', 'polar bonds always make a polar molecule'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR theory) for geometry and c10_chem_cbse_05_010.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' },
                { id: 'c', prompt: 'The bond dipole moment of H−F is 1.91 D and the H−F bond length is 92 pm. Calculate the partial charge (δ) on each atom in units of elementary charge (e).', answer: 'μ = 1.91 D = 1.91 × 3.336 × 10⁻³⁰ = 6.372 × 10⁻³⁰ C·m',
                  options: ['μ = 1.91 D = 1.91 × 3.336 × 10⁻³⁰ = 6.372 × 10⁻³⁰ C·m', 'polar bonds always make a polar molecule'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR theory) for geometry and c10_chem_cbse_05_010.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' },
                { id: 'd', prompt: 'Compare the dipole moments of NH₃ (1.47 D) and NF₃ (0.23 D). Both are pyramidal with a lone pair on nitrogen.', answer: 'In NH₃, N is more electronegative than H',
                  options: ['In NH₃, N is more electronegative than H', 'polar bonds always make a polar molecule'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_005 (VSEPR theory) for geometry and c10_chem_cbse_05_010.',
                  misconception: 'Students often think that "polar bonds always make a polar molecule" and incorrectly predict NH₃ and NF₃ to have similar dipole moments.' }
          ],
            remediations: { 'polar-bonds-always-make-a': { steps: ['If a student cannot predict molecular polarity from geometry: (1) Review VSEPR shapes (c11_chem_cbse_04_005) — draw the.', '(2) Draw each bond dipole as an arrow on the central atom.', '(3) Resolve each dipole into x, y, z components using trigonometry (c10_math_cbse_08_001).', '(4) Sum components; if all sums are zero, μ_net = 0.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
