import type { SimDef } from '../../engine/types';
import C12_SociologyBeliefsRitualsSuperstitionsSim from '../../../simulations/c6_12/C12_SociologyBeliefsRitualsSuperstitionsSim';

/** v3 wrapped master — C12_SociologyBeliefsRitualsSuperstitionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_sociologybeliefsritualssuperstitionssim: SimDef = {
    id: 'v3w_c12_sociologybeliefsritualssuperstitionssim',
    title: 'Beliefs Rituals Superstitions',
    subtitle: 'This node covers M.N. Srinivas\'s concept of Sanskritisation, its mechanisms (adoption of.',
    classLevel: 12, subject: 'sociology', topic: 'Sanskritisation: M.N. Srinivas\'s Concept and Its Mechanisms',
    chapters: [],
    nodeIds: ['c12_soc_cbse_09_002', 'c12_soc_cbse_09_006', 'c12_soc_cbse_05_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a village in Karnataka where a community traditionally engaged in toddy tapping decides to stop.', goal: 'Master Beliefs Rituals Superstitions.' },
    discovery: {
        question: 'Define Sanskritisation in M.N. Srinivas\'s own words, specifying the reference group and the typical direction of cultural emulation.',
        options: ['Sanskritisation is the process by', 'any lower group copies any higher group', 'lower castes copying Brahmins'],
        answer: 'Sanskritisation is the process by',
        hook: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility*.',
    },
    teaching: [
        { title: 'Sanskritisation is the process by which a.', text: 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the customs, rituals, beliefs, ideology, and lifestyle of a higher — particularly a twice-born (dwija) — caste to.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_002', title: 'Sanskritisation is the process by which.',
          scaffold: { problem: 'A sociologist studies the Kuruba (shepherd) community in southern Karnataka.',
            steps: [
            { text: 'Identify the group undergoing change — Kurubas (traditionally a pastoral, lower caste group).' },
            { text: 'Identify the reference model — they claim Kshatriya status, so the reference model is the Kshatriya (twice-born) varna,.' },
            { text: 'List mechanisms from the description: (a) dietary change (meat to vegetarianism), (b) ritual adoption (sacred thread),.' },
            { text: 'Identify the structural precondition — "acquired land" indicates economic improvement (land ownership), which Srinivas.' },
            { text: 'Verify against Srinivas\'s definition — the group is adopting customs, rituals, beliefs, and style of life of a.', faded: true, blankAnswer: 'Reference model: Kshatriya (twice-born) caste. Mechanisms:.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_09_006', title: 'Secularisation is the sociological.',
          scaffold: { problem: 'A sociologist studies the annual Rath Yatra in Puri over 30 years (1990-2020).',
            steps: [
            { text: 'Identify the classical indicator — rising attendance suggests *increased* religiosity, which would contradict.' },
            { text: 'Apply the textbook\'s Indian-specific indicators: shift in *function* from spiritual to secular.' },
            { text: 'Evaluate the *dominant logic* — if organisers\' primary decisions (route, timing, guest list, budget) are driven by.' },
            { text: 'Conclude — the festival shows *secularisation of ritual* (religious form serving secular ends) not *religious decline*.', faded: true, blankAnswer: 'Yes, the Rath Yatra has undergone secularisation because.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_soc_cbse_05_009', title: 'The **medical model of disability**.',
          scaffold: { problem: 'A rural government school has 40 students, including two with locomotor disability (use calipers/crutches).',
            steps: [
            { text: 'Identify the impairments — locomotor disability affecting mobility and balance.' },
            { text: 'Map the school environment — list every space the student must access: classroom, toilet, water point, meal area,.' },
            { text: 'For each space, note the physical barrier: toilet block has no ramp + squat toilets; meal area has 15-cm step; library.' },
            { text: 'Classify each barrier as "socially created" (yes, all are design choices, not biological necessities).' },
            { text: 'Propose low-cost modifications: (a) build a ramp to toilet block + install one Western-style commode with grab bars;.' },
            { text: 'Verify — after modifications, can the students independently use all facilities?', faded: true, blankAnswer: 'Barriers: 1) Inaccessible toilet block (no ramp, squat.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_soc_cbse_09_006', title: 'Identify each idea',
          dissect: { specimen: 'Beliefs Rituals Superstitions', spots: [
            { id: 's1', label: 'Sanskritisation is the process by', prompt: 'Which idea is this? — Sanskritisation is the process by which a lower caste, tribe, or other group adopts the.', answer: 'Sanskritisation is the process by', options: ['Sanskritisation is the process by', 'Secularisation is the sociological process', 'The medical model of disability'] },
            { id: 's2', label: 'Secularisation is the sociological process', prompt: 'Which idea is this? — Secularisation is the sociological process through which religion loses its social and.', answer: 'Secularisation is the sociological process', options: ['Secularisation is the sociological process', 'Sanskritisation is the process by', 'The medical model of disability'] },
            { id: 's3', label: 'The medical model of disability', prompt: 'Which idea is this? — The **medical model of disability** views disability as an individual\'s biological.', answer: 'The medical model of disability', options: ['The medical model of disability', 'Sanskritisation is the process by', 'Secularisation is the sociological process'] }
          ] } }
    ],
    explore: { component: C12_SociologyBeliefsRitualsSuperstitionsSim, prompt: 'Explore the interactive — Beliefs Rituals Superstitions' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_002', difficulty: 'standard',
          question: 'Sanskritisation is the process by which a lower caste, tribe, or other group.',
          hint: 'If stuck, revisit Class 11 Sociology Chapter 3 (Social Institutions) node.',
          misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility*.',
          parts: [
                { id: 'a', prompt: 'Define Sanskritisation in M.N. Srinivas\'s own words, specifying the reference group and the typical direction of cultural emulation.', answer: 'Sanskritisation is the process by',
                  options: ['Sanskritisation is the process by', 'any lower group copies any higher group', 'lower castes copying Brahmins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' },
                { id: 'b', prompt: 'In a region where a non-Sanskritic dominant caste (e.g., Lingayats in parts of Karnataka) sets the cultural tone, lower groups adopt Lingayat practices instead.', answer: 'Srinivas calls this **de-Sanskritisation**',
                  options: ['Srinivas calls this **de-Sanskritisation**', 'lower castes copying Brahmins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' },
                { id: 'c', prompt: 'Compare the mechanisms of Sanskritisation and Westernisation in terms of (a) the reference group, (b) the domain of change, and (c) the structural outcome.', answer: 'the reference group, (',
                  options: ['the reference group, (', 'modernisation', 'lower castes copying Brahmins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' }
          ],
            remediations: { 'sanskritisation-is-simply-lower-castes': { steps: ['Re-read the NCERT definition (p.', '20) and underline "twice-born (dwija) caste" and "customs, ritual, beliefs, ideology and style of life".', 'Watch the 5-min video "M.N.', 'Srinivas on Sanskritisation" (NCERT official) to hear the distinction between positional and structural change.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility*.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the statement: "Sanskritisation empowers lower castes by allowing them to rise in the hierarchy." Use the Kumud Pawade example and the.', answer: 'The statement is partially true but sociologically misleading',
                  options: ['The statement is partially true but sociologically misleading', 'empowerment', 'lower castes copying Brahmins'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Sanskritisation is simply "lower castes copying Brahmins" and that it leads to *caste mobility* (the caste itself.' }
          ],
            remediations: { 'sanskritisation-is-simply-lower-castes': { steps: ['Re-read the NCERT definition (p.', '20) and underline "twice-born (dwija) caste" and "customs, ritual, beliefs, ideology and style of life".', 'Watch the 5-min video "M.N.', 'Srinivas on Sanskritisation" (NCERT official) to hear the distinction between positional and structural change.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_09_006', difficulty: 'standard',
          question: 'Secularisation is the sociological process through which religion loses its.',
          hint: 'Revisit c11_soc_cbse_03_005 (Religion as a Social Institution) to recall the.',
          misconception: 'Students consistently confuse **secularisation** (a sociological process of religion losing authority over.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Secularisation is the sociological process through',
                  options: ['Secularisation is the sociological process through', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'The **medical model of disability** views disability as an individual\'s biological'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse **secularisation** (a sociological process of religion losing authority over non-religious spheres) with.' }
          ],
            remediations: { 'students-consistently-confuse-secularisation-a': { steps: ['If a student conflates the two concepts: (1) Have them create a two-column table: Column A = "Secularism (Political.', '(2) Assign the Activity 2.6 from the textbook (matrimonial column analysis) — this forces them to see caste.', '(3) Re-diagnostic: Ask them to explain why a lavish wedding with 50 cars is an example of *secularisation of ritual* —.'] } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_009', difficulty: 'standard',
          question: 'The **medical model of disability** views disability as an individual\'s.',
          hint: 'Revisit c12_soc_cbse_05_003 (Social Exclusion: Definition, Attributes and the C) and.',
          misconception: 'Students often think the social model **denies the reality of impairment** or **rejects medical treatment**.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The **medical model of disability** views disability as an individual\'s biological',
                  options: ['The **medical model of disability** views disability as an individual\'s biological', 'Sanskritisation is the process by which a lower caste, tribe, or other group adopts the', 'Secularisation is the sociological process through'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the social model **denies the reality of impairment** or **rejects medical treatment**.' }
          ],
            remediations: { 'the-social-model-denies-the': { steps: ['If a student conflates impairment and disability or thinks the social model rejects medicine: (1) Have them re-read the.', '(4) Re-diagnostic: Give a new scenario (e.g., a dyslexic student denied extra exam time) and ask the student to label.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
