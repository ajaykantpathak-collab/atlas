import type { SimDef } from '../../engine/types';

/** v3 generated — c12_app_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_app_ch10_p1: SimDef = {
    id: 'v3_c12_app_ch10_p1',
    title: 'Linear Programming · Part 1/2',
    subtitle: 'This node covers the **conceptual structure and mathematical formulation** of LPP.',
    classLevel: 12, subject: 'app', topic: 'Linear Programming · Part 1/2',
    chapters: ['c12_app_ch10'],
    nodeIds: ['c12_app_cbse_10_001', 'c12_app_cbse_10_002', 'c12_app_cbse_10_003', 'c12_app_cbse_10_004', 'c12_app_cbse_10_005', 'c12_app_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 12 learner', intro: 'Start with a relatable scenario: "Your family runs a small tailor shop.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Explain in your own words why the "divisibility" assumption in LPP allows fractional values of decision variables, and give a real-life situation where this.',
        options: ['Divisibility means decision variables are continuous — we can produce 10.5 units', 'divisibility means we can divide profit equally', 'linear programming'],
        answer: 'Divisibility means decision variables are continuous — we can produce 10.5 units',
        hook: 'Students often believe the **objective function in LPP can be any function** (e.g., Z = 5x² + 3y or Z = 10√x + 2y).',
    },
    teaching: [
        { title: 'Linear Programming Problem', text: 'A Linear Programming Problem (LPP) is the mathematical formulation of optimizing (maximizing or minimizing) a linear objective function Z = ax + by of two decision variables x and y, subject to a set.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_app_cbse_10_001', title: 'Linear Programming Problem',
          scaffold: { problem: 'A small workshop makes wooden toys: cars (₹50 profit, 2 hrs cutting, 1 hr painting) and trucks (₹70 profit, 1 hr cutting, 2 hrs painting).',
            steps: [
            { text: 'Identify decision variables — let x = number of cars, y = number of trucks produced per week.' },
            { text: 'Write objective function — profit per car ₹50, per truck ₹70, so total profit Z = 50x + 70y. We want to MAXIMIZE Z.' },
            { text: 'Translate resource limits into constraints — Cutting: 2x + 1y ≤ 100; Painting: 1x + 2y ≤ 80.' },
            { text: 'Add non-negativity constraints — x ≥ 0, y ≥ 0 (cannot produce negative toys).' },
            { text: 'Verify linearity — all terms are constant × variable; no x², xy, √x. All constraints are linear inequalities.', faded: true, blankAnswer: 'Maximize Z = 50x + 70y subject to 2x + y ≤ 100, x + 2y ≤.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_10_002', title: 'LEARNING OUTCOMES',
          caseStudy: { intro: 'Start with a relatable scenario: "Your family runs a small bakery making butter cookies (₹50 profit/kg) and chocolate cookies (₹70 profit/kg).',
            decisions: [{ prompt: 'State the four basic assumptions of a Linear Programming Problem and explain in one sentence what each assumption means for the decision.', options: [
                { text: 'The four assumptions are: (1) Certainty', outcome: 'The four assumptions are: (1) Certainty — all parameters (resource availability, profit/cost per.' },
                { text: 'linearity', outcome: 'Not quite — Students believe that "feasible region" and "solution" mean the same thing.', reveals: 'feasible-region-and-solution-mean' },
                { text: 'non-negativity', outcome: 'Not quite — Students believe that "feasible region" and "solution" mean the same thing.', reveals: 'feasible-region-and-solution-mean' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_10_003', title: 'INTRODUCTION',
          caseStudy: { intro: 'Start with a relatable scenario: "Your school canteen wants to introduce two new healthy snacks — roasted chana packets and fruit cups.',
            decisions: [{ prompt: 'What are the three essential components of a Linear Programming Problem, and what does the "linear" in Linear Programming specifically.', options: [
                { text: 'The three essential components are: (1) Decision variables (the unknowns we optimize,', outcome: 'The three essential components are: (1) Decision variables (the unknowns we optimize, e.g.' },
                { text: 'linear means the graph is a straight line', outcome: 'Not quite — **Misconception:** "Non-negativity constraints (x ≥ 0, y ≥ 0) are just mathematical formalities.', reveals: 'misconception-non-negativity-constraints-x' }
            ] }] } },
        { type: 'case', nodeId: 'c12_app_cbse_10_004', title: 'LINEAR PROGRAMMING PROBLEM:',
          caseStudy: { intro: 'Start with the food truck scenario: "You have limited ingredients, time, and fridge space — how do you decide the best mix to maximize profit?" This hooks the.',
            decisions: [{ prompt: 'State the three essential components of a Linear Programming Problem and give the general form of the objective function for two decision.', options: [
                { text: 'The three components are: (1) Decision Variables (x, y), (2) Objective Function (Z = ax +', outcome: 'The three components are: (1) Decision Variables (x, y), (2) Objective Function (Z = ax + by to.' },
                { text: 'feasible region', outcome: 'Not quite — Students often write constraints like "3x + 2y ≥ 100" for a *machine hour limit* (e.g., "Machine.', reveals: 'students-often-write-constraints-like' },
                { text: '3x + 2y ≥ 100', outcome: 'Not quite — Students often write constraints like "3x + 2y ≥ 100" for a *machine hour limit* (e.g., "Machine.', reveals: 'students-often-write-constraints-like' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_10_005', title: 'MATHEMATICAL FORMULATION A LINEAR PROGRAMMING PROBLEM',
          scaffold: { problem: 'A small factory makes two types of wooden toys: Cars (C) and Trucks (T). Each Car requires 2 hours of cutting and 1 hour of painting.',
            steps: [
            { text: 'Identify decision variables. Let x = number of Cars produced per week, y = number of Trucks produced per week.' },
            { text: 'Write the objective function. Profit = 50x + 60y. Since we want maximum profit: Maximize Z = 50x + 60y.' },
            { text: 'Translate cutting constraint. "Each Car 2 hrs cutting, each Truck 1 hr cutting, at most 100 hrs available" → 2x + 1y ≤.' },
            { text: 'Translate painting constraint. "Each Car 1 hr painting, each Truck 3 hrs painting, at most 90 hrs available" → 1x + 3y.' },
            { text: 'Add non-negativity. x ≥ 0, y ≥ 0.' },
            { text: 'State complete formulation. Maximize Z = 50x + 60y subject to 2x + y ≤ 100, x + 3y ≤ 90, x ≥ 0, y ≥ 0.', faded: true, blankAnswer: 'Maximize Z = 50x + 60y subject to 2x + y ≤ 100, x + 3y ≤.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_app_cbse_10_006', title: 'TYPES OF LINEAR PROGRAMMING PROBLEMS',
          scaffold: { problem: 'A small workshop in Jaipur makes wooden toys: cars and dolls. Each car needs 2 hours on Machine A and 1 hour on Machine B.',
            steps: [
            { text: 'Identify decision variables — let x = number of cars, y = number of dolls produced daily. Both ≥ 0 (non-negativity).' },
            { text: 'Identify objective — maximize profit Z = 50x + 60y (profit per unit × quantity).' },
            { text: 'Identify constraints — Machine A time: 2x + 1y ≤ 16 (total hours used ≤ available). Machine B time: 1x + 3y ≤ 15.' },
            { text: 'Classify problem type — this is a **Manufacturing Problem** because: (a) objective is maximize profit, (b) constraints.' },
            { text: 'Write complete LPP formulation: Maximize Z = 50x + 60y subject to 2x + y ≤ 16, x + 3y ≤ 15, x ≥ 0, y ≥ 0.', faded: true, blankAnswer: 'LPP: Max Z = 50x + 60y, s.t. 2x + y ≤ 16, x + 3y ≤ 15, x ≥.' }
            ] } },
        { type: 'case', nodeId: 'c12_app_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You just worked through Linear Programming like a real scientist — observed, predicted, tested, retried.',
            decisions: [{ prompt: 'What comes next? Linear Programming · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Linear Programming · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c12_app_cbse_10_001', difficulty: 'standard',
          question: 'A Linear Programming Problem (LPP) is the mathematical formulation.',
          hint: 'If stuck, review Class 11 Straight Lines (c11_app_cbse_12_001, c11_app_cbse_12_004).',
          misconception: 'Students often believe the **objective function in LPP can be any function** (e.g., Z = 5x² + 3y or Z = 10√x + 2y).',
          parts: [
                { id: 'a', prompt: 'Explain in your own words why the "divisibility" assumption in LPP allows fractional values of decision variables, and give a real-life situation where this.', answer: 'Divisibility means decision variables are continuous — we can produce 10.5 units',
                  options: ['Divisibility means decision variables are continuous — we can produce 10.5 units', 'divisibility means we can divide profit equally', 'linear programming', 'the **objective function in LPP can be any function** (e'],
                  hint: 'If stuck, review Class 11 Straight Lines (c11_app_cbse_12_001, c11_app_cbse_12_004) — practice.',
                  misconception: 'Students often believe the **objective function in LPP can be any function** (e.g., Z = 5x² + 3y or Z = 10√x + 2y) because they confuse.' },
                { id: 'b', prompt: 'A bakery makes cakes (₹300 profit, 4 eggs, 200g flour) and cookies (₹50 profit, 1 egg, 50g flour). Daily limits: 40 eggs, 2kg flour.', answer: 'Let x = cakes, y = cookies',
                  options: ['Let x = cakes, y = cookies', 'linear programming', 'the **objective function in LPP can be any function** (e'],
                  hint: 'If stuck, review Class 11 Straight Lines (c11_app_cbse_12_001, c11_app_cbse_12_004) — practice.',
                  misconception: 'Students often believe the **objective function in LPP can be any function** (e.g., Z = 5x² + 3y or Z = 10√x + 2y) because they confuse.' }
          ],
            remediations: { 'the-objective-function-in-lpp': { steps: ['If a student cannot distinguish linear vs non-linear expressions: (1) Revisit Class 11 functions (c11_app_cbse_08_002).', '(2) Practice classifying 10 expressions as "valid LPP term" or "invalid" with justification (e.g., 7x ✓, 3xy ✗, 4/x ✗.', '(3) Re-read NCERT 8.1 "Basic Assumptions" — proportionality and additivity **require** linearity.', '(4) Re-diagnostic: Give a word problem with a hidden non-linear trap (e.g., "discount if buy > 100 units") and ask why.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the **objective function in LPP can be any function** (e.g., Z = 5x² + 3y or Z = 10√x + 2y).',
          parts: [
                { id: 'a', prompt: 'A student formulates an LPP for a transportation problem with two factories (supply 8, 6) and three depots (demand 5, 5, 4).', answer: 'The formulation is **incomplete**',
                  options: ['The formulation is **incomplete**', 'linear programming', 'the **objective function in LPP can be any function** (e'],
                  hint: 'If stuck, review Class 11 Straight Lines (c11_app_cbse_12_001, c11_app_cbse_12_004) — practice.',
                  misconception: 'Students often believe the **objective function in LPP can be any function** (e.g., Z = 5x² + 3y or Z = 10√x + 2y) because they confuse.' }
          ],
            remediations: { 'the-objective-function-in-lpp': { steps: ['If a student cannot distinguish linear vs non-linear expressions: (1) Revisit Class 11 functions (c11_app_cbse_08_002).', '(2) Practice classifying 10 expressions as "valid LPP term" or "invalid" with justification (e.g., 7x ✓, 3xy ✗, 4/x ✗.', '(3) Re-read NCERT 8.1 "Basic Assumptions" — proportionality and additivity **require** linearity.', '(4) Re-diagnostic: Give a word problem with a hidden non-linear trap (e.g., "discount if buy > 100 units") and ask why.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_002', difficulty: 'standard',
          question: 'Linear Programming is a mathematical technique for optimizing (maximizing.',
          hint: 'Review plotting linear inequalities (Class 11 coordinate geometry) and solving 2x2 linear.',
          misconception: 'Students believe that "feasible region" and "solution" mean the same thing.',
          parts: [
                { id: 'a', prompt: 'State the four basic assumptions of a Linear Programming Problem and explain in one sentence what each assumption means for the decision variables.', answer: 'The four assumptions are: (1) Certainty',
                  options: ['The four assumptions are: (1) Certainty', 'linearity', 'non-negativity', 'feasible region'],
                  hint: 'Review plotting linear inequalities (Class 11 coordinate geometry) and solving 2x2 linear systems.',
                  misconception: 'Students believe that "feasible region" and "solution" mean the same thing.' },
                { id: 'b', prompt: 'Formulate the following as an LPP: A factory makes two products P and Q. P requires 2 hours on Machine A and 3 hours on Machine B.', answer: 'Decision variables: x = units of P, y = units of Q',
                  options: ['Decision variables: x = units of P, y = units of Q', 'hours per product', 'total hours constraint', 'feasible region'],
                  hint: 'Review plotting linear inequalities (Class 11 coordinate geometry) and solving 2x2 linear systems.',
                  misconception: 'Students believe that "feasible region" and "solution" mean the same thing.' }
          ],
            remediations: { 'feasible-region-and-solution-mean': { steps: ['Ask the student to define "feasible solution" and "feasible region" in their own words.', 'Give a simple LPP: Max Z = x + y, s.t. x+y ≤ 4, x≥0, y≥0. Have them list 5 feasible solutions (e.g., (0,0), (1,1).', 'Ask: "Is (2,2) a feasible solution? Is it the feasible region?"', 'Re-diagnose with a question: "If the feasible region is a triangle, how many feasible solutions exist?" (Answer.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_003', difficulty: 'standard',
          question: 'Linear Programming is a mathematical technique used to find the optimal value.',
          hint: 'If stuck, review **c11_app_cbse_12_004 (Various Forms of the Equation of a Line)** and.',
          misconception: '**Misconception:** "Non-negativity constraints (x ≥ 0, y ≥ 0) are just mathematical formalities — they don\'t affect the.',
          parts: [
                { id: 'a', prompt: 'A dietician wants to minimize cost of a diet using two foods F1 (₹50/kg, 4 units vitamin/kg) and F2 (₹30/kg, 6 units vitamin/kg).', answer: 'Decision variables: x = kg of F1, y = kg of F2 (x ≥ 0, y ≥ 0)',
                  options: ['Decision variables: x = kg of F1, y = kg of F2 (x ≥ 0, y ≥ 0)', 'minimum requirement'],
                  hint: 'If stuck, review **c11_app_cbse_12_004 (Various Forms of the Equation of a Line)** and.',
                  misconception: '**Misconception:** "Non-negativity constraints (x ≥ 0, y ≥ 0) are just mathematical formalities — they don\'t affect the feasible region.' }
          ],
            remediations: { 'misconception-non-negativity-constraints-x': { steps: ['If a student omits non-negativity constraints or misinterprets inequality directions: 1.', '**Revisit the Rajat example (NCERT 8.2)** — trace how "space for at most 20 items" → x + y ≤ 20 (not =, not ≥), and.', '57600 to invest" → 360x + 240y ≤ 57600.', 'Ask: "What if he spends only ₹50000?'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_004', difficulty: 'standard',
          question: 'A Linear Programming Problem (LPP) is the mathematical process of optimizing.',
          hint: 'Review "Linear Inequalities in Two Variables" from Class 11 (NCERT Ch 6) — specifically.',
          misconception: 'Students often write constraints like "3x + 2y ≥ 100" for a *machine hour limit* (e.g., "Machine available for 100.',
          parts: [
                { id: 'a', prompt: 'A student formulates an LPP for a diet problem as: Minimize Z = 50x + 40y subject to 2x + 3y ≤ 100, x ≥ 0, y ≥ 0.', answer: 'No, it is incorrect',
                  options: ['No, it is incorrect', '3x + 2y ≥ 100', 'Machine available for 100 hours', 'resource availability'],
                  hint: 'Review "Linear Inequalities in Two Variables" from Class 11 (NCERT Ch 6) — specifically how "at.',
                  misconception: 'Students often write constraints like "3x + 2y ≥ 100" for a *machine hour limit* (e.g., "Machine available for 100 hours"), confusing.' },
                { id: 'b', prompt: 'A factory produces two products A and B. Product A requires 2 hours on Machine 1 and 3 hours on Machine 2.', answer: 'Let x = units of A, y = units of B',
                  options: ['Let x = units of A, y = units of B', 'hours required per unit', 'hours per unit × units = total hours used', '3x + 2y ≥ 100'],
                  hint: 'Review "Linear Inequalities in Two Variables" from Class 11 (NCERT Ch 6) — specifically how "at.',
                  misconception: 'Students often write constraints like "3x + 2y ≥ 100" for a *machine hour limit* (e.g., "Machine available for 100 hours"), confusing.' },
                { id: 'c', prompt: 'Compare the "Divisibility" and "Proportionality" assumptions of LPP.', answer: 'Divisibility assumes decision variables can take fractional values (continuous)',
                  options: ['Divisibility assumes decision variables can take fractional values (continuous)', '3x + 2y ≥ 100', 'Machine available for 100 hours', 'resource availability'],
                  hint: 'Review "Linear Inequalities in Two Variables" from Class 11 (NCERT Ch 6) — specifically how "at.',
                  misconception: 'Students often write constraints like "3x + 2y ≥ 100" for a *machine hour limit* (e.g., "Machine available for 100 hours"), confusing.' }
          ],
            remediations: { 'students-often-write-constraints-like': { steps: ['Have the student re-read NCERT 8.1 "Basic Assumptions" and 8.2 "Mathematical Formulation" focusing on the *verbal.', 'Give 5 mixed word problems (manufacturing, diet, transport) and ask them to *only* write the inequality sign for each.', 'Re-attempt Diagnostic Questions 2 and 3.', 'If still stuck, revisit c11_app_cbse_12_001 (Straight Line) to review inequality graphing and "which side of the line".'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_005', difficulty: 'standard',
          question: 'Mathematical formulation of a Linear Programming Problem (LPP) is the process.',
          hint: 'If stuck on inequality signs, review Class 11 Linear Inequalities (not in provided nodes.',
          misconception: '**"All constraints in LPP are ≤ type because resources are limited."** Students see "limited resources" in every.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Mathematical formulation of a Linear Programming Problem (LPP) is the process of',
                  options: ['Mathematical formulation of a Linear Programming Problem (LPP) is the process of', 'A Linear Programming Problem (LPP) is the mathematical formulation of optimizing', 'Linear Programming is a mathematical technique for optimizing (maximizing or minimizing)', 'Linear Programming is a mathematical technique used to find the optimal value (maximum or'],
                  hint: 'If stuck on inequality signs, review Class 11 Linear Inequalities (not in provided nodes but.',
                  misconception: '**"All constraints in LPP are ≤ type because resources are limited."** Students see "limited resources" in every problem and default to ≤.' }
          ],
            remediations: { 'all-constraints-in-lpp-are': { steps: ['**Immediate drill:** Give the student 5 one-line statements: "Factory has 500 kg steel" → write constraint; "Body needs.', 'Student must write inequality sign and explain in one phrase why (e.g., "availability → ≤", "minimum need → ≥").', '**Revisit NCERT Examples 1-5** (c12_app_cbse_10_004): For each, highlight the phrase ("at most", "at least".', 'Make a 3-column table: Phrase → Sign → Reason.'] } } },
        { type: 'subpart', nodeId: 'c12_app_cbse_10_006', difficulty: 'standard',
          question: 'Types of Linear Programming Problems refer to the standard real-world.',
          hint: 'If stuck on constraint direction: review "at most → ≤, at least → ≥" and practice 10.',
          misconception: '**Misconception**: "Diet Problems always involve food and health." **Why it\'s wrong**: The *mathematical structure*.',
          parts: [
                { id: 'a', prompt: 'Name the four standard types of Linear Programming Problems as per NCERT Class 12 Applied Mathematics, and state the typical objective (maximize or minimize).', answer: 'The four types are: (1) Manufacturing Problem',
                  options: ['The four types are: (1) Manufacturing Problem', 'Diet Problem maximizes nutrition'],
                  hint: 'If stuck on constraint direction: review "at most → ≤, at least → ≥" and practice 10 quick.',
                  misconception: '**Misconception**: "Diet Problems always involve food and health." **Why it\'s wrong**: The *mathematical structure* defines the type, not.' },
                { id: 'b', prompt: 'A farmer has 10 hectares of land to grow wheat and barley. Wheat requires 2 kg fertilizer/hectare, barley requires 1 kg/hectare.', answer: 'This is a **Manufacturing Problem**',
                  options: ['This is a **Manufacturing Problem**', 'Diet Problem', 'farmer grows food'],
                  hint: 'If stuck on constraint direction: review "at most → ≤, at least → ≥" and practice 10 quick.',
                  misconception: '**Misconception**: "Diet Problems always involve food and health." **Why it\'s wrong**: The *mathematical structure* defines the type, not.' },
                { id: 'c', prompt: 'Formulate the following as an LPP: A company has two factories (F1, F2) with capacities 50 and 40 units.', answer: 'Let xᵢⱼ = units transported from Fi to Wj (i=1,2',
                  options: ['Let xᵢⱼ = units transported from Fi to Wj (i=1,2', 'full capacity must be used'],
                  hint: 'If stuck on constraint direction: review "at most → ≤, at least → ≥" and practice 10 quick.',
                  misconception: '**Misconception**: "Diet Problems always involve food and health." **Why it\'s wrong**: The *mathematical structure* defines the type, not.' }
          ],
            remediations: { 'misconception-diet-problems-always-involve': { steps: ['If a student misclassifies problem types or writes wrong inequality directions: 1.', '**Revisit c12_app_cbse_10_005 (Mathematical Formulation)** — practice translating 5 word problems into LPPs, focusing.', 'Use the rule: "Resource limit → ≤; Minimum requirement → ≥".', '**Make a 2-column table**: Column A = "Manufacturing/Transportation constraints (≤)", Column B = "Diet/Assignment.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
