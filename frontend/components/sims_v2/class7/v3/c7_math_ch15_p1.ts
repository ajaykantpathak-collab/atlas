import type { SimDef } from '../../engine/types';

/** v3 generated — c7_math_ch15_p1 (6 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c7_math_ch15_p1: SimDef = {
    id: 'v3_c7_math_ch15_p1',
    title: 'Finding the Unknown · Part 1/2',
    subtitle: 'Covers the conceptual identification of equations, recognizing the difference between.',
    classLevel: 7, subject: 'mathematics', topic: 'Finding the Unknown · Part 1/2',
    chapters: ['c7_math_ch15'],
    nodeIds: ['c7_math_ch15_001', 'c7_math_ch15_002', 'c7_math_ch15_003', 'c7_math_ch15_004', 'c7_math_ch15_005', 'c7_math_ch15_006'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a class 7 learner', intro: 'Imagine you go to a local vegetable market in India with your mother, and the vendor uses a traditional beam.', goal: 'Master every idea in this chapter.' },
    discovery: {
        question: 'A market beam balance sits level: potatoes on one pan, iron weights on the other. Two statements — 4x + 7 and 4x + 7 = 23 — look alike, but only one can be solved for x. Which one, and why?',
        options: ['4x + 7 = 23 — the equals sign locks a balance that forces x to one exact value, while the bare expression changes with every x you try', '4x + 7 — shorter things are easier to solve', 'Both — any letters and numbers can be solved', 'Neither — equations need two variables'],
        answer: '4x + 7 = 23 — the equals sign locks a balance that forces x to one exact value, while the bare expression changes with every x you try',
        hook: 'The equals sign does not mean write the answer here — it means the two sides weigh the same. Test any candidate by substitution: try x = 4 in 3x - 5 = 2x + 1 and the pans read 7 against 9 — not balanced, not the solution.',
    },
    teaching: [
        { title: 'Equations: Statement of Equality Between Two Expressions', text: 'An equation is a mathematical statement that shows two algebraic expressions are equal, connected by an equals sign ($=$), where at least one expression contains an unknown variable.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c7_math_ch15_001', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Hunt for the true solution — substitute candidate values into both sides of an equation, weigh LHS against RHS, and crown the x that keeps the beam level.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_001', title: 'Equations: Statement of Equality Between Two Expressions',
          scaffold: { problem: 'Priya has a piggy bank. She adds 5 ₹10 coins to her savings box.',
            steps: [
            { text: 'Identify the unknown variable. Let Priya\'s previous money be $x$ rupees.' },
            { text: 'Form the expression for the addition of money. Adding 5 coins of ₹10 means adding $5 \\times 10 = 50$ rupees, so the LHS.' },
            { text: 'Set up the equation by equating the LHS expression to the given total RHS value of 95. The equation is $x + 50 = 95$.' },
            { text: 'Verify the solution by substituting $x = 45$ into the LHS: $\\text{LHS} = 45 + 50 = 95$.' },
            { text: 'Compare LHS and RHS. Since $\\text{LHS} = 95$ and $\\text{RHS} = 95$, both sides balance, confirming $x = 45$ is the.', faded: true, blankAnswer: 'Equation is $x + 50 = 95$; $x = 45$ is verified as the.' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_002', title: 'Finding the Unknown: Balancing Both Sides',
          scaffold: { problem: 'Priya went to the market with some money. After spending ₹45 on books, she has ₹120 left.',
            steps: [
            { text: 'Identify what is given and define the unknown. Let $m$ be the initial money in rupees.' },
            { text: 'Identify the operation needed to isolate $m$. Since 45 is subtracted from $m$, the inverse operation is adding 45.' },
            { text: 'Apply the balance principle by adding 45 to both the LHS and RHS: $m - 45 + 45 = 120 + 45$.' },
            { text: 'Compute the arithmetic on both sides: $m = 165$.' },
            { text: 'Verify the result by substituting back: $165 - 45 = 120$, which matches the given remaining amount.', faded: true, blankAnswer: '₹165' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_003', title: 'Solving Linear Equations: Systematic Method',
          scaffold: { problem: 'Rahul buys 4 identical geometry boxes and pays a delivery charge of ₹30. His total bill is ₹250.',
            steps: [
            { text: 'Identify given information and form the equation. Let $x$ be the cost of one geometry box. Total cost = $4x + 30 = 250$.' },
            { text: 'Determine the first inverse operation needed. To undo the addition of 30, subtract 30 from both sides.' },
            { text: 'Perform the subtraction: $4x + 30 - 30 = 250 - 30 \\implies 4x = 220$.' },
            { text: 'Determine the second inverse operation. To undo multiplication by 4, divide both sides by 4.' },
            { text: 'Compute the final value: $\\frac{4x}{4} = \\frac{220}{4} \\implies x = 55$. Verify: $4(55) + 30 = 220 + 30 = 250$.', faded: true, blankAnswer: '₹55 per geometry box' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_004', title: 'Solving Equations Using Inverse Operations',
          scaffold: { problem: 'Riya went to the market and bought some identical notebooks. Each notebook costs ₹25, and she also paid a delivery charge of ₹15.',
            steps: [
            { text: 'Translate the word problem into a linear equation: $25n + 15 = 140$.' },
            { text: 'Identify the operations acting on $n$: first multiplied by 25, then 15 is added.' },
            { text: 'Apply the inverse of adding 15 (which is subtracting 15) to both sides: $25n + 15 - 15 = 140 - 15$, which simplifies.' },
            { text: 'Apply the inverse of multiplying by 25 (which is dividing by 25) to both sides: $\\frac{25n}{25} = \\frac{125}{25}$.' },
            { text: 'Verify the result by substituting $n = 5$ back into the original expression: $25(5) + 15 = 125 + 15 = 140$, confirming.', faded: true, blankAnswer: '5 notebooks' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_005', title: 'Equations with Variables on Both Sides',
          scaffold: { problem: 'Riya saves rupees 50 in her piggy bank and adds rupees 20 every week.',
            steps: [
            { text: 'Identify the given values and let $w$ represent the number of weeks. Riya\'s total savings = $50 + 20w$.' },
            { text: 'Set up the equation where both savings are equal: $50 + 20w = 20 + 30w$.' },
            { text: 'Subtract $20w$ from both sides to collect the variable terms on the right side: $50 = 20 + 30w - 20w \\implies 50 = 20.' },
            { text: 'Subtract $20$ from both sides to isolate the variable term: $50 - 20 = 10w \\implies 30 = 10w$.' },
            { text: 'Divide both sides by $10$ to solve for $w$: $w = 30 \\div 10 = 3$.', faded: true, blankAnswer: 'After 3 weeks' }
            ] } },
        { type: 'scaffold', nodeId: 'c7_math_ch15_006', title: 'Mind the Mistake, Mend the Mistake: Common Errors in Solving',
          scaffold: { problem: 'Amit tried to solve the equation $7 - 3(x + 1) = 4$. His final answer was $x = 2$.',
            steps: [
            { text: 'Examine Amit\'s expansion of the brackets. Amit wrote $7 - 3x + 1 = 4$, missing the distribution of $-3$ to $+1$.' },
            { text: 'Apply the correct distributive property: $-3 \\times x = -3x$ and $-3 \\times 1 = -3$, so the equation becomes $7 - 3x.' },
            { text: 'Combine like terms on the Left Hand Side: $(7 - 3) - 3x = 4$, which simplifies to $4 - 3x = 4$.' },
            { text: 'Transpose the constant $4$ to the Right Hand Side using its inverse operation: $-3x = 4 - 4 \\Rightarrow -3x = 0$.' },
            { text: 'Divide by $-3$ to isolate $x$: $x = \\frac{0}{-3} = 0$, and verify by substitution: $7 - 3(0 + 1) = 7 - 3 = 4$.', faded: true, blankAnswer: '$x = 0$' }
            ] } },
        { type: 'drill', nodeId: 'c7_math_ch15_006', title: 'Rapid check',
          drill: { kind: 'ratio', count: 4, level: 2 } },
        { type: 'case', nodeId: 'c7_math_ch15_001', title: 'Use it in the wild',
          caseStudy: { intro: 'Homework says: \'A vendor puts x kg of potatoes plus 3 kg of onions on one pan, and it balances 18 kg of weights.\' Binita writes 4x + 3 and tries to \'solve it for x.\' Her friend claims x = 5 already solves the equation 4x + 3 = 18.',
            decisions: [{ prompt: 'What is wrong with both claims?', options: [
                { text: 'The situation is x + 3 = 18 — an equation needs an equals sign, and \'x kg of potatoes\' is just x, not 4x. And testing x = 5 in 4x + 3 gives 23, not 18, so it fails the balance check anyway.', outcome: 'This separates expressions from equations and verifies solutions by substitution — both fixes are grounded in what the equals sign means.' },
                { text: 'Binita is close enough — any string with a letter can be solved, so 4x + 3 can be set to zero to find x.', outcome: 'An expression has no balance condition, so there is nothing to solve; inventing \'= 0\' answers a different problem entirely.', reveals: 'expressions-can-be-solved' },
                { text: 'The friend is right — x = 5 must work because the number was chosen sensibly, and substitution is only for checking your own answers.', outcome: 'Substitution checks any claimed solution: LHS at x = 5 is 23 while RHS is 18, so the claim collapses on testing.', reveals: 'solutions-need-no-check' }
            ] }] } },
        { type: 'case', nodeId: 'c7_math_ch15_006', title: 'The bigger picture',
          caseStudy: { intro: 'An expression is a price tag; an equation is a balance. Find the value that levels the pans and you have found the unknown.',
            decisions: [{ prompt: 'What comes next? Finding the Unknown · Part 2/2 picks up right here.', options: [
                { text: 'Continue — next part awaits', outcome: 'Onward — Finding the Unknown · Part 2/2 builds on exactly this.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c7_math_ch15_001', difficulty: 'standard',
          question: 'An equation is a mathematical statement that shows two algebraic expressions.',
          hint: 'Review c6_math_ch05_053 to practice identifying terms and expressions before moving.',
          misconception: 'Students often confuse an algebraic expression with an equation.',
          parts: [
                { id: 'a', prompt: 'Analyze the two statements: Statement 1: $4x + 7$ and Statement 2: $4x + 7 = 23$.', answer: 'Statement 1 is an expression',
                  options: ['Statement 1 is an expression', 'solved'],
                  hint: 'Review c6_math_ch05_053 to practice identifying terms and expressions before moving to equality.',
                  misconception: 'Students often confuse an algebraic expression with an equation.' }
          ],
            remediations: { 'students-often-confuse-an-algebraic': { steps: ['Remind the student to look closely for the equals sign ($=$).', 'Cover up the right side of an equation and show that it consists of two distinct mathematical expressions separated.', 'Emphasize: "Expressions are phrases we simplify; equations are complete sentences with an equals sign that we solve."'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_002', difficulty: 'standard',
          question: 'Finding the unknown by balancing both sides is the process of maintaining.',
          hint: 'Review the balance model concept from c6_math_ch05_059 and practice single-step addition.',
          misconception: 'Students often perform an operation on only one side of the equation (e.g., adding 5 to the LHS to cancel out $-5$, but.',
          parts: [
                { id: 'a', prompt: 'If an equation is balanced as $x + 5 = 12$, what operation must be performed on both sides to isolate $x$?', answer: 'Subtract 5 from both sides',
                  options: ['Subtract 5 from both sides', 'add 5 to both sides'],
                  hint: 'Review the balance model concept from c6_math_ch05_059 and practice single-step addition and.',
                  misconception: 'Students often perform an operation on only one side of the equation (e.g., adding 5 to the LHS to cancel out $-5$, but forgetting to add 5.' }
          ],
            remediations: { 'students-often-perform-an-operation': { steps: ['Remind the student to visualize a physical weighing scale with two identical pans.', 'Say: "Whatever weight you remove or add from the left pan, you must do the exact same to the right pan.', 'Look at how the number is attached to the letter: if it is added, subtract it from *both* sides; if it is multiplied.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_003', difficulty: 'standard',
          question: 'Solving a linear equation using the systematic method involves applying inverse.',
          hint: 'Review c7_math_ch15_002 to practice the balance model of equations visually.',
          misconception: 'Students frequently apply an inverse operation to only one side of the equation, or they perform the correct operation.',
          parts: [
                { id: 'a', prompt: 'What is the primary goal when using the systematic method to solve a linear equation like $3x - 5 = 10$?', answer: 'The goal is to isolate the variable ($x$) on one side of the equation',
                  options: ['The goal is to isolate the variable ($x$) on one side of the equation', 'to clear the numbers'],
                  hint: 'Review c7_math_ch15_002 to practice the balance model of equations visually.',
                  misconception: 'Students frequently apply an inverse operation to only one side of the equation, or they perform the correct operation on both sides but.' }
          ],
            remediations: { 'students-frequently-apply-an-inverse': { steps: ['Remind the student that an equation is like a balanced weighing scale: whatever is done to the left side must be done.', 'Write out the operation explicitly under both sides using different colored ink (e.g., write "+ 8" under both left and.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_004', difficulty: 'standard',
          question: 'Solving linear equations using inverse operations involves applying opposite.',
          hint: 'Review c7_math_ch15_002 to practice the balance model before moving to algorithmic.',
          misconception: 'Students often apply the wrong inverse operation or forget to change the sign when moving terms.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Solving linear equations using inverse operations involves applying opposite arithmetic',
                  options: ['Solving linear equations using inverse operations involves applying opposite arithmetic', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review c7_math_ch15_002 to practice the balance model before moving to algorithmic inverse.',
                  misconception: 'Students often apply the wrong inverse operation or forget to change the sign when moving terms.' }
          ],
            remediations: { 'students-often-apply-the-wrong': { steps: ['Guide the student by asking: "What operation was originally done to the variable in this equation?" Have them write.', 'Then ask: "What is the exact opposite (inverse) of that operation?" (e.g., "Subtracted 6").', 'Remind them to apply that inverse operation to both sides simultaneously to keep the equation balanced.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_005', difficulty: 'standard',
          question: 'Equations with variables on both sides are algebraic equations that contain the.',
          hint: 'Review c7_math_ch15_004 on inverse operations and c6_math_ch02_019 on integer addition.',
          misconception: 'Students frequently make a sign error when transposing a term across the equals sign or when moving a variable term.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Equations with variables on both sides are algebraic equations that contain the same',
                  options: ['Equations with variables on both sides are algebraic equations that contain the same', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review c7_math_ch15_004 on inverse operations and c6_math_ch02_019 on integer addition and.',
                  misconception: 'Students frequently make a sign error when transposing a term across the equals sign or when moving a variable term with a negative.' }
          ],
            remediations: { 'students-frequently-make-a-sign': { steps: ['If a student struggles with variables on both sides, pause and use the physical balance scale model.', 'Write the equation and physically draw a dividing line at the equals sign.', 'Instruct the student to write down every single operation explicitly (e.g., write "+ 2x" or "- 5" under both sides.', 'Emphasize the golden rule of algebra: "Whatever you do to one side of the balance to get rid of a term, you must do the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c7_math_ch15_006', difficulty: 'standard',
          question: 'This node focuses on identifying, analyzing, and correcting the most common.',
          hint: 'Review integer multiplication rules and the balance model of equations.',
          misconception: 'Students frequently commit sign-change errors when moving variables or constants across the equals sign, or they fail.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'This node focuses on identifying, analyzing, and correcting the most common algebraic',
                  options: ['This node focuses on identifying, analyzing, and correcting the most common algebraic', 'An equation is a mathematical statement that shows two algebraic expressions are equal,', 'Finding the unknown by balancing both sides is the process of maintaining equality in an', 'Solving a linear equation using the systematic method involves applying inverse'],
                  hint: 'Review integer multiplication rules and the balance model of equations.',
                  misconception: 'Students frequently commit sign-change errors when moving variables or constants across the equals sign, or they fail to distribute.' }
          ],
            remediations: { 'students-frequently-commit-sign-change': { steps: ['When a student makes a sign or distribution error, have them circle every bracket and negative sign with a red pen.', 'Remind them: \'Whenever you cross the bridge of the equals sign, your sign must change from positive to negative, and.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
