import type { SimDef } from '../../engine/types';

/** v3 generated — c10_math_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c10_math_ch03_p1: SimDef = {
    id: 'v3_c10_math_ch03_p1',
    title: 'Pair of Linear Equations in Two Variables · Part 1/2',
    subtitle: 'Find the exact point where two conditions agree',
    classLevel: 10, subject: 'mathematics', topic: 'Pair of Linear Equations in Two Variables · Part 1/2',
    chapters: ['c10_math_ch03'],
    nodeIds: ['c10_math_cbse_03_001', 'c10_math_cbse_03_002', 'c10_math_cbse_03_003', 'c10_math_cbse_03_004', 'c10_math_cbse_03_005', 'c10_math_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a comparison shopper decoding rival offers', intro: 'Two phone plans, two taxi fares, two age puzzles — life keeps handing you pairs of conditions at once. Each pair is two straight lines, and the answer lives where they meet — or explains why they never do.', goal: 'Solve pairs of linear equations graphically and algebraically, and classify them as consistent, inconsistent or dependent.' },
    discovery: {
        question: 'Two lines can meet once, never, or everywhere — and each case has a real-world meaning. Which is which?',
        options: ['Unique / no / infinite solutions — consistent, inconsistent, dependent', 'All three mean no solution', 'Lines always meet exactly once', 'Parallel lines meet at infinity only in theory'],
        answer: 'Unique / no / infinite solutions — consistent, inconsistent, dependent',
        hook: 'Every pair of equations is a question with three possible answers — this chapter teaches you to tell them apart instantly.',
    },
    teaching: [
        { title: 'Graphical Representation of a Pair of Linear Equations', text: 'A pair of linear equations in two variables is represented graphically by two straight lines on the Cartesian plane.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c10_math_cbse_03_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Solve real dilemmas with two variables at once: plot both equations, read their crossing, then verify with substitution and elimination — and spot the sneaky cases with no solution or infinitely many.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_001', title: 'Graphical Representation of a Pair of Linear Equations',
          scaffold: { problem: 'Ritu goes to a bookstore and buys 5 pens and 3 pencils for ₹65. Her friend buys 2 pens and 4 pencils for ₹50.',
            steps: [
            { text: 'Define variables. Let cost of one pen = \\(x\\) rupees, cost of one pencil = \\(y\\) rupees.' },
            { text: 'Form equations from the given data. Ritu: \\(5x + 3y = 65\\). Friend: \\(2x + 4y = 50\\).' },
            { text: 'Find intercepts for first equation \\(5x + 3y = 65\\). Put \\(x=0 \\Rightarrow 3y=65 \\Rightarrow y=65/3 \\approx 21.67\\) →.' },
            { text: 'Find intercepts for second equation \\(2x + 4y = 50\\). Put \\(x=0 \\Rightarrow 4y=50 \\Rightarrow y=12.5\\) → point C(0.' },
            { text: 'Plot points A, B and draw line 1. Plot points C, D and draw line 2 on the same graph. Observe intersection point.' },
            { text: 'State answer with units. Cost of one pen = ₹55/7 ≈ ₹7.86, cost of one pencil = ₹60/7 ≈ ₹8.57.', faded: true, blankAnswer: 'Pen = ₹55/7 (approx ₹7.86), Pencil = ₹60/7 (approx ₹8.57)' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_002', title: 'Consistent System: Intersecting Lines (Unique Solution)',
          scaffold: { problem: 'Determine whether the system 2x + 3y = 8 and 4x − y = 2 has a unique solution. If so, find it.',
            steps: [
            { text: 'Check the ratio condition. a₁/a₂ = 2/4 = 1/2, b₁/b₂ = 3/(−1) = −3. Since 1/2 ≠ −3, the system has a unique solution.' },
            { text: 'Solve by substitution. From the second equation: y = 4x − 2.' },
            { text: 'Substitute into the first: 2x + 3(4x − 2) = 8 ⇒ 2x + 12x − 6 = 8 ⇒ 14x = 14 ⇒ x = 1.' },
            { text: 'Find y: y = 4(1) − 2 = 2. Solution: (1, 2).' },
            { text: 'Verify: 2(1) + 3(2) = 2 + 6 = 8 ✓ and 4(1) − 2 = 2 ✓.', faded: true, blankAnswer: 'The system has a unique solution: x = 1, y = 2.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_003', title: 'Inconsistent System: Parallel Lines (No Solution)',
          scaffold: { problem: 'A stationery shop sells pens and notebooks. On Monday, 3 pens and 4 notebooks cost ₹110. On Tuesday, 6 pens and 8 notebooks cost ₹210.',
            steps: [
            { text: 'Let the cost of one pen be ₹\\(x\\) and one notebook be ₹\\(y\\). Write the two equations from the given data: \\(3x + 4y.' },
            { text: 'Convert both equations to standard form \\(ax + by + c = 0\\): \\(3x + 4y - 110 = 0\\) and \\(6x + 8y - 210 = 0\\).' },
            { text: 'Identify coefficients: \\(a_1 = 3, b_1 = 4, c_1 = -110\\); \\(a_2 = 6, b_2 = 8, c_2 = -210\\).' },
            { text: 'Compute the three ratios: \\(\\frac{a_1}{a_2} = \\frac{3}{6} = \\frac{1}{2}\\), \\(\\frac{b_1}{b_2} = \\frac{4}{8}.' },
            { text: 'Compare the ratios: \\(\\frac{1}{2} = \\frac{1}{2} \\neq \\frac{11}{21}\\).' },
            { text: 'Conclude: The system is inconsistent — the lines are parallel.', faded: true, blankAnswer: 'The system is inconsistent (parallel lines). No solution.' }
            ] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_004', title: 'Dependent System: Coincident Lines (Infinitely Many Solutions)',
          scaffold: { problem: 'A stationery shop sells notebooks at ₹\\( x \\) each and pens at ₹\\( y \\) each. Rahul buys 3 notebooks and 2 pens for ₹80.',
            steps: [
            { text: 'Identify variables and write equations from the word problem. Let cost of one notebook = ₹\\( x \\), cost of one pen.' },
            { text: 'Write both equations in standard form \\( a_1x + b_1y + c_1 = 0 \\) and \\( a_2x + b_2y + c_2 = 0 \\).' },
            { text: 'Compute the three ratios \\( \\frac{a_1}{a_2}, \\frac{b_1}{b_2}, \\frac{c_1}{c_2} \\).' },
            { text: 'Compare the ratios. Since \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} = \\frac{1}{2} \\), the condition for.' },
            { text: 'Express the general solution parametrically. From \\( 3x + 2y = 80 \\), solve for \\( x \\): \\( 3x = 80 - 2y \\) → \\(.', faded: true, blankAnswer: 'The system is dependent (coincident lines) with infinitely.' }
            ] } },
        { type: 'case', nodeId: 'c10_math_cbse_03_005', title: 'Substitution Method for Solving Pair of Linear Equations',
          caseStudy: { intro: 'Imagine you went to a stationery shop and bought 3 pens and 2 pencils for ₹40. Your friend bought 2 pens and 3 pencils for ₹45.',
            decisions: [{ prompt: 'What is the first step in the substitution method when solving the pair of equations: 2x + 3y = 12 and x - y = 1?', options: [
                { text: 'The first step is to solve one of the equations for one variable in terms of the other', outcome: 'The first step is to solve one of the equations for one variable in terms of the other.' },
                { text: 'substitute x = 0', outcome: 'Not quite — Students frequently make sign errors when substituting a negative expression, e.g., from x - 3y = 5.', reveals: 'students-frequently-make-sign-errors' },
                { text: 'add the equations', outcome: 'Not quite — Students frequently make sign errors when substituting a negative expression, e.g., from x - 3y = 5.', reveals: 'students-frequently-make-sign-errors' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c10_math_cbse_03_006', title: 'Elimination Method for Solving Pair of Linear Equations',
          scaffold: { problem: 'A stationery shop sells 4 pens and 3 pencils for ₹110. Another customer buys 2 pens and 5 pencils for ₹90.',
            steps: [
            { text: 'Let cost of one pen = ₹x, cost of one pencil = ₹y. Form equations: 4x + 3y = 110 ...(1) and 2x + 5y = 90 ...(2).' },
            { text: 'To eliminate x, make coefficients of x equal. LCM of 4 and 2 is 4.' },
            { text: 'Subtract equation (1) from equation (3) to eliminate x: (4x + 10y) - (4x + 3y) = 180 - 110 → 7y = 70.' },
            { text: 'Solve for y: y = 70/7 = 10. So one pencil costs ₹10.' },
            { text: 'Substitute y = 10 into equation (1): 4x + 3(10) = 110 → 4x + 30 = 110 → 4x = 80 → x = 20. So one pen costs ₹20.' },
            { text: 'Verify in equation (2): 2(20) + 5(10) = 40 + 50 = 90 ✓.', faded: true, blankAnswer: 'Cost of one pen = ₹20, cost of one pencil = ₹10.' }
            ] } },
        { type: 'drill', nodeId: 'c10_math_cbse_03_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c10_math_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Two siblings compare receipts from the same shop: one paid ₹65 for 5 pens and 3 pencils, the other paid ₹50 for 2 pens and 4 pencils. A cousin claims each item\'s price is \'obviously\' the total divided by the count — about ₹8 each.',
            decisions: [{ prompt: 'How do you actually recover the two prices?', options: [
                { text: 'Set up two equations — 5p + 3q = 65 and 2p + 4q = 50 — and solve them together: elimination gives p = 10 and q = 5, so a pen costs ₹10 and a pencil ₹5. Graphically, the two lines intersect at that single point, which is the only price pair satisfying both bills.', outcome: 'Two unknowns need two independent equations — the pair of receipts supplies exactly that, and the solution is the point both conditions share.' },
                { text: 'The cousin\'s method works — dividing each total by the number of items gives the price of each thing.', outcome: 'Dividing the total by item count mixes two different prices into one average; ₹8 each predicts a bill of ₹64 for 8 items yet the receipts disagree, showing the two prices differ.', reveals: 'divide-total-by-count' },
                { text: 'The prices cannot be found — one shop visit\'s totals are not enough information to separate two items.', outcome: 'Two different purchases give two equations in the same two unknowns, which is exactly enough to pin down both prices.', reveals: 'two-unknowns-unsolvable' }
            ] }] } },
        { type: 'case', nodeId: 'c10_math_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'Graphical, substitution, elimination — three ways to solve the same pair. You now pick the fastest one.',
            decisions: [{ prompt: 'What comes next? Pair of Linear Equations in Two Variables · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Pair of Linear Equations in Two Variables · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c10_math_cbse_03_001', difficulty: 'standard',
          question: 'A pair of linear equations in two variables is represented graphically by two.',
          hint: 'If stuck, revisit Class 9 node c9_math_ch2_5 (Graph of a Linear Equation in Two.',
          misconception: 'Students often think that if the coefficients of \\(x\\) and \\(y\\) are different numbers, the lines must intersect.',
          parts: [
                { id: 'a', prompt: 'What is the geometrical representation of the linear equation \\(2x + 3y = 12\\) on the Cartesian plane?', answer: 'The equation \\(2x + 3y = 12\\) represents a straight line',
                  options: ['The equation \\(2x + 3y = 12\\) represents a straight line', 'it represents a point', 'a curve'],
                  hint: 'If stuck, revisit Class 9 node c9_math_ch2_5 (Graph of a Linear Equation in Two Variables) and.',
                  misconception: 'Students often think that if the coefficients of \\(x\\) and \\(y\\) are different numbers, the lines must intersect.' },
                { id: 'b', prompt: 'Two lines are drawn on the same graph: Line A passes through (0,2) and (3,0). Line B passes through (0,4) and (6,0).', answer: 'Line A has equation \\(2x + 3y = 6\\) (intercepts 3 and 2)',
                  options: ['Line A has equation \\(2x + 3y = 6\\) (intercepts 3 and 2)', 'one solution', 'infinite solutions'],
                  hint: 'If stuck, revisit Class 9 node c9_math_ch2_5 (Graph of a Linear Equation in Two Variables) and.',
                  misconception: 'Students often think that if the coefficients of \\(x\\) and \\(y\\) are different numbers, the lines must intersect.' }
          ],
            remediations: { 'if-the-coefficients-of-x': { steps: ['If a student makes the ratio error, do this remediation: 1.', 'Write both equations in standard form \\(a_1x + b_1y + c_1 = 0\\) and \\(a_2x + b_2y + c_2 = 0\\).', 'Compute the three ratios \\(a_1/a_2, b_1/b_2, c_1/c_2\\) as fractions in simplest form.', 'Compare: if \\(a_1/a_2 = b_1/b_2 \\neq c_1/c_2\\) → parallel (no solution); if all three equal → coincident (infinite.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_002', difficulty: 'standard',
          question: 'A system of two linear equations in two variables is consistent if it has.',
          hint: 'Review graphing linear equations (c9_math_ch6_1) and practice identifying slopes from.',
          misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.',
          parts: [
                { id: 'a', prompt: 'Without graphing, determine whether the system 3x + 2y = 7 and 2x + 3y = 8 has a unique solution.', answer: 'Check: a₁/a₂ = 3/2 and b₁/b₂ = 2/3',
                  options: ['Check: a₁/a₂ = 3/2 and b₁/b₂ = 2/3', 'yes, because both equations have the same coefficients', 'consistent', 'unique solution'],
                  hint: 'Review graphing linear equations (c9_math_ch6_1) and practice identifying slopes from standard form.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' },
                { id: 'b', prompt: 'A system has a₁/a₂ = 5/3 and b₁/b₂ = 5/3. What can you conclude about the number of solutions?', answer: 'Since a₁/a₂ = b₁/b₂, the lines are either parallel (no solution) or coincident',
                  options: ['Since a₁/a₂ = b₁/b₂, the lines are either parallel (no solution) or coincident', 'unique solution', 'consistent', 'at least one solution'],
                  hint: 'Review graphing linear equations (c9_math_ch6_1) and practice identifying slopes from standard form.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' }
          ],
            remediations: { 'students-often-confuse-the-three': { steps: ['Draw three pairs of lines on graph paper: intersecting (different slopes), parallel (same slope, different intercepts).', 'Practice the ratio test with 10 systems, classifying each as unique, no solution, or infinitely many.', 'Emphasise the vocabulary: consistent = at least one solution (unique OR infinite); inconsistent = no solution.', 'For each system, verify the algebraic classification by actually solving or graphing.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.',
          parts: [
                { id: 'a', prompt: 'Why do two lines with different slopes always intersect at exactly one point?', answer: 'Two lines with different slopes are not parallel',
                  options: ['Two lines with different slopes are not parallel', 'they might not intersect if they are far apart', 'consistent', 'unique solution'],
                  hint: 'Review graphing linear equations (c9_math_ch6_1) and practice identifying slopes from standard form.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' },
                { id: 'b', prompt: 'Given the system x + 2y = 4 and 2x + 3y = 7, find the unique solution using substitution and verify it satisfies both equations.', answer: 'From the first equation: x = 4 − 2y',
                  options: ['From the first equation: x = 4 − 2y', 'consistent', 'unique solution', 'at least one solution'],
                  hint: 'Review graphing linear equations (c9_math_ch6_1) and practice identifying slopes from standard form.',
                  misconception: 'Students often confuse the three cases by only checking a₁/a₂ and forgetting b₁/b₂ and c₁/c₂.' }
          ],
            remediations: { 'students-often-confuse-the-three': { steps: ['Draw three pairs of lines on graph paper: intersecting (different slopes), parallel (same slope, different intercepts).', 'Practice the ratio test with 10 systems, classifying each as unique, no solution, or infinitely many.', 'Emphasise the vocabulary: consistent = at least one solution (unique OR infinite); inconsistent = no solution.', 'For each system, verify the algebraic classification by actually solving or graphing.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_003', difficulty: 'standard',
          question: 'A pair of linear equations in two variables is called an **inconsistent.',
          hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c10_math_cbse_03_001.',
          misconception: '**The "Two-Ratio Trap":** Students check only \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\) and immediately conclude "parallel.',
          parts: [
                { id: 'a', prompt: 'Determine whether the following pair of equations has a solution: \\(2x - 3y = 7\\) and \\(4x - 6y = 20\\). Show all steps using the ratio method.', answer: '**Step 1:** Write in standard form: \\(2x - 3y - 7 = 0\\) and \\(4x - 6y - 20 = 0\\)',
                  options: ['**Step 1:** Write in standard form: \\(2x - 3y - 7 = 0\\) and \\(4x - 6y - 20 = 0\\)', 'unique solution', 'infinitely many solutions'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c10_math_cbse_03_001 (graphical.',
                  misconception: '**The "Two-Ratio Trap":** Students check only \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\) and immediately conclude "parallel lines, no solution".' }
          ],
            remediations: { 'the-two-ratio-trap-students': { steps: ['Write standard form.', 'Write \\(\\frac{a_1}{a_2}\\), \\(\\frac{b_1}{b_2}\\), \\(\\frac{c_1}{c_2}\\).', 'Compare all three." 2. **Use a checklist table** on rough paper: | Ratio | Value | Equal to previous?'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_004', difficulty: 'standard',
          question: 'A pair of linear equations in two variables represents a **dependent system**.',
          hint: 'Revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_9.',
          misconception: '**Confusing "dependent" with "inconsistent" when \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\).** Students see equal ratios.',
          parts: [
                { id: 'a', prompt: 'State the algebraic condition for a pair of linear equations \\( a_1x + b_1y + c_1 = 0 \\) and \\( a_2x + b_2y + c_2 = 0 \\) to represent coincident lines.', answer: 'The condition is \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\)',
                  options: ['The condition is \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2} \\)', 'dependent', 'inconsistent', 'parallel lines → no solution'],
                  hint: 'Revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_9 (consistent/inconsistent.',
                  misconception: '**Confusing "dependent" with "inconsistent" when \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\).** Students see equal ratios of \\( x \\) and \\(.' },
                { id: 'b', prompt: 'Find the value of \\( k \\) for which the system \\( 2x + 3y = 7 \\) and \\( 4x + ky = 14 \\) has infinitely many solutions.', answer: 'For infinitely many solutions: \\( \\frac{2}{4} = \\frac{3}{k} = \\frac{-7}{-14} \\)',
                  options: ['For infinitely many solutions: \\( \\frac{2}{4} = \\frac{3}{k} = \\frac{-7}{-14} \\)', 'dependent', 'inconsistent', 'parallel lines → no solution'],
                  hint: 'Revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_9 (consistent/inconsistent.',
                  misconception: '**Confusing "dependent" with "inconsistent" when \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\).** Students see equal ratios of \\( x \\) and \\(.' },
                { id: 'c', prompt: 'Two students solve the system \\( x + 2y = 5 \\) and \\( 2x + 4y = 10 \\).', answer: 'Student A is correct',
                  options: ['Student A is correct', 'dependent', 'inconsistent', 'parallel lines → no solution'],
                  hint: 'Revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_9 (consistent/inconsistent.',
                  misconception: '**Confusing "dependent" with "inconsistent" when \\( \\frac{a_1}{a_2} = \\frac{b_1}{b_2} \\).** Students see equal ratios of \\( x \\) and \\(.' }
          ],
            remediations: { 'confusing-dependent-with-inconsistent-when': { steps: ['Make the student write the three ratios side-by-side: \\( \\frac{a_1}{a_2}, \\frac{b_1}{b_2}, \\frac{c_1}{c_2} \\).', 'Ask: "Are ALL THREE equal?" If yes → coincident (dependent). If first two equal but third different → parallel.', 'Use colour coding: write coefficients of first equation in blue, second in red.', 'Practice 5 problems where only the constant term differs (inconsistent) vs. all three ratios match (dependent).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_005', difficulty: 'standard',
          question: 'The substitution method is an algebraic technique for solving a pair of linear.',
          hint: 'Revisit solving linear equations in one variable (c8_math_ch13_8, c8_math_ch13_9) and.',
          misconception: 'Students frequently make sign errors when substituting a negative expression, e.g., from x - 3y = 5 they write x = 5.',
          parts: [
                { id: 'a', prompt: 'In the substitution method, after obtaining x = 5 - 2y from the first equation, why must we substitute this expression into the SECOND equation and not back.', answer: 'Substituting back into the same equation gives an identity (0 = 0)',
                  options: ['Substituting back into the same equation gives an identity (0 = 0)', 'we can substitute into either'],
                  hint: 'Revisit solving linear equations in one variable (c8_math_ch13_8, c8_math_ch13_9) and substitution.',
                  misconception: 'Students frequently make sign errors when substituting a negative expression, e.g., from x - 3y = 5 they write x = 5 - 3y (incorrect.' }
          ],
            remediations: { 'students-frequently-make-sign-errors': { steps: ['If a student makes sign errors: 1) Always isolate the variable step-by-step on a separate line, showing the additive.', '2) Put the substituted expression in parentheses: 2(5 + 3y) + y = 10.', '3) After finding the first variable, circle it and write "Now find x using x = 5 + 3y" to force back-substitution.', '4) Finally, verify in BOTH original equations.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c10_math_cbse_03_006', difficulty: 'standard',
          question: 'The elimination method is an algebraic technique for solving a pair of linear.',
          hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch05_057 (solving.',
          misconception: 'Students often forget to multiply the **entire** equation (including the constant term) by the chosen multiplier.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The elimination method is an algebraic technique for solving a pair of linear equations',
                  options: ['The elimination method is an algebraic technique for solving a pair of linear equations', 'A pair of linear equations in two variables is represented graphically by two straight', 'A system of two linear equations in two variables is consistent if it has at least one', 'A pair of linear equations in two variables is called an **inconsistent system** if the'],
                  hint: 'If stuck, revisit c8_math_ch6_1 (distributive property) and c6_math_ch05_057 (solving linear.',
                  misconception: 'Students often forget to multiply the **entire** equation (including the constant term) by the chosen multiplier.' }
          ],
            remediations: { 'students-often-forget-to-multiply': { steps: ['If a student makes this error, have them practice the "distributive property" step explicitly: write the multiplier.', 'Use colour-coding: highlight the constant term in one colour and the multiplier in another, then show the.', 'Give 5 practice problems where the constant term is not 1, and require them to write the multiplication step separately.', 'Remind them: "Whatever you do to the left side, you must do to the right side."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
