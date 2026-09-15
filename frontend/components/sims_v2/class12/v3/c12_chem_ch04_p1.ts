import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch04_p1: SimDef = {
    id: 'v3_c12_chem_ch04_p1',
    title: 'd and f Block Elements · Part 1/2',
    subtitle: 'Zinc is in the club\'s address but not on the member list',
    classLevel: 12, subject: 'chemistry', topic: 'd and f Block Elements · Part 1/2',
    chapters: ['c12_chem_ch04'],
    nodeIds: ['c12_chem_cbse_04_001', 'c12_chem_cbse_04_002', 'c12_chem_cbse_04_003', 'c12_chem_cbse_04_004', 'c12_chem_cbse_04_005', 'c12_chem_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Inorganic chemist', intro: 'Iron, copper, gold — the metals that built civilisation all live in one crowded block. Their secrets are written in d orbitals.', goal: 'Locate the d- and f-blocks, apply the IUPAC transition-element definition, and write general and exceptional electronic configurations.' },
    discovery: {
        question: 'Zinc sits squarely in the d-block, yet chemists refuse to call it a transition metal. What disqualifies it?',
        options: ['IUPAC demands an incomplete d subshell in the atom or its common ions — zinc is d¹⁰ in both, so no d–d transitions, no colour', 'Nothing — every d-block element is a transition metal', 'Zinc is too reactive to count', 'Zinc\'s electrons are in the wrong period'],
        answer: 'IUPAC demands an incomplete d subshell in the atom or its common ions — zinc is d¹⁰ in both, so no d–d transitions, no colour',
        hook: '\'d-block\' and \'transition element\' are not synonyms — the definition is about the electrons, not the postcode. A full d¹⁰ subshell means no variable oxidation states and colourless compounds, which is exactly why Zn²⁺ solutions are clear.',
    },
    teaching: [
        { title: 'Position of d-Block Elements in Periodic Table', text: 'The d-block elements occupy Groups 3–12 of the modern periodic table, where the (n−1)d subshell is progressively filled across four long periods (3d, 4d, 5d, 6d).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_04_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Read the periodic table\'s crowded centre like a map: place the four transition series, apply the IUPAC test to any element, explain the Cr and Cu configuration rebels, then track why these metals colour gems and power catalysts.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_001', title: 'Position of d-Block Elements in Periodic Table',
          caseStudy: { intro: 'Start with a familiar observation: the metallic objects around you — iron nails, copper wires, gold jewellery, stainless steel utensils — all belong to the.',
            decisions: [{ prompt: 'On the modern periodic table, the d-block elements are located in which groups and how many periods (rows) do they span?', options: [
                { text: 'The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),', outcome: 'The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7), corresponding to the.' },
                { text: 'Groups 1–10', outcome: 'Not quite — **Misconception**: "All d-block elements are transition elements, and all transition elements have.', reveals: 'misconception-all-d-block-elements' },
                { text: 'three periods', outcome: 'Not quite — **Misconception**: "All d-block elements are transition elements, and all transition elements have.', reveals: 'misconception-all-d-block-elements' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_002', title: 'Electronic Configuration of d-Block Elements',
          scaffold: { problem: 'Write the ground-state electronic configurations of (i) Chromium (Z = 24), (ii) Copper (Z = 29), and (iii) Palladium (Z = 46).',
            steps: [
            { text: 'Identify the series and principal quantum numbers. Cr and Cu are 3d series (n=4, so (n−1)=3).' },
            { text: 'Write the expected configuration using strict Aufbau order (1s² 2s² 2p² 3s² 3p² 4s² 3d¹⁰...).' },
            { text: 'Apply the exception rule — half-filled (d⁵) and fully-filled (d¹⁰) d subshells have extra stability due to exchange.' },
            { text: 'For Cr: 3d⁴4s² → promote one 4s electron to 3d → 3d⁵4s¹ (half-filled d⁵ achieved).' },
            { text: 'Write final configurations with noble gas core: Cr = [Ar] 3d⁵4s¹, Cu = [Ar] 3d¹⁰4s¹, Pd = [Kr] 4d¹⁰5s⁰.', faded: true, blankAnswer: '(i) Cr: [Ar] 3d⁵4s¹ (ii) Cu: [Ar] 3d¹⁰4s¹ (iii) Pd: [Kr].' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_003', title: 'General Properties of Transition Elements: Atomic Radii',
          caseStudy: { intro: 'Begin with a real-world observation: hold a piece of iron (Fe) and a piece of copper (Cu) — both are transition metals but Fe is lighter (density 7.87 g/cm³).',
            decisions: [{ prompt: 'State the general trend in atomic radii across the first transition series (Sc to Zn) and give the primary reason for this trend.', options: [
                { text: 'Atomic radii decrease gradually from Sc to Zn', outcome: 'Atomic radii decrease gradually from Sc to Zn. The reason is increasing nuclear charge with each.' },
                { text: 'radius increases', outcome: 'Not quite — Students often think that because Cr has configuration 3d⁵4s¹ (half-filled d-subshell), its atomic.', reveals: 'because-cr-has-configuration-3d' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_004', title: 'General Properties: Ionisation Enthalpy and Oxidation States',
          scaffold: { problem: 'Using NCERT Table 4.2 data, explain why the third ionisation enthalpy of iron (2962 kJ mol⁻¹) is lower than that of manganese (3260.',
            steps: [
            { text: 'Write the electronic configurations of Fe and Mn atoms and their M²⁺ ions. Fe: [Ar] 3d⁶4s² → Fe²⁺: [Ar] 3d⁶.' },
            { text: 'Identify the electron removed in the third ionisation: Fe²⁺ (3d⁶) → Fe³⁺ (3d⁵); Mn²⁺ (3d⁵) → Mn³⁺ (3d⁴).' },
            { text: 'Recognise that Fe²⁺ loses a 3d electron to achieve the stable half-filled 3d⁵ configuration (Fe³⁺), gaining exchange.' },
            { text: 'Conclude that the third ionisation enthalpy is lower for Fe because the product (Fe³⁺, d⁵) is stabilised by exchange.' },
            { text: 'Verify with data: ΔH₃(Fe) = 2962 kJ mol⁻¹ < ΔH₃(Mn) = 3260 kJ mol⁻¹.', faded: true, blankAnswer: 'ΔH₃(Fe) < ΔH₃(Mn) because Fe²⁺ (d⁶) → Fe³⁺ (d⁵) gains.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_005', title: 'General Properties: Magnetic Properties and Colour',
          scaffold: { problem: 'A light green aqueous solution of an unknown transition metal sulphate (0.1 M) shows a magnetic moment of 5.1 BM when measured by Gouy.',
            steps: [
            { text: 'List first-row M²⁺ ions with their dⁿ configurations: Ti²⁺ (d²), V²⁺ (d³), Cr²⁺ (d⁴), Mn²⁺ (d⁵), Fe²⁺ (d⁶), Co²⁺ (d⁷).' },
            { text: 'Calculate spin-only μ for each high-spin octahedral configuration: d²→2.84, d³→3.87, d⁴→4.90, d⁵→5.92, d⁶→4.90.' },
            { text: 'Compare experimental 5.1 BM with calculated values. Closest match is Mn²⁺ (5.92 BM) or Fe²⁺ (4.90 BM).' },
            { text: 'Use colour as tie-breaker. Mn²⁺ aqueous is pale pink. Fe²⁺ aqueous is green. The problem states "light green" solution.' },
            { text: 'Conclude the ion is Fe²⁺. The experimental moment (5.1 BM) is slightly lower than typical 5.3–5.5 BM due to measurement.', faded: true, blankAnswer: 'Fe²⁺ (iron(II)) — d⁶ high-spin, 4 unpaired electrons.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_006', title: 'General Properties: Catalytic Activity',
          caseStudy: { intro: 'Observe a real-world Indian context: the Contact Process for sulfuric acid production uses V₂O₅, the Haber Process for ammonia uses finely divided iron, and.',
            decisions: [{ prompt: 'State the three distinct factors that give transition metals their catalytic activity, as per NCERT Class 12.', options: [
                { text: 'The three factors are: (1) ability to adopt multiple oxidation states, (2) ability to', outcome: 'The three factors are: (1) ability to adopt multiple oxidation states, (2) ability to form.' },
                { text: 'variable oxidation states', outcome: 'Not quite — Students often believe catalytic activity arises from ONLY one factor — typically "variable.', reveals: 'catalytic-activity-arises-from-only' },
                { text: 'high melting point', outcome: 'Not quite — Students often believe catalytic activity arises from ONLY one factor — typically "variable.', reveals: 'catalytic-activity-arises-from-only' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Filling a periodic-table worksheet, a student writes: \'Zn is in the d-block and forms compounds, so it\'s a transition element like the rest.\'',
            decisions: [{ prompt: 'Does Zn actually qualify as a transition element?', options: [
                { text: 'No — the IUPAC test is an incomplete d subshell in the neutral atom or any common ion; Zn is 3d¹⁰ both ways and Zn²⁺ is colourless, so it\'s d-block but not transition.', outcome: 'Block membership follows the subshell being filled; transition status needs an incomplete d — the categories aren\'t identical, and Cu scrapes in only via Cu²⁺ (3d⁹).' },
                { text: 'Yes — anything sitting inside the d-block is by definition a transition element.', outcome: 'That erases the Group 12 exception: Zn, Cd and Hg fill d¹⁰ in atom and ion alike and fail the IUPAC criterion.', reveals: 'dblock-equals-transition' },
                { text: 'Yes — and its compounds are coloured, which proves transition behaviour.', outcome: 'Zn²⁺ (d¹⁰) has no d–d transitions available, so its compounds are typically colourless — the cited evidence is also wrong.', reveals: 'zinc-compounds-coloured' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now defend why iron is a transition metal and zinc isn\'t — with the orbital reasoning examiners want. This chapter is the key to inorganic chemistry\'s highest-weight questions.',
            decisions: [{ prompt: 'What comes next? d and f Block Elements · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — d and f Block Elements · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_001', difficulty: 'standard',
          question: 'The d-block elements occupy Groups 3–12 of the modern periodic table, where the.',
          hint: 'If unable to write configurations or identify blocks, revisit **c11_chem_cbse_02_015**.',
          misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation.',
          parts: [
                { id: 'a', prompt: 'On the modern periodic table, the d-block elements are located in which groups and how many periods (rows) do they span?', answer: 'The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),',
                  options: ['The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),', 'Groups 1–10', 'three periods'],
                  hint: 'If unable to write configurations or identify blocks, revisit **c11_chem_cbse_02_015** (Aufbau.',
                  misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation states." **Why it\'s.' },
                { id: 'b', prompt: 'Compare the positions of the 3d, 4d, and 5d transition series in the periodic table.', answer: 'The 5d series is interrupted by the 4f lanthanoid series (Ce–Lu, Z=58–71)',
                  options: ['The 5d series is interrupted by the 4f lanthanoid series (Ce–Lu, Z=58–71)', '5d has more elements', 'lanthanoids are in the 5d series'],
                  hint: 'If unable to write configurations or identify blocks, revisit **c11_chem_cbse_02_015** (Aufbau.',
                  misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation states." **Why it\'s.' }
          ],
            remediations: { 'misconception-all-d-block-elements': { steps: ['If the student cannot distinguish d-block from transition elements or misapplies the IUPAC definition: 1.', 'Revisit **c11_chem_cbse_03_005** (Types of Elements: s, p, d, f Blocks) to reinforce block classification by subshell.', 'Revisit **c11_chem_cbse_02_015** (Aufbau Principle) to recall how 4s fills before 3d but 3d is the "inner" subshell for.', 'Do a **re-diagnostic**: Give three elements — Sc, Cu, Zn — and ask the student to (a) write ground-state configuration.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_002', difficulty: 'standard',
          question: 'The d-block elements (Groups 3–12) are those in which the (n−1)d orbitals are.',
          hint: 'If stuck, revisit c11_chem_cbse_02_015 (Aufbau Principle) and c11_chem_cbse_02_017.',
          misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but.',
          parts: [
                { id: 'a', prompt: 'Compare the electronic configurations of the 3d, 4d, and 5d series elements in Group 6 (Cr, Mo, W).', answer: 'Cr: [Ar] 3d⁵4s¹ (half-filled d⁵ stability)',
                  options: ['Cr: [Ar] 3d⁵4s¹ (half-filled d⁵ stability)', 'all Group 6 elements have d⁵s¹'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_015 (Aufbau Principle) and c11_chem_cbse_02_017 (Hund\'s Rule).',
                  misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but the actual ground.' }
          ],
            remediations: { 'students-write-the-electronic-configuration': { steps: ['If a student cannot correctly write configurations with exceptions: (1) Revisit c11_chem_cbse_02_015 (Aufbau Principle).', '(2) Memorise the three "must-know" exceptions: Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), Pd (4d¹⁰5s⁰).', '(3) Practice writing M²⁺ and M³⁺ configurations for all 3d metals using the "remove ns first" rule; verify with Table.', '(4) Re-diagnostic: Ask the student to write configurations for Mo (Z=42), Ag (Z=47), and Pt (Z=78) and identify which.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Zinc (Zn, Z = 30) is a transition element because it is in the d-block and has electrons in the d orbital." Is this.', answer: 'The statement is INCORRECT',
                  options: ['The statement is INCORRECT', 'd-block', 'transition element'],
                  hint: 'If stuck, revisit c11_chem_cbse_02_015 (Aufbau Principle) and c11_chem_cbse_02_017 (Hund\'s Rule).',
                  misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but the actual ground.' }
          ],
            remediations: { 'students-write-the-electronic-configuration': { steps: ['If a student cannot correctly write configurations with exceptions: (1) Revisit c11_chem_cbse_02_015 (Aufbau Principle).', '(2) Memorise the three "must-know" exceptions: Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), Pd (4d¹⁰5s⁰).', '(3) Practice writing M²⁺ and M³⁺ configurations for all 3d metals using the "remove ns first" rule; verify with Table.', '(4) Re-diagnostic: Ask the student to write configurations for Mo (Z=42), Ag (Z=47), and Pt (Z=78) and identify which.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_003', difficulty: 'standard',
          question: 'Atomic radius of a transition element is the distance from the nucleus to the.',
          hint: 'Revisit Class 11 periodic trends (atomic radius across period) and the concept that.',
          misconception: 'Students often think that because Cr has configuration 3d⁵4s¹ (half-filled d-subshell), its atomic radius should.',
          parts: [
                { id: 'a', prompt: 'State the general trend in atomic radii across the first transition series (Sc to Zn) and give the primary reason for this trend.', answer: 'Atomic radii decrease gradually from Sc to Zn',
                  options: ['Atomic radii decrease gradually from Sc to Zn', 'radius increases'],
                  hint: 'Revisit Class 11 periodic trends (atomic radius across period) and the concept that d-orbitals are.',
                  misconception: 'Students often think that because Cr has configuration 3d⁵4s¹ (half-filled d-subshell), its atomic radius should be larger than V due.' }
          ],
            remediations: { 'because-cr-has-configuration-3d': { steps: ['If a student exhibits this misconception: (1) Show them the actual metallic radii from Table 4.2: V=135 pm, Cr=129.', '(2) Ask them to plot these three points and observe the dip at Cr, not a peak.', '(3) Explain that exchange energy stabilizes the electron configuration (lowers energy) but does not push electrons.', '(4) Assign a re-diagnostic: "Predict the order of metallic radii for Fe, Co, Ni, Cu, Zn and check against Table 4.2."'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_004', difficulty: 'standard',
          question: 'Ionisation enthalpy of a transition element is the energy required to remove.',
          hint: 'If stuck, review the electron-filling order for 3d series (c12_chem_cbse_04_002) and the.',
          misconception: 'Students write "ionisation enthalpy increases across the period because nuclear charge increases" and apply this.',
          parts: [
                { id: 'a', prompt: 'Explain why the second ionisation enthalpy of chromium (1592 kJ mol⁻¹) is unusually high compared to its neighbours vanadium (1414 kJ mol⁻¹) and manganese.', answer: 'Cr has ground-state configuration 3d⁵4s¹',
                  options: ['Cr has ground-state configuration 3d⁵4s¹', 'increasing nuclear charge only'],
                  hint: 'If stuck, review the electron-filling order for 3d series (c12_chem_cbse_04_002) and the exchange.',
                  misconception: 'Students write "ionisation enthalpy increases across the period because nuclear charge increases" and apply this uniformly to both.' }
          ],
            remediations: { 'students-write-ionisation-enthalpy-increases': { steps: ['Revisit **c11_chem_cbse_03_008** (Trends: Ionisation Enthalpy) to refresh the definition and main-group trend.', 'Revisit **c11_chem_cbse_02_017** (Hund\'s Rule) to recall exchange energy and half-filled/filled subshell stability.', 'Revisit **c11_chem_cbse_08_002** (Oxidation Number Rules) to practice assigning oxidation states in compounds.', 'Re-do Diagnostic Questions 2 and 3, explicitly writing the dⁿ configuration before and after each ionisation step.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_005', difficulty: 'standard',
          question: 'Magnetic properties of transition elements arise from unpaired electrons.',
          hint: 'If stuck on unpaired electron count: draw 5 boxes for d-orbitals, fill with arrows for.',
          misconception: 'Students often believe that the spin-only magnetic moment formula μ = √[n(n+2)] gives the EXACT experimental magnetic.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Magnetic properties of transition elements arise from unpaired electrons in partially',
                  options: ['Magnetic properties of transition elements arise from unpaired electrons in partially', 'The d-block elements occupy Groups 3–12 of the modern periodic table, where the (n−1)d', 'The d-block elements (Groups 3–12) are those in', 'Atomic radius of a transition element is the distance from the nucleus to the outermost'],
                  hint: 'If stuck on unpaired electron count: draw 5 boxes for d-orbitals, fill with arrows for the dⁿ.',
                  misconception: 'Students often believe that the spin-only magnetic moment formula μ = √[n(n+2)] gives the EXACT experimental magnetic moment for all.' }
          ],
            remediations: { 'the-spin-only-magnetic-moment': { steps: ['If the student cannot correctly determine unpaired electrons for a given ion: (1) Revisit c11_chem_cbse_02_017 (Hund\'s.', '(2) Revisit c11_chem_cbse_02_014 (Shapes of d-orbitals) to visualise t₂g and e_g splitting.', '(3) Use the "orbital box diagram" method: draw 5 boxes for d-orbitals, fill with arrows ↑↓ following Hund\'s rule, then.', '(4) Practice with Table 4.7 (NCERT) — calculate spin-only μ for each ion and compare with observed values.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_006', difficulty: 'standard',
          question: 'Catalytic activity of transition metals refers to their ability to accelerate.',
          hint: 'If stuck, immediately review the oxidation state table (NCERT Table 4.3) and the.',
          misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and.',
          parts: [
                { id: 'a', prompt: 'In the Contact Process, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.', answer: 'V₂O₅ works because vanadium can shift between +5 and +4 oxidation states',
                  options: ['V₂O₅ works because vanadium can shift between +5 and +4 oxidation states', 'V₂O₅ provides a surface for adsorption only', 'vanadium goes from +5 to +3', 'variable oxidation states'],
                  hint: 'If stuck, immediately review the oxidation state table (NCERT Table 4.3) and the electronic.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' },
                { id: 'b', prompt: 'The reaction 2I⁻ + S₂O₈²⁻ → I₂ + 2SO₄²⁻ is catalyzed by Fe³⁺ ions.', answer: 'Step 1: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe³⁺ reduced to Fe²⁺)',
                  options: ['Step 1: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe³⁺ reduced to Fe²⁺)', 'variable oxidation states', 'writes Fe³⁺ → Fe⁰ or Fe⁴⁺ shows misunderstanding of common iron oxidation states', 'omits the regeneration step fails to show the catalytic cycle'],
                  hint: 'If stuck, immediately review the oxidation state table (NCERT Table 4.3) and the electronic.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' },
                { id: 'c', prompt: 'Compare the catalytic action of finely divided iron in the Haber Process (N₂ + 3H₂ ⇌ 2NH₃) with that of nickel in the hydrogenation of ethene (C₂H₄ + H₂ →.', answer: 'Similarity: Both use surface adsorption',
                  options: ['Similarity: Both use surface adsorption', 'both work by changing oxidation state', 'variable oxidation states'],
                  hint: 'If stuck, immediately review the oxidation state table (NCERT Table 4.3) and the electronic.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' }
          ],
            remediations: { 'catalytic-activity-arises-from-only': { steps: ['If a student cannot list all three catalytic factors or write a catalytic cycle: (1) Revisit c12_chem_cbse_04_002.', '(2) Revisit c12_chem_cbse_04_004 (Oxidation States) to practice writing half-reactions for common couples (Fe³⁺/Fe²⁺.', '(3) Do a hands-on activity: use a magnetic stirrer bar (Fe/steel) in a solution of H₂O₂ with a drop of FeCl₃ — observe.', 'Discuss why Fe works and Zn doesn\'t.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
