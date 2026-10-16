## ELI5
A post gets 10 shares on Day 1, and each receiver shares with 3 new people daily: new shares run 10, 30, 90, 270. Each term divided by the one before gives the same 3 - that constant ratio is what makes the list a GP. The ratio has range: negative works, like 2, -6, 18; fractions work, like 81, 27, 9. But no term can be zero, because dividing by zero would tear the ratio apart. A GP is defined by multiplication, not addition.

## DEFINITION
A sequence $a_1, a_2, a_3, \dots, a_n, \dots$ is called a **Geometric Progression (GP)** if every term is non-zero and the ratio of any term to its immediately preceding term is a constant, denoted by $r$ (the common ratio), i.e., $\frac{a_{k+1}}{a_k} = r$ for all $k \ge 1$. The first term is denoted by $a$. The standard form of a GP is $a, ar, ar^2, ar^3, \dots$.

## COGNITIVE_LEVEL
understand

## MASTERY_CRITERIA
The student must be able to: (1) Verify if a given sequence is a GP by checking the constancy of the ratio of consecutive terms, handling fractions, negative numbers, and algebraic terms; (2) Identify the first term ($a$) and common ratio ($r$) from the sequence definition or given terms; (3) Distinguish a GP from an AP and non-progression sequences with justification.

## SCOPE_BOUNDARY
This node covers the formal definition of a Geometric Progression, identification of first term ($a$) and common ratio ($r$), the condition $a_k \neq 0$, and the standard form $a, ar, ar^2, \dots$. It does **NOT** cover the general term formula ($ar^{n-1}$), sum of $n$ terms, selection of terms, geometric mean, or infinite GP — these are covered in subsequent nodes (c11_app_cbse_05_010 onwards).

## WALKTHROUGH
Start with a relatable scenario: "A social media post gets 10 shares on Day 1. Every day, each person who received it shares it with exactly 3 new people. How many *new* shares happen on Day 4?" Guide the student to list the new shares per day: 10, 30, 90, 270. Ask: "What operation connects 10 to 30? 30 to 90?" (Multiplication by 3). Contrast this with a fixed *increase* (e.g., +20 shares daily). Formalize: "Since we multiply by a constant (3) to get the next term, this is a GP. The constant multiplier is the common ratio $r$. The first number is the first term $a$." Crucial checkpoint: "Can $r$ be negative? Yes (e.g., 2, -6, 18...). Can $r$ be a fraction? Yes (e.g., 81, 27, 9...). Can any term be zero? No — because then the ratio $\frac{a_{k+1}}{a_k}$ would be undefined or zero for the next step, breaking the constant ratio rule." End with the key insight: **A GP is defined by a multiplicative pattern, not an additive one.**

Takeaway: mastery means verifying the ratio with fractions, negative and algebraic terms, and extracting a and r from given terms. Exam moves: is-it-a-GP questions and find-a-and-r items on the share-count scene. Check yourself: one bad division sinks the claim - the ratio must come out identical between every consecutive pair, not just the first. Students miss it because r looks like it must be positive and whole, when the 2, -6, 18 zig-zag and the shrinking 81, 27, 9 show the design: any non-zero real wears the ratio badge, and zero alone is banned.

## DIAGNOSTIC_QUESTION_1
State the formal definition of a Geometric Progression (GP) using the notation $a_1, a_2, a_3, \dots$ and the common ratio $r$. Include the necessary condition on the terms of the sequence.

## DIAGNOSTIC_ANSWER_1
A sequence $a_1, a_2, a_3, \dots$ is a GP if $\frac{a_{k+1}}{a_k} = r$ (a constant) for all $k \ge 1$, provided **all terms are non-zero** ($a_k \neq 0$). A wrong answer (omitting the non-zero condition) reveals the student thinks a sequence like $2, 0, 0, 0, \dots$ is a GP with $r=0$. This is incorrect because $\frac{0}{0}$ is undefined and $\frac{0}{2}=0$ but the next ratio $\frac{0}{0}$ breaks the constant ratio rule; NCERT explicitly states "each term is non-zero."

## DIAGNOSTIC_QUESTION_2
A student claims the sequence defined by $a_n = 3 \cdot (-2)^{n-1}$ is a GP with first term 3 and common ratio -2. Another student argues it is not a GP because the terms alternate signs. Who is correct? Explain why the alternating sign does not disqualify it.

## DIAGNOSTIC_ANSWER_2
The first student is correct. The sequence is $3, -6, 12, -24, \dots$. The ratio $\frac{-6}{3} = -2$, $\frac{12}{-6} = -2$, $\frac{-24}{12} = -2$. The ratio is constant ($r=-2$). A wrong answer reveals the misconception that $r$ must be positive. The definition only requires a *constant* ratio; $r$ can be any non-zero real number (positive, negative, or fraction). Alternating signs are a hallmark of a GP with negative $r$.

## DIAGNOSTIC_QUESTION_3
Determine if the following sequences are GPs. If yes, state $a$ and $r$. If no, explain why.
(i) $5, 15, 45, 135, \dots$
(ii) $\frac{1}{2}, \frac{1}{4}, \frac{1}{8}, \frac{1}{16}, \dots$
(iii) $0, 0, 0, 0, \dots$
(iv) $x, x^2, x^4, x^8, \dots$ (for $x \neq 0$)

## DIAGNOSTIC_ANSWER_3
(i) GP: $a=5, r=3$. (ii) GP: $a=\frac{1}{2}, r=\frac{1}{2}$. (iii) **Not a GP** because terms are zero (violates $a_k \neq 0$ condition; ratio $\frac{0}{0}$ undefined). (iv) **Not a GP** because ratios are not constant: $\frac{x^2}{x}=x$, $\frac{x^4}{x^2}=x^2$, $\frac{x^8}{x^4}=x^4$ (ratio depends on $k$). A wrong answer on (iii) or (iv) reveals the student checks only the first two ratios or ignores the non-zero condition and algebraic variability of the ratio.

## DIAGNOSTIC_QUESTION_4
Compare the sequences:
Sequence A: $10, 13, 16, 19, \dots$
Sequence B: $10, 13, 16.9, 21.97, \dots$
Sequence C: $10, 20, 40, 80, \dots$
Identify which is an AP, which is a GP, and which is neither. Justify using the definitions of common difference ($d$) and common ratio ($r$).

## DIAGNOSTIC_ANSWER_4
Sequence A is an AP: $d = 13-10 = 3$ (constant addition).
Sequence B is **neither**: Differences are $3, 3.9, 5.07$ (not constant); Ratios are $1.3, 1.3, 1.3$ — wait, ratios ARE constant ($r=1.3$). **Correction: Sequence B IS a GP** ($a=10, r=1.3$).
Sequence C is a GP: $r = 20/10 = 2$ (constant multiplication).
A wrong answer (e.g., calling B an AP or "neither") reveals the student only checks differences (additive pattern) and fails to check ratios (multiplicative pattern) when differences aren't constant. This is the core AP vs GP confusion.

## DIAGNOSTIC_QUESTION_5
A sequence is defined recursively: $a_1 = 4$, $a_{n+1} = \frac{1}{2}a_n$ for $n \ge 1$. A student writes the first 4 terms as $4, 2, 1, 0$ and says "It's a GP with $r=0.5$ until it hits zero, then it stops being a GP." Evaluate this statement. Is the sequence a GP? Why or why not?

## DIAGNOSTIC_ANSWER_5
The student's *terms* are wrong: $a_4 = \frac{1}{2}(1) = 0.5$, not 0. The sequence is $4, 2, 1, 0.5, 0.25, \dots$ — it **never hits zero**. It **is a GP** with $a=4, r=0.5$ for all $n$. A wrong answer reveals two misconceptions: (1) Arithmetic error in recursive calculation (halving 1 gives 0.5, not 0); (2) Belief that a GP with $|r|<1$ eventually reaches zero. In a GP, terms approach zero asymptotically but never equal zero (since $a r^{n-1} \neq 0$ for $a \neq 0, r \neq 0$).

## DIAGNOSTIC_QUESTION_6
Create a real-world scenario (Indian context) that generates a GP with a **negative common ratio**. Define the first term $a$ and common ratio $r$ explicitly. Write the first 5 terms. Explain why the negative ratio makes sense in your scenario.

## DIAGNOSTIC_ANSWER_6
**Scenario:** A pendulum swings 50 cm to the right (positive displacement). On each return swing, it covers 80% of the previous distance but in the opposite direction.
$a = 50$ (first swing right), $r = -0.8$.
Terms: $50, -40, 32, -25.6, 20.48$ (units: cm).
Negative $r$ makes sense because the direction alternates (right, left, right...), and magnitude decays by 20% each swing.
A poor answer (e.g., "money doubling then halving" without sign change or using $r=-1$ without decay) reveals the student cannot map negative $r$ to a physical alternating phenomenon with magnitude change, or confuses "alternating" with "constant magnitude."

## COMMON_MISCONCEPTION
**The "Zero Ratio" Trap:** Students often believe a sequence like $5, 0, 0, 0, \dots$ is a GP with common ratio $r=0$. They compute $\frac{0}{5}=0$ and assume the pattern holds. **Why it's wrong:** The definition requires **every term to be non-zero** ($a_k \neq 0$). If $a_2=0$, then $\frac{a_3}{a_2} = \frac{0}{0}$ is undefined, so the ratio is not constant (or even defined) for all $k$. NCERT explicitly states: "A sequence $a_1, a_2, \dots$ is called a geometric progression, if **each term is non-zero** and $\frac{a_{k+1}}{a_k} = r$ (constant)." This condition ensures the recursive definition $a_{n+1} = r a_n$ is valid for all $n$ without division by zero. Students miss this because Class 10 AP had no such restriction on terms.

## ON_FAILURE
If a student claims $5, 0, 0, \dots$ is a GP:
1. Ask: "What is $\frac{a_3}{a_2}$?" They will say $0/0 = 0$ or "undefined."
2. State: "For a GP, the ratio must be the **same constant number** for **every** consecutive pair. Is $0/0$ equal to $0/5$?"
3. Show the recursive definition: $a_{n+1} = r a_n$. If $r=0$ and $a_1=5$, then $a_2 = 0 \cdot 5 = 0$. But then $a_3 = 0 \cdot 0 = 0$. The formula works, but the *ratio definition* $\frac{a_{n+1}}{a_n}$ fails at $n=2$ because division by zero is not allowed in mathematics.
4. Conclude: "That is why NCERT adds the condition **'each term is non-zero'**. It protects the ratio definition. So $5, 0, 0, \dots$ is **not** a GP. It is a sequence that *becomes* constant zero, but it violates the GP definition."

## PREREQUISITE_NODE_IDS
c11_app_cbse_05_002, c11_app_cbse_05_008

## PREREQUISITE_REASONS
c11_app_cbse_05_002: The concept of a 'sequence' (ordered list, terms $a_1, a_2, \dots$, finite/infinite) is the foundational structure upon which a GP is defined. Without knowing what a sequence is, the definition of GP has no object.
c11_app_cbse_05_008: This node (Geometric Progression (GP) - Introduction) likely provides the intuitive/motivational examples (like the ancestry example 2, 4, 8...) that this Definition node formalizes. The student needs that intuition before the rigorous definition.

## FORWARD_NODE_IDS
c11_app_cbse_05_010

## FORWARD_REASONS
c11_app_cbse_05_010: The General Term of a GP ($a_n = ar^{n-1}$) is derived directly from the definition $a_{k+1} = r a_k$ applied repeatedly. You cannot derive or understand the general term formula without first firmly establishing what $a$ and $r$ are and that the multiplicative pattern holds for all $k$.

## CROSS_SUBJECT_PREREQS
none

## CROSS_SUBJECT_REASONS
none

## CHAIN_DESCRIPTION
c11_app_cbse_05_002 -> c11_app_cbse_05_008 -> c11_app_cbse_05_009 -> c11_app_cbse_05_010

## THIS_FORMULA
Definition Condition: $\frac{a_{k+1}}{a_k} = r$ (constant) for all $k \ge 1$, with $a_k \neq 0$. Standard Form: $a, ar, ar^2, ar^3, \dots$

## FORMULA_VARIABLES
$a$: First term (non-zero real number). $r$: Common ratio (non-zero real number). $a_k$: $k$-th term of the sequence (non-zero). $k$: Position index (natural number).

## FORMULA_UNITS
N/A (Pure mathematical definition; units depend on application context, e.g., ₹, meters, population count).

## COMPUTATION_TYPE
algebraic

## CROSS_SUBJECT
c11_physics_kinematics | Exponential decay of amplitude in damped oscillations (e.g., pendulum with air resistance) forms a GP with $0 < r < 1$. The definition of GP allows modeling the decreasing maximum displacements.
c11_biology_population | Bacterial growth under unlimited resources (binary fission: 1 → 2 → 4 → 8...) is the classic biological GP with $r=2$. The definition validates the "constant doubling time" model.

## PREREQ_CONCEPT
Understanding of a 'sequence' as an ordered list of numbers ($a_1, a_2, \dots$) and the concept of a 'ratio' of two quantities.

## PREREQ_BEFORE
The student must be comfortable with the notation $a_n$ for the $n$-th term and the idea that a sequence can follow a pattern (like AP's addition pattern) before learning GP's multiplication pattern.

## PREREQ_STUCK
Review "Sequences" (c11_app_cbse_05_002) — specifically the definition of a sequence, term notation ($a_1, a_2, a_n$), and the distinction between finite and infinite sequences.

## WORKED_EXAMPLE_1
PROBLEM: The value of a rare coin appreciates such that its value at the end of each year is 1.2 times its value at the beginning of that year. If the initial value is ₹5,000, verify that the sequence of its values at the end of years 1, 2, 3, ... forms a GP. Identify $a$ and $r$.
STEPS:
- Step 1: Identify the sequence terms. Value at end of Year 1 = $5000 \times 1.2 = 6000$. Value at end of Year 2 = $6000 \times 1.2 = 7200$. Value at end of Year 3 = $7200 \times 1.2 = 8640$. Sequence: $6000, 7200, 8640, \dots$
- Step 2: Recall the definition of GP. Need to check if ratio of consecutive terms is constant and all terms are non-zero.
- Step 3: Compute ratios. $\frac{7200}{6000} = 1.2$. $\frac{8640}{7200} = 1.2$.
- Step 4: Verify non-zero condition. All values are positive currency amounts, hence non-zero.
- Step 5: Conclude. Since ratio is constant ($r=1.2$) and terms are non-zero, it is a GP. First term $a = 6000$ (value at end of Year 1), common ratio $r = 1.2$.
REASONING: The problem describes a multiplicative growth process (multiply by 1.2 annually). The definition of GP exactly captures this: constant ratio between successive terms. Identifying the *first term of the sequence in question* (end of Year 1, not initial purchase) is crucial.
ANSWER: Yes, it is a GP. $a = 6000$, $r = 1.2$.

## WORKED_EXAMPLE_2
PROBLEM: A sequence is defined by $a_n = \frac{2^n}{3^{n-1}}$ for $n \ge 1$. Show that it is a GP. Find its first term and common ratio.
STEPS:
- Step 1: Write the first few terms using the formula. $a_1 = \frac{2^1}{3^0} = 2$. $a_2 = \frac{2^2}{3^1} = \frac{4}{3}$. $a_3 = \frac{2^3}{3^2} = \frac{8}{9}$. $a_4 = \frac{2^4}{3^3} = \frac{16}{27}$.
- Step 2: Check the ratio $\frac{a_{n+1}}{a_n}$ algebraically (general proof) rather than just numerically. $\frac{a_{n+1}}{a_n} = \frac{2^{n+1}/3^n}{2^n/3^{n-1}}$.
- Step 3: Simplify the algebraic ratio. $\frac{2^{n+1}}{3^n} \times \frac{3^{n-1}}{2^n} = 2^{1} \times 3^{-1} = \frac{2}{3}$.
- Step 4: Verify the ratio is constant (independent of $n$) and terms are non-zero. $\frac{2}{3}$ is constant. Since $2^n > 0$ and $3^{n-1} > 0$, all $a_n > 0$ (non-zero).
- Step 5: State conclusion. The sequence is a GP with first term $a = a_1 = 2$ and common ratio $r = \frac{2}{3}$.
REASONING: For sequences given by an explicit formula $a_n = f(n)$, the rigorous way to prove it's a GP is to simplify the ratio $\frac{a_{n+1}}{a_n}$ algebraically and show it is independent of $n$. Numerical checking of first few terms is suggestive but not a proof.
ANSWER: It is a GP. $a = 2$, $r = \frac{2}{3}$.

## WORKED_EXAMPLE_3
PROBLEM: The $p$-th, $q$-th, and $r$-th terms of a GP are $x, y, z$ respectively (all non-zero). Prove that $x^{q-r} \cdot y^{r-p} \cdot z^{p-q} = 1$. (This combines GP definition with algebraic manipulation of exponents — a classic Board exam proof).
STEPS:
- Step 1: Express $x, y, z$ using the general term formula $a_n = a r^{n-1}$ (anticipating next node, but derivable from definition: $x = a r^{p-1}$, $y = a r^{q-1}$, $z = a r^{r-1}$).
- Step 2: Substitute into LHS: $x^{q-r} \cdot y^{r-p} \cdot z^{p-q} = (a r^{p-1})^{q-r} \cdot (a r^{q-1})^{r-p} \cdot (a r^{r-1})^{p-q}$.
- Step 3: Apply exponent rules $(uv)^w = u^w v^w$ and $(u^v)^w = u^{vw}$. LHS = $a^{q-r} r^{(p-1)(q-r)} \cdot a^{r-p} r^{(q-1)(r-p)} \cdot a^{p-q} r^{(r-1)(p-q)}$.
- Step 4: Combine powers of $a$. Exponent sum: $(q-r) + (r-p) + (p-q) = 0$. So $a^0 = 1$.
- Step 5: Combine powers of $r$. Exponent sum: $(p-1)(q-r) + (q-1)(r-p) + (r-1)(p-q)$. Expand: $pq - pr - q + r + qr - pq - r + p + pr - qr - p + q = 0$. So $r^0 = 1$.
- Step 6: Conclude LHS = $1 \times 1 = 1 = \text{RHS}$. Proved.
REASONING: This proof relies entirely on the definition of GP terms as $a r^{n-1}$. The exponents telescope to zero because the coefficients $(q-r), (r-p), (p-q)$ sum to zero. This is a high-yield Board exam pattern: "If terms of GP are given, prove a relation involving exponents."
ANSWER: Proved. $x^{q-r} y^{r-p} z^{p-q} = 1$.

## COMPETENCY_QUESTION_1
QUESTION: A student observes the sequence $S: \frac{1}{3}, \frac{1}{9}, \frac{1}{27}, \frac{1}{81}, \dots$ and claims: "This is a GP with first term $a = \frac{1}{3}$ and common ratio $r = 3$ because the denominator is multiplied by 3 each time." Identify the error in the student's reasoning. State the correct $r$ and explain why the student's logic about the denominator leads to the wrong $r$.
COMPETENCY: Conceptual Understanding & Error Analysis
STEPS:
- Step 1: Recall the definition of common ratio: $r = \frac{a_{k+1}}{a_k}$ (ratio of the *terms themselves*, not just denominators).
- Step 2: Compute the actual ratio using the terms. $r = \frac{1/9}{1/3} = \frac{1}{9} \times \frac{3}{1} = \frac{1}{3}$.
- Step 3: Analyze the student's error. The student looked at denominators: $3, 9, 27, 81$ (which is a GP with $r=3$) and assumed the sequence ratio is the same. But for fractions $\frac{1}{D_n}$, if denominator multiplies by 3, the fraction *divides* by 3.
- Step 4: State correct values. $a = \frac{1}{3}$, $r = \frac{1}{3}$.
ANSWER: The student confused the ratio of denominators with the ratio of terms. Correct $r = \frac{1}{3}$. The sequence is $\frac{1}{3}, \frac{1}{3}(\frac{1}{3}), \frac{1}{3}(\frac{1}{3})^2, \dots$
DIFFICULTY: medium

## COMPETENCY_QUESTION_2
QUESTION: A ball is dropped from a height of 10 meters. On each bounce, it rebounds to 60% of the height from which it fell. Let $h_n$ be the maximum height reached *after* the $n$-th bounce ($h_0 = 10$ is initial drop height).
(a) Write the first 4 terms of the sequence $h_1, h_2, h_3, h_4$.
(b) Is the sequence $h_1, h_2, h_3, \dots$ a GP? Justify using the definition.
(c) The ball eventually comes to rest. A student argues: "Since the ball stops, the height becomes 0. So the sequence has a term 0. Therefore, by the GP definition (terms must be non-zero), this is NOT a GP." Resolve this paradox. Is the *mathematical model* a GP? Why does the physical reality differ?
COMPETENCY: Mathematical Modeling & Critical Evaluation
STEPS:
- Step 1: Calculate heights. $h_1 = 10 \times 0.6 = 6$. $h_2 = 6 \times 0.6 = 3.6$. $h_3 = 3.6 \times 0.6 = 2.16$. $h_4 = 2.16 \times 0.6 = 1.296$.
- Step 2: Check GP definition. Ratios: $6/10=0.6$, $3.6/6=0.6$, $2.16/3.6=0.6$. Constant $r=0.6$. All terms $>0$. **Yes, the model is a GP** ($a=6, r=0.6$ if sequence starts at $h_1$; or $a=10, r=0.6$ if includes $h_0$).
- Step 3: Address the paradox. The mathematical model assumes infinite bounces with height $h_n = 10(0.6)^n$. This never reaches 0 (limit is 0 as $n \to \infty$). The physical ball stops due to energy dissipation below a threshold (inelastic collision, molecular adhesion) not captured by the simple constant-ratio model.
- Step 4: Conclude. The *mathematical sequence defined by the recurrence $h_{n+1} = 0.6 h_n$* is a GP. The physical process terminates, but the GP model is an idealization valid for the bounces that occur.
ANSWER: (a) 6, 3.6, 2.16, 1.296. (b) Yes, GP with $r=0.6$. (c) The model is a GP; physical termination doesn't invalidate the mathematical definition for the modeled terms. The model predicts heights $\to 0$ but never $=0$.
DIFFICULTY: hard