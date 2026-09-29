import type { SimDef } from '../../engine/types';
import C12_BiotechnologyTranslationInitiationElongationSim from '../../../simulations/c6_12/C12_BiotechnologyTranslationInitiationElongationSim';

/** v3 wrapped master — C12_BiotechnologyTranslationInitiationElongationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_biotechnologytranslationinitiationelongationsim: SimDef = {
    id: 'v3w_c12_biotechnologytranslationinitiationelongationsim',
    title: 'Primary Culture vs Established Cell Lines',
    subtitle: 'Covers: definitions, isolation methods (explant vs. enzymatic disaggregation), concept of.',
    classLevel: 12, subject: 'biotechnology', topic: 'Primary Culture vs Established Cell Lines',
    chapters: [],
    nodeIds: ['c12_biotech_cbse_08_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are testing a new hepatotoxicity drug. You have two options: (1) primary human hepatocytes.', goal: 'Master Primary Culture vs Established Cell Lines.' },
    discovery: {
        question: 'A researcher isolates cells from a mouse liver using collagenase digestion and cultures them for the first time.',
        options: ['This is a primary cell culture', 'established cell line', 'clonal population'],
        answer: 'This is a primary cell culture',
        hook: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100%.',
    },
    teaching: [
        { title: 'Primary cell culture is the initial.', text: 'Primary cell culture is the initial heterogeneous population of cells isolated directly from host tissue and grown in vitro, retaining the genetic and phenotypic characteristics of the original.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_biotech_cbse_08_002', title: 'Primary cell culture is the initial.',
          scaffold: { problem: 'A researcher isolates primary human dermal fibroblasts from a skin biopsy.',
            steps: [
            { text: 'Determine number of doublings per passage. Passage interval = 3 days = 72 hours. Fibroblast doublings = 72/24 = 3.' },
            { text: 'Calculate fold expansion per passage. Fibroblasts: 2^3 = 8-fold. Keratinocytes: 2^4 = 16-fold.' },
            { text: 'Account for 1:3 split ratio. At each passage, only 1/3 of cells are transferred.' },
            { text: 'Track proportions over 3 passages (P0 → P1 → P2 → P3). Start with 100 total cells: 85F, 10K, 5M.' },
            { text: 'Interpret result. Fibroblast purity drops from 85% to ~52% in just 3 passages due to faster-growing keratinocyte.', faded: true, blankAnswer: '~52% fibroblast purity at passage 3 (down from 85% at P0).' }
            ] } }
    ],
    explore: { component: C12_BiotechnologyTranslationInitiationElongationSim, prompt: 'Explore the interactive — Primary Culture vs Established Cell Lines' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_002', difficulty: 'standard',
          question: 'Primary cell culture is the initial heterogeneous population of cells isolated.',
          hint: 'Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) for dissociation methods and.',
          misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100%.',
          parts: [
                { id: 'a', prompt: 'A researcher isolates cells from a mouse liver using collagenase digestion and cultures them for the first time.', answer: 'This is a primary cell culture',
                  options: ['This is a primary cell culture', 'established cell line', 'clonal population'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' },
                { id: 'b', prompt: 'You need to study the effect of a cytokine on the differentiation of human osteoblasts.', answer: 'studying physiological differentiation markers, and (',
                  options: ['studying physiological differentiation markers, and (', 'primary culture', 'primary hepatocytes = 100% hepatocytes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' },
                { id: 'c', prompt: 'A lab reports that their "primary neuronal culture" from rat cortex has been passaged 5 times over 2 months and shows uniform morphology.', answer: 'The claim is flawed',
                  options: ['The claim is flawed', 'primary culture', 'primary hepatocytes = 100% hepatocytes'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' }
          ],
            remediations: { 'primary-culture-means-a-pure': { steps: ['If the student conflates primary culture with pure cell type: (1) Show a phase-contrast image of primary rat liver.', '(2) Have them calculate the theoretical purity after one passage if hepatocytes divide every 24h but contaminating.', '(3) Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) to reinforce that enzymatic dissociation releases all.', 'Re-diagnostic: Ask them to explain why primary keratinocyte cultures require feeder layers or selective media to.'] } } },
        { type: 'subpart', nodeId: 'c12_biotech_cbse_08_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100%.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Established cell lines are superior to primary cultures for all pharmaceutical testing because they are reproducible and.', answer: 'The statement is false',
                  options: ['The statement is false', 'primary culture', 'primary hepatocytes = 100% hepatocytes', '"primary culture" means a pure population of one cell type (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' },
                { id: 'b', prompt: 'Design a 3-step experimental workflow to convert a primary culture of chicken embryonic fibroblasts (CEFs) into a well-characterized established cell line,.', answer: 'Step 1 (P0-P2): Serial passage 1:3 twice weekly',
                  options: ['Step 1 (P0-P2): Serial passage 1:3 twice weekly', 'primary culture', 'primary hepatocytes = 100% hepatocytes', '"primary culture" means a pure population of one cell type (e'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe "primary culture" means a pure population of one cell type (e.g., "primary hepatocytes = 100% hepatocytes").' }
          ],
            remediations: { 'primary-culture-means-a-pure': { steps: ['If the student conflates primary culture with pure cell type: (1) Show a phase-contrast image of primary rat liver.', '(2) Have them calculate the theoretical purity after one passage if hepatocytes divide every 24h but contaminating.', '(3) Revisit c11_biotech_cbse_12_011 (Cell Culture Techniques) to reinforce that enzymatic dissociation releases all.', 'Re-diagnostic: Ask them to explain why primary keratinocyte cultures require feeder layers or selective media to.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
