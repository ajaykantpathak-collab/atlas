import type { SimDef } from '../../engine/types';

/** v3 generated — c7_civ_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_civ_ch01_p2: SimDef = {
    id: 'v3_c7_civ_ch01_p2',
    title: 'From the Rulers to the Ruled: Types of Governments · Part 2/2',
    subtitle: 'This node covers the philosophical and constitutional sources of government power.',
    classLevel: 7, subject: 'civics', topic: 'From the Rulers to the Ruled: Types of Governments · Part 2/2',
    chapters: ['c7_civ_ch01'],
    nodeIds: ['c7_civ_ch01_007', 'c7_civ_ch01_008', 'c7_civ_ch01_009', 'c7_civ_ch01_010', 'c7_civ_ch01_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine reading a news report about a general election where millions of citizens queue up outside polling.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A school with no timetable, no rules, and no teachers descends into chaos within minutes. Yet a country of over a billion people keeps its trains, hospitals, and courts running even when leaders change. Who is really keeping it going?',
        options: ['The government — a permanent system of institutions, courts, and civil services, not just the politicians currently in power', 'The Prime Minister personally runs every service', 'Citizens manage everything alone with no coordination', 'Private companies run all public services for free'],
        answer: 'The government — a permanent system of institutions, courts, and civil services, not just the politicians currently in power',
        hook: 'Government is not the face on the news — ministers come and go with elections, but the railways, hospitals, police, and courts keep running. Lawmaking, enforcing, and dispute-settling are split across separate branches so no single hand holds all power.',
    },
    teaching: [
        { title: 'Where Do Governments Get Their Power: Sources of Authority', text: 'The sources of authority refer to the foundational origins and justifications from which a government derives its right to rule, make laws, and exercise political power over its citizens.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_civ_ch01_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'A new island of 500 people needs governing by tonight — list the three functions its government must perform first, and defend why individuals cannot handle them alone.',
        labels: ['Where Do Governments Get', 'How Government Interacts with', 'Why Democracy Matters: Advantages', 'Comparison of Different Types', 'The Indian Parliament: Structure'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_civ_ch01_009', title: 'Why Democracy Matters: Advantages and Principles',
          caseStudy: { intro: 'Imagine two classrooms in a school: in Classroom A, the monitor makes all the rules alone without listening to anyone; in Classroom B, all students discuss.',
            decisions: [{ prompt: 'Which core principle of democracy ensures that all adult citizens have the right to vote regardless of their caste, religion, wealth,.', options: [
                { text: 'Universal adult franchise', outcome: 'Universal adult franchise. A student who answers "majoritarian rule" or "hereditary succession".' },
                { text: 'majoritarian rule', outcome: 'Not quite — Students often think that democracy simply means "whatever the majority of people want, the.', reveals: 'democracy-simply-means-whatever-the' },
                { text: 'hereditary succession', outcome: 'Not quite — Students often think that democracy simply means "whatever the majority of people want, the.', reveals: 'democracy-simply-means-whatever-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_011', title: 'The Indian Parliament: Structure and Function',
          caseStudy: { intro: 'Imagine watching a live broadcast on television where elected representatives in New Delhi are debating a brand-new national education policy, asking tough.',
            decisions: [{ prompt: 'Which Article of the Constitution of India establishes the Parliament, and what are its three components?', options: [
                { text: 'Article 79 establishes the Parliament of India', outcome: 'Article 79 establishes the Parliament of India, which consists of the President, the Lok Sabha.' },
                { text: 'the President of India writes and creates the laws', outcome: 'Not quite — Students often believe that the Prime Minister and the Cabinet make laws entirely on their own.', reveals: 'the-prime-minister-and-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a dinner debate, an uncle argues: \'We barely need government — a billionaire could fund schools and fix roads if he wanted. Rich people could run everything better anyway.\'',
            decisions: [{ prompt: 'What can a government do that a billionaire simply cannot?', options: [
                { text: 'Govern — law and order, courts and defence apply to everyone equally and are backed by the authority to enforce them; a billionaire\'s money buys services only for those he chooses, binds nobody, and answers to no one. Governments exist because shared rules and public goods must cover the whole society, not just the funder\'s favourites — when a government collapses, markets and safety collapse with it, which shows the difference.', outcome: 'The state\'s job is universal and enforceable — no private fortune can make law apply to everyone or defend a whole country\'s borders.' },
                { text: 'The uncle is right — enough private money could replace the government entirely.', outcome: 'Money cannot create legitimate, enforceable law for everyone — a private funder answers to himself, serves whom he likes, and cannot bind a whole society.', reveals: 'money-replaces-government' },
                { text: 'Government\'s only real job is guarding the borders — everything else, like disaster relief, should be left to people themselves.', outcome: 'Defence is one function among many — citizens depend on government for relief, public services and dispute settlement that no individual can supply alone.', reveals: 'government-is-only-defence' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_011', title: 'You made it',
          caseStudy: { intro: 'Rules do not shrink freedom — they guard it. Government exists so that the strong cannot simply do whatever they want to the weak.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch01_007', difficulty: 'standard',
          question: 'The sources of authority refer to the foundational origins and justifications.',
          hint: 'Review the core concepts of democracy and the Preamble of the Indian Constitution.',
          misconception: 'Students often confuse the physical *instruments* of government enforcement (like police forces, courts, and civil.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The sources of authority refer to the foundational origins and justifications from',
                  options: ['The sources of authority refer to the foundational origins and justifications from', 'A government is the institutional system through', 'The functions of government encompass its core duties to maintain law and order, protect', 'A monarchy is a form of government in'],
                  hint: 'Review the core concepts of democracy and the Preamble of the Indian Constitution, focusing on how.',
                  misconception: 'Students often confuse the physical *instruments* of government enforcement (like police forces, courts, and civil servants) with the.' }
          ],
            remediations: { 'students-often-confuse-the-physical': { steps: ['To fix this misconception, use the analogy of a school sports captain.', 'Remind the student that the captain does not have the right to make rules simply because they are the strongest.', 'Instead, the captain\'s authority comes from being elected by the team members and operating within the rules set by the.', 'Explain that police and tax collectors are merely the machinery of the state; the fuel that gives them legitimate power.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_008', difficulty: 'standard',
          question: 'How government interacts with people through representation and participation.',
          hint: 'Review c7_civ_ch01_004 (Democracy: Rule by the People) and c6_civics_ch11_014 (Citizen.',
          misconception: 'Students often think that once an election is over, elected representatives have absolute power to do whatever they.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'How government interacts with people through representation and participation refers to',
                  options: ['How government interacts with people through representation and participation refers to', 'A government is the institutional system through', 'The functions of government encompass its core duties to maintain law and order, protect', 'A monarchy is a form of government in'],
                  hint: 'Review c7_civ_ch01_004 (Democracy: Rule by the People) and c6_civics_ch11_014 (Citizen.',
                  misconception: 'Students often think that once an election is over, elected representatives have absolute power to do whatever they want until the next.' }
          ],
            remediations: { 'once-an-election-is-over': { steps: ['To fix this, guide the student through the concept of accountability using a real-world parallel: a school monitor.', 'Review how citizens use mechanisms like the Right to Information (RTI), public hearings (public consultations), and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_009', difficulty: 'standard',
          question: 'Democracy is a form of government where power rests with the citizens, who.',
          hint: 'Review node c7_civ_ch01_004 to solidify what popular rule means before analyzing its.',
          misconception: 'Students often think that democracy simply means "whatever the majority of people want, the government must.',
          parts: [
                { id: 'a', prompt: 'Which core principle of democracy ensures that all adult citizens have the right to vote regardless of their caste, religion, wealth, or gender?', answer: 'Universal adult franchise',
                  options: ['Universal adult franchise', 'majoritarian rule', 'hereditary succession', 'whatever the majority of people want, the government must do immediately'],
                  hint: 'Review node c7_civ_ch01_004 to solidify what popular rule means before analyzing its advantages.',
                  misconception: 'Students often think that democracy simply means "whatever the majority of people want, the government must do immediately," forgetting.' },
                { id: 'b', prompt: 'A village panchayat holds an open meeting (Gram Sabha) where citizens question the sarpanch about village funds spent on a new road.', answer: 'Public accountability and transparency',
                  options: ['Public accountability and transparency', 'universal franchise', 'whatever the majority of people want, the government must do immediately'],
                  hint: 'Review node c7_civ_ch01_004 to solidify what popular rule means before analyzing its advantages.',
                  misconception: 'Students often think that democracy simply means "whatever the majority of people want, the government must do immediately," forgetting.' },
                { id: 'c', prompt: 'How do fundamental rights (such as freedom of speech and expression) strengthen the advantages of a democratic government?', answer: 'Rights allow citizens to peacefully critique government policies, share diverse',
                  options: ['Rights allow citizens to peacefully critique government policies, share diverse', 'whatever the majority of people want, the government must do immediately'],
                  hint: 'Review node c7_civ_ch01_004 to solidify what popular rule means before analyzing its advantages.',
                  misconception: 'Students often think that democracy simply means "whatever the majority of people want, the government must do immediately," forgetting.' }
          ],
            remediations: { 'democracy-simply-means-whatever-the': { steps: ['Review the relationship between majority rule and fundamental rights using the Indian Constitution.', 'Explain that while elections decide who forms the government, the Constitution sets boundaries (like the Right.', 'Use a classroom example: if 25 students vote to ban 5 students from speaking, that violates democratic principles.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_010', difficulty: 'standard',
          question: 'A comparison of different types of government involves systematically analyzing.',
          hint: 'Review the basic definitions in c7_civ_ch01_004 and c7_civ_ch01_006 to recall how power.',
          misconception: 'Students often think that any country that holds elections is automatically a fully functioning democracy, failing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A comparison of different types of government involves systematically analyzing how',
                  options: ['A comparison of different types of government involves systematically analyzing how', 'A government is the institutional system through', 'The functions of government encompass its core duties to maintain law and order, protect', 'A monarchy is a form of government in'],
                  hint: 'Review the basic definitions in c7_civ_ch01_004 and c7_civ_ch01_006 to recall how power is acquired.',
                  misconception: 'Students often think that any country that holds elections is automatically a fully functioning democracy, failing to realize that some.' }
          ],
            remediations: { 'any-country-that-holds-elections': { steps: ['To fix this, guide the student to examine two election scenarios: Scenario A features multiple competing political.', 'Ask the student who holds the real power to choose in each case, highlighting that competitive choice is the defining.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_011', difficulty: 'standard',
          question: 'The Indian Parliament is the supreme legislative body of the Republic of India.',
          hint: 'Review c7_civ_ch01_008 to reinforce how representation works between citizens and.',
          misconception: 'Students often believe that the Prime Minister and the Cabinet make laws entirely on their own without needing.',
          parts: [
                { id: 'a', prompt: 'Which Article of the Constitution of India establishes the Parliament, and what are its three components?', answer: 'Article 79 establishes the Parliament of India',
                  options: ['Article 79 establishes the Parliament of India', 'the President of India writes and creates the laws'],
                  hint: 'Review c7_civ_ch01_008 to reinforce how representation works between citizens and government.',
                  misconception: 'Students often believe that the Prime Minister and the Cabinet make laws entirely on their own without needing Parliament\'s approval,.' }
          ],
            remediations: { 'the-prime-minister-and-the': { steps: ['To fix this misconception, walk through the journey of a law step-by-step: 1) A minister drafts a bill.', '2) The bill is presented, debated, and voted on by elected MPs in the Lok Sabha and Rajya Sabha.', '3) Once both houses pass it, it goes to the President for final assent.', 'Emphasize that the executive proposes, but the legislature (Parliament) disposes and enacts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_011', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the Prime Minister and the Cabinet make laws entirely on their own without needing.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The Rajya Sabha is powerless because its members are not directly elected by common citizens in general elections." Is this statement.', answer: 'This statement is inaccurate',
                  options: ['This statement is inaccurate', 'the President of India writes and creates the laws'],
                  hint: 'Review c7_civ_ch01_008 to reinforce how representation works between citizens and government.',
                  misconception: 'Students often believe that the Prime Minister and the Cabinet make laws entirely on their own without needing Parliament\'s approval,.' }
          ],
            remediations: { 'the-prime-minister-and-the': { steps: ['To fix this misconception, walk through the journey of a law step-by-step: 1) A minister drafts a bill.', '2) The bill is presented, debated, and voted on by elected MPs in the Lok Sabha and Rajya Sabha.', '3) Once both houses pass it, it goes to the President for final assent.', 'Emphasize that the executive proposes, but the legislature (Parliament) disposes and enacts.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
