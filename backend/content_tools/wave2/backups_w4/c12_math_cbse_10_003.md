## ELI5
A boat rows ten kilometres an hour across a river flowing five along it: the actual motion is the vector sum, drawn two equivalent ways. The triangle law places the second arrow's tail at the first's head and reads the closing side backwards; the parallelogram law draws both from one point and reads the diagonal. Its length comes from the cosine rule - magnitudes squared, twice the product times the cosine of the angle between - and its direction from a tangent formula.

## DEFINITION
The triangle law of vector addition states that if two vectors are represented as two sides of a triangle taken in order, their sum (resultant) is represented by the third side taken in the reverse order. The parallelogram law states that if two vectors are represented as adjacent sides of a parallelogram, their sum is represented by the diagonal of the parallelogram passing through their common initial point. Both laws are geometrically equivalent and yield the same resultant vector.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can (1) graphically construct the resultant of two vectors using both triangle and parallelogram laws, (2) compute the magnitude and direction of the resultant using the formula \(|\vec{a}+\vec{b}| = \sqrt{|\vec{a}|^2+|\vec{b}|^2+2|\vec{a}||\vec{b}|\cos\theta}\), and (3) apply the commutative and associative properties to simplify vector expressions in physics problems like force or velocity addition.

## SCOPE_BOUNDARY
This node covers the geometric laws of vector addition (triangle and parallelogram), their equivalence, and the algebraic properties of commutativity and associativity. It does NOT cover scalar multiplication of vectors, dot product, cross product, section formula, or vector equation of a line — those are addressed in subsequent nodes (c12_math_cbse_10_004 onward).

## WALKTHROUGH
Imagine a boat crossing a river: the boat’s engine gives it a velocity of 10 km/h perpendicular to the bank, while the river current adds a velocity of 5 km/h parallel to the bank. To find the boat’s actual velocity, we need to add these two vectors. Start by drawing the first vector \(\vec{v_b}\) (10 km/h) from point O. For the triangle law, place the tail of the second vector \(\vec{v_r}\) (5 km/h) at the head of \(\vec{v_b}\); the resultant \(\vec{v}\) is the vector from O to the head of \(\vec{v_r}\). For the parallelogram law, draw both vectors from the same point O, complete the parallelogram, and the diagonal from O gives the same resultant. This connects to the prior concept of directed line segments (c12_math_cbse_10_001) where vectors are free to move parallel to themselves. The key insight: the resultant’s magnitude is found using the cosine rule on the triangle formed, and its direction is given by \(\tan\phi = \frac{|\vec{b}|\sin\theta}{|\vec{a}|+|\vec{b}|\cos\theta}\).

Takeaway first: vector addition is geometry with a bookkeeping rule - two drawings, one answer - and the cosine formula prices the resultant's length while the tangent formula aims it. Exam moves: construction questions drawing both laws, magnitude questions via the cosine formula, direction questions via the tangent ratio, and property questions using commutativity and associativity to reorder sums. Method: rerun the crossing - engine's arrow across, current's arrow along, resultant as the closing side or the diagonal, whichever reads better. Check yourself: the angle in the formula is between the two vectors when placed tail to tail, not the route's turning angle - misreading it is the standard sign error. Drill: draw one sum both ways and compute its magnitude and direction from the formulas.

## DIAGNOSTIC_QUESTION_1
State the triangle law of vector addition in your own words and draw a labelled diagram showing vectors \(\vec{a}\), \(\vec{b}\), and their resultant \(\vec{a}+\vec{b}\).

## DIAGNOSTIC_ANSWER_1
The triangle law: if \(\vec{a}\) and \(\vec{b}\) are represented by two sides of a triangle taken in order (tail of \(\vec{b}\) at head of \(\vec{a}\)), then the third side taken in the reverse order (from tail of \(\vec{a}\) to head of \(\vec{b}\)) represents \(\vec{a}+\vec{b}\). A wrong answer where the student draws \(\vec{b}\) starting from the tail of \(\vec{a}\) (tail-to-tail) reveals confusion between triangle law and parallelogram law. If they draw the resultant from head of \(\vec{a}\) to tail of \(\vec{b}\), they have reversed the order.

## DIAGNOSTIC_QUESTION_2
Explain why the triangle law and parallelogram law of vector addition always give the same resultant vector. Use a diagram in your explanation.

## DIAGNOSTIC_ANSWER_2
In the parallelogram construction, the diagonal from the common point O to the opposite vertex is exactly the third side of the triangle formed by \(\vec{a}\) and \(\vec{b}\) placed head-to-tail (since opposite sides of a parallelogram are equal and parallel). A wrong answer that merely states “they are equivalent” without referencing the geometric construction (e.g., \(\vec{b}\) in parallelogram is parallel to \(\vec{b}\) in triangle) shows the student has memorized the fact but not understood the proof. If they claim the other diagonal is the resultant, they confuse the direction of the sum.

## DIAGNOSTIC_QUESTION_3
Two forces \(\vec{F_1}\) and \(\vec{F_2}\) of magnitudes 6 N and 8 N act at a point with an angle of 60° between them. Find the magnitude of the resultant force using the parallelogram law formula.

## DIAGNOSTIC_ANSWER_3
Magnitude \(R = \sqrt{6^2+8^2+2\cdot6\cdot8\cos60°} = \sqrt{36+64+48} = \sqrt{148} = 2\sqrt{37} \approx 12.17\) N. A common error: using \(\cos60°=0.5\) but forgetting the factor 2, giving \(\sqrt{36+64+24}=\sqrt{124}\) (wrong). Another error: using \(\sin60°\) instead of \(\cos60°\), which would be the formula for the magnitude of the cross product, not the sum.

## DIAGNOSTIC_QUESTION_4
Compare the magnitude and direction of the resultant when two vectors of fixed magnitudes \(a\) and \(b\) are added at angles \(\theta = 0°, 90°, 180°\). What pattern do you observe?

## DIAGNOSTIC_ANSWER_4
At \(\theta=0°\): \(R = a+b\) (max), direction same as both. At \(\theta=90°\): \(R = \sqrt{a^2+b^2}\), direction at \(\tan\phi = b/a\). At \(\theta=180°\): \(R = |a-b|\) (min), direction of the larger vector. The pattern: \(R\) decreases monotonically from \(a+b\) to \(|a-b|\) as \(\theta\) goes from 0 to \(\pi\). A wrong answer that says \(R\) is constant or increases with \(\theta\) reveals a fundamental misunderstanding of the cosine term’s effect. If they say direction is always the angle bisector, they incorrectly assume equal magnitudes.

## DIAGNOSTIC_QUESTION_5
A student adds two vectors of magnitudes 5 m and 12 m by simply writing “5 + 12 = 17 m” as the resultant magnitude. Identify the error and give the correct range of possible resultant magnitudes.

## DIAGNOSTIC_ANSWER_5
The error is treating vectors as scalars; vector addition depends on the angle \(\theta\). The resultant magnitude can range from \(|12-5|=7\) m (opposite directions) to \(12+5=17\) m (same direction). A wrong answer that says the resultant is always 17 m shows the student ignores direction entirely. If they say the range is 0 to 17 m, they forget vectors cannot cancel completely unless magnitudes are equal.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (Indian context) involving addition of two vectors where the angle between them is not 0° or 90°. Provide the full solution using both triangle and parallelogram laws.

## DIAGNOSTIC_ANSWER_6
Example: A cyclist rides 3 km east, then turns 30° north of east and rides 4 km. Find the displacement from start. Solution: Use triangle law: draw 3 km east, then 4 km at 30° from east. Resultant magnitude \(R = \sqrt{3^2+4^2+2\cdot3\cdot4\cos30°} = \sqrt{9+16+12\sqrt{3}} \approx 6.77\) km. Direction \(\tan\phi = \frac{4\sin30°}{3+4\cos30°} = \frac{2}{3+2\sqrt{3}} \approx 0.309\), \(\phi \approx 17.2°\) north of east. Parallelogram law gives the same. A poor answer would omit the diagram, use wrong angle, or add magnitudes directly.

## COMMON_MISCONCEPTION
Students often place vectors tail-to-tail when applying the triangle law, effectively using the parallelogram construction but then taking the wrong diagonal (the one not starting from the common point). Another frequent error: adding magnitudes directly as scalars (e.g., 5 N + 12 N = 17 N) without considering the angle. In the formula \(R = \sqrt{a^2+b^2+2ab\cos\theta}\), they sometimes use \(\sin\theta\) instead of \(\cos\theta\), confusing it with the cross product magnitude formula. They also incorrectly assume the resultant always bisects the angle between the vectors, which is true only when magnitudes are equal.

## ON_FAILURE
If a student makes the tail-to-tail error, have them physically act out the displacement: walk 3 steps forward, then 4 steps at an angle — the resultant is from start to finish (triangle law). For magnitude addition error, revisit c12_math_cbse_10_001 (vectors have direction) and c12_math_cbse_10_002 (position vectors). Practice drawing vectors head-to-tail for 5 different angle values and measure the resultant with a ruler to see it’s not the sum of lengths. Re-do the cosine rule derivation from the triangle to reinforce the formula.

## PREREQUISITE_NODE_IDS
c12_math_cbse_10_001, c12_math_cbse_10_002, c11_math_cbse_10_001, c11_math_cbse_12_001
## PREREQUISITE_REASONS
c12_math_cbse_10_001: provides the definition of vectors as directed line segments, equality, and negative vectors needed to understand addition.
c12_math_cbse_10_002: introduces position vectors and components, which allow algebraic addition later.
c11_math_cbse_10_001: coordinate axes and plotting points are essential for representing vectors in component form.
c11_math_cbse_12_001: 3D coordinates extend the same addition laws to three dimensions.

## FORWARD_NODE_IDS
c12_math_cbse_10_004, c12_math_cbse_10_005, c12_math_cbse_10_006, c12_math_cbse_10_007, c12_math_cbse_10_008
## FORWARD_REASONS
c12_math_cbse_10_004: dot product uses the concept of vector sum in its algebraic properties (distributivity over addition).
c12_math_cbse_10_005: cross product also relies on addition properties and the geometric interpretation of vectors.
c12_math_cbse_10_006: projection of a vector on another uses dot product, which builds on addition.
c12_math_cbse_10_007: section formula expresses a point dividing a segment as a weighted sum of position vectors.
c12_math_cbse_10_008: vector equation of a line uses addition of a position vector and a direction vector scaled by a parameter.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_001, c11_math_cbse_12_001
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_001: coordinate geometry provides the framework for representing forces and velocities as vectors in physics.
c11_math_cbse_12_001: 3D coordinate geometry is directly used in physics for displacement, velocity, and force vectors in space.

## CHAIN_DESCRIPTION
c12_math_cbse_10_001 -> c12_math_cbse_10_003 -> c12_math_cbse_10_004

## THIS_FORMULA
Triangle law: \(\vec{a} + \vec{b} = \vec{c}\) where \(\vec{c}\) is the third side of the triangle. Parallelogram law magnitude: \(|\vec{a}+\vec{b}| = \sqrt{|\vec{a}|^2 + |\vec{b}|^2 + 2|\vec{a}||\vec{b}|\cos\theta}\), direction: \(\tan\phi = \frac{|\vec{b}|\sin\theta}{|\vec{a}|+|\vec{b}|\cos\theta}\) (angle of resultant with \(\vec{a}\)).

## FORMULA_VARIABLES
\(\vec{a}, \vec{b}\) = vectors being added; \(\theta\) = angle between \(\vec{a}\) and \(\vec{b}\) when placed tail-to-tail; \(\phi\) = angle between resultant and \(\vec{a}\); \(|\vec{a}|, |\vec{b}|\) = magnitudes of the vectors.

## FORMULA_UNITS
Magnitudes in same units as original vectors (e.g., metres, newtons, km/h); angles in degrees or radians (dimensionless).

## COMPUTATION_TYPE
geometric and algebraic

## CROSS_SUBJECT
c11_math_cbse_10_001 | Coordinate axes and distance formula are used to express vectors in component form, which is essential for physics problems involving forces in 2D.
c11_math_cbse_12_001 | 3D coordinates allow vector addition in three dimensions, directly applicable to physics problems like resultant force in space.
## PREREQ_CONCEPT
Vectors as directed line segments with magnitude and direction that can be moved parallel to themselves (free vectors).

## PREREQ_BEFORE
Student must be able to draw a vector given its magnitude and direction, identify equal vectors, and understand the negative of a vector.

## PREREQ_STUCK
Revisit c12_math_cbse_10_001 for vector definitions and c12_math_cbse_10_002 for position vectors and components.

## WORKED_EXAMPLE_1
PROBLEM: A man walks 3 km due east, then 4 km due north. Find his resultant displacement from the starting point using the triangle law.
STEPS:
- Step 1: Identify the two displacement vectors: \(\vec{OA} = 3\,\text{km}\) east, \(\vec{AB} = 4\,\text{km}\) north. The angle between them is 90°.
- Step 2: Apply triangle law: place tail of \(\vec{AB}\) at head of \(\vec{OA}\). The resultant \(\vec{OB}\) is from O to B.
- Step 3: Use Pythagoras theorem (since angle is 90°): \(|\vec{OB}| = \sqrt{3^2 + 4^2} = \sqrt{9+16} = \sqrt{25} = 5\,\text{km}\).
- Step 4: Find direction: \(\tan\phi = \frac{4}{3} \Rightarrow \phi = \tan^{-1}(4/3) \approx 53.1°\) north of east.
- Step 5: Interpret: The man is 5 km away from start at an angle 53.1° north of east.
REASONING: The triangle law directly models sequential displacements. The right triangle simplifies the cosine rule to Pythagoras. The direction is found using trigonometry on the same triangle.
ANSWER: 5 km at 53.1° north of east.

## WORKED_EXAMPLE_2
PROBLEM: Two forces of 5 N and 12 N act at a point with an angle of 60° between them. Find the magnitude and direction of the resultant force using the parallelogram law.
STEPS:
- Step 1: Given \(|\vec{F_1}| = 5\,\text{N}\), \(|\vec{F_2}| = 12\,\text{N}\), \(\theta = 60°\).
- Step 2: Magnitude of resultant: \(R = \sqrt{5^2 + 12^2 + 2\cdot5\cdot12\cos60°} = \sqrt{25 + 144 + 120\cdot0.5} = \sqrt{169 + 60} = \sqrt{229} \approx 15.13\,\text{N}\).
- Step 3: Direction relative to the 5 N force: \(\tan\phi = \frac{12\sin60°}{5 + 12\cos60°} = \frac{12\cdot\sqrt{3}/2}{5 + 12\cdot0.5} = \frac{6\sqrt{3}}{11} \approx 0.945\).
- Step 4: \(\phi = \tan^{-1}(0.945) \approx 43.4°\).
- Step 5: The resultant is approximately 15.13 N at 43.4° from the 5 N force towards the 12 N force.
REASONING: The parallelogram law gives the same resultant as the triangle law. The formula comes from the cosine rule applied to the triangle formed by the two vectors and their sum. The direction formula is derived from resolving components.
ANSWER: 15.13 N at 43.4° from the 5 N force.

## WORKED_EXAMPLE_3
PROBLEM: A boat crosses a river 200 m wide. The boat’s speed in still water is 10 km/h directed perpendicular to the bank. The river flows at 5 km/h parallel to the bank. Find the boat’s resultant velocity relative to the ground and the angle it makes with the perpendicular direction. Also find how far downstream the boat lands.
STEPS:
- Step 1: Represent velocities as vectors: \(\vec{v_b} = 10\,\text{km/h}\) perpendicular to bank (say +y direction), \(\vec{v_r} = 5\,\text{km/h}\) parallel to bank (+x direction). Angle between them = 90°.
- Step 2: Resultant velocity \(\vec{v} = \vec{v_b} + \vec{v_r}\). Magnitude: \(|\vec{v}| = \sqrt{10^2 + 5^2} = \sqrt{125} = 5\sqrt{5} \approx 11.18\,\text{km/h}\).
- Step 3: Direction relative to perpendicular (y-axis): \(\tan\phi = \frac{5}{10} = 0.5 \Rightarrow \phi = \tan^{-1}(0.5) \approx 26.6°\) downstream.
- Step 4: Time to cross river: width = 0.2 km, perpendicular speed = 10 km/h → \(t = \frac{0.2}{10} = 0.02\,\text{h} = 1.2\,\text{min}\).
- Step 5: Downstream distance: \(d = v_r \times t = 5 \times 0.02 = 0.1\,\text{km} = 100\,\text{m}\).
- Step 6: Verify using triangle law: the velocity triangle has sides 10, 5, and resultant \(5\sqrt{5}\); the displacement triangle is similar (same angles) with perpendicular side 200 m, so downstream side = 100 m.
REASONING: This combines vector addition (triangle law) with kinematics. The velocity vectors add to give the actual path. The perpendicular component determines crossing time; the parallel component determines drift. The similar triangles connection is a powerful geometric check.
ANSWER: Resultant velocity = 11.18 km/h at 26.6° downstream from perpendicular; lands 100 m downstream.

## COMPETENCY_QUESTION_1
QUESTION: A drone flies from point A(1, 2, 0) to B(4, 6, 0) and then to C(2, 9, 0). (i) Write the displacement vectors \(\vec{AB}\) and \(\vec{BC}\) in component form. (ii) Find the resultant displacement \(\vec{AC}\) using vector addition. (iii) Verify that the triangle law holds by showing \(|\vec{AC}|^2 = |\vec{AB}|^2 + |\vec{BC}|^2 + 2|\vec{AB}||\vec{BC}|\cos\theta\), where \(\theta\) is the angle between \(\vec{AB}\) and \(\vec{BC}\). (iv) If the drone’s speed is constant at 10 m/s, find the time taken for the whole journey.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Compute \(\vec{AB} = (4-1, 6-2, 0-0) = (3, 4, 0)\) and \(\vec{BC} = (2-4, 9-6, 0-0) = (-2, 3, 0)\).
- Step 2: Add components: \(\vec{AC} = \vec{AB} + \vec{BC} = (3-2, 4+3, 0) = (1, 7, 0)\).
- Step 3: Magnitudes: \(|\vec{AB}| = 5\), \(|\vec{BC}| = \sqrt{13}\), \(|\vec{AC}| = \sqrt{50} = 5\sqrt{2}\). Angle \(\theta\): \(\cos\theta = \frac{\vec{AB}\cdot\vec{BC}}{|\vec{AB}||\vec{BC}|} = \frac{-6+12}{5\sqrt{13}} = \frac{6}{5\sqrt{13}}\). RHS of formula: \(25 + 13 + 2\cdot5\cdot\sqrt{13}\cdot\frac{6}{5\sqrt{13}} = 38 + 12 = 50\). Matches LHS.
- Step 4: Total distance = \(5 + \sqrt{13} \approx 8.61\) units. Time = distance/speed = 8.61/10 = 0.861 s (if units are metres).
ANSWER: (i) \(\vec{AB} = 3\hat{i}+4\hat{j}\), \(\vec{BC} = -2\hat{i}+3\hat{j}\); (ii) \(\vec{AC} = \hat{i}+7\hat{j}\); (iii) Verified; (iv) 0.861 s (assuming metres).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Assertion (A): The triangle law and parallelogram law of vector addition are equivalent. Reason (R): In a parallelogram, the diagonal from the common initial point represents the sum of the two adjacent side vectors, which is exactly the third side of the triangle formed by placing the second vector at the head of the first. Choose the correct option: (a) Both A and R are true and R correctly explains A. (b) Both A and R are true but R does not explain A. (c) A is true but R is false. (d) A is false but R is true. Justify your choice with a diagram.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Recognize that both laws produce the same resultant vector geometrically.
- Step 2: Analyze the reason: In a parallelogram OACB with \(\vec{OA}=\vec{a}\), \(\vec{OB}=\vec{b}\), the diagonal \(\vec{OC}\) is the sum. The triangle OAC has sides \(\vec{a}\), \(\vec{AC}=\vec{b}\) (since opposite sides equal and parallel), and \(\vec{OC}\). Thus the triangle law gives the same \(\vec{OC}\).
- Step 3: Conclude that R correctly explains A because it shows the parallelogram contains the triangle construction.
- Step 4: Draw a diagram: parallelogram with vertices O, A, C, B. Label vectors \(\vec{a}=\vec{OA}\), \(\vec{b}=\vec{OB}\). Show \(\vec{AC}=\vec{b}\). Then triangle OAC has sides \(\vec{a}\), \(\vec{b}\), \(\vec{a}+\vec{b}\).
ANSWER: (a) Both A and R are true and R correctly explains A.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The triangle law of vector addition states that if two vectors are represented as two sides of a triangle taken in order, their sum (______) is represented by the third side taken in the reverse order.

## DIAGNOSTIC_ANSWER_7
resultant

The resultant is the sum's drawing: the single arrow that replaces the pair, whether read as closing side or diagonal. **A wrong answer (a component) reveals the student has split the answer into parts when the law's whole point is the single combined arrow.**

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine a boat crossing a river: the boat’s engine gives it a velocity of 10 km/h ______ to the bank, while the river current adds a velocity of 5 km/h parallel to the bank.

## DIAGNOSTIC_ANSWER_8
perpendicular

Perpendicular is the rowing direction: the engine aims across the current, and the right angle between them is what the cosine formula consumes. **A wrong answer (parallel) reveals the student has aimed the boat downstream and turned the problem into plain addition of collinear speeds.**
