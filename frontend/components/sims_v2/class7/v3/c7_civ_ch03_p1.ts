import type { SimDef } from '../../engine/types';

/** v3 generated — c7_civ_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_civ_ch03_p1: SimDef = {
    id: 'v3_c7_civ_ch03_p1',
    title: 'The State, the Government, and You · Part 1/2',
    subtitle: 'Covers the conceptual and structural differences between the state (territory.',
    classLevel: 7, subject: 'civics', topic: 'The State, the Government, and You · Part 1/2',
    chapters: ['c7_civ_ch03'],
    nodeIds: ['c7_civ_ch03_001', 'c7_civ_ch03_002', 'c7_civ_ch03_003', 'c7_civ_ch03_004', 'c7_civ_ch03_005', 'c7_civ_ch03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine watching the news and hearing that a new Prime Minister has been sworn in after an election, but.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A new Prime Minister takes the oath and headlines scream about a new government. But has India — the country — actually changed? What stays standing when a government is voted out?',
        options: ['The state stays — its territory, people, sovereignty, courts, and civil services are permanent; only the temporary government changed', 'The whole state is recreated with every election', 'The borders redraw themselves each time leaders change', 'Nothing stays — every election builds a new country'],
        answer: 'The state stays — its territory, people, sovereignty, courts, and civil services are permanent; only the temporary government changed',
        hook: 'State and government are not the same word. The state is the school building, playground, and students — the government is just this year\'s elected council running it. Citizens may criticise and vote out a government while still owing allegiance to the state.',
    },
    teaching: [
        { title: 'Difference Between State and Government', text: 'The state is a permanent political institution consisting of a defined territory, population, government, and sovereignty, whereas the government is the temporary set of elected or appointed.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_civ_ch03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'A flood hits and relief must roll — assign the roles: who sets policy and releases funds, and who delivers relief on the ground and stays even after the next election.',
        labels: ['Difference Between State', 'Three Organs of Government', 'Functions of Legislature: Making', 'Functions of Executive: Implementing', 'Functions of Judiciary: Interpreting', 'Democracy vs Republic: Understanding'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_civ_ch03_001', title: 'Difference Between State and Government',
          caseStudy: { intro: 'Imagine watching the news and hearing that a new Prime Minister has been sworn in after an election, but nobody says that India as a country has been replaced.',
            decisions: [{ prompt: 'Which of the four core elements of a state represents its supreme and independent authority to make decisions without external control?', options: [
                { text: 'Sovereignty represents supreme and independent authority', outcome: 'Sovereignty represents supreme and independent authority. If a student answers "territory".' },
                { text: 'territory', outcome: 'Not quite — Students often use the terms "state" and "government" interchangeably, believing that whenever.', reveals: 'students-often-use-the-terms' },
                { text: 'population', outcome: 'Not quite — Students often use the terms "state" and "government" interchangeably, believing that whenever.', reveals: 'students-often-use-the-terms' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_002', title: 'Three Organs of Government: Legislature, Executive, Judiciary',
          caseStudy: { intro: 'Imagine watching a news broadcast where Parliament passes a new education policy, the Ministry of Education issues instructions to schools to implement it, and.',
            decisions: [{ prompt: 'Which of the three organs of government is primarily responsible for framing and passing new laws in India?', options: [
                { text: 'The Legislature is responsible for framing and passing new laws', outcome: 'The Legislature is responsible for framing and passing new laws.' },
                { text: 'the Executive', outcome: 'Not quite — Students often think that the President or Prime Minister makes the laws for the country because.', reveals: 'the-president-or-prime-minister' },
                { text: 'the Judiciary', outcome: 'Not quite — Students often think that the President or Prime Minister makes the laws for the country because.', reveals: 'the-president-or-prime-minister' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_004', title: 'Functions of Executive: Implementing Laws',
          caseStudy: { intro: 'Imagine your school student council passes a rule that every classroom must have a recycling bin, but the rule book alone cannot empty the bins or buy the.',
            decisions: [{ prompt: 'What is the primary constitutional function of the executive branch of government?', options: [
                { text: 'The primary function of the executive is to implement, enforce, and administer the laws', outcome: 'The primary function of the executive is to implement, enforce, and administer the laws enacted.' },
                { text: 'writes new laws', outcome: 'Not quite — Students often confuse the law-making power of the legislature with the law-enforcing power of the.', reveals: 'students-often-confuse-the-law' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_005', title: 'Functions of Judiciary: Interpreting and Upholding Laws',
          caseStudy: { intro: 'Imagine you are watching the evening news and a new traffic law is passed by Parliament, but citizens and local auto unions disagree on what a specific rule.',
            decisions: [{ prompt: 'What is the primary role of the judiciary among the three organs of government?', options: [
                { text: 'The primary role of the judiciary is to interpret laws, apply them to specific cases, and', outcome: 'The primary role of the judiciary is to interpret laws, apply them to specific cases, and uphold.' },
                { text: 'that the judiciary makes laws or implements administrative policies', outcome: 'Not quite — Students often confuse the functions of the three organs of government, believing that the courts.', reveals: 'students-often-confuse-the-functions' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_006', title: 'Democracy vs Republic: Understanding the Distinction',
          caseStudy: { intro: 'Imagine your school elects a student council to make decisions about sports equipment and canteen rules.',
            decisions: [{ prompt: 'What is the primary defining characteristic of a republic that distinguishes it from a system led by a hereditary monarch?', options: [
                { text: 'In a republic, the head of state is either elected or nominated by the people or their', outcome: 'In a republic, the head of state is either elected or nominated by the people or their.' },
                { text: 'democracy', outcome: 'Not quite — Students often think "democracy" and "republic" mean the exact same thing and can be used.', reveals: 'democracy-and-republic-mean-the' },
                { text: 'republic', outcome: 'Not quite — Students often think "democracy" and "republic" mean the exact same thing and can be used.', reveals: 'democracy-and-republic-mean-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'After a national election, a new party takes power and the old one steps down. A student watching the news asks: \'So did our country just end and a new one begin? Do all the police and clerks lose their jobs too?\'',
            decisions: [{ prompt: 'What actually changed — the state or the government?', options: [
                { text: 'Only the government — the state is the permanent framework: its people, territory, sovereignty and institutions outlast any party. Governments are its temporary managers, swapped at elections, while the state itself, and the officers who serve it, carry on regardless of who holds office.', outcome: 'This is the key distinction — Prime Ministers and cabinets come and go; the Republic, its courts and its services remain, which is why daily life continues through every transfer of power.' },
                { text: 'The whole country effectively restarts — a new ruling party means a new state, and officials serve at the party\'s pleasure.', outcome: 'Parties change; the state endures — police and civil servants serve the state, not the party, which is why they keep their jobs across elections.', reveals: 'government-equals-state' },
                { text: 'Neither changes — elections are ceremonial, and the same people effectively keep running things.', outcome: 'The government genuinely changes hands — that is what elections decide — while the state\'s population, territory and sovereignty remain untouched.', reveals: 'elections-change-nothing' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Governments are hired and fired; the state endures. Knowing which is which is the first lesson of a thinking citizen.',
            decisions: [{ prompt: 'What comes next? The State, the Government, and You · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — The State, the Government, and You · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch03_001', difficulty: 'standard',
          question: 'The state is a permanent political institution consisting of a defined.',
          hint: 'Review Class 6 topics on the need for government and how elections function in India.',
          misconception: 'Students often use the terms "state" and "government" interchangeably, believing that whenever a new Prime Minister.',
          parts: [
                { id: 'a', prompt: 'Which of the four core elements of a state represents its supreme and independent authority to make decisions without external control?', answer: 'Sovereignty represents supreme and independent authority',
                  options: ['Sovereignty represents supreme and independent authority', 'territory', 'population'],
                  hint: 'Review Class 6 topics on the need for government and how elections function in India.',
                  misconception: 'Students often use the terms "state" and "government" interchangeably, believing that whenever a new Prime Minister or Chief Minister takes.' },
                { id: 'b', prompt: 'Why is the government considered a temporary institution while the state is considered permanent?', answer: 'The government is temporary',
                  options: ['The government is temporary', 'a change in the ruling political party means the entire country is newly created'],
                  hint: 'Review Class 6 topics on the need for government and how elections function in India.',
                  misconception: 'Students often use the terms "state" and "government" interchangeably, believing that whenever a new Prime Minister or Chief Minister takes.' }
          ],
            remediations: { 'students-often-use-the-terms': { steps: ['To fix this, use the analogy of a school: The school building, playground, and student body represent the permanent.', 'Apply this directly to India: India is the permanent state, and the elected leaders form the temporary government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often use the terms "state" and "government" interchangeably, believing that whenever a new Prime Minister.',
          parts: [
                { id: 'a', prompt: 'Design a short scenario comparing a civil servant (part of the permanent state machinery) and a cabinet minister (part of the temporary government) during.', answer: 'A good response shows the cabinet minister (government) setting policy goals and',
                  options: ['A good response shows the cabinet minister (government) setting policy goals and', 'civil servants change every time an election occurs'],
                  hint: 'Review Class 6 topics on the need for government and how elections function in India.',
                  misconception: 'Students often use the terms "state" and "government" interchangeably, believing that whenever a new Prime Minister or Chief Minister takes.' }
          ],
            remediations: { 'students-often-use-the-terms': { steps: ['To fix this, use the analogy of a school: The school building, playground, and student body represent the permanent.', 'Apply this directly to India: India is the permanent state, and the elected leaders form the temporary government.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_002', difficulty: 'standard',
          question: 'The government of a democratic nation functions through three primary organs.',
          hint: 'Review c7_civ_ch03_001 (Difference Between State and Government) and c6_civics_ch12_020.',
          misconception: 'Students often think that the President or Prime Minister makes the laws for the country because they are the most.',
          parts: [
                { id: 'a', prompt: 'Which of the three organs of government is primarily responsible for framing and passing new laws in India?', answer: 'The Legislature is responsible for framing and passing new laws',
                  options: ['The Legislature is responsible for framing and passing new laws', 'the Executive', 'the Judiciary'],
                  hint: 'Review c7_civ_ch03_001 (Difference Between State and Government) and c6_civics_ch12_020 (National.',
                  misconception: 'Students often think that the President or Prime Minister makes the laws for the country because they are the most visible faces of the.' },
                { id: 'b', prompt: 'If the Prime Minister and the Council of Ministers decide to launch a nationwide sanitation drive, which organ of government are they acting as?', answer: 'They are acting as the Executive organ',
                  options: ['They are acting as the Executive organ', 'the Legislature'],
                  hint: 'Review c7_civ_ch03_001 (Difference Between State and Government) and c6_civics_ch12_020 (National.',
                  misconception: 'Students often think that the President or Prime Minister makes the laws for the country because they are the most visible faces of the.' }
          ],
            remediations: { 'the-president-or-prime-minister': { steps: ['To fix this misconception, take a concrete example like a school setting: the student council or principal\'s committee.', 'Emphasize that making a rule is different from carrying it out.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_003', difficulty: 'standard',
          question: 'The legislature is the law-making organ of the government, responsible for.',
          hint: 'Review node c7_civ_ch03_002 to reinforce the core definitions of the legislature.',
          misconception: 'Students often think that the Prime Minister or the President single-handedly creates and passes laws whenever they.',
          parts: [
                { id: 'a', prompt: 'A group of citizens feels that cyberbullying among teenagers is a rising danger and wants a new legal rule created to protect students.', answer: 'They should look to the legislature (Parliament)',
                  options: ['They should look to the legislature (Parliament)', 'the police or the courts'],
                  hint: 'Review node c7_civ_ch03_002 to reinforce the core definitions of the legislature, executive, and.',
                  misconception: 'Students often think that the Prime Minister or the President single-handedly creates and passes laws whenever they want.' }
          ],
            remediations: { 'the-prime-minister-or-the': { steps: ['To fix this, trace the journey of a law using a concrete example, such as a mid-day meal safety regulation.', 'Show the student that even though a minister (executive) might propose the idea, it cannot become law until members.', 'Emphasize that power is shared among elected representatives, not held by one person.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_004', difficulty: 'standard',
          question: 'The executive is the second organ of government responsible for enforcing and.',
          hint: 'Review c7_civ_ch03_003 to clarify the difference between passing a bill in Parliament and.',
          misconception: 'Students often confuse the law-making power of the legislature with the law-enforcing power of the executive, believing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The executive is the second organ of government responsible for enforcing and',
                  options: ['The executive is the second organ of government responsible for enforcing and', 'The state is a permanent political institution consisting of a defined territory,', 'The government of a democratic nation functions through three primary organs: the', 'The legislature is the law-making organ of the government, responsible for debating,'],
                  hint: 'Review c7_civ_ch03_003 to clarify the difference between passing a bill in Parliament and enforcing.',
                  misconception: 'Students often confuse the law-making power of the legislature with the law-enforcing power of the executive, believing that the Prime.' }
          ],
            remediations: { 'students-often-confuse-the-law': { steps: ['To correct this, take a real example: point out that Parliament passed the Right to Education Act, but local government.', 'Emphasize the two distinct steps: Step 1 (Legislature): Writing and passing the rulebook; Step 2 (Executive): Playing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_005', difficulty: 'standard',
          question: 'The judiciary is the third organ of government responsible for interpreting.',
          hint: 'Review c7_civ_ch03_002 to clearly separate law-making from law-interpreting before.',
          misconception: 'Students often confuse the functions of the three organs of government, believing that the courts (judiciary) make laws.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The judiciary is the third organ of government responsible for interpreting laws,',
                  options: ['The judiciary is the third organ of government responsible for interpreting laws,', 'The state is a permanent political institution consisting of a defined territory,', 'The government of a democratic nation functions through three primary organs: the', 'The legislature is the law-making organ of the government, responsible for debating,'],
                  hint: 'Review c7_civ_ch03_002 to clearly separate law-making from law-interpreting before tackling.',
                  misconception: 'Students often confuse the functions of the three organs of government, believing that the courts (judiciary) make laws or enforce them.' }
          ],
            remediations: { 'students-often-confuse-the-functions': { steps: ['To fix this, write down three columns labeled Legislature, Executive, and Judiciary.', 'Place "Passes Traffic Rules" under Legislature, "Traffic Police Enforces Rules" under Executive, and "Resolves.', 'Review each column to show that courts only act when a dispute arises or a law\'s meaning is questioned.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch03_006', difficulty: 'standard',
          question: 'A democracy is a system of government where power rests with the people through.',
          hint: 'Review c6_civics_ch11_010 on Types of Government: Democracy, Monarchy, Dictatorship.',
          misconception: 'Students often think "democracy" and "republic" mean the exact same thing and can be used interchangeably to describe.',
          parts: [
                { id: 'a', prompt: 'Country X holds universal adult suffrage elections every five years, but its head of state is a hereditary king who holds absolute veto power over all laws.', answer: 'Country X has democratic elements',
                  options: ['Country X has democratic elements', 'democracy', 'republic'],
                  hint: 'Review c6_civics_ch11_010 on Types of Government: Democracy, Monarchy, Dictatorship.',
                  misconception: 'Students often think "democracy" and "republic" mean the exact same thing and can be used interchangeably to describe any country that.' }
          ],
            remediations: { 'democracy-and-republic-mean-the': { steps: ['Ask whether the head of state inherits the position (like a monarch in the UK) or is elected/appointed for a term (like.', 'If there is a monarch, the country cannot be a republic, even if it is a robust democracy.', 'Recall that democracy focuses on *who exercises political power* (the people via voting), while a republic focuses.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
