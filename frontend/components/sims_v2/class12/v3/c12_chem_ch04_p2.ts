import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch04_p2: SimDef = {
    id: 'v3_c12_chem_ch04_p2',
    title: 'd and f Block Elements · Part 2/2',
    subtitle: 'Zinc is in the club\'s address but not on the member list',
    classLevel: 12, subject: 'chemistry', topic: 'd and f Block Elements · Part 2/2',
    chapters: ['c12_chem_ch04'],
    nodeIds: ['c12_chem_cbse_04_007', 'c12_chem_cbse_04_008', 'c12_chem_cbse_04_009', 'c12_chem_cbse_04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Inorganic chemist', intro: 'Iron, copper, gold — the metals that built civilisation all live in one crowded block. Their secrets are written in d orbitals.', goal: 'Locate the d- and f-blocks, apply the IUPAC transition-element definition, and write general and exceptional electronic configurations.' },
    discovery: {
        question: 'Zinc sits squarely in the d-block, yet chemists refuse to call it a transition metal. What disqualifies it?',
        options: ['IUPAC demands an incomplete d subshell in the atom or its common ions — zinc is d¹⁰ in both, so no d–d transitions, no colour', 'Nothing — every d-block element is a transition metal', 'Zinc is too reactive to count', 'Zinc\'s electrons are in the wrong period'],
        answer: 'IUPAC demands an incomplete d subshell in the atom or its common ions — zinc is d¹⁰ in both, so no d–d transitions, no colour',
        hook: '\'d-block\' and \'transition element\' are not synonyms — the definition is about the electrons, not the postcode. A full d¹⁰ subshell means no variable oxidation states and colourless compounds, which is exactly why Zn²⁺ solutions are clear.',
    },
    teaching: [
        { title: 'Importance and Uses of Transition Elements', text: 'Transition elements (d-block) and inner transition elements (f-block) are crucial for modern civilization due to their unique properties like variable oxidation states, catalytic activity, alloy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_04_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Read the periodic table\'s crowded centre like a map: place the four transition series, apply the IUPAC test to any element, explain the Cr and Cu configuration rebels, then track why these metals colour gems and power catalysts.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_007', title: 'Importance and Uses of Transition Elements',
          caseStudy: { intro: 'Look around your kitchen: the stainless steel utensil (Fe-Cr-Ni alloy), the battery in your remote (Zn/Ni-Cd), the catalyst in your car\'s catalytic converter.',
            decisions: [{ prompt: 'Name three transition metals used as catalysts in industrial processes and write the name of the process for each.', options: [
                { text: 'Correct answer: Vanadium(V) oxide (V₂O₅) in the Contact process for H₂SO₄', outcome: 'Correct answer: Vanadium(V) oxide (V₂O₅) in the Contact process for H₂SO₄; Iron (Fe) in the Haber.' },
                { text: 'all transition metals are good catalysts', outcome: 'Not quite — Students often think "all transition metals are good catalysts" and write generic statements like.', reveals: 'all-transition-metals-are-good' },
                { text: 'Fe catalyzes all reactions', outcome: 'Not quite — Students often think "all transition metals are good catalysts" and write generic statements like.', reveals: 'all-transition-metals-are-good' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_008', title: 'Lanthanoids: Electronic Configuration and Oxidation States',
          scaffold: { problem: 'A sample of mischmetal contains 50% Ce, 25% La, and 25% other lanthanoids by mass.',
            steps: [
            { text: 'Identify reacting components — La and Ce both form +3 ions: 2Ln + 6H⁺ → 2Ln³⁺ + 3H₂.' },
            { text: 'Calculate moles of each metal. Moles La = 2.5/138.9 = 0.0180 mol. Moles Ce = 5.0/140.1 = 0.0357 mol.' },
            { text: 'Total moles of Ln = 0.0180 + 0.0357 = 0.0537 mol. From stoichiometry, 2 mol Ln produce 3 mol H₂, so moles H₂ = (3/2).' },
            { text: 'Volume at STP = moles × 22.4 L/mol = 0.08055 × 22.4 = 1.804 L.' },
            { text: 'Verify — both metals are electropositive (E° ≈ -2.3 V), so reaction with dilute acid is feasible.', faded: true, blankAnswer: '1.80 L of H₂ gas at STP' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_009', title: 'Lanthanoid Contraction: Causes and Consequences',
          scaffold: { problem: 'The metallic radius of Zr is 160 pm and that of Hf is 159 pm. Without lanthanoid contraction, Hf would be expected to be ~15% larger than.',
            steps: [
            { text: 'Identify the baseline — Zr radius = 160 pm. Normal group trend: radius increases ~15% down a group (from Period 5 to 6).' },
            { text: 'Calculate expected Hf radius without contraction: Expected r(Hf) = 160 pm × 1.15 = 184 pm.' },
            { text: 'Actual Hf radius = 159 pm (given). Lanthanoid contraction magnitude = Expected − Actual = 184 − 159 = 25 pm.' },
            { text: 'Percentage cancelled = (Contraction magnitude / Expected increase) × 100 = (25 / 24) × 100 ≈ 104%.' },
            { text: 'Interpret: The contraction not only cancels the normal size increase but slightly overcompensates, making Hf marginally.', faded: true, blankAnswer: '(a) 184 pm, (b) 25 pm, (c) ~104% (contraction slightly.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_010', title: 'Actinoids: General Characteristics',
          caseStudy: { intro: 'Begin with a real-world observation: a smoke detector in an Indian home contains Americium-241 (an actinoid) that emits alpha particles to ionise air — when.',
            decisions: [{ prompt: 'State the general electronic configuration of actinoid atoms and identify which two orbitals show variable occupancy across the series.', options: [
                { text: 'The general electronic configuration of actinoid atoms is [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²', outcome: 'The general electronic configuration of actinoid atoms is [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s².' },
                { text: 'only 5f varies', outcome: 'Not quite — Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation.', reveals: 'students-often-write-actinoids-are' },
                { text: '7s varies', outcome: 'Not quite — Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation.', reveals: 'students-often-write-actinoids-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Filling a periodic-table worksheet, a student writes: \'Zn is in the d-block and forms compounds, so it\'s a transition element like the rest.\'',
            decisions: [{ prompt: 'Does Zn actually qualify as a transition element?', options: [
                { text: 'No — the IUPAC test is an incomplete d subshell in the neutral atom or any common ion; Zn is 3d¹⁰ both ways and Zn²⁺ is colourless, so it\'s d-block but not transition.', outcome: 'Block membership follows the subshell being filled; transition status needs an incomplete d — the categories aren\'t identical, and Cu scrapes in only via Cu²⁺ (3d⁹).' },
                { text: 'Yes — anything sitting inside the d-block is by definition a transition element.', outcome: 'That erases the Group 12 exception: Zn, Cd and Hg fill d¹⁰ in atom and ion alike and fail the IUPAC criterion.', reveals: 'dblock-equals-transition' },
                { text: 'Yes — and its compounds are coloured, which proves transition behaviour.', outcome: 'Zn²⁺ (d¹⁰) has no d–d transitions available, so its compounds are typically colourless — the cited evidence is also wrong.', reveals: 'zinc-compounds-coloured' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_04_010', title: 'You made it',
          caseStudy: { intro: 'You can now defend why iron is a transition metal and zinc isn\'t — with the orbital reasoning examiners want. This chapter is the key to inorganic chemistry\'s highest-weight questions.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_007', difficulty: 'standard',
          question: 'Transition elements (d-block) and inner transition elements (f-block) are.',
          hint: 'If stuck, review the redox cycle for V₂O₅ in Contact process (node 006) and the alloy.',
          misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all.',
          parts: [
                { id: 'a', prompt: 'Name three transition metals used as catalysts in industrial processes and write the name of the process for each.', answer: 'Correct answer: Vanadium(V) oxide (V₂O₅) in the Contact process for H₂SO₄',
                  options: ['Correct answer: Vanadium(V) oxide (V₂O₅) in the Contact process for H₂SO₄', 'all transition metals are good catalysts', 'Fe catalyzes all reactions', 'Cu for Haber process'],
                  hint: 'If stuck, review the redox cycle for V₂O₅ in Contact process (node 006) and the alloy formation.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' },
                { id: 'b', prompt: 'A sample of mischmetal contains 95% lanthanoid metal (mainly Ce and La) and 5% iron with traces of S, C, Ca, Al.', answer: 'Step 1: Mass of lanthanoid metal = 95% of 2.5 kg = 0.95 × 2500 g = 2375 g',
                  options: ['Step 1: Mass of lanthanoid metal = 95% of 2.5 kg = 0.95 × 2500 g = 2375 g', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'If stuck, review the redox cycle for V₂O₅ in Contact process (node 006) and the alloy formation.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' }
          ],
            remediations: { 'all-transition-metals-are-good': { steps: ['Revisit node c12_chem_cbse_04_006 (Catalytic Activity) and write the two-step redox cycle for V₂O₅ in Contact process.', 'Make a table: Catalyst | Process | Oxidation State Change | Why this metal?', 'Practice NCERT Intext Question 4.6 and Exercise 4.11(iv) with the redox-cycle reasoning.', 'Re-attempt Diagnostic Question 1 and 2 with this table.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Silver and gold are still widely used as coinage metals in modern currency." Provide evidence from current Indian coinage to support.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'True, because they are coinage metals', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'If stuck, review the redox cycle for V₂O₅ in Contact process (node 006) and the alloy formation.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' },
                { id: 'b', prompt: 'Design a simple experiment to demonstrate that transition metal ions (e.g., Cu²⁺, Fe³⁺) can catalyze the decomposition of hydrogen peroxide, while.', answer: 'Procedure: Take three test tubes with 5 mL H₂O₂ (2%) each',
                  options: ['Procedure: Take three test tubes with 5 mL H₂O₂ (2%) each', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'If stuck, review the redox cycle for V₂O₅ in Contact process (node 006) and the alloy formation.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' }
          ],
            remediations: { 'all-transition-metals-are-good': { steps: ['Revisit node c12_chem_cbse_04_006 (Catalytic Activity) and write the two-step redox cycle for V₂O₅ in Contact process.', 'Make a table: Catalyst | Process | Oxidation State Change | Why this metal?', 'Practice NCERT Intext Question 4.6 and Exercise 4.11(iv) with the redox-cycle reasoning.', 'Re-attempt Diagnostic Question 1 and 2 with this table.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_008', difficulty: 'standard',
          question: 'Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71).',
          hint: 'Revisit c11_chem_cbse_02_015 (Aufbau), c11_chem_cbse_02_017 (Hund\'s rule, exchange.',
          misconception: 'Students write the electronic configuration of lanthanoid atoms by filling 4f before 5d for all elements (e.g., Gd.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71) in',
                  options: ['Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71) in', 'The d-block elements occupy Groups 3–12 of the modern periodic table, where the (n−1)d', 'The d-block elements (Groups 3–12) are those in', 'Atomic radius of a transition element is the distance from the nucleus to the outermost'],
                  hint: 'Revisit c11_chem_cbse_02_015 (Aufbau), c11_chem_cbse_02_017 (Hund\'s rule, exchange energy), and.',
                  misconception: 'Students write the electronic configuration of lanthanoid atoms by filling 4f before 5d for all elements (e.g., Gd as [Xe] 4f⁸ 6s², Lu.' }
          ],
            remediations: { 'students-write-the-electronic-configuration': { steps: ['If a student writes incorrect configurations: (1) Revisit c11_chem_cbse_02_015 (Aufbau principle) and.', '(2) Draw the 4f, 5d, 6s orbital energy diagram for Z=57-71 showing near-degeneracy.', '(3) Practice writing configurations for La, Ce, Gd, Lu using the "f⁰, f⁷, f¹⁴ stability" rule.', '(4) Re-diagnostic: Ask for configurations of Pr (Z=59), Tb (Z=65), Tm (Z=69) and their +3 ions.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_009', difficulty: 'standard',
          question: 'Lanthanoid contraction is the steady decrease in atomic and ionic radii of the.',
          hint: 'If stuck on shielding argument: Revisit c11_chem_cbse_02_014 (Shapes of Orbitals) — focus.',
          misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This.',
          parts: [
                { id: 'a', prompt: 'Given: Ionic radius of Zr⁴⁺ = 72 pm, Hf⁴⁺ = 71 pm. Without lanthanoid contraction, Hf⁴⁺ would be ~15% larger than Zr⁴⁺ (typical group trend).', answer: 'Expected Hf⁴⁺ radius without contraction = 72 pm × 1.15 = 82.8 pm',
                  options: ['Expected Hf⁴⁺ radius without contraction = 72 pm × 1.15 = 82.8 pm', 'lanthanoid contraction', 'decrease in size across a period'],
                  hint: 'If stuck on shielding argument: Revisit c11_chem_cbse_02_014 (Shapes of Orbitals) — focus on radial.',
                  misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is incomplete.' },
                { id: 'b', prompt: 'Compare the difficulty of separating Zr/Hf versus Nb/Ta. Which pair is harder to separate and why? Use ionic radii and charge density arguments.', answer: 'Zr/Hf separation is harder',
                  options: ['Zr/Hf separation is harder', 'both equally hard', 'lanthanoid contraction', 'decrease in size across a period'],
                  hint: 'If stuck on shielding argument: Revisit c11_chem_cbse_02_014 (Shapes of Orbitals) — focus on radial.',
                  misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is incomplete.' }
          ],
            remediations: { 'students-often-write-lanthanoid-contraction': { steps: ['If the student cannot articulate the shielding mechanism: (1) Revisit c11_chem_cbse_02_013 (Quantum Numbers) and.', '(2) Revisit c11_chem_cbse_03_006 (Atomic Radius Trends) — plot radii of Groups 4, 5, 6 for 3d, 4d, 5d series; identify.', '(3) Re-diagnostic: Ask them to explain why Ce⁴⁺ (4f⁰) is larger than Pr⁴⁺ (4f¹) despite higher Z — this forces.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_010', difficulty: 'standard',
          question: 'Actinoids are the 14 inner transition elements from Thorium (Z=90).',
          hint: 'If stuck, revisit c12_chem_cbse_04_009 for contraction concept and c12_chem_cbse_04_008.',
          misconception: 'Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation state and.',
          parts: [
                { id: 'a', prompt: 'State the general electronic configuration of actinoid atoms and identify which two orbitals show variable occupancy across the series.', answer: 'The general electronic configuration of actinoid atoms is [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²',
                  options: ['The general electronic configuration of actinoid atoms is [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²', 'only 5f varies', '7s varies'],
                  hint: 'If stuck, revisit c12_chem_cbse_04_009 for contraction concept and c12_chem_cbse_04_008 for f-block.',
                  misconception: 'Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation state and lanthanoid contraction.' },
                { id: 'b', prompt: 'For the actinoid series, the ionic radius of M³⁺ decreases from Ac³⁺ (111 pm) to Lr³⁺.', answer: 'Segment 1 (Ac→Pu): 12 pm / 5 steps = 2.4 pm per element',
                  options: ['Segment 1 (Ac→Pu): 12 pm / 5 steps = 2.4 pm per element', 'uniform contraction like lanthanoids'],
                  hint: 'If stuck, revisit c12_chem_cbse_04_009 for contraction concept and c12_chem_cbse_04_008 for f-block.',
                  misconception: 'Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation state and lanthanoid contraction.' }
          ],
            remediations: { 'students-often-write-actinoids-are': { steps: ['If the student holds the above misconception: (1) Revisit c12_chem_cbse_04_009 (Lanthanoid Contraction) and calculate.', '(2) Revisit c12_chem_cbse_04_008 (Lanthanoid Oxidation States) and list the +2/+4 exceptions (Eu²⁺, Yb²⁺, Ce⁴⁺, Tb⁴⁺).', '(3) Draw radial probability distribution curves for 4f vs 5f (qualitative) to visualise why 5f extends further.', '(4) Re-attempt Diagnostic Question 4 with the orbital energy diagram from NCERT Fig.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
