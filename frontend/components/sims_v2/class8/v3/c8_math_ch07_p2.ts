import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch07_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch07_p2: SimDef = {
    id: 'v3_c8_math_ch07_p2',
    title: 'Proportional Reasoning-1 · Part 2/2',
    subtitle: 'Same shape, different size — the multiply-only rule',
    classLevel: 8, subject: 'mathematics', topic: 'Proportional Reasoning-1 · Part 2/2',
    chapters: ['c8_math_ch07'],
    nodeIds: ['c8_math_ch7_6', 'c8_math_ch7_7', 'c8_math_ch7_8', 'c8_math_ch7_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a recipe-and-map scaler', intro: 'Double a recipe, enlarge a map, grow a photo — all ask the same question: what keeps the proportions honest? Hint: it\'s not addition.', goal: 'Distinguish multiplicative from additive change — only multiplying all parts by the same factor preserves a ratio — and apply it to recipes, maps and similar figures.' },
    discovery: {
        question: 'A paratha recipe uses 2 cups potato to 1 cup onion for 4 parathas. To make 8, a cook adds 2 cups potato and 1 cup onion \'extra\'. Same taste?',
        options: ['No — adding equal amounts breaks the ratio; only multiplying both by 2 keeps the flavour identical', 'Yes — adding the same to both keeps it fair', 'No — he should have added only potato', 'Yes — more of everything always tastes the same'],
        answer: 'No — adding equal amounts breaks the ratio; only multiplying both by 2 keeps the flavour identical',
        hook: 'Ratios live in multiplication-land, not addition-land. Adding 2 to both sides of 3:5 gives 5:7 — bigger numbers, different ratio. Recipes, maps and photos only stay true when you scale by a factor.',
    },
    teaching: [
        { title: 'Unitary Method: Finding One Unit Then Scaling', text: 'The unitary method is a technique for solving proportional problems by first finding the value of a single unit from the given value of multiple units, then scaling that unit value to find the value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch7_6', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Bust the additive trap everywhere it hides: stretch a 12×8 rectangle both ways (add 4 vs ×1.5), enlarge a map at 150%, and prove a ₹100 price hike isn\'t \'the same\' on a ₹400 shirt and a ₹600 one.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_6', title: 'Unitary Method: Finding One Unit Then Scaling',
          scaffold: { problem: 'A school canteen buys 12.5 kg of rice for ₹625. They need to cook 3.2 kg for today\'s lunch. What is the cost of the rice used?',
            steps: [
            { text: 'Identify given values: Total quantity = 12.5 kg, Total cost = ₹625. Required quantity = 3.2 kg.' },
            { text: 'Find cost of 1 kg (unit value) by dividing total cost by total quantity: ₹625 ÷ 12.5.' },
            { text: 'Perform division: 625 ÷ 12.5 = 6250 ÷ 125 = 50. So, 1 kg costs ₹50.' },
            { text: 'Multiply unit cost by required quantity: ₹50 × 3.2 = ₹160.' },
            { text: 'Verify: 12.5 kg costs ₹625, so 3.2 kg (which is less than half) should cost less than ₹312.50. ₹160 is reasonable.', faded: true, blankAnswer: '₹160' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_7', title: 'Solving Proportion Problems Using Cross-Multiplication',
          scaffold: { problem: 'A 2 kg bag of basmati rice costs ₹180. How much will 5 kg cost at the same rate?',
            steps: [
            { text: 'Identify known and unknown. Cost for 2 kg = ₹180. Cost for 5 kg = ₹x.' },
            { text: 'Set up the proportion with consistent order (cost/kg): \\( \\frac{180}{2} = \\frac{x}{5} \\).' },
            { text: 'Apply cross-multiplication: \\( 180 \\times 5 = 2 \\times x \\).' },
            { text: 'Compute left side: \\( 900 = 2x \\). Divide both sides by 2: \\( x = \\frac{900}{2} = 450 \\).' },
            { text: 'Verify: Unit cost = ₹90/kg. 5 kg × ₹90 = ₹450. Answer makes sense.', faded: true, blankAnswer: '₹450' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_8', title: 'Direct Proportion: Definition and Identification',
          scaffold: { problem: 'A car travels at a constant speed of 60 km/h. The distance travelled is directly proportional to the time taken.',
            steps: [
            { text: 'Identify the given pair to find the constant ratio. From the table, when time = 1 h, distance = 60 km.' },
            { text: 'Verify the constant with another pair. For time = 2 h, distance = 120 km: \\(\\frac{120}{2} = 60\\).' },
            { text: 'Write the algebraic relationship: Distance = 60 × Time, or \\(d = 60t\\).' },
            { text: 'Find missing values. For time = 5 h: \\(d = 60 \\times 5 = 300\\) km. For distance = 420 km: \\(t = \\frac{420}{60} = 7\\) h.' },
            { text: 'Complete the table and state the constant of proportionality with units: \\(k = 60\\) km/h.', faded: true, blankAnswer: 'Completed table: Time 5 h → 300 km; Distance 420 km → 7 h.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch7_9', title: 'Applications of Direct Proportion in Real-Life Situations',
          scaffold: { problem: 'A school canteen uses 12 kg of rice to feed 96 students for one day. If 144 students are expected tomorrow, how many kg of rice are needed?',
            steps: [
            { text: 'Identify the quantities in direct proportion: number of students and kg of rice (more students → more rice).' },
            { text: 'Find the constant ratio (rice per student) using unitary method: 12 kg ÷ 96 students = 0.125 kg per student.' },
            { text: 'Calculate rice for 144 students: 0.125 kg/student × 144 students = 18 kg.' },
            { text: 'Calculate total cost: 18 kg × ₹45/kg = ₹810.' },
            { text: 'Verify: Ratio 96/12 = 8 students per kg; 144/18 = 8 students per kg. Ratio holds. Cost is reasonable.', faded: true, blankAnswer: '18 kg of rice, total cost ₹810.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch7_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch7_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Amma\'s sherbet recipe mixes 1 cup syrup with 4 cups water for 5 glasses. For a family gathering needing double, cousin Ajay suggests \'just add 1 cup of each — same increase for both, so the taste stays identical.\'',
            decisions: [{ prompt: 'Will Ajay\'s batch taste the same?', options: [
                { text: 'No — keeping the taste means keeping the 1:4 ratio, and only multiplying both parts preserves it: 2 cups syrup + 8 cups water. Ajay\'s \'+1 each\' gives 2:5, which is a weaker syrup fraction — noticeably more watery.', outcome: 'This is the core of proportional change: equal additions break ratios; only equal factors keep them.' },
                { text: 'Ajay is right — adding the same amount to both ingredients is the fairest way to scale up.', outcome: 'Fair-feeling but mathematically wrong: 2/5 is not 1/4, so the ratio shifts and the flavour dilutes.', reveals: 'add-same-keep-ratio' },
                { text: 'Neither works — you can never double a recipe because larger batches always concentrate differently.', outcome: 'Doubling is exactly what proportions allow: 2:8 keeps every sip identical; the failure belongs to the additive method, not to scaling itself.', reveals: 'recipes-cant-scale' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch7_9', title: 'You made it',
          caseStudy: { intro: 'Multiplicative change keeps the ratio — that\'s what \'proportional\' means. Add the same amount to both parts and you\'ve quietly changed the recipe, the shape and the scale.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch7_6', difficulty: 'standard',
          question: 'The unitary method is a technique for solving proportional problems by first.',
          hint: 'If stuck, review decimal division (c7_math_ch12_004, c7_math_ch12_005) and the concept.',
          misconception: 'Students often incorrectly apply the unitary method to inverse proportion problems (e.g., "5 workers take 10 days.',
          parts: [
                { id: 'a', prompt: 'Explain why dividing the total quantity by the number of units gives the correct value for one unit in a direct proportion situation.', answer: 'In direct proportion, the ratio between the two quantities is constant',
                  options: ['In direct proportion, the ratio between the two quantities is constant', 'because the formula says so'],
                  hint: 'If stuck, review decimal division (c7_math_ch12_004, c7_math_ch12_005) and the concept.',
                  misconception: 'Students often incorrectly apply the unitary method to inverse proportion problems (e.g., "5 workers take 10 days to build a wall.' }
          ],
            remediations: { 'students-often-incorrectly-apply-the': { steps: ['When a student makes this error, first ask: "If 5 workers take 10 days, would 1 worker take more or fewer days?" Guide.', 'Then ask: "Would 8 workers take more or fewer days than 1 worker?" This leads to 50 ÷ 8 = 6.25 days.', 'Emphasize: in direct proportion, both quantities change in the same direction (more workers → more work done in same.', 'Have them practice classifying problems as direct or inverse before applying the unitary method.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_7', difficulty: 'standard',
          question: 'Cross-multiplication is an algebraic method for solving a proportion of the.',
          hint: 'If stuck, revisit solving linear equations using inverse operations (c7_math_ch15_003).',
          misconception: 'Students often cross-multiply horizontally instead of diagonally, writing \\( a \\times b = c \\times d \\) for \\.',
          parts: [
                { id: 'a', prompt: 'Explain why cross-multiplication is a valid step when solving \\( \\frac{3}{5} = \\frac{x}{15} \\). Use the concept of multiplying both sides by the same quantity.', answer: 'Cross-multiplication is valid',
                  options: ['Cross-multiplication is valid', 'it\'s just a rule', 'we multiply top-left by bottom-right', 'multiply across'],
                  hint: 'If stuck, revisit solving linear equations using inverse operations (c7_math_ch15_003) and practice.',
                  misconception: 'Students often cross-multiply horizontally instead of diagonally, writing \\( a \\times b = c \\times d \\) for \\( \\frac{a}{b} = \\frac{c}{d}.' },
                { id: 'b', prompt: 'Solve for \\( x \\) using cross-multiplication: \\( \\frac{7}{x} = \\frac{21}{36} \\). Show all steps.', answer: 'Step 1: Cross-multiply: \\( 7 \\times 36 = x \\times 21 \\)',
                  options: ['Step 1: Cross-multiply: \\( 7 \\times 36 = x \\times 21 \\)', 'multiply across', 'across', 'along the fraction bar'],
                  hint: 'If stuck, revisit solving linear equations using inverse operations (c7_math_ch15_003) and practice.',
                  misconception: 'Students often cross-multiply horizontally instead of diagonally, writing \\( a \\times b = c \\times d \\) for \\( \\frac{a}{b} = \\frac{c}{d}.' }
          ],
            remediations: { 'students-often-cross-multiply-horizontally': { steps: ['Draw two fractions side by side with an equal sign.', 'Use a coloured pen to draw an X connecting the numerator of the first to the denominator of the second, and the.', 'Say: "Cross-multiplication means multiply along the arms of this X.', 'The equal sign is the centre of the X.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often cross-multiply horizontally instead of diagonally, writing \\( a \\times b = c \\times d \\) for \\.',
          parts: [
                { id: 'a', prompt: 'Create a real-life word problem (Indian context) that requires setting up a proportion with the unknown in the denominator and solving it using.', answer: 'Example problem: "A car travels 180 km on 12 litres of petrol',
                  options: ['Example problem: "A car travels 180 km on 12 litres of petrol', 'multiply across', 'across', 'along the fraction bar'],
                  hint: 'If stuck, revisit solving linear equations using inverse operations (c7_math_ch15_003) and practice.',
                  misconception: 'Students often cross-multiply horizontally instead of diagonally, writing \\( a \\times b = c \\times d \\) for \\( \\frac{a}{b} = \\frac{c}{d}.' }
          ],
            remediations: { 'students-often-cross-multiply-horizontally': { steps: ['Draw two fractions side by side with an equal sign.', 'Use a coloured pen to draw an X connecting the numerator of the first to the denominator of the second, and the.', 'Say: "Cross-multiplication means multiply along the arms of this X.', 'The equal sign is the centre of the X.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_8', difficulty: 'standard',
          question: 'Two quantities are in direct proportion if they increase or decrease together.',
          hint: 'Revisit equivalent ratios (c8_math_ch7_4) and unitary method (c8_math_ch7_6) to practice.',
          misconception: 'Students often believe that if two quantities both increase (or both decrease), they are in direct proportion.',
          parts: [
                { id: 'a', prompt: 'The table below shows values of \\(x\\) and \\(y\\). Explain why this relationship is NOT a direct proportion, even though both \\(x\\) and \\(y\\) increase.', answer: 'For direct proportion, \\(\\frac{y}{x}\\) must be constant',
                  options: ['For direct proportion, \\(\\frac{y}{x}\\) must be constant', 'it is direct proportion'],
                  hint: 'Revisit equivalent ratios (c8_math_ch7_4) and unitary method (c8_math_ch7_6) to practice finding.',
                  misconception: 'Students often believe that if two quantities both increase (or both decrease), they are in direct proportion.' }
          ],
            remediations: { 'if-two-quantities-both-increase': { steps: ['Ask the student to compute \\(\\frac{y}{x}\\) for every pair in the table and write the results in a new row.', 'Have them compare the values: "Are they all the same number?', 'If not, it\'s not direct proportion." 3.', 'Use a visual aid: plot the points on graph paper.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch7_9', difficulty: 'standard',
          question: 'Direct proportion describes a relationship between two quantities where.',
          hint: 'Revisit c8_math_ch7_8 (Direct Proportion: Definition and Identification) and.',
          misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held.',
          parts: [
                { id: 'a', prompt: 'A recipe uses 3 cups of flour for 12 cookies. How many cups of flour are needed for 30 cookies? Solve using the proportion method.', answer: 'Let x be cups of flour for 30 cookies',
                  options: ['Let x be cups of flour for 30 cookies', 'more-more'],
                  hint: 'Revisit c8_math_ch7_8 (Direct Proportion: Definition and Identification) and c8_math_ch7_6 (Unitary.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' },
                { id: 'b', prompt: 'Compare these two situations: (A) 4 workers paint a wall in 6 hours. (B) 4 workers paint 2 walls in 6 hours.', answer: 'Neither',
                  options: ['Neither', 'more-more'],
                  hint: 'Revisit c8_math_ch7_8 (Direct Proportion: Definition and Identification) and c8_math_ch7_6 (Unitary.',
                  misconception: 'Students often assume ANY "more-more" situation is direct proportion, ignoring whether a third variable is held constant.' }
          ],
            remediations: { 'any-more-more-situation-is': { steps: ['Find parts per machine per hour = 300/(6×4) = 12.5.', 'For 9 machines in 6 hours: 12.5 × 9 × 6 = 675 parts. Emphasize: direct proportion applies only when exactly ONE.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
