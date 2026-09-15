import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch12_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch12_p2: SimDef = {
    id: 'v3_c12_ps_ch12_p2',
    title: 'Challenges to and Restoration of Congress System · Part 2/2',
    subtitle: 'The year India\'s one-party habit broke',
    classLevel: 12, subject: 'political_science', topic: 'Challenges to and Restoration of Congress System · Part 2/2',
    chapters: ['c12_ps_ch12'],
    nodeIds: ['c12_ps_cbse_12_007', 'c12_ps_cbse_12_008', 'c12_ps_cbse_12_009', 'c12_ps_cbse_12_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Election analyst', intro: 'A generation raised on Congress victories woke up to headlines of seven lost states and MLAs for hire.', goal: 'Analyse the 1967 verdict — non-Congressism, SVD coalitions and defection politics — as the turning point of the party system.' },
    discovery: {
        question: 'In Haryana in 1967, one MLA switched parties three times in a fortnight — once within nine hours — and a Congress boss publicly joked about it. What did that farce reveal about the election\'s real aftershock?',
        options: ['Coalitions built only on anti-Congress unity had no programme to hold them together, and parties openly traded MLAs to make governments', 'Defection was illegal but impossible to prove', 'The MLA was unusually corrupt, nothing more', 'The Election Commission had collapsed'],
        answer: 'Coalitions built only on anti-Congress unity had no programme to hold them together, and parties openly traded MLAs to make governments',
        hook: '1967 didn\'t split Congress — that came in 1969 over a presidential nominee. The election\'s real work was exposing that drought, devaluation and death had drained the party\'s performance legitimacy, letting Lohia\'s \'non-Congressism\' unite rivals who agreed on nothing else.',
    },
    teaching: [
        { title: 'Constitutional Amendments during the Emergency (38th, 39th, 42nd)', text: 'The 38th, 39th, and 42nd Constitutional Amendments (1975–1976) were a series of far-reaching changes enacted during the National Emergency (1975–77) that drastically altered the Constitution\'s basic.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_12_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Run the numbers on 1967 — seven states lost, half the cabinet defeated — and trace how hunger, opposition arithmetic and defections cracked the Congress system.',
        labels: ['Constitutional Amendments during', '1977 Elections and', 'Restoration of Congress', 'The Legacy of'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_007', title: 'Constitutional Amendments during the Emergency (38th, 39th, 42nd)',
          caseStudy: { intro: 'Imagine you open a newspaper from August 1975 and read that Parliament has just passed an amendment saying the President\'s decision to impose Emergency "cannot.',
            decisions: [{ prompt: 'Which constitutional provision did the 38th Amendment (1975) primarily target to make the President\'s satisfaction in proclaiming Emergency.', options: [
                { text: 'The 38th Amendment inserted clauses (4) and (5) into Article 352, declaring that the', outcome: 'The 38th Amendment inserted clauses (4) and (5) into Article 352, declaring that the President\'s.' },
                { text: 'Article 356', outcome: 'Not quite — Students often think the 42nd Amendment *alone* suspended Fundamental Rights during Emergency.', reveals: 'the-42nd-amendment-alone-suspended' },
                { text: 'Article 360', outcome: 'Not quite — Students often think the 42nd Amendment *alone* suspended Fundamental Rights during Emergency.', reveals: 'the-42nd-amendment-alone-suspended' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_008', title: '1977 Elections and the Formation of the Janata Party Government',
          caseStudy: { intro: 'Imagine a voter in March 1977 walking to a polling booth after 21 months of press censorship, forced sterilisation, and arbitrary arrests — the first time.',
            decisions: [{ prompt: 'In which month and year were the sixth Lok Sabha elections held, and which party/alliance won a clear majority?', options: [
                { text: 'The sixth Lok Sabha elections were held in **March 1977**', outcome: 'The sixth Lok Sabha elections were held in **March 1977**; the **Janata Party alliance** won.' },
                { text: 'Congress won', outcome: 'Not quite — Students often believe the **Janata Party was a genuine ideological merger** creating a new.', reveals: 'the-janata-party-was-a' },
                { text: 'ideological conflict', outcome: 'Not quite — Students often believe the **Janata Party was a genuine ideological merger** creating a new.', reveals: 'the-janata-party-was-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_009', title: 'Restoration of Congress in 1980 and the 44th Amendment',
          caseStudy: { intro: 'Imagine you are reading a 1980 newspaper headline: "Indira Gandhi Returns with a Landslide." Start by asking: why did voters reject the Janata Party that had.',
            decisions: [{ prompt: 'In which year was the 44th Constitutional Amendment Act passed, and which government enacted it?', options: [
                { text: 'The 44th Amendment Act was passed in 1978 by the Janata Party government led by Prime', outcome: 'The 44th Amendment Act was passed in 1978 by the Janata Party government led by Prime Minister.' },
                { text: '1976 by Indira Gandhi', outcome: 'Not quite — Students often believe the 44th Amendment was passed by the Congress government after 1980 to "fix".', reveals: 'the-44th-amendment-was-passed' },
                { text: '1980 by Congress', outcome: 'Not quite — Students often believe the 44th Amendment was passed by the Congress government after 1980 to "fix".', reveals: 'the-44th-amendment-was-passed' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_010', title: 'The Legacy of the Emergency for Indian Democracy',
          caseStudy: { intro: 'Imagine you are reading a 2024 Supreme Court judgment where the bench strikes down a government order saying, "The ghost of the Emergency reminds us that.',
            decisions: [{ prompt: 'Which provision of the 44th Constitutional Amendment Act, 1978, explicitly requires that a proclamation of Emergency under Article 352 must.', options: [
                { text: 'The 44th Amendment substituted a new clause (3) in Article 352 requiring parliamentary', outcome: 'The 44th Amendment substituted a new clause (3) in Article 352 requiring parliamentary approval.' },
                { text: 'Article 352 now needs special majority, problem solved', outcome: 'Not quite — Students often believe the Emergency\'s legacy is exhausted by the 44th Amendment\'s procedural.', reveals: 'the-emergency-s-legacy-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a history-debate simulation of the 1969 Presidential election, one side argues every MP who voted for V.V. Giri \'defied the party whip and betrayed Congress discipline.\'',
            decisions: [{ prompt: 'Does the whip bind a Presidential vote?', options: [
                { text: 'No — the whip governs the government\'s survival in the legislature, not the electoral college\'s choice of President; a conscience-vote tradition in Presidential elections gave cover to vote independently, which is exactly the institutional seam Indira Gandhi used to defy the Syndicate.', outcome: 'The chapter\'s mechanism: the split weaponised two different kinds of party authority — organisational whip versus prime-ministerial appeal — and the Presidential vote was where they collided.' },
                { text: 'Yes — a whip is a whip; party members must vote as directed in every election.', outcome: 'That treats all party voting as identical — Presidential elections carry an accepted conscience tradition and don\'t topple governments, which is why the \'conscience vote\' call could split the party legally.', reveals: 'whip-binds-everything' },
                { text: 'The vote was a loyalty test — supporting Giri proved the MPs wanted a split.', outcome: 'Indira framed it as conscience, not defection — the split followed the vote, it wasn\'t declared by it; reading the votes backward as intent confuses the trigger with the outcome.', reveals: 'the-vote-was-the-split' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_12_010', title: 'You made it',
          caseStudy: { intro: 'You can now see 1967 as the moment dominance became contestable: the Congress era didn\'t end, but its inevitability did.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_007', difficulty: 'standard',
          question: 'The 38th, 39th, and 42nd Constitutional Amendments (1975–1976) were a series.',
          hint: 'Revisit c11_ps_cbse_18_002 (Article 368 procedures) and c11_ps_cbse_18_004 (basic.',
          misconception: 'Students often think the 42nd Amendment *alone* suspended Fundamental Rights during Emergency.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The 38th, 39th, and 42nd Constitutional Amendments (1975–1976) were a series of',
                  options: ['The 38th, 39th, and 42nd Constitutional Amendments (1975–1976) were a series of', 'The Fourth General Elections of 1967 marked a pivotal electoral turning point where the', 'The Congress Split of 1969 refers to the formal division of the Indian National Congress', 'Indira Gandhi\'s political rise (1966–1971) refers to her transformation from a consensus'],
                  hint: 'Revisit c11_ps_cbse_18_002 (Article 368 procedures) and c11_ps_cbse_18_004 (basic structure.',
                  misconception: 'Students often think the 42nd Amendment *alone* suspended Fundamental Rights during Emergency.' }
          ],
            remediations: { 'the-42nd-amendment-alone-suspended': { steps: ['If the student conflates Article 359 orders with the 38th/39th/42nd Amendments: (1) Re-read c11_ps_cbse_11_012.', '(2) Create a two-column table: Column A = "Article 359 Order (June 1975)" — temporary, FR enforcement suspended,.', '(3) Re-attempt Diagnostic Questions 1 and 3, explicitly naming the legal instrument in each step.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the 42nd Amendment *alone* suspended Fundamental Rights during Emergency.',
          parts: [
                { id: 'a', prompt: 'Evaluate the argument that the 42nd Amendment\'s insertion of "socialist, secular" into the Preamble and addition of Fundamental Duties (Article 51A) were mere.', answer: 'The Preamble changes and Fundamental Duties were symbolic',
                  options: ['The Preamble changes and Fundamental Duties were symbolic', 'the 42nd Amendment *alone* suspended Fundamental Rights during Emergency'],
                  hint: 'Revisit c11_ps_cbse_18_002 (Article 368 procedures) and c11_ps_cbse_18_004 (basic structure.',
                  misconception: 'Students often think the 42nd Amendment *alone* suspended Fundamental Rights during Emergency.' }
          ],
            remediations: { 'the-42nd-amendment-alone-suspended': { steps: ['If the student conflates Article 359 orders with the 38th/39th/42nd Amendments: (1) Re-read c11_ps_cbse_11_012.', '(2) Create a two-column table: Column A = "Article 359 Order (June 1975)" — temporary, FR enforcement suspended,.', '(3) Re-attempt Diagnostic Questions 1 and 3, explicitly naming the legal instrument in each step.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_008', difficulty: 'standard',
          question: 'The 1977 general elections were the sixth Lok Sabha elections held after the.',
          hint: 'If stuck, revisit **c12_ps_cbse_12_006 (Emergency)** and list the top 5 civil liberties.',
          misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.',
          parts: [
                { id: 'a', prompt: 'In which month and year were the sixth Lok Sabha elections held, and which party/alliance won a clear majority?', answer: 'The sixth Lok Sabha elections were held in **March 1977**',
                  options: ['The sixth Lok Sabha elections were held in **March 1977**', 'Congress won', 'ideological conflict', 'unresolved organisational duality'],
                  hint: 'If stuck, revisit **c12_ps_cbse_12_006 (Emergency)** and list the top 5 civil liberties violations.',
                  misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.' },
                { id: 'b', prompt: 'A state government in 1978 dismisses a district collector for refusing to implement a politically motivated transfer order.', answer: 'The High Court **will entertain the petition**',
                  options: ['The High Court **will entertain the petition**', 'ideological conflict', 'unresolved organisational duality'],
                  hint: 'If stuck, revisit **c12_ps_cbse_12_006 (Emergency)** and list the top 5 civil liberties violations.',
                  misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.' },
                { id: 'c', prompt: 'Compare the Janata Party\'s coalition composition (1977) with the United Front (1996) and NDA (1998) coalitions.', answer: '**Similarity:** All three were **anti-incumbent coalitions** stitching together',
                  options: ['**Similarity:** All three were **anti-incumbent coalitions** stitching together', 'ideological conflict', 'unresolved organisational duality'],
                  hint: 'If stuck, revisit **c12_ps_cbse_12_006 (Emergency)** and list the top 5 civil liberties violations.',
                  misconception: 'Students often believe the **Janata Party was a genuine ideological merger** creating a new centrist party.' }
          ],
            remediations: { 'the-janata-party-was-a': { steps: ['Re-read **c12_ps_cbse_12_005 (JP Movement)** to see how disparate groups united *only* against Emergency.', 'Review **c12_ps_cbse_12_006 (Emergency)** for the specific excesses (censorship, sterilisation, MISA) that created the.', 'Create a **two-column table**: "Janata Component Parties" vs.', '"Core Ideology & Loyalty" — this visualises the incompatibility.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_009', difficulty: 'standard',
          question: 'The restoration of the Congress in 1980 refers to the return of Indira Gandhi\'s.',
          hint: 'Review the table of 42nd Amendment changes in c12_ps_cbse_12_007 and the coalition.',
          misconception: 'Students often believe the 44th Amendment was passed by the Congress government after 1980 to "fix" the Constitution.',
          parts: [
                { id: 'a', prompt: 'Explain why the Janata Party government, despite winning a historic mandate in 1977, lost power within two and a half years.', answer: 'The Janata Party collapsed due to: (1) ideological incoherence',
                  options: ['The Janata Party collapsed due to: (1) ideological incoherence', 'Indira Gandhi\'s popularity'],
                  hint: 'Review the table of 42nd Amendment changes in c12_ps_cbse_12_007 and the coalition partners.',
                  misconception: 'Students often believe the 44th Amendment was passed by the Congress government after 1980 to "fix" the Constitution.' }
          ],
            remediations: { 'the-44th-amendment-was-passed': { steps: ['If the student conflates the 42nd and 44th Amendments, have them create a two‑column table: Column A = 42nd Amendment.', 'Use the NCERT text boxes on Articles 352, 356, 19, 22, 31, 300A.', 'Then re‑attempt Diagnostic Questions 3 and 4.', 'If the student cannot explain Janata\'s collapse, revisit c12_ps_cbse_12_008 (Janata formation) and list the coalition.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_12_010', difficulty: 'standard',
          question: 'The legacy of the Emergency (1975–77) refers to the enduring constitutional.',
          hint: 'If the student cannot articulate why the 44th Amendment alone is insufficient to capture.',
          misconception: 'Students often believe the Emergency\'s legacy is exhausted by the 44th Amendment\'s procedural tweaks — "Article 352 now.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The legacy of the Emergency (1975–77) refers to the enduring constitutional,',
                  options: ['The legacy of the Emergency (1975–77) refers to the enduring constitutional,', 'The Fourth General Elections of 1967 marked a pivotal electoral turning point where the', 'The Congress Split of 1969 refers to the formal division of the Indian National Congress', 'Indira Gandhi\'s political rise (1966–1971) refers to her transformation from a consensus'],
                  hint: 'If the student cannot articulate why the 44th Amendment alone is insufficient to capture the.',
                  misconception: 'Students often believe the Emergency\'s legacy is exhausted by the 44th Amendment\'s procedural tweaks — "Article 352 now needs special.' }
          ],
            remediations: { 'the-emergency-s-legacy-is': { steps: ['If the student conflates "legacy" with "44th Amendment only": Step 1 — Re-read c12_ps_cbse_12_009 focusing on the 44th.', 'Step 2 — Revisit c11_ps_cbse_18_004 (basic structure) and c11_ps_cbse_15_008 (PIL) and trace the timeline: Kesavananda.', 'Step 3 — Map each Emergency excess (censorship, detention, amendment misuse, party suppression) to its distinct.', 'Step 4 — Re-attempt Diagnostic Questions 2, 4, and 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
