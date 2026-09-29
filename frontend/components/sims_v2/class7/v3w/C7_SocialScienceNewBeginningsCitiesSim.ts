import type { SimDef } from '../../engine/types';
import C7_SocialScienceNewBeginningsCitiesSim from '../../../simulations/c6_12/C7_SocialScienceNewBeginningsCitiesSim';

/** v3 wrapped master — C7_SocialScienceNewBeginningsCitiesSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_socialsciencenewbeginningscitiessim: SimDef = {
    id: 'v3w_c7_socialsciencenewbeginningscitiessim',
    title: 'Second Urbanisation of India: Context and Meaning',
    subtitle: 'Covers the socio-economic and technological context marking the beginning of the Second.',
    classLevel: 7, subject: 'science', topic: 'Second Urbanisation of India: Context and Meaning',
    chapters: [],
    nodeIds: ['c7_hist_ch01_001', 'c7_hist_ch01_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Have you ever wondered why some towns grow rapidly while others remain small villages, like when a new.', goal: 'Master Second Urbanisation of India: Context and Meaning.' },
    discovery: {
        question: 'What major metal technology became widespread around the 6th century BCE and helped clear the dense forests of the Gangetic plains?',
        options: ['Iron was the metal technology that became widespread during this period', 'Bronze', 'Copper'],
        answer: 'Iron was the metal technology that became widespread during this period',
        hook: 'Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation, assuming that.',
    },
    teaching: [
        { title: 'The Second Urbanisation refers to the.', text: 'The Second Urbanisation refers to the historical period around the 6th century BCE in ancient India when towns and cities re-emerged across the Gangetic plains, driven by surplus agricultural.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_hist_ch01_001', title: 'The Second Urbanisation refers to the.',
          scaffold: { problem: 'Analyze how the shift from copper-stone tools to iron tools triggered economic changes that made the Second Urbanisation possible in the.',
            steps: [
            { text: 'Identify the limitations of copper and stone tools, which were too soft or brittle to clear the thick, sticky alluvial.' },
            { text: 'Examine the technological advantage of iron, which was harder, more durable, and capable of being forged into heavy.' },
            { text: 'Trace the consequence of iron adoption: forests were cleared for agriculture, and tough soil was tilled effectively,.' },
            { text: 'Connect the agricultural surplus to urban growth: surplus grain freed non-farming specialists (such as metalworkers,.', faded: true, blankAnswer: 'Iron tools enabled deep ploughing and forest clearance in.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_008', title: 'This topic explores the strategic.',
          scaffold: { problem: 'Analyze why King Bimbisara and early Magadhan rulers chose Rajgir (Rajagriha) as their capital, keeping in mind the political climate of.',
            steps: [
            { text: 'Identify the historical context of the Mahajanapada period as an era of intense regional conflict and state rivalry.' },
            { text: 'Examine the physical topography of Rajgir, noting that it was nestled inside a natural valley completely encircled by.' },
            { text: 'Evaluate the defensive advantages of this terrain, recognizing that it acted as a natural fortress making surprise.' },
            { text: 'Consider the resource access of the region, noting its proximity to rich iron ore deposits in the Chota Nagpur plateau.' },
            { text: 'Synthesize these factors to conclude that Rajgir was chosen primarily as a secure military stronghold to protect the.', faded: true, blankAnswer: 'Rajgir was chosen as Magadha\'s early capital because its.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_hist_ch01_008', title: 'Identify each idea',
          dissect: { specimen: 'Second Urbanisation of India: Context and Meaning', spots: [
            { id: 's1', label: 'The Second Urbanisation refers to', prompt: 'Which idea is this? — The Second Urbanisation refers to the historical period around the 6th century BCE in.', answer: 'The Second Urbanisation refers to', options: ['The Second Urbanisation refers to', 'This topic explores the strategic'] },
            { id: 's2', label: 'This topic explores the strategic', prompt: 'Which idea is this? — This topic explores the strategic shifting of administrative capitals among the ancient.', answer: 'This topic explores the strategic', options: ['This topic explores the strategic', 'The Second Urbanisation refers to'] }
          ] } }
    ],
    explore: { component: C7_SocialScienceNewBeginningsCitiesSim, prompt: 'Explore the interactive — Second Urbanisation of India: Context and Meaning' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_hist_ch01_001', difficulty: 'standard',
          question: 'The Second Urbanisation refers to the historical period around the 6th century.',
          hint: 'Review the Harappan town planning and decline topics from Class 6 to remind yourself that.',
          misconception: 'Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation, assuming that.',
          parts: [
                { id: 'a', prompt: 'What major metal technology became widespread around the 6th century BCE and helped clear the dense forests of the Gangetic plains?', answer: 'Iron was the metal technology that became widespread during this period',
                  options: ['Iron was the metal technology that became widespread during this period', 'Bronze', 'Copper'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation, assuming that cities in ancient India.' }
          ],
            remediations: { 'students-often-confuse-the-first': { steps: ['To fix this misconception, compare two maps side by side: one showing Harappan sites concentrated in the Indus river.', 'Highlight the time gap of over a thousand years and the shift in geographical location from the Indus to the Ganga.', 'Emphasize that cities disappeared after the Harappan collapse before a completely new wave of towns emerged in a.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
