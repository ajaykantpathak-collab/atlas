import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch13_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch13_p1: SimDef = {
    id: 'v3_c8_math_ch13_p1',
    title: 'Algebra Play · Part 1/2',
    subtitle: 'The \'mind-reading\' that algebra explains',
    classLevel: 8, subject: 'mathematics', topic: 'Algebra Play · Part 1/2',
    chapters: ['c8_math_ch13'],
    nodeIds: ['c8_math_ch13_1', 'c8_math_ch13_10', 'c8_math_ch13_11', 'c8_math_ch13_2', 'c8_math_ch13_3', 'c8_math_ch13_4'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a magician\'s sceptical assistant', intro: 'Someone just \'guessed\' your final answer before you finished calculating. They\'re not psychic — they\'re hiding algebra. Time to expose the machinery.', goal: 'Translate \'think of a number\' tricks into algebraic expressions, simplify them to reveal why the variable cancels, and construct tricks that always produce a chosen constant.' },
    discovery: {
        question: '\'Think of a number. Multiply by 3, add 6, divide by 3, subtract your number.\' Answer: 2 — for EVERY starting number. How does the trick know your number?',
        options: ['It doesn\'t need to — written as algebra, the x cancels itself out: (3x + 6)/3 − x = x + 2 − x = 2', 'It secretly guesses based on psychology', 'It only works for even numbers', 'The number 3 is magic'],
        answer: 'It doesn\'t need to — written as algebra, the x cancels itself out: (3x + 6)/3 − x = x + 2 − x = 2',
        hook: 'Number tricks aren\'t mind-reading — they\'re x-assassination. Each step builds an expression engineered so the variable wipes itself out in the final subtraction. And the trap: \'add 5, multiply by 3\' means 3(x + 5), not 3x + 5.',
    },
    teaching: [
        { title: 'Think of a Number Tricks: Algebraic Explanation', text: 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an unknown number (represented by a variable) that always produces a predictable result regardless of the starting.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch13_1', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Unmask three \'mind-reading\' tricks by writing them in x, simplifying step by step, and watching the variable vanish — then build your own trick that always lands on 7.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_1', title: 'Think of a Number Tricks: Algebraic Explanation',
          scaffold: { problem: 'A magician says: "Think of a number. Multiply it by 6. Add 24. Divide by 6. Subtract your original number.',
            steps: [
            { text: 'Let the unknown number be \\(x\\). Write down the starting expression: \\(x\\).' },
            { text: 'Apply "Multiply by 6" → \\(6x\\). Apply "Add 24" → \\(6x + 24\\).' },
            { text: 'Apply "Divide by 6" → \\((6x + 24) / 6\\). Use distributive property: \\(6x/6 + 24/6 = x + 4\\).' },
            { text: 'Apply "Subtract the original number" → \\((x + 4) - x\\). Combine like terms: \\(x - x + 4 = 4\\).' },
            { text: 'The final expression is 4, a constant with no \\(x\\). This proves the trick always gives 4.', faded: true, blankAnswer: 'The final answer is always 4.' }
            ] } },
        { type: 'case', nodeId: 'c8_math_ch13_10', title: 'Word Problems Translating to Linear Equations',
          caseStudy: { intro: 'Imagine you and your friend are saving money for a cricket bat costing ₹1,200.',
            decisions: [{ prompt: 'What is the first step you should always take when starting to translate a word problem into a linear equation?', options: [
                { text: 'The first step is to identify the unknown quantity and assign a variable (like x) to', outcome: 'The first step is to identify the unknown quantity and assign a variable (like x) to represent it.' },
                { text: 'write the equation immediately', outcome: 'Not quite — Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).', reveals: 'students-often-translate-5-less' },
                { text: 'pick numbers', outcome: 'Not quite — Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).', reveals: 'students-often-translate-5-less' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_11', title: 'Applications of Linear Equations in Real-Life Problems',
          scaffold: { problem: 'Ramesh has ₹1000 in ₹50 and ₹100 notes. He has 15 notes in total. How many notes of each denomination does he have?',
            steps: [
            { text: 'Identify what is asked - number of ₹50 notes and ₹100 notes. Let x = number of ₹50 notes.' },
            { text: 'Express total value in terms of x. Value of ₹50 notes = 50x. Value of ₹100 notes = 100(15 - x). Total value = ₹1000.' },
            { text: 'Form the equation: 50x + 100(15 - x) = 1000.' },
            { text: 'Solve: 50x + 1500 - 100x = 1000 → -50x + 1500 = 1000 → -50x = -500 → x = 10.' },
            { text: 'Interpret: ₹50 notes = 10, ₹100 notes = 15 - 10 = 5. Verify: 10 × 50 = 500, 5 × 100 = 500, total = 1000.', faded: true, blankAnswer: '10 notes of ₹50 and 5 notes of ₹100.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_2', title: 'Designing Your Own Number Tricks Using Algebra',
          scaffold: { problem: 'Design a 5-step number trick (including "think of a number") that always results in 8.',
            steps: [
            { text: 'Let the unknown number be x. We want the final simplified expression to equal 8.' },
            { text: 'Plan operations that will cancel x. Since we need multiplication and division by 2, use them as inverse pair: multiply.' },
            { text: 'Build expression: Start with x. Multiply by 2 → 2x. Add a constant A → 2x + A. Divide by 2 → (2x + A)/2 = x + A/2.' },
            { text: 'Add a subtraction step somewhere (e.g., after adding 16, subtract 4 before dividing).' },
            { text: 'Write verbal steps: 1) Think of a number. 2) Multiply it by 2. 3) Add 20. 4) Subtract 4. 5) Divide by 2.', faded: true, blankAnswer: 'Trick: Think of a number → Multiply by 2 → Add 20 →.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_3', title: 'Number Pyramids: Rule of Adding Two Numbers Below',
          scaffold: { problem: 'A school is arranging chairs in a pyramid formation for a ceremony. The bottom row has 4 chairs marked with numbers: 12, 7, -3, 5.',
            steps: [
            { text: 'Identify the base row (Row 4): 12, 7, -3, 5. We need to build Row 3, Row 2, and Row 1 (top) using the rule: each block.' },
            { text: 'Compute Row 3 by adding adjacent pairs in Row 4: (12+7)=19, (7+(-3))=4, (-3+5)=2. So Row 3 = 19, 4, 2.' },
            { text: 'Compute Row 2 by adding adjacent pairs in Row 3: (19+4)=23, (4+2)=6. So Row 2 = 23, 6.' },
            { text: 'Compute Row 1 (top) by adding the two numbers in Row 2: 23+6 = 29.' },
            { text: 'Verify using the algebraic formula for a 4-row pyramid: Top = a + 3b + 3c + d = 12 + 3(7) + 3(-3) + 5 = 12 + 21 - 9 + 5.', faded: true, blankAnswer: 'Top number = 29. Full pyramid: Row4: 12, 7, -3, 5; Row3.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_4', title: 'Solving Number Pyramids Using Algebra',
          scaffold: { problem: 'In a 3-row number pyramid, the bottom row has numbers 4, x, and 7. The top number is 30. Find the value of x.',
            steps: [
            { text: 'Understand the pyramid structure. A 3-row pyramid has bottom row with 3 numbers. Let the bottom row be: 4, x, 7.' },
            { text: 'Write expressions for the second row using the rule: each number is the sum of the two below. Second row left = 4 + x.' },
            { text: 'Write expression for the top number: sum of the two numbers in the second row. Top = (4 + x) + (x + 7).' },
            { text: 'Simplify the expression: 4 + x + x + 7 = 2x + 11. Set this equal to the given top value 30: 2x + 11 = 30.' },
            { text: 'Solve the linear equation: 2x = 30 - 11 = 19 => x = 19/2 = 9.5. Verify: bottom: 4, 9.5, 7; second: 13.5, 16.5; top: 30.', faded: true, blankAnswer: 'x = 9.5' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch13_4', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch13_1', title: 'Use it in the wild',
          caseStudy: { intro: 'At a fair, a magician calls: \'Think of a number, multiply by 5, add 15, divide by 5, subtract your number — the answer is always 15!\' A student in the crowd whispers that the answer is not 15 at all.',
            decisions: [{ prompt: 'What does the algebra reveal?', options: [
                { text: 'Let x be the number: 5x + 15 over 5 is x + 3, and subtracting x leaves 3 — not 15. The trick works because x cancels, but the added 15 got divided by 5 along the way, shrinking it to 3.', outcome: 'This tracks each operation on the expression instead of fixating on the big number — division acts on the sum, not just on x.' },
                { text: 'The magician is right — whatever number you add becomes the final answer, so 15 it is.', outcome: 'The add-15 step is followed by a divide-by-5 step that cuts it to 3; ignoring later steps misreads the trick.', reveals: 'added-number-wins' },
                { text: 'The whisperer is wrong too — the answer keeps changing with the starting number, so nothing can be predicted.', outcome: 'The construction guarantees cancellation: the subtract-x step removes the variable entirely, leaving a fixed constant every time.', reveals: 'answer-always-varies' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch13_4', title: 'The bigger picture',
          caseStudy: { intro: 'Every number trick is a disguised equation where x is programmed to disappear. Once you can translate words into algebra, the magic turns into mechanics — and you can build tricks yourself.',
            decisions: [{ prompt: 'What comes next? Algebra Play · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Algebra Play · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch13_1', difficulty: 'standard',
          question: 'A "Think of a Number" trick is a sequence of arithmetic operations performed.',
          hint: 'Review c7_math_ch04_006 (Simplification of Algebraic Expressions: Like Terms) and.',
          misconception: 'Students often write the algebraic expression incorrectly when a multiplication step follows an addition step.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an',
                  options: ['A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into', 'A number trick is a sequence of arithmetic operations (addition, subtraction,'],
                  hint: 'Review c7_math_ch04_006 (Simplification of Algebraic Expressions: Like Terms) and c6_math_ch05_055.',
                  misconception: 'Students often write the algebraic expression incorrectly when a multiplication step follows an addition step.' }
          ],
            remediations: { 'students-often-write-the-algebraic': { steps: ['If a student writes \\(x + 5 \\times 3\\) for "Add 5, then multiply by 3", do this: (1) Have them act out the trick with.', '(2) Show that \\(x + 5 \\times 3\\) with \\(x = 4\\) gives \\(4 + 15 = 19\\), not 27.', '(3) Explain: "The multiplication applies to the WHOLE result so far, not just the 5.', 'We need brackets: \\(3 \\times (x + 5)\\)." (4) Practice 3 similar tricks step by step, insisting on writing the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_10', difficulty: 'standard',
          question: 'Translating word problems into linear equations is the process of identifying.',
          hint: 'Revisit c7_math_ch04_004 (Writing Algebraic Expressions from Word Problems) and practice.',
          misconception: 'Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Translating word problems into linear equations is the process of identifying unknown',
                  options: ['Translating word problems into linear equations is the process of identifying unknown', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'Applications of linear equations involve translating real-world situations into', 'A number trick is a sequence of arithmetic operations (addition, subtraction,'],
                  hint: 'Revisit c7_math_ch04_004 (Writing Algebraic Expressions from Word Problems) and practice.',
                  misconception: 'Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).' }
          ],
            remediations: { 'students-often-translate-5-less': { steps: ['Write the phrase "5 less than x" on the board.', 'Ask: "If x = 10, what is 5 less than 10?" Student says 5.', 'Show that \\(x - 5 = 5\\) but \\(5 - x = -5\\).', 'Emphasize: "less than" means subtraction but the order is opposite to the English order.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_11', difficulty: 'standard',
          question: 'Applications of linear equations involve translating real-world situations into.',
          hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation.',
          misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.',
          parts: [
                { id: 'a', prompt: 'In a rectangle, the length is 5 cm more than the breadth. The perimeter is 50 cm. A student writes: 2(x + 5) + 2x = 50.', answer: 'x represents the breadth in cm',
                  options: ['x represents the breadth in cm', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation practice.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' },
                { id: 'b', prompt: 'Solve: "The sum of three consecutive even numbers is 90. Find the numbers." Show all steps.', answer: 'Let the smallest even number be x',
                  options: ['Let the smallest even number be x', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation practice.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' },
                { id: 'c', prompt: 'Compare these two problems: (A) "A number increased by 15 equals 40" and (B) "A number increased by 15% equals 40." Why does (A) lead to a linear equation but.', answer: '(A) gives x + 15 = 40 (linear, variable to power 1)',
                  options: ['(A) gives x + 15 = 40 (linear, variable to power 1)', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation practice.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' }
          ],
            remediations: { 'students-incorrectly-define-the-variable': { steps: ['Ask the student to list the first 5 even numbers (2, 4, 6, 8, 10) and observe the gap.', 'Ask "If the first even number is x, what is the next even number?" Guide them to see x+2, not x+1.', 'Have them write the general pattern: even numbers are 2n, 2n+2, 2n+4... or simply x, x+2, x+4 where x is even.', 'Re-solve the original problem with correct expressions and verify the answers are actually even.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Mohan has ₹500 in ₹10 and ₹20 notes. Total notes = 35. Find number of ₹10 notes." Their working: Let x = ₹10 notes. ₹20 notes = 35 - x.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation practice.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' },
                { id: 'b', prompt: 'Create a real-life problem (Indian context) that leads to the equation 5x - 3(x + 4) = 20. Define what x represents and write the full word problem.', answer: 'Example: "A shopkeeper sells pens for ₹5 each and pencils for ₹3 each',
                  options: ['Example: "A shopkeeper sells pens for ₹5 each and pencils for ₹3 each', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation practice.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' }
          ],
            remediations: { 'students-incorrectly-define-the-variable': { steps: ['Ask the student to list the first 5 even numbers (2, 4, 6, 8, 10) and observe the gap.', 'Ask "If the first even number is x, what is the next even number?" Guide them to see x+2, not x+1.', 'Have them write the general pattern: even numbers are 2n, 2n+2, 2n+4... or simply x, x+2, x+4 where x is even.', 'Re-solve the original problem with correct expressions and verify the answers are actually even.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_2', difficulty: 'standard',
          question: 'A number trick is a sequence of arithmetic operations (addition, subtraction.',
          hint: 'Review writing and simplifying algebraic expressions from word problems (Class 6 Algebra.',
          misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple.',
          parts: [
                { id: 'a', prompt: 'Explain why the trick "Think of a number. Add 5. Multiply by 2. Subtract 4. Divide by 2.', answer: 'Let the number be x',
                  options: ['Let the number be x', 'if I pick 2, I get 3', 'only shows arithmetic with a specific number (e'],
                  hint: 'Review writing and simplifying algebraic expressions from word problems (Class 6 Algebra Chapter.',
                  misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple terms.' },
                { id: 'b', prompt: 'Compare these two tricks. Do they always give the same result? Trick A: "Think of a number. Double it. Add 6. Halve it.', answer: 'Trick A: ((2x+6)/2) - x = x+3 - x = 3',
                  options: ['Trick A: ((2x+6)/2) - x = x+3 - x = 3', 'cancel the number'],
                  hint: 'Review writing and simplifying algebraic expressions from word problems (Class 6 Algebra Chapter.',
                  misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple terms.' }
          ],
            remediations: { 'students-often-forget-to-apply': { steps: ['If a student makes this distribution error, return to the verbal steps and ask: "When you say \'divide the result by 3\'.', 'Emphasize that the division bar acts like a bracket: (3x+15)/3.', 'Then show the distributive property: 3x/3 + 15/3 = x + 5.', 'Practice with numerical examples: if x=2, previous result is 21; 21/3=7.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_3', difficulty: 'standard',
          question: 'A number pyramid is a triangular arrangement of numbers where each number in.',
          hint: 'Revisit forming algebraic expressions from patterns (c7_math_ch04_004) and integer.',
          misconception: 'Students often write the second row as \\(a+b,\\; b+c\\) correctly, but then for the third row they write \\((a+b).',
          parts: [
                { id: 'a', prompt: 'Two students build 4-row pyramids with the same base numbers \\(p, q, r, s\\). Student A uses the rule "add the two below".', answer: 'No, they will not get the same pyramid',
                  options: ['No, they will not get the same pyramid', 'yes, addition is commutative'],
                  hint: 'Revisit forming algebraic expressions from patterns (c7_math_ch04_004) and integer addition rules.',
                  misconception: 'Students often write the second row as \\(a+b,\\; b+c\\) correctly, but then for the third row they write \\((a+b) + (b+c)\\) and simplify.' }
          ],
            remediations: { 'students-often-write-the-second': { steps: ['Have the student build a pyramid with physical number cards (e.g., base: 2, 5, 3).', 'Physically place the sum cards above.', 'Ask: "How many times did we use the 5?" (Twice: once for 2+5, once for 5+3).', 'Write the algebraic pyramid side-by-side with the numeric one: base \\(x, 5, y\\) → second row \\(x+5,\\; 5+y\\) → top.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_4', difficulty: 'standard',
          question: 'A number pyramid is a triangular arrangement of numbers where each number in.',
          hint: 'Review solving linear equations (c7_math_ch15_003) and combining like terms.',
          misconception: 'Students often incorrectly assume that the pyramid rule applies horizontally (e.g., adding adjacent numbers in the same.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A number pyramid is a triangular arrangement of numbers where each number in a higher row',
                  options: ['A number pyramid is a triangular arrangement of numbers where each number in a higher row', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into'],
                  hint: 'Review solving linear equations (c7_math_ch15_003) and combining like terms (c7_math_ch04_007).',
                  misconception: 'Students often incorrectly assume that the pyramid rule applies horizontally (e.g., adding adjacent numbers in the same row) instead.' }
          ],
            remediations: { 'students-often-incorrectly-assume-that': { steps: ['To fix: 1) Draw the pyramid and physically point to the two numbers that sum to the number above.', '2) Use a color-coding system: each cell gets a unique color; write the algebraic expression for that cell in that color.', '3) Practice with a 3-row pyramid where all bottom numbers are known, compute upwards, then replace one known with.', '4) Emphasize that each cell has exactly one value, so if we express it in two ways (e.g., as a sum and as a variable).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
