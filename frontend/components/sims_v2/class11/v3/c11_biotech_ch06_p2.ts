import type { SimDef } from '../../engine/types';

/** v3 generated — c11_biotech_ch06_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_biotech_ch06_p2: SimDef = {
    id: 'v3_c11_biotech_ch06_p2',
    title: 'Basic Principles of Inheritance · Part 2/2',
    subtitle: 'Work monohybrid and dihybrid crosses; decode dominance, segregation and independent assortment.',
    classLevel: 11, subject: 'biotechnology', topic: 'Basic Principles of Inheritance · Part 2/2',
    chapters: ['c11_biotech_ch06'],
    nodeIds: ['c11_biotech_cbse_06_007', 'c11_biotech_cbse_06_008', 'c11_biotech_cbse_06_009', 'c11_biotech_cbse_06_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a genetics researcher redoing Mendel\'s pea experiments', intro: 'A monastery garden in the 1850s cracked the logic of heredity with nothing but pea counts.', goal: 'State Mendel\'s laws, compute genotypic and phenotypic ratios, and define allele, genotype and phenotype.' },
    discovery: {
        question: 'Two tall pea plants are crossed and a quarter of the offspring come out dwarf. Nothing \'contaminated\' the cross. Where was the dwarfness hiding?',
        options: ['Both parents carried a recessive allele that only shows when two copies meet', 'Dwarfness is caused by soil nutrition, not genes', 'The tall gene mutated spontaneously in a quarter of seeds', 'Pea plants randomly revert to wild forms'],
        answer: 'Both parents carried a recessive allele that only shows when two copies meet',
        hook: 'Traits can skip a generation because alleles travel silently — phenotype never reveals the full genotype.',
    },
    teaching: [
        { title: 'Linkage: Complete and Incomplete Linkage', text: 'Linkage is the tendency of genes located on the same chromosome to be inherited together as a unit during meiosis, retaining their parental combinations in the offspring.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_biotech_cbse_06_007', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Run Mendel\'s crosses in a virtual garden and predict phenotypic ratios before the seeds sprout.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_06_007', title: 'Linkage: Complete and Incomplete Linkage',
          scaffold: { problem: 'In maize, the gene for coloured kernels (C) is dominant over colourless (c), and the gene for starchy endosperm (Wx) is dominant over waxy.',
            steps: [
            { text: 'Identify the parental (non-recombinant) phenotypes by finding the two most frequent classes: coloured-starchy (420) and.' },
            { text: 'Identify the recombinant phenotypes: coloured-waxy (85) and colourless-starchy (85).' },
            { text: 'Calculate total progeny = 420 + 410 + 85 + 85 = 1000. Calculate total recombinants = 85 + 85 = 170.' },
            { text: 'Recombination frequency = (170 / 1000) × 100% = 17%. Since RF < 50%, the genes are linked (incomplete linkage).' },
            { text: 'Map distance = 17 centimorgans (cM). Verify: parental frequency = 83%, recombinant frequency = 17%, sum = 100%.', faded: true, blankAnswer: 'Genes are linked (incomplete linkage). Recombination.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_06_008', title: 'Crossing Over: Mechanism and Significance',
          scaffold: { problem: 'In Drosophila, grey body (B) is dominant over black body (b), and long wings (V) is dominant over vestigial wings (v).',
            steps: [
            { text: 'Identify parental and recombinant phenotypes. Parental (most frequent): grey long (BV) and black vestigial (bv) — these.' },
            { text: 'Count recombinant offspring. Grey vestigial = 85, black long = 85. Total recombinants = 85 + 85 = 170.' },
            { text: 'Count total offspring. 415 + 415 + 85 + 85 = 1000.' },
            { text: 'Calculate recombination frequency. RF = (170 / 1000) × 100% = 17%.' },
            { text: 'Convert to map distance. Since RF = 17% (< 20%), map distance ≈ 17 cM (centimorgans).' },
            { text: 'Explain male parent irrelevance. The test cross parent (bbvv) contributes only recessive alleles (bv gametes).', faded: true, blankAnswer: 'Recombination frequency = 17%; Map distance = 17 cM.' }
            ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_009', title: 'Sex Determination: XX-XY and XO Systems',
          caseStudy: { intro: 'Imagine you are a geneticist studying a new insect species: you cross a male and female and observe a 1:1 sex ratio in the offspring, but when you examine the.',
            decisions: [{ prompt: 'State the sex chromosome constitution of males and females in the XX-XY and XO sex determination systems.', options: [
                { text: 'In XX-XY: female = XX, male = XY', outcome: 'In XX-XY: female = XX, male = XY. In XO: female = XX, male = XO (only one X, no Y).' },
                { text: 'What chromosome determines male sex in grasshoppers?', outcome: 'Not quite — Students often believe the Y chromosome is the universal male-determining factor in all species.', reveals: 'the-y-chromosome-is-the' },
                { text: 'Y chromosome', outcome: 'Not quite — Students often believe the Y chromosome is the universal male-determining factor in all species.', reveals: 'the-y-chromosome-is-the' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_010', title: 'Pedigree Analysis: Symbols and Interpretation',
          caseStudy: { intro: 'Imagine a genetic counsellor in a Delhi hospital meeting a couple where the husband\'s father and paternal grandmother had a rare bleeding disorder, but his.',
            decisions: [{ prompt: 'What is the standard symbol used to represent an affected female in a pedigree chart, and how is a mating between two individuals indicated?', options: [
                { text: 'An affected female is represented by a completely shaded circle', outcome: 'An affected female is represented by a completely shaded circle.' },
                { text: 'if a trait skips a generation, it must be recessive', outcome: 'Not quite — Students believe that "if a trait skips a generation, it must be recessive" and "if it appears.', reveals: 'if-a-trait-skips-a' },
                { text: 'if it appears in every generation, it must be dominant', outcome: 'Not quite — Students believe that "if a trait skips a generation, it must be recessive" and "if it appears.', reveals: 'if-a-trait-skips-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_biotech_cbse_06_008', title: 'Identify each idea',
          dissect: { specimen: 'Basic Principles of Inheritance · Part 2/2', spots: [
            { id: 's1', label: 'Linkage Complete and Incomplete Linkage', prompt: 'Which idea is this? — Linkage is the tendency of genes located on the same chromosome to be inherited together.', answer: 'Linkage Complete and Incomplete Linkage', options: ['Linkage Complete and Incomplete Linkage', 'Crossing Over Mechanism and Significance', 'Sex Determination XX-XY and XO Systems', 'Pedigree Analysis Symbols and Interpretation'] },
            { id: 's2', label: 'Crossing Over Mechanism and Significance', prompt: 'Which idea is this? — Crossing over is the reciprocal exchange of genetic material between non-sister.', answer: 'Crossing Over Mechanism and Significance', options: ['Crossing Over Mechanism and Significance', 'Linkage Complete and Incomplete Linkage', 'Sex Determination XX-XY and XO Systems', 'Pedigree Analysis Symbols and Interpretation'] },
            { id: 's3', label: 'Sex Determination XX-XY and XO Systems', prompt: 'Which idea is this? — Sex determination is the biological mechanism that decides the sex of an organism based.', answer: 'Sex Determination XX-XY and XO Systems', options: ['Sex Determination XX-XY and XO Systems', 'Linkage Complete and Incomplete Linkage', 'Crossing Over Mechanism and Significance', 'Pedigree Analysis Symbols and Interpretation'] },
            { id: 's4', label: 'Pedigree Analysis Symbols and Interpretation', prompt: 'Which idea is this? — Pedigree analysis is a systematic method of recording and interpreting the inheritance.', answer: 'Pedigree Analysis Symbols and Interpretation', options: ['Pedigree Analysis Symbols and Interpretation', 'Linkage Complete and Incomplete Linkage', 'Crossing Over Mechanism and Significance', 'Sex Determination XX-XY and XO Systems'] }
          ] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Your biology teacher wants the class to run a mini-Mendel project this year. Proposals on the table: ornamental roses, the school\'s mango tree, and fast-cycling Brassica (rapa) plants. A classmate votes for the mango tree \'because it\'s big and gives lots of fruit\' and roses \'because they\'re pretty and common\'.',
            decisions: [{ prompt: 'Which organism should the class pick, and on Mendel\'s actual criteria?', options: [
                { text: 'Fast-cycling Brassica: short generation time (weeks, not years), controllable pollination (bisexual flowers you can emasculate and hand-cross), discrete contrasting traits, many offspring per cross, and the ability to make true-breeding lines first — Mendel\'s real criteria were experimental control, not convenience or size.', outcome: 'Mendel chose peas because their biology kept the signal clean: pure lines, controlled crosses, countable discrete traits, big samples.' },
                { text: 'The mango tree — more seeds and fruit means more data, and that\'s all Mendel needed.', outcome: 'A mango takes years to flower and you can\'t control its pollination or get true-breeding lines in a school year; raw numbers without controlled parentage produce noise, not ratios.', reveals: 'bigger-plant-more-data' },
                { text: 'Roses — Mendel picked peas simply because they were common in his garden, so any common plant works.', outcome: 'Commonness wasn\'t the point: peas self-pollinate unless you intervene, show discrete non-overlapping traits, and breed true — roses\' hybridised, continuous traits would bury any 3:1 signal.', reveals: 'mendel-chose-what-was-handy' }
            ] }] } },
        { type: 'case', nodeId: 'c11_biotech_cbse_06_010', title: 'You made it',
          caseStudy: { intro: 'Mendel\'s insight: inheritance is particulate — traits come as discrete units that shuffle but never blend.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_007', difficulty: 'standard',
          question: 'Linkage is the tendency of genes located on the same chromosome to be inherited.',
          hint: 'Review the dihybrid test cross (c11_biotech_cbse_06_004) and meiosis I chromosome.',
          misconception: 'Students often believe that "linked genes are always inherited together and never separate." This leads them to think.',
          parts: [
                { id: 'a', prompt: 'In a test cross of a dihybrid F1 (AaBb) with a double recessive (aabb), you observe the following progeny: 42% AB, 42% ab, 8% Ab, 8% aB. Are the genes linked?', answer: 'Yes, the genes are linked and show incomplete linkage',
                  options: ['Yes, the genes are linked and show incomplete linkage', 'complete linkage', 'not linked because all four types appear', 'linked genes are always inherited together and never separate'],
                  hint: 'Review the dihybrid test cross (c11_biotech_cbse_06_004) and meiosis I chromosome behavior.',
                  misconception: 'Students often believe that "linked genes are always inherited together and never separate." This leads them to think that a test cross.' }
          ],
            remediations: { 'linked-genes-are-always-inherited': { steps: ['Show the student a physical chromosome diagram with two gene loci.', 'Walk through meiosis I with and without a chiasma between the loci.', 'Give a simple numerical exercise: "If 100 meiotic events occur and crossing over happens between the loci in 20.', 'Revisit Morgan\'s data—have the student label each phenotype as parental or recombinant, then calculate RF.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that "linked genes are always inherited together and never separate." This leads them to think.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If two genes are linked, a test cross of the F1 dihybrid will always produce only two phenotypes in the progeny." Evaluate this statement.', answer: 'The statement is true ONLY for complete linkage',
                  options: ['The statement is true ONLY for complete linkage', 'true for both', 'false for both', 'linked genes are always inherited together and never separate'],
                  hint: 'Review the dihybrid test cross (c11_biotech_cbse_06_004) and meiosis I chromosome behavior.',
                  misconception: 'Students often believe that "linked genes are always inherited together and never separate." This leads them to think that a test cross.' }
          ],
            remediations: { 'linked-genes-are-always-inherited': { steps: ['Show the student a physical chromosome diagram with two gene loci.', 'Walk through meiosis I with and without a chiasma between the loci.', 'Give a simple numerical exercise: "If 100 meiotic events occur and crossing over happens between the loci in 20.', 'Revisit Morgan\'s data—have the student label each phenotype as parental or recombinant, then calculate RF.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_008', difficulty: 'standard',
          question: 'Crossing over is the reciprocal exchange of genetic material between non-sister.',
          hint: 'Review meiosis prophase I from c9_bio_ch1_12 (focus on synapsis and chiasma formation).',
          misconception: 'Students believe crossing over occurs between sister chromatids because they look identical in textbook diagrams.',
          parts: [
                { id: 'a', prompt: 'Define crossing over and state the specific stage of meiosis when it occurs. What structures are visibly formed at the sites of crossing over?', answer: 'Crossing over is the reciprocal exchange of genetic material between non-sister',
                  options: ['Crossing over is the reciprocal exchange of genetic material between non-sister', 'crossing over occurs in metaphase I', 'between sister chromatids'],
                  hint: 'Review meiosis prophase I from c9_bio_ch1_12 (focus on synapsis and chiasma formation) and linkage.',
                  misconception: 'Students believe crossing over occurs between sister chromatids because they look identical in textbook diagrams.' }
          ],
            remediations: { 'crossing-over-occurs-between-sister': { steps: ['Use four pipe cleaners of two colors (two long red, two short blue) to model homologous chromosomes.', 'Draw a chromosome with three genes A-B-C. Mark crossover points: between A-B only (single CO), between B-C only (single.', 'Calculate RF for A-C from your drawing: single COs in both regions produce Abc and aBC (recombinant for A-C), but.', 'Re-read NCERT Fig. 6.10 and 6.11 — note the knob/translocation markers are on HOMOLOGS, not sisters.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_009', difficulty: 'standard',
          question: 'Sex determination is the biological mechanism that decides the sex of.',
          hint: 'Review the Law of Segregation (c11_biotech_cbse_06_003) and meiosis (c9_bio_ch1_12).',
          misconception: 'Students often believe the Y chromosome is the universal male-determining factor in all species because they learned.',
          parts: [
                { id: 'a', prompt: 'State the sex chromosome constitution of males and females in the XX-XY and XO sex determination systems.', answer: 'In XX-XY: female = XX, male = XY',
                  options: ['In XX-XY: female = XX, male = XY', 'What chromosome determines male sex in grasshoppers?', 'Y chromosome', 'XO males are XY or that females are XO'],
                  hint: 'Review the Law of Segregation (c11_biotech_cbse_06_003) and meiosis (c9_bio_ch1_12) focusing on how.',
                  misconception: 'Students often believe the Y chromosome is the universal male-determining factor in all species because they learned human sex.' },
                { id: 'b', prompt: 'A geneticist crosses a female grasshopper (XO system) with a male grasshopper. She observes that 50% of the offspring are male and 50% female.', answer: 'Female parent (XX) produces only X eggs',
                  options: ['Female parent (XX) produces only X eggs', 'What chromosome determines male sex in grasshoppers?', 'Y chromosome'],
                  hint: 'Review the Law of Segregation (c11_biotech_cbse_06_003) and meiosis (c9_bio_ch1_12) focusing on how.',
                  misconception: 'Students often believe the Y chromosome is the universal male-determining factor in all species because they learned human sex.' },
                { id: 'c', prompt: 'Compare the chromosomal basis of sex determination in Drosophila (XX-XY) and grasshopper (XO).', answer: 'In Drosophila, the Y chromosome is required for fertility but not for male sex',
                  options: ['In Drosophila, the Y chromosome is required for fertility but not for male sex', 'What chromosome determines male sex in grasshoppers?', 'Y chromosome'],
                  hint: 'Review the Law of Segregation (c11_biotech_cbse_06_003) and meiosis (c9_bio_ch1_12) focusing on how.',
                  misconception: 'Students often believe the Y chromosome is the universal male-determining factor in all species because they learned human sex.' }
          ],
            remediations: { 'the-y-chromosome-is-the': { steps: ['If a student cannot distinguish the systems: (1) Have them draw the meiotic division for an XX-XY male and an XO male.', '(2) Ask: "What gametes does an XO male produce?" Guide them to realise that without a Y, the two sex chromosomes (X and.', '(3) Then build Punnett squares for both systems using the actual gametes.', '(4) Finally, ask them to state in one sentence why both give 1:1 ratio — the answer must mention heterogametic male.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_010', difficulty: 'standard',
          question: 'Pedigree analysis is a systematic method of recording and interpreting the.',
          hint: 'If stuck, revisit c11_biotech_cbse_06_003 (Law of Segregation) for gamete formation.',
          misconception: 'Students believe that "if a trait skips a generation, it must be recessive" and "if it appears in every generation,.',
          parts: [
                { id: 'a', prompt: 'What is the standard symbol used to represent an affected female in a pedigree chart, and how is a mating between two individuals indicated?', answer: 'An affected female is represented by a completely shaded circle',
                  options: ['An affected female is represented by a completely shaded circle', 'if a trait skips a generation, it must be recessive', 'if it appears in every generation, it must be dominant'],
                  hint: 'If stuck, revisit c11_biotech_cbse_06_003 (Law of Segregation) for gamete formation mechanics and.',
                  misconception: 'Students believe that "if a trait skips a generation, it must be recessive" and "if it appears in every generation, it must be dominant.".' },
                { id: 'b', prompt: 'In a pedigree, two unaffected parents have an affected child. The trait appears in both males and females equally across generations.', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'dominant phenotype requires affected parent', 'recessive traits skip generations', 'if a trait skips a generation, it must be recessive'],
                  hint: 'If stuck, revisit c11_biotech_cbse_06_003 (Law of Segregation) for gamete formation mechanics and.',
                  misconception: 'Students believe that "if a trait skips a generation, it must be recessive" and "if it appears in every generation, it must be dominant.".' },
                { id: 'c', prompt: 'A pedigree shows an affected father with four children: two affected sons, one affected daughter, and one unaffected son. The mother is unaffected.', answer: 'Mode: Autosomal dominant',
                  options: ['Mode: Autosomal dominant', 'if a trait skips a generation, it must be recessive', 'if it appears in every generation, it must be dominant', 'X-linked recessive or giving 50% carrier probability'],
                  hint: 'If stuck, revisit c11_biotech_cbse_06_003 (Law of Segregation) for gamete formation mechanics and.',
                  misconception: 'Students believe that "if a trait skips a generation, it must be recessive" and "if it appears in every generation, it must be dominant.".' }
          ],
            remediations: { 'if-a-trait-skips-a': { steps: ['Have the student draw a Punnett square for Aa × Aa (autosomal recessive) and Aa × aa (autosomal dominant with affected.', 'Ask: "In the first cross, what % of offspring are affected? Can two unaffected parents have an affected child?" (Yes.', 'Ask: "In the second cross, can an affected parent have an unaffected child?" (Yes, 50%).', 'Show a pedigree where an affected grandparent has an unaffected child who has an affected child.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
