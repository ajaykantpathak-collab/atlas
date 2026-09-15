import type { SimDef } from '../../engine/types';

/** v3 generated — c9_civ_ch02_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_civ_ch02_p2: SimDef = {
    id: 'v3_c9_civ_ch02_p2',
    title: 'Elections and Political Parties · Part 2/2',
    subtitle: 'One vote, 968 million voters, one verdict',
    classLevel: 9, subject: 'civics', topic: 'Elections and Political Parties · Part 2/2',
    chapters: ['c9_civ_ch02'],
    nodeIds: ['c9_civ_ch2_5', 'c9_civ_ch2_6', 'c9_civ_ch2_7', 'c9_civ_ch2_8', 'c9_civ_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an election analyst', intro: 'India runs the biggest democratic exercise on Earth — but what does a vote actually DO? Trace how consent becomes authority, and why seat share and vote share can tell very different stories.', goal: 'Understand elections as the mechanism converting popular sovereignty into accountable government — Article 326\'s universal franchise, vertical accountability, and the FPTP gap between votes and seats.' },
    discovery: {
        question: 'In 2019, a party won 56% of Lok Sabha seats with only 37% of the votes. Nearly two-thirds voted for someone else — so where did the \'majority\' come from?',
        options: ['First-past-the-post amplifies wins: whoever leads in each seat takes it all, so modest vote leads snowball into huge seat majorities', 'The extra seats were freebies from the President', 'Voters changed their minds after counting', '37% is actually a majority'],
        answer: 'First-past-the-post amplifies wins: whoever leads in each seat takes it all, so modest vote leads snowball into huge seat majorities',
        hook: 'An election is more than picking a winner — it\'s the only binding, periodic, universal tool citizens have to fire a government without violence. But Article 326 gives everyone a vote, not a guarantee that votes translate evenly into power.',
    },
    teaching: [
        { title: 'Political Parties: Role and Functions', text: 'Political parties are organized groups of citizens who share common political ideology and goals, seek to capture political power through constitutional means (elections), and aim to form and run the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_civ_ch2_5', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow one vote through the system: from Article 326\'s promise to the ballot box to the seat tally — then test whether \'regular elections with high turnout\' alone prove a democracy is healthy, or just going through the motions.',
        labels: ['Political Parties: Role', 'Party Symbols and Recognition', 'Free and Fair Elections', 'Accessibility in Elections: EVMs', 'Anti-Defection Law: Purpose'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_civ_ch2_5', title: 'Political Parties: Role and Functions',
          caseStudy: { intro: 'Imagine you are watching a news debate about a new law being passed in Parliament.',
            decisions: [{ prompt: 'What is the primary constitutional means by which political parties in India seek to capture political power?', options: [
                { text: 'The primary constitutional means is contesting elections under the Representation of the', outcome: 'The primary constitutional means is contesting elections under the Representation of the People.' },
                { text: 'through protests', outcome: 'Not quite — Students often think political parties are part of the formal government structure (like the.', reveals: 'political-parties-are-part-of' },
                { text: 'by appointing leaders', outcome: 'Not quite — Students often think political parties are part of the formal government structure (like the.', reveals: 'political-parties-are-part-of' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_6', title: 'Party Symbols and Recognition Criteria',
          caseStudy: { intro: 'Imagine you are at a polling booth in 2024: the EVM shows a **Lotus**, a **Hand**, a **Cycle**, and a **Ceiling Fan**.',
            decisions: [{ prompt: 'What is the minimum vote-share threshold a party must secure in a State Legislative Assembly election to be eligible for recognition as.', options: [
                { text: '6% of the total valid votes polled in that State Assembly election', outcome: '6% of the total valid votes polled in that State Assembly election.' },
                { text: 'once a party gets a symbol, it owns it forever', outcome: 'Not quite — Students often believe **“once a party gets a symbol, it owns it forever”**.', reveals: 'once-a-party-gets-a' },
                { text: '**“once a party gets a symbol, it owns it forever”**', outcome: 'Not quite — Students often believe **“once a party gets a symbol, it owns it forever”**.', reveals: 'once-a-party-gets-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_7', title: 'Free and Fair Elections: Conditions and Safeguards',
          caseStudy: { intro: 'Imagine you are watching a news report about a local election where voters complain that they were threatened by party workers, the voting machines.',
            decisions: [{ prompt: 'What constitutional article establishes the Election Commission of India and vests it with the power of superintendence, direction, and.', options: [
                { text: 'Article 324 of the Indian Constitution establishes the Election Commission of India and', outcome: 'Article 324 of the Indian Constitution establishes the Election Commission of India and gives.' },
                { text: '\'free and fair elections\' only means \'no booth capturing on polling day\'', outcome: 'Not quite — Students often think that \'free and fair elections\' only means \'no booth capturing on polling day\'.', reveals: 'free-and-fair-elections-only' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_9', title: 'Anti-Defection Law: Purpose and Provisions',
          caseStudy: { intro: 'Imagine you voted for a candidate because they promised to support a specific policy as part of Party A.',
            decisions: [{ prompt: 'Which constitutional schedule contains the Anti-Defection Law, and by which amendment was it inserted?', options: [
                { text: 'The Anti-Defection Law is in the **Tenth Schedule**, inserted by the **52nd', outcome: 'The Anti-Defection Law is in the **Tenth Schedule**, inserted by the **52nd Constitutional.' },
                { text: 'Assertion-Reason', outcome: 'Not quite — **Misconception:** "The Speaker\'s decision on disqualification is final and cannot be challenged.', reveals: 'misconception-the-speaker-s-decision' },
                { text: 'no judicial review', outcome: 'Not quite — **Misconception:** "The Speaker\'s decision on disqualification is final and cannot be challenged.', reveals: 'misconception-the-speaker-s-decision' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_5', title: 'Use it in the wild',
          caseStudy: { intro: 'After record turnout in a general election, a columnist declares, \'With this many voters queueing, our democracy is fully functioning — the case is closed.\' A student who read about vote share, media fairness and between-elections accountability wants to disagree.',
            decisions: [{ prompt: 'What does turnout alone fail to prove?', options: [
                { text: 'Turnout proves only that people voted — the procedure ran. It says nothing about whether the contest was fair (free media, level funding field) or whether the government answers citizens between elections; a 55% seat win on 37% of votes can be legal yet thin on broad consent.', outcome: 'This distinguishes electoral ritual from substantive legitimacy — elections must be free, fair and consequential, not merely crowded.' },
                { text: 'The columnist is right — queues at booths are the definition of a working democracy.', outcome: 'Crowded booths can coexist with manipulated media, money power and unresponsive rule; the ritual can be full while the substance is hollow.', reveals: 'turnout-proves-democracy' },
                { text: 'Turnout actually proves the opposite — real democracies should let citizens protest instead of voting.', outcome: 'Protests supplement but cannot install or remove governments; the election is the binding mechanism — its quality, not its existence, is the issue.', reveals: 'protest-over-ballot' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_9', title: 'You made it',
          caseStudy: { intro: 'Elections turn \'the people rule\' into something enforceable: they authorise governments and peacefully remove them. But a manufactured majority reminds us — winning by the rules isn\'t the same as winning the people.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch2_5', difficulty: 'standard',
          question: 'Political parties are organized groups of citizens who share common political.',
          hint: 'Review c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and.',
          misconception: 'Students often think political parties are part of the formal government structure (like the Executive or Legislature).',
          parts: [
                { id: 'a', prompt: 'In a state legislative assembly, the ruling party has 110 seats, the main opposition party has 80 seats, and three smaller parties hold the remaining 10 seats.', answer: 'Yes, the main opposition party qualifies',
                  options: ['Yes, the main opposition party qualifies', 'needs 10% of total seats', 'requires 50 seats', 'ruling party'],
                  hint: 'Review c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and c9_civ_ch2_1.',
                  misconception: 'Students often think political parties are part of the formal government structure (like the Executive or Legislature) and that the "ruling.' },
                { id: 'b', prompt: 'Compare the role of political parties in a first-past-the-post (FPTP) system like India\'s with their role in a proportional representation (PR) system.', answer: 'FPTP tends to produce fewer, larger parties (often two dominant ones)',
                  options: ['FPTP tends to produce fewer, larger parties (often two dominant ones)', 'FPTP creates more parties', 'PR eliminates small parties', 'ruling party'],
                  hint: 'Review c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and c9_civ_ch2_1.',
                  misconception: 'Students often think political parties are part of the formal government structure (like the Executive or Legislature) and that the "ruling.' }
          ],
            remediations: { 'political-parties-are-part-of': { steps: ['Show a diagram of the Indian state with three branches (Legislature, Executive, Judiciary) and place "Political.', 'Use a news headline: "Parliament passes Bill X" vs "Party Y issues whip to support Bill X." Ask: Who voted? (MPs).', 'Read Article 75(3) – Council of Ministers responsible to Lok Sabha, not to party president.', 'Discuss: If the party and government were identical, could a PM be removed without party consent?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_5', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think political parties are part of the formal government structure (like the Executive or Legislature).',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Political parties in India have become mere election-winning machines, ignoring their function of political socialization and internal.', answer: 'The argument is partially valid',
                  options: ['The argument is partially valid', 'ruling party', 'government'],
                  hint: 'Review c8_civ_ch1_5 (Electoral System: How Elections Are Conducted in India) and c9_civ_ch2_1.',
                  misconception: 'Students often think political parties are part of the formal government structure (like the Executive or Legislature) and that the "ruling.' }
          ],
            remediations: { 'political-parties-are-part-of': { steps: ['Show a diagram of the Indian state with three branches (Legislature, Executive, Judiciary) and place "Political.', 'Use a news headline: "Parliament passes Bill X" vs "Party Y issues whip to support Bill X." Ask: Who voted? (MPs).', 'Read Article 75(3) – Council of Ministers responsible to Lok Sabha, not to party president.', 'Discuss: If the party and government were identical, could a PM be removed without party consent?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_6', difficulty: 'standard',
          question: 'Party symbols are visual identifiers allotted by the Election Commission.',
          hint: 'Revisit the **Election Commission’s powers (Art. 324)** and the **Symbols Order, 1968.',
          misconception: 'Students often believe **“once a party gets a symbol, it owns it forever”**.',
          parts: [
                { id: 'a', prompt: 'What is the minimum vote-share threshold a party must secure in a State Legislative Assembly election to be eligible for recognition as a **State Party**.', answer: '6% of the total valid votes polled in that State Assembly election',
                  options: ['6% of the total valid votes polled in that State Assembly election', 'once a party gets a symbol, it owns it forever', '**“once a party gets a symbol, it owns it forever”**'],
                  hint: 'Revisit the **Election Commission’s powers (Art. 324)** and the **Symbols Order, 1968 (Paras.',
                  misconception: 'Students often believe **“once a party gets a symbol, it owns it forever”**.' },
                { id: 'b', prompt: 'Party **X** contested the 2024 Lok Sabha election. It won **3 seats** (all from Maharashtra) and secured **7% vote share in Maharashtra**, **5% in Karnataka**.', answer: '**No.** Step 1: Check Criterion (a) – 6% vote share in ≥4 States',
                  options: ['**No.** Step 1: Check Criterion (a) – 6% vote share in ≥4 States', 'once a party gets a symbol, it owns it forever', '**“once a party gets a symbol, it owns it forever”**'],
                  hint: 'Revisit the **Election Commission’s powers (Art. 324)** and the **Symbols Order, 1968 (Paras.',
                  misconception: 'Students often believe **“once a party gets a symbol, it owns it forever”**.' }
          ],
            remediations: { 'once-a-party-gets-a': { steps: ['Open the **ECI’s latest “List of Political Parties and Symbols”** (PDF on eci.gov.in).', 'Pick one National Party (e.g., BJP), one State Party (e.g., DMK), and one unrecognised registered party.', 'Trace the **symbol column**: note the National Party’s symbol is marked “Reserved” nationwide; the State Party’s symbol.', 'Re-read the **Symbols Order, 1968, Para 6A–6C** for the exact thresholds.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_7', difficulty: 'standard',
          question: 'Free and fair elections refer to a democratic process where every eligible.',
          hint: 'If stuck, revisit the Election Commission\'s powers under Article 324 (c9_civ_ch2_2) and.',
          misconception: 'Students often think that \'free and fair elections\' only means \'no booth capturing on polling day\'.',
          parts: [
                { id: 'a', prompt: 'In a state assembly election, the ruling party\'s chief minister announces a new welfare scheme and distributes cash benefits two days before polling.', answer: 'The condition violated is the \'level playing field\'',
                  options: ['The condition violated is the \'level playing field\'', '\'free and fair elections\' only means \'no booth capturing on polling day\''],
                  hint: 'If stuck, revisit the Election Commission\'s powers under Article 324 (c9_civ_ch2_2) and the.',
                  misconception: 'Students often think that \'free and fair elections\' only means \'no booth capturing on polling day\'.' },
                { id: 'b', prompt: 'Compare the safeguards for \'secrecy of ballot\' in a ballot paper system versus the EVM-VVPAT system.', answer: 'The EVM-VVPAT system provides a stronger guarantee against voter intimidation',
                  options: ['The EVM-VVPAT system provides a stronger guarantee against voter intimidation', '\'free and fair elections\' only means \'no booth capturing on polling day\''],
                  hint: 'If stuck, revisit the Election Commission\'s powers under Article 324 (c9_civ_ch2_2) and the.',
                  misconception: 'Students often think that \'free and fair elections\' only means \'no booth capturing on polling day\'.' }
          ],
            remediations: { 'free-and-fair-elections-only': { steps: ['Re-read the five conditions of free and fair elections from the NCERT Class 9 textbook (Chapter 3, \'Electoral.', 'For each condition, write one real-world violation you have seen in news (e.g., deletion of names from voter list.', 'Match each violation to the specific safeguard that addresses it (e.g., voter list deletion -> EC\'s power to order.', 'Practice explaining this linkage to a peer — if you cannot explain the link, revisit the Representation of the People.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_8', difficulty: 'standard',
          question: 'Accessibility in elections refers to the constitutional and statutory measures.',
          hint: 'Revisit c8_civ_ch1_9 (Election Process: Nomination, Campaigning, Polling, Counting) and.',
          misconception: 'Students believe that \'accessibility\' only means physical ramps at polling stations, and that EVMs are inherently.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Accessibility in elections refers to the constitutional and statutory measures ensuring',
                  options: ['Accessibility in elections refers to the constitutional and statutory measures ensuring', 'Elections are the constitutional mechanism through', 'A coalition government is formed when no single political party secures an absolute', 'Misinformation in elections refers to the deliberate or unintentional spread of false,'],
                  hint: 'Revisit c8_civ_ch1_9 (Election Process: Nomination, Campaigning, Polling, Counting) and.',
                  misconception: 'Students believe that \'accessibility\' only means physical ramps at polling stations, and that EVMs are inherently inaccessible to disabled.' }
          ],
            remediations: { 'accessibility-only-means-physical-ramps': { steps: ['Show the student ECI\'s \'Assured Minimum Facilities\' checklist (ramp, lighting, drinking water, toilet, signage, Braille.', 'Walk through Rule 49N of Conduct of Elections Rules: \'If an elector is blind or infirm, the presiding officer shall.', 'Contrast with Service Voter proxy voting (Form 13F) under Section 60 of RP Act, 1951.', 'Use the 2024 Lok Sabha data: 1.2 crore PwD voters registered, 64 lakh voted — discuss why the gap exists (information.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_9', difficulty: 'standard',
          question: 'The Anti-Defection Law, enshrined in the **Tenth Schedule of the Indian.',
          hint: 'Revisit **c8_civ_ch2_1 (Parliamentary System)** for confidence mechanism and.',
          misconception: '**Misconception:** "The Speaker\'s decision on disqualification is final and cannot be challenged in court.".',
          parts: [
                { id: 'a', prompt: 'Which constitutional schedule contains the Anti-Defection Law, and by which amendment was it inserted?', answer: 'The Anti-Defection Law is in the **Tenth Schedule**, inserted by the **52nd',
                  options: ['The Anti-Defection Law is in the **Tenth Schedule**, inserted by the **52nd', 'Assertion-Reason', 'no judicial review'],
                  hint: 'Revisit **c8_civ_ch2_1 (Parliamentary System)** for confidence mechanism and **c9_civ_ch2_5.',
                  misconception: '**Misconception:** "The Speaker\'s decision on disqualification is final and cannot be challenged in court." **Reality:** In *Kihoto.' }
          ],
            remediations: { 'misconception-the-speaker-s-decision': { steps: ['**Read Paragraph 6 of the Tenth Schedule** (text available online) – note it says "decision of the Chairman/Speaker.', '**Read the *Kihoto Hollohan* summary**: The Court held "final" means final *within the legislature*, not immune from.', '**Create a two-column table**: "Speaker\'s Power" (Paragraph 6) vs.', '"Court\'s Power" (*Kihoto Hollohan*).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
