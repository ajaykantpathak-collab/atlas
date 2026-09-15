import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch06_p2: SimDef = {
    id: 'v3_c12_chem_ch06_p2',
    title: 'Haloalkanes and Haloarenes · Part 2/2',
    subtitle: 'Same halogen, wildly different reactivity — structure decides',
    classLevel: 12, subject: 'chemistry', topic: 'Haloalkanes and Haloarenes · Part 2/2',
    chapters: ['c12_chem_ch06'],
    nodeIds: ['c12_chem_cbse_06_007', 'c12_chem_cbse_06_008', 'c12_chem_cbse_06_009', 'c12_chem_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Organic chemist', intro: 'From anaesthetics to PVC pipes, a single C–halogen bond controls what a molecule can do. Learn to read its environment.', goal: 'Classify halogen compounds by substitution and hybridisation, and connect structure to SN1/SN2 reactivity.' },
    discovery: {
        question: 'A student counts the carbons in CH₂=CH–Cl, sees the C–Cl carbon touches just one carbon, and files it as a \'primary haloalkane.\' What did they miss?',
        options: ['The carbon is sp²-hybridised — vinylic halides are a different class entirely, and the C–Cl bond carries partial double-bond character', 'Nothing — one carbon neighbour means primary', 'It should be called tertiary because of the double bond', 'Chloroethene isn\'t a halide at all'],
        answer: 'The carbon is sp²-hybridised — vinylic halides are a different class entirely, and the C–Cl bond carries partial double-bond character',
        hook: 'The 1°/2°/3° counting rule only works on sp³ carbons. Hybridisation changes the game: sp² C–X bonds in vinyl and aryl halides resist substitution — the reason PVC doesn\'t behave like an alkyl halide.',
    },
    teaching: [
        { title: 'SN2 Reaction: Mechanism and Stereochemistry', text: 'SN2 (Substitution Nucleophilic Bimolecular) reaction is a one-step nucleophilic substitution mechanism where the nucleophile attacks the carbon bearing the leaving group from the backside (180°.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_06_007', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Classify the halide world — primary, secondary, tertiary, allylic, benzylic, vinylic, aryl — then predict who reacts fast and slow through SN1 vs SN2, and test your calls with ethanolic AgNO₃.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_007', title: 'SN2 Reaction: Mechanism and Stereochemistry',
          scaffold: { problem: '(R)-2-iodobutane reacts with sodium cyanide (NaCN) in ethanol.',
            steps: [
            { text: 'Identify substrate: (R)-2-iodobutane (CH₃–CH(I)–CH₂–CH₃), chiral at C-2.' },
            { text: 'Determine mechanism: Secondary alkyl iodide, good leaving group (I⁻), strong nucleophile (CN⁻) → SN2 favored over SN1.' },
            { text: 'Draw transition state: Trigonal bipyramidal geometry at C-2. Axial positions: incoming C≡N⁻ (carbon end) and departing.' },
            { text: 'Stereochemical outcome: Backside attack inverts configuration. (R)-reactant → (S)-product.' },
            { text: 'Rate law: rate = k[(R)-2-iodobutane][CN⁻]. Thermodynamics: Breaking C–I (234 kJ/mol), forming C–CN (326 kJ/mol).', faded: true, blankAnswer: 'Mechanism shows trigonal bipyramidal TS with axial CN⁻ and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_008', title: 'Elimination Reactions: E1 and E2 Mechanisms',
          scaffold: { problem: 'When 2-bromo-2-methylbutane is heated with ethanolic KOH, a mixture of alkenes is obtained.',
            steps: [
            { text: 'Draw the substrate: (CH₃)₃C–CH₂Br? Wait, 2-bromo-2-methylbutane is (CH₃)₂C(Br)CH₂CH₃.' },
            { text: 'Identify β-hydrogens: On C1 (9 equivalent H\'s from three CH₃) and on C3 (2 H\'s from CH₂).' },
            { text: 'Loss of Br⁻ gives tertiary carbocation (CH₃)₂C⁺CH₂CH₃ (stable, no rearrangement needed).' },
            { text: 'Base (OH⁻ or EtO⁻) abstracts a β-H. Two possible alkenes: (a) from methyl β-H → 2-methylbut-1-ene (disubstituted.' },
            { text: 'Apply Zaitsev\'s rule: more substituted alkene (trisubstituted) is major.' },
            { text: 'Write mechanism: (i) Slow heterolysis: (CH₃)₂C(Br)CH₂CH₃ → (CH₃)₂C⁺CH₂CH₃ + Br⁻.', faded: true, blankAnswer: 'Major product: 2-methylbut-2-ene (trisubstituted). Minor.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_010', title: 'Polyhalogen Compounds: CHCl3, CCl4, DDT',
          scaffold: { problem: 'In an old laboratory, a 250 mL amber bottle of chloroform (density 1.48 g mL⁻¹) was found half-full and exposed to light.',
            steps: [
            { text: 'Determine the volume of chloroform present. Bottle is half-full: 250 mL / 2 = 125 mL.' },
            { text: 'Calculate mass of chloroform using density. Mass = volume × density = 125 mL × 1.48 g mL⁻¹ = 185 g.' },
            { text: 'Convert mass to moles. Moles CHCl₃ = 185 g / 119.5 g mol⁻¹ = 1.548 mol.' },
            { text: 'Use stoichiometry from balanced equation: 2CHCl₃ + O₂ → 2COCl₂ + 2HCl. Mole ratio CHCl₃ : COCl₂ = 1 : 1.' },
            { text: 'Convert moles of phosgene to mass. Mass COCl₂ = 1.548 mol × 99 g mol⁻¹ = 153.3 g.' },
            { text: 'Interpret result. 153 g of highly toxic phosgene could accumulate in the headspace – a lethal hazard.', faded: true, blankAnswer: '153 g of phosgene (COCl₂) could form.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A student must sort three unlabelled bottles of isomeric bromobutanes. She runs warm ethanolic AgNO₃ on each: one precipitates AgBr in 2 minutes, one in 30 minutes, one not at all — and guesses they\'re \'all equally reactive since all are C₄H₉Br\'.',
            decisions: [{ prompt: 'How should she read the timings?', options: [
                { text: 'Fastest = 2-bromo-2-methylpropane (3°), middle = 2-bromobutane (2°), no reaction = 1-bromobutane (1°): the test runs through carbocations, and stability order 3° > 2° > 1° sets the speed.', outcome: 'Same formula, different class — counting carbons attached to the C–Br carbon predicts SN1 reactivity before any lab work.' },
                { text: 'Same molecular formula means same class, so the timing differences are just experimental noise.', outcome: 'C₄H₉Br spans primary, secondary and tertiary isomers — the timings are the classification working as intended.', reveals: 'same-formula-same-class' },
                { text: 'Fastest must be 1-bromobutane — primary halides react fastest in every mechanism.', outcome: 'That\'s the SN2 order; AgNO₃/ethanol forces SN1 where tertiary wins on carbocation stability — mechanism choice flips the order.', reveals: 'primary-always-fastest' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'You can now grade any C–X bond\'s reactivity from its structure alone — the skill behind every mechanism question in this chapter and half of organic boards.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_007', difficulty: 'standard',
          question: 'SN2 (Substitution Nucleophilic Bimolecular) reaction is a one-step nucleophilic.',
          hint: 'If unable to visualize backside attack, review c11_chem_cbse_04_007 (hybridisation) and.',
          misconception: 'Students often write the SN2 transition state with the nucleophile and leaving group at 90° (square pyramidal) instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SN2 (Substitution Nucleophilic Bimolecular) reaction is a one-step nucleophilic',
                  options: ['SN2 (Substitution Nucleophilic Bimolecular) reaction is a one-step nucleophilic', 'Haloalkanes (alkyl halides) are organic compounds in', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)'],
                  hint: 'If unable to visualize backside attack, review c11_chem_cbse_04_007 (hybridisation) and practice.',
                  misconception: 'Students often write the SN2 transition state with the nucleophile and leaving group at 90° (square pyramidal) instead of 180° (trigonal.' }
          ],
            remediations: { 'students-often-write-the-sn2': { steps: ['Revisit c11_chem_cbse_04_007 (hybridisation) to recall sp³ tetrahedral geometry.', 'Build a physical model (or use molecular model kit) of CH₃Cl: place Cl at top, three H\'s at base.', 'Simulate backside attack by pushing a pencil from bottom through carbon – watch the H\'s flip upward.', 'Draw the transition state step-by-step: (a) tetrahedral reactant, (b) trigonal bipyramidal TS with axial Nu and X, (c).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_008', difficulty: 'standard',
          question: 'Elimination reactions in haloalkanes involve the removal of a hydrogen atom.',
          hint: 'If stuck on carbocation stability, revisit c12_chem_cbse_06_006 (SN1) where the stability.',
          misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining.',
          parts: [
                { id: 'a', prompt: 'Predict the major alkene product(s) when 2-bromo-3-methylbutane is treated with (i) alcoholic KOH (heat) and (ii) bulky base like t-BuOK in t-BuOH.', answer: '(i) Alcoholic KOH (small base, thermodynamic control) → Zaitsev product:',
                  options: ['(i) Alcoholic KOH (small base, thermodynamic control) → Zaitsev product:', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'If stuck on carbocation stability, revisit c12_chem_cbse_06_006 (SN1) where the stability order 3°.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' },
                { id: 'b', prompt: 'Compare the stereochemical outcomes of E2 elimination from (2R,3R)-2-bromo-3-methylpentane and (2R,3S)-2-bromo-3-methylpentane using a strong non-bulky base.', answer: 'E2 requires anti-periplanar geometry (H–C–C–X dihedral angle 180°)',
                  options: ['E2 requires anti-periplanar geometry (H–C–C–X dihedral angle 180°)', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'If stuck on carbocation stability, revisit c12_chem_cbse_06_006 (SN1) where the stability order 3°.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' }
          ],
            remediations: { 'students-often-write-e1-follows': { steps: ['If the student cannot distinguish E1 vs E2 conditions, have them create a 2×2 table: rows = substrate (1°, 2°, 3°).', 'Fill in the dominant mechanism (E1, E2, SN1, SN2) for each cell using the rule: 3° + weak base → E1/SN1; 3° + strong.', 'Then practice drawing the anti-periplanar conformation for a simple acyclic substrate (e.g., 2-bromobutane) using.', 'Revisit c12_chem_cbse_06_006 (SN1 carbocation stability) and c12_chem_cbse_06_007 (SN2 steric hindrance) if the.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining.',
          parts: [
                { id: 'a', prompt: 'A student claims: "E1 reactions always give racemic mixtures if the carbocation is chiral, just like SN1." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'racemization', 'the base attacks from the same side as the leaving group leaves'],
                  hint: 'If stuck on carbocation stability, revisit c12_chem_cbse_06_006 (SN1) where the stability order 3°.',
                  misconception: 'Students often write "E1 follows first-order kinetics because only the substrate is involved in the rate-determining step" but then.' }
          ],
            remediations: { 'students-often-write-e1-follows': { steps: ['If the student cannot distinguish E1 vs E2 conditions, have them create a 2×2 table: rows = substrate (1°, 2°, 3°).', 'Fill in the dominant mechanism (E1, E2, SN1, SN2) for each cell using the rule: 3° + weak base → E1/SN1; 3° + strong.', 'Then practice drawing the anti-periplanar conformation for a simple acyclic substrate (e.g., 2-bromobutane) using.', 'Revisit c12_chem_cbse_06_006 (SN1 carbocation stability) and c12_chem_cbse_06_007 (SN2 steric hindrance) if the.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_009', difficulty: 'standard',
          question: 'Haloalkanes (alkyl halides) undergo nucleophilic substitution reactions readily.',
          hint: 'If stuck, revisit Class 11 resonance (c11_chem_cbse_04_011) and practice drawing benzylic.',
          misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This.',
          parts: [
                { id: 'a', prompt: 'Predict the major product when p-chloronitrobenzene is treated with aqueous NaOH at 623 K and 300 atm.', answer: 'Major product: p-nitrophenol',
                  options: ['Major product: p-nitrophenol', 'meta also works'],
                  hint: 'If stuck, revisit Class 11 resonance (c11_chem_cbse_04_011) and practice drawing benzylic cation.',
                  misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is wrong: the phenyl.' },
                { id: 'b', prompt: 'Compare the reactivity of chlorobenzene and benzyl chloride (C₆H₅CH₂Cl) towards SN1 and SN2 reactions. Explain the role of the phenyl group in each case.', answer: 'Benzyl chloride: primary benzylic halide',
                  options: ['Benzyl chloride: primary benzylic halide', 'phenyl cation is stable'],
                  hint: 'If stuck, revisit Class 11 resonance (c11_chem_cbse_04_011) and practice drawing benzylic cation.',
                  misconception: 'Students often write "chlorobenzene undergoes SN1 reaction because the phenyl cation is resonance-stabilised." This is wrong: the phenyl.' }
          ],
            remediations: { 'students-often-write-chlorobenzene-undergoes': { steps: ['If the student cannot distinguish phenyl vs benzylic cation stability: (1) Revisit node c12_chem_cbse_06_006 (SN1.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_010', difficulty: 'standard',
          question: 'Polyhalogen compounds are carbon compounds containing more than one halogen.',
          hint: 'Revisit c12_chem_cbse_06_006 and c12_chem_cbse_06_007 for SN1/SN2 mechanisms and.',
          misconception: 'Students often write the hydrolysis product of chloroform as CO₂ and HCl (complete oxidation) instead of formate.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Polyhalogen compounds are carbon compounds containing more than one halogen atom',
                  options: ['Polyhalogen compounds are carbon compounds containing more than one halogen atom', 'Haloalkanes (alkyl halides) are organic compounds in', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)'],
                  hint: 'Revisit c12_chem_cbse_06_006 and c12_chem_cbse_06_007 for SN1/SN2 mechanisms and stereochemistry.',
                  misconception: 'Students often write the hydrolysis product of chloroform as CO₂ and HCl (complete oxidation) instead of formate (HCOO⁻).' }
          ],
            remediations: { 'students-often-write-the-hydrolysis': { steps: ['If the student cannot write the hydrolysis equations or explain the carbenoid mechanism: (1) Revisit.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
