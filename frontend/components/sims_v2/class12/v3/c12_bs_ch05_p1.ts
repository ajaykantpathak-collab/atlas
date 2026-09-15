import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch05_p1: SimDef = {
    id: 'v3_c12_bs_ch05_p1',
    title: 'Organising · Part 1/2',
    subtitle: 'Three groups, one spot, zero owners — organising is the fix you skipped.',
    classLevel: 12, subject: 'business_studies', topic: 'Organising · Part 1/2',
    chapters: ['c12_bs_ch05'],
    nodeIds: ['c12_bs_cbse_05_001', 'c12_bs_cbse_05_002', 'c12_bs_cbse_05_003', 'c12_bs_cbse_05_004', 'c12_bs_cbse_05_005', 'c12_bs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Organising committee coordinator', intro: 'A plan names the destination; organising builds the vehicle — structure is what makes people effective together.', goal: 'Explain the meaning and importance of organising and apply its four-step process.' },
    discovery: {
        question: 'Annual Day, 300 students, 5 events — chaos erupts because three groups set up stalls at one spot and no one owns the sound system. What should the coordinator have done first?',
        options: ['Identified and divided the work into chunks — stage, refreshments, discipline — before assigning anyone', 'Appointed a leader for each group immediately', 'Given everyone a copy of the plan document', 'Held a motivation session so volunteers work harder'],
        answer: 'Identified and divided the work into chunks — stage, refreshments, discipline — before assigning anyone',
        hook: 'Organising starts with the work, not the people — the instinct to assign tasks first produces exactly this chaos. Division of work precedes departmentalisation, duties and reporting lines, in that order.',
    },
    teaching: [
        { title: 'Organising: Meaning, Definition and Importance', text: 'Organising is the management function that follows planning, involving the identification and grouping of activities, assignment of duties, delegation of authority, and establishment of reporting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Structure the fest: run the four-step organising process — divide the work, group it into departments, assign duties, and draw the authority-and-reporting map that kills \'who\'s in charge?\' forever.',
        labels: ['Organising: Meaning, Definition', 'Organising Process: Steps', 'Organisational Structure: Functional', 'Functional Structure: Advantages', 'Divisional Structure: Advantages', 'Formal and Informal Organisation'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_001', title: 'Organising: Meaning, Definition and Importance',
          caseStudy: { intro: 'Imagine you are the captain of your school\'s annual fest organising committee.',
            decisions: [{ prompt: 'Define organising according to Louis Allen. Use the exact wording from the textbook.', options: [
                { text: 'Correct answer: "Organising is the process of identifying and grouping the work to be', outcome: 'Correct answer: "Organising is the process of identifying and grouping the work to be performed.' },
                { text: 'A wrong answer that omits', outcome: 'Not quite — Students often equate "organising" with "creating an organisation chart" or "making departments.".', reveals: 'students-often-equate-organising-with' },
                { text: 'defining and delegating responsibility and authority', outcome: 'Not quite — Students often equate "organising" with "creating an organisation chart" or "making departments.".', reveals: 'students-often-equate-organising-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_002', title: 'Organising Process: Steps in Organising',
          caseStudy: { intro: 'Imagine you are appointed the student coordinator for your school\'s Annual Day.',
            decisions: [{ prompt: 'A student writes: "The first step in organising is departmentalisation because we need to create departments before dividing work." Is this.', options: [
                { text: 'The statement is incorrect', outcome: 'The statement is incorrect. NCERT explicitly states the sequence: (i) Identification and division.' },
                { text: 'in real life, managers do everything at once', outcome: 'Not quite — Students believe the four steps are interchangeable or can be done simultaneously because "in real.', reveals: 'the-four-steps-are-interchangeable' },
                { text: 'First we assign duties, then we divide work, then we make departments', outcome: 'Not quite — Students believe the four steps are interchangeable or can be done simultaneously because "in real.', reveals: 'the-four-steps-are-interchangeable' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_003', title: 'Organisational Structure: Functional and Divisional Structure',
          caseStudy: { intro: 'Imagine you are the CEO of a growing Indian FMCG company that currently sells only soaps.',
            decisions: [{ prompt: 'Define organisational structure and state the two broad types of organisational structures discussed in NCERT Class 12 Business Studies.', options: [
                { text: 'Organisational structure is the framework within', outcome: 'Organisational structure is the framework within which managerial and operating tasks are.' },
                { text: 'formal and informal', outcome: 'Not quite — Students memorise the NCERT comparison table as a list of "functional = good for X, divisional.', reveals: 'students-memorise-the-ncert-comparison' },
                { text: 'centralised and decentralised', outcome: 'Not quite — Students memorise the NCERT comparison table as a list of "functional = good for X, divisional.', reveals: 'students-memorise-the-ncert-comparison' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_004', title: 'Functional Structure: Advantages and Disadvantages',
          caseStudy: { intro: 'Imagine you are the principal of a large secondary school with 2,000 students.',
            decisions: [{ prompt: 'Define functional structure and state any two advantages of it as per NCERT.', options: [
                { text: 'Functional structure groups similar jobs into separate departments based on specialised', outcome: 'Functional structure groups similar jobs into separate departments based on specialised functions.' },
                { text: 'functional structure groups by products', outcome: 'Not quite — Students often confuse "functional specialisation" (advantage) with "product specialisation".', reveals: 'students-often-confuse-functional-specialisation' },
                { text: 'quick decision-making', outcome: 'Not quite — Students often confuse "functional specialisation" (advantage) with "product specialisation".', reveals: 'students-often-confuse-functional-specialisation' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_005', title: 'Divisional Structure: Advantages and Disadvantages',
          caseStudy: { intro: 'Imagine you\'re the CEO of "Bharat Foods Ltd." which started with just biscuits but now sells biscuits, dairy products, and ready-to-eat meals.',
            decisions: [{ prompt: 'A company manufacturing only one type of product (cement) with a single plant in one state adopts a divisional structure based on product.', options: [
                { text: 'No', outcome: 'No. NCERT states divisional structure is suitable when "a large variety of products are.' },
                { text: 'divisional structure', outcome: 'Not quite — Students confuse "divisional structure" with "decentralisation" — they think divisional structure.', reveals: 'students-confuse-divisional-structure-with' },
                { text: 'decentralisation', outcome: 'Not quite — Students confuse "divisional structure" with "decentralisation" — they think divisional structure.', reveals: 'students-confuse-divisional-structure-with' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_006', title: 'Formal and Informal Organisation: Meaning and Distinction',
          caseStudy: { intro: 'Imagine you join a new company and receive an organisation chart showing you report to the Marketing Manager, who reports to the VP Marketing.',
            decisions: [{ prompt: 'State the exact NCERT definition of informal organisation and identify the phrase that indicates it is not created by management.', options: [
                { text: 'Correct answer: "Informal organisation is a network of personal and social relations not', outcome: 'Correct answer: "Informal organisation is a network of personal and social relations not.' },
                { text: 'created by management', outcome: 'Not quite — Students often believe formal and informal organisation are mutually exclusive — that an employee.', reveals: 'formal-and-informal-organisation-are' },
                { text: 'prescribed by rules', outcome: 'Not quite — Students often believe formal and informal organisation are mutually exclusive — that an employee.', reveals: 'formal-and-informal-organisation-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A one-man dhaba grows to 50 customers a day, so the owner hires three helpers and tells them \'just help wherever needed\'. Result: two helpers peel onions while nobody serves, the cash box sits unattended, and vegetables spoil unchecked.',
            decisions: [{ prompt: 'What did the owner skip?', options: [
                { text: 'The whole organising process — divide work into distinct jobs, group them into departments, assign duties by aptitude, and set clear authority and reporting lines so everyone knows who does what and answers to whom.', outcome: 'Hiring hands isn\'t organising; without role clarity and relationships you get duplication in one place and abandonment in another.' },
                { text: 'Nothing structural — he just needs to draw an organisation chart and stick it on the wall.', outcome: 'A chart is the output, not the process: without defined duties and reporting relationships, the drawing changes nothing on the floor.', reveals: 'chart-is-organising' },
                { text: 'He simply needs a fourth helper — more hands absorb more work.', outcome: 'The labour was idle in the wrong places, not scarce; unstructured extra hands repeat the same chaos.', reveals: 'more-hands-fix-structure' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now turn a plan into a working structure. The four organising steps are sequence-tested board marks — and the difference between events that run and events that collapse.',
            decisions: [{ prompt: 'What comes next? Organising · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Organising · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_001', difficulty: 'standard',
          question: 'Organising is the management function that follows planning, involving the.',
          hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur) — specifically the.',
          misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Organising is the management function that follows planning, involving the identification',
                  options: ['Organising is the management function that follows planning, involving the identification', 'The organising process is a systematic sequence of four interdependent steps', 'Organisational structure is the framework that defines how activities such as task', 'Functional structure is an organisational design that groups similar or related jobs into'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur) — specifically the section.',
                  misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that organising is a *process*.' }
          ],
            remediations: { 'students-often-equate-organising-with': { steps: ['If a student holds this misconception, do NOT re-read the definition.', 'Instead: (1) Give them a 3-minute "Chaos Simulation": Ask them to verbally instruct 3 classmates to "build a paper.', '(2) Then, have them redo it *using* the 4 steps: identify tasks (cut, fold, tape, assemble), divide (you cut, you.', '(3) Ask: "Which step, if removed, brings back chaos?" This concrete experience anchors the abstract process.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Organising stifles creativity because it forces people into rigid boxes (departments, job descriptions)." Use the importance points.', answer: 'The statement is a half-truth that confuses *bureaucracy* with *organising*',
                  options: ['The statement is a half-truth that confuses *bureaucracy* with *organising*', 'strengthens the company\'s competitive position'],
                  hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur) — specifically the section.',
                  misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that organising is a *process*.' }
          ],
            remediations: { 'students-often-equate-organising-with': { steps: ['If a student holds this misconception, do NOT re-read the definition.', 'Instead: (1) Give them a 3-minute "Chaos Simulation": Ask them to verbally instruct 3 classmates to "build a paper.', '(2) Then, have them redo it *using* the 4 steps: identify tasks (cut, fold, tape, assemble), divide (you cut, you.', '(3) Ask: "Which step, if removed, brings back chaos?" This concrete experience anchors the abstract process.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_002', difficulty: 'standard',
          question: 'The organising process is a systematic sequence of four interdependent steps.',
          hint: 'Revisit c12_bs_cbse_05_001\'s "Meaning" and "Definition" sections — focus on the phrases.',
          misconception: 'Students believe the four steps are interchangeable or can be done simultaneously because "in real life, managers.',
          parts: [
                { id: 'a', prompt: 'A student writes: "The first step in organising is departmentalisation because we need to create departments before dividing work." Is this statement correct?', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'in real life, managers do everything at once', 'First we assign duties, then we divide work, then we make departments'],
                  hint: 'Revisit c12_bs_cbse_05_001\'s "Meaning" and "Definition" sections — focus on the phrases "clarifying.',
                  misconception: 'Students believe the four steps are interchangeable or can be done simultaneously because "in real life, managers do everything at once.".' },
                { id: 'b', prompt: 'A startup with 15 employees skips formal departmentalisation (Step 2) and directly assigns duties (Step 3) based on whoever is free.', answer: 'Step 2 (Departmentalisation) was neglected',
                  options: ['Step 2 (Departmentalisation) was neglected', 'poor communication', 'in real life, managers do everything at once', 'First we assign duties, then we divide work, then we make departments'],
                  hint: 'Revisit c12_bs_cbse_05_001\'s "Meaning" and "Definition" sections — focus on the phrases "clarifying.',
                  misconception: 'Students believe the four steps are interchangeable or can be done simultaneously because "in real life, managers do everything at once.".' }
          ],
            remediations: { 'the-four-steps-are-interchangeable': { steps: ['If a student cannot sequence the steps or explain their interdependence: 1.', 'Have them physically enact the school fete example: write each activity on a sticky note (Step 1), cluster stickies.', 'Ask: "Could you do Step 2 before Step 1?', 'What would you cluster?" → They realise division creates the units.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_003', difficulty: 'standard',
          question: 'Organisational structure is the framework that defines how activities such.',
          hint: 'Revisit c12_bs_cbse_05_002 Step 2 (Departmentalisation) and the example of the school.',
          misconception: 'Students memorise the NCERT comparison table as a list of "functional = good for X, divisional = good for Y" without.',
          parts: [
                { id: 'a', prompt: 'Define organisational structure and state the two broad types of organisational structures discussed in NCERT Class 12 Business Studies Chapter 5.', answer: 'Organisational structure is the framework within',
                  options: ['Organisational structure is the framework within', 'formal and informal', 'centralised and decentralised', 'formal and informal" or "centralised and decentralised'],
                  hint: 'Revisit c12_bs_cbse_05_002 Step 2 (Departmentalisation) and the example of the school library.',
                  misconception: 'Students memorise the NCERT comparison table as a list of "functional = good for X, divisional = good for Y" without understanding the.' },
                { id: 'b', prompt: 'A company manufactures three product lines: cosmetics, garments, and footwear.', answer: 'Yes, it should switch to divisional structure',
                  options: ['Yes, it should switch to divisional structure', 'divisional is better for large companies'],
                  hint: 'Revisit c12_bs_cbse_05_002 Step 2 (Departmentalisation) and the example of the school library.',
                  misconception: 'Students memorise the NCERT comparison table as a list of "functional = good for X, divisional = good for Y" without understanding the.' }
          ],
            remediations: { 'students-memorise-the-ncert-comparison': { steps: ['If a student cannot apply the comparison table to a case, do NOT re-read the table.', 'Instead: (1) Draw two org charts on paper — one functional (MD → Marketing, Finance, Production, HR) and one divisional.', '(2) Pick a decision: "Launch a new shampoo variant." Trace the decision path in both charts — who decides, who.', '(3) Map each step to the NCERT bases: formation, specialisation, responsibility, coordination, cost, managerial.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_004', difficulty: 'standard',
          question: 'Functional structure is an organisational design that groups similar or related.',
          hint: 'If stuck, review the departmentalisation step in c12_bs_cbse_05_002 and the functional.',
          misconception: 'Students often confuse "functional specialisation" (advantage) with "product specialisation" (divisional advantage) and.',
          parts: [
                { id: 'a', prompt: 'Explain why functional structure leads to "functional empires" and how this harms organisational objectives.', answer: 'Functional empires arise',
                  options: ['Functional empires arise', 'functional empires mean the department becomes too large', 'functional specialisation', 'product specialisation'],
                  hint: 'If stuck, review the departmentalisation step in c12_bs_cbse_05_002 and the functional structure.',
                  misconception: 'Students often confuse "functional specialisation" (advantage) with "product specialisation" (divisional advantage) and write "product.' }
          ],
            remediations: { 'students-often-confuse-functional-specialisation': { steps: ['Revisit c12_bs_cbse_05_003 (Organisational Structure: Functional and Divisional) to re-learn the definition and visual.', 'Create a two-column table: left column = each advantage/disadvantage, right column = the structural mechanism (e.g.', 'Take the school principal scenario from the Walkthrough and write one sentence for each of the 11 points (6 advantages.', 'Re-attempt Diagnostic Questions 2, 3, and 4 — they test the exact mechanisms behind the misconceptions.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_005', difficulty: 'standard',
          question: 'Divisional structure is an organisational design where the enterprise.',
          hint: 'Revisit c12_bs_cbse_05_004 (Functional Structure: Advantages and Disadvantages).',
          misconception: 'Students confuse "divisional structure" with "decentralisation" — they think divisional structure IS decentralisation.',
          parts: [
                { id: 'a', prompt: '"In a divisional structure, each division has its own marketing, finance, and production departments." Explain why this statement describes BOTH an advantage.', answer: 'It is an advantage',
                  options: ['It is an advantage', 'divisional structure', 'decentralisation', 'Distinguish between divisional structure and decentralisation'],
                  hint: 'Revisit c12_bs_cbse_05_004 (Functional Structure: Advantages and Disadvantages) — specifically the.',
                  misconception: 'Students confuse "divisional structure" with "decentralisation" — they think divisional structure IS decentralisation.' },
                { id: 'b', prompt: '"StyleCraft Ltd." manufactures three product lines: ethnic wear, western wear, and accessories. It currently uses a functional structure.', answer: 'Advantages: (1) Product specialisation',
                  options: ['Advantages: (1) Product specialisation', 'divisional structure', 'decentralisation', 'Distinguish between divisional structure and decentralisation'],
                  hint: 'Revisit c12_bs_cbse_05_004 (Functional Structure: Advantages and Disadvantages) — specifically the.',
                  misconception: 'Students confuse "divisional structure" with "decentralisation" — they think divisional structure IS decentralisation.' }
          ],
            remediations: { 'students-confuse-divisional-structure-with': { steps: ['Re-read NCERT page 117-119 — note the heading "Divisional Structure" describes structural grouping, while page 130-133.', 'Create a 2x2 matrix: rows = Structure (Functional vs Divisional), columns = Decision Authority (Centralised.', 'Practice writing the distinction: "Divisional structure groups activities by product; decentralisation disperses.', 'Re-attempt Diagnostic Question 5 — the CFO proposal is about centralising a function WITHIN a divisional structure.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_006', difficulty: 'standard',
          question: 'Formal organisation is the deliberately designed structure.',
          hint: 'If unclear on how formal structure gets created, revisit c12_bs_cbse_05_002 (Steps.',
          misconception: 'Students often believe formal and informal organisation are mutually exclusive — that an employee operates in ONE at.',
          parts: [
                { id: 'a', prompt: 'A student writes: "Informal organisation has no structure because it has no rules." Explain why this statement is partially correct but misleading, using the.', answer: 'Correct explanation: The statement is misleading',
                  options: ['Correct explanation: The statement is misleading', 'it has no structure at all'],
                  hint: 'If unclear on how formal structure gets created, revisit c12_bs_cbse_05_002 (Steps in Organising).',
                  misconception: 'Students often believe formal and informal organisation are mutually exclusive — that an employee operates in ONE at a time.' }
          ],
            remediations: { 'formal-and-informal-organisation-are': { steps: ['If the student cannot distinguish the two on all seven bases, do this 3-step remediation: 1) Re-read the NCERT.', '2) For each base, write ONE real workplace example (e.g., for "Flow of Communication": formal = email chain through.', '3) Take the Diagnostic Questions 3 and 4 again — if still wrong, revisit c12_bs_cbse_05_001 (Organising Meaning).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
