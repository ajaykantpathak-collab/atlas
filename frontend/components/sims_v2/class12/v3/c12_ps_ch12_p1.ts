import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch12_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch12_p1: SimDef = {
    id: 'v3_c12_ps_ch12_p1',
    title: 'Challenges to and Restoration of Congress System · Part 1/2',
    subtitle: 'The year India\'s one-party habit broke',
    classLevel: 12, subject: 'political_science', topic: 'Challenges to and Restoration of Congress System · Part 1/2',
    chapters: ['c12_ps_ch12'],
    nodeIds: ['c12_ps_cbse_12_001', 'c12_ps_cbse_12_002', 'c12_ps_cbse_12_003', 'c12_ps_cbse_12_004', 'c12_ps_cbse_12_005', 'c12_ps_cbse_12_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Election analyst', intro: 'A generation raised on Congress victories woke up to headlines of seven lost states and MLAs for hire.', goal: 'Analyse the 1967 verdict — non-Congressism, SVD coalitions and defection politics — as the turning point of the party system.' },
    discovery: {
        question: 'In Haryana in 1967, one MLA switched parties three times in a fortnight — once within nine hours — and a Congress boss publicly joked about it. What did that farce reveal about the election\'s real aftershock?',
        options: ['Coalitions built only on anti-Congress unity had no programme to hold them together, and parties openly traded MLAs to make governments', 'Defection was illegal but impossible to prove', 'The MLA was unusually corrupt, nothing more', 'The Election Commission had collapsed'],
        answer: 'Coalitions built only on anti-Congress unity had no programme to hold them together, and parties openly traded MLAs to make governments',
        hook: '1967 didn\'t split Congress — that came in 1969 over a presidential nominee. The election\'s real work was exposing that drought, devaluation and death had drained the party\'s performance legitimacy, letting Lohia\'s \'non-Congressism\' unite rivals who agreed on nothing else.',
    },
    teaching: [
        { title: 'Fourth General Elections (1967) and Decline of Congress', text: 'The Fourth General Elections of 1967 marked a pivotal electoral turning point where the Congress party, despite retaining a majority at the Centre, suffered its sharpest decline in vote share and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_12_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run the numbers on 1967 — seven states lost, half the cabinet defeated — and trace how hunger, opposition arithmetic and defections cracked the Congress system.',
        labels: ['Fourth General Elections (1967)', 'The Congress Split', 'Indira Gandhi\'s Rise, Populism', 'The 1971 Elections', 'The JP Movement', 'Declaration of National Emergency'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_001', title: 'Fourth General Elections (1967) and Decline of Congress',
          caseStudy: { intro: 'Imagine you are reading a 1967 newspaper headline: "Congress Loses 7 States, Half of Cabinet Defeated!" — a shock for a generation that knew only Congress.',
            decisions: [{ prompt: 'What was the "non-Congressism" strategy articulated by Ram Manohar Lohia, and which two types of electoral arrangements did opposition.', options: [
                { text: 'Non-Congressism was Lohia\'s argument that Congress rule was undemocratic and anti-poor,', outcome: 'Non-Congressism was Lohia\'s argument that Congress rule was undemocratic and anti-poor,.' },
                { text: 'non-Congressism meant merging all parties into one', outcome: 'Not quite — Students often think the 1967 elections *caused* the Congress split of 1969.', reveals: 'the-1967-elections-caused-the' },
                { text: 'the 1967 elections *caused* the Congress split of 1969', outcome: 'Not quite — Students often think the 1967 elections *caused* the Congress split of 1969.', reveals: 'the-1967-elections-caused-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_002', title: 'The Congress Split of 1969: Indira Gandhi vs the Syndicate',
          caseStudy: { intro: 'Imagine you are a Congress MP in 1969: the party president (Nijalingappa) issues a whip to vote for Sanjiva Reddy in the Presidential election, but the Prime.',
            decisions: [{ prompt: 'Who were the key members of the \'Syndicate\' in the Congress Party during the late 1960s, and who led it?', options: [
                { text: 'The Syndicate was led by K', outcome: 'The Syndicate was led by K. Kamaraj (Congress President) and included S.K. Patil (Bombay), S.' },
                { text: 'Morarji Desai or Indira Gandhi as Syndicate members', outcome: 'Not quite — Students often think the Congress split happened because Indira Gandhi was \'left-wing\' and the.', reveals: 'the-congress-split-happened-because' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_003', title: 'Indira Gandhi\'s Rise, Populism and the Garibi Hatao Slogan',
          caseStudy: { intro: 'Imagine you are a voter in 1971: food prices have doubled in five years, your village has no bank branch, and the local prince still gets a tax-free allowance.',
            decisions: [{ prompt: 'What was the "Syndicate" in the Congress Party of the 1960s, and who led it?', options: [
                { text: 'The Syndicate was an informal group of powerful regional Congress bosses (K', outcome: 'The Syndicate was an informal group of powerful regional Congress bosses (K. Kamaraj, S.' },
                { text: 'it was Indira Gandhi\'s kitchen cabinet', outcome: 'Not quite — Students often think the 1969 Congress split was caused solely by the Presidential election.', reveals: 'the-1969-congress-split-was' },
                { text: 'a formal constitutional body', outcome: 'Not quite — Students often think the 1969 Congress split was caused solely by the Presidential election.', reveals: 'the-1969-congress-split-was' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_004', title: 'The 1971 Elections and the Restoration of Congress Dominance',
          caseStudy: { intro: 'Imagine you\'re watching a 2024 election debate where one leader says "Remove the incumbent" while another says "Remove poverty" — which resonates more with.',
            decisions: [{ prompt: 'What was the name of the opposition electoral alliance formed for the 1971 elections, and which major parties constituted it?', options: [
                { text: 'The Grand Alliance, comprising Samyukta Socialist Party (SSP), Praja Socialist Party', outcome: 'The Grand Alliance, comprising Samyukta Socialist Party (SSP), Praja Socialist Party (PSP).' },
                { text: 'won back', outcome: 'Not quite — Students believe the 1971 victory meant Indira Gandhi simply "won back" the old Congress party.', reveals: 'the-1971-victory-meant-indira' },
                { text: 'the 1971 victory meant Indira Gandhi simply "won back" the old Congress party', outcome: 'Not quite — Students believe the 1971 victory meant Indira Gandhi simply "won back" the old Congress party.', reveals: 'the-1971-victory-meant-indira' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_005', title: 'The JP Movement and the Navnirman Andolan',
          caseStudy: { intro: 'Imagine you see university students today protesting a sudden hostel fee hike and demanding the vice-chancellor\'s resignation — that is exactly how the.',
            decisions: [{ prompt: 'In which state and year did the Navnirman Andolan begin, and what was its immediate trigger?', options: [
                { text: 'The Navnirman Andolan began in Gujarat in 1974, triggered by a steep hike in hostel mess', outcome: 'The Navnirman Andolan began in Gujarat in 1974, triggered by a steep hike in hostel mess fees.' },
                { text: 'Bihar, 1975', outcome: 'Not quite — Students often believe the JP Movement was a partisan political movement orchestrated by opposition.', reveals: 'the-jp-movement-was-a' },
                { text: 'triggered by railway strike', outcome: 'Not quite — Students often believe the JP Movement was a partisan political movement orchestrated by opposition.', reveals: 'the-jp-movement-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_006', title: 'Declaration of National Emergency (1975-77) and Its Consequences',
          caseStudy: { intro: 'Imagine you\'re reading a newspaper from June 1975: the Prime Minister has just been unseated by a High Court, a massive opposition rally is planned in Delhi.',
            decisions: [{ prompt: 'Under which Article of the Constitution was the 1975 Emergency proclaimed, and on what specific ground?', options: [
                { text: 'Article 352, on the ground of "internal disturbance" (as it stood before the 44th', outcome: 'Article 352, on the ground of "internal disturbance" (as it stood before the 44th Amendment changed.' },
                { text: 'war/external aggression', outcome: 'Not quite — Students often think "Emergency = suspension of ALL Fundamental Rights automatically." In reality.', reveals: 'emergency-suspension-of-all-fundamental' },
                { text: 'internal disturbance', outcome: 'Not quite — Students often think "Emergency = suspension of ALL Fundamental Rights automatically." In reality.', reveals: 'emergency-suspension-of-all-fundamental' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_001', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history-debate simulation of the 1969 Presidential election, one side argues every MP who voted for V.V. Giri \'defied the party whip and betrayed Congress discipline.\'',
            decisions: [{ prompt: 'Does the whip bind a Presidential vote?', options: [
                { text: 'No — the whip governs the government\'s survival in the legislature, not the electoral college\'s choice of President; a conscience-vote tradition in Presidential elections gave cover to vote independently, which is exactly the institutional seam Indira Gandhi used to defy the Syndicate.', outcome: 'The chapter\'s mechanism: the split weaponised two different kinds of party authority — organisational whip versus prime-ministerial appeal — and the Presidential vote was where they collided.' },
                { text: 'Yes — a whip is a whip; party members must vote as directed in every election.', outcome: 'That treats all party voting as identical — Presidential elections carry an accepted conscience tradition and don\'t topple governments, which is why the \'conscience vote\' call could split the party legally.', reveals: 'whip-binds-everything' },
                { text: 'The vote was a loyalty test — supporting Giri proved the MPs wanted a split.', outcome: 'Indira framed it as conscience, not defection — the split followed the vote, it wasn\'t declared by it; reading the votes backward as intent confuses the trigger with the outcome.', reveals: 'the-vote-was-the-split' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now see 1967 as the moment dominance became contestable: the Congress era didn\'t end, but its inevitability did.',
            decisions: [{ prompt: 'What comes next? Challenges to and Restoration of Congress System · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Challenges to and Restoration of Congress System · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_001', difficulty: 'standard',
          question: 'The Fourth General Elections of 1967 marked a pivotal electoral turning point.',
          hint: 'Revisit Class 11 Chapter "Challenges to and Restoration of Congress System" (or Class 12.',
          misconception: 'Students often think the 1967 elections *caused* the Congress split of 1969.',
          parts: [
                { id: 'a', prompt: 'Why did the Congress lose majority in seven states in 1967 despite winning a Lok Sabha majority?', answer: 'The Congress lost state majorities',
                  options: ['The Congress lost state majorities', 'Indira\'s inexperience', 'the 1967 elections *caused* the Congress split of 1969'],
                  hint: 'Revisit Class 11 Chapter "Challenges to and Restoration of Congress System" (or Class 12 Chapter 2).',
                  misconception: 'Students often think the 1967 elections *caused* the Congress split of 1969.' },
                { id: 'b', prompt: 'Compare the SVD (Samyukt Vidhayak Dal) governments in Bihar and Punjab after 1967.', answer: 'Bihar\'s SVD included socialists (SSP, PSP), CPI (left), and Jana Sangh (right)',
                  options: ['Bihar\'s SVD included socialists (SSP, PSP), CPI (left), and Jana Sangh (right)', 'ideological alliances', 'reclaiming democracy', 'the 1967 elections *caused* the Congress split of 1969'],
                  hint: 'Revisit Class 11 Chapter "Challenges to and Restoration of Congress System" (or Class 12 Chapter 2).',
                  misconception: 'Students often think the 1967 elections *caused* the Congress split of 1969.' }
          ],
            remediations: { 'the-1967-elections-caused-the': { steps: ['If the student conflates 1967 and 1969: (1) Re-read the NCERT section "Split in the Congress" (pp.', '81-84) noting the 1969 timeline.', '(2) Create a two-column timeline: 1967 events (elections, state losses, defections) vs.', '1969 events (Presidential election, whip, expulsion, Congress O/R formation).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the 1967 elections *caused* the Congress split of 1969.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "The \'Aya Ram, Gaya Ram\' phenomenon after 1967 was a symptom of weak party institutionalisation, not just individual opportunism." Use.', answer: 'The statement is correct',
                  options: ['The statement is correct', 'greedy MLAs', 'the 1967 elections *caused* the Congress split of 1969'],
                  hint: 'Revisit Class 11 Chapter "Challenges to and Restoration of Congress System" (or Class 12 Chapter 2).',
                  misconception: 'Students often think the 1967 elections *caused* the Congress split of 1969.' }
          ],
            remediations: { 'the-1967-elections-caused-the': { steps: ['If the student conflates 1967 and 1969: (1) Re-read the NCERT section "Split in the Congress" (pp.', '81-84) noting the 1969 timeline.', '(2) Create a two-column timeline: 1967 events (elections, state losses, defections) vs.', '1969 events (Presidential election, whip, expulsion, Congress O/R formation).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_002', difficulty: 'standard',
          question: 'The Congress Split of 1969 refers to the formal division of the Indian National.',
          hint: 'If stuck on why the Syndicate had power, revisit c12_ps_cbse_12_001 (Kamaraj Plan.',
          misconception: 'Students often think the Congress split happened because Indira Gandhi was \'left-wing\' and the Syndicate was.',
          parts: [
                { id: 'a', prompt: 'Who were the key members of the \'Syndicate\' in the Congress Party during the late 1960s, and who led it?', answer: 'The Syndicate was led by K',
                  options: ['The Syndicate was led by K', 'Morarji Desai or Indira Gandhi as Syndicate members'],
                  hint: 'If stuck on why the Syndicate had power, revisit c12_ps_cbse_12_001 (Kamaraj Plan, Syndicate\'s role.',
                  misconception: 'Students often think the Congress split happened because Indira Gandhi was \'left-wing\' and the Syndicate was \'right-wing\' from the start.' }
          ],
            remediations: { 'the-congress-split-happened-because': { steps: ['If the student conflates cause and effect (ideology → split), do this 3-step remediation: (1) Re-read the NCERT.', 'conscience vote → Split (Nov 1969).', '(2) Create a timeline with dates and label each event as \'organisational\', \'policy\', or \'electoral\'.', '(3) Answer: "At which point did the Syndicate first oppose Indira\'s *policies*?" (Answer: only after she used them.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_003', difficulty: 'standard',
          question: 'Indira Gandhi\'s political rise (1966–1971) refers to her transformation from.',
          hint: 'Revisit the "Indira vs. the Syndicate" section in NCERT (pp. 81–84) and the Ten Point.',
          misconception: 'Students often think the 1969 Congress split was caused solely by the Presidential election.',
          parts: [
                { id: 'a', prompt: 'What was the "Syndicate" in the Congress Party of the 1960s, and who led it?', answer: 'The Syndicate was an informal group of powerful regional Congress bosses (K',
                  options: ['The Syndicate was an informal group of powerful regional Congress bosses (K', 'it was Indira Gandhi\'s kitchen cabinet', 'a formal constitutional body', 'the 1969 Congress split was caused solely by the Presidential election'],
                  hint: 'Revisit the "Indira vs. the Syndicate" section in NCERT (pp. 81–84) and the Ten Point Programme.',
                  misconception: 'Students often think the 1969 Congress split was caused solely by the Presidential election.' },
                { id: 'b', prompt: 'Why did Indira Gandhi choose to nationalize 14 major banks in 1969, and how did it serve both economic and political purposes?', answer: 'Economically, it aimed to redirect credit to agriculture and small industry',
                  options: ['Economically, it aimed to redirect credit to agriculture and small industry', 'the 1969 Congress split was caused solely by the Presidential election'],
                  hint: 'Revisit the "Indira vs. the Syndicate" section in NCERT (pp. 81–84) and the Ten Point Programme.',
                  misconception: 'Students often think the 1969 Congress split was caused solely by the Presidential election.' },
                { id: 'c', prompt: 'In the 1969 Presidential election, Indira Gandhi supported V.V. Giri as an independent candidate against the official Congress nominee N. Sanjeeva Reddy.', answer: 'The President is elected by an electoral college (Article 54) via secret ballot',
                  options: ['The President is elected by an electoral college (Article 54) via secret ballot', 'the 1969 Congress split was caused solely by the Presidential election'],
                  hint: 'Revisit the "Indira vs. the Syndicate" section in NCERT (pp. 81–84) and the Ten Point Programme.',
                  misconception: 'Students often think the 1969 Congress split was caused solely by the Presidential election.' }
          ],
            remediations: { 'the-1969-congress-split-was': { steps: ['If the student confuses the sequence: (1) Re-read the Ten Point Programme (May 1967) in NCERT Chapter 5, para "Indira.', '(2) Map each populist measure to its date: Bank Nationalization (19 July 1969), Privy Purse Ordinance (September 1970).', '(3) Re-do Diagnostic Q2 and Q4 focusing on the *political* purpose of each economic measure.', 'Use the cartoon "The Left Hook" (NCERT p.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_004', difficulty: 'standard',
          question: 'The 1971 Lok Sabha elections were the fifth general elections in India, held.',
          hint: 'If stuck on how 44% votes → 352 seats, revisit c11_ps_cbse_12_004 (FPTP mechanics).',
          misconception: 'Students believe the 1971 victory meant Indira Gandhi simply "won back" the old Congress party.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The 1971 Lok Sabha elections were the fifth general elections in India, held in February',
                  options: ['The 1971 Lok Sabha elections were the fifth general elections in India, held in February', 'The Fourth General Elections of 1967 marked a pivotal electoral turning point where the', 'The Congress Split of 1969 refers to the formal division of the Indian National Congress', 'Indira Gandhi\'s political rise (1966–1971) refers to her transformation from a consensus'],
                  hint: 'If stuck on how 44% votes → 352 seats, revisit c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students believe the 1971 victory meant Indira Gandhi simply "won back" the old Congress party.' }
          ],
            remediations: { 'the-1971-victory-meant-indira': { steps: ['If the misconception persists: (1) Revisit c12_ps_cbse_12_002 (Congress Split 1969) to trace how Congress (R) and.', '(2) Compare the 1967 election results (c12_ps_cbse_12_001) where Congress won with factional balance vs 1971 where.', '(3) Analyze the NCERT cartoon on p.89 ("changing the top and legs of a table") — identify what stayed same (electoral.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_005', difficulty: 'standard',
          question: 'The JP Movement (1974–75) was a non-partisan mass mobilization led.',
          hint: 'Revisit the "Restoration?" section (NCERT page 89–90) and node c12_ps_cbse_12_003\'s.',
          misconception: 'Students often believe the JP Movement was a partisan political movement orchestrated by opposition parties (Jana.',
          parts: [
                { id: 'a', prompt: 'Why did Jayaprakash Narayan, a veteran Gandhian, come out of retirement to lead the JP Movement in 1974?', answer: 'JP was moved by the widespread corruption, unemployment, and the government\'s',
                  options: ['JP was moved by the widespread corruption, unemployment, and the government\'s', 'he wanted to become Prime Minister', 'he was invited by Indira Gandhi', 'nature of JP Movement'],
                  hint: 'Revisit the "Restoration?" section (NCERT page 89–90) and node c12_ps_cbse_12_003\'s worked examples.',
                  misconception: 'Students often believe the JP Movement was a partisan political movement orchestrated by opposition parties (Jana Sangh, Socialists).' }
          ],
            remediations: { 'the-jp-movement-was-a': { steps: ['If the student holds the above misconception: (1) Re-read NCERT page 89–90 ("Restoration?") which states "popular.', '(2) Watch the 20-minute documentary "JP Movement: Total Revolution" (available on NCERT\'s YouTube channel) focusing.', '(3) Re-attempt Diagnostic Question 2 and 4, explicitly writing "non-partisan" and "moral authority" in the answer.', '(4) If still stuck, revisit node c11_ps_cbse_09_006 (Gandhi and non-violence: Satyagraha) to grasp the Gandhian.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_006', difficulty: 'standard',
          question: 'The National Emergency (1975-77) was proclaimed by President Fakhruddin Ali.',
          hint: 'Revisit c11_ps_cbse_11_005 (Art 19 freedoms), c11_ps_cbse_11_012 (Emergency suspension.',
          misconception: 'Students often think "Emergency = suspension of ALL Fundamental Rights automatically." In reality: Article 19 freedoms.',
          parts: [
                { id: 'a', prompt: 'During the Emergency, which Fundamental Rights were automatically suspended under Article 358, and which required a separate Presidential order under Article.', answer: 'Article 358 automatically suspended all Article 19 freedoms (speech, assembly,',
                  options: ['Article 358 automatically suspended all Article 19 freedoms (speech, assembly,', 'all FRs suspended automatically', 'Emergency = suspension of ALL Fundamental Rights automatically', '"Emergency = suspension of ALL Fundamental Rights automatically'],
                  hint: 'Revisit c11_ps_cbse_11_005 (Art 19 freedoms), c11_ps_cbse_11_012 (Emergency suspension mechanism).',
                  misconception: 'Students often think "Emergency = suspension of ALL Fundamental Rights automatically." In reality: Article 19 freedoms are auto-suspended.' },
                { id: 'b', prompt: 'Analyze the Supreme Court\'s judgment in ADM Jabalpur v. Shivkant Shukla (1976) — the "Habeas Corpus case." What did the majority hold, and why is it considered.', answer: 'The 4:1 majority (Khanna J',
                  options: ['The 4:1 majority (Khanna J', 'Emergency = suspension of ALL Fundamental Rights automatically', '"Emergency = suspension of ALL Fundamental Rights automatically'],
                  hint: 'Revisit c11_ps_cbse_11_005 (Art 19 freedoms), c11_ps_cbse_11_012 (Emergency suspension mechanism).',
                  misconception: 'Students often think "Emergency = suspension of ALL Fundamental Rights automatically." In reality: Article 19 freedoms are auto-suspended.' }
          ],
            remediations: { 'emergency-suspension-of-all-fundamental': { steps: ['If student confuses Art 358 vs 359: Re-read c11_ps_cbse_11_005 (Right to Freedom) and c11_ps_cbse_11_012 (Suspension.', 'Make a two-column table: "Auto-suspended (Art 358)" vs "Requires Presidential Order (Art 359)".', 'List Art 19 freedoms in first column; Art 21 (and others except 20-21) in second.', 'Then read the actual 1975 Presidential orders (27 June 1975 suspending Art 21).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
