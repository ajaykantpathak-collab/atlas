## ELI5
Fold a square along its diagonal and each half is a right triangle with two equal legs — an isosceles right triangle. Its hypotenuse is the diagonal, and geometry fixes it precisely: the square on the hypotenuse must hold the area of the two equal leg-squares combined, which is double one of them. So the diagonal always measures the side times that special factor, the square root of two — the number that lives in every square's fold line.

## DEFINITION
In an isosceles right triangle, the two legs (sides forming the right angle) are equal in length. If each leg has length \(a\), the hypotenuse \(h\) is given by \(h = a\sqrt{2}\). This relationship arises because the square on the hypotenuse has an area equal to the sum of the areas of the squares on the two equal legs (\(a^2 + a^2 = 2a^2\)), so the side of that square (the hypotenuse) is \(\sqrt{2a^2} = a\sqrt{2}\).
## COGNITIVE_LEVEL
understand
## MASTERY_CRITERIA
The student can derive the hypotenuse length of an isosceles right triangle given the leg length using the relationship \(h = a\sqrt{2}\), explain why the factor \(\sqrt{2}\) appears by comparing areas of squares on the sides, and apply this to solve problems involving squares cut along their diagonals.
## SCOPE_BOUNDARY
This node covers the specific case of the isosceles right triangle (45°-45°-90° triangle) and the exact relationship \(h = a\sqrt{2}\). It does NOT cover the general Baudhayana-Pythagoras theorem for arbitrary right triangles (covered in c8_math_ch9_5), nor does it require students to compute decimal approximations of \(\sqrt{2}\) beyond recognizing it as an irrational number approximately equal to 1.414.
## WALKTHROUGH
Imagine you have a square piece of paper with side length 10 cm. If you fold it along the diagonal, you get two identical triangles. What is the length of the folded edge (the diagonal)? This diagonal is the hypotenuse of an isosceles right triangle with legs 10 cm. Start by recalling from c8_math_ch9_1 and c8_math_ch9_2 that doubling a square of side \(a\) gives a square of side \(a\sqrt{2}\). Draw the square on the hypotenuse and notice its area is twice the area of the square on the leg. Since the area of the square on the leg is \(a^2\), the area on the hypotenuse is \(2a^2\), so its side must be \(\sqrt{2a^2} = a\sqrt{2}\). The key insight is that the diagonal of a square (or hypotenuse of an isosceles right triangle) is exactly \(\sqrt{2}\) times the side.

Takeaway: in an isosceles right triangle with equal legs of a given length, the hypotenuse is the leg times the square root of two — the square on the hypotenuse covers the two equal leg-squares, doubling the area. Exam format: expect 'find the hypotenuse' for equal legs, 'explain where the root-of-two factor comes from' via the area comparison, and square-diagonal applications. Verification beat: the hypotenuse must exceed each leg yet fall short of their sum. Why students miss it: they add the legs instead of invoking the squares — the legs' equality is what makes the doubled area, and the diagonal of any square is the same relationship in disguise.

## DIAGNOSTIC_QUESTION_1
What is the exact length of the hypotenuse of an isosceles right triangle whose legs are each 7 cm? Write your answer using the square root symbol.
## DIAGNOSTIC_ANSWER_1
The correct answer is \(7\sqrt{2}\) cm. A wrong answer like 14 cm reveals the student added the legs instead of applying the area relationship. An answer of \(7^2\) or 49 cm shows confusion between the side length and the area of the square on the leg. An answer of \(\sqrt{98}\) cm is mathematically equivalent but not simplified, indicating the student knows the Pythagorean calculation but hasn't recognized the \(a\sqrt{2}\) pattern.
## DIAGNOSTIC_QUESTION_2
Rahul says: "In an isosceles right triangle, the hypotenuse is twice the length of a leg because there are two equal legs." Explain why Rahul's reasoning is incorrect using the concept of areas of squares.
## DIAGNOSTIC_ANSWER_2
Rahul is incorrectly adding the side lengths (a + a = 2a) instead of adding the areas of the squares on the legs (\(a^2 + a^2 = 2a^2\)). The Baudhayana-Pythagoras theorem relates areas of squares, not side lengths directly. The side of a square with area \(2a^2\) is \(\sqrt{2a^2} = a\sqrt{2}\), not \(2a\). A student who agrees with Rahul is treating the theorem as a linear sum of sides rather than a quadratic sum of areas.
## DIAGNOSTIC_QUESTION_3
A square playground has a side length of 20 m. Children run along the diagonal from one corner to the opposite corner. What is the exact distance they run? If they run this diagonal 3 times, what is the total exact distance? Express both answers in terms of \(\sqrt{2}\).
## DIAGNOSTIC_ANSWER_3
Step 1: The diagonal of a square is the hypotenuse of an isosceles right triangle with leg 20 m. Step 2: Using \(h = a\sqrt{2}\), one diagonal = \(20\sqrt{2}\) m. Step 3: Three diagonals = \(3 \times 20\sqrt{2} = 60\sqrt{2}\) m. A wrong answer of 40 m for one diagonal shows the student used \(2a\). An answer of \(20\sqrt{2}\) m for the total distance shows they forgot to multiply by 3. An answer of \(28.28\) m (approx) indicates they used a decimal approximation instead of the exact form required.
## DIAGNOSTIC_QUESTION_4
Two isosceles right triangles have legs of lengths 5 cm and 12 cm respectively. Compare the ratios of their hypotenuses to their legs. What do you notice? What does this tell you about the constant of proportionality in similar isosceles right triangles?
## DIAGNOSTIC_ANSWER_4
For the first triangle: hypotenuse = \(5\sqrt{2}\) cm, ratio = \(\frac{5\sqrt{2}}{5} = \sqrt{2}\). For the second: hypotenuse = \(12\sqrt{2}\) cm, ratio = \(\frac{12\sqrt{2}}{12} = \sqrt{2}\). The ratio is exactly \(\sqrt{2}\) in both cases. This shows that for all isosceles right triangles (which are all similar), the hypotenuse is always \(\sqrt{2}\) times the leg. A student who computes different ratios (e.g., by approximating \(\sqrt{2}\) as 1.4 and getting 1.4 vs 1.41) misses the exact invariant relationship and the concept of similarity.
## DIAGNOSTIC_QUESTION_5
A student solves this problem: "The hypotenuse of an isosceles right triangle is \(10\sqrt{2}\) cm. Find the leg length." Their working: \(h = a\sqrt{2} \Rightarrow 10\sqrt{2} = a\sqrt{2} \Rightarrow a = 10\) cm. Is this correct? If yes, explain why the \(\sqrt{2}\) cancels. If no, find the error.
## DIAGNOSTIC_ANSWER_5
Yes, the solution is correct. The equation \(10\sqrt{2} = a\sqrt{2}\) simplifies by dividing both sides by \(\sqrt{2}\) (since \(\sqrt{2} \neq 0\)), giving \(a = 10\). The \(\sqrt{2}\) cancels because it is a common non-zero factor. A student who says it's incorrect might think you cannot "cancel" square roots like variables, revealing a misunderstanding that \(\sqrt{2}\) is just a number. A student who writes \(a = 10\sqrt{2}\) has multiplied instead of divided.
## DIAGNOSTIC_QUESTION_6
Create a real-life problem (in an Indian context) that requires finding the leg length of an isosceles right triangle when the hypotenuse is given. The problem must involve a square object or area. Write the problem and solve it completely.
## DIAGNOSTIC_ANSWER_6
Example problem: "A square rangoli design has a diagonal of length \(30\sqrt{2}\) cm. What is the side length of the square? If you want to put a lace border around the square, how many cm of lace do you need?" Solution: Diagonal = side \(\times \sqrt{2}\). So side \(\times \sqrt{2} = 30\sqrt{2} \Rightarrow\) side = 30 cm. Perimeter = \(4 \times 30 = 120\) cm of lace. A good answer shows the inverse relationship and connects to perimeter. A poor answer might only find the side and forget the lace, or set up the equation incorrectly as side = \(30\sqrt{2} \times \sqrt{2} = 60\) cm.
## COMMON_MISCONCEPTION
Students often confuse the linear scale factor with the area scale factor. They see "two equal legs" and think the hypotenuse is the sum of the legs (2a) because they are adding lengths linearly. Concretely, given legs of 5 cm, they write hypotenuse = 5 + 5 = 10 cm. They fail to recognize that the theorem operates on squares of lengths: the square on the hypotenuse has area \(5^2 + 5^2 = 50\) cm², so the hypotenuse is \(\sqrt{50} = 5\sqrt{2} \approx 7.07\) cm, not 10 cm. This error persists even after learning the general theorem because they don't internalize the "square on the side" concept.
## ON_FAILURE
If a student adds the legs, guide them through a concrete area comparison: 1. Draw a 5 cm leg and construct a square on it (area 25 cm²). 2. Draw the second equal leg and its square (another 25 cm²). 3. Combine the two squares to form a larger square of area 50 cm². 4. Ask: "What is the side length of this combined square?" 5. Show that the side is \(\sqrt{50} = 5\sqrt{2}\) by factoring: \(\sqrt{25 \times 2} = 5\sqrt{2}\). 6. Emphasize: "We add areas, not lengths. The hypotenuse is the side of the square whose area equals the sum of the areas of the squares on the legs."
## PREREQUISITE_NODE_IDS
c7_math_ch07_004, c7_math_ch07_005, c7_math_ch09_003, c8_math_ch9_1, c8_math_ch9_2, c8_math_ch9_3
## PREREQUISITE_REASONS
c7_math_ch07_004: Student must know the definition and properties of an isosceles triangle (two equal sides) to identify the equal legs.
c7_math_ch07_005: Student must recognize a right triangle (90° angle) to know which side is the hypotenuse.
c7_math_ch09_003: Student must know that in an isosceles triangle, angles opposite equal sides are equal (so the other two angles are 45° each), reinforcing the triangle type.
c8_math_ch9_1: The activity of doubling a square geometrically establishes that the diagonal of a square (hypotenuse) relates to the side by \(\sqrt{2}\).
c8_math_ch9_2: Constructing a square of double area directly leads to the side length \(a\sqrt{2}\), which is the hypotenuse.
c8_math_ch9_3: Halving a square shows the reverse relationship, reinforcing that the diagonal splits the square into two isosceles right triangles.
## FORWARD_NODE_IDS
c8_math_ch9_5, c8_math_ch9_6, c8_math_ch9_8, c8_math_ch9_9
## FORWARD_REASONS
c8_math_ch9_5: The specific case \(h = a\sqrt{2}\) motivates and leads into the general Baudhayana-Pythagoras theorem statement for all right triangles.
c8_math_ch9_6: The visual proof using area of squares on the sides of any right triangle builds directly on the area reasoning used here for the isosceles case.
c8_math_ch9_8: Finding unknown sides in right triangles uses the isosceles right triangle as a building block (e.g., splitting a square or equilateral triangle).
c8_math_ch9_9: Real-life problems (ladders, diagonals of rooms, TV screens) often involve squares or isosceles right triangles as sub-problems.
## CROSS_SUBJECT_PREREQS
c6_math_ch07_073, c6_math_ch08_087, c7_math_ch14_006
## CROSS_SUBJECT_REASONS
c6_math_ch07_073: Classification of triangles (isosceles, right) provides the geometric vocabulary and shape recognition needed.
c6_math_ch08_087: Area of squares (\(side^2\)) is the foundational measurement concept used in the "squares on the sides" reasoning.
c7_math_ch14_006: Tiling patterns with squares and isosceles right triangles (half-squares) give a visual/spatial intuition for the \(\sqrt{2}\) relationship in floor designs and rangoli.
## CHAIN_DESCRIPTION
c8_math_ch9_1 -> c8_math_ch9_4 -> c8_math_ch9_5: Geometric construction of doubling a square leads to the hypotenuse formula for isosceles right triangles, which generalizes to the full Baudhayana-Pythagoras theorem.
## THIS_FORMULA
\(h = a\sqrt{2}\) where \(h\) is the hypotenuse and \(a\) is the length of each equal leg.
## FORMULA_VARIABLES
\(h\) = length of hypotenuse (the side opposite the right angle), \(a\) = length of each leg (the two equal sides forming the right angle), \(\sqrt{2}\) = the positive square root of 2 (approximately 1.414), an irrational number.
## FORMULA_UNITS
Same linear units as the leg (e.g., cm, m, km). If leg is in cm, hypotenuse is in cm.
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c8_physics_ch8_3 | In physics, the resultant of two equal perpendicular vectors (forces/velocities) has magnitude \(F\sqrt{2}\), identical to the hypotenuse of an isosceles right triangle.
c8_math_ch11_2 | In mensuration, the diagonal of a square (side a) is \(a\sqrt{2}\), used to find area from diagonal or vice versa (\(Area = \frac{diagonal^2}{2}\)).
## PREREQ_CONCEPT
Understanding that the Baudhayana-Pythagoras theorem relates areas of squares constructed on the sides of a right triangle, not the side lengths directly.
## PREREQ_BEFORE
The student must be able to identify the legs and hypotenuse in a right triangle, know that an isosceles right triangle has two equal legs and angles 45°-45°-90°, and compute the area of a square given its side.
## PREREQ_STUCK
Revisit the geometric construction of "doubling a square" (c8_math_ch9_1) by folding or drawing to see that the diagonal of the original square becomes the side of the new double-area square, and that diagonal is the hypotenuse of the isosceles right triangle.
## WORKED_EXAMPLE_1
PROBLEM: A square sheet of aluminium foil has a side length of 15 cm. It is cut along its diagonal to make two identical triangular pieces. What is the length of the longest side of each triangular piece? Give the exact answer and also an approximate decimal value (using \(\sqrt{2} \approx 1.414\)).

STEPS:
- Step 1: Identify the triangle formed. Cutting a square along its diagonal produces two isosceles right triangles. The legs of each triangle are the sides of the square, so leg \(a = 15\) cm. The longest side is the hypotenuse \(h\), which is the diagonal of the square.
- Step 2: Recall the relationship for an isosceles right triangle: hypotenuse = leg \(\times \sqrt{2}\), i.e., \(h = a\sqrt{2}\).
- Step 3: Substitute the given leg length: \(h = 15 \times \sqrt{2} = 15\sqrt{2}\) cm. This is the exact answer.
- Step 4: Compute the approximate decimal value using \(\sqrt{2} \approx 1.414\): \(h \approx 15 \times 1.414 = 21.21\) cm.
- Step 5: Verify by checking area of squares: Square on leg = \(15^2 = 225\) cm². Two such squares = 450 cm². Square on hypotenuse should have area 450 cm², so side = \(\sqrt{450} = \sqrt{225 \times 2} = 15\sqrt{2}\) cm. Consistent.

REASONING: The diagonal of a square splits it into two congruent isosceles right triangles. The relationship \(h = a\sqrt{2}\) comes directly from the area addition of the two squares on the legs equaling the square on the hypotenuse. Using the exact form \(15\sqrt{2}\) preserves precision; the decimal approximation is for practical measurement.

ANSWER: Exact: \(15\sqrt{2}\) cm. Approximate: 21.21 cm.
## WORKED_EXAMPLE_2
PROBLEM: The diagonal of a square courtyard is measured to be \(24\sqrt{2}\) metres. A gardener wants to plant a hedge along the entire perimeter of the courtyard. What length of hedge is needed? (Give exact answer in metres.)

STEPS:
- Step 1: Recognize that the diagonal of a square is the hypotenuse of an isosceles right triangle whose legs are the sides of the square. Let the side of the square be \(a\) metres. Given hypotenuse \(h = 24\sqrt{2}\) m.
- Step 2: Use the formula \(h = a\sqrt{2}\). Substitute the given hypotenuse: \(24\sqrt{2} = a\sqrt{2}\).
- Step 3: Solve for \(a\) by dividing both sides by \(\sqrt{2}\) (since \(\sqrt{2} \neq 0\)): \(a = 24\) m. So each side of the courtyard is 24 m.
- Step 4: The perimeter of a square is \(4 \times \text{side}\). Perimeter = \(4 \times 24 = 96\) m.
- Step 5: Verify: If side = 24 m, diagonal = \(24\sqrt{2}\) m, matches given. Hedge length = perimeter = 96 m.

REASONING: This problem requires working backwards from the hypotenuse to the leg (inverse operation). The cancellation of \(\sqrt{2}\) is a key algebraic step that shows the proportional relationship. The final step connects the triangle property to the perimeter of the original square.

ANSWER: 96 metres of hedge.
## WORKED_EXAMPLE_3
PROBLEM: A right-angled isosceles triangular park has a hypotenuse of 50 m. The municipal corporation wants to fence the park and also lay a straight path along the median from the right angle vertex to the midpoint of the hypotenuse. Find the total length of fencing + path required. (Use \(\sqrt{2} \approx 1.414\) for final decimal answer.)

STEPS:
- Step 1: Let the equal legs be \(a\). Given hypotenuse \(h = 50\) m. Use \(h = a\sqrt{2} \Rightarrow 50 = a\sqrt{2} \Rightarrow a = \frac{50}{\sqrt{2}}\). Rationalize: \(a = \frac{50\sqrt{2}}{2} = 25\sqrt{2}\) m.
- Step 2: Fencing required = perimeter of triangle = \(a + a + h = 2a + h = 2(25\sqrt{2}) + 50 = 50\sqrt{2} + 50\) m.
- Step 3: In an isosceles right triangle, the median from the right angle to the hypotenuse is also the altitude and perpendicular bisector. Its length = half the hypotenuse? Wait: In a right triangle, the median to the hypotenuse is half the hypotenuse. So median length = \(h/2 = 50/2 = 25\) m. (Alternatively, using area: altitude = \(\frac{a^2}{h} = \frac{(25\sqrt{2})^2}{50} = \frac{1250}{50} = 25\) m.)
- Step 4: Total length = fencing + path = \((50\sqrt{2} + 50) + 25 = 50\sqrt{2} + 75\) m.
- Step 5: Approximate: \(50 \times 1.414 + 75 = 70.7 + 75 = 145.7\) m.
- Step 6: Check: Legs are \(25\sqrt{2} \approx 35.35\) m each. Perimeter \(\approx 35.35 + 35.35 + 50 = 120.7\) m. Path = 25 m. Total \(\approx 145.7\) m. Consistent.

REASONING: This combines the isosceles right triangle hypotenuse-leg relationship with a property of right triangles (median to hypotenuse = half hypotenuse). The student must rationalize the denominator to find the leg exactly, then compute perimeter, and recall the median property. It integrates geometry (triangle properties) with the specific algebraic form.

ANSWER: Exact: \(50\sqrt{2} + 75\) m. Approximate: 145.7 m.
## COMPETENCY_QUESTION_1
QUESTION: A square tile has a diagonal of length \(d\) cm. A student claims that the area of the tile is \(d^2\) cm² because "area of square = side² and side = diagonal". Is the student correct? If not, derive the correct formula for the area of a square in terms of its diagonal \(d\), and explain the student's error using the isosceles right triangle relationship.

COMPETENCY: Translating real-world situations to mathematical expressions and identifying errors in reasoning.

STEPS:
- Step 1: Understand the problem: We have a square, its diagonal \(d\), and a claim about area.
- Step 2: Identify the correct relationship: Diagonal \(d\) is hypotenuse of isosceles right triangle with leg = side \(s\). So \(d = s\sqrt{2}\).
- Step 3: Express \(s\) in terms of \(d\): \(s = \frac{d}{\sqrt{2}}\).
- Step 4: Compute area: \(Area = s^2 = \left(\frac{d}{\sqrt{2}}\right)^2 = \frac{d^2}{2}\).
- Step 5: Explain the error: The student confused the side with the diagonal. The diagonal is longer than the side by factor \(\sqrt{2}\). The area is half the square of the diagonal, not equal to it.

ANSWER: The student is incorrect. The correct area is \(\frac{d^2}{2}\) cm². The error is assuming side = diagonal; actually diagonal = side \(\times \sqrt{2}\), so side = diagonal/\(\sqrt{2}\), and squaring gives area = diagonal²/2.

DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two isosceles right triangles, \(\triangle ABC\) and \(\triangle DEF\), have hypotenuses of lengths 10 cm and 15 cm respectively. A student says: "The ratio of their areas is the same as the ratio of their hypotenuses, i.e., 10:15 = 2:3." Evaluate this claim. If false, find the correct ratio of their areas and explain the relationship between the scale factor of sides and the scale factor of areas in similar figures.

COMPETENCY: Comparing and justifying mathematical relationships, understanding scaling in similar figures.

STEPS:
- Step 1: Find the leg of each triangle using \(h = a\sqrt{2}\). For first: \(a_1 = \frac{10}{\sqrt{2}} = 5\sqrt{2}\) cm. For second: \(a_2 = \frac{15}{\sqrt{2}} = 7.5\sqrt{2}\) cm.
- Step 2: Compute area of each: \(Area = \frac{1}{2} \times \text{leg} \times \text{leg} = \frac{1}{2}a^2\). Area1 = \(\frac{1}{2}(5\sqrt{2})^2 = \frac{1}{2} \times 50 = 25\) cm². Area2 = \(\frac{1}{2}(7.5\sqrt{2})^2 = \frac{1}{2} \times 112.5 = 56.25\) cm².
- Step 3: Ratio of areas = \(25 : 56.25 = 1 : 2.25 = 4 : 9\).
- Step 4: Ratio of hypotenuses = \(10:15 = 2:3\). Ratio of legs = \(5\sqrt{2} : 7.5\sqrt{2} = 2:3\).
- Step 5: Conclude: The ratio of areas is the square of the ratio of corresponding sides (\((2/3)^2 = 4/9\)). The student incorrectly assumed a linear relationship between side ratio and area ratio.

ANSWER: The claim is false. The correct ratio of areas is 4:9. In similar figures, the ratio of areas is the square of the ratio of corresponding linear dimensions (scale factor). Since the triangles are similar (all isosceles right triangles are similar), the linear scale factor is 2:3, so the area scale factor is \((2/3)^2 = 4/9\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: In an ______ right triangle, the two legs (sides forming the right angle) are equal in length.

## DIAGNOSTIC_ANSWER_7
isosceles

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you have a ______ piece of paper with side length 10 cm.

## DIAGNOSTIC_ANSWER_8
square

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine you have a square piece of paper with side length ______ cm.

## DIAGNOSTIC_ANSWER_9
10

## DIAGNOSTIC_QUESTION_10
Fill in the blank: ______ you have a square piece of paper with side length 10 cm.

## DIAGNOSTIC_ANSWER_10
Imagine
