import type { SimDef } from '../../engine/types';
import C8_MathematicsLinearEquationsInOneVariableSim from '../../../simulations/c6_12/C8_MathematicsLinearEquationsInOneVariableSim';

/** v3 wrapped master — C8_MathematicsLinearEquationsInOneVariableSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c8_mathematicslinearequationsinonevariablesim: SimDef = {
    id: 'v3w_c8_mathematicslinearequationsinonevariablesim',
    title: 'Word Problems Translating to Linear Equations',
    subtitle: 'This node covers translation of word problems involving a single unknown leading to.',
    classLevel: 8, subject: 'mathematics', topic: 'Word Problems Translating to Linear Equations',
    chapters: [],
    nodeIds: ['c8_math_ch13_10', 'c8_math_ch13_11', 'c8_math_ch13_8', 'c8_math_ch13_9', 'c8_math_ch10_10', 'c8_math_ch13_2', 'c8_math_ch7_7', 'c8_math_ch13_4', 'c8_math_ch13_1', 'c8_math_ch13_5', 'c8_math_ch13_6', 'c8_math_ch10_9', 'c8_math_ch7_5', 'c8_math_ch10_1', 'c8_math_ch13_7'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 8 learner', intro: 'Imagine you and your friend are saving money for a cricket bat costing ₹1,200.', goal: 'Master Word Problems Translating to Linear Equations.' },
    discovery: {
        question: 'In a rectangle, the length is 5 cm more than the breadth. The perimeter is 50 cm. A student writes: 2(x + 5) + 2x = 50.',
        options: ['x represents the breadth in cm', 'consecutive numbers', 'consecutive even/odd numbers'],
        answer: 'x represents the breadth in cm',
        hook: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.',
    },
    teaching: [
        { title: 'Translating word problems into linear.', text: 'Translating word problems into linear equations is the process of identifying unknown quantities, representing them with variables, and converting the verbal relationships and constraints described.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'case', nodeId: 'c8_math_ch13_10', title: 'Translating word problems into linear.',
          caseStudy: { intro: 'Imagine you and your friend are saving money for a cricket bat costing ₹1,200.',
            decisions: [{ prompt: 'What is the first step you should always take when starting to translate a word problem into a linear equation?', options: [
                { text: 'The first step is to identify the unknown quantity and assign a variable (like x) to', outcome: 'The first step is to identify the unknown quantity and assign a variable (like x) to represent it.' },
                { text: 'write the equation immediately', outcome: 'Not quite — Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).', reveals: 'students-often-translate-5-less' },
                { text: 'pick numbers', outcome: 'Not quite — Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).', reveals: 'students-often-translate-5-less' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_11', title: 'Applications of linear equations.',
          scaffold: { problem: 'Ramesh has ₹1000 in ₹50 and ₹100 notes. He has 15 notes in total. How many notes of each denomination does he have?',
            steps: [
            { text: 'Identify what is asked - number of ₹50 notes and ₹100 notes. Let x = number of ₹50 notes.' },
            { text: 'Express total value in terms of x. Value of ₹50 notes = 50x. Value of ₹100 notes = 100(15 - x). Total value = ₹1000.' },
            { text: 'Form the equation: 50x + 100(15 - x) = 1000.' },
            { text: 'Solve: 50x + 1500 - 100x = 1000 → -50x + 1500 = 1000 → -50x = -500 → x = 10.' },
            { text: 'Interpret: ₹50 notes = 10, ₹100 notes = 15 - 10 = 5. Verify: 10 × 50 = 500, 5 × 100 = 500, total = 1000.', faded: true, blankAnswer: '10 notes of ₹50 and 5 notes of ₹100.' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_8', title: 'The balancing method for solving linear.',
          scaffold: { problem: 'Riya bought 3 notebooks and a ₹15 pen for a total of ₹75. If each notebook costs the same, find the cost of one notebook using the.',
            steps: [
            { text: 'Let the cost of one notebook be x rupees. The equation is 3x + 15 = 75.' },
            { text: 'To isolate the term with x, subtract 15 from both sides (balancing): 3x + 15 - 15 = 75 - 15 → 3x = 60.' },
            { text: 'To isolate x, divide both sides by 3 (balancing): 3x/3 = 60/3 → x = 20.' },
            { text: 'Verify: 3 × 20 + 15 = 60 + 15 = 75. The solution is correct.' },
            { text: 'Interpret: Each notebook costs ₹20.', faded: true, blankAnswer: '₹20' }
            ] } },
        { type: 'scaffold', nodeId: 'c8_math_ch13_9', title: 'The transposition method is a technique.',
          scaffold: { problem: 'Riya bought 4 identical pens and a ₹15 notebook for ₹95. Find the cost of one pen.',
            steps: [
            { text: 'Let the cost of one pen be x rupees. Total cost: 4x + 15 = 95.' },
            { text: 'Transpose the constant +15 to RHS (changes to -15): 4x = 95 - 15.' },
            { text: 'Simplify RHS: 4x = 80.' },
            { text: 'Transpose the coefficient 4 (division becomes multiplication on other side): x = 80 / 4.' },
            { text: 'Compute: x = 20. Verify: 4(20) + 15 = 80 + 15 = 95.', faded: true, blankAnswer: '₹20 per pen' }
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
        { type: 'scaffold', nodeId: 'c8_math_ch13_2', title: 'A number trick is a sequence of.',
          scaffold: { problem: 'Design a 5-step number trick (including "think of a number") that always results in 8.',
            steps: [
            { text: 'Let the unknown number be x. We want the final simplified expression to equal 8.' },
            { text: 'Plan operations that will cancel x. Since we need multiplication and division by 2, use them as inverse pair: multiply.' },
            { text: 'Build expression: Start with x. Multiply by 2 → 2x. Add a constant A → 2x + A. Divide by 2 → (2x + A)/2 = x + A/2.' },
            { text: 'Add a subtraction step somewhere (e.g., after adding 16, subtract 4 before dividing).' },
            { text: 'Write verbal steps: 1) Think of a number. 2) Multiply it by 2. 3) Add 20. 4) Subtract 4. 5) Divide by 2.', faded: true, blankAnswer: 'Trick: Think of a number → Multiply by 2 → Add 20 →.' }
            ] } }
    ],
    explore: { component: C8_MathematicsLinearEquationsInOneVariableSim, prompt: 'Explore the interactive — Word Problems Translating to Linear Equations' },
    challenges: [
        { type: 'subpart', nodeId: 'c8_math_ch13_10', difficulty: 'standard',
          question: 'Translating word problems into linear equations is the process of identifying.',
          hint: 'Revisit c7_math_ch04_004 (Writing Algebraic Expressions from Word Problems) and practice.',
          misconception: 'Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Translating word problems into linear equations is the process of identifying unknown',
                  options: ['Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into', 'The balancing method for solving linear equations states that performing the same', 'The transposition method is a technique for solving linear equations in one variable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often translate "5 less than x" as \\(5 - x\\) instead of \\(x - 5\\).' }
          ],
            remediations: { 'students-often-translate-5-less': { steps: ['Write the phrase "5 less than x" on the board.', 'Ask: "If x = 10, what is 5 less than 10?" Student says 5.', 'Show that \\(x - 5 = 5\\) but \\(5 - x = -5\\).', 'Emphasize: "less than" means subtraction but the order is opposite to the English order.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_11', difficulty: 'standard',
          question: 'Applications of linear equations involve translating real-world situations into.',
          hint: 'Revisit c8_math_ch13_10 (Word Problems Translating to Linear Equations) for translation.',
          misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.',
          parts: [
                { id: 'a', prompt: 'In a rectangle, the length is 5 cm more than the breadth. The perimeter is 50 cm. A student writes: 2(x + 5) + 2x = 50.', answer: 'x represents the breadth in cm',
                  options: ['x represents the breadth in cm', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' },
                { id: 'b', prompt: 'Solve: "The sum of three consecutive even numbers is 90. Find the numbers." Show all steps.', answer: 'Let the smallest even number be x',
                  options: ['Let the smallest even number be x', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' },
                { id: 'c', prompt: 'Compare these two problems: (A) "A number increased by 15 equals 40" and (B) "A number increased by 15% equals 40." Why does (A) lead to a linear equation but.', answer: '(A) gives x + 15 = 40 (linear, variable to power 1)',
                  options: ['(A) gives x + 15 = 40 (linear, variable to power 1)', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' }
          ],
            remediations: { 'students-incorrectly-define-the-variable': { steps: ['Ask the student to list the first 5 even numbers (2, 4, 6, 8, 10) and observe the gap.', 'Ask "If the first even number is x, what is the next even number?" Guide them to see x+2, not x+1.', 'Have them write the general pattern: even numbers are 2n, 2n+2, 2n+4... or simply x, x+2, x+4 where x is even.', 'Re-solve the original problem with correct expressions and verify the answers are actually even.', 'Give 3 similar practice problems with immediate checking.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_11', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.',
          parts: [
                { id: 'a', prompt: 'A student solves: "Mohan has ₹500 in ₹10 and ₹20 notes. Total notes = 35. Find number of ₹10 notes." Their working: Let x = ₹10 notes. ₹20 notes = 35 - x.', answer: 'Yes, correct',
                  options: ['Yes, correct', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' },
                { id: 'b', prompt: 'Create a real-life problem (Indian context) that leads to the equation 5x - 3(x + 4) = 20. Define what x represents and write the full word problem.', answer: 'Example: "A shopkeeper sells pens for ₹5 each and pencils for ₹3 each',
                  options: ['Example: "A shopkeeper sells pens for ₹5 each and pencils for ₹3 each', 'consecutive numbers', 'consecutive even/odd numbers'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly define the variable for "consecutive even/odd numbers" as x, x+1, x+2 instead of x, x+2, x+4.' }
          ],
            remediations: { 'students-incorrectly-define-the-variable': { steps: ['Ask the student to list the first 5 even numbers (2, 4, 6, 8, 10) and observe the gap.', 'Ask "If the first even number is x, what is the next even number?" Guide them to see x+2, not x+1.', 'Have them write the general pattern: even numbers are 2n, 2n+2, 2n+4... or simply x, x+2, x+4 where x is even.', 'Re-solve the original problem with correct expressions and verify the answers are actually even.', 'Give 3 similar practice problems with immediate checking.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_8', difficulty: 'standard',
          question: 'The balancing method for solving linear equations states that performing the.',
          hint: 'Revisit c7_math_ch15_002 (balancing both sides) and c8_math_ch13_6 (combining like terms).',
          misconception: 'Students often make two specific errors: (1) Distributive property error: writing 3(x+2) = 3x+2 instead of 3x+6,.',
          parts: [
                { id: 'a', prompt: 'What is the first step to solve the equation 3x + 5 = 14 using the balancing method?', answer: 'Subtract 5 from both sides to get 3x = 9',
                  options: ['Subtract 5 from both sides to get 3x = 9', 'divide by 3 first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often make two specific errors: (1) Distributive property error: writing 3(x+2) = 3x+2 instead of 3x+6, forgetting to multiply the.' },
                { id: 'b', prompt: 'Why must we perform the same operation on both sides of an equation?', answer: 'An equation is a statement of equality',
                  options: ['An equation is a statement of equality', 'to get the variable alone'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often make two specific errors: (1) Distributive property error: writing 3(x+2) = 3x+2 instead of 3x+6, forgetting to multiply the.' }
          ],
            remediations: { 'students-often-make-two-specific': { steps: ['For distributive errors: use an area model.', 'Draw a rectangle of length 3 and width (x+2).', 'Have the student physically partition the rectangle.', 'For fraction errors: emphasize "multiply EVERY term by the LCM of denominators." Write each term as a separate fraction.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_9', difficulty: 'standard',
          question: 'The transposition method is a technique for solving linear equations in one.',
          hint: 'Revisit c8_math_ch13_8 (Balancing Method) and practice the phrase "subtract 3 from both.',
          misconception: 'Students transpose a term but forget to change its sign, especially with negative constants.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The transposition method is a technique for solving linear equations in one variable',
                  options: ['The transposition method is a technique for solving linear equations in one variable', 'Translating word problems into linear equations is the process of identifying unknown', 'Applications of linear equations involve translating real-world situations into', 'The balancing method for solving linear equations states that performing the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students transpose a term but forget to change its sign, especially with negative constants.' }
          ],
            remediations: { 'students-transpose-a-term-but': { steps: ['Use a two-column "Balance vs Transposition" table.', 'Write the equation in the middle.', 'On the left, show balancing: "Subtract 2x from both sides".', 'On the right, show transposition: "2x jumps to left as -2x".'] } } },
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
        { type: 'subpart', nodeId: 'c8_math_ch13_2', difficulty: 'standard',
          question: 'A number trick is a sequence of arithmetic operations (addition, subtraction,.',
          hint: 'Review writing and simplifying algebraic expressions from word problems (Class 6 Algebra.',
          misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple.',
          parts: [
                { id: 'a', prompt: 'Explain why the trick "Think of a number. Add 5. Multiply by 2. Subtract 4. Divide by 2.', answer: 'Let the number be x',
                  options: ['Let the number be x', 'if I pick 2, I get 3'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple terms.' },
                { id: 'b', prompt: 'Compare these two tricks. Do they always give the same result? Trick A: "Think of a number. Double it. Add 6. Halve it.', answer: 'Trick A: ((2x+6)/2) - x = x+3 - x = 3',
                  options: ['Trick A: ((2x+6)/2) - x = x+3 - x = 3', 'cancel the number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple terms.' }
          ],
            remediations: { 'students-often-forget-to-apply': { steps: ['If a student makes this distribution error, return to the verbal steps and ask: "When you say \'divide the result by 3\',.', 'Emphasize that the division bar acts like a bracket: (3x+15)/3.', 'Then show the distributive property: 3x/3 + 15/3 = x + 5.', 'Practice with numerical examples: if x=2, previous result is 21; 21/3=7.'] } } },
        { type: 'subpart', nodeId: 'c8_math_ch13_2', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple.',
          parts: [
                { id: 'a', prompt: 'Compare these two tricks. Do they always give the same result? Trick A: "Think of a number. Double it. Add 6. Halve it.', answer: 'Trick A: ((2x+6)/2) - x = x+3 - x = 3',
                  options: ['Trick A: ((2x+6)/2) - x = x+3 - x = 3', 'cancel the number'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget to apply an operation to every term when multiplying or dividing an expression with multiple terms.' }
          ],
            remediations: { 'students-often-forget-to-apply': { steps: ['If a student makes this distribution error, return to the verbal steps and ask: "When you say \'divide the result by 3\',.', 'Emphasize that the division bar acts like a bracket: (3x+15)/3.', 'Then show the distributive property: 3x/3 + 15/3 = x + 5.', 'Practice with numerical examples: if x=2, previous result is 21; 21/3=7.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
