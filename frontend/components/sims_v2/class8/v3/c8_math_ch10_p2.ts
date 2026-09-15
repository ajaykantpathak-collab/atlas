import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch10_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch10_p2: SimDef = {
    id: 'v3_c8_math_ch10_p2',
    title: 'Proportional Reasoning-2 · Part 2/2',
    subtitle: 'Two equal ratios, one diagonal trick',
    classLevel: 8, subject: 'mathematics', topic: 'Proportional Reasoning-2 · Part 2/2',
    chapters: ['c8_math_ch10'],
    nodeIds: ['c8_math_ch10_6', 'c8_math_ch10_7', 'c8_math_ch10_8', 'c8_math_ch10_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a proportion problem-solver', intro: 'Prices, fuel, distances — whenever one ratio equals another, a hidden equation is waiting. Learn to set it up and crack it open with a single cross.', goal: 'Apply cross-multiplication (a/b = c/d ⟹ ad = bc) to solve proportions and word problems, understand why it works, and verify answers.' },
    discovery: {
        question: '3 notebooks cost ₹45. How much for 7? Instead of finding one notebook\'s price, write 3/45 = 7/x — then what unlocks x?',
        options: ['Cross-multiply: 3x = 45 × 7 = 315, so x = ₹105 — diagonals of equal ratios always multiply to the same product', 'Multiply the top numbers together: 3 × 7 = 21', 'Add 45 + 7 = 52', 'Divide 45 by 7 to get the price of one'],
        answer: 'Cross-multiply: 3x = 45 × 7 = 315, so x = ₹105 — diagonals of equal ratios always multiply to the same product',
        hook: 'It\'s not magic — multiplying both sides of a/b = c/d by bd just wipes the denominators, leaving ad = bc. The classic crash: multiplying the two tops and two bottoms together instead of crossing diagonally.',
    },
    teaching: [
        { title: 'Direct Proportion: Tabular and Algebraic Representation', text: 'Two quantities x and y are in direct proportion if their ratio x/y remains constant, meaning y = kx where k is the constant of proportionality.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch10_6', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Set up proportions from real situations — notebooks, petrol per kilometre, map distances — cross-multiply to solve, verify by plugging back, and catch the numerator-times-numerator mistake before it catches you.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_6', title: 'Direct Proportion: Tabular and Algebraic Representation',
          scaffold: { problem: 'A car travels 180 km on 12 litres of petrol. Assuming direct proportion between distance and petrol used, find: (a) the distance the car.',
            steps: [
            { text: 'Identify given values — distance = 180 km, petrol = 12 litres. We need distance per litre (constant k).' },
            { text: 'Compute constant k = distance ÷ petrol = 180 ÷ 12 = 15 km per litre. This is the mileage.' },
            { text: 'Write the algebraic equation: d = k × p → d = 15p (distance = 15 × petrol in litres).' },
            { text: 'For part (c), substitute d = 450 into d = 15p → 450 = 15p → p = 450 ÷ 15 = 30 litres.' },
            { text: 'Verify: 30 litres × 15 km/litre = 450 km. Answer makes sense — more distance needs more petrol.', faded: true, blankAnswer: '(a) 15 km/litre, (b) d = 15p, (c) 30 litres' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_7', title: 'Inverse Proportion: Definition and Identification',
          scaffold: { problem: 'A farmer has enough cattle feed to last 20 cows for 30 days. If he buys 10 more cows, how many days will the feed last?',
            steps: [
            { text: 'Identify the two quantities: number of cows and number of days the feed lasts.' },
            { text: 'Verify using constant product. Total feed amount (cow-days) is fixed.' },
            { text: 'New number of cows = 20 + 10 = 30 cows. Let the feed last \\(d\\) days. By inverse proportion, 30 × \\(d\\) = 600.' },
            { text: 'Solve for \\(d\\): \\(d = 600 / 30 = 20\\) days.' },
            { text: 'Interpret: The feed will last 20 days. Check: 30 cows × 20 days = 600 cow-days (constant).', faded: true, blankAnswer: '20 days' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_8', title: 'Inverse Proportion: Tabular and Algebraic Representation',
          scaffold: { problem: 'A school has 20 classrooms each with 40 desks. If they rearrange to have 25 desks per classroom, how many classrooms will be needed?',
            steps: [
            { text: 'Identify the two quantities: number of classrooms (\\(c\\)) and desks per classroom (\\(d\\)).' },
            { text: 'Find the constant product \\(k = c \\times d = 20 \\times 40 = 800\\) desks.' },
            { text: 'Write the inverse proportion equation: \\(c \\times d = 800\\) or \\(c = \\frac{800}{d}\\).' },
            { text: 'Substitute the new desks per classroom \\(d = 25\\): \\(c = \\frac{800}{25} = 32\\).' },
            { text: 'Interpret: 32 classrooms are needed. Verify: \\(32 \\times 25 = 800\\) desks, matches total.', faded: true, blankAnswer: '32 classrooms' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_9', title: 'Applications of Inverse Proportion in Real Life',
          scaffold: { problem: 'A contractor estimates that 18 workers can build a wall in 24 days. Due to an urgent deadline, the wall must be completed in 16 days.',
            steps: [
            { text: 'Identify the inversely proportional quantities: number of workers (W) and number of days (D).' },
            { text: 'Write down known values: W₁ = 18 workers, D₁ = 24 days, D₂ = 16 days. Find W₂.' },
            { text: 'Set up inverse proportion equation: W₁ × D₁ = W₂ × D₂ → 18 × 24 = W₂ × 16.' },
            { text: 'Compute: 432 = 16 × W₂ → W₂ = 432 ÷ 16 = 27 workers.' },
            { text: 'Answer the question asked: Additional workers needed = 27 - 18 = 9 workers.', faded: true, blankAnswer: '9 additional workers must be hired.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch10_9', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch10_6', title: 'Use it in the wild',
          caseStudy: { intro: 'A scooter covers 180 km on 12 litres of petrol. To find fuel needed for 270 km, Nikhil sets up 180/12 = 270/x, then multiplies numerators and denominators: 180 × 270 = 12x, getting x = 4,050 litres.',
            decisions: [{ prompt: 'What did he multiply wrongly?', options: [
                { text: 'Cross-multiplication pairs each numerator with the opposite denominator: 180 × x = 12 × 270, so x = 18 litres. He paired numerator with numerator, producing a physically absurd answer that a sanity check — 270 km cannot need 4,050 litres — would have caught.', outcome: 'This restores the diagonal pattern of extremes and means and shows why checking reasonableness matters after the mechanics.' },
                { text: 'His method was correct; the error is only arithmetic — 4,050 should be 4.05 litres.', outcome: 'The pairing itself was wrong, not just the arithmetic; multiplying the same-position terms is not cross-multiplication at all.', reveals: 'straight-across-pairs' },
                { text: 'The proportion cannot be solved at all while x sits in the denominator — he should have given up.', outcome: 'An unknown in the denominator is routine: clearing it by cross-multiplication isolates x normally once the correct pairs are multiplied.', reveals: 'denominator-unknown-impossible' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch10_9', title: 'You made it',
          caseStudy: { intro: 'When two ratios are equal, the diagonal products are equal: ad = bc. That one move turns a proportion puzzle into a one-line equation — no unitary detour needed.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch10_6', difficulty: 'standard',
          question: 'Two quantities x and y are in direct proportion if their ratio x/y remains.',
          hint: 'Revisit c6_math_ch06_064 (Unitary Method) for unit rate calculation and c7_math_ch04_009.',
          misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.',
          parts: [
                { id: 'a', prompt: 'If 5 metres of cloth cost ₹350, what is the cost of 1 metre? Write the ratio that stays constant in this situation.', answer: 'Cost of 1 metre = ₹350 ÷ 5 = ₹70',
                  options: ['Cost of 1 metre = ₹350 ÷ 5 = ₹70', 'cost per metre', 'total cost for multiple metres'],
                  hint: 'Revisit c6_math_ch06_064 (Unitary Method) for unit rate calculation and c7_math_ch04_009.',
                  misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.' },
                { id: 'b', prompt: 'A table shows: x = 2, 4, 6, 8 and y = 10, 20, 30, 40. Is y directly proportional to x? Explain how you know WITHOUT calculating every single ratio.', answer: 'Yes, y is directly proportional to x',
                  options: ['Yes, y is directly proportional to x', 'yes because both increase', 'both go up', 'go up at the same rate'],
                  hint: 'Revisit c6_math_ch06_064 (Unitary Method) for unit rate calculation and c7_math_ch04_009.',
                  misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.' },
                { id: 'c', prompt: 'Two students fill a table for direct proportion: x = 3, 6, 9 and y = 12, 24, 36. Student A says k = 4. Student B says k = 1/4. Who is correct?', answer: 'Student A is correct: y/x = 12/3 = 24/6 = 36/9 = 4, so y = 4x',
                  options: ['Student A is correct: y/x = 12/3 = 24/6 = 36/9 = 4, so y = 4x', 'both are correct'],
                  hint: 'Revisit c6_math_ch06_064 (Unitary Method) for unit rate calculation and c7_math_ch04_009.',
                  misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.' }
          ],
            remediations: { 'students-incorrectly-assume-any-table': { steps: ['First, have the student compute y/x for EVERY row in the table and write the results in a third column.', 'Ask: "Are all these numbers exactly the same?" If not, it\'s not direct proportion.', 'Then show a counter-example: x: 1,2,3,4 and y: 2,4,6,8 (ratio 2,2,2,2) vs x: 1,2,3,4 and y: 3,5,7,9 (ratio 3, 2.5.', 'Emphasize: "Direct proportion means MULTIPLYING by the same number, not adding the same number." Practice with 3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_7', difficulty: 'standard',
          question: 'Two quantities are in inverse proportion if an increase in one quantity causes.',
          hint: 'Revisit c6_math_ch06_066 (Inverse Proportion) for the unitary method intuition and.',
          misconception: 'Students apply the direct proportion check (constant ratio) to inverse proportion situations.',
          parts: [
                { id: 'a', prompt: 'Explain why the product of two inversely proportional quantities remains constant, using the example of speed and time for a fixed distance.', answer: 'For a fixed distance, distance = speed × time',
                  options: ['For a fixed distance, distance = speed × time', 'because they are opposite'],
                  hint: 'Revisit c6_math_ch06_066 (Inverse Proportion) for the unitary method intuition and c8_math_ch10_6.',
                  misconception: 'Students apply the direct proportion check (constant ratio) to inverse proportion situations.' }
          ],
            remediations: { 'students-apply-the-direct-proportion': { steps: ['Give the student a table with 3-4 pairs from a known inverse situation (e.g., workers and days: (2,18), (3,12), (6,6)).', 'Ask them to compute BOTH the ratio \\(x/y\\) and the product \\(x \\times y\\) for each pair.', 'Explicitly point: "Look, the ratio changes (9, 4, 1) but the product stays 36.', 'In inverse proportion, we multiply; in direct, we divide." 4.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students apply the direct proportion check (constant ratio) to inverse proportion situations.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If \\(x\\) and \\(y\\) are inversely proportional, then when \\(x\\) becomes 3 times larger, \\(y\\) becomes 3 times smaller." Is this statement.', answer: 'Yes, the statement is correct',
                  options: ['Yes, the statement is correct', 'y becomes 1/3 of original', 'y decreases by 3', '3 times smaller'],
                  hint: 'Revisit c6_math_ch06_066 (Inverse Proportion) for the unitary method intuition and c8_math_ch10_6.',
                  misconception: 'Students apply the direct proportion check (constant ratio) to inverse proportion situations.' }
          ],
            remediations: { 'students-apply-the-direct-proportion': { steps: ['Give the student a table with 3-4 pairs from a known inverse situation (e.g., workers and days: (2,18), (3,12), (6,6)).', 'Ask them to compute BOTH the ratio \\(x/y\\) and the product \\(x \\times y\\) for each pair.', 'Explicitly point: "Look, the ratio changes (9, 4, 1) but the product stays 36.', 'In inverse proportion, we multiply; in direct, we divide." 4.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_8', difficulty: 'standard',
          question: 'In inverse proportion, two quantities vary such that their product remains.',
          hint: 'Review c8_math_ch10_7 (inverse proportion definition) and c7_math_ch15_003 (solving.',
          misconception: 'Students often write the equation as \\(y = kx\\) (direct proportion) instead of \\(y = k/x\\) or \\(xy = k\\).',
          parts: [
                { id: 'a', prompt: 'Explain why the equation \\(y = \\frac{k}{x}\\) represents inverse proportion, and describe what happens to \\(y\\) when \\(x\\) is doubled.', answer: 'The equation \\(y = k/x\\) shows that \\(y\\) is the constant \\(k\\) divided by \\(x\\)',
                  options: ['The equation \\(y = k/x\\) shows that \\(y\\) is the constant \\(k\\) divided by \\(x\\)', '\\(y\\) also doubles', 'it is direct proportion or does not understand the reciprocal relationship'],
                  hint: 'Review c8_math_ch10_7 (inverse proportion definition) and c7_math_ch15_003 (solving linear.',
                  misconception: 'Students often write the equation as \\(y = kx\\) (direct proportion) instead of \\(y = k/x\\) or \\(xy = k\\).' }
          ],
            remediations: { 'students-often-write-the-equation': { steps: ['Remediation: 1) Have the student physically model with counters: "6 workers × 10 days = 60 worker-days".', '2) Ask: "If we double workers to 12, what happens to days?', '3) Show the product stays 60.', '4) Contrast with direct proportion: "If 6 workers earn ₹600 in 10 days, what do 12 workers earn in 10 days?" (double.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_9', difficulty: 'standard',
          question: 'Two quantities are in inverse proportion when an increase in one quantity.',
          hint: 'Revisit c8_math_ch10_8 (algebraic representation of inverse proportion) and.',
          misconception: 'Students treat inverse proportion as direct proportion by setting up fractions incorrectly: writing x₁/y₁ = x₂/y₂.',
          parts: [
                { id: 'a', prompt: 'If 8 machines can complete a task in 15 days, how many machines are needed to complete the same task in 10 days? State the inverse proportion relationship used.', answer: 'The inverse proportion relationship is machines × days = constant',
                  options: ['The inverse proportion relationship is machines × days = constant', 'more machines means more days, failing to recognise the inverse relationship'],
                  hint: 'Revisit c8_math_ch10_8 (algebraic representation of inverse proportion) and c7_math_ch15_003.',
                  misconception: 'Students treat inverse proportion as direct proportion by setting up fractions incorrectly: writing x₁/y₁ = x₂/y₂ instead of x₁y₁ = x₂y₂.' },
                { id: 'b', prompt: 'Explain why the relationship between the number of workers and the time taken to complete a fixed job is an inverse proportion, using the concept of "total.', answer: 'Total work = number of workers × time taken',
                  options: ['Total work = number of workers × time taken', 'more workers work faster so time increases'],
                  hint: 'Revisit c8_math_ch10_8 (algebraic representation of inverse proportion) and c7_math_ch15_003.',
                  misconception: 'Students treat inverse proportion as direct proportion by setting up fractions incorrectly: writing x₁/y₁ = x₂/y₂ instead of x₁y₁ = x₂y₂.' }
          ],
            remediations: { 'students-treat-inverse-proportion-as': { steps: ['Have the student physically model with counters: "6 workers × 10 days = 60 worker-days total work.', 'Now group them into 15 equal piles for 15 workers.', 'How many in each pile?" Count the piles: 4.', 'Then translate to equation: 6 × 10 = 15 × d.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
