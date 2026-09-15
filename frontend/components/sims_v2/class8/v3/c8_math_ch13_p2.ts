import type { SimDef } from '../../engine/types';

/** v3 generated — c8_math_ch13_p2 (5 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c8_math_ch13_p2: SimDef = {
    id: 'v3_c8_math_ch13_p2',
    title: 'Algebra Play · Part 2/2',
    subtitle: 'The \'mind-reading\' that algebra explains',
    classLevel: 8, subject: 'mathematics', topic: 'Algebra Play · Part 2/2',
    chapters: ['c8_math_ch13'],
    nodeIds: ['c8_math_ch13_5', 'c8_math_ch13_6', 'c8_math_ch13_7', 'c8_math_ch13_8', 'c8_math_ch13_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a magician\'s sceptical assistant', intro: 'Someone just \'guessed\' your final answer before you finished calculating. They\'re not psychic — they\'re hiding algebra. Time to expose the machinery.', goal: 'Translate \'think of a number\' tricks into algebraic expressions, simplify them to reveal why the variable cancels, and construct tricks that always produce a chosen constant.' },
    discovery: {
        question: '\'Think of a number. Multiply by 3, add 6, divide by 3, subtract your number.\' Answer: 2 — for EVERY starting number. How does the trick know your number?',
        options: ['It doesn\'t need to — written as algebra, the x cancels itself out: (3x + 6)/3 − x = x + 2 − x = 2', 'It secretly guesses based on psychology', 'It only works for even numbers', 'The number 3 is magic'],
        answer: 'It doesn\'t need to — written as algebra, the x cancels itself out: (3x + 6)/3 − x = x + 2 − x = 2',
        hook: 'Number tricks aren\'t mind-reading — they\'re x-assassination. Each step builds an expression engineered so the variable wipes itself out in the final subtraction. And the trap: \'add 5, multiply by 3\' means 3(x + 5), not 3x + 5.',
    },
    teaching: [
        { title: 'Algebraic Expressions: Terms, Coefficients, and Constants', text: 'An algebraic expression is a combination of variables, constants, and arithmetic operations.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c8_math_ch13_5', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Unmask three \'mind-reading\' tricks by writing them in x, simplifying step by step, and watching the variable vanish — then build your own trick that always lands on 7.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_5', title: 'Algebraic Expressions: Terms, Coefficients, and Constants',
          scaffold: { problem: 'Ravi\'s mother gives him ₹50 for school supplies. He buys x notebooks at ₹12 each, y pens at ₹5 each, and a geometry box for ₹15.',
            steps: [
            { text: 'Identify the total money Ravi starts with: ₹50 (this will be the constant term in the final expression).' },
            { text: 'Write the cost of each item as a term: notebooks cost 12x, pens cost 5y, geometry box costs 15.' },
            { text: 'Total money spent = 12x + 5y + 15. This is an expression with three terms: 12x (coefficient 12, variable part x), 5y.' },
            { text: 'Money left = 50 - (12x + 5y + 15) = 50 - 12x - 5y - 15 = -12x - 5y + 35.' },
            { text: 'Verify: if x=2, y=3, spent = 24+15+15=54, but he only has 50 – expression gives -24-15+35 = -4, meaning he is short ₹4.', faded: true, blankAnswer: 'Expression: -12x - 5y + 35. Terms: -12x (coeff. -12, var.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_6', title: 'Like and Unlike Terms: Identifying and Combining',
          scaffold: { problem: 'Riya buys \\(3\\) kg of apples at ₹\\(x\\) per kg, \\(2\\) kg of oranges at ₹\\(y\\) per kg, then another \\(4\\) kg of apples at ₹\\(x\\) per kg, and.',
            steps: [
            { text: 'Identify each purchase/return as a term: \\(3x\\) (apples), \\(2y\\) (oranges), \\(4x\\) (more apples), \\(-1y\\) (returned.' },
            { text: 'Write the expression: \\(3x + 2y + 4x - y\\).' },
            { text: 'Group like terms: terms with \\(x\\) are \\(3x\\) and \\(4x\\); terms with \\(y\\) are \\(2y\\) and \\(-y\\).' },
            { text: 'Combine coefficients: \\(3 + 4 = 7\\) for \\(x\\); \\(2 + (-1) = 1\\) for \\(y\\).' },
            { text: 'Write simplified expression: \\(7x + y\\). This means total cost = ₹\\(7x + y\\).', faded: true, blankAnswer: '\\(7x + y\\) rupees' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_7', title: 'Adding and Subtracting Algebraic Expressions',
          scaffold: { problem: 'Riya has ₹(5x + 30) and Aman has ₹(3x – 20). They combine their money to buy a gift. Write an expression for the total amount and simplify.',
            steps: [
            { text: 'Write the expressions for each person\'s money: Riya = 5x + 30, Aman = 3x – 20.' },
            { text: 'Add the expressions: (5x + 30) + (3x – 20).' },
            { text: 'Group like terms: (5x + 3x) + (30 – 20).' },
            { text: 'Add coefficients: 8x + 10.' },
            { text: 'Substitute x = 50: 8(50) + 10 = 400 + 10 = ₹410.', faded: true, blankAnswer: 'Total amount expression: 8x + 10. For x = 50, total = ₹410.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_8', title: 'Solving Linear Equations: Balancing Method',
          scaffold: { problem: 'Riya bought 3 notebooks and a ₹15 pen for a total of ₹75. If each notebook costs the same, find the cost of one notebook using the.',
            steps: [
            { text: 'Let the cost of one notebook be x rupees. The equation is 3x + 15 = 75.' },
            { text: 'To isolate the term with x, subtract 15 from both sides (balancing): 3x + 15 - 15 = 75 - 15 → 3x = 60.' },
            { text: 'To isolate x, divide both sides by 3 (balancing): 3x/3 = 60/3 → x = 20.' },
            { text: 'Verify: 3 × 20 + 15 = 60 + 15 = 75. The solution is correct.' },
            { text: 'Interpret: Each notebook costs ₹20.', faded: true, blankAnswer: '₹20' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_9', title: 'Solving Linear Equations: Transposition Method',
          scaffold: { problem: 'Riya bought 4 identical pens and a ₹15 notebook for ₹95. Find the cost of one pen.',
            steps: [
            { text: 'Let the cost of one pen be x rupees. Total cost: 4x + 15 = 95.' },
            { text: 'Transpose the constant +15 to RHS (changes to -15): 4x = 95 - 15.' },
            { text: 'Simplify RHS: 4x = 80.' },
            { text: 'Transpose the coefficient 4 (division becomes multiplication on other side): x = 80 / 4.' },
            { text: 'Compute: x = 20. Verify: 4(20) + 15 = 80 + 15 = 95.', faded: true, blankAnswer: '₹20 per pen' }
            ] } },
        { type: 'drill', nodeId: 'c8_math_ch13_9', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 3 } },
        { type: 'case', nodeId: 'c8_math_ch13_5', title: 'Use it in the wild',
          caseStudy: { intro: 'At a fair, a magician calls: \'Think of a number, multiply by 5, add 15, divide by 5, subtract your number — the answer is always 15!\' A student in the crowd whispers that the answer is not 15 at all.',
            decisions: [{ prompt: 'What does the algebra reveal?', options: [
                { text: 'Let x be the number: 5x + 15 over 5 is x + 3, and subtracting x leaves 3 — not 15. The trick works because x cancels, but the added 15 got divided by 5 along the way, shrinking it to 3.', outcome: 'This tracks each operation on the expression instead of fixating on the big number — division acts on the sum, not just on x.' },
                { text: 'The magician is right — whatever number you add becomes the final answer, so 15 it is.', outcome: 'The add-15 step is followed by a divide-by-5 step that cuts it to 3; ignoring later steps misreads the trick.', reveals: 'added-number-wins' },
                { text: 'The whisperer is wrong too — the answer keeps changing with the starting number, so nothing can be predicted.', outcome: 'The construction guarantees cancellation: the subtract-x step removes the variable entirely, leaving a fixed constant every time.', reveals: 'answer-always-varies' }
            ] }] } },
        { type: 'case', nodeId: 'c8_math_ch13_9', title: 'You made it',
          caseStudy: { intro: 'Every number trick is a disguised equation where x is programmed to disappear. Once you can translate words into algebra, the magic turns into mechanics — and you can build tricks yourself.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch13_5', difficulty: 'standard',
          question: 'An algebraic expression is a combination of variables, constants, and.',
          hint: 'Revisit c7_math_ch04_002 (Algebraic Expressions: Terms, Coefficients and Constants) and.',
          misconception: 'Students often treat the coefficient as only the number written in front of the variable, ignoring the sign.',
          parts: [
                { id: 'a', prompt: 'In the expression \\(4x^2y - \\frac{3}{2}xy^2 + 7x - 9\\), list all the terms and state the coefficient of each term.', answer: 'The terms are: \\(4x^2y\\) (coefficient 4), \\(-\\frac{3}{2}xy^2\\) (coefficient',
                  options: ['The terms are: \\(4x^2y\\) (coefficient 4), \\(-\\frac{3}{2}xy^2\\) (coefficient', '4, -3/2, 7, -9', '"4, -3/2, 7, -9" without the variable parts'],
                  hint: 'Revisit c7_math_ch04_002 (Algebraic Expressions: Terms, Coefficients and Constants) and practice.',
                  misconception: 'Students often treat the coefficient as only the number written in front of the variable, ignoring the sign.' }
          ],
            remediations: { 'students-often-treat-the-coefficient': { steps: ['Have the student rewrite the expression with explicit plus signs: \\(-4x^2 + 3x + (-5)\\).', 'Circle each term including its sign.', 'For each circled term, cover the variable part and ask "what number is multiplying the variable?" – that is the.', 'For the constant term, explain that it is a term with variable part \\(x^0 = 1\\), so its coefficient is the number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_6', difficulty: 'standard',
          question: 'Like terms are algebraic terms that have exactly the same variable part.',
          hint: 'Review identifying terms, coefficients, and variable parts in algebraic expressions.',
          misconception: 'Students often combine terms that have the same letters but different exponents, e.g., adding \\(3x^2y + 2xy^2\\) to get.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Like terms are algebraic terms that have exactly the same variable part, meaning',
                  options: ['Like terms are algebraic terms that have exactly the same variable part, meaning', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into'],
                  hint: 'Review identifying terms, coefficients, and variable parts in algebraic expressions (c8_math_ch13_5.',
                  misconception: 'Students often combine terms that have the same letters but different exponents, e.g., adding \\(3x^2y + 2xy^2\\) to get \\(5x^2y^2\\).' }
          ],
            remediations: { 'students-often-combine-terms-that': { steps: ['Have the student write each term as a product of coefficient and variable part (e.g., \\(5x^2y = 5 \\times x \\times.', 'Compare variable parts letter-by-letter with exponents; only if every variable and its exponent match exactly are they.', 'For combining, circle the coefficients including their signs, add them using integer rules (revisit integer addition.', 'Practice with a mixed set of terms where some cancel to zero to reinforce sign handling.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_7', difficulty: 'standard',
          question: 'Adding and subtracting algebraic expressions involves combining like terms.',
          hint: 'Revisit c8_math_ch13_6 (Like and Unlike Terms) and c7_math_ch10_002 (Addition of Integers.',
          misconception: 'Students often forget to change the signs of all terms in the subtrahend when subtracting expressions.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Adding and subtracting algebraic expressions involves combining like terms by adding or',
                  options: ['Adding and subtracting algebraic expressions involves combining like terms by adding or', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into'],
                  hint: 'Revisit c8_math_ch13_6 (Like and Unlike Terms) and c7_math_ch10_002 (Addition of Integers Using.',
                  misconception: 'Students often forget to change the signs of all terms in the subtrahend when subtracting expressions.' }
          ],
            remediations: { 'students-often-forget-to-change': { steps: ['Remediation: 1) Use coloured pencils to circle like terms in each expression before operating.', '2) For subtraction, explicitly write the step of distributing the minus sign: (5x – 3) – (2x + 4) = 5x – 3 – 2x – 4.', '3) Practice integer addition/subtraction rules with algebra tiles or number line to reinforce sign handling.', '4) Give exercises where students first identify like/unlike terms, then only combine like terms.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_8', difficulty: 'standard',
          question: 'The balancing method for solving linear equations states that performing the.',
          hint: 'Revisit c7_math_ch15_002 (balancing both sides) and c8_math_ch13_6 (combining like terms).',
          misconception: 'Students often make two specific errors: (1) Distributive property error: writing 3(x+2) = 3x+2 instead of 3x+6.',
          parts: [
                { id: 'a', prompt: 'What is the first step to solve the equation 3x + 5 = 14 using the balancing method?', answer: 'Subtract 5 from both sides to get 3x = 9',
                  options: ['Subtract 5 from both sides to get 3x = 9', 'divide by 3 first'],
                  hint: 'Revisit c7_math_ch15_002 (balancing both sides) and c8_math_ch13_6 (combining like terms).',
                  misconception: 'Students often make two specific errors: (1) Distributive property error: writing 3(x+2) = 3x+2 instead of 3x+6, forgetting to multiply the.' },
                { id: 'b', prompt: 'Why must we perform the same operation on both sides of an equation?', answer: 'An equation is a statement of equality',
                  options: ['An equation is a statement of equality', 'to get the variable alone'],
                  hint: 'Revisit c7_math_ch15_002 (balancing both sides) and c8_math_ch13_6 (combining like terms).',
                  misconception: 'Students often make two specific errors: (1) Distributive property error: writing 3(x+2) = 3x+2 instead of 3x+6, forgetting to multiply the.' }
          ],
            remediations: { 'students-often-make-two-specific': { steps: ['For distributive errors: use an area model.', 'Draw a rectangle of length 3 and width (x+2).', 'Have the student physically partition the rectangle.', 'For fraction errors: emphasize "multiply EVERY term by the LCM of denominators." Write each term as a separate fraction.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_9', difficulty: 'standard',
          question: 'The transposition method is a technique for solving linear equations in one.',
          hint: 'Revisit c8_math_ch13_8 (Balancing Method) and practice the phrase "subtract 3 from both.',
          misconception: 'Students transpose a term but forget to change its sign, especially with negative constants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The transposition method is a technique for solving linear equations in one variable',
                  options: ['The transposition method is a technique for solving linear equations in one variable', 'A "Think of a Number" trick is a sequence of arithmetic operations performed on an', 'Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into'],
                  hint: 'Revisit c8_math_ch13_8 (Balancing Method) and practice the phrase "subtract 3 from both sides".',
                  misconception: 'Students transpose a term but forget to change its sign, especially with negative constants.' }
          ],
            remediations: { 'students-transpose-a-term-but': { steps: ['Use a two-column "Balance vs Transposition" table.', 'Write the equation in the middle.', 'On the left, show balancing: "Subtract 2x from both sides".', 'On the right, show transposition: "2x jumps to left as -2x".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
