import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch09_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch09_p2: SimDef = {
    id: 'v3_c12_ps_ch09_p2',
    title: 'Era of One-Party Dominance · Part 2/2',
    subtitle: 'The party that contained its own opposition',
    classLevel: 12, subject: 'political_science', topic: 'Era of One-Party Dominance · Part 2/2',
    chapters: ['c12_ps_ch09'],
    nodeIds: ['c12_ps_cbse_09_007', 'c12_ps_cbse_09_008', 'c12_ps_cbse_09_009', 'c12_ps_cbse_09_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Political systems analyst', intro: 'India\'s first elections had plenty of opposition parties — they just kept losing to an organisation built over sixty years of freedom struggle.', goal: 'Analyse how Congress\'s social and ideological coalition plus factionalism sustained democratic one-party dominance.' },
    discovery: {
        question: 'In 1952, 53 parties and nearly 1,900 independents contested India\'s first election — yet one party took 74% of seats on just 45% of votes, then did it twice more. Rigged, or something stranger?',
        options: ['Democratic but lopsided: Congress\'s freedom-movement network and all-embracing coalition won pluralities seat after seat while a divided opposition split the rest under first-past-the-post', 'Rigged — opposition parties were effectively banned', 'Voters had no real choice on the ballot', 'Congress won because it controlled the Election Commission'],
        answer: 'Democratic but lopsided: Congress\'s freedom-movement network and all-embracing coalition won pluralities seat after seat while a divided opposition split the rest under first-past-the-post',
        hook: 'One-party dominance is not a one-party system — China banned rivals; India didn\'t. Congress was so broad it housed left, right and centre in one tent, so its own factions did the job an opposition normally does.',
    },
    teaching: [
        { title: 'The Swatantra Party: Conservative Opposition to Congress', text: 'The Swatantra Party was a classical liberal political party founded in August 1959 by C. Rajagopalachari, Minoo Masani, N.G. Ranga, and K.M.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_09_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Dissect the \'Congress system\': how a nationalist movement became a party that was simultaneously the government and its own opposition — and why rivals still couldn\'t break through.',
        labels: ['The Swatantra Party: Conservative', 'Opposition Parties in', 'The Congress \'Syndicate\'', 'Factors Behind the Decline'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_008', title: 'Opposition Parties in the 1950s and Their Limitations',
          caseStudy: { intro: 'Imagine you\'re watching a cricket match where one team scores 350 runs and the opposition is all out for 50 — but the losing team\'s fielding was brilliant.',
            decisions: [{ prompt: 'Name any three opposition parties that contested the first general election (1951-52) and won seats in the Lok Sabha.', options: [
                { text: 'Communist Party of India (16 seats), Socialist Party (12 seats), Bharatiya Jana Sangh (3', outcome: 'Communist Party of India (16 seats), Socialist Party (12 seats), Bharatiya Jana Sangh (3 seats).' },
                { text: 'BJP, Janata Party, or regional parties like DMK/AIADMK', outcome: 'Not quite — Students believe opposition parties in the 1950s were \'irrelevant\' because they won few seats, and.', reveals: 'opposition-parties-in-the-1950s' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_009', title: 'The Congress \'Syndicate\' and Internal Party Democracy',
          caseStudy: { intro: 'Imagine you are a Congress worker in 1965: your local leader tells you the party ticket for the upcoming election will be decided by "the Syndicate" in Delhi.',
            decisions: [{ prompt: 'Who were the key members of the Congress \'Syndicate\' in the 1960s, and what organizational positions did they hold that gave them power.', options: [
                { text: 'The core Syndicate comprised K', outcome: 'The core Syndicate comprised K. Kamaraj (Congress President, 1963-67; former CM Tamil Nadu), S.' },
                { text: 'Syndicate', outcome: 'Not quite — Students often think the "Syndicate" was a formal constitutional body within the Congress (like the.', reveals: 'the-syndicate-was-a-formal' },
                { text: 'High Command', outcome: 'Not quite — Students often think the "Syndicate" was a formal constitutional body within the Congress (like the.', reveals: 'the-syndicate-was-a-formal' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_010', title: 'Factors Behind the Decline of Congress Dominance',
          caseStudy: { intro: 'Imagine you\'re reading a 1967 newspaper headline: "Congress Loses 9 States, Majority Slashed in Lok Sabha." Start by asking: *How does a party winning 74%.',
            decisions: [{ prompt: 'In the 1967 general elections, the Congress party\'s Lok Sabha seat tally dropped from 361 (1962) to 283, while its vote share fell only.', options: [
                { text: 'The First-Past-The-Post (FPTP) system amplifies seat changes when vote shares shift near', outcome: 'The First-Past-The-Post (FPTP) system amplifies seat changes when vote shares shift near the.' },
                { text: 'delimitation changes', outcome: 'Not quite — Students often write: "Congress declined because Indira Gandhi became authoritarian and split the.', reveals: 'students-often-write-congress-declined' },
                { text: 'lower turnout', outcome: 'Not quite — Students often write: "Congress declined because Indira Gandhi became authoritarian and split the.', reveals: 'students-often-write-congress-declined' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A debate rival claims \'1950s India was a one-party state, same as any authoritarian system — Congress always won.\'',
            decisions: [{ prompt: 'What distinguishes the Congress System from one-party rule?', options: [
                { text: 'The dominance was competitive, not coercive — opposition parties contested free elections, Congress worked as a broad coalition whose internal factions did the opposing, and FPTP amplified a ~45% vote into ~75% seats; nobody was banned — that last part is the whole difference.', outcome: 'The chapter\'s key distinction: dominance through inclusion and arithmetic versus dominance through exclusion — India had a dominant party inside a democracy, not a democracy replaced by a party.' },
                { text: 'He\'s right — one party winning every election is one-party rule by definition.', outcome: 'The test isn\'t who wins but who may contest — China\'s dominance rests on legal exclusion of rivals; Congress\'s rested on winning open contests and absorbing dissent internally.', reveals: 'winning-equals-banning' },
                { text: 'The difference was just Nehru\'s personality — remove him and it was authoritarian.', outcome: 'Personality isn\'t the mechanism — the system ran on coalition breadth, faction management and FPTP mechanics; individual virtue can\'t explain seat shares or the opposition\'s legal freedom.', reveals: 'leader-equals-system' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_09_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain dominance without dictatorship — and how first-past-the-post turns a 45% vote into a three-quarters majority.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_007', difficulty: 'standard',
          question: 'The Swatantra Party was a classical liberal political party founded in August.',
          hint: 'If unable to place parties on the axis, revisit **c12_ps_cbse_09_004** (Socialist.',
          misconception: '**Misconception:** "The Swatantra Party was just a party of **feudal landlords and princes** defending their.',
          parts: [
                { id: 'a', prompt: 'A 1965 government proposal seeks to impose a **ceiling on urban property holdings** (similar to agricultural land ceilings).', answer: 'The Swatantra Party would **strongly oppose** the ceiling',
                  options: ['The Swatantra Party would **strongly oppose** the ceiling', 'support because it reduces inequality'],
                  hint: 'If unable to place parties on the axis, revisit **c12_ps_cbse_09_004** (Socialist ideology).',
                  misconception: '**Misconception:** "The Swatantra Party was just a party of **feudal landlords and princes** defending their privileges." **Reality:**.' }
          ],
            remediations: { 'misconception-the-swatantra-party-was': { steps: ['**Re-read** the "Emergence of Opposition Parties" section in NCERT (pp.', '40-41) and the Swatantra Party box (p.', '**Create a 4-column table**: Party | Year Founded | Core Ideology | Key Leader | Social Base — fill for Congress.', '**Re-attempt Diagnostic Q2 & Q4** using the table.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_008', difficulty: 'standard',
          question: 'Opposition parties in the 1950s refer to the diverse non-Congress political.',
          hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c10_civ_cbse_04_008 (opposition\'s.',
          misconception: 'Students believe opposition parties in the 1950s were \'irrelevant\' because they won few seats, and that Congress.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Opposition parties in the 1950s refer to the diverse non-Congress political parties',
                  options: ['Opposition parties in the 1950s refer to the diverse non-Congress political parties', 'The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress System" refers to the unique pattern of one-party dominance in India', 'The First General Elections (1951-52) were India\'s inaugural nationwide democratic'],
                  hint: 'Revisit c11_ps_cbse_12_004 (FPTP mechanics) and c10_civ_cbse_04_008 (opposition\'s democratic.',
                  misconception: 'Students believe opposition parties in the 1950s were \'irrelevant\' because they won few seats, and that Congress dominance meant \'no real.' }
          ],
            remediations: { 'opposition-parties-in-the-1950s': { steps: ['If a student equates opposition relevance with seat share: Step 1 — Re-read NCERT pp.', '40-41 (\'Emergence of opposition parties\') and list the four explicit functions NCERT assigns to 1950s opposition.', 'Step 2 — Review c10_civ_cbse_04_008 (Role of Opposition Parties) to recall the textbook definition of opposition\'s.', 'Step 3 — Attempt Diagnostic Question 5 again, this time using the four NCERT functions as your evaluation criteria.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_009', difficulty: 'standard',
          question: 'The Congress \'Syndicate\' refers to an informal group of powerful regional.',
          hint: 'Revisit c12_ps_cbse_09_002 "Nature of Congress Dominance: The Congress System" — focus.',
          misconception: 'Students often think the "Syndicate" was a formal constitutional body within the Congress (like the CWC) or that it was.',
          parts: [
                { id: 'a', prompt: 'Who were the key members of the Congress \'Syndicate\' in the 1960s, and what organizational positions did they hold that gave them power over candidate.', answer: 'The core Syndicate comprised K',
                  options: ['The core Syndicate comprised K', 'Syndicate', 'High Command', 'Nehru, Shastri, or Indira Gandhi as Syndicate members'],
                  hint: 'Revisit c12_ps_cbse_09_002 "Nature of Congress Dominance: The Congress System" — focus on the.',
                  misconception: 'Students often think the "Syndicate" was a formal constitutional body within the Congress (like the CWC) or that it was synonymous with the.' },
                { id: 'b', prompt: 'Compare the Syndicate\'s role in the 1967 presidential election (Dr. Zakir Husain) with the 1969 presidential election (V.V. Giri vs. Neelam Sanjiva Reddy).', answer: 'In 1967, the Syndicate *consulted* Indira Gandhi and reached consensus on Dr',
                  options: ['In 1967, the Syndicate *consulted* Indira Gandhi and reached consensus on Dr', 'personality clash', 'Syndicate', 'High Command'],
                  hint: 'Revisit c12_ps_cbse_09_002 "Nature of Congress Dominance: The Congress System" — focus on the.',
                  misconception: 'Students often think the "Syndicate" was a formal constitutional body within the Congress (like the CWC) or that it was synonymous with the.' }
          ],
            remediations: { 'the-syndicate-was-a-formal': { steps: ['If the student confuses Syndicate with High Command or formal bodies: (1) Re-read Nehru\'s 1963 letter to Rajaji (in.', '(2) Map the 1969 split: Syndicate (Nijalingappa, Reddy) vs PM (Indira) — they were *opponents*.', '(3) Revisit c12_ps_cbse_09_002 (Congress System) — the "system" relied on *informal faction accommodation*, not formal.', 'The Syndicate was the *manager* of that system, not its democratic conscience.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the "Syndicate" was a formal constitutional body within the Congress (like the CWC) or that it was.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The Congress Syndicate strengthened internal party democracy by giving regional leaders a collective voice against centralizing tendencies.', answer: 'The claim is largely *false*',
                  options: ['The claim is largely *false*', 'federal representation', 'internal democracy', 'Syndicate'],
                  hint: 'Revisit c12_ps_cbse_09_002 "Nature of Congress Dominance: The Congress System" — focus on the.',
                  misconception: 'Students often think the "Syndicate" was a formal constitutional body within the Congress (like the CWC) or that it was synonymous with the.' }
          ],
            remediations: { 'the-syndicate-was-a-formal': { steps: ['If the student confuses Syndicate with High Command or formal bodies: (1) Re-read Nehru\'s 1963 letter to Rajaji (in.', '(2) Map the 1969 split: Syndicate (Nijalingappa, Reddy) vs PM (Indira) — they were *opponents*.', '(3) Revisit c12_ps_cbse_09_002 (Congress System) — the "system" relied on *informal faction accommodation*, not formal.', 'The Syndicate was the *manager* of that system, not its democratic conscience.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_09_010', difficulty: 'standard',
          question: 'The decline of Congress dominance refers to the gradual erosion of the Indian.',
          hint: 'If stuck on FPTP mechanics, re-do the 3-cornered contest calculation in ON_FAILURE.',
          misconception: 'Students often write: "Congress declined because Indira Gandhi became authoritarian and split the party in 1969." This.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The decline of Congress dominance refers to the gradual erosion of the Indian National',
                  options: ['The decline of Congress dominance refers to the gradual erosion of the Indian National', 'The Indian National Congress emerged as the dominant political party in the first three', 'The "Congress System" refers to the unique pattern of one-party dominance in India', 'The First General Elections (1951-52) were India\'s inaugural nationwide democratic'],
                  hint: 'If stuck on FPTP mechanics, re-do the 3-cornered contest calculation in ON_FAILURE.',
                  misconception: 'Students often write: "Congress declined because Indira Gandhi became authoritarian and split the party in 1969." This reverses causality.' }
          ],
            remediations: { 'students-often-write-congress-declined': { steps: ['If the student cannot explain the 1967 seat-vote disconnect: Revisit c11_ps_cbse_12_004 (FPTP mechanics) and.', 'Do a mini-calculation: In a 3-cornered contest, Party A gets 36%, Party B 34%, Party C 30%.', 'Now shift 3% from A to B → A 33%, B 37%, C 30%.', 'That 3% swing flipped the seat.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
