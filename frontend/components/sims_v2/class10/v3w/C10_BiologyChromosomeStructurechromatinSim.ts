import type { SimDef } from '../../engine/types';
import C10_BiologyChromosomeStructurechromatinSim from '../../../simulations/c6_12/C10_BiologyChromosomeStructurechromatinSim';

/** v3 wrapped master — C10_BiologyChromosomeStructurechromatinSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_biologychromosomestructurechromatinsim: SimDef = {
    id: 'v3w_c10_biologychromosomestructurechromatinsim',
    title: 'Chromosome Structurechromatin',
    subtitle: 'This node covers the origin and accumulation of variation during reproduction, focusing.',
    classLevel: 10, subject: 'biology', topic: 'Accumulation of Variation During Reproduction: Basis of Heredity',
    chapters: [],
    nodeIds: ['c10_bio_cbse_04_001', 'c10_bio_cbse_04_003', 'c10_bio_cbse_04_004', 'c10_bio_cbse_04_005', 'c10_bio_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a litter of puppies or a batch of seedlings from the same parent plant — despite having the same.', goal: 'Master Chromosome Structurechromatin.' },
    discovery: {
        question: 'A farmer grows a crop using vegetative propagation (cuttings) for 10 years. Another farmer grows the same crop from seeds each year.',
        options: ['The seed-grown population will show far more variation', 'mutations', 'halves the chromosome number'],
        answer: 'The seed-grown population will show far more variation',
        hook: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and.',
    },
    teaching: [
        { title: 'Accumulation of variation during.', text: 'Accumulation of variation during reproduction refers to the generation of genetic differences among offspring through mechanisms such as DNA replication errors (mutations), crossing over during.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_001', title: 'Accumulation of variation during.',
          scaffold: { problem: 'In a pea plant (2n=14), how many genetically distinct types of gametes can be produced through independent assortment alone (ignoring.',
            steps: [
            { text: 'Identify the haploid number (n) from diploid number (2n=14) → n = 7 chromosome pairs.' },
            { text: 'Recall that independent assortment during metaphase I allows each homologous pair to orient independently → 2ⁿ possible.' },
            { text: 'Calculate gamete diversity: 2⁷ = 128 distinct gamete types per parent.' },
            { text: 'Calculate zygote diversity: random fertilization combines one gamete from each parent → 128 × 128 = 16,384 distinct.' },
            { text: 'Interpret biologically: This massive combinatorial variation means even without mutations or crossing over, a single.', faded: true, blankAnswer: '128 distinct gamete types per parent; 16,384 distinct.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_003', title: 'A dihybrid cross is a genetic cross.',
          scaffold: { problem: 'In a dihybrid cross between pure-breeding round yellow (RRYY) and wrinkled green (rryy) pea plants, the F1 are self-pollinated.',
            steps: [
            { text: 'Identify parental genotypes — RRYY (round yellow) × rryy (wrinkled green).' },
            { text: 'Determine F1 genotype — all RrYy (heterozygous for both traits). Phenotype: all round yellow.' },
            { text: 'Determine F1 gamete types — because of independent assortment, four gametes in equal proportion: RY, Ry, rY, ry.' },
            { text: 'Construct 4×4 Punnett square (16 boxes) or use forked-line method: each F1 gamete combines with each of the four types.' },
            { text: 'Group the 16 genotypes into four phenotypes: (RRYY, RRYy, RrYY, RrYy) = round yellow (9/16); (RRyy, Rryy) = round green.' },
            { text: 'Calculate expected numbers: round yellow = 9/16 × 640 = 360; round green = 3/16 × 640 = 120; wrinkled yellow = 3/16 ×.' },
            { text: 'Verify sum = 360+120+120+40 = 640. Present answer as a labelled table.', faded: true, blankAnswer: 'Round yellow = 360, Round green = 120, Wrinkled yellow =.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_004', title: 'Mendel\'s Laws of Inheritance are three.',
          scaffold: { problem: 'In pea plants, tall stem (T) is dominant over dwarf (t), and round seeds (R) is dominant over wrinkled (r).',
            steps: [
            { text: 'Identify the test cross parent genotype — homozygous recessive for both traits (ttrr) produces only one gamete type.' },
            { text: 'Observe the four offspring phenotypes in 1:1:1:1 ratio — this means the tall round parent produced four gamete types.' },
            { text: 'Apply Law of Segregation — for each gene, the two alleles separated into different gametes (T from t, R from r).' },
            { text: 'Apply Law of Independent Assortment — the allele for height (T/t) assorted independently of allele for seed shape.' },
            { text: 'Conclude the tall round parent must be heterozygous for both genes (TtRr) because only a dihybrid produces four gamete.', faded: true, blankAnswer: 'Genotype of tall round parent = TtRr. Law of Segregation.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_005', title: 'Sex determination in humans is the.',
          scaffold: { problem: 'A couple has four children: three girls and one boy. The paternal grandmother insists the father\'s family "produces only girls".',
            steps: [
            { text: 'Identify the sex chromosome constitution of parents — father XY, mother XX.' },
            { text: 'Determine gametes — father produces X-sperm and Y-sperm in 1:1 ratio; mother produces only X-ova.' },
            { text: 'Construct Punnett square — cross X (sperm) and Y (sperm) with X (ovum) and X (ovum); offspring genotypes: XX (female).' },
            { text: 'Recognize each fertilization is independent — probability of girl = 1/2, boy = 1/2 for every pregnancy.' },
            { text: 'Calculate probability of sequence G,G,G,B = (1/2)^4 = 1/16 = 6.25% — not rare, well within chance.' },
            { text: 'Conclude: The 1:1 ratio is a population expectation; small families show deviations by chance alone.', faded: true, blankAnswer: 'The grandmother\'s claim is incorrect. Each child has a 50%.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_bio_cbse_04_006', title: 'Acquired traits are characteristics.',
          scaffold: { problem: 'A farmer notices that his dairy cows produce more milk when fed a special nutrient-rich feed.',
            steps: [
            { text: 'Identify the observed trait — high milk yield in cows fed special feed.' },
            { text: 'Determine the cause — the feed is an environmental influence acting on the cow\'s somatic cells (mammary gland tissue,.' },
            { text: 'Recall the inheritance principle — only changes in the DNA of germ cells (ova/sperm) are transmitted to offspring.' },
            { text: 'Trace the breeding process — the farmer selected cows based on phenotype (high yield), but their germ cells carried the.' },
            { text: 'Explain the 4th generation result — when raised on normal feed (same environment as original), the offspring express.' },
            { text: 'Conclude — Milk yield increase was an acquired trait (environmentally induced phenotypic plasticity), not an inherited.', faded: true, blankAnswer: 'The high milk yield was an acquired trait caused by.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_bio_cbse_04_003', title: 'Identify each idea',
          dissect: { specimen: 'Chromosome Structurechromatin', spots: [
            { id: 's1', label: 'Accumulation of variation during reproduction', prompt: 'Which idea is this? — Accumulation of variation during reproduction refers to the generation of genetic.', answer: 'Accumulation of variation during reproduction', options: ['Accumulation of variation during reproduction', 'A dihybrid cross is a', 'Mendels Laws of Inheritance are', 'Sex determination in humans is'] },
            { id: 's2', label: 'A dihybrid cross is a', prompt: 'Which idea is this? — A dihybrid cross is a genetic cross between two individuals that differ in two distinct.', answer: 'A dihybrid cross is a', options: ['A dihybrid cross is a', 'Accumulation of variation during reproduction', 'Mendels Laws of Inheritance are', 'Sex determination in humans is'] },
            { id: 's3', label: 'Mendels Laws of Inheritance are', prompt: 'Which idea is this? — Mendel\'s Laws of Inheritance are three principles derived from pea plant experiments: (1).', answer: 'Mendels Laws of Inheritance are', options: ['Mendels Laws of Inheritance are', 'Accumulation of variation during reproduction', 'A dihybrid cross is a', 'Sex determination in humans is'] },
            { id: 's4', label: 'Sex determination in humans is', prompt: 'Which idea is this? — Sex determination in humans is the biological process by which the sex of an offspring is.', answer: 'Sex determination in humans is', options: ['Sex determination in humans is', 'Accumulation of variation during reproduction', 'A dihybrid cross is a', 'Mendels Laws of Inheritance are'] },
            { id: 's5', label: 'Acquired traits are characteristics developed', prompt: 'Which idea is this? — Acquired traits are characteristics developed by an organism during its lifetime due to.', answer: 'Acquired traits are characteristics developed', options: ['Acquired traits are characteristics developed', 'Accumulation of variation during reproduction', 'A dihybrid cross is a', 'Mendels Laws of Inheritance are'] }
          ] } }
    ],
    explore: { component: C10_BiologyChromosomeStructurechromatinSim, prompt: 'Explore the interactive — Chromosome Structurechromatin' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_001', difficulty: 'standard',
          question: 'Accumulation of variation during reproduction refers to the generation of.',
          hint: 'If stuck, review **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** and.',
          misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Asexual reproduction produces no variation at all, so it has no role in evolution." Is this statement correct? Explain why or why not.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'halves the chromosome number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and that meiosis simply.' }
          ],
            remediations: { 'variation-in-sexual-reproduction-comes': { steps: ['Revisit **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** — specifically the animation of crossing over.', 'Use a physical model: take 2 pairs of coloured socks (homologous chromosomes), pair them, twist at one point (crossing.', 'Write a 3-sentence explanation: "Meiosis creates variation by (1) crossing over between homologous chromosomes and (2).', 'Attempt Diagnostic Question 3 again without notes.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and.',
          parts: [
                { id: 'a', prompt: 'A farmer grows a crop using vegetative propagation (cuttings) for 10 years. Another farmer grows the same crop from seeds each year.', answer: 'The seed-grown population will show far more variation',
                  options: ['The seed-grown population will show far more variation', 'mutations', 'halves the chromosome number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and that meiosis simply.' },
                { id: 'b', prompt: 'Design a simple classroom activity using coloured beads or paper strips to model how independent assortment and fertilization create variation in offspring.', answer: '**Model**: Use 3 pairs of homologous chromosomes (e.g., red/blue, green/yellow,',
                  options: ['**Model**: Use 3 pairs of homologous chromosomes (e.g., red/blue, green/yellow,', 'halves the chromosome number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think variation in sexual reproduction comes *only* from mutations (like in asexual reproduction), and that meiosis simply.' }
          ],
            remediations: { 'variation-in-sexual-reproduction-comes': { steps: ['Revisit **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** — specifically the animation of crossing over.', 'Use a physical model: take 2 pairs of coloured socks (homologous chromosomes), pair them, twist at one point (crossing.', 'Write a 3-sentence explanation: "Meiosis creates variation by (1) crossing over between homologous chromosomes and (2).', 'Attempt Diagnostic Question 3 again without notes.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_003', difficulty: 'standard',
          question: 'A dihybrid cross is a genetic cross between two individuals that differ in two.',
          hint: 'If stuck, review c10_bio_cbse_04_002 (monohybrid cross) and c9_bio_ch3_4 (meiosis) —.',
          misconception: 'Students often think the 9:3:3:1 ratio appears in the F1 generation, or that the F1 plants show all four phenotypes.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A dihybrid cross is a genetic cross between two individuals that differ in two distinct',
                  options: ['A dihybrid cross is a genetic cross between two individuals that differ in two distinct', 'Accumulation of variation during reproduction refers to the generation of genetic', 'Mendel\'s Laws of Inheritance are three principles derived from pea plant experiments: (1)', 'Sex determination in humans is the biological process by'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the 9:3:3:1 ratio appears in the F1 generation, or that the F1 plants show all four phenotypes.' }
          ],
            remediations: { 'the-9-3-3-1': { steps: ['Revisit the monohybrid cross (c10_bio_cbse_04_002) — confirm you can explain why F1 is uniform and F2 shows 3:1.', 'Draw the dihybrid Punnett square on paper: 4×4 grid, label gametes RY, Ry, rY, ry on both axes.', 'Fill each cell, then count phenotypes by colour-coding: round yellow (9), round green (3), wrinkled yellow (3),.', 'Verbally explain to a peer: "Each F1 plant makes four gamete types because the two genes sort independently; when these.', 'Practise two board-style numericals: given F2 total, find each phenotype count; given one phenotype count, find total.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the 9:3:3:1 ratio appears in the F1 generation, or that the F1 plants show all four phenotypes.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The 9:3:3:1 ratio proves that the genes for seed shape and seed colour are on different chromosomes." Evaluate this statement.', answer: 'Partially correct',
                  options: ['Correct answer: Partially correct', 'fully correct', 'incorrect'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the 9:3:3:1 ratio appears in the F1 generation, or that the F1 plants show all four phenotypes.' }
          ],
            remediations: { 'the-9-3-3-1': { steps: ['Revisit the monohybrid cross (c10_bio_cbse_04_002) — confirm you can explain why F1 is uniform and F2 shows 3:1.', 'Draw the dihybrid Punnett square on paper: 4×4 grid, label gametes RY, Ry, rY, ry on both axes.', 'Fill each cell, then count phenotypes by colour-coding: round yellow (9), round green (3), wrinkled yellow (3),.', 'Verbally explain to a peer: "Each F1 plant makes four gamete types because the two genes sort independently; when these.', 'Practise two board-style numericals: given F2 total, find each phenotype count; given one phenotype count, find total.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_004', difficulty: 'standard',
          question: 'Mendel\'s Laws of Inheritance are three principles derived from pea plant.',
          hint: 'Revisit c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) and focus on the difference.',
          misconception: 'Students often think "dominance means the dominant allele physically suppresses or destroys the recessive allele." In.',
          parts: [
                { id: 'a', prompt: 'In a dihybrid cross between two heterozygous parents (RrYy × RrYy), the phenotypic ratio is 9:3:3:1.', answer: 'The 9:3:3:1 ratio arises',
                  options: ['Correct answer: The 9:3:3:1 ratio arises', 'the ratio is 9:3:3:1'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "dominance means the dominant allele physically suppresses or destroys the recessive allele." In reality, dominance is.' }
          ],
            remediations: { 'dominance-means-the-dominant-allele': { steps: ['Use a concrete analogy — a factory with two instruction manuals (alleles).', 'Show a Punnett square for a monohybrid cross (Yy × Yy) and highlight that yy genotype still exists in 25% offspring —.', 'Connect to meiosis: during anaphase I, both Y and y alleles separate into different gametes intact.', 'Practice writing "alleles segregate unchanged" in exam answers instead of "dominant allele suppresses recessive."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_005', difficulty: 'standard',
          question: 'Sex determination in humans is the biological process by which the sex of an.',
          hint: 'If stuck, review c9_bio_ch1_12 (Meiosis) focusing on the behaviour of homologous.',
          misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence.',
          parts: [
                { id: 'a', prompt: 'State the sex chromosome composition of a human male and a human female, and name the type of gametes each produces with respect to sex chromosomes.', answer: 'Human male: XY; produces two types of sperm',
                  options: ['Human male: XY; produces two types of sperm', 'virility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' },
                { id: 'b', prompt: 'A couple has three daughters. The father\'s mother claims he is "responsible" for not having a son.', answer: 'The father produces X and Y sperm in equal proportion',
                  options: ['The father produces X and Y sperm in equal proportion', 'the father\'s sperm quality changes', 'the mother\'s body rejects Y sperm'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' },
                { id: 'c', prompt: 'In a Punnett square for human sex determination, the male parent\'s gametes are written on the top and the female parent\'s gametes on the side.', answer: 'Top row (male gametes): X, Y',
                  options: ['Top row (male gametes): X, Y', 'virility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' }
          ],
            remediations: { 'the-mother-s-diet': { steps: ['Revisit c9_bio_ch1_12 (Meiosis) — draw the segregation of X and Y chromosomes during meiosis I and II in a male germ.', 'Use a coin-toss analogy: label one side X, the other Y; toss 20 times, record outcomes; observe ~10 X and ~10 Y.', 'Combine with a fixed X (mother) to show each toss gives either XX or XY with equal probability.', 'Write a one-sentence summary: "Sex is decided by which sperm fertilizes the ovum, and every sperm has an equal chance."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Since the father decides the sex of the child, if a couple wants a son they should time intercourse so that Y-sperm reach the ovum first.', answer: 'The claim is not scientifically supported',
                  options: ['The claim is not scientifically supported', 'virility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' },
                { id: 'b', prompt: 'Design a simple classroom simulation using coloured beads or cards to model human sex determination.', answer: 'Materials: Two containers',
                  options: ['Materials: Two containers', 'virility'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that the mother\'s diet, body pH, timing of intercourse, or the father\'s "virility" can influence the sex of the.' }
          ],
            remediations: { 'the-mother-s-diet': { steps: ['Revisit c9_bio_ch1_12 (Meiosis) — draw the segregation of X and Y chromosomes during meiosis I and II in a male germ.', 'Use a coin-toss analogy: label one side X, the other Y; toss 20 times, record outcomes; observe ~10 X and ~10 Y.', 'Combine with a fixed X (mother) to show each toss gives either XX or XY with equal probability.', 'Write a one-sentence summary: "Sex is decided by which sperm fertilizes the ovum, and every sperm has an equal chance."'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_006', difficulty: 'standard',
          question: 'Acquired traits are characteristics developed by an organism during its.',
          hint: 'Review c9_bio_ch1_12 (Cell Division: Mitosis and Meiosis) — focus on "meiosis occurs only.',
          misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s.',
          parts: [
                { id: 'a', prompt: 'A student writes: "A blacksmith develops strong arm muscles due to hammering.', answer: 'The error is assuming acquired traits are inherited',
                  options: ['The error is assuming acquired traits are inherited', 'it is inherited', 'giraffes stretched necks to reach leaves, so offspring inherited long necks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' },
                { id: 'b', prompt: 'Why can a person who loses a finger in an accident not pass on the "missing finger" trait to their children, but a person with naturally six fingers.', answer: 'Losing a finger is an acquired trait',
                  options: ['Losing a finger is an acquired trait', 'both are physical changes', 'giraffes stretched necks to reach leaves, so offspring inherited long necks'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' },
                { id: 'c', prompt: 'Compare the following pairs and classify each as acquired or inherited. Justify each classification in one sentence: (a) A scar from a burn vs.', answer: 'A scar from a burn vs',
                  options: ['A scar from a burn vs', 'giraffes stretched necks to reach leaves, so offspring inherited long necks', 'acquired traits are inherited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' }
          ],
            remediations: { 'traits-developed-during-lifetime-due': { steps: ['Revisit c9_bio_ch3_4 (Meiosis) — recall that only germ cells undergo meiosis to form gametes; somatic cells divide by.', 'Perform the "Tail-less mice" thought experiment: If you cut a mouse\'s tail, which cells lose DNA?', 'Draw a flowchart: Environment → Somatic cells (muscle, skin, nerve) → Phenotype change → **DEAD END** (not in gametes).', 'Practice classifying 15 traits using the question: "Is the DNA in sperm/egg altered?" If no → acquired.'] } } },
        { type: 'subpart', nodeId: 'c10_bio_cbse_04_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "If a population of mice has their tails surgically removed for 20 generations, the 21st generation will be born without tails." Is this.', answer: 'The claim is **invalid**',
                  options: ['The claim is **invalid**', 'giraffes stretched necks to reach leaves, so offspring inherited long necks', 'acquired traits are inherited', 'learning to swim is inherited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' },
                { id: 'b', prompt: 'Design a simple investigation using garden plants (e.g., mustard/radish) to demonstrate that environmentally induced changes in leaf size are not inherited.', answer: 'Materials: Mustard seeds, two pots, soil, water, fertilizer',
                  options: ['Materials: Mustard seeds, two pots, soil, water, fertilizer', 'giraffes stretched necks to reach leaves, so offspring inherited long necks', 'acquired traits are inherited', 'learning to swim is inherited'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that "traits developed during lifetime due to use/disuse or environment become part of the organism\'s heredity and are.' }
          ],
            remediations: { 'traits-developed-during-lifetime-due': { steps: ['Revisit c9_bio_ch3_4 (Meiosis) — recall that only germ cells undergo meiosis to form gametes; somatic cells divide by.', 'Perform the "Tail-less mice" thought experiment: If you cut a mouse\'s tail, which cells lose DNA?', 'Draw a flowchart: Environment → Somatic cells (muscle, skin, nerve) → Phenotype change → **DEAD END** (not in gametes).', 'Practice classifying 15 traits using the question: "Is the DNA in sperm/egg altered?" If no → acquired.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
