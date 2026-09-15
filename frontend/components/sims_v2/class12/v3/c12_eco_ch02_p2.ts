import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch02_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch02_p2: SimDef = {
    id: 'v3_c12_eco_ch02_p2',
    title: 'Theory of Consumer Behaviour · Part 2/2',
    subtitle: 'The seventh golgappa makes you worse off — and a graph proves it',
    classLevel: 12, subject: 'economics', topic: 'Theory of Consumer Behaviour · Part 2/2',
    chapters: ['c12_eco_ch02'],
    nodeIds: ['c12_eco_cbse_02_007', 'c12_eco_cbse_02_008', 'c12_eco_cbse_02_009', 'c12_eco_cbse_02_010', 'c12_eco_cbse_02_011', 'c12_eco_cbse_02_012'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Consumer theorist', intro: 'Why is water cheap and diamonds dear? The answer hides in the difference between total and marginal satisfaction.', goal: 'Compute TU and MU, locate maximum satisfaction at MU = 0, and reason toward consumer equilibrium.' },
    discovery: {
        question: 'A free-pizza binge: a student says \'I\'ll stop when total utility starts falling.\' What did they already do wrong before stopping?',
        options: ['They ate a slice with negative marginal utility — rational consumption stops at MU = 0, where TU peaks, not after TU has already dropped', 'Nothing — falling TU is the right signal', 'They should stop at maximum MU — the very first slice', 'Free pizza has no economics'],
        answer: 'They ate a slice with negative marginal utility — rational consumption stops at MU = 0, where TU peaks, not after TU has already dropped',
        hook: 'TU peaks when MU hits zero — not when MU is highest (that\'s slice one, the lowest TU!). MU is the slope of TU; confusing marginal with total is the error behind half the wrong answers in consumer theory.',
    },
    teaching: [
        { title: 'Consumer\'s Equilibrium: Indifference Curve Approach (Tangency Condition)', text: 'Consumer\'s equilibrium in the indifference curve approach occurs at the point where the budget line is tangent to the highest attainable indifference curve.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_02_007', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit at the golgappa stall of economics: build the TU–MU schedule, find the satiety point, then balance marginal utility per rupee across goods to reach true consumer equilibrium.',
        labels: ['Consumer\'s Equilibrium: Indifference Curve', 'Demand: Meaning, Determinants', 'Movement Along vs Shift', 'Price Elasticity of Demand', 'Factors Affecting Price Elasticity'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_007', title: 'Consumer\'s Equilibrium: Indifference Curve Approach (Tangency Condition)',
          scaffold: { problem: 'Ravi has ₹500 to spend on pizza (Px = ₹50) and burgers (Py = ₹25). His utility function is U = x^0.4 * y^0.6.',
            steps: [
            { text: 'Identify the utility function and compute marginal utilities. MUx = ∂U/∂x = 0.4 x^{-0.6} y^{0.6}.' },
            { text: 'Compute MRS = MUx/MUy = (0.4/0.6) * (y/x) = (2/3) * (y/x).' },
            { text: 'Set MRS equal to price ratio Px/Py = 50/25 = 2. So (2/3)*(y/x) = 2 → y/x = 3 → y = 3x.' },
            { text: 'Substitute into budget constraint: 50x + 25y = 500 → 50x + 25(3x) = 50x + 75x = 125x = 500 → x = 4.' },
            { text: 'Then y = 3*4 = 12. Equilibrium bundle: (4 pizzas, 12 burgers). Check: Expenditure = 50*4 + 25*12 = 200 + 300 = 500.', faded: true, blankAnswer: 'x = 4 units, y = 12 units.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_008', title: 'Demand: Meaning, Determinants and Law of Demand',
          scaffold: { problem: 'The market demand for mangoes in a locality is given by Qd = 500 - 20P, where Qd is in dozens and P is in ₹/kg.',
            steps: [
            { text: 'Identify the given demand function Qd = 500 - 20P. Note that P is in ₹/kg and Qd in dozens.' },
            { text: 'For (a), substitute P = 15 into the function: Qd = 500 - 20(15) = 500 - 300 = 200 dozens.' },
            { text: 'For (b), set Qd = 0 and solve for P: 0 = 500 - 20P → 20P = 500 → P = ₹25/kg. This is the maximum price anyone will pay.' },
            { text: 'For (c), the new function is Qd\' = 600 - 20P. At P = 15, Qd\' = 600 - 300 = 300 dozens.' },
            { text: 'Compare: at same price ₹15, quantity demanded increased from 200 to 300 dozens.', faded: true, blankAnswer: '(a) 200 dozens (b) ₹25/kg (c) 300 dozens; demand curve.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_009', title: 'Movement Along vs Shift of the Demand Curve',
          scaffold: { problem: 'The demand function for wheat in a local market is Qd = 500 - 5P + 0.2Y, where Qd is in quintals, P is price in ₹/quintal, Y is average.',
            steps: [
            { text: 'Identify the demand function and initial values. Qd = 500 - 5P + 0.2Y. Initial: P=2000, Y=25000.' },
            { text: 'Calculate initial Qd. Qd = 500 - 5(2000) + 0.2(25000) = 500 - 10000 + 5000 = -4500. Wait, negative quantity?' },
            { text: '(b) P=1800, Y=50000. Qd = 5000 - 5(1800) + 0.2(50000) = 5000 - 9000 + 10000 = 6000.' },
            { text: '(c) P=2000, Y=60000. Qd = 5000 - 10000 + 12000 = 7000. Change = +2000 due to income rise → rightward shift of the curve.' },
            { text: '(d) P=1800, Y=60000. Qd = 5000 - 9000 + 12000 = 8000. Total change from initial (5000) = +3000.', faded: true, blankAnswer: '(a) 5000 quintals. (b) 6000 quintals — movement along. (c).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_010', title: 'Price Elasticity of Demand: Measurement (Percentage and Total Outlay Methods)',
          scaffold: { problem: 'A dairy cooperative in Gujarat sells pasteurized milk at ₹55 per litre, supplying 10,000 litres daily to a metro city.',
            steps: [
            { text: 'Identify given data: P₁ = ₹55, Q₁ = 10,000 litres, P₂ = ₹60, Q₂ = 9,200 litres.' },
            { text: 'Calculate percentage change in quantity: %ΔQ = [(9,200 - 10,000) / 10,000] × 100 = (-800/10,000) × 100 = -8%.' },
            { text: 'Calculate percentage change in price: %ΔP = [(60 - 55) / 55] × 100 = (5/55) × 100 = 9.09% (approx).' },
            { text: 'Apply formula: Ed = %ΔQ / %ΔP = (-8%) / (9.09%) = -0.88 (approx).' },
            { text: 'Interpret: |Ed| = 0.88 < 1 → Demand is INELASTIC. Consumers are not very responsive to price change (milk is.' },
            { text: 'Total revenue analysis: TR₁ = 55 × 10,000 = ₹5,50,000. TR₂ = 60 × 9,200 = ₹5,52,000. Revenue INCREASED by ₹2,000.', faded: true, blankAnswer: 'Ed = -0.88 (Inelastic demand). Daily total revenue rises.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_011', title: 'Price Elasticity of Demand: Geometric (Point) Method on Linear Demand Curve',
          scaffold: { problem: 'The demand for mangoes in a Mumbai market is given by Q = 200 - 4P, where Q is kg per day and P is ₹/kg.',
            steps: [
            { text: 'Identify the demand equation and given price. Demand: Q = 200 - 4P. Given P = 30.' },
            { text: 'Find quantity demanded at P = 30. Q = 200 - 4(30) = 200 - 120 = 80 kg.' },
            { text: 'Find the intercepts of the demand curve. Price intercept (P when Q=0): 0 = 200 - 4P → 4P = 200 → P = 50.' },
            { text: 'Apply geometric formula Ed = (Lower segment) / (Upper segment).' },
            { text: 'Alternatively, using segments: Upper segment = distance from point to price intercept along curve.' },
            { text: 'Interpret: Ed = 1.5 > 1 → Demand is ELASTIC at P=30.' },
            { text: 'Total revenue TR = P×Q. At P=30, TR = 30×80 = ₹2400. At P=31, Q = 200 - 4(31) = 76. TR = 31×76 = ₹2356.', faded: true, blankAnswer: 'Ed = 1.5 (elastic). Total revenue decreases from ₹2400.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_012', title: 'Factors Affecting Price Elasticity of Demand',
          scaffold: { problem: 'In a Mumbai housing society, the monthly maintenance charge increases from ₹5,000 to ₹6,000.',
            steps: [
            { text: 'Identify given data — P₁ = ₹5,000, P₂ = ₹6,000, Q₁ = 100 households, Q₂ = 95 households.' },
            { text: 'Calculate %ΔP = (6,000 - 5,000)/5,000 × 100 = 20%. Calculate %ΔQ = (95 - 100)/100 × 100 = -5%.' },
            { text: 'Compute PED = %ΔQ / %ΔP = -5% / 20% = -0.25. Absolute value |PED| = 0.25 < 1 → Inelastic demand.' },
            { text: 'Apply "proportion of income" factor — Maintenance ₹5,000/month is a small fraction of typical household income (say.' },
            { text: 'Apply "substitutes" factor — No close substitute for society maintenance (cannot easily switch to another society) →.', faded: true, blankAnswer: 'PED = -0.25 (inelastic). Demand is inelastic because.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'At a free golgappa stall a friend keeps eating \'until total utility starts falling\'. After plate seven he\'s visibly uncomfortable and wonders why the free food left him worse off.',
            decisions: [{ prompt: 'Where should a rational consumer actually stop?', options: [
                { text: 'At the unit where marginal utility hits zero — the peak of total utility; eating into negative MU actively subtracts satisfaction even though the food costs nothing.', outcome: 'TU rises while MU is positive, peaks at MU = 0, and falls once MU goes negative — \'stop when TU falls\' means you\'ve already overshot.' },
                { text: 'After just one — the first unit has the highest marginal utility, so stopping there maximises satisfaction.', outcome: 'Highest MU is not highest TU; total utility keeps climbing through every positive-MU unit.', reveals: 'max-mu-means-max-tu' },
                { text: 'Keep going — since it\'s free, more units can only add to total utility.', outcome: 'Free kills the budget constraint, not the biology: negative marginal utility drags total utility down regardless of price.', reveals: 'free-good-no-limit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_02_012', title: 'You made it',
          caseStudy: { intro: 'You can now explain why the sixth golgappa is free yet refused — and why demand curves slope down. Utility logic is the engine of this whole unit.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_007', difficulty: 'standard',
          question: 'Consumer\'s equilibrium in the indifference curve approach occurs at the point.',
          hint: 'If stuck, revisit c12_eco_cbse_02_005 (MRS calculation and diminishing MRS) and.',
          misconception: 'Students often confuse the tangency condition MRS = Px/Py with the cardinal condition MUx/Px = MUy/Py, and may write.',
          parts: [
                { id: 'a', prompt: 'Why must the indifference curve be convex to the origin at the equilibrium point? Explain using the concept of diminishing MRS.', answer: 'Convexity ensures diminishing MRS',
                  options: ['Convexity ensures diminishing MRS', 'convexity is just an assumption', 'it\'s not necessary'],
                  hint: 'If stuck, revisit c12_eco_cbse_02_005 (MRS calculation and diminishing MRS) and c12_eco_cbse_02_006.',
                  misconception: 'Students often confuse the tangency condition MRS = Px/Py with the cardinal condition MUx/Px = MUy/Py, and may write MRS = Py/Px (inverse.' }
          ],
            remediations: { 'students-often-confuse-the-tangency': { steps: ['If a student confuses the ratio, have them derive MRS from MUx/MUy step by step and set equal to Px/Py.', 'Use a numerical example: U = x*y, Px=2, Py=4, I=40.', 'Compute MUx=y, MUy=x, MRS=y/x.', 'Set y/x = 2/4 = 1/2 → y=x/2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the tangency condition MRS = Px/Py with the cardinal condition MUx/Px = MUy/Py, and may write.',
          parts: [
                { id: 'a', prompt: 'A consumer\'s indifference curves are straight lines (perfect substitutes). Px = 10, Py = 20.', answer: 'For perfect substitutes, MRS is constant (e.g., MRS = 1 for U = x + y)',
                  options: ['For perfect substitutes, MRS is constant (e.g., MRS = 1 for U = x + y)', 'tangency always works'],
                  hint: 'If stuck, revisit c12_eco_cbse_02_005 (MRS calculation and diminishing MRS) and c12_eco_cbse_02_006.',
                  misconception: 'Students often confuse the tangency condition MRS = Px/Py with the cardinal condition MUx/Px = MUy/Py, and may write MRS = Py/Px (inverse.' }
          ],
            remediations: { 'students-often-confuse-the-tangency': { steps: ['If a student confuses the ratio, have them derive MRS from MUx/MUy step by step and set equal to Px/Py.', 'Use a numerical example: U = x*y, Px=2, Py=4, I=40.', 'Compute MUx=y, MUy=x, MRS=y/x.', 'Set y/x = 2/4 = 1/2 → y=x/2.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_008', difficulty: 'standard',
          question: 'Demand in economics refers to the quantity of a good or service that consumers.',
          hint: 'If stuck, revisit Class 9 Maths Chapter 2 (Linear Equations in Two Variables).',
          misconception: 'Students often believe that "an increase in demand" means the same as "an increase in quantity demanded" and use the.',
          parts: [
                { id: 'a', prompt: 'Why does the demand curve slope downward? Explain using both the substitution effect and the income effect.', answer: 'When the price of dosas falls from ₹50 to ₹40: (1) Substitution effect',
                  options: ['When the price of dosas falls from ₹50 to ₹40: (1) Substitution effect', 'people buy more when price is low', 'an increase in demand', 'an increase in quantity demanded'],
                  hint: 'If stuck, revisit Class 9 Maths Chapter 2 (Linear Equations in Two Variables) — specifically.',
                  misconception: 'Students often believe that "an increase in demand" means the same as "an increase in quantity demanded" and use the phrases.' },
                { id: 'b', prompt: 'A consumer\'s demand function for good X is Qd = 100 - 5P. If the price of X falls from ₹12 to ₹8, calculate the change in quantity demanded.', answer: 'At P=12: Qd = 100 - 5(12) = 40 units',
                  options: ['At P=12: Qd = 100 - 5(12) = 40 units', 'change in demand', 'an increase in demand', 'an increase in quantity demanded'],
                  hint: 'If stuck, revisit Class 9 Maths Chapter 2 (Linear Equations in Two Variables) — specifically.',
                  misconception: 'Students often believe that "an increase in demand" means the same as "an increase in quantity demanded" and use the phrases.' },
                { id: 'c', prompt: 'The price of petrol rises sharply. Analyse the effect on the demand curve for (a) cars (complementary good) and (b) electric scooters (substitute good).', answer: 'cars (complementary goo',
                  options: ['cars (complementary goo', 'related goods', 'an increase in demand', 'an increase in quantity demanded'],
                  hint: 'If stuck, revisit Class 9 Maths Chapter 2 (Linear Equations in Two Variables) — specifically.',
                  misconception: 'Students often believe that "an increase in demand" means the same as "an increase in quantity demanded" and use the phrases.' }
          ],
            remediations: { 'an-increase-in-demand-means': { steps: ['Revisit the distinction between movement along vs shift of the demand curve (node c12_eco_cbse_02_009) using.', 'Practice classifying 10 scenarios (e.g., "price of tea falls", "income rises", "taste for coffee increases").', 'Draw the demand curve for an inferior good (e.g., millet) and show the leftward shift when income rises.', 'Take a diagnostic re-test: if you still confuse the terms, watch the 5-minute animation on "Demand vs Quantity.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_009', difficulty: 'standard',
          question: 'Movement along the demand curve occurs when quantity demanded changes solely.',
          hint: 'If stuck, revisit the law of demand (c12_eco_cbse_02_008) and practice drawing demand.',
          misconception: 'Students write "demand increases when price falls" because everyday language uses "demand" loosely to mean "quantity.',
          parts: [
                { id: 'a', prompt: 'Given the demand function Qd = 100 - 2P + 0.5Y - 3Ps, where P = own price, Y = consumer income, Ps = price of substitute. Initially P=20, Y=50, Ps=15.', answer: 'Initial Qd = 100 - 2(20) + 0.5(50) - 3(15) = 100 - 40 + 25 - 45 = 40 units',
                  options: ['Initial Qd = 100 - 2(20) + 0.5(50) - 3(15) = 100 - 40 + 25 - 45 = 40 units', 'decrease in demand'],
                  hint: 'If stuck, revisit the law of demand (c12_eco_cbse_02_008) and practice drawing demand curves for.',
                  misconception: 'Students write "demand increases when price falls" because everyday language uses "demand" loosely to mean "quantity bought." The exact.' }
          ],
            remediations: { 'students-write-demand-increases-when': { steps: ['Revisit node c12_eco_cbse_02_008 (Demand: Meaning, Determinants and Law of Demand) — specifically the definition.', 'Draw a demand curve on graph paper. Pick a point (P1, Q1). Show movement along: change P to P2, find Q2 on SAME curve.', 'Write the rule in your own words: "Own price → movement along. Anything else → shift."', 'Take the Diagnostic Question 2 again. If still wrong, review Class 9 Math node c9_math_ch2_5 (Graph of a Linear.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_010', difficulty: 'standard',
          question: 'Price Elasticity of Demand (Ed) measures the degree of responsiveness.',
          hint: 'If percentage calculations are shaky, revisit Class 8 Mathematics Chapter 8 (Comparing.',
          misconception: 'Students believe "elastic demand means quantity changes a lot" and "inelastic means quantity barely changes" — but they.',
          parts: [
                { id: 'a', prompt: 'A vegetable vendor sells tomatoes at ₹40/kg, selling 50 kg daily. He raises the price to ₹50/kg, and sales fall to 40 kg.', answer: 'Initial total outlay = 40 × 50 = ₹2,000',
                  options: ['Initial total outlay = 40 × 50 = ₹2,000', 'elastic because quantity fell', 'elastic demand means quantity changes a lot', 'inelastic means quantity barely changes'],
                  hint: 'If percentage calculations are shaky, revisit Class 8 Mathematics Chapter 8 (Comparing Quantities).',
                  misconception: 'Students believe "elastic demand means quantity changes a lot" and "inelastic means quantity barely changes" — but they forget the.' },
                { id: 'b', prompt: 'Calculate Ed using the Percentage Method for the following: Price falls from ₹100 to ₹80, quantity demanded rises from 200 units to 250 units.', answer: 'Step 1: %ΔQ = [(250-200)/200] × 100 = +25%',
                  options: ['Step 1: %ΔQ = [(250-200)/200] × 100 = +25%', 'elastic demand means quantity changes a lot', 'inelastic means quantity barely changes'],
                  hint: 'If percentage calculations are shaky, revisit Class 8 Mathematics Chapter 8 (Comparing Quantities).',
                  misconception: 'Students believe "elastic demand means quantity changes a lot" and "inelastic means quantity barely changes" — but they forget the.' },
                { id: 'c', prompt: 'If demand for a good is inelastic (|Ed| < 1), and a firm raises its price, what happens to its total revenue?', answer: 'Total Outlay Method: Price ↑ → Total Outlay (Revenue) ↑ (since quantity falls',
                  options: ['Total Outlay Method: Price ↑ → Total Outlay (Revenue) ↑ (since quantity falls', 'revenue falls', 'elastic demand means quantity changes a lot', 'inelastic means quantity barely changes'],
                  hint: 'If percentage calculations are shaky, revisit Class 8 Mathematics Chapter 8 (Comparing Quantities).',
                  misconception: 'Students believe "elastic demand means quantity changes a lot" and "inelastic means quantity barely changes" — but they forget the.' }
          ],
            remediations: { 'elastic-demand-means-quantity-changes': { steps: ['Revisit c12_eco_cbse_02_008 (Law of Demand) to recall the inverse P-Q relationship.', 'Practice percentage change calculations using Class 8 math nodes (c8_math_ch8_4, c8_math_ch8_6) — always use original.', 'Draw a 2×2 table: Price Up/Down vs Total Outlay Up/Down/Same → Elastic/Inelastic/Unitary.', 'Re-do Diagnostic Q3 and Q4 with a peer, explaining each step aloud.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_011', difficulty: 'standard',
          question: 'Price Elasticity of Demand (Ed) at a specific point on a linear demand curve.',
          hint: 'If stuck, revisit the percentage method (c12_eco_cbse_02_010) and recalculate Ed at three.',
          misconception: 'Students believe that "slope of the demand curve = price elasticity of demand" because both involve ΔP/ΔQ.',
          parts: [
                { id: 'a', prompt: 'On a linear demand curve, elasticity is 1 at the midpoint, greater than 1 above the midpoint, and less than 1 below the midpoint.', answer: 'Ed = (Lower segment)/(Upper segment)',
                  options: ['Ed = (Lower segment)/(Upper segment)', 'elasticity equals slope', 'elasticity is constant on a straight line', 'slope of the demand curve = price elasticity of demand'],
                  hint: 'If stuck, revisit the percentage method (c12_eco_cbse_02_010) and recalculate Ed at three points.',
                  misconception: 'Students believe that "slope of the demand curve = price elasticity of demand" because both involve ΔP/ΔQ.' },
                { id: 'b', prompt: 'A linear demand curve has equation Q = 100 - 2P. Calculate the price elasticity of demand at P = ₹20 using the geometric method.', answer: 'Step 1: Find Q at P=20: Q = 100 - 2(20) = 60',
                  options: ['Step 1: Find Q at P=20: Q = 100 - 2(20) = 60', 'slope of the demand curve = price elasticity of demand', '"slope of the demand curve = price elasticity of demand"'],
                  hint: 'If stuck, revisit the percentage method (c12_eco_cbse_02_010) and recalculate Ed at three points.',
                  misconception: 'Students believe that "slope of the demand curve = price elasticity of demand" because both involve ΔP/ΔQ.' },
                { id: 'c', prompt: 'Compare the geometric (point) method and the percentage (flux) method for measuring elasticity on a linear demand curve. When would each be preferred?', answer: 'Both methods yield identical results at any point on a linear demand curve',
                  options: ['Both methods yield identical results at any point on a linear demand curve', 'percentage method is always better', 'geometric method only works for straight lines through origin', 'slope of the demand curve = price elasticity of demand'],
                  hint: 'If stuck, revisit the percentage method (c12_eco_cbse_02_010) and recalculate Ed at three points.',
                  misconception: 'Students believe that "slope of the demand curve = price elasticity of demand" because both involve ΔP/ΔQ.' }
          ],
            remediations: { 'slope-of-the-demand-curve': { steps: ['If the student confuses slope with elasticity: (1) Revisit c12_eco_cbse_02_008 (Law of Demand) to recall that slope.', '(2) Revisit c12_eco_cbse_02_010 (Percentage Method) and calculate Ed at 3 different points on Q=100-2P using %ΔQ/%ΔP.', '(3) Draw the demand curve, mark 3 points, measure segments physically with ruler — verify Ed = Lower/Upper matches.', '(4) Re-do Diagnostic Q2 and Q3.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_012', difficulty: 'standard',
          question: 'Price Elasticity of Demand (PED) measures the responsiveness of quantity.',
          hint: 'If you cannot calculate PED from given price-quantity data, revisit c12_eco_cbse_02_010.',
          misconception: 'Students believe **"necessities always have inelastic demand and luxuries always have elastic demand"** as an absolute.',
          parts: [
                { id: 'a', prompt: 'The price of Brand X tea rises from ₹200/kg to ₹240/kg. Quantity demanded falls from 1000 kg to 700 kg per month. Calculate PED using the percentage method.', answer: 'Step 1: %ΔP = (240-200)/200 × 100 = 20%',
                  options: ['Step 1: %ΔP = (240-200)/200 × 100 = 20%', 'necessities always have inelastic demand and luxuries always have elastic demand'],
                  hint: 'If you cannot calculate PED from given price-quantity data, revisit c12_eco_cbse_02_010 (percentage.',
                  misconception: 'Students believe **"necessities always have inelastic demand and luxuries always have elastic demand"** as an absolute rule.' },
                { id: 'b', prompt: 'Compare the short-run and long-run price elasticity of demand for petrol in India. Explain why they differ using the *time period* factor.', answer: 'Short-run PED for petrol is low (inelastic, ~0.2-0.3)',
                  options: ['Short-run PED for petrol is low (inelastic, ~0.2-0.3)', 'long-run is always more elastic', 'necessities always have inelastic demand and luxuries always have elastic demand'],
                  hint: 'If you cannot calculate PED from given price-quantity data, revisit c12_eco_cbse_02_010 (percentage.',
                  misconception: 'Students believe **"necessities always have inelastic demand and luxuries always have elastic demand"** as an absolute rule.' }
          ],
            remediations: { 'necessities-always-have-inelastic-demand': { steps: ['Revisit c12_eco_cbse_02_010 (Percentage Method) — ensure you can calculate PED from %ΔQ and %ΔP.', 'Create a 2×3 table: 6 factors as rows, two columns "Makes demand MORE elastic" and "Makes demand LESS elastic".', 'Pick 5 goods from your kitchen (salt, milk, biscuits, cooking oil, mangoes) and classify each factor for each good.', 'Predict which has highest/lowest PED.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
