import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch04_p1: SimDef = {
    id: 'v3_c12_bs_ch04_p1',
    title: 'Planning · Part 1/2',
    subtitle: 'The match is won before the first ball — that\'s the primary function at work.',
    classLevel: 12, subject: 'business_studies', topic: 'Planning · Part 1/2',
    chapters: ['c12_bs_ch04'],
    nodeIds: ['c12_bs_cbse_04_001', 'c12_bs_cbse_04_002', 'c12_bs_cbse_04_003', 'c12_bs_cbse_04_004', 'c12_bs_cbse_04_005', 'c12_bs_cbse_04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Team strategist', intro: 'Every management function has a moment — planning\'s moment is always \'before anything else\'.', goal: 'Explain the features and importance of planning and its decision sequence.' },
    discovery: {
        question: 'Before an IPL final, a captain sets the target, reads the pitch, weighs batting vs bowling first, picks the XI and assigns roles. Which management function is this?',
        options: ['Planning — deciding in advance what to do, how, when and who, bridging present to desired future', 'Directing — instructing the team during the match itself', 'Controlling — comparing the score against the plan', 'Staffing — selecting and training the players'],
        answer: 'Planning — deciding in advance what to do, how, when and who, bridging present to desired future',
        hook: 'The pre-match work looks like several functions but is one: planning is the primary function precisely because every other function only executes what planning has already decided.',
    },
    teaching: [
        { title: 'Planning: Meaning, Definition and Features', text: 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to do it, *when* to do it, and *who* is to do it.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_04_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the game plan: take a team through objectives, premises, alternatives, evaluation, selection and implementation — then argue why planning reduces uncertainty rather than eliminating it.',
        labels: ['Planning: Meaning, Definition', 'Importance of Planning', 'Planning Process: Steps', 'Types of Plans: Single-Use', 'Single-Use Plans: Programmes, Budgets', 'Standing Plans: Objectives, Strategies'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_001', title: 'Planning: Meaning, Definition and Features',
          caseStudy: { intro: 'Imagine you are the captain of a cricket team (like Rohit Sharma) before an IPL final.',
            decisions: [{ prompt: 'State the NCERT definition of planning in one sentence. Why is the phrase "deciding in advance" critical to this definition?', options: [
                { text: 'Correct answer: "Planning is deciding in advance what to do and how to do it." The phrase', outcome: 'Correct answer: "Planning is deciding in advance what to do and how to do it." The phrase "deciding.' },
                { text: 'planning is doing work systematically', outcome: 'Not quite — Students equate **planning with forecasting**. They write: "Planning is predicting the future.".', reveals: 'students-equate-planning-with-forecasting' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_002', title: 'Importance of Planning in Management',
          caseStudy: { intro: 'Imagine you are the captain of a cricket team about to play a crucial match.',
            decisions: [{ prompt: 'State the six points of importance of planning as per NCERT Class 12 Business Studies.', options: [
                { text: 'The six points are: (i) Planning provides directions, (ii) Planning reduces the risks of', outcome: 'The six points are: (i) Planning provides directions, (ii) Planning reduces the risks.' },
                { text: 'pervasive', outcome: 'Not quite — Students often memorize the six points as a list without grasping *which managerial pain point each.', reveals: 'students-often-memorize-the-six' },
                { text: 'continuous', outcome: 'Not quite — Students often memorize the six points as a list without grasping *which managerial pain point each.', reveals: 'students-often-memorize-the-six' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_004', title: 'Types of Plans: Single-Use and Standing Plans',
          caseStudy: { intro: 'Imagine your school is organising the **Annual Day** (a one-time event) and also has a **daily assembly schedule** (a recurring routine).',
            decisions: [{ prompt: 'A company prepares a **Cash Budget** for the quarter January–March 2026.', options: [
                { text: '**Correct answer:** Single-use plan', outcome: '**Correct answer:** Single-use plan. A cash budget is prepared for a specific period, quantifies.' },
                { text: 'standing plan because budgets are used regularly', outcome: 'Not quite — **Misconception:** "Single-use plans are only for big projects; standing plans are only for small.', reveals: 'misconception-single-use-plans-are' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_005', title: 'Single-Use Plans: Programmes, Budgets and Schedules',
          caseStudy: { intro: 'Imagine your school is hosting an inter-school science fest for the first time — a one-time, non-recurring event.',
            decisions: [{ prompt: '**REMEMBER:** Define a "Budget" as a single-use plan. State its two primary functions in an organisation.', options: [
                { text: 'A Budget is a single-use plan that is a statement of expected results expressed in', outcome: 'A Budget is a single-use plan that is a statement of expected results expressed in numerical terms.' },
                { text: 'Budget is just a financial statement', outcome: 'Not quite — **Misconception:** "A Programme, a Budget, and a Schedule are just three names for the same project.', reveals: 'misconception-a-programme' },
                { text: 'Budget only controls costs', outcome: 'Not quite — **Misconception:** "A Programme, a Budget, and a Schedule are just three names for the same project.', reveals: 'misconception-a-programme' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_006', title: 'Standing Plans: Objectives, Strategies and Policies',
          caseStudy: { intro: 'Imagine you\'re the CEO of a mid-size Indian textile company facing cheap imports.',
            decisions: [{ prompt: 'Define \'Objectives\' as a type of standing plan according to NCERT, and state two characteristics that differentiate them from Strategies.', options: [
                { text: 'Objectives are the desired future positions management aims to reach', outcome: 'Objectives are the desired future positions management aims to reach — measurable end-results.' },
                { text: 'general guidelines', outcome: 'Not quite — Students treat Objectives, Strategy, and Policy as interchangeable "plans" and memorise definitions.', reveals: 'students-treat-objectives' },
                { text: 'measurable/quantitative', outcome: 'Not quite — Students treat Objectives, Strategy, and Policy as interchangeable "plans" and memorise definitions.', reveals: 'students-treat-objectives' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup CEO sets the objective \'market leader in AI education in 3 years\' and asks the marketing head to plan it. The head immediately signs an ad agency. The CEO rejects it: \'That is not a plan.\'',
            decisions: [{ prompt: 'Why doesn\'t the agency hire count as planning?', options: [
                { text: 'Planning means deciding in advance among alternatives — he skipped identifying options (content, partnerships, referrals), evaluating them against premises, and choosing a course; he jumped to executing one option.', outcome: 'An instruction to execute isn\'t a plan: objectives, alternatives, evaluation and future premises all have to precede the action.' },
                { text: 'It does count — planning is just forecasting demand, and hiring the agency acts on the forecast.', outcome: 'Forecasting only develops premises about the future; planning goes further — it weighs alternatives and decides a course of action.', reveals: 'planning-is-forecasting' },
                { text: 'It does count — small firms plan mentally, so nothing written was needed anyway.', outcome: 'Planning is pervasive and mental plans still involve objectives-plus-alternatives; his was neither written nor mentally deliberated.', reveals: 'planning-is-written-docs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_006', title: 'The bigger picture',
          caseStudy: { intro: 'You\'ve learned why planning is called primary — everything else is its execution. Features, importance and the planning sequence are structured board marks with real strategic payoff.',
            decisions: [{ prompt: 'What comes next? Planning · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Planning · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_001', difficulty: 'standard',
          question: 'Planning is the primary managerial function of deciding in advance *what*.',
          hint: 'If unclear on "objectives" or "uncertainty", revisit Class 11 Chapter 1 nodes.',
          misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'Scenario: The CEO of a tech startup sets an objective: "Become market leader in AI education in 3 years." She asks the marketing head to "plan the marketing.".', answer: 'Missing features: (1) **Planning involves decision-making**',
                  options: ['Missing features: (1) **Planning involves decision-making**', 'he didn\'t plan properly'],
                  hint: 'If unclear on "objectives" or "uncertainty", revisit Class 11 Chapter 1 nodes c11_bs_cbse_01_009.',
                  misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because forecasting is *only*.' }
          ],
            remediations: { 'students-equate-planning-with-forecasting': { steps: ['Ask the student to write the NCERT definition verbatim. If they omit "deciding in advance" or "course of action", have.', 'Give them two 1-minute tasks: (a) List 3 decisions you made *before* coming to school today (planning).', 'Ask: "Which list required *choosing*? Which only required *guessing*?"', 'Re-attempt Diagnostic Question 1 and 3. If they still conflate the two, revisit the definition of \'premises\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since planning is continuous, a company should never finish writing its annual plan — it should keep revising it throughout the year.".', answer: 'Incorrect claim',
                  options: ['Incorrect claim', 'continuous process', 'continuous tinkering'],
                  hint: 'If unclear on "objectives" or "uncertainty", revisit Class 11 Chapter 1 nodes c11_bs_cbse_01_009.',
                  misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because forecasting is *only*.' }
          ],
            remediations: { 'students-equate-planning-with-forecasting': { steps: ['Ask the student to write the NCERT definition verbatim. If they omit "deciding in advance" or "course of action", have.', 'Give them two 1-minute tasks: (a) List 3 decisions you made *before* coming to school today (planning).', 'Ask: "Which list required *choosing*? Which only required *guessing*?"', 'Re-attempt Diagnostic Question 1 and 3. If they still conflate the two, revisit the definition of \'premises\'.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_002', difficulty: 'standard',
          question: 'Importance of Planning in Management refers to the six core benefits that make.',
          hint: 'Re-read the "Features of Planning" section in NCERT Chapter 4 and explain each feature.',
          misconception: 'Students often memorize the six points as a list without grasping *which managerial pain point each solves*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Importance of Planning in Management refers to the six core benefits that make planning',
                  options: ['Importance of Planning in Management refers to the six core benefits that make planning', 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to', 'The planning process is a systematic sequence of seven logical steps', 'Types of plans classify organisational planning into two broad categories based on'],
                  hint: 'Re-read the "Features of Planning" section in NCERT Chapter 4 and explain each feature in one.',
                  misconception: 'Students often memorize the six points as a list without grasping *which managerial pain point each solves*.' }
          ],
            remediations: { 'students-often-memorize-the-six': { steps: ['Revisit node c12_bs_cbse_04_001 (Meaning, Definition and Features) to clarify what planning *is* before studying what.', 'For each importance point, write a 2-sentence mechanism: "Planning reduces uncertainty BY forcing managers to forecast.', 'Create one Indian business example per point (e.g., Amul’s milk procurement planning for "reduces overlapping").', 'Re-attempt Diagnostic Questions 2, 3, and 4. If still stuck, watch a 10-min video on "Planning as a control.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_003', difficulty: 'standard',
          question: 'The planning process is a systematic sequence of seven logical steps — setting.',
          hint: 'If unable to explain why planning needs a structured process, revisit c12_bs_cbse_04_001.',
          misconception: 'Students often treat "Developing Premises" and "Identifying Alternatives" as interchangeable or simultaneous.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The planning process is a systematic sequence of seven logical steps',
                  options: ['The planning process is a systematic sequence of seven logical steps', 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to', 'Importance of Planning in Management refers to the six core benefits that make planning', 'Types of plans classify organisational planning into two broad categories based on'],
                  hint: 'If unable to explain why planning needs a structured process, revisit c12_bs_cbse_04_001 features.',
                  misconception: 'Students often treat "Developing Premises" and "Identifying Alternatives" as interchangeable or simultaneous.' }
          ],
            remediations: { 'students-often-treat-developing-premises': { steps: ['If a student conflates premises and alternatives: (1) Have them re-read the NCERT paragraphs under "Developing.', '(2) Give a mini-case: "A café wants to increase profit 20%.', 'List 3 premises (assumptions) and 3 alternatives (actions)." (3) Ask them to label each statement as P or A.', '(4) Re-diagnose with Diagnostic Question 2.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_004', difficulty: 'standard',
          question: 'Types of plans classify organisational planning into two broad categories based.',
          hint: 'If stuck, revisit **c12_bs_cbse_04_003 (Planning Process)** — specifically the step.',
          misconception: '**Misconception:** "Single-use plans are only for big projects; standing plans are only for small routine tasks." **Why.',
          parts: [
                { id: 'a', prompt: 'A company prepares a **Cash Budget** for the quarter January–March 2026. After March, the budget is not reused; a new one is made for April–June.', answer: '**Correct answer:** Single-use plan',
                  options: ['**Correct answer:** Single-use plan', 'standing plan because budgets are used regularly'],
                  hint: 'If stuck, revisit **c12_bs_cbse_04_003 (Planning Process)** — specifically the step "Identifying.',
                  misconception: '**Misconception:** "Single-use plans are only for big projects; standing plans are only for small routine tasks." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Compare **\'Method\'** (standing plan) and **\'Programme\'** (single-use plan) on the following dimensions: (i) Time horizon, (ii) Scope of application, (iii).', answer: '**Correct table:** | Dimension | Method (Standing) | Programme (Single-use) |',
                  options: ['**Correct table:** | Dimension | Method (Standing) | Programme (Single-use) |', 'train supervisors via on-the-job method'],
                  hint: 'If stuck, revisit **c12_bs_cbse_04_003 (Planning Process)** — specifically the step "Identifying.',
                  misconception: '**Misconception:** "Single-use plans are only for big projects; standing plans are only for small routine tasks." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-single-use-plans-are': { steps: ['**Revisit the defining criterion:** Write on a card: *"Single-use = one situation, one time.', 'Standing = many situations, many times."* 2.', '**Re-do Diagnostic Q3** with a fresh scenario (e.g., "School organises Inter-School Science Exhibition" vs.', '"School\'s Lab Safety Rules").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_005', difficulty: 'standard',
          question: 'Single-use plans are specific, one-time plans designed for a unique.',
          hint: 'If stuck, revisit **c12_bs_cbse_04_004** (Types of Plans) and make a two-column table.',
          misconception: '**Misconception:** "A Programme, a Budget, and a Schedule are just three names for the same project plan document.".',
          parts: [
                { id: 'a', prompt: '**UNDERSTAND:** A company prepares a "Sales Budget" forecasting ₹5 crore revenue for Q1. At the end of Q1, actual revenue is ₹4.2 crore.', answer: 'The manager confuses *accuracy of forecast* with *utility of budget*',
                  options: ['The manager confuses *accuracy of forecast* with *utility of budget*', 'Distinguish between Programme and Budget', 'Programme is the plan, Budget is the money part of the plan'],
                  hint: 'If stuck, revisit **c12_bs_cbse_04_004** (Types of Plans) and make a two-column table: Single-use.',
                  misconception: '**Misconception:** "A Programme, a Budget, and a Schedule are just three names for the same project plan document." **Why students make.' },
                { id: 'b', prompt: '**APPLY:** "GreenEarth Ltd." plans to launch a new organic tea brand. This is a one-time project.', answer: '**Programme:** Objective',
                  options: ['**Programme:** Objective', 'Distinguish between Programme and Budget', 'Programme is the plan, Budget is the money part of the plan'],
                  hint: 'If stuck, revisit **c12_bs_cbse_04_004** (Types of Plans) and make a two-column table: Single-use.',
                  misconception: '**Misconception:** "A Programme, a Budget, and a Schedule are just three names for the same project plan document." **Why students make.' }
          ],
            remediations: { 'misconception-a-programme': { steps: ['**Re-read NCERT lines** on "Programme" and "Budget" (textbook pages 103-105).', 'Highlight: "Programmes are detailed statements… outlines… the budget" and "Budget is a statement of expected results.', '**Create a 3-column table** for a familiar one-time event (e.g., "Family wedding," "School annual day").', 'Column 1: Programme elements (objective, policies, tasks, resources).'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_006', difficulty: 'standard',
          question: 'Standing plans are recurring organisational guides used for repetitive.',
          hint: 'If unclear on the planning hierarchy, revisit c12_bs_cbse_04_003 Step 1 (Setting.',
          misconception: 'Students treat Objectives, Strategy, and Policy as interchangeable "plans" and memorise definitions without grasping.',
          parts: [
                { id: 'a', prompt: 'Define \'Objectives\' as a type of standing plan according to NCERT, and state two characteristics that differentiate them from Strategies.', answer: 'Objectives are the desired future positions management aims to reach',
                  options: ['Objectives are the desired future positions management aims to reach', 'general guidelines', 'measurable/quantitative', 'calls Objectives "general guidelines" confuses them with Policies'],
                  hint: 'If unclear on the planning hierarchy, revisit c12_bs_cbse_04_003 Step 1 (Setting Objectives) and.',
                  misconception: 'Students treat Objectives, Strategy, and Policy as interchangeable "plans" and memorise definitions without grasping the hierarchical.' }
          ],
            remediations: { 'students-treat-objectives': { steps: ['Re-read NCERT pages 102-104 (Objectives, Strategy, Policy definitions).', 'Create a 3-column table: Column 1 = Plan Type, Column 2 = NCERT Key Phrase, Column 3 = Your Own 1-line Example.', 'Take the Mitticool case from NCERT (page 99) and explicitly label: Objective (affordable fridge for poor), Strategy.', 'Re-attempt Diagnostic Questions 2 and 4. If still stuck, revisit c12_bs_cbse_04_004 (Types of Plans) to clarify.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
