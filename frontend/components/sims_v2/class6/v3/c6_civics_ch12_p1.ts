import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch12_p1: SimDef = {
    id: 'v3_c6_civics_ch12_p1',
    title: 'Grassroots Democracy · Part 1/2',
    subtitle: 'Why does the smallest government often solve the biggest local problems?',
    classLevel: 6, subject: 'civics', topic: 'Grassroots Democracy · Part 1/2',
    chapters: ['c6_civics_ch12'],
    nodeIds: ['c6_civics_ch12_015', 'c6_civics_ch12_016', 'c6_civics_ch12_017', 'c6_civics_ch12_018', 'c6_civics_ch12_019', 'c6_civics_ch12_020'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a Gram Sabha member with a broken fence to fix', intro: 'The playground fence is broken and the state office is 300 km away. Luckily, democracy has roots — and they reach right into your village square.', goal: 'Experience participation as everyday problem-solving, not just election-day voting.' },
    discovery: {
        question: 'A village has 200 children and zero swings. Should they write to the state capital and wait, or gather in the Gram Sabha and decide it themselves? Which path gets kids swinging sooner?',
        options: ['The Gram Sabha — the people closest to a problem can see it, discuss it and fix it fastest', 'The state government — bigger government always means better solutions', 'Neither — villages can\'t build anything without outside engineers', 'Write to the Prime Minister — the very top always decides best'],
        answer: 'The Gram Sabha — the people closest to a problem can see it, discuss it and fix it fastest',
        hook: 'Democracy doesn\'t only live in faraway parliaments. Its roots are in your street — where neighbours meet, argue, decide and fix things together.',
    },
    teaching: [
        { title: 'What is Grassroots Democracy?', text: 'Grassroots democracy is a system where governance happens at the local level, allowing ordinary citizens to directly participate in making decisions about their own daily needs like water, roads, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch12_015', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Bring a broken-fence problem to the Gram Sabha — gather the villagers, hear every side, and steer the meeting toward a fix the whole village owns.',
        labels: ['What is Grassroots Democracy?', 'Panchayati Raj: Village-Level Democracy', 'Municipalities: Urban Local Government', 'Functions of Local Government', 'State Government: Structure', 'National Government: Parliament'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch12_015', title: 'What is Grassroots Democracy?',
          caseStudy: { intro: 'Imagine your school playground has a broken fence that makes it unsafe for students to play.',
            decisions: [{ prompt: 'What is the primary purpose of having a local government like the Panchayat in a village?', options: [
                { text: 'The primary purpose is to allow villagers to manage their own local needs and participate', outcome: 'The primary purpose is to allow villagers to manage their own local needs and participate directly.' },
                { text: 'to make laws for the whole country', outcome: 'Not quite — Students often think that "Grassroots Democracy" is just about voting for leaders once every five.', reveals: 'grassroots-democracy-is-just-about' },
                { text: 'Grassroots Democracy', outcome: 'Not quite — Students often think that "Grassroots Democracy" is just about voting for leaders once every five.', reveals: 'grassroots-democracy-is-just-about' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_016', title: 'Panchayati Raj: Village-Level Democracy',
          caseStudy: { intro: 'Imagine your village street light is broken, or a primary school wall needs urgent repairs; would you write a letter to the Prime Minister in New Delhi,.',
            decisions: [{ prompt: 'What are the three tiers of the Panchayati Raj system in India?', options: [
                { text: 'The three tiers are the Gram Panchayat (village level), the Panchayat Samiti (block', outcome: 'The three tiers are the Gram Panchayat (village level), the Panchayat Samiti (block level), and the.' },
                { text: 'the Sarpanch has absolute power to do whatever they want', outcome: 'Not quite — Students often believe the Sarpanch has absolute power to do whatever they want.', reveals: 'the-sarpanch-has-absolute-power' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_018', title: 'Functions of Local Government',
          caseStudy: { intro: 'Imagine you wake up and find the village hand pump is broken and the main road is blocked by mud after a heavy rain—who fixes it?',
            decisions: [{ prompt: 'What is one primary function of a Gram Panchayat regarding village infrastructure? (Recall)', options: [
                { text: 'The Gram Panchayat maintains village roads and drains', outcome: 'The Gram Panchayat maintains village roads and drains. A student who mentions "laws for the whole.' },
                { text: 'laws for the whole country', outcome: 'Not quite — Students often think the Sarpanch "owns" the village and decides everything alone.', reveals: 'the-sarpanch-owns-the-village' },
                { text: 'the Sarpanch "owns" the village and decides everything alone', outcome: 'Not quite — Students often think the Sarpanch "owns" the village and decides everything alone.', reveals: 'the-sarpanch-owns-the-village' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_019', title: 'State Government: Structure and Functions',
          caseStudy: { intro: 'Imagine your school needs a new playground, but the local village council doesn\'t have the money to build it.',
            decisions: [{ prompt: 'What are the three branches of the state government?', options: [
                { text: 'The three branches are the Legislature, the Executive, and the Judiciary', outcome: 'The three branches are the Legislature, the Executive, and the Judiciary.' },
                { text: 'the Governor makes all the decisions', outcome: 'Not quite — Students often think the Governor makes all the decisions. This happens because they see the.', reveals: 'the-governor-makes-all-the' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_020', title: 'National Government: Parliament and Executive',
          caseStudy: { intro: 'If your school decided to change the lunch menu for the entire year, could one student make that choice alone, or would you need to talk to the principal, the.',
            decisions: [{ prompt: 'What are the three main components that make up the Parliament of India?', options: [
                { text: 'The Parliament consists of the President, the Lok Sabha, and the Rajya Sabha', outcome: 'The Parliament consists of the President, the Lok Sabha, and the Rajya Sabha.' },
                { text: 'National Government', outcome: 'Not quite — Students often think the "National Government" and "Parliament" are exactly the same thing.', reveals: 'the-national-government-and-parliament' },
                { text: 'Parliament', outcome: 'Not quite — Students often think the "National Government" and "Parliament" are exactly the same thing.', reveals: 'the-national-government-and-parliament' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_015', title: 'Use it in the wild',
          caseStudy: { intro: 'A village full of children has no playground. At the weekly meeting, one elder suggests writing a petition to the state government in the distant capital, \'since real power sits up there.\'',
            decisions: [{ prompt: 'Is the state capital the right address for this problem?', options: [
                { text: 'No — this is exactly what the Gram Panchayat is for. A local body knows the village\'s children, the available land and the budget needed, and can act quickly because the decision sits with the people affected. The three-tier system deliberately keeps village-sized problems in the village, reserving bigger issues for higher levels.', outcome: 'Local problems are solved best locally — a playground needs no state machinery, only the village institution designed to handle exactly such community needs.' },
                { text: 'The elder is right — only the state government has real authority, so every decision should travel up to the capital.', outcome: 'That would bury a small local fix in distant bureaucracy — grassroots democracy exists precisely so villages decide their own everyday matters.', reveals: 'only-state-can-act' },
                { text: 'Neither should act — a playground is a private want, and government at any level has no role in children\'s recreation.', outcome: 'Common village needs like play spaces, water and paths are exactly what local self-government exists to provide — a playground is a public good, not a private luxury.', reveals: 'playgrounds-not-public' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch12_020', title: 'The bigger picture',
          caseStudy: { intro: 'Grassroots democracy isn\'t voting once in five years — it\'s neighbours solving problems all year round. Power planted close to the ground grows fastest.',
            decisions: [{ prompt: 'What comes next? Grassroots Democracy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Grassroots Democracy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch12_015', difficulty: 'standard',
          question: 'Grassroots democracy is a system where governance happens at the local level.',
          hint: 'Review the concept of "Representative Democracy" (voting for people to represent you).',
          misconception: 'Students often think that "Grassroots Democracy" is just about voting for leaders once every five years.',
          parts: [
                { id: 'a', prompt: 'Why is it better for a village to decide on fixing a local road rather than waiting for the national government?', answer: 'Local villagers know exactly',
                  options: ['Local villagers know exactly', 'Grassroots Democracy', '"Grassroots Democracy" is just about voting for leaders once every five years'],
                  hint: 'Review the concept of "Representative Democracy" (voting for people to represent you).',
                  misconception: 'Students often think that "Grassroots Democracy" is just about voting for leaders once every five years.' }
          ],
            remediations: { 'grassroots-democracy-is-just-about': { steps: ['First, ask the student to define "participation" vs "voting." Explain that voting is a one-time event, while.', 'Use the example of a school student council: you don\'t just vote for members once; you also tell them what you need for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_016', difficulty: 'standard',
          question: 'The Panchayati Raj is a three-tier system of local self-government in rural.',
          hint: 'Review the definition of "Representative Democracy" where elected officials represent the.',
          misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.',
          parts: [
                { id: 'a', prompt: 'If a village needs a new handpump for water, which level of the Panchayati Raj system would likely handle the initial request?', answer: 'The Gram Panchayat handles this',
                  options: ['The Gram Panchayat handles this', 'all decisions are made by distant authorities', 'the Sarpanch has absolute power to do whatever they want'],
                  hint: 'Review the definition of "Representative Democracy" where elected officials represent the interests.',
                  misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.' }
          ],
            remediations: { 'the-sarpanch-has-absolute-power': { steps: ['If a student thinks the Sarpanch is a "boss" with total power, ask them: "If the Sarpanch wanted to build a road in the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_016', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.',
          parts: [
                { id: 'a', prompt: 'Is it better to have a single leader decide everything in a village, or to have a Gram Sabha discuss and decide?', answer: 'A Gram Sabha is better',
                  options: ['A Gram Sabha is better', 'the Sarpanch has absolute power to do whatever they want'],
                  hint: 'Review the definition of "Representative Democracy" where elected officials represent the interests.',
                  misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.' },
                { id: 'b', prompt: 'Design a simple campaign poster for a candidate running for Sarpanch. What are the two most important issues you would include?', answer: 'The poster should focus on local needs like sanitation, water, or education',
                  options: ['The poster should focus on local needs like sanitation, water, or education', 'the Sarpanch has absolute power to do whatever they want'],
                  hint: 'Review the definition of "Representative Democracy" where elected officials represent the interests.',
                  misconception: 'Students often believe the Sarpanch has absolute power to do whatever they want.' }
          ],
            remediations: { 'the-sarpanch-has-absolute-power': { steps: ['If a student thinks the Sarpanch is a "boss" with total power, ask them: "If the Sarpanch wanted to build a road in the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_017', difficulty: 'standard',
          question: 'Municipalities are the urban local self-government institutions responsible for.',
          hint: 'Review the definition of \'elected representative\' in the previous chapter on Panchayati.',
          misconception: 'Students often confuse the \'Sarpanch\' (village head) with the \'Mayor\' (city head).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Municipalities are the urban local self-government institutions responsible for providing',
                  options: ['Municipalities are the urban local self-government institutions responsible for providing', 'Grassroots democracy is a system where governance happens at the local level, allowing', 'The Panchayati Raj is a three-tier system of local self-government in rural India', 'The functions of local government are the specific tasks performed by elected village and'],
                  hint: 'Review the definition of \'elected representative\' in the previous chapter on Panchayati Raj.',
                  misconception: 'Students often confuse the \'Sarpanch\' (village head) with the \'Mayor\' (city head).' }
          ],
            remediations: { 'students-often-confuse-the-sarpanch': { steps: ['Create a T-chart on a sheet of paper.', 'Label the left side "Rural (Village)" and the right side "Urban (City)." List "Sarpanch" and "Gram Panchayat" under.', 'Explain that "Panchayat" is for farming/village life, while "Municipality" is for city/infrastructure life.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_018', difficulty: 'standard',
          question: 'The functions of local government are the specific tasks performed by elected.',
          hint: 'Review the section on the Gram Sabha in the textbook.',
          misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.',
          parts: [
                { id: 'a', prompt: 'What is one primary function of a Gram Panchayat regarding village infrastructure? (Recall)', answer: 'The Gram Panchayat maintains village roads and drains',
                  options: ['The Gram Panchayat maintains village roads and drains', 'laws for the whole country', 'the Sarpanch "owns" the village and decides everything alone'],
                  hint: 'Review the section on the Gram Sabha in the textbook.',
                  misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.' },
                { id: 'b', prompt: 'If a village wants to start a new sanitation campaign to keep the streets clean, which local body is responsible for implementing it? (Apply)', answer: 'The Gram Panchayat is responsible',
                  options: ['The Gram Panchayat is responsible', 'the Sarpanch "owns" the village and decides everything alone'],
                  hint: 'Review the section on the Gram Sabha in the textbook.',
                  misconception: 'Students often think the Sarpanch "owns" the village and decides everything alone.' }
          ],
            remediations: { 'the-sarpanch-owns-the-village': { steps: ['Remind the student that the Sarpanch is an "elected representative," not a ruler.', 'Ask them: "Who gives the Sarpanch their power?" and "What happens in a Gram Sabha meeting?" to reinforce that the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_019', difficulty: 'standard',
          question: 'The state government is the administrative authority that manages a state\'s.',
          hint: 'Review the "three-tier system" of Panchayati Raj to understand that government exists.',
          misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head".',
          parts: [
                { id: 'a', prompt: 'What are the three branches of the state government?', answer: 'The three branches are the Legislature, the Executive, and the Judiciary',
                  options: ['The three branches are the Legislature, the Executive, and the Judiciary', 'the Governor makes all the decisions'],
                  hint: 'Review the "three-tier system" of Panchayati Raj to understand that government exists at different.',
                  misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of the state and assume.' },
                { id: 'b', prompt: 'Which branch of the state government is responsible for interpreting the laws if a dispute arises?', answer: 'The Judiciary (the High Court) is responsible for interpreting laws',
                  options: ['The Judiciary (the High Court) is responsible for interpreting laws', 'the Governor makes all the decisions'],
                  hint: 'Review the "three-tier system" of Panchayati Raj to understand that government exists at different.',
                  misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of the state and assume.' },
                { id: 'c', prompt: 'If a new law is needed to improve schools across the entire state, which branch would be responsible for making that law?', answer: 'The Legislature (Vidhan Sabha)',
                  options: ['The Legislature (Vidhan Sabha)', 'the Governor makes all the decisions'],
                  hint: 'Review the "three-tier system" of Panchayati Raj to understand that government exists at different.',
                  misconception: 'Students often think the Governor makes all the decisions. This happens because they see the Governor as the "head" of the state and assume.' }
          ],
            remediations: { 'the-governor-makes-all-the': { steps: ['Explain that the Governor is the ceremonial head, while the Chief Minister and Council of Ministers hold the real power.', 'Use the analogy of a school: The Principal (Governor) is the head, but the Teachers and Student Council (Ministers).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch12_020', difficulty: 'standard',
          question: 'The National Government is the highest authority in India, based in New Delhi.',
          hint: 'Review the concept of "Gram Sabha" and "Gram Panchayat" from the previous chapter to see.',
          misconception: 'Students often think the "National Government" and "Parliament" are exactly the same thing.',
          parts: [
                { id: 'a', prompt: 'What are the three main components that make up the Parliament of India?', answer: 'The Parliament consists of the President, the Lok Sabha, and the Rajya Sabha',
                  options: ['The Parliament consists of the President, the Lok Sabha, and the Rajya Sabha', 'National Government', 'Parliament', 'the "National Government" and "Parliament" are exactly the same thing'],
                  hint: 'Review the concept of "Gram Sabha" and "Gram Panchayat" from the previous chapter to see how local.',
                  misconception: 'Students often think the "National Government" and "Parliament" are exactly the same thing.' },
                { id: 'b', prompt: 'If a new law is needed to improve national highways, which branch of the national government would be responsible for creating that law?', answer: 'The Legislature (Parliament) would be responsible',
                  options: ['The Legislature (Parliament) would be responsible', 'National Government', 'Parliament', 'the "National Government" and "Parliament" are exactly the same thing'],
                  hint: 'Review the concept of "Gram Sabha" and "Gram Panchayat" from the previous chapter to see how local.',
                  misconception: 'Students often think the "National Government" and "Parliament" are exactly the same thing.' }
          ],
            remediations: { 'the-national-government-and-parliament': { steps: ['Explain that the government is like a machine with parts: the Parliament (Legislature) writes the "instructions".', 'Ask the student: "Does the person who writes a recipe also have to do the cooking, or are they different roles?" This.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
