import type { SimDef } from '../../engine/types';
import C12_ChemistryTransitionmetalstrendsSim from '../../../simulations/c6_12/C12_ChemistryTransitionmetalstrendsSim';

/** v3 wrapped master — C12_ChemistryTransitionmetalstrendsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrytransitionmetalstrendssim: SimDef = {
    id: 'v3w_c12_chemistrytransitionmetalstrendssim',
    title: 'Transitionmetalstrends',
    subtitle: 'This node covers only the **position** of d- and f-block elements in the periodic table:.',
    classLevel: 12, subject: 'chemistry', topic: 'Position of d-Block Elements in Periodic Table',
    chapters: [],
    nodeIds: ['c12_chem_cbse_04_001', 'c12_chem_cbse_04_002', 'c12_chem_cbse_04_003', 'c12_chem_cbse_04_004', 'c12_chem_cbse_04_009', 'c12_chem_cbse_04_010', 'c12_chem_cbse_05_007', 'c12_chem_cbse_04_005', 'c12_chem_cbse_04_006', 'c12_chem_cbse_04_007', 'c12_chem_cbse_05_004', 'c12_chem_cbse_05_005', 'c12_chem_cbse_05_006', 'c12_chem_cbse_07_006', 'c12_chem_cbse_05_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Start with a familiar observation: the metallic objects around you — iron nails, copper wires, gold.', goal: 'Master Transitionmetalstrends.' },
    discovery: {
        question: 'On the modern periodic table, the d-block elements are located in which groups and how many periods (rows) do they span?',
        options: ['The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),', 'Groups 1–10', 'three periods'],
        answer: 'The d-block occupies Groups 3–12 and spans four periods (Periods 4, 5, 6, 7),',
        hook: '**Misconception**: "All d-block elements are transition elements, and all transition elements have variable oxidation.',
    },
    teaching: [
        { title: 'The d-block elements occupy Groups 3–12 of.', text: 'The d-block elements occupy Groups 3–12 of the modern periodic table, where the (n−1)d subshell is progressively filled across four long periods (3d, 4d, 5d, 6d).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_001', title: 'The d-block elements occupy Groups 3–12.',
          scaffold: { problem: 'A student is given the atomic numbers of four elements: Sc (21), Cu (29), Zn (30), Ga (31).',
            steps: [
            { text: 'Locate each element on the periodic table. Sc (Group 3, Period 4), Cu (Group 11, Period 4), Zn (Group 12, Period 4), Ga.' },
            { text: 'Write the ground-state outer electronic configuration for each.' },
            { text: 'Identify common oxidation states and ion configurations. Sc commonly forms Sc³⁺ ([Ar] 3d⁰); Cu forms Cu⁺ ([Ar] 3d¹⁰).' },
            { text: 'Apply IUPAC definition — "incomplete d subshell in neutral atom **or** common ions".' },
            { text: 'Conclude and tabulate. d-block: Sc, Cu, Zn. Transition: Sc, Cu. Not transition: Zn (d-block but d¹⁰), Ga (p-block).', faded: true, blankAnswer: 'd-block elements: Sc, Cu, Zn. Transition elements: Sc, Cu..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_002', title: 'The d-block elements (Groups 3–12) are.',
          scaffold: { problem: 'Write the ground-state electronic configurations of (i) Chromium (Z = 24), (ii) Copper (Z = 29), and (iii) Palladium (Z = 46).',
            steps: [
            { text: 'Identify the series and principal quantum numbers. Cr and Cu are 3d series (n=4, so (n−1)=3).' },
            { text: 'Write the expected configuration using strict Aufbau order (1s² 2s² 2p² 3s² 3p² 4s² 3d¹⁰...).' },
            { text: 'Apply the exception rule — half-filled (d⁵) and fully-filled (d¹⁰) d subshells have extra stability due to exchange.' },
            { text: 'For Cr: 3d⁴4s² → promote one 4s electron to 3d → 3d⁵4s¹ (half-filled d⁵ achieved).' },
            { text: 'Write final configurations with noble gas core: Cr = [Ar] 3d⁵4s¹, Cu = [Ar] 3d¹⁰4s¹, Pd = [Kr] 4d¹⁰5s⁰.', faded: true, blankAnswer: '(i) Cr: [Ar] 3d⁵4s¹ (ii) Cu: [Ar] 3d¹⁰4s¹ (iii) Pd: [Kr].' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_003', title: 'Atomic radius of a transition element.',
          scaffold: { problem: 'Using the concept of effective nuclear charge and shielding, explain why the atomic radius of Ti (Z=22) is smaller than that of Sc (Z=21),.',
            steps: [
            { text: 'Write the electronic configurations: Sc = [Ar] 3d¹4s², Ti = [Ar] 3d²4s², V = [Ar] 3d³4s².' },
            { text: 'Identify that in each step, nuclear charge increases by +1, and the added electron enters the 3d subshell.' },
            { text: 'Recognize that 3d electrons shield the 4s electrons poorly but not zero; each added 3d electron partially screens the.' },
            { text: 'The first 3d electron (Sc→Ti) experiences a large jump in effective nuclear charge because there was no 3d electron.' },
            { text: 'Conclude that the trend is a steady decrease but with diminishing increments due to increasing d-electron repulsion and.', faded: true, blankAnswer: 'Sc→Ti decrease = 17 pm; Ti→V decrease = 12 pm. The.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_004', title: 'Ionisation enthalpy of a transition.',
          scaffold: { problem: 'Using NCERT Table 4.2 data, explain why the third ionisation enthalpy of iron (2962 kJ mol⁻¹) is lower than that of manganese (3260 kJ.',
            steps: [
            { text: 'Write the electronic configurations of Fe and Mn atoms and their M²⁺ ions. Fe: [Ar] 3d⁶4s² → Fe²⁺: [Ar] 3d⁶.' },
            { text: 'Identify the electron removed in the third ionisation: Fe²⁺ (3d⁶) → Fe³⁺ (3d⁵); Mn²⁺ (3d⁵) → Mn³⁺ (3d⁴).' },
            { text: 'Recognise that Fe²⁺ loses a 3d electron to achieve the stable half-filled 3d⁵ configuration (Fe³⁺), gaining exchange.' },
            { text: 'Conclude that the third ionisation enthalpy is lower for Fe because the product (Fe³⁺, d⁵) is stabilised by exchange.' },
            { text: 'Verify with data: ΔH₃(Fe) = 2962 kJ mol⁻¹ < ΔH₃(Mn) = 3260 kJ mol⁻¹.', faded: true, blankAnswer: 'ΔH₃(Fe) < ΔH₃(Mn) because Fe²⁺ (d⁶) → Fe³⁺ (d⁵) gains.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_04_009', title: 'Lanthanoid contraction is the steady.',
          scaffold: { problem: 'The metallic radius of Zr is 160 pm and that of Hf is 159 pm. Without lanthanoid contraction, Hf would be expected to be ~15% larger than.',
            steps: [
            { text: 'Identify the baseline — Zr radius = 160 pm. Normal group trend: radius increases ~15% down a group (from Period 5 to 6).' },
            { text: 'Calculate expected Hf radius without contraction: Expected r(Hf) = 160 pm × 1.15 = 184 pm.' },
            { text: 'Actual Hf radius = 159 pm (given). Lanthanoid contraction magnitude = Expected − Actual = 184 − 159 = 25 pm.' },
            { text: 'Percentage cancelled = (Contraction magnitude / Expected increase) × 100 = (25 / 24) × 100 ≈ 104%.' },
            { text: 'Interpret: The contraction not only cancels the normal size increase but slightly overcompensates, making Hf marginally.', faded: true, blankAnswer: '(a) 184 pm, (b) 25 pm, (c) ~104% (contraction slightly.' }
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
        { type: 'dissect', nodeId: 'c12_chem_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Transitionmetalstrends', spots: [
            { id: 's1', label: 'The d-block elements occupy Groups', prompt: 'Which idea is this? — The d-block elements occupy Groups 3–12 of the modern periodic table, where the (n−1)d.', answer: 'The d-block elements occupy Groups', options: ['The d-block elements occupy Groups', 'The d-block elements Groups 312', 'Atomic radius of a transition', 'Ionisation enthalpy of a transition'] },
            { id: 's2', label: 'The d-block elements Groups 312', prompt: 'Which idea is this? — The d-block elements (Groups 3–12) are those in which the (n−1)d orbitals are.', answer: 'The d-block elements Groups 312', options: ['The d-block elements Groups 312', 'The d-block elements occupy Groups', 'Atomic radius of a transition', 'Ionisation enthalpy of a transition'] },
            { id: 's3', label: 'Atomic radius of a transition', prompt: 'Which idea is this? — Atomic radius of a transition element is the distance from the nucleus to the outermost.', answer: 'Atomic radius of a transition', options: ['Atomic radius of a transition', 'The d-block elements occupy Groups', 'The d-block elements Groups 312', 'Ionisation enthalpy of a transition'] },
            { id: 's4', label: 'Ionisation enthalpy of a transition', prompt: 'Which idea is this? — Ionisation enthalpy of a transition element is the energy required to remove the most.', answer: 'Ionisation enthalpy of a transition', options: ['Ionisation enthalpy of a transition', 'The d-block elements occupy Groups', 'The d-block elements Groups 312', 'Atomic radius of a transition'] },
            { id: 's5', label: 'Lanthanoid contraction is the steady', prompt: 'Which idea is this? — Lanthanoid contraction is the steady decrease in atomic and ionic radii of the lanthanoid.', answer: 'Lanthanoid contraction is the steady', options: ['Lanthanoid contraction is the steady', 'The d-block elements occupy Groups', 'The d-block elements Groups 312', 'Atomic radius of a transition'] },
            { id: 's6', label: 'Actinoids are the 14 inner', prompt: 'Which idea is this? — Actinoids are the 14 inner transition elements from Thorium (Z=90) to Lawrencium (Z=103).', answer: 'Actinoids are the 14 inner', options: ['Actinoids are the 14 inner', 'The d-block elements occupy Groups', 'The d-block elements Groups 312', 'Atomic radius of a transition'] }
          ] } }
    ],
    explore: { component: C12_ChemistryTransitionmetalstrendsSim, prompt: 'Explore the interactive — Transitionmetalstrends' },
    challenges: [
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
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_003', difficulty: 'standard',
          question: 'Atomic radius of a transition element is the distance from the nucleus to the.',
          hint: 'Revisit Class 11 periodic trends (atomic radius across period) and the concept that.',
          misconception: 'Students often think that because Cr has configuration 3d⁵4s¹ (half-filled d-subshell), its atomic radius should be.',
          parts: [
                { id: 'a', prompt: 'State the general trend in atomic radii across the first transition series (Sc to Zn) and give the primary reason for this trend.', answer: 'Atomic radii decrease gradually from Sc to Zn',
                  options: ['Atomic radii decrease gradually from Sc to Zn', 'radius increases'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that because Cr has configuration 3d⁵4s¹ (half-filled d-subshell), its atomic radius should be larger than V due to.' }
          ],
            remediations: { 'because-cr-has-configuration-3d': { steps: ['If a student exhibits this misconception: (1) Show them the actual metallic radii from Table 4.2: V=135 pm, Cr=129 pm,.', '(2) Ask them to plot these three points and observe the dip at Cr, not a peak.', '(3) Explain that exchange energy stabilizes the electron configuration (lowers energy) but does not push electrons.', '(4) Assign a re-diagnostic: "Predict the order of metallic radii for Fe, Co, Ni, Cu, Zn and check against Table 4.2."'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_004', difficulty: 'standard',
          question: 'Ionisation enthalpy of a transition element is the energy required to remove.',
          hint: 'If stuck, review the electron-filling order for 3d series (c12_chem_cbse_04_002) and the.',
          misconception: 'Students write "ionisation enthalpy increases across the period because nuclear charge increases" and apply this.',
          parts: [
                { id: 'a', prompt: 'Explain why the second ionisation enthalpy of chromium (1592 kJ mol⁻¹) is unusually high compared to its neighbours vanadium (1414 kJ mol⁻¹) and manganese.', answer: 'Cr has ground-state configuration 3d⁵4s¹',
                  options: ['Cr has ground-state configuration 3d⁵4s¹', 'increasing nuclear charge only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write "ionisation enthalpy increases across the period because nuclear charge increases" and apply this uniformly to both.' }
          ],
            remediations: { 'students-write-ionisation-enthalpy-increases': { steps: ['Revisit **c11_chem_cbse_03_008** (Trends: Ionisation Enthalpy) to refresh the definition and main-group trend.', 'Revisit **c11_chem_cbse_02_017** (Hund\'s Rule) to recall exchange energy and half-filled/filled subshell stability.', 'Revisit **c11_chem_cbse_08_002** (Oxidation Number Rules) to practice assigning oxidation states in compounds.', 'Re-do Diagnostic Questions 2 and 3, explicitly writing the dⁿ configuration before and after each ionisation step.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_009', difficulty: 'standard',
          question: 'Lanthanoid contraction is the steady decrease in atomic and ionic radii of the.',
          hint: 'If stuck on shielding argument: Revisit c11_chem_cbse_02_014 (Shapes of Orbitals) — focus.',
          misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is.',
          parts: [
                { id: 'a', prompt: 'Given: Ionic radius of Zr⁴⁺ = 72 pm, Hf⁴⁺ = 71 pm. Without lanthanoid contraction, Hf⁴⁺ would be ~15% larger than Zr⁴⁺ (typical group trend).', answer: 'Expected Hf⁴⁺ radius without contraction = 72 pm × 1.15 = 82.8 pm',
                  options: ['Expected Hf⁴⁺ radius without contraction = 72 pm × 1.15 = 82.8 pm', 'lanthanoid contraction', 'decrease in size across a period'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is incomplete —.' },
                { id: 'b', prompt: 'Compare the difficulty of separating Zr/Hf versus Nb/Ta. Which pair is harder to separate and why? Use ionic radii and charge density arguments.', answer: 'Zr/Hf separation is harder',
                  options: ['Zr/Hf separation is harder', 'both equally hard', 'lanthanoid contraction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is incomplete —.' }
          ],
            remediations: { 'students-often-write-lanthanoid-contraction': { steps: ['If the student cannot articulate the shielding mechanism: (1) Revisit c11_chem_cbse_02_013 (Quantum Numbers) and.', '(2) Revisit c11_chem_cbse_03_006 (Atomic Radius Trends) — plot radii of Groups 4, 5, 6 for 3d, 4d, 5d series; identify.', '(3) Re-diagnostic: Ask them to explain why Ce⁴⁺ (4f⁰) is larger than Pr⁴⁺ (4f¹) despite higher Z — this forces.'] } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_04_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is.',
          parts: [
                { id: 'a', prompt: 'Compare the difficulty of separating Zr/Hf versus Nb/Ta. Which pair is harder to separate and why? Use ionic radii and charge density arguments.', answer: 'Zr/Hf separation is harder',
                  options: ['Zr/Hf separation is harder', 'both equally hard', 'lanthanoid contraction', 'decrease in size across a period'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write: "Lanthanoid contraction is caused by increasing nuclear charge pulling electrons closer." This is incomplete —.' }
          ],
            remediations: { 'students-often-write-lanthanoid-contraction': { steps: ['If the student cannot articulate the shielding mechanism: (1) Revisit c11_chem_cbse_02_013 (Quantum Numbers) and.', '(2) Revisit c11_chem_cbse_03_006 (Atomic Radius Trends) — plot radii of Groups 4, 5, 6 for 3d, 4d, 5d series; identify.', '(3) Re-diagnostic: Ask them to explain why Ce⁴⁺ (4f⁰) is larger than Pr⁴⁺ (4f¹) despite higher Z — this forces.'] } } },
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
