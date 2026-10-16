## ELI5
A Jaipur kitchen floor dressed in hexagons and squares is running a strict checkpoint at every corner: the angles meeting at each vertex must total 360 degrees, and in a semi-regular tiling the same mixture of polygons must greet you at every single vertex. Regular tilings use one loyal shape - triangles, squares or hexagons, whose corners divide a full turn evenly; the wide octagon fails alone but pairs with the square's right angle to close the sum. Same sum, same lineup, no gaps.

## DEFINITION
A regular tiling is a tessellation of a plane using a single type of regular polygon (such as equilateral triangles, squares, or regular hexagons), while a semi-regular tiling uses two or more different types of regular polygons such that the arrangement of polygons at every vertex is identical. Both types must cover the plane completely without any gaps or overlapping regions, and the sum of interior angles meeting at any single vertex must equal exactly $360^\circ$.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can identify whether a given polygon can form a regular tiling based on its interior angle, classify semi-regular tilings by their vertex configurations, and verify if a combination of regular polygons satisfies the $360^\circ$ vertex angle sum condition.
## SCOPE_BOUNDARY
Covers the classification and angle sum properties of regular and semi-regular tilings using regular polygons (triangles, squares, regular hexagons, octagons, etc.). It does not cover irregular tessellations, non-Euclidean tilings, or three-dimensional space filling (honeycombs).
## WALKTHROUGH
Imagine you are decorating the kitchen floor of your home in Jaipur using shiny ceramic tiles shaped like regular hexagons or squares. When you place them side by side, you notice that some shapes fit together perfectly without leaving any empty spaces or overlapping edges, while others leave awkward triangular gaps. To understand why certain shapes work and others do not, we look at the meeting point of corners, known as a vertex, where the sum of all interior angles must fit perfectly around a full circle measuring $360^\circ$. Building on your knowledge of regular polygons and their interior angles from geometry, we calculate if a polygon's interior angle divides $360^\circ$ evenly (for regular tilings) or if a specific combination of different regular polygons sums to $360^\circ$ at every vertex (for semi-regular tilings). The key rule for any vertex in a tiling is $\sum \text{Interior Angles} = 360^\circ$.

**Takeaway:** regular tilings employ one shape; semi-regular tilings employ a fixed mixture whose vertex lineup never changes. **In the exam:** check the vertex sum for 360 and check the arrangement repeats identically at every vertex before naming the tiling. **Check yourself:** verify the two-triangle two-hexagon vertex by adding 60 and 120 to a full turn. **Why students miss it:** students accept any 360 sum as semi-regular, but the identical-arrangement rule is the second gate. Squares and octagons close the sum beautifully and still fail as a regular tiling - the octagon cannot stand alone.

## DIAGNOSTIC_QUESTION_1
What is the measure of each interior angle of a regular octagon (8-sided polygon), and what is the sum of interior angles of a polygon with $n$ sides?
## DIAGNOSTIC_ANSWER_1
The sum of interior angles is given by $(n - 2) \times 180^\circ$, so for an octagon ($n = 8$), it is $(8 - 2) \times 180^\circ = 6 \times 180^\circ = 1080^\circ$. Each interior angle is $\frac{1080^\circ}{8} = 135^\circ$. A wrong answer often shows confusion between exterior and interior angles, or incorrect substitution in the polygon angle sum formula, indicating the student needs to review polygon properties from Class 6 geometry.
## DIAGNOSTIC_QUESTION_2
Why can a regular octagon alone not form a regular tiling of the plane, even though it is a regular polygon?
## DIAGNOSTIC_ANSWER_2
A regular octagon cannot form a regular tiling because each interior angle is $135^\circ$, and $360^\circ$ is not divisible by $135^\circ$ ($360 \div 135 = 2.66...$), meaning whole octagons cannot meet around a vertex to completely fill the $360^\circ$ space without gaps or overlaps. A wrong answer assumes that any regular polygon can tile a plane, missing the crucial vertex angle condition of summing to exactly $360^\circ$.
## DIAGNOSTIC_QUESTION_3
A semi-regular tiling is formed around each vertex using two equilateral triangles and two regular hexagons. Verify if this vertex configuration is valid by calculating the total sum of angles at the vertex.
## DIAGNOSTIC_ANSWER_3
The interior angle of an equilateral triangle is $60^\circ$ and of a regular hexagon is $120^\circ$. For two triangles and two hexagons, the sum is $(2 \times 60^\circ) + (2 \times 120^\circ) = 120^\circ + 240^\circ = 360^\circ$. Since the sum equals $360^\circ$, this vertex configuration is valid. A wrong answer usually stems from incorrect individual angle calculations or arithmetic errors in addition and multiplication.
## DIAGNOSTIC_QUESTION_4
Compare a regular tiling and a semi-regular tiling in terms of the types of polygons used and the vertex arrangement rules.
## DIAGNOSTIC_ANSWER_4
A regular tiling uses only one single type of regular polygon throughout the entire plane, whereas a semi-regular tiling uses two or more different types of regular polygons. However, both share the strict rule that the arrangement of polygons around every single vertex must be identical, and all vertex angle sums must equal $360^\circ$. A wrong answer treats semi-regular tilings as random mixtures of shapes, forgetting the requirement of a uniform vertex configuration.
## DIAGNOSTIC_QUESTION_5
A student claims they have created a semi-regular tiling using squares (interior angle $90^\circ$) and regular octagons (interior angle $135^\circ$) with a vertex configuration of one square and two octagons. Evaluate this claim mathematically.
## DIAGNOSTIC_ANSWER_5
The proposed configuration gives an angle sum of $(1 \times 90^\circ) + (2 \times 135^\circ) = 90^\circ + 270^\circ = 360^\circ$. While the angle sum equals $360^\circ$, this specific combination fails to form a valid semi-regular tiling because the geometric edge lengths and vertex arrangements cannot be extended uniformly across a plane without overlapping or leaving irregular gaps. A wrong answer evaluates only the angle sum while ignoring geometric compatibility.
## DIAGNOSTIC_QUESTION_6
Design a new vertex configuration for a semi-regular tiling using equilateral triangles ($60^\circ$) and squares ($90^\circ$) such that the sum of angles around the vertex is exactly $360^\circ$. State the number of each polygon used.
## DIAGNOSTIC_ANSWER_6
One valid combination is three equilateral triangles and two squares, because $(3 \times 60^\circ) + (2 \times 90^\circ) = 180^\circ + 180^\circ = 360^\circ$. A poor answer lists shapes whose angles do not add up to $360^\circ$ or uses non-regular polygons, showing a failure to apply the fundamental vertex angle constraint.
## COMMON_MISCONCEPTION
Students often assume that because a polygon is regular (like a pentagon or octagon), it can automatically tile a plane. They fail to check whether the interior angle is a strict divisor of $360^\circ$ or whether combinations of polygons sum to exactly $360^\circ$ at every vertex, leading them to falsely believe pentagons tile the plane regularly because they have equal sides and angles.
## ON_FAILURE
Remind the student to physically or mentally draw the meeting point of corners (the vertex). Guide them to calculate the interior angle using $\frac{(n-2) \times 180^\circ}{n}$ and then divide $360^\circ$ by that angle. Ask: "Does the angle fit into $360^\circ$ without leaving a remainder or a gap?" Step through the division together to show why $108^\circ$ (pentagon) leaves a $360 - 324 = 36^\circ$ gap.
## PREREQUISITE_NODE_IDS
c7_math_ch14_006, c6_math_ch07_075
## PREREQUISITE_REASONS
c7_math_ch14_006: requires understanding basic tiling (covering a plane without gaps or overlaps).
c6_math_ch07_075: requires knowledge of regular and irregular polygons and their interior angles.
## FORWARD_NODE_IDS
c7_math_ch14_008
## FORWARD_REASONS
c7_math_ch14_008: understanding regular and semi-regular tilings is essential for analyzing their lines of symmetry and rotational symmetry patterns.
## CROSS_SUBJECT_PREREQS
c7_math_ch14_006
## CROSS_SUBJECT_REASONS
c7_math_ch14_006: builds foundational spatial reasoning for covering areas without waste, connecting geometry with design and measurement.
## CHAIN_DESCRIPTION
c7_math_ch14_006 -> c7_math_ch14_007 -> c7_math_ch14_008
## THIS_FORMULA
\text{Vertex Angle Sum} = \sum_{i=1}^{k} \theta_i = 360^\circ
## FORMULA_VARIABLES
\theta_i = \text{interior angle of the } i\text{-th polygon meeting at a vertex, } k = \text{number of polygons meeting at that vertex}
## FORMULA_UNITS
degrees (^\circ)
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c7_math_ch14_006 | uses spatial geometry concepts to study plane coverings in architecture and art.
c6_math_ch07_075 | applies polygon angle properties to analyze geometric structures.
## PREREQ_CONCEPT
Interior angles of regular polygons and the $360^\circ$ full-turn angle around a point.
## PREREQ_BEFORE
Calculate interior angles of regular polygons and verify angle sums around a point.
## PREREQ_STUCK
Review c6_math_ch07_075 for polygon angle formulas and c7_math_ch14_006 for basic plane tessellations.
## WORKED_EXAMPLE_1
PROBLEM: A flooring contractor wants to check if regular hexagons (side length 30 cm) can form a regular tiling for a courtyard in Mumbai. Calculate the interior angle of a regular hexagon and verify if it forms a regular tiling.
STEPS:
- Step 1: Identify the number of sides ($n$) for a regular hexagon, which is $6$.
- Step 2: Use the interior angle formula for a regular polygon: $\text{Angle} = \frac{(n - 2) \times 180^\circ}{n}$.
- Step 3: Substitute $n = 6$ into the formula: $\text{Angle} = \frac{(6 - 2) \times 180^\circ}{6} = \frac{4 \times 180^\circ}{6} = \frac{720^\circ}{6} = 120^\circ$.
- Step 4: Check if the interior angle divides $360^\circ$ evenly: $360^\circ \div 120^\circ = 3$. Since 3 regular hexagons meet at each vertex with no remainder ($3 \times 120^\circ = 360^\circ$), it forms a valid regular tiling.
- Step 5: Verify units and state final conclusion: The interior angle is $120^\circ$ and regular hexagons successfully form a regular tiling.
REASONING: A regular tiling requires a single polygon shape whose interior angle divides $360^\circ$ completely so that multiple identical tiles fit around every vertex without gaps.
ANSWER: Interior angle = $120^\circ$; Valid regular tiling confirmed.
## WORKED_EXAMPLE_2
PROBLEM: A designer proposes a semi-regular tiling using regular octagons and squares. At each vertex, two octagons and one square meet. Verify if this configuration satisfies the vertex angle sum condition for a semi-regular tiling.
STEPS:
- Step 1: Determine the interior angle of a square ($n = 4$), which is $90^\circ$.
- Step 2: Determine the interior angle of a regular octagon ($n = 8$): $\text{Angle} = \frac{(8 - 2) \times 180^\circ}{8} = \frac{6 \times 180^\circ}{8} = \frac{1080^\circ}{8} = 135^\circ$.
- Step 3: Set up the vertex angle sum equation for two octagons and one square: $\text{Sum} = (2 \times 135^\circ) + (1 \times 90^\circ)$.
- Step 4: Compute the arithmetic sum: $270^\circ + 90^\circ = 360^\circ$.
- Step 5: Conclude whether the vertex condition holds: Since the sum equals exactly $360^\circ$, the angle requirement for a semi-regular tiling is satisfied at the vertex.
REASONING: Semi-regular tilings require combinations of regular polygons whose interior angles sum to exactly $360^\circ$ at every identical vertex.
ANSWER: Angle sum = $360^\circ$; Vertex configuration is valid.
## WORKED_EXAMPLE_3
PROBLEM: A school art club in Delhi is creating a geometric wall mural. They try to make a semi-regular tiling using equilateral triangles ($60^\circ$) and regular dodecagons (12-sided polygons, interior angle $150^\circ$). If they use one equilateral triangle and two regular dodecagons at each vertex, determine if this creates a valid vertex configuration and compute any angular discrepancy if it fails.
STEPS:
- Step 1: Identify the given interior angles: equilateral triangle = $60^\circ$, regular dodecagon ($n=12$) = $\frac{(12-2) \times 180^\circ}{12} = \frac{10 \times 180^\circ}{12} = 150^\circ$.
- Step 2: Set up the sum of angles for one triangle and two dodecagons at a vertex: $\text{Sum} = (1 \times 60^\circ) + (2 \times 150^\circ)$.
- Step 3: Compute the total angle: $60^\circ + 300^\circ = 360^\circ$.
- Step 4: Verify if the vertex configuration matches standard semi-regular tiling definitions and check if the polygons can physically edge-match without overlapping side lengths.
- Step 5: State final verification: The angle sum is $360^\circ$, confirming that this specific combination (triangle-dodecagon-dodecagon) forms a valid vertex configuration for a semi-regular tiling.
REASONING: Even when dealing with complex polygons like dodecagons, the fundamental mathematical test for vertex tiling is verifying that the sum of interior angles sharing that vertex equals $360^\circ$.
ANSWER: Vertex angle sum = $360^\circ$; Valid configuration.
## COMPETENCY_QUESTION_1
QUESTION: A carpenter is designing wooden tabletops with mosaic patterns. He wants to know if regular pentagons can be used to create a regular tiling. Show mathematical proof by calculating the interior angle and testing the vertex angle sum condition, explaining why it fails.
COMPETENCY: Mathematical justification and error analysis in geometric tessellations
STEPS:
- Step 1: Calculate the interior angle of a regular pentagon using the formula $\frac{(5 - 2) \times 180^\circ}{5}$.
- Step 2: Perform the arithmetic: $\frac{3 \times 180^\circ}{5} = \frac{540^\circ}{5} = 108^\circ$.
- Step 3: Test whether $360^\circ$ is divisible by $108^\circ$ by dividing: $360 \div 108 = 3.333...$ (not a whole number).
- Step 4: Analyze the remainder: Three pentagons meeting at a vertex give $3 \times 108^\circ = 324^\circ$, leaving a gap of $36^\circ$, while four pentagons give $432^\circ$ (an overlap).
ANSWER: Regular pentagons cannot form a regular tiling because their interior angle ($108^\circ$) does not divide $360^\circ$ evenly, resulting in either a $36^\circ$ gap or an overlap around a vertex.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: In an advanced tiling pattern for a community hall floor, architects use squares, regular hexagons, and equilateral triangles. At a particular junction vertex, there is one square ($90^\circ$), one regular hexagon ($120^\circ$), and two equilateral triangles ($60^\circ$ each). 
(a) Calculate the total angle sum at this junction vertex. 
(b) Explain whether this configuration can be part of a valid semi-regular tiling.
COMPETENCY: Multi-step geometric synthesis and evaluation of complex tiling patterns
STEPS:
- Step 1: List the interior angles of all participating polygons: square = $90^\circ$, regular hexagon = $120^\circ$, two equilateral triangles = $2 \times 60^\circ = 120^\circ$.
- Step 2: Calculate the sum of these angles around the vertex: $90^\circ + 120^\circ + 120^\circ = 330^\circ$.
- Step 3: Compare the calculated sum with the required full-turn angle of $360^\circ$: $330^\circ \neq 360^\circ$.
- Step 4: Formulate the conclusion based on the deficit: Since the sum is $330^\circ$, there is a missing $30^\circ$ gap, meaning this specific combination cannot form a valid vertex in a semi-regular tiling.
ANSWER: (a) The total angle sum is $330^\circ$. (b) This configuration cannot form a valid semi-regular tiling because the angle sum does not equal $360^\circ$, leaving a $30^\circ$ gap at the vertex.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A regular tiling is a ______ of a plane using a single type of regular polygon (such as equilateral triangles, squares, or regular hexagons), while a semi-regular tiling uses two or more different types of regular polygons such that the arrangement of polygons at every vertex is identical.

## DIAGNOSTIC_ANSWER_7
tessellation

**A wrong answer (writing 'tiling') reveals the student the bracket synonym - a regular tiling is a tessellation of the plane, the definition's own word.**

The definition's bracket gives it away: a regular tiling is a tessellation of the plane built from one regular polygon alone.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are decorating the kitchen floor of your home in Jaipur using shiny ceramic tiles shaped like regular ______ or squares.

## DIAGNOSTIC_ANSWER_8
hexagons

**A wrong answer (writing 'pentagons') reveals the student imported a shape that cannot tile - the Jaipur kitchen wears regular hexagons or squares.**

Regular hexagons or squares tile the Jaipur kitchen floor; a pentagon imported into the scene would leave triangular gaps at every third vertex.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you are ______ the kitchen floor of your home in Jaipur using shiny ceramic tiles shaped like regular hexagons or squares.

## DIAGNOSTIC_ANSWER_9
decorating

**A wrong answer (writing 'tiling') reveals the student swapped the gerund - you are decorating the kitchen floor, the walkthrough's own participle.**

You are decorating, and the vertex law decides which shapes may finish the floor - the walkthrough's own framing of the whole lesson.

