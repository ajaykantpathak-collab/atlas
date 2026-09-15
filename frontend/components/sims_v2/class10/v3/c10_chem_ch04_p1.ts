import type { SimDef } from '../../engine/types';

/** v3 generated — c10_chem_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_chem_ch04_p1: SimDef = {
    id: 'v3_c10_chem_ch04_p1',
    title: 'Carbon and Its Compounds · Part 1/2',
    subtitle: 'Draw, branch and count the millions of shapes carbon can take',
    classLevel: 10, subject: 'chemistry', topic: 'Carbon and Its Compounds · Part 1/2',
    chapters: ['c10_chem_ch04'],
    nodeIds: ['c10_chem_cbse_04_001', 'c10_chem_cbse_04_002', 'c10_chem_cbse_04_003', 'c10_chem_cbse_04_004', 'c10_chem_cbse_04_005', 'c10_chem_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an organic chemist sketching never-before-seen molecules', intro: 'The gas in your stove, the vinegar in your kitchen and the cotton on your back are all carbon compounds — held together by one quiet rule: share, don\'t steal, electrons.', goal: 'Draw correct electron-dot structures, apply tetravalency, and explain catenation and isomerism.' },
    discovery: {
        question: 'A diamond and a pencil tip are both 100% pure carbon. One is the hardest natural substance and can\'t conduct; the other is soft, slippery, and lights an LED. How can identical atoms produce opposites?',
        options: ['The carbon atoms are bonded in different 3-D networks — bonding pattern, not atom type, sets the properties', 'Diamond has hidden impurities that make it hard', 'Graphite is partly metallic, which is why it conducts', 'Diamond is older, so its atoms had time to harden'],
        answer: 'The carbon atoms are bonded in different 3-D networks — bonding pattern, not atom type, sets the properties',
        hook: 'Carbon\'s superpower isn\'t the atom — it\'s the architecture. Share electrons four ways in a rigid lattice and you get diamond; in sliding sheets and you get graphite.',
    },
    teaching: [
        { title: 'Covalent Bonding in Carbon Compounds: Sharing of Electrons', text: 'Covalent bonding in carbon compounds is the chemical bond formed when carbon atoms share one or more pairs of valence electrons with other carbon atoms or atoms of other non-metals (like H, O, N, Cl).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_chem_cbse_04_001', title: 'Your mission',
          mission: { widget: 'molecule', validate: 'molecule:atoms=4',
            instruction: 'On the lab: set atoms to 4 — how do the bonds hold the chain together?.',
        context: 'Build carbon\'s molecules yourself: draw electron-dot structures that respect tetravalency, then hunt down every structural isomer hiding inside C₅H₁₂.',
            observePrompt: 'What did the molecule interactive show you?' } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_001', title: 'Covalent Bonding in Carbon Compounds: Sharing of Electrons',
          caseStudy: { intro: 'Start with a real-world observation: "When you light a gas stove (methane/CH₄) or use vinegar (acetic acid/CH₃COOH) in cooking, you are using carbon compounds.',
            decisions: [{ prompt: 'Write the electron dot structure of methane (CH₄) showing only the valence electrons.', options: [
                { text: 'Carbon (2,4) shares its 4 valence electrons with four hydrogen atoms (each 1)', outcome: 'Carbon (2,4) shares its 4 valence electrons with four hydrogen atoms (each 1).' },
                { text: 'gives away', outcome: 'Not quite — Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g.,.', reveals: 'students-often-draw-electron-dot' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_002', title: 'Versatile Nature of Carbon: Catenation and Tetravalency',
          caseStudy: { intro: 'Observe the incredible variety of carbon-based materials around you: the petrol in vehicles, the plastic buckets in your home, the cotton clothes you wear, the.',
            decisions: [{ prompt: 'Define catenation and tetravalency of carbon. How are they different from each other?', options: [
                { text: 'Catenation is the ability of an element to bond to itself, forming chains or rings (C–C', outcome: 'Catenation is the ability of an element to bond to itself, forming chains or rings (C–C bonds).' },
                { text: 'tetravalency is the ability to form chains', outcome: 'Not quite — Students believe catenation only produces straight chains. They draw only linear structures for.', reveals: 'catenation-only-produces-straight-chains' },
                { text: 'catenation means carbon has valency 4', outcome: 'Not quite — Students believe catenation only produces straight chains. They draw only linear structures for.', reveals: 'catenation-only-produces-straight-chains' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_003', title: 'Allotropes of Carbon: Diamond, Graphite and Fullerene',
          caseStudy: { intro: 'Begin with a real-world observation: a student holds a pencil "lead" (graphite) and a diamond ring — both are pure carbon, yet one writes smoothly and conducts.',
            decisions: [{ prompt: 'Name the type of hybridization and the number of sigma bonds formed by each carbon atom in diamond, graphite, and C₆₀ fullerene.', options: [
                { text: 'Diamond: sp³ hybridization, 4 sigma bonds per carbon', outcome: 'Diamond: sp³ hybridization, 4 sigma bonds per carbon. Graphite: sp² hybridization, 3 sigma bonds.' },
                { text: 'graphite has 4 sigma bonds', outcome: 'Not quite — Students write "graphite has free electrons like metals" in board exams, treating graphite\'s.', reveals: 'students-write-graphite-has-free' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_chem_cbse_04_004', title: 'Hydrocarbons: Saturated (Alkanes) and Unsaturated (Alkenes, Alkynes)',
          scaffold: { problem: 'Write the molecular formula and draw the structural formula (showing all bonds) of the first three members of the alkyne series.',
            steps: [
            { text: 'Recall the general formula for alkynes: CₙH₂ₙ₋₂. The first member has n=2 (minimum for a triple bond).' },
            { text: 'For n=2: C₂H₂ₙ₋₂ = C₂H₂. Draw two carbons connected by a triple bond (three lines).' },
            { text: 'For n=3: C₃H₂ₙ₋₂ = C₃H₄. Draw a three‑carbon chain with a triple bond between C1 and C2 (or C2 and C3).' },
            { text: 'For n=4: C₄H₂ₙ₋₂ = C₄H₆. Draw a four‑carbon chain with triple bond at position 1: H‑C≡C‑CH₂‑CH₃ (but‑1‑yne).' },
            { text: 'Summarise: Ethyne C₂H₂, Propyne C₃H₄, But‑1‑yne C₄H₆. All satisfy general formula CₙH₂ₙ₋₂.', faded: true, blankAnswer: 'Ethyne: C₂H₂, H‑C≡C‑H; Propyne: C₃H₄, H‑C≡C‑CH₃; But‑1‑yne.' }
            ] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_005', title: 'Isomerism: Structural Isomers of Carbon Compounds',
          caseStudy: { intro: 'Imagine you have a box of identical Lego bricks (carbon atoms) and you build two different shapes — a straight tower and a branched tree.',
            decisions: [{ prompt: 'What is the definition of structural isomers? Give an example with molecular formula C₄H₁₀.', options: [
                { text: 'Structural isomers are compounds with the same molecular formula but different structural', outcome: 'Structural isomers are compounds with the same molecular formula but different structural formulas.' },
                { text: 'same structure but different formula', outcome: 'Not quite — Students often draw "false isomers" by violating tetravalency: e.g., for C₅H₁₂, they draw.', reveals: 'students-often-draw-false-isomers' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_006', title: 'Functional Groups in Carbon Compounds (Alcohol, Aldehyde, Ketone, etc.)',
          caseStudy: { intro: 'Start by showing a student a bottle of hand sanitizer (contains ethanol), a bottle of vinegar (contains ethanoic acid), and a nail polish remover (contains.',
            decisions: [{ prompt: 'Name the functional group present in CH₃CH₂CHO and write its IUPAC name.', options: [
                { text: 'Functional group: Aldehyde (–CHO)', outcome: 'Functional group: Aldehyde (–CHO). IUPAC name: Propanal. A wrong answer like "ketone" or "alcohol".' },
                { text: 'ketone', outcome: 'Not quite — Students often think aldehydes and ketones have the same functional group because both contain C=O.', reveals: 'aldehydes-and-ketones-have-the' },
                { text: 'alcohol', outcome: 'Not quite — Students often think aldehydes and ketones have the same functional group because both contain C=O.', reveals: 'aldehydes-and-ketones-have-the' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'Plastics transformed medicine, food safety and daily life — and are now in the oceans, the food chain, and human blood. Banning them helps the environment; it also raises costs for the poorest.',
            decisions: [{ prompt: 'Can a material be both a miracle and a mistake?', options: [
                { text: 'Ban single-use first — keep it where it matters', outcome: 'The surgical approach — plastic in hospitals, not in grocery bags; requires alternatives to actually exist affordably.' },
                { text: 'Ban broadly — half-measures haven\'t worked', outcome: 'The urgency argument; honest that bans without substitutes shift cost to those least able to pay.' },
                { text: 'Fix recycling instead of banning', outcome: 'Technically appealing — but decades of \'recyclable\' plastic have mostly not been recycled; the honest question is whether this time is different.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'For a science exhibition, a student builds a simple conductivity tester — a bulb, a battery and two wires — and dips it into salt water, pure water, and a bottle of cooking spirit (ethanol). The bulb glows brightly only in the salt water. A classmate concludes the tester is broken \'because all clear liquids should behave the same.\'',
            decisions: [{ prompt: 'What explains why only the salt water lights the bulb?', options: [
                { text: 'Salt water contains free-moving ions — sodium and chloride — which carry charge through the liquid and complete the circuit. Pure water has almost no ions, and ethanol is a covalent compound that stays as neutral molecules in solution, so neither can conduct.', outcome: 'Conduction needs mobile charged particles. Ionic compounds supply them when dissolved; covalent molecules like ethanol do not ionise, so they stay non-conducting.' },
                { text: 'The classmate is right — any clear liquid conducts equally, so the tester must be faulty.', outcome: 'Clarity has nothing to do with it — conductivity depends on whether dissolved particles carry charge, and ethanol and pure water lack ions.', reveals: 'clear-liquids-conduct' },
                { text: 'The salt water conducts because salt makes water thicker, and thicker liquids carry electricity better.', outcome: 'Thickness is irrelevant — it is the presence of free ions, not viscosity, that lets the liquid carry current.', reveals: 'thickness-means-conduction' }
            ] }] } },
        { type: 'case', nodeId: 'c10_chem_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Four bonds plus the ability to chain with itself — that\'s how one element fills the world with petrol, plastic, cotton, medicine and you.',
            decisions: [{ prompt: 'What comes next? Carbon and Its Compounds · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Carbon and Its Compounds · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'molecule', prompt: 'Explore the molecule interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'molecule', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_001', difficulty: 'standard',
          question: 'Covalent bonding in carbon compounds is the chemical bond formed when carbon.',
          hint: 'If stuck, review "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and.',
          misconception: 'Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g., in CH₃Cl they draw.',
          parts: [
                { id: 'a', prompt: 'Write the electron dot structure of methane (CH₄) showing only the valence electrons. How many shared pairs of electrons are present in one molecule of methane?', answer: 'Carbon (2,4) shares its 4 valence electrons with four hydrogen atoms (each 1)',
                  options: ['Carbon (2,4) shares its 4 valence electrons with four hydrogen atoms (each 1)', 'gives away'],
                  hint: 'If stuck, review "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and "Valency.',
                  misconception: 'Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g., in CH₃Cl they draw C with 3 bonds to H and 1.' },
                { id: 'b', prompt: 'Carbon has atomic number 6. Explain why carbon forms covalent compounds by sharing electrons rather than by losing or gaining electrons to form C⁴⁺ or C⁴⁻.', answer: 'Carbon has 4 valence electrons',
                  options: ['Carbon has 4 valence electrons', 'carbon wants to complete its octet so it shares'],
                  hint: 'If stuck, review "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and "Valency.',
                  misconception: 'Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g., in CH₃Cl they draw C with 3 bonds to H and 1.' },
                { id: 'c', prompt: 'Compare the electron dot structures of ethane (C₂H₆), ethene (C₂H₄), and ethyne (C₂H₂).', answer: 'number of C—C bonds, (',
                  options: ['number of C—C bonds, (', 'double bond is twice as strong as single bond'],
                  hint: 'If stuck, review "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and "Valency.',
                  misconception: 'Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g., in CH₃Cl they draw C with 3 bonds to H and 1.' }
          ],
            remediations: { 'students-often-draw-electron-dot': { steps: ['Revisit carbon\'s electron configuration (2,4) from c9_chem_ch2_6. Write it daily for 3 days.', 'Practice the "4 bonds rule" drill: take 5 compounds (CH₄, C₂H₆, CH₃OH, CH₂O, HCN) and for each, count bonds on carbon.', 'Draw Lewis structures using the "valence electron counting" method: total valence electrons → skeleton → distribute.', 'Use the mnemonic "Carbon Always Forms Four" (CAFF) while drawing. Verify with teacher before moving to next node.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g., in CH₃Cl they draw.',
          parts: [
                { id: 'a', prompt: 'A student draws the electron dot structure of carbon dioxide (CO₂) as O=C=O with two lone pairs on each oxygen and no lone pairs on carbon.', answer: 'The claim is CORRECT',
                  options: ['The claim is CORRECT', 'incorrect because carbon has no lone pairs'],
                  hint: 'If stuck, review "Electron Distribution in Shells: 2n² Rule" (c9_chem_ch2_6) and "Valency.',
                  misconception: 'Students often draw electron dot structures where carbon has fewer or more than 4 bonds (e.g., in CH₃Cl they draw C with 3 bonds to H and 1.' }
          ],
            remediations: { 'students-often-draw-electron-dot': { steps: ['Revisit carbon\'s electron configuration (2,4) from c9_chem_ch2_6. Write it daily for 3 days.', 'Practice the "4 bonds rule" drill: take 5 compounds (CH₄, C₂H₆, CH₃OH, CH₂O, HCN) and for each, count bonds on carbon.', 'Draw Lewis structures using the "valence electron counting" method: total valence electrons → skeleton → distribute.', 'Use the mnemonic "Carbon Always Forms Four" (CAFF) while drawing. Verify with teacher before moving to next node.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_002', difficulty: 'standard',
          question: 'Carbon\'s tetravalency is its ability to form four covalent bonds by sharing its.',
          hint: 'Revisit Class 9 node c9_chem_ch2_7 (Valency) for electron configuration and valency.',
          misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g.',
          parts: [
                { id: 'a', prompt: 'Draw the structural formulas (showing all bonds) for the two structural isomers of C₄H₁₀. Name each isomer.', answer: 'Isomer 1 (straight chain): CH₃–CH₂–CH₂–CH₃ (Butane)',
                  options: ['Isomer 1 (straight chain): CH₃–CH₂–CH₂–CH₃ (Butane)', 'catenation only produces straight chains'],
                  hint: 'Revisit Class 9 node c9_chem_ch2_7 (Valency) for electron configuration and valency determination.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' },
                { id: 'b', prompt: 'A student draws a cyclic hydrocarbon with 5 carbon atoms and writes its molecular formula as C₅H₁₂. Is this correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'catenation only produces straight chains'],
                  hint: 'Revisit Class 9 node c9_chem_ch2_7 (Valency) for electron configuration and valency determination.',
                  misconception: 'Students believe catenation only produces straight chains. They draw only linear structures for a given formula (e.g., only n-pentane for.' }
          ],
            remediations: { 'catenation-only-produces-straight-chains': { steps: ['Build CH₄ — count bonds on carbon (4).', 'Replace one H with CH₃ to make C₂H₆ — verify each C still has 4 bonds.', 'Build C₃H₈ (linear). Then rebuild as branched C₄H₁₀ (isobutane) — show central C bonded to 3 C + 1 H.', 'Take n-butane model, remove two terminal H, join the ends to form cyclobutane — count H lost (2) and verify each C has.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_003', difficulty: 'standard',
          question: 'Allotropes are different structural forms of the same element in the same.',
          hint: 'If stuck, revisit Class 9 node c9_chem_ch3_4 (Covalent bonding) and c9_chem_ch2_7.',
          misconception: 'Students write "graphite has free electrons like metals" in board exams, treating graphite\'s conduction as metallic.',
          parts: [
                { id: 'a', prompt: 'Name the type of hybridization and the number of sigma bonds formed by each carbon atom in diamond, graphite, and C₆₀ fullerene.', answer: 'Diamond: sp³ hybridization, 4 sigma bonds per carbon',
                  options: ['Diamond: sp³ hybridization, 4 sigma bonds per carbon', 'graphite has 4 sigma bonds'],
                  hint: 'If stuck, revisit Class 9 node c9_chem_ch3_4 (Covalent bonding) and c9_chem_ch2_7 (Valency).',
                  misconception: 'Students write "graphite has free electrons like metals" in board exams, treating graphite\'s conduction as metallic bonding.' },
                { id: 'b', prompt: 'A student claims that because both diamond and graphite are giant covalent structures, both should have very high melting points.', answer: 'The claim is partially correct: both have high melting points',
                  options: ['The claim is partially correct: both have high melting points', 'graphite has low melting point'],
                  hint: 'If stuck, revisit Class 9 node c9_chem_ch3_4 (Covalent bonding) and c9_chem_ch2_7 (Valency).',
                  misconception: 'Students write "graphite has free electrons like metals" in board exams, treating graphite\'s conduction as metallic bonding.' },
                { id: 'c', prompt: 'Compare the C–C bond lengths in diamond (154 pm), graphite (142 pm), and C₆₀ fullerene (140–146 pm).', answer: 'Diamond: pure sp³ single bonds (bond order 1) → longest at 154 pm',
                  options: ['Diamond: pure sp³ single bonds (bond order 1) → longest at 154 pm', 'all same because all C–C bonds'],
                  hint: 'If stuck, revisit Class 9 node c9_chem_ch3_4 (Covalent bonding) and c9_chem_ch2_7 (Valency).',
                  misconception: 'Students write "graphite has free electrons like metals" in board exams, treating graphite\'s conduction as metallic bonding.' }
          ],
            remediations: { 'students-write-graphite-has-free': { steps: ['Revisit Class 9 covalent bonding (c9_chem_ch3_4) — draw Lewis structures of C in diamond (4 single bonds) vs graphite.', 'Use a physical model (toothpicks and clay balls) to build a tetrahedral diamond unit and a hexagonal graphite layer.', 'Write the exact CBSE marking scheme answer for "Why does graphite conduct electricity?" three times from memory.', 'Attempt a past board question (e.g., CBSE 2019, 2 marks) and self-grade using the official marking scheme.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_004', difficulty: 'standard',
          question: 'Hydrocarbons are organic compounds composed exclusively of carbon and hydrogen.',
          hint: 'If stuck, review the valency cross‑method (c9_chem_ch3_6) and the concept of tetravalency.',
          misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague.',
          parts: [
                { id: 'a', prompt: 'Write the molecular formula of the alkane, alkene, and alkyne that each contain exactly three carbon atoms.', answer: 'Alkane (3 C): C₃H₈ (using CₙH₂ₙ₊₂ → 2×3+2=8 H)',
                  options: ['Alkane (3 C): C₃H₈ (using CₙH₂ₙ₊₂ → 2×3+2=8 H)', 'unsaturated', 'empty space', 'can hold more hydrogen'],
                  hint: 'If stuck, review the valency cross‑method (c9_chem_ch3_6) and the concept of tetravalency of carbon.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' },
                { id: 'b', prompt: 'Explain why ethene (C₂H₄) is unsaturated while ethane (C₂H₆) is saturated, referring to the type of carbon‑carbon bond and the number of hydrogen atoms.', answer: 'Ethene has a carbon‑carbon double bond (C=C)',
                  options: ['Ethene has a carbon‑carbon double bond (C=C)', 'ethene has fewer carbons', 'ethane has more hydrogens', 'unsaturated'],
                  hint: 'If stuck, review the valency cross‑method (c9_chem_ch3_6) and the concept of tetravalency of carbon.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' },
                { id: 'c', prompt: 'A hydrocarbon has the molecular formula C₅H₁₀. Identify its class (alkane/alkene/alkyne) and draw one possible structural formula showing all bonds.', answer: 'General formula check: CₙH₂ₙ₊₂ for n=5 → C₅H₁₂ (alkane)',
                  options: ['General formula check: CₙH₂ₙ₊₂ for n=5 → C₅H₁₂ (alkane)', 'unsaturated', 'empty space', 'can hold more hydrogen'],
                  hint: 'If stuck, review the valency cross‑method (c9_chem_ch3_6) and the concept of tetravalency of carbon.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' },
                { id: 'd', prompt: 'Compare the hydrogen‑to‑carbon ratio (H/C) in methane (CH₄), ethene (C₂H₄), and ethyne (C₂H₂). What trend do you observe as unsaturation increases?', answer: 'Methane H/C = 4/1 = 4',
                  options: ['Methane H/C = 4/1 = 4', 'unsaturated', 'empty space', 'can hold more hydrogen'],
                  hint: 'If stuck, review the valency cross‑method (c9_chem_ch3_6) and the concept of tetravalency of carbon.',
                  misconception: 'Students often think that “unsaturated” means the molecule has “empty space” or “can hold more hydrogen” in a vague sense, and they write.' }
          ],
            remediations: { 'unsaturated-means-the-molecule-has': { steps: ['Revisit carbon’s tetravalency (c10_chem_cbse_04_001) — each carbon must have exactly four bonds.', 'For a given carbon skeleton, count the bonds on each carbon; if a carbon has a double bond, it can bond to only two.', 'Practice with ethene: draw C=C, then attach hydrogens so each carbon has four bonds total (two H on each).', 'Generalise: start from alkane formula CₙH₂ₙ₊₂, remove two H for each double bond, four H for each triple bond.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_005', difficulty: 'standard',
          question: 'Structural isomerism is a phenomenon where two or more carbon compounds have.',
          hint: 'Revisit c10_chem_cbse_04_001 (covalent bonding in carbon) and c10_chem_cbse_04_002.',
          misconception: 'Students often draw "false isomers" by violating tetravalency: e.g., for C₅H₁₂, they draw CH₃-CH₂-C(CH₃)₂-CH₃ (a carbon.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Structural isomerism is a phenomenon where two or more carbon compounds have the same',
                  options: ['Structural isomerism is a phenomenon where two or more carbon compounds have the same', 'Covalent bonding in carbon compounds is the chemical bond formed when carbon atoms share', 'Carbon\'s tetravalency is its ability to form four covalent bonds by sharing its four', 'Allotropes are different structural forms of the same element in the same physical state,'],
                  hint: 'Revisit c10_chem_cbse_04_001 (covalent bonding in carbon) and c10_chem_cbse_04_002 (catenation).',
                  misconception: 'Students often draw "false isomers" by violating tetravalency: e.g., for C₅H₁₂, they draw CH₃-CH₂-C(CH₃)₂-CH₃ (a carbon with 5 bonds: one.' }
          ],
            remediations: { 'students-often-draw-false-isomers': { steps: ['If a student draws duplicate isomers or violates valency: 1.', 'Give them molecular model kits (or use toothpicks and clay) to build C₅H₁₂ isomers physically — they will see.', 'Practice the "longest chain rule": for every structure, identify the longest continuous carbon chain and number it.', 'If two structures give the same name, they are identical.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } },
        { type: 'subpart', nodeId: 'c10_chem_cbse_04_006', difficulty: 'standard',
          question: 'A functional group is a specific atom or group of atoms in a carbon compound.',
          hint: 'Revisit c10_chem_cbse_04_001 (Covalent Bonding) and c10_chem_cbse_04_002 (Catenation).',
          misconception: 'Students often think aldehydes and ketones have the same functional group because both contain C=O.',
          parts: [
                { id: 'a', prompt: 'Name the functional group present in CH₃CH₂CHO and write its IUPAC name.', answer: 'Functional group: Aldehyde (–CHO)',
                  options: ['Functional group: Aldehyde (–CHO)', 'ketone', 'alcohol', 'aldehydes and ketones have the same functional group'],
                  hint: 'Revisit c10_chem_cbse_04_001 (Covalent Bonding) and c10_chem_cbse_04_002 (Catenation) to rebuild.',
                  misconception: 'Students often think aldehydes and ketones have the same functional group because both contain C=O.' },
                { id: 'b', prompt: 'Why does ethanol (CH₃CH₂OH) react with sodium metal to produce hydrogen gas, but propanone (CH₃COCH₃) does not?', answer: 'Ethanol has an –OH group with a polar O–H bond',
                  options: ['Ethanol has an –OH group with a polar O–H bond', 'both have oxygen so both react', 'aldehydes and ketones have the same functional group'],
                  hint: 'Revisit c10_chem_cbse_04_001 (Covalent Bonding) and c10_chem_cbse_04_002 (Catenation) to rebuild.',
                  misconception: 'Students often think aldehydes and ketones have the same functional group because both contain C=O.' },
                { id: 'c', prompt: 'Compare the boiling points of butan-1-ol (C₄H₉OH) and butanal (C₄H₈O). Which is higher and why? Relate to functional group and intermolecular forces.', answer: 'Butan-1-ol has a higher boiling point',
                  options: ['Butan-1-ol has a higher boiling point', 'butanal has higher BP', 'aldehydes and ketones have the same functional group'],
                  hint: 'Revisit c10_chem_cbse_04_001 (Covalent Bonding) and c10_chem_cbse_04_002 (Catenation) to rebuild.',
                  misconception: 'Students often think aldehydes and ketones have the same functional group because both contain C=O.' }
          ],
            remediations: { 'aldehydes-and-ketones-have-the': { steps: ['Draw methane (CH₄). Replace one H with –OH → methanol. Replace one H with –CHO → methanal (formaldehyde).', 'Use molecular models or paper cutouts: Build ethanol (CH₃–CH₂–OH) and ethanal (CH₃–CH=O).', 'Make a table: Functional group | Structure | Suffix | General Formula | Test with Na | Test with Tollens\'.', 'Practice 5 identification questions from past board papers (e.g., CBSE 2023, 2022) where the functional group must.'], labTask: { instruction: 'On the interactive: set atoms to 4 — how do the bonds hold the chain together? — then check.', widget: 'molecule', validate: 'molecule:atoms=4' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
