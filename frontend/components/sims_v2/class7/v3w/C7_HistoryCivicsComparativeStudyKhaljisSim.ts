import type { SimDef } from '../../engine/types';
import C7_HistoryCivicsComparativeStudyKhaljisSim from '../../../simulations/c6_12/C7_HistoryCivicsComparativeStudyKhaljisSim';

/** v3 wrapped master — C7_HistoryCivicsComparativeStudyKhaljisSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_historycivicscomparativestudykhaljissim: SimDef = {
    id: 'v3w_c7_historycivicscomparativestudykhaljissim',
    title: 'Influence of Civilisational Heritage on the Constitution',
    subtitle: 'Covers the philosophical, ethical, and historical roots of the Constitution derived from.',
    classLevel: 7, subject: 'history', topic: 'Influence of Civilisational Heritage on the Constitution',
    chapters: [],
    nodeIds: ['c7_civ_ch02_006', 'c7_civ_ch02_007'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine walking through an ancient stone temple or reading a classical text that speaks of universal harmony,.', goal: 'Master Influence of Civilisational Heritage on the Constitution.' },
    discovery: {
        question: 'What is the term used to describe a system of government where power is divided between a central government and regional (state) governments?',
        options: ['The correct answer is federalism (or a federal system)', 'unitary system', 'monarchy'],
        answer: 'The correct answer is federalism (or a federal system)',
        hook: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants,.',
    },
    teaching: [
        { title: 'The influence of civilisational heritage on.', text: 'The influence of civilisational heritage on the Indian Constitution refers to how ancient Indian philosophical traditions, cultural values of pluralism, ethics of non-violence, and historical.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_civ_ch02_006', title: 'The influence of civilisational.',
          scaffold: { problem: 'Analyze how the constitutional value of secularism (*Sarva Dharma Sambhava* - equal respect for all religions) connects to India\'s.',
            steps: [
            { text: 'Identify the constitutional provision of secularism where the state treats all religions equally without having an.' },
            { text: 'Examine historical Indian traditions of multiple faiths (Buddhism, Jainism, Hinduism, Islam, Christianity, Sikhism).' },
            { text: 'Connect the ancient ethos of religious tolerance and pluralism (*Sarva Dharma Sambhava*) to the modern legal framework.' },
            { text: 'Evaluate why the framers chose an inclusive Indian model of secularism rather than a strict separation model found in.' },
            { text: 'Conclude that Indian secularism is deeply rooted in our civilisational history of accommodating diverse spiritual paths.', faded: true, blankAnswer: 'Indian secularism is rooted in the civilisational tradition.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_civ_ch02_007', title: 'The key features of the Constitution of.',
          scaffold: { problem: 'The national parliament passes a law regarding national defense.',
            steps: [
            { text: 'Identify the level of government and subject matter involved (national defence is a matter of national security and.' },
            { text: 'Recall the constitutional distribution of powers, specifically the Union List, State List, and Concurrent List.' },
            { text: 'Apply the federal principle: subjects affecting the entire nation (like defence and foreign affairs) fall under the.' },
            { text: 'Analyze the roles of state and local bodies: neither state governments nor local panchayats possess the constitutional.' },
            { text: 'Conclude that the central government holds exclusive authority over this subject, ensuring uniformity and national.', faded: true, blankAnswer: 'The national government holds exclusive authority over.' }
            ] } },
        { type: 'dissect', nodeId: 'c7_civ_ch02_007', title: 'Identify each idea',
          dissect: { specimen: 'Influence of Civilisational Heritage on the Constitution', spots: [
            { id: 's1', label: 'The influence of civilisational heritage', prompt: 'Which idea is this? — The influence of civilisational heritage on the Indian Constitution refers to how ancient.', answer: 'The influence of civilisational heritage', options: ['The influence of civilisational heritage', 'The key features of the'] },
            { id: 's2', label: 'The key features of the', prompt: 'Which idea is this? — The key features of the Constitution of India refer to its fundamental design.', answer: 'The key features of the', options: ['The key features of the', 'The influence of civilisational heritage'] }
          ] } }
    ],
    explore: { component: C7_HistoryCivicsComparativeStudyKhaljisSim, prompt: 'Explore the interactive — Influence of Civilisational Heritage on the Constitution' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch02_007', difficulty: 'standard',
          question: 'The key features of the Constitution of India refer to its fundamental design.',
          hint: 'Review the basic definitions of legislature, executive, and judiciary, along with the.',
          misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants,.',
          parts: [
                { id: 'a', prompt: 'What is the term used to describe a system of government where power is divided between a central government and regional (state) governments?', answer: 'The correct answer is federalism (or a federal system)',
                  options: ['The correct answer is federalism (or a federal system)', 'unitary system', 'monarchy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' },
                { id: 'b', prompt: 'Analyze the relationship between the Legislature and the Executive in India\'s parliamentary system. How does this differ from a presidential system?', answer: 'In India\'s parliamentary system, the executive (Ministers) is drawn from and is',
                  options: ['In India\'s parliamentary system, the executive (Ministers) is drawn from and is', 'federalism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' }
          ],
            remediations: { 'federalism-means-the-central-government': { steps: ['To fix this misconception, review the three legislative lists in the Constitution (Union, State, and Concurrent Lists).', 'Show students that state governments make laws for their own regions independently, proving that power is.'] } } },
        { type: 'subpart', nodeId: 'c7_civ_ch02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants,.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Secularism in the Indian Constitution means that the government promotes one official state religion." Is this statement accurate?', answer: 'The statement is false',
                  options: ['The statement is false', 'federalism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' },
                { id: 'b', prompt: 'Analyze the relationship between the Legislature and the Executive in India\'s parliamentary system. How does this differ from a presidential system?', answer: 'In India\'s parliamentary system, the executive (Ministers) is drawn from and is',
                  options: ['In India\'s parliamentary system, the executive (Ministers) is drawn from and is', 'federalism'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "federalism" means the central government can abolish state governments whenever it wants, treating states merely.' }
          ],
            remediations: { 'federalism-means-the-central-government': { steps: ['To fix this misconception, review the three legislative lists in the Constitution (Union, State, and Concurrent Lists).', 'Show students that state governments make laws for their own regions independently, proving that power is.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
