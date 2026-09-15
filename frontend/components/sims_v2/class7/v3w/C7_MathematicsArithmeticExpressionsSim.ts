import type { SimDef } from '../../engine/types';
import C7_MathematicsArithmeticExpressionsSim from '../../../simulations/c6_12/C7_MathematicsArithmeticExpressionsSim';

/** v3 wrapped master — C7_MathematicsArithmeticExpressionsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c7_mathematicsarithmeticexpressionssim: SimDef = {
    id: 'v3w_c7_mathematicsarithmeticexpressionssim',
    title: 'Arithmetic Expressions',
    subtitle: 'Covers arithmetic expressions containing numbers and basic operations (+, -, ×, ÷) with.',
    classLevel: 7, subject: 'mathematics', topic: 'Introduction to Arithmetic Expressions: Terms and Values',
    chapters: [],
    nodeIds: ['c7_math_ch02_001', 'c7_math_ch02_002', 'c7_math_ch02_003', 'c7_math_ch02_004', 'c7_math_ch02_005', 'c7_math_ch02_006', 'c7_math_ch02_007', 'c7_math_ch02_008', 'c7_math_ch02_009', 'c7_math_ch02_010', 'c7_math_ch04_003', 'c7_math_ch04_009', 'c7_math_ch06_001', 'c7_math_ch06_002', 'c7_math_ch06_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a stationery shop in your neighborhood and buy 3 notebooks for ₹25 each and 2 pens for ₹10.', goal: 'Master Arithmetic Expressions.' },
    discovery: {
        question: 'What does the letter \'D\' stand for in the BODMAS rule used for evaluating arithmetic expressions?',
        options: ['The letter \'D\' stands for Division', 'Decimal', 'Double'],
        answer: 'The letter \'D\' stands for Division',
        hook: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of.',
    },
    teaching: [
        { title: 'An arithmetic expression is a combination of.', text: 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷) that represents a single numerical value, where individual parts separated by addition or subtraction signs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch02_001', title: 'An arithmetic expression is a.',
          scaffold: { problem: 'Riya went to the market and bought 4 notebooks for ₹30 each and 3 pens for ₹15 each, but received a discount of ₹20 on her total bill.',
            steps: [
            { text: 'Identify the given quantities and translate them into numbers and operations: 4 notebooks at ₹30 each is written as $4.' },
            { text: 'Combine these into a single arithmetic expression: $4 \\times 30 + 3 \\times 15 - 20$.' },
            { text: 'Identify the individual terms separated by addition and subtraction signs: Term 1 is $4 \\times 30$, Term 2 is $3 \\times.' },
            { text: 'Evaluate each term independently: Term 1 = $120$, Term 2 = $45$, Term 3 = $20$.' },
            { text: 'Perform the addition and subtraction on the evaluated terms: $120 + 45 - 20 = 165 - 20 = 145$.', faded: true, blankAnswer: '₹145' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_002', title: 'Evaluating an arithmetic expression.',
          scaffold: { problem: 'Riya went to a book fair in Kolkata and bought 4 storybooks at ₹50 each and 3 science comics at ₹30 each.',
            steps: [
            { text: 'Identify the given expression: $4 \\times 50 + 3 \\times 30 + 20 - 15$.' },
            { text: 'Apply BODMAS by identifying multiplication operations that must be computed first: $4 \\times 50$ and $3 \\times 30$.' },
            { text: 'Compute the multiplications: $4 \\times 50 = 200$ and $3 \\times 30 = 90$, so the expression updates to $200 + 90 + 20 -.' },
            { text: 'Perform addition and subtraction from left to right: first compute $200 + 90 = 290$, then $290 + 20 = 310$, and finally.' },
            { text: 'Verify the steps and append the correct unit (rupees): Total amount paid is ₹295.', faded: true, blankAnswer: '₹295' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_003', title: 'Comparing arithmetic expressions.',
          scaffold: { problem: 'Amit has ₹100. He compares two possible book purchases to see which costs less: Expression A is $4 \\times 15 + 3 \\times 10$ (4 notebooks at.',
            steps: [
            { text: 'Write down Expression A ($4 \\times 15 + 3 \\times 10$) and Expression B ($2 \\times 25 + 4 \\times 12$).' },
            { text: 'Evaluate Expression A by performing multiplications first: $4 \\times 15 = 60$ and $3 \\times 10 = 30$.' },
            { text: 'Complete Expression A by adding the products: $60 + 30 = 90$.' },
            { text: 'Evaluate Expression B by performing multiplications first: $2 \\times 25 = 50$ and $4 \\times 12 = 48$.' },
            { text: 'Complete Expression B by adding the products: $50 + 48 = 98$.' },
            { text: 'Compare the final values: $90 < 98$, so Expression A < Expression B.', faded: true, blankAnswer: '$4 \\times 15 + 3 \\times 10 < 2 \\times 25 + 4 \\times 12$ (90.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_004', title: 'Equivalent expressions are arithmetic.',
          scaffold: { problem: 'Ritu buys 4 packets of crayons for ₹12 each and 4 sketch pens for ₹8 each.',
            steps: [
            { text: 'Identify given quantities and write Expression 1 representing separate item purchases: $(4 \\times 12) + (4 \\times 8)$.' },
            { text: 'Apply the distributive property in reverse to factor out the common number of items ($4$) to write Expression 2: $4.' },
            { text: 'Evaluate Expression 1 step by step: $4 \\times 12 = 48$, $4 \\times 8 = 32$, then $48 + 32 = 80$.' },
            { text: 'Evaluate Expression 2 step by step: inside bracket $12 + 8 = 20$, then $4 \\times 20 = 80$.' },
            { text: 'Verify both expressions yield ₹80, confirming they are equivalent forms of the total cost.', faded: true, blankAnswer: '₹80' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_005', title: 'Expressions with brackets use.',
          scaffold: { problem: 'A school canteen prepares food packages for a sports day. They pack `[ 120 - { 3 × ( 15 + 10 ) } ]` sandwiches in the morning shift.',
            steps: [
            { text: 'Identify the innermost parentheses containing `( 15 + 10 )`.' },
            { text: 'Compute the sum inside the parentheses: `15 + 10 = 25`.' },
            { text: 'Substitute this value back into the expression, giving `[ 120 - { 3 × 25 } ]`.' },
            { text: 'Compute the multiplication inside the curly brackets: `3 × 25 = 75`, leaving `[ 120 - 75 ]`.' },
            { text: 'Perform the subtraction inside the square brackets: `120 - 75 = 45`.', faded: true, blankAnswer: '45 sandwiches' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_006', title: 'The distributive property in arithmetic.',
          scaffold: { problem: 'A school store purchased 18 boxes of notebooks. Each box contains 50 ruled notebooks and 10 unruled notebooks.',
            steps: [
            { text: 'Identify the given quantities. Number of boxes = $18$, notebooks per box = $(50 + 10)$.' },
            { text: 'Set up the arithmetic expression representing total notebooks: $18 \\times (50 + 10)$.' },
            { text: 'Apply the distributive property to expand the expression into two products: $(18 \\times 50) + (18 \\times 10)$.' },
            { text: 'Compute each product step by step: $18 \\times 50 = 900$ and $18 \\times 10 = 180$.' },
            { text: 'Add the computed products together with units: $900 + 180 = 1080$ notebooks.', faded: true, blankAnswer: '1080 notebooks' }
            ] } },
        { type: 'dissect', nodeId: 'c7_math_ch02_002', title: 'Identify each idea',
          dissect: { specimen: 'Arithmetic Expressions', spots: [
            { id: 's1', label: 'An arithmetic expression is a', prompt: 'Which idea is this? — An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷).', answer: 'An arithmetic expression is a', options: ['An arithmetic expression is a', 'Evaluating an arithmetic expression requires', 'Comparing arithmetic expressions involves evaluating', 'Equivalent expressions are arithmetic or'] },
            { id: 's2', label: 'Evaluating an arithmetic expression requires', prompt: 'Which idea is this? — Evaluating an arithmetic expression requires computing its final numerical value by.', answer: 'Evaluating an arithmetic expression requires', options: ['Evaluating an arithmetic expression requires', 'An arithmetic expression is a', 'Comparing arithmetic expressions involves evaluating', 'Equivalent expressions are arithmetic or'] },
            { id: 's3', label: 'Comparing arithmetic expressions involves evaluating', prompt: 'Which idea is this? — Comparing arithmetic expressions involves evaluating two separate expressions using the.', answer: 'Comparing arithmetic expressions involves evaluating', options: ['Comparing arithmetic expressions involves evaluating', 'An arithmetic expression is a', 'Evaluating an arithmetic expression requires', 'Equivalent expressions are arithmetic or'] },
            { id: 's4', label: 'Equivalent expressions are arithmetic or', prompt: 'Which idea is this? — Equivalent expressions are arithmetic or algebraic expressions that yield the exact same.', answer: 'Equivalent expressions are arithmetic or', options: ['Equivalent expressions are arithmetic or', 'An arithmetic expression is a', 'Evaluating an arithmetic expression requires', 'Comparing arithmetic expressions involves evaluating'] },
            { id: 's5', label: 'Expressions with brackets use parentheses', prompt: 'Which idea is this? — Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and square.', answer: 'Expressions with brackets use parentheses', options: ['Expressions with brackets use parentheses', 'An arithmetic expression is a', 'Evaluating an arithmetic expression requires', 'Comparing arithmetic expressions involves evaluating'] },
            { id: 's6', label: 'The distributive property in arithmetic', prompt: 'Which idea is this? — The distributive property in arithmetic expressions states that multiplying a number by a.', answer: 'The distributive property in arithmetic', options: ['The distributive property in arithmetic', 'An arithmetic expression is a', 'Evaluating an arithmetic expression requires', 'Comparing arithmetic expressions involves evaluating'] }
          ] } }
    ],
    explore: { component: C7_MathematicsArithmeticExpressionsSim, prompt: 'Explore the interactive — Arithmetic Expressions' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch02_001', difficulty: 'standard',
          question: 'An arithmetic expression is a combination of numbers and operational symbols.',
          hint: 'Review basic arithmetic operations and how multiplication and division group numbers.',
          misconception: 'Students often split an expression at every single operation symbol (+, -, ×, ÷), treating every number as its own.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions $E_1 = 40 - 5 \\times 6$ and $E_2 = (40 - 5) \\times 6$. Explain why their terms and final values are completely different.', answer: 'In $E_1$, the terms are $40$ and $5 \\times 6$, giving $40 - 30 = 10$',
                  options: ['In $E_1$, the terms are $40$ and $5 \\times 6$, giving $40 - 30 = 10$', 'parentheses do not change term structure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often split an expression at every single operation symbol (+, -, ×, ÷), treating every number as its own term.' }
          ],
            remediations: { 'students-often-split-an-expression': { steps: ['Remind the student that addition (+) and subtraction (-) signs act like walls that separate an expression into.', 'Multiplication (×) and division (÷) symbols act like glue that keeps numbers tightly bonded inside the same term.', 'Show them how to circle multiplication and division chunks first before looking at the addition and subtraction walls.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often split an expression at every single operation symbol (+, -, ×, ÷), treating every number as its own.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions $E_1 = 40 - 5 \\times 6$ and $E_2 = (40 - 5) \\times 6$. Explain why their terms and final values are completely different.', answer: 'In $E_1$, the terms are $40$ and $5 \\times 6$, giving $40 - 30 = 10$',
                  options: ['In $E_1$, the terms are $40$ and $5 \\times 6$, giving $40 - 30 = 10$', 'parentheses do not change term structure'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often split an expression at every single operation symbol (+, -, ×, ÷), treating every number as its own term.' }
          ],
            remediations: { 'students-often-split-an-expression': { steps: ['Remind the student that addition (+) and subtraction (-) signs act like walls that separate an expression into.', 'Multiplication (×) and division (÷) symbols act like glue that keeps numbers tightly bonded inside the same term.', 'Show them how to circle multiplication and division chunks first before looking at the addition and subtraction walls.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_002', difficulty: 'standard',
          question: 'Evaluating an arithmetic expression requires computing its final numerical.',
          hint: 'Review c6_math_ch02_022 and c6_math_ch02_019 to ensure solid foundational computation.',
          misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of.',
          parts: [
                { id: 'a', prompt: 'What does the letter \'D\' stand for in the BODMAS rule used for evaluating arithmetic expressions?', answer: 'The letter \'D\' stands for Division',
                  options: ['The letter \'D\' stands for Division', 'Decimal', 'Double'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of multiplication and.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Circle all multiplication and division chunks (e.g., $5 \\times 2$).', 'Calculate those chunks first.', 'Rewrite the expression with the new values.', 'Now do addition and subtraction from left to right.\' Practice this boxing technique with 3 mixed-operation problems.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_003', difficulty: 'standard',
          question: 'Comparing arithmetic expressions involves evaluating two separate expressions.',
          hint: 'Review evaluating arithmetic expressions using order of operations (c7_math_ch02_002).',
          misconception: 'Students often evaluate expressions strictly from left to right across the entire string without respecting brackets or.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing arithmetic expressions involves evaluating two separate expressions using the',
                  options: ['Comparing arithmetic expressions involves evaluating two separate expressions using the', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Equivalent expressions are arithmetic or algebraic expressions that yield the exact same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often evaluate expressions strictly from left to right across the entire string without respecting brackets or the order of.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Remind the student to always use parentheses or underline operations that must be done first according to BODMAS/PEMDAS.', 'Have them write out the intermediate step for each expression on separate lines before looking at the comparison sign.', 'Say: "Evaluate the left side completely into a single number, then evaluate the right side completely into a single.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_004', difficulty: 'standard',
          question: 'Equivalent expressions are arithmetic or algebraic expressions that yield the.',
          hint: 'Review c7_math_ch02_002 to master evaluating expressions using parentheses and order of.',
          misconception: 'Students often distribute a multiplier outside a bracket to only the first term inside the parentheses while ignoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equivalent expressions are arithmetic or algebraic expressions that yield the exact same',
                  options: ['Equivalent expressions are arithmetic or algebraic expressions that yield the exact same', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often distribute a multiplier outside a bracket to only the first term inside the parentheses while ignoring subsequent terms,.' }
          ],
            remediations: { 'students-often-distribute-a-multiplier': { steps: ['Remind the student that a multiplier outside a bracket acts on every single term living inside that bracket like a.', 'Have them draw arrows from the outside number to every term inside the parentheses before performing any calculation.', 'For minus signs before brackets, explicitly coach them: "The negative sign outside is like a flashlight changing the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_005', difficulty: 'standard',
          question: 'Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and.',
          hint: 'Review c7_math_ch02_002 to master the basic order of operations before tackling nested.',
          misconception: 'Students often perform operations from left to right across the entire expression, ignoring the boundary walls created.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and square',
                  options: ['Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and square', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often perform operations from left to right across the entire expression, ignoring the boundary walls created by brackets.' }
          ],
            remediations: { 'students-often-perform-operations-from': { steps: ['If a student gets stuck or makes this left-to-right error, guide them physically: "Take a coloured pencil and draw a.', 'Do not touch any number outside that circle until the numbers inside are reduced to a single value." Have them rewrite.', 'Say: "Treat brackets like wrapped boxes; you must open the inner gift box before you can unpack the outer carton."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_006', difficulty: 'standard',
          question: 'The distributive property in arithmetic expressions states that multiplying a.',
          hint: 'Review c7_math_ch02_005 (Expressions with Brackets: Parentheses and Grouping) to ensure.',
          misconception: 'Students frequently apply the multiplier outside the parentheses to only the first term inside while completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distributive property in arithmetic expressions states that multiplying a number by a',
                  options: ['The distributive property in arithmetic expressions states that multiplying a number by a', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students frequently apply the multiplier outside the parentheses to only the first term inside while completely forgetting to multiply it.' }
          ],
            remediations: { 'students-frequently-apply-the-multiplier': { steps: ['If a student makes this error, explicitly circle both terms inside the parentheses and draw arrows from the outside.', 'Say: "The multiplier outside has a ticket for every term inside the brackets, not just the first one.', 'Let\'s write out both multiplication parts explicitly before doing any arithmetic." Have the student re-solve by writing.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
