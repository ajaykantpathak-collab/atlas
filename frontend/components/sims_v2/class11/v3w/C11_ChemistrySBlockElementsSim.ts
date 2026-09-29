import type { SimDef } from '../../engine/types';
import C11_ChemistrySBlockElementsSim from '../../../simulations/c6_12/C11_ChemistrySBlockElementsSim';

/** v3 wrapped master — C11_ChemistrySBlockElementsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_chemistrysblockelementssim: SimDef = {
    id: 'v3w_c11_chemistrysblockelementssim',
    title: 'Need for Classification: Mendeleev\'s Periodic Table',
    subtitle: 'This node covers the historical development up to Mendeleev\'s 1905 table: Dobereiner\'s.',
    classLevel: 11, subject: 'chemistry', topic: 'Need for Classification: Mendeleev\'s Periodic Table',
    chapters: [],
    nodeIds: ['c11_chem_cbse_03_001', 'c11_chem_cbse_03_002', 'c11_chem_cbse_03_003', 'c11_chem_cbse_03_004', 'c11_chem_cbse_03_005', 'c11_chem_cbse_03_006', 'c11_chem_cbse_03_008', 'c11_chem_cbse_03_009', 'c11_chem_cbse_03_011', 'c11_chem_cbse_03_012', 'c11_chem_cbse_03_013', 'c11_chem_cbse_09_006', 'c11_chem_cbse_03_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are in a typical Indian chemistry laboratory with dozens of reagent bottles: sodium, potassium,.', goal: 'Master Need for Classification: Mendeleev\'s Periodic Table.' },
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
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_005', title: 'Elements are classified into s, p, d,.',
          scaffold: { problem: 'An element X has atomic number 34. Using only the periodic table (no configuration written out), determine: (a) its block, (b) its group.',
            steps: [
            { text: 'Locate Z=34 on the periodic table. It is in the 4th period (since periods end at Z=2,10,18,36,54...).' },
            { text: 'Identify the block by the region: Groups 1-2 (s-block), Groups 3-12 (d-block), Groups 13-18 (p-block).' },
            { text: 'Period number = 4 (highest principal quantum number n for valence electrons).' },
            { text: 'Group 16 means 6 valence electrons (ns²np⁴). Since period 4, valence configuration = 4s²4p⁴.' },
            { text: 'Verify: Full configuration = [Ar] 3d¹⁰4s²4p⁴. Last electron enters 4p → p-block. Group = 18 - (6-4) = 16. Period = 4.', faded: true, blankAnswer: '(a) p-block, (b) Group 16, (c) Period 4, (d) 4s²4p⁴' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_03_006', title: 'Atomic radius is the distance from the.',
          scaffold: { problem: 'Using the concept of effective nuclear charge, explain the trend in atomic radii across Period 3: Na (186 pm), Mg (160 pm), Al (143 pm), Si.',
            steps: [
            { text: 'Write electronic configurations: Na = [Ne]3s¹, Cl = [Ne]3s²3p⁵. Both have n=3 valence shell.' },
            { text: 'Identify core electrons: For both, core = 1s²2s²2p⁶ = 10 electrons (n=1,2 shells).' },
            { text: 'Apply Slater\'s rules for Na (3s¹ valence): σ = (0 × 0.35) + (8 × 0.85) + (2 × 1.00) = 6.8 + 2 = 8.8.' },
            { text: 'Apply Slater\'s rules for Cl (3s²3p⁵ valence, 7 valence electrons): σ = (6 × 0.35) + (8 × 0.85) + (2 × 1.00) = 2.1 + 6.8.' },
            { text: 'Compare: Z_eff increases from 2.2 (Na) to 6.1 (Cl) while n remains 3.' },
            { text: 'Verify trend consistency: Each step adds one proton (+1 Z) and one valence electron (+0.35 σ), net ΔZ_eff ≈ +0.65 per.', faded: true, blankAnswer: 'Atomic radius decreases across Period 3 because Z_eff.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_chem_cbse_03_002', title: 'Identify each idea',
          dissect: { specimen: 'Need for Classification: Mendeleev\'s Periodic Table', spots: [
            { id: 's1', label: 'Mendeleevs Periodic Table arranges the', prompt: 'Which idea is this? — Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing.', answer: 'Mendeleevs Periodic Table arranges the', options: ['Mendeleevs Periodic Table arranges the', 'The Modern Periodic Law states', 'In the Modern Periodic Table', 'Electronic configuration is the distribution'] },
            { id: 's2', label: 'The Modern Periodic Law states', prompt: 'Which idea is this? — The Modern Periodic Law states that the physical and chemical properties of elements are.', answer: 'The Modern Periodic Law states', options: ['The Modern Periodic Law states', 'Mendeleevs Periodic Table arranges the', 'In the Modern Periodic Table', 'Electronic configuration is the distribution'] },
            { id: 's3', label: 'In the Modern Periodic Table', prompt: 'Which idea is this? — In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7).', answer: 'In the Modern Periodic Table', options: ['In the Modern Periodic Table', 'Mendeleevs Periodic Table arranges the', 'The Modern Periodic Law states', 'Electronic configuration is the distribution'] },
            { id: 's4', label: 'Electronic configuration is the distribution', prompt: 'Which idea is this? — Electronic configuration is the distribution of electrons in an atom\'s orbitals,.', answer: 'Electronic configuration is the distribution', options: ['Electronic configuration is the distribution', 'Mendeleevs Periodic Table arranges the', 'The Modern Periodic Law states', 'In the Modern Periodic Table'] },
            { id: 's5', label: 'Elements are classified into s', prompt: 'Which idea is this? — Elements are classified into s, p, d, and f blocks based on the subshell (s, p, d, f).', answer: 'Elements are classified into s', options: ['Elements are classified into s', 'Mendeleevs Periodic Table arranges the', 'The Modern Periodic Law states', 'In the Modern Periodic Table'] },
            { id: 's6', label: 'Atomic radius is the distance', prompt: 'Which idea is this? — Atomic radius is the distance from the nucleus to the outermost electron cloud boundary.', answer: 'Atomic radius is the distance', options: ['Atomic radius is the distance', 'Mendeleevs Periodic Table arranges the', 'The Modern Periodic Law states', 'In the Modern Periodic Table'] }
          ] } }
    ],
    explore: { component: C11_ChemistrySBlockElementsSim, prompt: 'Explore the interactive — Need for Classification: Mendeleev\'s Periodic Table' },
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
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_002', difficulty: 'standard',
          question: 'The Modern Periodic Law states that the physical and chemical properties of.',
          hint: 'Revisit Class 9 atomic structure (c9_chem_ch2_5, c9_chem_ch2_6) and Class 10 modern.',
          misconception: 'Students often think the modern periodic table is arranged strictly by increasing atomic mass, confusing it with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Modern Periodic Law states that the physical and chemical properties of elements are',
                  options: ['The Modern Periodic Law states that the physical and chemical properties of elements are', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)', 'Electronic configuration is the distribution of electrons in an atom\'s orbitals,'],
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
                  options: ['In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'The Modern Periodic Law states that the physical and chemical properties of elements are', 'Electronic configuration is the distribution of electrons in an atom\'s orbitals,'],
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
                  options: ['Electronic configuration is the distribution of electrons in an atom\'s orbitals,', 'Mendeleev\'s Periodic Table arranges the known chemical elements in order of increasing', 'The Modern Periodic Law states that the physical and chemical properties of elements are', 'In the Modern Periodic Table, **periods** are the seven horizontal rows (numbered 1 to 7)'],
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
            remediations: { 'students-write-electronic-configurations-in': { steps: ['Write the configuration in filling order using the (n+l) rule diagram (1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p...).', 'Regroup all subshells by increasing n: collect all n=1, then n=2, then n=3, etc.', 'Within each n, order by l: s, p, d, f.', 'Verify total electrons = Z. Practice with Z=26 (Fe): Filling: 1s²2s²2p⁶3s²3p⁶4s²3d⁶.'] } } },
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
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_006', difficulty: 'standard',
          question: 'Atomic radius is the distance from the nucleus to the outermost electron cloud.',
          hint: 'If stuck, revisit c11_chem_cbse_03_004 (electronic configuration) and c9_chem_ch2_6.',
          misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron.',
          parts: [
                { id: 'a', prompt: 'Explain why atomic radius decreases from Li (152 pm) to F (64 pm) across Period 2, even though the number of electrons increases from 3 to 9.', answer: 'Across Period 2, electrons fill the same n=2 shell (2s, 2p)',
                  options: ['Across Period 2, electrons fill the same n=2 shell (2s, 2p)', 'more electrons = larger size', 'more electrons = larger atom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' },
                { id: 'b', prompt: 'Compare atomic radii down Group 1: Li (152 pm), Na (186 pm), K (231 pm), Rb (244 pm), Cs (262 pm).', answer: 'From K (n=4) to Rb (n=5), the 4d¹⁰ electrons are added',
                  options: ['From K (n=4) to Rb (n=5), the 4d¹⁰ electrons are added', 'each step adds a shell so increase should be constant', 'more electrons = larger atom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' }
          ],
            remediations: { 'more-electrons-larger-atom-and': { steps: ['Draw Period 2 atoms (Li to Ne) with nucleus (+Z) and shells (n=1, n=2).', 'For each, write Z and count core electrons (1s² = 2).', 'Calculate Z_eff ≈ Z - 2 for valence electrons.', 'Plot Z_eff vs atomic radius from Table 3.6(a).', 'Observe inverse correlation.', 'Repeat for Group 1: write n values (2,3,4,5,6) and note core electrons increase (2, 10, 18, 36, 54) - shielding.'] } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Atomic radius always increases down a group because a new shell is added." Evaluate this statement using data for Group 13: B (88 pm), Al.', answer: 'The claim is NOT fully correct',
                  options: ['The claim is NOT fully correct', 'more electrons = larger atom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' },
                { id: 'b', prompt: 'Design a thought experiment to estimate the covalent radius of hydrogen using only the H-H bond distance in H₂ molecule (74 pm) and the covalent radius of.', answer: 'In H₂, bond distance = 2 × r_cov(H) → r_cov(H) = 74/2 = 37 pm',
                  options: ['In H₂, bond distance = 2 × r_cov(H) → r_cov(H) = 74/2 = 37 pm', 'more electrons = larger atom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' },
                { id: 'c', prompt: 'Compare atomic radii down Group 1: Li (152 pm), Na (186 pm), K (231 pm), Rb (244 pm), Cs (262 pm).', answer: 'From K (n=4) to Rb (n=5), the 4d¹⁰ electrons are added',
                  options: ['From K (n=4) to Rb (n=5), the 4d¹⁰ electrons are added', 'each step adds a shell so increase should be constant', 'more electrons = larger atom'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "more electrons = larger atom" and predict atomic size increases across a period because electron count rises.' }
          ],
            remediations: { 'more-electrons-larger-atom-and': { steps: ['Draw Period 2 atoms (Li to Ne) with nucleus (+Z) and shells (n=1, n=2).', 'For each, write Z and count core electrons (1s² = 2).', 'Calculate Z_eff ≈ Z - 2 for valence electrons.', 'Plot Z_eff vs atomic radius from Table 3.6(a).', 'Observe inverse correlation.', 'Repeat for Group 1: write n values (2,3,4,5,6) and note core electrons increase (2, 10, 18, 36, 54) - shielding.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
