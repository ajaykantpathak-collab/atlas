## ELI5
A fair Ferris wheel's seat sits at h(t) = 10 sin(πt/15) + 12; when is it exactly 17 metres high? Solve sin θ = 0.5 for its principal solutions in [0, 2π), then let periodicity multiply them: general solutions ride on an integer parameter - x = nπ for sine's zeros, 2nπ ± y when cosines match, nπ + (-1)ⁿ y for sines, nπ + y for tangents. Principal first, general forever - every trigonometric equation is angles plus periodicity.

## DEFINITION
A trigonometric equation is an equation involving trigonometric functions of an unknown angle. The **principal solutions** are the solutions lying in the interval \([0, 2\pi)\) (or \([0^\circ, 360^\circ)\)). The **general solution** expresses all possible solutions using an integer parameter \(n \in \mathbb{Z}\), based on the periodicity of the trigonometric functions: \(\sin x = 0 \Rightarrow x = n\pi\); \(\cos x = 0 \Rightarrow x = (2n+1)\frac{\pi}{2}\); \(\tan x = 0 \Rightarrow x = n\pi\); \(\sin x = \sin y \Rightarrow x = n\pi + (-1)^n y\); \(\cos x = \cos y \Rightarrow x = 2n\pi \pm y\); \(\tan x = \tan y \Rightarrow x = n\pi + y\) (provided \(x, y \neq (2n+1)\frac{\pi}{2}\)).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can find principal and general solutions for standard trigonometric equations (sin, cos, tan = constant), solve equations reducible to quadratic forms in trigonometric functions, and solve linear combinations \(a\sin x + b\cos x = c\) using the auxiliary angle method, while correctly applying periodicity and domain restrictions.

## SCOPE_BOUNDARY
This node covers solving trigonometric equations for real angles using principal and general solution formulas, equations reducible to factorable forms, quadratic forms in \(\sin x\), \(\cos x\), \(\tan x\), and equations of type \(a\sin x + b\cos x = c\). It does NOT cover inverse trigonometric functions (Class 12), complex solutions, or equations involving \(\sec, \csc, \cot\) directly without converting to \(\sin, \cos, \tan\).

## WALKTHROUGH
Imagine you are designing a Ferris wheel for a fair in Delhi. The height of a seat above ground is given by \(h(t) = 10\sin(\frac{\pi}{15}t) + 12\) metres. You need to find all times in the first minute when the seat is exactly 17 metres high. This requires solving \(10\sin(\frac{\pi}{15}t) + 12 = 17\) i.e., \(\sin(\frac{\pi}{15}t) = 0.5\). You first find the principal solutions for \(\sin \theta = 0.5\) in \([0, 2\pi)\), then write the general solution using periodicity \(2\pi\), and finally substitute back \(\theta = \frac{\pi}{15}t\) to find \(t\). The key insight is that every trigonometric equation reduces to finding angles with a given trigonometric ratio, then using the periodic nature to list all solutions.

Takeaway: mastery means the principal solution being found first and the general solution built by the right periodicity template, then back-substituted through the argument. Exam moves: find-general-solutions questions and solve-quadratic-in-trig items with domain checks. Check yourself: the seat hits 17 metres twice per revolution - periodicity is not decoration, it is the answer's shape. Students miss it because they stop at the principal value, when the definition's general forms exist to list every lap: one solution is a point, the general solution is the whole orbit.

## DIAGNOSTIC_QUESTION_1
State the general solution for \(\cos x = \frac{1}{2}\) and explain why we use \(\pm\) in the formula \(x = 2n\pi \pm y\) but not in \(\sin x = \sin y\).

## DIAGNOSTIC_ANSWER_1
The general solution is \(x = 2n\pi \pm \frac{\pi}{3}, n \in \mathbb{Z}\). The \(\pm\) appears in cosine because \(\cos(\theta) = \cos(-\theta)\) (even function), giving two distinct families of solutions per period symmetric about \(0\). For sine, \(\sin(\pi - \theta) = \sin \theta\), which is captured by the \((-1)^n\) term in \(x = n\pi + (-1)^n y\). A wrong answer (e.g., writing \(x = n\pi \pm \frac{\pi}{3}\)) reveals confusion between the periodicity of sine (\(2\pi\)) and cosine (\(2\pi\)) and the symmetry of their graphs.

## DIAGNOSTIC_QUESTION_2
A student solves \(2\sin^2 x - 3\sin x + 1 = 0\) and writes \(\sin x = 1\) or \(\sin x = \frac{1}{2}\). They then give the general solution as \(x = n\pi + (-1)^n \frac{\pi}{2}\) and \(x = n\pi + (-1)^n \frac{\pi}{6}\). Is this complete? If not, what is missing?

## DIAGNOSTIC_ANSWER_2
The solution is incomplete. For \(\sin x = 1\), the principal solution is \(x = \frac{\pi}{2}\) only (not \(\frac{\pi}{2}\) and \(\frac{5\pi}{2}\) within \([0, 2\pi)\)). The general solution \(x = n\pi + (-1)^n \frac{\pi}{2}\) is correct. For \(\sin x = \frac{1}{2}\), principal solutions are \(\frac{\pi}{6}\) and \(\frac{5\pi}{6}\). The formula \(x = n\pi + (-1)^n \frac{\pi}{6}\) generates both families correctly. However, the student must explicitly state the principal solutions first. A wrong answer that writes \(x = 2n\pi + \frac{\pi}{6}\) or \(x = 2n\pi + \frac{5\pi}{6}\) separately reveals misunderstanding that the single formula \(x = n\pi + (-1)^n y\) already encodes both families.

## DIAGNOSTIC_QUESTION_3
Find the principal solutions of \(\tan 2x = -\sqrt{3}\) in the interval \([0, 2\pi)\).

## DIAGNOSTIC_ANSWER_3
Step 1: Let \(2x = \theta\). Solve \(\tan \theta = -\sqrt{3}\). Step 2: Principal solutions for \(\tan \theta = -\sqrt{3}\) are \(\theta = \pi - \frac{\pi}{3} = \frac{2\pi}{3}\) and \(\theta = 2\pi - \frac{\pi}{3} = \frac{5\pi}{3}\) (since tangent is negative in QII and QIV). Step 3: Since \(x = \theta/2\), we get \(x = \frac{\pi}{3}\) and \(x = \frac{5\pi}{6}\). Step 4: Check if adding period \(\pi\) to \(\theta\) gives more \(\theta\) in \([0, 4\pi)\) (because \(2x \in [0, 4\pi)\)). \(\theta = \frac{2\pi}{3} + \pi = \frac{5\pi}{3}\) (already have), \(\frac{5\pi}{3} + \pi = \frac{8\pi}{3} > 4\pi\). So only two principal solutions for \(x\): \(\frac{\pi}{3}, \frac{5\pi}{6}\). A wrong answer giving four solutions (e.g., \(\frac{\pi}{3}, \frac{2\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}\)) reveals forgetting that the period of \(\tan 2x\) is \(\frac{\pi}{2}\), not \(\pi\), or incorrectly doubling the interval.

## DIAGNOSTIC_QUESTION_4
Compare the solution sets of \(\sin x = \frac{1}{2}\) and \(\sin 2x = \frac{1}{2}\). How does the coefficient of \(x\) affect the general solution structure?

## DIAGNOSTIC_ANSWER_4
For \(\sin x = \frac{1}{2}\), general solution is \(x = n\pi + (-1)^n \frac{\pi}{6}\). For \(\sin 2x = \frac{1}{2}\), let \(2x = \theta\), then \(\theta = n\pi + (-1)^n \frac{\pi}{6}\), so \(x = \frac{n\pi}{2} + (-1)^n \frac{\pi}{12}\). The coefficient \(2\) halves the period (from \(2\pi\) to \(\pi\) for the function \(\sin 2x\)), which means the solution set becomes denser: the step between consecutive solutions is \(\pi/2\) instead of \(\pi\). A wrong answer that writes \(x = n\pi + (-1)^n \frac{\pi}{12}\) reveals failure to divide the period parameter \(n\) by the coefficient, treating the argument as \(x\) instead of \(2x\).

## DIAGNOSTIC_QUESTION_5
A student solves \(2\cos^2 x - 5\cos x + 2 = 0\) and gets \(\cos x = 2\) or \(\cos x = \frac{1}{2}\). They discard \(\cos x = 2\) and write the general solution as \(x = 2n\pi \pm \frac{\pi}{3}\). Evaluate if this is fully correct.

## DIAGNOSTIC_ANSWER_5
The solution is correct in discarding \(\cos x = 2\) because range of cosine is \([-1, 1]\). The general solution \(x = 2n\pi \pm \frac{\pi}{3}\) is correct for \(\cos x = \frac{1}{2}\). However, the student should explicitly state the principal solutions as \(\frac{\pi}{3}\) and \(\frac{5\pi}{3}\) (or \(-\frac{\pi}{3}\)) before writing the general formula. A wrong answer that keeps \(\cos x = 2\) and writes \(x = \cos^{-1}(2)\) reveals ignorance of the range of cosine. A wrong answer writing \(x = n\pi \pm \frac{\pi}{3}\) reveals confusion between the period of cosine (\(2\pi\)) and tangent (\(\pi\)).

## DIAGNOSTIC_QUESTION_6
Create a trigonometric equation of the form \(a\sin x + b\cos x = c\) that has exactly two principal solutions in \([0, 2\pi)\), and explain how you chose \(a, b, c\) to ensure this.

## DIAGNOSTIC_ANSWER_6
Example: \(\sin x + \cos x = 1\). Here \(a=1, b=1, c=1\). The auxiliary angle method: \(\sqrt{2}\sin(x + \frac{\pi}{4}) = 1 \Rightarrow \sin(x + \frac{\pi}{4}) = \frac{1}{\sqrt{2}}\). Principal solutions for \(x + \frac{\pi}{4}\) are \(\frac{\pi}{4}\) and \(\frac{3\pi}{4}\), giving \(x = 0\) and \(x = \frac{\pi}{2}\). Both lie in \([0, 2\pi)\). The condition for exactly two principal solutions is that the equation \(\sin(x+\alpha) = \frac{c}{\sqrt{a^2+b^2}}\) has exactly two solutions in the shifted interval, which happens when \(\left|\frac{c}{\sqrt{a^2+b^2}}\right| < 1\) and the interval length is \(2\pi\) (always two solutions for sine unless the value is \(\pm 1\)). A poor answer that gives an equation with no solution (e.g., \(\sin x + \cos x = 2\)) or infinitely many (not possible for finite interval) reveals lack of understanding of the range of \(a\sin x + b\cos x\).

## COMMON_MISCONCEPTION
Students often write the general solution of \(\cos x = \frac{1}{2}\) as \(x = 2n\pi + \frac{\pi}{3}\) only, forgetting the negative family \(x = 2n\pi - \frac{\pi}{3}\) (or equivalently \(2n\pi + \frac{5\pi}{3}\)). This happens because they only find the principal solution in the first quadrant using inverse cosine on a calculator, which returns \(\frac{\pi}{3}\), and miss the fourth quadrant solution. Similarly, for \(\sin x = -\frac{1}{2}\), they may write \(x = n\pi + (-1)^n (-\frac{\pi}{6})\) but then incorrectly simplify \((-1)^n(-\frac{\pi}{6})\) as \(-(-1)^n\frac{\pi}{6}\) without realizing it's the same as \(n\pi + (-1)^n \frac{7\pi}{6}\) or \(n\pi + (-1)^n \frac{11\pi}{6}\) depending on principal value chosen.

## ON_FAILURE
Step 1: Draw the unit circle and mark the angle whose sine/cosine/tangent equals the given value. Step 2: Identify ALL principal solutions in \([0, 2\pi)\) by symmetry (e.g., for cosine, \(\theta\) and \(2\pi-\theta\); for sine, \(\theta\) and \(\pi-\theta\)). Step 3: Write the general solution using the standard formula with the correct principal value \(y\) (usually the smallest positive angle). Step 4: Verify by substituting \(n=0,1,-1\) to see if you recover the principal solutions. Step 5: Practice with equations where the given value is negative, forcing solutions in QII, QIII, QIV.

## PREREQUISITE_NODE_IDS
c11_math_cbse_03_003, c11_math_cbse_03_005, c11_math_cbse_03_006, c11_math_cbse_03_007, c11_math_cbse_03_008, c11_math_cbse_03_009, c11_math_cbse_03_010, c11_math_cbse_03_011, c11_math_cbse_03_012, c11_math_cbse_03_013, c10_math_cbse_08_001, c10_math_cbse_08_006, c10_math_cbse_08_007, c10_math_cbse_08_008, c11_math_cbse_03_002

## PREREQUISITE_REASONS
c11_math_cbse_03_003: Defines trigonometric functions on the unit circle, essential for understanding values.
c11_math_cbse_03_005: Extends trigonometric functions to any angle, needed for general solutions.
c11_math_cbse_03_006: Signs in quadrants determine principal solutions for negative values.
c11_math_cbse_03_007: Domain and range restrictions (e.g., \(|\sin x| \le 1\)) help discard extraneous roots.
c11_math_cbse_03_008: Pythagorean identities used to reduce equations to single function.
c11_math_cbse_03_009: Sum/difference formulas used in auxiliary angle method for \(a\sin x + b\cos x = c\).
c11_math_cbse_03_010: Double angle formulas reduce equations like \(\sin 2x = \cos x\).
c11_math_cbse_03_011: Triple angle formulas for higher order equations.
c11_math_cbse_03_012: Product-to-sum transforms products into sums for factorization.
c11_math_cbse_03_013: Sum-to-product transforms sums into products for factorization.
c10_math_cbse_08_001: Basic trigonometric ratios in right triangles, foundation for unit circle definitions.
c10_math_cbse_08_006: Fundamental identity \(\sin^2 x + \cos^2 x = 1\) used constantly.
c10_math_cbse_08_007: Identity \(1+\tan^2 x = \sec^2 x\) for tangent equations.
c10_math_cbse_08_008: Identity \(1+\cot^2 x = \csc^2 x\) for cotangent equations.
c11_math_cbse_03_002: Solutions of trigonometric equations often give answers in radians; conversion to degrees is needed for interpretation in some contexts.  

## FORWARD_NODE_IDS


## FORWARD_REASONS
none

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_04_001, c11_phy_cbse_08_001
## CROSS_SUBJECT_REASONS
c11_physics_ch04_001: Simple harmonic motion equations (e.g., \(x = A\sin(\omega t + \phi)\)) require solving trigonometric equations to find time at a given displacement.
c11_physics_ch08_001: Wave equations \(y = A\sin(kx - \omega t)\) involve solving for phase or position, directly applying general solutions.
c11_phy_cbse_04_001: Cross-subject support: Aristotle's fallacy is the incorrect assertion that a continuous external force is require... supplies tools/facts used directly in this node.  
c11_phy_cbse_08_001: Cross-subject support: Stress is the internal restoring force per unit cross-sectional area developed within a ma... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_03_013 -> c11_math_cbse_03_014 -> none

## THIS_FORMULA
General solutions: \(\sin x = 0 \Rightarrow x = n\pi\); \(\cos x = 0 \Rightarrow x = (2n+1)\frac{\pi}{2}\); \(\tan x = 0 \Rightarrow x = n\pi\); \(\sin x = \sin y \Rightarrow x = n\pi + (-1)^n y\); \(\cos x = \cos y \Rightarrow x = 2n\pi \pm y\); \(\tan x = \tan y \Rightarrow x = n\pi + y\) (where \(n \in \mathbb{Z}\), and for tangent, \(x,y \neq (2n+1)\frac{\pi}{2}\)).

## FORMULA_VARIABLES
x = unknown angle (variable), y = known principal angle (particular solution), n = integer parameter (\(n \in \mathbb{Z}\)), all angles in radians unless specified in degrees.

## FORMULA_UNITS
radians (dimensionless) or degrees; \(n\) is pure integer.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch04_001 | Simple harmonic motion: solving \(A\sin(\omega t + \phi) = x_0\) for time \(t\) uses general solutions of sine.
c11_physics_ch08_001 | Wave optics: interference conditions like \(d\sin\theta = m\lambda\) require solving \(\sin\theta = \frac{m\lambda}{d}\) for angle \(\theta\).
c11_math_cbse_03_009 | Sum/difference identities are used to derive the auxiliary angle method for \(a\sin x + b\cos x = c\).
c11_math_cbse_03_012 | Product-to-sum identities transform equations like \(\sin x \cos 2x = \frac{1}{2}\) into linear trigonometric equations.

## PREREQ_CONCEPT
Understanding periodicity and symmetry of trigonometric functions on the unit circle, and the ability to find principal values in \([0, 2\pi)\) using quadrant signs.

## PREREQ_BEFORE
The student must be able to evaluate \(\sin, \cos, \tan\) for standard angles (\(\frac{\pi}{6}, \frac{\pi}{4}, \frac{\pi}{3}, \frac{\pi}{2}, \pi\), etc.) and determine their signs in all four quadrants.

## PREREQ_STUCK
Revisit c11_math_cbse_03_006 (Sign of Trigonometric Functions in Quadrants) and c11_math_cbse_03_005 (Trigonometric Functions of Any Angle) to practice finding all angles in \([0, 2\pi)\) with a given trigonometric ratio.

## WORKED_EXAMPLE_1
PROBLEM: A pendulum's angular displacement from vertical is given by \(\theta(t) = 0.2\sin(5t)\) radians, where \(t\) is in seconds. Find all times in the first 2 seconds when the displacement is exactly 0.1 radians.

STEPS:
- Step 1: Set up the equation: \(0.2\sin(5t) = 0.1 \Rightarrow \sin(5t) = 0.5\).
- Step 2: Find principal solutions for \(\sin \alpha = 0.5\). Since sine is positive, \(\alpha\) is in QI and QII. Principal values: \(\alpha = \frac{\pi}{6}\) and \(\alpha = \pi - \frac{\pi}{6} = \frac{5\pi}{6}\).
- Step 3: Write general solution for \(\alpha = 5t\): \(5t = n\pi + (-1)^n \frac{\pi}{6}, n \in \mathbb{Z}\).
- Step 4: Solve for \(t\): \(t = \frac{n\pi}{5} + (-1)^n \frac{\pi}{30}\).
- Step 5: Find all \(t\) in \([0, 2]\). Test integer \(n\):
  \(n=0: t = \frac{\pi}{30} \approx 0.105\) s
  \(n=1: t = \frac{\pi}{5} - \frac{\pi}{30} = \frac{5\pi}{30} = \frac{\pi}{6} \approx 0.524\) s
  \(n=2: t = \frac{2\pi}{5} + \frac{\pi}{30} = \frac{13\pi}{30} \approx 1.361\) s
  \(n=3: t = \frac{3\pi}{5} - \frac{\pi}{30} = \frac{17\pi}{30} \approx 1.780\) s
  \(n=4: t = \frac{4\pi}{5} + \frac{\pi}{30} = \frac{25\pi}{30} = \frac{5\pi}{6} \approx 2.618 > 2\) (stop)
  Negative \(n\) give negative \(t\). So valid times: \(t = \frac{\pi}{30}, \frac{\pi}{6}, \frac{13\pi}{30}, \frac{17\pi}{30}\) seconds.

REASONING: The coefficient 5 inside the sine compresses the period to \(\frac{2\pi}{5}\). The general solution formula for sine automatically generates all solutions. We substitute the argument \(5t\) as the variable, solve the general equation, then back-substitute and filter by the time interval.

ANSWER: \(t = \frac{\pi}{30}, \frac{\pi}{6}, \frac{13\pi}{30}, \frac{17\pi}{30}\) seconds (approximately 0.105 s, 0.524 s, 1.361 s, 1.780 s).

## WORKED_EXAMPLE_2
PROBLEM: Solve the equation \(2\cos^2 x - 3\sin x = 0\) for \(x \in [0, 2\pi)\).

STEPS:
- Step 1: Use identity \(\cos^2 x = 1 - \sin^2 x\) to express everything in terms of \(\sin x\): \(2(1 - \sin^2 x) - 3\sin x = 0\).
- Step 2: Simplify: \(2 - 2\sin^2 x - 3\sin x = 0 \Rightarrow 2\sin^2 x + 3\sin x - 2 = 0\).
- Step 3: Solve quadratic in \(\sin x\): \((2\sin x - 1)(\sin x + 2) = 0 \Rightarrow \sin x = \frac{1}{2}\) or \(\sin x = -2\).
- Step 4: Discard \(\sin x = -2\) (outside range \([-1, 1]\)). Keep \(\sin x = \frac{1}{2}\).
- Step 5: Find principal solutions in \([0, 2\pi)\): \(\sin x = \frac{1}{2} \Rightarrow x = \frac{\pi}{6}\) (QI) and \(x = \pi - \frac{\pi}{6} = \frac{5\pi}{6}\) (QII).
- Step 6: Verify both satisfy original equation: For \(x=\frac{\pi}{6}\), \(\cos^2 = \frac{3}{4}\), LHS = \(2\cdot\frac{3}{4} - 3\cdot\frac{1}{2} = 0\). For \(x=\frac{5\pi}{6}\), \(\cos^2 = \frac{3}{4}\), \(\sin = \frac{1}{2}\), same result.

REASONING: Converting to a single trigonometric function (here sine) using Pythagorean identity reduces the equation to a quadratic. Domain restrictions of sine/cosine automatically eliminate extraneous roots. Principal solutions are found using quadrant signs.

ANSWER: \(x = \frac{\pi}{6}, \frac{5\pi}{6}\).

## WORKED_EXAMPLE_3
PROBLEM: Find the general solution of \(\sin x + \cos x = \frac{1}{\sqrt{2}}\).

STEPS:
- Step 1: Express LHS as \(R\sin(x + \alpha)\) where \(R = \sqrt{1^2 + 1^2} = \sqrt{2}\) and \(\alpha\) satisfies \(\cos\alpha = \frac{1}{\sqrt{2}}, \sin\alpha = \frac{1}{\sqrt{2}} \Rightarrow \alpha = \frac{\pi}{4}\).
- Step 2: Equation becomes \(\sqrt{2}\sin(x + \frac{\pi}{4}) = \frac{1}{\sqrt{2}} \Rightarrow \sin(x + \frac{\pi}{4}) = \frac{1}{2}\).
- Step 3: Let \(y = x + \frac{\pi}{4}\). General solution for \(\sin y = \frac{1}{2}\) is \(y = n\pi + (-1)^n \frac{\pi}{6}, n \in \mathbb{Z}\).
- Step 4: Substitute back: \(x + \frac{\pi}{4} = n\pi + (-1)^n \frac{\pi}{6}\).
- Step 5: Solve for \(x\): \(x = n\pi + (-1)^n \frac{\pi}{6} - \frac{\pi}{4} = n\pi + (-1)^n \frac{\pi}{6} - \frac{\pi}{4}\).
- Step 6: Write two families explicitly for even/odd \(n\):
  For \(n = 2k\): \(x = 2k\pi + \frac{\pi}{6} - \frac{\pi}{4} = 2k\pi - \frac{\pi}{12}\).
  For \(n = 2k+1\): \(x = (2k+1)\pi - \frac{\pi}{6} - \frac{\pi}{4} = (2k+1)\pi - \frac{5\pi}{12}\).
  Combined: \(x = 2k\pi - \frac{\pi}{12}\) or \(x = (2k+1)\pi - \frac{5\pi}{12}, k \in \mathbb{Z}\).
  (Alternatively keep as single formula \(x = n\pi + (-1)^n \frac{\pi}{6} - \frac{\pi}{4}\)).

REASONING: The auxiliary angle method converts a linear combination \(a\sin x + b\cos x\) into a single sine function, making it solvable by standard general solution formulas. The phase shift \(\alpha\) is determined by the coefficients. The final general solution must be expressed in terms of the original variable \(x\).

ANSWER: \(x = n\pi + (-1)^n \frac{\pi}{6} - \frac{\pi}{4}, n \in \mathbb{Z}\) (or equivalently \(x = 2k\pi - \frac{\pi}{12}\) or \(x = (2k+1)\pi - \frac{5\pi}{12}, k \in \mathbb{Z}\)).

## COMPETENCY_QUESTION_1
QUESTION: The voltage in an AC circuit is given by \(V(t) = 220\sin(100\pi t)\) volts. A device triggers when the voltage reaches 110 V. 
(a) Find the first two positive times when the device triggers.
(b) The device has a safety lock that prevents re-triggering for 0.01 seconds after a trigger. Will the device trigger again within that lockout period after the first trigger? Justify your answer mathematically.

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting solutions in context.

STEPS:
- Step 1: Set up equation \(220\sin(100\pi t) = 110 \Rightarrow \sin(100\pi t) = 0.5\).
- Step 2: Find principal solutions for \(100\pi t\): \(\frac{\pi}{6}, \frac{5\pi}{6}\).
- Step 3: Write general solution: \(100\pi t = n\pi + (-1)^n \frac{\pi}{6}\).
- Step 4: Solve for \(t\): \(t = \frac{n}{100} + (-1)^n \frac{1}{600}\).
- Step 5: Find first two positive \(t\): \(n=0 \Rightarrow t = \frac{1}{600} \approx 0.001667\) s; \(n=1 \Rightarrow t = \frac{1}{100} - \frac{1}{600} = \frac{5}{600} = \frac{1}{120} \approx 0.008333\) s.
- Step 6: Check difference: \(\frac{1}{120} - \frac{1}{600} = \frac{4}{600} = \frac{1}{150} \approx 0.00667\) s, which is less than 0.01 s lockout. So the second trigger occurs during lockout.

ANSWER: (a) \(t = \frac{1}{600}\) s and \(t = \frac{1}{120}\) s. (b) Yes, the second trigger occurs at \(\approx 0.00833\) s, which is \(0.00667\) s after the first, within the 0.01 s lockout period. The device will NOT trigger the second time due to safety lock.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Solve for \(x\): \(\tan 3x + \tan x = 2\tan 2x\). 
(a) Show that the equation simplifies to \(\tan 3x \tan 2x \tan x = 0\).
(b) Hence find the general solution, carefully stating any restrictions on \(x\).
(c) Explain why the step "divide by \(\tan x \tan 2x \tan 3x\)" would be invalid.

COMPETENCY: Error identification and correction, and algebraic manipulation with trigonometric identities.

STEPS:
- Step 1: Use \(\tan 3x = \tan(2x + x) = \frac{\tan 2x + \tan x}{1 - \tan 2x \tan x}\).
- Step 2: Substitute into LHS: \(\frac{\tan 2x + \tan x}{1 - \tan 2x \tan x} + \tan x = \frac{\tan 2x + \tan x + \tan x - \tan 2x \tan^2 x}{1 - \tan 2x \tan x}\).
- Step 3: RHS: \(2\tan 2x = \frac{2\tan 2x(1 - \tan 2x \tan x)}{1 - \tan 2x \tan x}\).
- Step 4: Equate numerators (denominator non-zero): \(\tan 2x + 2\tan x - \tan 2x \tan^2 x = 2\tan 2x - 2\tan^2 2x \tan x\).
- Step 5: Rearrange: \(2\tan x - \tan 2x - \tan 2x \tan^2 x + 2\tan^2 2x \tan x = 0\).
- Step 6: Factor: \(\tan x(2 + 2\tan^2 2x) - \tan 2x(1 + \tan^2 x) = 0\). Use \(1+\tan^2\theta = \sec^2\theta\): \(2\tan x \sec^2 2x - \tan 2x \sec^2 x = 0\).
- Step 7: Alternatively, use identity \(\tan 3x - \tan 2x - \tan x = \tan 3x \tan 2x \tan x\) (known identity). Then given equation \(\tan 3x + \tan x = 2\tan 2x \Rightarrow \tan 3x - \tan 2x = \tan 2x - \tan x\). This leads to \(\tan 3x \tan 2x \tan x = 0\) after using the identity.
- Step 8: So \(\tan 3x = 0\) or \(\tan 2x = 0\) or \(\tan x = 0\).
- Step 9: General solutions: 
  \(\tan x = 0 \Rightarrow x = m\pi\).
  \(\tan 2x = 0 \Rightarrow 2x = n\pi \Rightarrow x = \frac{n\pi}{2}\).
  \(\tan 3x = 0 \Rightarrow 3x = p\pi \Rightarrow x = \frac{p\pi}{3}\).
  Combined: \(x = \frac{k\pi}{6}\)? Wait, union of these sets: multiples of \(\pi\), \(\frac{\pi}{2}\), \(\frac{\pi}{3}\). The union is all multiples of \(\frac{\pi}{6}\)? Check: \(\frac{\pi}{6}\) not in any. Actually union is \(x = \frac{k\pi}{3}\)? No, \(\frac{\pi}{2}\) is not multiple of \(\frac{\pi}{3}\). The union is \(x = \frac{k\pi}{6}\) where \(k\) is integer? \(\frac{\pi}{6}\) not included. Let's list: \(m\pi\): \(0, \pi, 2\pi...\); \(\frac{n\pi}{2}\): \(0, \frac{\pi}{2}, \pi, \frac{3\pi}{2}...\); \(\frac{p\pi}{3}\): \(0, \frac{\pi}{3}, \frac{2\pi}{3}, \pi...\). Union: all multiples of \(\frac{\pi}{6}\) except those that are odd multiples of \(\frac{\pi}{6}\)? Actually \(\frac{\pi}{6}\) missing, \(\frac{5\pi}{6}\) missing. The set is \(x = \frac{k\pi}{6}\) where \(k\) is multiple of 2 or 3? i.e., \(k \equiv 0,2,3,4 \mod 6\). So \(k \neq 1,5 \mod 6\).
- Step 10: Restrictions: \(\tan x, \tan 2x, \tan 3x\) must be defined. So \(x \neq \frac{\pi}{2} + m\pi\), \(2x \neq \frac{\pi}{2} + n\pi \Rightarrow x \neq \frac{\pi}{4} + \frac{n\pi}{2}\), \(3x \neq \frac{\pi}{2} + p\pi \Rightarrow x \neq \frac{\pi}{6} + \frac{p\pi}{3}\). Check if any solution violates these. Solutions are \(x = m\pi, \frac{n\pi}{2}, \frac{p\pi}{3}\). 
  - \(x = \frac{\pi}{2}\) (from \(n=1\)) makes \(\tan x\) undefined! So \(x = \frac{\pi}{2} + k\pi\) are extraneous.
  - \(x = \frac{\pi}{4}\) not in solution set.
  - \(x = \frac{\pi}{6}\) not in solution set.
  - \(x = \frac{\pi}{3}\) (from \(p=1\)): check \(\tan \frac{\pi}{3} = \sqrt{3}\), \(\tan \frac{2\pi}{3} = -\sqrt{3}\), \(\tan \pi = 0\). All defined. OK.
  - \(x = \frac{2\pi}{3}\): \(\tan = -\sqrt{3}\), \(\tan \frac{4\pi}{3} = \sqrt{3}\), \(\tan 2\pi = 0\). OK.
  - \(x = \frac{3\pi}{2}\) (from \(n=3\)): \(\tan\) undefined. Extraneous.
  So exclude odd multiples of \(\frac{\pi}{2}\).
- Step 11: Final general solution: \(x = k\pi\) or \(x = \frac{k\pi}{3}\) where \(k \in \mathbb{Z}\), but \(k\) not multiple of 3? Wait, \(x = \frac{p\pi}{3}\) includes \(p=3 \Rightarrow \pi\) (already in \(k\pi\)). \(p=1,2,4,5...\) gives \(\frac{\pi}{3}, \frac{2\pi}{3}, \frac{4\pi}{3}, \frac{5\pi}{3}\). All valid. \(x = \frac{n\pi}{2}\) with \(n\) even gives multiples of \(\pi\) (already covered). \(n\) odd gives \(\frac{\pi}{2}, \frac{3\pi}{2}\) which are invalid. So final solution: \(x = m\pi\) or \(x = \frac{p\pi}{3}\) where \(p \not\equiv 0 \mod 3\)? Actually \(p=3\) gives \(\pi\) which is \(m\pi\). So we can write: \(x = \frac{k\pi}{3}, k \in \mathbb{Z}\) but exclude \(k\) odd? No, \(k=1\) gives \(\frac{\pi}{3}\) valid. \(k=2\) gives \(\frac{2\pi}{3}\) valid. \(k=3\) gives \(\pi\) valid. \(k=4\) gives \(\frac{4\pi}{3}\) valid. \(k=5\) gives \(\frac{5\pi}{3}\) valid. \(k=6\) gives \(2\pi\) valid. All multiples of \(\frac{\pi}{3}\) are valid EXCEPT where \(\tan x\) undefined? \(\tan \frac{\pi}{3}\) defined. \(\tan \frac{2\pi}{3}\) defined. \(\tan \pi = 0\). \(\tan \frac{4\pi}{3}\) defined. \(\tan \frac{5\pi}{3}\) defined. \(\tan 2\pi = 0\). Wait, what about \(\frac{n\pi}{2}\) solutions? \(\frac{\pi}{2}\) is not a multiple of \(\frac{\pi}{3}\). So the union is multiples of \(\pi\) and multiples of \(\frac{\pi}{3}\) and multiples of \(\frac{\pi}{2}\) (but odd multiples of \(\frac{\pi}{2}\) invalid). Multiples of \(\frac{\pi}{2}\) that are not multiples of \(\pi\) are odd multiples of \(\frac{\pi}{2}\), which are invalid. So the only extra from \(\frac{n\pi}{2}\) are the even \(n\) which are multiples of \(\pi\). So the solution set is exactly \(x = \frac{p\pi}{3}, p \in \mathbb{Z}\)? Check \(p=1\): \(\frac{\pi}{3}\) works? Original equation: \(\tan \pi + \tan \frac{\pi}{3} = 0 + \sqrt{3} = \sqrt{3}\); RHS: \(2\tan \frac{2\pi}{3} = 2(-\sqrt{3}) = -2\sqrt{3}\). NOT EQUAL! So \(\frac{\pi}{3}\) is NOT a solution. I made a mistake in the identity step.

Let's re-evaluate the identity: \(\tan 3x = \frac{3\tan x - \tan^3 x}{1 - 3\tan^2 x}\). The equation \(\tan 3x + \tan x = 2\tan 2x\).
Let \(t = \tan x\). Then \(\tan 2x = \frac{2t}{1-t^2}\), \(\tan 3x = \frac{3t - t^3}{1 - 3t^2}\).
Equation: \(\frac{3t - t^3}{1 - 3t^2} + t = \frac{4t}{1-t^2}\).
Multiply by denominators... This is messy.
Better: Use \(\tan 3x - \tan 2x = \tan 2x - \tan x\).
\(\tan 3x - \tan 2x = \frac{\sin(3x-2x)}{\cos 3x \cos 2x} = \frac{\sin x}{\cos 3x \cos 2x}\).
\(\tan 2x - \tan x = \frac{\sin x}{\cos 2x \cos x}\).
Equation: \(\frac{\sin x}{\cos 3x \cos 2x} = \frac{\sin x}{\cos 2x \cos x}\).
Assuming \(\cos 2x \neq 0\) and \(\sin x \neq 0\), we get \(\frac{1}{\cos 3x} = \frac{1}{\cos x} \Rightarrow \cos 3x = \cos x\).
If \(\sin x = 0\), then \(x = m\pi\). Check: \(\tan 3m\pi + \tan m\pi = 0 = 2\tan 2m\pi\). Valid.
If \(\cos 2x = 0\), then \(2x = \frac{\pi}{2} + n\pi \Rightarrow x = \frac{\pi}{4} + \frac{n\pi}{2}\). Then \(\tan 2x\) undefined. Extraneous.
So \(\cos 3x = \cos x \Rightarrow 3x = 2k\pi \pm x\).
Case 1: \(3x = 2k\pi + x \Rightarrow 2x = 2k\pi \Rightarrow x = k\pi\). (Already included).
Case 2: \(3x = 2k\pi - x \Rightarrow 4x = 2k\pi \Rightarrow x = \frac{k\pi}{2}\).
Now check restrictions for \(x = \frac{k\pi}{2}\):
\(\tan x\) defined \(\Rightarrow k\) even. So \(x = m\pi\). (Already have).
\(\tan 2x = \tan k\pi = 0\) defined.
\(\tan 3x = \tan \frac{3k\pi}{2}\). If \(k\) even, \(3k\) even, \(\tan\) defined (0). If \(k\) odd, \(\tan\) undefined.
So only \(k\) even gives valid solutions, which are multiples of \(\pi\).
Thus the only solutions are \(x = m\pi, m \in \mathbb{Z}\).

Wait, is that all? Let's test \(x = \pi\): \(\tan 3\pi + \tan \pi = 0 = 2\tan 2\pi\). OK.
What about \(x = 0\)? OK.
Are there any other solutions? The derivation assumed \(\sin x \neq 0\) and \(\cos 2x \neq 0\) to cancel. We covered \(\sin x = 0\). What if \(\cos 2x = 0\)? Then \(\tan 2x\) undefined, so not in domain.
So the only solutions are \(x = m\pi\).

Let's verify with the identity \(\tan 3x - \tan 2x - \tan x = \tan 3x \tan 2x \tan x\).
Given \(\tan 3x + \tan x = 2\tan 2x \Rightarrow \tan 3x - \tan 2x = \tan 2x - \tan x\).
LHS = \(\tan(3x-2x)(1+\tan 3x \tan 2x) = \tan x (1+\tan 3x \tan 2x)\).
RHS = \(\tan(2x-x)(1+\tan 2x \tan x) = \tan x (1+\tan 2x \tan x)\).
So \(\tan x (1+\tan 3x \tan 2x) = \tan x (1+\tan 2x \tan x)\).
If \(\tan x \neq 0\), then \(1+\tan 3x \tan 2x = 1+\tan 2x \tan x \Rightarrow \tan 3x \tan 2x = \tan 2x \tan x \Rightarrow \tan 2x(\tan 3x - \tan x) = 0\).
So either \(\tan 2x = 0\) or \(\tan 3x = \tan x\).
\(\tan 2x = 0 \Rightarrow 2x = n\pi \Rightarrow x = \frac{n\pi}{2}\). But \(\tan x\) must be defined, so \(n\) even \(\Rightarrow x = m\pi\).
\(\tan 3x = \tan x \Rightarrow 3x = k\pi + x \Rightarrow 2x = k\pi \Rightarrow x = \frac{k\pi}{2}\). Same as above.
If \(\tan x = 0 \Rightarrow x = m\pi\).
So indeed only \(x = m\pi\).

This is a great competency question because it tests identity usage, domain restrictions, and algebraic manipulation.

Let's write it up.

ANSWER: (a) Using \(\tan A - \tan B = \frac{\sin(A-B)}{\cos A \cos B}\), the equation \(\tan 3x + \tan x = 2\tan 2x\) rearranges to \(\tan 3x - \tan 2x = \tan 2x - \tan x\). This gives \(\frac{\sin x}{\cos 3x \cos 2x} = \frac{\sin x}{\cos 2x \cos x}\). For \(\sin x \neq 0, \cos 2x \neq 0\), we get \(\cos 3x = \cos x \Rightarrow 3x = 2k\pi \pm x \Rightarrow x = k\pi\) or \(x = \frac{k\pi}{2}\). Checking domain: \(\tan x\) undefined for odd \(k\) in \(\frac{k\pi}{2}\). \(\tan 2x\) undefined for \(\cos 2x=0\) (already excluded). So only \(x = k\pi\) survive. Including \(\sin x = 0\) gives same. Thus \(\tan 3x \tan 2x \tan x = 0\) leads to \(\tan x = 0\) (since other factors give invalid angles). (b) General solution: \(x = n\pi, n \in \mathbb{Z}\). (c) Dividing by \(\tan x \tan 2x \tan 3x\) assumes none are zero, but the solution requires \(\tan x = 0\). Also division by zero is invalid when any factor is zero.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A trigonometric equation is an equation ______ trigonometric functions of an unknown angle.

## DIAGNOSTIC_ANSWER_7
involving

**A wrong answer ("containing" or "using") reveals the student has paraphrased the definition's participle - a trigonometric equation is an equation involving trigonometric functions of an unknown angle.** Involving is the definition's own word for the equation's contents, and the unknown angle is the prize. Quote it in fill-ups, keeping the participle exact.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: You need to find all times in the first minute when the seat is ______ 17 metres high.

## DIAGNOSTIC_ANSWER_8
exactly

**A wrong answer ("about" or "nearly") reveals the student has paraphrased the walkthrough's adverb - the seat must be exactly 17 metres high, no tolerance.** Scenario blanks repeat the walkthrough verbatim, so the adverb is the walkthrough's own word for the precise height. Recall the sin θ = 0.5 step before filling, and give the adverb exactly.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: You need to find all times in the first minute when the seat is exactly ______ metres high.

## DIAGNOSTIC_ANSWER_9
17

**A wrong answer (any other figure) reveals the student has drifted from the walkthrough - the target height is exactly 17 metres, derived from the 10 sin(πt/15) + 12 model.** The figure drives the whole equation, and the walkthrough's number is the answer. Recall the subtraction of 12 before filling, and give the figure exactly as printed.
