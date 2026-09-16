## DEFINITION
A set A is a subset of set B, denoted A ⊂ B, if and only if every element of A is also an element of B; formally, A ⊂ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B). If A ⊂ B and A ≠ B (i.e., B contains at least one element not in A), then A is a proper subset of B and B is a superset of A. The empty set φ is a subset of every set, and every set is a subset of itself.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can determine whether a given set is a subset or proper subset of another by verifying the element-wise implication, can correctly use the symbols ⊂ and ⊄ in statements, and can explain why φ ⊂ A and A ⊂ A hold for any set A.

## SCOPE_BOUNDARY
This node covers the definition of subset (⊂), proper subset distinction, the universal properties φ ⊂ A and A ⊂ A, and the relationship between subset and superset. It does NOT cover power sets (cardinality 2ⁿ), intervals as subsets of ℝ, or operations on sets (union, intersection, complement) — those are separate nodes.

## WALKTHROUGH
Imagine your school has a "Science Club" (set S) and a "Robotics Team" (set R). Every member of the Robotics Team is also in the Science Club, but the Science Club has additional members who only do biology projects. Ask: "Is the Robotics Team a subset of the Science Club?" Write down the defining condition: check each robotics member — are they in Science Club? If yes for all, then R ⊂ S. Since Science Club has extra members, R is a proper subset. Now consider: "Is the empty set a subset of the Science Club?" Since there are no members to check, the condition is vacuously true — φ ⊂ S. Finally, "Is Science Club a subset of itself?" Every member of S is in S, so S ⊂ S. This element-wise implication (x ∈ A ⇒ x ∈ B) is the single rule that decides every subset question.

## DIAGNOSTIC_QUESTION_1
State the precise condition that must be satisfied for a set A to be a subset of a set B, using the symbols ∈ and ⇒.

## DIAGNOSTIC_ANSWER_1
A ⊂ B ⇔ (∀x)(x ∈ A ⇒ x ∈ B). A wrong answer like "A ⊂ B means all elements of B are in A" reveals confusion between subset and superset direction. Writing "x ∈ A ∧ x ∈ B" instead of implication shows the student does not grasp the conditional nature of the definition.

## DIAGNOSTIC_QUESTION_2
Let A = {1, 2} and B = {1, 2, 3}. Is A ⊂ B? Is B ⊂ A? Is A a proper subset of B? Justify each answer using the definition.

## DIAGNOSTIC_ANSWER_2
A ⊂ B is true because 1 ∈ A ⇒ 1 ∈ B and 2 ∈ A ⇒ 2 ∈ B. B ⊂ A is false because 3 ∈ B but 3 ∉ A, violating the implication. A is a proper subset of B because A ⊂ B and A ≠ B (3 ∈ B but 3 ∉ A). A student who says "B ⊂ A because B has more elements" confuses cardinality with the subset condition.

## DIAGNOSTIC_QUESTION_3
Given C = {x ∈ ℤ : x² < 10} and D = {−3, −2, −1, 0, 1, 2, 3}. Determine whether C ⊂ D and whether D ⊂ C. Show all steps.

## DIAGNOSTIC_ANSWER_3
C = {x ∈ ℤ : x² < 10} = {−3, −2, −1, 0, 1, 2, 3} because (−3)²=9<10, (−2)²=4<10, (−1)²=1<10, 0²=0<10, 1²=1<10, 2²=4<10, 3²=9<10, but 4²=16≥10. So C = D exactly. Therefore C ⊂ D (true, every element of C is in D) and D ⊂ C (true, every element of D is in C). Since C = D, neither is a proper subset of the other. A student who writes C = {1,2,3} misses negative integers, revealing they forgot ℤ includes negatives.

## DIAGNOSTIC_QUESTION_4
Consider the statement: "For any sets A, B, C, if A ⊂ B and B ⊂ C, then A ⊂ C." Is this always true? Prove your answer or give a counterexample.

## DIAGNOSTIC_ANSWER_4
Yes, always true. Proof: Assume A ⊂ B and B ⊂ C. Let x ∈ A be arbitrary. Since A ⊂ B, x ∈ A ⇒ x ∈ B. Since B ⊂ C, x ∈ B ⇒ x ∈ C. By transitivity of implication, x ∈ A ⇒ x ∈ C. Since x was arbitrary, ∀x(x ∈ A ⇒ x ∈ C), so A ⊂ C. A student who says "false, counterexample: A={1}, B={1,2}, C={2,3}" fails to check that B ⊂ C is false here (1 ∈ B but 1 ∉ C), revealing they don't verify the premise properly.

## DIAGNOSTIC_QUESTION_5
A student writes: "φ ⊄ {1, 2, 3} because the empty set has no elements, so it cannot be a subset of anything." Evaluate this reasoning and correct the error.

## DIAGNOSTIC_ANSWER_5
The reasoning is incorrect. The definition A ⊂ B means ∀x(x ∈ A ⇒ x ∈ B). For A = φ, there is no x such that x ∈ φ, so the implication "x ∈ φ ⇒ x ∈ B" is vacuously true for every x. Hence φ ⊂ B for every set B, including {1, 2, 3}. The student's error is treating "no elements to check" as "condition fails" instead of "condition holds vacuously." This is a classic logical misunderstanding of universal quantification over an empty domain.

## DIAGNOSTIC_QUESTION_6
Construct an example of three sets A, B, C such that A ⊂ B, B ⊄ C, but A ⊂ C. Explain why this does not contradict the transitivity property proved in Question 4.

## DIAGNOSTIC_ANSWER_6
Example: A = {1}, B = {1, 2}, C = {1, 3}. Then A ⊂ B (1 ∈ A ⇒ 1 ∈ B), B ⊄ C (2 ∈ B but 2 ∉ C), but A ⊂ C (1 ∈ A ⇒ 1 ∈ C). This does not contradict transitivity because transitivity requires BOTH A ⊂ B AND B ⊂ C to conclude A ⊂ C. Here B ⊂ C is false, so the premise of transitivity is not satisfied — the conclusion A ⊂ C happens to be true for a different reason (1 happens to be in C). A student who says "this contradicts transitivity" fails to distinguish between "premise false, conclusion true" and "premise true, conclusion false."

## COMMON_MISCONCEPTION
Students often confuse "⊂" (subset) with "∈" (element of). For example, given A = {1, {2, 3}}, they write {2, 3} ⊂ A because they see 2 and 3 "inside" A. The error: {2, 3} is an ELEMENT of A ({2, 3} ∈ A), not a subset. A subset would need its elements (2 and 3) to be directly in A, but 2 ∉ A and 3 ∉ A. Another error: writing φ ∈ A when they mean φ ⊂ A — φ is a subset of every set, but φ is an element only if explicitly listed (e.g., A = {φ, 1, 2}).

## ON_FAILURE
If a student confuses ⊂ and ∈, do this 3-step remediation: (1) Write the definition side-by-side: "x ∈ A means x is one of the objects listed in A" vs "A ⊂ B means every object listed in A is also listed in B." (2) Use a concrete nested set: A = {1, {2, 3}, 4}. Ask: "Is 2 ∈ A? Is {2, 3} ∈ A? Is {2, 3} ⊂ A?" Force them to check each element of {2, 3} against A's elements. (3) Give 5 rapid-fire true/false: {a} ⊂ {a, b}, {a} ∈ {a, b}, φ ⊂ {a}, φ ∈ {a}, {φ} ⊂ {φ, a}. Discuss each until the distinction is automatic.

## PREREQUISITE_NODE_IDS
c11_math_cbse_01_001, c11_math_cbse_01_002, c6_math_ch01_013, c6_math_ch01_014, c6_math_ch01_015, c11_math_cbse_01_003

## PREREQUISITE_REASONS
c11_math_cbse_01_001: Introduces set notation (∈, ∉, roster/set-builder forms) essential for reading subset statements
c11_math_cbse_01_002: Understanding finite/infinite sets and empty set φ is needed for φ ⊂ A and cardinality comparisons
c6_math_ch01_013: Factors and multiples build the intuition of "divisibility" as a subset relation (multiples of 6 ⊂ multiples of 3)
c6_math_ch01_014: Divisibility rules reinforce conditional reasoning (if divisible by 6 then divisible by 3) analogous to x ∈ A ⇒ x ∈ B
c6_math_ch01_015: Prime factorisation and HCF/LCM use set inclusion (prime factors of HCF ⊂ prime factors of each number)
c11_math_cbse_01_003: The concept of equal sets (A = B ⇔ A ⊂ B and B ⊂ A) directly motivates the definition of subset and proper subset.  

## FORWARD_NODE_IDS
c11_math_cbse_01_005, c11_math_cbse_01_006, c11_math_cbse_01_007, c11_math_cbse_01_008, c11_math_cbse_01_009, c11_math_cbse_01_010, c11_math_cbse_01_011, c11_math_cbse_01_012, c11_math_cbse_01_013, c11_math_cbse_01_014, c12_cs_cbse_11_008, c12_math_cbse_01_001

## FORWARD_REASONS
c11_math_cbse_01_005: Intervals as subsets of ℝ directly apply subset notation to real number ranges
c11_math_cbse_01_006: Power set P(A) is the set of ALL subsets of A — requires mastery of subset definition
c11_math_cbse_01_007: Universal set U is the superset containing all subsets under discussion
c11_math_cbse_01_008: Venn diagrams visually represent A ⊂ B as circle A inside circle B
c11_math_cbse_01_009: Union A ∪ B is the smallest superset containing both A and B
c11_math_cbse_01_010: Intersection A ∩ B is the largest subset contained in both A and B
c11_math_cbse_01_011: Difference A − B removes elements of B from A, result is subset of A
c11_math_cbse_01_012: Complement A′ = U − A is a subset of U
c11_math_cbse_01_013: De Morgan's laws relate complements of unions/intersections via subset identities
c11_math_cbse_01_014: Word problems translate "is contained in" or "is part of" into ⊂ relations
c12_cs_cbse_11_008: Subset concept underpins later set operations (union, intersection) in the next node.  
c12_math_cbse_01_001: Subsets are crucial because a relation R is a subset of A × A; understanding subset notation (R ⊆ A × A) and proper subsets is foundational.  

## CROSS_SUBJECT_PREREQS
c9_math_ch1_1, c9_math_ch1_3, c9_math_ch2_1, c9_math_ch3_3, c9_math_ch3_6
## CROSS_SUBJECT_REASONS
c9_math_ch1_1: Cartesian coordinate system defines ℝ² as set of ordered pairs; quadrants are subsets
c9_math_ch1_3: Quadrants partition ℝ² into four subsets based on coordinate signs
c9_math_ch2_1: Linear polynomials define lines; solution sets of linear inequalities are half-plane subsets
c9_math_ch3_3: Rational numbers ℚ are a subset of ℝ; understanding ℚ ⊂ ℝ is foundational
c9_math_ch3_6: Real numbers ℝ = ℚ ∪ T (irrationals); subset relations among number systems

## CHAIN_DESCRIPTION
c11_math_cbse_01_001 -> c11_math_cbse_01_004 -> c11_math_cbse_01_005

## THIS_FORMULA
A ⊂ B ⇔ ∀x (x ∈ A ⇒ x ∈ B)

## FORMULA_VARIABLES
A, B = sets; x = arbitrary element; ∈ = "is an element of"; ⇒ = "implies"; ∀ = "for all"

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_physics_ch2_1 | Kinematics: The set of all possible positions is a superset; the set of positions actually visited is a subset
c11_chemistry_ch1_1 | Some Basic Concepts: The set of all elements is a superset; the set of metals is a subset; the set of alkali metals is a proper subset of metals
c11_biology_ch1_1 | The Living World: Taxonomic hierarchy (Kingdom ⊃ Phylum ⊃ Class ⊃ Order ⊃ Family ⊃ Genus ⊃ Species) is a chain of proper subsets

## PREREQ_CONCEPT
Element membership (∈) and set notation (roster/set-builder) from Introduction to Sets

## PREREQ_BEFORE
The student must be able to read and write set notation, distinguish between an element and a set, and understand the empty set φ.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_01_001 (set notation, ∈/∉, roster/set-builder forms) and practice writing "x ∈ A ⇒ x ∈ B" for simple finite sets.

## WORKED_EXAMPLE_1
PROBLEM: In a Class XI survey, 120 students were asked about their language choices. Let H = {students who study Hindi}, E = {students who study English}, S = {students who study Sanskrit}. Given: H = {h₁, h₂, ..., h₈₀} (80 students), E = {e₁, e₂, ..., e₉₀} (90 students), S = {s₁, s₂, ..., s₃₀} (30 students). Also given: Every Sanskrit student also studies Hindi, and every Hindi student also studies English. Determine all subset relations among H, E, S. State which are proper subsets.

STEPS:
- Step 1: Translate the given statements into set relations. "Every Sanskrit student also studies Hindi" means if x ∈ S then x ∈ H. By definition, this is S ⊂ H.
- Step 2: "Every Hindi student also studies English" means if x ∈ H then x ∈ E. By definition, this is H ⊂ E.
- Step 3: By transitivity of ⊂ (proved in Diagnostic Question 4), since S ⊂ H and H ⊂ E, we get S ⊂ E.
- Step 4: Check properness. S has 30 students, H has 80. Since 30 < 80, S ≠ H, so S is a proper subset of H. H has 80, E has 90, so H ≠ E, thus H is a proper subset of E. S has 30, E has 90, so S ≠ E, thus S is a proper subset of E.
- Step 5: Check reverse inclusions. E ⊄ H because E has 90 students but H only 80 — there exist English students not in Hindi. Similarly H ⊄ S and E ⊄ S.
- Step 6: Also note φ ⊂ S, φ ⊂ H, φ ⊂ E and each set is a subset of itself: S ⊂ S, H ⊂ H, E ⊂ E.

REASONING:
The problem uses real survey data to model subset relations. The key insight is that "every X is also Y" directly translates to X ⊂ Y via the definition x ∈ X ⇒ x ∈ Y. Cardinality comparison (|S| < |H| < |E|) confirms properness because a finite set cannot equal a proper subset. Transitivity chains the relations.

ANSWER:
S ⊂ H (proper), H ⊂ E (proper), S ⊂ E (proper). No other inclusions hold. Also φ ⊂ each set and each set ⊂ itself.

## WORKED_EXAMPLE_2
PROBLEM: Let A = {x ∈ ℤ : x² ≤ 16} and B = {x ∈ ℤ : |x| ≤ 4}. Determine whether A ⊂ B, B ⊂ A, or A = B. Justify by listing elements and checking the definition.

STEPS:
- Step 1: List elements of A. A = {x ∈ ℤ : x² ≤ 16}. Solve x² ≤ 16 for integers: −4 ≤ x ≤ 4. So A = {−4, −3, −2, −1, 0, 1, 2, 3, 4}.
- Step 2: List elements of B. B = {x ∈ ℤ : |x| ≤ 4}. By definition of absolute value, |x| ≤ 4 ⇔ −4 ≤ x ≤ 4. So B = {−4, −3, −2, −1, 0, 1, 2, 3, 4}.
- Step 3: Compare A and B. They have exactly the same elements: A = B.
- Step 4: Apply subset definition. Since A = B, every element of A is in B (A ⊂ B) and every element of B is in A (B ⊂ A).
- Step 5: Check properness. A = B means neither is a proper subset of the other (proper subset requires A ⊂ B and A ≠ B).
- Step 6: Verify the defining condition directly: For any x, x ∈ A ⇔ x² ≤ 16 ⇔ |x| ≤ 4 ⇔ x ∈ B. The conditions are logically equivalent.

REASONING:
This example tests whether students can translate algebraic conditions (x² ≤ 16 vs |x| ≤ 4) into explicit element lists and recognize they define the same set. The equivalence x² ≤ 16 ⇔ |x| ≤ 4 is a key algebraic fact. Writing out elements prevents the common error of assuming x² ≤ 16 only gives positive solutions.

ANSWER:
A = B = {−4, −3, −2, −1, 0, 1, 2, 3, 4}. Therefore A ⊂ B and B ⊂ A both hold, but neither is a proper subset of the other.

## WORKED_EXAMPLE_3
PROBLEM: Let P = {x ∈ ℕ : x is a prime factor of 60}, Q = {x ∈ ℕ : x is a factor of 60}, R = {x ∈ ℕ : x is a multiple of 5 and x ≤ 60}. Determine all true subset relations among P, Q, R. For each, state whether it is proper.

STEPS:
- Step 1: Find prime factorisation of 60: 60 = 2² × 3 × 5.
- Step 2: List P (prime factors of 60): P = {2, 3, 5}.
- Step 3: List Q (all factors of 60): Factors are 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60. So Q = {1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60}.
- Step 4: List R (multiples of 5 ≤ 60): 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60. So R = {5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60}.
- Step 5: Check P ⊂ Q? Every element of P (2, 3, 5) is in Q. Yes, P ⊂ Q. Since 1 ∈ Q but 1 ∉ P, P ≠ Q, so P is a proper subset of Q.
- Step 6: Check Q ⊂ P? 4 ∈ Q but 4 ∉ P (4 is not prime). So Q ⊄ P.
- Step 7: Check P ⊂ R? 2 ∈ P but 2 ∉ R (2 is not a multiple of 5). So P ⊄ R.
- Step 8: Check R ⊂ P? 10 ∈ R but 10 ∉ P. So R ⊄ P.
- Step 9: Check Q ⊂ R? 2 ∈ Q but 2 ∉ R. So Q ⊄ R.
- Step 10: Check R ⊂ Q? 25 ∈ R but 25 ∉ Q (25 does not divide 60). So R ⊄ Q.
- Step 11: Check intersections: P ∩ R = {5}. Q ∩ R = {5, 10, 15, 20, 30, 60}. No subset relations except P ⊂ Q and the trivial φ ⊂ each, each ⊂ itself.

REASONING:
This problem combines number theory (factors, multiples, primes) with subset reasoning. Students must compute each set explicitly from the defining properties, then apply the element-wise definition. The trick is that R contains 25, 35, etc. which are multiples of 5 but not factors of 60, breaking R ⊂ Q. Meanwhile P ⊂ Q holds because every prime factor is a factor — a fundamental number theory fact.

ANSWER:
Only non-trivial subset relation: P ⊂ Q (proper). All others false. Trivial: φ ⊂ P, φ ⊂ Q, φ ⊂ R; P ⊂ P, Q ⊂ Q, R ⊂ R.

## COMPETENCY_QUESTION_1
QUESTION: A teacher defines three sets based on a class of 40 students:
M = {students who play cricket}, N = {students who play football}, P = {students who play both cricket and football}.
The teacher claims: "P ⊂ M and P ⊂ N are always true, but M ⊂ N may or may not be true." 
(a) Prove that P ⊂ M and P ⊂ N are always true using the definition of subset.
(b) Give a concrete example (with numbers) where M ⊂ N is true, and another where M ⊂ N is false.
(c) If |M| = 25, |N| = 20, and |P| = 15, can M ⊂ N be true? Justify using cardinality.

COMPETENCY:
Translating real-world situations to mathematical expressions and justifying with definitions

STEPS:
- Step 1: Understand that P = M ∩ N by definition ("students who play both").
- Step 2: For (a), take any x ∈ P. By definition of P, x plays both cricket and football, so x ∈ M and x ∈ N. Thus x ∈ P ⇒ x ∈ M and x ∈ P ⇒ x ∈ N. Hence P ⊂ M and P ⊂ N.
- Step 3: For (b), example where M ⊂ N: M = {1,2,3}, N = {1,2,3,4,5} (all cricket players also play football). Example where false: M = {1,2,3,4}, N = {3,4,5} (student 1 plays cricket but not football).
- Step 4: For (c), if M ⊂ N were true, then |M| ≤ |N| because every element of M is in N. But |M| = 25 > 20 = |N|, contradiction. So M ⊂ N cannot be true.

ANSWER:
(a) P = M ∩ N ⇒ ∀x(x ∈ P ⇒ x ∈ M ∧ x ∈ N) ⇒ P ⊂ M and P ⊂ N. (b) True: M={1,2}, N={1,2,3}; False: M={1,2}, N={2,3}. (c) No, because M ⊂ N implies |M| ≤ |N|, but 25 > 20.

DIFFICULTY:
medium

## COMPETENCY_QUESTION_2
QUESTION: Consider the following statements about sets A, B, C. For each, determine if it is ALWAYS true, SOMETIMES true, or NEVER true. Justify each with a proof or counterexample.
(i) If A ⊂ B and B ⊂ C, then A ⊂ C.
(ii) If A ⊂ B and B ⊄ C, then A ⊄ C.
(iii) If A ⊄ B and B ⊄ C, then A ⊄ C.
(iv) (A ⊂ B) ∧ (B ⊂ A) ⇔ A = B.
(v) φ ⊂ A for every set A.
(vi) {φ} ⊂ A for every set A.

COMPETENCY:
Comparing and justifying logical statements; distinguishing universal from existential claims

STEPS:
- Step 1: (i) ALWAYS true — proved in Diagnostic Question 4 via transitivity of implication.
- Step 2: (ii) SOMETIMES true. Counterexample where false: A={1}, B={1,2}, C={1}. Here A⊂B, B⊄C (2∉C), but A⊂C (1∈C). Example where true: A={1}, B={1,2}, C={3}. A⊂B, B⊄C, A⊄C.
- Step 3: (iii) SOMETIMES true. Counterexample where false: A={1}, B={2}, C={1}. A⊄B, B⊄C, but A⊂C. Example where true: A={1}, B={2}, C={3}. All three incomparable.
- Step 4: (iv) ALWAYS true — this is the definition of set equality (A ⊂ B and B ⊂ A ⇔ A = B).
- Step 5: (v) ALWAYS true — vacuous truth: no x ∈ φ, so ∀x(x ∈ φ ⇒ x ∈ A) holds.
- Step 6: (vi) NEVER true (unless φ ∈ A). {φ} ⊂ A means φ ∈ A. But φ is not an element of every set (e.g., A={1,2} has elements 1,2, not φ). So false in general.

ANSWER:
(i) ALWAYS (transitivity). (ii) SOMETIMES (counterexample: A={1},B={1,2},C={1}). (iii) SOMETIMES (counterexample: A={1},B={2},C={1}). (iv) ALWAYS (definition of equality). (v) ALWAYS (vacuous truth). (vi) NEVER (requires φ ∈ A, not generally true).

DIFFICULTY:
hard