## ELI5
A school library issues card numbers so perfectly that every student holds a unique number and every number finds an owner - a flawless pairing. A bijective function is that pairing: injective (no two inputs share an output) and surjective (no output is left unclaimed) at once. Equivalently, every codomain element is the image of exactly one domain element. Miss either promise - a shared number or an orphan number - and the pairing fails to be bijective.

## DEFINITION
A function \( f: X \to Y \) is **bijective** (or a one‑to‑one correspondence) if it is both **injective** (one‑one) and **surjective** (onto). That is:
- (Injective) For every \( x_1, x_2 \in X \), \( f(x_1) = f(x_2) \implies x_1 = x_2 \).
- (Surjective) For every \( y \in Y \), there exists an \( x \in X \) such that \( f(x) = y \).

Equivalently, every element of the codomain \( Y \) is the image of **exactly one** element of the domain \( X \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) verify whether a given function is bijective by separately checking injectivity and surjectivity with rigorous algebraic steps, (2) construct explicit examples of bijective functions between given finite or infinite sets, and (3) explain why a function fails to be bijective by identifying which of the two conditions is violated.

## SCOPE_BOUNDARY
Covers the definition of bijective functions, methods to prove bijectivity (algebraic, piecewise, finite‑set enumeration), and the crucial distinction between finite and infinite sets (on finite sets, injective ⇔ surjective ⇔ bijective; on infinite sets this equivalence fails). Does **not** cover composition of functions, inverse functions, or binary operations — those are treated in later nodes.

## WALKTHROUGH
Imagine a school library where each of the 500 students receives a unique library card number from 1 to 500, and every number is used exactly once. The mapping “student → card number” is a perfect pairing: no two students share a number (injective) and no number is left unused (surjective). This real‑world pairing is exactly a bijective function. To analyse any function for bijectivity, first write down the domain and codomain explicitly. Then test injectivity by assuming \( f(x_1)=f(x_2) \) and deducing \( x_1=x_2 \). Next test surjectivity by taking an arbitrary \( y \) in the codomain and solving \( f(x)=y \) for \( x \) in the domain. If both steps succeed, the function is bijective. The key insight is that bijectivity is the **simultaneous** satisfaction of both one‑one and onto — a single failure makes the function non‑bijective.

Takeaway first: bijectivity is a two-door exam - injectivity and surjectivity must both pass, and either failure alone sinks the verdict. Exam moves: verify questions testing both properties with clean algebra, construction questions building bijections between given sets, and diagnosis questions naming which of the two conditions fails. Method: write domain and codomain first, run the equal-images test, then the arbitrary-y test, exactly as the walkthrough orders them. Check yourself: for finite sets of equal size, injectivity and surjectivity imply each other - use that shortcut when counting is honest. Drill: test one function for both properties and, if it fails, state which door it never entered.

## DIAGNOSTIC_QUESTION_1
State the precise definition of a bijective function \( f: X \to Y \) using the language of injectivity and surjectivity.

## DIAGNOSTIC_ANSWER_1
A function \( f: X \to Y \) is bijective iff it is both injective (one‑one) and surjective (onto). Injective: \( \forall x_1,x_2\in X,\ f(x_1)=f(x_2)\implies x_1=x_2 \). Surjective: \( \forall y\in Y,\ \exists x\in X \) such that \( f(x)=y \).  
A wrong answer that only mentions “one‑one” or only “onto” reveals that the student has not internalised that **both** conditions are required simultaneously. Many students memorise “bijective = one‑one + onto” but cannot write the formal quantifiers, which leads to errors in proof‑based questions.

## DIAGNOSTIC_QUESTION_2
Explain why the function \( f: \mathbb{N} \to \mathbb{N} \) defined by \( f(x)=2x \) is injective but **not** bijective. What specific property fails?

## DIAGNOSTIC_ANSWER_2
\( f(x)=2x \) is injective because \( 2x_1=2x_2 \implies x_1=x_2 \). It is **not surjective** because, for example, \( 1\in\mathbb{N} \) has no pre‑image: there is no \( x\in\mathbb{N} \) with \( 2x=1 \). Hence the function fails surjectivity and is not bijective.  
If a student claims it is bijective because it is one‑one, they are confusing the finite‑set property (where injective implies surjective) with infinite sets. This misconception is extremely common in JEE/NEET questions that test the distinction between finite and infinite domains.

## DIAGNOSTIC_QUESTION_3
Determine whether the function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x)=3x-5 \) is bijective. Show all steps for both injectivity and surjectivity.

## DIAGNOSTIC_ANSWER_3
**Injectivity:** Assume \( f(x_1)=f(x_2) \). Then \( 3x_1-5 = 3x_2-5 \implies 3x_1=3x_2 \implies x_1=x_2 \). ✓  
**Surjectivity:** Let \( y\in\mathbb{R} \) be arbitrary. Solve \( 3x-5=y \implies 3x=y+5 \implies x=\frac{y+5}{3} \). Since \( y \) is real, \( x \) is real and \( f(x)=y \). ✓  
Therefore \( f \) is bijective.  
A common error is to stop after proving injectivity, or to claim surjectivity without explicitly solving for \( x \) in terms of \( y \) and verifying that \( x \) belongs to the domain \( \mathbb{R} \). In board exams, marks are awarded for the explicit surjectivity step.

## DIAGNOSTIC_QUESTION_4
Consider the function \( f: A \to B \) where \( A=\{1,2,3\}, B=\{a,b,c\} \) and \( f=\{(1,a),(2,b),(3,c)\} \). Now consider \( g: A \to B \) where \( g=\{(1,a),(2,a),(3,b)\} \). Compare the two functions and explain why \( f \) is bijective while \( g \) is not. Which property does \( g \) violate?

## DIAGNOSTIC_ANSWER_4
\( f \) pairs each element of \( A \) with a distinct element of \( B \) and covers all of \( B \) — it is both injective and surjective, hence bijective.  
\( g \) maps both 1 and 2 to \( a \), so it is **not injective** (fails one‑one). It also misses \( c\in B \), so it is **not surjective** either. The primary violation is injectivity; surjectivity also fails.  
A student who only notices that \( g \) misses \( c \) and says “not onto” misses the fact that it is also many‑one. In competitive exams, identifying **all** violated properties is often required for full credit.

## DIAGNOSTIC_QUESTION_5
A student claims: “The function \( f: \mathbb{Z} \to \mathbb{Z} \) defined by \( f(x)=x^2 \) is bijective because every integer has a unique square.” Evaluate this claim and identify the exact errors.

## DIAGNOSTIC_ANSWER_5
The claim is **false** on two counts:  
1. **Not injective:** \( f(2)=4 \) and \( f(-2)=4 \) but \( 2\neq -2 \). So distinct elements map to the same image.  
2. **Not surjective:** There is no integer \( x \) such that \( x^2 = -1 \) (or any negative integer). Negative integers in the codomain have no pre‑image.  
The student incorrectly assumes “unique square” means injective, confusing the fact that the **output** is uniquely determined by the input (which is true for any function) with the injectivity condition. They also ignore the sign restriction of squares. This error costs marks in both board and JEE questions where \( x^2 \) is a classic counter‑example.

## DIAGNOSTIC_QUESTION_6
Construct a bijective function \( h: \{1,2,3,4\} \to \{p,q,r,s\} \) that is **not** the identity mapping (i.e., not \( 1\mapsto p, 2\mapsto q, \) etc.). Write it as a set of ordered pairs and verify both conditions.

## DIAGNOSTIC_ANSWER_6
One example: \( h = \{(1,q), (2,s), (3,p), (4,r)\} \).  
**Injective:** All four images \( q,s,p,r \) are distinct.  
**Surjective:** Every element of \( \{p,q,r,s\} \) appears as an image.  
Any permutation of the four codomain elements works. A poor answer would give a mapping that repeats an image or omits one, showing the student does not grasp that a bijection on finite sets of equal size is exactly a permutation.

## COMMON_MISCONCEPTION
**“If a function is one‑one, it is automatically bijective.”**  
Students often memorise that for finite sets \( X \) and \( Y \) with \( |X|=|Y| \), injective ⇔ surjective ⇔ bijective, and then **incorrectly apply this to infinite sets**. For example, they argue \( f:\mathbb{N}\to\mathbb{N},\ f(x)=2x \) is bijective because it is injective. The error is ignoring that the domain and codomain are infinite; the pigeonhole principle does not force surjectivity. In board exams, this leads to wrong conclusions in true/false questions; in JEE, it causes errors in problems about invertibility of functions on \( \mathbb{R} \) or \( \mathbb{N} \).

## ON_FAILURE
1. Revisit **c12_math_cbse_01_003** (One‑One/Injective) and **c12_math_cbse_01_004** (Onto/Surjective).  
2. For each, write the formal definition with quantifiers and solve 3–4 practice problems checking **only** that property.  
3. Then take 5 functions (mix of finite/infinite, algebraic/piecewise) and **explicitly** test both properties in a two‑column table.  
4. Re‑attempt DIAGNOSTIC_QUESTION_2 and DIAGNOSTIC_QUESTION_5. If confusion persists, focus on the finite vs infinite distinction using the remark in NCERT after Example 14.

## PREREQUISITE_NODE_IDS
c12_math_cbse_01_003, c12_math_cbse_01_004, c11_math_cbse_02_005, c12_math_cbse_01_001, c12_math_cbse_01_002

## PREREQUISITE_REASONS
c12_math_cbse_01_003: Bijectivity requires injectivity; this node provides the definition and proof techniques for one‑one functions.  
c12_math_cbse_01_004: Bijectivity requires surjectivity; this node provides the definition and proof techniques for onto functions.  
c11_math_cbse_02_005: Basic definition of a function, domain, codomain, and range — the foundational language used in this node.
c12_math_cbse_01_001: Bijective functions combine one-one and onto; the logical reasoning patterns (universal/existential quantifiers) are identical to those used in verifying relation properties.  
c12_math_cbse_01_002: bijective functions correspond to equivalence relations where each class is a singleton — a key conceptual link.  

## FORWARD_NODE_IDS
c12_math_cbse_01_007, c12_math_cbse_01_006

## FORWARD_REASONS
c12_math_cbse_01_007: A function is invertible **iff** it is bijective. This node establishes the exact condition needed to determine invertibility and to construct the inverse function.
c12_math_cbse_01_006: Bijectivity connects to invertibility, which is the next node.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_07_003, c11_stat_cbse_01_008
## CROSS_SUBJECT_REASONS
c11_math_cbse_07_003: Permutations on a finite set are exactly the bijective functions from the set to itself. The number of bijections \( n! \) is the number of permutations.  
c11_stat_cbse_01_008: In statistics, a bijective transformation of a discrete random variable preserves the probability mass function; understanding bijections is essential for change‑of‑variable techniques in probability distributions.

## CHAIN_DESCRIPTION
c12_math_cbse_01_003, c12_math_cbse_01_004 -> c12_math_cbse_01_005 -> c12_math_cbse_01_007

## THIS_FORMULA
N/A - conceptual (definition combines two conditions: \( f(x_1)=f(x_2)\implies x_1=x_2 \) AND \( \forall y\in Y\ \exists x\in X: f(x)=y \))

## FORMULA_VARIABLES
N/A

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_math_cbse_07_003 | Bijective functions on a finite set are permutations; counting bijections uses factorial (n!).
c11_stat_cbse_01_008 | Discrete random variables transformed by bijective functions retain distinct probability masses; used in deriving distributions of functions of random variables.
## PREREQ_CONCEPT
Simultaneous understanding of injective (one‑one) and surjective (onto) properties of a function.

## PREREQ_BEFORE
Student must be able to independently prove a function is injective (using \( f(x_1)=f(x_2)\Rightarrow x_1=x_2 \)) and surjective (by solving \( f(x)=y \) for \( x \) in the domain).

## PREREQ_STUCK
If stuck, re‑watch the worked examples in nodes c12_math_cbse_01_003 (injectivity) and c12_math_cbse_01_004 (surjectivity) and practice the two‑column verification method on simple linear and quadratic functions.

## WORKED_EXAMPLE_1
PROBLEM: A school assigns each student in Class XII a unique roll number from 1 to 120. The function \( f \) maps a student to their roll number. The set of students is \( S \) (|S|=120) and the set of roll numbers is \( R=\{1,2,\dots,120\} \). Prove that \( f: S\to R \) is bijective.

STEPS:
- Step 1: Identify the domain \( S \) (120 students) and codomain \( R \) (numbers 1 to 120). Both sets have exactly 120 elements.
- Step 2: Check injectivity. Assume two students \( s_1, s_2 \in S \) have the same roll number: \( f(s_1)=f(s_2) \). By school rule, roll numbers are unique, so \( s_1=s_2 \). Hence \( f \) is one‑one.
- Step 3: Check surjectivity. Take any roll number \( r \in R \). Because every number from 1 to 120 is assigned to some student, there exists a student \( s \in S \) with \( f(s)=r \). Hence \( f \) is onto.
- Step 4: Since \( f \) is both injective and surjective, it is bijective.
- Step 5: Interpret the result: The mapping is a perfect pairing; no roll number is unused and no two students share a roll number.

REASONING: For finite sets of equal cardinality, injectivity alone (or surjectivity alone) would already guarantee bijectivity, but we verified both to illustrate the definition. In real‑world scenarios like roll numbers, Aadhaar numbers, or ISBN codes, bijectivity ensures unique identification without gaps.

ANSWER: \( f \) is bijective.

## WORKED_EXAMPLE_2
PROBLEM: Show that the function \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = \frac{2x-3}{5} \) is bijective.

STEPS:
- Step 1: Write the function clearly: \( f(x) = \frac{2x-3}{5} \), domain \( \mathbb{R} \), codomain \( \mathbb{R} \).
- Step 2: Prove injectivity. Assume \( f(x_1)=f(x_2) \). Then \( \frac{2x_1-3}{5} = \frac{2x_2-3}{5} \). Multiply by 5: \( 2x_1-3 = 2x_2-3 \). Add 3: \( 2x_1 = 2x_2 \). Divide by 2: \( x_1 = x_2 \). ✓
- Step 3: Prove surjectivity. Let \( y \in \mathbb{R} \) be arbitrary. Solve \( f(x)=y \) for \( x \): \( \frac{2x-3}{5} = y \Rightarrow 2x-3 = 5y \Rightarrow 2x = 5y+3 \Rightarrow x = \frac{5y+3}{2} \). Since \( y \) is real, \( x \) is real. Check: \( f\left(\frac{5y+3}{2}\right) = \frac{2(\frac{5y+3}{2})-3}{5} = \frac{5y+3-3}{5} = y \). ✓
- Step 4: Conclude \( f \) is bijective.
- Step 5: Note that the inverse function is \( f^{-1}(y) = \frac{5y+3}{2} \), which we will study in the next node.

REASONING: Linear functions \( f(x)=ax+b \) with \( a\neq 0 \) are always bijective on \( \mathbb{R} \) because they are strictly monotonic (injective) and their range is all of \( \mathbb{R} \) (surjective). The algebraic steps are reversible, which is the hallmark of a bijection.

ANSWER: \( f \) is bijective.

## WORKED_EXAMPLE_3
PROBLEM: Let \( A = \{1,2,3,4\} \). Define \( f: A \to A \) by  
\( f(x) = \begin{cases} x+1 & \text{if } x \text{ is odd} \\ x-1 & \text{if } x \text{ is even} \end{cases} \)  
Determine whether \( f \) is bijective.

STEPS:
- Step 1: List the domain and codomain explicitly: \( A = \{1,2,3,4\} \).
- Step 2: Compute the image of each element:  
  \( f(1)=1+1=2 \) (1 is odd)  
  \( f(2)=2-1=1 \) (2 is even)  
  \( f(3)=3+1=4 \) (3 is odd)  
  \( f(4)=4-1=3 \) (4 is even)  
  So \( f = \{(1,2), (2,1), (3,4), (4,3)\} \).
- Step 3: Check injectivity. All images \( 2,1,4,3 \) are distinct. No two different inputs give the same output. ✓
- Step 4: Check surjectivity. The set of images is \( \{1,2,3,4\} \), which equals the codomain \( A \). Every element of \( A \) is an image. ✓
- Step 5: Since \( f \) is both injective and surjective, it is bijective.
- Step 6: Observe that \( f \) is its own inverse: \( f(f(x))=x \) for all \( x\in A \).

REASONING: On a finite set, a function is bijective iff it is a permutation of the elements. The piecewise definition swaps 1↔2 and 3↔4, which is a product of two transpositions. This example mirrors NCERT Example 12 but on a smaller set, making the verification completely explicit.

ANSWER: \( f \) is bijective.

## COMPETENCY_QUESTION_1
QUESTION: A coaching institute assigns each student a unique 4‑digit code from 1000 to 1999 (inclusive). There are exactly 1000 students. The function \( g \) maps a student to their code.  
(a) Is \( g \) injective? Justify.  
(b) Is \( g \) surjective? Justify.  
(c) Is \( g \) bijective? Explain using the finite‑set property.

COMPETENCY: Translating real‑world situations to mathematical expressions  
STEPS:
- Step 1: Identify domain (students, size 1000) and codomain (codes 1000–1999, size 1000).
- Step 2: For injectivity, use the fact that codes are unique.
- Step 3: For surjectivity, use the fact that all 1000 codes are used.
- Step 4: Apply the theorem: for finite sets of equal cardinality, injective ⇔ surjective ⇔ bijective.
- Step 5: State the conclusion for each part.

ANSWER:  
(a) Yes, \( g \) is injective because distinct students receive distinct codes (by design).  
(b) Yes, \( g \) is surjective because every code from 1000 to 1999 is assigned to some student (all 1000 codes are used).  
(c) Yes, \( g \) is bijective. Since domain and codomain are finite and have the same number of elements, injectivity implies surjectivity and vice‑versa; the function is a perfect one‑to‑one correspondence.

DIFFICULTY: easy

## COMPETENCY_QUESTION_2
QUESTION: Assertion (A): The function \( f: \mathbb{Z} \to \mathbb{Z} \) defined by \( f(x)=x+1 \) is bijective.  
Reason (R): Every function from an infinite set to itself that is injective is also surjective.  
Choose the correct option:  
(A) Both A and R are true and R is the correct explanation of A.  
(B) Both A and R are true but R is NOT the correct explanation of A.  
(C) A is true but R is false.  
(D) A is false but R is true.

COMPETENCY: Comparing and justifying  
STEPS:
- Step 1: Check Assertion (A). Test injectivity: \( f(x_1)=f(x_2) \Rightarrow x_1+1=x_2+1 \Rightarrow x_1=x_2 \). Test surjectivity: for any \( y\in\mathbb{Z} \), \( x=y-1 \in \mathbb{Z} \) gives \( f(x)=y \). So A is true.
- Step 2: Evaluate Reason (R). The statement “every injective function from an infinite set to itself is surjective” is FALSE. Counter‑example: \( g:\mathbb{N}\to\mathbb{N},\ g(x)=2x \) is injective but not surjective.
- Step 3: Since A is true and R is false, select the correct option.

ANSWER: Option (C) — A is true but R is false.  
The assertion is correct because \( f(x)=x+1 \) is a bijection on \( \mathbb{Z} \) (it shifts every integer by 1). The reason is a common misconception: the finite‑set property does **not** extend to infinite sets. This distinction is critical for JEE Advanced and board competency questions.

DIFFICULTY: medium

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a school library where each of the 500 students receives a unique library card number from 1 to 500, and every number is used ______ once.

## DIAGNOSTIC_ANSWER_7
exactly

Exactly once is the double promise compressed: no number shared (injective) and none skipped (surjective) in the same breath. **A wrong answer (approximately or at most) reveals the student has softened a pairing that the definition permits no slack in.**

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can (1) verify whether a given function is bijective by separately checking injectivity and surjectivity with rigorous algebraic steps, (2) construct explicit examples of bijective functions between given finite or infinite sets, and (3) explain why a function fails to be bijective by identifying which of the two conditions.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: Imagine a school library where each of the 500 students ______ a unique library card number from 1 to 500, and every number is used exactly once.

## DIAGNOSTIC_ANSWER_9
receives

The receiving verb is the library's act: cards are handed out by a rule, and the bijection lives in the fairness of that rule. **A wrong answer (a receiving-side word) reveals the student has watched the students rather than the issuing function the definition studies.**
