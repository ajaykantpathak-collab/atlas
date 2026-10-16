## ELI5
A kite's string pulls at a slant, but only the string's own direction feels the strain: the projection of the wind's force along the string is what keeps it taut. Projection is the shadow a vector casts on another's direction - a scalar length equal to the dot product divided by the target's magnitude, sign included; multiply by the target's unit vector and the shadow becomes a vector. A negative sign means the shadow falls backwards, against the target's arrow.

## DEFINITION
The projection of a vector $\vec{a}$ on another vector $\vec{b}$ is the vector component of $\vec{a}$ along the direction of $\vec{b}$. It is given by $\text{proj}_{\vec{b}}\vec{a} = \left(\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\right)\vec{b}$. The scalar projection (or component) of $\vec{a}$ on $\vec{b}$ is the signed magnitude of this projection, given by $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|} = |\vec{a}|\cos\theta$, where $\theta$ is the angle between $\vec{a}$ and $\vec{b}$.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can compute both scalar and vector projections of one vector onto another using the dot product, determine the sign of the scalar projection based on the angle, find the projection of a vector on a coordinate axis, and apply projection to solve problems involving components of forces or velocities in physics.

## SCOPE_BOUNDARY
This node covers projection of a vector on another vector (or on a directed line) including both scalar and vector projection formulas, their geometric interpretation, and applications. It does NOT cover vector (cross) product, scalar triple product, or projection onto a plane.

## WALKTHROUGH
Imagine a kite flying in the sky with a string pulling at an angle. The force exerted by the wind on the kite has a direction, but only the component of that force along the string actually pulls the string taut. To find this effective pulling force, we need the projection of the wind force vector onto the direction of the string. Start by writing the two vectors in component form (e.g., $\vec{F} = 3\hat{i} + 4\hat{j}$ and string direction $\vec{s} = \hat{i} + \hat{j}$). Recall the dot product formula $\vec{a}\cdot\vec{b} = |\vec{a}||\vec{b}|\cos\theta$. The scalar projection is $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$, and multiplying this by the unit vector along $\vec{b}$ gives the vector projection. The key insight is that projection extracts the "shadow" of one vector onto another, and the sign tells whether the shadow points along or opposite to $\vec{b}$.

Takeaway first: projection extracts one vector's component along another - scalar shadow first, unit-vector dressing second - and the sign is the geometry's honesty about direction. Exam moves: computation questions on scalar and vector projections, sign questions tied to the angle, axis questions projecting onto i, j or k, and physics questions resolving forces along given lines. Method: rerun the kite - write both vectors, dot them, divide by the string's magnitude, then dress the scalar in the string's unit vector. Check yourself: the vector projection is a multiple of the target vector, never of the source; mixing the two roles is the standard slip. Drill: compute both projections for one pair and state what the sign reveals about the angle.

## DIAGNOSTIC_QUESTION_1
State the formula for the vector projection of $\vec{a}$ on $\vec{b}$ and the formula for the scalar projection of $\vec{a}$ on $\vec{b}$.

## DIAGNOSTIC_ANSWER_1
Vector projection: $\text{proj}_{\vec{b}}\vec{a} = \left(\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\right)\vec{b}$. Scalar projection: $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$. A wrong answer (e.g., swapping the formulas, omitting the square in the denominator for vector projection, or writing $\vec{a}\cdot\vec{b}$ without division) reveals confusion between the vector and scalar results, or forgetting that vector projection requires a unit vector direction.

## DIAGNOSTIC_QUESTION_2
If $\vec{a} = 2\hat{i} + 3\hat{j}$ and $\vec{b} = \hat{i} - \hat{j}$, the scalar projection of $\vec{a}$ on $\vec{b}$ is negative. Explain geometrically why this happens without calculating the dot product.

## DIAGNOSTIC_ANSWER_2
The scalar projection is $|\vec{a}|\cos\theta$. It is negative when $\cos\theta < 0$, i.e., when $\theta > 90^\circ$. Geometrically, the angle between $\vec{a}$ (pointing to the first quadrant) and $\vec{b}$ (pointing to the fourth quadrant) is obtuse, so the "shadow" of $\vec{a}$ on $\vec{b}$ falls opposite to $\vec{b}$'s direction. A wrong answer (e.g., "because the dot product is negative" without geometric reasoning) shows reliance on algebraic computation without understanding the angle-sign connection.

## DIAGNOSTIC_QUESTION_3
Find the vector projection of $\vec{a} = 4\hat{i} - 3\hat{j} + 2\hat{k}$ on $\vec{b} = \hat{i} + 2\hat{j} - 2\hat{k}$.

## DIAGNOSTIC_ANSWER_3
Step 1: $\vec{a}\cdot\vec{b} = (4)(1) + (-3)(2) + (2)(-2) = 4 - 6 - 4 = -6$.
Step 2: $|\vec{b}|^2 = 1^2 + 2^2 + (-2)^2 = 1 + 4 + 4 = 9$.
Step 3: Scalar multiplier $= \frac{-6}{9} = -\frac{2}{3}$.
Step 4: Vector projection $= -\frac{2}{3}(\hat{i} + 2\hat{j} - 2\hat{k}) = -\frac{2}{3}\hat{i} - \frac{4}{3}\hat{j} + \frac{4}{3}\hat{k}$.
A wrong answer (e.g., using $|\vec{b}|$ instead of $|\vec{b}|^2$ in the denominator, or forgetting the minus sign) reveals a common algebraic slip: confusing scalar and vector projection formulas or sign errors in dot product.

## DIAGNOSTIC_QUESTION_4
Two vectors $\vec{a}$ and $\vec{b}$ have magnitudes 5 and 3 respectively. The scalar projection of $\vec{a}$ on $\vec{b}$ is 4. Find the angle between $\vec{a}$ and $\vec{b}$, and determine whether the vector projection points along or opposite to $\vec{b}$.

## DIAGNOSTIC_ANSWER_4
Scalar projection $= |\vec{a}|\cos\theta = 5\cos\theta = 4 \Rightarrow \cos\theta = \frac{4}{5} \Rightarrow \theta = \cos^{-1}(0.8) \approx 36.87^\circ$. Since $\cos\theta > 0$, $\theta$ is acute, so the vector projection points **along** $\vec{b}$. A wrong answer (e.g., $\theta = \cos^{-1}(4/3)$ or saying "opposite") reveals confusion between scalar projection formula $|\vec{a}|\cos\theta$ and $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$, or misunderstanding that positive scalar projection means same direction.

## DIAGNOSTIC_QUESTION_5
A student computes the projection of $\vec{a} = 3\hat{i} + 4\hat{j}$ on $\vec{b} = 5\hat{i}$ as $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|} = \frac{15}{5} = 3$ and writes the vector projection as $3\hat{i}$. Is this correct? Justify.

## DIAGNOSTIC_ANSWER_5
Yes, it is correct. The scalar projection is $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|} = \frac{15}{5}=3$. The unit vector along $\vec{b}$ is $\hat{i}$, so vector projection $= 3\hat{i}$. Alternatively, using $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\vec{b} = \frac{15}{25}(5\hat{i}) = 3\hat{i}$. A student who says "incorrect because vector projection formula has $|\vec{b}|^2$" fails to see both formulas are equivalent; this reveals a lack of flexibility in using the two forms.

## DIAGNOSTIC_QUESTION_6
Construct a real-world problem (with numbers) where a force vector is applied at an angle to a displacement, and the work done requires the scalar projection of the force on the displacement. Provide the problem statement and the solution.

## DIAGNOSTIC_ANSWER_6
Problem: A man pulls a cart with a force $\vec{F} = 10\hat{i} + 10\hat{j}$ N. The cart moves horizontally along the x-axis for 5 m. Find the work done by the force.
Solution: Displacement $\vec{s} = 5\hat{i}$ m. Work $= \vec{F}\cdot\vec{s} = (10)(5) + (10)(0) = 50$ J. Alternatively, scalar projection of $\vec{F}$ on $\vec{s}$ is $F_x = 10$ N, work $= 10 \times 5 = 50$ J. A poor answer (e.g., using full force magnitude $10\sqrt{2}$ N) shows misunderstanding that only the component of force along displacement does work.

## COMMON_MISCONCEPTION
Students often confuse the scalar projection formula $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$ with the vector projection formula $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\vec{b}$, and mistakenly write the vector projection as $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$ (a scalar) or forget to multiply by $\vec{b}$ at the end. Another frequent error is using $|\vec{b}|$ instead of $|\vec{b}|^2$ in the denominator for vector projection, e.g., computing $\frac{-6}{3}(\hat{i}+2\hat{j}-2\hat{k}) = -2\vec{b}$ instead of $-\frac{2}{3}\vec{b}$. They also ignore the sign of the scalar projection, treating projection as always positive magnitude.

## ON_FAILURE
If a student makes the denominator error, have them re-derive the vector projection from the scalar projection: scalar projection $= \frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}$, unit vector along $\vec{b} = \frac{\vec{b}}{|\vec{b}|}$, so vector projection $= \left(\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|}\right)\left(\frac{\vec{b}}{|\vec{b}|}\right) = \frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\vec{b}$. Practice 3 problems where they write both formulas side-by-side and verify they give the same vector. Revisit the dot product node (c12_math_cbse_10_004) for magnitude calculations.

## PREREQUISITE_NODE_IDS
c12_math_cbse_10_004, c12_math_cbse_10_001, c12_math_cbse_10_002, c11_math_cbse_10_006, c11_math_cbse_10_008, c12_math_cbse_10_003, c12_math_cbse_10_005, c12_phy_cbse_02_003, c12_phy_cbse_04_005

## PREREQUISITE_REASONS
c12_math_cbse_10_004: Dot product definition and computation are essential for the numerator $\vec{a}\cdot\vec{b}$.
c12_math_cbse_10_001: Basic vector concepts (magnitude, direction, types) are needed to interpret projection geometrically.
c12_math_cbse_10_002: Direction cosines and unit vectors ($\hat{i},\hat{j},\hat{k}$) are used to express vectors in component form and find unit vector along $\vec{b}$.
c11_math_cbse_10_006: Slope of a line connects to direction ratios of a vector; projection on axes uses direction cosines.
c11_math_cbse_10_008: Angle between two lines formula $\tan\theta = \left|\frac{m_1-m_2}{1+m_1m_2}\right|$ parallels the vector angle formula $\cos\theta = \frac{\vec{a}\cdot\vec{b}}{|\vec{a}||\vec{b}|}$.
c12_math_cbse_10_003: projection of a vector on another uses dot product, which builds on addition.  
c12_math_cbse_10_005: Projection of a vector on another uses dot product, but cross product gives the perpendicular component; both are needed for vector decomposition.  
c12_phy_cbse_02_003: c12_phy_cbse_02_003 | Work done by a force: $W = \vec{F}\cdot\vec{s} = |\vec{F}|(\text{scalar projection of } \vec{s} \text{ on } \vec{F}) = |\vec{s}|(\text{scalar projection of } \vec{F} \text{ on } \vec{s})$.  
c12_phy_cbse_04_005: c12_phy_cbse_04_005 | Resolution of vectors: Component of velocity along an inclined plane is projection of velocity vector on the plane's direction vector.  

## FORWARD_NODE_IDS
c12_math_cbse_10_007, c12_math_cbse_10_008
## FORWARD_REASONS
c12_math_cbse_10_007: Section formula uses vector division ratios; projection helps find foot of perpendicular and distances in coordinate geometry applications.
c12_math_cbse_10_008: Vector equation of a line uses direction vectors; projection is key to finding perpendicular distance from a point to a line and the foot of perpendicular.

## CROSS_SUBJECT_PREREQS
c11_math_cbse_10_006, c11_math_cbse_10_008, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_10_006: Slope of a line gives direction; projection of a vector on a line uses the line's direction vector.
c11_math_cbse_10_008: Angle between lines formula is analogous to angle between vectors via dot product.
c11_math_cbse_13_007: Derivative as rate of change; in physics, work done = force dot displacement, which is force magnitude times projection of displacement on force (or vice versa).

## CHAIN_DESCRIPTION
c12_math_cbse_10_004 -> c12_math_cbse_10_006 -> c12_math_cbse_10_008

## THIS_FORMULA
Scalar projection of $\vec{a}$ on $\vec{b}$: $\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|} = |\vec{a}|\cos\theta$. Vector projection of $\vec{a}$ on $\vec{b}$: $\left(\frac{\vec{a}\cdot\vec{b}}{|\vec{b}|^2}\right)\vec{b}$.

## FORMULA_VARIABLES
$\vec{a}$ = vector being projected; $\vec{b}$ = vector onto which projection is taken; $\vec{a}\cdot\vec{b}$ = dot product; $|\vec{b}|$ = magnitude of $\vec{b}$; $\theta$ = angle between $\vec{a}$ and $\vec{b}$ ($0 \le \theta \le \pi$).

## FORMULA_UNITS
Scalar projection has same units as $\vec{a}$ (e.g., newtons if $\vec{a}$ is force). Vector projection has same units as $\vec{a}$ and direction of $\vec{b}$.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c12_phy_cbse_02_003 | Work done by a force: $W = \vec{F}\cdot\vec{s} = |\vec{F}|(\text{scalar projection of } \vec{s} \text{ on } \vec{F}) = |\vec{s}|(\text{scalar projection of } \vec{F} \text{ on } \vec{s})$.
 c12_phy_cbse_04_005 | Resolution of vectors: Component of velocity along an inclined plane is projection of velocity vector on the plane's direction vector.
## PREREQ_CONCEPT
Dot product of two vectors and magnitude of a vector.

## PREREQ_BEFORE
Student must be able to compute dot product in component form and find magnitude of a vector from its components.

## PREREQ_STUCK
Revisit dot product computation (c12_math_cbse_10_004) and practice finding magnitudes of vectors like $3\hat{i}-4\hat{j}+12\hat{k}$.

## WORKED_EXAMPLE_1
PROBLEM: A drone flies with velocity $\vec{v} = 6\hat{i} + 8\hat{j} + 10\hat{k}$ m/s. Find the component of its velocity along the vertical direction (z-axis) and the vector projection of $\vec{v}$ on the vector $\vec{d} = 2\hat{i} - \hat{j} + 2\hat{k}$ representing a wind direction.
STEPS:
- Step 1: Identify the vertical direction vector as $\hat{k}$. Scalar projection on z-axis = $\vec{v}\cdot\hat{k} = 10$ m/s. Vector projection = $10\hat{k}$ m/s.
- Step 2: For projection on $\vec{d}$, compute $\vec{v}\cdot\vec{d} = (6)(2) + (8)(-1) + (10)(2) = 12 - 8 + 20 = 24$.
- Step 3: Compute $|\vec{d}|^2 = 2^2 + (-1)^2 + 2^2 = 4 + 1 + 4 = 9$.
- Step 4: Scalar multiplier = $\frac{24}{9} = \frac{8}{3}$.
- Step 5: Vector projection = $\frac{8}{3}(2\hat{i} - \hat{j} + 2\hat{k}) = \frac{16}{3}\hat{i} - \frac{8}{3}\hat{j} + \frac{16}{3}\hat{k}$ m/s.
REASONING: The vertical component is simply the z-coordinate because $\hat{k}$ is a unit vector. For the wind direction, we use the vector projection formula. The positive scalar multiplier indicates the drone's velocity has a component along the wind direction (acute angle).
ANSWER: Vertical component = 10 m/s (vector: $10\hat{k}$ m/s). Projection on wind direction = $\frac{16}{3}\hat{i} - \frac{8}{3}\hat{j} + \frac{16}{3}\hat{k}$ m/s.

## WORKED_EXAMPLE_2
PROBLEM: A force $\vec{F} = 5\hat{i} - 12\hat{j}$ N acts on a particle. Find the work done by this force when the particle moves from point A(2, -1, 0) to point B(5, 3, 0). (Work done = $\vec{F}\cdot\vec{s}$ where $\vec{s}$ is displacement).
STEPS:
- Step 1: Find displacement vector $\vec{s} = \vec{B} - \vec{A} = (5-2)\hat{i} + (3-(-1))\hat{j} + (0-0)\hat{k} = 3\hat{i} + 4\hat{j}$ m.
- Step 2: Work done = scalar projection of $\vec{F}$ on $\vec{s}$ multiplied by $|\vec{s}|$, or directly $\vec{F}\cdot\vec{s}$.
- Step 3: Compute dot product: $\vec{F}\cdot\vec{s} = (5)(3) + (-12)(4) + (0)(0) = 15 - 48 = -33$ J.
- Step 4: Interpret: Negative work means the force component opposes the displacement. Scalar projection of $\vec{F}$ on $\vec{s}$ = $\frac{-33}{|\vec{s}|}$. $|\vec{s}| = \sqrt{3^2+4^2} = 5$ m. Scalar projection = $-33/5 = -6.6$ N.
- Step 5: Vector projection of $\vec{F}$ on $\vec{s}$ = $\frac{-33}{25}(3\hat{i}+4\hat{j}) = -\frac{99}{25}\hat{i} - \frac{132}{25}\hat{j}$ N.
REASONING: Work done is the dot product of force and displacement. The scalar projection gives the component of force along displacement. Negative value indicates the force component is opposite to displacement direction (like friction).
ANSWER: Work done = -33 J. Scalar projection of force on displacement = -6.6 N. Vector projection = $-\frac{99}{25}\hat{i} - \frac{132}{25}\hat{j}$ N.

## WORKED_EXAMPLE_3
PROBLEM: Find the projection of the vector $\vec{a} = \hat{i} + 2\hat{j} + 3\hat{k}$ on the line joining points P(1, 2, 3) and Q(4, 6, 3). Also find the angle between $\vec{a}$ and the line PQ.
STEPS:
- Step 1: Find direction vector of line PQ: $\vec{PQ} = (4-1)\hat{i} + (6-2)\hat{j} + (3-3)\hat{k} = 3\hat{i} + 4\hat{j}$.
- Step 2: Compute dot product $\vec{a}\cdot\vec{PQ} = (1)(3) + (2)(4) + (3)(0) = 3 + 8 = 11$.
- Step 3: Compute $|\vec{PQ}|^2 = 3^2 + 4^2 = 25$, so $|\vec{PQ}| = 5$.
- Step 4: Scalar projection = $\frac{11}{5} = 2.2$. Vector projection = $\frac{11}{25}(3\hat{i}+4\hat{j}) = \frac{33}{25}\hat{i} + \frac{44}{25}\hat{j}$.
- Step 5: Find $|\vec{a}| = \sqrt{1^2+2^2+3^2} = \sqrt{14}$.
- Step 6: $\cos\theta = \frac{\vec{a}\cdot\vec{PQ}}{|\vec{a}||\vec{PQ}|} = \frac{11}{\sqrt{14}\times 5} = \frac{11}{5\sqrt{14}}$. $\theta = \cos^{-1}\left(\frac{11}{5\sqrt{14}}\right) \approx 53.3^\circ$.
REASONING: The line PQ gives the direction vector for projection. The angle is found using the dot product definition. The projection lies in the xy-plane because PQ has no z-component.
ANSWER: Scalar projection = 2.2 units. Vector projection = $\frac{33}{25}\hat{i} + \frac{44}{25}\hat{j}$. Angle $\theta \approx 53.3^\circ$.

## COMPETENCY_QUESTION_1
QUESTION: A boat is pulled by two ropes. Rope 1 exerts force $\vec{F_1} = 4\hat{i} + 3\hat{j}$ kN. Rope 2 exerts force $\vec{F_2} = -2\hat{i} + 6\hat{j}$ kN. The boat moves along the direction $\vec{d} = 3\hat{i} + 4\hat{j}$. (a) Find the total force component (scalar projection) along the direction of motion. (b) If the boat moves 100 m, find the total work done by the ropes. (c) Explain why the work done is not simply (magnitude of total force) $\times$ 100 m.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Find total force $\vec{F} = \vec{F_1} + \vec{F_2}$.
- Step 2: Compute scalar projection of $\vec{F}$ on $\vec{d}$ using $\frac{\vec{F}\cdot\vec{d}}{|\vec{d}|}$.
- Step 3: Work done = (scalar projection) $\times$ distance moved.
- Step 4: Explain that work uses only the component of force along displacement, not the full magnitude.
ANSWER: (a) $\vec{F} = 2\hat{i} + 9\hat{j}$ kN. $\vec{F}\cdot\vec{d} = 6+36=42$ kN·m. $|\vec{d}|=5$. Scalar projection = $42/5 = 8.4$ kN. (b) Work = $8.4 \times 100 = 840$ kJ. (c) Work = $\vec{F}\cdot\vec{s} = |\vec{F}||\vec{s}|\cos\theta$. Only the component $|\vec{F}|\cos\theta$ (scalar projection) contributes. The perpendicular component does no work.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a 3D coordinate system, a vector $\vec{a} = x\hat{i} + y\hat{j} + z\hat{k}$ has projections 2, -3, and 6 on the x, y, and z axes respectively. (a) Find $\vec{a}$. (b) Find the projection of $\vec{a}$ on the vector $\vec{b} = 2\hat{i} - 3\hat{j} + 6\hat{k}$. (c) If $\vec{c}$ is a vector such that its projection on $\vec{a}$ is zero, what is the geometric relationship between $\vec{a}$ and $\vec{c}$? Give an example of such a $\vec{c}$.
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: Projections on axes are the scalar components, so $x=2, y=-3, z=6$. Write $\vec{a}$.
- Step 2: Compute $\vec{a}\cdot\vec{b}$ and $|\vec{b}|$, then scalar and vector projection.
- Step 3: Projection of $\vec{c}$ on $\vec{a}$ is zero $\Rightarrow \vec{c}\cdot\vec{a}=0 \Rightarrow \vec{c} \perp \vec{a}$. Provide an example by solving $2x -3y +6z = 0$.
ANSWER: (a) $\vec{a} = 2\hat{i} - 3\hat{j} + 6\hat{k}$. (b) $\vec{a}\cdot\vec{b} = 4+9+36=49$. $|\vec{b}| = \sqrt{4+9+36}=7$. Scalar projection = $49/7 = 7$. Vector projection = $\frac{49}{49}\vec{b} = \vec{b} = 2\hat{i} - 3\hat{j} + 6\hat{k}$. (c) $\vec{c}$ is perpendicular to $\vec{a}$. Example: $\vec{c} = 3\hat{i} + 2\hat{j}$ (since $2(3)-3(2)+6(0)=0$).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a kite flying in the sky with a string ______ at an angle.

## DIAGNOSTIC_ANSWER_7
pulling

The pulling verb is the tautness question: only the wind's component along the string can keep it tight, which is what the projection measures. **A wrong answer (a lifting verb) reveals the student has resolved along gravity's line when the string's own direction is the target.**

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can compute both scalar and vector projections of one vector onto another using the dot product, determine the sign of the scalar projection based on the angle, find the projection of a vector on a coordinate axis, and apply projection to solve problems involving components of forces or velocities in physics.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: ______ a kite flying in the sky with a string pulling at an angle.

## DIAGNOSTIC_ANSWER_9
Imagine

The imperative opens the scene: the kite is imagined first so the projection has a physical shadow to compute. **A wrong answer (a formula quote) reveals the student has answered the walkthrough's quoted opener with its method instead.** The imperative opens the scene: the kite is imagined first so the projection has a string to measure against.
