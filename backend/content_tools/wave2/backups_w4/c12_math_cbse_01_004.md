## ELI5
A hostel with sixty keys for fifty rooms: some keys open nothing, so the key-ring (codomain) is bigger than the used-up reality (range). A function is onto or surjective when every codomain element is actually hit - every y has some x mapping to it - which amounts to the range filling the codomain exactly. The fifty students and sixty roll numbers fail the test: ten numbers belong to no one. To check, solve f of x equals y for x and see whether the answer always exists in the domain.

## DEFINITION
A function \( f: X \to Y \) is called **onto (or surjective)** if every element of the codomain \( Y \) is the image of at least one element of the domain \( X \). Formally, \( \forall y \in Y, \; \exists x \in X \) such that \( f(x) = y \). Equivalently, the range of \( f \) equals the codomain \( Y \).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) determine whether a given function with specified domain and codomain is onto by checking if range = codomain, (2) construct the pre-image of an arbitrary \( y \in Y \) to prove surjectivity, and (3) explain why a function fails to be onto by identifying a specific element in the codomain with no pre-image.

## SCOPE_BOUNDARY
Covers the definition of onto (surjective) functions, methods to prove/disprove surjectivity for functions defined by formulas on sets like \( \mathbb{N}, \mathbb{Z}, \mathbb{Q}, \mathbb{R} \), and finite sets. Does NOT cover bijective functions (next node), composition of functions, or inverse functions. Restricted to Class 12 NCERT scope: real-valued functions and functions on discrete sets.

## WALKTHROUGH
Imagine a school with 50 students (domain) and 60 roll numbers (codomain). The function "roll number of student" assigns each student a unique roll number. Is every roll number used? If roll numbers go from 1 to 60, then 10 roll numbers have no student — the function is NOT onto. To check surjectivity, we ask: "For an arbitrary roll number \( y \), can we find a student \( x \) such that \( f(x) = y \)?" Start by writing the definition: \( f: X \to Y \) is onto if \( \forall y \in Y, \exists x \in X \) with \( f(x) = y \). Then pick a generic \( y \) in the codomain and try to solve \( f(x) = y \) for \( x \) in the domain. If the solution always lies in the domain, the function is onto; otherwise, exhibit a specific \( y \) with no pre-image.

Takeaway first: surjectivity is a coverage question - the codomain's every element must find a pre-image, or equivalently range equals codomain - and one orphan element vetoes it. Exam moves: determine questions checking range against a specified codomain, construct questions building the pre-image of an arbitrary y, and explain questions finding the exact codomain element that fails. Method: rerun the roll numbers - fifty students, sixty numbers, ten orphans - then run the generic-y test on one given function. Check yourself: whether a function is onto depends on the codomain you declare; enlarging it can break surjectivity without changing a single value. Drill: decide onto-status for two functions with different codomains and exhibit the missing element in the failing case.

## DIAGNOSTIC_QUESTION_1
State the precise mathematical definition of an onto (surjective) function \( f: X \to Y \). Use quantifiers.

## DIAGNOSTIC_ANSWER_1
Correct answer: \( \forall y \in Y, \; \exists x \in X \) such that \( f(x) = y \). A wrong answer like "every \( x \) has a unique \( y \)" confuses onto with the definition of a function; "distinct \( x \) give distinct \( y \)" describes one-one. This reveals the student does not distinguish between domain/codomain roles in surjectivity.

## DIAGNOSTIC_QUESTION_2
Consider \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = x^2 \). A student claims: "Since every real number \( y \) has a square root, \( f \) is onto." Identify the flaw in this reasoning.

## DIAGNOSTIC_ANSWER_2
The flaw: \( y = -1 \in \mathbb{R} \) has no real \( x \) with \( x^2 = -1 \). The student incorrectly assumed every real number has a real square root, ignoring that the square root of a negative number is not real. This reveals the misconception that "solving \( f(x)=y \) algebraically" is sufficient without checking if the solution lies in the specified domain.

## DIAGNOSTIC_QUESTION_3
Determine whether \( f: \mathbb{Z} \to \mathbb{Z} \) defined by \( f(x) = 3x + 2 \) is onto. Show your work.

## DIAGNOSTIC_ANSWER_3
Let \( y \in \mathbb{Z} \). Solve \( 3x + 2 = y \Rightarrow x = \frac{y-2}{3} \). For \( y = 0 \), \( x = -\frac{2}{3} \notin \mathbb{Z} \). Hence no integer \( x \) maps to 0. Therefore \( f \) is NOT onto. A wrong answer claiming it is onto typically forgets to verify that \( x \) is an integer; they only solve algebraically in \( \mathbb{R} \).

## DIAGNOSTIC_QUESTION_4
Compare the functions \( f: \mathbb{N} \to \mathbb{N}, f(x)=2x \) and \( g: \mathbb{R} \to \mathbb{R}, g(x)=2x \). One is onto, the other is not. Which is which? Explain the role of the domain/codomain.

## DIAGNOSTIC_ANSWER_4
\( g: \mathbb{R} \to \mathbb{R} \) is onto because for any \( y \in \mathbb{R} \), \( x = y/2 \in \mathbb{R} \). \( f: \mathbb{N} \to \mathbb{N} \) is NOT onto because \( y=1 \in \mathbb{N} \) gives \( x=0.5 \notin \mathbb{N} \). The error is thinking the formula alone determines surjectivity; the sets \( X \) and \( Y \) are equally critical.

## DIAGNOSTIC_QUESTION_5
A student proves \( f: \mathbb{R} \to \mathbb{R}, f(x)=x^3 \) is onto by saying: "For any \( y \), take \( x = \sqrt[3]{y} \). Then \( f(x) = (\sqrt[3]{y})^3 = y \)." Is this proof complete? If not, what is missing?

## DIAGNOSTIC_ANSWER_5
The proof is incomplete because it does not explicitly verify that \( \sqrt[3]{y} \in \mathbb{R} \) for every \( y \in \mathbb{R} \). While true, a rigorous proof must state: "Since the cube root of any real number is real, \( x \in \mathbb{R} \)." Missing this step shows the student does not understand that the pre-image must belong to the specified domain.

## DIAGNOSTIC_QUESTION_6
Construct a function \( f: \{1,2,3\} \to \{a,b\} \) that is onto but not one-one. Draw its arrow diagram and explain why it satisfies surjectivity but fails injectivity.

## DIAGNOSTIC_ANSWER_6
Example: \( f(1)=a, f(2)=b, f(3)=a \). Arrow diagram: 1→a, 2→b, 3→a. Every element of \( \{a,b\} \) has a pre-image (a has 1 and 3; b has 2), so onto. But \( f(1)=f(3)=a \) with \( 1 \neq 3 \), so not one-one. A poor answer might give a non-function or a function that misses an element of the codomain, showing confusion between the two properties.

## COMMON_MISCONCEPTION
Students often think "onto" means "the function covers all possible outputs of the formula" rather than "the range equals the explicitly given codomain." For example, for \( f: \mathbb{Z} \to \mathbb{Z}, f(x)=2x \), they say "it's onto because every even integer is hit" — but the codomain is ALL integers, and odd integers have no pre-image. They confuse the range (even integers) with the codomain (\( \mathbb{Z} \)). Another error: when solving \( f(x)=y \) for \( x \), they forget to check if the resulting \( x \) lies in the domain (e.g., getting a fractional \( x \) when domain is \( \mathbb{N} \)).

## ON_FAILURE
If a student confuses range and codomain: (1) Revisit the definition: "Range = set of all actual outputs; Codomain = set of all allowed outputs." (2) For \( f: \mathbb{Z} \to \mathbb{Z}, f(x)=2x \), explicitly list range = {..., -4, -2, 0, 2, 4, ...} and codomain = \( \mathbb{Z} \); note 1 ∈ codomain but 1 ∉ range. (3) Practice: Given \( f: A \to B \), first compute range, then compare with B. If range ⊂ B (proper subset), NOT onto. Use concrete finite sets first: \( A=\{1,2,3\}, B=\{a,b,c,d\}, f=\{(1,a),(2,b),(3,c)\} \) — range={a,b,c} ≠ B, so not onto.

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_005, c11_math_cbse_02_006, c11_math_cbse_02_007, c12_math_cbse_01_003, c12_math_cbse_01_001, c12_math_cbse_01_002

## PREREQUISITE_REASONS
c11_math_cbse_02_005: Defines function, domain, codomain, range — essential to understand surjectivity.
c11_math_cbse_02_006: Covers identity and constant functions; constant functions are typical non-onto examples.
c11_math_cbse_02_007: Polynomial functions (linear, quadratic) are standard test cases for onto.
c12_math_cbse_01_003: One-one (injective) functions are the companion concept; understanding injectivity helps contrast with surjectivity.
c12_math_cbse_01_001: Onto (surjective) functions involve the range equalling the codomain, which relates to the "for all" quantification used in reflexivity.  
c12_math_cbse_01_002: onto functions and partitions of the domain into pre-image sets are direct applications of equivalence relations.  

## FORWARD_NODE_IDS
c12_math_cbse_01_005, c12_math_cbse_01_007, c12_math_cbse_01_006

## FORWARD_REASONS
c12_math_cbse_01_005: Bijective functions require both one-one and onto; this node provides the onto part.
c12_math_cbse_01_007: Invertible functions are exactly bijective functions; surjectivity is a necessary condition.
c12_math_cbse_01_006: Surjectivity is needed to analyze when composition preserves surjectivity.  

## CROSS_SUBJECT_PREREQS
c11_math_cbse_13_006, c11_math_cbse_13_007
## CROSS_SUBJECT_REASONS
c11_math_cbse_13_006: Derivatives and monotonicity help determine if a real function is onto (e.g., continuous strictly monotonic functions on \( \mathbb{R} \) are onto).
c11_math_cbse_13_007: Polynomial derivatives; cubic polynomials are onto \( \mathbb{R} \) because they are continuous and limits at ±∞ are ±∞.

## CHAIN_DESCRIPTION
c11_math_cbse_02_005 -> c12_math_cbse_01_004 -> c12_math_cbse_01_005

## THIS_FORMULA
\( f: X \to Y \) is onto (surjective) \( \iff \forall y \in Y, \; \exists x \in X \) such that \( f(x) = y \iff \text{Range}(f) = Y \)

## FORMULA_VARIABLES
\( f \): function; \( X \): domain; \( Y \): codomain; \( x \): element of domain; \( y \): element of codomain; Range(f): set of all \( f(x) \) for \( x \in X \)

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c12_phy_cbse_01_001 | In physics, a mapping from initial conditions to final states must be onto for every possible final state to be reachable; surjectivity of the evolution operator is a key concept in control theory.
 c12_eco_cbse_02_003 | In economics, a production function \( Q = f(L,K) \) is onto the set of feasible outputs if every feasible output level can be achieved by some input combination; this relates to the concept of production possibility frontier.
## PREREQ_CONCEPT
Understanding the distinction between codomain (the set of all possible outputs) and range (the set of actual outputs) of a function.

## PREREQ_BEFORE
The student must be able to identify the domain, codomain, and range of a given function, and evaluate \( f(x) \) for given \( x \).

## PREREQ_STUCK
If stuck, review "Functions: Definition and Types" (c11_math_cbse_02_005) to recall domain, codomain, and range definitions.

## WORKED_EXAMPLE_1
PROBLEM: A school assigns each student a unique ID number from 1 to 100. The function \( f: \text{Students} \to \{1,2,\dots,100\} \) maps each student to their ID. There are 80 students. Is \( f \) onto? Justify.

STEPS:
- Step 1: Identify the domain \( X \) = set of 80 students, codomain \( Y = \{1,2,\dots,100\} \).
- Step 2: Recall definition: \( f \) is onto if every element of \( Y \) is the image of some element of \( X \).
- Step 3: Since there are only 80 students but 100 possible IDs, at least 20 IDs are not assigned to any student.
- Step 4: Pick a specific unassigned ID, say 95 (assuming IDs 1-80 are used). There is no student \( x \) with \( f(x)=95 \).
- Step 5: Conclude \( f \) is NOT onto because range = {1,...,80} ≠ Y.
REASONING: Surjectivity requires the range to equal the codomain. Here the domain has fewer elements than the codomain, so by pigeonhole principle, the function cannot be onto. This illustrates that for finite sets, \( |X| < |Y| \) implies NOT onto.
ANSWER: Not onto; range has 80 elements, codomain has 100.

## WORKED_EXAMPLE_2
PROBLEM: Determine whether \( f: \mathbb{R} \to \mathbb{R} \) defined by \( f(x) = \frac{2x-1}{3} \) is onto.

STEPS:
- Step 1: Let \( y \in \mathbb{R} \) be arbitrary. We need to find \( x \in \mathbb{R} \) such that \( f(x) = y \).
- Step 2: Set up equation: \( \frac{2x-1}{3} = y \).
- Step 3: Solve for \( x \): multiply both sides by 3 → \( 2x - 1 = 3y \); add 1 → \( 2x = 3y + 1 \); divide by 2 → \( x = \frac{3y+1}{2} \).
- Step 4: Verify \( x \in \mathbb{R} \): Since \( y \in \mathbb{R} \), \( 3y+1 \in \mathbb{R} \), and division by 2 gives a real number. So \( x \in \mathbb{R} \).
- Step 5: Check: \( f\left(\frac{3y+1}{2}\right) = \frac{2\left(\frac{3y+1}{2}\right)-1}{3} = \frac{3y+1-1}{3} = y \). Thus every \( y \) has a pre-image.
REASONING: For linear functions \( f(x)=ax+b \) with \( a \neq 0 \) on \( \mathbb{R} \), the equation \( f(x)=y \) always has a unique real solution \( x = \frac{y-b}{a} \), so they are onto (and one-one). The key is verifying the solution lies in the domain.
ANSWER: Yes, \( f \) is onto.

## WORKED_EXAMPLE_3
PROBLEM: Let \( A = \{1,2,3,4\} \), \( B = \{a,b,c\} \). Define \( f: A \to B \) by \( f(1)=a, f(2)=b, f(3)=c, f(4)=a \). Is \( f \) onto? If yes, find the pre-image of each element of \( B \).

STEPS:
- Step 1: List the codomain \( B = \{a,b,c\} \).
- Step 2: For each \( y \in B \), find at least one \( x \in A \) with \( f(x)=y \).
- Step 3: For \( y=a \): \( f(1)=a \) and \( f(4)=a \) → pre-images: 1,4.
- Step 4: For \( y=b \): \( f(2)=b \) → pre-image: 2.
- Step 5: For \( y=c \): \( f(3)=c \) → pre-image: 3.
- Step 6: Since every element of \( B \) has at least one pre-image in \( A \), \( f \) is onto.
REASONING: For finite sets, we can check surjectivity by exhaustion. The function is onto because the range \( \{a,b,c\} \) equals the codomain \( B \). Note that \( f \) is not one-one because \( f(1)=f(4) \).
ANSWER: Yes, onto. Pre-images: \( f^{-1}(a)=\{1,4\}, f^{-1}(b)=\{2\}, f^{-1}(c)=\{3\} \).

## COMPETENCY_QUESTION_1
QUESTION: A function \( f: \mathbb{Z} \to \mathbb{Z} \) is defined by \( f(x) = x^2 + x \). Is \( f \) onto? Justify your answer by either proving surjectivity or providing a specific counterexample in the codomain with no pre-image.

COMPETENCY: Translating real-world situations to mathematical expressions; Error identification and correction
STEPS:
- Step 1: Understand the problem: domain = codomain = integers. Need to check if every integer \( y \) can be written as \( x^2+x \) for some integer \( x \).
- Step 2: Analyze the expression \( x^2+x = x(x+1) \). Note it is always even because product of two consecutive integers.
- Step 3: Conclude that any odd integer \( y \) (e.g., \( y=1 \)) cannot be expressed as \( x^2+x \).
- Step 4: Verify: \( x^2+x=1 \Rightarrow x^2+x-1=0 \), discriminant = 5, roots not integers.
- Step 5: State conclusion: \( f \) is not onto because odd integers have no pre-image.
ANSWER: Not onto. Counterexample: \( y=1 \) (or any odd integer) has no integer \( x \) with \( f(x)=1 \).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \( f: \mathbb{R} \to \mathbb{R} \) be defined by \( f(x) = x^3 - 3x \). Prove that \( f \) is onto. (Hint: Use continuity and limits at infinity, or show that for any \( y \in \mathbb{R} \), the cubic equation \( x^3 - 3x - y = 0 \) has a real root.)

COMPETENCY: Comparing and justifying; Multi-step analytical reasoning
STEPS:
- Step 1: Recognize \( f \) is a polynomial, hence continuous on \( \mathbb{R} \).
- Step 2: Compute limits: \( \lim_{x\to -\infty} f(x) = -\infty \), \( \lim_{x\to +\infty} f(x) = +\infty \).
- Step 3: By Intermediate Value Theorem, for any \( y \in \mathbb{R} \), there exist \( a,b \) with \( f(a) < y < f(b) \), so there is \( c \in (a,b) \) with \( f(c)=y \).
- Step 4: Alternatively, the cubic equation \( x^3 - 3x - y = 0 \) has discriminant \( \Delta = 108 - 27y^2 \)? Actually for cubic \( x^3+px+q=0 \), it always has at least one real root because complex roots come in pairs.
- Step 5: Conclude: For every \( y \in \mathbb{R} \), there exists \( x \in \mathbb{R} \) with \( f(x)=y \). Hence \( f \) is onto.
ANSWER: \( f \) is onto. Reason: Continuous, limits at ±∞ are ∓∞, so by IVT every real value is attained.
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: Imagine a school with 50 students (domain) and 60 roll numbers (______).

## DIAGNOSTIC_ANSWER_7
codomain

Codomain is the declared universe: onto-ness is measured against every element the function promises, not merely the ones it reaches. **A wrong answer (range) reveals the student has compared the function to itself - range equals codomain is the test, not the codomain's definition.**
