import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch04_p2 (3 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch04_p2: SimDef = {
    id: 'v3_c12_bs_ch04_p2',
    title: 'Planning · Part 2/2',
    subtitle: 'The match is won before the first ball — that\'s the primary function at work.',
    classLevel: 12, subject: 'business_studies', topic: 'Planning · Part 2/2',
    chapters: ['c12_bs_ch04'],
    nodeIds: ['c12_bs_cbse_04_007', 'c12_bs_cbse_04_008', 'c12_bs_cbse_04_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Team strategist', intro: 'Every management function has a moment — planning\'s moment is always \'before anything else\'.', goal: 'Explain the features and importance of planning and its decision sequence.' },
    discovery: {
        question: 'Before an IPL final, a captain sets the target, reads the pitch, weighs batting vs bowling first, picks the XI and assigns roles. Which management function is this?',
        options: ['Planning — deciding in advance what to do, how, when and who, bridging present to desired future', 'Directing — instructing the team during the match itself', 'Controlling — comparing the score against the plan', 'Staffing — selecting and training the players'],
        answer: 'Planning — deciding in advance what to do, how, when and who, bridging present to desired future',
        hook: 'The pre-match work looks like several functions but is one: planning is the primary function precisely because every other function only executes what planning has already decided.',
    },
    teaching: [
        { title: 'Standing Plans: Procedures, Methods and Rules', text: 'Procedures are chronological sequences of routine steps detailing exactly how to carry out specific activities within a broad policy framework; Methods are prescribed ways of performing a single task.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_04_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Build the game plan: take a team through objectives, premises, alternatives, evaluation, selection and implementation — then argue why planning reduces uncertainty rather than eliminating it.',
        labels: ['Standing Plans: Procedures, Methods', 'Planning vs Forecasting: Distinction', 'Limitations of Planning'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_007', title: 'Standing Plans: Procedures, Methods and Rules',
          caseStudy: { intro: 'Imagine you join a new school as a Class 12 student. On Day 1 you receive three documents: (a) "Library Entry Procedure" listing steps — show ID, sign.',
            decisions: [{ prompt: 'Define Procedure, Method, and Rule as per NCERT Class 12 Business Studies. Give one original example of each from a hospital setting.', options: [
                { text: '**Correct Answer:** - **Procedure**: Chronological steps for a recurring activity', outcome: '**Correct Answer:** - **Procedure**: Chronological steps for a recurring activity.' },
                { text: 'No mobile phones in ICU', outcome: 'Not quite — **Students equate "Procedure" with "Method" because both answer "how to do it."** They write.', reveals: 'students-equate-procedure-with-method' },
                { text: 'Procedure = how to do work, Method = way of doing work', outcome: 'Not quite — **Students equate "Procedure" with "Method" because both answer "how to do it."** They write.', reveals: 'students-equate-procedure-with-method' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_008', title: 'Planning vs Forecasting: Distinction',
          caseStudy: { intro: 'Imagine you are the CEO of a mid-sized textile firm in Surat. You *forecast* that cotton prices will rise 15% next quarter based on last year\'s monsoon data.',
            decisions: [{ prompt: 'Define forecasting in the context of the planning process. At which specific step of planning does forecasting primarily operate?', options: [
                { text: 'Forecasting is the technique of estimating future events/conditions (demand, prices,', outcome: 'Forecasting is the technique of estimating future events/conditions (demand, prices, policy) using.' },
                { text: 'Developing Premises', outcome: 'Not quite — Students treat "forecasting" and "planning" as synonyms because both are "about the future." They.', reveals: 'students-treat-forecasting-and-planning' },
                { text: 'forecasting is the same as planning', outcome: 'Not quite — Students treat "forecasting" and "planning" as synonyms because both are "about the future." They.', reveals: 'students-treat-forecasting-and-planning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_009', title: 'Limitations of Planning',
          caseStudy: { intro: 'Imagine you are the CEO of a mid-sized Indian EV startup that spent three months and ₹50 lakh crafting a detailed five-year expansion plan.',
            decisions: [{ prompt: 'List the six limitations of planning as stated in the NCERT textbook for Class 12 Business Studies.', options: [
                { text: 'The six limitations are: (i) Planning leads to rigidity, (ii) Planning may not work in a', outcome: 'The six limitations are: (i) Planning leads to rigidity, (ii) Planning may not work in a dynamic.' },
                { text: 'huge costs', outcome: 'Not quite — Students often write "Planning leads to rigidity" as "Planning makes the organisation rigid".', reveals: 'students-often-write-planning-leads' },
                { text: 'planning causes delays', outcome: 'Not quite — Students often write "Planning leads to rigidity" as "Planning makes the organisation rigid".', reveals: 'students-often-write-planning-leads' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A startup CEO sets the objective \'market leader in AI education in 3 years\' and asks the marketing head to plan it. The head immediately signs an ad agency. The CEO rejects it: \'That is not a plan.\'',
            decisions: [{ prompt: 'Why doesn\'t the agency hire count as planning?', options: [
                { text: 'Planning means deciding in advance among alternatives — he skipped identifying options (content, partnerships, referrals), evaluating them against premises, and choosing a course; he jumped to executing one option.', outcome: 'An instruction to execute isn\'t a plan: objectives, alternatives, evaluation and future premises all have to precede the action.' },
                { text: 'It does count — planning is just forecasting demand, and hiring the agency acts on the forecast.', outcome: 'Forecasting only develops premises about the future; planning goes further — it weighs alternatives and decides a course of action.', reveals: 'planning-is-forecasting' },
                { text: 'It does count — small firms plan mentally, so nothing written was needed anyway.', outcome: 'Planning is pervasive and mental plans still involve objectives-plus-alternatives; his was neither written nor mentally deliberated.', reveals: 'planning-is-written-docs' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_04_009', title: 'You made it',
          caseStudy: { intro: 'You\'ve learned why planning is called primary — everything else is its execution. Features, importance and the planning sequence are structured board marks with real strategic payoff.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_007', difficulty: 'standard',
          question: 'Procedures are chronological sequences of routine steps detailing exactly how.',
          hint: 'Revisit c12_bs_cbse_04_006 — specifically the Policy vs Rule comparison table —.',
          misconception: '**Students equate "Procedure" with "Method" because both answer "how to do it."** They write: "Procedure for welding.',
          parts: [
                { id: 'a', prompt: '"Procedures and Methods both tell employees how to work. So they are essentially the same thing." Critically comment using the NCERT distinction.', answer: '**Correct Answer**: The statement is **false**',
                  options: ['**Correct Answer**: The statement is **false**', 'both are standing plans so same', 'Report by 9 AM *or face disciplinary action*'],
                  hint: 'Revisit c12_bs_cbse_04_006 — specifically the Policy vs Rule comparison table — to re-anchor the.',
                  misconception: '**Students equate "Procedure" with "Method" because both answer "how to do it."** They write: "Procedure for welding = Method of welding".' },
                { id: 'b', prompt: 'Classify each directive below as Procedure, Method, or Rule. Justify each classification in one sentence.', answer: '**Correct Answer:** - (a) **Rule**',
                  options: ['**Correct Answer:** - (a) **Rule**', 'Report by 9 AM *or face disciplinary action*'],
                  hint: 'Revisit c12_bs_cbse_04_006 — specifically the Policy vs Rule comparison table — to re-anchor the.',
                  misconception: '**Students equate "Procedure" with "Method" because both answer "how to do it."** They write: "Procedure for welding = Method of welding".' }
          ],
            remediations: { 'students-equate-procedure-with-method': { steps: ['**Step 1**: Ask student to list 3 things they *must* do daily (brush teeth, wear uniform, attend assembly) and 3 things.', 'Map: Must-do = Rule/Candidate; Choose-how = Method/Candidate.', '**Step 2**: Give a 5-step "Morning Assembly Procedure" (line up → march → pray → announce → disperse).', 'Ask: "Which step has a Method?" (e.g., "March Method: left-right-left, 120 steps/min").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Students equate "Procedure" with "Method" because both answer "how to do it."** They write: "Procedure for welding.',
          parts: [
                { id: 'a', prompt: '"Rules are the most efficient standing plans because they eliminate decision-making time." Evaluate this claim with reference to organisational creativity and.', answer: '**Correct Answer**: The claim is **partially true but dangerous**',
                  options: ['**Correct Answer**: The claim is **partially true but dangerous**', 'Planning reduces creativity', 'dynamic environment', 'Report by 9 AM *or face disciplinary action*'],
                  hint: 'Revisit c12_bs_cbse_04_006 — specifically the Policy vs Rule comparison table — to re-anchor the.',
                  misconception: '**Students equate "Procedure" with "Method" because both answer "how to do it."** They write: "Procedure for welding = Method of welding".' }
          ],
            remediations: { 'students-equate-procedure-with-method': { steps: ['**Step 1**: Ask student to list 3 things they *must* do daily (brush teeth, wear uniform, attend assembly) and 3 things.', 'Map: Must-do = Rule/Candidate; Choose-how = Method/Candidate.', '**Step 2**: Give a 5-step "Morning Assembly Procedure" (line up → march → pray → announce → disperse).', 'Ask: "Which step has a Method?" (e.g., "March Method: left-right-left, 120 steps/min").'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_008', difficulty: 'standard',
          question: 'Planning is the comprehensive managerial process of setting objectives.',
          hint: 'Revisit c12_bs_cbse_04_003 Step 2 (Developing Premises) and c12_bs_cbse_04_001 Feature.',
          misconception: 'Students treat "forecasting" and "planning" as synonyms because both are "about the future." They write in exams.',
          parts: [
                { id: 'a', prompt: 'A student says: "Our marketing manager forecasted sales of 10,000 units for next year.', answer: 'The forecast (10,000 units) is only a *premise*',
                  options: ['The forecast (10,000 units) is only a *premise*', 'what might we sell?', 'how will we produce, resource, and control to meet that?'],
                  hint: 'Revisit c12_bs_cbse_04_003 Step 2 (Developing Premises) and c12_bs_cbse_04_001 Feature (vi).',
                  misconception: 'Students treat "forecasting" and "planning" as synonyms because both are "about the future." They write in exams: "Planning is forecasting.' },
                { id: 'b', prompt: 'Scenario: An FMCG company uses three forecasting methods (moving average, exponential smoothing, Delphi) to predict next quarter\'s detergent demand.', answer: 'Step 1: Develop a consensus premise',
                  options: ['Step 1: Develop a consensus premise', 'pick the middle forecast and start production'],
                  hint: 'Revisit c12_bs_cbse_04_003 Step 2 (Developing Premises) and c12_bs_cbse_04_001 Feature (vi).',
                  misconception: 'Students treat "forecasting" and "planning" as synonyms because both are "about the future." They write in exams: "Planning is forecasting.' }
          ],
            remediations: { 'students-treat-forecasting-and-planning': { steps: ['Have the student draw a 2-column table: Column A = "Forecasting verbs" (predict, estimate, project, extrapolate).', 'Ask them to map each verb to the 7 planning process steps (c12_bs_cbse_04_003) — they will see forecasting verbs only.', 'Re-attempt Diagnostic Question 2 and 4, requiring the student to explicitly name the missing planning steps in their.', 'If still stuck, revisit c12_bs_cbse_04_001 (features of planning: decision-making, mental exercise) to reinforce that.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_009', difficulty: 'standard',
          question: 'Limitations of Planning refer to the inherent constraints and drawbacks that.',
          hint: 'Revisit c12_bs_cbse_04_001 (features) and c12_bs_cbse_04_002 (importance) — specifically.',
          misconception: 'Students often write "Planning leads to rigidity" as "Planning makes the organisation rigid" — treating rigidity as.',
          parts: [
                { id: 'a', prompt: '"Planning reduces creativity" and "Planning promotes innovative ideas" both appear in the same NCERT chapter.', answer: '"Planning promotes innovative ideas" refers to the *formulation* stage where top',
                  options: ['"Planning promotes innovative ideas" refers to the *formulation* stage where top', 'the textbook contradicts itself'],
                  hint: 'Revisit c12_bs_cbse_04_001 (features) and c12_bs_cbse_04_002 (importance) — specifically the points.',
                  misconception: 'Students often write "Planning leads to rigidity" as "Planning makes the organisation rigid" — treating rigidity as an *inevitable outcome*.' },
                { id: 'b', prompt: 'Compare the limitation "Planning may not work in a dynamic environment" with "Planning leads to rigidity." Are they the same concept described differently?', answer: 'They are distinct',
                  options: ['They are distinct', 'distinguish'],
                  hint: 'Revisit c12_bs_cbse_04_001 (features) and c12_bs_cbse_04_002 (importance) — specifically the points.',
                  misconception: 'Students often write "Planning leads to rigidity" as "Planning makes the organisation rigid" — treating rigidity as an *inevitable outcome*.' }
          ],
            remediations: { 'students-often-write-planning-leads': { steps: ['If a student confuses rigidity as inherent to planning: (1) Re-read NCERT lines: "Following a pre-decided plan, when.', '(2) Review sibling node c12_bs_cbse_04_003 (Planning Process) step (vii) Follow-up action — monitoring enables plan.', '(3) Do a 10-minute exercise: take a simple plan (e.g., "study 3 hours daily") and write two contingency triggers that.', 'This builds the mental model that plans *should* have built-in flexibility.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
