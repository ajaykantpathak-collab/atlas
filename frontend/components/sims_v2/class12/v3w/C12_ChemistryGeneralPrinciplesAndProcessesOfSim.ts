import type { SimDef } from '../../engine/types';
import C12_ChemistryGeneralPrinciplesAndProcessesOfSim from '../../../simulations/c6_12/C12_ChemistryGeneralPrinciplesAndProcessesOfSim';

/** v3 wrapped master — C12_ChemistryGeneralPrinciplesAndProcessesOfSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrygeneralprinciplesandprocessesofsim: SimDef = {
    id: 'v3w_c12_chemistrygeneralprinciplesandprocessesofsim',
    title: 'General Principles And Processes Of',
    subtitle: 'This node covers only the electronic configurations of neutral d-block atoms and their.',
    classLevel: 12, subject: 'chemistry', topic: 'Electronic Configuration of d-Block Elements',
    chapters: [],
    nodeIds: ['c12_chem_cbse_04_002', 'c12_chem_cbse_04_006', 'c12_chem_cbse_04_007', 'c12_chem_cbse_04_001', 'c12_chem_cbse_04_008', 'c12_chem_cbse_04_010', 'c12_chem_cbse_09_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a real-world observation: a student notices that chromium (Cr) in stainless steel utensils and.', goal: 'Master General Principles And Processes Of.' },
    discovery: {
        question: 'Evaluate the following statement: "Zinc (Zn, Z = 30) is a transition element because it is in the d-block and has electrons in the d orbital." Is this.',
        options: ['The statement is INCORRECT', 'd-block', 'transition element'],
        answer: 'The statement is INCORRECT',
        hook: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but.',
    },
    teaching: [
        { title: 'The d-block elements (Groups 3–12) are those.', text: 'The d-block elements (Groups 3–12) are those in which the (n−1)d orbitals are progressively filled across four long periods (3d, 4d, 5d, 6d).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_002', title: 'The d-block elements (Groups 3–12) are.',
          scaffold: { problem: 'Write the ground-state electronic configurations of (i) Chromium (Z = 24), (ii) Copper (Z = 29), and (iii) Palladium (Z = 46).',
            steps: [
            { text: 'Identify the series and principal quantum numbers. Cr and Cu are 3d series (n=4, so (n−1)=3).' },
            { text: 'Write the expected configuration using strict Aufbau order (1s² 2s² 2p² 3s² 3p² 4s² 3d¹⁰...).' },
            { text: 'Apply the exception rule — half-filled (d⁵) and fully-filled (d¹⁰) d subshells have extra stability due to exchange.' },
            { text: 'For Cr: 3d⁴4s² → promote one 4s electron to 3d → 3d⁵4s¹ (half-filled d⁵ achieved).' },
            { text: 'Write final configurations with noble gas core: Cr = [Ar] 3d⁵4s¹, Cu = [Ar] 3d¹⁰4s¹, Pd = [Kr] 4d¹⁰5s⁰.', faded: true, blankAnswer: '(i) Cr: [Ar] 3d⁵4s¹ (ii) Cu: [Ar] 3d¹⁰4s¹ (iii) Pd: [Kr].' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_006', title: 'Catalytic activity of transition metals.',
          scaffold: { problem: 'In the Contact Process for sulfuric acid, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.',
            steps: [
            { text: 'Identify the overall reaction: 2SO₂(g) + O₂(g) ⇌ 2SO₃(g). The catalyst must facilitate O₂ activation and SO₂ oxidation.' },
            { text: 'Recall vanadium\'s common oxidation states: +5 (in V₂O₅), +4 (in VO₂/V₂O₄), +3, +2. The +5/+4 couple is most accessible.' },
            { text: 'Write the reduction half-reaction: V₂O₅ + SO₂ → V₂O₄ + SO₃. Balance oxygen: V₂O₅ + SO₂ → V₂O₄ + SO₃ (balanced).' },
            { text: 'Write the re-oxidation half-reaction: V₂O₄ + ½O₂ → V₂O₅. Vanadium goes from +4 back to +5. Catalyst regenerated.' },
            { text: 'Explain preference: V₂O₅ has high surface area, the +5/+4 redox potential matches the SO₂/SO₃ couple, and it forms a.', faded: true, blankAnswer: 'Cycle:' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_007', title: 'Transition elements (d-block) and inner.',
          scaffold: { problem: 'In the Contact process for sulfuric acid production, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.',
            steps: [
            { text: 'Identify the half-reactions. Oxidation: SO₂ + 2H₂O → SO₄²⁻ + 4H⁺ + 2e⁻ (E° = -0.17 V).' },
            { text: 'Balance electrons. Multiply reduction half-reaction by 2: 2VO₂⁺ + 4H⁺ + 2e⁻ → 2VO²⁺ + 2H₂O.' },
            { text: 'Add half-reactions: SO₂ + 2VO₂⁺ + 2H₂O → SO₄²⁻ + 2VO²⁺ + 4H⁺. This is the catalytic cycle: V⁵⁺ (VO₂⁺) is reduced to V⁴⁺.' },
            { text: 'Calculate E°cell = E°cathode - E°anode = 0.34 - 0.17 = +0.17 V. Positive E°cell means spontaneous.' },
            { text: 'Fe₂O₃ would involve Fe³⁺/Fe²⁺ couple (E° = +0.77 V). The Fe³⁺/Fe²⁺ potential is too high, making Fe³⁺ a stronger.', faded: true, blankAnswer: 'Redox cycle: V⁵⁺ + e⁻ → V⁴⁺ (by SO₂); V⁴⁺ → V⁵⁺ + e⁻ (by.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_001', title: 'The d-block elements occupy Groups 3–12.',
          scaffold: { problem: 'A student is given the atomic numbers of four elements: Sc (21), Cu (29), Zn (30), Ga (31).',
            steps: [
            { text: 'Locate each element on the periodic table. Sc (Group 3, Period 4), Cu (Group 11, Period 4), Zn (Group 12, Period 4), Ga.' },
            { text: 'Write the ground-state outer electronic configuration for each.' },
            { text: 'Identify common oxidation states and ion configurations. Sc commonly forms Sc³⁺ ([Ar] 3d⁰); Cu forms Cu⁺ ([Ar] 3d¹⁰).' },
            { text: 'Apply IUPAC definition — "incomplete d subshell in neutral atom **or** common ions".' },
            { text: 'Conclude and tabulate. d-block: Sc, Cu, Zn. Transition: Sc, Cu. Not transition: Zn (d-block but d¹⁰), Ga (p-block).', faded: true, blankAnswer: 'd-block elements: Sc, Cu, Zn. Transition elements: Sc, Cu..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_008', title: 'Lanthanoids are the 14 elements from.',
          scaffold: { problem: 'A sample of mischmetal contains 50% Ce, 25% La, and 25% other lanthanoids by mass.',
            steps: [
            { text: 'Identify reacting components — La and Ce both form +3 ions: 2Ln + 6H⁺ → 2Ln³⁺ + 3H₂.' },
            { text: 'Calculate moles of each metal. Moles La = 2.5/138.9 = 0.0180 mol. Moles Ce = 5.0/140.1 = 0.0357 mol.' },
            { text: 'Total moles of Ln = 0.0180 + 0.0357 = 0.0537 mol. From stoichiometry, 2 mol Ln produce 3 mol H₂, so moles H₂ = (3/2) ×.' },
            { text: 'Volume at STP = moles × 22.4 L/mol = 0.08055 × 22.4 = 1.804 L.' },
            { text: 'Verify — both metals are electropositive (E° ≈ -2.3 V), so reaction with dilute acid is feasible.', faded: true, blankAnswer: '1.80 L of H₂ gas at STP' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_010', title: 'Actinoids are the 14 inner transition.',
          scaffold: { problem: 'Uranium (Z=92) forms the uranyl ion UO₂²⁺ in aqueous solution. Write the electronic configuration of U atom and U⁶⁺ in UO₂²⁺.',
            steps: [
            { text: 'Identify the atomic number of U (92) and its position in actinoid series (4th element after Ac).' },
            { text: 'Write the ground state configuration of U atom: [Rn] 5f³ 6d¹ 7s² (from NCERT Table 4.10).' },
            { text: 'For U⁶⁺ in UO₂²⁺, remove six electrons. Remove 7s² first, then 6d¹, then three 5f electrons → configuration becomes.' },
            { text: 'Compare with Nd (Z=60, 4th lanthanoid). Nd atom: [Xe] 4f⁴ 6s².' },
            { text: 'Conclude: U achieves +6 because 5f electrons are higher in energy (less tightly held) and can be ionised; 5f also.', faded: true, blankAnswer: 'U atom: [Rn] 5f³ 6d¹ 7s²; U⁶⁺ in UO₂²⁺: [Rn] 5f⁰. U.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_chem_cbse_04_006', title: 'Identify each idea',
          dissect: { specimen: 'General Principles And Processes Of', spots: [
            { id: 's1', label: 'The d-block elements Groups 312', prompt: 'Which idea is this? — The d-block elements (Groups 3–12) are those in which the (n−1)d orbitals are.', answer: 'The d-block elements Groups 312', options: ['The d-block elements Groups 312', 'Catalytic activity of transition metals', 'Transition elements d-block and inner', 'The d-block elements occupy Groups'] },
            { id: 's2', label: 'Catalytic activity of transition metals', prompt: 'Which idea is this? — Catalytic activity of transition metals refers to their ability to accelerate chemical.', answer: 'Catalytic activity of transition metals', options: ['Catalytic activity of transition metals', 'The d-block elements Groups 312', 'Transition elements d-block and inner', 'The d-block elements occupy Groups'] },
            { id: 's3', label: 'Transition elements d-block and inner', prompt: 'Which idea is this? — Transition elements (d-block) and inner transition elements (f-block) are crucial for.', answer: 'Transition elements d-block and inner', options: ['Transition elements d-block and inner', 'The d-block elements Groups 312', 'Catalytic activity of transition metals', 'The d-block elements occupy Groups'] },
            { id: 's4', label: 'The d-block elements occupy Groups', prompt: 'Which idea is this? — The d-block elements occupy Groups 3–12 of the modern periodic table, where the (n−1)d.', answer: 'The d-block elements occupy Groups', options: ['The d-block elements occupy Groups', 'The d-block elements Groups 312', 'Catalytic activity of transition metals', 'Transition elements d-block and inner'] },
            { id: 's5', label: 'Lanthanoids are the 14 elements', prompt: 'Which idea is this? — Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71) in which.', answer: 'Lanthanoids are the 14 elements', options: ['Lanthanoids are the 14 elements', 'The d-block elements Groups 312', 'Catalytic activity of transition metals', 'Transition elements d-block and inner'] },
            { id: 's6', label: 'Actinoids are the 14 inner', prompt: 'Which idea is this? — Actinoids are the 14 inner transition elements from Thorium (Z=90) to Lawrencium (Z=103).', answer: 'Actinoids are the 14 inner', options: ['Actinoids are the 14 inner', 'The d-block elements Groups 312', 'Catalytic activity of transition metals', 'Transition elements d-block and inner'] }
          ] } }
    ],
    explore: { component: C12_ChemistryGeneralPrinciplesAndProcessesOfSim, prompt: 'Explore the interactive — General Principles And Processes Of' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_002', difficulty: 'standard',
          question: 'The d-block elements (Groups 3–12) are those in which the (n−1)d orbitals are.',
          hint: 'If stuck, revisit c11_chem_cbse_02_015 (Aufbau Principle) and c11_chem_cbse_02_017.',
          misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but.',
          parts: [
                { id: 'a', prompt: 'Compare the electronic configurations of the 3d, 4d, and 5d series elements in Group 6 (Cr, Mo, W).', answer: 'Cr: [Ar] 3d⁵4s¹ (half-filled d⁵ stability)',
                  options: ['Cr: [Ar] 3d⁵4s¹ (half-filled d⁵ stability)', 'all Group 6 elements have d⁵s¹'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but the actual ground.' }
          ],
            remediations: { 'students-write-the-electronic-configuration': { steps: ['If a student cannot correctly write configurations with exceptions: (1) Revisit c11_chem_cbse_02_015 (Aufbau Principle).', '(2) Memorise the three "must-know" exceptions: Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), Pd (4d¹⁰5s⁰).', '(3) Practice writing M²⁺ and M³⁺ configurations for all 3d metals using the "remove ns first" rule; verify with Table.', '(4) Re-diagnostic: Ask the student to write configurations for Mo (Z=42), Ag (Z=47), and Pt (Z=78) and identify which.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Zinc (Zn, Z = 30) is a transition element because it is in the d-block and has electrons in the d orbital." Is this.', answer: 'The statement is INCORRECT',
                  options: ['The statement is INCORRECT', 'd-block', 'transition element'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but the actual ground.' },
                { id: 'b', prompt: 'Compare the electronic configurations of the 3d, 4d, and 5d series elements in Group 6 (Cr, Mo, W).', answer: 'Cr: [Ar] 3d⁵4s¹ (half-filled d⁵ stability)',
                  options: ['Cr: [Ar] 3d⁵4s¹ (half-filled d⁵ stability)', 'all Group 6 elements have d⁵s¹'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the electronic configuration of Pd (Z = 46) as [Kr] 4d⁸ 5s² by blindly following the Aufbau order, but the actual ground.' }
          ],
            remediations: { 'students-write-the-electronic-configuration': { steps: ['If a student cannot correctly write configurations with exceptions: (1) Revisit c11_chem_cbse_02_015 (Aufbau Principle).', '(2) Memorise the three "must-know" exceptions: Cr (3d⁵4s¹), Cu (3d¹⁰4s¹), Pd (4d¹⁰5s⁰).', '(3) Practice writing M²⁺ and M³⁺ configurations for all 3d metals using the "remove ns first" rule; verify with Table.', '(4) Re-diagnostic: Ask the student to write configurations for Mo (Z=42), Ag (Z=47), and Pt (Z=78) and identify which.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_006', difficulty: 'standard',
          question: 'Catalytic activity of transition metals refers to their ability to accelerate.',
          hint: 'If stuck, immediately review the oxidation state table (NCERT Table 4.3) and the.',
          misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and.',
          parts: [
                { id: 'a', prompt: 'In the Contact Process, V₂O₅ catalyzes the oxidation of SO₂ to SO₃.', answer: 'V₂O₅ works because vanadium can shift between +5 and +4 oxidation states',
                  options: ['V₂O₅ works because vanadium can shift between +5 and +4 oxidation states', 'V₂O₅ provides a surface for adsorption only', 'vanadium goes from +5 to +3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' },
                { id: 'b', prompt: 'The reaction 2I⁻ + S₂O₈²⁻ → I₂ + 2SO₄²⁻ is catalyzed by Fe³⁺ ions.', answer: 'Step 1: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe³⁺ reduced to Fe²⁺)',
                  options: ['Step 1: 2Fe³⁺ + 2I⁻ → 2Fe²⁺ + I₂ (Fe³⁺ reduced to Fe²⁺)', 'variable oxidation states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' },
                { id: 'c', prompt: 'Compare the catalytic action of finely divided iron in the Haber Process (N₂ + 3H₂ ⇌ 2NH₃) with that of nickel in the hydrogenation of ethene (C₂H₄ + H₂ →.', answer: 'Similarity: Both use surface adsorption',
                  options: ['Similarity: Both use surface adsorption', 'both work by changing oxidation state', 'variable oxidation states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' }
          ],
            remediations: { 'catalytic-activity-arises-from-only': { steps: ['If a student cannot list all three catalytic factors or write a catalytic cycle: (1) Revisit c12_chem_cbse_04_002.', '(2) Revisit c12_chem_cbse_04_004 (Oxidation States) to practice writing half-reactions for common couples (Fe³⁺/Fe²⁺,.', '(3) Do a hands-on activity: use a magnetic stirrer bar (Fe/steel) in a solution of H₂O₂ with a drop of FeCl₃ — observe.', 'Discuss why Fe works and Zn doesn\'t.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Zn²⁺ should be a good homogeneous catalyst because it\'s a d-block element." Evaluate this claim using the definition of transition metals.', answer: 'The claim is false',
                  options: ['The claim is false', 'Zn is a transition metal so it should work', 'Zn²⁺ is colourless', 'variable oxidation states'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe catalytic activity arises from ONLY one factor — typically "variable oxidation states" — and ignore the equally.' }
          ],
            remediations: { 'catalytic-activity-arises-from-only': { steps: ['If a student cannot list all three catalytic factors or write a catalytic cycle: (1) Revisit c12_chem_cbse_04_002.', '(2) Revisit c12_chem_cbse_04_004 (Oxidation States) to practice writing half-reactions for common couples (Fe³⁺/Fe²⁺,.', '(3) Do a hands-on activity: use a magnetic stirrer bar (Fe/steel) in a solution of H₂O₂ with a drop of FeCl₃ — observe.', 'Discuss why Fe works and Zn doesn\'t.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_007', difficulty: 'standard',
          question: 'Transition elements (d-block) and inner transition elements (f-block) are.',
          hint: 'If stuck, review the redox cycle for V₂O₅ in Contact process (node 006) and the alloy.',
          misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all.',
          parts: [
                { id: 'a', prompt: 'Name three transition metals used as catalysts in industrial processes and write the name of the process for each.', answer: 'Vanadium(V) oxide (V₂O₅) in the Contact process for H₂SO₄',
                  options: ['Correct answer: Vanadium(V) oxide (V₂O₅) in the Contact process for H₂SO₄', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' },
                { id: 'b', prompt: 'A sample of mischmetal contains 95% lanthanoid metal (mainly Ce and La) and 5% iron with traces of S, C, Ca, Al.', answer: 'Step 1: Mass of lanthanoid metal = 95% of 2.5 kg = 0.95 × 2500 g = 2375 g',
                  options: ['Step 1: Mass of lanthanoid metal = 95% of 2.5 kg = 0.95 × 2500 g = 2375 g', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' }
          ],
            remediations: { 'all-transition-metals-are-good': { steps: ['Revisit node c12_chem_cbse_04_006 (Catalytic Activity) and write the two-step redox cycle for V₂O₅ in Contact process.', 'Make a table: Catalyst | Process | Oxidation State Change | Why this metal?', 'Practice NCERT Intext Question 4.6 and Exercise 4.11(iv) with the redox-cycle reasoning.', 'Re-attempt Diagnostic Question 1 and 2 with this table.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Silver and gold are still widely used as coinage metals in modern currency." Provide evidence from current Indian coinage to support.', answer: 'The statement is partially incorrect',
                  options: ['The statement is partially incorrect', 'True, because they are coinage metals', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' },
                { id: 'b', prompt: 'Design a simple experiment to demonstrate that transition metal ions (e.g., Cu²⁺, Fe³⁺) can catalyze the decomposition of hydrogen peroxide, while a.', answer: 'Procedure: Take three test tubes with 5 mL H₂O₂ (2%) each',
                  options: ['Procedure: Take three test tubes with 5 mL H₂O₂ (2%) each', 'all transition metals are good catalysts', 'Fe catalyzes all reactions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "all transition metals are good catalysts" and write generic statements like "Fe catalyzes all reactions." The.' }
          ],
            remediations: { 'all-transition-metals-are-good': { steps: ['Revisit node c12_chem_cbse_04_006 (Catalytic Activity) and write the two-step redox cycle for V₂O₅ in Contact process.', 'Make a table: Catalyst | Process | Oxidation State Change | Why this metal?', 'Practice NCERT Intext Question 4.6 and Exercise 4.11(iv) with the redox-cycle reasoning.', 'Re-attempt Diagnostic Question 1 and 2 with this table.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_001', difficulty: 'standard',
          question: 'The d-block elements occupy Groups 3–12 of the modern periodic table, where the.',
          hint: 'If unable to write configurations or identify blocks, revisit **c11_chem_cbse_02_015**.',
          misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation.',
          parts: [
                { id: 'a', prompt: 'On the modern periodic table, the d-block elements are located in which groups and how many periods (rows) do they span?', answer: 'The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),',
                  options: ['The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),', 'Groups 1–10', 'three periods'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation states." **Why it\'s.' },
                { id: 'b', prompt: 'Compare the positions of the 3d, 4d, and 5d transition series in the periodic table.', answer: 'The 5d series is interrupted by the 4f lanthanoid series (Ce–Lu, Z=58–71)',
                  options: ['The 5d series is interrupted by the 4f lanthanoid series (Ce–Lu, Z=58–71)', '5d has more elements', 'lanthanoids are in the 5d series'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation states." **Why it\'s.' }
          ],
            remediations: { 'misconception-all-d-block-elements': { steps: ['If the student cannot distinguish d-block from transition elements or misapplies the IUPAC definition: 1.', 'Revisit **c11_chem_cbse_03_005** (Types of Elements: s, p, d, f Blocks) to reinforce block classification by subshell.', 'Revisit **c11_chem_cbse_02_015** (Aufbau Principle) to recall how 4s fills before 3d but 3d is the "inner" subshell for.', 'Do a **re-diagnostic**: Give three elements — Sc, Cu, Zn — and ask the student to (a) write ground-state configuration,.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation.',
          parts: [
                { id: 'a', prompt: 'Compare the positions of the 3d, 4d, and 5d transition series in the periodic table.', answer: 'The 5d series is interrupted by the 4f lanthanoid series (Ce–Lu, Z=58–71)',
                  options: ['The 5d series is interrupted by the 4f lanthanoid series (Ce–Lu, Z=58–71)', '5d has more elements', 'lanthanoids are in the 5d series'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation states." **Why it\'s.' }
          ],
            remediations: { 'misconception-all-d-block-elements': { steps: ['If the student cannot distinguish d-block from transition elements or misapplies the IUPAC definition: 1.', 'Revisit **c11_chem_cbse_03_005** (Types of Elements: s, p, d, f Blocks) to reinforce block classification by subshell.', 'Revisit **c11_chem_cbse_02_015** (Aufbau Principle) to recall how 4s fills before 3d but 3d is the "inner" subshell for.', 'Do a **re-diagnostic**: Give three elements — Sc, Cu, Zn — and ask the student to (a) write ground-state configuration,.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_008', difficulty: 'standard',
          question: 'Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71).',
          hint: 'Revisit c11_chem_cbse_02_015 (Aufbau), c11_chem_cbse_02_017 (Hund\'s rule, exchange.',
          misconception: 'Students write the electronic configuration of lanthanoid atoms by filling 4f before 5d for all elements (e.g., Gd as.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71) in',
                  options: ['Lanthanoids are the 14 elements from cerium (Ce, Z=58) to lutetium (Lu, Z=71) in', 'The d-block elements (Groups 3–12) are those in', 'Catalytic activity of transition metals refers to their ability to accelerate chemical', 'Transition elements (d-block) and inner transition elements (f-block) are crucial for'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write the electronic configuration of lanthanoid atoms by filling 4f before 5d for all elements (e.g., Gd as [Xe] 4f⁸ 6s², Lu as.' }
          ],
            remediations: { 'students-write-the-electronic-configuration': { steps: ['If a student writes incorrect configurations: (1) Revisit c11_chem_cbse_02_015 (Aufbau principle) and.', '(2) Draw the 4f, 5d, 6s orbital energy diagram for Z=57-71 showing near-degeneracy.', '(3) Practice writing configurations for La, Ce, Gd, Lu using the "f⁰, f⁷, f¹⁴ stability" rule.', '(4) Re-diagnostic: Ask for configurations of Pr (Z=59), Tb (Z=65), Tm (Z=69) and their +3 ions.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_010', difficulty: 'standard',
          question: 'Actinoids are the 14 inner transition elements from Thorium (Z=90) to.',
          hint: 'If stuck, revisit c12_chem_cbse_04_009 for contraction concept and c12_chem_cbse_04_008.',
          misconception: 'Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation state and.',
          parts: [
                { id: 'a', prompt: 'State the general electronic configuration of actinoid atoms and identify which two orbitals show variable occupancy across the series.', answer: 'The general electronic configuration of actinoid atoms is [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²',
                  options: ['The general electronic configuration of actinoid atoms is [Rn] 5f¹⁻¹⁴ 6d⁰⁻¹ 7s²', 'only 5f varies', '7s varies'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write: "Actinoids are just radioactive lanthanoids; they also show only +3 oxidation state and lanthanoid contraction.' }
          ],
            remediations: { 'students-often-write-actinoids-are': { steps: ['If the student holds the above misconception: (1) Revisit c12_chem_cbse_04_009 (Lanthanoid Contraction) and calculate.', '(2) Revisit c12_chem_cbse_04_008 (Lanthanoid Oxidation States) and list the +2/+4 exceptions (Eu²⁺, Yb²⁺, Ce⁴⁺, Tb⁴⁺) —.', '(3) Draw radial probability distribution curves for 4f vs 5f (qualitative) to visualise why 5f extends further.', '(4) Re-attempt Diagnostic Question 4 with the orbital energy diagram from NCERT Fig.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
