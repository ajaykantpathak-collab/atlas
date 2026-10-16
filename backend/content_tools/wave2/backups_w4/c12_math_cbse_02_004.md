## ELI5
Two inverse functions sharing one input are secretly complements: arcsin x plus arccos x always equals pi by two, for every x from minus one to one. The reason is geometry wearing algebra - sine of an angle equals cosine of its complement - combined with the two principal branches being cut exactly to fit: one from minus pi by two to pi by two, the other from zero to pi, so the complement always lands legally inside the second branch.

## DEFINITION
The identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ holds for every $x$ in the common domain $[-1, 1]$. It states that the principal values of the inverse sine and inverse cosine of the same number are complementary angles, i.e., their sum is always $\frac{\pi}{2}$ radians (90°). This follows directly from the definition of principal value branches: $\sin^{-1}x \in [-\frac{\pi}{2}, \frac{\pi}{2}]$ and $\cos^{-1}x \in [0, \pi]$, and the trigonometric relation $\sin(\frac{\pi}{2} - \theta) = \cos\theta$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) state the identity with its exact domain condition $x \in [-1, 1]$, (2) prove it using the definition of inverse functions and complementary angle relations, (3) apply it to simplify expressions like $\sin^{-1}(\frac{1}{2}) + \cos^{-1}(\frac{1}{2})$, and (4) use it to solve equations involving both $\sin^{-1}x$ and $\cos^{-1}x$ without converting to algebraic form unnecessarily.

## SCOPE_BOUNDARY
This node covers **only** the identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$, its proof, domain validity, and direct applications in simplification and equation solving. It does **not** cover the analogous identities $\tan^{-1}x + \cot^{-1}x = \frac{\pi}{2}$ or $\csc^{-1}x + \sec^{-1}x = \frac{\pi}{2}$ (those are in later nodes), nor does it cover addition formulas like $\sin^{-1}x + \sin^{-1}y$ or $\tan^{-1}x + \tan^{-1}y$.

## WALKTHROUGH
Imagine you are designing a wheelchair ramp for a school entrance. The slope must satisfy $\sin\theta = 0.6$ for safety, but the architect gives you $\cos\theta = 0.8$. You need to verify if both describe the same angle $\theta$. Instead of calculating $\theta$ twice, you recall that for any angle, $\sin\theta = \cos(90^\circ - \theta)$. This means $\theta = \sin^{-1}(0.6)$ and $90^\circ - \theta = \cos^{-1}(0.8)$, so $\sin^{-1}(0.6) + \cos^{-1}(0.8) = 90^\circ$. Begin by writing the definition: let $\sin^{-1}x = \alpha \Rightarrow \sin\alpha = x$, with $\alpha \in [-\frac{\pi}{2}, \frac{\pi}{2}]$. Then $\cos(\frac{\pi}{2} - \alpha) = \sin\alpha = x$, so $\frac{\pi}{2} - \alpha = \cos^{-1}x$ because $\frac{\pi}{2} - \alpha \in [0, \pi]$. Rearranging gives $\alpha + \cos^{-1}x = \frac{\pi}{2}$, i.e., $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$. The key insight is that the principal ranges are *exactly* complementary intervals, making the identity universally valid on $[-1, 1]$.

Takeaway first: the complementary identity is universal on the shared domain - no case splits, no exceptions - because the two branches were designed to partition the circle's halves. Exam moves: statement questions with the domain clause, proof questions via the complementary-angle definition, simplification questions on paired inverses, and equation questions solving for x when the pair's sum is given. Method: rerun the ramp - sine's version and cosine's version of one safety angle - and watch the two quoted angles add to a right angle without any computation. Check yourself: the identity pairs arcsin with arccos only; the tangent-cotangent pair has its own branch story and its own domain caveat. Drill: prove the identity in four lines and apply it to one simplification.

## DIAGNOSTIC_QUESTION_1
State the exact domain of $x$ for which the identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ holds, and give the principal value ranges of $\sin^{-1}x$ and $\cos^{-1}x$ individually.

## DIAGNOSTIC_ANSWER_1
**Correct answer:** Domain: $x \in [-1, 1]$. Range of $\sin^{-1}x$: $[-\frac{\pi}{2}, \frac{\pi}{2}]$. Range of $\cos^{-1}x$: $[0, \pi]$.
**Why wrong answers reveal misunderstanding:** If a student writes domain as $\mathbb{R}$ or $(-1, 1)$, they confuse the domain of $\tan^{-1}$ or forget that $\sin^{-1}$ and $\cos^{-1}$ are only defined for $[-1, 1]$. If they give ranges as $(-\frac{\pi}{2}, \frac{\pi}{2})$ and $(0, \pi)$ (open intervals), they miss that endpoints are included — a frequent board-mark-losing error. If they swap the ranges, they confuse the principal branches of sine and cosine inverses.

## DIAGNOSTIC_QUESTION_2
Explain why the identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ **fails** if we use the *general* values of $\sin^{-1}x$ and $\cos^{-1}x$ (i.e., not restricting to principal branches). Give a concrete counterexample with $x = \frac{1}{2}$.

## DIAGNOSTIC_ANSWER_2
**Correct answer:** General values: $\sin^{-1}\frac{1}{2} = n\pi + (-1)^n\frac{\pi}{6}$, $\cos^{-1}\frac{1}{2} = 2m\pi \pm \frac{\pi}{3}$ ($n, m \in \mathbb{Z}$). Their sum is not constant; e.g., for $n=1, m=0$: $\sin^{-1}\frac{1}{2} = \pi - \frac{\pi}{6} = \frac{5\pi}{6}$, $\cos^{-1}\frac{1}{2} = \frac{\pi}{3}$, sum $= \frac{7\pi}{6} \neq \frac{\pi}{2}$.
**Why wrong answers reveal misunderstanding:** Students often think the identity holds for all branches because $\sin(\frac{\pi}{2} - \theta) = \cos\theta$ is universally true. They miss that *inverse* functions are defined by restricting ranges to make them single-valued; the identity is a property of the *chosen* principal branches, not of the multi-valued relations. A student who cannot produce a counterexample does not grasp the distinction between "inverse trigonometric function" (principal value) and "inverse trigonometric relation" (general values).

## DIAGNOSTIC_QUESTION_3
Evaluate $\sin^{-1}\left(-\frac{\sqrt{3}}{2}\right) + \cos^{-1}\left(-\frac{1}{2}\right)$ without using a calculator. Show all steps.

## DIAGNOSTIC_ANSWER_3
**Correct working:**
Step 1: Identify domain: both arguments are in $[-1, 1]$, so identity applies.
Step 2: Apply identity: $\sin^{-1}\left(-\frac{\sqrt{3}}{2}\right) + \cos^{-1}\left(-\frac{1}{2}\right) = \frac{\pi}{2}$.
**Alternative verification (if identity not used):**
$\sin^{-1}(-\frac{\sqrt{3}}{2}) = -\frac{\pi}{3}$ (since $\sin(-\frac{\pi}{3}) = -\frac{\sqrt{3}}{2}$ and $-\frac{\pi}{3} \in [-\frac{\pi}{2}, \frac{\pi}{2}]$).
$\cos^{-1}(-\frac{1}{2}) = \frac{2\pi}{3}$ (since $\cos\frac{2\pi}{3} = -\frac{1}{2}$ and $\frac{2\pi}{3} \in [0, \pi]$).
Sum $= -\frac{\pi}{3} + \frac{2\pi}{3} = \frac{\pi}{3}$? **Wait!** $-\frac{\pi}{3} + \frac{2\pi}{3} = \frac{\pi}{3}$, but identity says $\frac{\pi}{2}$. There is a discrepancy! Let's re-evaluate.
$\sin^{-1}(-\frac{\sqrt{3}}{2}) = -\frac{\pi}{3}$ is correct.
$\cos^{-1}(-\frac{1}{2})$: $\cos(\frac{2\pi}{3}) = -\frac{1}{2}$, and $\frac{2\pi}{3} \in [0, \pi]$, so $\cos^{-1}(-\frac{1}{2}) = \frac{2\pi}{3}$.
Sum $= -\frac{\pi}{3} + \frac{2\pi}{3} = \frac{\pi}{3}$.
But the identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ requires the *same* $x$. Here $x$ is different: first is $-\frac{\sqrt{3}}{2}$, second is $-\frac{1}{2}$. The identity **does not apply** because the arguments are different!
**Correct answer:** The identity cannot be used directly because the arguments differ. Compute separately:
$\sin^{-1}(-\frac{\sqrt{3}}{2}) = -\frac{\pi}{3}$
$\cos^{-1}(-\frac{1}{2}) = \frac{2\pi}{3}$
Sum $= \frac{\pi}{3}$.
**Why wrong answers reveal misunderstanding:** Many students blindly apply $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ even when the inputs are different numbers. This question tests whether they recognize the identity requires **identical** arguments. A student answering $\frac{\pi}{2}$ has a critical procedural flaw: they treat the identity as a universal constant sum regardless of input.

## DIAGNOSTIC_QUESTION_4
Compare the following two simplification approaches for $\sin^{-1}\left(\frac{4}{5}\right) + \cos^{-1}\left(\frac{4}{5}\right)$:
**Method A:** Directly use the identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$.
**Method B:** Let $\sin^{-1}\frac{4}{5} = \alpha$, find $\cos\alpha$, then find $\cos^{-1}\frac{4}{5}$ using a triangle, and add.
Which method is more efficient? Are both mathematically valid? Justify.

## DIAGNOSTIC_ANSWER_4
**Correct answer:** Method A is instantly efficient: answer $= \frac{\pi}{2}$ in one step, valid because $x = \frac{4}{5} \in [-1, 1]$. Method B is also valid but longer: $\sin\alpha = \frac{4}{5} \Rightarrow \cos\alpha = \frac{3}{5}$ (since $\alpha \in [0, \frac{\pi}{2}]$ for positive $x$). Then $\cos^{-1}\frac{4}{5} = \beta$ where $\cos\beta = \frac{4}{5}$. But $\beta \neq \alpha$; in fact $\beta = \frac{\pi}{2} - \alpha$. So $\alpha + \beta = \frac{\pi}{2}$. Both yield the same result, but Method A uses the derived property directly, while Method B re-derives it. Method A is preferred in exams for speed.
**Why wrong answers reveal misunderstanding:** A student who says Method B is "more fundamental" or "always safer" lacks confidence in the identity's universal validity on the domain. A student who claims Method B gives a different answer (e.g., $\alpha + \alpha = 2\alpha$) confuses $\cos^{-1}x$ with $\cos^{-1}(\cos\alpha)$ — a classic error where they think $\cos^{-1}(\frac{4}{5})$ must equal $\alpha$ because $\cos\alpha = \frac{3}{5}$, not $\frac{4}{5}$.

## DIAGNOSTIC_QUESTION_5
A student solves $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{3}$ as follows:
"Using identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$, we get $\frac{\pi}{2} = \frac{\pi}{3}$, which is false. Therefore, **no solution**."
Evaluate this solution. Is the conclusion correct? Is the reasoning complete? If not, what is missing?

## DIAGNOSTIC_ANSWER_5
**Correct evaluation:** The conclusion (no solution) is **correct**, but the reasoning is **incomplete**. The identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ holds **only for $x \in [-1, 1]$**. The student must explicitly state: "For any $x \in [-1, 1]$, LHS $= \frac{\pi}{2}$, but RHS $= \frac{\pi}{3}$, contradiction. Hence no $x \in [-1, 1]$ satisfies it. For $x \notin [-1, 1]$, $\sin^{-1}x$ and $\cos^{-1}x$ are undefined. Therefore, no solution exists in the domain of the equation."
**Why wrong answers reveal misunderstanding:** Many students write "$\frac{\pi}{2} \neq \frac{\pi}{3}$, so no solution" without mentioning the domain condition. In board exams, this loses a mark for "domain not stated". In JEE, such an answer might be accepted but shows lack of rigor. A student who says "solution exists if we use general values" fundamentally misunderstands that the equation uses the *function* notation $\sin^{-1}$, which denotes the principal value branch by convention.

## DIAGNOSTIC_QUESTION_6
Construct a problem where the identity $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ is used **in reverse** (i.e., to express $\cos^{-1}x$ in terms of $\sin^{-1}x$ or vice versa) to simplify an expression containing both. The problem must involve a parameter and require a domain check. Provide the problem statement only.

## DIAGNOSTIC_ANSWER_6
**Expected problem (example):** "Simplify $\cos^{-1}\left(\frac{2x}{1+x^2}\right)$ for $x \in [-1, 1]$ using the substitution $x = \tan\theta$ and the identity $\sin^{-1}y + \cos^{-1}y = \frac{\pi}{2}$. Verify the domain of the resulting expression."
**Criteria for a good answer:** The problem must (1) require expressing one inverse function as $\frac{\pi}{2}$ minus the other, (2) involve a parameter (like $x$ or $\theta$), (3) explicitly need a domain check (e.g., ensuring the argument stays in $[-1, 1]$ and the resulting angle lies in the correct principal range). A poor answer gives a numeric problem like "Find $\cos^{-1}(0.6)$ given $\sin^{-1}(0.6)$" — that's direct use, not reverse use, and has no parameter/domain analysis.

## COMMON_MISCONCEPTION
**Misconception:** "$\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ for all real $x$ because $\sin$ and $\cos$ are co-functions."
**Exact wrong step:** Student writes $\sin^{-1}(2) + \cos^{-1}(2) = \frac{\pi}{2}$ or uses the identity in an equation without checking $x \in [-1, 1]$.
**Why it is wrong:** $\sin^{-1}x$ and $\cos^{-1}x$ are **undefined** for $|x| > 1$. The co-function identity $\sin(\frac{\pi}{2} - \theta) = \cos\theta$ holds for all $\theta$, but the *inverse* functions only exist as real-valued functions when the input is in $[-1, 1]$. Students confuse the trigonometric identity (always true) with the inverse function identity (true only on the restricted domain). In JEE Advanced, this leads to "extraneous solutions" when solving equations like $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{3}$ — they might square both sides or manipulate algebraically and get a numeric $x$, forgetting to check if $|x| \le 1$.

## ON_FAILURE
**Remediation path:**
1. Revisit **c12_math_cbse_02_001** (Domain and Range) — confirm that $\sin^{-1}x$ and $\cos^{-1}x$ exist **only** for $x \in [-1, 1]$. Write the domain in bold on a flashcard.
2. Revisit **c10_math_cbse_08_009** (Complementary Angle Relations) — re-prove $\sin(90^\circ - \theta) = \cos\theta$ using a right triangle. Then do: "If $\sin\theta = x$, then $\theta = \sin^{-1}x$. Also $\cos(90^\circ - \theta) = x$, so $90^\circ - \theta = \cos^{-1}x$. Add: $\sin^{-1}x + \cos^{-1}x = 90^\circ$." Do this **with degree measure first**, then convert to radians.
3. **Re-diagnostic:** Solve $\sin^{-1}(x^2 - 1) + \cos^{-1}(x^2 - 1) = \frac{\pi}{2}$. Find all real $x$. (Answer: $x^2 - 1 \in [-1, 1] \Rightarrow x^2 \in [0, 2] \Rightarrow x \in [-\sqrt{2}, \sqrt{2}]$. The identity holds for all such $x$, so the equation is an identity on that domain — infinite solutions.) If the student cannot set up the domain condition $x^2 - 1 \in [-1, 1]$, repeat step 1.

## PREREQUISITE_NODE_IDS
c12_math_cbse_02_001, c12_math_cbse_02_002, c10_math_cbse_08_009, c11_math_cbse_03_003, c12_math_cbse_02_003

## PREREQUISITE_REASONS
c12_math_cbse_02_001: Provides the domain $[-1, 1]$ and ranges $[-\frac{\pi}{2}, \frac{\pi}{2}]$, $[0, \pi]$ which are essential for the identity's validity.
c12_math_cbse_02_002: Establishes the principal value branches; the identity is a property of these specific branches, not general values.
c10_math_cbse_08_009: Gives the foundational complementary angle relation $\sin(90^\circ - A) = \cos A$ used in the proof.
c11_math_cbse_03_003: Defines $\sin$, $\cos$ as functions on $\mathbb{R}$, necessary to understand why restriction is needed for inverses.
c12_math_cbse_02_003: The complementary relation \( \sin^{-1}x + \cos^{-1}x = \frac{\pi}{2} \) is a direct application of the basic properties and domain/range knowledge from this node.  

## FORWARD_NODE_IDS
c12_math_cbse_02_005, c12_math_cbse_02_006, c12_math_cbse_02_007, c12_math_cbse_02_008
## FORWARD_REASONS
c12_math_cbse_02_005: The $\tan^{-1}$ addition formula derivation often uses $\sin^{-1}/\cos^{-1}$ substitutions where this identity simplifies intermediate steps.
c12_math_cbse_02_006: The identity $2\tan^{-1}x = \sin^{-1}\frac{2x}{1+x^2}$ is proved by converting to $\sin^{-1}$ and $\cos^{-1}$ and using this complementary relation.
c12_math_cbse_02_007: Simplification of expressions like $\sin^{-1}x + \cos^{-1}(2x^2-1)$ directly applies this identity after suitable substitution.
c12_math_cbse_02_008: Word problems (e.g., height of a tower using angles of elevation/depression) often reduce to $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ when complementary angles appear.

## CROSS_SUBJECT_PREREQS
c11_stat_cbse_05_001, c11_stat_cbse_06_001
## CROSS_SUBJECT_REASONS
c11_stat_cbse_05_001: In statistics, the normal distribution's CDF involves $\frac{1}{\sqrt{2\pi}}\int e^{-t^2/2}dt$; inverse trigonometric substitutions (using $\sin^{-1}+\cos^{-1}=\frac{\pi}{2}$) appear in evaluating certain definite integrals for probabilities.
c11_stat_cbse_06_001: Measures of dispersion like standard deviation involve square roots; inverse trig substitutions with complementary identities simplify integrals of rational functions with quadratic denominators in continuous distributions.

## CHAIN_DESCRIPTION
c12_math_cbse_02_001 -> c12_math_cbse_02_004 -> c12_math_cbse_02_005

## THIS_FORMULA
$\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$, for $x \in [-1, 1]$

## FORMULA_VARIABLES
$x$: real number in the closed interval $[-1, 1]$ (the common domain of $\sin^{-1}$ and $\cos^{-1}$)

## FORMULA_UNITS
dimensionless (angles in radians; $\frac{\pi}{2}$ rad = 90°)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_math_cbse_02_005 | The $\tan^{-1}$ addition formula $\tan^{-1}x + \tan^{-1}y = \tan^{-1}\frac{x+y}{1-xy}$ is often proved by converting to $\sin^{-1}$ and $\cos^{-1}$ and using $\sin^{-1}+\cos^{-1}=\frac{\pi}{2}$ to handle quadrant adjustments.
c12_math_cbse_02_007 | Simplification of $\cos^{-1}(2x^2-1)$ for $x \in [0, 1]$ uses $x = \sin\theta$, giving $\cos^{-1}(\cos 2\theta) = 2\theta = 2\sin^{-1}x$, then $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$ helps express result in terms of $\cos^{-1}x$.
## PREREQ_CONCEPT
Complementary angle relation: $\sin(\frac{\pi}{2} - \theta) = \cos\theta$, combined with the definition of principal value branches for inverse functions.

## PREREQ_BEFORE
Student must be able to state the domain $[-1, 1]$ and principal ranges $[-\frac{\pi}{2}, \frac{\pi}{2}]$, $[0, \pi]$ of $\sin^{-1}$ and $\cos^{-1}$ without hesitation.

## PREREQ_STUCK
If stuck, immediately revisit **c12_math_cbse_02_002** (Principal Value Branches) and draw the graphs of $y = \sin^{-1}x$ and $y = \cos^{-1}x$ on the same axes; observe they are symmetric about $y = \frac{\pi}{4}$ and sum to $\frac{\pi}{2}$ visually.

## WORKED_EXAMPLE_1
**PROBLEM:** Prove that $\sin^{-1}\left(\frac{3}{5}\right) + \cos^{-1}\left(\frac{3}{5}\right) = \frac{\pi}{2}$ by explicitly computing each term using a right triangle, and verify the domain condition.

**STEPS:**
- Step 1: Check domain: $x = \frac{3}{5} \in [-1, 1]$, so both $\sin^{-1}\frac{3}{5}$ and $\cos^{-1}\frac{3}{5}$ are defined as real numbers.
- Step 2: Let $\alpha = \sin^{-1}\frac{3}{5}$. By definition, $\sin\alpha = \frac{3}{5}$ and $\alpha \in [-\frac{\pi}{2}, \frac{\pi}{2}]$. Since $\frac{3}{5} > 0$, $\alpha \in (0, \frac{\pi}{2})$.
- Step 3: Construct a right triangle with opposite side 3, hypotenuse 5. Adjacent side $= \sqrt{5^2 - 3^2} = 4$. Thus $\cos\alpha = \frac{4}{5}$.
- Step 4: Now $\cos^{-1}\frac{3}{5}$ is an angle $\beta \in [0, \pi]$ such that $\cos\beta = \frac{3}{5}$. Since $\frac{3}{5} > 0$, $\beta \in (0, \frac{\pi}{2})$.
- Step 5: In the same triangle, $\sin\beta = \frac{4}{5}$. Notice $\alpha + \beta = \frac{\pi}{2}$ because they are the two acute angles of the right triangle. Hence $\sin^{-1}\frac{3}{5} + \cos^{-1}\frac{3}{5} = \frac{\pi}{2}$.

**REASONING:** The proof uses the geometric meaning of inverse trig functions: $\sin^{-1}x$ gives an angle whose sine is $x$, and $\cos^{-1}x$ gives an angle whose cosine is $x$. For the *same* $x$, these two angles are the acute angles of a right triangle with hypotenuse 1 (or scaled), hence complementary. The domain check in Step 1 is mandatory — without it, the expressions are undefined.

**ANSWER:** $\frac{\pi}{2}$ (verified)

## WORKED_EXAMPLE_2
**PROBLEM:** Simplify $\cos^{-1}\left(\frac{1 - x^2}{1 + x^2}\right)$ for $x \ge 0$ using the substitution $x = \tan\theta$ and the identity $\sin^{-1}y + \cos^{-1}y = \frac{\pi}{2}$.

**STEPS:**
- Step 1: Substitute $x = \tan\theta$. Since $x \ge 0$, we can take $\theta \in [0, \frac{\pi}{2})$. Then $dx$ not needed; we simplify the argument:
  $\frac{1 - x^2}{1 + x^2} = \frac{1 - \tan^2\theta}{1 + \tan^2\theta} = \frac{1 - \tan^2\theta}{\sec^2\theta} = \cos^2\theta - \sin^2\theta = \cos 2\theta$.
- Step 2: The expression becomes $\cos^{-1}(\cos 2\theta)$. Now determine the range of $2\theta$: $\theta \in [0, \frac{\pi}{2}) \Rightarrow 2\theta \in [0, \pi)$.
- Step 3: Since $2\theta \in [0, \pi)$, which matches the principal range of $\cos^{-1}$ ($[0, \pi]$), we have $\cos^{-1}(\cos 2\theta) = 2\theta$.
- Step 4: But $\theta = \tan^{-1}x$. So expression $= 2\tan^{-1}x$.
- Step 5: **Alternative using the target identity:** We know $2\tan^{-1}x = \sin^{-1}\frac{2x}{1+x^2}$ (a standard result). Then $\cos^{-1}\frac{1-x^2}{1+x^2} = \frac{\pi}{2} - \sin^{-1}\frac{1-x^2}{1+x^2}$? Wait — the identity is $\sin^{-1}y + \cos^{-1}y = \frac{\pi}{2}$, so $\cos^{-1}y = \frac{\pi}{2} - \sin^{-1}y$. Here $y = \frac{1-x^2}{1+x^2}$. But we already got $2\tan^{-1}x$. To use the identity: $\sin^{-1}\frac{2x}{1+x^2} + \cos^{-1}\frac{2x}{1+x^2} = \frac{\pi}{2}$. Not directly. Instead, note that $\frac{1-x^2}{1+x^2} = \cos 2\theta$ and $\frac{2x}{1+x^2} = \sin 2\theta$. So $\cos^{-1}(\cos 2\theta) = 2\theta = \sin^{-1}(\sin 2\theta)$ because $2\theta \in [0, \pi)$ and for $2\theta \in [0, \frac{\pi}{2}]$, $\sin^{-1}(\sin 2\theta) = 2\theta$; for $2\theta \in (\frac{\pi}{2}, \pi)$, $\sin^{-1}(\sin 2\theta) = \pi - 2\theta$. The identity $\sin^{-1}y + \cos^{-1}y = \frac{\pi}{2}$ holds for $y = \cos 2\theta$? Let's check: $y = \frac{1-x^2}{1+x^2} \in [-1, 1]$. Then $\sin^{-1}y + \cos^{-1}y = \frac{\pi}{2}$. But we want $\cos^{-1}y$ alone. So $\cos^{-1}y = \frac{\pi}{2} - \sin^{-1}y$. This expresses the result in terms of $\sin^{-1}$, not simpler. The direct simplification $2\tan^{-1}x$ is the standard simplest form.

**REASONING:** The substitution $x = \tan\theta$ converts the algebraic fraction into $\cos 2\theta$ using the double-angle identity. The domain $x \ge 0$ ensures $\theta \in [0, \frac{\pi}{2})$, so $2\theta \in [0, \pi)$, which lies within the principal range of $\cos^{-1}$, allowing direct cancellation. The identity $\sin^{-1}+\cos^{-1}=\frac{\pi}{2}$ is the underlying reason why $\cos^{-1}(\cos 2\theta)$ and $\sin^{-1}(\sin 2\theta)$ are related, but the cleanest result is $2\tan^{-1}x$.

**ANSWER:** $2\tan^{-1}x$ for $x \ge 0$

## WORKED_EXAMPLE_3
**PROBLEM:** Solve for $x$: $\sin^{-1}(1 - x) - 2\sin^{-1}x = \frac{\pi}{2}$.

**STEPS:**
- Step 1: Domain restrictions: $\sin^{-1}(1-x)$ requires $1-x \in [-1, 1] \Rightarrow x \in [0, 2]$. $\sin^{-1}x$ requires $x \in [-1, 1]$. Intersection: $x \in [0, 1]$.
- Step 2: Rewrite the equation: $\sin^{-1}(1-x) = \frac{\pi}{2} + 2\sin^{-1}x$.
- Step 3: Take sine on both sides: $\sin(\sin^{-1}(1-x)) = \sin(\frac{\pi}{2} + 2\sin^{-1}x)$.
  LHS $= 1-x$ (since $1-x \in [-1,1]$).
  RHS $= \cos(2\sin^{-1}x)$ (using $\sin(\frac{\pi}{2} + A) = \cos A$).
- Step 4: Let $\alpha = \sin^{-1}x$. Then $x = \sin\alpha$, $\alpha \in [0, \frac{\pi}{2}]$ because $x \in [0, 1]$. $\cos 2\alpha = 1 - 2\sin^2\alpha = 1 - 2x^2$.
- Step 5: Equation becomes $1 - x = 1 - 2x^2 \Rightarrow 2x^2 - x = 0 \Rightarrow x(2x - 1) = 0 \Rightarrow x = 0$ or $x = \frac{1}{2}$.
- Step 6: Verify both in original equation within domain $[0, 1]$:
  $x = 0$: LHS $= \sin^{-1}(1) - 0 = \frac{\pi}{2} = $ RHS. Valid.
  $x = \frac{1}{2}$: LHS $= \sin^{-1}(\frac{1}{2}) - 2\sin^{-1}(\frac{1}{2}) = \frac{\pi}{6} - 2(\frac{\pi}{6}) = -\frac{\pi}{6} \neq \frac{\pi}{2}$. **Invalid** (extraneous from taking sine).
- Step 7: The error: taking sine is not invertible; we must check. Alternatively, use identity $\sin^{-1}(1-x) = \frac{\pi}{2} - \cos^{-1}(1-x)$. Then equation: $\frac{\pi}{2} - \cos^{-1}(1-x) - 2\sin^{-1}x = \frac{\pi}{2} \Rightarrow \cos^{-1}(1-x) + 2\sin^{-1}x = 0$. Since both terms are $\ge 0$ for $x \in [0,1]$, sum $=0 \Rightarrow$ each $=0$. So $\cos^{-1}(1-x)=0 \Rightarrow 1-x=1 \Rightarrow x=0$, and $2\sin^{-1}x=0 \Rightarrow x=0$. Only $x=0$.

**REASONING:** The identity $\sin^{-1}y + \cos^{-1}y = \frac{\pi}{2}$ allows converting $\sin^{-1}$ to $\cos^{-1}$, which here makes the equation easier because both terms become non-negative on the domain, forcing each to be zero. This avoids extraneous solutions from squaring or taking sine. The domain intersection $[0, 1]$ is critical — without it, $\sin^{-1}x$ could be negative and the non-negativity argument fails.

**ANSWER:** $x = 0$

## COMPETENCY_QUESTION_1
**QUESTION:** A student claims: "Since $\sin^{-1}x + \cos^{-1}x = \frac{\pi}{2}$, we can replace $\cos^{-1}x$ by $\frac{\pi}{2} - \sin^{-1}x$ in **any** expression." 
(a) Give an example where this replacement is valid and simplifies the expression.
(b) Give an example where this replacement leads to an **incorrect** result if the principal range of $\cos^{-1}$ is ignored. Explain why.
(c) State the precise condition on $x$ for the replacement to be algebraically valid as an identity of functions.

**COMPETENCY:** Translating real-world situations to mathematical expressions / Error identification and correction

**STEPS:**
- Step 1: For (a), choose an expression where both $\sin^{-1}x$ and $\cos^{-1}x$ appear with the same $x \in [-1, 1]$, e.g., $\sin^{-1}x + \cos^{-1}x$ itself, or $\cos^{-1}x - \sin^{-1}x = \frac{\pi}{2} - 2\sin^{-1}x$.
- Step 2: For (b), consider an expression like $\cos^{-1}(\cos 2\theta)$ where $2\theta \notin [0, \pi]$. Replacing $\cos^{-1}(\cos 2\theta)$ with $\frac{\pi}{2} - \sin^{-1}(\cos 2\theta)$ may not simplify correctly because the identity applies to the *function* $\cos^{-1}y$, not to the composition $\cos^{-1}(\cos 2\theta)$ unless $2\theta$ is in the principal range.
- Step 3: For (c), the condition is $x \in [-1, 1]$. The replacement $\cos^{-1}x = \frac{\pi}{2} - \sin^{-1}x$ holds as an identity of functions on $[-1, 1]$.

**ANSWER:** 
(a) Simplify $\sin^{-1}(\frac{1}{2}) + \cos^{-1}(\frac{1}{2}) = \frac{\pi}{6} + (\frac{\pi}{2} - \frac{\pi}{6}) = \frac{\pi}{2}$. Valid because $\frac{1}{2} \in [-1, 1]$.
(b) Let $x = \cos(\frac{3\pi}{4}) = -\frac{\sqrt{2}}{2}$. Then $\cos^{-1}x = \frac{3\pi}{4}$. But $\frac{\pi}{2} - \sin^{-1}(-\frac{\sqrt{2}}{2}) = \frac{\pi}{2} - (-\frac{\pi}{4}) = \frac{3\pi}{4}$. Wait, this actually works because $x \in [-1,1]$. A better example: The replacement is **always** valid for $x \in [-1,1]$ as an identity of the *functions*. The student's claim is actually **correct** for the functions themselves. The error arises if they apply it to $\cos^{-1}(f(x))$ and replace with $\frac{\pi}{2} - \sin^{-1}(f(x))$ without ensuring $f(x) \in [-1,1]$. For instance, $\cos^{-1}(2)$ is undefined; replacing with $\frac{\pi}{2} - \sin^{-1}(2)$ is also undefined. No "incorrect result" if domain is respected. The misconception is thinking the replacement works for *general values* (multi-valued). If the student means: "In $\cos^{-1}(\cos \theta)$, I can write $\frac{\pi}{2} - \sin^{-1}(\cos \theta)$ and simplify", that fails when $\theta \notin [0, \pi]$. Example: $\theta = \frac{3\pi}{2}$. $\cos^{-1}(\cos \frac{3\pi}{2}) = \cos^{-1}(0) = \frac{\pi}{2}$. But $\frac{\pi}{2} - \sin^{-1}(\cos \frac{3\pi}{2}) = \frac{\pi}{2} - \sin^{-1}(0) = \frac{\pi}{2}$. Still works? Actually $\sin^{-1}(\cos \theta)$ is tricky. Better: The identity $\cos^{-1}y = \frac{\pi}{2} - \sin^{-1}y$ holds for $y \in [-1,1]$. If a student applies it to $y = \cos \theta$ and writes $\cos^{-1}(\cos \theta) = \frac{\pi}{2} - \sin^{-1}(\cos \theta)$, the RHS is $\frac{\pi}{2} - \sin^{-1}(\cos \theta)$. For $\theta = \frac{3\pi}{2}$, $\cos \theta = 0$, RHS $= \frac{\pi}{2} - 0 = \frac{\pi}{2}$, LHS $= \frac{\pi}{2}$. It holds. The only failure is when $y \notin [-1,1]$. So the student's claim is **correct** for the functions on their domain. The competency question should expose that the student might think it holds for *all real x* (domain error) or for *general values* (branch error).
Let's adjust: The student says "in any expression". Counterexample: Expression $\cos^{-1}(2)$. Replacement gives $\frac{\pi}{2} - \sin^{-1}(2)$. Both undefined. Not "incorrect result", just undefined. Another: Expression $\cos^{-1}(\sin \theta)$. If $\theta = \pi$, $\cos^{-1}(0) = \frac{\pi}{2}$. Replacement: $\frac{\pi}{2} - \sin^{-1}(0) = \frac{\pi}{2}$. Works. The identity is robust. The real trap is in solving equations: $\cos^{-1}x = \frac{\pi}{3} \Rightarrow \frac{\pi}{2} - \sin^{-1}x = \frac{\pi}{3} \Rightarrow \sin^{-1}x = \frac{\pi}{6} \Rightarrow x = \frac{1}{2}$. This is valid. 
I'll reframe: The student's claim is **true** for the principal value functions on $[-1,1]$. The competency is to recognize that it is an **identity of functions**, not just numbers, and the condition is $x \in [-1, 1]$. 

**Revised Answer:**
(a) $\cos^{-1}(\frac{1}{2}) = \frac{\pi}{2} - \sin^{-1}(\frac{1}{2}) = \frac{\pi}{2} - \frac{\pi}{6} = \frac{\pi}{3}$. Valid.
(b) If the expression involves $\cos^{-1}(f(x))$ where $f(x)$ may be outside $[-1, 1]$, e.g., $\cos^{-1}(x^2+1)$. Replacement gives $\frac{\pi}{2} - \sin^{-1}(x^2+1)$. Both sides are undefined for all real $x$, so not "incorrect" but meaningless. The real error is applying the identity to **general values**: e.g., claiming $\cos^{-1}(0) = \frac{\pi}{2} - \sin^{-1}(0)$ gives $\frac{\pi}{2}$ (principal), but the general value of $\cos^{-1}(0)$ is $2n\pi \pm \frac{\pi}{2}$, while RHS general value is $\frac{\pi}{2} - n\pi$, which are different sets. So the replacement fails for general values.
(c) Condition: $x \in [-1, 1]$. The replacement $\cos^{-1}x = \frac{\pi}{2} - \sin^{-1}x$ is an identity of the **principal value functions** on this domain.

**DIFFICULTY:** medium

## COMPETENCY_QUESTION_2
**QUESTION:** (JEE Main style) Let $f(x) = \sin^{-1}\left(\frac{2x}{1+x^2}\right) + \cos^{-1}\left(\frac{1-x^2}{1+x^2}\right)$ for $x \in \mathbb{R}$. 
(a) Find the simplified expression for $f(x)$ by considering the intervals $x \in [0, 1]$, $x \in [1, \infty)$, and $x \in (-\infty, 0]$. 
(b) Hence, find the number of solutions of $f(x) = \frac{\pi}{2}$ in the interval $[-2, 2]$.

**COMPETENCY:** Comparing and justifying / Multi-step analytical reasoning

**STEPS:**
- Step 1: Recognize $\frac{2x}{1+x^2}$ and $\frac{1-x^2}{1+x^2}$ as $\sin 2\theta$ and $\cos 2\theta$ with $x = \tan\theta$.
- Step 2: For $x \in [0, 1]$, $\theta \in [0, \frac{\pi}{4}]$, so $2\theta \in [0, \frac{\pi}{2}]$. Then $\sin^{-1}(\sin 2\theta) = 2\theta$, $\cos^{-1}(\cos 2\theta) = 2\theta$. $f(x) = 4\theta = 4\tan^{-1}x$.
- Step 3: For $x \in [1, \infty)$, $\theta \in [\frac{\pi}{4}, \frac{\pi}{2})$, so $2\theta \in [\frac{\pi}{2}, \pi)$. Then $\sin^{-1}(\sin 2\theta) = \pi - 2\theta$, $\cos^{-1}(\cos 2\theta) = 2\theta$. $f(x) = \pi$.
- Step 4: For $x \in (-\infty, 0]$, $\theta \in (-\frac{\pi}{2}, 0]$, so $2\theta \in (-\pi, 0]$. Then $\sin^{-1}(\sin 2\theta) = 2\theta$ (since $2\theta \in [-\frac{\pi}{2}, 0] \subset [-\frac{\pi}{2}, \frac{\pi}{2}]$), $\cos^{-1}(\cos 2\theta) = -2\theta$ (since $2\theta \in [-\pi, 0]$, $\cos^{-1}(\cos \alpha) = -\alpha$ for $\alpha \in [-\pi, 0]$). $f(x) = 2\theta - 2\theta = 0$.
- Step 5: Solve $f(x) = \frac{\pi}{2}$ in $[-2, 2]$. Check each interval:
  $x \in [0, 1]$: $4\tan^{-1}x = \frac{\pi}{2} \Rightarrow \tan^{-1}x = \frac{\pi}{8} \Rightarrow x = \tan\frac{\pi}{8} = \sqrt{2}-1 \approx 0.414 \in [0,1]$. One solution.
  $x \in [1, 2]$: $f(x) = \pi \neq \frac{\pi}{2}$. No solution.
  $x \in [-2, 0]$: $f(x) = 0 \neq \frac{\pi}{2}$. No solution.
- Step 6: Total solutions = 1.

**ANSWER:** (a) $f(x) = \begin{cases} 4\tan^{-1}x, & 0 \le x \le 1 \\ \pi, & x \ge 1 \\ 0, & x \le 0 \end{cases}$ (b) 1 solution ($x = \tan\frac{\pi}{8}$).

**DIFFICULTY:** hard