import type { SimDef } from '../../engine/types';
import C12_BiologyLinkageCrossingOverSim from '../../../simulations/c6_12/C12_BiologyLinkageCrossingOverSim';

/** v3 wrapped master — C12_BiologyLinkageCrossingOverSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biologylinkagecrossingoversim: SimDef = {
    id: 'v3w_c12_biologylinkagecrossingoversim',
    title: 'Linkage Crossing Over',
    subtitle: 'This node covers Morgan\'s experimental design, the concepts of linkage and recombination,.',
    classLevel: 12, subject: 'biology', topic: 'Linkage and Recombination: Morgan\'s Experiments',
    chapters: [],
    nodeIds: ['c12_bio_cbse_05_007', 'c12_bio_cbse_05_001', 'c12_bio_cbse_05_002', 'c12_bio_cbse_05_003', 'c12_bio_cbse_05_004', 'c12_bio_cbse_05_005', 'c12_bio_cbse_01_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Begin with a familiar observation: in a dihybrid cross of Drosophila (e.g., grey body × black body and normal.', goal: 'Master Linkage Crossing Over.' },
    discovery: {
        question: 'Why did Morgan choose Drosophila melanogaster for his linkage studies, and what specific feature of Drosophila males makes them unique for linkage analysis?',
        options: ['Morgan chose Drosophila', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
        answer: 'Morgan chose Drosophila',
        hook: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes.',
    },
    teaching: [
        { title: 'Linkage is the tendency of genes located on.', text: 'Linkage is the tendency of genes located on the same chromosome to be inherited together during meiosis because they do not assort independently; recombination is the production of new allele.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_007', title: 'Linkage is the tendency of genes.',
          scaffold: { problem: 'In Drosophila, grey body (G) is dominant over black body (g), and normal wings (N) are dominant over vestigial wings (n).',
            steps: [
            { text: 'Identify parental and recombinant phenotypes. The two most frequent classes (580 each) are parental: grey-normal (G N).' },
            { text: 'Calculate total recombinant offspring = 20 + 20 = 40. Total offspring = 1200.' },
            { text: 'Apply RF formula: RF = (40 / 1200) × 100% = 3.33%.' },
            { text: 'Map distance = 3.33 cM (since RF < 50%).' },
            { text: 'Because parental gametes are G N and g n, the heterozygous female was in coupling phase (cis configuration): G N / g n.', faded: true, blankAnswer: 'Recombination frequency = 3.33%, map distance = 3.33 cM..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_001', title: 'Mendel\'s Laws are three fundamental.',
          scaffold: { problem: 'A tall pea plant (dominant trait) is crossed with a dwarf plant (recessive). All F1 plants are tall.',
            steps: [
            { text: 'Identify the parental genotypes — tall parent must be homozygous dominant (TT), dwarf parent homozygous recessive (tt).' },
            { text: 'Apply Law of Dominance — F1 genotype is Tt; phenotype is tall because T (tall) is dominant over t (dwarf).' },
            { text: 'Apply Law of Segregation — During gamete formation in F1 (Tt), the two alleles T and t separate.' },
            { text: 'Construct Punnett square for F1 selfing (Tt × Tt) — genotypic ratio 1 TT : 2 Tt : 1 tt; phenotypic ratio 3 tall : 1.' },
            { text: 'Compare with observed data — 787 tall + 277 dwarf = 1064 total. Expected 3:1 ratio gives 798 tall : 266 dwarf.', faded: true, blankAnswer: 'The cross illustrates Law of Dominance (F1 all tall) and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_002', title: 'A monohybrid cross is a controlled.',
          scaffold: { problem: 'In pea plants, tall stem (T) is completely dominant over dwarf stem (t).',
            steps: [
            { text: 'Identify parental genotypes — true-breeding tall = TT, true-breeding dwarf = tt (homozygous by definition of.' },
            { text: 'Determine gametes — TT parent produces only T gametes; tt parent produces only t gametes (law of segregation:.' },
            { text: 'Construct F1 Punnett square — combine T and t gametes → all offspring are Tt (heterozygous).' },
            { text: 'Determine F1 phenotype — T is dominant, so all Tt plants are tall.' },
            { text: 'For F2, self-pollinate F1 (Tt × Tt). Each F1 parent produces two gamete types: T and t (50% each, by segregation).' },
            { text: 'Construct F2 Punnett square (4×4): combine T,t from male with T,t from female → genotypes: TT, Tt, tT, tt.' },
            { text: 'Count genotypes — 1 TT : 2 Tt (Tt + tT) : 1 tt = 1:2:1 genotypic ratio.' },
            { text: 'Count phenotypes — TT and Tt/tT show tall (dominant); tt shows dwarf (recessive) → 3 tall : 1 dwarf phenotypic ratio.', faded: true, blankAnswer: 'F1 — Genotypic: 100% Tt; Phenotypic: 100% tall. F2 —.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_003', title: 'A dihybrid cross is a breeding.',
          scaffold: { problem: 'In garden peas, tall (T) is dominant to dwarf (t) and axial flower (A) is dominant to terminal flower (a).',
            steps: [
            { text: 'Assign genotypes — P generation: TTAA (tall axial) × ttaa (dwarf terminal)' },
            { text: 'F1 generation — all TtAa (tall axial); gametes from F1: TA, Ta, tA, ta (FOIL method)' },
            { text: 'Construct 4×4 Punnett square for F1 self-cross (TtAa × TtAa) — 16 equally likely zygotes' },
            { text: 'Count phenotypes — Tall axial (T_A_): 9; Tall terminal (T_aa): 3; Dwarf axial (ttA_): 3; Dwarf terminal (ttaa): 1 →.' },
            { text: 'Count genotypes — 9 distinct combinations with ratio 1 TTAA : 2 TTAa : 1 TTaa : 2 TtAA : 4 TtAa : 2 Ttaa : 1 ttAA : 2.' },
            { text: 'Probability of tall terminal = P(T_) × P(aa) = (3/4) × (1/4) = 3/16 = 0.1875', faded: true, blankAnswer: 'F2 phenotypic ratio = 9 tall axial : 3 tall terminal : 3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_004', title: 'Incomplete dominance is a genetic.',
          scaffold: { problem: 'In Mirabilis jalapa (four o\'clock plant), red flower color (R) is incompletely dominant over white (r).',
            steps: [
            { text: 'Identify the genotypes of the parents. Red = RR (homozygous dominant). Pink = Rr (heterozygous, intermediate).' },
            { text: 'Determine gametes. RR produces only R gametes. Rr produces R and r gametes in 1:1 ratio.' },
            { text: 'Construct Punnett square: R (from red) × R/r (from pink) → offspring genotypes: RR and Rr in 1:1 ratio.' },
            { text: 'Map genotypes to phenotypes. RR = red, Rr = pink. So phenotypic ratio = 1 red : 1 pink.' },
            { text: 'Calculate expected numbers for 160 offspring. Red = 80, Pink = 80, White = 0.', faded: true, blankAnswer: 'Genotypic ratio 1 RR : 1 Rr. Phenotypic ratio 1 red : 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bio_cbse_05_005', title: 'Multiple alleles refer to the existence.',
          scaffold: { problem: 'A couple, both with blood group A, have a child with blood group O. They are expecting a second child.',
            steps: [
            { text: 'Determine parental genotypes. Blood group A phenotype can be *I^A I^A* or *I^A i*.' },
            { text: 'Write the cross: *I^A i* × *I^A i*.' },
            { text: 'Construct Punnett square. Gametes from each parent: *I^A* and *i*.' },
            { text: 'Count phenotypes: 3 group A (*I^A I^A*, *I^A i*, *I^A i*) : 1 group O (*ii*).' },
            { text: 'Probability of group A = 3/4 = 75%.', faded: true, blankAnswer: '75% (or 3/4).' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bio_cbse_05_001', title: 'Identify each idea',
          dissect: { specimen: 'Linkage Crossing Over', spots: [
            { id: 's1', label: 'Linkage is the tendency of', prompt: 'Which idea is this? — Linkage is the tendency of genes located on the same chromosome to be inherited together.', answer: 'Linkage is the tendency of', options: ['Linkage is the tendency of', 'Mendels Laws are three fundamental', 'A monohybrid cross is a', 'A dihybrid cross is a'] },
            { id: 's2', label: 'Mendels Laws are three fundamental', prompt: 'Which idea is this? — Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor.', answer: 'Mendels Laws are three fundamental', options: ['Mendels Laws are three fundamental', 'Linkage is the tendency of', 'A monohybrid cross is a', 'A dihybrid cross is a'] },
            { id: 's3', label: 'A monohybrid cross is a', prompt: 'Which idea is this? — A monohybrid cross is a controlled breeding experiment between two individuals differing.', answer: 'A monohybrid cross is a', options: ['A monohybrid cross is a', 'Linkage is the tendency of', 'Mendels Laws are three fundamental', 'A dihybrid cross is a'] },
            { id: 's4', label: 'A dihybrid cross is a', prompt: 'Which idea is this? — A dihybrid cross is a breeding experiment between P-generation organisms that differ in.', answer: 'A dihybrid cross is a', options: ['A dihybrid cross is a', 'Linkage is the tendency of', 'Mendels Laws are three fundamental', 'A monohybrid cross is a'] },
            { id: 's5', label: 'Incomplete dominance is a genetic', prompt: 'Which idea is this? — Incomplete dominance is a genetic inheritance pattern where neither allele is completely.', answer: 'Incomplete dominance is a genetic', options: ['Incomplete dominance is a genetic', 'Linkage is the tendency of', 'Mendels Laws are three fundamental', 'A monohybrid cross is a'] },
            { id: 's6', label: 'Multiple alleles refer to the', prompt: 'Which idea is this? — Multiple alleles refer to the existence of more than two allelic forms of a gene in a.', answer: 'Multiple alleles refer to the', options: ['Multiple alleles refer to the', 'Linkage is the tendency of', 'Mendels Laws are three fundamental', 'A monohybrid cross is a'] }
          ] } }
    ],
    explore: { component: C12_BiologyLinkageCrossingOverSim, prompt: 'Explore the interactive — Linkage Crossing Over' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_007', difficulty: 'standard',
          question: 'Linkage is the tendency of genes located on the same chromosome to be inherited.',
          hint: 'If stuck, review c12_bio_cbse_05_003 (Dihybrid Cross) and c11_biotech_cbse_06_007.',
          misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes.',
          parts: [
                { id: 'a', prompt: 'Why did Morgan choose Drosophila melanogaster for his linkage studies, and what specific feature of Drosophila males makes them unique for linkage analysis?', answer: 'Morgan chose Drosophila',
                  options: ['Morgan chose Drosophila', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes can separate through.' },
                { id: 'b', prompt: 'A student sets up a test cross for two linked genes A and B with a recombination frequency of 12%. The heterozygous parent is in coupling phase (AB/ab).', answer: 'Recombinant frequency = 12% → expected recombinant offspring = 0.12 × 500 = 60',
                  options: ['Recombinant frequency = 12% → expected recombinant offspring = 0.12 × 500 = 60', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes can separate through.' },
                { id: 'c', prompt: 'In a three-point test cross involving genes X, Y, and Z, the following recombination frequencies are observed: X-Y = 8%, Y-Z = 15%, X-Z = 7%.', answer: 'The correct order is X-Z-Y (or Y-Z-X)',
                  options: ['The correct order is X-Z-Y (or Y-Z-X)', 'linkage means genes are always inherited together and never separate', '"linkage means genes are always inherited together and never separate'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "linkage means genes are always inherited together and never separate." In reality, linked genes can separate through.' }
          ],
            remediations: { 'linkage-means-genes-are-always': { steps: ['Revisit c12_bio_cbse_05_003 (Dihybrid Cross) to recall the 9:3:3:1 expectation under independent assortment.', 'Review c11_biotech_cbse_06_007 (Linkage: Complete and Incomplete Linkage) and c11_biotech_cbse_06_008 (Crossing Over:.', 'Practice test-cross problems: draw chromosome diagrams for coupling and repulsion phases, label parental and.', 'Re-diagnostic: Given a test-cross dataset with 4 phenotypic classes, identify parental vs recombinant classes and.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_001', difficulty: 'standard',
          question: 'Mendel\'s Laws are three fundamental principles of inheritance derived from.',
          hint: 'If stuck, revisit c11_bio_cbse_10_006 (Meiosis I) and draw labelled diagrams of a.',
          misconception: 'Students think "Law of Dominance means the dominant allele destroys or suppresses the recessive allele permanently." In.',
          parts: [
                { id: 'a', prompt: 'Explain why the Law of Independent Assortment holds true only for genes on different chromosomes or far apart on the same chromosome.', answer: 'Independent assortment occurs',
                  options: ['Independent assortment occurs', 'all genes assort independently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think "Law of Dominance means the dominant allele destroys or suppresses the recessive allele permanently." In reality, dominance.' }
          ],
            remediations: { 'law-of-dominance-means-the': { steps: ['Revisit c11_bio_cbse_10_006 (Meiosis I) and animate homologous chromosome separation — label maternal/paternal.', 'Use coloured beads (two colours for two alleles) to physically simulate segregation and independent assortment for two.', 'Re-attempt Diagnostic Question 2 and 5; if still incorrect, review c11_biotech_cbse_06_004 (Law of Independent.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_002', difficulty: 'standard',
          question: 'A monohybrid cross is a controlled breeding experiment between two individuals.',
          hint: 'If stuck, revisit c12_bio_cbse_05_001 (Mendel\'s Laws) and practice drawing allele.',
          misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population".',
          parts: [
                { id: 'a', prompt: 'A heterozygous tall pea plant (Tt) is crossed with a dwarf plant (tt). Predict the phenotypic and genotypic ratios of the offspring. Show the Punnett square.', answer: 'Parental genotypes: Tt × tt',
                  options: ['Parental genotypes: Tt × tt', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' },
                { id: 'b', prompt: 'Compare the genotypic ratio (1:2:1) and phenotypic ratio (3:1) in a standard F2 monohybrid cross. Why are they different?', answer: 'Genotypic ratio counts distinct genotypes (TT, Tt, tt = 1:2:1)',
                  options: ['Genotypic ratio counts distinct genotypes (TT, Tt, tt = 1:2:1)', 'ratios are always the same', 'incomplete dominance gives 3:1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' }
          ],
            remediations: { 'the-3-1-phenotypic-ratio': { steps: ['Revisit c12_bio_cbse_05_001 (Mendel\'s Laws) — focus on law of segregation: "alleles separate during gamete formation."', 'Draw meiosis diagram showing one pair of homologous chromosomes separating into four gametes — label alleles on.', 'Use two-colored beads (alleles) to physically model gamete formation for TT, Tt, tt parents.', 'Re-attempt Diagnostic Question 3 (Tt × tt cross) with bead model, then redraw Punnett square.', 'If error persists, practice 5 test crosses (TT×tt, Tt×tt, Tt×Tt) writing gametes first, then square, then ratios.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population".',
          parts: [
                { id: 'a', prompt: 'A student claims: "In a monohybrid cross Tt × Tt, the probability of getting a tall plant is 3/4, so if we examine 4 offspring, exactly 3 will be tall.".', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'statement is correct', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' },
                { id: 'b', prompt: 'Design a monohybrid cross experiment to determine whether a tall pea plant from an unknown lineage is homozygous (TT) or heterozygous (Tt).', answer: 'Cross the unknown tall plant with a homozygous recessive dwarf plant (tt)',
                  options: ['Cross the unknown tall plant with a homozygous recessive dwarf plant (tt)', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' },
                { id: 'c', prompt: 'Compare the genotypic ratio (1:2:1) and phenotypic ratio (3:1) in a standard F2 monohybrid cross. Why are they different?', answer: 'Genotypic ratio counts distinct genotypes (TT, Tt, tt = 1:2:1)',
                  options: ['Genotypic ratio counts distinct genotypes (TT, Tt, tt = 1:2:1)', 'ratios are always the same', 'incomplete dominance gives 3:1', '3 dominant alleles and 1 recessive allele exist in the F2 population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the 3:1 phenotypic ratio means "3 dominant alleles and 1 recessive allele exist in the F2 population" — confusing.' }
          ],
            remediations: { 'the-3-1-phenotypic-ratio': { steps: ['Revisit c12_bio_cbse_05_001 (Mendel\'s Laws) — focus on law of segregation: "alleles separate during gamete formation."', 'Draw meiosis diagram showing one pair of homologous chromosomes separating into four gametes — label alleles on.', 'Use two-colored beads (alleles) to physically model gamete formation for TT, Tt, tt parents.', 'Re-attempt Diagnostic Question 3 (Tt × tt cross) with bead model, then redraw Punnett square.', 'If error persists, practice 5 test crosses (TT×tt, Tt×tt, Tt×Tt) writing gametes first, then square, then ratios.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_003', difficulty: 'standard',
          question: 'A dihybrid cross is a breeding experiment between P-generation organisms that.',
          hint: 'Review monohybrid cross mechanics (c12_bio_cbse_05_002) and practice FOIL method for.',
          misconception: 'Students believe the 9:3:3:1 phenotypic ratio means exactly 9 round yellow, 3 round green, 3 wrinkled yellow, and 1.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A dihybrid cross is a breeding experiment between P-generation organisms that differ in',
                  options: ['A dihybrid cross is a breeding experiment between P-generation organisms that differ in', 'Linkage is the tendency of genes located on the same chromosome to be inherited together', 'Mendel\'s Laws are three fundamental principles of inheritance derived from Gregor', 'A monohybrid cross is a controlled breeding experiment between two individuals differing'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the 9:3:3:1 phenotypic ratio means exactly 9 round yellow, 3 round green, 3 wrinkled yellow, and 1 wrinkled green.' }
          ],
            remediations: { 'the-9-3-3-1': { steps: ['Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to reinforce 3:1 phenotypic and 1:2:1 genotypic ratios for a single.', 'Practice the FOIL method (First, Outer, Inner, Last) for gamete formation from dihybrid genotypes using 5 different.', 'Build 4×4 Punnett squares physically with paper strips for 3 crosses, counting phenotypes and genotypes separately.', 'Re-attempt Diagnostic Questions 2 and 4, focusing on product-rule derivation rather than memorized ratios.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_004', difficulty: 'standard',
          question: 'Incomplete dominance is a genetic inheritance pattern where neither allele is.',
          hint: 'If stuck, review c12_bio_cbse_05_002: practice drawing Punnett squares for Mendelian.',
          misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material.',
          parts: [
                { id: 'a', prompt: 'A cross between two pink-flowered snapdragons produces 240 offspring. How many red, pink, and white flowers are expected?', answer: 'Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)',
                  options: ['Parental genotypes: R¹R² × R¹R² (where R¹ = red allele, R² = white allele)', 'incomplete dominance = blending inheritance', 'pink is dominant or misapplies the 3:1 ratio'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'b', prompt: 'Compare the F₂ phenotypic ratios of a monohybrid cross showing incomplete dominance versus one showing codominance. Are they the same or different?', answer: 'Both give a 1:2:1 phenotypic ratio in F₂',
                  options: ['Both give a 1:2:1 phenotypic ratio in F₂', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' }
          ],
            remediations: { 'incomplete-dominance-blending-inheritance-in': { steps: ['If the student holds the blending-inheritance misconception: (1) Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to.', '(2) Draw a diagram showing DNA sequences of R and r alleles — emphasize they do not change.', '(3) Use the snapdragon Punnett square to track alleles: F₁ pink has genotype Rr, produces R and r gametes separately.', '(4) Re-diagnostic: Ask the student to explain how a pink-flowered plant can produce red-flowered offspring.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material.',
          parts: [
                { id: 'a', prompt: 'A student claims: "In codominance, the heterozygote phenotype is exactly halfway between the two homozygotes, just like incomplete dominance." Evaluate this.', answer: 'The statement is false',
                  options: ['The statement is false', 'both alleles expressed', 'blended expression', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'b', prompt: 'Design a simple cross experiment using snapdragons to prove that the pink flower color is due to incomplete dominance and not a separate genetic factor.', answer: 'Cross 1: True-breeding red (RR) × true-breeding white (rr) → all pink F₁',
                  options: ['Cross 1: True-breeding red (RR) × true-breeding white (rr) → all pink F₁', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' },
                { id: 'c', prompt: 'Compare the F₂ phenotypic ratios of a monohybrid cross showing incomplete dominance versus one showing codominance. Are they the same or different?', answer: 'Both give a 1:2:1 phenotypic ratio in F₂',
                  options: ['Both give a 1:2:1 phenotypic ratio in F₂', 'incomplete dominance = blending inheritance'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "incomplete dominance = blending inheritance" in the outdated sense that the genetic material itself blends and cannot.' }
          ],
            remediations: { 'incomplete-dominance-blending-inheritance-in': { steps: ['If the student holds the blending-inheritance misconception: (1) Revisit c12_bio_cbse_05_002 (Monohybrid Cross) to.', '(2) Draw a diagram showing DNA sequences of R and r alleles — emphasize they do not change.', '(3) Use the snapdragon Punnett square to track alleles: F₁ pink has genotype Rr, produces R and r gametes separately.', '(4) Re-diagnostic: Ask the student to explain how a pink-flowered plant can produce red-flowered offspring.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_005', difficulty: 'standard',
          question: 'Multiple alleles refer to the existence of more than two allelic forms of a.',
          hint: 'If stuck on codominance, re-read c12_bio_cbse_05_004 worked examples on flower color; if.',
          misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in.',
          parts: [
                { id: 'a', prompt: 'A man with blood group A and a woman with blood group B have a child with blood group O. What are the genotypes of the parents?', answer: 'The father must be *I^A i* and the mother *I^B i*',
                  options: ['The father must be *I^A i* and the mother *I^B i*', 'incompletely dominant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' },
                { id: 'b', prompt: 'Explain why a person with blood group AB has both A and B antigens on their RBCs but no anti-A or anti-B antibodies in their plasma.', answer: 'The *I^A* and *I^B* alleles are codominant: both are expressed equally in the',
                  options: ['The *I^A* and *I^B* alleles are codominant: both are expressed equally in the', 'AB has no antibodies', 'incompletely dominant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' },
                { id: 'c', prompt: 'A woman with blood group A claims a man with blood group AB is the father of her child with blood group O. Use a Punnett square to evaluate this claim.', answer: 'Mother (group A) could be *I^A I^A* or *I^A i*',
                  options: ['Mother (group A) could be *I^A I^A* or *I^A i*', 'possible if mother is *I^A i*', 'incompletely dominant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' }
          ],
            remediations: { 'the-i-a-and-i': { steps: ['Revisit c12_bio_cbse_05_004 (Incomplete Dominance and Codominance) to clarify the distinction: draw a table comparing.', 'Review c11_biotech_cbse_06_006 (Class 11 Multiple Alleles) for the basic allele notation and Punnett square mechanics.', 'Practice 5 crosses: (a) *I^A i* × *I^B i*, (b) *I^A I^B* × *ii*, (c) *I^A I^A* × *I^B I^B*, (d) *I^A i* × *I^A i*, (e).', 'For each, write genotypes, phenotypes, and phenotypic ratios.'] } } },
        { type: 'subpart', nodeId: 'c12_bio_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in.',
          parts: [
                { id: 'a', prompt: 'Design a simple genetic test using only ABO blood grouping to exclude a man from being the biological father of a child.', answer: 'Mother: group O (*ii*), Child: group AB (*I^A I^B*)',
                  options: ['Mother: group O (*ii*), Child: group AB (*I^A I^B*)', 'incompletely dominant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the *I^A* and *I^B* alleles are "incompletely dominant" because both antigens appear in heterozygotes.' }
          ],
            remediations: { 'the-i-a-and-i': { steps: ['Revisit c12_bio_cbse_05_004 (Incomplete Dominance and Codominance) to clarify the distinction: draw a table comparing.', 'Review c11_biotech_cbse_06_006 (Class 11 Multiple Alleles) for the basic allele notation and Punnett square mechanics.', 'Practice 5 crosses: (a) *I^A i* × *I^B i*, (b) *I^A I^B* × *ii*, (c) *I^A I^A* × *I^B I^B*, (d) *I^A i* × *I^A i*, (e).', 'For each, write genotypes, phenotypes, and phenotypic ratios.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
