import type { SimDef } from '../../engine/types';
import C11_HistoryEventsFrom1932Sim from '../../../simulations/c6_12/C11_HistoryEventsFrom1932Sim';

/** v3 wrapped master — C11_HistoryEventsFrom1932Sim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_historyeventsfrom1932sim: SimDef = {
    id: 'v3w_c11_historyeventsfrom1932sim',
    title: 'The Life of the Prophet Muhammad and the Founding of Islam',
    subtitle: 'This node covers the Prophet\'s biography as a historical agent (570–632 CE), the.',
    classLevel: 11, subject: 'history', topic: 'The Life of the Prophet Muhammad and the Founding of Islam',
    chapters: [],
    nodeIds: ['c11_hist_cbse_04_002'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are visiting the Qutb Minar complex in Delhi and notice the Iron Pillar and the Quwwat-ul-Islam.', goal: 'Master The Life of the Prophet Muhammad and the Founding of Islam.' },
    discovery: {
        question: 'The Prophet Muhammad\'s early preaching in Mecca (610–622 CE) focused on Tawhid (monotheism) and social justice.',
        options: ['The Quraysh elite opposed the Prophet', 'religious intolerance', 'polytheism vs monotheism'],
        answer: 'The Quraysh elite opposed the Prophet',
        hook: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the.',
    },
    teaching: [
        { title: 'The Life of the Prophet Muhammad and the.', text: 'The Life of the Prophet Muhammad and the Founding of Islam refers to the historical period (c.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_hist_cbse_04_002', title: 'The Life of the Prophet Muhammad and.',
          scaffold: { problem: 'Using the concept of "dual authority" (spiritual + political), explain how the Prophet Muhammad\'s role in Medina (622–632 CE) differed from.',
            steps: [
            { text: 'Define the tribal shaykh\'s authority — based on *asabiyya* (kinship), consensus of elders, limited to arbitration, no.' },
            { text: 'Define the Byzantine emperor\'s authority — centralized bureaucracy, professional army, codified law (Justinian Code),.' },
            { text: 'Identify the Prophet\'s authority in Medina — derived from *revelation* (spiritual), accepted voluntarily by *bay\'ah*.' },
            { text: 'Analyze the Constitution of Medina as the *legal instrument* — it names the Prophet "the apostle of God" (spiritual.' },
            { text: 'Contrast succession — tribal shaykh succeeds by kinship/consensus; emperor by dynasty/army; Prophet left *no designated.' },
            { text: 'Synthesize — the Prophet created a *third model*: a charismatic founder who institutionalized his authority in a.', faded: true, blankAnswer: 'The Prophet in Medina was neither a tribal shaykh.' }
            ] } }
    ],
    explore: { component: C11_HistoryEventsFrom1932Sim, prompt: 'Explore the interactive — The Life of the Prophet Muhammad and the Founding of Islam' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_002', difficulty: 'standard',
          question: 'The Life of the Prophet Muhammad and the Founding of Islam refers to the.',
          hint: 'If stuck, revisit c11_hist_cbse_04_001 and map the *contradictions* in pre-Islamic Mecca:.',
          misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the.',
          parts: [
                { id: 'a', prompt: 'In which year did the Hijra (migration of the Prophet and his followers from Mecca to Medina) occur, and why does this date mark the beginning of the Islamic.', answer: 'The Hijra occurred in 622 CE',
                  options: ['The Hijra occurred in 622 CE', 'by the sword'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the sword" in Arabia.' },
                { id: 'b', prompt: 'The Prophet Muhammad\'s early preaching in Mecca (610–622 CE) focused on Tawhid (monotheism) and social justice.', answer: 'The Quraysh elite opposed the Prophet',
                  options: ['The Quraysh elite opposed the Prophet', 'religious intolerance', 'polytheism vs monotheism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the sword" in Arabia.' }
          ],
            remediations: { 'the-prophet-s-success-was': { steps: ['Re-read c11_hist_cbse_04_001 (Arabia Before Islam) to reconstruct the *tribal balance of power* — the Prophet navigated.', 'Create a two-column table: "Meccan Period (610–622)" vs "Medinan Period (622–632)" — list events in each and label.', 'Compare the Constitution of Medina (c11_hist_cbse_04_002) with the later *Caliphate\'s* governance.', 'Ask: "If Islam spread by the sword in the Prophet\'s time, why did he grant amnesty to his fiercest Meccan enemies (Abu.'] } } },
        { type: 'subpart', nodeId: 'c11_hist_cbse_04_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the.',
          parts: [
                { id: 'a', prompt: 'Evaluate the Treaty of Hudaybiyyah (628 CE) as a diplomatic masterstroke.', answer: 'Companions saw Hudaybiyyah as humiliation',
                  options: ['Companions saw Hudaybiyyah as humiliation', 'by the sword'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the sword" in Arabia.' },
                { id: 'b', prompt: 'Construct a timeline of the Prophet\'s life (570–632 CE) with 8 key events.', answer: 'Timeline: 570 Birth (social',
                  options: ['Timeline: 570 Birth (social', 'by the sword'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Prophet\'s success was due *primarily* to military conquest or that Islam spread "by the sword" in Arabia.' }
          ],
            remediations: { 'the-prophet-s-success-was': { steps: ['Re-read c11_hist_cbse_04_001 (Arabia Before Islam) to reconstruct the *tribal balance of power* — the Prophet navigated.', 'Create a two-column table: "Meccan Period (610–622)" vs "Medinan Period (622–632)" — list events in each and label.', 'Compare the Constitution of Medina (c11_hist_cbse_04_002) with the later *Caliphate\'s* governance.', 'Ask: "If Islam spread by the sword in the Prophet\'s time, why did he grant amnesty to his fiercest Meccan enemies (Abu.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
