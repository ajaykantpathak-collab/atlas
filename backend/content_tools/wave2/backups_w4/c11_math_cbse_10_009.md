## ELI5
A library ramp starts at the doorway, 0.5 metres up and 2 metres along the wall, climbing at slope 1:12. One point and one slope fully determine a line: y - y1 = m(x - x1), the point-slope form. Here the fixed point is (2, 0.5) with m = 1/12, so y - 0.5 = (1/12)(x - 2) gives the ramp's height at every step. Convert onward to slope-intercept or general form as the question asks.

## DEFINITION
The point-slope form of a straight line states that if a line has slope \(m\) and passes through a fixed point \((x_1, y_1)\), then the equation of the line is \(y - y_1 = m(x - x_1)\), where \((x, y)\) are the coordinates of any variable point on the line.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can derive the point-slope form from the definition of slope, write the equation of a line given a point and slope (including when the slope is given via an angle of inclination), convert between point-slope form and other forms (slope-intercept, general form, intercept form), and solve word problems involving linear relationships in real-world Indian contexts (e.g., taxi fares, ramp construction, cost functions).

## SCOPE_BOUNDARY
This node covers the derivation, application, and algebraic manipulation of the point-slope form \(y - y_1 = m(x - x_1)\). It does NOT cover the two-point form, slope-intercept form, intercept form, or normal form (these are separate sibling nodes). It assumes the slope \(m\) is defined (i.e., the line is not vertical). Vertical lines (\(x = \text{constant}\)) are excluded from this form.

## WALKTHROUGH
Imagine you are designing a wheelchair ramp for your school library. The ramp must have a gentle slope of 1:12 (rise:run) and must start exactly at the doorway, which is 0.5 metres above the ground and 2 metres horizontally from the wall. How would you write the equation that describes the height of the ramp at any horizontal distance? This connects directly to the slope concept from node c11_math_cbse_10_006 and coordinate plotting from node c11_math_cbse_10_001. We know the slope \(m = \frac{1}{12}\) and a fixed point \((x_1, y_1) = (2, 0.5)\). For any point \((x, y)\) on the ramp, the slope between \((2, 0.5)\) and \((x, y)\) must equal \(\frac{1}{12}\). So \(\frac{y - 0.5}{x - 2} = \frac{1}{12}\). Cross-multiplying gives \(y - 0.5 = \frac{1}{12}(x - 2)\). This is the point-slope form. The key insight: whenever you have a slope and one point, this form gives the equation immediately.

Takeaway: mastery means deriving the form from the slope definition, writing equations from a point plus slope (even when the slope arrives as an angle of inclination), and converting to slope-intercept, intercept or general form. Exam moves: write-the-equation questions and taxi-fare or cost word problems built on linear growth. Check yourself: the minus signs are load-bearing - y - y1 = m(x - x1) subtracts the point's coordinates on both sides. Students miss it because they flip to plus signs, when the definition's slope ratio (y - y1)/(x - x1) is what cross-multiplies into the form: the subtraction is the slope test itself.

## DIAGNOSTIC_QUESTION_1
Write the point-slope form of the equation of a line with slope \(m\) passing through the point \((x_1, y_1)\).

## DIAGNOSTIC_ANSWER_1
The equation is \(y - y_1 = m(x - x_1)\). A wrong answer (e.g., \(y = mx + c\) or \(y - y_1 = m(x + x_1)\)) reveals that the student either confuses it with the slope-intercept form or misplaces the signs in the formula, indicating a lack of precise memorization of the standard form.

## DIAGNOSTIC_QUESTION_2
Explain why the point-slope form cannot be used for a vertical line. What is the equation of a vertical line passing through \((3, -2)\)?

## DIAGNOSTIC_ANSWER_2
The point-slope form requires a defined slope \(m\). A vertical line has undefined slope (division by zero in the slope formula), so the form does not apply. The equation of a vertical line through \((3, -2)\) is \(x = 3\). A wrong answer indicates the student does not understand the limitation of the formula when the slope is undefined.

## DIAGNOSTIC_QUESTION_3
Find the equation of the line passing through \((2, -3)\) with slope \(4\). Write the answer in slope-intercept form.

## DIAGNOSTIC_ANSWER_3
Using point-slope: \(y - (-3) = 4(x - 2) \Rightarrow y + 3 = 4x - 8 \Rightarrow y = 4x - 11\). A wrong answer (e.g., \(y = 4x - 5\)) reveals an algebraic error in distributing the slope or adding/subtracting the constant term.

**A wrong answer (y = 4x - 5) reveals the student multiplied 4 by 2 but then dropped the +3 instead of carrying it across - the +3 from y + 3 must be subtracted: 4x - 8 - 3 = 4x - 11.** Recheck by substituting the given point (2, -3): -3 = 8 - 11 holds, so the line is right.

## DIAGNOSTIC_QUESTION_4
Two lines \(L_1\) and \(L_2\) pass through \((1, 2)\). \(L_1\) has slope \(3\), \(L_2\) has slope \(-\frac{1}{3}\). Determine if they are perpendicular. Justify using the point-slope form.

## DIAGNOSTIC_ANSWER_4
\(L_1: y - 2 = 3(x - 1) \Rightarrow y = 3x - 1\). \(L_2: y - 2 = -\frac{1}{3}(x - 1) \Rightarrow y = -\frac{1}{3}x + \frac{7}{3}\). The product of slopes is \(3 \times (-\frac{1}{3}) = -1\), so they are perpendicular. A wrong answer may indicate the student does not connect the slope extracted from the point-slope form to the perpendicular condition \(m_1 m_2 = -1\).

## DIAGNOSTIC_QUESTION_5
A student writes the equation of the line through \((4, 5)\) with slope \(-2\) as \(y - 5 = -2(x - 4)\) and then simplifies to \(y = -2x + 3\). Is this correct? If not, find the error.

## DIAGNOSTIC_ANSWER_5
The simplification is incorrect: \(y - 5 = -2x + 8 \Rightarrow y = -2x + 13\). The student added 5 to 8 incorrectly (got 3 instead of 13). This reveals a sign error or arithmetic mistake when isolating \(y\), a common slip when negative slopes are involved.

## DIAGNOSTIC_QUESTION_6
Create a real-world problem (with Indian context) that requires using the point-slope form to find the equation of a line. Provide the solution.

## DIAGNOSTIC_ANSWER_6
Example: A taxi charges a fixed fare of ₹50 for the first km and ₹15 per subsequent km. Write the equation for the total fare \(y\) (in ₹) as a function of distance \(x\) (in km) for \(x \ge 1\), given that at \(x=1\), \(y=50\). The slope is 15, point \((1,50)\). Equation: \(y - 50 = 15(x - 1) \Rightarrow y = 15x + 35\). A poor answer might not set up the correct point or slope, or might use \(x=0\) incorrectly, showing an inability to translate the word problem into the correct mathematical model.

## COMMON_MISCONCEPTION
Students often write the point-slope form as \(y - y_1 = m(x + x_1)\) or \(y + y_1 = m(x - x_1)\) by misplacing the signs of the coordinates. For example, given point \((-2, 3)\) and slope \(4\), they write \(y - 3 = 4(x - 2)\) instead of \(y - 3 = 4(x + 2)\). This happens because they do not properly substitute \(x_1 = -2\) into \((x - x_1)\). They treat \(x_1\) as \(2\) instead of \(-2\), ignoring the negative sign during substitution.

## ON_FAILURE
To fix this, have the student explicitly write down the coordinates of the given point as \((x_1, y_1)\) with their signs. Then write the formula \(y - y_1 = m(x - x_1)\). Substitute the values step by step: if \(x_1 = -2\), then \(x - (-2) = x + 2\). Practice with points having negative coordinates until the substitution becomes automatic. Use a checklist: "Write \(x_1 = \_\_\), \(y_1 = \_\_\); then write \(x - (\_\_)\) and \(y - (\_\_)\)."

## PREREQUISITE_NODE_IDS
c11_math_cbse_10_001, c11_math_cbse_10_006, c9_math_ch1_1, c9_math_ch1_2, c9_math_ch2_6, c11_math_cbse_10_003, c11_math_cbse_10_005, c11_math_cbse_10_007, c11_math_cbse_10_008

## PREREQUISITE_REASONS
c11_math_cbse_10_001: Understanding coordinate axes and coordinates of a point is essential to identify \((x_1, y_1)\).
c11_math_cbse_10_006: Slope of a line definition and formula is needed to understand \(m\).
c9_math_ch1_1: Cartesian coordinate system basics from Class 9.
c9_math_ch1_2: Plotting points on the Cartesian plane.
c9_math_ch2_6: Slope-intercept form from Class 9 helps in converting forms.
c11_math_cbse_10_003: Point-slope form requires a point on the line, often found by section formula  
c11_math_cbse_10_005: Point-slope form gives line equations; intersection points become triangle vertices.  
c11_math_cbse_10_007: point-slope form requires slope, often found using parallel/perpendicular conditions.  
c11_math_cbse_10_008: Point-slope form y - y₁ = m(x - x₁) requires slope m, often found using angle conditions (e.g., line making 45° with given line).  

## FORWARD_NODE_IDS
c11_math_cbse_10_010, c11_math_cbse_10_011, c11_math_cbse_10_012, c11_math_cbse_10_013, c11_math_cbse_10_014, c12_math_cbse_06_005, c12_math_cbse_10_008, c12_math_cbse_11_002, c12_math_cbse_12_005

## FORWARD_REASONS
c11_math_cbse_10_010: Two-point form uses point-slope form with slope calculated from two points.
c11_math_cbse_10_011: Slope-intercept form is a special case of point-slope form when the point is the y-intercept.
c11_math_cbse_10_012: Intercept form can be derived from point-slope form using intercepts as points.
c11_math_cbse_10_013: Normal form requires understanding of line equations in various forms.
c11_math_cbse_10_014: Point-slope form conversion to general form is a common prerequisite step.  
c12_math_cbse_06_005: Point-slope form y - y₁ = m(x - x₁) is the standard form for writing line equations.  
c12_math_cbse_10_008: Point-slope form in 2D (y - y₁ = m(x - x₁)) is the Cartesian analogue of **r = a + λb**; builds intuition.  
c12_math_cbse_11_002: Point-slope form \(y - y_1 = m(x - x_1)\) in 2D is the direct analog of the 3D Cartesian form; students must see the pattern extension.  
c12_math_cbse_12_005: Various forms of line equations (intercept form, slope-intercept) are used to quickly plot the constraint lines.  

## CROSS_SUBJECT_PREREQS
c11_phy_cbse_02_003, c11_eco_cbse_02_004
## CROSS_SUBJECT_REASONS
c11_physics_ch2_3: Motion in a straight line with constant velocity uses linear equations; point-slope form can represent velocity as slope and initial position as point.
c11_economics_ch2_4: Linear demand/supply curves; point-slope form helps find equation given a point (price, quantity) and slope (marginal rate).
c11_phy_cbse_02_003: Cross-subject support: Instantaneous velocity is the rate of change of position with respect to time at a specifi... supplies tools/facts used directly in this node.  
c11_eco_cbse_02_004: Cross-subject support: Land reforms refer to deliberate policy measures to change the ownership, tenancy, and man... supplies tools/facts used directly in this node.  

## CHAIN_DESCRIPTION
c11_math_cbse_10_006 -> c11_math_cbse_10_009 -> c11_math_cbse_10_010

## THIS_FORMULA
y - y_1 = m(x - x_1)

## FORMULA_VARIABLES
m = slope of the line (real number), (x_1, y_1) = coordinates of a fixed point on the line, (x, y) = coordinates of any variable point on the line.

## FORMULA_UNITS
dimensionless (coordinates are in units of length, but the equation is algebraic)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In physics, the equation of motion with constant velocity v is x = x_0 + vt, which is a point-slope form with slope v and point (0, x_0).
c11_economics_ch2_4 | In economics, a linear demand curve Q = a - bP can be written in point-slope form given a point (P_0, Q_0) and slope -b.

## PREREQ_CONCEPT
Slope of a line and coordinates of a point in the Cartesian plane.

## PREREQ_BEFORE
The student must be able to calculate the slope between two points and identify coordinates of a given point.

## PREREQ_STUCK
If stuck, revisit the slope formula (c11_math_cbse_10_006) and practice substituting negative coordinates into algebraic expressions.

## WORKED_EXAMPLE_1
PROBLEM: A ramp for a wheelchair is to be built with a slope of 1/12 (rise:run). The ramp starts at a point 0.5 metres above the ground at a horizontal distance of 2 metres from the wall. Find the equation of the line representing the ramp. Also, find the height of the ramp at a horizontal distance of 5 metres from the wall.

STEPS:
- Step 1: Identify the given slope m = 1/12 and the point (x_1, y_1) = (2, 0.5). Note: horizontal distance is x, height is y.
- Step 2: Write the point-slope form: y - y_1 = m(x - x_1).
- Step 3: Substitute the values: y - 0.5 = (1/12)(x - 2).
- Step 4: Simplify to slope-intercept form: y = (1/12)x - 2/12 + 0.5 = (1/12)x - 1/6 + 1/2 = (1/12)x + 1/3.
- Step 5: To find the height at x = 5, substitute x = 5: y = (1/12)*5 + 1/3 = 5/12 + 4/12 = 9/12 = 0.75 metres.
- Step 6: Interpret: The ramp height at 5 metres from the wall is 0.75 m.

REASONING: The point-slope form directly uses the given slope and point. Converting to slope-intercept form makes it easy to evaluate the height for any horizontal distance.

ANSWER: Equation: y = (1/12)x + 1/3; Height at x=5 m is 0.75 m.

## WORKED_EXAMPLE_2
PROBLEM: Find the equation of the line that passes through the point (-3, 4) and makes an angle of 135° with the positive direction of the x-axis. Write the answer in general form Ax + By + C = 0.

STEPS:
- Step 1: The slope m = tan(135°) = tan(180° - 45°) = -tan 45° = -1.
- Step 2: Given point (x_1, y_1) = (-3, 4).
- Step 3: Apply point-slope form: y - 4 = -1(x - (-3)) => y - 4 = -1(x + 3).
- Step 4: Simplify: y - 4 = -x - 3 => x + y - 1 = 0.
- Step 5: Check: For x = -3, y = 4 gives -3 + 4 - 1 = 0, correct. Slope from general form: -A/B = -1/1 = -1, matches.
- Step 6: Write the final equation in general form: x + y - 1 = 0.

REASONING: The angle of inclination gives the slope. The point-slope form handles negative coordinates carefully. Converting to general form is a common board exam requirement.

ANSWER: x + y - 1 = 0.

## WORKED_EXAMPLE_3
PROBLEM: A line passes through the intersection of the lines 2x + 3y = 6 and x - y = 1, and has a slope of -2/3. Find its equation in slope-intercept form.

STEPS:
- Step 1: Find the intersection point of the two given lines. Solve the system:
  2x + 3y = 6
  x - y = 1 => x = y + 1.
- Step 2: Substitute x in first equation: 2(y+1) + 3y = 6 => 2y + 2 + 3y = 6 => 5y = 4 => y = 4/5.
- Step 3: Then x = 4/5 + 1 = 9/5. So intersection point is (9/5, 4/5).
- Step 4: Given slope m = -2/3. Use point-slope form: y - 4/5 = (-2/3)(x - 9/5).
- Step 5: Simplify: y - 4/5 = (-2/3)x + (2/3)*(9/5) = (-2/3)x + 18/15 = (-2/3)x + 6/5.
- Step 6: Add 4/5 to both sides: y = (-2/3)x + 6/5 + 4/5 = (-2/3)x + 10/5 = (-2/3)x + 2.
- Step 7: The slope-intercept form is y = (-2/3)x + 2.

REASONING: This problem combines the concept of intersection of lines (from earlier nodes) with point-slope form. It tests algebraic manipulation with fractions.

ANSWER: y = (-2/3)x + 2.

## COMPETENCY_QUESTION_1
QUESTION: A straight line passes through the point (2, -3) and is perpendicular to the line joining the points (1, 2) and (4, 5). Find the equation of the line in point-slope form and then convert it to intercept form. Also, find the x-intercept and y-intercept of this line.

COMPETENCY: Translating real-world situations to mathematical expressions and connecting multiple concepts (slope of perpendicular lines, point-slope form, intercept form).

STEPS:
- Step 1: Find the slope of the line joining (1,2) and (4,5): m_1 = (5-2)/(4-1) = 3/3 = 1.
- Step 2: The required line is perpendicular, so its slope m = -1/m_1 = -1.
- Step 3: Use point-slope form with point (2, -3): y - (-3) = -1(x - 2) => y + 3 = -x + 2.
- Step 4: Convert to intercept form: x + y = -1 => x/(-1) + y/(-1) = 1. So x-intercept = -1, y-intercept = -1.
- Step 5: Verify: The line passes through (2, -3): 2 + (-3) = -1, correct.

ANSWER: Point-slope form: y + 3 = -(x - 2); Intercept form: x/(-1) + y/(-1) = 1; x-intercept = -1, y-intercept = -1.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A car rental company charges a fixed fee plus a per-kilometre charge. The total cost for 100 km is ₹2500 and for 200 km is ₹4000. Assuming a linear relationship, find the equation of the cost C (in ₹) as a function of distance d (in km) using point-slope form. Then determine the fixed fee and the per-km charge. Also, find the cost for 150 km.

COMPETENCY: Mathematical modelling and interpretation of slope and intercept in a real-world context; using two points to find slope, then point-slope form, then interpreting constants.

STEPS:
- Step 1: Identify two points: (d_1, C_1) = (100, 2500) and (d_2, C_2) = (200, 4000).
- Step 2: Compute slope m = (4000 - 2500)/(200 - 100) = 1500/100 = 15. This is the per-km charge.
- Step 3: Use point-slope form with point (100, 2500): C - 2500 = 15(d - 100).
- Step 4: Simplify: C = 15d - 1500 + 2500 = 15d + 1000.
- Step 5: The fixed fee is the y-intercept (when d=0): C = 1000. So fixed fee = ₹1000, per-km charge = ₹15.
- Step 6: Cost for 150 km: C = 15*150 + 1000 = 2250 + 1000 = ₹3250.

ANSWER: Equation: C = 15d + 1000; Fixed fee: ₹1000; Per-km charge: ₹15; Cost for 150 km: ₹3250.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine you are designing a ______ ramp for your school library.

## DIAGNOSTIC_ANSWER_7
wheelchair

**A wrong answer ("ramp" or "walking") reveals the student has swapped the walkthrough's adjective - you are designing a wheelchair ramp for your school library.** Wheelchair is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the 1:12 slope and doorway start before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can derive the point-slope form from the definition of slope, write the equation of a line given a point and slope (including when the slope is given via an angle of inclination), convert between point-slope form and other forms (slope-intercept, general form, intercept form), and solve word problems involving linear.
