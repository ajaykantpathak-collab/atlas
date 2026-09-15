import type { SimDef } from '../../engine/types';

/** v3 generated — c11_bio_ch10_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_bio_ch10_p2: SimDef = {
    id: 'v3_c11_bio_ch10_p2',
    title: 'Cell Cycle and Cell Division · Part 2/2',
    subtitle: 'Division is the finale, not the story — spend your time in interphase where the real work happens.',
    classLevel: 11, subject: 'biology', topic: 'Cell Cycle and Cell Division · Part 2/2',
    chapters: ['c11_bio_ch10'],
    nodeIds: ['c11_bio_cbse_10_007', 'c11_bio_cbse_10_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a cell biologist counting phases in an onion root tip squash', intro: 'Of 500 cells on your slide, 480 sit in interphase. That ratio is the chapter\'s thesis — now explain what they\'re all busy doing.', goal: 'Describe cell-cycle phases and durations, distinguish chromosome number from DNA content, and explain G0, karyokinesis, and cytokinesis.' },
    discovery: {
        question: 'In a 24-hour human cell cycle, the actual division — chromosomes lining up, splitting, cells pinching apart — takes about one hour. What is the cell doing for the other 23, and why can\'t it just skip to the dramatic part?',
        options: ['Interphase: growing and replicating its DNA so each daughter inherits a complete, accurate genome — division without it delivers half-empty cells', 'Resting — division exhausts the cell, so it sleeps most of the day', 'Dividing continuously but too slowly to see', 'Waiting for permission from neighbouring cells'],
        answer: 'Interphase: growing and replicating its DNA so each daughter inherits a complete, accurate genome — division without it delivers half-empty cells',
        hook: 'Mitosis is the visible minute; interphase is the invisible day — and the invisible part is where all the accuracy is won or lost.',
    },
    teaching: [
        { title: 'Meiosis: Meiosis II - Equational Division', text: 'Meiosis II is the second sequential division of meiosis where sister chromatids of each chromosome separate, producing four haploid daughter cells from the two haploid cells formed after Meiosis.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_bio_cbse_10_007', title: 'Your mission',
          mission: { widget: 'mitosis', validate: 'mitosis:stage=50',
            instruction: 'On the lab: move to stage 50 — what phase is the cell in?.',
        context: 'Track a cell through G1, S, G2, and M: explain how DNA doubles to 4C while chromosome count stays 2n, why a liver cell waits in G0 while a heart cell can never return, and how coconut endosperm ends up multinucleate.',
            observePrompt: 'What did the mitosis interactive show you?' } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_007', title: 'Meiosis: Meiosis II - Equational Division',
          caseStudy: { intro: 'Imagine you\'re examining a grasshopper testis under a microscope — you see cells with half the chromosome number but each chromosome still has two chromatids.',
            decisions: [{ prompt: 'A cell has completed Meiosis I and is in interkinesis. If the original diploid cell had 2n = 16 chromosomes and 4C DNA content, what are.', options: [
                { text: 'Each cell has n = 8 chromosomes and 2C DNA content', outcome: 'Each cell has n = 8 chromosomes and 2C DNA content. A wrong answer (e.g., n = 16 or 1C) reveals the.' },
                { text: 'Meiosis II halves the chromosome number again', outcome: 'Not quite — Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.', reveals: 'meiosis-ii-halves-the-chromosome' },
                { text: '"Meiosis II halves the chromosome number again"', outcome: 'Not quite — Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.', reveals: 'meiosis-ii-halves-the-chromosome' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c11_bio_cbse_10_008', title: 'Significance of Meiosis: Genetic Variation',
          scaffold: { problem: 'In a diploid plant with 2n = 8, a gene for flower colour (R = red, r = white) is on chromosome 2, and a gene for seed shape (S = round,.',
            steps: [
            { text: 'Determine haploid number n = 4 (since 2n = 8). Chromosome pairs: 1, 2, 3, 4.' },
            { text: 'Identify which chromosomes carry the genes: chromosome 2 has R/r, chromosome 5 has S/s (but there are only 4 pairs,.' },
            { text: 'In metaphase I, each bivalent aligns independently. For chromosome 2 pair, two orientations: R to pole A / r to pole.' },
            { text: 'Combine orientations: 2 choices for chr2 × 2 choices for chr3 = 4 gamete types: RS, Rs, rS, rs.' },
            { text: 'Verify: each gamete gets one allele per gene, all combinations equally likely (1/4 each).', faded: true, blankAnswer: 'Four gamete genotypes: RS, Rs, rS, rs each at 25% frequency.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_bio_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Cell Cycle and Cell Division · Part 2/2', spots: [
            { id: 's1', label: 'Meiosis Meiosis II - Equational Division', prompt: 'Which idea is this? — Meiosis II is the second sequential division of meiosis where sister chromatids of each.', answer: 'Meiosis Meiosis II - Equational Division', options: ['Meiosis Meiosis II - Equational Division', 'Significance of Meiosis Genetic Variation'] },
            { id: 's2', label: 'Significance of Meiosis Genetic Variation', prompt: 'Which idea is this? — Meiosis is a specialized reductional cell division in diploid germ cells that produces.', answer: 'Significance of Meiosis Genetic Variation', options: ['Significance of Meiosis Genetic Variation', 'Meiosis Meiosis II - Equational Division'] }
          ] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_007', title: 'Use it in the wild',
          caseStudy: { intro: 'For a biology practical you squash an onion root tip, stain with acetocarmine, and count 500 cells: 482 show a normal-looking nucleus with no visible chromosomes, 18 show condensed chromosomes in various mitotic stages. Your partner writes the conclusion: \'Root tip cells spend most of their time resting and occasionally divide.\'',
            decisions: [{ prompt: 'Is \'resting\' the right word for what those 482 cells are doing?', options: [
                { text: 'No — those cells are in interphase, which your own count proves occupies >95% of the cycle. Far from resting: G1 builds proteins and organelles, S replicates the entire genome, G2 synthesises tubulin and checkpoint proteins. Interphase is the most metabolically intense stretch of the cycle.', outcome: 'The \'resting phase\' label is a historical artefact — chromosomes are invisible then, so it looked idle; the cell is actually doing the heavy preparatory work.' },
                { text: 'Yes — the calm-looking nucleus without chromosomes means the cell is dormant between divisions.', outcome: 'Invisible chromosomes ≠ inactivity; that \'calm\' nucleus is replicating billions of base pairs and building the machinery for mitosis.', reveals: 'interphase-is-resting' },
                { text: 'Your count is biased — most cells are in mitosis but the stain missed them.', outcome: 'The stain marks condensed chromosomes reliably; the 96:4 ratio is exactly what theory predicts — interphase dominates because division is the short final act.', reveals: 'mitosis-dominates-cycle' }
            ] }] } },
        { type: 'case', nodeId: 'c11_bio_cbse_10_008', title: 'You made it',
          caseStudy: { intro: 'You now separate DNA content from chromosome count and karyokinesis from cytokinesis — the four distinctions the whole chapter quietly depends on.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'mitosis', prompt: 'Explore the mitosis interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'mitosis', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_007', difficulty: 'standard',
          question: 'Meiosis II is the second sequential division of meiosis where sister chromatids.',
          hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c11_bio_cbse_10_006 (Anaphase.',
          misconception: 'Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.',
          parts: [
                { id: 'a', prompt: 'A cell has completed Meiosis I and is in interkinesis. If the original diploid cell had 2n = 16 chromosomes and 4C DNA content, what are the chromosome number.', answer: 'Each cell has n = 8 chromosomes and 2C DNA content',
                  options: ['Each cell has n = 8 chromosomes and 2C DNA content', 'Meiosis II halves the chromosome number again', '"Meiosis II halves the chromosome number again"'],
                  hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c11_bio_cbse_10_006 (Anaphase.',
                  misconception: 'Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.' },
                { id: 'b', prompt: 'In a plant with 2n = 24, a microspore mother cell undergoes meiosis.', answer: 'Total nuclei = 4, each with n = 12 chromosomes',
                  options: ['Total nuclei = 4, each with n = 12 chromosomes', '48 chromosomes', 'Meiosis II halves the chromosome number again', '"Meiosis II halves the chromosome number again"'],
                  hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c11_bio_cbse_10_006 (Anaphase.',
                  misconception: 'Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.' }
          ],
            remediations: { 'meiosis-ii-halves-the-chromosome': { steps: ['Draw a single chromosome with two chromatids — label "1 chromosome, 2 chromatids, 1 centromere."', 'Show it replicating in S phase — still "1 chromosome, 2 chromatids" (centromere hasn\'t split).', 'Show Anaphase II — centromere splits → "2 chromosomes, 1 chromatid each."', 'Count centromeres before and after: 1 → 2 (chromosome number doubled per original chromosome, but since starting cell.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Interkinesis between Meiosis I and II is just a short interphase where DNA replicates." Is it correct?', answer: 'Incorrect',
                  options: ['Incorrect', 'correct', 'Meiosis II halves the chromosome number again', '"Meiosis II halves the chromosome number again"'],
                  hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c11_bio_cbse_10_006 (Anaphase.',
                  misconception: 'Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.' },
                { id: 'b', prompt: 'Design a microscopic observation experiment to distinguish between a cell in Metaphase of mitosis and a cell in Metaphase II of meiosis, using only chromosome.', answer: 'Look for paired homologous chromosomes at the metaphase plate',
                  options: ['Look for paired homologous chromosomes at the metaphase plate', 'Meiosis II halves the chromosome number again', '"Meiosis II halves the chromosome number again"'],
                  hint: 'Revisit c11_bio_cbse_10_002 (S phase DNA replication) and c11_bio_cbse_10_006 (Anaphase.',
                  misconception: 'Students think "Meiosis II halves the chromosome number again" — they believe n → n/2.' }
          ],
            remediations: { 'meiosis-ii-halves-the-chromosome': { steps: ['Draw a single chromosome with two chromatids — label "1 chromosome, 2 chromatids, 1 centromere."', 'Show it replicating in S phase — still "1 chromosome, 2 chromatids" (centromere hasn\'t split).', 'Show Anaphase II — centromere splits → "2 chromosomes, 1 chromatid each."', 'Count centromeres before and after: 1 → 2 (chromosome number doubled per original chromosome, but since starting cell.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } },
        { type: 'subpart', nodeId: 'c11_bio_cbse_10_008', difficulty: 'standard',
          question: 'Meiosis is a specialized reductional cell division in diploid germ cells that.',
          hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and practice drawing prophase I with labeled.',
          misconception: 'Students often think crossing over occurs between sister chromatids because they look identical, or that independent.',
          parts: [
                { id: 'a', prompt: 'Define crossing over and state the exact stage of prophase I when it occurs, naming the enzyme responsible.', answer: 'Crossing over is the reciprocal exchange of genetic material between non-sister',
                  options: ['Crossing over is the reciprocal exchange of genetic material between non-sister', 'occurs in metaphase I', 'involves sister chromatids', 'reduction of chromosome number'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and practice drawing prophase I with labeled non-sister.',
                  misconception: 'Students often think crossing over occurs between sister chromatids because they look identical, or that independent assortment happens.' },
                { id: 'b', prompt: 'A diploid organism has 2n = 6 chromosomes. Calculate the number of genetically distinct gamete types possible from independent assortment alone, assuming.', answer: 'Haploid number n = 3',
                  options: ['Haploid number n = 3', 'reduction of chromosome number', 'reduction of genetic variation'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and practice drawing prophase I with labeled non-sister.',
                  misconception: 'Students often think crossing over occurs between sister chromatids because they look identical, or that independent assortment happens.' },
                { id: 'c', prompt: 'Compare the genetic composition of the four daughter cells produced by meiosis in a heterozygous individual (Aa) for a single gene, with and without crossing.', answer: 'Without crossing over: two cells get A, two get a (parental types only)',
                  options: ['Without crossing over: two cells get A, two get a (parental types only)', 'always four different types', 'reduction of chromosome number', 'reduction of genetic variation'],
                  hint: 'Revisit c11_bio_cbse_10_006 (Meiosis I) and practice drawing prophase I with labeled non-sister.',
                  misconception: 'Students often think crossing over occurs between sister chromatids because they look identical, or that independent assortment happens.' }
          ],
            remediations: { 'crossing-over-occurs-between-sister': { steps: ['Draw a single homologous pair with heterozygous alleles (A/a) on a whiteboard.', 'Show synapsis and chiasma formation between non-sister chromatids — label alleles before and after exchange.', 'Animate metaphase I: flip a coin for each pair to decide which pole gets maternal vs. paternal chromosome.', 'Count distinct gamete genotypes after one meiosis.'], labTask: { instruction: 'On the interactive: move to stage 50 — what phase is the cell in? — then check.', widget: 'mitosis', validate: 'mitosis:stage=50' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
