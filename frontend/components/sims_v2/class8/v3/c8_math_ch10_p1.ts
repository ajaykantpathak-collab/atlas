import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch10_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch10_p1: SimDef = {
    id: 'v3_c8_math_ch10_p1',
    title: 'Proportional Reasoning-2 · Part 1/2',
    subtitle: 'Two equal ratios, one diagonal trick',
    classLevel: 8, subject: 'mathematics', topic: 'Proportional Reasoning-2 · Part 1/2',
    chapters: ['c8_math_ch10'],
    nodeIds: ['c8_math_ch10_1', 'c8_math_ch10_10', 'c8_math_ch10_2', 'c8_math_ch10_3', 'c8_math_ch10_4', 'c8_math_ch10_5'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a proportion problem-solver', intro: 'Prices, fuel, distances — whenever one ratio equals another, a hidden equation is waiting. Learn to set it up and crack it open with a single cross.', goal: 'Apply cross-multiplication (a/b = c/d ⟹ ad = bc) to solve proportions and word problems, understand why it works, and verify answers.' },
    discovery: {
        question: '3 notebooks cost ₹45. How much for 7? Instead of finding one notebook\'s price, write 3/45 = 7/x — then what unlocks x?',
        options: ['Cross-multiply: 3x = 45 × 7 = 315, so x = ₹105 — diagonals of equal ratios always multiply to the same product', 'Multiply the top numbers together: 3 × 7 = 21', 'Add 45 + 7 = 52', 'Divide 45 by 7 to get the price of one'],
        answer: 'Cross-multiply: 3x = 45 × 7 = 315, so x = ₹105 — diagonals of equal ratios always multiply to the same product',
        hook: 'It\'s not magic — multiplying both sides of a/b = c/d by bd just wipes the denominators, leaving ad = bc. The classic crash: multiplying the two tops and two bottoms together instead of crossing diagonally.',
    },
    teaching: [
        { title: 'Proportionality Recap: Cross-Multiplication Method', text: 'The cross-multiplication method states that if two ratios are equal (a proportion), the product of the extremes equals the product of the means.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch10_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Set up proportions from real situations — notebooks, petrol per kilometre, map distances — cross-multiply to solve, verify by plugging back, and catch the numerator-times-numerator mistake before it catches you.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_1', title: 'Proportionality Recap: Cross-Multiplication Method',
          scaffold: { problem: 'A recipe for 6 people requires 2.5 kg of flour. How many kilograms of flour are needed for 15 people?',
            steps: [
            { text: 'Identify the known ratio (people : flour) = 6 : 2.5. The unknown ratio is 15 : x.' },
            { text: 'Apply cross-multiplication: Multiply numerator of first fraction by denominator of second (6 × x) and denominator.' },
            { text: 'Solve for x using inverse operations. Divide both sides by 6: x = 37.5 / 6.' },
            { text: 'Compute the division: 37.5 ÷ 6 = 6.25. (Check: 6 × 6 = 36, remainder 1.5; 1.5/6 = 0.25).' },
            { text: 'Interpret result: 6.25 kg of flour needed. Verify by checking ratios: 6/2.5 = 2.4 and 15/6.25 = 2.4. Equal, so correct.', faded: true, blankAnswer: '6.25 kg' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_10', title: 'Distinguishing Direct and Inverse Proportion',
          scaffold: { problem: 'A contractor estimates that 5 workers can paint a school building in 18 days. Due to rain, only 3 workers are available.',
            steps: [
            { text: 'Identify the two quantities: Number of workers (W) and Number of days (D).' },
            { text: 'Determine the proportion type. Fewer workers (3 < 5) will take MORE days.' },
            { text: 'Write the inverse proportion equation: \\(W_1 \\times D_1 = W_2 \\times D_2\\).' },
            { text: 'Solve for \\(D_2\\): \\(90 = 3 \\times D_2 \\Rightarrow D_2 = 90 / 3 = 30\\).' },
            { text: 'Verify: 3 workers take 30 days. Product = \\(3 \\times 30 = 90\\) worker-days, matches original \\(5 \\times 18 = 90\\).', faded: true, blankAnswer: '30 days' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_2', title: 'Ratios in Maps: Representative Fraction (RF)',
          scaffold: { problem: 'A map of Maharashtra has the statement scale "1 cm = 12 km". Convert this to a Representative Fraction in standard form 1:n.',
            steps: [
            { text: 'Identify the given statement scale: 1 cm on map = 12 km on ground.' },
            { text: 'Convert ground distance to the same unit as map distance (cm): 12 km = 12 × 1000 m = 12,000 m = 12,000 × 100.' },
            { text: 'Write the RF as a ratio of map distance to ground distance in cm: 1 cm : 1,200,000 cm = 1:1,200,000.' },
            { text: 'Use the RF to find actual distance for 8.5 cm map distance: Actual distance in cm = 8.5 × 1,200,000 = 10,200,000 cm.' },
            { text: 'Convert actual distance back to km: 10,200,000 cm ÷ 100,000 = 102 km.', faded: true, blankAnswer: 'RF = 1:1,200,000; Actual distance = 102 km' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_3', title: 'Calculating Actual Distances from Map Scales',
          scaffold: { problem: 'On a map of Rajasthan with RF 1 : 2,000,000, the distance between Jaipur and Jodhpur measures 3.6 cm.',
            steps: [
            { text: 'Identify given values: RF = 1 : 2,000,000, map distance = 3.6 cm. Required: actual distance in km.' },
            { text: 'Write the proportion: map distance / actual distance = 1 / 2,000,000.' },
            { text: 'Multiply: 3.6 × 2,000,000 = 7,200,000 cm. (3.6 × 2 = 7.2; append six zeros → 7,200,000)' },
            { text: 'Convert cm to km: 1 km = 100,000 cm. Divide 7,200,000 by 100,000 = 72 km. (Cancel five zeros: 7,200,000 / 100,000 = 72)' },
            { text: 'Interpret: The actual straight-line distance between Jaipur and Jodhpur on this map scale is 72 km.', faded: true, blankAnswer: '72 km' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_4', title: 'Ratios with More Than Two Terms: Multi-Term Ratios',
          scaffold: { problem: 'A school allocates ₹48,000 for prizes in three categories — Academics, Sports, and Arts — in the ratio 5:3:2.',
            steps: [
            { text: 'Identify the given ratio 5:3:2 and the total amount ₹48,000.' },
            { text: 'Find the total number of parts by adding the ratio terms: 5 + 3 + 2 = 10 parts.' },
            { text: 'Calculate the value of one part: ₹48,000 ÷ 10 = ₹4,800.' },
            { text: 'Multiply each ratio term by the value of one part: Academics = 5 × ₹4,800 = ₹24,000; Sports = 3 × ₹4,800 = ₹14,400.' },
            { text: 'Verify by adding the amounts: ₹24,000 + ₹14,400 + ₹9,600 = ₹48,000. The sum matches the total.', faded: true, blankAnswer: 'Academics ₹24,000, Sports ₹14,400, Arts ₹9,600.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch10_5', title: 'Sharing Quantities in a Given Ratio',
          scaffold: { problem: 'A father wants to divide ₹15,000 among his three children in the ratio of their ages: 10 years, 15 years, and 20 years.',
            steps: [
            { text: 'Write the ratio from the given ages: 10:15:20. Simplify by dividing by 5 to get 2:3:4.' },
            { text: 'Find the sum of the simplified ratio terms: 2 + 3 + 4 = 9 parts.' },
            { text: 'Calculate the value of one part: Total amount ÷ Total parts = ₹15,000 ÷ 9 = ₹1,666.67 (approx).' },
            { text: 'Compute each share by multiplying the ratio term by the value of one part:' },
            { text: 'Verify: ₹3,333.33 + ₹5,000 + ₹6,666.67 = ₹15,000. Answer in rupees.', faded: true, blankAnswer: '1st child ≈ ₹3,333.33, 2nd child = ₹5,000, 3rd child ≈.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch10_5', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch10_1', title: 'Use it in the wild',
          caseStudy: { intro: 'A scooter covers 180 km on 12 litres of petrol. To find fuel needed for 270 km, Nikhil sets up 180/12 = 270/x, then multiplies numerators and denominators: 180 × 270 = 12x, getting x = 4,050 litres.',
            decisions: [{ prompt: 'What did he multiply wrongly?', options: [
                { text: 'Cross-multiplication pairs each numerator with the opposite denominator: 180 × x = 12 × 270, so x = 18 litres. He paired numerator with numerator, producing a physically absurd answer that a sanity check — 270 km cannot need 4,050 litres — would have caught.', outcome: 'This restores the diagonal pattern of extremes and means and shows why checking reasonableness matters after the mechanics.' },
                { text: 'His method was correct; the error is only arithmetic — 4,050 should be 4.05 litres.', outcome: 'The pairing itself was wrong, not just the arithmetic; multiplying the same-position terms is not cross-multiplication at all.', reveals: 'straight-across-pairs' },
                { text: 'The proportion cannot be solved at all while x sits in the denominator — he should have given up.', outcome: 'An unknown in the denominator is routine: clearing it by cross-multiplication isolates x normally once the correct pairs are multiplied.', reveals: 'denominator-unknown-impossible' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch10_5', title: 'The bigger picture',
          caseStudy: { intro: 'When two ratios are equal, the diagonal products are equal: ad = bc. That one move turns a proportion puzzle into a one-line equation — no unitary detour needed.',
            decisions: [{ prompt: 'What comes next? Proportional Reasoning-2 · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Proportional Reasoning-2 · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch10_1', difficulty: 'standard',
          question: 'The cross-multiplication method states that if two ratios are equal (a.',
          hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice.',
          misconception: 'Students consistently multiply the two numerators together and the two denominators together (a×c = b×d) instead.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The cross-multiplication method states that if two ratios are equal (a proportion), the',
                  options: ['The cross-multiplication method states that if two ratios are equal (a proportion), the', 'Two quantities are in **direct proportion** if they change in the same direction (both', 'A Representative Fraction (RF) is a unitless ratio expressing map scale as the', 'Calculating actual distances from map scales uses the Representative Fraction (RF) or'],
                  hint: 'If stuck, revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) to practice identifying and.',
                  misconception: 'Students consistently multiply the two numerators together and the two denominators together (a×c = b×d) instead of cross-multiplying (a×d.' }
          ],
            remediations: { 'students-consistently-multiply-the-two': { steps: ['Draw the proportion as two fractions side by side.', 'Use a coloured pen to draw an X connecting numerator of first to denominator of second (extremes) and denominator.', 'Say aloud: "Top-left times bottom-right equals bottom-left times top-right." 4.', 'Practice 5 problems where the unknown is in each of the four positions (top-left, bottom-left, top-right, bottom-right).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_10', difficulty: 'standard',
          question: 'Two quantities are in **direct proportion** if they change in the same.',
          hint: 'Revisit c8_math_ch10_6 (direct proportion tables) and c8_math_ch10_7 (inverse proportion.',
          misconception: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities.',
          parts: [
                { id: 'a', prompt: 'State the defining condition for two quantities to be in (a) direct proportion and (b) inverse proportion. Use the terms "ratio" and "product" in your answer.', answer: 'direct proportion and (',
                  options: ['direct proportion and (', 'sum is constant', 'sum is constant" or confusing ratio/product'],
                  hint: 'Revisit c8_math_ch10_6 (direct proportion tables) and c8_math_ch10_7 (inverse proportion.',
                  misconception: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities, even when the.' },
                { id: 'b', prompt: 'A car travels a fixed distance of 240 km. Explain why the speed of the car and the time taken are in inverse proportion, using the concept of constant product.', answer: 'For a fixed distance, speed \\(\\times\\) time = distance (constant)',
                  options: ['For a fixed distance, speed \\(\\times\\) time = distance (constant)', 'both change', 'any relationship', 'proportional relationship'],
                  hint: 'Revisit c8_math_ch10_6 (direct proportion tables) and c8_math_ch10_7 (inverse proportion.',
                  misconception: 'Students mechanically apply the direct proportion formula \\(x_1/y_1 = x_2/y_2\\) to *every* problem with two quantities, even when the.' }
          ],
            remediations: { 'students-mechanically-apply-the-direct': { steps: ['Have the student draw an **arrow diagram**: Write the two quantities with an arrow showing change (e.g., Workers: \\(8.', 'No, \\(8 \\downarrow 6\\); Days: \\(12 \\rightarrow ?\\)).', 'Ask: "Do the arrows point the same way or opposite?" Same → Direct (use ratio).', 'Opposite → Inverse (use product).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_2', difficulty: 'standard',
          question: 'A Representative Fraction (RF) is a unitless ratio expressing map scale as the.',
          hint: 'Review metric length conversions (km → m → cm) and practice simplifying ratios with large.',
          misconception: 'Students write RF as 1:4000 for "1 cm = 4 km" by converting 4 km to 4000 m and pairing 1 cm with 4000 m.',
          parts: [
                { id: 'a', prompt: 'Two maps of the same city have RFs 1:20,000 and 1:100,000. Which map will show a larger area of the city on the same size paper? Which will show more detail?', answer: 'The 1:100,000 map shows a larger area',
                  options: ['The 1:100,000 map shows a larger area', 'smaller denominator = larger scale'],
                  hint: 'Review metric length conversions (km → m → cm) and practice simplifying ratios with large numbers.',
                  misconception: 'Students write RF as 1:4000 for "1 cm = 4 km" by converting 4 km to 4000 m and pairing 1 cm with 4000 m.' }
          ],
            remediations: { 'students-write-rf-as-1': { steps: ['Make the student write the statement scale with units: "1 cm = 4 km".', 'Ask: "What are the units on the left?', 'What are the units on the right?" (cm and km).', 'Say: "For RF, both must be in the SAME unit.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_3', difficulty: 'standard',
          question: 'Calculating actual distances from map scales uses the Representative Fraction.',
          hint: 'Revisit decimal multiplication (c7_math_ch12_002) and metric conversion ladder.',
          misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000.',
          parts: [
                { id: 'a', prompt: 'Two maps show the same region. Map A has RF 1 : 100,000. Map B has RF 1 : 200,000. On Map A, a road measures 5 cm. On Map B, the same road measures 2.5 cm.', answer: 'Correct answer: The product of map distance and RF denominator is invariant',
                  options: ['Correct answer: The product of map distance and RF denominator is invariant', 'because the scales are different', 'because 5 cm is double 2.5 cm', 'says "because the scales are different" or "because 5 cm is double 2'],
                  hint: 'Revisit decimal multiplication (c7_math_ch12_002) and metric conversion ladder (c7_math_ch03_005).',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['If a student makes this error, have them physically measure 1 cm on a ruler, then walk 100,000 cm (1 km) on the school.', 'Then guide them through a three-column table: Map Distance (cm) | Actual Distance (cm) | Actual Distance (km).', 'Fill row by row: 1 cm → 50,000 cm → 0.5 km; 2 cm → 100,000 cm → 1 km; 3 cm → 150,000 cm → 1.5 km.', 'Emphasise that the RF gives centimetres, and the ÷100,000 step is mandatory for kilometres.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_3', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000.',
          parts: [
                { id: 'a', prompt: 'A student solves this problem: "Map scale 1 : 50,000. Map distance = 8 cm. Find actual distance in metres." Their working: 8 × 50,000 = 400,000 cm.', answer: 'Correct evaluation: Yes, the method and answer are correct',
                  options: ['Correct evaluation: Yes, the method and answer are correct', 'incorrect because you should divide by 1000'],
                  hint: 'Revisit decimal multiplication (c7_math_ch12_002) and metric conversion ladder (c7_math_ch03_005).',
                  misconception: 'Students treat the RF denominator as if it already contains the target unit (e.g., "1 : 50,000 means 1 cm = 50,000 km").' }
          ],
            remediations: { 'students-treat-the-rf-denominator': { steps: ['If a student makes this error, have them physically measure 1 cm on a ruler, then walk 100,000 cm (1 km) on the school.', 'Then guide them through a three-column table: Map Distance (cm) | Actual Distance (cm) | Actual Distance (km).', 'Fill row by row: 1 cm → 50,000 cm → 0.5 km; 2 cm → 100,000 cm → 1 km; 3 cm → 150,000 cm → 1.5 km.', 'Emphasise that the RF gives centimetres, and the ÷100,000 step is mandatory for kilometres.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_4', difficulty: 'standard',
          question: 'A multi-term ratio compares three or more quantities of the same kind, written.',
          hint: 'Revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) and c7_math_ch11_002 (HCF).',
          misconception: 'Students often try to simplify a multi-term ratio by cancelling common factors between **pairs** of terms sequentially.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A multi-term ratio compares three or more quantities of the same kind, written as',
                  options: ['A multi-term ratio compares three or more quantities of the same kind, written as', 'The cross-multiplication method states that if two ratios are equal (a proportion), the', 'Two quantities are in **direct proportion** if they change in the same direction (both', 'A Representative Fraction (RF) is a unitless ratio expressing map scale as the'],
                  hint: 'Revisit c6_math_ch06_063 (Equivalent Ratios and Proportion) and c7_math_ch11_002 (HCF) to practice.',
                  misconception: 'Students often try to simplify a multi-term ratio by cancelling common factors between **pairs** of terms sequentially (e.g., for 12:18:30.' }
          ],
            remediations: { 'students-often-try-to-simplify': { steps: ['If a student simplifies pairwise, write the three terms vertically and circle the common factors of all three numbers.', 'Ask: "What number divides 12, 18, and 30 exactly?" Guide them to find HCF = 6.', 'Then show: 12÷6=2, 18÷6=3, 30÷6=5 → 2:3:5.', 'Emphasise: "One division step for all terms." Practice with 2-3 more examples where pairwise cancellation gives.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch10_5', difficulty: 'standard',
          question: 'Sharing a quantity in a given ratio means dividing a total amount into parts.',
          hint: 'If stuck, revisit the unitary method (c6_math_ch06_064) with simple two-term ratios and.',
          misconception: 'Students often treat the ratio numbers as the actual shares (e.g., for ratio 2:3 and total 500, they say shares are 2.',
          parts: [
                { id: 'a', prompt: 'What is the first step when sharing a quantity in a given ratio like 3:5:7?', answer: 'The first step is to find the sum of the ratio terms (3+5+7=15)',
                  options: ['The first step is to find the sum of the ratio terms (3+5+7=15)', 'in a ratio'],
                  hint: 'If stuck, revisit the unitary method (c6_math_ch06_064) with simple two-term ratios and whole.',
                  misconception: 'Students often treat the ratio numbers as the actual shares (e.g., for ratio 2:3 and total 500, they say shares are 2 and 3, or 200 and 300.' },
                { id: 'b', prompt: 'A sum of ₹600 is divided between A and B in the ratio 2:3. A student calculates A\'s share as \\( \\frac{2}{3} \\times 600 = ₹400 \\). Why is this incorrect?', answer: 'The student used the wrong denominator',
                  options: ['The student used the wrong denominator', 'multiply by ratio number', 'multiply by ratio fraction'],
                  hint: 'If stuck, revisit the unitary method (c6_math_ch06_064) with simple two-term ratios and whole.',
                  misconception: 'Students often treat the ratio numbers as the actual shares (e.g., for ratio 2:3 and total 500, they say shares are 2 and 3, or 200 and 300.' },
                { id: 'c', prompt: 'Three friends share a 2.4 kg bag of rice in the ratio 1:2:3. Calculate the share of each friend in grams.', answer: 'Step 1: Sum of ratio terms = 1+2+3 = 6 parts',
                  options: ['Step 1: Sum of ratio terms = 1+2+3 = 6 parts', 'multiply by ratio number', 'multiply by ratio fraction'],
                  hint: 'If stuck, revisit the unitary method (c6_math_ch06_064) with simple two-term ratios and whole.',
                  misconception: 'Students often treat the ratio numbers as the actual shares (e.g., for ratio 2:3 and total 500, they say shares are 2 and 3, or 200 and 300.' },
                { id: 'd', prompt: 'Compare the two methods for sharing ₹500 in ratio 2:3: Method X: Find 1 part = 500 ÷ (2+3) = 100, then shares = 200 and 300.', answer: 'Yes, they are equivalent',
                  options: ['Yes, they are equivalent', 'multiply by ratio number', 'multiply by ratio fraction'],
                  hint: 'If stuck, revisit the unitary method (c6_math_ch06_064) with simple two-term ratios and whole.',
                  misconception: 'Students often treat the ratio numbers as the actual shares (e.g., for ratio 2:3 and total 500, they say shares are 2 and 3, or 200 and 300.' }
          ],
            remediations: { 'students-often-treat-the-ratio': { steps: ['If a student makes the above error, guide them through a concrete representation: draw 10 equal boxes for the ratio.', 'Ask: "If the total is 100, how much is in each box?" (100 ÷ 10 = 10).', 'Then count boxes for each person.', 'This visual "part-whole" model connects the unitary method to the fraction method.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
