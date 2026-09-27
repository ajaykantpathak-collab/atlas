import type { SimDef } from '../../engine/types';

/** v3 generated — c11_chem_ch10 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_chem_ch10: SimDef = {
    id: 'v3_c11_chem_ch10',
    title: 'Organic Chemistry — Basic Principles and Techniques',
    subtitle: 'Covers: tetravalency of carbon, hybridisation (sp³, sp², sp) and molecular shapes.',
    classLevel: 11, subject: 'chemistry', topic: 'Organic Chemistry — Basic Principles and Techniques',
    chapters: ['c11_chem_ch10'],
    nodeIds: ['c11_chem_cbse_10_001', 'c11_chem_cbse_10_002', 'c11_chem_cbse_10_003', 'c11_chem_cbse_10_004', 'c11_chem_cbse_10_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 11 learner', intro: 'Start with a real-world observation: **burning a magnesium ribbon in Class 10 gave MgO (ionic), but burning.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What is the correct IUPAC name for CH₃–CH₂–CH(CH₃)–CH₂–CH₂–OH?',
        options: ['Correct answer: **Hexan-2-ol** (or 2-Hexanol)', '4-methylpentan-1-ol', 'longest chain containing the functional group'],
        answer: 'Correct answer: **Hexan-2-ol** (or 2-Hexanol)',
        hook: 'Students consistently **number the parent chain from the end nearest to the first substituent (alphabetically or.',
    },
    teaching: [
        { title: 'Organic Compounds — Structure and Classification', text: 'Organic compounds are covalent compounds of carbon (excluding oxides, carbonates, carbides, and cyanides) characterised by carbon\'s tetravalency and catenation, leading to diverse structures.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_chem_cbse_10_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_10_001', title: 'Organic Compounds — Structure and Classification',
          scaffold: { problem: 'A hydrocarbon with molecular formula C₅H₁₀ decolourises bromine water and gives a positive Baeyer\'s test.',
            steps: [
            { text: 'Analyse molecular formula C₅H₁₀. For acyclic alkane: C₅H₁₂. DoU = (2×5 + 2 - 10)/2 = 1.' },
            { text: 'Positive Br₂ water and Baeyer\'s test → unsaturation is a carbon–carbon double bond (alkene), not a ring (cycloalkanes.' },
            { text: 'No geometrical isomerism → the double bond must be terminal (C=C at end) or symmetrically substituted.' },
            { text: 'Draw bond-line for pent-1-ene: 5-carbon zigzag with double bond between C-1 and C-2 (shown as two parallel lines.' },
            { text: 'Hybridisation: C-1 (sp²), C-2 (sp²), C-3 (sp³), C-4 (sp³), C-5 (sp³). Class: Acyclic aliphatic alkene.', faded: true, blankAnswer: 'Bond-line: =CH–CH₂–CH₂–CH₂–CH₃ (zigzag with double bond.' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_10_002', title: 'IUPAC Nomenclature of Organic Compounds',
          caseStudy: { intro: 'Start with a familiar kitchen observation: **vinegar (ethanoic acid) and nail polish remover (propanone/acetone) smell completely different, yet both contain.',
            decisions: [{ prompt: 'What is the correct IUPAC name for CH₃–CH₂–CH(CH₃)–CH₂–CH₂–OH?', options: [
                { text: 'Correct answer: **Hexan-2-ol** (or 2-Hexanol)', outcome: 'Correct answer: **Hexan-2-ol** (or 2-Hexanol). The longest chain containing the –OH group has 6.' },
                { text: '4-methylpentan-1-ol', outcome: 'Not quite — Students consistently **number the parent chain from the end nearest to the first substituent.', reveals: 'students-consistently-number-the-parent' },
                { text: 'longest chain containing the functional group', outcome: 'Not quite — Students consistently **number the parent chain from the end nearest to the first substituent.', reveals: 'students-consistently-number-the-parent' }
            ] }] } },
        { type: 'case', nodeId: 'c11_chem_cbse_10_004', title: 'Reaction Mechanism — Inductive, Resonance, Hyperconjugation',
          caseStudy: { intro: 'Observe a lemon slice in your kitchen — its sourness comes from citric acid (–COOH groups). Why is –COOH acidic?',
            decisions: [{ prompt: 'Define the inductive effect and state the direction of the dipole arrow for a C–Cl bond.', options: [
                { text: 'Inductive effect is the permanent polarization of σ-bonds due to electronegativity', outcome: 'Inductive effect is the permanent polarization of σ-bonds due to electronegativity difference.' },
                { text: 'works through π-bonds', outcome: 'Not quite — Students draw resonance structures for nitrobenzene showing the negative charge on the ring carbon.', reveals: 'students-draw-resonance-structures-for' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_chem_cbse_10_005', title: 'Purification and Qualitative/Quantitative Analysis of Organic Compounds',
          scaffold: { problem: '0.300 g of an organic compound containing C, H, and O undergoes complete combustion. It produces 0.440 g CO₂ and 0.180 g H₂O.',
            steps: [
            { text: 'Calculate mass of C from CO₂. Molar mass CO₂ = 44 g/mol. Moles CO₂ = 0.440/44 = 0.0100 mol. Moles C = 0.0100 mol.' },
            { text: 'Calculate mass of H from H₂O. Molar mass H₂O = 18 g/mol. Moles H₂O = 0.180/18 = 0.0100 mol.' },
            { text: 'Calculate mass of O by difference. Total mass = 0.300 g. Mass O = 0.300 - (0.120 + 0.0200) = 0.160 g.' },
            { text: 'Find mole ratio C : H : O = 0.0100 : 0.0200 : 0.0100 = 1 : 2 : 1.' },
            { text: 'Empirical formula = CH₂O. Verify: Empirical mass = 30 g/mol. %C = 12/30×100 = 40%, %H = 2/30×100 = 6.67%, %O = 53.33%.', faded: true, blankAnswer: 'CH₂O' }
            ] } },
        { type: 'case', nodeId: 'c11_chem_cbse_10_005', title: 'You made it',
          caseStudy: { intro: 'You finished Organic Chemistry — Basic Principles and Techniques — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_chem_cbse_10_001', difficulty: 'standard',
          question: 'Organic compounds are covalent compounds of carbon (excluding oxides.',
          hint: 'If stuck on hybridisation or shapes, revisit Class 11 Physics "Chemical Bonding and.',
          misconception: '**Misconception:** "In bond-line formulas, every vertex is a CH₂ group." **Exact error:** Students forget that.',
          parts: [
                { id: 'a', prompt: 'Explain why a carbon–carbon single bond (σ) allows free rotation but a carbon–carbon double bond (σ + π) restricts rotation.', answer: 'A σ bond has cylindrical symmetry along the internuclear axis',
                  options: ['A σ bond has cylindrical symmetry along the internuclear axis', 'double bonds are stronger so they don\'t rotate'],
                  hint: 'If stuck on hybridisation or shapes, revisit Class 11 Physics "Chemical Bonding and Molecular.',
                  misconception: '**Misconception:** "In bond-line formulas, every vertex is a CH₂ group." **Exact error:** Students forget that **terminal vertices are.' }
          ],
            remediations: { 'misconception-in-bond-line-formulas': { steps: ['**Remediation:** (1) Take a molecular model kit (or use clay/toothpicks).', 'Count H on each C: ends = 3, middles = 2.', '(2) Draw its bond-line formula side-by-side.', 'Label each vertex: "CH₃", "CH₂", "CH₂", "CH₃".'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_10_002', difficulty: 'standard',
          question: 'IUPAC nomenclature is the standardized system established by the International.',
          hint: 'Review Class 10 Chapter 4 (Carbon Compounds) nodes c10_chem_cbse_04_006 (functional.',
          misconception: 'Students consistently **number the parent chain from the end nearest to the first substituent (alphabetically or.',
          parts: [
                { id: 'a', prompt: 'What is the correct IUPAC name for CH₃–CH₂–CH(CH₃)–CH₂–CH₂–OH?', answer: 'Correct answer: **Hexan-2-ol** (or 2-Hexanol)',
                  options: ['Correct answer: **Hexan-2-ol** (or 2-Hexanol)', '4-methylpentan-1-ol', 'longest chain containing the functional group'],
                  hint: 'Review Class 10 Chapter 4 (Carbon Compounds) nodes c10_chem_cbse_04_006 (functional groups) and.',
                  misconception: 'Students consistently **number the parent chain from the end nearest to the first substituent (alphabetically or by complexity) rather than.' }
          ],
            remediations: { 'students-consistently-number-the-parent': { steps: ['Revisit the **priority order of functional groups** (Table 8.4 NCERT) and memorize the top 5: –COOH > –CHO > –CO– > –OH.', 'Practice **10 examples** where you deliberately identify the principal functional group first, circle it, then number.', 'Use a coloured pen to mark the functional group carbon as "C-1" before counting any substituents.', 'Verify with the "lowest sum rule" *only* for substituents after the functional group locant is fixed.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_10_003', difficulty: 'standard',
          question: 'Isomerism is the phenomenon where two or more organic compounds have the same.',
          hint: 'If stuck, revise: (1) Hybridisation and molecular shapes from c11_chem_cbse_10_001; (2).',
          misconception: 'Students incorrectly believe that **all alkenes show geometrical isomerism**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Isomerism is the phenomenon where two or more organic compounds have the same molecular',
                  options: ['Isomerism is the phenomenon where two or more organic compounds have the same molecular', 'Organic compounds are covalent compounds of carbon (excluding oxides, carbonates,', 'IUPAC nomenclature is the standardized system established by the International Union of', '**Inductive Effect (+I/-I):** Permanent polarization of σ-bonds caused by'],
                  hint: 'If stuck, revise: (1) Hybridisation and molecular shapes from c11_chem_cbse_10_001; (2) IUPAC rules.',
                  misconception: 'Students incorrectly believe that **all alkenes show geometrical isomerism**.' }
          ],
            remediations: { 'students-incorrectly-believe-that-all': { steps: ['Revisit the **two necessary conditions** for geometrical isomerism: (a) restricted rotation (C=C or ring), (b) each.', 'Practice with 10 alkene structures — for each, list substituents on both sp² carbons and check condition (b).', 'For asymmetrical alkenes, learn CIP priority rules (atomic number of directly attached atoms) and assign E/Z.', 'Draw 3D wedge-dash models of cis/trans and E/Z pairs to visualize non-superimposability.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_10_004', difficulty: 'standard',
          question: '**Inductive Effect (+I/-I):** Permanent polarization of σ-bonds caused.',
          hint: 'If stuck, revisit c11_chem_cbse_10_001 (hybridization shapes) and c9_chem_ch3_4 (covalent.',
          misconception: 'Students draw resonance structures for nitrobenzene showing the negative charge on the ring carbon *meta* to –NO₂,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: '**Inductive Effect (+I/-I):** Permanent polarization of σ-bonds caused by',
                  options: ['**Inductive Effect (+I/-I):** Permanent polarization of σ-bonds caused by', 'Organic compounds are covalent compounds of carbon (excluding oxides, carbonates,', 'IUPAC nomenclature is the standardized system established by the International Union of', 'Isomerism is the phenomenon where two or more organic compounds have the same molecular'],
                  hint: 'If stuck, revisit c11_chem_cbse_10_001 (hybridization shapes) and c9_chem_ch3_4 (covalent bond.',
                  misconception: 'Students draw resonance structures for nitrobenzene showing the negative charge on the ring carbon *meta* to –NO₂, or they show the.' }
          ],
            remediations: { 'students-draw-resonance-structures-for': { steps: ['Re-draw the Lewis structure of –NO₂ showing formal charges (N⁺, O⁻).', 'Identify the π-system: C=C–N⁺=O⁻.', 'Apply curved-arrow rule — arrows start from π-bond (C=C) or lone pair (on O⁻), never from formal charge.', 'Push π-electrons from ring toward N⁺, forming C=N⁺ and moving π-bond to O.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c11_chem_cbse_10_005', difficulty: 'standard',
          question: 'Purification of organic compounds is the systematic separation of a target.',
          hint: 'If stuck on calculations, revisit **c11_chem_cbse_01_002 (Mole Concept — Stoichiometry)**.',
          misconception: '**Specific error:** In **Kjeldahl\'s method**, students write the reaction as: Organic-N + H₂SO₄ → (NH₄)₂SO₄, then.',
          parts: [
                { id: 'a', prompt: 'A student isolates a solid organic compound that decomposes at its boiling point but sublimes easily on heating. The impurity is non-volatile.', answer: '**Correct answer:** Sublimation',
                  options: ['**Correct answer:** Sublimation', 'distillation'],
                  hint: 'If stuck on calculations, revisit **c11_chem_cbse_01_002 (Mole Concept — Stoichiometry)** and.',
                  misconception: '**Specific error:** In **Kjeldahl\'s method**, students write the reaction as: Organic-N + H₂SO₄ → (NH₄)₂SO₄, then (NH₄)₂SO₄ + NaOH → NH₃.' }
          ],
            remediations: { 'specific-error-in-kjeldahl-s': { steps: ['**Targeted remediation:** 1.', '**Re-derive the 1.4 factor from scratch:** 1 mole N = 14 g.', '1 mole NH₃ reacts with 1 mole H⁺.', '1 L of 1 N acid = 1 eq H⁺ = 1 mole H⁺ (for monoprotic) but for H₂SO₄, 1 M = 2 N.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
