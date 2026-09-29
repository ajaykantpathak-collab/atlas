import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch05_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch05_p2: SimDef = {
    id: 'v3_c8_math_ch05_p2',
    title: 'Number Play',
    subtitle: 'Divisibility tricks, digit puzzles, and why some numbers hide patterns in plain sight.',
    classLevel: 8, subject: 'mathematics', topic: 'Number Play',
    chapters: ['c8_math_ch05'],
    nodeIds: ['c8_math_ch5_5', 'c8_math_ch5_6', 'c8_math_ch5_7', 'c8_math_ch5_8', 'c8_math_ch5_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a puzzle-setter designing challenges', intro: 'A friend claims they can tell instantly whether any number divides by 9 — without dividing. Your job: find their trick, then prove it always works.', goal: 'Use digit patterns and place value to explain divisibility rules — not just apply them.' },
    discovery: {
        question: 'Take any 3-digit number, reverse it, subtract the smaller from the larger — the answer is ALWAYS divisible by 99. Coincidence?',
        options: ['No — place value forces the difference to be 99 times a digit gap', 'Yes — a numerical coincidence', 'Only for certain numbers', 'Only if the digits are different'],
        answer: 'No — place value forces the difference to be 99 times a digit gap',
        hook: 'The trick isn\'t magic — it\'s place value. abc − cba = 99(a−c), always. The digits decide everything.',
    },
    teaching: [
        { title: 'Parity Rules: Sum and Difference of Even and Odd Numbers', text: 'Parity rules state that the sum or difference of two integers follows predictable patterns based on whether each integer is even (divisible by 2) or odd (not divisible by 2): even ± even = even, odd.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch5_5', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Test the rule yourself: try five different numbers — then figure out WHY it must always work.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_5', title: 'Parity Rules: Sum and Difference of Even and Odd Numbers',
          scaffold: { problem: 'A mountain climber starts at an elevation of 2,450 metres. She descends 387 metres, ascends 1,204 metres, descends 593 metres, and finally.',
            steps: [
            { text: 'Identify the parity of each elevation change: starting elevation 2450 is even (ends in 0), descent 387 is odd (ends.' },
            { text: 'Write the sequence of operations with parity: even − odd + even − odd + even.' },
            { text: 'Apply parity rules left to right: even − odd = odd (since subtracting odd flips parity), odd + even = odd, odd − odd.' },
            { text: 'Verify using algebraic forms: 2450 = 2(1225), 387 = 2(193)+1, 1204 = 2(602), 593 = 2(296)+1, 876 = 2(438).' },
            { text: 'Conclude the final elevation is an even number of metres.', faded: true, blankAnswer: 'The final elevation is even.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_6', title: 'Placing Plus and Minus Signs Between Four Consecutive Numbers',
          scaffold: { problem: 'A teacher writes four consecutive numbers on the board: 7, 8, 9, 10.',
            steps: [
            { text: 'Identify the four consecutive numbers: n=7, so numbers are 7, 8, 9, 10.' },
            { text: 'List all 8 sign patterns systematically: (+,+,+), (+,+,-), (+,-,+), (+,-,-), (-,+,+), (-,+,-), (-,-,+), (-,-,-).' },
            { text: 'Compute each expression using integer rules:' },
            { text: 'Collect the set of values: {-10, -4, -2, 0, 14, 16, 18, 34}. Observe all are even.' },
            { text: 'Verify parity using algebraic reasoning: each expression = 7(1+s₁+s₂+s₃) + (s₁+2s₂+3s₃).', faded: true, blankAnswer: 'The 8 values are -10, -4, -2, 0, 14, 16, 18, 34. All are.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_7', title: 'Algebraic Explanation of Parity Patterns',
          scaffold: { problem: 'A teacher asks students to pick any two even numbers and multiply them. She claims the product will always be even.',
            steps: [
            { text: 'Represent the two even numbers algebraically. Let the first even number be \\(2a\\) and the second be \\(2b\\), where \\(a\\).' },
            { text: 'Write the expression for their product: \\(P = (2a) \\times (2b)\\).' },
            { text: 'Simplify using multiplication: \\(P = 4ab\\).' },
            { text: 'Factor out 2 to show the form of an even number: \\(P = 2(2ab)\\).' },
            { text: 'Verify with given numbers: 14 = \\(2 \\times 7\\) (so \\(a=7\\)), 22 = \\(2 \\times 11\\) (so \\(b=11\\)).', faded: true, blankAnswer: 'The product is always even. For 14 and 22, product = 308.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_8', title: 'Divisibility Tests: Rules for 2, 3, 5, 9, 10',
          scaffold: { problem: 'A school has 2,340 students. The principal wants to divide them into equal groups for a sports day. Can she make groups of 2? 3? 5? 9? 10?',
            steps: [
            { text: 'Write the number 2,340 and identify the last digit (0) and the sum of digits (2+3+4+0 = 9).' },
            { text: 'Apply the rule for 2: last digit is 0 (even) → divisible by 2. Groups of 2 work.' },
            { text: 'Apply the rule for 3: sum of digits = 9, which is a multiple of 3 → divisible by 3. Groups of 3 work.' },
            { text: 'Apply the rule for 5: last digit is 0 → divisible by 5. Groups of 5 work.' },
            { text: 'Apply the rule for 9: sum of digits = 9, which is a multiple of 9 → divisible by 9. Groups of 9 work.' },
            { text: 'Apply the rule for 10: last digit is 0 → divisible by 10. Groups of 10 work.', faded: true, blankAnswer: 'Yes for all group sizes (2, 3, 5, 9, 10). 2,340.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch5_9', title: 'Divisibility Tests: Rules for 4, 6, 8, 11',
          scaffold: { problem: 'A school has 3,456 chairs. They want to arrange them in rows of 8 chairs each. Will there be any chairs left over?',
            steps: [
            { text: 'Identify the number to test: 3,456. We need to check divisibility by 8.' },
            { text: 'Recall the rule for 8: check the last three digits. The last three digits are 456.' },
            { text: 'Divide 456 by 8. 8 × 50 = 400, remainder 56. 8 × 7 = 56. So 456 ÷ 8 = 57 exactly.' },
            { text: 'Since the last three digits form a number divisible by 8, the whole number 3,456 is divisible by 8.' },
            { text: 'Conclude: No chairs left over; they can make exactly 432 rows (3,456 ÷ 8 = 432).', faded: true, blankAnswer: 'No chairs left over; 3,456 is divisible by 8.' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch5_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch5_5', title: 'Use it in the wild',
          caseStudy: { intro: 'In a number-game round, the host says: \'Pick any four consecutive whole numbers — your sum will always be a multiple of 4, because there are four terms.\' A contestant hesitates before playing along.',
            decisions: [{ prompt: 'Is the host\'s claim safe to rely on?', options: [
                { text: 'No — test 1+2+3+4 = 10, which is not a multiple of 4. Four consecutive numbers sum to 4n+6 = 2×(odd), always even but never divisible by 4. The three-number trick works only because an odd count has a middle number acting as the average.', outcome: 'This tests the pattern instead of assuming it — \'as many terms\' does not mean \'divisible by that many\' when the count is even.' },
                { text: 'The claim holds — k terms always give a multiple of k, and three consecutive numbers prove the pattern.', outcome: 'The three-term case works because its sum is 3×(middle term); with an even count the average is a half-integer, so the divisibility quietly breaks.', reveals: 'terms-mean-divisible' },
                { text: 'It fails but in the other direction — four consecutive numbers always give an odd sum.', outcome: 'Check 1+2+3+4 = 10: even, not odd; the real rule is \'always even, never a multiple of 4.\'', reveals: 'four-gives-odd' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch5_9', title: 'You made it',
          caseStudy: { intro: 'Number patterns are arithmetic wearing a costume — learn to see the structure and \'tricks\' become proofs.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch5_5', difficulty: 'standard',
          question: 'Parity rules state that the sum or difference of two integers follows.',
          hint: 'Revisit c7_math_ch06_002 (Picking Parity) and c7_math_ch10_002/003 (Integer.',
          misconception: 'Students treat subtraction differently from addition for parity: they correctly know odd + odd = even, but for odd.',
          parts: [
                { id: 'a', prompt: 'Explain why the sum of two odd numbers is always even, using the algebraic forms 2k+1 and 2m+1.', answer: '(2k+1) + (2m+1) = 2k + 2m + 2 = 2(k+m+1)',
                  options: ['(2k+1) + (2m+1) = 2k + 2m + 2 = 2(k+m+1)', 'negative numbers follow different parity rules'],
                  hint: 'Revisit c7_math_ch06_002 (Picking Parity) and c7_math_ch10_002/003 (Integer Addition/Subtraction).',
                  misconception: 'Students treat subtraction differently from addition for parity: they correctly know odd + odd = even, but for odd − odd they often say.' }
          ],
            remediations: { 'students-treat-subtraction-differently-from': { steps: ['Have the student list integers from −10 to 10 and mark each as E (even) or O (odd).', 'For subtraction, rewrite a − b as a + (−b) and note that −b has the same parity as b.', 'Build a 2×2 truth table for all four combinations of (parity of a, parity of b) for both a + b and a − b, showing they.', 'Practice 5 problems mixing positive/negative integers until the pattern is automatic.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_6', difficulty: 'standard',
          question: 'Given four consecutive integers \\(n, n+1, n+2, n+3\\), placing plus or minus.',
          hint: 'Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and.',
          misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading.',
          parts: [
                { id: 'a', prompt: 'For the four consecutive numbers 5, 6, 7, 8, how many different expressions can be formed by placing + or - signs in the three gaps between them?', answer: 'Answer: 8 expressions',
                  options: ['Answer: 8 expressions', 'negative first number', 'there are 4 gaps instead of 3'],
                  hint: 'Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' },
                { id: 'b', prompt: 'For the consecutive numbers 10, 11, 12, 13, find the value of the expression with signs: \\(10 - 11 - 12 + 13\\).', answer: 'Step 1: \\(10 - 11 = -1\\) Step 2: \\(-1 - 12 = -13\\) Step 3: \\(-13 + 13 = 0\\)',
                  options: ['Step 1: \\(10 - 11 = -1\\) Step 2: \\(-1 - 12 = -13\\) Step 3: \\(-13 + 13 = 0\\)', 'negative first number'],
                  hint: 'Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' }
          ],
            remediations: { 'students-treat-the-first-number': { steps: ['If the student includes a sign before the first number, draw a physical representation: write the four numbers on cards.', 'Place sign cards only in the gaps.', 'Emphasize: "The first number starts the expression; we only choose what happens *between* numbers." Then list the 3.', 'Count: 3 gaps × 2 choices = 8.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_6', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading.',
          parts: [
                { id: 'a', prompt: 'A student claims: "For any four consecutive numbers, the largest possible value is always the sum of all four, and the smallest is always the first minus the.', answer: 'The claim is CORRECT',
                  options: ['The claim is CORRECT', 'negative first number'],
                  hint: 'Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' },
                { id: 'b', prompt: 'Create a new problem: Choose four consecutive numbers such that one of the 8 possible values equals exactly 100.', answer: 'Good answer: Let the numbers be \\(n, n+1, n+2, n+3\\)',
                  options: ['Good answer: Let the numbers be \\(n, n+1, n+2, n+3\\)', 'negative first number'],
                  hint: 'Review c6_math_ch02_019 and c6_math_ch02_020 for integer addition/subtraction rules, and.',
                  misconception: 'Students treat the first number as having a sign choice (e.g., writing \\(\\pm n \\pm (n+1) \\pm (n+2) \\pm (n+3)\\)) leading to 16 combinations.' }
          ],
            remediations: { 'students-treat-the-first-number': { steps: ['If the student includes a sign before the first number, draw a physical representation: write the four numbers on cards.', 'Place sign cards only in the gaps.', 'Emphasize: "The first number starts the expression; we only choose what happens *between* numbers." Then list the 3.', 'Count: 3 gaps × 2 choices = 8.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_7', difficulty: 'standard',
          question: 'Algebraic Explanation of Parity Patterns uses variables to represent even.',
          hint: 'Revisit c6_math_ch05_060 (Patterns and Algebra) to practice generalizing patterns with.',
          misconception: 'Students often use the *same* variable for two different even/odd numbers in a proof (e.g., representing two even.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Algebraic Explanation of Parity Patterns uses variables to represent even numbers as',
                  options: ['Algebraic Explanation of Parity Patterns uses variables to represent even numbers as', 'The sum of consecutive numbers refers to adding a sequence of integers where each number', 'A two-digit number reversal puzzle involves representing a two-digit number algebraically', 'A cryptarithm is a mathematical puzzle where digits in an arithmetic operation (addition,'],
                  hint: 'Revisit c6_math_ch05_060 (Patterns and Algebra) to practice generalizing patterns with variables.',
                  misconception: 'Students often use the *same* variable for two different even/odd numbers in a proof (e.g., representing two even numbers as \\(2n\\) and.' }
          ],
            remediations: { 'students-often-use-the-same': { steps: ['If a student uses the same variable for two numbers: 1) Ask: "If the first even number is 4 (so \\(n=2\\)), what does.', '2) Show a counterexample: "We want to prove for 4 and 6.', 'Can we pick one \\(n\\) that makes \\(2n=4\\) and \\(2n=6\\)?" 3) Introduce a second variable: "We need \\(2a\\) and \\(2b\\).', 'Emphasize: different numbers → different variables.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_8', difficulty: 'standard',
          question: 'Divisibility tests are shortcut rules that determine whether a given integer.',
          hint: 'Revisit place value (c6_math_ch01_003) and the concept of multiples (c6_math_ch01_013).',
          misconception: 'Students often believe that for divisibility by 3 or 9, the sum of digits must be exactly 3 or 9 (a single digit).',
          parts: [
                { id: 'a', prompt: 'State the divisibility rule for 9 and give an example of a 3-digit number that is divisible by 9.', answer: 'Rule: A number is divisible by 9 if the sum of its digits is a multiple of 9',
                  options: ['Rule: A number is divisible by 9 if the sum of its digits is a multiple of 9', 'last digit is 9'],
                  hint: 'Revisit place value (c6_math_ch01_003) and the concept of multiples (c6_math_ch01_013) to reinforce.',
                  misconception: 'Students often believe that for divisibility by 3 or 9, the sum of digits must be exactly 3 or 9 (a single digit), rather than any multiple.' }
          ],
            remediations: { 'for-divisibility-by-3-or': { steps: ['Write the number and compute the digit sum explicitly.', 'Ask: "Is 21 in the 3 times table?', 'Recite the 3 times table: 3,6,9,12,15,18,21..." 3.', 'Show that 21 = 3×7, so it is a multiple of 3.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch5_9', difficulty: 'standard',
          question: 'Divisibility tests are shortcut rules to determine if a whole number.',
          hint: 'Review the place-value reasoning behind divisibility by 2, 5, 10 (last digit) and by 3, 9.',
          misconception: 'Students often apply the divisibility rule for 11 by summing digits from the leftmost side instead of the rightmost.',
          parts: [
                { id: 'a', prompt: 'A number is divisible by 4 and 6. Is it necessarily divisible by 24? Explain with a counterexample or proof.', answer: 'Not necessarily',
                  options: ['Not necessarily', 'yes, because 4×6=24'],
                  hint: 'Review the place-value reasoning behind divisibility by 2, 5, 10 (last digit) and by 3, 9 (digit.',
                  misconception: 'Students often apply the divisibility rule for 11 by summing digits from the leftmost side instead of the rightmost (units) side.' }
          ],
            remediations: { 'students-often-apply-the-divisibility': { steps: ['If a student checks only the last two digits for divisibility by 8, remind them that 1000 is divisible by 8 (1000 ÷ 8.', 'Therefore, only the last three digits determine the remainder.', 'Have them write the number as (multiple of 1000) + (last three digits).', 'Then test the last three digits with division by 8.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
