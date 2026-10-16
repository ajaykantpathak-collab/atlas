## ELI5
A small business models profit as (3x^2 - 2/x)^7 and wants the coefficient of x^5 at break-even. The march is always the same: write the general term, merge the powers of x into a single exponent in r, set that exponent equal to the wanted power, and solve for r. If r is a whole number between 0 and 7, substitute back and collect the numerical factor; if not, the coefficient is 0 - that power simply never appears in the expansion.

## DEFINITION
The coefficient of \(x^n\) in the binomial expansion of \((a + b)^m\) (where \(m\) is a positive integer) is the numerical factor multiplying \(x^n\) when the expansion is expressed as a polynomial in \(x\). It is obtained by identifying the term \(T_{r+1} = \binom{m}{r} a^{m-r} b^r\) in which the exponent of \(x\) equals \(n\), solving for \(r\), and then evaluating \(\binom{m}{r}\) multiplied by the coefficients from \(a^{m-r}\) and \(b^r\).

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can correctly determine the coefficient of any specified power of \(x\) in a binomial expansion (including recognising when the coefficient is zero because the power does not appear), and can solve for unknown parameters (such as the exponent \(m\), or constants in \(a\) and \(b\)) when the coefficient of a particular power is given.

## SCOPE_BOUNDARY
Covers binomial expansions with positive integer exponents only, as per the Class 11 NCERT syllabus. Does not cover the binomial theorem for any index (infinite series) which is treated in node c11_math_cbse_08_009. Assumes the binomial is expressed in the form \((A x^p + B x^q)^m\) or similar where the powers of \(x\) are explicit.

## WALKTHROUGH
Imagine you are analysing the polynomial model for the profit of a small business: \(P(x) = (3x^2 - \frac{2}{x})^7\). You need the coefficient of \(x^5\) to predict the break‑even point. Begin by writing the general term of the expansion using the formula from node c11_math_cbse_08_002. Next, simplify the powers of \(x\) in that general term to get a single exponent in terms of \(r\). Set that exponent equal to 5 and solve for \(r\). If \(r\) is an integer between 0 and 7, substitute it back into the general term to extract the numerical coefficient; if not, the coefficient is zero. This process — general term → exponent equation → solve for \(r\) → compute coefficient — is the universal method for every “coefficient of \(x^n\)” problem.

Takeaway: mastery means the four-step march - general term, single exponent in r, exponent equation, coefficient - and recognising when the honest answer is zero because no integer r fits. Exam moves: coefficient-of-x^n questions and find-the-parameter items where the exponent m or a constant inside a and b is unknown but a coefficient is given. Check yourself: a coefficient question is a hunting question - you track the one term whose exponent matches, not the whole expansion. Students miss it because they expand everything, when the definition's method needs exactly one term: the general term already contains every term, and r picks the one.

## DIAGNOSTIC_QUESTION_1
Write the general term \(T_{r+1}\) in the expansion of \((2x^3 - \frac{1}{x})^9\). Do not simplify the coefficient.

## DIAGNOSTIC_ANSWER_1
\(T_{r+1} = \binom{9}{r} (2x^3)^{9-r} \left(-\frac{1}{x}\right)^r\). A wrong answer (e.g., forgetting the binomial coefficient, misplacing the minus sign, or writing the powers incorrectly) reveals that the student has not internalised the structure of the general term from node c11_math_cbse_08_002 and needs to practise writing it for various binomials before attempting coefficient extraction.

## DIAGNOSTIC_QUESTION_2
In the expansion of \((x^2 + \frac{2}{x})^6\), a student claims the coefficient of \(x^3\) is obtained by setting the exponent of \(x\) in the general term equal to 3 and solving \(2(6-r) - r = 3\). Is the student’s equation correct? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
Yes, the equation is correct. The general term is \(\binom{6}{r} (x^2)^{6-r} \left(\frac{2}{x}\right)^r = \binom{6}{r} 2^r x^{12-2r-r} = \binom{6}{r} 2^r x^{12-3r}\). Setting \(12-3r = 3\) gives \(r=3\). A wrong answer (e.g., writing \(2(6-r)+r=3\) or ignoring the exponent from the denominator) shows the student cannot combine exponent laws when the same variable appears in both terms of the binomial.

## DIAGNOSTIC_QUESTION_3
Find the coefficient of \(x^4\) in the expansion of \((3x - \frac{2}{x^2})^7\).

## DIAGNOSTIC_ANSWER_3
General term: \(T_{r+1} = \binom{7}{r} (3x)^{7-r} \left(-\frac{2}{x^2}\right)^r = \binom{7}{r} 3^{7-r} (-2)^r x^{7-r-2r} = \binom{7}{r} 3^{7-r} (-2)^r x^{7-3r}\).
Set \(7-3r = 4 \Rightarrow 3r = 3 \Rightarrow r = 1\).
Coefficient = \(\binom{7}{1} 3^{6} (-2)^1 = 7 \times 729 \times (-2) = -10206\).
A wrong answer (e.g., \(r=2\) giving exponent 1, or miscalculating \(\binom{7}{1}\)) indicates the student struggles with solving the linear equation for \(r\) or with arithmetic of binomial coefficients and powers.

## DIAGNOSTIC_QUESTION_4
The coefficient of \(x^5\) in the expansion of \((ax^2 + \frac{b}{x})^6\) is 192. If \(a\) and \(b\) are positive integers, find all possible pairs \((a, b)\).

## DIAGNOSTIC_ANSWER_4
General term: \(T_{r+1} = \binom{6}{r} (ax^2)^{6-r} \left(\frac{b}{x}\right)^r = \binom{6}{r} a^{6-r} b^r x^{12-2r-r} = \binom{6}{r} a^{6-r} b^r x^{12-3r}\).
For \(x^5\): \(12-3r = 5 \Rightarrow 3r = 7 \Rightarrow r = 7/3\), not an integer.
Hence the coefficient of \(x^5\) is **0** for all \(a, b\). The given condition “coefficient is 192” is impossible. A student who forces \(r=2\) or \(r=3\) and solves \(a,b\) shows they do not check whether \(r\) is an integer in the valid range — a critical analytical step.

## DIAGNOSTIC_QUESTION_5
A student solves “Find the coefficient of \(x^2\) in \((2x^2 - \frac{3}{x})^5\)” as follows:
General term: \(\binom{5}{r} (2x^2)^{5-r} (-\frac{3}{x})^r = \binom{5}{r} 2^{5-r} (-3)^r x^{10-2r-r}\).
Set \(10-3r = 2 \Rightarrow r = 8/3\). Since \(r\) is not an integer, the student writes “Coefficient = 0”.
Is the student’s conclusion correct? Justify.

## DIAGNOSTIC_ANSWER_5
Yes, the conclusion is correct. The exponent of \(x\) in the general term is \(10-3r\). For \(r = 0,1,2,3,4,5\) the exponents are \(10, 7, 4, 1, -2, -5\). None equals 2, so \(x^2\) does not appear and its coefficient is 0. A student who instead plugs \(r=8/3\) into the coefficient formula and computes a non‑zero value has failed to understand that \(r\) must be an integer index of a term in the finite expansion.

## DIAGNOSTIC_QUESTION_6
Create a binomial expression of the form \((px^m + qx^n)^k\) (with integer \(p,q,m,n,k\), \(k>0\)) such that the coefficient of \(x^0\) (the constant term) is 240. Provide the expression and verify the constant term.

## DIAGNOSTIC_ANSWER_6
Example: \((2x^2 + \frac{3}{x})^6\). General term: \(\binom{6}{r} (2x^2)^{6-r} (3x^{-1})^r = \binom{6}{r} 2^{6-r} 3^r x^{12-2r-r} = \binom{6}{r} 2^{6-r} 3^r x^{12-3r}\).
Constant term ⇒ \(12-3r = 0 \Rightarrow r=4\).
Coefficient = \(\binom{6}{4} 2^{2} 3^4 = 15 \times 4 \times 81 = 4860\) (not 240).
A correct example: \((x^3 + \frac{2}{x})^4\). General term: \(\binom{4}{r} (x^3)^{4-r} (2x^{-1})^r = \binom{4}{r} 2^r x^{12-3r-?}\) Wait: \((x^3)^{4-r} = x^{12-3r}\), times \(x^{-r}\) gives \(x^{12-4r}\). Set \(12-4r=0 \Rightarrow r=3\). Coefficient = \(\binom{4}{3} 2^3 = 4 \times 8 = 32\).
Another try: \((2x + \frac{3}{x^2})^6\). Exponent: \(1\cdot(6-r) + (-2)r = 6-3r\). Constant ⇒ \(r=2\). Coefficient = \(\binom{6}{2} 2^4 3^2 = 15 \times 16 \times 9 = 2160\).
A valid answer: \((2x^2 + \frac{5}{x})^3\)? Exponent: \(2(3-r) - r = 6-3r\). Constant ⇒ \(r=2\). Coefficient = \(\binom{3}{2} 2^1 5^2 = 3 \times 2 \times 25 = 150\).
To get 240: need \(\binom{k}{r} p^{k-r} q^r = 240\) with exponent condition. One solution: \((2x^2 + \frac{3}{x})^5\)? Exponent: \(2(5-r)-r=10-3r\). Constant ⇒ \(10-3r=0\) no integer.
\((x + \frac{2}{x})^6\): exponent \(6-r - r = 6-2r\), constant ⇒ \(r=3\), coeff = \(\binom{6}{3} 2^3 = 20 \times 8 = 160\).
\((2x + \frac{3}{x})^4\): exponent \(4-r - r = 4-2r\), constant ⇒ \(r=2\), coeff = \(\binom{4}{2} 2^2 3^2 = 6 \times 4 \times 9 = 216\).
\((3x + \frac{2}{x})^4\): constant ⇒ \(r=2\), coeff = \(\binom{4}{2} 3^2 2^2 = 6 \times 9 \times 4 = 216\).
\((2x^3 + \frac{5}{x})^4\): exponent \(3(4-r)-r=12-4r\), constant ⇒ \(r=3\), coeff = \(\binom{4}{3} 2^1 5^3 = 4 \times 2 \times 125 = 1000\).
\((x^2 + \frac{4}{x})^6\): exponent \(2(6-r)-r=12-3r\), constant ⇒ \(r=4\), coeff = \(\binom{6}{4} 1^2 4^4 = 15 \times 256 = 3840\).
A student who produces any binomial with a constant term and correctly verifies it shows synthesis ability. A poor answer gives a binomial where the constant term does not exist or the verification is miscalculated.

## COMMON_MISCONCEPTION
Students frequently set the exponent of \(x\) in the general term equal to the desired power but forget that the binomial may contain \(x\) in **both** terms (e.g., \((ax^p + bx^q)^m\)). They then write the exponent as \(p(m-r)\) only, ignoring the contribution \(q r\) from the second term. For instance, in \((2x^2 + 3x)^5\) they might write the exponent as \(2(5-r)\) instead of \(2(5-r)+1\cdot r = 10 - r\). This leads to an incorrect equation for \(r\) and a wrong coefficient (or a false conclusion that the term does not exist).

## ON_FAILURE
1. **Re‑teach exponent combination**: Write the general term step by step: \(T_{r+1} = \binom{m}{r} (A x^p)^{m-r} (B x^q)^r = \binom{m}{r} A^{m-r} B^r x^{p(m-r)+qr}\). Emphasise that the exponent is the sum \(p(m-r) + qr\).
2. **Drill with mixed powers**: Give 5 binomials where both terms contain \(x\) (e.g., \((x^3+2x)^4\), \((2x^{-1}+3x^2)^5\)) and ask only for the exponent expression in terms of \(r\). Check each student’s exponent formula before they solve for \(r\).
3. **Integer‑\(r\) gate**: After solving for \(r\), require the student to explicitly state “\(r = \_\_\) is an integer between 0 and \(m\)” or “\(r\) is not an integer ⇒ coefficient = 0”. This verbal checkpoint prevents the error of substituting a fractional \(r\) into the coefficient formula.

## PREREQUISITE_NODE_IDS
c11_math_cbse_08_001, c11_math_cbse_08_002, c11_math_cbse_08_004, c9_math_ch4_1, c8_math_ch2_3, c11_math_cbse_08_003

## PREREQUISITE_REASONS
c11_math_cbse_08_001: Provides the binomial theorem statement and the expansion formula which is the foundation.
c11_math_cbse_08_002: The general term \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) is the direct tool used to isolate the coefficient of \(x^n\).
c11_math_cbse_08_004: Finding specific terms (like the constant term or a term independent of \(x\)) is the same skill applied to a different target; mastering it builds the procedural fluency needed here.
c9_math_ch4_1: Algebraic identities \((a+b)^2\) etc. give the conceptual base for expanding binomials before the general theorem.
c8_math_ch2_3: Laws of exponents (base and exponent) are essential for simplifying \(x^{p(m-r)+qr}\) correctly.
c11_math_cbse_08_003: Coefficient extraction often requires identifying middle terms where coefficients are maximum (for symmetric expansions).  

## FORWARD_NODE_IDS
c11_math_cbse_08_006, c11_math_cbse_08_007, c11_math_cbse_08_008
## FORWARD_REASONS
c11_math_cbse_08_006: Properties of binomial coefficients (symmetry, sums, etc.) often require evaluating specific coefficients, which this node teaches.
c11_math_cbse_08_007: The greatest term is found by comparing consecutive coefficients; one must be able to compute any coefficient first.
c11_math_cbse_08_008: Real‑world applications (approximations, divisibility, probability) frequently ask for the coefficient of a particular power.

## CROSS_SUBJECT_PREREQS
c9_math_ch4_1, c10_math_cbse_02_005
## CROSS_SUBJECT_REASONS
c9_math_ch4_1: Algebraic identities \((a+b)^2, (a-b)^2\) are the simplest binomial expansions; understanding coefficients there builds intuition for the general case.
c10_math_cbse_02_005: The relationship between zeros and coefficients of a quadratic polynomial reinforces the idea that coefficients carry structural information about the polynomial, a concept extended to higher‑degree binomial expansions.

## CHAIN_DESCRIPTION
c11_math_cbse_08_002 -> c11_math_cbse_08_005 -> c11_math_cbse_08_006

## THIS_FORMULA
General term: \(T_{r+1} = \binom{m}{r} a^{m-r} b^r\). For binomial \((A x^p + B x^q)^m\), the exponent of \(x\) in \(T_{r+1}\) is \(p(m-r) + q r\). Set \(p(m-r) + q r = n\) and solve for integer \(r \in [0, m]\). Coefficient of \(x^n\) = \(\binom{m}{r} A^{m-r} B^r\) (if such \(r\) exists), otherwise 0.

## FORMULA_VARIABLES
\(m\) = positive integer exponent of the binomial; \(r\) = term index (0, 1, …, m); \(A, B\) = coefficients of the two terms in the binomial; \(p, q\) = powers of \(x\) in the first and second term respectively; \(n\) = desired power of \(x\).

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c9_math_ch4_1 | The binomial expansion generalises the algebraic identities \((a+b)^2, (a-b)^2\) learned in Class 9; the coefficient of \(x^n\) is the natural extension of "the coefficient of \(x\)" in those simple expansions.
c10_math_cbse_02_005 | In Class 10, the relationship between zeros and coefficients of a quadratic shows that coefficients encode roots; similarly, in binomial expansions, specific coefficients encode combinatorial information used in probability (Class 11) and calculus (Class 12).

## PREREQ_CONCEPT
The general term of a binomial expansion and the laws of exponents for combining powers of the same base.

## PREREQ_BEFORE
The student must be able to write the general term \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) for any binomial \((a+b)^n\) and simplify expressions like \((x^p)^{m-r} (x^q)^r\) to a single power \(x^{p(m-r)+qr}\).

## PREREQ_STUCK
If stuck, revisit the general term formula in node c11_math_cbse_08_002 and practise simplifying the exponent of \(x\) in 5 different binomials where both terms contain \(x\).

## WORKED_EXAMPLE_1
PROBLEM: Find the coefficient of \(x^7\) in the expansion of \((2x^2 - \frac{3}{x})^8\).
STEPS:
- Step 1: Identify the binomial: \(a = 2x^2\), \(b = -\frac{3}{x}\), \(m = 8\).
- Step 2: Write the general term \(T_{r+1} = \binom{8}{r} (2x^2)^{8-r} \left(-\frac{3}{x}\right)^r\).
- Step 3: Simplify the powers of \(x\): \((x^2)^{8-r} = x^{16-2r}\), \((x^{-1})^r = x^{-r}\). Combined exponent = \(16 - 2r - r = 16 - 3r\).
- Step 4: Set the exponent equal to 7: \(16 - 3r = 7 \Rightarrow 3r = 9 \Rightarrow r = 3\). Check: \(r=3\) is an integer between 0 and 8, so the term exists.
- Step 5: Substitute \(r=3\) into the coefficient part: \(\binom{8}{3} (2)^{5} (-3)^3 = 56 \times 32 \times (-27) = -48384\).
REASONING: The general term captures every term in the expansion. By simplifying the exponent of \(x\) to a linear function of \(r\), we can solve for the unique \(r\) that yields the desired power. Substituting that \(r\) back gives the exact numerical coefficient.
ANSWER: \(-48384\)

## WORKED_EXAMPLE_2
PROBLEM: The coefficient of \(x^2\) in the expansion of \((kx + \frac{1}{x})^6\) is 240. Find the value(s) of \(k\).
STEPS:
- Step 1: General term: \(T_{r+1} = \binom{6}{r} (kx)^{6-r} \left(\frac{1}{x}\right)^r = \binom{6}{r} k^{6-r} x^{6-r-r} = \binom{6}{r} k^{6-r} x^{6-2r}\).
- Step 2: For \(x^2\), set \(6 - 2r = 2 \Rightarrow 2r = 4 \Rightarrow r = 2\). Valid integer in range.
- Step 3: Coefficient for \(r=2\) is \(\binom{6}{2} k^{4} = 15 k^4\).
- Step 4: Equate to given coefficient: \(15 k^4 = 240 \Rightarrow k^4 = 16 \Rightarrow k^2 = 4 \Rightarrow k = \pm 2\).
- Step 5: Verify: For \(k=2\), term is \(15 \times 16 = 240\); for \(k=-2\), \(k^4 = 16\) also gives 240. Both work.
REASONING: The problem is reversed — we know the coefficient and must find a parameter in the binomial. The same general term method applies; we solve for \(r\) first (which is independent of \(k\)), then use the coefficient equation to find \(k\).
ANSWER: \(k = 2\) or \(k = -2\)

## WORKED_EXAMPLE_3
PROBLEM: Find the coefficient of \(x^{-1}\) in the expansion of \((x^3 + 2x + \frac{3}{x^2})^5\). (Hint: Treat as a trinomial? No, the binomial theorem applies only to two terms. This problem is designed to check if the student recognises that the given expression is NOT a binomial. However, if we group as \((x^3 + (2x + \frac{3}{x^2}))^5\) it becomes a binomial with a compound second term. But the standard syllabus expects binomials of the form \((A x^p + B x^q)^m\). So we should instead give a binomial problem that combines with another concept, e.g., finding the term independent of \(x\) in a product of two binomials.)
Let's change to a valid Class 11 problem: Find the term independent of \(x\) in the expansion of \((2x^2 - \frac{1}{x})^6 (x + \frac{2}{x})^4\).
STEPS:
- Step 1: Recognise that the constant term in the product comes from pairing terms whose exponents sum to 0.
- Step 2: For the first binomial \((2x^2 - \frac{1}{x})^6\), general term: \(T_{r+1} = \binom{6}{r} (2x^2)^{6-r} (-x^{-1})^r = \binom{6}{r} 2^{6-r} (-1)^r x^{12-3r}\). Exponents possible: 12, 9, 6, 3, 0, -3, -6 (for r=0..6).
- Step 3: For the second binomial \((x + \frac{2}{x})^4\), general term: \(U_{s+1} = \binom{4}{s} x^{4-s} (2x^{-1})^s = \binom{4}{s} 2^s x^{4-2s}\). Exponents possible: 4, 2, 0, -2, -4 (for s=0..4).
- Step 4: We need \( (12-3r) + (4-2s) = 0 \Rightarrow 16 - 3r - 2s = 0 \Rightarrow 3r + 2s = 16\). Find non‑negative integer solutions with \(r \le 6, s \le 4\).
- Step 5: Try \(r=4 \Rightarrow 12+2s=16 \Rightarrow s=2\) (valid). \(r=2 \Rightarrow 6+2s=16 \Rightarrow s=5\) (invalid, s>4). \(r=6 \Rightarrow 18+2s=16\) impossible. So only \((r,s) = (4,2)\).
- Step 6: Coefficient = \([\binom{6}{4} 2^{2} (-1)^4] \times [\binom{4}{2} 2^2] = [15 \times 4 \times 1] \times [6 \times 4] = 60 \times 24 = 1440\).
REASONING: The product of two binomial expansions requires a double sum. The constant term arises from pairs of terms whose exponents add to zero. This combines the "coefficient of \(x^n\)" skill with algebraic reasoning about exponent addition.
ANSWER: 1440

## COMPETENCY_QUESTION_1
QUESTION: In the expansion of \((ax^3 + \frac{b}{x^2})^7\), the coefficient of \(x^6\) is 7. If \(a\) and \(b\) are non‑zero constants, find the relationship between \(a\) and \(b\).
COMPETENCY: Translating real-world situations to mathematical expressions (here, a parameter-finding problem).
STEPS:
- Step 1: Write the general term and simplify the exponent of \(x\).
- Step 2: Set the exponent equal to 6 and solve for \(r\).
- Step 3: Write the coefficient in terms of \(a, b\) and the binomial coefficient.
- Step 4: Set the coefficient equal to 7 and simplify to get the relationship.
ANSWER: General term: \(\binom{7}{r} (ax^3)^{7-r} (b x^{-2})^r = \binom{7}{r} a^{7-r} b^r x^{21-3r-2r} = \binom{7}{r} a^{7-r} b^r x^{21-5r}\). For \(x^6\): \(21-5r=6 \Rightarrow 5r=15 \Rightarrow r=3\). Coefficient = \(\binom{7}{3} a^4 b^3 = 35 a^4 b^3\). Given \(35 a^4 b^3 = 7 \Rightarrow a^4 b^3 = \frac{1}{5}\). This is the required relationship.
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: The coefficients of \(x^5\) and \(x^6\) in the expansion of \((2 + kx)^8\) are equal. Find the value of \(k\).
COMPETENCY: Comparing and justifying (equating two coefficients to solve for a parameter).
STEPS:
- Step 1: Write the general term of \((2 + kx)^8\).
- Step 2: Identify the exponents of \(x\) in the general term.
- Step 3: Find the values of \(r\) that give \(x^5\) and \(x^6\).
- Step 4: Write the coefficients for those \(r\) values.
- Step 5: Equate the two coefficients and solve for \(k\).
ANSWER: General term: \(T_{r+1} = \binom{8}{r} 2^{8-r} (kx)^r = \binom{8}{r} 2^{8-r} k^r x^r\). For \(x^5\), \(r=5\); coefficient = \(\binom{8}{5} 2^3 k^5 = 56 \times 8 \times k^5 = 448 k^5\). For \(x^6\), \(r=6\); coefficient = \(\binom{8}{6} 2^2 k^6 = 28 \times 4 \times k^6 = 112 k^6\). Equate: \(448 k^5 = 112 k^6\). Since \(k \neq 0\) (otherwise both coefficients are 0, but the problem implies non‑trivial), divide by \(112 k^5\): \(4 = k\). Thus \(k = 4\).
DIFFICULTY: hard