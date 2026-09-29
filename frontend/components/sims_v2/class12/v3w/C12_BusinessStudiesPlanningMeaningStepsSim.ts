import type { SimDef } from '../../engine/types';
import C12_BusinessStudiesPlanningMeaningStepsSim from '../../../simulations/c6_12/C12_BusinessStudiesPlanningMeaningStepsSim';

/** v3 wrapped master — C12_BusinessStudiesPlanningMeaningStepsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_businessstudiesplanningmeaningstepssim: SimDef = {
    id: 'v3w_c12_businessstudiesplanningmeaningstepssim',
    title: 'Planning: Meaning, Definition and Features',
    subtitle: 'This node covers the meaning, definition, and seven features of planning (focus on.',
    classLevel: 12, subject: 'business_studies', topic: 'Planning: Meaning, Definition and Features',
    chapters: [],
    nodeIds: ['c12_bs_cbse_04_001', 'c12_bs_cbse_05_001', 'c12_bs_cbse_08_001', 'c12_bs_cbse_09_006', 'c12_bs_cbse_04_002', 'c12_bs_cbse_04_003', 'c12_bs_cbse_04_005', 'c12_bs_cbse_04_008', 'c12_bs_cbse_04_009', 'c12_bs_cbse_06_002', 'c12_bs_cbse_08_002', 'c12_bs_cbse_08_003', 'c12_bs_cbse_08_010', 'c12_bs_cbse_06_001', 'c12_bs_cbse_09_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-gold-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you are the captain of a cricket team (like Rohit Sharma) before an IPL final.', goal: 'Master Planning: Meaning, Definition and Features.' },
    discovery: {
        question: 'Evaluate this claim: "Since planning is continuous, a company should never finish writing its annual plan — it should keep revising it throughout the year." Is.',
        options: ['Incorrect claim', 'continuous process', 'continuous tinkering'],
        answer: 'Incorrect claim',
        hook: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because.',
    },
    teaching: [
        { title: 'Planning is the primary managerial function.', text: 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to do it, *when* to do it, and *who* is to do it.', emoji: '💡', bgColor: 'from-gold-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_bs_cbse_04_001', title: 'Planning is the primary managerial.',
          scaffold: { problem: 'A school principal wants to improve Class 12 board results from 85% pass to 95% pass next year.',
            steps: [
            { text: 'Identify the objective stated in the scenario — "95% pass rate" — and note that the coordinator\'s circular addresses.' },
            { text: 'Check if the coordinator involved department heads or teachers in *formulating* the plan (Feature 2: Primary function —.' },
            { text: 'Verify if the circular covers *all* departments/subjects and *all* levels (Feature 3: Pervasive — it mentions "all.' },
            { text: 'Assess if there is a mechanism to *review and update* the plan after each pre-board (Feature 4: Continuous — "3.' },
            { text: 'Examine if future uncertainties (new question pattern, teacher absenteeism, student health) are analysed (Feature 5:.' },
            { text: 'Identify if *alternatives* were considered (extra classes vs doubt sessions vs peer tutoring vs online modules) and.' },
            { text: 'Determine if the circular reflects *logical analysis* of past data (weak topics, student profiles) or just a generic.', faded: true, blankAnswer: 'Email drafted mapping all 7 features (as per steps above)..' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_05_001', title: 'Organising is the management function.',
          scaffold: { problem: '"Shri Ram Dhaba" started as a one-man show: Ram cooks, serves, cleans, buys vegetables, and handles cash.',
            steps: [
            { text: 'Identify the organising process steps from the definition: (a) Identification and division of work, (b).' },
            { text: 'Map the current chaos to missing steps: Onions peeled by two while serving neglected → No division of work (Step a.' },
            { text: 'Prescribe specific actions for each step: (a) List all tasks: procurement, pre-prep, cooking, plating, serving,.' },
            { text: 'Verify the prescription covers all 7 importance points: Specialisation (A cooks better), Clarity (B knows only B.' },
            { text: 'Conclude that organising is not "hiring people" but "designing the system in which they work."', faded: true, blankAnswer: 'Ram skipped all four steps. Prescription: (a) Divide work.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_08_001', title: 'Controlling is the management function.',
          scaffold: { problem: 'A retail chain sets a standard: “Customer billing time ≤ 3 minutes per customer.” In a week, the average billing time across 10 outlets is.',
            steps: [
            { text: 'Identify the standard set by management — “billing time ≤ 3 minutes”. This is *Setting performance standards*.' },
            { text: 'Identify the measurement of actual performance — “average 4.2 minutes across 10 outlets”.' },
            { text: 'Compare actual with standard — 4.2 > 3, so deviation exists. This is *Comparison of actual performance with standards*.' },
            { text: 'Analyse the cause of deviation — “outdated POS software in 3 outlets”. This is *Analysing deviations*.' },
            { text: 'Take corrective action — “upgrade software in those outlets”. This is *Taking corrective action*.' },
            { text: 'Verify result — new average 2.8 minutes, within standard. This confirms the corrective action worked.', faded: true, blankAnswer: 'Steps identified as above; most directly served importance.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_09_006', title: 'Financial Planning is the process of.',
          scaffold: { problem: '"GreenTech Pvt Ltd" plans to set up a solar panel manufacturing unit. Current sales ₹80 crore. They forecast 25% sales growth next year.',
            steps: [
            { text: 'Calculate projected sales = Current sales × (1 + growth rate) = ₹80 crore × 1.25 = ₹100 crore.' },
            { text: 'Calculate required fixed assets = Projected sales × Fixed assets/sales ratio = ₹100 crore × 0.6 = ₹60 crore.' },
            { text: 'Calculate required current assets = Projected sales × Current assets/sales ratio = ₹100 crore × 0.25 = ₹25 crore.' },
            { text: 'Calculate spontaneous current liabilities = Projected sales × CL/sales ratio = ₹100 crore × 0.1 = ₹10 crore.' },
            { text: 'Calculate retained earnings = Projected sales × Net profit margin × Retention ratio = ₹100 crore × 0.10 × 0.40 = ₹4.' },
            { text: 'AFN = (Increase in Fixed Assets + Increase in Current Assets) - (Increase in Spontaneous CL + Retained Earnings) = (₹12.', faded: true, blankAnswer: '₹11 crore' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_04_002', title: 'Importance of Planning in Management.',
          scaffold: { problem: 'A Delhi-based cloud kitchen startup, "SpiceRoute," delivers 200 orders/day but faces: (1) chefs arguing over stove space, (2) ingredients.',
            steps: [
            { text: 'Identify the core problem — uncoordinated kitchen operations causing resource conflict, waste, and blind spots.' },
            { text: 'Map the importance point — "reduces overlapping and wasteful activities" requires coordination via scheduling,.' },
            { text: 'Create a weekly production schedule: assign 2-hour stove slots per cuisine (Indian, Chinese, Continental) based on.' },
            { text: 'Implement a par-level inventory system: set minimum/maximum stock for top 20 ingredients using last 4 weeks\' usage.' },
            { text: 'Build a daily sales dashboard (Google Sheets) tracking orders, revenue, and customer ratings per cuisine; review every.', faded: true, blankAnswer: 'Weekly plan with stove-time slots, par-level inventory, and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_04_003', title: 'The planning process is a systematic.',
          scaffold: { problem: 'GreenLeaf Organics, a Pune-based startup selling organic millet snacks, wants to scale from ₹50 lakh to ₹5 crore annual revenue in 24.',
            steps: [
            { text: 'Recall that premises are assumptions about the future environment (external) and internal capabilities (internal) that.' },
            { text: 'Identify external premises: (a) Consumer demand for organic snacks grows at 15% CAGR in urban India (market trend), (b).' },
            { text: 'Identify internal premises: (d) Current production capacity can be doubled with ₹1 crore capex (capability), (e) Core.' },
            { text: 'Select four distinct ones covering different dimensions: e.g., (a) external-market, (b) external-regulatory, (d).' },
            { text: 'Justify each: Without (a), revenue targets are baseless; without (b), product launch may face compliance delays;.', faded: true, blankAnswer: 'Four premises: (1) External-Economic: Urban organic snack.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_bs_cbse_05_001', title: 'Identify each idea',
          dissect: { specimen: 'Planning: Meaning, Definition and Features', spots: [
            { id: 's1', label: 'Planning is the primary managerial', prompt: 'Which idea is this? — Planning is the primary managerial function of deciding in advance *what* to do, *how* to.', answer: 'Planning is the primary managerial', options: ['Planning is the primary managerial', 'Organising is the management function', 'Controlling is the management function', 'Financial Planning is the process'] },
            { id: 's2', label: 'Organising is the management function', prompt: 'Which idea is this? — Organising is the management function that follows planning, involving the identification.', answer: 'Organising is the management function', options: ['Organising is the management function', 'Planning is the primary managerial', 'Controlling is the management function', 'Financial Planning is the process'] },
            { id: 's3', label: 'Controlling is the management function', prompt: 'Which idea is this? — Controlling is the management function of ensuring that actual organisational activities.', answer: 'Controlling is the management function', options: ['Controlling is the management function', 'Planning is the primary managerial', 'Organising is the management function', 'Financial Planning is the process'] },
            { id: 's4', label: 'Financial Planning is the process', prompt: 'Which idea is this? — Financial Planning is the process of preparing a financial blueprint of an organisation\'s.', answer: 'Financial Planning is the process', options: ['Financial Planning is the process', 'Planning is the primary managerial', 'Organising is the management function', 'Controlling is the management function'] },
            { id: 's5', label: 'Importance of Planning in Management', prompt: 'Which idea is this? — Importance of Planning in Management refers to the six core benefits that make planning.', answer: 'Importance of Planning in Management', options: ['Importance of Planning in Management', 'Planning is the primary managerial', 'Organising is the management function', 'Controlling is the management function'] },
            { id: 's6', label: 'The planning process is a', prompt: 'Which idea is this? — The planning process is a systematic sequence of seven logical steps — setting.', answer: 'The planning process is a', options: ['The planning process is a', 'Planning is the primary managerial', 'Organising is the management function', 'Controlling is the management function'] }
          ] } }
    ],
    explore: { component: C12_BusinessStudiesPlanningMeaningStepsSim, prompt: 'Explore the interactive — Planning: Meaning, Definition and Features' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_001', difficulty: 'standard',
          question: 'Planning is the primary managerial function of deciding in advance *what* to.',
          hint: 'If unclear on "objectives" or "uncertainty", revisit Class 11 Chapter 1 nodes.',
          misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'Scenario: The CEO of a tech startup sets an objective: "Become market leader in AI education in 3 years." She asks the marketing head to "plan the marketing.".', answer: 'Missing features: (1) **Planning involves decision-making**',
                  options: ['Missing features: (1) **Planning involves decision-making**', 'he didn\'t plan properly'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because forecasting is *only*.' }
          ],
            remediations: { 'students-equate-planning-with-forecasting': { steps: ['Ask the student to write the NCERT definition verbatim. If they omit "deciding in advance" or "course of action", have.', 'Give them two 1-minute tasks: (a) List 3 decisions you made *before* coming to school today (planning).', 'Ask: "Which list required *choosing*? Which only required *guessing*?"', 'Re-attempt Diagnostic Question 1 and 3. If they still conflate the two, revisit the definition of \'premises\' in.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because.',
          parts: [
                { id: 'a', prompt: 'Evaluate this claim: "Since planning is continuous, a company should never finish writing its annual plan — it should keep revising it throughout the year." Is.', answer: 'Incorrect claim',
                  options: ['Incorrect claim', 'continuous process', 'continuous tinkering'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students equate **planning with forecasting**. They write: "Planning is predicting the future." This is wrong because forecasting is *only*.' }
          ],
            remediations: { 'students-equate-planning-with-forecasting': { steps: ['Ask the student to write the NCERT definition verbatim. If they omit "deciding in advance" or "course of action", have.', 'Give them two 1-minute tasks: (a) List 3 decisions you made *before* coming to school today (planning).', 'Ask: "Which list required *choosing*? Which only required *guessing*?"', 'Re-attempt Diagnostic Question 1 and 3. If they still conflate the two, revisit the definition of \'premises\' in.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_001', difficulty: 'standard',
          question: 'Organising is the management function that follows planning, involving the.',
          hint: 'Revisit Class 9 Economics Chapter 1 (The Story of Village Palampur) — specifically the.',
          misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Organising is the management function that follows planning, involving the identification',
                  options: ['Organising is the management function that follows planning, involving the identification', 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to', 'Controlling is the management function of ensuring that actual organisational activities', 'Financial Planning is the process of preparing a financial blueprint of an organisation\'s'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that organising is a *process*.' }
          ],
            remediations: { 'students-often-equate-organising-with': { steps: ['If a student holds this misconception, do NOT re-read the definition.', 'Instead: (1) Give them a 3-minute "Chaos Simulation": Ask them to verbally instruct 3 classmates to "build a paper.', '(2) Then, have them redo it *using* the 4 steps: identify tasks (cut, fold, tape, assemble), divide (you cut, you.', '(3) Ask: "Which step, if removed, brings back chaos?" This concrete experience anchors the abstract process.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "Organising stifles creativity because it forces people into rigid boxes (departments, job descriptions)." Use the importance points.', answer: 'The statement is a half-truth that confuses *bureaucracy* with *organising*',
                  options: ['The statement is a half-truth that confuses *bureaucracy* with *organising*', 'strengthens the company\'s competitive position'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often equate "organising" with "creating an organisation chart" or "making departments." They miss that organising is a *process*.' }
          ],
            remediations: { 'students-often-equate-organising-with': { steps: ['If a student holds this misconception, do NOT re-read the definition.', 'Instead: (1) Give them a 3-minute "Chaos Simulation": Ask them to verbally instruct 3 classmates to "build a paper.', '(2) Then, have them redo it *using* the 4 steps: identify tasks (cut, fold, tape, assemble), divide (you cut, you.', '(3) Ask: "Which step, if removed, brings back chaos?" This concrete experience anchors the abstract process.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_001', difficulty: 'standard',
          question: 'Controlling is the management function of ensuring that actual organisational.',
          hint: 'If stuck, revisit the definition of planning in c12_bs_cbse_04_001 (Planning: Meaning and.',
          misconception: 'Students often think “controlling = finding fault and punishing employees”.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why controlling is called a “pervasive function” and a “goal‑oriented function”. Give a one‑sentence illustration for each.', answer: 'Pervasive: every manager at every level (top, middle, lower) in every type of',
                  options: ['Pervasive: every manager at every level (top, middle, lower) in every type of', 'only top managers control', 'controlling is for profit only'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' },
                { id: 'b', prompt: 'Compare the statements: “Planning is looking ahead, controlling is looking back” and “Planning and controlling are both backward‑looking and forward‑looking”.', answer: 'The second statement is more accurate',
                  options: ['The second statement is more accurate', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' }
          ],
            remediations: { 'controlling-finding-fault-and-punishing': { steps: ['Ask the student to write the Koontz and O\'Donnel definition verbatim.', 'Give them the hospital scenario above and ask them to label each sentence with the correct importance point.', 'Have them re‑read the NCERT paragraph on “Improving employee motivation” and explain in one sentence how *knowing.', 'Re‑attempt Diagnostic Question 2 and 5. If they still confuse control with punishment, revisit the Class 11 node on.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “controlling = finding fault and punishing employees”.',
          parts: [
                { id: 'a', prompt: 'Evaluate: “A small enterprise cannot afford an expensive control system, so it should skip controlling altogether.” Use two limitations of controlling from the.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' },
                { id: 'b', prompt: 'Create a new, original scenario (different from the textbook’s FedEx or import‑export examples) where *all six* importance points of controlling are visibly at.', answer: 'Scenario: A hospital emergency ward sets a standard: “Patient triage to doctor',
                  options: ['Scenario: A hospital emergency ward sets a standard: “Patient triage to doctor', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' },
                { id: 'c', prompt: 'Compare the statements: “Planning is looking ahead, controlling is looking back” and “Planning and controlling are both backward‑looking and forward‑looking”.', answer: 'The second statement is more accurate',
                  options: ['The second statement is more accurate', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' }
          ],
            remediations: { 'controlling-finding-fault-and-punishing': { steps: ['Ask the student to write the Koontz and O\'Donnel definition verbatim.', 'Give them the hospital scenario above and ask them to label each sentence with the correct importance point.', 'Have them re‑read the NCERT paragraph on “Improving employee motivation” and explain in one sentence how *knowing.', 'Re‑attempt Diagnostic Question 2 and 5. If they still confuse control with punishment, revisit the Class 11 node on.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_006', difficulty: 'standard',
          question: 'Financial Planning is the process of preparing a financial blueprint of an.',
          hint: 'Revisit c12_bs_cbse_09_002 (Financial Decisions) and c11_acc_cbse_08_001 (Financial.',
          misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the.',
          parts: [
                { id: 'a', prompt: 'A company forecasts 20% sales growth next year. Its current fixed assets are ₹100 crore, current assets ₹40 crore, and current liabilities ₹15 crore.', answer: 'Step 1: Projected sales = ₹200 crore × 1.20 = ₹240 crore',
                  options: ['Step 1: Projected sales = ₹200 crore × 1.20 = ₹240 crore', 'Confusing the two loses 1-2 marks in board', 'financial planning = making a budget'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the year." This is wrong.' }
          ],
            remediations: { 'financial-planning-making-a-budget': { steps: ['Ask them to read the NCERT lines: "Typically, financial planning is done for three to five years...', 'Give a concrete example: "A company deciding to build a ₹500 crore plant over 4 years — is that a budget?', 'Re-do Diagnostic Question 6 but for a 4-year college education fund — force them to separate the 4-year plan (financial.', 'Re-attempt Diagnostic Question 2 (True/False) and Question 4 (HUL vs startup) to verify the distinction is internalised.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_09_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the.',
          parts: [
                { id: 'a', prompt: 'Critique this statement: "Since financial planning aims to avoid excess funds, a company should always raise funds only when a payment is due — just-in-time.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'Confusing the two loses 1-2 marks in board', 'financial planning = making a budget'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the year." This is wrong.' },
                { id: 'b', prompt: 'Design a 3-step financial planning checklist for a Class 12 student\'s family planning a ₹15 lakh home renovation over 18 months.', answer: 'Step 1 (Sales Forecast Equivalent): Create a monthly "income forecast"',
                  options: ['Step 1 (Sales Forecast Equivalent): Create a monthly "income forecast"', 'Confusing the two loses 1-2 marks in board', 'financial planning = making a budget'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students think financial planning = making a budget. They write: "Financial planning is preparing budgets for the year." This is wrong.' }
          ],
            remediations: { 'financial-planning-making-a-budget': { steps: ['Ask them to read the NCERT lines: "Typically, financial planning is done for three to five years...', 'Give a concrete example: "A company deciding to build a ₹500 crore plant over 4 years — is that a budget?', 'Re-do Diagnostic Question 6 but for a 4-year college education fund — force them to separate the 4-year plan (financial.', 'Re-attempt Diagnostic Question 2 (True/False) and Question 4 (HUL vs startup) to verify the distinction is internalised.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_002', difficulty: 'standard',
          question: 'Importance of Planning in Management refers to the six core benefits that make.',
          hint: 'Re-read the "Features of Planning" section in NCERT Chapter 4 and explain each feature in.',
          misconception: 'Students often memorize the six points as a list without grasping *which managerial pain point each solves*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Importance of Planning in Management refers to the six core benefits that make planning',
                  options: ['Importance of Planning in Management refers to the six core benefits that make planning', 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to', 'Organising is the management function that follows planning, involving the identification', 'Controlling is the management function of ensuring that actual organisational activities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often memorize the six points as a list without grasping *which managerial pain point each solves*.' }
          ],
            remediations: { 'students-often-memorize-the-six': { steps: ['Revisit node c12_bs_cbse_04_001 (Meaning, Definition and Features) to clarify what planning *is* before studying what.', 'For each importance point, write a 2-sentence mechanism: "Planning reduces uncertainty BY forcing managers to forecast.', 'Create one Indian business example per point (e.g., Amul’s milk procurement planning for "reduces overlapping").', 'Re-attempt Diagnostic Questions 2, 3, and 4. If still stuck, watch a 10-min video on "Planning as a control.'] } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_04_003', difficulty: 'standard',
          question: 'The planning process is a systematic sequence of seven logical steps — setting.',
          hint: 'If unable to explain why planning needs a structured process, revisit c12_bs_cbse_04_001.',
          misconception: 'Students often treat "Developing Premises" and "Identifying Alternatives" as interchangeable or simultaneous.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The planning process is a systematic sequence of seven logical steps',
                  options: ['The planning process is a systematic sequence of seven logical steps', 'Planning is the primary managerial function of deciding in advance *what* to do, *how* to', 'Organising is the management function that follows planning, involving the identification', 'Controlling is the management function of ensuring that actual organisational activities'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often treat "Developing Premises" and "Identifying Alternatives" as interchangeable or simultaneous.' }
          ],
            remediations: { 'students-often-treat-developing-premises': { steps: ['If a student conflates premises and alternatives: (1) Have them re-read the NCERT paragraphs under "Developing.', '(2) Give a mini-case: "A café wants to increase profit 20%.', 'List 3 premises (assumptions) and 3 alternatives (actions)." (3) Ask them to label each statement as P or A.', '(4) Re-diagnose with Diagnostic Question 2.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
