import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch12_p1: SimDef = {
    id: 'v3_c11_ps_ch12_p1',
    title: 'Election and Representation · Part 1/2',
    subtitle: 'See why your vote is sovereignty delegated, not sovereignty diluted.',
    classLevel: 11, subject: 'political_science', topic: 'Election and Representation · Part 1/2',
    chapters: ['c11_ps_ch12'],
    nodeIds: ['c11_ps_cbse_12_001', 'c11_ps_cbse_12_002', 'c11_ps_cbse_12_003', 'c11_ps_cbse_12_004', 'c11_ps_cbse_12_005', 'c11_ps_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a voter tracing where their ballot\'s power actually travels', intro: 'You never vote on a single law — yet you\'re still sovereign; the difference between authorising and exercising is the system.', goal: 'Distinguish popular sovereignty from direct rule and explain indirect election mechanics.' },
    discovery: {
        question: 'The people are sovereign — so why can\'t citizens vote directly on the farm laws themselves?',
        options: ['Because Indian sovereignty is exercised through representatives — the people authorise power but don\'t wield it law-by-law', 'Because the Constitution forgot referendums', 'Because voters aren\'t educated enough', 'No reason — direct voting is actually allowed'],
        answer: 'Because Indian sovereignty is exercised through representatives — the people authorise power but don\'t wield it law-by-law',
        hook: 'And the President isn\'t picked by the PM — an electoral college of elected MPs and MLAs votes; indirect election means representatives choose, not the executive.',
    },
    teaching: [
        { title: 'Why elections are needed: Accountability and popular sovereignty', text: 'Elections are the institutional mechanism through which popular sovereignty—the principle that ultimate political authority resides in the people—is operationalized in a representative democracy, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_12_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Weigh simultaneous elections against accountability, then argue two points each for and against a directly elected President.',
        labels: ['Why elections are needed', 'Direct vs indirect elections', 'Universal Adult Franchise: One', 'First Past the Post', 'Proportional Representation system: Comparison', 'Why India chose FPTP'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_001', title: 'Why elections are needed: Accountability and popular sovereignty',
          caseStudy: { intro: 'Imagine you are a Class 11 student reading a news report about a state government that lost a vote of confidence after several MLAs switched parties, and the.',
            decisions: [{ prompt: 'What is the constitutional basis for the claim that "the people are the ultimate source of political authority" in India, and which article.', options: [
                { text: 'The Preamble declares India a "sovereign democratic republic" and secures "liberty of', outcome: 'The Preamble declares India a "sovereign democratic republic" and secures "liberty of thought.' },
                { text: 'popular sovereignty', outcome: 'Not quite — Students often think "popular sovereignty" means the people directly make laws or decisions (direct.', reveals: 'popular-sovereignty-means-the-people' },
                { text: 'If the people are sovereign, why can\'t they vote on the farm laws directly?', outcome: 'Not quite — Students often think "popular sovereignty" means the people directly make laws or decisions (direct.', reveals: 'popular-sovereignty-means-the-people' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_002', title: 'Direct vs indirect elections in India',
          caseStudy: { intro: 'Imagine you are electing your class monitor: if every student votes, that\'s a direct election; if each section elects a representative who then votes for the.',
            decisions: [{ prompt: 'Which of the following offices in India are filled through DIRECT election by the people?', options: [
                { text: 'Correct: (b) Member of Lok Sabha and (d) Member of State Legislative Assembly', outcome: 'Correct: (b) Member of Lok Sabha and (d) Member of State Legislative Assembly.' },
                { text: 'elected by representatives', outcome: 'Not quite — Students often think "indirect election" means the Prime Minister or Chief Minister appoints the.', reveals: 'indirect-election-means-the-prime' },
                { text: 'elected by people', outcome: 'Not quite — Students often think "indirect election" means the Prime Minister or Chief Minister appoints the.', reveals: 'indirect-election-means-the-prime' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_003', title: 'Universal Adult Franchise: One person, one vote, one value',
          caseStudy: { intro: 'Imagine you\'re watching the 2024 Lok Sabha election results — 96.8 crore voters, a 18-year-old first-time voter in a Kerala village and a 90-year-old.',
            decisions: [{ prompt: 'Which constitutional article explicitly provides for Universal Adult Franchise in elections to the Lok Sabha and State Legislative.', options: [
                { text: 'Article 326', outcome: 'Article 326. A wrong answer (e.g., Article 324, Article 325, or Article 14) reveals confusion.' },
                { text: 'Universal Adult Franchise means everyone living in India can vote', outcome: 'Not quite — Students often believe "Universal Adult Franchise means everyone living in India can vote." This.', reveals: 'universal-adult-franchise-means-everyone' },
                { text: 'every person who is a citizen of India', outcome: 'Not quite — Students often believe "Universal Adult Franchise means everyone living in India can vote." This.', reveals: 'universal-adult-franchise-means-everyone' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_004', title: 'First Past the Post (FPTP) system: Mechanics and criticisms',
          caseStudy: { intro: 'Imagine your class of 40 students electing a monitor: 4 candidates stand, votes are 12, 11, 10, 7.',
            decisions: [{ prompt: 'Define FPTP and state the exact winning condition for a candidate in a single-member constituency under this system.', options: [
                { text: 'FPTP (First Past the Post) is a plurality electoral system where the candidate with the', outcome: 'FPTP (First Past the Post) is a plurality electoral system where the candidate with the highest.' },
                { text: 'candidate needs 50%+1 votes', outcome: 'Not quite — Students believe FPTP requires the winner to secure an absolute majority (50%+1) of votes cast.', reveals: 'fptp-requires-the-winner-to' },
                { text: 'FPTP requires the winner to secure an absolute majority (50%+1) of votes cast', outcome: 'Not quite — Students believe FPTP requires the winner to secure an absolute majority (50%+1) of votes cast.', reveals: 'fptp-requires-the-winner-to' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_006', title: 'Why India chose FPTP over proportional representation',
          caseStudy: { intro: 'Imagine you are a voter in a diverse constituency like Malkajgiri (Telangana) with 31 lakh voters — you want your MP to know your local water crisis, not just.',
            decisions: [{ prompt: 'Which constitutional article provides for the delimitation of territorial constituencies for Lok Sabha elections, thereby operationalising.', options: [
                { text: 'Article 81 read with Article 327 provides for territorial constituencies and empowers', outcome: 'Article 81 read with Article 327 provides for territorial constituencies and empowers Parliament.' },
                { text: 'simple', outcome: 'Not quite — Students often believe India chose FPTP *only* because it was "simple" or "British legacy." The.', reveals: 'india-chose-fptp-only-because' },
                { text: 'British legacy', outcome: 'Not quite — Students often believe India chose FPTP *only* because it was "simple" or "British legacy." The.', reveals: 'india-chose-fptp-only-because' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a democracy-literacy drive, a volunteer asks: \'If the people are sovereign, why can\'t we vote directly on the farm laws?\' Another claims \'indirect election means the Prime Minister picks the President and Rajya Sabha members.\'',
            decisions: [{ prompt: 'How do popular sovereignty and the two election types actually work?', options: [
                { text: 'Separate source from mode: the people are the SOURCE of authority but exercise it through representatives — elections operationalise sovereignty and enforce accountability via Article 326\'s universal franchise, not by direct legislation. And indirect elections are conducted by ELECTED representatives: MPs and MLAs elect the President (Art. 54) and Rajya Sabha members — the executive appoints nobody.', outcome: 'Both confusions clear: sovereignty flows through representation, and \'indirect\' means legislatures voting — not ministers appointing.' },
                { text: 'Support direct referendums — sovereignty means the people should vote on laws themselves.', outcome: 'That conflates the source of power with its mode: representative democracy authorises through periodic sanction — accountability to voters, not governance by plebiscite.', reveals: 'sovereignty-means-direct-voting' },
                { text: 'Accept the PM-appoints version — indirect must mean the executive chooses.', outcome: 'That\'s a category error: the electoral college is made of MPs/MLAs — legislators, not the Council of Ministers — keeping the office accountable to the legislature.', reveals: 'indirect-means-pm-appoints' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'Representation means the people hand out power and call it back — sovereignty lives in the authorisation, not in a daily referendum.',
            decisions: [{ prompt: 'What comes next? Election and Representation · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Election and Representation · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_001', difficulty: 'standard',
          question: 'Elections are the institutional mechanism through which popular sovereignty—the.',
          hint: 'Revisit c9_civ_ch1_5 (Representative vs Direct Democracy) and c10_civ_cbse_05_001.',
          misconception: 'Students often think "popular sovereignty" means the people directly make laws or decisions (direct democracy), and.',
          parts: [
                { id: 'a', prompt: 'In 2019, a state government lost its majority when 17 MLAs resigned, leading to a floor test and a new government formed by the opposition without fresh.', answer: 'Popular sovereignty authorizes representatives for a fixed term',
                  options: ['Popular sovereignty authorizes representatives for a fixed term', 'it\'s constitutional so it\'s democratic', 'popular sovereignty', 'If the people are sovereign, why can\'t they vote on the farm laws directly?'],
                  hint: 'Revisit c9_civ_ch1_5 (Representative vs Direct Democracy) and c10_civ_cbse_05_001 (Accountable.',
                  misconception: 'Students often think "popular sovereignty" means the people directly make laws or decisions (direct democracy), and therefore equate.' },
                { id: 'b', prompt: 'Compare the accountability mechanism in a parliamentary system (India) with that in a presidential system (USA).', answer: 'In India, voters elect the legislature',
                  options: ['In India, voters elect the legislature', 'both are equally accountable', 'popular sovereignty', 'If the people are sovereign, why can\'t they vote on the farm laws directly?'],
                  hint: 'Revisit c9_civ_ch1_5 (Representative vs Direct Democracy) and c10_civ_cbse_05_001 (Accountable.',
                  misconception: 'Students often think "popular sovereignty" means the people directly make laws or decisions (direct democracy), and therefore equate.' }
          ],
            remediations: { 'popular-sovereignty-means-the-people': { steps: ['Re-read the Preamble and Article 326 to locate the exact words "We, the people of India" and "elections on the basis.', 'Contrast with a direct democracy instrument like a referendum (which India does not have at the national level).', 'Use the worked example of the 2020 farm laws: the government had the *authority* (sovereignty delegated via elections).', 'Write a two-sentence distinction: "Popular sovereignty means the people are the ultimate source of authority.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_002', difficulty: 'standard',
          question: 'Direct election is a method where citizens vote directly to choose their.',
          hint: 'Revisit Article 326 (universal adult franchise) and the composition of Parliament (Lok.',
          misconception: 'Students often think "indirect election" means the Prime Minister or Chief Minister appoints the President/Rajya Sabha.',
          parts: [
                { id: 'a', prompt: 'Which of the following offices in India are filled through DIRECT election by the people?', answer: 'Correct: (b) Member of Lok Sabha and (d) Member of State Legislative Assembly',
                  options: ['Correct: (b) Member of Lok Sabha and (d) Member of State Legislative Assembly', 'elected by representatives', 'elected by people', 'indirect election'],
                  hint: 'Revisit Article 326 (universal adult franchise) and the composition of Parliament (Lok Sabha.',
                  misconception: 'Students often think "indirect election" means the Prime Minister or Chief Minister appoints the President/Rajya Sabha members.' },
                { id: 'b', prompt: 'A citizen says: "I voted for my MLA, and my MLA voted for a Rajya Sabha member.', answer: 'Yes, it is accurate',
                  options: ['Yes, it is accurate', 'No, because the citizen didn\'t vote directly', 'indirect election'],
                  hint: 'Revisit Article 326 (universal adult franchise) and the composition of Parliament (Lok Sabha.',
                  misconception: 'Students often think "indirect election" means the Prime Minister or Chief Minister appoints the President/Rajya Sabha members.' },
                { id: 'c', prompt: 'Compare the accountability mechanisms for a directly elected Lok Sabha MP and an indirectly elected Rajya Sabha MP.', answer: 'A Lok Sabha MP faces direct electoral accountability every 5 years',
                  options: ['A Lok Sabha MP faces direct electoral accountability every 5 years', 'Both are equally accountable', 'indirect election'],
                  hint: 'Revisit Article 326 (universal adult franchise) and the composition of Parliament (Lok Sabha.',
                  misconception: 'Students often think "indirect election" means the Prime Minister or Chief Minister appoints the President/Rajya Sabha members.' }
          ],
            remediations: { 'indirect-election-means-the-prime': { steps: ['Have the student list the composition of the Presidential electoral college (Art.', 'Ask them to circle "elected" in each description.', 'Show a news report of a Presidential election (e.g., 2022) highlighting that MLAs from Opposition parties voted.', 'Contrast with nomination (Art. 80(3) for Rajya Sabha, Art. 331/333 for Anglo-Indian nomination — now discontinued).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "indirect election" means the Prime Minister or Chief Minister appoints the President/Rajya Sabha.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument: "India should switch to direct election of the President to strengthen democracy." Provide two constitutional arguments for and two.', answer: 'For: (1) Direct mandate would enhance presidential legitimacy',
                  options: ['For: (1) Direct mandate would enhance presidential legitimacy', 'indirect election'],
                  hint: 'Revisit Article 326 (universal adult franchise) and the composition of Parliament (Lok Sabha.',
                  misconception: 'Students often think "indirect election" means the Prime Minister or Chief Minister appoints the President/Rajya Sabha members.' }
          ],
            remediations: { 'indirect-election-means-the-prime': { steps: ['Have the student list the composition of the Presidential electoral college (Art.', 'Ask them to circle "elected" in each description.', 'Show a news report of a Presidential election (e.g., 2022) highlighting that MLAs from Opposition parties voted.', 'Contrast with nomination (Art. 80(3) for Rajya Sabha, Art. 331/333 for Anglo-Indian nomination — now discontinued).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_003', difficulty: 'standard',
          question: 'Universal Adult Franchise (UAF) is the constitutional principle enshrined.',
          hint: 'Revisit Article 326 text and Class 8 node c8_civ_ch1_3; compare with RP Act Section 16.',
          misconception: 'Students often believe "Universal Adult Franchise means everyone living in India can vote." This is incorrect: UAF.',
          parts: [
                { id: 'a', prompt: 'Which constitutional article explicitly provides for Universal Adult Franchise in elections to the Lok Sabha and State Legislative Assemblies?', answer: 'Article 326',
                  options: ['Article 326', 'Universal Adult Franchise means everyone living in India can vote', 'every person who is a citizen of India', '"Universal Adult Franchise means everyone living in India can vote'],
                  hint: 'Revisit Article 326 text and Class 8 node c8_civ_ch1_3; compare with RP Act Section 16 to see how.',
                  misconception: 'Students often believe "Universal Adult Franchise means everyone living in India can vote." This is incorrect: UAF applies ONLY.' },
                { id: 'b', prompt: 'Explain why the Constitution makers chose Universal Adult Franchise over a restricted franchise based on literacy or property qualifications, despite India\'s.', answer: 'The Constituent Assembly debated this extensively',
                  options: ['The Constituent Assembly debated this extensively', 'administrative convenience', 'following British precedent', 'Universal Adult Franchise means everyone living in India can vote'],
                  hint: 'Revisit Article 326 text and Class 8 node c8_civ_ch1_3; compare with RP Act Section 16 to see how.',
                  misconception: 'Students often believe "Universal Adult Franchise means everyone living in India can vote." This is incorrect: UAF applies ONLY.' },
                { id: 'c', prompt: 'A State government passes a law requiring voters to pass a basic literacy test before being enrolled in the electoral roll.', answer: 'Invalid',
                  options: ['Invalid', 'State can add qualifications', 'Universal Adult Franchise means everyone living in India can vote', 'every person who is a citizen of India'],
                  hint: 'Revisit Article 326 text and Class 8 node c8_civ_ch1_3; compare with RP Act Section 16 to see how.',
                  misconception: 'Students often believe "Universal Adult Franchise means everyone living in India can vote." This is incorrect: UAF applies ONLY.' },
                { id: 'd', prompt: 'Compare the franchise under the Government of India Act, 1935 with Universal Adult Franchise under Article 326.', answer: 'Three categories: (1) Women',
                  options: ['Three categories: (1) Women', 'illiterates', 'Universal Adult Franchise means everyone living in India can vote', 'every person who is a citizen of India'],
                  hint: 'Revisit Article 326 text and Class 8 node c8_civ_ch1_3; compare with RP Act Section 16 to see how.',
                  misconception: 'Students often believe "Universal Adult Franchise means everyone living in India can vote." This is incorrect: UAF applies ONLY.' }
          ],
            remediations: { 'universal-adult-franchise-means-everyone': { steps: ['Re-read Article 326 text — highlight "citizen of India" and the four disqualifications.', 'Contrast with Article 325 (no discrimination on religion, race, caste, sex) — note Art.', 'Check Representation of People Act, 1950 Section 16 — disqualifications for non-citizens.', 'Discuss the 2022 Election Commission proposal for remote voting for migrants — does it change Article 326?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_004', difficulty: 'standard',
          question: 'First Past the Post (FPTP) is a plurality-based electoral system where the.',
          hint: 'Review c11_ps_cbse_12_003 (Universal Adult Franchise) for the voting right foundation and.',
          misconception: 'Students believe FPTP requires the winner to secure an absolute majority (50%+1) of votes cast.',
          parts: [
                { id: 'a', prompt: 'Explain why a political party securing 30% of the national popular vote can win a comfortable majority (over 50%) of seats in the Lok Sabha under FPTP.', answer: 'FPTP operates constituency-by-constituency, not nationally',
                  options: ['FPTP operates constituency-by-constituency, not nationally', 'low turnout', 'many parties', 'FPTP requires the winner to secure an absolute majority (50%+1) of votes cast'],
                  hint: 'Review c11_ps_cbse_12_003 (Universal Adult Franchise) for the voting right foundation and.',
                  misconception: 'Students believe FPTP requires the winner to secure an absolute majority (50%+1) of votes cast.' },
                { id: 'b', prompt: 'In a constituency with 1,00,000 registered voters and 65% turnout, four candidates receive: A: 26,000; B: 22,000; C: 18,000; D: 14,000 votes.', answer: 'Total votes cast = 65,000',
                  options: ['Total votes cast = 65,000', 'FPTP requires the winner to secure an absolute majority (50%+1) of votes cast'],
                  hint: 'Review c11_ps_cbse_12_003 (Universal Adult Franchise) for the voting right foundation and.',
                  misconception: 'Students believe FPTP requires the winner to secure an absolute majority (50%+1) of votes cast.' }
          ],
            remediations: { 'fptp-requires-the-winner-to': { steps: ['Use the 2014 Gwalior Lok Sabha result: BJP 4,42,796 (46.7%), INC 3,78,512 (40.0%), BSP 82,382 (8.7%), NOTA 5,432.', 'Walk through: (1) Identify winner (BJP) with 46.7% – not a majority.', '(2) Calculate votes for losing candidates: 53.3%.', '(3) Explain that under FPTP, the 53.3% who voted for others get zero representation from this constituency.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_005', difficulty: 'standard',
          question: 'Proportional Representation (PR) is an electoral system where seats in.',
          hint: 'Revisit node c11_ps_cbse_12_004 - focus on "wasted votes" and "manufactured majority".',
          misconception: 'Students equate "Proportional Representation" exclusively with "Party List PR" (vote for party symbol, seats.',
          parts: [
                { id: 'a', prompt: 'In a hypothetical 5-seat Rajya Sabha constituency using STV (Droop quota), 600 MLAs vote.', answer: 'Quota = floor(600 / (5 + 1)) + 1 = 101 votes',
                  options: ['Quota = floor(600 / (5 + 1)) + 1 = 101 votes', 'total/seats'],
                  hint: 'Revisit node c11_ps_cbse_12_004 - focus on "wasted votes" and "manufactured majority" concepts with.',
                  misconception: 'Students equate "Proportional Representation" exclusively with "Party List PR" (vote for party symbol, seats by percentage) and assume.' }
          ],
            remediations: { 'students-equate-proportional-representation-excl': { steps: ['Have the student re-read Art. 55 and Art. 80 in the bare Constitution text—highlight "single transferable vote" and.', 'Walk through a mini-STV count with 3 candidates, 2 seats, 100 voters, showing preference transfer—make them see votes.', 'Contrast the ballot paper: Lok Sabha = tick one symbol; Rajya Sabha = write 1, 2, 3 against names.', 'Ask: "If STV weren\'t PR, why would the Constitution explicitly say \'proportional representation by means of single.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_12_006', difficulty: 'standard',
          question: 'India adopted the First Past the Post (FPTP) electoral system for Lok Sabha and.',
          hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c11_ps_cbse_12_005 (PR mechanics) — focus.',
          misconception: 'Students often believe India chose FPTP *only* because it was "simple" or "British legacy." The reality: the.',
          parts: [
                { id: 'a', prompt: 'In the 2014 Lok Sabha election, the BJP won 282 seats (52% of seats) with 31% of the national vote share.', answer: 'Under pure PR, BJP would have won ~167 seats (31% of 543)',
                  options: ['Under pure PR, BJP would have won ~167 seats (31% of 543)', 'BJP would still win 282 seats', 'simple', 'British legacy'],
                  hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c11_ps_cbse_12_005 (PR mechanics) — focus on the.',
                  misconception: 'Students often believe India chose FPTP *only* because it was "simple" or "British legacy." The reality: the Constituent Assembly *actively.' }
          ],
            remediations: { 'india-chose-fptp-only-because': { steps: ['If the student holds this misconception: (1) Have them read the Constituent Assembly debate excerpt (CAD Vol.', 'VIII, 1949) where Ambedkar responds to K.T.', '(2) Ask them to list three specific arguments Ambedkar made against PR.', '(3) Compare with the 1996-1998 unstable coalition governments — would PR have made them *more* or *less* stable?'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
