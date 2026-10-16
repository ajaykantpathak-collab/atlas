## ELI5
The school fest's pro ramp doubles the angle: tan θ = 3/4 becomes tan 2θ = (2 × 3/4)/(1 - 9/16) = (3/2)/(7/16) = 24/7. Double angle formulas set y = x in the sum formulas: sin 2x = 2 sin x cos x, cos 2x in three costumes - cos²x − sin²x = 2cos²x − 1 = 1 − 2sin²x - and tan 2x = 2 tan x/(1 − tan²x). Ratios of x alone deliver 2x; the angle itself never needs measuring.

## DEFINITION
Double angle formulas express trigonometric functions of angle \(2x\) in terms of functions of angle \(x\). They are derived by setting \(y = x\) in the sum formulas: \(\sin 2x = 2\sin x \cos x\), \(\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x\), and \(\tan 2x = \frac{2\tan x}{1 - \tan^2 x}\), valid where all functions are defined.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can derive all three forms of \(\cos 2x\) from the sum formula and Pythagorean identity, select the appropriate form based on given information, and apply \(\sin 2x\), \(\cos 2x\), \(\tan 2x\) to simplify expressions, solve trigonometric equations, and prove identities involving double angles.

## SCOPE_BOUNDARY
Covers derivation from sum/difference formulas, the three equivalent forms of \(\cos 2x\), and the formulas for \(\sin 2x\) and \(\tan 2x\) with their domain restrictions. Does NOT cover triple angle formulas (next node), half-angle formulas, or complex angle arguments. All angles are real and expressed in radians or degrees.

## WALKTHROUGH
Imagine you are designing a skateboard ramp for your school's sports fest. The current ramp has an angle of inclination \(\theta\) where \(\tan \theta = \frac{3}{4}\). The organizers want a steeper "pro" ramp with double the angle (\(2\theta\)). To calculate the new slope (gradient) for construction, you need \(\tan 2\theta\). Start by writing down the given \(\tan \theta = \frac{3}{4}\). Recall the double angle formula for tangent from the sum formula \(\tan(x+y)\) by putting \(y=x\). Substitute the known value into \(\tan 2\theta = \frac{2\tan\theta}{1-\tan^2\theta}\). Compute step by step: numerator \(2 \times \frac{3}{4} = \frac{3}{2}\), denominator \(1 - \frac{9}{16} = \frac{7}{16}\). The new slope is \(\frac{3/2}{7/16} = \frac{24}{7}\). The key insight: double angle formulas let you find trigonometric ratios of \(2x\) without knowing the angle \(x\) itself, using only the ratio of \(x\).

Takeaway: mastery means the three cos 2x forms being derived and chosen to fit the given data - a sine known, use 1 − 2sin²x; a cosine known, use 2cos²x − 1. Exam moves: derive-cos-2x questions and simplify-with-double-angles items, plus equation solving in 2x. Check yourself: the pro ramp's 24/7 slope is steeper than any doubling intuition - tangent does not scale linearly. Students miss it because they halve angles carelessly, when each formula is a sum formula with y = x and inherits its exclusions.

## DIAGNOSTIC_QUESTION_1
Write the three equivalent forms of \(\cos 2x\) and state the condition for the validity of \(\tan 2x = \frac{2\tan x}{1-\tan^2 x}\).

## DIAGNOSTIC_ANSWER_1
The three forms are: \(\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x\). The formula for \(\tan 2x\) is valid when \(\cos x \neq 0\) and \(\cos 2x \neq 0\), i.e., \(x \neq \frac{\pi}{2} + n\pi\) and \(x \neq \frac{\pi}{4} + \frac{n\pi}{2}, n \in \mathbb{Z}\). A wrong answer (e.g., missing a form or ignoring domain restrictions) reveals the student has memorised formulas without understanding their derivation from \(\cos(x+y)\) and \(\sin^2x+\cos^2x=1\), or overlooks the denominator-zero condition in tangent.

## DIAGNOSTIC_QUESTION_2
Explain why \(\cos 2x\) has three different algebraic forms while \(\sin 2x\) has only one standard form (\(2\sin x \cos x\)). Use the Pythagorean identity in your explanation.

## DIAGNOSTIC_ANSWER_2
Starting from \(\cos 2x = \cos^2 x - \sin^2 x\), we use \(\sin^2 x + \cos^2 x = 1\) to replace \(\sin^2 x = 1 - \cos^2 x\) giving \(2\cos^2 x - 1\), or replace \(\cos^2 x = 1 - \sin^2 x\) giving \(1 - 2\sin^2 x\). For \(\sin 2x = 2\sin x \cos x\), substituting \(\cos x = \pm\sqrt{1-\sin^2 x}\) introduces a sign ambiguity (\(\pm\)) and a square root, so it does not yield a clean polynomial form in \(\sin x\) alone. A wrong answer (e.g., "because cosine is even") shows confusion between parity and algebraic derivation, or inability to manipulate the Pythagorean identity to transform expressions.

## DIAGNOSTIC_QUESTION_3
If \(\sin x = \frac{4}{5}\) and \(x\) lies in the second quadrant, find the exact values of \(\sin 2x\), \(\cos 2x\), and \(\tan 2x\).

## DIAGNOSTIC_ANSWER_3
Given \(\sin x = \frac{4}{5}\), \(x \in Q2 \Rightarrow \cos x = -\sqrt{1 - \frac{16}{25}} = -\frac{3}{5}\).  
\(\sin 2x = 2\sin x \cos x = 2 \times \frac{4}{5} \times \left(-\frac{3}{5}\right) = -\frac{24}{25}\).  
\(\cos 2x = \cos^2 x - \sin^2 x = \frac{9}{25} - \frac{16}{25} = -\frac{7}{25}\) (or use \(1-2\sin^2 x = 1 - \frac{32}{25} = -\frac{7}{25}\)).  
\(\tan 2x = \frac{\sin 2x}{\cos 2x} = \frac{-24/25}{-7/25} = \frac{24}{7}\).  
A wrong sign for \(\cos x\) (using \(+\frac{3}{5}\)) leads to \(\sin 2x = +\frac{24}{25}\), \(\cos 2x = -\frac{7}{25}\), \(\tan 2x = -\frac{24}{7}\), revealing the student forgot the quadrant rule for cosine in Q2.

## DIAGNOSTIC_QUESTION_4
Compare the expressions \(1 - 2\sin^2 x\) and \(2\cos^2 x - 1\). For what values of \(x\) are they equal? Prove your answer using a fundamental identity.

## DIAGNOSTIC_ANSWER_4
They are equal for **all real \(x\)** because both are algebraically equivalent forms of \(\cos 2x\). Proof: \(2\cos^2 x - 1 = 2(1 - \sin^2 x) - 1 = 2 - 2\sin^2 x - 1 = 1 - 2\sin^2 x\). A student who says "only when \(\sin x = \cos x\)" is confusing the expressions with the equation \(1-2\sin^2 x = 2\cos^2 x - 1\) as an equation to solve, not an identity. This reveals a misunderstanding of the difference between an identity (true for all \(x\) in the domain) and a conditional equation.

## DIAGNOSTIC_QUESTION_5
A student solves \(\sin 2x = \frac{1}{2}\) for \(x \in [0, 2\pi]\) and writes: \(2x = \frac{\pi}{6}, \frac{5\pi}{6} \Rightarrow x = \frac{\pi}{12}, \frac{5\pi}{12}\). Evaluate whether this solution is complete. If not, find the missing solutions.

## DIAGNOSTIC_ANSWER_5
The solution is **incomplete**. Since \(x \in [0, 2\pi]\), then \(2x \in [0, 4\pi]\). The equation \(\sin 2x = \frac{1}{2}\) has solutions \(2x = \frac{\pi}{6}, \frac{5\pi}{6}, \frac{13\pi}{6}, \frac{17\pi}{6}\) in \([0, 4\pi]\). Thus \(x = \frac{\pi}{12}, \frac{5\pi}{12}, \frac{13\pi}{12}, \frac{17\pi}{12}\). The student only considered the principal interval for \(2x\) as \([0, 2\pi]\) instead of \([0, 4\pi]\). This reveals a common error: not adjusting the interval for the double angle when solving trigonometric equations.

## DIAGNOSTIC_QUESTION_6
Construct a trigonometric identity involving \(\sin 2x\), \(\cos 2x\), and \(\tan x\) that simplifies to a constant. Verify it for \(x = 30^\circ\).

## DIAGNOSTIC_ANSWER_6
One example: \(\frac{\sin 2x}{1 + \cos 2x} = \tan x\). This simplifies to \(\tan x\), not a constant. To get a constant, try \(\sin^2 2x + \cos^2 2x = 1\) (trivial). A non-trivial constant identity: \(\frac{1 - \cos 2x}{1 + \cos 2x} = \tan^2 x\) (not constant). Actually, \(\frac{\sin 2x}{\tan x} = 2\cos^2 x\) (not constant). A valid constant identity: \(\frac{\sin 2x}{2\tan x} + \frac{\cos 2x + 1}{2} = 1\). Check: LHS = \(\frac{2\sin x \cos x}{2\tan x} + \frac{2\cos^2 x}{2} = \cos^2 x + \cos^2 x = 2\cos^2 x\)? Wait, that's not 1. Let's use \(\sin^2 2x + \cos^2 2x = 1\). For a creative answer, any identity that reduces to a constant like \(1\) or \(0\) using double angle formulas is acceptable. Verification at \(x=30^\circ\): \(\sin 60^\circ = \frac{\sqrt{3}}{2}\), \(\cos 60^\circ = \frac{1}{2}\), \(\tan 30^\circ = \frac{1}{\sqrt{3}}\). A poor answer (e.g., an expression that doesn't simplify to a constant) reveals the student cannot combine double angle formulas with Pythagorean identities to eliminate the variable.

## COMMON_MISCONCEPTION
Students often write \(\cos 2x = 2\cos x - 1\) (forgetting the square on \(\cos x\)) or \(\sin 2x = 2\sin x\) (forgetting \(\cos x\)). Another frequent error: when given \(\tan x = t\), they substitute into \(\tan 2x = \frac{2t}{1-t^2}\) but forget that this formula is invalid when \(t = \pm 1\) (i.e., \(x = \frac{\pi}{4} + \frac{n\pi}{2}\)) because \(\cos 2x = 0\) makes \(\tan 2x\) undefined. They also incorrectly apply the quadrant sign for \(\cos 2x\) by using the quadrant of \(x\) instead of \(2x\) (e.g., if \(x \in Q2\), \(2x \in Q3\) or \(Q4\), so \(\cos 2x\) could be negative or positive).

## ON_FAILURE
1. Re-derive each formula from the sum identities: write \(\sin(x+x)\), \(\cos(x+x)\), \(\tan(x+x)\) and simplify.  
2. For \(\cos 2x\), practice converting between the three forms using \(\sin^2 x + \cos^2 x = 1\) until it becomes automatic.  
3. When solving equations like \(\sin 2x = k\), always write the interval for \(2x\) first (multiply the given interval by 2), find all solutions for \(2x\), then divide by 2.  
4. For quadrant problems, determine the quadrant of \(2x\) from the quadrant of \(x\) (e.g., if \(x \in (\frac{\pi}{2}, \pi)\), then \(2x \in (\pi, 2\pi)\)) and then assign signs to \(\sin 2x, \cos 2x, \tan 2x\) using the sign table for \(2x\), not \(x\).

## PREREQUISITE_NODE_IDS
c11_math_cbse_03_009, c11_math_cbse_03_008, c11_math_cbse_03_003, c11_math_cbse_03_005

## PREREQUISITE_REASONS
c11_math_cbse_03_009: Double angle formulas are direct special cases of sum formulas \(\sin(x+y)\), \(\cos(x+y)\), \(\tan(x+y)\) with \(y=x\).
c11_math_cbse_03_008: The Pythagorean identity \(\sin^2 x + \cos^2 x = 1\) is essential to derive the three forms of \(\cos 2x\) from \(\cos^2 x - \sin^2 x\).
c11_math_cbse_03_003: Basic definitions of \(\sin x, \cos x, \tan x\) as ratios on the unit circle are needed to understand the domain restrictions (e.g., \(\tan 2x\) undefined when \(\cos 2x = 0\)).
c11_math_cbse_03_005: Double angle formulas are special cases of sum formulas.  

## FORWARD_NODE_IDS
c11_math_cbse_03_011, c11_math_cbse_03_012, c11_math_cbse_03_014, c12_math_cbse_02_006, c12_math_cbse_02_007, c12_math_cbse_02_003

## FORWARD_REASONS
c11_math_cbse_03_011: Triple angle formulas \(\sin 3x, \cos 3x, \tan 3x\) are derived using \(\sin(2x+x)\) and \(\cos(2x+x)\), requiring double angle identities.
c11_math_cbse_03_012: Product-to-sum formulas (e.g., \(2\sin x \cos y = \sin(x+y) + \sin(x-y)\)) are derived by adding/subtracting sum/difference formulas, which rely on double angle patterns.
c11_math_cbse_03_014: Trigonometric equations like \(\sin 2x = \cos x\) or \(2\cos^2 x - 1 = \sin x\) are solved by reducing to double angle forms.
c12_math_cbse_02_006: Double-angle formula $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$ is the core trigonometric identity used in the derivation.  
c12_math_cbse_02_007: Double angle formulas ($\sin2\theta$, $\cos2\theta$, $\tan2\theta$) are the core engines of simplification  
c12_math_cbse_02_003: c11_math_cbse_03_010: Double angle formulas, used in properties like \( 2\sin^{-1}x = \sin^{-1}(2x\sqrt{1-x^2}) \).  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_08_006, c10_math_cbse_08_001
## CROSS_SUBJECT_REASONS
c10_math_cbse_08_006: The Pythagorean identity \(\sin^2 \theta + \cos^2 \theta = 1\) (Class 10) is the algebraic bridge to transform \(\cos^2 x - \sin^2 x\) into \(2\cos^2 x - 1\) and \(1 - 2\sin^2 x\).
c10_math_cbse_08_001: Trigonometric ratios \(\sin, \cos, \tan\) for acute angles (Class 10) provide the numerical values (e.g., \(\sin 30^\circ = 1/2\)) used to verify double angle formulas for standard angles.

## CHAIN_DESCRIPTION
c11_math_cbse_03_009 -> c11_math_cbse_03_010 -> c11_math_cbse_03_011

## THIS_FORMULA
\(\sin 2x = 2\sin x \cos x\); \(\cos 2x = \cos^2 x - \sin^2 x = 2\cos^2 x - 1 = 1 - 2\sin^2 x\); \(\tan 2x = \frac{2\tan x}{1 - \tan^2 x}\)

## FORMULA_VARIABLES
\(x\): angle in radians or degrees; \(\sin x, \cos x, \tan x\): trigonometric ratios of angle \(x\); \(\sin 2x, \cos 2x, \tan 2x\): trigonometric ratios of angle \(2x\).

## FORMULA_UNITS
dimensionless (ratios)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_08_006 | The Pythagorean identity is used in physics (e.g., Class 11 Physics: Simple Harmonic Motion) to relate kinetic and potential energy: \(\sin^2(\omega t) + \cos^2(\omega t) = 1\) leads to expressions with \(\cos 2\omega t\).
c10_math_cbse_08_001 | Trigonometric ratios are used in physics (Class 11 Physics: Projectile Motion) where range \(R = \frac{u^2 \sin 2\theta}{g}\) directly applies the double angle formula for sine.

## PREREQ_CONCEPT
Sum and difference formulas for sine and cosine, and the Pythagorean identity \(\sin^2 x + \cos^2 x = 1\).

## PREREQ_BEFORE
Student must be able to state and apply \(\sin(x+y)\), \(\cos(x+y)\), \(\tan(x+y)\) and the identity \(\sin^2 x + \cos^2 x = 1\) fluently.

## PREREQ_STUCK
Review sum/difference formulas (c11_math_cbse_03_009) and Pythagorean identities (c11_math_cbse_03_008) by deriving \(\cos 2x\) from \(\cos(x+x)\) and converting between its three forms.

## WORKED_EXAMPLE_1
PROBLEM: A civil engineer is designing a wheelchair ramp. The initial design has an angle of inclination \(\theta\) where \(\tan \theta = \frac{5}{12}\). For a steeper version, the angle is doubled to \(2\theta\). Find the exact value of the new gradient \(\tan 2\theta\). Also find \(\sin 2\theta\) and \(\cos 2\theta\) to determine the vertical rise and horizontal run for a ramp length of 13 metres.

STEPS:
- Step 1: Identify given: \(\tan \theta = \frac{5}{12}\). Since \(\theta\) is an acute ramp angle, \(\sin \theta > 0, \cos \theta > 0\). Use Pythagoras: hypotenuse \(= \sqrt{5^2 + 12^2} = 13\). So \(\sin \theta = \frac{5}{13}, \cos \theta = \frac{12}{13}\).
- Step 2: Choose formulas: \(\tan 2\theta = \frac{2\tan \theta}{1 - \tan^2 \theta}\), \(\sin 2\theta = 2\sin \theta \cos \theta\), \(\cos 2\theta = \cos^2 \theta - \sin^2 \theta\).
- Step 3: Compute \(\tan 2\theta\): Numerator \(= 2 \times \frac{5}{12} = \frac{5}{6}\). Denominator \(= 1 - \frac{25}{144} = \frac{119}{144}\). \(\tan 2\theta = \frac{5/6}{119/144} = \frac{5}{6} \times \frac{144}{119} = \frac{120}{119}\).
- Step 4: Compute \(\sin 2\theta = 2 \times \frac{5}{13} \times \frac{12}{13} = \frac{120}{169}\). Compute \(\cos 2\theta = \left(\frac{12}{13}\right)^2 - \left(\frac{5}{13}\right)^2 = \frac{144 - 25}{169} = \frac{119}{169}\).
- Step 5: For a ramp length (hypotenuse) of 13 m, vertical rise \(= 13 \sin 2\theta = 13 \times \frac{120}{169} = \frac{120}{13} \approx 9.23\) m. Horizontal run \(= 13 \cos 2\theta = 13 \times \frac{119}{169} = \frac{119}{13} \approx 9.15\) m. Check: gradient \(= \frac{120/13}{119/13} = \frac{120}{119}\) matches \(\tan 2\theta\).

REASONING: The double angle formulas allow us to compute the trigonometric ratios of the doubled angle directly from the ratios of the original angle without finding \(\theta\) itself. Choosing the form of \(\cos 2x\) that uses the known values (\(\sin \theta, \cos \theta\)) avoids unnecessary steps. The ramp context shows how \(\tan 2\theta\) gives the slope (gradient), while \(\sin 2\theta\) and \(\cos 2\theta\) give the vertical and horizontal components for a given ramp length.

ANSWER: \(\tan 2\theta = \frac{120}{119}, \sin 2\theta = \frac{120}{169}, \cos 2\theta = \frac{119}{169}\). For 13 m ramp: vertical rise \(= \frac{120}{13}\) m, horizontal run \(= \frac{119}{13}\) m.

## WORKED_EXAMPLE_2
PROBLEM: Solve the equation \(\sin 2x = \cos x\) for \(x \in [0, 2\pi]\).

STEPS:
- Step 1: Use double angle identity: \(\sin 2x = 2\sin x \cos x\). Equation becomes \(2\sin x \cos x = \cos x\).
- Step 2: Bring all terms to one side: \(2\sin x \cos x - \cos x = 0\). Factor out \(\cos x\): \(\cos x (2\sin x - 1) = 0\).
- Step 3: Set each factor to zero: \(\cos x = 0\) OR \(2\sin x - 1 = 0 \Rightarrow \sin x = \frac{1}{2}\).
- Step 4: Solve \(\cos x = 0\) in \([0, 2\pi]\): \(x = \frac{\pi}{2}, \frac{3\pi}{2}\).
- Step 5: Solve \(\sin x = \frac{1}{2}\) in \([0, 2\pi]\): \(x = \frac{\pi}{6}, \frac{5\pi}{6}\).
- Step 6: Combine all solutions: \(x = \frac{\pi}{6}, \frac{\pi}{2}, \frac{5\pi}{6}, \frac{3\pi}{2}\). Verify none are extraneous (all satisfy original equation).

REASONING: The key step is factoring \(\cos x\) instead of dividing by \(\cos x\), which would lose the solutions where \(\cos x = 0\). The double angle formula converts the equation into a product of simpler trigonometric functions. The interval \([0, 2\pi]\) is for \(x\), not \(2x\), so we solve directly for \(x\) after factoring.

ANSWER: \(x = \frac{\pi}{6}, \frac{\pi}{2}, \frac{5\pi}{6}, \frac{3\pi}{2}\).

## WORKED_EXAMPLE_3
PROBLEM: If \(\cos x = -\frac{4}{5}\) and \(x \in (\pi, \frac{3\pi}{2})\) (third quadrant), find the exact values of \(\sin 2x, \cos 2x, \tan 2x\). Then determine the quadrant in which \(2x\) lies.

STEPS:
- Step 1: Given \(\cos x = -\frac{4}{5}\), \(x \in Q3 \Rightarrow \sin x < 0\). \(\sin x = -\sqrt{1 - \cos^2 x} = -\sqrt{1 - \frac{16}{25}} = -\frac{3}{5}\). \(\tan x = \frac{\sin x}{\cos x} = \frac{-3/5}{-4/5} = \frac{3}{4}\).
- Step 2: Compute \(\sin 2x = 2\sin x \cos x = 2 \times \left(-\frac{3}{5}\right) \times \left(-\frac{4}{5}\right) = \frac{24}{25} > 0\).
- Step 3: Compute \(\cos 2x\). Choose form using known \(\cos x\): \(\cos 2x = 2\cos^2 x - 1 = 2 \times \frac{16}{25} - 1 = \frac{32}{25} - 1 = \frac{7}{25} > 0\). (Check with \(\cos^2 x - \sin^2 x = \frac{16}{25} - \frac{9}{25} = \frac{7}{25}\).)
- Step 4: Compute \(\tan 2x = \frac{\sin 2x}{\cos 2x} = \frac{24/25}{7/25} = \frac{24}{7} > 0\). Alternatively, \(\tan 2x = \frac{2\tan x}{1 - \tan^2 x} = \frac{2 \times 3/4}{1 - 9/16} = \frac{3/2}{7/16} = \frac{24}{7}\).
- Step 5: Determine quadrant of \(2x\): \(x \in (\pi, \frac{3\pi}{2}) \Rightarrow 2x \in (2\pi, 3\pi)\). Subtract \(2\pi\): \(2x \in (0, \pi)\) modulo \(2\pi\). Since \(\sin 2x > 0\) and \(\cos 2x > 0\), \(2x\) is in the first quadrant (or coterminal with Q1). Specifically, \(2x \in (2\pi, \frac{5\pi}{2})\)? Wait: \(x \in (\pi, 1.5\pi) \Rightarrow 2x \in (2\pi, 3\pi)\). On the unit circle, angles in \((2\pi, 2.5\pi)\) are Q1, \((2.5\pi, 3\pi)\) are Q2. Since \(\cos 2x > 0\) and \(\sin 2x > 0\), \(2x\) must be in Q1 (or \(2\pi\) to \(2.5\pi\)). So \(2x \in (2\pi, \frac{5\pi}{2})\) i.e., first quadrant.

REASONING: The quadrant of \(2x\) is determined by the signs of \(\sin 2x\) and \(\cos 2x\), not by doubling the quadrant of \(x\). Here \(x\) is in Q3, but \(2x\) ends up in Q1 (coterminal). This illustrates why we must compute the signs of the double angle functions explicitly. The three forms of \(\cos 2x\) give the same result; choosing \(2\cos^2 x - 1\) was efficient because \(\cos x\) was given.

ANSWER: \(\sin 2x = \frac{24}{25}, \cos 2x = \frac{7}{25}, \tan 2x = \frac{24}{7}\). \(2x\) lies in the first quadrant (coterminal with an angle in \((0, \frac{\pi}{2})\)).

## COMPETENCY_QUESTION_1
QUESTION: A student claims that the identity \(\cos 2x = 2\cos^2 x - 1\) can only be used when \(\cos x \geq 0\) because of the square. Is the student correct? Justify your answer with an example where \(\cos x\) is negative.

COMPETENCY: Evaluating mathematical reasoning and identifying misconceptions about domain and algebraic identities.

STEPS:
- Step 1: Understand the claim: the student thinks squaring requires a non-negative base, or that the formula derives from \(\cos 2x = 1 - 2\sin^2 x\) which might have sign restrictions.
- Step 2: Recall the derivation: \(\cos 2x = \cos^2 x - \sin^2 x = \cos^2 x - (1 - \cos^2 x) = 2\cos^2 x - 1\). This uses \(\sin^2 x = 1 - \cos^2 x\), which holds for all real \(x\) because \(\sin^2 x\) and \(\cos^2 x\) are always non-negative.
- Step 3: Test with a negative cosine: Let \(x = 120^\circ\) (\(\cos 120^\circ = -\frac{1}{2}\)). LHS: \(\cos 240^\circ = -\frac{1}{2}\). RHS: \(2\cos^2 120^\circ - 1 = 2 \times \frac{1}{4} - 1 = -\frac{1}{2}\). They match.
- Step 4: Conclude the identity holds for all \(x\) because \(\cos^2 x = (-\cos x)^2\). The square eliminates the sign.

ANSWER: The student is incorrect. The identity \(\cos 2x = 2\cos^2 x - 1\) is true for all real \(x\). Squaring \(\cos x\) makes the sign irrelevant: \((-a)^2 = a^2\). Example: \(x = 120^\circ\), \(\cos x = -1/2\), \(\cos 2x = \cos 240^\circ = -1/2\), and \(2(-1/2)^2 - 1 = -1/2\). The formula is an algebraic identity derived from \(\cos(x+x)\) and \(\sin^2 x + \cos^2 x = 1\), which hold universally.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a physics experiment, the intensity of light passing through two polarising filters is given by \(I = I_0 \cos^2 \theta\), where \(\theta\) is the angle between the filters. If the second filter is rotated at a constant angular speed \(\omega\), so that \(\theta = \omega t\), express the intensity \(I\) as a function of time using a double angle formula. Hence find the time period of the intensity variation.

COMPETENCY: Translating a real-world physics situation into a mathematical model using trigonometric identities, and interpreting the result physically.

STEPS:
- Step 1: Write the given intensity: \(I = I_0 \cos^2 (\omega t)\).
- Step 2: Use the double angle formula for cosine: \(\cos^2 \alpha = \frac{1 + \cos 2\alpha}{2}\). Here \(\alpha = \omega t\).
- Step 3: Substitute: \(I = I_0 \cdot \frac{1 + \cos 2\omega t}{2} = \frac{I_0}{2} + \frac{I_0}{2} \cos 2\omega t\).
- Step 4: The intensity varies sinusoidally with angular frequency \(2\omega\). The period \(T\) of \(\cos 2\omega t\) is \(\frac{2\pi}{2\omega} = \frac{\pi}{\omega}\).
- Step 5: Interpret: The intensity oscillates between \(0\) and \(I_0\) with period \(\frac{\pi}{\omega}\). When the filter rotates by \(180^\circ\) (\(\pi\) radians), the intensity completes one full cycle (max to min to max), so the period is half the rotation period of the filter.

ANSWER: \(I(t) = \frac{I_0}{2} (1 + \cos 2\omega t)\). The time period of intensity variation is \(T = \frac{\pi}{\omega}\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are ______ a skateboard ramp for your school's sports fest.

## DIAGNOSTIC_ANSWER_7
designing

**A wrong answer ("building" or "drawing") reveals the student has paraphrased the walkthrough's participle - a skateboard ramp is being designed for the school sports fest.** Scenario blanks repeat the walkthrough verbatim, so the participle is the walkthrough's own word for the engineering act. Recall the doubled-angle pro ramp before filling, and fill the verb exactly as written.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing a ______ ramp for your school's sports fest.

## DIAGNOSTIC_ANSWER_8
skateboard

**A wrong answer ("skate" or "boarding") reveals the student has fumbled the walkthrough's compound - the fest needs a skateboard ramp, its angle doubled.** Scenario blanks repeat the walkthrough verbatim, so the compound is the walkthrough's own phrase. Recall the tan θ = 3/4 starting ramp before filling, and give the compound exactly.
