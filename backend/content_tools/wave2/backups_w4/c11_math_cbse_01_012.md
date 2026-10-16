## ELI5
Attendance time: U is all 40 students, A the present list - the complement A' is the absent list at once, everyone in U but not in A. Formally A' = {x : x ∈ U and x ∉ A}, equally written U − A. The complement exists only after U is chosen: without a declared universe, not-in-A is meaningless. Verify with the two laws: A ∪ A' = U and A ∩ A' = φ - together the two lists rebuild the class, and they overlap nowhere.

## DEFINITION
The complement of a set \(A\) with respect to a universal set \(U\) is the set of all elements of \(U\) that are not in \(A\), denoted by \(A'\) or \(A^c\). Formally, \(A' = \{x \mid x \in U \text{ and } x \notin A\}\). This operation is defined only when a universal set \(U\) is specified, and \(A \subseteq U\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can find the complement of a given subset within a specified universal set, verify the complement laws (\(A \cup A' = U\), \(A \cap A' = \varnothing\)), apply De Morgan's laws to simplify expressions involving complements of unions and intersections, and solve word problems by translating them into set operations with complements.

## SCOPE_BOUNDARY
This node covers the definition of complement relative to a universal set, the four complement laws (complement laws, De Morgan's laws, double complementation, laws of \(\varnothing\) and \(U\)), and their verification using Venn diagrams and algebraic reasoning. It does NOT cover symmetric difference, Cartesian products, or advanced set-theoretic constructions beyond the Class 11 NCERT syllabus.

## WALKTHROUGH
Imagine a Class XI teacher taking attendance: the universal set \(U\) is the list of all 40 students in the class. The set \(A\) is the list of students present today. The complement \(A'\) instantly gives the absent students — exactly those in \(U\) but not in \(A\). To begin any complement problem, first write down the universal set \(U\) explicitly (or describe it clearly). Next, write the subset \(A\). Then list every element of \(U\) that is not in \(A\); that list is \(A'\). This mirrors the difference operation \(U - A\) studied earlier. The key insight is that the complement is always relative to a chosen universal set — without \(U\), the complement is undefined.

Takeaway: mastery means U being stated first, the complement computed as U − A, and the complement laws plus De Morgan's consequences used to simplify expressions. Exam moves: find-the-complement questions and verify-the-complement-laws items, plus word problems translated into complement language. Check yourself: the same A gains a different A' in every new universe - complements are relative, never absolute. Students miss it because they treat not-in-A as a global negative, when the definition scopes it inside U: the absent list is measured against the class roll, not against humanity.

## DIAGNOSTIC_QUESTION_1
State the definition of the complement of a set \(A\) with respect to a universal set \(U\) using set-builder notation.

## DIAGNOSTIC_ANSWER_1
The complement of \(A\) is \(A' = \{x \mid x \in U \text{ and } x \notin A\}\). A wrong answer (e.g., \(A' = \{x \mid x \notin A\}\) without mentioning \(U\)) reveals that the student thinks complement is absolute, not relative to a universal set — a fundamental misconception that leads to errors when the universal set changes.

## DIAGNOSTIC_QUESTION_2
Explain why \((A')' = A\) for any subset \(A\) of a universal set \(U\). Use the definition of complement in your reasoning.

## DIAGNOSTIC_ANSWER_2
By definition, \(A' = \{x \in U \mid x \notin A\}\). Then \((A')' = \{x \in U \mid x \notin A'\}\). But \(x \notin A'\) means it is false that (\(x \in U\) and \(x \notin A\)), i.e., \(x \notin U\) or \(x \in A\). Since we only consider \(x \in U\), this simplifies to \(x \in A\). Hence \((A')' = A\). A wrong answer (e.g., "it's obvious" without using the definition) shows the student cannot connect the double complement to the logical negation of a negation.

## DIAGNOSTIC_QUESTION_3
Let \(U = \{1,2,3,4,5,6,7,8,9,10\}\), \(A = \{2,4,6,8,10\}\), \(B = \{1,3,5,7,9\}\). Find \(A'\), \(B'\), \(A \cup B\), and \((A \cup B)'\). Verify that \((A \cup B)' = A' \cap B'\).

## DIAGNOSTIC_ANSWER_3
\(A' = \{1,3,5,7,9\}\), \(B' = \{2,4,6,8,10\}\), \(A \cup B = U\), so \((A \cup B)' = \varnothing\). \(A' \cap B' = \varnothing\). Hence \((A \cup B)' = A' \cap B'\). A wrong answer (e.g., claiming \((A \cup B)' = A' \cup B'\)) indicates the student has confused De Morgan's law for union with the incorrect "distributive" version.

## DIAGNOSTIC_QUESTION_4
Given \(U = \{x \in \mathbb{N} \mid x \le 12\}\), \(A = \{x \in U \mid x \text{ is a multiple of } 3\}\), \(B = \{x \in U \mid x \text{ is a multiple of } 4\}\). Without listing all elements, explain why \((A \cap B)' = A' \cup B'\) must hold.

## DIAGNOSTIC_ANSWER_4
By definition, \(x \in (A \cap B)' \iff x \in U \text{ and } x \notin (A \cap B) \iff x \in U \text{ and } (x \notin A \text{ or } x \notin B) \iff (x \in U \text{ and } x \notin A) \text{ or } (x \in U \text{ and } x \notin B) \iff x \in A' \cup B'\). A wrong answer (e.g., "because the Venn diagram looks the same") shows the student relies on visual intuition without understanding the logical equivalence that drives De Morgan's laws.

## DIAGNOSTIC_QUESTION_5
Give the correct order of steps to check a student's claim that the complement of a union equals the union of complements.

## DIAGNOSTIC_ANSWER_5
The check runs: (1) Compute the union of the two sets inside the universal set (2) Complement that union by listing what the union misses (3) Compute each set's complement separately and intersect them (4) Compare the two results and correct the conclusion to De Morgan's law with an intersection. A wrong answer that keeps the union on the right shows the student has swapped the two De Morgan identities from memory.

## DIAGNOSTIC_QUESTION_6
Create a real-life problem (in an Indian school context) where finding the complement of a set is necessary to answer the question. Define \(U\), \(A\), and the question clearly.

## DIAGNOSTIC_ANSWER_6
Example: In a school of 500 students (\(U\)), 320 students opted for Mathematics (\(A\)). The principal wants to know how many students did NOT opt for Mathematics to plan alternative classes. The answer is \(n(A') = n(U) - n(A) = 180\). A poor answer would omit the universal set or ask a question that doesn't require complement (e.g., "how many opted for Mathematics?"). This tests whether the student can recognise a complement situation in context.

## COMMON_MISCONCEPTION
Students often treat the complement as an absolute concept, writing \(A' = \{x \mid x \notin A\}\) without referencing the universal set \(U\). This leads to errors when the universal set changes (e.g., if \(U = \mathbb{N}\) vs \(U = \mathbb{Z}\)). Another frequent error is misstating De Morgan's laws as \((A \cup B)' = A' \cup B'\) and \((A \cap B)' = A' \cap B'\) — essentially forgetting to swap \(\cup\) and \(\cap\). A third error is assuming \(A \cap A' = A\) instead of \(\varnothing\), confusing complement with intersection.

## ON_FAILURE
If a student writes \(A' = \{x \mid x \notin A\}\), ask: "If \(U = \{1,2,3\}\) and \(A = \{1\}\), what is \(A'\)? Now if \(U = \{1,2,3,4,5\}\) and \(A = \{1\}\), is \(A'\) the same? Why does the universal set matter?" Guide them to rewrite the definition as \(A' = U - A\) and practise with two different universal sets for the same \(A\). For De Morgan confusion, have them test both versions with a concrete small example (e.g., \(U=\{1,2,3,4\}\), \(A=\{1,2\}\), \(B=\{2,3\}\)) and see which equality holds. Repeat until they internalise the swap of \(\cup\) and \(\cap\).

## PREREQUISITE_NODE_IDS
c11_math_cbse_01_007, c11_math_cbse_01_011, c11_math_cbse_01_009, c11_math_cbse_01_010, c11_math_cbse_01_008, c11_math_cbse_01_004, c11_math_cbse_01_005

## PREREQUISITE_REASONS
c11_math_cbse_01_007: Universal set definition is required because complement is defined relative to \(U\).
c11_math_cbse_01_011: Complement is exactly the difference \(U - A\); understanding difference of sets is essential.
c11_math_cbse_01_009: Union appears in De Morgan's law \((A \cup B)' = A' \cap B'\).
c11_math_cbse_01_010: Intersection appears in De Morgan's law \((A \cap B)' = A' \cup B'\).
c11_math_cbse_01_008: Venn diagrams are used to visually verify complement properties.
c11_math_cbse_01_004: Complement A′ = U − A is a subset of U  
c11_math_cbse_01_005: Complement of an interval within U = R (e.g., complement of [2,5] is (-∞,2) ∪ (5,∞)).  

## FORWARD_NODE_IDS
c11_math_cbse_01_013, c11_math_cbse_01_014, c12_cs_cbse_05_005, c12_math_cbse_13_001, c12_math_cbse_13_002

## FORWARD_REASONS
c11_math_cbse_01_013: De Morgan's laws are stated and proved here; they are the central properties of complement.
c11_math_cbse_01_014: Word problems on sets often require finding "neither/nor" categories, which are complements of unions.
c12_cs_cbse_05_005: Complement of a set (NOT IN is set difference).  
c12_math_cbse_13_001: Complement of a set is used in Property 3 (P(E'|F) = 1 - P(E|F)) in the next node.  
c12_math_cbse_13_002: Complement of a set is essential for Property 3 (P(E′|F) = 1 − P(E|F)).  

## CROSS_SUBJECT_PREREQS
c9_math_ch7_8, c10_math_cbse_14_005
## CROSS_SUBJECT_REASONS
c9_math_ch7_8: Complementary events in probability (\(P(E') = 1 - P(E)\)) directly mirror the set complement law \(A \cup A' = U\) with \(n(A') = n(U) - n(A)\).
c10_math_cbse_14_005: The formula \(P(E) + P(\text{not } E) = 1\) is the probabilistic analogue of the complement laws for sets.

## CHAIN_DESCRIPTION
c11_math_cbse_01_007 -> c11_math_cbse_01_012 -> c11_math_cbse_01_013

## THIS_FORMULA
\(A' = \{x \mid x \in U \text{ and } x \notin A\}\) or equivalently \(A' = U - A\)

## FORMULA_VARIABLES
\(U\) = universal set (a fixed set containing all elements under consideration), \(A\) = any subset of \(U\) (\(A \subseteq U\)), \(A'\) = complement of \(A\) with respect to \(U\).

## FORMULA_UNITS
dimensionless (sets contain elements, not physical quantities)

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c9_math_ch7_8 | The complement of an event in probability uses the same set-theoretic complement: the event "not E" is exactly the complement of E within the sample space U.
c10_math_cbse_14_005 | The identity P(E) + P(not E) = 1 is the probability version of the complement law A ∪ A' = U when the universal set is the sample space and probabilities are normalised.

## PREREQ_CONCEPT
Understanding of universal set and set difference (\(U - A\)).

## PREREQ_BEFORE
The student must be able to identify the universal set in a given context and compute the difference \(U - A\) for given sets \(U\) and \(A\).

## PREREQ_STUCK
Revisit universal set (c11_math_cbse_01_007) and difference of sets (c11_math_cbse_01_011) with concrete examples.

## WORKED_EXAMPLE_1
PROBLEM: In a Class XI section, the universal set \(U\) consists of the roll numbers of all 30 students: \(U = \{1,2,3,\dots,30\}\). The set \(A\) represents students who participated in the Science Exhibition: \(A = \{3,5,7,9,11,13,15,17,19,21\}\). Find the complement \(A'\) and interpret the result. Also verify the complement laws \(A \cup A' = U\) and \(A \cap A' = \varnothing\).

STEPS:
- Step 1: Write down the universal set \(U = \{1,2,3,\dots,30\}\) and the subset \(A = \{3,5,7,9,11,13,15,17,19,21\}\).
- Step 2: Recall the definition \(A' = \{x \in U \mid x \notin A\}\). This means we list every element of \(U\) that is not in \(A\).
- Step 3: List the elements of \(U\) not in \(A\): \(1,2,4,6,8,10,12,14,16,18,20,22,23,24,25,26,27,28,29,30\). So \(A' = \{1,2,4,6,8,10,12,14,16,18,20,22,23,24,25,26,27,28,29,30\}\).
- Step 4: Verify \(A \cup A'\): combining the two sets gives all numbers from 1 to 30, which is exactly \(U\). Hence \(A \cup A' = U\).
- Step 5: Verify \(A \cap A'\): there is no roll number that is both in \(A\) and not in \(A\), so the intersection is empty: \(A \cap A' = \varnothing\).

REASONING: The complement directly answers "who did NOT participate?" by taking the universal set of all students and removing the participants. The complement laws are verified by checking that every element of \(U\) is either in \(A\) or in \(A'\) (union gives \(U\)) and no element can be in both (intersection gives \(\varnothing\)).

ANSWER: \(A' = \{1,2,4,6,8,10,12,14,16,18,20,22,23,24,25,26,27,28,29,30\}\); these are the 20 students who did not participate. Complement laws hold.

## WORKED_EXAMPLE_2
PROBLEM: Let \(U = \{x \in \mathbb{N} \mid x \le 12\}\), \(A = \{x \in U \mid x \text{ is a multiple of } 3\}\), \(B = \{x \in U \mid x \text{ is a multiple of } 4\}\). Find \((A \cup B)'\) and verify De Morgan's law \((A \cup B)' = A' \cap B'\) by computing both sides.

STEPS:
- Step 1: Write \(U\), \(A\), and \(B\) in roster form. \(U = \{1,2,3,4,5,6,7,8,9,10,11,12\}\). \(A = \{3,6,9,12\}\). \(B = \{4,8,12\}\).
- Step 2: Compute \(A \cup B = \{3,4,6,8,9,12\}\).
- Step 3: Find \((A \cup B)' = U - (A \cup B) = \{1,2,5,7,10,11\}\).
- Step 4: Find \(A' = U - A = \{1,2,4,5,7,8,10,11\}\). Find \(B' = U - B = \{1,2,3,5,6,7,9,10,11\}\).
- Step 5: Compute \(A' \cap B' = \{1,2,5,7,10,11\}\).
- Step 6: Compare: \((A \cup B)' = \{1,2,5,7,10,11\} = A' \cap B'\). De Morgan's law is verified.

REASONING: De Morgan's law for union states that the complement of a union is the intersection of the complements. By explicitly listing elements, we see that an element is outside \(A \cup B\) exactly when it is outside \(A\) AND outside \(B\), i.e., in both \(A'\) and \(B'\).

ANSWER: \((A \cup B)' = \{1,2,5,7,10,11\}\) and \(A' \cap B' = \{1,2,5,7,10,11\}\); they are equal.

## WORKED_EXAMPLE_3
PROBLEM: In a survey of 200 students of a school, 120 students like Cricket (\(C\)), 90 like Football (\(F\)), and 40 like both Cricket and Football. The universal set \(U\) is the set of all 200 surveyed students. How many students like neither Cricket nor Football? Use the complement of the union.

STEPS:
- Step 1: Define the sets: \(U\) = all 200 students, \(C\) = students who like Cricket, \(F\) = students who like Football. Given: \(n(U)=200\), \(n(C)=120\), \(n(F)=90\), \(n(C \cap F)=40\).
- Step 2: We need the number of students who like neither Cricket nor Football. This is the complement of \(C \cup F\), i.e., \(n((C \cup F)')\).
- Step 3: Use the inclusion-exclusion principle to find \(n(C \cup F)\): \(n(C \cup F) = n(C) + n(F) - n(C \cap F) = 120 + 90 - 40 = 170\).
- Step 4: Apply the complement law: \(n((C \cup F)') = n(U) - n(C \cup F) = 200 - 170 = 30\).
- Step 5: Interpret: 30 students like neither Cricket nor Football.
- Step 6: (Optional) Verify using a Venn diagram: region outside both circles has 30.

REASONING: The phrase "neither Cricket nor Football" means the student is not in \(C\) and not in \(F\), i.e., not in \(C \cup F\). The complement of \(C \cup F\) within the universal set of all surveyed students gives exactly that group. Using the complement law \(n(A') = n(U) - n(A)\) with \(A = C \cup F\) yields the answer efficiently.

ANSWER: 30 students like neither Cricket nor Football.

## COMPETENCY_QUESTION_1
QUESTION: A student claims that for any two sets \(A\) and \(B\), \((A \cap B)' = A' \cap B'\). Is this statement correct? If yes, prove it. If not, give a counterexample with a specific universal set \(U\) and sets \(A, B\) where the equality fails.

COMPETENCY: Comparing and justifying

STEPS:
- Step 1: Understand the claim: the student says complement of intersection equals intersection of complements.
- Step 2: Recall the correct De Morgan's law: \((A \cap B)' = A' \cup B'\) (union, not intersection).
- Step 3: Test with a simple concrete example. Let \(U = \{1,2,3,4\}\), \(A = \{1,2\}\), \(B = \{2,3\}\).
- Step 4: Compute \((A \cap B) = \{2\}\), so \((A \cap B)' = \{1,3,4\}\).
- Step 5: Compute \(A' = \{3,4\}\), \(B' = \{1,4\}\). Then \(A' \cap B' = \{4\}\).
- Step 6: Compare: \((A \cap B)' = \{1,3,4\} \neq \{4\} = A' \cap B'\). The claim is false.
- Step 7: State the correct law: \((A \cap B)' = A' \cup B'\).

ANSWER: The claim is incorrect. Counterexample: \(U=\{1,2,3,4\}, A=\{1,2\}, B=\{2,3\}\) gives \((A \cap B)' = \{1,3,4\}\) but \(A' \cap B' = \{4\}\). The correct De Morgan's law is \((A \cap B)' = A' \cup B'\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In a school, there are 500 students in Class XI. 300 students study Hindi, 200 study Sanskrit, and 80 study both Hindi and Sanskrit. The school introduces a new elective, French. 50 students opt for French, and it is known that none of these 50 students study Hindi or Sanskrit. Find the number of students who study NONE of the three languages (Hindi, Sanskrit, French). Show all steps using set operations and complement laws.

COMPETENCY: Translating real-world situations to mathematical expressions

STEPS:
- Step 1: Define universal set \(U\) = all 500 Class XI students. Let \(H\) = set of students studying Hindi, \(S\) = Sanskrit, \(F\) = French.
- Step 2: Given: \(n(U)=500\), \(n(H)=300\), \(n(S)=200\), \(n(H \cap S)=80\), \(n(F)=50\). Also given: \(F \cap H = \varnothing\) and \(F \cap S = \varnothing\) (French students study neither Hindi nor Sanskrit).
- Step 3: We need \(n((H \cup S \cup F)')\) = students studying none of the three.
- Step 4: Since \(F\) is disjoint from both \(H\) and \(S\), \(n(H \cup S \cup F) = n(H \cup S) + n(F)\).
- Step 5: Compute \(n(H \cup S) = n(H) + n(S) - n(H \cap S) = 300 + 200 - 80 = 420\).
- Step 6: Then \(n(H \cup S \cup F) = 420 + 50 = 470\).
- Step 7: Apply complement law: \(n((H \cup S \cup F)') = n(U) - n(H \cup S \cup F) = 500 - 470 = 30\).
- Step 8: Interpret: 30 students study none of the three languages.

ANSWER: 30 students study none of the three languages.

DIFFICULTY: hard