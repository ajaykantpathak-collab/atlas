import type { SimDef } from '../../engine/types';

/** v3 generated — c7_civ_ch03_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_civ_ch03_p2: SimDef = {
    id: 'v3_c7_civ_ch03_p2',
    title: 'The State, the Government, and You · Part 2/2',
    subtitle: 'Covers the constitutional principles of India as a democratic and republic nation, its.',
    classLevel: 7, subject: 'civics', topic: 'The State, the Government, and You · Part 2/2',
    chapters: ['c7_civ_ch03'],
    nodeIds: ['c7_civ_ch03_007', 'c7_civ_ch03_008', 'c7_civ_ch03_009', 'c7_civ_ch03_010', 'c7_civ_ch03_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are watching a televised news debate where two students argue about India\'s political system: one.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A new Prime Minister takes the oath and headlines scream about a new government. But has India — the country — actually changed? What stays standing when a government is voted out?',
        options: ['The state stays — its territory, people, sovereignty, courts, and civil services are permanent; only the temporary government changed', 'The whole state is recreated with every election', 'The borders redraw themselves each time leaders change', 'Nothing stays — every election builds a new country'],
        answer: 'The state stays — its territory, people, sovereignty, courts, and civil services are permanent; only the temporary government changed',
        hook: 'State and government are not the same word. The state is the school building, playground, and students — the government is just this year\'s elected council running it. Citizens may criticise and vote out a government while still owing allegiance to the state.',
    },
    teaching: [
        { title: 'What Makes India a Democratic Republic', text: 'India is a democratic republic because its government is chosen by the people through free and fair elections (democracy) and its highest head of state, the President, is elected by the people\'s.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_civ_ch03_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'A flood hits and relief must roll — assign the roles: who sets policy and releases funds, and who delivers relief on the ground and stays even after the next election.',
        labels: ['What Makes India', 'How Citizens Engage with', 'Making Government Work', 'Rights and Responsibilities', 'Accountability and Transparency'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_civ_ch03_007', title: 'What Makes India a Democratic Republic',
          caseStudy: { intro: 'Imagine you are watching a televised news debate where two students argue about India\'s political system: one says India is a democracy because we vote for our.',
            decisions: [{ prompt: 'What feature of India\'s political system makes it a "republic" rather than a monarchy?', options: [
                { text: 'that India\'s head of state (the President) is elected by the people\'s representatives for', outcome: 'The correct answer is that India\'s head of state (the President) is elected by the people\'s.' },
                { text: 'democracy', outcome: 'Not quite — Students often think that the terms "democracy" and "republic" mean the exact same thing, or they.', reveals: 'the-terms-democracy-and-republic' },
                { text: 'republic', outcome: 'Not quite — Students often think that the terms "democracy" and "republic" mean the exact same thing, or they.', reveals: 'the-terms-democracy-and-republic' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_009', title: 'Making Government Work for the People: Citizen Participation',
          caseStudy: { intro: 'Imagine residents in a neighborhood notice that the local park has fallen into complete disrepair, with broken swings and no streetlights, making it unsafe.',
            decisions: [{ prompt: 'What term describes the active engagement of citizens in shaping public policies, monitoring government programs, and demanding.', options: [
                { text: 'The correct term is citizen participation or civic engagement', outcome: 'The correct term is citizen participation or civic engagement.' },
                { text: 'voting', outcome: 'Not quite — Students often believe that citizen participation is restricted exclusively to voting in elections.', reveals: 'citizen-participation-is-restricted-exclusively' },
                { text: 'universal adult franchise', outcome: 'Not quite — Students often believe that citizen participation is restricted exclusively to voting in elections.', reveals: 'citizen-participation-is-restricted-exclusively' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_011', title: 'Accountability and Transparency in Governance',
          caseStudy: { intro: 'Imagine reading in the newspaper that a new bridge in your district developed cracks within a month of opening, even though crores of public rupees were spent.',
            decisions: [{ prompt: 'What term describes the obligation of elected officials and public servants to explain their decisions and actions to the citizens?', options: [
                { text: 'Accountability', outcome: 'Accountability. A student who answers "transparency" confuses the act of making information open.' },
                { text: 'transparency', outcome: 'Not quite — Students often think that "transparency" and "accountability" are the same thing and that simply.', reveals: 'transparency-and-accountability-are-the' },
                { text: 'accountability', outcome: 'Not quite — Students often think that "transparency" and "accountability" are the same thing and that simply.', reveals: 'transparency-and-accountability-are-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_007', title: 'Use it in the wild',
          caseStudy: { intro: 'After a national election, a new party takes power and the old one steps down. A student watching the news asks: \'So did our country just end and a new one begin? Do all the police and clerks lose their jobs too?\'',
            decisions: [{ prompt: 'What actually changed — the state or the government?', options: [
                { text: 'Only the government — the state is the permanent framework: its people, territory, sovereignty and institutions outlast any party. Governments are its temporary managers, swapped at elections, while the state itself, and the officers who serve it, carry on regardless of who holds office.', outcome: 'This is the key distinction — Prime Ministers and cabinets come and go; the Republic, its courts and its services remain, which is why daily life continues through every transfer of power.' },
                { text: 'The whole country effectively restarts — a new ruling party means a new state, and officials serve at the party\'s pleasure.', outcome: 'Parties change; the state endures — police and civil servants serve the state, not the party, which is why they keep their jobs across elections.', reveals: 'government-equals-state' },
                { text: 'Neither changes — elections are ceremonial, and the same people effectively keep running things.', outcome: 'The government genuinely changes hands — that is what elections decide — while the state\'s population, territory and sovereignty remain untouched.', reveals: 'elections-change-nothing' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_011', title: 'You made it',
          caseStudy: { intro: 'Governments are hired and fired; the state endures. Knowing which is which is the first lesson of a thinking citizen.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch03_007', difficulty: 'standard',
          question: 'India is a democratic republic because its government is chosen by the people.',
          hint: 'Review c7_civ_ch03_006 (Democracy vs Republic) and c6_civics_ch11_010 (Types.',
          misconception: 'Students often think that the terms "democracy" and "republic" mean the exact same thing, or they believe that having.',
          parts: [
                { id: 'a', prompt: 'If a neighboring country has a Prime Minister chosen by Parliament, but the Head of State is a hereditary King who inherits the crown, is that country.', answer: 'No, that country is a constitutional monarchy, not a republic',
                  options: ['No, that country is a constitutional monarchy, not a republic', 'democracy', 'republic', 'having a Prime Minister automatically makes a nation a republic'],
                  hint: 'Review c7_civ_ch03_006 (Democracy vs Republic) and c6_civics_ch11_010 (Types of Government.',
                  misconception: 'Students often think that the terms "democracy" and "republic" mean the exact same thing, or they believe that having a Prime Minister.' }
          ],
            remediations: { 'the-terms-democracy-and-republic': { steps: ['To fix this misconception, separate the two ideas using a two-part checklist: (1) Does the government answer to voters.', '(This makes it a democracy).', '(2) Is the highest head of state chosen by election rather than inherited birthright?', '(This makes it a republic).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the terms "democracy" and "republic" mean the exact same thing, or they believe that having.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Because India holds regular elections, the hereditary succession of political family dynasties in some local parties means India is.', answer: 'This critique is partially confused',
                  options: ['This critique is partially confused', 'democracy', 'republic', 'having a Prime Minister automatically makes a nation a republic'],
                  hint: 'Review c7_civ_ch03_006 (Democracy vs Republic) and c6_civics_ch11_010 (Types of Government.',
                  misconception: 'Students often think that the terms "democracy" and "republic" mean the exact same thing, or they believe that having a Prime Minister.' },
                { id: 'b', prompt: 'Design a short constitutional preamble clause for a newly formed democratic republic, ensuring you include both democratic popular sovereignty and republican.', answer: 'A strong answer will feature phrases like "We, the people, establish a sovereign',
                  options: ['A strong answer will feature phrases like "We, the people, establish a sovereign', 'democracy', 'republic', 'having a Prime Minister automatically makes a nation a republic'],
                  hint: 'Review c7_civ_ch03_006 (Democracy vs Republic) and c6_civics_ch11_010 (Types of Government.',
                  misconception: 'Students often think that the terms "democracy" and "republic" mean the exact same thing, or they believe that having a Prime Minister.' }
          ],
            remediations: { 'the-terms-democracy-and-republic': { steps: ['To fix this misconception, separate the two ideas using a two-part checklist: (1) Does the government answer to voters.', '(This makes it a democracy).', '(2) Is the highest head of state chosen by election rather than inherited birthright?', '(This makes it a republic).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_008', difficulty: 'standard',
          question: 'How citizens engage with government in daily life refers to the various ways.',
          hint: 'Review c7_civ_ch03_002 and c6_civics_ch12_022 to understand how local government services.',
          misconception: 'Students often believe that citizen engagement with the government only occurs during national or state elections,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'How citizens engage with government in daily life refers to the various ways ordinary',
                  options: ['How citizens engage with government in daily life refers to the various ways ordinary', 'The state is a permanent political institution consisting of a defined territory,', 'The government of a democratic nation functions through three primary organs: the', 'The legislature is the law-making organ of the government, responsible for debating,'],
                  hint: 'Review c7_civ_ch03_002 and c6_civics_ch12_022 to understand how local government services operate.',
                  misconception: 'Students often believe that citizen engagement with the government only occurs during national or state elections, or when a major law.' }
          ],
            remediations: { 'citizen-engagement-with-the-government': { steps: ['To fix this, guide the student through a single day in their own life: ask them to list every public service they.', 'Explain that every time they use these services, report a problem with them, or pay a fee for them, they are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_009', difficulty: 'standard',
          question: 'Making government work for the people through citizen participation refers.',
          hint: 'Review c6_civics_ch11_014 on basic citizen participation and c6_civics_ch10_004.',
          misconception: 'Students often believe that citizen participation is restricted exclusively to voting in elections or that ordinary.',
          parts: [
                { id: 'a', prompt: 'What term describes the active engagement of citizens in shaping public policies, monitoring government programs, and demanding accountability between election.', answer: 'The correct term is citizen participation or civic engagement',
                  options: ['The correct term is citizen participation or civic engagement', 'voting', 'universal adult franchise'],
                  hint: 'Review c6_civics_ch11_014 on basic citizen participation and c6_civics_ch10_004 on freedom.',
                  misconception: 'Students often believe that citizen participation is restricted exclusively to voting in elections or that ordinary citizens have no legal.' }
          ],
            remediations: { 'citizen-participation-is-restricted-exclusively': { steps: ['Remind the student of the daily functions of local government and fundamental rights like freedom of speech and.', 'Walk through a concrete example: explain how villagers in Rajasthan used RTI and public hearings (Jan Sunwais) to check.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_010', difficulty: 'standard',
          question: 'Rights and responsibilities of citizens are the legal entitlements guaranteed.',
          hint: 'Review Class 6 concepts of Fundamental Rights and Duties to recall what rights citizens.',
          misconception: 'Students often believe that because rights are guaranteed by the Constitution, they can exercise them unconditionally.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Rights and responsibilities of citizens are the legal entitlements guaranteed by a',
                  options: ['Rights and responsibilities of citizens are the legal entitlements guaranteed by a', 'The state is a permanent political institution consisting of a defined territory,', 'The government of a democratic nation functions through three primary organs: the', 'The legislature is the law-making organ of the government, responsible for debating,'],
                  hint: 'Review Class 6 concepts of Fundamental Rights and Duties to recall what rights citizens possess and.',
                  misconception: 'Students often believe that because rights are guaranteed by the Constitution, they can exercise them unconditionally, completely ignoring.' }
          ],
            remediations: { 'because-rights-are-guaranteed-by': { steps: ['To fix this misconception, use a traffic light analogy: your rights are the green light allowing you to move forward.', 'Review Article 19 of the Indian Constitution, emphasizing that freedoms come with the phrase "subject to public order.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_011', difficulty: 'standard',
          question: 'Accountability and transparency in governance refer to the legal and.',
          hint: 'Review c7_civ_ch03_009 to understand how citizens participate in governance before.',
          misconception: 'Students often think that "transparency" and "accountability" are the same thing and that simply publishing government.',
          parts: [
                { id: 'a', prompt: 'What term describes the obligation of elected officials and public servants to explain their decisions and actions to the citizens?', answer: 'Accountability',
                  options: ['Accountability', 'transparency'],
                  hint: 'Review c7_civ_ch03_009 to understand how citizens participate in governance before studying.',
                  misconception: 'Students often think that "transparency" and "accountability" are the same thing and that simply publishing government documents online.' },
                { id: 'b', prompt: 'A citizen wants to know how much money was allocated for repairing local government schools in their ward.', answer: 'The Right to Information (RTI)',
                  options: ['The Right to Information (RTI)', 'transparency', 'accountability'],
                  hint: 'Review c7_civ_ch03_009 to understand how citizens participate in governance before studying.',
                  misconception: 'Students often think that "transparency" and "accountability" are the same thing and that simply publishing government documents online.' },
                { id: 'c', prompt: 'How do the legislature and the executive interact to maintain government accountability during legislative sessions?', answer: 'During sessions like Question Hour, members of the legislature (MPs or MLAs) ask',
                  options: ['During sessions like Question Hour, members of the legislature (MPs or MLAs) ask', 'transparency', 'accountability'],
                  hint: 'Review c7_civ_ch03_009 to understand how citizens participate in governance before studying.',
                  misconception: 'Students often think that "transparency" and "accountability" are the same thing and that simply publishing government documents online.' }
          ],
            remediations: { 'transparency-and-accountability-are-the': { steps: ['To fix this misconception, use the analogy of a school report card.', 'Transparency is when the teacher hands you the report card showing all your marks (information is visible).', 'Accountability is when your parents sit down with you to discuss why your math score dropped and what you will do.', 'Have the student trace an RTI request: first, getting the document (transparency), and second, what happens if the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
