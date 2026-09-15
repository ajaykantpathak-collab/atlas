import type { SimDef } from '../../engine/types';
import C10_ScienceHereditySim from '../../../simulations/c6_12/C10_ScienceHereditySim';

/** v3 wrapped master — C10_ScienceHereditySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_sciencehereditysim: SimDef = {
    id: 'v3w_c10_sciencehereditysim',
    title: 'Heredity',
    subtitle: 'This node covers the origin and accumulation of variation during reproduction, focusing.',
    classLevel: 10, subject: 'science', topic: 'Accumulation of Variation During Reproduction: Basis of Heredity',
    chapters: [],
    nodeIds: ['c10_bio_cbse_04_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Observe a litter of puppies or a batch of seedlings from the same parent plant — despite having the same.', goal: 'Master Heredity.' },
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
            ] } }
    ],
    explore: { component: C10_ScienceHereditySim, prompt: 'Explore the interactive — Heredity' },
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
            remediations: { 'variation-in-sexual-reproduction-comes': { steps: ['Revisit **c9_bio_ch3_4 (Meiosis: Significance in Sexual Reproduction)** — specifically the animation of crossing over.', 'Use a physical model: take 2 pairs of coloured socks (homologous chromosomes), pair them, twist at one point (crossing.', 'Write a 3-sentence explanation: "Meiosis creates variation by (1) crossing over between homologous chromosomes and (2).', 'Attempt Diagnostic Question 3 again without notes.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
