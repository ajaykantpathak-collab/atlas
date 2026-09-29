import type { SimDef } from '../../engine/types';
import C6_SocialScienceRuralAdministrationSim from '../../../simulations/c6_12/C6_SocialScienceRuralAdministrationSim';

/** v3 wrapped master — C6_SocialScienceRuralAdministrationSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_socialscienceruraladministrationsim: SimDef = {
    id: 'v3w_c6_socialscienceruraladministrationsim',
    title: 'State Government: Structure and Functions',
    subtitle: 'This node covers the structure (Legislature, Executive, Judiciary) and core functions of.',
    classLevel: 6, subject: 'science', topic: 'State Government: Structure and Functions',
    chapters: [],
    nodeIds: ['c6_civics_ch12_019', 'c6_civics_ch12_015', 'c6_civics_ch12_020', 'c6_civics_ch12_018', 'c6_history_ch09_038', 'c6_history_ch09_034', 'c6_history_ch09_035'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine your school needs a new playground, but the local village council doesn\'t have the money to build it.', goal: 'Master State Government: Structure and Functions.' },
    discovery: {
        question: 'Why is it better for a village to decide on fixing a local road rather than waiting for the national government?',
        options: ['Local villagers know exactly', 'Grassroots Democracy', '"Grassroots Democracy" is just about voting for leaders once every five years'],
        answer: 'Local villagers know exactly',
        hook: 'Students often think that "Grassroots Democracy" is just about voting for leaders once every five years.',
    },
    teaching: [
        { title: 'The state government is the administrative.', text: 'The state government is the administrative authority that manages a state\'s affairs, operating between the national (central) government and local rural/urban bodies.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_civics_ch12_019', title: 'The state government is the.',
          caseStudy: { intro: 'Imagine your school needs a new playground, but the local village council doesn\'t have the money to build it.',
            decisions: [{ prompt: 'What are the three branches of the state government?', options: [
                { text: 'The three branches are the Legislature, the Executive, and the Judiciary', outcome: 'The three branches are the Legislature, the Executive, and the Judiciary.' },
                { text: 'the Governor makes all the decisions', outcome: 'Not quite — Students often think the Governor makes all the decisions. This happens because they see the.', reveals: 'the-governor-makes-all-the' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_civics_ch12_015', title: 'Grassroots democracy is a system where.',
          scaffold: { problem: 'A village has a polluted pond that is used for washing clothes. How does the Gram Panchayat handle this?',
            steps: [
            { text: 'Identify the problem (polluted water source).' },
            { text: 'Raise the issue in the Gram Sabha meeting so all villagers are aware.' },
            { text: 'The Gram Panchayat discusses the issue and allocates funds/plans for cleaning the pond.' },
            { text: 'The Panchayat Secretary records the decision and oversees the cleanup.', faded: true, blankAnswer: 'The community voices the concern in the Sabha, and the.' }
            ] } },
        { type: 'case', nodeId: 'c6_civics_ch12_016', title: 'The Panchayati Raj is a three-tier.',
          caseStudy: { intro: 'Imagine your village street light is broken, or a primary school wall needs urgent repairs; would you write a letter to the Prime Minister in New Delhi, or.',
            decisions: [{ prompt: 'What are the three tiers of the Panchayati Raj system in India?', options: [
                { text: 'The three tiers are the Gram Panchayat (village level), the Panchayat Samiti (block', outcome: 'The three tiers are the Gram Panchayat (village level), the Panchayat Samiti (block level), and the.' },
                { text: 'the Sarpanch has absolute power to do whatever they want', outcome: 'Not quite — Students often believe the Sarpanch has absolute power to do whatever they want.', reveals: 'the-sarpanch-has-absolute-power' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_018', title: 'The functions of local government are.',
          caseStudy: { intro: 'Imagine you wake up and find the village hand pump is broken and the main road is blocked by mud after a heavy rain—who fixes it?',
            decisions: [{ prompt: 'What is one primary function of a Gram Panchayat regarding village infrastructure? (Recall)', options: [
                { text: 'The Gram Panchayat maintains village roads and drains', outcome: 'The Gram Panchayat maintains village roads and drains. A student who mentions "laws for the whole.' },
                { text: 'laws for the whole country', outcome: 'Not quite — Students often think the Sarpanch "owns" the village and decides everything alone.', reveals: 'the-sarpanch-owns-the-village' },
                { text: 'the Sarpanch "owns" the village and decides everything alone', outcome: 'Not quite — Students often think the Sarpanch "owns" the village and decides everything alone.', reveals: 'the-sarpanch-owns-the-village' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_038', title: 'Mughal society and economy refers to.',
          caseStudy: { intro: 'Think about your own school: there are teachers, administrators, and students, all working together to keep the school running.',
            decisions: [{ prompt: 'Who occupied the highest position in the Mughal social structure?', options: [
                { text: 'The Emperor and the nobles', outcome: 'The Emperor and the nobles. A student answering "merchants" shows they are confusing the political.' },
                { text: 'merchants', outcome: 'Not quite — Students often think the Mughal Empire was purely a military state and ignore the "everyday".', reveals: 'the-mughal-empire-was-purely' },
                { text: 'everyday', outcome: 'Not quite — Students often think the Mughal Empire was purely a military state and ignore the "everyday".', reveals: 'the-mughal-empire-was-purely' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch09_034', title: 'Akbar was the third Mughal emperor.',
          caseStudy: { intro: 'Imagine you are the captain of a sports team that you inherited when you were very young, and for the first few years, a coach made all the decisions for you.',
            decisions: [{ prompt: 'Who was the person that acted as a regent for Akbar during the first few years of his reign?', options: [
                { text: 'Bairam Khan was his regent', outcome: 'Bairam Khan was his regent. A student who answers "Humayun" confuses the father with the protector,.' },
                { text: 'Humayun', outcome: 'Not quite — Students often think Akbar inherited a stable empire and just kept it that way.', reveals: 'akbar-inherited-a-stable-empire' },
                { text: 'Akbar inherited a stable empire and just kept it that way', outcome: 'Not quite — Students often think Akbar inherited a stable empire and just kept it that way.', reveals: 'akbar-inherited-a-stable-empire' }
            ] }] } }
    ],
    explore: { component: C6_SocialScienceRuralAdministrationSim, prompt: 'Explore the interactive — State Government: Structure and Functions' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch12_019', difficulty: 'standard',
          question: 'The state government is the administrative authority that manages a state\'s.',
          hint: 'Review the "three-tier system" of Panchayati Raj to understand that government exists at.',
          misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of.',
          parts: [
                { id: 'a', prompt: 'What are the three branches of the state government?', answer: 'The three branches are the Legislature, the Executive, and the Judiciary',
                  options: ['The three branches are the Legislature, the Executive, and the Judiciary', 'the Governor makes all the decisions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of the state and assume.' },
                { id: 'b', prompt: 'Which branch of the state government is responsible for interpreting the laws if a dispute arises?', answer: 'The Judiciary (the High Court) is responsible for interpreting laws',
                  options: ['The Judiciary (the High Court) is responsible for interpreting laws', 'the Governor makes all the decisions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of the state and assume.' },
                { id: 'c', prompt: 'If a new law is needed to improve schools across the entire state, which branch would be responsible for making that law?', answer: 'The Legislature (Vidhan Sabha)',
                  options: ['The Legislature (Vidhan Sabha)', 'the Governor makes all the decisions'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of the state and assume.' }
          ],
            remediations: { 'the-governor-makes-all-the': { steps: ['Explain that the Governor is the ceremonial head, while the Chief Minister and Council of Ministers hold the real power.', 'Use the analogy of a school: The Principal (Governor) is the head, but the Teachers and Student Council (Ministers).'] } } },
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
        { type: 'subpart', nodeId: 'c6_civics_ch12_016', difficulty: 'standard',
          question: 'The Panchayati Raj is a three-tier system of local self-government in rural.',
          hint: 'Review the definition of "Representative Democracy" where elected officials represent the.',
          misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.',
          parts: [
                { id: 'a', prompt: 'If a village needs a new handpump for water, which level of the Panchayati Raj system would likely handle the initial request?', answer: 'The Gram Panchayat handles this',
                  options: ['The Gram Panchayat handles this', 'all decisions are made by distant authorities', 'the Sarpanch has absolute power to do whatever they want'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.' }
          ],
            remediations: { 'the-sarpanch-has-absolute-power': { steps: ['If a student thinks the Sarpanch is a "boss" with total power, ask them: "If the Sarpanch wanted to build a road in the.'] } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.',
          parts: [
                { id: 'a', prompt: 'Is it better to have a single leader decide everything in a village, or to have a Gram Sabha discuss and decide?', answer: 'A Gram Sabha is better',
                  options: ['A Gram Sabha is better', 'the Sarpanch has absolute power to do whatever they want'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.' },
                { id: 'b', prompt: 'Design a simple campaign poster for a candidate running for Sarpanch. What are the two most important issues you would include?', answer: 'The poster should focus on local needs like sanitation, water, or education',
                  options: ['The poster should focus on local needs like sanitation, water, or education', 'the Sarpanch has absolute power to do whatever they want'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.' }
          ],
            remediations: { 'the-sarpanch-has-absolute-power': { steps: ['If a student thinks the Sarpanch is a "boss" with total power, ask them: "If the Sarpanch wanted to build a road in the.'] } } },
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
            remediations: { 'the-sarpanch-owns-the-village': { steps: ['Remind the student that the Sarpanch is an "elected representative," not a ruler.', 'Ask them: "Who gives the Sarpanch their power?" and "What happens in a Gram Sabha meeting?" to reinforce that the.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_038', difficulty: 'standard',
          question: 'Mughal society and economy refers to the organized way people lived, worked,.',
          hint: 'Review the definition of "social hierarchy" from early chapters.',
          misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.',
          parts: [
                { id: 'a', prompt: 'Who occupied the highest position in the Mughal social structure?', answer: 'The Emperor and the nobles',
                  options: ['The Emperor and the nobles', 'merchants', 'everyday'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' },
                { id: 'b', prompt: 'If a drought destroyed the crops in a village, how would this affect an artisan living in a city?', answer: 'The artisan would suffer',
                  options: ['The artisan would suffer', 'everyday', 'the Mughal Empire was purely a military state and ignore the "everyday" economy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' },
                { id: 'c', prompt: 'How did the Bhakti and Sufi movements challenge the traditional social order of the time?', answer: 'They preached equality and devotion',
                  options: ['They preached equality and devotion', 'everyday', 'the Mughal Empire was purely a military state and ignore the "everyday" economy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' }
          ],
            remediations: { 'the-mughal-empire-was-purely': { steps: ['To fix this, ask the student to trace the journey of a piece of cotton fabric: from the farmer (raw material) to the.', 'Have them draw this as a chain to show that the Emperor\'s power relied on the stability of all these people below him.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_038', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.',
          parts: [
                { id: 'a', prompt: 'If you were a merchant in a Mughal city, what evidence would you need to show that your business was part of a larger, complex society?', answer: 'Evidence would include the variety of goods sold (crafts vs',
                  options: ['Evidence would include the variety of goods sold (crafts vs', 'everyday', 'the Mughal Empire was purely a military state and ignore the "everyday" economy'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Mughal Empire was purely a military state and ignore the "everyday" economy.' }
          ],
            remediations: { 'the-mughal-empire-was-purely': { steps: ['To fix this, ask the student to trace the journey of a piece of cotton fabric: from the farmer (raw material) to the.', 'Have them draw this as a chain to show that the Emperor\'s power relied on the stability of all these people below him.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_034', difficulty: 'standard',
          question: 'Akbar was the third Mughal emperor (reigned 1542–1605) who transformed the.',
          hint: 'Review the definition of a \'Regent\' and the life of Humayun.',
          misconception: 'Students often think Akbar inherited a stable empire and just kept it that way.',
          parts: [
                { id: 'a', prompt: 'Who was the person that acted as a regent for Akbar during the first few years of his reign?', answer: 'Bairam Khan was his regent',
                  options: ['Bairam Khan was his regent', 'Humayun', 'Akbar inherited a stable empire and just kept it that way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Akbar inherited a stable empire and just kept it that way.' }
          ],
            remediations: { 'akbar-inherited-a-stable-empire': { steps: ['First, ask the student to re-read the timeline of Humayun\'s death.', 'Then, explain that "inheriting" a throne is different from "securing" it.', 'Finally, have them list two challenges a 13-year-old might face when trying to control powerful, older nobles.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch09_034', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think Akbar inherited a stable empire and just kept it that way.',
          parts: [
                { id: 'a', prompt: 'Was Akbar’s military expansion the only reason he was called "The Great"? Justify your answer.', answer: 'No, he is called "Great"',
                  options: ['No, he is called "Great"', 'yes, only because he won wars', 'Akbar inherited a stable empire and just kept it that way'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Akbar inherited a stable empire and just kept it that way.' }
          ],
            remediations: { 'akbar-inherited-a-stable-empire': { steps: ['First, ask the student to re-read the timeline of Humayun\'s death.', 'Then, explain that "inheriting" a throne is different from "securing" it.', 'Finally, have them list two challenges a 13-year-old might face when trying to control powerful, older nobles.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
