import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch05_p1: SimDef = {
    id: 'v3_c12_bio_ch05_p1',
    title: 'Principles of Inheritance and Variation · Part 1/2',
    subtitle: 'The dwarf trait never left — it was hiding. Mendel proved inheritance has rules.',
    classLevel: 12, subject: 'biology', topic: 'Principles of Inheritance and Variation · Part 1/2',
    chapters: ['c12_bio_ch05'],
    nodeIds: ['c12_bio_cbse_05_001', 'c12_bio_cbse_05_002', 'c12_bio_cbse_05_003', 'c12_bio_cbse_05_004', 'c12_bio_cbse_05_005', 'c12_bio_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geneticist running a pea-plant cross', intro: 'One monk\'s garden arithmetic became the operating system of all heredity — here\'s the proof.', goal: 'Apply Mendel\'s laws to predict monohybrid cross outcomes and their ratios.' },
    discovery: {
        question: 'Cross tall with dwarf peas and every F1 plant is tall — dwarfness vanishes. Self-pollinate the F1 and it returns at exactly 3:1. What was the dwarf trait doing in F1?',
        options: ['Present but masked — the recessive allele stayed intact, hidden by the dominant one', 'Destroyed — the dominant allele eliminated it permanently', 'Converted — the dwarf allele mutated into a tall allele', 'Blended — tall and dwarf merged into an intermediate that re-separated later'],
        answer: 'Present but masked — the recessive allele stayed intact, hidden by the dominant one',
        hook: 'The blending intuition is deeply wrong: alleles are discrete units that segregate cleanly into gametes. The F2\'s precise 3:1 is the receipt proving nothing was lost or merged.',
    },
    teaching: [
        { title: 'Mendel\'s Laws: Dominance, Segregation, Independent Assortment', text: 'Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor Mendel\'s pea plant experiments: (1) Law of Dominance — in a heterozygous condition, one allele (dominant) masks the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_05_001', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Re-run Mendel\'s logic: predict F1 and F2 for a monohybrid cross, derive the 3:1 phenotypic and 1:2:1 genotypic ratios, and connect each law to what chromosomes physically do in meiosis.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_001', title: 'Mendel\'s Laws: Dominance, Segregation, Independent Assortment',
          caseStudy: { intro: 'Observe a pea plant in your kitchen garden: some pods are green, some yellow; some seeds are round, some wrinkled.',
            decisions: [{ prompt: 'State Mendel\'s Law of Segregation in one sentence using the term "allele" and "gamete".', options: [
                { text: 'The Law of Segregation states that the two alleles of a gene separate during gamete', outcome: 'The Law of Segregation states that the two alleles of a gene separate during gamete formation.' },
                { text: 'genes separate during mitosis', outcome: 'Not quite — Students think "Law of Dominance means the dominant allele destroys or suppresses the recessive.', reveals: 'law-of-dominance-means-the' },
                { text: 'traits blend', outcome: 'Not quite — Students think "Law of Dominance means the dominant allele destroys or suppresses the recessive.', reveals: 'law-of-dominance-means-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_002', title: 'Monohybrid Cross: Phenotypic and Genotypic Ratios',
          scaffold: { problem: 'In pea plants, tall stem (T) is completely dominant over dwarf stem (t).',
            steps: [
            { text: 'Identify parental genotypes — true-breeding tall = TT, true-breeding dwarf = tt (homozygous by definition.' },
            { text: 'Determine gametes — TT parent produces only T gametes; tt parent produces only t gametes (law of segregation.' },
            { text: 'Construct F1 Punnett square — combine T and t gametes → all offspring are Tt (heterozygous).' },
            { text: 'Determine F1 phenotype — T is dominant, so all Tt plants are tall.' },
            { text: 'For F2, self-pollinate F1 (Tt × Tt). Each F1 parent produces two gamete types: T and t (50% each, by segregation).' },
            { text: 'Construct F2 Punnett square (4×4): combine T,t from male with T,t from female → genotypes: TT, Tt, tT, tt.' },
            { text: 'Count genotypes — 1 TT : 2 Tt (Tt + tT) : 1 tt = 1:2:1 genotypic ratio.' },
            { text: 'Count phenotypes — TT and Tt/tT show tall (dominant); tt shows dwarf (recessive) → 3 tall : 1 dwarf phenotypic ratio.', faded: true, blankAnswer: 'F1 — Genotypic: 100% Tt; Phenotypic: 100% tall. F2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_003', title: 'Dihybrid Cross: Phenotypic and Genotypic Ratios',
          scaffold: { problem: 'In garden peas, tall (T) is dominant to dwarf (t) and axial flower (A) is dominant to terminal flower (a).',
            steps: [
            { text: 'Assign genotypes — P generation: TTAA (tall axial) × ttaa (dwarf terminal)' },
            { text: 'F1 generation — all TtAa (tall axial); gametes from F1: TA, Ta, tA, ta (FOIL method)' },
            { text: 'Construct 4×4 Punnett square for F1 self-cross (TtAa × TtAa) — 16 equally likely zygotes' },
            { text: 'Count phenotypes — Tall axial (T_A_): 9; Tall terminal (T_aa): 3; Dwarf axial (ttA_): 3; Dwarf terminal (ttaa): 1 →.' },
            { text: 'Count genotypes — 9 distinct combinations with ratio 1 TTAA : 2 TTAa : 1 TTaa : 2 TtAA : 4 TtAa : 2 Ttaa : 1 ttAA : 2.' },
            { text: 'Probability of tall terminal = P(T_) × P(aa) = (3/4) × (1/4) = 3/16 = 0.1875', faded: true, blankAnswer: 'F2 phenotypic ratio = 9 tall axial : 3 tall terminal : 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_004', title: 'Incomplete Dominance and Codominance',
          scaffold: { problem: 'In Mirabilis jalapa (four o\'clock plant), red flower color (R) is incompletely dominant over white (r).',
            steps: [
            { text: 'Identify the genotypes of the parents. Red = RR (homozygous dominant). Pink = Rr (heterozygous, intermediate).' },
            { text: 'Determine gametes. RR produces only R gametes. Rr produces R and r gametes in 1:1 ratio.' },
            { text: 'Construct Punnett square: R (from red) × R/r (from pink) → offspring genotypes: RR and Rr in 1:1 ratio.' },
            { text: 'Map genotypes to phenotypes. RR = red, Rr = pink. So phenotypic ratio = 1 red : 1 pink.' },
            { text: 'Calculate expected numbers for 160 offspring. Red = 80, Pink = 80, White = 0.', faded: true, blankAnswer: 'Genotypic ratio 1 RR : 1 Rr. Phenotypic ratio 1 red : 1.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_005', title: 'Multiple Alleles: ABO Blood Group System',
          caseStudy: { intro: 'Imagine you are at a blood donation camp in Delhi and see a poster: "Blood Group O – Universal Donor, Blood Group AB – Universal Recipient." Have you ever.',
            decisions: [{ prompt: 'A man with blood group A and a woman with blood group B have a child with blood group O. What are the genotypes of the parents?', options: [
                { text: 'The father must be *I^A i* and the mother *I^B i*', outcome: 'The father must be *I^A i* and the mother *I^B i*. A group O child has genotype *ii*, meaning each.' },
                { text: 'incompletely dominant', outcome: 'Not quite — Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both.', reveals: 'the-i-a-and-i' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_006', title: 'Sex Determination in Humans: XX and XY',
          caseStudy: { intro: 'Observe a newborn baby announcement in an Indian newspaper — it proudly declares "It\'s a boy!" or "It\'s a girl!" Have you ever wondered what biological event.',
            decisions: [{ prompt: 'A human male produces two types of gametes with respect to sex chromosomes. What are they, and what is the chromosomal composition of each?', options: [
                { text: 'The male produces X-bearing sperm (22 autosomes + X) and Y-bearing sperm (22 autosomes +', outcome: 'The male produces X-bearing sperm (22 autosomes + X) and Y-bearing sperm (22 autosomes + Y).' },
                { text: 'XX and XY sperm', outcome: 'Not quite — Students believe "the Y chromosome determines maleness simply because it is present" — they treat.', reveals: 'the-y-chromosome-determines-maleness' },
                { text: 'X and XX sperm', outcome: 'Not quite — Students believe "the Y chromosome determines maleness simply because it is present" — they treat.', reveals: 'the-y-chromosome-determines-maleness' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Principles of Inheritance and Variation · Part 1/2', spots: [
            { id: 's1', label: 'Mendels Laws Dominance Segregation Independent Assortment', prompt: 'Which idea is this? — Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor.', answer: 'Mendels Laws Dominance Segregation Independent Assortment', options: ['Mendels Laws Dominance Segregation Independent Assortment', 'Monohybrid Cross Phenotypic and Genotypic Ratios', 'Dihybrid Cross Phenotypic and Genotypic Ratios', 'Incomplete Dominance and Codominance'] },
            { id: 's2', label: 'Monohybrid Cross Phenotypic and Genotypic Ratios', prompt: 'Which idea is this? — A monohybrid cross is a controlled breeding experiment between two individuals differing.', answer: 'Monohybrid Cross Phenotypic and Genotypic Ratios', options: ['Monohybrid Cross Phenotypic and Genotypic Ratios', 'Mendels Laws Dominance Segregation Independent Assortment', 'Dihybrid Cross Phenotypic and Genotypic Ratios', 'Incomplete Dominance and Codominance'] },
            { id: 's3', label: 'Dihybrid Cross Phenotypic and Genotypic Ratios', prompt: 'Which idea is this? — A dihybrid cross is a breeding experiment between P-generation organisms that differ.', answer: 'Dihybrid Cross Phenotypic and Genotypic Ratios', options: ['Dihybrid Cross Phenotypic and Genotypic Ratios', 'Mendels Laws Dominance Segregation Independent Assortment', 'Monohybrid Cross Phenotypic and Genotypic Ratios', 'Incomplete Dominance and Codominance'] },
            { id: 's4', label: 'Incomplete Dominance and Codominance', prompt: 'Which idea is this? — Incomplete dominance is a genetic inheritance pattern where neither allele is completely.', answer: 'Incomplete Dominance and Codominance', options: ['Incomplete Dominance and Codominance', 'Mendels Laws Dominance Segregation Independent Assortment', 'Monohybrid Cross Phenotypic and Genotypic Ratios', 'Dihybrid Cross Phenotypic and Genotypic Ratios'] },
            { id: 's5', label: 'Multiple Alleles ABO Blood Group System', prompt: 'Which idea is this? — Multiple alleles refer to the existence of more than two allelic forms of a gene in.', answer: 'Multiple Alleles ABO Blood Group System', options: ['Multiple Alleles ABO Blood Group System', 'Mendels Laws Dominance Segregation Independent Assortment', 'Monohybrid Cross Phenotypic and Genotypic Ratios', 'Dihybrid Cross Phenotypic and Genotypic Ratios'] },
            { id: 's6', label: 'Sex Determination in Humans XX and XY', prompt: 'Which idea is this? — Sex determination in humans is the biological mechanism where the XX/XY chromosomal.', answer: 'Sex Determination in Humans XX and XY', options: ['Sex Determination in Humans XX and XY', 'Mendels Laws Dominance Segregation Independent Assortment', 'Monohybrid Cross Phenotypic and Genotypic Ratios', 'Dihybrid Cross Phenotypic and Genotypic Ratios'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a kitchen-garden genetics project, a student crosses pure tall and dwarf pea plants and gets all tall F1. He writes in his log: \'the tall allele has destroyed the dwarf allele — dwarfness is gone for good from this line.\'',
            decisions: [{ prompt: 'What will the F2 from selfed F1 show?', options: [
                { text: 'About a quarter dwarfs — dominance only masks the recessive allele in the heterozygote; the allele stays intact and segregates into gametes, reappearing when homozygous.', outcome: 'Segregation is the giveaway: alleles separate unchanged in meiosis, so F2 shows roughly 3 tall : 1 dwarf — masking is not destruction.' },
                { text: 'All tall forever — the dominant allele permanently suppresses or eliminates the recessive one.', outcome: 'That\'s blending thinking; the recessive allele is transmitted unchanged and resurfaces in F2 — the classic 3:1 ratio.', reveals: 'dominance-destroys-recessive' },
                { text: 'A 1:1 mix of tall and dwarf, since the two alleles each \'win\' half the offspring.', outcome: 'Gametes are 1:1 but zygotes aren\'t phenotypes: three of four zygote classes carry at least one dominant allele and look tall.', reveals: 'gamete-ratio-is-phenotype-ratio' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now think in alleles, not appearances — the single biggest upgrade in genetics. Mendelian crosses are guaranteed board marks and the entry ticket to all of modern biology.',
            decisions: [{ prompt: 'What comes next? Principles of Inheritance and Variation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Principles of Inheritance and Variation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_001', difficulty: 'standard',
          question: 'Mendel\'s Laws are three fundamental principles of inheritance derived from.',
          hint: 'If stuck, revisit c11_bio_cbse_10_006 (Meiosis I) and draw labelled diagrams of.',
          misconception: 'Students think "Law of Dominance means the dominant allele destroys or suppresses the recessive allele permanently.".',
          parts: [
                { id: 'a', prompt: 'Explain why the Law of Independent Assortment holds true only for genes on different chromosomes or far apart on the same chromosome.', answer: 'Independent assortment occurs',
                  options: ['Independent assortment occurs', 'all genes assort independently'],
                  hint: 'If stuck, revisit c11_bio_cbse_10_006 (Meiosis I) and draw labelled diagrams of a heterozygous cell.',
                  misconception: 'Students think "Law of Dominance means the dominant allele destroys or suppresses the recessive allele permanently." In reality, dominance.' }
          ],
            remediations: { 'law-of-dominance-means-the': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and animate homologous chromosome separation — label maternal/paternal.', 'Use coloured beads (two colours for two alleles) to physically simulate segregation and independent assortment for two.', 'Re-attempt Diagnostic Question 2 and 5; if still incorrect, review c11_biotech_cbse_06_004 (Law of Independent.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_002', difficulty: 'standard',
          question: 'A monohybrid cross is a controlled breeding experiment between two individuals.',
          hint: 'If stuck, revisit c12_bio_cbse_05_001 (Mendel\'s Laws) and practice drawing allele.',
          misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population".',
          parts: [
                { id: 'a', prompt: 'A heterozygous tall pea plant (Tt) is crossed with a dwarf plant (tt). Predict the phenotypic and genotypic ratios of the offspring. Show the Punnett square.', answer: 'Parental genotypes: Tt × tt',
                  options: ['Parental genotypes: Tt × tt', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'If stuck, revisit c12_bio_cbse_05_001 (Mendel\'s Laws) and practice drawing allele segregation.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' },
                { id: 'b', prompt: 'Compare the genotypic ratio (1:2:1) and phenotypic ratio (3:1) in a standard F2 monohybrid cross. Why are they different?', answer: 'Genotypic ratio counts distinct genotypes (TT, Tt, tt = 1:2:1)',
                  options: ['Genotypic ratio counts distinct genotypes (TT, Tt, tt = 1:2:1)', 'ratios are always the same', 'incomplete dominance gives 3:1', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'If stuck, revisit c12_bio_cbse_05_001 (Mendel\'s Laws) and practice drawing allele segregation.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' }
          ],
            remediations: { 'the-3-1-phenotypic-ratio': { steps: ['Revisit c12_bio_cbse_05_001 (Mendel\'s Laws) — focus on law of segregation: "alleles separate during gamete formation."', 'Draw meiosis diagram showing one pair of homologous chromosomes separating into four gametes — label alleles.', 'Use two-colored beads (alleles) to physically model gamete formation for TT, Tt, tt parents.', 'Re-attempt Diagnostic Question 3 (Tt × tt cross) with bead model, then redraw Punnett square.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population".',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a monohybrid cross Tt × Tt, the probability of getting a tall plant is 3/4, so if we examine 4 offspring, exactly 3 will be tall.".', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'statement is correct', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'If stuck, revisit c12_bio_cbse_05_001 (Mendel\'s Laws) and practice drawing allele segregation.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' },
                { id: 'b', prompt: 'Design a monohybrid cross experiment to determine whether a tall pea plant from an unknown lineage is homozygous (TT) or heterozygous (Tt).', answer: 'Cross the unknown tall plant with a homozygous recessive dwarf plant (tt)',
                  options: ['Cross the unknown tall plant with a homozygous recessive dwarf plant (tt)', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'If stuck, revisit c12_bio_cbse_05_001 (Mendel\'s Laws) and practice drawing allele segregation.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' }
          ],
            remediations: { 'the-3-1-phenotypic-ratio': { steps: ['Revisit c12_bio_cbse_05_001 (Mendel\'s Laws) — focus on law of segregation: "alleles separate during gamete formation."', 'Draw meiosis diagram showing one pair of homologous chromosomes separating into four gametes — label alleles.', 'Use two-colored beads (alleles) to physically model gamete formation for TT, Tt, tt parents.', 'Re-attempt Diagnostic Question 3 (Tt × tt cross) with bead model, then redraw Punnett square.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_003', difficulty: 'standard',
          question: 'A dihybrid cross is a breeding experiment between P-generation organisms that.',
          hint: 'Review monohybrid cross mechanics (c12_bio_cbse_05_002) and practice FOIL method for.',
          misconception: 'Students believe the 9:3:3:1 phenotypic ratio means exactly 9 round yellow, 3 round green, 3 wrinkled yellow, and 1.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A dihybrid cross is a breeding experiment between P-generation organisms that differ in',
                  options: ['A dihybrid cross is a breeding experiment between P-generation organisms that differ in', 'Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor', 'A monohybrid cross is a controlled breeding experiment between two individuals differing', 'Incomplete dominance is a genetic inheritance pattern where neither allele is completely'],
                  hint: 'Review monohybrid cross mechanics (c12_bio_cbse_05_002) and practice FOIL method for gamete.',
                  misconception: 'Students believe the 9:3:3:1 phenotypic ratio means exactly 9 round yellow, 3 round green, 3 wrinkled yellow, and 1 wrinkled green.' }
          ],
            remediations: { 'the-9-3-3-1': { steps: ['Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to reinforce 3:1 phenotypic and 1:2:1 genotypic ratios for a single.', 'Practice the FOIL method (First, Outer, Inner, Last) for gamete formation from dihybrid genotypes using 5 different.', 'Build 4×4 Punnett squares physically with paper strips for 3 crosses, counting phenotypes and genotypes separately.', 'Re-attempt Diagnostic Questions 2 and 4, focusing on product-rule derivation rather than memorized ratios.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_004', difficulty: 'standard',
          question: 'Incomplete dominance is a genetic inheritance pattern where neither allele.',
          hint: 'If stuck, review c12_bio_cbse_05_002: practice drawing Punnett squares for Mendelian.',
          misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material.',
          parts: [
                { id: 'a', prompt: 'A cross between two pink-flowered snapdragons produces 240 offspring. How many red, pink, and white flowers are expected?', answer: 'Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)',
                  options: ['Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)', 'incomplete dominance = blending inheritance', 'pink is dominant or misapplies the 3:1 ratio'],
                  hint: 'If stuck, review c12_bio_cbse_05_002: practice drawing Punnett squares for Mendelian monohybrid.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'b', prompt: 'Compare the F₂ phenotypic ratios of a monohybrid cross showing incomplete dominance versus one showing codominance. Are they the same or different?', answer: 'Both give a 1:2:1 phenotypic ratio in F₂',
                  options: ['Both give a 1:2:1 phenotypic ratio in F₂', 'incomplete dominance = blending inheritance'],
                  hint: 'If stuck, review c12_bio_cbse_05_002: practice drawing Punnett squares for Mendelian monohybrid.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' }
          ],
            remediations: { 'incomplete-dominance-blending-inheritance-in': { steps: ['If the student holds the blending-inheritance misconception: (1) Revisit c12_bio_cbse_05_002 (Monohybrid Cross).', '(2) Draw a diagram showing DNA sequences of R and r alleles — emphasize they do not change.', '(3) Use the snapdragon Punnett square to track alleles: F₁ pink has genotype Rr, produces R and r gametes separately.', '(4) Re-diagnostic: Ask the student to explain how a pink-flowered plant can produce red-flowered offspring.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_005', difficulty: 'standard',
          question: 'Multiple alleles refer to the existence of more than two allelic forms of.',
          hint: 'If stuck on codominance, re-read c12_bio_cbse_05_004 worked examples on flower color;.',
          misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear.',
          parts: [
                { id: 'a', prompt: 'A man with blood group A and a woman with blood group B have a child with blood group O. What are the genotypes of the parents?', answer: 'The father must be *I^A i* and the mother *I^B i*',
                  options: ['The father must be *I^A i* and the mother *I^B i*', 'incompletely dominant'],
                  hint: 'If stuck on codominance, re-read c12_bio_cbse_05_004 worked examples on flower color; if stuck.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' },
                { id: 'b', prompt: 'Explain why a person with blood group AB has both A and B antigens on their RBCs but no anti-A or anti-B antibodies in their plasma.', answer: 'The *I^A* and *I^B* alleles are codominant: both are expressed equally in the',
                  options: ['The *I^A* and *I^B* alleles are codominant: both are expressed equally in the', 'AB has no antibodies', 'incompletely dominant'],
                  hint: 'If stuck on codominance, re-read c12_bio_cbse_05_004 worked examples on flower color; if stuck.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' },
                { id: 'c', prompt: 'A woman with blood group A claims a man with blood group AB is the father of her child with blood group O. Use a Punnett square to evaluate this claim.', answer: 'Mother (group A) could be *I^A I^A* or *I^A i*',
                  options: ['Mother (group A) could be *I^A I^A* or *I^A i*', 'possible if mother is *I^A i*', 'incompletely dominant'],
                  hint: 'If stuck on codominance, re-read c12_bio_cbse_05_004 worked examples on flower color; if stuck.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' },
                { id: 'd', prompt: 'Compare the genetic basis of the ABO blood group system with Mendel\'s monohybrid cross for seed shape (round vs wrinkled). Identify two fundamental differences.', answer: '(1) Mendel\'s cross involves two alleles (R, r) with complete dominance',
                  options: ['(1) Mendel\'s cross involves two alleles (R, r) with complete dominance', 'both follow law of segregation', 'incompletely dominant'],
                  hint: 'If stuck on codominance, re-read c12_bio_cbse_05_004 worked examples on flower color; if stuck.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' }
          ],
            remediations: { 'the-i-a-and-i': { steps: ['Revisit c12_bio_cbse_05_004 (Incomplete Dominance and Codominance) to clarify the distinction: draw a table comparing.', 'Review c11_biotech_cbse_06_006 (Class 11 Multiple Alleles) for the basic allele notation and Punnett square mechanics.', 'Practice 5 crosses: (a) *I^A i* × *I^B i*, (b) *I^A I^B* × *ii*, (c) *I^A I^A* × *I^B I^B*, (d) *I^A i* × *I^A i*, (e).', 'For each, write genotypes, phenotypes, and phenotypic ratios.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_006', difficulty: 'standard',
          question: 'Sex determination in humans is the biological mechanism where the XX/XY.',
          hint: 'If stuck on X-Y pairing, review c11_bio_cbse_10_006 (Meiosis I) — focus.',
          misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive.',
          parts: [
                { id: 'a', prompt: 'Compare and contrast the mechanism of sex determination in humans (XX/XY) with that in birds (ZZ/ZW).', answer: 'In humans, males are heterogametic (XY) and females homogametic (XX)',
                  options: ['In humans, males are heterogametic (XY) and females homogametic (XX)', 'birds also have XY', 'the larger chromosome determines sex', 'the Y chromosome determines maleness simply'],
                  hint: 'If stuck on X-Y pairing, review c11_bio_cbse_10_006 (Meiosis I) — focus on pseudoautosomal region.',
                  misconception: 'Students believe "the Y chromosome determines maleness simply because it is present" — they treat Y as a passive marker.' }
          ],
            remediations: { 'the-y-chromosome-determines-maleness': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and c11_bio_cbse_10_007 (Meiosis II) to visualise X-Y segregation.', 'Draw a flowchart: Fertilisation → Zygote (XX or XY) → SRY present?', 'Practice Punnett squares for sex chromosome crosses including non-disjunction scenarios.', 'Re-attempt Diagnostic Questions 3 and 5.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
