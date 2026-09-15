import type { SimDef } from '../../engine/types';

/** v3 generated — c12_ps_ch15_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_ps_ch15_p2: SimDef = {
    id: 'v3_c12_ps_ch15_p2',
    title: 'Recent Developments in Indian Politics · Part 2/2',
    subtitle: 'When the largest party chose the opposition benches',
    classLevel: 12, subject: 'political_science', topic: 'Recent Developments in Indian Politics · Part 2/2',
    chapters: ['c12_ps_ch15'],
    nodeIds: ['c12_ps_cbse_15_007', 'c12_ps_cbse_15_008', 'c12_ps_cbse_15_009', 'c12_ps_cbse_15_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Coalition politics analyst', intro: 'One election flipped the logic of Indian power: from one party absorbing everyone, to everyone assembling against one party.', goal: 'Explain the 1989 turning point and the structural features of India\'s coalition era.' },
    discovery: {
        question: 'In 1989, Congress stayed the single largest party with 197 seats — and voluntarily sat in the opposition benches while its enemies\' enemies teamed up to rule. Why hand over power?',
        options: ['It couldn\'t reach a majority and had no willing allies — so a National Front minority government ran the country on outside support from the BJP and the Left simultaneously', 'The President refused to invite Congress', 'Congress had legally lost the right to form government', 'It planned to merge with the Janata Dal'],
        answer: 'It couldn\'t reach a majority and had no willing allies — so a National Front minority government ran the country on outside support from the BJP and the Left simultaneously',
        hook: 'The \'Congress system\' didn\'t end because Congress vanished — it remained the largest party for years. What ended was its monopoly on aggregating interests: regional and ideological parties became power centres, making coalitions the new normal.',
    },
    teaching: [
        { title: 'Federalism and the Growing Role of Regional Parties', text: 'Federalism in India refers to the constitutional division of powers between the Union and States (Articles 245-255, Seventh Schedule), while the growing role of regional parties denotes the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_ps_cbse_15_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Reconstruct the 1989 verdict and its strange bedfellows — a right-wing and a left-wing bloc propping up the same government — and test whether coalition politics weakened or deepened Indian democracy.',
        labels: ['Federalism and the Growing', 'Era of Coalitions', 'India in the New', 'Consolidation of Democracy'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_007', title: 'Federalism and the Growing Role of Regional Parties',
          caseStudy: { intro: 'Imagine you are watching a news debate where a Chief Minister from a regional party (e.g., DMK in Tamil Nadu or TMC in West Bengal) threatens to withdraw.',
            decisions: [{ prompt: '[REMEMBER] In which year did the era of coalition governments at the Centre begin, making regional parties critical for national government.', options: [
                { text: '1989', outcome: '1989. The National Front government formed after the 1989 Lok Sabha election was the first.' },
                { text: 'regional parties = state parties that only contest in one state', outcome: 'Not quite — Students often think "regional parties = state parties that only contest in one state." **Wrong.**.', reveals: 'regional-parties-state-parties-that' },
                { text: '"regional parties = state parties that only contest in one state', outcome: 'Not quite — Students often think "regional parties = state parties that only contest in one state." **Wrong.**.', reveals: 'regional-parties-state-parties-that' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_008', title: 'Era of Coalitions and the Decline of Single-Party Rule',
          caseStudy: { intro: 'Imagine you are watching the 1989 election results on TV: Congress drops from 415 seats to 197, but no other party crosses 200.',
            decisions: [{ prompt: 'In which year did the Congress party lose its single-party majority in the Lok Sabha for the first time since 1977, marking the beginning.', options: [
                { text: '1989', outcome: '1989. A wrong answer (e.g., 1996 or 2014) reveals the student confuses the *start* of the coalition.' },
                { text: 'coalition government', outcome: 'Not quite — Students think "coalition government" means *all* partners share the *same ideology* and that the.', reveals: 'coalition-government-means-all-partners' },
                { text: 'single-party majority', outcome: 'Not quite — Students think "coalition government" means *all* partners share the *same ideology* and that the.', reveals: 'coalition-government-means-all-partners' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_009', title: 'India in the New Global Order after the Cold War',
          caseStudy: { intro: 'Imagine you\'re reading a news headline: "India chairs G20, joins Quad naval exercises, buys Russian oil despite Western pressure, and pushes for UNSC reform.',
            decisions: [{ prompt: 'In which year did the Soviet Union dissolve, marking the end of the Cold War and forcing India to recalibrate its foreign policy?', options: [
                { text: '1991', outcome: '1991. A wrong answer (e.g., 1989 or 1992) reveals the student cannot anchor the timeline of India\'s.' },
                { text: 'India completely abandoned non-alignment after the Cold War', outcome: 'Not quite — Students often think India completely abandoned non-alignment after the Cold War.', reveals: 'india-completely-abandoned-non-alignment' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_010', title: 'Consolidation of Democracy and Challenges in the 21st Century',
          caseStudy: { intro: 'Imagine you are reading a news analysis of the 2019 election where the BJP won a second consecutive majority — the first time since 1984 — and the commentator.',
            decisions: [{ prompt: 'List the four elements of the political consensus that emerged among most Indian parties after 1989, as identified in the NCERT textbook.', options: [
                { text: 'The four elements are: (1) agreement on new economic policies, (2) acceptance of the', outcome: 'The four elements are: (1) agreement on new economic policies, (2) acceptance of the political and.' },
                { text: 'consensus on secularism', outcome: 'Not quite — Students often think "consensus" means all parties agree on everything and ideology no longer.', reveals: 'consensus-means-all-parties-agree' },
                { text: 'consensus', outcome: 'Not quite — Students often think "consensus" means all parties agree on everything and ideology no longer.', reveals: 'consensus-means-all-parties-agree' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'In a politics seminar, a student says \'Hindutva is just another word for the Hindu religion — BJP\'s ideology is basically faith.\'',
            decisions: [{ prompt: 'What does the distinction between Hindutva and Hinduism say?', options: [
                { text: 'They\'re different kinds of thing — Hinduism is a diverse religious tradition; Savarkar\'s Hindutva is a political doctrine defining nationhood by whether India is both fatherland and holy land to you — collapsing them hides the exclusivist nationalist claim inside a familiar word.', outcome: 'The chapter\'s precision: one is a faith with many practices, the other a test of national belonging — the slide between them is the politics, not a synonym.' },
                { text: 'He\'s right — Hindutva is simply Hindu religious identity expressed politically.', outcome: 'Savarkar\'s definition is a criterion of nationhood, not worship — \'holy land\' filters who counts as fully Indian; a religion describes practices, an ideology adjudicates belonging.', reveals: 'ideology-equals-religion' },
                { text: 'The difference is only about violence — Hindutva is just Hinduism made militant.', outcome: 'The distinction is definitional, not behavioural — Hindutva is cultural nationalism with a belonging test even in its mildest form; reducing it to militancy misses the exclusion the concept itself encodes.', reveals: 'difference-is-only-militancy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_ps_cbse_15_010', title: 'You made it',
          caseStudy: { intro: 'You can now explain why 1989, not 1977 or 2014, marks the true end of one-party dominance — power-sharing replaced dominance for the next quarter-century.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_007', difficulty: 'standard',
          question: 'Federalism in India refers to the constitutional division of powers between the.',
          hint: 'Revisit c11_ps_cbse_16_005 (quasi-federal features) and c12_ps_cbse_15_006 (coalition.',
          misconception: 'Students often think "regional parties = state parties that only contest in one state." **Wrong.** Many \'regional\'.',
          parts: [
                { id: 'a', prompt: '[REMEMBER] In which year did the era of coalition governments at the Centre begin, making regional parties critical for national government formation?', answer: '1989',
                  options: ['1989', 'regional parties = state parties that only contest in one state', '"regional parties = state parties that only contest in one state'],
                  hint: 'Revisit c11_ps_cbse_16_005 (quasi-federal features) and c12_ps_cbse_15_006 (coalition government.',
                  misconception: 'Students often think "regional parties = state parties that only contest in one state." **Wrong.** Many \'regional\' parties (e.g., BJD.' },
                { id: 'b', prompt: '[APPLY] The Union government proposes a new education policy that shifts a subject from the State List to the Concurrent List.', answer: 'The Union government will likely negotiate, dilute, or drop the proposal',
                  options: ['The Union government will likely negotiate, dilute, or drop the proposal', 'the Centre can amend the Constitution', 'regional parties = state parties that only contest in one state', '"regional parties = state parties that only contest in one state'],
                  hint: 'Revisit c11_ps_cbse_16_005 (quasi-federal features) and c12_ps_cbse_15_006 (coalition government.',
                  misconception: 'Students often think "regional parties = state parties that only contest in one state." **Wrong.** Many \'regional\' parties (e.g., BJD.' }
          ],
            remediations: { 'regional-parties-state-parties-that': { steps: ['If the student holds this misconception: 1) Open the ECI website (eci.gov.in) and show the list of \'National Parties\'.', '2) Re-read NCERT p.152-153: "State level parties are sharing power at the national level...', 'is fast becoming less important." 3) Re-do Diagnostic Q2, explicitly linking ECI registration status to actual.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_008', difficulty: 'standard',
          question: 'The Era of Coalitions (1989–2014) refers to the phase in Indian politics when.',
          hint: 'Revisit c12_ps_cbse_15_001 (End of Congress System) and c11_ps_cbse_12_004 (FPTP.',
          misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority.',
          parts: [
                { id: 'a', prompt: 'In which year did the Congress party lose its single-party majority in the Lok Sabha for the first time since 1977, marking the beginning of the coalition era?', answer: '1989',
                  options: ['1989', 'coalition government', 'single-party majority', 'end of multi-party system'],
                  hint: 'Revisit c12_ps_cbse_15_001 (End of Congress System) and c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority *permanently* ended.' },
                { id: 'b', prompt: 'Why did the BJP and the Left Front — ideologically opposed parties — both support the V.P. Singh-led National Front government from outside in 1989?', answer: 'Both wanted to keep the Congress out of power',
                  options: ['Both wanted to keep the Congress out of power', 'they agreed on Mandal', 'they shared a common programme', 'coalition government'],
                  hint: 'Revisit c12_ps_cbse_15_001 (End of Congress System) and c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority *permanently* ended.' },
                { id: 'c', prompt: 'Apply the concept of "pragmatic considerations over ideological positions" to explain why the Telugu Desam Party (TDP) and the DMK — regional parties with.', answer: 'They joined for power-sharing arrangements: ministerial berths, state-specific',
                  options: ['They joined for power-sharing arrangements: ministerial berths, state-specific', 'they became Hindutva supporters', 'coalition government', 'single-party majority'],
                  hint: 'Revisit c12_ps_cbse_15_001 (End of Congress System) and c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority *permanently* ended.' },
                { id: 'd', prompt: 'Compare the 1996 United Front and the 1999 NDA governments on three dimensions: (a) external support vs.', answer: 'external support vs',
                  options: ['external support vs', 'coalitions', 'coalition government', 'single-party majority'],
                  hint: 'Revisit c12_ps_cbse_15_001 (End of Congress System) and c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority *permanently* ended.' }
          ],
            remediations: { 'coalition-government-means-all-partners': { steps: ['If the student holds the above misconception: Step 1 — Re-read NCERT pp.', '152–153 ("Growing consensus", fourth element) and the 17th Lok Sabha pie chart (p.', 'Step 2 — List 5 NDA 1999 allies and their *actual* ideological stance (e.g., DMK: Dravidian, anti-Hindutva; SAD: Sikh.', 'Step 3 — Answer: "Why did Vajpayee drop Article 370, UCC, Ram Temple from NDA agenda?" Step 4 — Re-attempt Diagnostic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority.',
          parts: [
                { id: 'a', prompt: 'Evaluate the claim: "The 2014 and 2019 BJP majorities ended the era of coalition politics in India." Use evidence from the NCERT text and the 17th Lok Sabha.', answer: 'The claim is *partially false*',
                  options: ['The claim is *partially false*', 'yes, coalitions are over', 'single-party majority', 'end of multi-party system'],
                  hint: 'Revisit c12_ps_cbse_15_001 (End of Congress System) and c11_ps_cbse_12_004 (FPTP mechanics).',
                  misconception: 'Students think "coalition government" means *all* partners share the *same ideology* and that the 2014 BJP majority *permanently* ended.' }
          ],
            remediations: { 'coalition-government-means-all-partners': { steps: ['If the student holds the above misconception: Step 1 — Re-read NCERT pp.', '152–153 ("Growing consensus", fourth element) and the 17th Lok Sabha pie chart (p.', 'Step 2 — List 5 NDA 1999 allies and their *actual* ideological stance (e.g., DMK: Dravidian, anti-Hindutva; SAD: Sikh.', 'Step 3 — Answer: "Why did Vajpayee drop Article 370, UCC, Ram Temple from NDA agenda?" Step 4 — Re-attempt Diagnostic.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_009', difficulty: 'standard',
          question: 'India in the New Global Order after the Cold War refers to the fundamental.',
          hint: 'If stuck, revisit Class 11 Political Science Chapter 7 (Nationalism) and Chapter 9.',
          misconception: 'Students often think India completely abandoned non-alignment after the Cold War.',
          parts: [
                { id: 'a', prompt: 'In which year did the Soviet Union dissolve, marking the end of the Cold War and forcing India to recalibrate its foreign policy?', answer: '1991',
                  options: ['1991', 'India completely abandoned non-alignment after the Cold War'],
                  hint: 'If stuck, revisit Class 11 Political Science Chapter 7 (Nationalism) and Chapter 9 (Peace) for the.',
                  misconception: 'Students often think India completely abandoned non-alignment after the Cold War.' },
                { id: 'b', prompt: 'Compare India\'s engagement with Russia and the US in the post-Cold War era. How does India balance these relationships?', answer: 'India maintains a strong defense and energy partnership with Russia (e.g., S-400',
                  options: ['India maintains a strong defense and energy partnership with Russia (e.g., S-400', 'sees India as tilting wholly to one side fails to grasp the balancing act', 'India completely abandoned non-alignment after the Cold War'],
                  hint: 'If stuck, revisit Class 11 Political Science Chapter 7 (Nationalism) and Chapter 9 (Peace) for the.',
                  misconception: 'Students often think India completely abandoned non-alignment after the Cold War.' }
          ],
            remediations: { 'india-completely-abandoned-non-alignment': { steps: ['If a student holds the misconception, have them: 1.', 'Read the 1991 Congress election manifesto and the Rao government\'s first budget speech to see the domestic crisis.', 'Compare Nehru\'s 1947 non-alignment speech with Jaishankar\'s 2020s speeches on strategic autonomy.', 'Create a timeline: 1991 (liberalization), 1998 (nuclear tests), 2005 (civil nuclear deal), 2014 (Act East), 2020 (Quad.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_ps_cbse_15_010', difficulty: 'standard',
          question: 'Consolidation of democracy in 21st century India refers to the process by which.',
          hint: 'Review the timeline in node c12_ps_cbse_15_008 (Central Governments since 1989 table) and.',
          misconception: 'Students often think "consensus" means all parties agree on everything and ideology no longer matters.',
          parts: [
                { id: 'a', prompt: 'Why did coalition politics become the norm at the Centre after 1989, whereas the Congress had dominated as a single party for decades before?', answer: 'Coalition politics became the norm',
                  options: ['Coalition politics became the norm', 'weak leadership', 'corruption', 'consensus'],
                  hint: 'Review the timeline in node c12_ps_cbse_15_008 (Central Governments since 1989 table) and the.',
                  misconception: 'Students often think "consensus" means all parties agree on everything and ideology no longer matters.' }
          ],
            remediations: { 'consensus-means-all-parties-agree': { steps: ['Re-read the "Emergence of a new consensus" section in the NCERT chapter (pages 152–153) and list the four elements.', 'Create a 2x2 matrix: rows = four consensus elements; columns = "Evidence of agreement" and "Evidence of ongoing.', 'Write one paragraph explaining why "consensus on rules" ≠ "consensus on goals." 4.', 'Re-attempt Diagnostic Questions 2 and 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
