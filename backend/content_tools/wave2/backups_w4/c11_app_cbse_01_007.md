## ELI5
Ask the board a question: 2 raised to what power gives 32? The answer, 5, is the logarithm - written log base 2 of 32 equals 5. The base is 2, the argument is 32, and the result 5 is just an exponent wearing a different name tag. Try log base 3 of 81 mentally, then log base 10 of 0.01 and recall negative exponents. And mind the gate: log base 2 of minus 8 and log base 1 of 100 are refused - the base must be positive and not 1, the argument positive.

## DEFINITION
For positive real numbers $N$ (the argument) and $b$ (the base), where $b \neq 1$, the logarithm of $N$ to the base $b$, denoted $\log_b N$, is the unique real number $x$ such that $b^x = N$. In equivalent exponential form: if $y = \log_b x$, then $b^y = x$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student can fluently convert between logarithmic form ($\log_b N = x$) and exponential form ($b^x = N$) for any valid base and argument, evaluate simple logarithmic expressions without a calculator (e.g., $\log_2 32$, $\log_{10} 0.001$, $\log_5 \sqrt{5}$), and state the domain restrictions (base $>0, \neq 1$; argument $>0$) with justification.

## SCOPE_BOUNDARY
This node covers the fundamental definition of logarithms, conversion between logarithmic and exponential forms, evaluation of basic logarithmic expressions, identification of domain restrictions, and the distinction between common (base 10) and natural (base $e$) logarithms. It does **not** cover the laws of logarithms (product, quotient, power, change of base), solving logarithmic equations, or applications like pH/Richter scale — those belong to the next node (c11_app_cbse_01_008).

## WALKTHROUGH
Start by asking: "If $2^5 = 32$, how would you write a math sentence that asks: *'2 raised to what power gives 32?'* " Guide students to see that the answer (5) is the logarithm. Write $\log_2 32 = 5$ on the board and label the base (2), argument (32), and result (5). Next, give them $\log_3 81$ and ask them to find the exponent mentally. Then challenge them with $\log_{10} 0.01$ — they must recall negative exponents from Indices (c11_app_cbse_01_006). Finally, ask "Why can't we do $\log_2 (-8)$ or $\log_1 100$?" to surface domain rules. The key insight: **logarithms are just exponents wearing a different name tag.**

Takeaway: mastery means naming base, argument and result in any log sentence and converting both directions on sight. Exam moves: evaluate-without-calculator questions and state-the-domain items on the name-tag scene. Check yourself: log base 10 of 0.01 is negative because negative exponents shrink - the exponent name tag never changes the underlying question. Students miss it because the restrictions look like bureaucracy, when the refused cases show the design: a log of a negative argument and a log with base one have no answer, because no real exponent turns a positive base into a negative number, and one raised to anything stays one - the domain rules are theorems, not etiquette.

## DIAGNOSTIC_QUESTION_1
Write the logarithmic equation $\log_4 64 = x$ in exponential form and state the value of $x$.

## DIAGNOSTIC_ANSWER_1
Exponential form: $4^x = 64$. Since $4^3 = 64$, $x = 3$. A wrong answer like $x^4 = 64$ or $64^x = 4$ reveals the student has swapped the base and the exponent — they are treating the logarithm as the base rather than the exponent. This is the single most common structural error.

## DIAGNOSTIC_QUESTION_2
Explain in your own words why $\log_5 (-25)$ is undefined in the real number system, but $\log_5 (1/25)$ is defined and equals $-2$.

## DIAGNOSTIC_ANSWER_2
$\log_5 (-25)$ asks "5 raised to what power gives -25?" No real exponent works because any positive base raised to a real power is always positive. $\log_5 (1/25)$ asks "5 raised to what power gives 1/25?" Since $5^{-2} = 1/25$, the answer is $-2$. A student who says "log of negative is not allowed" without linking it to $b^x > 0$ for $b>0$ shows rote memorization without understanding the exponential connection.

## DIAGNOSTIC_QUESTION_3
Evaluate without a calculator: $\log_{\sqrt{2}} 8$.

## DIAGNOSTIC_ANSWER_3
Let $x = \log_{\sqrt{2}} 8$. Then $(\sqrt{2})^x = 8$. Rewrite $\sqrt{2} = 2^{1/2}$ and $8 = 2^3$. So $(2^{1/2})^x = 2^3 \implies 2^{x/2} = 2^3 \implies x/2 = 3 \implies x = 6$. A wrong answer of 3 or 1.5 reveals the student forgot to convert the base $\sqrt{2}$ to exponential form $2^{1/2}$ and applied the power rule incorrectly.

## DIAGNOSTIC_QUESTION_4
Compare $\log_2 10$ and $\log_3 10$. Which is larger? Justify without calculating decimal values.

## DIAGNOSTIC_ANSWER_4
$\log_2 10 > \log_3 10$. Reason: Both ask "what exponent on the base gives 10?" Since base 2 is smaller than base 3, you need a *larger* exponent on 2 to reach the same number 10. (Analogy: a smaller engine needs higher RPM to reach the same speed.) A student who guesses $\log_3 10$ is larger because "3 > 2" is confusing the base with the result — they haven't internalized the inverse relationship between base size and log value for a fixed argument > 1.

## DIAGNOSTIC_QUESTION_5
A student claims: "Since $\log_{10} 100 = 2$ and $\log_{10} 1000 = 3$, then $\log_{10} 200$ must be exactly 2.5 because 200 is halfway between 100 and 1000." Evaluate this claim.

## DIAGNOSTIC_ANSWER_5
The claim is **false**. Logarithmic functions are non-linear; equal intervals in the argument do not produce equal intervals in the log value. $\log_{10} 200 = \log_{10} (2 \times 100) = \log_{10} 2 + \log_{10} 100 \approx 0.3010 + 2 = 2.3010$, not 2.5. A student who agrees is applying linear thinking (arithmetic mean) to a logarithmic scale — a classic misconception that persists into calculus if not corrected now.

## DIAGNOSTIC_QUESTION_6
Create a real-life scenario (Indian context) where a quantity grows such that its logarithm (base 10) increases by 1 every year. Write the formula for the quantity after $t$ years if it starts at 500 units.

## DIAGNOSTIC_ANSWER_6
Scenario: A viral video's view count grows 10× each year. If $\log_{10}(\text{views})$ increases by 1 per year, views multiply by 10 per year. Formula: $V(t) = 500 \times 10^t$. A poor answer gives linear growth ($500 + 500t$) or uses base $e$ without justification, showing the student cannot connect "log increases by 1" to "quantity multiplies by base."

## COMMON_MISCONCEPTION
**"The base of the logarithm is the number you multiply by."** Students see $\log_2 8 = 3$ and think "2 × 3 = 6, close to 8" or "2 multiplied 3 times." They confuse the base (the number being raised to a power) with a multiplier. This stems from misreading $b^x$ as $b \times x$ instead of $b \times b \times \dots$ ($x$ times). Example: A student evaluates $\log_3 27$ as "3 × 9 = 27, so answer is 9" instead of "3³ = 27, so answer is 3."

## ON_FAILURE
1. **Re-anchor to Indices:** Have the student write $2^1, 2^2, 2^3, 2^4, 2^5$ as repeated multiplication (2, 2×2, 2×2×2...). Ask: "How many 2's are multiplied in $2^5$?" (Answer: 5). Then write $\log_2 32 = \_\_$ and say: "This blank asks exactly the same question."
2. **Use the "Box Method":** Draw $\log_{\boxed{2}} \boxed{32} = \boxed{?}$. Fill base box with 2, argument box with 32. Ask: "2 to the *what* = 32?" The student writes the exponent in the third box.
3. **Drill 5 rapid conversions:** $\log_3 81 \leftrightarrow 3^4=81$, $\log_{10} 0.001 \leftrightarrow 10^{-3}=0.001$, etc. until automatic.

## PREREQUISITE_NODE_IDS
c11_app_cbse_01_006

## PREREQUISITE_REASONS
c11_app_cbse_01_006: Indices, Logarithm and Antilogarithm — provides the laws of exponents (zero, negative, fractional powers) and the concept that $a^m \cdot a^n = a^{m+n}$, which is the structural foundation for understanding logarithms as exponents. Without fluency in $b^{-n} = 1/b^n$ and $b^{1/n} = \sqrt[n]{b}$, students cannot evaluate logs like $\log_2(1/8)$ or $\log_4 2$.

## FORWARD_NODE_IDS
c11_app_cbse_01_008

## FORWARD_REASONS
c11_app_cbse_01_008: Laws and Properties of Logarithms — this node establishes the definition and basic evaluation; the next node builds the algebraic toolkit (product, quotient, power, change-of-base rules) needed to manipulate and solve logarithmic expressions and equations.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_01_006 -> c11_app_cbse_01_007 -> c11_app_cbse_01_008

## THIS_FORMULA
Definition: $\log_b N = x \iff b^x = N$, where $b > 0, b \neq 1, N > 0, x \in \mathbb{R}$.

## FORMULA_VARIABLES
- $b$: base of the logarithm (positive real, $b \neq 1$)
- $N$: argument (positive real number)
- $x$: logarithm value (real number, the exponent)

## FORMULA_UNITS
Logarithms are dimensionless (pure numbers); $N$ and $b$ must share the same dimension if physical quantities.

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_phy_cbse_01_001 | In Physics (Units & Measurements), logarithmic scales like decibel (sound intensity) and Richter scale (earthquake magnitude) use $\log_{10}$ to compress huge ranges — understanding $\log_b N = x \iff b^x = N$ is essential to interpret these scales.
c11_chem_cbse_01_001 | In Chemistry (Equilibrium/Ionic Equilibrium), pH = $-\log_{10}[\text{H}^+]$ directly applies the definition; students must convert between $[\text{H}^+] = 10^{-\text{pH}}$ and pH fluently.

## PREREQ_CONCEPT
Laws of exponents, especially negative and fractional indices ($a^{-n} = 1/a^n$, $a^{1/n} = \sqrt[n]{a}$).

## PREREQ_BEFORE
Student must be able to rewrite $\sqrt{a}$, $1/a^2$, and $a^{3/2}$ in exponential form $a^x$ and solve $a^x = b$ for $x$ when $a$ and $b$ are powers of the same integer.

## PREREQ_STUCK
Review "Negative Exponents" and "Fractional Powers" in c11_app_cbse_01_006 — specifically practice converting $\sqrt[3]{5}$, $1/27$, and $1/\sqrt{2}$ to the form $b^x$.

## WORKED_EXAMPLE_1
PROBLEM: The intensity of sound $I$ (in W/m²) is related to the decibel level $L$ by $L = 10 \log_{10}(I / I_0)$, where $I_0 = 10^{-12}$ W/m² is the threshold of hearing. If a classroom has a sound level of 50 dB, find the sound intensity $I$ in scientific notation.

STEPS:
- Step 1: Identify given: $L = 50$, $I_0 = 10^{-12}$. Formula: $L = 10 \log_{10}(I / I_0)$. Unknown: $I$.
- Step 2: Substitute values: $50 = 10 \log_{10}(I / 10^{-12})$.
- Step 3: Divide both sides by 10: $5 = \log_{10}(I / 10^{-12})$.
- Step 4: Convert to exponential form using definition: $10^5 = I / 10^{-12}$.
- Step 5: Solve for $I$: $I = 10^5 \times 10^{-12} = 10^{-7}$ W/m².
- Step 6: Verify: $\log_{10}(10^{-7} / 10^{-12}) = \log_{10}(10^5) = 5$, so $L = 10 \times 5 = 50$ dB. ✓

REASONING: The definition $\log_b N = x \iff b^x = N$ is the only tool needed to "undo" the logarithm. Isolating the log term first (Step 3) is crucial — a common error is trying to exponentiate before dividing by 10.

ANSWER: $I = 1 \times 10^{-7}$ W/m² (or $10^{-7}$ W/m²).

## WORKED_EXAMPLE_2
PROBLEM: Solve for $x$: $\log_x 64 = 3/2$. (Hint: $x$ is the base here, not the argument.)

STEPS:
- Step 1: Recognize the variable $x$ is the base. Apply definition: $\log_x 64 = 3/2 \iff x^{3/2} = 64$.
- Step 2: Rewrite $x^{3/2}$ as $(\sqrt{x})^3$ or $(x^3)^{1/2}$. Use $(\sqrt{x})^3 = 64$.
- Step 3: Take cube root both sides: $\sqrt{x} = \sqrt[3]{64} = 4$.
- Step 4: Square both sides: $x = 4^2 = 16$.
- Step 5: Check domain: base $x = 16 > 0$ and $x \neq 1$ ✓. Argument 64 > 0 ✓.
- Step 6: Verify: $\log_{16} 64 = ?$ Since $16^{3/2} = (\sqrt{16})^3 = 4^3 = 64$, the answer is correct.

REASONING: When the base is the unknown, the definition still applies symmetrically. Converting the fractional exponent $3/2$ to "square root then cube" (or vice versa) uses the prerequisite skill from Indices (c11_app_cbse_01_006). Always verify base $\neq 1$.

ANSWER: $x = 16$.

## WORKED_EXAMPLE_3
PROBLEM: Given $\log_{10} 2 \approx 0.3010$ and $\log_{10} 3 \approx 0.4771$, estimate $\log_{10} 720$ without a calculator. Then explain why this estimation method works even though we haven't learned log laws yet.

STEPS:
- Step 1: Factor 720 into primes using Fundamental Theorem of Arithmetic (c11_app_cbse_01_002): $720 = 72 \times 10 = 8 \times 9 \times 10 = 2^3 \times 3^2 \times 10$.
- Step 2: Write $720 = 2^3 \times 3^2 \times 10^1$.
- Step 3: Use the definition insight: $\log_{10} 720$ is the exponent $y$ such that $10^y = 720$. But we don't know $y$ directly.
- Step 4: *Anticipate the Product Law*: Since $720 = 2^3 \cdot 3^2 \cdot 10$, and $10^a \cdot 10^b = 10^{a+b}$, the exponent for 720 should be the sum of exponents for its factors. So $\log_{10} 720 \approx 3\log_{10} 2 + 2\log_{10} 3 + \log_{10} 10$.
- Step 5: Substitute given values: $3(0.3010) + 2(0.4771) + 1 = 0.9030 + 0.9542 + 1 = 2.8572$.
- Step 6: Verify order of magnitude: $10^2 = 100$, $10^3 = 1000$, and $720$ is between them, so log should be between 2 and 3. $2.8572$ ✓.

REASONING: This problem bridges the definition (log as exponent) with the upcoming Product Law. The student uses the *structure* of exponents ($10^a \cdot 10^b = 10^{a+b}$) to justify adding logs, even before formally learning the law. This builds deep conceptual readiness for c11_app_cbse_01_008.

ANSWER: $\log_{10} 720 \approx 2.8572$.

## COMPETENCY_QUESTION_1
QUESTION: A bacterial culture doubles every 3 hours. If the initial count is $N_0$, the count after $t$ hours is $N = N_0 \cdot 2^{t/3}$. A student measures the count after 10 hours and gets $N = 10 N_0$. They claim: "Since $\log_2 10 \approx 3.32$, then $t/3 = 3.32$, so $t \approx 9.96$ hours. My measurement of 10 hours has an error." Is the student's reasoning correct? Justify.

COMPETENCY: Mathematical reasoning & error analysis in real-world exponential/logarithmic models.

STEPS:
- Step 1: Write the model: $N = N_0 \cdot 2^{t/3}$. Given $N = 10 N_0$ at $t = 10$.
- Step 2: Substitute: $10 N_0 = N_0 \cdot 2^{10/3} \implies 10 = 2^{10/3}$.
- Step 3: Take $\log_2$ both sides: $\log_2 10 = 10/3 \approx 3.333...$
- Step 4: Compare: Student used $\log_2 10 \approx 3.32$, but exact value from model is $10/3 = 3.333...$. The difference is due to rounding $\log_2 10$, not measurement error.
- Step 5: Conclude: The model predicts $t = 10$ exactly for $N = 10 N_0$. The student confused approximate log value with exact model prediction.

ANSWER: The student's reasoning is incorrect. The model gives $2^{10/3} \approx 10.079$, so $N \approx 10.079 N_0$ at $t=10$, not exactly $10 N_0$. The small discrepancy comes from rounding $\log_2 10 \approx 3.32$ (actual $\approx 3.3219$), not from measurement error. The measurement $t=10$ is consistent with the model.

DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: In the RSA cryptosystem (see c11_app_cbse_01_003), the public key includes $n = pq$ (product of two large primes) and $e$. The private key $d$ satisfies $ed \equiv 1 \pmod{\phi(n)}$ where $\phi(n) = (p-1)(q-1)$. Suppose $p=11, q=13, e=7$. Find $d$ by solving $7d \equiv 1 \pmod{120}$. Then explain why logarithms (discrete logarithms) are relevant to the security of RSA.

COMPETENCY: Cross-concept synthesis (number theory + modular arithmetic + logarithmic thinking) and cryptographic intuition.

STEPS:
- Step 1: Compute $n = 11 \times 13 = 143$, $\phi(n) = 10 \times 12 = 120$.
- Step 2: Solve $7d \equiv 1 \pmod{120}$. Find multiplicative inverse of 7 mod 120.
- Step 3: Use Extended Euclidean Algorithm: $120 = 17 \times 7 + 1 \implies 1 = 120 - 17 \times 7$. So $-17 \times 7 \equiv 1 \pmod{120}$.
- Step 4: $d \equiv -17 \equiv 103 \pmod{120}$. Since $1 < d < 120$, $d = 103$.
- Step 5: Explain discrete log relevance: Breaking RSA requires finding $d$ given $e, n$ — equivalent to solving $e^d \equiv 1 \pmod{\phi(n)}$ or computing discrete logarithms in $(\mathbb{Z}/n\mathbb{Z})^\times$. The hardness of discrete log (finding exponent $x$ in $g^x \equiv h \pmod{p}$) underpins security. Classical logs ($\log_b N$) are the continuous analogue; discrete logs are the modular version.

ANSWER: $d = 103$. Discrete logarithms (solving $b^x \equiv N \pmod{m}$ for $x$) are the modular analogue of ordinary logarithms. RSA security relies on the difficulty of factoring $n$ (which lets you compute $\phi(n)$ and then $d$) — but if discrete logs were easy, one could potentially recover $d$ directly from $e$ and $n$ without factoring. The definition $\log_b N = x \iff b^x = N$ extends to modular arithmetic, where "exponent" becomes the secret key.

DIFFICULTY: hard