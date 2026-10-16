## ELI5
A lottery of tickets coded (2x + 3/x^2)^10 pays on the ticket where x vanishes. No full expansion needed: the general term carries x^(10-3r); set 10 - 3r = 0 and get r = 10/3 - not an integer, so no such ticket exists, and that verdict is an answer too. Finding a specific term is exactly this hunt: build the general term, read off the exponent of x, solve the small equation for r, and check r lands between 0 and n before substituting back.

## DEFINITION
In the binomial expansion of \((a + b)^n\) where \(n\) is a positive integer, the general term is \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) for \(r = 0, 1, \dots, n\). Finding a specific term means determining the value of \(r\) that yields a term with a particular power of the variable (e.g., term independent of \(x\), coefficient of \(x^k\), or the \(m\)-th term from the beginning or end) by solving the exponent equation derived from the general term.

## COGNITIVE_LEVEL
apply

## MASTERY_CRITERIA
The student can independently set up the general term, equate the exponent of the variable to the required value, solve for \(r\), verify that \(r\) is an integer within \(0 \le r \le n\), and substitute back to write the specific term or its coefficient. They can also handle problems where the binomial contains fractional or negative powers of the variable.

## SCOPE_BOUNDARY
Covers binomial expansions with positive integral index only. Includes finding: (i) term independent of \(x\), (ii) coefficient of \(x^k\), (iii) \(r\)-th term from beginning or end, (iv) terms satisfying a given condition (e.g., ratio of coefficients). Does NOT cover binomial theorem for rational/negative index (infinite series) or multinomial expansions.

## WALKTHROUGH
Imagine you are designing a lottery where each ticket has a code like \((2x + \frac{3}{x^2})^{10}\) and the winning ticket is the one where the power of \(x\) is exactly zero. How do you find that term without expanding the whole thing? You already know the general term formula from the previous lesson. Start by writing \(T_{r+1} = \binom{10}{r} (2x)^{10-r} \left(\frac{3}{x^2}\right)^r\). Simplify the power of \(x\): \(x^{10-r} \cdot x^{-2r} = x^{10-3r}\). For the term independent of \(x\), set \(10-3r = 0\) giving \(r = 10/3\) — not an integer, so no such term exists. This shows the key insight: the exponent of the variable in the general term is a linear function of \(r\); solving for \(r\) tells you whether the desired term exists and which one it is.

Takeaway: mastery means setting up the general term, equating the exponent of the variable to the wanted power, solving for r, and verifying r is an integer within 0 to n before writing the term or its coefficient - fractional and negative powers handled by the same exponent equation. Exam moves: term-independent-of-x questions and coefficient-of-x^k items. Check yourself: a non-integer r means the wanted term does not exist, and stating that earns the marks. Students miss it because they assume the term always exists, when the definition's exponent equation is the judge: solve it, and let its verdict decide.

## DIAGNOSTIC_QUESTION_1
Write the general term \(T_{r+1}\) in the expansion of \(\left(x^2 - \frac{2}{x}\right)^9\). Do not simplify.

## DIAGNOSTIC_ANSWER_1
\(T_{r+1} = \binom{9}{r} (x^2)^{9-r} \left(-\frac{2}{x}\right)^r\). A wrong answer like \(\binom{9}{r} x^{18-2r} (-2)^r x^{-r}\) reveals the student correctly applied the power rules but missed that the negative sign belongs to the base \(-\frac{2}{x}\) and should be kept as \((-2)^r\) or \((-1)^r 2^r\). If they write \(\binom{9}{r} x^{18-3r}\) directly, they have combined steps prematurely and may lose track of the coefficient structure.

## DIAGNOSTIC_QUESTION_2
In the expansion of \(\left(3x^2 - \frac{1}{3x}\right)^n\), a student claims the term independent of \(x\) exists for all positive integers \(n\). Is this true? Explain why or why not.

## DIAGNOSTIC_ANSWER_2
False. The general term is \(T_{r+1} = \binom{n}{r} (3x^2)^{n-r} \left(-\frac{1}{3x}\right)^r = \binom{n}{r} 3^{n-2r} (-1)^r x^{2n-3r}\). For the term independent of \(x\), we need \(2n - 3r = 0 \Rightarrow r = \frac{2n}{3}\). This requires \(2n\) to be a multiple of 3, i.e., \(n\) must be a multiple of 3. If a student says "true", they incorrectly assume \(r\) can be any real number or they forget that \(r\) must be an integer between 0 and \(n\).

## DIAGNOSTIC_QUESTION_3
Find the coefficient of \(x^5\) in the expansion of \(\left(2x^3 - \frac{1}{x^2}\right)^7\).

## DIAGNOSTIC_ANSWER_3
General term: \(T_{r+1} = \binom{7}{r} (2x^3)^{7-r} \left(-\frac{1}{x^2}\right)^r = \binom{7}{r} 2^{7-r} (-1)^r x^{21-5r}\). Set exponent \(21 - 5r = 5 \Rightarrow 5r = 16 \Rightarrow r = 3.2\). Since \(r\) is not an integer, there is no \(x^5\) term; coefficient is 0. A common error is to force \(r=3\) or \(r=4\) and compute a non-zero coefficient, revealing the student does not check the integer condition for \(r\).

## DIAGNOSTIC_QUESTION_4
The coefficients of the \(r\)-th and \((r+1)\)-th terms in the expansion of \((1 + x)^{20}\) are in the ratio \(1:2\). Find \(r\). (Note: \(r\) here denotes term number, starting from 1.)

## DIAGNOSTIC_ANSWER_4
The \(r\)-th term is \(T_r = \binom{20}{r-1} x^{r-1}\), coefficient \(C_{r-1} = \binom{20}{r-1}\). The \((r+1)\)-th term coefficient is \(\binom{20}{r}\). Ratio \(\frac{\binom{20}{r-1}}{\binom{20}{r}} = \frac{1}{2} \Rightarrow \frac{r}{21-r} = \frac{1}{2} \Rightarrow 2r = 21 - r \Rightarrow 3r = 21 \Rightarrow r = 7\). A wrong answer like \(r=14\) comes from inverting the ratio or misidentifying which binomial coefficient corresponds to which term number.

## DIAGNOSTIC_QUESTION_5
A student solves for the term independent of \(x\) in \(\left(x^3 + \frac{2}{x^2}\right)^{10}\) and gets \(r = 6\). They then write the term as \(\binom{10}{6} 2^6\). Identify the error and give the correct term.

## DIAGNOSTIC_ANSWER_5
The student correctly found \(r=6\) from \(3(10-r) - 2r = 0 \Rightarrow 30 - 5r = 0 \Rightarrow r=6\). However, they omitted the \(x^3\) part's coefficient (which is 1) and the power of the first term's base. The correct term is \(\binom{10}{6} (x^3)^{4} \left(\frac{2}{x^2}\right)^6 = \binom{10}{6} 2^6 x^{12} x^{-12} = \binom{10}{6} 64\). The error reveals the student treats the general term as only the coefficient part and forgets to include the full base expressions before simplification.

## DIAGNOSTIC_QUESTION_6
Create a binomial expression of the form \((ax^p + bx^q)^n\) with integer \(a,b,p,q,n\) such that there is exactly one term independent of \(x\) and its coefficient is 240. Provide the expression and verify.

## DIAGNOSTIC_ANSWER_6
One example: \((2x^2 + 3x^{-1})^6\). General term: \(\binom{6}{r} (2x^2)^{6-r} (3x^{-1})^r = \binom{6}{r} 2^{6-r} 3^r x^{12-3r}\). Set \(12-3r=0 \Rightarrow r=4\). Coefficient: \(\binom{6}{4} 2^2 3^4 = 15 \cdot 4 \cdot 81 = 4860\) (not 240). A correct example: \((x^3 + 2x^{-2})^5\). Term independent: \(3(5-r) - 2r = 0 \Rightarrow 15 - 5r = 0 \Rightarrow r=3\). Coefficient: \(\binom{5}{3} 2^3 = 10 \cdot 8 = 80\). To get 240, try \((x^2 + 2x^{-1})^6\): \(2(6-r) - r = 0 \Rightarrow 12 - 3r = 0 \Rightarrow r=4\). Coefficient: \(\binom{6}{4} 2^4 = 15 \cdot 16 = 240\). Expression: \((x^2 + \frac{2}{x})^6\). A poor answer would give an expression where the equation for \(r\) has no integer solution or multiple solutions, showing the student does not understand the condition for existence and uniqueness of such a term.

## COMMON_MISCONCEPTION
Students often treat the index \(r\) in the general term \(T_{r+1}\) as the term number (i.e., they think \(T_r\) corresponds to \(\binom{n}{r}\)). This leads to off-by-one errors when asked for "the 5th term" — they substitute \(r=5\) instead of \(r=4\). Another frequent error: when the binomial has two variable parts like \((2x^3 - 1/x^2)^n\), students write the power of \(x\) as \(3(n-r) - 2r\) but forget to include the coefficient's power of \(x\) from the constant factors (e.g., if the term was \((2x^3)^n\), they might forget the \(2^n\) has no \(x\)). The most damaging error is not checking whether the solved \(r\) is an integer within \([0, n]\); they plug a fractional \(r\) into the binomial coefficient formula and produce a meaningless answer.

## ON_FAILURE
If a student substitutes the wrong \(r\) (off-by-one), ask: "Write the first three terms of \((a+b)^n\) using the general term with \(r=0,1,2\). Which term number does \(r=0\) give?" This reinforces \(T_{r+1}\) indexing. If they forget the integer check, give an example where \(r\) comes out fractional (like \(x^5\) in \((2x^3 - 1/x^2)^7\)) and ask "Can we have a 3.2-th term? What does \(\binom{7}{3.2}\) mean?" Then guide them to state: "Since \(r\) must be an integer between 0 and \(n\), no such term exists; coefficient is 0." If they drop constant factors, have them expand \((2x + 3)^2\) fully and compare with the general term formula to see that both the variable part and the constant coefficient come from the bases.

## PREREQUISITE_NODE_IDS
c11_math_cbse_08_001, c11_math_cbse_08_002, c10_math_cbse_02_007, c9_math_ch4_1, c11_math_cbse_08_003

## PREREQUISITE_REASONS
c11_math_cbse_08_001: Provides the binomial theorem statement and the expansion structure that the general term is derived from.
c11_math_cbse_08_002: Directly teaches the general term formula \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) which is the starting point for this node.
c10_math_cbse_02_007: Division algorithm for polynomials reinforces manipulation of algebraic expressions with powers, needed for simplifying the general term.
c9_math_ch4_1: Algebraic identities \((a+b)^2, (a-b)^2\) build the foundation for binomial expansion patterns.
c11_math_cbse_08_003: Finding specific terms uses the same general term formula; middle term is a special case of specific term finding.  

## FORWARD_NODE_IDS
c11_math_cbse_08_005, c11_math_cbse_08_007, c11_math_cbse_08_008, c11_math_cbse_08_006

## FORWARD_REASONS
c11_math_cbse_08_005: Finding the coefficient of \(x^n\) is a direct application of the specific term technique (set exponent = n).
c11_math_cbse_08_007: Greatest term problems require comparing consecutive terms, which uses the general term and ratio \(T_{r+1}/T_r\).
c11_math_cbse_08_008: Applications (e.g., approximation, divisibility) often reduce to finding a specific term or coefficient in a binomial expansion.
c11_math_cbse_08_006: Practice finding specific terms builds fluency with binomial coefficient notation and factorial manipulation.  

## CROSS_SUBJECT_PREREQS
c10_math_cbse_14_003, c9_math_ch8_4
## CROSS_SUBJECT_REASONS
c10_math_cbse_14_003: Classical probability \(P(E) = \text{favourable}/\text{total}\) uses combinatorial counting \(\binom{n}{r}\) which is the same binomial coefficient used in the general term.
c9_math_ch8_4: Arithmetic progression nth term formula \(a_n = a + (n-1)d\) parallels the idea of a general term that generates any term by substituting the index, reinforcing the concept of a term-generating formula.

## CHAIN_DESCRIPTION
c11_math_cbse_08_002 -> c11_math_cbse_08_004 -> c11_math_cbse_08_005

## THIS_FORMULA
\(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) where \(0 \le r \le n\), \(n \in \mathbb{N}\). For a specific term with power \(x^k\): solve exponent equation from \(a^{n-r} b^r\) for \(r\).

## FORMULA_VARIABLES
\(n\) = positive integer exponent (index of binomial), \(r\) = integer index of term (0 for first term), \(a, b\) = terms of the binomial (may contain variables and constants), \(T_{r+1}\) = the \((r+1)\)-th term in the expansion.

## FORMULA_UNITS
dimensionless (pure algebraic expression)

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | Binomial approximation \((1+x)^n \approx 1+nx\) for small \(x\) is used in physics for simplifying expressions like relativistic kinetic energy or pendulum period.
c11_chem_ch1_2 | In chemical equilibrium, the binomial expansion appears when calculating concentrations using the quadratic formula approximation; the general term helps identify dominant contributions.

## PREREQ_CONCEPT
Understanding that the general term \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) generates every term of the expansion by varying \(r\) from 0 to \(n\), and that the power of any variable in that term is a linear function of \(r\).

## PREREQ_BEFORE
The student must be able to write the general term for any given binomial \((a+b)^n\) and simplify the exponent of the variable in that term to a linear expression in \(r\).

## PREREQ_STUCK
If stuck, revisit the derivation of the general term in node c11_math_cbse_08_002 and practice writing \(T_{r+1}\) for 5 different binomials, simplifying the variable exponent each time.

## WORKED_EXAMPLE_1
PROBLEM: Find the term independent of \(x\) in the expansion of \(\left( \frac{3}{2}x^2 - \frac{1}{3x} \right)^9\).

STEPS:
- Step 1: Identify the binomial: \(a = \frac{3}{2}x^2\), \(b = -\frac{1}{3x}\), \(n = 9\). Write the general term \(T_{r+1} = \binom{9}{r} a^{9-r} b^r\).
- Step 2: Substitute \(a\) and \(b\): \(T_{r+1} = \binom{9}{r} \left(\frac{3}{2}x^2\right)^{9-r} \left(-\frac{1}{3x}\right)^r\).
- Step 3: Simplify the powers of \(x\): \(x^{2(9-r)} \cdot x^{-r} = x^{18 - 3r}\). The constant coefficient part is \(\binom{9}{r} \left(\frac{3}{2}\right)^{9-r} \left(-\frac{1}{3}\right)^r\).
- Step 4: For the term independent of \(x\), set the exponent of \(x\) to zero: \(18 - 3r = 0 \Rightarrow r = 6\). Check: \(r=6\) is an integer between 0 and 9, so the term exists.
- Step 5: Substitute \(r=6\) into the coefficient: \(T_7 = \binom{9}{6} \left(\frac{3}{2}\right)^3 \left(-\frac{1}{3}\right)^6 = \binom{9}{3} \cdot \frac{27}{8} \cdot \frac{1}{729} = 84 \cdot \frac{27}{8 \times 729} = 84 \cdot \frac{1}{216} = \frac{7}{18}\).

REASONING: The general term isolates the dependence on \(r\). The power of \(x\) is linear in \(r\) because each factor contributes a fixed power. Setting that linear expression to zero gives the unique \(r\) for the constant term. The binomial coefficient and constant factors are then evaluated at that \(r\).

ANSWER: \(\frac{7}{18}\) (the 7th term)

## WORKED_EXAMPLE_2
PROBLEM: In the expansion of \((1 + 2x)^n\), the coefficient of \(x^2\) is 144. Find \(n\) and the coefficient of \(x^3\).

STEPS:
- Step 1: Write the general term for \((1 + 2x)^n\): \(T_{r+1} = \binom{n}{r} 1^{n-r} (2x)^r = \binom{n}{r} 2^r x^r\).
- Step 2: The coefficient of \(x^2\) corresponds to \(r=2\): \(\binom{n}{2} 2^2 = 144\).
- Step 3: Solve for \(n\): \(\binom{n}{2} \cdot 4 = 144 \Rightarrow \frac{n(n-1)}{2} = 36 \Rightarrow n(n-1) = 72 \Rightarrow n^2 - n - 72 = 0 \Rightarrow (n-9)(n+8)=0 \Rightarrow n=9\) (since \(n>0\)).
- Step 4: Now find coefficient of \(x^3\) with \(n=9\): \(r=3\) gives \(\binom{9}{3} 2^3 = 84 \times 8 = 672\).
- Step 5: Verify: For \(n=9\), coefficient of \(x^2\) is \(\binom{9}{2}4 = 36 \times 4 = 144\) ✓.

REASONING: When the binomial is \((1 + \text{variable term})^n\), the power of the variable in \(T_{r+1}\) is exactly \(r\). This makes it straightforward to match the given power to \(r\). The equation for \(n\) comes from the known coefficient value.

ANSWER: \(n = 9\), coefficient of \(x^3\) is 672.

## WORKED_EXAMPLE_3
PROBLEM: The 3rd, 4th, and 5th terms in the expansion of \((x + a)^n\) are 84, 280, and 560 respectively. Find \(x\), \(a\), and \(n\). (Assume \(x, a > 0\).)

STEPS:
- Step 1: Write the general term: \(T_{r+1} = \binom{n}{r} x^{n-r} a^r\). The 3rd term is \(r=2\): \(T_3 = \binom{n}{2} x^{n-2} a^2 = 84\). The 4th term: \(T_4 = \binom{n}{3} x^{n-3} a^3 = 280\). The 5th term: \(T_5 = \binom{n}{4} x^{n-4} a^4 = 560\).
- Step 2: Form ratios to eliminate \(x\) and \(a\): \(\frac{T_4}{T_3} = \frac{\binom{n}{3}}{\binom{n}{2}} \cdot \frac{a}{x} = \frac{280}{84} = \frac{10}{3}\). Simplify binomial ratio: \(\frac{\binom{n}{3}}{\binom{n}{2}} = \frac{n-2}{3}\). So \(\frac{n-2}{3} \cdot \frac{a}{x} = \frac{10}{3} \Rightarrow (n-2)\frac{a}{x} = 10\). (Equation 1)
- Step 3: Similarly, \(\frac{T_5}{T_4} = \frac{\binom{n}{4}}{\binom{n}{3}} \cdot \frac{a}{x} = \frac{560}{280} = 2\). \(\frac{\binom{n}{4}}{\binom{n}{3}} = \frac{n-3}{4}\). So \(\frac{n-3}{4} \cdot \frac{a}{x} = 2 \Rightarrow (n-3)\frac{a}{x} = 8\). (Equation 2)
- Step 4: Divide Equation 1 by Equation 2: \(\frac{n-2}{n-3} = \frac{10}{8} = \frac{5}{4} \Rightarrow 4n - 8 = 5n - 15 \Rightarrow n = 7\).
- Step 5: Substitute \(n=7\) into Equation 2: \((7-3)\frac{a}{x} = 8 \Rightarrow 4\frac{a}{x} = 8 \Rightarrow \frac{a}{x} = 2 \Rightarrow a = 2x\).
- Step 6: Use \(T_3 = \binom{7}{2} x^{5} a^2 = 84\). \(\binom{7}{2}=21\), \(a^2=4x^2\). So \(21 \cdot x^5 \cdot 4x^2 = 84 x^7 = 84 \Rightarrow x^7 = 1 \Rightarrow x = 1\). Then \(a = 2\).
- Step 7: Verify with \(T_4\): \(\binom{7}{3} x^4 a^3 = 35 \cdot 1 \cdot 8 = 280\) ✓. \(T_5\): \(\binom{7}{4} x^3 a^4 = 35 \cdot 1 \cdot 16 = 560\) ✓.

REASONING: When three consecutive terms are given, their ratios eliminate the unknown bases \(x\) and \(a\) and yield equations in \(n\) and the ratio \(a/x\). The binomial coefficient ratios simplify to linear expressions in \(n\), allowing us to solve for \(n\) first. Then back-substitute to find the bases.

ANSWER: \(x = 1\), \(a = 2\), \(n = 7\).

## COMPETENCY_QUESTION_1
QUESTION: In the expansion of \(\left( \sqrt[3]{2} + \frac{1}{\sqrt[3]{3}} \right)^n\), the ratio of the 7th term from the beginning to the 7th term from the end is 1:6. Find \(n\).

COMPETENCY: Translating real-world situations to mathematical expressions (interpreting "7th term from end" as a specific \(r\) value).

STEPS:
- Step 1: Recall that in \((a+b)^n\) there are \(n+1\) terms. The 7th term from the beginning is \(T_7\) with \(r=6\). The 7th term from the end is the 7th term from the last, i.e., term number \((n+1)-7+1 = n-5\), which corresponds to \(r = n-6\).
- Step 2: Write \(T_7 = \binom{n}{6} (\sqrt[3]{2})^{n-6} (\sqrt[3]{3})^{-6}\) and \(T_{n-5} = \binom{n}{n-6} (\sqrt[3]{2})^{6} (\sqrt[3]{3})^{-(n-6)}\). Note \(\binom{n}{n-6} = \binom{n}{6}\).
- Step 3: Form the ratio \(\frac{T_7}{T_{n-5}} = \frac{(\sqrt[3]{2})^{n-12}}{(\sqrt[3]{3})^{12-n}} = \left( \frac{2}{3} \right)^{\frac{n-12}{3}} = \frac{1}{6} = \frac{1}{2 \cdot 3}\).
- Step 4: Equate powers: \(\left( \frac{2}{3} \right)^{\frac{n-12}{3}} = 2^{-1} 3^{-1}\). This requires \(\frac{n-12}{3} = -1 \Rightarrow n-12 = -3 \Rightarrow n=9\).
- Step 5: Verify: For \(n=9\), 7th term from beginning exists (since \(n+1=10 \ge 7\)). Ratio: \(\left( \frac{2}{3} \right)^{-1} = \frac{3}{2}\)? Wait, recalc: \(T_7\) has \(2^{(9-6)/3}=2^1\), \(T_{4}\) has \(2^{6/3}=2^2\)? Let's re-evaluate carefully. Actually \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\). For \(n=9\), \(a=2^{1/3}, b=3^{-1/3}\). \(T_7 (r=6)\): \(\binom{9}{6} 2^{(9-6)/3} 3^{-6/3} = \binom{9}{6} 2^1 3^{-2}\). \(T_{4}\) (7th from end, \(r=3\)): \(\binom{9}{3} 2^{(9-3)/3} 3^{-3/3} = \binom{9}{3} 2^2 3^{-1}\). Ratio \(T_7/T_4 = (2^1 3^{-2})/(2^2 3^{-1}) = 2^{-1} 3^{-1} = 1/6\). Correct.

ANSWER: \(n = 9\).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find the value of \(k\) for which the term independent of \(x\) in the expansion of \(\left( k x^2 + \frac{1}{x} \right)^6\) equals 240. Hence write the full term.

COMPETENCY: Comparing and justifying (solving for a parameter using the specific term condition, then reconstructing the term).

STEPS:
- Step 1: General term: \(T_{r+1} = \binom{6}{r} (k x^2)^{6-r} \left(\frac{1}{x}\right)^r = \binom{6}{r} k^{6-r} x^{12-3r}\).
- Step 2: For term independent of \(x\), set \(12 - 3r = 0 \Rightarrow r = 4\). This is valid (0 ≤ 4 ≤ 6).
- Step 3: The term is \(T_5 = \binom{6}{4} k^{2} = 15 k^2\). Set equal to 240: \(15 k^2 = 240 \Rightarrow k^2 = 16 \Rightarrow k = \pm 4\).
- Step 4: For \(k = 4\): \(T_5 = 15 \times 16 = 240\). For \(k = -4\): \(k^2 = 16\) same term value. The term is \(240\) (constant).
- Step 5: Check if any other \(r\) could give constant term? No, exponent is linear in \(r\), unique solution.

ANSWER: \(k = 4\) or \(k = -4\); the term independent of \(x\) is 240 (the 5th term).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: You already know the ______ term formula from the previous lesson.

## DIAGNOSTIC_ANSWER_7
general

**A wrong answer ("binomial" or "middle") reveals the student has swapped the walkthrough's adjective - you already know the general term formula from the previous lesson.** General is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the T(r+1) = C(n,r) a^(n-r) b^r shape before filling, and give the adjective exactly.

## DIAGNOSTIC_QUESTION_8
What must you be able to do to master this topic?

## DIAGNOSTIC_ANSWER_8
They can also handle problems where the binomial contains fractional or negative powers of the variable.

**A wrong answer (only solving for r) reveals the student has under-answered the mastery criterion.** Full mastery adds the boundaries: verify r is an integer within 0 to n before substituting back, and handle binomials whose variable carries fractional or negative powers of the variable.

## DIAGNOSTIC_QUESTION_9
Fill in the blank: You already know the general term formula from the ______ lesson.

## DIAGNOSTIC_ANSWER_9
previous

**A wrong answer ("last" or "next") reveals the student has swapped the walkthrough's adjective - you already know the general term formula from the previous lesson.** Previous is the walkthrough's own word for where the formula came from, and the word is what the blank grades. Recall the lottery-ticket setup before filling, and give the word exactly.
