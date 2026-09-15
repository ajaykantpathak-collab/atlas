import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch02_p2: SimDef = {
    id: 'v3_c7_math_ch02_p2',
    title: 'Arithmetic Expressions · Part 2/2',
    subtitle: 'Covers translating word problems into arithmetic expressions using natural numbers.',
    classLevel: 7, subject: 'mathematics', topic: 'Arithmetic Expressions · Part 2/2',
    chapters: ['c7_math_ch02'],
    nodeIds: ['c7_math_ch02_007', 'c7_math_ch02_008', 'c7_math_ch02_009', 'c7_math_ch02_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a stationery shop in your town and buy 3 notebooks for ₹45 each and 2 pens for ₹15 each.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'Two students count the terms in 15 + 4 x 3 - 8. One says five terms, the other says three. Who is counting right — and what trick decides it?',
        options: ['Three — multiplication glues 4 x 3 into a single term, and only plus and minus signs split terms', 'Five — every number separated by any symbol is its own term', 'Four — the minus sign does not count as a separator', 'One — the whole expression is always one big term'],
        answer: 'Three — multiplication glues 4 x 3 into a single term, and only plus and minus signs split terms',
        hook: 'Terms are the chunks separated by + and - ; anything held together by x or division rides as one block. And watch parentheses: 40 - 5 x 6 gives 10, but (40 - 5) x 6 gives 210 — same digits, different story.',
    },
    teaching: [
        { title: 'Writing Expressions from Word Problems', text: 'Writing expressions from word problems involves translating verbal descriptions of real-life situations into mathematical expressions using numbers, operation symbols (+, -, ×, ÷), and grouping.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch02_007', title: 'Writing Expressions from Word Problems',
          scaffold: { problem: 'Priya went to a book fair with ₹1000. She bought 3 comic books for ₹120 each and 2 science magazines for ₹85 each.',
            steps: [
            { text: 'Identify all given financial quantities and actions: Initial money = ₹1000, 3 comic books at ₹120 each, 2 science.' },
            { text: 'Translate the cost of comic books into a product expression: $3 \\times 120$.' },
            { text: 'Combine total money spent using addition inside a bracket: $(3 \\times 120) + (2 \\times 85)$.' },
            { text: 'Compute step by step following order of operations:' },
            { text: 'Verify the result: Priya started with ₹1000, spent ₹530 (leaving ₹470), and got ₹50 back, resulting in ₹520.', faded: true, blankAnswer: '₹520' }
            ] } },
        { type: 'case', nodeId: 'c7_math_ch02_008', title: 'Simplifying Arithmetic Expressions Step by Step',
          caseStudy: { intro: 'Imagine you are at a school stationery shop in India buying 3 notebooks for ₹40 each and 2 pens for ₹15 each, but you have a discount coupon of ₹20 applicable.',
            decisions: [{ prompt: 'What does the letter \'B\' stand for in the BODMAS rule used for simplifying arithmetic expressions?', options: [
                { text: 'Brackets', outcome: 'The correct answer is Brackets. A wrong answer—such as "Bases" or "Big numbers"—reveals that the.' },
                { text: 'Big numbers', outcome: 'Not quite — Students frequently perform addition and subtraction before multiplication and division when.', reveals: 'students-frequently-perform-addition-and' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_009', title: 'Relational Reasoning Without Computing Full Values',
          scaffold: { problem: 'Without computing the exact totals, determine which expression is greater: $A = 48 \\times 25$ or $B = 46 \\times 25$.',
            steps: [
            { text: 'Identify the common component in both expressions, which is the multiplier $25$.' },
            { text: 'Write down the differing components, which are the multiplicands $48$ and $46$.' },
            { text: 'Compare the differing components: since $48 > 46$ and the multiplier $25$ is a positive number, scaling $48$ by $25$.' },
            { text: 'State the relational conclusion: $48 \\times 25 > 46 \\times 25$, therefore Expression A is greater than Expression B.', faded: true, blankAnswer: 'Expression A ($48 \\times 25$) is greater.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch02_010', title: 'Properties of Operations: Commutativity and Associativity',
          scaffold: { problem: 'Simplify the expression $25 \\times 17 \\times 4$ by rearranging the factors using properties of operations to compute it mentally.',
            steps: [
            { text: 'Identify the given expression: $25 \\times 17 \\times 4$.' },
            { text: 'Apply the commutative property of multiplication to swap the middle and last factors: $25 \\times 4 \\times 17$.' },
            { text: 'Apply the associative property of multiplication to group the first two numbers: $(25 \\times 4) \\times 17$.' },
            { text: 'Compute inside the parentheses: $100 \\times 17$.' },
            { text: 'Perform the final multiplication to get the result with proper units: $1700$.', faded: true, blankAnswer: '1700' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch02_010', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch02_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Riya buys 4 notebooks at ₹30 each and 3 pens at ₹15 each, with a ₹20 discount at the counter. She writes the bill as 4 × 30 + 3 × 15 − 20. Her little brother insists the expression has six separate terms: 4, 30, 3, 15, 20 \'and the multiplications.\'',
            decisions: [{ prompt: 'How many terms does the bill really have, and what does it total?', options: [
                { text: 'Three terms — 4 × 30, 3 × 15 and 20 — because × and ÷ glue numbers into one term while + and − are the walls between them; the bill is 120 + 45 − 20 = ₹145.', outcome: 'This applies term structure correctly: multiplication binds each item\'s quantity and price into a single term before the addition and subtraction walls are counted.' },
                { text: 'The brother is right — every number separated by any symbol is its own term, so there are five or six terms to add up in order.', outcome: 'Splitting at × signs breaks the price-per-item blocks; the expression would be mangled into meaningless additions and multiplications in sequence.', reveals: 'every-number-a-term' },
                { text: 'There are two terms: everything before the minus sign is one big term, so it is (4 × 30 + 3 × 15) and then just 20.', outcome: 'A + sign is a wall too — it splits the notebook cost and the pen cost into separate terms, which matters the moment brackets or further operations enter.', reveals: 'only-minus-separates' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch02_010', title: 'You made it',
          caseStudy: { intro: 'An expression is a sentence and terms are its words. Learn where one term ends and the next begins, and no long calculation can ambush you.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch02_007', difficulty: 'standard',
          question: 'Writing expressions from word problems involves translating verbal descriptions.',
          hint: 'Review c7_math_ch02_005 to understand how brackets change the order of calculation.',
          misconception: 'Students frequently omit necessary brackets when translating phrases containing "the sum of" or "the difference of".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Writing expressions from word problems involves translating verbal descriptions of',
                  options: ['Writing expressions from word problems involves translating verbal descriptions of', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Review c7_math_ch02_005 to understand how brackets change the order of calculation in arithmetic.',
                  misconception: 'Students frequently omit necessary brackets when translating phrases containing "the sum of" or "the difference of" followed.' }
          ],
            remediations: { 'students-frequently-omit-necessary-brackets': { steps: ['When a student makes this bracket error, point directly to the order of operations: ask them, "If you write $4 \\times 5.', 'Have them evaluate both versions to see the different results.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_008', difficulty: 'standard',
          question: 'Simplifying arithmetic expressions step by step is the process of applying the.',
          hint: 'Review c7_math_ch02_002 to reinforce the sequence of operations before attempting.',
          misconception: 'Students frequently perform addition and subtraction before multiplication and division when scanning from left.',
          parts: [
                { id: 'a', prompt: 'What does the letter \'B\' stand for in the BODMAS rule used for simplifying arithmetic expressions?', answer: 'Brackets',
                  options: ['Brackets', 'Big numbers'],
                  hint: 'Review c7_math_ch02_002 to reinforce the sequence of operations before attempting multi-step.',
                  misconception: 'Students frequently perform addition and subtraction before multiplication and division when scanning from left to right, or they evaluate.' }
          ],
            remediations: { 'students-frequently-perform-addition-and': { steps: ['When a student makes this error, stop them and ask them to underline all multiplication and division signs in the.', 'Remind them that BODMAS stands for Brackets first, Orders second, Division and Multiplication (evaluated left to right.', 'Have them rewrite the expression line by line, changing only one evaluated part at a time while keeping everything else.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_009', difficulty: 'standard',
          question: 'Relational reasoning without computing full values is the mathematical.',
          hint: 'Review c7_math_ch02_003 and c7_math_ch02_004 to strengthen skills in comparing.',
          misconception: 'Students often assume that an expression containing larger individual numbers or more digits overall must always.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Relational reasoning without computing full values is the mathematical technique of',
                  options: ['Relational reasoning without computing full values is the mathematical technique of', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Review c7_math_ch02_003 and c7_math_ch02_004 to strengthen skills in comparing expressions and.',
                  misconception: 'Students often assume that an expression containing larger individual numbers or more digits overall must always evaluate to a greater.' }
          ],
            remediations: { 'an-expression-containing-larger-individual': { steps: ['Guide the student to break down the expressions into corresponding parts and examine the effect of each operation.', 'Ask: "What are we starting with, and how much are we taking away or adding in each expression?" Show them how.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch02_010', difficulty: 'standard',
          question: 'Commutativity states that changing the order of numbers in addition.',
          hint: 'Review integer addition and multiplication rules before attempting property.',
          misconception: 'Students often apply commutative or associative properties blindly to subtraction and division expressions, writing.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Commutativity states that changing the order of numbers in addition or multiplication',
                  options: ['Commutativity states that changing the order of numbers in addition or multiplication', 'An arithmetic expression is a combination of numbers and operational symbols (+, -, ×, ÷)', 'Evaluating an arithmetic expression requires computing its final numerical value by', 'Comparing arithmetic expressions involves evaluating two separate expressions using the'],
                  hint: 'Review integer addition and multiplication rules before attempting property rearrangements.',
                  misconception: 'Students often apply commutative or associative properties blindly to subtraction and division expressions, writing things like $15 - 8 = 8.' }
          ],
            remediations: { 'students-often-apply-commutative-or': { steps: ['Remind the student that commutativity and associativity only work for addition and multiplication.', 'Write out subtraction and division examples side by side, such as $5 - 3$ versus $3 - 5$, and ask them to check if the.', 'Show them that changing the order or grouping breaks the operation for minus and division signs.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
