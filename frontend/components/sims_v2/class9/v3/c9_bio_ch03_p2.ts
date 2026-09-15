import type { SimDef } from '../../engine/types';

/** v3 generated — c9_bio_ch03_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_bio_ch03_p2: SimDef = {
    id: 'v3_c9_bio_ch03_p2',
    title: 'Reproduction in Living Organisms · Part 2/2',
    subtitle: 'One parent, infinite copies',
    classLevel: 9, subject: 'biology', topic: 'Reproduction in Living Organisms · Part 2/2',
    chapters: ['c9_bio_ch03'],
    nodeIds: ['c9_bio_ch3_4', 'c9_bio_ch3_5', 'c9_bio_ch3_6', 'c9_bio_ch3_7', 'c9_bio_ch3_8', 'c9_bio_ch3_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a reproduction-mode classifier', intro: 'No mates, no seeds, no fuss — yet life copies itself everywhere around you. Learn to tell budding from fission from fragmentation, and why clones are both a superpower and a weakness.', goal: 'Understand asexual reproduction — single parent, no gamete fusion, genetically identical offspring — across binary fission, budding, fragmentation, regeneration, spore formation and vegetative propagation.' },
    discovery: {
        question: 'Bread left out in monsoon turns fuzzy green in days — no parent pair, no seeds, no gametes. How did mould multiply all by itself?',
        options: ['Asexual reproduction — one parent\'s DNA copies itself by mitosis, so every offspring is a genetic clone', 'The mould mated with invisible partners', 'It grew from tiny seeds in the air', 'Bread spontaneously generates mould'],
        answer: 'Asexual reproduction — one parent\'s DNA copies itself by mitosis, so every offspring is a genetic clone',
        hook: 'Asexual isn\'t just for bacteria and yeast. Planaria regrow from fragments, Hydra buds off babies, starfish split — and your potato\'s \'eyes\' are cloning the whole plant without a single seed.',
    },
    teaching: [
        { title: 'Meiosis: Significance in Sexual Reproduction', text: 'Meiosis is a specialized type of cell division that reduces the chromosome number by half, producing four genetically distinct haploid daughter cells (gametes) from a single diploid parent cell, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_bio_ch3_4', title: 'Your mission',
          mission: { widget: 'grow', validate: 'grow:sun=60',
            instruction: 'On the lab: give the plant 60% sunlight — watch its growth rate.',
        context: 'Sort six ways of making copies: binary fission in Amoeba, budding in yeast, fragmentation in Spirogyra, regeneration in Planaria, spores in mould, and potato eyes — then weigh the speed of cloning against its zero-variety risk.',
            observePrompt: 'What did the grow interactive show you?' } },
        { type: 'case', nodeId: 'c9_bio_ch3_4', title: 'Meiosis: Significance in Sexual Reproduction',
          caseStudy: { intro: 'Observe a family photo: siblings share features with parents and each other, yet no two look exactly alike (except identical twins).',
            decisions: [{ prompt: 'Define meiosis and state the change in chromosome number that occurs during this process.', options: [
                { text: 'Meiosis is a reduction division where a diploid (2n) parent cell divides to produce four', outcome: 'Meiosis is a reduction division where a diploid (2n) parent cell divides to produce four haploid.' },
                { text: 'meiosis produces two identical diploid cells', outcome: 'Not quite — Students believe meiosis produces *two* cells (like mitosis) because they overlook the second.', reveals: 'meiosis-produces-two-cells-like' },
                { text: 'haploid', outcome: 'Not quite — Students believe meiosis produces *two* cells (like mitosis) because they overlook the second.', reveals: 'meiosis-produces-two-cells-like' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_5', title: 'Sexual Reproduction in Flowering Plants: Parts of a Flower',
          caseStudy: { intro: 'Look at a hibiscus flower blooming in your garden or a mustard field during rabi season — you see colourful petals, but have you wondered why each part exists?',
            decisions: [{ prompt: 'Name the four whorls of a typical flower in order from outermost to innermost, and state the reproductive role of the third and fourth.', options: [
                { text: 'The four whorls are: calyx (sepals), corolla (petals), androecium (stamens), and', outcome: 'The four whorls are: calyx (sepals), corolla (petals), androecium (stamens), and gynoecium.' },
                { text: 'petals, sepals, pistil, stamen', outcome: 'Not quite — Students think "bisexual flower" and "complete flower" mean the same thing — they assume if.', reveals: 'bisexual-flower-and-complete-flower' },
                { text: 'bisexual flower', outcome: 'Not quite — Students think "bisexual flower" and "complete flower" mean the same thing — they assume if.', reveals: 'bisexual-flower-and-complete-flower' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_6', title: 'Pollination: Self and Cross Pollination',
          caseStudy: { intro: 'Observe a hibiscus flower in your garden or school campus early in the morning: you will see the anthers dusted with yellow pollen touching the sticky stigma.',
            decisions: [{ prompt: 'Define self-pollination and cross-pollination. Give one example of a plant for each type.', options: [
                { text: 'Self-pollination is the transfer of pollen from anther to stigma of the same flower or', outcome: 'Self-pollination is the transfer of pollen from anther to stigma of the same flower or another.' },
                { text: 'cross-pollination', outcome: 'Not quite — Students often think that "cross-pollination" means pollen transfer between different species.', reveals: 'cross-pollination-means-pollen-transfer' },
                { text: '"cross-pollination" means pollen transfer between different species (e', outcome: 'Not quite — Students often think that "cross-pollination" means pollen transfer between different species.', reveals: 'cross-pollination-means-pollen-transfer' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_7', title: 'Fertilisation in Flowering Plants: Process and Double Fertilisation',
          caseStudy: { intro: 'Imagine a hibiscus flower in your garden where a bee has just deposited pollen on the stigma - what happens next is invisible but remarkable.',
            decisions: [{ prompt: 'Define double fertilisation and name the two fusion events with their respective products.', options: [
                { text: 'Double fertilisation is the process where two male gametes from a pollen tube fuse with', outcome: 'Double fertilisation is the process where two male gametes from a pollen tube fuse with two.' },
                { text: 'either sperm can fuse with the egg', outcome: 'Not quite — Students often believe the two male gametes in the pollen tube are identical and interchangeable.', reveals: 'the-two-male-gametes-in' },
                { text: 'both gametes fuse with the egg', outcome: 'Not quite — Students often believe the two male gametes in the pollen tube are identical and interchangeable.', reveals: 'the-two-male-gametes-in' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_8', title: 'Sexual Reproduction in Animals: Male and Female Systems',
          caseStudy: { intro: 'Observe a common Indian household scene: a pet dog or stray cat giving birth to puppies/kittens, or hens laying eggs that hatch into chicks.',
            decisions: [{ prompt: 'Name the primary sex organs (gonads) in male and female vertebrates and state the type of gamete each produces.', options: [
                { text: 'Male gonad: testis (produces sperm/male gamete)', outcome: 'Male gonad: testis (produces sperm/male gamete). Female gonad: ovary (produces ovum/egg/female.' },
                { text: 'testis produces testosterone', outcome: 'Not quite — Students believe that in all animals, the male deposits sperm directly into the female\'s vagina.', reveals: 'in-all-animals' },
                { text: 'ovary produces estrogen', outcome: 'Not quite — Students believe that in all animals, the male deposits sperm directly into the female\'s vagina.', reveals: 'in-all-animals' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_9', title: 'Human Reproductive System: Structure and Function',
          caseStudy: { intro: 'Start by observing a teenager\'s body changes during puberty - deepening voice, facial hair, breast development, menstruation - which they studied in Classes.',
            decisions: [{ prompt: 'Name the primary sex organ in human males and state its two main functions.', options: [
                { text: 'The primary sex organ in human males is the testis', outcome: 'The primary sex organ in human males is the testis. Its two main functions are: (1) production.' },
                { text: 'penis or prostate', outcome: 'Not quite — Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the.', reveals: 'the-ovary-is-directly-connected' }
            ] }] } },
        { type: 'dissect', nodeId: 'c9_bio_ch3_5', title: 'Identify each idea',
          dissect: { specimen: 'Reproduction in Living Organisms · Part 2/2', spots: [
            { id: 's1', label: 'Meiosis Significance in Sexual Reproduction', prompt: 'Which idea is this? — Meiosis is a specialized type of cell division that reduces the chromosome number.', answer: 'Meiosis Significance in Sexual Reproduction', options: ['Meiosis Significance in Sexual Reproduction', 'Sexual Reproduction in Flowering Plants Parts of a Flower', 'Pollination Self and Cross Pollination', 'Sexual Reproduction in Animals Male and Female Systems'] },
            { id: 's2', label: 'Sexual Reproduction in Flowering Plants Parts of a Flower', prompt: 'Which idea is this? — A flower is the reproductive structure of angiosperms (flowering plants) consisting.', answer: 'Sexual Reproduction in Flowering Plants Parts of a Flower', options: ['Sexual Reproduction in Flowering Plants Parts of a Flower', 'Meiosis Significance in Sexual Reproduction', 'Pollination Self and Cross Pollination', 'Sexual Reproduction in Animals Male and Female Systems'] },
            { id: 's3', label: 'Pollination Self and Cross Pollination', prompt: 'Which idea is this? — Pollination is the transfer of pollen grains from the anther (male part) to the stigma.', answer: 'Pollination Self and Cross Pollination', options: ['Pollination Self and Cross Pollination', 'Meiosis Significance in Sexual Reproduction', 'Sexual Reproduction in Flowering Plants Parts of a Flower', 'Sexual Reproduction in Animals Male and Female Systems'] },
            { id: 's4', label: 'Sexual Reproduction in Animals Male and Female Systems', prompt: 'Which idea is this? — Sexual reproduction in animals is a biological process where two parents contribute.', answer: 'Sexual Reproduction in Animals Male and Female Systems', options: ['Sexual Reproduction in Animals Male and Female Systems', 'Meiosis Significance in Sexual Reproduction', 'Sexual Reproduction in Flowering Plants Parts of a Flower', 'Pollination Self and Cross Pollination'] },
            { id: 's5', label: 'Human Reproductive System Structure and Function', prompt: 'Which idea is this? — The human reproductive system is a collection of specialized organs and structures.', answer: 'Human Reproductive System Structure and Function', options: ['Human Reproductive System Structure and Function', 'Meiosis Significance in Sexual Reproduction', 'Sexual Reproduction in Flowering Plants Parts of a Flower', 'Pollination Self and Cross Pollination'] }
          ] } },
        { type: 'case', nodeId: 'c9_bio_ch3_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Watching mould bloom over forgotten monsoon-season bread, a student says, \'Each fuzzy patch must have come from two parent moulds mating — complex organisms always need two parents, so this can\'t be asexual.\'',
            decisions: [{ prompt: 'What does asexual reproduction actually require?', options: [
                { text: 'Just one parent and mitosis — no gametes, no fusion. Spores landing on bread divide into identical clones. And it is not limited to microbes: Hydra buds, Planaria regenerates, and a flowering potato plant still propagates asexually through its tubers.', outcome: 'This keys on the defining mechanism — single parent, mitotic division, genetically identical offspring — rather than the organism\'s complexity.' },
                { text: 'The student is right — anything beyond bacteria and yeast must reproduce sexually, so mould needed two parents.', outcome: 'That boundary does not exist; moulds spread by spores, and even starfish and flowering plants reproduce asexually alongside their other modes.', reveals: 'asexual-is-microbes-only' },
                { text: 'It is asexual, but only because the patches look identical — clones are defined by appearance.', outcome: 'Clones are defined by identical DNA from mitotic copying, not by looking alike — appearance can mislead where genotype does not.', reveals: 'clones-look-alike' }
            ] }] } },
        { type: 'case', nodeId: 'c9_bio_ch3_9', title: 'You made it',
          caseStudy: { intro: 'One parent + mitosis + zero gametes = an army of clones. Brilliant for fast multiplication in a stable world — risky when the environment changes and everyone\'s wearing the same genes.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'grow', prompt: 'Explore the grow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'grow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch3_4', difficulty: 'standard',
          question: 'Meiosis is a specialized type of cell division that reduces the chromosome.',
          hint: 'Revisit "homologous chromosomes vs sister chromatids" using the pipe-cleaner model from.',
          misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).',
          parts: [
                { id: 'a', prompt: 'Why is meiosis referred to as "reduction division"? Explain what would happen to the chromosome number in successive generations if meiosis did not occur.', answer: 'Meiosis is called reduction division',
                  options: ['Meiosis is called reduction division', 'haploid', 'half the DNA content', 'half the chromosome *sets*'],
                  hint: 'Revisit "homologous chromosomes vs sister chromatids" using the pipe-cleaner model from Class 8.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' },
                { id: 'b', prompt: 'A human somatic cell contains 46 chromosomes. How many chromosomes will be present in a human sperm cell and in a zygote immediately after fertilization?', answer: 'Sperm cell = 23 chromosomes (haploid, n)',
                  options: ['Sperm cell = 23 chromosomes (haploid, n)', 'haploid', 'half the DNA content', 'half the chromosome *sets*'],
                  hint: 'Revisit "homologous chromosomes vs sister chromatids" using the pipe-cleaner model from Class 8.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' },
                { id: 'c', prompt: 'Compare meiosis and mitosis on three parameters: (a) number of daughter cells produced, (b) chromosome number in daughter cells relative to parent, (c) genetic.', answer: 'number of daughter cells produced, (',
                  options: ['number of daughter cells produced, (', 'haploid', 'half the DNA content', 'half the chromosome *sets*'],
                  hint: 'Revisit "homologous chromosomes vs sister chromatids" using the pipe-cleaner model from Class 8.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' }
          ],
            remediations: { 'meiosis-produces-two-cells-like': { steps: ['Use a pipe-cleaner chromosome model (two colors for maternal/paternal).', 'Simulate Meiosis I: pair homologs, show crossing over, separate homologs → two cells, each with replicated chromosomes.', 'Simulate Meiosis II: separate sister chromatids → four cells, each with single chromatids (now chromosomes).', 'Count chromosomes at each stage.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_4', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).',
          parts: [
                { id: 'a', prompt: 'A student claims: "Meiosis occurs in all body cells of an organism to replace worn-out cells." Evaluate this statement. Is it correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'haploid', 'half the DNA content', 'half the chromosome *sets*'],
                  hint: 'Revisit "homologous chromosomes vs sister chromatids" using the pipe-cleaner model from Class 8.',
                  misconception: 'Students believe meiosis produces *two* cells (like mitosis) because they overlook the second division (Meiosis II).' }
          ],
            remediations: { 'meiosis-produces-two-cells-like': { steps: ['Use a pipe-cleaner chromosome model (two colors for maternal/paternal).', 'Simulate Meiosis I: pair homologs, show crossing over, separate homologs → two cells, each with replicated chromosomes.', 'Simulate Meiosis II: separate sister chromatids → four cells, each with single chromatids (now chromosomes).', 'Count chromosomes at each stage.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_5', difficulty: 'standard',
          question: 'A flower is the reproductive structure of angiosperms (flowering plants).',
          hint: 'If stuck, revisit c6_biology_ch10_005 (Plant Reproduction: From Flowers to Seeds) and.',
          misconception: 'Students think "bisexual flower" and "complete flower" mean the same thing — they assume if a flower has both stamens.',
          parts: [
                { id: 'a', prompt: 'Name the four whorls of a typical flower in order from outermost to innermost, and state the reproductive role of the third and fourth whorls.', answer: 'The four whorls are: calyx (sepals), corolla (petals), androecium (stamens), and',
                  options: ['The four whorls are: calyx (sepals), corolla (petals), androecium (stamens), and', 'petals, sepals, pistil, stamen', 'bisexual flower', 'complete flower'],
                  hint: 'If stuck, revisit c6_biology_ch10_005 (Plant Reproduction: From Flowers to Seeds) and.',
                  misconception: 'Students think "bisexual flower" and "complete flower" mean the same thing — they assume if a flower has both stamens and carpels, it must.' },
                { id: 'b', prompt: 'A student observes a pumpkin plant and says, "This flower has both stamens and carpels, so it must be a bisexual flower." Is this statement always correct?', answer: 'Not always correct',
                  options: ['Not always correct', 'yes, it\'s bisexual', 'bisexual flower', 'complete flower'],
                  hint: 'If stuck, revisit c6_biology_ch10_005 (Plant Reproduction: From Flowers to Seeds) and.',
                  misconception: 'Students think "bisexual flower" and "complete flower" mean the same thing — they assume if a flower has both stamens and carpels, it must.' },
                { id: 'c', prompt: 'You are given a longitudinal section diagram of a mustard flower (Brassica). The thalamus is swollen and the floral parts are inserted below the ovary.', answer: 'Step 1: Observe ovary position — ovary is superior (hypogynous flower)',
                  options: ['Step 1: Observe ovary position — ovary is superior (hypogynous flower)', 'inferior ovary', 'thalamus forms fruit', 'bisexual flower'],
                  hint: 'If stuck, revisit c6_biology_ch10_005 (Plant Reproduction: From Flowers to Seeds) and.',
                  misconception: 'Students think "bisexual flower" and "complete flower" mean the same thing — they assume if a flower has both stamens and carpels, it must.' }
          ],
            remediations: { 'bisexual-flower-and-complete-flower': { steps: ['Take three flowers — hibiscus (complete, bisexual), maize male flower (incomplete, unisexual male), pumpkin female.', 'Make a 2×2 table on paper: rows = complete/incomplete, columns = bisexual/unisexual.', 'Place each flower in the correct cell by checking: (a) Are all 4 whorls visibly present?', 'Verify with teacher/answer key.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_6', difficulty: 'standard',
          question: 'Pollination is the transfer of pollen grains from the anther (male part) to the.',
          hint: 'If stuck, revisit c9_bio_ch3_5 (Parts of a Flower) and practice drawing and labelling the.',
          misconception: 'Students often think that "cross-pollination" means pollen transfer between different species (e.g., rose pollen on.',
          parts: [
                { id: 'a', prompt: 'A farmer grows a pure line of wheat (self-pollinated) and a hybrid variety of maize (cross-pollinated). He saves seeds from both to sow next season.', answer: 'Wheat offspring will be genetically uniform (true to type)',
                  options: ['Wheat offspring will be genetically uniform (true to type)', 'cross-pollination', 'both will be uniform', '"cross-pollination" means pollen transfer between different species (e'],
                  hint: 'If stuck, revisit c9_bio_ch3_5 (Parts of a Flower) and practice drawing and labelling the.',
                  misconception: 'Students often think that "cross-pollination" means pollen transfer between different species (e.g., rose pollen on a lily stigma).' }
          ],
            remediations: { 'cross-pollination-means-pollen-transfer': { steps: ['Show a diagram of pollen germination on a compatible vs incompatible stigma (use online resource or textbook).', 'Explain the lock-and-key recognition: stigma surface has specific proteins that only pollen of the same species can.', 'Conduct a thought experiment: "If you dust maize pollen on a wheat stigma, what happens?" Guide them to realise the.', 'Relate to the definition: cross-pollination = same species, different plant.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_7', difficulty: 'standard',
          question: 'Fertilisation in flowering plants is the fusion of male and female gametes.',
          hint: 'Review the embryo sac development (megagametogenesis) in c9_bio_ch3_5 and pollen.',
          misconception: 'Students often believe the two male gametes in the pollen tube are identical and interchangeable, thinking "either.',
          parts: [
                { id: 'a', prompt: 'In a flowering plant with 2n=24 chromosomes, determine the chromosome number in: (a) the zygote, (b) the primary endosperm nucleus, (c) the antipodal cells.', answer: 'the zygote, (',
                  options: ['the zygote, (', 'either sperm can fuse with the egg', 'triple fusion involves only one polar nucleus, not two'],
                  hint: 'Review the embryo sac development (megagametogenesis) in c9_bio_ch3_5 and pollen development.',
                  misconception: 'Students often believe the two male gametes in the pollen tube are identical and interchangeable, thinking "either sperm can fuse with the.' }
          ],
            remediations: { 'the-two-male-gametes-in': { steps: ['Revisit c9_bio_ch3_5 (flower parts) - confirm the student can locate the embryo sac within the ovule and identify its 7.', 'Use a clear animated diagram showing pollen tube arrival, sperm release, and the two fusion events separately - pause.', 'Have the student physically model with colored beads: 2 blue (sperm), 1 pink (egg), 2 yellow (polar nuclei) - act out.', 'Practice chromosome number problems (like Diagnostic Q3) until the 2n vs 3n distinction is automatic.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_8', difficulty: 'standard',
          question: 'Sexual reproduction in animals is a biological process where two parents.',
          hint: 'Review c9_bio_ch3_4 (meiosis steps and significance) and c6_biology_ch06_006 (hormonal.',
          misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that.',
          parts: [
                { id: 'a', prompt: 'Name the primary sex organs (gonads) in male and female vertebrates and state the type of gamete each produces.', answer: 'Male gonad: testis (produces sperm/male gamete)',
                  options: ['Male gonad: testis (produces sperm/male gamete)', 'testis produces testosterone', 'ovary produces estrogen'],
                  hint: 'Review c9_bio_ch3_4 (meiosis steps and significance) and c6_biology_ch06_006 (hormonal control.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' },
                { id: 'b', prompt: 'Explain why sperm are produced continuously in large numbers throughout adult life in males, while ova are produced in limited numbers with a fixed reserve.', answer: 'Spermatogenesis is continuous from puberty',
                  options: ['Spermatogenesis is continuous from puberty', 'males produce more'],
                  hint: 'Review c9_bio_ch3_4 (meiosis steps and significance) and c6_biology_ch06_006 (hormonal control.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' },
                { id: 'c', prompt: 'A male mammal has a blockage in both vas deferentia (sperm ducts).', answer: 'Absent: sperm (produced in testes, transported via vas deferens)',
                  options: ['Absent: sperm (produced in testes, transported via vas deferens)', 'no semen at all'],
                  hint: 'Review c9_bio_ch3_4 (meiosis steps and significance) and c6_biology_ch06_006 (hormonal control.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' }
          ],
            remediations: { 'in-all-animals': { steps: ['Show comparative diagrams of reproductive tracts of human, dog, bird, frog side-by-side (use NCERT Class 9 textbook.', 'Trace sperm path in each using different colored pens - highlight where sperm is deposited (vagina vs cloaca vs water).', 'Trace ovum path - highlight fertilization site (ampulla of fallopian tube vs infundibulum vs water).', 'Create a table: Animal | Copulatory organ | Sperm deposition site | Fertilization site | Egg laying/giving birth.'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } },
        { type: 'subpart', nodeId: 'c9_bio_ch3_9', difficulty: 'standard',
          question: 'The human reproductive system is a collection of specialized organs and.',
          hint: 'Review the HPG axis feedback loops (negative feedback of testosterone/estrogen.',
          misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically.',
          parts: [
                { id: 'a', prompt: 'Name the primary sex organ in human males and state its two main functions.', answer: 'The primary sex organ in human males is the testis',
                  options: ['The primary sex organ in human males is the testis', 'penis or prostate'],
                  hint: 'Review the HPG axis feedback loops (negative feedback of testosterone/estrogen.',
                  misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' },
                { id: 'b', prompt: 'Explain why the testes are located outside the abdominal cavity in the scrotum, and what would happen if they remained inside the body.', answer: 'The testes are located in the scrotum',
                  options: ['The testes are located in the scrotum', 'for protection', 'to make space'],
                  hint: 'Review the HPG axis feedback loops (negative feedback of testosterone/estrogen.',
                  misconception: 'Students believe that the ovary is directly connected to the fallopian tube (like a pipe), so the ovum automatically enters the tube after.' }
          ],
            remediations: { 'the-ovary-is-directly-connected': { steps: ['Show a labeled diagram of the ovarian-fimbrial region highlighting the gap between ovary and tube.', 'Demonstrate with a simple model - a balloon (ovary) releasing a marble (ovum) near a fringed tube (fimbriae) - showing.', 'Have student trace the path of ovum on a diagram, labeling "fimbriae capture" as a distinct step.', 'Ask: "If fimbriae are scarred by PID, what happens to the ovum?'], labTask: { instruction: 'On the interactive: give the plant 60% sunlight — watch its growth rate — then check.', widget: 'grow', validate: 'grow:sun=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
