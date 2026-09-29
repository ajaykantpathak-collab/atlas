import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch04_p1: SimDef = {
    id: 'v3_c11_chem_ch04_p1',
    title: 'Chemical Bonding and Molecular Structure · Part 1/2',
    subtitle: 'Weigh electron bookkeeping against lattice energy to explain why salt exists at all.',
    classLevel: 11, subject: 'chemistry', topic: 'Chemical Bonding and Molecular Structure · Part 1/2',
    chapters: ['c11_chem_ch04'],
    nodeIds: ['c11_chem_cbse_04_001', 'c11_chem_cbse_04_002', 'c11_chem_cbse_04_003', 'c11_chem_cbse_04_004', 'c11_chem_cbse_04_005', 'c11_chem_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an energeticist auditing why ionic crystals form', intro: 'Sodium and chlorine both \'want\' noble-gas shells — but the energy ledger is still in the red. Find who foots the bill.', goal: 'Apply Kossel-Lewis electron accounting and use Born-Haber energetics to explain ionic bond formation.' },
    discovery: {
        question: 'Making Na+ from Na costs +496 kJ/mol and making Cl- releases only -349 kJ/mol — the gas-phase ions are still +147 kJ/mol in the red, yet salt forms spontaneously. What pays the bill?',
        options: ['The huge lattice enthalpy released when gaseous ions pack into a crystal', 'The octet rule makes the energy debt disappear', 'Chlorine donates the missing energy back to sodium', 'Room temperature automatically supplies the deficit'],
        answer: 'The huge lattice enthalpy released when gaseous ions pack into a crystal',
        hook: 'Completing octets isn\'t what makes ionic solids stable — the pay-off is in the packing, about -788 kJ/mol for NaCl.',
    },
    teaching: [
        { title: 'Kossel-Lewis Approach to Chemical Bonding', text: 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing to achieve stable noble gas configurations (octet/duplet), where Lewis symbols represent valence electrons.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_04_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Build a Born-Haber energy ledger for NaCl and decide whether octet completion or lattice enthalpy really drives its formation.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_001', title: 'Kossel-Lewis Approach to Chemical Bonding',
          scaffold: { problem: 'Draw the Lewis structure of the carbonate ion (CO₃²⁻) and calculate formal charges on all atoms.',
            steps: [
            { text: 'Count total valence electrons: C (Group 14) = 4, O (Group 16) = 6 each × 3 = 18, plus 2 for 2- charge = 24 valence.' },
            { text: 'Determine skeleton: Carbon is least electronegative (central), three O atoms terminal.' },
            { text: 'Distribute electrons: 3 single bonds use 6 electrons. Remaining 18 electrons placed as lone pairs on terminal O atoms.' },
            { text: 'Check octets: Each O has 2 bonding + 6 non-bonding = 8 electrons (octet satisfied).' },
            { text: 'Form multiple bond: Move one lone pair from an O to form C=O double bond. Now carbon has 4 bonding pairs = 8 electrons.' },
            { text: 'Calculate formal charges: For double-bonded O: FC = 6 - 4 - ½(4) = 0. For each single-bonded O: FC = 6 - 6 - ½(2) = -1.', faded: true, blankAnswer: 'Lewis structure shows carbon central with one C=O double.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_002', title: 'Ionic Bond: Formation and Lattice Energy',
          scaffold: { problem: 'Calculate the lattice enthalpy of KCl(s) using the following data: ΔH_f°(KCl) = -436 kJ/mol, ΔH_sub(K) = 89 kJ/mol, IE(K) = 419 kJ/mol.',
            steps: [
            { text: 'Write the Born-Haber cycle for KCl: K(s) + ½Cl₂(g) → KCl(s).' },
            { text: 'Break into steps: (i) K(s) → K(g) ΔH = +89; (ii) K(g) → K⁺(g) + e⁻ ΔH = +419; (iii) ½Cl₂(g) → Cl(g) ΔH = +121; (iv).' },
            { text: 'Sum all steps equals ΔH_f°: 89 + 419 + 121 - 349 - LE = -436.' },
            { text: 'Solve for LE: 280 - LE = -436 → LE = 716 kJ/mol.' },
            { text: 'Verify sign: LE defined for separation is +716 kJ/mol; formation releases -716 kJ/mol.', faded: true, blankAnswer: 'Lattice enthalpy of KCl = +716 kJ/mol (for separation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_003', title: 'Covalent Bond: Lewis Structures',
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
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_004', title: 'Formal Charge: Calculation',
          scaffold: { problem: 'Calculate the formal charge on each atom in the carbon monoxide molecule (CO).',
            steps: [
            { text: 'Identify the valence electrons for each atom. Carbon (Group 14) has 4 valence electrons.' },
            { text: 'From the Lewis structure :C≡O:, count non-bonding electrons on each atom.' },
            { text: 'Count bonding electrons. The triple bond consists of 3 shared pairs → 6 bonding electrons for each atom (each atom.' },
            { text: 'Apply the formal charge formula FC = V – N – ½B. For C: FC = 4 – 2 – ½(6) = 4 – 2 – 3 = –1.' },
            { text: 'Verify the sum of formal charges equals the overall charge of the neutral molecule: –1 + (+1) = 0.', faded: true, blankAnswer: 'FC(C) = –1, FC(O) = +1. Sum = 0. The formal charge.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_04_005', title: 'VSEPR Theory: Predicting Molecular Geometry',
          scaffold: { problem: 'Predict the molecular geometry, electron-pair geometry, and approximate bond angles for the chlorate ion, ClO₃⁻.',
            steps: [
            { text: 'Count total valence electrons = 7 (Cl) + 3×6 (O) + 1 (negative charge) = 26 electrons.' },
            { text: 'Draw Lewis structure: Cl central, three Cl–O single bonds use 6 electrons; complete octets on terminal O atoms (3×6.' },
            { text: 'Minimize formal charges by forming one Cl=O double bond: move a lone pair from one O to form π bond.' },
            { text: 'Form second Cl=O double bond: Cl FC = 7 – 0 – ½(10) = 0; two double-bonded O FC = 0; one single-bonded O FC = –1.' },
            { text: 'Steric number = 4 → electron-pair geometry = tetrahedral. Molecular geometry = trigonal pyramidal (one vertex occupied.' },
            { text: 'Ideal tetrahedral angle 109.5°; lone pair–bond pair repulsion compresses O–Cl–O angles to ≈ 106–107° (experimental.', faded: true, blankAnswer: 'Electron-pair geometry: tetrahedral; Molecular geometry.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_04_006', title: 'Valence Bond Theory: Overlapping of Orbitals',
          caseStudy: { intro: 'When two hydrogen atoms approach each other, you can observe that they form a stable H₂ molecule with bond length 74 pm and bond energy 435.8 kJ/mol.',
            decisions: [{ prompt: 'Define a sigma (σ) bond and a pi (π) bond in terms of orbital overlap geometry.', options: [
                { text: 'A sigma (σ) bond forms by end-to-end (axial) overlap of orbitals along the internuclear', outcome: 'A sigma (σ) bond forms by end-to-end (axial) overlap of orbitals along the internuclear axis (s-s.' },
                { text: 'double bonds are stronger than single bonds', outcome: 'Not quite — Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than.', reveals: 'bonds-are-stronger-than-bonds' },
                { text: 'π bonds form from s-p overlap', outcome: 'Not quite — Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than.', reveals: 'bonds-are-stronger-than-bonds' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a peer-tutoring session you ask juniors to draw Lewis structures for BF3, NO2 and SF6. One junior forces five bonds onto nitrogen \'to complete its octet\', refuses SF6 entirely (\'sulphur can\'t have twelve electrons — octet rule!\'), and concludes BF3 must be wrongly described by chemists.',
            decisions: [{ prompt: 'How do you correct the session?', options: [
                { text: 'The octet rule is a guide with three known failure modes: incomplete octet (BF3 — boron stable at 6 e⁻), odd-electron species (NO2 — one atom keeps 7 e⁻), and expanded octet (SF6 — period-3+ atoms can exceed 8). Forcing octets everywhere produces impossible structures like pentavalent N.', outcome: 'Formal charge and total valence count pick the best Lewis structure; period-2 atoms are octet-bound, but the rule bends below and beyond.' },
                { text: 'The junior is right — the octet rule is a law of bonding; molecules that violate it can\'t exist.', outcome: 'BF3, NO and SF6 are shelf-stable chemicals; the \'rule\' describes common ground states, not a universal constraint on every atom.', reveals: 'octet-rule-is-absolute' },
                { text: 'Nitrogen CAN have five bonds — period-2 atoms expand octets just like sulphur.', outcome: 'Period-2 atoms lack accessible d-orbitals and physically cap at 8 e⁻; expansion is a period-3+ privilege — exactly backwards from the correction needed.', reveals: 'period2-expands-octet' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Ionic bonds aren\'t paid for by octets — they\'re paid for when countless ions snap into a lattice.',
            decisions: [{ prompt: 'What comes next? Chemical Bonding and Molecular Structure · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Chemical Bonding and Molecular Structure · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_001', difficulty: 'standard',
          question: 'The Kossel-Lewis approach explains chemical bonding through electron transfer.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells: 2n² Rule" and "Valency.',
          misconception: 'Students treat the octet rule as absolute: they force octets on all atoms even when impossible (e.g., drawing 5 bonds.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing',
                  options: ['The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'An ionic bond is the electrostatic force of attraction between oppositely charged ions', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,'],
                  hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells: 2n² Rule" and "Valency: Definition and.',
                  misconception: 'Students treat the octet rule as absolute: they force octets on all atoms even when impossible (e.g., drawing 5 bonds on nitrogen in NO₃⁻.' }
          ],
            remediations: { 'students-treat-the-octet-rule': { steps: ['List valence electrons for each atom using periodic table group number.', 'Determine if central atom is period 2 (max 8 e⁻) or period 3+ (can expand).', 'For odd total valence electrons, accept one atom will have 7 e⁻.', 'Draw skeleton, distribute electrons, check octets.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_002', difficulty: 'standard',
          question: 'An ionic bond is the electrostatic force of attraction between oppositely.',
          hint: 'Review periodic trends in ionization enthalpy and electron gain enthalpy from Unit 3.',
          misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets,.',
          parts: [
                { id: 'a', prompt: 'Explain why the formation of NaCl(s) from Na(g) and Cl(g) is exothermic overall, even though the ionization of Na(g) and electron gain by Cl(g) together are.', answer: 'The overall process Na(g) + ½Cl₂(g) → NaCl(s) is exothermic',
                  options: ['The overall process Na(g) + ½Cl₂(g) → NaCl(s) is exothermic', 'Atoms transfer electrons to complete octets, so ionic bonds form'],
                  hint: 'Review periodic trends in ionization enthalpy and electron gain enthalpy from Unit 3.',
                  misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets, so ionic bonds form.".' },
                { id: 'b', prompt: 'Given: IE₁(Na) = 496 kJ/mol, EA(Cl) = -349 kJ/mol, ΔH_f°(NaCl) = -411 kJ/mol, ΔH_sub(Na) = 108 kJ/mol, ½BDE(Cl₂) = 121 kJ/mol.', answer: 'Na(s) → Na(g) ΔH = +108 kJ/mol',
                  options: ['Na(s) → Na(g) ΔH = +108 kJ/mol', 'Atoms transfer electrons to complete octets, so ionic bonds form'],
                  hint: 'Review periodic trends in ionization enthalpy and electron gain enthalpy from Unit 3.',
                  misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets, so ionic bonds form.".' },
                { id: 'c', prompt: 'Compare the lattice enthalpies of NaCl and MgO. Both have rock-salt structure.', answer: 'MgO has higher lattice enthalpy',
                  options: ['MgO has higher lattice enthalpy', 'Atoms transfer electrons to complete octets, so ionic bonds form'],
                  hint: 'Review periodic trends in ionization enthalpy and electron gain enthalpy from Unit 3.',
                  misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets, so ionic bonds form.".' }
          ],
            remediations: { 'the-octet-rule-alone-drives': { steps: ['If the student holds this misconception, guide them through the NaCl energy cycle stepwise: (1) Write the three steps.', '(2) Assign signs: IE > 0, EA < 0, LE < 0 (formation).', '(3) Calculate sum for NaCl: +496 - 349 - 788 = -641 kJ/mol (exothermic).', '(4) Remove lattice step: sum = +147 kJ/mol (endothermic).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets,.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Since lattice enthalpy is always positive (endothermic), forming an ionic lattice always absorbs energy." Evaluate this statement.', answer: 'The statement is false',
                  options: ['The statement is false', 'Atoms transfer electrons to complete octets, so ionic bonds form'],
                  hint: 'Review periodic trends in ionization enthalpy and electron gain enthalpy from Unit 3.',
                  misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets, so ionic bonds form.".' },
                { id: 'b', prompt: 'Design a thought experiment to demonstrate that lattice enthalpy is the decisive factor making ionic bond formation favorable, using hypothetical elements.', answer: 'Choose A = large alkali metal (e.g., Cs) and B = large halogen (e.g., I)',
                  options: ['Choose A = large alkali metal (e.g., Cs) and B = large halogen (e.g., I)', 'Atoms transfer electrons to complete octets, so ionic bonds form'],
                  hint: 'Review periodic trends in ionization enthalpy and electron gain enthalpy from Unit 3.',
                  misconception: 'Students often think the octet rule alone drives ionic bond formation: "Atoms transfer electrons to complete octets, so ionic bonds form.".' }
          ],
            remediations: { 'the-octet-rule-alone-drives': { steps: ['If the student holds this misconception, guide them through the NaCl energy cycle stepwise: (1) Write the three steps.', '(2) Assign signs: IE > 0, EA < 0, LE < 0 (formation).', '(3) Calculate sum for NaCl: +496 - 349 - 788 = -641 kJ/mol (exothermic).', '(4) Remove lattice step: sum = +147 kJ/mol (endothermic).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_003', difficulty: 'standard',
          question: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic.',
          hint: 'Revisit the Kossel‑Lewis approach (c11_chem_cbse_04_001) and the electron distribution.',
          misconception: 'Students often think the central atom is always the one with the lowest electronegativity, but they forget that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that',
                  options: ['A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that', 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'An ionic bond is the electrostatic force of attraction between oppositely charged ions', 'Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,'],
                  hint: 'Revisit the Kossel‑Lewis approach (c11_chem_cbse_04_001) and the electron distribution in shells.',
                  misconception: 'Students often think the central atom is always the one with the lowest electronegativity, but they forget that hydrogen is never a central.' }
          ],
            remediations: { 'the-central-atom-is-always': { steps: ['If a student consistently miscounts valence electrons for ions, have them practice a three‑step drill: (1) write the.', 'Then draw Lewis structures for a series: CH4, NH3, H2O, NH4+, OH‑.', 'Use colour‑coded pens: one colour for neutral atom electrons, another for added/removed electrons.', 'This visual separation reinforces the charge adjustment step.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_004', difficulty: 'standard',
          question: 'Formal charge is the hypothetical charge assigned to an atom in a Lewis.',
          hint: 'If stuck, revisit the step-by-step procedure for writing Lewis structures (node.',
          misconception: 'Students often treat formal charge as the actual charge on an atom (like oxidation state) and believe it represents.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,',
                  options: ['Formal charge is the hypothetical charge assigned to an atom in a Lewis structure,', 'The Kossel-Lewis approach explains chemical bonding through electron transfer or sharing', 'An ionic bond is the electrostatic force of attraction between oppositely charged ions', 'A Lewis structure is a diagrammatic representation of a molecule or polyatomic ion that'],
                  hint: 'If stuck, revisit the step-by-step procedure for writing Lewis structures (node.',
                  misconception: 'Students often treat formal charge as the actual charge on an atom (like oxidation state) and believe it represents real electron density.' }
          ],
            remediations: { 'students-often-treat-formal-charge': { steps: ['If a student confuses formal charge with oxidation state: (1) Have them calculate both for a simple molecule like HCl.', 'Oxidation state: H = +1, Cl = –1.', 'Formal charge: H = 1 – 0 – ½(2) = 0, Cl = 7 – 6 – ½(2) = 0.', '(2) For the ½-factor error: give a molecule with a double bond (e.g., CO₂).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_005', difficulty: 'standard',
          question: 'VSEPR (Valence Shell Electron Pair Repulsion) theory predicts the.',
          hint: 'If stuck, revisit c11_chem_cbse_04_003 (Lewis structures) and c11_chem_cbse_04_004.',
          misconception: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead.',
          parts: [
                { id: 'a', prompt: 'Explain why the bond angle in NH₃ (107°) is smaller than the ideal tetrahedral angle (109.5°) but larger than the H–O–H angle in H₂O (104.5°).', answer: 'NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)',
                  options: ['NH₃ has one lone pair (lp–bp repulsion compresses angles from 109.5° to ~107°)', 'both have one lone pair', 'electronegativity difference'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_003 (Lewis structures) and c11_chem_cbse_04_004 (formal charge).',
                  misconception: 'Students treat double/triple bonds as multiple electron domains for VSEPR (e.g., counting CO₂ as 4 domains instead of 2) and/or place lone.' }
          ],
            remediations: { 'students-treat-double-triple-bonds': { steps: ['If a student miscounts domains or misplaces lone pairs: (1) Have them re-draw the Lewis structure showing ALL valence.', '(2) Circle each bonding pair and lone pair on the central atom with different colors.', '(3) Count circles → steric number.', '(4) Use a 3D model kit or ball-and-stick simulation: place 5 balloons (3 equatorial, 2 axial) on a central sphere.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_04_006', difficulty: 'standard',
          question: 'Valence Bond Theory explains covalent bond formation through the overlap.',
          hint: 'Review Class 11 Unit 2 (Structure of Atom) - orbital shapes, quantum numbers, and.',
          misconception: 'Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than single bonds" and π.',
          parts: [
                { id: 'a', prompt: 'In the formation of HCl molecule, the half-filled 1s orbital of H overlaps with the half-filled 3p_z orbital of Cl along the internuclear axis (taken.', answer: 'The bond formed is a sigma (σ) bond (s-p axial overlap)',
                  options: ['The bond formed is a sigma (σ) bond (s-p axial overlap)', 'π bond', 'negative overlap', 'double bonds are stronger than single bonds'],
                  hint: 'Review Class 11 Unit 2 (Structure of Atom) - orbital shapes, quantum numbers, and electron.',
                  misconception: 'Students believe that π bonds are stronger than σ bonds because "double bonds are stronger than single bonds" and π bonds appear.' }
          ],
            remediations: { 'bonds-are-stronger-than-bonds': { steps: ['Show overlap diagrams - axial (σ) has larger overlapping region than lateral (π).', 'Give bond energy data: C-C σ ≈ 347 kJ/mol, C=C π ≈ 265 kJ/mol (total C=C ≈ 614 kJ/mol).', 'Demonstrate ethane (C₂H₆) free rotation around C-C σ bond vs ethene (C₂H₄) restricted rotation around C=C.', 'Have student explain why σ forms first in multiple bonds using "maximum overlap" principle.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
