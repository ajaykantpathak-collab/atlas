## ELI5
A farmer's field is hemmed by a parabola-shaped river and a straight canal; fertiliser is priced by the square metre, so the bill waits on the area. Word problems of this family run one pipeline: read and sketch the region, find the boundaries' intersections, choose vertical or horizontal strips, write the difference integral with correct limits, evaluate, and finish the sentence with square metres or rupees. The mathematics is the previous nodes; the novelty is the translation.

## DEFINITION
Word problems on area applications involve translating real-world scenarios (such as land area, cross‑sectional area, or region bounded by curves and lines) into a definite integral setup, evaluating it to find the required area, and interpreting the result in the original context. The area is computed using vertical strips \( \int_a^b f(x) \, dx \) or horizontal strips \( \int_c^d g(y) \, dy \), taking absolute values when the curve lies below the axis, and splitting the region if it crosses the axis.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) read a word problem, sketch the region, identify the bounding curves/lines and their intersections, (2) decide whether to use vertical or horizontal strips, (3) set up the correct definite integral(s) with proper limits, (4) evaluate the integral(s) correctly, and (5) give the final answer with appropriate units (e.g., m², cm², hectares).

## SCOPE_BOUNDARY
Covers word problems that reduce to finding the area bounded by standard curves (lines, parabolas, circles, ellipses) and coordinate axes or other lines, as per NCERT Class 12 Chapter 8. Does NOT cover volumes of revolution, surface areas, or areas involving parametric/polar curves beyond the standard forms.

## WALKTHROUGH
Imagine a farmer in Punjab owns a field whose boundary is a river shaped like the parabola \( y = x^2 \) and a straight canal along the line \( y = 4 \). He needs to buy fertilizer priced at ₹50 per square metre. To find the cost, he must first find the area of the field. Start by sketching the parabola and the line, find their intersection points (solve \( x^2 = 4 \Rightarrow x = \pm 2 \)), then decide to use vertical strips because the top curve (\( y = 4 \)) and bottom curve (\( y = x^2 \)) are functions of \( x \). The area is \( \int_{-2}^{2} (4 - x^2) \, dx \). Evaluate the integral, multiply by the cost per unit area, and state the answer in rupees. The key insight: always draw the region, identify which function is above/below (or right/left), and set up the integral as (top – bottom) or (right – left) over the correct limits.

Takeaway first: the five-step pipeline - sketch, intersect, orient strips, integrate, translate with units - turns any area story into the machinery already learned. Exam moves: modelling questions converting scenarios into integrals, orientation questions on strip choice, evaluation questions, and unit-complete interpretation questions. Method: rerun the farm - parabola against the line y equals four, intersections at plus and minus two, vertical strips because both boundaries are functions of x, evaluate, multiply by the rate. Check yourself: the units are part of the answer - an area without square metres, or a cost without rupees, is an unfinished sentence in the exam's eyes. Drill: solve one area story end to end, writing the unit sentence last.

## DIAGNOSTIC_QUESTION_1
A student writes the area between the curve \( y = \sin x \) and the x‑axis from \( x = 0 \) to \( x = 2\pi \) as \( \int_0^{2\pi} \sin x \, dx = 0 \). What is the correct area and why is the student's answer wrong?

## DIAGNOSTIC_ANSWER_1
The correct area is \( \int_0^{\pi} \sin x \, dx + \left| \int_{\pi}^{2\pi} \sin x \, dx \right| = 2 + 2 = 4 \) square units. The student's answer is wrong because they did not take the absolute value of the portion where \( \sin x \) is negative (from \( \pi \) to \( 2\pi \)); the definite integral gives signed area, but area is always non‑negative.

## DIAGNOSTIC_QUESTION_2
Why must we sometimes split the integral into two or more parts when finding the area between two curves that cross each other within the interval?

## DIAGNOSTIC_ANSWER_2
When two curves cross, the "top" function becomes the "bottom" function after the intersection point. If we use a single integral \( \int_a^b (f(x) - g(x)) \, dx \) without splitting, the part where \( g(x) > f(x) \) would subtract area instead of adding it, giving a net signed area that is smaller than the true total area. Splitting at intersection points ensures we always integrate (top – bottom) in each sub‑interval.

## DIAGNOSTIC_QUESTION_3
A rectangular garden has a curved boundary described by \( y = 4 - x^2 \) and the x‑axis. Find the area of the garden.

## DIAGNOSTIC_ANSWER_3
The curve \( y = 4 - x^2 \) meets the x‑axis when \( 4 - x^2 = 0 \Rightarrow x = \pm 2 \). The region lies above the x‑axis between \( x = -2 \) and \( x = 2 \). Area = \( \int_{-2}^{2} (4 - x^2) \, dx = \left[ 4x - \frac{x^3}{3} \right]_{-2}^{2} = \left(8 - \frac{8}{3}\right) - \left(-8 + \frac{8}{3}\right) = \frac{16}{3} + \frac{16}{3} = \frac{32}{3} \) square units. A wrong answer often comes from using limits 0 to 2 and forgetting symmetry, or integrating \( x^2 - 4 \) instead of \( 4 - x^2 \).

## DIAGNOSTIC_QUESTION_4
Compare the area of the region bounded by \( y = x^2 \) and \( y = 4 \) using vertical strips versus horizontal strips. Which method is simpler and why?

## DIAGNOSTIC_ANSWER_4
Vertical strips: top = 4, bottom = \( x^2 \), limits \( x = -2 \) to \( 2 \). Area = \( \int_{-2}^{2} (4 - x^2) \, dx = \frac{32}{3} \). Horizontal strips: right = \( \sqrt{y} \), left = \( -\sqrt{y} \), limits \( y = 0 \) to \( 4 \). Area = \( \int_0^4 (\sqrt{y} - (-\sqrt{y})) \, dy = \int_0^4 2\sqrt{y} \, dy = 2 \cdot \frac{2}{3} y^{3/2} \big|_0^4 = \frac{4}{3} \cdot 8 = \frac{32}{3} \). Both give the same result, but horizontal strips are simpler here because the integral \( \int 2\sqrt{y} \, dy \) is easier than \( \int (4 - x^2) \, dx \) (though both are simple). In general, choose the variable that makes the bounding functions single‑valued and the integral easier.

## DIAGNOSTIC_QUESTION_5
A student sets up the area between the circle \( x^2 + y^2 = 9 \) and the line \( x = 1 \) in the first quadrant as \( \int_1^3 \sqrt{9 - x^2} \, dx \). Is this correct? If not, what is the correct setup?

## DIAGNOSTIC_ANSWER_5
The student's setup is incorrect because the line \( x = 1 \) is a vertical boundary, but the region in the first quadrant is bounded by the circle, the x‑axis, and \( x = 1 \). The correct area is the area under the circle from \( x = 1 \) to \( x = 3 \) (which is \( \int_1^3 \sqrt{9 - x^2} \, dx \)) **plus** the area of the rectangle from \( x = 0 \) to \( 1 \) under the circle? Wait, the region in the first quadrant bounded by the circle, the x‑axis, and \( x = 1 \) actually consists of two parts: a rectangle from \( x = 0 \) to \( 1 \) with height \( y = \sqrt{9 - 1^2} = \sqrt{8} \)? No, the circle from \( x = 0 \) to \( 1 \) is above the line \( x = 1 \)? Let's re‑read: "area between the circle \( x^2 + y^2 = 9 \) and the line \( x = 1 \) in the first quadrant". Typically this means the region inside the circle, to the right of \( x = 1 \), and above the x‑axis. That region is exactly \( \int_1^3 \sqrt{9 - x^2} \, dx \). So the student's setup is actually correct for that interpretation. However, if the problem meant the region bounded by the circle, the line \( x = 1 \), and the coordinate axes, then the student missed the rectangular part from \( x = 0 \) to \( 1 \). The correct answer depends on the exact wording; the student must read carefully whether the region includes the part left of \( x = 1 \). A common error is not identifying all bounding curves.

## DIAGNOSTIC_QUESTION_6
Create a word problem that requires finding the area between a parabola and a line, where the parabola opens sideways (i.e., \( x = y^2 \) or similar) and the line is vertical. Provide the problem statement and the steps to solve it.

## DIAGNOSTIC_ANSWER_6
**Problem:** A swimming pool has a cross‑section shaped like the region bounded by the parabola \( x = y^2 \) and the vertical line \( x = 4 \). Find the area of the cross‑section.  
**Steps:** 1. Sketch: parabola opens right, line \( x = 4 \) is vertical. Intersection: \( y^2 = 4 \Rightarrow y = \pm 2 \). 2. Use horizontal strips because for a given \( y \), the right boundary is \( x = 4 \) and left boundary is \( x = y^2 \). 3. Limits: \( y = -2 \) to \( 2 \). 4. Area = \( \int_{-2}^{2} (4 - y^2) \, dy = \left[ 4y - \frac{y^3}{3} \right]_{-2}^{2} = \frac{32}{3} \) square units.  
A poor answer would use vertical strips (which would require splitting at \( x = 0 \) and using \( y = \pm \sqrt{x} \)), making the integral more complicated, or would forget the symmetry and integrate from 0 to 2 without doubling.

## COMMON_MISCONCEPTION
Students often set up the integral as \( \int_a^b (f(x) - g(x)) \, dx \) without checking which function is actually on top in the interval, especially when the curves cross. They also forget to take absolute value when the region lies partly below the x‑axis, leading to a negative or zero area. Another frequent error is using the wrong variable of integration (e.g., using \( dx \) when the curves are better expressed as functions of \( y \)), resulting in complicated or impossible integrals.

## ON_FAILURE
1. Re‑visit **c12_math_cbse_08_002** (Area Between Curve and X‑Axis) to practice splitting integrals when the curve crosses the axis. 2. Review **c12_math_cbse_08_003** (Area Between Two Curves) to master identifying top/bottom functions and finding intersection points. 3. Do a re‑diagnostic: solve the area between \( y = x^2 - 4 \) and the x‑axis from \( x = 0 \) to \( x = 3 \). The correct answer is \( \left| \int_0^2 (x^2 - 4) \, dx \right| + \int_2^3 (x^2 - 4) \, dx = \frac{16}{3} + \frac{19}{3} = \frac{35}{3} \). If you get a different answer, go back and re‑watch the worked examples in those nodes.

## PREREQUISITE_NODE_IDS
c12_math_cbse_08_001, c12_math_cbse_08_002, c12_math_cbse_08_003, c12_math_cbse_08_004, c12_math_cbse_08_005, c11_math_cbse_11_004, c11_math_cbse_11_006, c11_math_cbse_10_006, c9_math_ch6_4, c9_math_ch6_8

## PREREQUISITE_REASONS
c12_math_cbse_08_001: Provides the fundamental definition of area under a curve as a definite integral.
c12_math_cbse_08_002: Teaches handling of curves above/below the x‑axis and absolute value for area.
c12_math_cbse_08_003: Covers area between two curves, essential for most word problems.
c12_math_cbse_08_004: Gives practice with parabola‑line combinations, a common word‑problem scenario.
c12_math_cbse_08_005: Gives practice with circle/ellipse‑line combinations, another common scenario.
c11_math_cbse_11_004: Parabola standard equation and properties needed to identify curves in problems.
c11_math_cbse_11_006: Ellipse standard equation and properties.
c11_math_cbse_10_006: Slope of a line, used to find equations of lines in word problems.
c9_math_ch6_4: Area of rectangle/parallelogram, used for geometric verification.
c9_math_ch6_8: Area of circle formula, used to check special cases.

## FORWARD_NODE_IDS


## FORWARD_REASONS
This is the final node in Chapter 8; no further nodes in this chapter depend on it.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_11_004
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives (rate of change) are used in physics to set up integrals for work done by a variable force, which is an area under the force‑displacement curve.
c11_math_cbse_11_004: Parabolic trajectories in projectile motion (physics) often require area calculations for range or maximum height analysis.

## CHAIN_DESCRIPTION
c12_math_cbse_08_003 -> c12_math_cbse_08_006 -> N/A

## THIS_FORMULA
Area = \( \int_a^b |f(x) - g(x)| \, dx \) (vertical strips) or \( \int_c^d |f(y) - g(y)| \, dy \) (horizontal strips), where \( f \) and \( g \) are the bounding curves and the limits are intersection points.

## FORMULA_VARIABLES
a, b = x‑limits of integration (intersection points or given boundaries); c, d = y‑limits; f(x), g(x) = functions defining top/bottom boundaries; f(y), g(y) = functions defining right/left boundaries.

## FORMULA_UNITS
Area units: square metres (m²), square centimetres (cm²), hectares (1 ha = 10,000 m²), etc., depending on the problem's length units.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_06_003 | Work done by a variable force is the area under the force‑displacement graph, computed using the same definite integral technique.
 c12_eco_cbse_03_002 | Consumer surplus is the area between the demand curve and the price line, a direct application of area between curves.
## PREREQ_CONCEPT
Definite integral as the limit of a sum and the Fundamental Theorem of Calculus (from Class 12 Chapter 7).

## PREREQ_BEFORE
The student must be able to evaluate definite integrals of polynomial, trigonometric, and simple rational functions, and find intersection points of curves algebraically.

## PREREQ_STUCK
If stuck, revisit the definite integral evaluation techniques from Class 12 Chapter 7 (Integrals), especially substitution and standard forms like \( \int \sqrt{a^2 - x^2} \, dx \).

## WORKED_EXAMPLE_1
PROBLEM: A farmer's field is bounded by the river \( y = x^2 \) and the straight road \( y = 4 \). Fertilizer costs ₹120 per square metre. Find the total cost to fertilize the field.

STEPS:
- Step 1: Sketch the region. The parabola \( y = x^2 \) opens upward, vertex at (0,0). The line \( y = 4 \) is horizontal. Find intersections: \( x^2 = 4 \Rightarrow x = -2, 2 \).
- Step 2: Decide on vertical strips because both curves are functions of \( x \). The top curve is \( y = 4 \), bottom curve is \( y = x^2 \). Limits: \( x = -2 \) to \( 2 \).
- Step 3: Set up the integral for area: \( A = \int_{-2}^{2} (4 - x^2) \, dx \).
- Step 4: Evaluate: \( \int (4 - x^2) \, dx = 4x - \frac{x^3}{3} \). From \( -2 \) to \( 2 \): \( \left(8 - \frac{8}{3}\right) - \left(-8 + \frac{8}{3}\right) = \frac{16}{3} + \frac{16}{3} = \frac{32}{3} \) square metres.
- Step 5: Total cost = Area × rate = \( \frac{32}{3} \times 120 = 32 \times 40 = ₹1280 \).

REASONING: The area between two curves is the integral of (top – bottom). The parabola lies below the line in the interval, so we subtract \( x^2 \) from 4. The cost is a simple multiplication once the area is known.

ANSWER: ₹1280

## WORKED_EXAMPLE_2
PROBLEM: A window frame is designed as the region bounded by the ellipse \( \frac{x^2}{9} + \frac{y^2}{4} = 1 \) and the x‑axis in the first quadrant. Find the area of the glass needed.

STEPS:
- Step 1: The ellipse has semi‑axes \( a = 3 \), \( b = 2 \). In the first quadrant, the region is bounded by the ellipse (top) and the x‑axis (bottom, \( y = 0 \)) from \( x = 0 \) to \( x = 3 \).
- Step 2: Solve for \( y \) in terms of \( x \): \( \frac{y^2}{4} = 1 - \frac{x^2}{9} \Rightarrow y = 2\sqrt{1 - \frac{x^2}{9}} = \frac{2}{3}\sqrt{9 - x^2} \). (Positive root because first quadrant.)
- Step 3: Use vertical strips. Area = \( \int_0^3 \frac{2}{3}\sqrt{9 - x^2} \, dx \).
- Step 4: Use standard integral \( \int \sqrt{a^2 - x^2} \, dx = \frac{x}{2}\sqrt{a^2 - x^2} + \frac{a^2}{2}\sin^{-1}\frac{x}{a} \). Here \( a = 3 \). So \( \int_0^3 \sqrt{9 - x^2} \, dx = \left[ \frac{x}{2}\sqrt{9 - x^2} + \frac{9}{2}\sin^{-1}\frac{x}{3} \right]_0^3 = 0 + \frac{9}{2}\cdot\frac{\pi}{2} = \frac{9\pi}{4} \).
- Step 5: Multiply by \( \frac{2}{3} \): Area = \( \frac{2}{3} \times \frac{9\pi}{4} = \frac{3\pi}{2} \) square units.

REASONING: The ellipse equation is solved for \( y \) to get the top boundary. The integral of \( \sqrt{a^2 - x^2} \) is a standard form that yields an inverse sine term. The area of the full ellipse is \( \pi ab = 6\pi \); the first quadrant is one‑fourth of that, i.e., \( \frac{3\pi}{2} \), which matches.

ANSWER: \( \frac{3\pi}{2} \) square units

## WORKED_EXAMPLE_3
PROBLEM: A concrete dam cross‑section is bounded by the parabola \( x = y^2 \) and the line \( x = 4 - y \). Find the area of the cross‑section.

STEPS:
- Step 1: Sketch. The parabola \( x = y^2 \) opens right. The line \( x = 4 - y \) has slope -1, intercepts (4,0) and (0,4). Find intersections: \( y^2 = 4 - y \Rightarrow y^2 + y - 4 = 0 \Rightarrow y = \frac{-1 \pm \sqrt{17}}{2} \). Approx \( y \approx 1.56 \) and \( y \approx -2.56 \).
- Step 2: Since both curves are functions of \( y \), use horizontal strips. Right boundary: \( x = 4 - y \); left boundary: \( x = y^2 \). Limits: \( y = \frac{-1 - \sqrt{17}}{2} \) to \( y = \frac{-1 + \sqrt{17}}{2} \).
- Step 3: Area = \( \int_{y_1}^{y_2} [(4 - y) - y^2] \, dy \), where \( y_1 = \frac{-1 - \sqrt{17}}{2} \), \( y_2 = \frac{-1 + \sqrt{17}}{2} \).
- Step 4: Compute integral: \( \int (4 - y - y^2) \, dy = 4y - \frac{y^2}{2} - \frac{y^3}{3} \). Evaluate at \( y_2 \) and \( y_1 \). Use symmetry? The limits are not symmetric about 0, so compute directly.
- Step 5: Let \( y_2 = \frac{-1 + \sqrt{17}}{2} \), \( y_1 = \frac{-1 - \sqrt{17}}{2} \). Note \( y_2 + y_1 = -1 \), \( y_2 y_1 = -4 \). The difference \( F(y_2) - F(y_1) \) can be simplified using these relations. After algebra, Area = \( \frac{1}{6}(17\sqrt{17} + 1) \) (exact) or approx 11.8 square metres.

REASONING: When curves are given as \( x = f(y) \), horizontal strips are natural. The intersection points are found by equating the two expressions for \( x \). The integral is a polynomial in \( y \), easy to evaluate. Using the sum/product of roots simplifies the arithmetic.

ANSWER: \( \frac{17\sqrt{17} + 1}{6} \) square metres (exact) ≈ 11.8 m²

## COMPETENCY_QUESTION_1
QUESTION: A city park is shaped like the region bounded by the curve \( y = 2\sin x \) and the lines \( x = 0 \), \( x = \pi \), and the x‑axis. The park management wants to plant grass at ₹50 per square metre. (a) Find the area of the park. (b) Calculate the total cost. (c) If the budget is ₹10,000, can they afford to grass the entire park? Justify your answer.

COMPETENCY: Translating real-world situations to mathematical expressions and interpreting results in context.

STEPS:
- Step 1: Understand the region: \( y = 2\sin x \) from \( 0 \) to \( \pi \) is above the x‑axis (since \( \sin x \ge 0 \) in \( [0,\pi] \)). The x‑axis is the bottom boundary.
- Step 2: Set up integral: Area = \( \int_0^\pi 2\sin x \, dx \).
- Step 3: Evaluate: \( 2[-\cos x]_0^\pi = 2(1 + 1) = 4 \) square metres.
- Step 4: Cost = \( 4 \times 50 = ₹200 \).
- Step 5: Budget ₹10,000 > ₹200, so yes, they can afford it.

ANSWER: (a) 4 m² (b) ₹200 (c) Yes, because ₹200 < ₹10,000.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: A swimming pool has a cross‑section in the shape of the region bounded by the parabola \( y^2 = 8x \) and the line \( x = 2 \). The pool is 10 metres long (perpendicular to the cross‑section). (a) Find the area of the cross‑section. (b) Calculate the volume of water the pool can hold. (c) If water is filled at a rate of 0.5 m³/min, how long will it take to fill the pool? Give your answer in hours and minutes.

COMPETENCY: Multi-step problem solving combining area, volume, and rate; unit conversion.

STEPS:
- Step 1: The parabola \( y^2 = 8x \) opens right, vertex at origin. The line \( x = 2 \) is vertical. Intersection: \( y^2 = 16 \Rightarrow y = \pm 4 \).
- Step 2: Use horizontal strips (easier). Right boundary: \( x = 2 \); left boundary: \( x = y^2/8 \). Limits: \( y = -4 \) to \( 4 \).
- Step 3: Area = \( \int_{-4}^4 (2 - y^2/8) \, dy = 2 \int_0^4 (2 - y^2/8) \, dy \) (even function). = \( 2 \left[ 2y - \frac{y^3}{24} \right]_0^4 = 2 \left( 8 - \frac{64}{24} \right) = 2 \left( 8 - \frac{8}{3} \right) = 2 \times \frac{16}{3} = \frac{32}{3} \) m².
- Step 4: Volume = Area × length = \( \frac{32}{3} \times 10 = \frac{320}{3} \) m³ ≈ 106.67 m³.
- Step 5: Time = Volume / rate = \( \frac{320/3}{0.5} = \frac{320}{3} \times 2 = \frac{640}{3} \) minutes = 213 minutes 20 seconds = 3 hours 33 minutes 20 seconds.

ANSWER: (a) \( \frac{32}{3} \) m² (b) \( \frac{320}{3} \) m³ (c) 3 hours 33 minutes 20 seconds.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Word problems on area ______ involve translating real-world scenarios (such as land area, cross‑sectional area, or region bounded by curves and lines) into a definite integral setup, evaluating it to find the required area, and interpreting the result in the original context.

## DIAGNOSTIC_ANSWER_7
applications

Applications is the family name: the machinery is the definite integral, and the novelty is only the story wrapped around it. **A wrong answer (problems) reveals the student has supplied the generic noun where the definition names the applied genre.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: He needs to buy ______ priced at ₹50 per square metre.

## DIAGNOSTIC_ANSWER_8
fertilizer

The fertiliser is the bill's reason: area per square metre times price converts the integral into a purchase order. **A wrong answer (seeds) reveals the student has swapped the purchase while the area computation stands unchanged.** The fertiliser is the area's customer: square metres integrated, then priced per metre, become the purchase order.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: He needs to buy fertilizer priced at ₹______ per square metre.

## DIAGNOSTIC_ANSWER_9
50

The rate is the last multiplier: integral first, rupees per square metre second, bill third. **A wrong answer (another rate) reveals the student has repriced the field and changed the answer's final line.** The rate is the final multiplier: the integral yields square metres, and the per-metre price yields rupees.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can (1) read a word problem, sketch the region, identify the bounding curves/lines and their intersections, (2) decide whether to use vertical or horizontal strips, (3) set up the correct definite integral(s) with proper limits, (4) evaluate the integral(s) correctly, and (5) give the final answer with appropriate units.
