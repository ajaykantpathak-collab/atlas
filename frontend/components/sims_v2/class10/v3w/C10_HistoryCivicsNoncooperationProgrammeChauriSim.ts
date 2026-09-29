import type { SimDef } from '../../engine/types';
import C10_HistoryCivicsNoncooperationProgrammeChauriSim from '../../../simulations/c6_12/C10_HistoryCivicsNoncooperationProgrammeChauriSim';

/** v3 wrapped master — C10_HistoryCivicsNoncooperationProgrammeChauriSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c10_historycivicsnoncooperationprogrammechaurisim: SimDef = {
    id: 'v3w_c10_historycivicsnoncooperationprogrammechaurisim',
    title: 'Non-Cooperation Movement: In Towns and Countryside',
    subtitle: 'Covers the Non-Cooperation Movement\'s urban phase (boycott of schools, courts, councils,.',
    classLevel: 10, subject: 'history', topic: 'Non-Cooperation Movement: In Towns and Countryside',
    chapters: [],
    nodeIds: ['c10_hist_cbse_02_004', 'c10_hist_cbse_02_005'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 10 learner', intro: 'Imagine you\'re visiting your grandmother\'s village in Uttar Pradesh and she shows you an old land record from.', goal: 'Master Non-Cooperation Movement: In Towns and Countryside.' },
    discovery: {
        question: 'A student reads that "tribal peasants in the Gudem Hills of Andhra Pradesh attacked police stations and attempted to kill British officials during the.',
        options: ['The conclusion is historically inaccurate', 'Gandhi = non-violence', 'uniformly non-violent'],
        answer: 'The conclusion is historically inaccurate',
        hook: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.',
    },
    teaching: [
        { title: 'The Non-Cooperation Movement (1920-1922) was.', text: 'The Non-Cooperation Movement (1920-1922) was Gandhi\'s first nationwide mass movement against British rule, launched at the Calcutta Session of Congress (September 1920) and ratified at Nagpur.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c10_hist_cbse_02_004', title: 'The Non-Cooperation Movement.',
          scaffold: { problem: 'Explain why the Non-Cooperation Movement took a violent turn in the Gudem Hills of Andhra Pradesh despite Gandhi\'s strict non-violence,.',
            steps: [
            { text: 'Identify the specific colonial policy — the Madras Forest Act (1882) and subsequent reservations — that closed Gudem.' },
            { text: 'Establish the tribal economy\'s dependence on these forests for survival (food, fuel, medicine, agriculture) — unlike.' },
            { text: 'Analyze Alluri Sitarama Raju\'s leadership — he wore khadi, quoted Gandhi, but organized guerrilla squads because the.' },
            { text: 'Contrast state capacity — British had fortified police stations, telegraph lines, and military access in Gudem; urban.' },
            { text: 'Conclude — violence emerged not from ideological rejection of Gandhi but from *structural compulsion*: the colonial.', faded: true, blankAnswer: 'The Gudem Hills revolt turned violent because the Madras.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_hist_cbse_02_005', title: 'The Non-Cooperation Movement\'s.',
          scaffold: { problem: 'Explain why tea plantation workers in Assam participated in the Non-Cooperation Movement, using the concept of "subaltern consciousness" to.',
            steps: [
            { text: 'Identify the colonial law controlling plantation workers — Inland Emigration Act of 1859 — which legally bound workers.' },
            { text: 'Establish the workers\' material condition — recruited from tribal/poor regions of Bihar, UP, Central Provinces; lived.' },
            { text: 'Trace how NCM propaganda reached them — rumors spread that "Gandhi Raj" had come, "Gandhi Mahatma" would redress.' },
            { text: 'Contrast with Congress definition — Congress (Nagpur Session 1920) defined Swaraj as self-government within Empire.' },
            { text: 'Analyze the gap — workers acted on their interpretation (spontaneous exodus), not Congress instructions; this reveals.' },
            { text: 'Evaluate significance — shows nationalist movement was not monolithic; same slogan mobilized different groups for.', faded: true, blankAnswer: 'Plantation workers in Assam joined NCM because they.' }
            ] } },
        { type: 'dissect', nodeId: 'c10_hist_cbse_02_005', title: 'Identify each idea',
          dissect: { specimen: 'Non-Cooperation Movement: In Towns and Countryside', spots: [
            { id: 's1', label: 'The Non-Cooperation Movement 1920-1922 was', prompt: 'Which idea is this? — The Non-Cooperation Movement (1920-1922) was Gandhi\'s first nationwide mass movement.', answer: 'The Non-Cooperation Movement 1920-1922 was', options: ['The Non-Cooperation Movement 1920-1922 was', 'The Non-Cooperation Movements plantation phase'] },
            { id: 's2', label: 'The Non-Cooperation Movements plantation phase', prompt: 'Which idea is this? — The Non-Cooperation Movement\'s plantation phase (1921-22) refers to the spontaneous.', answer: 'The Non-Cooperation Movements plantation phase', options: ['The Non-Cooperation Movements plantation phase', 'The Non-Cooperation Movement 1920-1922 was'] }
          ] } }
    ],
    explore: { component: C10_HistoryCivicsNoncooperationProgrammeChauriSim, prompt: 'Explore the interactive — Non-Cooperation Movement: In Towns and Countryside' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_004', difficulty: 'standard',
          question: 'The Non-Cooperation Movement (1920-1922) was Gandhi\'s first nationwide mass.',
          hint: 'If stuck, revisit c10_hist_cbse_02_003 (Rowlatt Act/Jallianwala Bagh/Khilafat) and.',
          misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.',
          parts: [
                { id: 'a', prompt: 'A student reads that "tribal peasants in the Gudem Hills of Andhra Pradesh attacked police stations and attempted to kill British officials during the.', answer: 'The conclusion is historically inaccurate',
                  options: ['The conclusion is historically inaccurate', 'Gandhi = non-violence', 'uniformly non-violent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.' },
                { id: 'b', prompt: 'Compare the role of students and lawyers in the urban Non-Cooperation Movement with the role of plantation workers in Assam.', answer: 'Urban students and lawyers (e.g., C.R',
                  options: ['Urban students and lawyers (e.g., C.R', 'both participated', 'uniformly non-violent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.' }
          ],
            remediations: { 'the-non-cooperation-movement-was': { steps: ['Re-read the NCERT textbox "Differing Strands within the Movement" (Chapter 3, pages 54-56) — highlight three verbs:.', 'Create a three-column table: Region | Local Leader | Form of Protest | Gandhi\'s Stance.', 'Watch the 5-minute clip "Non-Cooperation in the Countryside" (NCERT official YouTube) — pause at each region and note.', 'Write a 50-word answer: "Why did Gandhi\'s non-violence not bind every participant?" — use the words "material.'] } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.',
          parts: [
                { id: 'a', prompt: '" The Non-Cooperation Movement failed because it was withdrawn after Chauri Chaura." Critique this statement by evaluating the movement\'s achievements *before*.', answer: 'The statement is reductionist',
                  options: ['The statement is reductionist', 'Chauri Chaura caused failure', 'assess/evaluate', 'uniformly non-violent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.' },
                { id: 'b', prompt: 'Compare the role of students and lawyers in the urban Non-Cooperation Movement with the role of plantation workers in Assam.', answer: 'Urban students and lawyers (e.g., C.R',
                  options: ['Urban students and lawyers (e.g., C.R', 'both participated', 'uniformly non-violent', 'led entirely by Gandhi'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe the Non-Cooperation Movement was "uniformly non-violent" and "led entirely by Gandhi" everywhere.' }
          ],
            remediations: { 'the-non-cooperation-movement-was': { steps: ['Re-read the NCERT textbox "Differing Strands within the Movement" (Chapter 3, pages 54-56) — highlight three verbs:.', 'Create a three-column table: Region | Local Leader | Form of Protest | Gandhi\'s Stance.', 'Watch the 5-minute clip "Non-Cooperation in the Countryside" (NCERT official YouTube) — pause at each region and note.', 'Write a 50-word answer: "Why did Gandhi\'s non-violence not bind every participant?" — use the words "material.'] } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_005', difficulty: 'standard',
          question: 'The Non-Cooperation Movement\'s plantation phase (1921-22) refers to the.',
          hint: 'If stuck, revisit c10_hist_cbse_02_002 (Satyagraha principles) and c10_hist_cbse_02_004.',
          misconception: 'Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly called them to.',
          parts: [
                { id: 'a', prompt: 'A railway strike and steamer strike occurred just as thousands of plantation workers were leaving Assam.', answer: 'The strikes stranded workers mid-journey with no transport, food, or shelter',
                  options: ['The strikes stranded workers mid-journey with no transport, food, or shelter', 'strikes helped workers by stopping British transport', 'Gandhi asked plantation workers to strike'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly called them to strike, and that Gandhi.' }
          ],
            remediations: { 'plantation-workers-joined-the-non': { steps: ['Re-read the Assam plantation workers\' section in NCERT — highlight phrases "they believed Gandhi Mahatma had come to.', 'Create a two-column table: Column A — "What Congress meant by Swaraj"; Column B — "What plantation workers understood.', 'Watch a 5-minute video on Chauri Chaura (search "Chauri Chaura 1922 Gandhi withdrawal") and note Gandhi\'s exact words:.', 'Write a 50-word answer: "Why did Gandhi withdraw a successful movement?" — forces articulation of voluntary moral.'] } } },
        { type: 'subpart', nodeId: 'c10_hist_cbse_02_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly called them to.',
          parts: [
                { id: 'a', prompt: 'Construct a timeline with 6 entries showing the sequence from the Inland Emigration Act (1859) to the withdrawal of Non-Cooperation Movement (February 1922),.', answer: '1859: Inland Emigration Act',
                  options: ['1859: Inland Emigration Act', 'Gandhi asked plantation workers to strike'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students believe plantation workers joined the Non-Cooperation Movement because Gandhi explicitly called them to strike, and that Gandhi.' }
          ],
            remediations: { 'plantation-workers-joined-the-non': { steps: ['Re-read the Assam plantation workers\' section in NCERT — highlight phrases "they believed Gandhi Mahatma had come to.', 'Create a two-column table: Column A — "What Congress meant by Swaraj"; Column B — "What plantation workers understood.', 'Watch a 5-minute video on Chauri Chaura (search "Chauri Chaura 1922 Gandhi withdrawal") and note Gandhi\'s exact words:.', 'Write a 50-word answer: "Why did Gandhi withdraw a successful movement?" — forces articulation of voluntary moral.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
