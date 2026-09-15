import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch04_p1: SimDef = {
    id: 'v3_c10_civ_ch04_p1',
    title: 'Political Parties · Part 1/2',
    subtitle: 'Crack the criteria that make a party \'national\' — and why parties exist',
    classLevel: 10, subject: 'civics', topic: 'Political Parties · Part 1/2',
    chapters: ['c10_civ_ch04'],
    nodeIds: ['c10_civ_cbse_04_001', 'c10_civ_cbse_04_002', 'c10_civ_cbse_04_003', 'c10_civ_cbse_04_004', 'c10_civ_cbse_04_005', 'c10_civ_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'an Election Commission official auditing party status', intro: 'Symbols on TV, manifestos in the news, governments rising and falling — parties are democracy\'s loudest institutions. But what exactly earns one the word \'national\'?', goal: 'State the ECI criteria for national-party status and list what parties do between elections, not just during them.' },
    discovery: {
        question: 'TMC runs the government of West Bengal — yet the Election Commission revoked its \'national party\' status, while AAP, newer and smaller, got it. How can a party that rules a whole state lose that tag?',
        options: ['\'National\' is an election-performance label — vote share and seats across several states — not a measure of governing power', 'It can\'t — the Election Commission made an obvious error', 'AAP bribed its way to the status; TMC refused to', 'TMC lost it because it only contests state elections, never Lok Sabha'],
        answer: '\'National\' is an election-performance label — vote share and seats across several states — not a measure of governing power',
        hook: 'The tag sounds like prestige but it\'s pure arithmetic: roughly 6% of valid votes in four-plus states and at least four Lok Sabha seats. Governing a state doesn\'t enter the formula.',
    },
    teaching: [
        { title: 'Political Parties: Definition and Why We Need Them', text: 'A political party is an organized group of citizens who share common political goals and ideologies, contest elections under a common symbol, and seek to acquire and exercise political power through.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Play Election Commissioner: apply the official criteria to real parties, decide who earns the national tag — and explain why democracy can\'t run without parties at all.',
        labels: ['Political Parties: Definition', 'Major National Political Parties', 'Party System: One-Party, Two-Party', 'National and Regional Political', 'Challenges to Political Parties', 'Challenges: Dynastic Succession, Money'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_001', title: 'Political Parties: Definition and Why We Need Them',
          caseStudy: { intro: 'Imagine you are watching the 2024 Lok Sabha election results on television: you see multiple parties — BJP, INC, DMK, TMC, etc.',
            decisions: [{ prompt: 'Define a political party in two sentences using the exact terms: "organized group", "common ideology", "contest elections", and.', options: [
                { text: 'A political party is an organized group of citizens who share a common ideology and come', outcome: 'A political party is an organized group of citizens who share a common ideology and come together.' },
                { text: 'organized group', outcome: 'Not quite — Students often think "political parties are only needed during elections" and that their work ends.', reveals: 'political-parties-are-only-needed' },
                { text: 'constitutional means', outcome: 'Not quite — Students often think "political parties are only needed during elections" and that their work ends.', reveals: 'political-parties-are-only-needed' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_002', title: 'Major National Political Parties in India (INC, BJP, CPI, BSP, CPI(M))',
          caseStudy: { intro: 'Imagine you are watching a news debate about the upcoming Lok Sabha elections.',
            decisions: [{ prompt: 'Name the six political parties currently recognized as \'National Parties\' by the Election Commission of India.', options: [
                { text: 'The six national parties are: Indian National Congress (INC), Bharatiya Janata Party', outcome: 'The six national parties are: Indian National Congress (INC), Bharatiya Janata Party (BJP).' },
                { text: 'national party', outcome: 'Not quite — Students often believe that "national party" means a party that has formed the central government.', reveals: 'national-party-means-a-party' },
                { text: 'AAP, TMC, DMK, or SP', outcome: 'Not quite — Students often believe that "national party" means a party that has formed the central government.', reveals: 'national-party-means-a-party' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_003', title: 'Party System: One-Party, Two-Party and Multi-Party Systems',
          caseStudy: { intro: 'Imagine you\'re watching election results on TV: in the USA, it\'s almost always Republicans vs Democrats; in China, only the Communist Party appears on the.',
            decisions: [{ prompt: 'Name the three types of party systems classified by the number of effective political parties competing for power, and give one country.', options: [
                { text: 'The three types are: (1) One-party system', outcome: 'The three types are: (1) One-party system — e.g., China (Communist Party); (2) Two-party system.' },
                { text: 'registered parties', outcome: 'Not quite — Students think "multi-party system = instability and corruption" and "two-party system = ideal.', reveals: 'multi-party-system-instability-and' },
                { text: 'effective parties', outcome: 'Not quite — Students think "multi-party system = instability and corruption" and "two-party system = ideal.', reveals: 'multi-party-system-instability-and' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_004', title: 'National and Regional Political Parties in India: Criteria and Examples',
          caseStudy: { intro: 'Imagine you are watching the 2024 Lok Sabha election results on television.',
            decisions: [{ prompt: 'What is the minimum number of states in which a party must secure 6% of valid votes to be eligible for recognition as a National Party.', options: [
                { text: 'Four states', outcome: 'Four states. A wrong answer (e.g., "two states" or "three states") reveals the student has confused.' },
                { text: 'two states', outcome: 'Not quite — Students often believe that any party contesting elections in multiple states automatically becomes.', reveals: 'any-party-contesting-elections-in' },
                { text: 'three states', outcome: 'Not quite — Students often believe that any party contesting elections in multiple states automatically becomes.', reveals: 'any-party-contesting-elections-in' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_005', title: 'Challenges to Political Parties: Lack of Internal Democracy',
          caseStudy: { intro: 'Imagine your school student council: if the principal directly appoints the head boy/girl without any election, consultation, or transparent criteria, would.',
            decisions: [{ prompt: 'What is the most fundamental feature of internal democracy in a political party that is violated when top leaders unilaterally decide all.', options: [
                { text: 'The fundamental feature violated is **participatory decision-making through free and fair', outcome: 'The fundamental feature violated is **participatory decision-making through free and fair.' },
                { text: 'the party doesn\'t hold national elections', outcome: 'Not quite — Students often equate "lack of internal democracy" **only** with "no organizational elections.".', reveals: 'students-often-equate-lack-of' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_006', title: 'Challenges: Dynastic Succession, Money and Muscle Power',
          caseStudy: { intro: 'Imagine you are watching a news report about a state election: a chief minister\'s son is given a ticket despite senior leaders waiting for decades; a candidate.',
            decisions: [{ prompt: 'Define dynastic succession in the context of Indian political parties.', options: [
                { text: 'Dynastic succession occurs when party leadership and election tickets are allocated based', outcome: 'Dynastic succession occurs when party leadership and election tickets are allocated based on family.' },
                { text: 'any relative of a politician contesting is dynastic', outcome: 'Not quite — Students believe dynastic succession exists only in regional/family-based parties (e.g., DMK,.', reveals: 'dynastic-succession-exists-only-in' },
                { text: 'dynastic succession exists only in regional/family-based parties (e', outcome: 'Not quite — Students believe dynastic succession exists only in regional/family-based parties (e.g., DMK,.', reveals: 'dynastic-succession-exists-only-in' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_001', title: 'A real-world call',
          caseStudy: { intro: 'A party can field a candidate with a criminal record who wins reliably, or a clean candidate who might lose. The seat decides who controls the government.',
            decisions: [{ prompt: 'Does a \'necessary\' win excuse a compromised candidate?', options: [
                { text: 'Yes — losing means no chance to do good at all', outcome: 'The realist argument; every party that says this keeps the pipeline of compromised candidates full.' },
                { text: 'No — the means define what you\'d do with power', outcome: 'The integrity argument — a party that wins by compromising candidates has already shown what it will do in office.' },
                { text: 'The voters should know and decide', outcome: 'Transparency as the minimum — but information alone hasn\'t stopped criminal-record candidates from winning.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A neighbourhood\'s only park is crumbling, but residents disagree on the fix — some want a playground, some a walking track, some a parking lot. At the residents\' meeting someone declares: \'We don\'t need any association or committee — every person should just fight for their own demand.\'',
            decisions: [{ prompt: 'Why would forming an organised group with a clear programme serve the residents better than everyone lobbying alone?', options: [
                { text: 'An organised body bundles many individual demands into one workable programme, contests for the authority to act, and can be held responsible if it fails — the same linkage function political parties perform between citizens and government. 200 lone voices cannot negotiate, but a committee with a platform can.', outcome: 'Parties and associations exist precisely to aggregate scattered preferences, mobilise support, and turn demands into policy — no single resident could do that alone.' },
                { text: 'The speaker is right — committees only add politics; if each resident pressures the municipality separately, the best demand will win on its own merit.', outcome: 'Without aggregation, conflicting demands cancel out and officials face a noise of voices with no one accountable for delivering anything.', reveals: 'parties-are-needless' },
                { text: 'The park question should be settled by whoever shouts loudest or donates most, since money and voice show real commitment.', outcome: 'That replaces aggregation with power — the richest or loudest resident wins regardless of what the community needs.', reveals: 'loudest-voice-wins' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Parties are how 968 million voters\' clashing preferences get bundled into a governable choice. Visible at election time, indispensable every day in between.',
            decisions: [{ prompt: 'What comes next? Political Parties · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Political Parties · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_001', difficulty: 'standard',
          question: 'A political party is an organized group of citizens who share common political.',
          hint: 'Revisit c9_civ_ch1_5 (Representative vs Direct Democracy) and c9_civ_ch2_5 (Political.',
          misconception: 'Students often think "political parties are only needed during elections" and that their work ends after voting.',
          parts: [
                { id: 'a', prompt: 'Explain why a large democracy like India cannot rely solely on independent candidates to fill 543 Lok Sabha seats, using the concepts of "aggregation.', answer: 'Independent candidates cannot aggregate diverse interests into coherent policy',
                  options: ['Independent candidates cannot aggregate diverse interests into coherent policy', 'money and muscle power', 'name recognition', 'political parties are only needed during elections'],
                  hint: 'Revisit c9_civ_ch1_5 (Representative vs Direct Democracy) and c9_civ_ch2_5 (Political Parties: Role.',
                  misconception: 'Students often think "political parties are only needed during elections" and that their work ends after voting.' }
          ],
            remediations: { 'political-parties-are-only-needed': { steps: ['Re-read the NCERT Class 10 textbook section "Why do we need political parties?" and list the six functions mentioned.', 'For each function, write a real-life example from your state (e.g., "Party X\'s MLA helped a farmer get crop insurance".', 'Watch a 10-minute news debate on a current bill (not election) and note how party spokespersons articulate positions.', 'Re-attempt Diagnostic Question 3, explicitly using the six functions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "political parties are only needed during elections" and that their work ends after voting.',
          parts: [
                { id: 'a', prompt: 'Design a new political party for a hypothetical Indian state with three distinct linguistic regions and significant economic inequality.', answer: 'the party\'s core ideology in one phrase, (',
                  options: ['the party\'s core ideology in one phrase, (', 'political parties are only needed during elections'],
                  hint: 'Revisit c9_civ_ch1_5 (Representative vs Direct Democracy) and c9_civ_ch2_5 (Political Parties: Role.',
                  misconception: 'Students often think "political parties are only needed during elections" and that their work ends after voting.' }
          ],
            remediations: { 'political-parties-are-only-needed': { steps: ['Re-read the NCERT Class 10 textbook section "Why do we need political parties?" and list the six functions mentioned.', 'For each function, write a real-life example from your state (e.g., "Party X\'s MLA helped a farmer get crop insurance".', 'Watch a 10-minute news debate on a current bill (not election) and note how party spokespersons articulate positions.', 'Re-attempt Diagnostic Question 3, explicitly using the six functions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_002', difficulty: 'standard',
          question: 'Major national political parties in India are political parties recognized.',
          hint: 'Revisit c10_civ_cbse_04_001 (Political Parties: Definition and Why We Need Them) and.',
          misconception: 'Students often believe that "national party" means a party that has formed the central government at least once.',
          parts: [
                { id: 'a', prompt: 'Explain the core ideological difference between the Bharatiya Janata Party (BJP) and the Indian National Congress (INC) in terms of their vision for Indian.', answer: 'The BJP\'s core ideology is cultural nationalism (Hindutva)',
                  options: ['The BJP\'s core ideology is cultural nationalism (Hindutva)', 'both are secular', 'both are nationalist', 'national party'],
                  hint: 'Revisit c10_civ_cbse_04_001 (Political Parties: Definition and Why We Need Them) and Class 9 node.',
                  misconception: 'Students often believe that "national party" means a party that has formed the central government at least once.' },
                { id: 'b', prompt: 'A voter in Uttar Pradesh belongs to a historically marginalized Scheduled Caste community and prioritizes social dignity, representation in government jobs.', answer: 'The Bahujan Samaj Party (BSP) best aligns',
                  options: ['The Bahujan Samaj Party (BSP) best aligns', 'national party'],
                  hint: 'Revisit c10_civ_cbse_04_001 (Political Parties: Definition and Why We Need Them) and Class 9 node.',
                  misconception: 'Students often believe that "national party" means a party that has formed the central government at least once.' }
          ],
            remediations: { 'national-party-means-a-party': { steps: ['Create a comparison table with columns: Party, Year Founded, Core Ideology, Key Leader (Founding), Primary Social Base.', 'Watch a 10-minute video of a recent Lok Sabha debate where leaders of these six parties speak — note the vocabulary.', 'Practice writing one-sentence ideology definitions for each party using the formula: "[Party] stands for [core value].', 'Attempt a previous year board question: "Distinguish between a national party and a state party.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_003', difficulty: 'standard',
          question: 'A party system refers to the number of effective political parties that compete.',
          hint: 'If stuck, revisit c9_civ_ch2_5 (Political Parties: Role and Functions) and c9_civ_ch2_10.',
          misconception: 'Students think "multi-party system = instability and corruption" and "two-party system = ideal democracy." They cite.',
          parts: [
                { id: 'a', prompt: 'Name the three types of party systems classified by the number of effective political parties competing for power, and give one country example for each.', answer: 'The three types are: (1) One-party system',
                  options: ['The three types are: (1) One-party system', 'registered parties', 'effective parties', 'multi-party system = instability and corruption'],
                  hint: 'If stuck, revisit c9_civ_ch2_5 (Political Parties: Role and Functions) and c9_civ_ch2_10 (Coalition.',
                  misconception: 'Students think "multi-party system = instability and corruption" and "two-party system = ideal democracy." They cite Italy/Israel.' },
                { id: 'b', prompt: 'India uses the First-Past-The-Post (FPTP) electoral system, which typically produces two-party systems (Duverger\'s Law). Yet India has a multi-party system.', answer: 'FPTP favors two parties when social cleavages are national (class, ideology)',
                  options: ['FPTP favors two parties when social cleavages are national (class, ideology)', 'too many parties', 'weak national parties', 'multi-party system = instability and corruption'],
                  hint: 'If stuck, revisit c9_civ_ch2_5 (Political Parties: Role and Functions) and c9_civ_ch2_10 (Coalition.',
                  misconception: 'Students think "multi-party system = instability and corruption" and "two-party system = ideal democracy." They cite Italy/Israel.' },
                { id: 'c', prompt: 'Compare the role of Opposition in a two-party system (UK) versus a multi-party system (India).', answer: 'In UK\'s two-party system, the Opposition is a single party (Shadow Cabinet) that',
                  options: ['In UK\'s two-party system, the Opposition is a single party (Shadow Cabinet) that', 'more parties = stronger Opposition', 'multi-party system = instability and corruption', 'two-party system = ideal democracy'],
                  hint: 'If stuck, revisit c9_civ_ch2_5 (Political Parties: Role and Functions) and c9_civ_ch2_10 (Coalition.',
                  misconception: 'Students think "multi-party system = instability and corruption" and "two-party system = ideal democracy." They cite Italy/Israel.' }
          ],
            remediations: { 'multi-party-system-instability-and': { steps: ['Re-read NCERT Democratic Politics-II Chapter 4, page 72-73 — the paragraph "Party system is not something any country.', 'Create a 3-column table: Column A = Social Diversity (High/Medium/Low), Column B = Electoral System (FPTP/PR), Column.', 'Answer this question in 50 words: "Why can\'t India simply \'adopt\' a two-party system by law?"', 'Watch 10-minute video "How Party Systems Evolve" (PRS Legislative/YouTube) focusing on Duverger\'s Law exceptions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_004', difficulty: 'standard',
          question: 'A National Party in India is a political party recognised by the Election.',
          hint: 'If stuck, revisit c9_civ_ch2_6 (Party Symbols and Recognition Criteria) and c8_civ_ch1_7.',
          misconception: 'Students often believe that any party contesting elections in multiple states automatically becomes a National Party.',
          parts: [
                { id: 'a', prompt: 'What is the minimum number of states in which a party must secure 6% of valid votes to be eligible for recognition as a National Party under the first.', answer: 'Four states',
                  options: ['Four states', 'two states', 'three states', 'contesting'],
                  hint: 'If stuck, revisit c9_civ_ch2_6 (Party Symbols and Recognition Criteria) and c8_civ_ch1_7 (Election.',
                  misconception: 'Students often believe that any party contesting elections in multiple states automatically becomes a National Party, or that winning a few.' }
          ],
            remediations: { 'any-party-contesting-elections-in': { steps: ['Re-read the ECI\'s official "Political Parties and Election Symbols" booklet (available on eci.gov.in) focusing on Para.', 'Create a two-column table: Column A = National Party criteria (all three pathways), Column B = State Party criteria.', 'Take 5 parties (INC, BJP, AAP, DMK, BJD) and for each, write which specific criterion they satisfy using 2024 data.', 'Practice the board-style question: "Party X got 7% votes in 3 states and 5 Lok Sabha seats. Is it a National Party?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_005', difficulty: 'standard',
          question: 'Lack of internal democracy in political parties refers to the absence.',
          hint: 'Revisit Class 9 Democracy chapter (c9_civ_ch1_1) for democratic principles and Class 9.',
          misconception: 'Students often equate "lack of internal democracy" **only** with "no organizational elections." They miss that a party.',
          parts: [
                { id: 'a', prompt: 'In Party X, the president has held the post for 20 years without any organizational election.', answer: 'Missing features: (1) **Regular organizational elections for leadership**',
                  options: ['Missing features: (1) **Regular organizational elections for leadership**', 'no elections', 'workers feel ignored so they don\'t campaign'],
                  hint: 'Revisit Class 9 Democracy chapter (c9_civ_ch1_1) for democratic principles and Class 9 Political.',
                  misconception: 'Students often equate "lack of internal democracy" **only** with "no organizational elections." They miss that a party can *hold elections*.' },
                { id: 'b', prompt: 'Compare the internal democracy deficit in a national party where the same family has held the top post for three generations (via unanimous "elections" with.', answer: 'The national party with hereditary leadership poses greater long-term threat',
                  options: ['The national party with hereditary leadership poses greater long-term threat', 'nominations are undemocratic'],
                  hint: 'Revisit Class 9 Democracy chapter (c9_civ_ch1_1) for democratic principles and Class 9 Political.',
                  misconception: 'Students often equate "lack of internal democracy" **only** with "no organizational elections." They miss that a party can *hold elections*.' }
          ],
            remediations: { 'students-often-equate-lack-of': { steps: ['**Step 1**: Show the student the **constitution of a real Indian party** (e.g., INC or BJP constitution available.', '**Step 2**: Ask: "If the national executive (who proposes candidates for party president) is nominated by the current.', '**Step 3**: Contrast with a party that has **primaries for candidate selection** (e.g., some state units experimented).', '**Step 4**: Assign a 150-word answer: "Explain why uncontested organizational elections do not prove internal.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_04_006', difficulty: 'standard',
          question: 'Dynastic succession refers to the practice where political party leadership and.',
          hint: 'Revisit c10_civ_cbse_04_005 (lack of internal democracy) and c9_civ_ch2_7 (free and fair.',
          misconception: 'Students believe dynastic succession exists only in regional/family-based parties (e.g., DMK, SP, NC) and that national.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Dynastic succession refers to the practice where political party leadership and election',
                  options: ['Dynastic succession refers to the practice where political party leadership and election', 'A political party is an organized group of citizens who share common political goals and', 'Major national political parties in India are political parties recognized by the', 'A party system refers to the number of effective political parties that compete for power'],
                  hint: 'Revisit c10_civ_cbse_04_005 (lack of internal democracy) and c9_civ_ch2_7 (free and fair elections).',
                  misconception: 'Students believe dynastic succession exists only in regional/family-based parties (e.g., DMK, SP, NC) and that national parties (BJP, INC).' }
          ],
            remediations: { 'dynastic-succession-exists-only-in': { steps: ['Re-read the NCERT \'Challenges to Political Parties\' section — highlight the three challenges in three colors.', 'Pick one national and one regional party. Use the Election Commission\'s affidavit portal (myneta.info) to check: (a) %.', 'Write one paragraph comparing the two parties using this data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
