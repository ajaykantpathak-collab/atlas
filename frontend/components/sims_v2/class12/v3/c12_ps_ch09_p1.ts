import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch09_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch09_p1: SimDef = {
    id: 'v3_c12_ps_ch09_p1',
    title: 'Era of One-Party Dominance · Part 1/2',
    subtitle: 'The party that contained its own opposition',
    classLevel: 12, subject: 'political_science', topic: 'Era of One-Party Dominance · Part 1/2',
    chapters: ['c12_ps_ch09'],
    nodeIds: ['c12_ps_cbse_09_001', 'c12_ps_cbse_09_002', 'c12_ps_cbse_09_003', 'c12_ps_cbse_09_004', 'c12_ps_cbse_09_005', 'c12_ps_cbse_09_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political systems analyst', intro: 'India\'s first elections had plenty of opposition parties — they just kept losing to an organisation built over sixty years of freedom struggle.', goal: 'Analyse how Congress\'s social and ideological coalition plus factionalism sustained democratic one-party dominance.' },
    discovery: {
        question: 'In 1952, 53 parties and nearly 1,900 independents contested India\'s first election — yet one party took 74% of seats on just 45% of votes, then did it twice more. Rigged, or something stranger?',
        options: ['Democratic but lopsided: Congress\'s freedom-movement network and all-embracing coalition won pluralities seat after seat while a divided opposition split the rest under first-past-the-post', 'Rigged — opposition parties were effectively banned', 'Voters had no real choice on the ballot', 'Congress won because it controlled the Election Commission'],
        answer: 'Democratic but lopsided: Congress\'s freedom-movement network and all-embracing coalition won pluralities seat after seat while a divided opposition split the rest under first-past-the-post',
        hook: 'One-party dominance is not a one-party system — China banned rivals; India didn\'t. Congress was so broad it housed left, right and centre in one tent, so its own factions did the job an opposition normally does.',
    },
    teaching: [
        { title: 'Congress as the Dominant Party: Organisation and Social Coalition', text: 'The Indian National Congress emerged as the dominant political party in the first three general elections (1952, 1957, 1962) due to its unique organisational structure as a broad-based social and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_09_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect the \'Congress system\': how a nationalist movement became a party that was simultaneously the government and its own opposition — and why rivals still couldn\'t break through.',
        labels: ['Congress as the Dominant', 'Nature of Congress Dominance', 'First General Elections (1951-52)', 'The Socialist Party: Ideology,', 'The Communist Party', 'The Bharatiya Jana Sangh'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_001', title: 'Congress as the Dominant Party: Organisation and Social Coalition',
          caseStudy: { intro: 'Imagine you are watching a news debate where a political analyst says, "The Congress party ruled India for decades because there was no real opposition." You.',
            decisions: [{ prompt: 'What was the organisational advantage Congress possessed at Independence that no other party had, according to the NCERT text?', options: [
                { text: 'Congress had a pre-existing organisational network spread across the length and breadth', outcome: 'Congress had a pre-existing organisational network spread across the length and breadth of the.' },
                { text: 'Congress had more money', outcome: 'Not quite — Students often believe Congress dominance meant India was a de facto one-party state like China.', reveals: 'congress-dominance-meant-india-was' },
                { text: 'Congress controlled the Election Commission', outcome: 'Not quite — Students often believe Congress dominance meant India was a de facto one-party state like China.', reveals: 'congress-dominance-meant-india-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_002', title: 'Nature of Congress Dominance: The Congress System',
          caseStudy: { intro: 'Imagine you are watching a news debate where a panelist claims "India was virtually a one-party state in the 1950s, just like China today." Start by asking.',
            decisions: [{ prompt: 'What is the defining feature that distinguishes the Congress System from one-party dominance in countries like China or Cuba, according.', options: [
                { text: 'The Congress System operated under democratic conditions with free and fair elections', outcome: 'The Congress System operated under democratic conditions with free and fair elections where.' },
                { text: 'Congress had a better leader', outcome: 'Not quite — Students often think "Congress dominance = absence of real democracy" or "Congress won because.', reveals: 'congress-dominance-absence-of-real' },
                { text: 'Congress dominance = absence of real democracy', outcome: 'Not quite — Students often think "Congress dominance = absence of real democracy" or "Congress won because.', reveals: 'congress-dominance-absence-of-real' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_003', title: 'First General Elections (1951-52) and the Congress Victory',
          caseStudy: { intro: 'Imagine you\'re a 21-year-old voter in 1951 rural India — you cannot read or write, you\'ve never voted before, and the ballot box has a picture of a bullock.',
            decisions: [{ prompt: 'What constitutional article mandated universal adult franchise for the first general elections, and what was the voting age at that time?', options: [
                { text: 'Article 326 of the Constitution mandated universal adult franchise', outcome: 'Article 326 of the Constitution mandated universal adult franchise; the voting age was 21 (lowered.' },
                { text: 'one-party dominance', outcome: 'Not quite — Students believe Congress won 1952 *only* because of Nehru\'s charisma or freedom struggle legacy.', reveals: 'congress-won-1952-only-because' },
                { text: 'one-party system', outcome: 'Not quite — Students believe Congress won 1952 *only* because of Nehru\'s charisma or freedom struggle legacy.', reveals: 'congress-won-1952-only-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_004', title: 'The Socialist Party: Ideology, Splits and Decline',
          caseStudy: { intro: 'Imagine you see a news clip about the Samajwadi Party or the Janata Dal (United) contesting an election in Uttar Pradesh or Bihar.',
            decisions: [{ prompt: 'What was the immediate organizational trigger that forced the Congress Socialist Party to form a separate Socialist Party in 1948?', options: [
                { text: 'The Congress amended its constitution in 1948 to prohibit dual membership, meaning CSP', outcome: 'The Congress amended its constitution in 1948 to prohibit dual membership, meaning CSP members.' },
                { text: 'ideological differences with Nehru', outcome: 'Not quite — Students often believe the Socialist Party was a single, unified party that simply "lost elections".', reveals: 'the-socialist-party-was-a' },
                { text: 'the 1955 Avadi resolution', outcome: 'Not quite — Students often believe the Socialist Party was a single, unified party that simply "lost elections".', reveals: 'the-socialist-party-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_006', title: 'The Bharatiya Jana Sangh: Origins and Hindutva Agenda',
          caseStudy: { intro: 'Imagine you are watching a news debate where a panelist says, "The BJP’s ideology began in 1951 with the Jana Sangh." You wonder: *What exactly did that party.',
            decisions: [{ prompt: '**REMEMBER**: In which year was the Bharatiya Jana Sangh founded, who was its founder-President, and which two pre-independence.', options: [
                { text: '**Correct answer**: Founded in **1951**', outcome: '**Correct answer**: Founded in **1951**; founder-President **Dr.' },
                { text: 'Atal Bihari Vajpayee', outcome: 'Not quite — **Misconception**: "The Bharatiya Jana Sangh was the same as the BJP and was a major challenger.', reveals: 'misconception-the-bharatiya-jana-sangh' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate rival claims \'1950s India was a one-party state, same as any authoritarian system — Congress always won.\'',
            decisions: [{ prompt: 'What distinguishes the Congress System from one-party rule?', options: [
                { text: 'The dominance was competitive, not coercive — opposition parties contested free elections, Congress worked as a broad coalition whose internal factions did the opposing, and FPTP amplified a ~45% vote into ~75% seats; nobody was banned — that last part is the whole difference.', outcome: 'The chapter\'s key distinction: dominance through inclusion and arithmetic versus dominance through exclusion — India had a dominant party inside a democracy, not a democracy replaced by a party.' },
                { text: 'He\'s right — one party winning every election is one-party rule by definition.', outcome: 'The test isn\'t who wins but who may contest — China\'s dominance rests on legal exclusion of rivals; Congress\'s rested on winning open contests and absorbing dissent internally.', reveals: 'winning-equals-banning' },
                { text: 'The difference was just Nehru\'s personality — remove him and it was authoritarian.', outcome: 'Personality isn\'t the mechanism — the system ran on coalition breadth, faction management and FPTP mechanics; individual virtue can\'t explain seat shares or the opposition\'s legal freedom.', reveals: 'leader-equals-system' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain dominance without dictatorship — and how first-past-the-post turns a 45% vote into a three-quarters majority.',
            decisions: [{ prompt: 'What comes next? Era of One-Party Dominance · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Era of One-Party Dominance · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_001', difficulty: 'standard',
          question: 'The Indian National Congress emerged as the dominant political party in the.',
          hint: 'If stuck, review Class 10 Political Parties chapter (c10_civ_cbse_04_001.',
          misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Indian National Congress emerged as the dominant political party in the first three',
                  options: ['The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress System" refers to the unique pattern of one-party dominance in India', 'The First General Elections (1951-52) were India\'s inaugural nationwide democratic', 'The Socialist Party in post-independence India refers to the political formation that'],
                  hint: 'If stuck, review Class 10 Political Parties chapter (c10_civ_cbse_04_001 to c10_civ_cbse_04_008).',
                  misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that opposition parties were.' }
          ],
            remediations: { 'congress-dominance-meant-india-was': { steps: ['If the student holds this misconception: (1) Re-read NCERT pages 35-36 "Nature of Congress dominance" comparing India.', '(2) Review Class 10 node c10_civ_cbse_04_003 (Party System: One-Party, Two-Party and Multi-Party Systems).', '(3) Check election data: 1952 Lok Sabha had 14 parties represented; Congress got 45% votes, not 100%.', '(4) Re-attempt Diagnostic Question 3 with the corrected framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that.',
          parts: [
                { id: 'a', prompt: 'Assess the statement: "The Congress party\'s inclusive coalition strategy made it impossible for opposition parties to offer a distinct alternative." Is this.', answer: 'Partially valid but incomplete',
                  options: ['Partially valid but incomplete', 'copying'],
                  hint: 'If stuck, review Class 10 Political Parties chapter (c10_civ_cbse_04_001 to c10_civ_cbse_04_008).',
                  misconception: 'Students often believe Congress dominance meant India was a de facto one-party state like China or USSR, or that opposition parties were.' }
          ],
            remediations: { 'congress-dominance-meant-india-was': { steps: ['If the student holds this misconception: (1) Re-read NCERT pages 35-36 "Nature of Congress dominance" comparing India.', '(2) Review Class 10 node c10_civ_cbse_04_003 (Party System: One-Party, Two-Party and Multi-Party Systems).', '(3) Check election data: 1952 Lok Sabha had 14 parties represented; Congress got 45% votes, not 100%.', '(4) Re-attempt Diagnostic Question 3 with the corrected framework.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_002', difficulty: 'standard',
          question: 'The "Congress System" refers to the unique pattern of one-party dominance.',
          hint: 'Revisit c11_ps_cbse_12_004 (FPTP system) and work through a 3-candidate numerical.',
          misconception: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were.',
          parts: [
                { id: 'a', prompt: 'A political analyst argues: "The Congress System was essentially a faction-ridden party that survived only because the opposition was too weak to capitalize.', answer: 'The claim is partially true but incomplete',
                  options: ['The claim is partially true but incomplete', 'weakness', 'Congress dominance = absence of real democracy', 'Congress won because opposition parties were banned'],
                  hint: 'Revisit c11_ps_cbse_12_004 (FPTP system) and work through a 3-candidate numerical example.',
                  misconception: 'Students often think "Congress dominance = absence of real democracy" or "Congress won because opposition parties were banned." In reality.' }
          ],
            remediations: { 'congress-dominance-absence-of-real': { steps: ['If the student conflates Congress dominance with authoritarian one-party rule, have them re-read the NCERT paragraphs.', 'Then ask them to explain how FPTP works using a 3-candidate constituency example (c11_ps_cbse_12_004).', 'Finally, have them write a 100-word note: "Why factions were a strength, not a weakness, for the Congress System."'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_003', difficulty: 'standard',
          question: 'The First General Elections (1951-52) were India\'s inaugural nationwide.',
          hint: 'Revisit c11_ps_cbse_12_004 worked example: "In Constituency X, Candidate A gets 40,000.',
          misconception: 'Students believe Congress won 1952 *only* because of Nehru\'s charisma or freedom struggle legacy, ignoring the.',
          parts: [
                { id: 'a', prompt: 'What constitutional article mandated universal adult franchise for the first general elections, and what was the voting age at that time?', answer: 'Article 326 of the Constitution mandated universal adult franchise',
                  options: ['Article 326 of the Constitution mandated universal adult franchise', 'one-party dominance', 'one-party system'],
                  hint: 'Revisit c11_ps_cbse_12_004 worked example: "In Constituency X, Candidate A gets 40,000 votes,.',
                  misconception: 'Students believe Congress won 1952 *only* because of Nehru\'s charisma or freedom struggle legacy, ignoring the structural amplification.' },
                { id: 'b', prompt: 'Why did the Election Commission reject electoral roll entries listing women as "wife of X" or "daughter of Y," and what does this reveal about the Commission\'s.', answer: 'The EC rejected such entries',
                  options: ['The EC rejected such entries', 'administrative neatness', 'one-party dominance', 'one-party system'],
                  hint: 'Revisit c11_ps_cbse_12_004 worked example: "In Constituency X, Candidate A gets 40,000 votes,.',
                  misconception: 'Students believe Congress won 1952 *only* because of Nehru\'s charisma or freedom struggle legacy, ignoring the structural amplification.' },
                { id: 'c', prompt: 'In the 1952 elections, Congress won 45% of votes but 74% of seats.', answer: 'FPTP awards seats to the candidate with the most votes in each constituency, not',
                  options: ['FPTP awards seats to the candidate with the most votes in each constituency, not', 'rigging', 'Congress popularity alone', 'one-party dominance'],
                  hint: 'Revisit c11_ps_cbse_12_004 worked example: "In Constituency X, Candidate A gets 40,000 votes,.',
                  misconception: 'Students believe Congress won 1952 *only* because of Nehru\'s charisma or freedom struggle legacy, ignoring the structural amplification.' }
          ],
            remediations: { 'congress-won-1952-only-because': { steps: ['If stuck on FPTP mechanics: revisit c11_ps_cbse_12_004 (FPTP system: Mechanics and criticisms) and c11_ps_cbse_12_005.', 'Re-do the worked example in c11_ps_cbse_12_004 showing a 3-candidate constituency where Candidate A wins with 35% vote.', 'Then return to this node and calculate Congress\'s seat-vote ratio for 1952 using the formula: Seats% = f(Vote%.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_004', difficulty: 'standard',
          question: 'The Socialist Party in post-independence India refers to the political.',
          hint: 'If unclear on how FPTP penalizes dispersed vote shares, revisit c12_ps_cbse_09_003 (First.',
          misconception: 'Students often believe the Socialist Party was a single, unified party that simply "lost elections" and disappeared.',
          parts: [
                { id: 'a', prompt: 'In the 1957 general election, the Socialist Party contested in most states but won only a handful of seats.', answer: 'Under FPTP, a candidate wins by securing a plurality in a single constituency',
                  options: ['Under FPTP, a candidate wins by securing a plurality in a single constituency', 'the Election Commission rigged the results', 'the Socialists didn\'t campaign hard enough', 'lost elections'],
                  hint: 'If unclear on how FPTP penalizes dispersed vote shares, revisit c12_ps_cbse_09_003 (First General.',
                  misconception: 'Students often believe the Socialist Party was a single, unified party that simply "lost elections" and disappeared.' },
                { id: 'b', prompt: 'Compare the strategic choices of Rammanohar Lohia (equidistance from Congress and Communists, radical opposition) and Asoka Mehta (limited cooperation with.', answer: 'Lohia\'s equidistance preserved a distinct ideological identity but isolated the',
                  options: ['Lohia\'s equidistance preserved a distinct ideological identity but isolated the', 'correct', 'lost elections'],
                  hint: 'If unclear on how FPTP penalizes dispersed vote shares, revisit c12_ps_cbse_09_003 (First General.',
                  misconception: 'Students often believe the Socialist Party was a single, unified party that simply "lost elections" and disappeared.' }
          ],
            remediations: { 'the-socialist-party-was-a': { steps: ['If the student cannot distinguish the 1948 split (organizational) from the 1955 dilemma (strategic), or cannot name.', '2) Watch the 10-minute segment on "Socialist Party splits" from the NPTEL lecture "Politics in India since.', '3) Re-attempt Diagnostic Questions 1, 2, and 4.', 'If still stuck, revisit c12_ps_cbse_09_002 (Nature of Congress Dominance) to understand the "Congress system" that.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_005', difficulty: 'standard',
          question: 'The Communist Party of India (CPI) was a Marxist-Leninist party that initially.',
          hint: 'Review FPTP mechanics in c11_ps_cbse_12_004 and Congress dominance patterns.',
          misconception: 'Students often believe the CPI was always a parliamentary party from its inception, overlooking its 1948-51 Telangana.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Communist Party of India (CPI) was a Marxist-Leninist party that initially pursued',
                  options: ['The Communist Party of India (CPI) was a Marxist-Leninist party that initially pursued', 'The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress System" refers to the unique pattern of one-party dominance in India', 'The First General Elections (1951-52) were India\'s inaugural nationwide democratic'],
                  hint: 'Review FPTP mechanics in c11_ps_cbse_12_004 and Congress dominance patterns in c12_ps_cbse_09_001.',
                  misconception: 'Students often believe the CPI was always a parliamentary party from its inception, overlooking its 1948-51 Telangana armed uprising and.' }
          ],
            remediations: { 'the-cpi-was-always-a': { steps: ['If the student cannot trace CPI\'s ideological shifts, have them construct a timeline: 1920s (formation) → 1935 (entry.', 'Use the NCERT text paragraphs on CPI (pp.', 'Then re-attempt Diagnostic Questions 1, 2, and 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_006', difficulty: 'standard',
          question: 'The Bharatiya Jana Sangh (BJS) was a right-wing nationalist political party.',
          hint: 'If stuck, re-watch the FPTP explanation (c11_ps_cbse_12_004) and re-read the "Nature.',
          misconception: '**Misconception**: "The Bharatiya Jana Sangh was the same as the BJP and was a major challenger to Congress in the.',
          parts: [
                { id: 'a', prompt: '**REMEMBER**: In which year was the Bharatiya Jana Sangh founded, who was its founder-President, and which two pre-independence organisations did it draw its.', answer: '**Correct answer**: Founded in **1951**',
                  options: ['**Correct answer**: Founded in **1951**', 'Atal Bihari Vajpayee'],
                  hint: 'If stuck, re-watch the FPTP explanation (c11_ps_cbse_12_004) and re-read the "Nature of Congress.',
                  misconception: '**Misconception**: "The Bharatiya Jana Sangh was the same as the BJP and was a major challenger to Congress in the 1950s." **Reality**: The.' },
                { id: 'b', prompt: '**APPLY**: In the 1952 Lok Sabha election, the BJS secured ~3% of the national vote but won only **3 seats**.', answer: '**Correct reasoning**: 1',
                  options: ['**Correct reasoning**: 1', 'FPTP is unfair'],
                  hint: 'If stuck, re-watch the FPTP explanation (c11_ps_cbse_12_004) and re-read the "Nature of Congress.',
                  misconception: '**Misconception**: "The Bharatiya Jana Sangh was the same as the BJP and was a major challenger to Congress in the 1950s." **Reality**: The.' }
          ],
            remediations: { 'misconception-the-bharatiya-jana-sangh': { steps: ['If the student holds the above misconception: 1.', '39** — note the seat numbers (3, 4) and the phrase "remained on the margins".', '**Compare with c12_ps_cbse_09_003 (First General Elections)** — see the Congress vote-seat gap (45% votes → 74% seats).', '**Review c11_ps_cbse_12_004 (FPTP)** — calculate how a 3% national vote translates to near-zero seats when regionally.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
