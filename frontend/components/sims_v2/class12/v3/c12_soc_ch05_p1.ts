import type { SimDef } from '../../engine/types';

/** v3 generated — c12_soc_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_soc_ch05_p1: SimDef = {
    id: 'v3_c12_soc_ch05_p1',
    title: 'Pattern of Social Inequality and Exclusion · Part 1/2',
    subtitle: 'Why the gap keeps reproducing itself',
    classLevel: 12, subject: 'sociology', topic: 'Pattern of Social Inequality and Exclusion · Part 1/2',
    chapters: ['c12_soc_ch05'],
    nodeIds: ['c12_soc_cbse_05_001', 'c12_soc_cbse_05_002', 'c12_soc_cbse_05_003', 'c12_soc_cbse_05_004', 'c12_soc_cbse_05_005', 'c12_soc_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Inequality researcher', intro: 'Two kids, one neighbourhood, different planets — sociology asks who built the planets.', goal: 'Distinguish social inequality from individual differences and from stratification, using Bourdieu\'s three capitals.' },
    discovery: {
        question: 'A wealthy Dalit businessman can buy the car, the house and the club membership — yet still be refused entry to a temple and a marriage alliance. If money fixed inequality, what just failed?',
        options: ['Economic capital is only one of three capitals — cultural and social capital move through networks his money can\'t force open', 'Nothing — wealth always buys status', 'The temple was breaking the law, that\'s all', 'He needed to work harder'],
        answer: 'Economic capital is only one of three capitals — cultural and social capital move through networks his money can\'t force open',
        hook: 'Social inequality isn\'t income inequality — it\'s group-patterned, inherited across generations and defended by ideologies that call it fair. Cash transfers can lift poverty without touching the hierarchy that produced it.',
    },
    teaching: [
        { title: 'Social Inequality: Definition, Forms and the Difference Between Inequality and Stratification', text: 'Social inequality refers to the systematic, group-based unequal distribution of valued social resources (economic capital, cultural capital, social capital) among categories of people in a society.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_soc_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Audit two children\'s life chances using three forms of capital, then test whether the difference you find is individual bad luck or a machine built to repeat itself.',
        labels: ['Social Inequality: Definition, Forms', 'Prejudice, Stereotype and Discrimination', 'Social Exclusion: Definition, Attributes', 'Caste as an Institution', 'Constitutional and Legal Safeguards', 'Adivasis: Definition, Displacement'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_001', title: 'Social Inequality: Definition, Forms and the Difference Between Inequality and Stratification',
          caseStudy: { intro: 'Imagine two children in your neighbourhood: one attends a well-funded private school with extracurricular activities, while the other works at a tea stall.',
            decisions: [{ prompt: 'Define social inequality in one sentence, emphasising how it differs from individual inequality.', options: [
                { text: 'Social inequality is the systematic, group-based unequal distribution of valued social', outcome: 'Social inequality is the systematic, group-based unequal distribution of valued social resources.' },
                { text: 'differences in income or talent between individuals', outcome: 'Not quite — Students often equate social inequality with income inequality alone, writing answers like “Social.', reveals: 'students-often-equate-social-inequality' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_002', title: 'Prejudice, Stereotype and Discrimination: The Mechanisms of Social Exclusion',
          caseStudy: { intro: 'Imagine a job interview where a qualified candidate is rejected because the employer assumes "people from that community are lazy" — this single situation.',
            decisions: [{ prompt: 'Define prejudice, stereotype, and discrimination in one sentence each, using the NCERT distinction between attitude, cognition, and.', options: [
                { text: 'Prejudice is a pre-judgement or attitude (positive/negative) toward a group without', outcome: 'Prejudice is a pre-judgement or attitude (positive/negative) toward a group without evidence.' },
                { text: 'prejudice is discrimination', outcome: 'Not quite — Students believe prejudice, stereotype, and discrimination are synonyms or always occur together.', reveals: 'prejudice' },
                { text: 'Distinguish between', outcome: 'Not quite — Students believe prejudice, stereotype, and discrimination are synonyms or always occur together.', reveals: 'prejudice' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_005', title: 'Constitutional and Legal Safeguards for Dalits: SC/ST Prevention of Atrocities Act',
          caseStudy: { intro: 'Imagine a Dalit family in rural Uttar Pradesh is denied access to the village handpump, forced to perform manual scavenging, and when they protest, their house.',
            decisions: [{ prompt: 'What are the three constitutional articles that directly abolish untouchability, enable protective discrimination in education, and enable.', options: [
                { text: 'Article 17 abolishes untouchability', outcome: 'Article 17 abolishes untouchability; Article 15(4) enables special provisions for.' },
                { text: 'the Atrocities Act only covers physical violence (murder, assault)', outcome: 'Not quite — Students often believe the Atrocities Act only covers physical violence (murder, assault).', reveals: 'the-atrocities-act-only-covers' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_006', title: 'Adivasis: Definition, Displacement and the Question of Alienation from Land and Forest',
          caseStudy: { intro: 'Imagine a community that has lived in the Narmada valley for centuries, farming small plots, collecting forest produce, worshipping river and hill deities.',
            decisions: [{ prompt: 'Define the term \'Adivasi\' and name two constitutional provisions that specifically address Scheduled Tribes.', options: [
                { text: 'Adivasi means \'original inhabitants\'', outcome: 'Adivasi means \'original inhabitants\' — a political identity adopted in the 1930s by tribal.' },
                { text: 'all forest-dwellers are Adivasis', outcome: 'Not quite — Students often believe Adivasis are a homogeneous, primitive group who \'need development\' and that.', reveals: 'adivasis-are-a-homogeneous' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A landlord refuses a student tenant saying \'people from that community are trouble — I had a bad experience once, so this isn\'t prejudice, it\'s pattern recognition.\'',
            decisions: [{ prompt: 'How do the three concepts map onto this refusal?', options: [
                { text: 'All three at once — \'they\'re trouble\' is the stereotype, the hostile pre-judgment of this applicant is prejudice, and the refusal is discrimination; one past incident doesn\'t make it evidence — prejudice is defined by resisting counter-evidence and generalising a group onto an individual.', outcome: 'The chapter\'s triad: cognition (fixed group trait), attitude (pre-judgment), behaviour (denial) — \'experience\' is the rationalisation prejudice wears, not an exemption from it.' },
                { text: 'He\'s right — real experience converts prejudice into reasonable caution.', outcome: 'Prejudice is judged by what it does, not what it cites — applying one incident to every member of a group is the generalisation mechanism itself; experience is the story the stereotype tells.', reveals: 'experience-excuses-prejudice' },
                { text: 'Only discrimination occurred — the thought and the feeling don\'t count until the law is broken.', outcome: 'The concepts mark the chain, not just the endpoint — the stereotype and the prejudice are what produced the refusal; treating only the act ignores how exclusion is manufactured upstream.', reveals: 'only-the-act-counts' }
            ] }] } },
        { type: 'case', nodeId: 'c12_soc_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate inequality (the gap) from stratification (the machinery that keeps the gap) — and spot the meritocracy story hiding inside it.',
            decisions: [{ prompt: 'What comes next? Pattern of Social Inequality and Exclusion · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Pattern of Social Inequality and Exclusion · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_001', difficulty: 'standard',
          question: 'Social inequality refers to the systematic, group-based unequal distribution.',
          hint: 'Revisit c11_soc_cbse_06_002 (Social Stratification: Structured Inequalities) and.',
          misconception: 'Students often equate social inequality with income inequality alone, writing answers like “Social inequality means.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social inequality refers to the systematic, group-based unequal distribution of valued',
                  options: ['Social inequality refers to the systematic, group-based unequal distribution of valued', 'Prejudice is a pre-conceived opinion or attitude held by members of one group towards', 'Social exclusion is a systematic process by which individuals or groups are denied full', 'Caste as an institution of exclusion refers to a hereditary, endogamous social'],
                  hint: 'Revisit c11_soc_cbse_06_002 (Social Stratification: Structured Inequalities) and.',
                  misconception: 'Students often equate social inequality with income inequality alone, writing answers like “Social inequality means some people earn more.' }
          ],
            remediations: { 'students-often-equate-social-inequality': { steps: ['If a student holds this misconception, do the following: (1) Have them re-read the Bourdieu paragraph in NCERT (p.71).', '(2) Assign Activity 5.1 (diary comparison) with a specific focus on cultural and social capital differences between the.', '(3) Ask them to write a 100-word explanation of why a rich Dalit may still be “socially unequal” to a rich upper-caste.', '(4) Re-diagnose with Diagnostic Question 3 to check if they now identify all three capitals.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_002', difficulty: 'standard',
          question: 'Prejudice is a pre-conceived opinion or attitude held by members of one group.',
          hint: 'Revisit c12_soc_cbse_05_001, specifically the three principles of social stratification.',
          misconception: 'Students believe prejudice, stereotype, and discrimination are synonyms or always occur together in that order.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Prejudice is a pre-conceived opinion or attitude held by members of one group towards',
                  options: ['Prejudice is a pre-conceived opinion or attitude held by members of one group towards', 'Social inequality refers to the systematic, group-based unequal distribution of valued', 'Social exclusion is a systematic process by which individuals or groups are denied full', 'Caste as an institution of exclusion refers to a hereditary, endogamous social'],
                  hint: 'Revisit c12_soc_cbse_05_001, specifically the three principles of social stratification.',
                  misconception: 'Students believe prejudice, stereotype, and discrimination are synonyms or always occur together in that order.' }
          ],
            remediations: { 'prejudice': { steps: ['Have the student write the three definitions side-by-side using NCERT keywords: "pre-judgement/attitude", "fixed.', 'Give three micro-scenarios (one for each mechanism operating alone) and ask the student to label which mechanism.', 'Re-attempt Diagnostic Question 2 and 3.', 'If still stuck, revisit **c11_soc_cbse_04_006** (Ethnocentrism) to see how "cultural superiority" beliefs function.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_003', difficulty: 'standard',
          question: 'Social exclusion is a systematic process by which individuals or groups are.',
          hint: 'Revisit c11_soc_cbse_06_002 (structured inequalities) and c11_soc_cbse_06_003 (three.',
          misconception: 'Students equate social exclusion with \'being left out\' in everyday sense (e.g., not invited to a party) or with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Social exclusion is a systematic process by which individuals or groups are denied full',
                  options: ['Social exclusion is a systematic process by which individuals or groups are denied full', 'Social inequality refers to the systematic, group-based unequal distribution of valued', 'Prejudice is a pre-conceived opinion or attitude held by members of one group towards', 'Caste as an institution of exclusion refers to a hereditary, endogamous social'],
                  hint: 'Revisit c11_soc_cbse_06_002 (structured inequalities) and c11_soc_cbse_06_003 (three forms.',
                  misconception: 'Students equate social exclusion with \'being left out\' in everyday sense (e.g., not invited to a party) or with \'poverty\'.' }
          ],
            remediations: { 'students-equate-social-exclusion-with': { steps: ['If a student conflates exclusion with poverty or interpersonal rejection: Step 1 — Ask them to list 5 things a poor.', 'Step 2 — Map each to economic/cultural/social capital.', 'Step 3 — Have them re-read NCERT para on "What is Social About Social Inequality and Exclusion?" and underline the.', 'Step 4 — Give a mini-case: "A rich Dalit businessman vs poor Brahmin priest — who faces more social exclusion?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_004', difficulty: 'standard',
          question: 'Caste as an institution of exclusion refers to a hereditary, endogamous social.',
          hint: 'If stuck, revisit c11_soc_cbse_02_003 (Social Stratification: Caste, Class and Gender).',
          misconception: 'Students often equate untouchability *only* with physical touch avoidance (e.g., \'not touching Dalits\'), ignoring the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Caste as an institution of exclusion refers to a hereditary, endogamous social',
                  options: ['Caste as an institution of exclusion refers to a hereditary, endogamous social', 'Social inequality refers to the systematic, group-based unequal distribution of valued', 'Prejudice is a pre-conceived opinion or attitude held by members of one group towards', 'Social exclusion is a systematic process by which individuals or groups are denied full'],
                  hint: 'If stuck, revisit c11_soc_cbse_02_003 (Social Stratification: Caste, Class and Gender) and focus.',
                  misconception: 'Students often equate untouchability *only* with physical touch avoidance (e.g., \'not touching Dalits\'), ignoring the NCERT\'s emphasis.' }
          ],
            remediations: { 'students-often-equate-untouchability-only': { steps: ['Re-read NCERT pages 75-80 focusing on the three dimensions — make a table with columns: Dimension, NCERT Example.', 'Revisit node c12_soc_cbse_05_003 (Social Exclusion) to distinguish *systematic* exclusion from individual prejudice.', 'Watch the 10-min clip \'India Untouched\' (YouTube) and note every instance of *non-touch* exclusion (water, temple.', 'Re-attempt Diagnostic Question 2 with this new data.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_005', difficulty: 'standard',
          question: 'The Scheduled Castes and Scheduled Tribes (Prevention of Atrocities) Act, 1989.',
          hint: 'Revisit c11_ps_cbse_11_004 (Articles 15(4), 16(4), 17) and c11_ps_cbse_11_010 (Article.',
          misconception: 'Students often believe the Atrocities Act only covers physical violence (murder, assault).',
          parts: [
                { id: 'a', prompt: 'What are the three constitutional articles that directly abolish untouchability, enable protective discrimination in education, and enable protective.', answer: 'Article 17 abolishes untouchability',
                  options: ['Article 17 abolishes untouchability', 'the Atrocities Act only covers physical violence (murder, assault)'],
                  hint: 'Revisit c11_ps_cbse_11_004 (Articles 15(4), 16(4), 17) and c11_ps_cbse_11_010 (Article 32) — focus.',
                  misconception: 'Students often believe the Atrocities Act only covers physical violence (murder, assault).' },
                { id: 'b', prompt: 'Explain in your own words why the SC/ST (Prevention of Atrocities) Act, 1989 was necessary even though Article 17 of the Constitution already abolished.', answer: 'Article 17 is a declaratory constitutional provision without penal sanctions or',
                  options: ['Article 17 is a declaratory constitutional provision without penal sanctions or', 'Article 17 wasn\'t strong enough', 'the Atrocities Act only covers physical violence (murder, assault)'],
                  hint: 'Revisit c11_ps_cbse_11_004 (Articles 15(4), 16(4), 17) and c11_ps_cbse_11_010 (Article 32) — focus.',
                  misconception: 'Students often believe the Atrocities Act only covers physical violence (murder, assault).' },
                { id: 'c', prompt: 'Compare the institutional mechanisms for monitoring SC/ST safeguards: National Commission for Scheduled Castes (Article 338) vs.', answer: 'NCSC (Art',
                  options: ['NCSC (Art', 'the Atrocities Act only covers physical violence (murder, assault)'],
                  hint: 'Revisit c11_ps_cbse_11_004 (Articles 15(4), 16(4), 17) and c11_ps_cbse_11_010 (Article 32) — focus.',
                  misconception: 'Students often believe the Atrocities Act only covers physical violence (murder, assault).' }
          ],
            remediations: { 'the-atrocities-act-only-covers': { steps: ['Re-read NCERT Box 5.3 (p. 80-81) listing constitutional articles and the 1989 Act\'s key features.', 'Create a two-column table: Column A = Constitutional Provision (Art.', 'For each of the 22+ offences in Section 3(1), write a one-line real-world example.', 'Re-attempt Diagnostic Q3 and Q6. If stuck on offence identification, revisit c12_soc_cbse_05_004 (untouchability forms).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_005', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the Atrocities Act only covers physical violence (murder, assault).',
          parts: [
                { id: 'a', prompt: 'Critically evaluate: "The 2015 Amendment to the Atrocities Act, which added new offences and established Exclusive Special Courts, has significantly reduced.', answer: 'Evaluation: The claim is not fully supported',
                  options: ['Evaluation: The claim is not fully supported', 'the Atrocities Act only covers physical violence (murder, assault)'],
                  hint: 'Revisit c11_ps_cbse_11_004 (Articles 15(4), 16(4), 17) and c11_ps_cbse_11_010 (Article 32) — focus.',
                  misconception: 'Students often believe the Atrocities Act only covers physical violence (murder, assault).' }
          ],
            remediations: { 'the-atrocities-act-only-covers': { steps: ['Re-read NCERT Box 5.3 (p. 80-81) listing constitutional articles and the 1989 Act\'s key features.', 'Create a two-column table: Column A = Constitutional Provision (Art.', 'For each of the 22+ offences in Section 3(1), write a one-line real-world example.', 'Re-attempt Diagnostic Q3 and Q6. If stuck on offence identification, revisit c12_soc_cbse_05_004 (untouchability forms).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_soc_cbse_05_006', difficulty: 'standard',
          question: 'Adivasis (literally \'original inhabitants\') are indigenous tribal communities.',
          hint: 'Revisit c12_soc_cbse_05_003 (Social Exclusion: Definition, Attributes) and.',
          misconception: 'Students often believe Adivasis are a homogeneous, primitive group who \'need development\' and that displacement.',
          parts: [
                { id: 'a', prompt: 'Define the term \'Adivasi\' and name two constitutional provisions that specifically address Scheduled Tribes.', answer: 'Adivasi means \'original inhabitants\'',
                  options: ['Adivasi means \'original inhabitants\'', 'all forest-dwellers are Adivasis'],
                  hint: 'Revisit c12_soc_cbse_05_003 (Social Exclusion: Definition, Attributes) and c11_soc_cbse_08_003.',
                  misconception: 'Students often believe Adivasis are a homogeneous, primitive group who \'need development\' and that displacement is solved by monetary.' },
                { id: 'b', prompt: 'Compare the British Indian Forest Act 1878 and the post-independence Land Acquisition Act 1894 (amended 2013) in terms of how each enabled Adivasi land.', answer: 'Continuity: Both laws centralized state control over land/forest, converting',
                  options: ['Continuity: Both laws centralized state control over land/forest, converting', 'all forest-dwellers are Adivasis'],
                  hint: 'Revisit c12_soc_cbse_05_003 (Social Exclusion: Definition, Attributes) and c11_soc_cbse_08_003.',
                  misconception: 'Students often believe Adivasis are a homogeneous, primitive group who \'need development\' and that displacement is solved by monetary.' }
          ],
            remediations: { 'adivasis-are-a-homogeneous': { steps: ['If the student holds this misconception: (1) Have them re-read the textbook\'s distinction between \'displacement\'.', '(2) Assign the Sardar Sarovar case: list 5 non-monetary losses (e.g., access to river for fishing, sacred groves.', '(3) Ask: "If you were paid ₹10 lakh to never visit your hometown, worship at your family temple, or speak your mother.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
