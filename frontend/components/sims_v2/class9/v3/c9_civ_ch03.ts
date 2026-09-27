import type { SimDef } from '../../engine/types';

/** v3 generated — c9_civ_ch03 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_civ_ch03: SimDef = {
    id: 'v3_c9_civ_ch03',
    title: 'Authority',
    subtitle: 'This node covers the conceptual difference between power and authority, the legitimacy.',
    classLevel: 9, subject: 'civics', topic: 'Authority',
    chapters: ['c9_civ_ch03'],
    nodeIds: ['c9_civ_ch3_1', 'c9_civ_ch3_2', 'c9_civ_ch3_3', 'c9_civ_ch3_4', 'c9_civ_ch3_5', 'c9_civ_ch3_6'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 9 learner', intro: 'Start with a relatable scenario: a student sees a classmate breaking school rules and tells them to stop, but.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'What are the three organs of government that exercise state authority in India?',
        options: ['The three organs are the legislature, executive, and judiciary', 'President, Prime Minister, and Chief Justice', 'the executive (e'],
        answer: 'The three organs are the legislature, executive, and judiciary',
        hook: 'Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the power to make laws.',
    },
    teaching: [
        { title: 'What is Authority? Power vs Authority', text: 'Authority is the legitimate right to exercise power, make decisions, and enforce obedience based on a recognized position, law, or constitution, whereas power is the ability to influence or control.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_civ_ch3_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        labels: ['What is Authority? Power', 'Types of Authority: Traditional,', 'State Authority and Its', 'Legitimacy: Why People Obey', 'Checks and Balances', 'Authority in Everyday Life'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_civ_ch3_1', title: 'What is Authority? Power vs Authority',
          caseStudy: { intro: 'Start with a relatable scenario: a student sees a classmate breaking school rules and tells them to stop, but the classmate ignores them.',
            decisions: [{ prompt: 'What is the main difference between power and authority in political science?', options: [
                { text: 'Power is the ability to influence or control others, while authority is the legitimate', outcome: 'Power is the ability to influence or control others, while authority is the legitimate right.' },
                { text: 'power and authority mean the same thing', outcome: 'Not quite — Students often think that authority is simply the ability to get others to obey, equating it with.', reveals: 'authority-is-simply-the-ability' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch3_3', title: 'State Authority and Its Institutions',
          caseStudy: { intro: 'Start with a relatable scenario: a student sees a news report about a new education policy being introduced, then later hears that some schools are not.',
            decisions: [{ prompt: 'What are the three organs of government that exercise state authority in India?', options: [
                { text: 'The three organs are the legislature, executive, and judiciary', outcome: 'The three organs are the legislature, executive, and judiciary.' },
                { text: 'President, Prime Minister, and Chief Justice', outcome: 'Not quite — Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the.', reveals: 'the-executive-e' },
                { text: 'the executive (e', outcome: 'Not quite — Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the.', reveals: 'the-executive-e' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch3_5', title: 'Checks and Balances on Authority',
          caseStudy: { intro: 'Start with a relatable scenario: a news report where the Prime Minister proposes a new law, but the President sends it back for reconsideration, and later the.',
            decisions: [{ prompt: 'What is the meaning of \'checks and balances\' in the context of the Indian government?', options: [
                { text: 'Checks and balances refer to the system where each branch of government (legislature,', outcome: 'Checks and balances refer to the system where each branch of government (legislature, executive.' },
                { text: 'checks and balances mean the branches always disagree', outcome: 'Not quite — Students often think that checks and balances mean the judiciary can control or direct the.', reveals: 'checks-and-balances-mean-the' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch3_6', title: 'Authority in Everyday Life: School, Family, Community',
          caseStudy: { intro: 'Start with a relatable scenario: a student argues with a teacher about homework deadlines, claiming the teacher has no right to punish them.',
            decisions: [{ prompt: 'What is the main basis of authority in everyday life settings like school or family?', options: [
                { text: 'The main basis is the accepted role or position (e.g., teacher, parent) backed by social', outcome: 'The main basis is the accepted role or position (e.g., teacher, parent) backed by social norms.' },
                { text: 'authority comes from being able to punish others', outcome: 'Not quite — Students often think that authority in school or home means the person in charge can do anything.', reveals: 'authority-in-school-or-home' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch3_6', title: 'You made it',
          caseStudy: { intro: 'You finished Authority — every node, every misconception, earned not given.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch3_1', difficulty: 'standard',
          question: 'Authority is the legitimate right to exercise power, make decisions, and.',
          hint: 'If stuck, review the concept of democracy from Class 8 (c8_civ_ch2_1) and the idea that.',
          misconception: 'Students often think that authority is simply the ability to get others to obey, equating it with power, and believe.',
          parts: [
                { id: 'a', prompt: 'Why does a police officer have the authority to arrest someone, but a private citizen generally does not, even if both have the physical power to detain.', answer: 'A police officer has authority',
                  options: ['A police officer has authority', 'the police officer is stronger'],
                  hint: 'If stuck, review the concept of democracy from Class 8 (c8_civ_ch2_1) and the idea that legitimate.',
                  misconception: 'Students often think that authority is simply the ability to get others to obey, equating it with power, and believe that a popular student.' }
          ],
            remediations: { 'authority-is-simply-the-ability': { steps: ['Use the example of a school strike: students follow a charismatic peer’s call to protest (showing the peer’s power).', 'Guide students to ask: "Does this person’s right to decide come from a rule, election, or position?" Then refer to how.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch3_2', difficulty: 'standard',
          question: 'Traditional authority is legitimacy based on long-established customs and.',
          hint: 'Review c9_civ_ch3_1: What is Authority? Power vs Authority, focusing on the definition.',
          misconception: 'Students often believe that charismatic authority simply means a leader is popular or well-liked, confusing it with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Traditional authority is legitimacy based on long-established customs and hereditary',
                  options: ['Traditional authority is legitimacy based on long-established customs and hereditary', 'Authority is the legitimate right to exercise power, make decisions, and enforce', 'State authority refers to the legitimate power exercised by the institutions of the', 'Legitimacy is the belief by people that an authority or government has the right to rule'],
                  hint: 'Review c9_civ_ch3_1: What is Authority? Power vs Authority, focusing on the definition of authority.',
                  misconception: 'Students often believe that charismatic authority simply means a leader is popular or well-liked, confusing it with mass appeal.' }
          ],
            remediations: { 'charismatic-authority-simply-means-a': { steps: ['Use the example of Bhagat Singh: show students a short clip or reading about his courage, sacrifice, and the deep.', 'Contrast this with a class monitor elected by vote who enforces silence during study hour.', 'Ask: Why did people follow Bhagat Singh even though he held no office?', 'Because they believed in his extraordinary courage and vision (charismatic).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch3_3', difficulty: 'standard',
          question: 'State authority refers to the legitimate power exercised by the institutions.',
          hint: 'If stuck, revisit the difference between "government" and "state" (c7_civ_ch03_001) and.',
          misconception: 'Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the power to make laws.',
          parts: [
                { id: 'a', prompt: 'What are the three organs of government that exercise state authority in India?', answer: 'The three organs are the legislature, executive, and judiciary',
                  options: ['The three organs are the legislature, executive, and judiciary', 'President, Prime Minister, and Chief Justice', 'the executive (e'],
                  hint: 'If stuck, revisit the difference between "government" and "state" (c7_civ_ch03_001) and review.',
                  misconception: 'Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the power to make laws independently, such as.' },
                { id: 'b', prompt: 'Why does the Indian Constitution separate state authority among the legislature, executive, and judiciary?', answer: 'The separation prevents any single institution from gaining too much power',
                  options: ['The separation prevents any single institution from gaining too much power', 'to make government work faster', 'the executive (e'],
                  hint: 'If stuck, revisit the difference between "government" and "state" (c7_civ_ch03_001) and review.',
                  misconception: 'Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the power to make laws independently, such as.' }
          ],
            remediations: { 'the-executive-e': { steps: ['Use a real example: show a news clip where a state government announces a new welfare scheme, then explain that while.', 'Contrast this with a case where an executive order was struck down by a court (e.g., a ban on protests without.', 'Emphasize that even executive actions like policies or orders must either implement existing laws or be authorized.', 'This reinforces that lawmaking remains exclusively legislative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch3_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the power to make laws.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Governor of a state has more real power than the Chief Minister because the Governor is appointed by the President."', answer: 'The statement is false',
                  options: ['The statement is false', 'the executive (e'],
                  hint: 'If stuck, revisit the difference between "government" and "state" (c7_civ_ch03_001) and review.',
                  misconception: 'Students often believe that the executive (e.g., the Prime Minister or Chief Minister) has the power to make laws independently, such as.' }
          ],
            remediations: { 'the-executive-e': { steps: ['Use a real example: show a news clip where a state government announces a new welfare scheme, then explain that while.', 'Contrast this with a case where an executive order was struck down by a court (e.g., a ban on protests without.', 'Emphasize that even executive actions like policies or orders must either implement existing laws or be authorized.', 'This reinforces that lawmaking remains exclusively legislative.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch3_4', difficulty: 'standard',
          question: 'Legitimacy is the belief by people that an authority or government has the.',
          hint: 'Review the three types of authority (traditional, charismatic, legal-rational) from node.',
          misconception: 'Students often think legitimacy means people obey authority because they fear punishment if they don\'t, believing that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Legitimacy is the belief by people that an authority or government has the right to rule',
                  options: ['Legitimacy is the belief by people that an authority or government has the right to rule', 'Authority is the legitimate right to exercise power, make decisions, and enforce', 'Traditional authority is legitimacy based on long-established customs and hereditary', 'State authority refers to the legitimate power exercised by the institutions of the'],
                  hint: 'Review the three types of authority (traditional, charismatic, legal-rational) from node.',
                  misconception: 'Students often think legitimacy means people obey authority because they fear punishment if they don\'t, believing that strict enforcement.' }
          ],
            remediations: { 'legitimacy-means-people-obey-authority': { steps: ['Use the example of traffic rules: ask students why they stop at red lights when no police are present.', 'Guide them to recognize it\'s not just fear of fines but belief in the rule\'s purpose for safety and fairness.', 'Then connect to governance: legitimate authority is obeyed because people internalize the rules as rightful, similar.', 'Emphasize building legitimacy through transparent, fair processes that people accept as rightful.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch3_5', difficulty: 'standard',
          question: 'Checks and balances refer to the system where each branch of government.',
          hint: 'If stuck, review the functions of the three organs of government from c7_civ_ch03_002.',
          misconception: 'Students often think that checks and balances mean the judiciary can control or direct the executive and legislature.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Checks and balances refer to the system where each branch of government (legislature,',
                  options: ['Checks and balances refer to the system where each branch of government (legislature,', 'Authority is the legitimate right to exercise power, make decisions, and enforce', 'Traditional authority is legitimacy based on long-established customs and hereditary', 'State authority refers to the legitimate power exercised by the institutions of the'],
                  hint: 'If stuck, review the functions of the three organs of government from c7_civ_ch03_002, especially.',
                  misconception: 'Students often think that checks and balances mean the judiciary can control or direct the executive and legislature in day-to-day.' }
          ],
            remediations: { 'checks-and-balances-mean-the': { steps: ['To fix this, use a real example: show a news clip where the Supreme Court refused to direct the government on economic.', 'Explain that the court said, "We cannot fix prices; that’s the executive’s job, but we can check if your rule violates.', 'This reinforces that judicial review is about legality, not governance.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch3_6', difficulty: 'standard',
          question: 'Authority in everyday life refers to the accepted right of individuals.',
          hint: 'If stuck, revisit c9_civ_ch3_1 (Power vs Authority) and c9_civ_ch3_4 (Legitimacy: Why.',
          misconception: 'Students often think that authority in school or home means the person in charge can do anything they want—like.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Authority in everyday life refers to the accepted right of individuals or institutions',
                  options: ['Authority in everyday life refers to the accepted right of individuals or institutions', 'Authority is the legitimate right to exercise power, make decisions, and enforce', 'Traditional authority is legitimacy based on long-established customs and hereditary', 'State authority refers to the legitimate power exercised by the institutions of the'],
                  hint: 'If stuck, revisit c9_civ_ch3_1 (Power vs Authority) and c9_civ_ch3_4 (Legitimacy: Why People Obey).',
                  misconception: 'Students often think that authority in school or home means the person in charge can do anything they want—like a principal changing exam.' }
          ],
            remediations: { 'authority-in-school-or-home': { steps: ['Use a real example: show a news clip where students protested a sudden school rule change (like banning uniforms.', 'Ask: Why did this cause anger?', 'Then explain that even principals must follow guidelines (e.g., CBSE affiliation rules) and consult.', 'This shows authority fails when it ignores norms, reinforcing that role-based authority has limits.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
