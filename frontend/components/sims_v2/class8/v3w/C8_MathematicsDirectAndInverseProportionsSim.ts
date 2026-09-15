import type { SimDef } from '../../engine/types';
import C8_MathematicsDirectAndInverseProportionsSim from '../../../simulations/c6_12/C8_MathematicsDirectAndInverseProportionsSim';

/** v3 wrapped master — C8_MathematicsDirectAndInverseProportionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicsdirectandinverseproportionssim: SimDef = {
    id: 'v3w_c8_mathematicsdirectandinverseproportionssim',
    title: 'Direct And Inverse Proportions',
    subtitle: 'This node covers the unitary method for direct proportion problems with whole numbers,.',
    classLevel: 8, subject: 'mathematics', topic: 'Unitary Method: Finding One Unit Then Scaling',
    chapters: [],
    nodeIds: ['c8_math_ch7_6', 'c8_math_ch7_8', 'c8_math_ch7_9', 'c8_math_ch10_1', 'c8_math_ch10_10', 'c8_math_ch10_6', 'c8_math_ch10_7', 'c8_math_ch10_9', 'c8_math_ch7_1', 'c8_math_ch7_4', 'c8_math_ch7_5', 'c8_math_ch7_7', 'c8_math_ch10_4', 'c8_math_ch10_5', 'c8_math_ch10_8'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you are at a vegetable market in Delhi: 3.5 kg of tomatoes cost ₹105.', goal: 'Master Direct And Inverse Proportions.' },
    discovery: {
        question: 'A car travels a fixed distance of 240 km. Explain why the speed of the car and the time taken are in inverse proportion, using the concept of constant product.',
        options: ['For a fixed distance, speed \\(\\times\\) time = distance (constant)', 'both change', 'any relationship'],
        answer: 'For a fixed distance, speed \\(\\times\\) time = distance (constant)',
        hook: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities,.',
    },
    teaching: [
        { title: 'The unitary method is a technique for.', text: 'The unitary method is a technique for solving proportional problems by first finding the value of a single unit from the given value of multiple units, then scaling that unit value to find the value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c8_math_ch7_6', title: 'The unitary method is a technique for.',
          scaffold: { problem: 'A school canteen buys 12.5 kg of rice for ₹625. They need to cook 3.2 kg for today\'s lunch. What is the cost of the rice used?',
            steps: [
            { text: 'Identify given values: Total quantity = 12.5 kg, Total cost = ₹625. Required quantity = 3.2 kg.' },
            { text: 'Find cost of 1 kg (unit value) by dividing total cost by total quantity: ₹625 ÷ 12.5.' },
            { text: 'Perform division: 625 ÷ 12.5 = 6250 ÷ 125 = 50. So, 1 kg costs ₹50.' },
            { text: 'Multiply unit cost by required quantity: ₹50 × 3.2 = ₹160.' },
            { text: 'Verify: 12.5 kg costs ₹625, so 3.2 kg (which is less than half) should cost less than ₹312.50. ₹160 is reasonable.', faded: true, blankAnswer: '₹160' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_8', title: 'Two quantities are in direct proportion.',
          scaffold: { problem: 'A car travels at a constant speed of 60 km/h. The distance travelled is directly proportional to the time taken.',
            steps: [
            { text: 'Identify the given pair to find the constant ratio. From the table, when time = 1 h, distance = 60 km.' },
            { text: 'Verify the constant with another pair. For time = 2 h, distance = 120 km: \\(\\frac{120}{2} = 60\\).' },
            { text: 'Write the algebraic relationship: Distance = 60 × Time, or \\(d = 60t\\).' },
            { text: 'Find missing values. For time = 5 h: \\(d = 60 \\times 5 = 300\\) km. For distance = 420 km: \\(t = \\frac{420}{60} = 7\\) h.' },
            { text: 'Complete the table and state the constant of proportionality with units: \\(k = 60\\) km/h.', faded: true, blankAnswer: 'Completed table: Time 5 h → 300 km; Distance 420 km → 7 h..' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_9', title: 'Direct proportion describes a.',
          scaffold: { problem: 'A school canteen uses 12 kg of rice to feed 96 students for one day. If 144 students are expected tomorrow, how many kg of rice are needed?',
            steps: [
            { text: 'Identify the quantities in direct proportion: number of students and kg of rice (more students → more rice).' },
            { text: 'Find the constant ratio (rice per student) using unitary method: 12 kg ÷ 96 students = 0.125 kg per student.' },
            { text: 'Calculate rice for 144 students: 0.125 kg/student × 144 students = 18 kg.' },
            { text: 'Calculate total cost: 18 kg × ₹45/kg = ₹810.' },
            { text: 'Verify: Ratio 96/12 = 8 students per kg; 144/18 = 8 students per kg. Ratio holds. Cost is reasonable.', faded: true, blankAnswer: '18 kg of rice, total cost ₹810.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_1', title: 'The cross-multiplication method states.',
          scaffold: { problem: 'A recipe for 6 people requires 2.5 kg of flour. How many kilograms of flour are needed for 15 people?',
            steps: [
            { text: 'Identify the known ratio (people : flour) = 6 : 2.5. The unknown ratio is 15 : x.' },
            { text: 'Apply cross-multiplication: Multiply numerator of first fraction by denominator of second (6 × x) and denominator of.' },
            { text: 'Solve for x using inverse operations. Divide both sides by 6: x = 37.5 / 6.' },
            { text: 'Compute the division: 37.5 ÷ 6 = 6.25. (Check: 6 × 6 = 36, remainder 1.5; 1.5/6 = 0.25).' },
            { text: 'Interpret result: 6.25 kg of flour needed. Verify by checking ratios: 6/2.5 = 2.4 and 15/6.25 = 2.4. Equal, so correct.', faded: true, blankAnswer: '6.25 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_10', title: 'Two quantities are in **direct.',
          scaffold: { problem: 'A contractor estimates that 5 workers can paint a school building in 18 days. Due to rain, only 3 workers are available.',
            steps: [
            { text: 'Identify the two quantities: Number of workers (W) and Number of days (D).' },
            { text: 'Determine the proportion type. Fewer workers (3 < 5) will take MORE days.' },
            { text: 'Write the inverse proportion equation: \\(W_1 \\times D_1 = W_2 \\times D_2\\).' },
            { text: 'Solve for \\(D_2\\): \\(90 = 3 \\times D_2 \\Rightarrow D_2 = 90 / 3 = 30\\).' },
            { text: 'Verify: 3 workers take 30 days. Product = \\(3 \\times 30 = 90\\) worker-days, matches original \\(5 \\times 18 = 90\\).', faded: true, blankAnswer: '30 days' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_6', title: 'Two quantities x and y are in direct.',
          scaffold: { problem: 'A car travels 180 km on 12 litres of petrol. Assuming direct proportion between distance and petrol used, find: (a) the distance the car.',
            steps: [
            { text: 'Identify given values — distance = 180 km, petrol = 12 litres. We need distance per litre (constant k).' },
            { text: 'Compute constant k = distance ÷ petrol = 180 ÷ 12 = 15 km per litre. This is the mileage.' },
            { text: 'Write the algebraic equation: d = k × p → d = 15p (distance = 15 × petrol in litres).' },
            { text: 'For part (c), substitute d = 450 into d = 15p → 450 = 15p → p = 450 ÷ 15 = 30 litres.' },
            { text: 'Verify: 30 litres × 15 km/litre = 450 km. Answer makes sense — more distance needs more petrol.', faded: true, blankAnswer: '(a) 15 km/litre, (b) d = 15p, (c) 30 litres' }
            ] } },
        { type: 'dissect', nodeId: 'c8_math_ch7_8', title: 'Identify each idea',
          dissect: { specimen: 'Direct And Inverse Proportions', spots: [
            { id: 's1', label: 'The unitary method is a', prompt: 'Which idea is this? — The unitary method is a technique for solving proportional problems by first finding the.', answer: 'The unitary method is a', options: ['The unitary method is a', 'Two quantities are in direct', 'Direct proportion describes a relationship', 'The cross-multiplication method states that'] },
            { id: 's2', label: 'Two quantities are in direct', prompt: 'Which idea is this? — Two quantities are in direct proportion if they increase or decrease together in such a.', answer: 'Two quantities are in direct', options: ['Two quantities are in direct', 'The unitary method is a', 'Direct proportion describes a relationship', 'The cross-multiplication method states that'] },
            { id: 's3', label: 'Direct proportion describes a relationship', prompt: 'Which idea is this? — Direct proportion describes a relationship between two quantities where an increase (or.', answer: 'Direct proportion describes a relationship', options: ['Direct proportion describes a relationship', 'The unitary method is a', 'Two quantities are in direct', 'The cross-multiplication method states that'] },
            { id: 's4', label: 'The cross-multiplication method states that', prompt: 'Which idea is this? — The cross-multiplication method states that if two ratios are equal (a proportion), the.', answer: 'The cross-multiplication method states that', options: ['The cross-multiplication method states that', 'The unitary method is a', 'Two quantities are in direct', 'Direct proportion describes a relationship'] },
            { id: 's5', label: 'Two quantities x and y', prompt: 'Which idea is this? — Two quantities x and y are in direct proportion if their ratio x/y remains constant,.', answer: 'Two quantities x and y', options: ['Two quantities x and y', 'The unitary method is a', 'Two quantities are in direct', 'Direct proportion describes a relationship'] }
          ] } }
    ],
    explore: { component: C8_MathematicsDirectAndInverseProportionsSim, prompt: 'Explore the interactive — Direct And Inverse Proportions' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch7_6', difficulty: 'standard',
          question: 'The unitary method is a technique for solving proportional problems by first.',
          hint: 'If stuck, review decimal division (c7_math_ch12_004, c7_math_ch12_005) and the concept of.',
          misconception: 'Students often incorrectly apply the unitary method to inverse proportion problems (e.g., "5 workers take 10 days to.',
          parts: [
                { id: 'a', prompt: 'Explain why dividing the total quantity by the number of units gives the correct value for one unit in a direct proportion situation.', answer: 'In direct proportion, the ratio between the two quantities is constant',
                  options: ['In direct proportion, the ratio between the two quantities is constant', 'because the formula says so'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often incorrectly apply the unitary method to inverse proportion problems (e.g., "5 workers take 10 days to build a wall.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['When a student makes this error, first ask: "If 5 workers take 10 days, would 1 worker take more or fewer days?" Guide.', 'Then ask: "Would 8 workers take more or fewer days than 1 worker?" This leads to 50 ÷ 8 = 6.25 days.', 'Emphasize: in direct proportion, both quantities change in the same direction (more workers → more work done in same.', 'Have them practice classifying problems as direct or inverse before applying the unitary method.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_8', difficulty: 'standard',
          question: 'Two quantities are in direct proportion if they increase or decrease together.',
          hint: 'Revisit equivalent ratios (c8_math_ch7_4) and unitary method (c8_math_ch7_6) to practice.',
          misconception: 'Students often believe that if two quantities both increase (or both decrease), they are in direct proportion.',
          parts: [
                { id: 'a', prompt: 'The table below shows values of \\(x\\) and \\(y\\). Explain why this relationship is NOT a direct proportion, even though both \\(x\\) and \\(y\\) increase.', answer: 'For direct proportion, \\(\\frac{y}{x}\\) must be constant',
                  options: ['For direct proportion, \\(\\frac{y}{x}\\) must be constant', 'it is direct proportion'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if two quantities both increase (or both decrease), they are in direct proportion.' }
          ],
            remediations: { 'if-two-quantities-both-increase': { steps: ['Ask the student to compute \\(\\frac{y}{x}\\) for every pair in the table and write the results in a new row.', 'Have them compare the values: "Are they all the same number?', 'If not, it\'s not direct proportion." 3.', 'Use a visual aid: plot the points on graph paper.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_9', difficulty: 'standard',
          question: 'Direct proportion describes a relationship between two quantities where an.',
          hint: 'Revisit c8_math_ch7_8 (Direct Proportion: Definition and Identification) and.',
          misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held.',
          parts: [
                { id: 'a', prompt: 'A recipe uses 3 cups of flour for 12 cookies. How many cups of flour are needed for 30 cookies? Solve using the proportion method.', answer: 'Let x be cups of flour for 30 cookies',
                  options: ['Let x be cups of flour for 30 cookies', 'more-more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' },
                { id: 'b', prompt: 'Compare these two situations: (A) 4 workers paint a wall in 6 hours. (B) 4 workers paint 2 walls in 6 hours.', answer: 'Neither',
                  options: ['Neither', 'more-more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' }
          ],
            remediations: { 'any-more-more-situation-is': { steps: ['Find parts per machine per hour = 300/(6×4) = 12.5.', 'For 9 machines in 6 hours: 12.5 × 9 × 6 = 675 parts. Emphasize: direct proportion applies only when exactly ONE.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_9', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held.',
          parts: [
                { id: 'a', prompt: 'A student solves: "8 metres of cloth cost ₹480. Find cost of 15 metres." Their working: 480 ÷ 8 = 60, then 60 × 15 = 900. Is this correct? Justify your answer.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'more-more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' },
                { id: 'b', prompt: 'Create a real-life problem (Indian context) that requires direct proportion to solve, involving at least two steps (e.g., first find the constant, then use it.', answer: 'Example problem: "A car uses 5 litres of petrol to travel 75 km',
                  options: ['Example problem: "A car uses 5 litres of petrol to travel 75 km', 'more-more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' },
                { id: 'c', prompt: 'Compare these two situations: (A) 4 workers paint a wall in 6 hours. (B) 4 workers paint 2 walls in 6 hours.', answer: 'Neither',
                  options: ['Neither', 'more-more'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' }
          ],
            remediations: { 'any-more-more-situation-is': { steps: ['Find parts per machine per hour = 300/(6×4) = 12.5.', 'For 9 machines in 6 hours: 12.5 × 9 × 6 = 675 parts. Emphasize: direct proportion applies only when exactly ONE.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_1', difficulty: 'standard',
          question: 'The cross-multiplication method states that if two ratios are equal (a.',
          hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice.',
          misconception: 'Students consistently multiply the two numerators together and the two denominators together (a×c = b×d) instead of.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cross-multiplication method states that if two ratios are equal (a proportion), the',
                  options: ['The cross-multiplication method states that if two ratios are equal (a proportion), the', 'The unitary method is a technique for solving proportional problems by first finding the', 'Two quantities are in direct proportion if they increase or decrease together in such a', 'Direct proportion describes a relationship between two quantities where an increase (or'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently multiply the two numerators together and the two denominators together (a×c = b×d) instead of cross-multiplying (a×d.' }
          ],
            remediations: { 'students-consistently-multiply-the-two': { steps: ['Draw the proportion as two fractions side by side.', 'Use a coloured pen to draw an X connecting numerator of first to denominator of second (extremes) and denominator of.', 'Say aloud: "Top-left times bottom-right equals bottom-left times top-right." 4.', 'Practice 5 problems where the unknown is in each of the four positions (top-left, bottom-left, top-right, bottom-right).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_10', difficulty: 'standard',
          question: 'Two quantities are in **direct proportion** if they change in the same.',
          hint: 'Revisit c8_math_ch10_6 (direct proportion tables) and c8_math_ch10_7 (inverse proportion.',
          misconception: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities,.',
          parts: [
                { id: 'a', prompt: 'State the defining condition for two quantities to be in (a) direct proportion and (b) inverse proportion. Use the terms "ratio" and "product" in your answer.', answer: 'direct proportion and (',
                  options: ['direct proportion and (', 'sum is constant'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities, even when the.' },
                { id: 'b', prompt: 'A car travels a fixed distance of 240 km. Explain why the speed of the car and the time taken are in inverse proportion, using the concept of constant product.', answer: 'For a fixed distance, speed \\(\\times\\) time = distance (constant)',
                  options: ['For a fixed distance, speed \\(\\times\\) time = distance (constant)', 'both change', 'any relationship'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities, even when the.' }
          ],
            remediations: { 'students-mechanically-apply-the-direct': { steps: ['Have the student draw an **arrow diagram**: Write the two quantities with an arrow showing change (e.g., Workers: \\(8.', 'No, \\(8 \\downarrow 6\\); Days: \\(12 \\rightarrow ?\\)).', 'Ask: "Do the arrows point the same way or opposite?" Same → Direct (use ratio).', 'Opposite → Inverse (use product).'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_6', difficulty: 'standard',
          question: 'Two quantities x and y are in direct proportion if their ratio x/y remains.',
          hint: 'Revisit c6_math_ch06_064 (Unitary Method) for unit rate calculation and c7_math_ch04_009.',
          misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.',
          parts: [
                { id: 'a', prompt: 'If 5 metres of cloth cost ₹350, what is the cost of 1 metre? Write the ratio that stays constant in this situation.', answer: 'Cost of 1 metre = ₹350 ÷ 5 = ₹70',
                  options: ['Cost of 1 metre = ₹350 ÷ 5 = ₹70', 'cost per metre', 'total cost for multiple metres'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.' },
                { id: 'b', prompt: 'A table shows: x = 2, 4, 6, 8 and y = 10, 20, 30, 40. Is y directly proportional to x? Explain how you know WITHOUT calculating every single ratio.', answer: 'Yes, y is directly proportional to x',
                  options: ['Yes, y is directly proportional to x', 'yes because both increase', 'both go up'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.' },
                { id: 'c', prompt: 'Two students fill a table for direct proportion: x = 3, 6, 9 and y = 12, 24, 36. Student A says k = 4. Student B says k = 1/4. Who is correct?', answer: 'Student A is correct: y/x = 12/3 = 24/6 = 36/9 = 4, so y = 4x',
                  options: ['Student A is correct: y/x = 12/3 = 24/6 = 36/9 = 4, so y = 4x', 'both are correct'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly assume ANY table where both columns increase together shows direct proportion.' }
          ],
            remediations: { 'students-incorrectly-assume-any-table': { steps: ['First, have the student compute y/x for EVERY row in the table and write the results in a third column.', 'Ask: "Are all these numbers exactly the same?" If not, it\'s not direct proportion.', 'Then show a counter-example: x: 1,2,3,4 and y: 2,4,6,8 (ratio 2,2,2,2) vs x: 1,2,3,4 and y: 3,5,7,9 (ratio 3, 2.5,.', 'Emphasize: "Direct proportion means MULTIPLYING by the same number, not adding the same number." Practice with 3.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
