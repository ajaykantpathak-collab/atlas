import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch07_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch07_p1: SimDef = {
    id: 'v3_c12_bs_ch07_p1',
    title: 'Directing · Part 1/2',
    subtitle: 'Everything was ready and nothing moved — directing is the starting gun.',
    classLevel: 12, subject: 'business_studies', topic: 'Directing · Part 1/2',
    chapters: ['c12_bs_ch07'],
    nodeIds: ['c12_bs_cbse_07_001', 'c12_bs_cbse_07_002', 'c12_bs_cbse_07_003', 'c12_bs_cbse_07_004', 'c12_bs_cbse_07_005', 'c12_bs_cbse_07_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Restaurant floor manager', intro: 'Supervision, communication, leadership, motivation — four elements, one function, zero static organisations.', goal: 'Define directing and apply its four elements to real workplace situations.' },
    discovery: {
        question: 'Plan made, positions assigned, players selected — yet nothing moves until the captain says \'bowl to off-stump, field at slip\'. Which function just fired the starting gun?',
        options: ['Directing — the function that initiates action by instructing, guiding, motivating and leading', 'Planning — because the instruction was part of the strategy', 'Controlling — because the captain corrected the field placement', 'Organising — because the slip fielder was assigned a position'],
        answer: 'Directing — the function that initiates action by instructing, guiding, motivating and leading',
        hook: 'Plans are inert until someone says go — directing is the only function that converts preparation into motion, which is why it flows top-down, operates at every level, and never stops.',
    },
    teaching: [
        { title: 'Directing: Meaning, Nature and Importance', text: 'Directing is the managerial function of instructing, guiding, counselling, motivating, and leading people in an organisation to achieve its objectives; it initiates action, flows top-down through the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_07_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the dinner rush at a busy restaurant: deploy all four elements — supervise the confused waiter, communicate table assignments, lead the quarrelling kitchen staff, and motivate the exhausted team.',
        labels: ['Directing: Meaning, Nature', 'Elements of Directing: Supervision,', 'Supervision: Meaning and Functions', 'Communication: Meaning, Process', 'Barriers to Communication', 'Leadership: Meaning, Styles (Autocratic,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_001', title: 'Directing: Meaning, Nature and Importance',
          caseStudy: { intro: 'Imagine you are the captain of a cricket team: you have a game plan (planning), assigned fielding positions (organising), and selected players (staffing).',
            decisions: [{ prompt: 'State the four characteristics of directing as per NCERT Class 12.', options: [
                { text: 'The four characteristics are: (i) Directing initiates action, (ii) Directing takes place', outcome: 'The four characteristics are: (i) Directing initiates action, (ii) Directing takes place at every.' },
                { text: 'planning, organising, staffing, controlling', outcome: 'Not quite — Students often think "Directing = Communication" because the textbook says directing \'encompasses\'.', reveals: 'directing-communication-because-the-textbook' },
                { text: 'Directing = Communication', outcome: 'Not quite — Students often think "Directing = Communication" because the textbook says directing \'encompasses\'.', reveals: 'directing-communication-because-the-textbook' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_002', title: 'Elements of Directing: Supervision, Communication, Leadership, Motivation',
          caseStudy: { intro: 'Imagine you are the manager of a busy restaurant during the dinner rush.',
            decisions: [{ prompt: 'Name the four elements of directing as per the NCERT Class 12 Business Studies textbook.', options: [
                { text: 'The four elements are Supervision, Motivation, Leadership, and Communication', outcome: 'The four elements are Supervision, Motivation, Leadership, and Communication.' },
                { text: 'planning', outcome: 'Not quite — Students often believe that "directing" equals "giving orders" and therefore equate it solely with.', reveals: 'directing-equals-giving-orders-and' },
                { text: 'controlling', outcome: 'Not quite — Students often believe that "directing" equals "giving orders" and therefore equate it solely with.', reveals: 'directing-equals-giving-orders-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_003', title: 'Supervision: Meaning and Functions of a Supervisor',
          caseStudy: { intro: 'Imagine you are the shift supervisor at a Maruti Suzuki assembly line in Gurugram.',
            decisions: [{ prompt: 'Define supervision in the context of directing. How does it differ from the general meaning of "watching over someone"?', options: [
                { text: 'Supervision as an element of directing is the process of guiding efforts of employees and', outcome: 'Supervision as an element of directing is the process of guiding efforts of employees and other.' },
                { text: 'supervision', outcome: 'Not quite — Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s.', reveals: 'students-often-confuse-supervision-with' },
                { text: 'inspection', outcome: 'Not quite — Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s.', reveals: 'students-often-confuse-supervision-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_004', title: 'Communication: Meaning, Process and Types (Formal, Informal)',
          caseStudy: { intro: 'Imagine you are a project manager at a Mumbai-based tech startup.',
            decisions: [{ prompt: 'List the eight elements of the communication process in their correct sequential order as per the NCERT model, and define "noise" in this.', options: [
                { text: 'Correct sequence: Sender → Message → Encoding → Media/Channel → Decoding → Receiver →', outcome: 'Correct sequence: Sender → Message → Encoding → Media/Channel → Decoding → Receiver → Feedback →.' },
                { text: 'feedback', outcome: 'Not quite — Students believe **informal communication (grapevine) is always dysfunctional and should.', reveals: 'informal-communication-grapevine-is-always' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_005', title: 'Barriers to Communication and Measures to Overcome Them',
          caseStudy: { intro: 'Imagine a factory supervisor sends a WhatsApp message to a shift worker: "Handle the pressing issue on Line 3 immediately." The worker, unfamiliar with.',
            decisions: [{ prompt: 'List the four broad categories of barriers to communication as per NCERT Class 12 Business Studies.', options: [
                { text: 'The four categories are: (1) Semantic barriers, (2) Psychological barriers, (3)', outcome: 'The four categories are: (1) Semantic barriers, (2) Psychological barriers, (3) Organizational.' },
                { text: 'language barrier', outcome: 'Not quite — Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.', reveals: 'semantic-barriers-only-mean-language' },
                { text: 'cultural barrier', outcome: 'Not quite — Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.', reveals: 'semantic-barriers-only-mean-language' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_006', title: 'Leadership: Meaning, Styles (Autocratic, Democratic, Laissez-Faire)',
          caseStudy: { intro: 'Imagine you are the captain of your school\'s cricket team. In a crucial match, you need to decide the batting order.',
            decisions: [{ prompt: 'Define leadership according to the NCERT Class 12 Business Studies textbook. Use the exact terminology from the chapter.', options: [
                { text: 'Leadership is the process of influencing the behaviour of people by making them strive', outcome: 'Leadership is the process of influencing the behaviour of people by making them strive voluntarily.' },
                { text: 'leading a group', outcome: 'Not quite — Students often think laissez-faire leadership means "no leadership" or "absence of a leader." They.', reveals: 'laissez-faire-leadership-means-no' },
                { text: 'giving orders', outcome: 'Not quite — Students often think laissez-faire leadership means "no leadership" or "absence of a leader." They.', reveals: 'laissez-faire-leadership-means-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A marketing head emails 20 field executives: \'Raise fertiliser sales 15% this quarter — new price list attached.\' Two weeks later sales are flat, and he concludes the team is simply lazy.',
            decisions: [{ prompt: 'Where did he actually fail?', options: [
                { text: 'He informed but never directed — no field briefing to turn the target into daily plans, no coaching or motivation on farmer objections, no mid-quarter review and course-correction.', outcome: 'Directing initiates action continuously at every level; a one-way email is communication, and communication is only one element of directing.' },
                { text: 'Nowhere — he gave a clear written order, and directing is basically giving orders.', outcome: 'That shrinks directing to instruction; without guiding, motivating and following through, orders sit unexecuted.', reveals: 'directing-is-just-orders' },
                { text: 'Nowhere — directing flows from the top anyway, so field supervisors had nothing to add.', outcome: 'Top-down flow doesn\'t mean only the top directs; every level directs its own subordinates, and the skipped field level is exactly where it broke.', reveals: 'only-top-level-directs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now name the four levers every leader actually pulls. Directing\'s elements are clean board marks — and the daily toolkit of anyone who will ever manage people.',
            decisions: [{ prompt: 'What comes next? Directing · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Directing · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_001', difficulty: 'standard',
          question: 'Directing is the managerial function of instructing, guiding, counselling.',
          hint: 'If stuck, revisit the "Functions of Management" concept from Class 11 (not in provided.',
          misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.',
          parts: [
                { id: 'a', prompt: '"Directing is just another word for giving orders." Explain why this statement is incomplete using two characteristics of directing.', answer: 'The statement is incomplete',
                  options: ['The statement is incomplete', 'Directing = Communication'],
                  hint: 'If stuck, revisit the "Functions of Management" concept from Class 11 (not in provided nodes but.',
                  misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.' }
          ],
            remediations: { 'directing-communication-because-the-textbook': { steps: ['Re-read the "Meaning" and "Characteristics" paragraphs in NCERT (pages 170-171).', 'Make a two-column table: Column A = "What directing IS" (initiates action, continuous, top-down, every level), Column.', 'For each characteristic, write a 1-line workplace example.', 'Re-attempt Diagnostic Questions 2 and 5 verbally to check if the distinction is clear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since directing flows top-down, lower-level managers have no role in initiating direction; they only pass orders down."', answer: 'The statement is false',
                  options: ['The statement is false', 'Directing = Communication'],
                  hint: 'If stuck, revisit the "Functions of Management" concept from Class 11 (not in provided nodes but.',
                  misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.' },
                { id: 'b', prompt: 'Design a mini-case (3-4 sentences) showing a manager applying the principle "Appropriateness of direction technique" for two employees with different.', answer: 'Example: "Rohan, a junior analyst, is driven by money',
                  options: ['Example: "Rohan, a junior analyst, is driven by money', 'give both a bonus', 'Directing = Communication', 'directing is one-size-fits-all'],
                  hint: 'If stuck, revisit the "Functions of Management" concept from Class 11 (not in provided nodes but.',
                  misconception: 'Students often think "Directing = Communication" because the textbook says directing \'encompasses\' communication.' }
          ],
            remediations: { 'directing-communication-because-the-textbook': { steps: ['Re-read the "Meaning" and "Characteristics" paragraphs in NCERT (pages 170-171).', 'Make a two-column table: Column A = "What directing IS" (initiates action, continuous, top-down, every level), Column.', 'For each characteristic, write a 1-line workplace example.', 'Re-attempt Diagnostic Questions 2 and 5 verbally to check if the distinction is clear.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_002', difficulty: 'standard',
          question: 'The four elements of directing — supervision, communication, leadership, and.',
          hint: 'If unclear on the big picture, revisit c12_bs_cbse_07_001 and create a one-page mind map.',
          misconception: 'Students often believe that "directing" equals "giving orders" and therefore equate it solely with **supervision**.',
          parts: [
                { id: 'a', prompt: 'Name the four elements of directing as per the NCERT Class 12 Business Studies textbook.', answer: 'The four elements are Supervision, Motivation, Leadership, and Communication',
                  options: ['The four elements are Supervision, Motivation, Leadership, and Communication', 'planning', 'controlling', 'directing'],
                  hint: 'If unclear on the big picture, revisit c12_bs_cbse_07_001 and create a one-page mind map: Central.',
                  misconception: 'Students often believe that "directing" equals "giving orders" and therefore equate it solely with **supervision** or **communication**.' },
                { id: 'b', prompt: 'Compare the role of "communication" in directing with the role of "supervision".', answer: 'Communication creates understanding (encoding/decoding messages)',
                  options: ['Communication creates understanding (encoding/decoding messages)', 'yes, communication is enough', 'Follow through: Mere giving of an order is not sufficient', 'directing'],
                  hint: 'If unclear on the big picture, revisit c12_bs_cbse_07_001 and create a one-page mind map: Central.',
                  misconception: 'Students often believe that "directing" equals "giving orders" and therefore equate it solely with **supervision** or **communication**.' }
          ],
            remediations: { 'directing-equals-giving-orders-and': { steps: ['If a student conflates directing with mere instruction-giving: (1) Ask them to re-read the NCERT definition.', '(2) Give them three 1-sentence scenarios: (a) Manager explains new software (Communication), (b) Manager praises.', 'Ask: "Which verb from the definition fits each?" (3) Have them complete a 2x2 matrix: Rows = Task-focused.', 'Place each element in a cell.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_003', difficulty: 'standard',
          question: 'Supervision is the process of overseeing, guiding, and directing the efforts.',
          hint: 'Revisit c12_bs_cbse_07_001 "Directing: Meaning, Nature and Importance" — specifically the.',
          misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch.',
          parts: [
                { id: 'a', prompt: 'Compare the supervisor\'s role as a "link between workers and management" (importance point ii) with the communication function (node c12_bs_cbse_07_004).', answer: 'They are distinct',
                  options: ['They are distinct', 'supervision', 'inspection', 'policing'],
                  hint: 'Revisit c12_bs_cbse_07_001 "Directing: Meaning, Nature and Importance" — specifically the.',
                  misconception: 'Students often confuse "supervision" with "inspection" or "policing" — they think the supervisor\'s job is to catch mistakes and enforce.' }
          ],
            remediations: { 'students-often-confuse-supervision-with': { steps: ['Re-read the NCERT "Importance of Supervision" section (7 bullet points) and convert each into an active verb phrase.', 'For each verb, write one concrete workplace action a supervisor in a ₹500 crore auto components factory would do TODAY.', 'Take the diagnostic question 3 scenario and re-solve it by explicitly tagging each action with the corresponding verb.', 'Re-attempt diagnostic question 6 — if you cannot isolate a single failed point, repeat Step 2 with a different industry.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_004', difficulty: 'standard',
          question: 'Communication is the systematic and continuous process of exchange of ideas.',
          hint: 'If stuck, revisit c12_bs_cbse_07_002 (Elements of Directing) and c12_bs_cbse_07_003.',
          misconception: 'Students believe **informal communication (grapevine) is always dysfunctional and should be eliminated**.',
          parts: [
                { id: 'a', prompt: 'Compare formal and informal communication on these four dimensions: (a) speed, (b) authenticity, (c) accountability, (d) organisational utility.', answer: '| Dimension | Formal Communication | Informal Communication |',
                  options: ['| Dimension | Formal Communication | Informal Communication |', 'always harmful', 'always better'],
                  hint: 'If stuck, revisit c12_bs_cbse_07_002 (Elements of Directing) and c12_bs_cbse_07_003 (Supervision).',
                  misconception: 'Students believe **informal communication (grapevine) is always dysfunctional and should be eliminated**.' }
          ],
            remediations: { 'informal-communication-grapevine-is-always': { steps: ['**Revisit the NCERT communication process diagram** (textbook p.', '188) — physically trace a real message (e.g., "teacher assigns homework") through all 8 boxes; label where noise.', '**Create a comparison table** (formal vs informal) with 5 rows: Speed, Record, Purpose, Network, Example.', 'Fill using textbook examples (leave application = formal upward; canteen chat = informal).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_005', difficulty: 'standard',
          question: 'Barriers to communication are obstacles that prevent the accurate transmission.',
          hint: 'Revisit the communication process diagram in c12_bs_cbse_07_004 and trace a message from.',
          misconception: 'Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.',
          parts: [
                { id: 'a', prompt: 'List the four broad categories of barriers to communication as per NCERT Class 12 Business Studies.', answer: 'The four categories are: (1) Semantic barriers, (2) Psychological barriers, (3)',
                  options: ['The four categories are: (1) Semantic barriers, (2) Psychological barriers, (3)', 'language barrier', 'cultural barrier', 'semantic barriers'],
                  hint: 'Revisit the communication process diagram in c12_bs_cbse_07_004 and trace a message from sender.',
                  misconception: 'Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.' },
                { id: 'b', prompt: 'A manager sends an email to a junior executive: "Please ensure the deliverables are aligned with the strategic imperatives outlined in the Q3 roadmap." The.', answer: 'This is "Technical jargon"',
                  options: ['This is "Technical jargon"', 'Badly expressed message', 'semantic barriers', 'language differences'],
                  hint: 'Revisit the communication process diagram in c12_bs_cbse_07_004 and trace a message from sender.',
                  misconception: 'Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.' },
                { id: 'c', prompt: 'In a highly centralized organization, a junior employee has a process improvement idea but the policy requires all suggestions to go through three hierarchical.', answer: 'Barrier: "Complexity in organisation structure"',
                  options: ['Barrier: "Complexity in organisation structure"', 'Rules and regulations', 'semantic barriers', 'language differences'],
                  hint: 'Revisit the communication process diagram in c12_bs_cbse_07_004 and trace a message from sender.',
                  misconception: 'Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.' },
                { id: 'd', prompt: 'Compare and contrast "Premature evaluation" (psychological barrier) and "Fear of challenge to authority" (personal barrier).', answer: 'Premature evaluation: Receiver judges the message before the sender finishes',
                  options: ['Premature evaluation: Receiver judges the message before the sender finishes', 'semantic barriers', 'language differences', 'language barrier'],
                  hint: 'Revisit the communication process diagram in c12_bs_cbse_07_004 and trace a message from sender.',
                  misconception: 'Students believe "semantic barriers" only mean "language differences" (e.g., Hindi vs.' }
          ],
            remediations: { 'semantic-barriers-only-mean-language': { steps: ['Re-read the NCERT "Barriers to Communication" section (pages 193-196) and create a 2x4 table: Column 1 = Category.', 'For each sub-type, write a one-line Indian workplace example (e.g., "Faulty translation: HR policy drafted in English.', 'Take the diagnostic question 4 again — if you still confuse premature evaluation vs.', 'Re-attempt diagnostic question 6 with the table as reference.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_006', difficulty: 'standard',
          question: 'Leadership is the process of influencing the behaviour of people by making them.',
          hint: 'Revisit c12_bs_cbse_07_001 (Directing: Meaning, Nature and Importance) and.',
          misconception: 'Students often think laissez-faire leadership means "no leadership" or "absence of a leader." They write that the.',
          parts: [
                { id: 'a', prompt: 'A manager in a manufacturing plant gives strict instructions to workers on the assembly line, monitors compliance closely, and penalises deviations.', answer: 'This is autocratic (authoritarian) leadership',
                  options: ['This is autocratic (authoritarian) leadership', 'democratic', 'manages', 'supervises'],
                  hint: 'Revisit c12_bs_cbse_07_001 (Directing: Meaning, Nature and Importance) and c12_bs_cbse_07_002.',
                  misconception: 'Students often think laissez-faire leadership means "no leadership" or "absence of a leader." They write that the leader "does nothing".' },
                { id: 'b', prompt: 'In a software development team, the project manager holds weekly meetings where all members suggest features, debate timelines, and collectively agree.', answer: 'This is democratic (participative) leadership',
                  options: ['This is democratic (participative) leadership', 'laissez-faire', 'allows', 'no leadership'],
                  hint: 'Revisit c12_bs_cbse_07_001 (Directing: Meaning, Nature and Importance) and c12_bs_cbse_07_002.',
                  misconception: 'Students often think laissez-faire leadership means "no leadership" or "absence of a leader." They write that the leader "does nothing".' },
                { id: 'c', prompt: 'Compare laissez-faire leadership with democratic leadership on three dimensions: (a) degree of freedom given to followers, (b) leader\'s involvement.', answer: 'degree of freedom given to followers, (',
                  options: ['degree of freedom given to followers, (', 'no leader', 'no leadership', 'absence of a leader'],
                  hint: 'Revisit c12_bs_cbse_07_001 (Directing: Meaning, Nature and Importance) and c12_bs_cbse_07_002.',
                  misconception: 'Students often think laissez-faire leadership means "no leadership" or "absence of a leader." They write that the leader "does nothing".' }
          ],
            remediations: { 'laissez-faire-leadership-means-no': { steps: ['If a student confuses laissez-faire with absence of leadership, take these steps: (1) Re-read the NCERT description.', 'The followers are given a high degree of independence...', 'The manager is there only to support them and supply them the required information." (2) Contrast with "no leader".', 'Who is accountable?" (3) Give a concrete example: A university professor guiding PhD students — the professor doesn\'t.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
