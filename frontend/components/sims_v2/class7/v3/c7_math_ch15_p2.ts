import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch15_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch15_p2: SimDef = {
    id: 'v3_c7_math_ch15_p2',
    title: 'Finding the Unknown · Part 2/2',
    subtitle: 'Covers translating linear word problems involving one variable into equations and solving.',
    classLevel: 7, subject: 'mathematics', topic: 'Finding the Unknown · Part 2/2',
    chapters: ['c7_math_ch15'],
    nodeIds: ['c7_math_ch15_007', 'c7_math_ch15_008', 'c7_math_ch15_009', 'c7_math_ch15_010'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a stationery shop with Rs. 100, buy a notebook for Rs.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A market beam balance sits level: potatoes on one pan, iron weights on the other. Two statements — 4x + 7 and 4x + 7 = 23 — look alike, but only one can be solved for x. Which one, and why?',
        options: ['4x + 7 = 23 — the equals sign locks a balance that forces x to one exact value, while the bare expression changes with every x you try', '4x + 7 — shorter things are easier to solve', 'Both — any letters and numbers can be solved', 'Neither — equations need two variables'],
        answer: '4x + 7 = 23 — the equals sign locks a balance that forces x to one exact value, while the bare expression changes with every x you try',
        hook: 'The equals sign does not mean write the answer here — it means the two sides weigh the same. Test any candidate by substitution: try x = 4 in 3x - 5 = 2x + 1 and the pans read 7 against 9 — not balanced, not the solution.',
    },
    teaching: [
        { title: 'Setting Up Equations from Word Problems', text: 'Setting up equations from word problems is the process of translating a real-world verbal description into a mathematical statement of equality using an unknown variable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch15_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Hunt for the true solution — substitute candidate values into both sides of an equation, weigh LHS against RHS, and crown the x that keeps the beam level.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_007', title: 'Setting Up Equations from Word Problems',
          scaffold: { problem: 'Sunita has 15 more marbles than twice the number of marbles Ravi has. If Sunita has 53 marbles, how many marbles does Ravi have?',
            steps: [
            { text: 'Identify the unknown and assign a variable. Let Ravi\'s marbles be $x$.' },
            { text: 'Translate Sunita\'s marbles into an algebraic expression based on Ravi\'s: Sunita has $2x + 15$.' },
            { text: 'Set the expression equal to Sunita\'s total known marbles to form the equation: $2x + 15 = 53$.' },
            { text: 'Solve the equation using inverse operations. Subtract 15 from both sides: $2x = 53 - 15 \\implies 2x = 38$.' },
            { text: 'Divide both sides by 2: $x = 19$. Verify: Twice of 19 is 38, and $38 + 15 = 53$, which matches.', faded: true, blankAnswer: '19 marbles' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_008', title: 'Verifying Solutions of Equations',
          scaffold: { problem: 'Verify whether $x = 3$ is a solution for the equation $5x - 4 = 2x + 5$.',
            steps: [
            { text: 'Identify the Left-Hand Side (LHS) as $5x - 4$ and the Right-Hand Side (RHS) as $2x + 5$.' },
            { text: 'Substitute the test value $x = 3$ into the Left-Hand Side: LHS = $5(3) - 4$.' },
            { text: 'Evaluate LHS using multiplication and subtraction: LHS = $15 - 4 = 11$.' },
            { text: 'Substitute the test value $x = 3$ into the Right-Hand Side: RHS = $2(3) + 5$.' },
            { text: 'Evaluate RHS using multiplication and addition: RHS = $6 + 5 = 11$.' },
            { text: 'Compare LHS and RHS: Since $11 = 11$, LHS = RHS, confirming $x = 3$ is a valid solution.', faded: true, blankAnswer: 'Yes, $x = 3$ is a solution because LHS = 11 and RHS = 11.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_009', title: 'Matchstick Patterns and Equations: Generalisation',
          scaffold: { problem: 'A row of interlocking pentagons is built with matchsticks. 1 pentagon uses 5 matchsticks, 2 connected pentagons use 9 matchsticks, and 3.',
            steps: [
            { text: 'Identify the given values and tabulate the terms. Term 1 ($n=1$) = 5, Term 2 ($n=2$) = 9, Term 3 ($n=3$) = 13.' },
            { text: 'Find the common difference between consecutive terms: $9 - 5 = 4$ and $13 - 9 = 4$. This gives the coefficient $a = 4$.' },
            { text: 'Test the term rule $4n + b$ using $n = 1$: $4(1) + b = 5$, which means $4 + b = 5$, so $b = 1$.' },
            { text: 'Substitute $n = 18$ into the expression to find the total matchsticks: $4(18) + 1$.' },
            { text: 'Compute the final value: $4 \\times 18 = 72$, then $72 + 1 = 73$ matchsticks.', faded: true, blankAnswer: 'Expression: $4n + 1$; Total matchsticks for 18 pentagons.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_010', title: 'Applications of Equations in Real-Life Situations',
          scaffold: { problem: 'Amit has ₹450 in his piggy bank, consisting of 5-rupee coins and 10-rupee notes.',
            steps: [
            { text: 'Let the number of 10-rupee notes be $x$. Then the number of 5-rupee coins is $3x$.' },
            { text: 'Calculate the total value contributed by 10-rupee notes, which is $10 \\times x = 10x$ rupees.' },
            { text: 'Calculate the total value contributed by 5-rupee coins, which is $5 \\times 3x = 15x$ rupees.' },
            { text: 'Set up the equation representing the total amount: $10x + 15x = 450$.' },
            { text: 'Combine like terms and solve: $25x = 450 \\implies x = \\frac{450}{25} = 18$.', faded: true, blankAnswer: '18 notes' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch15_010', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch15_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Homework says: \'A vendor puts x kg of potatoes plus 3 kg of onions on one pan, and it balances 18 kg of weights.\' Binita writes 4x + 3 and tries to \'solve it for x.\' Her friend claims x = 5 already solves the equation 4x + 3 = 18.',
            decisions: [{ prompt: 'What is wrong with both claims?', options: [
                { text: 'The situation is x + 3 = 18 — an equation needs an equals sign, and \'x kg of potatoes\' is just x, not 4x. And testing x = 5 in 4x + 3 gives 23, not 18, so it fails the balance check anyway.', outcome: 'This separates expressions from equations and verifies solutions by substitution — both fixes are grounded in what the equals sign means.' },
                { text: 'Binita is close enough — any string with a letter can be solved, so 4x + 3 can be set to zero to find x.', outcome: 'An expression has no balance condition, so there is nothing to solve; inventing \'= 0\' answers a different problem entirely.', reveals: 'expressions-can-be-solved' },
                { text: 'The friend is right — x = 5 must work because the number was chosen sensibly, and substitution is only for checking your own answers.', outcome: 'Substitution checks any claimed solution: LHS at x = 5 is 23 while RHS is 18, so the claim collapses on testing.', reveals: 'solutions-need-no-check' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch15_010', title: 'You made it',
          caseStudy: { intro: 'An expression is a price tag; an equation is a balance. Find the value that levels the pans and you have found the unknown.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch15_007', difficulty: 'standard',
          question: 'Setting up equations from word problems is the process of translating.',
          hint: 'Review Class 6 algebraic expressions (c6_math_ch05_054) to practice turning phrases into.',
          misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number".',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Setting up equations from word problems is the process of translating a real-world verbal',
                  options: ['Setting up equations from word problems is the process of translating a real-world verbal', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review Class 6 algebraic expressions (c6_math_ch05_054) to practice turning phrases into terms.',
                  misconception: 'Students often write subtraction terms in reverse order when translating phrases like "5 subtracted from a number" or "less than".' }
          ],
            remediations: { 'students-often-write-subtraction-terms': { steps: ['When a student makes this reversal error, ask them to plug in a test number.', 'Say: "If the number is 10, what is 7 less than 10?', 'So if our unknown number is $x$, we must write $x - 7$, not $7 - x$.', 'Always write the base quantity first and then apply the modification." Have them underline words like "less than".'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_008', difficulty: 'standard',
          question: 'Verifying solutions of equations is the process of testing whether a specific.',
          hint: 'Review c6_math_ch05_053 for basic variable substitution and evaluation of algebraic terms.',
          misconception: 'Students often make the error of substituting the test value into only one side of the equation (usually the side.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Verifying solutions of equations is the process of testing whether a specific numerical',
                  options: ['Verifying solutions of equations is the process of testing whether a specific numerical', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review c6_math_ch05_053 for basic variable substitution and evaluation of algebraic terms.',
                  misconception: 'Students often make the error of substituting the test value into only one side of the equation (usually the side containing the variable).' }
          ],
            remediations: { 'students-often-make-the-error': { steps: ['If a student struggles, guide them to use a physical two-column layout on their page.', 'Write "LHS =" on the left side and "RHS =" on the right side.', 'Instruct them to draw a vertical line between them, substitute the value into each column completely independent of the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_009', difficulty: 'standard',
          question: 'Matchstick patterns and generalisation involve observing visual geometric.',
          hint: 'Review c6_math_ch12_122 to practice finding differences in geometric number sequences.',
          misconception: 'Students frequently multiply the number of matchsticks in a single isolated geometric shape by the number of terms $n$.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Matchstick patterns and generalisation involve observing visual geometric arrangements',
                  options: ['Matchstick patterns and generalisation involve observing visual geometric arrangements', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review c6_math_ch12_122 to practice finding differences in geometric number sequences before.',
                  misconception: 'Students frequently multiply the number of matchsticks in a single isolated geometric shape by the number of terms $n$ (writing $4n$ for.' }
          ],
            remediations: { 'students-frequently-multiply-the-number': { steps: ['Ask the student to physically draw 2 connected squares side-by-side and count the exact matchsticks line by line.', 'Show them that while an isolated square has 4 sticks, joining a second square only adds 3 new sticks because one stick.', 'Guide them to write the expression as: (sticks per new shape $\\times n$) + (starting adjustment).'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_010', difficulty: 'standard',
          question: 'Applications of equations in real-life situations involve translating everyday.',
          hint: 'Review c7_math_ch15_007 to practice turning sentences into mathematical equations before.',
          misconception: 'Students frequently fail to distribute coefficients correctly across binomial expressions when setting up word problems.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Applications of equations in real-life situations involve translating everyday word',
                  options: ['Applications of equations in real-life situations involve translating everyday word', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review c7_math_ch15_007 to practice turning sentences into mathematical equations before trying.',
                  misconception: 'Students frequently fail to distribute coefficients correctly across binomial expressions when setting up word problems involving geometry.' }
          ],
            remediations: { 'students-frequently-fail-to-distribute': { steps: ['When a student makes a distribution or setup error, guide them back to physical representation.', 'Ask them to draw the shape or line up the items physically on paper.', 'Say: "Let\'s trace the total perimeter step-by-step: we need two lengths and two widths.', 'Write down $(2x + 5) + (2x + 5) + x + x$ first before simplifying to show all four sides clearly."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
