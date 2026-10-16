## ELI5
One angle, two costumes: twice the arctan of x can be rewritten as the arcsin of two x over one plus x squared, provided x stays between minus one and one. The bridge is the double-angle identity - sine of twice theta equals two tan theta over one plus tan squared theta - crossed by setting theta equal to arctan x. The domain restriction is the toll: step outside it and the two sides fall into different principal branches, and the equality quietly expires.

## DEFINITION
The identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ holds for all $x \in [-1, 1]$ and expresses the double-angle relationship between inverse tangent and inverse sine, where the right-hand side uses the sine double-angle formula $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$ with $\theta = \tan^{-1}x$, subject to the principal value branch restrictions of $\sin^{-1}$ and $\tan^{-1}$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student must be able to: (1) derive the identity step-by-step using the substitution $x = \tan\theta$ and the double-angle formula for sine, (2) state the precise domain $[-1, 1]$ and explain why it is restricted by the principal value range of $\sin^{-1}$, (3) apply the identity to simplify expressions and solve equations involving inverse trigonometric functions in both board and JEE-style problems.

## SCOPE_BOUNDARY
This node covers the derivation, domain/range analysis, and application of the specific identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ for $x \in [-1, 1]$. It does NOT cover the companion identities $2\tan^{-1}x = \cos^{-1}\left(\frac{1-x^2}{1+x^2}\right)$ for $x \ge 0$ or $2\tan^{-1}x = \tan^{-1}\left(\frac{2x}{1-x^2}\right)$ for $|x| < 1$, which are treated in subsequent nodes.

## WALKTHROUGH
Imagine you are designing a ramp for a wheelchair-accessible entrance at your school in Delhi. The ramp must rise 1 metre over a horizontal distance of 2 metres. The angle of inclination $\theta$ satisfies $\tan\theta = \frac{1}{2}$, so $\theta = \tan^{-1}\frac{1}{2}$. Now suppose you need to express this same angle using $\sin^{-1}$ for a structural calculation — what would $\sin(2\theta)$ be? This real-world need to switch between inverse trigonometric representations is exactly what the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ enables. Begin by recalling the double-angle formula $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$ from Class 11 (node c11_math_cbse_03_010). Let $x = \tan\theta$, so $\theta = \tan^{-1}x$. Substitute into the formula: $\sin(2\tan^{-1}x) = \frac{2x}{1+x^2}$. Now apply $\sin^{-1}$ to both sides, carefully tracking the principal value ranges: $\sin^{-1}$ returns values in $[-\frac{\pi}{2}, \frac{\pi}{2}]$, while $2\tan^{-1}x$ for $x \in [-1, 1]$ also lies in $[-\frac{\pi}{2}, \frac{\pi}{2}]$. The key insight is that the identity holds precisely when both sides fall in the same principal branch.

Takeaway first: the identity is a translation dictionary between arctan and arcsin, valid only on the interval where both costumes fit the same principal branch. Exam moves: derivation questions via x equals tan theta, domain questions explaining the minus-one-one restriction, and application questions simplifying mixed expressions. Method: rerun the ramp architect - the tangent form computed for the builder, the sine form demanded by the structural software - and let the identity translate. Check yourself: derive, do not memorise - the substitution takes four lines and guarantees you remember the restriction's reason, not just its digits. Drill: derive the identity once, then apply it to one simplification and state the toll.

## DIAGNOSTIC_QUESTION_1
State the exact domain of $x$ for which the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ is valid, and write the principal value range of each side.

## DIAGNOSTIC_ANSWER_1
The identity holds for $x \in [-1, 1]$. The left-hand side $2\tan^{-1}x$ has range $[-\frac{\pi}{2}, \frac{\pi}{2}]$ because $\tan^{-1}x \in [-\frac{\pi}{4}, \frac{\pi}{4}]$ for $x \in [-1, 1]$. The right-hand side $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ also has range $[-\frac{\pi}{2}, \frac{\pi}{2}]$ by definition of the principal value branch of $\sin^{-1}$. A wrong answer (e.g., stating domain as $\mathbb{R}$ or range as $[-\pi, \pi]$) reveals the student has not checked the principal value branch compatibility — a critical error that leads to incorrect solutions in JEE problems where domain restrictions determine the number of valid solutions.

## DIAGNOSTIC_QUESTION_2
Explain why the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ fails for $x = 2$, even though both sides are mathematically defined as real numbers.

## DIAGNOSTIC_ANSWER_2
For $x = 2$, $\tan^{-1}2 \approx 1.107$ radians, so $2\tan^{-1}2 \approx 2.214$ radians, which lies in $(\frac{\pi}{2}, \pi)$. However, $\sin^{-1}\left(\frac{4}{5}\right) \approx 0.927$ radians, which lies in $[0, \frac{\pi}{2}]$. The two sides differ by $\pi - 2\sin^{-1}\frac{4}{5}$ because $\sin^{-1}$ returns the principal value in $[-\frac{\pi}{2}, \frac{\pi}{2}]$, while $2\tan^{-1}x$ for $x > 1$ exceeds $\frac{\pi}{2}$. A student who says "both sides are defined so the identity holds" confuses algebraic equality with functional equality under principal value restrictions — this is the most common error in board exams (1-mark loss) and JEE (wrong answer in MCQ).

## DIAGNOSTIC_QUESTION_3
Evaluate $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ for $x = \frac{1}{\sqrt{3}}$ using the identity, and verify by direct computation of $\sin^{-1}$.

## DIAGNOSTIC_ANSWER_3
Using the identity: $2\tan^{-1}\frac{1}{\sqrt{3}} = 2 \times \frac{\pi}{6} = \frac{\pi}{3}$.
Direct verification: $\frac{2x}{1+x^2} = \frac{2/\sqrt{3}}{1 + 1/3} = \frac{2/\sqrt{3}}{4/3} = \frac{\sqrt{3}}{2}$. Then $\sin^{-1}\frac{\sqrt{3}}{2} = \frac{\pi}{3}$. Both give $\frac{\pi}{3}$.
A wrong answer (e.g., $\frac{2\pi}{3}$ or $\frac{\pi}{6}$) reveals the student either forgot the factor of 2 in $2\tan^{-1}x$ or miscomputed $\frac{2x}{1+x^2}$ — both are algebraic slips that cost marks in multi-step simplification problems.

## DIAGNOSTIC_QUESTION_4
Compare the domains of validity for the three identities: (i) $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$, (ii) $2\tan^{-1}x = \cos^{-1}\left(\frac{1-x^2}{1+x^2}\right)$, (iii) $2\tan^{-1}x = \tan^{-1}\left(\frac{2x}{1-x^2}\right)$. Explain the pattern in terms of the principal value ranges of $\sin^{-1}$, $\cos^{-1}$, and $\tan^{-1}$.

## DIAGNOSTIC_ANSWER_4
(i) Domain: $[-1, 1]$ because $2\tan^{-1}x \in [-\frac{\pi}{2}, \frac{\pi}{2}]$ matches $\sin^{-1}$ range.
(ii) Domain: $[0, \infty)$ because $2\tan^{-1}x \in [0, \pi)$ matches $\cos^{-1}$ range $[0, \pi]$.
(iii) Domain: $(-1, 1)$ because $2\tan^{-1}x \in (-\frac{\pi}{2}, \frac{\pi}{2})$ matches $\tan^{-1}$ range.
The pattern: the domain of $x$ is exactly those values for which $2\tan^{-1}x$ falls within the principal value range of the inverse function on the RHS. A student who lists domains without linking to principal value ranges is memorising, not understanding — this fails in JEE problems where a modified identity with shifted ranges is tested.

## DIAGNOSTIC_QUESTION_5
A student writes: "Since $\sin(2\tan^{-1}x) = \frac{2x}{1+x^2}$ for all real $x$, applying $\sin^{-1}$ to both sides gives $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ for all real $x$." Identify the logical flaw and give a counterexample.

## DIAGNOSTIC_ANSWER_5
The flaw: $\sin^{-1}(\sin y) = y$ only when $y \in [-\frac{\pi}{2}, \frac{\pi}{2}]$. For $x > 1$, $2\tan^{-1}x \in (\frac{\pi}{2}, \pi)$, so $\sin^{-1}(\sin(2\tan^{-1}x)) = \pi - 2\tan^{-1}x \ne 2\tan^{-1}x$.
Counterexample: $x = \sqrt{3}$. LHS $= 2\tan^{-1}\sqrt{3} = 2 \times \frac{\pi}{3} = \frac{2\pi}{3}$. RHS $= \sin^{-1}\left(\frac{2\sqrt{3}}{4}\right) = \sin^{-1}\frac{\sqrt{3}}{2} = \frac{\pi}{3}$. LHS $\ne$ RHS.
A student who misses this confuses the functional equation $\sin^{-1}(\sin y) = y$ (true only on principal branch) with the algebraic identity $\sin y = \frac{2x}{1+x^2}$ — this is the single most expensive misconception in inverse trigonometry, causing 4-6 mark losses in board exams and wrong answers in JEE.

## DIAGNOSTIC_QUESTION_6
Construct a problem where the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ simplifies an expression that initially contains both $\tan^{-1}$ and $\sin^{-1}$, and solve it completely.

## DIAGNOSTIC_ANSWER_6
Problem: Simplify $\sin^{-1}\left(\frac{2\tan\frac{\pi}{8}}{1+\tan^2\frac{\pi}{8}}\right) - \tan^{-1}1$.
Solution: Recognise $\frac{2\tan\theta}{1+\tan^2\theta}$ with $\theta = \frac{\pi}{8}$. By identity, $\sin^{-1}\left(\frac{2\tan\frac{\pi}{8}}{1+\tan^2\frac{\pi}{8}}\right) = 2\tan^{-1}\tan\frac{\pi}{8} = 2 \times \frac{\pi}{8} = \frac{\pi}{4}$ (since $\frac{\pi}{8} \in [-\frac{\pi}{4}, \frac{\pi}{4}]$). Then $\frac{\pi}{4} - \frac{\pi}{4} = 0$.
A poor answer computes numerically or fails to recognise the pattern — this tests whether the student can "see" the identity embedded in a non-standard form, a key skill for JEE Advanced comprehension passages.

## COMMON_MISCONCEPTION
Students believe the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ holds for all real $x$ because the algebraic expression $\frac{2x}{1+x^2}$ is defined for all $x \in \mathbb{R}$ and $\sin^{-1}$ accepts inputs in $[-1, 1]$ (which $\frac{2x}{1+x^2}$ always satisfies since $|\frac{2x}{1+x^2}| \le 1$). They write: "For $x = 2$, LHS $= 2\tan^{-1}2$, RHS $= \sin^{-1}\frac{4}{5}$, and since $\sin(2\tan^{-1}2) = \frac{4}{5}$, the identity holds." This is wrong because $\sin^{-1}(\sin y) = y$ only when $y \in [-\frac{\pi}{2}, \frac{\pi}{2}]$, but for $x = 2$, $2\tan^{-1}2 \approx 2.214 > \frac{\pi}{2}$. The correct statement is $\sin^{-1}\left(\frac{2x}{1+x^2}\right) = \begin{cases} 2\tan^{-1}x, & |x| \le 1 \\ \pi - 2\tan^{-1}x, & x > 1 \\ -\pi - 2\tan^{-1}x, & x < -1 \end{cases}$.

## ON_FAILURE
If a student cannot correctly state the domain restriction or applies the identity outside $[-1, 1]$:
1. Make them compute $\tan^{-1}2$ and $\tan^{-1}(-2)$ on a calculator, then multiply by 2, and compare with $\sin^{-1}\frac{4}{5}$ and $\sin^{-1}(-\frac{4}{5})$.
2. Have them plot $y = 2\tan^{-1}x$ and $y = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ on the same axes for $x \in [-3, 3]$ using Desmos or GeoGebra.
3. Ask them to identify the exact $x$-intervals where the graphs coincide and where they diverge.
4. Re-derive the identity from $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$ with $\theta = \tan^{-1}x$, explicitly writing the condition $\theta \in [-\frac{\pi}{4}, \frac{\pi}{4}] \implies x \in [-1, 1]$ at each step.
5. Re-diagnose with: "For $x = \sqrt{3}$, find the value of $\sin^{-1}\left(\frac{2x}{1+x^2}\right) - 2\tan^{-1}x$."

## PREREQUISITE_NODE_IDS
c12_math_cbse_02_001, c12_math_cbse_02_002, c12_math_cbse_02_003, c12_math_cbse_02_005, c11_math_cbse_03_010, c11_math_cbse_03_008, c12_math_cbse_02_004

## PREREQUISITE_REASONS
c12_math_cbse_02_001: Domain and range of inverse trigonometric functions are needed to understand why the identity is restricted to $[-1, 1]$.
c12_math_cbse_02_002: Principal value branches of $\sin^{-1}$ and $\tan^{-1}$ determine the equality condition $\sin^{-1}(\sin y) = y$.
c12_math_cbse_02_003: General properties of inverse trigonometric functions (e.g., $\sin^{-1}(\sin x) = x$ only on principal branch) are used in the derivation.
c12_math_cbse_02_005: The $\tan^{-1} + \tan^{-1}$ addition formula is the algebraic foundation; this identity is a special case with equal arguments.
c11_math_cbse_03_010: Double-angle formula $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$ is the core trigonometric identity used in the derivation.
c11_math_cbse_03_008: Pythagorean identity $\sin^2\theta + \cos^2\theta = 1$ is used to derive the double-angle formula and verify $\left|\frac{2x}{1+x^2}\right| \le 1$.
c12_math_cbse_02_004: The identity $2\tan^{-1}x = \sin^{-1}\frac{2x}{1+x^2}$ is proved by converting to $\sin^{-1}$ and $\cos^{-1}$ and using this complementary relation.  

## FORWARD_NODE_IDS
c12_math_cbse_02_007, c12_math_cbse_02_008
## FORWARD_REASONS
c12_math_cbse_02_007: Simplifying expressions using inverse trigonometric functions directly applies this identity to reduce complex expressions like $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ to $2\tan^{-1}x$.
c12_math_cbse_02_008: Word problems involving heights and distances or calculus integrals often require converting between $\tan^{-1}$ and $\sin^{-1}$ forms using this identity.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_007, c11_math_cbse_13_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_007: Derivative of polynomial functions — the derivative of $\tan^{-1}x$ is $\frac{1}{1+x^2}$, and the derivative of $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ simplifies to $\frac{2}{1+x^2}$ for $|x| < 1$, demonstrating the identity through calculus.
c11_math_cbse_13_010: Derivatives of trigonometric functions — the chain rule application to $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ yields $\frac{2}{1+x^2}$ only when the domain restriction is respected, linking inverse trigonometry to differential calculus.

## CHAIN_DESCRIPTION
c11_math_cbse_03_10 -> c12_math_cbse_02_005 -> c12_math_cbse_02_006 -> c12_math_cbse_02_007

## THIS_FORMULA
$2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ for $x \in [-1, 1]$

## FORMULA_VARIABLES
$x$ = real number in the domain $[-1, 1]$; $\tan^{-1}x$ = principal value of inverse tangent in $[-\frac{\pi}{4}, \frac{\pi}{4}]$; $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ = principal value of inverse sine in $[-\frac{\pi}{2}, \frac{\pi}{2}]$

## FORMULA_UNITS
dimensionless (angles in radians)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_01_003 | In physics, the angle of a vector with components $(1-x^2, 2x)$ has tangent $\frac{2x}{1-x^2}$ and sine $\frac{2x}{1+x^2}$; this identity relates the angle representations in kinematics and electromagnetism problems.
 c12_phy_cbse_03_005 | In AC circuit analysis, the phase angle $\phi = \tan^{-1}\frac{X_L - X_C}{R}$ is often converted to $\sin^{-1}$ form for power factor calculations using this identity.
## PREREQ_CONCEPT
The double-angle formula for sine expressed in terms of tangent: $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$, and the principal value branch condition $\sin^{-1}(\sin y) = y \iff y \in [-\frac{\pi}{2}, \frac{\pi}{2}]$.

## PREREQ_BEFORE
The student must be able to derive $\sin 2\theta = \frac{2\tan\theta}{1+\tan^2\theta}$ from $\sin 2\theta = 2\sin\theta\cos\theta$ and $\tan\theta = \frac{\sin\theta}{\cos\theta}$, and state the principal value ranges of $\sin^{-1}$ and $\tan^{-1}$ from memory.

## PREREQ_STUCK
Revisit Class 11 node c11_math_cbse_03_010 (double-angle formulas) and Class 12 node c12_math_cbse_02_002 (principal value branches) — specifically the condition $\sin^{-1}(\sin x) = x \iff x \in [-\frac{\pi}{2}, \frac{\pi}{2}]$.

## WORKED_EXAMPLE_1
PROBLEM: A surveyor standing at point $A$ measures the angle of elevation to the top of a tower as $\tan^{-1}\frac{3}{4}$. The surveyor moves to point $B$ such that the new angle of elevation is twice the original. If the height of the tower is 30 m, find the distance from $B$ to the foot of the tower. Use the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ in your solution.

STEPS:
- Step 1: Let the original angle of elevation be $\theta = \tan^{-1}\frac{3}{4}$. Then $\tan\theta = \frac{3}{4}$.
- Step 2: The new angle of elevation is $2\theta$. We need to find the horizontal distance $d$ from point $B$ to the tower foot. From the right triangle at $B$, $\tan(2\theta) = \frac{30}{d}$.
- Step 3: Instead of computing $\tan(2\theta)$ directly, use the given identity: $2\theta = 2\tan^{-1}\frac{3}{4} = \sin^{-1}\left(\frac{2 \times \frac{3}{4}}{1 + (\frac{3}{4})^2}\right)$.
- Step 4: Simplify the argument: $\frac{2 \times \frac{3}{4}}{1 + \frac{9}{16}} = \frac{\frac{3}{2}}{\frac{25}{16}} = \frac{3}{2} \times \frac{16}{25} = \frac{24}{25}$. So $2\theta = \sin^{-1}\frac{24}{25}$.
- Step 5: In the right triangle at $B$, $\sin(2\theta) = \frac{30}{\sqrt{30^2 + d^2}}$. But $\sin(2\theta) = \frac{24}{25}$. Equate: $\frac{30}{\sqrt{900 + d^2}} = \frac{24}{25}$.
- Step 6: Cross-multiply: $30 \times 25 = 24 \sqrt{900 + d^2} \implies 750 = 24 \sqrt{900 + d^2} \implies \sqrt{900 + d^2} = \frac{750}{24} = \frac{125}{4}$.
- Step 7: Square both sides: $900 + d^2 = \frac{15625}{16} \implies d^2 = \frac{15625}{16} - \frac{14400}{16} = \frac{1225}{16} \implies d = \frac{35}{4} = 8.75$ m.

REASONING: The identity converts the double-angle inverse tangent into an inverse sine, which directly gives the sine of the angle. In a right triangle, sine relates the opposite side (height) to the hypotenuse, allowing us to find the horizontal distance via Pythagoras. This avoids computing $\tan(2\theta)$ which would require the $\tan^{-1}$ addition formula and then taking tangent again — a longer route.

ANSWER: 8.75 m

## WORKED_EXAMPLE_2
PROBLEM: Solve for $x$: $\sin^{-1}\left(\frac{2x}{1+x^2}\right) + \sin^{-1}\left(\frac{2y}{1+y^2}\right) = \frac{\pi}{2}$, given $x = \frac{1}{2}$ and $y > 0$.

STEPS:
- Step 1: Recognise $\frac{2x}{1+x^2}$ as the form for $\sin(2\tan^{-1}x)$. Apply the identity: $\sin^{-1}\left(\frac{2x}{1+x^2}\right) = 2\tan^{-1}x$ provided $x \in [-1, 1]$.
- Step 2: Check domain: $x = \frac{1}{2} \in [-1, 1]$, so $\sin^{-1}\left(\frac{2 \cdot \frac{1}{2}}{1 + \frac{1}{4}}\right) = 2\tan^{-1}\frac{1}{2}$.
- Step 3: Compute $2\tan^{-1}\frac{1}{2}$. Let $\alpha = \tan^{-1}\frac{1}{2}$, so $\tan\alpha = \frac{1}{2}$. We don't need the exact angle value yet.
- Step 4: For the $y$-term, we need $y \in [-1, 1]$ to apply the identity. Since $y > 0$ is given, assume $y \in (0, 1]$ for now. Then $\sin^{-1}\left(\frac{2y}{1+y^2}\right) = 2\tan^{-1}y$.
- Step 5: The equation becomes $2\tan^{-1}\frac{1}{2} + 2\tan^{-1}y = \frac{\pi}{2} \implies \tan^{-1}\frac{1}{2} + \tan^{-1}y = \frac{\pi}{4}$.
- Step 6: Apply the $\tan^{-1}$ addition formula (node c12_math_cbse_02_005): $\tan^{-1}\frac{1}{2} + \tan^{-1}y = \tan^{-1}\left(\frac{\frac{1}{2} + y}{1 - \frac{1}{2}y}\right)$, valid since $\frac{1}{2}y < 1$ for $y \in (0, 1]$.
- Step 7: So $\tan^{-1}\left(\frac{\frac{1}{2} + y}{1 - \frac{y}{2}}\right) = \frac{\pi}{4} \implies \frac{\frac{1}{2} + y}{1 - \frac{y}{2}} = \tan\frac{\pi}{4} = 1$.
- Step 8: Solve: $\frac{1}{2} + y = 1 - \frac{y}{2} \implies y + \frac{y}{2} = 1 - \frac{1}{2} \implies \frac{3y}{2} = \frac{1}{2} \implies y = \frac{1}{3}$.
- Step 9: Verify domain: $y = \frac{1}{3} \in (0, 1]$, so the identity application was valid.

REASONING: The identity reduces inverse sine terms to inverse tangent terms, allowing the use of the $\tan^{-1}$ addition formula which is algebraically simpler. The domain check at each step is crucial — if $y$ had been $> 1$, the identity would give $\pi - 2\tan^{-1}y$ instead, changing the equation.

ANSWER: $y = \frac{1}{3}$

## WORKED_EXAMPLE_3
PROBLEM: Evaluate the integral $\int \frac{2}{1+x^2} \, dx$ using the substitution $x = \tan\theta$, and show that the antiderivative can be expressed as $\sin^{-1}\left(\frac{2x}{1+x^2}\right) + C$ for $x \in [-1, 1]$. Explain why this antiderivative form is not valid for $|x| > 1$.

STEPS:
- Step 1: Let $x = \tan\theta$. Then $dx = \sec^2\theta \, d\theta$, and $1 + x^2 = 1 + \tan^2\theta = \sec^2\theta$.
- Step 2: Substitute: $\int \frac{2}{1+x^2} \, dx = \int \frac{2}{\sec^2\theta} \cdot \sec^2\theta \, d\theta = \int 2 \, d\theta = 2\theta + C$.
- Step 3: Since $x = \tan\theta$, $\theta = \tan^{-1}x$. So the antiderivative is $2\tan^{-1}x + C$.
- Step 4: For $x \in [-1, 1]$, apply the identity $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$.
- Step 5: Thus, for $x \in [-1, 1]$, $\int \frac{2}{1+x^2} \, dx = \sin^{-1}\left(\frac{2x}{1+x^2}\right) + C$.
- Step 6: For $|x| > 1$, $\theta = \tan^{-1}x \in (\frac{\pi}{4}, \frac{\pi}{2})$ or $(-\frac{\pi}{2}, -\frac{\pi}{4})$, so $2\theta \in (\frac{\pi}{2}, \pi)$ or $(-\pi, -\frac{\pi}{2})$.
- Step 7: But $\sin^{-1}\left(\frac{2x}{1+x^2}\right) \in [-\frac{\pi}{2}, \frac{\pi}{2}]$ always. For $x > 1$, $2\tan^{-1}x = \pi - \sin^{-1}\left(\frac{2x}{1+x^2}\right)$ (since $\sin(\pi - \alpha) = \sin\alpha$).
- Step 8: Therefore, $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ differs from the true antiderivative $2\tan^{-1}x$ by a non-constant amount ($\pi$) for $x > 1$, so it is not a valid antiderivative on intervals containing $|x| > 1$.

REASONING: This example connects inverse trigonometric identities to integral calculus (Class 12 Chapter 7). The identity holds as an antiderivative only on intervals where both sides have the same derivative AND differ by a constant. The principal value branch restriction breaks the constant-difference condition across $|x| = 1$.

ANSWER: Antiderivative is $\sin^{-1}\left(\frac{2x}{1+x^2}\right) + C$ for $x \in [-1, 1]$; not valid for $|x| > 1$ because the difference from $2\tan^{-1}x$ is $\pi$ (for $x > 1$) or $-\pi$ (for $x < -1$), not a constant.

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "Since $\frac{d}{dx}\left[2\tan^{-1}x\right] = \frac{2}{1+x^2}$ and $\frac{d}{dx}\left[\sin^{-1}\left(\frac{2x}{1+x^2}\right)\right] = \frac{2}{1+x^2}$ for all $x \in \mathbb{R}$, the functions $2\tan^{-1}x$ and $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ differ by a constant on $\mathbb{R}$, so the identity holds everywhere." Identify the error in this reasoning and state the correct relationship between the two functions on the intervals $(-\infty, -1)$, $[-1, 1]$, and $(1, \infty)$.

COMPETENCY: Error identification and correction
STEPS:
- Step 1: Compute the derivative of $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ using chain rule: $\frac{1}{\sqrt{1 - \left(\frac{2x}{1+x^2}\right)^2}} \cdot \frac{d}{dx}\left(\frac{2x}{1+x^2}\right)$.
- Step 2: Simplify: $\sqrt{1 - \frac{4x^2}{(1+x^2)^2}} = \sqrt{\frac{(1+x^2)^2 - 4x^2}{(1+x^2)^2}} = \sqrt{\frac{(1-x^2)^2}{(1+x^2)^2}} = \frac{|1-x^2|}{1+x^2}$.
- Step 3: Derivative of inner function: $\frac{2(1+x^2) - 2x(2x)}{(1+x^2)^2} = \frac{2 - 2x^2}{(1+x^2)^2} = \frac{2(1-x^2)}{(1+x^2)^2}$.
- Step 4: Multiply: $\frac{1+x^2}{|1-x^2|} \cdot \frac{2(1-x^2)}{(1+x^2)^2} = \frac{2(1-x^2)}{|1-x^2|(1+x^2)}$.
- Step 5: For $|x| < 1$, $1-x^2 > 0$, so derivative $= \frac{2}{1+x^2}$. For $|x| > 1$, $1-x^2 < 0$, so $|1-x^2| = x^2-1$, derivative $= \frac{-2}{1+x^2}$.
- Step 6: The student's error: they assumed the derivative is $\frac{2}{1+x^2}$ everywhere, ignoring the absolute value in the square root. The derivatives match only on $(-1, 1)$.
- Step 7: On $[-1, 1]$, both functions have same derivative and agree at $x=0$ (both 0), so they are identical: $2\tan^{-1}x = \sin^{-1}\left(\frac{2x}{1+x^2}\right)$.
- Step 8: On $(1, \infty)$, $2\tan^{-1}x$ increases from $\frac{\pi}{2}$ to $\pi$, while $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ decreases from $\frac{\pi}{2}$ to $0$. They satisfy $2\tan^{-1}x + \sin^{-1}\left(\frac{2x}{1+x^2}\right) = \pi$.
- Step 9: On $(-\infty, -1)$, $2\tan^{-1}x$ increases from $-\pi$ to $-\frac{\pi}{2}$, while $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ increases from $0$ to $-\frac{\pi}{2}$. They satisfy $2\tan^{-1}x - \sin^{-1}\left(\frac{2x}{1+x^2}\right) = -\pi$.

ANSWER: The error is ignoring the absolute value in $\sqrt{(1-x^2)^2} = |1-x^2|$, which flips the sign of the derivative for $|x| > 1$. Correct relationships: on $[-1, 1]$ they are equal; on $(1, \infty)$, $2\tan^{-1}x = \pi - \sin^{-1}\left(\frac{2x}{1+x^2}\right)$; on $(-\infty, -1)$, $2\tan^{-1}x = -\pi - \sin^{-1}\left(\frac{2x}{1+x^2}\right)$.
DIFFICULTY: hard

## COMPETENCY_QUESTION_2
QUESTION: In a JEE Advanced-style problem, consider the function $f(x) = \sin^{-1}\left(\frac{2x}{1+x^2}\right) - 2\tan^{-1}x$. 
(a) Find the values of $f(x)$ for $x \in (-\infty, -1)$, $x \in [-1, 1]$, and $x \in (1, \infty)$.
(b) Hence, solve the equation $\sin^{-1}\left(\frac{2x}{1+x^2}\right) = 2\tan^{-1}x + \frac{\pi}{2}$ for real $x$.
(c) Explain why the graph of $y = f(x)$ has jump discontinuities at $x = \pm 1$.

COMPETENCY: Translating real-world situations to mathematical expressions (here, piecewise analysis of inverse trigonometric functions)
STEPS:
- Step 1 (a): For $x \in [-1, 1]$, by the identity, $f(x) = 0$.
- Step 2 (a): For $x > 1$, let $x = \tan\theta$ with $\theta \in (\frac{\pi}{4}, \frac{\pi}{2})$. Then $\frac{2x}{1+x^2} = \sin 2\theta$. Since $2\theta \in (\frac{\pi}{2}, \pi)$, $\sin^{-1}(\sin 2\theta) = \pi - 2\theta$. So $f(x) = (\pi - 2\theta) - 2\theta = \pi - 4\theta = \pi - 4\tan^{-1}x$.
- Step 3 (a): For $x < -1$, let $x = \tan\theta$ with $\theta \in (-\frac{\pi}{2}, -\frac{\pi}{4})$. Then $2\theta \in (-\pi, -\frac{\pi}{2})$. $\sin^{-1}(\sin 2\theta) = -\pi - 2\theta$ (since $\sin(-\pi - \alpha) = \sin\alpha$). So $f(x) = (-\pi - 2\theta) - 2\theta = -\pi - 4\theta = -\pi - 4\tan^{-1}x$.
- Step 4 (b): Equation is $f(x) = \frac{\pi}{2}$. On $[-1, 1]$, $f(x)=0 \ne \frac{\pi}{2}$. On $(1, \infty)$, $\pi - 4\tan^{-1}x = \frac{\pi}{2} \implies 4\tan^{-1}x = \frac{\pi}{2} \implies \tan^{-1}x = \frac{\pi}{8} \implies x = \tan\frac{\pi}{8} = \sqrt{2}-1 \approx 0.414$. But this is not in $(1, \infty)$ — no solution.
- Step 5 (b): On $(-\infty, -1)$, $-\pi - 4\tan^{-1}x = \frac{\pi}{2} \implies 4\tan^{-1}x = -\frac{3\pi}{2} \implies \tan^{-1}x = -\frac{3\pi}{8}$. But $\tan^{-1}x \in (-\frac{\pi}{2}, -\frac{\pi}{4})$ for $x < -1$, and $-\frac{3\pi}{8} \approx -1.178 \in (-\frac{\pi}{2}, -\frac{\pi}{4})$. So $x = \tan(-\frac{3\pi}{8}) = -\tan\frac{3\pi}{8} = -(\sqrt{2}+1)$.
- Step 6 (c): At $x = 1$, left-hand limit $f(1^-) = 0$, right-hand limit $f(1^+) = \pi - 4\tan^{-1}1 = \pi - \pi = 0$. Wait — check: $\tan^{-1}1 = \frac{\pi}{4}$, so $f(1^+) = \pi - 4 \times \frac{\pi}{4} = 0$. At $x = -1$, $f(-1^-) = -\pi - 4\tan^{-1}(-1) = -\pi - 4(-\frac{\pi}{4}) = 0$. So $f(x)$ is actually continuous at $\pm 1$! The derivative has jump discontinuities because $f'(x) = 0$ on $(-1,1)$, $f'(x) = -\frac{4}{1+x^2}$ on $(1,\infty)$, and $f'(x) = -\frac{4}{1+x^2}$ on $(-\infty,-1)$. The student must recognise that $f(x)$ is continuous but not differentiable at $\pm 1$.

ANSWER: (a) $f(x) = \begin{cases} -\pi - 4\tan^{-1}x, & x < -1 \\ 0, & -1 \le x \le 1 \\ \pi - 4\tan^{-1}x, & x > 1 \end{cases}$ (b) $x = -(\sqrt{2}+1)$ (c) $f(x)$ is continuous at $x = \pm 1$ (value 0), but $f'(x)$ has jump discontinuities: $f'(1^-) = 0$, $f'(1^+) = -2$; $f'(-1^-) = -2$, $f'(-1^+) = 0$.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ramp must rise 1 metre over a ______ distance of 2 metres.

## DIAGNOSTIC_ANSWER_7
horizontal

Horizontal is the run beneath the rise: the ramp's tangent lives in this fraction, which is where the whole identity starts. **A wrong answer (a vertical word) reveals the student has stacked the rise twice and broken the slope's definition.**
