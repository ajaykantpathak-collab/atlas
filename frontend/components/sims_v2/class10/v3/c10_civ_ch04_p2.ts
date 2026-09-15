import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch04_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch04_p2: SimDef = {
    id: 'v3_c10_civ_ch04_p2',
    title: 'Political Parties · Part 2/2',
    subtitle: 'Crack the criteria that make a party \'national\' — and why parties exist',
    classLevel: 10, subject: 'civics', topic: 'Political Parties · Part 2/2',
    chapters: ['c10_civ_ch04'],
    nodeIds: ['c10_civ_cbse_04_007', 'c10_civ_cbse_04_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an Election Commission official auditing party status', intro: 'Symbols on TV, manifestos in the news, governments rising and falling — parties are democracy\'s loudest institutions. But what exactly earns one the word \'national\'?', goal: 'State the ECI criteria for national-party status and list what parties do between elections, not just during them.' },
    discovery: {
        question: 'TMC runs the government of West Bengal — yet the Election Commission revoked its \'national party\' status, while AAP, newer and smaller, got it. How can a party that rules a whole state lose that tag?',
        options: ['\'National\' is an election-performance label — vote share and seats across several states — not a measure of governing power', 'It can\'t — the Election Commission made an obvious error', 'AAP bribed its way to the status; TMC refused to', 'TMC lost it because it only contests state elections, never Lok Sabha'],
        answer: '\'National\' is an election-performance label — vote share and seats across several states — not a measure of governing power',
        hook: 'The tag sounds like prestige but it\'s pure arithmetic: roughly 6% of valid votes in four-plus states and at least four Lok Sabha seats. Governing a state doesn\'t enter the formula.',
    },
    teaching: [
        { title: 'Reforming Political Parties: How Can Parties Be Reformed', text: 'Political party reform refers to the deliberate legal, institutional, and societal measures aimed at addressing systemic challenges — lack of internal democracy, dynastic succession, money and muscle.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play Election Commissioner: apply the official criteria to real parties, decide who earns the national tag — and explain why democracy can\'t run without parties at all.',
        labels: ['Reforming Political Parties: How', 'Role of Opposition Parties'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_007', title: 'Reforming Political Parties: How Can Parties Be Reformed',
          caseStudy: { intro: 'Imagine you read a news report: "A major national party\'s presidential candidate is chosen by a closed-door meeting of five family members, while 50 lakh.',
            decisions: [{ prompt: 'Name the constitutional article that empowers the Election Commission to register and regulate political parties, and state one condition.', options: [
                { text: 'Article 324 read with Section 29A of the Representation of the People Act, 1951', outcome: 'Article 324 read with Section 29A of the Representation of the People Act, 1951.' },
                { text: 'no conditions', outcome: 'Not quite — Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).', reveals: 'reforming-parties-means-only-passing' },
                { text: 'reforming parties', outcome: 'Not quite — Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).', reveals: 'reforming-parties-means-only-passing' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_008', title: 'Role of Opposition Parties in a Democracy',
          caseStudy: { intro: 'Imagine you are watching a televised Lok Sabha session where the ruling party has 300+ seats and the main opposition has only 50.',
            decisions: [{ prompt: 'Name the constitutional article or statutory provision that formally recognises the position of Leader of Opposition in the Lok Sabha and.', options: [
                { text: 'The Leader of Opposition is recognised under the Salary and Allowances of Leaders of', outcome: 'The Leader of Opposition is recognised under the Salary and Allowances of Leaders of Opposition.' },
                { text: 'Article 75', outcome: 'Not quite — Students often think the Opposition\'s job is only to "oppose everything the government does".', reveals: 'the-opposition-s-job-is' },
                { text: 'Article 93', outcome: 'Not quite — Students often think the Opposition\'s job is only to "oppose everything the government does".', reveals: 'the-opposition-s-job-is' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_007', title: 'A real-world call',
          caseStudy: { intro: 'A party can field a candidate with a criminal record who wins reliably, or a clean candidate who might lose. The seat decides who controls the government.',
            decisions: [{ prompt: 'Does a \'necessary\' win excuse a compromised candidate?', options: [
                { text: 'Yes — losing means no chance to do good at all', outcome: 'The realist argument; every party that says this keeps the pipeline of compromised candidates full.' },
                { text: 'No — the means define what you\'d do with power', outcome: 'The integrity argument — a party that wins by compromising candidates has already shown what it will do in office.' },
                { text: 'The voters should know and decide', outcome: 'Transparency as the minimum — but information alone hasn\'t stopped criminal-record candidates from winning.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbourhood\'s only park is crumbling, but residents disagree on the fix — some want a playground, some a walking track, some a parking lot. At the residents\' meeting someone declares: \'We don\'t need any association or committee — every person should just fight for their own demand.\'',
            decisions: [{ prompt: 'Why would forming an organised group with a clear programme serve the residents better than everyone lobbying alone?', options: [
                { text: 'An organised body bundles many individual demands into one workable programme, contests for the authority to act, and can be held responsible if it fails — the same linkage function political parties perform between citizens and government. 200 lone voices cannot negotiate, but a committee with a platform can.', outcome: 'Parties and associations exist precisely to aggregate scattered preferences, mobilise support, and turn demands into policy — no single resident could do that alone.' },
                { text: 'The speaker is right — committees only add politics; if each resident pressures the municipality separately, the best demand will win on its own merit.', outcome: 'Without aggregation, conflicting demands cancel out and officials face a noise of voices with no one accountable for delivering anything.', reveals: 'parties-are-needless' },
                { text: 'The park question should be settled by whoever shouts loudest or donates most, since money and voice show real commitment.', outcome: 'That replaces aggregation with power — the richest or loudest resident wins regardless of what the community needs.', reveals: 'loudest-voice-wins' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_008', title: 'You made it',
          caseStudy: { intro: 'Parties are how 968 million voters\' clashing preferences get bundled into a governable choice. Visible at election time, indispensable every day in between.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_007', difficulty: 'standard',
          question: 'Political party reform refers to the deliberate legal, institutional, and.',
          hint: 'If stuck, revisit the "Challenges to Political Parties" mind-map from nodes 005 and 006.',
          misconception: 'Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).',
          parts: [
                { id: 'a', prompt: 'Name the constitutional article that empowers the Election Commission to register and regulate political parties, and state one condition it imposes for.', answer: 'Article 324 read with Section 29A of the Representation of the People Act, 1951',
                  options: ['Article 324 read with Section 29A of the Representation of the People Act, 1951', 'no conditions', 'reforming parties', '"reforming parties" means only passing new laws (like the Anti-Defection Law)'],
                  hint: 'If stuck, revisit the "Challenges to Political Parties" mind-map from nodes 005 and 006, and the.',
                  misconception: 'Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).' },
                { id: 'b', prompt: 'Compare the Law Commission\'s 255th Report recommendation for internal party elections with the Supreme Court\'s 2013 directive in *People\'s Union for Civil.', answer: 'Common principle: parties are public institutions accountable to citizens',
                  options: ['Common principle: parties are public institutions accountable to citizens', 'public institution', 'reforming parties', '"reforming parties" means only passing new laws (like the Anti-Defection Law)'],
                  hint: 'If stuck, revisit the "Challenges to Political Parties" mind-map from nodes 005 and 006, and the.',
                  misconception: 'Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).' }
          ],
            remediations: { 'reforming-parties-means-only-passing': { steps: ['Re-read the *PUCL v. Union of India* (2013) summary in the textbook box "How can parties be reformed?"', 'Create a three-column table: Challenge (node 005/006) | Legal Reform | Judicial/Civil Society Reform.', 'For each challenge, write one sentence on why Parliament failed to act and how courts/NGOs filled the gap.', 'Memorize the phrase "parties are public institutions" — it is the constitutional anchor for all reform.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "State funding of elections will eliminate money power in politics." Consider fiscal burden, fairness to new parties, and international.', answer: 'Partial agreement',
                  options: ['Partial agreement', 'yes/no', 'reforming parties', '"reforming parties" means only passing new laws (like the Anti-Defection Law)'],
                  hint: 'If stuck, revisit the "Challenges to Political Parties" mind-map from nodes 005 and 006, and the.',
                  misconception: 'Students think "reforming parties" means only passing new laws (like the Anti-Defection Law).' }
          ],
            remediations: { 'reforming-parties-means-only-passing': { steps: ['Re-read the *PUCL v. Union of India* (2013) summary in the textbook box "How can parties be reformed?"', 'Create a three-column table: Challenge (node 005/006) | Legal Reform | Judicial/Civil Society Reform.', 'For each challenge, write one sentence on why Parliament failed to act and how courts/NGOs filled the gap.', 'Memorize the phrase "parties are public institutions" — it is the constitutional anchor for all reform.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_008', difficulty: 'standard',
          question: 'The Opposition in a democracy refers to the political party or coalition.',
          hint: 'Revisit c8_civ_ch2_6 "Functions of Parliament: Lawmaking, Budget, Oversight" and memorise.',
          misconception: 'Students often think the Opposition\'s job is only to "oppose everything the government does" — i.e., blind.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Opposition in a democracy refers to the political party or coalition of parties that',
                  options: ['The Opposition in a democracy refers to the political party or coalition of parties that', 'A political party is an organized group of citizens who share common political goals and', 'Major national political parties in India are political parties recognized by the', 'A party system refers to the number of effective political parties that compete for power'],
                  hint: 'Revisit c8_civ_ch2_6 "Functions of Parliament: Lawmaking, Budget, Oversight" and memorise the table.',
                  misconception: 'Students often think the Opposition\'s job is only to "oppose everything the government does" — i.e., blind obstructionism.' }
          ],
            remediations: { 'the-opposition-s-job-is': { steps: ['Re-read the NCERT Class 10 Political Parties chapter section "Role of Opposition" and list the four positive functions.', 'Watch a 15-minute clip of Lok Sabha Question Hour (available on Sansad TV YouTube) and note how Opposition MPs frame.', 'Compare with a no-confidence motion debate transcript to see how the same MPs switch from constructive questioning.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
