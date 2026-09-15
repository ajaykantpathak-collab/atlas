import type { SimDef } from '../../engine/types';

/** v3 generated — c9_civ_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_civ_ch02_p1: SimDef = {
    id: 'v3_c9_civ_ch02_p1',
    title: 'Elections and Political Parties · Part 1/2',
    subtitle: 'One vote, 968 million voters, one verdict',
    classLevel: 9, subject: 'civics', topic: 'Elections and Political Parties · Part 1/2',
    chapters: ['c9_civ_ch02'],
    nodeIds: ['c9_civ_ch2_1', 'c9_civ_ch2_10', 'c9_civ_ch2_11', 'c9_civ_ch2_2', 'c9_civ_ch2_3', 'c9_civ_ch2_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an election analyst', intro: 'India runs the biggest democratic exercise on Earth — but what does a vote actually DO? Trace how consent becomes authority, and why seat share and vote share can tell very different stories.', goal: 'Understand elections as the mechanism converting popular sovereignty into accountable government — Article 326\'s universal franchise, vertical accountability, and the FPTP gap between votes and seats.' },
    discovery: {
        question: 'In 2019, a party won 56% of Lok Sabha seats with only 37% of the votes. Nearly two-thirds voted for someone else — so where did the \'majority\' come from?',
        options: ['First-past-the-post amplifies wins: whoever leads in each seat takes it all, so modest vote leads snowball into huge seat majorities', 'The extra seats were freebies from the President', 'Voters changed their minds after counting', '37% is actually a majority'],
        answer: 'First-past-the-post amplifies wins: whoever leads in each seat takes it all, so modest vote leads snowball into huge seat majorities',
        hook: 'An election is more than picking a winner — it\'s the only binding, periodic, universal tool citizens have to fire a government without violence. But Article 326 gives everyone a vote, not a guarantee that votes translate evenly into power.',
    },
    teaching: [
        { title: 'Elections: Importance in a Democracy', text: 'Elections are the constitutional mechanism through which citizens exercise their sovereignty by choosing representatives to form government, ensuring that political power derives from the consent.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_civ_ch2_1', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Follow one vote through the system: from Article 326\'s promise to the ballot box to the seat tally — then test whether \'regular elections with high turnout\' alone prove a democracy is healthy, or just going through the motions.',
        labels: ['Elections: Importance in', 'Coalition Governments: Formation', 'Misinformation and Challenges', 'Election Commission of India', 'Electoral Rolls and Voter', 'Election Schedule: Process'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c9_civ_ch2_1', title: 'Elections: Importance in a Democracy',
          caseStudy: { intro: 'Imagine you\'re watching the 2024 Lok Sabha election results: 968 million voters, months of campaigning, and a peaceful transfer of power.',
            decisions: [{ prompt: 'What is the constitutional basis for universal adult franchise in India, and which article guarantees it?', options: [
                { text: 'Article 326 of the Constitution of India provides that elections to the Lok Sabha and', outcome: 'Article 326 of the Constitution of India provides that elections to the Lok Sabha and State.' },
                { text: 'elections = democracy', outcome: 'Not quite — Students often believe "elections = democracy" and that merely holding regular, multi-party.', reveals: 'elections-democracy-and-that-merely' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_10', title: 'Coalition Governments: Formation and Challenges',
          caseStudy: { intro: 'Imagine you are watching the 2024 Lok Sabha election results: the largest party wins 240 seats — short of the 272 majority mark.',
            decisions: [{ prompt: 'What is the minimum constitutional requirement for a coalition government to assume office at the Centre after a general election?', options: [
                { text: 'The coalition must demonstrate the support of a majority of the total membership of the', outcome: 'The coalition must demonstrate the support of a majority of the total membership of the Lok Sabha.' },
                { text: 'the single largest party automatically forms government', outcome: 'Not quite — Students often believe a coalition government is formed simply by adding up the seat numbers.', reveals: 'a-coalition-government-is-formed' },
                { text: 'a simple majority of those present and voting', outcome: 'Not quite — Students often believe a coalition government is formed simply by adding up the seat numbers.', reveals: 'a-coalition-government-is-formed' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_11', title: 'Misinformation and Challenges in Elections',
          caseStudy: { intro: 'Imagine you receive a WhatsApp forward two days before voting claiming your preferred candidate has withdrawn from the race and joined the rival party — the.',
            decisions: [{ prompt: 'Define "misinformation" in the specific context of Indian elections and name one constitutional article that guarantees the freedom which.', options: [
                { text: 'Misinformation in elections is the spread of false or misleading information (fake news,', outcome: 'Misinformation in elections is the spread of false or misleading information (fake news, deepfakes.' },
                { text: 'misinformation is just lying', outcome: 'Not quite — Students believe misinformation is only "fake news articles" on Facebook/Twitter, ignoring that.', reveals: 'misinformation-is-only-fake-news' },
                { text: 'fake news articles', outcome: 'Not quite — Students believe misinformation is only "fake news articles" on Facebook/Twitter, ignoring that.', reveals: 'misinformation-is-only-fake-news' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_2', title: 'Election Commission of India: Role and Functions',
          caseStudy: { intro: 'Imagine you\'re watching the 2024 Lok Sabha election results on TV — the anchor mentions "ECI has directed a repoll in 3 booths" and "Model Code violation.',
            decisions: [{ prompt: 'Under which constitutional article is the Election Commission of India established, and what are the three specific election domains.', options: [
                { text: 'Article 324 establishes ECI', outcome: 'Article 324 establishes ECI. It controls elections to: (1) Parliament (Lok Sabha + Rajya Sabha).' },
                { text: 'Article 326', outcome: 'Not quite — Students think **Model Code of Conduct (MCC) is a law passed by Parliament** and that ECI enforces.', reveals: 'model-code-of-conduct-mcc' },
                { text: 'only Lok Sabha elections', outcome: 'Not quite — Students think **Model Code of Conduct (MCC) is a law passed by Parliament** and that ECI enforces.', reveals: 'model-code-of-conduct-mcc' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_3', title: 'Electoral Rolls and Voter Registration',
          caseStudy: { intro: 'Imagine your older cousin just turned 18 in March but finds her name missing from the voter list when the Lok Sabha elections are announced in April.',
            decisions: [{ prompt: 'What is the qualifying date for age eligibility to get enrolled in the electoral roll in a given year?', options: [
                { text: 'The qualifying date is **1st January** of the year in', outcome: 'The qualifying date is **1st January** of the year in which the electoral roll is prepared.' },
                { text: 'date of application', outcome: 'Not quite — Students think **"getting a Voter ID card (EPIC) is the same as being on the electoral roll."**.', reveals: 'getting-a-voter-id-card' },
                { text: 'election day', outcome: 'Not quite — Students think **"getting a Voter ID card (EPIC) is the same as being on the electoral roll."**.', reveals: 'getting-a-voter-id-card' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_4', title: 'Election Schedule: Process and Stages',
          caseStudy: { intro: 'Imagine you see a news headline: "ECI announces 7-phase Lok Sabha elections starting April 19; Model Code of Conduct in force." As a Class 9 student, you.',
            decisions: [{ prompt: 'What constitutional article empowers the Election Commission of India to announce and enforce the election schedule?', options: [
                { text: 'Article 324 of the Constitution of India vests the superintendence, direction, and', outcome: 'Article 324 of the Constitution of India vests the superintendence, direction, and control.' },
                { text: 'notification', outcome: 'Not quite — Students often think the "notification" and "announcement" are the same event.', reveals: 'the-notification-and-announcement-are' },
                { text: 'announcement', outcome: 'Not quite — Students often think the "notification" and "announcement" are the same event.', reveals: 'the-notification-and-announcement-are' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_1', title: 'Use it in the wild',
          caseStudy: { intro: 'After record turnout in a general election, a columnist declares, \'With this many voters queueing, our democracy is fully functioning — the case is closed.\' A student who read about vote share, media fairness and between-elections accountability wants to disagree.',
            decisions: [{ prompt: 'What does turnout alone fail to prove?', options: [
                { text: 'Turnout proves only that people voted — the procedure ran. It says nothing about whether the contest was fair (free media, level funding field) or whether the government answers citizens between elections; a 55% seat win on 37% of votes can be legal yet thin on broad consent.', outcome: 'This distinguishes electoral ritual from substantive legitimacy — elections must be free, fair and consequential, not merely crowded.' },
                { text: 'The columnist is right — queues at booths are the definition of a working democracy.', outcome: 'Crowded booths can coexist with manipulated media, money power and unresponsive rule; the ritual can be full while the substance is hollow.', reveals: 'turnout-proves-democracy' },
                { text: 'Turnout actually proves the opposite — real democracies should let citizens protest instead of voting.', outcome: 'Protests supplement but cannot install or remove governments; the election is the binding mechanism — its quality, not its existence, is the issue.', reveals: 'protest-over-ballot' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch2_4', title: 'The bigger picture',
          caseStudy: { intro: 'Elections turn \'the people rule\' into something enforceable: they authorise governments and peacefully remove them. But a manufactured majority reminds us — winning by the rules isn\'t the same as winning the people.',
            decisions: [{ prompt: 'What comes next? Elections and Political Parties · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Elections and Political Parties · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch2_1', difficulty: 'standard',
          question: 'Elections are the constitutional mechanism through which citizens exercise.',
          hint: 'Revisit c8_civ_ch1_3 (Article 326) and c6_civics_ch11_011 (Lincoln\'s definition).',
          misconception: 'Students often believe "elections = democracy" and that merely holding regular, multi-party elections with high turnout.',
          parts: [
                { id: 'a', prompt: 'Explain why elections are considered the "primary mechanism" for translating popular sovereignty into governmental authority in a democracy, rather than just.', answer: 'Elections are primary',
                  options: ['Elections are primary', 'elections = democracy'],
                  hint: 'Revisit c8_civ_ch1_3 (Article 326) and c6_civics_ch11_011 (Lincoln\'s definition) to reconnect the.',
                  misconception: 'Students often believe "elections = democracy" and that merely holding regular, multi-party elections with high turnout automatically makes.' },
                { id: 'b', prompt: 'In 2014, a party won 282 seats (52% of Lok Sabha) with 31% vote share. In 2019, the same party won 303 seats (56%) with 37.4% vote share.', answer: 'The data shows FPTP amplifies seat majorities beyond vote majorities, creating a',
                  options: ['The data shows FPTP amplifies seat majorities beyond vote majorities, creating a', 'majority won', 'elections = democracy'],
                  hint: 'Revisit c8_civ_ch1_3 (Article 326) and c6_civics_ch11_011 (Lincoln\'s definition) to reconnect the.',
                  misconception: 'Students often believe "elections = democracy" and that merely holding regular, multi-party elections with high turnout automatically makes.' }
          ],
            remediations: { 'elections-democracy-and-that-merely': { steps: ['Contrast two Indian election scenarios – 1977 (post-Emergency, genuine choice, high accountability) vs.', 'Use the "Polyarchy" checklist (Dahl): free/fair elections, inclusive suffrage, right to run, free expression.', 'Map each Indian election to this checklist – students identify which dimensions are met and which are compromised.', 'Conclude that elections are *necessary but not sufficient* for democracy; they require a surrounding ecosystem.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_10', difficulty: 'standard',
          question: 'A coalition government is formed when no single political party secures.',
          hint: 'If stuck, revisit the distinction between "plurality" (most seats) and "majority" (more.',
          misconception: 'Students often believe a coalition government is formed simply by adding up the seat numbers of friendly parties after.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A coalition government is formed when no single political party secures an absolute',
                  options: ['A coalition government is formed when no single political party secures an absolute', 'Elections are the constitutional mechanism through', 'Misinformation in elections refers to the deliberate or unintentional spread of false,', 'The Election Commission of India (ECI) is an independent constitutional body established'],
                  hint: 'If stuck, revisit the distinction between "plurality" (most seats) and "majority" (more than half).',
                  misconception: 'Students often believe a coalition government is formed simply by adding up the seat numbers of friendly parties after the election, and.' }
          ],
            remediations: { 'a-coalition-government-is-formed': { steps: ['Re-read Article 75(1) — "The Prime Minister shall be appointed by the President and the other Ministers shall.', 'Study the Sarkaria Commission (1988) and Punchhi Commission (2010) recommendations on Governor\'s discretion (available.', 'Create a flowchart: Election Result → President\'s Invitation Order (1. Single largest party/pre-poll alliance 2.', 'Apply this flowchart to the 1996 Vajpayee (13 days), 1997 Gujral, and 2004 Manmohan Singh formations to see the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_10', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe a coalition government is formed simply by adding up the seat numbers of friendly parties after.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "Coalition governments are inherently bad for economic reforms because they require consensus among diverse partners, leading to policy.', answer: 'The argument is partially valid but oversimplified',
                  options: ['The argument is partially valid but oversimplified', 'coalitions always block reforms', 'coalitions never affect reforms'],
                  hint: 'If stuck, revisit the distinction between "plurality" (most seats) and "majority" (more than half).',
                  misconception: 'Students often believe a coalition government is formed simply by adding up the seat numbers of friendly parties after the election, and.' }
          ],
            remediations: { 'a-coalition-government-is-formed': { steps: ['Re-read Article 75(1) — "The Prime Minister shall be appointed by the President and the other Ministers shall.', 'Study the Sarkaria Commission (1988) and Punchhi Commission (2010) recommendations on Governor\'s discretion (available.', 'Create a flowchart: Election Result → President\'s Invitation Order (1. Single largest party/pre-poll alliance 2.', 'Apply this flowchart to the 1996 Vajpayee (13 days), 1997 Gujral, and 2004 Manmohan Singh formations to see the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_11', difficulty: 'standard',
          question: 'Misinformation in elections refers to the deliberate or unintentional spread.',
          hint: 'Revisit c9_civ_ch2_7 (conditions for free/fair elections) and c6_civics_ch15_038.',
          misconception: 'Students believe misinformation is only "fake news articles" on Facebook/Twitter, ignoring that **WhatsApp forwards.',
          parts: [
                { id: 'a', prompt: 'A deepfake video of a candidate making hate speech goes viral 24 hours before polling in a sensitive constituency. The Returning Officer receives complaints.', answer: 'Can the RO order the video\'s removal?',
                  options: ['Can the RO order the video\'s removal?', 'RO has no power over social media', 'candidate goes to jail', 'fake news articles'],
                  hint: 'Revisit c9_civ_ch2_7 (conditions for free/fair elections) and c6_civics_ch15_038 (critical media.',
                  misconception: 'Students believe misinformation is only "fake news articles" on Facebook/Twitter, ignoring that **WhatsApp forwards, manipulated WhatsApp.' }
          ],
            remediations: { 'misinformation-is-only-fake-news': { steps: ['Show the student two real 2024 election examples: (a) a deepfake audio of a leader in Tamil Nadu, (b) a fabricated ECI.', 'Walk through the "Voter Verification Protocol" (Diagnostic Q6) on each — demonstrate how Step 2 (fact-check sites) and.', 'Have them read Article 19(1)(a) and 19(2) side-by-side to see the constitutional tension: free speech enables.', 'Assign: "Track one political claim in your family WhatsApp group for 3 days; apply the protocol; write what you found."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_2', difficulty: 'standard',
          question: 'The Election Commission of India (ECI) is an independent constitutional body.',
          hint: 'Revisit Article 324 text and the 2023 Supreme Court judgment (Anoop Baranwal v.',
          misconception: 'Students think **Model Code of Conduct (MCC) is a law passed by Parliament** and that ECI enforces it like a statute.',
          parts: [
                { id: 'a', prompt: 'Under which constitutional article is the Election Commission of India established, and what are the three specific election domains it controls?', answer: 'Article 324 establishes ECI',
                  options: ['Article 324 establishes ECI', 'Article 326', 'only Lok Sabha elections', 'level playing field'],
                  hint: 'Revisit Article 324 text and the 2023 Supreme Court judgment (Anoop Baranwal v.',
                  misconception: 'Students think **Model Code of Conduct (MCC) is a law passed by Parliament** and that ECI enforces it like a statute.' },
                { id: 'b', prompt: 'During a state assembly election, the ruling party\'s Chief Minister announces a new welfare scheme two days before polling.', answer: 'ECI should rule it a violation',
                  options: ['ECI should rule it a violation', 'no violation since approved earlier', 'level playing field', 'ultra vires'],
                  hint: 'Revisit Article 324 text and the 2023 Supreme Court judgment (Anoop Baranwal v.',
                  misconception: 'Students think **Model Code of Conduct (MCC) is a law passed by Parliament** and that ECI enforces it like a statute.' },
                { id: 'c', prompt: 'Compare ECI\'s power to disqualify a candidate for corrupt practices (under Representation of People Act, 1951) with its power to derecognize a political party.', answer: 'Disqualification of candidates (Section 8A, RPA 1951) is **statutory**',
                  options: ['Disqualification of candidates (Section 8A, RPA 1951) is **statutory**', 'both are constitutional', 'level playing field', 'ultra vires'],
                  hint: 'Revisit Article 324 text and the 2023 Supreme Court judgment (Anoop Baranwal v.',
                  misconception: 'Students think **Model Code of Conduct (MCC) is a law passed by Parliament** and that ECI enforces it like a statute.' }
          ],
            remediations: { 'model-code-of-conduct-mcc': { steps: ['Show the student the **Election Symbols (Reservation and Allotment) Order, 1968** — Paragraph 16A (derecognition power).', 'Ask: "Find the words \'Act of Parliament\' or \'Statute\' in the MCC." They won\'t find them.', 'Read Article 324(1) together: "superintendence, direction and control of elections shall be vested in a Commission."', 'Explain: MCC is an **administrative instrument** created by ECI under this constitutional vesting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_3', difficulty: 'standard',
          question: 'The electoral roll (voter list) is the official register of all eligible.',
          hint: 'Revisit **Article 326** and **Section 16 of RPA 1950** (disqualifications: non-citizen.',
          misconception: 'Students think **"getting a Voter ID card (EPIC) is the same as being on the electoral roll."** They believe the.',
          parts: [
                { id: 'a', prompt: 'What is the qualifying date for age eligibility to get enrolled in the electoral roll in a given year?', answer: 'The qualifying date is **1st January** of the year in',
                  options: ['The qualifying date is **1st January** of the year in', 'date of application', 'election day', 'getting a Voter ID card (EPIC) is the same as being on the electoral roll'],
                  hint: 'Revisit **Article 326** and **Section 16 of RPA 1950** (disqualifications: non-citizen, unsound.',
                  misconception: 'Students think **"getting a Voter ID card (EPIC) is the same as being on the electoral roll."** They believe the plastic card *grants* the.' }
          ],
            remediations: { 'getting-a-voter-id-card': { steps: ['Show the student the **ECI\'s "Search Your Name in Electoral Roll" portal** — enter details *without* EPIC number.', 'Read **Section 23 of RPA 1950**: "The electoral roll for a constituency shall be prepared in the prescribed manner...', '*and shall be the electoral roll for that constituency*." 3.', 'Simulate: "Your EPIC says Constituency A, but the final roll published last month shows your name in Constituency B due.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch2_4', difficulty: 'standard',
          question: 'The election schedule is the legally mandated timeline issued by the Election.',
          hint: 'If stuck, revisit c8_civ_ch1_9 for the basic election steps and c9_civ_ch2_2 for Article.',
          misconception: 'Students often think the "notification" and "announcement" are the same event.',
          parts: [
                { id: 'a', prompt: 'Why does the Model Code of Conduct (MCC) come into effect immediately upon the announcement of the election schedule by the ECI, rather than at the.', answer: 'The MCC applies from announcement',
                  options: ['The MCC applies from announcement', 'MCC starts at notification', 'notification', 'announcement'],
                  hint: 'If stuck, revisit c8_civ_ch1_9 for the basic election steps and c9_civ_ch2_2 for Article 324 and.',
                  misconception: 'Students often think the "notification" and "announcement" are the same event.' },
                { id: 'b', prompt: 'A state legislative assembly is dissolved prematurely. The ECI announces a by-election schedule with nomination on Day 10, scrutiny on Day 11, withdrawal.', answer: 'Yes, withdrawal on Day 12 is valid',
                  options: ['Yes, withdrawal on Day 12 is valid', 'withdrawal not allowed after scrutiny', 'notification', 'announcement'],
                  hint: 'If stuck, revisit c8_civ_ch1_9 for the basic election steps and c9_civ_ch2_2 for Article 324 and.',
                  misconception: 'Students often think the "notification" and "announcement" are the same event.' }
          ],
            remediations: { 'the-notification-and-announcement-are': { steps: ['To fix this, have the student create a two-column table: Column A "ECI Announcement (Press Conference)" – date, purpose.', 'Column B "Statutory Notification (Gazette)" – date (usually a few days later), purpose (legally constitutes election.', 'Use a real example: 2024 Lok Sabha schedule announced 16 March, notification for Phase 1 issued 20 March.', 'Ask: "If a minister inaugurates a project on 18 March, does MCC apply?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
