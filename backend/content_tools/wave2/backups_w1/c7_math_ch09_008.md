## ELI5
Two roof supports for a shed stand on right angles, and the carpenter wants twins without measuring everything: RHS is the right-triangle special. Check three things - the right angles match, the hypotenuses match, and one pair of legs matches - and congruence is guaranteed. The right angle does hidden work: with the hypotenuse and one leg fixed, the remaining leg has no freedom, which is why this criterion succeeds where ordinary side-side-angle fails. No protractor round-up needed; the square corner vouches for the rest.

## DEFINITION
The RHS (Right angle-Hypotenuse-Side) congruence criterion states that if in two right-angled triangles, the length of the hypotenuse and one side of one triangle are equal to the length of the hypotenuse and one corresponding side of the other triangle, then the two triangles are congruent. This specific criterion applies exclusively to right triangles because the right angle provides a fixed structural reference point.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can identify right-angled triangles, correctly locate and compare the hypotenuse and legs, set up an RHS congruence proof, and solve missing side or angle problems in geometric figures.
## SCOPE_BOUNDARY
Covers the RHS congruence criterion for right-angled triangles, their formal proof conditions, and practical applications in finding congruent triangle pairs. It does NOT cover non-right triangles or trigonometry ratios (sine, cosine, tangent).
## WALKTHROUGH
Imagine you are a carpenter in your local village building two identical triangular wooden roof supports for a storage shed. Both supports must have a straight vertical pillar making a $90^\circ$ angle with the floor, meaning they are right-angled triangles. To make sure they are exact architectural twins without measuring every single angle, you only need to check two things: the longest slanted wooden beam (the hypotenuse) and one of the flat supporting legs. How can measuring just these two lengths guarantee that the entire wooden structure is identical? To begin, sketch both right-angled triangles and mark the $90^\circ$ angle symbol at the vertex. Recall from prior work that the side opposite the right angle is always the hypotenuse—the longest side of a right triangle. The key insight is that because the angle is fixed at $90^\circ$ and the hypotenuse and one leg are locked in length, the Pythagorean theorem forces the third side to also be identical, rendering the two triangles fully congruent under RHS.

**Takeaway:** RHS congruence is for right triangles only: right angle, hypotenuse, and one corresponding side all equal. **In the exam:** confirm the right angle, match hypotenuses, match one leg, and cite RHS - never plain SSA. **Check yourself:** identify the hypotenuse opposite the right angle in both supports before matching anything. **Why students miss it:** they apply side-side-angle outside right triangles, where the free side can swing.

## DIAGNOSTIC_QUESTION_1
In $\triangle ABC$, $\angle B = 90^\circ$. What is the name of the side opposite to $\angle B$?
## DIAGNOSTIC_ANSWER_1
The correct answer is the hypotenuse. A wrong answer like "base" or "perpendicular" shows confusion regarding triangle terminology, failing to recognize that the side opposite the right angle in any right-angled triangle is always uniquely designated as the hypotenuse.
## DIAGNOSTIC_QUESTION_2
Rahul claims that if two right triangles have equal hypotenuse lengths, they must be congruent by the RHS criterion. Is Rahul correct, and why or why not?
## DIAGNOSTIC_ANSWER_2
Rahul is incorrect because having only an equal hypotenuse is not enough; the RHS criterion requires BOTH the hypotenuse AND one corresponding side (leg) to be equal. A wrong answer indicating "yes" reveals a fundamental misunderstanding that a single matching side/hypotenuse pair constitutes full congruence.
## DIAGNOSTIC_QUESTION_3
In right-angled $\triangle PQR$ and $\triangle XYZ$, $\angle Q = 90^\circ$, $\angle Y = 90^\circ$, hypotenuse $PR = 13\text{ cm}$, side $PQ = 5\text{ cm}$, hypotenuse $XZ = 13\text{ cm}$, and side $XY = 5\text{ cm}$. Are these triangles congruent? State the criterion used.
## DIAGNOSTIC_ANSWER_3
Steps: 
1. Identify the given right angles: $\angle Q = \angle Y = 90^\circ$. 
2. Identify the matching hypotenuses: $PR = XZ = 13\text{ cm}$. 
3. Identify the matching side legs: $PQ = XY = 5\text{ cm}$. 
4. Conclude that $\triangle PQR \cong \triangle XYZ$ by the RHS congruence criterion. 
A wrong answer usually stems from mixing up the side labels or failing to verify that the right angle is indeed between or adjacent to the specified legs, leading to incorrect application of SSS or SAS instead of RHS.
## DIAGNOSTIC_QUESTION_4
Analyze why the SSA (Side-Side-Angle where the angle is not included) condition fails to form a unique triangle, whereas the RHS condition—which is technically a special case of SSA where the angle is $90^\circ$—guarantees congruence.
## DIAGNOSTIC_ANSWER_4
The RHS criterion works because the fixed right angle ($90^\circ$) combined with the Pythagorean theorem ($a^2 + b^2 = c^2$) strictly locks the third side's length. General SSA fails because an acute or obtuse non-included angle allows the non-fixed side to swing into two different triangle positions (the ambiguous case). A wrong answer suggests students do not understand how a $90^\circ$ angle constrains geometric movement differently than any arbitrary angle.
## DIAGNOSTIC_QUESTION_5
Evaluate the following statement: "To prove two triangles are congruent by RHS, we must explicitly measure all three interior angles of both triangles." Is this statement valid? Defend your reasoning.
## DIAGNOSTIC_ANSWER_5
The statement is invalid. We do NOT need to measure all three angles because the RHS criterion requires only: (1) one pair of right angles ($90^\circ$), (2) a pair of equal hypotenuses, and (3) a pair of equal sides (legs). A wrong answer indicates the student believes all parts of a triangle must be checked individually rather than relying on established congruence shortcuts.
## DIAGNOSTIC_QUESTION_6
Construct a scenario involving an Indian architectural setting (such as a triangular staircase support or roof truss) where you would use the RHS congruence criterion to prove two support beams are identical, listing the exact measurements you would take.
## DIAGNOSTIC_ANSWER_6
A good response should describe a concrete scenario, such as building two right-angled wooden ramps for a school stage. The student must specify measuring a $90^\circ$ vertical corner, a $5\text{ metre}$ slanted board (hypotenuse), and a $4\text{ metre}$ ground base (leg). A poor response lacks specific real-world context, omits units of measurement, or fails to mention the right angle and hypotenuse explicitly.
## COMMON_MISCONCEPTION
Students often try to apply the RHS criterion to triangles that do not have a $90^\circ$ angle, or they confuse which side is the hypotenuse, frequently picking a shorter leg as the hypotenuse because of its visual orientation on the page. For instance, in a triangle with sides $3$, $4$, and $5$, a student might mistakenly use $4$ as the hypotenuse instead of $5$, invalidating the RHS proof.
## ON_FAILURE
Remind the student to always scan for the square corner symbol ($90^\circ$) first before attempting RHS. Have them physically trace the two sides forming the right angle to find the vertex, and then find the side directly opposite to that vertex, reminding them: "The hypotenuse is always the longest side and sits across from the right angle." Practice identifying hypotenuses on rotated triangles by turning the notebook around.
## PREREQUISITE_NODE_IDS
c7_math_ch09_002, c7_math_ch09_005, c6_math_ch07_073, c6_math_ch07_079
## PREREQUISITE_REASONS
c7_math_ch09_002: requires understanding triangle congruence definition and correspondence before studying specific criteria.
c7_math_ch09_005: builds on side-comparison skills from SSS congruence.
c6_math_ch07_073: requires classification of triangles and identifying right-angled triangles.
c6_math_ch07_079: requires knowledge of angle properties in triangles.
## FORWARD_NODE_IDS
c7_math_ch09_009, c7_math_ch09_010, c8_math_ch4_3, c8_math_ch9_10, c8_math_ch9_6, c8_math_ch9_7
## FORWARD_REASONS
c7_math_ch09_009: requires RHS and other criteria to solve complex geometric proof problems.
c7_math_ch09_010: uses contrast with RHS to explain why AAA is not a valid congruence criterion.
c8_math_ch4_3: RHS criterion provides an alternative proof path since the triangles are right-angled, giving students flexibility.
c8_math_ch9_10: RHS congruence criterion uses the hypotenuse-leg relation, reinforcing the special role of the hypotenuse in right triangles.
c8_math_ch9_6: RHS congruence criterion justifies that the four right triangles with legs a and b are congruent, ensuring equal areas.
c8_math_ch9_7: RHS congruence criterion uses hypotenuse and one side, directly relating to triple side lengths.

## CROSS_SUBJECT_PREREQS
c6_math_ch08_088, c6_math_ch07_073
## CROSS_SUBJECT_REASONS
c6_math_ch08_088: area of triangles uses base and height dimensions found in right triangles.
c6_math_ch07_073: geometry classification forms the structural foundation for triangle properties.
## CHAIN_DESCRIPTION
c7_math_ch09_002 -> c7_math_ch09_008 -> c7_math_ch09_009
## THIS_FORMULA
\text{In } \triangle ABC \text{ and } \triangle PQR, \text{ if } \angle B = \angle Q = 90^\circ, \text{Hypotenuse } AC = \text{Hypotenuse } PR, \text{ and side } AB = \text{side } PQ \implies \triangle ABC \cong \triangle PQR (\text{RHS})
## FORMULA_VARIABLES
AC, PR = Hypotenuse lengths of the respective right triangles; AB, PQ = Lengths of one corresponding leg; $\angle B$, $\angle Q$ = Right angles ($90^\circ$).
## FORMULA_UNITS
cm, metres (m), millimetres (mm) for lengths; degrees ($^\circ$) for angles.
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT

## PREREQ_CONCEPT
Right-angled triangle identification and properties of the hypotenuse.
## PREREQ_BEFORE
Students must be able to identify a right angle, locate the hypotenuse as the side opposite the right angle, and understand general triangle congruence.
## PREREQ_STUCK
Review c6_math_ch07_073 to practice identifying right-angled triangles and locating hypotenuses.
## WORKED_EXAMPLE_1
PROBLEM: A farmer in Punjab wants to fence two identical right-angled triangular flower beds in his garden. For bed 1 ($\triangle DEF$), $\angle E = 90^\circ$, hypotenuse $DF = 17\text{ m}$, and leg $EF = 8\text{ m}$. For bed 2 ($\triangle RST$), $\angle S = 90^\circ$, hypotenuse $RT = 17\text{ m}$, and leg $ST = 8\text{ m}$. Prove that the two flower beds are congruent using the RHS criterion and find the length of the third side $DE$.
STEPS:
- Step 1: Identify the given right angles in both triangles: $\angle E = 90^\circ$ in $\triangle DEF$ and $\angle S = 90^\circ$ in $\triangle RST$.
- Step 2: Compare the given hypotenuses: Hypotenuse $DF = 17\text{ m}$ and Hypotenuse $RT = 17\text{ m}$ (Equal).
- Step 3: Compare the given legs: Leg $EF = 8\text{ m}$ and Leg $ST = 8\text{ m}$ (Equal).
- Step 4: Apply the RHS congruence criterion to state that $\triangle DEF \cong \triangle RST$.
- Step 5: Use corresponding parts of congruent triangles (CPCT) or the Pythagorean theorem ($DE^2 + EF^2 = DF^2$) to find $DE$: $DE^2 + 8^2 = 17^2 \implies DE^2 + 64 = 289 \implies DE^2 = 225 \implies DE = 15\text{ m}$.
REASONING: Since both triangles have a right angle, equal hypotenuses, and an equal corresponding leg, the RHS criterion guarantees full congruence. Consequently, all corresponding sides and angles are equal, allowing us to compute the missing side $DE$ accurately.
ANSWER: $\triangle DEF \cong \triangle RST$ by RHS, and length of $DE = 15\text{ m}$.
## WORKED_EXAMPLE_2
PROBLEM: An engineer checks two metal bracket supports for a bridge. In $\triangle ABC$, $\angle B = 90^\circ$, hypotenuse $AC = 10\text{ cm}$, and side $BC = 6\text{ cm}$. In $\triangle XYZ$, $\angle Y = 90^\circ$, hypotenuse $XZ = 10\text{ cm}$, and side $XY = 6\text{ cm}$. Are these brackets congruent? If so, write the correspondence correctly.
STEPS:
- Step 1: Verify the right angles: $\angle B = 90^\circ$ in $\triangle ABC$ and $\angle Y = 90^\circ$ in $\triangle XYZ$.
- Step 2: Check the hypotenuse lengths: $AC = 10\text{ cm}$ and $XZ = 10\text{ cm}$ (They match).
- Step 3: Check the given legs: In $\triangle ABC$, the given leg is $BC = 6\text{ cm}$. In $\triangle XYZ$, the given leg is $XY = 6\text{ cm}$.
- Step 4: Establish vertex correspondence: Vertex $B$ corresponds to vertex $Y$. Hypotenuse endpoint $A$ corresponds to $Z$, and $C$ corresponds to $X$ (since leg $BC = 6$ corresponds to leg $YX = 6$). Thus, the correspondence is $\triangle ABC \cong \triangle ZYX$.
- Step 5: Conclude congruence by the RHS criterion, keeping vertex order precise.
REASONING: Careful matching of vertices is essential in congruence statements. Because the right angle is at $B$ and $Y$, they align in the middle/corresponding position of the congruence notation.
ANSWER: $\triangle ABC \cong \triangle ZYX$ by RHS criterion.
## WORKED_EXAMPLE_3
PROBLEM: Two triangular sails on a traditional Indian boat are being repaired. Sail 1 is $\triangle PQR$ with $\angle Q = 90^\circ$, hypotenuse $PR = 25\text{ cm}$, and leg $QR = 7\text{ cm}$. Sail 2 is $\triangle LMN$ with $\angle M = 90^\circ$, hypotenuse $LN = 25\text{ cm}$, and leg $MN = 7\text{ cm}$. The cost of canvas cloth is rupees $5$ per square centimetre. Calculate the total cost to make BOTH sails.
STEPS:
- Step 1: Prove congruence of the sails. $\angle Q = \angle M = 90^\circ$, hypotenuse $PR = LN = 25\text{ cm}$, and leg $QR = MN = 7\text{ cm}$. Therefore, $\triangle PQR \cong \triangle LMN$ by RHS.
- Step 2: Find the missing leg $PQ$ of Sail 1 using the Pythagorean theorem: $PQ^2 + QR^2 = PR^2 \implies PQ^2 + 7^2 = 25^2 \implies PQ^2 + 49 = 625$.
- Step 3: Solve for $PQ$: $PQ^2 = 625 - 49 = 576 \implies PQ = \sqrt{576} = 24\text{ cm}$.
- Step 4: Calculate the area of one right-angled triangle: $\text{Area} = \frac{1}{2} \times \text{base} \times \text{height} = \frac{1}{2} \times 7 \times 24 = 7 \times 12 = 84\text{ cm}^2$.
- Step 5: Calculate total area for two identical sails: $84\text{ cm}^2 \times 2 = 168\text{ cm}^2$.
- Step 6: Compute total cost at rupees $5$ per $\text{cm}^2$: $168 \times 5 = \text{rupees } 840$.
REASONING: By proving congruence via RHS, we establish that both sails have identical dimensions. Finding one missing side via Pythagoras allows us to compute the exact area of both sails, which is then multiplied by the unit rate to find the total cost.
ANSWER: Total cost is rupees $840$.
## COMPETENCY_QUESTION_1
QUESTION: A surveyor claims that if two right triangles have equal areas and equal hypotenuses, they must be congruent by the RHS criterion. Test this hypothesis with an example or counter-example and explain your reasoning.
COMPETENCY: Comparing and justifying geometric criteria
STEPS:
- Step 1: Analyze the surveyor's conditions: Right angle present, equal hypotenuse, but equal area instead of an equal side leg.
- Step 2: Recall the RHS definition (requires hypotenuse AND one side leg, not area).
- Step 3: Construct a counter-example or test if area alone with hypotenuse determines unique side lengths.
- Step 4: Conclude whether the claim holds true.
ANSWER: The surveyor's claim is false. The area and hypotenuse alone do not uniquely lock the individual leg lengths and angles in a way that guarantees RHS congruence. RHS strictly requires a matching corresponding side (leg) alongside the hypotenuse and right angle.
DIFFICULTY: hard
## COMPETENCY_QUESTION_2
QUESTION: Two ladders are leaned against two different walls in a courtyard. Ladder 1 ($\triangle ABC$) has a length of $10\text{ m}$ (hypotenuse $AC$), distance from wall to base $BC = 6\text{ m}$, and $\angle B = 90^\circ$. Ladder 2 ($\triangle DEF$) has a hypotenuse $DF = 10\text{ m}$ and vertical height $DE = 8\text{ m}$, with $\angle E = 90^\circ$. Are these two triangle setups congruent? Justify your steps.
COMPETENCY: Translating real-world situations and verifying congruence criteria
STEPS:
- Step 1: For $\triangle ABC$, find the missing leg $AB$ using $AB^2 + BC^2 = AC^2 \implies AB^2 + 6^2 = 10^2 \implies AB = 8\text{ m}$.
- Step 2: For $\triangle DEF$, find the missing leg $EF$ using $DE^2 + EF^2 = DF^2 \implies 8^2 + EF^2 = 10^2 \implies EF = 6\text{ m}$.
- Step 3: Compare both triangles: $\angle B = \angle E = 90^\circ$, hypotenuse $AC = DF = 10\text{ m}$, and leg $AB = DE = 8\text{ m}$ (or leg $BC = EF = 6\text{ m}$).
- Step 4: Conclude congruence using the RHS criterion and state the proper correspondence.
ANSWER: Yes, the triangles are congruent by the RHS criterion ($\triangle ABC \cong \triangle DFE$ or equivalent correct correspondence) because they share a right angle, equal hypotenuses ($10\text{ m}$), and equal corresponding legs ($8\text{ m}$ and $6\text{ m}$).
DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The RHS (Right angle-Hypotenuse-Side) congruence criterion states that if in two right-angled triangles, the length of the hypotenuse and one side of one triangle are equal to the length of the hypotenuse and one ______ side of the other triangle, then the two triangles are congruent.

## DIAGNOSTIC_ANSWER_7
corresponding

**A wrong answer (writing 'equal') reveals the student restated the demand - the criterion needs the hypotenuse and one corresponding side, and the blank holds the adjective that pairs them.**

Corresponding is the pairing word between the hypotenuses and the side.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a carpenter in your local village building two identical ______ wooden roof supports for a storage shed.

## DIAGNOSTIC_ANSWER_8
triangular

**A wrong answer (writing 'steel') reveals the student swapped the material - the carpenter builds triangular wooden roof supports, and the blank holds that adjective.**

Triangular is the roof supports' shape in the storage shed.

Triangular is the shape of the roof supports the carpenter builds for the storage shed.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can identify right-angled triangles, correctly locate and compare the hypotenuse and legs, set up an RHS congruence proof, and solve missing side or angle problems in geometric figures.

**A wrong answer (hypotenuse only) reveals the student matched one part - mastery also demands locating legs, setting up the proof, and solving the missing sides.**

Right angle, hypotenuse, leg, proof, missing parts - the RHS mastery chain.

