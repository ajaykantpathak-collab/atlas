import type { SimDef } from '../../engine/types';

/** v3 generated — c9_math_ch02_p2 (4 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c9_math_ch02_p2: SimDef = {
    id: 'v3_c9_math_ch02_p2',
    title: 'Linear Equations and Linear Patterns · Part 2/2',
    subtitle: 'The ₹15-per-km shape of equations',
    classLevel: 9, subject: 'mathematics', topic: 'Linear Equations and Linear Patterns · Part 2/2',
    chapters: ['c9_math_ch02'],
    nodeIds: ['c9_math_ch2_6', 'c9_math_ch2_7', 'c9_math_ch2_8', 'c9_math_ch2_9'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a rate-and-fee modeller', intro: 'Taxi fares, delivery fees, weekly wages — tons of real bills have the same skeleton: rate × amount + fixed charge. Learn to recognise it as ax + b, and to catch the imposters.', goal: 'Identify linear polynomials in one variable — form ax + b with a ≠ 0 — and distinguish them from expressions with x², 1/x, √x or a vanishing x-term.' },
    discovery: {
        question: 'A taxi charges ₹15 per km plus a flat ₹50 booking fee — so the bill is 15x + 50. Now: is 0x + 4 also a linear polynomial?',
        options: ['No — the x-coefficient must be non-zero; 0x + 4 collapses to a plain constant, no variable left', 'Yes — it has an x written in it', 'Yes — anything with two terms counts', 'No — because 4 isn\'t a coefficient'],
        answer: 'No — the x-coefficient must be non-zero; 0x + 4 collapses to a plain constant, no variable left',
        hook: 'Spotting an \'x\' isn\'t enough. In 1/x + 2, √x + 5 or x² + 3x the variable hides in a denominator, a root or a second power — none are linear. Only the honest form ax + b, a ≠ 0, qualifies.',
    },
    teaching: [
        { title: 'Slope-Intercept Form of a Linear Equation', text: 'The slope-intercept form of a linear equation in two variables is expressed as **y = mx + c**, where **m** represents the slope (rate of change) of the line and **c** represents the y-intercept (the.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c9_math_ch2_6', title: 'Your mission',
          mission: { widget: 'graph', validate: 'graph:slope=75',
            instruction: 'On the lab: steepen the slope — what does m control?.',
        context: 'Run the three-condition checklist — one variable, power exactly 1, coefficient not zero — over a lineup of expressions, then model real life: write 25x + 10 for notebooks-plus-delivery and explain what each number means.',
            observePrompt: 'What did the graph interactive show you?' } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_6', title: 'Slope-Intercept Form of a Linear Equation',
          scaffold: { problem: 'A Delhi Metro ride costs ₹10 as a base fare plus ₹5 per kilometre travelled.',
            steps: [
            { text: 'Identify the fixed (initial) cost and the variable rate. Base fare = ₹10 (charged even for 0 km). Rate = ₹5 per km.' },
            { text: 'Write the equation: Total fare y = (rate × distance) + base fare = 5x + 10.' },
            { text: 'Recognize this is already in slope-intercept form y = mx + c. Slope m = 5, y-intercept c = 10.' },
            { text: 'Interpret: Slope 5 means fare increases by ₹5 for each additional km. Intercept 10 means minimum fare (at x = 0) is ₹10.' },
            { text: 'Calculate fare for x = 12 km: y = 5(12) + 10 = 60 + 10 = ₹70.', faded: true, blankAnswer: 'Equation: y = 5x + 10; Slope = 5 (₹/km), Intercept = 10.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_7', title: 'Visualising Linear Relationships on a Graph',
          scaffold: { problem: 'A mobile recharge plan costs ₹150 per month plus ₹2 per minute of calls.',
            steps: [
            { text: 'Identify the fixed cost (y-intercept) and variable cost per minute (slope). Fixed = ₹150 → c = 150.' },
            { text: 'Find the y-intercept for plotting: set x = 0 → y = 150. Plot point A(0, 150). This is the cost with zero calls.' },
            { text: 'Use slope m = 2 = 2/1 to find a second point. From A(0, 150), move right 1 (run), up 2 (rise) → B(1, 152).' },
            { text: 'Draw the line through A and C. To find cost for 100 minutes: locate x = 100 on x-axis, go up to line, read y ≈ 350.' },
            { text: 'Verify algebraically. For x = 100: y = 2(100) + 150 = 350 ✓. For y = 400: 400 = 2x + 150 → 2x = 250 → x = 125 ✓.', faded: true, blankAnswer: 'Cost for 100 minutes = ₹350. Minutes for ₹400 budget = 125.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_8', title: 'Solving Linear Equations: Substitution Method',
          scaffold: { problem: 'Ravi buys 4 kg of wheat and 3 kg of rice for ₹210. His sister buys 2 kg of wheat and 5 kg of rice for ₹230.',
            steps: [
            { text: 'Let the price of wheat be ₹x per kg and rice be ₹y per kg. From the problem, write the two equations: 4x + 3y = 210.' },
            { text: 'Choose equation (2) because the coefficient of x is smaller (2). Isolate x: 2x = 230 - 5y → x = (230 - 5y)/2.' },
            { text: 'Substitute this expression for x into equation (1): 4((230 - 5y)/2) + 3y = 210.' },
            { text: 'Expand and solve for y: 460 - 10y + 3y = 210 → 460 - 7y = 210 → -7y = 210 - 460 → -7y = -250 → y = 250/7 = 35.71...' },
            { text: 'From (1), isolate x: 3x = 80 - 2y → x = (80 - 2y)/3.' },
            { text: 'Substitute into (2): 2((80 - 2y)/3) + 3y = 75. Multiply both sides by 3 to clear denominator: 2(80 - 2y) + 9y = 225.' },
            { text: 'Expand: 160 - 4y + 9y = 225 → 160 + 5y = 225 → 5y = 65 → y = 13.' },
            { text: 'Substitute y = 13 into x = (80 - 2y)/3: x = (80 - 26)/3 = 54/3 = 18.' },
            { text: 'Verify: 3(18) + 2(13) = 54 + 26 = 80 ✓; 2(18) + 3(13) = 36 + 39 = 75 ✓.', faded: true, blankAnswer: 'Price of one pen = ₹18, price of one notebook = ₹13.' }
            ] } },
        { type: 'scaffold', nodeId: 'c9_math_ch2_9', title: 'Pair of Linear Equations: Consistent and Inconsistent Systems',
          scaffold: { problem: 'A school canteen sells samosas and sandwiches. On Monday, 5 samosas and 3 sandwiches cost ₹110.',
            steps: [
            { text: 'Let \\(x\\) = cost of one samosa (in ₹), \\(y\\) = cost of one sandwich (in ₹).' },
            { text: 'Convert to standard form: \\(5x + 3y - 110 = 0\\) and \\(10x + 6y - 220 = 0\\).' },
            { text: 'Compute the three ratios: \\(\\frac{a_1}{a_2} = \\frac{5}{10} = \\frac{1}{2}\\); \\(\\frac{b_1}{b_2} = \\frac{3}{6}.' },
            { text: 'Compare ratios: \\(\\frac{1}{2} = \\frac{1}{2} = \\frac{1}{2}\\). All three are equal → the system is consistent and.' },
            { text: 'Since there are infinitely many solutions, we cannot find unique prices.', faded: true, blankAnswer: 'Consistent with infinitely many solutions; unique costs.' }
            ] } },
        { type: 'drill', nodeId: 'c9_math_ch2_9', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 4 } },
        { type: 'case', nodeId: 'c9_math_ch2_6', title: 'Use it in the wild',
          caseStudy: { intro: 'Sorting expressions on a worksheet, Priya circles 1/x + 2, x² + 3x, and 0x + 4 as \'all linear polynomials — I can see an x in each one.\'',
            decisions: [{ prompt: 'Which of her picks actually qualify?', options: [
                { text: 'None of them. A linear polynomial is ax + b with a ≠ 0 and x only to the first power: 1/x puts x in a denominator, x² raises it to power 2, and 0x + 4 collapses to the constant 4. Seeing an x is not the test — the power and the coefficient are.', outcome: 'This applies the real criteria — degree 1 and non-zero coefficient — instead of scanning for the letter x.' },
                { text: 'All three qualify — any expression containing x is a linear polynomial by definition.', outcome: 'That test would make √x and 1/x \'linear\'; the definition restricts x to power 1 with a non-zero coefficient.', reveals: 'x-present-is-linear' },
                { text: 'Only 0x + 4 counts, because it already looks like ax + b written out.', outcome: 'It only looks the part — with a = 0 the variable vanishes and what remains is a constant, not a linear expression.', reveals: 'zero-coefficient-linear' }
            ] }] } },
        { type: 'case', nodeId: 'c9_math_ch2_9', title: 'You made it',
          caseStudy: { intro: 'A linear polynomial is one variable\'s story told at power 1: a changing part (ax) plus a fixed part (b). If the x-term\'s coefficient hits zero, the story loses its variable entirely.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'graph', prompt: 'Explore the graph interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'graph', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c9_math_ch2_6', difficulty: 'standard',
          question: 'The slope-intercept form of a linear equation in two variables is expressed.',
          hint: 'Review **c8_math_ch13_8** (Solving Linear Equations: Transposition Method) and practice.',
          misconception: '**Students incorrectly convert standard form to slope-intercept form by dividing only the x-term by the coefficient.',
          parts: [
                { id: 'a', prompt: 'Two lines are given: **Line A: y = 3x + 2** and **Line B: 6x - 2y = 4**.', answer: 'Convert Line B: 6x - 2y = 4 → -2y = -6x + 4 → y = 3x - 2',
                  options: ['Convert Line B: 6x - 2y = 4 → -2y = -6x + 4 → y = 3x - 2', 'intersecting', 'coincident', 'same slope means same line, ignoring the intercept'],
                  hint: 'Review **c8_math_ch13_8** (Solving Linear Equations: Transposition Method) and practice isolating.',
                  misconception: '**Students incorrectly convert standard form to slope-intercept form by dividing only the x-term by the coefficient of y, leaving the.' }
          ],
            remediations: { 'students-incorrectly-convert-standard-form': { steps: ['If a student makes this error, do **not** just say "divide everything." Instead, use a **step-by-step checklist**.', '**Circle the y-term** (e.g., +2y or -5y).', '**Move all other terms to the other side** (show arrows).', '**Write the division step explicitly**: "Divide **every term** by the coefficient of y." 4.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_7', difficulty: 'standard',
          question: 'Visualising linear relationships on a graph is the process of representing.',
          hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations.',
          misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without.',
          parts: [
                { id: 'a', prompt: 'What are the coordinates of the y-intercept of the line represented by the equation 3x - 2y = 12?', answer: 'The y-intercept is (0, -6)',
                  options: ['The y-intercept is (0, -6)', 'look like lines'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations and.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' },
                { id: 'b', prompt: 'Two lines have equations y = 2x + 3 and y = 2x - 4. Without drawing them, explain how you know these lines will never meet, and describe what you would see.', answer: 'The lines are parallel',
                  options: ['The lines are parallel', 'look like lines'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations and.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' },
                { id: 'c', prompt: 'The graph of 2x + 3y = 6 and 4x + 6y = 12 are drawn on the same axes.', answer: 'They are the SAME line (coincident)',
                  options: ['They are the SAME line (coincident)', 'look like lines'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations and.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' }
          ],
            remediations: { 'students-treat-the-slope-in': { steps: ['Make the student say aloud: "Slope m = rise/run. If m is negative, rise is negative — I go DOWN."', 'Have them rewrite y = -2x + 5 as y = (-2/1)x + 5 and explicitly label rise = -2, run = +1.', 'For intercepts, enforce the chant: "x-intercept → set y=0, answer goes on x-axis (x, 0).', 'Give 3 equations with negative slopes (e.g., y = -x + 4, 2x + y = 6, 3x - 4y = 12) and require them to find both.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_7', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without.',
          parts: [
                { id: 'a', prompt: 'A student plots the line y = -3x + 6 by marking the y-intercept (0, 6) and then using the slope -3 to go "down 3, right 1" to (1, 3).', answer: 'The x-intercept (2, 0) is CORRECT',
                  options: ['The x-intercept (2, 0) is CORRECT', 'look like lines'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations and.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' },
                { id: 'b', prompt: 'Create a real-life situation (Indian context) that can be modelled by a linear equation with a NEGATIVE slope and a POSITIVE y-intercept.', answer: 'Example: A water tank has 500 litres and leaks at 20 litres per hour',
                  options: ['Example: A water tank has 500 litres and leaks at 20 litres per hour', 'look like lines'],
                  hint: 'If stuck, revisit c9_math_ch2_6 (Slope-Intercept Form) to practice converting equations and.',
                  misconception: 'Students treat the slope in y = mx + c as just "the number with x" and mechanically plot "up m, right 1" without considering the sign of m.' }
          ],
            remediations: { 'students-treat-the-slope-in': { steps: ['Make the student say aloud: "Slope m = rise/run. If m is negative, rise is negative — I go DOWN."', 'Have them rewrite y = -2x + 5 as y = (-2/1)x + 5 and explicitly label rise = -2, run = +1.', 'For intercepts, enforce the chant: "x-intercept → set y=0, answer goes on x-axis (x, 0).', 'Give 3 equations with negative slopes (e.g., y = -x + 4, 2x + y = 6, 3x - 4y = 12) and require them to find both.'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_8', difficulty: 'standard',
          question: 'The substitution method is an algebraic technique for solving a pair of linear.',
          hint: 'Revisit c8_math_ch13_9 (Transposition Method) and practice isolating variables.',
          misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they.',
          parts: [
                { id: 'a', prompt: 'A student solves 3x + 2y = 12 and x - 4y = 5 by writing x = 4y + 5 from the second equation and substituting into the first: 3(4y + 5) + 2y = 12.', answer: 'Yes, the substitution step is correct',
                  options: ['Yes, the substitution step is correct', 'you should substitute y instead'],
                  hint: 'Revisit c8_math_ch13_9 (Transposition Method) and practice isolating variables in two-variable.',
                  misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they write x = (12 - 3y)/2.' },
                { id: 'b', prompt: 'Compare the substitution method and the graphical method for solving x + y = 10 and 2x - y = 5.', answer: 'The substitution method is better for fractional solutions',
                  options: ['The substitution method is better for fractional solutions', 'because it\'s easier to see'],
                  hint: 'Revisit c8_math_ch13_9 (Transposition Method) and practice isolating variables in two-variable.',
                  misconception: 'Students often substitute the expression into the SAME equation they derived it from, e.g., from 2x + 3y = 12 they write x = (12 - 3y)/2.' }
          ],
            remediations: { 'students-often-substitute-the-expression': { steps: ['If a student substitutes into the same equation, stop them and ask: "How many equations did we start with?', 'How many have you used so far?" Have them physically label the equations (1) and (2).', 'Then say: "You got x = ...', 'Which equation have you NOT used yet?'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } },
        { type: 'subpart', nodeId: 'c9_math_ch2_9', difficulty: 'standard',
          question: 'A pair of linear equations in two variables is **consistent** if there exists.',
          hint: 'If stuck, revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_6.',
          misconception: 'Students often think that if \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\), the system is automatically inconsistent.',
          parts: [
                { id: 'a', prompt: 'Determine whether the following pair is consistent or inconsistent.', answer: 'Write equations in standard form: \\(5x - 3y - 11 = 0\\) and \\(10x - 6y - 22 = 0\\)',
                  options: ['Write equations in standard form: \\(5x - 3y - 11 = 0\\) and \\(10x - 6y - 22 = 0\\)', 'unique solution', 'inconsistent'],
                  hint: 'If stuck, revisit c9_math_ch2_5 (graph of linear equation) and c9_math_ch2_6 (slope-intercept form).',
                  misconception: 'Students often think that if \\(\\frac{a_1}{a_2} = \\frac{b_1}{b_2}\\), the system is automatically inconsistent.' }
          ],
            remediations: { 'if-frac-a-1-a': { steps: ['If a student makes this error, guide them through a three-step ratio check every time: (1) Write both equations.', '(2) Compute all three ratios \\(\\frac{a_1}{a_2}\\), \\(\\frac{b_1}{b_2}\\), \\(\\frac{c_1}{c_2}\\) separately.', '(3) Compare: if all three equal → infinite solutions; if first two equal but third different → no solution; if first.', 'Practice with paired examples where only the constant term changes (e.g., \\(2x+3y=7\\) vs \\(4x+6y=14\\) and \\(4x+6y=15\\)).'], labTask: { instruction: 'On the interactive: steepen the slope — what does m control? — then check.', widget: 'graph', validate: 'graph:slope=75' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
