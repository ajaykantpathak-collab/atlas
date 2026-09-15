import type { SimDef } from '../../engine/types';

/** v3 generated — c8_civ_ch01_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_civ_ch01_p2: SimDef = {
    id: 'v3_c8_civ_ch01_p2',
    title: 'Universal Franchise and India\'s Electoral System · Part 2/2',
    subtitle: 'Discover the one place where every Indian is perfectly equal',
    classLevel: 8, subject: 'civics', topic: 'Universal Franchise and India\'s Electoral System · Part 2/2',
    chapters: ['c8_civ_ch01'],
    nodeIds: ['c8_civ_ch1_5', 'c8_civ_ch1_6', 'c8_civ_ch1_7', 'c8_civ_ch1_8', 'c8_civ_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a first-time voter', intro: 'You\'ll turn 18 and join the world\'s largest electorate. Before that, learn why your single vote — equal to a billionaire\'s — was one of the most radical promises any nation ever made.', goal: 'Explain universal adult franchise, its constitutional guarantee in India, and how the Election Commission conducts free and fair elections.' },
    discovery: {
        question: 'In a Delhi voting queue stand a billionaire CEO and a daily-wage worker. At the booth, their votes count exactly the same — one each. Many countries once gave extra votes to the rich or educated. What radical promise did India make under Article 326?',
        options: ['Universal adult franchise — every adult citizen votes, every vote weighs equal, regardless of wealth, caste, gender or education', 'Only taxpayers may vote in national elections', 'Graduates get two votes; everyone else gets one', 'Voting rights are decided by each state separately'],
        answer: 'Universal adult franchise — every adult citizen votes, every vote weighs equal, regardless of wealth, caste, gender or education',
        hook: 'Most democracies took centuries to let everyone vote — India\'s Constitution granted it to all adults from day one, in 1950, when half the world still restricted it.',
    },
    teaching: [
        { title: 'Electoral System: How Elections Are Conducted in India', text: 'The electoral system refers to the set of rules, laws, and institutional mechanisms through which citizens cast their votes and choose their representatives to form the government in a democracy.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_civ_ch1_5', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run an election where everyone counts: trace how India adopted universal franchise when richer nations hesitated, and see how the Election Commission keeps every single vote equal.',
        labels: ['Electoral System: How Elections', 'Types of Elections: Lok', 'Election Commission of India', 'Electoral Roll (Voter List)', 'Election Process: Nomination, Campaigning,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c8_civ_ch1_6', title: 'Types of Elections: Lok Sabha, State Assembly, Local Body',
          caseStudy: { intro: 'Imagine walking down your street and noticing that the local garbage has not been collected for three days, while on television, you hear a debate about.',
            decisions: [{ prompt: 'Which type of election is held to choose representatives who will sit in the national Parliament at New Delhi to make laws for the entire.', options: [
                { text: 'the Lok Sabha election', outcome: 'The correct answer is the Lok Sabha election. A wrong answer—such as choosing State Assembly.' },
                { text: 'State Assembly or Local Body elections', outcome: 'Not quite — Students often confuse the three tiers of elections, believing that voting in a Lok Sabha election.', reveals: 'students-often-confuse-the-three' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_8', title: 'Electoral Roll (Voter List): Registration and Importance',
          caseStudy: { intro: 'Imagine you turn 18 and eagerly walk to your local polling booth on election day, only to find that the election officials cannot find your name in the.',
            decisions: [{ prompt: 'What is the official term for the comprehensive register that contains the names of all eligible citizens permitted to vote in.', options: [
                { text: 'the electoral roll (or voter list)', outcome: 'The correct answer is the electoral roll (or voter list). A wrong answer such as "candidate list".' },
                { text: 'candidate list', outcome: 'Not quite — Students often believe that simply turning 18 automatically places their name on the electoral roll.', reveals: 'simply-turning-18-automatically-places' },
                { text: 'party manifesto', outcome: 'Not quite — Students often believe that simply turning 18 automatically places their name on the electoral roll.', reveals: 'simply-turning-18-automatically-places' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_9', title: 'Election Process: Nomination, Campaigning, Polling, Counting',
          caseStudy: { intro: 'Imagine walking down your street during election season and seeing colourful posters, hearing loudspeakers, and watching neighbours discuss which candidate.',
            decisions: [{ prompt: 'What is the official first major step a prospective candidate must take to participate in an election?', options: [
                { text: 'filing a nomination paper', outcome: 'The correct answer is filing a nomination paper, which includes details about the candidate\'s.' },
                { text: 'starting a rally', outcome: 'Not quite — Students often think that political parties directly manage the polling booths and count the votes.', reveals: 'political-parties-directly-manage-the' },
                { text: 'buying votes', outcome: 'Not quite — Students often think that political parties directly manage the polling booths and count the votes.', reveals: 'political-parties-directly-manage-the' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_5', title: 'Use it in the wild',
          caseStudy: { intro: 'A housing society holds elections for its committee. The chairman proposes: \'Members who pay higher maintenance fees get three votes; ordinary members get one. Also, tenants who don\'t own flats may not vote.\'',
            decisions: [{ prompt: 'Does this fit the democratic principle of universal adult franchise?', options: [
                { text: 'No — franchise means one person, one vote of equal value for every adult citizen, with no weighting by wealth and no exclusion by property status; fees buy services, not extra political power.', outcome: 'This recognises that the equal value of each vote is the heart of the principle — letting money multiply votes recreates the old restricted-franchise systems democracy abolished.' },
                { text: 'It is fair — those who pay more have more at stake, so heavier votes reflect their bigger contribution.', outcome: 'That argument was exactly what property-based franchise used to justify; democracy counts heads, not wallets, because political equality cannot be purchased.', reveals: 'money-multiplies-votes' },
                { text: 'Only the tenant ban is wrong — excluding non-owners breaks the rule, but weighted votes for payers are acceptable.', outcome: 'Both clauses fail the same test: \'universal\' bars exclusions and \'one vote of equal value\' bars weighting; fixing only one still leaves unequal votes.', reveals: 'halfway-franchise' }
            ] }] } },
        { type: 'case', nodeId: 'c8_civ_ch1_9', title: 'You made it',
          caseStudy: { intro: 'One person, one vote, one value — three words that quietly ended millennia of \'some people matter more.\' The queue outside the booth is the most equal place in India.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_civ_ch1_5', difficulty: 'standard',
          question: 'The electoral system refers to the set of rules, laws, and institutional.',
          hint: 'Review c8_civ_ch1_2 and c8_civ_ch1_3 to reinforce who holds the right to vote and the.',
          misconception: 'Students often believe that the Prime Minister or the central government directly oversees, schedules, and runs.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The electoral system refers to the set of rules, laws, and institutional mechanisms',
                  options: ['The electoral system refers to the set of rules, laws, and institutional mechanisms', 'Universal Adult Franchise is the foundational democratic principle that every adult', 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'The scale of Indian elections refers to the massive logistical, administrative, and'],
                  hint: 'Review c8_civ_ch1_2 and c8_civ_ch1_3 to reinforce who holds the right to vote and the.',
                  misconception: 'Students often believe that the Prime Minister or the central government directly oversees, schedules, and runs election polling booths.' }
          ],
            remediations: { 'the-prime-minister-or-the': { steps: ['Clarify the separation of powers by reviewing how the Election Commission operates under Article 324.', 'Explain that while the government passes laws regarding elections, the administrative execution, scheduling, and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_6', difficulty: 'standard',
          question: 'The Indian electoral system operates across three distinct tiers.',
          hint: 'Review c6_civics_ch11_013 (Levels of Government: National, State, Local) and.',
          misconception: 'Students often confuse the three tiers of elections, believing that voting in a Lok Sabha election also automatically.',
          parts: [
                { id: 'a', prompt: 'Which type of election is held to choose representatives who will sit in the national Parliament at New Delhi to make laws for the entire country?', answer: 'the Lok Sabha election',
                  options: ['the Lok Sabha election', 'State Assembly or Local Body elections'],
                  hint: 'Review c6_civics_ch11_013 (Levels of Government: National, State, Local) and c6_civics_ch12_015.',
                  misconception: 'Students often confuse the three tiers of elections, believing that voting in a Lok Sabha election also automatically elects the state.' }
          ],
            remediations: { 'students-often-confuse-the-three': { steps: ['To fix this misconception, use a nested-circle diagram showing three levels: National (outermost circle - Lok Sabha.', 'Explain that just as a school has monitors for individual classrooms, sports captains for the whole school, and.', 'Walk through a local newspaper clipping showing simultaneous or staggered election dates for local municipal polls.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_7', difficulty: 'standard',
          question: 'The Election Commission of India (ECI) is an autonomous constitutional body.',
          hint: 'Review c7_civ_ch03_002: Three Organs of Government: Legislature, Executive, Judiciary.',
          misconception: 'Students often believe that the Election Commission of India creates election laws and passes bills regarding how.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Election Commission of India (ECI) is an autonomous constitutional body established',
                  options: ['The Election Commission of India (ECI) is an autonomous constitutional body established', 'Universal Adult Franchise is the foundational democratic principle that every adult', 'Free and fair elections form the bedrock of India\'s democratic process, ensuring that', 'The scale of Indian elections refers to the massive logistical, administrative, and'],
                  hint: 'Review c7_civ_ch03_002: Three Organs of Government: Legislature, Executive, Judiciary to understand.',
                  misconception: 'Students often believe that the Election Commission of India creates election laws and passes bills regarding how voting should take place.' }
          ],
            remediations: { 'the-election-commission-of-india': { steps: ['To correct this misconception, ask the student: "Who debates and votes on passing a new law in Parliament—the MPs.', 'Use a football analogy: the game rules are made by the sports board, but the referee enforces them during the match.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_8', difficulty: 'standard',
          question: 'The electoral roll, commonly known as the voter list, is an official register.',
          hint: 'Review node c8_civ_ch1_7 to understand the functions of the Election Commission of India.',
          misconception: 'Students often believe that simply turning 18 automatically places their name on the electoral roll without any active.',
          parts: [
                { id: 'a', prompt: 'What is the official term for the comprehensive register that contains the names of all eligible citizens permitted to vote in a constituency?', answer: 'the electoral roll (or voter list)',
                  options: ['the electoral roll (or voter list)', 'candidate list', 'party manifesto'],
                  hint: 'Review node c8_civ_ch1_7 to understand the functions of the Election Commission of India before.',
                  misconception: 'Students often believe that simply turning 18 automatically places their name on the electoral roll without any active paperwork.' }
          ],
            remediations: { 'simply-turning-18-automatically-places': { steps: ['To fix this misconception, explain that the government does not automatically register voters.', 'Show students Form 6 (the official application form for new voter registration) or demonstrate the National Voters\'.', 'Walk through a scenario where Rohan turns 18 on January 1st but cannot vote in March because he has not yet submitted.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c8_civ_ch1_9', difficulty: 'standard',
          question: 'The election process in India is a structured constitutional mechanism.',
          hint: 'Review c8_civ_ch1_7 to understand the powers and neutral role of the Election Commission.',
          misconception: 'Students often think that political parties directly manage the polling booths and count the votes themselves because.',
          parts: [
                { id: 'a', prompt: 'What is the official first major step a prospective candidate must take to participate in an election?', answer: 'filing a nomination paper',
                  options: ['filing a nomination paper', 'starting a rally', 'buying votes'],
                  hint: 'Review c8_civ_ch1_7 to understand the powers and neutral role of the Election Commission of India.',
                  misconception: 'Students often think that political parties directly manage the polling booths and count the votes themselves because their representatives.' }
          ],
            remediations: { 'political-parties-directly-manage-the': { steps: ['To fix this misconception, examine the layout of a polling station using a diagram or a mock classroom election.', 'Show that the polling officer sitting at the desk is a government school teacher or civil servant, not a party member.', 'Explain that polling agents from different parties sit outside the voting enclosure only to watch, just like a referee.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
