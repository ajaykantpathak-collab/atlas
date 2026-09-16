## DEFINITION
Simplifying expressions using inverse trigonometric identities means rewriting complex inverse trigonometric expressions (involving compositions like $\tan^{-1}(\sqrt{\frac{1-x}{1+x}})$, $\sin^{-1}(\frac{2x}{1+x^2})$, etc.) into simpler algebraic or basic trigonometric forms by applying standard identities and appropriate trigonometric substitutions (such as $x = \sin\theta$, $x = \cos\theta$, $x = \tan\theta$, $x = \sec\theta$) while strictly respecting the principal value branch restrictions of each inverse function.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
Student can independently simplify any inverse trigonometric expression of the forms $\tan^{-1}\sqrt{\frac{1\pm x}{1\mp x}}$, $\tan^{-1}\sqrt{\frac{1\pm\cos x}{1\mp\cos x}}$, $\sin^{-1}\frac{2x}{1+x^2}$, $\cos^{-1}\frac{1-x^2}{1+x^2}$, $\tan^{-1}\frac{x}{\sqrt{a^2-x^2}}$ by selecting the correct substitution, executing algebraic manipulation, and verifying the final angle lies within the principal value range of the outer inverse function.

## SCOPE_BOUNDARY
Covers simplification of inverse trigonometric expressions using standard substitutions ($x = \sin\theta, \cos\theta, \tan\theta, \sec\theta$) and identities from NCERT Exercise 2.2. Does NOT cover solving inverse trigonometric equations (next node), calculus applications (derivatives/integrals), or complex number representations. Restricted to real-valued principal branches only.

## WALKTHROUGH
Imagine you are an ISRO scientist calculating the optimal angle for a satellite dish reflector. The geometry gives you $\tan^{-1}\left(\sqrt{\frac{f-D}{f+D}}\right)$ where $f$ is focal length and $D$ is dish diameter. To interpret this angle physically, you must simplify it. Start by identifying the algebraic pattern: $\sqrt{\frac{1-x}{1+x}}$ suggests the substitution $x = \cos\theta$ because $1-\cos\theta = 2\sin^2\frac{\theta}{2}$ and $1+\cos\theta = 2\cos^2\frac{\theta}{2}$. Write down the substitution, transform the square root using half-angle identities, simplify the trigonometric ratio, apply the inverse function, and finally check that the resulting angle lies in the principal range of $\tan^{-1}$ (i.e., $(-\frac{\pi}{2}, \frac{\pi}{2})$). The key insight is recognizing that specific algebraic forms map to specific half-angle or double-angle trigonometric identities.

## DIAGNOSTIC_QUESTION_1
Write the standard trigonometric substitution used to simplify $\tan^{-1}\sqrt{\frac{1-x}{1+x}}$ and state the resulting simplified form in terms of $\cos^{-1}x$. No need to show steps.

## DIAGNOSTIC_ANSWER_1
Correct answer: Substitute $x = \cos\theta$ ($\theta \in [0, \pi]$). Then $\sqrt{\frac{1-x}{1+x}} = \sqrt{\frac{1-\cos\theta}{1+\cos\theta}} = \sqrt{\frac{2\sin^2\frac{\theta}{2}}{2\cos^2\frac{\theta}{2}}} = \tan\frac{\theta}{2}$. So $\tan^{-1}\sqrt{\frac{1-x}{1+x}} = \frac{\theta}{2} = \frac{1}{2}\cos^{-1}x$ for $x \in (-1, 1]$.

A wrong answer (e.g., using $x = \sin\theta$ or writing $\sin^{-1}x$) reveals the student has memorized formulas without understanding the structural link between the algebraic form $\frac{1-x}{1+x}$ and the half-angle identity for tangent. They cannot adapt when the expression changes slightly (e.g., $\frac{1+x}{1-x}$).

## DIAGNOSTIC_QUESTION_2
A student simplifies $\tan^{-1}\left(\sqrt{\frac{1-\cos x}{1+\cos x}}\right)$ directly to $\frac{x}{2}$ without any condition on $x$. Explain why this is incomplete and state the exact condition on $x$ for which $\frac{x}{2}$ is the correct principal value.

## DIAGNOSTIC_ANSWER_2
Correct explanation: $\sqrt{\frac{1-\cos x}{1+\cos x}} = \sqrt{\frac{2\sin^2\frac{x}{2}}{2\cos^2\frac{x}{2}}} = \left|\tan\frac{x}{2}\right|$. The principal value of $\tan^{-1}$ lies in $(-\frac{\pi}{2}, \frac{\pi}{2})$. So $\tan^{-1}\left(\left|\tan\frac{x}{2}\right|\right) = \frac{x}{2}$ only when $\frac{x}{2} \in [0, \frac{\pi}{2})$, i.e., $x \in [0, \pi)$. For $x \in (\pi, 2\pi)$, $\frac{x}{2} \in (\frac{\pi}{2}, \pi)$ where $\tan\frac{x}{2}$ is negative, so the absolute value flips the sign, and the principal value becomes $\pi - \frac{x}{2}$.

A wrong answer (e.g., "it's always $\frac{x}{2}$" or "domain of cos is all reals so it's fine") reveals the student ignores the principal value range restriction of $\tan^{-1}$ and the effect of the absolute value from the square root. This is the single biggest source of errors in board and JEE problems.

## DIAGNOSTIC_QUESTION_3
Simplify $\tan^{-1}\left(\sqrt{\frac{1-\sin x}{1+\sin x}}\right)$ for $x \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$. Show all steps including the substitution, half-angle transformation, absolute value handling, and range verification.

## DIAGNOSTIC_ANSWER_3
**Step 1:** Recognize the form $\sqrt{\frac{1-\sin x}{1+\sin x}}$. Use substitution based on $\sin x = \cos\left(\frac{\pi}{2}-x\right)$ or directly use $\sin x = 2\sin\frac{x}{2}\cos\frac{x}{2}$. Better: Write $1 \pm \sin x = \left(\sin\frac{x}{2} \pm \cos\frac{x}{2}\right)^2$.
**Step 2:** $\sqrt{\frac{1-\sin x}{1+\sin x}} = \sqrt{\frac{(\cos\frac{x}{2} - \sin\frac{x}{2})^2}{(\cos\frac{x}{2} + \sin\frac{x}{2})^2}} = \left|\frac{\cos\frac{x}{2} - \sin\frac{x}{2}}{\cos\frac{x}{2} + \sin\frac{x}{2}}\right| = \left|\frac{1 - \tan\frac{x}{2}}{1 + \tan\frac{x}{2}}\right| = \left|\tan\left(\frac{\pi}{4} - \frac{x}{2}\right)\right|$.
**Step 3:** For $x \in \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$, $\frac{x}{2} \in \left(-\frac{\pi}{4}, \frac{\pi}{4}\right)$, so $\frac{\pi}{4} - \frac{x}{2} \in \left(0, \frac{\pi}{2}\right)$. In this interval, $\tan$ is positive, so absolute value can be removed.
**Step 4:** $\tan^{-1}\left(\tan\left(\frac{\pi}{4} - \frac{x}{2}\right)\right) = \frac{\pi}{4} - \frac{x}{2}$ since $\frac{\pi}{4} - \frac{x}{2} \in \left(0, \frac{\pi}{2}\right) \subset \left(-\frac{\pi}{2}, \frac{\pi}{2}\right)$.
**Answer:** $\frac{\pi}{4} - \frac{x}{2}$.

A wrong answer (e.g., $\frac{x}{2}$ or $\frac{\pi}{2} - \frac{x}{2}$) reveals the student either used the wrong half-angle identity for sine, mishandled the absolute value, or forgot to check the principal range of $\tan^{-1}$.

## DIAGNOSTIC_QUESTION_4
Compare the two simplifications:
(A) $\tan^{-1}\sqrt{\frac{1-x}{1+x}}$ using $x = \cos\theta$
(B) $\tan^{-1}\sqrt{\frac{1-x}{1+x}}$ using $x = \sin\theta$
Which substitution directly yields the principal value without extra case analysis? Justify your answer by showing the range of the resulting angle in each case.

## DIAGNOSTIC_ANSWER_4
Correct analysis:
(A) With $x = \cos\theta$, $\theta = \cos^{-1}x \in [0, \pi]$. Then $\sqrt{\frac{1-x}{1+x}} = \tan\frac{\theta}{2}$. Since $\theta \in [0, \pi]$, $\frac{\theta}{2} \in [0, \frac{\pi}{2}) \subset (-\frac{\pi}{2}, \frac{\pi}{2})$. So $\tan^{-1}(\tan\frac{\theta}{2}) = \frac{\theta}{2} = \frac{1}{2}\cos^{-1}x$ directly, no absolute value issues.
(B) With $x = \sin\theta$, $\theta = \sin^{-1}x \in [-\frac{\pi}{2}, \frac{\pi}{2}]$. Then $1 \pm x = 1 \pm \sin\theta = (\sin\frac{\theta}{2} \pm \cos\frac{\theta}{2})^2$. The square root gives $\left|\frac{\cos\frac{\theta}{2} - \sin\frac{\theta}{2}}{\cos\frac{\theta}{2} + \sin\frac{\theta}{2}}\right| = \left|\tan(\frac{\pi}{4} - \frac{\theta}{2})\right|$. Now $\frac{\pi}{4} - \frac{\theta}{2} \in [0, \frac{\pi}{2}]$, but at $\theta = -\frac{\pi}{2}$, $\frac{\pi}{4} - \frac{\theta}{2} = \frac{\pi}{2}$ where $\tan$ is undefined. Requires case analysis.
**Conclusion:** Substitution (A) $x = \cos\theta$ is superior because it maps the domain $x \in [-1, 1]$ to $\theta \in [0, \pi]$ where the half-angle $\frac{\theta}{2}$ automatically lies in the principal range of $\tan^{-1}$.

A wrong answer (e.g., "both are fine" or "sine is easier") reveals the student does not think about range compatibility between the substitution angle and the outer inverse function's principal branch. This leads to errors in JEE Advanced where domain restrictions are deliberately tested.

## DIAGNOSTIC_QUESTION_5
A student solves: "Simplify $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ for $x \in [-1, 1]$."
Their working:
$\text{Let } x = \tan\theta \implies \theta = \tan^{-1}x$.
$\frac{2x}{1+x^2} = \frac{2\tan\theta}{1+\tan^2\theta} = \sin 2\theta$.
$\sin^{-1}\left(\frac{2x}{1+x^2}\right) = \sin^{-1}(\sin 2\theta) = 2\theta = 2\tan^{-1}x$.
They conclude the answer is $2\tan^{-1}x$ for all $x \in [-1, 1]$.
Evaluate this solution. Is it fully correct? If not, identify the flaw and give the correct piecewise expression.

## DIAGNOSTIC_ANSWER_5
**Evaluation:** The solution is **incorrect** because it ignores the principal value range of $\sin^{-1}$, which is $[-\frac{\pi}{2}, \frac{\pi}{2}]$.
**Flaw:** $\theta = \tan^{-1}x$. For $x \in [-1, 1]$, $\theta \in [-\frac{\pi}{4}, \frac{\pi}{4}]$. Then $2\theta \in [-\frac{\pi}{2}, \frac{\pi}{2}]$. **In this specific domain, $2\theta$ accidentally falls within the principal range of $\sin^{-1}$, so the answer $2\tan^{-1}x$ happens to be correct for $x \in [-1, 1]$.** However, the student's method is flawed because they did not verify the range; they assumed $\sin^{-1}(\sin 2\theta) = 2\theta$ always holds.
**Correct piecewise expression (for general $x \in \mathbb{R}$):**
$\sin^{-1}\left(\frac{2x}{1+x^2}\right) = \begin{cases}
2\tan^{-1}x, & |x| \le 1 \\
\pi - 2\tan^{-1}x, & x > 1 \\
-\pi - 2\tan^{-1}x, & x < -1
\end{cases}$
The student's answer is only valid on the restricted domain given in the question, but their reasoning would fail if the domain were extended. This reveals a dangerous habit: skipping range verification because "it worked this time."

## DIAGNOSTIC_QUESTION_6
Create a new inverse trigonometric simplification problem of the form $\tan^{-1}(f(x))$ that simplifies to $\frac{\pi}{4} - \frac{1}{2}\sin^{-1}x$ for $x \in [0, 1]$. Specify $f(x)$ explicitly and show the substitution path that leads to this result.

## DIAGNOSTIC_ANSWER_6
**Expected answer:** $f(x) = \sqrt{\frac{1-x}{1+x}}$ or equivalent forms like $\frac{\sqrt{1-x^2}}{1+x}$ or $\frac{1-x}{\sqrt{1-x^2}}$.
**Substitution path:**
1. Let $x = \sin\theta$, $\theta \in [0, \frac{\pi}{2}]$ for $x \in [0, 1]$.
2. Then $\sqrt{\frac{1-x}{1+x}} = \sqrt{\frac{1-\sin\theta}{1+\sin\theta}} = \left|\frac{\cos\frac{\theta}{2} - \sin\frac{\theta}{2}}{\cos\frac{\theta}{2} + \sin\frac{\theta}{2}}\right| = \left|\tan\left(\frac{\pi}{4} - \frac{\theta}{2}\right)\right|$.
3. For $\theta \in [0, \frac{\pi}{2}]$, $\frac{\pi}{4} - \frac{\theta}{2} \in [0, \frac{\pi}{4}] \subset (-\frac{\pi}{2}, \frac{\pi}{2})$, so $\tan$ is non-negative.
4. $\tan^{-1}\left(\tan\left(\frac{\pi}{4} - \frac{\theta}{2}\right)\right) = \frac{\pi}{4} - \frac{\theta}{2} = \frac{\pi}{4} - \frac{1}{2}\sin^{-1}x$.

A poor answer (e.g., giving $f(x) = \frac{1-x}{1+x}$ without square root, or using $x = \cos\theta$ which gives $\frac{1}{2}\cos^{-1}x$) reveals the student cannot reverse-engineer the substitution from the target simplified form. This indicates they only know forward simplification by rote, not the structural relationship between algebraic forms and trigonometric identities.

## COMMON_MISCONCEPTION
**The "Range Ignorance" Error:** Students mechanically apply $\sin^{-1}(\sin\theta) = \theta$, $\tan^{-1}(\tan\theta) = \theta$, $\cos^{-1}(\cos\theta) = \theta$ without checking whether $\theta$ lies in the principal value range of the outer inverse function.
*Concrete example:* Simplifying $\tan^{-1}\left(\sqrt{\frac{1-\cos\frac{3\pi}{2}}{1+\cos\frac{3\pi}{2}}}\right)$.
Student writes: $\sqrt{\frac{1-0}{1+0}} = 1$, so $\tan^{-1}(1) = \frac{\pi}{4}$. **Correct.**
But if the problem were $\tan^{-1}\left(\sqrt{\frac{1-\cos\frac{4\pi}{3}}{1+\cos\frac{4\pi}{3}}}\right)$:
Student substitutes $x = \frac{4\pi}{3}$, computes $\sqrt{\frac{1-(-\frac{1}{2})}{1+(-\frac{1}{2})}} = \sqrt{3}$, writes $\tan^{-1}(\sqrt{3}) = \frac{\pi}{3}$.
**Error:** They used the formula $\frac{x}{2} = \frac{2\pi}{3}$ but $\frac{2\pi}{3} \notin (-\frac{\pi}{2}, \frac{\pi}{2})$. The correct simplification: $\cos\frac{4\pi}{3} = -\frac{1}{2}$, $\sqrt{\frac{1+\frac{1}{2}}{1-\frac{1}{2}}} = \sqrt{3}$, $\tan^{-1}(\sqrt{3}) = \frac{\pi}{3}$. The formula $\frac{x}{2}$ gives $\frac{2\pi}{3}$ which is wrong. The student fails to realize that $\sqrt{\frac{1-\cos x}{1+\cos x}} = \left|\tan\frac{x}{2}\right|$, and for $x = \frac{4\pi}{3}$, $\tan\frac{2\pi}{3} = -\sqrt{3}$, absolute value makes it $\sqrt{3}$, and $\tan^{-1}(\sqrt{3}) = \frac{\pi}{3}$, not $\frac{2\pi}{3}$.

## ON_FAILURE
**Targeted remediation for Range Ignorance:**
1. **Immediate review:** Revisit **c12_math_cbse_02_001** (Domain and Range) and **c12_math_cbse_02_002** (Principal Value Branches). Write out the principal range of each inverse function on a reference card: $\sin^{-1}: [-\frac{\pi}{2}, \frac{\pi}{2}]$, $\cos^{-1}: [0, \pi]$, $\tan^{-1}: (-\frac{\pi}{2}, \frac{\pi}{2})$.
2. **Drill 5 "trap" problems** where the simplified angle falls outside the principal range:
   - $\tan^{-1}\sqrt{\frac{1-\cos\frac{4\pi}{3}}{1+\cos\frac{4\pi}{3}}}$
   - $\sin^{-1}\left(\frac{2x}{1+x^2}\right)$ for $x = 2$
   - $\cos^{-1}\left(\frac{1-x^2}{1+x^2}\right)$ for $x = -2$
   - $\tan^{-1}\left(\frac{2x}{1-x^2}\right)$ for $x = 2$
   - $\sin^{-1}(\sin\frac{5\pi}{6})$
3. **Re-diagnostic step:** Ask the student to solve $\tan^{-1}\left(\sqrt{\frac{1-\cos\frac{5\pi}{3}}{1+\cos\frac{5\pi}{3}}}\right)$ and explain in one sentence why the answer is not $\frac{5\pi}{6}$. Correct response must mention: "$\frac{5\pi}{6} \notin (-\frac{\pi}{2}, \frac{\pi}{2})$, so we use $\tan^{-1}(\tan\theta) = \theta - \pi$ for $\theta \in (\frac{\pi}{2}, \pi)$" or equivalent reasoning.

## PREREQUISITE_NODE_IDS
c12_math_cbse_02_001, c12_math_cbse_02_002, c12_math_cbse_02_003, c12_math_cbse_02_004, c12_math_cbse_02_005, c12_math_cbse_02_006, c11_math_cbse_03_008, c11_math_cbse_03_009, c11_math_cbse_03_010, c12_phy_cbse_03_002

## PREREQUISITE_REASONS
c12_math_cbse_02_001: Need domain/range of inverse functions to verify simplified results lie in correct intervals
c12_math_cbse_02_002: Principal value branches determine whether $\sin^{-1}(\sin\theta)=\theta$ or needs adjustment
c12_math_cbse_02_003: Basic properties like $\sin(\sin^{-1}x)=x$ used to verify simplifications
c12_math_cbse_02_004: $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ used in alternative simplification paths
c12_math_cbse_02_005: $\tan^{-1}$ addition formula needed when simplifying sums of inverse tangents
c12_math_cbse_02_006: $2\tan^{-1}x$ identities are direct targets of many simplification problems
c11_math_cbse_03_008: Pythagorean identities ($\sin^2\theta+\cos^2\theta=1$) underlie all half-angle derivations
c11_math_cbse_03_009: Sum/difference formulas used in substitutions like $\frac{1-\tan\theta}{1+\tan\theta} = \tan(\frac{\pi}{4}-\theta)$
c11_math_cbse_03_010: Double angle formulas ($\sin2\theta$, $\cos2\theta$, $\tan2\theta$) are the core engines of simplification
c12_phy_cbse_03_002: c12_phy_cbse_03_002 | Wave optics phase difference calculations use $\tan^{-1}$ simplifications for interference patterns  

## FORWARD_NODE_IDS
c12_math_cbse_02_008
## FORWARD_REASONS
c12_math_cbse_02_008: Word problems require simplifying inverse trig expressions to set up and solve real-world equations (e.g., height/distance, geometry optimization)

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_003, c11_math_cbse_13_010
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_003: Limits of trigonometric functions in Class 11 calculus often require simplifying inverse trig expressions (e.g., $\lim_{x\to 0} \frac{\sin^{-1}x}{x}$) before applying standard limits
c11_math_cbse_13_010: Derivatives of inverse trig functions (Class 12 calculus) require simplification skills for chain rule applications, e.g., $\frac{d}{dx}\tan^{-1}\sqrt{\frac{1-x}{1+x}}$

## CHAIN_DESCRIPTION
c12_math_cbse_02_001 -> c12_math_cbse_02_007 -> c12_math_cbse_02_008

## THIS_FORMULA
Key simplification patterns (all angles in radians):
1. $\tan^{-1}\sqrt{\frac{1-x}{1+x}} = \frac{1}{2}\cos^{-1}x,\quad x \in (-1, 1]$
2. $\tan^{-1}\sqrt{\frac{1-\cos x}{1+\cos x}} = \frac{x}{2},\quad x \in [0, \pi)$
3. $\tan^{-1}\left(\frac{\cos x - \sin x}{\cos x + \sin x}\right) = \frac{\pi}{4} - x,\quad x \in \left(-\frac{\pi}{4}, \frac{3\pi}{4}\right)$
4. $\sin^{-1}\frac{2x}{1+x^2} = 2\tan^{-1}x,\quad x \in [-1, 1]$
5. $\cos^{-1}\frac{1-x^2}{1+x^2} = 2\tan^{-1}x,\quad x \ge 0$
6. $\tan^{-1}\frac{x}{\sqrt{a^2-x^2}} = \sin^{-1}\frac{x}{a},\quad |x| < a$

## FORMULA_VARIABLES
$x$ = algebraic variable (typically in $[-1, 1]$ or appropriate domain); $a$ = positive constant ($a > 0$); $\theta$ = angle variable in radians from trigonometric substitution

## FORMULA_UNITS
dimensionless (angles in radians)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_01_005 | Calculus optimization in physics (maxima/minima of potential energy) requires simplifying inverse trig expressions from geometry
 c12_phy_cbse_03_002 | Wave optics phase difference calculations use $\tan^{-1}$ simplifications for interference patterns
## PREREQ_CONCEPT
Trigonometric substitutions ($x = \sin\theta$, $\cos\theta$, $\tan\theta$, $\sec\theta$) and half-angle/double-angle identities from Class 11

## PREREQ_BEFORE
Student must be fluent in: 1) Principal value ranges of all six inverse trig functions, 2) Double/half-angle formulas ($\sin2\theta$, $\cos2\theta$, $\tan\frac{\theta}{2}$), 3) Algebraic manipulation of square roots and rational expressions

## PREREQ_STUCK
If stuck, immediately revisit Class 11 trigonometric identities (c11_math_cbse_03_008, c11_math_cbse_03_010) and principal value branches (c12_math_cbse_02_002)

## WORKED_EXAMPLE_1
**PROBLEM:** A satellite dish has a parabolic cross-section. The angle $\theta$ between the axis and the line from focus to rim is given by $\theta = \tan^{-1}\left(\sqrt{\frac{f-D}{f+D}}\right)$ where $f = 12$ m is the focal length and $D = 5$ m is the dish radius. Simplify $\theta$ to an expression involving $\cos^{-1}$ and compute its value in degrees.

**STEPS:**
- Step 1: Identify the algebraic form $\sqrt{\frac{f-D}{f+D}} = \sqrt{\frac{1 - \frac{D}{f}}{1 + \frac{D}{f}}}$. Let $x = \frac{D}{f} = \frac{5}{12}$.
- Step 2: Recognize the standard pattern $\tan^{-1}\sqrt{\frac{1-x}{1+x}}$. Use substitution $x = \cos\alpha$ ($\alpha \in [0, \pi]$).
- Step 3: Then $\sqrt{\frac{1-x}{1+x}} = \sqrt{\frac{1-\cos\alpha}{1+\cos\alpha}} = \sqrt{\frac{2\sin^2\frac{\alpha}{2}}{2\cos^2\frac{\alpha}{2}}} = \tan\frac{\alpha}{2}$ (positive since $\frac{\alpha}{2} \in [0, \frac{\pi}{2})$).
- Step 4: $\tan^{-1}\left(\tan\frac{\alpha}{2}\right) = \frac{\alpha}{2}$ because $\frac{\alpha}{2} \in [0, \frac{\pi}{2}) \subset (-\frac{\pi}{2}, \frac{\pi}{2})$ (principal range of $\tan^{-1}$).
- Step 5: Since $x = \cos\alpha = \frac{5}{12}$, $\alpha = \cos^{-1}\frac{5}{12}$. Thus $\theta = \frac{1}{2}\cos^{-1}\frac{5}{12}$.
- Step 6: Compute numerically: $\cos^{-1}\frac{5}{12} \approx 1.148$ rad $\approx 65.77^\circ$. $\theta \approx 32.89^\circ$.

**REASONING:** The substitution $x = \cos\alpha$ is chosen because the half-angle identities $1-\cos\alpha = 2\sin^2\frac{\alpha}{2}$ and $1+\cos\alpha = 2\cos^2\frac{\alpha}{2}$ directly convert the algebraic square root into $\tan\frac{\alpha}{2}$. The principal range check is automatic because $\alpha \in [0, \pi] \implies \frac{\alpha}{2} \in [0, \frac{\pi}{2})$, which lies inside the principal range of $\tan^{-1}$. This avoids the absolute value trap.

**ANSWER:** $\theta = \frac{1}{2}\cos^{-1}\frac{5}{12} \approx 32.89^\circ$

## WORKED_EXAMPLE_2
**PROBLEM:** Simplify $\tan^{-1}\left(\frac{\cos x - \sin x}{\cos x + \sin x}\right)$ for $x \in \left(-\frac{\pi}{4}, \frac{3\pi}{4}\right)$.

**STEPS:**
- Step 1: Divide numerator and denominator by $\cos x$ (valid since $\cos x \neq 0$ in the given interval): $\frac{1 - \tan x}{1 + \tan x}$.
- Step 2: Recognize the tangent subtraction formula: $\frac{1 - \tan x}{1 + \tan x} = \tan\left(\frac{\pi}{4} - x\right)$.
- Step 3: The expression becomes $\tan^{-1}\left(\tan\left(\frac{\pi}{4} - x\right)\right)$.
- Step 4: Check principal range: $\tan^{-1}$ has range $(-\frac{\pi}{2}, \frac{\pi}{2})$. For $x \in (-\frac{\pi}{4}, \frac{3\pi}{4})$, $\frac{\pi}{4} - x \in (-\frac{\pi}{2}, \frac{\pi}{2})$. So the angle is inside the principal range.
- Step 5: Therefore $\tan^{-1}\left(\tan\left(\frac{\pi}{4} - x\right)\right) = \frac{\pi}{4} - x$.

**REASONING:** Dividing by $\cos x$ converts the ratio into the standard $\tan(A-B)$ form. The domain restriction $x \in (-\frac{\pi}{4}, \frac{3\pi}{4})$ is precisely what ensures $\frac{\pi}{4} - x$ falls in $(-\frac{\pi}{2}, \frac{\pi}{2})$, allowing direct cancellation of $\tan^{-1}$ and $\tan$. Without this domain, we would need piecewise adjustment (e.g., for $x = \pi$, $\frac{\pi}{4} - \pi = -\frac{3\pi}{4}$, and $\tan^{-1}(\tan(-\frac{3\pi}{4})) = \frac{\pi}{4}$).

**ANSWER:** $\frac{\pi}{4} - x$

## WORKED_EXAMPLE_3
**PROBLEM:** Prove that for $x \in (0, 1)$, $\sin^{-1}x = \tan^{-1}\left(\frac{x}{\sqrt{1-x^2}}\right) = \cos^{-1}\sqrt{1-x^2}$. Then evaluate $\tan^{-1}\frac{1}{\sqrt{3}} + \sin^{-1}\frac{1}{2} + \cos^{-1}\frac{\sqrt{3}}{2}$.

**STEPS:**
- Step 1: Let $x = \sin\theta$, $\theta \in (0, \frac{\pi}{2})$ for $x \in (0, 1)$. Then $\sin^{-1}x = \theta$.
- Step 2: $\sqrt{1-x^2} = \sqrt{1-\sin^2\theta} = \cos\theta$ (positive since $\theta \in (0, \frac{\pi}{2})$).
- Step 3: $\frac{x}{\sqrt{1-x^2}} = \frac{\sin\theta}{\cos\theta} = \tan\theta$. So $\tan^{-1}\left(\frac{x}{\sqrt{1-x^2}}\right) = \tan^{-1}(\tan\theta) = \theta$ (since $\theta \in (0, \frac{\pi}{2}) \subset (-\frac{\pi}{2}, \frac{\pi}{2})$).
- Step 4: $\sqrt{1-x^2} = \cos\theta \implies \cos^{-1}\sqrt{1-x^2} = \cos^{-1}(\cos\theta) = \theta$ (since $\theta \in (0, \frac{\pi}{2}) \subset [0, \pi]$).
- Step 5: All three equal $\theta = \sin^{-1}x$. Identity proved.
- Step 6: Evaluate the sum: $\tan^{-1}\frac{1}{\sqrt{3}} = \frac{\pi}{6}$, $\sin^{-1}\frac{1}{2} = \frac{\pi}{6}$, $\cos^{-1}\frac{\sqrt{3}}{2} = \frac{\pi}{6}$.
- Step 7: Sum = $\frac{\pi}{6} + \frac{\pi}{6} + \frac{\pi}{6} = \frac{\pi}{2}$.

**REASONING:** The proof uses the fundamental right-triangle relationship: if $\sin\theta = x$, then opposite = $x$, hypotenuse = 1, adjacent = $\sqrt{1-x^2}$. This gives $\tan\theta = \frac{x}{\sqrt{1-x^2}}$ and $\cos\theta = \sqrt{1-x^2}$. The range checks are straightforward because $x \in (0, 1)$ forces $\theta$ into the first quadrant where all inverse functions return the principal value directly. The evaluation then uses standard angles.

**ANSWER:** $\frac{\pi}{2}$

## COMPETENCY_QUESTION_1
**QUESTION:** A Class 12 student simplifies $\tan^{-1}\left(\sqrt{\frac{1-\cos\frac{4\pi}{3}}{1+\cos\frac{4\pi}{3}}}\right)$ as follows:
"Using the formula $\tan^{-1}\sqrt{\frac{1-\cos x}{1+\cos x}} = \frac{x}{2}$, we get $\frac{1}{2} \times \frac{4\pi}{3} = \frac{2\pi}{3}$."
Identify the conceptual error in this solution. Find the correct value and explain why the formula $\frac{x}{2}$ fails here.

**COMPETENCY:** Error identification and correction

**STEPS:**
- Step 1: Compute the expression inside the square root numerically: $\cos\frac{4\pi}{3} = -\frac{1}{2}$.
- Step 2: $\sqrt{\frac{1-(-\frac{1}{2})}{1+(-\frac{1}{2})}} = \sqrt{\frac{3/2}{1/2}} = \sqrt{3}$.
- Step 3: $\tan^{-1}(\sqrt{3}) = \frac{\pi}{3}$ (since $\tan\frac{\pi}{3} = \sqrt{3}$ and $\frac{\pi}{3} \in (-\frac{\pi}{2}, \frac{\pi}{2})$).
- Step 4: Analyze the student's error: They used $\frac{x}{2}$ without checking if $\frac{x}{2}$ lies in the principal range of $\tan^{-1}$.
- Step 5: The formula $\tan^{-1}\sqrt{\frac{1-\cos x}{1+\cos x}} = \frac{x}{2}$ is valid only when $\frac{x}{2} \in [0, \frac{\pi}{2})$, i.e., $x \in [0, \pi)$. Here $x = \frac{4\pi}{3} \notin [0, \pi)$.
- Step 6: Correct reasoning: $\sqrt{\frac{1-\cos x}{1+\cos x}} = \left|\tan\frac{x}{2}\right|$. For $x = \frac{4\pi}{3}$, $\frac{x}{2} = \frac{2\pi}{3}$, $\tan\frac{2\pi}{3} = -\sqrt{3}$, absolute value gives $\sqrt{3}$. $\tan^{-1}(\sqrt{3}) = \frac{\pi}{3}$.

**ANSWER:** The student ignored the principal value range of $\tan^{-1}$. Correct value is $\frac{\pi}{3}$. The formula $\frac{x}{2}$ fails because $\frac{2\pi}{3} \notin (-\frac{\pi}{2}, \frac{\pi}{2})$.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** (Case-based) An engineer models the angle of a robotic arm joint as $\alpha = \tan^{-1}\left(\frac{L}{\sqrt{R^2 - L^2}}\right)$ where $R = 10$ cm is the arm length and $L$ is the horizontal reach ($0 < L < R$).
(a) Show that $\alpha = \sin^{-1}\left(\frac{L}{R}\right)$.
(b) If the arm must reach a point at $L = 5\sqrt{3}$ cm, find $\alpha$ in degrees.
(c) The control software computes $\alpha$ using the $\tan^{-1}$ formula. For $L = 8$ cm, the software returns $\alpha \approx 0.927$ rad. Verify this is correct by computing $\sin^{-1}(0.8)$ and explaining why both formulas give the same result.

**COMPETENCY:** Translating real-world situations to mathematical expressions / Multi-concept integration

**STEPS:**
- Step 1 (a): Substitute $L = R\sin\theta$ ($\theta \in (0, \frac{\pi}{2})$). Then $\sqrt{R^2 - L^2} = \sqrt{R^2 - R^2\sin^2\theta} = R\cos\theta$.
- Step 2 (a): $\frac{L}{\sqrt{R^2 - L^2}} = \frac{R\sin\theta}{R\cos\theta} = \tan\theta$. So $\tan^{-1}(\tan\theta) = \theta = \sin^{-1}\frac{L}{R}$.
- Step 3 (b): $L = 5\sqrt{3}$, $R = 10 \implies \frac{L}{R} = \frac{\sqrt{3}}{2}$. $\alpha = \sin^{-1}\frac{\sqrt{3}}{2} = \frac{\pi}{3} = 60^\circ$.
- Step 4 (c): For $L = 8$, $\frac{L}{R} = 0.8$. $\sin^{-1}(0.8) \approx 0.9273$ rad. The $\tan^{-1}$ formula gives $\tan^{-1}\left(\frac{8}{\sqrt{100-64}}\right) = \tan^{-1}\left(\frac{8}{6}\right) = \tan^{-1}\frac{4}{3} \approx 0.9273$ rad. They match because both represent the same angle $\theta$ in a 3-4-5 right triangle (scaled: 6-8-10).

**ANSWER:** (a) $\alpha = \sin^{-1}(L/R)$ via substitution $L = R\sin\theta$. (b) $60^\circ$. (c) Both equal $\sin^{-1}(0.8) \approx 0.927$ rad; they are equivalent because $\tan^{-1}(L/\sqrt{R^2-L^2}) = \sin^{-1}(L/R)$ for $0 < L < R$.

**DIFFICULTY:** hard