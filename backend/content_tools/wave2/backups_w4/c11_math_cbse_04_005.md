## ELI5
Watch the pattern: 2³ - 2 = 6, 3³ - 3 = 24, 4³ - 4 = 60 - all divisible by 6. Proving divisibility by induction is certifying it for every n: check f(1) is divisible by m, assume f(k) = m·M for some integer M, then expand f(k+1) and rearrange it as f(k) plus a visibly divisible leftover. The rearrangement is the craft - isolate the old expression, feed the hypothesis, and the divisor claims the rest.

## DEFINITION
Proving divisibility by mathematical induction is the process of establishing that an algebraic expression \( f(n) \) containing a natural number variable \( n \) is exactly divisible by a fixed positive integer \( m \) for all \( n \in \mathbb{N} \). The proof requires two steps: (1) verifying the base case \( f(1) \) is divisible by \( m \), and (2) assuming \( f(k) \) is divisible by \( m \) for some \( k \in \mathbb{N} \), then proving \( f(k+1) \) is also divisible by \( m \) by expressing \( f(k+1) \) as \( f(k) + m \times (\text{integer expression in } k) \) or as a combination where the induction hypothesis applies directly.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently construct a complete induction proof for divisibility statements of the form "\( a^n \pm b^n \) is divisible by \( c \)" or "polynomial in \( n \) is divisible by \( m \)", correctly handling the algebraic manipulation in the inductive step to factor out the divisor, and can justify each step using the induction hypothesis and properties of divisibility.

## SCOPE_BOUNDARY
This node covers divisibility proofs by induction for expressions involving powers (e.g., \( 7^n - 3^n \)), polynomials (e.g., \( n^3 - n \)), and products of consecutive integers. It does NOT cover summation formulas (node 004), inequalities (node 006), or complex number divisibility. All proofs are restricted to \( n \in \mathbb{N} \) and integer divisors \( m \geq 2 \) as per NCERT Class 11 scope.

## WALKTHROUGH
Imagine you notice that \( 2^3 - 2 = 6 \), \( 3^3 - 3 = 24 \), \( 4^3 - 4 = 60 \) — all divisible by 6. You suspect \( n^3 - n \) is always divisible by 6 for any natural number \( n \). How do you prove it for infinitely many values? Begin by recalling the induction principle from c11_math_cbse_04_001 and the inductive step structure from c11_math_cbse_04_003. Write the statement \( P(n): n^3 - n \) is divisible by 6. Check \( P(1): 1 - 1 = 0 \), and 0 is divisible by 6 (base case). Assume \( P(k) \) true: \( k^3 - k = 6M \) for some integer \( M \). Now consider \( P(k+1): (k+1)^3 - (k+1) \). Expand and rearrange to isolate \( k^3 - k \), then substitute the induction hypothesis. The key insight: always express \( f(k+1) \) in terms of \( f(k) \) plus a term visibly divisible by the divisor.

Takeaway: mastery means f(k+1) being expressed as f(k) plus m times an integer expression in k - the hypothesis applying directly - with every expansion step justified. Exam moves: prove-divisibility questions for aⁿ ± bⁿ forms and polynomial-in-n forms. Check yourself: the leftover after isolating f(k) must wear the divisor openly, or the proof stalls. Students miss it because they expand and hope, when the definition's strategy is structural: build the new case out of the assumed one plus a confessed multiple of m.

## DIAGNOSTIC_QUESTION_1
State the exact two conditions that must be verified to prove "\( f(n) \) is divisible by \( m \) for all \( n \in \mathbb{N} \)" using mathematical induction, using the notation \( P(n) \) for the statement.

## DIAGNOSTIC_ANSWER_1
The two conditions are: (1) Base case: \( P(1) \) is true, i.e., \( f(1) \) is divisible by \( m \). (2) Inductive step: For any \( k \in \mathbb{N} \), if \( P(k) \) is true (i.e., \( f(k) = m \times \text{integer} \)), then \( P(k+1) \) is true (i.e., \( f(k+1) = m \times \text{integer} \)). A wrong answer revealing only "check n=1 and assume n=k" without the divisibility condition shows the student memorizes the template but doesn't understand the specific requirement for divisibility proofs.

## DIAGNOSTIC_QUESTION_2
Explain why, in the inductive step of a divisibility proof, we must express \( f(k+1) \) as \( f(k) + m \times g(k) \) or a similar combination where the induction hypothesis \( f(k) = m \times M \) can be directly substituted, rather than simply expanding \( f(k+1) \) and trying to factor \( m \) out directly.

## DIAGNOSTIC_ANSWER_2
The induction hypothesis gives us the fact that \( f(k) \) is a multiple of \( m \). By writing \( f(k+1) = f(k) + m \cdot g(k) \), we explicitly use this hypothesis: substituting \( f(k) = m \cdot M \) yields \( f(k+1) = m(M + g(k)) \), proving divisibility. Direct expansion often obscures the multiple of \( m \) because the algebraic form may not factor neatly without using the known structure of \( f(k) \). A student who says "both methods work" misses the logical necessity of invoking the hypothesis — the proof is invalid without it.

## DIAGNOSTIC_QUESTION_3
Prove by induction that \( 5^{2n+1} + 3^{n+1} \cdot 2^{n-1} \) is divisible by 19 for all \( n \in \mathbb{N} \). Show all steps including the base case, induction hypothesis, and the algebraic manipulation in the inductive step.

## DIAGNOSTIC_ANSWER_3
**Base case (n=1):** \( 5^{3} + 3^{2} \cdot 2^{0} = 125 + 9 = 134 = 19 \times 7 \). True.  
**Inductive hypothesis:** Assume for \( n=k \), \( 5^{2k+1} + 3^{k+1} \cdot 2^{k-1} = 19M \) for some integer \( M \).  
**Inductive step (n=k+1):**  
\( f(k+1) = 5^{2(k+1)+1} + 3^{(k+1)+1} \cdot 2^{(k+1)-1} = 5^{2k+3} + 3^{k+2} \cdot 2^{k} \)  
\( = 25 \cdot 5^{2k+1} + 3 \cdot 2 \cdot (3^{k+1} \cdot 2^{k-1}) \)  
\( = 25 \cdot 5^{2k+1} + 6 \cdot 3^{k+1} \cdot 2^{k-1} \)  
Now add and subtract \( 6 \cdot 5^{2k+1} \):  
\( = (25 - 6)5^{2k+1} + 6(5^{2k+1} + 3^{k+1} \cdot 2^{k-1}) \)  
\( = 19 \cdot 5^{2k+1} + 6 \cdot 19M \) (by hypothesis)  
\( = 19(5^{2k+1} + 6M) \), divisible by 19.  
A wrong answer that expands but fails to create the \( f(k) \) term reveals the student cannot manipulate exponents to match the hypothesis structure.

## DIAGNOSTIC_QUESTION_4
Two students prove "\( n^3 - n \) is divisible by 6". Student A writes \( (k+1)^3 - (k+1) = (k^3 - k) + 3k(k+1) \) and argues \( 3k(k+1) \) is divisible by 6 because \( k(k+1) \) is even. Student B writes \( (k+1)^3 - (k+1) = k^3 + 3k^2 + 3k + 1 - k - 1 = k^3 - k + 3k^2 + 3k \) and factors \( 3k(k+1) \) but doesn't justify why it's divisible by 6. Compare the logical completeness of both approaches.

## DIAGNOSTIC_ANSWER_4
Student A's proof is complete: they explicitly use the induction hypothesis \( k^3 - k = 6M \), then prove the remaining term \( 3k(k+1) \) is divisible by 6 by noting \( k(k+1) \) is a product of consecutive integers, hence even, so \( 3 \times \text{even} = \text{multiple of 6} \). Student B's proof is incomplete — they factor correctly but omit the justification that \( 3k(k+1) \) is a multiple of 6, which is a non-trivial step requiring parity reasoning. A student who rates them equally misses the need to prove every non-hypothesis term is divisible by the target divisor.

## DIAGNOSTIC_QUESTION_5
A student attempts to prove "\( 2^{3n} - 1 \) is divisible by 7" and writes:  
"Assume \( 2^{3k} - 1 = 7M \). Then \( 2^{3(k+1)} - 1 = 2^{3k+3} - 1 = 8 \cdot 2^{3k} - 1 = 8(7M + 1) - 1 = 56M + 7 = 7(8M + 1) \)."  
Identify the subtle error in the base case handling if the student only checked \( n=1 \) but the statement is claimed for \( n \in \mathbb{N} \) where \( \mathbb{N} \) includes 0 in some conventions.

## DIAGNOSTIC_ANSWER_5
The proof is mathematically correct for \( n \geq 1 \). The error is not in the algebra but in the domain specification: if \( \mathbb{N} \) includes 0 (as in some Indian board contexts), the base case must be \( n=0 \): \( 2^0 - 1 = 0 \), divisible by 7. The student's base case \( n=1 \) gives \( 8-1=7 \), valid for \( \mathbb{N} = \{1,2,3,\ldots\} \). A wrong answer claiming "the algebra is wrong" shows confusion between domain convention and algebraic validity. The correct evaluation: the proof is valid for \( \mathbb{N} = \{1,2,\ldots\} \); for \( \mathbb{N} \) including 0, the base case must be rechecked (and it holds).

## DIAGNOSTIC_QUESTION_6
Construct a divisibility statement of the form "\( a^n + b^n \) is divisible by \( c \)" that is TRUE for all \( n \in \mathbb{N} \) but where the standard induction approach \( f(k+1) = f(k) + \text{multiple of } c \) requires adding and subtracting a clever term. Provide the statement and outline the key algebraic trick needed in the inductive step.

## DIAGNOSTIC_ANSWER_6
Statement: \( 4^n + 15n - 1 \) is divisible by 9 for all \( n \in \mathbb{N} \). (Not exactly \( a^n + b^n \) but a valid divisibility induction problem.)  
Better example matching the form: \( 2^{3n} - 1 \) is divisible by 7 (already used).  
New construction: \( 5^n - 2^n \) is divisible by 3. Inductive step: \( 5^{k+1} - 2^{k+1} = 5 \cdot 5^k - 2 \cdot 2^k = 3 \cdot 5^k + 2(5^k - 2^k) \). The trick is writing \( 5 \cdot 5^k = 3 \cdot 5^k + 2 \cdot 5^k \) to create the hypothesis term \( 5^k - 2^k \). A poor answer gives a trivial statement like \( 2^n - 1 \) divisible by 1 or fails to identify the "add/subtract" manipulation, showing they don't recognize the pattern of splitting the coefficient to match the hypothesis.

## COMMON_MISCONCEPTION
Students treat the induction hypothesis as "assume \( f(k) \) is divisible by \( m \)" but then in the inductive step, they expand \( f(k+1) \) completely and try to factor \( m \) out directly WITHOUT first isolating \( f(k) \) or a multiple of it. For example, proving \( 7^n - 3^n \) divisible by 4: they write \( 7^{k+1} - 3^{k+1} = 7 \cdot 7^k - 3 \cdot 3^k \) and stop, unable to proceed. The correct move is to write \( 7 \cdot 7^k - 3 \cdot 3^k = 4 \cdot 7^k + 3(7^k - 3^k) \), using the hypothesis \( 7^k - 3^k = 4M \). The misconception is not recognizing that the coefficient of the hypothesis term must be the OTHER base (here 3), leading to the "add and subtract" technique: \( 7 \cdot 7^k - 3 \cdot 3^k = 7 \cdot 7^k - 7 \cdot 3^k + 7 \cdot 3^k - 3 \cdot 3^k = 7(7^k - 3^k) + 3^k(7 - 3) \).

## ON_FAILURE
When a student cannot form the inductive step, guide them through this 3-step repair: (1) Write \( f(k) \) and \( f(k+1) \) side by side. (2) Identify the "extra" factor in \( f(k+1) \) — e.g., for \( a^{k+1} - b^{k+1} \), the extra factors are \( a \) and \( b \). (3) Perform the "add and subtract" maneuver: \( a \cdot a^k - b \cdot b^k = a \cdot a^k - a \cdot b^k + a \cdot b^k - b \cdot b^k = a(a^k - b^k) + b^k(a - b) \). Now the first term uses the hypothesis, the second term is visibly divisible by \( (a-b) \). Practice this pattern with \( 5^n - 2^n \) (divisible by 3), \( 10^n - 7^n \) (divisible by 3), until the algebraic rhythm becomes automatic.

## PREREQUISITE_NODE_IDS
c11_math_cbse_04_001, c11_math_cbse_04_002, c11_math_cbse_04_003, c11_math_cbse_04_004, c6_math_ch01_013, c6_math_ch01_014, c6_math_ch01_015, c8_math_ch5_8, c10_math_cbse_01_001, c8_math_ch5_5

## PREREQUISITE_REASONS
c11_math_cbse_04_001: Provides the principle and motivation of mathematical induction, the logical foundation.
c11_math_cbse_04_002: Teaches base case verification, the starting point of every induction proof.
c11_math_cbse_04_003: Explains the inductive step structure and hypothesis assumption, directly used here.
c11_math_cbse_04_004: Covers summation induction; the algebraic manipulation skills transfer to divisibility.
c6_math_ch01_013: Factors and multiples — understanding what "divisible by m" means.
c6_math_ch01_014: Divisibility rules — quick checks for base cases and term analysis.
c6_math_ch01_015: Prime factorisation, HCF, LCM — deeper divisibility reasoning for composite divisors.
c8_math_ch5_8: Divisibility tests for 2,3,4,5,6,8,9,11 — used to verify terms like \( 3k(k+1) \) is divisible by 6.
c10_math_cbse_01_001: Fundamental Theorem of Arithmetic — justifies why a product of consecutive integers has specific prime factors.
c8_math_ch5_5: at \( k(k+1) \) is always even is a number theory fact from Class 6 (c6_math_ch01_014) and Class 8 (c8_math_ch5_5). Without this, the term \( 3k^2+3k \) would not visibly contain the factor 6. The "add and subtract" or "group and factor" st  

## FORWARD_NODE_IDS
c11_math_cbse_04_006, c11_math_cbse_04_007, c11_math_cbse_04_008
## FORWARD_REASONS
c11_math_cbse_04_006: Proving inequalities by induction uses the same two-step structure but with inequality manipulation instead of divisibility; the logical framework is identical.
c11_math_cbse_04_007: Common pitfalls specifically includes errors in divisibility induction (e.g., not using hypothesis, wrong base case), directly building on this node.
c11_math_cbse_04_008: Applications often combine divisibility with summation or inequalities, requiring mastery of this node's techniques.

## CROSS_SUBJECT_PREREQS
c8_math_ch5_8, c10_math_cbse_01_001, c6_math_ch01_014, c6_math_ch01_015
## CROSS_SUBJECT_REASONS
c8_math_ch5_8: Divisibility tests provide quick verification tools for the "remaining term" in inductive steps (e.g., checking if \( k(k+1) \) is even).
c10_math_cbse_01_001: Fundamental Theorem of Arithmetic underpins why divisibility by composite numbers requires checking prime power factors, relevant for divisors like 6, 12, 30.
c6_math_ch01_014: Basic divisibility rules (2,3,5,9,10) are used to mentally verify base cases and simple terms during exams.
c6_math_ch01_015: HCF/LCM concepts help when the divisor is composite and the expression factors into parts with known divisibility.

## CHAIN_DESCRIPTION
c11_math_cbse_04_003 -> c11_math_cbse_04_005 -> c11_math_cbse_04_006

## THIS_FORMULA
N/A - conceptual (no single formula; the method is the algorithm: Base case + Inductive step with \( f(k+1) = f(k) + m \cdot g(k) \))

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | In physics, mathematical induction proves formulas for discrete systems (e.g., energy levels in quantum harmonic oscillator \( E_n = (n+\frac{1}{2})\hbar\omega \)); the logical structure of proving a property for all integers is identical.
c11_compsci_ch4_2 | In computer science, induction proves correctness of recursive algorithms and loop invariants; divisibility induction mirrors proving that a loop maintains a modular arithmetic invariant (e.g., hash functions, cryptography).

## PREREQ_CONCEPT
The concept of divisibility: \( a \) is divisible by \( b \) (\( b \neq 0 \)) iff \( \exists k \in \mathbb{Z} \) such that \( a = b \cdot k \), and the property that if \( b \mid x \) and \( b \mid y \) then \( b \mid (x+y) \) and \( b \mid (x-y) \).

## PREREQ_BEFORE
The student must be able to state the induction principle, verify a base case, write an induction hypothesis for divisibility (e.g., \( f(k) = m \cdot M \)), and perform algebraic expansion of polynomials and exponential expressions like \( a^{k+1} \).

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_04_003 (Inductive Step structure) and c6_math_ch01_014 (Divisibility Rules) to rebuild the connection between the hypothesis format and the algebraic goal.

## WORKED_EXAMPLE_1
PROBLEM: Prove by mathematical induction that \( n^3 + 5n \) is divisible by 6 for all \( n \in \mathbb{N} \). (Context: A class of 6 students shares \( n^3 + 5n \) candies equally for any natural number \( n \); prove no candy is left over.)

STEPS:
- Step 1: Define the statement \( P(n) \): "\( n^3 + 5n \) is divisible by 6" i.e., \( n^3 + 5n = 6 \times \text{integer} \).
- Step 2: Verify base case \( n=1 \): \( 1^3 + 5 \times 1 = 6 = 6 \times 1 \). So \( P(1) \) is true.
- Step 3: Write the induction hypothesis: Assume \( P(k) \) is true for some \( k \in \mathbb{N} \), i.e., \( k^3 + 5k = 6M \) where \( M \in \mathbb{Z} \).
- Step 4: Consider \( P(k+1) \): \( (k+1)^3 + 5(k+1) = k^3 + 3k^2 + 3k + 1 + 5k + 5 = (k^3 + 5k) + 3k^2 + 3k + 6 \).
- Step 5: Substitute the hypothesis \( k^3 + 5k = 6M \): expression becomes \( 6M + 3k^2 + 3k + 6 = 6(M+1) + 3k(k+1) \).
- Step 6: Prove \( 3k(k+1) \) is divisible by 6: \( k(k+1) \) is product of two consecutive integers, so one is even → \( k(k+1) = 2L \) for some integer \( L \). Then \( 3k(k+1) = 6L \).
- Step 7: Combine: \( (k+1)^3 + 5(k+1) = 6(M+1) + 6L = 6(M+L+1) \), which is a multiple of 6.
- Step 8: Conclude: \( P(k+1) \) is true whenever \( P(k) \) is true. By induction, \( P(n) \) is true for all \( n \in \mathbb{N} \).

REASONING: The proof follows the standard induction template. The critical insight is Step 6: recognizing that \( k(k+1) \) is always even is a number theory fact from Class 6 (c6_math_ch01_014) and Class 8 (c8_math_ch5_5). Without this, the term \( 3k^2+3k \) would not visibly contain the factor 6. The "add and subtract" or "group and factor" strategy isolates the hypothesis term \( f(k) \) first, then handles the remainder using independent divisibility arguments.

ANSWER: Proved. \( n^3 + 5n \) is divisible by 6 for all \( n \in \mathbb{N} \).

## WORKED_EXAMPLE_2
PROBLEM: Prove that \( 7^{2n} - 48n - 1 \) is divisible by 2304 for all \( n \in \mathbb{N} \). (Context: A cryptographic checksum uses this expression; prove it always yields a multiple of 2304.)

STEPS:
- Step 1: Statement \( P(n) \): \( 7^{2n} - 48n - 1 \) is divisible by 2304. Note \( 2304 = 48^2 \).
- Step 2: Base case \( n=1 \): \( 7^2 - 48 - 1 = 49 - 49 = 0 = 2304 \times 0 \). True.
- Step 3: Induction hypothesis: Assume \( P(k) \) true: \( 7^{2k} - 48k - 1 = 2304M \) for some integer \( M \).
- Step 4: Inductive step for \( n=k+1 \): \( f(k+1) = 7^{2(k+1)} - 48(k+1) - 1 = 7^{2k+2} - 48k - 48 - 1 \).
- Step 5: Express \( 7^{2k+2} = 49 \cdot 7^{2k} \). So \( f(k+1) = 49 \cdot 7^{2k} - 48k - 49 \).
- Step 6: Add and subtract \( 49 \times 48k \) and \( 49 \times 1 \) to create the hypothesis form:  
  \( = 49(7^{2k} - 48k - 1) + 49 \cdot 48k + 49 - 48k - 49 \)  
  \( = 49(7^{2k} - 48k - 1) + 48k(49 - 1) \)  
  \( = 49(7^{2k} - 48k - 1) + 48k \cdot 48 \)  
  \( = 49(7^{2k} - 48k - 1) + 2304k \).
- Step 7: Substitute hypothesis \( 7^{2k} - 48k - 1 = 2304M \):  
  \( f(k+1) = 49 \cdot 2304M + 2304k = 2304(49M + k) \).
- Step 8: Since \( 49M + k \) is an integer, \( f(k+1) \) is divisible by 2304. Induction complete.

REASONING: This example demonstrates the "coefficient matching" technique. The multiplier 49 comes from \( 7^2 \). The key is to multiply the entire hypothesis expression by 49, then adjust the extra terms. The term \( 48k(49-1) = 2304k \) emerges naturally because \( 49-1 = 48 \), and \( 48 \times 48 = 2304 \). This pattern — where the divisor is \( (a-1)^2 \) and the expression is \( a^{2n} - (a-1)n - 1 \) — is a known class of problems in competitive exams.

ANSWER: Proved. \( 7^{2n} - 48n - 1 \) is divisible by 2304 for all \( n \in \mathbb{N} \).

## WORKED_EXAMPLE_3
PROBLEM: Prove by induction that \( 2 \cdot 7^n + 3 \cdot 5^n - 5 \) is divisible by 24 for all \( n \in \mathbb{N} \). (Context: A signal processing algorithm generates this sequence; prove every term is a multiple of 24 for synchronization.)

STEPS:
- Step 1: Define \( P(n) \): \( 2 \cdot 7^n + 3 \cdot 5^n - 5 \) is divisible by 24.
- Step 2: Base case \( n=1 \): \( 2 \cdot 7 + 3 \cdot 5 - 5 = 14 + 15 - 5 = 24 = 24 \times 1 \). True.
- Step 3: Induction hypothesis: Assume \( P(k) \) true: \( 2 \cdot 7^k + 3 \cdot 5^k - 5 = 24M \), \( M \in \mathbb{Z} \).
- Step 4: Inductive step \( n=k+1 \):  
  \( f(k+1) = 2 \cdot 7^{k+1} + 3 \cdot 5^{k+1} - 5 = 14 \cdot 7^k + 15 \cdot 5^k - 5 \).
- Step 5: We need to introduce \( 2 \cdot 7^k + 3 \cdot 5^k \). Use the "add and subtract" method:  
  Write \( 14 = 2 \times 7 \), \( 15 = 3 \times 5 \).  
  \( f(k+1) = 7(2 \cdot 7^k) + 5(3 \cdot 5^k) - 5 \).  
  Add and subtract \( 7(3 \cdot 5^k) \) and \( 7 \times 5 \):  
  \( = 7(2 \cdot 7^k + 3 \cdot 5^k - 5) + 5(3 \cdot 5^k) - 5 + 7(3 \cdot 5^k) - 7(3 \cdot 5^k) + 35 - 35 \) — too messy.  
  Better: Express coefficients as \( 7 = 1+6 \), \( 5 = 1+4 \)? No.  
  Standard trick: \( 14 \cdot 7^k + 15 \cdot 5^k - 5 = (2 \cdot 7^k + 3 \cdot 5^k - 5) + 12 \cdot 7^k + 12 \cdot 5^k \)? No.  
  Correct approach:  
  \( f(k+1) = 14 \cdot 7^k + 15 \cdot 5^k - 5 \)  
  \( = 7(2 \cdot 7^k + 3 \cdot 5^k - 5) - 21 \cdot 5^k + 35 + 15 \cdot 5^k - 5 \)  
  \( = 7(2 \cdot 7^k + 3 \cdot 5^k - 5) - 6 \cdot 5^k + 30 \)  
  \( = 7(2 \cdot 7^k + 3 \cdot 5^k - 5) - 6(5^k - 5) \).
- Step 6: Now we have the hypothesis term multiplied by 7. Need to show \( 6(5^k - 5) \) is divisible by 24, i.e., \( 5^k - 5 \) is divisible by 4.
- Step 7: Prove \( 5^k - 5 \) divisible by 4 for all \( k \in \mathbb{N} \):  
  \( 5 \equiv 1 \pmod{4} \Rightarrow 5^k \equiv 1 \pmod{4} \Rightarrow 5^k - 5 \equiv 1 - 1 \equiv 0 \pmod{4} \).  
  Or by induction: base \( k=1 \): \( 5-5=0 \); step: \( 5^{k+1}-5 = 5(5^k-1) = 5(5^k-5+4) = 5(5^k-5)+20 \), divisible by 4.
- Step 8: Thus \( 5^k - 5 = 4L \), so \( 6(5^k - 5) = 24L \).
- Step 9: Substitute back: \( f(k+1) = 7 \cdot 24M + 24L = 24(7M + L) \), divisible by 24.
- Step 10: Conclusion: By induction, \( P(n) \) true for all \( n \in \mathbb{N} \).

REASONING: This problem combines two inductions: the main one and a lemma (\( 5^k - 5 \) divisible by 4). The main inductive step uses coefficient splitting: we want to factor out the hypothesis \( 2 \cdot 7^k + 3 \cdot 5^k - 5 \). Multiplying it by 7 gives \( 14 \cdot 7^k + 21 \cdot 5^k - 35 \). Our target is \( 14 \cdot 7^k + 15 \cdot 5^k - 5 \). The difference is \( (15-21)5^k + (-5+35) = -6 \cdot 5^k + 30 = -6(5^k - 5) \). This "multiply hypothesis by one base and adjust" technique is universal for linear combinations of exponentials.

ANSWER: Proved. \( 2 \cdot 7^n + 3 \cdot 5^n - 5 \) is divisible by 24 for all \( n \in \mathbb{N} \).

## COMPETENCY_QUESTION_1
QUESTION: A student claims: "To prove \( a^n - b^n \) is divisible by \( a-b \) for all \( n \in \mathbb{N} \), we can just say \( a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1}) \), so induction is unnecessary." Evaluate this claim. Is the factorization a valid proof? Does it replace induction? If the exam question says "Prove by mathematical induction", would this factorization receive full marks? Justify your answer.

COMPETENCY: Evaluating mathematical arguments and understanding the role of induction vs. direct algebraic proof.

STEPS:
- Step 1: Recognize the factorization \( a^n - b^n = (a-b)(a^{n-1} + a^{n-2}b + \cdots + b^{n-1}) \) is an identity true for all \( n \).
- Step 2: Note that the second factor is a sum of \( n \) terms, each an integer if \( a,b \in \mathbb{Z} \), so the product is visibly a multiple of \( a-b \).
- Step 3: This is a DIRECT proof, not an inductive proof. It does not use the induction principle.
- Step 4: If the question explicitly says "Prove by mathematical induction", the factorization method does not satisfy the requirement, even though it's mathematically correct.
- Step 5: In CBSE board exams, "Prove by mathematical induction" mandates the two-step inductive structure. A direct factorization would lose marks for not following the prescribed method.

ANSWER: The factorization is a valid direct algebraic proof that \( a-b \) divides \( a^n - b^n \). However, it is NOT a proof by mathematical induction. If the question instructs "Prove by mathematical induction", the student must use the base case + inductive step structure. The factorization method would receive partial or no credit because it fails to demonstrate the competency being tested (the induction technique). Induction is a specific logical method; the problem tests whether the student can apply it, not just whether the statement is true.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find all positive integers \( m \) such that the statement "\( n^3 + 3n^2 + 2n \) is divisible by \( m \) for all \( n \in \mathbb{N} \)" can be proved by induction where the inductive step requires showing \( (k+1)(k+2)(k+3) - k(k+1)(k+2) \) is divisible by \( m \). Prove your answer using induction, and explain why no larger \( m \) works.

COMPETENCY: Synthesizing divisibility, factorization, and induction to find the maximal divisor and construct the proof.

STEPS:
- Step 1: Factor the expression: \( n^3 + 3n^2 + 2n = n(n+1)(n+2) \), product of three consecutive integers.
- Step 2: The difference in the inductive step: \( (k+1)(k+2)(k+3) - k(k+1)(k+2) = (k+1)(k+2)[(k+3)-k] = 3(k+1)(k+2) \).
- Step 3: For the induction to work, we need \( 3(k+1)(k+2) \) to be divisible by \( m \) for all \( k \), AND the base case \( 1 \cdot 2 \cdot 3 = 6 \) divisible by \( m \).
- Step 4: \( 3(k+1)(k+2) \) is always divisible by 6 because \( (k+1)(k+2) \) is even. So \( m \) can be any divisor of 6 that also divides the base case 6.
- Step 5: Divisors of 6: 1, 2, 3, 6. All work. The maximum is \( m = 6 \).
- Step 6: Prove by induction for \( m=6 \):  
  Base \( n=1 \): \( 6 \) divisible by 6.  
  Hypothesis: \( k(k+1)(k+2) = 6M \).  
  Step: \( (k+1)(k+2)(k+3) = k(k+1)(k+2) + 3(k+1)(k+2) = 6M + 3(k+1)(k+2) \).  
  Since \( (k+1)(k+2) \) is even, \( 3(k+1)(k+2) = 6L \). Sum = \( 6(M+L) \).  
- Step 7: Why no larger \( m \)? Base case is 6; if \( m > 6 \), \( m \) cannot divide 6. So \( m=6 \) is maximum.

ANSWER: The positive integers \( m \) are 1, 2, 3, 6. The maximum is 6. The induction proof for \( m=6 \) uses the factorization \( n(n+1)(n+2) \) and the fact that the product of any two consecutive integers is even, making \( 3(k+1)(k+2) \) a multiple of 6. Any \( m > 6 \) fails the base case \( n=1 \) (value 6).

DIFFICULTY: hard