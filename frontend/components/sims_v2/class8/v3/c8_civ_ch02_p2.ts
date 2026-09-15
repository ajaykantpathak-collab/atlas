import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch02_p2: SimDef = {
    id: 'v3_c8_civ_ch02_p2',
    title: 'The Parliamentary System: Legislature and Executive · Part 2/2',
    subtitle: 'Watch a government that can fall with a single vote',
    classLevel: 8, subject: 'civics', topic: 'The Parliamentary System: Legislature and Executive · Part 2/2',
    chapters: ['c8_civ_ch02'],
    nodeIds: ['c8_civ_ch2_4', 'c8_civ_ch2_5', 'c8_civ_ch2_6', 'c8_civ_ch2_7', 'c8_civ_ch2_8', 'c8_civ_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an MP inside Parliament', intro: 'You\'ve won your seat. Now discover the rules of the building: who makes laws, who must answer for them, and how 543 elected people can dismiss a government before lunch.', goal: 'Understand the parliamentary system — legislature-executive interdependence, the two Houses, and accountability mechanisms like Question Hour and no-confidence motions.' },
    discovery: {
        question: 'The Prime Minister runs the country — but can be thrown out mid-term if Parliament passes a no-confidence motion, and must answer MPs\' questions every Question Hour. Why did India\'s founders tie the executive\'s leash to the legislature?',
        options: ['In a parliamentary system the executive must keep the legislature\'s confidence — accountability is built into the job, not optional', 'The President secretly controls the Prime Minister anyway', 'So the judiciary can veto any decision instantly', 'Because India copied a system that doesn\'t actually work'],
        answer: 'In a parliamentary system the executive must keep the legislature\'s confidence — accountability is built into the job, not optional',
        hook: 'Power that answers questions daily and falls on a single vote of confidence — that\'s the parliamentary deal. The government governs only as long as Parliament lets it.',
    },
    teaching: [
        { title: 'Lok Sabha: Directly Elected House of the People', text: 'The Lok Sabha is the lower house of the Parliament of India, composed of representatives directly elected by the citizens of India through universal adult suffrage under Article 326 of the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch2_4', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit inside the machinery: watch a bill travel through Lok Sabha and Rajya Sabha, watch ministers face Question Hour, and test what happens when the House stops trusting the government.',
        labels: ['Lok Sabha: Directly Elected', 'Rajya Sabha: Council', 'Functions of Parliament: Lawmaking,', 'Executive Branch: President, Prime', 'Prime Minister: Head', 'President: Constitutional Head'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch2_5', title: 'Rajya Sabha: Council of States (Indirect Election)',
          caseStudy: { intro: 'Imagine watching the news and hearing that MLAs from your state legislature are voting to send representatives to Delhi, even though you did not vote for those.',
            decisions: [{ prompt: 'What is another name for the Rajya Sabha as established by the Indian Constitution?', options: [
                { text: 'The Rajya Sabha is also known as the Council of States', outcome: 'The Rajya Sabha is also known as the Council of States. A wrong answer like "House of the People".' },
                { text: 'House of the People', outcome: 'Not quite — Students often confuse the election process of the Rajya Sabha with that of the Lok Sabha.', reveals: 'students-often-confuse-the-election' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch2_6', title: 'Functions of Parliament: Lawmaking, Budget, Oversight',
          caseStudy: { intro: 'When citizens watch a live broadcast of the Lok Sabha on television, they often see Members of Parliament shouting questions or debating a new education.',
            decisions: [{ prompt: 'What is the primary constitutional name for the annual financial statement that the Parliament must approve before the government can spend.', options: [
                { text: 'the Annual Financial Statement, commonly referred to as the Budget (Article 112)', outcome: 'The correct answer is the Annual Financial Statement, commonly referred to as the Budget (Article.' },
                { text: 'tax report', outcome: 'Not quite — Students often believe that the Prime Minister and the Cabinet independently write, pass, and fund.', reveals: 'the-prime-minister-and-the' },
                { text: 'audit statement', outcome: 'Not quite — Students often believe that the Prime Minister and the Cabinet independently write, pass, and fund.', reveals: 'the-prime-minister-and-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch2_4', title: 'Use it in the wild',
          caseStudy: { intro: 'During a mock-parliament club session, a student says: \'Indians vote directly for the Prime Minister, and once chosen he rules for a fixed term no matter what MPs do — just like a president.\'',
            decisions: [{ prompt: 'What is the correct picture of India\'s system?', options: [
                { text: 'Citizens elect MPs; the majority party or coalition in the Lok Sabha picks the Prime Minister from among them. The executive sits inside the legislature and survives only while it keeps the house\'s confidence — MPs can question ministers daily and a lost majority vote brings the government down.', outcome: 'This captures the defining feature of a parliamentary system: the executive is drawn from the legislature and continuously accountable to it.' },
                { text: 'The student is right — the PM is chosen in a separate national ballot and cannot be removed mid-term.', outcome: 'That describes a presidential system; India has no direct executive ballot, and a no-confidence motion can end a government any day.', reveals: 'pm-is-president' },
                { text: 'Neither — the President appoints anyone he likes as Prime Minister, so the legislature plays no role at all.', outcome: 'The President appoints whoever commands the Lok Sabha majority; the choice flows from the elected house, not personal preference.', reveals: 'president-picks-pm' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Parliament makes the laws AND keeps the rulers on probation. Question Hour, debates and no-confidence motions are how \'rule by the people\' stays honest between elections.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch2_4', difficulty: 'standard',
          question: 'The Lok Sabha is the lower house of the Parliament of India, composed.',
          hint: 'Review Class 6 topic c6_civics_ch11_012 on how elections work and universal adult.',
          misconception: 'Students often confuse the Lok Sabha with the Rajya Sabha, believing that members of both houses are directly elected.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Lok Sabha is the lower house of the Parliament of India, composed of representatives',
                  options: ['The Lok Sabha is the lower house of the Parliament of India, composed of representatives', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review Class 6 topic c6_civics_ch11_012 on how elections work and universal adult suffrage.',
                  misconception: 'Students often confuse the Lok Sabha with the Rajya Sabha, believing that members of both houses are directly elected by citizens.' }
          ],
            remediations: { 'students-often-confuse-the-lok': { steps: ['To fix this, review the voting process: ask students who votes in their local panchayat election vs.', 'who selects representatives for higher bodies.', 'Explain that for the Lok Sabha, you walk into a booth and vote for an MP, whereas for the Rajya Sabha, MLAs vote.', 'Contrast direct public voting with indirect legislative voting using a simple two-step diagram.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_5', difficulty: 'standard',
          question: 'The Rajya Sabha, or Council of States, is the Upper House of the Indian.',
          hint: 'Review the electoral process of State Legislative Assemblies in c6_civics_ch12_019 and.',
          misconception: 'Students often confuse the election process of the Rajya Sabha with that of the Lok Sabha, incorrectly assuming that.',
          parts: [
                { id: 'a', prompt: 'What is another name for the Rajya Sabha as established by the Indian Constitution?', answer: 'The Rajya Sabha is also known as the Council of States',
                  options: ['The Rajya Sabha is also known as the Council of States', 'House of the People'],
                  hint: 'Review the electoral process of State Legislative Assemblies in c6_civics_ch12_019 and how federal.',
                  misconception: 'Students often confuse the election process of the Rajya Sabha with that of the Lok Sabha, incorrectly assuming that ordinary citizens vote.' }
          ],
            remediations: { 'students-often-confuse-the-election': { steps: ['To fix this, guide the student through a comparison of who casts a ballot in each election: point out that for the Lok.', 'Use a concrete example from their state assembly to show how MLAs form the electoral college for the Council of States.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_6', difficulty: 'standard',
          question: 'The Parliament of India exercises three primary constitutional functions.',
          hint: 'Review c8_civ_ch2_3 and c7_civ_ch03_003 to clarify the basic structure of Parliament and.',
          misconception: 'Students often believe that the Prime Minister and the Cabinet independently write, pass, and fund laws without needing.',
          parts: [
                { id: 'a', prompt: 'What is the primary constitutional name for the annual financial statement that the Parliament must approve before the government can spend public money?', answer: 'the Annual Financial Statement, commonly referred to as the Budget (Article 112)',
                  options: ['the Annual Financial Statement, commonly referred to as the Budget (Article 112)', 'tax report', 'audit statement'],
                  hint: 'Review c8_civ_ch2_3 and c7_civ_ch03_003 to clarify the basic structure of Parliament and the core.',
                  misconception: 'Students often believe that the Prime Minister and the Cabinet independently write, pass, and fund laws without needing Parliament\'s.' }
          ],
            remediations: { 'the-prime-minister-and-the': { steps: ['To fix this, guide the student step-by-step through the constitutional rule: (1) Point out that ministers are part.', '(2) Explain that even if the Prime Minister wants a policy, it remains just an idea until a Bill is formally debated.', '(3) Emphasize Article 265, which states that no tax can be levied or collected except by authority of law passed.', '(4) Use a real-world example like the Union Budget: show how the Finance Minister must present it to Parliament for.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_7', difficulty: 'standard',
          question: 'The executive branch is the organ of government responsible for administering.',
          hint: 'Review the distinction between nominal executive (President) and real executive (Prime.',
          misconception: 'Students often believe that the President of India makes laws and runs the country independently because the President.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The executive branch is the organ of government responsible for administering and',
                  options: ['The executive branch is the organ of government responsible for administering and', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review the distinction between nominal executive (President) and real executive (Prime Minister and.',
                  misconception: 'Students often believe that the President of India makes laws and runs the country independently because the President signs all major.' }
          ],
            remediations: { 'the-president-of-india-makes': { steps: ['To fix this misconception, examine a real newspaper clipping of a Union Cabinet meeting chaired by the Prime Minister.', 'Ask students: Who sits in this meeting, elected MPs or the President?', 'Point out that the President acts only on ministerial advice under Article 74.', 'Trace the journey of a policy: the Cabinet decides, Parliament passes, the President signs, and the administration.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_8', difficulty: 'standard',
          question: 'The Prime Minister is the head of the government in India\'s parliamentary.',
          hint: 'Review c8_civ_ch2_7 to re-examine the division between the political executive.',
          misconception: 'Students often think the Prime Minister is elected directly by all Indian citizens on a single ballot paper, similar.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Prime Minister is the head of the government in India\'s parliamentary system,',
                  options: ['The Prime Minister is the head of the government in India\'s parliamentary system,', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review c8_civ_ch2_7 to re-examine the division between the political executive (ministers) and.',
                  misconception: 'Students often think the Prime Minister is elected directly by all Indian citizens on a single ballot paper, similar to how a US President.' }
          ],
            remediations: { 'the-prime-minister-is-elected': { steps: ['To fix this misconception, trace a real election cycle: explain that when a citizen votes in an Indian general.', 'Show how individual MPs from the winning party then gather in Parliament to recognize their parliamentary leader, who.', 'Reiterate that India has a parliamentary democracy, not a presidential one.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_9', difficulty: 'standard',
          question: 'The President of India is the constitutional head of state and the first.',
          hint: 'Review c8_civ_ch2_7 to clarify the distinction between the President\'s nominal powers and.',
          misconception: 'Students frequently confuse the roles of the President and the Prime Minister, assuming the President runs the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The President of India is the constitutional head of state and the first citizen of the',
                  options: ['The President of India is the constitutional head of state and the first citizen of the', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review c8_civ_ch2_7 to clarify the distinction between the President\'s nominal powers and the Prime.',
                  misconception: 'Students frequently confuse the roles of the President and the Prime Minister, assuming the President runs the government ministries.' }
          ],
            remediations: { 'students-frequently-confuse-the-roles': { steps: ['Remind students of the daily news where the Prime Minister announces economic policies while the President gives formal.', 'Read Article 74, which states there shall be a Council of Ministers with the Prime Minister at the head to aid and.', 'Clarify that the President signs documents because the Constitution requires it, but the decisions originate from the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
