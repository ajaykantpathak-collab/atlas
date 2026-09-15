import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch04_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch04_p2: SimDef = {
    id: 'v3_c7_math_ch04_p2',
    title: 'Expressions Using Letter-Numbers · Part 2/2',
    subtitle: 'Covers addition and subtraction of like algebraic terms with integer coefficients and.',
    classLevel: 7, subject: 'mathematics', topic: 'Expressions Using Letter-Numbers · Part 2/2',
    chapters: ['c7_math_ch04'],
    nodeIds: ['c7_math_ch04_007', 'c7_math_ch04_008', 'c7_math_ch04_009', 'c7_math_ch04_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you are at an stationery shop buying notebooks and pens.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A canteen sells samosas at 15 rupees each, so the bill is 15y. Priya insists the letter y must secretly equal 5. Is she right?',
        options: ['No — y is a variable that can be 1, 2, 10, or any number of samosas; that is exactly what makes it useful', 'Yes — every letter hides one fixed answer', 'Yes — but only on days when samosas cost 15', 'No — y must always be zero until proven otherwise'],
        answer: 'No — y is a variable that can be 1, 2, 10, or any number of samosas; that is exactly what makes it useful',
        hook: 'A letter-number is a placeholder, not a puzzle answer. That is why 4 x m = 20 is more powerful than 5 + 5 + 5 + 5 = 20 — the first describes one case, the second describes a rule that fits countless cases.',
    },
    teaching: [
        { title: 'Combining Like Terms: Rules and Examples', text: 'Combining like terms is the algebraic process of simplifying expressions by adding or subtracting terms that contain the exact same variables raised to the exact same powers, using their numerical.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c7_math_ch04_007', title: 'Combining Like Terms: Rules and Examples',
          scaffold: { problem: 'Riya went to the market and bought $5x$ notebooks and $3y$ pens. Later, she bought another $2x$ notebooks and lost $y$ pens.',
            steps: [
            { text: 'Translate the word problem into an initial algebraic expression: $5x + 3y + 2x - y$.' },
            { text: 'Identify and group the like terms together: $(5x + 2x) + (3y - y)$.' },
            { text: 'Combine the coefficients of the $x$ terms: $5 + 2 = 7$, giving $7x$.' },
            { text: 'Combine the coefficients of the $y$ terms (remembering that $-y$ has an invisible coefficient of $-1$): $3 - 1 = 2$.' },
            { text: 'Write the final combined expression with all simplified parts: $7x + 2y$.', faded: true, blankAnswer: '$7x + 2y$' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_008', title: 'Pick Patterns and Reveal Relationships: Generalisation',
          scaffold: { problem: 'Priya arranges flower pots in rows for a school exhibition. Row 1 has 5 pots, Row 2 has 8 pots, and Row 3 has 11 pots.',
            steps: [
            { text: 'List the given values of the sequence to examine the growth: 5, 8, 11, ...' },
            { text: 'Find the common difference ($a$) between consecutive terms: $8 - 5 = 3$ and $11 - 8 = 3$, so $a = 3$.' },
            { text: 'Set up the partial rule using the common difference: $3n + b$.' },
            { text: 'Combine into the final generalisation rule: $3n + 2$.' },
            { text: 'Substitute $n = 15$ into the rule to calculate the pots in Row 15: $3(15) + 2 = 45 + 2 = 47$ pots.', faded: true, blankAnswer: '47 pots' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_009', title: 'Substituting Values into Algebraic Expressions',
          scaffold: { problem: 'A school store sells notebooks for ₹25 each and pens for ₹10 each.',
            steps: [
            { text: 'Identify the given algebraic expression and the assigned values for the variables: Expression is $25n + 10p + 15$, with.' },
            { text: 'Rewrite the expression by replacing each variable with its corresponding numerical value inside parentheses: $25(4).' },
            { text: 'Perform the multiplication operations first according to BODMAS: $25 \\times 4 = 100$ and $10 \\times 6 = 60$.' },
            { text: 'Substitute these products back into the expression: $100 + 60 + 15$.' },
            { text: 'Perform the addition and include the correct currency unit: $100 + 60 + 15 = 175$ rupees.', faded: true, blankAnswer: '₹175' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch04_010', title: 'Using Algebraic Expressions to Describe Geometric Patterns',
          scaffold: { problem: 'Priya arranges square tiles in a growing row for a school art project. Step 1 uses 6 tiles, Step 2 uses 10 tiles, and Step 3 uses 14 tiles.',
            steps: [
            { text: 'List the given tile counts for each step: Step 1 = 6, Step 2 = 10, Step 3 = 14.' },
            { text: 'Find the common difference between consecutive steps: $10 - 6 = 4$ and $14 - 10 = 4$.' },
            { text: 'Determine the constant offset $b$ by testing $4n + b$ for Step 1 ($n=1$): $4(1) + b = 6 \\implies 4 + b = 6 \\implies.' },
            { text: 'Substitute $n = 25$ into the expression to find the tiles needed for Step 25: $4(25) + 2$.' },
            { text: 'Compute the final value: $100 + 2 = 102$ tiles with appropriate units.', faded: true, blankAnswer: 'Expression: $4n + 2$; Step 25 requires 102 tiles.' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch04_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch04_007', title: 'Use it in the wild',
          caseStudy: { intro: 'The canteen charges ₹15 per samosa, so Karan writes the cost as 15y where y is the number of samosas. His friend objects: \'You can\'t leave a letter in a maths answer — y has to be one fixed number, so tell me what y equals.\'',
            decisions: [{ prompt: 'Who understands what the letter is doing?', options: [
                { text: 'Karan does — y is a variable, a placeholder for however many samosas someone buys; the expression 15y works for 1, 7 or 40 samosas, which is exactly why it is more powerful than writing 15 × 5 for one fixed case.', outcome: 'This treats the letter as a number-in-disguise that can take many values — the core purpose of a variable.' },
                { text: 'The friend is right — every letter in algebra hides one secret correct value, and the job is to guess it.', outcome: 'That confuses a variable with a puzzle answer; unless an equation pins it down, a variable ranges over many possible values.', reveals: 'variable-has-one-answer' },
                { text: 'Neither — the y is just an abbreviation for \'samosas\', so 15y means \'15 samosas\' and no maths is involved.', outcome: 'Letters stand for counts, not objects: y is the number of samosas, so 15y is fifteen times that number — a cost, not a label.', reveals: 'letter-is-object' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch04_010', title: 'You made it',
          caseStudy: { intro: 'Arithmetic answers one question; a variable answers all of them at once. Letters are just numbers waiting for their turn.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch04_007', difficulty: 'standard',
          question: 'Combining like terms is the algebraic process of simplifying expressions.',
          hint: 'Review c7_math_ch04_002 to practice identifying coefficients and variable parts correctly.',
          misconception: 'Students frequently add or multiply the variables themselves along with the coefficients, or they combine terms with.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Combining like terms is the algebraic process of simplifying expressions by adding or',
                  options: ['Combining like terms is the algebraic process of simplifying expressions by adding or', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'An algebraic expression is made up of terms added or subtracted together, where each term', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical'],
                  hint: 'Review c7_math_ch04_002 to practice identifying coefficients and variable parts correctly.',
                  misconception: 'Students frequently add or multiply the variables themselves along with the coefficients, or they combine terms with different exponents.' }
          ],
            remediations: { 'students-frequently-add-or-multiply': { steps: ['If a student struggles, guide them to circle or underline like terms using different shapes or colors (e.g., box all.', 'Remind them that variables represent labels or units that never change during addition or subtraction—only the number.', 'Have them practice integer operations separately before applying them to coefficients.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_008', difficulty: 'standard',
          question: 'The process of observing numerical or geometric patterns and expressing the.',
          hint: 'Review c7_math_ch04_005 to practice connecting visual steps to algebraic coefficients.',
          misconception: 'Students often set the coefficient of $n$ equal to the first term of the sequence instead of the common difference.',
          parts: [
                { id: 'a', prompt: 'What term in algebra is used to describe finding a general rule for a sequence of numbers using a letter like $n$?', answer: 'generalisation or algebraic generalisation',
                  options: ['generalisation or algebraic generalisation', 'multiplication', 'substitution'],
                  hint: 'Review c7_math_ch04_005 to practice connecting visual steps to algebraic coefficients.',
                  misconception: 'Students often set the coefficient of $n$ equal to the first term of the sequence instead of the common difference between consecutive.' }
          ],
            remediations: { 'students-often-set-the-coefficient': { steps: ['Guide the student by writing out the sequence and calculating the gap between adjacent terms first.', 'Say: "Before looking at the first number, find out how much is added each time you move to the next step.', 'That growth amount is always your coefficient multiplied by $n$; the first term only helps you find what number to add.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_009', difficulty: 'standard',
          question: 'Substituting values into an algebraic expression is the process of replacing.',
          hint: 'Review integer multiplication rules (c6_math_ch02_022) and algebraic terms and.',
          misconception: 'Students frequently omit multiplication signs or parentheses when substituting negative numbers or coefficients.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Substituting values into an algebraic expression is the process of replacing the',
                  options: ['Substituting values into an algebraic expression is the process of replacing the', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'An algebraic expression is made up of terms added or subtracted together, where each term', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical'],
                  hint: 'Review integer multiplication rules (c6_math_ch02_022) and algebraic terms and coefficients.',
                  misconception: 'Students frequently omit multiplication signs or parentheses when substituting negative numbers or coefficients.' }
          ],
            remediations: { 'students-frequently-omit-multiplication-signs': { steps: ['Remind the student to always put parentheses around substituted numbers, especially negative numbers, fractions,.', 'Write out the substitution explicitly: replace every instance of the letter with an empty bracket first, like $5.'] } } },
        { type: 'subpart', nodeId: 'c7_math_ch04_010', difficulty: 'standard',
          question: 'An algebraic expression describing a geometric pattern uses variables (like.',
          hint: 'Review c7_math_ch04_005 on matchstick patterns and c7_math_ch04_001 on variables.',
          misconception: 'Students often look at the common difference in a geometric pattern (e.g., adding 3 matchsticks each step) and write.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'An algebraic expression describing a geometric pattern uses variables (like $n$) to',
                  options: ['An algebraic expression describing a geometric pattern uses variables (like $n$) to', 'A variable is a letter or symbol used in algebra to represent an unknown or changing', 'An algebraic expression is made up of terms added or subtracted together, where each term', 'Revisiting arithmetic expressions with variables bridges the gap between purely numerical'],
                  hint: 'Review c7_math_ch04_005 on matchstick patterns and c7_math_ch04_001 on variables to understand how.',
                  misconception: 'Students often look at the common difference in a geometric pattern (e.g., adding 3 matchsticks each step) and write down only $3n$.' }
          ],
            remediations: { 'students-often-look-at-the': { steps: ['Remind the student to always test their algebraic expression with $n = 1$.', 'Say: "If your rule is $3n$, what does it give for $n = 1$?', 'But your drawing for Step 1 has 5 items!', 'Where are the missing 2 items?'] } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
