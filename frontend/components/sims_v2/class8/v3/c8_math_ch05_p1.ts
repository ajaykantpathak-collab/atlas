import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch05_p1: SimDef = {
    id: 'v3_c8_math_ch05_p1',
    title: 'Number Play',
    subtitle: 'Divisibility tricks, digit puzzles, and why some numbers hide patterns in plain sight.',
    classLevel: 8, subject: 'mathematics', topic: 'Number Play · Part 1/2',
    chapters: ['c8_math_ch05'],
    nodeIds: ['c8_math_ch5_1', 'c8_math_ch5_10', 'c8_math_ch5_11', 'c8_math_ch5_2', 'c8_math_ch5_3', 'c8_math_ch5_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a puzzle-setter designing challenges', intro: 'A friend claims they can tell instantly whether any number divides by 9 — without dividing. Your job: find their trick, then prove it always works.', goal: 'Use digit patterns and place value to explain divisibility rules — not just apply them.' },
    discovery: {
        question: 'Take any 3-digit number, reverse it, subtract the smaller from the larger — the answer is ALWAYS divisible by 99. Coincidence?',
        options: ['No — place value forces the difference to be 99 times a digit gap', 'Yes — a numerical coincidence', 'Only for certain numbers', 'Only if the digits are different'],
        answer: 'No — place value forces the difference to be 99 times a digit gap',
        hook: 'The trick isn\'t magic — it\'s place value. abc − cba = 99(a−c), always. The digits decide everything.',
    },
    teaching: [
        { title: 'Sums of Consecutive Numbers: Exploring Patterns', text: 'The sum of consecutive numbers refers to adding a sequence of integers where each number follows the previous one by exactly 1 (e.g., 5+6+7 or 10+11+12+13).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch5_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Test the rule yourself: try five different numbers — then figure out WHY it must always work.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_1', title: 'Sums of Consecutive Numbers: Exploring Patterns',
          scaffold: { problem: 'A staircase has steps numbered consecutively. The sum of the numbers on three consecutive steps is 72. What are the step numbers?',
            steps: [
            { text: 'Let the middle step number be x. Then the three consecutive steps are x-1, x, x+1.' },
            { text: 'Write the equation for their sum: (x-1) + x + (x+1) = 72.' },
            { text: 'Simplify the left side: x-1 + x + x+1 = 3x.' },
            { text: 'Solve for x: 3x = 72 → x = 24.' },
            { text: 'The three step numbers are 23, 24, 25. Verify: 23+24+25 = 72.', faded: true, blankAnswer: '23, 24, 25' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_10', title: 'Number Puzzles and Digits: Two-Digit Number Reversal',
          scaffold: { problem: 'A two-digit number is such that the sum of the number and its reversal is 121. The digits differ by 3. Find the number.',
            steps: [
            { text: 'Let the tens digit be \\(a\\) and units digit be \\(b\\). The number is \\(10a+b\\). The reversed number is \\(10b+a\\).' },
            { text: 'Write the sum condition: \\((10a+b) + (10b+a) = 121\\). Simplify: \\(11a + 11b = 121 \\Rightarrow a+b = 11\\).' },
            { text: 'Write the digit difference condition: \\(|a-b| = 3\\). This gives two cases: \\(a-b=3\\) or \\(b-a=3\\).' },
            { text: 'Solve case 1: \\(a+b=11\\) and \\(a-b=3\\). Adding: \\(2a=14 \\Rightarrow a=7, b=4\\). Number = 74.' },
            { text: 'Solve case 2: \\(a+b=11\\) and \\(b-a=3\\) (i.e., \\(a-b=-3\\)). Adding: \\(2a=8 \\Rightarrow a=4, b=7\\). Number = 47.' },
            { text: 'Verify both: 74+47=121, digits differ by 3. 47+74=121, digits differ by 3. Both satisfy.', faded: true, blankAnswer: '74 or 47' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_11', title: 'Letters for Digits: Cryptarithms and Algebraic Reasoning',
          scaffold: { problem: 'Solve the cryptarithm AB + BA = 121. Find A and B (distinct digits).',
            steps: [
            { text: 'Express AB and BA using place value: AB = 10A + B, BA = 10B + A.' },
            { text: 'Set up the equation: (10A + B) + (10B + A) = 121.' },
            { text: 'Simplify: 11A + 11B = 121, so A + B = 11.' },
            { text: 'List digit pairs that sum to 11: (2,9), (3,8), (4,7), (5,6), (6,5), (7,4), (8,3), (9,2).' },
            { text: 'Check if additional constraints narrow it down. Since the problem states "distinct digits" but gives no further.', faded: true, blankAnswer: 'A + B = 11. With the constraint "A is prime," A = 2, B = 9.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_2', title: 'Writing Numbers as Sums of Consecutive Numbers',
          scaffold: { problem: 'Riya has 45 marbles. She wants to arrange them in rows such that each row has one more marble than the previous row, with at least 2 rows.',
            steps: [
            { text: 'Identify N = 45. We need 45 = k·a + k(k-1)/2 with k ≥ 2, a ≥ 1.' },
            { text: 'Compute 2N = 90. List all divisors of 90 that are ≥ 2: 2, 3, 5, 6, 9, 10, 15, 18, 30, 45, 90.' },
            { text: 'For each k, compute (2N/k - k + 1) and check if it is even and ≥ 2.' },
            { text: 'Collect valid arrangements: (k=2, a=22), (k=3, a=14), (k=5, a=7), (k=6, a=5), (k=9, a=1).' },
            { text: 'Verify each sum equals 45. Interpret: Riya can have 2 rows (22,23), 3 rows (14,15,16), 5 rows (7–11), 6 rows (5–10),.', faded: true, blankAnswer: '5 arrangements: 22+23; 14+15+16; 7+8+9+10+11; 5+6+7+8+9+10.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_3', title: 'Odd Numbers as Sum of Two Consecutive Numbers',
          scaffold: { problem: 'A teacher has 27 pencils. She wants to distribute them between two students such that one student gets exactly one more pencil than the.',
            steps: [
            { text: 'Let the number of pencils the first student gets be \\(x\\). Then the second gets \\(x+1\\).' },
            { text: 'Total pencils = \\(x + (x+1) = 2x+1 = 27\\).' },
            { text: 'Solve for \\(x\\): \\(2x = 27 - 1 = 26\\), so \\(x = 13\\).' },
            { text: 'The two numbers are 13 and 14.' },
            { text: 'Verify: \\(13 + 14 = 27\\). One student gets 13, the other 14.', faded: true, blankAnswer: '13 pencils and 14 pencils.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_4', title: 'Even Numbers and Sums of Consecutive Numbers',
          scaffold: { problem: 'Can 56 be expressed as a sum of consecutive natural numbers? If yes, find one such representation.',
            steps: [
            { text: 'Factorize 56 = 2³ × 7. Identify odd factors >1: only 7.' },
            { text: 'Try using odd factor 7 as number of terms (k=7). Middle term = 56/7 = 8.' },
            { text: 'Verify: 5+6+7+8+9+10+11 = 56. (5+11=16, 6+10=16, 7+9=16, plus 8 = 3×16+8=56).' },
            { text: 'Since we found a valid representation, 56 works. Note: Could also use even k?' },
            { text: 'Conclusion: Yes, 56 = 5+6+7+8+9+10+11.', faded: true, blankAnswer: 'Yes, 56 = 5+6+7+8+9+10+11.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch5_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch5_1', title: 'Use it in the wild',
          caseStudy: { intro: 'In a number-game round, the host says: \'Pick any four consecutive whole numbers — your sum will always be a multiple of 4, because there are four terms.\' A contestant hesitates before playing along.',
            decisions: [{ prompt: 'Is the host\'s claim safe to rely on?', options: [
                { text: 'No — test 1+2+3+4 = 10, which is not a multiple of 4. Four consecutive numbers sum to 4n+6 = 2×(odd), always even but never divisible by 4. The three-number trick works only because an odd count has a middle number acting as the average.', outcome: 'This tests the pattern instead of assuming it — \'as many terms\' does not mean \'divisible by that many\' when the count is even.' },
                { text: 'The claim holds — k terms always give a multiple of k, and three consecutive numbers prove the pattern.', outcome: 'The three-term case works because its sum is 3×(middle term); with an even count the average is a half-integer, so the divisibility quietly breaks.', reveals: 'terms-mean-divisible' },
                { text: 'It fails but in the other direction — four consecutive numbers always give an odd sum.', outcome: 'Check 1+2+3+4 = 10: even, not odd; the real rule is \'always even, never a multiple of 4.\'', reveals: 'four-gives-odd' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch5_4', title: 'The bigger picture',
          caseStudy: { intro: 'Number patterns are arithmetic wearing a costume — learn to see the structure and \'tricks\' become proofs.',
            decisions: [{ prompt: 'What comes next? Number Play · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Number Play · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch5_1', difficulty: 'standard',
          question: 'The sum of consecutive numbers refers to adding a sequence of integers where.',
          hint: 'Review c7_math_ch04_005 (matchstick patterns) and c7_math_ch04_008 (generalising with.',
          misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.',
          parts: [
                { id: 'a', prompt: 'What is the sum of three consecutive numbers starting from 14?', answer: 'The sum is 14+15+16 = 45',
                  options: ['The sum is 14+15+16 = 45', 'the sum of k consecutive numbers is always a multiple of k'],
                  hint: 'Review c7_math_ch04_005 (matchstick patterns) and c7_math_ch04_008 (generalising with variables).',
                  misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.' },
                { id: 'b', prompt: 'A student claims: "The sum of four consecutive numbers is always a multiple of 4 because there are four numbers." Is this claim correct?', answer: 'The claim is incorrect',
                  options: ['The claim is incorrect', 'number of terms', 'divisibility by that number', 'the sum of k consecutive numbers is always a multiple of k'],
                  hint: 'Review c7_math_ch04_005 (matchstick patterns) and c7_math_ch04_008 (generalising with variables).',
                  misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.' },
                { id: 'c', prompt: 'Find the smallest positive integer that can be expressed as the sum of two consecutive numbers in two different ways. Show your working.', answer: 'Let the two consecutive numbers be n and n+1',
                  options: ['Let the two consecutive numbers be n and n+1', 'two consecutive numbers', 'consecutive numbers', 'the sum of k consecutive numbers is always a multiple of k'],
                  hint: 'Review c7_math_ch04_005 (matchstick patterns) and c7_math_ch04_008 (generalising with variables).',
                  misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.' },
                { id: 'd', prompt: 'Compare the sums of these two sets: (a) 10+11+12 and (b) 11+12+13.', answer: 'The second sum is larger by 3',
                  options: ['The second sum is larger by 3', 'the sum of k consecutive numbers is always a multiple of k'],
                  hint: 'Review c7_math_ch04_005 (matchstick patterns) and c7_math_ch04_008 (generalising with variables).',
                  misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.' }
          ],
            remediations: { 'the-sum-of-k-consecutive': { steps: ['If a student holds this misconception, guide them through these steps: (1) Write the sum for k=4 explicitly.', 'Point out that 2n+3 is always odd, so the sum is 2×odd, never a multiple of 4.', '(2) Do the same for k=5: 5n+10 = 5(n+2) — clearly a multiple of 5.', '(3) Ask them to factor the sum for k=6: 6n+15 = 3(2n+5).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_1', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.',
          parts: [
                { id: 'a', prompt: 'Ravi says: "If I add five consecutive numbers, the sum will always be a multiple of 5." Priya says: "That\'s only true if the middle number is a multiple of 5.".', answer: 'Ravi is correct',
                  options: ['Ravi is correct', 'multiple of 5', 'multiple of 25', 'the sum of k consecutive numbers is always a multiple of k'],
                  hint: 'Review c7_math_ch04_005 (matchstick patterns) and c7_math_ch04_008 (generalising with variables).',
                  misconception: 'Students often believe that the sum of k consecutive numbers is always a multiple of k.' }
          ],
            remediations: { 'the-sum-of-k-consecutive': { steps: ['If a student holds this misconception, guide them through these steps: (1) Write the sum for k=4 explicitly.', 'Point out that 2n+3 is always odd, so the sum is 2×odd, never a multiple of 4.', '(2) Do the same for k=5: 5n+10 = 5(n+2) — clearly a multiple of 5.', '(3) Ask them to factor the sum for k=6: 6n+15 = 3(2n+5).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_10', difficulty: 'standard',
          question: 'A two-digit number reversal puzzle involves representing a two-digit number.',
          hint: 'Revisit c6_math_ch01_003 (Place Value and Face Value) for expanded form and.',
          misconception: 'Students often write the reversed number as \\(a+b\\) (sum of digits) or \\(10a+b\\) (same as original) instead.',
          parts: [
                { id: 'a', prompt: 'If a two-digit number is written as \\(10a + b\\), what is the algebraic expression for the number formed by reversing its digits?', answer: 'The reversed number is \\(10b + a\\)',
                  options: ['The reversed number is \\(10b + a\\)', 'reversing digits', 'adding digits'],
                  hint: 'Revisit c6_math_ch01_003 (Place Value and Face Value) for expanded form and c6_math_ch05_056.',
                  misconception: 'Students often write the reversed number as \\(a+b\\) (sum of digits) or \\(10a+b\\) (same as original) instead of \\(10b+a\\).' },
                { id: 'b', prompt: 'Explain why the difference between a two-digit number and its reversal is always a multiple of 9.', answer: 'Original: \\(10a+b\\), Reversed: \\(10b+a\\)',
                  options: ['Original: \\(10a+b\\), Reversed: \\(10b+a\\)', '21-12=9, 31-13=18', 'reversing digits', 'adding digits'],
                  hint: 'Revisit c6_math_ch01_003 (Place Value and Face Value) for expanded form and c6_math_ch05_056.',
                  misconception: 'Students often write the reversed number as \\(a+b\\) (sum of digits) or \\(10a+b\\) (same as original) instead of \\(10b+a\\).' },
                { id: 'c', prompt: 'The sum of a two-digit number and its reversal is 110. Find the number if the digits differ by 4.', answer: 'Let number be \\(10a+b\\)',
                  options: ['Let number be \\(10a+b\\)', 'reversing digits', 'adding digits', 'gives only 73 misses the second possibility'],
                  hint: 'Revisit c6_math_ch01_003 (Place Value and Face Value) for expanded form and c6_math_ch05_056.',
                  misconception: 'Students often write the reversed number as \\(a+b\\) (sum of digits) or \\(10a+b\\) (same as original) instead of \\(10b+a\\).' },
                { id: 'd', prompt: 'A student claims: "If the sum of a two-digit number and its reversal is 99, then the number must be 45 or 54." Analyze this claim and determine if it is always.', answer: 'The claim is **sometimes true**',
                  options: ['The claim is **sometimes true**', 'reversing digits', 'adding digits'],
                  hint: 'Revisit c6_math_ch01_003 (Place Value and Face Value) for expanded form and c6_math_ch05_056.',
                  misconception: 'Students often write the reversed number as \\(a+b\\) (sum of digits) or \\(10a+b\\) (same as original) instead of \\(10b+a\\).' }
          ],
            remediations: { 'students-often-write-the-reversed': { steps: ['Return to place value: write 37 as \\(3 \\times 10 + 7\\).', 'Ask: "Which digit is in tens place?', 'Physically swap digit cards: show 3 and 7 cards, swap positions, ask "What is the new number?" 3.', 'Connect to algebra: original \\(10a+b\\), after swap tens digit becomes \\(b\\) (value \\(10b\\)), units becomes \\(a\\) (value.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_11', difficulty: 'standard',
          question: 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation.',
          hint: 'If students cannot set up the column equation, review place value (c6_math_ch01_003) and.',
          misconception: 'Students treat cryptarithms as trial-and-error guessing games, randomly assigning digits to letters and checking if the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,',
                  options: ['A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,', 'The sum of consecutive numbers refers to adding a sequence of integers where each number', 'A two-digit number reversal puzzle involves representing a two-digit number algebraically', 'A natural number N can be expressed as a sum of two or more consecutive natural numbers'],
                  hint: 'If students cannot set up the column equation, review place value (c6_math_ch01_003) and simple.',
                  misconception: 'Students treat cryptarithms as trial-and-error guessing games, randomly assigning digits to letters and checking if the arithmetic works.' }
          ],
            remediations: { 'students-treat-cryptarithms-as-trial': { steps: ['Start with a trivial cryptarithm: A + A = 4.', 'The student immediately sees A = 2.', 'Build to AB + B = 33: 10A + B + B = 33, so 10A + 2B = 33.', 'Since 2B is even and 33 is odd, 10A must be odd, so A is odd.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_2', difficulty: 'standard',
          question: 'A natural number N can be expressed as a sum of two or more consecutive natural.',
          hint: 'Revisit c6_math_ch01_013 (Factors and Multiples) to practice finding all divisors of.',
          misconception: 'Students often test only small values of k (like 2, 3, 4) and stop when the sum exceeds N, missing longer sequences.',
          parts: [
                { id: 'a', prompt: 'Explain why the number 16 cannot be written as a sum of two or more consecutive natural numbers.', answer: '16 is a power of 2 (2^4)',
                  options: ['16 is a power of 2 (2^4)', '16 is even', 'I tried and couldn\'t find one'],
                  hint: 'Revisit c6_math_ch01_013 (Factors and Multiples) to practice finding all divisors of a number, and.',
                  misconception: 'Students often test only small values of k (like 2, 3, 4) and stop when the sum exceeds N, missing longer sequences.' }
          ],
            remediations: { 'students-often-test-only-small': { steps: ['If a student misses representations, guide them to: (1) Write 2N.', '(2) List all divisors of 2N that are ≥2.', '(3) For each divisor k, compute (2N/k - k + 1).', '(4) If this value is even and ≥2, then a = that value/2 is a valid starting number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_3', difficulty: 'standard',
          question: 'An odd number can always be expressed as the sum of two consecutive integers.',
          hint: 'Review solving linear equations (c7_math_ch15_003) and even/odd addition rules.',
          misconception: 'Students often think that any odd number can be split into two consecutive numbers without considering that the numbers.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An odd number can always be expressed as the sum of two consecutive integers',
                  options: ['An odd number can always be expressed as the sum of two consecutive integers', 'The sum of consecutive numbers refers to adding a sequence of integers where each number', 'A two-digit number reversal puzzle involves representing a two-digit number algebraically', 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,'],
                  hint: 'Review solving linear equations (c7_math_ch15_003) and even/odd addition rules (c7_math_ch06_003).',
                  misconception: 'Students often think that any odd number can be split into two consecutive numbers without considering that the numbers must be positive.' }
          ],
            remediations: { 'any-odd-number-can-be': { steps: ['Remediation: Use concrete counters to show that 1 cannot be split into two positive consecutive piles (smallest piles.', 'Then use algebra: let the numbers be \\(n\\) and \\(n+1\\), sum \\(= 2n+1\\).', 'For sum \\(= 1\\), \\(2n+1=1 \\Rightarrow n=0\\), so numbers are 0 and 1.', 'If we need positive integers, \\(n \\ge 1\\), so smallest sum is 3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_4', difficulty: 'standard',
          question: 'An even number can be expressed as a sum of two or more consecutive natural.',
          hint: 'Revisit c6_math_ch01_015 (Prime Factorisation) to practice breaking numbers into prime.',
          misconception: 'Students think any even number with an odd factor works by simply dividing by that odd factor to get the middle term.',
          parts: [
                { id: 'a', prompt: 'Which of the following even numbers CANNOT be expressed as a sum of two or more consecutive natural numbers: 18, 22, 32, 36?', answer: '32 cannot be expressed',
                  options: ['32 cannot be expressed', 'all even numbers work or confuses the pattern with odd numbers'],
                  hint: 'Revisit c6_math_ch01_015 (Prime Factorisation) to practice breaking numbers into prime factors and.',
                  misconception: 'Students think any even number with an odd factor works by simply dividing by that odd factor to get the middle term.' },
                { id: 'b', prompt: 'Find a sum of consecutive natural numbers that equals 44. Show your steps.', answer: '44 = 2 × 22 = 4 × 11',
                  options: ['44 = 2 × 22 = 4 × 11', '11+12+13+14=50'],
                  hint: 'Revisit c6_math_ch01_015 (Prime Factorisation) to practice breaking numbers into prime factors and.',
                  misconception: 'Students think any even number with an odd factor works by simply dividing by that odd factor to get the middle term.' },
                { id: 'c', prompt: 'Compare the number of ways to write 30 and 36 as sums of consecutive natural numbers. Which has more representations and why?', answer: '30 has odd factors 3,5,15 → 3 representations (9+10+11, 6+7+8+9, 4+5+6+7+8)',
                  options: ['30 has odd factors 3,5,15 → 3 representations (9+10+11, 6+7+8+9, 4+5+6+7+8)', '36 is bigger so more ways'],
                  hint: 'Revisit c6_math_ch01_015 (Prime Factorisation) to practice breaking numbers into prime factors and.',
                  misconception: 'Students think any even number with an odd factor works by simply dividing by that odd factor to get the middle term.' }
          ],
            remediations: { 'any-even-number-with-an': { steps: ['If a student produces a sum with zero or negative terms, guide them: "Your middle term is 4 with 11 terms.', 'The first term would be 4 - 5 = -1.', 'That\'s not a natural number.', 'To fix this, use an even number of terms instead.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
