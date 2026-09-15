import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bio_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bio_ch05_p2: SimDef = {
    id: 'v3_c12_bio_ch05_p2',
    title: 'Principles of Inheritance and Variation · Part 2/2',
    subtitle: 'The dwarf trait never left — it was hiding. Mendel proved inheritance has rules.',
    classLevel: 12, subject: 'biology', topic: 'Principles of Inheritance and Variation · Part 2/2',
    chapters: ['c12_bio_ch05'],
    nodeIds: ['c12_bio_cbse_05_007', 'c12_bio_cbse_05_008', 'c12_bio_cbse_05_009', 'c12_bio_cbse_05_010', 'c12_bio_cbse_05_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Geneticist running a pea-plant cross', intro: 'One monk\'s garden arithmetic became the operating system of all heredity — here\'s the proof.', goal: 'Apply Mendel\'s laws to predict monohybrid cross outcomes and their ratios.' },
    discovery: {
        question: 'Cross tall with dwarf peas and every F1 plant is tall — dwarfness vanishes. Self-pollinate the F1 and it returns at exactly 3:1. What was the dwarf trait doing in F1?',
        options: ['Present but masked — the recessive allele stayed intact, hidden by the dominant one', 'Destroyed — the dominant allele eliminated it permanently', 'Converted — the dwarf allele mutated into a tall allele', 'Blended — tall and dwarf merged into an intermediate that re-separated later'],
        answer: 'Present but masked — the recessive allele stayed intact, hidden by the dominant one',
        hook: 'The blending intuition is deeply wrong: alleles are discrete units that segregate cleanly into gametes. The F2\'s precise 3:1 is the receipt proving nothing was lost or merged.',
    },
    teaching: [
        { title: 'Linkage and Recombination: Morgan\'s Experiments', text: 'Linkage is the tendency of genes located on the same chromosome to be inherited together during meiosis because they do not assort independently; recombination is the production of new allele.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bio_cbse_05_007', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Re-run Mendel\'s logic: predict F1 and F2 for a monohybrid cross, derive the 3:1 phenotypic and 1:2:1 genotypic ratios, and connect each law to what chromosomes physically do in meiosis.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_007', title: 'Linkage and Recombination: Morgan\'s Experiments',
          scaffold: { problem: 'In Drosophila, grey body (G) is dominant over black body (g), and normal wings (N) are dominant over vestigial wings (n).',
            steps: [
            { text: 'Identify parental and recombinant phenotypes. The two most frequent classes (580 each) are parental: grey-normal (G N).' },
            { text: 'Calculate total recombinant offspring = 20 + 20 = 40. Total offspring = 1200.' },
            { text: 'Apply RF formula: RF = (40 / 1200) × 100% = 3.33%.' },
            { text: 'Map distance = 3.33 cM (since RF < 50%).' },
            { text: 'Because parental gametes are G N and g n, the heterozygous female was in coupling phase (cis configuration): G N / g n.', faded: true, blankAnswer: 'Recombination frequency = 3.33%, map distance = 3.33 cM.' }
            ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_008', title: 'Sex-Linked Inheritance: Colour Blindness and Haemophilia',
          caseStudy: { intro: 'Begin with a real-world observation: in any Indian classroom, colour blindness is far more common in boys than girls — ask students why their male cousins.',
            decisions: [{ prompt: 'Define X-linked recessive inheritance and state why males are more frequently affected than females for traits like colour blindness and.', options: [
                { text: 'X-linked recessive inheritance occurs when a recessive allele on the X chromosome', outcome: 'X-linked recessive inheritance occurs when a recessive allele on the X chromosome expresses the.' },
                { text: 'males have weaker genes', outcome: 'Not quite — Students often believe that a carrier female (heterozygous for X-linked recessive allele) can never.', reveals: 'a-carrier-female-heterozygous-for' },
                { text: 'females don\'t have X chromosomes', outcome: 'Not quite — Students often believe that a carrier female (heterozygous for X-linked recessive allele) can never.', reveals: 'a-carrier-female-heterozygous-for' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_009', title: 'Chromosomal Disorders: Down, Klinefelter, Turner Syndromes',
          caseStudy: { intro: 'Start by showing a newborn baby with a single palmar crease, upward-slanting eyes, and hypotonia — a classic presentation that prompts a pediatrician to order.',
            decisions: [{ prompt: 'A karyotype shows 47 chromosomes with three copies of chromosome 21. What is the correct karyotype notation for this condition?', options: [
                { text: 'Correct answer: 47,XX,+21 or 47,XY,+21 (depending on sex)', outcome: 'Correct answer: 47,XX,+21 or 47,XY,+21 (depending on sex). A wrong answer like "47,XX,21".' },
                { text: '47,XX,21', outcome: 'Not quite — Students often think "Klinefelter syndrome is caused by an extra Y chromosome (XYY)" because they.', reveals: 'klinefelter-syndrome-is-caused-by' },
                { text: 'Trisomy 21', outcome: 'Not quite — Students often think "Klinefelter syndrome is caused by an extra Y chromosome (XYY)" because they.', reveals: 'klinefelter-syndrome-is-caused-by' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_011', title: 'Pedigree Analysis: Symbols and Interpretation',
          scaffold: { problem: 'A couple, both phenotypically normal, have a child with cystic fibrosis (autosomal recessive). They are expecting a second child.',
            steps: [
            { text: 'Identify the mode of inheritance — autosomal recessive (given). Affected child has genotype cf/cf.' },
            { text: 'Deduce parental genotypes — both parents must be heterozygous carriers (CF/cf) because they are normal but produced.' },
            { text: 'Set up the cross for the next child — CF/cf × CF/cf.' },
            { text: 'Determine genotypic outcomes — 1 CF/CF : 2 CF/cf : 1 cf/cf.' },
            { text: 'Apply conditional probability — the question asks for carrier (CF/cf) AND unaffected.', faded: true, blankAnswer: '2/3 or 66.7%' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Principles of Inheritance and Variation · Part 2/2', spots: [
            { id: 's1', label: 'Linkage and Recombination Morgans Experiments', prompt: 'Which idea is this? — Linkage is the tendency of genes located on the same chromosome to be inherited together.', answer: 'Linkage and Recombination Morgans Experiments', options: ['Linkage and Recombination Morgans Experiments', 'Sex-Linked Inheritance Colour Blindness and Haemophilia', 'Chromosomal Disorders Down Klinefelter Turner Syndromes', 'Gene Mutations Point Mutations and Frameshift Mutations'] },
            { id: 's2', label: 'Sex-Linked Inheritance Colour Blindness and Haemophilia', prompt: 'Which idea is this? — Sex-linked inheritance refers to the transmission of traits governed by genes located.', answer: 'Sex-Linked Inheritance Colour Blindness and Haemophilia', options: ['Sex-Linked Inheritance Colour Blindness and Haemophilia', 'Linkage and Recombination Morgans Experiments', 'Chromosomal Disorders Down Klinefelter Turner Syndromes', 'Gene Mutations Point Mutations and Frameshift Mutations'] },
            { id: 's3', label: 'Chromosomal Disorders Down Klinefelter Turner Syndromes', prompt: 'Which idea is this? — Chromosomal disorders are genetic conditions caused by abnormal chromosome number.', answer: 'Chromosomal Disorders Down Klinefelter Turner Syndromes', options: ['Chromosomal Disorders Down Klinefelter Turner Syndromes', 'Linkage and Recombination Morgans Experiments', 'Sex-Linked Inheritance Colour Blindness and Haemophilia', 'Gene Mutations Point Mutations and Frameshift Mutations'] },
            { id: 's4', label: 'Gene Mutations Point Mutations and Frameshift Mutations', prompt: 'Which idea is this? — A gene mutation is a permanent alteration in the DNA sequence of a gene, involving.', answer: 'Gene Mutations Point Mutations and Frameshift Mutations', options: ['Gene Mutations Point Mutations and Frameshift Mutations', 'Linkage and Recombination Morgans Experiments', 'Sex-Linked Inheritance Colour Blindness and Haemophilia', 'Chromosomal Disorders Down Klinefelter Turner Syndromes'] },
            { id: 's5', label: 'Pedigree Analysis Symbols and Interpretation', prompt: 'Which idea is this? — Pedigree analysis is a systematic method of tracing the inheritance pattern of a specific.', answer: 'Pedigree Analysis Symbols and Interpretation', options: ['Pedigree Analysis Symbols and Interpretation', 'Linkage and Recombination Morgans Experiments', 'Sex-Linked Inheritance Colour Blindness and Haemophilia', 'Chromosomal Disorders Down Klinefelter Turner Syndromes'] }
          ] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a kitchen-garden genetics project, a student crosses pure tall and dwarf pea plants and gets all tall F1. He writes in his log: \'the tall allele has destroyed the dwarf allele — dwarfness is gone for good from this line.\'',
            decisions: [{ prompt: 'What will the F2 from selfed F1 show?', options: [
                { text: 'About a quarter dwarfs — dominance only masks the recessive allele in the heterozygote; the allele stays intact and segregates into gametes, reappearing when homozygous.', outcome: 'Segregation is the giveaway: alleles separate unchanged in meiosis, so F2 shows roughly 3 tall : 1 dwarf — masking is not destruction.' },
                { text: 'All tall forever — the dominant allele permanently suppresses or eliminates the recessive one.', outcome: 'That\'s blending thinking; the recessive allele is transmitted unchanged and resurfaces in F2 — the classic 3:1 ratio.', reveals: 'dominance-destroys-recessive' },
                { text: 'A 1:1 mix of tall and dwarf, since the two alleles each \'win\' half the offspring.', outcome: 'Gametes are 1:1 but zygotes aren\'t phenotypes: three of four zygote classes carry at least one dominant allele and look tall.', reveals: 'gamete-ratio-is-phenotype-ratio' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bio_cbse_05_011', title: 'You made it',
          caseStudy: { intro: 'You now think in alleles, not appearances — the single biggest upgrade in genetics. Mendelian crosses are guaranteed board marks and the entry ticket to all of modern biology.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_007', difficulty: 'standard',
          question: 'Linkage is the tendency of genes located on the same chromosome to be inherited.',
          hint: 'If stuck, review c12_bio_cbse_05_003 (Dihybrid Cross) and c11_biotech_cbse_06_007.',
          misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes.',
          parts: [
                { id: 'a', prompt: 'Why did Morgan choose Drosophila melanogaster for his linkage studies, and what specific feature of Drosophila males makes them unique for linkage analysis?', answer: 'Morgan chose Drosophila',
                  options: ['Morgan chose Drosophila', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
                  hint: 'If stuck, review c12_bio_cbse_05_003 (Dihybrid Cross) and c11_biotech_cbse_06_007 (Linkage.',
                  misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes can separate through.' },
                { id: 'b', prompt: 'A student sets up a test cross for two linked genes A and B with a recombination frequency of 12%. The heterozygous parent is in coupling phase (AB/ab).', answer: 'Recombinant frequency = 12% → expected recombinant offspring = 0.12 × 500 = 60',
                  options: ['Recombinant frequency = 12% → expected recombinant offspring = 0.12 × 500 = 60', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
                  hint: 'If stuck, review c12_bio_cbse_05_003 (Dihybrid Cross) and c11_biotech_cbse_06_007 (Linkage.',
                  misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes can separate through.' },
                { id: 'c', prompt: 'In a three-point test cross involving genes X, Y, and Z, the following recombination frequencies are observed: X-Y = 8%, Y-Z = 15%, X-Z = 7%.', answer: 'The correct order is X-Z-Y (or Y-Z-X)',
                  options: ['The correct order is X-Z-Y (or Y-Z-X)', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
                  hint: 'If stuck, review c12_bio_cbse_05_003 (Dihybrid Cross) and c11_biotech_cbse_06_007 (Linkage.',
                  misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes can separate through.' }
          ],
            remediations: { 'linkage-means-genes-are-always': { steps: ['Revisit c12_bio_cbse_05_003 (Dihybrid Cross) to recall the 9:3:3:1 expectation under independent assortment.', 'Review c11_biotech_cbse_06_007 (Linkage: Complete and Incomplete Linkage) and c11_biotech_cbse_06_008 (Crossing Over.', 'Practice test-cross problems: draw chromosome diagrams for coupling and repulsion phases, label parental and.', 'Re-diagnostic: Given a test-cross dataset with 4 phenotypic classes, identify parental vs recombinant classes and.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_008', difficulty: 'standard',
          question: 'Sex-linked inheritance refers to the transmission of traits governed by genes.',
          hint: 'If stuck, review sex determination (c12_bio_cbse_05_006) and practice writing genotypes.',
          misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive allele) can never show any symptoms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Sex-linked inheritance refers to the transmission of traits governed by genes located on',
                  options: ['Sex-linked inheritance refers to the transmission of traits governed by genes located on', 'Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor', 'A monohybrid cross is a controlled breeding experiment between two individuals differing', 'A dihybrid cross is a breeding experiment between P-generation organisms that differ in'],
                  hint: 'If stuck, review sex determination (c12_bio_cbse_05_006) and practice writing genotypes for.',
                  misconception: 'Students often believe that a carrier female (heterozygous for X-linked recessive allele) can never show any symptoms.' }
          ],
            remediations: { 'a-carrier-female-heterozygous-for': { steps: ['If the student cannot deduce carrier status from pedigrees or misassigns genotypes in crosses: 1.', 'Revisit c12_bio_cbse_05_006 (Sex Determination) to reinforce XX/XY chromosome inheritance.', 'Practice monohybrid crosses with X/Y notation using c12_bio_cbse_05_002 (Monohybrid Cross) but replace autosomal.', 'Draw a 3-generation pedigree on paper: mark affected males, carrier females (half-shaded), normal individuals.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_009', difficulty: 'standard',
          question: 'Chromosomal disorders are genetic conditions caused by abnormal chromosome.',
          hint: 'If unable to predict gamete types from nondisjunction, review c11_bio_cbse_10_006 and.',
          misconception: 'Students often think "Klinefelter syndrome is caused by an extra Y chromosome (XYY)" because they confuse it with.',
          parts: [
                { id: 'a', prompt: 'A karyotype shows 47 chromosomes with three copies of chromosome 21. What is the correct karyotype notation for this condition?', answer: 'Correct answer: 47,XX,+21 or 47,XY,+21 (depending on sex)',
                  options: ['Correct answer: 47,XX,+21 or 47,XY,+21 (depending on sex)', '47,XX,21', 'Trisomy 21', 'Klinefelter syndrome is caused by an extra Y chromosome (XYY)'],
                  hint: 'If unable to predict gamete types from nondisjunction, review c11_bio_cbse_10_006 and.',
                  misconception: 'Students often think "Klinefelter syndrome is caused by an extra Y chromosome (XYY)" because they confuse it with Jacob\'s syndrome.' }
          ],
            remediations: { 'klinefelter-syndrome-is-caused-by': { steps: ['Revisit c12_bio_cbse_05_006 (Sex Determination) to reinforce SRY role.', 'Review meiosis stages in c11_bio_cbse_10_006 and c11_bio_cbse_10_007, drawing sex chromosome segregation for XX and.', 'Practice writing karyotype notations for 47,XXY; 47,XYY; 45,X; 47,XX,+21.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, watch a short animation of nondisjunction in meiosis I vs.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Klinefelter syndrome is caused by an extra Y chromosome (XYY)" because they confuse it with.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Turner syndrome (45,X) is less severe than Down syndrome (47,XX,+21) because missing one chromosome is better than having an extra one.".', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'Klinefelter syndrome is caused by an extra Y chromosome (XYY)'],
                  hint: 'If unable to predict gamete types from nondisjunction, review c11_bio_cbse_10_006 and.',
                  misconception: 'Students often think "Klinefelter syndrome is caused by an extra Y chromosome (XYY)" because they confuse it with Jacob\'s syndrome.' }
          ],
            remediations: { 'klinefelter-syndrome-is-caused-by': { steps: ['Revisit c12_bio_cbse_05_006 (Sex Determination) to reinforce SRY role.', 'Review meiosis stages in c11_bio_cbse_10_006 and c11_bio_cbse_10_007, drawing sex chromosome segregation for XX and.', 'Practice writing karyotype notations for 47,XXY; 47,XYY; 45,X; 47,XX,+21.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, watch a short animation of nondisjunction in meiosis I vs.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_010', difficulty: 'standard',
          question: 'A gene mutation is a permanent alteration in the DNA sequence of a gene.',
          hint: 'Review the genetic code table (c11_biotech_cbse_07_006) and practice translating short.',
          misconception: 'Students often think that a point mutation always changes the amino acid sequence, not realizing that the degeneracy.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A gene mutation is a permanent alteration in the DNA sequence of a gene, involving',
                  options: ['A gene mutation is a permanent alteration in the DNA sequence of a gene, involving', 'Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor', 'A monohybrid cross is a controlled breeding experiment between two individuals differing', 'A dihybrid cross is a breeding experiment between P-generation organisms that differ in'],
                  hint: 'Review the genetic code table (c11_biotech_cbse_07_006) and practice translating short mRNA.',
                  misconception: 'Students often think that a point mutation always changes the amino acid sequence, not realizing that the degeneracy of the genetic code.' }
          ],
            remediations: { 'a-point-mutation-always-changes': { steps: ['If a student cannot distinguish point vs frameshift mutations, have them revisit the genetic code table.', 'Use the "RAM HAS RED CAP" analogy from NCERT: write the sentence in triplets, then insert/delete letters and observe.', 'Then ask them to classify mutations in sickle cell anemia (point mutation) vs a hypothetical frameshift in the same.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_011', difficulty: 'standard',
          question: 'Pedigree analysis is a systematic method of tracing the inheritance pattern.',
          hint: 'If stuck, immediately review c12_bio_cbse_05_002 (Monohybrid Cross) — practice 5 Punnett.',
          misconception: 'Students often think "carrier" and "affected" are shown the same way in pedigrees.',
          parts: [
                { id: 'a', prompt: 'A pedigree shows an affected father and an unaffected mother. All their daughters are affected, but N/A of their sons are affected.', answer: 'This is X-linked dominant inheritance',
                  options: ['This is X-linked dominant inheritance', 'autosomal dominant', 'carrier', 'affected'],
                  hint: 'If stuck, immediately review c12_bio_cbse_05_002 (Monohybrid Cross) — practice 5 Punnett squares.',
                  misconception: 'Students often think "carrier" and "affected" are shown the same way in pedigrees.' }
          ],
            remediations: { 'carrier-and-affected-are-shown': { steps: ['Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to recall that heterozygotes (Aa) are phenotypically normal for.', 'Review the NCERT Figure 5.13 (Pedigree symbols) — draw each symbol 5 times from memory: square, circle, shaded.', 'Take a simple autosomal recessive pedigree (e.g., two carrier parents, 3 children: 1 affected, 2 normal) and label each.', 'Re-attempt Diagnostic Question 3 — if you get 2/3, the misconception is resolved.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
