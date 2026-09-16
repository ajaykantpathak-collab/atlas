## DEFINITION
The number 5 − √3 is irrational. This is proved by contradiction using the sum/difference property: the sum or difference of a non-zero rational number and an irrational number is always irrational. Assume 5 − √3 is rational, say r. Then √3 = 5 − r. Since 5 is rational and r is rational (by assumption), and rational numbers are closed under subtraction, 5 − r is rational. This means √3 is rational, which contradicts the proven fact that √3 is irrational (c10_math_cbse_01_007). Hence 5 − √3 is irrational.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently prove that 5 − √3 is irrational by assuming the contrary, isolating √3, and invoking the closure of rationals under subtraction along with the known irrationality of √3 to derive a contradiction. The student must clearly state each logical step.

## SCOPE_BOUNDARY
This node covers the proof that the difference of a rational number and an irrational number is irrational, applied to 5 − √3. It does NOT cover the product of rational and irrational (c10_math_cbse_01_009) or general proofs for expressions like 2 + 3√5. The method generalises but this node focuses on the sum/difference case.

## WALKTHROUGH
Recall that √3 is irrational (c10_math_cbse_01_007). We also know that rational numbers are closed under addition and subtraction: if you subtract two rationals, you get a rational. Now consider 5 − √3. The number 5 is rational, √3 is irrational. Intuitively, subtracting an irrational from a rational should give something "not rational" — but intuition is not proof. We use contradiction: assume 5 − √3 IS rational, then rearrange to isolate √3. If √3 becomes a difference of two rationals, it must be rational — contradicting what we already proved. This is the standard template for all "rational ± irrational = irrational" proofs.

## DIAGNOSTIC_QUESTION_1
State the closure property of rational numbers under subtraction that is used in this proof.

## DIAGNOSTIC_ANSWER_1
If a and b are rational numbers, then a − b is also rational. A wrong answer (e.g., "rational minus irrational is rational") reveals the student confuses closure (which applies only to operations within the rationals) with cross-set operations.

## DIAGNOSTIC_QUESTION_2
In the proof, after assuming 5 − √3 = r (rational), we write √3 = 5 − r. Explain why this step is valid and why it leads to a contradiction.

## DIAGNOSTIC_ANSWER_2
The step is valid because we simply rearranged the equation (subtracted r from both sides, then swapped). Since 5 is rational and r is rational (by assumption), 5 − r is rational by closure. But this says √3 is rational, contradicting the proven fact that √3 is irrational. A wrong answer (e.g., "we assumed √3 is irrational so it stays irrational") misses that the contradiction arises from the assumption, not from an independent fact.

## DIAGNOSTIC_QUESTION_3
A student argues: "5 is rational, √3 is irrational, so 5 − √3 must be irrational because rational and irrational don't mix." Identify the flaw in this reasoning.

## DIAGNOSTIC_ANSWER_3
The flaw is that "rational and irrational don't mix" is an unproven assertion, not a theorem. While the result is correct, the justification is incomplete. The board exam requires the contradiction argument: assume rational, isolate the irrational, derive contradiction. A wrong answer accepting this as sufficient shows the student does not understand the need for rigorous proof.

## DIAGNOSTIC_QUESTION_4
Is 5 + √3 irrational? Prove it using the same method.

## DIAGNOSTIC_ANSWER_4
Yes. Assume 5 + √3 = r (rational). Then √3 = r − 5. Since r and 5 are rational, r − 5 is rational, so √3 is rational — contradiction. Hence 5 + √3 is irrational. A wrong answer (e.g., "yes, because addition works the same way") without the proof shows the student recognises the pattern but cannot formalise it.

## DIAGNOSTIC_QUESTION_5
Is √3 − 5 irrational? How does this differ from 5 − √3?

## DIAGNOSTIC_ANSWER_5
Yes, √3 − 5 is irrational. Proof: assume √3 − 5 = r (rational). Then √3 = r + 5. Since r and 5 are rational, r + 5 is rational, so √3 is rational — contradiction. It differs from 5 − √3 only in sign; both are irrational because the irrational component √3 cannot be eliminated by adding/subtracting a rational. A wrong answer (e.g., "√3 − 5 = −(5 − √3) so it's rational if 5 − √3 is rational") confuses negation with rationality — the negative of an irrational is still irrational.

## DIAGNOSTIC_QUESTION_6
Prove that 7 − 2√5 is irrational. (Hint: Use the irrationality of √5 and closure of rationals.)

## DIAGNOSTIC_ANSWER_6
Assume 7 − 2√5 = r (rational). Then 2√5 = 7 − r. Since 7 and r are rational, 7 − r is rational, so 2√5 is rational. Then √5 = (7 − r)/2, which is rational (division of rational by non-zero rational 2). But √5 is irrational (proved similarly to √3). Contradiction. Hence 7 − 2√5 is irrational. A poor answer fails to handle the coefficient 2 correctly or forgets that √5 must be proven or assumed irrational.

## COMMON_MISCONCEPTION
Students often assert "rational minus irrational is irrational" as an obvious fact without proof. In the CBSE board exam, this must be proved by contradiction. Another error: after isolating √3 = 5 − r, students forget to state that 5 − r is rational BECAUSE r is rational (by assumption) and 5 is rational, invoking closure. They write "5 − r is rational" without justification, losing a mark.

## ON_FAILURE
1. Revisit the closure properties of rational numbers (c9_math_ch3_3): sum, difference, product, and quotient (by non-zero) of rationals are rational.
2. Walk through a concrete example: if 5 − √3 = 3.2 (a rational), then √3 = 5 − 3.2 = 1.8, which is rational — but √3 ≈ 1.732, contradiction.
3. Practice the template with 3 − √2, 4 + √5, and 6 − 2√7 to internalise the isolation-and-contradiction method.
4. Emphasise: the assumption "5 − √3 is rational" is what we DISPROVE; we do not assume √3 is rational directly.

## PREREQUISITE_NODE_IDS
c10_math_cbse_01_007, c10_math_cbse_01_006, c9_math_ch3_3, c9_math_ch3_5, c10_math_cbse_01_004, c10_math_cbse_01_005

## PREREQUISITE_REASONS
c10_math_cbse_01_007: Provides the proven fact that √3 is irrational, which is the contradiction we derive.
c10_math_cbse_01_006: The proof for √2 irrational is the template; students should be comfortable with contradiction proofs.
c9_math_ch3_3: Defines rational numbers and their closure under arithmetic operations; essential for the step "5 − r is rational".
c9_math_ch3_5: Defines irrational numbers; needed to understand what we are proving about 5 − √3.
c10_math_cbse_01_004: A natural number ends with digit zero if and only if it is divisible by 10, which requires  - earlier chapter node that this node's author flags as feeding into this content.
c10_math_cbse_01_005: If p is a prime number and p divides a² (where a is a positive integer), then p must also  - earlier chapter node that this node's author flags as feeding into this content.

## FORWARD_NODE_IDS
c10_math_cbse_01_009

## FORWARD_REASONS
c10_math_cbse_01_009: Extends to the product case (rational × irrational = irrational), using a similar contradiction structure.

## CROSS_SUBJECT_PREREQS
c9_math_ch3_3, c9_math_ch3_5

## CROSS_SUBJECT_REASONS
c9_math_ch3_3: Closure of rationals under subtraction is the key property invoked when we say "5 − r is rational".
c9_math_ch3_5: The definition of irrational numbers is the classification we are proving 5 − √3 belongs to.
## CHAIN_DESCRIPTION
c10_math_cbse_01_005 -> c10_math_cbse_01_006 -> c10_math_cbse_01_007 -> c10_math_cbse_01_008 -> c10_math_cbse_01_009

## THIS_FORMULA
N/A - conceptual (proof by contradiction)

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch3_3 | Closure of rational numbers under subtraction is the property that forces √3 to be rational under our assumption, creating the contradiction.
c9_math_ch3_5 | The definition of irrational numbers as non-terminating, non-recurring decimals is the set we are proving 5 − √3 belongs to.
## PREREQ_CONCEPT
The closure of rational numbers under subtraction and the proven irrationality of √3.

## PREREQ_BEFORE
The student must be able to state that rational numbers are closed under subtraction and reproduce the proof that √3 is irrational.

## PREREQ_STUCK
Review the closure properties of rationals (c9_math_ch3_3) and the proof that √3 is irrational (c10_math_cbse_01_007). Focus on the isolation step: rearrange to get √3 alone on one side.

## WORKED_EXAMPLE_1
PROBLEM: Prove that 5 − √3 is irrational. (Standard 3-mark CBSE board question.)
STEPS:
- Step 1: Assume, to the contrary, that 5 − √3 is rational. Let 5 − √3 = r, where r is a rational number.
- Step 2: Rearrange to isolate √3: √3 = 5 − r.
- Step 3: Since 5 is rational and r is rational (by assumption), and rational numbers are closed under subtraction, 5 − r is rational.
- Step 4: Therefore √3 = 5 − r is rational. But this contradicts the proven fact that √3 is irrational (c10_math_cbse_01_007).
- Step 5: The contradiction arose from our assumption that 5 − √3 is rational. Hence 5 − √3 is irrational.
REASONING: The proof uses the closure of rationals under subtraction. By assuming 5 − √3 is rational, we can isolate √3 as a difference of two rationals, forcing it to be rational. This contradicts the established irrationality of √3. The structure is: assume rational → isolate irrational → invoke closure → derive contradiction → conclude irrational.
ANSWER: 5 − √3 is irrational.

## WORKED_EXAMPLE_2
PROBLEM: Prove that 3 + 2√5 is irrational.
STEPS:
- Step 1: Assume 3 + 2√5 is rational. Let 3 + 2√5 = r (rational).
- Step 2: Isolate the irrational part: 2√5 = r − 3.
- Step 3: Since r and 3 are rational, r − 3 is rational. So 2√5 is rational.
- Step 4: Then √5 = (r − 3)/2. Since r − 3 is rational and 2 is a non-zero rational, (r − 3)/2 is rational. So √5 is rational.
- Step 5: But √5 is irrational (proved by the same contradiction method as √2 and √3). Contradiction.
- Step 6: Hence 3 + 2√5 is irrational.
REASONING: This extends the template to handle a coefficient (2) on the irrational term. The key additional step is dividing by 2 (a non-zero rational) to isolate √5, using the closure of rationals under division by non-zero rationals. Board exams frequently test this variation.
ANSWER: 3 + 2√5 is irrational.

## WORKED_EXAMPLE_3
PROBLEM: A student claims: "Since 5 is rational and √3 is irrational, 5 − √3 is irrational. No proof needed." The teacher deducts 2 marks. Write the complete proof the student should have given.
STEPS:
- Step 1: State the assumption for contradiction: Let 5 − √3 = r, where r ∈ ℚ (rational).
- Step 2: Rearrange: √3 = 5 − r.
- Step 3: Justify: 5 ∈ ℚ and r ∈ ℚ ⇒ 5 − r ∈ ℚ (closure of rationals under subtraction).
- Step 4: Conclude: So √3 ∈ ℚ, contradicting the theorem that √3 is irrational.
- Step 5: State the result: Therefore 5 − √3 is irrational.
- Step 6: Note: The assertion "rational minus irrational is irrational" is a theorem that itself requires proof by this contradiction method; it cannot be stated without proof in a board exam.
REASONING: This question tests the student's understanding of WHY the proof is necessary. The property "rational ± irrational = irrational" is not an axiom; it is a theorem proved by contradiction. Board marking schemes require the full argument, not just the conclusion.
ANSWER: The complete proof is given in Steps 1-5 above. The student's assertion without proof earns 0 out of 3 marks; with the full proof, 3/3.

## COMPETENCY_QUESTION_1
QUESTION: Prove that 2 − √3 is irrational. Then determine whether (2 − √3)(2 + √3) is rational or irrational, with justification.
COMPETENCY: Combining concepts (irrationality proof and algebraic identities)
STEPS:
- Step 1: Assume 2 − √3 = r (rational). Then √3 = 2 − r, which is rational (closure). Contradiction with √3 irrational. So 2 − √3 is irrational.
- Step 2: Compute (2 − √3)(2 + √3) = 4 − 3 = 1, which is rational.
- Step 3: Note: The product of two irrationals can be rational. This does not contradict the irrationality of either factor.
REASONING: This question combines the contradiction proof with the algebraic identity (a−b)(a+b) = a²−b². It tests whether the student understands that the product of two irrationals is NOT necessarily irrational — a common misconception. The key insight is that irrationality is not preserved under multiplication in general.
ANSWER: 2 − √3 is irrational. (2 − √3)(2 + √3) = 1, which is rational. The product of two irrationals can be rational.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Assertion-Reason:
Assertion (A): 5 − √3 is irrational.
Reason (R): The difference of a rational number and an irrational number is always irrational.
Choose the correct option:
(i) Both A and R are true and R correctly explains A.
(ii) Both A and R are true but R does not explain A.
(iii) A is true but R is false.
(iv) A is false but R is true.
COMPETENCY: Evaluating mathematical reasoning and identifying correct explanation
STEPS:
- Step 1: Check Assertion A: 5 − √3 is irrational. This is TRUE (proved by contradiction: assume rational, isolate √3, derive contradiction).
- Step 2: Check Reason R: "The difference of a rational and an irrational is always irrational." This is TRUE as a theorem, but it is itself proved by the same contradiction method.
- Step 3: Check if R explains A: Yes, R is the general theorem and A is a specific case. R directly explains why A is true.
- Step 4: Select option (i).
REASONING: This is a standard CBSE assertion-reason format. The key is that R is not just true but also provides the correct explanation for A. Some students might choose (ii) thinking R needs separate proof, but in assertion-reason questions, R being a valid theorem that explains A is sufficient.
ANSWER: Option (i) — Both A and R are true and R correctly explains A.
DIFFICULTY: hard
