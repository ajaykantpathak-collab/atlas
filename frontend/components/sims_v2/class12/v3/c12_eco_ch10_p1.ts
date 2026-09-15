import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch10_p1: SimDef = {
    id: 'v3_c12_eco_ch10_p1',
    title: 'Income Determination · Part 1/2',
    subtitle: 'Buying shares isn\'t investment — the letter that fools everyone',
    classLevel: 12, subject: 'economics', topic: 'Income Determination · Part 1/2',
    chapters: ['c12_eco_ch10'],
    nodeIds: ['c12_eco_cbse_10_001', 'c12_eco_cbse_10_002', 'c12_eco_cbse_10_003', 'c12_eco_cbse_10_004', 'c12_eco_cbse_10_005', 'c12_eco_cbse_10_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Macro forecaster', intro: 'Will the economy grow or shrink? Add up every planned rupee of spending and the answer appears — that\'s aggregate demand.', goal: 'Decompose aggregate demand into C + I + G + NX and explain planned versus actual expenditure.' },
    discovery: {
        question: 'A household buys ₹10 lakh of Reliance shares and announces \'our family\'s investment just boosted India\'s I.\' Did aggregate demand just move?',
        options: ['No — buying shares is a transfer of ownership, not capital formation; I counts only new physical capital like machinery and buildings', 'Yes — all investment is investment', 'Yes — but only if shares rise', 'No — households can\'t invest, only government can'],
        answer: 'No — buying shares is a transfer of ownership, not capital formation; I counts only new physical capital like machinery and buildings',
        hook: 'AD = C + I + G + (X − M) — and imports SUBTRACT because that spending leaks abroad. Two traps dominate: calling financial assets \'investment\' (they\'re just swaps), and adding M instead of subtracting. Sort each rupee into the right letter and the model behaves.',
    },
    teaching: [
        { title: 'Aggregate Demand and Its Components (C, I, G, NX)', text: 'Aggregate Demand (AD) is the total planned expenditure on final goods and services in an economy during a given period, comprising four components: Consumption (C) by households, Investment (I).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_10_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Budget-day economics: classify apartments, cranes and Italian marble into C, I, G, X or M, compute AD, then unleash the multiplier to show how one spending shock multiplies into income determination.',
        labels: ['Aggregate Demand and Its', 'Consumption Function and Marginal', 'Saving Function and Marginal', 'Relationship Between MPC', 'Autonomous and Induced Investment', 'Ex-Ante and Ex-Post: Planned'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_001', title: 'Aggregate Demand and Its Components (C, I, G, NX)',
          scaffold: { problem: 'In 2023-24, India\'s nominal GDP (expenditure approach) was ₹295 lakh crore.',
            steps: [
            { text: 'Recall the expenditure identity: GDP = PFCE + GFCF + GFCE + (X − M) + Change in Stocks + Valuables + Discrepancy.' },
            { text: 'Plug in given values: GDP = 175 + (85 + 5 + 3) + 35 + (45 − 60) + (-8) = 175 + 93 + 35 − 15 − 8 = 280.' },
            { text: 'Compute Net Exports: NX = X − M = 45 − 60 = −15 lakh crore (trade deficit).' },
            { text: 'Apply revisions: New PFCE = 177, New M = 59. New NX = 45 − 59 = −14. New AD = 177 + 93 + 35 + (-14) = 291 lakh crore.' },
            { text: 'Revised GDP (assuming discrepancy adjusts) = 291 + Discrepancy. If discrepancy remains -8, GDP = 283.', faded: true, blankAnswer: 'Original AD = ₹288 lakh crore; NX = −₹15 lakh crore.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_002', title: 'Consumption Function and Marginal Propensity to Consume',
          scaffold: { problem: 'In an economy, consumption expenditure is ₹120 crore when income is ₹200 crore, and ₹180 crore when income is ₹300 crore.',
            steps: [
            { text: 'Identify given data points: (Y₁, C₁) = (200, 120) and (Y₂, C₂) = (300, 180). All values in ₹ crore.' },
            { text: 'Calculate MPC = ΔC/ΔY = (180 - 120)/(300 - 200) = 60/100 = 0.6.' },
            { text: 'Use C = C̅ + cY with one point to find C̅: 120 = C̅ + 0.6(200) → C̅ = 120 - 120 = 0. So C = 0.6Y.' },
            { text: 'Calculate APC: At Y=200, APC = 120/200 = 0.6. At Y=300, APC = 180/300 = 0.6. Since C̅ = 0, APC = MPC at all levels.' },
            { text: 'Interpret: This economy has no autonomous consumption — consumption is purely induced.', faded: true, blankAnswer: 'C = 0.6Y, MPC = 0.6, C̅ = 0, APC = 0.6 at both income.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_003', title: 'Saving Function and Marginal Propensity to Save',
          scaffold: { problem: 'In an economy, the consumption function is given as C = 500 + 0.8Y. Derive the saving function.',
            steps: [
            { text: 'Recall the identity Y = C + S, so S = Y - C. Substitute the given consumption function: S = Y - (500 + 0.8Y).' },
            { text: 'Simplify algebraically: S = Y - 500 - 0.8Y = -500 + 0.2Y. This is the saving function.' },
            { text: 'Calculate for each income level:' },
            { text: 'Find break-even income where S=0: 0 = -500 + 0.2Y → 0.2Y = 500 → Y = 2500. At Y=2500, C=Y, saving is zero.' },
            { text: 'Interpret: Below Y=2500, economy dissaves (consumes past income or borrows). Above Y=2500, positive saving.', faded: true, blankAnswer: 'Saving function: S = -500 + 0.2Y. MPS = 0.2. At Y=2000.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_004', title: 'Relationship Between MPC and MPS',
          scaffold: { problem: 'In a hypothetical Indian village economy, the following data is observed over two years:',
            steps: [
            { text: 'Calculate change in income: ΔY = Y₂ - Y₁ = 60,000 - 50,000 = ₹10,000 crore.' },
            { text: 'Calculate change in consumption: ΔC = C₂ - C₁ = 47,000 - 40,000 = ₹7,000 crore.' },
            { text: 'Compute MPC = ΔC/ΔY = 7,000 / 10,000 = 0.7.' },
            { text: 'Compute MPS using the identity: MPS = 1 - MPC = 1 - 0.7 = 0.3.' },
            { text: 'Verify by calculating saving directly: S₁ = Y₁ - C₁ = 10,000, S₂ = Y₂ - C₂ = 13,000, ΔS = 3,000, MPS = ΔS/ΔY.' },
            { text: 'Compute investment multiplier k = 1/MPS = 1/0.3 = 3.33 (or 10/3).', faded: true, blankAnswer: 'MPC = 0.7, MPS = 0.3, MPC + MPS = 1, k = 3.33 (or 10/3).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_005', title: 'Autonomous and Induced Investment',
          scaffold: { problem: 'The Government of India announces a Production Linked Incentive (PLI) scheme for semiconductor manufacturing.',
            steps: [
            { text: 'Identify the exogenous policy-driven investment — the PLI scheme commitment of ₹50,000 crore is autonomous because.' },
            { text: 'The investment function before the scheme was I = Iₐ₀ + 0.12Y. After the scheme, it becomes I = (Iₐ₀ + 50,000) + 0.12Y.' },
            { text: 'Induced investment at Y = 200 lakh crore = MPI × Y = 0.12 × 200,00,000 = 24,00,000 crore (₹24 lakh crore).' },
            { text: 'Total investment after scheme = New Iₐ + Induced = (Iₐ₀ + 50,000) + 24,00,000 crore.' },
            { text: 'The AD curve shifts vertically upward by exactly ΔIₐ = ₹50,000 crore at every income level because autonomous.', faded: true, blankAnswer: '(a) New Iₐ = Original Iₐ₀ + ₹50,000 crore; (b) Induced.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_10_006', title: 'Ex-Ante and Ex-Post: Planned vs Realised Values',
          scaffold: { problem: 'In a two-sector economy, the consumption function is C = 50 + 0.75Y and autonomous investment is I = 300.',
            steps: [
            { text: 'Write ex-ante AD = C + I = (50 + 0.75Y) + 300 = 350 + 0.75Y.' },
            { text: 'Set ex-ante AD = Y for equilibrium: Y = 350 + 0.75Y → 0.25Y = 350 → Y* = 1400.' },
            { text: 'At Y* = 1400, ex-ante C = 50 + 0.75(1400) = 1100. Ex-ante S = Y - C = 1400 - 1100 = 300. Ex-ante I = 300.' },
            { text: 'At actual Y = 1600 (disequilibrium): Ex-ante C = 50 + 0.75(1600) = 1250. Ex-ante AD = 1250 + 300 = 1550.' },
            { text: 'Unplanned inventory change = Ex-post I - Ex-ante I = Ex-post S - Ex-ante I = 350 - 300 = +50 (accumulation).', faded: true, blankAnswer: '(a) AD = 350 + 0.75Y; (b) Y* = 1400; (c) Ex-ante.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_10_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Estimating aggregate demand for a class project, a student logs a family buying ₹10 lakh of shares under \'I — investment\', arguing \'investing is literally what we did\'.',
            decisions: [{ prompt: 'Does that purchase raise AD through I?', options: [
                { text: 'No — I in AD is physical capital formation (machines, buildings, inventories); buying existing shares just changes ownership of a financial asset and produces nothing.', outcome: 'Macro \'investment\' means new capital goods, not financial investing — share purchases are swaps inside the economy, no new output demanded.' },
                { text: 'Yes — \'investment\' is the word for buying shares, so it slots straight into I.', outcome: 'Everyday \'investment\' and the national-accounts I are different things; only expenditure creating real capital counts.', reveals: 'shares-are-macro-investment' },
                { text: 'Either way, the family\'s imports paid for the trade fees, which adds to AD as well.', outcome: 'Imports are a leakage — M is subtracted in AD = C + I + G + (X − M), never added.', reveals: 'imports-add-to-ad' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_10_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now read any transaction and place it in the AD identity — and explain why imports leak out. Income determination and the multiplier sit on exactly this foundation.',
            decisions: [{ prompt: 'What comes next? Income Determination · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Income Determination · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_001', difficulty: 'standard',
          question: 'Aggregate Demand (AD) is the total planned expenditure on final goods and.',
          hint: 'If stuck on classifying expenditures, revisit c10_eco_cbse_02_003 (GDP expenditure.',
          misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical.',
          parts: [
                { id: 'a', prompt: 'Compare two economies: Economy A has AD = C + I + G (closed), Economy B has AD = C + I + G + (X − M) (open). Suppose both have identical C, I, G.', answer: 'Economy B\'s AD curve shifts upward by ₹500 crore at every income level',
                  options: ['Economy B\'s AD curve shifts upward by ₹500 crore at every income level', 'both shift because income rises'],
                  hint: 'If stuck on classifying expenditures, revisit c10_eco_cbse_02_003 (GDP expenditure components) and.',
                  misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical capital formation.' }
          ],
            remediations: { 'students-often-treat-investment-i': { steps: ['Revisit c9_eco_ch2_1 (Demand definition) and c9_eco_ch2_10 (Market equilibrium) to recall the distinction between.', 'Use the "bathtub analogy": AD is water flowing into the tub (real expenditure); buying shares is just moving water.', 'Practice classifying 10 transactions (e.g., "firm issues bonds to build plant", "household buys govt bonds", "firm buys.', 'Re-attempt Diagnostic Q2 with fresh transactions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical.',
          parts: [
                { id: 'a', prompt: 'Critique the statement: "A rise in imports always reduces Aggregate Demand, so the government should impose tariffs to boost AD." Use the AD identity and the.', answer: 'The statement is partially correct but incomplete',
                  options: ['The statement is partially correct but incomplete', 'tariffs always increase AD'],
                  hint: 'If stuck on classifying expenditures, revisit c10_eco_cbse_02_003 (GDP expenditure components) and.',
                  misconception: 'Students often treat "Investment (I)" in AD as financial investment (buying shares, mutual funds) rather than physical capital formation.' }
          ],
            remediations: { 'students-often-treat-investment-i': { steps: ['Revisit c9_eco_ch2_1 (Demand definition) and c9_eco_ch2_10 (Market equilibrium) to recall the distinction between.', 'Use the "bathtub analogy": AD is water flowing into the tub (real expenditure); buying shares is just moving water.', 'Practice classifying 10 transactions (e.g., "firm issues bonds to build plant", "household buys govt bonds", "firm buys.', 'Re-attempt Diagnostic Q2 with fresh transactions.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_002', difficulty: 'standard',
          question: 'The consumption function describes the functional relationship between.',
          hint: 'Review Class 9 Math Chapter 2 (Linear Equations in Two Variables) nodes c9_math_ch2_5.',
          misconception: 'Students believe MPC = APC always, or that APC is constant. They write "APC = 0.75" for all income levels when MPC.',
          parts: [
                { id: 'a', prompt: 'Explain why the consumption function curve does not start from the origin. What does the vertical intercept represent economically?', answer: 'The curve starts at C̅ > 0 on the vertical axis',
                  options: ['The curve starts at C̅ > 0 on the vertical axis', 'it starts from origin', 'MPC = APC always, or that APC is constant'],
                  hint: 'Review Class 9 Math Chapter 2 (Linear Equations in Two Variables) nodes c9_math_ch2_5.',
                  misconception: 'Students believe MPC = APC always, or that APC is constant. They write "APC = 0.75" for all income levels when MPC = 0.75, ignoring that.' },
                { id: 'b', prompt: 'Given C = 40 + 0.75Y, calculate consumption, APC, and MPC at Y = 200, 400, and 600. Show how APC changes as Y rises.', answer: 'At Y=200: C=40+150=190, APC=190/200=0.95, MPC=0.75',
                  options: ['At Y=200: C=40+150=190, APC=190/200=0.95, MPC=0.75', 'MPC = APC always, or that APC is constant'],
                  hint: 'Review Class 9 Math Chapter 2 (Linear Equations in Two Variables) nodes c9_math_ch2_5.',
                  misconception: 'Students believe MPC = APC always, or that APC is constant. They write "APC = 0.75" for all income levels when MPC = 0.75, ignoring that.' },
                { id: 'c', prompt: 'Two economies have consumption functions C₁ = 50 + 0.8Y and C₂ = 100 + 0.6Y. At what income level will both have the same consumption?', answer: 'Set 50 + 0.8Y = 100 + 0.6Y → 0.2Y = 50 → Y = 250',
                  options: ['Set 50 + 0.8Y = 100 + 0.6Y → 0.2Y = 50 → Y = 250', 'MPC is lower so they save more', 'MPC = APC always, or that APC is constant'],
                  hint: 'Review Class 9 Math Chapter 2 (Linear Equations in Two Variables) nodes c9_math_ch2_5.',
                  misconception: 'Students believe MPC = APC always, or that APC is constant. They write "APC = 0.75" for all income levels when MPC = 0.75, ignoring that.' }
          ],
            remediations: { 'mpc-apc-always': { steps: ['Revisit the distinction between average and marginal concepts using a concrete table: Y=100, C=120 (APC=1.2, MPC=0.8).', 'Calculate ΔC/ΔY = 60/100 = 0.6 vs C/Y.', 'Plot both on graph paper — APC is slope of ray from origin, MPC is slope of tangent.', 'Then re-attempt Diagnostic Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_003', difficulty: 'standard',
          question: 'The Saving Function shows the functional relationship between aggregate savings.',
          hint: 'If stuck, review c12_eco_cbse_10_002 for consumption function derivation and.',
          misconception: 'Students believe "MPS = 1 - MPC" is just a formula to memorize, not understanding it derives from the identity Y =.',
          parts: [
                { id: 'a', prompt: 'Given the consumption function C = 200 + 0.75Y, derive the saving function. Explain why the autonomous saving term is negative.', answer: 'S = Y - C = Y - (200 + 0.75Y) = -200 + 0.25Y',
                  options: ['S = Y - C = Y - (200 + 0.75Y) = -200 + 0.25Y', 'MPS = 1 - MPC'],
                  hint: 'If stuck, review c12_eco_cbse_10_002 for consumption function derivation and c11_math_cbse_10_006.',
                  misconception: 'Students believe "MPS = 1 - MPC" is just a formula to memorize, not understanding it derives from the identity Y = C + S.' },
                { id: 'b', prompt: 'Calculate MPS and APS at Y = 1000 for the saving function S = -100 + 0.2Y. Show all steps.', answer: 'Step 1: MPS = coefficient of Y = 0.2 (constant for linear function)',
                  options: ['Step 1: MPS = coefficient of Y = 0.2 (constant for linear function)', 'MPS = 1 - MPC'],
                  hint: 'If stuck, review c12_eco_cbse_10_002 for consumption function derivation and c11_math_cbse_10_006.',
                  misconception: 'Students believe "MPS = 1 - MPC" is just a formula to memorize, not understanding it derives from the identity Y = C + S.' },
                { id: 'c', prompt: 'Compare the saving functions of two economies: Economy A: S = -50 + 0.3Y, Economy B: S = -50 + 0.5Y. At what income level do both have the same savings?', answer: 'Set -50 + 0.3Y = -50 + 0.5Y → 0.3Y = 0.5Y → 0.2Y = 0 → Y = 0',
                  options: ['Set -50 + 0.3Y = -50 + 0.5Y → 0.3Y = 0.5Y → 0.2Y = 0 → Y = 0', 'MPS = 1 - MPC'],
                  hint: 'If stuck, review c12_eco_cbse_10_002 for consumption function derivation and c11_math_cbse_10_006.',
                  misconception: 'Students believe "MPS = 1 - MPC" is just a formula to memorize, not understanding it derives from the identity Y = C + S.' }
          ],
            remediations: { 'mps-1-mpc-is-just': { steps: ['Revisit node c12_eco_cbse_10_002 (Consumption Function) — verify you can derive C = a + bY and identify autonomous.', 'Write the identity Y = C + S. Substitute C = a + bY. Solve for S algebraically: S = Y - a - bY = -a + (1-b)Y.', 'Identify MPS = 1-b, autonomous saving = -a. Practice with 3 numerical examples: (a=100, b=0.75), (a=200, b=0.6), (a=50.', 'Re-attempt Diagnostic Questions 2 and 3. If MPS calculation is still wrong, review slope of linear function from.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_004', difficulty: 'standard',
          question: 'The relationship between Marginal Propensity to Consume (MPC) and Marginal.',
          hint: 'Revisit the derivation: start with Y = C + S, take changes ΔY = ΔC + ΔS, divide both.',
          misconception: 'Students often treat MPC and MPS as independent behavioural parameters that can change separately.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to',
                  options: ['The relationship between Marginal Propensity to Consume (MPC) and Marginal Propensity to', 'Aggregate Demand (AD) is the total planned expenditure on final goods and services in an', 'The consumption function describes the functional relationship between aggregate', 'The Saving Function shows the functional relationship between aggregate savings (S) and'],
                  hint: 'Revisit the derivation: start with Y = C + S, take changes ΔY = ΔC + ΔS, divide both sides by ΔY.',
                  misconception: 'Students often treat MPC and MPS as independent behavioural parameters that can change separately.' }
          ],
            remediations: { 'students-often-treat-mpc-and': { steps: ['If the student cannot derive MPC + MPS = 1 from Y = C + S, return to node c12_eco_cbse_10_002 (Consumption Function).', 'Re-do the algebraic derivation: Y = C + S → ΔY = ΔC + ΔS → ΔY/ΔY = ΔC/ΔY + ΔS/ΔY → 1 = MPC + MPS.', 'Practice with 5 numerical pairs: given MPC, find MPS; given MPS, find MPC; verify sum = 1 each time.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_005', difficulty: 'standard',
          question: 'Autonomous investment is the component of investment expenditure that.',
          hint: 'If stuck, revisit **c12_eco_cbse_10_002** and practice: "Given C = 200 + 0.8Y, find.',
          misconception: '**Misconception:** "Autonomous investment means government investment; induced investment means private investment.".',
          parts: [
                { id: 'a', prompt: 'Explain why the investment function I = Iₐ + bY has a positive intercept (Iₐ > 0) and a positive slope (b > 0) in the Keynesian cross model.', answer: '**Correct answer:** The intercept Iₐ > 0',
                  options: ['**Correct answer:** The intercept Iₐ > 0', 'the AD curve becomes steeper', 'government investment', '500 is "government investment'],
                  hint: 'If stuck, revisit **c12_eco_cbse_10_002** and practice: "Given C = 200 + 0.8Y, find autonomous.',
                  misconception: '**Misconception:** "Autonomous investment means government investment; induced investment means private investment." **Why this is wrong:**.' }
          ],
            remediations: { 'misconception-autonomous-investment-means-govern': { steps: ['Revisit **c12_eco_cbse_10_002** (Consumption Function) — review how C = Cₐ + cY splits consumption into autonomous and.', 'The *exact same logic* applies to investment.', 'Revisit **c12_eco_cbse_10_004** (MPC + MPS = 1) — understand that MPI is an *additional* leakage/injection alongside.', '**Re-diagnostic:** Given I = 300 + 0.2Y, C = 500 + 0.7Y, G = 400, NX = 0, find equilibrium Y and the multiplier.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_10_006', difficulty: 'standard',
          question: 'Ex-ante (Latin for "before the event") refers to the **planned or intended**.',
          hint: 'If stuck, go back to **node c12_eco_cbse_10_004 (Relationship Between MPC and MPS)** and.',
          misconception: 'Students often believe **"Ex-ante saving equals ex-ante investment is an identity, just like ex-post saving equals.',
          parts: [
                { id: 'a', prompt: 'In a simple two-sector economy, the consumption function is C = 100 + 0.8Y and planned investment is I = 200 (autonomous).', answer: 'Ex-ante AD = C + I = (100 + 0.8×1200) + 200 = 100 + 960 + 200 = **1260**',
                  options: ['Ex-ante AD = C + I = (100 + 0.8×1200) + 200 = 100 + 960 + 200 = **1260**', 'ex-post S ≠ ex-post I in disequilibrium'],
                  hint: 'If stuck, go back to **node c12_eco_cbse_10_004 (Relationship Between MPC and MPS)** and practice.',
                  misconception: 'Students often believe **"Ex-ante saving equals ex-ante investment is an identity, just like ex-post saving equals ex-post investment."**.' },
                { id: 'b', prompt: '"Ex-ante saving and ex-ante investment are equal only at the equilibrium level of income.', answer: 'The statement is **correct**',
                  options: ['The statement is **correct**', 'ex-post equality implies equilibrium'],
                  hint: 'If stuck, go back to **node c12_eco_cbse_10_004 (Relationship Between MPC and MPS)** and practice.',
                  misconception: 'Students often believe **"Ex-ante saving equals ex-ante investment is an identity, just like ex-post saving equals ex-post investment."**.' }
          ],
            remediations: { 'ex-ante-saving-equals-ex': { steps: ['If the student confuses ex-ante/ex-post or treats the equilibrium condition as an identity: 1.', 'Revisit **node c12_eco_cbse_10_002 (Consumption Function)** and **c12_eco_cbse_10_003 (Saving Function)** — these give.', 'Draw a 45° line diagram (Keynesian cross).', 'Mark a point where AD > Y.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
