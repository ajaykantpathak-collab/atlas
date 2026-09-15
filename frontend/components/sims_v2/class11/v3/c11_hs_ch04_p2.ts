import type { SimDef } from '../../engine/types';

/** v3 generated — c11_hs_ch04_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_hs_ch04_p2: SimDef = {
    id: 'v3_c11_hs_ch04_p2',
    title: 'Resource Management · Part 2/2',
    subtitle: 'Learn when a thing becomes a resource — and why money isn\'t one of them by itself.',
    classLevel: 11, subject: 'home_science', topic: 'Resource Management · Part 2/2',
    chapters: ['c11_hs_ch04'],
    nodeIds: ['c11_hs_cbse_04_007', 'c11_hs_cbse_04_008', 'c11_hs_cbse_04_009', 'c11_hs_cbse_04_010', 'c11_hs_cbse_04_011', 'c11_hs_cbse_04_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a planner auditing what a family can actually use', intro: '₹2,000, three days, a cousin\'s car and your mother\'s recipes — which of these count as resources? It depends on the party.', goal: 'Apply utility, accessibility and interchangeability to classify resources and evaluate money\'s limits.' },
    discovery: {
        question: '\'Money is the most powerful resource — it substitutes for almost everything else.\' Where does this break?',
        options: ['Money can\'t cook the meal or motivate the child itself — no intrinsic utility, and managing it is a skill in itself', 'Nowhere — money substitutes for all resources', 'Only when the bank is closed', 'Only in villages without ATMs'],
        answer: 'Money can\'t cook the meal or motivate the child itself — no intrinsic utility, and managing it is a skill in itself',
        hook: 'A dusty bicycle isn\'t a resource until a goal turns it into one — resources are defined by intentional use, not by possession.',
    },
    teaching: [
        { title: 'Characteristics of Resources: Interchangeability and Manageability', text: 'Interchangeability is the characteristic of resources whereby one resource can substitute for another to achieve the same goal, allowing flexibility when a specific resource is scarce or unavailable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_hs_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Classify a skill, a metro system and a rainwater tank across human/non-human, individual/shared and natural/community — then let the categories shift with the goal.',
        labels: ['Characteristics of Resources: Interchangeability', 'Management Process: Planning as', 'Management Process: Organising, Implementing,', 'Time Management Strategies', 'Money Management Strategies', 'Energy Conservation and Sustainable'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_007', title: 'Characteristics of Resources: Interchangeability and Manageability',
          caseStudy: { intro: 'Imagine you have planned to cook a special dinner for guests arriving in two hours, but you discover the gas cylinder is empty.',
            decisions: [{ prompt: 'Define interchangeability and manageability as characteristics of resources in your own words, giving one original example for each that.', options: [
                { text: 'Interchangeability means resources can substitute each other to perform the same function', outcome: 'Interchangeability means resources can substitute each other to perform the same function (e.g.' },
                { text: 'sharing resources', outcome: 'Not quite — Students believe interchangeability means *any* resource can replace *any other* resource for *any*.', reveals: 'interchangeability-means-any-resource-can' },
                { text: 'just saving money', outcome: 'Not quite — Students believe interchangeability means *any* resource can replace *any other* resource for *any*.', reveals: 'interchangeability-means-any-resource-can' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_008', title: 'Management Process: Planning as the First Step',
          caseStudy: { intro: 'Imagine you have a major family function in 10 days and a history project due in 7 days, but you only have 2 hours of free time daily after school.',
            decisions: [{ prompt: 'State the four basic questions that guide the planning process according to the NCERT framework.', options: [
                { text: 'The four basic questions are: 1) What is our present situation?', outcome: 'The four basic questions are: 1) What is our present situation? 2) Where do we want to reach?' },
                { text: 'identify problem, choose alternative', outcome: 'Not quite — Students often believe planning is simply "making a timetable" or "writing a to-do list." They.', reveals: 'planning-is-simply-making-a' },
                { text: 'making a timetable', outcome: 'Not quite — Students often believe planning is simply "making a timetable" or "writing a to-do list." They.', reveals: 'planning-is-simply-making-a' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_009', title: 'Management Process: Organising, Implementing, Controlling and Evaluation',
          caseStudy: { intro: 'Imagine you have exactly three weeks before your Class 11 final exams and you still have five chapters of Physics, four of Chemistry, and three of Biology left.',
            decisions: [{ prompt: 'List the four stages of the management process covered in this node in their correct sequential order, and give the one-sentence NCERT.', options: [
                { text: 'Correct sequence: Organising → Implementing → Controlling → Evaluation', outcome: 'Correct sequence: Organising → Implementing → Controlling → Evaluation.' },
                { text: 'explain', outcome: 'Not quite — Students treat Organising, Implementing, Controlling, and Evaluation as four *independent* steps.', reveals: 'students-treat-organising' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_010', title: 'Time Management Strategies and Techniques',
          caseStudy: { intro: 'Imagine a Class 11 student, Rohan, who spends 5 hours daily on social media, sleeps only 5 hours, and wonders why he cannot finish his Physics revision.',
            decisions: [{ prompt: 'Define time as a resource and state its two key characteristics that distinguish it from money or material goods.', options: [
                { text: 'Time is a human resource available equally to everyone (24 hours/day) and is non-renewable', outcome: 'Time is a human resource available equally to everyone (24 hours/day) and is non-renewable — once.' },
                { text: 'time can be saved like money', outcome: 'Not quite — Students believe effective time management means creating a rigid, minute-by-minute schedule that.', reveals: 'effective-time-management-means-creating' },
                { text: 'some people have more time', outcome: 'Not quite — Students believe effective time management means creating a rigid, minute-by-minute schedule that.', reveals: 'effective-time-management-means-creating' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_011', title: 'Money Management Strategies for Families',
          caseStudy: { intro: 'Imagine your family earns ₹60,000 monthly but somehow ₹8,000 vanishes on "miscellaneous" expenses every month—where does it go?',
            decisions: [{ prompt: 'Define "family budget" and state its three core components as per the management process taught in Class 11 Home Science.', options: [
                { text: 'A family budget is a planned allocation of expected income across expense categories for', outcome: 'A family budget is a planned allocation of expected income across expense categories for a specific.' },
                { text: 'income and expenses', outcome: 'Not quite — Students believe "budgeting means cutting all fun expenses" and equate money management with.', reveals: 'budgeting-means-cutting-all-fun' },
                { text: 'budgeting means cutting all fun expenses', outcome: 'Not quite — Students believe "budgeting means cutting all fun expenses" and equate money management with.', reveals: 'budgeting-means-cutting-all-fun' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_012', title: 'Energy Conservation and Sustainable Energy Management',
          caseStudy: { intro: 'Imagine your mother spends three hours every evening cooking dinner, moving back and forth between the refrigerator, sink, stove, and dining table, bending.',
            decisions: [{ prompt: 'Define "work simplification" in the context of household energy conservation and state its primary objective.', options: [
                { text: 'Work simplification is the conscious application of principles (like motion economy,', outcome: 'Work simplification is the conscious application of principles (like motion economy, workplace.' },
                { text: 'using machines to do work', outcome: 'Not quite — Students equate "energy conservation" solely with *electricity saving* (switching off lights.', reveals: 'students-equate-energy-conservation-solely' },
                { text: 'doing less work', outcome: 'Not quite — Students equate "energy conservation" solely with *electricity saving* (switching off lights.', reveals: 'students-equate-energy-conservation-solely' }
            ] }] } },
        { type: 'dissect', nodeId: 'c11_hs_cbse_04_008', title: 'Identify each idea',
          dissect: { specimen: 'Resource Management · Part 2/2', spots: [
            { id: 's1', label: 'Management Process Planning as the First Step', prompt: 'Which idea is this? — Planning is the initial and foundational step in the management process where.', answer: 'Management Process Planning as the First Step', options: ['Management Process Planning as the First Step', 'Time Management Strategies and Techniques', 'Money Management Strategies for Families', 'Energy Conservation and Sustainable Energy Management'] },
            { id: 's2', label: 'Time Management Strategies and Techniques', prompt: 'Which idea is this? — Time management is the systematic process of planning, allocating, and controlling the.', answer: 'Time Management Strategies and Techniques', options: ['Time Management Strategies and Techniques', 'Management Process Planning as the First Step', 'Money Management Strategies for Families', 'Energy Conservation and Sustainable Energy Management'] },
            { id: 's3', label: 'Money Management Strategies for Families', prompt: 'Which idea is this? — Money management for families is the systematic process of planning, organizing.', answer: 'Money Management Strategies for Families', options: ['Money Management Strategies for Families', 'Management Process Planning as the First Step', 'Time Management Strategies and Techniques', 'Energy Conservation and Sustainable Energy Management'] },
            { id: 's4', label: 'Energy Conservation and Sustainable Energy Management', prompt: 'Which idea is this? — Energy conservation in home management refers to the deliberate application of work.', answer: 'Energy Conservation and Sustainable Energy Management', options: ['Energy Conservation and Sustainable Energy Management', 'Management Process Planning as the First Step', 'Time Management Strategies and Techniques', 'Money Management Strategies for Families'] }
          ] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Organising a college fest, your teammate audits resources and declares: \'The dusty college bicycle isn\'t a resource — it just exists. And Rohan has no aptitude for anchoring — he froze at auditions, so he lacks the talent.\'',
            decisions: [{ prompt: 'What\'s wrong with both judgments?', options: [
                { text: 'Redefine both: a resource is defined by purposeful use toward a goal — the bicycle becomes a resource the moment someone deploys it for ferrying supplies; existence alone isn\'t enough, and the same item shifts categories with user and goal. And aptitude is natural potential, not demonstrated proficiency — one frozen audition shows an undeveloped skill, not absent aptitude; skills are built by deliberate practice.', outcome: 'The audit becomes real: resources appear when recognised and deployed, and \'no aptitude\' is retired — you can\'t see potential until practice develops the skill.' },
                { text: 'Agree the bicycle isn\'t a resource — if it\'s not being used, it doesn\'t count.', outcome: 'That misses the relational definition: resources are identified by utility, accessibility and manageability for a goal — the unused bicycle is a potential resource awaiting deployment.', reveals: 'unused-means-not-resource' },
                { text: 'Agree on Rohan — aptitude and skill are the same thing, and he showed neither.', outcome: 'Conflating the two kills development: aptitude is the seed you can\'t observe directly; skill is the visible plant grown through practice — one bad audition reveals nothing about the seed.', reveals: 'aptitude-equals-skill' }
            ] }] } },
        { type: 'case', nodeId: 'c11_hs_cbse_04_012', title: 'You made it',
          caseStudy: { intro: 'Aptitude isn\'t skill and skill isn\'t motivation — four human resources, and the weakest one caps the rest.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_007', difficulty: 'standard',
          question: 'Interchangeability is the characteristic of resources whereby one resource can.',
          hint: 'If stuck, revisit c11_hs_cbse_04_001 (resource definition) and c11_hs_cbse_04_005.',
          misconception: 'Students believe interchangeability means *any* resource can replace *any other* resource for *any* goal (e.g., "money.',
          parts: [
                { id: 'a', prompt: 'A student says: "Interchangeability means I can use my friend\'s notes instead of attending class, so they are the same resource." Explain why this reasoning.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'deep understanding', 'money can buy time'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_001 (resource definition) and c11_hs_cbse_04_005 (classification).',
                  misconception: 'Students believe interchangeability means *any* resource can replace *any other* resource for *any* goal (e.g., "money can buy time".' },
                { id: 'b', prompt: 'You have ₹500, 2 hours, and high energy to prepare a birthday gift for a friend.', answer: 'Combination 1: Money (₹500) + Time (2 hrs) → Buy materials, handmake a scrapbook',
                  options: ['Combination 1: Money (₹500) + Time (2 hrs) → Buy materials, handmake a scrapbook', 'money can buy time'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_001 (resource definition) and c11_hs_cbse_04_005 (classification).',
                  misconception: 'Students believe interchangeability means *any* resource can replace *any other* resource for *any* goal (e.g., "money can buy time".' }
          ],
            remediations: { 'interchangeability-means-any-resource-can': { steps: ['If a student exhibits this misconception, do this 3-step remediation: (1) Give a concrete scenario: "You have ₹10,000.', 'Can money substitute for time?" Force them to see the physical limit.', '(2) Create a "Non-Substitutable Resource List" for a specific goal (e.g., "My own sleep before exam") and have them.', '(3) Revisit the NCERT example: school bus vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe interchangeability means *any* resource can replace *any other* resource for *any* goal (e.g., "money.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "Since resources are interchangeable, management is unnecessary — just substitute whatever is available." Defend your position with.', answer: 'The statement is false',
                  options: ['The statement is false', 'money can buy time'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_001 (resource definition) and c11_hs_cbse_04_005 (classification).',
                  misconception: 'Students believe interchangeability means *any* resource can replace *any other* resource for *any* goal (e.g., "money can buy time".' }
          ],
            remediations: { 'interchangeability-means-any-resource-can': { steps: ['If a student exhibits this misconception, do this 3-step remediation: (1) Give a concrete scenario: "You have ₹10,000.', 'Can money substitute for time?" Force them to see the physical limit.', '(2) Create a "Non-Substitutable Resource List" for a specific goal (e.g., "My own sleep before exam") and have them.', '(3) Revisit the NCERT example: school bus vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_008', difficulty: 'standard',
          question: 'Planning is the initial and foundational step in the management process where.',
          hint: 'Revisit c11_hs_cbse_04_006 (utility and accessibility) and c11_hs_cbse_04_007.',
          misconception: 'Students often believe planning is simply "making a timetable" or "writing a to-do list." They confuse the *output*.',
          parts: [
                { id: 'a', prompt: 'State the four basic questions that guide the planning process according to the NCERT framework.', answer: 'The four basic questions are: 1) What is our present situation?',
                  options: ['The four basic questions are: 1) What is our present situation?', 'identify problem, choose alternative', 'making a timetable', 'writing a to-do list'],
                  hint: 'Revisit c11_hs_cbse_04_006 (utility and accessibility) and c11_hs_cbse_04_007 (interchangeability).',
                  misconception: 'Students often believe planning is simply "making a timetable" or "writing a to-do list." They confuse the *output* of planning (a.' },
                { id: 'b', prompt: 'A Class 11 student has 20 days until board practical exams. She has not started her practical file (present situation) and wants to submit a complete.', answer: 'Step 1: Identify problem',
                  options: ['Step 1: Identify problem', 'study harder', 'making a timetable', 'writing a to-do list'],
                  hint: 'Revisit c11_hs_cbse_04_006 (utility and accessibility) and c11_hs_cbse_04_007 (interchangeability).',
                  misconception: 'Students often believe planning is simply "making a timetable" or "writing a to-do list." They confuse the *output* of planning (a.' },
                { id: 'c', prompt: 'Compare the planning process for a recurring goal (e.g., "maintain 80% average all year") versus a one-time goal (e.g., "organise farewell party in 10 days").', answer: 'For a recurring goal, gap analysis is continuous and dynamic',
                  options: ['For a recurring goal, gap analysis is continuous and dynamic', 'make a timetable for both', 'making a timetable', 'writing a to-do list'],
                  hint: 'Revisit c11_hs_cbse_04_006 (utility and accessibility) and c11_hs_cbse_04_007 (interchangeability).',
                  misconception: 'Students often believe planning is simply "making a timetable" or "writing a to-do list." They confuse the *output* of planning (a.' }
          ],
            remediations: { 'planning-is-simply-making-a': { steps: ['If a student equates planning with timetable-making, do NOT ask them to "plan better." Instead: 1) Give them a failed.', '2) Have them redo it by explicitly answering each question in writing before drawing any schedule.', '3) Force them to list at least 3 alternatives for each goal and write one reason for rejecting two of them.', 'This shifts focus from the schedule (output) to the reasoning (process).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_009', difficulty: 'standard',
          question: 'The management process is a systematic, cyclic sequence of five interdependent.',
          hint: 'Revisit c11_hs_cbse_04_008 and re-do Activity 2 (exam-prep plan) until you can produce.',
          misconception: 'Students treat Organising, Implementing, Controlling, and Evaluation as four *independent* steps that can be done.',
          parts: [
                { id: 'a', prompt: 'List the four stages of the management process covered in this node in their correct sequential order, and give the one-sentence NCERT definition of each.', answer: 'Correct sequence: Organising → Implementing → Controlling → Evaluation',
                  options: ['Correct sequence: Organising → Implementing → Controlling → Evaluation', 'explain'],
                  hint: 'Revisit c11_hs_cbse_04_008 and re-do Activity 2 (exam-prep plan) until you can produce a written.',
                  misconception: 'Students treat Organising, Implementing, Controlling, and Evaluation as four *independent* steps that can be done in any order or skipped.' },
                { id: 'b', prompt: 'You are organising a farewell party for 60 Class XII students with a budget of ₹15,000.', answer: 'Substitution 1: Replace hired venue (₹8,000) with school auditorium (free with',
                  options: ['Substitution 1: Replace hired venue (₹8,000) with school auditorium (free with', 'cut costs'],
                  hint: 'Revisit c11_hs_cbse_04_008 and re-do Activity 2 (exam-prep plan) until you can produce a written.',
                  misconception: 'Students treat Organising, Implementing, Controlling, and Evaluation as four *independent* steps that can be done in any order or skipped.' }
          ],
            remediations: { 'students-treat-organising': { steps: ['Draw the management cycle as a circle with five nodes on paper; label arrows "feeds into" and "feedback from."', 'Take the farewell-party Activity 3 table from the textbook and fill *every cell* for one resource (e.g., "Venue").', 'Identify which stage you left blank in your own exam-prep routine last term; write one concrete action to close that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_010', difficulty: 'standard',
          question: 'Time management is the systematic process of planning, allocating, and.',
          hint: 'Review the three dimensions of time (work time, non-work time, rest and leisure time) and.',
          misconception: 'Students believe effective time management means creating a rigid, minute-by-minute schedule that maximizes study hours.',
          parts: [
                { id: 'a', prompt: 'Compare two time plans for a Sunday: Plan X — 10 hours continuous study with 30 min lunch break; Plan Y — 4 study blocks of 90 min each separated by 30 min.', answer: 'Plan Y is superior',
                  options: ['Plan Y is superior', 'more hours = better', 'wasted'],
                  hint: 'Review the three dimensions of time (work time, non-work time, rest and leisure time) and the.',
                  misconception: 'Students believe effective time management means creating a rigid, minute-by-minute schedule that maximizes study hours and minimizes.' }
          ],
            remediations: { 'effective-time-management-means-creating': { steps: ['If a student exhibits this misconception: 1) Have them complete the NCERT Practical 4(A) — record actual time use for 3.', '2) Together, categorize each hour into Work / Non-work / Leisure.', '3) Calculate totals: typically they\'ll find <5 hrs sleep, >6 hrs screen leisure, <2 hrs focused study.', '4) Ask: "Which dimension is starved?'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_011', difficulty: 'standard',
          question: 'Money management for families is the systematic process of planning.',
          hint: 'If stuck, revisit c11_hs_cbse_04_009 "Controlling" step — specifically the feedback loop.',
          misconception: 'Students believe "budgeting means cutting all fun expenses" and equate money management with deprivation.',
          parts: [
                { id: 'a', prompt: 'Using zero-based budgeting, construct a monthly budget for a family of four with ₹75,000 income.', answer: 'Step 1: List all categories with amounts',
                  options: ['Step 1: List all categories with amounts', 'budgeting means cutting all fun expenses', 'Budget means no movies, no new clothes, only survival', 'judicious spending for maximum satisfaction'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_009 "Controlling" step — specifically the feedback loop concept.',
                  misconception: 'Students believe "budgeting means cutting all fun expenses" and equate money management with deprivation.' }
          ],
            remediations: { 'budgeting-means-cutting-all-fun': { steps: ['Show the student a completed 50/30/20 budget for ₹50,000 income with ₹15,000 "wants" — ask "Does this look like.', 'Have them calculate 30% of their own pocket money — "If you get ₹2,000, ₹600 is officially for fun.', 'Contrast "emergency fund = 6 months expenses" vs "6 months income" using a family with ₹40,000 expenses but ₹80,000.', 'Assign Activity 3 from NCERT (farewell party budgeting) but add a "fun column" — they must allocate 10% to enjoyment.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c11_hs_cbse_04_012', difficulty: 'standard',
          question: 'Energy conservation in home management refers to the deliberate application.',
          hint: 'Revisit c11_hs_cbse_04_009 (Management Process: Organising, Implementing, Controlling).',
          misconception: 'Students equate "energy conservation" solely with *electricity saving* (switching off lights, buying 5-star appliances).',
          parts: [
                { id: 'a', prompt: 'A homemaker washes clothes by hand in a bucket, bending over 20 times per load to wring each garment.', answer: 'Option B (raising the bucket) is a Class 1 change',
                  options: ['Option B (raising the bucket) is a Class 1 change', 'work simplification'],
                  hint: 'Revisit c11_hs_cbse_04_009 (Management Process: Organising, Implementing, Controlling) and.',
                  misconception: 'Students equate "energy conservation" solely with *electricity saving* (switching off lights, buying 5-star appliances) and ignore *human.' }
          ],
            remediations: { 'students-equate-energy-conservation-solely': { steps: ['Have the student perform a *motion analysis* of a simple task (making tea) — count each motion: reach, grasp, move.', 'Ask: "Which motions serve the *goal* (tea in cup) and which serve only *transport* (moving body/items)?"', 'Redesign the task on paper: relocate sugar jar next to stove, keep tea leaves in a dispenser at eye level, use a tray.', 'Have them *enact* both versions and rate fatigue (1-10).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
