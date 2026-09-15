import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch04_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch04_p1: SimDef = {
    id: 'v3_c7_math_ch04_p1',
    title: 'Expressions Using Letter-Numbers · Part 1/2',
    subtitle: 'Covers the concept of variables as letter-numbers, distinguishing variables from.',
    classLevel: 7, subject: 'mathematics', topic: 'Expressions Using Letter-Numbers · Part 1/2',
    chapters: ['c7_math_ch04'],
    nodeIds: ['c7_math_ch04_001', 'c7_math_ch04_002', 'c7_math_ch04_003', 'c7_math_ch04_004', 'c7_math_ch04_005', 'c7_math_ch04_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are buying notebooks for your school opening day at the local stationery shop where each notebook.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A canteen sells samosas at 15 rupees each, so the bill is 15y. Priya insists the letter y must secretly equal 5. Is she right?',
        options: ['No — y is a variable that can be 1, 2, 10, or any number of samosas; that is exactly what makes it useful', 'Yes — every letter hides one fixed answer', 'Yes — but only on days when samosas cost 15', 'No — y must always be zero until proven otherwise'],
        answer: 'No — y is a variable that can be 1, 2, 10, or any number of samosas; that is exactly what makes it useful',
        hook: 'A letter-number is a placeholder, not a puzzle answer. That is why 4 x m = 20 is more powerful than 5 + 5 + 5 + 5 = 20 — the first describes one case, the second describes a rule that fits countless cases.',
    },
    teaching: [
        { title: 'Introduction to Letter-Numbers: Variables in Algebra', text: 'A variable is a letter or symbol used in algebra to represent an unknown or changing quantity that can take various numerical values.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch04_001', title: 'Introduction to Letter-Numbers: Variables in Algebra',
          scaffold: { problem: 'Riya has ₹50 in her piggy bank. Every day, she saves ₹10 from her pocket money.',
            steps: [
            { text: 'Identify the fixed amount already in the piggy bank, which is constant = ₹50.' },
            { text: 'Identify the daily savings rate and the variable representing the number of days, which is ₹10 per day and $d$ days.' },
            { text: 'Express the total saved amount through multiplication and addition: Total Money = (Daily savings $\\times$ number.' },
            { text: 'Substitute the given value $d = 7$ into the expression: $10(7) + 50$.' },
            { text: 'Compute the arithmetic operations following BODMAS: $70 + 50 = ₹120$.', faded: true, blankAnswer: 'Algebraic expression is $10d + 50$; total amount for 7 days.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_002', title: 'Algebraic Expressions: Terms, Coefficients and Constants',
          scaffold: { problem: 'Rahul goes to a local market in Jaipur and buys $x$ notebooks for ₹25 each, $y$ geometry boxes for ₹60 each, and also pays a packing charge.',
            steps: [
            { text: 'Translate the word problem into an algebraic expression by multiplying item quantities by their unit prices and adding.' },
            { text: 'Identify the terms by looking at the separation by plus signs: The terms are $25x$, $60y$, and $15$.' },
            { text: 'Extract the coefficient of $x$ by observing the number multiplied by $x$, which is $25$.' },
            { text: 'Extract the coefficient of $y$ by observing the number multiplied by $y$, which is $60$.' },
            { text: 'Identify the standalone number with no variable attached, which is the constant term $15$.', faded: true, blankAnswer: 'Expression: $25x + 60y + 15$; Terms: $25x, 60y, 15$.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_004', title: 'Writing Algebraic Expressions from Word Problems',
          scaffold: { problem: 'A library has $b$ books on a bottom shelf. The middle shelf has 3 times as many books as the bottom shelf minus 12 books.',
            steps: [
            { text: 'Identify the variable for the baseline shelf. Let the number of books on the bottom shelf be $b$.' },
            { text: 'Translate the middle shelf description. "3 times as many books as the bottom shelf minus 12" translates to $3b - 12$.' },
            { text: 'Translate the top shelf description. "15 more books than the middle shelf" means we take the middle shelf expression.' },
            { text: 'Combine all three shelves into a total sum expression: $b + (3b - 12) + (3b - 12 + 15)$.' },
            { text: 'Simplify the expression by grouping like terms. Total = $b + 3b - 12 + 3b - 12 + 15 = (1 + 3 + 3)b + (-12 - 12 + 15).', faded: true, blankAnswer: '$7b - 9$ books' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_005', title: 'Matchstick Patterns and Generalising with Variables',
          scaffold: { problem: 'Amit is making a pattern of letter \'F\' using matchsticks. One letter \'F\' requires 4 matchsticks.',
            steps: [
            { text: 'Identify the number of matchsticks for the first few shapes: for $n=1$, matchsticks = 4; for $n=2$, matchsticks = 7.' },
            { text: 'Calculate the difference between consecutive terms: $7 - 4 = 3$ and $10 - 7 = 3$. The common difference is 3.' },
            { text: 'Use the common difference as the coefficient of $n$, giving $3n$, and test it with $n = 1$: $3(1) = 3$.' },
            { text: 'Compare the test result (3) with the actual first term (4). The difference is $4 - 3 = 1$, so we must add 1 to the.' },
            { text: 'Write the final algebraic expression: $3n + 1$, and verify for $n = 3$: $3(3) + 1 = 9 + 1 = 10$, which matches.', faded: true, blankAnswer: '3n + 1 matchsticks' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_006', title: 'Simplification of Algebraic Expressions: Like Terms',
          scaffold: { problem: 'Riya went to the market and bought $7x$ notebooks and $3y$ pens. Later, she bought another $2x$ notebooks and lost $y$ pens.',
            steps: [
            { text: 'Write down the algebraic expression representing all items bought and changed: $(7x + 3y) + (2x - y)$.' },
            { text: 'Use the commutative and associative properties to group like terms together: $(7x + 2x) + (3y - y)$.' },
            { text: 'Combine the coefficients of the like terms for $x$: $7 + 2 = 9$, giving $9x$.' },
            { text: 'Combine the coefficients of the like terms for $y$ (remembering that $-y$ has a coefficient of $-1$): $3 - 1 = 2$.' },
            { text: 'Write the final simplified expression combining both results: $9x + 2y$.', faded: true, blankAnswer: '$9x + 2y$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch04_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch04_001', title: 'Use it in the wild',
          caseStudy: { intro: 'The canteen charges ₹15 per samosa, so Karan writes the cost as 15y where y is the number of samosas. His friend objects: \'You can\'t leave a letter in a maths answer — y has to be one fixed number, so tell me what y equals.\'',
            decisions: [{ prompt: 'Who understands what the letter is doing?', options: [
                { text: 'Karan does — y is a variable, a placeholder for however many samosas someone buys; the expression 15y works for 1, 7 or 40 samosas, which is exactly why it is more powerful than writing 15 × 5 for one fixed case.', outcome: 'This treats the letter as a number-in-disguise that can take many values — the core purpose of a variable.' },
                { text: 'The friend is right — every letter in algebra hides one secret correct value, and the job is to guess it.', outcome: 'That confuses a variable with a puzzle answer; unless an equation pins it down, a variable ranges over many possible values.', reveals: 'variable-has-one-answer' },
                { text: 'Neither — the y is just an abbreviation for \'samosas\', so 15y means \'15 samosas\' and no maths is involved.', outcome: 'Letters stand for counts, not objects: y is the number of samosas, so 15y is fifteen times that number — a cost, not a label.', reveals: 'letter-is-object' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch04_006', title: 'The bigger picture',
          caseStudy: { intro: 'Arithmetic answers one question; a variable answers all of them at once. Letters are just numbers waiting for their turn.',
            decisions: [{ prompt: 'What comes next? Expressions Using Letter-Numbers · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Expressions Using Letter-Numbers · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch04_001', difficulty: 'standard',
          question: 'A variable is a letter or symbol used in algebra to represent an unknown.',
          hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed.',
          misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for.',
          parts: [
                { id: 'a', prompt: 'In the algebraic expression $4x + 7$, what does the letter $x$ represent? Is it a fixed number or a variable?', answer: 'The letter $x$ represents a variable',
                  options: ['The letter $x$ represents a variable', 'x is always 4', 'x is a constant', 'apples'],
                  hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed numbers) and.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' },
                { id: 'b', prompt: 'A school canteen sells samosas for ₹15 each. Rahul writes the total cost as $15y$, where $y$ is the number of samosas bought.', answer: 'Rahul is correct',
                  options: ['Rahul is correct', 'apples', 'the number of apples', '$a$ stands for "apples" rather than "the number of apples'],
                  hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed numbers) and.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' },
                { id: 'c', prompt: 'Compare the arithmetic statement "$5 + 5 + 5 + 5 = 20$" with the algebraic expression "$4 \\times m = 20$".', answer: 'The arithmetic statement only describes one specific situation involving four 5s',
                  options: ['The arithmetic statement only describes one specific situation involving four 5s', 'apples', 'the number of apples', '$a$ stands for "apples" rather than "the number of apples'],
                  hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed numbers) and.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' }
          ],
            remediations: { 'students-frequently-confuse-variables-with': { steps: ['Remind the student that letters in algebra are numbers in disguise, not physical objects.', 'Ask them: "If $p$ is the number of pencils, is $p$ a number or is it a plastic pencil?" Guide them to substitute.', 'Reinforce that the letter stands for an unknown count or amount, and operations (+, -, $\\times$, $\\div$) apply to.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for.',
          parts: [
                { id: 'a', prompt: 'Teacher gives a statement: "The sum of a number $n$ and 8 is 15." Student A writes $n + 8 = 15$. Student B writes $n = 15 + 8$.', answer: 'Student A is correct',
                  options: ['Student A is correct', 'apples', 'the number of apples', '$a$ stands for "apples" rather than "the number of apples'],
                  hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed numbers) and.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' },
                { id: 'b', prompt: 'Create a real-world scenario from your daily life in India (involving auto-rickshaw fares, buying fruits, or school items) that can be represented using.', answer: 'An acceptable answer should describe a scenario with a fixed rate and a variable',
                  options: ['An acceptable answer should describe a scenario with a fixed rate and a variable', 'apples', 'the number of apples', '$a$ stands for "apples" rather than "the number of apples'],
                  hint: 'Review c6_math_ch05_052 to reinforce the core difference between constants (fixed numbers) and.',
                  misconception: 'Students frequently confuse variables with constants or labels, treating a letter like $a$ as an abbreviation for an object (e.g., thinking.' }
          ],
            remediations: { 'students-frequently-confuse-variables-with': { steps: ['Remind the student that letters in algebra are numbers in disguise, not physical objects.', 'Ask them: "If $p$ is the number of pencils, is $p$ a number or is it a plastic pencil?" Guide them to substitute.', 'Reinforce that the letter stands for an unknown count or amount, and operations (+, -, $\\times$, $\\div$) apply to.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_002', difficulty: 'standard',
          question: 'An algebraic expression is made up of terms added or subtracted together, where.',
          hint: 'Review integer sign rules and how arithmetic operations separate expressions into.',
          misconception: 'Students frequently drop the negative sign when identifying coefficients of terms that follow a subtraction sign,.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An algebraic expression is made up of terms added or subtracted together, where each term',
                  options: ['An algebraic expression is made up of terms added or subtracted together, where each term', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical', 'Writing algebraic expressions from word problems involves translating verbal statements'],
                  hint: 'Review integer sign rules and how arithmetic operations separate expressions into individual terms.',
                  misconception: 'Students frequently drop the negative sign when identifying coefficients of terms that follow a subtraction sign, or they confuse the.' }
          ],
            remediations: { 'students-frequently-drop-the-negative': { steps: ['Remind the student that every subtraction sign in an algebraic expression can be rewritten as adding a negative.', 'Ask them to circle each term including its preceding sign: for $3x^2 - 5x + 7$, circle $+3x^2$, $-5x$, and $+7$.', 'Emphasize that the sign immediately to the left always belongs to that term.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_003', difficulty: 'standard',
          question: 'Revisiting arithmetic expressions with variables bridges the gap between purely.',
          hint: 'Review integer multiplication rules and basic distributive property from c6_math_ch02_022.',
          misconception: 'Students often distribute a multiplier to only the first term inside parentheses or fail to distribute a negative sign.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical',
                  options: ['Revisiting arithmetic expressions with variables bridges the gap between purely numerical', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'An algebraic expression is made up of terms added or subtracted together, where each term', 'Writing algebraic expressions from word problems involves translating verbal statements'],
                  hint: 'Review integer multiplication rules and basic distributive property from c6_math_ch02_022 and.',
                  misconception: 'Students often distribute a multiplier to only the first term inside parentheses or fail to distribute a negative sign correctly across all.' }
          ],
            remediations: { 'students-often-distribute-a-multiplier': { steps: ['To fix this error, explicitly guide the student to draw arrows from the outer factor to every single term inside the.', 'Remind them of integer multiplication rules from Class 6: negative times negative is positive.', 'Write out the expansion in two separate mini-multiplications: $(-2) \\times (3x)$ and $(-2) \\times (-4)$, then combine.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_004', difficulty: 'standard',
          question: 'Writing algebraic expressions from word problems involves translating verbal.',
          hint: 'Review c7_math_ch04_001 to practice matching words like "sum", "difference", "product".',
          misconception: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.',
          parts: [
                { id: 'a', prompt: 'If Rahul has $x$ marbles and Priya has 5 more marbles than Rahul, write the algebraic expression for Priya\'s number of marbles.', answer: 'The correct expression is $x + 5$',
                  options: ['The correct expression is $x + 5$', '5 more than', '5 times'],
                  hint: 'Review c7_math_ch04_001 to practice matching words like "sum", "difference", "product", and.',
                  misconception: 'Students frequently misinterpret verbal phrases involving subtraction and division by reversing the order of terms.' }
          ],
            remediations: { 'students-frequently-misinterpret-verbal-phrases': { steps: ['When a student makes a reversal error, have them test the expression with a concrete number.', 'Ask: "If you have 20 rupees and decrease it by $x$ rupees, let\'s say $x$ is 5.', 'Does $5 - 20$ give you what you have left, or does $20 - 5$?" Guide them to see that the starting amount must always.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_005', difficulty: 'standard',
          question: 'Matchstick patterns and generalising with variables is the process of building.',
          hint: 'Review c7_math_ch04_001 to understand how variables represent quantities, and practice.',
          misconception: 'Students often assume that if a single shape takes $k$ matchsticks, then $n$ connected shapes will always take $k.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matchstick patterns and generalising with variables is the process of building geometric',
                  options: ['Matchstick patterns and generalising with variables is the process of building geometric', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'An algebraic expression is made up of terms added or subtracted together, where each term', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical'],
                  hint: 'Review c7_math_ch04_001 to understand how variables represent quantities, and practice finding the.',
                  misconception: 'Students often assume that if a single shape takes $k$ matchsticks, then $n$ connected shapes will always take $k \\times n$ matchsticks.' }
          ],
            remediations: { 'if-a-single-shape-takes': { steps: ['If a student writes $4n$ for connected squares, do not just tell them the formula is $3n + 1$.', 'Instead, have them physically draw 2 squares connected side by side and count the matchsticks together: ask, \'How many.', 'If we add a second square sharing one side, how many *new* matchsticks do we actually lay down?', '(3).\' Write $4 + 3 = 7$ for two squares.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_006', difficulty: 'standard',
          question: 'Simplification of algebraic expressions involving like terms is the process.',
          hint: 'Review integer addition and subtraction rules, and practice identifying identical.',
          misconception: 'Students frequently commit the "exponent addition error" when combining like terms with powers, writing $3x^2 + 5x^2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Simplification of algebraic expressions involving like terms is the process of combining',
                  options: ['Simplification of algebraic expressions involving like terms is the process of combining', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'An algebraic expression is made up of terms added or subtracted together, where each term', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical'],
                  hint: 'Review integer addition and subtraction rules, and practice identifying identical variable parts.',
                  misconception: 'Students frequently commit the "exponent addition error" when combining like terms with powers, writing $3x^2 + 5x^2 = 8x^4$ instead.' }
          ],
            remediations: { 'students-frequently-commit-the-exponent': { steps: ['When a student makes these errors, guide them back to physical grouping and units.', 'Ask: "If $x^2$ represents the area of a square tile of side $x$, and you have 3 square tiles plus 5 square tiles,.'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
