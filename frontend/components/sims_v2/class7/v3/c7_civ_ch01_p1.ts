import type { SimDef } from '../../engine/types';

/** v3 generated — c7_civ_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_civ_ch01_p1: SimDef = {
    id: 'v3_c7_civ_ch01_p1',
    title: 'From the Rulers to the Ruled: Types of Governments · Part 1/2',
    subtitle: 'Covers the foundational definition of government, its basic structural necessity, and its.',
    classLevel: 7, subject: 'civics', topic: 'From the Rulers to the Ruled: Types of Governments · Part 1/2',
    chapters: ['c7_civ_ch01'],
    nodeIds: ['c7_civ_ch01_001', 'c7_civ_ch01_002', 'c7_civ_ch01_003', 'c7_civ_ch01_004', 'c7_civ_ch01_005', 'c7_civ_ch01_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine walking into a school where there are no timetables, no uniform rules, and no teachers to guide the.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A school with no timetable, no rules, and no teachers descends into chaos within minutes. Yet a country of over a billion people keeps its trains, hospitals, and courts running even when leaders change. Who is really keeping it going?',
        options: ['The government — a permanent system of institutions, courts, and civil services, not just the politicians currently in power', 'The Prime Minister personally runs every service', 'Citizens manage everything alone with no coordination', 'Private companies run all public services for free'],
        answer: 'The government — a permanent system of institutions, courts, and civil services, not just the politicians currently in power',
        hook: 'Government is not the face on the news — ministers come and go with elections, but the railways, hospitals, police, and courts keep running. Lawmaking, enforcing, and dispute-settling are split across separate branches so no single hand holds all power.',
    },
    teaching: [
        { title: 'What is Government: Definition and Functions', text: 'A government is the institutional system through which a state or community is controlled, laws are made and enforced, and public services and welfare are managed for its citizens.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_civ_ch01_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'A new island of 500 people needs governing by tonight — list the three functions its government must perform first, and defend why individuals cannot handle them alone.',
        labels: ['What is Government: Definition', 'Functions of Government: Law,', 'Monarchy: Rule by', 'Democracy: Rule by', 'Republic: Elected Head', 'Dictatorship: Rule by Force'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c7_civ_ch01_001', title: 'What is Government: Definition and Functions',
          caseStudy: { intro: 'Imagine walking into a school where there are no timetables, no uniform rules, and no teachers to guide the schedule—chaos would quickly take over as everyone.',
            decisions: [{ prompt: 'What is the primary definition of a government in a political community?', options: [
                { text: 'The government is the institutional system that makes laws, enforces them, maintains', outcome: 'The government is the institutional system that makes laws, enforces them, maintains order, and.' },
                { text: 'government', outcome: 'Not quite — Students often think that the "government" is only the Prime Minister or the political party.', reveals: 'the-government-is-only-the' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_002', title: 'Functions of Government: Law, Order, Welfare, Foreign Relations',
          caseStudy: { intro: 'Imagine a bustling market in your city where traffic rules are enforced by police officers, clean drinking water is supplied by the local municipality, and.',
            decisions: [{ prompt: 'Which branch of government is primarily responsible for enforcing laws and maintaining internal order through police and security forces?', options: [
                { text: 'The executive branch is responsible for enforcing laws and maintaining internal order', outcome: 'The executive branch is responsible for enforcing laws and maintaining internal order.' },
                { text: 'making rules', outcome: 'Not quite — Students often confuse the different branches and functions of government, assuming that the.', reveals: 'students-often-confuse-the-different' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_003', title: 'Monarchy: Rule by a King or Queen',
          caseStudy: { intro: 'Imagine reading a storybook where the ruler of a vast kingdom inherits the throne simply because they were born into the royal family, with no citizens voting.',
            decisions: [{ prompt: 'What is the primary method by which a leader acquires power in a traditional monarchy?', options: [
                { text: 'Power is acquired through hereditary succession, meaning it is passed down within a royal', outcome: 'Power is acquired through hereditary succession, meaning it is passed down within a royal family.' },
                { text: 'through a public election', outcome: 'Not quite — Students often confuse all monarchies with absolute dictatorships or assume that modern kings and.', reveals: 'students-often-confuse-all-monarchies' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_004', title: 'Democracy: Rule by the People',
          caseStudy: { intro: 'Imagine you hear on the evening news that citizens in a town voted out their local leaders in an election because they were unhappy with road repairs, and the.',
            decisions: [{ prompt: 'What is the fundamental source of political power and authority in a democratic system of government according to the Indian Constitution?', options: [
                { text: 'The fundamental source of political power in a democracy is the people', outcome: 'The fundamental source of political power in a democracy is the people.' },
                { text: 'the Prime Minister', outcome: 'Not quite — Students often confuse democracy with "majority rule without limits," believing that whatever the.', reveals: 'students-often-confuse-democracy-with' },
                { text: 'the King', outcome: 'Not quite — Students often confuse democracy with "majority rule without limits," believing that whatever the.', reveals: 'students-often-confuse-democracy-with' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_005', title: 'Republic: Elected Head of State',
          caseStudy: { intro: 'Imagine you are watching a television broadcast about two different nations: in Nation A, a crowned prince is preparing to take the throne after his parent.',
            decisions: [{ prompt: 'What is the primary characteristic that distinguishes a republic from a constitutional monarchy?', options: [
                { text: 'In a republic, the head of state is elected by the people or their representatives,', outcome: 'In a republic, the head of state is elected by the people or their representatives, whereas in.' },
                { text: 'any country with an elected Prime Minister is automatically a republic', outcome: 'Not quite — Students often confuse the head of government (Prime Minister) with the head of state (President).', reveals: 'students-often-confuse-the-head' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_006', title: 'Dictatorship: Rule by Force',
          caseStudy: { intro: 'Imagine walking into a school debate club where one student declares they are the permanent leader, cancels all future elections, bans other students from.',
            decisions: [{ prompt: 'What is the primary method by which a dictator typically acquires and maintains political power in a state?', options: [
                { text: 'A dictator typically acquires and maintains power through force, military control, and', outcome: 'A dictator typically acquires and maintains power through force, military control, and coercion.' },
                { text: 'through regular citizen voting', outcome: 'Not quite — Students often confuse a dictatorship with a monarchy because both feature a single supreme leader.', reveals: 'students-often-confuse-a-dictatorship' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a dinner debate, an uncle argues: \'We barely need government — a billionaire could fund schools and fix roads if he wanted. Rich people could run everything better anyway.\'',
            decisions: [{ prompt: 'What can a government do that a billionaire simply cannot?', options: [
                { text: 'Govern — law and order, courts and defence apply to everyone equally and are backed by the authority to enforce them; a billionaire\'s money buys services only for those he chooses, binds nobody, and answers to no one. Governments exist because shared rules and public goods must cover the whole society, not just the funder\'s favourites — when a government collapses, markets and safety collapse with it, which shows the difference.', outcome: 'The state\'s job is universal and enforceable — no private fortune can make law apply to everyone or defend a whole country\'s borders.' },
                { text: 'The uncle is right — enough private money could replace the government entirely.', outcome: 'Money cannot create legitimate, enforceable law for everyone — a private funder answers to himself, serves whom he likes, and cannot bind a whole society.', reveals: 'money-replaces-government' },
                { text: 'Government\'s only real job is guarding the borders — everything else, like disaster relief, should be left to people themselves.', outcome: 'Defence is one function among many — citizens depend on government for relief, public services and dispute settlement that no individual can supply alone.', reveals: 'government-is-only-defence' }
            ] }] } },
        { type: 'case', nodeId: 'c7_civ_ch01_006', title: 'The bigger picture',
          caseStudy: { intro: 'Rules do not shrink freedom — they guard it. Government exists so that the strong cannot simply do whatever they want to the weak.',
            decisions: [{ prompt: 'What comes next? From the Rulers to the Ruled: Types of Governments · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — From the Rulers to the Ruled: Types of Governments · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_civ_ch01_001', difficulty: 'standard',
          question: 'A government is the institutional system through which a state or community.',
          hint: 'Review Class 6 topic c6_civics_ch11_009 to remember why people formed communities and.',
          misconception: 'Students often think that the "government" is only the Prime Minister or the political party currently winning.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A government is the institutional system through',
                  options: ['A government is the institutional system through', 'The functions of government encompass its core duties to maintain law and order, protect', 'A monarchy is a form of government in', 'Democracy is a system of government where supreme political power rests with the people,'],
                  hint: 'Review Class 6 topic c6_civics_ch11_009 to remember why people formed communities and created early.',
                  misconception: 'Students often think that the "government" is only the Prime Minister or the political party currently winning an election, confusing.' }
          ],
            remediations: { 'the-government-is-only-the': { steps: ['To fix this, draw two columns on a board: "Temporary Political Leaders" (ministers who change every five years through.', 'Explain that when a new political party comes to power, the public hospitals and railway lines do not vanish; they are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that the "government" is only the Prime Minister or the political party currently winning.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "A society would be better off with zero government rules because complete individual freedom allows everyone to do whatever they want.".', answer: 'This claim is practically unsound',
                  options: ['This claim is practically unsound', 'government'],
                  hint: 'Review Class 6 topic c6_civics_ch11_009 to remember why people formed communities and created early.',
                  misconception: 'Students often think that the "government" is only the Prime Minister or the political party currently winning an election, confusing.' }
          ],
            remediations: { 'the-government-is-only-the': { steps: ['To fix this, draw two columns on a board: "Temporary Political Leaders" (ministers who change every five years through.', 'Explain that when a new political party comes to power, the public hospitals and railway lines do not vanish; they are.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_002', difficulty: 'standard',
          question: 'The functions of government encompass its core duties to maintain law and.',
          hint: 'Review c7_civ_ch01_001 to understand the basic definition and necessity of government.',
          misconception: 'Students often confuse the different branches and functions of government, assuming that the police, courts, and.',
          parts: [
                { id: 'a', prompt: 'A local municipal corporation builds a new public hospital and provides free vaccination drives in a slum area.', answer: 'This action represents the welfare function of government',
                  options: ['This action represents the welfare function of government', 'making rules'],
                  hint: 'Review c7_civ_ch01_001 to understand the basic definition and necessity of government before.',
                  misconception: 'Students often confuse the different branches and functions of government, assuming that the police, courts, and welfare offices all.' }
          ],
            remediations: { 'students-often-confuse-the-different': { steps: ['To fix this, guide the student to sort government actions into three distinct columns: Legislature (makes laws).', 'Use a real-world example like a traffic law: Parliament passes it (Legislature), traffic police fine violators.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_003', difficulty: 'standard',
          question: 'A monarchy is a form of government in which a single ruler, usually called.',
          hint: 'Review the basic definition of government types from Class 6, specifically focusing.',
          misconception: 'Students often confuse all monarchies with absolute dictatorships or assume that modern kings and queens hold absolute.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A monarchy is a form of government in',
                  options: ['A monarchy is a form of government in', 'A government is the institutional system through', 'The functions of government encompass its core duties to maintain law and order, protect', 'Democracy is a system of government where supreme political power rests with the people,'],
                  hint: 'Review the basic definition of government types from Class 6, specifically focusing on how rulers.',
                  misconception: 'Students often confuse all monarchies with absolute dictatorships or assume that modern kings and queens hold absolute political power.' }
          ],
            remediations: { 'students-often-confuse-all-monarchies': { steps: ['To fix this, guide the student to examine the difference between an absolute monarchy (where the ruler has total power).', 'Use the example of modern constitutional monarchies where elected prime ministers run the government while the monarch.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_004', difficulty: 'standard',
          question: 'Democracy is a system of government where supreme political power rests with.',
          hint: 'Review c7_civ_ch01_003 to contrast how power is inherited in a monarchy versus earned.',
          misconception: 'Students often confuse democracy with "majority rule without limits," believing that whatever the largest group.',
          parts: [
                { id: 'a', prompt: 'What is the fundamental source of political power and authority in a democratic system of government according to the Indian Constitution?', answer: 'The fundamental source of political power in a democracy is the people',
                  options: ['The fundamental source of political power in a democracy is the people', 'the Prime Minister', 'the King', 'We the People'],
                  hint: 'Review c7_civ_ch01_003 to contrast how power is inherited in a monarchy versus earned through.',
                  misconception: 'Students often confuse democracy with "majority rule without limits," believing that whatever the largest group of voters decides must.' },
                { id: 'b', prompt: 'Why do modern democracies rely primarily on elected representatives rather than direct voting by every citizen on every single law?', answer: 'Modern democracies rely on representatives',
                  options: ['Modern democracies rely on representatives', 'majority rule without limits'],
                  hint: 'Review c7_civ_ch01_003 to contrast how power is inherited in a monarchy versus earned through.',
                  misconception: 'Students often confuse democracy with "majority rule without limits," believing that whatever the largest group of voters decides must.' },
                { id: 'c', prompt: 'Compare a situation where a leader is chosen for life by a council of elites versus a democratic leader chosen through fixed-term multi-party elections.', answer: 'Fixed-term multi-party elections guarantee accountability',
                  options: ['Fixed-term multi-party elections guarantee accountability', 'majority rule without limits'],
                  hint: 'Review c7_civ_ch01_003 to contrast how power is inherited in a monarchy versus earned through.',
                  misconception: 'Students often confuse democracy with "majority rule without limits," believing that whatever the largest group of voters decides must.' }
          ],
            remediations: { 'students-often-confuse-democracy-with': { steps: ['To fix this misconception, remind students that democracy is not just about counting votes; it is about.', 'Use an analogy: imagine a game of cricket where the team batting has 11 players and the fielding team has 11.', 'Revisit how Fundamental Rights act as a shield for every individual against the tyranny of an unchecked majority.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_005', difficulty: 'standard',
          question: 'A republic is a form of government in which the head of state is not a monarch.',
          hint: 'Review node c7_civ_ch01_004 to reinforce how people participate in choosing their leaders.',
          misconception: 'Students often confuse the head of government (Prime Minister) with the head of state (President) and assume that any.',
          parts: [
                { id: 'a', prompt: 'A student argues that because Country X has regular elections for its parliament and prime minister, it cannot be a monarchy, even though the country\'s head.', answer: 'The student is incorrect',
                  options: ['The student is incorrect', 'any country with an elected Prime Minister is automatically a republic'],
                  hint: 'Review node c7_civ_ch01_004 to reinforce how people participate in choosing their leaders in.',
                  misconception: 'Students often confuse the head of government (Prime Minister) with the head of state (President) and assume that any country with.' }
          ],
            remediations: { 'students-often-confuse-the-head': { steps: ['To fix this misconception, guide the student to separate the two roles in a government: (1) Head of State (the.', 'Ask the student to look up how the British monarch gets the job (hereditary inheritance) versus how the Indian.', 'Emphasize that the word \'republic\' specifically refers to how the *Head of State* attains office, not the Prime.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c7_civ_ch01_006', difficulty: 'standard',
          question: 'Dictatorship is a form of government where absolute political power.',
          hint: 'Review node c7_civ_ch01_004 to solidify what democratic rights and public accountability.',
          misconception: 'Students often confuse a dictatorship with a monarchy because both feature a single supreme leader holding vast power.',
          parts: [
                { id: 'a', prompt: 'Why are independent courts and opposition political parties generally absent or completely controlled in a true dictatorship?', answer: 'Independent courts and opposition parties are eliminated',
                  options: ['Independent courts and opposition parties are eliminated', 'all governments operate like a constitutional democracy'],
                  hint: 'Review node c7_civ_ch01_004 to solidify what democratic rights and public accountability mean.',
                  misconception: 'Students often confuse a dictatorship with a monarchy because both feature a single supreme leader holding vast power.' }
          ],
            remediations: { 'students-often-confuse-a-dictatorship': { steps: ['To fix this misconception, compare two current or historical examples: a constitutional monarch like the King of the.', 'Emphasize that the source of power for a monarch is tradition and law, while a dictator relies solely on coercive force.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
