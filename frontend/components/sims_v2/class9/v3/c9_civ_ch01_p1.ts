import type { SimDef } from '../../engine/types';

/** v3 generated — c9_civ_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_civ_ch01_p1: SimDef = {
    id: 'v3_c9_civ_ch01_p1',
    title: 'Democracy and Its Principles · Part 1/2',
    subtitle: 'Elections alone don\'t make a democracy',
    classLevel: 9, subject: 'civics', topic: 'Democracy and Its Principles · Part 1/2',
    chapters: ['c9_civ_ch01'],
    nodeIds: ['c9_civ_ch1_1', 'c9_civ_ch1_10', 'c9_civ_ch1_11', 'c9_civ_ch1_12', 'c9_civ_ch1_2', 'c9_civ_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a democracy inspector', intro: 'Any regime can stage a vote. Your job: read the Preamble and the Constitution\'s core articles, then judge which \'democracies\' are the real deal and which are wolves counting sheep.', goal: 'Distinguish procedural democracy (elections) from substantive democracy (rights, rule of law, accountability) and see how the Constitution\'s Preamble and Articles 14, 19, 21, 326 operationalise it.' },
    discovery: {
        question: 'A country holds elections every five years — but the opposition is jailed, the media is censored and courts never rule against the government. Is it a democracy?',
        options: ['No — voting is just the procedure; real democracy also demands free speech, independent courts and accountability, which this country lacks', 'Yes — elections are all that matter', 'Yes — the majority won fair and square', 'No — because it lacks a king'],
        answer: 'No — voting is just the procedure; real democracy also demands free speech, independent courts and accountability, which this country lacks',
        hook: 'Two wolves and a lamb voting on lunch is majority rule — not democracy. India\'s Preamble and Articles 14, 19, 21 and 326 exist precisely to cage the majority: 51% of votes never buys unlimited power.',
    },
    teaching: [
        { title: 'Democracy: Definition and Core Principles', text: 'Democracy is a system of government in which supreme political power is vested in the people, who exercise it either directly or through freely elected representatives, under a constitutional.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_civ_ch1_1', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Audit a fake \'democracy\' against the real checklist — popular sovereignty, political equality, rule of law, accountability — then draft a 3-article mini-constitution for a school council that actually delivers each one.',
        labels: ['Democracy: Definition and Core', 'Local Governance: Panchayati Raj', 'Women\'s Representation in Democracy', 'Right to Information (RTI)', 'Historical Democratic Traditions: Athens', 'Constitution: Role in'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'case', nodeId: 'c9_civ_ch1_1', title: 'Democracy: Definition and Core Principles',
          caseStudy: { intro: 'Imagine you are reading a news report about a country that holds regular elections but the opposition leaders are jailed, media is censored, and courts cannot.',
            decisions: [{ prompt: 'Define democracy in one sentence using the three core components: source of authority, method of exercise, and constitutional constraints.', options: [
                { text: 'Correct answer: Democracy is a system where supreme authority resides in the people', outcome: 'Correct answer: Democracy is a system where supreme authority resides in the people (source), who.' },
                { text: 'voting', outcome: 'Not quite — Students often think "democracy = majority rule" and therefore believe that if a government wins.', reveals: 'democracy-majority-rule-and-therefore' },
                { text: 'majority rule', outcome: 'Not quite — Students often think "democracy = majority rule" and therefore believe that if a government wins.', reveals: 'democracy-majority-rule-and-therefore' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_10', title: 'Local Governance: Panchayati Raj and Municipalities',
          caseStudy: { intro: 'Imagine your village or city faces a persistent waterlogging problem every monsoon. You and your neighbors complain, but no action is taken. Where do you go?',
            decisions: [{ prompt: 'What are the two Constitutional Amendment Acts that granted constitutional status to Panchayati Raj Institutions and Municipalities.', options: [
                { text: 'The 73rd Constitutional Amendment Act (1992) for Panchayati Raj and the 74th', outcome: 'The 73rd Constitutional Amendment Act (1992) for Panchayati Raj and the 74th Constitutional.' },
                { text: '42nd Amendment', outcome: 'Not quite — Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and.', reveals: 'the-73rd-74th-amendments-automatically' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_12', title: 'Right to Information (RTI) and Civic Responsibility',
          caseStudy: { intro: 'Imagine you notice a newly built community toilet in your neighbourhood remains locked for months despite funds being sanctioned.',
            decisions: [{ prompt: 'What is the constitutional basis of the Right to Information in India, and which Article guarantees it?', options: [
                { text: 'The constitutional basis is Article 19(1)(a)', outcome: 'The constitutional basis is Article 19(1)(a) — freedom of speech and expression — which the Supreme.' },
                { text: 'Why did the officer take leave on Tuesday?', outcome: 'Not quite — Students believe RTI allows them to ask *any* question and get *any* answer — e.g., "Why did the.', reveals: 'rti-allows-them-to-ask' },
                { text: 'Give me your opinion on the new policy', outcome: 'Not quite — Students believe RTI allows them to ask *any* question and get *any* answer — e.g., "Why did the.', reveals: 'rti-allows-them-to-ask' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_2', title: 'Historical Democratic Traditions: Athens and Other Examples',
          caseStudy: { intro: 'Imagine you live in Athens in 450 BCE. You are a male citizen over 18, and every few weeks you walk to the Pnyx hill to sit among 6000 other citizens in the.',
            decisions: [{ prompt: 'What was the key feature of Athenian democracy that distinguishes it from modern representative democracy?', options: [
                { text: 'Athenian democracy was a direct democracy where all adult male citizens gathered in the', outcome: 'Athenian democracy was a direct democracy where all adult male citizens gathered in the Ekklesia.' },
                { text: 'Athens had a king', outcome: 'Not quite — Students think democracy was invented only in ancient Greece and that ancient India had only.', reveals: 'democracy-was-invented-only-in' },
                { text: 'everyone could vote', outcome: 'Not quite — Students think democracy was invented only in ancient Greece and that ancient India had only.', reveals: 'democracy-was-invented-only-in' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_3', title: 'Constitution: Role in a Democracy',
          caseStudy: { intro: 'Imagine you see a news headline: "State Government Passes Law Banning All Protests in Capital City." Ask: "Can they do that?',
            decisions: [{ prompt: 'What is the legal consequence under the Indian Constitution if a law passed by Parliament violates a Fundamental Right?', options: [
                { text: 'Under Article 13(2), any law made by the State that takes away or abridges a Fundamental', outcome: 'Under Article 13(2), any law made by the State that takes away or abridges a Fundamental Right.' },
                { text: 'constitutional amendment', outcome: 'Not quite — Students often think the Constitution is primarily a list of government powers (what government CAN.', reveals: 'the-constitution-is-primarily-a' },
                { text: 'ordinary law-making', outcome: 'Not quite — Students often think the Constitution is primarily a list of government powers (what government CAN.', reveals: 'the-constitution-is-primarily-a' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_1', title: 'A real-world call',
          caseStudy: { intro: 'A democratically elected government can legally pass a law that a minority community experiences as unjust. Everything was done by the rules; the outcome still harms.',
            decisions: [{ prompt: 'Is a law legitimate just because it was democratically passed?', options: [
                { text: 'Yes — process is what makes law law', outcome: 'The procedural answer; but \'legally passed\' has sheltered every unjust law that ever existed.' },
                { text: 'No — rights exist above majority votes', outcome: 'The constitutional answer — democracies have courts precisely for this; the check only works if it\'s allowed to work.' },
                { text: 'Legitimate procedurally, contestable morally', outcome: 'The complete answer — the law is legal AND can still be wrong; democracy\'s test is whether the wrong can be challenged.' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A news item describes a country that votes every five years — yet opposition leaders sit in jail, the media is censored, and courts never rule against the government. A classmate shrugs: \'They hold elections, so it\'s a democracy.\'',
            decisions: [{ prompt: 'Does voting alone settle the question?', options: [
                { text: 'No — elections are only the procedure. Substantive democracy also needs political freedom (speech, fair contest), rule of law with independent courts, and rulers accountable to the ruled; India writes these into Articles 19, 14 and 326 precisely so that a ballot cannot coexist with jail cells for critics.', outcome: 'This separates procedural from substantive democracy — the full system is continuous constraints on power, not a single voting day.' },
                { text: 'The classmate is right — a government that won an election carries the people\'s mandate and can govern as it likes.', outcome: 'A mandate is limited authority, not a blank cheque; constitutional rights and courts exist exactly to stop a majority from becoming a tyranny.', reveals: 'mandate-is-unlimited' },
                { text: 'It fails as a democracy only because its elections might be rigged — fair counting would fix everything.', outcome: 'Even honest counting would leave jailed opponents and censored media untouched; the missing pieces are rights and accountability, not arithmetic.', reveals: 'counting-is-democracy' }
            ] }] } },
        { type: 'case', nodeId: 'c9_civ_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'Democracy isn\'t an event called \'election day\' — it\'s a permanent cage around power. Rights, courts and accountability are what keep majority rule from becoming majority tyranny.',
            decisions: [{ prompt: 'What comes next? Democracy and Its Principles · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Democracy and Its Principles · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_civ_ch1_1', difficulty: 'standard',
          question: 'Democracy is a system of government in which supreme political power is vested.',
          hint: 'Revisit Article 326 (universal adult franchise) and the Preamble\'s "We the people".',
          misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51%.',
          parts: [
                { id: 'a', prompt: 'A country holds elections every five years with universal adult franchise.', answer: 'Correct answer: No, it lacks substantive democracy',
                  options: ['Correct answer: No, it lacks substantive democracy', 'yes because elections are held', 'democracy = majority rule', 'it has the mandate'],
                  hint: 'Revisit Article 326 (universal adult franchise) and the Preamble\'s "We the people" – these are the.',
                  misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51% votes, it can.' }
          ],
            remediations: { 'democracy-majority-rule-and-therefore': { steps: ['Re-read the Preamble slowly – highlight "Sovereign... Democratic Republic" and "Liberty, Equality, Fraternity".', 'List the Fundamental Rights (Articles 12-35) and ask: "Can a majority in Parliament take away Article 19 (free speech).', 'Use the "two wolves and a lamb voting on lunch" analogy – democracy is not the vote, it\'s the constitutional protection.', 'Identify one real Indian example where courts struck down a majority government\'s law to protect minority rights (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51%.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A democracy that does not protect minority rights against majority decisions is not a true democracy." Use the concepts.', answer: 'Correct answer: The statement is correct',
                  options: ['Correct answer: The statement is correct', 'democracy = majority rule', 'it has the mandate'],
                  hint: 'Revisit Article 326 (universal adult franchise) and the Preamble\'s "We the people" – these are the.',
                  misconception: 'Students often think "democracy = majority rule" and therefore believe that if a government wins an election with 51% votes, it can.' }
          ],
            remediations: { 'democracy-majority-rule-and-therefore': { steps: ['Re-read the Preamble slowly – highlight "Sovereign... Democratic Republic" and "Liberty, Equality, Fraternity".', 'List the Fundamental Rights (Articles 12-35) and ask: "Can a majority in Parliament take away Article 19 (free speech).', 'Use the "two wolves and a lamb voting on lunch" analogy – democracy is not the vote, it\'s the constitutional protection.', 'Identify one real Indian example where courts struck down a majority government\'s law to protect minority rights (e.g.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_10', difficulty: 'standard',
          question: 'Local Governance in India refers to the constitutionally mandated third tier.',
          hint: 'If stuck, revisit **Article 40 (Directive Principle)** and **Articles 243G/243W.',
          misconception: 'Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and 18 urban subjects**.',
          parts: [
                { id: 'a', prompt: 'What are the two Constitutional Amendment Acts that granted constitutional status to Panchayati Raj Institutions and Municipalities in India, and in which year.', answer: 'The 73rd Constitutional Amendment Act (1992) for Panchayati Raj and the 74th',
                  options: ['The 73rd Constitutional Amendment Act (1992) for Panchayati Raj and the 74th', '42nd Amendment'],
                  hint: 'If stuck, revisit **Article 40 (Directive Principle)** and **Articles 243G/243W (devolution.',
                  misconception: 'Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and 18 urban subjects** (Eleventh/Twelfth.' },
                { id: 'b', prompt: 'Why did the Constitution originally not include local self-government as a mandatory tier, and what changed with the 73rd and 74th Amendments?', answer: 'Originally, local government was a Directive Principle (Article 40)',
                  options: ['Originally, local government was a Directive Principle (Article 40)', 'It was always in Fundamental Rights'],
                  hint: 'If stuck, revisit **Article 40 (Directive Principle)** and **Articles 243G/243W (devolution.',
                  misconception: 'Students often believe that the 73rd/74th Amendments **automatically transferred all 29 rural and 18 urban subjects** (Eleventh/Twelfth.' }
          ],
            remediations: { 'the-73rd-74th-amendments-automatically': { steps: ['Read Article 243G (Panchayats) and 243W (Municipalities) verbatim — note the phrase "subject to the provisions of this.', 'Pick your state\'s Panchayat/Municipal Act (e.g., UP Panchayat Raj Act, 1947 as amended; Maharashtra Municipal.', 'Find the latest State Finance Commission report (available on state finance department websites) — check the.', 'Write a 3-point comparison: Constitutional Schedule vs. State Act vs. Actual Practice.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_11', difficulty: 'standard',
          question: 'Women\'s representation in democracy refers to the constitutional and.',
          hint: 'Revisit c8_civ_ch1_3 (Article 326) and c6_civics_ch10_003 (Right to Equality).',
          misconception: 'Students believe the 106th Amendment (2023) has *already implemented* 33% reservation in Lok Sabha and Assemblies.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Women\'s representation in democracy refers to the constitutional and institutional',
                  options: ['Women\'s representation in democracy refers to the constitutional and institutional', 'Democracy is a system of government in', 'Local Governance in India refers to the constitutionally mandated third tier of', 'The Right to Information (RTI) Act, 2005, derived from Article 19(1)(a) of the'],
                  hint: 'Revisit c8_civ_ch1_3 (Article 326) and c6_civics_ch10_003 (Right to Equality) to distinguish formal.',
                  misconception: 'Students believe the 106th Amendment (2023) has *already implemented* 33% reservation in Lok Sabha and Assemblies.' }
          ],
            remediations: { 'the-106th-amendment-2023-has': { steps: ['Read Article 334A (inserted by 106th Amendment) text: "reservation shall come into effect after an exercise.', 'Check Census timeline — 2021 Census delayed, next likely 2025-26, delimitation 2026-27, implementation 2029.', 'Contrast with Article 243D (73rd Amendment) which had no delimitation precondition.', 'Create a timeline chart: 1992 (local bodies) → 2023 (law passed) → 2026 (Census) → 2029 (first reserved LS election).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_12', difficulty: 'standard',
          question: 'The Right to Information (RTI) Act, 2005, derived from Article 19(1)(a) of the.',
          hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights) and c6_civics_ch10_004 (Right to Freedom).',
          misconception: 'Students believe RTI allows them to ask *any* question and get *any* answer — e.g., "Why did the officer take leave.',
          parts: [
                { id: 'a', prompt: 'What is the constitutional basis of the Right to Information in India, and which Article guarantees it?', answer: 'The constitutional basis is Article 19(1)(a)',
                  options: ['The constitutional basis is Article 19(1)(a)', 'Why did the officer take leave on Tuesday?', 'Give me your opinion on the new policy', 'information'],
                  hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights) and c6_civics_ch10_004 (Right to Freedom) to re-establish.',
                  misconception: 'Students believe RTI allows them to ask *any* question and get *any* answer — e.g., "Why did the officer take leave on Tuesday?" or "Give.' },
                { id: 'b', prompt: 'A citizen files an RTI asking for the personal medical records of a government doctor posted at a primary health centre.', answer: 'The FAA should uphold the refusal',
                  options: ['The FAA should uphold the refusal', 'public servant', 'public property', 'Why did the officer take leave on Tuesday?'],
                  hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights) and c6_civics_ch10_004 (Right to Freedom) to re-establish.',
                  misconception: 'Students believe RTI allows them to ask *any* question and get *any* answer — e.g., "Why did the officer take leave on Tuesday?" or "Give.' },
                { id: 'c', prompt: 'Compare the roles of the Central Information Commission (CIC) and a First Appellate Authority (FAA) in the RTI appeals hierarchy.', answer: 'The FAA is an internal departmental officer who reviews the PIO\'s decision',
                  options: ['The FAA is an internal departmental officer who reviews the PIO\'s decision', 'Why did the officer take leave on Tuesday?', 'Give me your opinion on the new policy', 'information'],
                  hint: 'Revisit c9_civ_ch1_4 (Fundamental Rights) and c6_civics_ch10_004 (Right to Freedom) to re-establish.',
                  misconception: 'Students believe RTI allows them to ask *any* question and get *any* answer — e.g., "Why did the officer take leave on Tuesday?" or "Give.' }
          ],
            remediations: { 'rti-allows-them-to-ask': { steps: ['Show the student Section 2(f) definition — "information means any material in any form... held by a public authority."', 'Give two side-by-side requests: (A) "Provide the leave record of Officer X for March 2024" (valid — record exists) vs.', 'Have them identify which fits the definition.', 'Assign practice — draft three valid RTI queries from a sample government department webpage (e.g., MGNREGA works list.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_2', difficulty: 'standard',
          question: 'Historical democratic traditions refer to early systems of governance where.',
          hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to refresh the basic.',
          misconception: 'Students think democracy was invented only in ancient Greece and that ancient India had only monarchies.',
          parts: [
                { id: 'a', prompt: 'What political innovation did the Roman Republic contribute to democratic tradition that is still used today?', answer: 'The Roman Republic introduced representative government',
                  options: ['The Roman Republic introduced representative government', 'Rome invented voting'],
                  hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to refresh the basic definition.',
                  misconception: 'Students think democracy was invented only in ancient Greece and that ancient India had only monarchies.' },
                { id: 'b', prompt: 'Compare the citizenship criteria of Athenian democracy with modern Indian democracy. What changed and why?', answer: 'Athenian citizenship was restricted to adult males of Athenian parentage',
                  options: ['Athenian citizenship was restricted to adult males of Athenian parentage', 'Athens allowed everyone to vote'],
                  hint: 'Revisit c9_civ_ch1_1 (Democracy: Definition and Core Principles) to refresh the basic definition.',
                  misconception: 'Students think democracy was invented only in ancient Greece and that ancient India had only monarchies.' }
          ],
            remediations: { 'democracy-was-invented-only-in': { steps: ['Show a map of ancient India (600 BCE) marking the 16 mahajanapadas, highlighting the ganas (Vajji, Malla, Koliya.', 'Ask the student to compare: "How did the Vajji confederation make decisions?" vs "How did Magadha (a monarchy) make.', 'Read an excerpt from the Buddhist text describing sangha voting procedures.', 'Create a timeline: Athens (508 BCE) → Roman Republic (509 BCE) → Vajji confederation (600 BCE) → Modern India (1950).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c9_civ_ch1_3', difficulty: 'standard',
          question: 'A constitution in a democracy is the supreme fundamental law that establishes.',
          hint: 'Revisit Article 13 (voidness of laws inconsistent with Fundamental Rights) and the.',
          misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A constitution in a democracy is the supreme fundamental law that establishes the',
                  options: ['A constitution in a democracy is the supreme fundamental law that establishes the', 'Democracy is a system of government in', 'Local Governance in India refers to the constitutionally mandated third tier of', 'Women\'s representation in democracy refers to the constitutional and institutional'],
                  hint: 'Revisit Article 13 (voidness of laws inconsistent with Fundamental Rights) and the Kesavananda.',
                  misconception: 'Students often think the Constitution is primarily a list of government powers (what government CAN do) and forget its equally critical.' }
          ],
            remediations: { 'the-constitution-is-primarily-a': { steps: ['Give the student two short texts — Article 79 (Parliament constitution) and Article 13 (voidness of rights-violating.', 'Use a concrete case: the 2020 farm laws (repealed) vs. a hypothetical law banning a religion.', 'Have the student complete a table: Column A — Constitutional Provisions that Create Power (cite article); Column.', 'Discuss why the amendment procedure (Article 368) is stricter than ordinary law-making — connect to the idea that the.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
