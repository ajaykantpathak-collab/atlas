## ELI5
A surveyor must reproduce a plot across the schoolyard knowing one path's length and the two corner angles where fences meet it - ASA does the certifying. The fine print again: the side must be included, lying between the two known angles, because it fixes where the two angle-rays land. Two angles and their bridging side equal to another triangle's, and the twins are congruent - every leftover angle and side follows by correspondence. A side anywhere else leaves the vertex loose and the proof invalid.

## DEFINITION
The ASA (Angle-Side-Angle) Congruence Criterion states that if two angles and the included side of one triangle are equal to two angles and the included side of another triangle, then the two triangles are congruent. The "included side" refers to the specific side that lies directly between the two given vertices containing those angles.
## COGNITIVE_LEVEL
apply
## MASTERY_CRITERIA
Can identify the included side between two given angles in a triangle, verify ASA congruence conditions, and write formal congruence proofs with corresponding parts (CPCTC).
## SCOPE_BOUNDARY
Covers triangles where two angles and the side between them are known or can be proven equal. Does NOT cover non-included sides (AAS or SSA criteria, which require different proofs).
## WALKTHROUGH
Imagine you are a surveyor mapping a triangular plot of land in your village schoolyard, and you need to build an identical structure on the other side of the campus without measuring all three sides. You know the length of the brick path (the side) and the exact corner angles where it meets two fences. How can you be sure another plot built with the same path length and corner angles will match perfectly? Previously, you learned how to construct triangles using side-side-side and side-angle-side measurements in Class 6. Now, we expand this to triangles defined by two angles and their connecting side. The key insight is that fixing two angles and the length of the side *between* them locks the remaining triangle shape completely into place.

**Takeaway:** ASA congruence: two equal angles plus the side included between them certify twin triangles. **In the exam:** check that the named side lies between the two angles before invoking ASA; then transfer parts by CPCTC. **Check yourself:** mark the two fence angles and the brick path between them, and confirm the path is the bridge. **Why students miss it:** they pair two angles with a side hanging outside the pair and call it ASA.

## DIAGNOSTIC_QUESTION_1
In $\triangle PQR$, which side is the included side between $\angle P$ and $\angle Q$?
## DIAGNOSTIC_ANSWER_1
The included side is side $PQ$. A student who answers $QR$ or $PR$ does not understand the definition of an "included side," mistaking it for any random side rather than the specific line segment connecting the vertices of the two given angles.

**A wrong answer (pointing anywhere) reveals the student missed the pinning** - the included side is fixed by the two named angles: it is the segment joining their vertices, and no other side qualifies.

## DIAGNOSTIC_QUESTION_2
If $\triangle ABC \cong \triangle DEF$ by the ASA criterion, and you are given that $\angle A = \angle D$ and $\angle B = \angle E$, which side must be equal between the two triangles for ASA to apply?
## DIAGNOSTIC_ANSWER_2
Side $AB$ must be equal to side $DE$. A student who says side $BC$ or $AC$ confuses the included side with other sides of the triangle, failing to recognize that the side must be common to both specified angle vertices.

**A wrong answer (choosing a bystander side) reveals the student picked a side outside the conversation** - the side must touch both named angles, the one between the witnesses.

## DIAGNOSTIC_QUESTION_3
In $\triangle XYZ$ and $\triangle RST$, you are given $\angle X = 50^\circ$, $\angle Y = 60^\circ$, and side $XY = 7\text{ cm}$. In $\triangle RST$, $\angle R = 50^\circ$, $\angle S = 60^\circ$, and side $RS = 7\text{ cm}$. Are the triangles congruent, and why?
## DIAGNOSTIC_ANSWER_3
Yes, $\triangle XYZ \cong \triangle RST$ by the ASA Congruence Criterion because two angles ($\angle X = \angle R$, $\angle Y = \angle S$) and the included side between them ($XY = RS = 7\text{ cm}$) are equal. A student who says no might be incorrectly looking for three equal sides or confusing the position of the side.
## DIAGNOSTIC_QUESTION_4
Why is the condition that the side *must be included* between the two given angles essential for ASA congruence?
## DIAGNOSTIC_ANSWER_4
The included side ensures that the two rays forming the angles originate from the exact same endpoints with a fixed distance, locking the vertex where they intersect. If a non-included side were used with two angles, the triangle could be scaled to different sizes while keeping the same angles (similar triangles), failing to guarantee congruence.
## DIAGNOSTIC_QUESTION_5
A student claims that if $\angle A = \angle P$, $\angle B = \angle Q$, and side $BC = QR$ in $\triangle ABC$ and $\triangle PQR$, the triangles are congruent by ASA. Is this correct? Evaluate their reasoning.
## DIAGNOSTIC_ANSWER_5
The student's claim is incorrect. Side $BC$ is NOT the included side between $\angle A$ and $\angle B$; the included side is $AB$. Therefore, ASA congruence cannot be directly applied with side $BC$, as the given side must lie between the two known angles.
## DIAGNOSTIC_QUESTION_6
Construct a word problem scenario from a real-life playground measurement task where proving two triangular flower beds are identical requires using the ASA criterion.
## DIAGNOSTIC_ANSWER_6
A good answer should describe measuring a baseline path of 5 meters between two garden posts, measuring the angle each post makes with a border string, and showing that a second garden bed built with the same baseline and corner angles must be identical. A poor answer just states numbers without a real-world context or geometric justification.
## COMMON_MISCONCEPTION
Students often pick a side that is NOT between the two given angles and mistakenly call it ASA. For example, if given $\angle A$, $\angle B$, and side $BC$, students think ASA applies because two angles and a side are equal, ignoring the position of the side relative to the angles.
## ON_FAILURE
Direct the student to draw a rough sketch of the triangle and highlight the two given angles using colored pencils. Ask them to trace the line segment that directly connects the vertices of those two highlighted angles. Emphasize that the letter names of the side must match the vertex letters of the two angles.
## PREREQUISITE_NODE_IDS
c7_math_ch09_001, c7_math_ch09_002, c6_math_ch07_072, c6_math_ch07_073
## PREREQUISITE_REASONS
c7_math_ch09_001: requires understanding congruent figures and matching parts.
c7_math_ch09_002: requires knowing general triangle congruence conditions.
c6_math_ch07_072: requires measuring and identifying angles.
c6_math_ch07_073: requires classifying triangles and understanding side-angle relationships.
## FORWARD_NODE_IDS
c7_math_ch09_008, c7_math_ch09_009, c7_math_ch09_010, c8_math_ch4_10, c8_math_ch4_4
## FORWARD_REASONS
c7_math_ch09_008: builds on criteria-based triangle congruence for RHS.
c7_math_ch09_009: applies ASA and other criteria to solve complex geometric proofs.
c7_math_ch09_010: uses ASA understanding to explain why AAA fails as a congruence criterion.
c8_math_ch4_10: ASA congruence criterion is used to prove the two triangles formed by a diagonal are congruent.
c8_math_ch4_4: ASA congruence criterion, used with alternate interior angles from parallel lines.

## CROSS_SUBJECT_PREREQS
c6_math_ch06_064, c6_math_ch07_080
## CROSS_SUBJECT_REASONS
c6_math_ch06_064: uses proportional reasoning and measurement scales.
c6_math_ch07_080: uses triangle construction techniques involving angles and sides.
## CHAIN_DESCRIPTION
c7_math_ch09_002 -> c7_math_ch09_007 -> c7_math_ch09_009
## THIS_FORMULA
N/A - conceptual
## FORMULA_VARIABLES
N/A
## FORMULA_UNITS
degrees, cm, m
## COMPUTATION_TYPE
geometric
## CROSS_SUBJECT
c7_math_ch09_001 | relates shape and size matching to map scaling and architectural blueprints.
c7_math_ch09_005 | compares side-based congruence criteria with angle-side-angle criteria.
## PREREQ_CONCEPT
Identifying included sides between two angles in a triangle.
## PREREQ_BEFORE
Must be able to identify corresponding angles and sides of triangles and measure angles with a protractor.
## PREREQ_STUCK
Review c7_math_ch09_002 to practice identifying corresponding parts of triangles before attempting ASA problems.
## WORKED_EXAMPLE_1
PROBLEM: In $\triangle ABC$ and $\triangle DEF$, it is given that $\angle B = \angle E = 70^\circ$, $\angle C = \angle F = 50^\circ$, and side $BC = EF = 6\text{ cm}$. Prove that $\triangle ABC \cong \triangle DEF$ and find the length of side $AB$ if $DE = 4.5\text{ cm}$.
STEPS:
- Step 1: Identify the given measurements for both triangles: $\angle B = \angle E$, side $BC = EF$, and $\angle C = \angle F$.
- Step 2: Verify that side $BC$ is the included side between $\angle B$ and $\angle C$, and side $EF$ is the included side between $\angle E$ and $\angle F$.
- Step 3: Apply the ASA congruence criterion: Since two angles and the included side of $\triangle ABC$ are equal to two angles and the included side of $\triangle DEF$, $\triangle ABC \cong \triangle DEF$.
- Step 4: Use the property of congruent triangles (CPCTC: Corresponding Parts of Congruent Triangles are Congruent) to find missing lengths. Since $\triangle ABC \cong \triangle DEF$, side $AB$ corresponds to side $DE$.
- Step 5: Substitute the given value: $AB = DE = 4.5\text{ cm}$.
REASONING: The ASA criterion guarantees total shape and size match when two angle corners and the bridge between them are identical. CPCTC allows us to equate any matching sides or angles once congruence is established.
ANSWER: $\triangle ABC \cong \triangle DEF$, and $AB = 4.5\text{ cm}$.
## WORKED_EXAMPLE_2
PROBLEM: Two triangular garden beds in a park have $\angle P = 40^\circ$, $\angle Q = 80^\circ$, and side $PQ = 10\text{ metres}$ for the first bed, and $\angle X = 40^\circ$, $\angle Z = 80^\circ$, and side $XZ = 10\text{ metres}$ for the second bed. Are these two garden beds congruent? Explain.
STEPS:
- Step 1: List the given parts of the first garden bed: $\angle P = 40^\circ$, $\angle Q = 80^\circ$, and side $PQ = 10\text{ m}$ (included side between $\angle P$ and $\angle Q$).
- Step 2: List the given parts of the second garden bed: $\angle X = 40^\circ$, $\angle Z = 80^\circ$, and side $XZ = 10\text{ m}$. Check if side $XZ$ is the included side between $\angle X$ and $\angle Z$.
- Step 3: Compare the positions: In the second bed, the side is $XZ$, which connects $\angle X$ and $\angle Z$. However, the given angles are $\angle X$ ($40^\circ$) and $\angle Z$ ($80^\circ$). Wait, let's check vertex names: if side is $XZ$, the angles must be $\angle X$ and $\angle Z$. Here we have $\angle X = 40^\circ$ and $\angle Z = 80^\circ$, and side $XZ = 10\text{ m}$, so $XZ$ IS the included side!
- Step 4: Match corresponding parts: $\angle P = \angle X = 40^\circ$, $\angle Q = \angle Z = 80^\circ$ (wait, let's align letters: $P \leftrightarrow X$, $Q \leftrightarrow Y$, $R \leftrightarrow Z$). Let's re-verify: if $\angle P = 40^\circ$, $\angle Q = 80^\circ$, side $PQ = 10$, and second triangle has $\angle X = 40^\circ$, $\angle Z = 80^\circ$, side $XZ = 10$, the side $XZ$ connects $40^\circ$ and $80^\circ$ just like $PQ$ connects $40^\circ$ and $80^\circ$.
- Step 5: Conclude congruence: By ASA criterion, $\triangle PQR \cong \triangle XYZ$ because the two angles and the included side match.
REASONING: Congruence depends on matching the angle-side-angle sequence. As long as the 10 m side connects the $40^\circ$ vertex and the $80^\circ$ vertex in both triangles, ASA holds regardless of the letter labels used.
ANSWER: Yes, the garden beds are congruent by ASA.
## WORKED_EXAMPLE_3
PROBLEM: In a quadrilateral $ABCD$, diagonal $AC$ bisects both $\angle DAB$ and $\angle DCB$. Prove that $\triangle ABC \cong \triangle ADC$, and find $\angle B$ if $\angle D = 110^\circ$.
STEPS:
- Step 1: Examine the figure composed of two triangles, $\triangle ABC$ and $\triangle ADC$, sharing a common side $AC$.
- Step 2: Note the given angle conditions: diagonal $AC$ bisects $\angle DAB$, so $\angle DAC = \angle BAC$. Also, $AC$ bisects $\angle DCB$, so $\angle DCA = \angle BCA$.
- Step 3: Identify the common side: side $AC = CA$, which is the included side between the bisected angle pairs for both triangles.
- Step 4: Apply ASA congruence criterion to $\triangle ABC$ and $\triangle ADC$: $\angle BAC = \angle DAC$, side $AC = CA$, and $\angle BCA = \angle DCA$. Therefore, $\triangle ABC \cong \triangle ADC$.
- Step 5: Use CPCTC to find missing angle measures: Corresponding angle to $\angle D$ is $\angle B$. Thus, $\angle B = \angle D = 110^\circ$.
REASONING: Sharing a common side acts as a bridge for both triangles. Using angle bisectors gives us two pairs of equal angles, and the shared side serves as the included side for ASA.
ANSWER: $\triangle ABC \cong \triangle ADC$ by ASA, and $\angle B = 110^\circ$.
## COMPETENCY_QUESTION_1
QUESTION: A carpenter is cutting two triangular wooden roof supports. Support 1 has a base beam of 4 meters, with corner angles of $55^\circ$ and $65^\circ$ at each end of the beam. Support 2 has a base beam of 4 meters, but the corner angles measured are $55^\circ$ at one end and $60^\circ$ at the other end. Without cutting new wood, can the carpenter guarantee that both roof supports will be identical in shape and size? Justify your reasoning using congruence criteria.
COMPETENCY: Comparing and justifying geometric criteria in practical applications
STEPS:
- Step 1: Extract the given measurements for Support 1 (Base = 4m, angles $55^\circ$ and $65^\circ$) and Support 2 (Base = 4m, angles $55^\circ$ and $60^\circ$).
- Step 2: Identify the criteria needed for triangle congruence (such as ASA, where both angles and the included side must match).
- Step 3: Compare the corresponding angles: Support 1 has angles $55^\circ$ and $65^\circ$, while Support 2 has $55^\circ$ and $60^\circ$.
- Step 4: Conclude whether congruence is satisfied and explain why.
ANSWER: No, the carpenter cannot guarantee the supports are identical. Although both have a 4-meter base (included side), their second corner angles ($65^\circ$ versus $60^\circ$) do not match. By the ASA criterion, all corresponding angles and the included side must be equal for triangles to be congruent.
DIFFICULTY: medium
## COMPETENCY_QUESTION_2
QUESTION: Two students are given the task of proving $\triangle LMN \cong \triangle RST$. Student A measures $\angle L = 50^\circ$, $\angle M = 70^\circ$, and side $LM = 8\text{ cm}$ for the first triangle, and $\angle R = 50^\circ$, $\angle S = 70^\circ$, and side $RS = 8\text{ cm}$ for the second triangle. Student B claims that they also need to measure side $LN$ and side $RT$ to prove congruence. Evaluate both students' claims using geometric theorems.
COMPETENCY: Error identification and theoretical justification
STEPS:
- Step 1: Analyze Student A's measurements: two angles ($\angle L$, $\angle M$) and the included side ($LM$) for the first triangle, matching two angles ($\angle R$, $\angle S$) and the included side ($RS$) for the second triangle.
- Step 2: Recall the ASA Congruence Criterion definition.
- Step 3: Analyze Student B's claim that extra side measurements are required.
- Step 4: Write down a reasoned judgment validating Student A and correcting Student B.
ANSWER: Student A is correct. According to the ASA Congruence Criterion, knowing two angles and the included side is fully sufficient to prove two triangles congruent. Student B is incorrect because measuring additional sides is unnecessary once ASA conditions are satisfied, as the remaining sides and angles automatically become equal through CPCTC.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: The ASA (Angle-Side-Angle) ______ Criterion states that if two angles and the included side of one triangle are equal to two angles and the included side of another triangle, then the two triangles are congruent.

## DIAGNOSTIC_ANSWER_7
Congruence

**A wrong answer (writing 'Similarity') reveals the student claimed the weak relation - the criterion certifies Congruence, exact same shape and size, which is the blank's word.**

Congruence is the criterion family's name - the blank's capitalised word.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: Imagine you are a surveyor mapping a ______ plot of land in your village schoolyard, and you need to build an identical structure on the other side of the campus without measuring all three sides.

## DIAGNOSTIC_ANSWER_8
triangular

**A wrong answer (writing 'square') reveals the student changed the plot - the surveyor maps a triangular plot of land, and the blank holds that adjective.**

Triangular is the plot the surveyor maps in the village schoolyard.

Triangular is the plot the surveyor maps in the village schoolyard across the campus.

## DIAGNOSTIC_QUESTION_9
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_9
Can identify the included side between two given angles in a triangle, verify ASA congruence conditions, and write formal congruence proofs with corresponding parts (CPCTC).

**A wrong answer ( ASA label only) reveals the student stamped the label - mastery also requires verifying the included side and writing formal proofs with CPCTC.**

Included side, verification, formal proof with CPCTC - the ASA mastery list.

