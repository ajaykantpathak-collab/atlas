## ELI5
Cafeteria rule: every student gets exactly one lunch menu - none gets zero, none gets two. That is a function f: A → B: a relation whose domain is all of A and whose pairs never repeat a first element. Check any candidate relation with two questions - does every element of A appear as first coordinate? does any first coordinate carry two different second coordinates? Yes and no: function. The one-and-only-one image condition is the entire gate between relation and function.

## DEFINITION
A function \(f\) from a non-empty set \(A\) to a non-empty set \(B\) is a relation such that every element \(x \in A\) has exactly one image \(y \in B\); equivalently, the domain of \(f\) is \(A\) and no two distinct ordered pairs in \(f\) share the same first element. We write \(f: A \to B\) and \(f(x) = y\) where \(y\) is the image of \(x\) and \(x\) is the pre-image of \(y\).

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can (1) decide whether a given relation (as a set of ordered pairs, arrow diagram, or rule) is a function by checking the "one and only one image" condition, (2) state the domain, codomain, and range of a function, and (3) classify a function as identity, constant, polynomial, rational, modulus, signum, or greatest-integer type from its algebraic rule.

## SCOPE_BOUNDARY
This node covers the formal definition of a function as a special relation, the vertical-line test rationale, determination of domain/range/codomain, and the seven standard real function types listed in NCERT §2.4.1. It does NOT cover algebra of functions (sum, difference, product, quotient), detailed graph sketching, or word-problem modelling—those are handled in subsequent nodes (c11_math_cbse_02_010, 02_011, 02_012).

## WALKTHROUGH
Imagine a school cafeteria where every student (set \(A\)) must be assigned exactly one lunch menu (set \(B\)) for the day—no student gets zero menus, and no student gets two different menus. This "exactly one" rule is the heart of a function. Start by writing down the two sets \(A\) and \(B\) and the proposed pairing rule. Check: does every element of \(A\) appear as a first coordinate? Does any element of \(A\) appear with two different second coordinates? If both answers are "yes" and "no" respectively, you have a function. The key insight: a function is a relation with the extra restriction that the domain equals the whole of \(A\) and first coordinates are unique.

Takeaway: mastery means the two-part test being run on pairs, diagrams and rules alike - total coverage of A, unique images - and the standard families (identity, constant, polynomial, rational, modulus, signum, greatest integer) being classified by their rules. Exam moves: decide-if-a-relation-is-a-function questions and find-domain-and-range items with justification. Check yourself: two students sharing a menu is fine; one student holding two menus is fatal - multiplicity is allowed only on the arrival side. Students miss it because they police the wrong side, when the definition constrains first coordinates only: many-to-one is legal, one-to-many is not.

## DIAGNOSTIC_QUESTION_1
State the precise condition that distinguishes a function from a general relation between two non-empty sets \(A\) and \(B\).

## DIAGNOSTIC_ANSWER_1
A relation \(f \subseteq A \times B\) is a function iff (i) \(\text{dom}(f) = A\) (every element of \(A\) has at least one image) and (ii) no two ordered pairs in \(f\) have the same first element (every element of \(A\) has at most one image). Together: every \(x \in A\) has exactly one image in \(B\).  
A wrong answer (e.g., "each element of \(A\) has an image" without the uniqueness part) reveals confusion between "relation" and "function"—the student has missed the "one and only one" requirement.

## DIAGNOSTIC_QUESTION_2
The relation \(R = \{(1,2), (2,3), (3,4), (2,5)\}\) is defined from \(A = \{1,2,3\}\) to \(B = \{2,3,4,5\}\). Explain why \(R\) is NOT a function, referencing the definition.

## DIAGNOSTIC_ANSWER_2
\(R\) is not a function because the element \(2 \in A\) appears as the first coordinate in two distinct ordered pairs: \((2,3)\) and \((2,5)\). This violates the "no two ordered pairs have the same first element" condition (or equivalently, "one and only one image").  
A wrong answer that only says "2 has two images" without linking to the definition shows the student can spot the pattern but cannot articulate the formal criterion.

## DIAGNOSTIC_QUESTION_3
Let \(f: \mathbb{R} \to \mathbb{R}\) be defined by \(f(x) = \frac{x^2 - 4}{x - 2}\). Determine the domain of \(f\) and simplify the rule. Is the simplified rule equivalent to the original function? Justify.

## DIAGNOSTIC_ANSWER_3
Domain: \(\mathbb{R} \setminus \{2\}\) because denominator \(x-2 \neq 0\).  
Simplification: \(\frac{(x-2)(x+2)}{x-2} = x+2\) for \(x \neq 2\).  
The simplified rule \(g(x) = x+2\) has domain \(\mathbb{R}\), so \(f \neq g\) as functions (different domains). They agree on \(\mathbb{R} \setminus \{2\}\) but \(f\) is undefined at \(x=2\).  
A wrong answer claiming \(f(x) = x+2\) for all real \(x\) reveals the common error of cancelling factors without restricting the domain—a senior-secondary algebraic manipulation mistake.

## DIAGNOSTIC_QUESTION_4
Compare the functions \(f(x) = |x|\) and \(g(x) = \sqrt{x^2}\) for \(x \in \mathbb{R}\). Are they the same function? Analyse their domains, ranges, and algebraic forms.

## DIAGNOSTIC_ANSWER_4
Yes, they are the same function. Both have domain \(\mathbb{R}\), range \([0, \infty)\), and for every \(x \in \mathbb{R}\), \(|x| = \sqrt{x^2}\) by definition of the principal square root. The algebraic forms differ but the mappings are identical.  
A wrong answer saying "they are different because one uses modulus and the other uses square root" shows the student confuses representation with the function itself; they have not internalised that a function is determined by its domain, codomain, and assignment rule.

## DIAGNOSTIC_QUESTION_5
A student claims: "The relation \(R = \{(x,y) \in \mathbb{Z} \times \mathbb{Z} : y^2 = x\}\) is a function from \(\mathbb{Z}\) to \(\mathbb{Z}\) because every integer \(x\) has a square root." Evaluate this claim and correct the reasoning.

## DIAGNOSTIC_ANSWER_5
The claim is false. For \(x = 4\), both \(y = 2\) and \(y = -2\) satisfy \(y^2 = 4\), so \(4\) has two images—violating uniqueness. Moreover, negative integers (e.g., \(x = -1\)) have no integer square root, violating the "every element of domain has an image" condition. The student confused "square root exists in \(\mathbb{R}\)" with "unique integer image exists".  
A wrong evaluation that accepts the claim reveals the student does not check both existence and uniqueness, and ignores the codomain restriction to \(\mathbb{Z}\).

## DIAGNOSTIC_QUESTION_6
Construct a real-valued function \(f: \mathbb{R} \to \mathbb{R}\) that is neither polynomial, nor rational, nor modulus, nor signum, nor greatest-integer, nor identity, nor constant. Define it piecewise and state its domain and range.

## DIAGNOSTIC_ANSWER_6
Example:  
\(f(x) = \begin{cases} \sin x, & x \in \mathbb{Q} \\ 0, & x \notin \mathbb{Q} \end{cases}\)  
Domain: \(\mathbb{R}\), Range: \([-1,1] \cap \mathbb{Q} \cup \{0\}\) (or simply \([-1,1]\)).  
This is a valid real function not belonging to the seven NCERT types. A poor answer that only gives a standard type (e.g., \(f(x)=x^2\)) shows the student cannot think beyond the listed catalogue and treats the classification as exhaustive.

## COMMON_MISCONCEPTION
Students often cancel common factors in a rational expression and declare the simplified expression as the function, forgetting to exclude the values that made the original denominator zero. For example, given \(f(x) = \frac{x^2-1}{x-1}\), they write \(f(x) = x+1\) with domain \(\mathbb{R}\), missing that \(x=1\) is not in the domain of the original function. This is a domain-loss error specific to rational functions at the senior-secondary level.

## ON_FAILURE
1. Write the original function rule and explicitly find the values that make the denominator zero.  
2. State the domain as \(\mathbb{R} \setminus \{\text{those values}\}\).  
3. Perform algebraic simplification only on the restricted domain.  
4. Write the final answer as: "\(f(x) = \text{simplified expression}, \text{ for } x \in \text{domain}\)".  
5. Practise with \(f(x) = \frac{x^3-8}{x-2}\) and \(g(x) = \frac{x^2-4x+4}{x-2}\) to reinforce that the hole in the domain remains even after cancellation.

## PREREQUISITE_NODE_IDS
c11_math_cbse_02_001, c11_math_cbse_02_002, c11_math_cbse_02_003, c11_math_cbse_02_004, c9_math_ch1_1, c9_math_ch1_2, c10_math_cbse_02_001
## PREREQUISITE_REASONS
c11_math_cbse_02_001: Cartesian product provides the set \(A \times B\) from which a function is a subset.  
c11_math_cbse_02_002: Properties of Cartesian product (e.g., \(n(A \times B) = n(A)n(B)\)) are used when counting possible functions.  
c11_math_cbse_02_003: Definition of relation as a subset of \(A \times B\) is the starting point; function is a special relation.  
c11_math_cbse_02_004: Domain, codomain, range of a relation are directly carried over to functions.  
c9_math_ch1_1: Cartesian coordinate system is needed to visualise functions as graphs.  
c9_math_ch1_2: Plotting points helps in understanding the "one image" condition geometrically (vertical line test).  
c10_math_cbse_02_001: Zeros of polynomials and x-intercepts connect to solving \(f(x)=0\) for polynomial functions.

## FORWARD_NODE_IDS
c11_math_cbse_02_006, c11_math_cbse_02_007, c11_math_cbse_02_008, c11_math_cbse_02_009, c11_math_cbse_02_010, c11_math_cbse_02_011, c11_math_cbse_02_012, c12_eco_cbse_03_001, c12_eco_cbse_10_002, c12_eco_cbse_10_003, c12_eco_cbse_10_004, c12_math_cbse_01_003, c12_math_cbse_01_004, c12_math_cbse_01_005, c12_math_cbse_01_006, c12_math_cbse_01_007, c12_math_cbse_01_008, c12_math_cbse_01_010, c12_math_cbse_02_001, c12_math_cbse_02_002, c12_math_cbse_03_001, c12_math_cbse_03_007, c12_math_cbse_04_001, c12_math_cbse_04_002, c12_math_cbse_05_001, c12_math_cbse_06_002, c12_math_cbse_09_001, c12_math_cbse_09_002, c12_math_cbse_09_003, c12_math_cbse_09_005, c12_math_cbse_09_006

## FORWARD_REASONS
c11_math_cbse_02_006: Identity and constant functions are the simplest instances of the definition given here.  
c11_math_cbse_02_007: Polynomial functions are a major class of real functions; their definition builds on "function" and "polynomial".  
c11_math_cbse_02_008: Rational and modulus functions require the function concept plus algebraic/absolute-value manipulation.  
c11_math_cbse_02_009: Signum and greatest-integer functions are defined piecewise; understanding "function as a rule" is essential.  
c11_math_cbse_02_010: Algebra of functions (sum, difference, etc.) operates on functions whose definition is established here.  
c11_math_cbse_02_011: Graphing functions requires knowing what a function is and its domain/range.  
c11_math_cbse_02_012: Word problems model real situations as functions; the definition tells us what qualifies as a valid model.
c12_eco_cbse_03_001: Introduces functions (definition, domain, range) — the production function Q = f(L, K) is a multivariate function.  
c12_eco_cbse_10_002: Polynomial Functions: Linear and Quadratic — consumption function is linear: C = C̅ + cY  
c12_eco_cbse_10_003: Polynomial functions (linear) provide the algebraic framework for manipulating C = a + bY into S = -a + (1-b)Y.  
c12_eco_cbse_10_004: Polynomial functions (linear) — the consumption and saving functions are linear (C = a + bY), requiring understanding of slope (b = MPC) and intercept.  
c12_math_cbse_01_003: Defines function, domain, codomain, range — essential to state \( f: X \to Y \) correctly.  
c12_math_cbse_01_004: Defines function, domain, codomain, range — essential to understand surjectivity.  
c12_math_cbse_01_005: Basic definition of a function, domain, codomain, and range — the foundational language used in this node.  
c12_math_cbse_01_006: Students must understand function notation, domain, codomain, and range from Class 11.  
c12_math_cbse_01_007: Basic definition of a function, domain, codomain, range.  
c12_math_cbse_01_008: Binary operation is a special type of function (from \( S \times S \) to \( S \)), so understanding functions, domain, codomain, and uniqueness of output is essential.  
c12_math_cbse_01_010: Functions; a binary operation is a function \(* : S \times S \to S\), so understanding functions as mappings is essential.  
c12_math_cbse_02_001: Understanding that an inverse function exists only for bijective functions, and that domain/range swap, is essential.  
c12_math_cbse_02_002: Functions definition and types — needed to understand why inverse functions require the original to be bijective (one-one and onto).  
c12_math_cbse_03_001: Functions as mappings from domain to codomain parallel the idea of a_ij as a function of indices i and j.  
c12_math_cbse_03_007: Functions and composition of functions (f∘g ≠ g∘f) provides the conceptual bridge — matrices represent linear transformations, and transformation composition is non-commutative.  
c12_math_cbse_04_001: Determinant is a function from square matrices to numbers; understanding functions (domain, codomain, uniqueness) is essential.  
c12_math_cbse_04_002: Functions concept — determinant is a function from square matrices to numbers; understanding domain/codomain avoids "modulus" confusion.  
c12_math_cbse_05_001: Definition of a function, domain, and range — needed to know where \(f(c)\) is defined.  
c12_math_cbse_06_002: Function definition, domain, interval notation.  
c12_math_cbse_09_001: Concept of a function (dependent/independent variable) is essential to identify which variable is differentiated with respect to which.  
c12_math_cbse_09_002: Understanding functions (polynomial, transcendental) is essential to distinguish polynomial vs non-polynomial terms in derivatives.  
c12_math_cbse_09_003: Solutions are functions; understanding domain, range, and substitution is essential for verification.  
c12_math_cbse_09_005: Functions (domain, range, types) needed to understand the functions \(g(x)\) and \(h(y)\) and the condition \(h(y) \neq 0\).  
c12_math_cbse_09_006: Understanding functions (domain, range, composition) is required to grasp the substitution \(v = y/x\) as a change of variable.  

## CROSS_SUBJECT_PREREQS
c9_math_ch2_1, c9_math_ch2_5, c10_math_cbse_04_001
## CROSS_SUBJECT_REASONS
c9_math_ch2_1: Linear polynomials \(ax+b\) are the first non-trivial functions students meet; they connect to rate of change in physics (velocity).  
c9_math_ch2_5: Graph of a linear equation in two variables is the geometric representation of a linear function.  
c10_math_cbse_04_001: Quadratic equations \(ax^2+bx+c=0\) arise from setting quadratic function \(f(x)=0\); discriminant analysis uses function properties.

## CHAIN_DESCRIPTION
c11_math_cbse_02_004 -> c11_math_cbse_02_005 -> c11_math_cbse_02_006

## THIS_FORMULA
\(f: A \to B\) is a function \(\iff\) (i) \(\text{dom}(f) = A\) and (ii) \((a,b_1) \in f \land (a,b_2) \in f \implies b_1 = b_2\). Notation: \(f(x) = y\) where \((x,y) \in f\).

## FORMULA_VARIABLES
\(A\) = domain (non-empty set), \(B\) = codomain (non-empty set), \(f\) = subset of \(A \times B\), \(x\) = element of \(A\) (pre-image), \(y\) = element of \(B\) (image), \(f(x)\) = value of function at \(x\).

## FORMULA_UNITS
dimensionless (sets and mappings have no physical units)

## COMPUTATION_TYPE
conceptual

## CROSS_SUBJECT
c11_physics_ch2_3 | Displacement-time, velocity-time graphs are functions; domain = time interval, codomain = displacement/velocity.  
c11_economics_ch2_1 | Demand function \(q = f(p)\) maps price \(p\) to quantity demanded \(q\); domain = permissible prices, range = possible quantities.

## PREREQ_CONCEPT
A relation is a subset of a Cartesian product; a function is a relation with the additional restrictions that the domain equals the whole first set and first coordinates are unique.

## PREREQ_BEFORE
The student must be able to (a) form the Cartesian product \(A \times B\), (b) identify a relation as a subset of \(A \times B\), and (c) find the domain, codomain, and range of a relation.

## PREREQ_STUCK
If stuck, revisit c11_math_cbse_02_003 (Relations: Definition) and c11_math_cbse_02_004 (Domain, Codomain, Range) to practise extracting domain/range from arrow diagrams and roster-form relations.

## WORKED_EXAMPLE_1
PROBLEM: A school library charges a fine for late return of books: ₹2 per day for the first 7 days, and ₹5 per day thereafter. Let \(x\) be the number of days late (\(x \in \mathbb{N}, x \ge 1\)). Define the fine \(F(x)\) as a piecewise function. Write \(F(x)\) in proper mathematical notation, state its domain and range, and determine if it is a function.

STEPS:
- Step 1: Identify the input set \(A\) (days late) and output set \(B\) (fine in rupees). Here \(A = \{1,2,3,\dots\} = \mathbb{N}\) and \(B = \mathbb{N}\) (fines are positive integers).
- Step 2: Translate the verbal rule into algebraic pieces. For \(1 \le x \le 7\): fine = \(2x\). For \(x \ge 8\): fine = \(2 \times 7 + 5(x-7) = 14 + 5x - 35 = 5x - 21\).
- Step 3: Write the piecewise definition: \(F(x) = \begin{cases} 2x, & 1 \le x \le 7 \\ 5x - 21, & x \ge 8 \end{cases}\).
- Step 4: Verify the function condition: every \(x \in \mathbb{N}\) falls into exactly one case, and each case gives a single output. No \(x\) is omitted, no \(x\) gets two outputs. Hence \(F\) is a function.
- Step 5: State domain = \(\mathbb{N}\) (or \(\{x \in \mathbb{Z} : x \ge 1\}\)). Range = \(\{2,4,6,8,10,12,14\} \cup \{19,24,29,\dots\}\) = \(\{2,4,6,8,10,12,14\} \cup \{5x-21 : x \in \mathbb{N}, x \ge 8\}\).

REASONING: The problem tests the ability to convert a real-world piecewise rule into a mathematical function. The key is ensuring the cases partition the domain completely and exclusively, which guarantees the "exactly one image" property. The domain is discrete (\(\mathbb{N}\)), so the range is also a discrete set.

ANSWER: \(F: \mathbb{N} \to \mathbb{N}\) defined by \(F(x) = \begin{cases} 2x, & 1 \le x \le 7 \\ 5x - 21, & x \ge 8 \end{cases}\); Domain = \(\mathbb{N}\), Range = \(\{2,4,6,8,10,12,14,19,24,29,\dots\}\). Yes, it is a function.

## WORKED_EXAMPLE_2
PROBLEM: Determine whether each of the following relations from \(\mathbb{R}\) to \(\mathbb{R}\) is a function. If it is, find its domain and range.
(i) \(R_1 = \{(x,y) : y = x^3\}\)  
(ii) \(R_2 = \{(x,y) : y^2 = x\}\)  
(iii) \(R_3 = \{(x,y) : x^2 + y^2 = 25\}\)

STEPS:
- Step 1: Recall the definition: a relation \(f \subseteq \mathbb{R} \times \mathbb{R}\) is a function iff every \(x \in \mathbb{R}\) has exactly one \(y \in \mathbb{R}\) such that \((x,y) \in f\).
- Step 2: Analyse \(R_1\). For any \(x \in \mathbb{R}\), \(y = x^3\) is a unique real number. Domain = \(\mathbb{R}\). Range = \(\mathbb{R}\) (cube function is onto). So \(R_1\) is a function.
- Step 3: Analyse \(R_2\). For \(x = 4\), \(y^2 = 4 \implies y = 2\) or \(y = -2\). Two images for one pre-image. Also for \(x = -1\), no real \(y\) satisfies \(y^2 = -1\). So domain \(\neq \mathbb{R}\) and uniqueness fails. \(R_2\) is not a function.
- Step 4: Analyse \(R_3\). For \(x = 0\), \(y^2 = 25 \implies y = \pm 5\). Two images. For \(x = 6\), no real \(y\). Fails both conditions. \(R_3\) is not a function.
- Step 5: Summarise: Only \(R_1\) is a function. Domain = \(\mathbb{R}\), Range = \(\mathbb{R}\).

REASONING: This example contrasts a bijective polynomial (cubic) with two relations that fail the vertical-line test. The cubic passes because odd-degree polynomials are strictly monotonic on \(\mathbb{R}\). The circle and sideways parabola fail because they assign multiple \(y\)-values to a single \(x\).

ANSWER: (i) Function, domain \(\mathbb{R}\), range \(\mathbb{R}\). (ii) Not a function. (iii) Not a function.

## WORKED_EXAMPLE_3
PROBLEM: Let \(f(x) = \frac{x^2 - 5x + 6}{x^2 - 4}\) and \(g(x) = \frac{x-3}{x+2}\). 
(a) Find the domains of \(f\) and \(g\).  
(b) Simplify \(f(x)\) algebraically.  
(c) Are \(f\) and \(g\) the same function? Justify.

STEPS:
- Step 1: Find domain of \(f\). Denominator \(x^2 - 4 = (x-2)(x+2) = 0 \implies x = 2, -2\). Domain\(_f = \mathbb{R} \setminus \{-2, 2\}\).
- Step 2: Find domain of \(g\). Denominator \(x+2 = 0 \implies x = -2\). Domain\(_g = \mathbb{R} \setminus \{-2\}\).
- Step 3: Factor numerator of \(f\): \(x^2 - 5x + 6 = (x-2)(x-3)\). So \(f(x) = \frac{(x-2)(x-3)}{(x-2)(x+2)}\) for \(x \neq 2, -2\).
- Step 4: Cancel common factor \((x-2)\) (valid since \(x \neq 2\)): \(f(x) = \frac{x-3}{x+2}\) for \(x \in \mathbb{R} \setminus \{-2, 2\}\).
- Step 5: Compare \(f\) and \(g\). They have the same rule \(\frac{x-3}{x+2}\) but different domains: \(f\) is undefined at \(x=2\) while \(g\) is defined at \(x=2\) (value \(g(2) = -\frac{1}{4}\)). Therefore \(f \neq g\) as functions.
- Step 6: Note that \(f\) can be extended to a function \(\tilde{f}\) on \(\mathbb{R} \setminus \{-2\}\) by defining \(\tilde{f}(2) = -\frac{1}{4}\); this extended function equals \(g\). But the original \(f\) and \(g\) are distinct.

REASONING: This problem combines rational function simplification with the formal definition of function equality (same domain, same codomain, same rule). The domain difference at \(x=2\) is a removable discontinuity, but at the set-theoretic level the functions are different. This is a classic board-exam trap.

ANSWER: (a) Domain\(_f = \mathbb{R} \setminus \{-2, 2\}\), Domain\(_g = \mathbb{R} \setminus \{-2\}\). (b) \(f(x) = \frac{x-3}{x+2}\) for \(x \neq -2, 2\). (c) No, \(f \neq g\) because their domains differ (\(2 \in \text{dom}(g)\) but \(2 \notin \text{dom}(f)\)).

## COMPETENCY_QUESTION_1
QUESTION: A relation \(R\) is defined on the set \(A = \{1,2,3,4,5,6\}\) by \(R = \{(x,y) : y = 2x - 1, x,y \in A\}\).  
(a) Write \(R\) in roster form.  
(b) Determine whether \(R\) is a function from \(A\) to \(A\).  
(c) If \(R\) is a function, find its range. If not, explain which condition fails.  
(d) How many functions from \(A\) to \(A\) have the same domain and codomain as \(R\)?

COMPETENCY: Translating real-world situations to mathematical expressions / Comparing and justifying

STEPS:
- Step 1: For each \(x \in A\), compute \(y = 2x-1\) and check if \(y \in A\).
- Step 2: List the ordered pairs that satisfy both conditions.
- Step 3: Check if every element of \(A\) appears exactly once as a first coordinate.
- Step 4: If it is a function, collect all second coordinates for the range.
- Step 5: The number of functions from a set of size \(n\) to itself is \(n^n\). Here \(n=6\).

ANSWER: (a) \(R = \{(1,1), (2,3), (3,5)\}\). (b) \(R\) is NOT a function from \(A\) to \(A\) because elements \(4,5,6 \in A\) have no image in \(A\) (for \(x=4\), \(y=7 \notin A\)). Domain of \(R\) is \(\{1,2,3\} \neq A\). (c) Not a function; domain condition fails. (d) Total functions from \(A\) to \(A\) = \(6^6 = 46656\).

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Let \(f: \mathbb{R} \setminus \{2\} \to \mathbb{R}\) be defined by \(f(x) = \frac{x^2 - 4}{x - 2}\) and \(g: \mathbb{R} \to \mathbb{R}\) be defined by \(g(x) = x + 2\).  
(a) Show that \(f(x) = g(x)\) for all \(x \in \text{dom}(f)\).  
(b) Is \(f = g\)? Justify using the formal definition of function equality.  
(c) Define a function \(h\) with the largest possible domain such that \(h(x) = f(x)\) for all \(x \in \text{dom}(f)\) and \(h\) is continuous on its domain.  
(d) Sketch the graphs of \(f\) and \(g\) on the same axes, indicating any holes or asymptotes.

COMPETENCY: Error identification and correction / Comparing and justifying

STEPS:
- Step 1: Simplify \(f(x)\) algebraically for \(x \neq 2\).
- Step 2: Recall that two functions are equal iff they have identical domains, identical codomains, and identical rules.
- Step 3: Compare domains of \(f\) and \(g\).
- Step 4: For \(h\), the largest domain avoiding division by zero is \(\mathbb{R} \setminus \{2\}\); but continuity requires filling the removable discontinuity at \(x=2\).
- Step 5: Sketch \(y = x+2\) (straight line) and mark an open circle at \((2,4)\) for \(f\); \(g\) has a filled circle at \((2,4)\).

ANSWER: (a) \(f(x) = \frac{(x-2)(x+2)}{x-2} = x+2 = g(x)\) for all \(x \neq 2\). (b) No, \(f \neq g\) because \(\text{dom}(f) = \mathbb{R} \setminus \{2\} \neq \mathbb{R} = \text{dom}(g)\). (c) \(h: \mathbb{R} \to \mathbb{R}\), \(h(x) = x+2\) (the continuous extension). (d) Graph: line \(y=x+2\); for \(f\), open circle at \((2,4)\); for \(g\), solid point at \((2,4)\).

DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: If both answers are "yes" and "no" respectively, you have a ______.

## DIAGNOSTIC_ANSWER_7
function

**A wrong answer ("relation" or "mapping") reveals the student has swapped the verdict noun - passing both checks, full coverage and unique images, makes the pairing a function.** Function is the walkthrough's own conclusion word, and the one-and-only-one image condition is precisely what earns the label. Quote it in fill-ups, keeping the conclusion noun exact.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
The student can (1) decide whether a given relation (as a set of ordered pairs, arrow diagram, or rule) is a function by checking the "one and only one image" condition, (2) state the domain, codomain, and range of a function, and (3) classify a function as identity, constant, polynomial, rational, modulus, signum, or greatest-integer.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: If both answers are "yes" and "no" ______, you have a function.

## DIAGNOSTIC_ANSWER_9
respectively

**A wrong answer ("respectively" misplaced or "in order") reveals the student has paraphrased the walkthrough's adverb - the two answers arrive as yes and no respectively.** Scenario blanks repeat the walkthrough verbatim, so the adverb is the walkthrough's own word pairing the answers to the questions. Recall the cafeteria's two checks before filling, and give the adverb exactly.
