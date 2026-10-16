## ELI5
An elliptical running track needs turf inside it: the ellipse's equation solved for y gives the upper arc, symmetry about both axes means the whole area is four times the first quadrant's piece, and the integral of the square root that remains is a standard form cracked by the substitution x equals a sin theta. Circles are the special case where the two semi-axes agree, giving pi a squared; the ellipse generalises to pi a b. Portions - quadrants, segments - simply adjust the limits and the symmetry factor.

## DEFINITION
The area bounded by a circle \(x^2 + y^2 = a^2\) or an ellipse \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) (in standard form, centered at the origin) is computed by integrating the function representing the upper half (or right half) of the curve and exploiting symmetry. For the full circle, area \(= 4 \int_0^a \sqrt{a^2 - x^2}\,dx = \pi a^2\); for the full ellipse, area \(= 4 \int_0^a \frac{b}{a}\sqrt{a^2 - x^2}\,dx = \pi ab\). When only a portion (e.g., a quadrant or a segment cut by a line) is required, the limits of integration change accordingly, and the symmetry factor is adjusted.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) sketch the circle/ellipse and identify the required region, (2) choose vertical or horizontal strips appropriately, (3) set up the definite integral with correct limits and symmetry factor, (4) evaluate the integral using trigonometric substitution \(x = a\sin\theta\) or \(y = b\sin\theta\), and (5) interpret the result in square units. They can also handle regions bounded by the curve and a coordinate axis or a line parallel to an axis.

## SCOPE_BOUNDARY
This node covers areas of circles and ellipses in standard form (center at origin) using definite integrals. It includes full areas, quadrant areas, and areas of segments cut by lines \(x = \text{constant}\) or \(y = \text{constant}\). It does NOT cover circles/ellipses not centered at the origin, rotated ellipses, or areas between a circle/ellipse and another curve (those are in other nodes). Geometric formulas (\(\pi r^2\), \(\pi ab\)) are derived here via integration, not merely quoted.

## WALKTHROUGH
Imagine you are designing an elliptical running track for your school sports day. The track’s inner boundary is an ellipse with semi-major axis 50 m and semi-minor axis 30 m. You need to find the area of the grass inside the track to order turf. How would you use calculus? Start by writing the ellipse equation \(\frac{x^2}{50^2} + \frac{y^2}{30^2} = 1\). Because the ellipse is symmetric about both axes, the total area is 4 times the area in the first quadrant. In the first quadrant, \(y = \frac{30}{50}\sqrt{50^2 - x^2}\). Set up the integral \(A = 4\int_0^{50} \frac{30}{50}\sqrt{50^2 - x^2}\,dx\). Use the substitution \(x = 50\sin\theta\) to evaluate. The key insight: symmetry reduces the problem to a standard integral \(\int \sqrt{a^2 - x^2}\,dx\), which you already know from the circle case.

Takeaway first: symmetry quarters the work, the upper-arc function feeds the integral, and the trig substitution digests the square root - the circle's answer generalising to the ellipse's pi a b. Exam moves: setup questions with correct limits and symmetry factors, evaluation questions via trigonometric substitution, portion questions on quadrants and segments, and unit questions on the answer. Method: rerun the track - write the ellipse, solve for upper y, quadruple the quadrant integral, substitute x equals fifty sin theta, evaluate. Check yourself: the four is symmetry's fee - omitting it answers a quadrant's worth of turf for a full track's order. Drill: compute one full ellipse and one quadrant's area, stating the symmetry factor used in each.

## DIAGNOSTIC_QUESTION_1
Write the definite integral (with limits) that gives the area of the circle \(x^2 + y^2 = 9\) using vertical strips and symmetry. Do not evaluate.

## DIAGNOSTIC_ANSWER_1
The correct integral is \(A = 4\int_0^3 \sqrt{9 - x^2}\,dx\). A wrong answer like \(\int_{-3}^3 \sqrt{9 - x^2}\,dx\) (missing factor 2) or \(2\int_0^3 \sqrt{9 - x^2}\,dx\) (only half the circle) reveals that the student does not fully grasp how symmetry factors work: the integral of the upper half from \(-a\) to \(a\) gives half the area, so multiplying by 2 gives the full area; using the first quadrant only requires multiplying by 4.

## DIAGNOSTIC_QUESTION_2
Explain why, when finding the area of the ellipse \(\frac{x^2}{a^2} + \frac{y^2}{b^2} = 1\) using vertical strips, we use \(y = \frac{b}{a}\sqrt{a^2 - x^2}\) instead of \(y = \sqrt{b^2 - \frac{b^2}{a^2}x^2}\). Are they equivalent?

## DIAGNOSTIC_ANSWER_2
Yes, they are algebraically equivalent: \(\frac{b}{a}\sqrt{a^2 - x^2} = \sqrt{\frac{b^2}{a^2}(a^2 - x^2)} = \sqrt{b^2 - \frac{b^2}{a^2}x^2}\). The form \(\frac{b}{a}\sqrt{a^2 - x^2}\) is preferred because it directly shows the scaling factor \(\frac{b}{a}\) applied to the circle’s upper half \(y = \sqrt{a^2 - x^2}\), making the integral \( \frac{b}{a} \int \sqrt{a^2 - x^2}\,dx \) and the final area \(\frac{b}{a} \cdot \pi a^2 = \pi ab\). A student who does not recognise the equivalence may make algebraic errors when substituting or simplifying.

## DIAGNOSTIC_QUESTION_3
Find the area of the region bounded by the ellipse \(\frac{x^2}{16} + \frac{y^2}{9} = 1\) and the lines \(x = 0\), \(y = 0\) (i.e., the first quadrant only). Show all steps.

## DIAGNOSTIC_ANSWER_3
**Solution:**  
Ellipse: \(a = 4\), \(b = 3\). In first quadrant, \(y = \frac{3}{4}\sqrt{16 - x^2}\), \(x \in [0, 4]\).  
Area \(A = \int_0^4 \frac{3}{4}\sqrt{16 - x^2}\,dx\).  
Let \(x = 4\sin\theta\), \(dx = 4\cos\theta\,d\theta\). When \(x=0\), \(\theta=0\); when \(x=4\), \(\theta=\frac{\pi}{2}\).  
\(A = \frac{3}{4}\int_0^{\pi/2} \sqrt{16 - 16\sin^2\theta} \cdot 4\cos\theta\,d\theta = \frac{3}{4}\int_0^{\pi/2} 4\cos\theta \cdot 4\cos\theta\,d\theta = 12\int_0^{\pi/2} \cos^2\theta\,d\theta\).  
\(\int_0^{\pi/2} \cos^2\theta\,d\theta = \frac{\pi}{4}\).  
\(A = 12 \cdot \frac{\pi}{4} = 3\pi\) square units.  
A wrong answer like \(12\pi\) (full ellipse area) indicates the student forgot to restrict to the first quadrant. An answer of \(\frac{3\pi}{2}\) suggests they used symmetry factor 2 instead of integrating only the first quadrant.

## DIAGNOSTIC_QUESTION_4
Compare the integrals for the area of the circle \(x^2 + y^2 = a^2\) using vertical strips and horizontal strips. Are they equal? Why must they be equal?

## DIAGNOSTIC_ANSWER_4
Vertical strips: \(A = 4\int_0^a \sqrt{a^2 - x^2}\,dx\).  
Horizontal strips: \(A = 4\int_0^a \sqrt{a^2 - y^2}\,dy\).  
They are equal because the circle is symmetric about the line \(y = x\); swapping \(x\) and \(y\) does not change the region. The integrals are identical in form, just with a dummy variable change. A student who thinks they are different may not understand that the choice of variable of integration does not affect the area, or may incorrectly set up the horizontal strip integral as \(\int_0^a x\,dy\) without solving for \(x\).

## DIAGNOSTIC_QUESTION_5
A student evaluates the area of the ellipse \(\frac{x^2}{25} + \frac{y^2}{4} = 1\) as follows:  
\(A = 4\int_0^5 \sqrt{4 - \frac{4}{25}x^2}\,dx = 4\int_0^5 2\sqrt{1 - \frac{x^2}{25}}\,dx = 8\int_0^5 \sqrt{1 - \frac{x^2}{25}}\,dx\).  
They then substitute \(x = 5\sin\theta\) and get \(A = 8\int_0^{\pi/2} \cos\theta \cdot 5\cos\theta\,d\theta = 40\int_0^{\pi/2} \cos^2\theta\,d\theta = 40 \cdot \frac{\pi}{4} = 10\pi\).  
Is this correct? If not, identify the error.

## DIAGNOSTIC_ANSWER_5
The student’s final answer \(10\pi\) is correct (\(\pi ab = \pi \cdot 5 \cdot 2 = 10\pi\)), but there is a subtle algebraic error in the first step: \(\sqrt{4 - \frac{4}{25}x^2} = \sqrt{4(1 - \frac{x^2}{25})} = 2\sqrt{1 - \frac{x^2}{25}}\), which is correct. However, the integral should be \(4\int_0^5 \frac{2}{5}\sqrt{25 - x^2}\,dx\) if using the standard substitution \(x = 5\sin\theta\) directly on \(\sqrt{25 - x^2}\). The student’s method works because they effectively used \(x = 5\sin\theta\) on \(\sqrt{1 - \frac{x^2}{25}}\), but they must adjust \(dx\): if \(x = 5\sin\theta\), then \(dx = 5\cos\theta\,d\theta\), and \(\sqrt{1 - \frac{x^2}{25}} = \cos\theta\). The integral becomes \(8\int_0^{\pi/2} \cos\theta \cdot 5\cos\theta\,d\theta = 40\int_0^{\pi/2} \cos^2\theta\,d\theta\), which is correct. A common error is to forget the factor 5 from \(dx\), leading to \(8\int_0^{\pi/2} \cos^2\theta\,d\theta = 2\pi\), which is wrong. The student here did it correctly, but many forget the \(dx\) substitution factor.

## DIAGNOSTIC_QUESTION_6
Create a problem where the area of a circle is found using horizontal strips, but the region is only the part of the circle \(x^2 + y^2 = 16\) that lies above the line \(y = 2\). Set up the integral (do not evaluate).

## DIAGNOSTIC_ANSWER_6
The circle radius is 4. The line \(y = 2\) cuts the circle at \(x = \pm\sqrt{16 - 4} = \pm\sqrt{12} = \pm 2\sqrt{3}\). The region above \(y = 2\) is symmetric about the y-axis. Using horizontal strips, for a given \(y\), \(x\) runs from \(-\sqrt{16 - y^2}\) to \(\sqrt{16 - y^2}\). The width is \(2\sqrt{16 - y^2}\). \(y\) runs from 2 to 4.  
Area \(A = \int_2^4 2\sqrt{16 - y^2}\,dy\).  
A good answer shows the correct limits (2 to 4), the correct width \(2\sqrt{16 - y^2}\), and recognises the symmetry. A poor answer might use limits 0 to 4 (full upper half) or forget the factor 2 for the width.

## COMMON_MISCONCEPTION
Students often forget the symmetry factor when using quadrant-only integration. For example, for the full circle \(x^2+y^2=a^2\), they write \(A = \int_0^a \sqrt{a^2-x^2}\,dx\) (missing the factor 4) and get \(\frac{\pi a^2}{4}\) instead of \(\pi a^2\). Another frequent error is in the trigonometric substitution: when substituting \(x = a\sin\theta\), they forget to change \(dx\) to \(a\cos\theta\,d\theta\), or they incorrectly change the limits (e.g., keeping 0 to \(a\) instead of 0 to \(\pi/2\)). A third error is using the wrong expression for \(y\): from \(\frac{x^2}{a^2}+\frac{y^2}{b^2}=1\), they might write \(y = \sqrt{b^2 - x^2}\) instead of \(y = \frac{b}{a}\sqrt{a^2 - x^2}\), leading to an integral that does not match the ellipse’s shape.

## ON_FAILURE
If a student makes the symmetry-factor error, have them sketch the circle and shade the first quadrant. Ask: “What fraction of the total area is this?” Then guide them to write the total area as 4 times the quadrant integral. For the substitution error, revert to the standard integral \(\int \sqrt{a^2 - x^2}\,dx\) from Class 12 Chapter 7 (integration by trigonometric substitution). Practice the substitution \(x = a\sin\theta\) step by step: write \(x = a\sin\theta\), then \(dx = a\cos\theta\,d\theta\), then change limits. For the wrong \(y\) expression, go back to Class 11 conic sections (c11_math_cbse_11_006) and re-derive \(y = \frac{b}{a}\sqrt{a^2 - x^2}\) from the ellipse equation. Use a re-diagnostic: “Set up the integral for the area of the ellipse \(\frac{x^2}{9}+\frac{y^2}{4}=1\) using vertical strips, showing the expression for \(y\) and the limits.”

## PREREQUISITE_NODE_IDS
c12_math_cbse_08_001, c12_math_cbse_08_002, c12_math_cbse_08_003, c12_math_cbse_08_004, c11_math_cbse_11_002, c11_math_cbse_11_006
## PREREQUISITE_REASONS
c12_math_cbse_08_001: provides the basic concept of area under a curve as a definite integral.
c12_math_cbse_08_002: teaches handling of curves above/below the x-axis and absolute area.
c12_math_cbse_08_003: extends to area between two curves, useful when a line cuts the circle/ellipse.
c12_math_cbse_08_004: specifically covers area bounded by parabola and line, reinforcing the method of finding intersection points and setting up integrals.
c11_math_cbse_11_002: gives the standard equation of a circle and its geometric properties (symmetry, radius).
c11_math_cbse_11_006: gives the standard equation of an ellipse, its semi-axes, and symmetry.

## FORWARD_NODE_IDS
c12_math_cbse_08_006
## FORWARD_REASONS
c12_math_cbse_08_006: word problems on area applications often involve circles and ellipses (e.g., area of a segment, area between a circle and a line); this node provides the core integration techniques needed to solve those problems.

## CROSS_SUBJECT_PREREQS
c9_math_ch6_8, c10_math_cbse_11_001
## CROSS_SUBJECT_REASONS
c9_math_ch6_8: Class 9 derives the area of a circle geometrically (using limits/π); this node re-derives it using calculus, showing the connection between geometric and analytic methods.
c10_math_cbse_11_001: Class 10 revisits area of circle and sector; this node extends that by using integration to find area of ellipse and circular segments, reinforcing the concept of area as an integral.

## CHAIN_DESCRIPTION
c12_math_cbse_08_001 -> c12_math_cbse_08_005 -> c12_math_cbse_08_006

## THIS_FORMULA
Circle \(x^2+y^2=a^2\): \(A = 4\int_0^a \sqrt{a^2-x^2}\,dx = \pi a^2\).  
Ellipse \(\frac{x^2}{a^2}+\frac{y^2}{b^2}=1\): \(A = 4\int_0^a \frac{b}{a}\sqrt{a^2-x^2}\,dx = \pi ab\).  
(For a quadrant: drop the factor 4; for a segment cut by \(x = h\): \(A = 2\int_h^a \sqrt{a^2-x^2}\,dx\) etc.)

## FORMULA_VARIABLES
\(a\) = radius of circle / semi-major axis of ellipse; \(b\) = semi-minor axis of ellipse; \(x, y\) = Cartesian coordinates; \(A\) = area in square units.

## FORMULA_UNITS
Area in square units (e.g., cm², m²). \(a, b\) in linear units (cm, m).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch6_8 | The geometric formula for area of a circle (πr²) is derived in Class 9 using limits/geometry; here we derive it using definite integrals, showing the connection between geometric and calculus approaches.
c10_math_cbse_11_001 | Class 10 revisits area of circle and sector; this node extends that by using integration to find area of ellipse and circular segments, reinforcing the concept of area as an integral.
## PREREQ_CONCEPT
Standard equations of circle and ellipse, symmetry about axes, and evaluation of \(\int \sqrt{a^2 - x^2}\,dx\) via trigonometric substitution.

## PREREQ_BEFORE
Student must be able to solve the circle/ellipse equation for \(y\) (or \(x\)), set up a definite integral for area using vertical/horizontal strips, and perform the substitution \(x = a\sin\theta\) (or \(y = b\sin\theta\)) with correct limit changes.

## PREREQ_STUCK
If stuck, revisit the standard equations of circle and ellipse (c11_math_cbse_11_002, c11_math_cbse_11_006) and the trigonometric substitution method for \(\int \sqrt{a^2 - x^2}\,dx\) from Class 12 Chapter 7 (Integrals).

## WORKED_EXAMPLE_1
PROBLEM: Find the area of the circle \(x^2 + y^2 = 16\) using integration with vertical strips.  
STEPS:  
- Step 1: Identify the curve: circle centered at origin with radius \(a = 4\). The circle is symmetric about both axes.  
- Step 2: The total area is 4 times the area in the first quadrant. In the first quadrant, \(y = \sqrt{16 - x^2}\) and \(x\) varies from 0 to 4.  
- Step 3: Set up the integral: \(A = 4 \int_0^4 \sqrt{16 - x^2}\,dx\).  
- Step 4: Use trigonometric substitution \(x = 4\sin\theta\), so \(dx = 4\cos\theta\,d\theta\). When \(x = 0\), \(\theta = 0\); when \(x = 4\), \(\theta = \frac{\pi}{2}\).  
  \(\sqrt{16 - x^2} = \sqrt{16 - 16\sin^2\theta} = 4\cos\theta\).  
  The integral becomes \(A = 4 \int_0^{\pi/2} 4\cos\theta \cdot 4\cos\theta\,d\theta = 64 \int_0^{\pi/2} \cos^2\theta\,d\theta\).  
- Step 5: Evaluate \(\int_0^{\pi/2} \cos^2\theta\,d\theta = \frac{1}{2}\int_0^{\pi/2} (1 + \cos 2\theta)\,d\theta = \frac{1}{2}\left[\theta + \frac{\sin 2\theta}{2}\right]_0^{\pi/2} = \frac{\pi}{4}\).  
  So \(A = 64 \cdot \frac{\pi}{4} = 16\pi\).  
- Step 6: Verify: \(\pi a^2 = \pi \cdot 4^2 = 16\pi\). The area is \(16\pi\) square units.  
REASONING: The symmetry of the circle allows us to compute the area of one quadrant and multiply by 4. The integral \(\int \sqrt{a^2 - x^2}\,dx\) is a standard form that evaluates to \(\frac{x}{2}\sqrt{a^2 - x^2} + \frac{a^2}{2}\sin^{-1}\frac{x}{a}\), but using the trigonometric substitution directly with changed limits is cleaner and avoids back-substitution. The factor 4 accounts for all four quadrants.  
ANSWER: \(16\pi\) square units.

## WORKED_EXAMPLE_2
PROBLEM: Find the area of the ellipse \(\frac{x^2}{9} + \frac{y^2}{4} = 1\) using horizontal strips.  
STEPS:  
- Step 1: The ellipse has semi-major axis \(a = 3\) (along x-axis) and semi-minor axis \(b = 2\) (along y-axis). It is symmetric about both axes.  
- Step 2: Using horizontal strips, we express \(x\) in terms of \(y\): \(\frac{x^2}{9} = 1 - \frac{y^2}{4} \Rightarrow x = \frac{3}{2}\sqrt{4 - y^2}\) (positive in first quadrant). The total area is 4 times the area in the first quadrant.  
- Step 3: In the first quadrant, \(x\) runs from 0 to \(\frac{3}{2}\sqrt{4 - y^2}\) as \(y\) goes from 0 to 2. Area of first quadrant = \(\int_0^2 \frac{3}{2}\sqrt{4 - y^2}\,dy\). Total area \(A = 4 \int_0^2 \frac{3}{2}\sqrt{4 - y^2}\,dy = 6 \int_0^2 \sqrt{4 - y^2}\,dy\).  
- Step 4: Substitute \(y = 2\sin\theta\), \(dy = 2\cos\theta\,d\theta\). Limits: \(y=0 \Rightarrow \theta=0\); \(y=2 \Rightarrow \theta=\frac{\pi}{2}\).  
  \(\sqrt{4 - y^2} = \sqrt{4 - 4\sin^2\theta} = 2\cos\theta\).  
  \(A = 6 \int_0^{\pi/2} 2\cos\theta \cdot 2\cos\theta\,d\theta = 24 \int_0^{\pi/2} \cos^2\theta\,d\theta\).  
- Step 5: \(\int_0^{\pi/2} \cos^2\theta\,d\theta = \frac{\pi}{4}\). So \(A = 24 \cdot \frac{\pi}{4} = 6\pi\).  
- Step 6: Check with formula \(\pi ab = \pi \cdot 3 \cdot 2 = 6\pi\). The area is \(6\pi\) square units.  
REASONING: Horizontal strips are symmetric to vertical strips; the integral \(\int \sqrt{b^2 - y^2}\,dy\) is identical in form to the circle case. The factor \(\frac{b}{a}\) from the ellipse equation scales the circle’s integral. The symmetry factor 4 is used because we integrated only the first quadrant.  
ANSWER: \(6\pi\) square units.

## WORKED_EXAMPLE_3
PROBLEM: Find the area of the smaller region bounded by the circle \(x^2 + y^2 = 25\) and the line \(x = 3\).  
STEPS:  
- Step 1: The circle has radius \(a = 5\). The line \(x = 3\) is vertical, 3 units right of the center. The smaller region is the part of the circle to the right of \(x = 3\) (a circular segment). By symmetry about the x-axis, its area is twice the area above the x-axis.  
- Step 2: For the upper half, \(y = \sqrt{25 - x^2}\). The region above the x-axis and to the right of \(x = 3\) has \(x\) from 3 to 5. Area of upper half of segment = \(\int_3^5 \sqrt{25 - x^2}\,dx\). Total segment area \(A = 2 \int_3^5 \sqrt{25 - x^2}\,dx\).  
- Step 3: Use substitution \(x = 5\sin\theta\), \(dx = 5\cos\theta\,d\theta\). When \(x = 3\), \(\sin\theta = \frac{3}{5} \Rightarrow \theta = \sin^{-1}\frac{3}{5}\). When \(x = 5\), \(\theta = \frac{\pi}{2}\).  
  \(\sqrt{25 - x^2} = 5\cos\theta\).  
  \(A = 2 \int_{\sin^{-1}(3/5)}^{\pi/2} 5\cos\theta \cdot 5\cos\theta\,d\theta = 50 \int_{\sin^{-1}(3/5)}^{\pi/2} \cos^2\theta\,d\theta\).  
- Step 4: \(\int \cos^2\theta\,d\theta = \frac{1}{2}(\theta + \sin\theta\cos\theta)\).  
  Evaluate:  
  At \(\theta = \frac{\pi}{2}\): \(\frac{1}{2}(\frac{\pi}{2} + 0) = \frac{\pi}{4}\).  
  At \(\theta = \sin^{-1}\frac{3}{5}\): \(\sin\theta = \frac{3}{5}\), \(\cos\theta = \frac{4}{5}\). So \(\frac{1}{2}(\sin^{-1}\frac{3}{5} + \frac{3}{5}\cdot\frac{4}{5}) = \frac{1}{2}\sin^{-1}\frac{3}{5} + \frac{6}{25}\).  
  Difference = \(\frac{\pi}{4} - \frac{1}{2}\sin^{-1}\frac{3}{5} - \frac{6}{25}\).  
- Step 5: \(A = 50\left(\frac{\pi}{4} - \frac{1}{2}\sin^{-1}\frac{3}{5} - \frac{6}{25}\right) = \frac{25\pi}{2} - 25\sin^{-1}\frac{3}{5} - 12\).  
- Step 6: Numerically, \(\sin^{-1}\frac{3}{5} \approx 0.6435\) rad, so \(A \approx 39.27 - 16.09 - 12 = 11.18\) square units. (Alternatively, one can express the answer in terms of \(\cos^{-1}\frac{3}{5}\) using \(\sin^{-1}\frac{3}{5} = \frac{\pi}{2} - \cos^{-1}\frac{3}{5}\) to get \(A = 25\cos^{-1}\frac{3}{5} - 12\).)  
REASONING: The line \(x = 3\) cuts the circle, creating a segment. Using vertical strips and symmetry about the x-axis simplifies the integral to twice the area above the x-axis. The trigonometric substitution handles the square root, and the limits change to inverse trigonometric values. The final answer can be left in exact form with inverse trigonometric functions.  
ANSWER: \(\frac{25\pi}{2} - 25\sin^{-1}\frac{3}{5} - 12\) square units (or \(25\cos^{-1}\frac{3}{5} - 12\) square units).

## COMPETENCY_QUESTION_1
QUESTION: A student attempts to find the area of the circle \(x^2 + y^2 = 9\) by evaluating the integral \(\int_{-3}^{3} \sqrt{9 - x^2}\,dx\). They obtain \(\frac{9\pi}{2}\) and claim that the area of the circle is \(\frac{9\pi}{2}\). Identify the error in the student’s reasoning and give the correct area.  
COMPETENCY: Error identification and correction  
STEPS:  
- Step 1: Recognize that \(\int_{-3}^{3} \sqrt{9 - x^2}\,dx\) computes the area under the upper semicircle (since \(y = \sqrt{9 - x^2} \ge 0\)) from \(x = -3\) to \(x = 3\). This is exactly half the circle.  
- Step 2: The value \(\frac{9\pi}{2}\) is the area of the upper half. The full circle area is twice that.  
- Step 3: Correct area = \(2 \times \frac{9\pi}{2} = 9\pi\). Alternatively, use symmetry: \(A = 4\int_0^3 \sqrt{9 - x^2}\,dx = 9\pi\).  
ANSWER: The student forgot that the integral from \(-3\) to \(3\) of the positive square root gives only the upper half of the circle. The correct area is \(9\pi\) square units.  
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: An elliptical flower bed has equation \(\frac{x^2}{100} + \frac{y^2}{36} = 1\) (dimensions in metres). A straight path of width 1 m is to be laid along the boundary inside the ellipse, so that the inner edge of the path is also an ellipse. Find the area of the path using integration. (Hint: The inner ellipse has semi-axes reduced by 1 m along the normal direction, but for a thin path you may approximate the inner ellipse as \(\frac{x^2}{99^2} + \frac{y^2}{35^2} = 1\)? Actually, the inner boundary of a uniform-width path inside an ellipse is not an ellipse with axes reduced by the width. However, for a small width relative to the axes, the area of the path can be approximated as the difference of the outer and inner ellipses with semi-axes reduced by the width. For exact calculation, one would need to use the offset curve. To keep the problem within scope, we change it to: Find the area of the region of the ellipse that lies in the first quadrant and to the right of the line \(x = 5\).)  
Revised problem: Find the area of the region bounded by the ellipse \(\frac{x^2}{100} + \frac{y^2}{36} = 1\) and the lines \(x = 5\), \(y = 0\) (i.e., the part of the ellipse in the first quadrant with \(x \ge 5\)).  
COMPETENCY: Translating real-world situations to mathematical expressions  
STEPS:  
- Step 1: The ellipse has \(a = 10\), \(b = 6\). The line \(x = 5\) cuts the ellipse at \(y = \pm \frac{6}{10}\sqrt{100 - 25} = \pm \frac{6}{10}\sqrt{75} = \pm 3\sqrt{3}\). In the first quadrant, the region is bounded by the ellipse from \(x = 5\) to \(x = 10\) and the x-axis (\(y = 0\)).  
- Step 2: Using vertical strips, for a given \(x\), \(y\) runs from 0 to \(\frac{6}{10}\sqrt{100 - x^2}\). The area is \(A = \int_5^{10} \frac{6}{10}\sqrt{100 - x^2}\,dx = \frac{3}{5} \int_5^{10} \sqrt{100 - x^2}\,dx\).  
- Step 3: Substitute \(x = 10\sin\theta\), \(dx = 10\cos\theta\,d\theta\). Limits: \(x=5 \Rightarrow \sin\theta = 0.5 \Rightarrow \theta = \frac{\pi}{6}\); \(x=10 \Rightarrow \theta = \frac{\pi}{2}\).  
  \(\sqrt{100 - x^2} = 10\cos\theta\).  
  \(A = \frac{3}{5} \int_{\pi/6}^{\pi/2} 10\cos\theta \cdot 10\cos\theta\,d\theta = 60 \int_{\pi/6}^{\pi/2} \cos^2\theta\,d\theta\).  
- Step 4: \(\int \cos^2\theta\,d\theta = \frac{1}{2}(\theta + \sin\theta\cos\theta)\).  
  At \(\theta = \frac{\pi}{2}\): \(\frac{\pi}{4}\).  
  At \(\theta = \frac{\pi}{6}\): \(\frac{1}{2}(\frac{\pi}{6} + \frac{1}{2}\cdot\frac{\sqrt{3}}{2}) = \frac{\pi}{12} + \frac{\sqrt{3}}{8}\).  
  Difference = \(\frac{\pi}{4} - \frac{\pi}{12} - \frac{\sqrt{3}}{8} = \frac{\pi}{6} - \frac{\sqrt{3}}{8}\).  
- Step 5: \(A = 60\left(\frac{\pi}{6} - \frac{\sqrt{3}}{8}\right) = 10\pi - \frac{15\sqrt{3}}{2}\) square metres.  
ANSWER: \(10\pi - \frac{15\sqrt{3}}{2}\) square metres (approximately \(18.5\) m²).  
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: When only a portion (e.g., a quadrant or a segment cut by a line) is required, the limits of ______ change accordingly, and the symmetry factor is adjusted.

## DIAGNOSTIC_ANSWER_7
integration

Integration is what the portion adjusts: new limits and a new symmetry factor attend every cut of the curve. **A wrong answer (differentiation) reveals the student has trimmed the wrong operation's limits.** Integration is the machinery the portion re-aims: new limits and a new symmetry multiplier are the entire adjustment.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are designing an ______ running track for your school sports day.

## DIAGNOSTIC_ANSWER_8
elliptical

The elliptical word is the track's geometry: two unequal semi-axes, one standard integral, and pi a b waiting at the end. **A wrong answer (a circular word) reveals the student has equalised the axes and erased the b that distinguishes the answer.**

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Because the ellipse is symmetric about both axes, the total area is ______ times the area in the first quadrant.

## DIAGNOSTIC_ANSWER_9
4

Four is symmetry's multiplier: the ellipse's mirror image across both axes makes the full area four quadrants deep. **A wrong answer (another factor) reveals the student has miscounted the reflections and ordered the wrong turf.** Four is the quadrant count: the ellipse mirrors across both axes, so the whole is four copies of the first-quadrant slice.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
They can also handle regions bounded by the curve and a coordinate axis or a line parallel to an axis.

Mastery extends beyond the full curve: coordinate axes and their parallels slicing the region are the standard variations the student must handle. **A wrong answer (full curves only) reveals the student has learned the template and skipped the tailoring the exam requests.**
