import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch07_p2: SimDef = {
    id: 'v3_c12_bs_ch07_p2',
    title: 'Directing · Part 2/2',
    subtitle: 'Everything was ready and nothing moved — directing is the starting gun.',
    classLevel: 12, subject: 'business_studies', topic: 'Directing · Part 2/2',
    chapters: ['c12_bs_ch07'],
    nodeIds: ['c12_bs_cbse_07_007', 'c12_bs_cbse_07_008', 'c12_bs_cbse_07_009', 'c12_bs_cbse_07_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Restaurant floor manager', intro: 'Supervision, communication, leadership, motivation — four elements, one function, zero static organisations.', goal: 'Define directing and apply its four elements to real workplace situations.' },
    discovery: {
        question: 'Plan made, positions assigned, players selected — yet nothing moves until the captain says \'bowl to off-stump, field at slip\'. Which function just fired the starting gun?',
        options: ['Directing — the function that initiates action by instructing, guiding, motivating and leading', 'Planning — because the instruction was part of the strategy', 'Controlling — because the captain corrected the field placement', 'Organising — because the slip fielder was assigned a position'],
        answer: 'Directing — the function that initiates action by instructing, guiding, motivating and leading',
        hook: 'Plans are inert until someone says go — directing is the only function that converts preparation into motion, which is why it flows top-down, operates at every level, and never stops.',
    },
    teaching: [
        { title: 'Motivation: Meaning, Importance and Maslow\'s Hierarchy of Needs', text: 'Motivation is the process of stimulating people to action to accomplish desired organisational goals by satisfying their internal needs, where a motive is an inner state that energises and directs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_07_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run the dinner rush at a busy restaurant: deploy all four elements — supervise the confused waiter, communicate table assignments, lead the quarrelling kitchen staff, and motivate the exhausted team.',
        labels: ['Motivation: Meaning, Importance', 'Financial and Non-Financial Incentives', 'Motivation Theories: Herzberg\'s Two-Factor', 'Leadership vs Management: Distinction'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_007', title: 'Motivation: Meaning, Importance and Maslow\'s Hierarchy of Needs',
          caseStudy: { intro: 'Imagine you are a manager at a Bengaluru startup where three talented developers have quit in two months despite good salaries.',
            decisions: [{ prompt: 'Define motivation as per the NCERT textbook definition used in Class 12 Business Studies.', options: [
                { text: 'Motivation is the process of stimulating people to action to accomplish desired goals', outcome: 'Motivation is the process of stimulating people to action to accomplish desired goals.' },
                { text: 'motivation is giving money', outcome: 'Not quite — Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2.', reveals: 'students-treat-maslow-s-hierarchy' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_008', title: 'Financial and Non-Financial Incentives: Meaning and Types',
          caseStudy: { intro: 'Imagine you are the HR manager of a mid-size IT company in Bengaluru.',
            decisions: [{ prompt: 'A company offers its employees: (i) annual bonus of 10% of basic salary, (ii) "Employee of the Month" certificate displayed on the office.', options: [
                { text: 'Correct classification: (i) Financial', outcome: 'Correct classification: (i) Financial — direct monetary reward; (ii) Non-financial — psychological.' },
                { text: 'shares are not cash', outcome: 'Not quite — Students believe "financial incentives are always more powerful than non-financial incentives".', reveals: 'financial-incentives-are-always-more' },
                { text: 'non-monetary form', outcome: 'Not quite — Students believe "financial incentives are always more powerful than non-financial incentives".', reveals: 'financial-incentives-are-always-more' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_009', title: 'Motivation Theories: Herzberg\'s Two-Factor Theory',
          caseStudy: { intro: 'Imagine you are the HR manager of a mid-sized IT firm in Bengaluru.',
            decisions: [{ prompt: 'Define \'Hygiene Factors\' and \'Motivators\' in Herzberg\'s Two-Factor Theory and give one example of each.', options: [
                { text: 'Hygiene Factors are extrinsic conditions (e.g., salary, company policy, working', outcome: 'Hygiene Factors are extrinsic conditions (e.g., salary, company policy, working conditions) whose.' },
                { text: 'preventing dissatisfaction', outcome: 'Not quite — Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The.', reveals: 'hygiene-factors-are-unimportant-or' },
                { text: 'creating positive motivation', outcome: 'Not quite — Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The.', reveals: 'hygiene-factors-are-unimportant-or' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_010', title: 'Leadership vs Management: Distinction',
          caseStudy: { intro: 'Imagine you are the captain of a school cricket team (leadership role) and also the class monitor responsible for maintaining the attendance register and.',
            decisions: [{ prompt: 'Define leadership and management in one sentence each, using precise NCERT terminology.', options: [
                { text: 'Leadership: "Leadership is the process of influencing the behaviour of people by making', outcome: 'Leadership: "Leadership is the process of influencing the behaviour of people by making them strive.' },
                { text: 'Management', outcome: 'Not quite — Students believe leadership and management are mutually exclusive roles performed by different.', reveals: 'leadership-and-management-are-mutually' },
                { text: 'A wrong answer typically conflates the two (e.g', outcome: 'Not quite — Students believe leadership and management are mutually exclusive roles performed by different.', reveals: 'leadership-and-management-are-mutually' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A marketing head emails 20 field executives: \'Raise fertiliser sales 15% this quarter — new price list attached.\' Two weeks later sales are flat, and he concludes the team is simply lazy.',
            decisions: [{ prompt: 'Where did he actually fail?', options: [
                { text: 'He informed but never directed — no field briefing to turn the target into daily plans, no coaching or motivation on farmer objections, no mid-quarter review and course-correction.', outcome: 'Directing initiates action continuously at every level; a one-way email is communication, and communication is only one element of directing.' },
                { text: 'Nowhere — he gave a clear written order, and directing is basically giving orders.', outcome: 'That shrinks directing to instruction; without guiding, motivating and following through, orders sit unexecuted.', reveals: 'directing-is-just-orders' },
                { text: 'Nowhere — directing flows from the top anyway, so field supervisors had nothing to add.', outcome: 'Top-down flow doesn\'t mean only the top directs; every level directs its own subordinates, and the skipped field level is exactly where it broke.', reveals: 'only-top-level-directs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_07_010', title: 'You made it',
          caseStudy: { intro: 'You can now name the four levers every leader actually pulls. Directing\'s elements are clean board marks — and the daily toolkit of anyone who will ever manage people.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_007', difficulty: 'standard',
          question: 'Motivation is the process of stimulating people to action to accomplish desired.',
          hint: 'Revisit the \'Elements of Direction\' section in node c12_bs_cbse_07_002 to see where.',
          misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.',
          parts: [
                { id: 'a', prompt: 'A senior accountant rejects a 20% raise to stay in her current role because "I mentor juniors and feel valued here." Using Maslow\'s hierarchy, identify the.', answer: 'The dominant need is *Esteem* (Level 4: recognition, respect, feeling valued)',
                  options: ['The dominant need is *Esteem* (Level 4: recognition, respect, feeling valued)', 'Safety needs'],
                  hint: 'Revisit the \'Elements of Direction\' section in node c12_bs_cbse_07_002 to see where motivation fits.',
                  misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.' },
                { id: 'b', prompt: 'The NCERT motivation process shows: Unsatisfied Need → Tension → Drive → Search Behaviour → Satisfied Need → Tension Reduction.', answer: 'The breakdown occurred at *Satisfied Need → Tension Reduction*',
                  options: ['The breakdown occurred at *Satisfied Need → Tension Reduction*', 'the process ended at satisfaction'],
                  hint: 'Revisit the \'Elements of Direction\' section in node c12_bs_cbse_07_002 to see where motivation fits.',
                  misconception: 'Students treat Maslow\'s hierarchy as a rigid ladder: you *must* 100% finish Level 1 before Level 2 appears.' }
          ],
            remediations: { 'students-treat-maslow-s-hierarchy': { steps: ['Re-read the NCERT box "Definitions on Motivation" (Motive vs Motivation vs Motivators) and write your own one-sentence.', 'Draw the motivation process cycle from memory; label each arrow with the *psychological state* (not just the term).', 'Take a recent personal decision (e.g., choosing a college) and map it to Maslow\'s five levels — identify which level.', 'Re-attempt Diagnostic Question 3 and 4; if still stuck, watch a 5-minute video on "Maslow hierarchy regression" to see.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_008', difficulty: 'standard',
          question: 'Financial incentives are direct monetary rewards or benefits measurable.',
          hint: 'If stuck, revisit c12_bs_cbse_07_007 and create a 2-column table: Column A = 5 Maslow.',
          misconception: 'Students believe "financial incentives are always more powerful than non-financial incentives" because money.',
          parts: [
                { id: 'a', prompt: 'A company offers its employees: (i) annual bonus of 10% of basic salary, (ii) "Employee of the Month" certificate displayed on the office wall, (iii) company.', answer: 'Correct classification: (i) Financial',
                  options: ['Correct classification: (i) Financial', 'shares are not cash', 'non-monetary form', 'non-financial incentive'],
                  hint: 'If stuck, revisit c12_bs_cbse_07_007 and create a 2-column table: Column A = 5 Maslow needs, Column.',
                  misconception: 'Students believe "financial incentives are always more powerful than non-financial incentives" because money is tangible.' },
                { id: 'b', prompt: '"Promotion is a financial incentive because it comes with a salary hike." Evaluate this statement using NCERT\'s distinction between financial and non-financial.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'financial incentives are always more powerful than non-financial incentives', 'universal need', 'highest motivator for *already-paid* employees'],
                  hint: 'If stuck, revisit c12_bs_cbse_07_007 and create a 2-column table: Column A = 5 Maslow needs, Column.',
                  misconception: 'Students believe "financial incentives are always more powerful than non-financial incentives" because money is tangible.' }
          ],
            remediations: { 'financial-incentives-are-always-more': { steps: ['If the student holds this misconception: Step 1 — Ask them to list 3 things they\'d value *more* than a ₹5,000 bonus.', 'Step 2 — Map each to Maslow: flexible hours → Safety/Work-life; learning budget → Self-Actualisation; recognition →.', 'Step 3 — Show NCERT line: "non-monetary aspects over-ride monetary aspects" for promotion.', 'Step 4 — Re-attempt Diagnostic Question 5 with this lens.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_009', difficulty: 'standard',
          question: 'Herzberg\'s Two-Factor Theory (Motivation-Hygiene Theory) states that job.',
          hint: 'If stuck, re-watch the Maslow hierarchy video (c12_bs_cbse_07_007) focusing on the.',
          misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they.',
          parts: [
                { id: 'a', prompt: 'Define \'Hygiene Factors\' and \'Motivators\' in Herzberg\'s Two-Factor Theory and give one example of each.', answer: 'Hygiene Factors are extrinsic conditions (e.g., salary, company policy, working',
                  options: ['Hygiene Factors are extrinsic conditions (e.g., salary, company policy, working', 'preventing dissatisfaction', 'creating positive motivation', 'hygiene factors are unimportant'],
                  hint: 'If stuck, re-watch the Maslow hierarchy video (c12_bs_cbse_07_007) focusing on the "deficit vs.',
                  misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they confuse *absence.' },
                { id: 'b', prompt: 'A factory manager installs air-conditioning, increases lighting, and raises wages by 5%.', answer: 'Air-conditioning, lighting, and wages are all hygiene factors',
                  options: ['Air-conditioning, lighting, and wages are all hygiene factors', 'workers are lazy', 'money always motivates', 'hygiene factors are unimportant'],
                  hint: 'If stuck, re-watch the Maslow hierarchy video (c12_bs_cbse_07_007) focusing on the "deficit vs.',
                  misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they confuse *absence.' },
                { id: 'c', prompt: 'Compare Herzberg\'s hygiene factors with Maslow\'s lower-level needs (physiological, safety, belonging). Are they identical?', answer: 'They overlap but are not identical',
                  options: ['They overlap but are not identical', 'they are the same', 'hygiene factors are unimportant', 'Herzberg says money doesn\'t matter'],
                  hint: 'If stuck, re-watch the Maslow hierarchy video (c12_bs_cbse_07_007) focusing on the "deficit vs.',
                  misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they confuse *absence.' }
          ],
            remediations: { 'hygiene-factors-are-unimportant-or': { steps: ['If a student classifies salary as a motivator or says hygiene factors are irrelevant: 1) Revisit c12_bs_cbse_07_007.', '2) Draw the dual continuum on paper: label left axis "Dissatisfaction ←→ No Dissatisfaction" (hygiene) and right axis.', '3) Take the Bengaluru IT case from the Walkthrough and explicitly map each intervention to the correct axis.', '4) Re-attempt Diagnostic Question 2 and 3, writing the axis name beside each factor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_009', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Herzberg\'s theory proves that managers should ignore pay and focus only on job enrichment." Is it a valid application? Why or why not?', answer: 'Invalid',
                  options: ['Invalid', 'necessary but insufficient', 'hygiene factors are unimportant', 'Herzberg says money doesn\'t matter'],
                  hint: 'If stuck, re-watch the Maslow hierarchy video (c12_bs_cbse_07_007) focusing on the "deficit vs.',
                  misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they confuse *absence.' },
                { id: 'b', prompt: 'Create a 3×2 table for a software startup: list three hygiene factors and three motivators specific to this context.', answer: 'Example table: | Factor Type | Factor | Monthly Indicator |',
                  options: ['Example table: | Factor Type | Factor | Monthly Indicator |', 'hygiene factors are unimportant', 'Herzberg says money doesn\'t matter', '"hygiene factors are unimportant" or "Herzberg says money doesn\'t matter'],
                  hint: 'If stuck, re-watch the Maslow hierarchy video (c12_bs_cbse_07_007) focusing on the "deficit vs.',
                  misconception: 'Students often think "hygiene factors are unimportant" or "Herzberg says money doesn\'t matter." The exact error: they confuse *absence.' }
          ],
            remediations: { 'hygiene-factors-are-unimportant-or': { steps: ['If a student classifies salary as a motivator or says hygiene factors are irrelevant: 1) Revisit c12_bs_cbse_07_007.', '2) Draw the dual continuum on paper: label left axis "Dissatisfaction ←→ No Dissatisfaction" (hygiene) and right axis.', '3) Take the Bengaluru IT case from the Walkthrough and explicitly map each intervention to the correct axis.', '4) Re-attempt Diagnostic Question 2 and 3, writing the axis name beside each factor.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_07_010', difficulty: 'standard',
          question: 'Leadership is the process of influencing people to strive willingly and.',
          hint: 'If stuck, revisit node c12_bs_cbse_07_006 for leadership definition and node.',
          misconception: 'Students believe leadership and management are mutually exclusive roles performed by different people: "Managers.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why "a manager may not be a leader, and a leader may not be a manager." Give a concrete workplace example for each case.', answer: 'A manager derives influence from formal position (legitimate power)',
                  options: ['A manager derives influence from formal position (legitimate power)', 'Managers manage, leaders lead', 'A manager cannot be a leader', 'Leadership is better than management'],
                  hint: 'If stuck, revisit node c12_bs_cbse_07_006 for leadership definition and node c11_bs_cbse_08_001.',
                  misconception: 'Students believe leadership and management are mutually exclusive roles performed by different people: "Managers manage, leaders lead.".' },
                { id: 'b', prompt: 'A factory supervisor, Mr. Sharma, notices production delays. He (a) reorganises the shift schedule to minimise machine idle time, (b) calls a team meeting.', answer: 'reorganises the shift schedule to minimise machine idle time, (',
                  options: ['reorganises the shift schedule to minimise machine idle time, (', 'Managers manage, leaders lead', 'A manager cannot be a leader', 'Leadership is better than management'],
                  hint: 'If stuck, revisit node c12_bs_cbse_07_006 for leadership definition and node c11_bs_cbse_08_001.',
                  misconception: 'Students believe leadership and management are mutually exclusive roles performed by different people: "Managers manage, leaders lead.".' }
          ],
            remediations: { 'leadership-and-management-are-mutually': { steps: ['If the student exhibits the mutual-exclusivity misconception: (1) Re-read the NCERT paragraph: "Leadership is a key.', 'managers are important but leaders are vital" — underline "managers" and "leaders" as roles, not separate persons.', '(2) Revisit node c12_bs_cbse_07_006 (Leadership: Meaning, Styles) and identify which leadership style a *manager* would.', '(3) Complete a 2-column journal for one day: label each action you take (as student, sibling, club member) as.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
