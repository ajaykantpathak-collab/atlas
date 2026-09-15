import type { SimDef } from '../../engine/types';

/** v3 generated — c11_ps_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_ps_ch05_p1: SimDef = {
    id: 'v3_c11_ps_ch05_p1',
    title: 'Rights · Part 1/2',
    subtitle: 'Discover why your rights predate the documents that list them.',
    classLevel: 11, subject: 'political_science', topic: 'Rights · Part 1/2',
    chapters: ['c11_ps_ch05'],
    nodeIds: ['c11_ps_cbse_05_001', 'c11_ps_cbse_05_002', 'c11_ps_cbse_05_003', 'c11_ps_cbse_05_004', 'c11_ps_cbse_05_005', 'c11_ps_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a claimant arguing for a right that isn\'t written yet', intro: 'Majorities have demanded things that were never rights — the test isn\'t popularity, it\'s necessity for a dignified life.', goal: 'Define rights as recognised claims and weigh moral against legal rights.' },
    discovery: {
        question: 'Rights are gifts the government hands down to citizens — agree?',
        options: ['No — rights are claims society recognises as necessary for a life of dignity; the state enforces them, it doesn\'t bestow them', 'Yes — no law, no right', 'Yes — constitutions create rights from nothing', 'No — rights are natural like weather, needing no recognition'],
        answer: 'No — rights are claims society recognises as necessary for a life of dignity; the state enforces them, it doesn\'t bestow them',
        hook: 'The right to privacy was morally real before Puttaswamy made it legally explicit — moral rights lead; legal rights follow and enforce.',
    },
    teaching: [
        { title: 'What are rights: Claims recognised by society and enforced by the state', text: 'A right is a justified claim or entitlement that is recognised by society as necessary for a life of dignity and self-respect, and which is enforced by the state through legal and constitutional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_ps_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Filter \'right to bunk class\' and \'right to clean water\' through the dignity test, then weigh whether legal rights are superior merely because courts enforce them.',
        labels: ['What are rights: Claims', 'Moral rights vs legal', 'Negative rights vs positive', 'Natural rights theory: Locke', 'Human rights: Universal Declaration', 'Civil rights and political'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_001', title: 'What are rights: Claims recognised by society and enforced by the state',
          caseStudy: { intro: 'Imagine a student demanding the "right" to use a mobile phone during class because they feel it helps them concentrate.',
            decisions: [{ prompt: 'Define a right in one sentence using the two key criteria from the NCERT textbook: social recognition and state enforcement.', options: [
                { text: 'A right is a claim recognised by society as necessary for a dignified life and enforced', outcome: 'A right is a claim recognised by society as necessary for a dignified life and enforced by the.' },
                { text: 'what the law gives', outcome: 'Not quite — Students often think that any strong personal desire or preference (e.g., "right to bunk class".', reveals: 'any-strong-personal-desire-or' },
                { text: 'right to bunk class', outcome: 'Not quite — Students often think that any strong personal desire or preference (e.g., "right to bunk class".', reveals: 'any-strong-personal-desire-or' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_002', title: 'Moral rights vs legal rights',
          caseStudy: { intro: 'Imagine a Class 11 student reads a news report about a community demanding the "right to clean air" in a polluted industrial city — the government has not yet.',
            decisions: [{ prompt: 'A student says: "The right to clean air is a Fundamental Right under Article 21 because the Supreme Court said so in Subhash Kumar v.', options: [
                { text: 'No, the student is incorrect', outcome: 'No, the student is incorrect. The right to clean air originates as a moral claim grounded in human.' },
                { text: 'not a real right', outcome: 'Not quite — Students believe that if a right is not written in the Constitution or a law, it is "not a real.', reveals: 'if-a-right-is-not' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_004', title: 'Natural rights theory: Locke and the social contract',
          caseStudy: { intro: 'Imagine a village panchayat suddenly declares it can seize any farmer\'s land without compensation because "the panchayat represents the people\'s will." You.',
            decisions: [{ prompt: 'According to Locke, what are the three natural rights individuals possess in the state of nature, and what makes them "inalienable"?', options: [
                { text: 'The three natural rights are life, liberty, and property', outcome: 'The three natural rights are life, liberty, and property. They are inalienable because they derive.' },
                { text: 'rights granted by the Constitution', outcome: 'Not quite — Students often think Locke\'s "state of nature" is a historical period of chaos (like Hobbes\' "war.', reveals: 'locke-s-state-of-nature' },
                { text: 'state of nature', outcome: 'Not quite — Students often think Locke\'s "state of nature" is a historical period of chaos (like Hobbes\' "war.', reveals: 'locke-s-state-of-nature' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_006', title: 'Civil rights and political rights: Distinctions',
          caseStudy: { intro: 'Start with a real-world scenario: "Imagine a citizen, Priya, who wants to protest against a new law.',
            decisions: [{ prompt: 'What is the primary constitutional basis for political rights in India, and which article guarantees universal adult franchise?', options: [
                { text: 'The primary constitutional basis for political rights in India is Article 326', outcome: 'The primary constitutional basis for political rights in India is Article 326, which guarantees.' },
                { text: 'civil rights and political rights are the same', outcome: 'Not quite — Students often think civil rights and political rights are the same because both are Fundamental.', reveals: 'civil-rights-and-political-rights' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A student council petition demands \'the right to unlimited phone data\' and \'the right to bunk class\', arguing \'enough of us want it, so it\'s a right.\' Separately, a senior claims privacy \'became a right only in 2017 — before the judgment, Indians had no such right.\'',
            decisions: [{ prompt: 'What makes a claim a right, and when does a right exist?', options: [
                { text: 'Apply the dignity filter and the moral/legal split: rights are justified claims necessary for a life of respect — collective moral judgement, not popularity; data and bunking fail the test however many sign. And legal recognition isn\'t creation: privacy was a moral right long before Puttaswamy made it judicially enforceable — movements convert moral claims into legal rights; parchment follows the claim, not vice versa.', outcome: 'Both cases resolve: a right needs justification for dignity, not a headcount — and a right can be morally real before a court stamps it legal.' },
                { text: 'Count the signatures — democratic demand is what makes something a right.', outcome: 'Popularity isn\'t the test: even majorities can demand things that fail the dignity-and-well-being standard or violate others\' rights.', reveals: 'popular-demand-makes-right' },
                { text: 'Agree privacy started in 2017 — no law, no right; the judgment created it.', outcome: 'That\'s legal positivism\'s blind spot: moral rights precede codification — earlier dissents and philosophical tradition recognised privacy decades before enforcement arrived.', reveals: 'rights-exist-only-when-legal' }
            ] }] } },
        { type: 'case', nodeId: 'c11_ps_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'A right that exists only on paper when courts close is weaker than a claim society has learned to defend — recognition is the substance, law the clothing.',
            decisions: [{ prompt: 'What comes next? Rights · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Rights · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_001', difficulty: 'standard',
          question: 'A right is a justified claim or entitlement that is recognised by society.',
          hint: 'Revisit Class 10 "Dignity and Freedom of Citizens in a Democracy" (c10_civ_cbse_05_005).',
          misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited.',
          parts: [
                { id: 'a', prompt: 'A group of citizens demands the "right to high-speed internet" in their village.', answer: 'Step 1: Check social recognition',
                  options: ['Step 1: Check social recognition', 'yes because Digital India exists', 'no because it\'s a luxury', 'right to bunk class'],
                  hint: 'Revisit Class 10 "Dignity and Freedom of Citizens in a Democracy" (c10_civ_cbse_05_005) and Class 9.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' },
                { id: 'b', prompt: 'Compare the claim "right to life" and "right to drive a car at any speed".', answer: 'Right to life: universally recognised as essential for dignity',
                  options: ['Right to life: universally recognised as essential for dignity', 'freedoms', 'right to bunk class', 'right to unlimited data'],
                  hint: 'Revisit Class 10 "Dignity and Freedom of Citizens in a Democracy" (c10_civ_cbse_05_005) and Class 9.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' }
          ],
            remediations: { 'any-strong-personal-desire-or': { steps: ['If a student conflates wants with rights, use the textbook\'s three-step test: (1) Is the claim necessary for.', '(2) Does society broadly agree it is necessary?', '(3) Does it impose a correlative duty on the state?', 'Apply to "right to smoke" — fails (1) health harm, (3) harms others\' right to health.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Rights are gifts given by the government to citizens." Use the concept of rights as claims recognised by society to justify your.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'right to bunk class', 'right to unlimited data', 'any strong personal desire or preference (e'],
                  hint: 'Revisit Class 10 "Dignity and Freedom of Citizens in a Democracy" (c10_civ_cbse_05_005) and Class 9.',
                  misconception: 'Students often think that any strong personal desire or preference (e.g., "right to bunk class", "right to unlimited data") becomes a right.' }
          ],
            remediations: { 'any-strong-personal-desire-or': { steps: ['If a student conflates wants with rights, use the textbook\'s three-step test: (1) Is the claim necessary for.', '(2) Does society broadly agree it is necessary?', '(3) Does it impose a correlative duty on the state?', 'Apply to "right to smoke" — fails (1) health harm, (3) harms others\' right to health.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_002', difficulty: 'standard',
          question: 'Moral rights are justified claims grounded in ethical principles, human.',
          hint: 'Revisit c11_ps_cbse_05_001 (What are rights) and c6_civics_ch10_002 (Fundamental Rights.',
          misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate.',
          parts: [
                { id: 'a', prompt: 'A student says: "The right to clean air is a Fundamental Right under Article 21 because the Supreme Court said so in Subhash Kumar v. State of Bihar (1991).', answer: 'No, the student is incorrect',
                  options: ['No, the student is incorrect', 'not a real right'],
                  hint: 'Revisit c11_ps_cbse_05_001 (What are rights) and c6_civics_ch10_002 (Fundamental Rights in the.',
                  misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate *legal recognition*.' },
                { id: 'b', prompt: 'A tribal community in a Schedule V area claims a "moral right" to protect their sacred forest from mining, citing their cultural identity and the Forest Rights.', answer: 'The community\'s claim is both a moral right (grounded in cultural dignity,',
                  options: ['The community\'s claim is both a moral right (grounded in cultural dignity,', 'not a real right'],
                  hint: 'Revisit c11_ps_cbse_05_001 (What are rights) and c6_civics_ch10_002 (Fundamental Rights in the.',
                  misconception: 'Students believe that if a right is not written in the Constitution or a law, it is "not a real right" — they equate *legal recognition*.' }
          ],
            remediations: { 'if-a-right-is-not': { steps: ['Have the student read the Puttaswamy judgment\'s reference to "natural rights" and "inalienable rights" in paragraphs.', 'Assign a mini-case study of the Right to Information movement — trace how a moral claim (citizens\' right to know).', 'Ask the student to identify one moral right in their school context (e.g., "right to be heard before punishment") that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_003', difficulty: 'standard',
          question: 'Negative rights are claims that require the state to refrain from interfering.',
          hint: 'Revisit Article 19 (freedoms) and Article 21 (life/liberty) for negative rights; Article.',
          misconception: 'Students often believe \'negative rights = civil/political rights (always justiciable)\' and \'positive rights.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Negative rights are claims that require the state to refrain from interfering in an',
                  options: ['Negative rights are claims that require the state to refrain from interfering in an', 'A right is a justified claim or entitlement that is recognised by society as necessary', 'Moral rights are justified claims grounded in ethical principles, human dignity, and', 'Natural rights theory, as articulated by John Locke, posits that individuals possess'],
                  hint: 'Revisit Article 19 (freedoms) and Article 21 (life/liberty) for negative rights; Article 21A.',
                  misconception: 'Students often believe \'negative rights = civil/political rights (always justiciable)\' and \'positive rights = economic/social rights (never.' }
          ],
            remediations: { 'negative-rights-civil-political-rights': { steps: ['Re-read Article 21 (\'No person shall be deprived of life or personal liberty except according to procedure established.', 'List three state actions required by Article 21A (build schools, train teachers, mid-day meals) and three state.', 'Read the *PUCL v. Union of India* (2001) right to food case summary — note how the Court converted Directive Principles.', 'Write two columns: \'State MUST NOT\' vs \'State MUST\' — place each example in the correct column.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_004', difficulty: 'standard',
          question: 'Natural rights theory, as articulated by John Locke, posits that individuals.',
          hint: 'Revisit c11_ps_cbse_05_002\'s distinction: moral rights are claims we make *on* the legal.',
          misconception: 'Students often think Locke\'s "state of nature" is a historical period of chaos (like Hobbes\' "war of all against all").',
          parts: [
                { id: 'a', prompt: 'According to Locke, what are the three natural rights individuals possess in the state of nature, and what makes them "inalienable"?', answer: 'The three natural rights are life, liberty, and property',
                  options: ['The three natural rights are life, liberty, and property', 'rights granted by the Constitution', 'state of nature', 'war of all against all'],
                  hint: 'Revisit c11_ps_cbse_05_002\'s distinction: moral rights are claims we make *on* the legal system.',
                  misconception: 'Students often think Locke\'s "state of nature" is a historical period of chaos (like Hobbes\' "war of all against all") rather than.' }
          ],
            remediations: { 'locke-s-state-of-nature': { steps: ['Re-read NCERT 5.2 ("Where Do Rights Come From?") — note the phrase "rights were not conferred by a ruler or a society.', 'Draw a two-column table: "Pre-contract (State of Nature)" vs. "Post-contract (Civil Society)." In the left column.', 'Apply to a current news item (e.g., a demolition drive without notice) — ask: "Which column does the violated claim.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_005', difficulty: 'standard',
          question: 'The Universal Declaration of Human Rights (UDHR), adopted by the UN General.',
          hint: 'Revisit c11_ps_cbse_05_001 (definition of rights as entitlements for dignity) and.',
          misconception: 'Students often think the UDHR is a legally binding treaty that countries sign and ratify like the ICCPR.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Universal Declaration of Human Rights (UDHR), adopted by the UN General Assembly on',
                  options: ['The Universal Declaration of Human Rights (UDHR), adopted by the UN General Assembly on', 'A right is a justified claim or entitlement that is recognised by society as necessary', 'Moral rights are justified claims grounded in ethical principles, human dignity, and', 'Negative rights are claims that require the state to refrain from interfering in an'],
                  hint: 'Revisit c11_ps_cbse_05_001 (definition of rights as entitlements for dignity) and.',
                  misconception: 'Students often think the UDHR is a legally binding treaty that countries sign and ratify like the ICCPR.' }
          ],
            remediations: { 'the-udhr-is-a-legally': { steps: ['Show the student the UN document symbol "A/RES/217(III)A" and explain that "RES" means resolution, not "TREATY".', 'Contrast with the ICCPR (adopted 1966, entered force 1976) — have them check the UN Treaty Collection website to see.', 'Use the Indian example: Article 21 UDHR (right to democracy) → Article 19-22 Indian Constitution (enforceable.', 'Assign a one-paragraph writing task: "Explain why the UDHR\'s non-binding nature did not prevent it from becoming the.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_ps_cbse_05_006', difficulty: 'standard',
          question: 'Civil rights are protections guaranteed by the state to ensure individual.',
          hint: 'If stuck, review Article 19 (six freedoms) and Article 326 (universal adult franchise).',
          misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.',
          parts: [
                { id: 'a', prompt: 'What is the primary constitutional basis for political rights in India, and which article guarantees universal adult franchise?', answer: 'The primary constitutional basis for political rights in India is Article 326',
                  options: ['The primary constitutional basis for political rights in India is Article 326', 'civil rights and political rights are the same'],
                  hint: 'If stuck, review Article 19 (six freedoms) and Article 326 (universal adult franchise) from Class.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' },
                { id: 'b', prompt: 'Explain why the right to a fair trial (Article 21) is considered a civil right and not a political right, even though it involves the state.', answer: 'The right to a fair trial is a civil right',
                  options: ['The right to a fair trial is a civil right', 'civil rights and political rights are the same'],
                  hint: 'If stuck, review Article 19 (six freedoms) and Article 326 (universal adult franchise) from Class.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' },
                { id: 'c', prompt: 'A journalist is arrested for criticizing government policy. Identify which specific civil and political rights are violated, citing constitutional articles.', answer: 'The arrest violates the civil right to freedom of speech and expression (Article',
                  options: ['The arrest violates the civil right to freedom of speech and expression (Article', 'civil rights and political rights are the same'],
                  hint: 'If stuck, review Article 19 (six freedoms) and Article 326 (universal adult franchise) from Class.',
                  misconception: 'Students often think civil rights and political rights are the same because both are Fundamental Rights.' }
          ],
            remediations: { 'civil-rights-and-political-rights': { steps: ['If a student conflates the two, have them create a two-column table: Column A "Civil Rights" (protections from state).', 'Fill with examples from Articles 19-22 and 326.', 'Then ask: "If Article 19(1)(a) is suspended, which column is affected?" Guide them to see it affects both.', 'Use the Emergency (1975-77) as a case study where both were suspended.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
