## ELI5
Compass and straightedge suffice to double a square. Draw the original, swing arcs from its corners to capture the diagonal's length, and lay that length down as the side of a fresh square. The new plot encloses exactly twice the land. No measurement of the mysterious root is required — the compass carries the diagonal's length mechanically, letting geometry dodge the arithmetic that has no neat decimal answer.

## DEFINITION
A square with double the area of a given square can be constructed by using the diagonal of the original square as the side length of the new square. If the original square has side length \(s\), its diagonal is \(s\sqrt{2}\), and the square built on this diagonal has area \((s\sqrt{2})^2 = 2s^2\), exactly twice the original area.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
The student can accurately construct a square with double the area of a given square using only a compass and straightedge, and can explain the geometric reasoning that the new square's area is exactly twice the original by relating the diagonal of the original square to the side of the new square.
## SCOPE_BOUNDARY
This node covers the specific construction of a square with exactly double the area of a given square using the diagonal method from the Baudhayana Sulba-sutra. It does not cover general scaling of areas, algebraic proofs of the Pythagorean theorem, or constructions for other area ratios (e.g., tripling a square).
## WALKTHROUGH
Imagine you are a temple architect in ancient India designing a fire altar. You have a square altar of side 4 metres, but the ritual requires a new square altar with exactly double the area. Using only a rope (compass) and a straightedge, how would you construct it? Begin by drawing the given square. Recall from Class 6 that the diagonal of a square splits it into two congruent right-angled isosceles triangles. Draw one diagonal. Now, using the diagonal as a side, construct a new square by drawing perpendicular lines at each endpoint and marking off the diagonal length. The key insight is that the area of this new square equals the sum of the areas of the four right triangles that make up the original square, hence exactly double. Verify by calculating: original area = 16 m², diagonal = \(4\sqrt{2}\) m, new area = \((4\sqrt{2})^2 = 32\) m².

Takeaway: to double a square with compass and straightedge — construct or copy the diagonal, then build a fresh square on that diagonal as its side; the new area is exactly twice, since a square on the diagonal equals the two half-square triangles summed. Exam format: expect the construction steps and the justification linking diagonal to doubled area; construction marks are awarded for accurate arcs. Verification beat: compare areas by counting the congruent half-triangles inside the new square. Why students miss it: they attempt to measure and multiply lengths — the construction's elegance is that the compass transfers the length exactly, no arithmetic needed.

## DIAGNOSTIC_QUESTION_1
What is the side length of the new square constructed to have double the area of a square of side 5 cm?
## DIAGNOSTIC_ANSWER_1
The side length of the new square is the diagonal of the original square, which is \(5\sqrt{2}\) cm. A wrong answer of 10 cm reveals the misconception that doubling the side doubles the area (which actually quadruples it). An answer of 7.07 cm (decimal approximation) without the radical form shows lack of understanding of the exact geometric relationship.
## DIAGNOSTIC_QUESTION_2
Explain why constructing a square on the diagonal of a given square results in a square with double the area, using the concept of triangle areas.
## DIAGNOSTIC_ANSWER_2
The diagonal divides the original square into two congruent right-angled isosceles triangles, each of area \(\frac{1}{2}s^2\). The new square built on the diagonal can be divided into four such congruent triangles (by drawing both its diagonals), giving total area \(4 \times \frac{1}{2}s^2 = 2s^2\). A wrong answer that only states the formula \(2s^2\) without the triangle decomposition shows procedural recall without geometric understanding. An answer claiming the new square is made of two original squares reveals confusion about the diagonal's length.
## DIAGNOSTIC_QUESTION_3
Construct a square with double the area of a square of side 3 cm. Show the steps of construction and calculate the area of the new square to verify.
## DIAGNOSTIC_ANSWER_3
Steps: 1) Draw square ABCD of side 3 cm. 2) Draw diagonal AC. 3) At A, construct a perpendicular to AC. 4) On this perpendicular, mark point E such that AE = AC. 5) At C, construct a perpendicular to AC on the same side. 6) Mark point F on it such that CF = AC. 7) Join EF. Square ACEF is the required square. AC = \(3\sqrt{2}\) cm. Area of ACEF = \((3\sqrt{2})^2 = 18\) cm². Original area = 9 cm². Verified double. A wrong answer with area 36 cm² indicates the student doubled the side instead of using the diagonal. An incorrect construction (e.g., not ensuring right angles at A and C) shows gap in construction skills.
## DIAGNOSTIC_QUESTION_4
Compare the method of doubling a square by constructing on its diagonal with the method of doubling a rectangle by extending one side. What is the fundamental geometric difference?
## DIAGNOSTIC_ANSWER_4
Doubling a square via the diagonal uses the diagonal as the new side, creating a square rotated 45° relative to the original, with area exactly twice due to the \(s\sqrt{2}\) relationship. Doubling a rectangle by extending one side keeps the same orientation and simply doubles one dimension, resulting in a rectangle of dimensions \(2l \times b\) or \(l \times 2b\). The square method relies on the Pythagorean relationship (diagonal² = 2 × side²), while the rectangle method relies on linear scaling. A wrong answer that says both methods produce similar shapes or both use the diagonal shows failure to distinguish between area scaling by linear extension versus by geometric transformation.
## DIAGNOSTIC_QUESTION_5
A student constructs a square on the diagonal of a 6 cm square but gets a new square of side 6 cm instead of \(6\sqrt{2}\) cm. Identify the error in their construction and explain how to correct it.
## DIAGNOSTIC_ANSWER_5
The student likely used the original side length (6 cm) as the radius for marking the new square's vertices instead of using the diagonal length. They must first measure the diagonal AC with the compass, then use that measurement to mark AE and CF. The error is using the wrong radius. A wrong diagnosis that blames the perpendicular construction misses the core issue of length transfer. The correction: after drawing diagonal AC, set compass to length AC, then draw arcs from A and C to locate E and F.
## DIAGNOSTIC_QUESTION_6
Design a real-world problem where a farmer needs to double the area of a square field using only a rope and pegs (no measuring tape). Describe the steps the farmer would follow on the ground.
## DIAGNOSTIC_ANSWER_6
Problem: A farmer has a square field of side 20 m. He wants to mark a new square field of double the area using only a long rope and pegs. Steps: 1) Mark the corners of the original square with pegs. 2) Stretch the rope along one diagonal and mark its length (by tying a knot or marking with cloth). 3) At one end of the diagonal, use the rope to create a right angle (using the 3-4-5 method or by swinging arcs of equal radius). 4) Along this perpendicular, mark the diagonal length using the marked rope. 5) Repeat at the other end. 6) Connect the new pegs to form the new square. A poor answer that suggests measuring 20√2 m with a tape or doubling the side to 40 m shows inability to translate the geometric construction into a practical, tool-constrained scenario.
## COMMON_MISCONCEPTION
Students often think that to double the area of a square, they should double the side length. They construct a square of side \(2s\) instead of side \(s\sqrt{2}\), resulting in an area of \(4s^2\) (four times the original). This error stems from confusing linear scaling with area scaling. For example, given a square of side 4 cm, they draw a square of side 8 cm, calculate area 64 cm², and claim it is double of 16 cm², not realizing 64 is actually four times 16.
## ON_FAILURE
If a student doubles the side, ask: "What is the area of the original square? What is the area of your new square? How many times larger is it?" Let them compute: original area = \(s^2\), new area = \((2s)^2 = 4s^2\). Then ask: "We want exactly 2 times, not 4 times. Which length, when squared, gives \(2s^2\)?" Guide them to \(\sqrt{2}s\). Then show that the diagonal of the original square is exactly \(\sqrt{2}s\) by Pythagoras (or by the Baudhayana theorem they just learned). Have them physically measure the diagonal with a compass and use that as the new side. Practice with 3 cm and 5 cm squares until they consistently use the diagonal.
## PREREQUISITE_NODE_IDS
c8_math_ch9_1, c6_math_ch07_074, c6_math_ch08_087, c6_math_ch11_113, c6_math_ch11_116, c7_math_ch07_007
## PREREQUISITE_REASONS
c8_math_ch9_1: Introduces the historical context and the problem of doubling a square from the Sulba-sutra, motivating this construction.
c6_math_ch07_074: Provides properties of squares (equal sides, right angles, diagonals bisect at 90°) essential for the construction steps.
c6_math_ch08_087: Gives the area formula for a square (\(side^2\)), needed to verify the doubling.
c6_math_ch11_113: Covers basic geometric construction skills (using compass and ruler) required to execute the steps.
c6_math_ch11_116: Teaches constructing perpendicular bisectors, which is used to erect perpendiculars at the diagonal's endpoints.
c7_math_ch07_007: Angle sum property of triangles supports understanding that the diagonal creates two 45-45-90 triangles.
## FORWARD_NODE_IDS
c8_math_ch9_3, c8_math_ch9_4, c8_math_ch9_5
## FORWARD_REASONS
c8_math_ch9_3: Halving a square is the inverse operation; understanding doubling provides the foundation for halving by the same diagonal method.
c8_math_ch9_4: The hypotenuse of an isosceles right triangle is exactly the diagonal of the square; this node generalizes the length relationship.
c8_math_ch9_5: The Baudhayana-Pythagoras theorem statement formalizes the relationship \(diagonal^2 = side^2 + side^2\) used implicitly here.
## CROSS_SUBJECT_PREREQS
c6_math_ch07_074, c6_math_ch08_087
## CROSS_SUBJECT_REASONS
c6_math_ch07_074: Properties of quadrilaterals (specifically squares) are geometric prerequisites used in art, architecture, and design for creating scaled layouts.
c6_math_ch08_087: Area calculation of squares is fundamental in land measurement, flooring, and agriculture for estimating material requirements.
## CHAIN_DESCRIPTION
c8_math_ch9_1 -> c8_math_ch9_2 -> c8_math_ch9_3
## THIS_FORMULA
If original square side = \(s\), new square side = \(s\sqrt{2}\), new area = \(2s^2\)
## FORMULA_VARIABLES
\(s\) = side length of the original square (in any linear unit)
## FORMULA_UNITS
Linear units for side (cm, m), square units for area (cm², m²)
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c6_math_ch07_074 | Understanding square properties (equal sides, right angles, diagonal bisection) is essential for accurate geometric construction in drafting and architecture.
c6_math_ch08_087 | Area formulas for squares are directly applied in land surveying, farming (field division), and construction (flooring, tiling) to estimate costs and materials.
## PREREQ_CONCEPT
The diagonal of a square relates to its side by the factor \(\sqrt{2}\), and the square on the diagonal has area twice the original square.
## PREREQ_BEFORE
Student must be able to construct a perpendicular line at a point on a line segment using compass and straightedge, and calculate the area of a square given its side.
## PREREQ_STUCK
Review constructing perpendiculars (Class 6 Construction c6_math_ch11_116) and area of square formula (Class 6 Mensuration c6_math_ch08_087).
## WORKED_EXAMPLE_1
PROBLEM: A square courtyard has side 7 metres. Construct a square courtyard with double the area using only a compass and straightedge. Find the side length and area of the new courtyard.
STEPS:
- Step 1: Draw the given square ABCD with side 7 m. (Use compass to mark 7 m on a line, construct perpendiculars, complete square.)
- Step 2: Draw diagonal AC. By Pythagoras (or Baudhayana theorem), AC = \(\sqrt{7^2 + 7^2} = \sqrt{98} = 7\sqrt{2}\) m.
- Step 3: At point A, construct a line perpendicular to AC. (Use compass: draw arc centered at A cutting AC at two points, then from those points draw intersecting arcs above AC, join A to intersection.)
- Step 4: With compass set to length AC (\(7\sqrt{2}\) m), place needle at A and mark point E on the perpendicular such that AE = AC.
- Step 5: Similarly at C, construct perpendicular to AC on the same side, and mark point F such that CF = AC.
- Step 6: Join E and F. Square ACEF is the required square.
- Step 7: Verify area: Side of new square = \(7\sqrt{2}\) m. Area = \((7\sqrt{2})^2 = 49 \times 2 = 98\) m². Original area = \(7^2 = 49\) m². 98 is double 49.
REASONING: The construction uses the diagonal as the new side because the diagonal squared equals the sum of the squares of the two sides (Baudhayana theorem). Since both sides are equal, diagonal² = 2 × side². Thus a square on the diagonal has area exactly twice the original square. The perpendicular construction ensures the new shape is a square (all angles 90°).
ANSWER: New square side = \(7\sqrt{2}\) m (≈ 9.9 m), area = 98 m².
## WORKED_EXAMPLE_2
PROBLEM: A teacher draws a square of area 25 cm² on the board. She asks students to construct a square of double the area. One student constructs a square of side 10 cm. Another constructs a square on the diagonal of the original. Which student is correct? Show the verification for both.
STEPS:
- Step 1: Find side of original square: Area = 25 cm² ⇒ side = \(\sqrt{25} = 5\) cm.
- Step 2: Analyze Student 1's construction: Side = 10 cm (double the original side). Area = \(10^2 = 100\) cm². Compare to original 25 cm²: 100 ÷ 25 = 4. This is four times, not double.
- Step 3: Analyze Student 2's construction: Diagonal of original = \(\sqrt{5^2 + 5^2} = \sqrt{50} = 5\sqrt{2}\) cm. New square side = \(5\sqrt{2}\) cm. Area = \((5\sqrt{2})^2 = 25 \times 2 = 50\) cm². Compare to original: 50 ÷ 25 = 2. This is exactly double.
- Step 4: Conclude Student 2 is correct. The error of Student 1 is confusing linear doubling with area doubling.
- Step 5: Generalize: For any square of side \(s\), doubling the side gives area \(4s^2\); using the diagonal gives area \(2s^2\).
REASONING: Area scales with the square of the linear scale factor. Doubling the side multiplies area by \(2^2 = 4\). The diagonal introduces the factor \(\sqrt{2}\), whose square is 2, achieving the desired doubling. This example highlights the importance of the square-root relationship in area scaling.
ANSWER: Student 2 is correct. New square area = 50 cm².
## WORKED_EXAMPLE_3
PROBLEM: A square park has a diagonal path of length \(10\sqrt{2}\) metres. The municipal corporation wants to build a new square park with double the area of the original. What should be the side length of the new park? If fencing costs ₹150 per metre, find the cost of fencing the new park.
STEPS:
- Step 1: Given diagonal of original park = \(10\sqrt{2}\) m. For a square, diagonal = \(s\sqrt{2}\). So \(s\sqrt{2} = 10\sqrt{2}\) ⇒ \(s = 10\) m. Original side = 10 m.
- Step 2: Original area = \(10^2 = 100\) m². Target new area = 200 m².
- Step 3: The new square is constructed on the diagonal of the original. So side of new park = diagonal of original = \(10\sqrt{2}\) m.
- Step 4: Perimeter of new park = \(4 \times 10\sqrt{2} = 40\sqrt{2}\) m. Approximate \(\sqrt{2} \approx 1.414\). Perimeter ≈ \(40 \times 1.414 = 56.56\) m.
- Step 5: Cost of fencing = Perimeter × Rate = \(56.56 \times 150 = ₹8484\). (Or exact: \(40\sqrt{2} \times 150 = 6000\sqrt{2}\) ≈ ₹8485.28)
- Step 6: Verify new area: \((10\sqrt{2})^2 = 200\) m², which is double 100 m². Correct.
REASONING: This problem works backwards from the diagonal to the original side, then forward to the new square's side (which is the same diagonal). It combines geometric construction concept with mensuration (perimeter) and real-world cost calculation. The key is recognizing that the new square's side is exactly the given diagonal.
ANSWER: Side of new park = \(10\sqrt{2}\) m (≈ 14.14 m). Fencing cost ≈ ₹8485.
## COMPETENCY_QUESTION_1
QUESTION: A square sheet of paper has side 12 cm. You want to create a square of double the area by folding only (no cutting, no measuring tools). Describe a folding sequence that achieves this. Explain why your folding method works geometrically.
COMPETENCY: Translating real-world situations to mathematical expressions (and geometric reasoning)
STEPS:
- Step 1: Understand that folding the square along its diagonal creates a crease of length \(12\sqrt{2}\) cm.
- Step 2: Fold the square so that one corner touches the opposite corner, creating the diagonal crease. Unfold.
- Step 3: Now fold the paper such that the two sides adjacent to one end of the diagonal align with the diagonal crease, creating a 45° angle fold. This effectively constructs a perpendicular to the diagonal at that endpoint using paper folding axioms.
- Step 4: Repeat at the other end of the diagonal to get the other perpendicular.
- Step 5: The intersection of these folds with the diagonal's endpoints defines the new square's vertices. The folded layers will form the new square of side equal to the diagonal.
- Step 6: Reasoning: The diagonal becomes the side of the new square. Since diagonal = \(s\sqrt{2}\), area = \(2s^2\). Paper folding mimics compass-straightedge construction: folding a point onto a line creates a perpendicular bisector, etc.
ANSWER: Fold along the diagonal, then fold perpendiculars at the endpoints of the diagonal using the paper's edges as guides. The resulting square has side \(12\sqrt{2}\) cm and area 288 cm² (double 144 cm²).
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: An architect designs a square room of area 50 m². The client wants an adjacent square room with exactly double the area, sharing the diagonal of the first room as a common wall. What is the side length of the second room? If tiles of size 30 cm × 30 cm are used to floor both rooms, how many tiles are needed in total? (Assume no wastage.)
COMPETENCY: Applying geometric concepts to multi-step real-world problems with unit conversion
STEPS:
- Step 1: First room area = 50 m² ⇒ side = \(\sqrt{50} = 5\sqrt{2}\) m.
- Step 2: Diagonal of first room = side × \(\sqrt{2}\) = \(5\sqrt{2} \times \sqrt{2} = 5 \times 2 = 10\) m.
- Step 3: Second room is constructed on this diagonal, so its side = 10 m. Area = \(10^2 = 100\) m² (double 50 m², verified).
- Step 4: Total area to tile = 50 + 100 = 150 m².
- Step 5: Tile area = 0.3 m × 0.3 m = 0.09 m².
- Step 6: Number of tiles = Total area ÷ Tile area = \(150 ÷ 0.09 = 15000 ÷ 9 = 1666.\overline{6}\). Since tiles are whole, need 1667 tiles (round up).
- Step 7: Check: 1667 × 0.09 = 150.03 m², covers 150 m².
REASONING: This problem connects the doubling construction (diagonal as side) with area calculation, unit conversion (cm to m), and division for quantity estimation. The shared diagonal is the geometric link between the two rooms.
ANSWER: Side of second room = 10 m. Total tiles needed = 1667.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: A square with double the area of a given square can be ______ by using the diagonal of the original square as the side length of the new square.

## DIAGNOSTIC_ANSWER_7
constructed

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a temple ______ in ancient India designing a fire altar.

## DIAGNOSTIC_ANSWER_8
architect

## DIAGNOSTIC_QUESTION_9
Fill in the blank: You have a square altar of side ______ metres, but the ritual requires a new square altar with exactly double the area.

## DIAGNOSTIC_ANSWER_9
4

## DIAGNOSTIC_QUESTION_10
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_10
The student can accurately construct a square with double the area of a given square using only a compass and straightedge, and can explain the geometric reasoning that the new square's area is exactly twice the original by relating the diagonal of the original square to the side of the new square.
