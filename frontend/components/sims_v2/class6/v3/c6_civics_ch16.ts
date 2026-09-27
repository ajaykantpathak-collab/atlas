import type { SimDef } from '../../engine/types';

/** v3 generated — c6_civics_ch16 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_civics_ch16: SimDef = {
    id: 'v3_c6_civics_ch16',
    title: 'The informal sector refers to economic work.',
    subtitle: 'Same work, same sweat — so why is only one \'economic\'?',
    classLevel: 6, subject: 'civics', topic: 'The informal sector refers to economic work.',
    chapters: ['c6_civics_ch16'],
    nodeIds: ['c6_civics_ch16_004', 'c6_civics_ch16_039', 'c6_civics_ch16_040', 'c6_civics_ch16_041'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a neighbourhood survey-taker sorting everyone\'s daily work', intro: 'A shopkeeper opens shutters, a parent packs tiffins, a volunteer plants trees. Which of today\'s activities earn money — and which earn something else?', goal: 'Draw the line between economic and non-economic activity — the transaction test.' },
    discovery: {
        question: 'Mina scrubs her own kitchen all afternoon — exhausting work! Next door, a cleaner is paid to do the exact same job. Same sweat, same sparkle — so why does only one count as \'economic\'?',
        options: ['Money changed hands in one case — economic activity needs a transaction, not just effort', 'Mina\'s work is economic too, because hard work always counts', 'Neither is economic — cleaning is never real work', 'Both are economic — identical effort means identical category'],
        answer: 'Money changed hands in one case — economic activity needs a transaction, not just effort',
        hook: 'Busy does not mean economic. The line isn\'t effort — it\'s exchange. Cook for family out of love: non-economic. Cook the same meal for pay: economic.',
    },
    teaching: [
        { title: 'The informal sector refers to economic.', text: 'The informal sector refers to economic work that is unregistered and unprotected — street vending, daily-wage labour, home-based piecework, small unregistered shops — where workers lack employment.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_civics_ch16_004', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort a whole neighbourhood\'s day — shopkeepers, parents, volunteers, delivery riders — into paid work and unpaid care, then defend every borderline call.',
        labels: ['Understanding Economic Activities', 'Rights of Workers', 'Government\'s Role in'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c6_civics_ch16_004', title: 'The informal sector refers to economic.',
          caseStudy: { intro: '1. Compare two workers: a bank clerk (appointment letter, fixed salary, leave, pension) and a vegetable vendor (no contract, income that stops when she stops).',
            decisions: [{ prompt: 'Distinguish the formal from the informal sector.', options: [
                { text: 'Formal work is registered and protected', outcome: 'Formal work is registered and protected — contract, fixed salary, security, benefits.' },
                { text: '\'informal\' means \'illegal\'', outcome: 'Not quite — Students think \'informal\' means \'illegal\' — the vegetable vendor is doing something wrong.', reveals: 'informal-means-illegal-the-vegetable' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch16_039', title: 'Understanding Economic Activities',
          caseStudy: { intro: 'Think about your morning: did you see a shopkeeper opening their store or a parent cooking breakfast for the family?',
            decisions: [{ prompt: 'What is the primary difference between an economic activity and a non-economic activity?', options: [
                { text: 'Economic activities are done for money or monetary value, while non-economic activities', outcome: 'Economic activities are done for money or monetary value, while non-economic activities are done.' },
                { text: '(reward)', outcome: 'Not quite — Students often think that "working hard" or "being busy" automatically makes an activity economic.', reveals: 'working-hard-or-being-busy' },
                { text: 'being busy', outcome: 'Not quite — Students often think that "working hard" or "being busy" automatically makes an activity economic.', reveals: 'working-hard-or-being-busy' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch16_040', title: 'Rights of Workers and Consumers',
          caseStudy: { intro: 'Imagine you are at a shop buying a packet of biscuits, but the shopkeeper sells you one that is already expired—how would you feel?',
            decisions: [{ prompt: 'Name two rights that a worker has to ensure they are not treated unfairly at their workplace.', options: [
                { text: 'Workers have the right to safe working conditions and the right to fair wages', outcome: 'Workers have the right to safe working conditions and the right to fair wages.' },
                { text: 'getting holidays', outcome: 'Not quite — Students often confuse "rights" with "charity." They might think fair wages are a "gift" from.', reveals: 'students-often-confuse-rights-with' },
                { text: 'rights', outcome: 'Not quite — Students often confuse "rights" with "charity." They might think fair wages are a "gift" from.', reveals: 'students-often-confuse-rights-with' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch16_041', title: 'Government\'s Role in the Economy',
          caseStudy: { intro: 'Imagine walking to school on a clean, paved road, passing by a public hospital, and knowing your teachers are paid fairly.',
            decisions: [{ prompt: 'Name two examples of "public goods" that the government provides because the private market might not provide them adequately.', options: [
                { text: 'Roads and public hospitals', outcome: 'Roads and public hospitals. A wrong answer suggests the student confuses private businesses (like.' },
                { text: 'the economy', outcome: 'Not quite — Students often think "the economy" only refers to large banks or stock markets and ignore their own.', reveals: 'the-economy-only-refers-to' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch16_004', title: 'Use it in the wild',
          caseStudy: { intro: 'A student spends a weekend building a bookshelf for his own room. The next weekend he builds an identical one for a neighbour, who pays him for the work. He asks, \'Same effort both times — so both were economic activity, right?\'',
            decisions: [{ prompt: 'Which of the two weekends counts as an economic activity?', options: [
                { text: 'Only the paid one — economic activity is work done for payment or income. The identical labour becomes \'economic\' the moment money changes hands; building his own shelf stays a non-economic activity, though it is still real, valuable work — just like volunteering, which society values even without a price tag.', outcome: 'The dividing line is payment, not effort — the same hands doing the same work cross from non-economic to economic depending on whether it earns.' },
                { text: 'He is right — identical effort means identical classification, so both weekends were economic activity.', outcome: 'Effort does not decide the category — payment does; unpaid work for oneself is non-economic even when it is hard, skilled work.', reveals: 'work-equals-economic' },
                { text: 'Neither weekend counts — building furniture only counts as economic work if done in a factory.', outcome: 'Location does not matter — a paid bookshelf built at home is economic activity just as much as factory carpentry.', reveals: 'economic-needs-factory' }
            ] }] } },
        { type: 'case', nodeId: 'c6_civics_ch16_041', title: 'You made it',
          caseStudy: { intro: 'Same task, different reason. When love does the work it\'s priceless; when payment does, it\'s economic. The rupee, not the sweat, draws the line.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_civics_ch16_004', difficulty: 'standard',
          question: 'The informal sector refers to economic work that is unregistered and.',
          hint: 'Work step by step.',
          misconception: 'Students think \'informal\' means \'illegal\' — the vegetable vendor is doing something wrong.',
          parts: [
                { id: 'a', prompt: 'Distinguish the formal from the informal sector.', answer: 'Formal work is registered and protected',
                  options: ['Formal work is registered and protected', '\'informal\' means \'illegal\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'informal\' means \'illegal\' — the vegetable vendor is doing something wrong.' },
                { id: 'b', prompt: 'A street vendor and a factory clerk both earn daily — who is economically safer and why?', answer: 'The clerk — fixed salary, contract, leave, pension',
                  options: ['The clerk — fixed salary, contract, leave, pension', '\'informal\' means \'illegal\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'informal\' means \'illegal\' — the vegetable vendor is doing something wrong.' }
          ],
            remediations: { 'informal-means-illegal-the-vegetable': { steps: ['Run the protection checklist on each worker: contract?', 'All yes = formal; all no = informal.', 'The sector label is about protection, not the work itself.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch16_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think \'informal\' means \'illegal\' — the vegetable vendor is doing something wrong.',
          parts: [
                { id: 'a', prompt: 'Give three examples of informal-sector work.', answer: 'Street vending, daily-wage construction labour, home-based piecework',
                  options: ['Street vending, daily-wage construction labour, home-based piecework', '\'informal\' means \'illegal\''],
                  hint: 'Think about the key idea.',
                  misconception: 'Students think \'informal\' means \'illegal\' — the vegetable vendor is doing something wrong.' }
          ],
            remediations: { 'informal-means-illegal-the-vegetable': { steps: ['Run the protection checklist on each worker: contract?', 'All yes = formal; all no = informal.', 'The sector label is about protection, not the work itself.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch16_039', difficulty: 'standard',
          question: 'Economic activities are actions performed by individuals to earn money.',
          hint: 'Review the "Anu and Kabir" story in the textbook to see examples of varied roles.',
          misconception: 'Students often think that "working hard" or "being busy" automatically makes an activity economic.',
          parts: [
                { id: 'a', prompt: 'If your neighbor spends their weekend painting your house for free because they are your friend, is this an economic activity? Why or why not?', answer: 'No, it is a non-economic activity',
                  options: ['No, it is a non-economic activity', 'productive work', 'working hard', 'being busy'],
                  hint: 'Review the "Anu and Kabir" story in the textbook to see examples of varied roles.',
                  misconception: 'Students often think that "working hard" or "being busy" automatically makes an activity economic.' },
                { id: 'b', prompt: 'A tailor stitches a school uniform and charges ₹200 for it. Identify the type of activity and explain the "value" involved.', answer: 'This is an economic activity',
                  options: ['This is an economic activity', 'service', 'monetary compensation', 'working hard'],
                  hint: 'Review the "Anu and Kabir" story in the textbook to see examples of varied roles.',
                  misconception: 'Students often think that "working hard" or "being busy" automatically makes an activity economic.' }
          ],
            remediations: { 'working-hard-or-being-busy': { steps: ['Ask the student: "Who paid you money for this task?" If the answer is "no one" or "my parents/self," explain that for.', 'Use the example of a professional cleaner versus a family member cleaning to clarify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch16_040', difficulty: 'standard',
          question: 'Workers\' rights are basic protections that ensure people are treated fairly and.',
          hint: 'Review the definitions of economic activities in the textbook (Chapter 13).',
          misconception: 'Students often confuse "rights" with "charity." They might think fair wages are a "gift" from a kind boss.',
          parts: [
                { id: 'a', prompt: 'Name two rights that a worker has to ensure they are not treated unfairly at their workplace.', answer: 'Workers have the right to safe working conditions and the right to fair wages',
                  options: ['Workers have the right to safe working conditions and the right to fair wages', 'getting holidays', 'rights', 'charity'],
                  hint: 'Review the definitions of economic activities in the textbook (Chapter 13).',
                  misconception: 'Students often confuse "rights" with "charity." They might think fair wages are a "gift" from a kind boss.' },
                { id: 'b', prompt: 'Compare the position of a lone worker trying to ask for a raise versus a group of workers forming a trade union to bargain for better conditions.', answer: 'The union is stronger',
                  options: ['The union is stronger', 'rights', 'charity', 'fair wages are a "gift" from a kind boss'],
                  hint: 'Review the definitions of economic activities in the textbook (Chapter 13).',
                  misconception: 'Students often confuse "rights" with "charity." They might think fair wages are a "gift" from a kind boss.' }
          ],
            remediations: { 'students-often-confuse-rights-with': { steps: ['If a student thinks rights are optional, ask them: "If you played a game of cricket, would it be fair if the umpire let.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c6_civics_ch16_041', difficulty: 'standard',
          question: 'The government’s role in the economy involves providing essential public.',
          hint: 'Review the definition of economic activity from Chapter 13.',
          misconception: 'Students often think "the economy" only refers to large banks or stock markets and ignore their own daily lives.',
          parts: [
                { id: 'a', prompt: 'Name two examples of "public goods" that the government provides because the private market might not provide them adequately.', answer: 'Roads and public hospitals',
                  options: ['Roads and public hospitals', 'the economy'],
                  hint: 'Review the definition of economic activity from Chapter 13.',
                  misconception: 'Students often think "the economy" only refers to large banks or stock markets and ignore their own daily lives.' },
                { id: 'b', prompt: 'Why does the government pass "labour laws" and "consumer protection laws"?', answer: 'To prevent exploitation and ensure fairness',
                  options: ['To prevent exploitation and ensure fairness', 'the economy'],
                  hint: 'Review the definition of economic activity from Chapter 13.',
                  misconception: 'Students often think "the economy" only refers to large banks or stock markets and ignore their own daily lives.' },
                { id: 'c', prompt: 'If a company creates a "monopoly" (where it is the only one selling a product), why might the government intervene?', answer: 'To stop the company from charging unfair prices or crushing competition',
                  options: ['To stop the company from charging unfair prices or crushing competition', 'the economy'],
                  hint: 'Review the definition of economic activity from Chapter 13.',
                  misconception: 'Students often think "the economy" only refers to large banks or stock markets and ignore their own daily lives.' }
          ],
            remediations: { 'the-economy-only-refers-to': { steps: ['Ask the student to list three things they used today that were provided by the government (e.g., a sidewalk,.', 'Ask them who would pay for these if the government didn\'t exist.', 'Explain that the government uses tax money from everyone to ensure these services are available for all.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
