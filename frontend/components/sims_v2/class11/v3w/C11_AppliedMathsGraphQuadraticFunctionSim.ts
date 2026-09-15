import type { SimDef } from '../../engine/types';
import C11_AppliedMathsGraphQuadraticFunctionSim from '../../../simulations/c6_12/C11_AppliedMathsGraphQuadraticFunctionSim';

/** v3 wrapped master — C11_AppliedMathsGraphQuadraticFunctionSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c11_appliedmathsgraphquadraticfunctionsim: SimDef = {
    id: 'v3w_c11_appliedmathsgraphquadraticfunctionsim',
    title: 'Applied Maths Graph Quadratic Function',
    subtitle: 'This node covers linear and quadratic polynomial functions as real-valued functions with.',
    classLevel: 11, subject: 'science', topic: 'Polynomial Functions: Linear and Quadratic',
    chapters: [],
    nodeIds: ['c11_math_cbse_02_007', 'c11_math_cbse_02_008', 'c11_math_cbse_06_004', 'c11_math_cbse_06_005', 'c11_math_cbse_03_004', 'c11_math_cbse_03_006', 'c11_math_cbse_03_014', 'c11_math_cbse_06_006', 'c11_math_cbse_02_004', 'c11_math_cbse_02_005', 'c11_math_cbse_02_006', 'c11_math_cbse_02_009', 'c11_math_cbse_02_011', 'c11_math_cbse_02_012', 'c11_math_cbse_06_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 11 learner', intro: 'Imagine you are tracking the height of a ball thrown upward from a building in Mumbai.', goal: 'Master Applied Maths Graph Quadratic Function.' },
    discovery: {
        question: 'Compare the graphical representations of 2x + 1 < 5 and 2x + 1 ≤ 5. What is the only difference between the two graphs? Why does this difference matter?',
        options: ['Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)', 'no difference', 'different arrow direction'],
        answer: 'Both have boundary at x = 2 (solving gives x < 2 and x ≤ 2)',
        hook: 'Students consistently forget to reverse the inequality sign when multiplying or dividing by a negative number during.',
    },
    teaching: [
        { title: 'A polynomial function is a real-valued.', text: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\) defined by \\( f(x) = a_0 + a_1x + a_2x^2 + \\dots + a_nx^n \\) for all \\( x \\in \\mathbb{R} \\), where \\( n \\) is a.', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_007', title: 'A polynomial function is a real-valued.',
          scaffold: { problem: 'A ball is thrown upward from a 20 m high building in Delhi with initial velocity 15 m/s.',
            steps: [
            { text: 'Identify the quadratic function: \\( h(t) = -5t^2 + 15t + 20 \\). Coefficients: \\( a = -5 \\), \\( b = 15 \\), \\( c = 20 \\).' },
            { text: 'Convert to vertex form by completing the square: \\( h(t) = -5(t^2 - 3t) + 20 = -5[(t - 1.5)^2 - 2.25] + 20 = -5(t -.' },
            { text: 'Maximum height = 31.25 m at \\( t = 1.5 \\) s. (Vertex \\( k \\)-value gives max since \\( a < 0 \\)).' },
            { text: 'Ball hits ground when \\( h(t) = 0 \\): \\( -5t^2 + 15t + 20 = 0 \\) → divide by -5: \\( t^2 - 3t - 4 = 0 \\) → \\( (t-4)(t+1).' },
            { text: 'Contextual domain: \\( 0 \\leq t \\leq 4 \\). Range: \\( 0 \\leq h \\leq 31.25 \\).', faded: true, blankAnswer: '(a) \\( h(t) = -5(t - 1.5)^2 + 31.25 \\) (b) Max height 31.25.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_02_008', title: 'A **rational function** is a.',
          scaffold: { problem: 'A company\'s average cost per unit (in rupees) for producing x items is given by \\( AC(x) = \\frac{5000 + 20x + 0.5x^2}{x} \\) for \\( x > 0.',
            steps: [
            { text: 'Identify the domain. The denominator is x. Since x > 0 (production quantity), and x ≠ 0, domain is (0, ∞).' },
            { text: 'Simplify the rational function by dividing each term in numerator by x: \\( AC(x) = \\frac{5000}{x} + 20 + 0.5x \\).' },
            { text: 'To find minimum, recognise this as sum of a term and its reciprocal form. Let \\( f(x) = 0.5x + \\frac{5000}{x} \\).' },
            { text: 'Use AM-GM inequality: For positive a, b, \\( a + b \\geq 2\\sqrt{ab} \\). Here \\( a = 0.5x \\), \\( b = \\frac{5000}{x} \\).' },
            { text: 'Equality when \\( 0.5x = \\frac{5000}{x} \\Rightarrow 0.5x^2 = 5000 \\Rightarrow x^2 = 10000 \\Rightarrow x = 100 \\) (since.' },
            { text: 'Minimum average cost = 100 + 20 = ₹120 per unit at production level x = 100 units.', faded: true, blankAnswer: 'Domain: (0, ∞); Simplified: \\( AC(x) = 0.5x + 20 +.' }
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
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_004', title: 'Trigonometric functions of an acute.',
          scaffold: { problem: 'A surveyor stands 20 metres from the base of a tower. The angle of elevation to the top of the tower is 30°. Find the height of the tower.',
            steps: [
            { text: 'Identify the right triangle. The tower is vertical (opposite side), the ground distance is adjacent side (20 m), angle.' },
            { text: 'Choose the trigonometric ratio that relates opposite and adjacent: tan 30° = opposite/adjacent.' },
            { text: 'Substitute known values: tan 30° = 1/√3. So 1/√3 = height / 20.' },
            { text: 'Solve for height: height = 20/√3. Rationalize: height = (20√3)/3 metres.' },
            { text: 'Verify: tan 30° ≈ 0.577, height ≈ 11.55 m. The exact value (20√3)/3 ≈ 11.55 m. Answer is positive and reasonable.', faded: true, blankAnswer: 'Height = (20√3)/3 metres.' }
            ] } },
        { type: 'scaffold', nodeId: 'c11_math_cbse_03_006', title: 'The sign of a trigonometric function in.',
          scaffold: { problem: 'A wind turbine blade makes an angle of 210° with the positive x-axis (measured anticlockwise).',
            steps: [
            { text: 'Identify the quadrant: 210° lies between 180° and 270°, so it is in the third quadrant (QIII).' },
            { text: 'Recall the sign of coordinates in QIII: x < 0, y < 0.' },
            { text: 'Apply unit circle definitions: cos θ = x (horizontal), sin θ = y (vertical). Therefore cos θ < 0, sin θ < 0.' },
            { text: 'Compute the ratio: tan θ = sin θ / cos θ = (negative) / (negative) = positive.' },
            { text: 'Verify with exact values: sin 210° = -1/2, cos 210° = -√3/2, tan 210° = 1/√3. Signs match.', faded: true, blankAnswer: 'Vertical component (sin) is negative, horizontal component.' }
            ] } },
        { type: 'dissect', nodeId: 'c11_math_cbse_02_008', title: 'Identify each idea',
          dissect: { specimen: 'Applied Maths Graph Quadratic Function', spots: [
            { id: 's1', label: 'A polynomial function is a', prompt: 'Which idea is this? — A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\).', answer: 'A polynomial function is a', options: ['A polynomial function is a', 'A rational function is a', 'The graphical solution of a', 'A system of linear inequalities'] },
            { id: 's2', label: 'A rational function is a', prompt: 'Which idea is this? — A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}.', answer: 'A rational function is a', options: ['A rational function is a', 'A polynomial function is a', 'The graphical solution of a', 'A system of linear inequalities'] },
            { id: 's3', label: 'The graphical solution of a', prompt: 'Which idea is this? — The graphical solution of a linear inequality in one variable represents the solution set.', answer: 'The graphical solution of a', options: ['The graphical solution of a', 'A polynomial function is a', 'A rational function is a', 'A system of linear inequalities'] },
            { id: 's4', label: 'A system of linear inequalities', prompt: 'Which idea is this? — A system of linear inequalities in one variable consists of two or more linear.', answer: 'A system of linear inequalities', options: ['A system of linear inequalities', 'A polynomial function is a', 'A rational function is a', 'The graphical solution of a'] },
            { id: 's5', label: 'Trigonometric functions of an acute', prompt: 'Which idea is this? — Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of.', answer: 'Trigonometric functions of an acute', options: ['Trigonometric functions of an acute', 'A polynomial function is a', 'A rational function is a', 'The graphical solution of a'] },
            { id: 's6', label: 'The sign of a trigonometric', prompt: 'Which idea is this? — The sign of a trigonometric function in a given quadrant is determined by the signs of.', answer: 'The sign of a trigonometric', options: ['The sign of a trigonometric', 'A polynomial function is a', 'A rational function is a', 'The graphical solution of a'] }
          ] } }
    ],
    explore: { component: C11_AppliedMathsGraphQuadraticFunctionSim, prompt: 'Explore the interactive — Applied Maths Graph Quadratic Function' },
    challenges: [
        { type: 'subpart', nodeId: 'c11_math_cbse_02_007', difficulty: 'standard',
          question: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R}.',
          hint: 'If stuck, revisit Class 10 Chapter 2 (Polynomials) for zeros and factorisation, and Class.',
          misconception: 'Students treat the expression \\( f(x) = ax^2 + bx + c \\) and the function \\( f \\) as interchangeable without.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)',
                  options: ['A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)', 'A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}', 'The graphical solution of a linear inequality in one variable represents the solution set', 'A system of linear inequalities in one variable consists of two or more linear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students treat the expression \\( f(x) = ax^2 + bx + c \\) and the function \\( f \\) as interchangeable without considering domain.' }
          ],
            remediations: { 'students-treat-the-expression-f': { steps: ['If a student simplifies \\( \\frac{x^2-1}{x-1} \\) to \\( x+1 \\) and says domain is \\( \\mathbb{R} \\), stop them.', 'Ask: "What is \\( g(1) \\)?" They\'ll say 0.', 'Then ask: "Can we divide by \\( g(1) \\)?" No.', 'So \\( x=1 \\) is not in the domain of \\( f/g \\).'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_02_008', difficulty: 'standard',
          question: 'A **rational function** is a real-valued function of the form \\( f(x) =.',
          hint: 'If stuck, revisit c9_math_ch4_8 (Factorisation of Quadratic Expressions) and.',
          misconception: 'Students incorrectly simplify rational functions by cancelling common factors and then state the domain of the.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}',
                  options: ['A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}', 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)', 'The graphical solution of a linear inequality in one variable represents the solution set', 'A system of linear inequalities in one variable consists of two or more linear'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students incorrectly simplify rational functions by cancelling common factors and then state the domain of the simplified form.' }
          ],
            remediations: { 'students-incorrectly-simplify-rational-functions': { steps: ['Have them factor numerator and denominator completely.', 'Identify values making denominator zero — these are domain exclusions.', 'Cancel common factors algebraically but write the restriction \\( x \\neq a \\) alongside the simplified form.', 'For graphing, plot the simplified function but mark an open circle at the excluded x-value with its y-coordinate from.', 'Practice with \\( \\frac{x^2-1}{x-1} \\), \\( \\frac{x^2-9}{x+3} \\), \\( \\frac{x^3-8}{x-2} \\) to reinforce that domain comes.'] } } },
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
        { type: 'subpart', nodeId: 'c11_math_cbse_03_004', difficulty: 'standard',
          question: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the.',
          hint: 'If stuck, revisit Class 10 trigonometric ratios (c10_math_cbse_08_001 to.',
          misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of',
                  options: ['Trigonometric functions of an acute angle θ (0 < θ < π/2) are defined as the ratios of', 'A polynomial function is a real-valued function \\( f: \\mathbb{R} \\to \\mathbb{R} \\)', 'A **rational function** is a real-valued function of the form \\( f(x) = \\frac{p(x)}{q(x)}', 'The graphical solution of a linear inequality in one variable represents the solution set'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often confuse the exact values of sin and cos for 30° and 60°, e.g., writing sin 30° = √3/2 and cos 30° = 1/2.' }
          ],
            remediations: { 'students-often-confuse-the-exact': { steps: ['If a student confuses sin 30° and cos 30°, have them draw a 30-60-90 triangle with sides 1, √3, 2.', 'The side opposite 30° is 1, so sin 30° = 1/2.', 'The side opposite 60° is √3, so sin 60° = √3/2.', 'For the sign error, remind them that in the first quadrant, all trigonometric functions are positive.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_006', difficulty: 'standard',
          question: 'The sign of a trigonometric function in a given quadrant is determined by the.',
          hint: 'If stuck, revisit the unit circle definitions of sin, cos, tan (c11_math_cbse_03_003) and.',
          misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order**.',
          parts: [
                { id: 'a', prompt: 'State the sign of each of the six trigonometric functions for an angle θ = 300°.', answer: 'θ = 300° lies in the fourth quadrant (270° < 300° < 360°)',
                  options: ['θ = 300° lies in the fourth quadrant (270° < 300° < 360°)', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' },
                { id: 'b', prompt: 'If cos θ = -4/5 and θ lies in the third quadrant, find the exact values of sin θ, tan θ, cosec θ, sec θ, and cot θ.', answer: '**Step 1:** cos θ = -4/5 (given, negative in QIII – consistent)',
                  options: ['**Step 1:** cos θ = -4/5 (given, negative in QIII – consistent)', 'sign dropout', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' },
                { id: 'c', prompt: 'Given that sec θ < 0 and cot θ > 0, determine the quadrant in which θ lies. Justify your answer.', answer: 'sec θ < 0 ⇒ cos θ < 0 (reciprocal has same sign)',
                  options: ['sec θ < 0 ⇒ cos θ < 0 (reciprocal has same sign)', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' }
          ],
            remediations: { 'the-mnemonic-all-silver-tea': { steps: ['**Draw the unit circle** with coordinate axes.', 'Label a point P(x, y) in each quadrant.', '**Write explicitly**: sin θ = y, cos θ = x, tan θ = y/x.', '**Fill a 4×6 table** (4 quadrants × 6 functions) by computing signs from x and y signs – do NOT rely on memory.'] } } },
        { type: 'subpart', nodeId: 'c11_math_cbse_03_006', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "sin 150° and sin 210° are both negative because both angles are greater than 90°." Identify the error and give the correct signs.', answer: '**Error:** The student incorrectly assumes all angles > 90° have negative sine',
                  options: ['**Error:** The student incorrectly assumes all angles > 90° have negative sine', 'All Silver Tea Cups'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe the mnemonic "All Silver Tea Cups" (or ASTC) applies to the **functions in alphabetical order** rather than quadrant.' }
          ],
            remediations: { 'the-mnemonic-all-silver-tea': { steps: ['**Draw the unit circle** with coordinate axes.', 'Label a point P(x, y) in each quadrant.', '**Write explicitly**: sin θ = y, cos θ = x, tan θ = y/x.', '**Fill a 4×6 table** (4 quadrants × 6 functions) by computing signs from x and y signs – do NOT rely on memory.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
