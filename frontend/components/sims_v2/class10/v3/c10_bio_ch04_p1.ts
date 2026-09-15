import type { SimDef } from '../../engine/types';

/** v3 generated — c10_bio_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_bio_ch04_p1: SimDef = {
    id: 'v3_c10_bio_ch04_p1',
    title: 'Heredity and Evolution',
    subtitle: 'Why you have your grandmother\'s eyes — and how small changes over millennia built every species alive.',
    classLevel: 10, subject: 'biology', topic: 'Heredity and Evolution · Part 1/2',
    chapters: ['c10_bio_ch04'],
    nodeIds: ['c10_bio_cbse_04_001', 'c10_bio_cbse_04_002', 'c10_bio_cbse_04_003', 'c10_bio_cbse_04_004', 'c10_bio_cbse_04_005', 'c10_bio_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a genetic counsellor explaining a family trait', intro: 'A couple asks why their child has a trait neither parent shows. Your job: trace the recessive allele that hid for a generation.', goal: 'Predict trait inheritance with Punnett logic and explain how selection turns small variations into new species.' },
    discovery: {
        question: 'Two brown-eyed parents have a blue-eyed child. Neither parent\'s eyes are blue — so whose eyes did the child inherit?',
        options: ['Both parents carried a hidden blue-eye gene', 'A grandparent\'s gene skipped generations', 'The mutation happened at birth', 'Eye colour isn\'t inherited'],
        answer: 'Both parents carried a hidden blue-eye gene',
        hook: 'Recessive traits don\'t vanish — they hide. Two carriers can both look one way while silently carrying the other.',
    },
    teaching: [
        { title: 'Accumulation of Variation During Reproduction: Basis of Heredity', text: 'Accumulation of variation during reproduction refers to the generation of genetic differences among offspring through mechanisms such as DNA replication errors (mutations), crossing over during.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_bio_cbse_04_001', title: 'Your mission',
          mission: { widget: 'dna', validate: 'dna:unzip=70',
            instruction: 'On the lab: unzip the helix past 70% — what do the base pairs do?.',
        context: 'On the heredity lab: cross two heterozygous parents and watch the 3:1 ratio emerge from hundreds of offspring.',
            observePrompt: 'What did the dna interactive show you?' } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_001', title: 'Accumulation of Variation During Reproduction: Basis of Heredity',
          caseStudy: { intro: 'Observe a litter of puppies or a batch of seedlings from the same parent plant — despite having the same parents, each individual shows subtle differences.',
            decisions: [{ prompt: 'Define \'accumulation of variation\' in the context of reproduction. Why is it considered the basis of heredity?', options: [
                { text: 'Accumulation of variation refers to the gradual build-up of genetic differences among', outcome: 'Accumulation of variation refers to the gradual build-up of genetic differences among individuals.' },
                { text: 'variation means mutations only', outcome: 'Not quite — Students often think variation in sexual reproduction comes *only* from mutations (like in asexual.', reveals: 'variation-in-sexual-reproduction-comes' },
                { text: 'heredity means cloning', outcome: 'Not quite — Students often think variation in sexual reproduction comes *only* from mutations (like in asexual.', reveals: 'variation-in-sexual-reproduction-comes' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_002', title: 'Mendel\'s Experiments: Monohybrid Cross and F1, F2 Generations',
          caseStudy: { intro: 'Imagine you plant seeds from a tall pea plant and a dwarf pea plant in your school garden in Delhi — all F1 plants grow tall, but when you self-pollinate them.',
            decisions: [{ prompt: 'Define a monohybrid cross and state the phenotypic ratio observed in the F2 generation when Mendel crossed pure-breeding tall and dwarf pea.', options: [
                { text: 'A monohybrid cross is a cross between two pure-breeding parents differing in one pair of', outcome: 'A monohybrid cross is a cross between two pure-breeding parents differing in one pair.' },
                { text: 'diluted', outcome: 'Not quite — Students often think that because F1 plants are tall (dominant), they are genetically "pure" for.', reveals: 'because-f1-plants-are-tall' },
                { text: '1:2:1 phenotypic ratio or defining monohybrid as involving two traits', outcome: 'Not quite — Students often think that because F1 plants are tall (dominant), they are genetically "pure" for.', reveals: 'because-f1-plants-are-tall' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_003', title: 'Mendel\'s Experiments: Dihybrid Cross and Phenotypic Ratios',
          scaffold: { problem: 'In a dihybrid cross between pure-breeding round yellow (RRYY) and wrinkled green (rryy) pea plants, the F1 are self-pollinated.',
            steps: [
            { text: 'Identify parental genotypes — RRYY (round yellow) × rryy (wrinkled green).' },
            { text: 'Determine F1 genotype — all RrYy (heterozygous for both traits). Phenotype: all round yellow.' },
            { text: 'Determine F1 gamete types — because of independent assortment, four gametes in equal proportion: RY, Ry, rY, ry.' },
            { text: 'Construct 4×4 Punnett square (16 boxes) or use forked-line method: each F1 gamete combines with each of the four types.' },
            { text: 'Group the 16 genotypes into four phenotypes: (RRYY, RRYy, RrYY, RrYy) = round yellow (9/16); (RRyy, Rryy) = round green.' },
            { text: 'Calculate expected numbers: round yellow = 9/16 × 640 = 360; round green = 3/16 × 640 = 120; wrinkled yellow = 3/16.' },
            { text: 'Verify sum = 360+120+120+40 = 640. Present answer as a labelled table.', faded: true, blankAnswer: 'Round yellow = 360, Round green = 120, Wrinkled yellow.' }
            ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_004', title: 'Mendel\'s Laws: Dominance, Segregation and Independent Assortment',
          caseStudy: { intro: 'Observe how children in your neighborhood often show a mix of parental traits — some have mother\'s curly hair but father\'s eye color, while siblings differ.',
            decisions: [{ prompt: 'State Mendel\'s Law of Segregation in one sentence using the terms \'allele\', \'gamete\', and \'heterozygous\'.', options: [
                { text: 'Correct answer: During gamete formation, the two alleles of a gene in a heterozygous', outcome: 'Correct answer: During gamete formation, the two alleles of a gene in a heterozygous individual.' },
                { text: 'genes split during reproduction', outcome: 'Not quite — Students often think "dominance means the dominant allele physically suppresses or destroys the.', reveals: 'dominance-means-the-dominant-allele' },
                { text: 'dominant allele kills recessive allele', outcome: 'Not quite — Students often think "dominance means the dominant allele physically suppresses or destroys the.', reveals: 'dominance-means-the-dominant-allele' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_005', title: 'Sex Determination in Humans: XX and XY Chromosomes',
          caseStudy: { intro: 'Observe a family in your neighbourhood where the first child is a girl and the second is a boy — have you ever wondered what decides this?',
            decisions: [{ prompt: 'State the sex chromosome composition of a human male and a human female, and name the type of gametes each produces with respect to sex.', options: [
                { text: 'Human male: XY; produces two types of sperm', outcome: 'Human male: XY; produces two types of sperm — 50% carry X, 50% carry Y.' },
                { text: 'virility', outcome: 'Not quite — Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s.', reveals: 'the-mother-s-diet' },
                { text: 'females produce X and Y gametes, or males produce only Y sperm', outcome: 'Not quite — Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s.', reveals: 'the-mother-s-diet' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_006', title: 'Acquired vs Inherited Traits: Distinction and Examples',
          caseStudy: { intro: 'Observe a wrestler with highly developed muscles from years of training — his children are not born with muscular bodies.',
            decisions: [{ prompt: 'A student writes: "A blacksmith develops strong arm muscles due to hammering.', options: [
                { text: 'The error is assuming acquired traits are inherited', outcome: 'The error is assuming acquired traits are inherited. The blacksmith\'s muscular arms are.' },
                { text: 'it is inherited', outcome: 'Not quite — Students believe that "traits developed during lifetime due to use/disuse or environment become.', reveals: 'traits-developed-during-lifetime-due' },
                { text: 'giraffes stretched necks to reach leaves, so offspring inherited long necks', outcome: 'Not quite — Students believe that "traits developed during lifetime due to use/disuse or environment become.', reveals: 'traits-developed-during-lifetime-due' }
            ] }] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_04_002', title: 'Identify each idea',
          dissect: { specimen: 'Heredity and Evolution · Part 1/2', spots: [
            { id: 's1', label: 'Mendels Experiments Monohybrid Cross and F1 F2 Generations', prompt: 'Which idea is this? — A monohybrid cross is a genetic cross between two pure-breeding (homozygous) parents that.', answer: 'Mendels Experiments Monohybrid Cross and F1 F2 Generations', options: ['Mendels Experiments Monohybrid Cross and F1 F2 Generations', 'Mendels Experiments Dihybrid Cross and Phenotypic Ratios', 'Sex Determination in Humans XX and XY Chromosomes', 'Acquired vs Inherited Traits Distinction and Examples'] },
            { id: 's2', label: 'Mendels Experiments Dihybrid Cross and Phenotypic Ratios', prompt: 'Which idea is this? — A dihybrid cross is a genetic cross between two individuals that differ in two distinct.', answer: 'Mendels Experiments Dihybrid Cross and Phenotypic Ratios', options: ['Mendels Experiments Dihybrid Cross and Phenotypic Ratios', 'Mendels Experiments Monohybrid Cross and F1 F2 Generations', 'Sex Determination in Humans XX and XY Chromosomes', 'Acquired vs Inherited Traits Distinction and Examples'] },
            { id: 's3', label: 'Sex Determination in Humans XX and XY Chromosomes', prompt: 'Which idea is this? — Sex determination in humans is the biological process by which the sex of an offspring.', answer: 'Sex Determination in Humans XX and XY Chromosomes', options: ['Sex Determination in Humans XX and XY Chromosomes', 'Mendels Experiments Monohybrid Cross and F1 F2 Generations', 'Mendels Experiments Dihybrid Cross and Phenotypic Ratios', 'Acquired vs Inherited Traits Distinction and Examples'] },
            { id: 's4', label: 'Acquired vs Inherited Traits Distinction and Examples', prompt: 'Which idea is this? — Acquired traits are characteristics developed by an organism during its lifetime due.', answer: 'Acquired vs Inherited Traits Distinction and Examples', options: ['Acquired vs Inherited Traits Distinction and Examples', 'Mendels Experiments Monohybrid Cross and F1 F2 Generations', 'Mendels Experiments Dihybrid Cross and Phenotypic Ratios', 'Sex Determination in Humans XX and XY Chromosomes'] }
          ] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'Scientists can now edit genes in crops to make them drought-resistant — feeding more people on less water. Critics worry about unknown long-term effects on ecosystems and who owns the seeds.',
            decisions: [{ prompt: 'Should India bet big on gene-edited crops?', options: [
                { text: 'Yes — climate change won\'t wait for perfect certainty', outcome: 'This bets on scientific evidence and urgent need; the risk is accepting unknowns that only time reveals.' },
                { text: 'Yes, but with public seed ownership', outcome: 'This accepts the science while protecting farmers from corporate control — harder to fund, fairer to share.' },
                { text: 'No — protect existing ecosystems first', outcome: 'This chooses caution, but caution has a cost: farmers facing failed monsoons don\'t get the option of certainty either.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family dinner, an uncle learns that a child has blood group O while the parents are A and B. He jokes that the hospital must have mixed up the babies, since \'blood group always comes from the parents.\'',
            decisions: [{ prompt: 'Is the uncle right to be suspicious?', options: [
                { text: 'No mix-up is needed. If the mother is I-A-i and the father is I-B-i, each can pass the recessive i allele, and a child getting i from both is group O. Gametes carry only one allele each, so A and B parents can have an O child.', outcome: 'This is ordinary Mendelian inheritance — recessive alleles can hide in parents and reappear in children. ABO involves three alleles with codominance, so many combinations are possible.' },
                { text: 'He is right — a child\'s blood group must always match one of the parents, so an O child from A and B parents is impossible.', outcome: 'That ignores recessive alleles. Parents who each carry a hidden i allele produce an O child one time in four on average.', reveals: 'blood-group-must-match-parent' },
                { text: 'The child\'s group is just a blend of A and B, and O is what the blend looks like.', outcome: 'Blending inheritance is wrong — alleles stay discrete and separate into gametes; O is not a mixture but the result of inheriting two i alleles.', reveals: 'blending-inheritance' }
            ] }] } },
        { type: 'case', nodeId: 'c10_bio_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You are the running total of every inheritance since life began — heredity explains your eyes, and evolution explains why eyes exist at all.',
            decisions: [{ prompt: 'What comes next? Heredity and Evolution · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Heredity and Evolution · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'dna', prompt: 'Explore the dna interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'dna', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_001', difficulty: 'standard',
          question: 'Accumulation of variation during reproduction refers to the generation.',
          hint: 'If stuck, review **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** and.',
          misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Asexual reproduction produces no variation at all, so it has no role in evolution." Is this statement correct? Explain why or why not.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'halves the chromosome number'],
                  hint: 'If stuck, review **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** and.',
                  misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and that meiosis simply.' }
          ],
            remediations: { 'variation-in-sexual-reproduction-comes': { steps: ['Revisit **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** — specifically the animation of crossing over.', 'Use a physical model: take 2 pairs of coloured socks (homologous chromosomes), pair them, twist at one point (crossing.', 'Write a 3-sentence explanation: "Meiosis creates variation by (1) crossing over between homologous chromosomes and (2).', 'Attempt Diagnostic Question 3 again without notes.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and.',
          parts: [
                { id: 'a', prompt: 'A farmer grows a crop using vegetative propagation (cuttings) for 10 years. Another farmer grows the same crop from seeds each year.', answer: 'The seed-grown population will show far more variation',
                  options: ['The seed-grown population will show far more variation', 'mutations', 'halves the chromosome number'],
                  hint: 'If stuck, review **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** and.',
                  misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and that meiosis simply.' },
                { id: 'b', prompt: 'Design a simple classroom activity using coloured beads or paper strips to model how independent assortment and fertilization create variation in offspring.', answer: '**Model**: Use 3 pairs of homologous chromosomes (e.g., red/blue, green/yellow,',
                  options: ['**Model**: Use 3 pairs of homologous chromosomes (e.g., red/blue, green/yellow,', 'halves the chromosome number'],
                  hint: 'If stuck, review **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** and.',
                  misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and that meiosis simply.' }
          ],
            remediations: { 'variation-in-sexual-reproduction-comes': { steps: ['Revisit **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** — specifically the animation of crossing over.', 'Use a physical model: take 2 pairs of coloured socks (homologous chromosomes), pair them, twist at one point (crossing.', 'Write a 3-sentence explanation: "Meiosis creates variation by (1) crossing over between homologous chromosomes and (2).', 'Attempt Diagnostic Question 3 again without notes.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_002', difficulty: 'standard',
          question: 'A monohybrid cross is a genetic cross between two pure-breeding (homozygous).',
          hint: 'If stuck, revisit c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction) to review.',
          misconception: 'Students often think that because F1 plants are tall (dominant), they are genetically "pure" for tallness, and that the.',
          parts: [
                { id: 'a', prompt: 'In a monohybrid cross of pea plants for seed shape (round R dominant over wrinkled r), an F1 plant (Rr) is self-pollinated.', answer: 'Wrinkled seeds reappear',
                  options: ['Wrinkled seeds reappear', 'diluted'],
                  hint: 'If stuck, revisit c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction) to review how.',
                  misconception: 'Students often think that because F1 plants are tall (dominant), they are genetically "pure" for tallness, and that the dwarf trait.' },
                { id: 'b', prompt: 'A student crosses a pure-breeding tall pea plant (TT) with a pure-breeding dwarf plant (tt). The F1 plants are all tall.', answer: 'The cross is Tt × tt',
                  options: ['The cross is Tt × tt', 'diluted'],
                  hint: 'If stuck, revisit c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction) to review how.',
                  misconception: 'Students often think that because F1 plants are tall (dominant), they are genetically "pure" for tallness, and that the dwarf trait.' },
                { id: 'c', prompt: 'Compare the genotypic and phenotypic ratios in the F2 generation of a monohybrid cross. Why are they different?', answer: 'Genotypic ratio = 1 TT : 2 Tt : 1 tt (1:2:1)',
                  options: ['Genotypic ratio = 1 TT : 2 Tt : 1 tt (1:2:1)', 'diluted'],
                  hint: 'If stuck, revisit c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction) to review how.',
                  misconception: 'Students often think that because F1 plants are tall (dominant), they are genetically "pure" for tallness, and that the dwarf trait.' }
          ],
            remediations: { 'because-f1-plants-are-tall': { steps: ['Revisit the definition of homozygous vs. heterozygous using the Punnett square for P generation cross (TT × tt → all.', 'Physically model allele segregation using colored beads (e.g., red for T, white for t) — show how F1 gets one of each.', 'Solve 3 test cross problems (Tt × tt) and 3 selfing problems (Tt × Tt) side-by-side to see the difference.', 'Write the genotype of F1 explicitly as "Tt (heterozygous)" in every practice problem until automatic.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_003', difficulty: 'standard',
          question: 'A dihybrid cross is a genetic cross between two individuals that differ in two.',
          hint: 'If stuck, review c10_bio_cbse_04_002 (monohybrid cross) and c9_bio_ch3_4 (meiosis).',
          misconception: 'Students often think the 9:3:3:1 ratio appears in the F1 generation, or that the F1 plants show all four phenotypes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A dihybrid cross is a genetic cross between two individuals that differ in two distinct',
                  options: ['A dihybrid cross is a genetic cross between two individuals that differ in two distinct', 'Accumulation of variation during reproduction refers to the generation of genetic', 'A monohybrid cross is a genetic cross between two pure-breeding (homozygous) parents that', 'Mendel\'s Laws of Inheritance are three principles derived from pea plant experiments: (1)'],
                  hint: 'If stuck, review c10_bio_cbse_04_002 (monohybrid cross) and c9_bio_ch3_4 (meiosis) — focus on how.',
                  misconception: 'Students often think the 9:3:3:1 ratio appears in the F1 generation, or that the F1 plants show all four phenotypes.' }
          ],
            remediations: { 'the-9-3-3-1': { steps: ['Revisit the monohybrid cross (c10_bio_cbse_04_002) — confirm you can explain why F1 is uniform and F2 shows 3:1.', 'Draw the dihybrid Punnett square on paper: 4×4 grid, label gametes RY, Ry, rY, ry on both axes.', 'Fill each cell, then count phenotypes by colour-coding: round yellow (9), round green (3), wrinkled yellow (3).', 'Verbally explain to a peer: "Each F1 plant makes four gamete types because the two genes sort independently; when these.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_004', difficulty: 'standard',
          question: 'Mendel\'s Laws of Inheritance are three principles derived from pea plant.',
          hint: 'Revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and focus on the difference.',
          misconception: 'Students often think "dominance means the dominant allele physically suppresses or destroys the recessive allele.".',
          parts: [
                { id: 'a', prompt: 'In a dihybrid cross between two heterozygous parents (RrYy × RrYy), the phenotypic ratio is 9:3:3:1.', answer: 'Correct answer: The 9:3:3:1 ratio arises',
                  options: ['Correct answer: The 9:3:3:1 ratio arises', 'the ratio is 9:3:3:1'],
                  hint: 'Revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and focus on the difference between.',
                  misconception: 'Students often think "dominance means the dominant allele physically suppresses or destroys the recessive allele." In reality, dominance.' }
          ],
            remediations: { 'dominance-means-the-dominant-allele': { steps: ['Use a concrete analogy — a factory with two instruction manuals (alleles).', 'Show a Punnett square for a monohybrid cross (Yy × Yy) and highlight that yy genotype still exists in 25% offspring.', 'Connect to meiosis: during anaphase I, both Y and y alleles separate into different gametes intact.', 'Practice writing "alleles segregate unchanged" in exam answers instead of "dominant allele suppresses recessive."'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_005', difficulty: 'standard',
          question: 'Sex determination in humans is the biological process by which the sex of.',
          hint: 'If stuck, review c9_bio_ch1_12 (Meiosis) focusing on the behaviour of homologous.',
          misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence.',
          parts: [
                { id: 'a', prompt: 'State the sex chromosome composition of a human male and a human female, and name the type of gametes each produces with respect to sex chromosomes.', answer: 'Human male: XY; produces two types of sperm',
                  options: ['Human male: XY; produces two types of sperm', 'virility', 'females produce X and Y gametes, or males produce only Y sperm'],
                  hint: 'If stuck, review c9_bio_ch1_12 (Meiosis) focusing on the behaviour of homologous chromosomes.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' },
                { id: 'b', prompt: 'A couple has three daughters. The father\'s mother claims he is "responsible" for not having a son.', answer: 'The father produces X and Y sperm in equal proportion',
                  options: ['The father produces X and Y sperm in equal proportion', 'the father\'s sperm quality changes', 'the mother\'s body rejects Y sperm', 'virility'],
                  hint: 'If stuck, review c9_bio_ch1_12 (Meiosis) focusing on the behaviour of homologous chromosomes.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' },
                { id: 'c', prompt: 'In a Punnett square for human sex determination, the male parent\'s gametes are written on the top and the female parent\'s gametes on the side.', answer: 'Top row (male gametes): X, Y',
                  options: ['Top row (male gametes): X, Y', 'virility'],
                  hint: 'If stuck, review c9_bio_ch1_12 (Meiosis) focusing on the behaviour of homologous chromosomes.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' },
                { id: 'd', prompt: 'Compare the sex determination mechanism in humans (XX/XY) with that in birds (ZZ/ZW).', answer: 'In humans, male is heterogametic (XY) → sperm determines sex',
                  options: ['In humans, male is heterogametic (XY) → sperm determines sex', 'virility', 'male is heterogametic in both'],
                  hint: 'If stuck, review c9_bio_ch1_12 (Meiosis) focusing on the behaviour of homologous chromosomes.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' }
          ],
            remediations: { 'the-mother-s-diet': { steps: ['Revisit c9_bio_ch1_12 (Meiosis) — draw the segregation of X and Y chromosomes during meiosis I and II in a male germ.', 'Use a coin-toss analogy: label one side X, the other Y; toss 20 times, record outcomes; observe ~10 X and ~10 Y.', 'Combine with a fixed X (mother) to show each toss gives either XX or XY with equal probability.', 'Write a one-sentence summary: "Sex is decided by which sperm fertilizes the ovum, and every sperm has an equal chance."'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_006', difficulty: 'standard',
          question: 'Acquired traits are characteristics developed by an organism during its.',
          hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on "meiosis occurs only.',
          misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes: "A blacksmith develops strong arm muscles due to hammering.', answer: 'The error is assuming acquired traits are inherited',
                  options: ['The error is assuming acquired traits are inherited', 'it is inherited', 'giraffes stretched necks to reach leaves, so offspring inherited long necks', 'acquired traits are inherited'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on "meiosis occurs only in germ.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' },
                { id: 'b', prompt: 'Why can a person who loses a finger in an accident not pass on the "missing finger" trait to their children, but a person with naturally six fingers.', answer: 'Losing a finger is an acquired trait',
                  options: ['Losing a finger is an acquired trait', 'both are physical changes', 'giraffes stretched necks to reach leaves, so offspring inherited long necks', 'acquired traits are inherited'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on "meiosis occurs only in germ.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' },
                { id: 'c', prompt: 'Compare the following pairs and classify each as acquired or inherited. Justify each classification in one sentence: (a) A scar from a burn vs.', answer: 'A scar from a burn vs',
                  options: ['A scar from a burn vs', 'giraffes stretched necks to reach leaves, so offspring inherited long necks', 'acquired traits are inherited', 'learning to swim is inherited'],
                  hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on "meiosis occurs only in germ.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' }
          ],
            remediations: { 'traits-developed-during-lifetime-due': { steps: ['Revisit c9_bio_ch3_4 (Meiosis) — recall that only germ cells undergo meiosis to form gametes; somatic cells divide.', 'Perform the "Tail-less mice" thought experiment: If you cut a mouse\'s tail, which cells lose DNA?', 'Draw a flowchart: Environment → Somatic cells (muscle, skin, nerve) → Phenotype change → **DEAD END** (not in gametes).', 'Practice classifying 15 traits using the question: "Is the DNA in sperm/egg altered?" If no → acquired.'], labTask: { instruction: 'On the interactive: unzip the helix past 70% — what do the base pairs do? — then check.', widget: 'dna', validate: 'dna:unzip=70' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
