## ELI5
A pendulum's small swings behave only because sin θ roughly equals θ when the angle shrinks - and that approximation is a standard limit wearing a costume: sin x over x tends to 1 as x tends to 0. Its companions: tan x over x tends to 1, and (1 - cos x) over x tends to 0, all in radians. Every trig limit at zero is algebra that reshapes the expression into one of these building blocks, using identities like 1 - cos x = 2 sin^2(x/2).

## DEFINITION
The limits of trigonometric functions as the variable approaches zero are evaluated using three fundamental standard limits: \(\lim_{x \to 0} \frac{\sin x}{x} = 1\), \(\lim_{x \to 0} \frac{\tan x}{x} = 1\), and \(\lim_{x \to 0} \frac{1 - \cos x}{x} = 0\). These limits hold only when the angle \(x\) is measured in radians. Any trigonometric limit as \(x \to 0\) can be solved by algebraically manipulating the expression to match one of these standard forms, using trigonometric identities such as \(1 - \cos x = 2\sin^2\frac{x}{2}\) and \(\tan x = \frac{\sin x}{\cos x}\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can evaluate limits of trigonometric functions by reducing them to the standard forms \(\frac{\sin x}{x}\), \(\frac{\tan x}{x}\), or \(\frac{1-\cos x}{x}\) through algebraic manipulation (multiplying/dividing by appropriate coefficients), trigonometric identities, and substitution. They can handle composite limits involving sums, products, and quotients of multiple trigonometric functions.

## SCOPE_BOUNDARY
Covers evaluation of limits as \(x \to 0\) for trigonometric functions using the three standard limits and algebraic/trigonometric manipulation. Does NOT cover L'Hôpital's rule (not in Class 11 syllabus), limits as \(x \to a \neq 0\) without substitution \(x = a + h\), limits at infinity for trigonometric functions, or Maclaurin series expansions.

## WALKTHROUGH
Imagine a physics student modelling a simple pendulum. For small oscillations, the restoring force is proportional to \(\sin\theta\), but the equation of motion becomes simple harmonic only if \(\sin\theta \approx \theta\). How do we justify that \(\frac{\sin\theta}{\theta} \to 1\) as \(\theta \to 0\)? Start by recalling the intuitive idea of limits (node c11_math_cbse_13_001) and algebraic evaluation (node c11_math_cbse_13_002). Write down the three standard limits as "building blocks." For any new limit, first identify which trigonometric functions appear, then ask: "Can I multiply/divide by a coefficient to make the argument match the denominator?" If \(1-\cos x\) appears, use the identity \(1-\cos x = 2\sin^2\frac{x}{2}\) to convert to a sine form. Always check that angles are in radians. The key insight is that every trigonometric limit at zero reduces to a combination of \(\lim_{x\to0}\frac{\sin x}{x}=1\) and \(\lim_{x\to0}\frac{1-\cos x}{x}=0\).

Takeaway: mastery means reducing any trig limit at zero to the standard trio, watching the radians requirement, and handling coefficients by rescaling the argument. Exam moves: evaluate-the-trig-limit questions and composite-expression items. Check yourself: sin(kx) over x is not the standard form - divide and multiply by k to normalise the argument first. Students miss it because they quote the standard limits with mismatched insides, when the definition's method is matching shapes: force the argument of sine or tangent to equal its denominator, convert 1 - cos x with the half-angle identity, and the building blocks take over.

## DIAGNOSTIC_QUESTION_1
State the three standard trigonometric limits as \(x \to 0\) (with \(x\) in radians) that are used to evaluate all other trigonometric limits in Class 11.

## DIAGNOSTIC_ANSWER_1
The three standard limits are:
1. \(\lim_{x \to 0} \frac{\sin x}{x} = 1\)
2. \(\lim_{x \to 0} \frac{\tan x}{x} = 1\)
3. \(\lim_{x \to 0} \frac{1 - \cos x}{x} = 0\)
A wrong answer (e.g., writing \(\frac{1-\cos x}{x} \to 1\) or forgetting the radian condition) reveals that the student has not memorised the exact fundamental limits, which are the only tools allowed for these problems.

## DIAGNOSTIC_QUESTION_2
A student evaluates \(\lim_{x \to 0} \frac{\sin 5x}{x}\) by directly applying \(\lim_{x \to 0} \frac{\sin x}{x} = 1\) and writes the answer as 1. Explain why this is incorrect and show the correct manipulation.

## DIAGNOSTIC_ANSWER_2
The standard limit requires the argument of sine to exactly match the denominator. Here the argument is \(5x\) but the denominator is \(x\). The correct step is to multiply and divide by 5:
\[
\frac{\sin 5x}{x} = 5 \cdot \frac{\sin 5x}{5x} \xrightarrow{x\to0} 5 \times 1 = 5.
\]
If the student answers 1, they have ignored the coefficient mismatch – a very common error where the condition "argument = denominator" is overlooked.

## DIAGNOSTIC_QUESTION_3
Evaluate \(\lim_{x \to 0} \frac{\sin 3x}{\sin 5x}\).

## DIAGNOSTIC_ANSWER_3
\[
\lim_{x \to 0} \frac{\sin 3x}{\sin 5x}
= \lim_{x \to 0} \frac{\sin 3x}{3x} \cdot \frac{5x}{\sin 5x} \cdot \frac{3}{5}
= 1 \times 1 \times \frac{3}{5} = \frac{3}{5}.
\]
A wrong answer (e.g., \(\frac{5}{3}\) or \(1\)) reveals an error in the algebraic rearrangement – the student likely forgot to multiply by the reciprocal of the coefficients or inverted the fraction incorrectly.

## DIAGNOSTIC_QUESTION_4
Determine which of the following limits is finite and non-zero, and find its value:
(a) \(\lim_{x \to 0} \frac{\tan x - \sin x}{x^2}\)
(b) \(\lim_{x \to 0} \frac{\tan x - \sin x}{x^3}\)

## DIAGNOSTIC_ANSWER_4
(a) \(\tan x - \sin x = \sin x \left(\frac{1}{\cos x} - 1\right) = \frac{\sin x (1-\cos x)}{\cos x}\).
Using \(1-\cos x = 2\sin^2\frac{x}{2}\), the numerator behaves like \(x \cdot x^2 = x^3\), so divided by \(x^2\) gives \(x \to 0\). Hence limit (a) = 0.
(b) Same numerator divided by \(x^3\):
\[
\frac{\tan x - \sin x}{x^3} = \frac{\sin x}{x} \cdot \frac{1-\cos x}{x^2} \cdot \frac{1}{\cos x}
= \frac{\sin x}{x} \cdot \frac{2\sin^2(x/2)}{x^2} \cdot \frac{1}{\cos x}
= \frac{\sin x}{x} \cdot \frac{1}{2}\left(\frac{\sin(x/2)}{x/2}\right)^2 \cdot \frac{1}{\cos x} \to 1 \times \frac{1}{2} \times 1 = \frac{1}{2}.
\]
Limit (b) is finite and non-zero = \(\frac{1}{2}\). A wrong choice indicates the student cannot gauge the "order of smallness" of the numerator.

## DIAGNOSTIC_QUESTION_5
A student evaluates \(\lim_{x \to 0} \frac{1 - \cos x}{x^2}\) as follows:
"Using the expansion \(\cos x = 1 - \frac{x^2}{2} + \cdots\), we get \(\frac{1 - (1 - x^2/2)}{x^2} = \frac{1}{2}\)."
Is this method acceptable in the Class 11 CBSE examination? Justify your answer.

## DIAGNOSTIC_ANSWER_5
No, this method is not acceptable. The Maclaurin series expansion of \(\cos x\) is not part of the Class 11 syllabus. The prescribed method is to use the identity \(1 - \cos x = 2\sin^2\frac{x}{2}\):
\[
\frac{1-\cos x}{x^2} = \frac{2\sin^2(x/2)}{x^2} = \frac{1}{2}\left(\frac{\sin(x/2)}{x/2}\right)^2 \to \frac{1}{2}.
\]
If the student defends the series method, they are relying on a technique not yet taught, which would not be awarded marks in a board exam.

## DIAGNOSTIC_QUESTION_6
Construct a limit problem involving trigonometric functions that requires the use of at least two different standard limits and yields the answer \(2\). Write the problem and show the solution steps.

## DIAGNOSTIC_ANSWER_6
**Problem:** Evaluate \(\lim_{x \to 0} \frac{\sin 2x + \tan x}{x}\).
**Solution:**
\[
\frac{\sin 2x + \tan x}{x} = \frac{\sin 2x}{x} + \frac{\tan x}{x}
= 2\frac{\sin 2x}{2x} + \frac{\tan x}{x} \to 2\times1 + 1 = 3.
\]
That gives 3. To get exactly 2, one can use:
**Problem:** Evaluate \(\lim_{x \to 0} \frac{\tan 2x}{\sin x}\).
**Solution:**
\[
\frac{\tan 2x}{\sin x} = \frac{\tan 2x}{2x} \cdot \frac{2x}{x} \cdot \frac{x}{\sin x} = \frac{\tan 2x}{2x} \cdot 2 \cdot \frac{x}{\sin x} \to 1 \times 2 \times 1 = 2.
\]
This uses both \(\lim \frac{\tan u}{u}=1\) and \(\lim \frac{\sin v}{v}=1\). A poor answer would be a problem that uses only one standard limit or yields a different value.

## COMMON_MISCONCEPTION
Students frequently treat \(\frac{\sin(kx)}{x}\) as directly equal to 1 (ignoring the coefficient \(k\)), writing \(\lim_{x\to0}\frac{\sin 3x}{x}=1\) instead of 3. Another pervasive error is assuming \(\frac{1-\cos x}{x^2} = 1\) by misapplying \(\frac{1-\cos x}{x}=0\) or by incorrectly "cancelling" \(x\). A third misconception is trying to use L'Hôpital's rule (differentiating numerator and denominator) which is not in the Class 11 curriculum and will not be accepted in board exams.

## ON_FAILURE
1. **Coefficient mismatch:** Make the student write the standard limit \(\frac{\sin x}{x}=1\) on a card. For any \(\frac{\sin(kx)}{x}\), insist they explicitly write: "Multiply and divide by \(k\): \(k\frac{\sin(kx)}{kx}\)". Practice 5 problems where only the coefficient changes.
2. **\(1-\cos x\) confusion:** Have them derive \(1-\cos x = 2\sin^2\frac{x}{2}\) from \(\cos 2\theta = 1-2\sin^2\theta\). Then solve \(\lim_{x\to0}\frac{1-\cos 4x}{x^2}\) step-by-step, highlighting that the answer is \(8\) (not \(0\) or \(1\)).
3. **L'Hôpital temptation:** Explain that board exams require "first principles" methods. If they use differentiation, mark it as "method not allowed" and ask them to redo using standard limits.

## PREREQUISITE_NODE_IDS
c11_math_cbse_13_001, c11_math_cbse_13_002, c10_math_cbse_08_001, c10_math_cbse_08_006, c10_math_cbse_08_009
## PREREQUISITE_REASONS
c11_math_cbse_13_001: Provides the intuitive foundation of what a limit means, necessary before evaluating specific trigonometric limits.
c11_math_cbse_13_002: Algebraic methods (factorisation, rationalisation) are the primary tools to manipulate trigonometric expressions into standard forms.
c10_math_cbse_08_001: Defines \(\sin, \cos, \tan\) ratios; without knowing these, the functions in the limits are meaningless.
c10_math_cbse_08_006: Identities \(\sin^2x+\cos^2x=1\), \(1+\tan^2x=\sec^2x\), and \(1-\cos x=2\sin^2\frac{x}{2}\) are essential for rewriting expressions.
c10_math_cbse_08_009: Complementary angle relations (\(\sin(90^\circ-x)=\cos x\)) occasionally appear in limit problems requiring conversion.

## FORWARD_NODE_IDS
c11_math_cbse_13_010, c12_math_cbse_05_001, c12_phy_cbse_07_002, c11_math_cbse_13_008

## FORWARD_REASONS
c11_math_cbse_13_010: The derivative of \(\sin x\) is \(\cos x\), derived using \(\lim_{h\to0}\frac{\sin h}{h}=1\) and \(\lim_{h\to0}\frac{1-\cos h}{h}=0\). The derivative of \(\tan x\) uses \(\lim_{h\to0}\frac{\tan h}{h}=1\). Mastery of this node is a direct prerequisite for differentiating trigonometric functions.
c12_math_cbse_05_001: Limits of trigonometric functions (e.g., \(\lim_{x \to 0} \frac{\sin x}{x} = 1\)) appear in continuity problems.  
c12_phy_cbse_07_002: Covers limits of trigonometric functions, which underpins the calculation of average values over a cycle (e.g., <sin²(ωt)> = 1/2).  
c11_math_cbse_13_008: Revisit c11_math_cbse_13_002 (Limits: Algebraic Methods) for factorization/rationalization practice, and c11_math_cbse_13_003 (Limits of Trigonometric Functions) for sin h/h and (1-cos h)/h limits.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_001, c10_math_cbse_09_001
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_001: Trigonometric ratios are used in physics (e.g., simple harmonic motion, wave mechanics) where the small-angle approximation \(\sin\theta\approx\theta\) relies on \(\lim_{\theta\to0}\frac{\sin\theta}{\theta}=1\).
c10_math_cbse_09_001: Heights and distances problems use trigonometry; the calculus of trigonometric functions (derivatives) extends these to rates of change in physics, such as velocity in circular motion.

## CHAIN_DESCRIPTION
c11_math_cbse_13_001 -> c11_math_cbse_13_002 -> c11_math_cbse_13_003 -> c11_math_cbse_13_010

## THIS_FORMULA
Standard limits (x in radians):
1. \(\lim_{x \to 0} \frac{\sin x}{x} = 1\)
2. \(\lim_{x \to 0} \frac{\tan x}{x} = 1\)
3. \(\lim_{x \to 0} \frac{1 - \cos x}{x} = 0\)
4. \(\lim_{x \to 0} \frac{\sin^{-1} x}{x} = 1\)
5. \(\lim_{x \to 0} \frac{\tan^{-1} x}{x} = 1\)

## FORMULA_VARIABLES
\(x\) = angle measured in radians (dimensionless), approaching 0.

## FORMULA_UNITS
dimensionless (radians are dimensionless)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_001 | Trigonometric ratios form the basis for trigonometric limits used in physics for oscillations and wave approximations.
c10_math_cbse_09_001 | Heights and distances problems use trigonometry; limits of trigonometric functions lead to derivatives used in physics for velocity and acceleration in circular motion.

## PREREQ_CONCEPT
Algebraic manipulation of limits (factorisation, rationalisation) combined with trigonometric identities (\(\sin^2x+\cos^2x=1\), \(1-\cos x=2\sin^2\frac{x}{2}\), \(\tan x=\frac{\sin x}{\cos x}\)).

## PREREQ_BEFORE
Student must be able to evaluate algebraic limits using factorisation and rationalisation, and must fluently recall and apply Class 10 trigonometric identities.

## PREREQ_STUCK
If stuck, review algebraic limits (c11_math_cbse_13_002) and trigonometric identities (c10_math_cbse_08_006).

## WORKED_EXAMPLE_1
PROBLEM: Evaluate \(\lim_{x \to 0} \frac{\sin 5x}{\tan 3x}\).
STEPS:
- Step 1: Identify the standard limits needed: \(\lim_{x\to0}\frac{\sin 5x}{5x}=1\) and \(\lim_{x\to0}\frac{\tan 3x}{3x}=1\).
- Step 2: Rewrite the expression by multiplying and dividing by appropriate coefficients: \(\frac{\sin 5x}{\tan 3x} = \frac{\sin 5x}{5x} \cdot \frac{3x}{\tan 3x} \cdot \frac{5}{3}\).
- Step 3: Apply the standard limits: \(\lim_{x\to0}\frac{\sin 5x}{5x}=1\), \(\lim_{x\to0}\frac{3x}{\tan 3x}=1\).
- Step 4: Compute the limit: \(1 \times 1 \times \frac{5}{3} = \frac{5}{3}\).
- Step 5: Verify: As \(x\to0\), \(\sin 5x \sim 5x\), \(\tan 3x \sim 3x\), so ratio \(\sim \frac{5x}{3x}=\frac{5}{3}\).
REASONING: The key is to match the argument of each trigonometric function with its denominator to apply the standard limits. Multiplying and dividing by the coefficients achieves this matching.
ANSWER: \(\frac{5}{3}\)

## WORKED_EXAMPLE_2
PROBLEM: Evaluate \(\lim_{x \to 0} \frac{1 - \cos 4x}{x^2}\).
STEPS:
- Step 1: Recall the identity \(1 - \cos \theta = 2\sin^2\frac{\theta}{2}\). Here \(\theta = 4x\), so \(1 - \cos 4x = 2\sin^2 2x\).
- Step 2: Substitute: \(\lim_{x\to0} \frac{2\sin^2 2x}{x^2}\).
- Step 3: Rewrite as \(2 \left(\frac{\sin 2x}{x}\right)^2 = 2 \left(\frac{\sin 2x}{2x} \cdot 2\right)^2\).
- Step 4: Apply standard limit \(\lim_{x\to0}\frac{\sin 2x}{2x}=1\).
- Step 5: Compute: \(2 \times (2 \times 1)^2 = 2 \times 4 = 8\).
- Step 6: Answer: 8.
REASONING: The standard limit \(\frac{1-\cos x}{x}=0\) is not directly helpful for \(x^2\) in the denominator. Using the half-angle identity converts to sine squared, allowing use of \(\frac{\sin x}{x}\) limit.
ANSWER: 8

## WORKED_EXAMPLE_3
PROBLEM: Evaluate \(\lim_{x \to 0} \frac{1 - \cos 2x}{\sin^2 3x}\).
STEPS:
- Step 1: Use identity \(1 - \cos 2x = 2\sin^2 x\).
- Step 2: Expression becomes \(\frac{2\sin^2 x}{\sin^2 3x}\).
- Step 3: Rewrite as \(2 \left(\frac{\sin x}{x}\right)^2 \left(\frac{x}{\sin 3x}\right)^2 = 2 \left(\frac{\sin x}{x}\right)^2 \left(\frac{1}{3} \cdot \frac{3x}{\sin 3x}\right)^2\).
- Step 4: Apply standard limits: \(\frac{\sin x}{x} \to 1\), \(\frac{3x}{\sin 3x} \to 1\).
- Step 5: Compute: \(2 \times 1^2 \times \left(\frac{1}{3} \times 1\right)^2 = 2 \times \frac{1}{9} = \frac{2}{9}\).
- Step 6: Answer: \(\frac{2}{9}\).
REASONING: Converting \(1 - \cos 2x\) to \(2\sin^2 x\) and then using \(\frac{\sin x}{x}\) limit for both numerator and denominator.
ANSWER: \(\frac{2}{9}\)

## COMPETENCY_QUESTION_1
QUESTION: A student claims that \(\lim_{x \to 0} \frac{\sin x^2}{x^2} = 1\) because it is of the form \(\frac{\sin u}{u}\) with \(u = x^2\). Is the student correct? Justify your answer. If correct, explain why the substitution works; if not, give the correct limit.
COMPETENCY: Justifying mathematical reasoning
STEPS:
- Step 1: Recognise that as \(x \to 0\), \(u = x^2 \to 0\).
- Step 2: The limit becomes \(\lim_{u \to 0} \frac{\sin u}{u} = 1\).
- Step 3: The substitution is valid because \(x^2 \to 0\) as \(x \to 0\) and the function \(\frac{\sin u}{u}\) has limit 1 at \(u=0\).
- Step 4: Conclude the student is correct.
ANSWER: The student is correct. Since \(x^2 \to 0\) as \(x \to 0\), we can substitute \(u = x^2\) and use the standard limit \(\lim_{u\to0}\frac{\sin u}{u}=1\).
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Evaluate \(\lim_{x \to 0} \frac{\sin 2x + \sin 4x}{\sin 3x + \sin 5x}\). Explain each step, and verify your answer using the small-angle approximation \(\sin \theta \approx \theta\).
COMPETENCY: Comparing and justifying (using approximation to check)
STEPS:
- Step 1: Divide numerator and denominator by \(x\): \(\frac{\frac{\sin 2x}{x} + \frac{\sin 4x}{x}}{\frac{\sin 3x}{x} + \frac{\sin 5x}{x}}\).
- Step 2: Adjust coefficients: \(\frac{2\frac{\sin 2x}{2x} + 4\frac{\sin 4x}{4x}}{3\frac{\sin 3x}{3x} + 5\frac{\sin 5x}{5x}}\).
- Step 3: Apply standard limits: each \(\frac{\sin kx}{kx} \to 1\).
- Step 4: Limit = \(\frac{2\cdot1 + 4\cdot1}{3\cdot1 + 5\cdot1} = \frac{6}{8} = \frac{3}{4}\).
- Step 5: Verification: For small \(\theta\), \(\sin \theta \approx \theta\). Numerator \(\approx 2x + 4x = 6x\), denominator \(\approx 3x + 5x = 8x\), ratio \(\approx \frac{6}{8} = \frac{3}{4}\).
ANSWER: \(\frac{3}{4}\)
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_7
They can handle composite limits involving sums, products, and quotients of multiple trigonometric functions.

**A wrong answer (only quoting the three standard limits) reveals the student has under-answered the mastery criterion.** Full mastery adds: reduce limits to the standard forms through algebraic manipulation, identities and substitution, and evaluate composite limits built from sums, products and quotients of trigonometric functions.
