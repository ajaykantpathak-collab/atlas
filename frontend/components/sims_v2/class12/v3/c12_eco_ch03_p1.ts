import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch03_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch03_p1: SimDef = {
    id: 'v3_c12_eco_ch03_p1',
    title: 'Production and Costs · Part 1/2',
    subtitle: 'Hiring cooks tonight vs buying ovens next quarter — the run that matters isn\'t on the calendar',
    classLevel: 12, subject: 'economics', topic: 'Production and Costs · Part 1/2',
    chapters: ['c12_eco_ch03'],
    nodeIds: ['c12_eco_cbse_03_001', 'c12_eco_cbse_03_002', 'c12_eco_cbse_03_003', 'c12_eco_cbse_03_004', 'c12_eco_cbse_03_005', 'c12_eco_cbse_03_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Production manager', intro: 'Every firm is trapped by what it can\'t change quickly. That constraint — not the clock — defines its economics.', goal: 'Distinguish short run from long run by factor fixity and connect the production function to product curves and costs.' },
    discovery: {
        question: 'A startup in a co-working space boasts: \'We can change our office monthly — we\'re a long-run firm from day one.\' What kills the claim?',
        options: ['Long run needs ALL inputs variable — its licensed software, key hires and equipment can\'t be adjusted overnight', 'True — flexible rent means flexible everything', 'Long run just means surviving one year', 'Startups are always in the short run forever'],
        answer: 'Long run needs ALL inputs variable — its licensed software, key hires and equipment can\'t be adjusted overnight',
        hook: 'Short run and long run aren\'t calendar time — they\'re about factor fixity. A firm that can rebuild its factory in three months hits the long run fast; one waiting five years for clearance stays in the short run that whole time. Fixed factor ≠ fixed cost, either.',
    },
    teaching: [
        { title: 'Production Function: Short Run and Long Run Distinction', text: 'A production function shows the maximum quantity of output a firm can produce from given combinations of inputs (factors of production) using the best available technology.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_03_001', title: 'Your mission',
          mission: { widget: 'flow', validate: 'flow:stage=80',
            instruction: 'On the lab: walk the process to the final stage — what order did it take?.',
        context: 'Run a Tirupur garment unit: decide what changes today (tailors, shifts) versus next year (machines, premises), compute output from Q = f(L, K), then chase TP, AP and MP through the law of variable proportions to the cost curves they cast.',
        labels: ['Production Function: Short Run', 'Total Product, Marginal Product', 'Law of Variable Proportions', 'Returns to Scale: Constant,', 'Cost Concepts: Fixed, Variable,', 'Relationship Between AC'],
            observePrompt: 'What did the flow interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_001', title: 'Production Function: Short Run and Long Run Distinction',
          scaffold: { problem: 'A wheat farm in Haryana has 20 hectares of land (fixed) and uses labour (variable) to harvest.',
            steps: [
            { text: 'Identify the short-run production function with fixed land: K̅ = 20 hectares. The function is Q = 5√L × √20.' },
            { text: 'Simplify the constant: √20 = 2√5 ≈ 4.472. So Q = 5 × 4.472 × √L = 22.36 √L.' },
            { text: 'Substitute L = 100 labour-days: Q = 22.36 × √100 = 22.36 × 10 = 223.6 quintals.' },
            { text: 'For the next season, land becomes variable (long run): new K = 25 hectares. The long-run function is Q = 5√L × √K.' },
            { text: 'With same L = 100, new Q = 5 × √100 × √25 = 5 × 10 × 5 = 250 quintals.', faded: true, blankAnswer: 'Short-run max output = 223.6 quintals; Long-run output with.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_002', title: 'Total Product, Marginal Product and Average Product: Relationship',
          scaffold: { problem: 'A farm in Haryana produces wheat using fixed land of 5 hectares and variable labour.',
            steps: [
            { text: 'Compute MP = TP(L) - TP(L-1) for L=1 to 8.' },
            { text: 'Compute AP = TP/L for L=1 to 8.' },
            { text: 'Identify where MP > 0 and rising (Stage I), MP > 0 but falling (Stage II), MP < 0 (Stage III).' },
            { text: 'Locate where MP = AP (maximum AP) and where MP = 0 (maximum TP).' },
            { text: 'Interpret economically: Stage I — increasing returns to labour; Stage II — diminishing but positive returns (rational.', faded: true, blankAnswer: 'MP: 8, 12, 16, 12, 7, 3, 0, -2. AP: 8, 10, 12, 12, 11.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_003', title: 'Law of Variable Proportions: Three Stages of Production',
          scaffold: { problem: 'A farmer in Haryana has 5 acres of land (fixed). The total product of wheat (in quintals) for different units of labor is: L=1: 10, L=2.',
            steps: [
            { text: 'Calculate MP for each additional worker: MP = TP_L - TP_{L-1}. MP1=10, MP2=14, MP3=12, MP4=8, MP5=4, MP6=0, MP7=-3.' },
            { text: 'Calculate AP = TP/L: AP1=10, AP2=12, AP3=12, AP4=11, AP5=9.6, AP6=8, AP7≈6.43.' },
            { text: 'Identify Stage I: MP rising and MP > AP. Here MP rises from 10 to 14 (L=1 to 2), then falls at L=3 (MP=12).' },
            { text: 'Identify Stage II: MP positive but falling, MP < AP. From L=4 to L=6: MP=8,4,0 (positive until L=6 where MP=0).' },
            { text: 'Identify Stage III: MP negative. L=7 gives MP=-3. So Stage III: L ≥ 7.' },
            { text: 'Rational producer operates in Stage II (L=4 to 6) because MP positive but diminishing, and fixed land is efficiently.', faded: true, blankAnswer: 'Stage I: 1-3 workers; Stage II: 4-6 workers; Stage III: 7.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_004', title: 'Returns to Scale: Constant, Increasing and Diminishing Returns',
          scaffold: { problem: 'A small automobile components manufacturer in Pune has the production function Q = 20L^0.4 K^0.5.',
            steps: [
            { text: 'Identify the production function type — Cobb-Douglas Q = A L^α K^β with A = 20, α = 0.4, β = 0.5.' },
            { text: 'Compute the sum of exponents: α + β = 0.4 + 0.5 = 0.9. Since 0.9 < 1, the function exhibits decreasing returns to scale.' },
            { text: 'Verify using the scaling property: f(tL, tK) = 20(tL)^0.4 (tK)^0.5 = 20 t^0.4 L^0.4 t^0.5 K^0.5 = t^0.9 · 20 L^0.4.' },
            { text: 'For t = 1.5, the output multiplier is t^0.9 = 1.5^0.9. Calculate: ln(1.5^0.9) = 0.9 × ln(1.5) ≈ 0.9 × 0.4055 = 0.3649.' },
            { text: 'Current output Q₀ = 20 × 100^0.4 × 50^0.5. 100^0.4 = (10^2)^0.4 = 10^0.8 ≈ 6.31. 50^0.5 = √50 ≈ 7.07.' },
            { text: 'New output Q₁ = Q₀ × 1.440 ≈ 892 × 1.440 ≈ 1284 units. Percentage increase = (1284 - 892)/892 × 100% ≈ 44.0%.' },
            { text: 'Compare with input increase of 50%. Since 44% < 50%, output increases less than proportionally — confirming DRS.' },
            { text: 'Economic interpretation: The firm faces coordination challenges or diminishing marginal productivity of management.', faded: true, blankAnswer: 'Decreasing returns to scale (α+β = 0.9 < 1). Output.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_005', title: 'Cost Concepts: Fixed, Variable, Total, Average and Marginal Cost',
          scaffold: { problem: '** A small bakery in Mumbai has monthly fixed costs: rent ₹15,000, insurance ₹3,000, equipment lease ₹2,000.',
            steps: [
            { text: 'Identify TFC = 15,000 + 3,000 + 2,000 = ₹20,000 (constant for all Q).' },
            { text: 'Variable cost per cake = 40 + 20 + 60 + 30 = ₹150. So TVC = 150Q.' },
            { text: 'TC = TFC + TVC = 20,000 + 150Q.' },
            { text: 'Compute for each Q:' },
            { text: 'Interpret: Because variable cost per unit is constant, MC = AVC = constant ₹150.', faded: true, blankAnswer: '** See table above. MC = ₹150 per cake at all output levels.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_03_006', title: 'Relationship Between AC and MC Curves',
          scaffold: { problem: 'A firm\'s Total Cost function is TC = 200 + 12Q + 0.5Q². Find the output level where AC is minimum. Show all steps using calculus.',
            steps: [
            { text: 'Write AC = TC/Q = 200/Q + 12 + 0.5Q.' },
            { text: 'Write MC = dTC/dQ = 12 + Q.' },
            { text: 'Set MC = AC for minimum AC: 12 + Q = 200/Q + 12 + 0.5Q.' },
            { text: 'Simplify: Q = 200/Q + 0.5Q → 0.5Q = 200/Q → 0.5Q² = 200 → Q² = 400 → Q = 20 (positive root).' },
            { text: 'Verify second-order condition: d(MC)/dQ = 1; d(AC)/dQ at Q=20: derivative of (200/Q + 12 + 0.5Q) is -200/Q² + 0.5.', faded: true, blankAnswer: 'AC is minimum at Q = 20 units. At this output, AC = MC = 12.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_03_001', title: 'Use it in the wild',
          caseStudy: { intro: 'A cloud kitchen with two ovens and hired chefs has run for two years. The owner declares \'we\'re in the long run now — it\'s been over a year\' while deciding whether to hire more chefs or lease a bigger kitchen.',
            decisions: [{ prompt: 'Is \'two years\' the right test for the long run?', options: [
                { text: 'No — run is defined by input fixity, not the calendar: hiring chefs is short-run (ovens fixed); leasing a bigger kitchen makes capital variable and is the long-run decision, whenever it happens.', outcome: 'A firm could reach its \'long run\' in three months or stay in the short run for five years — what matters is whether the fixed factor can finally be changed.' },
                { text: 'Yes — short run means under a year, long run means over a year, and two years clears the bar.', outcome: 'Calendar time isn\'t the criterion; if ovens still can\'t be added, every hiring decision remains short-run no matter how many years pass.', reveals: 'run-is-calendar-time' },
                { text: 'Yes — a lean startup with rented space has no fixed factors, so it\'s always long-run anyway.', outcome: 'Flexible space doesn\'t free everything: equipment, licences and key contracts can stay fixed — the long run needs ALL inputs variable.', reveals: 'no-fixed-factors-claim' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_03_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now separate \'more workers tonight\' from \'a bigger plant next year\' — and predict exactly how output and costs bend with each. Production theory is where micro gets mathematical.',
            decisions: [{ prompt: 'What comes next? Production and Costs · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Production and Costs · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'flow', prompt: 'Explore the flow interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'flow', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_001', difficulty: 'standard',
          question: 'A production function shows the maximum quantity of output a firm can produce.',
          hint: 'Revisit c9_eco_ch1_7 (factors of production) and c11_math_cbse_02_005 (functions).',
          misconception: 'Students often equate short run with "less than one year" and long run with "more than one year".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A production function shows the maximum quantity of output a firm can produce from given',
                  options: ['A production function shows the maximum quantity of output a firm can produce from given', 'Total Product (TP) is the total output produced by a firm using a given quantity of', 'The Law of Variable Proportions states that in the short run, when one factor of', 'Returns to scale describes the long-run relationship between a proportional change in all'],
                  hint: 'Revisit c9_eco_ch1_7 (factors of production) and c11_math_cbse_02_005 (functions) to clarify inputs.',
                  misconception: 'Students often equate short run with "less than one year" and long run with "more than one year". This calendar-time definition is wrong.' }
          ],
            remediations: { 'students-often-equate-short-run': { steps: ['If a student confuses calendar time with factor fixity: (1) Draw a timeline for a specific firm (e.g., a sugar mill.', '(2) Ask: "On Day 1, which inputs are fixed?', 'On Day 365?" (3) Have them redefine short/long run for that firm based on the **last input to become variable**.', '(4) Re-test with Diagnostic Question 2 using a new scenario (e.g., a kirana store adding a refrigerator vs.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_002', difficulty: 'standard',
          question: 'Total Product (TP) is the total output produced by a firm using a given.',
          hint: 'If stuck, review the short-run production function (c12_eco_cbse_03_001) and the.',
          misconception: 'Students often believe that when MP is negative, TP becomes negative.',
          parts: [
                { id: 'a', prompt: 'Given the TP schedule below, compute MP and AP for each level of labour. Identify where AP is maximum.', answer: 'Step 1: MP at L=1 = 10-0 = 10',
                  options: ['Step 1: MP at L=1 = 10-0 = 10', 'when MP is negative, TP becomes negative'],
                  hint: 'If stuck, review the short-run production function (c12_eco_cbse_03_001) and the.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' },
                { id: 'b', prompt: 'A firm’s TP curve is given by TP = 20L + 6L² - 0.5L³. Derive the MP and AP functions. At what labour level does AP reach its maximum?', answer: 'MP = d(TP)/dL = 20 + 12L - 1.5L²',
                  options: ['MP = d(TP)/dL = 20 + 12L - 1.5L²', 'when MP is negative, TP becomes negative'],
                  hint: 'If stuck, review the short-run production function (c12_eco_cbse_03_001) and the.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' }
          ],
            remediations: { 'when-mp-is-negative': { steps: ['If a student confuses the MP-AP intersection, have them: (1) Revisit the average-marginal analogy using a simple.', '(2) Re-plot TP, MP, AP from a numerical schedule (like Diagnostic Q3) on graph paper, drawing rays from origin to.', '(3) Practice deriving MP and AP from a cubic TP function (Diagnostic Q4) using calculus.', '(4) Re-read the NCERT section “Total Product, Average Product and Marginal Product” (Chapter 3, pages 36-38) focusing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that when MP is negative, TP becomes negative.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: “If marginal product is falling, average product must also be falling.” Provide a counterexample using a TP schedule.', answer: 'The statement is false',
                  options: ['The statement is false', 'when MP is negative, TP becomes negative'],
                  hint: 'If stuck, review the short-run production function (c12_eco_cbse_03_001) and the.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' },
                { id: 'b', prompt: 'Construct a hypothetical TP schedule for 5 units of labour that exhibits: (a) increasing MP for first two units, (b) diminishing but positive MP for next two.', answer: 'Example: L=0 TP=0',
                  options: ['Example: L=0 TP=0', 'when MP is negative, TP becomes negative'],
                  hint: 'If stuck, review the short-run production function (c12_eco_cbse_03_001) and the.',
                  misconception: 'Students often believe that when MP is negative, TP becomes negative.' }
          ],
            remediations: { 'when-mp-is-negative': { steps: ['If a student confuses the MP-AP intersection, have them: (1) Revisit the average-marginal analogy using a simple.', '(2) Re-plot TP, MP, AP from a numerical schedule (like Diagnostic Q3) on graph paper, drawing rays from origin to.', '(3) Practice deriving MP and AP from a cubic TP function (Diagnostic Q4) using calculus.', '(4) Re-read the NCERT section “Total Product, Average Product and Marginal Product” (Chapter 3, pages 36-38) focusing.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_003', difficulty: 'standard',
          question: 'The Law of Variable Proportions states that in the short run, when one factor.',
          hint: 'Review node c12_eco_cbse_03_002 and practice calculating MP and AP from TP data; then.',
          misconception: 'Students often think the Law of Variable Proportions implies that total output eventually decreases from the very first.',
          parts: [
                { id: 'a', prompt: 'Why does a rational producer never operate in Stage I or Stage III of production? Explain using the concepts of Marginal Product and Average Product.', answer: 'In Stage I, MP > AP and AP is rising, meaning fixed capital is underutilized',
                  options: ['In Stage I, MP > AP and AP is rising, meaning fixed capital is underutilized', 'producer operates where MP is maximum', 'diminishing returns', 'decreasing returns to scale'],
                  hint: 'Review node c12_eco_cbse_03_002 and practice calculating MP and AP from TP data; then draw the.',
                  misconception: 'Students often think the Law of Variable Proportions implies that total output eventually decreases from the very first unit of variable.' },
                { id: 'b', prompt: 'Given the production function Q = 12L + 3L^2 - 0.2L^3 (where Q is total product and L is labor), find the range of labor for Stage II (diminishing but positive.', answer: 'First, find MP = dQ/dL = 12 + 6L - 0.6L^2',
                  options: ['First, find MP = dQ/dL = 12 + 6L - 0.6L^2', 'diminishing returns', 'decreasing returns to scale'],
                  hint: 'Review node c12_eco_cbse_03_002 and practice calculating MP and AP from TP data; then draw the.',
                  misconception: 'Students often think the Law of Variable Proportions implies that total output eventually decreases from the very first unit of variable.' }
          ],
            remediations: { 'the-law-of-variable-proportions': { steps: ['If a student cannot distinguish the stages, have them revisit node c12_eco_cbse_03_002 (TP, MP, AP) and practice.', 'Then draw the TP, MP, AP curves on graph paper, labeling the three stages.', 'Use the numerical example from Worked Example 1 to verify boundaries.', 'Re-diagnose with Diagnostic Question 3.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_004', difficulty: 'standard',
          question: 'Returns to scale describes the long-run relationship between a proportional.',
          hint: 'If stuck on the math, revisit Class 11 Mathematics: "Derivatives of Polynomial Functions".',
          misconception: 'Students conflate "returns to scale" (long run, all inputs variable) with "law of variable proportions" (short run, one.',
          parts: [
                { id: 'a', prompt: 'State the formal condition for constant returns to scale (CRS) for a production function Q = f(L, K) when all inputs are scaled by factor t > 0.', answer: 'Correct answer: f(tL, tK) = t·f(L, K) for all t > 0',
                  options: ['Correct answer: f(tL, tK) = t·f(L, K) for all t > 0', 'output doubles when inputs double'],
                  hint: 'If stuck on the math, revisit Class 11 Mathematics: "Derivatives of Polynomial Functions".',
                  misconception: 'Students conflate "returns to scale" (long run, all inputs variable) with "law of variable proportions" (short run, one input variable).' },
                { id: 'b', prompt: 'A firm\'s production function is Q = 5L^0.6 K^0.3. Without calculating the exact output, explain whether this firm experiences increasing, constant,.', answer: 'Correct answer: Sum of exponents = 0.6 + 0.3 = 0.9 < 1, so DRS',
                  options: ['Correct answer: Sum of exponents = 0.6 + 0.3 = 0.9 < 1, so DRS', 'IRS because both exponents are positive'],
                  hint: 'If stuck on the math, revisit Class 11 Mathematics: "Derivatives of Polynomial Functions".',
                  misconception: 'Students conflate "returns to scale" (long run, all inputs variable) with "law of variable proportions" (short run, one input variable).' }
          ],
            remediations: { 'students-conflate-returns-to-scale': { steps: ['If the student confuses returns to scale with law of variable proportions: (1) Revisit c12_eco_cbse_03_001 (Production.', '(2) Revisit c12_eco_cbse_03_003 (Law of Variable Proportions) and explicitly label each stage as a short-run phenomenon.', '(3) Re-do Diagnostic Question 3 but with a short-run constraint (K fixed) and compare results.', '(4) Take a Cobb-Douglas Q = L^0.5 K^0.5 (CRS) and show that MP_L diminishes as L increases with K fixed — proving CRS ≠.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_005', difficulty: 'standard',
          question: 'In the short run, **Total Fixed Cost (TFC)** is the cost of fixed inputs (e.g.',
          hint: 'If stuck, review **c12_eco_cbse_03_003** (Law of Variable Proportions) to see how.',
          misconception: '**Misconception:** "Marginal Cost is the cost of producing the *last* unit." **Why it’s wrong:** MC is the cost.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'In the short run, **Total Fixed Cost (TFC)** is the cost of fixed inputs (e.g., rent,',
                  options: ['In the short run, **Total Fixed Cost (TFC)** is the cost of fixed inputs (e.g., rent,', 'A production function shows the maximum quantity of output a firm can produce from given', 'Total Product (TP) is the total output produced by a firm using a given quantity of', 'The Law of Variable Proportions states that in the short run, when one factor of'],
                  hint: 'If stuck, review **c12_eco_cbse_03_003** (Law of Variable Proportions) to see how MP behaves, then.',
                  misconception: '**Misconception:** "Marginal Cost is the cost of producing the *last* unit." **Why it’s wrong:** MC is the cost of producing the *next*.' }
          ],
            remediations: { 'misconception-marginal-cost-is-the': { steps: ['Revisit **c12_eco_cbse_03_001** (Production Function) to recall fixed vs.', 'Revisit **c12_eco_cbse_03_003** (Law of Variable Proportions) to see how MP rises then falls.', '**Re-diagnostic:** Given a production schedule (L vs TP), with wage = ₹100 and TFC = ₹500, compute TVC, TC, MC at each.', 'Check if MC falls when MP rises and rises when MP falls.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_03_006', difficulty: 'standard',
          question: 'The relationship between Average Cost (AC) and Marginal Cost (MC) curves states.',
          hint: 'If stuck, revisit the AP-MP relationship in node c12_eco_cbse_03_002 — it.',
          misconception: 'Students often believe that because both AC and MC are U-shaped, MC cuts AC at its minimum simply because "two U-curves.',
          parts: [
                { id: 'a', prompt: 'Define Marginal Cost (MC) and Average Cost (AC) in the short run, and state the exact mathematical condition when MC intersects AC.', answer: 'MC = ΔTC/ΔQ (change in total cost from one extra unit)',
                  options: ['MC = ΔTC/ΔQ (change in total cost from one extra unit)', 'MC intersects AC at maximum AC', 'MC = AC at zero output', 'two U-curves intersect at the bottom'],
                  hint: 'If stuck, revisit the AP-MP relationship in node c12_eco_cbse_03_002 — it is mathematically.',
                  misconception: 'Students often believe that because both AC and MC are U-shaped, MC cuts AC at its minimum simply because "two U-curves intersect at the.' },
                { id: 'b', prompt: 'A firm\'s Total Cost function is TC = 100 + 10Q + Q². Calculate AC and MC at Q = 5 and Q = 10. Determine whether AC is rising or falling at each output.', answer: 'At Q=5: TC=100+50+25=175',
                  options: ['At Q=5: TC=100+50+25=175', 'two U-curves intersect at the bottom'],
                  hint: 'If stuck, revisit the AP-MP relationship in node c12_eco_cbse_03_002 — it is mathematically.',
                  misconception: 'Students often believe that because both AC and MC are U-shaped, MC cuts AC at its minimum simply because "two U-curves intersect at the.' }
          ],
            remediations: { 'because-both-ac-and-mc': { steps: ['Revisit node c12_eco_cbse_03_005 (Cost Concepts) to recompute TC, AC, MC from a given TC schedule (e.g., TC = 200 + 20Q.', 'Plot AC and MC on graph paper; physically mark where MC < AC (AC falling) and MC > AC (AC rising).', 'Re-derive the algebraic proof: d(AC)/dQ = (MC - AC)/Q.', 'Set d(AC)/dQ = 0 → MC = AC.'], labTask: { instruction: 'On the interactive: walk the process to the final stage — what order did it take? — then check.', widget: 'flow', validate: 'flow:stage=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
