import type { SimDef } from '../../engine/types';
import C11_BiotechnologyMendelsExperimentsLawsSim from '../../../simulations/c6_12/C11_BiotechnologyMendelsExperimentsLawsSim';

/** v3 wrapped master — C11_BiotechnologyMendelsExperimentsLawsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_biotechnologymendelsexperimentslawssim: SimDef = {
    id: 'v3w_c11_biotechnologymendelsexperimentslawssim',
    title: 'nology Mendels Experiments Laws',
    subtitle: 'This node covers the rationale for choosing garden pea and the experimental methodology.',
    classLevel: 11, subject: 'biotechnology', topic: 'Mendel\'s Experiments: Choice of Organism and Method',
    chapters: [],
    nodeIds: ['c11_biotech_cbse_06_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are a plant breeder in 1850 trying to discover the rules of inheritance — you cannot see genes,.', goal: 'Master nology Mendels Experiments Laws.' },
    discovery: {
        question: 'State any four characteristics of garden pea (*Pisum sativum*) that made it an ideal model organism for Mendel\'s inheritance experiments.',
        options: ['Correct answer: (1) Annual plant', 'easy to grow', 'common plant'],
        answer: 'Correct answer: (1) Annual plant',
        hook: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery.',
    },
    teaching: [
        { title: 'Mendel selected garden pea (*Pisum sativum*).', text: 'Mendel selected garden pea (*Pisum sativum*) as his model organism because it is an annual plant with perfect bisexual flowers, naturally self-pollinating, and exhibits several distinct, easily.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_biotech_cbse_06_001', title: 'Mendel selected garden pea (*Pisum.',
          scaffold: { problem: 'A Class 11 student wants to replicate Mendel\'s approach for a science fair project using a plant available in Indian school gardens.',
            steps: [
            { text: 'List Mendel\'s five key criteria for a model organism.' },
            { text: 'Research/recall the biological features of each candidate plant relevant to each criterion.' },
            { text: 'Assign scores (1-5) for each plant on each criterion based on biological facts.' },
            { text: 'Calculate total scores and identify the highest.' },
            { text: 'Write a justification linking the top scorer\'s features to Mendel\'s experimental needs (pure lines, controlled crosses,.', faded: true, blankAnswer: 'Scoring Table (illustrative):' }
            ] } }
    ],
    explore: { component: C11_BiotechnologyMendelsExperimentsLawsSim, prompt: 'Explore the interactive — nology Mendels Experiments Laws' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_001', difficulty: 'standard',
          question: 'Mendel selected garden pea (*Pisum sativum*) as his model organism because it.',
          hint: 'If stuck, revisit the structure of a pea flower (cleistogamous, bisexual) and the steps.',
          misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery.',
          parts: [
                { id: 'a', prompt: 'State any four characteristics of garden pea (*Pisum sativum*) that made it an ideal model organism for Mendel\'s inheritance experiments.', answer: 'Correct answer: (1) Annual plant',
                  options: ['Correct answer: (1) Annual plant', 'easy to grow', 'common plant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' },
                { id: 'b', prompt: 'Compare Mendel\'s approach of counting progeny phenotypes and calculating ratios with the qualitative "like begets like" observations of earlier breeders.', answer: 'Correct answer: Qualitative observations only note that traits reappear',
                  options: ['Correct answer: Qualitative observations only note that traits reappear', 'Mendel used math', 'common'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' }
          ],
            remediations: { 'mendel-chose-pea-plants-simply': { steps: ['If a student exhibits this misconception, do NOT re-read the textbook list.', 'Instead: (1) Ask them to imagine crossing two humans for height — they will immediately see continuous variation and.', '(2) Have them compare pea flowers (closed, self-pollinating) with maize (open, wind-pollinated) using diagrams — ask.', 'Another breeder crosses two tall maize plants from a field and gets a messy ratio.'] } } },
        { type: 'subpart', nodeId: 'c11_biotech_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery.',
          parts: [
                { id: 'a', prompt: 'A student argues: "Mendel could have used any flowering plant; he just got lucky with peas." Evaluate this claim by analyzing whether the same experimental.', answer: 'Correct evaluation: The claim is false',
                  options: ['Correct evaluation: The claim is false', 'common', 'easy to grow in the monastery garden'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' },
                { id: 'b', prompt: 'Compare Mendel\'s approach of counting progeny phenotypes and calculating ratios with the qualitative "like begets like" observations of earlier breeders.', answer: 'Correct answer: Qualitative observations only note that traits reappear',
                  options: ['Correct answer: Qualitative observations only note that traits reappear', 'Mendel used math', 'common', 'easy to grow in the monastery garden'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe Mendel chose pea plants simply because they were "common" or "easy to grow in the monastery garden." The specific.' }
          ],
            remediations: { 'mendel-chose-pea-plants-simply': { steps: ['If a student exhibits this misconception, do NOT re-read the textbook list.', 'Instead: (1) Ask them to imagine crossing two humans for height — they will immediately see continuous variation and.', '(2) Have them compare pea flowers (closed, self-pollinating) with maize (open, wind-pollinated) using diagrams — ask.', 'Another breeder crosses two tall maize plants from a field and gets a messy ratio.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
