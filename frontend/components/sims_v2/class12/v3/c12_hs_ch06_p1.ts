import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch06_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch06_p1: SimDef = {
    id: 'v3_c12_hs_ch06_p1',
    title: 'Communication and Extension · Part 1/2',
    subtitle: 'You can\'t order a farmer to change — you can let him see',
    classLevel: 12, subject: 'home_science', topic: 'Communication and Extension · Part 1/2',
    chapters: ['c12_hs_ch06'],
    nodeIds: ['c12_hs_cbse_06_001', 'c12_hs_cbse_06_002', 'c12_hs_cbse_06_003', 'c12_hs_cbse_06_004', 'c12_hs_cbse_06_005', 'c12_hs_cbse_06_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Extension educator', intro: 'Real change in a village doesn\'t arrive by circular — it grows from a demonstration plot and a community\'s own arithmetic.', goal: 'Grasp extension education\'s philosophy — voluntary, experiential, needs-based — versus top-down development.' },
    discovery: {
        question: 'An extension worker can\'t force farmers to stop burning stubble — so she runs a demo plot and lets them calculate the savings themselves. Why does that work better than orders?',
        options: ['Extension is facilitation, not instruction — participation is voluntary, learning happens by doing, and communities solve their own problems; the educator is a catalyst', 'Farmers are stubborn', 'Orders take longer', 'Demos are cheaper'],
        answer: 'Extension is facilitation, not instruction — participation is voluntary, learning happens by doing, and communities solve their own problems; the educator is a catalyst',
        hook: 'The deficit model is the trap — \'teaching illiterate women schemes\' treats people as empty vessels and subsidies as the goal. Extension starts where people are, trusts indigenous knowledge, and measures success in self-reliance, not adoption targets.',
    },
    teaching: [
        { title: 'Extension: Definition, Philosophy and Objectives', text: 'Extension Education is an applied behavioural science that uses educational processes to bring about desirable changes in the knowledge, skills, attitudes, and practices of individuals, families, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_06_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Enter a sceptical village the extension way: map resources with elders, find the community\'s own felt problem, build a demo plot together — and spot the violations in \'100% adoption\' targets.',
        labels: ['Extension: Definition, Philosophy', 'Extension Education: Principles', 'Communication Process: Elements', 'Types of Communication: Intrapersonal,', 'Extension Teaching Methods: Individual,', 'Audio-Visual Aids in Extension'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_001', title: 'Extension: Definition, Philosophy and Objectives',
          caseStudy: { intro: 'Imagine you are a Home Science graduate working in a rural block where farmers still burn crop residue despite government advisories.',
            decisions: [{ prompt: 'Define Extension Education in one sentence and state how it differs from formal school education in terms of (a) curriculum fixity and (b).', options: [
                { text: 'Extension Education is a non-formal, need-based educational process that empowers', outcome: 'Extension Education is a non-formal, need-based educational process that empowers communities.' },
                { text: 'teaching farmers new techniques', outcome: 'Not quite — Students equate Extension Education with "government scheme delivery" or "teaching rural people.', reveals: 'students-equate-extension-education-with' },
                { text: 'government scheme delivery', outcome: 'Not quite — Students equate Extension Education with "government scheme delivery" or "teaching rural people.', reveals: 'students-equate-extension-education-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_002', title: 'Extension Education: Principles and Characteristics',
          caseStudy: { intro: 'Imagine you are a Krishi Vigyan Kendra (KVK) worker visiting a village where farmers still use flood irrigation despite water scarcity.',
            decisions: [{ prompt: 'State the principle of extension education that emphasizes using the community\'s existing values, beliefs, and traditions as a starting.', options: [
                { text: '**Correct answer:** Principle of cultural relevance (or cultural sensitivity)', outcome: '**Correct answer:** Principle of cultural relevance (or cultural sensitivity).' },
                { text: 'principle of participation', outcome: 'Not quite — Students often think "extension education principles are just a list to memorize" and write them.', reveals: 'extension-education-principles-are-just' },
                { text: 'principle of interest and need', outcome: 'Not quite — Students often think "extension education principles are just a list to memorize" and write them.', reveals: 'extension-education-principles-are-just' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_003', title: 'Communication Process: Elements and Models (SMCRE)',
          caseStudy: { intro: 'Imagine you\'re an extension worker trying to convince farmers in a drought-prone village to switch from water-intensive rice to millets.',
            decisions: [{ prompt: 'In the SMCRE model, what does the \'E\' stand for, and how does it differ from \'Feedback\' in interactive models?', options: [
                { text: '\'E\' stands for Effect', outcome: '\'E\' stands for Effect — the measurable change in the receiver\'s knowledge, attitude, or behaviour.' },
                { text: 'E = Encoding', outcome: 'Not quite — Students equate "Effect" in SMCRE with "message delivery confirmation" (e.g., pamphlet distributed.', reveals: 'students-equate-effect-in-smcre' },
                { text: 'E = Feedback', outcome: 'Not quite — Students equate "Effect" in SMCRE with "message delivery confirmation" (e.g., pamphlet distributed.', reveals: 'students-equate-effect-in-smcre' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_004', title: 'Types of Communication: Intrapersonal, Interpersonal and Mass Communication',
          caseStudy: { intro: 'Imagine a farm woman, Lakshmi, deciding whether to adopt a new drought-resistant millet variety.',
            decisions: [{ prompt: 'A student writes: "Intrapersonal communication is when you talk to yourself out loud." Is this statement fully accurate?', options: [
                { text: 'No, the statement is incomplete', outcome: 'No, the statement is incomplete. Intrapersonal communication includes silent internal dialogue.' },
                { text: 'mediated', outcome: 'Not quite — Students often believe that any communication involving a medium (phone, WhatsApp, letter).', reveals: 'any-communication-involving-a-medium' },
                { text: '— a confusion reinforced by everyday language (', outcome: 'Not quite — Students often believe that any communication involving a medium (phone, WhatsApp, letter).', reveals: 'any-communication-involving-a-medium' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_005', title: 'Extension Teaching Methods: Individual, Group and Mass Contact Methods',
          caseStudy: { intro: 'Imagine you are an extension worker in a village where farmers need to learn a new organic composting technique.',
            decisions: [{ prompt: 'List the three categories of extension teaching methods based on the number of learners and interaction intensity.', options: [
                { text: 'The three categories are individual contact methods, group contact methods, and mass', outcome: 'The three categories are individual contact methods, group contact methods, and mass contact.' },
                { text: 'lecture, demonstration, field day', outcome: 'Not quite — Students often think that mass contact methods (TV, radio, WhatsApp) are "better" because they.', reveals: 'mass-contact-methods-tv' },
                { text: 'better', outcome: 'Not quite — Students often think that mass contact methods (TV, radio, WhatsApp) are "better" because they.', reveals: 'mass-contact-methods-tv' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_006', title: 'Audio-Visual Aids in Extension: Classification and Selection Criteria',
          caseStudy: { intro: 'Imagine you are an extension worker in a rural Maharashtra village promoting kitchen gardening.',
            decisions: [{ prompt: 'State the three broad categories of Audio-Visual aids based on sensory channels, and give one example of each.', options: [
                { text: 'The three categories are: (1) Audio aids', outcome: 'The three categories are: (1) Audio aids — appeal to hearing only (e.g., radio, audio recordings.' },
                { text: 'projector', outcome: 'Not quite — Students confuse "classification by sensory channel" (audio/visual/audio-visual) with.', reveals: 'students-confuse-classification-by-sensory' },
                { text: 'flip chart', outcome: 'Not quite — Students confuse "classification by sensory channel" (audio/visual/audio-visual) with.', reveals: 'students-confuse-classification-by-sensory' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Communication and Extension · Part 1/2', spots: [
            { id: 's1', label: 'Extension Definition Philosophy and Objectives', prompt: 'Which idea is this? — Extension Education is an applied behavioural science that uses educational processes.', answer: 'Extension Definition Philosophy and Objectives', options: ['Extension Definition Philosophy and Objectives', 'Extension Education Principles and Characteristics', 'Communication Process Elements and Models SMCRE'] },
            { id: 's2', label: 'Extension Education Principles and Characteristics', prompt: 'Which idea is this? — Extension Education is a non-formal, voluntary educational process that brings scientific.', answer: 'Extension Education Principles and Characteristics', options: ['Extension Education Principles and Characteristics', 'Extension Definition Philosophy and Objectives', 'Communication Process Elements and Models SMCRE'] },
            { id: 's3', label: 'Communication Process Elements and Models SMCRE', prompt: 'Which idea is this? — The SMCRE model (Source-Message-Channel-Receiver-Effect) is a linear communication.', answer: 'Communication Process Elements and Models SMCRE', options: ['Communication Process Elements and Models SMCRE', 'Extension Definition Philosophy and Objectives', 'Extension Education Principles and Characteristics'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Your college NSS team plans a \'Scientific Goat Rearing\' camp in a tribal block: three days of PowerPoint lectures on breeds and feed charts. On day one the hall is half-empty and a village woman mutters that nobody asked what the goat-keepers actually need.',
            decisions: [{ prompt: 'What do the principles of extension education say went wrong?', options: [
                { text: 'Everything structural — the topic was officer-driven not need-driven, the classroom format ignored the oral, hands-on culture, and one-way slides violated participation; fix it with a needs assessment first, demonstrations in the local dialect, and experienced local keepers as co-trainers.', outcome: 'Extension is voluntary — learners can walk out, so the worker must earn relevance; the failure here is pedagogy contradicting the philosophy, not bad logistics.' },
                { text: 'The problem was scheduling — shift the lectures to evenings when villagers are free.', outcome: 'Timing treats a design failure as logistics: even a full hall of slide-watchers is one-way communication; participation and felt need are what make extension stick, not attendance hours.', reveals: 'logistics-was-the-problem' },
                { text: 'Make attendance mandatory through the panchayat so the information reaches everyone.', outcome: 'Extension is voluntary by definition — compelled attendance turns the facilitator into an authority figure and kills the trust that makes communities adopt change.', reveals: 'compulsion-equals-reach' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_06_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate extension from command — and see why a well-built road nobody asked for fails where a facilitated choice succeeds.',
            decisions: [{ prompt: 'What comes next? Communication and Extension · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Communication and Extension · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_001', difficulty: 'standard',
          question: 'Extension Education is an applied behavioural science that uses educational.',
          hint: 'Revisit c11_hs_cbse_06_002 (One-way vs Two-way Communication) and c11_psy_cbse_08_004.',
          misconception: 'Students equate Extension Education with "government scheme delivery" or "teaching rural people modern techniques.".',
          parts: [
                { id: 'a', prompt: 'A village-level worker says: "My job is to teach illiterate women how to use SMAM (Sub-Mission on Agricultural Mechanisation) schemes so they get subsidies.".', answer: 'Two violations: (1) "Teach illiterate women" assumes a deficit model',
                  options: ['Two violations: (1) "Teach illiterate women" assumes a deficit model', 'illiterate', 'government scheme delivery', 'teaching rural people modern techniques'],
                  hint: 'Revisit c11_hs_cbse_06_002 (One-way vs Two-way Communication) and c11_psy_cbse_08_004 (Maslow\'s.',
                  misconception: 'Students equate Extension Education with "government scheme delivery" or "teaching rural people modern techniques." They write: "Extension.' },
                { id: 'b', prompt: 'Compare Extension Education and Community Development using a 3x3 matrix with dimensions: (i) Primary focus, (ii) Role of external agent, (iii) Measure.', answer: '| Dimension | Extension Education | Community Development |',
                  options: ['| Dimension | Extension Education | Community Development |', 'both help villagers', 'government scheme delivery', 'teaching rural people modern techniques'],
                  hint: 'Revisit c11_hs_cbse_06_002 (One-way vs Two-way Communication) and c11_psy_cbse_08_004 (Maslow\'s.',
                  misconception: 'Students equate Extension Education with "government scheme delivery" or "teaching rural people modern techniques." They write: "Extension.' }
          ],
            remediations: { 'students-equate-extension-education-with': { steps: ['Revisit the distinction between *formal education* (fixed curriculum, compulsory, certification-driven) and *non-formal.', 'Analyse the "midwife vs. bridge" metaphor (Diagnostic Q6) — write a 100-word reflection on why the midwife metaphor.', 'Take a real village scenario (e.g., low toilet usage despite Swachh Bharat) and draft two approaches: (a).', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, review c12_hs_cbse_06_002 (Extension Education: Principles and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate Extension Education with "government scheme delivery" or "teaching rural people modern techniques.".',
          parts: [
                { id: 'a', prompt: 'Critique this Extension objective: "To ensure 100% adoption of drip irrigation in the command area within two years through intensive campaigns and subsidy.', answer: 'Three flaws: (1) "Ensure 100% adoption"',
                  options: ['Three flaws: (1) "Ensure 100% adoption"', 'A wrong answer that only changes', 'maximum', 'government scheme delivery'],
                  hint: 'Revisit c11_hs_cbse_06_002 (One-way vs Two-way Communication) and c11_psy_cbse_08_004 (Maslow\'s.',
                  misconception: 'Students equate Extension Education with "government scheme delivery" or "teaching rural people modern techniques." They write: "Extension.' }
          ],
            remediations: { 'students-equate-extension-education-with': { steps: ['Revisit the distinction between *formal education* (fixed curriculum, compulsory, certification-driven) and *non-formal.', 'Analyse the "midwife vs. bridge" metaphor (Diagnostic Q6) — write a 100-word reflection on why the midwife metaphor.', 'Take a real village scenario (e.g., low toilet usage despite Swachh Bharat) and draft two approaches: (a).', 'Re-attempt Diagnostic Questions 2 and 5. If still stuck, review c12_hs_cbse_06_002 (Extension Education: Principles and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_002', difficulty: 'standard',
          question: 'Extension Education is a non-formal, voluntary educational process that brings.',
          hint: 'If unclear how philosophy translates to principles, re-read the "Philosophy of Extension".',
          misconception: 'Students often think "extension education principles are just a list to memorize" and write them as isolated bullet.',
          parts: [
                { id: 'a', prompt: 'State the principle of extension education that emphasizes using the community\'s existing values, beliefs, and traditions as a starting point for introducing.', answer: '**Correct answer:** Principle of cultural relevance (or cultural sensitivity)',
                  options: ['**Correct answer:** Principle of cultural relevance (or cultural sensitivity)', 'principle of participation', 'principle of interest and need', 'extension education principles are just a list to memorize'],
                  hint: 'If unclear how philosophy translates to principles, re-read the "Philosophy of Extension" section.',
                  misconception: 'Students often think "extension education principles are just a list to memorize" and write them as isolated bullet points in exams.' },
                { id: 'b', prompt: 'Explain in your own words why extension education is described as "voluntary" and how this characteristic shapes the extension worker\'s role.', answer: '**Correct answer:** Extension education is voluntary',
                  options: ['**Correct answer:** Extension education is voluntary', 'voluntary means the worker volunteers their time', 'it\'s free of cost', 'extension education principles are just a list to memorize'],
                  hint: 'If unclear how philosophy translates to principles, re-read the "Philosophy of Extension" section.',
                  misconception: 'Students often think "extension education principles are just a list to memorize" and write them as isolated bullet points in exams.' },
                { id: 'c', prompt: 'A block-level extension officer plans a training on "Scientific Goat Rearing" for tribal women in Jharkhand.', answer: '**Correct answer:** 1',
                  options: ['**Correct answer:** 1', 'language barrier', 'timing', 'extension education principles are just a list to memorize'],
                  hint: 'If unclear how philosophy translates to principles, re-read the "Philosophy of Extension" section.',
                  misconception: 'Students often think "extension education principles are just a list to memorize" and write them as isolated bullet points in exams.' }
          ],
            remediations: { 'extension-education-principles-are-just': { steps: ['Revisit **c12_hs_cbse_06_001** (Extension: Definition, Philosophy and Objectives) to clarify how principles derive from.', 'Create a two-column table: Column A = Principle, Column B = One Indian field violation scenario.', 'Fill for all 8 principles.', 'Practice 5 assertion-reason questions from past CBSE papers (e.g., "Assertion: Extension education uses local leaders.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_003', difficulty: 'standard',
          question: 'The SMCRE model (Source-Message-Channel-Receiver-Effect) is a linear.',
          hint: 'If unable to label SMCRE components in a scenario, revisit c11_hs_cbse_06_006 (SMCRE.',
          misconception: 'Students equate "Effect" in SMCRE with "message delivery confirmation" (e.g., pamphlet distributed, SMS sent, meeting.',
          parts: [
                { id: 'a', prompt: 'In the SMCRE model, what does the \'E\' stand for, and how does it differ from \'Feedback\' in interactive models?', answer: '\'E\' stands for Effect',
                  options: ['\'E\' stands for Effect', 'E = Encoding', 'E = Feedback'],
                  hint: 'If unable to label SMCRE components in a scenario, revisit c11_hs_cbse_06_006 (SMCRE Overview) and.',
                  misconception: 'Students equate "Effect" in SMCRE with "message delivery confirmation" (e.g., pamphlet distributed, SMS sent, meeting held).' },
                { id: 'b', prompt: 'A Krishi Vigyan Kendra (KVK) scientist delivers a lecture on integrated pest management (IPM) to 50 farmers using technical slides in English.', answer: 'Message and Channel failed',
                  options: ['Message and Channel failed', 'farmer resistance', 'poor Effect measurement'],
                  hint: 'If unable to label SMCRE components in a scenario, revisit c11_hs_cbse_06_006 (SMCRE Overview) and.',
                  misconception: 'Students equate "Effect" in SMCRE with "message delivery confirmation" (e.g., pamphlet distributed, SMS sent, meeting held).' },
                { id: 'c', prompt: 'Compare SMCRE and Berlo\'s SMCR models on three dimensions: (1) Treatment of Effect, (2) Role of Source-Communication skills, (3) Linearity vs. Interactivity.', answer: '(1) SMCRE explicitly includes Effect as the fifth element',
                  options: ['(1) SMCRE explicitly includes Effect as the fifth element', 'because it\'s more detailed'],
                  hint: 'If unable to label SMCRE components in a scenario, revisit c11_hs_cbse_06_006 (SMCRE Overview) and.',
                  misconception: 'Students equate "Effect" in SMCRE with "message delivery confirmation" (e.g., pamphlet distributed, SMS sent, meeting held).' }
          ],
            remediations: { 'students-equate-effect-in-smcre': { steps: ['Revisit c11_hs_cbse_06_008 (SMCRE Receiver Element and Feedback) — specifically the distinction between "decoding".', 'Take a real extension report (e.g., ICDS nutrition campaign) and label each reported metric.', 'For each output metric, ask: "What change in the receiver does this prove?" If N/A, it\'s not Effect.', 'Re-attempt Diagnostic Question 5 — the matrix creation forces element-context separation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_004', difficulty: 'standard',
          question: 'Intrapersonal communication is the internal dialogue within an individual.',
          hint: 'Revisit c12_hs_cbse_06_003 — practice identifying SMCRE elements in three scenarios: (a).',
          misconception: 'Students often believe that any communication involving a medium (phone, WhatsApp, letter) is automatically mass.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Intrapersonal communication is when you talk to yourself out loud." Is this statement fully accurate?', answer: 'No, the statement is incomplete',
                  options: ['No, the statement is incomplete', 'mediated', '— a confusion reinforced by everyday language ('],
                  hint: 'Revisit c12_hs_cbse_06_003 — practice identifying SMCRE elements in three scenarios: (a) thinking.',
                  misconception: 'Students often believe that any communication involving a medium (phone, WhatsApp, letter) is automatically mass communication.' },
                { id: 'b', prompt: 'In a village health program, an ASHA worker uses a flip chart to explain immunization schedules to a group of 15 mothers, answers their questions, and adjusts.', answer: 'This is interpersonal communication (specifically small-group interpersonal)',
                  options: ['This is interpersonal communication (specifically small-group interpersonal)', 'group setting', 'mass audience', 'mediated'],
                  hint: 'Revisit c12_hs_cbse_06_003 — practice identifying SMCRE elements in three scenarios: (a) thinking.',
                  misconception: 'Students often believe that any communication involving a medium (phone, WhatsApp, letter) is automatically mass communication.' },
                { id: 'c', prompt: 'Compare intrapersonal and interpersonal communication on the dimension of "noise" (communication barriers).', answer: 'Intrapersonal unique barrier: Cognitive dissonance / self-deception — internal',
                  options: ['Intrapersonal unique barrier: Cognitive dissonance / self-deception — internal', 'distraction', 'mediated', '— a confusion reinforced by everyday language ('],
                  hint: 'Revisit c12_hs_cbse_06_003 — practice identifying SMCRE elements in three scenarios: (a) thinking.',
                  misconception: 'Students often believe that any communication involving a medium (phone, WhatsApp, letter) is automatically mass communication.' }
          ],
            remediations: { 'any-communication-involving-a-medium': { steps: ['If a student misclassifies mediated interpersonal as mass communication: (1) Have them list the 5 participants in.', 'Is the group open to strangers?" (2) Contrast with a radio call-in show: "How many listeners?', 'Can the host address each by name?" (3) Create a 2x2 matrix: Channel (mediated/unmediated) vs Audience.', 'Place examples in each cell.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_005', difficulty: 'standard',
          question: 'Extension teaching methods are systematic approaches used by extension workers.',
          hint: 'Review the SMCRE model (c12_hs_cbse_06_003) and communication types (c12_hs_cbse_06_004).',
          misconception: 'Students often think that mass contact methods (TV, radio, WhatsApp) are "better" because they reach more people, but.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Extension teaching methods are systematic approaches used by extension workers to',
                  options: ['Extension teaching methods are systematic approaches used by extension workers to', 'Extension Education is an applied behavioural science that uses educational processes to', 'Extension Education is a non-formal, voluntary educational process that brings scientific', 'The SMCRE model (Source-Message-Channel-Receiver-Effect) is a linear communication'],
                  hint: 'Review the SMCRE model (c12_hs_cbse_06_003) and communication types (c12_hs_cbse_06_004) to see how.',
                  misconception: 'Students often think that mass contact methods (TV, radio, WhatsApp) are "better" because they reach more people, but they ignore that.' }
          ],
            remediations: { 'mass-contact-methods-tv': { steps: ['If the student misclassifies methods, have them create a three-column table with the headers: Individual, Group, Mass.', 'Give them a list of 10 methods (farm visit, method demonstration, radio talk, field day, exhibition, office call, group.', 'Ask them to place each in the correct column and write one reason per placement.', 'Then re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_06_006', difficulty: 'standard',
          question: 'Audio-Visual (AV) aids in extension are instructional devices that communicate.',
          hint: 'Revisit c12_hs_cbse_06_003 (SMCRE Channel element) and c12_hs_cbse_06_005.',
          misconception: 'Students confuse "classification by sensory channel" (audio/visual/audio-visual) with "classification by projection.',
          parts: [
                { id: 'a', prompt: 'State the three broad categories of Audio-Visual aids based on sensory channels, and give one example of each.', answer: 'The three categories are: (1) Audio aids',
                  options: ['The three categories are: (1) Audio aids', 'projector', 'flip chart', 'classification by sensory channel'],
                  hint: 'Revisit c12_hs_cbse_06_003 (SMCRE Channel element) and c12_hs_cbse_06_005 (method-audience size.',
                  misconception: 'Students confuse "classification by sensory channel" (audio/visual/audio-visual) with "classification by projection technology".' },
                { id: 'b', prompt: 'An extension worker plans to demonstrate "preparation of oral rehydration solution (ORS)" to a group of semi-literate mothers in a village with no electricity.', answer: 'The flip chart (c) is most appropriate',
                  options: ['The flip chart (c) is most appropriate', 'classification by sensory channel', 'classification by projection technology'],
                  hint: 'Revisit c12_hs_cbse_06_003 (SMCRE Channel element) and c12_hs_cbse_06_005 (method-audience size.',
                  misconception: 'Students confuse "classification by sensory channel" (audio/visual/audio-visual) with "classification by projection technology".' }
          ],
            remediations: { 'students-confuse-classification-by-sensory': { steps: ['Have the student create a 2×3 matrix with rows = sensory classification (audio, visual, audio-visual) and columns.', 'Ask them to place each aid (radio, poster, slide filmstrip, video, puppet show, model) in the correct cell.', 'For Dale\'s Cone, give them 5 extension scenarios (e.g., "teaching tractor driving", "explaining climate change trends").', 'Re-diagnose with Question 2 and Question 5 to verify the abstraction-concreteness distinction is clear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
