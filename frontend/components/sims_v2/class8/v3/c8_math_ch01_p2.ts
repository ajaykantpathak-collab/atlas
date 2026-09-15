import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch01_p2 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch01_p2: SimDef = {
    id: 'v3_c8_math_ch01_p2',
    title: 'A Square and a Cube · Part 2/2',
    subtitle: 'Numbers you can build with tiles',
    classLevel: 8, subject: 'mathematics', topic: 'A Square and a Cube · Part 2/2',
    chapters: ['c8_math_ch01'],
    nodeIds: ['c8_math_ch1_4', 'c8_math_ch1_5', 'c8_math_ch1_6', 'c8_math_ch1_7', 'c8_math_ch1_8', 'c8_math_ch1_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a tiler crunching areas', intro: 'Every square room hides a square number. Count the tiles, find the pattern between them, and discover why \'squaring\' a number was named after a shape you can hold.', goal: 'Understand square numbers through the area model — n² as the area of a square of side n — compute squares, and spot the odd-number differences between consecutive squares.' },
    discovery: {
        question: 'A classroom floor is 4 m × 4 m and tiles are 1 m × 1 m — you need 16 tiles. Now: why do we write that as 4² instead of just \'4 times 4\'?',
        options: ['Because squaring IS the area of a square — n² counts the unit squares that fit inside a square of side n', 'Because mathematicians like small writing', 'Because 4² means 4 + 4 = 8', 'Because tiles can only be counted in squares'],
        answer: 'Because squaring IS the area of a square — n² counts the unit squares that fit inside a square of side n',
        hook: 'The little 2 isn\'t a multiplier — it\'s a geometry lesson. 5² is a 5-by-5 square holding 25 tiles, while 2 × 5 is just a flat rectangle of 10. And here\'s the secret: consecutive squares differ by odd numbers — 1, 4, 9, 16, 25 are separated by 3, 5, 7, 9.',
    },
    teaching: [
        { title: 'Relationship Between Number of Zeros and Square Zeros', text: 'If a number ends with exactly \\(n\\) zeros (i.e., is a multiple of \\(10^n\\) but not \\(10^{n+1}\\)), then its square ends with exactly \\(2n\\) zeros.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch1_4', title: 'Your mission',
          mission: { widget: 'solid', validate: 'solid:radius=60',
            instruction: 'On the lab: set radius to 60 — how does the volume respond?.',
        context: 'Square your way up: compute squares up to 20, spot the odd-number pattern hiding between consecutive squares (can you get 10² − 9² without squaring either?), then stretch to cubes — same idea, one more dimension.',
            observePrompt: 'What did the solid interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_4', title: 'Relationship Between Number of Zeros and Square Zeros',
          scaffold: { problem: 'A school has 1200 students. For a seating arrangement, the principal wants to know how many trailing zeros will be in the square of the.',
            steps: [
            { text: 'Identify the given number and count its trailing zeros. 1200 ends with two zeros (the digits in tens and units place.' },
            { text: 'Recall the rule: If a number has n trailing zeros, its square has 2n trailing zeros.' },
            { text: 'Apply the rule: n = 2, so the square will have 2 × 2 = 4 trailing zeros.' },
            { text: 'Verify by expressing 1200 as 12 × 100 = 12 × 10². Then 1200² = (12 × 10²)² = 12² × 10⁴ = 144 × 10000 = 1,440,000.' },
            { text: 'State the answer with context: The square of 1200 will have 4 trailing zeros.', faded: true, blankAnswer: '4 trailing zeros' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_5', title: 'Sum of Consecutive Odd Numbers Gives Perfect Squares',
          scaffold: { problem: 'A mason is building a square courtyard using square stone slabs. He starts with 1 slab in the centre.',
            steps: [
            { text: 'Identify what is given - final square is 15×15, so n = 15 layers total. The first layer is 1 slab (1×1).' },
            { text: 'Recall the pattern - the kth layer adds the kth odd number of slabs. The kth odd number = 2k - 1.' },
            { text: 'For the 15th layer, k = 15. Calculate the 15th odd number: 2(15) - 1 = 30 - 1 = 29.' },
            { text: 'Verify using the sum formula - total slabs in 15×15 courtyard = 15² = 225. Sum of first 14 odd numbers = 14² = 196.' },
            { text: 'Interpret the answer - the mason added 29 slabs in the final (15th) layer to complete the 15×15 courtyard.', faded: true, blankAnswer: '29 slabs' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_6', title: 'Checking if a Number is a Perfect Square by Subtracting Odd Numbers',
          scaffold: { problem: 'A gardener has 289 saplings and wants to plant them in a square formation (same number of rows and columns).',
            steps: [
            { text: 'Identify the number to test: N = 289. We will subtract odd numbers 1, 3, 5, ... until we reach 0 or a negative number.' },
            { text: 'Perform subtractions systematically, recording each step:' },
            { text: 'Count the number of subtractions performed. The odd numbers used were 1, 3, 5, ..., 33.' },
            { text: 'Since we reached exactly 0 after 17 subtractions, 289 is a perfect square and √289 = 17.' },
            { text: 'Interpret the result: The gardener can plant 17 rows with 17 saplings each, using all 289 saplings.', faded: true, blankAnswer: 'Yes, 289 is a perfect square (17²). Each row will have 17.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_7', title: 'Perfect Squares and Triangular Numbers',
          scaffold: { problem: 'A school auditorium has chairs arranged in a triangular pattern for a yoga session.',
            steps: [
            { text: 'Identify that the number of chairs in row n is n, so total chairs = sum of first 7 natural numbers = T₇.' },
            { text: 'Use the triangular number formula Tₙ = n(n+1)/2. For n=7: T₇ = 7×8/2 = 28 chairs total.' },
            { text: 'Find chairs in 6th row (T₆ = 6×7/2 = 21) and 7th row (T₇ = 28).' },
            { text: 'Compute T₇ + T₆ = 28 + 21 = 49. Recognize 49 = 7². The square root is 7.' },
            { text: 'Verify: The sum of the last two rows (6th and 7th) equals the square of the last row number (7).', faded: true, blankAnswer: 'Total chairs = 28. Combined 6th and 7th rows = 49 = 7².' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_8', title: 'Square Roots: Definition and Finding Square Roots',
          scaffold: { problem: 'A square tile has an area of 1296 square centimetres. What is the length of one side of the tile?',
            steps: [
            { text: 'Identify that the side length of a square is the square root of its area. We need to find \\( \\sqrt{1296} \\).' },
            { text: 'Use prime factorisation method. Divide 1296 by smallest primes: \\( 1296 \\div 2 = 648 \\), \\( 648 \\div 2 = 324 \\), \\( 324.' },
            { text: 'Write in exponent form: \\( 1296 = 2^4 \\times 3^4 \\). Group into pairs: \\( (2^2)^2 \\times (3^2)^2 = (2^2 \\times 3^2)^2.' },
            { text: 'Take one factor from each pair: \\( 2^2 \\times 3^2 = 4 \\times 9 = 36 \\). So \\( \\sqrt{1296} = 36 \\).' },
            { text: 'Verify: \\( 36 \\times 36 = 1296 \\). The side length is 36 cm.', faded: true, blankAnswer: '36 cm' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch1_9', title: 'Estimating Square Roots',
          scaffold: { problem: 'A square classroom has a floor area of 85 square metres. The school wants to buy a decorative border for the perimeter.',
            steps: [
            { text: 'Identify perfect squares around 85. 9² = 81, 10² = 100. So √85 is between 9 and 10.' },
            { text: 'Compute the gap between squares: 100 - 81 = 19. Compute how far 85 is from the lower square: 85 - 81 = 4.' },
            { text: 'Use linear interpolation: fraction = 4/19 ≈ 0.21. Add to lower root: 9 + 0.21 = 9.21.' },
            { text: 'Round to one decimal place: 9.21 ≈ 9.2 m.' },
            { text: 'Verify: 9.2² = 84.64 (error 0.36), 9.3² = 86.49 (error 1.49). 9.2 is closer. Perimeter ≈ 4 × 9.2 = 36.8 m.', faded: true, blankAnswer: 'Side length ≈ 9.2 m, border needed ≈ 36.8 m.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch1_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch1_4', title: 'Use it in the wild',
          caseStudy: { intro: 'Tiling a square classroom floor 6 m by 6 m with 1-metre tiles, Bunty writes \'6² = 6 × 2 = 12 tiles.\' His partner recounts the rows and disagrees.',
            decisions: [{ prompt: 'Who is right and why?', options: [
                { text: 'The partner — 6² means 6 × 6, giving 36 tiles: six rows of six unit squares. The little 2 means \'multiply the number by itself\', the area of a square of side 6 — not \'times 2\', which would describe a 6-by-2 rectangle.', outcome: 'This ties the exponent to the area model: n² counts the unit squares inside an n-by-n square.' },
                { text: 'Bunty is right — the superscript 2 tells you to multiply the number by 2.', outcome: 'That reading would make 5² = 10, but a 5-by-5 grid plainly holds 25 tiles; the 2 marks two equal factors, not a second addend.', reveals: 'square-means-times-two' },
                { text: 'Both are wrong — 6² means 2 multiplied by itself 6 times, so the floor needs 64 tiles.', outcome: 'That swaps base and exponent; 2⁶ is a different quantity entirely, and the floor would overflow long before 64 tiles fit.', reveals: 'base-and-power-swapped' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch1_9', title: 'You made it',
          caseStudy: { intro: 'A square number is a square you can actually draw. Multiply a number by itself and you\'ve measured an area — and the odd numbers 1+3+5+7… stack up into perfect squares like tiles on a floor.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'solid', prompt: 'Explore the solid interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'solid', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch1_4', difficulty: 'standard',
          question: 'If a number ends with exactly \\(n\\) zeros (i.e., is a multiple of \\(10^n\\) but.',
          hint: 'Revisit place value (c6_math_ch01_003) and multiplication by powers of 10.',
          misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.',
          parts: [
                { id: 'a', prompt: 'Find the number of trailing zeros in the square of 3500 without performing the full multiplication.', answer: '3500 ends with 2 zeros',
                  options: ['3500 ends with 2 zeros', 'it has 1 or 3 zeros)'],
                  hint: 'Revisit place value (c6_math_ch01_003) and multiplication by powers of 10 (c6_math_ch01_010).',
                  misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.' },
                { id: 'b', prompt: 'Compare the squares of 50 and 500. How many times more trailing zeros does 500² have compared to 50²? Explain the relationship.', answer: '50 has 1 trailing zero → 50² has 2 zeros',
                  options: ['50 has 1 trailing zero → 50² has 2 zeros', 'the relationship is additive rather than multiplicative'],
                  hint: 'Revisit place value (c6_math_ch01_003) and multiplication by powers of 10 (c6_math_ch01_010).',
                  misconception: 'Students often count all zeros in the number, not just the trailing zeros at the end.' }
          ],
            remediations: { 'students-often-count-all-zeros': { steps: ['Have the student write the number with its place value: 10100 = 1×10⁴ + 0×10³ + 1×10² + 0×10¹ + 0×10⁰.', 'Circle the zeros at the end (units and tens places) – only those two are trailing zeros.', 'Show that 10100 = 101 × 100 = 101 × 10².', 'Squaring gives 101² × 10⁴, so exactly 4 trailing zeros.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_5', difficulty: 'standard',
          question: 'The sum of the first n consecutive odd natural numbers starting from 1 equals.',
          hint: 'Review the formula for the nth odd number (2n-1) and practice squaring numbers 1-15 until.',
          misconception: 'Students often confuse the nth odd number (2n-1) with the number of terms n.',
          parts: [
                { id: 'a', prompt: 'Explain why 1 + 3 + 5 + 7 = 16 using a visual or geometric argument.', answer: 'Start with a 1×1 square (1 dot)',
                  options: ['Start with a 1×1 square (1 dot)', 'it\'s the formula'],
                  hint: 'Review the formula for the nth odd number (2n-1) and practice squaring numbers 1-15 until fluent.',
                  misconception: 'Students often confuse the nth odd number (2n-1) with the number of terms n.' }
          ],
            remediations: { 'students-often-confuse-the-nth': { steps: ['If a student confuses n with (2n-1), have them write the sequence explicitly: "1st odd = 1, 2nd odd = 3, 3rd odd = 5.', 'Then ask: "For sum = 49, which n gives n²=49?" Guide them to n=7.', 'Then verify: 7th odd = 13, sum = 1+3+5+7+9+11+13 = 49.', 'Emphasise: the pattern ONLY works when starting from 1 and taking consecutive odds.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_6', difficulty: 'standard',
          question: 'A natural number N is a perfect square if and only if it can be expressed.',
          hint: 'Revisit c8_math_ch1_5 (Sum of Consecutive Odd Numbers Gives Perfect Square) and practise.',
          misconception: 'Students often miscount the number of subtractions performed, especially when the number of steps is large, and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A natural number N is a perfect square if and only if it can be expressed as the sum of',
                  options: ['A natural number N is a perfect square if and only if it can be expressed as the sum of', 'A square number is the product obtained when a natural number is multiplied by itself', 'A cube number is the result of multiplying an integer by itself three times', 'A perfect cube is an integer that can be expressed as the cube of another integer'],
                  hint: 'Revisit c8_math_ch1_5 (Sum of Consecutive Odd Numbers Gives Perfect Square) and practise writing.',
                  misconception: 'Students often miscount the number of subtractions performed, especially when the number of steps is large, and then incorrectly report the.' }
          ],
            remediations: { 'students-often-miscount-the-number': { steps: ['Have the student write the odd-number sequence (1, 3, 5, ...) in a column first, then perform subtractions in.', 'After each subtraction, they must verbally state: "I have done ___ subtractions, the next odd is ___".', 'This dual-record method prevents skipping odds and forces accurate step counting.', 'Practice with 144 (12 steps) and 225 (15 steps) until the count matches the root every time.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_7', difficulty: 'standard',
          question: 'A perfect square is an integer that can be expressed as the square of another.',
          hint: 'Revisit the derivation of Tₙ = n(n+1)/2 by arranging dots in a triangle and doubling.',
          misconception: 'Students often think the relationship is Tₙ + Tₙ = n² (doubling the same triangular number) or Tₙ + Tₙ₊₁ = n² (using.',
          parts: [
                { id: 'a', prompt: 'List the first five triangular numbers and the first five perfect squares. Then write the sum of the 4th and 3rd triangular numbers.', answer: 'Triangular: 1, 3, 6, 10, 15',
                  options: ['Triangular: 1, 3, 6, 10, 15', '1,2,3,4,5 as triangular'],
                  hint: 'Revisit the derivation of Tₙ = n(n+1)/2 by arranging dots in a triangle and doubling it to form.',
                  misconception: 'Students often think the relationship is Tₙ + Tₙ = n² (doubling the same triangular number) or Tₙ + Tₙ₊₁ = n² (using the next triangular.' },
                { id: 'b', prompt: 'Explain why the sum of the 5th and 4th triangular numbers must be 25 without calculating the triangular numbers individually.', answer: 'By the relationship, T₅ + T₄ = 5² = 25',
                  options: ['By the relationship, T₅ + T₄ = 5² = 25', 'because 15+10=25'],
                  hint: 'Revisit the derivation of Tₙ = n(n+1)/2 by arranging dots in a triangle and doubling it to form.',
                  misconception: 'Students often think the relationship is Tₙ + Tₙ = n² (doubling the same triangular number) or Tₙ + Tₙ₊₁ = n² (using the next triangular.' }
          ],
            remediations: { 'the-relationship-is-t-t': { steps: ['Have the student list triangular numbers with their indices: T₁=1, T₂=3, T₃=6, T₄=10, T₅=15.', 'Ask them to add T₂+T₁, T₃+T₂, T₄+T₃, T₅+T₄ and write the results: 4, 9, 16, 25.', 'Point out the pattern: each sum uses the current n and previous n-1.', 'The sum equals n² where n is the index of the LARGER triangular number.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often think the relationship is Tₙ + Tₙ = n² (doubling the same triangular number) or Tₙ + Tₙ₊₁ = n² (using.',
          parts: [
                { id: 'a', prompt: 'A student claims: "If I take any perfect square, say 49, I can always find two consecutive triangular numbers that add up to it." Is the student correct?', answer: 'Yes, the student is correct',
                  options: ['Yes, the student is correct', 'No, because 49 is odd'],
                  hint: 'Revisit the derivation of Tₙ = n(n+1)/2 by arranging dots in a triangle and doubling it to form.',
                  misconception: 'Students often think the relationship is Tₙ + Tₙ = n² (doubling the same triangular number) or Tₙ + Tₙ₊₁ = n² (using the next triangular.' }
          ],
            remediations: { 'the-relationship-is-t-t': { steps: ['Have the student list triangular numbers with their indices: T₁=1, T₂=3, T₃=6, T₄=10, T₅=15.', 'Ask them to add T₂+T₁, T₃+T₂, T₄+T₃, T₅+T₄ and write the results: 4, 9, 16, 25.', 'Point out the pattern: each sum uses the current n and previous n-1.', 'The sum equals n² where n is the index of the LARGER triangular number.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_8', difficulty: 'standard',
          question: 'The square root of a perfect square number is the positive number which, when.',
          hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and practice writing numbers.',
          misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)).',
          parts: [
                { id: 'a', prompt: 'What is the square root of 144? Write the answer and explain what the symbol \\( \\sqrt{144} \\) means.', answer: 'The square root of 144 is 12',
                  options: ['The square root of 144 is 12', 'the square root of a number is obtained by dividing the number by 2 (e'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and practice writing numbers as products.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' },
                { id: 'b', prompt: 'A student says \\( \\sqrt{100} = 50 \\) because "you divide by 2 to find the square root". Why is this reasoning incorrect?', answer: 'The reasoning is incorrect',
                  options: ['The reasoning is incorrect', 'half of a number', 'a number that squares to the original', 'the square root of a number is obtained by dividing the number by 2 (e'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and practice writing numbers as products.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' },
                { id: 'c', prompt: 'Find the square root of 1764 using the prime factorisation method. Show all steps.', answer: 'Step 1: Prime factorise 1764',
                  options: ['Step 1: Prime factorise 1764', 'the square root of a number is obtained by dividing the number by 2 (e'],
                  hint: 'If stuck, revisit prime factorisation (c6_math_ch01_015) and practice writing numbers as products.',
                  misconception: 'Students often think the square root of a number is obtained by dividing the number by 2 (e.g., \\( \\sqrt{64} = 32 \\)) or by halving the.' }
          ],
            remediations: { 'the-square-root-of-a': { steps: ['If a student makes this error, immediately ask: "If \\( \\sqrt{64} = 32 \\), then what is \\( 32 \\times 32 \\)?" Let them.', 'Then ask: "Does that equal 64?" Then remind: "Square root asks: what number times itself gives 64?', 'We know \\( 8 \\times 8 = 64 \\), so \\( \\sqrt{64} = 8 \\)." Next, give a set of 5 perfect squares (36, 81, 100, 144, 225).', 'This builds the inverse-operation concept concretely.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch1_9', difficulty: 'standard',
          question: 'Estimating square roots is the process of finding an approximate value for the.',
          hint: 'If stuck, revisit c8_math_ch1_8 (square root definition) and c6_math_ch01_006 (estimation.',
          misconception: 'Students assume the square root function is linear and always take the midpoint between the two bounding integers.',
          parts: [
                { id: 'a', prompt: 'What are the two consecutive whole numbers between which √85 lies?', answer: '√85 lies between 9 and 10',
                  options: ['√85 lies between 9 and 10', '8 and 9'],
                  hint: 'If stuck, revisit c8_math_ch1_8 (square root definition) and c6_math_ch01_006 (estimation basics).',
                  misconception: 'Students assume the square root function is linear and always take the midpoint between the two bounding integers.' },
                { id: 'b', prompt: 'Without calculating, explain why √30 is closer to 5 than to 6.', answer: '30 is 5 away from 25 (5²) but 6 away from 36 (6²)',
                  options: ['30 is 5 away from 25 (5²) but 6 away from 36 (6²)', '30 is between 25 and 36'],
                  hint: 'If stuck, revisit c8_math_ch1_8 (square root definition) and c6_math_ch01_006 (estimation basics).',
                  misconception: 'Students assume the square root function is linear and always take the midpoint between the two bounding integers.' }
          ],
            remediations: { 'the-square-root-function-is': { steps: ['Draw a number line marking 49, 50, 64.', 'Ask: "How many steps from 49 to 50?', 'How many from 50 to 64?" Then mark 7, ?, 8 below.', 'Have the student compute 7.1² = 50.41 and 7.5² = 56.25 to see which is closer.'], labTask: { instruction: 'On the interactive: set radius to 60 — how does the volume respond? — then check.', widget: 'solid', validate: 'solid:radius=60' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
