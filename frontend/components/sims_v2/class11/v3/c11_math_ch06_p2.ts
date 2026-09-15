import type { SimDef } from '../../engine/types';

/** v3 generated — c11_math_ch06_p2 (2 nodes). Deterministic build
 * from enhanced_nodes/md_cache; regenerate via tools/build_simdefs.mjs. */
export const c11_math_ch06_p2: SimDef = {
    id: 'v3_c11_math_ch06_p2',
    title: 'Linear Inequalities · Part 2/2',
    subtitle: 'Catch the flip that turns a whole solution set inside out.',
    classLevel: 11, subject: 'mathematics', topic: 'Linear Inequalities · Part 2/2',
    chapters: ['c11_math_ch06'],
    nodeIds: ['c11_math_cbse_06_007', 'c11_math_cbse_06_008'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },

    scenario: { role: 'a budgeter turning constraints into intervals', intro: '₹500, notebooks at ₹45, keep ₹50 for the bus — the answer isn\'t a number, it\'s a range, and one wrong sign erases it.', goal: 'Solve linear inequalities with correct sign reversal and represent solutions on the number line.' },
    discovery: {
        question: 'Solving −4x + 12 ≤ 20: −4x ≤ 8, so x ≤ −2. Sound?',
        options: ['No — dividing by −4 reverses the sign: x ≥ −2, the opposite ray entirely', 'Yes — the algebra is identical to equations', 'Yes — the solution is (−∞, −2]', 'No — the answer should be x ≤ 2'],
        answer: 'No — dividing by −4 reverses the sign: x ≥ −2, the opposite ray entirely',
        hook: '2 < 5 but −2 > −5 — multiplying by a negative mirrors the number line, so the inequality must turn around with it.',
    },
    teaching: [
        { title: 'Word Problems: Applications of Linear Inequalities', text: 'Word problems involving linear inequalities require translating real-life constraints into one or more linear inequalities in one or two variables, solving them algebraically or graphically, and.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'mission', nodeId: 'c11_math_cbse_06_007', title: 'Your mission',
          mission: { widget: 'balance', validate: 'balance:left=5,right=5',
            instruction: 'On the lab: balance both sides at 5 — is the scale level?.',
        context: 'Solve (2x − 7)/3 ≥ (x + 5)/2 − 1 to x ≥ 23, then draw the solution ray with the right circle — closed for ≤, open for <.',
            observePrompt: 'What did the balance interactive show you?' } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_007', title: 'Word Problems: Applications of Linear Inequalities',
          scaffold: { problem: 'A company produces two products A and B. Each unit of A requires 2 hours of machine time and 3 hours of labour.',
            steps: [
            { text: 'Define variables. Let x = number of units of product A, y = number of units of product B.' },
            { text: 'Translate machine time constraint: 2x + 3y ≤ 60.' },
            { text: 'Translate labour constraint: 3x + 2y ≤ 60.' },
            { text: 'Non-negativity: x ≥ 0, y ≥ 0.' },
            { text: 'Graph the inequalities. Find intercepts: For 2x+3y=60, x-intercept (30,0), y-intercept (0,20).' },
            { text: 'Identify corner points of feasible region: (0,0), (20,0), (0,20), and intersection of 2x+3y=60 and 3x+2y=60.' },
            { text: 'Since profit P = 50x + 40y, evaluate at corner points: (0,0):0, (20,0):1000, (0,20):800, (12,12):1080.', faded: true, blankAnswer: 'Constraints: 2x+3y ≤ 60, 3x+2y ≤ 60, x ≥ 0, y ≥ 0. Feasible.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_008', title: 'Quadratic Inequalities: Solution Methods',
          scaffold: { problem: 'A rectangular garden has length \\( (x+4) \\) metres and width \\( (x-2) \\) metres. The area must be at least 24 square metres.',
            steps: [
            { text: 'Write the inequality for area: \\((x+4)(x-2) \\geq 24\\).' },
            { text: 'Expand and bring all terms to one side: \\(x^2 + 2x - 8 - 24 \\geq 0 \\Rightarrow x^2 + 2x - 32 \\geq 0\\).' },
            { text: 'Find roots using quadratic formula: \\(x = \\frac{-2 \\pm \\sqrt{4 + 128}}{2} = \\frac{-2 \\pm \\sqrt{132}}{2} = -1 \\pm.' },
            { text: 'Since \\(a=1>0\\), the quadratic is \\(\\geq 0\\) outside the roots: \\(x \\leq -1-\\sqrt{33}\\) or \\(x \\geq -1+\\sqrt{33}\\).' },
            { text: 'Apply physical constraints: width \\(x-2 > 0 \\Rightarrow x > 2\\) and length \\(x+4 > 0 \\Rightarrow x > -4\\).', faded: true, blankAnswer: '\\(x \\geq -1 + \\sqrt{33}\\) (i.e., \\(x \\geq 4.744...\\) metres)' }
            ] } },
        { type: 'drill', nodeId: 'c11_math_cbse_06_008', title: 'Rapid check',
          drill: { kind: 'percent', count: 4, level: 5 } },
        { type: 'case', nodeId: 'c11_math_cbse_06_007', title: 'Use it in the wild',
          caseStudy: { intro: 'Budgeting a stationery run — ₹500, notebooks at ₹45, keep ₹50 for the bus — a teammate solves 5 − 2x > 11 as −2x > 6 → x > −3, and reports the solution set as \'{3, 4, 5, …}\' for x > 2.',
            decisions: [{ prompt: 'Which inequality rules did he miss?', options: [
                { text: 'Catch the transposition trap: after moving terms, −2x means (−2)·x — dividing by the NEGATIVE coefficient must flip the sign: −2x > 6 → x < −3 (check: 2 < 5 but −2 > −5). And unless integers are specified, solutions are real intervals — x > 2 is (2, ∞) with an open circle, not a list of integers.', outcome: 'He learns the flip isn\'t a separate rule to remember but a fact about order: multiplying by a negative reverses the number line.' },
                { text: 'Accept x > −3 — he did flip earlier problems; this one\'s just consistent.', outcome: 'The flip follows the sign of the multiplier, not the step order: −2x is already negative-coefficient after transposition — that\'s the trap.', reveals: 'flip-only-when-obvious' },
                { text: 'Keep the integer list — solutions to inequalities are the counting numbers that work.', outcome: 'Inequalities describe intervals of reals, not discrete lists — between 2 and 3 live infinitely many solutions his answer erases.', reveals: 'inequality-solutions-are-integers' }
            ] }] } },
        { type: 'case', nodeId: 'c11_math_cbse_06_008', title: 'You made it',
          caseStudy: { intro: 'Equations give a point; inequalities give a ray — and the ray points the other way the moment a negative divides.',
            decisions: [{ prompt: 'Ready to see how far you have come?', options: [
                { text: 'Show me my results', outcome: 'Your mastery map is waiting.' },
                { text: 'Replay this part first', outcome: 'Go again — mastery loves a second pass.' }
            ] }] } }
    ],
    explore: { lab: 'balance', prompt: 'Explore the balance interactive — watch what changes!' },
    observe: { prompt: 'What did you notice when you changed the controls?', options: ['It changed the outcome', 'Nothing happened'], answer: 'It changed the outcome' },
    predict: { question: 'Before you play — what do you think will happen?', options: ['The result will change', 'Nothing will change'], answer: 'The result will change', verifyWidget: 'balance', verifyPrompt: 'Try it — were you right?' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_06_007', difficulty: 'standard',
          question: 'Word problems involving linear inequalities require translating real-life.',
          hint: 'Review the graphical method for solving systems of linear inequalities in two variables.',
          misconception: 'Students often write the inequality for "at least" as < instead of ≥, and for "at most" as > instead of ≤.',
          parts: [
                { id: 'a', prompt: 'A student writes the inequality for "The sum of two numbers is at most 50" as x + y < 50. Is this correct? Explain why or why not.', answer: 'No, it is not correct',
                  options: ['No, it is not correct', 'at most', 'less than'],
                  hint: 'Review the graphical method for solving systems of linear inequalities in two variables (node.',
                  misconception: 'Students often write the inequality for "at least" as < instead of ≥, and for "at most" as > instead of ≤.' },
                { id: 'b', prompt: 'Ravi has ₹200 to spend on pens (₹15 each) and pencils (₹5 each). He wants at least 4 pens and at least 6 pencils.', answer: 'Let x = number of pens, y = number of pencils',
                  options: ['Let x = number of pens, y = number of pencils', 'has ₹200 to spend'],
                  hint: 'Review the graphical method for solving systems of linear inequalities in two variables (node.',
                  misconception: 'Students often write the inequality for "at least" as < instead of ≥, and for "at most" as > instead of ≤.' }
          ],
            remediations: { 'students-often-write-the-inequality': { steps: ['If a student makes the "at least/at most" symbol error, have them create a table: Phrase → Symbol (at least → ≥,.', 'Practice with simple numeric examples: "My age is at least 18" → age ≥ 18.', 'For cost direction, use a concrete scenario: "You have ₹100.', 'Write inequality for number of chocolates x." Guide them to see that total cost 10x cannot exceed 100, so 10x ≤ 100.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_008', difficulty: 'standard',
          question: 'A quadratic inequality in one variable is an inequality of the form \\(ax^2 +.',
          hint: 'If stuck, revisit Class 10 Quadratic Equations: factorisation (splitting middle term).',
          misconception: 'Students often forget to reverse the inequality sign when multiplying or dividing by a negative number during the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A quadratic inequality in one variable is an inequality of the form \\(ax^2 + bx + c >',
                  options: ['A quadratic inequality in one variable is an inequality of the form \\(ax^2 + bx + c >', 'A linear inequality is a mathematical statement that compares two algebraic expressions', 'The rules for solving linear inequalities are algebraic properties that preserve the', 'A linear inequality in one variable is an inequality that can be written in the form ax +'],
                  hint: 'If stuck, revisit Class 10 Quadratic Equations: factorisation (splitting middle term), quadratic.',
                  misconception: 'Students often forget to reverse the inequality sign when multiplying or dividing by a negative number during the process of making the.' }
          ],
            remediations: { 'students-often-forget-to-reverse': { steps: ['If a student makes the sign-reversal error, have them first solve the inequality without multiplying by \\(-1\\): find.', 'Then compare with the result after correctly multiplying by \\(-1\\).', 'Emphasize the rule: "Multiply/Divide by negative → flip the inequality sign." Practice with 3-4 examples where the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_008', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often forget to reverse the inequality sign when multiplying or dividing by a negative number during the.',
          parts: [
                { id: 'a', prompt: 'A student solves \\(-x^2 + 2x + 3 \\geq 0\\) by multiplying both sides by \\(-1\\) to get \\(x^2 - 2x - 3 \\leq 0\\), then factors as \\((x-3)(x+1) \\leq 0\\) and writes.', answer: 'Yes, it is correct',
                  options: ['Yes, it is correct', 'the sign should not flip'],
                  hint: 'If stuck, revisit Class 10 Quadratic Equations: factorisation (splitting middle term), quadratic.',
                  misconception: 'Students often forget to reverse the inequality sign when multiplying or dividing by a negative number during the process of making the.' }
          ],
            remediations: { 'students-often-forget-to-reverse': { steps: ['If a student makes the sign-reversal error, have them first solve the inequality without multiplying by \\(-1\\): find.', 'Then compare with the result after correctly multiplying by \\(-1\\).', 'Emphasize the rule: "Multiply/Divide by negative → flip the inequality sign." Practice with 3-4 examples where the.'], labTask: { instruction: 'On the interactive: balance both sides at 5 — is the scale level? — then check.', widget: 'balance', validate: 'balance:left=5,right=5' } } } }
    ],
    reflect: { prompts: ['Which idea was hardest?', 'Explain one idea to a friend.'] },
    successLine: 'Chapter mastered! 🌟', tryAgainLine: 'Revisit the idea, then retry.',
};
