import type { SimDef } from '../../engine/types';
import C12_MathematicsContinuityAndDifferentiabilitySim from '../../../simulations/c6_12/C12_MathematicsContinuityAndDifferentiabilitySim';

/** v3 wrapped master — C12_MathematicsContinuityAndDifferentiabilitySim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicscontinuityanddifferentiabilitysim: SimDef = {
    id: 'v3w_c12_mathematicscontinuityanddifferentiabilitysim',
    title: 'Continuity And Differentiability',
    subtitle: 'This node covers the definition of continuity at a point, continuity on an interval, and.',
    classLevel: 12, subject: 'mathematics', topic: 'Continuity of a Function: Definition',
    chapters: [],
    nodeIds: ['c12_math_cbse_05_001', 'c12_math_cbse_05_002', 'c12_math_cbse_05_003', 'c12_math_cbse_05_004', 'c12_math_cbse_05_005', 'c12_math_cbse_07_009', 'c12_math_cbse_05_006', 'c12_math_cbse_05_007', 'c12_math_cbse_05_008', 'c12_math_cbse_05_009', 'c12_math_cbse_05_010', 'c12_math_cbse_05_011', 'c12_math_cbse_05_012', 'c12_math_cbse_05_013', 'c12_math_cbse_07_001'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine a prepaid metro card: you tap in, the balance decreases smoothly as you travel, but if the machine.', goal: 'Master Continuity And Differentiability.' },
    discovery: {
        question: 'Compare the continuity of \\(f(x) = |x|\\) and \\(g(x) = \\frac{1}{|x|}\\) at \\(x=0\\). Why does the algebra of continuous functions give different conclusions?',
        options: ['Correct answer: \\(f(x)=|x|\\) is continuous at \\(0\\) (Example 3, NCERT)', '\\(1/|x|\\) is discontinuous at 0', 'not continuous'],
        answer: 'Correct answer: \\(f(x)=|x|\\) is continuous at \\(0\\) (Example 3, NCERT)',
        hook: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\).',
    },
    teaching: [
        { title: 'A real-valued function \\(f\\) is **continuous.', text: 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if \\(\\lim_{x \\to c} f(x) = f(c)\\).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_001', title: 'A real-valued function \\(f\\) is.',
          scaffold: { problem: '** A taxi charges ₹25 for the first kilometre and ₹15 for each additional kilometre or part thereof.',
            steps: [
            { text: 'Identify the pieces. At \\(x=1\\), the first piece gives \\(F(1)=25\\). For \\(x>1\\), the ceiling function applies.' },
            { text: 'Check continuity at \\(x=1\\).' },
            { text: 'Check continuity at \\(x=2\\).' },
            { text: 'Interpret: The fare jumps at every integer kilometre because the ceiling function adds a full kilometre charge as soon.' },
            { text: 'Conclusion: \\(F\\) is discontinuous at all positive integers; continuous elsewhere.', faded: true, blankAnswer: '** Discontinuous at \\(x=1\\) and \\(x=2\\) (and all positive.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_002', title: 'A function \\( f \\) is continuous at a.',
          scaffold: { problem: 'A taxi fare in Mumbai is given by \\( f(x) = \\begin{cases} 25, & 0 < x \\le 2 \\\\ 25 + 15(x-2), & x > 2 \\end{cases} \\) where \\( x \\) is.',
            steps: [
            { text: 'Identify the point of interest \\( c = 2 \\). Note the pieces: for \\( x \\le 2 \\), fare = ₹25; for \\( x > 2 \\), fare = \\(.' },
            { text: 'Compute \\( f(2) \\): since \\( 2 \\le 2 \\), use first piece → \\( f(2) = 25 \\).' },
            { text: 'Compute LHL: \\( \\lim_{x \\to 2^-} f(x) = \\lim_{x \\to 2^-} 25 = 25 \\).' },
            { text: 'Compute RHL: \\( \\lim_{x \\to 2^+} f(x) = \\lim_{x \\to 2^+} [25 + 15(x-2)] = 25 + 15(0) = 25 \\).' },
            { text: 'Compare: LHL = 25, RHL = 25, \\( f(2) = 25 \\). All equal → fare is continuous at 2 km (no sudden jump).', faded: true, blankAnswer: 'Continuous at \\( x = 2 \\) km.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_003', title: 'The algebra of continuous functions.',
          scaffold: { problem: 'A Delhi Metro fare function is defined as \\(F(d) = 10 + 2d + \\frac{5}{d+1}\\) for distance \\(d \\geq 0\\) (in km), where the first term is.',
            steps: [
            { text: 'Identify the component functions: \\(f_1(d)=10\\) (constant), \\(f_2(d)=2d\\) (polynomial), \\(f_3(d)=\\frac{5}{d+1}\\).' },
            { text: 'Check continuity of each component on \\([0,\\infty)\\). Constants and polynomials are continuous everywhere.' },
            { text: 'Apply Theorem 1: sum of continuous functions is continuous. Since \\(f_1, f_2, f_3\\) are all continuous on.' },
            { text: 'Verify at the endpoint \\(d=0\\): \\(F(0)=10+0+5=15\\). \\(\\lim_{d \\to 0^+} F(d) = 10+0+5=15\\). Right-hand continuity holds.' },
            { text: 'Conclusion: \\(F\\) is continuous for all \\(d \\geq 0\\). No discontinuities.', faded: true, blankAnswer: '\\(F(d)\\) is continuous for all \\(d \\geq 0\\). No points of.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_004', title: 'A function \\( f \\) is differentiable at.',
          scaffold: { problem: 'A toy car moves along a straight track. Its position (in cm) at time \\( t \\) (in seconds) is given by \\( s(t) = \\begin{cases} t^2, & 0 \\le.',
            steps: [
            { text: 'Identify the function and the point. We need to check differentiability of \\( s(t) \\) at \\( t=2 \\).' },
            { text: 'Write the left-hand derivative (for \\( h \\to 0^- \\), we use \\( t=2+h \\le 2 \\), so the first piece \\( t^2 \\)).' },
            { text: 'Write the right-hand derivative (for \\( h \\to 0^+ \\), we use \\( t=2+h > 2 \\), so the second piece \\( 4t-4 \\)).' },
            { text: 'Compare. Both one-sided derivatives exist, are finite, and equal 4 cm/s.' },
            { text: 'Verify continuity (optional but good practice): \\( \\lim_{t \\to 2^-} s(t) = 4 \\), \\( \\lim_{t \\to 2^+} s(t) = 4 \\), \\(.', faded: true, blankAnswer: 'Yes, the velocity is well-defined at \\( t=2 \\) seconds and.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_005', title: 'A function \\( f \\) is differentiable at.',
          scaffold: { problem: 'A toy car moves along a straight track. Its position (in metres) at time \\( t \\) seconds is given by \\( s(t) = \\begin{cases} t^2, & 0 \\le t.',
            steps: [
            { text: 'Check continuity at \\( t = 2 \\). \\( s(2) = 2^2 = 4 \\). LHL = \\( \\lim_{t\\to 2^-} t^2 = 4 \\).' },
            { text: 'Compute left-hand derivative (LHD) at \\( t=2 \\) using definition: LHD = \\( \\lim_{h\\to 0^-} \\frac{s(2+h)-s(2)}{h} \\).' },
            { text: 'Compute right-hand derivative (RHD) at \\( t=2 \\): RHD = \\( \\lim_{h\\to 0^+} \\frac{s(2+h)-s(2)}{h} \\).' },
            { text: 'Compare LHD and RHD. Both equal 4. Therefore, \\( s \\) is differentiable at \\( t=2 \\) and \\( s\'(2) = 4 \\) m/s.' },
            { text: 'Interpret: The velocity at exactly 2 seconds is 4 m/s. The motion is smooth (no jerk) at that instant.', faded: true, blankAnswer: 'Yes, velocity exists at \\( t=2 \\) s and equals 4 m/s.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_07_009', title: 'The Second Fundamental Theorem of.',
          scaffold: { problem: 'A particle moves along a straight line with velocity \\( v(t) = 4t^3 - 6t + 2 \\) m/s.',
            steps: [
            { text: 'Displacement is the definite integral of velocity: \\( \\int_1^3 (4t^3 - 6t + 2) \\, dt \\).' },
            { text: 'Find an antiderivative \\( s(t) \\) of \\( v(t) \\). Using power rule: \\( \\int 4t^3 \\, dt = t^4 \\), \\( \\int -6t \\, dt =.' },
            { text: 'Evaluate \\( s(t) \\) at upper limit 3: \\( s(3) = 3^4 - 3(3^2) + 2(3) = 81 - 27 + 6 = 60 \\).' },
            { text: 'Evaluate \\( s(t) \\) at lower limit 1: \\( s(1) = 1^4 - 3(1^2) + 2(1) = 1 - 3 + 2 = 0 \\).' },
            { text: 'Subtract: displacement = \\( s(3) - s(1) = 60 - 0 = 60 \\) m.', faded: true, blankAnswer: '60 m' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_05_002', title: 'Identify each idea',
          dissect: { specimen: 'Continuity And Differentiability', spots: [
            { id: 's1', label: 'A real-valued function f is', prompt: 'Which idea is this? — A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if.', answer: 'A real-valued function f is', options: ['A real-valued function f is', 'A function f', 'The algebra of continuous functions', 'The Second Fundamental Theorem of'] },
            { id: 's2', label: 'A function f', prompt: 'Which idea is this? — A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand.', answer: 'A function f', options: ['A function f', 'A real-valued function f is', 'The algebra of continuous functions', 'The Second Fundamental Theorem of'] },
            { id: 's3', label: 'The algebra of continuous functions', prompt: 'Which idea is this? — The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued.', answer: 'The algebra of continuous functions', options: ['The algebra of continuous functions', 'A real-valued function f is', 'A function f', 'The Second Fundamental Theorem of'] },
            { id: 's4', label: 'The Second Fundamental Theorem of', prompt: 'Which idea is this? — The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous.', answer: 'The Second Fundamental Theorem of', options: ['The Second Fundamental Theorem of', 'A real-valued function f is', 'A function f', 'The algebra of continuous functions'] }
          ] } }
    ],
    explore: { component: C12_MathematicsContinuityAndDifferentiabilitySim, prompt: 'Explore the interactive — Continuity And Differentiability' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_05_001', difficulty: 'standard',
          question: 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain.',
          hint: 'If stuck, revisit Class 11 limit evaluation techniques (factorisation, rationalisation,.',
          misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'Explain why the function \\(f(x) = \\frac{x^2 - 1}{x - 1}\\) is **not** continuous at \\(x = 1\\) even though its limit as \\(x \\to 1\\) exists and equals 2.', answer: 'The function is not defined at \\(x = 1\\)',
                  options: ['The function is not defined at \\(x = 1\\)', 'it is continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:** Students check only.' }
          ],
            remediations: { 'misconception-if-a-function-is': { steps: ['Revisit **Class 11 limits**: `c11_math_cbse_13_001` (intuitive idea), `c11_math_cbse_13_002` (algebraic methods),.', 'Practice evaluating left-hand and right-hand limits separately for piecewise functions.', 'Re-do the three-condition checklist for **five** different functions (polynomial, rational, absolute value, greatest.', 'Write each condition explicitly: "f(c) = ...", "LHL = ...", "RHL = ...", "Limit = ...", "Conclusion".'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_001', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:**.',
          parts: [
                { id: 'a', prompt: 'A student claims: "The function \\(f(x) = \\begin{cases} \\frac{\\sin x}{x}, & x \\ne 0 \\\\ 1, & x = 0 \\end{cases}\\) is discontinuous at \\(x = 0\\) because.', answer: 'The claim is **false**',
                  options: ['The claim is **false**', 'the formula \\(\\frac{\\sin x}{x}\\) must be valid at \\(x=0\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "If a function is defined at a point, it is automatically continuous there." **Exact wrong step:** Students check only.' }
          ],
            remediations: { 'misconception-if-a-function-is': { steps: ['Revisit **Class 11 limits**: `c11_math_cbse_13_001` (intuitive idea), `c11_math_cbse_13_002` (algebraic methods),.', 'Practice evaluating left-hand and right-hand limits separately for piecewise functions.', 'Re-do the three-condition checklist for **five** different functions (polynomial, rational, absolute value, greatest.', 'Write each condition explicitly: "f(c) = ...", "LHL = ...", "RHL = ...", "Limit = ...", "Conclusion".'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_002', difficulty: 'standard',
          question: 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the.',
          hint: 'If stuck, revisit Class 11 Limits: Algebraic Methods of Evaluation (c11_math_cbse_13_002).',
          misconception: 'Students often compute LHL and RHL correctly but forget to evaluate \\( f(c) \\) from the *correct piece* of the.',
          parts: [
                { id: 'a', prompt: 'State the precise mathematical condition for a function \\( f \\) to be continuous at \\( x = c \\) using left-hand limit, right-hand limit, and function value.', answer: 'Correct answer: \\( \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c) \\)',
                  options: ['Correct answer: \\( \\lim_{x \\to c^-} f(x) = \\lim_{x \\to c^+} f(x) = f(c) \\)', 'LHL = RHL'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often compute LHL and RHL correctly but forget to evaluate \\( f(c) \\) from the *correct piece* of the definition.' }
          ],
            remediations: { 'students-often-compute-lhl-and': { steps: ['Re‑read the definition: circle the three required equalities.', 'For the problematic function, explicitly write which piece defines \\( f(c) \\) (look at the inequality sign: ≤, <, ≥, >).', 'Re‑evaluate LHL, RHL, and \\( f(c) \\) side‑by‑side in a table.', 'Practice with 5 piecewise functions where the boundary point uses a different formula than the side pieces (e.g., \\(.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_003', difficulty: 'standard',
          question: 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two.',
          hint: 'Revisit c11_math_cbse_13_002 (algebra of limits) and c12_math_cbse_05_001 (continuity.',
          misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\).',
          parts: [
                { id: 'a', prompt: 'Explain why the function \\(h(x) = \\sin(x^2)\\) is continuous for all real \\(x\\) using the composition theorem.', answer: 'Correct answer: Let \\(g(x)=x^2\\) (inner) and \\(f(u)=\\sin u\\) (outer)',
                  options: ['Correct answer: Let \\(g(x)=x^2\\) (inner) and \\(f(u)=\\sin u\\) (outer)', 'both are continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\) and \\(g\\) are.' },
                { id: 'b', prompt: 'Determine whether the function \\(F(x) = \\frac{x^2 - 4}{x - 2}\\) is continuous at \\(x = 2\\). If not, can you redefine \\(F(2)\\) to make it continuous?', answer: 'Correct answer: \\(F(x) = \\frac{(x-2)(x+2)}{x-2} = x+2\\) for \\(x \\neq 2\\)',
                  options: ['Correct answer: \\(F(x) = \\frac{(x-2)(x+2)}{x-2} = x+2\\) for \\(x \\neq 2\\)', '\\(F\\) is continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\) and \\(g\\) are.' },
                { id: 'c', prompt: 'Compare the continuity of \\(f(x) = |x|\\) and \\(g(x) = \\frac{1}{|x|}\\) at \\(x=0\\). Why does the algebra of continuous functions give different conclusions?', answer: 'Correct answer: \\(f(x)=|x|\\) is continuous at \\(0\\) (Example 3, NCERT)',
                  options: ['Correct answer: \\(f(x)=|x|\\) is continuous at \\(0\\) (Example 3, NCERT)', '\\(1/|x|\\) is discontinuous at 0', 'not continuous'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if \\(f\\) and \\(g\\) are continuous, then \\(\\frac{f}{g}\\) is continuous **everywhere** \\(f\\) and \\(g\\) are.' }
          ],
            remediations: { 'if-f-and-g-are': { steps: ['Revisit **c12_math_cbse_05_001** (definition of continuity at a point) and **c11_math_cbse_13_002** (algebra of limits).', 'Write down the exact hypotheses of Theorem 1 and Theorem 2 from NCERT 5.2.1, highlighting the "provided \\(g(c) \\neq.', 'Practice 5 problems where you must **explicitly state the domain** of each component function before applying the.', 'Re-attempt Diagnostic Questions 1, 2, and 4, this time writing the domain condition as a separate step.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_004', difficulty: 'standard',
          question: 'A function \\( f \\) is differentiable at a point \\( c \\) in its domain if the.',
          hint: 'Revisit one-sided limits (c12_math_cbse_05_002) and the definition of continuity.',
          misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.',
          parts: [
                { id: 'a', prompt: 'State the definition of the derivative of a function \\( f \\) at a point \\( x = c \\) using the limit of the difference quotient.', answer: 'The derivative is \\( f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h)-f(c)}{h} \\)',
                  options: ['The derivative is \\( f\'(c) = \\lim_{h \\to 0} \\frac{f(c+h)-f(c)}{h} \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' },
                { id: 'b', prompt: 'The function \\( f(x) = |x-2| \\) is continuous at \\( x=2 \\) but not differentiable there.', answer: 'For \\( x<2 \\), \\( f(x)=2-x \\)',
                  options: ['For \\( x<2 \\), \\( f(x)=2-x \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' }
          ],
            remediations: { 'if-a-function-is-continuous': { steps: ['If a student confuses continuity with differentiability, first revisit the definition of continuity.', 'Then explicitly compute left and right derivatives for \\( f(x)=|x| \\) at 0, showing the algebraic step \\( |h|/h = -1 \\).', 'Next, practice piecewise functions: give \\( f(x) = \\begin{cases} x^2 & x \\le 0 \\\\ x & x > 0 \\end{cases} \\) and have the.', 'Finally, ask them to state in their own words: "Continuity is necessary but not sufficient for differentiability."'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_004', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.',
          parts: [
                { id: 'a', prompt: 'The function \\( f(x) = |x-2| \\) is continuous at \\( x=2 \\) but not differentiable there.', answer: 'For \\( x<2 \\), \\( f(x)=2-x \\)',
                  options: ['For \\( x<2 \\), \\( f(x)=2-x \\)', 'if a function is continuous at a point, it is automatically differentiable there'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often believe that if a function is continuous at a point, it is automatically differentiable there.' }
          ],
            remediations: { 'if-a-function-is-continuous': { steps: ['If a student confuses continuity with differentiability, first revisit the definition of continuity.', 'Then explicitly compute left and right derivatives for \\( f(x)=|x| \\) at 0, showing the algebraic step \\( |h|/h = -1 \\).', 'Next, practice piecewise functions: give \\( f(x) = \\begin{cases} x^2 & x \\le 0 \\\\ x & x > 0 \\end{cases} \\) and have the.', 'Finally, ask them to state in their own words: "Continuity is necessary but not sufficient for differentiability."'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_005', difficulty: 'standard',
          question: 'A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if.',
          hint: 'If stuck, revisit c11_math_cbse_13_008 (Derivative Using First Principle) and.',
          misconception: 'Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if both the',
                  options: ['A function \\( f \\) is differentiable at a point \\( x = c \\) in its domain if both the', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often think that if the derivatives of the pieces of a piecewise function match at the boundary, the function is differentiable.' }
          ],
            remediations: { 'if-the-derivatives-of-the': { steps: ['If a student makes this error, guide them through the following steps: 1.', 'Revisit the definition of derivative at a point: \\( f\'(c) = \\lim_{h\\to 0} \\frac{f(c+h)-f(c)}{h} \\).', 'Emphasize that \\( f(c) \\) must exist and the limit must exist.', 'Show that if \\( f \\) is not continuous at \\( c \\), then \\( \\lim_{h\\to 0} f(c+h) \\neq f(c) \\), so the numerator \\(.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_07_009', difficulty: 'standard',
          question: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a.',
          hint: 'If stuck, revisit node c12_math_cbse_07_001 (Integration as Inverse of Differentiation).',
          misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous',
                  options: ['The Second Fundamental Theorem of Calculus states that if \\( f \\) is a continuous', 'A real-valued function \\(f\\) is **continuous at a point** \\(c\\) in its domain if', 'A function \\( f \\) is continuous at a point \\( x = c \\) if and only if the left-hand', 'The algebra of continuous functions states that if \\(f\\) and \\(g\\) are two real-valued'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often write the antiderivative with \\( +C \\) and then substitute limits, e.g., \\( [F(x) + C]_a^b \\), and then incorrectly keep \\(.' }
          ],
            remediations: { 'students-often-write-the-antiderivative': { steps: ['If a student makes the above errors: (1) Have them re-derive the cancellation of \\( C \\) algebraically: \\( (F(b)+C) -.', '(2) Give a set of definite integrals where the integrand has a discontinuity in the interval (e.g., \\( \\int_0^2.', '(3) Practice the "upper minus lower" order by evaluating \\( \\int_1^2 2x \\, dx \\) both as \\( [x^2]_1^2 \\) and as \\(.', '(4) Revisit node c12_math_cbse_07_008 (First Fundamental Theorem) to reinforce the link between antiderivatives and.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
