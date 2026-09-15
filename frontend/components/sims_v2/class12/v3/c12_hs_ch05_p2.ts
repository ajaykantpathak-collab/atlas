import type { SimDef } from '../../engine/types';

/** v3 generated — c12_hs_ch05_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_hs_ch05_p2: SimDef = {
    id: 'v3_c12_hs_ch05_p2',
    title: 'Resource Management and Communication · Part 2/2',
    subtitle: 'The plan doesn\'t end — it loops into the next one',
    classLevel: 12, subject: 'home_science', topic: 'Resource Management and Communication · Part 2/2',
    chapters: ['c12_hs_ch05'],
    nodeIds: ['c12_hs_cbse_05_007', 'c12_hs_cbse_05_008', 'c12_hs_cbse_05_009', 'c12_hs_cbse_05_010', 'c12_hs_cbse_05_011', 'c12_hs_cbse_05_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Family resource manager', intro: 'Scarce time, money and energy become a joyful festival — or chaos — depending on five repeatable steps.', goal: 'Apply the five-step management cycle to family goals — and see why evaluation is the loop\'s hinge.' },
    discovery: {
        question: 'A family plans Diwali on a tight budget — tasks assigned, spending tracked, a post-festival review that reshapes next year\'s plan. Why call it a cycle, not a checklist?',
        options: ['Because evaluation feeds the next plan — each festival\'s review becomes next year\'s planning input; management loops, it doesn\'t end', 'It repeats yearly', 'Checklists are boring', 'Five steps is a cycle'],
        answer: 'Because evaluation feeds the next plan — each festival\'s review becomes next year\'s planning input; management loops, it doesn\'t end',
        hook: 'Management isn\'t just budgeting or controlling — it\'s the full loop of planning, organising, implementing, controlling and evaluating. And \'follow the plan strictly\' fails the moment reality intervenes; controlling exists precisely to deviate wisely.',
    },
    teaching: [
        { title: 'Money Management: Family Income Types and Budgeting Process', text: 'Money management is the systematic process of planning, organizing, controlling, and evaluating family financial resources — including money income (earnings, pensions, remittances), real income.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_hs_cbse_05_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a family goal through all five steps: spot where plans usually skip organising, test why rigid plans break, and compare how nuclear and joint families manage differently.',
        labels: ['Money Management: Family Income', 'Energy Management: Work Simplification', 'Space Management: Principles', 'Communication: Definition, Process', 'Barriers to Effective Communication', 'Management in Different Family'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_007', title: 'Money Management: Family Income Types and Budgeting Process',
          caseStudy: { intro: 'Imagine your family earns ₹60,000 per month but by the 25th, there is barely ₹2,000 left and you don\'t know where the money went.',
            decisions: [{ prompt: 'Define the three types of family income — money income, real income, and psychic income — and give one original example of each (do not use.', options: [
                { text: 'Money income: actual cash inflow (e.g., salary ₹45,000, tuition fees ₹8,000, pension', outcome: 'Money income: actual cash inflow (e.g., salary ₹45,000, tuition fees ₹8,000, pension ₹12,000).' },
                { text: 'budgeting means cutting expenses', outcome: 'Not quite — Students believe "budgeting means cutting expenses" and "real income is only what you grow.', reveals: 'budgeting-means-cutting-expenses-and' },
                { text: 'real income is only what you grow yourself', outcome: 'Not quite — Students believe "budgeting means cutting expenses" and "real income is only what you grow.', reveals: 'budgeting-means-cutting-expenses-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_008', title: 'Energy Management: Work Simplification Techniques and Ergonomics',
          caseStudy: { intro: 'Imagine you are helping your mother prepare a festival meal for 20 guests — she stands for 5 hours, repeatedly bends to pick heavy vessels from floor-level.',
            decisions: [{ prompt: 'Define \'work simplification\' and state the three levels of change proposed by Mundel for achieving it.', options: [
                { text: 'Work simplification is the conscious effort to reduce the energy, time, and effort', outcome: 'Work simplification is the conscious effort to reduce the energy, time, and effort required.' },
                { text: 'using better tools', outcome: 'Not quite — Students believe "energy management means doing less work" and equate it with laziness or reducing.', reveals: 'energy-management-means-doing-less' },
                { text: 'energy management means doing less work', outcome: 'Not quite — Students believe "energy management means doing less work" and equate it with laziness or reducing.', reveals: 'energy-management-means-doing-less' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_009', title: 'Space Management: Principles of Housing and Space Planning',
          caseStudy: { intro: 'Start by asking: "Imagine you are moving into a new 2BHK apartment.',
            decisions: [{ prompt: 'Define \'zoning\' in the context of space planning for a home. Give one example of a public zone and one private zone.', options: [
                { text: 'Zoning is the division of a home into functional areas based on the type and privacy', outcome: 'Zoning is the division of a home into functional areas based on the type and privacy level.' },
                { text: 'zoning means painting walls different colors', outcome: 'Not quite — Students often think space management is only about fitting furniture into a room, ignoring.', reveals: 'space-management-is-only-about' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_010', title: 'Communication: Definition, Process and Types (Verbal and Non-verbal)',
          caseStudy: { intro: 'Imagine your family is planning the monthly budget: your father sends a WhatsApp message "Cut down on eating out," your mother replies with a thumbs-up emoji.',
            decisions: [{ prompt: 'Define communication according to the SMCRE model. List its five components in order.', options: [
                { text: 'Communication is the process where a Source encodes a Message, sends it through a Channel', outcome: 'Communication is the process where a Source encodes a Message, sends it through a Channel to.' },
                { text: 'sender, message, receiver', outcome: 'Not quite — Students believe communication equals "speaking clearly" and that the SMCRE model is just a linear.', reveals: 'communication-equals-speaking-clearly-and' },
                { text: 'speaking clearly', outcome: 'Not quite — Students believe communication equals "speaking clearly" and that the SMCRE model is just a linear.', reveals: 'communication-equals-speaking-clearly-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_011', title: 'Barriers to Effective Communication and Strategies to Overcome Them',
          caseStudy: { intro: 'Imagine you are explaining a recipe to your grandmother over a noisy pressure cooker whistle, using a word she doesn\'t know ("sauté"), while she is worried.',
            decisions: [{ prompt: 'A student says, "Semantic barriers only happen when people speak different languages." Is this statement correct?', options: [
                { text: 'No, the statement is incorrect', outcome: 'No, the statement is incorrect. Semantic barriers arise from differences in meaning assigned.' },
                { text: 'the noise was the problem', outcome: 'Not quite — Students often believe barriers are *single, isolated events* (e.g., "the noise was the problem").', reveals: 'barriers-are-single' },
                { text: 'Speak louder', outcome: 'Not quite — Students often believe barriers are *single, isolated events* (e.g., "the noise was the problem").', reveals: 'barriers-are-single' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_012', title: 'Management in Different Family Situations: Crisis and Stress Management',
          caseStudy: { intro: 'Imagine your family suddenly loses its primary income source due to a factory closure — bills pile up, parents argue constantly, and your younger sibling stops.',
            decisions: [{ prompt: 'Define \'crisis\' in the context of family resource management and give one example each of a developmental crisis and a situational crisis.', options: [
                { text: 'A crisis in family resource management is a disruption that exceeds the family\'s usual', outcome: 'A crisis in family resource management is a disruption that exceeds the family\'s usual coping.' },
                { text: 'any problem', outcome: 'Not quite — Students often believe that "crisis management" means reacting quickly to solve the immediate.', reveals: 'crisis-management-means-reacting-quickly' },
                { text: 'crisis management', outcome: 'Not quite — Students often believe that "crisis management" means reacting quickly to solve the immediate.', reveals: 'crisis-management-means-reacting-quickly' }
            ] }] } },
        { type: 'dissect', nodeId: 'c12_hs_cbse_05_008', title: 'Identify each idea',
          dissect: { specimen: 'Resource Management and Communication · Part 2/2', spots: [
            { id: 's1', label: 'Money Management Family Income Types and Budgeting Process', prompt: 'Which idea is this? — Money management is the systematic process of planning, organizing, controlling, and.', answer: 'Money Management Family Income Types and Budgeting Process', options: ['Money Management Family Income Types and Budgeting Process', 'Space Management Principles of Housing and Space Planning'] },
            { id: 's2', label: 'Space Management Principles of Housing and Space Planning', prompt: 'Which idea is this? — Space management is the systematic process of planning, organizing, and controlling the.', answer: 'Space Management Principles of Housing and Space Planning', options: ['Space Management Principles of Housing and Space Planning', 'Money Management Family Income Types and Budgeting Process'] }
          ] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Planning a family function on a tight budget, one cousin wants to outsource everything — caterer, decorator, tailor — \'money is the resource, let\'s spend it.\' Your aunt counters that the family\'s own skills should carry the load.',
            decisions: [{ prompt: 'How does the human/non-human resource classification settle it?', options: [
                { text: 'Classify before spending — the aunt\'s tailoring, the cousin\'s negotiation skill and everyone\'s time are human resources that grow with use; the savings and hired services are non-human and only deplete — so deploy skills first and let money cover what skills can\'t.', outcome: 'The chapter\'s rule: the label dictates the management — human resources you develop and use, non-human you acquire and conserve; spending money where a skill exists buys depletion instead of growth.' },
                { text: 'Side with outsourcing — paying professionals is simpler and frees everyone\'s time.', outcome: 'That conserves one resource by draining the other — and on a tight budget, money is the scarcer cell; skills left unused don\'t replenish the account that outsourcing empties.', reveals: 'money-solves-everything' },
                { text: 'Side with the aunt entirely — use only family skills and spend nothing.', outcome: 'Time and energy are human resources too and they deplete in the day — a plan that burns the family ragged to save every rupee misreads \'human\' as \'free.\'', reveals: 'skills-are-free' }
            ] }] } },
        { type: 'case', nodeId: 'c12_hs_cbse_05_012', title: 'You made it',
          caseStudy: { intro: 'You can now manage a household goal as a living loop — where this year\'s lessons become next year\'s plan.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_007', difficulty: 'standard',
          question: 'Money management is the systematic process of planning, organizing.',
          hint: 'If stuck on income classification, revisit c11_hs_cbse_10_003 and practice with 10 real.',
          misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error.',
          parts: [
                { id: 'a', prompt: 'Construct a monthly budget for a family with money income ₹80,000 and real income ₹25,000 (free housing ₹20,000 + home-grown food ₹5,000).', answer: 'Total income = ₹80,000 + ₹25,000 = ₹1,05,000',
                  options: ['Total income = ₹80,000 + ₹25,000 = ₹1,05,000', 'budgeting means cutting expenses', 'real income is only what you grow yourself'],
                  hint: 'If stuck on income classification, revisit c11_hs_cbse_10_003 and practice with 10 real household.',
                  misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error leads to budgets that.' }
          ],
            remediations: { 'budgeting-means-cutting-expenses-and': { steps: ['Revisit c11_hs_cbse_10_003 (Family Income: Money Income, Real Income and Psychic Income) — list 10 income sources from.', 'Revisit c11_hs_cbse_10_006 (Steps in Making a Family Budget and Advantages of Budgeting) — re-read the 5-step process.', 'Take a sample monthly income of ₹60,000 and build a budget using the priority-ranking method from Diagnostic Question 6.', 'Re-diagnostic: Ask a peer to give you a new family scenario (income, composition, goals) and build a budget in 15.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error.',
          parts: [
                { id: 'a', prompt: 'Evaluate this statement: "A budget that shows zero surplus (income = expenditure) is a perfect budget." Defend or critique using three arguments from money.', answer: 'Critique: A zero-surplus budget is fragile, not perfect',
                  options: ['Critique: A zero-surplus budget is fragile, not perfect', 'balancing', 'optimising', 'budgeting means cutting expenses'],
                  hint: 'If stuck on income classification, revisit c11_hs_cbse_10_003 and practice with 10 real household.',
                  misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error leads to budgets that.' },
                { id: 'b', prompt: 'Design a budgeting template (table format) for a family with irregular income (e.g., freelancer father, seasonal agricultural mother) that incorporates: (a).', answer: 'Template columns: Month | Projected Income (3-month avg) | Actual Income |',
                  options: ['Template columns: Month | Projected Income (3-month avg) | Actual Income |', 'budgeting means cutting expenses', 'real income is only what you grow yourself'],
                  hint: 'If stuck on income classification, revisit c11_hs_cbse_10_003 and practice with 10 real household.',
                  misconception: 'Students believe "budgeting means cutting expenses" and "real income is only what you grow yourself." The first error leads to budgets that.' }
          ],
            remediations: { 'budgeting-means-cutting-expenses-and': { steps: ['Revisit c11_hs_cbse_10_003 (Family Income: Money Income, Real Income and Psychic Income) — list 10 income sources from.', 'Revisit c11_hs_cbse_10_006 (Steps in Making a Family Budget and Advantages of Budgeting) — re-read the 5-step process.', 'Take a sample monthly income of ₹60,000 and build a budget using the priority-ranking method from Diagnostic Question 6.', 'Re-diagnostic: Ask a peer to give you a new family scenario (income, composition, goals) and build a budget in 15.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_008', difficulty: 'standard',
          question: 'Energy management is the systematic process of planning, organizing, and.',
          hint: 'Revisit Mundel\'s three levels of change (c11_hs_cbse_07_011) and practice classifying.',
          misconception: 'Students believe "energy management means doing less work" and equate it with laziness or reducing output.',
          parts: [
                { id: 'a', prompt: 'A student claims: "Ergonomics is only about buying expensive adjustable chairs for offices." Explain why this statement is incorrect using two specific.', answer: 'The statement is incorrect',
                  options: ['The statement is incorrect', 'energy management means doing less work'],
                  hint: 'Revisit Mundel\'s three levels of change (c11_hs_cbse_07_011) and practice classifying a simple task.',
                  misconception: 'Students believe "energy management means doing less work" and equate it with laziness or reducing output.' }
          ],
            remediations: { 'energy-management-means-doing-less': { steps: ['If the student holds this misconception, have them: (1) Perform a 5-minute simulated chopping task standing at correct.', 'counter height using W = mgh; (3) Re-read Mundel\'s Level 3 (sequence change) and identify one task in their home where.', 'This concrete biomechanical comparison replaces the vague "sitting saves energy" with quantified energy-cost analysis.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_009', difficulty: 'standard',
          question: 'Space management is the systematic process of planning, organizing, and.',
          hint: 'If stuck, revisit c11_hs_cbse_07_010 (Space Management: Principles of Space Planning for.',
          misconception: 'Students often think space management is only about fitting furniture into a room, ignoring circulation space and.',
          parts: [
                { id: 'a', prompt: 'A family of four has a 10 m² bedroom. They want to place a double bed (2 m × 1.8 m), a wardrobe (1.5 m × 0.6 m), and a study table (1.2 m × 0.6 m).', answer: 'Calculate total area required with clearances',
                  options: ['Calculate total area required with clearances', 'ignores clearances reveals misunderstanding of ergonomic space requirements'],
                  hint: 'If stuck, revisit c11_hs_cbse_07_010 (Space Management: Principles of Space Planning for Homes) and.',
                  misconception: 'Students often think space management is only about fitting furniture into a room, ignoring circulation space and ergonomic clearances.' }
          ],
            remediations: { 'space-management-is-only-about': { steps: ['If the student cannot apply clearances, have them physically measure and tape out a 90 cm pathway in their own room.', 'Then revisit c11_hs_cbse_07_010 (Space Management: Principles of Space Planning for Homes) to review the four.', 'Re-do Diagnostic Question 3 with a simpler room (single bed) to build confidence.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_010', difficulty: 'standard',
          question: 'Communication is the dynamic, two-way process of exchanging information, ideas.',
          hint: 'If stuck, immediately re-read the SMCRE model in c11_hs_cbse_06_006 and the.',
          misconception: 'Students believe communication equals "speaking clearly" and that the SMCRE model is just a linear.',
          parts: [
                { id: 'a', prompt: 'Explain the difference between verbal and non-verbal communication. Give two examples of each from a family discussion about saving electricity.', answer: 'Verbal communication uses words',
                  options: ['Verbal communication uses words', 'gestures', 'speaking clearly'],
                  hint: 'If stuck, immediately re-read the SMCRE model in c11_hs_cbse_06_006 and the verbal/non-verbal table.',
                  misconception: 'Students believe communication equals "speaking clearly" and that the SMCRE model is just a linear sender-message-receiver chain.' },
                { id: 'b', prompt: 'In a family meeting about time management, the mother says "We must wake up at 5 AM" while looking at her watch and tapping her foot.', answer: 'Source: Mother',
                  options: ['Source: Mother', 'no feedback', 'speaking clearly'],
                  hint: 'If stuck, immediately re-read the SMCRE model in c11_hs_cbse_06_006 and the verbal/non-verbal table.',
                  misconception: 'Students believe communication equals "speaking clearly" and that the SMCRE model is just a linear sender-message-receiver chain.' },
                { id: 'c', prompt: 'Compare one-way and two-way communication in the context of a parent instructing a child to follow a study timetable.', answer: 'One-way: Parent announces timetable, child listens',
                  options: ['One-way: Parent announces timetable, child listens', 'faster', 'clearer', 'speaking clearly'],
                  hint: 'If stuck, immediately re-read the SMCRE model in c11_hs_cbse_06_006 and the verbal/non-verbal table.',
                  misconception: 'Students believe communication equals "speaking clearly" and that the SMCRE model is just a linear sender-message-receiver chain.' }
          ],
            remediations: { 'communication-equals-speaking-clearly-and': { steps: ['Revisit Class 11 nodes c11_hs_cbse_06_006 (SMCRE Model Overview) and c11_hs_cbse_06_005 (Verbal and Non-verbal.', 'Do a 10-minute role-play: one student gives a resource-management instruction (e.g., "Limit shower to 5 minutes") using.', 'Class identifies mismatches.', 'Re-attempt Diagnostic Question 3 — if still unable to separate Message\'s non-verbal part from Feedback, watch the NCERT.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_011', difficulty: 'standard',
          question: 'Barriers to effective communication are obstacles that distort, block,.',
          hint: 'If stuck, revisit c12_hs_cbse_05_010 and c11_hs_cbse_06_006 to c11_hs_cbse_06_008 — draw.',
          misconception: 'Students often believe barriers are *single, isolated events* (e.g., "the noise was the problem") and that one strategy.',
          parts: [
                { id: 'a', prompt: 'A student says, "Semantic barriers only happen when people speak different languages." Is this statement correct? Explain why or why not in two sentences.', answer: 'No, the statement is incorrect',
                  options: ['No, the statement is incorrect', 'the noise was the problem', 'Speak louder', 'barriers are *single, isolated events* (e'],
                  hint: 'If stuck, revisit c12_hs_cbse_05_010 and c11_hs_cbse_06_006 to c11_hs_cbse_06_008 — draw the SMCRE.',
                  misconception: 'Students often believe barriers are *single, isolated events* (e.g., "the noise was the problem") and that one strategy fixes all.' },
                { id: 'b', prompt: 'Compare and contrast "filtering" (organizational barrier) and "selective perception" (psychological barrier) using a concrete workplace example where a manager.', answer: 'Filtering: The subordinate *omits* the budget overrun in the report',
                  options: ['Filtering: The subordinate *omits* the budget overrun in the report', 'hiding information', 'the noise was the problem', 'Speak louder'],
                  hint: 'If stuck, revisit c12_hs_cbse_05_010 and c11_hs_cbse_06_006 to c11_hs_cbse_06_008 — draw the SMCRE.',
                  misconception: 'Students often believe barriers are *single, isolated events* (e.g., "the noise was the problem") and that one strategy fixes all.' }
          ],
            remediations: { 'barriers-are-single': { steps: ['If a student cannot map a real scenario to multiple barrier categories: (1) Revisit c12_hs_cbse_05_010 to review the.', '(2) Take one recent family argument and use the "Barrier Layer Worksheet": Column A = What happened?', 'Column B = Which element failed?', 'Column C = Barrier category.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_hs_cbse_05_012', difficulty: 'standard',
          question: 'Crisis and stress management in family situations refers to the systematic.',
          hint: 'Revisit node c12_hs_cbse_05_004 (Management Process) and create a one-page flowchart.',
          misconception: 'Students often believe that "crisis management" means reacting quickly to solve the immediate problem, and that "stress.',
          parts: [
                { id: 'a', prompt: 'Compare the ABC model of stress (Ellis) and the Transactional Model (Lazarus & Folkman) in terms of (a) locus of control, (b) role of appraisal, and (c).', answer: 'ABC model: (a) Internal locus',
                  options: ['ABC model: (a) Internal locus', 'ABC is better because it changes thoughts', 'crisis management', 'stress management'],
                  hint: 'Revisit node c12_hs_cbse_05_004 (Management Process) and create a one-page flowchart of the five.',
                  misconception: 'Students often believe that "crisis management" means reacting quickly to solve the immediate problem, and that "stress management" means.' }
          ],
            remediations: { 'crisis-management-means-reacting-quickly': { steps: ['If a student exhibits this misconception: 1) Have them re-read the management process steps (planning → organizing →.', '2) Use the ABC model worksheet: write down an activating event (hospital bill), their irrational belief ("we must.', 'Then dispute the belief with evidence (schemes exist, assets can be sold).', '3) Practice a role-play where they communicate the crisis to a relative using "I" statements and ask for specific help.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
