import type { SimDef } from '../../engine/types';
import C6_HistoryCivicsEarlyVedicPoliticalSim from '../../../simulations/c6_12/C6_HistoryCivicsEarlyVedicPoliticalSim';

/** v3 wrapped master — C6_HistoryCivicsEarlyVedicPoliticalSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c6_historycivicsearlyvedicpoliticalsim: SimDef = {
    id: 'v3w_c6_historycivicsearlyvedicpoliticalsim',
    title: 'Early Vedic Political',
    subtitle: 'This node covers the emergence of nationalism as a unified consciousness.',
    classLevel: 6, subject: 'history', topic: 'The Birth of Indian Nationalism',
    chapters: [],
    nodeIds: ['c6_history_ch11_045', 'c6_history_ch11_049', 'c6_history_ch12_053', 'c6_history_ch04_001', 'c6_history_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 6 learner', intro: 'Imagine you are part of a team where everyone has different ideas, but you all decide to work together.', goal: 'Master Early Vedic Political.' },
    discovery: {
        question: 'What was the primary method Subhas Chandra Bose believed was necessary to gain independence, contrasting with the non-violent approach?',
        options: ['Bose believed that armed struggle was necessary', 'against', 'Bose was "against" Gandhi, implying personal hatred'],
        answer: 'Bose believed that armed struggle was necessary',
        hook: 'Students often think Bose was "against" Gandhi, implying personal hatred.',
    },
    teaching: [
        { title: 'The birth of Indian nationalism refers to.', text: 'The birth of Indian nationalism refers to the late 19th-century process where people across India began to see themselves as a single, united nation against British rule.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c6_history_ch11_049', title: 'Subhas Chandra Bose, known as Netaji,.',
          caseStudy: { intro: 'Imagine you are playing a game where your team decides to ask the referee to change a rule by sitting silently, but you feel that the only way to win is to.',
            decisions: [{ prompt: 'What was the primary method Subhas Chandra Bose believed was necessary to gain independence, contrasting with the non-violent approach?', options: [
                { text: 'Bose believed that armed struggle was necessary', outcome: 'Bose believed that armed struggle was necessary. A wrong answer here suggests the student is.' },
                { text: 'against', outcome: 'Not quite — Students often think Bose was "against" Gandhi, implying personal hatred.', reveals: 'bose-was-against-gandhi' },
                { text: 'Bose was "against" Gandhi, implying personal hatred', outcome: 'Not quite — Students often think Bose was "against" Gandhi, implying personal hatred.', reveals: 'bose-was-against-gandhi' }
            ] }] } },
        { type: 'case', nodeId: 'c6_history_ch12_053', title: 'Economic planning is the process where.',
          caseStudy: { intro: 'Imagine you are planning a long family vacation: you need a budget, a list of places to visit, and a timeline to ensure you don\'t run out of money or time.',
            decisions: [{ prompt: 'What was the main purpose of establishing the Planning Commission in 1950?', options: [
                { text: 'The Planning Commission was established to create structured Five-Year Plans to solve', outcome: 'The Planning Commission was established to create structured Five-Year Plans to solve India\'s.' },
                { text: 'Economic Planning', outcome: 'Not quite — Students often think "Economic Planning" means the government controlled every single person\'s job.', reveals: 'economic-planning-means-the-government' },
                { text: 'the commission was for making laws rather than economic strategy', outcome: 'Not quite — Students often think "Economic Planning" means the government controlled every single person\'s job.', reveals: 'economic-planning-means-the-government' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_history_ch04_001', title: 'Early cities were large, organized.',
          scaffold: { problem: 'A village of 20 people needs 50kg of grain to survive a month. They currently produce 50kg. Can this village turn into a city?',
            steps: [
            { text: 'Identify the current production (50kg) vs. needs (50kg).' },
            { text: 'Determine if there is a "surplus" (extra food).' },
            { text: 'Analyze if they have enough to support people who don\'t farm.' },
            { text: 'Conclude if it can become a city.', faded: true, blankAnswer: 'No, because they have no surplus, everyone must focus.' }
            ] } },
        { type: 'case', nodeId: 'c6_history_ch04_006', title: 'The decline of the Harappan.',
          caseStudy: { intro: 'Have you ever seen a house left empty because the well dried up or the roof collapsed?',
            decisions: [{ prompt: 'In what year (approximately) did the Harappan Civilisation begin its decline?', options: [
                { text: 'The decline began around 1900 BCE', outcome: 'The decline began around 1900 BCE. A student who says "5000 years ago" or "recently" shows they are.' },
                { text: '5000 years ago', outcome: 'Not quite — Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war.', reveals: 'the-harappan-civilisation-was-destroyed' },
                { text: 'recently', outcome: 'Not quite — Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war.', reveals: 'the-harappan-civilisation-was-destroyed' }
            ] }] } }
    ],
    explore: { component: C6_HistoryCivicsEarlyVedicPoliticalSim, prompt: 'Explore the interactive — Early Vedic Political' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_history_ch11_045', difficulty: 'standard',
          question: 'The birth of Indian nationalism refers to the late 19th-century process where.',
          hint: 'Review the "How Foreigners Named India" section to understand India as a large, singular.',
          misconception: 'Students often think nationalism happened instantly or that everyone in India agreed on everything from day one.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The birth of Indian nationalism refers to the late 19th-century process where people',
                  options: ['The birth of Indian nationalism refers to the late 19th-century process where people', 'Subhas Chandra Bose, known as Netaji, was a key leader in the Indian freedom struggle who', 'Economic planning is the process where the government creates a structured strategy to', 'Early cities were large, organized settlements that emerged after humans transitioned'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think nationalism happened instantly or that everyone in India agreed on everything from day one.' }
          ],
            remediations: { 'nationalism-happened-instantly-or-that': { steps: ['Tell the student: "Think of a school project where different groups finally work together." 2.', 'Explain that before 1885, people identified mostly with their own kingdom or village.', 'Ask them to list two "connectors" (trains, English language, newspapers) that made this union possible.', 'Emphasize that "Nationalism" is a feeling that grows over time.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch11_049', difficulty: 'standard',
          question: 'Subhas Chandra Bose, known as Netaji, was a key leader in the Indian freedom.',
          hint: 'Review the timeline of the Indian National Congress and key leaders.',
          misconception: 'Students often think Bose was "against" Gandhi, implying personal hatred.',
          parts: [
                { id: 'a', prompt: 'What was the primary method Subhas Chandra Bose believed was necessary to gain independence, contrasting with the non-violent approach?', answer: 'Bose believed that armed struggle was necessary',
                  options: ['Bose believed that armed struggle was necessary', 'against', 'Bose was "against" Gandhi, implying personal hatred'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bose was "against" Gandhi, implying personal hatred.' },
                { id: 'b', prompt: 'If you were a leader during WWII, why might you seek help from countries like Germany or Japan to fight against the British in India?', answer: 'You would seek help',
                  options: ['You would seek help', 'the enemy of my enemy is my friend', 'against'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think Bose was "against" Gandhi, implying personal hatred.' }
          ],
            remediations: { 'bose-was-against-gandhi': { steps: ['Explain that even in a team, two captains can disagree on the best strategy to win a game while both wanting to win.', 'Tell the student to read about how Bose served as Congress President to see that he was a respected part of the.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_053', difficulty: 'standard',
          question: 'Economic planning is the process where the government creates a structured.',
          hint: 'Review the challenges India faced in 1947, specifically food shortages.',
          misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal.',
          parts: [
                { id: 'a', prompt: 'Why did the government decide that the state (the government) should play a major role in the economy?', answer: 'The government took a major role',
                  options: ['The government took a major role', 'Economic Planning'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal spending.' },
                { id: 'b', prompt: 'If you were in charge of the First Five-Year Plan, why would you prioritize agriculture over building large factories?', answer: 'You would prioritize agriculture',
                  options: ['You would prioritize agriculture', 'Economic Planning'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal spending.' }
          ],
            remediations: { 'economic-planning-means-the-government': { steps: ['Review the concept of "National Priorities." Ask the student: "If a house has a leaky roof and no kitchen, which do you.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch12_053', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal.',
          parts: [
                { id: 'a', prompt: 'Was the government\'s choice to lead economic planning a logical reaction to the conditions of India in 1950?', answer: 'Yes, it was logical',
                  options: ['Yes, it was logical', 'Economic Planning'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal spending.' },
                { id: 'b', prompt: 'Create a simple "Two-Year Plan" for a school canteen that is running out of food and has broken equipment. What is your first priority and why?', answer: 'The first priority should be fixing the food supply',
                  options: ['The first priority should be fixing the food supply', 'Economic Planning'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think "Economic Planning" means the government controlled every single person\'s job or personal spending.' }
          ],
            remediations: { 'economic-planning-means-the-government': { steps: ['Review the concept of "National Priorities." Ask the student: "If a house has a leaky roof and no kitchen, which do you.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_001', difficulty: 'standard',
          question: 'Early cities were large, organized settlements that emerged after humans.',
          hint: 'Review the shift from gathering to farming in the early history section of the chapter.',
          misconception: 'Students often assume early humans "decided" to build cities overnight.',
          parts: [
                { id: 'a', prompt: 'What was the primary way humans gathered food before they started farming?', answer: 'Early humans survived by hunting animals and gathering wild plants and fruits',
                  options: ['Early humans survived by hunting animals and gathering wild plants and fruits', 'hunter-gatherer', 'farming'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' },
                { id: 'b', prompt: 'How does a city differ from a small, temporary camp in terms of how people spend their time?', answer: 'In a temporary camp, everyone\'s energy is spent finding food',
                  options: ['In a temporary camp, everyone\'s energy is spent finding food', 'specialization', 'decided'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' }
          ],
            remediations: { 'early-humans-decided-to-build': { steps: ['First, ask the student to draw a line representing 10,000 years.', 'Explain that the transition from a single hut to a city took thousands of years, not a few days.', 'Use the analogy of a "seed growing into a tree"—it needs time, stability, and nourishment (food surplus) to become.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume early humans "decided" to build cities overnight.',
          parts: [
                { id: 'a', prompt: 'How does a city differ from a small, temporary camp in terms of how people spend their time?', answer: 'In a temporary camp, everyone\'s energy is spent finding food',
                  options: ['In a temporary camp, everyone\'s energy is spent finding food', 'specialization', 'decided', 'early humans "decided" to build cities overnight'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume early humans "decided" to build cities overnight.' }
          ],
            remediations: { 'early-humans-decided-to-build': { steps: ['First, ask the student to draw a line representing 10,000 years.', 'Explain that the transition from a single hut to a city took thousands of years, not a few days.', 'Use the analogy of a "seed growing into a tree"—it needs time, stability, and nourishment (food surplus) to become.'] } } },
        { type: 'subpart', nodeId: 'c6_history_ch04_006', difficulty: 'standard',
          question: 'The decline of the Harappan Civilisation refers to the period around 1900 BCE.',
          hint: 'Review the concept of "settlement" and "agriculture" in early human history.',
          misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate.',
          parts: [
                { id: 'a', prompt: 'In what year (approximately) did the Harappan Civilisation begin its decline?', answer: 'The decline began around 1900 BCE',
                  options: ['The decline began around 1900 BCE', '5000 years ago', 'recently'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate "decline" with "being.' },
                { id: 'b', prompt: 'Why do historians use the word "theory" when discussing the decline of the Harappan cities?', answer: 'They use "theory"',
                  options: ['They use "theory"', 'destroyed', 'conquered'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think the Harappan Civilisation was "destroyed" or "conquered" in a single war because they equate "decline" with "being.' }
          ],
            remediations: { 'the-harappan-civilisation-was-destroyed': { steps: ['Ask the student to draw a picture of a river and a farm.', 'Ask them to erase the river and draw it somewhere else.', 'Ask them: "What happens to the crops now?" 4.', 'Explain that this represents a \'decline\' rather than a \'war.\''] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
