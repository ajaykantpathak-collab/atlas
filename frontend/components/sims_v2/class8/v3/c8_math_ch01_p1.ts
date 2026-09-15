import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch01_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch01_p1: SimDef = {
    id: 'v3_c8_math_ch01_p1',
    title: 'A Square and a Cube · Part 1/2',
    subtitle: 'Numbers you can build with tiles',
    classLevel: 8, subject: 'mathematics', topic: 'A Square and a Cube · Part 1/2',
    chapters: ['c8_math_ch01'],
    nodeIds: ['c8_math_ch1_1', 'c8_math_ch1_10', 'c8_math_ch1_11', 'c8_math_ch1_12', 'c8_math_ch1_2', 'c8_math_ch1_3'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tiler crunching areas', intro: 'Every square room hides a square number. Count the tiles, find the pattern between them, and discover why \'squaring\' a number was named after a shape you can hold.', goal: 'Understand square numbers through the area model — n² as the area of a square of side n — compute squares, and spot the odd-number differences between consecutive squares.' },
    discovery: {
        question: 'A classroom floor is 4 m × 4 m and tiles are 1 m × 1 m — you need 16 tiles. Now: why do we write that as 4² instead of just \'4 times 4\'?',
        options: ['Because squaring IS the area of a square — n² counts the unit squares that fit inside a square of side n', 'Because mathematicians like small writing', 'Because 4² means 4 + 4 = 8', 'Because tiles can only be counted in squares'],
        answer: 'Because squaring IS the area of a square — n² counts the unit squares that fit inside a square of side n',
        hook: 'The little 2 isn\'t a multiplier — it\'s a geometry lesson. 5² is a 5-by-5 square holding 25 tiles, while 2 × 5 is just a flat rectangle of 10. And here\'s the secret: consecutive squares differ by odd numbers — 1, 4, 9, 16, 25 are separated by 3, 5, 7, 9.',
    },
    teaching: [
        { title: 'Square Numbers: Definition and Notation (n squared)', text: 'A square number is the product obtained when a natural number is multiplied by itself. For any natural number \\( n \\), its square is denoted by \\( n^2 \\) and calculated as \\( n \\times n \\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch1_1', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Square your way up: compute squares up to 20, spot the odd-number pattern hiding between consecutive squares (can you get 10² − 9² without squaring either?), then stretch to cubes — same idea, one more dimension.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_1', title: 'Square Numbers: Definition and Notation (n squared)',
          scaffold: { problem: 'A square classroom has a side length of 12 metres. The school wants to cover the floor with 1 m × 1 m tiles. How many tiles are needed?',
            steps: [
            { text: 'Identify the side length of the square floor: 12 m.' },
            { text: 'Recall that the area of a square = side × side, which is written as \\( (\\text{side})^2 \\).' },
            { text: 'Compute \\( 12^2 = 12 \\times 12 \\). Break 12 into 10 + 2: \\( 12 \\times 12 = 12 \\times (10 + 2) = (12 \\times 10) + (12.' },
            { text: 'Calculate: \\( 12 \\times 10 = 120 \\); \\( 12 \\times 2 = 24 \\); \\( 120 + 24 = 144 \\).' },
            { text: 'Interpret the result: 144 tiles are needed. The unit is square metres (m²) because we multiplied metres by metres.', faded: true, blankAnswer: '\\( 12^2 = 144 \\) tiles (or 144 m²)' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_10', title: 'Cube Numbers: Definition and Notation (n cubed)',
          scaffold: { problem: 'A cubical gift box has a side length of 12 cm. What is its volume in cubic centimetres?',
            steps: [
            { text: 'Identify the outer side length = 12 cm. Volume of outer cube = side³ = 12³.' },
            { text: 'Compute 12³ = 12 × 12 × 12. First 12 × 12 = 144. Then 144 × 12 = 144 × (10 + 2) = 1440 + 288 = 1728 cm³.' },
            { text: 'Inner hollow side length = 12 - 2×1 = 10 cm (1 cm thickness on each side).' },
            { text: 'Volume of wood = outer volume - inner volume = 1728 - 1000 = 728 cm³.' },
            { text: 'Verify: 12³ = 1728, 10³ = 1000, difference = 728. Units are cm³.', faded: true, blankAnswer: 'Outer volume = 1728 cm³, Volume of wood = 728 cm³.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_11', title: 'Perfect Cubes and Their Properties',
          scaffold: { problem: 'A school library has 3375 identical cubical boxes to be stacked into one large solid cube. Can this be done without any boxes left over?',
            steps: [
            { text: 'Recognise that stacking boxes into a large cube means the total number must be a perfect cube.' },
            { text: 'Perform prime factorisation of 3375. Divide by 3: 3375 ÷ 3 = 1125; 1125 ÷ 3 = 375; 375 ÷ 3 = 125.' },
            { text: 'Check if all prime factors can be grouped into triplets. We have one triplet of 3 and one triplet of 5.' },
            { text: 'Since all factors are in complete triplets, 3375 is a perfect cube.' },
            { text: 'Interpret the result: 3375 = 15³. So the large cube will have 15 boxes along each edge. Answer: Yes, 15 boxes per edge.', faded: true, blankAnswer: 'Yes, 3375 is a perfect cube. The large cube will have 15.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_12', title: 'Relationship Between Cubes and Their Cube Roots',
          scaffold: { problem: 'A cubical gift box has a volume of 2,744 cubic centimetres. What is the length of each side of the box?',
            steps: [
            { text: 'Identify that volume of a cube = side³. Given volume = 2,744 cm³. We need side = \\(\\sqrt[3]{2,744}\\).' },
            { text: 'Perform prime factorisation of 2,744. Divide by 2: 2,744 ÷ 2 = 1,372; ÷ 2 = 686; ÷ 2 = 343. So 2,744 = 2³ × 343.' },
            { text: 'Factorise 343. 343 ÷ 7 = 49; 49 ÷ 7 = 7; 7 ÷ 7 = 1. So 343 = 7³.' },
            { text: 'Combine: 2,744 = 2³ × 7³ = (2 × 7)³ = 14³.' },
            { text: 'Therefore, \\(\\sqrt[3]{2,744} = 14\\). The side length is 14 cm.', faded: true, blankAnswer: '14 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_2', title: 'Perfect Squares and Their Properties',
          scaffold: { problem: 'A gardener wants to plant 1296 saplings in a square grid (same number of rows and columns). Can she do it without leaving any sapling out?',
            steps: [
            { text: 'Identify the problem — we need to check if 1296 is a perfect square.' },
            { text: 'Recall the rule — a number is a perfect square if all exponents in its prime factorization are even.' },
            { text: 'Prime factorize 1296:' },
            { text: 'Check exponents — both 4 and 4 are even. Therefore, 1296 is a perfect square.' },
            { text: 'Find the square root for the grid size: √1296 = 2² × 3² = 4 × 9 = 36. The gardener can make a 36 × 36 grid.', faded: true, blankAnswer: 'Yes, 1296 is a perfect square (36²). The gardener can plant.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_3', title: 'Patterns in Units Digits of Perfect Squares',
          scaffold: { problem: 'A school auditorium has chairs arranged in a square formation. The total number of chairs is a perfect square between 5000 and 6000.',
            steps: [
            { text: 'Let the number of rows be \\( n \\). Then total chairs \\( = n^2 \\).' },
            { text: 'From the units-digit pattern, \\( n^2 \\) ends in 4 only when \\( n \\) ends in 2 or 8 (since \\( 2^2=4 \\), \\( 8^2=64 \\)).' },
            { text: 'Estimate \\( n \\): \\( \\sqrt{5000} \\approx 70.7 \\), \\( \\sqrt{6000} \\approx 77.5 \\).' },
            { text: 'List integers 71–77 and pick those ending in 2 or 8: 72 ends in 2, 78 is too high, so only 72 qualifies.' },
            { text: 'Verify: \\( 72^2 = 5184 \\) (ends in 4, between 5000 and 6000). The units digit of the number of rows is 2.', faded: true, blankAnswer: 'The units digit of the number of rows must be 2.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch1_3', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch1_1', title: 'Use it in the wild',
          caseStudy: { intro: 'Tiling a square classroom floor 6 m by 6 m with 1-metre tiles, Bunty writes \'6² = 6 × 2 = 12 tiles.\' His partner recounts the rows and disagrees.',
            decisions: [{ prompt: 'Who is right and why?', options: [
                { text: 'The partner — 6² means 6 × 6, giving 36 tiles: six rows of six unit squares. The little 2 means \'multiply the number by itself\', the area of a square of side 6 — not \'times 2\', which would describe a 6-by-2 rectangle.', outcome: 'This ties the exponent to the area model: n² counts the unit squares inside an n-by-n square.' },
                { text: 'Bunty is right — the superscript 2 tells you to multiply the number by 2.', outcome: 'That reading would make 5² = 10, but a 5-by-5 grid plainly holds 25 tiles; the 2 marks two equal factors, not a second addend.', reveals: 'square-means-times-two' },
                { text: 'Both are wrong — 6² means 2 multiplied by itself 6 times, so the floor needs 64 tiles.', outcome: 'That swaps base and exponent; 2⁶ is a different quantity entirely, and the floor would overflow long before 64 tiles fit.', reveals: 'base-and-power-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch1_3', title: 'The bigger picture',
          caseStudy: { intro: 'A square number is a square you can actually draw. Multiply a number by itself and you\'ve measured an area — and the odd numbers 1+3+5+7… stack up into perfect squares like tiles on a floor.',
            decisions: [{ prompt: 'What comes next? A Square and a Cube · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — A Square and a Cube · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch1_1', difficulty: 'standard',
          question: 'A square number is the product obtained when a natural number is multiplied.',
          hint: 'If stuck, revisit multiplication of two-digit numbers (Class 6) and integer sign rules.',
          misconception: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think.',
          parts: [
                { id: 'a', prompt: 'Explain why \\( 5^2 \\) is not the same as \\( 2 \\times 5 \\). Use the area of a square in your explanation.', answer: '\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)',
                  options: ['\\( 5^2 \\) means \\( 5 \\times 5 = 25 \\)', 'both give 10', 'the 2 just means multiply by 2'],
                  hint: 'If stuck, revisit multiplication of two-digit numbers (Class 6) and integer sign rules (Class 7).',
                  misconception: 'Students often interpret \\( n^2 \\) as \\( n \\times 2 \\) (e.g., \\( 8^2 = 16 \\)) because they see the "2" and think "multiply by 2".' }
          ],
            remediations: { 'students-often-interpret-n-2': { steps: ['If a student writes \\( 8^2 = 16 \\), ask: "What does the little 2 mean?', 'Let\'s read it: \'8 squared\' means 8 multiplied by itself.', 'Show me 8 times 8 using repeated addition or the area model." Draw a 8×8 grid and count.', 'For the negative sign error, write both \\( (-5)^2 \\) and \\( -5^2 \\) side by side.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_10', difficulty: 'standard',
          question: 'A cube number is the result of multiplying an integer by itself three times.',
          hint: 'If stuck, revisit integer multiplication (c7_math_ch10_004, c7_math_ch10_005) and the.',
          misconception: 'Students often interpret \\( n^3 \\) as \\( n \\times 3 \\) (multiplying the base by the exponent) instead of \\( n \\times.',
          parts: [
                { id: 'a', prompt: 'What is the value of \\( (-3)^3 \\) and how does it differ from \\( -3^3 \\)?', answer: '\\( (-3)^3 = -27 \\)',
                  options: ['\\( (-3)^3 = -27 \\)', '\\( (-3'],
                  hint: 'If stuck, revisit integer multiplication (c7_math_ch10_004, c7_math_ch10_005) and the definition.',
                  misconception: 'Students often interpret \\( n^3 \\) as \\( n \\times 3 \\) (multiplying the base by the exponent) instead of \\( n \\times n \\times n \\).' },
                { id: 'b', prompt: 'Explain why \\( 5^3 \\) is not equal to \\( 3 \\times 5 \\). Use the geometric meaning of a cube to justify your answer.', answer: '\\( 5^3 = 5 \\times 5 \\times 5 = 125 \\)',
                  options: ['\\( 5^3 = 5 \\times 5 \\times 5 = 125 \\)', 'both give 15', 'multiplication is the same'],
                  hint: 'If stuck, revisit integer multiplication (c7_math_ch10_004, c7_math_ch10_005) and the definition.',
                  misconception: 'Students often interpret \\( n^3 \\) as \\( n \\times 3 \\) (multiplying the base by the exponent) instead of \\( n \\times n \\times n \\).' }
          ],
            remediations: { 'students-often-interpret-n-3': { steps: ['If a student computes \\( n^3 \\) as \\( n \\times 3 \\), first ask: "What does the little 3 mean in \\( 2^3 \\)?" Guide them.', 'Use physical cubes (e.g., centimetre cubes) to build a 2×2×2 cube and count the blocks (8).', 'Then build 3×3×3 and count (27).', 'Contrast with 2×3=6 blocks arranged in a rectangle.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_11', difficulty: 'standard',
          question: 'A perfect cube is an integer that can be expressed as the cube of another.',
          hint: 'Review prime factorisation (c6_math_ch01_015) and the definition of cube numbers.',
          misconception: 'Students often believe that if a number ends with three zeros (or a multiple of three zeros), it is automatically.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A perfect cube is an integer that can be expressed as the cube of another integer',
                  options: ['A perfect cube is an integer that can be expressed as the cube of another integer', 'A square number is the product obtained when a natural number is multiplied by itself', 'A cube number is the result of multiplying an integer by itself three times', 'The cube root of a number is the value that, when multiplied by itself three times, gives'],
                  hint: 'Review prime factorisation (c6_math_ch01_015) and the definition of cube numbers (c8_math_ch1_10).',
                  misconception: 'Students often believe that if a number ends with three zeros (or a multiple of three zeros), it is automatically a perfect cube.' }
          ],
            remediations: { 'if-a-number-ends-with': { steps: ['If a student makes the "zeros" error, do this remediation: 1.', 'Write the number as \\( \\text{non-zero part} \\times 10^{3k} \\).', 'Factorise the non-zero part separately.', 'Check if the non-zero part is a perfect cube (all its prime exponents multiples of 3).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_12', difficulty: 'standard',
          question: 'The cube root of a number is the value that, when multiplied by itself three.',
          hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of cube numbers.',
          misconception: 'Students often think the cube root of a number is found by dividing the number by 3 (e.g., \\(\\sqrt[3]{27} = 9\\)).',
          parts: [
                { id: 'a', prompt: 'What is the cube root of 343, and how do you know it is the cube root without using a calculator?', answer: 'The cube root of 343 is 7',
                  options: ['The cube root of 343 is 7', 'the cube root of a number is found by dividing the number by 3 (e'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of cube numbers (c8_math_ch1_10).',
                  misconception: 'Students often think the cube root of a number is found by dividing the number by 3 (e.g., \\(\\sqrt[3]{27} = 9\\)) because they confuse the.' },
                { id: 'b', prompt: 'Explain why \\(\\sqrt[3]{-216} = -6\\) but \\(\\sqrt{-216}\\) is not a real number.', answer: '\\(\\sqrt[3]{-216} = -6\\)',
                  options: ['\\(\\sqrt[3]{-216} = -6\\)', 'the cube root of a number is found by dividing the number by 3 (e'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of cube numbers (c8_math_ch1_10).',
                  misconception: 'Students often think the cube root of a number is found by dividing the number by 3 (e.g., \\(\\sqrt[3]{27} = 9\\)) because they confuse the.' }
          ],
            remediations: { 'the-cube-root-of-a': { steps: ['If a student divides by 3, ask: "If \\(\\sqrt[3]{27} = 9\\), then \\(9^3\\) should be 27.', 'What is \\(9^3\\)?" Let them compute \\(9 \\times 9 \\times 9 = 729\\) and see the contradiction.', 'Then guide them to find which number cubed gives 27 by testing small integers.', 'For the sign error, have them compute \\((-4)^3\\) step by step: \\((-4) \\times (-4) = 16\\), then \\(16 \\times (-4) = -64\\).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_12', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the cube root of a number is found by dividing the number by 3 (e.g., \\(\\sqrt[3]{27} = 9\\)).',
          parts: [
                { id: 'a', prompt: 'Ravi says \\(\\sqrt[3]{8000} = 20\\) because \\(20^3 = 8000\\). Priya says \\(\\sqrt[3]{8000} = 200\\) because \\(8000 \\div 40 = 200\\).', answer: 'Ravi is correct',
                  options: ['Ravi is correct', 'the cube root of a number is found by dividing the number by 3 (e'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of cube numbers (c8_math_ch1_10).',
                  misconception: 'Students often think the cube root of a number is found by dividing the number by 3 (e.g., \\(\\sqrt[3]{27} = 9\\)) because they confuse the.' },
                { id: 'b', prompt: 'Create a real-life problem (using Indian context: rupees, metres, litres) where finding a cube root is necessary to solve it.', answer: 'Example: A school wants to store 4,096 litres of water in a cubical tank',
                  options: ['Example: A school wants to store 4,096 litres of water in a cubical tank', 'the cube root of a number is found by dividing the number by 3 (e'],
                  hint: 'Revisit prime factorisation (c6_math_ch01_015) and the definition of cube numbers (c8_math_ch1_10).',
                  misconception: 'Students often think the cube root of a number is found by dividing the number by 3 (e.g., \\(\\sqrt[3]{27} = 9\\)) because they confuse the.' }
          ],
            remediations: { 'the-cube-root-of-a': { steps: ['If a student divides by 3, ask: "If \\(\\sqrt[3]{27} = 9\\), then \\(9^3\\) should be 27.', 'What is \\(9^3\\)?" Let them compute \\(9 \\times 9 \\times 9 = 729\\) and see the contradiction.', 'Then guide them to find which number cubed gives 27 by testing small integers.', 'For the sign error, have them compute \\((-4)^3\\) step by step: \\((-4) \\times (-4) = 16\\), then \\(16 \\times (-4) = -64\\).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_2', difficulty: 'standard',
          question: 'A perfect square is a natural number that can be expressed as the square of.',
          hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products.',
          misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number.',
          parts: [
                { id: 'a', prompt: 'Which of the following numbers is **guaranteed** to be a perfect square based only on its units digit? A) 324 B) 156 C) 289 D) 432', answer: 'Correct answer: A) 324 and C) 289 (both end in 4 or 9',
                  options: ['Correct answer: A) 324 and C) 289 (both end in 4 or 9', '156 or 432', '**any** number ending in 0,1,4,5,6,9 is a perfect square (e'],
                  hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products of prime.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros,.' },
                { id: 'b', prompt: 'Riya says: "1200 is a perfect square because it ends with two zeros." Is she correct?', answer: 'Riya is **incorrect**',
                  options: ['Riya is **incorrect**', 'must have even zeros', 'if it has even zeros, it is a square'],
                  hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products of prime.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros,.' },
                { id: 'c', prompt: 'Determine whether 1764 is a perfect square using prime factorization. Show all steps.', answer: '**Step 1:** Prime factorize 1764',
                  options: ['**Step 1:** Prime factorize 1764', 'not a square'],
                  hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products of prime.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros,.' },
                { id: 'd', prompt: 'Compare the two methods for checking if 1089 is a perfect square: Method A: Check units digit (ends in 9 → possible). Method B: Prime factorization.', answer: 'Method B (prime factorization) gives a definite answer',
                  options: ['Method B (prime factorization) gives a definite answer', 'both work', 'units digit is enough'],
                  hint: 'Revisit prime factorization (c6_math_ch01_015) and practice writing numbers as products of prime.',
                  misconception: 'Students often believe that if a number passes the units digit test (ends in 0,1,4,5,6,9) and has an even number of trailing zeros,.' }
          ],
            remediations: { 'if-a-number-passes-the': { steps: ['Write the number’s prime factorization clearly.', 'Circle each prime’s exponent.', 'Ask: "Is **every** exponent even?" If any is odd, stop — it’s not a perfect square.', 'Practice with numbers that pass digit/zero tests but fail factorization (e.g., 1640, 2000, 360).'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_3', difficulty: 'standard',
          question: 'The units digit of a perfect square depends only on the units digit of the.',
          hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and.',
          misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.',
          parts: [
                { id: 'a', prompt: 'What are the possible units digits of a perfect square? List them.', answer: 'The possible units digits are 0, 1, 4, 5, 6, 9',
                  options: ['The possible units digits are 0, 1, 4, 5, 6, 9', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and practise.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'b', prompt: 'Explain why a number ending in 2 can never be a perfect square, using the algebraic form \\( (10a+b)^2 \\).', answer: 'For any integer \\( n = 10a+b \\), \\( n^2 = 100a^2 + 20ab + b^2 \\)',
                  options: ['For any integer \\( n = 10a+b \\), \\( n^2 = 100a^2 + 20ab + b^2 \\)', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and practise.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'c', prompt: 'Find the units digit of \\( 237^2 \\) without calculating the full square.', answer: 'Step 1: The units digit of 237 is 7',
                  options: ['Step 1: The units digit of 237 is 7', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and practise.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' },
                { id: 'd', prompt: 'Compare the units digits of the squares of 12 and 22. What do you notice? Generalise for any two numbers that have the same units digit.', answer: '\\( 12^2 = 144 \\) (units digit 4), \\( 22^2 = 484 \\) (units digit 4)',
                  options: ['\\( 12^2 = 144 \\) (units digit 4), \\( 22^2 = 484 \\) (units digit 4)', 'if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square'],
                  hint: 'Review writing numbers in expanded form using powers of 10 (Class 6 Place Value) and practise.',
                  misconception: 'Students often believe that if a number ends in 0, 1, 4, 5, 6, or 9, it **must** be a perfect square.' }
          ],
            remediations: { 'if-a-number-ends-in': { steps: ['Have the student list squares of 1–20 and circle only the units digits.', 'Ask: "Does every number ending in 6 appear in this list?" (No, 6, 16, 26, 36… only 16 and 36 are squares).', 'Use the algebraic form \\( (10a+b)^2 = 100a^2+20ab+b^2 \\) to prove the units digit depends only on \\( b \\).', 'Give 5 numbers that pass the units-digit test but are not squares (e.g., 11, 24, 35, 46, 59) and have the student.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
