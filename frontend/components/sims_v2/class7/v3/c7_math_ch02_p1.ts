import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch02_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch02_p1: SimDef = {
    id: 'v3_c7_math_ch02_p1',
    title: 'Arithmetic Expressions · Part 1/2',
    subtitle: 'Covers arithmetic expressions containing numbers and basic operations (+, -, ×, ÷) with.',
    classLevel: 7, subject: 'mathematics', topic: 'Arithmetic Expressions · Part 1/2',
    chapters: ['c7_math_ch02'],
    nodeIds: ['c7_math_ch02_001', 'c7_math_ch02_002', 'c7_math_ch02_003', 'c7_math_ch02_004', 'c7_math_ch02_005', 'c7_math_ch02_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a stationery shop in your neighborhood and buy 3 notebooks for ₹25 each and 2 pens for ₹10.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two students count the terms in 15 + 4 x 3 - 8. One says five terms, the other says three. Who is counting right — and what trick decides it?',
        options: ['Three — multiplication glues 4 x 3 into a single term, and only plus and minus signs split terms', 'Five — every number separated by any symbol is its own term', 'Four — the minus sign does not count as a separator', 'One — the whole expression is always one big term'],
        answer: 'Three — multiplication glues 4 x 3 into a single term, and only plus and minus signs split terms',
        hook: 'Terms are the chunks separated by + and - ; anything held together by x or division rides as one block. And watch parentheses: 40 - 5 x 6 gives 10, but (40 - 5) x 6 gives 210 — same digits, different story.',
    },
    teaching: [
        { title: 'Introduction to Arithmetic Expressions: Terms and Values', text: 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷) that represents a single numerical value, where individual parts separated by addition or subtraction signs.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch02_001', title: 'Introduction to Arithmetic Expressions: Terms and Values',
          scaffold: { problem: 'Riya went to the market and bought 4 notebooks for ₹30 each and 3 pens for ₹15 each, but received a discount of ₹20 on her total bill.',
            steps: [
            { text: 'Identify the given quantities and translate them into numbers and operations: 4 notebooks at ₹30 each is written as $4.' },
            { text: 'Combine these into a single arithmetic expression: $4 \\times 30 + 3 \\times 15 - 20$.' },
            { text: 'Identify the individual terms separated by addition and subtraction signs: Term 1 is $4 \\times 30$, Term 2 is $3 \\times.' },
            { text: 'Evaluate each term independently: Term 1 = $120$, Term 2 = $45$, Term 3 = $20$.' },
            { text: 'Perform the addition and subtraction on the evaluated terms: $120 + 45 - 20 = 165 - 20 = 145$.', faded: true, blankAnswer: '₹145' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_002', title: 'Evaluating Arithmetic Expressions: Order of Operations',
          scaffold: { problem: 'Riya went to a book fair in Kolkata and bought 4 storybooks at ₹50 each and 3 science comics at ₹30 each.',
            steps: [
            { text: 'Identify the given expression: $4 \\times 50 + 3 \\times 30 + 20 - 15$.' },
            { text: 'Apply BODMAS by identifying multiplication operations that must be computed first: $4 \\times 50$ and $3 \\times 30$.' },
            { text: 'Compute the multiplications: $4 \\times 50 = 200$ and $3 \\times 30 = 90$, so the expression updates to $200 + 90 + 20.' },
            { text: 'Perform addition and subtraction from left to right: first compute $200 + 90 = 290$, then $290 + 20 = 310$, and finally.' },
            { text: 'Verify the steps and append the correct unit (rupees): Total amount paid is ₹295.', faded: true, blankAnswer: '₹295' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_003', title: 'Comparing Expressions Using <, > and = Signs',
          scaffold: { problem: 'Amit has ₹100. He compares two possible book purchases to see which costs less: Expression A is $4 \\times 15 + 3 \\times 10$ (4 notebooks.',
            steps: [
            { text: 'Write down Expression A ($4 \\times 15 + 3 \\times 10$) and Expression B ($2 \\times 25 + 4 \\times 12$).' },
            { text: 'Evaluate Expression A by performing multiplications first: $4 \\times 15 = 60$ and $3 \\times 10 = 30$.' },
            { text: 'Complete Expression A by adding the products: $60 + 30 = 90$.' },
            { text: 'Evaluate Expression B by performing multiplications first: $2 \\times 25 = 50$ and $4 \\times 12 = 48$.' },
            { text: 'Complete Expression B by adding the products: $50 + 48 = 98$.' },
            { text: 'Compare the final values: $90 < 98$, so Expression A < Expression B.', faded: true, blankAnswer: '$4 \\times 15 + 3 \\times 10 < 2 \\times 25 + 4 \\times 12$ (90.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_004', title: 'Equivalent Expressions: Same Value Different Form',
          scaffold: { problem: 'Ritu buys 4 packets of crayons for ₹12 each and 4 sketch pens for ₹8 each.',
            steps: [
            { text: 'Identify given quantities and write Expression 1 representing separate item purchases: $(4 \\times 12) + (4 \\times 8)$.' },
            { text: 'Apply the distributive property in reverse to factor out the common number of items ($4$) to write Expression 2: $4.' },
            { text: 'Evaluate Expression 1 step by step: $4 \\times 12 = 48$, $4 \\times 8 = 32$, then $48 + 32 = 80$.' },
            { text: 'Evaluate Expression 2 step by step: inside bracket $12 + 8 = 20$, then $4 \\times 20 = 80$.' },
            { text: 'Verify both expressions yield ₹80, confirming they are equivalent forms of the total cost.', faded: true, blankAnswer: '₹80' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_005', title: 'Expressions with Brackets: Parentheses and Grouping',
          scaffold: { problem: 'A school canteen prepares food packages for a sports day. They pack `[ 120 - { 3 × ( 15 + 10 ) } ]` sandwiches in the morning shift.',
            steps: [
            { text: 'Identify the innermost parentheses containing `( 15 + 10 )`.' },
            { text: 'Compute the sum inside the parentheses: `15 + 10 = 25`.' },
            { text: 'Substitute this value back into the expression, giving `[ 120 - { 3 × 25 } ]`.' },
            { text: 'Compute the multiplication inside the curly brackets: `3 × 25 = 75`, leaving `[ 120 - 75 ]`.' },
            { text: 'Perform the subtraction inside the square brackets: `120 - 75 = 45`.', faded: true, blankAnswer: '45 sandwiches' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_006', title: 'Distributive Property in Arithmetic Expressions',
          scaffold: { problem: 'A school store purchased 18 boxes of notebooks. Each box contains 50 ruled notebooks and 10 unruled notebooks.',
            steps: [
            { text: 'Identify the given quantities. Number of boxes = $18$, notebooks per box = $(50 + 10)$.' },
            { text: 'Set up the arithmetic expression representing total notebooks: $18 \\times (50 + 10)$.' },
            { text: 'Apply the distributive property to expand the expression into two products: $(18 \\times 50) + (18 \\times 10)$.' },
            { text: 'Compute each product step by step: $18 \\times 50 = 900$ and $18 \\times 10 = 180$.' },
            { text: 'Add the computed products together with units: $900 + 180 = 1080$ notebooks.', faded: true, blankAnswer: '1080 notebooks' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch02_006', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch02_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Riya buys 4 notebooks at ₹30 each and 3 pens at ₹15 each, with a ₹20 discount at the counter. She writes the bill as 4 × 30 + 3 × 15 − 20. Her little brother insists the expression has six separate terms: 4, 30, 3, 15, 20 \'and the multiplications.\'',
            decisions: [{ prompt: 'How many terms does the bill really have, and what does it total?', options: [
                { text: 'Three terms — 4 × 30, 3 × 15 and 20 — because × and ÷ glue numbers into one term while + and − are the walls between them; the bill is 120 + 45 − 20 = ₹145.', outcome: 'This applies term structure correctly: multiplication binds each item\'s quantity and price into a single term before the addition and subtraction walls are counted.' },
                { text: 'The brother is right — every number separated by any symbol is its own term, so there are five or six terms to add up in order.', outcome: 'Splitting at × signs breaks the price-per-item blocks; the expression would be mangled into meaningless additions and multiplications in sequence.', reveals: 'every-number-a-term' },
                { text: 'There are two terms: everything before the minus sign is one big term, so it is (4 × 30 + 3 × 15) and then just 20.', outcome: 'A + sign is a wall too — it splits the notebook cost and the pen cost into separate terms, which matters the moment brackets or further operations enter.', reveals: 'only-minus-separates' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch02_006', title: 'The bigger picture',
          caseStudy: { intro: 'An expression is a sentence and terms are its words. Learn where one term ends and the next begins, and no long calculation can ambush you.',
            decisions: [{ prompt: 'What comes next? Arithmetic Expressions · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Arithmetic Expressions · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch02_001', difficulty: 'standard',
          question: 'An arithmetic expression is a combination of numbers and operational symbols.',
          hint: 'Review basic arithmetic operations and how multiplication and division group numbers.',
          misconception: 'Students often split an expression at every single operation symbol (+, -, ×, ÷), treating every number as its own.',
          parts: [
                { id: 'a', prompt: 'Compare the expressions $E_1 = 40 - 5 \\times 6$ and $E_2 = (40 - 5) \\times 6$. Explain why their terms and final values are completely different.', answer: 'In $E_1$, the terms are $40$ and $5 \\times 6$, giving $40 - 30 = 10$',
                  options: ['In $E_1$, the terms are $40$ and $5 \\times 6$, giving $40 - 30 = 10$', 'parentheses do not change term structure'],
                  hint: 'Review basic arithmetic operations and how multiplication and division group numbers together.',
                  misconception: 'Students often split an expression at every single operation symbol (+, -, ×, ÷), treating every number as its own term.' }
          ],
            remediations: { 'students-often-split-an-expression': { steps: ['Remind the student that addition (+) and subtraction (-) signs act like walls that separate an expression into.', 'Multiplication (×) and division (÷) symbols act like glue that keeps numbers tightly bonded inside the same term.', 'Show them how to circle multiplication and division chunks first before looking at the addition and subtraction walls.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_002', difficulty: 'standard',
          question: 'Evaluating an arithmetic expression requires computing its final numerical.',
          hint: 'Review c6_math_ch02_022 and c6_math_ch02_019 to ensure solid foundational computation.',
          misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority.',
          parts: [
                { id: 'a', prompt: 'What does the letter \'D\' stand for in the BODMAS rule used for evaluating arithmetic expressions?', answer: 'The letter \'D\' stands for Division',
                  options: ['The letter \'D\' stands for Division', 'Decimal', 'Double'],
                  hint: 'Review c6_math_ch02_022 and c6_math_ch02_019 to ensure solid foundational computation before.',
                  misconception: 'Students often evaluate expressions strictly from left to right across all operation types, ignoring the priority of multiplication and.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Circle all multiplication and division chunks (e.g., $5 \\times 2$).', 'Calculate those chunks first.', 'Rewrite the expression with the new values.', 'Now do addition and subtraction from left to right.\' Practice this boxing technique with 3 mixed-operation problems.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_003', difficulty: 'standard',
          question: 'Comparing arithmetic expressions involves evaluating two separate expressions.',
          hint: 'Review evaluating arithmetic expressions using order of operations (c7_math_ch02_002).',
          misconception: 'Students often evaluate expressions strictly from left to right across the entire string without respecting brackets.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Comparing arithmetic expressions involves evaluating two separate expressions using the',
                  options: ['Comparing arithmetic expressions involves evaluating two separate expressions using the', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Equivalent expressions are arithmetic or algebraic expressions that yield the exact same'],
                  hint: 'Review evaluating arithmetic expressions using order of operations (c7_math_ch02_002).',
                  misconception: 'Students often evaluate expressions strictly from left to right across the entire string without respecting brackets or the order.' }
          ],
            remediations: { 'students-often-evaluate-expressions-strictly': { steps: ['Remind the student to always use parentheses or underline operations that must be done first according to BODMAS/PEMDAS.', 'Have them write out the intermediate step for each expression on separate lines before looking at the comparison sign.', 'Say: "Evaluate the left side completely into a single number, then evaluate the right side completely into a single.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_004', difficulty: 'standard',
          question: 'Equivalent expressions are arithmetic or algebraic expressions that yield the.',
          hint: 'Review c7_math_ch02_002 to master evaluating expressions using parentheses and order.',
          misconception: 'Students often distribute a multiplier outside a bracket to only the first term inside the parentheses while ignoring.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equivalent expressions are arithmetic or algebraic expressions that yield the exact same',
                  options: ['Equivalent expressions are arithmetic or algebraic expressions that yield the exact same', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Review c7_math_ch02_002 to master evaluating expressions using parentheses and order of operations.',
                  misconception: 'Students often distribute a multiplier outside a bracket to only the first term inside the parentheses while ignoring subsequent terms.' }
          ],
            remediations: { 'students-often-distribute-a-multiplier': { steps: ['Remind the student that a multiplier outside a bracket acts on every single term living inside that bracket like.', 'Have them draw arrows from the outside number to every term inside the parentheses before performing any calculation.', 'For minus signs before brackets, explicitly coach them: "The negative sign outside is like a flashlight changing the.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_005', difficulty: 'standard',
          question: 'Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and.',
          hint: 'Review c7_math_ch02_002 to master the basic order of operations before tackling nested.',
          misconception: 'Students often perform operations from left to right across the entire expression, ignoring the boundary walls created.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and square',
                  options: ['Expressions with brackets use parentheses `( )`, curly brackets `{ }`, and square', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Review c7_math_ch02_002 to master the basic order of operations before tackling nested brackets.',
                  misconception: 'Students often perform operations from left to right across the entire expression, ignoring the boundary walls created by brackets.' }
          ],
            remediations: { 'students-often-perform-operations-from': { steps: ['If a student gets stuck or makes this left-to-right error, guide them physically: "Take a coloured pencil and draw.', 'Do not touch any number outside that circle until the numbers inside are reduced to a single value." Have them rewrite.', 'Say: "Treat brackets like wrapped boxes; you must open the inner gift box before you can unpack the outer carton."'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_006', difficulty: 'standard',
          question: 'The distributive property in arithmetic expressions states that multiplying.',
          hint: 'Review c7_math_ch02_005 (Expressions with Brackets: Parentheses and Grouping) to ensure.',
          misconception: 'Students frequently apply the multiplier outside the parentheses to only the first term inside while completely.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The distributive property in arithmetic expressions states that multiplying a number by a',
                  options: ['The distributive property in arithmetic expressions states that multiplying a number by a', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Review c7_math_ch02_005 (Expressions with Brackets: Parentheses and Grouping) to ensure comfort.',
                  misconception: 'Students frequently apply the multiplier outside the parentheses to only the first term inside while completely forgetting to multiply.' }
          ],
            remediations: { 'students-frequently-apply-the-multiplier': { steps: ['If a student makes this error, explicitly circle both terms inside the parentheses and draw arrows from the outside.', 'Say: "The multiplier outside has a ticket for every term inside the brackets, not just the first one.', 'Let\'s write out both multiplication parts explicitly before doing any arithmetic." Have the student re-solve by writing.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
