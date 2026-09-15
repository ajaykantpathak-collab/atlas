import type { SimDef } from '../../engine/types';

/** v3 generated — c12_eco_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c12_eco_ch02_p1: SimDef = {
    id: 'v3_c12_eco_ch02_p1',
    title: 'Theory of Consumer Behaviour · Part 1/2',
    subtitle: 'The seventh golgappa makes you worse off — and a graph proves it',
    classLevel: 12, subject: 'economics', topic: 'Theory of Consumer Behaviour · Part 1/2',
    chapters: ['c12_eco_ch02'],
    nodeIds: ['c12_eco_cbse_02_001', 'c12_eco_cbse_02_002', 'c12_eco_cbse_02_003', 'c12_eco_cbse_02_004', 'c12_eco_cbse_02_005', 'c12_eco_cbse_02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'Consumer theorist', intro: 'Why is water cheap and diamonds dear? The answer hides in the difference between total and marginal satisfaction.', goal: 'Compute TU and MU, locate maximum satisfaction at MU = 0, and reason toward consumer equilibrium.' },
    discovery: {
        question: 'A free-pizza binge: a student says \'I\'ll stop when total utility starts falling.\' What did they already do wrong before stopping?',
        options: ['They ate a slice with negative marginal utility — rational consumption stops at MU = 0, where TU peaks, not after TU has already dropped', 'Nothing — falling TU is the right signal', 'They should stop at maximum MU — the very first slice', 'Free pizza has no economics'],
        answer: 'They ate a slice with negative marginal utility — rational consumption stops at MU = 0, where TU peaks, not after TU has already dropped',
        hook: 'TU peaks when MU hits zero — not when MU is highest (that\'s slice one, the lowest TU!). MU is the slope of TU; confusing marginal with total is the error behind half the wrong answers in consumer theory.',
    },
    teaching: [
        { title: 'Utility: Total Utility and Marginal Utility', text: 'Total Utility (TU) is the aggregate psychological satisfaction a consumer derives from consuming a given quantity of a good or service within a specific time period.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c12_eco_cbse_02_001', title: 'Your mission',
          mission: { widget: 'timeline', validate: 'timeline:year=80',
            instruction: 'On the lab: scrub to 80% through the era — what came before what?.',
        context: 'Sit at the golgappa stall of economics: build the TU–MU schedule, find the satiety point, then balance marginal utility per rupee across goods to reach true consumer equilibrium.',
        labels: ['Utility: Total Utility', 'Law of Diminishing Marginal', 'Consumer\'s Equilibrium: Cardinal Utility', 'Indifference Curve: Meaning', 'Marginal Rate of Substitution', 'Budget Line and Budget'],
            observePrompt: 'What did the timeline interactive show you?' } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_001', title: 'Utility: Total Utility and Marginal Utility',
          scaffold: { problem: 'Riya consumes mangoes in summer. Her Total Utility (in utils) from successive mangoes is: 1 mango = 20, 2 mangoes = 36, 3 mangoes = 48, 4.',
            steps: [
            { text: 'List the given TU values for Q = 1 to 7.' },
            { text: 'Compute MU for each unit using MUₙ = TUₙ – TUₙ₋₁ (with TU₀ = 0).' },
            { text: 'Identify where TU is maximum. TU = 60 at Q = 5 and Q = 6.' },
            { text: 'Note that at maximum TU, MU = 0 (at Q = 6). At Q = 5, MU is still positive (4), but TU has not yet peaked; it plateaus.' },
            { text: 'Interpret economically: Riya should stop at 6 mangoes if they are free; the 7th reduces her total satisfaction.', faded: true, blankAnswer: 'MU schedule: 20, 16, 12, 8, 4, 0, –2 utils. Maximum TU = 60.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_002', title: 'Law of Diminishing Marginal Utility: Statement and Assumptions',
          scaffold: { problem: 'Ritu consumes ice cream scoops on a hot Delhi afternoon. Her total utility (in utils) is: 1 scoop = 25, 2 scoops = 45, 3 scoops = 60, 4.',
            steps: [
            { text: 'Compute MU for each scoop using MUₙ = TUₙ - TUₙ₋₁. MU₁ = 25 - 0 = 25; MU₂ = 45 - 25 = 20; MU₃ = 60 - 45 = 15; MU₄ = 70.' },
            { text: 'Observe MU sequence: 25, 20, 15, 10, 5, 0, -5. MU diminishes from the very first scoop (25 > 20 > 15...).' },
            { text: 'Total utility maximized when MU = 0 → at 5th and 6th scoops (TU = 75). Beyond 6th scoop, MU < 0 so TU falls.' },
            { text: 'Convert price to utils: Price = ₹30, MU of money = 1 util/₹5 → Price in utils = 30/5 = 6 utils.' },
            { text: 'Verify: At 4 scoops, MU = 10 utils = ₹50 worth of satisfaction > ₹30 cost. At 5 scoops, MU = 5 utils = ₹25 < ₹30 cost.', faded: true, blankAnswer: '(a) MU: 25, 20, 15, 10, 5, 0, -5 utils; (b) From 1st scoop.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_003', title: 'Consumer\'s Equilibrium: Cardinal Utility Approach (Single Commodity)',
          scaffold: { problem: 'Ravi has ₹80 to spend on mangoes priced at ₹10 each. His marginal utility schedule (in utils) for mangoes is: 1st: 25, 2nd: 20, 3rd: 15.',
            steps: [
            { text: 'Identify the equilibrium condition: MUx = Px. Here Px = ₹10. We need to find the largest quantity where MU ≥ 10 (since.' },
            { text: 'Compare MU with price for each unit: Unit 1: MU=25 > 10 (buy), Unit 2: MU=20 > 10 (buy), Unit 3: MU=15 > 10 (buy), Unit.' },
            { text: 'Equilibrium quantity = 4 mangoes. At 4 units, MU = Price = 10.' },
            { text: 'Total Utility = Sum of MU for 4 units = 25 + 20 + 15 + 10 = 70 utils. Total Expenditure = 4 × ₹10 = ₹40.' },
            { text: 'Consumer Surplus = Total Utility (in ₹) - Total Expenditure = ₹70 - ₹40 = ₹30.', faded: true, blankAnswer: 'Equilibrium Quantity = 4 mangoes, Total Utility = 70 utils.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_02_004', title: 'Indifference Curve: Meaning and Properties',
          caseStudy: { intro: 'Imagine you are at a fruit stall in Delhi with ₹100. You can buy apples (₹20 each) and bananas (₹10 each).',
            decisions: [{ prompt: 'Define an indifference curve. What does each point on it represent?', options: [
                { text: 'An indifference curve is a locus of points representing different combinations of two', outcome: 'An indifference curve is a locus of points representing different combinations of two goods that.' },
                { text: 'each point shows equal *money spent*', outcome: 'Not quite — **Misconception:** "Indifference curves are just like demand curves — they slope down because.', reveals: 'misconception-indifference-curves-are-just' },
                { text: 'equal *marginal utility*', outcome: 'Not quite — **Misconception:** "Indifference curves are just like demand curves — they slope down because.', reveals: 'misconception-indifference-curves-are-just' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_005', title: 'Marginal Rate of Substitution (MRS) and Diminishing MRS',
          scaffold: { problem: 'A consumer\'s utility function is U = X · Y (where X = notebooks, Y = pens). At Bundle A, the consumer has 4 notebooks and 9 pens.',
            steps: [
            { text: 'Compute utility at A: U<sub>A</sub> = 4 × 9 = 36. At B: U<sub>B</sub> = 6 × 6 = 36.' },
            { text: 'For U = X·Y, MU<sub>X</sub> = ∂U/∂X = Y, MU<sub>Y</sub> = ∂U/∂Y = X.' },
            { text: 'MRS<sub>XY</sub> at A = MU<sub>X</sub>/MU<sub>Y</sub> = 9/4 = 2.25.' },
            { text: 'Average MRS between A and B = -ΔY/ΔX = -(6-9)/(6-4) = -(-3)/2 = 1.5.' },
            { text: 'MRS at A (2.25) > Average MRS (1.5). As we move from A to B, X increases (4→6), Y decreases (9→6), so MU<sub>X</sub>.', faded: true, blankAnswer: '(a) U=36 for both. (b) MU<sub>X</sub>=9, MU<sub>Y</sub>=4.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_eco_cbse_02_006', title: 'Budget Line and Budget Set: Equation and Shifts',
          scaffold: { problem: 'Meena, a college student in Mumbai, has a monthly entertainment budget of ₹2,400.',
            steps: [
            { text: 'Identify given data — M = 2400, P_movie = 300, P_thali = 150. Good 1 (horizontal) = movie tickets, Good 2 (vertical).' },
            { text: 'Write budget line equation: P₁x₁ + P₂x₂ = M → 300M_t + 150T = 2400.' },
            { text: 'Calculate intercepts. Horizontal (movie tickets): M/P₁ = 2400/300 = 8 tickets (when T = 0).' },
            { text: 'Calculate slope: –P₁/P₂ = –300/150 = –2. This means for each additional movie ticket, Meena must give up 2 thalis.' },
            { text: 'For 4 movie tickets, substitute x₁ = 4: 300(4) + 150T = 2400 → 1200 + 150T = 2400 → 150T = 1200 → T = 8 thalis.' },
            { text: 'Graph: X-axis = movie tickets (0 to 8), Y-axis = thalis (0 to 16).' },
            { text: 'Economic interpretation of slope –2: The market requires Meena to sacrifice 2 thalis to gain 1 movie ticket; this.', faded: true, blankAnswer: '(a) 300M_t + 150T = 2400. (b) Horizontal intercept = 8.' }
            ] } },
        { type: 'case', nodeId: 'c12_eco_cbse_02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'At a free golgappa stall a friend keeps eating \'until total utility starts falling\'. After plate seven he\'s visibly uncomfortable and wonders why the free food left him worse off.',
            decisions: [{ prompt: 'Where should a rational consumer actually stop?', options: [
                { text: 'At the unit where marginal utility hits zero — the peak of total utility; eating into negative MU actively subtracts satisfaction even though the food costs nothing.', outcome: 'TU rises while MU is positive, peaks at MU = 0, and falls once MU goes negative — \'stop when TU falls\' means you\'ve already overshot.' },
                { text: 'After just one — the first unit has the highest marginal utility, so stopping there maximises satisfaction.', outcome: 'Highest MU is not highest TU; total utility keeps climbing through every positive-MU unit.', reveals: 'max-mu-means-max-tu' },
                { text: 'Keep going — since it\'s free, more units can only add to total utility.', outcome: 'Free kills the budget constraint, not the biology: negative marginal utility drags total utility down regardless of price.', reveals: 'free-good-no-limit' }
            ] }] } },
        { type: 'case', nodeId: 'c12_eco_cbse_02_006', title: 'The bigger picture',
          caseStudy: { intro: 'You can now explain why the sixth golgappa is free yet refused — and why demand curves slope down. Utility logic is the engine of this whole unit.',
            decisions: [{ prompt: 'What comes next? Theory of Consumer Behaviour · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Theory of Consumer Behaviour · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'timeline', prompt: 'Explore the timeline interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'timeline', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_001', difficulty: 'standard',
          question: 'Total Utility (TU) is the aggregate psychological satisfaction a consumer.',
          hint: 'If stuck, review the "derivative as slope" idea from c11_math_cbse_13_006 and practice.',
          misconception: 'Students often believe that "Total Utility is maximum when Marginal Utility is maximum." In reality, TU is maximum when.',
          parts: [
                { id: 'a', prompt: 'If Total Utility from consuming 3 units of a good is 48 utils and from 4 units is 56 utils, what is the Marginal Utility of the 4th unit?', answer: 'MU of 4th unit = TU₄ – TU₃ = 56 – 48 = 8 utils',
                  options: ['MU of 4th unit = TU₄ – TU₃ = 56 – 48 = 8 utils', 'MU = TU/Q', 'Total Utility is maximum when Marginal Utility is maximum', 'marginal'],
                  hint: 'If stuck, review the "derivative as slope" idea from c11_math_cbse_13_006 and practice computing.',
                  misconception: 'Students often believe that "Total Utility is maximum when Marginal Utility is maximum." In reality, TU is maximum when MU = 0, not when.' },
                { id: 'b', prompt: 'Given the TU schedule: Q=1 TU=10, Q=2 TU=18, Q=3 TU=24, Q=4 TU=28, Q=5 TU=30, Q=6 TU=30, Q=7 TU=28.', answer: 'MU: 1st=10, 2nd=8, 3rd=6, 4th=4, 5th=2, 6th=0, 7th=-2',
                  options: ['MU: 1st=10, 2nd=8, 3rd=6, 4th=4, 5th=2, 6th=0, 7th=-2', 'satiety point', 'Total Utility is maximum when Marginal Utility is maximum', 'marginal'],
                  hint: 'If stuck, review the "derivative as slope" idea from c11_math_cbse_13_006 and practice computing.',
                  misconception: 'Students often believe that "Total Utility is maximum when Marginal Utility is maximum." In reality, TU is maximum when MU = 0, not when.' },
                { id: 'c', prompt: 'A consumer says: "I stop eating pizza when my Total Utility starts falling." Using the TU-MU relationship, explain why this statement is economically.', answer: 'TU falls only when MU becomes negative',
                  options: ['TU falls only when MU becomes negative', 'Total Utility is maximum when Marginal Utility is maximum', 'marginal', '"Total Utility is maximum when Marginal Utility is maximum'],
                  hint: 'If stuck, review the "derivative as slope" idea from c11_math_cbse_13_006 and practice computing.',
                  misconception: 'Students often believe that "Total Utility is maximum when Marginal Utility is maximum." In reality, TU is maximum when MU = 0, not when.' }
          ],
            remediations: { 'total-utility-is-maximum-when': { steps: ['Revisit the TU-MU table from Worked Example 1 and physically plot TU (y-axis) vs Q (x-axis) and MU (y-axis) vs Q.', 'Draw tangents to the TU curve; show that slope = MU.', 'Identify where slope = 0 (TU peak) and where slope turns negative.', 'Re-attempt Diagnostic Question 4.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_002', difficulty: 'standard',
          question: 'The Law of Diminishing Marginal Utility states that as a consumer consumes.',
          hint: 'If unable to compute MU from TU or explain why MU slope matters, revisit.',
          misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with.',
          parts: [
                { id: 'a', prompt: 'A consumer\'s total utility (in utils) from consuming mangoes is given: TU(1)=20, TU(2)=36, TU(3)=48, TU(4)=56, TU(5)=60, TU(6)=60, TU(7)=57.', answer: 'MU(1)=20, MU(2)=16, MU(3)=12, MU(4)=8, MU(5)=4, MU(6)=0, MU(7)=-3',
                  options: ['MU(1)=20, MU(2)=16, MU(3)=12, MU(4)=8, MU(5)=4, MU(6)=0, MU(7)=-3', 'diminishing', 'diminished relative to first', 'total utility decreases after a point'],
                  hint: 'If unable to compute MU from TU or explain why MU slope matters, revisit c12_eco_cbse_02_001 worked.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' },
                { id: 'b', prompt: '"Diamonds have high marginal utility, water has low marginal utility — therefore diamonds are more expensive than water." Analyze this statement using the Law.', answer: 'The reasoning is flawed',
                  options: ['The reasoning is flawed', 'water is essential so it should be expensive', 'total utility decreases after a point', 'draw TU and MU curves'],
                  hint: 'If unable to compute MU from TU or explain why MU slope matters, revisit c12_eco_cbse_02_001 worked.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' }
          ],
            remediations: { 'the-law-of-dmu-means': { steps: ['Revisit c12_eco_cbse_02_001 — reconstruct the TU-MU relationship numerically: pick any 5-unit consumption schedule.', 'Identify the exact unit where MU becomes zero and where TU peaks — verify they coincide.', 'Practice the "MU = Price" equilibrium condition with a numerical example: if MU schedule is 20, 16, 12, 8, 4 and price.', 'Re-diagnostic: Given TU = 10, 18, 24, 28, 30, 30, 28 — find where DMU starts, TU max, and MU negative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with.',
          parts: [
                { id: 'a', prompt: 'Evaluate: "The Law of Diminishing Marginal Utility fails for addictive goods like cigarettes because the more a person smokes, the more they crave the next.', answer: 'The evaluation is incorrect',
                  options: ['The evaluation is incorrect', 'total utility decreases after a point', 'draw TU and MU curves'],
                  hint: 'If unable to compute MU from TU or explain why MU slope matters, revisit c12_eco_cbse_02_001 worked.',
                  misconception: 'Students believe the Law of DMU means "total utility decreases after a point" — they confuse marginal utility (MU) with total utility (TU).' }
          ],
            remediations: { 'the-law-of-dmu-means': { steps: ['Revisit c12_eco_cbse_02_001 — reconstruct the TU-MU relationship numerically: pick any 5-unit consumption schedule.', 'Identify the exact unit where MU becomes zero and where TU peaks — verify they coincide.', 'Practice the "MU = Price" equilibrium condition with a numerical example: if MU schedule is 20, 16, 12, 8, 4 and price.', 'Re-diagnostic: Given TU = 10, 18, 24, 28, 30, 30, 28 — find where DMU starts, TU max, and MU negative.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_003', difficulty: 'standard',
          question: 'Consumer\'s equilibrium under the cardinal utility approach for a single.',
          hint: 'If stuck, revisit c12_eco_cbse_02_002 (Law of DMU) and practice constructing MU schedules.',
          misconception: 'Students believe "Consumer equilibrium means Total Utility is maximum" and therefore buy units until MU becomes zero.',
          parts: [
                { id: 'a', prompt: 'A consumer buys a good at ₹15 per unit. The marginal utilities of successive units are: 1st unit = 25 utils, 2nd = 20 utils, 3rd = 15 utils, 4th = 10 utils.', answer: 'The consumer buys 3 units',
                  options: ['The consumer buys 3 units', '4 units because MU is still positive', '5 units to maximize total utility', 'Consumer equilibrium means Total Utility is maximum'],
                  hint: 'If stuck, revisit c12_eco_cbse_02_002 (Law of DMU) and practice constructing MU schedules from.',
                  misconception: 'Students believe "Consumer equilibrium means Total Utility is maximum" and therefore buy units until MU becomes zero.' },
                { id: 'b', prompt: 'Given the MU schedule: Unit 1: 40 utils, Unit 2: 35 utils, Unit 3: 30 utils, Unit 4: 25 utils, Unit 5: 20 utils, Unit 6: 15 utils. Price = ₹25.', answer: 'equilibrium quantity, (',
                  options: ['equilibrium quantity, (', 'Consumer equilibrium means Total Utility is maximum'],
                  hint: 'If stuck, revisit c12_eco_cbse_02_002 (Law of DMU) and practice constructing MU schedules from.',
                  misconception: 'Students believe "Consumer equilibrium means Total Utility is maximum" and therefore buy units until MU becomes zero.' },
                { id: 'c', prompt: 'Suppose a consumer is at equilibrium consuming 5 units of a good at ₹10 each. The price suddenly falls to ₹8.', answer: 'Initially MU5 = ₹10',
                  options: ['Initially MU5 = ₹10', 'quantity stays same', 'buys until MU = 0', 'Consumer equilibrium means Total Utility is maximum'],
                  hint: 'If stuck, revisit c12_eco_cbse_02_002 (Law of DMU) and practice constructing MU schedules from.',
                  misconception: 'Students believe "Consumer equilibrium means Total Utility is maximum" and therefore buy units until MU becomes zero.' }
          ],
            remediations: { 'consumer-equilibrium-means-total-utility': { steps: ['Revisit c12_eco_cbse_02_001 (Total vs Marginal Utility) and c12_eco_cbse_02_002 (Law of DMU).', 'Draw a table with columns: Units, MU, TU, Price, Net Gain (MU - P), Cumulative Net Gain.', 'Use P = ₹15, MU: 30, 25, 20, 15, 10, 5. Fill the table.', 'Show cumulative net gain peaks at 4 units (where MU = P), not at 6 units (where MU = 0).'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_004', difficulty: 'standard',
          question: 'An indifference curve (IC) is a graphical representation showing all.',
          hint: 'If stuck, revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** — it explains that.',
          misconception: '**Misconception:** "Indifference curves are just like demand curves — they slope down because of the law of demand.".',
          parts: [
                { id: 'a', prompt: 'Why must an indifference curve slope downward from left to right? Explain using the concept of trade-off and the assumption of monotonic preferences.', answer: 'An IC slopes downward',
                  options: ['An IC slopes downward', 'because of the law of demand', 'because price ratio is negative'],
                  hint: 'If stuck, revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** — it explains that choosing more.',
                  misconception: '**Misconception:** "Indifference curves are just like demand curves — they slope down because of the law of demand." **Why it\'s wrong:**.' },
                { id: 'b', prompt: 'Consider two bundles: A (4 apples, 6 bananas) and B (6 apples, 4 bananas). The consumer is indifferent between them. Bundle C is (5 apples, 5 bananas).', answer: 'Bundle C (5,5) is **strictly preferred** to A and B',
                  options: ['Bundle C (5,5) is **strictly preferred** to A and B', 'indifference means *all* combinations on the line are equal'],
                  hint: 'If stuck, revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** — it explains that choosing more.',
                  misconception: '**Misconception:** "Indifference curves are just like demand curves — they slope down because of the law of demand." **Why it\'s wrong:**.' },
                { id: 'c', prompt: 'Two indifference curves IC₁ and IC₂ intersect at point E. Bundle A is on IC₁ (northeast of E), Bundle B is on IC₂ (northwest of E).', answer: '**Proof by contradiction:** 1',
                  options: ['**Proof by contradiction:** 1', 'they don\'t intersect'],
                  hint: 'If stuck, revisit **c9_eco_ch1_3 (Choice and Opportunity Cost)** — it explains that choosing more.',
                  misconception: '**Misconception:** "Indifference curves are just like demand curves — they slope down because of the law of demand." **Why it\'s wrong:**.' }
          ],
            remediations: { 'misconception-indifference-curves-are-just': { steps: ['If the student confuses IC slope with law of demand: 1.', '**Revisit c12_eco_cbse_02_001 (Total/Marginal Utility)** — recall that cardinal utility also assumes "more is better".', '**Do this exercise:** Take two bundles: (2,5) and (3,4).', 'Ask: "If I give you 1 more samosa, why must I take away a cold drink to keep you equally happy?" Answer: "Because you.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_005', difficulty: 'standard',
          question: 'The Marginal Rate of Substitution (MRS) is the rate at which a consumer.',
          hint: 'If stuck on MRS calculation, revisit c12_eco_cbse_02_001 for MU definition and.',
          misconception: 'Students often confuse MRS (a *preference-based* willingness to trade) with the *price ratio*.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Marginal Rate of Substitution (MRS) is the rate at',
                  options: ['The Marginal Rate of Substitution (MRS) is the rate at', 'Total Utility (TU) is the aggregate psychological satisfaction a consumer derives from', 'The Law of Diminishing Marginal Utility states that as a consumer consumes successive', 'Consumer\'s equilibrium under the cardinal utility approach for a single commodity occurs'],
                  hint: 'If stuck on MRS calculation, revisit c12_eco_cbse_02_001 for MU definition and c12_eco_cbse_02_004.',
                  misconception: 'Students often confuse MRS (a *preference-based* willingness to trade) with the *price ratio* P<sub>X</sub>/P<sub>Y</sub> (a.' }
          ],
            remediations: { 'students-often-confuse-mrs-a': { steps: ['If the student confuses MRS with price ratio: Revisit c12_eco_cbse_02_004 (Indifference Curve properties) and.', 'Do a side-by-side comparison table: MRS vs Price Ratio — source, formula, when equal.', 'If the student cannot explain diminishing MRS using MU: Re-do the numerical example in Worked Example 1 with a concrete.', 'If the student draws straight-line ICs: Practice sketching convex curves for U = √X + √Y and U = X·Y, computing MRS.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } },
        { type: 'subpart', nodeId: 'c12_eco_cbse_02_006', difficulty: 'standard',
          question: 'The **budget line** (or price line) is the locus of all combinations of two.',
          hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c9_eco_ch1_3 (opportunity.',
          misconception: 'Students often believe that **the slope of the budget line is the Marginal Rate of Substitution (MRS)**.',
          parts: [
                { id: 'a', prompt: 'A consumer has an income of ₹1,200. The price of good X is ₹40 per unit and the price of good Y is ₹60 per unit.', answer: 'Budget line: 40X + 60Y = 1200',
                  options: ['Budget line: 40X + 60Y = 1200', 'budget set expands', 'both intercepts increase', '**the slope of the budget line is the Marginal Rate of Substitution (MRS)**'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c9_eco_ch1_3 (opportunity cost).',
                  misconception: 'Students often believe that **the slope of the budget line is the Marginal Rate of Substitution (MRS)**.' },
                { id: 'b', prompt: 'The budget line equation is 5x₁ + 10x₂ = 200. A student claims the slope is –5/10 = –0.5 and says this means "the consumer must give up 0.5 units of good 2.', answer: 'The slope value –5/10 = –0.5 is correct (slope = –P₁/P₂ = –5/10)',
                  options: ['The slope value –5/10 = –0.5 is correct (slope = –P₁/P₂ = –5/10)', 'budget set expands', 'both intercepts increase', '**the slope of the budget line is the Marginal Rate of Substitution (MRS)**'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c9_eco_ch1_3 (opportunity cost).',
                  misconception: 'Students often believe that **the slope of the budget line is the Marginal Rate of Substitution (MRS)**.' },
                { id: 'c', prompt: 'Arjun has ₹800 to spend on notebooks (₹40 each) and pens (₹20 each). He currently buys 10 notebooks and 15 pens. (a) Is this bundle affordable?', answer: 'Is this bundle affordable?',
                  options: ['Is this bundle affordable?', 'budget set expands', 'both intercepts increase', '**the slope of the budget line is the Marginal Rate of Substitution (MRS)**'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c9_eco_ch1_3 (opportunity cost).',
                  misconception: 'Students often believe that **the slope of the budget line is the Marginal Rate of Substitution (MRS)**.' },
                { id: 'd', prompt: 'Compare two budget lines for the same consumer: Line A: 2x₁ + 4x₂ = 100 Line B: 4x₁ + 8x₂ = 200 Are these two lines identical, parallel, or intersecting?', answer: 'Line B simplifies to 2x₁ + 4x₂ = 100 (divide by 2)',
                  options: ['Line B simplifies to 2x₁ + 4x₂ = 100 (divide by 2)', 'parallel', 'intersecting', 'budget set expands'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (slope-intercept form) and c9_eco_ch1_3 (opportunity cost).',
                  misconception: 'Students often believe that **the slope of the budget line is the Marginal Rate of Substitution (MRS)**.' }
          ],
            remediations: { 'the-slope-of-the-budget': { steps: ['If a student cannot correctly identify intercepts, slope, or shifts: 1.', '**Revisit coordinate geometry basics**: c9_math_ch2_5 (graph of linear equations) and c9_math_ch2_6 (slope-intercept.', '**Revisit Class 9 Economics**: c9_eco_ch1_3 (Choice and Opportunity Cost) — connect "giving up one good to get another".', '**Do a concrete numerical drill**: Take M = 100, P₁ = 10, P₂ = 5.'], labTask: { instruction: 'On the interactive: scrub to 80% through the era — what came before what? — then check.', widget: 'timeline', validate: 'timeline:year=80' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
