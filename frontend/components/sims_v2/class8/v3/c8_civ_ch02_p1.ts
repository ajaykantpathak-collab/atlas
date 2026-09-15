import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch02_p1: SimDef = {
    id: 'v3_c8_civ_ch02_p1',
    title: 'The Parliamentary System: Legislature and Executive · Part 1/2',
    subtitle: 'Watch a government that can fall with a single vote',
    classLevel: 8, subject: 'civics', topic: 'The Parliamentary System: Legislature and Executive · Part 1/2',
    chapters: ['c8_civ_ch02'],
    nodeIds: ['c8_civ_ch2_1', 'c8_civ_ch2_10', 'c8_civ_ch2_11', 'c8_civ_ch2_12', 'c8_civ_ch2_2', 'c8_civ_ch2_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an MP inside Parliament', intro: 'You\'ve won your seat. Now discover the rules of the building: who makes laws, who must answer for them, and how 543 elected people can dismiss a government before lunch.', goal: 'Understand the parliamentary system — legislature-executive interdependence, the two Houses, and accountability mechanisms like Question Hour and no-confidence motions.' },
    discovery: {
        question: 'The Prime Minister runs the country — but can be thrown out mid-term if Parliament passes a no-confidence motion, and must answer MPs\' questions every Question Hour. Why did India\'s founders tie the executive\'s leash to the legislature?',
        options: ['In a parliamentary system the executive must keep the legislature\'s confidence — accountability is built into the job, not optional', 'The President secretly controls the Prime Minister anyway', 'So the judiciary can veto any decision instantly', 'Because India copied a system that doesn\'t actually work'],
        answer: 'In a parliamentary system the executive must keep the legislature\'s confidence — accountability is built into the job, not optional',
        hook: 'Power that answers questions daily and falls on a single vote of confidence — that\'s the parliamentary deal. The government governs only as long as Parliament lets it.',
    },
    teaching: [
        { title: 'Parliamentary System: Definition and Key Features', text: 'The parliamentary system is a form of democratic government where the executive branch derives its democratic legitimacy from, and is accountable to, the legislature (Parliament).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch2_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sit inside the machinery: watch a bill travel through Lok Sabha and Rajya Sabha, watch ministers face Question Hour, and test what happens when the House stops trusting the government.',
        labels: ['Parliamentary System: Definition', 'State Legislature: Vidhan Sabha', 'State Executive: Governor', 'Separation of Powers: Legislature,', 'Constitution of India: Foundation', 'Parliament of India: Lok'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch2_11', title: 'State Executive: Governor and Chief Minister',
          caseStudy: { intro: 'When citizens read in the morning newspaper that the Chief Minister of their state has launched a new free textbook scheme after winning state assembly.',
            decisions: [{ prompt: 'Who is the constitutional and ceremonial head of an Indian state, appointed by the President of India?', options: [
                { text: 'The Governor is the constitutional and ceremonial head of the state', outcome: 'The Governor is the constitutional and ceremonial head of the state.' },
                { text: 'the Chief Minister or the Speaker', outcome: 'Not quite — Students often think that the Governor runs the day-to-day administration of the state and makes.', reveals: 'the-governor-runs-the-day' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch2_12', title: 'Separation of Powers: Legislature, Executive, Judiciary',
          caseStudy: { intro: 'Imagine you are watching a televised debate where a new law about digital privacy is proposed, signed into effect by the government, and later challenged.',
            decisions: [{ prompt: 'Which branch of government is constitutionally responsible for drafting, debating, and passing new laws?', options: [
                { text: 'The Legislature (Parliament at the national level and State Legislature at the state', outcome: 'The Legislature (Parliament at the national level and State Legislature at the state level).' },
                { text: 'the executive or judiciary', outcome: 'Not quite — Students often think that because the Prime Minister and Cabinet Ministers sit in Parliament (the.', reveals: 'because-the-prime-minister-and' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'During a mock-parliament club session, a student says: \'Indians vote directly for the Prime Minister, and once chosen he rules for a fixed term no matter what MPs do — just like a president.\'',
            decisions: [{ prompt: 'What is the correct picture of India\'s system?', options: [
                { text: 'Citizens elect MPs; the majority party or coalition in the Lok Sabha picks the Prime Minister from among them. The executive sits inside the legislature and survives only while it keeps the house\'s confidence — MPs can question ministers daily and a lost majority vote brings the government down.', outcome: 'This captures the defining feature of a parliamentary system: the executive is drawn from the legislature and continuously accountable to it.' },
                { text: 'The student is right — the PM is chosen in a separate national ballot and cannot be removed mid-term.', outcome: 'That describes a presidential system; India has no direct executive ballot, and a no-confidence motion can end a government any day.', reveals: 'pm-is-president' },
                { text: 'Neither — the President appoints anyone he likes as Prime Minister, so the legislature plays no role at all.', outcome: 'The President appoints whoever commands the Lok Sabha majority; the choice flows from the elected house, not personal preference.', reveals: 'president-picks-pm' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch2_3', title: 'The bigger picture',
          caseStudy: { intro: 'Parliament makes the laws AND keeps the rulers on probation. Question Hour, debates and no-confidence motions are how \'rule by the people\' stays honest between elections.',
            decisions: [{ prompt: 'What comes next? The Parliamentary System: Legislature and Executive · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The Parliamentary System: Legislature and Executive · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch2_1', difficulty: 'standard',
          question: 'The parliamentary system is a form of democratic government where the executive.',
          hint: 'Review c7_civ_ch03_002 to re-familiarize yourself with the three organs of government.',
          misconception: 'Students often confuse the parliamentary system with a presidential system, believing that the Prime Minister.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The parliamentary system is a form of democratic government where the executive branch',
                  options: ['The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state', 'The Separation of Powers is a core constitutional principle that divides the'],
                  hint: 'Review c7_civ_ch03_002 to re-familiarize yourself with the three organs of government.',
                  misconception: 'Students often confuse the parliamentary system with a presidential system, believing that the Prime Minister is elected directly.' }
          ],
            remediations: { 'students-often-confuse-the-parliamentary': { steps: ['To fix this misconception, trace the exact path of leadership: Step 1, citizens vote for individual MPs in their local.', 'Step 2, the political party or coalition that wins a majority of those Lok Sabha seats is invited to form the.', 'Step 3, the elected MPs of that winning party choose their parliamentary leader, who is then appointed Prime Minister.', 'Review this sequence to show that executive power flows directly out of the legislature\'s composition.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_10', difficulty: 'standard',
          question: 'The State Legislature is the lawmaking body for an individual state in India.',
          hint: 'Review c8_civ_ch2_3 to remember how bicameral bodies operate at the national level before.',
          misconception: 'Students often think that every state in India automatically has two houses (Vidhan Sabha and Vidhan Parishad) just.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The State Legislature is the lawmaking body for an individual state in India, structured',
                  options: ['The State Legislature is the lawmaking body for an individual state in India, structured', 'The parliamentary system is a form of democratic government where the executive branch', 'The state executive consists of the Governor (the constitutional head of the state', 'The Separation of Powers is a core constitutional principle that divides the'],
                  hint: 'Review c8_civ_ch2_3 to remember how bicameral bodies operate at the national level before comparing.',
                  misconception: 'Students often think that every state in India automatically has two houses (Vidhan Sabha and Vidhan Parishad) just like the national.' }
          ],
            remediations: { 'every-state-in-india-automatically': { steps: ['To fix this misconception, review the map of Indian state legislatures and point out that while Parliament is always.', 'Explain that the Constitution allows states to choose a unicameral system (Vidhan Sabha only) to suit their.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_11', difficulty: 'standard',
          question: 'The state executive consists of the Governor (the constitutional head of the.',
          hint: 'Review the structure of Parliament and the Central Executive (President and Prime.',
          misconception: 'Students often think that the Governor runs the day-to-day administration of the state and makes all major policy.',
          parts: [
                { id: 'a', prompt: 'Who is the constitutional and ceremonial head of an Indian state, appointed by the President of India?', answer: 'The Governor is the constitutional and ceremonial head of the state',
                  options: ['The Governor is the constitutional and ceremonial head of the state', 'the Chief Minister or the Speaker'],
                  hint: 'Review the structure of Parliament and the Central Executive (President and Prime Minister) to see.',
                  misconception: 'Students often think that the Governor runs the day-to-day administration of the state and makes all major policy decisions because they.' }
          ],
            remediations: { 'the-governor-runs-the-day': { steps: ['To fix this misconception, use a cricket team analogy: The Governor is like the stadium owner or referee who ensures.', 'Remind students of Article 163, which explicitly states that the Governor acts on the "aid and advice" of the Chief.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_12', difficulty: 'standard',
          question: 'The Separation of Powers is a core constitutional principle that divides the.',
          hint: 'Review c7_civ_ch03_002 to re-familiarize yourself with the core definitions of the three.',
          misconception: 'Students often think that because the Prime Minister and Cabinet Ministers sit in Parliament (the legislature), the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Separation of Powers is a core constitutional principle that divides the',
                  options: ['The Separation of Powers is a core constitutional principle that divides the', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review c7_civ_ch03_002 to re-familiarize yourself with the core definitions of the three organs.',
                  misconception: 'Students often think that because the Prime Minister and Cabinet Ministers sit in Parliament (the legislature), the legislature and.' }
          ],
            remediations: { 'because-the-prime-minister-and': { steps: ['To fix this, clarify the difference between *membership* and *function*.', 'Explain that while ministers wear two hats—they are members of Parliament (legislature) AND heads of departments.', 'Use the example of a minister introducing a bill (legislative role) versus signing an order to build a highway.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_2', difficulty: 'standard',
          question: 'The Constitution of India is the supreme legal and political document that.',
          hint: 'Review the basic definition of a constitution from Class 7 (c7_civ_ch02_001) and examine.',
          misconception: 'Students often believe that because Parliament is democratically elected, it can create any law it wishes, including.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Constitution of India is the supreme legal and political document that establishes',
                  options: ['The Constitution of India is the supreme legal and political document that establishes', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review the basic definition of a constitution from Class 7 (c7_civ_ch02_001) and examine how.',
                  misconception: 'Students often believe that because Parliament is democratically elected, it can create any law it wishes, including laws that take away.' }
          ],
            remediations: { 'because-parliament-is-democratically-elected': { steps: ['To fix this misconception, use the analogy of a school sports match: even if the team captain is elected by the.', 'Similarly, explain that Indian citizens and political leaders agreed to the rulebook of the Constitution in 1950, and.', 'Review Article 13 of the Constitution, which explicitly states that any law inconsistent with fundamental rights.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch2_3', difficulty: 'standard',
          question: 'The Parliament of India is the supreme legislative body of the nation.',
          hint: 'Review c8_civ_ch2_1 and c6_civics_ch12_020 to reinforce the core differences between.',
          misconception: 'Students often think that the Lok Sabha and Rajya Sabha possess completely equal powers in all legislative matters.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Parliament of India is the supreme legislative body of the nation, consisting of the',
                  options: ['The Parliament of India is the supreme legislative body of the nation, consisting of the', 'The parliamentary system is a form of democratic government where the executive branch', 'The State Legislature is the lawmaking body for an individual state in India, structured', 'The state executive consists of the Governor (the constitutional head of the state'],
                  hint: 'Review c8_civ_ch2_1 and c6_civics_ch12_020 to reinforce the core differences between legislative.',
                  misconception: 'Students often think that the Lok Sabha and Rajya Sabha possess completely equal powers in all legislative matters, including financial.' }
          ],
            remediations: { 'the-lok-sabha-and-rajya': { steps: ['To fix this, review the distinct constitutional powers of both houses using a comparative chart.', 'Emphasize that the Lok Sabha controls the executive (via no-confidence motions) and holds exclusive power over Money.', 'Ask students to trace a Money Bill\'s journey to see that the Rajya Sabha can only delay it for 14 days.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
