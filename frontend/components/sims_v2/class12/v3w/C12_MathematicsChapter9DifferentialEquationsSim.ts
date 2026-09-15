import type { SimDef } from '../../engine/types';
import C12_MathematicsChapter9DifferentialEquationsSim from '../../../simulations/c6_12/C12_MathematicsChapter9DifferentialEquationsSim';

/** v3 wrapped master — C12_MathematicsChapter9DifferentialEquationsSim. Rich bespoke scene mounted inside the
 * adaptive loop; diagnostics generated from its declared node ids.
 * Regenerate via tools/wrap_masters.mjs. */
export const w_c12_mathematicschapter9differentialequationssim: SimDef = {
    id: 'v3w_c12_mathematicschapter9differentialequationssim',
    title: 'Chapter9Differential Equations',
    subtitle: 'Covers differentiation of implicit functions f(x, y) = 0 including polynomial,.',
    classLevel: 12, subject: 'mathematics', topic: 'Derivatives of Implicit Functions',
    chapters: [],
    nodeIds: ['c12_math_cbse_05_007', 'c12_math_cbse_05_010', 'c12_math_cbse_05_011', 'c12_math_cbse_09_001', 'c12_math_cbse_09_002', 'c12_math_cbse_09_003', 'c12_math_cbse_09_004', 'c12_math_cbse_09_005', 'c12_math_cbse_09_006', 'c12_math_cbse_09_007', 'c12_math_cbse_09_008', 'c12_math_cbse_06_005', 'c12_math_cbse_03_006', 'c12_math_cbse_02_002', 'c12_math_cbse_08_004'],
    emoji: '🎯', theme: { bg: 'from-slate-800 to-indigo-900', accent: 'indigo', scene: 'senior' },
    scenario: { role: 'a class 12 learner', intro: 'Imagine you\'re designing a roller coaster track where the shape is given by x² + y² = 25 (a circle).', goal: 'Master Chapter9Differential Equations.' },
    discovery: {
        question: 'What is the mathematical definition of the second order derivative of a function \\(y = f(x)\\)? Write the notation used for it.',
        options: ['The second order derivative is the derivative of the first derivative:', 'square of first derivative', 'derivative of \\(y\\) with respect to \\(x^2\\)'],
        answer: 'The second order derivative is the derivative of the first derivative:',
        hook: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).',
    },
    teaching: [
        { title: 'An implicit function is a relationship.', text: 'An implicit function is a relationship between variables x and y expressed as f(x, y) = 0 where y cannot be easily isolated as y = g(x).', emoji: '💡', bgColor: 'from-violet-400 to-purple-500' }
    ],
    beats: [
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_007', title: 'An implicit function is a relationship.',
          scaffold: { problem: 'A circular track has equation x² + y² = 100 (metres). Find the slope of the tangent at the point (6, 8) and interpret its meaning for a.',
            steps: [
            { text: 'Write the given implicit relation: x² + y² = 100. Identify that we need dy/dx at (6, 8).' },
            { text: 'Differentiate both sides with respect to x: d/dx(x²) + d/dx(y²) = d/dx(100).' },
            { text: 'Apply derivatives: 2x + 2y·(dy/dx) = 0. (Chain rule on y² gives 2y·dy/dx).' },
            { text: 'Solve for dy/dx: 2y·(dy/dx) = -2x → dy/dx = -x/y.' },
            { text: 'Substitute the point (6, 8): dy/dx = -6/8 = -3/4. The negative slope means the track curves downward as x increases; a.', faded: true, blankAnswer: 'dy/dx = -3/4 at (6, 8). Slope is -0.75 (dimensionless).' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_010', title: 'If two variables \\(x\\) and \\(y\\) are.',
          scaffold: { problem: 'A particle moves along a curve such that its coordinates at time \\(t\\) seconds are \\(x = 2t^2 + 3t\\) metres and \\(y = t^3 - 4t\\) metres.',
            steps: [
            { text: 'Identify the parametric equations: \\(x = 2t^2 + 3t\\), \\(y = t^3 - 4t\\).' },
            { text: 'Differentiate \\(x\\) and \\(y\\) with respect to \\(t\\): \\(\\frac{dx}{dt} = 4t + 3\\), \\(\\frac{dy}{dt} = 3t^2 - 4\\).' },
            { text: 'Write the formula for \\(\\frac{dy}{dx}\\): \\(\\frac{dy}{dx} = \\frac{dy/dt}{dx/dt} = \\frac{3t^2 - 4}{4t + 3}\\).' },
            { text: 'Substitute \\(t = 2\\): \\(\\frac{dy}{dx} = \\frac{3(4) - 4}{4(2) + 3} = \\frac{12 - 4}{8 + 3} = \\frac{8}{11}\\).' },
            { text: 'Interpret: The slope of the tangent at \\(t = 2\\) is \\(\\frac{8}{11}\\) (dimensionless).', faded: true, blankAnswer: '\\(\\frac{8}{11}\\)' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_05_011', title: 'The second order derivative of a.',
          scaffold: { problem: 'A particle moves along a straight line such that its displacement \\(s\\) (in metres) at time \\(t\\) (in seconds) is given by \\(s(t) = 4t^3 -.',
            steps: [
            { text: 'Write the given displacement function: \\(s(t) = 4t^3 - 15t^2 + 18t + 5\\).' },
            { text: 'Find velocity \\(v(t) = \\frac{ds}{dt}\\) by differentiating once using power rule and sum rule:' },
            { text: 'Find acceleration \\(a(t) = \\frac{dv}{dt} = \\frac{d^2s}{dt^2}\\) by differentiating velocity:' },
            { text: 'Evaluate at \\(t = 2\\):' },
            { text: 'Interpret: At \\(t=2\\) s, the particle is moving forward (positive velocity) and speeding up (positive acceleration,.', faded: true, blankAnswer: 'Velocity = 6 m/s, Acceleration = 18 m/s². The particle is.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_001', title: 'A differential equation is an equation.',
          scaffold: { problem: 'The population \\( P \\) (in thousands) of a city grows at a rate proportional to the current population.',
            steps: [
            { text: 'Identify the variables. Population \\( P \\) depends on time \\( t \\).' },
            { text: 'Translate "rate of growth" into derivative notation. Rate of growth of population with respect to time is \\(.' },
            { text: 'Translate "proportional to the current population". This means \\( \\frac{dP}{dt} = kP \\), where \\( k \\) is a constant of.' },
            { text: 'Check for derivatives. The equation contains \\( \\frac{dP}{dt} \\), which is a first derivative.' },
            { text: 'State the order. The highest derivative is first order, so the order of the differential equation is 1.', faded: true, blankAnswer: 'Differential equation: \\( \\frac{dP}{dt} = kP \\); Order = 1.' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_002', title: 'The degree of a differential equation.',
          scaffold: { problem: 'Find the order and degree (if defined) of the differential equation: (d²y/dx²)² + 3(dy/dx)³ + 2y = sin x.',
            steps: [
            { text: 'Identify all derivative terms: (d²y/dx²)², (dy/dx)³. The term sin x does not contain derivatives.' },
            { text: 'Determine the highest order derivative: d²y/dx² (second derivative). So order = 2.' },
            { text: 'Check if the equation is a polynomial in derivatives: (d²y/dx²)² is (y\'\')² — polynomial (power 2).' },
            { text: 'Since it is a polynomial in derivatives, degree is defined. The highest order derivative is d²y/dx².' },
            { text: 'Verify: Order = 2 (positive integer), Degree = 2 (positive integer). Both satisfy NCERT note.', faded: true, blankAnswer: 'Order = 2, Degree = 2' }
            ] } },
        { type: 'scaffold', nodeId: 'c12_math_cbse_09_003', title: 'A **general solution** of an nth order.',
          scaffold: { problem: 'Verify that y = c₁ e^{3x} + c₂ e^{-2x} is the general solution of the differential equation d²y/dx² - dy/dx - 6y = 0.',
            steps: [
            { text: 'Write the given function: y = c₁ e^{3x} + c₂ e^{-2x}. Note it contains two arbitrary constants c₁, c₂, and the DE is.' },
            { text: 'Compute first derivative: dy/dx = 3c₁ e^{3x} - 2c₂ e^{-2x}.' },
            { text: 'Compute second derivative: d²y/dx² = 9c₁ e^{3x} + 4c₂ e^{-2x}.' },
            { text: 'Substitute y, dy/dx, d²y/dx² into LHS of DE: (9c₁ e^{3x} + 4c₂ e^{-2x}) - (3c₁ e^{3x} - 2c₂ e^{-2x}) - 6(c₁ e^{3x} + c₂.' },
            { text: 'Simplify: 9c₁ - 3c₁ - 6c₁ = 0 for e^{3x} term; 4c₂ + 2c₂ - 6c₂ = 0 for e^{-2x} term. LHS = 0 = RHS. Verified.', faded: true, blankAnswer: 'Verified. y = c₁ e^{3x} + c₂ e^{-2x} satisfies the DE for.' }
            ] } },
        { type: 'dissect', nodeId: 'c12_math_cbse_05_010', title: 'Identify each idea',
          dissect: { specimen: 'Chapter9Differential Equations', spots: [
            { id: 's1', label: 'An implicit function is a', prompt: 'Which idea is this? — An implicit function is a relationship between variables x and y expressed as f(x, y) = 0.', answer: 'An implicit function is a', options: ['An implicit function is a', 'If two variables x and', 'The second order derivative of', 'A differential equation is an'] },
            { id: 's2', label: 'If two variables x and', prompt: 'Which idea is this? — If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\).', answer: 'If two variables x and', options: ['If two variables x and', 'An implicit function is a', 'The second order derivative of', 'A differential equation is an'] },
            { id: 's3', label: 'The second order derivative of', prompt: 'Which idea is this? — The second order derivative of a function \\(y = f(x)\\) is the derivative of its first.', answer: 'The second order derivative of', options: ['The second order derivative of', 'An implicit function is a', 'If two variables x and', 'A differential equation is an'] },
            { id: 's4', label: 'A differential equation is an', prompt: 'Which idea is this? — A differential equation is an equation that involves an independent variable, a dependent.', answer: 'A differential equation is an', options: ['A differential equation is an', 'An implicit function is a', 'If two variables x and', 'The second order derivative of'] },
            { id: 's5', label: 'The degree of a differential', prompt: 'Which idea is this? — The degree of a differential equation is the highest positive integral power of the.', answer: 'The degree of a differential', options: ['The degree of a differential', 'An implicit function is a', 'If two variables x and', 'The second order derivative of'] },
            { id: 's6', label: 'A general solution of an', prompt: 'Which idea is this? — A **general solution** of an nth order ordinary differential equation is a relation.', answer: 'A general solution of an', options: ['A general solution of an', 'An implicit function is a', 'If two variables x and', 'The second order derivative of'] }
          ] } }
    ],
    explore: { component: C12_MathematicsChapter9DifferentialEquationsSim, prompt: 'Explore the interactive — Chapter9Differential Equations' },
    challenges: [
        { type: 'subpart', nodeId: 'c12_math_cbse_05_007', difficulty: 'standard',
          question: 'An implicit function is a relationship between variables x and y expressed as.',
          hint: 'Revisit c12_math_cbse_05_006 (Chain Rule) and practice "identify the inner function".',
          misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx,.',
          parts: [
                { id: 'a', prompt: 'Explain why we write d/dx(y²) = 2y · dy/dx instead of just 2y when differentiating x² + y² = 25 implicitly.', answer: 'Because y is a function of x, not an independent variable',
                  options: ['Because y is a function of x, not an independent variable', 'y is just a variable'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' },
                { id: 'b', prompt: 'Compare the process and result of finding dy/dx for x² + y² = 25 by (a) implicit differentiation and (b) solving for y explicitly then differentiating.', answer: 'implicit differentiation and (',
                  options: ['implicit differentiation and (', 'they\'re always the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' }
          ],
            remediations: { 'students-consistently-forget-to-apply': { steps: ['Have the student identify every term containing y in the equation.', 'For each such term, write the derivative as (derivative w.r.t y) × (dy/dx).', 'Practice with simple cases: d/dx(y) = dy/dx, d/dx(y²) = 2y·dy/dx, d/dx(sin y) = cos y·dy/dx.', 'Revisit c12_math_cbse_05_006 (Chain Rule) and do 5 drill problems where they only identify the chain rule factors.', 'Return to implicit differentiation with this explicit "tag each y-term" habit.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_007', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx,.',
          parts: [
                { id: 'a', prompt: 'Compare the process and result of finding dy/dx for x² + y² = 25 by (a) implicit differentiation and (b) solving for y explicitly then differentiating.', answer: 'implicit differentiation and (',
                  options: ['implicit differentiation and (', 'they\'re always the same'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently forget to apply the chain rule to terms involving y, writing d/dx(y²) = 2y instead of 2y·dy/dx, or d/dx(sin y) = cos.' }
          ],
            remediations: { 'students-consistently-forget-to-apply': { steps: ['Have the student identify every term containing y in the equation.', 'For each such term, write the derivative as (derivative w.r.t y) × (dy/dx).', 'Practice with simple cases: d/dx(y) = dy/dx, d/dx(y²) = 2y·dy/dx, d/dx(sin y) = cos y·dy/dx.', 'Revisit c12_math_cbse_05_006 (Chain Rule) and do 5 drill problems where they only identify the chain rule factors.', 'Return to implicit differentiation with this explicit "tag each y-term" habit.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_010', difficulty: 'standard',
          question: 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable.',
          hint: 'If stuck, revisit c12_math_cbse_05_006 (Chain Rule) and practice differentiating.',
          misconception: 'Students often forget that \\(\\frac{dy}{dx}\\) in parametric form is a function of the parameter \\(t\\), not \\(x\\).',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)',
                  options: ['If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)', 'An implicit function is a relationship between variables x and y expressed as f(x, y) = 0', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first', 'A differential equation is an equation that involves an independent variable, a dependent'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students often forget that \\(\\frac{dy}{dx}\\) in parametric form is a function of the parameter \\(t\\), not \\(x\\).' }
          ],
            remediations: { 'students-often-forget-that-frac': { steps: ['If a student inverts the quotient, have them re-derive the formula from the chain rule: \\(\\frac{dy}{dt} = \\frac{dy}{dx}.', 'Then isolate \\(\\frac{dy}{dx}\\) step by step.', 'If they substitute \\(t\\) too early, give them \\(x = t^2, y = t^3\\) and ask for \\(\\frac{dy}{dx}\\) at \\(t = -1\\).', 'Show that substituting \\(t = \\sqrt{x}\\) gives the wrong sign.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_05_011', difficulty: 'standard',
          question: 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its.',
          hint: 'If stuck, immediately revisit c12_math_cbse_05_006 (Chain Rule) for composite functions.',
          misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).',
          parts: [
                { id: 'a', prompt: 'What is the mathematical definition of the second order derivative of a function \\(y = f(x)\\)? Write the notation used for it.', answer: 'The second order derivative is the derivative of the first derivative:',
                  options: ['The second order derivative is the derivative of the first derivative:', 'square of first derivative', 'derivative of \\(y\\) with respect to \\(x^2\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'b', prompt: 'Explain why the second derivative of any linear function \\(f(x) = ax + b\\) is zero. What does this mean geometrically for the graph of the function?', answer: 'For \\(f(x) = ax + b\\), the first derivative \\(f\'(x) = a\\) is a constant',
                  options: ['For \\(f(x) = ax + b\\), the first derivative \\(f\'(x) = a\\) is a constant', 'second derivative is \\(a\\)'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' },
                { id: 'c', prompt: 'Find the second order derivative of \\(y = x^3 \\log x\\) (where \\(\\log\\) denotes natural logarithm). Show all steps.', answer: 'Step 1: \\(y = x^3 \\log x\\)',
                  options: ['Step 1: \\(y = x^3 \\log x\\)', 'forget the chain/product rule on the second pass'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** \\(\\frac{d^2y}{dx^2} = \\left(\\frac{dy}{dx}\\right)^2\\) or \\(\\frac{d^2y}{dx^2} = \\frac{d^2y}{d^2x}\\).' }
          ],
            remediations: { 'misconception-frac-d-2y-dx': { steps: ['**Revisit notation:** Write \\(\\frac{d^2y}{dx^2} = \\frac{d}{dx}\\left(\\frac{dy}{dx}\\right)\\) explicitly on paper every.', 'Say aloud: "derivative of the derivative." 2.', '**Drill first-derivative rules:** Do 5 quick problems from c12_math_cbse_05_006 (Chain Rule) and c12_math_cbse_05_010.', '**Practice the parametric second-derivative pattern:** For \\(x = f(t), y = g(t)\\), write the template: \\(\\frac{dy}{dx}.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_001', difficulty: 'standard',
          question: 'A differential equation is an equation that involves an independent variable, a.',
          hint: 'If stuck, revisit Class 11 Limits and Derivatives (nodes c11_math_cbse_13_006 through.',
          misconception: '**Misconception:** "The order of a differential equation is the highest power (exponent) of the derivative that.',
          parts: [
                { id: 'a', prompt: 'Which statement is correct about this idea?', answer: 'A differential equation is an equation that involves an independent variable, a dependent',
                  options: ['A differential equation is an equation that involves an independent variable, a dependent', 'An implicit function is a relationship between variables x and y expressed as f(x, y) = 0', 'If two variables \\(x\\) and \\(y\\) are expressed as functions of a third variable \\(t\\)', 'The second order derivative of a function \\(y = f(x)\\) is the derivative of its first'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "The order of a differential equation is the highest power (exponent) of the derivative that appears." **Exact wrong.' }
          ],
            remediations: { 'misconception-the-order-of-a': { steps: ['If a student confuses order with degree/exponent: 1.', 'Revisit **c11_math_cbse_13_006** (Derivatives: Intuitive Idea) and **c11_math_cbse_13_007** (Derivative of Polynomial.', 'Practice with a table: list each derivative in the equation, write its order (1, 2, 3...), then pick the maximum.', 'Do this for 5–10 equations until the distinction is automatic.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_002', difficulty: 'standard',
          question: 'The degree of a differential equation is the highest positive integral power of.',
          hint: 'If stuck, review "Polynomial Functions" from Class 11 (c11_math_cbse_02_007) and "Order.',
          misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative.".',
          parts: [
                { id: 'a', prompt: 'State the degree of the differential equation: (d²y/dx²)³ + 2(dy/dx)² + 3y = 0. Is the degree defined? Justify in one sentence.', answer: 'The degree is 3',
                  options: ['The degree is 3', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' },
                { id: 'b', prompt: 'Consider the differential equation: sin(dy/dx) + y = 0. A student claims the degree is 1 because dy/dx appears to the first power.', answer: 'The degree is NOT DEFINED',
                  options: ['The degree is NOT DEFINED', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' },
                { id: 'c', prompt: 'Find the order and degree (if defined) of: (d³y/dx³)² + (d²y/dx²)³ + (dy/dx)⁴ + y⁵ = 0.', answer: 'Order = 3 (highest derivative is d³y/dx³)',
                  options: ['Order = 3 (highest derivative is d³y/dx³)', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' }
          ],
            remediations: { 'students-consistently-confuse-highest-power': { steps: ['If a student cannot correctly identify degree: (1) Revisit c12_math_cbse_09_001 to ensure order identification is solid.', '(2) Practice the "Polynomial Check" algorithm: List every derivative term; ask: "Is this term a constant times.', '(3) Do 5 targeted exercises from Exercise 9.1 (Q1, Q4, Q6, Q9, Q11) writing the justification for each.', '(4) Re-diagnostic: Give the equation (d³y/dx³)² + sin(d²y/dx²) + y = 0 and ask for order and degree with justification.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_002', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative.".',
          parts: [
                { id: 'a', prompt: 'A student solves Exercise 9.1 Q11: "The degree of the differential equation (d²y/dx²)³ + (dy/dx)² + sin(dy/dx) + 1 = 0 is (A) 3 (B) 2 (C) 1 (D) not defined.".', answer: 'not defined." They choose (',
                  options: ['not defined." They choose (', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' },
                { id: 'b', prompt: 'Construct a differential equation of order 2 and degree 3 that is a polynomial in derivatives.', answer: 'Example of order 2, degree 3: (d²y/dx²)³ + x(dy/dx) + y = 0',
                  options: ['Example of order 2, degree 3: (d²y/dx²)³ + x(dy/dx) + y = 0', 'highest power of any derivative', 'highest power of the highest ORDER derivative'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: 'Students consistently confuse "highest power of any derivative" with "highest power of the highest ORDER derivative." For example, in.' }
          ],
            remediations: { 'students-consistently-confuse-highest-power': { steps: ['If a student cannot correctly identify degree: (1) Revisit c12_math_cbse_09_001 to ensure order identification is solid.', '(2) Practice the "Polynomial Check" algorithm: List every derivative term; ask: "Is this term a constant times.', '(3) Do 5 targeted exercises from Exercise 9.1 (Q1, Q4, Q6, Q9, Q11) writing the justification for each.', '(4) Re-diagnostic: Give the equation (d³y/dx³)² + sin(d²y/dx²) + y = 0 and ask for order and degree with justification.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_003', difficulty: 'standard',
          question: 'A **general solution** of an nth order ordinary differential equation is a.',
          hint: 'If stuck on differentiation during verification, immediately review Class 11 derivative.',
          misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:**.',
          parts: [
                { id: 'a', prompt: 'A student claims that y = x² + 5 is the general solution of dy/dx = 2x because it satisfies the equation. Is the student correct? Explain why or why not.', answer: 'The student is **incorrect**',
                  options: ['The student is **incorrect**', 'a solution that works'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:** Students often verify.' },
                { id: 'b', prompt: 'Consider the differential equation d²y/dx² + y = 0. Two students propose solutions: Student A: y = 3 cos x + 4 sin x Student B: y = 5 cos(x + π/6) Are both.', answer: 'Both are **solutions** (substitution verifies each)',
                  options: ['Both are **solutions** (substitution verifies each)', 'a solution', 'the general solution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:** Students often verify.' }
          ],
            remediations: { 'misconception-any-function-that-satisfies': { steps: ['If a student cannot distinguish general vs particular solutions: 1.', 'Revisit **c12_math_cbse_09_001** (Order of a DE) — confirm they can identify the order correctly.', 'Revisit **c11_math_cbse_13_007** (Derivative of Polynomial Functions) and **c11_math_cbse_13_009** (Algebra of.', 'Do a focused re-diagnostic: Give the DE d²y/dx² = 0 and ask: "Write the general solution.'] } } },
        { type: 'subpart', nodeId: 'c12_math_cbse_09_003', difficulty: 'advanced',
          question: 'Prove it again — new questions.',
          hint: 'Same idea, different angle.',
          misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:**.',
          parts: [
                { id: 'a', prompt: 'A candidate writes the following as the general solution of d³y/dx³ = 0: y = Ax² + Bx + C. Is this correct?', answer: 'The candidate\'s answer is **incorrect**',
                  options: ['The candidate\'s answer is **incorrect**', 'quadratic has only two constants'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:** Students often verify.' },
                { id: 'b', prompt: 'Consider the differential equation d²y/dx² + y = 0. Two students propose solutions: Student A: y = 3 cos x + 4 sin x Student B: y = 5 cos(x + π/6) Are both.', answer: 'Both are **solutions** (substitution verifies each)',
                  options: ['Both are **solutions** (substitution verifies each)', 'a solution', 'the general solution'],
                  hint: 'Check your reasoning on the interactive.',
                  misconception: '**Misconception:** "Any function that satisfies the differential equation is a general solution." **Exact error:** Students often verify.' }
          ],
            remediations: { 'misconception-any-function-that-satisfies': { steps: ['If a student cannot distinguish general vs particular solutions: 1.', 'Revisit **c12_math_cbse_09_001** (Order of a DE) — confirm they can identify the order correctly.', 'Revisit **c11_math_cbse_13_007** (Derivative of Polynomial Functions) and **c11_math_cbse_13_009** (Algebra of.', 'Do a focused re-diagnostic: Give the DE d²y/dx² = 0 and ask: "Write the general solution.'] } } }
    ],
    reflect: { prompts: ['What did the interactive reveal?', 'Where can this idea go wrong?'] },
    successLine: 'Mastered! 🌟', tryAgainLine: 'Revisit the simulation, then retry.',
};
