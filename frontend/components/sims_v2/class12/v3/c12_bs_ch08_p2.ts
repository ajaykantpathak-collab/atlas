import type { SimDef } from '../../engine/types';

/** v3 generated — c12_bs_ch08_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_bs_ch08_p2: SimDef = {
    id: 'v3_c12_bs_ch08_p2',
    title: 'Controlling · Part 2/2',
    subtitle: '800 metres short, 3% too many defects — the controlling cycle finds the leak.',
    classLevel: 12, subject: 'business_studies', topic: 'Controlling · Part 2/2',
    chapters: ['c12_bs_ch08'],
    nodeIds: ['c12_bs_cbse_08_007', 'c12_bs_cbse_08_008', 'c12_bs_cbse_08_009', 'c12_bs_cbse_08_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Production manager', intro: 'A plan without feedback is a wish — controlling is the function that keeps reality and intention in contact.', goal: 'Explain the controlling process from standards through corrective action.' },
    discovery: {
        question: 'A textile factory should produce 5,000 metres daily at under 2% defects — yesterday delivered 4,200 metres at 5%. What does the manager\'s systematic response look like?',
        options: ['Compare actual output against the standard, analyse the deviation, then take corrective action — the controlling cycle', 'Fire the least productive worker immediately', 'Lower the standard to 4,200 metres so performance matches', 'Wait a week to see whether output recovers on its own'],
        answer: 'Compare actual output against the standard, analyse the deviation, then take corrective action — the controlling cycle',
        hook: 'Controlling isn\'t punishment — it\'s a feedback loop with a defined order: standard, measurement, comparison, deviation analysis, correction. Skipping the standard makes every later step meaningless.',
    },
    teaching: [
        { title: 'Techniques of Control: Ratio Analysis and Return on Investment', text: 'Ratio Analysis is a quantitative technique of managerial control that evaluates an organisation\'s financial performance and position by calculating and interpreting key financial ratios derived from.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_bs_cbse_08_007', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Close the loop at the factory: set the performance standard, measure yesterday\'s actuals, quantify the deviations, diagnose their cause, and take corrective action that restores the plan.',
        labels: ['Techniques of Control: Ratio', 'Techniques of Control: PERT', 'Management by Exception: Concept', 'Limitations of Controlling'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_08_007', title: 'Techniques of Control: Ratio Analysis and Return on Investment',
          scaffold: { problem: 'From the following information of Bharat Textiles Ltd. for the year ended 31st March 2024, calculate: (a) Current Ratio, (b) Quick Ratio.',
            steps: [
            { text: 'Identify given data and list required formulas. Current Ratio = Current Assets / Current Liabilities.' },
            { text: 'Compute Current Ratio = 80 / 40 = 2:1.' },
            { text: 'Compute Quick Assets = 80 – 30 – 2 = ₹48 lakh. Quick Ratio = 48 / 40 = 1.2:1.' },
            { text: 'Compute Inventory Turnover = 240 / 30 = 8 times.' },
            { text: 'Compute Net Profit Margin = (40 / 400) × 100 = 10%.' },
            { text: 'Compute Capital Employed = 150 + 50 = ₹200 lakh. ROI = (40 / 200) × 100 = 20%.' },
            { text: 'Verify DuPont: Net Profit Margin (10%) × Asset Turnover (Sales/Capital Employed = 400/200 = 2 times) = 20% = ROI.', faded: true, blankAnswer: '(a) Current Ratio = 2:1, (b) Quick Ratio = 1.2:1, (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_bs_cbse_08_008', title: 'Techniques of Control: PERT and CPM',
          scaffold: { problem: 'A project has the following activities with durations (days) and predecessors:',
            steps: [
            { text: 'Draw network diagram. Nodes: 1 (start), 2 (after A), 3 (after B), 4 (after C,D), 5 (after E), 6 (after F,G - end).' },
            { text: 'Forward Pass (calculate ES, EF). Start at node 1: ES=0.' },
            { text: 'Backward Pass (calculate LF, LS). End at node 6: LF=13.' },
            { text: 'Calculate Total Float = LS - ES (or LF - EF).' },
            { text: 'Identify critical path: Activities with TF=0: B, E, G. Path: 1→3→5→6 (B-E-G). Duration = 5+6+2=13.', faded: true, blankAnswer: 'Critical Path: B → E → G; Project Duration: 13 days; Total.' }
            ] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_009', title: 'Management by Exception: Concept and Application',
          caseStudy: { intro: 'Imagine you are the CEO of a mid-sized textile company in Surat with 500 employees.',
            decisions: [{ prompt: 'Define Management by Exception in one sentence.', options: [
                { text: 'Management by Exception is a control principle where only significant deviations beyond', outcome: 'Management by Exception is a control principle where only significant deviations beyond permissible.' },
                { text: 'ignoring small problems', outcome: 'Not quite — Students often believe Management by Exception means "ignore small deviations" or "only care about.', reveals: 'management-by-exception-means-ignore' },
                { text: 'ignore small deviations', outcome: 'Not quite — Students often believe Management by Exception means "ignore small deviations" or "only care about.', reveals: 'management-by-exception-means-ignore' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_010', title: 'Limitations of Controlling',
          caseStudy: { intro: 'Imagine you\'re the CEO of a mid-sized Indian textile company. You\'ve installed CCTV cameras, set strict production targets, and hired a team of auditors — yet.',
            decisions: [{ prompt: 'State the four limitations of controlling as per NCERT Class 12 Business Studies.', options: [
                { text: 'The four limitations are: (i) Difficulty in setting quantitative standards, (ii) Little', outcome: 'The four limitations are: (i) Difficulty in setting quantitative standards, (ii) Little control.' },
                { text: 'lack of planning', outcome: 'Not quite — Students often confuse "limitations of controlling" with "disadvantages of control" or "reasons why.', reveals: 'students-often-confuse-limitations-of' },
                { text: 'poor communication', outcome: 'Not quite — Students often confuse "limitations of controlling" with "disadvantages of control" or "reasons why.', reveals: 'students-often-confuse-limitations-of' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_007', title: 'Use it in the wild',
          caseStudy: { intro: 'A new floor supervisor decides controlling means \'catching lazy workers\', so he runs surprise checks and hands out punishments. Output doesn\'t improve and morale craters; a colleague suggests doing controlling \'properly\'.',
            decisions: [{ prompt: 'What does proper controlling look like here?', options: [
                { text: 'Set clear performance standards, measure actual output, compare it with the standard, analyse the cause of deviations, then fix the cause — done openly so workers know expectations and can self-correct.', outcome: 'Controlling is regulation against a standard, not policing; employees perform better when standards are known in advance — that\'s how it motivates.' },
                { text: 'He\'s already doing it — controlling exists precisely to catch slackers and instil discipline through fear.', outcome: 'Fear isn\'t the function: control aims to make activities conform to plans; punishment without standards, measurement and corrective action achieves none of that.', reveals: 'controlling-is-policing' },
                { text: 'Drop the checks — small teams don\'t need a control system at all.', outcome: 'Controlling is pervasive at every size; a low-cost standard plus simple measurement still beats no feedback loop.', reveals: 'small-teams-skip-control' }
            ] }] } },
        { type: 'case', nodeId: 'c12_bs_cbse_08_010', title: 'You made it',
          caseStudy: { intro: 'You now run the feedback cycle that keeps every plan honest. The controlling sequence is a sequence-tested board staple — and the operating rhythm of every manager alive.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_007', difficulty: 'standard',
          question: 'Ratio Analysis is a quantitative technique of managerial control that evaluates.',
          hint: 'Revisit Class 11 Accounting nodes c11_acc_cbse_08_001 to c11_acc_cbse_08_008.',
          misconception: 'Students memorise ratio formulas but treat all ratios as standalone indicators.',
          parts: [
                { id: 'a', prompt: 'A company has Current Assets of ₹50 lakh, Current Liabilities of ₹20 lakh, Inventory of ₹15 lakh, and Prepaid Expenses of ₹3 lakh.', answer: 'Current Ratio = Current Assets / Current Liabilities = 50/20 = 2.5:1',
                  options: ['Current Ratio = Current Assets / Current Liabilities = 50/20 = 2.5:1', 'current'],
                  hint: 'Revisit Class 11 Accounting nodes c11_acc_cbse_08_001 to c11_acc_cbse_08_008 — specifically.',
                  misconception: 'Students memorise ratio formulas but treat all ratios as standalone indicators.' }
          ],
            remediations: { 'students-memorise-ratio-formulas-but': { steps: ['If the student exhibits siloed ratio thinking: **Step 1** — Revisit c11_acc_cbse_08_007 (Balance Sheet classification).', '**Step 2** — Work through a DuPont decomposition exercise: Take one company\'s data, compute ROI directly, then compute.', '**Step 3** — Do a "what-if" simulation: Increase credit sales by 20%, assume 10% become bad debts, trace impact on *all.', '**Step 4** — Re-attempt Diagnostic Q4 and Q5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students memorise ratio formulas but treat all ratios as standalone indicators.',
          parts: [
                { id: 'a', prompt: 'Evaluate the statement: "A high ROI always indicates good managerial performance." Use the DuPont decomposition (ROI = Profit Margin × Asset Turnover).', answer: 'The statement is **false**',
                  options: ['The statement is **false**', 'ROI is comprehensive'],
                  hint: 'Revisit Class 11 Accounting nodes c11_acc_cbse_08_001 to c11_acc_cbse_08_008 — specifically.',
                  misconception: 'Students memorise ratio formulas but treat all ratios as standalone indicators.' }
          ],
            remediations: { 'students-memorise-ratio-formulas-but': { steps: ['If the student exhibits siloed ratio thinking: **Step 1** — Revisit c11_acc_cbse_08_007 (Balance Sheet classification).', '**Step 2** — Work through a DuPont decomposition exercise: Take one company\'s data, compute ROI directly, then compute.', '**Step 3** — Do a "what-if" simulation: Increase credit sales by 20%, assume 10% become bad debts, trace impact on *all.', '**Step 4** — Re-attempt Diagnostic Q4 and Q5.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_008', difficulty: 'standard',
          question: 'PERT (Program Evaluation and Review Technique) and CPM (Critical Path Method).',
          hint: 'If stuck on network logic, revisit \'Controlling Process: Steps in Controlling\'.',
          misconception: 'Students often think "Critical Path = path with the most activities" or "Critical Path = path with the longest single.',
          parts: [
                { id: 'a', prompt: 'What is the critical path in a project network, and why is it called \'critical\'?', answer: 'The critical path is the longest path through the network from start to finish,',
                  options: ['The critical path is the longest path through the network from start to finish,', 'Critical Path = path with the most activities', 'Critical Path = path with the longest single activity'],
                  hint: 'If stuck on network logic, revisit \'Controlling Process: Steps in Controlling\' (c12_bs_cbse_08_002).',
                  misconception: 'Students often think "Critical Path = path with the most activities" or "Critical Path = path with the longest single activity." They also.' },
                { id: 'b', prompt: 'In CPM, Activity X has ES=5, EF=12, LS=8, LF=15. What is its total float? Is it on the critical path? Explain.', answer: 'Total float = LS - ES = 8 - 5 = 3 (or LF - EF = 15 - 12 = 3)',
                  options: ['Total float = LS - ES = 8 - 5 = 3 (or LF - EF = 15 - 12 = 3)', 'Critical Path = path with the most activities', 'Critical Path = path with the longest single activity'],
                  hint: 'If stuck on network logic, revisit \'Controlling Process: Steps in Controlling\' (c12_bs_cbse_08_002).',
                  misconception: 'Students often think "Critical Path = path with the most activities" or "Critical Path = path with the longest single activity." They also.' },
                { id: 'c', prompt: 'A project has three activities: A (duration 4 days, no predecessor), B (duration 6 days, predecessor A), C (duration 5 days, predecessor A).', answer: 'Network: A → B and A → C (split after A)',
                  options: ['Network: A → B and A → C (split after A)', 'Critical Path = path with the most activities', 'Critical Path = path with the longest single activity'],
                  hint: 'If stuck on network logic, revisit \'Controlling Process: Steps in Controlling\' (c12_bs_cbse_08_002).',
                  misconception: 'Students often think "Critical Path = path with the most activities" or "Critical Path = path with the longest single activity." They also.' },
                { id: 'd', prompt: 'Compare PERT and CPM on: (a) time estimates used, (b) nature of activities, (c) primary application, (d) treatment of uncertainty.', answer: 'time estimates used, (',
                  options: ['time estimates used, (', 'Critical Path = path with the most activities', 'Critical Path = path with the longest single activity'],
                  hint: 'If stuck on network logic, revisit \'Controlling Process: Steps in Controlling\' (c12_bs_cbse_08_002).',
                  misconception: 'Students often think "Critical Path = path with the most activities" or "Critical Path = path with the longest single activity." They also.' }
          ],
            remediations: { 'critical-path-path-with-the': { steps: ['If the student cannot compute ES/EF/LS/LF correctly: (1) Revisit c12_bs_cbse_08_002 (Controlling Process) to recall.', '(2) Practice forward/backward pass on a linear 4-activity chain (no branching) until flawless.', '(3) Then add one branch and practice the min/max rule at merge (LF = min of successors\' LS) and burst (ES = max.', '(4) Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_009', difficulty: 'standard',
          question: 'Management by Exception is a control principle stating that managers should.',
          hint: 'Revisit the "Analysing Deviations" subsection in node c12_bs_cbse_08_002 and the box.',
          misconception: 'Students often believe Management by Exception means "ignore small deviations" or "only care about big problems.".',
          parts: [
                { id: 'a', prompt: 'A factory sets a standard output of 1,000 units/day with a permissible deviation of ±50 units. Actual output for five days: 980, 1,020, 940, 1,010, 960.', answer: 'Permissible range: 950 to 1,050 units',
                  options: ['Permissible range: 950 to 1,050 units', 'ignore small deviations', 'only care about big problems'],
                  hint: 'Revisit the "Analysing Deviations" subsection in node c12_bs_cbse_08_002 and the box "Advantages.',
                  misconception: 'Students often believe Management by Exception means "ignore small deviations" or "only care about big problems." In reality, small.' },
                { id: 'b', prompt: 'Compare Management by Exception with Critical Point Control. How are they similar and how do they differ?', answer: 'Both focus managerial attention on significant areas',
                  options: ['Both focus managerial attention on significant areas', 'ignore small deviations', 'only care about big problems'],
                  hint: 'Revisit the "Analysing Deviations" subsection in node c12_bs_cbse_08_002 and the box "Advantages.',
                  misconception: 'Students often believe Management by Exception means "ignore small deviations" or "only care about big problems." In reality, small.' }
          ],
            remediations: { 'management-by-exception-means-ignore': { steps: ['If a student confuses "ignoring" with "delegating," take these steps: (1) Revisit the controlling process step.', '(2) Draw a two-column table: "Within Permissible Limit → Action by Subordinate" and "Beyond Permissible Limit → Report.', '(4) Re-attempt Diagnostic Question 3 and 6, verbalizing the decision rule each time.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_bs_cbse_08_010', difficulty: 'standard',
          question: 'Limitations of Controlling refer to the inherent constraints that prevent the.',
          hint: 'Revisit c12_bs_cbse_08_002 (Controlling Process) — specifically the "Setting Performance.',
          misconception: 'Students often confuse "limitations of controlling" with "disadvantages of control" or "reasons why control fails.".',
          parts: [
                { id: 'a', prompt: 'A small organic food startup (revenue ₹50 lakh/year) wants to implement a control system with ERP software (₹8 lakh), biometric attendance (₹2 lakh), and.', answer: 'Total first-year cost = ₹8L + ₹2L + ₹6L = ₹16L (32% of revenue)',
                  options: ['Total first-year cost = ₹8L + ₹2L + ₹6L = ₹16L (32% of revenue)', 'control is always good', 'limitations of controlling', 'disadvantages of control'],
                  hint: 'Revisit c12_bs_cbse_08_002 (Controlling Process) — specifically the "Setting Performance Standards".',
                  misconception: 'Students often confuse "limitations of controlling" with "disadvantages of control" or "reasons why control fails." They write: "Control.' },
                { id: 'b', prompt: 'Compare "Resistance from employees" and "Little control on external factors" — which limitation is internal to the organisation and which is external?', answer: 'Resistance from employees = internal (employees oppose CCTV, strict rules)',
                  options: ['Resistance from employees = internal (employees oppose CCTV, strict rules)', 'external', 'outside the department', 'outside the organisation'],
                  hint: 'Revisit c12_bs_cbse_08_002 (Controlling Process) — specifically the "Setting Performance Standards".',
                  misconception: 'Students often confuse "limitations of controlling" with "disadvantages of control" or "reasons why control fails." They write: "Control.' }
          ],
            remediations: { 'students-often-confuse-limitations-of': { steps: ['Ask the student to define "limitation" vs "failure" — limitation = inherent constraint, failure = execution gap.', 'Give them 5 scenarios (e.g., "CCTV cameras broken," "Government bans your product," "No metric for teamwork," "Control.', 'Have them classify each as Limitation 1/2/3/4 or "Implementation Failure."', 'For each misclassified item, ask: "Could a perfect manager with infinite budget fix this?" If yes → implementation.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
