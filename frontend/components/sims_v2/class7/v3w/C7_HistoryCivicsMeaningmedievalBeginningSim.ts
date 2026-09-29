import type { SimDef } from '../../engine/types';
import C7_HistoryCivicsMeaningmedievalBeginningSim from '../../../simulations/c6_12/C7_HistoryCivicsMeaningmedievalBeginningSim';

/** v3 wrapped master — C7_HistoryCivicsMeaningmedievalBeginningSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_historycivicsmeaningmedievalbeginningsim: SimDef = {
    id: 'v3w_c7_historycivicsmeaningmedievalbeginningsim',
    title: 'Janapadas: Early Kingdoms and Their Formation',
    subtitle: 'Covers the socio-political transition, land settlement patterns, and early political.',
    classLevel: 7, subject: 'history', topic: 'Janapadas: Early Kingdoms and Their Formation',
    chapters: [],
    nodeIds: ['c7_hist_ch01_002', 'c7_hist_ch01_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine visiting an old village where generations of your family have farmed the exact same plots of land,.', goal: 'Master Janapadas: Early Kingdoms and Their Formation.' },
    discovery: {
        question: 'What major metal technology became widespread around the 6th century BCE and helped clear the dense forests of the Gangetic plains?',
        options: ['Iron was the metal technology that became widespread during this period', 'Bronze', 'Copper'],
        answer: 'Iron was the metal technology that became widespread during this period',
        hook: 'Students often confuse the First Urbanisation (Harappan Civilisation) with the Second Urbanisation, assuming that.',
    },
    teaching: [
        { title: 'Janapadas were early territorial states that.', text: 'Janapadas were early territorial states that emerged in the Indian subcontinent around the 6th century BCE, representing a major shift from tribal nomadic life to settled, land-based kingdoms ruled.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_hist_ch01_002', title: 'Janapadas were early territorial states.',
          scaffold: { problem: 'Analyze how the adoption of iron tools transformed a pastoral tribe (*jana*) into a settled agricultural kingdom (*janapada*).',
            steps: [
            { text: 'Identify the primary economic activity of early Vedic tribes (pastoralism, cattle rearing, and shifting cultivation.' },
            { text: 'Introduce the historical introduction of iron metallurgy around 1000–600 BCE in northern India.' },
            { text: 'Analyze the functional impact of iron (heavy iron axes cleared dense Gangetic forests; iron-tipped ploughshares cut.' },
            { text: 'Trace the resulting economic outcome (higher crop yields led to agricultural surplus, allowing people to stop moving.' },
            { text: 'Synthesize the political outcome (fixed land plots created territorial boundaries, leading to the formation of.', faded: true, blankAnswer: 'Iron tools enabled deep agriculture and forest clearing,.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_hist_ch01_001', title: 'The Second Urbanisation refers to the.',
          scaffold: { problem: 'Analyze how the shift from copper-stone tools to iron tools triggered economic changes that made the Second Urbanisation possible in the.',
            steps: [
            { text: 'Identify the limitations of copper and stone tools, which were too soft or brittle to clear the thick, sticky alluvial.' },
            { text: 'Examine the technological advantage of iron, which was harder, more durable, and capable of being forged into heavy.' },
            { text: 'Trace the consequence of iron adoption: forests were cleared for agriculture, and tough soil was tilled effectively,.' },
            { text: 'Connect the agricultural surplus to urban growth: surplus grain freed non-farming specialists (such as metalworkers,.', faded: true, blankAnswer: 'Iron tools enabled deep ploughing and forest clearance in.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_hist_ch01_001', title: 'Identify each idea',
          dissect: { specimen: 'Janapadas: Early Kingdoms and Their Formation', spots: [
            { id: 's1', label: 'Janapadas were early territorial states', prompt: 'Which idea is this? — Janapadas were early territorial states that emerged in the Indian subcontinent around.', answer: 'Janapadas were early territorial states', options: ['Janapadas were early territorial states', 'The Second Urbanisation refers to'] },
            { id: 's2', label: 'The Second Urbanisation refers to', prompt: 'Which idea is this? — The Second Urbanisation refers to the historical period around the 6th century BCE in.', answer: 'The Second Urbanisation refers to', options: ['The Second Urbanisation refers to', 'Janapadas were early territorial states'] }
          ] } }
    ],
    explore: { component: C7_HistoryCivicsMeaningmedievalBeginningSim, prompt: 'Explore the interactive — Janapadas: Early Kingdoms and Their Formation' },
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
