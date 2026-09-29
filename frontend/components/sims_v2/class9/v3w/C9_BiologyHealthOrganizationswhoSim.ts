import type { SimDef } from '../../engine/types';
import C9_BiologyHealthOrganizationswhoSim from '../../../simulations/c6_12/C9_BiologyHealthOrganizationswhoSim';

/** v3 wrapped master — C9_BiologyHealthOrganizationswhoSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c9_biologyhealthorganizationswhosim: SimDef = {
    id: 'v3w_c9_biologyhealthorganizationswhosim',
    title: 'Sexual Reproduction in Animals: Male and Female Systems',
    subtitle: 'This node covers the general organization and function of male and female reproductive.',
    classLevel: 9, subject: 'biology', topic: 'Sexual Reproduction in Animals: Male and Female Systems',
    chapters: [],
    nodeIds: ['c9_bio_ch3_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 9 learner', intro: 'Observe a common Indian household scene: a pet dog or stray cat giving birth to puppies/kittens, or hens.', goal: 'Master Sexual Reproduction in Animals: Male and Female Systems.' },
    discovery: {
        question: 'Name the primary sex organs (gonads) in male and female vertebrates and state the type of gamete each produces.',
        options: ['Male gonad: testis (produces sperm/male gamete)', 'testis produces testosterone', 'ovary produces estrogen'],
        answer: 'Male gonad: testis (produces sperm/male gamete)',
        hook: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that.',
    },
    teaching: [
        { title: 'Sexual reproduction in animals is a.', text: 'Sexual reproduction in animals is a biological process where two parents contribute specialized haploid gametes (sperm from male, ovum from female) that fuse during fertilization to form a diploid.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c9_bio_ch3_8', title: 'Sexual reproduction in animals is a.',
          scaffold: { problem: 'A farmer notices his prize bull is mounting cows normally but no pregnancies occur after 6 months.',
            steps: [
            { text: 'Identify that normal testosterone and libido indicate functional Leydig cells (endocrine) and intact.' },
            { text: 'Note that accessory gland secretions (seminal vesicles, prostate) are normal - these glands are stimulated by.' },
            { text: 'Zero sperm count (azoospermia) with normal hormonal profile points to a defect in spermatogenesis itself (germinal.' },
            { text: 'Since the bull mounts and ejaculates (emission/ejaculation reflexes intact), the vas deferens and ejaculatory ducts are.' },
            { text: 'Conclude the defect is likely in the seminiferous tubules (Sertoli cell dysfunction, germ cell arrest) or in the.', faded: true, blankAnswer: 'The defect is most likely in the seminiferous tubules.' }
            ] } }
    ],
    explore: { component: C9_BiologyHealthOrganizationswhoSim, prompt: 'Explore the interactive — Sexual Reproduction in Animals: Male and Female Systems' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_bio_ch3_8', difficulty: 'standard',
          question: 'Sexual reproduction in animals is a biological process where two parents.',
          hint: 'Review c9_bio_ch3_4 (meiosis steps and significance) and c6_biology_ch06_006 (hormonal.',
          misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that.',
          parts: [
                { id: 'a', prompt: 'Name the primary sex organs (gonads) in male and female vertebrates and state the type of gamete each produces.', answer: 'Male gonad: testis (produces sperm/male gamete)',
                  options: ['Male gonad: testis (produces sperm/male gamete)', 'testis produces testosterone', 'ovary produces estrogen'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' },
                { id: 'b', prompt: 'Explain why sperm are produced continuously in large numbers throughout adult life in males, while ova are produced in limited numbers with a fixed reserve.', answer: 'Spermatogenesis is continuous from puberty',
                  options: ['Spermatogenesis is continuous from puberty', 'males produce more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' },
                { id: 'c', prompt: 'A male mammal has a blockage in both vas deferentia (sperm ducts).', answer: 'Absent: sperm (produced in testes, transported via vas deferens)',
                  options: ['Absent: sperm (produced in testes, transported via vas deferens)', 'no semen at all'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe that in all animals, the male deposits sperm directly into the female\'s vagina (like humans), and that the female.' }
          ],
            remediations: { 'in-all-animals': { steps: ['Show comparative diagrams of reproductive tracts of human, dog, bird, frog side-by-side (use NCERT Class 9 textbook.', 'Trace sperm path in each using different colored pens - highlight where sperm is deposited (vagina vs cloaca vs water).', 'Trace ovum path - highlight fertilization site (ampulla of fallopian tube vs infundibulum vs water).', 'Create a table: Animal | Copulatory organ | Sperm deposition site | Fertilization site | Egg laying/giving birth.', 'Ask student to explain why "vagina" is not a universal term for sperm deposition site.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
