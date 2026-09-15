import type { SimDef } from '../../engine/types';
import C11_ChemistryClassificationOfElementsAndPeriodicitySim from '../../../simulations/c6_12/C11_ChemistryClassificationOfElementsAndPeriodicitySim';

/** v3 wrapped master — C11_ChemistryClassificationOfElementsAndPeriodicitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistryclassificationofelementsandperiodicitysim: SimDef = {
    id: 'v3w_c11_chemistryclassificationofelementsandperiodicitysim',
    title: 'Classification Of Elements And Periodicity',
    subtitle: 'This node covers the historical development up to Mendeleev\'s 1905 table: Dobereiner\'s.',
    classLevel: 11, subject: 'chemistry', topic: 'Need for Classification: Mendeleev\'s Periodic Table',
    chapters: [],
    nodeIds: ['c11_chem_cbse_03_001', 'c11_chem_cbse_03_005', 'c11_chem_cbse_09_006', 'c11_chem_cbse_03_002', 'c11_chem_cbse_03_003', 'c11_chem_cbse_03_004', 'c11_chem_cbse_03_008', 'c11_chem_cbse_03_009', 'c11_chem_cbse_03_012', 'c11_chem_cbse_09_004', 'c11_chem_cbse_09_001', 'c11_chem_cbse_03_007', 'c11_chem_cbse_03_006', 'c11_chem_cbse_03_010', 'c11_chem_cbse_03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are in a typical Indian chemistry laboratory with dozens of reagent bottles: sodium, potassium,.', goal: 'Master Classification Of Elements And Periodicity.' },
    discovery: {
        question: 'Why did Mendeleev leave gaps in his periodic table and assign temporary names like eka-aluminium and eka-silicon?',
        options: ['Mendeleev left gaps', 'he left gaps for aesthetic symmetry', 'he used atomic number to predict'],
        answer: 'Mendeleev left gaps',
        hook: 'Students often believe Mendeleev strictly followed increasing atomic weight order.',
    },
    teaching: [
        { title: 'Mendeleev\'s Periodic Table arranges the.', text: 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing atomic weights such that elements with similar physical and chemical properties recur periodically, forming.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_001', title: 'Mendeleev\'s Periodic Table arranges the.',
          scaffold: { problem: 'In a hypothetical Mendeleev-style classification, you are given four elements with their atomic weights and the formulae of their highest.',
            steps: [
            { text: 'Observe that all four elements form oxides of formula M₂O₅ and chlorides of formula MCl₅, indicating a common valency.' },
            { text: 'Arrange the known elements in order of increasing atomic weight: P (31), Q (75), R (122), S (210).' },
            { text: 'Notice the large gap between Q (75) and R (122). The difference is 47 units.' },
            { text: 'Estimate the atomic weight of the missing element X by interpolation.' },
            { text: 'Since the group valency is 5, the missing element X will form oxide X₂O₅ and chloride XCl₅.' },
            { text: 'Verify consistency: the predicted formulae follow the group pattern.', faded: true, blankAnswer: 'Elements P, Q, R, S form a group with valency 5. A missing.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_005', title: 'Elements are classified into s, p, d,.',
          scaffold: { problem: 'An element X has atomic number 34. Using only the periodic table (no configuration written out), determine: (a) its block, (b) its group.',
            steps: [
            { text: 'Locate Z=34 on the periodic table. It is in the 4th period (since periods end at Z=2,10,18,36,54...).' },
            { text: 'Identify the block by the region: Groups 1-2 (s-block), Groups 3-12 (d-block), Groups 13-18 (p-block).' },
            { text: 'Period number = 4 (highest principal quantum number n for valence electrons).' },
            { text: 'Group 16 means 6 valence electrons (ns²np⁴). Since period 4, valence configuration = 4s²4p⁴.' },
            { text: 'Verify: Full configuration = [Ar] 3d¹⁰4s²4p⁴. Last electron enters 4p → p-block. Group = 18 - (6-4) = 16. Period = 4.', faded: true, blankAnswer: '(a) p-block, (b) Group 16, (c) Period 4, (d) 4s²4p⁴' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_09_006', title: 'Hydrides are binary compounds of.',
          scaffold: { problem: '2.5 g of an unknown alkaline earth metal hydride MH₂ reacts completely with water to produce 1.12 L of H₂ gas at STP.',
            steps: [
            { text: 'Calculate moles of H₂ gas produced at STP: 1.12 L / 22.4 L/mol = 0.05 mol H₂' },
            { text: 'From hydrolysis stoichiometry MH₂ + 2H₂O → M(OH)₂ + 2H₂, 1 mol MH₂ produces 2 mol H₂.' },
            { text: 'Calculate molar mass of MH₂: mass / moles = 2.5 g / 0.025 mol = 100 g/mol' },
            { text: 'Molar mass of M = 100 - 2(1) = 98 g/mol. From periodic table, alkaline earth metal with atomic mass ~98 is Strontium.' },
            { text: 'Balanced equation: SrH₂ + 2H₂O → Sr(OH)₂ + 2H₂↑. Verify: Sr(OH)₂ is strong base → basic solution.', faded: true, blankAnswer: 'Metal is Strontium (Sr), assuming experimental mass was.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_002', title: 'The Modern Periodic Law states that the.',
          scaffold: { problem: 'A scientist in an Indian nuclear research facility synthesizes a new element with atomic number 115.',
            steps: [
            { text: 'Recall that the modern periodic law states properties are periodic functions of atomic number.' },
            { text: 'Determine the electronic configuration of Z=115 using the aufbau principle and the order of filling: 1s, 2s, 2p, 3s,.' },
            { text: 'Identify period: highest n = 7 -> period 7. Group: For p-block, group = 10 + number of valence electrons in p orbital?' },
            { text: 'IUPAC temporary name: digits 1,1,5 -> un, un, pent -> ununpentium, symbol Uup.' },
            { text: 'Verify: Period 7, group 15, p-block, name ununpentium (Uup). Expected configuration: [Rn] 5f14 6d10 7s2 7p3.', faded: true, blankAnswer: 'Period 7, Group 15, p-block, temporary IUPAC name:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_003', title: 'In the Modern Periodic Table,.',
          scaffold: { problem: 'An element Y has atomic number 53. Using only the periodic table structure (not memorised facts), determine: (a) its period, (b) its group.',
            steps: [
            { text: 'Locate Z=53 by building up electron configuration using the aufbau order: 1s² (2), 2s²2p⁶ (8), 3s²3p⁶ (8), 4s²3d¹⁰4p⁶.' },
            { text: 'Confirm period: highest n in configuration [Kr] 4d¹⁰ 5s² 5p⁵ is n=5 → Period 5.' },
            { text: 'Confirm group: valence electrons = 5s²5p⁵ = 7; p-block → Group = 10 + 7 = 17 (halogen family).' },
            { text: 'Block: last electron enters 5p → p-block.' },
            { text: 'Highest oxidation state for halogens = +7 (except F). Oxide formula: Y₂O₇ (dimer of YO₃.₅, but stable oxide is I₂O₇ for.' },
            { text: 'Position: top right of periodic table (Period 5, Group 17) → non-metal (halogen).', faded: true, blankAnswer: '(a) Period 5, (b) Group 17, (c) p-block, (d) Y₂O₇ (iodine.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_004', title: 'Electronic configuration is the.',
          scaffold: { problem: 'Determine the period, group, and block of the element with atomic number Z=53 (Iodine).',
            steps: [
            { text: 'Write the electronic configuration of Z=53 using the Aufbau principle and (n+l) rule.' },
            { text: 'Reorder by principal quantum number (n) for standard notation: n=1: 1s²; n=2: 2s²2p⁶; n=3: 3s²3p⁶3d¹⁰; n=4: 4s²4p⁶4d¹⁰;.' },
            { text: 'Identify the noble gas core. The configuration up to Z=36 (Krypton) is 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶ = [Kr].' },
            { text: 'Determine period = highest n = 5. Block = orbital of last electron = p (5p⁵).' },
            { text: 'Verify: Iodine is in Period 5, Group 17, p-block. Matches periodic table. Total electrons = 2+8+18+18+7 = 53. Correct.', faded: true, blankAnswer: 'Complete: 1s²2s²2p⁶3s²3p⁶3d¹⁰4s²4p⁶4d¹⁰5s²5p⁵. Condensed:.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_03_005', title: 'Identify each idea',
          dissect: { specimen: 'Classification Of Elements And Periodicity', spots: [
            { id: 's1', label: 'Mendeleevs Periodic Table arranges the', prompt: 'Which idea is this? — Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing.', answer: 'Mendeleevs Periodic Table arranges the', options: ['Mendeleevs Periodic Table arranges the', 'Elements are classified into s', 'Hydrides are binary compounds of', 'The Modern Periodic Law states'] },
            { id: 's2', label: 'Elements are classified into s', prompt: 'Which idea is this? — Elements are classified into s, p, d, and f blocks based on the subshell (s, p, d, f).', answer: 'Elements are classified into s', options: ['Elements are classified into s', 'Mendeleevs Periodic Table arranges the', 'Hydrides are binary compounds of', 'The Modern Periodic Law states'] },
            { id: 's3', label: 'Hydrides are binary compounds of', prompt: 'Which idea is this? — Hydrides are binary compounds of hydrogen with other elements (except noble gases),.', answer: 'Hydrides are binary compounds of', options: ['Hydrides are binary compounds of', 'Mendeleevs Periodic Table arranges the', 'Elements are classified into s', 'The Modern Periodic Law states'] },
            { id: 's4', label: 'The Modern Periodic Law states', prompt: 'Which idea is this? — The Modern Periodic Law states that the physical and chemical properties of elements are.', answer: 'The Modern Periodic Law states', options: ['The Modern Periodic Law states', 'Mendeleevs Periodic Table arranges the', 'Elements are classified into s', 'Hydrides are binary compounds of'] },
            { id: 's5', label: 'In the Modern Periodic Table', prompt: 'Which idea is this? — In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7).', answer: 'In the Modern Periodic Table', options: ['In the Modern Periodic Table', 'Mendeleevs Periodic Table arranges the', 'Elements are classified into s', 'Hydrides are binary compounds of'] },
            { id: 's6', label: 'Electronic configuration is the distribution', prompt: 'Which idea is this? — Electronic configuration is the distribution of electrons in an atom\'s orbitals,.', answer: 'Electronic configuration is the distribution', options: ['Electronic configuration is the distribution', 'Mendeleevs Periodic Table arranges the', 'Elements are classified into s', 'Hydrides are binary compounds of'] }
          ] } }
    ],
    explore: { component: C11_ChemistryClassificationOfElementsAndPeriodicitySim, prompt: 'Explore the interactive — Classification Of Elements And Periodicity' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_001', difficulty: 'standard',
          question: 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of.',
          hint: 'Review Class 9 node c9_chem_ch3_6 (Writing Chemical Formulae: Rules and Valency Cross.',
          misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.',
          parts: [
                { id: 'a', prompt: 'Why did Mendeleev leave gaps in his periodic table and assign temporary names like eka-aluminium and eka-silicon?', answer: 'Mendeleev left gaps',
                  options: ['Mendeleev left gaps', 'he left gaps for aesthetic symmetry', 'he used atomic number to predict'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.' },
                { id: 'b', prompt: 'Given the following data for four elements A, B, C, D, arrange them in a Mendeleev-style group and predict the formula of the chloride of the missing element.', answer: 'Step 1: All elements form M₂O₃ and MCl₃, indicating valency 3 → same group',
                  options: ['Step 1: All elements form M₂O₃ and MCl₃, indicating valency 3 → same group', 'atomic weight', 'atomic number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.' }
          ],
            remediations: { 'mendeleev-strictly-followed-increasing-atomic': { steps: ['If a student insists Mendeleev never changed atomic weight order, give them a mini-card set: Te (127.6, forms H₂Te,.', 'They will see Te belongs to Group VI (like S, Se) and I to Group VII (like Cl, Br), forcing Te before I despite higher.', 'For the "perfect prediction" myth, show the actual vs predicted melting point of eka-silicon (germanium): predicted.', 'Have them calculate % error for atomic weight of eka-aluminium: (70-68)/70 × 100 = 2.9%.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.',
          parts: [
                { id: 'a', prompt: 'Evaluate the following statement: "Mendeleev\'s prediction of eka-aluminium (gallium) was 100% accurate in all properties." Use the data from Table 3.3 (NCERT).', answer: 'The statement is false',
                  options: ['The statement is false', '100% accurate', 'completely wrong', 'atomic weight'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendeleev strictly followed increasing atomic weight order.' }
          ],
            remediations: { 'mendeleev-strictly-followed-increasing-atomic': { steps: ['If a student insists Mendeleev never changed atomic weight order, give them a mini-card set: Te (127.6, forms H₂Te,.', 'They will see Te belongs to Group VI (like S, Se) and I to Group VII (like Cl, Br), forcing Te before I despite higher.', 'For the "perfect prediction" myth, show the actual vs predicted melting point of eka-silicon (germanium): predicted.', 'Have them calculate % error for atomic weight of eka-aluminium: (70-68)/70 × 100 = 2.9%.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_005', difficulty: 'standard',
          question: 'Elements are classified into s, p, d, and f blocks based on the subshell (s, p,.',
          hint: 'Review the aufbau diagram (n+l rule) and practice writing configurations for the first 36.',
          misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without.',
          parts: [
                { id: 'a', prompt: 'State the general outer electronic configuration of s-block, p-block, d-block, and f-block elements.', answer: 's-block: ns¹⁻² (Groups 1–2)',
                  options: ['s-block: ns¹⁻² (Groups 1–2)', 'block = group', '"block = group"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' },
                { id: 'b', prompt: 'Why is helium placed in the p-block (Group 18) even though its electron configuration is 1s²?', answer: 'Helium has a completely filled valence shell (1s²) with no p orbitals in n=1',
                  options: ['Helium has a completely filled valence shell (1s²) with no p orbitals in n=1', 'helium belongs to s-block', 'block = group'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' },
                { id: 'c', prompt: 'An element has the ground-state configuration [Kr] 4d¹⁰ 5s² 5p³. Identify its block, group, period, and atomic number.', answer: 'Last electron enters 5p → p-block',
                  options: ['Last electron enters 5p → p-block', 'block = group', '"block = group"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' }
          ],
            remediations: { 'block-group': { steps: ['Revisit the aufbau diagram (n+l rule) from c11_chem_cbse_03_004.', 'Write configurations for Z=19 to 36 step by step, circling the *new* orbital each time.', 'Colour-code: s (red), p (blue), d (green), f (orange) on a blank periodic table.', 'Practice: Given configuration, identify block *only* by the highest (n+l) orbital that is partially filled or just.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without.',
          parts: [
                { id: 'a', prompt: 'A student writes the configuration of chromium (Z=24) as [Ar] 3d⁴ 4s² and says it is a d-block element because the last electron enters 3d.', answer: 'The statement is partially correct in block assignment (Cr is d-block) but the',
                  options: ['The statement is partially correct in block assignment (Cr is d-block) but the', 'block = group', '"block = group"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' },
                { id: 'b', prompt: 'Design a mnemonic or visual scheme to remember the order of orbital filling (aufbau) for periods 4–7 that clearly shows where s, p, d, f blocks begin and end.', answer: 'Example scheme: Write n=4 row: 4s (2) → 3d (10) → 4p (6) = 18 elements',
                  options: ['Example scheme: Write n=4 row: 4s (2) → 3d (10) → 4p (6) = 18 elements', 'block = group', '"block = group"'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "block = group". For example, they say "Group 13 is p-block, so aluminium is p-block" without referencing the 3p¹.' }
          ],
            remediations: { 'block-group': { steps: ['Revisit the aufbau diagram (n+l rule) from c11_chem_cbse_03_004.', 'Write configurations for Z=19 to 36 step by step, circling the *new* orbital each time.', 'Colour-code: s (red), p (blue), d (green), f (orange) on a blank periodic table.', 'Practice: Given configuration, identify block *only* by the highest (n+l) orbital that is partially filled or just.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'standard',
          question: 'Hydrides are binary compounds of hydrogen with other elements (except noble.',
          hint: 'Review Fajans\' rules from Chemical Bonding chapter (c11_chem_cbse_04_001) and.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'What is the oxidation state of hydrogen in sodium hydride (NaH) and why does it differ from hydrogen\'s oxidation state in methane (CH₄)?', answer: 'In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)',
                  options: ['In NaH, hydrogen has oxidation state -1 (hydride ion H⁻)', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Explain why beryllium hydride (BeH₂) is covalent while magnesium hydride (MgH₂) is ionic, even though both are Group 2 elements.', answer: 'BeH₂ is covalent',
                  options: ['BeH₂ is covalent', 'both are ionic because Group 2', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'c', prompt: 'Write balanced chemical equations for the reaction of (a) CaH₂ with water, (b) B₂H₆ with water, and (c) TiH₂ with water.', answer: 'CaH₂ with water, (',
                  options: ['CaH₂ with water, (', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).',
          parts: [
                { id: 'a', prompt: 'A student claims: "All metallic hydrides are non-stoichiometric because hydrogen atoms randomly occupy interstitial sites in the metal lattice, so the.', answer: 'The statement is partially correct but oversimplified',
                  options: ['The statement is partially correct but oversimplified', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' },
                { id: 'b', prompt: 'Design a simple laboratory experiment to distinguish between an unknown ionic hydride (e.g., NaH) and an unknown covalent hydride (e.g., SiH₄) using only.', answer: 'Add small amounts of each solid/liquid hydride to separate test tubes with water',
                  options: ['Add small amounts of each solid/liquid hydride to separate test tubes with water', 'metallic hydrides are alloys'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "metallic hydrides are alloys" and write reactions like Ti + H₂ → TiH₂ (as a fixed compound).' }
          ],
            remediations: { 'metallic-hydrides-are-alloys-and': { steps: ['Show the student a phase diagram for Ti-H system (available in NCERT/standard texts) - point out the two-phase region.', 'Demonstrate with a simple calculation: if TiH₂ were stoichiometric, 47.9 g Ti would combine with exactly 2.016 g H₂.', 'Contrast with CaH₂ - weigh 42.1 g Ca (1 mol), react with H₂, product is exactly 42.1 + 2.016 = 44.116 g CaH₂ every time.', 'Have student write the correct representation: TiHₓ (1.5 < x < 2.0) vs CaH₂.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_002', difficulty: 'standard',
          question: 'The Modern Periodic Law states that the physical and chemical properties of.',
          hint: 'Revisit Class 9 atomic structure (c9_chem_ch2_5, c9_chem_ch2_6) and Class 10 modern.',
          misconception: 'Students often think the modern periodic table is arranged strictly by increasing atomic mass, confusing it with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Modern Periodic Law states that the physical and chemical properties of elements are',
                  options: ['The Modern Periodic Law states that the physical and chemical properties of elements are', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'Elements are classified into s, p, d, and f blocks based on the subshell (s, p, d, f)', 'Hydrides are binary compounds of hydrogen with other elements (except noble gases),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the modern periodic table is arranged strictly by increasing atomic mass, confusing it with Mendeleev\'s table.' }
          ],
            remediations: { 'the-modern-periodic-table-is': { steps: ['If a student confuses atomic mass and atomic number, have them list the first 20 elements with both atomic number and.', 'Then ask them to predict properties based on atomic number vs mass.', 'For block misidentification, practice writing electronic configurations for elements across periods 4 and 5,.', 'Use the aufbau diagram to trace the last electron added.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_003', difficulty: 'standard',
          question: 'In the Modern Periodic Table, **periods** are the seven horizontal rows.',
          hint: 'If stuck, revisit Class 9 "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and.',
          misconception: '**Misconception:** "The group number equals the number of valence electrons for all elements." **Specific error:**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)',
                  options: ['In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'Elements are classified into s, p, d, and f blocks based on the subshell (s, p, d, f)', 'Hydrides are binary compounds of hydrogen with other elements (except noble gases),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The group number equals the number of valence electrons for all elements." **Specific error:** Students apply the.' }
          ],
            remediations: { 'misconception-the-group-number-equals': { steps: ['Have the student write electronic configurations for the first transition series (Sc–Zn) and tabulate: Z,.', 'Highlight where the sum matches (Sc–Mn) and where it deviates (Fe–Zn, especially Cr, Cu).', 'Explain that d-block group numbers are **assigned by IUPAC based on chemical analogy** (vertical similarity in.', 'Contrast with s/p-blocks where group number **predicts** valence electrons.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_004', difficulty: 'standard',
          question: 'Electronic configuration is the distribution of electrons in an atom\'s.',
          hint: 'Review Class 11 Physics Chapter "Atoms" or Class 9 Chemistry "Structure of Atom" for.',
          misconception: 'Students write electronic configurations in filling order (e.g., 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶5s²4d¹⁰5p⁶6s²4f¹⁴5d¹⁰6p⁶...).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Electronic configuration is the distribution of electrons in an atom\'s orbitals,',
                  options: ['Electronic configuration is the distribution of electrons in an atom\'s orbitals,', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'Elements are classified into s, p, d, and f blocks based on the subshell (s, p, d, f)', 'Hydrides are binary compounds of hydrogen with other elements (except noble gases),'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write electronic configurations in filling order (e.g., 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶5s²4d¹⁰5p⁶6s²4f¹⁴5d¹⁰6p⁶...) but fail to reorder.' }
          ],
            remediations: { 'students-write-electronic-configurations-in': { steps: ['Write the configuration in filling order using the (n+l) rule diagram (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...).', 'Regroup all subshells by increasing n: collect all n=1, then n=2, then n=3, etc.', 'Within each n, order by l: s, p, d, f.', 'Verify total electrons = Z. Practice with Z=26 (Fe): Filling: 1s²2s²2p⁶3s²3p⁶4s²3d⁶.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students write electronic configurations in filling order (e.g., 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶5s²4d¹⁰5p⁶6s²4f¹⁴5d¹⁰6p⁶...).',
          parts: [
                { id: 'a', prompt: 'A student writes the electronic configuration of Copper (Z=29) as [Ar] 3d⁹4s². Evaluate this configuration. Is it correct?', answer: 'The student\'s configuration [Ar]3d⁹4s² is incorrect',
                  options: ['The student\'s configuration [Ar]3d⁹4s² is incorrect', 'Aufbau is always followed'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students write electronic configurations in filling order (e.g., 1s²2s²2p⁶3s²3p⁶4s²3d¹⁰4p⁶5s²4d¹⁰5p⁶6s²4f¹⁴5d¹⁰6p⁶...) but fail to reorder.' }
          ],
            remediations: { 'students-write-electronic-configurations-in': { steps: ['Write the configuration in filling order using the (n+l) rule diagram (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...).', 'Regroup all subshells by increasing n: collect all n=1, then n=2, then n=3, etc.', 'Within each n, order by l: s, p, d, f.', 'Verify total electrons = Z. Practice with Z=26 (Fe): Filling: 1s²2s²2p⁶3s²3p⁶4s²3d⁶.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
