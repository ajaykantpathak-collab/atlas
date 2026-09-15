import type { SimDef } from '../../engine/types';
import C12_HistoryColonialismCountrysideSim from '../../../simulations/c6_12/C12_HistoryColonialismCountrysideSim';

/** v3 wrapped master — C12_HistoryColonialismCountrysideSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_historycolonialismcountrysidesim: SimDef = {
    id: 'v3w_c12_historycolonialismcountrysidesim',
    title: 'Colonialism Countryside',
    subtitle: 'This node covers British counter-offensive operations from June 1857 to March 1858: legal.',
    classLevel: 12, subject: 'history', topic: 'British Repression: The Relief of Delhi, Lucknow and the Counter-Offensive',
    chapters: [],
    nodeIds: ['c12_hist_cbse_10_007', 'c12_hist_cbse_10_008', 'c12_hist_cbse_11_003'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine standing on the Delhi Ridge in July 1857: a small British force, decimated by cholera and heat,.', goal: 'Master Colonialism Countryside.' },
    discovery: {
        question: 'Why did the British choose a two-pronged attack on Delhi (from Punjab and Calcutta) rather than a single advance, and what does this reveal about their.',
        options: ['The Punjab was largely peaceful and provided a secure base with Sikh and Punjabi', 'they attacked from all sides', 'they had better guns and won'],
        answer: 'The Punjab was largely peaceful and provided a secure base with Sikh and Punjabi',
        hook: 'Students often think British repression was purely military — "they had better guns and won." In reality, the British.',
    },
    teaching: [
        { title: 'British repression of the 1857 revolt refers.', text: 'British repression of the 1857 revolt refers to the coordinated military, legal, and psychological campaign launched by the East India Company from June 1857 to March 1858 to reconquer Delhi,.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_007', title: 'British repression of the 1857 revolt.',
          scaffold: { problem: 'Explain why the British capture of Delhi took from early June to late September 1857 despite their superior artillery and training.',
            steps: [
            { text: 'Identify the British force composition on the Ridge — ~7,000 men (European, Sikh, Punjabi), depleted by cholera and.' },
            { text: 'Recognise the strategic constraint — the British could not fully encircle Delhi; the Yamuna river and rebel-held.' },
            { text: 'Analyse the reinforcement timeline — Nicholson\'s movable column (Punjab) arrived 14 August with siege train; Wilson\'s.' },
            { text: 'Evaluate the assault plan — 14 September four-column attack on Kashmir Gate, Water Gate, Kashmiri Gate, and Lahore.' },
            { text: 'Conclude — Delhi fell due to *convergence of reinforcements (Nicholson), siege artillery arrival, and rebel logistical.', faded: true, blankAnswer: 'The British took over three months because they began with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_10_008', title: 'The Revolt in the Countryside refers to.',
          scaffold: { problem: 'Using the NCERT text and the Azamgarh Proclamation (Source 5), explain why the rebels attacked telegraph lines, revenue records, and.',
            steps: [
            { text: 'Identify the function of each target in colonial governance — telegraph = military/administrative coordination; revenue.' },
            { text: 'Connect to the rebels\' stated goals in the Azamgarh Proclamation — Section I (zemindars) demands light jumas and.' },
            { text: 'Analyze the Shah Mal case — his men "dug up metalled roads" and "destroyed the bridge" to prevent government forces.' },
            { text: 'Contrast with sepoy mutiny targets (bell of arms, white officers) — the countryside added a layer: dismantling the.' },
            { text: 'Conclude that the attacks were a coherent strategy to make the countryside ungovernable by the British and to restore.', faded: true, blankAnswer: 'Rebels attacked telegraph, records, and account books.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_hist_cbse_11_003', title: 'The Non-Cooperation Movement (1920–22).',
          scaffold: { problem: 'Using the NCERT text and Source 8 (Fortnightly Reports), explain why the British government initially underestimated the Non-Cooperation.',
            steps: [
            { text: 'Identify the British perception in early 1921 — Home Department reports (Source 8 pattern) dismissed the movement as.' },
            { text: 'Contrast with actual mass actions — NCERT lists 396 strikes (600,000 workers), student boycotts, lawyer resignations,.' },
            { text: 'Analyze the shift — By late 1921, the Prince of Wales’ visit triggered massive hartals and police firing (53 dead in.' },
            { text: 'Explain the repressive turn — Mass arrests (thousands jailed, Gandhi arrested March 1922) were a response to the.' },
            { text: 'Conclude — British underestimated the *emotional and moral appeal* of Gandhi’s symbols (dhoti, charkha, Khilafat) which.', faded: true, blankAnswer: 'The British initially underestimated the movement because.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hist_cbse_10_008', title: 'Identify each idea',
          dissect: { specimen: 'Colonialism Countryside', spots: [
            { id: 's1', label: 'British repression of the 1857', prompt: 'Which idea is this? — British repression of the 1857 revolt refers to the coordinated military, legal, and.', answer: 'British repression of the 1857', options: ['British repression of the 1857', 'The Revolt in the Countryside', 'The Non-Cooperation Movement 192022 was'] },
            { id: 's2', label: 'The Revolt in the Countryside', prompt: 'Which idea is this? — The Revolt in the Countryside refers to the widespread popular uprising in rural North.', answer: 'The Revolt in the Countryside', options: ['The Revolt in the Countryside', 'British repression of the 1857', 'The Non-Cooperation Movement 192022 was'] },
            { id: 's3', label: 'The Non-Cooperation Movement 192022 was', prompt: 'Which idea is this? — The Non-Cooperation Movement (1920–22) was a nationwide mass campaign led by Mahatma.', answer: 'The Non-Cooperation Movement 192022 was', options: ['The Non-Cooperation Movement 192022 was', 'British repression of the 1857', 'The Revolt in the Countryside'] }
          ] } }
    ],
    explore: { component: C12_HistoryColonialismCountrysideSim, prompt: 'Explore the interactive — Colonialism Countryside' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_007', difficulty: 'standard',
          question: 'British repression of the 1857 revolt refers to the coordinated military,.',
          hint: 'If unsure about revolt geography or leadership, revisit c12_hist_cbse_10_002 (Spread of.',
          misconception: 'Students often think British repression was purely military — "they had better guns and won." In reality, the British.',
          parts: [
                { id: 'a', prompt: 'Why did the British choose a two-pronged attack on Delhi (from Punjab and Calcutta) rather than a single advance, and what does this reveal about their.', answer: 'The Punjab was largely peaceful and provided a secure base with Sikh and Punjabi',
                  options: ['The Punjab was largely peaceful and provided a secure base with Sikh and Punjabi', 'they attacked from all sides', 'they had better guns and won'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think British repression was purely military — "they had better guns and won." In reality, the British *almost lost Delhi*.' }
          ],
            remediations: { 'british-repression-was-purely-military': { steps: ['If the student conflates military events with political strategy: (1) Re-read NCERT pages 275–276 (Section 4.', '(2) Re-read pages 279–282 (Section 5.3–5.5) and list three visual sources showing terror *performed for British.', '(3) Re-attempt Diagnostic Questions 4 and 5, which specifically test the non-military dimensions.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_10_008', difficulty: 'standard',
          question: 'The Revolt in the Countryside refers to the widespread popular uprising in.',
          hint: 'If stuck, revisit c8_hist_ch3_8 (British revenue systems) and c12_hist_cbse_10_006 (Awadh.',
          misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic.',
          parts: [
                { id: 'a', prompt: 'What were the three main categories of British "symbols of power" attacked by rebels in the countryside, as described in the NCERT chapter?', answer: 'The three main categories were: (1) communication infrastructure',
                  options: ['The three main categories were: (1) communication infrastructure', 'only military targets', 'only religious sites'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' },
                { id: 'b', prompt: 'Compare Shah Mal\'s mobilisation in Barout (pargana Barout, UP) with Maulvi Ahmadullah Shah\'s movement in Awadh.', answer: 'Similarities: (1) Both used existing kinship/religious networks',
                  options: ['Similarities: (1) Both used existing kinship/religious networks', 'local leaders', 'peasant jacquerie'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' },
                { id: 'c', prompt: 'Analyze the Azamgarh Proclamation (Source 5) as a historical source.', answer: 'The sectional structure reveals a deliberate attempt to construct a cross-class,',
                  options: ['The sectional structure reveals a deliberate attempt to construct a cross-class,', 'just a list of complaints', 'peasant jacquerie'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the countryside revolt was a spontaneous, leaderless "peasant jacquerie" driven only by economic distress.' }
          ],
            remediations: { 'the-countryside-revolt-was-a': { steps: ['If the student holds the "spontaneous peasant jacquerie" misconception: (1) Re-read the Shah Mal case study (NCERT pp.', '263–64) and list his organisational actions: night mobilisation across 84 villages, intelligence network, "hall of.', '(2) Compare with the Azamgarh Proclamation\'s five sections — identify which social group each addresses and what.', '(3) Re-do Diagnostic Question 3 focusing on leadership methods.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_003', difficulty: 'standard',
          question: 'The Non-Cooperation Movement (1920–22) was a nationwide mass campaign led by.',
          hint: 'If stuck, re-read the “Making of the Mahatma” section in c12_hist_cbse_11_001 (South.',
          misconception: '**Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and institutions, and.',
          parts: [
                { id: 'a', prompt: 'A student reads in a police report that “the Non-Cooperation Movement had little impact in Bengal because the peasantry was busy with the harvest.” Using the.', answer: 'The police report is **partially reliable but biased**',
                  options: ['The police report is **partially reliable but biased**', 'supported'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and institutions, and that the Khilafat.' }
          ],
            remediations: { 'students-often-believe-the-non': { steps: ['If a student holds the above misconceptions: 1.', '289–291** (sections 2.1–2.2) focusing on Gandhi’s own words: “Non-cooperation was negative enough to be peaceful but.', '**Compare Source 1 (Gandhi on charkha/khadi)** with the Khilafat box on p.', '290 — note how Gandhi frames Khilafat as a *national* issue.'] } } },
        { type: 'subpart', nodeId: 'c12_hist_cbse_11_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and institutions, and.',
          parts: [
                { id: 'a', prompt: 'Construct a timeline of the Non-Cooperation Movement (1920–22) that includes **at least six dated events**, distinguishing between **Congress decisions**,.', answer: 'A strong answer will produce a timeline such as: 1',
                  options: ['A strong answer will produce a timeline such as: 1', 'supported'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Students often believe the Non-Cooperation Movement was *only* about boycotting British goods and institutions, and that the Khilafat.' }
          ],
            remediations: { 'students-often-believe-the-non': { steps: ['If a student holds the above misconceptions: 1.', '289–291** (sections 2.1–2.2) focusing on Gandhi’s own words: “Non-cooperation was negative enough to be peaceful but.', '**Compare Source 1 (Gandhi on charkha/khadi)** with the Khilafat box on p.', '290 — note how Gandhi frames Khilafat as a *national* issue.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
