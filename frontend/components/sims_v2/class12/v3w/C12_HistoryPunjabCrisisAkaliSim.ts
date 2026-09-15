import type { SimDef } from '../../engine/types';
import C12_HistoryPunjabCrisisAkaliSim from '../../../simulations/c6_12/C12_HistoryPunjabCrisisAkaliSim';

/** v3 wrapped master — C12_HistoryPunjabCrisisAkaliSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historypunjabcrisisakalisim: SimDef = {
    id: 'v3w_c12_historypunjabcrisisakalisim',
    title: 'Punjab Crisis Akali',
    subtitle: 'This node covers: the Rowlatt Act\'s legislative background (Sidney Rowlatt Committee,.',
    classLevel: 12, subject: 'history', topic: 'The Rowlatt Satyagraha (1919): The Act, the Hartal and Jallianwala Bagh',
    chapters: [],
    nodeIds: ['c12_hist_cbse_11_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are standing at the Jallianwala Bagh memorial in Amritsar today — the bullet marks on the walls,.', goal: 'Master Punjab Crisis Akali.' },
    discovery: {
        question: 'What was the specific date of the Jallianwala Bagh massacre, who gave the firing order, and what was the crowd gathered for?',
        options: ['The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)', 'Gandhi was leading the protest', 'it was a planned satyagraha meeting'],
        answer: 'The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)',
        hook: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the.',
    },
    teaching: [
        { title: 'The Rowlatt Satyagraha (March–April 1919).', text: 'The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest organised by Mahatma Gandhi against the Rowlatt Act (Anarchical and Revolutionary Crimes Act, 1919), which extended.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_002', title: 'The Rowlatt Satyagraha (March–April.',
          scaffold: { problem: 'Using the NCERT text (pp. 289–290) and Source 8 (pp. 311–312), explain why the British Home Department consistently underestimated the.',
            steps: [
            { text: 'Identify the source — Source 8 is a *confidential* Home Department report, not a public statement; its audience is.' },
            { text: 'Note the institutional incentive — officials needed to show "control" to justify their positions; admitting mass unrest.' },
            { text: 'Find textual evidence — "meetings excite little or no interest" (Bengal), "march as theatrical" (Madras), "peasantry.' },
            { text: 'Contrast with nationalist sources — Gandhi\'s Dandi speech (Source 4, though 1930, same logic): "the power of peace and.' },
            { text: 'Synthesise — The colonial state *could not see* mass nationalism because its categories (loyal subjects, passive.', faded: true, blankAnswer: 'The Home Department underestimated support because its.' }
            ] } }
    ],
    explore: { component: C12_HistoryPunjabCrisisAkaliSim, prompt: 'Explore the interactive — Punjab Crisis Akali' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_002', difficulty: 'standard',
          question: 'The Rowlatt Satyagraha (March–April 1919) was the first all-India mass protest.',
          hint: 'If unclear on the *difference* between early satyagrahas and Rowlatt Satyagraha, re-read.',
          misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the.',
          parts: [
                { id: 'a', prompt: 'What was the specific date of the Jallianwala Bagh massacre, who gave the firing order, and what was the crowd gathered for?', answer: 'The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)',
                  options: ['The Jallianwala Bagh massacre occurred on 13 April 1919 (Baisakhi day)', 'Gandhi was leading the protest', 'it was a planned satyagraha meeting'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' },
                { id: 'b', prompt: 'A police fortnightly report from Bengal (March 1930, but similar tone existed in 1919) states: "The peasantry is engaged in harvesting...', answer: '(1) "Whose perspective does this report represent?"',
                  options: ['(1) "Whose perspective does this report represent?"', 'the hartal failed in Bengal', 'the Rowlatt Act *was* the wartime law'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' }
          ],
            remediations: { 'three-specific-errors-1-conflating': { steps: ['If the student holds any of the three misconceptions: **Step 1** – Re-read NCERT Class 12, Theme 11, pp.', '289–290 (the paragraph starting "During the Great War...', 'Rowlatt Act") and Class 10, Ch.', '2, node c10_hist_cbse_02_003 for the legislative distinction.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Jallianwala Bagh massacre was the turning point that made Indian nationalism irreversible." Use evidence from the Rowlatt Satyagraha\'s.', answer: 'The claim is *partially valid but incomplete*',
                  options: ['The claim is *partially valid but incomplete*', 'the Rowlatt Act *was* the wartime law'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Three specific errors:** (1) **Conflating the Rowlatt Act with the Defence of India Act (1915)** — Students think the Rowlatt Act *was*.' }
          ],
            remediations: { 'three-specific-errors-1-conflating': { steps: ['If the student holds any of the three misconceptions: **Step 1** – Re-read NCERT Class 12, Theme 11, pp.', '289–290 (the paragraph starting "During the Great War...', 'Rowlatt Act") and Class 10, Ch.', '2, node c10_hist_cbse_02_003 for the legislative distinction.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
