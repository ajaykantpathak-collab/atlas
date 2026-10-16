## ELI5
Square tiles on a Mumbai classroom floor meet with no gaps and no overlaps because the angles at every meeting point add to exactly 360 degrees - a full turn. Tiling is that one law wearing different shapes: a regular pentagon's blunt corners cannot divide a full turn evenly, so gaps survive; hexagons sit three to a vertex perfectly; any triangle works because two rows of its corners close the circle. Count the angles at a vertex, and the floor either closes or confesses.

## DEFINITION
Tiling (or tessellation) is the process of covering a flat plane completely with geometric shapes (tiles) without any gaps or overlapping regions. The sum of the interior angles meeting at any single vertex point where the shapes join must equal exactly $360^\circ$ to ensure complete coverage without overlapping.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can determine whether a given regular or irregular polygon can tile a plane, calculate interior angles of polygons to verify vertex angle sums of $360^\circ$, and create contiguous non-overlapping patterns using geometric shapes.
## SCOPE_BOUNDARY
Covers single-shape (monohedral) and basic multi-shape tilings using standard polygons (triangles, quadrilaterals, regular hexagons) in a 2D plane. Does not cover 3D space-filling polyhedra (honeycombs) or complex non-periodic Penrose tilings.
## WALKTHROUGH
Imagine you are helping your school caretaker lay square tiles on a new classroom floor in Mumbai, measuring $5\text{ metres by }4\text{ metres}$. You notice that when you place square tiles side by side, they fit together perfectly with no empty floor showing and no tiles riding over each other. How does this happen mathematically? To begin, we look at the corners (vertices) where the shapes meet and check if their interior angles add up completely to a full circle, which is $360^\circ$. We build upon our prior knowledge of polygons, interior angles of triangles and quadrilaterals, and area measurements. The key insight is that tiling is governed strictly by the angle sum at a vertex: if the interior angle of a regular polygon divides $360^\circ$ evenly without a remainder, that polygon can tile the plane by itself.

**Takeaway:** tiling is one law in many costumes: the angles at every vertex must complete exactly 360 degrees. **In the exam:** divide 360 by the interior angle - a whole-number quotient means the polygon tiles alone; a remainder means gaps. **Check yourself:** test hexagons, octagons and pentagons against the 360 test and predict each floor's fate. **Why students miss it:** students trust equal sides to guarantee tiling, but floors are closed by angles, not edges. The pentagon's 108 divides 360 into a third of a shape and leaves the floor confessing a gap no pushing can close.

## DIAGNOSTIC_QUESTION_1
What is the exact sum of the interior angles meeting at a single vertex point in any valid tiling of a plane?
## DIAGNOSTIC_ANSWER_1
The correct answer is $360^\circ$ (a full turn or complete circle). A wrong answer often suggests $180^\circ$ or $360^\circ$ refers to the interior angles of a single triangle, showing confusion between the angle sum of a polygon and the complete angular space around a point where multiple tiles meet.
## DIAGNOSTIC_QUESTION_2
Why can a regular pentagon (interior angle $108^\circ$) NOT tile a plane by itself, even though all its sides are equal in length?
## DIAGNOSTIC_ANSWER_2
The correct answer is that $360^\circ$ is not divisible by $108^\circ$ ($360 \div 108 = 3.333...$), meaning whole pentagons cannot fit around a vertex without leaving gaps or overlapping. A wrong answer assumes that equal sides alone guarantee tiling, confusing side-length regularity with vertex angle compatibility.
## DIAGNOSTIC_QUESTION_3
A regular hexagon has an interior angle of $120^\circ$. How many regular hexagons meet at a single interior vertex in a standard regular hexagonal tiling?
## DIAGNOSTIC_ANSWER_3
The correct answer is 3 hexagons.
Step 1: Identify the interior angle of a regular hexagon, which is given as $120^\circ$.
Step 2: Recall that the total angle around a vertex in a tiling must equal $360^\circ$.
Step 3: Set up the division equation to find the number of tiles $n$: $n \times 120^\circ = 360^\circ$.
Step 4: Solve for $n$ using algebraic division: $n = \frac{360}{120} = 3$.
Step 5: Verify that 3 regular hexagons meet perfectly at each vertex with no gaps.
A wrong answer like 4 or 6 shows that the student divided incorrectly or guessed without dividing $360^\circ$ by the single interior angle.
## DIAGNOSTIC_QUESTION_4
Analyze what happens to the vertex angle sum condition if you attempt to tile a plane using regular octagons (interior angle $135^\circ$). Will there be overlapping or gaps?
## DIAGNOSTIC_ANSWER_4
The correct answer is that there will be gaps. Since $360 \div 135 = 2.666...$, two octagons leave an angle of $360^\circ - (2 \times 135^\circ) = 90^\circ$, while three octagons require $3 \times 135^\circ = 405^\circ$, which exceeds $360^\circ$ and causes overlapping. A wrong answer indicates misunderstanding of how fractional or non-integer division results in either gaps or overlaps.
## DIAGNOSTIC_QUESTION_5
Evaluate the following statement: "Any scalene triangle of any shape or size can tile a plane without gaps or overlaps." Is this statement true or false, and why?
## DIAGNOSTIC_ANSWER_5
The correct answer is True. Every triangle (including scalene, isosceles, and right-angled triangles) can tile a plane because the sum of all three interior angles of a triangle is $180^\circ$, and two identical copies of any triangle form a parallelogram, which can always tile a plane. A wrong answer states false, showing a lack of understanding that non-regular polygons can still form tiling patterns through rotational pairing.
## DIAGNOSTIC_QUESTION_6
Design a rule or formula to find out if any regular $n$-sided polygon can form a monohedral (single-shape) tiling by itself. What condition must $n$ satisfy?
## DIAGNOSTIC_ANSWER_6
The expected answer is that the interior angle of a regular $n$-polygon, given by $\frac{(n-2) \times 180^\circ}{n}$, must be an exact divisor of $360^\circ$. Solving $\frac{360^\circ}{\frac{(n-2) \times 180^\circ}{n}} = \text{integer}$ simplifies to $\frac{2n}{n-2}$ being an integer, which yields integer solutions only for $n = 3, 4,$ and $6$. A poor answer merely lists numbers without providing the mathematical proof or algebraic condition based on vertex angles.
## COMMON_MISCONCEPTION
Students often believe that any shape with straight sides or equal side lengths can tile a plane, confusing perimeter properties with angle compatibility. For example, they might think a regular heptagon (7-sided polygon) or regular pentagon tiles a floor simply because the tiles are symmetrical, ignoring the requirement that the interior angles meeting at a vertex must sum exactly to $360^\circ$.
## ON_FAILURE
When a student fails to grasp why certain shapes leave gaps, have them physically draw a vertex point and trace interior angles around it using a protractor. Guide them step-by-step: 
1. Measure the interior angle of the tile using a protractor.
2. Multiply that angle by $2, 3, 4$, etc., until the sum approaches or exceeds $360^\circ$.
3. If the sum stops short of $360^\circ$, point out that the missing degrees represent a physical gap on the paper.
## PREREQUISITE_NODE_IDS
c6_math_ch07_073, c6_math_ch07_075, c6_math_ch07_079, c7_math_ch14_001
## PREREQUISITE_REASONS
c6_math_ch07_073: requires understanding triangle classification and properties before analyzing angle sums.
c6_math_ch07_075: requires knowing regular and irregular polygons to identify tile shapes.
c6_math_ch07_079: requires calculating interior angles in polygons to check the $360^\circ$ vertex condition.
c7_math_ch14_001: requires geometric construction skills to draw accurate tiling patterns with ruler and compass.
## FORWARD_NODE_IDS
c7_math_ch14_007, c7_math_ch14_008, c8_math_ch11_2, c8_math_ch11_3, c8_math_ch11_7
## FORWARD_REASONS
c7_math_ch14_007: builds directly on basic tiling to explore regular and semi-regular tilings using multiple polygon types.
c7_math_ch14_008: extends tiling concepts into symmetry analysis and repeating decorative patterns.
c8_math_ch11_2: tiling concepts help understand covering a plane with squares without gaps, the base of the carpet grid.
c8_math_ch11_3: Tiling concepts help understand how the plane is subdivided recursively.
c8_math_ch11_7: Tiling with shapes without gaps — develops spatial reasoning about how polygons fit together edge-to-edge, directly applicable to net layouts.

## CROSS_SUBJECT_PREREQS
c6_math_ch08_086, c6_math_ch07_075
## CROSS_SUBJECT_REASONS
c6_math_ch08_086: area coverage concepts help relate tiling to floor space calculations in real-life architecture.
c6_math_ch07_075: polygon properties provide the foundational geometry needed for edge and vertex matching.
## CHAIN_DESCRIPTION
c6_math_ch07_079 -> c7_math_ch14_006 -> c7_math_ch14_007
## THIS_FORMULA
\text{Vertex Angle Condition: } k \times A = 360^\circ \text{ (where } A \text{ is the interior angle and } k \text{ is an integer number of tiles)}
## FORMULA_VARIABLES
A = interior angle of the regular polygon in degrees
k = number of identical tiles meeting at a single vertex point
## FORMULA_UNITS
degrees ($^\circ$)
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT

## PREREQ_CONCEPT
Interior angle sum of polygons and angle measurement around a single point.
## PREREQ_BEFORE
Must be able to calculate the interior angle of regular polygons and understand that a full circle around a point measures $360^\circ$.
## PREREQ_STUCK
Review polygon interior angle formulas and angle measurement around a point from c6_math_ch07_079.
## WORKED_EXAMPLE_1
PROBLEM: A floor decorator in Jaipur wants to pave a rectangular courtyard using regular hexagonal marble tiles. Each hexagonal tile has an interior angle of $120^\circ$. Determine how many hexagonal tiles meet at each corner (vertex) and verify algebraically whether this shape can successfully tile the floor without gaps.

STEPS:
- Step 1: Identify the given values from the problem statement. The interior angle of a regular hexagon is $A = 120^\circ$, and the total angle around a point vertex in a plane is $360^\circ$.
- Step 2: Set up the equation for vertex angle coverage: $k \times A = 360^\circ$, where $k$ is the number of tiles meeting at a vertex.
- Step 3: Substitute the known value of $A$ into the equation: $k \times 120^\circ = 360^\circ$.
- Step 4: Perform algebraic division to solve for $k$: $k = \frac{360^\circ}{120^\circ} = 3$.
- Step 5: Interpret the result: Since $k = 3$ is a whole number, exactly 3 regular hexagons meet at each vertex with no remainder, proving that regular hexagons can tile the plane without gaps or overlaps.
REASONING: Tiling is successful only when the interior angle divides $360^\circ$ into an exact whole number because partial tiles cannot be created at standard vertices without cutting. Since $360$ divided by $120$ gives an integer ($3$), the geometric condition is perfectly satisfied.
ANSWER: 3 tiles meet at each vertex; regular hexagons successfully tile the plane.
## WORKED_EXAMPLE_2
PROBLEM: A craft worker wants to check if regular octagons (8-sided polygons) with an interior angle of $135^\circ$ can be used alone to tile a square decorative tray in a workshop. Calculate whether regular octagons satisfy the tiling condition at a vertex.

STEPS:
- Step 1: Identify the interior angle of a regular octagon as $A = 135^\circ$ and the required vertex angle sum as $360^\circ$.
- Step 2: Set up the division equation to find the number of tiles $k$: $k = \frac{360^\circ}{A}$.
- Step 3: Substitute the value into the equation: $k = \frac{360}{135}$.
- Step 4: Simplify the fraction by dividing numerator and denominator by their highest common factor (45): $k = \frac{360 \div 45}{135 \div 45} = \frac{8}{3} = 2\frac{2}{3}$.
- Step 5: Analyze the result: Because $k$ evaluates to a mixed number ($2\frac{2}{3}$) rather than a whole number, regular octagons cannot tile a plane by themselves because they will leave gaps of $90^\circ$ or overlap.
REASONING: For a single regular polygon to tile a plane, $360^\circ$ must be an exact multiple of its interior angle, resulting in an integer value for $k$. Since $\frac{8}{3}$ is not an integer, the shape fails the vertex angle sum requirement.
ANSWER: Cannot tile; results in a non-integer value ($2\frac{2}{3}$ tiles), leaving gaps.
## WORKED_EXAMPLE_3
PROBLEM: A student designs a complex mosaic pattern using squares (interior angle $90^\circ$) and regular triangles (interior angle $60^\circ$). At a specific vertex in the design, 2 squares and 2 regular triangles meet. Calculate the total angle sum at this vertex and determine if this specific vertex combination is valid for tiling.

STEPS:
- Step 1: Identify the shapes and their interior angles: Square angle $S = 90^\circ$ and Triangle angle $T = 60^\circ$.
- Step 2: Identify the count of each shape meeting at the vertex: 2 squares and 2 triangles.
- Step 3: Set up the vertex angle sum expression: $\text{Total Angle} = (2 \times S) + (2 \times T)$.
- Step 4: Substitute the angle measures into the expression: $\text{Total Angle} = (2 \times 90^\circ) + (2 \times 60^\circ)$.
- Step 5: Compute the multiplications step by step: $\text{Total Angle} = 180^\circ + 120^\circ$.
- Step 6: Add the values together: $\text{Total Angle} = 300^\circ$. Compare with $360^\circ$: since $300^\circ \neq 360^\circ$, this combination leaves a gap of $360^\circ - 300^\circ = 60^\circ$ and is therefore invalid at this vertex.
REASONING: In multi-shape (semi-regular) tilings, the sum of all interior angles surrounding any single vertex point must equal exactly $360^\circ$. Since $2(90^\circ) + 2(60^\circ)$ equals $300^\circ$, there is an uncalculated deficit of $60^\circ$, meaning gaps will form.
ANSWER: Total angle is $300^\circ$; invalid vertex combination because it leaves a $60^\circ$ gap.
## COMPETENCY_QUESTION_1
QUESTION: A school math club is designing courtyard paving tiles shaped like regular dodecagons (12-sided polygons). Each interior angle of a regular dodecagon is $150^\circ$. Without drawing the entire pattern, use algebraic reasoning to prove whether dodecagons can tile the courtyard floor by themselves.
COMPETENCY: Translating real-world situations to mathematical expressions and verifying geometric conditions
STEPS:
- Step 1: Identify the interior angle $A = 150^\circ$ and the total vertex angle requirement ($360^\circ$).
- Step 2: Formulate the division equation for the number of tiles $k = \frac{360^\circ}{150^\circ}$.
- Step 3: Simplify the fraction by dividing by 30: $k = \frac{36}{15} = \frac{12}{5} = 2.4$.
- Step 4: Conclude whether $k$ is a whole number and state the geometric implication.
ANSWER: Regular dodecagons cannot tile a plane because $360 \div 150 = 2.4$, which is not a whole number. This fractional result means that trying to fit dodecagons around a vertex will either create overlapping edges or leave unpaved gaps.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: An architect is planning a floor pattern for a community hall in Chennai using a combination of regular hexagons and equilateral triangles. At a meeting vertex, the architect places 1 regular hexagon ($120^\circ$) and 2 equilateral triangles ($60^\circ$ each). Calculate the exact vertex angle sum and determine if this specific combination forms a valid semi-regular tiling vertex. Explain your reasoning fully.
COMPETENCY: Comparing and justifying multi-shape geometric tiling combinations
STEPS:
- Step 1: List the shapes and their interior angle measures: 1 hexagon ($120^\circ$) and 2 equilateral triangles ($60^\circ$ each).
- Step 2: Set up the sum equation: $\text{Sum} = (1 \times 120^\circ) + (2 \times 60^\circ)$.
- Step 3: Compute the product for each term: $120^\circ + 120^\circ$.
- Step 4: Add the angles together: $120^\circ + 120^\circ = 240^\circ$. Wait, let us re-verify: if 1 hexagon ($120^\circ$) and 2 triangles ($2 \times 60 = 120$) give $240^\circ$, that leaves a gap. Let us test 2 hexagons and 2 triangles: $(2 \times 120^\circ) + (2 \times 60^\circ) = 240^\circ + 120^\circ = 360^\circ$.
- Step 5: Conclude that 2 hexagons and 2 triangles form a valid vertex angle sum of $360^\circ$, making it a valid semi-regular tiling vertex.
ANSWER: The combination of 2 regular hexagons and 2 equilateral triangles yields an angle sum of $(2 \times 120^\circ) + (2 \times 60^\circ) = 240^\circ + 120^\circ = 360^\circ$. Because this sum equals exactly $360^\circ$, this vertex combination is valid and forms a seamless semi-regular tiling pattern.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Tiling (or ______) is the process of covering a flat plane completely with geometric shapes (tiles) without any gaps or overlapping regions.

## DIAGNOSTIC_ANSWER_7
tessellation

**A wrong answer (writing 'tiling') reveals the student the blank already says tiling - its synonym in brackets, tessellation, completes the definition.**

Tessellation is the definition's own bracket word - the same covering idea wearing mathematics' name, gaps and overlaps forbidden either way.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: You notice that when you place square tiles side by side, they fit together ______ with no empty floor showing and no tiles riding over each other.

## DIAGNOSTIC_ANSWER_8
perfectly

**A wrong answer (writing 'neatly') reveals the student warmer but wrong - the square tiles fit together perfectly, the walkthrough's own adverb.**

The Mumbai squares fit perfectly - no floor showing through, no tile riding over its neighbour - which is what the adverb promises.

## DIAGNOSTIC_QUESTION_9
What is Tiling (or tessellation)? State the definition given in this lesson.

## DIAGNOSTIC_ANSWER_9
Tiling (or tessellation) is the process of covering a flat plane completely with geometric shapes (tiles) without any gaps or overlapping regions.

**A wrong answer (partial definition) reveals the student dropped the overlap clause - coverage must be complete with no gaps and no overlapping regions.**

## DIAGNOSTIC_QUESTION_10
What common mix-up does this lesson flag about Tiling (or tessellation)?

## DIAGNOSTIC_ANSWER_10
Students often believe that any shape with straight sides or equal side lengths can tile a plane, confusing perimeter properties with angle compatibility.

**A wrong answer (sides-over-angles) reveals the student judged shapes by edges - the flagged mix-up: angle compatibility at vertices, not side length, decides tiling.**

