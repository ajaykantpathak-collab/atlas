import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch05_p2: SimDef = {
    id: 'v3_c12_bs_ch05_p2',
    title: 'Organising · Part 2/2',
    subtitle: 'Three groups, one spot, zero owners — organising is the fix you skipped.',
    classLevel: 12, subject: 'business_studies', topic: 'Organising · Part 2/2',
    chapters: ['c12_bs_ch05'],
    nodeIds: ['c12_bs_cbse_05_007', 'c12_bs_cbse_05_008', 'c12_bs_cbse_05_009', 'c12_bs_cbse_05_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Organising committee coordinator', intro: 'A plan names the destination; organising builds the vehicle — structure is what makes people effective together.', goal: 'Explain the meaning and importance of organising and apply its four-step process.' },
    discovery: {
        question: 'Annual Day, 300 students, 5 events — chaos erupts because three groups set up stalls at one spot and no one owns the sound system. What should the coordinator have done first?',
        options: ['Identified and divided the work into chunks — stage, refreshments, discipline — before assigning anyone', 'Appointed a leader for each group immediately', 'Given everyone a copy of the plan document', 'Held a motivation session so volunteers work harder'],
        answer: 'Identified and divided the work into chunks — stage, refreshments, discipline — before assigning anyone',
        hook: 'Organising starts with the work, not the people — the instinct to assign tasks first produces exactly this chaos. Division of work precedes departmentalisation, duties and reporting lines, in that order.',
    },
    teaching: [
        { title: 'Informal Organisation: Benefits and Limitations', text: 'Informal organisation is the network of personal and social relationships that arises spontaneously when employees interact beyond their officially defined roles in the formal organisation.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Structure the fest: run the four-step organising process — divide the work, group it into departments, assign duties, and draw the authority-and-reporting map that kills \'who\'s in charge?\' forever.',
        labels: ['Informal Organisation: Benefits', 'Span of Management: Concept', 'Delegation: Meaning, Elements (Authority,', 'Decentralisation: Meaning, Importance'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_007', title: 'Informal Organisation: Benefits and Limitations',
          caseStudy: { intro: 'Imagine you are a new employee at a large Indian IT company. On your first day, you notice that while the official org chart shows you reporting to your team.',
            decisions: [{ prompt: 'State any two benefits of informal organisation as per NCERT Class 12 Business Studies.', options: [
                { text: 'Correct answer: (1) Faster spread of information and quick feedback', outcome: 'Correct answer: (1) Faster spread of information and quick feedback because prescribed lines.' },
                { text: 'better control', outcome: 'Not quite — Students often think "informal organisation is just gossip and should be stopped by management.".', reveals: 'informal-organisation-is-just-gossip' },
                { text: 'clear authority', outcome: 'Not quite — Students often think "informal organisation is just gossip and should be stopped by management.".', reveals: 'informal-organisation-is-just-gossip' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_008', title: 'Span of Management: Concept and Factors Affecting Span',
          caseStudy: { intro: 'Imagine you are the owner of a growing startup with 50 employees. Currently you directly supervise all 50, but decisions are slow and you\'re overwhelmed.',
            decisions: [{ prompt: 'Define \'span of management\' and state how it influences the number of levels in an organisational structure.', options: [
                { text: 'Span of management is the number of subordinates a superior can effectively manage', outcome: 'Span of management is the number of subordinates a superior can effectively manage.' },
                { text: 'impact', outcome: 'Not quite — Students often believe "wider span is always better because it reduces costs and speeds.', reveals: 'wider-span-is-always-better' },
                { text: 'wider span is always better', outcome: 'Not quite — Students often believe "wider span is always better because it reduces costs and speeds.', reveals: 'wider-span-is-always-better' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_009', title: 'Delegation: Meaning, Elements (Authority, Responsibility, Accountability)',
          caseStudy: { intro: 'Imagine you are the captain of a school cricket team. You cannot bowl, bat, keep wickets, and field all at once — you must assign roles.',
            decisions: [{ prompt: 'Define delegation as per Louis Allen and state the three elements he identifies.', options: [
                { text: 'Delegation is the entrustment of responsibility and authority to another and the creation', outcome: 'Delegation is the entrustment of responsibility and authority to another and the creation.' },
                { text: 'delegation is just giving work to subordinates', outcome: 'Not quite — Students often think "delegation means the manager is no longer responsible." They write: "After.', reveals: 'delegation-means-the-manager-is' },
                { text: 'delegation means the manager is no longer responsible', outcome: 'Not quite — Students often think "delegation means the manager is no longer responsible." They write: "After.', reveals: 'delegation-means-the-manager-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_010', title: 'Decentralisation: Meaning, Importance and Distinction from Delegation',
          caseStudy: { intro: 'Imagine you are the CEO of a fast-growing Indian snack-food startup with factories in three states.',
            decisions: [{ prompt: 'Define decentralisation in one sentence using the exact phrase "systematic delegation" and mention what is retained at the centre.', options: [
                { text: 'Correct answer: "Decentralisation is the systematic delegation of authority to the lowest', outcome: 'Correct answer: "Decentralisation is the systematic delegation of authority to the lowest levels.' },
                { text: 'A wrong answer that says', outcome: 'Not quite — Students write "Decentralisation means no central control" or "Decentralisation and delegation are.', reveals: 'students-write-decentralisation-means-no' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A one-man dhaba grows to 50 customers a day, so the owner hires three helpers and tells them \'just help wherever needed\'. Result: two helpers peel onions while nobody serves, the cash box sits unattended, and vegetables spoil unchecked.',
            decisions: [{ prompt: 'What did the owner skip?', options: [
                { text: 'The whole organising process — divide work into distinct jobs, group them into departments, assign duties by aptitude, and set clear authority and reporting lines so everyone knows who does what and answers to whom.', outcome: 'Hiring hands isn\'t organising; without role clarity and relationships you get duplication in one place and abandonment in another.' },
                { text: 'Nothing structural — he just needs to draw an organisation chart and stick it on the wall.', outcome: 'A chart is the output, not the process: without defined duties and reporting relationships, the drawing changes nothing on the floor.', reveals: 'chart-is-organising' },
                { text: 'He simply needs a fourth helper — more hands absorb more work.', outcome: 'The labour was idle in the wrong places, not scarce; unstructured extra hands repeat the same chaos.', reveals: 'more-hands-fix-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_010', title: 'You made it',
          caseStudy: { intro: 'You can now turn a plan into a working structure. The four organising steps are sequence-tested board marks — and the difference between events that run and events that collapse.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_007', difficulty: 'standard',
          question: 'Informal organisation is the network of personal and social relationships that.',
          hint: 'Revisit c12_bs_cbse_05_006 and create a two-column table: Formal Organisation vs Informal.',
          misconception: 'Students often think "informal organisation is just gossip and should be stopped by management." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'State any two benefits of informal organisation as per NCERT Class 12 Business Studies.', answer: 'Correct answer: (1) Faster spread of information and quick feedback',
                  options: ['Correct answer: (1) Faster spread of information and quick feedback', 'better control', 'clear authority', 'informal organisation is just gossip and should be stopped by management'],
                  hint: 'Revisit c12_bs_cbse_05_006 and create a two-column table: Formal Organisation vs Informal.',
                  misconception: 'Students often think "informal organisation is just gossip and should be stopped by management." This is wrong because NCERT explicitly.' },
                { id: 'b', prompt: 'Explain in your own words why informal organisation is said to "compensate for inadequacies in the formal organisation". Give a concrete workplace example.', answer: 'Correct explanation: Formal organisation has rigid rules and slow channels',
                  options: ['Correct explanation: Formal organisation has rigid rules and slow channels', 'informal organisation replaces formal organisation', 'informal organisation is just gossip and should be stopped by management', '"informal organisation is just gossip and should be stopped by management'],
                  hint: 'Revisit c12_bs_cbse_05_006 and create a two-column table: Formal Organisation vs Informal.',
                  misconception: 'Students often think "informal organisation is just gossip and should be stopped by management." This is wrong because NCERT explicitly.' },
                { id: 'c', prompt: 'Compare the flow of communication in formal and informal organisation.', answer: 'Correct analysis: Formal communication follows the scalar chain (vertical, slow,',
                  options: ['Correct analysis: Formal communication follows the scalar chain (vertical, slow,', 'fast vs slow', 'informal organisation is just gossip and should be stopped by management', 'only lists "fast vs slow" without crisis context shows surface-level comparison'],
                  hint: 'Revisit c12_bs_cbse_05_006 and create a two-column table: Formal Organisation vs Informal.',
                  misconception: 'Students often think "informal organisation is just gossip and should be stopped by management." This is wrong because NCERT explicitly.' }
          ],
            remediations: { 'informal-organisation-is-just-gossip': { steps: ['If the student holds the "ban informal groups" misconception: Step 1 — Ask them to recall a time they solved.', 'Step 2 — Show the NCERT line: "Informal organisation cannot be altogether eliminated." Step 3 — Have them re-read the.', 'Step 4 — Give a mini-case: "A manager bans lunch-group discussions.', 'What happens to information flow and morale?" Step 5 — Student writes a 3-sentence correction: "Informal organisation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "informal organisation is just gossip and should be stopped by management." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A strong informal organisation always indicates a weak formal organisation." Defend your position with two arguments from NCERT.', answer: 'Correct evaluation: The statement is false',
                  options: ['Correct evaluation: The statement is false', 'informal organisation is just gossip and should be stopped by management', 'agrees with the statement confuses correlation with causation', '"informal organisation is just gossip and should be stopped by management'],
                  hint: 'Revisit c12_bs_cbse_05_006 and create a two-column table: Formal Organisation vs Informal.',
                  misconception: 'Students often think "informal organisation is just gossip and should be stopped by management." This is wrong because NCERT explicitly.' }
          ],
            remediations: { 'informal-organisation-is-just-gossip': { steps: ['If the student holds the "ban informal groups" misconception: Step 1 — Ask them to recall a time they solved.', 'Step 2 — Show the NCERT line: "Informal organisation cannot be altogether eliminated." Step 3 — Have them re-read the.', 'Step 4 — Give a mini-case: "A manager bans lunch-group discussions.', 'What happens to information flow and morale?" Step 5 — Student writes a 3-sentence correction: "Informal organisation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_008', difficulty: 'standard',
          question: 'Span of management refers to the number of subordinates that a superior can.',
          hint: 'Revisit the organising process steps (c12_bs_cbse_05_002) and practice drawing hierarchy.',
          misconception: 'Students often believe "wider span is always better because it reduces costs and speeds communication." They ignore.',
          parts: [
                { id: 'a', prompt: '"Span of management is fixed at 10 subordinates per manager for all organisations." Explain why this statement is incorrect using the concept of factors.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'wider span is always better', '"wider span is always better'],
                  hint: 'Revisit the organising process steps (c12_bs_cbse_05_002) and practice drawing hierarchy charts for.',
                  misconception: 'Students often believe "wider span is always better because it reduces costs and speeds communication." They ignore that an excessively.' },
                { id: 'b', prompt: 'A manufacturing company has 1,000 shop-floor workers performing repetitive assembly tasks. The production manager wants to minimise management layers.', answer: 'Recommended span: 20-30 subordinates per supervisor',
                  options: ['Recommended span: 20-30 subordinates per supervisor', 'complex work', 'high decentralisation', 'wider span is always better'],
                  hint: 'Revisit the organising process steps (c12_bs_cbse_05_002) and practice drawing hierarchy charts for.',
                  misconception: 'Students often believe "wider span is always better because it reduces costs and speeds communication." They ignore that an excessively.' },
                { id: 'c', prompt: 'Compare the organisational structures resulting from a span of 5 versus a span of 25 in an organisation of 1,000 employees.', answer: 'Span 5 → tall structure: ~5 levels (1,000 → 200 → 40 → 8 → 1)',
                  options: ['Span 5 → tall structure: ~5 levels (1,000 → 200 → 40 → 8 → 1)', 'wider span is always better', '"wider span is always better'],
                  hint: 'Revisit the organising process steps (c12_bs_cbse_05_002) and practice drawing hierarchy charts for.',
                  misconception: 'Students often believe "wider span is always better because it reduces costs and speeds communication." They ignore that an excessively.' }
          ],
            remediations: { 'wider-span-is-always-better': { steps: ['If the student holds the "wider is always better" misconception, have them: (1) Re-read the NCERT paragraph on span.', '(3) Create a two-column table: "Situations favouring wide span" vs "Situations favouring narrow span" using the seven.', '(4) Re-attempt Diagnostic Question 6 with a narrow-span scenario.', 'This forces confrontation with the contingency logic.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_009', difficulty: 'standard',
          question: 'Delegation is the process by which a manager (superior) transfers authority.',
          hint: 'If stuck, revisit c12_bs_cbse_05_002 (Organising Process) to see how delegation fits into.',
          misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the.',
          parts: [
                { id: 'a', prompt: 'A Production Manager delegates the target of 200 units/day to a Foreman but does not give authority to requisition tools/materials from Stores.', answer: 'No, the Production Manager cannot blame the Foreman',
                  options: ['No, the Production Manager cannot blame the Foreman', 'yes, the Foreman should have asked for authority', 'delegation means the manager is no longer responsible', 'After delegation, the subordinate is accountable'],
                  hint: 'If stuck, revisit c12_bs_cbse_05_002 (Organising Process) to see how delegation fits into.',
                  misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the subordinate.' },
                { id: 'b', prompt: 'Compare and contrast the flow of authority, responsibility, and accountability in delegation.', answer: 'Authority flows downward (superior → subordinate), responsibility flows upward',
                  options: ['Authority flows downward (superior → subordinate), responsibility flows upward', 'accountability flows downward like authority', 'delegation means the manager is no longer responsible', 'After delegation, the subordinate is accountable'],
                  hint: 'If stuck, revisit c12_bs_cbse_05_002 (Organising Process) to see how delegation fits into.',
                  misconception: 'Students often think "delegation means the manager is no longer responsible." They write: "After delegation, the subordinate.' }
          ],
            remediations: { 'delegation-means-the-manager-is': { steps: ['Re-read the NCERT paragraph: "However, delegation does not mean abdication.', 'Draw the delegation triangle: Authority (down) → Responsibility (up) → Accountability (up, non-delegable).', 'Re-attempt Diagnostic Q3 and Q5, forcing yourself to state "Manager retains accountability" in every answer.', 'If still stuck, revisit node c12_bs_cbse_05_008 (Span of Management) to see how delegation creates hierarchy levels.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_010', difficulty: 'standard',
          question: 'Decentralisation is the systematic delegation of decision-making authority.',
          hint: 'Revisit node c12_bs_cbse_05_009 and practice the "Overview of the elements of delegation".',
          misconception: 'Students write "Decentralisation means no central control" or "Decentralisation and delegation are the same thing." The.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Decentralisation is the systematic delegation of decision-making authority to the lowest',
                  options: ['Decentralisation is the systematic delegation of decision-making authority to the lowest', 'Organising is the management function that follows planning, involving the identification', 'The organising process is a systematic sequence of four interdependent steps', 'Organisational structure is the framework that defines how activities such as task'],
                  hint: 'Revisit node c12_bs_cbse_05_009 and practice the "Overview of the elements of delegation" table.',
                  misconception: 'Students write "Decentralisation means no central control" or "Decentralisation and delegation are the same thing." The error stems from.' }
          ],
            remediations: { 'students-write-decentralisation-means-no': { steps: ['Re-read the NCERT "Delegation and Decentralisation: A Comparative view" table (page 134).', 'For each row (Nature, Freedom, Status, Scope, Purpose), create a flashcard with a one-sentence differentiator and.', 'Take the diagnostic questions 3 and 4 again; if still wrong, revisit node c12_bs_cbse_05_009 (Delegation) to relearn.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
