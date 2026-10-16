## ELI5
Two investment schemes grow as (1.05)^20 and (1.08)^15, and comparing them means finding each expansion's greatest term. Form the ratio T(r+1)/T(r) = ((n-r+1)/r) x (b/a) and keep stepping while it stays at least 1: the terms climb, peak where the ratio crosses 1, then fall. If the ratio hits exactly 1 at some r, two neighbouring terms tie for the crown and both are the greatest.

## DEFINITION
In the binomial expansion of \((a + b)^n\) where \(n \in \mathbb{N}\), the greatest term(s) are the term(s) with the maximum numerical value (magnitude) among all terms \(T_1, T_2, \dots, T_{n+1}\). For positive \(a\) and \(b\), the greatest term occurs at index \(k\) where the ratio \(\frac{T_{k+1}}{T_k} \geq 1\) and \(\frac{T_{k+2}}{T_{k+1}} < 1\), with \(T_k = \binom{n}{k-1} a^{n-k+1} b^{k-1}\).

## COGNITIVE_LEVEL
analyze

## MASTERY_CRITERIA
Student can find the greatest term(s) in any binomial expansion \((a+b)^n\) by forming and solving the inequality \(\frac{T_{r+1}}{T_r} \geq 1\), correctly handling cases where two consecutive terms are equal maxima, and interpreting the result in applied problems such as finding the numerically greatest term in \((1+x)^n\) or \((x+\frac{1}{x})^n\).

## SCOPE_BOUNDARY
Covers binomial expansions with positive integer exponent \(n\) and real bases \(a, b\) (including negative/irrational values). Does NOT cover greatest term in binomial series for non-integer indices (infinite series) — that is in node c11_math_cbse_08_009.

## WALKTHROUGH
Imagine you are comparing two investment schemes: Scheme A grows as \((1.05)^{20}\) and Scheme B as \((1.08)^{15}\). To decide which yields more, you need to know the largest contributing term in each expansion. Start by writing the general term \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\). Then form the ratio \(\frac{T_{r+1}}{T_r} = \frac{n-r+1}{r} \cdot \frac{b}{a}\). Set this ratio \(\geq 1\) to find the critical \(r\). Solve the inequality for integer \(r\). The greatest term is \(T_{r+1}\) if the inequality gives a unique integer, or both \(T_r\) and \(T_{r+1}\) if the ratio equals 1 exactly. This method works because terms increase while the ratio > 1, peak when ratio crosses 1, then decrease.

Takeaway: mastery means building the ratio inequality, solving it for the integer r, and reading whether the peak is a single term or a tied pair. Exam moves: find-the-greatest-term questions and numerically-greatest-term items in (1+x)^n style expansions and applied comparisons. Check yourself: the ratio test compares neighbours only - it never needs the full expansion written out. Students miss it because they compute every term and eyeball the biggest, when the definition's ratio rule finds the peak directly: the climb continues exactly while each term outgrows its predecessor, and it stops the moment that fails.

## DIAGNOSTIC_QUESTION_1
State the condition on the ratio of consecutive terms \(\frac{T_{r+1}}{T_r}\) that identifies the greatest term in the expansion of \((a+b)^n\) for \(a,b > 0\).

## DIAGNOSTIC_ANSWER_1
The greatest term occurs at index \(r\) such that \(\frac{T_{r+1}}{T_r} \geq 1\) and \(\frac{T_{r+2}}{T_{r+1}} < 1\). Equivalently, find the largest integer \(r\) satisfying \(\frac{n-r+1}{r} \cdot \frac{b}{a} \geq 1\). If the inequality yields an integer \(m\), then both \(T_m\) and \(T_{m+1}\) are equal and greatest. A wrong answer (e.g., setting ratio = 1 without checking neighbours) reveals the student does not understand the discrete nature of the sequence of terms.

## DIAGNOSTIC_QUESTION_2
In the expansion of \((2 + 3x)^9\), a student claims the greatest term is the 5th term because \(\frac{T_5}{T_4} > 1\) and \(\frac{T_6}{T_5} > 1\). Explain why this reasoning is flawed and state the correct condition.

## DIAGNOSTIC_ANSWER_2
The student's reasoning is flawed because if \(\frac{T_6}{T_5} > 1\), then \(T_6 > T_5\), so \(T_5\) cannot be the greatest term — terms are still increasing. The correct condition requires the ratio to drop below 1 *after* the candidate term. For \((2+3x)^9\), one must find \(r\) such that \(\frac{9-r+1}{r} \cdot \frac{3x}{2} \geq 1\) but \(\frac{9-r}{r+1} \cdot \frac{3x}{2} < 1\). A wrong answer indicates confusion between "ratio > 1 means increasing" and "greatest term occurs when ratio crosses from ≥1 to <1".

## DIAGNOSTIC_QUESTION_3
Find the numerically greatest term in the expansion of \((1 - 3x)^{10}\) when \(x = \frac{1}{5}\).

## DIAGNOSTIC_ANSWER_3
Given \((1 - 3x)^{10}\) with \(x = 1/5\). Here \(a=1, b=-3/5\). Terms alternate in sign; we compare absolute values. \(|T_{r+1}| = \binom{10}{r} \left(\frac{3}{5}\right)^r\). Ratio \(\frac{|T_{r+1}|}{|T_r|} = \frac{10-r+1}{r} \cdot \frac{3}{5}\). Set \(\geq 1\): \(\frac{11-r}{r} \cdot \frac{3}{5} \geq 1 \Rightarrow 33-3r \geq 5r \Rightarrow 8r \leq 33 \Rightarrow r \leq 4.125\). So \(r=4\) satisfies. Check \(r=4\): ratio = \(\frac{7}{4} \cdot 0.6 = 1.05 \geq 1\). \(r=5\): ratio = \(\frac{6}{5} \cdot 0.6 = 0.72 < 1\). Hence greatest term is \(T_5 = \binom{10}{4} (-\frac{3}{5})^4\). A wrong answer (e.g., \(r=5\)) reveals the student forgot to test the boundary or mishandled the inequality.

## DIAGNOSTIC_QUESTION_4
Compare the greatest term in \((1+x)^n\) and \((1-x)^n\) for \(x>0\). Are they always the same term index? Justify.

## DIAGNOSTIC_ANSWER_4
For \((1+x)^n\) with \(x>0\), all terms are positive. The greatest term index \(r\) satisfies \(\frac{n-r+1}{r} x \geq 1\). For \((1-x)^n\), terms alternate in sign; the *numerically* greatest term uses absolute values \(|T_{r+1}| = \binom{n}{r} x^r\), giving the *same* inequality. Thus the index of the numerically greatest term is identical. However, the actual greatest *algebraic* term in \((1-x)^n\) may differ because negative terms are smaller than positive ones. A wrong answer (e.g., "they are different") shows the student conflates numerical magnitude with algebraic value.

## DIAGNOSTIC_QUESTION_5
A student solves for the greatest term in \((\sqrt{3} + 2\sqrt{2})^7\) and gets \(r = 3.6\). They conclude the 4th term is the greatest. Is this correct? If not, what is the correct term index and why?

## DIAGNOSTIC_ANSWER_5
The student's conclusion is correct *only if* they properly interpreted \(r \leq 3.6\). The inequality \(\frac{7-r+1}{r} \cdot \frac{2\sqrt{2}}{\sqrt{3}} \geq 1\) gives \(r \leq 3.6\). The largest integer \(r\) satisfying this is \(r=3\), so the greatest term is \(T_{4}\) (since \(r\) starts at 0). The student must check that for \(r=3\), ratio \(\geq 1\) and for \(r=4\), ratio \(< 1\). If they simply rounded 3.6 to 4 and took \(T_5\), that would be wrong. A wrong answer reveals misunderstanding of the floor function role: the greatest term index is \(\lfloor m \rfloor + 1\) where \(m\) is the critical value.

## DIAGNOSTIC_QUESTION_6
Construct a binomial expansion \((a+b)^n\) with \(a,b > 0\) such that there are exactly two equal greatest terms. Specify \(a, b, n\) and the term indices.

## DIAGNOSTIC_ANSWER_6
Two equal greatest terms occur when the critical ratio equals 1 exactly for some integer \(r\). That is, \(\frac{n-r+1}{r} \cdot \frac{b}{a} = 1\). Example: choose \(n=5, a=2, b=3\). Then \(\frac{5-r+1}{r} \cdot \frac{3}{2} = 1 \Rightarrow \frac{6-r}{r} = \frac{2}{3} \Rightarrow 18-3r = 2r \Rightarrow r = 3.6\) (not integer). To get integer, set \(\frac{n-r+1}{r} = \frac{a}{b}\). Let \(a=3, b=2, n=7\). For \(r=4\): \(\frac{7-4+1}{4} = 1 = \frac{3}{2}\)? No. Let \(a=2, b=1, n=5\). For \(r=2\): \(\frac{5-2+1}{2} = 2 = \frac{a}{b}=2\). Works! So \((2+1)^5\) has equal greatest terms at \(r=2\) and \(r=3\) i.e., \(T_3\) and \(T_4\). A poor answer (e.g., random guess) shows the student cannot reverse-engineer the condition.

## COMMON_MISCONCEPTION
Students often set the ratio \(\frac{T_{r+1}}{T_r} = 1\) and solve for \(r\), then round to the nearest integer. This fails when the solution is not an integer — the greatest term is at \(r = \lfloor m \rfloor\) (where \(m\) is the solution), not the rounded value. For example, in \((1+0.2)^{10}\), solving \(\frac{11-r}{r} \cdot 0.2 = 1\) gives \(r \approx 1.83\). Rounding gives \(r=2\), but the correct greatest term is at \(r=1\) (i.e., \(T_2\)) because terms increase up to \(r=1\) and decrease after. The error stems from treating the discrete index as continuous.

## ON_FAILURE
Remediation: Have the student list the first few term ratios numerically for a concrete example like \((1+0.5)^6\). Compute \(T_1, T_2, T_3, T_4\) and their ratios. Show that \(T_2/T_1 = 1.5 > 1\), \(T_3/T_2 = 1.0 > 1\), \(T_4/T_3 = 0.6 < 1\). The greatest term is \(T_3\) (ratio crosses 1 between \(r=2\) and \(r=3\)). Then derive the inequality \(\frac{n-r+1}{r} \cdot \frac{b}{a} \geq 1\) and solve for \(r\). Emphasize: find the largest integer \(r\) satisfying the inequality; the greatest term is \(T_{r+1}\). Practice with 3 examples where the critical value is integer (two equal greatest terms) and non-integer (unique greatest term).

## PREREQUISITE_NODE_IDS
c11_math_cbse_08_002, c11_math_cbse_08_003, c11_math_cbse_08_006, c11_math_cbse_08_001, c11_math_cbse_08_004, c11_math_cbse_08_005

## PREREQUISITE_REASONS
c11_math_cbse_08_002: General term formula \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\) is essential to form the ratio of consecutive terms.
c11_math_cbse_08_003: Understanding middle term(s) builds intuition that term magnitudes follow a symmetric/unimodal pattern, peaking at the centre.
c11_math_cbse_08_006: Properties of binomial coefficients (e.g., \(\binom{n}{r} = \binom{n}{n-r}\), monotonic increase up to middle) underpin the behaviour of term magnitudes.
c11_math_cbse_08_001: Greatest term analysis uses ratio of consecutive terms from the general term formula.  
c11_math_cbse_08_004: Greatest term problems require comparing consecutive terms, which uses the general term and ratio \(T_{r+1}/T_r\).  
c11_math_cbse_08_005: The greatest term is found by comparing consecutive coefficients; one must be able to compute any coefficient first.  

## FORWARD_NODE_IDS
c11_math_cbse_08_008, c11_math_cbse_08_009
## FORWARD_REASONS
c11_math_cbse_08_008: Applications of Binomial Theorem often require identifying the greatest term for approximation or optimisation problems (e.g., greatest coefficient in multinomial expansions).
c11_math_cbse_08_009: Binomial Theorem for Any Index extends the concept to infinite series where the greatest term determines convergence behaviour and approximation bounds.

## CROSS_SUBJECT_PREREQS
c10_math_cbse_05_003, c10_math_cbse_04_007
## CROSS_SUBJECT_REASONS
c10_math_cbse_05_003: nth term of an AP formula \(a_n = a + (n-1)d\) is analogous to the general term structure; both involve indexing and parameter dependence.
c10_math_cbse_04_007: Discriminant analysis in quadratic equations teaches inequality solving (\(D \geq 0\)), a skill directly used when solving \(\frac{T_{r+1}}{T_r} \geq 1\) for integer \(r\).

## CHAIN_DESCRIPTION
c11_math_cbse_08_002 -> c11_math_cbse_08_007 -> c11_math_cbse_08_008

## THIS_FORMULA
\(\frac{T_{r+1}}{T_r} = \frac{n-r+1}{r} \cdot \frac{b}{a}\); greatest term at \(r = \left\lfloor \frac{(n+1)|b|}{|a|+|b|} \right\rfloor\) (for \(|a|,|b|>0\))

## FORMULA_VARIABLES
\(n\) = positive integer exponent, \(a,b\) = real numbers (bases), \(r\) = term index starting from 0 (\(T_{r+1}\) is the (r+1)th term), \(T_{r+1} = \binom{n}{r} a^{n-r} b^r\)

## FORMULA_UNITS
dimensionless

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_ch2_3 | The method of comparing consecutive terms to find a maximum mirrors finding the maximum term in a sequence of energy levels or probabilities in statistical mechanics (e.g., Maxwell-Boltzmann distribution).
c11_economics_ch3_2 | In economics, finding the output level that maximizes profit uses marginal analysis (ratio of successive increments), analogous to the ratio test for greatest term.

## PREREQ_CONCEPT
Ratio test for monotonic sequences: a sequence of positive terms increases while the ratio of consecutive terms > 1, peaks when ratio crosses 1, and decreases thereafter.

## PREREQ_BEFORE
Student must be able to write the general term of binomial expansion, simplify ratios of binomial coefficients \(\frac{\binom{n}{r}}{\binom{n}{r-1}} = \frac{n-r+1}{r}\), and solve linear inequalities in one variable.

## PREREQ_STUCK
Revisit c11_math_cbse_08_002 (General Term) to practice writing \(T_{r+1}\) and simplifying \(\frac{T_{r+1}}{T_r}\); also review solving inequalities like \(\frac{11-r}{r} \cdot 0.5 \geq 1\) from c10_math_cbse_04_007.

## WORKED_EXAMPLE_1
PROBLEM: Find the greatest term in the expansion of \((2 + 3x)^9\) when \(x = \frac{3}{2}\).
STEPS:
- Step 1: Identify \(a = 2\), \(b = 3x = 3 \times \frac{3}{2} = \frac{9}{2}\), \(n = 9\). Since \(a,b > 0\), all terms positive; greatest term = numerically greatest term.
- Step 2: Write general term \(T_{r+1} = \binom{9}{r} 2^{9-r} \left(\frac{9}{2}\right)^r\). Form ratio \(\frac{T_{r+1}}{T_r} = \frac{9-r+1}{r} \cdot \frac{9/2}{2} = \frac{10-r}{r} \cdot \frac{9}{4}\).
- Step 3: Set ratio \(\geq 1\) to find where terms stop increasing: \(\frac{10-r}{r} \cdot \frac{9}{4} \geq 1 \Rightarrow 9(10-r) \geq 4r \Rightarrow 90 - 9r \geq 4r \Rightarrow 90 \geq 13r \Rightarrow r \leq \frac{90}{13} \approx 6.92\).
- Step 4: Largest integer \(r\) satisfying is \(r = 6\). Check: for \(r=6\), ratio = \(\frac{4}{6} \cdot \frac{9}{4} = 1.5 \geq 1\); for \(r=7\), ratio = \(\frac{3}{7} \cdot \frac{9}{4} = \frac{27}{28} < 1\). So terms increase up to \(r=6\) and decrease after. Greatest term is \(T_{7}\) (since \(r=6\) gives 7th term).
- Step 5: Compute \(T_7 = \binom{9}{6} 2^{3} \left(\frac{9}{2}\right)^6 = 84 \times 8 \times \frac{9^6}{2^6} = 84 \times 8 \times \frac{531441}{64} = 84 \times \frac{531441}{8} = 84 \times 66430.125 = 5,580,130.5\). (Exact fraction: \(\frac{84 \times 531441}{8} = \frac{44641044}{8} = 5580130.5\)).
REASONING: The ratio test works because \(T_{r+1}/T_r > 1\) means \(T_{r+1} > T_r\) (terms increasing). The maximum occurs at the last \(r\) where this holds. We solve the inequality for real \(r\), then take the floor to get the integer index.
ANSWER: The 7th term (\(T_7\)) is the greatest term, with value \(\frac{44641044}{8} = 5,580,130.5\).

## WORKED_EXAMPLE_2
PROBLEM: Find the numerically greatest term in the expansion of \((3 - 5x)^{12}\) when \(x = \frac{1}{5}\).
STEPS:
- Step 1: Here \(a = 3\), \(b = -5x = -1\), \(n = 12\). Terms alternate in sign. We compare absolute values: \(|T_{r+1}| = \binom{12}{r} 3^{12-r} (1)^r = \binom{12}{r} 3^{12-r}\).
- Step 2: Ratio of absolute values: \(\frac{|T_{r+1}|}{|T_r|} = \frac{12-r+1}{r} \cdot \frac{|b|}{|a|} = \frac{13-r}{r} \cdot \frac{1}{3}\).
- Step 3: Set \(\geq 1\): \(\frac{13-r}{r} \cdot \frac{1}{3} \geq 1 \Rightarrow 13-r \geq 3r \Rightarrow 13 \geq 4r \Rightarrow r \leq 3.25\).
- Step 4: Largest integer \(r\) is 3. Check: \(r=3\) gives ratio = \(\frac{10}{3} \cdot \frac{1}{3} = \frac{10}{9} > 1\); \(r=4\) gives ratio = \(\frac{9}{4} \cdot \frac{1}{3} = \frac{3}{4} < 1\). So \(|T_4|\) is the maximum absolute value.
- Step 5: The actual term \(T_4 = \binom{12}{3} 3^9 (-1)^3 = -220 \times 19683 = -4,330,260\). Its absolute value is the greatest. (Note: \(T_5\) is positive but smaller in magnitude).
REASONING: For alternating series, the numerically greatest term is found using absolute values. The ratio of absolute values uses \(|b|/|a|\). The sign of the greatest term depends on the parity of \(r\).
ANSWER: The 4th term (\(T_4\)) is numerically greatest, with value \(-4,330,260\) (magnitude \(4,330,260\)).

## WORKED_EXAMPLE_3
PROBLEM: In the expansion of \((x^2 + \frac{2}{x})^{15}\), find the term with the greatest coefficient (i.e., greatest numerical coefficient when expressed as \(c_k x^p\)).
STEPS:
- Step 1: General term: \(T_{r+1} = \binom{15}{r} (x^2)^{15-r} \left(\frac{2}{x}\right)^r = \binom{15}{r} 2^r x^{30-3r}\). The coefficient is \(C_r = \binom{15}{r} 2^r\). We need to maximize \(C_r\) for \(r = 0,1,\dots,15\).
- Step 2: Ratio \(\frac{C_{r+1}}{C_r} = \frac{\binom{15}{r+1} 2^{r+1}}{\binom{15}{r} 2^r} = \frac{15-r}{r+1} \cdot 2\).
- Step 3: Set \(\geq 1\): \(\frac{15-r}{r+1} \cdot 2 \geq 1 \Rightarrow 30 - 2r \geq r+1 \Rightarrow 29 \geq 3r \Rightarrow r \leq \frac{29}{3} \approx 9.67\).
- Step 4: Largest integer \(r = 9\). Check: \(r=9\) ratio = \(\frac{6}{10} \cdot 2 = 1.2 \geq 1\); \(r=10\) ratio = \(\frac{5}{11} \cdot 2 = \frac{10}{11} < 1\). So \(C_9\) is the greatest coefficient.
- Step 5: The term is \(T_{10} = \binom{15}{9} 2^9 x^{30-27} = \binom{15}{6} 512 x^3 = 5005 \times 512 x^3 = 2,562,560 x^3\).
- Step 6: Verify no other term has larger coefficient: \(C_8 = \binom{15}{8} 2^8 = 6435 \times 256 = 1,647,360\); \(C_{10} = \binom{15}{10} 2^{10} = 3003 \times 1024 = 3,075,072\)? Wait, \(\binom{15}{10}=3003\), \(2^{10}=1024\), product = 3,075,072 which is larger than 2,562,560! Mistake: ratio test used \(C_{r+1}/C_r\) with \(C_r = \binom{15}{r} 2^r\). For \(r=9\), \(C_9 = \binom{15}{9} 2^9 = 5005 \times 512 = 2,562,560\). For \(r=10\), \(C_{10} = \binom{15}{10} 2^{10} = 3003 \times 1024 = 3,075,072\). But our ratio test said \(r=9\) is max. Let's recompute ratio: \(\frac{C_{10}}{C_9} = \frac{\binom{15}{10} 2^{10}}{\binom{15}{9} 2^9} = \frac{3003}{5005} \times 2 = 0.6 \times 2 = 1.2\). Wait, \(\frac{\binom{15}{10}}{\binom{15}{9}} = \frac{3003}{5005} = \frac{3}{5} = 0.6\). Times 2 = 1.2. So \(C_{10} > C_9\)! The ratio test condition \(\frac{15-r}{r+1} \cdot 2 \geq 1\) for \(r=9\) gives \(\frac{6}{10} \cdot 2 = 1.2 \geq 1\), so \(C_{10} \geq C_9\). For \(r=10\): \(\frac{5}{11} \cdot 2 = 10/11 < 1\), so \(C_{11} < C_{10}\). Thus the maximum is at \(r=10\), not \(r=9\). The inequality \(r \leq 29/3 = 9.67\) means \(r\) can be 9, but the condition is for \(C_{r+1}/C_r \geq 1\), so if \(r=9\) satisfies, then \(C_{10} \geq C_9\). We need the largest \(r\) such that \(C_{r+1}/C_r \geq 1\). That \(r\) is 9, so the greatest coefficient is \(C_{10}\) (since \(r\) is the index of the *previous* term). Let's clarify: Ratio \(\frac{C_{r+1}}{C_r} \geq 1\) means \(C_{r+1} \geq C_r\). So if \(r=9\) is the last satisfying it, then \(C_{10} \geq C_9\) and \(C_{11} < C_{10}\). So max is \(C_{10}\). So the greatest coefficient is at \(r=10\) (i.e., 11th term). My step 4 incorrectly concluded \(r=9\) gives max. Correction: The greatest term index is \(r_{\text{max}} = \lfloor m \rfloor + 1\) where \(m\) is solution to equality. Here \(m = 29/3 = 9.67\), floor is 9, so greatest is at \(r = 9+1 = 10\). The term is \(T_{11}\).
- Step 5 (corrected): Greatest coefficient is \(C_{10} = \binom{15}{10} 2^{10} = 3003 \times 1024 = 3,075,072\). The term is \(T_{11} = 3,075,072 x^0\)? Wait, power of x: \(30 - 3r = 30 - 30 = 0\). So it's the constant term! \(T_{11} = 3,075,072\).
REASONING: The ratio test for coefficients uses \(\frac{C_{r+1}}{C_r}\). The index of the maximum coefficient is the smallest integer \(r\) for which the ratio drops below 1, or equivalently \(r_{\text{max}} = \lfloor \frac{2n}{3} \rfloor\)? Actually from \(\frac{n-r}{r+1} \cdot 2 = 1 \Rightarrow 2n-2r = r+1 \Rightarrow r = \frac{2n-1}{3}\). For \(n=15\), \(r = 29/3 = 9.67\). The maximum is at \(r = \lfloor 9.67 \rfloor + 1 = 10\). This matches.
ANSWER: The 11th term (\(T_{11}\)) has the greatest coefficient, value \(3,075,072\) (constant term).

## COMPETENCY_QUESTION_1
QUESTION: The coefficients of three consecutive terms in the expansion of \((1+x)^n\) are in the ratio 1:7:35. Find \(n\) and the position of the middle term among these three. Then determine whether this middle term is the greatest coefficient in the expansion.
COMPETENCY: Translating real-world situations to mathematical expressions
STEPS:
- Step 1: Let the three consecutive terms be \(T_r, T_{r+1}, T_{r+2}\) with coefficients \(\binom{n}{r-1}, \binom{n}{r}, \binom{n}{r+1}\). Their ratios are \(\binom{n}{r-1} : \binom{n}{r} : \binom{n}{r+1} = 1 : 7 : 35\).
- Step 2: From \(\frac{\binom{n}{r}}{\binom{n}{r-1}} = 7 \Rightarrow \frac{n-r+1}{r} = 7 \Rightarrow n-r+1 = 7r \Rightarrow n = 8r-1\).
- Step 3: From \(\frac{\binom{n}{r+1}}{\binom{n}{r}} = 5 \Rightarrow \frac{n-r}{r+1} = 5 \Rightarrow n-r = 5r+5 \Rightarrow n = 6r+5\).
- Step 4: Equate: \(8r-1 = 6r+5 \Rightarrow 2r = 6 \Rightarrow r = 3\). Then \(n = 8(3)-1 = 23\).
- Step 5: The middle term is \(T_{r+1} = T_4\) (since \(r=3\), terms are \(T_3, T_4, T_5\)). Check if it's the greatest coefficient: For \(n=23\), coefficients increase up to middle. Since \(n\) is odd, greatest coefficients are at \(r = 11\) and \(12\) (i.e., \(T_{12}, T_{13}\)). Our \(r=3\) is far from middle, so \(T_4\) is NOT the greatest coefficient.
- Step 6: Verify: \(\binom{23}{2} : \binom{23}{3} : \binom{23}{4} = 253 : 1771 : 8855 = 1 : 7 : 35\). Correct.
ANSWER: \(n = 23\), middle term is the 4th term (\(T_4\)), and it is NOT the greatest coefficient (greatest coefficients are the 12th and 13th terms).
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: Find the value of \(x > 0\) for which the 4th term in the expansion of \((1+x)^{10}\) is the greatest term. Also find the greatest term for that \(x\).
COMPETENCY: Comparing and justifying
STEPS:
- Step 1: For \((1+x)^{10}\), \(a=1, b=x, n=10\). The 4th term corresponds to \(r=3\) (since \(T_{r+1}\) is (r+1)th term).
- Step 2: For \(T_4\) to be greatest, we need \(\frac{T_4}{T_3} \geq 1\) and \(\frac{T_5}{T_4} \leq 1\). (If equality holds in one, there are two equal greatest terms).
- Step 3: \(\frac{T_4}{T_3} = \frac{10-3+1}{3} \cdot x = \frac{8}{3}x \geq 1 \Rightarrow x \geq \frac{3}{8}\).
- Step 4: \(\frac{T_5}{T_4} = \frac{10-4+1}{4} \cdot x = \frac{7}{4}x \leq 1 \Rightarrow x \leq \frac{4}{7}\).
- Step 5: So \(x \in \left[\frac{3}{8}, \frac{4}{7}\right]\). For any \(x\) in this range, the 4th term is greatest (or tied).
- Step 6: If we want a specific \(x\), we can choose \(x = \frac{3}{8}\) (then \(T_3 = T_4\) are both greatest) or \(x = \frac{4}{7}\) (then \(T_4 = T_5\) are both greatest) or any in between (unique greatest \(T_4\)). Let's pick \(x = \frac{1}{2}\) (which lies in the interval). Then greatest term is \(T_4 = \binom{10}{3} (1/2)^3 = 120 \times 1/8 = 15\).
ANSWER: \(x \in \left[\frac{3}{8}, \frac{4}{7}\right]\). For \(x = \frac{1}{2}\), the greatest term is \(T_4 = 15\).
DIFFICULTY: hard

## DIAGNOSTIC_QUESTION_7
Fill in the blank: To decide which yields more, you need to know the largest contributing term in each ______.

## DIAGNOSTIC_ANSWER_7
expansion

**A wrong answer ("scheme" or "comparison") reveals the student has swapped the walkthrough's noun - you need to know the largest contributing term in each expansion.** Expansion is the walkthrough's own noun, and the noun is what the blank grades. Recall the (1.05)^20 versus (1.08)^15 comparison before filling, and give the noun exactly.

## DIAGNOSTIC_QUESTION_8
Fill in the blank: To decide which yields more, you need to know the largest ______ term in each expansion.

## DIAGNOSTIC_ANSWER_8
contributing

**A wrong answer ("total" or "largest") reveals the student has paraphrased the walkthrough's adjective - the largest contributing term in each expansion decides which scheme yields more.** Contributing is the walkthrough's own adjective, and the adjective is what the blank grades. Recall the ratio T(r+1)/T(r) before filling, and give the adjective exactly.
