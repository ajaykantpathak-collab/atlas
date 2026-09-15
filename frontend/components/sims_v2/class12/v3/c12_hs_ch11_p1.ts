import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch11_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch11_p1: SimDef = {
    id: 'v3_c12_hs_ch11_p1',
    title: 'Resource Management · Part 1/2',
    subtitle: 'Her degree is hers; the salary is the family\'s',
    classLevel: 12, subject: 'home_science', topic: 'Resource Management · Part 1/2',
    chapters: ['c12_hs_ch11'],
    nodeIds: ['c12_hs_cbse_11_001', 'c12_hs_cbse_11_002', 'c12_hs_cbse_11_003', 'c12_hs_cbse_11_004', 'c12_hs_cbse_11_005', 'c12_hs_cbse_11_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Resource analyst', intro: 'A family\'s real wealth isn\'t in the bank — it\'s in skills, time, energy and shared things nobody itemised.', goal: 'Classify family resources and run the five-step management cycle on a concrete household goal.' },
    discovery: {
        question: 'A mother\'s nursing degree and a family\'s car are both \'resources\' — but which can the family actually share, and which lives only in one person?',
        options: ['The skill is individual, the car shared — the qualification stays in her body though its salary becomes family money; the resource and its output aren\'t the same thing', 'Both are shared', 'The car is individual', 'Degrees transfer'],
        answer: 'The skill is individual, the car shared — the qualification stays in her body though its salary becomes family money; the resource and its output aren\'t the same thing',
        hook: 'Resources aren\'t just money and time — skills, energy, a community park all count. Interchangeable doesn\'t mean manageable: a park substitutes for a garden but nobody controls its hours; money can buy time, but time can\'t store itself.',
    },
    teaching: [
        { title: 'Family Resource Management: Concept and Scope', text: 'Family Resource Management is the systematic process of planning, organizing, implementing, controlling, and evaluating the use of human resources (knowledge, skills, time, energy) and non-human.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_11_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Map a household\'s true wealth: classify resources across human/non-human and individual/shared/natural/community, then run a 20% electricity cut through all five management steps.',
        labels: ['Family Resource Management: Concept', 'Family Resources: Human', 'Management Process: Planning, Organising,', 'Decision-Making in Family Management', 'Time Management: Time Use', 'Money Management: Family Income,'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_001', title: 'Family Resource Management: Concept and Scope',
          caseStudy: { intro: 'Imagine your family is planning a weekend trip to a hill station with a budget of ₹15,000, two days of leave, one car, and three family members with different.',
            decisions: [{ prompt: 'Define "Family Resource Management" in your own words and list the two broad categories of resources it deals with.', options: [
                { text: 'Family Resource Management is the systematic process of planning, organizing,', outcome: 'Family Resource Management is the systematic process of planning, organizing, implementing.' },
                { text: 'money and time', outcome: 'Not quite — Students often think "resource management = budgeting money" and treat time, energy, and skills.', reveals: 'resource-management-budgeting-money-and' },
                { text: 'systematic process', outcome: 'Not quite — Students often think "resource management = budgeting money" and treat time, energy, and skills.', reveals: 'resource-management-budgeting-money-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_002', title: 'Family Resources: Human and Material Resources in the Home',
          caseStudy: { intro: 'Imagine you are the manager of a 50-room hotel preparing for a weekend wedding event with 200 guests.',
            decisions: [{ prompt: 'List the four stages of the guest cycle in correct sequence and state one key activity performed by the front office in each stage.', options: [
                { text: 'Correct sequence: 1) Pre-arrival', outcome: 'Correct sequence: 1) Pre-arrival — quoting rates and reserving rooms via central reservation.' },
                { text: 'housekeeping = cleaning only', outcome: 'Not quite — Students believe "housekeeping = cleaning only" and "front office = reception only." They write.', reveals: 'housekeeping-cleaning-only-and-front' },
                { text: 'front office = reception only', outcome: 'Not quite — Students believe "housekeeping = cleaning only" and "front office = reception only." They write.', reveals: 'housekeeping-cleaning-only-and-front' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_004', title: 'Decision-Making in Family Management: Types and Steps',
          caseStudy: { intro: 'Imagine your family\'s refrigerator breaks down two days before a major festival — do you repair it, buy a new one on EMI, or manage with a neighbour\'s fridge?',
            decisions: [{ prompt: 'A family decides to buy a new washing machine because their old one is making noise.', options: [
                { text: 'They skipped Step 2: Gather Information, and Step 3: Generate Alternatives', outcome: 'They skipped Step 2: Gather Information, and Step 3: Generate Alternatives.' },
                { text: 'they skipped implementation', outcome: 'Not quite — Students believe "decision-making" means only the moment of choosing (Step 4: Evaluate and Select).', reveals: 'decision-making-means-only-the' },
                { text: 'decision-making', outcome: 'Not quite — Students believe "decision-making" means only the moment of choosing (Step 4: Evaluate and Select).', reveals: 'decision-making-means-only-the' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_005', title: 'Time Management: Time Use Patterns, Records and Time Plans',
          caseStudy: { intro: 'Imagine you are a Class 12 student preparing for board exams and CUET, but you feel you never have enough time.',
            decisions: [{ prompt: 'Define "time use pattern" and list the four standard categories used to classify daily activities in home science.', options: [
                { text: 'Time use pattern is the distribution of a person\'s 24 hours across different types of', outcome: 'Time use pattern is the distribution of a person\'s 24 hours across different types of activities.' },
                { text: 'personal maintenance', outcome: 'Not quite — Students often believe "time management means packing every minute with productive work." They.', reveals: 'time-management-means-packing-every' },
                { text: 'time management means packing every minute with productive work', outcome: 'Not quite — Students often believe "time management means packing every minute with productive work." They.', reveals: 'time-management-means-packing-every' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_hs_cbse_11_006', title: 'Money Management: Family Income, Expenditure and Budgeting',
          scaffold: { problem: 'The Sharma family has a monthly money income of ₹75,000. They also own their house (saving rent of ₹20,000) and grow vegetables worth.',
            steps: [
            { text: 'Calculate total money income = ₹75,000.' },
            { text: 'Calculate real income = Imputed rent ₹20,000 + Home-grown vegetables ₹3,000 = ₹23,000.' },
            { text: 'Classify expenses: Fixed = EMI ₹15,000 + Education ₹8,000 = ₹23,000 (contractual).' },
            { text: 'Total planned expenditure (including savings as outflow) = Fixed ₹23,000 + Variable ₹27,000 + Discretionary ₹9,000.' },
            { text: 'Compare total money income (₹75,000) with total planned cash expenditure (₹71,000). Surplus = ₹4,000.' },
            { text: 'Real income of ₹23,000 means the family\'s effective economic position is stronger; they could increase savings.', faded: true, blankAnswer: 'Total Money Income: ₹75,000; Real Income: ₹23,000; Total.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_11_002', title: 'Identify each idea',
          dissect: { specimen: 'Resource Management · Part 1/2', spots: [
            { id: 's1', label: 'Family Resource Management Concept and Scope', prompt: 'Which idea is this? — Family Resource Management is the systematic process of planning, organizing.', answer: 'Family Resource Management Concept and Scope', options: ['Family Resource Management Concept and Scope', 'Family Resources Human and Material Resources in the Home', 'Decision-Making in Family Management Types and Steps', 'Time Management Time Use Patterns Records and Time Plans'] },
            { id: 's2', label: 'Family Resources Human and Material Resources in the Home', prompt: 'Which idea is this? — Hospitality management is the systematic coordination of human resources (staff across.', answer: 'Family Resources Human and Material Resources in the Home', options: ['Family Resources Human and Material Resources in the Home', 'Family Resource Management Concept and Scope', 'Decision-Making in Family Management Types and Steps', 'Time Management Time Use Patterns Records and Time Plans'] },
            { id: 's3', label: 'Decision-Making in Family Management Types and Steps', prompt: 'Which idea is this? — Decision-making in family management is the systematic process of identifying and.', answer: 'Decision-Making in Family Management Types and Steps', options: ['Decision-Making in Family Management Types and Steps', 'Family Resource Management Concept and Scope', 'Family Resources Human and Material Resources in the Home', 'Time Management Time Use Patterns Records and Time Plans'] },
            { id: 's4', label: 'Time Management Time Use Patterns Records and Time Plans', prompt: 'Which idea is this? — Time management in family resource management refers to the systematic process.', answer: 'Time Management Time Use Patterns Records and Time Plans', options: ['Time Management Time Use Patterns Records and Time Plans', 'Family Resource Management Concept and Scope', 'Family Resources Human and Material Resources in the Home', 'Decision-Making in Family Management Types and Steps'] },
            { id: 's5', label: 'Money Management Family Income Expenditure and Budgeting', prompt: 'Which idea is this? — Money Management in a family context refers to the systematic process of planning.', answer: 'Money Management Family Income Expenditure and Budgeting', options: ['Money Management Family Income Expenditure and Budgeting', 'Family Resource Management Concept and Scope', 'Family Resources Human and Material Resources in the Home', 'Decision-Making in Family Management Types and Steps'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At your internship in a 40-room guesthouse, a corporate client checks in at noon and finds the room still uncleaned — the previous guest left at 8 AM. The supervisor shrugs: \'housekeeping cleans when they notice a room is empty.\'',
            decisions: [{ prompt: 'What mechanism was missing?', options: [
                { text: 'The control-desk relay — front office should push departure info to housekeeping\'s desk control, which assigns an attendant, then the floor supervisor inspects and hands the room back for resale; \'cleaning when noticed\' skips the information system entirely.', outcome: 'The chapter\'s point: housekeeping isn\'t reactive labour — it\'s a coordinated loop keyed to the guest cycle; the uncleaned room is a communication failure, not a cleaning failure.' },
                { text: 'The room attendant slacked — a stricter supervisor on rounds would fix it.', outcome: 'The chain broke upstream: the attendant was never told the room was vacant; supervision polices work that\'s been assigned, it can\'t replace the front-office-to-desk-control handoff that assigns it.', reveals: 'supervision-replaces-system' },
                { text: 'Just hire more cleaners — idle staff would have caught it.', outcome: 'Adding labour to a broken relay adds cost, not signal; the chapter\'s staffing math assumes work flows through the desk — headcount can\'t substitute for the missing information.', reveals: 'more-staff-equals-coverage' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_11_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now inventory a family\'s real assets — and see why the scarcest resource is often the one nobody counted.',
            decisions: [{ prompt: 'What comes next? Resource Management · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Resource Management · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_001', difficulty: 'standard',
          question: 'Family Resource Management is the systematic process of planning, organizing.',
          hint: 'Revisit c11_hs_cbse_04_005 (Classification of Resources) and c11_hs_cbse_04_001 (Concept.',
          misconception: 'Students often think "resource management = budgeting money" and treat time, energy, and skills as secondary.',
          parts: [
                { id: 'a', prompt: 'Define "Family Resource Management" in your own words and list the two broad categories of resources it deals with.', answer: 'Family Resource Management is the systematic process of planning, organizing,',
                  options: ['Family Resource Management is the systematic process of planning, organizing,', 'money and time', 'systematic process', 'resource management = budgeting money'],
                  hint: 'Revisit c11_hs_cbse_04_005 (Classification of Resources) and c11_hs_cbse_04_001 (Concept of.',
                  misconception: 'Students often think "resource management = budgeting money" and treat time, energy, and skills as secondary or invisible.' },
                { id: 'b', prompt: 'A family has a vegetable garden, a car, the mother\'s nursing qualification, the father\'s carpentry skills, and access to a community park.', answer: 'human vs non-human, (',
                  options: ['human vs non-human, (', 'shared', 'natural', 'resource management = budgeting money'],
                  hint: 'Revisit c11_hs_cbse_04_005 (Classification of Resources) and c11_hs_cbse_04_001 (Concept of.',
                  misconception: 'Students often think "resource management = budgeting money" and treat time, energy, and skills as secondary or invisible.' },
                { id: 'c', prompt: 'Apply the five-step management process to this situation: A family of four wants to reduce their monthly electricity bill by 20% over the next three months.', answer: 'Step 1 PLANNING: Set goal = ₹3,600/month (20% reduction)',
                  options: ['Step 1 PLANNING: Set goal = ₹3,600/month (20% reduction)', 'resource management = budgeting money', 'planning alone ensures results'],
                  hint: 'Revisit c11_hs_cbse_04_005 (Classification of Resources) and c11_hs_cbse_04_001 (Concept of.',
                  misconception: 'Students often think "resource management = budgeting money" and treat time, energy, and skills as secondary or invisible.' }
          ],
            remediations: { 'resource-management-budgeting-money-and': { steps: ['If the student shows this misconception: Step 1 — Have them re-read c11_hs_cbse_04_001 (Concept of a Resource) and.', 'Step 2 — Do a 10-minute "Resource Audit" of their own day: list every resource they used from waking to sleeping (alarm.', 'Step 3 — Re-attempt Diagnostic Question 2 with this audit as reference.', 'Step 4 — If still classifying only money/time, explicitly contrast: "Your cooking skill is a resource — it saves money.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "resource management = budgeting money" and treat time, energy, and skills as secondary.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "In modern dual-income nuclear families, time has become a more critical resource than money for effective family resource.', answer: 'CRITIQUE (balanced): The statement overgeneralizes',
                  options: ['CRITIQUE (balanced): The statement overgeneralizes', 'yes, time is limited', 'resource management = budgeting money'],
                  hint: 'Revisit c11_hs_cbse_04_005 (Classification of Resources) and c11_hs_cbse_04_001 (Concept of.',
                  misconception: 'Students often think "resource management = budgeting money" and treat time, energy, and skills as secondary or invisible.' }
          ],
            remediations: { 'resource-management-budgeting-money-and': { steps: ['If the student shows this misconception: Step 1 — Have them re-read c11_hs_cbse_04_001 (Concept of a Resource) and.', 'Step 2 — Do a 10-minute "Resource Audit" of their own day: list every resource they used from waking to sleeping (alarm.', 'Step 3 — Re-attempt Diagnostic Question 2 with this audit as reference.', 'Step 4 — If still classifying only money/time, explicitly contrast: "Your cooking skill is a resource — it saves money.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_002', difficulty: 'standard',
          question: 'Hospitality management is the systematic coordination of human resources (staff.',
          hint: 'Revisit c11_hs_cbse_04_006 and c11_hs_cbse_04_007 — practice classifying 10 hotel items.',
          misconception: 'Students believe "housekeeping = cleaning only" and "front office = reception only." They write: "Housekeeping.',
          parts: [
                { id: 'a', prompt: 'List the four stages of the guest cycle in correct sequence and state one key activity performed by the front office in each stage.', answer: 'Correct sequence: 1) Pre-arrival',
                  options: ['Correct sequence: 1) Pre-arrival', 'housekeeping = cleaning only', 'front office = reception only', 'Housekeeping department provides food to customers'],
                  hint: 'Revisit c11_hs_cbse_04_006 and c11_hs_cbse_04_007 — practice classifying 10 hotel items (e.g., room.',
                  misconception: 'Students believe "housekeeping = cleaning only" and "front office = reception only." They write: "Housekeeping department provides food.' },
                { id: 'b', prompt: 'The executive housekeeper must prepare a duty roster for a 100-room hotel with 3 shifts. Each room attendant cleans 16 rooms per shift.', answer: 'Room attendants: 100 rooms ÷ 16 = 6.25 → 7 attendants per shift × 3 shifts = 21',
                  options: ['Room attendants: 100 rooms ÷ 16 = 6.25 → 7 attendants per shift × 3 shifts = 21', 'housekeeping = cleaning only', 'front office = reception only', 'Housekeeping department provides food to customers'],
                  hint: 'Revisit c11_hs_cbse_04_006 and c11_hs_cbse_04_007 — practice classifying 10 hotel items (e.g., room.',
                  misconception: 'Students believe "housekeeping = cleaning only" and "front office = reception only." They write: "Housekeeping department provides food.' }
          ],
            remediations: { 'housekeeping-cleaning-only-and-front': { steps: ['Re-read NCERT Table 17.1 (Front Office designations) and Fig. 17.6 (Housekeeping org chart) — make a two-column table.', 'For each of the 7 housekeeping sections (Fig. 17.5), write the primary material resource they manage (e.g., Linen room.', 'Take Review Questions 7(a)–(e) — write T/F with one-sentence justification using correct terminology.', 'Re-attempt Diagnostic Q2 and Q4 — if still wrong, revisit c11_hs_cbse_04_007 (Characteristics of Resources.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_003', difficulty: 'standard',
          question: 'The management process in family resource management is a systematic, cyclic.',
          hint: 'If stuck on distinguishing Controlling vs. Evaluating, re-read Class 11 node.',
          misconception: 'Students treat the management process as a linear checklist: "Plan → Organise → Implement → Control → Evaluate → DONE.".',
          parts: [
                { id: 'a', prompt: 'Explain in your own words the difference between "Organising" and "Implementing" in the management process. Give one concrete family example for each.', answer: 'Organising is the structural setup: allocating resources, creating roles, and',
                  options: ['Organising is the structural setup: allocating resources, creating roles, and', 'organising is doing the work', 'distinguish between', 'swaps the two (e'],
                  hint: 'If stuck on distinguishing Controlling vs. Evaluating, re-read Class 11 node **c11_hs_cbse_04_009**.',
                  misconception: 'Students treat the management process as a linear checklist: "Plan → Organise → Implement → Control → Evaluate → DONE." They miss that.' },
                { id: 'b', prompt: 'A family plans to reduce monthly electricity consumption by 20%.', answer: 'The missing step is Evaluating',
                  options: ['The missing step is Evaluating', 'Controlling is missing'],
                  hint: 'If stuck on distinguishing Controlling vs. Evaluating, re-read Class 11 node **c11_hs_cbse_04_009**.',
                  misconception: 'Students treat the management process as a linear checklist: "Plan → Organise → Implement → Control → Evaluate → DONE." They miss that.' },
                { id: 'c', prompt: 'Compare the management process in a family setting versus a small business.', answer: 'Similarities: (1) Both follow the same five-step cyclic sequence',
                  options: ['Similarities: (1) Both follow the same five-step cyclic sequence', 'family is smaller', 'compare', 'lists only superficial differences (e'],
                  hint: 'If stuck on distinguishing Controlling vs. Evaluating, re-read Class 11 node **c11_hs_cbse_04_009**.',
                  misconception: 'Students treat the management process as a linear checklist: "Plan → Organise → Implement → Control → Evaluate → DONE." They miss that.' }
          ],
            remediations: { 'students-treat-the-management-process': { steps: ['Revisit Class 11 nodes **c11_hs_cbse_04_008** (Planning as first step) and **c11_hs_cbse_04_009** (Organising.', 'Take a simple personal goal (e.g., "finish NCERT chapter in 3 days") and manually write one action for each of the five.', 'Re-attempt Diagnostic Question 6 with a new goal (e.g., "prepare for CUET mock test") to verify you can close the loop.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_004', difficulty: 'standard',
          question: 'Decision-making in family management is the systematic process of identifying.',
          hint: 'If stuck, revisit c12_hs_cbse_11_003 and write one paragraph linking each management.',
          misconception: 'Students believe "decision-making" means only the moment of choosing (Step 4: Evaluate and Select).',
          parts: [
                { id: 'a', prompt: 'A family decides to buy a new washing machine because their old one is making noise.', answer: 'They skipped Step 2: Gather Information, and Step 3: Generate Alternatives',
                  options: ['They skipped Step 2: Gather Information, and Step 3: Generate Alternatives', 'they skipped implementation', 'decision-making', 'buying is the first step'],
                  hint: 'If stuck, revisit c12_hs_cbse_11_003 and write one paragraph linking each management function to.',
                  misconception: 'Students believe "decision-making" means only the moment of choosing (Step 4: Evaluate and Select).' },
                { id: 'b', prompt: 'Classify this decision: "A family chooses to invest ₹50,000 from their savings in a Public Provident Fund (PPF) account for their child\'s higher education 12.', answer: 'This is a strategic decision',
                  options: ['This is a strategic decision', 'routine', 'economic', 'decision-making'],
                  hint: 'If stuck, revisit c12_hs_cbse_11_003 and write one paragraph linking each management function to.',
                  misconception: 'Students believe "decision-making" means only the moment of choosing (Step 4: Evaluate and Select).' }
          ],
            remediations: { 'decision-making-means-only-the': { steps: ['If the student cannot map a scenario to decision types or steps: 1) Revisit c12_hs_cbse_11_003 (Management Process).', '2) Use the "Fridge Breakdown" walkthrough: force them to write one sentence for each of the 5 steps for that scenario.', '3) Give a new scenario (e.g., "choosing a stream after Class 10") and have them classify it (strategic) and list Step 2.', '4) Re-diagnose with DIAGNOSTIC_QUESTION_3 — if they still give generic steps, they need to practice context-specific.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_005', difficulty: 'standard',
          question: 'Time management in family resource management refers to the systematic process.',
          hint: 'If stuck, revisit c11_hs_cbse_04_010 (Time Management Strategies) and c11_hs_cbse_07_009.',
          misconception: 'Students often believe "time management means packing every minute with productive work." They create plans with zero.',
          parts: [
                { id: 'a', prompt: 'A student records her day and finds she spends 9 hours sleeping, 2 hours eating, 6 hours in school, 1 hour commuting, 3 hours on homework, 2 hours on phone.', answer: 'Obligatory: school (6 h)',
                  options: ['Obligatory: school (6 h)', 'choice of activity', 'choice of time allocation', 'time management means packing every minute with productive work'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_010 (Time Management Strategies) and c11_hs_cbse_07_009 (Time as.',
                  misconception: 'Students often believe "time management means packing every minute with productive work." They create plans with zero white space,.' },
                { id: 'b', prompt: 'Using the data from Question 2, calculate the percentage of waking hours (15 h) spent on discretionary activities.', answer: 'Total discretionary = phone (2 h) + exercise (1 h) = 3 h',
                  options: ['Total discretionary = phone (2 h) + exercise (1 h) = 3 h', 'time management means packing every minute with productive work', 'reduces sleep or meals violates physiological minimums', '"time management means packing every minute with productive work'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_010 (Time Management Strategies) and c11_hs_cbse_07_009 (Time as.',
                  misconception: 'Students often believe "time management means packing every minute with productive work." They create plans with zero white space,.' },
                { id: 'c', prompt: 'Compare the "time diary method" and the "recall method" for recording time use.', answer: 'Time diary: Advantages',
                  options: ['Time diary: Advantages', 'time management means packing every minute with productive work', '"time management means packing every minute with productive work'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_010 (Time Management Strategies) and c11_hs_cbse_07_009 (Time as.',
                  misconception: 'Students often believe "time management means packing every minute with productive work." They create plans with zero white space,.' }
          ],
            remediations: { 'time-management-means-packing-every': { steps: ['If a student exhibits this misconception: (1) Have them track their actual time for two days with a timer, noting every.', '(2) Ask them to calculate the percentage of planned vs.', 'actual adherence — typically < 60% for buffer-less plans.', '(3) Show them the "Pomodoro + buffer" template: 50 min work, 10 min break, 5 min buffer.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_11_006', difficulty: 'standard',
          question: 'Money Management in a family context refers to the systematic process.',
          hint: 'Revisit Class 11 node c11_hs_cbse_10_003 (Family Income types) and c11_hs_cbse_10_006.',
          misconception: 'Students often think that "budgeting means cutting down all enjoyment and living frugally." They equate budgeting with.',
          parts: [
                { id: 'a', prompt: 'What are the three types of family income according to Home Science classification, and give one example of each?', answer: 'The three types are: (1) Money Income',
                  options: ['The three types are: (1) Money Income', 'budgeting means cutting down all enjoyment and living frugally', '"budgeting means cutting down all enjoyment and living frugally'],
                  hint: 'Revisit Class 11 node c11_hs_cbse_10_003 (Family Income types) and c11_hs_cbse_10_006 (Steps.',
                  misconception: 'Students often think that "budgeting means cutting down all enjoyment and living frugally." They equate budgeting with deprivation, so they.' },
                { id: 'b', prompt: 'A family has a monthly money income of ₹60,000. Their fixed expenses are ₹25,000 (rent ₹15,000, EMI ₹10,000), variable expenses average ₹20,000 (groceries.', answer: 'Step 1: Total income = ₹60,000',
                  options: ['Step 1: Total income = ₹60,000', 'budgeting means cutting down all enjoyment and living frugally', '"budgeting means cutting down all enjoyment and living frugally'],
                  hint: 'Revisit Class 11 node c11_hs_cbse_10_003 (Family Income types) and c11_hs_cbse_10_006 (Steps.',
                  misconception: 'Students often think that "budgeting means cutting down all enjoyment and living frugally." They equate budgeting with deprivation, so they.' },
                { id: 'c', prompt: 'Compare a surplus budget, a balanced budget, and a deficit budget in terms of their impact on family savings and debt.', answer: 'Surplus budget: Income > Expenditure → increases savings, reduces debt',
                  options: ['Surplus budget: Income > Expenditure → increases savings, reduces debt', 'budgeting means cutting down all enjoyment and living frugally', '"budgeting means cutting down all enjoyment and living frugally'],
                  hint: 'Revisit Class 11 node c11_hs_cbse_10_003 (Family Income types) and c11_hs_cbse_10_006 (Steps.',
                  misconception: 'Students often think that "budgeting means cutting down all enjoyment and living frugally." They equate budgeting with deprivation, so they.' }
          ],
            remediations: { 'budgeting-means-cutting-down-all': { steps: ['If a student exhibits this misconception, have them list three activities their family enjoys (e.g., weekend movie.', 'Then, using a sample income, guide them to allocate a reasonable amount to each in a budget, showing that the total.', 'Next, ask them to track actual spending on these for two weeks and compare.', 'This concrete experience demonstrates that budgeting enables planned enjoyment, not elimination.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
