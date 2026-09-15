import type { SimDef } from '../../engine/types';

/** v3 generated — c6_math_ch05_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c6_math_ch05_p1: SimDef = {
    id: 'v3_c6_math_ch05_p1',
    title: 'Algebra',
    subtitle: 'Letters that stand for numbers — the first time maths learns to talk about the unknown.',
    classLevel: 6, subject: 'mathematics', topic: 'Algebra · Part 1/2',
    chapters: ['c6_math_ch05'],
    nodeIds: ['c6_math_ch05_052', 'c6_math_ch05_053', 'c6_math_ch05_054', 'c6_math_ch05_055', 'c6_math_ch05_056', 'c6_math_ch05_057'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a codebreaker finding a hidden number', intro: 'A puzzle says: \'I think of a number, double it, add 6, get 20.\' Your job: find the number without guessing.', goal: 'Turn word puzzles into equations and solve for the unknown — forwards and backwards.' },
    discovery: {
        question: 'I think of a number, add 5, and get 12. You don\'t know my number — but can you still find it?',
        options: ['Yes — work backwards: 12 minus 5 is 7', 'No — you can\'t solve what you can\'t see', 'Only by guessing every number', 'Yes — but only if the number is even'],
        answer: 'Yes — work backwards: 12 minus 5 is 7',
        hook: 'Algebra\'s superpower: you don\'t need to see the number — the equation sees it for you.',
    },
    teaching: [
        { title: 'Introduction to Algebra: Variables and Constants', text: 'A variable is a letter or symbol used to represent a number that can change or is currently unknown, while a constant is a fixed numerical value that does not change.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c6_math_ch05_052', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'On the balance: keep both sides equal while you undo the operations — that\'s literally what solving an equation is.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'case', nodeId: 'c6_math_ch05_052', title: 'Introduction to Algebra: Variables and Constants',
          caseStudy: { intro: 'Imagine you are at a fruit shop where the price of one apple is fixed at ₹10, but the total bill depends on how many apples you buy.',
            decisions: [{ prompt: 'In the expression 5y + 8, which parts are constants and which is the variable?', options: [
                { text: 'The constants are 5 and 8, and the variable is y', outcome: 'The constants are 5 and 8, and the variable is y. A wrong answer suggests the student confuses.' },
                { text: 'coefficient', outcome: 'Not quite — Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the.', reveals: 'students-often-confuse-the-coefficient' },
                { text: 'variable', outcome: 'Not quite — Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the.', reveals: 'students-often-confuse-the-coefficient' }
            ] }] } },
        { type: 'scaffold', nodeId: 'c6_math_ch05_054', title: 'Forming Algebraic Expressions',
          scaffold: { problem: 'A tailor uses $c$ centimetres of cloth to stitch one shirt. He needs to stitch 8 shirts and then he uses an extra 20 centimetres for.',
            steps: [
            { text: 'Identify the unknown ($c$) and the number of shirts (8).' },
            { text: 'Recognize "8 shirts" means multiplying the cloth per shirt by 8 ($8 \\times c$ or $8c$).' },
            { text: 'Recognize "extra 20 cm" means adding 20 to the result ($8c + 20$).' },
            { text: 'Combine into the final expression: $8c + 20$.' },
            { text: 'Verify by testing: if $c=100$ cm, total is $8(100) + 20 = 820$ cm.', faded: true, blankAnswer: '$8c + 20$ cm' }
            ] } },
        { type: 'case', nodeId: 'c6_math_ch05_055', title: 'Simplifying Algebraic Expressions',
          caseStudy: { intro: 'Imagine you are sorting a basket containing 3 apples, 2 bananas, 5 more apples, and 1 more banana.',
            decisions: [{ prompt: 'What is the definition of a "like term" in an algebraic expression?', options: [
                { text: 'Like terms are terms that have the exact same variable part (e.g., $2y$ and $7y$)', outcome: 'Like terms are terms that have the exact same variable part (e.g., $2y$ and $7y$).' },
                { text: 'all numbers are like terms', outcome: 'Not quite — Students often try to add variables as if they were just numbers, leading them to claim $5x + 2.', reveals: 'students-often-try-to-add' }
            ] }] } },
        { type: 'drill', nodeId: 'c6_math_ch05_057', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 1 } },
        { type: 'case', nodeId: 'c6_math_ch05_052', title: 'Use it in the wild',
          caseStudy: { intro: 'A milkman charges ₹40 per litre plus a fixed ₹15 delivery fee per order. A student writes the cost formula as \'55 × L\' — forty plus fifteen, times the litres. Her mother spots the mistake on the bill.',
            decisions: [{ prompt: 'What is the right expression for the cost of L litres?', options: [
                { text: '40 × L + 15 — the ₹40 multiplies with every litre because it repeats per litre, while the ₹15 is charged once per order no matter how many litres. Lumping them into 55 × L wrongly charges the delivery fee again for every litre; keeping the constant separate is exactly what the expression is for.', outcome: 'Variables and constants behave differently — L can change order to order, the per-litre rate multiplies it, and the flat fee just sits at the end.' },
                { text: 'The student\'s 55 × L is right — all the charges combine into one rate per litre.', outcome: 'That bills the ₹15 fee once per litre — a 3-litre order would wrongly include three delivery fees.', reveals: 'fee-charged-per-litre' },
                { text: 'The cost cannot be written as an expression at all, since the litres keep changing.', outcome: 'Changing quantity is exactly why a letter is used — L stands for whatever the order is, and the formula works for every order.', reveals: 'variables-cant-be-written' }
            ] }] } },
        { type: 'case', nodeId: 'c6_math_ch05_057', title: 'The bigger picture',
          caseStudy: { intro: 'Every unknown you\'ll ever solve — in science, money, code — is just a letter standing in until you work backwards to find it.',
            decisions: [{ prompt: 'What comes next? Algebra · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Algebra · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c6_math_ch05_052', difficulty: 'standard',
          question: 'A variable is a letter or symbol used to represent a number that can change.',
          hint: 'Review number patterns and sequences from early arithmetic.',
          misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.',
          parts: [
                { id: 'a', prompt: 'In the expression 5y + 8, which parts are constants and which is the variable?', answer: 'The constants are 5 and 8, and the variable is y',
                  options: ['The constants are 5 and 8, and the variable is y', 'coefficient', 'variable'],
                  hint: 'Review number patterns and sequences from early arithmetic.',
                  misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.' },
                { id: 'b', prompt: 'If you have a box of toffees and you add 3 more, the total is t + 3. Why is \'t\' called a variable here?', answer: '\'t\' is a variable',
                  options: ['\'t\' is a variable', 'coefficient', 'variable'],
                  hint: 'Review number patterns and sequences from early arithmetic.',
                  misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.' },
                { id: 'c', prompt: 'A rickshaw driver charges ₹20 for the ride plus ₹5 for every kilometer traveled. The total cost is 20 + 5k.', answer: 'The part 5k changes as \'k\' changes',
                  options: ['The part 5k changes as \'k\' changes', 'coefficient', 'variable'],
                  hint: 'Review number patterns and sequences from early arithmetic.',
                  misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.' },
                { id: 'd', prompt: 'Compare 7x and 7. How does the presence of \'x\' change the meaning of 7?', answer: 'In \'7\', the value is fixed at seven',
                  options: ['In \'7\', the value is fixed at seven', 'coefficient', 'variable'],
                  hint: 'Review number patterns and sequences from early arithmetic.',
                  misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.' }
          ],
            remediations: { 'students-often-confuse-the-coefficient': { steps: ['Ask the student to write the expression as an addition: x + x + x + x + x.', 'Ask, "How many x\'s are there?" They will say 5.', 'Point out that \'x\' is the changing part, and the \'5\' simply tells us how many of that changing part we have.', 'Show that the 5 never changes, but the value of x can be 1, 2, or 100.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_052', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.',
          parts: [
                { id: 'a', prompt: 'Can a letter ever be a constant? (e.g., if we say \'p\' is always 5).', answer: 'No, by definition, a variable is for changing/unknown values',
                  options: ['No, by definition, a variable is for changing/unknown values', 'coefficient', 'variable'],
                  hint: 'Review number patterns and sequences from early arithmetic.',
                  misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.' },
                { id: 'b', prompt: 'Create an algebraic expression to represent the total weight of a school bag containing 2 kg of books and \'b\' number of notebooks, each weighing 250 grams.', answer: 'The expression is 2 + 0.25b',
                  options: ['The expression is 2 + 0.25b', 'coefficient', 'variable'],
                  hint: 'Review number patterns and sequences from early arithmetic.',
                  misconception: 'Students often confuse the "coefficient" (the number attached to a variable, like 5 in 5x) with the "variable" itself.' }
          ],
            remediations: { 'students-often-confuse-the-coefficient': { steps: ['Ask the student to write the expression as an addition: x + x + x + x + x.', 'Ask, "How many x\'s are there?" They will say 5.', 'Point out that \'x\' is the changing part, and the \'5\' simply tells us how many of that changing part we have.', 'Show that the 5 never changes, but the value of x can be 1, 2, or 100.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_053', difficulty: 'standard',
          question: 'An algebraic expression is a mathematical phrase containing variables (letters.',
          hint: 'Review the concept of "unknowns" in simple word problems.',
          misconception: 'Students often mistakenly include the plus or minus sign as a separate "operation" rather than part of the term itself.',
          parts: [
                { id: 'a', prompt: 'Why is the number 5 in the term 5y called a "coefficient"?', answer: 'It is called a coefficient',
                  options: ['It is called a coefficient', 'number', 'constant'],
                  hint: 'Review the concept of "unknowns" in simple word problems.',
                  misconception: 'Students often mistakenly include the plus or minus sign as a separate "operation" rather than part of the term itself, or they treat the.' }
          ],
            remediations: { 'students-often-mistakenly-include-the': { steps: ['Ask the student to circle every term including the sign directly in front of it.', 'Say, "The sign is like a backpack the term carries; you cannot leave it behind." Then, have them underline the number.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_054', difficulty: 'standard',
          question: 'Forming algebraic expressions is the process of representing relationships.',
          hint: 'Review basic arithmetic word problems and how they translate to operations.',
          misconception: 'Students often confuse the placement of terms in subtraction and division.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Forming algebraic expressions is the process of representing relationships between',
                  options: ['Forming algebraic expressions is the process of representing relationships between', 'A variable is a letter or symbol used to represent a number that can change or is', 'An algebraic expression is a mathematical phrase containing variables (letters', 'Simplifying an algebraic expression means using mathematical operations to group "like'],
                  hint: 'Review basic arithmetic word problems and how they translate to operations.',
                  misconception: 'Students often confuse the placement of terms in subtraction and division.' }
          ],
            remediations: { 'students-often-confuse-the-placement': { steps: ['Ask the student to replace the variable with a real number.', 'Say: "If you have 10 apples ($x=10$) and I take 5 away, do you have $5-10$ (which is impossible here) or $10-5$?" This.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_055', difficulty: 'standard',
          question: 'Simplifying an algebraic expression means using mathematical operations.',
          hint: 'Review basic arithmetic with negative integers if the student struggles with signs (e.g.',
          misconception: 'Students often try to add variables as if they were just numbers, leading them to claim $5x + 2 = 7x$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simplifying an algebraic expression means using mathematical operations to group "like',
                  options: ['Simplifying an algebraic expression means using mathematical operations to group "like', 'A variable is a letter or symbol used to represent a number that can change or is', 'An algebraic expression is a mathematical phrase containing variables (letters', 'Forming algebraic expressions is the process of representing relationships between'],
                  hint: 'Review basic arithmetic with negative integers if the student struggles with signs (e.g., $5x.',
                  misconception: 'Students often try to add variables as if they were just numbers, leading them to claim $5x + 2 = 7x$.' }
          ],
            remediations: { 'students-often-try-to-add': { steps: ['Ask the student: "If you have 5 bags of sugar and 2 kilograms of rice, do you have 7 bags of sugar?" They will say no.', 'Explain that $5x$ is like 5 bags of sugar and $2$ is like 2 kilograms of rice.', 'You can\'t combine them because they aren\'t the same "unit" or "type."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_056', difficulty: 'standard',
          question: 'A linear equation in one variable is a mathematical statement of equality.',
          hint: 'Review basic arithmetic and the concept of inverse operations.',
          misconception: 'Students often forget to perform the same operation on both sides of the equation.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear equation in one variable is a mathematical statement of equality containing',
                  options: ['A linear equation in one variable is a mathematical statement of equality containing', 'A variable is a letter or symbol used to represent a number that can change or is', 'An algebraic expression is a mathematical phrase containing variables (letters', 'Forming algebraic expressions is the process of representing relationships between'],
                  hint: 'Review basic arithmetic and the concept of inverse operations.',
                  misconception: 'Students often forget to perform the same operation on both sides of the equation.' }
          ],
            remediations: { 'students-often-forget-to-perform': { steps: ['Draw a physical balance scale on paper.', 'Place the equation on the scale.', 'Ask the student, "If I take 2kg off the left pan, what happens to the balance if I don\'t take 2kg off the right pan?".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c6_math_ch05_057', difficulty: 'standard',
          question: 'A linear equation is a mathematical statement asserting that two expressions.',
          hint: 'Review the properties of equality (if you add to one side, add to the other).',
          misconception: 'Students often "move" a term to the other side without changing its sign (e.g., changing $3x - 5 = 10$ to $3x = 10 - 5$.',
          parts: [
                { id: 'a', prompt: 'Dividing by 3 cancels out the multiplication, leaving $x$ by itself because $3/3 = 1$.', answer: '[Correct answer] We divide by 3',
                  options: ['[Correct answer] We divide by 3', 'magic tricks'],
                  hint: 'Review the properties of equality (if you add to one side, add to the other).',
                  misconception: 'Students often "move" a term to the other side without changing its sign (e.g., changing $3x - 5 = 10$ to $3x = 10 - 5$ instead of $3x = 10.' }
          ],
            remediations: { 'students-often-move-a-term': { steps: ['Ask the student to draw a physical scale with two pans.', 'Tell them: "If you take away 5 loose marbles from the left pan, the scale will tilt unless you also take away 5 from.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
