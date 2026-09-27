import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch05_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch05_p2: SimDef = {
    id: 'v3_c6_math_ch05_p2',
    title: 'Algebra',
    subtitle: 'Letters that stand for numbers — the first time maths learns to talk about the unknown.',
    classLevel: 6, subject: 'mathematics', topic: 'Algebra · Part 2/2',
    chapters: ['c6_math_ch05'],
    nodeIds: ['c6_math_ch05_058', 'c6_math_ch05_059', 'c6_math_ch05_060', 'c6_math_ch05_061'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a codebreaker finding a hidden number', intro: 'A puzzle says: \'I think of a number, double it, add 6, get 20.\' Your job: find the number without guessing.', goal: 'Turn word puzzles into equations and solve for the unknown — forwards and backwards.' },
    discovery: {
        question: 'I think of a number, add 5, and get 12. You don\'t know my number — but can you still find it?',
        options: ['Yes — work backwards: 12 minus 5 is 7', 'No — you can\'t solve what you can\'t see', 'Only by guessing every number', 'Yes — but only if the number is even'],
        answer: 'Yes — work backwards: 12 minus 5 is 7',
        hook: 'Algebra\'s superpower: you don\'t need to see the number — the equation sees it for you.',
    },
    teaching: [
        { title: 'Word Problems Leading to Equations', text: 'Word problems leading to equations involve translating real-world scenarios into mathematical expressions where an unknown quantity is represented by a variable, allowing us to find the missing value.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch05_058', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'On the balance: keep both sides equal while you undo the operations — that\'s literally what solving an equation is.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c6_math_ch05_058', title: 'Word Problems Leading to Equations',
          scaffold: { problem: 'Rahim has 12 rupees more than Sita. Together they have 60 rupees. How much money does Sita have?',
            steps: [
            { text: 'Let Sita\'s money = x. Then Rahim\'s money = x + 12.' },
            { text: 'Total money = x + (x + 12) = 60.' },
            { text: 'Combine like terms: 2x + 12 = 60.' },
            { text: 'Subtract 12 from both sides: 2x = 48.' },
            { text: 'Divide by 2: x = 24.', faded: true, blankAnswer: '24 rupees' }
            ] } },
        { type: 'scaffold', nodeId: 'c6_math_ch05_060', title: 'Patterns and Algebra',
          scaffold: { problem: 'A notebook costs 20 rupees, and every additional page added to it costs 2 rupees.',
            steps: [
            { text: 'Identify the fixed cost (20) and the variable cost per page (2).' },
            { text: 'The pattern is 22, 24, 26... where 22 is for 1 page, 24 for 2, etc.' },
            { text: 'The jump is 2, so the rule is $2n + c$. Since for $n=1$, $2(1)+c = 22$, then $c=20$.' },
            { text: 'Rule is $2n + 20$.' },
            { text: 'For 50 pages, $2(50) + 20 = 100 + 20 = 120$.', faded: true, blankAnswer: '120 rupees' }
            ] } },
        { type: 'drill', nodeId: 'c6_math_ch05_061', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch05_058', title: 'Use it in the wild',
          caseStudy: { intro: 'A milkman charges ₹40 per litre plus a fixed ₹15 delivery fee per order. A student writes the cost formula as \'55 × L\' — forty plus fifteen, times the litres. Her mother spots the mistake on the bill.',
            decisions: [{ prompt: 'What is the right expression for the cost of L litres?', options: [
                { text: '40 × L + 15 — the ₹40 multiplies with every litre because it repeats per litre, while the ₹15 is charged once per order no matter how many litres. Lumping them into 55 × L wrongly charges the delivery fee again for every litre; keeping the constant separate is exactly what the expression is for.', outcome: 'Variables and constants behave differently — L can change order to order, the per-litre rate multiplies it, and the flat fee just sits at the end.' },
                { text: 'The student\'s 55 × L is right — all the charges combine into one rate per litre.', outcome: 'That bills the ₹15 fee once per litre — a 3-litre order would wrongly include three delivery fees.', reveals: 'fee-charged-per-litre' },
                { text: 'The cost cannot be written as an expression at all, since the litres keep changing.', outcome: 'Changing quantity is exactly why a letter is used — L stands for whatever the order is, and the formula works for every order.', reveals: 'variables-cant-be-written' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch05_061', title: 'You made it',
          caseStudy: { intro: 'Every unknown you\'ll ever solve — in science, money, code — is just a letter standing in until you work backwards to find it.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch05_058', difficulty: 'standard',
          question: 'Word problems leading to equations involve translating real-world scenarios.',
          hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
          misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).',
          parts: [
                { id: 'a', prompt: 'What is the first step when you see a word problem asking for an unknown number?', answer: 'The first step is to assign a variable (like \'x\') to the unknown quantity',
                  options: ['The first step is to assign a variable (like \'x\') to the unknown quantity', 'adding the numbers in the problem', '3 times more than x', '3 times x'],
                  hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
                  misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).' },
                { id: 'b', prompt: 'If a pen costs \'x\' rupees and a notebook costs \'x + 10\' rupees, what does the expression \'x + (x + 10)\' represent?', answer: 'It represents the total cost of one pen and one notebook combined',
                  options: ['It represents the total cost of one pen and one notebook combined', '3 times more than x', '3 times x'],
                  hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
                  misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).' },
                { id: 'c', prompt: 'A basket has apples and oranges. There are 4 more apples than oranges.', answer: 'The number of apples is x + 4',
                  options: ['The number of apples is x + 4', ', they are confusing'],
                  hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
                  misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).' },
                { id: 'd', prompt: 'If 3 times a number increased by 5 equals 20, how do you write this as an equation?', answer: '3x + 5 = 20',
                  options: ['3x + 5 = 20', '3 times more than x', '3 times x'],
                  hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
                  misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).' }
          ],
            remediations: { 'students-often-confuse-3-times': { steps: ['If a student struggles, have them draw a bar model.', 'For "5 less than x," draw a long bar for \'x\' and a shorter bar for \'5\', showing clearly that the result is x - 5.', 'Practice translating small phrases like "double of a number" or "half of a number" into expressions before attempting.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_058', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).',
          parts: [
                { id: 'a', prompt: 'Is it always better to let \'x\' be the larger number in a word problem? Why or why not?', answer: 'It is not always better',
                  options: ['It is not always better', '3 times more than x', '3 times x'],
                  hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
                  misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).' },
                { id: 'b', prompt: 'Create a simple word problem that results in the equation 2x + 10 = 30.', answer: 'Example: "A box has 30 marbles',
                  options: ['Example: "A box has 30 marbles', '3 times more than x', '3 times x'],
                  hint: 'Review the meaning of variables and basic arithmetic operations in expressions.',
                  misconception: 'Students often confuse "3 times more than x" (which is 3x + x or 4x) with "3 times x" (3x).' }
          ],
            remediations: { 'students-often-confuse-3-times': { steps: ['If a student struggles, have them draw a bar model.', 'For "5 less than x," draw a long bar for \'x\' and a shorter bar for \'5\', showing clearly that the result is x - 5.', 'Practice translating small phrases like "double of a number" or "half of a number" into expressions before attempting.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_059', difficulty: 'standard',
          question: 'The balance model visualizes an equation as a two-pan balance scale where both.',
          hint: 'Review "Inverse Operations" (e.g., if you add 5, how do you get back to 0?).',
          misconception: 'Students often try to "move" a number to the other side by changing its sign without performing the balance operation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The balance model visualizes an equation as a two-pan balance scale where both sides must',
                  options: ['The balance model visualizes an equation as a two-pan balance scale where both sides must', 'A variable is a letter or symbol used to represent a number that can change or is', 'An algebraic expression is a mathematical phrase containing variables (letters', 'Forming algebraic expressions is the process of representing relationships between'],
                  hint: 'Review "Inverse Operations" (e.g., if you add 5, how do you get back to 0?).',
                  misconception: 'Students often try to "move" a number to the other side by changing its sign without performing the balance operation (e.g., changing $2x.' }
          ],
            remediations: { 'students-often-try-to-move': { steps: ['If the student makes a sign error, have them draw two pans on paper.', 'Ask them: "If you remove 3kg from the left, how much must you remove from the right to keep the scale level?".', 'This forces them to see the balance action rather than just "moving" numbers.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_060', difficulty: 'standard',
          question: 'Algebra is the branch of mathematics that uses variables (letters) to represent.',
          hint: 'Review the multiplication tables and identifying differences between numbers.',
          misconception: 'Students often try to find the rule by looking at the relationship between the term and the position as an addition.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Algebra is the branch of mathematics that uses variables (letters) to represent unknown',
                  options: ['Algebra is the branch of mathematics that uses variables (letters) to represent unknown', 'A variable is a letter or symbol used to represent a number that can change or is', 'An algebraic expression is a mathematical phrase containing variables (letters', 'Forming algebraic expressions is the process of representing relationships between'],
                  hint: 'Review the multiplication tables and identifying differences between numbers.',
                  misconception: 'Students often try to find the rule by looking at the relationship between the term and the position as an addition problem instead of.' }
          ],
            remediations: { 'students-often-try-to-find': { steps: ['Ask the student to write the sequence in a table: Position (n) | Value ($a_n$).', 'Ask them, "If $n$ increases by 1, how much does the value increase?" Once they identify the jump (e.g., 3), tell them.', 'Then, have them calculate $3 \\times 1, 3 \\times 2$ and compare those to the actual values in the table to find the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_061', difficulty: 'standard',
          question: 'Algebra uses letters (like $x, y, n$) as placeholders for unknown numbers.',
          hint: 'Review multiplication tables and the relationship between division and multiplication.',
          misconception: 'Students often treat variables as specific objects (e.g., thinking "$x$" stands for "apple") rather than as numbers.',
          parts: [
                { id: 'a', prompt: 'A taxi charges a fixed 20 rupees plus 12 rupees for every additional kilometer. Write an expression for the total cost for $x$ kilometers (where $x > 1$).', answer: 'The expression is $20 + 12(x-1)$ or $12x + 8$',
                  options: ['The expression is $20 + 12(x-1)$ or $12x + 8$', 'first kilometer'],
                  hint: 'Review multiplication tables and the relationship between division and multiplication.',
                  misconception: 'Students often treat variables as specific objects (e.g., thinking "$x$" stands for "apple") rather than as numbers.' }
          ],
            remediations: { 'students-often-treat-variables-as': { steps: ['Ask the student to replace the letter with a concrete number they know.', 'Say: "If $x$ were 10, what would $3x$ be?" Once they see it results in a number (30), show them that the letter is just.', 'Use physical counters or blocks to represent the unknown, physically balancing them against the known total.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
