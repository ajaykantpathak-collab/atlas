## ELI5
A carpenter asked to build a panel with sides 7, 5 and 4 centimetres starts with a compass, not a guess: draw the longest side as base, swing an arc of one neighbour's length from each endpoint, and pin the third vertex where the arcs cross. Same three lengths always yield the same triangle - two builders in different villages produce identical frames. But check the inequality first: if the two shorter sides together cannot outstretch the longest, the arcs never meet and the panel is a fib.

## DEFINITION
Constructing a triangle using the Side-Side-Side (SSS) criterion involves drawing a triangle when the exact lengths of all three of its sides are known, using a ruler and a pair of compasses. A unique triangle can be drawn if and only if the sum of the lengths of any two sides is strictly greater than the length of the third side (the Triangle Inequality Property).
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can construct any unique triangle given three valid side lengths using a ruler and compass, accurately measure angles, verify the triangle inequality property before drawing, and explain why a given set of side lengths cannot form a triangle.
## SCOPE_BOUNDARY
Covers the construction of triangles using compasses and a ruler when three side lengths are given (SSS criterion). It does NOT cover constructions involving angles (SAS, ASA) or right-angled triangles using hypotenuse and side (RHS), which belong to separate nodes.
## WALKTHROUGH
Imagine you are a carpenter in your village, and a client asks you to build a triangular wooden wall panel with exact side lengths of 7 cm, 5 cm, and 4 cm. How do you begin drawing this on a wooden board so that it fits perfectly without guessing? You cannot just sketch it randomly; you need a precise geometric method starting with the longest side as your base line segment. In Class 6, you learned how to construct simple line segments and basic angles using your ruler and compass. Now, we will combine those tools to swing arcs that intersect at the exact third vertex, unlocking the secret of the SSS (Side-Side-Side) construction rule.

**Takeaway:** SSS construction: longest side as base, two compass arcs from its endpoints, crossing marks the vertex. **In the exam:** verify the inequality before drawing; quote the two arc radii used; measure the angles afterwards to verify. **Check yourself:** construct the carpenter's panel on paper and check all three sides with a ruler. **Why students miss it:** they skip the inequality check and discover too late that their arcs never intersect. Quote the two arc radii in your working, and the construction reads like a recipe anyone can retrace.

## DIAGNOSTIC_QUESTION_1
What geometric tool is primarily used to measure and transfer an exact side length of a triangle from your ruler onto your construction paper when doing an SSS construction?
## DIAGNOSTIC_ANSWER_1
The correct answer is a pair of compasses. A wrong answer like "a protractor" reveals a confusion between measuring angles and measuring/transferring linear side lengths, while an answer like "a set square" shows a lack of familiarity with standard geometric construction tools.
## DIAGNOSTIC_QUESTION_2
If you are given three side lengths of 3 cm, 4 cm, and 8 cm, why is it impossible to construct a triangle using these lengths, even if you use a sharp pencil and precise compasses?
## DIAGNOSTIC_ANSWER_2
The correct answer is that it violates the Triangle Inequality Property, because the sum of the two shorter sides (3 cm + 4 cm = 7 cm) is less than the third side (8 cm), meaning the arcs drawn from the endpoints will never meet. A wrong answer like "the lines are too short" or "you need a protractor" shows a failure to understand that side lengths must satisfy the fundamental inequality condition before any construction can take place.
## DIAGNOSTIC_QUESTION_3
Construct a triangle $\triangle PQR$ where side $PQ = 6\text{ cm}$, side $QR = 5\text{ cm}$, and side $RP = 4\text{ cm}$. What is the radius of the compass arc drawn from point $P$ to locate vertex $R$?
## DIAGNOSTIC_ANSWER_3
The correct answer is 4 cm. Working steps: 1) Identify the side lengths: $PQ = 6\text{ cm}$ (base), $QR = 5\text{ cm}$, and $RP = 4\text{ cm}$. 2) Draw the base line segment $PQ$ of length 6 cm using a ruler. 3) To find vertex $R$, we need its distance from $P$ and $Q$. The distance from $P$ to $R$ is given as side $RP = 4\text{ cm}$. 4) Therefore, set the compass width to 4 cm using the ruler, place the metal pointer at $P$, and draw an arc above line $PQ$. A wrong answer like 5 cm or 6 cm shows that the student confused which compass radius belongs to which vertex pair ($RP$ vs $QR$).
## DIAGNOSTIC_QUESTION_4
Analyze the following statement: "If two different students construct a triangle with side lengths 5 cm, 7 cm, and 9 cm using the SSS method, their triangles may look different in size or shape depending on how they rotated their paper." Is this statement correct or incorrect, and why?
## DIAGNOSTIC_ANSWER_4
The statement is incorrect. According to the Side-Side-Side (SSS) congruence criterion, all triangles constructed with the exact same three side lengths are congruent, meaning they are identical in shape and size; any apparent difference is only due to rotation or reflection on the page, not a change in the triangle's actual geometry. A wrong answer agreeing with the statement reveals a misunderstanding of geometric uniqueness and congruence.
## DIAGNOSTIC_QUESTION_5
A student attempts to construct $\triangle ABC$ with $AB = 7\text{ cm}$, $BC = 4\text{ cm}$, and $AC = 2\text{ cm}$. The student draws base $AB = 7\text{ cm}$, opens the compass to 4 cm from point $B$, and opens the compass to 2 cm from point $A$, but the arcs fail to intersect. Evaluate why this failure occurred.
## DIAGNOSTIC_ANSWER_5
The failure occurred because the student did not check the triangle inequality before starting: $AC + BC = 2 + 4 = 6\text{ cm}$, which is less than $AB = 7\text{ cm}$. Because the sum of the two smaller sides is less than the longest side, the distance between the two arcs is too small to bridge the gap, making intersection impossible. A wrong answer blaming "a broken compass" or "not pressing hard enough" indicates a failure to connect algebraic side inequalities with physical geometric limitations.
## DIAGNOSTIC_QUESTION_6
Design a set of three integer side lengths that can form a triangle where one side is exactly 10 cm, and explain the exact compass steps you would take to construct it on your notebook.
## DIAGNOSTIC_ANSWER_6
An acceptable answer would choose two sides whose sum is strictly greater than 10 cm, such as 7 cm and 6 cm (since $7 + 6 = 13 > 10$). The construction steps: 1) Draw a baseline segment $AB = 10\text{ cm}$ using a ruler. 2) Open the compass to 7 cm, place the pointer at $A$, and draw an arc above the baseline. 3) Open the compass to 6 cm, place the pointer at $B$, and draw an intersecting arc to mark vertex $C$. 4) Join $AC$ and $BC$ with straight line segments. A poor answer would choose sides like 4 cm and 5 cm ($4+5=9 < 10$), which cannot form a triangle, showing a failure to apply the triangle inequality rule.
## COMMON_MISCONCEPTION
Students often confuse which compass radius corresponds to which vertex when swinging intersecting arcs for SSS construction. For instance, when constructing $\triangle XYZ$ with $XY = 7\text{ cm}$, $YZ = 5\text{ cm}$, and $XZ = 6\text{ cm}$, a student will draw baseline $XY = 7\text{ cm}$, but then mistakenly measure 5 cm from point $X$ instead of point $Y$, and 6 cm from point $Y$ instead of point $X$, resulting in an upside-down or completely incorrect triangle.
## ON_FAILURE
To fix this error, guide the student to label the vertices of their baseline first (e.g., let baseline be $XY$). Have them explicitly write down the mapping: "Radius from $X$ must equal side $XZ$ (6 cm)" and "Radius from $Y$ must equal side $YZ$ (5 cm)" before touching the compass to the paper. Make them trace the line segments with their finger from the vertex point to the compass measurement to reinforce the connection between letter names and arc radii.
## PREREQUISITE_NODE_IDS
c6_math_ch07_070, c6_math_ch07_073, c7_math_ch07_001
## PREREQUISITE_REASONS
c6_math_ch07_070: requires knowing how to draw and measure straight line segments using a ruler.
c6_math_ch07_073: requires understanding triangle classification and side properties.
c7_math_ch07_001: requires knowing triangle vertices, sides, and notation.
## FORWARD_NODE_IDS
c7_math_ch07_010, c7_math_ch07_002, c7_math_ch07_003
## FORWARD_REASONS
c7_math_ch07_010: builds directly upon construction skills to handle two sides and included angle (SAS).
c7_math_ch07_002: uses SSS construction principles specifically applied to equilateral triangles.
c7_math_ch07_003: extends general compass and ruler techniques to advanced triangle properties.
## CROSS_SUBJECT_PREREQS
c6_math_ch06_064, c6_math_ch08_085
## CROSS_SUBJECT_REASONS
c6_math_ch06_064: uses precise scale measurement techniques akin to the unitary method and scaling ratios.
c6_math_ch08_085: connects linear side length measurements of geometric figures to perimeter calculations.
## CHAIN_DESCRIPTION
c6_math_ch07_118 -> c7_math_ch07_009 -> c7_math_ch07_010
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
cm, mm
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT

## PREREQ_CONCEPT
The Triangle Inequality Property and the use of a ruler and compass to measure and draw line segments of exact lengths.
## PREREQ_BEFORE
Students must be able to accurately measure millimeter lengths with a ruler and swing arcs of exact radii using a compass.
## PREREQ_STUCK
Review c6_math_ch07_070 for precise ruler measurements and c6_math_ch07_113 for basic compass arc techniques.
## WORKED_EXAMPLE_1
PROBLEM: Construct triangle $\triangle ABC$ where side $AB = 7\text{ cm}$, side $BC = 5\text{ cm}$, and side $AC = 6\text{ cm}$. Show all construction steps clearly.
STEPS:
- Step 1: Identify given information and verify the triangle inequality. Sides are $AB = 7\text{ cm}$, $BC = 5\text{ cm}$, $AC = 6\text{ cm}$. Check: $5 + 6 = 11 > 7$, so construction is possible. Let $AB = 7\text{ cm}$ be the base.
- Step 2: Draw a baseline segment $AB$ of length 7 cm using a ruler and a sharp pencil, marking endpoints $A$ and $B$.
- Step 3: To find vertex $C$, set the compass width to $AC = 6\text{ cm}$ using the ruler. Place the metal pointer at vertex $A$ and draw an arc above the baseline segment $AB$.
- Step 4: Reset the compass width to $BC = 5\text{ cm}$ using the ruler. Place the metal pointer at vertex $B$ and draw a second arc that intersects the first arc. Label the point of intersection as vertex $C$.
- Step 5: Use a ruler to join vertex $C$ to vertex $A$ and vertex $C$ to vertex $B$, completing triangle $\triangle ABC$ with sides 7 cm, 5 cm, and 6 cm.
REASONING: By anchoring arcs of radii equal to the remaining two sides at endpoints $A$ and $B$, their point of intersection is equidistant from $A$ by 6 cm and from $B$ by 5 cm, thus forming the unique third vertex $C$ of the triangle.
ANSWER: Triangle $\triangle ABC$ successfully constructed with $AB = 7\text{ cm}$, $BC = 5\text{ cm}$, and $AC = 6\text{ cm}$.
## WORKED_EXAMPLE_2
PROBLEM: A local park designer wants to lay out a triangular flower bed shaped like $\triangle PQR$ where $PQ = 8\text{ cm}$ (on a scale drawing), $QR = 6\text{ cm}$, and $RP = 6\text{ cm}$. Construct this triangle and identify its specific type based on side lengths.
STEPS:
- Step 1: Check side lengths: $PQ = 8\text{ cm}$, $QR = 6\text{ cm}$, $RP = 6\text{ cm}$. Note that $6 + 6 = 12 > 8$, so the triangle is valid.
- Step 2: Draw baseline segment $PQ = 8\text{ cm}$ using a ruler, marking endpoints $P$ and $Q$.
- Step 3: Set the compass width to 6 cm (since $PR = 6\text{ cm}$). Place the pointer at $P$ and draw an arc above line $PQ$.
- Step 4: Keeping the compass width at 6 cm (since $QR = 6\text{ cm}$), place the pointer at $Q$ and draw a second arc intersecting the first arc. Label the intersection point as $R$.
- Step 5: Join point $R$ to point $P$ and point $R$ to point $Q$ with straight lines. Since $QR = RP = 6\text{ cm}$, classify the triangle as an isosceles triangle.
REASONING: Two sides having equal lengths (6 cm each) mean the compass radius used from both endpoints $P$ and $Q$ is identical, creating a symmetrical isosceles triangle over the baseline.
ANSWER: Isosceles triangle $\triangle PQR$ constructed with $PQ = 8\text{ cm}$, $QR = 6\text{ cm}$, and $RP = 6\text{ cm}$.
## WORKED_EXAMPLE_3
PROBLEM: Construct $\triangle XYZ$ where $XY = 9\text{ cm}$, $YZ = 7\text{ cm}$, and $XZ = 4\text{ cm}$. After construction, calculate the total perimeter of this triangle in centimeters and verify if it can be classified as acute, right, or obtuse.
STEPS:
- Step 1: Verify triangle inequality: $XZ + YZ = 4 + 7 = 11\text{ cm}$, which is greater than $XY = 9\text{ cm}$. The construction is valid.
- Step 2: Draw baseline segment $XY = 9\text{ cm}$ using a ruler.
- Step 3: Set compass to $XZ = 4\text{ cm}$, place pointer at $X$, and draw an arc above the baseline.
- Step 4: Set compass to $YZ = 7\text{ cm}$, place pointer at $Y$, and draw an intersecting arc to locate vertex $Z$. Join $XZ$ and $YZ$.
- Step 5: Calculate the perimeter by adding all three side lengths: $\text{Perimeter} = XY + YZ + XZ = 9\text{ cm} + 7\text{ cm} + 4\text{ cm} = 20\text{ cm}$.
- Step 6: Use angle properties or measurement: longest side is $XY = 9\text{ cm}$ ($9^2 = 81$), while sum of squares of other two sides is $7^2 + 4^2 = 49 + 16 = 65$. Since $81 > 65$, angle opposite to $XY$ (angle $Z$) is obtuse ($> 90^\circ$), making $\triangle XYZ$ an obtuse-angled triangle.
REASONING: Perimeter is the sum of all outer boundaries, while triangle type can be determined by checking side-angle relationships (Pythagorean inequality extension for obtuse triangles learned in higher contexts).
ANSWER: Constructed obtuse triangle $\triangle XYZ$ with a total perimeter of 20 cm.
## COMPETENCY_QUESTION_1
QUESTION: A student is asked to construct a triangle with side lengths 4 cm, 5 cm, and 10 cm on an examination sheet. The student begins drawing the 10 cm baseline, but no matter how they adjust their compass, the arcs will never meet. Explain mathematically why the student's construction is doomed to fail, and state the minimum integer length the third side must have so that a valid triangle can be constructed with 4 cm and 5 cm as the other two sides.
COMPETENCY: Mathematical justification and inequality application
STEPS:
- Step 1: Recall the Triangle Inequality Property which states that the sum of any two sides of a triangle must be strictly greater than the third side.
- Step 2: Apply the property to the given student problem: Test if $4 + 5 > 10$. Since $4 + 5 = 9$, and $9$ is NOT greater than $10$, the inequality fails.
- Step 3: Explain that arcs representing radii 4 cm and 5 cm from endpoints separated by 10 cm cannot reach each other because $9\text{ cm} < 10\text{ cm}$.
- Step 4: Determine the minimum integer length for the third side when given 4 cm and 5 cm. Let the third side be $x$. We need $4 + x > 5$, so $x > 1$. The smallest integer greater than 1 is 2 cm. (Also check $4 + 5 > x$, so $x < 9$, which holds for 2 cm).
ANSWER: The construction fails because $4 + 5 = 9$, which is less than the 10 cm baseline, meaning the two arcs are too short to intersect. The minimum integer length for the third side to form a valid triangle with 4 cm and 5 cm is 2 cm.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two iron rods of lengths 12 cm and 7 cm are welded at one end to form vertex $X$ of a triangle $\triangle XYZ$. You are given a flexible third rod of length $L$ to complete the triangle by connecting the free ends $Y$ and $Z$. What is the entire range of possible integer lengths for rod $L$ so that a proper non-flat triangle can be formed? If you choose $L = 10\text{ cm}$, describe the exact steps a blacksmith would take to layout and construct this triangle on a flat metal sheet.
COMPETENCY: Range determination and multi-step practical geometric construction
STEPS:
- Step 1: Identify the two given side lengths as $a = 12\text{ cm}$ and $b = 7\text{ cm}$, with third side $L$.
- Step 2: Apply the Triangle Inequality rules to find the range for $L$: The third side must be greater than the difference of the other two sides and less than their sum. That is, $|12 - 7| < L < 12 + 7$.
- Step 3: Compute the inequality bounds: $5 < L < 19$. Thus, $L$ can be any integer from 6 cm to 18 cm.
- Step 4: For $L = 10\text{ cm}$, outline the construction steps on the metal sheet: Draw a baseline segment $XY = 12\text{ cm}$ using a steel scribe and ruler.
- Step 5: Set a compass or divider to 7 cm, place pointer at $X$, and scribe an arc. Set divider to $L = 10\text{ cm}$, place pointer at $Y$, and scribe an intersecting arc at point $Z$.
- Step 6: Scribe straight lines connecting $XZ$ and $YZ$ to complete the triangular metal plate.
ANSWER: The range of possible integer lengths for rod $L$ is $5 < L < 19$ (i.e., from 6 cm to 18 cm). For $L = 10\text{ cm}$, the blacksmith draws a 12 cm baseline, scribes arcs of 7 cm and 10 cm from the endpoints, and joins the intersection point to complete the triangle.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: ______ a triangle using the Side-Side-Side (SSS) criterion involves drawing a triangle when the exact lengths of all three of its sides are known, using a ruler and a pair of compasses.

## DIAGNOSTIC_ANSWER_7
Constructing

**A wrong answer (writing 'Drawing') reveals the student genericised the method - the definition's own opener is Constructing a triangle using the Side-Side-Side criterion.**

Constructing is the definition's first word for the SSS method.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a carpenter in your village, and a client asks you to build a ______ wooden wall panel with exact side lengths of 7 cm, 5 cm, and 4 cm.

## DIAGNOSTIC_ANSWER_8
triangular

**A wrong answer (writing 'wooden') reveals the student half the phrase - the client orders a triangular wooden panel, and the blank holds the shape word.**

The client orders a triangular panel - the blank holds the shape word.

The client orders a triangular wooden wall panel - the blank holds the shape word before the material word.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can construct any unique triangle given three valid side lengths using a ruler and compass, accurately measure angles, verify the triangle inequality property before drawing, and explain why a given set of side lengths cannot form a triangle.

**A wrong answer (drawing only) reveals the student half the craft - mastery also includes measuring angles after construction and explaining why impossible triples fail.**

Verify the inequality, construct, measure, explain - the mastery's four duties.

