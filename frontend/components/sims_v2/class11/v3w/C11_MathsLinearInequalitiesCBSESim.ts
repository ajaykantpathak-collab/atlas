import type { SimDef } from '../../engine/types';
import C11_MathsLinearInequalitiesCBSESim from '../../../simulations/c6_12_new/C11_MathsLinearInequalitiesCBSESim';

/** v3 wrapped master — C11_MathsLinearInequalitiesCBSESim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_mathslinearinequalitiescbsesim: SimDef = {
    id: 'v3w_c11_mathslinearinequalitiescbsesim',
    title: 'Linear Inequalities: Definition and Notation',
    subtitle: 'Covers definition, notation, and basic representation of linear inequalities in one.',
    classLevel: 11, subject: 'mathematics', topic: 'Linear Inequalities: Definition and Notation',
    chapters: [],
    nodeIds: ['c11_math_cbse_06_001', 'c11_math_cbse_06_002', 'c11_math_cbse_06_003', 'c11_math_cbse_06_004', 'c11_math_cbse_06_005', 'c11_math_cbse_06_006', 'c11_math_cbse_06_007', 'c11_math_cbse_02_008', 'c11_math_cbse_02_007', 'c11_math_cbse_02_012', 'c11_math_cbse_06_008', 'c11_math_cbse_02_009', 'c11_math_cbse_09_002', 'c11_math_cbse_09_004', 'c11_math_cbse_09_009'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you have ₹200 to buy notebooks costing ₹30 each and pens costing ₹10 each.', goal: 'Master Linear Inequalities: Definition and Notation.' },
    discovery: {
        question: 'Compare the graphical representations of 2x + 1 < 5 and 2x + 1 ≤ 5. What is the only difference between the two graphs? Why does this difference matter?',
        options: ['Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)', 'no difference', 'different arrow direction'],
        answer: 'Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)',
        hook: 'Students consistently forget to reverse the inequality sign when multiplying or dividing by a negative number during.',
    },
    teaching: [
        { title: 'A linear inequality is a mathematical.', text: 'A linear inequality is a mathematical statement that compares two algebraic expressions using inequality symbols (<, >, ≤, ≥) where the highest power of the variable is 1.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_001', title: 'A linear inequality is a mathematical.',
          scaffold: { problem: 'A school canteen sells samosas at ₹15 each and chai at ₹10 per cup. Ravi has ₹100 and wants at least 2 samosas.',
            steps: [
            { text: 'Identify variables: x = number of samosas, y = number of chai cups. Cost constraint: 15x + 10y ≤ 100.' },
            { text: 'Substitute x = 3 into the cost inequality: 15(3) + 10y ≤ 100 → 45 + 10y ≤ 100.' },
            { text: 'Solve for y: 10y ≤ 55 → y ≤ 5.5.' },
            { text: 'Since y must be a whole number (cups of chai), maximum y = 5.' },
            { text: 'Verify: 3 samosas + 5 chai = 15(3) + 10(5) = 45 + 50 = 95 ≤ 100. 6 chai would cost 105 > 100.', faded: true, blankAnswer: 'Maximum 5 cups of chai when buying 3 samosas.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_002', title: 'The rules for solving linear.',
          scaffold: { problem: 'A small factory produces handmade soaps. The daily cost (in ₹) is C = 2500 + 15x where x is number of soaps. The revenue is R = 40x.',
            steps: [
            { text: 'Write the profit inequality: R - C ≥ 1200 → 40x - (2500 + 15x) ≥ 1200.' },
            { text: 'Simplify left side: 40x - 2500 - 15x ≥ 1200 → 25x - 2500 ≥ 1200.' },
            { text: 'Add 2500 to both sides (addition property, sign unchanged): 25x ≥ 3700.' },
            { text: 'Divide by 25 (positive, sign unchanged): x ≥ 3700/25 → x ≥ 148.' },
            { text: 'Interpret: Since x must be integer (whole soaps), minimum x = 148 soaps.', faded: true, blankAnswer: 'Minimum 148 soaps per day.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_003', title: 'A linear inequality in one variable is.',
          scaffold: { problem: 'A school canteen has ₹2000 to buy pens and notebooks. Each pen costs ₹15 and each notebook costs ₹45.',
            steps: [
            { text: 'Identify variables and constraints. Let x = number of notebooks. Pens ≥ 20, so minimum pen cost = 20 × 15 = ₹300.' },
            { text: 'Form the inequality. Cost of notebooks + minimum cost of pens ≤ total budget: 45x + 300 ≤ 2000.' },
            { text: 'Isolate the variable term. Subtract 300 from both sides: 45x ≤ 1700.' },
            { text: 'Divide by the coefficient of x (positive 45, so inequality sign unchanged): x ≤ 1700/45 = 340/9 ≈ 37.77.' },
            { text: 'Interpret the result. x must be a whole number (can\'t buy fraction of notebook), so maximum x = 37.' },
            { text: 'Verify. 37 notebooks cost 37 × 45 = ₹1665. 20 pens cost ₹300. Total = ₹1965 ≤ ₹2000 ✓.', faded: true, blankAnswer: 'Maximum 37 notebooks.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_004', title: 'The graphical solution of a linear.',
          scaffold: { problem: 'Ravi has ₹200 to buy pens costing ₹15 each. He also wants to buy a notebook for ₹35. What is the maximum number of pens he can buy?',
            steps: [
            { text: 'Form the inequality. Cost of pens + notebook ≤ 200 → 15x + 35 ≤ 200, where x = number of pens (non-negative integer).' },
            { text: 'Solve algebraically. 15x ≤ 165 (subtract 35 from both sides). x ≤ 11 (divide by 15, positive so no sign reversal).' },
            { text: 'Identify boundary point and inequality type. Boundary at x = 11, non-strict inequality (≤) so closed circle.' },
            { text: 'Determine arrow direction. x ≤ 11 means all values less than or equal to 11, so arrow points left (toward smaller.' },
            { text: 'Draw number line. Mark integers 0 to 15. Place closed circle at 11. Draw arrow from 11 pointing left through 10, 9, ...' },
            { text: 'Interpret. Ravi can buy 0, 1, 2, ..., up to 11 pens.', faded: true, blankAnswer: 'x ≤ 11; graph: closed circle at 11, arrow pointing left to.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_005', title: 'A system of linear inequalities in one.',
          scaffold: { problem: 'A factory produces widgets. The daily cost is C(x) = 50x + 2000 rupees for x widgets. The selling price is ₹80 per widget.',
            steps: [
            { text: 'Identify the variable and constraints. Let x = number of widgets produced daily.' },
            { text: 'Write profit inequality. Profit = Revenue - Cost = 80x - (50x + 2000) = 30x - 2000. So 30x - 2000 ≥ 1000.' },
            { text: 'Solve each inequality separately. (1) 30x - 2000 ≥ 1000 → 30x ≥ 3000 → x ≥ 100. (2) x ≤ 200. (3) x ≥ 60.' },
            { text: 'Find intersection of solution sets. x ≥ 100 AND x ≤ 200 AND x ≥ 60. The most restrictive lower bound is x ≥ 100.' },
            { text: 'Verify endpoints. At x=100: profit = 30(100)-2000=1000 ✓. At x=200: profit = 4000 ✓, within capacity.' },
            { text: 'Express answer. Feasible production range: 100 ≤ x ≤ 200 widgets, or [100, 200] in interval notation.', faded: true, blankAnswer: '[100, 200] widgets (100 to 200 inclusive)' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_06_006', title: 'A linear inequality in two variables is.',
          scaffold: { problem: 'A small bakery in Mumbai makes two types of cookies: chocolate chip (₹20 profit per pack) and oatmeal (₹15 profit per pack).',
            steps: [
            { text: 'Define variables. Let x = packs of chocolate chip cookies, y = packs of oatmeal cookies. Both ≥ 0.' },
            { text: 'Write constraints. Flour: 200x + 100y ≤ 5000 → divide by 100: 2x + y ≤ 50.' },
            { text: 'Graph each boundary line. For 2x+y=50: intercepts (0,50) and (25,0). Solid line (≤).' },
            { text: 'Find corner points by solving intersections. (0,0) from axes. (25,0) from 2x+y=50 and y=0. (0,20) from x+2y=40 and x=0.' },
            { text: 'Verify all corners satisfy all constraints. (0,0)✓, (25,0)✓, (0,20)✓, (20,10)✓.', faded: true, blankAnswer: 'Inequalities: 2x + y ≤ 50, x + 2y ≤ 40, x ≥ 0, y ≥ 0..' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_06_002', title: 'Identify each idea',
          dissect: { specimen: 'Linear Inequalities: Definition and Notation', spots: [
            { id: 's1', label: 'A linear inequality is a', prompt: 'Which idea is this? — A linear inequality is a mathematical statement that compares two algebraic expressions.', answer: 'A linear inequality is a', options: ['A linear inequality is a', 'The rules for solving linear', 'A linear inequality in one', 'The graphical solution of a'] },
            { id: 's2', label: 'The rules for solving linear', prompt: 'Which idea is this? — The rules for solving linear inequalities are algebraic properties that preserve the.', answer: 'The rules for solving linear', options: ['The rules for solving linear', 'A linear inequality is a', 'A linear inequality in one', 'The graphical solution of a'] },
            { id: 's3', label: 'A linear inequality in one', prompt: 'Which idea is this? — A linear inequality in one variable is an inequality that can be written in the form ax +.', answer: 'A linear inequality in one', options: ['A linear inequality in one', 'A linear inequality is a', 'The rules for solving linear', 'The graphical solution of a'] },
            { id: 's4', label: 'The graphical solution of a', prompt: 'Which idea is this? — The graphical solution of a linear inequality in one variable represents the solution set.', answer: 'The graphical solution of a', options: ['The graphical solution of a', 'A linear inequality is a', 'The rules for solving linear', 'A linear inequality in one'] },
            { id: 's5', label: 'A system of linear inequalities', prompt: 'Which idea is this? — A system of linear inequalities in one variable consists of two or more linear.', answer: 'A system of linear inequalities', options: ['A system of linear inequalities', 'A linear inequality is a', 'The rules for solving linear', 'A linear inequality in one'] },
            { id: 's6', label: 'A linear inequality in two', prompt: 'Which idea is this? — A linear inequality in two variables is an inequality of the form ax + by < c, ax + by >.', answer: 'A linear inequality in two', options: ['A linear inequality in two', 'A linear inequality is a', 'The rules for solving linear', 'A linear inequality in one'] }
          ] } }
    ],
    explore: { component: C11_MathsLinearInequalitiesCBSESim, prompt: 'Explore the interactive — Linear Inequalities: Definition and Notation' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_06_001', difficulty: 'standard',
          question: 'A linear inequality is a mathematical statement that compares two algebraic.',
          hint: 'Review Class 10 Chapter 3 (Pair of Linear Equations) algebraic methods and Class 6.',
          misconception: 'Students treat inequalities exactly like equations, performing identical algebraic steps without reversing the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear inequality is a mathematical statement that compares two algebraic expressions',
                  options: ['A linear inequality is a mathematical statement that compares two algebraic expressions', 'The rules for solving linear inequalities are algebraic properties that preserve the', 'A linear inequality in one variable is an inequality that can be written in the form ax +', 'The graphical solution of a linear inequality in one variable represents the solution set'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat inequalities exactly like equations, performing identical algebraic steps without reversing the inequality sign when.' }
          ],
            remediations: { 'students-treat-inequalities-exactly-like': { steps: ['Have the student solve 2x < 6 (gives x < 3) and -2x < 6 side by side.', 'Explicitly state the rule: "When multiplying or dividing both sides of an inequality by a negative number, the.', 'Practice 5 problems where the coefficient of x is negative, requiring sign reversal.', 'Use number line testing: pick a value from their solution set and a value outside, substitute into original inequality.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_002', difficulty: 'standard',
          question: 'The rules for solving linear inequalities are algebraic properties that.',
          hint: 'If stuck, review Class 7 integer multiplication sign rules (c7_math_ch10_004,.',
          misconception: 'Students correctly apply sign reversal when dividing by a negative constant (e.g., -3x > 6 → x < -2) but FAIL to.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The rules for solving linear inequalities are algebraic properties that preserve the',
                  options: ['The rules for solving linear inequalities are algebraic properties that preserve the', 'A linear inequality is a mathematical statement that compares two algebraic expressions', 'A linear inequality in one variable is an inequality that can be written in the form ax +', 'The graphical solution of a linear inequality in one variable represents the solution set'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students correctly apply sign reversal when dividing by a negative constant (e.g., -3x > 6 → x < -2) but FAIL to reverse when the negative.' }
          ],
            remediations: { 'students-correctly-apply-sign-reversal': { steps: ['If a student makes this error: (1) Have them rewrite the inequality with explicit parentheses: 5 + (-2)x > 11.', '(2) Ask: "What number multiplies x?" Answer: -2.', '(3) Say: "To isolate x, you must divide by THAT number, -2." (4) Demonstrate on number line: -2x > 6 means the product.', 'Test x = -4: -2(-4)=8 > 6 ✓.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_003', difficulty: 'standard',
          question: 'A linear inequality in one variable is an inequality that can be written in the.',
          hint: 'If stuck, revisit "Rules for Solving Linear Inequalities" (c11_math_cbse_06_002) focusing.',
          misconception: 'Students mechanically apply "reverse the sign when dividing by negative" but fail when the negative coefficient appears.',
          parts: [
                { id: 'a', prompt: 'A student solves 3 - 2x ≥ 7 as follows: -2x ≥ 4, then x ≥ -2. Identify the error and explain why the correct solution is x ≤ -2.', answer: 'The error: the student divided by -2 but did not reverse the inequality sign',
                  options: ['The error: the student divided by -2 but did not reverse the inequality sign', 'reverse sign'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply "reverse the sign when dividing by negative" but fail when the negative coefficient appears after moving terms.' }
          ],
            remediations: { 'students-mechanically-apply-reverse-the': { steps: ['Have student solve 5 - 2x > 3 by FIRST adding 2x to both sides: 5 > 3 + 2x → 2 > 2x → 1 > x → x < 1.', 'Show that dividing by negative is a shortcut that requires sign reversal.', 'Practice 5 problems where student must identify the coefficient of x BEFORE deciding to divide, and say aloud.', 'For compound inequalities, use the "split method": solve -3 < -2x + 1 and -2x + 1 < 5 separately, then combine.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students mechanically apply "reverse the sign when dividing by negative" but fail when the negative coefficient appears.',
          parts: [
                { id: 'a', prompt: 'A student claims that the inequality 5 - 3x ≤ 2 has the same solution as 3x - 5 ≥ -2. Evaluate this claim. Is the student correct?', answer: 'Student is correct',
                  options: ['Student is correct', 'different'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students mechanically apply "reverse the sign when dividing by negative" but fail when the negative coefficient appears after moving terms.' }
          ],
            remediations: { 'students-mechanically-apply-reverse-the': { steps: ['Have student solve 5 - 2x > 3 by FIRST adding 2x to both sides: 5 > 3 + 2x → 2 > 2x → 1 > x → x < 1.', 'Show that dividing by negative is a shortcut that requires sign reversal.', 'Practice 5 problems where student must identify the coefficient of x BEFORE deciding to divide, and say aloud.', 'For compound inequalities, use the "split method": solve -3 < -2x + 1 and -2x + 1 < 5 separately, then combine.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_004', difficulty: 'standard',
          question: 'The graphical solution of a linear inequality in one variable represents the.',
          hint: 'If stuck, revisit c11_math_cbse_06_002 (Rules for Solving Linear Inequalities) and.',
          misconception: 'Students consistently forget to reverse the inequality sign when multiplying or dividing by a negative number during.',
          parts: [
                { id: 'a', prompt: 'Compare the graphical representations of 2x + 1 < 5 and 2x + 1 ≤ 5. What is the only difference between the two graphs? Why does this difference matter?', answer: 'Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)',
                  options: ['Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)', 'no difference', 'different arrow direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to reverse the inequality sign when multiplying or dividing by a negative number during algebraic solution,.' }
          ],
            remediations: { 'students-consistently-forget-to-reverse': { steps: ['Ask the student to solve -2x > 6 aloud while you watch.', 'When they write x > -3, stop and ask: "What happens to the inequality sign when you divide by -2?"', 'If they don\'t recall, demonstrate with numbers: -2(-4) = 8 > 6 is true, but -4 > -3 is false. Show that -4 < -3 is true.', 'Have them re-solve with sign reversal, then graph x < -3 (open circle at -3, arrow left).', 'Give 3 similar practice problems with negative coefficients to reinforce.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently forget to reverse the inequality sign when multiplying or dividing by a negative number during.',
          parts: [
                { id: 'a', prompt: 'Compare the graphical representations of 2x + 1 < 5 and 2x + 1 ≤ 5. What is the only difference between the two graphs? Why does this difference matter?', answer: 'Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)',
                  options: ['Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)', 'no difference', 'different arrow direction'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to reverse the inequality sign when multiplying or dividing by a negative number during algebraic solution,.' }
          ],
            remediations: { 'students-consistently-forget-to-reverse': { steps: ['Ask the student to solve -2x > 6 aloud while you watch.', 'When they write x > -3, stop and ask: "What happens to the inequality sign when you divide by -2?"', 'If they don\'t recall, demonstrate with numbers: -2(-4) = 8 > 6 is true, but -4 > -3 is false. Show that -4 < -3 is true.', 'Have them re-solve with sign reversal, then graph x < -3 (open circle at -3, arrow left).', 'Give 3 similar practice problems with negative coefficients to reinforce.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_005', difficulty: 'standard',
          question: 'A system of linear inequalities in one variable consists of two or more linear.',
          hint: 'If stuck, revisit c11_math_cbse_06_003 (Solving Linear Inequalities in One Variable) and.',
          misconception: 'Students incorrectly apply the "flip the inequality sign" rule when dividing by a negative number in ONE inequality of.',
          parts: [
                { id: 'a', prompt: 'Explain why the system 3x + 2 < 11 AND 5x - 7 > 18 has no solution, and describe what the number line graph would look like.', answer: 'Correct explanation: 3x + 2 < 11 → 3x < 9 → x < 3',
                  options: ['Correct explanation: 3x + 2 < 11 → 3x < 9 → x < 3', ') reveals the student treats the system as'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the "flip the inequality sign" rule when dividing by a negative number in ONE inequality of the system but.' },
                { id: 'b', prompt: 'Solve the system and graph the solution on a number line: (x - 2)/3 ≥ 1 AND 2x + 5 < 15.', answer: 'Step 1: (x - 2)/3 ≥ 1 → multiply by 3: x - 2 ≥ 3 → x ≥ 5',
                  options: ['Step 1: (x - 2)/3 ≥ 1 → multiply by 3: x - 2 ≥ 3 → x ≥ 5', 'x = 5 satisfies the second inequality (it doesn\'t'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly apply the "flip the inequality sign" rule when dividing by a negative number in ONE inequality of the system but.' }
          ],
            remediations: { 'students-incorrectly-apply-the-flip': { steps: ['Isolate the variable in each inequality ONE AT A TIME, circling any division by negative numbers.', 'For each circled step, explicitly write "FLIP SIGN" next to it.', 'Write the simplified inequality with correct direction.', 'Draw a number line for each inequality separately.', 'Overlay them to find the intersection visually before writing interval notation.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_06_006', difficulty: 'standard',
          question: 'A linear inequality in two variables is an inequality of the form ax + by < c,.',
          hint: 'If stuck, revisit Class 9 Chapter 2 (Linear Polynomials) nodes c9_math_ch2_5 and.',
          misconception: 'Students incorrectly believe that the inequality symbol (≤ or ≥) directly indicates "shade below" or "shade above" the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A linear inequality in two variables is an inequality of the form ax + by < c, ax + by >',
                  options: ['A linear inequality in two variables is an inequality of the form ax + by < c, ax + by >', 'A linear inequality is a mathematical statement that compares two algebraic expressions', 'The rules for solving linear inequalities are algebraic properties that preserve the', 'A linear inequality in one variable is an inequality that can be written in the form ax +'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly believe that the inequality symbol (≤ or ≥) directly indicates "shade below" or "shade above" the line.' }
          ],
            remediations: { 'students-incorrectly-believe-that-the': { steps: ['If a student makes this error, immediately have them test the origin (0,0) in the ORIGINAL inequality before any.', 'For -2x + 3y ≥ 6: 0 ≥ 6 is false, so origin is NOT in solution region.', 'Then ask: "Does your shaded region contain the origin?" If their shaded region contains the origin, it\'s wrong.', 'Force them to use the test-point method EVERY time, regardless of the inequality form.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
