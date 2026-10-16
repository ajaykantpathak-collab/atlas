## ELI5
Stand on a triangular hill's peak and want its true height: drop a plumb line straight down to the opposite boundary. That perpendicular drop is an altitude - a vertex-to-opposite-side segment meeting the base at a right angle. Every triangle owns three altitudes, and they always cross at one point, the orthocenter - inside for acute triangles, at the corner for right ones, outside when the triangle is obtuse. Careful: the line to a side's midpoint is a median, not an altitude; only the right angle counts.

## DEFINITION
An altitude of a triangle is a perpendicular line segment drawn from a vertex of the triangle to the line containing the opposite side, forming a 90-degree angle with that base. Every triangle has three altitudes that always intersect at a single point called the orthocenter, whose position depends on whether the triangle is acute, right-angled, or obtuse.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can construct all three altitudes for acute, right-angled, and obtuse triangles using a ruler and set-square or compass, and can correctly identify whether the orthocenter lies inside, on, or outside the triangle.
## SCOPE_BOUNDARY
Covers the definition, geometrical construction, and basic location properties of altitudes and the orthocenter in triangles using a ruler and compass or set-square, up to Class 7 NCERT level. Does NOT cover advanced concurrency theorems (like Euler's line or nine-point circle theorems) or trigonometric proofs.
## WALKTHROUGH
Imagine you are standing on top of a sliding hill shaped like a triangular playground at your school in Delhi, and you want to measure the exact vertical height from the highest corner straight down to the ground boundary opposite to it. To draw this shortest line on paper, you cannot just guess; you need a tool that guarantees a perfect 90-degree corner, just like using the edge of a set-square or a protractor. We build on our earlier knowledge of constructing perpendicular lines from a point to a line segment. The key insight is that an altitude acts as the "height" of the triangle when calculating its area, and because triangles have three corners, they always have three altitudes meeting at a special meeting point called the orthocenter.

**Takeaway:** an altitude is the perpendicular drop from a vertex to the opposite side's line; three exist per triangle. **In the exam:** construct with a set-square to guarantee the right angle; place the orthocenter by triangle type. **Check yourself:** drop one altitude in a drawing and mark the right angle it makes with the base. **Why students miss it:** they draw to the midpoint instead of perpendicular, gifting the median a new job.

## DIAGNOSTIC_QUESTION_1
What is the geometric definition of an altitude of a triangle with respect to its opposite side?
## DIAGNOSTIC_ANSWER_1
An altitude is a line segment drawn from a vertex perpendicular (at a 90-degree angle) to the line containing the opposite side. A student who answers that an altitude is simply "any line dividing the triangle in half" is confusing an altitude with an angle bisector or a median, missing the critical perpendicularity property.
## DIAGNOSTIC_QUESTION_2
True or False: The altitude of a triangle always lies entirely inside the triangle, regardless of the type of triangle. Explain your reasoning.
## DIAGNOSTIC_ANSWER_2
False. While altitudes lie inside an acute triangle, in an obtuse triangle, two of the altitudes lie outside the triangle and must be extended to meet the extended lines of their opposite sides. A student who says "True" has only visualized an acute-angled triangle and has not tested the definition on obtuse triangles where a perpendicular drop falls outside the physical boundary of the side.
## DIAGNOSTIC_QUESTION_3
In $\triangle PQR$, if $PS$ is an altitude drawn from vertex $P$ to side $QR$, and the length of $QR$ is $12\text{ cm}$ while the area of $\triangle PQR$ is $48\text{ cm}^2$, what is the length of the altitude $PS$?
## DIAGNOSTIC_ANSWER_3
Step 1: Recall the formula for the area of a triangle: $\text{Area} = \frac{1}{2} \times \text{base} \times \text{height}$.
Step 2: Substitute the known values into the equation: $48 = \frac{1}{2} \times 12 \times PS$.
Step 3: Simplify the right-hand side: $48 = 6 \times PS$.
Step 4: Solve for $PS$ by dividing both sides by $6$: $PS = \frac{48}{6} = 8\text{ cm}$.
A student who gets $16\text{ cm}$ likely multiplied by $2$ instead of dividing by $2$ when reversing the area formula.
## DIAGNOSTIC_QUESTION_4
How does the position of the orthocenter change when you transition from an acute-angled triangle to an obtuse-angled triangle?
## DIAGNOSTIC_ANSWER_4
In an acute-angled triangle, all three altitudes intersect inside the triangle, so the orthocenter is interior. In an obtuse-angled triangle, two altitudes fall outside the triangle and must be extended backwards to meet the third altitude, placing the orthocenter in the exterior of the triangle. A student who thinks the orthocenter is always inside fails to understand how extending lines for obtuse angles shifts the point of intersection outside the physical shape.
## DIAGNOSTIC_QUESTION_5
A student constructs an altitude from vertex $A$ in $\triangle ABC$ by drawing a line from $A$ to the midpoint of side $BC$, claiming it is the altitude because it splits the side neatly. Evaluate this construction and correct the error.
## DIAGNOSTIC_ANSWER_5
The student's construction is incorrect because a line drawn to the midpoint of the opposite side is a *median*, not an *altitude*. An altitude must form a $90^\circ$ angle with the base, whereas a median only connects a vertex to a midpoint (which only coincides with the altitude in isosceles and equilateral triangles for the base). A student approving this work confuses the definitions of median and altitude.
## DIAGNOSTIC_QUESTION_6
Design a scenario using a triangular garden plot in Mumbai with sides measuring $5\text{ m}$, $12\text{ m}$, and $13\text{ m}$ (a right-angled triangle) where knowing the exact location of the altitudes and their intersection point is necessary for installing a vertical sprinkler system. Describe where the sprinkler (orthocenter) must be placed.
## DIAGNOSTIC_ANSWER_6
The expected response must recognize that for a right-angled triangle ($5\text{ m}, 12\text{ m}, 13\text{ m}$ where $5^2 + 12^2 = 13^2$), the two shorter sides act as perpendicular altitudes to each other. Therefore, the intersection of the altitudes (the orthocenter) lies precisely at the vertex containing the right angle. A poor answer would place the sprinkler inside the middle of the field or outside without geometric justification.
## COMMON_MISCONCEPTION
Students often confuse altitudes with medians or angle bisectors, drawing a line from a vertex to the opposite side's midpoint instead of ensuring the line meets the base at a strict $90^\circ$ right angle. For example, in an obtuse triangle, students try to draw the altitude inside the triangle from the obtuse vertex rather than extending the base line outward to drop a perpendicular, resulting in an inclined, non-perpendicular line segment.
## ON_FAILURE
Guide the student back to the definition of perpendicular lines using a set-square. Say: "Let's check our angle first. Put your set-square's right-angle corner at the vertex and slide it along the base until it touches the opposite corner. If it doesn't make a square $90^\circ$ corner with the base line, it is not an altitude. Remember, height is always measured straight up and down, like a plumb line, never slanted."
## PREREQUISITE_NODE_IDS
c7_math_ch07_001, c7_math_ch07_005, c6_math_ch07_081
## PREREQUISITE_REASONS
c7_math_ch07_001: requires knowing vertices, sides, and opposite relationships in triangles.
c7_math_ch07_005: requires classifying triangles by angles to understand acute, right, and obtuse variations.
c6_math_ch07_081: requires foundational skills in constructing perpendicular lines and using geometric tools.
## FORWARD_NODE_IDS
c7_math_ch07_007, c7_math_ch07_008
## FORWARD_REASONS
c7_math_ch07_007: understanding angle relationships and internal structures prepares students for the angle sum property.
c7_math_ch07_008: exploring exterior regions of triangles through altitudes builds intuition for exterior angle properties.
## CROSS_SUBJECT_PREREQS
c6_math_ch08_088
## CROSS_SUBJECT_REASONS
c7_math_ch07_081: provides the compass and ruler techniques needed to drop perpendiculars accurately.
c6_math_ch08_088: uses the height (altitude) of a triangle to calculate its area in mensuration problems.
## CHAIN_DESCRIPTION
c7_math_ch07_005 -> c7_math_ch07_006 -> c7_math_ch07_007
## THIS_FORMULA
\text{Area} = \frac{1}{2} \times \text{base} \times \text{altitude}
## FORMULA_VARIABLES
\text{Area} = \text{total surface measure enclosed by the triangle}, \text{base} = \text{the side chosen as the foundation}, \text{altitude} = \text{the perpendicular height corresponding to that base}
## FORMULA_UNITS
\text{cm}^2 \text{ or } \text{m}^2
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c6_math_ch08_088 | connects triangle altitudes directly to area calculations in applied geometry
## PREREQ_CONCEPT
Perpendicularity and line segments from a point to a line.
## PREREQ_BEFORE
Students must be able to construct a 90-degree perpendicular line using a set-square or compass and identify opposite sides and vertices in any triangle.
## PREREQ_STUCK
Review c6_math_ch07_081 (Constructing Perpendicular Lines and Bisectors) to practice dropping perpendiculars correctly before attempting triangle altitudes.
## WORKED_EXAMPLE_1
PROBLEM: Construct an altitude from vertex $A$ to base $BC$ in an acute triangle $ABC$ where side $BC = 8\text{ cm}$, and calculate the height if the area of $\triangle ABC$ is $24\text{ cm}^2$.

STEPS:
- Step 1: Identify given values: base $BC = 8\text{ cm}$, total $\text{Area} = 24\text{ cm}^2$, and we need to find altitude $h$.
- Step 2: Write down the formula relating area, base, and altitude: $\text{Area} = \frac{1}{2} \times \text{base} \times h$.
- Step 3: Substitute the known values into the equation: $24 = \frac{1}{2} \times 8 \times h$.
- Step 4: Simplify and solve the algebraic equation: $24 = 4 \times h$, which gives $h = \frac{24}{4} = 6\text{ cm}$.
- Step 5: Verify by checking backward: $\frac{1}{2} \times 8\text{ cm} \times 6\text{ cm} = 24\text{ cm}^2$, which matches the given area.

REASONING: The formula connects the geometric definition of height (altitude) directly to area measurement. By treating the side $BC$ as the base, the perpendicular drop $h$ represents the shortest distance from $A$ to $BC$, validating our algebraic calculation.

ANSWER: $6\text{ cm}$
## WORKED_EXAMPLE_2
PROBLEM: In an obtuse triangle $XYZ$ where angle $Y$ is obtuse ($110^\circ$), side $XY = 10\text{ cm}$ and the altitude dropped from vertex $Z$ to the extended line of base $XY$ has a length of $5\text{ cm}$. Find the area of $\triangle XYZ$.

STEPS:
- Step 1: Identify given values: base $b = XY = 10\text{ cm}$ and external altitude $h = 5\text{ cm}$.
- Step 2: Recall that for an obtuse triangle, the altitude can fall outside on the extended base line, but the area formula remains identical: $\text{Area} = \frac{1}{2} \times \text{base} \times \text{altitude}$.
- Step 3: Substitute the values into the formula: $\text{Area} = \frac{1}{2} \times 10 \times 5$.
- Step 4: Perform multiplication and division: $\text{Area} = \frac{1}{2} \times 50 = 25$.
- Step 5: Attach correct units: $25\text{ cm}^2$.

REASONING: Even though the altitude lies outside the physical boundary of an obtuse triangle, the base-height formula is universally applicable because the perpendicular distance from the vertex to the line of the base remains constant.

ANSWER: $25\text{ cm}^2$
## WORKED_EXAMPLE_3
PROBLEM: A triangular park in Jaipur has sides $9\text{ m}, 12\text{ m}$, and $15\text{ m}$. A gardener needs to build a straight path from the corner opposite the $15\text{ m}$ side perpendicular to it. Find the exact length of this path (altitude).

STEPS:
- Step 1: Check if the triangle is right-angled using Pythagoras property (Class 7 extension): $9^2 + 12^2 = 81 + 144 = 225$, and $15^2 = 225$. Thus, it is a right-angled triangle with legs $9\text{ m}$ and $12\text{ m}$, and hypotenuse $15\text{ m}$.
- Step 2: Calculate the total area of the triangle using the two perpendicular legs as base and height: $\text{Area} = \frac{1}{2} \times 9 \times 12 = 54\text{ m}^2$.
- Step 3: Set up the area equation using the $15\text{ m}$ side as the new base and $h$ as the altitude from the right-angled vertex: $\text{Area} = \frac{1}{2} \times 15 \times h = 54$.
- Step 4: Solve for $h$ algebraically: $7.5 \times h = 54$, so $h = \frac{54}{7.5}$.
- Step 5: Convert to fraction or decimal: $h = \frac{54 \times 2}{15} = \frac{108}{15} = 7.2\text{ m}$.

REASONING: By calculating the area in two different ways (using the two legs, and then using the hypotenuse as the base), we can determine the exact length of the altitude on the longest side. This demonstrates the power of combining area properties with altitude definitions.

ANSWER: $7.2\text{ m}$
## COMPETENCY_QUESTION_1
QUESTION: Three students draw altitudes in three different triangles on the blackboard: Student A draws an altitude inside an equilateral triangle; Student B draws an altitude inside a right-angled triangle; Student C draws an altitude outside an obtuse-angled triangle. Student C claims their drawing is geometrically impossible because an altitude must always touch the inside of the triangle. Evaluate Student C's claim using the definition of an altitude.

COMPETENCY: Evaluating geometric claims and justifying definitions across triangle types

STEPS:
- Step 1: Recall the definition of an altitude: a perpendicular segment from a vertex to the line containing the opposite side.
- Step 2: Analyze Student C's triangle type: an obtuse triangle has one angle greater than $90^\circ$, causing its side-lines to diverge away from the opposite vertex.
- Step 3: Test where the perpendicular meets the line: for an obtuse vertex, the perpendicular drop misses the physical segment and lands on the extended line outside the triangle.
- Step 4: Formulate the evaluation: Conclude that Student C is incorrect because altitudes of obtuse triangles naturally fall outside the physical boundary while still meeting the extended line at $90^\circ$.

ANSWER: Student C is incorrect. An altitude is defined with respect to the *line* containing the opposite side, not just the finite line segment. In obtuse triangles, two altitudes naturally fall outside the physical boundary of the triangle.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: A triangular metal sheet in a workshop has vertices at coordinates or dimensions such that its base is $20\text{ cm}$ and its two corresponding interior altitudes are $8\text{ cm}$ and $10\text{ cm}$ for two different sides. Calculate the lengths of the two respective sides corresponding to these altitudes, and explain why the longer altitude corresponds to the shorter side.

COMPETENCY: Analyzing inverse proportionality between sides and altitudes in a fixed-area triangle

STEPS:
- Step 1: Recognize that the area of the triangle is constant regardless of which side is chosen as the base.
- Step 2: Assume one side is $b_1 = 20\text{ cm}$ and its altitude is $h_1 = 8\text{ cm}$. Calculate the area: $\text{Area} = \frac{1}{2} \times 20 \times 8 = 80\text{ cm}^2$.
- Step 3: Use the calculated area to find the second side $b_2$ corresponding to altitude $h_2 = 10\text{ cm}$: $\text{Area} = \frac{1}{2} \times b_2 \times 10 = 80$.
- Step 4: Solve for $b_2$: $5 \times b_2 = 80 \implies b_2 = 16\text{ cm}$.
- Step 5: Analyze the relationship: As the altitude increases ($8\text{ cm}$ to $10\text{ cm}$), the corresponding base decreases ($20\text{ cm}$ to $16\text{ cm}$) because their product must remain constant to maintain the same total area ($2\times \text{Area} = \text{base} \times \text{altitude}$).

ANSWER: The second side is $16\text{ cm}$. The relationship is inversely proportional: when the area is constant, a longer altitude requires a shorter base, and vice versa, because $\text{base} = \frac{2 \times \text{Area}}{\text{altitude}}$.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: An altitude of a triangle is a ______ line segment drawn from a vertex of the triangle to the line containing the opposite side, forming a 90-degree angle with that base.

## DIAGNOSTIC_ANSWER_7
perpendicular

**A wrong answer (writing 'longest') reveals the student substituted length for angle - the definition's blank is perpendicular, the right angle that makes an altitude an altitude.**

Perpendicular is the definition's soul - the right angle makes the altitude.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are standing on top of a sliding hill shaped like a ______ playground at your school in Delhi, and you want to measure the exact vertical height from the highest corner straight down to the ground boundary opposite to it.

## DIAGNOSTIC_ANSWER_8
triangular

**A wrong answer (writing 'school') reveals the student swapped the owner - the hill is a triangular playground at the school, and the blank asks for its shape.**

The hill is a triangular playground - the blank asks for its shape.

The hill is a triangular playground at the school in Delhi - the blank asks for its shape, not its owner.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: An altitude of a triangle is a perpendicular line segment drawn from a vertex of the triangle to the line containing the opposite side, forming a ______-degree angle with that base.

## DIAGNOSTIC_ANSWER_9
90

**A wrong answer (any other angle) reveals the student forgot the defining feature - the altitude meets the base line at exactly 90, the number the definition plants.**

90 is the angle every altitude strikes across its base line.

90 is the angle every altitude strikes across its base line - the right angle that defines the perpendicular drop.

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
Can construct all three altitudes for acute, right-angled, and obtuse triangles using a ruler and set-square or compass, and can correctly identify whether the orthocenter lies inside, on, or outside the triangle.

**A wrong answer (acute case only) reveals the student practised the friendly triangle - mastery spans acute, right and obtuse cases, including the orthocenter landing outside.**

The obtuse case matters: its orthocenter lands outside the triangle.

