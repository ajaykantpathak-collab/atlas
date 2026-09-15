import type { SimDef } from '../../engine/types';

/** v3 generated — c10_civ_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_civ_ch05_p1: SimDef = {
    id: 'v3_c10_civ_ch05_p1',
    title: 'Outcomes of Democracy · Part 1/2',
    subtitle: 'Weigh growth numbers against dignity, rights and real development',
    classLevel: 10, subject: 'civics', topic: 'Outcomes of Democracy · Part 1/2',
    chapters: ['c10_civ_ch05'],
    nodeIds: ['c10_civ_cbse_05_001', 'c10_civ_cbse_05_002', 'c10_civ_cbse_05_003', 'c10_civ_cbse_05_004', 'c10_civ_cbse_05_005', 'c10_civ_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a development economist comparing national report cards', intro: 'A scholarship stuck in a government office gets released within 30 days of an RTI filing. That small win is accountability — one of democracy\'s quieter outcomes.', goal: 'Distinguish growth from development and argue democracy\'s outcomes — accountability, legitimacy, dignity — with evidence.' },
    discovery: {
        question: 'From 1950 to 2000, dictatorships averaged 4.42% growth a year while democracies averaged 3.95%. Case closed for dictatorship — right?',
        options: ['No — dictatorships swung wildly between booms and collapses, while democracies grew slower but never crashed into famine', 'Yes — a higher average growth rate settles the debate', 'No — the data is too old to mean anything today', 'Yes — but only for countries that were already rich'],
        answer: 'No — dictatorships swung wildly between booms and collapses, while democracies grew slower but never crashed into famine',
        hook: 'The average hides the horror. Half a point of growth buys you stability, dignity and no catastrophic lows — development is more than a GDP line going up.',
    },
    teaching: [
        { title: 'Accountable, Responsive and Legitimate Government Under Democracy', text: 'In a democracy, an **accountable government** is one where rulers are answerable to citizens for their decisions and actions through institutional mechanisms like elections, parliamentary oversight.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_civ_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Judge two countries: one dictatorial with 8% growth but 65% literacy, one democratic at 5% with 92% literacy — build the case for which is truly more \'developed.\'',
        labels: ['Accountable, Responsive and Legitimate', 'Economic Growth and Development', 'Reduction of Inequality', 'Accommodation of Social Diversity', 'Dignity and Freedom', 'Democracy: Strengths and Weaknesses'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_001', title: 'Accountable, Responsive and Legitimate Government Under Democracy',
          caseStudy: { intro: 'Imagine you applied for a scholarship under a government scheme but the money never reached your bank account.',
            decisions: [{ prompt: 'What is the constitutional basis for the legitimacy of the Union Government in India? (Answer in one sentence.)', options: [
                { text: 'The Union Government derives its legitimacy from Article 75(3) of the Constitution', outcome: 'The Union Government derives its legitimacy from Article 75(3) of the Constitution, which states.' },
                { text: 'the President appoints the PM', outcome: 'Not quite — Students often think **accountability = elections only**. They write: "Government is accountable.', reveals: 'accountability-elections-only' },
                { text: 'the Constitution gives power to the PM', outcome: 'Not quite — Students often think **accountability = elections only**. They write: "Government is accountable.', reveals: 'accountability-elections-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_002', title: 'Economic Growth and Development Under Democracy',
          caseStudy: { intro: 'Imagine reading a newspaper headline: "India\'s GDP grows at 7% while China\'s grows at 5% — does democracy help or hurt the economy?" Start by asking: "What.',
            decisions: [{ prompt: 'According to World Bank data (1950-2000), what was the average annual economic growth rate of democratic regimes compared to dictatorial.', options: [
                { text: 'Democratic regimes averaged 3.95% annual growth while dictatorial regimes averaged 4.42%', outcome: 'Democratic regimes averaged 3.95% annual growth while dictatorial regimes averaged 4.42%.' },
                { text: 'democracies grew faster', outcome: 'Not quite — Students believe "democracy guarantees economic development" or "dictatorship is better for.', reveals: 'democracy-guarantees-economic-development-or' },
                { text: 'democracy guarantees economic development', outcome: 'Not quite — Students believe "democracy guarantees economic development" or "dictatorship is better for.', reveals: 'democracy-guarantees-economic-development-or' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_003', title: 'Reduction of Inequality and Poverty in Democracies',
          caseStudy: { intro: 'Imagine you read a news headline: "MGNREGA demand surges in rural India amid economic slowdown." Ask: Why does a democracy guarantee 100 days of wage.',
            decisions: [{ prompt: 'Which part of the Indian Constitution explicitly directs the State to strive to minimize inequalities in income and eliminate inequalities.', options: [
                { text: 'Directive Principles of State Policy, specifically Article 38(2) and Article 39(c)', outcome: 'Directive Principles of State Policy, specifically Article 38(2) and Article 39(c).' },
                { text: 'Fundamental Rights', outcome: 'Not quite — Students often believe democracy automatically reduces both inequality and poverty because.', reveals: 'democracy-automatically-reduces-both-inequality' },
                { text: 'Preamble', outcome: 'Not quite — Students often believe democracy automatically reduces both inequality and poverty because.', reveals: 'democracy-automatically-reduces-both-inequality' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_004', title: 'Accommodation of Social Diversity in Democratic Systems',
          caseStudy: { intro: 'Imagine a Class 10 student, Arjun, who speaks Tulu at home but studies in a Kannada-medium school in Mangaluru.',
            decisions: [{ prompt: 'What are the two constitutional articles that specifically protect the cultural and educational rights of minorities in India?', options: [
                { text: 'Articles 29 and 30', outcome: 'Articles 29 and 30. Article 29 protects the right of any section of citizens to conserve its.' },
                { text: 'accommodation of diversity', outcome: 'Not quite — Students often believe "accommodation of diversity" means only **reservations (quotas) for.', reveals: 'accommodation-of-diversity-means-only' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_005', title: 'Dignity and Freedom of Citizens in a Democracy',
          caseStudy: { intro: 'Imagine a Class 10 student, Arjun, who posts a critical comment about a local policy on social media and is threatened with police action.',
            decisions: [{ prompt: 'Name the constitutional article that empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights.', options: [
                { text: 'Article 32', outcome: 'Article 32. A wrong answer (e.g., Article 226 or Article 14) reveals the student confuses the.' },
                { text: 'freedom of speech', outcome: 'Not quite — Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake.', reveals: 'freedom-of-speech-in-a' },
                { text: 'democracy means total freedom', outcome: 'Not quite — Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake.', reveals: 'freedom-of-speech-in-a' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_006', title: 'Democracy: Strengths and Weaknesses Compared to Alternatives',
          caseStudy: { intro: 'Imagine you are watching a news debate where one panelist argues that "a strong leader without elections can develop India faster," while another insists "only.',
            decisions: [{ prompt: 'Name two alternative forms of government to democracy that were studied in Class 6 and Class 7, and state one key feature of each.', options: [
                { text: 'Monarchy (rule by a king/queen, often hereditary) and dictatorship (rule by force, no', outcome: 'Monarchy (rule by a king/queen, often hereditary) and dictatorship (rule by force, no free.' },
                { text: 'oligarchy', outcome: 'Not quite — Students often think "democracy is weak because it is slow" and "dictatorship is strong because.', reveals: 'democracy-is-weak-because-it' },
                { text: 'theocracy', outcome: 'Not quite — Students often think "democracy is weak because it is slow" and "dictatorship is strong because.', reveals: 'democracy-is-weak-because-it' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_001', title: 'A real-world call',
          caseStudy: { intro: 'A country develops fast under a strong central government that limits criticism. A slower, messier democracy next door protects dissent but delivers less growth.',
            decisions: [{ prompt: 'Which country would you rather live in — and what does \'outcome\' even mean?', options: [
                { text: 'The fast one — growth is the outcome that matters', outcome: 'Defensible — until the criticism you\'d want to make becomes illegal to voice.' },
                { text: 'The democratic one — the process IS the outcome', outcome: 'Democracy\'s defenders argue the ability to change course peacefully is worth more than any single result.' },
                { text: 'Neither is pure — judge by who\'s protected', outcome: 'The most honest lens: ask not \'how fast did it grow\' but \'what happened to the people who disagreed\'.' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a family debate, a teenager argues that democracy is inefficient: \'Our colony\'s road took two years of meetings and complaints to get repaired. Under a dictator it would be fixed in a week — so democracy delivers less.\'',
            decisions: [{ prompt: 'How should the family judge democracy\'s actual outcomes?', options: [
                { text: 'Democracy should be judged by accountability, legitimacy and dignity, not only speed. The road was delayed because officials had to answer complaints, budgets were scrutinised and citizens could protest — those checks slow decisions but make them the people\'s own, and rulers who fail can be removed.', outcome: 'A dictator may pour tar faster, but no one can question where the money went or vote him out — democratic outcomes include answerable government and citizens\' dignity, which speed alone cannot measure.' },
                { text: 'The teenager is right — the only fair test of a government is how fast it completes projects, so non-democratic rule wins.', outcome: 'Speed without accountability lets rulers act against citizens\' wishes with no remedy — a fast road paired with silence, no elections and no right to complain is a poor outcome.', reveals: 'speed-is-the-only-outcome' },
                { text: 'Democracy is clearly better because it guarantees every decision is made quickly and correctly.', outcome: 'Democracy does not guarantee quick or perfect decisions — it guarantees that decisions can be questioned and rulers changed, which is its real strength.', reveals: 'democracy-means-fast-decisions' }
            ] }] } },
        { type: 'case', nodeId: 'c10_civ_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'Democracy\'s report card isn\'t only economic — it\'s accountability, dignity and citizens who can demand answers. Growth matters; so does who the growth belongs to.',
            decisions: [{ prompt: 'What comes next? Outcomes of Democracy · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Outcomes of Democracy · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_001', difficulty: 'standard',
          question: 'In a democracy, an **accountable government** is one where rulers are.',
          hint: 'If stuck, re-read **c9_civ_ch1_7 (Elections and Accountability in Democracy)** for the.',
          misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote.',
          parts: [
                { id: 'a', prompt: 'A municipal corporation fails to collect garbage in a ward for three months despite repeated complaints.', answer: '**Missing attribute:** Responsiveness',
                  options: ['**Missing attribute:** Responsiveness', 'vote them out next election', 'write to the Mayor', '**accountability = elections only**'],
                  hint: 'If stuck, re-read **c9_civ_ch1_7 (Elections and Accountability in Democracy)** for the electoral.',
                  misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote them out." This.' }
          ],
            remediations: { 'accountability-elections-only': { steps: ['** Take a recent newspaper report (e.g., "CAG audit reveals ₹XXX crore irregularity in Scheme Y"). **', '** Identify *which* mechanism exposed it (CAG → PAC → Parliament). **', '** Trace the chain: CAG (independent auditor) → Report tabled in Parliament → Public Accounts Committee (MPs from all.', '** Ask: "Could an election have caught this specific irregularity?" No — elections are too blunt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote.',
          parts: [
                { id: 'a', prompt: 'Draft a one-paragraph citizen\'s charter clause for a Passport Seva Kendra that operationalises *all three* attributes — accountability, responsiveness.', answer: '**Sample clause:** "The Passport Seva Kendra commits to: (1) **Accountability**',
                  options: ['**Sample clause:** "The Passport Seva Kendra commits to: (1) **Accountability**', '**accountability = elections only**'],
                  hint: 'If stuck, re-read **c9_civ_ch1_7 (Elections and Accountability in Democracy)** for the electoral.',
                  misconception: 'Students often think **accountability = elections only**. They write: "Government is accountable because we can vote them out." This.' }
          ],
            remediations: { 'accountability-elections-only': { steps: ['** Take a recent newspaper report (e.g., "CAG audit reveals ₹XXX crore irregularity in Scheme Y"). **', '** Identify *which* mechanism exposed it (CAG → PAC → Parliament). **', '** Trace the chain: CAG (independent auditor) → Report tabled in Parliament → Public Accounts Committee (MPs from all.', '** Ask: "Could an election have caught this specific irregularity?" No — elections are too blunt.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_002', difficulty: 'standard',
          question: 'Economic Growth and Development Under Democracy refers to the relationship.',
          hint: 'Revisit c10_eco_cbse_01_001 (Development Indicators) and c9_civ_ch1_7 (Accountability.',
          misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook.',
          parts: [
                { id: 'a', prompt: 'A country transitions from military dictatorship to democracy.', answer: 'The growth decline reflects democratic transition costs: policy uncertainty, new',
                  options: ['The growth decline reflects democratic transition costs: policy uncertainty, new', 'democracy failed', 'democracy guarantees economic development', 'dictatorship is better for growth'],
                  hint: 'Revisit c10_eco_cbse_01_001 (Development Indicators) and c9_civ_ch1_7 (Accountability in Democracy).',
                  misconception: 'Students believe "democracy guarantees economic development" or "dictatorship is better for growth." The textbook shows: (1) Democracies.' }
          ],
            remediations: { 'democracy-guarantees-economic-development-or': { steps: ['Re-read the textbook table comparing growth rates (1950-2000) — note the 0.47% difference is small compared.', 'Watch the 5-minute video "Democracy and Development: The Evidence" (NCERT official) showing Botswana (democracy, high.', 'Write a 50-word answer: "Democracy does not guarantee high growth but prevents catastrophic failure and ensures gains.', 'Practice the 2023 CBSE sample paper Q12 (case-based on Kerala vs Gujarat development models).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_003', difficulty: 'standard',
          question: 'Reduction of inequality and poverty in democracies refers to the expectation.',
          hint: 'Revisit Class 7 node c7_civ_ch02_009 (Directive Principles) and Class 10 node.',
          misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor.',
          parts: [
                { id: 'a', prompt: 'Explain why democracies are theoretically more likely to adopt redistributive policies than authoritarian regimes, even though both may face poverty.', answer: 'In democracies, the poor constitute a large voting bloc',
                  options: ['In democracies, the poor constitute a large voting bloc', 'democracies are kinder', 'majority rule means poor majority gets what it wants'],
                  hint: 'Revisit Class 7 node c7_civ_ch02_009 (Directive Principles) and Class 10 node c10_civ_cbse_05_001.',
                  misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor majority gets what.' },
                { id: 'b', prompt: 'A state government launches a new cash-transfer scheme for landless agricultural laborers.', answer: 'Mechanism: Electoral accountability',
                  options: ['Mechanism: Electoral accountability', 'bureaucratic efficiency', 'majority rule means poor majority gets what it wants'],
                  hint: 'Revisit Class 7 node c7_civ_ch02_009 (Directive Principles) and Class 10 node c10_civ_cbse_05_001.',
                  misconception: 'Students often believe democracy automatically reduces both inequality and poverty because "majority rule means poor majority gets what.' }
          ],
            remediations: { 'democracy-automatically-reduces-both-inequality': { steps: ['Show the Oxfam India 2023 inequality report graph — rising top 1% share alongside falling poverty headcount.', 'Ask student to list three democratic mechanisms that *should* have prevented this (e.g., progressive tax, welfare, land.', 'For each, identify the breakdown (e.g., tax evasion, exclusion errors in PDS, weak land reform enforcement).', 'Conclude: Democracy provides tools, but outcomes depend on state capacity and citizen organization.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_004', difficulty: 'standard',
          question: 'Accommodation of social diversity in democratic systems refers to the.',
          hint: 'Revisit c9_civ_ch1_9 (Federalism) for territorial mechanisms and.',
          misconception: 'Students often believe "accommodation of diversity" means only **reservations (quotas) for SCs/STs/OBCs**.',
          parts: [
                { id: 'a', prompt: 'What are the two constitutional articles that specifically protect the cultural and educational rights of minorities in India?', answer: 'Articles 29 and 30',
                  options: ['Articles 29 and 30', 'accommodation of diversity'],
                  hint: 'Revisit c9_civ_ch1_9 (Federalism) for territorial mechanisms and c8_civ_ch4_6/c8_civ_ch4_11.',
                  misconception: 'Students often believe "accommodation of diversity" means only **reservations (quotas) for SCs/STs/OBCs**.' }
          ],
            remediations: { 'accommodation-of-diversity-means-only': { steps: ['Have the student create a 4-column table: **Mechanism | Constitutional Basis | Target Group | Example**.', 'Fill row 1: Linguistic States | Article 3 | Major language groups | Andhra Pradesh (Telugu), Maharashtra (Marathi).', 'Ask: "Which mechanism helps a small linguistic minority that doesn\'t have a contiguous territory?" Guide them.', 'Assign a 3-mark practice question: "Explain two non-reservation mechanisms for accommodating diversity in India."'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_005', difficulty: 'standard',
          question: 'Dignity and Freedom of Citizens in a Democracy refers to the constitutional.',
          hint: 'Revisit Article 21 (Right to Life and Personal Liberty) and its expansive interpretation.',
          misconception: 'Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake news, or incitement.',
          parts: [
                { id: 'a', prompt: 'Name the constitutional article that empowers the Supreme Court to issue writs for the enforcement of Fundamental Rights.', answer: 'Article 32',
                  options: ['Article 32', 'freedom of speech', 'democracy means total freedom', 'reasonable restrictions'],
                  hint: 'Revisit Article 21 (Right to Life and Personal Liberty) and its expansive interpretation by the.',
                  misconception: 'Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake news, or incitement to violence are.' },
                { id: 'b', prompt: 'A state government bans all public protests in the capital city indefinitely citing “law and order.” Which Fundamental Right is primarily restricted, and what.', answer: 'The right restricted is Freedom of Assembly under Article 19(1)(b)',
                  options: ['The right restricted is Freedom of Assembly under Article 19(1)(b)', 'the government can ban anything for law and order', 'freedom of speech', 'democracy means total freedom'],
                  hint: 'Revisit Article 21 (Right to Life and Personal Liberty) and its expansive interpretation by the.',
                  misconception: 'Students believe “freedom of speech” in a democracy is absolute — they argue hate speech, fake news, or incitement to violence are.' }
          ],
            remediations: { 'freedom-of-speech-in-a': { steps: ['Show the Supreme Court’s 2023 judgment in *Shaheen Abdullah v.', 'Read Article 19(2) together — list the eight grounds for restriction.', 'Discuss a recent news item (e.g., social media regulation) and ask: “Which ground of restriction applies here?”', 'Have the student rewrite a flawed answer inserting the phrase “subject to reasonable restrictions under Article 19(2).”'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c10_civ_cbse_05_006', difficulty: 'standard',
          question: 'Democracy\'s strengths include accountability, responsiveness, legitimacy.',
          hint: 'If stuck, revisit c7_civ_ch01_010 (Comparison of Different Types of Government) and the.',
          misconception: 'Students often think "democracy is weak because it is slow" and "dictatorship is strong because it is fast," ignoring.',
          parts: [
                { id: 'a', prompt: 'A country switches from democracy to military rule. The new regime claims it will reduce corruption by removing political parties.', answer: 'Unlikely',
                  options: ['Unlikely', 'democracy is weak', 'dictatorship is strong'],
                  hint: 'If stuck, revisit c7_civ_ch01_010 (Comparison of Different Types of Government) and the summary.',
                  misconception: 'Students often think "democracy is weak because it is slow" and "dictatorship is strong because it is fast," ignoring that democracy’s.' }
          ],
            remediations: { 'democracy-is-weak-because-it': { steps: ['Re-read the case of India’s 1975-77 Emergency (a democratic suspension) vs.', 'Compare with a dictatorship (e.g., North Korea) where no such feedback exists.', 'Use the table in NCERT Chapter 7 (Outcomes of Democracy) to list each strength/weakness with Indian evidence.', 'Practice writing a 3-mark answer: "Explain why democracy is considered better than dictatorship despite slower.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
