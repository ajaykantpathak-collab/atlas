import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch18_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch18_p2: SimDef = {
    id: 'v3_c11_ps_ch18_p2',
    title: 'Constitution as a Living Document · Part 2/2',
    subtitle: 'Learn how a document can be living without being liquid.',
    classLevel: 11, subject: 'political_science', topic: 'Constitution as a Living Document · Part 2/2',
    chapters: ['c11_ps_ch18'],
    nodeIds: ['c11_ps_cbse_18_007', 'c11_ps_cbse_18_008', 'c11_ps_cbse_18_009', 'c11_ps_cbse_18_010', 'c11_ps_cbse_18_011'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a constitutional historian counting amendments honestly', intro: 'A constitution amended over a hundred times that still reads like itself — the changes are the maintenance, not the malfunction.', goal: 'Evaluate amendment frequency versus stability and the layers of amendment procedure.' },
    discovery: {
        question: '105+ amendments in 74 years — proof the Indian Constitution was defective from the start?',
        options: ['No — most changes were technical or simple-majority; the core held, and the Court struck the few amendments that attacked it', 'Yes — good constitutions never need amending', 'Yes — each amendment shows a design failure', 'No — because all 105 were ceremonial'],
        answer: 'No — most changes were technical or simple-majority; the core held, and the Court struck the few amendments that attacked it',
        hook: '\'Living document\' doesn\'t mean infinitely malleable — the 42nd Amendment learned that when its key provisions were struck down; the document grows within a core.',
    },
    teaching: [
        { title: 'Major amendments: 42nd and 44th Amendments and their significance', text: 'The 42nd Amendment Act, 1976 (Mini-Constitution) extensively amended the Constitution to strengthen the Centre, curb judicial review, extend Directive Principles\' primacy over Fundamental Rights, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_18_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Sort which changes need Article 368\'s special majority (and which don\'t), then judge whether state ratification makes the system undemocratically rigid.',
        labels: ['Major amendments: 42nd', 'Role of judiciary', 'Public participation and constitutional', 'Constitution and social change', 'Constitution as an instrument'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_007', title: 'Major amendments: 42nd and 44th Amendments and their significance',
          caseStudy: { intro: 'Imagine a student reading a news article about the 1975 Emergency and wondering how the Constitution allowed such sweeping changes.',
            decisions: [{ prompt: 'Which year was the 42nd Amendment Act passed, and what is it popularly known as?', options: [
                { text: 'The 42nd Amendment Act was passed in 1976 and is popularly known as the', outcome: 'The 42nd Amendment Act was passed in 1976 and is popularly known as the "Mini-Constitution".' },
                { text: 'Mini-Constitution', outcome: 'Not quite — Students often think the 44th Amendment completely undid the 42nd Amendment.', reveals: 'the-44th-amendment-completely-undid' },
                { text: 'the 44th Amendment completely undid the 42nd Amendment', outcome: 'Not quite — Students often think the 44th Amendment completely undid the 42nd Amendment.', reveals: 'the-44th-amendment-completely-undid' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_008', title: 'Role of judiciary in interpreting and evolving the constitution',
          caseStudy: { intro: 'Imagine you see a news headline: "Supreme Court strikes down law allowing indefinite internet shutdowns in conflict zones." You wonder: how can unelected.',
            decisions: [{ prompt: 'What are the specific constitutional articles that confer interpretive and review authority on the Supreme Court of India?', options: [
                { text: 'The Supreme Court\'s interpretive and review authority derives from Article 32 (right to', outcome: 'The Supreme Court\'s interpretive and review authority derives from Article 32 (right.' },
                { text: 'judicial review', outcome: 'Not quite — Students believe "judicial interpretation = judicial activism = judges making laws." They conflate.', reveals: 'judicial-interpretation-judicial-activism-judges' },
                { text: 'Article 32', outcome: 'Not quite — Students believe "judicial interpretation = judicial activism = judges making laws." They conflate.', reveals: 'judicial-interpretation-judicial-activism-judges' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_009', title: 'Public participation and constitutional consciousness',
          caseStudy: { intro: 'Imagine you see a news report about a group of citizens filing a Public Interest Litigation (PIL) against air pollution in Delhi, citing Article 21 (Right.',
            decisions: [{ prompt: 'What is the constitutional basis for universal adult franchise in India, and which article guarantees it?', options: [
                { text: 'Universal adult franchise is guaranteed by Article 326 of the Constitution', outcome: 'Universal adult franchise is guaranteed by Article 326 of the Constitution, which states that.' },
                { text: 'public participation', outcome: 'Not quite — Students often think "public participation" means only voting in elections, and "constitutional.', reveals: 'public-participation-means-only-voting' },
                { text: 'constitutional consciousness', outcome: 'Not quite — Students often think "public participation" means only voting in elections, and "constitutional.', reveals: 'public-participation-means-only-voting' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_010', title: 'Constitution and social change: Expanding rights and inclusion',
          caseStudy: { intro: 'Imagine reading a 2024 newspaper headline: "Supreme Court recognizes right to digital access as part of Article 21" or "Parliament passes 106th Amendment for.',
            decisions: [{ prompt: 'Which constitutional provision is most frequently invoked by the Supreme Court to recognize new fundamental rights not explicitly listed.', options: [
                { text: 'Article 21 ("Protection of life and personal liberty") is the primary gateway', outcome: 'Article 21 ("Protection of life and personal liberty") is the primary gateway; the Court has read.' },
                { text: 'life and personal liberty', outcome: 'Not quite — Students often believe "expanding rights" means only adding new Fundamental Rights via amendment.', reveals: 'expanding-rights-means-only-adding' },
                { text: 'expanding rights', outcome: 'Not quite — Students often believe "expanding rights" means only adding new Fundamental Rights via amendment.', reveals: 'expanding-rights-means-only-adding' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_011', title: 'Constitution as an instrument of social transformation in India',
          caseStudy: { intro: 'Imagine a Class 11 student reading a news report about a Dalit woman becoming a Sarpanch in a reserved panchayat seat after the 73rd Amendment.',
            decisions: [{ prompt: 'Which article of the Indian Constitution explicitly abolishes untouchability and forbids its practice in any form?', options: [
                { text: 'Article 17', outcome: 'Article 17. A wrong answer (e.g., Article 15 or 16) reveals confusion between the general.' },
                { text: 'mere guidelines', outcome: 'Not quite — Students often think the Constitution\'s transformative role is limited to Fundamental Rights (Part.', reveals: 'the-constitution-s-transformative-role' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Writing a constitution-day editorial, a student claims: \'A living constitution means Parliament can rewrite anything by amendment — the 42nd Amendment was just evolution. And every constitutional change needs the special Article 368 majority.\'',
            decisions: [{ prompt: 'What limits and procedures actually govern amendment?', options: [
                { text: 'Draw both lines: \'living\' means evolving interpretation WITHIN an inviolable core — the basic structure doctrine (Kesavananda Bharati) let the Court strike parts of the 42nd Amendment in Minerva Mills for damaging judicial review and amending power itself. And not all changes need Article 368: creating a state (Art. 3) or a legislative council (Art. 169) proceeds by simple majority, expressly outside 368.', outcome: 'The editorial sharpens: adaptability ≠ malleability — the document bends inside its identity, and the amendment menu is three-tiered, not one.' },
                { text: 'Keep \'anything can change\' — a living document has no fixed core.', outcome: 'The basic structure doctrine exists precisely to bound evolution: Parliament\'s power to amend doesn\'t include the power to destroy the Constitution\'s identity.', reveals: 'living-means-unlimited' },
                { text: 'Insist all amendments need special majority — Article 368 governs constitutional change.', outcome: 'Several articles (4(2), 169, 239A…) expressly declare their changes NOT to be Article 368 amendments — simple majority suffices for those.', reveals: 'all-changes-need-368' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_18_011', title: 'You made it',
          caseStudy: { intro: 'Adaptability is the feature — a constitution that couldn\'t bend would have broken; the ones that survive are the ones allowed to grow.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_007', difficulty: 'standard',
          question: 'The 42nd Amendment Act, 1976 (Mini-Constitution) extensively amended the.',
          hint: 'If stuck, review the amendment types in c11_ps_cbse_18_003 and the basic structure.',
          misconception: 'Students often think the 44th Amendment completely undid the 42nd Amendment.',
          parts: [
                { id: 'a', prompt: 'Which year was the 42nd Amendment Act passed, and what is it popularly known as?', answer: 'The 42nd Amendment Act was passed in 1976 and is popularly known as the',
                  options: ['The 42nd Amendment Act was passed in 1976 and is popularly known as the', 'Mini-Constitution', 'the 44th Amendment completely undid the 42nd Amendment'],
                  hint: 'If stuck, review the amendment types in c11_ps_cbse_18_003 and the basic structure doctrine.',
                  misconception: 'Students often think the 44th Amendment completely undid the 42nd Amendment.' }
          ],
            remediations: { 'the-44th-amendment-completely-undid': { steps: ['If a student holds this misconception, have them create a two-column table listing 10 major changes of the 42nd.', 'Use the Constitution text (Articles 31C, 368, Preamble) to verify.', 'Then discuss why some changes were kept (political consensus, judicial doctrine).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_008', difficulty: 'standard',
          question: 'The judiciary\'s role in interpreting and evolving the Constitution refers.',
          hint: 'Review Article 13 (laws inconsistent with fundamental rights void), Article 32 (Supreme.',
          misconception: 'Students believe "judicial interpretation = judicial activism = judges making laws." They conflate three distinct.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The judiciary\'s role in interpreting and evolving the Constitution refers to the power of',
                  options: ['The judiciary\'s role in interpreting and evolving the Constitution refers to the power of', 'A "living constitution" is a constitutional theory holding that the Constitution\'s', 'Article 368 of the Indian Constitution prescribes the procedure for amending the', 'The Indian Constitution under Article 368 provides three distinct amendment pathways: (1)'],
                  hint: 'Review Article 13 (laws inconsistent with fundamental rights void), Article 32 (Supreme Court.',
                  misconception: 'Students believe "judicial interpretation = judicial activism = judges making laws." They conflate three distinct concepts: (1).' }
          ],
            remediations: { 'judicial-interpretation-judicial-activism-judges': { steps: ['Provide three recent Supreme Court headlines - (a) "SC strikes down Section 66A IT Act as vague/overbroad".', 'Ask student to classify each and cite the constitutional basis (Article 13/32 vs Article 142).', 'Have them read Article 142 ("such order as is necessary for doing complete justice") as the textual source of activism.', 'Practice identifying the distinction in 5 judgments from Indian Kanoon or SCC Online.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "judicial interpretation = judicial activism = judges making laws." They conflate three distinct.',
          parts: [
                { id: 'a', prompt: 'Critically evaluate the claim: "Judicial interpretation makes the Constitution a \'living document\' but unelected judges effectively amend the Constitution.', answer: 'The counter-majoritarian difficulty is real but managed through institutional',
                  options: ['The counter-majoritarian difficulty is real but managed through institutional', 'undemocratic', 'perfect', 'judicial interpretation = judicial activism = judges making laws'],
                  hint: 'Review Article 13 (laws inconsistent with fundamental rights void), Article 32 (Supreme Court.',
                  misconception: 'Students believe "judicial interpretation = judicial activism = judges making laws." They conflate three distinct concepts: (1).' }
          ],
            remediations: { 'judicial-interpretation-judicial-activism-judges': { steps: ['Provide three recent Supreme Court headlines - (a) "SC strikes down Section 66A IT Act as vague/overbroad".', 'Ask student to classify each and cite the constitutional basis (Article 13/32 vs Article 142).', 'Have them read Article 142 ("such order as is necessary for doing complete justice") as the textual source of activism.', 'Practice identifying the distinction in 5 judgments from Indian Kanoon or SCC Online.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_009', difficulty: 'standard',
          question: 'Public participation and constitutional consciousness refers to the active.',
          hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_004) for local government structure, and.',
          misconception: 'Students often think "public participation" means only voting in elections, and "constitutional consciousness" means.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional basis for universal adult franchise in India, and which article guarantees it?', answer: 'Universal adult franchise is guaranteed by Article 326 of the Constitution',
                  options: ['Universal adult franchise is guaranteed by Article 326 of the Constitution', 'public participation', 'constitutional consciousness'],
                  hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_004) for local government structure, and Class 9.',
                  misconception: 'Students often think "public participation" means only voting in elections, and "constitutional consciousness" means memorizing the.' },
                { id: 'b', prompt: 'Explain why the Constituent Assembly debates are considered essential for understanding constitutional consciousness today, even though the Constitution was.', answer: 'The Constituent Assembly debates reveal the "reasons behind the provisions"',
                  options: ['The Constituent Assembly debates reveal the "reasons behind the provisions"', 'historical curiosity', 'public participation', 'constitutional consciousness'],
                  hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_004) for local government structure, and Class 9.',
                  misconception: 'Students often think "public participation" means only voting in elections, and "constitutional consciousness" means memorizing the.' },
                { id: 'c', prompt: 'Compare the role of elections (Article 326) and Public Interest Litigation (judicial innovation under Article 32) as mechanisms of public participation.', answer: 'Elections are periodic, collective, and representative',
                  options: ['Elections are periodic, collective, and representative', 'participation tools', 'public participation', 'constitutional consciousness'],
                  hint: 'Revisit Class 10 Federalism (c10_civ_cbse_02_004) for local government structure, and Class 9.',
                  misconception: 'Students often think "public participation" means only voting in elections, and "constitutional consciousness" means memorizing the.' }
          ],
            remediations: { 'public-participation-means-only-voting': { steps: ['If a student equates participation with only voting: (1) Show a 2-minute video of a Gram Sabha meeting (YouTube: "Gram.', '(2) Give a case study: "A slum demolition without notice" — have them list all constitutional tools residents have.', '(3) Assign: "Track one local issue for a week and note every constitutional provision relevant to it."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_010', difficulty: 'standard',
          question: 'Constitution and social change refers to the dynamic process by which the.',
          hint: 'Review node c11_ps_cbse_18_001 (living document) and NCERT Class 11 Chapter 10 pages.',
          misconception: 'Students often believe "expanding rights" means only adding new Fundamental Rights via amendment.',
          parts: [
                { id: 'a', prompt: 'Which constitutional provision is most frequently invoked by the Supreme Court to recognize new fundamental rights not explicitly listed in Part III?', answer: 'Article 21 ("Protection of life and personal liberty") is the primary gateway',
                  options: ['Article 21 ("Protection of life and personal liberty") is the primary gateway', 'life and personal liberty', 'expanding rights', 'inclusion'],
                  hint: 'Review node c11_ps_cbse_18_001 (living document) and NCERT Class 11 Chapter 10 pages 226–228.',
                  misconception: 'Students often believe "expanding rights" means only adding new Fundamental Rights via amendment.' },
                { id: 'b', prompt: 'Explain why the 93rd Constitutional Amendment (2005) inserting Article 15(5) was necessary even though Article 15(4) already allowed reservations for socially.', answer: 'Article 15(4) applied only to state-aided institutions',
                  options: ['Article 15(4) applied only to state-aided institutions', 'it created OBC reservations', 'expanding rights', 'inclusion'],
                  hint: 'Review node c11_ps_cbse_18_001 (living document) and NCERT Class 11 Chapter 10 pages 226–228.',
                  misconception: 'Students often believe "expanding rights" means only adding new Fundamental Rights via amendment.' },
                { id: 'c', prompt: 'Compare the constitutional basis for minority cultural rights (Articles 29–30) with the basis for SC/ST political reservations (Articles 330, 332).', answer: 'Articles 29–30 protect *group* autonomy (language, script, culture, educational',
                  options: ['Articles 29–30 protect *group* autonomy (language, script, culture, educational', 'reservations', 'expanding rights', 'inclusion'],
                  hint: 'Review node c11_ps_cbse_18_001 (living document) and NCERT Class 11 Chapter 10 pages 226–228.',
                  misconception: 'Students often believe "expanding rights" means only adding new Fundamental Rights via amendment.' }
          ],
            remediations: { 'expanding-rights-means-only-adding': { steps: ['Re-read NCERT Chapter 10 (Philosophy) sections on "Social Justice" and "Respect for diversity" to internalize that the.', 'Create a two-column table: Column A = "Constitutional Enabling Provision" (e.g., Art. 15(4), Art. 17, Art. 29(1), Art.', 'For each row, identify whether the expansion came via amendment, court judgment, or ordinary law.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_18_011', difficulty: 'standard',
          question: 'The Indian Constitution functions as an instrument of social transformation.',
          hint: 'Review Articles 15(4) and 16(4) and the Indra Sawhney case (1992) on reservations.',
          misconception: 'Students often think the Constitution\'s transformative role is limited to Fundamental Rights (Part III) and dismiss.',
          parts: [
                { id: 'a', prompt: 'Which article of the Indian Constitution explicitly abolishes untouchability and forbids its practice in any form?', answer: 'Article 17',
                  options: ['Article 17', 'mere guidelines'],
                  hint: 'Review Articles 15(4) and 16(4) and the Indra Sawhney case (1992) on reservations, focusing on the.',
                  misconception: 'Students often think the Constitution\'s transformative role is limited to Fundamental Rights (Part III) and dismiss Directive Principles.' },
                { id: 'b', prompt: 'Compare the transformative potential of Article 17 (abolition of untouchability) and Article 23 (prohibition of forced labour).', answer: 'Article 17 targets the caste system\'s ritualistic hierarchy',
                  options: ['Article 17 targets the caste system\'s ritualistic hierarchy', 'prohibitions', 'mere guidelines'],
                  hint: 'Review Articles 15(4) and 16(4) and the Indra Sawhney case (1992) on reservations, focusing on the.',
                  misconception: 'Students often think the Constitution\'s transformative role is limited to Fundamental Rights (Part III) and dismiss Directive Principles.' }
          ],
            remediations: { 'the-constitution-s-transformative-role': { steps: ['Re-read Articles 14, 15, 16, 17, 38, 39, 46 side-by-side.', 'Watch a 10-minute summary of the Indra Sawhney (1992) judgment on YouTube to understand the 50% cap, creamy layer, and.', 'Write a one-page note distinguishing formal equality (Article 14) from substantive equality (Articles 15(4), 16(4)).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
