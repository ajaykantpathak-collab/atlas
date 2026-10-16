## ELI5
A poster of fixed printed area wrapped in fixed margins: total paper depends on the width, and the designer wants the cheapest sheet. Critical points are where the derivative zeroes or fails - candidates, not verdicts. The First Derivative Test holds the verdict: if the derivative flips from negative to positive, the point is a valley (minimum); positive to negative, a hill (maximum); no flip, a mere pause. Sign charts around each candidate settle every case.

## DEFINITION
The First Derivative Test determines the nature of a critical point \(c\) (where \(f'(c)=0\) or \(f\) is not differentiable) by examining the sign change of \(f'(x)\) as \(x\) increases through \(c\): if \(f'(x)\) changes from positive to negative, \(c\) is a point of local maxima; if it changes from negative to positive, \(c\) is a point of local minima; if no sign change occurs, \(c\) is a point of inflection (neither maxima nor minima).

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
The student can independently identify all critical points of a polynomial, rational, or trigonometric function, construct a correct sign chart for \(f'(x)\), apply the First Derivative Test to classify each critical point as local maxima, local minima, or point of inflection, and state the corresponding local extremum values with proper justification.

## SCOPE_BOUNDARY
Covers the First Derivative Test for local maxima/minima on open intervals for functions differentiable except at isolated critical points. Includes polynomial, rational, trigonometric, and absolute-value functions. Does NOT cover the Second Derivative Test (next node), absolute/global extrema on closed intervals (later in chapter), or multivariable optimization.

## WALKTHROUGH
Imagine you are designing a rectangular poster with a fixed printed area of 1200 cm² and margins of 10 cm top/bottom and 5 cm left/right. You want to minimise the total paper used. The total area becomes a function of one variable (say, width). To find the optimal dimensions, you first find where the derivative is zero — these are critical points. But not every critical point gives a minimum! You must check whether the derivative changes from negative to positive (valley) or positive to negative (hill). That is exactly what the First Derivative Test does. We start by finding \(f'(x)\), solving \(f'(x)=0\), then testing the sign of \(f'(x)\) on intervals around each critical point.

Takeaway first: critical points are suspects, and the sign change of the derivative around them is the evidence - direction of the flip names the crime. Exam moves: identification questions finding all critical points, sign-chart questions constructing the evidence, classification questions labelling max, min or inflection, and value questions reporting the extremum's height. Method: rerun the poster - differentiate the paper-area function, solve for candidates, then test signs on both flanks of each. Check yourself: a critical point with no sign change is neither hill nor valley - passing through level ground is a real possibility, not a failure of the test. Drill: classify every critical point of one function with a full sign chart.

## DIAGNOSTIC_QUESTION_1
State the First Derivative Test conditions for a critical point \(c\) to be a point of local maxima.

## DIAGNOSTIC_ANSWER_1
**Answer:** For a critical point \(c\), if \(f'(x) > 0\) for \(x\) sufficiently close to and left of \(c\), and \(f'(x) < 0\) for \(x\) sufficiently close to and right of \(c\), then \(c\) is a point of local maxima.  
**Misconception check:** A student who writes "\(f'(c) = 0\) and \(f'(x)\) changes from negative to positive" has confused the conditions for maxima and minima. This reveals they memorised the test without understanding the geometric meaning: maxima occur where the function stops increasing and starts decreasing.

## DIAGNOSTIC_QUESTION_2
A student claims: "If \(f'(c) = 0\), then \(c\) must be either a local maximum or a local minimum." Is this statement true? Justify your answer with a counterexample if false.

## DIAGNOSTIC_ANSWER_2
**Answer:** False. \(f'(c)=0\) is necessary but not sufficient for a local extremum. Counterexample: \(f(x)=x^3\) at \(c=0\). Here \(f'(x)=3x^2\), so \(f'(0)=0\), but \(f'(x) > 0\) on both sides of 0, so \(x=0\) is a point of inflection, not a maximum or minimum.  
**Misconception check:** Students often believe "derivative zero ⇒ extremum". This error comes from ignoring the sign-change requirement of the First Derivative Test. The wrong answer reveals they have not internalised that critical points can also be inflection points.

## DIAGNOSTIC_QUESTION_3
Find all points of local maxima and local minima of \(f(x) = x^3 - 6x^2 + 9x + 15\) using the First Derivative Test.

## DIAGNOSTIC_ANSWER_3
**Solution:**  
1. \(f'(x) = 3x^2 - 12x + 9 = 3(x^2 - 4x + 3) = 3(x-1)(x-3)\)  
2. Critical points: \(f'(x)=0 \Rightarrow x=1, 3\)  
3. Sign chart for \(f'(x) = 3(x-1)(x-3)\):  
   - \(x < 1\): \((x-1)<0, (x-3)<0 \Rightarrow f'(x) > 0\)  
   - \(1 < x < 3\): \((x-1)>0, (x-3)<0 \Rightarrow f'(x) < 0\)  
   - \(x > 3\): \((x-1)>0, (x-3)>0 \Rightarrow f'(x) > 0\)  
4. At \(x=1\): \(f'(x)\) changes from \(+\) to \(-\) ⇒ local maxima. \(f(1) = 1 - 6 + 9 + 15 = 19\)  
5. At \(x=3\): \(f'(x)\) changes from \(-\) to \(+\) ⇒ local minima. \(f(3) = 27 - 54 + 27 + 15 = 15\)  
**Answer:** Local maximum at \(x=1\), value 19; local minimum at \(x=3\), value 15.  
**Error analysis:** A student who only computes \(f'(x)=0\) and stops, or who misidentifies the sign intervals (e.g., forgets the factor 3 doesn't affect sign), reveals they treat the test as a formula rather than a sign-analysis procedure.

## DIAGNOSTIC_QUESTION_4
Compare the First Derivative Test and the Second Derivative Test. When would you prefer the First Derivative Test over the Second Derivative Test? Give a specific function example where the Second Derivative Test fails but the First Derivative Test works.

## DIAGNOSTIC_ANSWER_4
**Answer:** The First Derivative Test uses sign change of \(f'(x)\); the Second Derivative Test uses the sign of \(f''(c)\) at a critical point where \(f'(c)=0\). The Second Derivative Test fails when \(f''(c)=0\) (inconclusive). Example: \(f(x)=x^4\) at \(x=0\). \(f'(x)=4x^3\), \(f'(0)=0\); \(f''(x)=12x^2\), \(f''(0)=0\) — Second Derivative Test fails. First Derivative Test: \(f'(x)<0\) for \(x<0\), \(f'(x)>0\) for \(x>0\) ⇒ sign changes \(-\) to \(+\) ⇒ local minimum at \(x=0\).  
**Misconception check:** A student who says "Second Derivative Test is always easier" misses that it fails for higher-order flat extrema. The wrong answer shows they don't know the limitation \(f''(c) \neq 0\).

## DIAGNOSTIC_QUESTION_5
A student solved \(f(x) = |x^2 - 4|\) for local extrema and wrote: "\(f'(x) = 2x\) for \(x>2\) and \(x<-2\), and \(f'(x) = -2x\) for \(-2<x<2\). Critical points at \(x=0, \pm2\). At \(x=0\), \(f'(x)\) changes from \(+\) to \(-\) so local maxima. At \(x=\pm2\), derivative does not exist, so they are not extrema." Identify the errors in this solution.

## DIAGNOSTIC_ANSWER_5
**Errors:**  
1. At \(x=\pm2\), \(f\) is not differentiable but these ARE critical points and MUST be tested. The student incorrectly dismissed them.  
2. At \(x=-2\): for \(x<-2\), \(f(x)=x^2-4 \Rightarrow f'(x)=2x < 0\); for \(-2<x<0\), \(f(x)=4-x^2 \Rightarrow f'(x)=-2x > 0\). Sign changes \(-\) to \(+\) ⇒ local minima at \(x=-2\).  
3. At \(x=2\): for \(0<x<2\), \(f'(x)=-2x < 0\); for \(x>2\), \(f'(x)=2x > 0\). Sign changes \(-\) to \(+\) ⇒ local minima at \(x=2\).  
4. At \(x=0\): sign changes \(+\) to \(-\) ⇒ local maxima (this part is correct).  
**Misconception check:** The student thinks "non-differentiable ⇒ not extrema". This is a classic error — non-differentiable points are critical points and often give absolute or local extrema (e.g., \(f(x)=|x|\) at \(x=0\)).

## DIAGNOSTIC_QUESTION_6
Construct a cubic polynomial \(f(x)\) that has a local maximum at \(x=-1\) with value 5, a local minimum at \(x=2\) with value -4, and no other critical points. Verify your answer using the First Derivative Test.

## DIAGNOSTIC_ANSWER_6
**Construction:** A cubic with critical points at \(x=-1, 2\) has derivative \(f'(x) = k(x+1)(x-2) = k(x^2 - x - 2)\). For correct sign pattern: \(f'(x)>0\) for \(x<-1\), \(f'(x)<0\) for \(-1<x<2\), \(f'(x)>0\) for \(x>2\) ⇒ \(k>0\). Choose \(k=1\): \(f'(x)=x^2-x-2\). Integrate: \(f(x) = \frac{x^3}{3} - \frac{x^2}{2} - 2x + C\). Use \(f(-1)=5\): \(-\frac{1}{3} - \frac{1}{2} + 2 + C = 5 \Rightarrow C = 5 - \frac{7}{6} = \frac{23}{6}\). Check \(f(2) = \frac{8}{3} - 2 - 4 + \frac{23}{6} = \frac{16-12-24+23}{6} = \frac{3}{6} = 0.5 \neq -4\). Adjust \(k\): need \(f(2)-f(-1) = -9\). Compute difference with general \(k\): \(f(2)-f(-1) = k\left[\frac{8}{3}-2-4 - (-\frac{1}{3}-\frac{1}{2}+2)\right] = k\left[-\frac{10}{3} + \frac{7}{6}\right] = k\left(-\frac{13}{6}\right)\). Set \(-\frac{13k}{6} = -9 \Rightarrow k = \frac{54}{13}\). Then \(C\) from \(f(-1)=5\). Final polynomial: \(f(x) = \frac{18}{13}x^3 - \frac{27}{13}x^2 - \frac{108}{13}x + \frac{104}{13}\). Verification: \(f'(x) = \frac{54}{13}(x+1)(x-2)\), sign chart confirms max at -1, min at 2.  
**Criteria for good answer:** Correct derivative form, correct sign pattern, correct integration, correct constant determination, verification shown. Poor answer reveals inability to work backwards from derivative properties to the function.

## COMMON_MISCONCEPTION
**Misconception:** "Critical points only occur where \(f'(x)=0\). Points where \(f\) is not differentiable are not critical points and cannot be extrema."  
**Why it's wrong:** By definition (NCERT), a critical point is where \(f'(c)=0\) **OR** \(f\) is not differentiable. Functions like \(f(x)=|x|\) have a minimum at \(x=0\) where \(f'(0)\) does not exist. In JEE/Board exams, questions often involve \(f(x)=|x-a|\), \(f(x)=|x^2-4|\), or piecewise functions where the extremum occurs at a non-differentiable point. Students who ignore these points lose 2-3 marks per question. The error stems from over-relying on "set derivative = 0" as the only step.

## ON_FAILURE
If a student dismisses non-differentiable points:  
1. **Revisit definition:** Show the NCERT note: "A point \(c\) in the domain of a function \(f\) at which either \(f'(c)=0\) or \(f\) is not differentiable is called a critical point of \(f\)."  
2. **Concrete example:** Work \(f(x)=|x-2|\) step-by-step: domain \(\mathbb{R}\), \(f'(x)=1\) for \(x>2\), \(f'(x)=-1\) for \(x<2\), \(f'(2)\) DNE. Sign chart: \(-\) to \(+\) at \(x=2\) ⇒ local (and absolute) minimum at \(x=2\).  
3. **Practice:** Assign 3 problems from Exercise 6.3 (Q2, Q3-iv, Q3-v) where non-differentiable points are extrema.  
4. **Re-diagnostic:** Ask: "Find local extrema of \(f(x)=|x^2-1|\) on \(\mathbb{R}\)." Check if they test \(x=\pm1\).

## PREREQUISITE_NODE_IDS
c12_math_cbse_06_002, c11_math_cbse_13_007, c11_math_cbse_13_009, c11_math_cbse_13_010, c12_math_cbse_06_001

## PREREQUISITE_REASONS
c12_math_cbse_06_002: Increasing/decreasing intervals and sign of \(f'(x)\) are the direct foundation for the First Derivative Test's sign-chart analysis.
c11_math_cbse_13_007: Derivative of polynomial functions — needed to compute \(f'(x)\) for polynomial optimisation problems.
c11_math_cbse_13_009: Algebra of derivatives (sum, product, chain rules) — required to differentiate rational, trigonometric, and composite functions in this node.
c11_math_cbse_13_010: Derivatives of trigonometric functions — needed for problems like \(f(x)=\sin x + \cos x\) or \(f(x)=\sin 3x\) in Exercise 6.3.
c12_math_cbse_06_001: First derivative test for maxima/minima relies on rate of change changing sign at critical points.  

## FORWARD_NODE_IDS
c12_math_cbse_06_004, c12_math_cbse_06_007, c12_math_cbse_06_008
## FORWARD_REASONS
c12_math_cbse_06_004: Second Derivative Test is an alternative method for classifying critical points; students must know First Derivative Test first to understand when/why the second test is used (and when it fails).
c12_math_cbse_06_007: Word problems on maxima/minima require the First Derivative Test (or Second) to verify that the critical point found actually gives a maximum/minimum in the real-world context.
c12_math_cbse_06_008: Critical Points and Inflection Points formally defines and expands on the classification of critical points introduced here, including higher-order inflection points.

## CROSS_SUBJECT_PREREQS
c12_phy_cbse_02_003, c12_eco_cbse_03_005
## CROSS_SUBJECT_REASONS
c12_physics_cbse_02_003: Physics optimisation problems (e.g., maximum range of projectile, minimum deviation in prism, maximum power transfer) use the First Derivative Test to confirm the nature of critical points found by setting derivative to zero.
c12_economics_cbse_03_005: Profit maximisation and cost minimisation in economics require verifying that the critical point of the profit/cost function is indeed a maximum/minimum using the First Derivative Test (or Second).
c12_phy_cbse_02_003: Cross-subject support: The electrostatic potential at a point due to an electric dipole is the work done per unit... supplies tools/facts used directly in this node.  
c12_eco_cbse_03_005: Cross-subject support: In the short run, Total Fixed Cost (TFC) is the cost of fixed inputs (e.g., rent, machiner... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c12_math_cbse_06_002 -> c12_math_cbse_06_003 -> c12_math_cbse_06_004

## THIS_FORMULA
First Derivative Test: Let \(c\) be a critical point of \(f\) (i.e., \(f'(c)=0\) or \(f\) not differentiable at \(c\)) and \(f\) continuous at \(c\).  
- If \(f'(x)\) changes from \(+\) to \(-\) as \(x\) increases through \(c\) ⇒ \(c\) is local maxima.  
- If \(f'(x)\) changes from \(-\) to \(+\) as \(x\) increases through \(c\) ⇒ \(c\) is local minima.  
- If \(f'(x)\) does not change sign ⇒ \(c\) is point of inflection.

## FORMULA_VARIABLES
\(f\) = real-valued function; \(c\) = critical point in domain of \(f\); \(f'(x)\) = first derivative; \(x\) = independent variable; sign of \(f'(x)\) = positive (+) or negative (-) on intervals left/right of \(c\).

## FORMULA_UNITS
dimensionless (pure mathematical test; units depend on the applied problem context, e.g., rupees, metres, cm²)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Projectile motion: maximum height occurs when vertical velocity \(v_y=0\); First Derivative Test confirms \(v_y\) changes from \(+\) to \(-\) at the apex.
 c12_eco_cbse_03_005 | Profit function \(P(x)=R(x)-C(x)\); maximum profit at \(x^*\) where \(P'(x^*)=0\) and \(P'(x)\) changes \(+\) to \(-\).
## PREREQ_CONCEPT
Sign analysis of the first derivative on intervals determined by critical points.

## PREREQ_BEFORE
Student must be able to find critical points (solve \(f'(x)=0\) and identify non-differentiable points) and determine the sign of \(f'(x)\) on intervals using test points or factor analysis.

## PREREQ_STUCK
If stuck, revisit "Increasing and Decreasing Functions" (c12_math_cbse_06_002) to practice sign-chart construction for \(f'(x)\), and "Derivative of Polynomial/Trigonometric Functions" (c11_math_cbse_13_007, c11_math_cbse_13_010) for differentiation skills.

## WORKED_EXAMPLE_1
PROBLEM: A manufacturer finds that the profit (in rupees) from selling \(x\) units of a product is given by \(P(x) = -2x^3 + 21x^2 - 60x + 100\). Find the number of units that maximises the profit and the maximum profit using the First Derivative Test.

STEPS:
- Step 1: Compute the first derivative \(P'(x) = \frac{d}{dx}(-2x^3 + 21x^2 - 60x + 100) = -6x^2 + 42x - 60\).
- Step 2: Find critical points by solving \(P'(x) = 0\): \(-6x^2 + 42x - 60 = 0 \Rightarrow x^2 - 7x + 10 = 0 \Rightarrow (x-2)(x-5)=0 \Rightarrow x=2, 5\).
- Step 3: Factor \(P'(x)\) completely: \(P'(x) = -6(x-2)(x-5)\). The leading coefficient \(-6 < 0\).
- Step 4: Construct sign chart for \(P'(x)\) on intervals \((-\infty, 2)\), \((2, 5)\), \((5, \infty)\):
  - For \(x < 2\) (e.g., \(x=0\)): \((x-2)<0\), \((x-5)<0\), product positive, times \(-6\) ⇒ \(P'(x) < 0\).
  - For \(2 < x < 5\) (e.g., \(x=3\)): \((x-2)>0\), \((x-5)<0\), product negative, times \(-6\) ⇒ \(P'(x) > 0\).
  - For \(x > 5\) (e.g., \(x=6\)): \((x-2)>0\), \((x-5)>0\), product positive, times \(-6\) ⇒ \(P'(x) < 0\).
- Step 5: Apply First Derivative Test: At \(x=2\), \(P'(x)\) changes from \(-\) to \(+\) ⇒ local minimum. At \(x=5\), \(P'(x)\) changes from \(+\) to \(-\) ⇒ local maximum.
- Step 6: Compute maximum profit: \(P(5) = -2(125) + 21(25) - 60(5) + 100 = -250 + 525 - 300 + 100 = 75\) rupees.
- Step 7: Interpret: Since \(x\) represents units sold, \(x=5\) is valid. Maximum profit is ₹75 at 5 units.

REASONING: The profit function is a cubic with negative leading coefficient, so it rises to a local max, falls to a local min, then falls to \(-\infty\). The First Derivative Test correctly identifies \(x=5\) as the peak (maxima) because the derivative changes from positive (profit increasing) to negative (profit decreasing). The sign chart uses the factored form of \(P'(x)\) to avoid arithmetic errors.

ANSWER: Maximum profit of ₹75 occurs at 5 units.

## WORKED_EXAMPLE_2
PROBLEM: Find the local maxima and minima of \(f(x) = \sin x + \cos x\) on the interval \(0 < x < 2\pi\) using the First Derivative Test.

STEPS:
- Step 1: Compute derivative: \(f'(x) = \cos x - \sin x\).
- Step 2: Find critical points in \((0, 2\pi)\): \(f'(x)=0 \Rightarrow \cos x = \sin x \Rightarrow \tan x = 1\). In \((0, 2\pi)\), \(x = \frac{\pi}{4}, \frac{5\pi}{4}\).
- Step 3: Check for non-differentiable points: \(\sin x\) and \(\cos x\) are differentiable everywhere, so no additional critical points.
- Step 4: Determine sign of \(f'(x) = \cos x - \sin x\) on intervals \((0, \frac{\pi}{4})\), \((\frac{\pi}{4}, \frac{5\pi}{4})\), \((\frac{5\pi}{4}, 2\pi)\):
  - Test \(x = \frac{\pi}{6} \in (0, \frac{\pi}{4})\): \(\cos \frac{\pi}{6} = \frac{\sqrt{3}}{2} \approx 0.866\), \(\sin \frac{\pi}{6} = 0.5\) ⇒ \(f'(x) > 0\).
  - Test \(x = \pi \in (\frac{\pi}{4}, \frac{5\pi}{4})\): \(\cos \pi = -1\), \(\sin \pi = 0\) ⇒ \(f'(x) < 0\).
  - Test \(x = \frac{3\pi}{2} \in (\frac{5\pi}{4}, 2\pi)\): \(\cos \frac{3\pi}{2} = 0\), \(\sin \frac{3\pi}{2} = -1\) ⇒ \(f'(x) = 1 > 0\).
- Step 5: Apply First Derivative Test:
  - At \(x = \frac{\pi}{4}\): \(f'(x)\) changes \(+\) to \(-\) ⇒ local maximum. \(f(\frac{\pi}{4}) = \frac{1}{\sqrt{2}} + \frac{1}{\sqrt{2}} = \sqrt{2}\).
  - At \(x = \frac{5\pi}{4}\): \(f'(x)\) changes \(-\) to \(+\) ⇒ local minimum. \(f(\frac{5\pi}{4}) = -\frac{1}{\sqrt{2}} - \frac{1}{\sqrt{2}} = -\sqrt{2}\).
- Step 6: Verify with trigonometric identity: \(f(x) = \sqrt{2}\sin(x+\frac{\pi}{4})\), which confirms max \(\sqrt{2}\) at \(x+\frac{\pi}{4}=\frac{\pi}{2} \Rightarrow x=\frac{\pi}{4}\) and min \(-\sqrt{2}\) at \(x+\frac{\pi}{4}=\frac{3\pi}{2} \Rightarrow x=\frac{5\pi}{4}\).

REASONING: For trigonometric functions, critical points come from solving \(\tan x = 1\). The sign of \(f'(x) = \cos x - \sin x\) is determined by testing convenient angles in each interval. The First Derivative Test works perfectly here because \(f\) is differentiable everywhere. The identity \(\sin x + \cos x = \sqrt{2}\sin(x+\frac{\pi}{4})\) provides an independent check.

ANSWER: Local maximum at \(x = \frac{\pi}{4}\) with value \(\sqrt{2}\); local minimum at \(x = \frac{5\pi}{4}\) with value \(-\sqrt{2}\).

## WORKED_EXAMPLE_3
PROBLEM: Find the local extrema of \(f(x) = |x^2 - 4x + 3|\) using the First Derivative Test.

STEPS:
- Step 1: Analyse the expression inside absolute value: \(g(x) = x^2 - 4x + 3 = (x-1)(x-3)\). Roots at \(x=1, 3\).
- Step 2: Define \(f(x)\) piecewise:
  - For \(x \leq 1\) or \(x \geq 3\): \(g(x) \geq 0 \Rightarrow f(x) = x^2 - 4x + 3\).
  - For \(1 < x < 3\): \(g(x) < 0 \Rightarrow f(x) = -(x^2 - 4x + 3) = -x^2 + 4x - 3\).
- Step 3: Compute derivatives on each piece:
  - For \(x < 1\) or \(x > 3\): \(f'(x) = 2x - 4\).
  - For \(1 < x < 3\): \(f'(x) = -2x + 4\).
  - At \(x=1\) and \(x=3\), \(f\) is not differentiable (sharp corners) ⇒ these are critical points.
- Step 4: Find where \(f'(x)=0\) on each piece:
  - \(2x-4=0 \Rightarrow x=2\), but \(x=2\) is in \((1,3)\) where the formula is \(f'(x)=-2x+4\). So check \(-2x+4=0 \Rightarrow x=2\). Thus \(x=2\) is a critical point (derivative zero).
- Step 5: All critical points: \(x=1, 2, 3\).
- Step 6: Sign chart for \(f'(x)\):
  - \(x < 1\): use \(f'(x)=2x-4\). Test \(x=0\): \(f'(0)=-4 < 0\).
  - \(1 < x < 2\): use \(f'(x)=-2x+4\). Test \(x=1.5\): \(f'(1.5)=1 > 0\).
  - \(2 < x < 3\): use \(f'(x)=-2x+4\). Test \(x=2.5\): \(f'(2.5)=-1 < 0\).
  - \(x > 3\): use \(f'(x)=2x-4\). Test \(x=4\): \(f'(4)=4 > 0\).
- Step 7: Apply First Derivative Test at each critical point:
  - \(x=1\): \(f'(x)\) changes \(-\) to \(+\) ⇒ local minimum. \(f(1)=|1-4+3|=0\).
  - \(x=2\): \(f'(x)\) changes \(+\) to \(-\) ⇒ local maximum. \(f(2)=|4-8+3|=1\).
  - \(x=3\): \(f'(x)\) changes \(-\) to \(+\) ⇒ local minimum. \(f(3)=|9-12+3|=0\).
- Step 8: Verify graphically: \(f(x)\) is a parabola \(x^2-4x+3\) reflected upward between its roots, creating a W-shape with minima at the roots (value 0) and a maximum at the vertex of the reflected part (value 1).

REASONING: Absolute value functions require piecewise definition. Non-differentiable points at the roots of the inside expression are critical points that must be tested. The derivative is computed separately on each piece, and a unified sign chart is built by testing points in each interval. The First Derivative Test correctly identifies the W-shape extrema.

ANSWER: Local minima at \(x=1\) and \(x=3\) with value 0; local maximum at \(x=2\) with value 1.

## COMPETENCY_QUESTION_1
QUESTION: A student is asked to find the local extrema of \(f(x) = x^3 - 3x^2 + 4\). They compute \(f'(x) = 3x^2 - 6x\), set it to zero, get \(x=0, 2\), and write: "\(f''(x) = 6x - 6\). \(f''(0) = -6 < 0\) so \(x=0\) is local max. \(f''(2) = 6 > 0\) so \(x=2\) is local min." The teacher says: "Correct conclusion, but you used the wrong test for this chapter." Explain why the teacher said this, and redo the solution using the First Derivative Test.

COMPETENCY: Comparing and justifying mathematical methods

STEPS:
- Step 1: Identify that the student used the Second Derivative Test, but the question (in context of this node) requires the First Derivative Test.
- Step 2: Recompute \(f'(x) = 3x(x-2)\). Critical points: \(x=0, 2\).
- Step 3: Construct sign chart for \(f'(x)\): test \(x=-1 \Rightarrow f'(-1)=9>0\); \(x=1 \Rightarrow f'(1)=-3<0\); \(x=3 \Rightarrow f'(3)=9>0\).
- Step 4: Sign pattern: \(x<0\): \(+\); \(0<x<2\): \(-\); \(x>2\): \(+\).
- Step 5: Apply First Derivative Test: at \(x=0\), sign changes \(+\) to \(-\) ⇒ local max; at \(x=2\), sign changes \(-\) to \(+\) ⇒ local min.
- Step 6: Compute values: \(f(0)=4\), \(f(2)=8-12+4=0\).

ANSWER: The teacher said "wrong test" because this node covers the First Derivative Test (sign change of \(f'\)), not the Second Derivative Test (sign of \(f''\)). Using the First Derivative Test: \(f'(x)=3x(x-2)\). Sign chart: \((-∞,0)\): \(+\); \((0,2)\): \(-\); \((2,∞)\): \(+\). At \(x=0\), \(f'\) changes \(+\) to \(-\) ⇒ local maximum, \(f(0)=4\). At \(x=2\), \(f'\) changes \(-\) to \(+\) ⇒ local minimum, \(f(2)=0\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A rectangular sheet of tin 30 cm by 18 cm is to be made into an open-top box by cutting equal squares from each corner and folding up the flaps. Let \(x\) cm be the side of the square cut off. The volume is \(V(x) = x(30-2x)(18-2x)\). 
(a) Find the domain of \(V(x)\) in this context.
(b) Find the critical point(s) of \(V(x)\) in the domain.
(c) Use the First Derivative Test to determine which critical point gives the maximum volume.
(d) What is the maximum volume?

COMPETENCY: Translating real-world situations to mathematical expressions and applying the First Derivative Test to optimisation

STEPS:
- Step 1: Domain: \(x > 0\), \(30-2x > 0 \Rightarrow x < 15\), \(18-2x > 0 \Rightarrow x < 9\). So domain is \(0 < x < 9\).
- Step 2: Expand \(V(x) = x(540 - 60x - 36x + 4x^2) = 4x^3 - 96x^2 + 540x\).
- Step 3: \(V'(x) = 12x^2 - 192x + 540 = 12(x^2 - 16x + 45) = 12(x-5)(x-9)\).
- Step 4: Critical points in domain: \(V'(x)=0 \Rightarrow x=5, 9\). But \(x=9\) is not in domain \((0,9)\) (endpoint). So only \(x=5\).
- Step 5: Sign chart for \(V'(x) = 12(x-5)(x-9)\) on \((0,9)\):
  - \(0 < x < 5\): \((x-5)<0\), \((x-9)<0\) ⇒ product positive ⇒ \(V'(x) > 0\).
  - \(5 < x < 9\): \((x-5)>0\), \((x-9)<0\) ⇒ product negative ⇒ \(V'(x) < 0\).
- Step 6: At \(x=5\), \(V'(x)\) changes \(+\) to \(-\) ⇒ local maximum. Since it's the only critical point in the open interval and \(V(x) \to 0\) as \(x \to 0^+\) and \(x \to 9^-\), this is the absolute maximum on \((0,9)\).
- Step 7: Maximum volume: \(V(5) = 5(30-10)(18-10) = 5 \times 20 \times 8 = 800\) cm³.

ANSWER: (a) \(0 < x < 9\); (b) \(x=5\) cm; (c) \(V'(x)\) changes from positive to negative at \(x=5\), so it gives maximum volume; (d) Maximum volume = 800 cm³.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a ______ poster with a fixed printed area of 1200 cm² and margins of 10 cm top/bottom and 5 cm left/right.

## DIAGNOSTIC_ANSWER_7
rectangular

Rectangular is the poster's silhouette: the margins wrap a rectangle, and the paper's total area inherits that shape. **A wrong answer (a circular word) reveals the student has rolled the poster and broken the width-dependent area function.**
