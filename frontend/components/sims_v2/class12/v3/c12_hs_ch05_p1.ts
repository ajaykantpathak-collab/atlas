import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch05_p1: SimDef = {
    id: 'v3_c12_hs_ch05_p1',
    title: 'Resource Management and Communication · Part 1/2',
    subtitle: 'The plan doesn\'t end — it loops into the next one',
    classLevel: 12, subject: 'home_science', topic: 'Resource Management and Communication · Part 1/2',
    chapters: ['c12_hs_ch05'],
    nodeIds: ['c12_hs_cbse_05_001', 'c12_hs_cbse_05_002', 'c12_hs_cbse_05_003', 'c12_hs_cbse_05_004', 'c12_hs_cbse_05_005', 'c12_hs_cbse_05_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Family resource manager', intro: 'Scarce time, money and energy become a joyful festival — or chaos — depending on five repeatable steps.', goal: 'Apply the five-step management cycle to family goals — and see why evaluation is the loop\'s hinge.' },
    discovery: {
        question: 'A family plans Diwali on a tight budget — tasks assigned, spending tracked, a post-festival review that reshapes next year\'s plan. Why call it a cycle, not a checklist?',
        options: ['Because evaluation feeds the next plan — each festival\'s review becomes next year\'s planning input; management loops, it doesn\'t end', 'It repeats yearly', 'Checklists are boring', 'Five steps is a cycle'],
        answer: 'Because evaluation feeds the next plan — each festival\'s review becomes next year\'s planning input; management loops, it doesn\'t end',
        hook: 'Management isn\'t just budgeting or controlling — it\'s the full loop of planning, organising, implementing, controlling and evaluating. And \'follow the plan strictly\' fails the moment reality intervenes; controlling exists precisely to deviate wisely.',
    },
    teaching: [
        { title: 'Management: Definition, Process and Significance in Family Life', text: 'Management in family life is the systematic process of planning, organizing, implementing, controlling, and evaluating the use of human and non-human resources to achieve family goals and enhance.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_05_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a family goal through all five steps: spot where plans usually skip organising, test why rigid plans break, and compare how nuclear and joint families manage differently.',
        labels: ['Management: Definition, Process', 'Resources: Classification as Human', 'Characteristics of Resources: Utility,', 'Management Process: Planning, Organising,', 'Decision-Making: Steps, Types', 'Time Management: Principles, Techniques'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_001', title: 'Management: Definition, Process and Significance in Family Life',
          caseStudy: { intro: 'Imagine your family is preparing for a major festival — Diwali or Eid — with a limited budget, limited time, and multiple tasks: cleaning, shopping, cooking.',
            decisions: [{ prompt: 'Define \'management\' in the context of family resource management as per NCERT Class 12 Home Science.', options: [
                { text: 'Management is the process of using family resources (human and non-human) through', outcome: 'Management is the process of using family resources (human and non-human) through planning.' },
                { text: 'management is only about money (budgeting) or only for large families/businesses', outcome: 'Not quite — Students often think management is only about money (budgeting) or only for large.', reveals: 'management-is-only-about-money' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_002', title: 'Resources: Classification as Human and Non-Human Resources',
          caseStudy: { intro: 'Imagine you are planning a family wedding with a budget of ₹5 lakh and three months to prepare.',
            decisions: [{ prompt: 'List five resources you would use to organise a school farewell party. Classify each as human or non-human.', options: [
                { text: 'Correct answer: Human resources', outcome: 'Correct answer: Human resources — student volunteers\' time, organising committee\'s leadership.' },
                { text: 'student volunteers\' time', outcome: 'Not quite — Students believe "human resources = people" and "non-human resources = things", so they classify.', reveals: 'human-resources-people-and-non' },
                { text: 'is non-human', outcome: 'Not quite — Students believe "human resources = people" and "non-human resources = things", so they classify.', reveals: 'human-resources-people-and-non' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_003', title: 'Characteristics of Resources: Utility, Accessibility and Interchangeability',
          caseStudy: { intro: 'Imagine your family has a car (asset). Ask: "Is it a resource right now?" If the car has no fuel, it has utility (can transport) but lacks accessibility.',
            decisions: [{ prompt: 'Define "utility" in the context of home management resources. Give one example of a household item that has high utility but zero.', options: [
                { text: 'Utility is the want-satisfying power of a resource', outcome: 'Utility is the want-satisfying power of a resource — its ability to meet a need or goal.' },
                { text: 'utility means usefulness in general', outcome: 'Not quite — Students treat utility, accessibility, and interchangeability as fixed, inherent properties.', reveals: 'students-treat-utility' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_004', title: 'Management Process: Planning, Organising, Implementing and Controlling',
          caseStudy: { intro: 'Imagine your family is planning a 25th wedding anniversary celebration for your parents with a budget of ₹50,000, 20 guests, and only three weekends.',
            decisions: [{ prompt: 'List the four functions of the management process in their correct sequential order and give one specific activity for each function when.', options: [
                { text: 'Correct sequence: Planning → Organising → Implementing → Controlling', outcome: 'Correct sequence: Planning → Organising → Implementing → Controlling.' },
                { text: 'saving money', outcome: 'Not quite — Students often believe "Planning is just making a to-do list" and "Controlling is only checking.', reveals: 'planning-is-just-making-a' },
                { text: 'Planning is just making a to-do list', outcome: 'Not quite — Students often believe "Planning is just making a to-do list" and "Controlling is only checking.', reveals: 'planning-is-just-making-a' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_005', title: 'Decision-Making: Steps, Types and Rational Decision Process',
          caseStudy: { intro: 'Imagine your family has ₹50,000 saved and must decide: repair the leaking roof, buy a new refrigerator, or invest in your sibling\'s coaching classes.',
            decisions: [{ prompt: 'List the seven steps of the rational decision-making process in the correct order as per NCERT Class 12 Home Science.', options: [
                { text: 'Correct sequence: (1) Identify the problem/need, (2) Gather relevant information, (3)', outcome: 'Correct sequence: (1) Identify the problem/need, (2) Gather relevant information, (3) Generate.' },
                { text: 'select', outcome: 'Not quite — Students believe "rational decision-making" means making the mathematically optimal choice every.', reveals: 'rational-decision-making-means-making' },
                { text: 'evaluate', outcome: 'Not quite — Students believe "rational decision-making" means making the mathematically optimal choice every.', reveals: 'rational-decision-making-means-making' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_006', title: 'Time Management: Principles, Techniques and Time Plans',
          caseStudy: { intro: 'Imagine you have board exams in two months, JEE/NEET coaching three evenings a week, and family responsibilities every weekend.',
            decisions: [{ prompt: 'Define “time management” in one sentence and name the two categories of tasks in the Eisenhower matrix.', options: [
                { text: 'Time management is the deliberate planning and control of time allocated to activities to', outcome: 'Time management is the deliberate planning and control of time allocated to activities to achieve.' },
                { text: 'time management means making a rigid timetable', outcome: 'Not quite — Students believe time management means creating a rigid, minute-by-minute timetable and that.', reveals: 'time-management-means-creating-a' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Resource Management and Communication · Part 1/2', spots: [
            { id: 's1', label: 'Resources Classification as Human and Non-Human Resources', prompt: 'Which idea is this? — Resources are assets or capabilities that individuals and families use to achieve goals.', answer: 'Resources Classification as Human and Non-Human Resources', options: ['Resources Classification as Human and Non-Human Resources', 'Decision-Making Steps Types and Rational Decision Process', 'Time Management Principles Techniques and Time Plans'] },
            { id: 's2', label: 'Decision-Making Steps Types and Rational Decision Process', prompt: 'Which idea is this? — Decision-making is the cognitive process of selecting a course of action from multiple.', answer: 'Decision-Making Steps Types and Rational Decision Process', options: ['Decision-Making Steps Types and Rational Decision Process', 'Resources Classification as Human and Non-Human Resources', 'Time Management Principles Techniques and Time Plans'] },
            { id: 's3', label: 'Time Management Principles Techniques and Time Plans', prompt: 'Which idea is this? — Time management is the systematic process of planning, allocating, and controlling time.', answer: 'Time Management Principles Techniques and Time Plans', options: ['Time Management Principles Techniques and Time Plans', 'Resources Classification as Human and Non-Human Resources', 'Decision-Making Steps Types and Rational Decision Process'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Planning a family function on a tight budget, one cousin wants to outsource everything — caterer, decorator, tailor — \'money is the resource, let\'s spend it.\' Your aunt counters that the family\'s own skills should carry the load.',
            decisions: [{ prompt: 'How does the human/non-human resource classification settle it?', options: [
                { text: 'Classify before spending — the aunt\'s tailoring, the cousin\'s negotiation skill and everyone\'s time are human resources that grow with use; the savings and hired services are non-human and only deplete — so deploy skills first and let money cover what skills can\'t.', outcome: 'The chapter\'s rule: the label dictates the management — human resources you develop and use, non-human you acquire and conserve; spending money where a skill exists buys depletion instead of growth.' },
                { text: 'Side with outsourcing — paying professionals is simpler and frees everyone\'s time.', outcome: 'That conserves one resource by draining the other — and on a tight budget, money is the scarcer cell; skills left unused don\'t replenish the account that outsourcing empties.', reveals: 'money-solves-everything' },
                { text: 'Side with the aunt entirely — use only family skills and spend nothing.', outcome: 'Time and energy are human resources too and they deplete in the day — a plan that burns the family ragged to save every rupee misreads \'human\' as \'free.\'', reveals: 'skills-are-free' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now manage a household goal as a living loop — where this year\'s lessons become next year\'s plan.',
            decisions: [{ prompt: 'What comes next? Resource Management and Communication · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Resource Management and Communication · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_001', difficulty: 'standard',
          question: 'Management in family life is the systematic process of planning, organizing.',
          hint: 'If stuck, revisit Class 11 nodes c11_hs_cbse_04_001 to 04_004 — specifically the tables.',
          misconception: 'Students often think management is only about money (budgeting) or only for large families/businesses.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the management process is described as a \'cycle\' rather than a linear sequence. Use a family example.', answer: 'The management process is a cycle',
                  options: ['The management process is a cycle', 'it\'s linear because steps happen in order', 'management is only about money (budgeting) or only for large families/businesses'],
                  hint: 'If stuck, revisit Class 11 nodes c11_hs_cbse_04_001 to 04_004 — specifically the tables classifying.',
                  misconception: 'Students often think management is only about money (budgeting) or only for large families/businesses.' }
          ],
            remediations: { 'management-is-only-about-money': { steps: ['If the student holds this misconception, have them: 1) List five non-money resources their own family uses daily (e.g.', '2) Pick one resource and trace how their family plans, organizes, implements, controls, evaluates its use — e.g.', '4) Re-attempt Diagnostic Question 2 to confirm they now see the cycle across all resources.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think management is only about money (budgeting) or only for large families/businesses.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "Good management means strictly following the plan without deviations." Justify your answer with a family scenario.', answer: 'The statement is false',
                  options: ['The statement is false', 'management is only about money (budgeting) or only for large families/businesses'],
                  hint: 'If stuck, revisit Class 11 nodes c11_hs_cbse_04_001 to 04_004 — specifically the tables classifying.',
                  misconception: 'Students often think management is only about money (budgeting) or only for large families/businesses.' },
                { id: 'b', prompt: 'Create a new, original example of a family management problem (different from festival, vacation, or savings) that requires all five steps of the management.', answer: 'Family: Single mother, two school-going children, works night shifts',
                  options: ['Family: Single mother, two school-going children, works night shifts', 'management is only about money (budgeting) or only for large families/businesses'],
                  hint: 'If stuck, revisit Class 11 nodes c11_hs_cbse_04_001 to 04_004 — specifically the tables classifying.',
                  misconception: 'Students often think management is only about money (budgeting) or only for large families/businesses.' }
          ],
            remediations: { 'management-is-only-about-money': { steps: ['If the student holds this misconception, have them: 1) List five non-money resources their own family uses daily (e.g.', '2) Pick one resource and trace how their family plans, organizes, implements, controls, evaluates its use — e.g.', '4) Re-attempt Diagnostic Question 2 to confirm they now see the cycle across all resources.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_002', difficulty: 'standard',
          question: 'Resources are assets or capabilities that individuals and families use.',
          hint: 'If stuck, revisit c11_hs_cbse_04_002 and c11_hs_cbse_04_004 and make a two-column table.',
          misconception: 'Students believe "human resources = people" and "non-human resources = things", so they classify a doctor as a human.',
          parts: [
                { id: 'a', prompt: 'List five resources you would use to organise a school farewell party. Classify each as human or non-human.', answer: 'Correct answer: Human resources',
                  options: ['Correct answer: Human resources', 'student volunteers\' time', 'is non-human', 'non-human resources = things'],
                  hint: 'If stuck, revisit c11_hs_cbse_04_002 and c11_hs_cbse_04_004 and make a two-column table: "Inside.',
                  misconception: 'Students believe "human resources = people" and "non-human resources = things", so they classify a doctor as a human resource but the.' }
          ],
            remediations: { 'human-resources-people-and-non': { steps: ['Ask the student to pick any skill they have (e.g., cooking, coding, cycling).', 'Have them answer: "Where does this skill live? Can I give it to someone else like a book?', 'Contrast with a physical object they own (e.g., bicycle). "Where does the bicycle live? Can I give it away?', 'Explicitly label: skill = human resource (internal, developable); bicycle = non-human resource (external.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_003', difficulty: 'standard',
          question: 'Utility, accessibility, and interchangeability are the three defining.',
          hint: 'Revisit c11_hs_cbse_04_006 (Characteristics of Resources: Utility and Accessibility) and.',
          misconception: 'Students treat utility, accessibility, and interchangeability as fixed, inherent properties of objects (e.g., "a car.',
          parts: [
                { id: 'a', prompt: 'Define "utility" in the context of home management resources. Give one example of a household item that has high utility but zero accessibility in a specific.', answer: 'Utility is the want-satisfying power of a resource',
                  options: ['Utility is the want-satisfying power of a resource', 'utility means usefulness in general'],
                  hint: 'Revisit c11_hs_cbse_04_006 (Characteristics of Resources: Utility and Accessibility) and.',
                  misconception: 'Students treat utility, accessibility, and interchangeability as fixed, inherent properties of objects (e.g., "a car has high utility").' },
                { id: 'b', prompt: 'A family has ₹50,000 savings (money resource) and an elderly grandmother who knows traditional herbal remedies (knowledge resource).', answer: 'Accessibility of the knowledge resource drops to near-zero',
                  options: ['Accessibility of the knowledge resource drops to near-zero', 'money can buy everything'],
                  hint: 'Revisit c11_hs_cbse_04_006 (Characteristics of Resources: Utility and Accessibility) and.',
                  misconception: 'Students treat utility, accessibility, and interchangeability as fixed, inherent properties of objects (e.g., "a car has high utility").' }
          ],
            remediations: { 'students-treat-utility': { steps: ['Have the student pick ONE asset in their home (e.g., bicycle).', 'Ask: "Today, can you use it to go to market? (Accessibility) Does it satisfy a need?', 'Change the scenario: "You have a fractured leg." Re-evaluate all three.', 'Change again: "Petrol price doubles." Re-evaluate.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_004', difficulty: 'standard',
          question: 'The management process in Home Science is a systematic, cyclical sequence.',
          hint: 'If unclear on resource classification or characteristics, revisit c12_hs_cbse_05_002 and.',
          misconception: 'Students often believe "Planning is just making a to-do list" and "Controlling is only checking at the end.".',
          parts: [
                { id: 'a', prompt: 'List the four functions of the management process in their correct sequential order and give one specific activity for each function when managing a family.', answer: 'Correct sequence: Planning → Organising → Implementing → Controlling',
                  options: ['Correct sequence: Planning → Organising → Implementing → Controlling', 'saving money', 'Planning is just making a to-do list', 'Controlling is only checking at the end'],
                  hint: 'If unclear on resource classification or characteristics, revisit c12_hs_cbse_05_002 and.',
                  misconception: 'Students often believe "Planning is just making a to-do list" and "Controlling is only checking at the end." In reality, Planning involves.' },
                { id: 'b', prompt: 'Explain why the management process is described as a "cycle" rather than a straight line, using the example of a student managing their Class 12 board exam.', answer: 'The process is cyclic',
                  options: ['The process is cyclic', 'Planning is just making a to-do list', 'Controlling is only checking at the end', 'study Physics 10 hours/week'],
                  hint: 'If unclear on resource classification or characteristics, revisit c12_hs_cbse_05_002 and.',
                  misconception: 'Students often believe "Planning is just making a to-do list" and "Controlling is only checking at the end." In reality, Planning involves.' },
                { id: 'c', prompt: 'A family plans a weekend trip. They set a budget (Planning), pack food and assign driving duties (Organising), and start driving (Implementing).', answer: 'Controlling is most critical',
                  options: ['Controlling is most critical', 'Implementing – just fix the car and keep going', 'Planning is just making a to-do list', 'Controlling is only checking at the end'],
                  hint: 'If unclear on resource classification or characteristics, revisit c12_hs_cbse_05_002 and.',
                  misconception: 'Students often believe "Planning is just making a to-do list" and "Controlling is only checking at the end." In reality, Planning involves.' },
                { id: 'd', prompt: 'Compare and contrast "Organising" in the management process with "Decision-Making" (covered in node c12_hs_cbse_05_005).', answer: 'Decision-Making is the cognitive process of selecting a course of action from',
                  options: ['Decision-Making is the cognitive process of selecting a course of action from', 'Planning is just making a to-do list', 'Controlling is only checking at the end', 'study Physics 10 hours/week'],
                  hint: 'If unclear on resource classification or characteristics, revisit c12_hs_cbse_05_002 and.',
                  misconception: 'Students often believe "Planning is just making a to-do list" and "Controlling is only checking at the end." In reality, Planning involves.' }
          ],
            remediations: { 'planning-is-just-making-a': { steps: ['If a student cannot differentiate the functions or set measurable standards: (1) Revisit c11_hs_cbse_04_008 (Planning.', '(2) Do a "Function Sort" activity: take 10 management actions (e.g., "buy ingredients," "check if cake rose," "decide.', '(3) Practice writing SMART standards (Specific, Measurable, Achievable, Relevant, Time-bound) for three personal goals.', '(4) Re-attempt Diagnostic Question 3 (car breakdown) and Question 6 (checklist) with the SMART framework.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_005', difficulty: 'standard',
          question: 'Decision-making is the cognitive process of selecting a course of action from.',
          hint: 'If stuck, revisit c12_hs_cbse_05_001 (Management Process) and c11_hs_cbse_04_001 (Concept.',
          misconception: 'Students believe "rational decision-making" means making the mathematically optimal choice every time.',
          parts: [
                { id: 'a', prompt: 'A family decides to buy a new washing machine because their old one broke down.', answer: 'They likely skipped or poorly executed Step 7 (Review/Evaluate the outcome)',
                  options: ['They likely skipped or poorly executed Step 7 (Review/Evaluate the outcome)', 'gather information', 'rational decision-making', 'they skipped "gather information'],
                  hint: 'If stuck, revisit c12_hs_cbse_05_001 (Management Process) and c11_hs_cbse_04_001 (Concept of.',
                  misconception: 'Students believe "rational decision-making" means making the mathematically optimal choice every time.' },
                { id: 'b', prompt: 'Classify each decision below by type (Routine / Strategic / Crisis) and by participation (Individual / Group). Justify each classification in one sentence.', answer: '(a) Routine, Individual',
                  options: ['(a) Routine, Individual', 'crisis', 'rational decision-making'],
                  hint: 'If stuck, revisit c12_hs_cbse_05_001 (Management Process) and c11_hs_cbse_04_001 (Concept of.',
                  misconception: 'Students believe "rational decision-making" means making the mathematically optimal choice every time.' }
          ],
            remediations: { 'rational-decision-making-means-making': { steps: ['If a student conflates rational model with optimisation: (1) Have them re-read the NCERT box on "Bounded Rationality".', '(2) Give a 5-minute timed exercise: "Choose a dinner menu for ₹200 with 4 family preferences — you have 3 minutes.', 'Write your process." (3) Debrief: "Did you evaluate all possible dishes?', 'That is bounded rationality." (4) Re-diagnostic: Ask them to classify their own process as routine/strategic/crisis and.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_006', difficulty: 'standard',
          question: 'Time management is the systematic process of planning, allocating, and.',
          hint: 'If stuck, re-do the 3-day time log from c11_hs_cbse_04_010 and highlight activities that.',
          misconception: 'Students believe time management means creating a rigid, minute-by-minute timetable and that deviation equals failure.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Time management is the systematic process of planning, allocating, and controlling time',
                  options: ['Time management is the systematic process of planning, allocating, and controlling time', 'Management in family life is the systematic process of planning, organizing,', 'Resources are assets or capabilities that individuals and families use to achieve goals', 'Utility, accessibility, and interchangeability are the three defining characteristics'],
                  hint: 'If stuck, re-do the 3-day time log from c11_hs_cbse_04_010 and highlight activities that.',
                  misconception: 'Students believe time management means creating a rigid, minute-by-minute timetable and that deviation equals failure.' }
          ],
            remediations: { 'time-management-means-creating-a': { steps: ['Revisit c11_hs_cbse_04_010 (Time Management Strategies and Techniques) and list the three techniques taught there.', 'Track actual time use for 48 hours using a simple log (activity, start, end, quadrant).', 'Identify the top two “time leaks” (e.g., social media during study blocks).', 'Redesign one day using only time blocking + 15-min buffers, then compare adherence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
