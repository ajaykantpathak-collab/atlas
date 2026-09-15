import type { SimDef } from '../../engine/types';
import C6_SocialScienceGrassrootsDemocracySim from '../../../simulations/c6_12/C6_SocialScienceGrassrootsDemocracySim';

/** v3 wrapped master — C6_SocialScienceGrassrootsDemocracySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_socialsciencegrassrootsdemocracysim: SimDef = {
    id: 'v3w_c6_socialsciencegrassrootsdemocracysim',
    title: 'Social Science Grassroots Democracy',
    subtitle: 'This node covers the fundamental concept of local self-governance and the role of.',
    classLevel: 6, subject: 'science', topic: 'What is Grassroots Democracy?',
    chapters: [],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_018'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine your school playground has a broken fence that makes it unsafe for students to play.', goal: 'Master Social Science Grassroots Democracy.' },
    discovery: {
        question: 'Why is it better for a village to decide on fixing a local road rather than waiting for the national government?',
        options: ['Local villagers know exactly', 'Grassroots Democracy', '"Grassroots Democracy" is just about voting for leaders once every five years'],
        answer: 'Local villagers know exactly',
        hook: 'Students often think that "Grassroots Democracy" is just about voting for leaders once every five years.',
    },
    teaching: [
        { title: 'Grassroots democracy is a system where.', text: 'Grassroots democracy is a system where governance happens at the local level, allowing ordinary citizens to directly participate in making decisions about their own daily needs like water, roads, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c6_civics_ch12_015', title: 'Grassroots democracy is a system where.',
          scaffold: { problem: 'A village has a polluted pond that is used for washing clothes. How does the Gram Panchayat handle this?',
            steps: [
            { text: 'Identify the problem (polluted water source).' },
            { text: 'Raise the issue in the Gram Sabha meeting so all villagers are aware.' },
            { text: 'The Gram Panchayat discusses the issue and allocates funds/plans for cleaning the pond.' },
            { text: 'The Panchayat Secretary records the decision and oversees the cleanup.', faded: true, blankAnswer: 'The community voices the concern in the Sabha, and the.' }
            ] } },
        { type: 'case', nodeId: 'c6_civics_ch12_018', title: 'The functions of local government are.',
          caseStudy: { intro: 'Imagine you wake up and find the village hand pump is broken and the main road is blocked by mud after a heavy rain—who fixes it?',
            decisions: [{ prompt: 'What is one primary function of a Gram Panchayat regarding village infrastructure? (Recall)', options: [
                { text: 'The Gram Panchayat maintains village roads and drains', outcome: 'The Gram Panchayat maintains village roads and drains. A student who mentions "laws for the whole.' },
                { text: 'laws for the whole country', outcome: 'Not quite — Students often think the Sarpanch "owns" the village and decides everything alone.', reveals: 'the-sarpanch-owns-the-village' },
                { text: 'the Sarpanch "owns" the village and decides everything alone', outcome: 'Not quite — Students often think the Sarpanch "owns" the village and decides everything alone.', reveals: 'the-sarpanch-owns-the-village' }
            ] }] } }
    ],
    explore: { component: C6_SocialScienceGrassrootsDemocracySim, prompt: 'Explore the interactive — Social Science Grassroots Democracy' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch12_015', difficulty: 'standard',
          question: 'Grassroots democracy is a system where governance happens at the local level,.',
          hint: 'Review the concept of "Representative Democracy" (voting for people to represent you).',
          misconception: 'Students often think that "Grassroots Democracy" is just about voting for leaders once every five years.',
          parts: [
                { id: 'a', prompt: 'Why is it better for a village to decide on fixing a local road rather than waiting for the national government?', answer: 'Local villagers know exactly',
                  options: ['Local villagers know exactly', 'Grassroots Democracy', '"Grassroots Democracy" is just about voting for leaders once every five years'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that "Grassroots Democracy" is just about voting for leaders once every five years.' }
          ],
            remediations: { 'grassroots-democracy-is-just-about': { steps: ['First, ask the student to define "participation" vs "voting." Explain that voting is a one-time event, while.', 'Use the example of a school student council: you don\'t just vote for members once; you also tell them what you need for.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_018', difficulty: 'standard',
          question: 'The functions of local government are the specific tasks performed by elected.',
          hint: 'Review the section on the Gram Sabha in the textbook.',
          misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.',
          parts: [
                { id: 'a', prompt: 'What is one primary function of a Gram Panchayat regarding village infrastructure? (Recall)', answer: 'The Gram Panchayat maintains village roads and drains',
                  options: ['The Gram Panchayat maintains village roads and drains', 'laws for the whole country', 'the Sarpanch "owns" the village and decides everything alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.' },
                { id: 'b', prompt: 'If a village wants to start a new sanitation campaign to keep the streets clean, which local body is responsible for implementing it? (Apply)', answer: 'The Gram Panchayat is responsible',
                  options: ['The Gram Panchayat is responsible', 'the Sarpanch "owns" the village and decides everything alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.' }
          ],
            remediations: { 'the-sarpanch-owns-the-village': { steps: ['Remind the student that the Sarpanch is an "elected representative," not a ruler.', 'Ask them: "Who gives the Sarpanch their power?" and "What happens in a Gram Sabha meeting?" to reinforce that the.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_018', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.',
          parts: [
                { id: 'a', prompt: 'Is it fair to expect the Gram Panchayat to solve every single problem in a village, such as a major highway construction? Why or why not? (Evaluate)', answer: 'No, because the Panchayat has limited resources and jurisdiction',
                  options: ['No, because the Panchayat has limited resources and jurisdiction', 'the Sarpanch "owns" the village and decides everything alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.' }
          ],
            remediations: { 'the-sarpanch-owns-the-village': { steps: ['Remind the student that the Sarpanch is an "elected representative," not a ruler.', 'Ask them: "Who gives the Sarpanch their power?" and "What happens in a Gram Sabha meeting?" to reinforce that the.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
