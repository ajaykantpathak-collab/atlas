import type { SimDef } from '../../engine/types';

/** v3 generated — c12_chem_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_chem_ch06_p1: SimDef = {
    id: 'v3_c12_chem_ch06_p1',
    title: 'Haloalkanes and Haloarenes · Part 1/2',
    subtitle: 'Same halogen, wildly different reactivity — structure decides',
    classLevel: 12, subject: 'chemistry', topic: 'Haloalkanes and Haloarenes · Part 1/2',
    chapters: ['c12_chem_ch06'],
    nodeIds: ['c12_chem_cbse_06_001', 'c12_chem_cbse_06_002', 'c12_chem_cbse_06_003', 'c12_chem_cbse_06_004', 'c12_chem_cbse_06_005', 'c12_chem_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Organic chemist', intro: 'From anaesthetics to PVC pipes, a single C–halogen bond controls what a molecule can do. Learn to read its environment.', goal: 'Classify halogen compounds by substitution and hybridisation, and connect structure to SN1/SN2 reactivity.' },
    discovery: {
        question: 'A student counts the carbons in CH₂=CH–Cl, sees the C–Cl carbon touches just one carbon, and files it as a \'primary haloalkane.\' What did they miss?',
        options: ['The carbon is sp²-hybridised — vinylic halides are a different class entirely, and the C–Cl bond carries partial double-bond character', 'Nothing — one carbon neighbour means primary', 'It should be called tertiary because of the double bond', 'Chloroethene isn\'t a halide at all'],
        answer: 'The carbon is sp²-hybridised — vinylic halides are a different class entirely, and the C–Cl bond carries partial double-bond character',
        hook: 'The 1°/2°/3° counting rule only works on sp³ carbons. Hybridisation changes the game: sp² C–X bonds in vinyl and aryl halides resist substitution — the reason PVC doesn\'t behave like an alkyl halide.',
    },
    teaching: [
        { title: 'Classification of Haloalkanes: Primary, Secondary, Tertiary', text: 'Haloalkanes (alkyl halides) are organic compounds in which one or more hydrogen atoms of an aliphatic hydrocarbon are replaced by halogen atoms (F, Cl, Br, I) attached to an sp³-hybridised carbon.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_chem_cbse_06_001', title: 'Your mission',
          mission: { widget: 'atom', validate: 'atom:electrons=4',
            instruction: 'On the lab: place 4 electrons — which shell fills first?.',
        context: 'Classify the halide world — primary, secondary, tertiary, allylic, benzylic, vinylic, aryl — then predict who reacts fast and slow through SN1 vs SN2, and test your calls with ethanolic AgNO₃.',
            observePrompt: 'What did the atom interactive show you?' } },
        { type: 'case', nodeId: 'c12_chem_cbse_06_002', title: 'Nomenclature of Haloalkanes and Haloarenes',
          caseStudy: { intro: 'Look at a medicine strip — many drugs like chloramphenicol (antibiotic) or halothane (anaesthetic) contain halogen atoms attached to carbon chains or rings.',
            decisions: [{ prompt: 'Write the IUPAC name for CH₃CH₂CH(Cl)CH₃. Identify whether it is a primary, secondary, or tertiary haloalkane.', options: [
                { text: '2-Chlorobutane; secondary haloalkane', outcome: '2-Chlorobutane; secondary haloalkane. The parent chain is butane (4 carbons).' },
                { text: '1-chlorobutane', outcome: 'Not quite — Students frequently choose the parent chain based on total carbon count rather than the longest.', reveals: 'students-frequently-choose-the-parent' },
                { text: '2-methyl-1-chloropropane', outcome: 'Not quite — Students frequently choose the parent chain based on total carbon count rather than the longest.', reveals: 'students-frequently-choose-the-parent' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_003', title: 'Preparation of Haloalkanes: From Alcohols',
          scaffold: { problem: 'In a school laboratory, a student needs to prepare pure 2-chlorobutane from butan-2-ol. The available reagents are: conc.',
            steps: [
            { text: 'Identify substrate — butan-2-ol is a **secondary alcohol** with a chiral centre at C-2.' },
            { text: 'Evaluate reagents — conc. HCl/ZnCl₂ (Lucas) promotes SN1 via carbocation → racemic mixture.' },
            { text: 'Choose SOCl₂/pyridine. Pyridine acts as base to neutralise HCl and prevents carbocation formation.' },
            { text: 'Write mechanism: (i) Alcohol attacks S of SOCl₂ → alkyl chlorosulfite ester + Cl⁻; (ii) Cl⁻ attacks C-2 from backside.' },
            { text: 'If starting with (R)-butan-2-ol (10.0 g, 0.135 mol), theoretical yield of (S)-2-chlorobutane = 0.135 mol × 92.57 g/mol.', faded: true, blankAnswer: 'Reagent: SOCl₂ / pyridine (ether, 0°C → RT). Product.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_004', title: 'Preparation of Haloalkanes: Free Radical Halogenation',
          scaffold: { problem: 'Write the complete free radical chain mechanism for monochlorination of 2-methylpropane (isobutane) using Cl₂/UV.',
            steps: [
            { text: 'Draw 2-methylpropane structure — central tertiary carbon with one H, three equivalent primary CH₃ groups (9 primary.' },
            { text: 'Initiation: Cl₂ → 2Cl• (UV light). Propagation 1: Cl• abstracts H.' },
            { text: 'Propagation 2: Radical + Cl₂ → chloroalkane + Cl•. Tertiary radical gives (CH₃)₃CCl; primary radical gives.' },
            { text: 'Calculate statistical reactivity: 3° H = 1 H × 5.0 = 5.0; 1° H = 9 H × 1.0 = 9.0. Total = 14.0.' },
            { text: 'Termination steps (3 combinations): Cl•+Cl•→Cl₂; (CH₃)₃C•+Cl•→(CH₃)₃CCl; (CH₃)₂CHCH₂•+Cl•→(CH₃)₂CHCH₂Cl; plus.', faded: true, blankAnswer: 'Major product: tert-butyl chloride (35.7%); minor: isobutyl.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_06_005', title: 'Preparation of Haloarenes: Electrophilic Substitution',
          caseStudy: { intro: 'Observe how chlorine gas passed into benzene with a pinch of anhydrous FeCl₃ in a lab fume hood yields chlorobenzene — a colourless liquid with a sweet smell.',
            decisions: [{ prompt: 'Write the reagents and conditions for the electrophilic chlorination of benzene. What is the role of the Lewis acid catalyst?', options: [
                { text: 'Reagents: Benzene + Cl₂ with anhydrous FeCl₃ (or AlCl₃) in dark/room temperature', outcome: 'Reagents: Benzene + Cl₂ with anhydrous FeCl₃ (or AlCl₃) in dark/room temperature.' },
                { text: 'FeCl₃ acts as a base', outcome: 'Not quite — Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl".', reveals: 'students-often-write-the-sandmeyer' },
                { text: 'no catalyst needed', outcome: 'Not quite — Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl".', reveals: 'students-often-write-the-sandmeyer' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_chem_cbse_06_006', title: 'SN1 Reaction: Mechanism and Stereochemistry',
          scaffold: { problem: 'tert-Butyl chloride (0.02 M) undergoes solvolysis in 80% aqueous ethanol at 25°C. The reaction is first-order with k = 6.2 × 10⁻⁵ s⁻¹.',
            steps: [
            { text: 'Identify the rate law for SN1: Rate = k[R-X]. Here k = 6.2 × 10⁻⁵ s⁻¹, [R-X]₀ = 0.02 M.' },
            { text: 'Calculate initial rate: Rate₀ = (6.2 × 10⁻⁵ s⁻¹)(0.02 mol L⁻¹) = 1.24 × 10⁻⁶ mol L⁻¹ s⁻¹.' },
            { text: 'For first-order reactions, half-life t₁/₂ = ln(2)/k = 0.693 / (6.2 × 10⁻⁵ s⁻¹) = 1.12 × 10⁴ s = 3.11 hours.' },
            { text: 'Time for 90% completion (10% remaining): t = (1/k) ln([R-X]₀/[R-X]) = (1/6.2×10⁻⁵) ln(0.02/0.002) = 1.61×10⁴ × 2.303.' },
            { text: 'If [R-X] is doubled to 0.04 M, Rate = (6.2×10⁻⁵)(0.04) = 2.48×10⁻⁶ mol L⁻¹ s⁻¹ — rate doubles, confirming first-order.', faded: true, blankAnswer: '(a) 1.24 × 10⁻⁶ mol L⁻¹ s⁻¹, (b) 3.11 hours, (c) 10.3.' }
            ] } },
        { type: 'case', nodeId: 'c12_chem_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student must sort three unlabelled bottles of isomeric bromobutanes. She runs warm ethanolic AgNO₃ on each: one precipitates AgBr in 2 minutes, one in 30 minutes, one not at all — and guesses they\'re \'all equally reactive since all are C₄H₉Br\'.',
            decisions: [{ prompt: 'How should she read the timings?', options: [
                { text: 'Fastest = 2-bromo-2-methylpropane (3°), middle = 2-bromobutane (2°), no reaction = 1-bromobutane (1°): the test runs through carbocations, and stability order 3° > 2° > 1° sets the speed.', outcome: 'Same formula, different class — counting carbons attached to the C–Br carbon predicts SN1 reactivity before any lab work.' },
                { text: 'Same molecular formula means same class, so the timing differences are just experimental noise.', outcome: 'C₄H₉Br spans primary, secondary and tertiary isomers — the timings are the classification working as intended.', reveals: 'same-formula-same-class' },
                { text: 'Fastest must be 1-bromobutane — primary halides react fastest in every mechanism.', outcome: 'That\'s the SN2 order; AgNO₃/ethanol forces SN1 where tertiary wins on carbocation stability — mechanism choice flips the order.', reveals: 'primary-always-fastest' }
            ] }] } },
        { type: 'case', nodeId: 'c12_chem_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now grade any C–X bond\'s reactivity from its structure alone — the skill behind every mechanism question in this chapter and half of organic boards.',
            decisions: [{ prompt: 'What comes next? Haloalkanes and Haloarenes · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Haloalkanes and Haloarenes · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'atom', prompt: 'Explore the atom interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'atom', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_001', difficulty: 'standard',
          question: 'Haloalkanes (alkyl halides) are organic compounds in which one or more hydrogen.',
          hint: 'Revisit c10_chem_cbse_04_005 (Isomerism: Structural Isomers of Carbon Compounds) and.',
          misconception: 'Students often classify (CH₃)₂CHCH₂Br (1-bromo-2-methylpropane) as a secondary bromide because the carbon *adjacent*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Haloalkanes (alkyl halides) are organic compounds in',
                  options: ['Haloalkanes (alkyl halides) are organic compounds in', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)', 'Free radical halogenation is a substitution reaction where a hydrogen atom in an alkane'],
                  hint: 'Revisit c10_chem_cbse_04_005 (Isomerism: Structural Isomers of Carbon Compounds) and practice.',
                  misconception: 'Students often classify (CH₃)₂CHCH₂Br (1-bromo-2-methylpropane) as a secondary bromide because the carbon *adjacent* to the CH₂Br.' }
          ],
            remediations: { 'students-often-classify-ch-chch': { steps: ['If the student misclassifies based on the wrong carbon, have them: (1) Revisit Class 10 isomerism.', '(2) Use a molecular model kit or draw wedge-dash structures; physically point to the C–X bond and count bonds to *other.', '(3) Re-attempt Diagnostic Question 3, circling the C–Br carbon in each isomer before naming.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_002', difficulty: 'standard',
          question: 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming.',
          hint: 'If stuck on parent chain selection, revisit c11_chem_cbse_10_013 worked examples.',
          misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.',
          parts: [
                { id: 'a', prompt: 'Write the IUPAC name for CH₃CH₂CH(Cl)CH₃. Identify whether it is a primary, secondary, or tertiary haloalkane.', answer: '2-Chlorobutane; secondary haloalkane',
                  options: ['2-Chlorobutane; secondary haloalkane', '1-chlorobutane', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane'],
                  hint: 'If stuck on parent chain selection, revisit c11_chem_cbse_10_013 worked examples on branched.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' },
                { id: 'b', prompt: 'Draw the structure and give the IUPAC name for the compound with molecular formula C₄H₈Br₂ that has both bromine atoms on the same carbon.', answer: 'Structure: CH₃CH₂CBr₂CH₃ (or CH₃CBr₂CH₂CH₃)',
                  options: ['Structure: CH₃CH₂CBr₂CH₃ (or CH₃CBr₂CH₂CH₃)', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane', 'chloro'],
                  hint: 'If stuck on parent chain selection, revisit c11_chem_cbse_10_013 worked examples on branched.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' },
                { id: 'c', prompt: 'Compare the IUPAC naming of 1-bromo-2-methylbenzene and 1-bromo-3-methylbenzene. Why does the common name system use "o-" and "m-" while IUPAC uses numbers?', answer: '1-Bromo-2-methylbenzene (ortho) and 1-bromo-3-methylbenzene (meta) have the same',
                  options: ['1-Bromo-2-methylbenzene (ortho) and 1-bromo-3-methylbenzene (meta) have the same', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane', 'chloro'],
                  hint: 'If stuck on parent chain selection, revisit c11_chem_cbse_10_013 worked examples on branched.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' }
          ],
            remediations: { 'students-frequently-choose-the-parent': { steps: ['Revisit c11_chem_cbse_10_013 (IUPAC nomenclature of organic compounds) — practice identifying longest continuous chain.', 'Revisit c10_chem_cbse_04_008 (Nomenclature of Carbon Compounds) — review numbering rules for functional groups and.', 'Do this re-diagnostic: Draw all structural isomers of C₆H₁₄, name each by IUPAC, then replace one H with Cl on each.', 'Check each name against the three rules: longest chain, lowest locant set, alphabetical prefixes.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.',
          parts: [
                { id: 'a', prompt: 'A student writes the IUPAC name of (CH₃)₃CCH₂Br as "1-bromo-2,2-dimethylpropane". Evaluate if this is correct.', answer: 'Correct',
                  options: ['Correct', '2-methyl-1-chloropropane', '1-chloro-2-methylpropane', 'chloro'],
                  hint: 'If stuck on parent chain selection, revisit c11_chem_cbse_10_013 worked examples on branched.',
                  misconception: 'Students frequently choose the parent chain based on total carbon count rather than the longest continuous chain.' }
          ],
            remediations: { 'students-frequently-choose-the-parent': { steps: ['Revisit c11_chem_cbse_10_013 (IUPAC nomenclature of organic compounds) — practice identifying longest continuous chain.', 'Revisit c10_chem_cbse_04_008 (Nomenclature of Carbon Compounds) — review numbering rules for functional groups and.', 'Do this re-diagnostic: Draw all structural isomers of C₆H₁₄, name each by IUPAC, then replace one H with Cl on each.', 'Check each name against the three rules: longest chain, lowest locant set, alphabetical prefixes.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_003', difficulty: 'standard',
          question: 'Preparation of haloalkanes from alcohols involves the substitution of the.',
          hint: 'If stuck on mechanism prediction, revisit **c11_chem_cbse_04_007 (Hybridisation)** for.',
          misconception: '**Misconception:** "All alcohols react with conc. HX to give haloalkanes via the same mechanism." **Reality:** Students.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)',
                  options: ['Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)', 'Haloalkanes (alkyl halides) are organic compounds in', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Free radical halogenation is a substitution reaction where a hydrogen atom in an alkane'],
                  hint: 'If stuck on mechanism prediction, revisit **c11_chem_cbse_04_007 (Hybridisation)** for carbocation.',
                  misconception: '**Misconception:** "All alcohols react with conc. HX to give haloalkanes via the same mechanism." **Reality:** Students write a single.' }
          ],
            remediations: { 'misconception-all-alcohols-react-with': { steps: ['If the student cannot distinguish mechanisms by alcohol class: 1.', 'Revisit **c11_chem_cbse_04_007 (Hybridisation)** — draw sp³ vs sp² carbons, identify carbocation stability order 3° >.', 'Revisit **c12_chem_cbse_06_001 (Classification)** — practice identifying 1°/2°/3° alcohols from structures.', 'Do **re-diagnostic**: Given CH₃CH₂OH, (CH₃)₂CHOH, (CH₃)₃COH — predict reaction speed with HCl/ZnCl₂ and mechanism.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_004', difficulty: 'standard',
          question: 'Free radical halogenation is a substitution reaction where a hydrogen atom.',
          hint: 'Review c11_chem_cbse_04_006 (valence bond theory) for homolytic fission and.',
          misconception: 'Students write the propagation steps as: CH₄ + Cl• → CH₃• + HCl (correct) but then CH₃• + Cl• → CH₃Cl (WRONG — this.',
          parts: [
                { id: 'a', prompt: 'Why does free radical bromination of 2-methylbutane give predominantly 2-bromo-2-methylbutane (tertiary bromide) while chlorination gives a more mixed product.', answer: 'Bromination has a higher activation energy and is more selective (ΔH ≈ +ve for',
                  options: ['Bromination has a higher activation energy and is more selective (ΔH ≈ +ve for', 'bromine is less reactive so it picks the easiest hydrogen'],
                  hint: 'Review c11_chem_cbse_04_006 (valence bond theory) for homolytic fission and c12_chem_cbse_06_001.',
                  misconception: 'Students write the propagation steps as: CH₄ + Cl• → CH₃• + HCl (correct) but then CH₃• + Cl• → CH₃Cl (WRONG — this is a termination step).' },
                { id: 'b', prompt: 'Analyze: "Free radical chlorination of neopentane, (CH₃)₄C, gives only one monochlorinated product." Is this statement correct? Justify.', answer: 'Correct',
                  options: ['Correct', 'neopentane has no hydrogen on the central carbon so it cannot react'],
                  hint: 'Review c11_chem_cbse_04_006 (valence bond theory) for homolytic fission and c12_chem_cbse_06_001.',
                  misconception: 'Students write the propagation steps as: CH₄ + Cl• → CH₃• + HCl (correct) but then CH₃• + Cl• → CH₃Cl (WRONG — this is a termination step).' }
          ],
            remediations: { 'students-write-the-propagation-steps': { steps: ['Revisit homolytic fission concept from c11_chem_cbse_04_006 (valence bond theory).', 'Draw the chain cycle on paper: Initiation → Propagation (2 steps) → Termination (3 combinations).', 'Practice with methane: write all 3 termination products (Cl₂, CH₃Cl, C₂H₆).', 'Redo Diagnostic Q1 and Q2 after drawing mechanism.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_005', difficulty: 'standard',
          question: 'Haloarenes (aryl halides) are prepared by electrophilic aromatic substitution.',
          hint: 'If stuck on directing effects, review Class 11 Hydrocarbons chapter: "Electrophilic.',
          misconception: 'Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl" omitting the diazonium.',
          parts: [
                { id: 'a', prompt: 'Write the reagents and conditions for the electrophilic chlorination of benzene. What is the role of the Lewis acid catalyst?', answer: 'Reagents: Benzene + Cl₂ with anhydrous FeCl₃ (or AlCl₃) in dark/room temperature',
                  options: ['Reagents: Benzene + Cl₂ with anhydrous FeCl₃ (or AlCl₃) in dark/room temperature', 'FeCl₃ acts as a base', 'no catalyst needed'],
                  hint: 'If stuck on directing effects, review Class 11 Hydrocarbons chapter: "Electrophilic Substitution.',
                  misconception: 'Students often write the Sandmeyer reaction for chlorination as "C₆H₅NH₂ + NaNO₂/HCl → C₆H₅Cl" omitting the diazonium salt intermediate and.' }
          ],
            remediations: { 'students-often-write-the-sandmeyer': { steps: ['Revisit node c11_chem_cbse_04_011 (Resonance Structures) to draw halogen resonance donation.', 'Review Class 11 Hydrocarbons chapter (electrophilic substitution mechanism) for carbocation intermediate stability.', 'Practice directing effect tables: activating = ortho/para (except -CH₃, -OH, -NH₂); deactivating = meta (except.', 'Re-do Diagnostic Q2 and Q4 with explicit resonance drawings.'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } },
        { type: 'subpart', nodeId: 'c12_chem_cbse_06_006', difficulty: 'standard',
          question: 'SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step.',
          hint: 'If stuck, revisit c11_chem_cbse_04_007 (Hybridisation) for sp² geometry and.',
          misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic',
                  options: ['SN1 (Substitution Nucleophilic Unimolecular) reaction is a two-step nucleophilic', 'Haloalkanes (alkyl halides) are organic compounds in', 'Nomenclature of haloalkanes and haloarenes is the systematic IUPAC naming of organic', 'Preparation of haloalkanes from alcohols involves the substitution of the hydroxyl (-OH)'],
                  hint: 'If stuck, revisit c11_chem_cbse_04_007 (Hybridisation) for sp² geometry and c12_chem_cbse_06_001.',
                  misconception: 'Students write the SN1 mechanism as a single step: R-Br + OH⁻ → R-OH + Br⁻, showing simultaneous bond breaking and formation.' }
          ],
            remediations: { 'students-write-the-sn1-mechanism': { steps: ['If the student draws a one-step mechanism or predicts inversion: (1) Revisit c11_chem_cbse_04_007 (Hybridisation).', '(2) Revisit c12_chem_cbse_06_001 — classify the substrate as 1°, 2°, 3° and recall that only 3°/allylic/benzylic form.', '(3) Perform the "umbrella inversion" demo: hold an umbrella (representing sp³ carbon), flip it inside out (inversion.', '(4) Re-derive rate law from slow step: Rate = k₁[R-X] (k₁ = rate constant for ionization).'], labTask: { instruction: 'On the interactive: place 4 electrons — which shell fills first? — then check.', widget: 'atom', validate: 'atom:electrons=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
