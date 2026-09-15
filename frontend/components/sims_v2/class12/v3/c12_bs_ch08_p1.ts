import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch08_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch08_p1: SimDef = {
    id: 'v3_c12_bs_ch08_p1',
    title: 'Controlling · Part 1/2',
    subtitle: '800 metres short, 3% too many defects — the controlling cycle finds the leak.',
    classLevel: 12, subject: 'business_studies', topic: 'Controlling · Part 1/2',
    chapters: ['c12_bs_ch08'],
    nodeIds: ['c12_bs_cbse_08_001', 'c12_bs_cbse_08_002', 'c12_bs_cbse_08_003', 'c12_bs_cbse_08_004', 'c12_bs_cbse_08_005', 'c12_bs_cbse_08_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Production manager', intro: 'A plan without feedback is a wish — controlling is the function that keeps reality and intention in contact.', goal: 'Explain the controlling process from standards through corrective action.' },
    discovery: {
        question: 'A textile factory should produce 5,000 metres daily at under 2% defects — yesterday delivered 4,200 metres at 5%. What does the manager\'s systematic response look like?',
        options: ['Compare actual output against the standard, analyse the deviation, then take corrective action — the controlling cycle', 'Fire the least productive worker immediately', 'Lower the standard to 4,200 metres so performance matches', 'Wait a week to see whether output recovers on its own'],
        answer: 'Compare actual output against the standard, analyse the deviation, then take corrective action — the controlling cycle',
        hook: 'Controlling isn\'t punishment — it\'s a feedback loop with a defined order: standard, measurement, comparison, deviation analysis, correction. Skipping the standard makes every later step meaningless.',
    },
    teaching: [
        { title: 'Controlling: Meaning, Definition and Importance', text: 'Controlling is the management function of ensuring that actual organisational activities conform to planned activities by establishing performance standards, measuring actual performance, comparing.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_08_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Close the loop at the factory: set the performance standard, measure yesterday\'s actuals, quantify the deviations, diagnose their cause, and take corrective action that restores the plan.',
        labels: ['Controlling: Meaning, Definition', 'Controlling Process: Steps', 'Relationship between Planning', 'Types of Control: Feedforward,', 'Techniques of Control: Budgetary', 'Techniques of Control: Break-Even'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_001', title: 'Controlling: Meaning, Definition and Importance',
          caseStudy: { intro: 'Imagine you are the manager of a food‑delivery startup. You have a plan: deliver orders within 30 minutes.',
            decisions: [{ prompt: 'State the meaning of controlling as per NCERT Class 12 Business Studies in one sentence.', options: [
                { text: 'Controlling means ensuring that activities in an organisation are performed as per the', outcome: 'Controlling means ensuring that activities in an organisation are performed as per the plans.' },
                { text: 'controlling means dominating subordinates', outcome: 'Not quite — Students often think “controlling = finding fault and punishing employees”.', reveals: 'controlling-finding-fault-and-punishing' },
                { text: 'controlling is only about checking finished work', outcome: 'Not quite — Students often think “controlling = finding fault and punishing employees”.', reveals: 'controlling-finding-fault-and-punishing' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_002', title: 'Controlling Process: Steps in Controlling',
          caseStudy: { intro: 'Imagine you are the production manager at a textile factory in Surat.',
            decisions: [{ prompt: 'What is the first step in the controlling process according to NCERT, and why must standards be set in quantitative terms wherever possible?', options: [
                { text: 'The first step is setting performance standards', outcome: 'The first step is setting performance standards. Standards should be quantitative (e.g., "produce.' },
                { text: 'measuring actual performance', outcome: 'Not quite — Students often think "controlling" means only the last step (taking corrective action) or that.', reveals: 'controlling-means-only-the-last' },
                { text: 'qualitative standards are better', outcome: 'Not quite — Students often think "controlling" means only the last step (taking corrective action) or that.', reveals: 'controlling-means-only-the-last' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_003', title: 'Relationship between Planning and Controlling',
          caseStudy: { intro: 'Imagine you are the captain of a cricket team (like Rohit Sharma) preparing for the IPL final.',
            decisions: [{ prompt: 'State the exact NCERT phrase that describes the relationship between planning and controlling, and explain what "planning is prescriptive.', options: [
                { text: 'The NCERT describes them as "inseparable twins of management." "Prescriptive" means', outcome: 'The NCERT describes them as "inseparable twins of management." "Prescriptive" means planning.' },
                { text: 'planning is doing, controlling is checking', outcome: 'Not quite — Students often write: **"Planning is forward-looking, controlling is backward-looking — they are.', reveals: 'students-often-write-planning-is' },
                { text: 'planning *only* looks forward and controlling *only* looks back', outcome: 'Not quite — Students often write: **"Planning is forward-looking, controlling is backward-looking — they are.', reveals: 'students-often-write-planning-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_004', title: 'Types of Control: Feedforward, Concurrent and Feedback Control',
          caseStudy: { intro: 'Imagine you are the manager of a new Metro rail project in Bengaluru.',
            decisions: [{ prompt: 'A company installs biometric attendance systems to track employee entry/exit times in real time and sends instant alerts to supervisors.', options: [
                { text: 'This is **Concurrent Control**', outcome: 'This is **Concurrent Control** because measurement and corrective action (alert to supervisor).' },
                { text: 'Feedback Control', outcome: 'Not quite — **Misconception:** "Feedforward Control = Planning; Concurrent Control = Supervision; Feedback.', reveals: 'misconception-feedforward-control-planning' },
                { text: 'Feedforward Control', outcome: 'Not quite — **Misconception:** "Feedforward Control = Planning; Concurrent Control = Supervision; Feedback.', reveals: 'misconception-feedforward-control-planning' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_005', title: 'Techniques of Control: Budgetary Control',
          caseStudy: { intro: 'Imagine you are the manager of a Diwali sweet shop in Delhi. You expect to sell 5,000 kg of ladoos at ₹400/kg this October.',
            decisions: [{ prompt: 'Define Budgetary Control in exactly two sentences using the terms "budget", "actual performance", "variance", and "corrective action".', options: [
                { text: 'Budgetary Control is a system where budgets (quantitative plans) are prepared for a', outcome: 'Budgetary Control is a system where budgets (quantitative plans) are prepared for a future period.' },
                { text: 'variance', outcome: 'Not quite — Students believe "Budgetary Control = Cost Control" and write answers describing only cost.', reveals: 'budgetary-control-cost-control-and' },
                { text: 'corrective action', outcome: 'Not quite — Students believe "Budgetary Control = Cost Control" and write answers describing only cost.', reveals: 'budgetary-control-cost-control-and' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_006', title: 'Techniques of Control: Break-Even Analysis',
          caseStudy: { intro: 'Imagine you\'re helping your cousin who runs a small tiffin service in Delhi.',
            decisions: [{ prompt: 'A company sells a product at ₹200 per unit. Variable cost is ₹120 per unit. Fixed costs are ₹80,000 per month.', options: [
                { text: '**Answer:** 1,000 units', outcome: '**Answer:** 1,000 units. **Reasoning:** Contribution per unit = Selling Price - Variable Cost.' },
                { text: 'target profit volume', outcome: 'Not quite — **Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why.', reveals: 'misconception-break-even-point-is' },
                { text: 'Wrong answer', outcome: 'Not quite — **Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why.', reveals: 'misconception-break-even-point-is' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A new floor supervisor decides controlling means \'catching lazy workers\', so he runs surprise checks and hands out punishments. Output doesn\'t improve and morale craters; a colleague suggests doing controlling \'properly\'.',
            decisions: [{ prompt: 'What does proper controlling look like here?', options: [
                { text: 'Set clear performance standards, measure actual output, compare it with the standard, analyse the cause of deviations, then fix the cause — done openly so workers know expectations and can self-correct.', outcome: 'Controlling is regulation against a standard, not policing; employees perform better when standards are known in advance — that\'s how it motivates.' },
                { text: 'He\'s already doing it — controlling exists precisely to catch slackers and instil discipline through fear.', outcome: 'Fear isn\'t the function: control aims to make activities conform to plans; punishment without standards, measurement and corrective action achieves none of that.', reveals: 'controlling-is-policing' },
                { text: 'Drop the checks — small teams don\'t need a control system at all.', outcome: 'Controlling is pervasive at every size; a low-cost standard plus simple measurement still beats no feedback loop.', reveals: 'small-teams-skip-control' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_006', title: 'The bigger picture',
          caseStudy: { intro: 'You now run the feedback cycle that keeps every plan honest. The controlling sequence is a sequence-tested board staple — and the operating rhythm of every manager alive.',
            decisions: [{ prompt: 'What comes next? Controlling · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Controlling · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_001', difficulty: 'standard',
          question: 'Controlling is the management function of ensuring that actual organisational.',
          hint: 'If stuck, revisit the definition of planning in c12_bs_cbse_04_001 (Planning: Meaning and.',
          misconception: 'Students often think “controlling = finding fault and punishing employees”.',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why controlling is called a “pervasive function” and a “goal‑oriented function”. Give a one‑sentence illustration for each.', answer: 'Pervasive: every manager at every level (top, middle, lower) in every type of',
                  options: ['Pervasive: every manager at every level (top, middle, lower) in every type of', 'only top managers control', 'controlling is for profit only', 'controlling = finding fault and punishing employees'],
                  hint: 'If stuck, revisit the definition of planning in c12_bs_cbse_04_001 (Planning: Meaning and Features).',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' },
                { id: 'b', prompt: 'Compare the statements: “Planning is looking ahead, controlling is looking back” and “Planning and controlling are both backward‑looking and forward‑looking”.', answer: 'The second statement is more accurate',
                  options: ['The second statement is more accurate', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'If stuck, revisit the definition of planning in c12_bs_cbse_04_001 (Planning: Meaning and Features).',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' }
          ],
            remediations: { 'controlling-finding-fault-and-punishing': { steps: ['Ask the student to write the Koontz and O\'Donnel definition verbatim.', 'Give them the hospital scenario above and ask them to label each sentence with the correct importance point.', 'Have them re‑read the NCERT paragraph on “Improving employee motivation” and explain in one sentence how *knowing.', 'Re‑attempt Diagnostic Question 2 and 5. If they still confuse control with punishment, revisit the Class 11 node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think “controlling = finding fault and punishing employees”.',
          parts: [
                { id: 'a', prompt: 'Evaluate: “A small enterprise cannot afford an expensive control system, so it should skip controlling altogether.” Use two limitations of controlling from the.', answer: 'The statement is flawed',
                  options: ['The statement is flawed', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'If stuck, revisit the definition of planning in c12_bs_cbse_04_001 (Planning: Meaning and Features).',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' },
                { id: 'b', prompt: 'Create a new, original scenario (different from the textbook’s FedEx or import‑export examples) where *all six* importance points of controlling are visibly.', answer: 'Scenario: A hospital emergency ward sets a standard: “Patient triage to doctor',
                  options: ['Scenario: A hospital emergency ward sets a standard: “Patient triage to doctor', 'controlling = finding fault and punishing employees', '“controlling = finding fault and punishing employees”'],
                  hint: 'If stuck, revisit the definition of planning in c12_bs_cbse_04_001 (Planning: Meaning and Features).',
                  misconception: 'Students often think “controlling = finding fault and punishing employees”.' }
          ],
            remediations: { 'controlling-finding-fault-and-punishing': { steps: ['Ask the student to write the Koontz and O\'Donnel definition verbatim.', 'Give them the hospital scenario above and ask them to label each sentence with the correct importance point.', 'Have them re‑read the NCERT paragraph on “Improving employee motivation” and explain in one sentence how *knowing.', 'Re‑attempt Diagnostic Question 2 and 5. If they still confuse control with punishment, revisit the Class 11 node.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_002', difficulty: 'standard',
          question: 'Controlling is the systematic process of setting performance standards.',
          hint: 'Revisit c12_bs_cbse_08_001 and focus on the "Meaning of Controlling" and "Importance.',
          misconception: 'Students often think "controlling" means only the last step (taking corrective action) or that it is a one-time event.',
          parts: [
                { id: 'a', prompt: 'What is the first step in the controlling process according to NCERT, and why must standards be set in quantitative terms wherever possible?', answer: 'The first step is setting performance standards',
                  options: ['The first step is setting performance standards', 'measuring actual performance', 'qualitative standards are better', 'improve morale'],
                  hint: 'Revisit c12_bs_cbse_08_001 and focus on the "Meaning of Controlling" and "Importance.',
                  misconception: 'Students often think "controlling" means only the last step (taking corrective action) or that it is a one-time event at the end of.' },
                { id: 'b', prompt: 'In a manufacturing company, labour cost increased by 5% and postal charges increased by 15%.', answer: 'Management should focus on the 5% labour cost increase',
                  options: ['Management should focus on the 5% labour cost increase', 'controlling', 'management by exception', 'ignoring small problems'],
                  hint: 'Revisit c12_bs_cbse_08_001 and focus on the "Meaning of Controlling" and "Importance.',
                  misconception: 'Students often think "controlling" means only the last step (taking corrective action) or that it is a one-time event at the end of.' },
                { id: 'c', prompt: 'Compare and contrast "Critical Point Control" and "Management by Exception". How do they work together in the analysing deviations step?', answer: 'Critical Point Control identifies Key Result Areas (KRAs) to monitor',
                  options: ['Critical Point Control identifies Key Result Areas (KRAs) to monitor', 'controlling', 'management by exception', 'ignoring small problems'],
                  hint: 'Revisit c12_bs_cbse_08_001 and focus on the "Meaning of Controlling" and "Importance.',
                  misconception: 'Students often think "controlling" means only the last step (taking corrective action) or that it is a one-time event at the end of.' }
          ],
            remediations: { 'controlling-means-only-the-last': { steps: ['If a student cannot sequence the steps or misapplies critical point control: 1) Have them re-read the "Controlling.', '2) Give a mini-case: "A school sets 90% attendance standard.', 'Teacher says \'it\'s close, ignore.\' Identify the step violated and the principle ignored." 3) Ask them to list 3 KRAs.', '4) Re-test with Diagnostic Question 3 and 4 until they correctly identify KRAs and exception reporting.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_003', difficulty: 'standard',
          question: 'Planning and controlling are interdependent functions of management where.',
          hint: 'Revisit c12_bs_cbse_08_002 Step 1 (Setting Performance Standards) — focus on the table.',
          misconception: 'Students often write: **"Planning is forward-looking, controlling is backward-looking — they are opposite functions."**.',
          parts: [
                { id: 'a', prompt: 'A student says: "Planning looks ahead, controlling looks back — so they are opposites." Using the NCERT logic, explain why this statement is only "partially.', answer: 'The statement is partially correct',
                  options: ['The statement is partially correct', 'controlling looks at past data', 'planning *only* looks forward and controlling *only* looks back'],
                  hint: 'Revisit c12_bs_cbse_08_002 Step 1 (Setting Performance Standards) — focus on the table "Standards.',
                  misconception: 'Students often write: **"Planning is forward-looking, controlling is backward-looking — they are opposite functions."** This is the #1.' },
                { id: 'b', prompt: '"Zenith Ltd." sets a sales target of ₹50 lakh for Q1 (planning). At the end of January, actual sales are ₹12 lakh against a monthly target of ₹16.67 lakh.', answer: 'the planning element, (',
                  options: ['the planning element, (', 'stops at (c) misses the *cycle*: control data → better future plans', 'planning *only* looks forward and controlling *only* looks back'],
                  hint: 'Revisit c12_bs_cbse_08_002 Step 1 (Setting Performance Standards) — focus on the table "Standards.',
                  misconception: 'Students often write: **"Planning is forward-looking, controlling is backward-looking — they are opposite functions."** This is the #1.' },
                { id: 'c', prompt: 'Compare the following two statements and identify which NCERT principle each illustrates: Statement A: "Because the production manager set precise quantitative.', answer: 'Statement A illustrates **"Planning based on facts makes controlling easier and',
                  options: ['Statement A illustrates **"Planning based on facts makes controlling easier and', 'planning *only* looks forward and controlling *only* looks back'],
                  hint: 'Revisit c12_bs_cbse_08_002 Step 1 (Setting Performance Standards) — focus on the table "Standards.',
                  misconception: 'Students often write: **"Planning is forward-looking, controlling is backward-looking — they are opposite functions."** This is the #1.' }
          ],
            remediations: { 'students-often-write-planning-is': { steps: ['If a student gives the "opposites" answer: (1) Ask them to read the NCERT paragraph starting *"It is often said that.', 'Name one way controlling looks forward." (3) Assign a micro-task: Take any real company (e.g., Zomato, Tata Motors) and.', '(4) Re-test with Diagnostic Question 2 after 24 hours — they must use the phrase "corrective action aims to improve.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_004', difficulty: 'standard',
          question: 'Feedforward, Concurrent, and Feedback Control are three types of managerial.',
          hint: 'If stuck, revisit c12_bs_cbse_08_002 (Controlling Process) and practice mapping each step.',
          misconception: '**Misconception:** "Feedforward Control = Planning; Concurrent Control = Supervision; Feedback Control.',
          parts: [
                { id: 'a', prompt: 'A company installs biometric attendance systems to track employee entry/exit times in real time and sends instant alerts to supervisors when an employee.', answer: 'This is **Concurrent Control**',
                  options: ['This is **Concurrent Control**', 'Feedback Control', 'Feedforward Control'],
                  hint: 'If stuck, revisit c12_bs_cbse_08_002 (Controlling Process) and practice mapping each step to a real.',
                  misconception: '**Misconception:** "Feedforward Control = Planning; Concurrent Control = Supervision; Feedback Control = Post-mortem/Blame." **Why it\'s.' },
                { id: 'b', prompt: '"Feedforward Control is just another name for Planning because both happen before the action starts." Evaluate this statement with a concrete example showing.', answer: 'The statement is **incorrect**',
                  options: ['The statement is **incorrect**', 'distinguish between planning and controlling'],
                  hint: 'If stuck, revisit c12_bs_cbse_08_002 (Controlling Process) and practice mapping each step to a real.',
                  misconception: '**Misconception:** "Feedforward Control = Planning; Concurrent Control = Supervision; Feedback Control = Post-mortem/Blame." **Why it\'s.' },
                { id: 'c', prompt: 'Compare the **cost of correction** and **timeliness of information** across the three control types.', answer: '| Control Type | Timeliness of Info | Cost of Correction |',
                  options: ['| Control Type | Timeliness of Info | Cost of Correction |', 'Feedback is cheaper'],
                  hint: 'If stuck, revisit c12_bs_cbse_08_002 (Controlling Process) and practice mapping each step to a real.',
                  misconception: '**Misconception:** "Feedforward Control = Planning; Concurrent Control = Supervision; Feedback Control = Post-mortem/Blame." **Why it\'s.' }
          ],
            remediations: { 'misconception-feedforward-control-planning': { steps: ['If the student misclassifies controls in Diagnostic Q3 or Q6: 1.', '**Revisit the "Timing Anchor" rule:** Draw a timeline → [Plan] → [Feedforward: Inputs Ready?] → [Concurrent: Process.', '**Practice with 5 distinct scenarios** (manufacturing, service, IT, healthcare, education) — for each, identify the.', '**Re-diagnose:** Give a new case (e.g., "Hospital uses surgical checklists before incision, vital monitors during.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_005', difficulty: 'standard',
          question: 'Budgetary Control is a technique of managerial control where financial and/or.',
          hint: 'If stuck on variance logic, revisit c12_bs_cbse_08_002 Step 3 (Comparison) and Step 4.',
          misconception: 'Students believe "Budgetary Control = Cost Control" and write answers describing only cost reduction.',
          parts: [
                { id: 'a', prompt: 'A student says: "Budgetary control and feedforward control are the same because both happen before the activity." Explain why this statement is incorrect.', answer: 'Budgetary control is distinct',
                  options: ['Budgetary control is distinct', 'distinguish between', 'Budgetary Control = Cost Control'],
                  hint: 'If stuck on variance logic, revisit c12_bs_cbse_08_002 Step 3 (Comparison) and Step 4 (Analysis).',
                  misconception: 'Students believe "Budgetary Control = Cost Control" and write answers describing only cost reduction.' },
                { id: 'b', prompt: 'XYZ Ltd. prepared a Sales Budget for March: 10,000 units @ ₹50/unit. Actual sales were 9,200 units @ ₹52/unit.', answer: 'Step 1: Budgeted Revenue = 10,000 × ₹50 = ₹5,00,000',
                  options: ['Step 1: Budgeted Revenue = 10,000 × ₹50 = ₹5,00,000', 'Budgetary Control = Cost Control'],
                  hint: 'If stuck on variance logic, revisit c12_bs_cbse_08_002 Step 3 (Comparison) and Step 4 (Analysis).',
                  misconception: 'Students believe "Budgetary Control = Cost Control" and write answers describing only cost reduction.' },
                { id: 'c', prompt: 'Compare Budgetary Control and Management by Exception (MbE). In what specific way does budgetary control *enable* MbE?', answer: 'Budgetary control sets quantitative standards (budgets) for *all* activities',
                  options: ['Budgetary control sets quantitative standards (budgets) for *all* activities', 'distinguish', 'Budgetary Control = Cost Control'],
                  hint: 'If stuck on variance logic, revisit c12_bs_cbse_08_002 Step 3 (Comparison) and Step 4 (Analysis).',
                  misconception: 'Students believe "Budgetary Control = Cost Control" and write answers describing only cost reduction.' }
          ],
            remediations: { 'budgetary-control-cost-control-and': { steps: ['Revisit c12_bs_cbse_08_002 (Controlling Process) — confirm you can list the 5 steps and map each to budgetary control.', 'Revisit c11_acc_cbse_08_001 to 08_012 (Financial Statements) — ensure you can read a Trading/P&L account, because.', 'Do a re-diagnostic: Take the XYZ Ltd. problem (Diagnostic Q3) but change numbers — if you still confuse Volume vs Price.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_006', difficulty: 'standard',
          question: 'Break-Even Analysis is a traditional technique of managerial control that.',
          hint: 'If stuck on BEP calculation: Revisit c8_math_ch8_7 (Profit and Loss basics) and.',
          misconception: '**Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why it\'s wrong:** BEP.',
          parts: [
                { id: 'a', prompt: 'A company sells a product at ₹200 per unit. Variable cost is ₹120 per unit. Fixed costs are ₹80,000 per month. What is the Break-Even Point in units?', answer: '**Answer:** 1,000 units',
                  options: ['**Answer:** 1,000 units', 'target profit volume', 'Wrong answer', 'Correct answer'],
                  hint: 'If stuck on BEP calculation: Revisit c8_math_ch8_7 (Profit and Loss basics) and c9_math_ch2_6.',
                  misconception: '**Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why it\'s wrong:** BEP is the **minimum** sales.' },
                { id: 'b', prompt: 'Explain in your own words why the Break-Even Point occurs where the Total Revenue line intersects the Total Cost line on a break-even chart.', answer: '**Answer:** The BEP is where Total Revenue = Total Cost, so profit = 0',
                  options: ['**Answer:** The BEP is where Total Revenue = Total Cost, so profit = 0', 'the distance represents cost', 'it shows fixed cost', 'target profit volume'],
                  hint: 'If stuck on BEP calculation: Revisit c8_math_ch8_7 (Profit and Loss basics) and c9_math_ch2_6.',
                  misconception: '**Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why it\'s wrong:** BEP is the **minimum** sales.' },
                { id: 'c', prompt: 'A firm has Fixed Costs = ₹2,00,000, Variable Cost = ₹60/unit, Selling Price = ₹100/unit.', answer: '**Answer:** (a) 5,000 units, (b) ₹5,00,000, (c) ₹1,20,000, (d) 7,500 units',
                  options: ['**Answer:** (a) 5,000 units, (b) ₹5,00,000, (c) ₹1,20,000, (d) 7,500 units', 'target profit volume', 'Wrong answer', 'Correct answer'],
                  hint: 'If stuck on BEP calculation: Revisit c8_math_ch8_7 (Profit and Loss basics) and c9_math_ch2_6.',
                  misconception: '**Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why it\'s wrong:** BEP is the **minimum** sales.' },
                { id: 'd', prompt: 'Compare two scenarios for the same firm: Scenario A: Selling Price ₹150, Variable Cost ₹90, Fixed Cost ₹1,20,000 Scenario B: Selling Price ₹140, Variable Cost.', answer: '**Answer:** Scenario B has lower BEP (3,000 vs 2,000 units)',
                  options: ['**Answer:** Scenario B has lower BEP (3,000 vs 2,000 units)', 'higher selling price', 'target profit volume', 'Wrong answer'],
                  hint: 'If stuck on BEP calculation: Revisit c8_math_ch8_7 (Profit and Loss basics) and c9_math_ch2_6.',
                  misconception: '**Misconception:** "Break-Even Point is the target sales level a company should aim for." **Why it\'s wrong:** BEP is the **minimum** sales.' }
          ],
            remediations: { 'misconception-break-even-point-is': { steps: ['**Revisit cost classification:** Go to c11_acc_cbse_07_001 (Depreciation: Meaning and Need) and c11_acc_cbse_08_002.', '**Re-derive the BEP formula from scratch:** Write Profit = (SP × Q) - (VC × Q) - FC.', 'Do this 3 times with different numbers until the algebra is automatic.', '**Draw the break-even chart by hand** for 3 scenarios: (a) basic, (b) price increase, (c) fixed cost increase.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
