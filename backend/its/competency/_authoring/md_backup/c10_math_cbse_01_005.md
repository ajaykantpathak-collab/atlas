## DEFINITION
If p is a prime number and p divides a² (where a is a positive integer), then p must also divide a. In other words, if a prime number divides the square of an integer, it necessarily divides the integer itself.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can state the theorem precisely, explain why it holds using the Fundamental Theorem of Arithmetic, and apply it to prove that numbers like √2, √3, √5 are irrational by showing that if a prime divides the square, it must divide the base integer, leading to a contradiction with coprimality.

## SCOPE_BOUNDARY
Covers the statement, proof, and application of the theorem "If p is prime and p|a² then p|a" for positive integers a. Does NOT cover the irrationality proofs themselves (those are separate nodes c10_math_cbse_01_006 onwards), nor does it cover cases where p is composite (the theorem fails for composites, e.g., 4 divides 6² but 4 does not divide 6).

## WALKTHROUGH
Imagine you are packing 36 identical square tiles (6×6) into boxes. If a prime number of boxes, say 3, exactly divides the total tiles, then 3 must also divide the side length 6. Why? Because 36 = 6×6, and if 3 divides 6×6, by the Fundamental Theorem of Arithmetic (unique prime factorization), the prime 3 must appear in the factorization of 6. Start by writing a as a product of primes: a = p₁p₂...pₖ. Then a² = p₁²p₂²...pₖ². If prime p divides a², p must be one of the pᵢ, hence p divides a. This insight is the engine that drives all irrationality proofs in Class 10.

## DIAGNOSTIC_QUESTION_1
State the theorem: "If p is a prime number and p divides a², then p divides a." Is the converse true? That is, if p divides a, does p always divide a²?

## DIAGNOSTIC_ANSWER_1
Yes, the converse is true. If p divides a, then a = p·k for some integer k. Then a² = p²·k² = p·(p·k²), so p divides a². A wrong answer (saying converse is false) reveals the student confuses the direction of implication and does not understand that divisibility is preserved under multiplication.

## DIAGNOSTIC_QUESTION_2
Why does the theorem require p to be prime? Give a counterexample showing the statement fails if p is composite.

## DIAGNOSTIC_ANSWER_2
The theorem fails for composites because a composite number's prime factors can be split between the two factors of a². Counterexample: Let p = 4 (composite), a = 6. Then a² = 36, and 4 divides 36, but 4 does not divide 6. A wrong answer (e.g., "it works for all numbers") shows the student has not grasped the role of unique prime factorization and the definition of prime numbers.

## DIAGNOSTIC_QUESTION_3
Let a = 180. Find all prime numbers p such that p divides a². For each such p, verify that p divides a.

## DIAGNOSTIC_ANSWER_3
a = 180 = 2² × 3² × 5¹. So a² = 2⁴ × 3⁴ × 5². The primes dividing a² are 2, 3, 5. Each of these divides 180. A wrong answer (missing a prime, or including a non-prime) reveals the student cannot correctly perform prime factorization or does not connect the theorem to the factorization of a.

## DIAGNOSTIC_QUESTION_4
Suppose p is a prime and p divides a² + b². Can we conclude that p divides a and p divides b? Justify your answer with an example or proof.

## DIAGNOSTIC_ANSWER_4
No, we cannot conclude that. The theorem only applies when a prime divides a perfect square of a single integer. For example, p = 5, a = 1, b = 2: a² + b² = 1 + 4 = 5, and 5 divides 5, but 5 does not divide 1 and 5 does not divide 2. A wrong answer (saying yes) shows the student overgeneralizes the theorem to sums of squares, confusing it with properties of Gaussian integers or misapplying the logic.

## DIAGNOSTIC_QUESTION_5
A student claims: "Since 9 divides 15² (225), by the theorem 9 must divide 15." Identify the error in the student's reasoning and correct it.

## DIAGNOSTIC_ANSWER_5
The error is that 9 is not a prime number (9 = 3²). The theorem only applies when p is prime. Indeed, 9 divides 225 but 9 does not divide 15. The correct statement: The prime 3 divides 15², so 3 divides 15 (which is true). A wrong answer (not identifying the primality condition) shows the student memorizes the statement without the crucial hypothesis "p is prime".

## DIAGNOSTIC_QUESTION_6
Construct a new problem: Find a positive integer a and a prime p such that p divides a² but p does NOT divide a. If impossible, explain why.

## DIAGNOSTIC_ANSWER_6
It is impossible. By the theorem, if p is prime and p|a², then p|a always. Any attempt to find such a pair will fail. A student who provides an example (e.g., a=6, p=4) has missed the condition that p must be prime. This reveals they treat the theorem as a pattern without understanding the logical necessity of the prime condition.

## COMMON_MISCONCEPTION
Students often forget the condition "p is prime" and apply the theorem to composite numbers. For example, they see 4 divides 6² = 36 and incorrectly conclude 4 divides 6. They also confuse the direction: they think "if p divides a then p divides a²" is the same theorem, but that is the converse (which is true but trivial). The critical board-exam error is using this theorem to prove irrationality without explicitly stating "since p is prime" and "by the theorem, p divides a", losing the 1 mark for the theorem statement and 1 mark for the logical step.

## ON_FAILURE
If the student forgets the prime condition, ask: "Does 4 divide 6²? Does 4 divide 6? So why does the theorem not apply?" Then guide them to write the prime factorization of 6 and 36, and see that 4 = 2², but the prime 2 appears squared in 36 and only once in 6. Emphasize: The theorem is about a SINGLE prime factor appearing in the square. Have them re-state the theorem aloud with emphasis on "p is prime". Then give 3 quick practice pairs: (p=2, a=10), (p=4, a=10), (p=5, a=15) and ask which satisfy the hypothesis and conclusion.

## PREREQUISITE_NODE_IDS
c10_math_cbse_01_001, c6_math_ch01_013, c6_math_ch01_014, c6_math_ch01_015, c10_math_cbse_01_004

## PREREQUISITE_REASONS
c10_math_cbse_01_001: The Fundamental Theorem of Arithmetic (unique prime factorization) is the foundational proof of this theorem; without it, the theorem cannot be justified.
c6_math_ch01_013: Understanding factors and multiples is essential to grasp what "p divides a" means.
c6_math_ch01_014: Divisibility rules help students quickly test examples and build intuition for the theorem.
c6_math_ch01_015: Prime factorization, HCF, and LCM from Class 6 provide the concrete skill of breaking numbers into primes, which is used directly in the proof.
c10_math_cbse_01_004: A natural number ends with digit zero if and only if it is divisible by 10, which requires  - earlier chapter node that this node's author flags as feeding into this content.

## FORWARD_NODE_IDS
c10_math_cbse_01_006, c10_math_cbse_01_007, c10_math_cbse_01_008, c10_math_cbse_01_009

## FORWARD_REASONS
c10_math_cbse_01_006: The proof that √2 is irrational uses this theorem to deduce that if 2 divides a² then 2 divides a, leading to a contradiction with coprimality.
c10_math_cbse_01_007: Similarly, the proof for √3 uses the theorem with p=3.
c10_math_cbse_01_008: Proving 5 - √3 irrational relies on the irrationality of √3, which in turn uses this theorem.
c10_math_cbse_01_009: Proving 3√2 irrational uses the product property and the irrationality of √2, which depends on this theorem.

## CROSS_SUBJECT_PREREQS
c6_math_ch01_013, c6_math_ch01_015, c8_math_ch2_6

## CROSS_SUBJECT_REASONS
c6_math_ch01_013: Factors and multiples concept is the basis of divisibility used in this theorem.
c6_math_ch01_015: Prime factorization is the key tool to prove and apply the theorem.
c8_math_ch2_6: Prime factorization in exponential form (Class 8) directly supports writing a and a² in prime factorized form to see the exponent doubling.
## CHAIN_DESCRIPTION
c6_math_ch01_015 -> c10_math_cbse_01_001 -> c10_math_cbse_01_005 -> c10_math_cbse_01_006

## THIS_FORMULA
Theorem: Let p be a prime number and a be a positive integer. If p | a², then p | a. (Where "|" denotes "divides")

## FORMULA_VARIABLES
p = a prime number; a = a positive integer; a² = square of a; "|" = "divides" (i.e., there exists integer k such that a² = p·k)

## FORMULA_UNITS
dimensionless (pure number theory)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c10_math_cbse_01_001 | Fundamental Theorem of Arithmetic provides the unique prime factorization proof for this theorem.
c10_math_cbse_01_006 | This theorem is the critical step in the contradiction proof that √2 is irrational.
## PREREQ_CONCEPT
Unique prime factorization (Fundamental Theorem of Arithmetic) and the definition of a prime number.

## PREREQ_BEFORE
The student must be able to write any positive integer as a product of primes (prime factorization) and understand that if a prime divides a product, it divides at least one factor (Euclid's Lemma, implicitly).

## PREREQ_STUCK
If stuck, revisit prime factorization of numbers up to 100 (Class 6 node c6_math_ch01_015) and the statement of the Fundamental Theorem of Arithmetic (node c10_math_cbse_01_001).

## WORKED_EXAMPLE_1
PROBLEM: Prove that if a prime p divides the square of a positive integer a, then p divides a. Use the Fundamental Theorem of Arithmetic.
STEPS:
- Step 1: Write the given: Let p be a prime number and a be a positive integer such that p divides a². This means a² = p·k for some integer k.
- Step 2: By the Fundamental Theorem of Arithmetic, every positive integer has a unique prime factorization. Write the prime factorization of a as a = p₁ × p₂ × ... × pₙ, where each pᵢ is prime (not necessarily distinct).
- Step 3: Then a² = (p₁ × p₂ × ... × pₙ) × (p₁ × p₂ × ... × pₙ) = p₁² × p₂² × ... × pₙ². This is the unique prime factorization of a².
- Step 4: Since p divides a², p must appear in the prime factorization of a². By uniqueness of factorization, p must be one of the primes pᵢ in the factorization of a.
- Step 5: Therefore, p divides a (since a contains p as a factor). This completes the proof.
REASONING: The proof hinges on the uniqueness of prime factorization: squaring an integer doubles the exponent of each prime in its factorization. If a prime p divides the square, it must be one of those primes, hence it already divides the original integer.
ANSWER: Proved.

## WORKED_EXAMPLE_2
PROBLEM: Use the theorem to show that if 7 divides n², then 7 divides n. Then find the smallest positive integer n such that n² is divisible by 7 but n is not divisible by 7. Explain why no such n exists.
STEPS:
- Step 1: Identify p = 7 (prime) and a = n. The theorem states: if 7 | n² then 7 | n.
- Step 2: This is a direct application. So for any integer n, if 7 divides n², 7 must divide n.
- Step 3: To find a counterexample, we would need an n where 7 divides n² but 7 does not divide n. Suppose such n exists. Then by the theorem, 7 must divide n, a contradiction.
- Step 4: Check with a concrete number: Let n = 14. n² = 196. 7 divides 196 (196/7 = 28) and 7 divides 14. Let n = 21. n² = 441. 7 divides 441 and 7 divides 21.
- Step 5: Conclude: No such positive integer exists because the theorem guarantees that for any prime p (here p=7), p|n² implies p|n. The condition "p is prime" is essential; if p were composite like 4, a counterexample exists (n=6).
REASONING: The theorem is a universal statement for all primes and all positive integers. Showing it holds for specific values reinforces the concept, but the proof covers all cases. The non-existence of a counterexample is the power of a proved theorem.
ANSWER: No such integer exists; the theorem proves it for all n.

## WORKED_EXAMPLE_3
PROBLEM: A student writes: "To prove √5 is irrational, assume √5 = a/b in lowest terms. Then 5 = a²/b², so a² = 5b². Thus 5 divides a². By the theorem, 5 divides a. So a = 5c. Substituting: (5c)² = 5b² → 25c² = 5b² → 5c² = b². So 5 divides b², hence 5 divides b. But then a and b have common factor 5, contradiction. Therefore √5 is irrational." Identify the missing justifications in the student's proof that would be required for full marks in the board exam.
STEPS:
- Step 1: The proof structure is correct (proof by contradiction using the theorem). However, board exam marking scheme requires explicit statements.
- Step 2: Missing justification 1: "Let a and b be coprime positive integers (HCF = 1)." This defines "lowest terms" precisely.
- Step 3: Missing justification 2: When stating "By the theorem, 5 divides a", the student must explicitly cite the theorem: "Since 5 is prime and 5 divides a², by the theorem (If p is prime and p|a² then p|a), 5 divides a."
- Step 4: Missing justification 3: Similarly, when concluding 5 divides b from 5 divides b², the theorem must be cited again with p=5.
- Step 5: Missing justification 4: The contradiction statement must be explicit: "Thus 5 is a common factor of a and b, contradicting that a and b are coprime (HCF = 1)."
- Step 6: Final statement: "Hence our assumption that √5 is rational is false. Therefore √5 is irrational."
REASONING: Board exams award marks for each logical step and explicit citation of theorems. The student's proof has the right idea but lacks the formal statements that show understanding of the theorem's hypothesis (p prime) and the definition of rational numbers in lowest terms.
ANSWER: The proof is mathematically correct but incomplete for board exam marks. Full marks require: (1) Explicit coprime assumption, (2) Explicit citation of the theorem twice (for a and for b), (3) Explicit contradiction statement referencing coprimality.

## COMPETENCY_QUESTION_1
QUESTION: Assertion (A): If a prime p divides a², then p divides a. Reason (R): The prime factorization of a² contains each prime factor of a exactly twice. Choose the correct option:
(a) Both A and R are true and R is the correct explanation of A.
(b) Both A and R are true but R is not the correct explanation of A.
(c) A is true but R is false.
(d) A is false but R is true.
COMPETENCY: Evaluating logical reasoning and justification of mathematical statements.
STEPS:
- Step 1: Recognize Assertion (A) is the theorem we studied.
- Step 2: Analyze Reason (R): "The prime factorization of a² contains each prime factor of a exactly twice." This is true because if a = p₁ p₂ ... pₖ, then a² = p₁² p₂² ... pₖ².
- Step 3: Check if R explains A: If p divides a², p must appear in the factorization of a². Since the factorization of a² is exactly the squares of the primes in a, p must be one of the primes in a. Hence p divides a. So R is the correct explanation.
- Step 4: Select option (a).
ANSWER: (a) Both A and R are true and R is the correct explanation of A.
DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Case-based: A teacher asks students to prove that √6 is irrational. Student X writes: "Assume √6 = a/b with HCF(a,b)=1. Then 6 = a²/b² ⇒ a² = 6b². So 6 divides a². By the theorem, 6 divides a." Student Y writes: "Assume √6 = a/b with HCF(a,b)=1. Then 6 = a²/b² ⇒ a² = 6b². So 2 divides a² and 3 divides a². Since 2 and 3 are primes, by the theorem, 2 divides a and 3 divides a. So 6 divides a." Which student's reasoning is correct? Justify your answer and complete the proof correctly.
COMPETENCY: Identifying and correcting errors in mathematical proofs; applying theorems with precise hypotheses.
STEPS:
- Step 1: Analyze Student X: The theorem requires p to be prime. 6 is not prime (6 = 2×3). So Student X incorrectly applies the theorem to a composite number. The statement "6 divides a² ⇒ 6 divides a" is false in general (e.g., a=6: 6 divides 36 and 6 divides 6; but a=12: 6 divides 144 and 6 divides 12; actually it's true for 6? Wait, 6 divides a² does not always imply 6 divides a. Counterexample: a=6? 6 divides 36, 6 divides 6. a=12? 6 divides 144, 6 divides 12. Let's find: a=2? 6 does not divide 4. a=3? 6 does not divide 9. a=4? 16 not divisible by 6. a=6? works. a=18? 324/6=54, 18/6=3. Actually, is there a case where 6|a² but 6∤a? Let a = 2×3 = 6? No. Let's check a= 2×3×k? The condition for 6|a² is that a² has factors 2 and 3. So a must have 2 and 3. So 6|a. Wait, 6|a² implies 2|a² and 3|a². Since 2,3 are prime, 2|a and 3|a, so 6|a. So for 6 it happens to be true because it's squarefree. But the theorem is only stated for primes. Student X used the theorem incorrectly by applying it to 6 directly. The theorem's hypothesis is "p is prime". So X's reasoning is flawed even if the conclusion accidentally holds.
- Step 2: Analyze Student Y: Student Y correctly breaks 6 into its prime factors 2 and 3, applies the theorem to each prime separately, and deduces 2|a and 3|a, hence 6|a. This is correct reasoning.
- Step 3: Complete the proof: From 6|a, write a = 6c. Substitute: (6c)² = 6b² ⇒ 36c² = 6b² ⇒ 6c² = b². So 6 divides b². By Student Y's method, 2|b and 3|b, so 6|b. Then 6 is a common factor of a and b, contradicting HCF(a,b)=1. Hence √6 is irrational.
ANSWER: Student Y's reasoning is correct. Student X incorrectly applied the theorem to the composite number 6. The correct proof uses the theorem on the prime factors 2 and 3 separately.
DIFFICULTY: medium