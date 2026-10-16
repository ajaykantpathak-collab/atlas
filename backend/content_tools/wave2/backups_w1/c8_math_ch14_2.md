## ELI5
A triangle is half a rectangle in disguise. Draw any triangle, complete it into a rectangle with the same base and height, and the diagonal splits that rectangle into two identical triangles — so one triangle is exactly half the rectangle's area. That is the whole story of the formula: half times base times height. The height must stand perpendicular on the base, even if it has to be drawn outside a tilted triangle. No rectangle needed at exam time — the picture already paid the bill.

## DEFINITION
The area of a triangle is exactly half the area of a rectangle that shares the same base length and perpendicular height. If a rectangle has base \(b\) and height \(h\), its area is \(b \times h\); any triangle with the same base \(b\) and corresponding height \(h\) has area \(\frac{1}{2} \times b \times h\).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can explain why the triangle area formula is half the rectangle area by decomposing a rectangle along its diagonal, and can correctly calculate the area of any triangle (right, acute, obtuse) when given the base and the corresponding perpendicular height, including problems where the height falls outside the triangle.
## SCOPE_BOUNDARY
This node covers the derivation of the triangle area formula from the rectangle area formula and its application to all triangle types using the perpendicular height. It does NOT cover Heron's formula, trigonometric area formula (\(\frac{1}{2}ab\sin C\)), or area of triangles on coordinate grids — those are higher-class topics.
## WALKTHROUGH
Imagine you are helping your mother stitch a triangular cloth patch for a torn kurta. The cloth piece is rectangular, 20 cm by 12 cm. She asks, "If I cut this rectangle diagonally from one corner to the opposite corner, what will be the area of each triangular piece?" Start by recalling the rectangle area formula from the previous node (c8_math_ch14_1): length × width. Draw the rectangle, label base and height, then draw one diagonal. Observe that the diagonal splits the rectangle into two congruent right triangles. Since the two triangles together make the whole rectangle, each triangle must be exactly half the rectangle's area. This reasoning works for any triangle: you can always imagine a rectangle around it with the same base and height, and the triangle occupies half that rectangle.

Takeaway: area = ½ × base × height, and the reasoning — two copies of the triangle fill the rectangle — works for right, acute and obtuse triangles alike. Exam format: expect 'explain why the formula has the half' — the diagonal-of-the-rectangle picture is the explanation, not a footnote. Verification beat: check the height is perpendicular to the chosen base, even when it lands outside the triangle; slant sides are not heights. Why students miss it: they grab a slanted side as the height, or halve twice — once for the triangle and once again out of habit.

## DIAGNOSTIC_QUESTION_1
What is the formula for the area of a triangle in terms of its base \(b\) and height \(h\)?
## DIAGNOSTIC_ANSWER_1
The formula is \(\text{Area} = \frac{1}{2} \times b \times h\). A wrong answer (e.g., \(b \times h\) or \(\frac{1}{2} \times b \times h \times 2\)) reveals the student has not internalised the "half of rectangle" concept and is likely guessing or confusing it with the rectangle formula.
## DIAGNOSTIC_QUESTION_2
A rectangle has base 10 cm and height 6 cm. A diagonal divides it into two triangles. Why is the area of each triangle exactly half the rectangle's area, and not some other fraction?
## DIAGNOSTIC_ANSWER_2
The diagonal splits the rectangle into two congruent right triangles (by RHS congruence: same hypotenuse, same legs). Since they are congruent, they have equal area, and together they sum to the rectangle's area, so each is exactly half. A wrong answer (e.g., "because the formula says so" or "the diagonal cuts it in two") shows the student cannot justify the geometric reason — they know the rule but not the proof.
## DIAGNOSTIC_QUESTION_3
Find the area of a triangle with base 14 cm and corresponding height 9 cm.
## DIAGNOSTIC_ANSWER_3
Step 1: Write formula: \(A = \frac{1}{2} \times b \times h\).  
Step 2: Substitute \(b = 14\), \(h = 9\): \(A = \frac{1}{2} \times 14 \times 9\).  
Step 3: Simplify: \(\frac{1}{2} \times 14 = 7\), then \(7 \times 9 = 63\).  
Step 4: Area = 63 cm².  
A wrong answer like 126 cm² (forgetting the half) or 23 cm² (adding instead of multiplying) reveals the student either ignores the \(\frac{1}{2}\) factor or misapplies arithmetic operations.
## DIAGNOSTIC_QUESTION_4
Two triangles have the same base 12 cm. Triangle A has height 8 cm. Triangle B has height 5 cm but is obtuse, with the height drawn outside the triangle. Compare their areas. Does the formula \(\frac{1}{2} \times b \times h\) work for Triangle B? Explain.
## DIAGNOSTIC_ANSWER_4
Triangle A area = \(\frac{1}{2} \times 12 \times 8 = 48\) cm². Triangle B area = \(\frac{1}{2} \times 12 \times 5 = 30\) cm². The formula works for Triangle B because the "height" is defined as the perpendicular distance from the base line to the opposite vertex, even if that perpendicular falls outside the triangle. The rectangle-area proof still holds by extending the base. A wrong answer claiming the formula fails for obtuse triangles shows the student thinks height must always lie inside the triangle.
## DIAGNOSTIC_QUESTION_5
A student calculates the area of a triangle with base 10 m and height 4 m as follows: \(10 \times 4 = 40\), then \(40 \div 2 = 20\) m². Another student does: \(\frac{1}{2} \times 10 = 5\), then \(5 \times 4 = 20\) m². Are both methods correct? Which is more efficient for mental math and why?
## DIAGNOSTIC_ANSWER_5
Both methods are mathematically correct because multiplication is associative and commutative: \(\frac{1}{2} \times b \times h = (b \times h) \div 2 = (b \div 2) \times h\). The second method (halve the base first) is often more efficient for mental math when the base is even, because it reduces the numbers early (5 × 4 is easier than 40 ÷ 2). A student who says only one method is correct misunderstands the flexibility of multiplication order.
## DIAGNOSTIC_QUESTION_6
Create a real-life problem (in an Indian context) where you need to find the area of a triangle, but the given measurements are the sides of a rectangle that the triangle fits into. Write the problem and solve it.
## DIAGNOSTIC_ANSWER_6
Example problem: "A rectangular garden plot is 15 m by 8 m. The owner wants to plant grass on a triangular section formed by one diagonal of the rectangle. Find the area to be planted." Solution: Rectangle area = 15 × 8 = 120 m². Triangle area = half = 60 m². A poor answer gives a problem that doesn't use the rectangle-triangle relationship (e.g., directly gives base and height) or solves incorrectly, showing the student cannot construct the conceptual link.
## COMMON_MISCONCEPTION
Students often use any side length as "height" instead of the perpendicular height. For example, given a triangle with sides 5 cm, 12 cm, 13 cm (right triangle), they might take base = 12 and height = 13 (the hypotenuse) and compute \(\frac{1}{2} \times 12 \times 13 = 78\) cm², instead of using the two legs (5 and 12) as base and height to get 30 cm². They confuse "side length" with "perpendicular height" because in a right triangle the legs are perpendicular, but the hypotenuse is not the height relative to either leg.
## ON_FAILURE
If a student uses the wrong side as height, draw the triangle on grid paper. Ask: "Which side is the base you chose? Now drop a perpendicular from the opposite vertex to that base — measure that perpendicular. That is the height." Then have them recompute with the correct height. Emphasise: "Height is always perpendicular to the chosen base. It is not just any side." Practise with right, acute, and obtuse triangles where the height is drawn outside.
## PREREQUISITE_NODE_IDS
c8_math_ch14_1, c6_math_ch08_087, c6_math_ch08_088, c7_math_ch07_001, c7_math_ch07_007
## PREREQUISITE_REASONS
c8_math_ch14_1: Provides the rectangle area formula (length × width) which is the foundation for deriving the triangle formula.
c6_math_ch08_087: Class 6 introduction to rectangle and square area; students must recall this basic concept.
c6_math_ch08_088: Class 6 exposure to triangle area; this node deepens that understanding with the rectangle derivation.
c7_math_ch07_001: Class 7 triangle definition, vertices, sides, angles — needed to identify base and corresponding height.
c7_math_ch07_007: Angle sum property and triangle classification help students recognise right, acute, obtuse triangles for height placement.
## FORWARD_NODE_IDS
c8_math_ch14_3, c8_math_ch14_4, c8_math_ch14_5, c8_math_ch14_6, c8_math_ch14_10, c8_math_ch14_7, c8_math_ch14_9
## FORWARD_REASONS
c8_math_ch14_3: Parallelogram area uses the same base×height concept; triangle understanding helps see parallelogram as two triangles.
c8_math_ch14_4: Directly derives triangle area from parallelogram (another half-rectangle relation).
c8_math_ch14_5: Rhombus area uses diagonals; connects to triangle decomposition (rhombus = 4 right triangles).
c8_math_ch14_6: Trapezium area formula uses average of parallel sides × height; triangle is a degenerate trapezium.
c8_math_ch14_10: Polygon decomposition into triangles requires mastery of triangle area formula.
c8_math_ch14_7: Area of triangle (½ × base × height) provides non-rectangular examples for comparison.
c8_math_ch14_9: Need triangle area formula (½ × base × height) for triangular components.

## CROSS_SUBJECT_PREREQS
c6_math_ch08_089, c7_math_ch03_005
## CROSS_SUBJECT_REASONS
c6_math_ch08_089: Area of circles introduces π and curved shapes; contrast with polygon area formulas reinforces understanding of linear vs curved boundaries.
c7_math_ch03_005: Units of measurement and decimal notation (cm, m, mm) are essential for expressing area in correct units (cm², m²) and converting between them.
## CHAIN_DESCRIPTION
c6_math_ch08_087 -> c8_math_ch14_1 -> c8_math_ch14_2 -> c8_math_ch14_3 -> c8_math_ch14_4
## THIS_FORMULA
Area = \(\frac{1}{2} \times b \times h\)
## FORMULA_VARIABLES
\(b\) = length of the chosen base (any side of the triangle), \(h\) = perpendicular height from the opposite vertex to the line containing the base (measured at 90° to the base)
## FORMULA_UNITS
Area in square units (cm², m², mm², km²); base and height in linear units (cm, m, mm, km)
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT

## PREREQ_CONCEPT
Understanding that a rectangle's diagonal divides it into two congruent triangles of equal area.
## PREREQ_BEFORE
The student must be able to calculate the area of a rectangle (length × width) and identify the base and perpendicular height of a triangle.
## PREREQ_STUCK
Revisit c8_math_ch14_1 (Area of Rectangle) and c7_math_ch07_001 (Triangle definition) to reinforce base-height identification.
## WORKED_EXAMPLE_1
PROBLEM: A triangular traffic sign board has a base of 60 cm and a perpendicular height of 40 cm. The sign is to be painted with reflective paint costing ₹15 per cm². Find the total cost of painting the sign.

STEPS:
- Step 1: Identify the given values: base \(b = 60\) cm, height \(h = 40\) cm, cost = ₹15 per cm².
- Step 2: Recall the triangle area formula: \(A = \frac{1}{2} \times b \times h\).
- Step 3: Substitute the values: \(A = \frac{1}{2} \times 60 \times 40\).
- Step 4: Compute stepwise: \(\frac{1}{2} \times 60 = 30\), then \(30 \times 40 = 1200\) cm².
- Step 5: Multiply area by cost per cm²: \(1200 \times 15 = ₹18,000\).

REASONING: The formula \(\frac{1}{2} \times b \times h\) comes from the fact that the triangle is half of a rectangle with the same base and height. We first find the area in cm², then use unitary method (cost per unit area) to find total cost — a common real-world application combining geometry and arithmetic.

ANSWER: ₹18,000
## WORKED_EXAMPLE_2
PROBLEM: The area of a triangular plot is 240 m². Its base is 30 m. Find the length of the perpendicular height from the opposite vertex to this base. If the plot is to be fenced along the two sides that meet at the vertex opposite the base, and each of those sides is 26 m long, find the total fencing cost at ₹120 per metre.

STEPS:
- Step 1: Given area \(A = 240\) m², base \(b = 30\) m. Use formula \(A = \frac{1}{2} \times b \times h\) to find \(h\).
- Step 2: Substitute: \(240 = \frac{1}{2} \times 30 \times h\).
- Step 3: Solve for \(h\): \(240 = 15 \times h\) → \(h = 240 \div 15 = 16\) m.
- Step 4: The two sides to be fenced are each 26 m (given). Total fencing length = \(26 + 26 = 52\) m.
- Step 5: Fencing cost = \(52 \times 120 = ₹6,240\).

REASONING: This is a reverse problem — given area and base, find height. It requires algebraic manipulation of the area formula. The fencing part adds a perimeter-like calculation but only for two sides, testing whether the student distinguishes between area and linear measurements.

ANSWER: Height = 16 m; Fencing cost = ₹6,240
## WORKED_EXAMPLE_3
PROBLEM: A farmer has a rectangular field 50 m by 30 m. He divides it into two triangular plots by building a fence along one diagonal. He plants wheat on one triangle and rice on the other. Wheat yield is 4 kg per m², rice yield is 3.5 kg per m². Find the total grain harvest in kg.

STEPS:
- Step 1: Find rectangle area: \(50 \times 30 = 1500\) m².
- Step 2: Each triangle area = half of rectangle = \(1500 \div 2 = 750\) m².
- Step 3: Wheat harvest = area × yield = \(750 \times 4 = 3000\) kg.
- Step 4: Rice harvest = \(750 \times 3.5 = 2625\) kg (compute: \(750 \times 3 = 2250\), \(750 \times 0.5 = 375\), sum = 2625).
- Step 5: Total harvest = \(3000 + 2625 = 5625\) kg.

REASONING: This multi-step problem combines rectangle area (prior node), triangle area derivation (this node), and decimal multiplication (Class 7 decimals). It tests the student's ability to chain concepts: rectangle → triangle → real-world yields. The diagonal fence ensures the two triangles are congruent and exactly half the rectangle.

ANSWER: 5,625 kg
## COMPETENCY_QUESTION_1
QUESTION: A triangular window has base 2 m and height 1.5 m. The glass costs ₹350 per m². The frame costs ₹200 per metre of perimeter. The two equal sides of the triangle are each 1.8 m. Calculate the total cost of glass and frame. Explain why you used 1.5 m as the height and not 1.8 m.

COMPETENCY: Translating real-world situations to mathematical expressions; distinguishing between height and side length.

STEPS:
- Step 1: Compute glass area using \(\frac{1}{2} \times 2 \times 1.5 = 1.5\) m².
- Step 2: Glass cost = \(1.5 \times 350 = ₹525\).
- Step 3: Perimeter for frame = base + side1 + side2 = \(2 + 1.8 + 1.8 = 5.6\) m.
- Step 4: Frame cost = \(5.6 \times 200 = ₹1,120\).
- Step 5: Total cost = \(525 + 1120 = ₹1,645\).
- Step 6: Explanation: Height is the perpendicular distance from base to opposite vertex. The 1.8 m sides are slanted; they are not perpendicular to the base, so they cannot be used as height in the area formula.

ANSWER: Total cost = ₹1,645. Height 1.5 m is perpendicular to base 2 m; the 1.8 m sides are not perpendicular to the base.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: An architect designs a triangular roof section with base 12 m. The two equal sides are 10 m each. She needs to find the area to order tiles. She draws the perpendicular height from the apex to the base, which splits the base into two 6 m segments. Find the height using the Pythagorean theorem, then find the area. If tiles come in boxes covering 2 m² each, how many boxes are needed? (Assume no waste.)

COMPETENCY: Combining geometric concepts (Pythagoras, triangle area) and solving a multi-step practical problem.

STEPS:
- Step 1: The height divides the isosceles triangle into two right triangles. Each has hypotenuse 10 m, base 6 m.
- Step 2: Apply Pythagoras: \(h^2 + 6^2 = 10^2\) → \(h^2 + 36 = 100\) → \(h^2 = 64\) → \(h = 8\) m.
- Step 3: Triangle area = \(\frac{1}{2} \times 12 \times 8 = 48\) m².
- Step 4: Boxes needed = \(48 \div 2 = 24\) boxes.

ANSWER: Height = 8 m; Area = 48 m²; Boxes needed = 24.

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The area of a triangle is exactly half the area of a rectangle that shares the same base length and ______ height.

## DIAGNOSTIC_ANSWER_7
perpendicular

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are helping your mother stitch a ______ cloth patch for a torn kurta.

## DIAGNOSTIC_ANSWER_8
triangular

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
The student can explain why the triangle area formula is half the rectangle area by decomposing a rectangle along its diagonal, and can correctly calculate the area of any triangle (right, acute, obtuse) when given the base and the corresponding perpendicular height, including problems where the height falls outside the triangle.
