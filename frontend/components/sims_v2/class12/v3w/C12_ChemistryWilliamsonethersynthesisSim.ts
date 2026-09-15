import type { SimDef } from '../../engine/types';
import C12_ChemistryWilliamsonethersynthesisSim from '../../../simulations/c6_12/C12_ChemistryWilliamsonethersynthesisSim';

/** v3 wrapped master — C12_ChemistryWilliamsonethersynthesisSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_chemistrywilliamsonethersynthesissim: SimDef = {
    id: 'v3w_c12_chemistrywilliamsonethersynthesissim',
    title: 'Williamsonethersynthesis',
    subtitle: 'This node covers: Williamson synthesis mechanism (SN2), scope and limitations (primary vs.',
    classLevel: 12, subject: 'chemistry', topic: 'Preparation and Reactions of Ethers: Williamson Synthesis',
    chapters: [],
    nodeIds: ['c12_chem_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Observe a bottle of diethyl ether (ethoxyethane) in the organic chemistry lab — it has a sweet, volatile.', goal: 'Master Williamsonethersynthesis.' },
    // discovery omitted — no cleanly extractable hook
    teaching: [
        { title: 'Williamson synthesis is a nucleophilic.', text: 'Williamson synthesis is a nucleophilic substitution (SN2) reaction where an alkoxide ion (RO⁻) or phenoxide ion (ArO⁻) attacks a primary alkyl halide (R\'–X) to form an ether (R–O–R\') and a halide.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_chem_cbse_07_010', title: 'Williamson synthesis is a nucleophilic.',
          scaffold: { problem: 'A student wants to prepare 2-ethoxy-3-methylpentane (CH₃CH₂–O–CH(CH₃)CH₂CH₃) via Williamson synthesis.',
            steps: [
            { text: 'Analyse the target ether structure: CH₃CH₂–O–CH(CH₃)CH₂CH₃. The oxygen is bonded to an ethyl group (CH₃CH₂–) and a.' },
            { text: 'Recall Williamson rule: the alkyl halide MUST be primary (or methyl) for SN2.' },
            { text: 'Evaluate option A: 3-methylpentan-2-yl bromide is a SECONDARY alkyl halide (α-carbon bonded to two carbons).' },
            { text: 'Evaluate option B: Ethyl bromide (CH₃CH₂Br) is a PRIMARY alkyl halide — excellent for SN2.' },
            { text: 'Write the two-step synthesis:', faded: true, blankAnswer: 'Use sodium 3-methylpentan-2-oxide (from 3-methylpentan-2-ol.' }
            ] } }
    ],
    explore: { component: C12_ChemistryWilliamsonethersynthesisSim, prompt: 'Explore the interactive — Williamsonethersynthesis' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_chem_cbse_07_010', difficulty: 'standard',
          question: 'Williamson synthesis is a nucleophilic substitution (SN2) reaction where an.',
          hint: 'If stuck, review c12_chem_cbse_07_001 (alcohol/halide classification) and Class 11.',
          misconception: '**Misconception:** "Williamson synthesis works for all alkyl halides — you just mix alkoxide and alkyl halide.".',
          parts: [
                { id: 'a', prompt: 'A student attempts to prepare tert-butyl ethyl ether by reacting sodium ethoxide with tert-butyl bromide.', answer: '**Correct answer:** The major product is 2-methylprop-1-ene (isobutylene)',
                  options: ['**Correct answer:** The major product is 2-methylprop-1-ene (isobutylene)', 'SN1 occurs'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Williamson synthesis works for all alkyl halides — you just mix alkoxide and alkyl halide." **Reality:** Williamson.' }
          ],
            remediations: { 'misconception-williamson-synthesis-works-for': { steps: ['If the student cannot predict elimination vs substitution: 1.', 'Revisit **c12_chem_cbse_07_001** (classification of alcohols/halides as 1°, 2°, 3°) — identify the α-carbon.', 'Review **SN2 steric requirements** (backside attack needs accessible α-carbon) from Class 11 haloalkanes chapter.', 'Practice: Given 5 alkyl halides (CH₃Br, CH₃CH₂Br, (CH₃)₂CHBr, (CH₃)₃CBr, C₆H₅Br), predict SN2/E2/no reaction with NaOEt.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
