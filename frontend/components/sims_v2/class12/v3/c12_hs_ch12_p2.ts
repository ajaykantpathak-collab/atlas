import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch12_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch12_p2: SimDef = {
    id: 'v3_c12_hs_ch12_p2',
    title: 'Communication and Extension · Part 2/2',
    subtitle: 'A lecture that changed nothing — and why',
    classLevel: 12, subject: 'home_science', topic: 'Communication and Extension · Part 2/2',
    chapters: ['c12_hs_ch12'],
    nodeIds: ['c12_hs_cbse_12_007', 'c12_hs_cbse_12_008', 'c12_hs_cbse_12_009', 'c12_hs_cbse_12_010', 'c12_hs_cbse_12_011', 'c12_hs_cbse_12_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Extension programme designer', intro: 'The village sells its nutritious crops and buys polished rice. Extension begins by asking why — not by telling.', goal: 'Distinguish extension\'s participatory, problem-solving philosophy from formal education\'s classroom model.' },
    discovery: {
        question: 'A worker lectures thirty mothers on breastfeeding with slides; they listen silently and leave. Information delivered — so why isn\'t this extension education?',
        options: ['It violated the philosophy — teacher-centred, expert-agenda, no participation; extension starts where the people are, not where the PowerPoint begins', 'The topic was wrong', 'Mothers were tired', 'No projector budget'],
        answer: 'It violated the philosophy — teacher-centred, expert-agenda, no participation; extension starts where the people are, not where the PowerPoint begins',
        hook: 'Extension\'s scope isn\'t just agriculture — it spans health, home science and community development as one participatory weave. And the real test is behaviour change and self-reliance, not awareness: a lecture measured by attendance is formal education in a field.',
    },
    teaching: [
        { title: 'Panchayati Raj Institutions and Their Role in Development', text: 'Panchayati Raj Institutions (PRIs) are the constitutionally mandated three-tier system of rural local self-government in India (Gram Panchayat at village level, Panchayat Samiti at block level, Zila.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_12_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build an anaemia programme the extension way: needs assessment with the girls themselves, map local iron-rich foods, facilitate recipe trials — and spot why \'give tablets and lecture\' misses the point.',
        labels: ['Panchayati Raj Institutions', 'Participatory Approaches: PRA Techniques', 'Programme Planning: Steps, Principles', 'Programme Evaluation: Types, Criteria', 'Extension Worker: Qualities, Roles', 'Home Science Extension: Scope'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_008', title: 'Participatory Approaches: PRA Techniques and Community Participation',
          caseStudy: { intro: 'Imagine you are an extension worker visiting a village where farmers report declining crop yields.',
            decisions: [{ prompt: 'What is the fundamental difference between Participatory Rural Appraisal (PRA) and the earlier Rapid Rural Appraisal (RRA) in terms of who.', options: [
                { text: 'In PRA, the community owns the information and drives the analysis, while the outsider', outcome: 'In PRA, the community owns the information and drives the analysis, while the outsider facilitates.' },
                { text: 'PRA is just faster RRA', outcome: 'Not quite — Students often think PRA is just a set of data-collection tools (like drawing maps or calendars).', reveals: 'pra-is-just-a-set' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_009', title: 'Programme Planning: Steps, Principles and Programme Cycle',
          caseStudy: { intro: 'Imagine you are an extension worker in a village where farmers are losing crops to pests but don\'t know integrated pest management (IPM).',
            decisions: [{ prompt: 'What is the FIRST step in the programme planning process according to the NCERT Class 12 Home Science textbook?', options: [
                { text: 'The first step is Situation Analysis (or "Understanding the Situation")', outcome: 'The first step is Situation Analysis (or "Understanding the Situation").' },
                { text: 'Setting objectives', outcome: 'Not quite — Students think programme planning is a one-time linear checklist ending at evaluation.', reveals: 'programme-planning-is-a-one' },
                { text: 'Identifying needs', outcome: 'Not quite — Students think programme planning is a one-time linear checklist ending at evaluation.', reveals: 'programme-planning-is-a-one' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_010', title: 'Programme Evaluation: Types, Criteria and Indicators',
          caseStudy: { intro: 'Imagine you are an extension worker who just finished a 6-month "Nutrition Garden" programme in a tribal village.',
            decisions: [{ prompt: 'Define "programme evaluation" in the context of extension education. How does it differ from "monitoring"?', options: [
                { text: 'Programme evaluation is the systematic assessment of a programme\'s design,', outcome: 'Programme evaluation is the systematic assessment of a programme\'s design, implementation, and.' },
                { text: 'monitoring vs evaluation', outcome: 'Not quite — Students often believe "evaluation happens only at the end of a programme" and equate it with.', reveals: 'evaluation-happens-only-at-the' },
                { text: 'evaluation happens only at the end of a programme', outcome: 'Not quite — Students often believe "evaluation happens only at the end of a programme" and equate it with.', reveals: 'evaluation-happens-only-at-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_011', title: 'Extension Worker: Qualities, Roles and Professional Development',
          caseStudy: { intro: 'Imagine you are posted as a fresh Home Science graduate in a Krishi Vigyan Kendra in a tribal block of Jharkhand.',
            decisions: [{ prompt: 'List any four personal qualities an extension worker must possess to gain trust in a conservative rural community, and explain why each.', options: [
                { text: 'Correct answer: Empathy (to understand unspoken constraints like gender norms), patience', outcome: 'Correct answer: Empathy (to understand unspoken constraints like gender norms), patience (behaviour.' },
                { text: 'qualities', outcome: 'Not quite — Students equate "extension worker qualities" with academic qualifications (M.Sc.', reveals: 'students-equate-extension-worker-qualities' },
                { text: 'qualifications', outcome: 'Not quite — Students equate "extension worker qualities" with academic qualifications (M.Sc.', reveals: 'students-equate-extension-worker-qualities' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_012', title: 'Home Science Extension: Scope and Application in Community Settings',
          caseStudy: { intro: 'Imagine you bought a branded pressure cooker online that exploded during first use, causing burns — the manufacturer refuses replacement claiming "improper.',
            decisions: [{ prompt: 'Define "consumer" as per the Consumer Protection Act framework and distinguish it from a "customer" who purchases for resale or commercial.', options: [
                { text: 'A consumer is the final buyer of goods/services for personal/family use, not for resale', outcome: 'A consumer is the final buyer of goods/services for personal/family use, not for resale.' },
                { text: 'ISI mark guarantees 100% defect-free product', outcome: 'Not quite — Students believe "ISI mark guarantees 100% defect-free product" and "Hallmark on gold means.', reveals: 'isi-mark-guarantees-100-defect' },
                { text: 'Hallmark on gold means government buys back at same price', outcome: 'Not quite — Students believe "ISI mark guarantees 100% defect-free product" and "Hallmark on gold means.', reveals: 'isi-mark-guarantees-100-defect' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_12_008', title: 'Identify each idea',
          dissect: { specimen: 'Communication and Extension · Part 2/2', spots: [
            { id: 's1', label: 'Panchayati Raj Institutions and Their Role in Development', prompt: 'Which idea is this? — Panchayati Raj Institutions (PRIs) are the constitutionally mandated three-tier system.', answer: 'Panchayati Raj Institutions and Their Role in Development', options: ['Panchayati Raj Institutions and Their Role in Development', 'Programme Planning Steps Principles and Programme Cycle', 'Programme Evaluation Types Criteria and Indicators'] },
            { id: 's2', label: 'Programme Planning Steps Principles and Programme Cycle', prompt: 'Which idea is this? — Programme planning in extension education is a systematic, participatory process.', answer: 'Programme Planning Steps Principles and Programme Cycle', options: ['Programme Planning Steps Principles and Programme Cycle', 'Panchayati Raj Institutions and Their Role in Development', 'Programme Evaluation Types Criteria and Indicators'] },
            { id: 's3', label: 'Programme Evaluation Types Criteria and Indicators', prompt: 'Which idea is this? — Programme evaluation in extension education is the systematic and objective assessment.', answer: 'Programme Evaluation Types Criteria and Indicators', options: ['Programme Evaluation Types Criteria and Indicators', 'Panchayati Raj Institutions and Their Role in Development', 'Programme Planning Steps Principles and Programme Cycle'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_007', title: 'Use it in the wild',
          caseStudy: { intro: 'An agriculture officer pushes a high-yield paddy variety into a low-rainfall district because it topped the state trial charts. The first crop fails; next season, nobody turns up to her demonstrations. She concludes \'farmers here are resistant to science.\'',
            decisions: [{ prompt: 'Which extension principles broke down?', options: [
                { text: 'Adaptability first, then satisfaction — a variety proven for 1500 mm rainfall isn\'t adaptable to a 700 mm zone, and the failed crop destroyed the visible benefit that keeps farmers coming; she read the dropout as stubbornness when it was the feedback loop doing its job.', outcome: 'The chapter links the two: unadapted advice produces no tangible gain, and no gain means no trust — \'resistant to science\' misnames a community that was failed by unadapted science.' },
                { text: 'The farmers were resistant — proven yields should have been adopted on faith.', outcome: 'Extension doesn\'t run on faith — adoption follows demonstrated local benefit; a state-level trial chart isn\'t local proof, and the first season\'s failure confirmed for them exactly what their conditions predicted.', reveals: 'faith-equals-evidence' },
                { text: 'She should have used louder promotion — better posters and a bigger launch event.', outcome: 'Promotion solves awareness, not fit — the seed was wrong for the zone, so amplifying the message amplifies the failure; principles are operational guides, not marketing volume.', reveals: 'promotion-equals-adaptation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_12_012', title: 'You made it',
          caseStudy: { intro: 'You can now tell education for life from education in a classroom — where the learner is partner, not audience.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_007', difficulty: 'standard',
          question: 'Panchayati Raj Institutions (PRIs) are the constitutionally mandated three-tier.',
          hint: 'If stuck, revisit the \'Eleventh Schedule mapping exercise\' in c11_ps_cbse_17_003 — create.',
          misconception: 'Students often think Panchayati Raj is only about \'building roads and drains\' — they miss that 11 of the 29 Eleventh.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Panchayati Raj Institutions (PRIs) are the constitutionally mandated three-tier system of',
                  options: ['Panchayati Raj Institutions (PRIs) are the constitutionally mandated three-tier system of', 'Extension Education is an applied behavioural science that brings about desirable changes', 'Principles of Extension Education are foundational guidelines that ensure effective', 'Communication in extension is the systematic, two-way exchange of information, ideas, and'],
                  hint: 'If stuck, revisit the \'Eleventh Schedule mapping exercise\' in c11_ps_cbse_17_003 — create.',
                  misconception: 'Students often think Panchayati Raj is only about \'building roads and drains\' — they miss that 11 of the 29 Eleventh Schedule items.' }
          ],
            remediations: { 'panchayati-raj-is-only-about': { steps: ['Revisit c11_ps_cbse_17_003 (73rd Amendment) and c11_ps_cbse_17_004 (Three-tier structure) — make a table of 29 Eleventh.', 'Revisit c12_hs_cbse_12_006 (Community Development) — note how \'participatory planning\' maps to Gram Sabha.', 'Take a blank map of your district; mark one Gram Panchayat, its Panchayat Samiti, and Zila Parishad.', 'Re-attempt Diagnostic Questions 3 and 5. If still stuck, discuss with teacher using the \'3Fs\' framework (functions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_008', difficulty: 'standard',
          question: 'Participatory Rural Appraisal (PRA) is a family of approaches and methods that.',
          hint: 'Revisit c12_hs_cbse_12_001 (Extension Education: Meaning, Philosophy and Scope) and.',
          misconception: 'Students often think PRA is just a set of data-collection tools (like drawing maps or calendars) that produce pretty.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Participatory Rural Appraisal (PRA) is a family of approaches and methods that enable',
                  options: ['Participatory Rural Appraisal (PRA) is a family of approaches and methods that enable', 'Extension Education is an applied behavioural science that brings about desirable changes', 'Principles of Extension Education are foundational guidelines that ensure effective', 'Communication in extension is the systematic, two-way exchange of information, ideas, and'],
                  hint: 'Revisit c12_hs_cbse_12_001 (Extension Education: Meaning, Philosophy and Scope) and.',
                  misconception: 'Students often think PRA is just a set of data-collection tools (like drawing maps or calendars) that produce pretty visuals for project.' }
          ],
            remediations: { 'pra-is-just-a-set': { steps: ['If a student treats PRA as a toolbox without the facilitator mindset: 1) Have them observe a video of a real PRA.', '2) Role-play: student acts as facilitator while peers act as villagers; debrief on who held the pen, who spoke, who.', '3) Revisit node c12_hs_cbse_12_003 (SMCRE Model) to contrast source-dominated vs receiver-dominated communication.', '4) Re-diagnose with a scenario: "You see a villager drawing a map upside down.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_009', difficulty: 'standard',
          question: 'Programme planning in extension education is a systematic, participatory.',
          hint: 'Revisit Class 11 Resource Management nodes c11_hs_cbse_04_008 and c11_hs_cbse_04_009.',
          misconception: 'Students think programme planning is a one-time linear checklist ending at evaluation.',
          parts: [
                { id: 'a', prompt: 'What is the FIRST step in the programme planning process according to the NCERT Class 12 Home Science textbook?', answer: 'The first step is Situation Analysis (or "Understanding the Situation")',
                  options: ['The first step is Situation Analysis (or "Understanding the Situation")', 'Setting objectives', 'Identifying needs', 'programme planning is a one-time linear checklist ending at evaluation'],
                  hint: 'Revisit Class 11 Resource Management nodes c11_hs_cbse_04_008 and c11_hs_cbse_04_009 — draw the.',
                  misconception: 'Students think programme planning is a one-time linear checklist ending at evaluation.' },
                { id: 'b', prompt: 'Compare the "Top-down" and "Participatory" approaches to programme planning across these dimensions: (a) Who identifies needs? (b) Role of local people?', answer: 'Top-down: (a) External experts, (b) Passive recipients, (c) Low sustainability',
                  options: ['Top-down: (a) External experts, (b) Passive recipients, (c) Low sustainability', 'programme planning is a one-time linear checklist ending at evaluation'],
                  hint: 'Revisit Class 11 Resource Management nodes c11_hs_cbse_04_008 and c11_hs_cbse_04_009 — draw the.',
                  misconception: 'Students think programme planning is a one-time linear checklist ending at evaluation.' }
          ],
            remediations: { 'programme-planning-is-a-one': { steps: ['If a student cannot sequence the steps or explain the cycle, have them: (1) Re-read the "Programme Planning" section.', '(2) Draw the cycle from memory on a blank paper, labeling each step with one village example.', '(3) Watch a 10-min video on "Extension Programme Cycle" (e.g., MANAGE or NIRDPR YouTube).', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think programme planning is a one-time linear checklist ending at evaluation.',
          parts: [
                { id: 'a', prompt: 'Evaluate this objective for a sanitation programme: "Make the village open-defecation free." Is it a well-formulated extension objective?', answer: 'No, it lacks specificity and measurability',
                  options: ['No, it lacks specificity and measurability', 'programme planning is a one-time linear checklist ending at evaluation'],
                  hint: 'Revisit Class 11 Resource Management nodes c11_hs_cbse_04_008 and c11_hs_cbse_04_009 — draw the.',
                  misconception: 'Students think programme planning is a one-time linear checklist ending at evaluation.' },
                { id: 'b', prompt: 'Design a one-page programme cycle diagram for a "Kitchen Garden Promotion" project in a tribal block.', answer: 'A good diagram shows: 1',
                  options: ['A good diagram shows: 1', 'programme planning is a one-time linear checklist ending at evaluation'],
                  hint: 'Revisit Class 11 Resource Management nodes c11_hs_cbse_04_008 and c11_hs_cbse_04_009 — draw the.',
                  misconception: 'Students think programme planning is a one-time linear checklist ending at evaluation.' }
          ],
            remediations: { 'programme-planning-is-a-one': { steps: ['If a student cannot sequence the steps or explain the cycle, have them: (1) Re-read the "Programme Planning" section.', '(2) Draw the cycle from memory on a blank paper, labeling each step with one village example.', '(3) Watch a 10-min video on "Extension Programme Cycle" (e.g., MANAGE or NIRDPR YouTube).', '(4) Re-attempt Diagnostic Question 3 and 6.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_010', difficulty: 'standard',
          question: 'Programme evaluation in extension education is the systematic and objective.',
          hint: 'If stuck on "criteria vs indicators", revisit **c12_hs_cbse_12_009 (Programme Planning)**.',
          misconception: 'Students often believe "evaluation happens only at the end of a programme" and equate it with a final exam.',
          parts: [
                { id: 'a', prompt: 'Define "programme evaluation" in the context of extension education. How does it differ from "monitoring"?', answer: 'Programme evaluation is the systematic assessment of a programme\'s design,',
                  options: ['Programme evaluation is the systematic assessment of a programme\'s design,', 'monitoring vs evaluation', 'evaluation happens only at the end of a programme'],
                  hint: 'If stuck on "criteria vs indicators", revisit **c12_hs_cbse_12_009 (Programme Planning)**.',
                  misconception: 'Students often believe "evaluation happens only at the end of a programme" and equate it with a final exam.' },
                { id: 'b', prompt: 'Design a formative evaluation plan for a "Digital Literacy for Senior Citizens" programme running in a community centre.', answer: 'two criteria you will judge, (',
                  options: ['two criteria you will judge, (', 'impact', 'evaluation happens only at the end of a programme'],
                  hint: 'If stuck on "criteria vs indicators", revisit **c12_hs_cbse_12_009 (Programme Planning)**.',
                  misconception: 'Students often believe "evaluation happens only at the end of a programme" and equate it with a final exam.' }
          ],
            remediations: { 'evaluation-happens-only-at-the': { steps: ['Plan for Evaluation). 2. Use the "Nutrition Garden" scenario: Ask "If you wait until harvest to evaluate, can you fix.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_011', difficulty: 'standard',
          question: 'An extension worker is a trained professional who acts as a crucial link.',
          hint: 'Revisit c12_hs_cbse_12_002 (Principles of Extension Education) and identify which.',
          misconception: 'Students equate "extension worker qualities" with academic qualifications (M.Sc.',
          parts: [
                { id: 'a', prompt: 'An extension worker introduces improved kitchen gardens to a village. After three months, adoption is near zero.', answer: 'Correct analysis: The worker has failed in the diagnostic/facilitator role',
                  options: ['Correct analysis: The worker has failed in the diagnostic/facilitator role', 'resistance', 'is a task'],
                  hint: 'Revisit c12_hs_cbse_12_002 (Principles of Extension Education) and identify which principle each.',
                  misconception: 'Students equate "extension worker qualities" with academic qualifications (M.Sc.' }
          ],
            remediations: { 'students-equate-extension-worker-qualities': { steps: ['If a student lists qualifications as qualities or tasks as roles: Step 1 — Give two contrasting caselets: one of.', 'Step 2 — Ask student to identify the differentiating qualities using the "critical incident technique".', 'Step 3 — Have student re-write their answer mapping each quality to a specific field barrier it overcomes.', 'Step 4 — For roles, use the "role-set mapping" exercise: list 5 field situations (e.g., conflict in SHG, new pest.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_12_012', difficulty: 'standard',
          question: 'Consumer Education and Protection is the systematic process of empowering.',
          hint: 'If stuck on redressal procedures, revisit c12_hs_cbse_12_009 (Programme Planning) — treat.',
          misconception: 'Students believe "ISI mark guarantees 100% defect-free product" and "Hallmark on gold means government buys back.',
          parts: [
                { id: 'a', prompt: 'A packet of turmeric powder bears an AGMARK label but no FSSAI license number. The manufacturer claims AGMARK certification makes FSSAI registration optional.', answer: 'The claim is FALSE',
                  options: ['The claim is FALSE', 'ISI mark guarantees 100% defect-free product', 'Hallmark on gold means government buys back at same price'],
                  hint: 'If stuck on redressal procedures, revisit c12_hs_cbse_12_009 (Programme Planning) — treat complaint.',
                  misconception: 'Students believe "ISI mark guarantees 100% defect-free product" and "Hallmark on gold means government buys back at same price".' },
                { id: 'b', prompt: 'Compare the consumer protection framework under CPA 1986 vs CPA 2019.', answer: '1) Central Consumer Protection Authority (CCPA)',
                  options: ['1) Central Consumer Protection Authority (CCPA)', 'ISI mark guarantees 100% defect-free product', 'Hallmark on gold means government buys back at same price'],
                  hint: 'If stuck on redressal procedures, revisit c12_hs_cbse_12_009 (Programme Planning) — treat complaint.',
                  misconception: 'Students believe "ISI mark guarantees 100% defect-free product" and "Hallmark on gold means government buys back at same price".' }
          ],
            remediations: { 'isi-mark-guarantees-100-defect': { steps: ['Revisit c11_hs_cbse_10_005 (Budget: Concept, Purpose and Success Criteria) to understand financial proof (receipts).', 'Re-read NCERT Section "Standardisation Marks" — make a comparison table: Mark | Issuing Body | Product Category | Legal.', 'Practice: Collect 5 product packages, photograph marks, verify on BIS/FSSAI websites.', 'Re-diagnostic: Given a product with fake ISI logo (no license number), explain why it violates BIS Act 2016 Section 17.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
