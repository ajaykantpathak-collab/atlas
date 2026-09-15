import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch12_p2: SimDef = {
    id: 'v3_c11_ps_ch12_p2',
    title: 'Election and Representation · Part 2/2',
    subtitle: 'See why your vote is sovereignty delegated, not sovereignty diluted.',
    classLevel: 11, subject: 'political_science', topic: 'Election and Representation · Part 2/2',
    chapters: ['c11_ps_ch12'],
    nodeIds: ['c11_ps_cbse_12_007', 'c11_ps_cbse_12_008', 'c11_ps_cbse_12_009', 'c11_ps_cbse_12_010', 'c11_ps_cbse_12_011', 'c11_ps_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a voter tracing where their ballot\'s power actually travels', intro: 'You never vote on a single law — yet you\'re still sovereign; the difference between authorising and exercising is the system.', goal: 'Distinguish popular sovereignty from direct rule and explain indirect election mechanics.' },
    discovery: {
        question: 'The people are sovereign — so why can\'t citizens vote directly on the farm laws themselves?',
        options: ['Because Indian sovereignty is exercised through representatives — the people authorise power but don\'t wield it law-by-law', 'Because the Constitution forgot referendums', 'Because voters aren\'t educated enough', 'No reason — direct voting is actually allowed'],
        answer: 'Because Indian sovereignty is exercised through representatives — the people authorise power but don\'t wield it law-by-law',
        hook: 'And the President isn\'t picked by the PM — an electoral college of elected MPs and MLAs votes; indirect election means representatives choose, not the executive.',
    },
    teaching: [
        { title: 'Reservation of constituencies for SCs and STs', text: 'Reservation of constituencies for SCs and STs is a constitutional mechanism under Articles 330 and 332 of the Indian Constitution that reserves a certain number of seats in the Lok Sabha and State.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weigh simultaneous elections against accountability, then argue two points each for and against a directly elected President.',
        labels: ['Reservation of constituencies', 'Election Commission of India', 'Conduct of elections: Electoral', 'Model Code of Conduct', 'Electoral reforms in India', 'Independent candidates and party'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_007', title: 'Reservation of constituencies for SCs and STs',
          caseStudy: { intro: 'Imagine you are reading a news report about the upcoming delimitation exercise after the 2026 Census, which will change the number of reserved seats in your.',
            decisions: [{ prompt: 'Which constitutional articles provide for reservation of seats for Scheduled Castes and Scheduled Tribes in the Lok Sabha and State.', options: [
                { text: 'Article 330 provides for reservation of seats for SCs and STs in the Lok Sabha, and', outcome: 'Article 330 provides for reservation of seats for SCs and STs in the Lok Sabha, and Article 332.' },
                { text: 'reserved constituency', outcome: 'Not quite — Students often think that in a reserved constituency, only SC/ST voters can vote.', reveals: 'in-a-reserved-constituency' },
                { text: 'separate electorate', outcome: 'Not quite — Students often think that in a reserved constituency, only SC/ST voters can vote.', reveals: 'in-a-reserved-constituency' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_008', title: 'Election Commission of India: Composition and functions',
          caseStudy: { intro: 'Imagine you are watching the 2024 Lok Sabha election coverage.',
            decisions: [{ prompt: 'Under which specific Article of the Constitution is the Election Commission of India established?', options: [
                { text: '**Answer:** Article 324 establishes the ECI', outcome: '**Answer:** Article 324 establishes the ECI. Originally (1950), Article 324(2) provided for.' },
                { text: 'department under the Government of India', outcome: 'Not quite — **Students think the Election Commission is a "department under the Government of India" (like the.', reveals: 'students-think-the-election-commission' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_010', title: 'Model Code of Conduct and election expenses',
          caseStudy: { intro: 'Imagine you\'re watching a news clip during Lok Sabha elections: a Minister inaugurates a new highway project in a poll-bound state, while an opposition leader.',
            decisions: [{ prompt: 'What is the constitutional source of the Election Commission\'s authority to issue and enforce the Model Code of Conduct?', options: [
                { text: 'Article 324 of the Constitution vests "superintendence, direction, and control of', outcome: 'Article 324 of the Constitution vests "superintendence, direction, and control of elections" in the.' },
                { text: 'Representation of People Act', outcome: 'Not quite — Students believe the Model Code of Conduct is a "law" passed by Parliament with statutory.', reveals: 'the-model-code-of-conduct' },
                { text: 'Supreme Court judgment', outcome: 'Not quite — Students believe the Model Code of Conduct is a "law" passed by Parliament with statutory.', reveals: 'the-model-code-of-conduct' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_011', title: 'Electoral reforms in India: EVMs, NOTA, and ongoing debates',
          caseStudy: { intro: 'Imagine you\'re watching the 2024 Lok Sabha election results: a candidate wins by 50,000 votes, but 15,000 voters pressed NOTA, and the losing party alleges EVM.',
            decisions: [{ prompt: 'What is the constitutional basis for the introduction of NOTA in Indian elections, and which Supreme Court case mandated it?', options: [
                { text: 'NOTA was introduced through the Supreme Court\'s 2013 judgment in People\'s Union for Civil', outcome: 'NOTA was introduced through the Supreme Court\'s 2013 judgment in People\'s Union for Civil Liberties.' },
                { text: 'hack-proof', outcome: 'Not quite — Students often believe EVMs are "hack-proof" because they are not connected to the internet.', reveals: 'evms-are-hack-proof-because' },
                { text: 'EVMs are "hack-proof"', outcome: 'Not quite — Students often believe EVMs are "hack-proof" because they are not connected to the internet.', reveals: 'evms-are-hack-proof-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_012', title: 'Independent candidates and party system in elections',
          caseStudy: { intro: 'Imagine you are watching a local election in your constituency: three major party candidates with symbols (lotus, hand, cycle) and two independents with.',
            decisions: [{ prompt: 'What is the minimum vote share a political party must secure in a general election to be eligible for recognition as a State party by the.', options: [
                { text: 'A party must secure at least 6% of valid votes polled in the State in a general election', outcome: 'A party must secure at least 6% of valid votes polled in the State in a general election to the Lok.' },
                { text: '10% vote share', outcome: 'Not quite — Students often think that independent candidates are "non-party" in the sense of being politically.', reveals: 'independent-candidates-are-non-party' },
                { text: 'winning 5 seats', outcome: 'Not quite — Students often think that independent candidates are "non-party" in the sense of being politically.', reveals: 'independent-candidates-are-non-party' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a democracy-literacy drive, a volunteer asks: \'If the people are sovereign, why can\'t we vote directly on the farm laws?\' Another claims \'indirect election means the Prime Minister picks the President and Rajya Sabha members.\'',
            decisions: [{ prompt: 'How do popular sovereignty and the two election types actually work?', options: [
                { text: 'Separate source from mode: the people are the SOURCE of authority but exercise it through representatives — elections operationalise sovereignty and enforce accountability via Article 326\'s universal franchise, not by direct legislation. And indirect elections are conducted by ELECTED representatives: MPs and MLAs elect the President (Art. 54) and Rajya Sabha members — the executive appoints nobody.', outcome: 'Both confusions clear: sovereignty flows through representation, and \'indirect\' means legislatures voting — not ministers appointing.' },
                { text: 'Support direct referendums — sovereignty means the people should vote on laws themselves.', outcome: 'That conflates the source of power with its mode: representative democracy authorises through periodic sanction — accountability to voters, not governance by plebiscite.', reveals: 'sovereignty-means-direct-voting' },
                { text: 'Accept the PM-appoints version — indirect must mean the executive chooses.', outcome: 'That\'s a category error: the electoral college is made of MPs/MLAs — legislators, not the Council of Ministers — keeping the office accountable to the legislature.', reveals: 'indirect-means-pm-appoints' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_012', title: 'You made it',
          caseStudy: { intro: 'Representation means the people hand out power and call it back — sovereignty lives in the authorisation, not in a daily referendum.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_007', difficulty: 'standard',
          question: 'Reservation of constituencies for SCs and STs is a constitutional mechanism.',
          hint: 'If stuck, revisit c11_ps_cbse_12_004 (FPTP mechanics) and c11_ps_cbse_12_006 (why India.',
          misconception: 'Students often think that in a reserved constituency, only SC/ST voters can vote.',
          parts: [
                { id: 'a', prompt: 'In a state with 20% SC population and 10% ST population, the Delimitation Commission must reserve 30% of assembly seats.', answer: '60 seats total (40 SC, 20 ST)',
                  options: ['60 seats total (40 SC, 20 ST)', 'reserved constituency', 'separate electorate', 'in a reserved constituency, only SC/ST voters can vote'],
                  hint: 'If stuck, revisit c11_ps_cbse_12_004 (FPTP mechanics) and c11_ps_cbse_12_006 (why India chose FPTP).',
                  misconception: 'Students often think that in a reserved constituency, only SC/ST voters can vote.' },
                { id: 'b', prompt: 'Compare the impact of reservation in an FPTP system versus a Proportional Representation (PR) system.', answer: 'Under FPTP, reserved constituencies ensure a minimum number of SC/ST winners',
                  options: ['Under FPTP, reserved constituencies ensure a minimum number of SC/ST winners', 'reserved constituency', 'separate electorate', 'in a reserved constituency, only SC/ST voters can vote'],
                  hint: 'If stuck, revisit c11_ps_cbse_12_004 (FPTP mechanics) and c11_ps_cbse_12_006 (why India chose FPTP).',
                  misconception: 'Students often think that in a reserved constituency, only SC/ST voters can vote.' }
          ],
            remediations: { 'in-a-reserved-constituency': { steps: ['To correct this, have the student read Article 330 and the Delimitation Act, 2002.', 'Then, take a real example: the 2019 Lok Sabha election in the reserved constituency of Nagina (SC) in Uttar Pradesh.', 'Look up the voter demographics and candidate list.', 'Who contested?" This concrete data will show that all voters participate, only candidates are restricted.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_008', difficulty: 'standard',
          question: 'The Election Commission of India (ECI) is a permanent, independent.',
          hint: 'Review **Article 324** (full text) and the distinction between **Constitutional Bodies**.',
          misconception: '**Students think the Election Commission is a "department under the Government of India" (like the Election Department.',
          parts: [
                { id: 'a', prompt: 'Under which specific Article of the Constitution is the Election Commission of India established?', answer: '**Answer:** Article 324 establishes the ECI',
                  options: ['**Answer:** Article 324 establishes the ECI', 'department under the Government of India'],
                  hint: 'Review **Article 324** (full text) and the distinction between **Constitutional Bodies** (Art 324.',
                  misconception: '**Students think the Election Commission is a "department under the Government of India" (like the Election Department in a Ministry).' }
          ],
            remediations: { 'students-think-the-election-commission': { steps: ['** Read **Article 324(5)** text: *"CEC shall not be removed except in like manner and on like grounds as a Judge of the.', '** Compare with **Cabinet Secretary** (senior most civil servant) – appointed/removed by PM at will.', '** Watch 5-min clip of **T.N. Seshan (CEC 1990-96)** ordering transfer of a Chief Minister\'s favorite DM.', '** Re-read **Article 324(1)**: *"Superintendence, direction, control...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students think the Election Commission is a "department under the Government of India" (like the Election Department.',
          parts: [
                { id: 'a', prompt: '"Election Commission\'s power to **deregister a political party** is the ultimate safeguard against anti-democratic parties." Evaluate this statement.', answer: '**Answer:** **False.** The ECI **cannot deregister a party**',
                  options: ['**Answer:** **False.** The ECI **cannot deregister a party**', 'department under the Government of India'],
                  hint: 'Review **Article 324** (full text) and the distinction between **Constitutional Bodies** (Art 324.',
                  misconception: '**Students think the Election Commission is a "department under the Government of India" (like the Election Department in a Ministry).' },
                { id: 'b', prompt: 'Draft a **constitutional amendment proposal (2-3 clauses)** to strengthen the financial independence of the Election Commission, drawing a parallel with the.', answer: '**Expected Answer Criteria:** 1',
                  options: ['**Expected Answer Criteria:** 1', 'department under the Government of India'],
                  hint: 'Review **Article 324** (full text) and the distinction between **Constitutional Bodies** (Art 324.',
                  misconception: '**Students think the Election Commission is a "department under the Government of India" (like the Election Department in a Ministry).' }
          ],
            remediations: { 'students-think-the-election-commission': { steps: ['** Read **Article 324(5)** text: *"CEC shall not be removed except in like manner and on like grounds as a Judge of the.', '** Compare with **Cabinet Secretary** (senior most civil servant) – appointed/removed by PM at will.', '** Watch 5-min clip of **T.N. Seshan (CEC 1990-96)** ordering transfer of a Chief Minister\'s favorite DM.', '** Re-read **Article 324(1)**: *"Superintendence, direction, control...'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_009', difficulty: 'standard',
          question: 'The conduct of elections in India refers to the constitutionally mandated.',
          hint: 'Revisit Article 324 (ECI powers) and Article 326 (adult franchise) in the Constitution.',
          misconception: 'Students often believe the Model Code of Conduct (MCC) is a statutory law passed by Parliament and legally enforceable.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The conduct of elections in India refers to the constitutionally mandated, multi-stage',
                  options: ['The conduct of elections in India refers to the constitutionally mandated, multi-stage', 'Elections are the institutional mechanism through', 'Direct election is a method where citizens vote directly to choose their representatives', 'Universal Adult Franchise (UAF) is the constitutional principle enshrined in Article 326'],
                  hint: 'Revisit Article 324 (ECI powers) and Article 326 (adult franchise) in the Constitution; review.',
                  misconception: 'Students often believe the Model Code of Conduct (MCC) is a statutory law passed by Parliament and legally enforceable in courts.' }
          ],
            remediations: { 'the-model-code-of-conduct': { steps: ['Show the student the ECI\'s 1979 booklet "Model Code of Conduct for the Guidance of Political Parties and Candidates".', 'Contrast with Section 123 of RP Act, 1951 (corrupt practices) which *is* statutory.', 'Use the 2019 Supreme Court judgment in *Subramaniam Balaji v. State of Tamil Nadu* where the Court said the MCC "does.', 'Ask the student to re-classify three MCC provisions (e.g., no hate speeches, no use of official machinery, no new.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_010', difficulty: 'standard',
          question: 'The Model Code of Conduct (MCC) is a set of guidelines issued by the Election.',
          hint: 'Revisit node c11_ps_cbse_12_008 for EC\'s constitutional status and Article 324 scope.',
          misconception: 'Students believe the Model Code of Conduct is a "law" passed by Parliament with statutory penalties, and that election.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission',
                  options: ['The Model Code of Conduct (MCC) is a set of guidelines issued by the Election Commission', 'Elections are the institutional mechanism through', 'Direct election is a method where citizens vote directly to choose their representatives', 'Universal Adult Franchise (UAF) is the constitutional principle enshrined in Article 326'],
                  hint: 'Revisit node c11_ps_cbse_12_008 for EC\'s constitutional status and Article 324 scope; review.',
                  misconception: 'Students believe the Model Code of Conduct is a "law" passed by Parliament with statutory penalties, and that election expenditure limits.' }
          ],
            remediations: { 'the-model-code-of-conduct': { steps: ['Re-read Article 324 and identify the phrase "superintendence, direction, and control" - this is the constitutional hook.', 'Open Section 77 RPA, 1951 and Explanation 1 - highlight "deemed to have been incurred by the candidate."', 'Watch EC\'s 2024 expenditure monitoring video (YouTube: "ECI Expenditure Monitoring") to see shadow observation.', 'Create a two-column table: "MCC Violation → EC Action (censure/ban/FIR)" vs "Expenditure Violation → Disqualification.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_011', difficulty: 'standard',
          question: 'Electoral reforms in India refer to systematic changes introduced through.',
          hint: 'Revisit Article 324 (ECI powers) and the Representation of the People Act, 1951.',
          misconception: 'Students often believe EVMs are "hack-proof" because they are not connected to the internet.',
          parts: [
                { id: 'a', prompt: 'In a constituency, 12% of voters pressed NOTA. The winning candidate secured 38% of total votes.', answer: 'The claim is legally incorrect',
                  options: ['The claim is legally incorrect', 'hack-proof', 'EVMs are "hack-proof"'],
                  hint: 'Revisit Article 324 (ECI powers) and the Representation of the People Act, 1951 provisions.',
                  misconception: 'Students often believe EVMs are "hack-proof" because they are not connected to the internet.' }
          ],
            remediations: { 'evms-are-hack-proof-because': { steps: ['If a student confuses EVM security features, walk through the 2019 Supreme Court order mandating 5 EVMs per assembly.', 'For NOTA, have them read the 2013 PUCL judgment paragraph 92: "NOTA does not have the effect of rejecting all.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_012', difficulty: 'standard',
          question: 'Independent candidates are individuals who contest elections without.',
          hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c10_civ_cbse_04_004 (party recognition.',
          misconception: 'Students often think that independent candidates are "non-party" in the sense of being politically neutral.',
          parts: [
                { id: 'a', prompt: 'Why does the First Past the Post (FPTP) system create a structural disadvantage for independent candidates compared to party candidates, even though both need.', answer: 'FPTP rewards concentrated support',
                  options: ['FPTP rewards concentrated support', 'symbol recognition', 'money power', 'non-party'],
                  hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c10_civ_cbse_04_004 (party recognition criteria).',
                  misconception: 'Students often think that independent candidates are "non-party" in the sense of being politically neutral or ideology-free.' },
                { id: 'b', prompt: 'In a hypothetical constituency, Candidate A (Party X) gets 38% votes, Candidate B (Party Y) gets 35%, Candidate C (Independent) gets 27%.', answer: 'Under FPTP, Candidate A wins with 38% (plurality)',
                  options: ['Under FPTP, Candidate A wins with 38% (plurality)', 'Candidate C should win', 'non-party'],
                  hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c10_civ_cbse_04_004 (party recognition criteria).',
                  misconception: 'Students often think that independent candidates are "non-party" in the sense of being politically neutral or ideology-free.' }
          ],
            remediations: { 'independent-candidates-are-non-party': { steps: ['Review the distinction between "independent candidate" (legal definition: not set up by a registered party) and.', 'Analyze Election Commission data on independents\' vote share and win rate (typically <3% wins) to see structural.', 'Read a news report on "dummy candidates" or "rebel independents" in a recent State election to understand tactical use.', 'Revisit the FPTP mechanics (c11_ps_cbse_12_004) to see how party symbols and organization convert pluralities into.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
